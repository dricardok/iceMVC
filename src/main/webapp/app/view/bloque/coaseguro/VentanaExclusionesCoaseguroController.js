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
            refs.gridSituaciones.getStore().load({
                params: {
                    'params.cdunieco': view.getCdunieco(),
                    'params.cdramo': view.getCdramo(),
                    'params.estado': view.getEstado(),
                    'params.nmpoliza': view.getNmpoliza(),
                    'params.nmsuplem': view.getNmsuplem()
                }
            });
            var storeSit = refs.gridSituaciones.getStore(),
                storeCob = refs.gridCoberturas.getStore(),
                selModelSit,
                selModelCob;
            Ice.log('Ice.view.bloque.VentanaExclusionesCoaseguroController.storeSit ',storeSit);
            Ice.log('Ice.view.bloque.VentanaExclusionesCoaseguroController.storeCob ',storeCob);
            storeSit.on({
                load: function(){
                    view.setCargacompleta('S');
                },
                endupdate: function(){
                    Ice.log('Ice.view.bloque.VentanaExclusionesCoaseguroController.storeSit.endupdate');
                }
            });
            storeCob.on({
                load: function(){
                    Ice.log('Ice.view.bloque.VentanaExclusionesCoaseguroController.storeCob.load');
                    view.setCargacompleta('S');
                },
                endupdate: function(){
                    Ice.log('Ice.view.bloque.VentanaExclusionesCoaseguroController.storeCob.endupdate');
                }
            });
            if(Ice.classic()){
                selModelSit = refs.gridSituaciones.selModel;
                selModelCob = refs.gridCoberturas.selModel;
                selModelSit.on({
                    select: function(selected, record, index){
                        Ice.log('selModelSit select selected',selected,'record',record,'index',index,'cargaCompleta',view.getCargacompleta());
                        if(view.getCargacompleta() == 'S'){
                            var data = record.data;
                            data['accion'] = 'N';
                            var exito = me.excluirSituacion(data);
                            Ice.log('Despues de excluir situacion exito ', exito);
                            if(exito === false){
                                view.setCargacompleta('N');
                                refs.gridSituaciones.getSelectionModel().deselect(index, true);
                                view.setCargacompleta('S');
                            }
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
            } else {
                selModelSit = refs.gridSituaciones;
                selModelCob = refs.gridCoberturas;
                view.setCargacompleta('S');
                selModelSit.on({
                    select: function(selected, record, index){
                        Ice.log('selModelSit select selected',selected,'record',record,'index',index,'cargaCompleta',view.getCargacompleta());
                        if(view.getCargacompleta() == 'S'){
                            var data = record.data;
                            data['accion'] = 'N';
                            var exito = me.excluirSituacion(data);
                            if(exito === false){
                                view.setCargacompleta('N');
                                refs.gridSituaciones.deselect(index, true);
                                view.setCargacompleta('S');
                            }
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
            }           
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
            paso = 'Excluir situacion de riesgo',
            exito = false;
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
                            exito = true;
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
        return exito;
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