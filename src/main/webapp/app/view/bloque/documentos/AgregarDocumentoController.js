/**
 * Created by DEORTIZT on 03/07/2017.
 */
Ext.define('Ice.view.bloque.documentos.AgregarDocumentoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agregardocumento',

    custom: function(){
        var paso = 'Customizacion de ventana de documentos',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        Ice.log('Ice.view.bloque.documentos.AgregarDocumentoController custom refs ', refs);

        var file = refs.file;

        file.on({
            change: function(me2, value){
                if(view.getNombre()){
                    if(value){
                        Ice.log('Ice.view.bloque.AgregarDocumentosController file change value ', value);
                        var nombre = value.substring(value.lastIndexOf("\\")+1, value.length);
                        var extension = value.substring(value.lastIndexOf(".")+1, value.length);
                        Ice.log('nombre y extension ',nombre, extension);
                        view.setValido(true);
                        if(!nombre.toUpperCase().startsWith("SLIP")){
                            Ice.mensajeWarning('El nombre del archivo debe empezar con la palabra SLIP.');
                            file.reset();
                            view.setValido(false);
                        }
                        if(extension.toUpperCase() != 'RTF'){
                            Ice.mensajeWarning('Su archivo debe ser extensi\u00f3n RTF.');
                            file.reset();
                            view.setValido(false);
                        }
                    }
                } else {
                    view.setValido(true);
                }
            }
        });
    },

    init: function (view) {
        Ice.log('Ice.view.bloque.documentos.AgregarDocumentoController.init view:', view);
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de ventana para agregar documentos';
        try {
            me.callParent(arguments);
            
            // esperamos a que se cree el viewmodel antes de invocar custom
            Ext.defer(function () {
                var paso2;
                try {
                    paso2 = 'Definiendo comportamiento de ventana para agregar documento';
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
            if(view.getValido() == true){
                var mask = Ice.mask('Subiendo slip');
                if(view.getNombre()){
                    view.submit(
                        {
                            url: Ice.url.bloque.documentos.subirArchivo,
                            params:{
                                'params.nombre': view.getNombre(),
                                'params.ruta': view.getRuta(),
                                'params.ntramite': view.getNtramite()
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
                } else {
                    var inicio = refs.file.getValue().lastIndexOf('\\')+1,
                        fin = refs.file.getValue().length,
                        nombre = refs.file.getValue().substring(inicio, fin);
                    view.submit(
                        {
                            url: Ice.url.bloque.documentos.subirArchivo,
                            params:{
                                'params.nombre': nombre,
                                'params.ntramite': view.getNtramite()
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
                }
            } else {
                Ice.mensajeWarning('Archivo no valido');
            }
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
    }
});