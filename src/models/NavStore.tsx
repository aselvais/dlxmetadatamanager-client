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
        {name: 'LoadingScreen', label: 'Loading', active: false, icon: 'home', menuVisible: false, role: 'admin'},
        
        {name: 'HomeScreen', label: 'Home', active: false, icon: 'home', menuVisible: true, role: 'god'},
        {name: 'SearchScreen', label: 'Explore', active: false, icon: 'search', menuVisible: true, role: 'admin'},
        {name: 'UsersmanagementScreen', label: 'Users', active: false, icon: 'key', menuVisible: true, role: 'god'},

        {name: 'AggregationsScreen', label: 'Aggregations', active: false, icon: 'horizontal-bar-chart', menuVisible: true, role: 'admin'},
        {name: 'DatadictionariesScreen', label: 'Data dictionaries', active: false, icon: 'th-list', menuVisible: true, role: 'superadmin', sublevel: [
            {name: 'ApplicationcodesScreen', label: 'Application codes', active: false, icon: 'code', menuVisible: true, role: 'superadmin'},
            {name: 'TagsScreen', label: 'Tags', active: false, icon: 'tag', menuVisible: true, role: 'superadmin'},
            {name: 'SemantictypesScreen', label: 'Semantic types', active: false, icon: 'comment', menuVisible: true, role: 'superadmin'},
            {name: 'LandingdestinationsScreen', label: 'Landing destinations', active: false, icon: 'locate', menuVisible: true, role: 'superadmin'},
            {name: 'AuthenticationresourcesScreen', label: 'Authentication resources', active: false, icon: 'shield', menuVisible: true, role: 'superadmin'},
        ]},

        {name: 'DocumentationScreen', label: 'Documentation', active: false, icon: 'document', menuVisible: true, role: 'god'},
        {name: 'DiagramScreen', label: 'Diagrams', active: false, icon: 'diagram-tree', menuVisible: true, role: 'god'},
        {name: 'DataScreen', label: 'Data', active: false, icon: 'database', menuVisible: true, role: 'god'},

        {name: 'ConfigScreen', label: 'Config', active: false, icon: 'cog', menuVisible: false, role: 'admin'},
        {name: 'ProfileScreen', label: 'Profile', active: false, icon: 'user', menuVisible: false, role: 'admin'},
        {name: 'LogoutScreen', label: 'Log-out', active: false, icon: 'log-out', menuVisible: false, role: 'admin'},
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
     * 
     * @param name 
     * @param thisitems 
     */
    @action public setActive(name : string ='', thisitems = this.items) : void
    {
        for (let i=0; i < thisitems.length; i++)
        {
            if (thisitems[i].sublevel && thisitems[i].sublevel.length > 0) 
            {
                this.setActive(name, thisitems[i].sublevel);
            }
            thisitems[i].active = (name === thisitems[i].name);
            if ((name === thisitems[i].name) === true) 
            {
                this.active = name;
            }
        }
    }

    /**
     * Get the name of the active item
     */
    public getActive(thisitems = this.items) : MenuItem
    {
        for (let i=0; i < thisitems.length; i++)
        {
            // if (thisitems[i].sublevel && thisitems[i].sublevel.length > 0) return this.getActive(thisitems[i].sublevel);
            // @todo change this into something with recursion
            if (thisitems[i].sublevel && thisitems[i].sublevel.length > 0) 
            {
                for (let u=0; u < thisitems[i].sublevel.length; u++)
                {
                    if (thisitems[i].sublevel[u].active === true) return thisitems[i].sublevel[u];
                }
            }
            if (thisitems[i].active === true) return thisitems[i];

        }
        return thisitems[0];
    }


}

export default new NavStore();
