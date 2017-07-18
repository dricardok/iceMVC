Ext.define('Ice.view.bloque.coaseguro.PanelCoaseguro', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'panelcoaseguro',

    controller: 'panelcoaseguro',
    //config ext
    header: false,

    platformConfig: {
            desktop: {
                    minHeight: 900,
                    scrollable: true
            },
            '!desktop': {
                    height: 600,
                    scrollable: true
            }
    },

        // config no ext
    config: {
        // uso o funcionamiento
        modulo: null,
        flujo: null,
        cdtipsit: null,
        auxkey: null,
    
        // llave
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        nmsuplem: null,
        status: null,

        // coaseguro
        cdtipcoa: null
    },

    constructor: function(config){
        Ice.log('Ice.view.bloques.coaseguro.PanelCoaseguro.constructor config', config);
        var me = this,
            paso = 'Construyendo pantalla de coaseguro';
        try{
            if (!config.cdramo || !config.cdtipsit) {
                throw 'Falta cdramo o cdtipsit para componente de cotizaci\u00f3n';
            }
            
            if(!config.cdunieco || !config.estado || !config.nmpoliza || !config.nmsuplem){
                throw 'Falta llave de poliza';
            }

            config.modulo = config.modulo || 'COTIZACION';
            config.flujo = config.flujo || {};
            
            if (config.estado === 'w') {
                config.estado = 'W';
            }

            if(!config.cdtipcoa){
                throw 'Falta tipo de coaseguro';
            } else {
                if(config.cdtipcoa === 'N'){
                    throw 'Tipo de coaseguro incorrecto';
                }
                config.cdtipcoa = config.cdtipcoa.toUpperCase();
            }

            var form = Ice.generaComponentes({
                pantalla: 'BLOQUE_DATOS_GENERALES',
                seccion: 'COASEGURO_FORM',
                modulo: config.modulo || '',
                estatus: (config.flujo && config.flujo.estatus) || '',
                cdramo: config.cdramo || '',
                cdtipsit: config.cdtipsit ||'',
                auxkey: config.auxkey || '',
                
                items: true,
                fields: true,
                validators: true
            });

            var grid = Ice.generaComponentes({
                pantalla: 'BLOQUE_DATOS_GENERALES',
                seccion: 'COASEGURO_GRID',
                modulo: config.modulo || '',
                estatus: (config.flujo && config.flujo.estatus) || '',
                cdramo: config.cdramo || '',
                cdtipsit: config.cdtipsit ||'',
                auxkey: config.auxkey || '',
                
                items: true,
                fields: true,
                validators: true,
                columns: true
            });

            var gridForm = Ice.generaComponentes({
                pantalla: 'BLOQUE_DATOS_GENERALES',
                seccion: 'COASEGURO_GRID_FORM',
                modulo: config.modulo || '',
                estatus: (config.flujo && config.flujo.estatus) || '',
                cdramo: config.cdramo || '',
                cdtipsit: config.cdtipsit ||'',
                auxkey: config.auxkey || '',
                
                items: true,
                fields: true,
                validators: true
            });           
            
            var formAceptado = Ice.generaComponentes({
                pantalla: 'BLOQUE_DATOS_GENERALES',
                seccion: 'COASEGURO_ACEPTADO_FORM',
                modulo: config.modulo || '',
                estatus: (config.flujo && config.flujo.estatus) || '',
                cdramo: config.cdramo || '',
                cdtipsit: config.cdtipsit ||'',
                auxkey: config.auxkey || '',
                
                items: true,
                fields: true,
                validators: true
            });

            Ice.log('Ice.view.bloques.coaseguro.PanelCoaseguro.form',form);
            Ice.log('Ice.view.bloques.coaseguro.PanelCoaseguro.grid',grid);
            Ice.log('Ice.view.bloques.coaseguro.PanelCoaseguro.gridForm',gridForm);
            Ice.log('Ice.view.bloques.coaseguro.PanelCoaseguro.formAceptado',formAceptado);

            var store = {
                autoLoad: false,
                fields: grid.BLOQUE_DATOS_GENERALES.COASEGURO_GRID.fields||[],
                proxy: {
                    type: 'ajax',
                    url: Ice.url.bloque.datosGenerales.obtenerModeloCoaseguro,
                    reader: {
                        type: 'json',
                        rootProperty: 'list'
                    }
                }
            };

            config.items = [
                {
                    xtype: 'formdoscolumnasice',
                    reference: 'form',
                    hidden: config.cdtipcoa == 'A' ? true:false,
                    items: form.BLOQUE_DATOS_GENERALES.COASEGURO_FORM.items,
                    fields: form.BLOQUE_DATOS_GENERALES.COASEGURO_FORM.fields,
                    validators: form.BLOQUE_DATOS_GENERALES.COASEGURO_FORM.validators
                },{
                    xtype: 'gridice',
                    reference: 'grid',
                    hidden: true,
                    store: store,
                    columns: grid.BLOQUE_DATOS_GENERALES.COASEGURO_GRID.columns,
                    actionColumns: [
                        {
                            xtype: 'actioncolumn',
                            items: [
                                {
                                    iconCls: 'x-fa fa-edit',
                                    tooltip: 'Editar',
                                    handler: function(grid, rowIndex, colIndex){
                                        me.getController().onEditarCompania(grid, rowIndex, colIndex);
                                    }
                                },{
                                    iconCls: 'x-fa fa-minus-circle',
                                    tooltip: 'Borrar',
                                    handler: function(grid, rowIndex, colIndex){
                                        me.getController().onEliminarCompania(grid, rowIndex, colIndex);
                                    }
                                }
                            ]
                        }
                    ],
                    buttons: [
                        {
                            text: 'Agregar',
                            handler: 'onMostrarFormCia'
                        },{
                            text: 'Guardar',
                            handler: 'onGuardarCedido'
                        }
                    ]
                },{
                    xtype: 'formdoscolumnasice',
                    reference: 'formCia',
                    hidden: true,
                    items: gridForm.BLOQUE_DATOS_GENERALES.COASEGURO_GRID_FORM.items,
                    modelFields: gridForm.BLOQUE_DATOS_GENERALES.COASEGURO_GRID_FORM.fields,
                    modelValidators: gridForm.BLOQUE_DATOS_GENERALES.COASEGURO_GRID_FORM.validators,
                    dataEdit: null,
                    buttons: [
                        {
                            text: 'Guardar',
                            handler: 'onCargarCia'
                        },{
                            text: 'Cancelar',
                            handler: 'onRecuperaCiaEditada'
                        }
                    ]
                },{
                    xtype: 'formdoscolumnasice',
                    reference: 'formAceptado',
                    hidden: config.cdtipcoa == 'A' ? false:true,
                    items: formAceptado.BLOQUE_DATOS_GENERALES.COASEGURO_ACEPTADO_FORM.items,
                    fields: formAceptado.BLOQUE_DATOS_GENERALES.COASEGURO_ACEPTADO_FORM.fields,
                    validators: formAceptado.BLOQUE_DATOS_GENERALES.COASEGURO_ACEPTADO_FORM.validators,
                    buttons: [
                        {
                            text: 'Guardar',
                            handler: 'onGuardarAceptado'
                        }
                    ]
                }
            ];
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});