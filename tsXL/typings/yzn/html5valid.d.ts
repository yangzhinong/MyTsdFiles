/// add html attr: data-key, data-target, data-min和data-max(文本长度)
////*!jquery - html5Validate.js 基于HTML5表单验证的jQuery插件
////    * 支持type="email", type = "number", type = "tel", type = "url", type = "zipcode", 以及多type, 如type = "email|tel".支持 step, min, max, required, pattern, multiple
////        * 有4个自定义扩展属性 data- key, data - target, data - min, data - max
////            * 文档：http://www.zhangxinxu.com/wordpress/?p=2857
//// * 如果您有任何问题，可以邮件至zhangxinxu@zhangxinxu.com
//// * create by zhangxinxu 2012- 12 - 05
////    * v1.0 beta
////on 2012- 12 - 05 创建
////on 2012- 12 - 06 兼容性调试
////on 2012- 12 - 14 增加对multiple属性支持
////testRemind方法的最大宽度限制
////on 2012- 12 - 17 增加submitEnabled参数
////on 2012- 12 - 19 暴露testRemind方法的CSS参数
////on 2012- 12 - 20 testRemind尖角设置overflow: hidden for IE6
////	v1.0 publish on 2012- 12 - 20
////v1.2 on 2012- 12 - 21 尖角实际高度可能覆盖单复选框的问题，做了高度限制处理
////v1.2.1 on 2013- 03 - 20 增加hidden提示时候的定位，以便在多屏下的时候提示可见
////v1.3 on 2013- 06 - 19 新增validate参数，应对其他一些自定义的验证
interface JQueryStatic {

    html5Validate: IHtml5Vailate;
}

declare var OBJREG: { prompt: {} };  //可动态增加属性 如:OBJREG['RMB'] = "^\\d+.\\d{0,2}$";, OBJREG.prompt.rmb="金额不对"

interface JQuery {
    testRemind(msg: string,
        opt?: {
            size: number,
            align?: 'center' | 'left' | 'right',
            css: {}
        }): void;
    isVisible(): boolean;  //检测元素是否可见.
    hasProp(): boolean;   //Boole型属性检查, 指required, multiple, novalidate等属性.
    html5Validate(success: () => void,
        config: {
            novalidate?: boolean,  //是否取消现代浏览器的内置验证
            submitEnabled?: boolean, //表单中禁用提交按钮
            validate?: () => boolean //包含返回值,额外的验证
        });
    //借一个地方写的其它插件.
    disabled: boolean;
    enabled: boolean;
    render(): string;
    render(data: any): string;
    live(event: string, cb: any);
}

interface IHtml5Vailate {
    isAllpass(obj: JQuery): boolean;  //与表单没有关系.
    
}

