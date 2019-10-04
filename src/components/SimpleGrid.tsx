// @ts-check
import React, { Component } from "react";
import { Spinner, Icon, ProgressBar, Intent } from "@blueprintjs/core";
import _ from "lodash";
import Translator from "../libs/translate/Translator";

interface Props {
	data: Array<object>;
	resetHeaders?: boolean;
	includeOnlyClmns?: Array<string>,
	formatter?: Object
}

/**
 *
 */
class SimpleGrid extends Component<Props> {
	/** */
	protected headers: Array<string> = [];
	/** */
	state = {
		data: [],
		sortname: null,
		sortdirection: false
	};

	/**
	 * 
	 */
	componentDidMount()
	{
		this.setState({data: this.props.data});
	}

	/**
	 *
	 * @param {*} row
	 */
	protected getHeaderJsx(row: Array<string> = []) {
		return (
			<tr>
				{row.map(e => (
					<th key={e} 
					className="cantselect"
					style={{cursor: 'pointer'}} 
					onClick={() => this._sortOnColumn(e)}
				>{
					Translator.t(e)
				}{ (this.state.sortname === e) ? (<div style={{ float: "right" }}><Icon icon={this.state.sortdirection ? "sort-asc" : "sort-desc"} /></div>) : null }</th>
				))}
			</tr>
		);
	}

	/**
	 * 
	 * @param val 
	 * @param name 
	 */
	protected _formatter(val:any='', name:string = '')
	{
		switch(name) {
			case 'precent':
				let vv = parseInt(val)/100;
				let intent : Intent = 'primary';
				if (vv === 1) intent = 'success';
				if (vv <= 0.3) intent = 'danger';
				if (vv > 0.3 && vv < 0.5) intent = 'warning';
				if (vv >= 0.5 && vv < 1) intent = 'primary';
				if (vv > 1) intent = 'danger';
				return (<ProgressBar intent={intent} value={vv} stripes={false} />);
			case 'booleanled':
				return (<Icon icon="full-circle" intent={
					val ? (val > 1) ? 'warning' : 'success' : 'danger'
				} iconSize={12} />);
			default:
				return val;
		}
	}

	/**
	 * 
	 * @param row 
	 * @param r 
	 */
	protected _formatEntry(row, r)
	{
		if (this.props.formatter && this.props.formatter[r]) { 
			return this._formatter(row[r], this.props.formatter[r]);
		} else {
			return (typeof row[r] === 'string') ? row[r] : JSON.stringify(row[r]);
		} 
	}

	/**
	 *
	 * @param {*} row
	 * @param {*} i
	 */
	protected getRowJsx(row, i) {
		let toret = [];
		this.headers.map(r => toret.push(
			(typeof row[r] !== 'undefined') ? this._formatEntry(row, r) : ""
		));
		return (
			<tr key={i}>
				{toret.map(e => <td>{e}</td>)}
			</tr>
		);
	}

	/**
	 * 
	 * @param k 
	 */
	protected _sortOnColumn(k : string = '')
	{
		let d = _.orderBy(
			this.state.data,
			[k],
			[this.state.sortdirection ? "asc" : "desc"]
		);
		let v = (this.state.sortname === k) ? !this.state.sortdirection : true;
		this.setState({sortname: k, sortdirection: v, data: d});
	}

	/**
	 *
	 */
	protected getHeaders() {
		if (this.props.resetHeaders === true) {
			//@ts-ignore
			this.headers = _.uniq(
				_.flattenDeep(this.state.data.map(e => Object.keys(e)))
			);
		} else if (this.props.includeOnlyClmns && this.props.includeOnlyClmns.length > 0) {
			this.headers = this.props.includeOnlyClmns;
		} else {
			this.headers = this.state.data[0] ? Object.keys(this.state.data[0]) : [];
		}
		return this.getHeaderJsx(this.headers);
	}

	/**
	 *
	 */
	public render() {
		if (
			this.state.data === null ||
			(this.state.data && this.state.data.length === 0)
		) {
			return (
				<div>
					<Spinner />
				</div>
			);
		} else {
			return (
				<div className="Grid">
					<table className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped">
						<thead className="thead-dark">{this.getHeaders()}</thead>
						<tbody>
						{(this.state.data && this.state.data.map) ? this.state.data.map((row, i) => this.getRowJsx(row, i)) : null}
						</tbody>
					</table>
				</div>
			);
		}
	}
	
}

export default SimpleGrid;
