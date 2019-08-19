import React, { Component } from "react";
import Iframe from 'react-iframe'
import { ButtonGroup, Button } from "@blueprintjs/core";

/**
 * Home screen
 */
class DocumentationScreen extends Component
{
    state = {
        selectedId: 0
    };
    /**
     * 
     */
    public render()
    {
        return (
            <div style={{padding: 20}}>
                <div style={{padding: 20}}>
                    <ButtonGroup>
                        <Button onClick={() => this.setState({selectedId: 1})}>Front-end Technical</Button>
                        <Button onClick={() => this.setState({selectedId: 2})}>Back-end Technical</Button>
                        <Button onClick={() => this.setState({selectedId: 3})}>Back-end public API</Button>
                    </ButtonGroup>
                </div>
                {(this.state.selectedId === 0) ? <div style={{padding: 27}}>Please select an option...</div> : null }
                {(this.state.selectedId === 1) ? <Iframe frameBorder={0} width="100%" height="1000" url="/documentation/index.html" /> : null }
                {(this.state.selectedId === 2) ? <Iframe frameBorder={0} width="100%" height="1000" url="/documentation2/index.html" /> : null }
                {(this.state.selectedId === 3) ? (<div style={{backgroundColor: "#FFF"}}><Iframe frameBorder={0} width="100%" height="1000" url="/explorer/index.html" /></div>) : null }
            </div>
        );
    }
}

export default DocumentationScreen;
