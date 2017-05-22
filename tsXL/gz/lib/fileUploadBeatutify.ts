

//使用部件,记到要引用css文件.
import * as cssTool from 'lib/loadcss';
cssTool.loadCss('lib/css/fileUploadBeatutify.css');
export function initFileBtn($inputs: JQuery, uploadBtnText: string) {
    
   
    //<input type="file" name="file6" id="file6"  data-multiple-caption="{count} files selected" multiple />
    var htmlLable = '<label for="file"><span></span><strong><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg> ' +
        uploadBtnText + '&hellip;</strong></label> "';

    $inputs.each(function (i, input) {
        var $input = $(input),
            $label = $(htmlLable),
            labelVal = $label.html();
        $label.attr("for", $input.attr("name"));
        $input.after($label);
        $input.parent().addClass("js");
        $input.addClass("inputfile").addClass("inputfile-6");
        $input.on('change', function (e: any) {
            var fileName = '';

            if (this.files && this.files.length > 1)
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
            else if (e.target.value)
                fileName = e.target.value.split('\\').pop();

            if (fileName)
                $label.find('span').html(fileName);
            else
                $label.html(labelVal);
        });

        // Firefox bug fix
        $input
            .on('focus', function () { $input.addClass('has-focus'); })
            .on('blur', function () { $input.removeClass('has-focus'); });
    });
}