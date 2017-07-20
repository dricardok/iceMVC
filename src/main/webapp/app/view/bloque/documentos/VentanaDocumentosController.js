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
                                    'params.cddocume': data.cddocume
                                }
                            }
                    );
                } else {
                    window.open(Ice.url.bloque.documentos.verArchivo+'?'+
                        'params.url='+encodeURIComponent(data.url)+
                        '&params.filename='+data.cddocume,
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
                                    'params.cddocume': data.cddocume
                                }
                            }
                    );                    
                } else {
                    var panel = Ext.create('Ext.form.Panel').submit(
                            {
                                url: Ice.url.bloque.documentos.descargarArchivo,
                                standardSubmit: true,
                                target: '_blank',
                                params:{
                                    'params.url': data.url,
                                    'params.cddocume': data.cddocume
                                }
                            }
                    );
                    Ice.push(panel);
                }
            }
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
    },
    
    agregarDocumento: function(){
        Ice.log('Ice.view.bloque.documentos.VentanaDocumentosController.agregarDocumento');
        var paso = 'Agregando documento',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            var ventanaNuevo = Ext.create('Ice.view.componente.VentanaPanel',{
                minWidth: 400,
                minHeight: 300,
                closeAction: 'destroy',
                closable: false,
                title: 'Agregar documento',
                modal: true,
                items: [
                    {
                        xtype: 'agregardocumento',
                        minWidth: 390,
                        minHeight: 290
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
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
    }
});