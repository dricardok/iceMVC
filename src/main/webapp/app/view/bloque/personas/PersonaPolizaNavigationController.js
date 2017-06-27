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
    
    onActualizar: function (grid, rowIndex, colIndex) {
        this.actualizar(grid, rowIndex, colIndex);
    },
    
    onAgregar: function (grid, rowIndex, colIndex) {
        this.agregar(grid, rowIndex, colIndex);
    },
    
    actualizar: function(grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.situacionPersonas.actualizar grid ',grid,' rowIndex ',rowIndex,' colIndex ',colIndex);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Actualizando valores de personas por situacion',
            data;
        try {
            var store = refs.gridSituaciones.getStore();
            if(Ext.manifest.toolkit === 'classic'){
                data = store.getAt(rowIndex).getData();              
            } else {
                var cell = grid.getParent(),
                    record = cell.getRecord(),
                    data = record.getData();
            }            
            var nmsituac = data.nmsituac;            
            paso = 'Antes de ejecutar funcion cargar personas';
            refs.gridPersonas.getController().onCargar(nmsituac);
            refs.gridPersonas.setNmsituac(nmsituac);
            Ice.log('refs.gridPersonas',refs.gridPersonas);
            refs.gridPersonas.show();
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.situacionPersonas.actualizar');
    },
    
    agregar: function(grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.situacionPersonas.agregar grid ',grid,' rowIndex ',rowIndex,' colIndex ',colIndex);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Agregando persona a situacion de poliza',
            data;
        try {
            var store = refs.gridSituaciones.getStore();
            if(Ext.manifest.toolkit === 'classic'){
                data = store.getAt(rowIndex).getData();              
            } else {
                var cell = grid.getParent(),
                    record = cell.getRecord(),
                    data = record.getData();
            }
            Ice.log('Ice.view.bloque.situacionPersonas.actualizar store ',store);
            var nmsituac = data.nmsituac;
            refs.setNmsituac(nmsituac);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.situacionPersonas.agregar');
    },
    
    agregarPersona: function(panel){
        Ice.log('Ice.view.bloque.personas.PersonasPolizaNavigationController.navigate ',panel);
        var me = this,
            view = me.getView(),
            paso = 'Agregando persona a situacion',
            refs = view.getReferences();
        try{
//            Ice.log('refs ',refs);
            Ice.log('me ',me);
            var situacionpersonas = refs.situacionpersonas,
                gridPersonas = refs.gridPersonas;
            var personapoliza = Ext.create('Ice.view.bloque.personas.PersonaPoliza',{
                reference: 'personapoliza',
                id: 'card-1',
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                nmsuplem: view.getNmsuplem(),
                nmsituac: gridPersonas.nmsituac,
                cdtipsit: view.getCdtipsit(),
                listeners: {
                    'datosPersonaGuardada': function(){
                        Ice.query('#mainView').getReferences().mainCard.pop();
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
            
            Ice.push(personapoliza);   
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