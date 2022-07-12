(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{219:function(e,n){},221:function(e,n){},238:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(25),c=t(3),i=t(18),s=t(118),l=t.n(s),d=t(47),u=t(16),b=t(8),f=t(13),j=t(11),m=t(7),O=t(14),g=t(82),h=t(5),p=Object(r.createContext)(null),v=function(e){var n=e.children,t=new g.a({id:"amsterdam-ussnf"}),a=Object(r.useState)(t.currentUser),o=Object(f.a)(a,2),c=o[0],i=o[1],s=function(){var e=Object(O.a)(Object(m.a)().mark((function e(n,r){return Object(m.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.logIn(g.b.emailPassword(n,r));case 3:return i(t.currentUser),e.abrupt("return",t.currentUser);case 7:return e.prev=7,e.t0=e.catch(0),console.error("failed to login",e.t0),i(null),e.abrupt("return",null);case 12:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(n,t){return e.apply(this,arguments)}}(),l=function(){var e=Object(O.a)(Object(m.a)().mark((function e(){return Object(m.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("logging in anonymously"),e.next=4,t.logIn(g.b.anonymous());case 4:return i(t.currentUser),e.abrupt("return",t.currentUser);case 8:return e.prev=8,e.t0=e.catch(0),console.error("failed to login",e.t0),i(null),e.abrupt("return",null);case 13:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),d=function(){var e=Object(O.a)(Object(m.a)().mark((function e(){return Object(m.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!t.currentUser){e.next=4;break}return e.next=4,t.currentUser.logOut();case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error("failed to logout",e.t0);case 9:return e.prev=9,i(null),e.finish(9);case 12:case"end":return e.stop()}}),e,null,[[0,6,9,12]])})));return function(){return e.apply(this,arguments)}}();return Object(h.jsx)(p.Provider,{value:{login:s,loginAnonymous:l,logout:d,user:c},children:n})},x=function(){var e=Object(r.useContext)(p);if(null===e)throw new Error("useRealm() called outside of a RealmProvider");return e},y=Object(r.createContext)(null),w=function(e){var n=e.children,t=x().user,a=Object(r.useState)(null),o=Object(f.a)(a,2),c=o[0],i=o[1];return Object(r.useEffect)((function(){console.log("on user effect...setting data"),null!==t&&(console.log(t),console.log(t.profile),i(t.mongoClient("data")))}),[t]),Object(h.jsx)(y.Provider,{value:{data:_(c)},children:n})},k=function(){var e=Object(r.useContext)(y);if(null===e)throw new Error("useAtlas() called outside of a AtlasProvider");return e};function _(e){return e?{players:function(){return e.db("amsterdam").collection("players")},schedule:function(){return e.db("amsterdam").collection("schedule")},seasons:function(){return e.db("amsterdam").collection("seasons")},teams:function(){return e.db("amsterdam").collection("teams")},teamMatches:function(){return e.db("amsterdam").collection("team_matches")},playerMatches:function(){return e.db("amsterdam").collection("player_matches")}}:null}var z,S,C,A=t(15),E=t(19),L=t(35),M=t(93),P=t(26),T=E.a.div(z||(z=Object(A.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]))),I=E.a.div(S||(S=Object(A.a)(["\n  min-width: 360px;\n  padding: 1rem;\n  border: 1px solid;\n"]))),q=E.a.div(C||(C=Object(A.a)(["\n  min-width: 360px;\n  padding: 0 1rem 1rem 1rem;\n  margin-top: 0.5rem;\n"])));var B=function(){var e,n,t=Object(r.useState)(""),a=Object(f.a)(t,2),o=a[0],c=a[1],i=Object(r.useState)(""),s=Object(f.a)(i,2),l=s[0],d=s[1],u=x(),b=u.login,m=u.loginAnonymous,O=u.user,g=(null===(e=window.location.state)||void 0===e||null===(n=e.from)||void 0===n?void 0:n.pathname)||"/";return O?Object(h.jsx)(j.a,{to:g,replace:!0}):Object(h.jsxs)(T,{children:[Object(h.jsxs)(I,{children:[Object(h.jsx)(P.a,{style:{marginBottom:"1rem"},children:"Please log in using your credentials"}),Object(h.jsx)(M.a,{label:"Username",placeholder:"your.email@example.com",onChange:function(e){c(e.target.value)},value:o}),Object(h.jsx)(M.a,{label:"Password",type:"password",onChange:function(e){d(e.target.value)},value:l}),Object(h.jsx)(L.c,{style:{marginTop:"1rem"},variant:"primary",onClick:function(){return b(o,l)},children:"Login"})]}),Object(h.jsxs)(q,{children:[Object(h.jsx)(P.a,{style:{marginBottom:"0.5rem"},children:"Or log in as a guest"}),Object(h.jsx)(L.c,{variant:"primaryOutline",onClick:function(){return m()},children:"Login Anonymously"})]})]})};var F,U,W,N,R,H=function(e){var n=e.children,t=x().user,r=Object(j.f)();return t?n:Object(h.jsx)(j.a,{to:"/login",state:{from:r},replace:!0})},J=t(122),D=E.a.header(F||(F=Object(A.a)(["\n  text-align: center;\n"]))),K=E.a.div(U||(U=Object(A.a)(["\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  grid-column-gap: 5px;\n  justify-items: center;\n"]))),$=E.a.div(W||(W=Object(A.a)(["\n  margin-left: auto;\n  text-align: right;\n  padding-right: 0.5rem;\n"]))),G=Object(c.keyframes)(N||(N=Object(A.a)(["\n  from {\n    transform: rotate(-5deg);\n  }\n  to {\n    transform: rotate(5deg);\n  }\n"]))),Q=Object(E.a)(J.a)(R||(R=Object(A.a)(["\n  display: inline-block;\n  margin: 24px;\n  animation: "," 3s infinite alternate-reverse ease-in-out;\n  transform-origin: 50% 100%;\n"])),G);var V,X,Y,Z=function(){var e=x(),n=e.logout,t=e.user;return Object(h.jsxs)(D,{children:[Object(h.jsxs)(K,{children:[Object(h.jsx)(P.c,{style:{gridColumnStart:2},children:"Amsterdam Billiards League Site"}),t&&Object(h.jsxs)($,{children:[Object(h.jsx)(P.a,{children:"Logged in as ".concat("anon-user"===t.providerType?"guest":t.profile.email||t.id)}),Object(h.jsx)(L.c,{variant:"primaryOutline",onClick:n,children:"Logout"})]})]}),Object(h.jsx)(Q,{height:98})]})},ee=t(38),ne=t(42),te=t(28),re=E.a.div(V||(V=Object(A.a)(["\n  display: flex;\n"]))),ae=E.a.div(X||(X=Object(A.a)(["\n  display: flex;\n  flex-direction: column;\n"]))),oe=E.a.div(Y||(Y=Object(A.a)(["\n  display: flex;\n  flex-direction: column;\n"])));var ce,ie=function(e){var n=e.season,t=k().data,a=Object(r.useState)({}),o=Object(f.a)(a,2),c=o[0],i=o[1];return Object(r.useEffect)((function(){t&&n&&Promise.all([t.teamMatches().find({season_code:n.code}),t.teams().find({"season.code":n.code})]).then((function(e){var n=Object(f.a)(e,2),t=n[0],r=n[1],a=t.reduce((function(e,n){var t,r=e[n.left_team.code]||{wins:0,losses:0,gamesWon:0,gamesTotal:0};n.left_team.win?r.wins++:r.losses++,r.gamesWon+=n.left_team.games_won,r.gamesTotal+=n.left_team.games_won+n.right_team.games_won;var a=e[n.right_team.code]||{wins:0,losses:0,gamesWon:0,gamesTotal:0};return n.right_team.win?a.wins++:a.losses++,a.gamesWon+=n.right_team.games_won,a.gamesTotal+=n.right_team.games_won+n.left_team.games_won,Object(b.a)(Object(b.a)({},e),{},(t={},Object(u.a)(t,n.left_team.code,r),Object(u.a)(t,n.right_team.code,a),t))}),{}),o=r.reduce((function(e,n){return Object(b.a)(Object(b.a)({},e),{},Object(u.a)({},n.division_name,[].concat(Object(ne.a)(e[n.division_name]||[]),[n])))}),{});i(Object.entries(o).reduce((function(e,n){var t=Object(f.a)(n,2),r=t[0],o=t[1].map((function(e){var n=a[e.key];return Object(b.a)(Object(b.a)({},e),{},{rank:0,wins:n.wins,losses:n.losses,pct:n.gamesWon/n.gamesTotal})}));return o.sort((function(e,n){return e.wins===n.wins?e.losses===n.losses?n.pct-e.pct:e.losses-n.losses:n.wins-e.wins})),Object(b.a)(Object(b.a)({},e),{},Object(u.a)({},r,o.map((function(e,n){return Object(b.a)(Object(b.a)({},e),{},{rank:n+1})}))))}),{}))}))}),[n]),t?Object(h.jsx)(re,{children:n.leagues.map((function(e){return Object(h.jsx)(ae,{children:n.divisions[e].map((function(e){return Object(h.jsx)(oe,{children:c[e]&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(P.d,{children:e}),Object(h.jsx)(te.c,{data:c[e],columns:[Object(h.jsx)(te.d,{label:"Place"}),Object(h.jsx)(te.d,{label:"Team Name"}),Object(h.jsx)(te.d,{label:"W's"}),Object(h.jsx)(te.d,{label:"L's"}),Object(h.jsx)(te.d,{label:"PCT."})],children:function(e){var n=e.datum;return Object(h.jsxs)(te.b,{children:[Object(h.jsx)(te.a,{children:n.rank}),Object(h.jsx)(te.a,{children:n.name}),Object(h.jsx)(te.a,{children:n.wins}),Object(h.jsx)(te.a,{children:n.losses}),Object(h.jsx)(te.a,{children:n.pct.toFixed(3)})]},n.key)}})]})},e)}))},e)}))}):null},se=E.a.div(ce||(ce=Object(A.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  justify-content: center;\n"])));var le,de,ue,be,fe,je=function(e){var n=e.seasons,t=Object(r.useState)(),a=Object(f.a)(t,2),o=a[0],c=a[1];return Object(h.jsxs)(se,{children:[Object(h.jsx)(ee.b,{style:{width:"360px"},label:"Choose a season:",placeholder:"Select...",value:(null===o||void 0===o?void 0:o.name)||"",onChange:function(e){return c(n.find((function(n){return n.name===e})))},children:n.map((function(e){var n=e.code,t=e.name;return Object(h.jsx)(ee.a,{value:t,children:t},n)}))}),o&&Object(h.jsx)(ie,{season:o})]})},me=function(e){var n=e.user;return Object(h.jsx)("div",{children:Object(h.jsxs)("h1",{children:["Logged in with anonymous id: ",n.id]})})},Oe=function(){var e=x().loginAnonymous;return Object(h.jsx)("button",{onClick:e,children:"Log In"})},ge=t.p+"static/media/logo.6ce24c58.svg",he=E.a.div(le||(le=Object(A.a)(["\n  text-align: center;\n"]))),pe=E.a.header(de||(de=Object(A.a)(["\n  background-color: ",";\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: ",";\n"])),(function(e){return e.theme.colors.grays.base}),(function(e){return e.theme.colors.white})),ve=E.a.a(ue||(ue=Object(A.a)(["\n  color: ",";\n"])),(function(e){return e.theme.colors.blues.light1})),xe=Object(c.keyframes)(be||(be=Object(A.a)(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"]))),ye=E.a.img(fe||(fe=Object(A.a)(["\n  height: 40vmin;\n  pointer-events: none;\n  @media (prefers-reduced-motion: no-preference) {\n    animation: "," infinite 20s linear;\n  }\n"])),xe);var we,ke,_e=function(){var e=x().user;return Object(h.jsx)(he,{children:Object(h.jsxs)(pe,{children:[Object(h.jsx)(ye,{src:ge,alt:"logo"}),Object(h.jsxs)("p",{children:["Edit ",Object(h.jsx)("code",{children:"src/sandbox/sandbox.tsx"})," and save to reload."]}),Object(h.jsx)(ve,{href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"}),e?Object(h.jsx)(me,{user:e}):Object(h.jsx)(Oe,{})]})})},ze=t(130),Se=E.a.div(we||(we=Object(A.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  justify-content: center;\n"]))),Ce=E.a.div(ke||(ke=Object(A.a)(["\n  display: flex;\n"])));var Ae=function(e){var n=e.seasons,t=e.teams,a=k().data,o=Object(r.useState)(),c=Object(f.a)(o,2),i=c[0],s=c[1],l=Object(r.useState)(),d=Object(f.a)(l,2),j=d[0],m=d[1],O=Object(r.useMemo)((function(){return t.find((function(e){return e.name===(null===j||void 0===j?void 0:j.name)}))}),[j,t]),g=Object(r.useState)([]),p=Object(f.a)(g,2),v=p[0],x=p[1];return Object(r.useEffect)((function(){a&&Promise.all([a.schedule().find({"season.code":null===i||void 0===i?void 0:i.code,"season.day":null===O||void 0===O?void 0:O.season.day}),a.teamMatches().find({season_code:null===i||void 0===i?void 0:i.code,$or:[{"left_team.code":null===j||void 0===j?void 0:j.key},{"right_team.code":null===j||void 0===j?void 0:j.key}]}),a.playerMatches().find({season_code:null===i||void 0===i?void 0:i.code,$or:[{"left_player.team_code":null===j||void 0===j?void 0:j.key},{"right_player.team_code":null===j||void 0===j?void 0:j.key}]})]).then((function(e){var n=Object(f.a)(e,3),t=n[0],r=n[1],a=n[2],o=r.reduce((function(e,n){return Object(b.a)(Object(b.a)({},e),{},Object(u.a)({},n.week_num,n))}),{}),c=a.reduce((function(e,n){return Object(b.a)(Object(b.a)({},e),{},Object(u.a)({},n.week_num,[].concat(Object(ne.a)(e[n.week_num]||[]),[n])))}),{});x(t.map((function(e){var n=o[e.week_num];if(!n)return Object(b.a)(Object(b.a)({},e),{},{matches:[]});var t=n.fifth_set,r=n.left_team,a=n.right_team,i=c[e.week_num];return Object(b.a)(Object(b.a)({},e),{},{fifth_set:t,left_team:r,right_team:a,matches:i.map((function(e){return{type:e.type,is_forfeit:e.is_forfeit,left_player:e.left_player,right_player:e.right_player}}))})})).sort((function(e,n){return e.week_num-n.week_num})))}))}),[a,null===i||void 0===i?void 0:i.code,null===j||void 0===j?void 0:j.key,null===O||void 0===O?void 0:O.season.day]),a?Object(h.jsxs)(Se,{children:[Object(h.jsxs)(Ce,{children:[Object(h.jsx)(ee.b,{style:{width:"360px"},label:"Choose a season:",placeholder:"Select...",onChange:function(e){return s(n.find((function(n){return n.name===e})))},children:n.map((function(e){var n=e.code,t=e.name;return Object(h.jsx)(ee.a,{value:t,children:t},n)}))}),Object(h.jsx)(ee.b,{style:{width:"360px"},label:"Choose a team:",placeholder:"Select...",disabled:!i,onChange:function(e){return m(t.find((function(n){return n.name===e})))},children:t.filter((function(e){return e.season.name===(null===i||void 0===i?void 0:i.name)})).map((function(e){var n=e.key,t=e.name;return Object(h.jsx)(ee.a,{value:t,children:t},n)}))})]}),j&&Object(h.jsx)(h.Fragment,{children:v.map((function(e){var n=e.week_name,t=e.left_team,r=e.right_team,a=e.matches,o=(null===j||void 0===j?void 0:j.key)===(null===t||void 0===t?void 0:t.code)?"left":"right";return Object(h.jsx)(ze.a,{title:n,description:t&&r?"left"===o?"".concat(t.name," vs. ").concat(r.name):"".concat(r.name," vs. ").concat(t.name):"TBD",children:a.map((function(e){return Object(h.jsx)("pre",{style:{marginTop:"1rem",padding:"0.5rem",border:"1px solid"},children:Object(h.jsx)(P.e,{children:JSON.stringify(e,null,2)})})}))})}))})]}):null};var Ee,Le,Me=function(){var e=k().data,n=Object(r.useState)([]),t=Object(f.a)(n,2),a=t[0],o=t[1];Object(r.useEffect)((function(){e&&e.seasons().find().then(o)}),[e]);var c=Object(r.useState)({list:[],byKey:{}}),i=Object(f.a)(c,2),s=i[0],l=i[1];return Object(r.useEffect)((function(){e&&e.teams().find().then((function(e){return l({list:e,byKey:e.reduce((function(e,n){return Object(b.a)(Object(b.a)({},e),{},Object(u.a)({},n.key,n))}),{})})}))}),[e]),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(Z,{}),Object(h.jsxs)(j.d,{children:[Object(h.jsx)(j.b,{path:"/",element:Object(h.jsx)(H,{children:Object(h.jsx)(je,{seasons:a})})}),Object(h.jsx)(j.b,{path:"team",element:Object(h.jsx)(H,{children:Object(h.jsx)(Ae,{seasons:a,teams:s.list})})}),Object(h.jsx)(j.b,{path:"login",element:Object(h.jsx)(B,{})}),Object(h.jsx)(j.b,{path:"sandbox",element:Object(h.jsx)(_e,{})})]})]})},Pe=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,241)).then((function(n){var t=n.getCLS,r=n.getFID,a=n.getFCP,o=n.getLCP,c=n.getTTFB;t(e),r(e),a(e),o(e),c(e)}))},Te="".concat("https://d2va9gm4j17fy9.cloudfront.net","/fonts"),Ie=Object(c.css)(Ee||(Ee=Object(A.a)(["\n  @font-face {\n    font-family: 'Akzidenz';\n    font-weight: normal;\n    src: url('","/akzidgrostdreg.eot');\n    /* IE9 Compat Modes */\n    src: url('","/akzidgrostdreg.eot?#iefix')\n        format('embedded-opentype'),\n      /* Pretty Modern Browsers */ url('","/akzidgrostdreg.ttf')\n        format('truetype'),\n      /* Safari, Android, iOS */ url('","/akzidgrostdreg.svg#Akzidenz')\n        format('svg');\n    /* Legacy iOS */\n  }\n\n  @font-face {\n    font-family: 'Akzidenz';\n    font-weight: 600;\n    src: url('","/akzidgrostdmed.eot');\n    /* IE9 Compat Modes */\n    src: url('","/akzidgrostdmed.eot?#iefix')\n        format('embedded-opentype'),\n      /* IE6-IE8 */ url('","/akzidgrostdmed.woff') format('woff'),\n      /* Pretty Modern Browsers */ url('","/akzidgrostdmed.ttf')\n        format('truetype'),\n      /* Safari, Android, iOS */ url('","/akzidgrostdmed.svg#Akzidenz')\n        format('svg');\n    /* Legacy iOS */\n  }\n\n  @font-face {\n    font-family: 'Akzidenz';\n    font-weight: bold;\n    src: url('","/akzidgrostdmed.eot');\n    /* IE9 Compat Modes */\n    src: url('","/akzidgrostdmed.eot?#iefix')\n        format('embedded-opentype'),\n      /* IE6-IE8 */ url('","/akzidgrostdmed.woff') format('woff'),\n      /* Pretty Modern Browsers */ url('","/akzidgrostdmed.ttf')\n        format('truetype'),\n      /* Safari, Android, iOS */ url('","/akzidgrostdmed.svg#Akzidenz')\n        format('svg');\n    /* Legacy iOS */\n  }\n\n  html {\n    font-family: 'Akzidenz', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n    font-weight: normal;\n    font-style: normal;\n  }\n\n  body {\n    margin: 0;\n  }\n\n  *,\n  *:before,\n  *:after {\n    box-sizing: border-box;\n  }\n"])),Te,Te,Te,Te,Te,Te,Te,Te,Te,Te,Te,Te,Te,Te),qe=Object(c.css)(Le||(Le=Object(A.a)(["\n/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n"])));var Be=function(){return[qe,Ie]},Fe={colors:{black:"#000000",white:"#ffffff",offwhite:"#fffed1",grays:{base:"#282c34"},reds:{base:"#4d0a05",light1:"#8a1a10",light2:"#b42619",light3:"#df3121"},blues:{light1:"#61dafb"}},typography:{fonts:{code:"source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"}}};l.a.createRoot(document.getElementById("root")).render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(d.a,{basename:"/amsterdam",children:Object(h.jsx)(v,{children:Object(h.jsx)(w,{children:Object(h.jsx)(i.a,{children:Object(h.jsxs)(o.f,{theme:Fe,children:[Object(h.jsx)(c.Global,{styles:Be}),Object(h.jsx)(Me,{})]})})})})})})),Pe(console.log)}},[[238,1,2]]]);
//# sourceMappingURL=main.3c82d258.chunk.js.map