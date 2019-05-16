import React, { Component } from "react";
import NavStore from '../models/NavStore';
import { Icon } from "@blueprintjs/core";
/**
 * 
 */
class Titlebar extends Component
{

    render()
    {
        let e = NavStore.getActive();
        return (
            <div>
                <h3 className="bp3-heading">
                    <Icon icon={ e.icon } iconSize={23} style={{ marginBottom: 5, paddingRight: 5 }} /> { e.label }
                </h3>
            </div>
        );
    }

}

export default Titlebar;
