interface JQuery {
    bsSuggest(cmd: string): any;
    bsSuggest(cmd: 'disable'): any;
    bsSuggest(cmd: 'enable'): any;
    bsSuggest(ops: IBoostrapSuggestOptions): any;
    serializeAnything(): any;
}
interface IBoostrapSuggestOptions {
    url?: string;
    data?: {
        value: any[];
    };
    indexId?: number;
    indexKey?: number;
    idField?: string;
    keyField?: string;
    autoSelect?: boolean;
    searchFields?: string[];
    effectiveFields?: string[];
    effectiveFieldsAlias?: any;
    showHeader?: boolean;
    inputBgColor?: string;
    separator?: string;
    ignorecase?: boolean;
    showBtn?: boolean;
    listAlign?: string;
    listStyle?: any;
    fnProcessData?: () => void;
}
