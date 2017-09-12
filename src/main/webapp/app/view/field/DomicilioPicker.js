Ext.define('Ice.view.field.DomicilioPicker', {
    extend: 'Ice.view.componente.ContainerIce',
    xtype: 'domiciliopicker',

    controller: 'domiciliopicker',

    // config ext
    platformConfig: {
        desktop: {
            modal: true
        },
        '!desktop': {
            layout: 'fit'
        }
    },

    // config no ext
    config: {
        modulo: null,
        auxkey: null
    },

    constructor: function (config) {
        Ice.log('Ice.view.field.DomicilioPicker.constructor config:', config);
        var me = this,
            paso = 'Construyendo ventana de perfilamiento';
        try {
            if (!config) {
                throw 'No hay par\u00e1metros para construir ventana de perfilamiento';
            }

            config.modulo = config.modulo || 'COTIZACION';
            config.auxkey = config.auxkey || '';

            var camposPicker = [
                {
                    xtype: 'textfieldice',
                    label: config.label || 'Domicilio',
                    labelAlign: config.labelAlign || 'top',
                    name: config.name || 'dsdomici',
                    reference: 'otvalor15',
                    readOnly: true,
                    allowBlank: false
                },{
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    style:'margin-top: -42px !important; margin-left: 169px;',
                    scope: me,
                    handler: function () {
                        this.getController().onBuscar();
                    }
                }
            ];

            config.items = camposPicker;

        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },
    setActiveError: function (param) {
        this.getController().onSetActiveError(param);
    },
    getValue: function () {
        return this.getController().onGetValue();
    },

    getName: function () {
        return this.getController().onGetName();        
    },

    setValue: function (cdagente) {
        this.getController().onSetValue(cdagente);
    }
});