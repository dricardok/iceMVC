Ext.define('Ice.view.field.CdpersonPicker', {
    extend: 'Ext.container.Container',
    xtype: 'cdpersonpicker',
    
    layout: 'hbox',
    config  :       {
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        nmsituac: null,
        nmsuplem: null,
        cdrol: null,
        mostrarRol: 'true'
//        cdperson: null
    },
    constructor: function (config) {
        Ice.log('Ice.view.bloque.CdpersonPicker.constructor config:', config);
        var me = this,
            paso = 'Validando construcci\u00f3n de busqueda de persona';
        me.callParent(arguments);
    },
    initComponent: function () {
        var me = this,
//            view = me.getView(),
//            refs = view.getReferences(),
            configIce = me.config, // la configuracion recibida de TCONFSCR
            configTra = {};        // la transformacion en atributos ext (ejemplo: label se pasa a fieldLabel en toolkit classic)
        Ice.log('Ice.view.bloque.CdpersonPicker.initComponent me:', me);
        configTra.items= [
            {
                xtype: 'numberfieldice',
                hidden: true,
                reference: 'cdperson'
            },{
                xtype: 'textfieldice',
                hidden: me.mostrarRol === 'true' ? false : true,
                label: 'Rol',
                reference: 'cdrol',
                readOnly: true
            },{
                xtype: 'textfieldice',
                label: configIce.label || 'Persona',
                labelAlign: configIce.labelAlign || 'top',
                reference: 'dsnombre',
                readOnly: true
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-search',
                scope: me,
                handler: function(){
                    Ice.log('refs search',me);
                    Ext.create('Ice.view.bloque.personas.BuscarPersona',{
                        width: 600,
                        heigth: 500,
                        modal: true,
                        closable: false,
                        closeAction: 'destroy',
                        cdunieco: me.getCdunieco(),
                        cdramo: me.mostrarRol === 'true' ? me.value1 : '-1',
                        estado: me.getEstado(),
                        nmpoliza: me.getNmpoliza(),
                        nmsituac: me.getNmsituac(),
                        nmsuplem: me.getNmsuplem(),
                        cdrol: me.getCdrol(),
//                        cdperson: me.getCdperson(),
                        listeners: {
                          'obtenerCdperson': function(view, cdperson, cdrol, dsrol, dsnombre){
                              Ice.log('Ice.view.bloque.personas.BusquedaPersonas.cdperson',cdperson, cdrol, dsnombre);
                              Ice.log('items', me.items);
                              me.items.getAt(0).setValue(cdperson);
                              me.items.getAt(1).cdrol = cdrol;
                              me.items.getAt(1).setValue(dsrol);
                              me.items.getAt(2).setValue(dsnombre);
                          }
                      }
                    }).show();
//                    Ice.log('busquedaPersona cdramo',me);
//                    Ext.create('Ice.view.bloque.personas.BuscarPersona',{
//                        title: 'Busqueda de persona',
//                        modal: true,
//                        cdramo: me.getCdramo(),
//                        closable: true,
//                        width: 500,
//                        heigth: 600,
//                        closeAction: 'destroy',
//                        listeners: {
//                            'obtenerCdperson': function(view, cdperson, dsnombre){
//                                Ice.log('Ice.view.bloque.personas.BusquedaPersonas.cdperson',cdperson, dsnombre);
//                                Ice.log('items', me.items);
//                                me.items.getAt(0).setValue(cdperson);
//                                me.items.getAt(1).setValue(dsnombre);
//                            }
//                        }
//                    }).show();
//                    
//                    busquedaWin.show();
                }
            }
        ];
        
        Ext.apply(me, configTra);
        this.callParent(arguments);
    }
    
});