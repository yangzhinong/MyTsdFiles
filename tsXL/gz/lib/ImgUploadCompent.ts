/*
 * <script src="~/js/gz/lib/ImgUploadCompent.js"></script>  //已加入到_Layout视图了,此句可以不要.
 *
 * $(document).ready(function () {  //一定要包装在document.read里,才正确!!!
 *
        1. GZIMG.ImgUploadCompent($('#Logo'), 'public/line');
        
        2. GZIMG.ImgUploadCompent($('#Logo, #Logo1'), 'public/line');

        3. GZIMG.ImgUploadCompent($('.Logo'), 'public/line');


    });

二, 初始化上传多图按钮.
    (function(){
        var $btn=$(".class-hotel-image");
        var typeId=69;
        GZIMG.InitMutiImgUpLoadButton($btn,typeId);
        //InitMutiImgUpLoadButton($btn,69,{id:127, paths:'public/line'}); //不指定Id就是取该按钮的value属性值
        //InitMutiImgUpLoadButton($btn,69,{paths:'public/line/more'});  //不指定paths就是默认值上传路径: public/product
     }());
 */

namespace GZIMG {
   export  function ImgUploadCompent($txts: JQuery, paths: string, fcbReponse?: () => void) {
        var applicationPath = window.applicationPath === "" ? "" : window.applicationPath || "../../";
        var imgserver = 'http://img.gzgjly.com';
        var imgservice = 'http://img.gzgjly.com/UploadFiles.ashx';

        //var imgserver = 'http://localhost:17814';
        //var imgservice = 'http://localhost:17814/UploadFiles.ashx';

        $(function () {
            for (var i = 0; i < $txts.length; i++) {
                var $txt = $txts.eq(i);
                if ($txt.val() != '') {
                    $txt.attr("data-content", "<img style='max-width:800px;max-height:800px;' src='" + imgserver + $txt.val() + "' />");
                }
                if (!$txt.data('img-pick-inited')) {
                    //如果没有初始化
                    initWebuploader($txt);
                }
            }
        });

        function getPickerByTxt($txt: JQuery) {
            /// <summary>
            /// 通过文本框获取Pick按钮
            /// </summary>
            /// <param name="$txt" type="JQuery"></param>
            /// <returns type=""></returns>
            var fp: string | JQuery;
            if ($txt.parent().hasClass("input-group")) {
                fp = $txt.parent().find("span.input-group-addon a");
            } else {
                if ($txt.attr('id')) {
                    fp = '#filePicker' + $txt.attr('id');
                }
                else {
                    console.log("ERR:图像加载必须关联一个有id属性的控件!");
                    //fp = $txt.parent().find("a.filePicker").attr("id");
                    // fp = '.filePicker' + 
                }
            }
            return fp
        }


        //#region 上传图片
        function initWebuploader($txt: JQuery) {
            var fcbReponse:any = fcbReponse ||
                (function (file:any, response: GZ.ImgUploadResponse) {
                    var fileUrl = imgserver + response.files[0].filePath;
                    $('#' + file.id).addClass('upload-state-done');
                    $txt.attr("value", response.files[0].filePath);
                    $txt.attr("data-content", "<img style='max-width:800px;max-height:800px;' src='" + fileUrl + "' />");
                });

            //webuploader 实例
            var uploader = WebUploader.create({
                auto: true,
                disableGlobalDnd: true,
                swf: applicationPath + '/js/webuploader/uploader.swf',
                server: imgservice + "?" + $.param({ paths: paths }),
                pick: {
                    id: getPickerByTxt($txt),
                    multiple: false
                },
                multiple: false,
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                }
            });

            uploader.on('uploadSuccess', function (file, response: GZ.ImgUploadResponse) {
                fcbReponse(file, response);
            });
            $txt.data('img-pick-inited', true);
        }
    }





  export  function InitMutiImgUpLoadButton($btns: JQuery, typeId: number, opt?: { Id?: number, paths?: string }) {

        for (var i = 0; i < $btns.length; i++) {
            var $btn = $btns.eq(i);
            let opt1 = $.extend({}, { Id: 0, paths: 'public/product' }, opt);

            opt1.Id = opt1.Id || Number($btn.attr("value")) || Number($btn.attr("data-id"));
            aBtnInit($btn, opt1);
        }
        function aBtnInit($btn: JQuery, opt: { Id?: number, paths?: string }) {
            if (!$btn.data("img-pick-inited")) {
                $btn.on("click", function () {
                    var $me = $(this);
                    var load = layer.load("请稍后...", 3);
                    var sname = $(this).attr("sname");
                    var url = "/Home/_ProductImagePartialNew/" + opt.Id + "?type=" + typeId;
                    $.post(url, { type: typeId, paths: opt.paths }, function (msg) {
                        layer.close(load);
                        $.layer({
                            type: 1,
                            title: sname + "-图片列表",
                            maxmin: false,
                            area: ['800px', '600px'],
                            shift: 'left',
                            page: {
                                html: msg
                            },
                            end: function () {
                                var iCount = $('body').eq(0).data("father-images-count");
                                var $imgCount = $me.find("span");
                                if ($imgCount.length > 0) {
                                    $imgCount.html(' ' + iCount + ' 张');
                                }
                                else {
                                    $me.append('<span>' + iCount + " 张</span>");
                                }
                            }
                        });
                    });
                });
            }
        }
   }

  export function InitMutiImgUpLoadButton2($btns: JQuery, typeId: number, opt?: { guid?: string, paths?: string }) {

      for (var i = 0; i < $btns.length; i++) {
          var $btn = $btns.eq(i);
          let opt1 = $.extend({}, { Id: 0, paths: 'public/product' }, opt);
          //debugger;
          opt1.guid = opt1.guid || $btn.attr("data-guid");
          //debugger;
          aBtnInit($btn, opt1);
      }
      function aBtnInit($btn: JQuery, opt: { guid?: number, paths?: string }) {
          if (!$btn.data("img-pick-inited")) {
              $btn.on("click", function () {
                  var $me = $(this);
                  var load = layer.load("请稍后...", 3);
                  var sname = $(this).attr("sname");
                  var url = "/Home/_ProductImagePartialGuid?type=" + typeId + "&guid=" + opt.guid;
                  $.post(url, { type: typeId, paths: opt.paths }, function (msg) {
                      layer.close(load);
                      $.layer({
                          type: 1,
                          title: sname + "-图片列表",
                          maxmin: false,
                          area: ['800px', '600px'],
                          shift: 'left',
                          page: {
                              html: msg
                          },
                          end: function () {
                              var iCount = $('body').eq(0).data("father-images-count");
                              var $imgCount = $me.find("span");
                              if ($imgCount.length > 0) {
                                  $imgCount.html(' ' + iCount + ' 张');
                              }
                              else {
                                  $me.append('<span>' + iCount + " 张</span>");
                              }
                          }
                      });
                  });
              });
          }
      }
  }
}