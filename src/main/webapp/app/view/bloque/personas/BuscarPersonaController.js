Ext.define('Ice.view.bloque.personas.BuscarPersonaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.buscarpersona',
    
    init: function(view){
        Ice.log('Ice.view.bloque.BuscarPersonaController.init',view);
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
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 200);
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.BuscarPersonaController.init');
    },
    
    custom: function(){
        Ice.log('Ice.view.bloque.BuscarPersonaController.custom');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
        paso = 'Configurando comportamiento de bloque lista de situaciones';
        try{
            var form = refs.form;
            Ice.log('Ice.view.bloque.BuscarPersonaController.custom form',refs);
            refs.dsatribu.on({
                blur: function(){
                    if(refs.dsatribu){
                        Ice.log('dsatribu',refs.dsatribu);
                        if(refs.dsatribu.value === 'POLIZA'){
                            refs.otvalor.hide();
                            refs.cdunieco.show();
                            refs.cdramo.show();
                            refs.nmpoliza.show();
                            if(view.getCdunieco()){
                                Ice.log('refs.cdunieco',refs.cdunieco);
                                refs.cdunieco.setValue(view.getCdunieco());
//                                refs.cdunieco.setReadOnly(true);
                            }
                            
                            if(view.getCdramo()){
                                Ice.log('refs.cdramo',refs.cdramo);
                                refs.cdramo.setValue(view.getCdramo());
//                                refs.cdramo.setReadOnly(true);
                            }
                            
                            if(view.getNmpoliza()){
                                Ice.log('refs.nmpoliza',refs.nmpoliza);
                                refs.nmpoliza.setValue(view.getNmpoliza());
//                                refs.nmpoliza.setReadOnly(true);                            
                            }                            
                        } else {
                            refs.otvalor.show();
                            refs.cdunieco.hide();
                            refs.cdramo.hide();
                            refs.nmpoliza.hide();
                        }
                    }
                }
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.BuscarPersonaController.custom');
    },
    
    onGuardar: function(){
        this.guardar();
    },
    
    onBuscar: function(){
        this.buscar();
    },
    
    guardar: function(){
        Ice.log('Ice.view.bloque.BuscarPersonaController.guardar');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Guardando persona';
        try{
            
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.BuscarPersonaController.guardar');
    },
    
    buscar: function(){
        Ice.log('Ice.view.bloque.BuscarPersonaController.buscar');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Buscando persona';
        try{
            if(this.validaBusqueda(refs) == true){
                Ice.log('refs validado',refs);
                Ice.log('refs cdunieco',refs.cdunieco.value);
                Ice.log('refs cdramo',refs.cdramo.value);
                Ice.log('refs nmpoliza',refs.nmpoliza.value);
                Ice.log('refs otvalor',refs.otvalor.value);
                var store = refs.gridPersonas.getStore();
                store.removeAll();
                var mask = Ice.mask('Cargando informacion de usuarios');
                store.load({
                    params: {
                        'params.cdunieco': refs.cdunieco.value,
                        'params.cdramo': refs.cdramo.value,
                        'params.estado': 'W',
                        'params.nmpoliza': refs.nmpoliza.value,
                        'params.cdatribu': refs.dsatribu.value,
                        'params.otvalor': refs.otvalor.value
                    },
                    callback: function() {
                        mask.close();
                    }
                });
                refs.gridPersonas.show();
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.BuscarPersonaController.buscar');
    },
    
    validaBusqueda: function(refs){
        Ice.log('Ice.view.bloque.BuscarPersonaController.validaBusqueda',refs);
        var valid = true;
        if(refs.dsatribu.isValid()){            
            if(refs.dsatribu.value === 'POLIZA'){
                if(!refs.cdunieco.value || !refs.cdramo.value || !refs.nmpoliza.value){
                    valid = false;
                    Ice.mensajeWarning('Seleccione un oficina, producto y poliza');
                }
            } else {
                if(!refs.otvalor.value){
                    valid = false;
                    Ice.mensajeWarning('Seleccione valor');
                }
            }
        } else {
            valid = false;
            Ice.mensajeWarning('Seleccione un criterio');
        }
        
        Ice.log('Ice.view.bloque.BuscarPersonaController.validaBusqueda');
        return valid;
    }
});