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
import AggregationsScreen from './screens/AggregationsScreen';
import LoginScreen from './screens/LoginScreen';
import LogoutScreen from './screens/LogoutScreen';
import UsersmanagementScreen from './screens/UsersmanagementScreen';
import SearchglobalScreen from './screens/SearchglobalScreen';
import FieldgroupsScreen from './screens/FieldgroupsScreen';
import DataScreen from './screens/DataScreen';
import DiagramsScreen from './screens/DiagramsScreen';
import DocumentationScreen from './screens/DocumentationScreen';
import ViewapplogbulkactionsScreen from './screens/ViewapplogbulkactionsScreen';
import ViewapplogactionsScreen from './screens/ViewapplogactionsScreen';
import AdvancedsearchScreen from './screens/AdvancedsearchScreen';

/**
 * 
 */
@observer
class App extends Component {

  /**
   * 
   * @param name 
   */
  protected getActiveScreenJSX(name: string = '') {
    switch (name) {
      case 'LoadingScreen':
        return <LoadingScreen />;
      case 'HomeScreen':
        return <HomeScreen />;
      case 'ProfileScreen':
        return <ProfileScreen />;
      case 'SearchScreen':
        return <SearchScreen />;
      case 'UsersmanagementScreen':
        return <UsersmanagementScreen />;
      case 'AggregationsScreen':
        return <AggregationsScreen />;
      case 'TagsScreen':
        return <TagsScreen />;
      case 'FieldgroupsScreen':
          return <FieldgroupsScreen />
      case 'ApplicationcodesScreen':
        return <ApplicationcodesScreen />;
      case 'ViewapplogbulkactionsScreen':
        return <ViewapplogbulkactionsScreen />;
      case 'ViewapplogactionsScreen':
        return <ViewapplogactionsScreen />;
      case 'SemantictypesScreen':
        return <SemantictypesScreen />;
      case 'LandingdestinationsScreen':
        return <LandingdestinationsScreen />;
      case 'AuthenticationresourcesScreen':
        return <AuthenticationresourcesScreen />;
      case 'DataScreen':
          return <DataScreen />;
      case 'SearchglobalScreen':
          return <SearchglobalScreen />;
      case 'DocumentationScreen':
          return <DocumentationScreen />
      case 'AdvancedsearchScreen':
        return <AdvancedsearchScreen />
      case 'DiagramScreen':
          return <DiagramsScreen />;
      case 'LogoutScreen':
        return <LogoutScreen />;
      default:
        return null;
    }
  }

  /**
   * 
   */
  render() {
    let activeMenu = NavStore.getActive();
    if (Users.getToken() !== null) {
      return (
        <div className="globalContainer bp3-dark">
          {(activeMenu.name === 'LoadingScreen') ? null : <Dlxnavigation />}
          <div className="mainContentSpace">
            {(activeMenu.name === 'LoadingScreen') ? null : <Titlebar />}
            {this.getActiveScreenJSX(activeMenu.name)}
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
