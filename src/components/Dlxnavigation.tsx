import React, { Component } from "react";
import { Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Menu, MenuItem, Popover, Position } from "@blueprintjs/core";
import logo from '../assets/images/Deluxe_swish.png';
import { observer } from "mobx-react";
import NavStore from '../models/NavStore';
import Users from "../models/orm/Users";
import Searchglobal from "../models/orm/Searchglobal";

/**
 * 
 */
@observer
class Dlxnavigation extends Component
{
    /**
     * 
     * @param i 
     */
    public getButtonMenuJSX(i)
    {
        return Users.isAuthorized(i.role) ? (<Button key={i.name}
            className={Classes.MINIMAL} 
            icon={i.icon} 
            text={i.label}
            active={i.active} 
            onClick={() => NavStore.setActive(i.name)}
        />) : null;
    }

    /**
     * 
     * @param i 
     */
    public getMenuItemJSX(i)
    {
        if (i.sublevel && i.sublevel.length > 0)
        {
            return Users.isAuthorized(i.role) ? (
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
            ) : null;
        } else return this.getButtonMenuJSX(i);
    }

    /**
     * 
     * @param e 
     */
    private _handleSearchInputKeydown(e)
    {
        if (e.key === 'Enter' && Searchglobal.searchString !== '') {
            NavStore.setActive('SearchglobalScreen');
        }
    }


    /**
     * 
     */
    public render()
    {
        return (
            <div>
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    
                    <NavbarHeading  onClick={() => NavStore.setActive('HomeScreen')}>
                        <img src={logo} alt="Deluxe logo" height={20} style={{ paddingRight: 7 }} />Meta-data manager
                    </NavbarHeading>

                    <NavbarDivider />
                    { NavStore.items.map( i => i.menuVisible ? this.getMenuItemJSX(i) : null) }

                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <NavbarDivider />
                    <div className="bp3-input-group .modifier">
                        <span className="bp3-icon bp3-icon-search"></span>
                        <input className="bp3-input" 
                            type="search" 
                            placeholder="Global search" 
                            value={Searchglobal.searchString} 
                            onChange={(e) => Searchglobal.searchString = e.target.value }
                            onKeyDown={(e) => this._handleSearchInputKeydown(e) }
                            dir="auto"/>
                    </div>
                    <NavbarDivider />
                    {[10,11,12].map(i => Users.isAuthorized(NavStore.items[i].role) ? <Button 
                                            key={NavStore.items[i].name} 
                                            className={Classes.MINIMAL} 
                                            icon={NavStore.items[i].icon} 
                                            active={NavStore.items[i].active}  
                                            onClick={() => NavStore.setActive(NavStore.items[i].name)} /> : null)}
                </NavbarGroup>
            </Navbar>
            </div>
        );
    }
}

export default Dlxnavigation;
