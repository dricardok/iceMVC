Ext.define('Ice.view.cotizacion.AccesoCotizacion', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'accesocotizacion',

    controller: 'accesocotizacion',

    // config ext
    title: 'Cotizadores',
    platformConfig: {
        '!desktop': {
            scrollable: true
        }
    },

    constructor: function (config) {
        Ice.log();
        var me = this,
            paso = 'Construyendo acceso a cotizadores';
        try {
            Ice.generaComponentes(); // para interceptor
            config.items = [{
                xtype: 'dataviewice',
                reference: 'dataview',
                tpl: new Ext.XTemplate(
                    '<tpl for=".">',
                        '<div class="plan_pago thumb">',
                            '<table class="plan_pago_base shadow_card" style="width:150px; min-height:150px;">',
                                '<tr>',
                                    '<td class="plan_pago_monto thumb">{dsramo}</td>',
                                '</tr>',
                                '<tr style="background-color:#fff;">',
                                    '<td style="text-align:center;">',
                                        '<p class="periocidad">{dstipsit}</p>',
                                    '</td>',
                                '</tr>',
                            '</table>',
                        '</div>',
                    '</tpl>'
                ),
                itemSelector: 'div.thumb',
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