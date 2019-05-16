// @ts-check
import React, { Component } from 'react';
import { Spinner } from "@blueprintjs/core";

/**
 * 
 */
class SimpleGrid extends Component
{
    /**
     * 
     * @param {*} row 
     */
    getHeaderJsx(row)
    {
        return (<tr>{ Object.keys(row).map( e => <th key={e}>{e}</th>)}</tr>)
    }

    /**
     * 
     * @param {*} row 
     * @param {*} i 
     */
    getRowJsx(row, i)
    {
        let toret = [];
        for (let u in row) toret.push(row[u]);
        return (
            <tr key={i}>
            {toret.map(e => <td>{e}</td>)}
            </tr>
        )
    }

    /**
     * 
     */
    render()
    {
        if (this.props.data && this.props.data.length === 0) {
            return (<div><Spinner/></div>);
        } else {
            return (
                <div className="Grid">
                    <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped">
                        <thead className="thead-dark">
                            {this.props.data[0] ? this.getHeaderJsx(this.props.data[0]) : null}
                        </thead>
                        <tbody>
                            {(this.props.data && this.props.data.map) ? this.props.data.map((row, i) => this.getRowJsx(row, i)) : null}
                        </tbody>
                     </table>
                </div>
            );
        }
    }

}

export default SimpleGrid;
