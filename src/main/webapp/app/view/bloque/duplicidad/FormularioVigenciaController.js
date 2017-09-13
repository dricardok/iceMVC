Ext.define('Ice.view.bloque.duplicidad.FormularioVigenciaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.formulariovigencia',

    init: function(view){
        Ice.log('Ice.view.bloque.duplicidad.FormularioVigenciaController.init',view);
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de formulario de vigencia';
        try {
            me.callParent(arguments);
            Ext.defer(function () {
                var paso2;
                try {
                    paso2 = 'Definiendo comportamiento de formulario de vigencia';
                    me.custom();
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 600);
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
    },

    custom: function() {
        var me = this,
            paso = '',
            view = me.getView(),
            refs = view.getReferences();
    	try{
            Ice.log('Ice.view.bloque.duplicidad.FormularioVigenciaController.custom.refs',refs);
            refs.fecini.on({
                change: function(){
                    try{
                        refs.fecfin.setMinValue(refs.fecini.getValue());
                    } catch(e) {
                        Ice.logWarn('No se pudo modificar el valor de fecha fin ',e);
                    }
                }
            });
    	} catch(e) {
    		Ice.manejaExcepcion(e,paso);
    	}
    }
});