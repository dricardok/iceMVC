/**
 * Created by DEORTIZT on 5/22/2017.
 */
Ext.define('Ice.view.bloque.SituacionesRiesgoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bloquesituacionesriesgo',
    
    init: function (view) {
        Ice.log('Ice.view.bloque.SituacionesRiesgoController.init view:', view);
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de bloque de datos generales';
        try {
            me.callParent(arguments);
            
            // esperamos a que se cree el viewmodel antes de invocar custom
            Ext.defer(function () {
                var paso2;
                try {
                    paso2 = 'Definiendo comportamiento de bloque de situaciones de riesgo';
                    me.custom();
                    
//                    if (view.cdunieco && view.cdramo && view.estado && view.nmpoliza
//                        && !Ext.isEmpty(view.nmsuplem) && view.modulo) {
//                        paso2 = 'Cargando bloque de situaciones de riesgo';
//                        me.cargar();
//                    }
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 200);
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
            var refs = view.getReferences() || {};
            Ice.log('Ice.view.bloque.DatosGeneralesController refs:', refs);
            
         // agregar disparadores valores defecto variables
            for (var i = 0; i < view.getCamposDisparanValoresDefectoVariables().length; i++) {
                var name = view.getCamposDisparanValoresDefectoVariables()[i];
                if (refs[name]) {
                    if (Ext.manifest.toolkit === 'classic') {
                        refs[name].setFieldStyle('border-left: 1px solid yellow;');
                    } else {
                        refs[name].setStyle('border-left: 1px solid yellow;');
                    }
                    
                    if (Ext.manifest.toolkit !== 'classic' && refs[name].isXType('selectfield')) { // para los select
                        refs[name].on({
                            change: function () {
                                me.cargarValoresDefectoVariables();
                            }
                        });
                    } else {
                        refs[name].on({
                            blur: function (ref) {
                                me.cargarValoresDefectoVariables(ref);
                            }
                        });
                    }
                }
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
  
  onCancelar: function(){
      this.cancelar();  
  },
  
  agregar: function(){
      Ice.log('Ice.view.bloque.situacionesRiesgo.agregar');
      var me = this,
          view = me.getView(),
          refs = me.getReferences(),
          paso = "";
      try{
          Ice.log('View items ',view.down('grid'));
          paso = "Antes de agregar situacion de riesgo";
          var store = view.down('grid').getStore(),
              form = refs.form;
          me.limpiarForm(form);
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
                      Ice.log("situacion",json.situacion);                        
                      if(json.situacion){
//                          store.add(json.situacion);
                          var refs = view.getReferences();
                          Ice.suspendEvents(view);
                          for (var att in json.situacion) {
                              if (refs[att]) {
                                  refs[att].setValue(json.situacion[att]);
                              }
                          }
                          Ice.resumeEvents(view);
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
  
  actualizar: function(grid, rowIndex, colIndex){
      Ice.log('Ice.view.bloque.situacionesRiesgo.actualizar grid',grid,' rowIndex ',rowIndex,' colIndex ',colIndex);
      var me = this,
          view = me.getView(),
          refs = view.getReferences(),
          paso = "";
      try{
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
                      Ice.log('json',json);
                      if(json.situacion){
                          var situacion = json.situacion; 
                          Ice.log("situacion",situacion);
//                          store.add(json.situacion);
                          Ice.suspendEvents(view);
                          for (var att in situacion) {
                              if (refs[att]) {
                                  refs[att].setValue(situacion[att]);
                              }
                          }
                          Ice.resumeEvents(view);
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
          Ice.log('refs',refs);
      try {
          if (view.getDatosVariablesNuevos() !== true) {
              Ice.logWarn('Ice.view.bloque.SituacionesRiesgoController.cargarValoresDefectoVariables los datos variables no son nuevos');
              return;
          }          
          
          if(refs.form){
              var form = refs.form;
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
                          
                          Ice.suspendEvents(view);
                          for (var att in action.situacion) {
                              if (refs[att] && !refs[att].getValue()) {
                                  refs[att].setValue(action.situacion[att]);
                              }
                          }
                          Ice.resumeEvents(view);
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
  
  guardarBloque: function (){
      Ice.log('Ice.view.bloque.SituacionesRiesgoController.guardarBloque');
      var me = this,          
          view = me.getView(),
          refs = view.getReferences(),
          paso = 'Antes de guardar valores situacion';          
      view.procesandoValoresDefecto = false;
      view.setDatosFijosNuevos = false;
      try{
          me.validarDatos();
          
          paso = 'Guardando datos de situacion';
          Ice.log('Ice.view.bloque.SituacionesRiesgoController.guardarBloque guardando datos');
          if(refs.form){
              var form = refs.form;
              form.hide();
              values = form.getValues();          
              situacion = {};
              for(var i = 1; i <= 120; i++){
                  var numVal = (('x000' + i).slice(Number(i) > 99 ? -3 : -2));
                  var llave = 'otvalor'+ numVal;
                  var obj = {};
                  if(refs['b5b_otvalor'+ numVal]){
                      situacion[llave] = values['b5b_'+llave];
                  } else {
                      situacion[llave] = null;
                  }
                  Ice.log('obj',situacion);
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
                          if(action.success){
                              Ice.mensajeCorrecto('Datos guardados');
                              refs.grid.getStore().reload();
                              me.limpiarForm(refs.form);
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
              Ice.log('situacion',situacion);
          } else {
              Ice.mensajeWarning('Error al setear valores del formulario', refs);
          }
//          store.reload();
      } catch (e) {
          Ice.manejaExcepcion(e, paso);
      }   
      Ice.log('Ice.view.bloque.SituacionesRiesgoController.guardarBloque ok');
  },
  
  obtenerErrores: function () {
      Ice.log('Ice.view.bloque.SituacionesRiesgoController.obtenerErrores');
      var me = this,
          view = me.getView(),
          refs = view.getReferences(),
          paso = 'Recuperando errores de formulario',
          errores = {};
      try {
          // validar con un modelo dinamico
          // sin usar el data binding
          paso = 'Construyendo modelo de validaci\u00f3n';
          var validators = {}, ref;
          var formRefs = refs.form.getReferences();
          Ice.log('Ice.view.bloque.SituacionesRiesgoController.obtenerErrores refs',refs);
          Ice.log('Ice.view.bloque.SituacionesRiesgoController.obtenerErrores formRefs',formRefs);
          Ice.log('Ice.view.bloque.SituacionesRiesgoController.obtenerErrores validators',view.getModelValidators());
          for (var att in refs) {
              ref = refs[att];
              if (ref.isHidden() !== true && view.getModelValidators()[ref.name]) { // solo para no ocultos
                  Ice.log('Ice.view.bloque.SituacionesRiesgoController.obtenerErrores ref name ', ref.name);
                  validators[ref.name] = view.getModelValidators()[ref.name];
              }
          }
          Ice.log('Ice.view.bloque.SituacionesRiesgoController.obtenerErrores validators:', validators);
          
          var modelName = Ext.id();
          Ext.define(modelName, {
              extend: 'Ext.data.Model',
              fields: view.getModelFields(),
              validators: validators
          });
          
          paso = 'Validando datos';
          errores = Ext.create(modelName, refs.form.getValues()).getValidation().getData();
      } catch (e) {
          Ice.generaExcepcion(e, paso);
      }
      return errores;
  },
  
  validarDatos: function () {
      Ice.log('Ice.view.bloque.SituacionesRiesgo.validarDatos');
      var me = this,
          view = me.getView(),
          refs = view.getReferences(),
          paso = 'Validando datos de situación';
      try {
          var errores = me.obtenerErrores();
          Ice.log('Ice.view.bloque.SituacionesRiesgo.validarDatos errores ',errores);
          var sinErrores = true,
              erroresString = '';
          Ext.suspendLayouts();
          for (var name in errores) {
              if (errores[name] !== true) {
                  sinErrores = false;
                  var ref = view.down('[name=' + name + ']');
                  if (Ext.manifest.toolkit === 'classic') {
                      ref.setActiveError(errores[name]);
                  } else {
                      erroresString = erroresString + ref.getLabel() + ': ' + errores[name] + '<br/>';
                  }
              }
          }
          Ext.resumeLayouts();
          
          if (sinErrores !== true) {
              if (Ext.manifest.toolkit === 'classic') {
                  throw 'Favor de revisar los datos';
              } else {
                  throw erroresString;
              }
          }
      } catch (e) {
          Ice.generaExcepcion(e, paso);
      }
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
//          me.validarDatos();
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
          me.limpiarForm(refs.form);
          refs.form.hide();
      } catch(e) {
          Ice.generaExcepcion(e, paso);
      }
  },
  
  limpiarForm: function(form){
      Ice.log('Ice.view.bloque.CoberturasController.limpiarForm');
      paso = 'Limpiando formulario de situaciones de riesgo';
      try{
          Ice.query('[getName]', form).forEach(function(it){
              it.setValue(null);
          });
      } catch (e){
          Ice.generaExcepcion(e, paso);
      }
  }
  
});