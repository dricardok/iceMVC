Ext.define('Ice.view.bloque.personas.PersonaPolizaNavigationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personapolizanavigation',
    
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

    cargar: function () {
        Ice.log('Ice.view.bloque.personas.PersonaPolizaNavigationController.cargar');
        var me = this,
            refs = me.getReferences(),
            paso = 'Cargando personas';
        try {
            refs.gridSituaciones.getStore().reload();
            refs.gridPersonas.hide();
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
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
    
    agregarPersona: function () {
        Ice.log('Ice.view.bloque.personas.PersonaPolizaNavigationController.agregarPersona');
        var me = this,
            view = me.getView(),
            paso = 'Agregando persona a situacion',
            refs = view.getReferences();
        try {
            var situacionpersonas = refs.situacionpersonas,
                gridPersonas = refs.gridPersonas,
                valid = false;
            Ice.log('gridPersonas ', gridPersonas.getNmsituac());
            if (gridPersonas && gridPersonas.getStore() && !Ext.isEmpty(gridPersonas.getNmsituac())) {
                valid = true;
                //gridPersonas.hide();
                var personapoliza = Ext.create('Ice.view.bloque.personas.PersonaPoliza', {
                    reference: 'personapoliza',
                    cdunieco: view.getCdunieco(),
                    cdramo: view.getCdramo(),
                    estado: view.getEstado(),
                    nmpoliza: view.getNmpoliza(),
                    nmsuplem: view.getNmsuplem(),
                    nmsituac: gridPersonas.getNmsituac(),
                    cdtipsit: view.getCdtipsit(),
                    accion: 'I',
                    listeners: {
                        guardar: function () {
                            refs.gridPersonas.getStore().removeAll();
                            refs.gridPersonas.getStore().reload();
                        }
                    }
                    // listeners: {
                    //     'datosPersonaGuardada': function() {
                    //         Ice.pop();
                    //         Ice.log('Ice.view.bloque.personas.PersonasPolizaNavigationController.cerrarPersonaPoliza');
                    //     }
                    // },
                    // buttons: [{
                    //     xtype: 'button',
                    //     reference: 'btnGuardar',
                    //     text: 'Guardar',
                    //     handler: 'onGuardarBloque'
                    // }]
                });
                //gridPersonas.getStore().removeAll();
                Ice.push(personapoliza);
            }
            if (!valid) {
                Ice.mensajeWarning('Debe seleccionar una situacion de riesgo');
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
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
    // },
    
    actualizarPersona: function (grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.personas.PersonasPolizaNavigationController.actualizarPersona ',grid, rowIndex, colIndex);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            data,
            paso = 'Configurando navegacion de personas';
        try{
            var gridPersonas = grid,
                dataPer;
            if(Ext.manifest.toolkit === 'classic'){
                dataPer = gridPersonas.getStore().getAt(rowIndex).getData();
            } else {
                Ice.log('recordPer',gridPersonas.getParent().getRecord().getData());
                var cellPer = gridPersonas.getParent(),
                    recordPer = cellPer.getRecord();
                dataPer = recordPer.getData();
            }
                
            //refs.gridPersonas.getStore().removeAll();
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
                    guardar: function () {
                        refs.gridPersonas.getStore().removeAll();
                        refs.gridPersonas.getStore().reload();
                    }
                }
                // listeners: {
                //     'datosPersonaGuardada': function(){
                //         Ice.pop();
                //         Ice.log('Ice.view.bloque.personas.PersonasPolizaNavigationController.cerrarPersonaPoliza');
                //     }
                // },
                // buttons: [
                //     {
                //         xtype: 'button',
                //         reference: 'btnGuardar',
                //         text: 'Guardar',
                //         handler: 'onGuardarBloque'
                //     }
                // ]
            });
            Ice.push(personapoliza);
            Ext.defer(function () {
                var refs = personapoliza.getReferences().form.getReferences();
                refs.cdperson.setValue(dataPer.cdperson);
                refs.cdrol.setValue(dataPer.cdrol);
            }, 600);
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
            var gridPersonas = grid,
                dataPer;
            // gridPersonas.hide();
            if(Ext.manifest.toolkit === 'classic'){
                dataPer = gridPersonas.getStore().getAt(rowIndex).getData();
            } else {
                var cellPer = gridPersonas.getParent(),
                    recordPer = cellPer.getRecord();
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
                        refs.gridPersonas.getStore().removeAll();
                        refs.gridPersonas.getStore().reload();
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