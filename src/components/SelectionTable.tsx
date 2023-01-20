import React, { Component } from 'react';

/**
 * 
 */
class SelectionTable extends Component {

    /**
     * 
     * @param {*} field 
     */
    _format_field(v, colname='')
    {
        let fields_currency = ['tax_amount','taxable_revenue','job_total','exemptsales'];
        let formatter;
        colname = colname.split(' ')[0];
        if (fields_currency.includes(colname) === true)
        {
            formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
        }
        else
        {
            formatter = new Intl.NumberFormat('en-US', {});
        }
        return formatter.format(v);
    }

    /**
     * 
     * @param {*} row 
     * @param {*} i 
     */
    getRowJsx(row, i)
    {
        let jsxr = [];
        jsxr.push(<tr key={i+':01'}><th colSpan={2}>{row.label}</th></tr>);
        jsxr.push(<tr key={i+':02'}><td>Count</td><td>{row.count}</td></tr>);
        jsxr.push(<tr key={i+':03'}><td>Sum</td><td>{this._format_field(row.sum, row.label)}</td></tr>);
        jsxr.push(<tr key={i+':04'}><td>Mean</td><td>{this._format_field(row.mean, row.label)}</td></tr>);
        jsxr.push(<tr key={i+':05'}><td>Min</td><td>{this._format_field(row.min, row.label)}</td></tr>);
        jsxr.push(<tr key={i+':06'}><td>Max</td><td>{this._format_field(row.max, row.label)}</td></tr>);
        return jsxr;
    }

    /**
     * 
     */
    render()
    {
        return null;
        /*
        return (
            <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped">
            <tbody>
                {this.props.data.map((row, i) => row ? this.getRowJsx(row, i) : null )}
            </tbody>
         </table>
        );
        */
       
    }

}


export default SelectionTable;