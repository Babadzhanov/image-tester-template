import { Translation } from '../models/models';
import fb from './Firebase'

export class DataService {
    app: any;
    database: any;
    translations: Translation;
    locale: string;
    def: any;

    data: any;
    isDataLoaded: boolean;
    constructor() {
        let w: any = window;
        this.locale = w.__LOCALE__;

        this.isDataLoaded = false;

        this.database = fb.database();
    }

    load() {
        return new Promise((res, rej) => {

            this.database.ref("/").on("value",
                (e: any) => {
                    this.data = e.val() as any;


                    this.isDataLoaded = true;
                    res(this.data);
                }
            )
        })
    }

    getByKey = (key: string) => {
        return this.data[key];
    }


    getNavBar = () => {
        return this.data.navBar;
    }

    getLocale = () => {
        return this.data.locale;
    }

    getData() {
        return this.data;
    }

}

const DATA_SERVICE = new DataService();

export default DATA_SERVICE;
