/**
 * Created by DEORTIZT on 03/07/2017.
 */
Ext.define('Ice.view.bloque.documentos.ListaDocumentos', {   
        extend: 'Ice.view.componente.GridIce',
        xtype: 'listadocumentos',
        
        /*requires: [
            'Ext.toolbar.Paging',
            'Ext.ux.PreviewPlugin',
            'Ext.Toolbar',
            'Ext.grid.cell.Widget'
        ],*/
        config: {
            cdunieco: null,
            cdramo: null,
            estado: null,
            nmpoliza: null,
            nmsuplem: null,
            itemsPerPage: null,
            dsdocume: null,
            actionColumns: [],
            ntramite : null
        },
        
        // validacion de parametros de entrada
        constructor: function (config) {
            Ice.log('Ice.view.bloque.documentos.ListaDocumentos.constructor config:', config);
            var me = this,
                paso = 'Validando construcci\u00f3n de lista de documentos';
                try {
                    if (!config) {
                        throw 'No hay datos para lista de documentos';
                    }
                    
                    if(!config.ntramite){
                        if (!config.cdunieco || !config.cdramo || !config.estado ||!config.nmpoliza
                        //    || Ext.isEmpty(config.nmsuplem)
                        ) {
                            throw 'No existen parametros para mostrar lista de documentos';
                        } else {
                            config.estado = config.estado.toUpperCase();
                        }
                    }

                    
                    if(!config.itemsPerPage){
                        config.itemsPerPage = 10;
                    }
                    

                    var compsGrid = Ice.generaComponentes({
                        pantalla: 'DOCUMENTOS',
                        seccion: 'GRID',
                        columns: true,
                        fields: true
                    });
                    
                    Ice.log('Ice.view.bloque.documentos.ListaDocumentos.initComponent comps:', compsGrid);
                    
                    var store = Ext.create('Ext.data.Store', {
                        id: 'documentosStore',
                        autoLoad: false,
                        fields: compsGrid.DOCUMENTOS.GRID.fields,
                        pageSize: config.itemsPerPage,
                        proxy: {
                            type: 'ajax',
                            url: Ice.url.bloque.documentos.obtenerDocumentos,
                            extraParams: {
                                'params.cdunieco': config.cdunieco,
                                'params.cdramo': config.cdramo,
                                'params.estado': config.estado,
                                'params.nmpoliza': config.nmpoliza,
                                'params.nmsuplem': config.nmsuplem,
                                'params.dsdocume': config.dsdocume,
                                'params.ntramite': config.ntramite
                            },
                            reader: {
                                type: 'json',
                                rootProperty: 'datos',
                                totalProperty: 'totalCount'
                            }
                        }
                    });
                    
                    store.load({
                        params: {
                            'params.cdunieco': config.cdunieco,
                            'params.cdramo': config.cdramo,
                            'params.estado': config.estado,
                            'params.nmpoliza': config.nmpoliza,
                            'params.nmsuplem': config.nmsuplem,
                            start: 0,
                            limit: config.itemsPerPage
                        }
                    });
                    
                    
                    config.columns = compsGrid.DOCUMENTOS.GRID.columns;
                    config.renderTo = Ext.getBody();
                    config.store = store;
                    config.bbar = {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    };
                    config.rowNumbers = {
                        text: 'Index'
                    };
                } catch (e) {
                    Ice.generaExcepcion(e, paso);
                }
            me.callParent(arguments);
        }
});