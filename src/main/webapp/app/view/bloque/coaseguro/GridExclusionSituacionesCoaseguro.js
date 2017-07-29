/**
 * Created by DEORTIZT on 28/07/2017.
 */
Ext.define('Ice.view.bloque.coaseguro.GridExclusionSituacionesCoaseguro', {
        extend: 'Ice.view.componente.GridIce',
        xtype: 'gridexclusionsituacionescoaseguro',
        
        controller: 'gridexclusionsituacionescoaseguro',
        config: {
            cdunieco: null,
            cdramo: null,
            estado: null,
            nmpoliza: null,
            nmsuplem: null,
            itemsPerPage: null,
            dsdocume: null,
            selector: 'false',
            actionColumns: []
        },
        
        // validacion de parametros de entrada
        constructor: function (config) {
            Ice.log('Ice.view.bloque.coaseguro.GridExclusionSituacionesCoaseguro.constructor config:', config);
            var me = this,
                paso = 'Validando construcci\u00f3n de lista de situaciones';
                try {
                    if (!config) {
                        throw 'No hay datos para lista de situaciones';
                    }
                    
                    if (!config.cdunieco || !config.cdramo || !config.estado ||!config.nmpoliza
                    //    || Ext.isEmpty(config.nmsuplem)
                    ) {
                        throw 'Falta llave de p\u00f3liza para lista de situaciones';
                    }

                    if(!config.modulo){
                        config.modulo = 'COTIZACION';
                    }
                    
                    config.estado = config.estado.toUpperCase();

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
                        seccion: 'COASEGURO_EXCLUSION_SIT_GRID',
                        modulo: config.modulo,
                        cdramo: config.cdramo,
                        columns: true,
                        fields: true
                    });
                    
                    Ice.log('Ice.view.bloque.coaseguro.GridExclusionSituacionesCoaseguro.initComponent comps:', compsGrid);
                    
                    var store = Ext.create('Ext.data.Store', {
                        autoLoad: false,
                        fields: compsGrid.COASEGURO.COASEGURO_EXCLUSION_SIT_GRID.fields,
                        pageSize: config.itemsPerPage,
                        proxy: {
                            type: 'ajax',
                            url: Ice.url.bloque.datosGenerales.obtenerExclusionesSituacCoaCedParc,
                            extraParams: {
                                'params.cdunieco': config.cdunieco,
                                'params.cdramo': config.cdramo,
                                'params.estado': config.estado,
                                'params.nmpoliza': config.nmpoliza,
                                'params.nmsuplem': config.nmsuplem
                            },
                            reader: {
                                type: 'json',
                                rootProperty: 'list'
                            }
                        }
                    });
                    
                    store.load({
                        params: {
                            'params.cdunieco': config.cdunieco,
                            'params.cdramo': config.cdramo,
                            'params.estado': config.estado,
                            'params.nmpoliza': config.nmpoliza,
                            'params.nmsuplem': config.nmsuplem
                        }
                    });
                    
                    
                    config.columns = compsGrid.COASEGURO.COASEGURO_EXCLUSION_SIT_GRID.columns;
                    config.renderTo = Ext.getBody();
                    config.store = store;
                } catch (e) {
                    Ice.generaExcepcion(e, paso);
                }
            me.callParent(arguments);
        }
});