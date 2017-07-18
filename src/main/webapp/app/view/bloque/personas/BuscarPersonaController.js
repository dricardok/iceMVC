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
            }, 600);
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
            // var form = refs.form;
            Ice.log('Ice.view.bloque.BuscarPersonaController.custom form',refs);
            refs.formBusquedaPersonas.getReferences().dsatribu.on({
                blur: function(){
                    if(refs.formBusquedaPersonas.getReferences().dsatribu){
                        Ice.log('dsatribu',refs.dsatribu);
                        if(refs.formBusquedaPersonas.getReferences().dsatribu.getValue() === 'POLIZA'){
                            refs.formBusquedaPersonas.getReferences().otvalor.hide();
                            refs.formBusquedaPersonas.getReferences().cdunieco.show();
                            refs.formBusquedaPersonas.getReferences().cdramo.show();
                            refs.formBusquedaPersonas.getReferences().nmpoliza.show();
                            if(view.getCdunieco()){
                                Ice.log('refs.cdunieco',refs.formBusquedaPersonas.getReferences().cdunieco);
                                refs.formBusquedaPersonas.getReferences().cdunieco.setValue(view.getCdunieco());
//                                refs.cdunieco.setReadOnly(true);
                            }
                            
                            if(view.getCdramo()){
                                Ice.log('refs.cdramo',refs.formBusquedaPersonas.getReferences().cdramo);
                                refs.formBusquedaPersonas.getReferences().cdramo.setValue(view.getCdramo());
//                                refs.cdramo.setReadOnly(true);
                            }
                            
                            if(view.getNmpoliza()){
                                Ice.log('refs.nmpoliza',refs.formBusquedaPersonas.getReferences().nmpoliza);
                                refs.formBusquedaPersonas.getReferences().nmpoliza.setValue(view.getNmpoliza());
//                                refs.nmpoliza.setReadOnly(true);                            
                            }                            
                        } else {
                            refs.formBusquedaPersonas.getReferences().otvalor.show();
                            refs.formBusquedaPersonas.getReferences().cdunieco.hide();
                            refs.formBusquedaPersonas.getReferences().cdramo.hide();
                            refs.formBusquedaPersonas.getReferences().nmpoliza.hide();
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
    
    onNuevo: function(){
        this.nuevo();
    },
    
    guardar: function(){
        Ice.log('Ice.view.bloque.BuscarPersonaController.guardar');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Guardando persona';
        try{
            Ice.log('Mainview.refs',refs);
            Ice.log('gridPersonas selection',refs.gridPersonas.getSelection());

            if (!refs.gridPersonas.getSelection()) {
                throw 'Favor de seleccionar una persona';
            }

            if (Ext.manifest.toolkit === 'classic' && refs.gridPersonas.getSelection().length === 0) {
                throw 'Favor de seleccionar una persona';
            }

            var selection = refs.gridPersonas.getSelection(),
                data;

            Ice.log('selection',selection);
            if(Ext.manifest.toolkit === 'classic'){
                if(selection[0].getData()){
                    data = selection[0].data;
                } else {
                    Ice.mensajeWarning('Seleccione un registro');
                }
            } else {
                if(selection.getData()){
                    data = selection.getData();
                } else {
                    Ice.mensajeWarning('Seleccione un registro');
                }
            }
            
            if(data){
                Ice.log('data ',data);
                view.fireEvent('obtenerCdperson', view, data.cdperson);
                Ice.pop();
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
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
                Ice.log('refs cdunieco',refs.formBusquedaPersonas.getReferences().cdunieco.getValue());
                Ice.log('refs cdramo',refs.formBusquedaPersonas.getReferences().cdramo.getValue());
                Ice.log('refs nmpoliza',refs.formBusquedaPersonas.getReferences().nmpoliza.getValue());
                Ice.log('refs otvalor',refs.formBusquedaPersonas.getReferences().otvalor.getValue());
                var store = refs.gridPersonas.getStore();
                store.removeAll();
                var mask = Ice.mask('Cargando informacion de usuarios');
                store.load({
                    params: {
                        'params.cdunieco': refs.formBusquedaPersonas.getReferences().cdunieco.getValue(),
                        'params.cdramo': refs.formBusquedaPersonas.getReferences().cdramo.getValue(),
                        'params.estado': 'W',
                        'params.nmpoliza': refs.formBusquedaPersonas.getReferences().nmpoliza.getValue(),
                        'params.cdatribu': refs.formBusquedaPersonas.getReferences().dsatribu.getValue(),
                        'params.otvalor': refs.formBusquedaPersonas.getReferences().otvalor.getValue()
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
    
    nuevo: function(){
        Ice.log('Ice.view.bloque.BuscarPersonaController.nuevo');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Nueva persona';
        try{
            Ice.log('nuevo refs',refs);
            var persona = Ext.create('Ice.view.bloque.personas.Persona',{
                reference: 'persona',
                listeners: {
                    'personaGuardada': function(personaView, cdperson){
                        Ice.log('personaGuardado.view',view);
                        Ice.query('[name=dsatribu]', view.getReferences().formBusquedaPersonas).setValue('CDPERSON');
                        Ice.query('[name=otvalor]', view.getReferences().formBusquedaPersonas).setValue(cdperson);
                        Ice.pop();
                    }
                }
            });            
            Ice.push(persona);
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.BuscarPersonaController.nuevo');
    },
    
    validaBusqueda: function(refs){
        Ice.log('Ice.view.bloque.BuscarPersonaController.validaBusqueda',refs);
        var valid = true;
        if(refs.formBusquedaPersonas.getReferences().dsatribu){
            if(refs.formBusquedaPersonas.getReferences().dsatribu.getValue() === 'POLIZA'){
                if(!refs.formBusquedaPersonas.getReferences().cdunieco.getValue()
                    || !refs.formBusquedaPersonas.getReferences().cdramo.getValue()
                    || !refs.formBusquedaPersonas.getReferences().nmpoliza.getValue()){
                    valid = false;
                    Ice.mensajeWarning('Seleccione un oficina, producto y poliza');
                }
            } else {
                if(!refs.formBusquedaPersonas.getReferences().otvalor.getValue()){
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
    
    // navigate: function(panel, direction, nuevoPanel){
    //     Ice.log('Ice.view.bloque.personas.PersonasPolizaNavigationController.navigate ',panel,' ',direction);
    //     var me = this,
    //         view = me.getView(),
    //         paso = 'Configurando navegacion de personas';
    //     try{
    //         var layout = panel.getLayout();
    //         Ice.log('Layout',layout);
    //         if(nuevoPanel){
    //             panel.add(nuevoPanel);                
    //         }
    //         layout[direction]();
    //         Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
    //         Ext.getCmp('move-next').setDisabled(!layout.getNext());            
    //     } catch (e) {
    //         Ice.generaExcepcion(e, paso);
    //     }
    // }
});