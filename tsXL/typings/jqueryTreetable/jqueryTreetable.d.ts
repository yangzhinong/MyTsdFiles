//http://ludo.cubicphuse.nl/jquery-treetable/
//bower install jquery-treetable

interface JQuery {
    /**
    <table>
      <tr data-tt-id="1">
        <td>Parent</td>
      </tr>
      <tr data-tt-id="2" data-tt-parent-id="1">
        <td>Child</td>
      </tr>
    </table>
    Please note that the plugin expects the rows in the HTML table to be in the same order in
     which they should be displayed in the tree. For example, suppose you have three nodes:
    A, B (child of node A) and C (child of node B). If you create rows for these nodes in
    your HTML table in the following order A - C - B, then the tree will not display correctly.
    You have to make sure that the rows are in the order A - B - C.

    **/
    treetable(opt: TreeTable.ISetting);
    TreeTable(cmd: string);
    TreeTable(cmd: string, id: string | number): any;
    /**
    loadBranch, sortBranch
    **/
    TreeTable(cmd: string, node: TreeTable.INode, row: any); //loadBranch


    treetable(cmd: 'collapseAll' | 'expandAll');
    treetable(cmd: 'collapseNode' | 'expandNode' |'node' | 'removeNode' | 'reveal',
        id: string | number):any;
    treetable(cmd: 'sortBranch' | 'unloadBranch', node: TreeTable.INode);
    treetable(cmd: string, nodeId: string, destId: string)
    treetable(cmd: 'move', nodeId: string, destId: string);
    //treetable(cmd: 'loadBranch', node: TreeTable.INode, row: any);
    //treetable(cmd: 'sortBranch', node: TreeTable.INode, columnOrFunction: number | Function);


}

declare namespace TreeTable {
    interface ISetting {

        /**
        * Optional data attribute that can be used to force
        * the expander icon to be rendered on a node.This allows 
        * us to define a node as a branch node even though it does 
        * not have children yet.This translates to a data-tt-branch 
        * attribute in your HTML.
        default value ttBranch
        **/
        branchAttr?: string;  
        


        /**
        * Set to true to expand branches not only when expander
        * icon is clicked but also when node name is clicked.
        **/
        clickableNodeNames?: boolean;

        /**
        The number of the column in the table that should be
        displayed as a tree.
        default value:0
        **/
        column?: number;

        /**
        The types of cells that should be considered for the tree (td, th or both).
        **/

        columnElType?: string;
        /**
        Should the tree be expandable? An expandable tree contains
        buttons to make each branch with children collapsible/expandable.
        **/
        expandable?: boolean;

        /**
        The HTML fragment used for the expander.
        <a href="#">&nbsp;</a>

        **/
        expanderTemplate?: string;

        /**
        The number of pixels that each branch should be indented with.
        default value:19
        **/
        indent?: number;
        /**
        <span class="indenter"></span>
        **/
        indenterTemplate?: string;
        initialState?: 'collapsed' | 'expanded';

        /**
        Name of the data attribute used to identify node.
        Translates to data-tt-id in your HTML.
        **/
        nodeIdAttr?: string;  //ttId
        /**
        Name of the data attribute used to set parent node.
        Translates to data-tt-parent-id in your HTML.
        **/

        parentIdAttr?: string;  //ttParentId
        stringCollapse?: string;  //For internationalization.
        stringExpand?: string;   //For internationalization.
        /**
        Callback function fired when the tree has been initialized.
        **/
        onInitialized?: () => void;
        onNodeCollapse?: () => void;
        onNodeExpand?: () => void;
        /**
        Callback function fired when a node has been initialized.
        **/
        onNodeInitialized?: () => void;

    }

    class INode {
        /**
         * 
         * @param row   //$row
         * @param tree  //这个对象属性里装的是Node  var node= <TreeTable.INode> tree[node.id]
         * @param setting  
         */
        constructor(row: JQuery, tree:any, setting: ISetting)
        addChild(child: INode);
        ancestors();
        collapse();
        collapsed(): boolean;
        expand();
        expanded(): boolean;
        hide();
        isBranchNode(): boolean;
        updateBranchLeafClass();
        level();
        parentNode(): INode;
        removeChild(child: INode);
        render();
        reveal();
        setParent(node: INode);
        show();
        toggle(); //collapse|expand
        /**
        节点关联的JQuery元素 $tr
        **/
        row: JQuery;
        /**
            这个对象属性里装的是Node
           var node= <TreeTable.INode> tree[node.id]
         **/
        tree: any;
        settings: ISetting;
        id: string;

        children: INode[];
       


    }

    class ITree {
         constructor(table:JQuery, setting: ISetting)
         collapseAll();
         expandAll();
         findLastNode(node: INode): INode;
         loadRows(rows: JQuery)
         move(node: INode, dest: INode);
         removeNode(node: INode);
         render();
         sortBranch(node: INode, sortFund: any);
         unloadBranch(node: INode);
         /**
         树关联的$table
         **/
         table: JQuery;
         settings: ISetting;
         /**
            这个对象属性里装的是Nodes
           var node= <TreeTable.INode> tree[node.id]
         **/
         tree: any;
         nodes: INode[];
         roots: INode[];

         
    }

}