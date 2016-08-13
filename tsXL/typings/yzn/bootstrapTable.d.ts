//interface JQueryStatic {

    
//}

interface JQuery {
    bootstrapTable(): void;
    /*
     * uncheckAll
     * resetView
     * getSelections
     */
    bootstrapTable(cmd: string): any;
    bootstrapTable(cmd: "uncheckAll"): void;
    bootstrapTable(cmd: "resetView"): void;
    bootstrapTable(cmd: "getSelections"): any[];
    bootstrapTable(cmd: string, data: any): void;
    bootstrapTable(cmd: "checkBy", data: IbootstrapTableCheckByData):void;

}

interface IbootstrapTableCheckByData {
    field: string;
    values: number[];

}


