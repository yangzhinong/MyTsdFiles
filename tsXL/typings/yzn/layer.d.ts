/*
 * yzn 2016/08/04
 * For layer version 1.8.5
 * http://layer.layui.com/1.8.5/
 */
declare var layer: Ilayer;

declare const enum LayerType {
    MessageBox = 0,
    PageLayer = 1,
    Iframe = 2,
    LoadLayer = 3,
    TipsLayer=4
}
declare const enum LayerIcon {

    Warn = 0,
    CircleOK = 1,
    RulePen = 2,
    Forbid = 3,
    Help = 4,
    NoEntry = 5,
    Good = 6,
    Lock = 7,
    SmillingFace = 9,
    CryingFace = 8,
    OK = 10,
    Clock = 11,
    WeiXin = 12,
    SendMail = 14,
    DownLoad = 15,
    Spin = 16

}


interface Ilayer {
    // icon:9-ok  , 8-error
    alert(msg: string, icon?: number): void;
    alert(msg: string, icon: number, ok: () => void);
    alert(msg: string, icon: number, title: string, ok?: () => void);

    closeAll(): void;
    load(msg: string, waitsecond?: number): number;
    close(n: number): void;
    prompt(ops: ILayerPromptOptions, cb: (val: string) => void): void;
    // msg 没有标题条
    msg(msg: string, icon?: number): void;
    msg(msg: string, waitsecond: number, icon: number): void;
    msg(msg: string, waitsecond: number, end: () => void): void;
    msg(msg: string, waitsecond: number, icon: number, end: () => void): void;
    msg(msg: string, waitsecond: number, ops: {'type': number, shade:[number,string], rate:string }, end: () => void): void;
   


    confirm(msg:string, yes: (b?:any) => void, title: string, no?:()=>void): void;
    confirm(msg: string, yes: (b?:any) => void, no?: () => void): void;
 

    tab(ops: {
        area: string[],
        data: ({
            title: string,
            content:string
        })[]
    }): number;

    full(index: number, options: any): void;
    title(name: string, index: number): void;
    closeLoad(): void;
    closeTips(): void;
    min(index: number, options: any);
    restore(index: number);

    //重置层
    area(index: number, options: any);

    //重置iframe url
    iframeSrc(index: number, url: string);

    //iframe层自适应宽高
    //用于让iframe层自适应。
    //index为层的索引
    iframeAuto(index: number);

    //得到当前iframe层的索引，子iframe时使用
    //获取当前所在iframe层的索引。
    //只允许在iframe页面内部调用。如在内部关闭自身：
    //var index = parent.layer.getFrameIndex(window.name);
    //parent.layer.close(index);

    getFrameIndex(name: string): number;
    setTop(layerNow: number): number;


}

interface ILayerPromptOptions {
    
    title?: string|boolean;
    type?: number;  // LayerType常量
    maxmin?: boolean;
    area?: string[]; //['auto','auto']
    shift?: string;
    page?: ILayerPageOptions | any;  //当type==LayerType.PageLayer 设置此参数
    end?: () => void;  //层被彻底关闭后执行的事件.
    dialog?: {     //当type==LayerType.MessageBox  设置此参数
        msg: string,  //'您是如何看待前端开发？'
        btns: number,  //2
        btn:string[], //按钮标题
        type: number, //4 对话框图标类型 LayerIcon常量
        yes?: (index?:number) => void,  //按钮1的回调
        no?: (index?:number) => void   //按钮2的回调
    };
    border?: [number, number, string] | [number];  // [边框大小, 透明度, 颜色]
    closeBtn?: [number, boolean]; // [关闭按钮的风格（支持0和1）, true]
    time?: number; //0表示不自动关闭，若3秒后自动关闭，time: 3即可
    zIndex?: number;
    iframe?: {
        src: string
    };
    shadeClose?: boolean;
    success: (layero: JQuery) => void;  //层弹出成功后的回调函数. 

}


interface ILayerPageOptions {
    //需要特别注意的是，dom、html、url只需设定其中一个就行，若配置html或url，你必须也配置宽高值。
    html?: string,
    dom?: string,  //'#id'
    url?: string, //ajax请求地址
    ok?: (datas: any) => void  //ajax请求完毕后执行的回调

}

interface JQueryStatic {

    layer(ops:ILayerPromptOptions): any;
}



