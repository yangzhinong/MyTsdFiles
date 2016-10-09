$(document).ready(function () {
    $('#b-table').bootstrapTable({
        ajax: function (params) {
            console.log(params.data);
            $.post('/yznTest/getdata', params.data, function (d) {
                console.log(d);
                params.success(d);
            });
            //setTimeout(function () {
            //    params.success({
            //        total: 100,
            //        rows: [{
            //            id: 0,
            //            name: "Item 0",
            //            price:'$0'
            //        }]
            //    });
            //}, 1000);
        }
    });
});
//# sourceMappingURL=1.js.map