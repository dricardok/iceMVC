Ext.define('Ice.view.bloque.coaseguro.VentanaExclusionesCoaseguroController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ventanaexclusionescoaseguro',
    
    
    constructor: function (config) {
        Ice.log('Ice.view.bloque.VentanaExclusionesCoaseguroController.constructor config:', config);
        this.callParent(arguments);
    },
    
    init: function (view) {
        Ice.log('Ice.view.bloque.VentanaExclusionesCoaseguroController.init view:', view);
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de bloque exclusiones coaseguro';
        try {
            me.callParent(arguments);
            
            // esperamos a que se cree el viewmodel antes de invocar custom
            Ext.defer(function () {
                var paso2;
                try {
                    paso2 = 'Definiendo comportamiento de bloque exclusiones coaseguro';
                    me.custom();                    
                } catch (e) {
                	//alert(e);
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 200);
        } catch (e) {
        	//alert(e);
            Ice.generaExcepcion(e, paso);
        }
    },
    
    custom: function () {
        Ice.log('Ice.view.bloque.VentanaExclusionesCoaseguroController.custom');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Configurando comportamiento bloque de exclusiones coaseguro';
        Ice.log('view: ',view);            
        try {
            Ice.log('Ice.view.bloque.VentanaExclusionesCoaseguroController refs:', refs);
            var storeSit = refs.gridSituaciones.getStore(),
                storeCob = refs.gridCoberturas.getStore(),
                selModelSit = refs.gridSituaciones.selModel;
                selModelCob = refs.gridCoberturas.selModel;
            storeSit.on({
                load: function(){
                    Ice.log('Actualizando store de situaciones');
                    view.setCargacompleta('S');
                }
            });
            storeCob.on({
                load: function(){
                    view.setCargacompleta('S');
                }
            });
            selModelSit.on({
                select: function(selected, record, index){
                    Ice.log('selModelSit select selected',selected,'record',record,'index',index,'cargaCompleta',view.getCargacompleta());
                    if(view.getCargacompleta() == 'S'){
                        var data = record.data;
                        data['accion'] = 'N';
                        me.excluirSituacion(data);
                    }
                },
                deselect: function(deselected, record, index){
                    Ice.log('selModelSit deselect selected',deselected,'record',record,'index',index,'cargaCompleta',view.getCargacompleta());
                    if(view.getCargacompleta() == 'S'){
                        var data = record.data;
                        data['accion'] = 'S';
                        me.excluirSituacion(data);
                    }
                }
            });
            selModelCob.on({
                select: function(selected, record, index){
                    if(view.getCargacompleta() == 'S'){
                        var data = record.data;
                        data['accion'] = 'N';
                        me.excluirCoberturas(data);
                    }
                },
                deselect: function(deselected, record, index){
                    //if(view.getCargacompleta() == 'S'){
                        var data = record.data;
                        data['accion'] = 'S';
                        me.excluirCoberturas(data);
                    //}
                }
            });
        } catch (e) {
        	alert(e);
            Ice.generaExcepcion(e, paso);
        }
    },

    onMostrarCoberturas: function(grid, rowIndex, colIndex){
        this.mostrarCoberturas(grid, rowIndex, colIndex);
    },

    mostrarCoberturas: function(grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.coaseguro.VentanaExclusionesCoaseguroController.editar grid',grid,'rowIndex',rowIndex,'colIndex',colIndex);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Mostrar coberturas de situacion';
        try {
            Ice.log('refs',refs);
            var data = me.getRowGridData(grid, rowIndex, colIndex);
            if(data){
                view.setCargacompleta('N');
                refs.gridCoberturas.getStore().removeAll();
                refs.gridCoberturas.getStore().getProxy().extraParams['params.nmsituac'] = data.nmsituac;
                refs.gridCoberturas.getStore().load();
                refs.gridCoberturas.show();
            }
        } catch(e) {
            Ice.generaExcepcion(e, paso);
        }
    },

    excluirSituacion: function(data){
        Ice.log('Ice.view.bloque.coaseguro.VentanaExclusionesCoaseguroController.excluirSituacion data',data);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Excluir situacion de riesgo';
        try {
            if(data){
                Ice.request({
                    mascara: 'Excluyendo situacion',
                    url: Ice.url.bloque.datosGenerales.movimientoExclusionesSituacCoaCedParc,
                    params: {
                        'params.cdunieco' : data.cdunieco,
                        'params.cdramo'   : data.cdramo,
                        'params.estado'   : data.estado,
                        'params.nmpoliza' : data.nmpoliza,
                        'params.nmsuplem' : data.nmsuplem,
                        'params.nmsituac' : data.nmsituac,
                        'params.accion': data.accion
                    },
                    success: function (action) {
                        var paso2 = 'Recargando lista de situaciones';
                        try {
                            view.setCargacompleta('N');
                            refs.gridSituaciones.getStore().reload();
                            refs.gridSituaciones.show();
                        } catch (e) {
                            view.setCargacompleta('N');
                            refs.gridSituaciones.getStore().reload();
                            refs.gridSituaciones.show();
                            Ice.manejaExcepcion(e, paso2);
                        }
                    }
                });
            }
        } catch(e) {
            Ice.generaExcepcion(e, paso);
        }
    },

    excluirCoberturas: function(data){
        Ice.log('Ice.view.bloque.coaseguro.VentanaExclusionesCoaseguroController.excluirCoberturas data',data);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Excluyendo coberturas';
        try {
            if(data){
                Ice.request({
                    mascara: 'Excluyendo coberturas',
                    url: Ice.url.bloque.datosGenerales.movimientoExclusionesCoberCoaCedParc,
                    params: {
                        'params.cdunieco' : data.cdunieco,
                        'params.cdramo'   : data.cdramo,
                        'params.estado'   : data.estado,
                        'params.nmpoliza' : data.nmpoliza,
                        'params.nmsuplem' : data.nmsuplem,
                        'params.nmsituac' : data.nmsituac,
                        'params.cdcapita' : data.cdcapita,
                        'params.accion': data.accion
                    },
                    success: function (action) {
                        var paso2 = 'Actualizando lista de coberturas ';
                        try {
                            refs.gridCoberturas.getStore().getProxy().extraParams['nmsituac'] = data.nmsituac;
                            view.setCargacompleta('N');
                            refs.gridCoberturas.getStore().load();
                        } catch (e) {
                            refs.gridCoberturas.getStore().getProxy().extraParams['nmsituac'] = data.nmsituac;
                            view.setCargacompleta('N');
                            refs.gridCoberturas.getStore().load();
                            Ice.manejaExcepcion(e, paso2);
                        }
                    }
                });
            }
        } catch(e) {
            Ice.generaExcepcion(e, paso);
        }
    },

    getRowGridData: function(grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.coaseguro.VentanaExclusionesCoaseguroController.getRowGridData grid',grid,'rowIndex',rowIndex,'colIndex',colIndex);
        var data;
        if(Ext.manifest.toolkit === 'classic'){
            data = grid.getStore().getAt(rowIndex).getData();              
        } else {
            var cell = grid.getParent(),
                record = cell.getRecord(),
                data = record.getData();
        }
        return data;
    }
});