Ext.define('Ice.view.bloque.personas.PersonaPolizaNavigationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personapolizanavigation',
    init: function (view) {
        Ice.log('Ice.view.bloque.personas.PersonasPolizaController.init view:', view);
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de lista de personas';
        try {
            
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    custom: function () {
        Ice.log('Ice.view.bloque.personas.PersonasPolizaNavigationController.custom');
        var me = this,
            view = me.getView(),
            paso = 'Configurando comportamiento de lista de personas';
            Ice.log('view: ',view);
        try {
            
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    agregarPersona: function(panel){
        Ice.log('Ice.view.bloque.personas.PersonasPolizaNavigationController.navigate ',panel);
        var me = this,
            view = me.getView(),
            paso = 'Agregando persona a situacion',
            refs = view.getReferences();
        try{
            var situacionpersonas = refs.situacionpersonas,
                gridPersonas = situacionpersonas.getReferences().gridPersonas;
//            Ice.log('panel ',panel.getCdunieco(),panel.getCdramo(),panel.getEstado(),panel.getNmpoliza(),panel.getNmsuplem(), panel.getNmsituac());
//            Ice.log('me ',me);
//            Ice.log('view ',view);
//            Ice.log('refs ',refs);
//            Ice.log('refs.gridPersonas ',gridPersonas.nmsituac);
//            Ice.log('situacion de vista enviada',gridPersonas.nmsituac);
            var personapoliza = Ext.create('Ice.view.bloque.personas.PersonaPoliza',{
                reference: 'personapoliza',
                id: 'card-1',
                cdunieco: panel.getCdunieco(),
                cdramo: panel.getCdramo(),
                estado: panel.getEstado(),
                nmpoliza: panel.getNmpoliza(),
                nmsuplem: panel.getNmsuplem(),
                nmsituac: gridPersonas.nmsituac,
                cdtipsit: panel.getCdtipsit(),
                listeners: {
                    'datosPersonaGuardada': function(){
                        if(Ext.manifest.toolkit === 'classic'){
                            me.navigate(panel, "prev");
                        } else {
                            Ice.query('#mainView').getReferences().mainCard.pop();
                        }
                        view.remove(refs.personapoliza);
                        Ice.log('Ice.view.bloque.personas.PersonasPolizaNavigationController.cerrarPersonaPoliza');
                    }
                },
                botones: [
                    {
                        xtype: 'button',
                        reference: 'btnGuardar',
                        text: 'Guardar',
                        handler: 'onGuardarBloque'
                    }
                ]
            });
            if(Ext.manifest.toolkit === 'classic'){
                me.navigate(panel, "next", personapoliza);                              
            } else {
                Ice.query('#mainView').getReferences().mainCard.push(personapoliza);
            }     
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    navigate: function(panel, direction, nuevoPanel){
        Ice.log('Ice.view.bloque.personas.PersonasPolizaNavigationController.navigate ',panel,' ',direction);
        var me = this,
            view = me.getView(),
            paso = 'Configurando navegacion de personas';
        try{
            var layout = panel.getLayout();
            Ice.log('Layout',layout);
            if(nuevoPanel){
                panel.add(nuevoPanel);                
            }
            layout[direction]();
            Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
            Ext.getCmp('move-next').setDisabled(!layout.getNext());            
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});