/**
 * 
 */
Ext.define('Ice.view.bloque.personas.PersonaRolOld', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'cdpersoncdrolold',
    
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
    initialize: function () {
        Ice.log('Ice.view.bloque.personas.PersonaPoliza.initComponent [this, args]:', this, arguments);
        var me = this,
            paso = 'Construyendo panel persona con rol';
        try{
            Ice.log('Ice.view.bloque.personas.BuscarPersona.refs:', me.cdramo);
            var comps = Ice.generaComponentes({
                pantalla: 'PERSONA_ROL',
                seccion: 'FORMULARIO',
                cdramo: me.getCdramo(),
                items: true
            });
            var modelName = Ext.id();
            Ice.log('Ice.view.bloque.personas.BuscarPersona.initComponent comps:', comps);
            me.add({
                items: [
                    {
                        xtype: 'formpanel',
                        reference: 'form',
                        title: 'Buscar persona',
                        minWidth: 850,
                        cdramo: me.getCdramo(),
                        mostrarRol: true,
                        items: comps.PERSONA_ROL.FORMULARIO.items,
                        modelo: modelName,
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