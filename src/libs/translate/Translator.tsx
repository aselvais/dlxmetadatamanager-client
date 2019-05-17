import f from './en.json';
import _ from 'lodash';


/**
 * 
 */
class Translator
{

    /**
     * Translates a string according to what we've found in en.json
     * @param key 
     * @param camelize 
     */
    static translate(key : string = '', camelize : boolean = true) : string
    {
        
        if (f[key]) return f[key];
        else return camelize ? _.startCase(_.lowerCase(key)) : key;
    }

    /**
     * 
     * @param key Shortcut to translate() method
     */
    static t(key : string = '') : string
    {
        return Translator.translate(key);
    }

}

export default Translator;
