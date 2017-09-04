/**
 * Created by DEORTIZT on 03/07/2017.
 */
Ext.define('Ice.view.bloque.documentos.VentanaDocumentos', {   
    extend: 'Ice.view.componente.VentanaIce',
    xtype: 'ventanadocumentos',
    
    controller: 'ventanadocumentos',

    // config ext
    title: {
		text:"Documentos",
		style:'padding:0px 0px 0px 10px;',
	},
    layout: 'fit',
    platformConfig: {
        desktop: {
            scrollable: false,
            width: 680,
            height: 400,
            //collapsible: true,
            //titleCollapse: true
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
        itemsPerPage: null,
        flujo: null,
        ntramite: null
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

            config.flujo = Ice.validarParamFlujo(config);
            if (config.flujo.ntramite) {
                config.cdunieco = config.flujo.cdunieco;
                config.cdramo   = config.flujo.cdramo;
                config.estado   = config.flujo.estado;
                config.nmpoliza = config.flujo.nmpoliza;
                config.nmsuplem = config.flujo.nmsuplem;
                config.ntramite = config.flujo.ntramite;
            }
            
            if (!config.cdunieco || !config.cdramo || !config.estado ||!config.nmpoliza
            //    || Ext.isEmpty(config.nmsuplem)
            ) {
                throw 'Falta llave de p\u00f3liza para ventana de documentos';
            }
            
            if(!config.itemsPerPage){
                config.itemsPerPage = 10;
            }

            config.estado = config.estado.toUpperCase();
                                
            config.items = [
                {
                    xtype: 'listadocumentos',
                    reference: 'listadocumentos',
                    style:'padding:10px 20px;',
                    title: 'Documentos de '+ (config.estado == 'W' ? 'cotizaci\u00f3n ':'p\u00f3liza ') + config.cdunieco + '-' + config.cdramo + '-' +config.nmpoliza,
                    cdunieco: config.cdunieco,
                    cdramo: config.cdramo,
                    estado: config.estado,
                    nmpoliza: config.nmpoliza,
                    nmsuplem: config.nmsuplem,
                    dsdocume: config.dsdocume,
                    ntramite: config.ntramite,
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
                                    this.up('ventanaice').getController().onVerDocumento(grid, rowIndex, colIndex);
                                }
                            },{
                                iconCls: 'x-fa fa-download',
                                tooltip: 'Descargar',
                                handler: function(grid, rowIndex, colIndex){
                                    this.up('ventanaice').getController().onDescargarDocumento(grid, rowIndex, colIndex);
                                }
                            },{
                                iconCls: 'x-fa fa-upload',
                                tooltip: 'Subir slip',
                                colType: 'slip',
                                hidden: true,
                                reference: 'upload_slip',
                                handler: function(grid, rowIndex, colIndex) {
                                    this.up('ventanaice').getController().onActualizarDocumento(grid, rowIndex, colIndex);
                                }
                            },{
                                iconCls: 'x-fa fa-download',
                                tooltip: 'Descargar slip',
                                colType: 'slip',
                                hidden: true,
                                handler: function(grid, rowIndex, colIndex){
                                    this.up('ventanaice').getController().onDescargarDocumento(grid, rowIndex, colIndex);
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
                        ui:'gray',
                        handler: function(){
                            Ice.pop();
                        }
                    }
                ].concat(config.buttons || []);
            }
            config.buttons = [
                /*{
                    text: 'Agregar',
                    iconCls: 'x-fa fa-plus',
                    handler: 'onAgregarDocumento'
                },*/
                {
                    iconCls: 'x-fa fa-file-word-o',
                    text: 'Slips',
                    handler: 'onCargarSlips'
                },{
                    iconCls: 'x-fa fa-file-o',
                    text: 'Documentos',
                    handler: 'onRecargarDocumentos'
                },{
                    xtype: 'textfieldice',
                    labelAlign: 'left',
                    label: 'Buscar',
                    reference: 'dsdocume'
                }, {
                    iconCls: 'x-fa fa-search',
                    handler: 'buscarDocumentos'
                }, {
                    iconCls: 'x-fa fa-eraser',
                    text: 'Limpiar',
                    handler: 'onLimpiarFiltro'
                }
            ].concat(config.buttons || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});