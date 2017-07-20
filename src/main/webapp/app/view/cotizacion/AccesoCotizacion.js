Ext.define('Ice.view.cotizacion.AccesoCotizacion', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'accesocotizacion',
    ui:'ice-catalogo',
    
    controller: 'accesocotizacion',

//    layout: 'fit',
    // config ext
    platformConfig: {
    	'!desktop': {
//    		title: 'Cotizadores'
    	}
    },
    scrollable: true,

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
                	html: '<div class="titulo_cotiz" style="text-align: center;"><span style="font-size:18px; color:#707372; padding:15px 0px !important;font-weight:600;">Cotizadores</span></div>'
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
                                '<div class="producto_cot" style="margin: 0 auto">',
                                    '<table class="plan_pago_base shadow_card" style="width:230px; height:180px;">',
                                        '<tr>',
                                            '<td class="producto">{dsramo}</td>',
                                        '</tr>',
                                            '<tr style="background-color:#fff;">',
                                            '<td class="slogan">Cotizar</td>',
                                            '</tr>',
                                    '</table>',
                                '</div>',                              
                          '</tpl>'
                        )
                    },
                    '!desktop': {
                        itemTpl: new Ext.XTemplate( 
                            '<tpl for=".">',
                            	'<div class="producto_cot style="margin: 0 auto"">',
                                	'<div class="plan_pago_base shadow_card2" style="width:230px; height:130px;">',
                                		'<div class="producto">{dsramo}</div>',
                                			'<div class="slogan">Cotizar</div>',
                                	'</div>',
                                '</div>',
                            '</tpl>'
                        )
                    }
                },
                itemSelector: 'div.producto_cot',
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