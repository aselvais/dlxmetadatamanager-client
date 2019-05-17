import React, { Component } from "react";

interface formProps {
    data: object,
    config?: object
};

/**
 * 
 */
class Form extends Component<formProps, any>
{

    getFormElement(key : string = '')
    {
        let o = this.props.data[key] ? this.props.data[key] : null;
        let c = (this.props.config && typeof this.props.config[key] !== 'undefined') ? this.props.config[key] : null;

        if (!o || c === false) return null;
        return (
            <div>
                <div>{key}</div>
                <div> <input type="text" name={key} value={o}/> </div>
            </div>
        );
    }


    /**
     * 
     */
    render()
    {
        let form = Object.keys(this.props.data).map(k => this.getFormElement(k));
        return (<div>{form}</div>);
    }
}

export default Form;
