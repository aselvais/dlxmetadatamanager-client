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
        {name: 'DocumentationScreen', label: 'Documentation', active: false, icon: 'document', menuVisible: true},
        {name: 'TypesScreen', label: 'Types', active: false, icon: 'tag', menuVisible: true},
        {name: 'DiagramScreen', label: 'Diagrams', active: false, icon: 'diagram-tree', menuVisible: true},
        {name: 'DataScreen', label: 'Data', active: false, icon: 'database', menuVisible: true},

        {name: 'ConfigScreen', label: 'Config', active: false, icon: 'cog', menuVisible: false},
        {name: 'ProfileScreen', label: 'Profile', active: false, icon: 'user', menuVisible: false},

    ];
    @observable active : string = 'SearchScreen'; //'LoadingScreen';

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
    @action public setActive(name : string ='') : void
    {
        for (let i=0; i < this.items.length; i++)
        {
            this.items[i].active = (name === this.items[i].name);
            if (this.items[i].active === true) this.active = name;
        }
    }

    /**
     * Get the name of the active item
     */
    public getActive() : MenuItem
    {
        for (let i=0; i < this.items.length; i++)
        {
            if (this.items[i].active === true) return this.items[i];
        }
        return this.items[0];
    }


}

export default new NavStore();
