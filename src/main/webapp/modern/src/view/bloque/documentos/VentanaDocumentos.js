/**
 * Created by DEORTIZT on 03/07/2017.
 */
Ext.define('Ice.view.bloque.documentos.VentanaDocumentos', {   
        extend: 'Ice.view.componente.VentanaPanel',
        xtype: 'ventanadocumentos',        
        controller: 'ventanadocumentos',
        
//        width: 750,
        height: 750,
        layout: 'fit',
//        scrollable: true,
//        collapsible: true,
//        titleCollapse: true,
        config: {
            cdunieco: null,
            cdramo: null,
            estado: null,
            nmpoliza: null,
            nmsuplem: null,
            itemsPerPage: null
        },
        
        // validacion de parametros de entrada
        constructor: function (config) {
            Ice.log('Ice.view.bloque.documentos.VentanaDocumentos.constructor config:', config);
            var me = this,
                paso = 'Validando construcci\u00f3n de ventana de documentos';
                try {
                    if (!config) {
                        throw 'No hay datos para ventana de documentos';
                    }
                    
                    if (!config.cdunieco || !config.cdramo || !config.estado ||!config.nmpoliza || !config.nmsuplem) {
                        throw 'Falta llave de poliza para lista de documentos';
                    }
                    
                    if(!config.itemsPerPage){
                        config.itemsPerPage = 10;
                    }
                    if (config.estado === 'w') {
                        config.estado = 'W';
                    }
                } catch (e) {
                    Ice.generaExcepcion(e, paso);
                }
            me.callParent(arguments);
        },
        initialize: function(){
            Ice.log('Ice.view.bloque.VentanaDocumentos.initalize');
            var me = this,
                paso = 'Construyendo ventana de documentos';
            try{
                me.add({
                    xtype: 'listadocumentos',
                    reference: 'listadocumentos',
                    title: 'Documentos de '+ (me.getEstado() == 'W' ? 'cotizaci\u00f3n ':'p\u00f3liza ') + me.getCdunieco() + '-' + me.getCdramo() + '-' + me.getNmpoliza(),
                    cdunieco: me.getCdunieco(),
                    cdramo: me.getCdramo(),
                    estado: me.getEstado(),
                    nmpoliza: me.getNmpoliza(),
                    nmsuplem: me.getNmsuplem(),
                    itemsPerPage: me.getItemsPerPage(),
                    actionColumns: [
                        {
                            xtype: 'button',
                            ui: 'action',
                            iconCls: 'x-fa fa-eye',
                            handler: function(grid, rowIndex, colIndex) {
                                me.getController().onVerDocumento(grid, rowIndex, colIndex);
                            }
                        }
                    ]
                });
                
                me.add({
                    xtype: 'toolbar',
                    docked: 'top',
                    items: [
                        '->',{
                            text: 'Agregar',
                            xtype: 'button',
                            handler: 'onAgregarDocumento'
                        },{
                            label: 'Buscar',
                            xtype: 'textfieldice',
                            reference: 'dsdocume'
                        },{
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            handler: 'buscarDocumentos'
                        },{
                            xtype: 'button',
                            iconCls: 'x-fa fa-refresh',
                        }
                    ]
                });
            } catch(e) {
                Ice.generaExcepcion(e, paso);
            }
            
            // construir componente
            me.callParent(arguments);
        }
});