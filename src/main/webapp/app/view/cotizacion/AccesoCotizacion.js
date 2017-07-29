Ext.define('Ice.view.cotizacion.AccesoCotizacion', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'accesocotizacion',
    ui:'ice-catalogo',
    cls: 'titulo',
    style:'background-color:#fff !important; ',
    controller: 'accesocotizacion',

//    layout: 'fit',
    // config ext
    platformConfig: {
    	'!desktop': {
//    		title: 'Cotizadores'
    		scrollable: true
    	},
		'desktop': {
			scrollable: false
		}
    },
    

    constructor: function (config) {
        Ice.log();
        var me = this,
            paso = 'Construyendo acceso a cotizadores';
        try {
            Ice.generaComponentes(); // para interceptor
            var items = [];
            if (true || Ice.classic()) {
            	items.push({
                	xtype: 'container',
                	ui:'ice-catalogo',
                	// height: 100,
                	html: '<div class="titulo_cotiz" style="text-align: center;"></br><span style="font-size:22px; color:#707372; padding:30px 0px !important;font-weight:600;">Cotizadores</span></div>'
                });
            }
            items.push({
                xtype: 'dataviewice',
                //html:'<div class="">Cotizadores</div>',
                reference: 'dataview',
                cls: 'back_productos',
                
                platformConfig: {
                    desktop: {
                        tpl: new Ext.XTemplate(
                          '<tpl for=".">',
                                '<div class="wrap_producto" style="width:250px; height:120px; padding-top:1%;">',
                                    '<table style="margin:0 auto;">',
                                        '<tr>',
                                            '<td><p class="icon_product generic C{cdramo}"></p></td>',
                                        '</tr>',
                                        '<tr>',
                                        '<td><p class="text_product">{dsramo}</p></td>',
                                        '</tr>',
                                        
                                    '</table>',
                                '</div>',                             
                          '</tpl>'
                        )
                    }, 
                    '!desktop': {
                        itemTpl: new Ext.XTemplate(
                            '<tpl for=".">',
                                 '<table class="wrap_producto" style="width:250px; height:100px; margin-top:5%;">',
                                     '<tr>',
                                 		'<td><p class="icon_product generic C{cdramo}"></p></td>',
                                 	 '</tr>',
                                 	 '<tr>',
                                 		'<td><p class="text_product">{dsramo}</p></td>', 
                                 	 '</tr>',		
                                '</table',
                            '</tpl>'
                        )
                    }
                },
 
                itemSelector: 'div.wrap_producto',
                store: {
                    autoLoad: true,
                    fields: ['cdramo', 'dsramo', 'cdtipsit', 'dstipsit'],
                    proxy: {
                        type: 'ajax',
                        url: Ice.url.core.recuperacionSimple,
                        extraParams: {
                            'params.consulta': 'OBTENER_COTIZADORES_DISPONIBLES'
                        },
                        reader: {
                            type: 'json',
                            rootProperty: 'list',
                            successProperty: 'success',
                            messageProperty: 'message'
                        }
                    }
                },
                listeners: {
                    itemclick: 'onItemClic'
                }
            });
            config.items = items.concat(config.items || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});