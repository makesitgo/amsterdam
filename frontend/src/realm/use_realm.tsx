import React, { createContext, useContext, useState } from 'react';
import * as Realm from 'realm-web';

interface RealmProps {
  login: (email: string, password: string) => Promise<Realm.User | null>;
  loginAnonymous: () => Promise<Realm.User | null>;
  logout: () => Promise<void>;
  user: Realm.User | null;
}

const RealmContext = createContext<RealmProps | null>(null);

interface RealmProviderProps {
  children: React.ReactNode;
}

export const RealmProvider = ({ children }: RealmProviderProps) => {
  if (!process.env.REACT_APP_REALM_APP_ID!) {
    throw new Error('no Realm app configured for this environment');
  }
  const app = new Realm.App({
    id: process.env.REACT_APP_REALM_APP_ID,
    baseUrl: process.env.REACT_APP_REALM_BASE_URL,
  });

  const [user, setUser] = useState<Realm.User | null>(app.currentUser);

  const login = async (email: string, password: string) => {
    try {
      await app.logIn(Realm.Credentials.emailPassword(email, password));

      setUser(app.currentUser);
      return app.currentUser;
    } catch (e) {
      console.error('failed to login', e);
      setUser(null);
      return null;
    }
  };

  const loginAnonymous = async () => {
    try {
      await app.logIn(Realm.Credentials.anonymous());

      setUser(app.currentUser);
      return app.currentUser;
    } catch (e) {
      console.error('failed to login', e);
      setUser(null);
      return null;
    }
  };

  const logout = async () => {
    try {
      if (app.currentUser) {
        await app.currentUser.logOut();
      }
    } catch (e) {
      console.error('failed to logout', e);
    } finally {
      setUser(null);
    }
  };

  return <RealmContext.Provider value={{ login, loginAnonymous, logout, user }}>{children}</RealmContext.Provider>;
};

export const useRealm = () => {
  const realm = useContext(RealmContext);
  if (realm === null) {
    throw new Error('useRealm() called outside of a RealmProvider');
  }
  return realm;
};
