import React, { Component } from "react";
import Iframe from 'react-iframe'

/**
 * Home screen
 */
class DocumentationScreen extends Component
{
    /**
     * 
     */
    public render()
    {
        return (
            <div style={{padding: 20}}>
                <Iframe width="100%" height="1000" url="/documentation/index.html" />
            </div>
        );
    }
}

export default DocumentationScreen;
