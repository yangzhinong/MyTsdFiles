
declare module Kalendae {
    function moment(unixTimestamp?: number): moment.Moment;
    function moment(aspnetTime?: string); //moment("/Date(1198908717056-0700)/");
    function moment(m?: moment.Moment);

    function moment(d?: Date): moment.Moment;
    function moment(sDateTime?: string, sFormat?: string, exactly?: boolean): moment.Moment;
}

type KalendateInput= string | Date | moment.Moment | string[] | Date[] | moment.Moment[];


declare class Kalendae {

    constructor(id: string, opt?: KalendateInitOption)
    addSelected: (input: KalendateInput, draw?: any) => void;
    getSelected: (format?: string) => string;
    getSelectedAsDates: () => Date[];
    getSelectedAsText: (format?: string) => string[];
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
}