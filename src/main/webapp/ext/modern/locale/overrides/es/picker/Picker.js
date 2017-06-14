Ext.define("Ext.locale.es.picker.Picker", {
    override: "Ext.picker.Picker",
    initialize: function () {
        this.callParent(arguments);
        this.setCancelButton('Cancelar');
        this.setDoneButton('Aceptar');
    }
});
