/**
 * Created by DEORTIZT on 28/07/2017.
 */
Ext.define('Ice.view.bloque.coaseguro.GridExclusionCoberturasCoaseguro', {
        extend: 'Ice.view.componente.GridIce',
        xtype: 'gridexclusioncoberturascoaseguro',
        
        controller: 'gridexclusioncoberturascoaseguro',
        config: {
            cdunieco: null,
            cdramo: null,
            estado: null,
            nmpoliza: null,
            nmsituac: null,
            nmsuplem: null,
            itemsPerPage: null,
            dsdocume: null,
            actionColumns: []
        },
        
        // validacion de parametros de entrada
        constructor: function (config) {
            Ice.log('Ice.view.bloque.coaseguro.GridExclusionCoberturasCoaseguro.constructor config:', config);
            var me = this,
                paso = 'Validando construcci\u00f3n de lista de coberturas';
                try {
                    if (!config) {
                        throw 'No hay datos para lista de coberturas';
                    }
                    
                    if (!config.cdunieco || !config.cdramo || !config.estado ||!config.nmpoliza
                    //    || Ext.isEmpty(config.nmsuplem)
                    ) {
                        throw 'Falta llave de p\u00f3liza para lista de coberturas';
                    }
                    
                    config.estado = config.estado.toUpperCase();

                    if(!config.modulo){
                        config.modulo = 'COTIZACION';
                    }

                    if (config.selector == 'true') {
                        config.selModel = {
                            type: 'checkboxmodel',
                            mode: 'SIMPLE',
                            showHeaderCheckbox: false,
                            allowDeselect: true
                        };
                    }

                    var compsGrid = Ice.generaComponentes({
                        pantalla: 'COASEGURO',
                        seccion: 'COASEGURO_EXCLUSION_COB_GRID',
                        modulo: config.modulo,
                        cdramo: config.cdramo,
                        columns: true,
                        fields: true
                    });
                    
                    Ice.log('Ice.view.bloque.coaseguro.GridExclusionSituacionesCoaseguro.initComponent comps:', compsGrid);
                    
                    var store = Ext.create('Ext.data.Store', {
                        autoLoad: false,
                        fields: compsGrid.COASEGURO.COASEGURO_EXCLUSION_COB_GRID.fields,
                        pageSize: config.itemsPerPage,
                        proxy: {
                            type: 'ajax',
                            url: Ice.url.bloque.datosGenerales.obtenerExclusionesCoberCoaCedParc,
                            extraParams: {
                                'params.cdunieco': config.cdunieco,
                                'params.cdramo': config.cdramo,
                                'params.estado': config.estado,
                                'params.nmpoliza': config.nmpoliza,
                                'params.nmsituac': config.nmsituac,
                                'params.nmsuplem': config.nmsuplem
                            },
                            reader: {
                                type: 'json',
                                rootProperty: 'list'
                            }
                        }
                    });                    
                    
                    config.columns = compsGrid.COASEGURO.COASEGURO_EXCLUSION_COB_GRID.columns;
                    config.renderTo = Ext.getBody();
                    config.store = store;
                } catch (e) {
                    Ice.generaExcepcion(e, paso);
                }
            me.callParent(arguments);
        }
});