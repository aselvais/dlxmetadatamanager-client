
import { observable } from "mobx";
import { IconName } from "@blueprintjs/core";

class StatusBarModel
{

    @observable text : string = '';
    @observable icon : IconName | null = 'info-sign';
    @observable color : string = '#FFFFFF';

}

export default new StatusBarModel();
