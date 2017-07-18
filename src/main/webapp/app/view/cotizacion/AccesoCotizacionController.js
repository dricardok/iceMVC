Ext.define('Ice.view.cotizacion.AccesoCotizacionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.accesocotizacion',

    onItemClic: function (view, record) {
        Ice.log('Ice.view.cotizacion.AccesoCotizacionController record:', record);
        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            dataview = refs.dataview,
            paso = 'Creando ventana de selecci\u00f3n de acceso';
        try {
            var ventana = Ext.create('Ice.view.componente.VentanaIce', {
                title: record.get('dstipsit'),
                platformConfig: {
                    desktop: {
                        modal: true,
                        width: 600
                    }
                },
                items: [{
                    xtype: 'formdoscolumnasice',
                    referenceHolder: false,
                    items: [
                        {
                            xtype: 'numberfieldice',
                            label: 'Sucursal',
                            name: 'cdunieco',
                        }, {
                            xtype: 'numberfieldice',
                            label: 'Cotizaci\u00f3n',
                            name: 'nmpoliza'
                        }
                    ],
                    buttons: [
                        {
                            xtype: 'button',
                            text: 'Nueva',
                            iconCls: 'x-fa fa-plus',
                            handler: me.onNuevaClic
                        }, {
                            text: 'Recuperar',
                            iconCls: 'x-fa fa-pencil',
                            handler: me.onCargarClic
                        }, {
                            text: 'Cancelar',
                            iconCls: 'x-fa fa-close',
                            handler: function (btn) {
                                btn.up('ventanaice').cerrar();
                            }
                        }
                    ]
                }]
            });
            ventana.mostrar();
            ventana.record = record;
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    onNuevaClic: function (btn) {
        Ice.log('Ice.view.cotizacion.AccesoCotizacionController.onNuevaClic btn:', btn);
        var paso = 'Dirigiendo a cotizaci\u00f3n';
        try {
            var record = btn.up('ventanaice').record,
                cdramo = record.get('cdramo'),
                cdtipsit = record.get('cdtipsit');
            btn.up('ventanaice').cerrar();
            Ice.query('#mainView').getController().redirectTo('cotizacion.action?' +
                    'cdramo='   + cdramo + '&' +
                    'cdtipsit=' + cdtipsit);
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    onCargarClic: function (btn) {
        Ice.log('Ice.view.cotizacion.AccesoCotizacionController.onCargarClic btn:', btn);
        var paso = 'Recuperando cotizaci\u00f3n';
        try {
            var ventana = btn.up('ventanaice');
            if (!ventana.down('[name=cdunieco]').getValue() || !ventana.down('[name=nmpoliza]').getValue()) {
                throw 'Favor de introducir sucursal y cotizaci\u00f3n';
            }
            var record = ventana.record,
                cdramo = record.get('cdramo'),
                cdtipsit = record.get('cdtipsit'),
                cdunieco = ventana.down('[name=cdunieco]').getValue(),
                nmpoliza = ventana.down('[name=nmpoliza]').getValue();
            ventana.cerrar();
            Ice.query('#mainView').getController().redirectTo('cotizacion.action?' +
                    'cdunieco=' + cdunieco + '&' +
                    'cdramo='   + cdramo   + '&' +
                    'estado='   + 'W'      + '&' +
                    'nmpoliza=' + nmpoliza + '&' +
                    'cdtipsit=' + cdtipsit + '&' +
                    'nmsuplem=' + 0);
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});