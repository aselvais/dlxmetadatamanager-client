import React, { Component } from "react";
import { observer } from "mobx-react";
import SimpleGrid from "../components/SimpleGrid";
import Schemadata from "../models/orm/Schemadata";
import { Spinner } from "@blueprintjs/core";
import Applog from "../models/orm/Applog";

/**
 * Home screen
 */
@observer
class HomeScreen extends Component {

	private _numberOfDays = 5;


	/**
	 *
	 */
	public componentDidMount() {
		Schemadata.getlatesttokens();
		Applog.find({"insertdate":{"gte": Date.now() - this._numberOfDays * 24 * 3600 * 1000 }});
	}

	/**
	 *
	 */
	public render() {

		return (
			<div>
				<div>
					<h3>Latest create / update / delete operations (past {this._numberOfDays} days)</h3>
					{Applog.loading ? <Spinner /> : <SimpleGrid data={Applog.collection} includeOnlyClmns={["insertdate", "action", "model", "tokenCreated", "_user_realm", "_user_username"]} />}
				</div>
				<div>
					<h3>Latest created tokens</h3>
					{Schemadata.loading ? (
						<Spinner />
					) : (
						<SimpleGrid data={Schemadata.latesttokens} includeOnlyClmns={["ttl","created","username","realm","email","role"]} />
					)}
				</div>
			</div>
		);

	}
}

export default HomeScreen;
