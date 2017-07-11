/**
 * Created by DEORTIZT on 03/07/2017.
 */
Ext.define('Ice.view.bloque.documentos.AgregarDocumento', {   
        extend: 'Ice.view.componente.Formulario',
        xtype: 'agregardocumento',
        requires: ['Ext.form.field.*'],
        
        scrollable: true,
        bodyPadding: '0 0 0 80',
//        defaults: {
//            cls: 'big-50 small-100'
//        },
// contruccion usando metodos ext y parametros de entrada
        initComponent: function () {
            Ice.log('Ice.view.bloque.documentos.AgregarDocumento.initComponent');
            var me = this,
            paso = 'Construyendo bloque situaciones de riesgo';
            try {
                var comps = Ice.generaComponentes({
                    pantalla: 'DOCUMENTOS',
                    seccion: 'FORMULARIO',
                    items: true,
                    fields: true,
                    validators: true
                });
                
                Ice.log('Ice.view.bloque.documentos.AgregarDocumento.initComponent comps:', comps);
                
                Ext.apply(me, {
                    items: comps.DOCUMENTOS.FORMULARIO.items,
                    modelFields: comps.DOCUMENTOS.FORMULARIO.fields,
                    modelValidators: comps.DOCUMENTOS.FORMULARIO.validators,
                    buttons: [
                        {
                            text: 'Guardar'
                        },{
                            text: 'Cancelar',
                            handler: function(){
                                this.up('window').close();
                            }
                        }
                    ]
                });
            } catch(e){
                Ice.generaExcepcion(e, paso);
            }
            // construir componente
            me.callParent(arguments);            
            
            // comportamiento
            paso = '';
//          try {
//              me.getController().custom();
//          } catch (e) {
//              Ice.generaExcepcion(e, paso);
//          }
        }
});