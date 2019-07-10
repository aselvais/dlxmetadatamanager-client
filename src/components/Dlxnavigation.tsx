import React, { Component } from "react";
import { Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Menu, MenuItem, Popover, Position } from "@blueprintjs/core";
import logo from '../assets/images/Deluxe_swish.png';
import { observer } from "mobx-react";
import NavStore from '../models/NavStore';

/**
 * 
 */
@observer
class Dlxnavigation extends Component
{

    getButtonMenuJSX(i)
    {
        return (<Button key={i.name}
            className={Classes.MINIMAL} 
            icon={i.icon} 
            text={i.label}
            active={i.active} 
            onClick={() => NavStore.setActive(i.name)}
        />);
    }

    /**
     * 
     * @param i 
     */
    getMenuItemJSX(i)
    {
        if (i.sublevel && i.sublevel.length > 0)
        {
            return (
                <Popover content={
                        <Menu className={Classes.ELEVATION_1} style={{maxWidth: 280, position: 'absolute'}}> 
                            {i.sublevel.map(e => <MenuItem icon={e.icon} key={e.name} text={e.label} onClick={() => NavStore.setActive(e.name)} />)}
                        </Menu>
                    } position={Position.BOTTOM_LEFT}>
                    <Button key={i.name}
                        className={Classes.MINIMAL} 
                        icon={i.icon} 
                        text={i.label}
                        active={i.active} 
                    />
                </Popover>
            );    
        } else return this.getButtonMenuJSX(i);
    }


    /**
     * 
     */
    render()
    {
        return (
            <div>
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    
                    <NavbarHeading  onClick={() => NavStore.setActive('HomeScreen')}>
                        <img src={logo} alt="Deluxe logo" height={20} style={{ paddingRight: 7 }} />
                        Meta-data manager
                    </NavbarHeading>

                    <NavbarDivider />
                    { NavStore.items.map( i => i.menuVisible ? this.getMenuItemJSX(i) : null) }

                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <NavbarDivider />
                    {[9,10,11].map(i => <Button key={NavStore.items[i].name} className={Classes.MINIMAL} 
                                        icon={NavStore.items[i].icon} active={NavStore.items[i].active}  
                                        onClick={() => NavStore.setActive(NavStore.items[i].name)} />) }
                </NavbarGroup>
            </Navbar>
            </div>
        );
    }
}

export default Dlxnavigation;
