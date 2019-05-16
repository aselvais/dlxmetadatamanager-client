import React, { Component } from 'react';

/**
 * 
 */
class Grid extends Component {

    /**
     * 
     * @param {*} row 
     * @param {*} i 
     */
    getHeaderJsx(row, i)
    {
        let keys = Object.keys(row);
        return ( <tr key={i}>{keys.map(e => <th key={e+i}>{e}</th>)}</tr> );
    }

    /**
     * 
     * @param {*} row 
     * @param {*} i 
     */
    getRowJsx(row, i)
    {
        let keys = Object.keys(row);
        return ( <tr key={i}>{keys.map(e => <td key={e+i}>{row[e]}</td>)}</tr> );
    }

    /**
     * 
     */
    render() {
        if (this.props.data.length === 0) {
            return (
                <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated progbar" role="progressbar" ariaValuenow="75" ariaValuemin="0" ariaValuemax="100"></div>
                </div>
            );
        } else {
            return (
                <div className="Grid">
                    <table className="table table-striped table-bordered table-responsive table-sm">
                        <thead className="thead-dark">
                            {this.getHeaderJsx(this.props.data[0])}
                        </thead>
                        <tbody>
                            {this.props.data.map((row, i) => this.getRowJsx(row, i))}
                        </tbody>
                     </table>
                </div>
            );
        }
    }


}

export default Grid;
