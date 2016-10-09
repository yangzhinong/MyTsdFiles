interface JQueryStatic {
    

  
}

interface JQueryFn {
    zTree: zTreeFnStatic;
}

interface zTreeFnStatic {
    init($obj: JQuery, setting: zTreeSetting, zNodes: zTreeNode[]);
    getZTreeObj(id: string): zTreeStatic;
    destroy(id: string);
   

}

interface zTreeStatic {
    setting: zTreeSetting;
    checkNode(node:zTreeNode, checked:boolean, checkTypeFlag:boolean, callbackFlag:any);
    getCheckedNodes(): zTreeNode[];
    getNodeByTId(tId: string): zTreeNode;
    expandAll(expandFlag: boolean);
    checkAllNodes(checked: boolean);
    getCheckedNodes(checked: boolean): zTreeNode[];
    expandNode(treeNode, expandFlag, sonSign, focus, callbackFlag);
    getNodeIndex(node: zTreeNode): number; //获取某节点在同级节点中的序号（从0开始
    getSelectedNodes(): zTreeNode[];
    hideNode(node: zTreeNode);
    hideNodes(nodes: zTreeNode[]);
    setChkDisabled(node: zTreeNode, disabled: boolean,
        inheritParent: boolean,  //inheritParent = true 表示全部父节点进行同样的操作
        inheritChildren: boolean  //inheritChildren = true 表示全部子节点进行同样的操作
    );
    showNode(node: zTreeNode);
    updateNode(node: zTreeNode,
        checkTypeFlag: boolean //checkTypeFlag = true 表示按照 setting.check.chkboxType 属性进行父子节点的勾选联动操作
    );
}


interface zTreeNode {
    id: number;
    pId: number;
    name: string;
    open?: boolean;
    nocheck?: boolean;
    children?: zTreeNode[];
}

interface zTreeSetting {
    check: {
        enable?: boolean;
        chkStyle?: string;  //radio
        radioType?: string;  //all
    },
    view: {
        dblClickExpand?: boolean;
        selectedMulti?: boolean;
        showIcon?: boolean;
        showLine?: boolean;
        showTitle?: boolean;
        txtSelectedEnable?: boolean;//false 是否允许可以选择 zTree DOM 内的文本。
    },
    data?: {
        simpleData?: {
            enable?: boolean;
            idKey?: string;//id
            pIdKey?: string; //pId
            rootPId?:any; //null
        },
        keep?: {
            leaf: boolean;
            parent: boolean;
        },
        key?: {
            checked?: string; ///'checked
            children?: string; // children
            name?: string; //name
            title?: string; //''
            url?: string;
        }
    },
    callback: {
        onClick?: (e?: Event, treeId?: string, treeNode?: zTreeNode, clickFlag?:number) => void;
        onCheck?: (e?:Event,treeId?:string,node?:zTreeNode) => void;
        onExpand?: (e?: Event, treeId?: string, node?: zTreeNode)=>void;
        onCollapse?: (e?: Event, treeId?: string, node?: zTreeNode) => void;
        onRightClick?: (e?: Event, treeId?: string, node?: zTreeNode) => void;
        beforeClick?: (treeId?: string, node?: zTreeNode, clickFlag?: boolean) => boolean;
        beforeCheck?: (treeId?: string, node?: zTreeNode) => boolean;
        beforeExpand?: (treeId?: string, node?: zTreeNode) => boolean;
        beforeCollapse?: (treeId?: string, node?: zTreeNode) => boolean;

    }
}
