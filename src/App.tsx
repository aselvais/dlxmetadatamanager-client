import React, { Component } from 'react';
import HomeScreen from './screens/HomeScreen';
import Dlxnavigation from './components/Dlxnavigation';
import { observer } from 'mobx-react';

import NavStore from './models/NavStore';
import LoadingScreen from './screens/LoadingScreen';
import Titlebar from './components/Titlebar';

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

    return (
      <div className="globalContainer bp3-dark">
          { (activeMenu.name === 'LoadingScreen') ? null : <Dlxnavigation /> }
        <div className="mainContentSpace">
          { (activeMenu.name === 'LoadingScreen') ? null : <Titlebar /> }
          { (activeMenu.name === 'LoadingScreen') ? <LoadingScreen /> : null }
          { (activeMenu.name === 'HomeScreen') ? <HomeScreen /> : null }          
        </div>
      </div>
    );

  }

}

export default App;
