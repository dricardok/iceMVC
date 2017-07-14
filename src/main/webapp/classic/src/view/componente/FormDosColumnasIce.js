Ext.define('Ice.view.componente.FormDosColumnasIce', {
    extend: 'Ice.view.componente.FormIce',
    xtype: 'formdoscolumnasice',
    
    // plugin para poder usar el layout responsivo
    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],
    
    // config ext
    layout: 'responsivecolumn',
    bodyPadding: '0 0 0 80',

    constructor: function (config) {
        Ice.log('Ice.view.componente.FormDosColumnasIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo formulario';
        try {
            if ((config.items || []).length > 0) {
                Ice.agregarClases(config.items, ['big-50', 'small-100']);
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },

    add: function () {
        Ice.log('Ice.view.componente.FormDosColumnasIce.add args:', arguments);
        var me = this,
            paso = 'Agregando componentes al formulario';
        try {
            if (arguments.length > 0) {
                Ice.agregarClases(arguments, ['big-50', 'small-100']);
            }
        }  catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});