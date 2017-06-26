Ext.define('Ice.view.bloque.personas.BuscarPersona', {  
        extend: 'Ext.window.Window',
        xtype: 'buscarpersona',
        controller: 'buscarpersona',
        
        layout: 'card',
        config  :       {
            cdunieco: null,
            cdramo: null,
            estado: null,
            nmpoliza: null,
            nmsituac: null,
            nmsuplem: null,
            cdrol: null//,
//            cdperson: null
        },
        bodyPadding: '10px 0px 0px 10px',
//        constructor: function (config) {
//            Ice.log('Ice.view.bloque.BuscarPersona.constructor config:', config);
//            var me = this,
//                paso = 'Validando construcci\u00f3n de busqueda de persona';
//                try {
//                    
//                } catch (e){
//                    Ice.generaExcepcion(e, paso);
//                }
//            Ice.log('Ice.view.bloque.BuscarPersona.constructor');
//            me.callParent(arguments);
//        },
        initComponent: function () {
            Ice.log('Ice.view.bloque.personas.BuscarPersona.initComponent [this, args]:', this, arguments);
            var me = this,
                paso = 'Construyendo busqueda persona';
            try {
                Ice.log('Ice.view.bloque.personas.BuscarPersona.refs:', me.cdramo);
                var comps = Ice.generaComponentes({
                    pantalla: 'BUSQUEDA_PERSONA',
                    seccion: 'FORMULARIO',
                    modulo: me.modulo || '',
                    estatus: (me.flujo && me.flujo.estatus) || '',
                    cdramo: me.cdramo,
                    cdtipsit: me.cdtipsit ||'',
                    auxKey: me.auxkey || '',
                    items: true
                });
                
                var compsGrid = Ice.generaComponentes({
                    pantalla: 'BUSQUEDA_PERSONA',
                    seccion: 'GRID',
                    columns: true,
                    fields: true
                });
                Ice.log('Ice.view.bloque.personas.BuscarPersona.initComponent comps:', comps);
                Ice.log('Ice.view.bloque.personas.BuscarPersona.initComponent compsGrid:', compsGrid);
                
                var modelName = Ext.id();
                                
                 Ext.apply(me, {
//                     id: 'card-0',
                     items: {
                         xtype: 'panel',
                         items: [
                             {
                               xtype: 'form',
                               reference: 'formBusquedaPersonas',
                               items: comps.BUSQUEDA_PERSONA.FORMULARIO.items,
                               modelo: modelName,
                               layout: 'responsivecolumn',
                               bodyPadding: '10px 0px 0px 10px',
                               defaults: {
                                   margin: '0px 10px 10px 0px',
                                   cls: 'big-50 small-100'
                               },
                               buttons: [
                                   {
                                       text: 'Buscar',
                                       handler: 'onBuscar'
                                   }
                               ]
                           },{
                               xtype: 'gridpanel',
                               reference: 'gridPersonas',
                               scrollable: true,
                               columns: compsGrid.BUSQUEDA_PERSONA.GRID.columns,
                               store: {
                                   autoLoad: false,
                                   fields: compsGrid.BUSQUEDA_PERSONA.GRID.fields,
                                   proxy: {
                                       type: 'ajax',
                                       timeout: 45000,
                                       url: Ice.url.bloque.personas.obtenerPersonaCriterio,
                                       reader: {
                                           type: 'json',
                                           rootProperty: 'listas',
                                           successProperty: 'success',
                                           messageProperty: 'message'
                                       }
                                   }                               
                               }
                           },{
                               buttons: [
                                   {
                                       xtype: 'button',
                                       reference: 'btnGuardar',
                                       text: 'Guardar',
                                       handler: 'onGuardar'
                                   },{
                                       xtype: 'button',
                                       reference: 'btnNuevo',
                                       hidden: me.cdramo === '-1' ? true : false,
                                       text: 'Nuevo',
                                       handler: 'onNuevo'
                                   },{
                                       xtype: 'button',
                                       text: 'Cerrar',
                                       handler: function(){
                                           this.up('window').close();
                                       }
                                   }
                               ]
                           }
                         ]
                     }
                 });
                 // construir componente
                me.callParent(arguments);
            } catch (e) {
                Ice.generaExcepcion(e, paso);
            }
            Ice.log('Ice.view.bloque.personas.BuscarPersona.initComponent');
        }
});