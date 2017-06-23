Ext.define('Ice.view.bloque.personas.BuscarPersona', {  
        extend: 'Ext.panel.Panel',
        xtype: 'buscarpersona',
        controller: 'buscarpersona',
        
        config  :       {
            cdunieco: null,
            cdramo: null,
            estado: null,
            nmpoliza: null,
            nmsituac: null,
            nmsuplem: null,
            cdrol: null,
            cdperson: null
        },
        bodyPadding: '10px 0px 0px 10px',
        constructor: function (config) {
            Ice.log('Ice.view.bloque.BuscarPersona.constructor config:', config);
            var me = this,
                paso = 'Validando construcci\u00f3n de busqueda de persona';
                try {
                    
                } catch (e){
                    Ice.generaExcepcion(e, paso);
                }
            Ice.log('Ice.view.bloque.BuscarPersona.constructor');
            me.callParent(arguments);
        },
        initComponent: function () {
            Ice.log('Ice.view.bloque.personas.BuscarPersona.initComponent [this, args]:', this, arguments);
            var me = this,
                paso = 'Construyendo busqueda persona';
            try {
                var comps = Ice.generaComponentes({
                    pantalla: 'BUSQUEDA_PERSONA',
                    seccion: 'FORMULARIO',
                    modulo: me.modulo || '',
                    estatus: (me.flujo && me.flujo.estatus) || '',
                    cdramo: me.cdramo || '',
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
                     items: [
                         {
                           xtype: 'form',
                           reference: 'form',
                           title: 'Buscar persona',
                           items: comps.BUSQUEDA_PERSONA.FORMULARIO.items,
                           modelo: modelName,
                           layout: 'responsivecolumn',
//                           width: '100%',
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
//                           hidden: true,
                           columns: compsGrid.BUSQUEDA_PERSONA.GRID.columns,
                           store: {
                               autoLoad: false,
                               fields: compsGrid.BUSQUEDA_PERSONA.GRID.fields,
                               proxy: {
                                   type        : 'ajax',
                                   url         : Ice.url.bloque.personas.obtenerPersonaCriterio,
                                   reader : {
                                       type : 'json',
                                       rootProperty : 'listas',
                                       successProperty : 'success',
                                       messageProperty : 'message'
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
                                   text: 'Nuevo',
                                   scope: me,
                                   handler: function(btn){
                                       Ice.log('me.up',me.up('panel'));
                                       Ice.log('me.up.up',me.up('panel').up('panel'));
                                       this.getController().nuevaPersona(me.up('panel'));
                                   }
                               }
                           ],
                           width: '100%'
                       }
                     ]
                 });
                 // construir componente
                me.callParent(arguments);
            } catch (e) {
                Ice.generaExcepcion(e, paso);
            }
            Ice.log('Ice.view.bloque.personas.BuscarPersona.initComponent');
        }
});