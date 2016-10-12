//interface JQueryStatic {

    
//}

interface bootstrapTableColParam {
    radio?: boolean;
    checkbox?: boolean;  //使用复选项?
    sortable?: boolean; //开启排序功能?
    switchable?: boolean;
    field?: string;
    title?: string;  //标题
    titleTooltip?: string;
    class?: string;
    rowspan?: number;
    colspan?: number;
    align?: 'left' | 'right' | 'center';
    halign?: string;  // 标头对齐
    valign?: 'top' | 'middle' | 'bottom';
    width?: number;
    formatter?: (value: any, row: any, index) => {
        disabled?: boolean, checked?: boolean, value?: any
    }  | string ;
}

interface bootstrapTableOption {
    data?: any[];
    columns?: bootstrapTableColParam[];
    url?: string;
    method?: 'get' | 'post';
    cache?: boolean,
    icons?: any;  // 自定义图标 { }
    iconsPrefix?: string;
    classes?: string;  //table table-hover
    sortClass?: string;
    height?: number;
    striped?: boolean;  //隔行变色
    undefinedText?: string; //当数据为undefined时 如何显示.
    sortName?: string | (() => string);
    sortOrder?: 'asc' | 'desc';
    pagination?: boolean;
    paginationLoop?: boolean;
    sidePagination?: 'client' | 'server';
    pageNumber?: number; //首页页码
    pageSize?: number; // 页面数据数.
    pageList?: number[]; //页面数据选择下拉框.
    search?: boolean; //是否启用搜索框.
    searchOnEnterKey?: boolean;
    strictSearch?: boolean;
    searchText?: string; //初始化搜索文本.
    searchTimeOut?: number;
    trimOnSearch?: boolean;
    showHeader?: boolean;
    showFooter?: boolean;
    showColumns?: boolean;  //是否显示哪些列需要显示.
    showRefresh?: boolean;
    showPaginationSwitch?: boolean;  //是否显示数据条数选择框, 在 pageList中设置.
    minimumCountColumns?: number;  //当列数小于此值时，将隐藏内容列下拉框。默认值为1
    idField?: string; //指定主键列.
    uniqueId?: string; // Indicate an unique identifier for each row.
    toolbarAlign?: string;
    buttonsAlign?: string;
    searchAlign?: string;
    paginationVAlign?: 'top' | 'bottom' | 'both';
    paginationHAlign?: string;

    paginationPreText?: string; // '<'
    paginationNextText?: string; // '>'
    clickToSelect?: boolean; // false;   //单击行即可选中.
    singleSelect?: boolean; // 设置为true, 将禁止多选.
    toolbar?: string; // 一个jQuery 选择器，指明自定义的toolbar 例如:  #toolbar, .toolbar.
    checkboxHeader?: boolean; // 设置false 将在列头隐藏check-all checkbox .
    maintainSelected?: boolean; // 设置为 true 在点击分页按钮或搜索按钮时，将记住checkbox的选择项
    sortable?: boolean;  //设置为false 将禁止所有列的排序
    silentSort?: boolean; //设置为 false 将在点击分页按钮时，自动记住排序项。仅在 sidePagination设置为 server时生效
    rowStyle?: ((rowData: any, rowIndex: number) => string); //自定义行样式 参数为: row: 行数据; index: 行下标; 返回值可以为class或者css
    rowAttributes?: ((rowData: any, rowIndex: number) => any);

    detailView?: boolean; 

    onExpandRow?: (index: number, row: any, $detail: JQuery) => void;

    onCheck?: (row: any) => void;
    onUncheck?: (row: any) => void;
    onCheckAll?: (rows: any) => void;
    onUncheckAll?: (rows: any) => void;
    onPageChange?: (number, size) => void;
    onSearch?: (txt: string) => void;
    onClickRow?: (item, $element: JQuery) => void;
    onClickCell?: (field, value, row, $element) => void;
    ajax?: string | ((bootstrapTableAjaxParams) => void);
    onLoadSuccess?: (data?) => void;
   

} 

interface bootstrapTableAjaxParams {
    data: {
        search: string,
        sort: string, 
        asc: string,  //asc desc
        offset: number,  //20
        limit: number
    };
    success(d: {
        total: number,
        rows: any[]
    });

}




interface JQuery {
    bootstrapTable(opt?: bootstrapTableOption): void;
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
    bootstrapTable(cmd: "checkBy", data: IbootstrapTableCheckByData): void;
    bootstrapTable(cmd: "check", index: number): void;
    bootstrapTable(cmd: "uncheck", index: number): void;
    bootstrapTable(cmd: "checkAll"): void;

    

}

interface IbootstrapTableCheckByData {
    field: string;
    values: number[];

}


