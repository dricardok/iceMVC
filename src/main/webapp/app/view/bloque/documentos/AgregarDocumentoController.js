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
            Ice.log('guardar me',view);
            view.submit(
                {
                    url: Ice.url.bloque.documentos.subirArchivo,
                    //standardSubmit: true,
                    params:{
                        'params.nombre': view.ruta
                    }
                }
            );
            /*Ice.request({
                mascara: 'Subiendo archivo slip',
                url: Ice.url.bloque.documentos.subirArchivo,
                params: {
                    'params.nombre': refs.cddocume.getName(),
                    'params.ruta': view.ruta
                },
                success: function (json) {
                    var paso2 = 'Subiendo slip';
                    try {
                        Ice.mensajeCorrecto('Archivo subido con exito');
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });*/
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
    }
});