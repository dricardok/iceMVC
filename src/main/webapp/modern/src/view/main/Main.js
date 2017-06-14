Ext.define('Ice.view.main.Main', {
    extend: 'Ext.Container',
    requires: [
        'Ext.Button',
        'Ext.list.Tree',
        'Ext.navigation.View'
    ],

    controller: 'main',
    viewModel: 'main',
    
    platformConfig: {
        phone: {
            controller: 'phone-main'
        }
    },
    
    itemId: 'mainView',

    layout: 'hbox',

    items: [
        {
            xtype: 'maintoolbar',
            docked: 'top',
            userCls: 'main-toolbar shadow'
        }, {
            xtype: 'container',
            userCls: 'main-nav-container',
            reference: 'navigation',
            scrollable: true,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTree',
                    ui: 'navigation',
                    store: 'NavigationTree',
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        itemclick: 'onNavigationItemClick',
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                }
            ]
        }, {
            xtype: 'navigationview',
            flex: 1,
            reference: 'mainCard',
            userCls: 'main-container',
            navigationBar: false
        }, {
            xtype: 'container',
            userCls: 'user-nav-container',
            reference: 'userNavigation',
            scrollable: true,
            items: [
                {
                    xtype: 'comboice',
                    label: 'Cambiar rol',
                    labelWidth: 90,
                    valueField: 'cdsisrol',
                    displayField: 'dssisrol',
                    autoSelect: false,
                    bind: {
                        //value: '{cdsisrol}',
                        store: '{roles}',
                        hidden: '{rolesCount < 2}'
                    },
                    defaultPhonePickerConfig: {
                        style: 'z-index: 11;'
                    },
                    listeners: {
                        change: 'onComboRolesSesionSelect'
                    }
                }, {
                    xtype: 'button',
                    text: 'Salir',
                    iconCls: 'x-fa fa-sign-out',
                    handler: 'onLogoutClic'
                }
            ]
        }
    ]
});
