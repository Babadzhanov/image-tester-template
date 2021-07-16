import * as React from 'react';

export interface InputColorProps {
    className?: string;
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
}

const InputColor: React.FC<InputColorProps> = ({ className, color, setColor }) => {
    const cls = className || '';

    return (
        <div className={'input-color ' + cls}>
            <p className="input-color__label">hex</p>
            <input
                className="input-color__input"
                type="text"
                name="inputColor"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
        </div>
    );
};

export default InputColor;
