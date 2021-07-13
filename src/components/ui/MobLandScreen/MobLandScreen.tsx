import * as React from 'react';

import I18n from '../../../services/I18n';

export interface MobLandScreenProps {
    className?: string;
}

const MobLandScreen: React.SFC<MobLandScreenProps> = (props) => {
    const cls = props.className || '';

    return (
        <div className={'mob-land-screen ' + cls}>
            <h1 className="mob-land-screen__copy">
                {I18n.t('rotationPrompt')}
            </h1>
            {phoneSvg()}
        </div>
    );
};

const phoneSvg = (fillColor = "#000000") => (
    <svg
        id="rotIcon"
        className="mob-land-screen__icon"
        height="78"
        width="102"
        fill="none"
        viewBox="0 0 102 78"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            className="mob-land-screen__icon--arrow"
            d="M81.4 2.175L80 3.575H81.3C86.1 3.575 90 7.475 90 12.275V14.775C90 15.375 89.5 15.975 88.8 15.975C88.1 15.975 87.6 15.475 87.6 14.775V12.275C87.6 10.475 86.9 8.975 85.7 7.775C84.5 6.575 83.1 5.875 81.3 5.875H80L81.4 7.275C81.9 7.775 81.9 8.475 81.4 8.975C80.9 9.475 80.2 9.475 79.7 8.975L76.3 5.575C76.2 5.475 76.1 5.375 76.1 5.175C76 5.075 76 4.875 76 4.675C76 4.475 76 4.375 76.1 4.175C76.2 4.075 76.5 3.675 76.3 3.775L79.7 0.375C80.2 -0.125 80.9 -0.125 81.4 0.375C81.9 0.875 81.8 1.675 81.4 2.175Z"
            fill={fillColor}
        />
        <path
            d="M5 52C5 49.8 6.8 48 9 48C11.2 48 13 49.8 13 52C13 54.2 11.2 56 9 56C6.8 56 5 54.2 5 52ZM9 53.7C9.9 53.7 10.6 53 10.6 52.1C10.6 51.2 9.9 50.5 9 50.5C8.1 50.5 7.4 51.2 7.4 52.1C7.4 52.9 8.1 53.7 9 53.7Z"
            fill={fillColor}
        />
        <path
            d="M17.2112 32H87.7888C88.1192 32 88.4495 32.112 88.6697 32.3361C88.8899 32.5601 89 32.8962 89 33.2322V55.9727V71.7678C89 72.1038 88.8899 72.4399 88.6697 72.6639C88.4495 72.888 88.1192 73 87.7888 73H17.2112C16.8808 73 16.5505 72.888 16.3303 72.6639C16.1101 72.4399 16 72.1038 16 71.7678V52.612V33.3443C16 33.0082 16.1101 32.6721 16.3303 32.4481C16.5505 32.224 16.8808 32 17.2112 32ZM86.5777 34.6885H18.5324V70.6475H86.5777V34.6885Z"
            fill={fillColor}
        />
        <path
            d="M92 48.7C92 47.2 93.2 46 94.7 46C96.2 46 97.4 47.2 97.4 48.7V55C97.4 56.5 96.2 57.7 94.7 57.7C93.2 57.7 92 56.5 92 55V48.7ZM94.8 55.4C95 55.4 95.2 55.2 95.2 55V48.7C95.2 48.5 95 48.3 94.8 48.3C94.6 48.3 94.4 48.5 94.4 48.7V55C94.4 55.2 94.5 55.4 94.8 55.4Z"
            fill={fillColor}
        />
        <rect height="48.6" width="100" rx="6" stroke={fillColor} strokeWidth="2" x="1" y="28" />
    </svg>
);

export default MobLandScreen;
