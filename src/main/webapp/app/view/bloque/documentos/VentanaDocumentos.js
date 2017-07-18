/**
 * Created by DEORTIZT on 03/07/2017.
 */
Ext.define('Ice.view.bloque.documentos.VentanaDocumentos', {   
    extend: 'Ice.view.componente.VentanaIce',
    xtype: 'ventanadocumentos',
    
    controller: 'ventanadocumentos',

    // config ext
    title: 'Documentos',
    layout: 'fit',
    platformConfig: {
        desktop: {
            scrollable: false,
            width: 650,
            height: 400,
            collapsible: true,
            titleCollapse: true
        },
        '!desktop': {
            scrollable: true
        }
    },

    // config no ext
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
            
            if (!config.cdunieco || !config.cdramo || !config.estado ||!config.nmpoliza
                || Ext.isEmpty(config.nmsuplem)) {alert();
                throw 'Falta llave de p\u00f3liza para lista de documentos';
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
                    platformConfig: {
                        '!desktop': {
                            height: '100%'
                        }
                    },
                    actionColumns: [{
                        xtype:'actioncolumn',
                        items: [
                            {
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
                            }
                        ]
                    }]
                }
            ];
            if (Ext.manifest.toolkit === 'modern') {
                config.buttons = [
                    {
                        text: 'Cerrar',
                        iconCls: 'x-fa fa-close',
                        handler: function(){
                            Ice.pop();
                        }
                    }
                ].concat(config.buttons || []);
            }
            config.buttons = [
                {
                    text: 'Agregar',
                    iconCls: 'x-fa fa-plus',
                    handler: 'onAgregarDocumento'
                }, {
                    xtype: 'textfieldice',
                    labelAlign: 'left',
                    label: 'Buscar',
                    reference: 'dsdocume'
                }, {
                    iconCls: 'x-fa fa-search',
                    handler: 'buscarDocumentos'
                }, {
                    iconCls: 'x-fa fa-refresh',
                    handler: 'onLimpiarFiltro'
                }
            ].concat(config.buttons || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});