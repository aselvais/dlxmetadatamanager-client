import React, { Component } from "react";
import { observer } from "mobx-react";
import SimpleGrid from "../components/SimpleGrid";
import { Spinner, ButtonGroup, Button } from "@blueprintjs/core";
import Viewapplogbulk from "../models/orm/Viewapplogbulk";

/**
 * Home screen
 */
@observer
class ViewapplogbulkactionsScreen extends Component {
	state = {
		collection: 'fields',
		limit: 100,
	};
	/**
	 *
	 */
	public componentDidMount() 
	{
		this.runQuery();
	}

	/**
	 * 
	 * @param collection 
	 */
	public runQuery(collection='fields')
	{
		this.setState({collection: collection});
		Viewapplogbulk.find(
			{collection: collection}, 
			"", 
			'mongoDateToLocalDate', 
			null, 
			this.state.limit,
			'applog_createddate DESC'
		);
	}

	/**
	 * 
	 */
	public getFiltersJSX()
	{
		let entities = [
			'systems',
			'origins',
			'databases',
			'schemas',
			'tables',
			'fields'
		];
		let jsx = [];
		entities.map(ent => jsx.push(<Button active={(ent === this.state.collection) ? true : false} onClick={() => this.runQuery(ent)}>{ent}</Button>) );
		return (<div style={{padding: 20}}><ButtonGroup>{jsx}</ButtonGroup></div>);
	}

	/**
	 *
	 */
	public render() {
		return (
			<div>
				<div>
					<h3>Applog bulk actions</h3>
					<div>
						Actions performed on each entity via a bulk update.
					</div>
					{this.getFiltersJSX()}
					{ Viewapplogbulk.loading ? <Spinner /> : <SimpleGrid data={Viewapplogbulk.collection} 
					includeOnlyClmns={[
						//"id",
						//"User_id",
						"username",
						//"document_id",
						//"schemadata_id",
						//"idh",
						//"insertdate",
						"applog_createddate",
						"document_createddate",
						"schemadata_createddate",
						"action",
						"collection",
						"database_name",
						"schema_name",
						"table_name",
						"column_name"
					]} />}
				</div>
			</div>
		);

	}
}

export default ViewapplogbulkactionsScreen;
