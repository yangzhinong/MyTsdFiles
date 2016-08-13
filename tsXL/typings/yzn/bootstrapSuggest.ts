interface JQuery {
    bsSuggest(cmd: string);
    bsSuggest(cmd: 'disable');
    bsSuggest(cmd: 'enable');
    bsSuggest(ops: IBoostrapSuggestOptions);
    serializeAnything();
}

interface IBoostrapSuggestOptions {
    url?: string;  
    data?: {
        value: any[]
    },  
    indexId?: number;//每组数据的第几个数据，作为input输入框的 data-id，设为 -1 且 idField 为空则不设置此值
    indexKey?: number;//每组数据的第几个数据，作为input输入框的内容
    idField?: string; // 每组数据的哪个字段作为 data-id，优先级高于 indexId 设置（推荐）
    keyField?: string;//每组数据的哪个字段作为输入框内容，优先级高于 indexKey 设置（推荐）

     /* 搜索相关 */
    autoSelect?: boolean;
    searchFields?: string[];
    effectiveFields?: string[];
    effectiveFieldsAlias?: any,

    /* UI */
    showHeader?: boolean;
    inputBgColor?: string;
    separator?: string;
    ignorecase?: boolean;
    showBtn?: boolean;
    listAlign?: string;
    listStyle?: any;
    /* methods */

    fnProcessData?: () => void;
   


}