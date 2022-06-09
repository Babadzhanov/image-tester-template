import Template, { DisplayImage } from '../components/ui/Template/Template';
import { Translation } from '../models/models';
import fb from './Firebase';

export class DataService {
    app: any;
    database: any;
    translations: Translation;
    locale: string;
    def: any;

    data: any;
    isDataLoaded: boolean;
    storage: any;

    constructor() {
        let w: any = window;
        this.locale = w.__LOCALE__;

        this.isDataLoaded = false;

        // this.database = fb.database();
        this.storage = fb.storage().ref();
    }

    load() {
        return new Promise((res, rej) => {
            this.database.ref('/').on('value', (e: any) => {
                this.data = e.val() as any;
                this.isDataLoaded = true;
                res(this.data);
            });
        });
    }

    downloadAll = (addImage: (img: DisplayImage) => void) => {
        let listRef = this.storage.child('images/');
        let msg;
        // Find all the prefixes and items.
        listRef
            .listAll()
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    // All the prefixes under listRef.
                    // You may call listAll() recursively on them.
                    console.log(`folderRef`, folderRef);
                });
                res.items.forEach((itemRef) => {
                    // All the items under listRef.
                    // Get meta and download individually
                    itemRef
                        .getMetadata()
                        .then((metadata) => {
                            this.downloadOne(itemRef, metadata, addImage);
                        })
                        .catch((error) => {
                            console.log(`error`, error);
                        });
                });
            })
            .catch((error) => {
                console.log(`error`, error);
                msg = error;
            });
    };

    downloadOne = (imageRef, metadata, addImage) => {
        // Get the download URL
        imageRef
            .getDownloadURL()
            .then((url) => {
                fetch(url)
                    .then((response) => response.blob())
                    .then((res) => {
                        let blob = URL.createObjectURL(res);
                        let newImage = new Image();
                        newImage.src = blob;
                        let file = new File([res], `${metadata.name}`, metadata);
                        newImage.onload = () => {
                            addImage({
                                key: metadata.name,
                                file: file,
                                width: newImage.width,
                                height: newImage.height,
                                isActive: true
                            });
                        };
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((error) => {
                switch (error.code) {
                    case 'storage/object-not-found':
                        console.log(`File doesn't exist`);
                        break;
                    case 'storage/unauthorized':
                        console.log(`User doesn't have permission to access the object`);
                        break;
                    case 'storage/canceled':
                        console.log(`User canceled the upload`);
                        break;
                    case 'storage/unknown':
                        console.log(`Unknown error occurred, inspect the server response`);
                        break;
                }
            });
    };

    upload = (source: DisplayImage): string => {
        let msg;
        // Create a reference to the file to delete
        let upRef = this.storage.child(`images/${source.key}`);
        // Upload the file
        upRef
            .put(source.file)
            .then((snapshot) => {
                msg = `success`;
            })
            .catch((error) => {
                console.log(`error`, error);
                msg = `failure`;
            });
        return msg;
    };

    delete = (id: string): string => {
        let msg;
        // Create a reference to the file to delete
        let delRef = this.storage.child(`images/${id}`);
        // Delete the file
        delRef
            .delete()
            .then(() => {
                msg = `success`;
            })
            .catch((error) => {
                console.log(`error`, error);
                msg = `failure`;
            });
        return msg;
    };

    getByKey = (key: string) => {
        return this.data[key];
    };

    getNavBar = () => {
        return this.data.navBar;
    };

    getLocale = () => {
        return this.data.locale;
    };

    getData() {
        return this.data;
    }
}

const DATA_SERVICE = new DataService();

export default DATA_SERVICE;
