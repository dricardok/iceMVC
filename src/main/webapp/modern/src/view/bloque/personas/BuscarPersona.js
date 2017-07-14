Ext.define('Ice.view.bloque.personas.BuscarPersona', {  
    extend: 'Ice.view.componente.VentanaIce',
    xtype: 'buscarpersona',
    controller: 'buscarpersona',
    
    layout: 'vbox',
    scrollable: true,
    height: 600,
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
    bodyPadding: '10px 0px 0px 10px',
    constructor: function (config) {
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
                            
            config.items = [
                {
                    xtype: 'formpanel',
                    title: 'Buscar persona',
                    reference: 'formBusquedaPersonas',
                    items: comps.BUSQUEDA_PERSONA.FORMULARIO.items,
                    modelo: modelName,
                    height: 200,
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
                    xtype: 'toolbar',
                    items: [
                        {
                            text: 'Buscar',
                            handler: 'onBuscar'
                        }
                    ]
                },{
                    xtype: 'gridice',
                    scrollable: true,
                    reference: 'gridPersonas',
                    height: 200,
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
                    xtype: 'toolbar',
                    height: 100,
                    items: [
                        {
                            reference: 'btnGuardar',
                            text: 'Guardar',
                            handler: 'onGuardar'
                        },{
                            reference: 'btnNuevo',
                            hidden: me.cdramo === '-1' ? true : false,
                            text: 'Nuevo',
                            handler: 'onNuevo'
                        },{
                            xtype: 'button',
                            handler: function(){
                                this.up('window').close();
                            }
                        }      
                    ]
                }
            ];
//                            ,{
//                              xtype: 'gridice',
//                              reference: 'gridPersonas',
//                              scrollable: true,
//                              columns: compsGrid.BUSQUEDA_PERSONA.GRID.columns,
//                              store: {
//                                  autoLoad: false,
//                                  fields: compsGrid.BUSQUEDA_PERSONA.GRID.fields,
//                                  proxy: {
//                                      type: 'ajax',
//                                      timeout: 45000,
//                                      url: Ice.url.bloque.personas.obtenerPersonaCriterio,
//                                      reader: {
//                                          type: 'json',
//                                          rootProperty: 'listas',
//                                          successProperty: 'success',
//                                          messageProperty: 'message'
//                                      }
//                                  }                               
//                              },
//                              items: {
//                                  xtype: 'toolbar',
//                                  docked: 'top',
//                                  items: [
//                                      {
//                                          xtype: 'button',
//                                          reference: 'btnGuardar',
//                                          text: 'Guardar',
//                                          handler: 'onGuardar'
//                                      },{
//                                          xtype: 'button',
//                                          reference: 'btnNuevo',
//                                          hidden: me.cdramo === '-1' ? true : false,
//                                          text: 'Nuevo',
//                                          handler: 'onNuevo'
//                                      },{
//                                          xtype: 'button',
//                                          handler: function(){
//                                              this.up('window').close();
//                                          }
//                                      }                              
//                                  ]
//                              }
//                          },{
//                              buttons: [
//                                  {
//                                      xtype: 'button',
//                                      reference: 'btnGuardar',
//                                      text: 'Guardar',
//                                      handler: 'onGuardar'
//                                  },{
//                                      xtype: 'button',
//                                      reference: 'btnNuevo',
//                                      hidden: me.cdramo === '-1' ? true : false,
//                                      text: 'Nuevo',
//                                      handler: 'onNuevo'
//                                  },{
//                                      xtype: 'button',
//                                      handler: function(){
//                                          this.up('window').close();
//                                      }
//                                  }
//                              ]
//                          }
            // construir componente
            me.callParent(arguments);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.personas.BuscarPersona.initComponent');
    }
});