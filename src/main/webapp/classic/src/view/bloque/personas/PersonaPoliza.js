Ext.define('Ice.view.bloque.personas.PersonaPoliza', {	
	extend  :       'Ext.panel.Panel',
	xtype	:		'personapoliza',
	controller : 'personapoliza',

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
        accion: null,
        botones: []
	},
	scrollable: true,
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
                
            } catch (e) {
                Ice.generaExcepcion(e, paso);
            }
        me.callParent(arguments);
    },
    initComponent: function () {
    	Ice.log('Ice.view.bloque.personas.PersonaPoliza.initComponent [this, args]:', this, arguments);
        var me = this,
            paso = 'Construyendo busqueda persona';
        
        try {
            var comps = Ice.generaComponentes({
                pantalla: 'BLOQUE_PERSONAS',
                seccion: 'FORMULARIO',
                cdramo: me.cdramo || '',
                modulo: me.modulo || '',
                items: true
            });
            Ice.log('Ice.view.bloque.personas.ListaPersonas.initComponent comps:', comps);
            Ice.log('items',comps.BLOQUE_PERSONAS.FORMULARIO.items);
            
            var modelName = Ext.id();
            
        	var itemsForm = comps.BLOQUE_PERSONAS.FORMULARIO.items;
        	
        	 Ext.apply(me, {
        	     items: [
        	         {
        	           xtype: 'cdpersoncdrol',
                       reference: 'form',
                       height: 150,
                       cdramo: me.cdramo
        	       },{
                       xtype: 'domicilios',
                       reference: 'gridDomicilios',
                       selector: true,
                       scrollable: true,
                       width: 700
                   },{
        	           buttons: [
                           {
                               xtype: 'button',
                               reference: 'btnGuardar',
                               text: 'Guardar',
                               handler: 'onGuardar'
                           },{
                               xtype: 'button',
                               text: 'Cancelar',
                               handler: 'onCancelar'
                           }
                       ]
        	       }
                 ]
             });
        	 // construir componente
            me.callParent(arguments);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});