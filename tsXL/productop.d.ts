declare const enum ENUMOP {
    Pause = 3,
    Cancel = 2,
    Resotre = 0,
}
declare function OP(srcTypeId: number, srcId: number, ToStau: ENUMOP): void;
declare function checkSaleStatus(id: any, status: any, me: any): void;
