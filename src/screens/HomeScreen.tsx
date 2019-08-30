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
	/**
	 *
	 */
	public componentDidMount() {
		Schemadata.getlatesttokens();
		Applog.find();
	}

	/**
	 *
	 */
	public render() {
		return (
			<div>
				<div>
					<h3>Latest create / update / delete operations</h3>
					{Applog.loading ? <Spinner /> : <SimpleGrid data={Applog.collection} />}
				</div>
				<div>
					<h3>Latest created tokens</h3>
					{Schemadata.loading ? (
						<Spinner />
					) : (
						<SimpleGrid data={Schemadata.latesttokens} resetHeaders={true} />
					)}
				</div>
			</div>
		);
	}
}

export default HomeScreen;
