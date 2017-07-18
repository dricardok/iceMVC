Ext.define('Ice.view.cotizacion.AccesoCotizacion', {
    extend: 'Ice.view.componente.PanelPaddingIce',
    xtype: 'accesocotizacion',

    controller: 'accesocotizacion',

    // config ext
    title: 'Cotizadores',

    constructor: function (config) {
        Ice.log();
        var me = this,
            paso = 'Construyendo acceso a cotizadores';
        try {
            config.items = [{
                xtype: 'dataviewice',
                reference: 'dataview',
                tpl: new Ext.XTemplate(
                    '<tpl for=".">',
                        '<div class="thumb">',
                            'Datos: {cdramo}, {dsramo}, {cdtipsit}, {dstipsit}',
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