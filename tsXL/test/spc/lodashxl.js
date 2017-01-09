describe('lodash learn ', function () {
    it('every', function () {
        var d = _.every([1, 2, 3, 4], function (n) {
            return n % 2 === 0;
        });
        //expect(true).toBe(d);
        var fruits = [
            {
                name: 'apple',
                price: 1.99,
                onSale: true
            },
            {
                name: 'orange',
                price: 0.99,
                onSale: true
            }
        ];
        var d2 = _.every(fruits, 'onSale', true);
        expect(true).toBe(d2);
        var obj = {
            a: 1,
            b: 4,
            c: 3
        };
        var k = _.every(obj, function (n) {
            return n == 1;
        });
        _.every({ id: 5, name: 'yzn' }, function (n) {
        });
        console.log('_every(ojb)=' + k);
    });
    it('reduce', function () {
        var s = _.reduce(['this'], function (ac, val) {
            return ac + ',' + val;
        });
        expect('this,yzn,qqs').toEqual(s);
    });
    it('filter', function () {
        console.log(_.filter(['a', 'b', 'c'], function (c) {
            return c > 'b';
        }));
        {
            var x = { a: 1, b: 2, c: 3 };
            console.log(_.filter(x, function (o) {
                return o > 1;
            }));
            console.log(_.filter('hello', function (c) {
                return c !== 'l';
            }));
            expect(['h', 'e', 'o']).toEqual(_.filter('hello', function (c) { return c !== 'l'; }));
        }
    });
    it('At', function () {
        var obj = { a: 1, b: 'yzn', c: 'qq' };
        //Get values from a collection by keys or indexes
        console.log(_.at(obj, ['d']));
        _.includes(obj, 1);
        _.includes([{ id: 5, name: 'yzn' }, { id: 2, name: 'qq' }], { id: 2, name: 'qq' });
    });
    it('Partition', function () {
        _.partition('hello', function (c) {
            return c > 'l';
        });
        var fruits = [
            {
                name: 'apple',
                price: 1.99,
                onSale: true
            },
            {
                name: 'orange',
                price: 0.99,
                onSale: true
            }
        ];
        _.find(fruits, function (f) {
            return f.price > 1.1;
        });
        _.find(fruits, function (f) {
            return f.name == 'orange';
        });
    });
    it('template', function () {
        var tpl = _.template('Hello, <%= name %>. Current time is <%= new Date() %>.');
        tpl({
            name: 'Alex'
        });
        var tpl = _.template('<div><%- markup %></div>');
        tpl({
            markup: '<span>Hello</span>'
        });
        // -> '<div>&lt;span&gt;Hello&lt;/span&gt;</div>'\
        var tpl = _.template('<% if (a > 0) { %> Good! <% } else { %> Bad! <% } %>');
        tpl({
            a: 1
        });
        // -> ' Good! '
        tpl({
            a: -1
        });
        // -> ' Bad! '
    });
});
