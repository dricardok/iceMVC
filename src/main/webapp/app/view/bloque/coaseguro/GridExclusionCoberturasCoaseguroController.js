Ext.define('Ice.view.bloque.coaseguro.GridExclusionCoberturasCoaseguroController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridexclusioncoberturascoaseguro',
    
    
    constructor: function (config) {
        Ice.log('Ice.view.bloque.GridExclusionCoberturasCoaseguroController.constructor config:', config);
        this.callParent(arguments);
    },
    
    init: function (view) {
        Ice.log('Ice.view.bloque.GridExclusionCoberturasCoaseguroController.init view:', view);
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de lista de coberturas por situacion excluidas de coaseguro';
        try {
            me.callParent(arguments);
            
            // esperamos a que se cree el viewmodel antes de invocar custom
            Ext.defer(function () {
                var paso2;
                try {
                    paso2 = 'Definiendo comportamiento de lista de coberturas por situacion excluidas coaseguro';
                    me.custom();                    
                } catch (e) {
                	//alert(e);
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 200);
        } catch (e) {
        	//alert(e);
            Ice.generaExcepcion(e, paso);
        }
    },
    
    custom: function () {
        Ice.log('Ice.view.bloque.GridExclusionCoberturasCoaseguroController.custom');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Configurando comportamiento lista de coberturas por situacion excluidas coaseguro';
        Ice.log('view: ',view);
            
        try {
            store = view.getStore();
            store.on({
                load: function(me, records){
                    Ice.log('store records',records);
                    for(var i = 0; i < records.length; i++){
                        var data = records[i].data;
                        Ice.log('data ',data);
                        if(data.switch_exc == 'S'){
                            view.getSelectionModel().select(i, true);
                        }
                    }
                }
            });
        } catch (e) {
        	alert(e);
            Ice.generaExcepcion(e, paso);
        }
    }
});