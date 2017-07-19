Ext.define('Ice.view.cotizacion.AccesoCotizacion', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'accesocotizacion',

    controller: 'accesocotizacion',

    // config ext
    title: 'Cotizadores',
    layout: 'fit',
    scrollable: true,

    constructor: function (config) {
        Ice.log();
        var me = this,
            paso = 'Construyendo acceso a cotizadores';
        try {
            Ice.generaComponentes(); // para interceptor
            config.items = [{
                xtype: 'dataviewice',
                reference: 'dataview',
                cls: 'back_productos',
                style:'background: #DEEBF4;',
                platformConfig: {
                    desktop: {
                        tpl: new Ext.XTemplate(
                            '<tpl for=".">',
                                '<div class="producto_cot">',
                                    '<table class="plan_pago_base shadow_card" style="max-width:250px; min-height:200px;">',
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
                            	'<div class="producto_cot">',
                                	'<div class="plan_pago_base shadow_card2" style="max-width:250px; min-height:100px;">',
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
            }].concat(config.items || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});