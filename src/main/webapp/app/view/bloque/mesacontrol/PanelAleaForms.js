Ext.define('Ice.view.bloque.mesacontrol.PanelAleaForms', {
    extend: 'Ice.view.componente.FormDosColumnasIce',
    xtype: 'panelaleaforms',

    controller: 'panelaleaforms',

    config: {
        flujo: null
    },

    constructor: function (config) {
        Ice.log('Ice.view.bloque.mesacontrol.PanelAleaForms.constructor config:', config);
        var me = this,
            paso = 'Construyendo ventana alea forms';
        try {
            config.flujo = Ice.validarParamFlujo(config);

            Ice.validate(config.flujo     , 'Falta el flujo para pantalla alea forms',
                         config.flujo.aux , 'Falta el auxiliar para pantalla alea forms');
            paso = 'Decodificando auxiliar json';
            var json = Ext.JSON.decode(config.flujo.aux);

            Ice.validate(json.title, 'Falta el titulo en el auxiliar para pantalla de alea forms',
                         json.seccion, 'Falta la secci\u00f3n en el auxiliar para pantalal de alea forms');

            config.title = 'Acceso a ALEA - ' + json.title;

            var comps = Ice.generaComponentes({
                pantalla: 'ALEA_FORMS',
                seccion: json.seccion,
                modulo: '',
                estatus: '',
                cdramo: '',
                cdtipsit: '',
                auxkey: '',
                
                items: true
            });

            config.items = comps.ALEA_FORMS[json.seccion].items || [];

            me.callParent(arguments);
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});