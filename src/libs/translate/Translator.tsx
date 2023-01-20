import f from './en.json';
import _ from 'lodash';
// import nlp from 'compromise';


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

    /**
     * Removes the last letter of the entry
     */
    static toSingular(key : string = '') : string
    {
        let str = Translator.translate(key);
        return str.substring(0, str.length-1);;
    }

}

export default Translator;
