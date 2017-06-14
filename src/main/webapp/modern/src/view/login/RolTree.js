/**
 * Created by jtezva on 5/15/2017.
 */
Ext.define('Ice.view.login.RolTree', {
    extend: 'Ext.dataview.DataView',
    xtype: 'roltree',
    
    
    // validacion y modificacion de config
    constructor: function (config) {
        Ice.log('Ice.view.login.RolTree.constructor config:', config);
        this.callParent(arguments);
    },
    
    
    // configuracion que no usa config
    controller: 'roltree',
    
    center: true,
    
    store: {
        autoLoad: true,
        fields: [
            'cdsisrol',
            'dssisrol'
        ],
        proxy: {
            type: 'ajax',
            url: Ice.url.core.recuperarRoles,
            reader: {
                type: 'json',
                rootProperty: 'roles',
                successProperty: 'success',
                messageProperty: 'message'
            }
        }
    },
    
    style: 'padding: 30% 0 0 0;background: url(resources/images/BGEasyAlea.jpg); background-repeat: no-repeat; background-size: cover;background-position: 80% 25%; !important;',
    itemTpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="btn_rol_suscriptor thumb-wrap">',
              '<table style="width:100%;" border="0">',
              	'<tr><td></td><td class="txt_btn_rol" style="text-align:left; padding-left:35px; width:100% ">{dssisrol}</td><td class="chev_rol"></td></tr>',
              '</table>',
            '</div>',
        '</tpl>'
    ),
    itemSelector: 'div.thumb-wrap',
    
    listeners: {
        select: 'onSelect'
    },
    
    
    // propiedades no ext (para generar getters y setters)
    config: {},
    
    
    // configuracion que usa config (se encuentra en this)
    initialize: function () {
        Ice.log('Ice.view.login.RolTree.initComponent');
        var me = this,
            paso = 'Contruyendo selector de roles';
        try {
            var secciones = Ice.generaComponentes({
                pantalla: 'ROLTREE',
                seccion: 'ROLTREE'
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});