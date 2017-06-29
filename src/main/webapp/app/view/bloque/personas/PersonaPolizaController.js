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
            var cdatribu = refs.dsatribu;
            var cdperson = Ice.query('[name=cdperson]', refs.cdperson);
            Ice.log('custom cdperson',Ice.query('[name=cdperson]',cdperson));            
            cdperson.on({
                change: function(){
                    Ice.log('Ice.view.bloque.PersonasPolizaController.custom.cdperson.change ',cdperson.getValue());
                    if(cdperson.getValue()){
                        refs.gridDomicilios.getStore().load({
                            params: {
                                'params.cdperson': cdperson.getValue()
                            }
                        });
                        refs.gridDomicilios.show();
                    }                    
                    Ice.log('Ice.view.bloque.PersonasPolizaController.custom.cdperson.change ',cdperson);
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
            Ice.log('view ',view.up('panel'));
            if(refs.cdrol.isValid()){
                var selected = refs.gridDomicilios.selModel.getSelected();
                if(selected.getCount() > 0){
                    var cdperson = refs.cdperson.getValue();
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
                            'params.cdrol': refs.cdrol.getValue(),
                            'params.cdperson': cdperson,
                            'params.nmsuplem': view.getNmsuplem(),
                            'params.status': 'V',
                            'params.nmorddom':  selected.getAt(0).data.nmorddom,
                            'params.swfallec': 'N',
                            'params.accion': view.accion
                        },
                        success: function (json) {
                            var paso2 = 'LLenando store';
                            try {
                                Ice.log("json ",json);
                                Ice.mensajeCorrecto('Guardado con exito');
                                Ice.pop();
                            } catch (e) {
                                Ice.manejaExcepcion(e, paso2);
                            }
                        }
                    });
                } else {
                    Ice.mensajeWarning('Seleccione un domicilio');
                }
            } else {
                Ice.mensajeWarning('Seleccione un rol');
            }
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
                                panel.getController().navigate(panel, "prev");
                            } else {
                                Ice.query('#mainView').getReferences().mainCard.pop();
                            }
                            Ice.log('view',view.up('panel'));
                            view.up('panel').remove(this);
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