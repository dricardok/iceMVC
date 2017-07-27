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
            cls: 'sencha-dash-dash-headerbar',
            height: 102,
            itemId: 'headerBar',
            items: [
                /*{
                    xtype: 'component',
                    reference: 'senchaLogo',
                    width: 50
                }, {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize',
                    hidden: true
                },*/ {
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
                    cls: ''
                }, {
                    iconCls: 'x-fa fa-user',
                    ui: 'header',
                    margin: '0 65 0 0',
                    bind: {
                        hidden: '{!rolOUsuario}'
                    },
                    handler: 'onToggleUserMenuSize'
                }
            ]
        }, {
        	xtype: 'toolbar',
        	cls: 'head_02 shadow',
        		items: [
        		{
                    margin: '0 0 0 80',
                    ui: 'header',
                    iconCls:'x-fa fa-navicon ',
                    id: 'main-navigation-btn',
                    cls:'bco_nav',
                    handler: 'onToggleNavigationSize'
                }, {
                	xtype: 'tbtext',
                	cls: '',
                	style:'color:#fff !important;',
                	text: 'SEGUROS'
                },'->', 
                
                {
                    iconCls:'x-fa fa-envelope',
                    ui: 'header',
                    id:'mail_s',
                    cls: 'mail_sura'
                },
              
                {
                    xtype: 'box',
                    style:'',
                    html: '<a href="mailto:surateescucha@segurossura.com.mx" style="font-family:arial;color:#fff !important;text-align:left;padding-right:45px;text-decoration:underline">surateescucha@segurossura.com.mx</a>'
                   
                },
                
                {
                    iconCls:'x-fa fa-phone',
                    ui: 'header',
                    id:'phone_s',
                    cls: 'phone_sura'
                    
                },
                {
                	xtype: 'tbtext',
                	style:'color:#fff !important;padding-right:95px;',
                	cls: '',
                	text: '01 800 00 83 693 /  5723 7944'
                }
        	]
        }, {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            listeners: {
                afterrender: 'mainCardPanelAfterrender'
            },
            onScrollEnd: function (x, y) {
                this.fireEvent('onScrollEnd', this, x, y);
            },
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
                    xtype: 'container',
                    reference: 'userMenu',
                    itemId: 'userMenu',
                    width: 0,
                    layout: 'anchor',
                    cls: 'shadow',
                    style: 'background: white; padding: 0px 0px 0px 10px;',
                    defaults: {
                        anchor: '100%',
                        style: 'margin: 0px 10px 10px 0px;'
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
