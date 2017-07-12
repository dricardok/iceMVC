Ext.define('Ice.view.bloque.personas.BuscarPersona', {
    extend: 'Ext.panel.Panel',
//    extend: 'Ice.view.componente.VentanaIce',
    xtype: 'buscarpersona',
    controller: 'buscarpersona',
    
//    layout: 'vbox',
    config: {
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        nmsituac: null,
        nmsuplem: null,
        cdrol: null,
        mostrarRol: false
    },
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
                cdramo: me.mostrarRol == true ? me.cdramo : '-1',
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
                 items: {
                     xtype: 'panel',
                     items: [
                         {
                           xtype: 'form',
                           reference: 'formBusquedaPersonas',
                           height: 150,
                           bodyPadding: '10px 0px 0px 10px',
	                       defaults: {
	                           margin: '0px 10px 10px 0px',
	                           cls: 'big-50 small-100'
                           },
                           layout: 'responsivecolumn',
                           items: comps.BUSQUEDA_PERSONA.FORMULARIO.items,
                           modelo: modelName,
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
                             height: 300,
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
                             },
                             fbar: [
                                 {
                                     xtype: 'button',
                                     reference: 'btnGuardar',
                                     text: 'Guardar',
                                     handler: 'onGuardar'
                                 },{
                                     xtype: 'button',
                                     reference: 'btnNuevo',
                                     text: 'Nuevo',
                                     handler: 'onNuevo'
                                 },{
                                     xtype: 'button',
                                     text: 'Cerrar',
                                     handler: function(){
                                         Ice.pop();
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