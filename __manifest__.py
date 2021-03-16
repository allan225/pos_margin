# -*- coding: utf-8 -*-
{
    'name': "POS Margin",
    'sequence':3,
    'summary': "Point of sale margin",
    'description': """Long description""",
    'author': "Parfait AllA",
    'category': 'Point of Sale',
    'version': '11.0.1',
    'depends': ['point_of_sale', 'sale_margin'],
    'data': [
        "views/assets.xml",
        "views/view_pos_order.xml",
    ],
    'qweb': ['static/src/xml/pos_margin_view.xml'],
    'installable': True,
    'auto_install': False,
}
