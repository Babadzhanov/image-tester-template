import * as React from 'react';
import { useEffect, useState } from 'react';
import InputColor from '../inputColor/InputColor';
import InputImage from '../inputImage/InputImage';
import DisplayImage from '../DisplayImage/DisplayImage';
import DATA_SERVICE from '../../../services/DataService';
import Firebase from '../../../services/Firebase';
import useStateCallback from '../../../utils/useStateCallback';

export interface TemplateProps {
    className?: string;
}

const INIT_STATE: SinglePageState = {
    color: `fff`,
    allImages: {},
};

export interface SinglePageState {
    color: string;
    allImages: AllImages;
}

export type AllImages = { [key: string]: DisplayImage };
export type DisplayImage = { key: string; file: File; width: number | ''; height: number | ''; isActive: boolean };

const Template: React.FC<TemplateProps> = ({ className }) => {
    const cls = className || '';
    const [color, setColor] = useState(INIT_STATE[`color`]);
    const [allImages, setAllImages] = useStateCallback(INIT_STATE[`allImages`]);

    useEffect(() => {
        DATA_SERVICE.downloadAll(addImage);
        return () => {
            console.log(`CLEAN - Template`);
        };
    }, []);

    const handleImage = (img: DisplayImage, action: string) => {
        switch (action) {
            case `add`:
                addImage(img);
                break;
            case `remove`:
                removeImage(img);
                break;
            case `save`:
                saveImage(img);
                break;
            case `delete`:
                deleteImage(img);
                break;
            default:
                break;
        }
    };

    const addImage = (img: DisplayImage) => {
        console.log(`ADD-IMAGE`);
        setAllImages((prevAllImages) => {
            return { ...prevAllImages, ...{ [img.key]: img } };
        });
    };

    // TODO: delete from DB
    const removeImage = (img: DisplayImage) => {
        delete allImages[img.key];
        setAllImages({ ...allImages });
        DATA_SERVICE.delete(img.key);
    };

    const saveImage = (img: DisplayImage) => {
        console.log(`SAVE-IMAGE`);
        DATA_SERVICE.upload(img);
    };

    // TODO: delete from DB
    const deleteImage = (img: DisplayImage) => {
        console.log(`DELETE-IMAGE`);
        console.log(`img`, img);
        DATA_SERVICE.delete(img.key);
    };

    return (
        <div className={'template ' + cls} style={{ backgroundColor: `#${color}` }}>
            {Object.keys(allImages).map((imageKey, i) => {
                const singleImage: DisplayImage = allImages[imageKey];
                return <DisplayImage key={singleImage.key} handleImage={handleImage} source={singleImage} />;
            })}
            <InputImage handleImage={handleImage} />
            <InputColor color={color} setColor={setColor} />
        </div>
    );
};

export default Template;
