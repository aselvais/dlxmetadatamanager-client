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

/**
 * 
 */
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
                    <NavbarHeading>DLX Meta-data manager</NavbarHeading>
                    <NavbarDivider />
                    <Button className={Classes.MINIMAL} icon="home" text="Home" />
                    <Button className={Classes.MINIMAL} icon="document" text="Files" />
                </NavbarGroup>
            </Navbar>
        );
    }
}

export default Dlxnavigation;
