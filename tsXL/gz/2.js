var cols;
cols = [
    {
        field: 'id',
        title: 'ID'
    },
    {
        field: 'name',
        title: '姓名'
    },
    {
        field: 'age',
        title: '年龄',
        formatter: function (value, row) {
            if (value > 25) {
                return "<i>" + value + "</i>";
            }
            return "<b>" + value + "</b>";
        }
    },
    {
        field: 'sex',
        title: '性别',
        radio: true,
        formatter: function (value, row) {
            if (value == 'm') {
                return { checked: true };
            }
            else {
                return { checked: false };
            }
        }
    }
];
$('#table').bootstrapTable({
    data: [{
            id: 5,
            name: 'yzn',
            age: 40,
            sex: 'm'
        },
        {
            id: 6,
            name: 'ddfad',
            age: 20,
            sex: 'w'
        }],
    columns: cols
});
$('dfaf').bootstrapTable({});
