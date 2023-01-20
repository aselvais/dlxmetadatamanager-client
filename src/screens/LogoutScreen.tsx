import React, { Component } from "react";
import { Spinner } from "@blueprintjs/core";
import Users from "../models/orm/Users";

/**
 * 
 */
class LogoutScreen extends Component {

    /**
     * 
     */
    public componentDidMount()
    {
        Users.logout();
    }

    /**
     * 
     */
    public render() {
        return (
            <div style={{ padding: 100, margin: 'auto'}}>
                <Spinner />
            </div>
        );
    }
}


export default LogoutScreen;