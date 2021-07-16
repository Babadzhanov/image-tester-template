import * as React from 'react';
import { useState, useEffect } from 'react';
import { Resizable } from 'react-resizable';
import { DisplayImage, AllImages } from '../Template/Template';
import useStateCallback from '../../../utils/useStateCallback';

export interface DisplayImageProps {
    className?: string;
    handleImage: (img: DisplayImage, action: string) => void;
    source: DisplayImage;
}

const INIT_STATE: DisplayImageState = {
    image: null,
    upSize: { width: 200, height: 200 },
    isVis: false,
    isActive: false,
    isDisabled: false,
};

export interface DisplayImageState {
    image: { source: DisplayImage; blob: string } | null;
    upSize: { width: number | ``; height: number | `` };
    isVis: boolean;
    isActive: boolean;
    isDisabled: boolean;
}

const DisplayImage: React.FC<DisplayImageProps> = ({ className, handleImage, source }) => {
    const cls = className || '';
    const [image, setImage] = useState(INIT_STATE[`image`]);
    const [upSize, setSize] = useState(INIT_STATE[`upSize`]);
    const [keepVis, setKeepVis] = useState(INIT_STATE[`isVis`]);
    const [isActive, setIsActive] = useStateCallback(INIT_STATE[`isActive`]);
    const [isDisabled, setIsDisabled] = useState(INIT_STATE[`isDisabled`]);

    useEffect(() => {
        onImageLoad(source);
        return () => {
            console.log(`CLEAN - DisplayImage`);
        };
    }, [source]);

    const onImageLoad = (source: DisplayImage) => {
        if (source !== null) {
            console.log(`source`, source);
            let newImage = new Image();
            const blob = URL.createObjectURL(source.file);
            newImage.src = blob;
            setKeepVis(true);
            setImage({ source, blob });
            if (source.isActive) {
                setIsActive(true);
            }
            newImage.onload = () => {
                setSize({ width: newImage.width, height: newImage.height });
            };
        }
    };

    const onImageSave = () => {
        console.log(`isActive`, isActive);
        setIsDisabled(true);
        setTimeout(() => {
            setIsActive(
                (prevIsActive) => !prevIsActive,
                (newIsActive) => handleImage(image.source, newIsActive ? `save` : `delete`),
            );
            setIsDisabled(false);
        }, 2000);
    };

    const onImageRemove = () => {
        setImage(null);
        handleImage(image.source, `remove`);
    };

    const onDragResize = (event, { element, size, handle }) => {
        setSize({ width: size.width, height: size.height });
    };

    const onInputResize = (e) => {
        if (e.currentTarget.value >= 0 && e.currentTarget.value < 10000) {
            const size = e.currentTarget.value !== `` ? parseInt(e.currentTarget.value) : ``;
            setSize({ ...upSize, [e.currentTarget.id]: size });
        }
    };
    const showEdit = (show: boolean) => {
        setKeepVis(show);
    };

    if (!image) return <div>LOADING</div>;
    return (
        <div className={'image ' + cls}>
            <Resizable
                className="box"
                height={upSize.height !== `` ? upSize.height : 0}
                width={upSize.width !== `` ? upSize.width : 0}
                onResize={onDragResize}
                minConstraints={[100, 100]}
                maxConstraints={[9000, 9000]}
                // resizeHandles={['sw', 'se', 'nw']}
            >
                <div style={{ width: upSize.width + 'px', height: upSize.height + 'px' }}>
                    <span>
                        <div className="image__remove">
                            <img
                                className="image__image"
                                src={image && image.blob}
                                id="image"
                                alt="image-tester-template"
                            />
                            <button className="image__option image__option--close" onClick={onImageRemove}>
                                +
                            </button>
                            <button
                                className={`image__option image__option--save${isActive ? ` active` : ``}${
                                    isDisabled ? ` disabled` : ``
                                }`}
                                onClick={onImageSave}
                                disabled={isDisabled}
                            >
                                S
                            </button>

                            <form
                                className={`image__input-resize${keepVis ? ` image__input-resize--show` : ``}`}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') showEdit(false);
                                }}
                            >
                                <div>
                                    <p className="input-color__label">width</p>
                                    <input
                                        className="image__size image__size--width input-color__input"
                                        type="number"
                                        id="width"
                                        value={upSize.width}
                                        onChange={onInputResize}
                                        onFocus={() => showEdit(true)}
                                        // onBlur={() => showEdit(false)}
                                        // onKeyDown={(e) => {
                                        //     if (e.key === 'Enter') showEdit(false);
                                        // }}
                                    />
                                </div>
                                <div>
                                    <p className="input-color__label">height</p>
                                    <input
                                        className="image__size image__size--height input-color__input"
                                        type="number"
                                        id="height"
                                        value={upSize.height}
                                        onChange={onInputResize}
                                        onFocus={() => showEdit(true)}
                                        // onBlur={() => showEdit(false)}
                                        // onKeyDown={(e) => {
                                        //     if (e.key === 'Enter') showEdit(false);
                                        // }}
                                    />
                                </div>
                            </form>
                        </div>
                    </span>
                </div>
            </Resizable>
        </div>
    );
};

export default DisplayImage;
