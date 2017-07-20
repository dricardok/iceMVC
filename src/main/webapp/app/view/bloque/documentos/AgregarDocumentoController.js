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
            Ice.request({
                mascara: 'Subiendo archivo slip',
                url: Ice.url.bloque.documentos.subirArchivo,
                params: {
                    'params.nombre': refs.cddocume.getValue() 
                },
                success: function (json) {
                    var paso2 = 'Subiendo slip';
                    try {
                        Ice.mensajeCorrecto('Archivo subido con exito');
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
    }
});