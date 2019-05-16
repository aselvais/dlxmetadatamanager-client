import React, { Component } from "react";
import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
} from "@blueprintjs/core";
import logo from '../assets/images/Deluxe_swish.png';
import { observer } from "mobx-react";
import NavStore from '../models/NavStore';

/**
 * 
 */
@observer
class Dlxnavigation extends Component
{
    /**
     * 
     */
    render()
    {
        return (
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    
                    <NavbarHeading  onClick={() => NavStore.setActive('HomeScreen')}>
                        <img src={logo} alt="Deluxe logo" height={20} style={{ paddingRight: 7 }} />
                        Meta-data manager
                    </NavbarHeading>

                    <NavbarDivider />
                    {
                        NavStore.items.map( i => i.menuVisible ? 
                        <Button 
                            className={Classes.MINIMAL} 
                            icon={i.icon} 
                            text={i.label}
                            active={i.active} 
                            onClick={() => NavStore.setActive(i.name)}
                        /> : null)
                    }
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <NavbarDivider />
                    {[7,8].map(i => <Button 
                    className={Classes.MINIMAL} 
                    icon={NavStore.items[i].icon} 
                    active={NavStore.items[i].active} 
                    onClick={() => NavStore.setActive(NavStore.items[i].name)}/>) }

                    
                </NavbarGroup>
            </Navbar>
        );
    }
}

export default Dlxnavigation;
