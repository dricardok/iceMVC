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
            configTra = {}, // la transformacion en atributos ext (ejemplo: label se pasa a fieldLabel en toolkit classic)
            labelLength = 0;
        Ice.log('Ice.view.bloque.CdpersonPicker.initComponent me:', me);
        if(configIce.label){
            if(configIce.label.length){
                labelLength = configIce.label.length;
            }
        }
        configTra.items= [
            {
                xtype: 'numberfieldice',
                hidden: true,
                name: 'cdperson',
                reference: 'cdperson'
            },{
                xtype: 'textfieldice',
                minWidth: 300,
                label: configIce.label || 'Persona',
                labelWidth: labelLength === 0 ? 50  : labelLength,
                labelAlign: configIce.labelAlign || 'top',
                margin: '0 5 0 0',
                name: 'dsnombre',
                reference: 'dsnombre',
                readOnly: true
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-search',
                minWidth: 30,
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