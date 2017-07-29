Ext.define('Ice.view.bloque.coaseguro.GridExclusionSituacionesCoaseguroController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridexclusionsituacionescoaseguro',
    
    
    constructor: function (config) {
        Ice.log('Ice.view.bloque.GridExclusionSituacionesCoaseguroController.constructor config:', config);
        this.callParent(arguments);
    },
    
    init: function (view) {
        Ice.log('Ice.view.bloque.GridExclusionSituacionesCoaseguroController.init view:', view);
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de lista de situaciones excluidas de coaseguro';
        try {
            me.callParent(arguments);
            
            // esperamos a que se cree el viewmodel antes de invocar custom
            Ext.defer(function () {
                var paso2;
                try {
                    paso2 = 'Definiendo comportamiento de lista de situaciones excluidas coaseguro';
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
        Ice.log('Ice.view.bloque.GridExclusionSituacionesCoaseguroController.custom');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Configurando comportamiento lista de situaciones excluidas coaseguro';
        Ice.log('view: ',view);
            
        try {
            store = view.getStore();
            store.on({
                load: function(me, records){
                    Ice.log('store records',records);
                    for(var i = 0; i < records.length; i++){
                        var data = records[i].data;
                        Ice.log('data ',i,' es ',data);
                        if(data.swtch_exc == 'S'){
                            view.getSelectionModel().select(i);
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