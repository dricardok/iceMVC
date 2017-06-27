Ext.define('Ice.view.field.CdpersonPicker', {
    extend: 'Ext.container.Container',
    xtype: 'cdpersonpicker',
    
    controller: 'cdpersonpickercontroller',
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
    getValue: function () {
        return this.getController().onGetValue();
    },
    getName: function () {
        return this.getController().onGetName();        
    },
    setValue: function (cdperson) {
        this.getController().onSetValue(cdperson);
    },
    setActiveError: function (param) {
        this.getController().onSetActiveError(param);
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
                    this.getController().onBuscar();
                }
            }
        ];
        
        Ext.apply(me, configTra);
        this.callParent(arguments);
    }
    
});