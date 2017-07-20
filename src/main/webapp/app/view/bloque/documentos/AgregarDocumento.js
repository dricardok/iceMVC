/**
 * Created by DEORTIZT on 03/07/2017.
 */
Ext.define('Ice.view.bloque.documentos.AgregarDocumento', {   
        extend: 'Ice.view.componente.FormDosColumnasIce',
        xtype: 'agregardocumento',
        /*requires: ['Ext.form.field.*'],*/
        
        config: {
            ruta: null
        },
// contruccion usando metodos ext y parametros de entrada
        constructor: function (config) {
            Ice.log('Ice.view.bloque.documentos.AgregarDocumento.constructor');
            var me = this,
                paso = 'Construyendo ventana agregar documento';
            try {
                var comps = Ice.generaComponentes({
                    pantalla: 'DOCUMENTOS',
                    seccion: 'FORMULARIO',
                    items: true,
                    fields: true,
                    validators: true
                });
                
                Ice.log('Ice.view.bloque.documentos.AgregarDocumento.initComponent comps:', comps);
                                
                config.items = comps.DOCUMENTOS.FORMULARIO.items;
                config.modelFields = comps.DOCUMENTOS.FORMULARIO.fields;
                config.modelValidators = comps.DOCUMENTOS.FORMULARIO.validators;
                config.buttons = [
                    {
                        text: 'Guardar',
                        handler: function(){
                            Ice.log('ruta',config.ruta);
                        }
                    },{
                        text: 'Cancelar',
                        handler: function(){
                            if(Ice.classic()){
                                this.up('window').close();
                            } else {
                                Ice.pop();
                            }
                        }
                    }
                ];
            } catch(e){
                Ice.generaExcepcion(e, paso);
            }
            // construir componente
            me.callParent(arguments);
        }
});