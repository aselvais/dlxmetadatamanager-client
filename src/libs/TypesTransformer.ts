import moment from 'moment';
import {ConnectionString} from 'connection-string';


class TypesTransformer
{

    /**
     * 
     * @param e 
     * @param key 
     */
    public convert(e : any, type : '' | 'date' | 'connectionstr' = '')
    {
        if (type !== '')
        {
            if (type === 'connectionstr') {
                if (e.match(/:\/\//)) {
                    // classic connection string
                    // jdbc:mariadb://172.17.170.60:3306
                    // jdbc:sqlserver://161.211.226.66:60000;databaseName=SG_Hybris
                    try {
                        let obj = new ConnectionString(e.replace(/\\/g, '/'));
                        let toret = {};
                        if (obj.hosts && obj.hosts.length  === 1)
                        {
                            let p = obj.protocol.split(':');
                            
                            toret['port'] = obj.hosts[0].port;
                            toret['host_type'] = obj.hosts[0].type;
                            toret['host'] = obj.hosts[0].name;
                            toret['protocol'] = p[0];
                            toret['engine'] = p[1] ? p[1] : null;
                        }
                        return JSON.stringify(toret);
                    }
                    catch (eee)
                    {
                        return e;
                    }

                } else {
                    // exotic nonsense I ve never seen before
                    // {DESCRIPTION:{ADDRESS_LIST:{ADDRESS:{PROTOCOL:TCP},{PORT:1521},{HOST:10.108.86.164}}}{CONNECT_DATA:{SID:dlxprd1}}};
                    let l = e.split('@');
                    let p = e.split(':');
                    let aa = {};
                    let aa2 = {
                        protocol : p[0] ? p[0] : null,
                        engine : p[1] ? p[1] : null,
                        clienttype : p[2] ? p[2] : null
                    };
                    eval( 'aa = {' + l[1].match(/\(([A-z0-9.]{1,20})=([A-z0-9.]{1,20})\)/g).map(e => e.replace(/\(|\)/g,'').replace(/=/,':"').replace(/$/,'",') ).join("") + '};' );
                    try { 
                        let toret = {};
                        aa = {...aa2, ...aa};
                        for (let i in aa)
                        {
                            toret[i.toLowerCase()] = aa[i];
                        }
                        return JSON.stringify(toret);
                    } catch(www) {
                        return JSON.stringify(e);
                    }
                }
            }
        } else {
            // format dates
            if (typeof e === 'string' && e.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})\.([0-9]{1,10})Z$/))
            {
                return moment(e).format('LLLL');
            }
        }
        return e;
    }


}

export default new TypesTransformer();;
