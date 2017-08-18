Ext.define('Ice.view.bloque.mesacontrol.VentanaRequisitos', {
    extend: 'Ice.view.componente.VentanaIce',
    xtype: 'ventanarequisitos',

    // config ice
    config: {
        flujo: null,
        documentos: null,
        requisitos: null,
        accion: null,
        swconfirm: null
    },

    // config no ice
    scrollable: true,
    platformConfig: {
        desktop: {
            modal: true,
            width: 900,
            height: 500
        }
    },

    bodyPadding: '10 0 0 10',

    constructor: function (config) {
        var me = this,
            paso = 'Construyendo ventana de requisitos';
        try {
            if (Ext.isEmpty(config.numSalidas)) {
                throw 'Falta numSalidas';
            }
            if (Ext.isEmpty(config.faltanDocs)) {
                throw 'Falta faltanDocs';
            }
            if (Ext.isEmpty(config.flujo)) {
                throw 'Falta flujo';
            }
            if (typeof config.documentos.length !== 'number') {
                throw 'Falta documentos';
            }
            if (typeof config.requisitos.length !== 'number') {
                throw 'Falta requisitos';
            }
            if (config.numSalidas === 1 && Ext.isEmpty(config.accion)) {
                throw 'Falta accion';
            }
            config.items = [
                {
                    xtype: 'container',
                    html: '<span style="padding: 0px 10px 10px 0px; border: 0px solid blue;">Favor de revisar los requisitos y documentos obligatorios:<br/>&nbsp;</span>'
                }, {
                    xtype: 'gridice',
                    tipo: 'REQ',
                    margin: '0 10 10 0',
                    platformConfig: {
                        desktop: {
                            selType: 'cellmodel',
                            plugins: [
                                {
                                    ptype: 'cellediting',
                                    clicksToEdit : 1,
                                    listeners : {
                                        beforeedit : function (me2, event) {
                                            Ice.log('DSDATO.editor.beforeedit! args:', arguments);
                                            if ('S' !== event.record.get('SWPIDEDATO') || config.swconfirm === 'S') {
                                                return false;
                                            }
                                        },
                                        edit : function(me2, event) {
                                            var checked = !Ext.isEmpty(event.value) && !Ext.isEmpty(event.value.trim());
                                            me.marcarRequisitoDesdeRevision(event.rowIdx, checked, event.value.trim(),
                                                me.down('#activable'));
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    listeners: {
                        itemdoubletap: function (me2, i, target, rec) {
                            if ('S' !== rec.get('SWPIDEDATO') || config.swconfirm === 'S') {
                                return;
                            }
                            var val = prompt('Nuevo valor', Ice.nvl(rec.get('DSDATO')));
                            if (val !== null) {
                                rec.set('DSDATO',  val);
                                var checked = !Ext.isEmpty(val) && !Ext.isEmpty(val.trim());
                                me.marcarRequisitoDesdeRevision(i, checked, val.trim(),
                                    me.down('#activable'));
                            }
                        }
                    },
                    columns: [
                        {
                            text: 'REQUISITO',
                            dataIndex: 'DESCRIP',
                            flex: 1,
                            minWidth: 200
                        }, {
                            text: 'OBLIGATORIO',
                            dataIndex: 'SWOBLIGA',
                            width: 100,
                            renderer: function (v) {
                                var r = '';
                                if (v === 'S') {
                                    if (Ice.classic()) {
                                        r = '<img src="' + Ice.ruta.iconos + 'lock.png" />';
                                    } else {
                                        r = 'REQ.';
                                    }
                                }
                                return r;
                            }
                        }, {
                            text: 'ESTADO',
                            xtype: 'checkcolumn',
                            headerCheckbox: false,
                            dataIndex: 'CHECK',
                            disabled: config.swconfirm === 'S',
                            width: 80,
                            listeners: {
                                beforecheckchange : function (me2, row, checked, eOpts) {
                                    var win = me,
                                        rec = win.down('grid[tipo=REQ]').getStore().getAt(row);
                                    if ('S' === rec.get('SWPIDEDATO')) {
                                        if (true === checked) {
                                            Ice.mensajeWarning('Para activar esta casilla por favor capture el valor en la columna VALOR');
                                        } else {
                                            Ice.mensajeWarning('Para desactivar esta casilla por favor borre el valor en la columna VALOR');
                                        }
                                        return false;
                                    }
                                },
                                checkchange : function (me2, row, checked) {
                                    me.marcarRequisitoDesdeRevision(row, checked, '',
                                        me.down('#activable'));
                                }
                            }
                        }, {
                            text      : 'SWPIDEDATO',
                            dataIndex : 'SWPIDEDATO',
                            width     : 100,
                            hidden    : true
                        }, {
                            text      : 'VALOR',
                            dataIndex : 'DSDATO',
                            width     : 370,
                            renderer  : function (v, md, rec) {
                                if (Ice.classic()) {
                                    if ('S' !== rec.get('SWPIDEDATO')) {
                                        v = '<span style="font-style : italic;">(N/A)</span>';
                                    } else if (Ext.isEmpty(v) || Ext.isEmpty(v.trim())) {
                                        v = '<span style="font-style : italic;">HAGA CLIC PARA CAPTURAR...</span>';
                                    }
                                }
                                return v;
                            },
                            editor    : {
                                xtype      : 'textfield',
                                itemId     : 'editorRevisiDsdato',
                                minLength  : 1,
                                maxLength  : 100
                            }
                        }
                    ], store : Ext.create('Ext.data.Store', {
                        fields : [
                            'CLAVE', 'DESCRIP', 'SWOBLIGA', 'SWACTIVO', 'CHECK', 'SWPIDEDATO', 'DSDATO'
                        ],
                        data   : config.requisitos
                    })
                }, {
                    xtype   : 'gridice',
                    tipo    : 'DOC',
                    margin  : '0 10 10 0',
                    columns : [
                        {
                            text      : 'DOCUMENTO',
                            dataIndex : 'DESCRIP',
                            flex      : 70,
                            minWidth  : 200
                        }, {
                            text: 'OBLIGATORIO',
                            dataIndex: 'SWOBLIGA',
                            width: 100,
                            renderer: function (v) {
                                var r = '';
                                if (v === 'S') {
                                    if (Ice.classic()) {
                                        r = '<img src="' + Ice.ruta.iconos + 'lock.png" />';
                                    } else {
                                        r = 'REQ.';
                                    }
                                }
                                return r;
                            }
                        }, {
                            text      : 'CARGADO',
                            dataIndex : 'SWACTIVO',
                            width     : 100,
                            renderer  : function (v, md, rec) {
                                if (Ice.modern()) {
                                    rec = md;
                                }
                                var r = '';
                                if (v === 'S') {
                                    if (Ice.classic()) {
                                        r = '<img src="' + Ice.ruta.iconos + 'accept.png" />';
                                    } else {
                                        r = 'OK';
                                    }
                                }
                                else if (rec.get('SWOBLIGA')  === 'S') {
                                    if (Ice.classic()) {
                                        r = '<img src="' + Ice.ruta.iconos + 'cancel.png" />';
                                    }
                                }
                                return r;
                            }
                        }/*, {
                            dataIndex: 'SWACTIVO',
                            width: 30,
                            renderer: function (v, md, rec, row) {
                                var r = '';
                                //if (v !== 'S' || true) {
                                if (json.params.swconfirm !== 'S') {
                                    r = '<a href="#" onclick="subirArchivoDesdeRevision(' + row + '); return false;">' +
                                            '<img src="' + _GLOBAL_DIRECTORIO_ICONOS + 'page_add.png" ' +
                                            'data-qtip="Subir archivo" /></a>';
                                }
                                return r;
                            }
                        }*/
                    ], store : Ext.create('Ext.data.Store', {
                        fields : [
                            'CLAVE', 'DESCRIP', 'SWOBLIGA', 'SWACTIVO'
                        ],
                        data   : config.documentos
                    }),
                    buttons: [{
                        text: 'Cargar',
                        iconCls: 'x-fa fa-upload',
                        hidden: config.swconfirm === 'S',
                        handler: function (boton) {
                            var paso = 'Cargando archivo';
                            try {
                                var grid = boton.up('gridice'),
                                    rec;
                                if (Ice.classic()) {
                                    if (grid.getSelectionModel().getSelection().length === 0) {
                                        throw 'Favor de seleccionar un documento';
                                    }
                                    rec = grid.getSelectionModel().getSelection()[0];
                                } else {
                                    if (Ext.isEmpty(grid.getSelection())) {
                                        throw 'Favor de seleccionar un documento';
                                    }
                                    rec = grid.getSelection();
                                }
                                var venSubDoc = Ext.create({
                                    xtype: 'ventanaice',
                                    padre: me,
                                    title: 'Cargar archivo',
                                    scrollable: true,
                                    platformConfig: {
                                        desktop: {
                                            modal: true
                                        }
                                    },
                                    items: [{
                                        xtype: 'formice',
                                        bodyPadding: '10 0 0 10',
                                        sinToggle: true,
                                        platformConfig: {
                                            '!desktop': {
                                                enableSubmissionForm: false
                                            }
                                        },
                                        items: [
                                            {
                                                xtype: 'textfieldice',
                                                name: 'params.cddocume',
                                                value: rec.get('CLAVE'),
                                                hidden: true
                                            }, {
                                                xtype: 'filefieldice',
                                                name: 'file',
                                                label: 'Archivo',
                                                margin: '0 10 10 0',
                                                width: 300
                                            }
                                        ]
                                    }],
                                    buttons: [
                                        {
                                            text: 'Enviar',
                                            iconCls: 'x-fa fa-save',
                                            handler: function (me) {
                                                var paso = 'Subiendo archivo';
                                                try {
                                                    var ventana = me.up('ventanaice'),
                                                        view = ventana.padre,
                                                        form = ventana.down('formice');
                                                    var mask = Ice.mask();
                                                    form.submit({
                                                        url: Ice.url.bloque.mesacontrol.subirArchivoRequisito,
                                                        timeout: 60000,
                                                        params: {
                                                            'flujo.cdtipflu'  : view.getFlujo().cdtipflu,
                                                            'flujo.cdflujomc' : view.getFlujo().cdflujomc,
                                                            'flujo.tipoent'   : view.getFlujo().tipodest,
                                                            'flujo.claveent'  : view.getFlujo().clavedest,
                                                            'flujo.webid'     : view.getFlujo().webiddest,
                                                            'flujo.aux'       : view.getFlujo().aux,
                                                            'flujo.ntramite'  : view.getFlujo().ntramite,
                                                            'flujo.status'    : view.getFlujo().status,
                                                            'flujo.cdunieco'  : view.getFlujo().cdunieco,
                                                            'flujo.cdramo'    : view.getFlujo().cdramo,
                                                            'flujo.estado'    : view.getFlujo().estado,
                                                            'flujo.nmpoliza'  : view.getFlujo().nmpoliza,
                                                            'flujo.nmsituac'  : view.getFlujo().nmsituac,
                                                            'flujo.nmsuplem'  : view.getFlujo().nmsuplem
                                                        },
                                                        success: function () {
                                                            mask.close();
                                                            ventana.cerrar();
                                                        },
                                                        failure: function () {
                                                            mask.close();
                                                            Ice.mensajeError('Error al subir el archivo');
                                                        }
                                                    });
                                                } catch (e) {
                                                    Ice.manejaExcepcion(e, paso);
                                                }
                                            }
                                        }, {
                                            text: 'Cancelar',
                                            iconCls: 'x-fa fa-close',
                                            handler: function (me) {
                                                me.up('ventanaice').cerrar();
                                            }
                                        }
                                    ]
                                });
                                venSubDoc.on({
                                    close: function (me) {
                                        me.padre.recargar();
                                    }
                                });
                                venSubDoc.mostrar();
                            } catch (e) {
                                Ice.manejaExcepcion(e, paso);
                            }
                        }
                    }]
                }
            ];

            config.buttons = [
                {
                    text      : 'Confirmar y continuar',
                    textOri   : 'Confirmar y continuar',
                    itemId    : 'activable',
                    iconCls   : 'x-fa fa-forward',
                    disabled  : config.numSalidas === 0 || config.faltanDocs === true || config.flujo.aux === 'LECTURA'
                        || config.flujo.aux === 'INICIAL',
                    activable : config.numSalidas > 0 && 'LECTURA' !== config.flujo.aux && 'INICIAL' !== config.flujo.aux,
                    handler   : function (me) {
                        var view = me.up('ventanaice');
                        Ext.Msg.confirm(
                            'Confirmar',
                            'La revisi\u00f3n de requisitos no se podr\u00e1 modificar posteriormente\u0020\u00BFDesea continuar?',
                            function (btn) {
                                if (btn === 'yes') {
                                    var paso = 'Confirmando revisi\u00f3n';
                                    try {
                                        Ice.request({
                                            mascara: paso,
                                            url: Ice.url.bloque.mesacontrol.marcarRevisionConfirmada,
                                            params: {
                                                'params.cdtipflu'  : config.flujo.cdtipflu,
                                                'params.cdflujomc' : config.flujo.cdflujomc,
                                                'params.ntramite'  : config.flujo.ntramite,
                                                'params.cdrevisi'  : config.flujo.clavedest,
                                                'params.swconfirm' : 'S'
                                            },
                                            success: function (json) {
                                                var paso2 = 'Decodificando respuesta al confirmar revisi\u00f3n';
                                                try {
                                                    Ice.log('### confirmar revision:', json);
                                                    Ice.procesaAccion(
                                                        config.flujo.cdtipflu,
                                                        config.flujo.cdflujomc,
                                                        config.accion.TIPODEST,
                                                        config.accion.CLAVEDEST,
                                                        config.accion.WEBIDDEST,
                                                        config.accion.AUX,
                                                        config.flujo.ntramite,
                                                        config.flujo.status,
                                                        config.flujo.cdunieco,
                                                        config.flujo.cdramo,
                                                        config.flujo.estado,
                                                        config.flujo.nmpoliza,
                                                        config.flujo.nmsituac,
                                                        config.flujo.nmsuplem,
                                                        config.flujo.callback
                                                    );
                                                    view.close();
                                                } catch (e) {
                                                    Ice.manejaExcepcion(e, paso2);
                                                }
                                            }
                                        });
                                    } catch (e) {
                                        Ice.manejaExcepcion(e, paso);
                                    }
                                }
                            }
                        );
                    }
                }, {
                    text: 'Documentos',
                    iconCls: 'x-fa fa-copy',
                    handler : function (me) {
                        me = me.up('ventanaice');
                        var winDoc = Ext.create({
                            xtype     : 'ventanadocumentos',
                            cdtipflu  : me.getFlujo().cdtipflu,
                            cdflujomc : me.getFlujo().cdflujomc,
                            tipoent   : me.getFlujo().tipodest,
                            claveent  : me.getFlujo().clavedest,
                            webid     : me.getFlujo().webiddest,
                            aux       : '',// 'INICIAL' === flujo.aux || 'LECTURA' === flujo.aux 
                                                        // ? ''
                                                        // : flujo.aux
                            ntramite : me.getFlujo().ntramite,
                            status   : me.getFlujo().status,
                            cdunieco : me.getFlujo().cdunieco,
                            cdramo   : me.getFlujo().cdramo,
                            estado   : me.getFlujo().estado,
                            nmpoliza : me.getFlujo().nmpoliza,
                            nmsituac : me.getFlujo().nmsituac,
                            nmsuplem : me.getFlujo().nmsuplem
                        }).mostrar();
                        winDoc.on({
                            close : function() {
                                me.recargar();
                            }
                        });
                    }
                }, {
                    text: 'Continuar',
                    iconCls: 'x-fa fa-check',
                    hidden: !(config.numSalidas === 0 || config.faltanDocs === true || config.flujo.aux === 'LECTURA'
                        || config.flujo.aux === 'INICIAL'),
                    handler: function (me) {
                        me.up('ventanaice').cerrar();
                    }
                }, {
                    text: 'Cerrar',
                    iconCls: 'x-fa fa-close',
                    hidden: Ice.classic(),
                    handler: function (me) {
                        me.up('ventanaice').cerrar();
                    }
                }
            ];

            this.callParent(arguments);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },

    recargar: function () {
        Ice.log('>WINDOW_REVISION_DOCUMENTOS recargar');
        var me = this;
        Ice.procesaAccion(
            me.getFlujo().cdtipflu,
            me.getFlujo().cdflujomc,
            me.getFlujo().tipodest,
            me.getFlujo().clavedest,
            me.getFlujo().webiddest,
            me.getFlujo().aux,
            me.getFlujo().ntramite,
            me.getFlujo().status,
            me.getFlujo().cdunieco,
            me.getFlujo().cdramo,
            me.getFlujo().estado,
            me.getFlujo().nmpoliza,
            me.getFlujo().nmsituac,
            me.getFlujo().nmsuplem,
            me.getFlujo().callback
        );
        me.cerrar();
    },

    marcarRequisitoDesdeRevision: function (row, checked, dsdato, botonConfirmar) {
        Ice.log('marcarRequisitoDesdeRevision args:', arguments);
        var paso = 'Marcando requisito desde revisi\u00f3n';
        try {
            var win    = this,
                flujo  = win.getFlujo(),
                record = win.down('grid[tipo=REQ]').getStore().getAt(row);
            Ice.log('flujo:', flujo, 'record:', record);
            Ice.request({
                url: Ice.url.bloque.mesacontrol.marcarRequisitoRevision,
                background: true,
                params: {
                    'params.cdtipflu'  : flujo.cdtipflu,
                    'params.cdflujomc' : flujo.cdflujomc,
                    'params.ntramite'  : flujo.ntramite,
                    'params.cdrequisi' : record.get('CLAVE'),
                    'params.swactivo'  : checked === true ? 'S' : 'N',
                    'params.dsdato'    : dsdato
                },
                success: function (json) {
                    try {
                        if (true !== botonConfirmar.activable) {
                            return;
                        }
                        try {
                            botonConfirmar.setText(botonConfirmar.textOri);
                            clearTimeout(botonConfirmar.funcionActualizarEstado);
                        } catch (e) {}
                        botonConfirmar.setText('Cargando...');
                        botonConfirmar.funcionActualizarEstado = setTimeout(function () {
                            var paso2 = 'Recuperando estado de la lista de comprobaci\u00f3n';
                            try {
                                Ice.request({
                                    url        : Ice.url.bloque.mesacontrol.ejecutarRevision,
                                    background : true,
                                    params     : {
                                        'flujo.cdtipflu'  : flujo.cdtipflu,
                                        'flujo.cdflujomc' : flujo.cdflujomc,
                                        'flujo.tipoent'   : flujo.tipodest,
                                        'flujo.claveent'  : flujo.clavedest,
                                        'flujo.webid'     : flujo.webiddest,
                                        'flujo.ntramite'  : flujo.ntramite,
                                        'flujo.status'    : flujo.status,
                                        'flujo.cdunieco'  : flujo.cdunieco,
                                        'flujo.cdramo'    : flujo.cdramo,
                                        'flujo.estado'    : flujo.estado,
                                        'flujo.nmpoliza'  : flujo.nmpoliza,
                                        'flujo.nmsituac'  : flujo.nmsituac,
                                        'flujo.nmsuplem'  : flujo.nmsuplem
                                    },
                                    success : function (json) {
                                        botonConfirmar.setText(botonConfirmar.textOri);
                                        var paso3 = 'Actualizando estado de la lista de comprobaci\u00f3n';
                                        try {
                                            var faltanDocs = false;
                                            for (var i = 0; i < json.list.length; i++) {
                                                if (json.list[i].SWOBLIGA === 'S' && json.list[i].SWACTIVO !== 'S') {
                                                    faltanDocs = true;
                                                    break;
                                                }
                                            }
                                            if (faltanDocs === false) {
                                                botonConfirmar.enable();
                                            } else {
                                                botonConfirmar.disable();
                                            }
                                        } catch (e) {
                                            Ice.manejaExcepcion(e, paso3);
                                        } 
                                    },
                                    failure : function () {
                                        Ice.logError('callback de error al actualizar estado de checklist');
                                        botonConfirmar.setText(botonConfirmar.textOri);
                                    }
                                });
                            } catch (e) {
                                Ice.manejaExcepcion(e, paso2);
                            }
                        }, 1000);
                    } catch (e) {
                        Ice.logError('Error al actualizar estado del boton de confirmar check', e);
                    }
                }
            });
        } catch(e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});