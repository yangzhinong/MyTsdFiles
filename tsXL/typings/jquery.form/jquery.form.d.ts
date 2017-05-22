// Type definitions for jQuery.form.js 3.26.0-2013.01.28
// Project: http://malsup.com/jquery/form/
// Definitions by: François Guillot <http://fguillot.developpez.com/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped




interface JQueryFormOptions extends JQueryAjaxSettings {
    //// provide opportunity to alter form data before it is serialized
    // 返回false会中止提交
    beforeSerialize?: ($form: JQuery, options: JQueryFormOptions) => boolean; 

    // give pre-submit callback an opportunity to abort the submit
    //formData.push({name:'hashed-password', value:$.md5($('#password').val())})
    //// form data array is an array of objects with name and value properties
    // [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ] 
    // return false to cancel submit     
    beforeSubmit?: (formData: any[], $form: JQuery, options: JQueryFormOptions) => boolean;

    clearForm?: boolean;  //Boolean flag indicating whether the form should be cleared if the submit is successful
    forceSync?: boolean;   //Only applicable when explicity 
                           //using the iframe option or when uploading files on browses that don't support XHR2. 
                           //Set to true to remove the short delay before posting form when uploading files.
                          //The delay is used to allow the browser to render DOM updates prior to performing 
                            //a native form submit.This improves usability when displaying notifications to the user, 
                            //such as "Please Wait..."
    iframe?: boolean;  //Boolean flag indicating whether the form should always target the server response to an iframe instead of leveraging XHR when possible.
    iframeSrc?: string;  //String value that should be used for the iframe's src attribute when/if an iframe is used.
    iframeTarget?: any; //Identifies the iframe element to be used as the response target for file uploads. By default, the plugin will create a temporary iframe element to capture the response when uploading files. This options allows you to use an existing iframe if you wish. When using this option the plugin will make no attempt at handling the response from the server.
    replaceTarget?: boolean;  //Optionally used along with the the target option. Set to true if the target should be replaced or false if only the target contents should be replaced.
    resetForm?: boolean;
    semantic?: boolean;
    target?: any;
    //An object containing extra data that should be submitted along with the form.
    //data?: any; //data: { key1: 'value1', key2: 'value2' }
    uploadProgress?: (event: ProgressEvent, position: number, total: number, percentComplete: number) => void;
}

interface JQueryForm {
    (callback?: Function): JQuery;
    (options?: JQueryFormOptions): JQuery;
}

interface JQueryFormWithDebug extends JQueryForm {
    debug: boolean;
}

interface JQueryStatic {
    fieldValue(element: Element, successful?: boolean): string;
}

interface JQuery {
    ajaxForm: JQueryForm;
    ajaxSubmit: JQueryFormWithDebug;
 /**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
    formSerialize(): string;

    /**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
    //var queryString = $('#myFormId .specialFields').fieldSerialize();
    fieldSerialize(): string;

    /**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $('input[type=text]').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $('input[type=checkbox]').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $('input[type=radio]').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *    array will be empty, otherwise it will contain one or more values.
 */

    fieldValue(successful?: boolean): string[];
    resetForm(): JQuery;
    clearForm(): JQuery;
    clearFields(includeHidden?:boolean): JQuery;
    ajaxFormUnbind: () => JQuery;


    /**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */

    formToArray: (semantic?: boolean, elements?: Element[]) => any[];
 /**
 * Enables or disables any matching elements.
 */
    enable: (enable?: boolean) => JQuery;

 /**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
    selected: (select?: boolean) => JQuery;
}