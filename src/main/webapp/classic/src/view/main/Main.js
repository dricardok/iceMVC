Ext.define('Ice.view.main.Main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree'
    ],

    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 103,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    width: 50
                }, {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                }, {
                    xtype: 'component',
                    reference: 'suraLogo',
                    cls: 'sura-logo',
                    html: '<div class="main-logo"><img src="resources/images/logo_sura_header.png"></div>',
                    width: 250
                },
                '->',
                {
                    xtype: 'tbtext',
                    reference: 'userBind',
                    bind: {
                        text: '{dsusuari} - {dssisrol}',
                        hidden: '{!rolOUsuario}'
                    },
                    cls: 'dinR'
                }, {
                    iconCls: 'x-fa fa-user',
                    ui: 'header',
                    bind: {
                        hidden: '{!rolOUsuario}'
                    },
                    handler: 'onToggleUserMenuSize'
                }
            ]
        }, {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'navigation',
                    store: 'NavigationTree',
                    width: 250,
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                }, {
                    xtype: 'container',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }, {
                    xtype: 'panel',
                    reference: 'userMenu',
                    itemId: 'userMenu',
                    width: 0,
                    layout: 'anchor',
                    cls: 'shadow',
                    style: 'background: white;',
                    defaults: {
                        anchor: '100%'
                    },
                    micro: true,
                    getMicro: function () {
                        return this.micro;
                    },
                    setMicro: function (micro) {
                        this.micro = micro;
                    },
                    items: [
                        {
                            xtype: 'comboice',
                            label: 'Cambiar rol',
                            labelWidth: 90,
                            valueField: 'cdsisrol',
                            displayField: 'dssisrol',
                            bind: {
                                value: '{cdsisrol}',
                                store: '{roles}',
                                hidden: '{rolesCount < 2}'
                            },
                            listeners: {
                                select: 'onComboRolesSesionSelect'
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
        }
    ]
});
