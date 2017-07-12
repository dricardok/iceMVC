/**
 * Created by DEORTIZT on 03/07/2017.
 */
Ext.define('Ice.view.bloque.documentos.ListaDocumentos', {   
        extend: 'Ice.view.componente.GridIce',
        xtype: 'listadocumentos',
        
//        layout: 'vbox',
        scrollable: true,
        requires: [
            'Ext.Toolbar',
            'Ext.grid.cell.Widget'
        ],
        plugins: [
            'gridpagingtoolbar'
        ],
        config: {
            cdunieco: null,
            cdramo: null,
            estado: null,
            nmpoliza: null,
            nmsuplem: null,
            itemsPerPage: null,
            dsdocume: null,
            actionColumns: [],
            fields: []
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
                    
                    var compsGrid = Ice.generaComponentes({
                        pantalla: 'DOCUMENTOS',
                        seccion: 'GRID',
                        columns: true,
                        fields: true
                    });                    
                    Ice.log('Ice.view.bloque.documentos.ListaDocumentos.initComponent comps:', compsGrid);
                    config.columns = compsGrid.DOCUMENTOS.GRID.columns;
                    config.fields = compsGrid.DOCUMENTOS.GRID.fields;
                    config.minHeight = 300;
                    config.renderTo = Ext.getBody();
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
        },
        
        // contruccion usando metodos ext y parametros de entrada
        initialize: function () {
            Ice.log('Ice.view.bloque.documentos.ListaDocumentos.initComponent');
            var me = this,
                paso = 'Construyendo lista de documentos';
            try {
                me.setStore({
                    id: 'documentosStore',
                    autoLoad: false,
                    fields: me.getFields(),
                    pageSize: me.getItemsPerPage(),
                    proxy: {
                        type: 'ajax',
                        url: Ice.url.bloque.documentos.obtenerDocumentos,
                        extraParams: {
                            'params.cdunieco': me.getCdunieco(),
                            'params.cdramo': me.getCdramo(),
                            'params.estado': me.getEstado(),
                            'params.nmpoliza': me.getNmpoliza(),
                            'params.nmsuplem': me.getNmsuplem(),
                            'params.dsdocume': me.getDsdocume()
                        },
                        reader: {
                            type: 'json',
                            rootProperty: 'datos',
                            totalProperty: 'totalCount'
                        }
                    }
                });
                me.getStore().load({
                    params: {
                        'params.cdunieco': me.getCdunieco(),
                        'params.cdramo': me.getCdramo(),
                        'params.estado': me.getEstado().toUpperCase(),
                        'params.nmpoliza': me.getNmpoliza(),
                        'params.nmsuplem': me.getNmsuplem(),
                        start: 0,
                        limit: me.getItemsPerPage()
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