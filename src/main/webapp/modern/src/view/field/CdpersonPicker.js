Ext.define('Ice.view.field.CdpersonPicker', {
    extend: 'Ext.Container',
    xtype: 'cdpersonpicker',
    
    controller: 'cdpersonpickercontroller',
    layout: 'vbox',
    scrollable: true,
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
        Ice.log('Ice.view.bloque.CdpersonPicker.constructor config:');
        var me = this,
            paso = 'Validando construcci\u00f3n de busqueda de persona';
        try{
            Ice.log('Ice.view.bloque.CdpersonPicker.initialize me:', me);
            config.buttons = [
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    scope: me,
                    handler: function(){
                        this.getController().onBuscar();
                    }
                }
            ];
            
            config.items= [
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
                    label: config.label || 'Persona',
                    labelAlign: config.labelAlign || 'top',
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
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
        
        me.callParent(arguments);
    }    
});