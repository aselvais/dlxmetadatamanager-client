import React, { Component } from "react";
import Iframe from 'react-iframe'

/**
 * Home screen
 */
class DiagramsScreen extends Component
{
    /**
     * 
     */
    public render()
    {
        return (
            <div style={{padding: 0}}>
                <Iframe frameBorder={0} width="1920" height="1080" url="/viz/index.html" />
            </div>
        );
    }
}

export default DiagramsScreen;
