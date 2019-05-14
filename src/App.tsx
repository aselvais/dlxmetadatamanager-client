import React, { Component } from 'react';
import HomeScreen from './screens/HomeScreen';
import Dlxnavigation from './components/Dlxnavigation';

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "@blueprintjs/table/lib/css/table.css";

/**
 * 
 */
class App extends Component
{

  /**
   * 
   */
  render()
  {

    return (
      <div className="globalContainer">
        <Dlxnavigation />
        <div className="mainContentSpace">
          <HomeScreen />      
        </div>
      </div>
    );

  }

}

export default App;
