import React, { useState, useReducer, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  withRouter,
  Link,
} from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';
import { GroupContextProvider } from './contexts/GroupContext';

import NavBar from './components/navBar';
// import Login from
// import Signup from
import LandingPage from './pages/landingPage';
import MainPage from './pages/mainPage';
import Footer from './components/footer';
import MyPage from './pages/myPage';
import GroupPage from './pages/groupPage';

import './App.css';
import landingPage from './pages/landingPage';
import mainPage from './pages/mainPage';

function Home({ match }) {
  return <h2>홈페이지데스</h2>;
}

function Test({ match }) {
  return <h2>기모찌</h2>;
}

function LinkTest() {
  return (
    <>
      <Link to="/">랜딩페이지로</Link>
      <Link to="/main">메인페이지로</Link>
      <Link to="/groupPage">그룹페이지로</Link>
    </>
  );
}

const App = () => {
  // const state = useUserState();
  // const dispatch = useUserDispatch();

  //   const GlobalStyle = createGlobalStyle`
  // 		body {

  // 		}
  // 	`;
  //   const state = useContext(UserStateContext);
  //   const dispatch = useContext(UserDispatchContext);

  //   console.log(state);

  return (
    // <UserProvider>
    //   <GroupProvider>
    //     <Test />
    <>
      <BrowserRouter>
        <UserContextProvider>
          <GroupContextProvider>
            <NavBar />
            <Switch>
              <Route exact path="/" component={landingPage} />
              <Route path="/main" component={mainPage} />
              <Route path="/groupPage" component={GroupPage} />
              <Route path="/userInfo" component={MyPage} />
            </Switch>
            <Footer />
          </GroupContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
};

export default withRouter(App);

// function App() {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div>
//       <button onClick={() => setIsOpen(true)}>Open Modal</button>
//       <ModalTest
//         open={isOpen}
//         onClose={() => {
//           setIsOpen(false);
//         }}
//       >
//         Modal Test
//       </ModalTest>
//     </div>
//   );
// }

// export default App;
