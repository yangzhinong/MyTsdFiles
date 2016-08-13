interface JQueryStatic {

    html5Validate: IHtml5Vailate;
}

interface JQuery {
    testRemind(msg: string): void;

    //借一个地方写的其它插件.
    disabled: boolean;
    enabled: boolean;
    render(): string;
    live(event: string, cb: any);
}

interface IHtml5Vailate {
    isAllpass(obj: JQuery): boolean;
}

