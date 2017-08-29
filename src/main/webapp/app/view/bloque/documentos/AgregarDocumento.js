/**
 * Created by DEORTIZT on 03/07/2017.
 */
Ext.define('Ice.view.bloque.documentos.AgregarDocumento', {   
        extend: 'Ice.view.componente.FormIce',
        xtype: 'agregardocumento',
        controller: 'agregardocumento',
        /*requires: ['Ext.form.field.*'],*/

        platformConfig: {
            desktop: {
                scrollable: false,
                width: 600,
                defaults: {
                    style: 'margin:10px;',
                    anchor: '100%'
                }
            },
            '!desktop': {
                scrollable: true,
                enableSubmissionForm: false
            }
        },
        
        config: {
            ruta: null,
            nombre: null,
            valido: false
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
                
                var file = Ext.query('[name=file]',comps.DOCUMENTOS.FORMULARIO.items);
                file['regex'] = '/^.*\.(rtf|RTF)$/';
                file['regexText'] = 'Solo se permiten archivos rtf';
                config.items = comps.DOCUMENTOS.FORMULARIO.items;
                config.modelFields = comps.DOCUMENTOS.FORMULARIO.fields;
                config.modelValidators = comps.DOCUMENTOS.FORMULARIO.validators;
                config.reference = 'form',
                config.buttons = [
                    {
                        text: 'Guardar',
                        iconCls: 'x-fa fa-save',
                        handler: 'onGuardar'
                    },{
                        text: 'Cancelar',
                        iconCls: 'x-fa fa-close',
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