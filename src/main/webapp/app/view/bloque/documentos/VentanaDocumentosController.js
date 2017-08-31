/**
 * Created by DEORTIZT on 03/07/2017.
 */
Ext.define('Ice.view.bloque.documentos.VentanaDocumentosController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ventanadocumentos',

    custom: function(){
        Ice.log('Ice.view.bloque.documentos.VentanaDocumentosController custom');
    },
    
    onVerDocumento: function(grid, rowIndex, colIndex){
        this.verDocumento(grid, rowIndex, colIndex);
    },
    
    onDescargarDocumento: function(grid, rowIndex, colIndex){
        this.descargarDocumento(grid, rowIndex, colIndex);
    },

    onActualizarDocumento: function(grid, rowIndex, colIndex){
        this.actualizarDocumento(grid, rowIndex, colIndex);
    },
    
    onAgregarDocumento: function(){
        this.agregarDocumento();
    },
    
    onLimpiarFiltro: function(){
        this.limpiarFiltro();
    },

    onCargarSlips: function(){
        this.cargarSlips();
    },

    onRecargarDocumentos: function(){
        this.recargarDocumentos();
    },
    
    verDocumento: function(grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.documentos.VentanaDocumentosController.verDocumento', grid, rowIndex, colIndex);
        var paso = 'Antes de visualizar documento',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            var store = refs.listadocumentos.getStore(),
                data;
            
            if(Ext.manifest.toolkit === 'classic'){
                data = store.getAt(rowIndex).getData();
            } else {
                var cell = grid.getParent(),
                    record = cell.getRecord(),
                    data = record.getData();
            }
            Ice.log('data', data);
            if(data){
                if(Ext.manifest.toolkit === 'classic'){
                    Ext.create('Ext.form.Panel').submit(
                            {
                                url: Ice.url.bloque.documentos.verArchivo,
                                standardSubmit: true,
                                target: '_blank',
                                params:{
                                    'params.url': data.url,
                                    'params.ruta': data.ruta,
                                    'params.dsdocume': data.dsdocume,
                                    'params.cdtipdoc': data.cdtipdoc
                                }
                            }
                    );
                } else {
                    window.open(Ice.url.bloque.documentos.verArchivo+'?'+
                        'params.url='+encodeURIComponent(Ice.nvl(data.url))+
                        '&params.ruta='+encodeURIComponent(Ice.nvl(data.ruta))+
                        '&params.cddocume='+Ice.nvl(data.cddocume)+
                        '&params.cdtipdoc='+encodeURIComponent(Ice.nvl(data.cdtipdoc))+
                        '&params.cdunieco='+view.getCdunieco()+
                        '&params.cdramo='+view.getCdramo()+
                        '&params.estado='+view.getEstado()+
                        '&params.nmpoliza='+view.getNmpoliza()+
                        '&params.nmsuplem='+view.getNmsuplem(),
                        '_blank',
                        'width=800, height=600'
                    );
                }
            }
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
    },
    
    descargarDocumento: function(grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.documentos.VentanaDocumentosController.descargarDocumento', grid, rowIndex, colIndex);
        var paso = 'Antes de descargar documento',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            var store = refs.listadocumentos.getStore(),
                data;
            
            if(Ext.manifest.toolkit === 'classic'){
                data = store.getAt(rowIndex).getData();              
            } else {
                var cell = grid.getParent(),
                    record = cell.getRecord(),
                    data = record.getData();
            }
            Ice.log('Data',data);
            if(data){
                if(Ext.manifest.toolkit === 'classic'){
                    Ext.create('Ext.form.Panel').submit(
                        {
                            url: Ice.url.bloque.documentos.descargarArchivo,
                            standardSubmit: true,
                            target: '_blank',
                            params:{
                                'params.url': data.url,
                                'params.ruta': data.ruta,
                                'params.dsdocume': data.dsdocume,
                                'params.cdtipdoc': data.cdtipdoc
                            }
                        }
                    );                    
                } else {
                    window.open(Ice.url.bloque.documentos.descargarArchivo+'?'+
                        'params.url='+encodeURIComponent(data.url)+
                        '&params.ruta='+encodeURIComponent(data.ruta)+
                        '&params.cddocume='+data.cddocume+
                        '&params.cdtipdoc='+data.cdtipdoc+
                        '&params.cdunieco='+view.getCdunieco()+
                        '&params.cdramo='+view.getCdramo()+
                        '&params.estado='+view.getEstado()+
                        '&params.nmpoliza='+view.getNmpoliza()+
                        '&params.nmsuplem='+view.getNmsuplem(),
                        '_blank',
                        'width=800, height=600'
                    );/*
                    var panel = Ext.create('Ext.form.Panel').submit(
                        {
                            url: Ice.url.bloque.documentos.descargarArchivo,
                            standardSubmit: true,
                            target: '_blank',
                            params:{
                                'params.url': data.url,
                                'params.ruta': data.ruta,
                                'params.dsdocume': data.dsdocume,
                                'params.cdtipdoc': data.cdtipdoc
                            }
                        }
                    );
                    */
//                    Ice.push(panel);
                }
            }
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
    },
    
    actualizarDocumento: function(grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.documentos.VentanaDocumentosController.actualizarDocumento grid',grid,'rowIndex',rowIndex,'colIndex',colIndex);
        var paso = 'Agregando documento',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            var data = me.getRowDataActionColumn(grid, rowIndex, colIndex);
            Ice.log('data actualizarDocumento',data);
            var ventanaNuevo = Ext.create('Ice.view.componente.VentanaIce',{
                closeAction: 'destroy',
                closable: false,
                title: 'Agregar documento',
                modal: true,
                items: [
                    {
                        xtype: 'agregardocumento',
                        ruta: data.ruta,
                        nombre: data.dsdocume
                    }
                ]
            });
            ventanaNuevo.mostrar();
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
    },
    
    buscarDocumentos: function(){
        Ice.log('Ice.view.bloque.documentos.VentanaDocumentosController.buscarDocumentos');
        var paso = 'Agregando documento',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            if(refs.dsdocume){
                if(refs.dsdocume.getValue()){
                    refs.listadocumentos.getStore().getProxy().extraParams['params.dsdocume'] = refs.dsdocume.getValue();
                    refs.listadocumentos.getStore().load();
                }
            }
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
    },
    
    limpiarFiltro: function(){
        Ice.log('Ice.view.bloque.documentos.VentanaDocumentosController.limpiarFiltro');
        var paso = 'Agregando documento',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            if(refs.dsdocume){
                if(refs.dsdocume.getValue()){
                    Ice.log('extraparams',refs.listadocumentos.getStore().getProxy());
                    refs.listadocumentos.getStore().getProxy().extraParams['params.dsdocume'] = null;
                    refs.listadocumentos.getStore().getProxy().extraParams['params.cdtipdoc'] = null;
                    refs.listadocumentos.getStore().load();
                }
            }
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
    },

    cargarSlips: function(){
        Ice.log('Ice.view.bloque.documentos.VentanaDocumentosController.cargarSlips');
        var paso = 'Agregando documento',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            refs.listadocumentos.getStore().getProxy().extraParams['params.cdtipdoc'] = 'SLIP';
            refs.listadocumentos.getStore().load();
            this.mostrarActionColumnsSlip(refs.listadocumentos, true);
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
    },

    recargarDocumentos: function(){
        Ice.log('Ice.view.bloque.documentos.VentanaDocumentosController.recargarDocumentos');
        var paso = 'Agregando documento',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            refs.listadocumentos.getStore().getProxy().extraParams['params.cdtipdoc'] = null;
            refs.listadocumentos.getStore().load();
            this.mostrarActionColumnsSlip(refs.listadocumentos, false);
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
    },

    mostrarActionColumnsSlip: function(grid, swmostrar){
        Ice.log('Ice.view.bloque.documentos.VentanaDocumentosController.mostrarActionColumnsSlip grid',grid,'swshow',swmostrar);
        var paso = 'Mostrar columnas slip',
            me = this,
            view = me.getView(),
            refs = view.getReferences(),
            swotros = false;
        try{
            var columns = grid.getColumns();
            Ice.log('Ice.view.bloque.documentos.VentanaDocumentosController.mostrarActionColumnsSlip columns',columns);
            if(columns){
                if(columns.length > 0){
                    if(swmostrar == false){
                        swotros = true;
                    }
                    for(var i = 0; i < columns.length; i++){
                        var column, xtype, colType, reference;
                        if(Ice.classic()){
                            column = columns[i];
                            xtype = column.xtype;
                            colType = column.colType;
                        } else {
                            column = columns[i].config.cell;
                            xtype = column.xtype;
                            if(column.widget){
                                if(column.widget.colType){
                                    colType = column.widget.colType;
                                }
                                if(column.widget.reference){
                                    reference = column.widget.reference;
                                }
                            }
                        }
                        //Ice.log('column', column, 'xtype', xtype, 'colType', colType);
                        if('actioncolumn' == xtype || 'widgetcell' == xtype){
                            Ice.log('columna ',i);
                            if('slip' == colType){
                                //Ice.log('Ice.sesion.cdsisrol', Ice.sesion.cdsisrol, 'Ice.constantes.roles.AGENTE', Ice.constantes.roles.AGENTE);
                                if(Ice.sesion.cdsisrol == Ice.constantes.roles.AGENTE){
                                    if(column.reference != 'upload_slip'){
                                        me.mostrarColumna(columns[i], swmostrar);
                                    }
                                } else {
                                    me.mostrarColumna(columns[i], swmostrar);
                                }
                            } else {
                                me.mostrarColumna(columns[i], swotros);
                            }
                        }
                    }
                }
            }
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
    },

    mostrarColumna: function(column, swmostrar){
        Ice.log('Ice.view.bloque.coaseguro.PanelCoaseguroController.mostrarColumna column', column, 'swmostrar', swmostrar);
        if(swmostrar == true){
            column.show();
        } else {
            column.hide();
        }
    },

    getRowDataActionColumn: function(grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.coaseguro.PanelCoaseguroController.getDataRowActionColumn grid',grid,'rowIndex',rowIndex,'colIndex',colIndex);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            data;
        try{
            if(Ext.manifest.toolkit === 'classic'){
                var store = grid.getStore();
                data = store.getAt(rowIndex).getData();              
            } else {
                Ice.log('grid parent',grid.getParent());
                var cell = grid.getParent(),
                    record = cell.getRecord(),
                    data = record.getData();
            }
        } catch (e){
            Ice.generaExcepcion(e);
        }
        return data;
    }
});