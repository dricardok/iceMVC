Ext.define('Ice.view.componente.FormDosColumnasIce', {
    extend: 'Ice.view.componente.FormIce',
    xtype: 'formdoscolumnasice',
	
    // config ext
    layout: 'default', // para usar responsivo
    bodyPadding: '20 0 0 20',

    constructor: function (config) {
        Ice.log('Ice.view.componente.FormDosColumnasIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo formulario';
        try {
            if ((config.items || []).length > 0) {
                Ice.agregarClases(config.items, ['big-50', 'small-100']);
                Ice.agregarEstilo(config.items, 'float: left; margin: 0px 20px 20px 0px;');
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
                Ice.agregarEstilo(arguments, 'float: left; margin: 0px 20px 20px 0px;');
            }
        }  catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});