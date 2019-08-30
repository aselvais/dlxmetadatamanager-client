// @ts-check
import React, { Component } from "react";
import { Spinner } from "@blueprintjs/core";
import _ from "lodash";

interface Props {
	data: Array<object>;
	resetHeaders?: boolean;
}

/**
 *
 */
class SimpleGrid extends Component<Props> {

	protected headers: Array<string> = [];

	/**
	 *
	 * @param {*} row
	 */
	protected getHeaderJsx(row: Array<string> = []) {
		return (
			<tr>
				{row.map(e => (
					<th key={e}>{e}</th>
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
		this.headers.map(r => toret.push(row[r] ? row[r] : ""));
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
	 */
	protected getHeaders() {
		if (this.props.resetHeaders === true) {
			//@ts-ignore
			this.headers = _.uniq(
				_.flattenDeep(this.props.data.map(e => Object.keys(e)))
			);
		} else {
			this.headers = this.props.data[0] ? Object.keys(this.props.data[0]) : [];
		}
		return this.getHeaderJsx(this.headers);
	}

	/**
	 *
	 */
	public render() {
		if (
			this.props.data === null ||
			(this.props.data && this.props.data.length === 0)
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
							{this.props.data && this.props.data.map
								? this.props.data.map((row, i) => this.getRowJsx(row, i))
								: null}
						</tbody>
					</table>
				</div>
			);
		}
	}
}

export default SimpleGrid;
