/**
 * Created by DEORTIZT on 5/22/2017.
 */
Ext.define('Ice.view.bloque.personas.ListaPersonas', {
	    extend: 'Ext.grid.Panel',
	    xtype: 'listapersonas',
	    
	    controller: 'listapersonas',
	    viewModel: 'listapersonas',
	    scrollable: true,
	    actionColumns: [],
	    // validacion de parametros de entrada
	    constructor: function (config) {
	        Ice.log('Ice.view.bloque.personas.ListaPersonas.constructor config:', config);
	        var me = this,
	            paso = 'Validando construcci\u00f3n de lista de personas';
	            try {
	                if (!config) {
	                    throw 'No hay datos para lista de personas';
	                }
	                
	                if (!config.cdramo || !config.cdtipsit) {
	                    throw 'Falta ramo y tipo de situaci\u00f3n para lista de personas';
	                }
	                
	                if (!config.cdunieco || !config.estado || !config.nmpoliza || Ext.isEmpty(config.nmsuplem)) {
                        throw 'Falta llave de p\u00f3liza';
                    }
	                
	                config.modulo = config.modulo || 'COTIZACION';
	                
	            } catch (e) {
	                Ice.generaExcepcion(e, paso);
	            }
	        me.callParent(arguments);
	    },
	    
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
	    
	    
	    // configuracio ext
	    title: 'Personas',
	    
	    //se inicializa la barra de encabezado
	    tbar: [],
	    
	    // contruccion usando metodos ext y parametros de entrada
	    initComponent: function () {
	        Ice.log('Ice.view.bloque.personas.ListaPersonas.initComponent');
	        var me = this,
	            paso = 'Construyendo bloque lista personas';
	        try {
	            var comps = Ice.generaComponentes({
	                pantalla: 'BLOQUE_PERSONAS',
	                seccion: 'GRID',
	                modulo: me.modulo || '',
	                estatus: (me.flujo && me.flujo.estatus) || '',
	                cdramo: me.cdramo || '',
	                cdtipsit: me.cdtipsit ||'',
	                auxKey: me.auxkey || '',
	                items: true,
	                columns: true,
	                fields: true
	            });
	            Ice.log('Ice.view.bloque.personas.ListaPersonas.initComponent comps:', comps);
	            Ice.log('items',comps.BLOQUE_PERSONAS.GRID.items);
	            
                var modelName = Ext.id();
                Ext.apply(me, {
                    columns: comps.BLOQUE_PERSONAS.GRID.columns.concat(me.actionColumns),
                    store  : {
                        fields: comps.BLOQUE_PERSONAS.GRID.fields,
                        autoLoad: false,
                        proxy: {
                            type: 'ajax',
                            url: Ice.url.bloque.personas.cargarPersonas,
                            extraParams: {
                                'params.cdunieco' : me.cdunieco,
                                'params.cdramo': me.cdramo,
                                'params.estado': me.estado,
                                'params.nmpoliza': me.nmpoliza,
                                'params.nmsuplem': me.nmsuplem,
                                'params.nmsituac': me.nmsituac
                            },
                            reader: {
                                type: 'json',
                                successProperty: 'success',
                                messageProperty: 'message',
                                rootProperty: 'listas'
                             }
                         }
                    },
                    buttons:me.config.buttons,
                });
                // construir componente
                me.callParent(arguments);
	        } catch (e) {
	            Ice.generaExcepcion(e, paso);
	        }
	    }
	
});