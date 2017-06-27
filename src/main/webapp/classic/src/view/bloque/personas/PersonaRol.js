/**
 * 
 */
Ext.define('Ice.view.bloque.personas.PersonaRol', {
    extend: 'Ext.panel.Panel',
    xtype: 'cdpersoncdrol',
    
    config: {
        cdramo: null,
        cdrol: null
    },
    constructor: function (config) {
        Ice.log('Ice.view.bloque.PersonaRol.constructor config:', config);
        var me = this,
            paso = 'Validando construcci\u00f3n de busqueda de persona';
        try {
            if (!config) {
                throw 'No hay datos para lista de personas';
            }
            
            if (!config.cdramo) {
                throw 'Falta ramo para persona por rol';
            }
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.PersonaRol.constructor');
        me.callParent(arguments);
    },
    initComponent: function () {
        Ice.log('Ice.view.bloque.personas.PersonaPoliza.initComponent [this, args]:', this, arguments);
        var me = this,
            paso = 'Construyendo panel persona con rol';
        try{
            Ice.log('Ice.view.bloque.personas.BuscarPersona.refs:', me.cdramo);
            var comps = Ice.generaComponentes({
                pantalla: 'PERSONA_ROL',
                seccion: 'FORMULARIO',
                modulo: me.modulo || '',
                estatus: (me.flujo && me.flujo.estatus) || '',
                cdramo: me.cdramo,
                cdtipsit: me.cdtipsit ||'',
                auxKey: me.auxkey || '',
                items: true
            });
            var modelName = Ext.id();
            Ice.log('Ice.view.bloque.personas.BuscarPersona.initComponent comps:', comps);
            Ext.apply(me, {
                items: [
                    {
                      xtype: 'form',
                      reference: 'form',
                      title: 'Buscar persona',
                      cdramo: me.cdramo,
                      mostrarRol: true,
                      items: comps.PERSONA_ROL.FORMULARIO.items,
                      modelo: modelName,
                      layout: 'responsivecolumn',
                      width: '100%',
                      bodyPadding: '10px 0px 0px 10px',
                      defaults: {
                          margin: '0px 10px 10px 0px',
                          cls: 'big-50 small-100'
                      }
                  }
                ]
            });
            me.callParent(arguments);
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
    }
});