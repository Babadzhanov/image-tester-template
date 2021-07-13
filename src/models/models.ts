export interface iActionType {
    type: number,
    data: any | any[],
}

export interface Dictionary<T> {
    [idx: string]: T;
}

export interface iValue {
    key: string | number;
    value: React.ReactNode;
}

export interface Translation {
    campaignName: string;
    campaignTitle: string;
    clientTitle: string;
    campaignLabel: string;
    splashIntro: string[];
    sharebutton: string;
    embedbutton: string;
    emdedCopyTitle: string;
    embedCopy: string;
    copyToClipboard: string;
    scrollDown: string;
    clientUrl: string;
    campaignUrl: string;
    begin: string;
    informationCopy: string;
    exploreButton: string;
    embedCopyTitle: string;
    infoTitle: string;
    altText: string;
    valueMapDesc: string[];
}

export const INIT_TRANSLATIONS: Translation = {
    campaignName: "",
    campaignTitle: "",
    clientTitle: "",
    campaignLabel: "",
    splashIntro: [],
    sharebutton: "",
    embedbutton: "",
    emdedCopyTitle: "",
    embedCopy: "",
    copyToClipboard: "",
    scrollDown: "",
    clientUrl: "",
    campaignUrl: "",
    begin: "",
    informationCopy: "",
    exploreButton: "",
    embedCopyTitle: "",
    infoTitle: "",
    altText: "",
    valueMapDesc: []
}

export interface iNavData {
    key: string;
    title: string;
    parent: string;
    url: string;
    copy: string[];
    children: iNavData[];
    order?: number;
}

export interface iData {
    key: string;
    title: string;
    graphType: string;
    copy: string[];
    data: any[] | any;
}
