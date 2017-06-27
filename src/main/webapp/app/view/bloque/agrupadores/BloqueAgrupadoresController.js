Ext.define('Ice.view.bloque.agrupadores.BloqueAgrupadoresController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bloqueagrupadores',
    
    onAgrupadorModificado: function () {
        Ice.log('controller.bloqueagrupadores.onAgrupadorModificado');
        var me = this,
            refs = me.getReferences(),
            paso = 'Actualizando selector de agrupadores';
        try {
            refs.panelsituacionesagrupador.getController().cargarCombo();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});