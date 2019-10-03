// @ts-check
import React, { Component } from "react";
import { Spinner, Icon } from "@blueprintjs/core";
import _ from "lodash";
import Translator from "../libs/translate/Translator";

interface Props {
	data: Array<object>;
	resetHeaders?: boolean;
	includeOnlyClmns?: Array<string>
}

/**
 *
 */
class SimpleGrid extends Component<Props> {

	protected headers: Array<string> = [];

	state = {
		data: [],
		sortname: null,
		sortdirection: false
	};

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
	 * @param {*} row
	 * @param {*} i
	 */
	protected getRowJsx(row, i) {
		let toret = [];
		this.headers.map(r => toret.push((typeof row[r] !== 'undefined') ? (typeof row[r] === 'string') ? row[r] : JSON.stringify(row[r]) : ""));
		return (
			<tr key={i}>
				{toret.map(e => (
					<td>{e}</td>
				))}
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
							{this.state.data && this.state.data.map
								? this.state.data.map((row, i) => this.getRowJsx(row, i))
								: null}
						</tbody>
					</table>
				</div>
			);
		}
	}
}

export default SimpleGrid;
