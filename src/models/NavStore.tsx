import { observable, action } from "mobx";
import { MenuItem } from "../models/interfaces";

/**
 * 
 */
class NavStore
{

    /**
     * 
     */
    @observable items : Array<MenuItem> = [
        {name: 'LoadingScreen', label: 'Loading', active: false, icon: 'home', menuVisible: false},
        
        {name: 'HomeScreen', label: 'Home', active: false, icon: 'home', menuVisible: true},
        {name: 'SearchScreen', label: 'Explore', active: false, icon: 'search', menuVisible: true},
        {name: 'UsersmanagementScreen', label: 'Users', active: false, icon: 'key', menuVisible: true},

        {name: 'AggregationsScreen', label: 'Aggregations', active: false, icon: 'horizontal-bar-chart', menuVisible: true},
        {name: 'DatadictionariesScreen', label: 'Data dictionaries', active: false, icon: 'th-list', menuVisible: true, sublevel: [
            {name: 'ApplicationcodesScreen', label: 'Application codes', active: false, icon: 'code', menuVisible: true},
            {name: 'TagsScreen', label: 'Tags', active: false, icon: 'tag', menuVisible: true},
            {name: 'SemantictypesScreen', label: 'Semantic types', active: false, icon: 'comment', menuVisible: true},
            {name: 'LandingdestinationsScreen', label: 'Landing destinations', active: false, icon: 'locate', menuVisible: true},
            {name: 'AuthenticationresourcesScreen', label: 'Authentication resources', active: false, icon: 'shield', menuVisible: true},
        ]},


        {name: 'DocumentationScreen', label: 'Documentation', active: false, icon: 'document', menuVisible: false},
        {name: 'DiagramScreen', label: 'Diagrams', active: false, icon: 'diagram-tree', menuVisible: false},
        {name: 'DataScreen', label: 'Data', active: false, icon: 'database', menuVisible: false},

        {name: 'ConfigScreen', label: 'Config', active: false, icon: 'cog', menuVisible: false},
        {name: 'ProfileScreen', label: 'Profile', active: false, icon: 'user', menuVisible: false},
        {name: 'LogoutScreen', label: 'Log-out', active: false, icon: 'log-out', menuVisible: false},

    ];
    @observable active : string = 'LoadingScreen';

    /**
     * 
     */
    public constructor()
    {
        this.setActive(this.active);
    }

    /**
     * Set the active item by its name
     * @param name 
     */
    @action public setActive(name : string ='', thisitems = this.items) : void
    {
        for (let i=0; i < thisitems.length; i++)
        {
            thisitems[i].active = (name === thisitems[i].name);
            if (thisitems[i].active === true) this.active = name;
            //@ts-ignore
            if (thisitems[i].sublevel && thisitems[i].sublevel.length > 0) this.setActive(name, thisitems[i].sublevel);
        }
    }

    /**
     * Get the name of the active item
     */
    public getActive(thisitems = this.items) : MenuItem
    {
        for (let i=0; i < thisitems.length; i++)
        {
            if (thisitems[i].active === true) return thisitems[i];
            //@ts-ignore
            if (thisitems[i].sublevel && thisitems[i].sublevel.length > 0) return this.getActive(thisitems[i].sublevel);
        }
        return thisitems[0];
    }


}

export default new NavStore();
