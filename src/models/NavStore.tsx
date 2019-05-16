import {decorate, observable, action} from "mobx";

/**
 * 
 */
class NavStore
{

    /**
     * 
     */
    items = [
        {name: 'MainGrid', label: 'Explore Files', active: false, icon: 'home'},
        {name: 'UploadFile', label: 'Upload File', active: false, icon: 'upload'},
        {name: 'ViewOutput', label: 'Output Files', active: false, icon: 'export'},
        {name: 'ViewTaxreport', label: 'Tax Report', active: false, icon: 'pivot-table'},
        {name: 'ViewDbreport', label: 'Explore DB Data', active: false, icon: 'list-columns'}
    ];
    active = 'ViewTaxreport';

    /**
     * 
     */
    constructor()
    {
        this.setActive(this.active);
    }

    /**
     * 
     * @param {*} name 
     */
    setActive(name='')
    {
        for (let i=0; i < this.items.length; i++)
        {
            this.items[i].active = (name === this.items[i].name);
            if (this.items[i].active === true) this.active = name;
        }
    }

    getActive()
    {
        for (let i=0; i < this.items.length; i++)
        {
            if (this.items[i].active === true) return this.items[i];
        }
        return this.items[0];

    }


}
// configure MobX
decorate(NavStore, {
    items: observable,
    active: observable,
    setActive: action
});

const navStore = new NavStore();
export default navStore;
