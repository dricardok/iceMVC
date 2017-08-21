Ext.define('Ice.view.componente.FormUnaColumnaIce', {
    extend: 'Ice.view.componente.FormIce',
    xtype: 'formunacolumnaice',
	
    // config ext
    layout: 'default', // para usar responsivo
    bodyPadding: '20 0 0 20',

    constructor: function (config) {
        Ice.log('Ice.view.componente.FormUnaColumnaIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo formulario';
        try {
            if ((config.items || []).length > 0) {
                Ice.agregarClases(config.items, ['big-100', 'small-100']);
                Ice.agregarEstilo(config.items, 'float: left; margin: 0px 20px 20px 0px;');
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },

    add: function () {
        Ice.log('Ice.view.componente.FormUnaColumnaIce.add args:', arguments);
        var me = this,
            paso = 'Agregando componentes al formulario';
        try {
            if (arguments.length > 0) {
                Ice.agregarClases(arguments, ['big-100', 'small-100']);
                Ice.agregarEstilo(arguments, 'float: left; margin: 0px 20px 20px 0px;');
            }
        }  catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});