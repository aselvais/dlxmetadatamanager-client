import React, { Component } from 'react';
import HomeScreen from './screens/HomeScreen';
import Dlxnavigation from './components/Dlxnavigation';


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
      <div className="globalContainer bp3-dark">
        <Dlxnavigation />
        <div className="mainContentSpace">
          <HomeScreen />      
        </div>
      </div>
    );

  }

}

export default App;
