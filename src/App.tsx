import React, { Component } from 'react';
import HomeScreen from './screens/HomeScreen';
import Dlxnavigation from './components/Dlxnavigation';
import { observer } from 'mobx-react';

import NavStore from './models/NavStore';
import LoadingScreen from './screens/LoadingScreen';
import Titlebar from './components/Titlebar';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import Users from './models/Users';
import LoginScreen from './screens/LoginScreen';

/**
 * 
 */
@observer
class App extends Component
{

  /**
   * 
   */
  render()
  {
    let activeMenu = NavStore.getActive();

    if (Users.getToken() !== null)
    {
      return (
        <div className="globalContainer bp3-dark">
            { (activeMenu.name === 'LoadingScreen') ? null : <Dlxnavigation /> }
          <div className="mainContentSpace">
            { (activeMenu.name === 'LoadingScreen') ? null : <Titlebar /> }
            { (activeMenu.name === 'LoadingScreen') ? <LoadingScreen /> : null }
            { (activeMenu.name === 'HomeScreen') ? <HomeScreen /> : null }
            { (activeMenu.name === 'ProfileScreen') ? <ProfileScreen /> : null }
            { (activeMenu.name === 'SearchScreen') ? <SearchScreen /> : null }
          </div>
        </div>
      );
    } else {
      return (
        <div className="globalContainer bp3-dark">
          <LoginScreen />
        </div>
      );
    }



  }

}

export default App;
