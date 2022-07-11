import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { useRealm } from '../../realm';

interface Props {
  children: JSX.Element;
}

function ProtectedRoute({ children }: Props) {
  let { user } = useRealm();
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
