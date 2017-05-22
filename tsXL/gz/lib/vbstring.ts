export function right(s: string, len: number) {
    if (len <= 0) return '';
    return s.substr(-len);
}
export function left(s: string, len: number) {
    if (len <= 0) return '';
    return s.substr(0, len);
}
export function mid(s: string, iPosStart: number, len?: number) {
    if (iPosStart < 1) throw 'VB Mid iPosStart Must >0';
    if (len == undefined) return s.substring(iPosStart - 1);
    return s.substr(iPosStart - 1, len);
}

export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
