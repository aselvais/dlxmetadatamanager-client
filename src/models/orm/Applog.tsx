import AbstractModel from "./AbstractModel";
import { formConfigSchema, ApplogSchema } from "../interfaces";
import moment from "moment";

class Applog extends AbstractModel {
	public name: string = "applog";
	public document: ApplogSchema = {};
	public collection: Array<ApplogSchema> = [];
	public formConfig: formConfigSchema = {
		showButton: true,
		//buttonAction: 'updateOne',
		fill: true,
		vertical: true,
		elements: {
			insertdate: { "shape": "text", disabled: true},
			action: { "shape": "text", disabled: true},
			model: { "shape": "text", disabled: true},
			query: { "shape": "text", disabled: true},
			tokenCreated: { "shape": "text", disabled: true},
			User_id: { "shape": "text", disabled: true},
			isNewInstance: { "shape": "switch" , disabled: true},
            description: { "shape": "textarea"}
		}
	};

	/**
	 * 
	 * @param cl 
	 */
	protected aggregateAppData(cl : Array<any>)
	{
		let toret = [];
		let oo = {};
		cl.map(e => {
			let dat = moment(e.insertdate).format('YYYY-MM-DD');

			if (!oo[dat]) oo[dat] = {};

			if (!oo[dat][e._user_username]) oo[dat][e._user_username] = {};
			let action = e.action.replace(/after /,'') + ' action on ' + e.model;
			if (!oo[dat][e._user_username][action]) oo[dat][e._user_username][action] = e.nbrentries ? e.nbrentries : 1;

			if (e.action === 'bulk save') oo[dat][e._user_username][action] += e.nbrentries;
			else oo[dat][e._user_username][action]++;
			
			let ee = {
				insertdate : moment(e.insertdate).format('YYYY-MM-DD'),
				username : e._user_username,
				action : e.action.replace(/after/,'') + ' action on ' + e.model
			};

			toret.push(ee);
			return true;
		});

		var tt = [];
		for (let ddt in oo)
		{
			var tto = {};
			tto = {date: ddt};
			for (let usr in oo[ddt])
			{
				//@ts-ignore
				tto.user = usr;
				//@ts-ignore
				tto.actions = JSON.stringify(oo[ddt][usr])
					.replace(/\{|\}|"/g, '')
					.replace(/,/g,', ')
					.replace(/:/g,': ');
			}

			tt.push(tto);
		}
		return tt;
	}

	/**
	 * 
	 * @param where 
	 * @param include 
	 */
	public find(where : object = {}, include : string = 'user')
	{
		super.find(where, include, 'flattenObject', 'aggregateAppData');
	}


}

export default new Applog();
