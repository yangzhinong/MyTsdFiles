
declare namespace Kalendae {
    function moment(unixTimestamp?: number): moment.Moment;
    function moment(aspnetTime?: string); //moment("/Date(1198908717056-0700)/");
    function moment(m?: moment.Moment);

    function moment(d?: Date): moment.Moment;
    function moment(sDateTime?: string, sFormat?: string, exactly?: boolean): moment.Moment;

    class Input {
        constructor(targetE: HTMLElement, opt?: KalendateInitOption)
    } 

    module util {
        function addEvent(el: string | HTMLElement, eventname: string, cb: (event, target) => void);
        function isIE8(): boolean;
        function $(elem): HTMLDocument;
        function $$(selector): HTMLDocument;
        function make(tagName: string, attributes: Object, attach:HTMLDocument):HTMLDocument;
        function isVisible(elem): boolean;
        function removeEvent(el: string | HTMLElement, event: string, listener);
        function fireEvent(el: string | HTMLElement, event: string);
        function hasClassName(el: string | HTMLElement, className: string): boolean;
        function isFixed(el: HTMLElement): boolean;
        function scrollContainer(el: HTMLDocument);  //查找该元素的第一个可滚动的容器,返回值就是el参数;
        function getPosition(el: HTMLDocument, isInner: boolean): any; //返回{"0":x, "1":y}
        function getHeight(el: HTMLDocument);//返回回可滚动的高度值
        function getWidth(el: HTMLDocument);
        function trimString(s: string): string;
        function isArray(array: any): boolean;


        
    }
}


type KalendateInput= string | Date | moment.Moment | string[] | Date[] | moment.Moment[];


declare class Kalendae {

    constructor(id: string| HTMLElement, opt?: KalendateInitOption)
    addSelected: (input: KalendateInput, draw?: any) => void;
    getSelected: (format?: string) => string;
    getSelectedAsDates: () => Date[];
    getSelectedAsText: (format?: string) => string[];
    blackout: (d?: any) => boolean;   //判断某个日期是不是不能选择的日期,由初始化选项的blackout决定.
    classes: KaledateCassMap;
    calendars: {caption:any,days:any[]}[];
    container: Element;
    defaultView: any;
    defaults: any;
    direction: any;
    directions: any[];
    disableNextMonth: boolean;
    disableNextYear: boolean;
    disablePreviousMonth: boolean;
    disablePreviousYear: boolean;
    draw: () => void; // Forces a redraw of the calendar contents.
    getSelectedRaw: () => any[];
    isSelected: (input: KalendateInput) => boolean;
    setSelected: (input: KalendateInput) => void;
    removeSelected: (input: KalendateInput) => void;

}




interface KaledateCassMap {
    calendar?: string;
    caption?: string;
    daySelected?: string;
    dayOutOfMonth?: string;
    dayInRange?: string;
    dayToday?: string;
    days?: string;
    disableNextMonth?: string;
    disableNextYear?: string;
    disablePreviousMonth?: string;
    disablePreviousYear?: string;
    disableYearNav?: string;
    header?: string;
    monthFirst?: string;
    monthLast?: string;
    monthMiddle?: string;
    monthSeparator?: string;
    nextMonth?: string;
    nextYear?: string;
    previousMonth?: string;
    previousYear?: string;
    title?: string;
    week?: string;
}

interface KalendateInitOption {

    /* object containing events to subscribe to */
    subscribe?: {
        change?: (d: Date) => void;
        'date-clicked'?: () => void;
        'view-changed'?: () => void;
        show?: () => void;  //Kalendae.Input
        hide?: () => void;  //Kalendae.Input
    };
    months?: number; /* total number of months to display side by side */
    direction?: 'past' | 'today-past' | 'any' | 'today-future' | 'future' //string; /* past, today-past, any, today-future, future */
    mode?: 'multiple' | 'range' | 'week' | 'single';
    directionScrolling?: boolean; /* if a direction other than any is defined, prevent scrolling out of range */
    viewStartDate?: any; /* date in the month to display.  When multiple months, this is the left most */
    blackout?: string[] | ( (d: Date | moment.Moment) => boolean); /* array of dates, or function to be passed a date */
    selected?: string | Date | string[]| Date[]| moment.Moment| moment.Moment[]; /* dates already selected.  can be string, date, or array of strings or dates. */

    dayOutOfMonthClickable?: boolean; 
    dayHeaderClickable?: boolean;

    columnHeaderFormat?: string; /*dd number of characters to show in the column headers */
    titleFormat?: string; /*MMMM, YYYY format mask for month titles. See momentjs.com for rules */
    dayNumberFormat?: string;/*D format mask for individual days*/
    dayAttributeFormat?: string; ///'YYYY-MM-DD',    /* format mask for the data-date attribute set on every span */
    parseSplitDelimiter?: string; // /* regex to use for splitting multiple dates from a passed string */

    rangeDelimiter?: string;   //  ' - '    /* string to use between dates when outputting in range mode */
    multipleDelimiter?: string;//  ', '     /* string to use between dates when outputting in multiple mode */
    format?: string;  //'YYYY-MM-DD'
    attachTo?: string|Element;  /* the element to attach the root container to. can be string or DOMElement */
    useYearNav?: boolean;
    dateClassMap?: any | KaledateCassMap;  // dateClassMap:{'2016-09-22':'yzndate'},
    side?: 'bottom' | 'top';
}