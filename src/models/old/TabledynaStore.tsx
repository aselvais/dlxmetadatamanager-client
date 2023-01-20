// @ts-check
import { decorate, observable, action, toJS } from "mobx";
import {sum, mean, min, max} from 'lodash';
/**
 * 
 */
class TabledynaStore {
    data = {};
    previous_data = {};
    loading = false;
    computing = false;
    _timeoutvar = null;
    selection = [];

    /**
     * 
     * @param {*} b 
     */
    _combineData(b={}, source='')
    {
        /*
        let toret = {};
        let a = this.previous_data;
        // headers
        if (a.headers)
        {
            toret.headers = a.headers;
            toret.headers.push(b.headers[1] + ' ' + source);
        }
        else
        {
            toret.headers = b.headers;
        }
        // columns content
        if (a.data)
        {
            let o = {};
            let o_left = [];
            let full_length = 0;
            a.data.map(e => o[e[0]] = e);
            b.data.map(e => {
                if (o[e[0]]) 
                { 
                    o[e[0]].push(e[e.length-1]);
                    if (full_length === 0) full_length = o[e[0]].length;
                } else o_left.push(e);
                return null;
            });
            // add 0 values in the new colum
            for (let l in o) 
            {
                if (o[l].length < full_length) o[l].push(0);
            }
            // add new lines if any
            o_left.map(e => {
                o[e[0]] = [e[0]];
                for (let i=1; i < full_length-1; i++) o[e[0]].push(0);
                o[e[0]].push(e[e.length-1]);
                return null;
            });

            toret.data = Object.values(o);
        }
        else
        {
            toret.data = b.data;
        }
        return toret;
        */
    }

    /**
     * 
     */
    getAPIdata(apiUrl='', resetTable=true, source='')
    {
        /*
        this.previous_data = toJS(this.data);
        this.data = {};
        this.selection = [];
        this.loading = true;
        let url = apiUrl;
        fetch(url).then(response => {
                if (response.status !== 200) {
                    this.data = {};
                    this.loading = false;
                    return;
                }
                response.json().then(
                    d => 
                    { 
                        if (d.error === 0)
                        {
                            if (resetTable)
                                this.data = d.data;
                            else
                                this.data = this._combineData(d.data, source);
                            this.loading = false;
                        }
                        else 
                        {
                            this.data = {};
                            this.loading = false;
                        }
                    }
                );
            }
        ).catch(err => {
            this.data = {};
            this.loading = false;
        });
        */
    }

    /**
     * 
     * @param {*} IRegion 
     */
    _getSelectedData(IRegion=[])
    {
        /*
        let retCols = [];
        for(let r=0; r < IRegion.length; r++)
        {
            let s = IRegion[r];
            let fromCol = s.cols[0];
            let toCol = s.cols[1];
            let fromRow = s.rows ? s.rows[0] : 0;
            let toRow = s.rows ? s.rows[1] : (this.data.data.length-1);
            for(let x=fromCol; x <= toCol; x++)
            {
                for(let y=fromRow; y <= toRow; y++)
                {
                    if (!retCols[x]) retCols[x] = [];
                    retCols[x].push(this.data.data[y][x]);
                }
            }
        }
        return retCols;
        */
    }

    /**
     * 
     * @param {*} IRegion 
     */
    _computeSelection(IRegion=[])
    {
        /*
        let d = [];
        try {
            d = this._getSelectedData(IRegion).map((c,idx) => {
                return {
                    colIdx : idx,
                    label : this.data.headers[idx],
                    data : c,
                    count: c.length,
                    sum : sum(c),
                    mean: mean(c),
                    min : min(c),
                    max : max(c)
                };
            });
        }
        catch(e)
        {
            // console.warn(e);
        }
        this.selection = d;
        */
    }

    /**
     * 
     * @param {*} idx 
     * @param {*} asc 
     */
    sortColumn(idx=0, asc=true)
    {
        /*
        let d = toJS(this.data.data);
        if (typeof(d[0][idx]) == 'number')
        {
            this.data.data = asc ? d.sort((a, b) => a[idx] - b[idx]) : d.sort((a, b) => b[idx] - a[idx]);
        }
        else if (typeof(d[0][idx]) == 'string')
        {
            this.data.data = asc ? d.sort((a, b) => ('' + a[idx]).localeCompare('' + b[idx])) : d.sort((a, b) => ('' + b[idx]).localeCompare('' + a[idx]));
        }
        */
    };


    /**
     * 
     * @param {*} IRegion 
     */
    onSelection(IRegion=[])
    {
        try {
            clearTimeout(this._timeoutvar);
        } catch(ee) {};
        this._timeoutvar = setTimeout(() => this._computeSelection(IRegion), 300);
    }

}

// configure MobX
decorate(TabledynaStore, {
    data: observable,
    computing: observable,
    selection: observable,
    loading: observable,
    getAPIdata: action,
    onSelection: action,
    sortColumn: action
});

const tabledynaStore = new TabledynaStore();
export default tabledynaStore;
