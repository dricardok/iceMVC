Ext.define('Ice.view.bloque.personas.PersonaRol', {
    extend: 'Ice.view.componente.FormDosColumnasIce',
    xtype: 'cdpersoncdrol',

    // config ext
    title: 'Buscar personas',

    // config no ext
    config: {
        cdramo: null,
        cdrol: null,
        mostrarRol: true
    },

    constructor: function (config) {
        Ice.log('Ice.view.bloque.PersonaRol.constructor config:', config);
        var me = this,
            paso = 'Validando construcci\u00f3n de busqueda de persona';
        try {
            if (!config) {
                throw 'No hay datos para lista de personas';
            }
            
            if (!config.cdramo) {
                throw 'Falta ramo para persona por rol';
            }

            var comps = Ice.generaComponentes({
                pantalla: 'PERSONA_ROL',
                seccion: 'FORMULARIO',
                cdramo: config.cdramo,
                items: true
            });

            config.items = (comps.PERSONA_ROL.FORMULARIO.items || []).concat(config.items || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.PersonaRol.constructor');
        me.callParent(arguments);
    }
});