import React, { Component } from 'react';
import {observer} from "mobx-react";
import navStore from '../models/NavStore';

import {
  Alignment,
  Button,
  Navbar
} from "@blueprintjs/core";


/**
 * 
 */
class Topmenu extends Component {

  /**
   * 
   */
  render() {

    return (
        <Navbar className="bp3-dark">
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading><img src="Deluxe_enterprise_logo_RGB.png" height="20" alt="Deluxe Logo"/></Navbar.Heading>
                <Navbar.Divider />
                { navStore.items.map(i => <Button key={i.name} icon={i.icon} text={i.label} onClick={() => navStore.setActive(i.name)}/>)}
            </Navbar.Group>
        </Navbar>
    );

  }


}

export default observer(Topmenu);