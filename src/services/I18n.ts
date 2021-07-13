import { Dictionary, Translation } from "../models/models";

class I18n {
    locale: any;
    lang: string;

    constructor() {
    }

    setLocale = (locale: Dictionary<Translation>) => {
        this.locale = locale;
    }

    t = (key: string) => {
        // get the text from locale or the [key]
        const loca = this.locale; //store.getState().app.locale;
        if (loca) {
            const v = loca[key];
            return v || '[' + key + ']';
        }

    }

    setLang = (lang: string) => {
        this.lang = lang;
    }

}

export default new I18n();
