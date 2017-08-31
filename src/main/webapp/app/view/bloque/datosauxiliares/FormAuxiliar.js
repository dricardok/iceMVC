Ext.define('Ice.view.bloque.datosauxiliares.FormAuxiliar', {
    extend: 'Ice.view.componente.FormDosColumnasIce',
    xtype: 'formauxiliar',

    controller: 'formauxiliar',

    config: {
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,

        nmsuplem: null,
        status: null,

        bloque: null,
        nmsituac: -1,  // default
        cdgarant: '*', // default

        modulo: null,
        cdtipsit: '*', // default
        flujo: null,
        auxkey: null
    },

    constructor: function (config) {
        Ice.log('Ice.view.bloque.datosauxiliares.FormAuxiliar.constructor config:', config);
        var me = this,
            paso = 'Construyendo formulario auxiliar';
        try {
            if (!config.cdramo) {
                throw 'Falta el ramo para el formulario auxiliar';
            }
            if (!config.bloque) {
                throw 'Falta el bloque para el formulario auxiliar';
            }
            if (!config.modulo) {
                throw 'Falta el m\u00f3dulo para el formulario auxiliar';
            }
            
            config.nmsuplem = config.nmsuplem || 0;
            config.status = config.status || 'V';

            config.flujo = config.flujo || {};
            config.auxkey = config.auxkey || '';

            paso = 'Recuperando componentes para formulario auxiliar'
            var comps = Ice.generaComponentes({
                pantalla: 'FORM_AUXILIAR',
                seccion: 'FORM',
                modulo: config.modulo,
                estatus: (config.flujo && config.flujo.estatus) || '',
                cdramo: config.cdramo,
                cdtipsit: config.cdtipsit || '*',
                auxkey: config.bloque,
                
                items: true,
                fields: true,
                validators: true
            });
            
            var eventsForm = Ice.generaComponentes({
				pantalla: 'FORM_AUXILIAR',
				seccion: 'EVENTOS',
				modulo: me.modulo || '',
				estatus: (me.flujo && me.flujo.estatus) || '',
				cdramo: me.cdramo || '',
				cdtipsit: me.cdtipsit ||'',
				auxKey: me.auxkey || '',
				eventos: true
			});

            config.items = comps.FORM_AUXILIAR.FORM.items;
            config.modelFields = comps.FORM_AUXILIAR.FORM.fields;
            config.modelValidators = comps.FORM_AUXILIAR.FORM.validators;
            
            config.iceEvents = eventsForm.FORM_AUXILIAR.EVENTOS.eventos;
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});