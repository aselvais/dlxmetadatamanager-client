import React, { Component } from "react";
import { observer } from "mobx-react";
import SimpleGrid from "../components/SimpleGrid";
import Schemadata from "../models/orm/Schemadata";
import { Spinner } from "@blueprintjs/core";
import Applog from "../models/orm/Applog";
import Viewlastinserteddata from "../models/orm/Viewlastinserteddata";


/**
 * Home screen
 */
@observer
class HomeScreen extends Component {

	private _numberOfDays = 60;
	private _lastEntries = 50;


	/**
	 *
	 */
	public componentDidMount() {
		Schemadata.getlatesttokens();
		Applog.find({"insertdate":{"gte": Date.now() - this._numberOfDays * 24 * 3600 * 1000 }});
		Viewlastinserteddata.find({}, "", '', null, this._lastEntries, "date_field DESC");
	}

	/**
	 *
	 */
	public render() {

		return (
			<div>
				<div>
					<h3>Latest created fields / columns (last {this._lastEntries} entries)</h3>
					{
						Viewlastinserteddata.loading 
						? 
							<Spinner /> 
						: 
							<SimpleGrid data={Viewlastinserteddata.collection} includeOnlyClmns={[
								"name_systems", "name_origins", "name_databases", "name_schemas", "name_table", "name_field",
								// "date_systems", "date_origins",
								"date_schemas", "date_tables", "date_field"
							]} formatter={{
								"date_schemas": "datetime", "date_tables": "datetime", "date_field": "datetime"
							}}/>
					}
				</div>
				<div>
					<h3>Latest create / update / delete operations (past {this._numberOfDays} days)</h3>
					{
						Applog.loading 
						? 
							<Spinner /> 
						: 
							<SimpleGrid data={Applog.collection}  />
					}
				</div>
				<div>
					<h3>Latest created tokens</h3>
					{
						Schemadata.loading 
						? 
							<Spinner /> 
						: 
							<SimpleGrid data={Schemadata.latesttokens} includeOnlyClmns={["ttl","created","username","realm","email","role"]} /> 
					}
				</div>
			</div>
		);

	}
}

export default HomeScreen;
