import Config from "./Config";
import { observable } from 'mobx';

/**
 * 
 */
abstract class AbstractModel
{
    protected name : string = '';
    @observable loading : boolean = false;
    @observable entry : any = {};
    @observable collection : Array<any> = [];


    /**
     * 
     * @param id 
     */
    protected getApiUrl(id : string = '')
    {
        return Config.getApiUrl(this.name, id);
    }

    /**
     * 
     * @param id 
     */
    public fetchOne(id : string = '')
    {
        this.loading = true;
        fetch(this.getApiUrl(id))
            .then(response => response.json())
            .then(data => { 
                this.entry = data;
                this.loading = false;
            });
    }

}

export default AbstractModel;
