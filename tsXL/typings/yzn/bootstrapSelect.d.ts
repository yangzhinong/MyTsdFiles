interface JQuery {

    // data-属性 参见 : https://silviomoreto.github.io/bootstrap-select/options/
    //selectpicker(cmd: string);
    selectpicker(val: string, newValue:any);
    selectpicker(cmd: string, sNewStype: string, opt:string);
    selectpicker(cmd: 'val');  //get value
    selectpicker(cmd: 'val', newValue: string | string[]); //set value

    selectpicker(cmd: 'selectAll' | 'deselectAll');
   

    //selectpicker(cmd: 'render'); //强制重绘UI  This is useful if you programatically change any underlying values that affect the layout of the element.
    //selectpicker(cmd: 'mobile')
    selectpicker(cmd: 'setStyle',sNewStype:string) //修改样式后调用.
    selectpicker(cmd: 'setStyle', sNewStype: string, opt: 'add' | 'remove'); //修改样式后调用.
    //selectpicker(cmd: 'refresh');
   

    //selectpicker(cmd: 'toggle'); //menu open/closed
    //selectpicker(cmd: 'hide');
    selectpicker(cmd: 'show' | 'hide' | 'toggle' | 'destroy' | 'refresh' | 'render' |'mobile');
    //selectpicker(cmd: 'destroy');
    selectpicker(opt:IBootStrapSelectPickerOption);
    
    
}

interface IBootStrapSelectPickerOption {
    actionsBox?: boolean;   //When set to true, adds two buttons to the top of the dropdown menu (Select All & Deselect All).
    selectAllText?: string; //The text on the button that selects all options when actionsBox is enabled.
    deselectAllText?: string; //The text on the button that deselects all options when actionsBox is enabled.
    container?: string | boolean;  //When set to a string, appends the select to a specific element or selector, e.g., container: 'body' | '.main-body'


    countSelectedText?: string | ((selectedCount: number, totalCount: number) => string);
    dropupAuto?: boolean;  //checks to see which has more room, above or below. 
    // If the dropup has enough room to fully open normally, 
    // but there is more room above, the dropup still opens normally.
    // Otherwise, it becomes a dropup.If dropupAuto is set to false, 
    // dropups must be called manually.

    header?: boolean;  //adds a header to the top of the menu; includes a close button by default
    iconBase?: string; //Set the base to use a different icon font instead of Glyphicons.
    // If changing iconBase, you might also want to change tickIcon, 
    // in case the new icon font uses a different naming scheme.

    liveSearch?: boolean; // When set to true, adds a search box to the top of the selectpicker dropdown.
    liveSearchNormalize?: boolean; //大小写敏感
    liveSearchPlaceholder?: string;
    liveSearchStyle?: 'contains' | 'startsWith';
    maxOptions?: number | boolean;
    maxOptionsText?: string | string[] | (() => string[]);
    mobile?: boolean; //When set to true, enables the device's native menu for select menus.


    multipleSeparator?: string;  
    noneSelectedText?: string; //The text that is displayed when a multiple select has no selected options.
    selectedTextFormat?: 'values' | 'static' | 'count' | 'count > x' | string;  //Specifies how the selection is displayed with a multiple select.
    selectOnTab?: boolean; //When set to true, treats the tab character like the enter or space characters within the selectpicker dropdown.
    showIcon?: boolean; //When set to true, display icon(s) associated with selected option(s) in the button
    showSubtext?: boolean; //When set to true, display subtext associated with a selected option in the button.
    tickIcon?: string; //Set which icon to use to display as the "tick" next to selected options.


    /*
       When set to 'auto', the menu always opens up to show as many items as the window will allow without being cut off.
       When set to an integer, the menu will show the given number of items, even if the dropdown is cut off.
       When set to false, the menu will always show all items.
     */
    size?: 'auto' | number | boolean;
    style?: string; //When set to a string, add the value to the button's style.//btn-primary
    title?: string; //The default title for the selectpicker. 相当于Placeholder

    /*
    When set to auto, the width of the selectpicker is automatically adjusted to accommodate the widest option.
    When set to a css-width, the width of the selectpicker is forced inline to the given value.
    When set to false, all width information is removed.
     */
    width?: 'auto' | 'fit' | string|boolean;

}