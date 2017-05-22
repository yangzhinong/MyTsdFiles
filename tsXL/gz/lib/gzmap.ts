namespace GZMAP {
    interface ISetting {
        divMapId: string;
        $txtX: JQuery  //x
        $txtY: JQuery
        $txtAddress?:JQuery  //地址文本
        $btnLocate?:JQuery  //定位按钮

        
    }
    declare var BMap;
    /**
     * 
     * @param opt
     *   {
     *       divMapId: string;
     *       $txtX: JQuery  //x
     *       $txtY: JQuery
     *      $txtAddress?:JQuery  //地址文本
     *       $btnLocate?:JQuery  //定位按钮
     *   }
     */
    export function InitMap(opt:ISetting) {
        var map = new BMap.Map(opt.divMapId);
        var x = 106.560447,
            y = 29.567922;

        if (opt.$txtX.val() && Number(opt.$txtX.val()) !=0 ) {
            x = Number(opt.$txtX.val());
        }

        if (opt.$txtY.val() && Number(opt.$txtY.val()) != 0) {
            y = Number(opt.$txtY.val());
        }


        var point = new BMap.Point(x,y);                        //创建点坐标
        map.centerAndZoom(point, 15);                                             //设置地图的中心点
        map.enableScrollWheelZoom();                                              //启用滚轮放大缩小
        var marker = new BMap.Marker(point);                                      //创建一个标注
        map.addOverlay(marker);                                                   //将标注添加到地图中
        marker.enableDragging();                                                  //标注可以移动
        marker.addEventListener("dragend", function (e) {
            opt.$txtX.val(e.point.lng);
            opt.$txtY.val(e.point.lat);
            map.setCenter(e.point);
        });
        // $('#' + opt.divMapId).data("gzmapsetting", opt);
        opt.$btnLocate.click(function () {  //定位按钮
            var localSearch = new BMap.LocalSearch(map);
            var keyword = opt.$txtAddress.val();
            localSearch.setSearchCompleteCallback(function (searchResult) {
                var poi = searchResult.getPoi(0);
                if (!poi) {
                    return;
                }
                map.clearOverlays();//清空原来的标注
                opt.$txtX.val(poi.point.lng);
                opt.$txtY.val(poi.point.lat);
                map.centerAndZoom(poi.point, 16);
                var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
                map.addOverlay(marker);
                marker.enableDragging();
                marker.addEventListener("dragend", function (e) {
                    opt.$txtX.val(e.point.lng);
                    opt.$txtY.val(e.point.lat);
                    map.setCenter(e.point);
                    var myGeo = new BMap.Geocoder();
                    // 根据坐标得到地址描述
                    myGeo.getLocation(e.point, function (result) {
                        if (result) {
                            if (opt.$txtAddress.val() == "") {
                                opt.$txtAddress.val(result.address);
                            } else {
                                layer.confirm("是否替换已填入的地址?", function (b) {
                                    if (b) {
                                        opt.$txtAddress.val(result.address);
                                        layer.closeAll();
                                    }
                                })
                            }
                        }
                    });

                });
            });
            localSearch.search(keyword);
        });

    }

    function setMapPoint(opt:ISetting) {
        
    }



}