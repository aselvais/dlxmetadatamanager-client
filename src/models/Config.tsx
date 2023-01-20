/**
 * 
 */
class Config
{
    /**
     * 
     */
    public static api = {
        protocol: 'http',
        host: 'localhost',
        path: '/api/',
        port: 8089
    };

    /**
     * Returns the full API server URL
     * eg: http://localhost:8089/api/schemadata/5cd9bf7fa7aa340bb626b0e1
     */
    public static getApiUrl(model : string = '', id : string = '') : string
    {
        return ((window.location.port === '3000') ? (this.api.protocol + '://' + this.api.host + (this.api.port ? ':' + this.api.port : '' )) : ('')) +
                this.api.path + 
                ( (model !== '') ? model : '') + 
                ( (id !== '') ? '/' + id : '' );
    }

}

export default Config;
