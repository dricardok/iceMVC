Ext.define('Ice.view.field.CdagentePicker', {
    extend: 'Ice.view.componente.ContainerIce',
    xtype: 'cdagentepicker',
    
    controller: 'cdagentepickercontroller',

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
        mostrarRol: 'false'
    },
    
    constructor: function (config) {
        Ice.log('Ice.view.field.CdagentePicker.constructor config:', config);
        var me = this,
            labelLength = 0,
            paso = 'Validando construcci\u00f3n de busqueda de agente';
        try {
            if(config.label && config.label.length) {
                labelLength = config.label.length;
            }
            config.items = [
                {
                    xtype: 'numberfieldice',
                    hidden: true,
                    name: 'cdagente',
                    reference: 'cdagente'
                }, {
                    xtype: 'textfieldice',
                    label: config.label || 'Agente',
                    labelAlign: config.labelAlign || 'top',
                    name: 'dsnombre',
                    reference: 'dsnombre',
                    readOnly: true
                }, {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    style:'margin-top: 29px !important; top:29px;',
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

    setValue: function (cdagente) {
        this.getController().onSetValue(cdagente);
    },

    setActiveError: function (param) {
        this.getController().onSetActiveError(param);
    }
});