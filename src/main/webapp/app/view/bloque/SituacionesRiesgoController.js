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
                cdtipsitCmp = formRefs.cdtipsit;
            
            if (!cdtipsitCmp) {
                throw 'No hay campo de tipo de situaci\u00f3n';
            }

            if (Ext.manifest.toolkit !== 'classic' && cdtipsitCmp.isXType('selectfield')) { // para los select
                cdtipsitCmp.on({
                    change: function(){
                        me.cargarValoresDefectoVariables();
                    }
                });
            } else {
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
            })
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
                                if (!formRefs.nmsituac.getValue()) {
                                    formRefs.nmsituac.setValue(json.situacion.nmsituac);
                                }
                                //alert(Ext.ComponentQuery.query("[name=nmsituac]")[0].getValue());
                                formRefs.cdtipsit.setValue(r[0]);
                                formRefs.cdtipsit.fireEvent('blur', formRefs.cdtipsit);
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
          paso = "Antes de borrar situacion de riesgo";
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
              mascara: 'Borrando situacion de riesgo',
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
                var valores = {
                    'params.cdunieco': view.getCdunieco(),
                    'params.cdramo': view.getCdramo(),
                    'params.estado': view.getEstado(),
                    'params.nmpoliza': view.getNmpoliza(),
                    'params.nmsuplem': view.getNmsuplem(),
                    'params.nmsituac': form.getValues().nmsituac,
                    'params.cdtipsit': form.getValues().cdtipsit,
                    'params.status' : form.getValues().status, 
                    'params.cdtipsit' : form.getValues().cdtipsit,
                    'params.swreduci' : form.getValues().swreduci,
                    'params.cdagrupa' : form.getValues().cdagrupa,
                    'params.cdestado' : form.getValues().cdestado,
                    'params.fefecsit' : form.getValues().fefecsit,
                    'params.fecharef' : form.getValues().fecharef,
                    'params.indparbe' : form.getValues().indparbe,
                    'params.feinipbs' : form.getValues().feinipbs,
                    'params.porparbe' : form.getValues().porparbe,
                    'params.intfinan' : form.getValues().intfinan,
                    'params.cdmotanu' : form.getValues().cdmotanu,
                    'params.feinisus' : form.getValues().feinisus,
                    'params.fefinsus' : form.getValues().fefinsus
                };
                Ice.log('valores ',valores);
                Ice.request({
                    mascara: 'Cargando valores por defecto',
                    url: Ice.url.bloque.situacionesRiesgo.valoresDefectoVariables,
                    params: valores,
                    success: function (action) {
                        var paso2 = 'Seteando valores por defecto';
                        try {
                            view.setDatosVariablesNuevos(false);
                            view.procesandoValoresDefecto = false;
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
                            view.procesandoValoresDefecto = false;
                            Ice.manejaExcepcion(e, paso2);
                        }
                    },
                    failure: function () {
                        view.procesandoValoresDefecto = false;
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
            paso = 'Antes de guardar valores situacion';
        view.procesandoValoresDefecto = false;
        view.setDatosFijosNuevos = false;
        try {
            paso = 'Guardando datos de situacion';
            var form = refs.form,
                values = form.getValues(),
                situacion = {},
                formRefs = form.getReferences();
            if (form) {
                Ice.validarFormulario(form);
                for (var i = 1; i <= 120; i++) {
                    var numVal = (('x000' + i).slice(Number(i) > 99 ? -3 : -2)),
                        llave = 'otvalor' + numVal,
                        obj = {};
                    if (formRefs['b5b_otvalor' + numVal]) {
                        situacion[llave] = values['b5b_' + llave];
                    } else {
                        situacion[llave] = null;
                    }
                    Ice.log('obj', situacion);
                }
                Ice.request({
                    mascara: paso,
                    url: Ice.url.bloque.situacionesRiesgo.actualizar,
                    jsonData: {
                        params: values,
                        situacion : situacion
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
                                        //error = true; para que no avance si hay validaciones tipo "error"
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
                        view.procesandoValoresDefecto = false;
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
  
  guardar: function (params){
      Ice.log('Ice.view.bloque.SituacionesRiesgoController.guardar');
      var me = this,          
          view = me.getView(),
          refs = view.getReferences(),
          paso = 'Antes de validar valores situacion';
      Ice.log('Ice.view.bloque.SituacionesRiesgoController.guardar view', view);
      view.procesandoValoresDefecto = false;
      view.setDatosFijosNuevos = false;
      try{
          var form = refs.form;
          if (form.isHidden() !== true) {
              Ice.validarFormulario(form);
          }
          situacion = {};
          Ice.request({
              mascara: 'Antes de lanzar validaciones de bloque de situacion',
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
                                  //error = true; para que no avance si hay validaciones tipo "error"
                                  break;
                              }
                          }
                          if (error === true) {
                              throw 'Favor de revisar las validaciones';
                          }
                      
                      }
                      
                      if (params && params.success) {
                          paso2 = 'Ejecutando proceso posterior al guardado de datos generales';
                          params.success();
                      } else {
                          Ice.manejaExcepcion(e, paso2);
                          if (params && params.failure) {
                              var paso2 = 'Invocando callback failure al guardar datos situación';
                              try {
                                  params.failure();
                              } catch (e) {
                                  Ice.manejaExcepcion(e, paso2);
                              }
                          }
                      }
                      
                  } catch (e) {
                      Ice.resumeEvents(view);
                  }
              },
              failure: (params && params.failure) || null
          });
          Ice.log('situacion',situacion);
//          store.reload();
      } catch (e) {
    	  console.error(e);
          Ice.manejaExcepcion(e, paso);
          
      }   
      Ice.log('Ice.view.bloque.SituacionesRiesgoController.guardar ok');
  },
  
  cargar: function(){
      Ice.log('Ice.view.bloque.CoberturasController.cargarValoresDefectoVariables');
      var me = this,
          view = me.getView(),
          refs = view.getReferences();
      try{
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
	              mascara: 'Borrando situacion de riesgo',
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
      paso = 'Limpiando formulario de situaciones de riesgo';
      try{
          form.reset();
      } catch (e){
          Ice.generaExcepcion(e, paso);
      }
  }
  
});