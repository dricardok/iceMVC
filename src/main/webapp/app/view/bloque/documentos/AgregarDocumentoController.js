/**
 * Created by DEORTIZT on 03/07/2017.
 */
Ext.define('Ice.view.bloque.documentos.AgregarDocumentoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agregardocumento',

    custom: function(){
        Ice.log('Ice.view.bloque.documentos.AgregarDocumentoController custom');
    },
    
    onGuardar: function(){
        this.guardar();
    },
    
    guardar: function(){
        Ice.log('Ice.view.bloque.documentos.AgregarDocumentoController.guardar');
        var paso = 'Guardando slip',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            var mask = Ice.mask('Subiendo slip');
            view.submit(
                {
                    url: Ice.url.bloque.documentos.subirArchivo,
                    params:{
                        'params.nombre': view.getNombre(),
                        'params.ruta': view.getRuta()
                    },
                    success: function(){
                        mask.close();
                        view.up('ventanaice').cerrar();
                    },
                    failure: function(){
                        Ice.mensajeWarning('Error al subir slip');
                        mask.close();
                    }                    
                }
            );
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
    }
});