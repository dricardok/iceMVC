/**
 * Created by DEORTIZT on 03/07/2017.
 */
Ext.define('Ice.view.bloque.documentos.VentanaDocumentos', {   
        extend: 'Ice.view.componente.VentanaIce',
        xtype: 'ventanadocumentos',
        
        controller: 'ventanadocumentos',
        platformConfig: {
            desktop: {
                    scrollable: false,
                    width: 650,
                    minHeight: 350
            },
            '!desktop': {
                    scrollable: true
            }
        },
        collapsible: true,
        titleCollapse: true,
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

                    if(config.estado === 'w'){
                        config.estado = 'W';
                    }
                                        
                    config.items = [
                        {
                            xtype: 'listadocumentos',
                            reference: 'listadocumentos',
                            title: 'Documentos de '+ (config.estado == 'W' ? 'cotizaci\u00f3n ':'p\u00f3liza ') + config.cdunieco + '-' + config.cdramo + '-' +config.nmpoliza,
                            cdunieco: config.cdunieco,
                            cdramo: config.cdramo,
                            estado: config.estado,
                            nmpoliza: config.nmpoliza,
                            nmsuplem: config.nmsuplem,
                            dsdocume: config.dsdocume,
                            itemsPerPage: config.itemsPerPage,
                            actionColumns: [
                                {
                                    xtype:'actioncolumn',
                                    items: [{
                                        iconCls: 'x-fa fa-eye',
                                        tooltip: 'Ver',
                                        handler: function(grid, rowIndex, colIndex) {
                                            this.up('window').getController().onVerDocumento(grid, rowIndex, colIndex);
                                        }
                                    },{
                                        iconCls: 'x-fa fa-download',
                                        tooltip: 'Descargar',
                                        handler: function(grid, rowIndex, colIndex){
                                            this.up('window').getController().onDescargarDocumento(grid, rowIndex, colIndex);
                                        }
                                    }]
                                }
                        ]
                        }
                    ];
                    if(Ext.manifest.toolkit === 'modern'){
                        config.buttons = [
                            {
                                text: 'Atras',
                                handler: function(){
                                    Ice.pop();
                                }
                            }
                        ];
                    }
                    config.bbar = [
                        '->',{
                            xtype: 'button',
                            text: 'Agregar',
                            handler: 'onAgregarDocumento'
                        },{
                            xtype: 'textfield',
                            text: 'Buscar',
                            reference: 'dsdocume'
                        },{
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            handler: 'buscarDocumentos'
                        },{
                            xtype: 'button',
                            iconCls: 'x-fa fa-refresh',
                            handler: 'onLimpiarFiltro'
                        }
                    ];
                } catch (e) {
                    Ice.generaExcepcion(e, paso);
                }
            me.callParent(arguments);
        }
});