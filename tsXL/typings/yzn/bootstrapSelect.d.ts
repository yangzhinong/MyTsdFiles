interface JQuery {

    // data-属性 参见 : https://silviomoreto.github.io/bootstrap-select/options/
    selectpicker(cmd: string);
    selectpicker(val: string, newValue:any);

    selectpicker(cmd: 'val');  //get value
    selectpicker(cmd: 'val', newValue: string | string[]); //set value

    selectpicker(cmd: 'selectAll');
    selectpicker(cmd: 'deselectAll');

    selectpicker(cmd: 'render'); //强制重绘UI  This is useful if you programatically change any underlying values that affect the layout of the element.
    selectpicker(cmd: 'mobile')
    selectpicker(cmd: 'setStyle') //修改样式后调用.

    selectpicker(cmd: 'refresh');

    selectpicker(cmd: 'toggle'); //menu open/closed
    selectpicker(cmd: 'hide');
    selectpicker(cmd: 'show');
    selectpicker(cmd: 'destroy');
    selectpicker(opt:IBootStrapSelectPickerOption);
    
    
}

interface IBootStrapSelectPickerOption {
    actionsBox?: boolean;
    selectAllText?: string;
    container?: string | boolean;
    multipleSeparator?: string; 
    noneSelectedText?: string;
    selectedTextFormat?: 'values' | 'static' | 'count' | 'count > x';
    size?: 'auto' | number | boolean;
    style?: string ;
    title?: string;
    width?: 'auto' | 'fit' | string;

}