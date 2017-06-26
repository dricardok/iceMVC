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
            margin: '0 0 0 10px',
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
            margin: '0 0 0 40px',
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
