/**
 * Created by DEORTIZT on 5/22/2017.
 */
Ext.define('Ice.view.bloque.SituacionesRiesgoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bloquesituacionesriesgo',
    editando:false,
    
    init: function (view) {
        Ice.log('Ice.view.bloque.SituacionesRiesgoController.init view:', view);
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de bloque de datos generales';
        try {
            me.callParent(arguments);
            
            // esperamos a que se cree el viewmodel antes de invocar custom
            Ext.defer(function () {
                var paso2 = 'Definiendo comportamiento de bloque de situaciones de riesgo';
                try {
                    me.custom();
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 300);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    custom: function () {
        Ice.log('Ice.view.bloque.SituacionesRiesgoController.custom');
        var me = this,
            view = me.getView(),
            paso = 'Configurando comportamiento de bloque situaciones de riesgo';
            Ice.log('view: ',view);
        try {
            var refs = view.getReferences() || {},
                form = refs.form;
            if (!form) {
                throw 'No hay formulario de situaci\u00f3n';
            }

            var formRefs = form.getReferences(),
                cdtipsitCmp = formRefs.cdtipsit,
                storeCdtipsit = cdtipsitCmp.getStore();
            
            if (!cdtipsitCmp) {
                throw 'No hay campo de tipo de situaci\u00f3n';
            } 

            Ice.log('cdtipsitCmp ',cdtipsitCmp);
            //Ice.log('cdtipsitCmp',cdtipsitCmp.getStore().getData().length);
            if (Ext.manifest.toolkit !== 'classic' && cdtipsitCmp.isXType('selectfield')) { // para los select
                //Ice.log('cdtipsitCmp',cdtipsitCmp);
                cdtipsitCmp.on({
                    change: function(){
                        me.cargarValoresDefectoVariables();
                    }
                });
            } else {
                //Ice.log('cdtipsitCmp',cdtipsitCmp);
                cdtipsitCmp.on({
                    blur: function(){
                        me.cargarValoresDefectoVariables();
                    }
                });
            }

            refs.grid.getStore().load(function (r) {
            	if (r.length === 0) {
            		me.agregar();
            	}
            });

            /*storeCdtipsit.on({
                load: function(){
                    Ice.log('store cdtipsit data',storeCdtipsit.data);
                    if(storeCdtipsit.data.length == 1){
                        Ice.log('storeCdtipsit ',storeCdtipsit.getRange()[0].data.key);
                        cdtipsitCmp.hide();
                        cdtipsitCmp.setValue(storeCdtipsit.getRange()[0].data.key);
                        view.setCdtipsitUnico(true);
                    }
                }
            });*/

            if(view.getCdramo() == '301'){
                form.on({
                    afterlayout: function(){
                        try{
                            var b1b_otvalor15 = Ice.query('datosiniciales').refs.formdatosgenerales.getValues().b1b_otvalor15;
                            var refsFormSit = refs.form.refs;
                            if(b1b_otvalor15 == '3'){
                                refsFormSit.b5b_otvalor05.show();
                                refsFormSit.b5b_otvalor06.show();
                                refsFormSit.b5b_otvalor23.show();
                            } else {
                                refsFormSit.b5b_otvalor05.hide();
                                refsFormSit.b5b_otvalor06.hide();
                                refsFormSit.b5b_otvalor23.hide();
                                refsFormSit.b5b_otvalor05.setValue();
                                refsFormSit.b5b_otvalor06.setValue();
                                refsFormSit.b5b_otvalor23.setValue();
                            }
                        } catch(e) {
                            Ice.log('No se pudo ocultar los campos origen, destino ',e);
                        }
                    }
                });
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },

    onAgregarClic: function () {
        this.agregar();
    },

    onBorrarClic: function (grid, rowIndex, colIndex) {
        this.borrar(grid, rowIndex, colIndex);
    },

    onGuardarBloque: function () {
        this.guardarBloque();
    },

    onActualizar: function (grid, rowIndex, colIndex) {
        this.actualizar(grid, rowIndex, colIndex);
    },

    onCancelar: function () {
        this.cancelar();
    },

    onCopiarSituacion: function(grid, rowIndex, colIndex){
        this.copiarSituacion(grid, rowIndex, colIndex);
    },

    agregar: function () {
        Ice.log('Ice.view.bloque.situacionesRiesgo.agregar');
        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            paso = "";
        try {
            me.editando=false;
            Ice.log('View items ',view.down('grid'));
            var paso = "Antes de agregar situacion de riesgo",
                grid = refs.grid,
                store = grid.getStore(),
                form = refs.form,
                formRefs = form.getReferences();
            me.limpiarForm(form);
            view.setDatosVariablesNuevos(true);
            Ice.request({
                mascara: 'Agregando situacion de riesgo',
                url: Ice.url.bloque.situacionesRiesgo.valoresDefectoFijos,
                params: {
                    'params.cdunieco' : view.getCdunieco(),
                    'params.cdramo': view.getCdramo(),
                    'params.estado': view.getEstado(),
                    'params.nmpoliza': view.getNmpoliza(),
                    'params.nmsuplem': view.getNmsuplem()
                },
                success: function (json) {
                    var paso2 = 'LLenando store';
                    try {
                        Ice.log("situacion__+",json.situacion); 
                        if (json.situacion) {
                            /*
                            var refs = view.getReferences();
                            Ice.suspendEvents(view);
                            for (var att in json.situacion) {
                                if (refs[att]) {
                                    refs[att].setValue(json.situacion[att]);
                                }
                            }
                            Ice.resumeEvents(view);
                            */
                            Ice.cargarFormulario(refs.form, json.situacion);
                        }
                        form.show();
                        Ice.log('form',form);
                        store.load();
                        formRefs.cdtipsit.getStore().load(function (r) {
                            if (r.length === 1 && json.situacion) {
                                if (!formRefs.nmsituac && !formRefs.nmsituac.getValue()) {
                                    formRefs.nmsituac.setValue(json.situacion.nmsituac);
                                }
                                //alert(Ext.ComponentQuery.query("[name=nmsituac]")[0].getValue());
                                formRefs.cdtipsit.setValue(r[0]);
                                formRefs.cdtipsit.fireEvent('blur', formRefs.cdtipsit);
                                formRefs.cdtipsit.hide();
                            }
                        });
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
  
  actualizar: function(grid, rowIndex, colIndex){
      Ice.log('Ice.view.bloque.situacionesRiesgo.actualizar grid',grid,' rowIndex ',rowIndex,' colIndex ',colIndex);
      var me = this,
          view = me.getView(),
          refs = view.getReferences(),
          formRefs = refs.form.getReferences(),
          paso = "";
      try{
    	  me.editando=true;
          Ice.log('View items ',refs.grid.getStore());
          paso = "Antes de editar situacion de riesgo";
          var store = refs.grid.getStore(),
              form = refs.form,
              data;
          if(Ext.manifest.toolkit === 'classic'){
              data = store.getAt(rowIndex).getData();              
          } else {
              var cell = grid.getParent(),
                  record = cell.getRecord(),
                  data = record.getData();
          }
          
          Ice.log('Data ',data);
          Ice.request({
              mascara: 'Editando situacion de riesgo',
              url: Ice.url.bloque.situacionesRiesgo.obtener,
              params: {
                  'params.cdunieco': data.cdunieco,
                  'params.cdramo': data.cdramo,
                  'params.estado': data.estado,
                  'params.nmpoliza': data.nmpoliza,
                  'params.nmsituac': data.nmsituac,
                  'params.cdtipsit': data.cdtipsit,
                  'params.nmsuplem': data.nmsuplem
              },
              success: function (json) {
                  var paso2 = 'LLenando store';
                  try {
                      Ice.log('json editando:::',json);
                      if(json.situacion){
                          var situacion = json.situacion;
                          
                          me.limpiarForm(form);
                          view.setDatosVariablesNuevos(false);

                          Ice.log("situacion",situacion);
//                          store.add(json.situacion);
                          /*
                          Ice.suspendEvents(view);
                          for (var att in situacion) {
                        	  Ice.log("attr:",att)
                              if (refs[att]) {
                                  refs[att].setValue(situacion[att]);
                              }
                          }
                         // refs['cdtipsit'].setValue(data.cdtipsit);
                          formRefs.cdtipsit.setValue(data.cdtipsit);
                          
                          Ice.log("--->",refs['cdtipsit']);
                          Ice.resumeEvents(view);
                          */
                          Ice.cargarFormulario(form, situacion);
                      }
                      Ice.log('form',form);
                      form.show();
                  } catch (e) {
                      Ice.manejaExcepcion(e, paso2);
                  }
              }
          });
      } catch (e) {
          Ice.manejaExcepcion(e, paso);
      }
  },
  
  borrar: function(grid, rowIndex, colIndex){
      Ice.log('Ice.view.bloque.SituacionesRiesgoController.borrar  grid: ', grid, ' rowindex: ', rowIndex, ' colindex: ', colIndex);
      var me = this,
          view = me.getView(),
          refs = view.getReferences(),
          paso = "";
      try{
          paso = "Antes de borrar situación de riesgo";
          var store = refs.grid.getStore(),
              form = refs.form,
              data;
          if(Ext.manifest.toolkit === 'classic'){
              data = store.getAt(rowIndex).getData();              
          } else {
              var cell = grid.getParent(),
                  record = cell.getRecord(),
                  data = record.getData();
          }            
          Ice.log('situacion: ',data);
          Ice.request({
              mascara: 'Borrando situación de riesgo',
              url: Ice.url.bloque.situacionesRiesgo.borrar,
              params: {
                  'params.cdunieco': data.cdunieco,
                  'params.cdramo': data.cdramo,
                  'params.estado': data.estado,
                  'params.nmpoliza': data.nmpoliza,
                  'params.nmsituac': data.nmsituac,
                  'params.nmsuplem': data.nmsuplem
              },
              success: function (json) {
                  var paso2 = 'Antes de recargar store';
                  try {
                      store.reload();
                  } catch (e) {
                      Ice.manejaExcepcion(e, paso2);
                  }
              }
          });
      } catch (e) {
          Ice.manejaExcepcion(e, paso);
      }
  },

    cargarValoresDefectoVariables: function () {
        Ice.log('Ice.view.bloque.SituacionesRiesgoController.cargarValoresDefectoVariables');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Cargando valores por defecto variables de situaciones de riesgo';
        Ice.log('refs', refs);
        try {
            if (view.getDatosVariablesNuevos() !== true) {
                Ice.logWarn('Ice.view.bloque.SituacionesRiesgoController.cargarValoresDefectoVariables los datos variables no son nuevos');
                return;
            }
            
            if (refs.form) {
                var form = refs.form;
                var errores = Ice.obtenerErrores(form);
                if (errores.cdtipsit) {
                    Ice.logWarn('Ice.view.bloque.SituacionesRiesgoController.cargarValoresDefectoVariables falta cdtipsit');
                }
                Ice.log('Ice.view.bloque.SituacionesRiesgoController.cargarValoresDefectoVariables valores cargados ok');
                var valores = Ice.convertirAParams(Ice.utils.mergeObjects(form.getValues(), {
                    cdunieco: view.getCdunieco(),
                    cdramo: view.getCdramo(),
                    estado: view.getEstado(),
                    nmpoliza: view.getNmpoliza(),
                    nmsuplem: view.getNmsuplem()
                }));
                Ice.log('valores ',valores);
                Ice.request({
                    mascara: 'Cargando valores por defecto',
                    url: Ice.url.bloque.situacionesRiesgo.valoresDefectoVariables,
                    params: valores,
                    success: function (action) {
                        var paso2 = 'Seteando valores por defecto';
                        try {
                            view.setDatosVariablesNuevos(false);
                            view.setProcesandoValoresDefecto(false);
                            if (!action.situacion) {
                                return;
                            }

                            Ice.cargarFormulario(refs.form, action.situacion, {
                                sinReset: true
                            });
                            
                            /*Ice.suspendEvents(view);
                            for (var att in action.situacion) {
                                if (refs[att] && !refs[att].getValue()) {
                                    refs[att].setValue(action.situacion[att]);
                                }
                            }
                            Ice.resumeEvents(view);*/
                        } catch (e) {
                        	view.setProcesandoValoresDefecto(false);
                            Ice.manejaExcepcion(e, paso2);
                        }
                    },
                    failure: function () {
                    	view.setProcesandoValoresDefecto(false);
                    }
                });
            } else {
                Ice.mensajeWarning('Error al setear valores del formulario', refs);
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    guardarBloque: function () {
        Ice.log('Ice.view.bloque.SituacionesRiesgoController.guardarBloque');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Antes de guardar valores situación';
        view.setProcesandoValoresDefecto(false);
        //view.setDatosFijosNuevos = false;
        try {
            paso = 'Guardando datos de situación';
            var form = refs.form,
                values = Ice.utils.mergeObjects(form.getValues(), {
                    cdunieco: view.getCdunieco(),
                    cdramo: view.getCdramo(),
                    estado: view.getEstado(),
                    nmpoliza: view.getNmpoliza(),
                    nmsuplem: view.getNmsuplem()
                }),
                formRefs = form.getReferences();
            if (form) {
                Ice.validarFormulario(form);
                for (var i = 1; i <= 120; i++) {
                    var numVal = (('x000' + i).slice(Number(i) > 99 ? -3 : -2)),
                        llave = 'otvalor' + numVal;
                    if (formRefs['b5b_otvalor' + numVal]) {
                        values[llave] = values['b5b_' + llave];
                    }
                    Ice.log('values:', values);
                }
                Ice.request({
                    mascara: paso,
                    url: Ice.url.bloque.situacionesRiesgo.actualizar,
                    jsonData: {
                        params: values
                    },
                    success: function (action) {
                        var paso2 = 'Seteando valores por defecto';
                        try {
                            if (action.validaciones && action.validaciones.length > 0) {
                                Ext.create('Ice.view.bloque.VentanaValidaciones', {
                                    lista: action.validaciones
                                }).mostrar();
                                
                                var error = false;
                                for (var i = 0; i < action.validaciones.length; i++) {
                                    if (action.validaciones[i].tipo.toLowerCase() === 'error') {
                                        error = true; // para que no avance si hay validaciones tipo "error"
                                        break;
                                    }
                                }
                                if (error === true) {
                                    throw 'Favor de revisar las validaciones';
                                }
                            }
                            if (action.success) {
                                Ice.mensajeCorrecto('Datos guardados');
                                form.hide();
                                refs.grid.getStore().reload();
                                me.limpiarForm(form);
                                Ice.log('proceso exitoso');
                            }
                        } catch (e) {
                            Ice.manejaExcepcion(e, paso2);
                            Ice.resumeEvents(view);
                        }
                    },
                    failure: function () {
                        view.setProcesandoValoresDefecto(false);
                    }
                });
            } else {
                Ice.mensajeWarning('Error al setear valores del formulario', refs);
            }
            // store.reload();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.SituacionesRiesgoController.guardarBloque ok');
    },

    guardar: function (params) {
        Ice.log('Ice.view.bloque.SituacionesRiesgoController.guardar');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Antes de validar valores situación';
        Ice.log('Ice.view.bloque.SituacionesRiesgoController.guardar view', view);
        view.setProcesandoValoresDefecto(false);
        //view.setDatosFijosNuevos(false);
        try {
            var form = refs.form;
            if (form.isHidden() !== true) {
                Ice.validarFormulario(form);
                me.guardarBloque();
            }
            Ice.request({
                mascara: 'Antes de lanzar validaciones de bloque de situación',
                url: Ice.url.bloque.situacionesRiesgo.validaciones,
                params: {
                    'params.cdunieco' : view.getCdunieco(),
                    'params.cdramo' : view.getCdramo(),
                    'params.estado' : view.getEstado(),
                    'params.nmpoliza' : view.getNmpoliza(),
                    'params.nmsuplem' : view.getNmsuplem()
                },
                success: function (action) {
                    var paso2 = 'Lanzando validaciones de bloque de situacion';
                    try {
                        if (action.validaciones && action.validaciones.length > 0) {
                            Ext.create('Ice.view.bloque.VentanaValidaciones', {
                                lista: action.validaciones
                            }).mostrar();

                            var error = false;
                            for (var i = 0; i < action.validaciones.length; i++) {
                                if (action.validaciones[i].tipo.toLowerCase() === 'error') {
                                    error = true; // para que no avance si hay validaciones tipo "error"
                                    break;
                                }
                            }
                            if (error === true) {
                                throw 'Favor de revisar las validaciones';
                            }
                        }
                        
                        if (params && params.success) {
                            paso2 = 'Ejecutando proceso posterior a situaciones';
                            params.success();
                        }
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                        if (params && params.failure) {
                            var paso4 = 'Ejecutando failure posterior a situaciones';
                            try {
                                params.failure();
                            } catch (e) {
                                Ice.manejaExcepcion(e, paso4);
                            }
                        }
                    }
                },
                failure: (params && params.failure) || null
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
            if (params && params.failure) {
                var paso3 = 'Ejecutando failure posterior a situaciones';
                try {
                    params.failure();
                } catch (e) {
                    Ice.manejaExcepcion(e, paso3);
                }
            }
        }   
        Ice.log('Ice.view.bloque.SituacionesRiesgoController.guardar ok');
    },
  
    cargar: function() {
        Ice.log('Ice.view.bloque.CoberturasController.cargarValoresDefectoVariables');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Cargando situaciones';
        try {
            refs.grid.getController().cargar();
        } catch(e) {
            Ice.generaExcepcion(e, paso);
        }
    },
  
  cancelar: function(){
      Ice.log('Ice.view.bloque.CoberturasController.cancelar');
      var me = this,
          view = me.getView(),
          refs = view.getReferences();
      try{
    	  var form = refs.form;
          var values = form.getValues();  
    	  var store = refs.grid.getStore();
    	  
    	  Ice.log("values...>",values);
    	  if(!me.editando){
	    	  Ice.request({
	              mascara: 'Borrando situación de riesgo',
	              url: Ice.url.bloque.situacionesRiesgo.borrar,
	              params: {
	                  'params.cdunieco': values.cdunieco,
	                  'params.cdramo': values.cdramo,
	                  'params.estado': values.estado,
	                  'params.nmpoliza': values.nmpoliza,
	                  'params.nmsituac': values.nmsituac,
	                  'params.nmsuplem': values.nmsuplem
	              },
	              success: function (json) {
	                  var paso2 = 'Antes de recargar store';
	                  try {
	                      store.reload();
	                  } catch (e) {
	                      Ice.manejaExcepcion(e, paso2);
	                  }
	              }
	          });
    	  }
    	  
    	  Ice.suspendEvents(view);
          me.limpiarForm(refs.form);
          Ice.resumeEvents(view);
          refs.form.hide();
      } catch(e) {
          Ice.generaExcepcion(e, paso);
      }
  },
  
  limpiarForm: function(form){
      Ice.log('Ice.view.bloque.CoberturasController.limpiarForm');
      var paso = 'Limpiando formulario de situaciones de riesgo';
      try{
          form.reset();
      } catch (e){
          Ice.generaExcepcion(e, paso);
      }
  },

  copiarSituacion: function(grid, rowIndex, colIndex){
      Ice.log('Ice.view.bloque.CoberturasController.copiarSituacion');
      var me = this,
          view = me.getView(),
          refs = view.getReferences(),
          paso = 'Copiando situacion de riesgo';
      try{
          var numbfield = {
              xtype: 'numberfieldice',
              label: 'Copias',
              minValue: 1,
              value: 1,              
              refs: 'nmcopias'
          };
          if(Ext.manifest.toolkit === 'classic'){
              data = grid.store.getAt(rowIndex).getData();
              numbfield['allowDecimals'] = false;
          } else {
              var cell = grid.getParent(),
                  record = cell.getRecord(),
                  data = record.getData();
              numbfield['decimals'] = 0;
          }

          if(data){
              var ventanaCopiar = Ext.create('Ice.view.componente.VentanaIce',{
                  platformConfig: {
                      desktop: {
                          width: 400,
                          style: 'padding:0px',
                          bodyStyle: 'padding:5px'
                      }
                  },
                  modal: true,
                  items: [numbfield],
                  buttons: [
                      {
                          text: 'Aceptar',
                          iconCls: 'x-fa fa-check',
                          handler: function(){
                              var nmcopias = this.up('ventanaice').down('numberfieldice').getValue();
                              var isDecimal = nmcopias % 1;
                              if(!isDecimal){
                                  Ice.request({
                                      mascara: 'Copiando situación de riesgo',
                                      url: Ice.url.bloque.situacionesRiesgo.copiaSituacion,
                                      params: {
                                          'params.cdunieco' : view.getCdunieco(),
                                          'params.cdramo': view.getCdramo(),
                                          'params.estado': view.getEstado(),
                                          'params.nmpoliza': view.getNmpoliza(),
                                          'params.nmsituac': data.nmsituac,
                                          'params.nmsuplem': view.getNmsuplem(),
                                          'params.nmcopias': nmcopias
                                      },
                                      success: function (json) {
                                          var paso2 = 'LLenando store';
                                          try {
                                              refs.grid.getStore().reload();
                                              Ice.mensajeCorrecto('Se copió correctamente situación de riesgo');
                                              ventanaCopiar.cerrar();
                                          } catch (e) {
                                              Ice.mensajeCorrecto('No se copió situación de riesgo');
                                              Ice.manejaExcepcion(e, paso2);
                                              ventanaCopiar.cerrar();
                                          }
                                      }
                                  });
                              } else {
                                  Ice.mensajeWarning('El campo no puede tener decimales');
                                  this.up('ventanaice').down('numberfieldice').setValue(0);
                              }
                          }
                      },{
                          text: 'Cancelar',
                          iconCls: 'x-fa fa-close',
                          ui:'gray',
                          handler: function(){
                              ventanaCopiar.cerrar();
                          }
                      }
                  ]
              });
              ventanaCopiar.mostrar();
          }
      } catch (e) {
          Ice.generaExcepcion(e, paso);
      }
  }
  
});