Ext.define('Ice.view.bloque.personas.PersonaPolizaController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.personapoliza',
    init: function (view) {
        Ice.log('Ice.view.bloque.personas.PersonasPolizaController.init view:', view);
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de lista de personas';
        try {
            me.callParent(arguments);
            
            // esperamos a que se cree el viewmodel antes de invocar custom
            Ext.defer(function () {
                var paso2;
                try {
                    paso2 = 'Definiendo comportamiento de lista de personas';
                    me.custom();
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 200);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    custom: function () {
        Ice.log('Ice.view.bloque.personas.PersonasPolizaController.custom',view);
        var me = this,
            view = me.getView(),
            paso = 'Configurando comportamiento de lista de personas';
            Ice.log('view: ',view);
        try {
            var refs = view.getReferences() || {};
            Ice.log('Ice.view.bloque.personas.PersonasPolizaController.custom refs:', refs);
//            var cdrol = refs.cdrol;
            var cdatribu = refs.dsatribu;
            var otvalor = refs.otvalor;
                        
            refs.cdrol.on({
                blur: function(){
                    Ice.log('cdrol',refs.cdrol);
                }
            });
            
            cdatribu.on({
                blur: function(){
                    if(cdatribu.getValue()){
                        otvalor.getStore().getProxy().setTimeout(60000);
                        otvalor.getStore().getProxy().extraParams['params.cdunieco'] = view.getCdunieco();
                        otvalor.getStore().getProxy().extraParams['params.cdramo'] = view.getCdramo();
                        otvalor.getStore().getProxy().extraParams['params.estado'] = view.getEstado();
                        otvalor.getStore().getProxy().extraParams['params.nmpoliza'] = view.getNmpoliza();
                        otvalor.getStore().getProxy().extraParams['params.nmsuplem'] = view.getNmsuplem();
                        otvalor.getStore().getProxy().extraParams['params.nmsituac'] = view.getNmsituac();
                        otvalor.getStore().getProxy().extraParams['params.cdrol'] = view.getCdrol();
                        otvalor.getStore().getProxy().extraParams['params.cdperson'] = view.getCdperson();
                        otvalor.getStore().getProxy().extraParams['params.cdatribu'] = cdatribu.getValue();
                    }
                    Ice.log('Ice.view.bloque.PersonasPolizaController.custom.cdatribu.blur ',otvalor);
                }
            });
            
            otvalor.on({
                blur: function(){
                    Ice.log('Ice.view.bloque.PersonasPolizaController.custom.otvalor.blur ',otvalor.getValue());
                    if(otvalor.wasValid == true){
                        refs.gridDomicilios.getStore().load({
                            params: {
                                'params.cdperson': otvalor.getValue()
                            }
                        });
                        refs.gridDomicilios.show();
                    }
                    
                    Ice.log('situacion de vista recibida',view.getNmsituac());
                    if(view.getNmsituac() === '0'){
                        refs.cdrol.setValue("TO");
                        refs.cdrol.setDisabled(true);
                    } else {
                        refs.cdrol.setDisabled(false);
                    }
                    Ice.log('Ice.view.bloque.PersonasPolizaController.custom.otvalor.blur ',otvalor);
                }
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    onGuardar: function (btn) {
        this.guardar(btn);
    },
    
    onNuevaPersona: function(panel){
      this.nuevaPersona(panel);
    },
    
    guardar: function(btn){
        Ice.log('Ice.view.bloque.personas.PersonasPolizaController.agregar btn ',btn);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Agregando persona a situacion de poliza';
        try {
            Ice.log('refs ',refs);
            if(refs.form.isValid()){
                var selected = refs.gridDomicilios.selModel.getSelected();
                if(selected.getCount() > 0){
//                    Ice.log('situacion de vista guardar ', view.getCdunieco(), ' ', view.getCdramo(), ' ', view.getEstado(), ' ', view.getNmpoliza(), ' ', view.getNmsituac(), ' ', view.getNmsuplem());
//                    Ice.log('form ',refs.form.getValues());
//                    Ice.log('domicilio ',selected.getAt(0).data);
//                    Ice.log('guardado');
//                    Ice.log('view', view.up('panel'));
//                    Ice.log('selected.getAt(0)',selected.getAt(0).data);
//                    Ice.log('params guardar',view.getCdunieco(),view.getCdramo(),view.getEstado(),view.getNmpoliza(),view.getNmsuplem(),view.getNmsituac(),refs.cdrol.value,refs.form['otvalor'],view.getNmsuplem(),selected.getAt(0).data.nmordom);
                    Ice.request({
                        mascara: 'Agregando situacion de riesgo',
                        url: Ice.url.bloque.personas.movimientoPolizaPersona,
                        params: {
                            'params.cdunieco' : view.getCdunieco(),
                            'params.cdramo': view.getCdramo(),
                            'params.estado': view.getEstado(),
                            'params.nmpoliza': view.getNmpoliza(),
                            'params.nmsuplem': view.getNmsuplem(),
                            'params.nmsituac': view.getNmsituac(),
                            'params.cdrol': refs.cdrol.value,
                            'params.cdperson': selected.getAt(0).data.cdperson,
                            'params.nmsuplem': view.getNmsuplem(),
                            'params.status': 'V',
                            'params.nmorddom':  selected.getAt(0).data.nmorddom,
                            'params.swfallec': 'N',
                            'params.accion': 'I'
                        },
                        success: function (json) {
                            var paso2 = 'LLenando store';
                            try {
                                Ice.log("json ",json);
                                Ice.mensajeCorrecto('Guardado con exito');
                                view.up('panel').refs.personapoliza.fireEvent('datosPersonaGuardada', me);
                            } catch (e) {
                                Ice.manejaExcepcion(e, paso2);
                            }
                        }
                    });
                } else {
                    Ice.mensajeWarning('Seleccione un domicilio');
                }
            } else {
                Ice.mensajeWarning('Datos invalidos');
            }
//            var store = grid.getStore();
//            Ice.log('Ice.view.bloque.personas.PersonasPolizaController.actualizar store ',store);
//            var nmsituac = store.getAt(rowIndex).getData().nmsituac;
//            Ice.debug('guardado ',nmsituac);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.personas.PersonasPolizaController.agregar');
    },
    
    nuevaPersona: function(panel){
        Ice.log('Ice.view.bloque.personas.PersonasPolizaController.nuevaPersona',panel);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Agregando nueva persona';
        try{
            Ice.log('form',refs.form.items['dsatribu']);
            if(refs.cdrol.value){
                var selected = refs.gridDomicilios.selModel.getSelected();
                var persona = Ext.create('Ice.view.bloque.personas.Persona',{
                    reference: 'persona',
                    id: 'card-2',
                    cdramo: view.getCdramo(),
                    cdrol: refs.cdrol.value,
                    listeners: {
                        'personaGuardada': function(personaView, cdperson){
                            view.setCdperson(cdperson);
                            if(Ext.manifest.toolkit === 'classic'){
                                me.navigate(panel, "prev");
                            } else {
                                Ice.query('#mainView').getReferences().mainCard.pop();
                            }
                            view.up('panel').remove(refs.persona);
                            Ice.log('Ice.view.bloque.personas.PersonasPolizaNavigationController.cerrarPersonaPoliza');
                        }
                    }
                });
                
                if(Ext.manifest.toolkit === 'classic'){
                    panel.getController().navigate(panel, "next", persona);                              
                } else {
                    Ice.query('#mainView').getReferences().mainCard.push(persona);
                }
            } else {
                Ice.mensajeWarning('Seleccione un rol');
            }
            
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.personas.PersonasPolizaController.nuevaPersona');
    }
});