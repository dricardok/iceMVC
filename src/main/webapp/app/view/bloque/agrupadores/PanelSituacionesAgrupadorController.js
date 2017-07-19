Ext.define('Ice.view.bloque.agrupadores.PanelSituacionesAgrupadorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.panelsituacionesagrupador',
    
    onItemClic: function (gridSituacionesAgrupador, record) {
        Ice.log('controller.panelsituacionesagrupador.onItemClic args:', arguments);
        var me = this,
            refs = me.getReferences(),
            paso = 'Cargando formulario de agrupador de situaci\u00f3n';
        try {
            refs.comboagrupador.enable();
            refs.botonguardar.enable();
            refs.comboagrupador.setValue(record.get('cdagrupa'));
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onGuardarClic: function (boton) {
        var me = this,
            refs = me.getReferences(),
            paso = 'Guardando agrupador';
        try {
            if (Ext.manifest.toolkit === 'classic') {
                if (!refs.comboagrupador.isValid()) {
                    return;
                }
            } else {
                if (!refs.comboagrupador.getValue()) {
                    return Ice.mensajeWarning('Favor de seleccionar el agrupador');
                }
            }
            var record;
            if (Ext.manifest.toolkit === 'classic') {
                record = refs.gridsituacionesagrupador.getSelectionModel().getSelection()[0];
            } else {
                record = refs.gridsituacionesagrupador.getSelection();
            }
            var valores = {
                    cdunieco: record.get('cdunieco'),
                    cdramo: record.get('cdramo'),
                    estado: record.get('estado'),
                    nmpoliza: record.get('nmpoliza'),
                    nmsituac: record.get('nmsituac'),
                    nmsuplem: record.get('nmsuplem'),
                    status: record.get('status'),
                    cdagrupa: refs.comboagrupador.getValue(),
                    accion: 'U'
                };
            Ice.log('valores:', valores);
            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.situacionesRiesgo.movimientoMpolisit,
                params: Ice.convertirAParams(valores),
                success: function (action) {
                    refs.comboagrupador.disable();
                    refs.botonguardar.disable();
                    refs.gridsituacionesagrupador.getStore().reload();
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    cargarCombo: function () {
        this.getReferences().comboagrupador.getStore().reload();
    }
});