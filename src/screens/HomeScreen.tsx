import React, { Component } from "react";
import { observer } from "mobx-react";
import SimpleGrid from "../components/SimpleGrid";
import Schemadata from "../models/orm/Schemadata";
import { Spinner } from "@blueprintjs/core";

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
    }

	/**
	 *
	 */
	public render() {
		return (
			<div>
				<h3>Latest created tokens</h3>
				{Schemadata.loading ? (
					<Spinner />
				) : (
					<SimpleGrid data={Schemadata.latesttokens} />
				)}
			</div>
		);
	}
}

export default HomeScreen;
