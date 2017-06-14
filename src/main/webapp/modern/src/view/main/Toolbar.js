Ext.define('Ice.view.main.Toolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'maintoolbar',

    requires: [
        'Ext.SegmentedButton'
    ],

    items: [
        {
            // This component is moved to the floating nav container by the phone profile
            xtype: 'component',
            reference: 'logo',
            userCls: 'main-logo',
            html: 'Cotizadores'
        }, {
            xtype: 'button',
            ui: 'header',
            iconCls: 'x-fa fa-bars',
            margin: '0 0 0 10',
            listeners: {
                tap: 'onToggleNavigationSize'
            }
        }, {
            xtype: 'component',
            reference: 'suralogo',
            userCls: 'sura-logo'
        },
        '->',
        {
            xtype: 'button',
            ui: 'header',
            iconCls: 'x-fa fa-user',
            margin: '0 0 0 10',
            listeners: {
                tap: 'onToggleUserNavigationSize'
            },
            bind: {
                hidden: '{!rolOUsuario}',
                text: '{dsusuari}<br/>{dssisrol}'
            }
        }
    ]
});
