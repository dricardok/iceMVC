/**
 * Created by DEORTIZT on 03/07/2017.
 */
Ext.define('Ice.view.bloque.documentos.ListaDocumentos', {   
        extend: 'Ice.view.componente.GridIce',
        xtype: 'listadocumentos',
        
        requires: [
            'Ext.toolbar.Paging',
            'Ext.ux.PreviewPlugin'
        ],
        config: {
            cdunieco: null,
            cdramo: null,
            estado: null,
            nmpoliza: null,
            nmsuplem: null,
            itemsPerPage: null,
            dsdocume: null,
            actionColumns: []
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
                    
                    if (!config.cdunieco || !config.cdramo || !config.estado ||!config.nmpoliza || !config.nmsuplem) {
                        throw 'Falta llave de poliza para lista de documentos';
                    }
                    
                    if(!config.itemsPerPage){
                        config.itemsPerPage = 10;
                    }
                    
                } catch (e) {
                    Ice.generaExcepcion(e, paso);
                }
            me.callParent(arguments);
        },
        
        // contruccion usando metodos ext y parametros de entrada
        initComponent: function () {
            Ice.log('Ice.view.bloque.documentos.ListaDocumentos.initComponent');
            var me = this,
            paso = 'Construyendo lista de documentos';
            try {
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
                    pageSize: me.itemsPerPage,
                    proxy: {
                        type: 'ajax',
                        url: Ice.url.bloque.documentos.obtenerDocumentos,
                        extraParams: {
                            'params.cdunieco': me.cdunieco,
                            'params.cdramo': me.cdramo,
                            'params.estado': me.estado,
                            'params.nmpoliza': me.nmpoliza,
                            'params.nmsuplem': me.nmsuplem,
                            'params.dsdocume': me.dsdocume
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
                        'params.cdunieco': me.cdunieco,
                        'params.cdramo': me.cdramo,
                        'params.estado': me.estado,
                        'params.nmpoliza': me.nmpoliza,
                        'params.nmsuplem': me.nmsuplem,
                        start: 0,
                        limit: me.itemsPerPage
                    }
                });
                
                Ext.apply(me, {
                    columns: compsGrid.DOCUMENTOS.GRID.columns.concat(me.actionColumns),
                    minHeight: 300,
                    renderTo: Ext.getBody(),
                    store: store,
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    }
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