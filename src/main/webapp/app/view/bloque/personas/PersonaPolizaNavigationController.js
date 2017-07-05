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
    
    onActualizarPersona: function (grid, rowIndex, colIndex){
        this.actualizarPersona(grid, rowIndex, colIndex);
    },
    
    onBorrarPersona: function (grid, rowIndex, colIndex){
        this.borrarPersona(grid, rowIndex, colIndex);
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
            Ice.log('me ',me);
            var situacionpersonas = refs.situacionpersonas,
                gridPersonas = refs.gridPersonas;
            gridPersonas.getStore().removeAll();
            gridPersonas.hide();
            var personapoliza = Ext.create('Ice.view.bloque.personas.PersonaPoliza',{
                reference: 'personapoliza',
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                nmsuplem: view.getNmsuplem(),
                nmsituac: gridPersonas.nmsituac,
                cdtipsit: view.getCdtipsit(),
                accion: 'I',
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
    },
    
    actualizarPersona: function (grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.personas.PersonasPolizaNavigationController.actualizarPersona ',grid, rowIndex, colIndex);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            data,
            paso = 'Configurando navegacion de personas';
        try{
            var gridPersonas = refs.gridPersonas;            
            if(Ext.manifest.toolkit === 'classic'){
                dataPer = gridPersonas.getStore().getAt(rowIndex).getData();
            } else {
                var cellPer = gridPersonas.getParent(),
                    recordPer = cellPer.getRecord(),
                    dataPer = recordPer.getData();
            }
            
            gridPersonas.getStore().removeAll();
            var personapoliza = Ext.create('Ice.view.bloque.personas.PersonaPoliza',{
                reference: 'personapoliza',
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                nmsuplem: view.getNmsuplem(),
                nmsituac: dataPer.nmsituac,
                cdperson: dataPer.cdperson,
                cdrol: dataPer.cdrol,
                cdtipsit: view.getCdtipsit(),
                accion: 'U',
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
            Ice.log('personapoliza.refs',personapoliza.getReferences());
            personapoliza.getReferences().cdperson.setValue(dataPer.cdperson);
            personapoliza.getReferences().cdrol.setValue(dataPer.cdrol);
            Ice.push(personapoliza);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    borrarPersona: function (grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.personas.PersonasPolizaNavigationController.borrarPersona ',grid, rowIndex, colIndex);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Configurando navegacion de personas';
        try{
            var gridPersonas = refs.gridPersonas;
            gridPersonas.hide();
            if(Ext.manifest.toolkit === 'classic'){
                dataPer = gridPersonas.getStore().getAt(rowIndex).getData();
            } else {
                var cellPer = gridPersonas.getParent(),
                    recordPer = cellPer.getRecord(),
                    dataPer = recordPer.getData();
            }
            
            Ice.request({
                mascara: 'Borrando situacion de riesgo',
                url: Ice.url.bloque.personas.movimientoPolizaPersona,
                params: {
                    'params.cdunieco' : view.getCdunieco(),
                    'params.cdramo': view.getCdramo(),
                    'params.estado': view.getEstado(),
                    'params.nmpoliza': view.getNmpoliza(),
                    'params.nmsituac': dataPer.nmsituac,
                    'params.cdperson': dataPer.cdperson,
                    'params.cdrol': dataPer.cdrol,
                    'params.nmsuplem': view.getNmsuplem(),
                    'params.accion': 'D'
                },
                success: function (json) {
                    var paso2 = 'LLenando store';
                    try {
                        Ice.log("json ",json);
                        Ice.mensajeCorrecto('Borrado con exito');
                        gridPersonas.getStore().removeAll();
                        gridPersonas.getStore().reload();
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});