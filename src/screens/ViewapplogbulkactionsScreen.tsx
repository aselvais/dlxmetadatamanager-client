import React, { Component } from "react";
import { observer } from "mobx-react";
import SimpleGrid from "../components/SimpleGrid";
import { Spinner } from "@blueprintjs/core";
import Viewapplogbulk from "../models/orm/Viewapplogbulk";

/**
 * Home screen
 */
@observer
class ViewapplogbulkactionsScreen extends Component {

	/**
	 *
	 */
	public componentDidMount() 
	{
		Viewapplogbulk.find({}, "", '', null, 100);
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
						<br/><br/>
					</div>
					{ Viewapplogbulk.loading ? <Spinner /> : <SimpleGrid data={Viewapplogbulk.collection} 
					includeOnlyClmns={[
						//"id",
						"User_id",
						"document_id",
						"insertdate",
						"applog_createddate",
						"document_createddate",
						"action",
						"collection"
					]} />}
				</div>
			</div>
		);

	}
}

export default ViewapplogbulkactionsScreen;
