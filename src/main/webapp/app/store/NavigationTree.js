Ext.define('Ice.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        url: Ice.url.core.recuperarMenus,
        reader: {
            type: 'json',
            successProperty: 'success',
            messageProperty: 'message'
        }
    },
    
    transformarMenu: function (me, configs) {
        Ice.log('Ice.store.NavigationTree.transformarMenu configs -:', configs);
        var paso = 'Generando menu recursivo',
            items = [];
        try {
        	configs = configs || [];
        	//configs.push({"atrWork": "bloquecoberturas.action?iconCls=dollar&cdramo=902&cdtipsit=92&cdunieco=5&estado=M&nmpoliza=50000016&nmsuplem=245379912000000000","atrMenu": "bloquecoberturas","atrFinish": true,"atrCdfunci": "00305","atrTarget": "C"});
            for (var i = 0; i < configs.length; i++) {
                var config = configs[i],
                    item = {
                        text: config.atrMenu || '',
                        url: config.atrWork || '',
                        leaf: config.atrFinish === true,
                        tipo: config.atrTarget || '',
                        iconCls: '',
                        children: [],
                        selectable: config.atrFinish === true
                    };
                if (item.url.indexOf('iconCls') !== -1) {
                    var iconCls = item.url.substring(item.url.indexOf('iconCls')), // iconCls=xxx, iconCls=xxx&...
                        iconCls = iconCls.substring(iconCls.indexOf('=') + 1), // xxx, xxx&...
                        iconCls = iconCls.split('&')[0]; // xxx
                    item.iconCls = 'x-fa fa-' + iconCls;
                }
                if (item.text.toLowerCase().indexOf('iconcls') !== -1) {
                    var iconCls = item.text.substring(item.text.toLowerCase().indexOf('iconcls')), // Iconcls=Dollar, Iconcls=Dollar&...
                        iconCls = iconCls.substring(iconCls.indexOf('=') + 1), // Dollar, Dollar&...
                        iconCls = iconCls.split('&')[0].toLowerCase(); // dollar
                    item.iconCls = 'x-fa fa-' + iconCls;
                    item.text = item.text.substring(0, item.text.indexOf('?'));
                }
                if (config && config.nodes && config.nodes.length > 0) {
                    item.children = me.transformarMenu(me, config.nodes);
                }
                items.push(item);
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.store.NavigationTree.transformarMenu items:', items, 'configs:', configs);
        return items;
    },
    
    listeners: {
        load: function (me, records, success, op) {
            Ice.log('Ice.store.NavigationTree.load args:', arguments);
            var paso = 'Construyendo menu';
            try {
                if (success !== true) {
                    return;
                }
                var json = Ext.JSON.decode(op.getResponse().responseText),
                    json = Ext.JSON.decode(json.message);
                Ice.log('Ice.store.NavigationTree menu original:', json);
                if (json && json.lstChildNodes && json.lstChildNodes.length > 0) {
                    json.children = me.transformarMenu(me, json.lstChildNodes);
                    Ice.log('Ice.store.NavigationTree menu transformado:', json);
                    me.getRoot().removeAll();
                    me.setRoot(Ext.create('Ext.data.TreeModel', {
                        children: json.children
                    }));
                } else {
                    Ice.log('Ice.store.NavigationTree no hay menu para transformar');
                }
            } catch (e) {
                Ice.manejaExcepcion(e, paso);
            }
        }
    }
        
    /*root: {
        expanded: true,
        children: [
            {
                text: 'Mesa',
                iconCls: 'x-fa fa-bar-chart',
                leaf: true,
                
                tipo: 'C', // C-U-L (C = componente, U = URL, L = loader)
                url: 'mesacontrol.action'
            }, {
                text: 'Cotizar',
                iconCls: 'x-fa fa-dollar',
                expanded: false,
                selectable: false,
                children: [
                    {
                        text: 'RC',
                        iconCls: 'x-fa fa-building',
                        leaf: true,
                        
                        tipo: 'C', // C-U-L (C = componente, U = URL, L = loader)
                        url: 'cotizacion.action?cdramo=501&cdtipsit=51'
                    }, {
                        text: 'Casa habitaci\u00f3n',
                        iconCls: 'x-fa fa-home',
                        leaf: true,
                        
                        tipo: 'C', // C-U-L (C = componente, U = URL, L = loader)
                        url: 'cotizacion.action?cdramo=420&cdtipsit=4C'
                    }
                ]
            }, {
                text: 'Emitir',
                iconCls: 'x-fa fa-star',
                viewType: 'pantallaemision',
                leaf: true
            }, {
                text: 'Cobranza',
                iconCls: 'x-fa fa-money',
                viewType: 'pantallacobranza',
                leaf: true
            }, {
                text: 'Erick',
                iconCls: 'x-fa fa-smile-o',
                leaf: true,
                tipo: 'C',
                url: 'erickCmp.action'
            }, {
                text: 'Cesar',
                iconCls: 'x-fa fa-smile-o',
                leaf: true,
                tipo: 'C',
                url: 'cesarCmp.action'
            }, {
                text: 'Ricardo',
                iconCls: 'x-fa fa-smile-o',
                leaf: true,
                tipo: 'C',
                url: 'ricardoCmp.action'
            }, {
                text: 'Alvaro',
                iconCls: 'x-fa fa-smile-o',
                leaf: true,
                tipo: 'C',
                url: 'alvaroCmp.action'
            }, {
                text: 'Cadena',
                iconCls: 'x-fa fa-smile-o',
                leaf: true,
                tipo: 'C',
                url: 'cadenaCmp.action'
            }
            /*{
                text: 'Dashboard',
                iconCls: 'x-fa fa-desktop',
                rowCls: 'nav-tree-badge nav-tree-badge-new',
                viewType: 'admindashboard',
                routeId: 'dashboard', // routeId defaults to viewType
                leaf: true
            },
            {
                text: 'Email',
                iconCls: 'x-fa fa-send',
                rowCls: 'nav-tree-badge nav-tree-badge-hot',
                viewType: 'email',
                leaf: true
            },
            {
                text: 'Profile',
                iconCls: 'x-fa fa-user',
                viewType: 'profile',
                leaf: true
            },
            {
                text: 'Search results',
                iconCls: 'x-fa fa-search',
                viewType: 'searchresults',
                leaf: true
            },
            {
                text: 'FAQ',
                iconCls: 'x-fa fa-question',
                viewType: 'faq',
                leaf: true
            },
            {
                text: 'Pages',
                iconCls: 'x-fa fa-leanpub',
                expanded: false,
                selectable: false,
                //routeId: 'pages-parent',
                //id: 'pages-parent',

                children: [
                    {
                        text: 'Blank Page',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'pageblank',
                        leaf: true
                    },

                    {
                        text: '404 Error',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'page404',
                        leaf: true
                    },
                    {
                        text: '500 Error',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    },
                    {
                        text: 'Lock Screen',
                        iconCls: 'x-fa fa-lock',
                        viewType: 'lockscreen',
                        leaf: true
                    },

                    {
                        text: 'Login',
                        iconCls: 'x-fa fa-check',
                        viewType: 'login',
                        leaf: true
                    },
                    {
                        text: 'Register',
                        iconCls: 'x-fa fa-pencil-square-o',
                        viewType: 'register',
                        leaf: true
                    },
                    {
                        text: 'Password Reset',
                        iconCls: 'x-fa fa-lightbulb-o',
                        viewType: 'passwordreset',
                        leaf: true
                    }
                ]
            },
            {
                text: 'Widgets',
                iconCls: 'x-fa fa-flask',
                viewType: 'widgets',
                leaf: true
            },
            {
                text: 'Forms',
                iconCls: 'x-fa fa-edit',
                viewType: 'forms',
            },
            {
                text: 'Charts',
                iconCls: 'x-fa fa-pie-chart',
                viewType: 'charts',
                leaf: true
            }
        ]
    }*/
});
