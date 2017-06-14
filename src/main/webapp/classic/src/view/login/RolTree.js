/**
 * Created by jtezva on 5/15/2017.
 */
Ext.define('Ice.view.login.RolTree', {
    extend: 'Ext.view.View',
    xtype: 'roltree',
    
    
    // validacion y modificacion de config
    constructor: function (config) {
        Ice.log('Ice.view.login.RolTree.constructor config:', config);
        this.callParent(arguments);
    },
    
    
    // configuracion que no usa config
    controller: 'roltree',
    
    style: 'padding: 100px 0px 0px 20px; background: url(resources/images/BGEasyAlea.jpg); background-repeat: no-repeat; background-size: cover;background-position: 10% 25%; !important;',
    tpl: new Ext.XTemplate(
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
    initComponent: function () {
        Ice.log('Ice.view.login.RolTree.initComponent');
        var me = this,
            paso = 'Contruyendo selector de roles';
        try {
            var secciones = Ice.generaComponentes({
                pantalla: 'ROLTREE',
                seccion: 'ROLTREE'
            });
            Ext.apply(me, {
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
                    },
                    padre: me,
                    listeners: {
                        load: function (store, records, success) {
                            if (success && records.length === 1) {
                                store.padre.select(records[0]);
                            }
                        }
                    }
                }
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});