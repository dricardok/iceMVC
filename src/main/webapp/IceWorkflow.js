// var Ice = Object.assign(Ice || {}, { // (Object.assign da error en explorer)
var Ice = (
        // funcion anonima para mezclar (reemplaza a Object.assign)
        function () {
            var resObj = {};
            for(var i = 0; i < arguments.length; i++) {
                var obj = arguments[i],
                    keys = Object.keys(obj);
                for (var j = 0; j < keys.length; j++) {
                    resObj[keys[j]] = obj[keys[j]];
                }
            }
            return resObj;
        }
    )(Ice || {}, {
    
    /**
     * Recupera las acciones relacionadas a una entidad.
     * La entidad se define por flujo (cdtipflu, cdflujomc), tipo (E, P, C, O, V, R, M) clave y su webid.
     * Ejecuta el callback enviando la lista [] de acciones
     */
    cargarAccionesEntidad: function (cdtipflu, cdflujomc, tipoent, cdentidad, webid, callback) {
        Ice.log('Ice.cargarAccionesEntidad args:', arguments);
        var paso = 'Recuperando acciones de entidad';
        try {
            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.mesacontrol.cargarAccionesEntidad,
                params: {
                    'params.cdtipflu'  : cdtipflu,
                    'params.cdflujomc' : cdflujomc,
                    'params.tipoent'   : tipoent,
                    'params.cdentidad' : cdentidad,
                    'params.webid'     : webid
                },
                success: function (action) {
                    var paso = 'Ejecutando callback posterior a recuperar acciones de entidad';
                    try {
                        callback(action.list);
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso);
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    /**
     * Al presionar un boton de flujo
     */
    botonEntidadClic: function (me) {
        Ice.log('Ice.botonEntidadClic me:', me);
        var paso = 'Procesando clic en bot\u00f3n de flujo';
        try {
            var f = me.flujo;
            Ice.procesaAccion(f);
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    /**
     * Procesa una conexion entre entidades
     */
    procesaAccion: function (cdtipflu, cdflujomc, tipodest, clavedest, webiddest, aux, ntramite, status, cdunieco,
        cdramo, estado, nmpoliza, nmsituac, nmsuplem, callback){
        Ice.log('Ice.procesaAccion args:', arguments);
        var flujo,
            paso = 'Procesando acci\u00f3n';
        try {
            // se recibe el objeto flujo en el primer parametro
            if (typeof cdtipflu === 'object') {
                flujo = cdtipflu;
                ntramite  = flujo.ntramite;
                status    = flujo.status;
                cdtipflu  = flujo.cdtipflu;
                cdflujomc = flujo.cdflujomc;
                webiddest = flujo.webid;
                tipodest  = flujo.tipoent;
                clavedest = flujo.claveent;
                cdunieco  = flujo.cdunieco;
                cdramo    = flujo.cdramo;
                estado    = flujo.estado;
                nmpoliza  = flujo.nmpoliza;
                nmsituac  = flujo.nmsituac;
                nmsuplem  = flujo.nmsuplem;
                aux       = flujo.aux;
                callback  = flujo.callback;
            }

            Ice.log('Ice.procesaAccion ntramite:', ntramite, 'status:', status, 'cdtipflu:', cdtipflu, 'cdflujomc:', cdflujomc,
                'webiddest:', webiddest);
            Ice.log('Ice.procesaAccion tipodest:', tipodest, 'clavedest:', clavedest, 'cdunieco:', cdunieco, 'cdramo:', cdramo,
                'estado:', estado);
            Ice.log('Ice.procesaAccion nmpoliza:', nmpoliza, 'nmsituac:', nmsituac, 'nmsuplem:', nmsuplem, 'aux:', aux,
                'callback:', callback);

            /*
            if (tipodest ==='E') {
                ck = 'Recuperando valores de status';
                Ice.request({
                    mascara: ck,
                    url: Ice.url.core.recuperacionSimple,
                    params: {
                        'params.consulta': 'RECUPERAR_TFLUEST',
                        'params.cdtipflu': cdtipflu,
                        'params.cdflujomc': cdflujomc
                        //,'params.cdestadomc' : clavedest
                    },
                    success : function(json){
                        var ck = 'Decodificando respuesta al recuperar valores de status';
                        try{
                            var estadoOld, estadoNew;
                            for(var i=0; i < json.list.length; i++){
                                var estadoIte = json.list[i];
                                if(Number(estadoIte.CDESTADOMC)==Number(status)){
                                    estadoOld = {
                                        CDTIPASIG : ''+estadoIte.CDTIPASIG
                                    };
                                }
                                if(Number(estadoIte.CDESTADOMC)==Number(clavedest)){
                                    estadoNew = {
                                        CDTIPASIG : ''+estadoIte.CDTIPASIG
                                    };
                                }
                            }
                            
                            if(Ext.isEmpty(estadoOld)||Ext.isEmpty(estadoNew)){
                                throw 'No se encuentran los status de turnado';
                            }
                            
                            ck = 'Turnando tr\u00e1mite';
                            Ice.mask(ck);
                            Ext.Ajax.request({
                                url: Ice.url.bloque.mesacontrol.turnar,
                                params: {
                                    'params.ntramite': ntramite,
                                    'params.statusOld': status,
                                    'params.cdtipasigOld': estadoOld.CDTIPASIG,
                                    'params.statusNew': clavedest,
                                    'params.cdtipasigNew': estadoNew.CDTIPASIG
                                },
                                success : function(response){
                                    _unmask();
                                    var ck = 'Decodificando respuesta al turnar tr\u00e1mite';
                                    try{
                                        var json = Ext.decode(response.responseText);
                                        Ice.log('### turnar:',json);
                                        if(json.success == true){
                                            mensajeCorrecto('Tr\u00e1mite turnado',json.message,callback);
                                        } else {
                                            mensajeError(json.message);
                                        }
                                    } catch(e) {
                                        Ice.manejaExcepcion(e,ck);
                                    }
                                },
                                failure : function(){
                                    _unmask();
                                    errorComunicacion(null,'Error al turnar tr\u00e1mite');
                                }
                            });
                        } catch(e) {
                            Ice.manejaExcepcion(e,ck);
                        }
                    }
                });
            } else
            */
            if (tipodest === 'P') {
                paso = 'Recuperando valores de pantalla';
                Ice.request({
                    mascara: paso,
                    url: Ice.url.core.recuperacionSimple,
                    params: {
                        'params.consulta': 'RECUPERAR_TPANTMC',
                        'params.CDPANTMC': clavedest
                    },
                    success: function(json){
                        var paso2 = 'Decodificando respuesta al recuperar valores de pantalla';
                        try {
                            if (json.list.length === 0) {
                                throw 'La pantalla no existe';
                            } else if (json.list.length > 1) {
                                throw 'Pantalla duplicada';
                            }
                            var pantalla = json.list[0];
                            Ice.log('pantalla:',pantalla);
                            paso2 = 'Enviando petici\u00f3n';
                            // Ice.mask('Redireccionando');
                            // Ext.create('Ext.form.Panel').submit({
                            var url = Ice.nvl(pantalla.SWEXTERNA,'N') == 'N'
                                    ? pantalla.URLPANTMC :
                                    Ice.url.bloque.mesacontrol.pantallaExterna;
                            url = url + 
                                // standardSubmit: true,
                                //,target         : '_top'
                                // params: {
                                '?flujo.cdtipflu='  + Ice.nvl(cdtipflu)  +
                                '&flujo.cdflujomc=' + Ice.nvl(cdflujomc) +
                                '&flujo.tipoent='   + Ice.nvl(tipodest)  +
                                '&flujo.claveent='  + Ice.nvl(clavedest) +
                                '&flujo.webid='     + Ice.nvl(webiddest) +
                                '&flujo.ntramite='  + Ice.nvl(ntramite)  +
                                '&flujo.status='    + Ice.nvl(status)    +
                                '&flujo.cdunieco='  + Ice.nvl(cdunieco)  +
                                '&flujo.cdramo='    + Ice.nvl(cdramo)    +
                                '&flujo.estado='    + Ice.nvl(estado)    +
                                '&flujo.nmpoliza='  + Ice.nvl(nmpoliza)  +
                                '&flujo.nmsituac='  + Ice.nvl(nmsituac)  +
                                '&flujo.nmsuplem='  + Ice.nvl(nmsuplem)  +
                                '&flujo.aux='       + Ice.nvl(aux)       +
                                '&params.url='      + (Ice.nvl(pantalla.SWEXTERNA,'N') === 'N'
                                    ? ''
                                    : pantalla.URLPANTMC);
                            //     }
                            // });
                            Ice.cerrarVentanas();
                            Ice.redirect(url);
                        } catch(e) {
                            Ice.manejaExcepcion(e,ck);
                        }
                    }
                });
            } else if (tipodest === 'C') {
                paso = 'Recuperando valores de componente';
                Ice.request({
                    mascara: paso,
                    url: Ice.url.core.recuperacionSimple,
                    params: {
                        'params.consulta': 'RECUPERAR_TCOMPMC',
                        'params.CDCOMPMC': clavedest
                    },
                    success : function (json){
                        var paso2 = 'Procesando componente';
                        try {
                            if(json.list.length == 0) {
                                throw 'El componente no existe';
                            } else if(json.list.length > 1) {
                                throw 'Componente duplicado';
                            }
                            var compData = json.list[0];
                            Ice.log('compData:',compData);
                            
                            paso2 = 'Creando componente';
                            // Ext.syncRequire(_GLOBAL_DIRECTORIO_DEFINES+compData.NOMCOMP);
                            Ext.create({
                                xtype: compData.NOMCOMP,
                                flujo: {
                                    ntramite  : ntramite,
                                    status    : status,
                                    cdtipflu  : cdtipflu,
                                    cdflujomc : cdflujomc,

                                    tipoent   : tipodest,
                                    claveent  : clavedest,
                                    webid     : webiddest,

                                    cdunieco  : cdunieco,
                                    cdramo    : cdramo,
                                    estado    : estado,
                                    nmpoliza  : nmpoliza,
                                    nmsituac  : nmsituac,
                                    nmsuplem  : nmsuplem,
                                    
                                    aux       : aux
                                }
                            }).mostrar();
                        } catch(e) {
                            Ice.manejaExcepcion(e, paso2);
                        }
                    }
                });
            } else if (tipodest === 'O') {
                paso = 'Recuperando valores de servicio';
                Ice.request({
                    mascara : paso,
                    url     : Ice.url.core.recuperacionSimple,
                    params  : {
                        'params.consulta'  : 'RECUPERAR_TPROCMC',
                        'params.CDPROCMC' : clavedest
                    },
                    success : function (json){
                        var paso2 = 'Decodificando respuesta al recuperar valores de servicio';
                        try{
                            if (json.list.length === 0) {
                                throw 'El servicio no existe';
                            } else if (json.list.length > 1) {
                                throw 'Servicio duplicado';
                            }
                            var data = json.list[0];
                            Ice.log('data:',data);
                            
                            paso2 = 'Recuperando acciones posteriores al servicio';
                            Ice.cargarAccionesEntidad(cdtipflu, cdflujomc, tipodest, clavedest, webiddest, function (list){
                                var paso3 = 'Procesando acciones posteriores al servicio';
                                try {
                                    var numSalidas = 0,
                                        accion1    = '',
                                        accion2    = '',
                                        accExito   = '',
                                        accError   = '';
                                    if (list.length == 1) {
                                        numSalidas = 1;
                                        accion1    = list[0];
                                    } else if (list.length == 2) {
                                        numSalidas = 2;
                                        accion1    = list[0];
                                        accion2    = list[1];
                                        
                                        if (Ice.nvl(accion1.CDVALOR, '') === 'EXITO') {
                                            accExito = accion1;
                                        } else if (Ice.nvl(accion2.CDVALOR, '') === 'EXITO') {
                                            accExito = accion2;
                                        }

                                        if (Ice.nvl(accion1.CDVALOR, '') === 'ERROR') {
                                            accError = accion1;
                                        } else if (Ice.nvl(accion2.CDVALOR, '') === 'ERROR') {
                                            accError = accion2;
                                        }
                                        
                                        if (Ext.isEmpty(accExito) || Ext.isEmpty(accError)) {
                                            throw 'Las acciones relacionadas al servicio no tienen el valor EXITO/ERROR adecuado';
                                        }
                                    } else if(list.length > 2) {
                                        throw 'El servicio tiene demasiadas acciones relacionadas';
                                    }
                                    
                                    paso3 = 'Invocando servicio';
                                    Ice.request({
                                        mascara : paso3,
                                        url     : data.URLPROCMC,
                                        params  : {
                                            'flujo.cdtipflu'  : cdtipflu,
                                            'flujo.cdflujomc' : cdflujomc,
                                            'flujo.tipoent'   : tipodest,
                                            'flujo.claveent'  : clavedest,
                                            'flujo.webid'     : webiddest,
                                            'flujo.ntramite'  : ntramite,
                                            'flujo.status'    : status,
                                            'flujo.cdunieco'  : cdunieco,
                                            'flujo.cdramo'    : cdramo,
                                            'flujo.estado'    : estado,
                                            'flujo.nmpoliza'  : nmpoliza,
                                            'flujo.nmsituac'  : nmsituac,
                                            'flujo.nmsuplem'  : nmsuplem,
                                            'flujo.aux'       : aux
                                        },
                                        success : function (json){
                                            var paso4 = 'Procesando acci\u00f3n posterior al servicio';
                                            try {
                                                Ice.log('### proceso:', json);
                                                if (numSalidas === 0) {
                                                    Ice.mensajeCorrecto({
                                                        titulo: 'AVISO',
                                                        mensaje: json.message,
                                                        callback: callback
                                                    });
                                                } else if (numSalidas === 1) {
                                                    Ice.procesaAccion(
                                                        cdtipflu,
                                                        cdflujomc,
                                                        accion1.TIPODEST,
                                                        accion1.CLAVEDEST,
                                                        accion1.WEBIDDEST,
                                                        aux,
                                                        ntramite,
                                                        status,
                                                        cdunieco,
                                                        cdramo,
                                                        estado,
                                                        nmpoliza,
                                                        nmsituac,
                                                        nmsuplem,
                                                        callback
                                                    );
                                                } else if (numSalidas === 2) {
                                                    Ice.procesaAccion(
                                                        cdtipflu,
                                                        cdflujomc,
                                                        accExito.TIPODEST,
                                                        accExito.CLAVEDEST,
                                                        accExito.WEBIDDEST,
                                                        aux,
                                                        ntramite,
                                                        status,
                                                        cdunieco,
                                                        cdramo,
                                                        estado,
                                                        nmpoliza,
                                                        nmsituac,
                                                        nmsuplem,
                                                        callback
                                                    );
                                                }
                                            } catch (e) {
                                                if (numSalidas < 2) {
                                                    Ice.manejaExcepcion(e, paso4);
                                                } else {
                                                    Ice.logError(e);
                                                    Ice.mensajeError({
                                                        mensaje: 'Error al manejar respuesta de servicio',
                                                        callback: function () {
                                                            Ice.procesaAccion(
                                                                cdtipflu,
                                                                cdflujomc,
                                                                accError.TIPODEST,
                                                                accError.CLAVEDEST,
                                                                accError.WEBIDDEST,
                                                                aux,
                                                                ntramite,
                                                                status,
                                                                cdunieco,
                                                                cdramo,
                                                                estado,
                                                                nmpoliza,
                                                                nmsituac,
                                                                nmsuplem,
                                                                callback
                                                            );
                                                        }
                                                    });
                                                }
                                            }
                                        },
                                        failure: function () {
                                            if (numSalidas === 2) {
                                                Ice.mensajeError({
                                                    mensaje: 'Error de comunicaci\u00f3n al ejecutar proceso',
                                                    callback: function() {
                                                        Ice.procesaAccion(
                                                            cdtipflu,
                                                            cdflujomc,
                                                            accError.TIPODEST,
                                                            accError.CLAVEDEST,
                                                            accError.WEBIDDEST,
                                                            aux,
                                                            ntramite,
                                                            status,
                                                            cdunieco,
                                                            cdramo,
                                                            estado,
                                                            nmpoliza,
                                                            nmsituac,
                                                            nmsuplem,
                                                            callback
                                                        );
                                                    }
                                                });
                                            }
                                        }
                                    });
                                } catch (e) {
                                    Ice.manejaExcepcion(e, paso3);
                                }
                            });
                        } catch (e) {
                            Ice.manejaExcepcion(e, paso2);
                        }
                    }
                });
            } else if (tipodest === 'V') {
                paso = 'Recuperando valores de validaci\u00f3n';
                Ice.request({
                    mascara: paso,
                    url: Ice.url.core.recuperacionSimple,
                    params: {
                        'params.consulta'  : 'RECUPERAR_TFLUVAL',
                        'params.cdtipflu'  : cdtipflu,
                        'params.cdflujomc' : cdflujomc,
                        'params.cdvalida'  : clavedest
                    },
                    success: function (json) {
                        var paso2 = 'Decodificando respuesta al recuperar valores de validaci\u00f3n';
                        try {
                            Ice.log('### tfluval:', json);
                            if (json.list.length === 0) {
                                throw 'La validaci\u00f3n no existe';
                            } else if (json.list.length > 1) {
                                throw 'Validaci\u00f3n duplicada';
                            }
                            var data = json.list[0];
                            Ice.log('data:',data);
                            
                            var cliente = false;
                            if ('x' + data.CDVALIDAFK === 'x-1') {
                                if (Ext.isEmpty(data.JSVALIDA)) {
                                    throw 'La validaci\u00f3n no cuenta con una clave ni validaci\u00f3n cliente';
                                } else {
                                    cliente = true;
                                }
                            }
                            
                            paso2 = 'Recuperando acciones posteriores a la validaci\u00f3n';
                            Ice.cargarAccionesEntidad(cdtipflu, cdflujomc, tipodest, clavedest, webiddest, function (list) {
                                var paso3 = 'Decodificando respuesta al recuperar acciones posteriores a la validaci\u00f3n';
                                try {
                                    var json = {
                                        list: list
                                    };
                                    Ice.log('### acciones:',json);
                                    var numSalidas = json.list.length,
                                        acciones   = json.list;
                                    if (json.list.length === 0) {
                                        throw 'No hay acciones relacionadas a la validaci\u00f3n';
                                    }
                                    for (var i = 0; i < numSalidas; i++) {
                                        if (Ext.isEmpty(acciones[i].CDVALOR)) {
                                            throw 'Las acciones relacionadas a la validaci\u00f3n no tienen valor';
                                        }
                                    }
                                    
                                    if (!cliente) {
                                        paso3 = 'Ejecutando validaci\u00f3n';
                                        Ice.request({
                                            mascara : paso3,
                                            url     : Ice.url.bloque.mesacontrol.ejecutarValidacion,
                                            params  : {
                                                'flujo.cdtipflu'    : cdtipflu,
                                                'flujo.cdflujomc'   : cdflujomc,
                                                'flujo.tipoent'     : tipodest,
                                                'flujo.claveent'    : clavedest,
                                                'flujo.webid'       : webiddest,
                                                'flujo.ntramite'    : ntramite,
                                                'flujo.status'      : status,
                                                'flujo.cdunieco'    : cdunieco,
                                                'flujo.cdramo'      : cdramo,
                                                'flujo.estado'      : estado,
                                                'flujo.nmpoliza'    : nmpoliza,
                                                'flujo.nmsituac'    : nmsituac,
                                                'flujo.nmsuplem'    : nmsuplem,
                                                'flujo.aux'         : aux,
                                                'params.cdvalidafk' : data.CDVALIDAFK
                                            },
                                            success: function (json) {
                                                var paso4 = 'Decodificando respuesta al ejecutar validaci\u00f3n';
                                                try {
                                                    Ice.log('### validacion:',json);
                                                    var valorRespValid = json.params.salida,
                                                        salida         = '';
                                                    Ice.log('Resultado validacion java: ', valorRespValid);
                                                    for (var i=0 ; i<numSalidas ; i++) {
                                                        if ('x' + acciones[i].CDVALOR === 'x' + valorRespValid) {
                                                            salida = acciones[i];
                                                            break;
                                                        }
                                                        // CUANDO LA RESPUESTA DE LA VALIDACION JAVA INICIA CON '*' (EJ: *JTEZVA|PROGRAMADOR)
                                                        // BUSCAMOS UNA ACCION CUYO VALOR SEA '*', EJECUTAMOS ESA ACCION
                                                        // Y LE MANDAMOS COMO AUXILIAR LA RESPUESTA JAVA SIN EL '*' (EJ: JTEZVA|PROGRAMADOR)
                                                        else if (acciones[i].CDVALOR === '*'
                                                            && !Ext.isEmpty(valorRespValid)
                                                            && valorRespValid.indexOf('*') === 0
                                                        ) {
                                                            salida = acciones[i];
                                                            salida.AUX = valorRespValid.substr(1);
                                                            break;
                                                        }
                                                    }
                                                    if (Ext.isEmpty(salida)) {
                                                        throw 'La validaci\u00f3n regres\u00f3 un valor que no tiene acci\u00f3n relacionada';
                                                    }
                                                    Ice.procesaAccion(
                                                        cdtipflu,
                                                        cdflujomc,
                                                        salida.TIPODEST,
                                                        salida.CLAVEDEST,
                                                        salida.WEBIDDEST,
                                                        salida.AUX,
                                                        ntramite,
                                                        status,
                                                        cdunieco,
                                                        cdramo,
                                                        estado,
                                                        nmpoliza,
                                                        nmsituac,
                                                        nmsuplem,
                                                        callback
                                                    );
                                                } catch (e) {
                                                    Ice.manejaExcepcion(e, paso4);
                                                }
                                            }
                                        });
                                    } else { //evaluacion cliente
                                        paso3 = 'Recuperando datos para validaci\u00f3n cliente';
                                        Ice.request({
                                            mascara : paso3,
                                            url     : Ice.url.bloque.mesacontrol.obtenerDatosValidacionCliente,
                                            params  : {
                                                'flujo.cdtipflu'  : cdtipflu,
                                                'flujo.cdflujomc' : cdflujomc,
                                                'flujo.tipoent'   : tipodest,
                                                'flujo.claveent'  : clavedest,
                                                'flujo.webid'     : webiddest,
                                                'flujo.ntramite'  : ntramite,
                                                'flujo.status'    : status,
                                                'flujo.cdunieco'  : cdunieco,
                                                'flujo.cdramo'    : cdramo,
                                                'flujo.estado'    : estado,
                                                'flujo.nmpoliza'  : nmpoliza,
                                                'flujo.nmsituac'  : nmsituac,
                                                'flujo.nmsuplem'  : nmsuplem
                                            },
                                            success: function (json) {
                                                var paso4 = 'Decodificando respuesta al recuperar datos para validaci\u00f3n cliente';
                                                try {
                                                    Ice.log('### datos memoria validacion javascript:', json);
                                                    paso4 = 'Construyendo validaci\u00f3n cliente';
                                                    eval('var validacionCliente=function(DATOS){Ice.log("DATOS:",DATOS);' + data.JSVALIDA + '};');
                                                    Ice.log('validacionCliente:', validacionCliente);
                                                    
                                                    paso4 = 'Invocando validaci\u00f3n cliente';
                                                    var valorRespValid = validacionCliente(json.datosTramite),
                                                        salida         = '';
                                                    Ice.log('Resultado validacion cliente:', valorRespValid);
                                                    for (var i = 0; i < numSalidas; i++) {
                                                        if ('x' + acciones[i].CDVALOR === 'x' + valorRespValid) {
                                                            salida = acciones[i];
                                                            break;
                                                        }
                                                        // CUANDO LA RESPUESTA DE LA VALIDACION CLIENTE INICIA CON '*' (EJ: *JTEZVA|PROGRAMADOR)
                                                        // BUSCAMOS UNA ACCION CUYO VALOR SEA '*', EJECUTAMOS ESA ACCION
                                                        // Y LE MANDAMOS COMO AUXILIAR LA RESPUESTA JAVA SIN EL '*' (EJ: JTEZVA|PROGRAMADOR)
                                                        else if (acciones[i].CDVALOR === '*'
                                                            && !Ext.isEmpty(valorRespValid)
                                                            && valorRespValid.indexOf('*') === 0
                                                        ) {
                                                            salida = acciones[i];
                                                            salida.AUX = valorRespValid.substr(1);
                                                            break;
                                                        }
                                                    }
                                                    if (Ext.isEmpty(salida)) {
                                                        throw 'La validaci\u00f3n cliente regres\u00f3 un valor que no tiene acci\u00f3n relacionada';
                                                    }

                                                    Ice.procesaAccion(
                                                        cdtipflu,
                                                        cdflujomc,
                                                        salida.TIPODEST,
                                                        salida.CLAVEDEST,
                                                        salida.WEBIDDEST,
                                                        salida.AUX,
                                                        ntramite,
                                                        status,
                                                        cdunieco,
                                                        cdramo,
                                                        estado,
                                                        nmpoliza,
                                                        nmsituac,
                                                        nmsuplem,
                                                        callback
                                                    );
                                                } catch (e) {
                                                    Ice.manejaExcepcion(e, paso4);
                                                }
                                            }
                                        });
                                    }
                                } catch (e) {
                                    Ice.manejaExcepcion(e, paso3);
                                }
                            });
                        } catch (e) {
                            Ice.manejaExcepcion(e, paso2);
                        }
                    }
                });
            } else if (tipodest === 'R') {
                paso = 'Recuperando acciones posteriores a la revisi\u00f3n';
                Ice.cargarAccionesEntidad(cdtipflu, cdflujomc, tipodest, clavedest, webiddest, function (list) {
                    var json = {
                        list: list
                    };
                    var paso2 = 'Decodificando respuesta al recuperar acciones posteriores a la revisi\u00f3n';
                    try {
                        Ice.log('### acciones:', json);
                        var numSalidas = 0,
                            accion1    = '',
                            accion2    = '',
                            accExito   = '',
                            accError   = '';
                        if (json.list.length === 0) {
                            // jtezva 16 agosto 2016
                            // se comenta porque ya no es requerida una accion posterior
                            // if (aux !== 'INICIAL') { // Solo avienta exception si no es INICIAL
                            //     throw 'No hay acciones relacionadas a la revisi\u00f3n';
                            // }
                        } else if (json.list.length === 1) {
                            numSalidas = 1;
                            accion1    = json.list[0];
                        }
                        //     * jtezva 16 agosto 2016 ya no permite doble accion
                        // else if(json.list.length==2)
                        // {
                        //     numSalidas = 2;
                        //     accion1    = json.list[0];
                        //     accion2    = json.list[1];
                            
                        //     if(Ice.nvl(accion1.CDVALOR,'')=='EXITO')
                        //     {
                        //         accExito = accion1;
                        //     }
                        //     else if(Ice.nvl(accion2.CDVALOR,'')=='EXITO')
                        //     {
                        //         accExito = accion2;
                        //     }
                        //     if(Ice.nvl(accion1.CDVALOR,'')=='ERROR')
                        //     {
                        //         accError = accion1;
                        //     }
                        //     else if(Ice.nvl(accion2.CDVALOR,'')=='ERROR')
                        //     {
                        //         accError = accion2;
                        //     }
                            
                        //     if(Ext.isEmpty(accExito)||Ext.isEmpty(accError))
                        //     {
                        //         throw 'Las acciones relacionadas a la revisi\u00f3n no tienen el valor EXITO/ERROR adecuado';
                        //     }
                        // }
                        else {
                            //     * jtezva 16 agosto 2016
                            //     * si tiene mas de dos entonces es error
                            // if (aux !== 'INICIAL') { // Solo avienta exception si no es INICIAL
                            throw 'La revisi\u00f3n tiene demasiadas acciones relacionadas';
                            // }
                        }
                        
                        paso2 = 'Ejecutando revisi\u00f3n';
                        Ice.request({
                            mascara : paso2,
                            url     : Ice.url.bloque.mesacontrol.ejecutarRevision,
                            params  : {
                                'flujo.cdtipflu'  : cdtipflu,
                                'flujo.cdflujomc' : cdflujomc,
                                'flujo.tipoent'   : tipodest,
                                'flujo.claveent'  : clavedest,
                                'flujo.webid'     : webiddest,
                                'flujo.ntramite'  : ntramite,
                                'flujo.status'    : status,
                                'flujo.cdunieco'  : cdunieco,
                                'flujo.cdramo'    : cdramo,
                                'flujo.estado'    : estado,
                                'flujo.nmpoliza'  : nmpoliza,
                                'flujo.nmsituac'  : nmsituac,
                                'flujo.nmsuplem'  : nmsuplem
                            },
                            success: function (json) {
                                var paso3 = 'Decodificando respuesta al ejecutar revisi\u00f3n';
                                try {
                                    Ice.log('### revision:', json);
                                    var faltanDocs = false;
                                    
                                    for (var i = 0; i < json.list.length; i++) {
                                        if (json.list[i].SWOBLIGA === 'S' && json.list[i].SWACTIVO !== 'S') {
                                            faltanDocs = true;
                                            break;
                                        }
                                    }

                                    var listaDocs = [],
                                        listaReqs = [];
                                    
                                    for (var i = 0; i < json.list.length ; i++) {
                                        if (json.list[i].TIPO === 'DOC') {
                                            listaDocs.push(json.list[i]);
                                        } else if (json.list[i].TIPO === 'REQ') {
                                            json.list[i].CHECK = json.list[i].SWACTIVO === 'S';
                                            listaReqs.push(json.list[i]);
                                        } else {
                                            mensajeError('Tipo de doc/req inv\u00e1lido');
                                        }
                                    }
                                    
                                    Ice.log('listaDocs:', listaDocs, '.');
                                    Ice.log('listaReqs;', listaReqs, '.');
                                    
                                    var ven = Ext.create({
                                        xtype: 'ventanarequisitos',
                                        title    : 'Revisi\u00f3n de requisitos y documentos'
                                                    + (aux === 'LECTURA'
                                                        ? ' (solo lectura)'
                                                        : ''),
                                        flujo    : {
                                            cdtipflu  : cdtipflu,
                                            cdflujomc : cdflujomc,
                                            tipodest  : tipodest,
                                            clavedest : clavedest,
                                            webiddest : webiddest,
                                            aux       : aux,
                                            ntramite  : ntramite,
                                            status    : status,
                                            cdunieco  : cdunieco,
                                            cdramo    : cdramo,
                                            estado    : estado,
                                            nmpoliza  : nmpoliza,
                                            nmsituac  : nmsituac,
                                            nmsuplem  : nmsuplem,
                                            callback  : callback
                                        },
                                        documentos: listaDocs,
                                        requisitos: listaReqs,
                                        accion: accion1,
                                        numSalidas: numSalidas,
                                        faltanDocs: faltanDocs,
                                        swconfirm: json.params.swconfirm
                                    });
                                    ven.mostrar();
                                } catch (e) {
                                    Ice.manejaExcepcion(e, paso3);
                                }
                            }
                        });
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                });
            } else if (tipodest === 'M') {
                paso = 'Recuperando valores de correo';
                Ice.request({
                    mascara : paso,
                    url     : Ice.url.core.recuperacionSimple,
                    params  : {
                        'params.consulta'  : 'RECUPERAR_TFLUMAIL',
                        'params.cdtipflu'  : cdtipflu,
                        'params.cdflujomc' : cdflujomc,
                        'params.cdmail'    : clavedest
                    },
                    success: function (json) {
                        var paso2 = 'Decodificando respuesta al recuperar valores de correo';
                        try {
                            Ice.log('### tflumail:',json);
                            if (json.list.length === 0) {
                                throw 'El correo no existe';
                            } else if(json.list.length > 1) {
                                throw 'Correo duplicado';
                            }
                            var data = json.list[0];
                            Ice.log('data:',data);
                            
                            paso2 = 'Recuperando acciones posteriores a la validaci\u00f3n';
                            Ice.cargarAccionesEntidad(cdtipflu, cdflujomc, tipodest, clavedest, webiddest, function (acciones) {
                                var paso3 = 'Decodificando respuesta al recuperar acciones posteriores a la validaci\u00f3n';
                                try {
                                    Ice.log('### acciones:', acciones);
                                    var numSalidas = acciones.length;
                                    if (numSalidas < 2) {
                                        paso3 = 'Enviando correo';
                                        Ice.request({
                                            mascara : paso3,
                                            url     : Ice.url.bloque.mesacontrol.enviaCorreoFlujo,
                                            params  : {
                                                'flujo.cdtipflu'    : cdtipflu,
                                                'flujo.cdflujomc'   : cdflujomc,
                                                'flujo.tipoent'     : tipodest,
                                                'flujo.claveent'    : clavedest,
                                                'flujo.webid'       : webiddest,
                                                'flujo.ntramite'    : ntramite,
                                                'flujo.status'      : status,
                                                'flujo.cdunieco'    : cdunieco,
                                                'flujo.cdramo'      : cdramo,
                                                'flujo.estado'      : estado,
                                                'flujo.nmpoliza'    : nmpoliza,
                                                'flujo.nmsituac'    : nmsituac,
                                                'flujo.nmsuplem'    : nmsuplem,
                                                'flujo.aux'         : aux,
                                                'params.dsdestino'  : data.DSDESTINO,
                                                'params.dsasunto'   : data.DSASUNTO,
                                                'params.dsmensaje'  : data.DSMENSAJE,
                                                'params.vardestino' : data.VARDESTINO,
                                                'params.varmensaje' : data.VARMENSAJE,
                                                'params.varasunto'  : data.VARASUNTO
                                            },
                                            success: function (json) {
                                                var paso4 = 'Decodificando respuesta al enviar correo';
                                                try {
                                                    Ice.log('### enviar correo response:', json);
                                                    if (numSalidas === 0) {
                                                        Ice.mensajeCorrecto('Correo enviado', 'Correo enviado');
                                                    } else {
                                                        Ice.procesaAccion(
                                                            cdtipflu,
                                                            cdflujomc,
                                                            acciones[0].TIPODEST,
                                                            acciones[0].CLAVEDEST,
                                                            acciones[0].WEBIDDEST,
                                                            acciones[0].AUX,
                                                            ntramite,
                                                            status,
                                                            cdunieco,
                                                            cdramo,
                                                            estado,
                                                            nmpoliza,
                                                            nmsituac,
                                                            nmsuplem,
                                                            callback
                                                        );
                                                    }
                                                } catch (e) {
                                                    Ice.manejaExcepcion(e, paso4);
                                                }
                                            }
                                        });
                                    } else {
                                        throw 'Hay demasiadas acciones relacionadas al correo';
                                    }
                                } catch (e) {
                                    Ice.manejaExcepcion(e, paso3);
                                }
                            });
                        } catch (e) {
                            Ice.manejaExcepcion(e, paso2);
                        }
                    }
                });
            } else {
                throw 'Entidad inv\u00e1lida';
            }
        } catch(e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    ejecutarValidacionPorReferencia : function(flujo,referencia){
    	var paso = 'ejecutarValidacionPorReferencia';
    	try{
    		
    		Ice.request({
    			url		:	Ice.url.bloque.mesacontrol.ejecutarValidacionPorReferencia,
    			params	:	{
    				'params.ntramite'		:	flujo.ntramite,
    				'params.referencia'		:	referencia	
    			},
    			success	:	function(datos){
    				var paso = 'Leyendo datos val por ref';
    				try{
    					
    					if(datos.list && datos.list.length != 1){
    						throw 'ejecutarValidacionPorReferencia devuelve mas de un registro'; 
    					}
    					var smap = datos.list[0];
    					Ice.log("datos ejecutarValidacionPorReferencia",smap);
    					Ice.cargarAccionesEntidad (smap.cdtipflu, smap.cdflujomc, 'V', smap.cdvalida, smap.webid, 
    							function(dat){
    								var paso = 'procesaAccion';
    								Ice.log("DATOS cargarAccionesEntidad",dat);
    								try{
    									if(dat.list && dat.list.length != 1){
    			    						throw 'cargarAccionesEntidad devuelve mas de un registro'; 
    			    					}
    									dat=dat[0];
    									Ice.procesaAccion (dat.CDTIPFLU, dat.CDFLUJOMC, dat.TIPODEST, dat.CLAVEDEST, dat.WEBIDDEST, dat.AUX, flujo.ntramite, smap.estatus, smap.cdunieco,
    											smap.cdramo, smap.estado, smap.nmpoliza, smap.nmsituac, smap.nmsuplem, function(){})
    								}catch(e){
    									Ice.manejaExcepcion(e,paso);
    								}
    							}
    					); 
    				}catch(e){
    					Ice.manejaExcepcion(e,paso);
    				}
    			}
    		});
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    },
    
    /**
     * Ejecuta las validaciones de eventos en la interfaz de usuario
     */
    ejecutarValidacionesEventoPantalla: function (cdunieco, cdramo, estado, nmpoliza, nmsuplem, pantalla, evento, flujo, callback) {
    	
        Ice.log('Ice.ejecutarValidacionesEventoPantalla args:', arguments);
        var paso = 'Ejecutando validaciones de evento en pantalla';
        try {
        	// ejecuta el action
            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.mesacontrol.ejecutarValidacionesEventoPantalla,
                params: {
                    'params.cdunieco' : cdunieco,
                    'params.cdramo'   : cdramo,
                    'params.estado'   : estado,
                    'params.nmpoliza' : nmpoliza,
                    'params.nmsuplem' : nmsuplem,
					'params.pantalla' : pantalla,
					'params.evento'   : evento
                },
                success: function (action) {
					var paso2 = 'Ejecutando referencia';
					try {
						// si recibe de salida params.referencia, significa que va a ejecutar una referencia
						if(action && action.params && action.params.referencia) {
							// primero valida, si hay tramite (flujo.ntramite)
							if( !Ext.isEmpty(flujo.ntramite) ) {
								// muestra al usuario el aviso con la variable message y la pregunta ¿desea turnar el trámite?, al aceptar continuar se ejecuta la referencia de params.referencia (1-e).
								Ext.Msg.confirm("Aviso", action.message + "\n\u00bfDesea turnar el tr\u00E1mite " + flujo.ntramite + " ?", function(opc){
									if (opc === 'yes') {
										Ice.ejecutarValidacionPorReferencia(flujo, action.params.referencia);
									}
								});
							} else {
								// si no hay trámite: se muestra el aviso con la variable message y la pregunta ¿desea registrar el trámite y enviar la solicitud?,
								Ext.Msg.confirm("Aviso", action.message + "\n\u00bfDesea registrar el tr\u00E1mite y enviar la solicitud?", function(opc){
									// si decide continuar, se registra un trámite (2-a) usando llave de póliza, params.estatus y params.comments
									// y se ejecuta la referencia (params.referencia) (1-e) con el trámite generado.
									if (opc === 'yes') {
										try {
											Ice.request({
												mascara: paso2,
												url: Ice.url.bloque.mesacontrol.registrarNuevoTramite,
												params: {
												    'params.cdunieco'  : cdunieco,
													'params.cdramo'    : cdramo,
													'params.estado'    : estado,
													'params.nmpoliza'  : nmpoliza,
                                                    'params.nmsuplem'  : nmsuplem,
													'params.nmsolici'  : nmpoliza,
													'params.cdsucadm'  : cdunieco,
                                                    'params.cdsucdoc'  : cdunieco,
                                                    'params.cdtiptra'  : action.params.cdtiptra,
                                                    'params.cdtipflu'  : action.params.cdtipflu,
                                                    'params.cdflujomc' : action.params.cdflujomc,
													'params.pantalla'  : pantalla,
													'params.evento'    : evento,
													'params.estatus'   : action.params.estatus,
													'params.comments'  : action.params.comments
												},
												success: function (resp) {
													var paso3 = 'Ejecutando validacion por referencia';
													try {
                                                        flujo.ntramite = resp.ntramite;
                                                        Ice.mensajeCorrecto({
                                                            mensaje: 'Se registr\u00f3 el tr\u00e1mite ' + resp.ntramite,
                                                            callback: function () {
                                                                Ice.ejecutarValidacionPorReferencia(flujo, action.params.referencia);
                                                            }
                                                        });
													} catch (e) {
														Ice.manejaExcepcion(e, paso3);
													}
												}
											});
										} catch (e) {
											Ice.manejaExcepcion(e, paso2);
										}
									}
								});
							}
						} else {
							// Si no recibe params.referencia entonces ejecuta el callback
							paso2 = 'Ejecutando callback ya que no viene params.referencia';
							try {
								callback();
							} catch (e) {
								Ice.manejaExcepcion(e, paso2);
							}
						}
					} catch (e) {
						Ice.manejaExcepcion(e, paso2);
					}
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});