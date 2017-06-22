Ext.define('Ice.view.bloque.personas.BuscarPersonaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.buscarpersonas',
    
    custom: function(){
        Ice.log('Ice.view.bloque.BuscarPersonaController.custom');
        var me = this,
        view = me.getView(),
        paso = 'Configurando comportamiento de bloque lista de situaciones';
        try{
            
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
            
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.BuscarPersonaController.buscar');
    }
});