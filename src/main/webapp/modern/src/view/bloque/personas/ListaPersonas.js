/**
 * Created by DEORTIZT on 5/22/2017.
 */
Ext.define('Ice.view.bloque.personas.ListaPersonas', {
	    extend: 'Ice.view.componente.GridIce',
	    xtype: 'listapersonas',
	    
	    controller: 'listapersonas',
		viewModel: 'listapersonas',
	    // configuracio ext
	    title: 'Personas',
	    //se inicializa la barra de encabezado
	    tbar: [],
	    // configuracion del componente (no EXT)
	    config: {
	        modulo: null,
	        flujo: null,
	        cdunieco: null,
	        cdramo: null,
	        estado: null,
	        nmpoliza: null,
	        nmsuplem: null,
	        nmsituac: null,
	        cdbloque: null,
	        cdtipsit: null
	    },
	    
	    // validacion de parametros de entrada
	    constructor: function (config) {
	        Ice.log('Ice.view.bloque.personas.ListaPersonas.constructor config:', config);
	        var me = this,
	            paso = 'Validando construcci\u00f3n de lista de personas';
	            try {
	                if (!config) {
	                    throw 'No hay datos para lista de personas';
	                }
	                
	                config.nmsuplem = config.nmsuplem || 0;
	                
	                if (!config.cdramo || !config.cdtipsit) {
	                    throw 'Falta ramo y tipo de situaci\u00f3n para lista de personas';
	                }
	                
	                if (!config.cdunieco || !config.estado || !config.nmpoliza /*|| Ext.isEmpty(config.nmsuplem)*/) {
                        throw 'Falta llave de p\u00f3lizaASD';
                    }
	                
	                if (config.estado === 'w') {
                        config.estado = 'W';
                    }
	                
	                config.modulo = config.modulo || 'COTIZACION';
	                
	                var comps = Ice.generaComponentes({
	                    pantalla: 'BLOQUE_PERSONAS',
	                    seccion: 'GRID',
	                    modulo: config.modulo || '',
	                    estatus: (config.flujo && config.flujo.estatus) || '',
	                    cdramo: config.cdramo || '',
	                    cdtipsit: config.cdtipsit ||'',
	                    auxKey: config.auxkey || '',
	                    items: true,
	                    columns: true,
	                    fields: true
	                });
	                
	                Ice.log('Ice.view.bloque.personas.ListaPersonas.initComponent comps:', comps);
	                
	                Ice.log('items',comps.BLOQUE_PERSONAS.GRID.items);
	                
	                var modelName = Ext.id();
	                
	                config.columns = comps.BLOQUE_PERSONAS.GRID.columns,
                    
	                config.store = {
                        fields: comps.BLOQUE_PERSONAS.GRID.fields,
                        autoLoad: true,
                        proxy: {
                            type: 'ajax',
                            url: Ice.url.bloque.personas.cargarPersonas,
                            extraParams: {
                                'params.cdunieco' : config.cdunieco,
                                'params.cdramo': config.cdramo,
                                'params.estado': config.estado,
                                'params.nmpoliza': config.nmpoliza,
                                'params.nmsuplem': config.nmsuplem,
                                'params.nmsituac': config.nmsituac
                            },
                            reader: {
                                type: 'json',
                                successProperty: 'success',
                                messageProperty: 'message',
                                rootProperty: 'listas'
                             }
                         }
                    };
	            } catch (e) {
	                Ice.generaExcepcion(e, paso);
	            }
	        me.callParent(arguments);
	    },
	    
	    
	    
});