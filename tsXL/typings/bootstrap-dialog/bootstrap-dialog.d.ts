/// <reference path="../jquery/jquery.d.ts"/>


declare var BootstrapDialog: IBootstrapDialog;
declare module "bootstrap-dialog" {
    export = BootstrapDialog;
}
interface IBootstrapDialog {
    new (options?: IBootstrapDialogOptions): IBootstrapDialogInstance;
      /** For text localization. */
   DEFAULT_TEXTS: string[];
    BUTTON_SIZES: string[];
    METHODS_TO_OVERRIDE: string[];

    TYPE_DEFAULT: string;
    TYPE_INFO: string;
    TYPE_PRIMARY: string;
    TYPE_SUCCESS: string;
    TYPE_WARNING: string;
    TYPE_DANGER: string;

    //(options: IBootstrapDialogOptions): IBootstrapDialogContext;
    alert(message: string, closeCallback?: () => void): IBootstrapDialogInstance;
    alert(options: IBootstrapDialogOptions):IBootstrapDialogInstance
    confirm(message: string, closeCallback?: (result: boolean) => void): IBootstrapDialogInstance;
    confirm(options: IBootstrapDialogOptions): IBootstrapDialogInstance;
    show(options: IBootstrapDialogOptions): IBootstrapDialogInstance;
    warning(message: string): IBootstrapDialogInstance;
    danger(message: string): IBootstrapDialogInstance;
    success(message: string): IBootstrapDialogInstance;
    newGuid(): string;
}







interface IBootstrapDialogOptions {
    /** Dialog header type. See BootstrapDialog.TYPE_xxx constants. */
    type?: string;
    /** Text size. See BootstrapDialog.SIZE_xxx constants. By default - SIZE_NORMAL */
    size?: string;
    /** Dialog title. Either string or JQuery element. */
    title?: string|JQuery;
    /** Dialog message. Either string or JQuery element. */
    message?: string|JQuery| ((dlg?:IBootstrapDialogInstance)=>JQuery);
    /** FALSE by default. */
    closable?: boolean;
    /** Whether dialog will close by clicking outside of it. */
    closeByBackdrop?: boolean;
    /** Whether dialog will close by ESC. */
    closeByKeyboard?: boolean;
    /** Whether fade-out background while showing the dialog. TRUE by default. */
    animate?: boolean;
    /** Whether dialog could be dragged by its header. Cursor could be changed (see doc)! FALSE by default. */
    draggable?: boolean;
    description?: string;
    /** Default button title. OK by default. */
    buttonLabel?: string;
    buttons?: IBootstrapDialogButtonSetting[];
    /** Result will be true if button was click, while it will be false if users close the dialog directly. */
    callback?: (result: boolean) => void;   //  var $btn = <IBootstrapDialogButtonEx>this;
    onshow?:(dialog?: IBootstrapDialogInstance)=> void;
    onshown?:(dialog?: IBootstrapDialogInstance)=> void;
    /** Return FALSE to don`t close the dialog. Don`t return anything by default. */
    onhide?:(dialog?: IBootstrapDialogInstance)=> any;
    onhidden?:(dialog?: IBootstrapDialogInstance)=> void;
    autodestroy?: boolean; //true;
    nl2br?: boolean; //true;
    /** 'Cancel' by default. */
    btnCancelLabel?: string;
    /** 'OK' by default. */
    btnOKLabel?: string;
    /** If you didn't specify it, dialog type will be used. */
    btnOKClass?: string;
    cssClass?: string;
} 



interface IBootstrapDialogButtonSetting {
    id?: string;
    label: string;
    /** Hotkey char code */
    hotkey?: number;
    icon?: string;
    cssClass?: string;
    autospin?: boolean;
    action?: (dialog?: IBootstrapDialogInstance,event?:JQueryEventObject) => void;
}

interface IBootstrapDialogInstance {
    open(): void;
    close(): void;
    realize(): void;
    setTitle(title: string): IBootstrapDialogInstance;
    setMessage(message: string): void;
    setData(dataName: string, value: any): void;
    getData(dataName: string): any;
    getButton(buttonId: string): JQuery;
    setClosable(closable: boolean): void;
    /** See BootstrapDialog.TYPE_xxx constants. */
    setType(dialogType: string): void;
    /** Enable or disable all dialog`s buttons at once. */
    enableButtons(enable?: boolean): void;
    getId(): any;
    getType(): any;
    getSize(): any;
    setSize(): any;
    updateSize(): IBootstrapDialogInstance;
    updateType(): IBootstrapDialogInstance;
    getCssClass(): string;
    setCssClass(cssClass: string): void;
    getTitle(): string;
    setTitle(title: string): IBootstrapDialogInstance;
    updateTitle(): IBootstrapDialogInstance;
    isClosable(): boolean;
    setClosable(closeable: boolean): IBootstrapDialogInstance;
    setCloseByBackdrop(closeByBackdrop: boolean): IBootstrapDialogInstance;
    canCloseByBackdrop(): boolean;
    setCloseByKeyboard(closeByKeyboard: boolean): IBootstrapDialogInstance;
    canCloseByKeyboard(): boolean;
    addButton(button: IBootstrapDialogButtonSetting): IBootstrapDialogInstance;
    addButtons(buttons: IBootstrapDialogButtonSetting[]): IBootstrapDialogInstance;
    getButtons(): IBootstrapDialogButtonSetting[];
    setButtons(button: IBootstrapDialogButtonSetting[]): IBootstrapDialogInstance;
    updateButtons();
    getButton(id: string): IBootstrapDialogButtonEx;
    getButtonSize(): string;
    isAutodestroy(): boolean;
    setAutodestroy(autodestroy: boolean): void;
    setTabindex(tabindex: number): IBootstrapDialogInstance;
    getTabindex(): number;
    updateTabindex(): IBootstrapDialogInstance;
    createButton(button: IBootstrapDialogButtonSetting): JQuery;
    enhanceButton($button: JQuery): IBootstrapDialogInstance;
    indexedButtons: any; //indexedButtons[button.id] = $button; so getButton('btn-my')=IBootstrapDialogButtonEx

    getModal(): JQuery;
    getModalDialog(): JQuery;
    getModalHeader(): JQuery;
    getModalFooter(): JQuery;
    getModalBody(): JQuery;
    $modal: JQuery;
    $modalDialog: JQuery;
    $modalContent: JQuery;
    $modalBody: JQuery;
    $modalHeader: JQuery;
    $modalFooter: JQuery;
    
    isOpened(): boolean;
    

    onShow(onshowFn: (dlg: IBootstrapDialogInstance) => void): IBootstrapDialogInstance;
    onShown(onshownFn: (dlg: IBootstrapDialogInstance) => void): IBootstrapDialogInstance;
    onHide(onHideFn: (dlg: IBootstrapDialogInstance) => void): IBootstrapDialogInstance;
    onHidden(onHiddenFn: (dlg: IBootstrapDialogInstance) => void): IBootstrapDialogInstance;

}
//扩展按钮事件处理的按钮对象 
//使用方式 action: function(){ var btn=<IBootstrapDialogButtonEx>this;}
interface IBootstrapDialogButtonEx extends JQuery {
    //enable(): void;
    disable(): void;
    toggleEnable(enable?: boolean): IBootstrapDialogButtonEx;
    dialog: IBootstrapDialogInstance;
    spin(): void;
    stopSpin(): void;
    toggleSpin(spin?:boolean): IBootstrapDialogButtonEx;

}

