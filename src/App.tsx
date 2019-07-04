import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Dlxnavigation from './components/Dlxnavigation';
import Titlebar from './components/Titlebar';

import NavStore from './models/NavStore';
import Users from './models/orm/Users';

import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';

import TagsScreen from './screens/TagsScreen';
import ApplicationcodesScreen from './screens/ApplicationcodesScreen';
import SemantictypesScreen from './screens/SemantictypesScreen';
import LandingdestinationsScreen from './screens/LandingdestinationsScreen';
import AuthenticationresourcesScreen from './screens/AuthenticationresourcesScreen';

import LoginScreen from './screens/LoginScreen';
import LogoutScreen from './screens/LogoutScreen';
import UsersmanagementScreen from './screens/UsersmanagementScreen';

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
            
            { (activeMenu.name === 'TagsScreen') ? <TagsScreen /> : null }
            { (activeMenu.name === 'ApplicationcodesScreen') ? <ApplicationcodesScreen /> : null }
            { (activeMenu.name === 'SemantictypesScreen') ? <SemantictypesScreen /> : null }
            { (activeMenu.name === 'LandingdestinationsScreen') ? <LandingdestinationsScreen /> : null }
            { (activeMenu.name === 'AuthenticationresourcesScreen') ? <AuthenticationresourcesScreen /> : null }

            { (activeMenu.name === 'UsersmanagementScreen') ? <UsersmanagementScreen /> : null }
            { (activeMenu.name === 'LogoutScreen') ? <LogoutScreen /> : null }
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
