import React, { Component } from "react";
import { observer } from "mobx-react";
import SimpleGrid from "../components/SimpleGrid";
import { Spinner } from "@blueprintjs/core";
import Viewapplogactions from "../models/orm/Viewapplogactions";

/**
 * Home screen
 */
@observer
class ViewapplogactionsScreen extends Component {

	/**
	 *
	 */
	public componentDidMount() 
	{
		Viewapplogactions.find({}, "", '', null, 100);
	}

	/**
	 *
	 */
	public render() {
		return (
			<div>
				<div>
					<h3>Applog actions</h3>
					<div>
						List of single actions (changes) on entities.
						<br/><br/>
					</div>
					{ Viewapplogactions.loading ? <Spinner /> : <SimpleGrid data={Viewapplogactions.collection} 
					includeOnlyClmns={[
						// "id",
						"User_id",
						"document_id",
						//"schemadata_id",
						//"idh",
						"insertdate",
						"applog_createddate",
						"document_createddate",
						//"schemadata_createddate",
						"action",
						"collection"
					]} />}
				</div>
			</div>
		);
	}
}

export default ViewapplogactionsScreen;
