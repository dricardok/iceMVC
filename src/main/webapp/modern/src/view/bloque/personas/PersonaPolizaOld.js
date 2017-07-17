Ext.define('Ice.view.bloque.personas.PersonaPolizaOld', {	
		extend : 'Ext.Panel',
		xtype : 'personapolizaold',
		controller : 'personapoliza',
        
        layout: 'vbox',
		config : {
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
		    botones: []
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
                    
                    if(!config.nmsituac){
                        throw 'No se recibio situacion de riesgo';
                    }

                    if(config.estado = 'w'){
                        config.estado = 'W';
                    }

                  var comps = Ice.generaComponentes({
                      pantalla: 'BLOQUE_PERSONAS',
                      seccion: 'FORMULARIO',
                      modulo: config.modulo || '',
                      estatus: (config.flujo && config.flujo.estatus) || '',
                      cdramo: config.cdramo || '',
                      cdtipsit: config.cdtipsit ||'',
                      auxKey: config.auxkey || '',
                      items: true
                  });
                    
                  Ice.log('Ice.view.bloque.personas.ListaPersonas.initComponent comps:', comps);
                  Ice.log('items',comps.BLOQUE_PERSONAS.FORMULARIO.items);
                    
                  var modelName = Ext.id();  
                    
                  config.buttons = [
                      {
                          xtype: 'button',
                          reference: 'btnGuardar',
                          text: 'Guardar',
                          handler: 'onGuardar',
                      },{
                          xtype: 'button',
                          text: 'Nuevo',
                          handler: function (me){
                              var paso = '';
                              try{
                                  paso = 'Antes de ocultar formulario de situacion';
                                  me.up('form').close();
                              } catch (e){
                                  Ice.generaExcepcion(e, paso);
                              }
                          }
                      }
                  ];
                  
                  config.items = [
                      {
                          xtype: 'cdpersoncdrol',
                          reference: 'form',
                          height: 300,
                          cdramo: config.cdramo,
                      },{
                          xtype: 'domicilios',
                          reference: 'gridDomicilios',
                          height: 200,
                          selector: true,
                          scrollable: true,
                          items: {
                              xtype: 'toolbar',
                              docked: 'top',
                              items: [
                                  {
                                      xtype: 'button',
                                      reference: 'btnGuardar',
                                      text: 'Guardar',
                                      handler: 'onGuardar',
                                  },{
                                      xtype: 'button',
                                      text: 'Nuevo',
                                      handler: function (me){
                                          var paso = '';
                                          try{
                                              paso = 'Antes de ocultar formulario de situacion';
                                              me.up('form').close();
                                          } catch (e) {
                                              Ice.generaExcepcion(e, paso);
                                          }
                                      }
                                  },{
                                      xtype: 'button',
                                      text: 'Cerrar',
                                      handler: function(){
                                          Ice.pop();
                                      }
                                  }
                              ]
                          }
                      }
                  ];
	            } catch (e) {
	                Ice.generaExcepcion(e, paso);
	            }
	        me.callParent(arguments);
	    }
});