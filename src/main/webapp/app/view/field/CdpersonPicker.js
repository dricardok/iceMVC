Ext.define('Ice.view.field.CdpersonPicker', {
    extend: 'Ice.view.componente.ContainerIce',
    xtype: 'cdpersonpicker',
    
    controller: 'cdpersonpickercontroller',

    // config ext
    layout: 'hbox',

    // config no ext
    config  :       {
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        nmsituac: null,
        nmsuplem: null,
        cdrol: null,
        mostrarRol: 'false',
        domicilioSel: null
    },
    
    constructor: function (config) {
        Ice.log('Ice.view.bloque.CdpersonPicker.constructor config:', config);
        var me = this,
            labelLength = 0,
            paso = 'Validando construcci\u00f3n de busqueda de persona';
        try {
            if(config.label && config.label.length) {
                labelLength = config.label.length;
            }
            config.items = [
                {
                    xtype: 'numberfieldice',
                    hidden: true,
                    name: 'cdperson',
                    reference: 'cdperson'
                }, {
                    xtype: 'textfieldice',
                    label: config.label || 'Persona',
                    labelAlign: config.labelAlign || 'top',
                    name: 'dsnombre',
                    reference: 'dsnombre',
                    readOnly: true
                }, {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    style:'margin-top:28px;',
                    scope: me,
                    handler: function () {
                        this.getController().onBuscar();
                    }
                }
            ].concat(config.items || []);

            if (labelLength > 0) {
                config.items[1].labelWidth = labelLength;
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
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
    }
});