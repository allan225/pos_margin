odoo.define('pos_margin.pos_margin', function (require) {
    "use strict";
    console.log('test console');
 var models = require('point_of_sale.models');
 var screens = require('point_of_sale.screens');
 var core = require('web.core');
 var _t = core._t;
 var utils = require('web.utils');
 var round_pr = utils.round_precision;


models.Order = models.Order.extend({
    get_total_mare: function() {
        return round_pr(this.orderlines.reduce((function(sum, orderLine) {
            return sum + orderLine.get_marge();
        }), 0), this.pos.currency.rounding);
    },
});


 var _super_orderline = models.Orderline.prototype;
 models.Orderline = models.Orderline.extend({
   get_marge:    function(){
        var rounding = this.pos.currency.rounding;
        var pv = this.get_display_price();
        var cout = this.product.standard_price * this.get_quantity();
        var marge = (pv - cout);
        return round_pr(marge , rounding);
    },
    get_display_marge: function(){
        return this.get_marge();
    },
 });

 screens.OrderWidget.include({
    update_summary: function(){
        var order = this.pos.get_order();
        if (!order.get_orderlines().length) {
            return;
        }

        var total     = order ? order.get_total_with_tax() : 0;
        var taxes     = order ? total - order.get_total_without_tax() : 0;
        var marge     = order ? order.get_total_mare() : 0;

        this.el.querySelector('.summary .total > .value').textContent = this.format_currency(total);
        this.el.querySelector('.summary .total .subentry .value').textContent = this.format_currency(taxes);
        this.el.querySelector('.summary .total .marge .value').textContent = this.format_currency(marge);
    },
 });
});