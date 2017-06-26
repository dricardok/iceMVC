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
        mostrarRol: 'false'
    },
    setValue: function (cdperson) {
        var paso = 'Seteando valores de cdpersonpicker',
            me = this;
        try{
            Ice.log(Ice.query('[name=cdperson]'));
            Ice.log(Ice.query('[name=dsnombre]'));
            var mask = Ice.mask('Recuperando datos de persona');
            Ice.request({
                mascara: 'Agregando situacion de riesgo',
                url: Ice.url.bloque.personas.obtenerPersonaCriterio,
                params: {
                    'params.cdatribu': 'CDPERSON',
                    'params.otvalor': cdperson
                },
                success: function (json) {
                    var paso2 = 'LLenando store';
                    try {
                        Ice.log("json",json.listas);
                        if(json.listas){
                            if(json.listas[0]){
                                var data = json.listas[0];
                                Ice.query('[name=cdperson]', me).setValue(data.cdperson);
                                Ice.query('[name=dsnombre]', me).setValue(data.dsnombre);
                                mask.close();
                            } else {
                                mensajeWarning('No se recibieron datos');
                                mask.close();
                            }
                        }
                    } catch (e) {
                        mask.close();
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    getValue: function () {
        var paso = 'Obteniendo cdperson',
            me = this,
            cdperson = '';
        try{
            cdperson = Ice.query('[name=cdperson]', me).getValue();
        } catch (e){
            Ice.manejaExcepcion(e, paso)
        }
        return cdperson; // jtezva TODO
    },
    getName: function () {
        return 'cdperson'; // jtezva TODO        
    },
    setActiveError: function (param) {
        Ice.mensajeWarning(param);
    },
    constructor: function (config) {
        Ice.log('Ice.view.bloque.CdpersonPicker.constructor config:', config);
        var me = this,
            paso = 'Validando construcci\u00f3n de busqueda de persona';
        me.callParent(arguments);
    },
    initComponent: function () {
        var me = this,
            configIce = me.config, // la configuracion recibida de TCONFSCR
            configTra = {};        // la transformacion en atributos ext (ejemplo: label se pasa a fieldLabel en toolkit classic)
        Ice.log('Ice.view.bloque.CdpersonPicker.initComponent me:', me);
        configTra.items= [
            {
                xtype: 'numberfieldice',
                hidden: true,
                name: 'cdperson',
                reference: 'cdperson'
            },{
                xtype: 'textfieldice',
                hidden: true,
                label: 'Rol',
                reference: 'cdrol',
                name: 'cdrol',
                readOnly: true
            },{
                xtype: 'textfieldice',
                hidden: me.mostrarRol === 'true' ? false : true,
                label: 'Rol',
                reference: 'dsrol',
                name: 'dsrol',
                readOnly: true
            },{
                xtype: 'textfieldice',
                label: configIce.label || 'Persona',
                labelAlign: configIce.labelAlign || 'top',
                name: 'dsnombre',
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
                        listeners: {
                          'obtenerCdperson': function(view, cdperson, cdrol, dsrol, dsnombre){
                              Ice.log('Ice.view.bloque.personas.BusquedaPersonas.cdperson',cdperson, cdrol, dsnombre);
                              Ice.log('items', me.items);
                              me.items.getAt(0).setValue(cdperson);
                              me.items.getAt(1).cdrol = cdrol;
                              me.items.getAt(2).setValue(dsrol);
                              me.items.getAt(3).setValue(dsnombre);
                          }
                      }
                    }).show();
                }
            }
        ];
        
        Ext.apply(me, configTra);
        this.callParent(arguments);
    }
    
});