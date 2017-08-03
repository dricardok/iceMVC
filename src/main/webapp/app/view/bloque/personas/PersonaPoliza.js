Ext.define('Ice.view.bloque.personas.PersonaPoliza', {	
	extend  :       'Ice.view.componente.PanelPaddingIce',
	xtype	:		'personapoliza',
	controller : 'personapoliza',

    // config ext
    platformConfig: {
        '!desktop': {
            scrollable: true,
        }
    },

    // config no ext
	config	:		{
	    cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        nmsituac: null,
        cdrol: null,
        cdperson: null,
        nmsuplem: null,
        status: null,
        nmorddom: null,
        swfallec: null,
        cdtipsit: null,
        accion: null
	},

	constructor: function (config) {
        Ice.log('Ice.view.bloque.PersonaPoliza.constructor config:', config);
        var me = this,
            paso = 'Validando construcci\u00f3n de busqueda de persona';
        try {
            if (!config) {
                throw 'No hay datos para lista de personas';
            }
            
            if (!config.cdramo || !config.cdtipsit) {
                throw 'Falta ramo y tipo de situaci\u00f3n para lista de personas';
            }
            
            if (!config.cdunieco || !config.estado || !config.nmpoliza || Ext.isEmpty(config.nmsuplem)) {
                throw 'Falta llave de p\u00f3liza y situacion';
            }
            
            if(Ext.isEmpty(config.nmsituac)){
                throw 'No se recibio situacion de riesgo';
            }
            
            // var comps = Ice.generaComponentes({
            //     pantalla: 'BLOQUE_PERSONAS',
            //     seccion: 'FORMULARIO',
            //     cdramo: config.cdramo,
            //     modulo: config.modulo,
            //     items: true
            // });

            config.items = [
                {
                    xtype: 'cdpersoncdrol',
                    reference: 'form',
                    cdramo: config.cdramo
                }, {
                    xtype: 'domicilios',
                    reference: 'gridDomicilios',
                    selector: true
                }
            ].concat(config.items || []);

            config.buttons = [
                {
                    text: 'Guardar',
                    iconCls: 'x-fa fa-save',
                    reference: 'btnGuardar',
                    handler: 'onGuardar'
                }, {
                    text: 'Cancelar',
                    iconCls: 'x-fa fa-close',
                    handler: 'onCancelar'
                }
            ].concat(config.buttons || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});