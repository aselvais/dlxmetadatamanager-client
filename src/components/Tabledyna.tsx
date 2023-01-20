// @ts-check
import React, { Component } from 'react';
import { ResizeSensor, Menu, MenuItem } from "@blueprintjs/core";
import { 
    Cell, 
    Column, 
    Table,
    CopyCellsMenuItem,
    ColumnHeaderCell,
    TableLoadingOption 
} from "@blueprintjs/table";
import navStore from '../models/NavStore';
import SelectionTable from './SelectionTable';

/**
 * 
 */
class Tabledyna extends Component {

    _topBarHeigth = 190;
    _sideBarWidth = 300;
    state = {
        myheigth: window.innerHeight - this._topBarHeigth,
        mywidth: window.innerWidth - this._sideBarWidth
    };

    /**
     * 
     * @param {*} entries 
     */
    handleResize(entries) {
        this.setState({
            myheigth: (window.innerHeight - this._topBarHeigth ), 
            mywidth: window.innerWidth - this._sideBarWidth
        });
    }

    /**
     * 
     * @param {*} v 
     * @param {*} columnIndex 
     */
    _format_field(v, columnIndex=0)
    {
        /*
        let fields_currency = ['tax_amount','taxable_revenue','job_total','exemptsales'];
        let colname = '';
        let formatter;
        try {
            colname = tabledynaStore.data.headers[columnIndex].split(' ')[0];
        } catch(ee) {}

        // Create our number formatter.
        if (fields_currency.includes(colname) === true)
        {
            formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
        }
        else
        {
            formatter = new Intl.NumberFormat('en-US', {});
        }
        return formatter.format(v);
        */
    }

    /**
     * 
     * @param {*} rowIndex 
     * @param {*} columnIndex 
     */
    cellRenderer(rowIndex, columnIndex)
    {
        /*
        let d = tabledynaStore.data.data[rowIndex][columnIndex];
        return (<Cell>{(typeof(d) == 'number') ? this._format_field(d, columnIndex) : d }</Cell>);
        */
    };

    /**
     * 
     */
    renderBodyContextMenu(context)
    {
        /*
        return (
            <Menu>
                <CopyCellsMenuItem
                    context={context}
                    getCellData={(rowIndex, columnIndex) => tabledynaStore.data.data[rowIndex][columnIndex]}
                    text="Copy" />
            </Menu>
        );
        */
    }

    /**
     * 
     * @param {Number} colIdx 
     */
    columnHeaderCellRenderer(colIdx=0)
    {
        /*
        return <ColumnHeaderCell 
                    name={tabledynaStore.data.headers[colIdx]} 
                    menuRenderer={sortColumn => this.renderColContextMenu(sortColumn)} 
                />;
        */
    }

    /**
     * 
     * @param {Number} idx 
     */
    renderColContextMenu(idx) 
    {
        /*
        return (
            <Menu>
                <MenuItem icon="sort-asc" onClick={() => tabledynaStore.sortColumn(idx, true)} text="Sort Asc" />
                <MenuItem icon="sort-desc" onClick={() => tabledynaStore.sortColumn(idx, false)} text="Sort Desc" />
            </Menu>
        );
        */
    }

    /**
     * 
     */
    render() 
    {
        return null;
        /*
        if (tabledynaStore && 
            tabledynaStore.data.headers && 
            tabledynaStore.data.headers.length > 0 && 
            tabledynaStore.data.data.length > 0) 
        {
            let l = tabledynaStore.data.data.length;
            return(
                <ResizeSensor onResize={(entries) => this.handleResize(entries)}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{width: this.state.mywidth}}>
                        <div className="tableContainer" style={{height: this.state.myheigth}}>
                            <Table 
                                loadingOptions={tabledynaStore.computing ? [TableLoadingOption.CELLS] : []}
                                numRows={l}
                                bodyContextMenuRenderer={(context) => this.renderBodyContextMenu(context)} 
                                onSelection={(IRegion) => tabledynaStore.onSelection(IRegion)}
                                >
                                { tabledynaStore.data.headers.map(cl => 
                                <Column 
                                    key={cl} 
                                    name={cl} 
                                    columnHeaderCellRenderer={colIdx => this.columnHeaderCellRenderer(colIdx)}
                                    cellRenderer={(rowIndex, columnIndex) => this.cellRenderer(rowIndex, columnIndex)}
                                />) }
                            </Table>
                        </div>
                    </div>
                    <div style={{width: this._sideBarWidth, marginLeft: 15}}>
                    {(tabledynaStore.selection && tabledynaStore.selection.length > 0) ? <SelectionTable data={tabledynaStore.selection}/> : null}
                    </div>
                </div>
                </ResizeSensor>
            );
        } else return null;
        */
    }

}

export default Tabledyna;
