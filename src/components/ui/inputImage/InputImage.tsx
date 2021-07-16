import * as React from 'react';
import { DisplayImage } from '../Template/Template';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

export interface InputImageProps {
    className?: string;
    handleImage: (img: DisplayImage, action: string) => void;
}

const InputImage: React.FC<InputImageProps> = ({ className, handleImage }) => {
    const cls = className || '';
    let inputEl = React.useRef(null);

    const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        if (file) {
            const newImage = new Image();
            const blob = URL.createObjectURL(file);
            newImage.src = blob;
            newImage.onload = () => {
                handleImage({ key: uuidv4(), file: file, width: newImage.width, height: newImage.height }, `add`);
                e.target.value = null;
            };
        }
    };

    return (
        <div className={'input-image ' + cls}>
            <input
                ref={inputEl}
                className="input-image__input"
                type="file"
                name="inputImage"
                onChange={(e) => onImageUpload(e)}
            />
            <div className="input-image__add">
                <button className="input-image__button" onClick={() => inputEl.current.click()}>
                    +
                </button>
            </div>
        </div>
    );
};

export default InputImage;
