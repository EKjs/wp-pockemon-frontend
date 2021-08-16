import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import 'bootstrap/scss/bootstrap.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Carousel } from 'bootstrap';
import {LoginProvider} from './components/LoginContext';
import MainPage from "./components/MainPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MenuBar from "./components/MenuBar";
import CreateGame from "./components/CreateGame";
import FindGame from "./components/FindGame";
import MyGames from "./components/MyGames";
import Game from "./components/Game";
import AuthState from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from "./components/NotFound";
import LeaderBoard from "./components/LeaderBoard";

function App() {
  console.log(Carousel);
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const value = { isLoggedIn, setIsLoggedIn };

  return (
    <div>
      <AuthState>
      <MenuBar/>
      <div className='container'>
      <div className='row  justify-content-center mt-3'>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/leaderboard" component={LeaderBoard}/>
          <ProtectedRoute exact path='/creategame' component={CreateGame} />
          <ProtectedRoute exact path='/findgame' component={FindGame} />
          <ProtectedRoute exact path='/mygames' component={MyGames} />
          <ProtectedRoute exact path='/play/:gameId' component={Game} />
          <Route path='*' component={NotFound} />
        </Switch>
        </div>
      </div>
      
      <LoginProvider value={value}>

          
        </LoginProvider>

        </AuthState>
    </div>
  );
}

export default App;
