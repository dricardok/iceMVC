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
                            Ice.redirect(url);
                        } catch(e) {
                            Ice.manejaExcepcion(e,ck);
                        }
                    }
                });
            }
            /*else if (tipodest === 'C') {
                ck = 'Recuperando valores de componente';
                Ice.request({
                    mascara: ck,
                    url: Ice.url.core.recuperacionSimple,
                    params: {
                        'params.consulta'  : 'RECUPERAR_TCOMPMC',
                        'params.CDCOMPMC' : clavedest
                    },
                    success : function(json){
                        var ck = 'Decodificando respuesta al recuperar valores de componente';
                        try {
                            if(json.list.length == 0) {
                                throw 'El componente no existe';
                            } else if(json.list.length > 1) {
                                throw 'Componente duplicado';
                            }
                            var compData = json.list[0];
                            Ice.log('compData:',compData);
                            
                            ck = 'Creando componente';
                            // Ext.syncRequire(_GLOBAL_DIRECTORIO_DEFINES+compData.NOMCOMP);
                            new window[compData.NOMCOMP]({
                                cdtipflu: cdtipflu,
                                cdflujomc: cdflujomc,
                                tipoent: tipodest,
                                claveent: clavedest,
                                webid: webiddest,
                                aux: aux,
                                ntramite: ntramite,
                                status: status,
                                cdunieco: cdunieco,
                                cdramo: cdramo,
                                estado: estado,
                                nmpoliza: nmpoliza,
                                nmsituac: nmsituac,
                                nmsuplem: nmsuplem,
                                cdusuari: cdusuari,
                                cdsisrol: cdsisrol
                            }).mostrar();
                        } catch(e) {
                            Ice.manejaExcepcion(e,ck);
                        }
                    }
                });
            } else if (tipodest === 'O') {
                ck = 'Recuperando valores de proceso';
                Ext.Ajax.request({
                    url: Ice.url.core.recuperacionSimple,
                    params:{
                        'params.consulta'  : 'RECUPERAR_TPROCMC',
                        'params.CDPROCMC' : clavedest
                    },
                    success : function(json){
                        var ck = 'Decodificando respuesta al recuperar valores de proceso';
                        try{
                            if(json.list.length==0){
                                throw 'El proceso no existe';
                            } else if(json.list.length>1) {
                                throw 'Proceso duplicado';
                            }
                            var data = json.list[0];
                            Ice.log('data:',data);
                            
                            ck = 'Recuperando acciones posteriores al proceso';
                            Ext.Ajax.request({
                                mascara: ck,
                                url: Ice.url.bloque.mesacontrol.cargarAccionesEntidad,
                                params: {
                                    'params.cdtipflu': cdtipflu,
                                    'params.cdflujomc': cdflujomc,
                                    'params.tipoent': tipodest,
                                    'params.cdentidad': clavedest,
                                    'params.webid': webiddest
                                },
                                success : function(json){
                                    var ck = 'Decodificando respuesta al recuperar acciones posteriores al proceso';
                                    try {
                                        var numSalidas = 0,
                                            accion1   = '',
                                            accion2   = '',
                                            accExito  = '',
                                            accError  = '';
                                        // CDACCION: "138"
                                        // CDCOMPMC: null
                                        // CDESTADOMC: null
                                        // CDFLUJOMC: "12"
                                        // CDICONO: null
                                        // CDPANTMC: null
                                        // CDPROCMC: null
                                        // CDREVISI: null
                                        // CDTIPFLU: "1"
                                        // CDVALIDA: "20"
                                        // CDVALOR: null
                                        // CLAVEDEST: "20"
                                        // DSACCION: "next"
                                        // IDDESTIN: "1450139785755_1072"
                                        // IDORIGEN: "1450121226109_9387"
                                        // TIPODEST: "V"
                                        // WEBIDCOMP: null
                                        // WEBIDDEST: "1450139785755_1072"
                                        // WEBIDESTADO: null
                                        // WEBIDPANT: null
                                        // WEBIDPROC: null
                                        // WEBIDREVISI: null
                                        // WEBIDVALIDA: "1450139785755_1072"
                                        if(json.list.length == 1){
                                            numSalidas = 1;
                                            accion1    = json.list[0];
                                        } else if(json.list.length==2) {
                                            numSalidas = 2;
                                            accion1    = json.list[0];
                                            accion2    = json.list[1];
                                            
                                            if(Ice.nvl(accion1.CDVALOR,'') == 'EXITO') {
                                                accExito = accion1;
                                            } else if(Ice.nvl(accion2.CDVALOR,'') == 'EXITO') {
                                                accExito = accion2;
                                            }
                                            if(Ice.nvl(accion1.CDVALOR,'')=='ERROR'){
                                                accError = accion1;
                                            } else if(Ice.nvl(accion2.CDVALOR,'') == 'ERROR'){
                                                accError = accion2;
                                            }
                                            
                                            if(Ext.isEmpty(accExito)||Ext.isEmpty(accError)){
                                                throw 'Las acciones relacionadas al proceso no tienen el valor EXITO/ERROR adecuado';
                                            }
                                        } else if(json.list.length > 2) {
                                            throw 'El proceso tiene demasiadas acciones relacionadas';
                                        }
                                        
                                        ck = 'Ejecutando proceso';
                                        Ice.request({
                                            mascara: ck,
                                            url      : _GLOBAL_CONTEXTO+data.URLPROCMC,
                                            params: {
                                                'flujo.cdtipflu': cdtipflu,
                                                'flujo.cdflujomc': cdflujomc,
                                                'flujo.tipoent': tipodest,
                                                'flujo.claveent': clavedest,
                                                'flujo.webid': webiddest,
                                                'flujo.ntramite': ntramite,
                                                'flujo.status': status,
                                                'flujo.cdunieco': cdunieco,
                                                'flujo.cdramo': cdramo,
                                                'flujo.estado': estado,
                                                'flujo.nmpoliza': nmpoliza,
                                                'flujo.nmsituac': nmsituac,
                                                'flujo.nmsuplem': nmsuplem,
                                                'flujo.aux': aux
                                            },
                                            success : function (json){
                                                var ck = 'Decodificando respuesta al ejecutar proceso';
                                                try{
                                                    Ice.log('### proceso:',json);
                                                    // if (json.success == true){
                                                    if(numSalidas == 0){
                                                        mensajeCorrecto('AVISO',json.message,callback);
                                                    } else if(numSalidas == 1){
                                                        // JTEZVA 2016 08 30 YA NO QUIERO AVISOS, QUE CONTINUE
                                                        // mensajeCorrecto
                                                        // (
                                                        //     'AVISO'
                                                        //     ,json.message
                                                        //     ,function()
                                                        //     {
                                                                Ice.procesaAccion(
                                                                    cdtipflu
                                                                    ,cdflujomc
                                                                    ,accion1.TIPODEST
                                                                    ,accion1.CLAVEDEST
                                                                    ,accion1.WEBIDDEST
                                                                    ,aux
                                                                    ,ntramite
                                                                    ,status
                                                                    ,cdunieco
                                                                    ,cdramo
                                                                    ,estado
                                                                    ,nmpoliza
                                                                    ,nmsituac
                                                                    ,nmsuplem
                                                                    ,cdusuari
                                                                    ,cdsisrol
                                                                    ,callback
                                                                );
                                                            // }
                                                    } else if(numSalidas == 2) {
                                                        //  JTEZVA 2016 08 30 YA NO QUIERO AVISOS, QUE CONTINUE
                                                        // mensajeCorrecto
                                                        // (
                                                        //     'AVISO'
                                                        //     ,json.message
                                                        //     ,function()
                                                        //     {
                                                                Ice.procesaAccion(
                                                                    cdtipflu
                                                                    ,cdflujomc
                                                                    ,accExito.TIPODEST
                                                                    ,accExito.CLAVEDEST
                                                                    ,accExito.WEBIDDEST
                                                                    ,aux
                                                                    ,ntramite
                                                                    ,status
                                                                    ,cdunieco
                                                                    ,cdramo
                                                                    ,estado
                                                                    ,nmpoliza
                                                                    ,nmsituac
                                                                    ,nmsuplem
                                                                    ,cdusuari
                                                                    ,cdsisrol
                                                                    ,callback
                                                                );
                                                        //     }
                                                        // );
                                                    }
                                                    // else
                                                    // {
                                                    //     if(numSalidas<2)
                                                    //     {
                                                    //         mensajeError(json.message);
                                                    //     }
                                                    //     else
                                                    //     {
                                                    //         mensajeError
                                                    //         (
                                                    //             json.message
                                                    //             ,function()
                                                    //             {
                                                    //                 Ice.procesaAccion
                                                    //                 (
                                                    //                     cdtipflu
                                                    //                     ,cdflujomc
                                                    //                     ,accError.TIPODEST
                                                    //                     ,accError.CLAVEDEST
                                                    //                     ,accError.WEBIDDEST
                                                    //                     ,aux
                                                    //                     ,ntramite
                                                    //                     ,status
                                                    //                     ,cdunieco
                                                    //                     ,cdramo
                                                    //                     ,estado
                                                    //                     ,nmpoliza
                                                    //                     ,nmsituac
                                                    //                     ,nmsuplem
                                                    //                     ,cdusuari
                                                    //                     ,cdsisrol
                                                    //                     ,callback
                                                    //                 );
                                                    //             }
                                                    //         );
                                                    //     }
                                                    // }
                                                }
                                                catch(e)
                                                {
                                                    if(numSalidas<2)
                                                    {
                                                        Ice.manejaExcepcion(e,ck);
                                                    }
                                                    else
                                                    {
                                                        Ice.logError(e);
                                                        Ice.mensajeError({
                                                            mensaje: 'Error al manejar respuesta de proceso',
                                                            callback: function () {
                                                                Ice.procesaAccion(
                                                                    cdtipflu
                                                                    ,cdflujomc
                                                                    ,accError.TIPODEST
                                                                    ,accError.CLAVEDEST
                                                                    ,accError.WEBIDDEST
                                                                    ,aux
                                                                    ,ntramite
                                                                    ,status
                                                                    ,cdunieco
                                                                    ,cdramo
                                                                    ,estado
                                                                    ,nmpoliza
                                                                    ,nmsituac
                                                                    ,nmsuplem
                                                                    ,cdusuari
                                                                    ,cdsisrol
                                                                    ,callback
                                                                );
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                            ,failure : function(response)
                                            {
                                                if(numSalidas<2)
                                                {
                                                    errorComunicacion(null,'Error al ejecutar proceso');
                                                }
                                                else
                                                {
                                                    mensajeError({
                                                        mensaje: 'Error de comunicaci\u00f3n al ejecutar proceso',
                                                        callback: function() {
                                                            Ice.procesaAccion(
                                                                cdtipflu
                                                                ,cdflujomc
                                                                ,accError.TIPODEST
                                                                ,accError.CLAVEDEST
                                                                ,accError.WEBIDDEST
                                                                ,aux
                                                                ,ntramite
                                                                ,status
                                                                ,cdunieco
                                                                ,cdramo
                                                                ,estado
                                                                ,nmpoliza
                                                                ,nmsituac
                                                                ,nmsuplem
                                                                ,cdusuari
                                                                ,cdsisrol
                                                                ,callback
                                                            );
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    } catch (e) {
                                        Ice.manejaExcepcion(e,ck);
                                    }
                                }
                            });
                        } catch (e) {
                            Ice.manejaExcepcion(e,ck);
                        }
                    }
                });
            } else if (tipodest === 'V') {
                ck = 'Recuperando valores de validaci\u00f3n';
                Ice.request({
                    mascara: ck,
                    url      : Ice.url.core.recuperacionSimple
                    ,params  :
                    {
                        'params.consulta'   : 'RECUPERAR_TFLUVAL'
                        ,'params.cdtipflu'  : cdtipflu
                        ,'params.cdflujomc' : cdflujomc
                        ,'params.cdvalida'  : clavedest
                    }
                    ,success : function(json)
                    {
                        var ck = 'Decodificando respuesta al recuperar valores de validaci\u00f3n';
                        try
                        {
                            Ice.log('### tfluval:',json);
                            if(json.list.length==0)
                            {
                                throw 'La validaci\u00f3n no existe';
                            }
                            else if(json.list.length>1)
                            {
                                throw 'Validaci\u00f3n duplicada';
                            }
                            var data = json.list[0];
                            Ice.log('data:',data);
                            
                            var cliente = false;
                            if('x'+data.CDVALIDAFK=='x-1')
                            {
                                if(Ext.isEmpty(data.JSVALIDA))
                                {
                                    throw 'La validaci\u00f3n no cuenta con una clave ni validaci\u00f3n cliente';
                                }
                                else
                                {
                                    cliente = true;
                                }
                            }
                            
                            ck = 'Recuperando acciones posteriores a la validaci\u00f3n';
                            Ext.Ajax.request({
                                mascara: ck,
                                url      : Ice.url.bloque.mesacontrol.cargarAccionesEntidad
                                ,params  :
                                {
                                    'params.cdtipflu'   : cdtipflu
                                    ,'params.cdflujomc' : cdflujomc
                                    ,'params.tipoent'   : tipodest
                                    ,'params.cdentidad' : clavedest
                                    ,'params.webid'     : webiddest
                                }
                                ,success : function(json)
                                {
                                    var ck = 'Decodificando respuesta al recuperar acciones posteriores a la validaci\u00f3n';
                                    try
                                    {
                                        Ice.log('### acciones:',json);
                                        var numSalidas = json.list.length
                                            ,acciones  = json.list;
                                        // CDACCION: "138"
                                        // CDCOMPMC: null
                                        // CDESTADOMC: null
                                        // CDFLUJOMC: "12"
                                        // CDICONO: null
                                        // CDPANTMC: null
                                        // CDPROCMC: null
                                        // CDREVISI: null
                                        // CDTIPFLU: "1"
                                        // CDVALIDA: "20"
                                        // CDVALOR: null
                                        // CLAVEDEST: "20"
                                        // DSACCION: "next"
                                        // IDDESTIN: "1450139785755_1072"
                                        // IDORIGEN: "1450121226109_9387"
                                        // TIPODEST: "V"
                                        // WEBIDCOMP: null
                                        // WEBIDDEST: "1450139785755_1072"
                                        // WEBIDESTADO: null
                                        // WEBIDPANT: null
                                        // WEBIDPROC: null
                                        // WEBIDREVISI: null
                                        // WEBIDVALIDA: "1450139785755_1072"
                                        if (json.list.length === 0) {
                                            throw 'No hay acciones relacionadas a la validaci\u00f3n';
                                        }
                                        for (var i = 0; i < numSalidas; i++) {
                                            if(Ext.isEmpty(acciones[i].CDVALOR))
                                            {
                                                throw 'Las acciones relacionadas a la validaci\u00f3n no tienen valor';
                                            }
                                        }
                                        
                                        if (!cliente) {
                                            ck = 'Ejecutando validaci\u00f3n';
                                            Ice.request({
                                                mascara: ck,
                                                url      : _GLOBAL_URL_VALIDACION
                                                ,params  :
                                                {
                                                    'flujo.cdtipflu'     : cdtipflu
                                                    ,'flujo.cdflujomc'   : cdflujomc
                                                    ,'flujo.tipoent'     : tipodest
                                                    ,'flujo.claveent'    : clavedest
                                                    ,'flujo.webid'       : webiddest
                                                    ,'flujo.ntramite'    : ntramite
                                                    ,'flujo.status'      : status
                                                    ,'flujo.cdunieco'    : cdunieco
                                                    ,'flujo.cdramo'      : cdramo
                                                    ,'flujo.estado'      : estado
                                                    ,'flujo.nmpoliza'    : nmpoliza
                                                    ,'flujo.nmsituac'    : nmsituac
                                                    ,'flujo.nmsuplem'    : nmsuplem
                                                    ,'params.cdvalidafk' : data.CDVALIDAFK
                                                }
                                                ,success : function(json)
                                                {
                                                    var ck = 'Decodificando respuesta al ejecutar validaci\u00f3n';
                                                    try
                                                    {
                                                        Ice.log('### validacion:',json);
                                                        var valorRespValid = json.params.salida
                                                            ,salida        = '';
                                                        Ice.log('Resultado validacion java: ', valorRespValid);
                                                        for(var i=0 ; i<numSalidas ; i++)
                                                        {
                                                            if ( 'x' + acciones[i].CDVALOR === 'x' + valorRespValid) {
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
                                                        if(Ext.isEmpty(salida))
                                                        {
                                                            throw 'La validaci\u00f3n regres\u00f3 un valor que no tiene acci\u00f3n relacionada';
                                                        }
                                                        Ice.procesaAccion(
                                                            cdtipflu
                                                            ,cdflujomc
                                                            ,salida.TIPODEST
                                                            ,salida.CLAVEDEST
                                                            ,salida.WEBIDDEST
                                                            ,salida.AUX
                                                            ,ntramite
                                                            ,status
                                                            ,cdunieco
                                                            ,cdramo
                                                            ,estado
                                                            ,nmpoliza
                                                            ,nmsituac
                                                            ,nmsuplem
                                                            ,cdusuari
                                                            ,cdsisrol
                                                            ,callback
                                                        );
                                                    } catch (e) {
                                                        Ice.manejaExcepcion(e,ck);
                                                    }
                                                }
                                            });
                                        }
                                        else//evaluacion cliente
                                        {
                                            ck = 'Recuperando datos para validaci\u00f3n cliente';
                                            Ice.request({
                                                mascara: ck,
                                                url      : _GLOBAL_URL_VALIDACION_MONTAR_DATOS
                                                ,params  :
                                                {
                                                    'flujo.cdtipflu'   : cdtipflu
                                                    ,'flujo.cdflujomc' : cdflujomc
                                                    ,'flujo.tipoent'   : tipodest
                                                    ,'flujo.claveent'  : clavedest
                                                    ,'flujo.webid'     : webiddest
                                                    ,'flujo.ntramite'  : ntramite
                                                    ,'flujo.status'    : status
                                                    ,'flujo.cdunieco'  : cdunieco
                                                    ,'flujo.cdramo'    : cdramo
                                                    ,'flujo.estado'    : estado
                                                    ,'flujo.nmpoliza'  : nmpoliza
                                                    ,'flujo.nmsituac'  : nmsituac
                                                    ,'flujo.nmsuplem'  : nmsuplem
                                                }
                                                ,success : function(json)
                                                {
                                                    var ck = 'Decodificando respuesta al recuperar datos para validaci\u00f3n cliente';
                                                    try
                                                    {
                                                        Ice.log('### datos memoria validacion javascript:',json);
                                                        ck = 'Construyendo validaci\u00f3n cliente';
                                                        eval('var validacionCliente=function(DATOS){Ice.log("DATOS:",DATOS);'+data.JSVALIDA+'};');
                                                        Ice.log('validacionCliente:',validacionCliente);
                                                        
                                                        ck = 'Invocando validaci\u00f3n cliente';
                                                        var valorRespValid = validacionCliente(json.datosTramite)
                                                            ,salida        = '';
                                                        Ice.log('Resultado validacion cliente: ', valorRespValid);
                                                        for(var i=0 ; i<numSalidas ; i++)
                                                        {
                                                            if('x'+acciones[i].CDVALOR=='x'+valorRespValid)
                                                            {
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
                                                        if(Ext.isEmpty(salida))
                                                        {
                                                            throw 'La validaci\u00f3n cliente regres\u00f3 un valor que no tiene acci\u00f3n relacionada';
                                                        }
                                                        Ice.procesaAccion(
                                                            cdtipflu
                                                            ,cdflujomc
                                                            ,salida.TIPODEST
                                                            ,salida.CLAVEDEST
                                                            ,salida.WEBIDDEST
                                                            ,salida.AUX
                                                            ,ntramite
                                                            ,status
                                                            ,cdunieco
                                                            ,cdramo
                                                            ,estado
                                                            ,nmpoliza
                                                            ,nmsituac
                                                            ,nmsuplem
                                                            ,cdusuari
                                                            ,cdsisrol
                                                            ,callback
                                                        );
                                                    }
                                                    catch(e)
                                                    {
                                                        Ice.manejaExcepcion(e,ck);
                                                    }
                                                }
                                            });
                                        }
                                    } catch (e) {
                                        Ice.manejaExcepcion(e,ck);
                                    }
                                }
                            });
                        } catch (e) {
                            Ice.manejaExcepcion(e,ck);
                        }
                    }
                });
            } else if (tipodest === 'R') {
                ck = 'Recuperando acciones posteriores a la revisi\u00f3n';
                Ice.request({
                    mascara: ck,
                    url      : Ice.url.bloque.mesacontrol.cargarAccionesEntidad
                    ,params  :
                    {
                        'params.cdtipflu'   : cdtipflu
                        ,'params.cdflujomc' : cdflujomc
                        ,'params.tipoent'   : tipodest
                        ,'params.cdentidad' : clavedest
                        ,'params.webid'     : webiddest
                    }
                    ,success : function(json)
                    {
                        var ck = 'Decodificando respuesta al recuperar acciones posteriores a la revisi\u00f3n';
                        try
                        {
                            Ice.log('### acciones:',json);
                            var numSalidas = 0
                                ,accion1   = ''
                                ,accion2   = ''
                                ,accExito  = ''
                                ,accError  = '';
                            // CDACCION: "138"
                            // CDCOMPMC: null
                            // CDESTADOMC: null
                            // CDFLUJOMC: "12"
                            // CDICONO: null
                            // CDPANTMC: null
                            // CDPROCMC: null
                            // CDREVISI: null
                            // CDTIPFLU: "1"
                            // CDVALIDA: "20"
                            // CDVALOR: null
                            // CLAVEDEST: "20"
                            // DSACCION: "next"
                            // IDDESTIN: "1450139785755_1072"
                            // IDORIGEN: "1450121226109_9387"
                            // TIPODEST: "V"
                            // WEBIDCOMP: null
                            // WEBIDDEST: "1450139785755_1072"
                            // WEBIDESTADO: null
                            // WEBIDPANT: null
                            // WEBIDPROC: null
                            // WEBIDREVISI: null
                            // WEBIDVALIDA: "1450139785755_1072"
                            if(json.list.length==0)
                            {
                                // jtezva 16 agosto 2016
                                // se comenta porque ya no es requerida una accion posterior
                                // if (aux !== 'INICIAL') { // Solo avienta exception si no es INICIAL
                                //     throw 'No hay acciones relacionadas a la revisi\u00f3n';
                                // }
                            }
                            else if(json.list.length==1)
                            {
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
                            else
                            {
                                //     * jtezva 16 agosto 2016
                                //     * si tiene mas de dos entonces es error
                                // if (aux !== 'INICIAL') { // Solo avienta exception si no es INICIAL
                                    throw 'La revisi\u00f3n tiene demasiadas acciones relacionadas';
                                // }
                            }
                            
                            ck = 'Ejecutando revisi\u00f3n';
                            Ice.request({
                                mascara: ck,
                                url      : _GLOBAL_URL_REVISION
                                ,params  :
                                {
                                    'flujo.cdtipflu'   : cdtipflu
                                    ,'flujo.cdflujomc' : cdflujomc
                                    ,'flujo.tipoent'   : tipodest
                                    ,'flujo.claveent'  : clavedest
                                    ,'flujo.webid'     : webiddest
                                    ,'flujo.ntramite'  : ntramite
                                    ,'flujo.status'    : status
                                    ,'flujo.cdunieco'  : cdunieco
                                    ,'flujo.cdramo'    : cdramo
                                    ,'flujo.estado'    : estado
                                    ,'flujo.nmpoliza'  : nmpoliza
                                    ,'flujo.nmsituac'  : nmsituac
                                    ,'flujo.nmsuplem'  : nmsuplem
                                }
                                ,success : function (json) {
                                    var ck = 'Decodificando respuesta al ejecutar revisi\u00f3n';
                                    try
                                    {
                                        Ice.log('### revision:',json);
                                        var faltanDocs = false;
                                        
                                        for (var i = 0; i < json.list.length; i++) {
                                            if (json.list[i].SWOBLIGA === 'S' && json.list[i].SWACTIVO !== 'S') {
                                                faltanDocs = true;
                                                break;
                                            }
                                        }
                                        
                                        // jtezva 16 agosto 2016
                                        // if (aux === 'INICIAL') {
                                        //     faltanDocs = true;
                                        // }
                                        
                                        if (!faltanDocs && false) { // jtezva 16 agosto 2016 no se va a ir solo
                                            if(numSalidas==1)
                                            {
                                                Ice.procesaAccion(
                                                    cdtipflu
                                                    ,cdflujomc
                                                    ,accion1.TIPODEST
                                                    ,accion1.CLAVEDEST
                                                    ,accion1.WEBIDDEST
                                                    ,accion1.AUX
                                                    ,ntramite
                                                    ,status
                                                    ,cdunieco
                                                    ,cdramo
                                                    ,estado
                                                    ,nmpoliza
                                                    ,nmsituac
                                                    ,nmsuplem
                                                    ,cdusuari
                                                    ,cdsisrol
                                                    ,callback
                                                );
                                            }
                                            else if(numSalidas==2)
                                            {
                                                Ice.procesaAccion
                                                (
                                                    cdtipflu
                                                    ,cdflujomc
                                                    ,accExito.TIPODEST
                                                    ,accExito.CLAVEDEST
                                                    ,accExito.WEBIDDEST
                                                    ,accExito.AUX
                                                    ,ntramite
                                                    ,status
                                                    ,cdunieco
                                                    ,cdramo
                                                    ,estado
                                                    ,nmpoliza
                                                    ,nmsituac
                                                    ,nmsuplem
                                                    ,cdusuari
                                                    ,cdsisrol
                                                    ,callback
                                                );
                                            }
                                        } else {
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
                                            
                                            Ext.create('Ext.window.Window', {
                                                title    : 'REVISI\u00D3N DE REQUISITOS Y DOCUMENTOS'
                                                            + (aux === 'LECTURA'
                                                                ? ' (SOLO LECTURA)'
                                                                : ''),
                                                itemId   : 'WINDOW_REVISION_DOCUMENTOS',
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
                                                    cdusuari  : cdusuari,
                                                    cdsisrol  : cdsisrol,
                                                    callback  : callback
                                                },
                                                modal    : true,
                                                //closable : false,
                                                border   : 0,
                                                defaults : {
                                                    style : 'margin : 5px;'
                                                },
                                                items    : [
                                                    {
                                                        xtype : 'displayfield',
                                                        value : 'Favor de revisar los requisitos y documentos obligatorios:'
                                                    }, {
                                                        xtype      : 'grid',
                                                        width      : 900,
                                                        height     : 200,
                                                        autoScroll : true,
                                                        tipo       : 'REQ',
                                                        border     : 0,
                                                        selType    : 'cellmodel',
                                                        plugins    : [
                                                            Ext.create('Ext.grid.plugin.CellEditing', {
                                                                clicksToEdit : 1,
                                                                listeners : {
                                                                    beforeedit : function (me, event) {
                                                                        Ice.log('DSDATO.editor.beforeedit! args:', arguments);
                                                                        if ('S' !== event.record.get('SWPIDEDATO') || json.params.swconfirm === 'S') {
                                                                            return false;
                                                                        }
                                                                    },
                                                                    edit : function(me, event) {
                                                                        var checked = !Ext.isEmpty(event.value) && !Ext.isEmpty(event.value.trim());
                                                                        marcarRequisitoDesdeRevision(event.rowIdx, checked, event.value.trim(),
                                                                            _fieldById('WINDOW_REVISION_DOCUMENTOS').down('[activable]'));
                                                                    }
                                                                }
                                                            })
                                                        ],
                                                        columns    : [
                                                            {
                                                                text      : 'REQUISITO',
                                                                dataIndex : 'DESCRIP',
                                                                flex      : 1
                                                            }, {
                                                                text      : 'OBLIGATORIO',
                                                                dataIndex : 'SWOBLIGA',
                                                                width     : 100,
                                                                renderer  : function (v)
                                                                {
                                                                    var r = '';
                                                                    if (v === 'S') {
                                                                        r = '<img src="'+_GLOBAL_DIRECTORIO_ICONOS+'lock.png" />';
                                                                    }
                                                                    return r;
                                                                }
                                                            }, {
                                                                text      : 'ESTADO',
                                                                xtype     : 'checkcolumn',
                                                                dataIndex : 'CHECK',
                                                                disabled  : json.params.swconfirm === 'S',
                                                                width     : 60,
                                                                listeners : {
                                                                    beforecheckchange : function (me, row, checked, eOpts) {
                                                                        var win = _fieldById('WINDOW_REVISION_DOCUMENTOS'),
                                                                            rec = win.down('grid[tipo=REQ]').getStore().getAt(row);
                                                                        if ('S' === rec.get('SWPIDEDATO')) {
                                                                            if (true === checked) {
                                                                                mensajeWarning('Para activar esta casilla por favor capture el valor en la columna VALOR');
                                                                            } else {
                                                                                mensajeWarning('Para desactivar esta casilla por favor borre el valor en la columna VALOR');
                                                                            }
                                                                            return false;
                                                                        }
                                                                    },
                                                                    checkchange : function (me, row, checked) {
                                                                        marcarRequisitoDesdeRevision(row, checked, '',
                                                                            _fieldById('WINDOW_REVISION_DOCUMENTOS').down('[activable]'));
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
                                                                    if ('S' !== rec.get('SWPIDEDATO')) {
                                                                        return '<span style="font-style : italic;">(N/A)</span>';
                                                                    } else if (Ext.isEmpty(v) || Ext.isEmpty(v.trim())) {
                                                                        return '<span style="font-style : italic;">HAGA CLIC PARA CAPTURAR...</span>';
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
                                                            data   : listaReqs
                                                        })
                                                    }, {
                                                        xtype      : 'grid',
                                                        width      : 900,
                                                        height     : 200,
                                                        autoScroll : true,
                                                        tipo       : 'DOC',
                                                        border     : 0,
                                                        columns    : [
                                                            {
                                                                text      : 'DOCUMENTO',
                                                                dataIndex : 'DESCRIP',
                                                                flex      : 70
                                                            }, {
                                                                text      : 'OBLIGATORIO',
                                                                dataIndex : 'SWOBLIGA',
                                                                flex      : 13,
                                                                renderer  : function (v)
                                                                {
                                                                    var r = '';
                                                                    if (v === 'S') {
                                                                        r = '<img src="'+_GLOBAL_DIRECTORIO_ICONOS+'lock.png" />';
                                                                    }
                                                                    return r;
                                                                }
                                                            }, {
                                                                text      : 'CARGADO',
                                                                dataIndex : 'SWACTIVO',
                                                                flex      : 10,
                                                                renderer  : function (v, md, rec)
                                                                {
                                                                    var r = '';
                                                                    if (v === 'S') {
                                                                        r = '<img src="'+_GLOBAL_DIRECTORIO_ICONOS+'accept.png" />';
                                                                    }
                                                                    else if (rec.get('SWOBLIGA')  === 'S') {
                                                                        r = '<img src="'+_GLOBAL_DIRECTORIO_ICONOS+'cancel.png" />';
                                                                    }
                                                                    return r;
                                                                }
                                                            }, {
                                                                flex      : 7,
                                                                dataIndex : 'SWACTIVO',
                                                                renderer  : function (v, md, rec, row)
                                                                {
                                                                    var r = '';
                                                                    //if (v !== 'S' || true) {
                                                                    if (json.params.swconfirm !== 'S') {
                                                                        r = '<a href="#" onclick="subirArchivoDesdeRevision(' + row + '); return false;">' +
                                                                                '<img src="' + _GLOBAL_DIRECTORIO_ICONOS + 'page_add.png" ' +
                                                                                'data-qtip="Subir archivo" /></a>';
                                                                    }
                                                                    return r;
                                                                }
                                                            }
                                                        ], store : Ext.create('Ext.data.Store', {
                                                            fields : [
                                                                'CLAVE', 'DESCRIP', 'SWOBLIGA', 'SWACTIVO'
                                                            ],
                                                            data   : listaDocs
                                                        })
                                                    }
                                                ],
                                                buttonAlign : 'center',
                                                buttons     : [
                                                    // jtezva 16 agosto 2016 ya no se usa
                                                    // {
                                                    //     text    : 'Aceptar',
                                                    //     handler : function (me) {
                                                    //         me.up('window').destroy();
                                                            
                                                    //         if (numSalidas === 2 && aux != 'INICIAL') { // Cuando sean 2 salidas y no sea inicial ejecuta error
                                                    //             Ice.procesaAccion(
                                                    //                 cdtipflu
                                                    //                 ,cdflujomc
                                                    //                 ,accError.TIPODEST
                                                    //                 ,accError.CLAVEDEST
                                                    //                 ,accError.WEBIDDEST
                                                    //                 ,accError.AUX
                                                    //                 ,ntramite
                                                    //                 ,status
                                                    //                 ,cdunieco
                                                    //                 ,cdramo
                                                    //                 ,estado
                                                    //                 ,nmpoliza
                                                    //                 ,nmsituac
                                                    //                 ,nmsuplem
                                                    //                 ,cdusuari
                                                    //                 ,cdsisrol
                                                    //                 ,callback
                                                    //             );
                                                    //         }
                                                    //     }
                                                    // }
                                                    {
                                                        text      : 'CONFIRMAR Y CONTINUAR',
                                                        icon      : _GLOBAL_DIRECTORIO_ICONOS + 'control_fastforward_blue.png',
                                                        disabled  : numSalidas === 0 || faltanDocs === true || aux === 'LECTURA' || aux === 'INICIAL',
                                                        activable : numSalidas > 0 && 'LECTURA' !== aux && 'INICIAL' !== aux,
                                                        handler   : function (me) {
                                                            centrarVentanaInterna(Ext.MessageBox.confirm(
                                                                'Confirmar',
                                                                'La revisi\u00f3n de requisitos no se podr\u00e1 modificar posteriormente\u0020\u00BFDesea continuar?',
                                                                function(btn)
                                                                {
                                                                    if(btn === 'yes')
                                                                    {
                                                                        var mask, ck = 'Confirmando revisi\u00f3n';
                                                                        try {
                                                                            Ice.request({
                                                                                mascara: ck,
                                                                                url     : _GLOBAL_URL_CONFIRMAR_REVISION,
                                                                                params  : {
                                                                                    'params.cdtipflu'  : cdtipflu,
                                                                                    'params.cdflujomc' : cdflujomc,
                                                                                    'params.ntramite'  : ntramite,
                                                                                    'params.cdrevisi'  : clavedest,
                                                                                    'params.swconfirm' : 'S'
                                                                                },
                                                                                success : function (json) {
                                                                                    var ck = 'Decodificando respuesta al confirmar revisi\u00f3n';
                                                                                    try {
                                                                                        Ice.log('### confirmar revision:', json);
                                                                                        var win = me.up('window');
                                                                                        Ice.procesaAccion
                                                                                        (
                                                                                            cdtipflu
                                                                                            ,cdflujomc
                                                                                            ,accion1.TIPODEST
                                                                                            ,accion1.CLAVEDEST
                                                                                            ,accion1.WEBIDDEST
                                                                                            ,accion1.AUX
                                                                                            ,ntramite
                                                                                            ,status
                                                                                            ,cdunieco
                                                                                            ,cdramo
                                                                                            ,estado
                                                                                            ,nmpoliza
                                                                                            ,nmsituac
                                                                                            ,nmsuplem
                                                                                            ,cdusuari
                                                                                            ,cdsisrol
                                                                                            ,callback
                                                                                        );
                                                                                        win.destroy();
                                                                                    } catch (e) {
                                                                                        Ice.manejaExcepcion(e, ck);
                                                                                    }
                                                                                }
                                                                            });
                                                                        } catch (e) {
                                                                            Ice.manejaExcepcion(e, ck, mask);
                                                                        }
                                                                    }
                                                                }
                                                            ));
                                                        }
                                                    }, {
                                                        text    : 'DOCUMENTOS',
                                                        icon    : _GLOBAL_DIRECTORIO_ICONOS + 'printer.png',
                                                        handler : function (me) {
                                                            var win = me.up('window');
                                                            //Ext.syncRequire(_GLOBAL_DIRECTORIO_DEFINES+'VentanaDocumentos');
                                                            var winDoc = Ext.create({
                                                                xtype: 'ventanadocumentos',
                                                                cdtipflu   : cdtipflu
                                                                ,cdflujomc : cdflujomc
                                                                ,tipoent   : tipodest
                                                                ,claveent  : clavedest
                                                                ,webid     : webiddest
                                                                ,aux       : ''// 'INICIAL' === flujo.aux || 'LECTURA' === flujo.aux 
                                                                                            // ? ''
                                                                                            // : flujo.aux
                                                                ,ntramite  : ntramite
                                                                ,status    : status
                                                                ,cdunieco  : cdunieco
                                                                ,cdramo    : cdramo
                                                                ,estado    : estado
                                                                ,nmpoliza  : nmpoliza
                                                                ,nmsituac  : nmsituac
                                                                ,nmsuplem  : nmsuplem
                                                                ,cdusuari  : cdusuari
                                                                ,cdsisrol  : cdsisrol
                                                            }).mostrar();
                                                            winDoc.on({
                                                                destroy : function() {
                                                                    win.recargar();
                                                                }
                                                            });
                                                        }
                                                    }, {
                                                        text    : 'CONTINUAR',
                                                        icon    : _GLOBAL_DIRECTORIO_ICONOS + 'accept.png',
                                                        hidden  : !(numSalidas === 0 || faltanDocs === true || aux === 'LECTURA' || aux === 'INICIAL'),
                                                        handler : function (me) {
                                                            me.up('window').close();
                                                        }
                                                    }
                                                    // jtezva 16 dic 2016 se quita
                                                    // , {
                                                    //     text    : 'RECARGAR',
                                                    //     icon    : _GLOBAL_DIRECTORIO_ICONOS + 'control_repeat_blue.png',
                                                    //     handler : function (me) {
                                                    //         me.up('window').recargar();
                                                    //     }
                                                    // }
                                                ],
                                                recargar : function () {
                                                    Ice.log('>WINDOW_REVISION_DOCUMENTOS recargar');
                                                    var me = this;
                                                    
                                                    Ice.procesaAccion(
                                                        me.flujo.cdtipflu
                                                        ,me.flujo.cdflujomc
                                                        ,me.flujo.tipodest
                                                        ,me.flujo.clavedest
                                                        ,me.flujo.webiddest
                                                        ,me.flujo.aux
                                                        ,me.flujo.ntramite
                                                        ,me.flujo.status
                                                        ,me.flujo.cdunieco
                                                        ,me.flujo.cdramo
                                                        ,me.flujo.estado
                                                        ,me.flujo.nmpoliza
                                                        ,me.flujo.nmsituac
                                                        ,me.flujo.nmsuplem
                                                        ,me.flujo.cdusuari
                                                        ,me.flujo.cdsisrol
                                                        ,me.flujo.callback
                                                    );
                                                    
                                                    me.destroy();
                                                }
                                            }).show();
                                        }
                                        // }
                                        // else
                                        // {
                                        //     if(numSalidas<2)
                                        //     {
                                        //         mensajeError(json.message);
                                        //     }
                                        //     else
                                        //     {
                                        //         mensajeError
                                        //         (
                                        //             json.message
                                        //             ,function()
                                        //             {
                                        //                 Ice.procesaAccion
                                        //                 (
                                        //                     cdtipflu
                                        //                     ,cdflujomc
                                        //                     ,accError.TIPODEST
                                        //                     ,accError.CLAVEDEST
                                        //                     ,accError.WEBIDDEST
                                        //                     ,accError.AUX
                                        //                     ,ntramite
                                        //                     ,status
                                        //                     ,cdunieco
                                        //                     ,cdramo
                                        //                     ,estado
                                        //                     ,nmpoliza
                                        //                     ,nmsituac
                                        //                     ,nmsuplem
                                        //                     ,cdusuari
                                        //                     ,cdsisrol
                                        //                     ,callback
                                        //                 );
                                        //             }
                                        //         );
                                        //     }
                                        // }
                                    }
                                    catch(e)
                                    {
                                        if(numSalidas<2)
                                        {
                                            Ice.manejaExcepcion(e,ck);
                                        }
                                        else
                                        {
                                            debugError(e);
                                            Ice.mensajeError({
                                                mensaje: 'Error al manejar respuesta de proceso',
                                                callback: function (){
                                                    Ice.procesaAccion(
                                                        cdtipflu
                                                        ,cdflujomc
                                                        ,accError.TIPODEST
                                                        ,accError.CLAVEDEST
                                                        ,accError.WEBIDDEST
                                                        ,accError.AUX
                                                        ,ntramite
                                                        ,status
                                                        ,cdunieco
                                                        ,cdramo
                                                        ,estado
                                                        ,nmpoliza
                                                        ,nmsituac
                                                        ,nmsuplem
                                                        ,cdusuari
                                                        ,cdsisrol
                                                        ,callback
                                                    );
                                                }
                                            });
                                        }
                                    }
                                }
                                ,failure: function (response) {
                                    if(numSalidas<2)
                                    {
                                        errorComunicacion(null,'Error al ejecutar revisi\u00f3n');
                                    }
                                    else
                                    {
                                        Ice.mensajeError(
                                            'Error de comunicaci\u00f3n al ejecutar revisi\u00f3n'
                                            ,function()
                                            {
                                                Ice.procesaAccion(
                                                    cdtipflu
                                                    ,cdflujomc
                                                    ,accError.TIPODEST
                                                    ,accError.CLAVEDEST
                                                    ,accError.WEBIDDEST
                                                    ,accError.AUX
                                                    ,ntramite
                                                    ,status
                                                    ,cdunieco
                                                    ,cdramo
                                                    ,estado
                                                    ,nmpoliza
                                                    ,nmsituac
                                                    ,nmsuplem
                                                    ,cdusuari
                                                    ,cdsisrol
                                                    ,callback
                                                );
                                            }
                                        );
                                    }
                                }
                            });
                        }
                        catch(e)
                        {
                            Ice.manejaExcepcion(e,ck);
                        }
                    }
                });
            } else if (tipodest ===' M') {
                ck = 'Recuperando valores de correo';
                Ext.Ajax.request(
                {
                    mascara: ck,
                    url      : Ice.url.core.recuperacionSimple
                    ,params  :
                    {
                        'params.consulta'   : 'RECUPERAR_TFLUMAIL'
                        ,'params.cdtipflu'  : cdtipflu
                        ,'params.cdflujomc' : cdflujomc
                        ,'params.cdmail'    : clavedest
                    }
                    ,success : function(json)
                    {
                        var ck = 'Decodificando respuesta al recuperar valores de correo';
                        try
                        {
                            Ice.log('### tflumail:',json);
                            if(json.list.length==0)
                            {
                                throw 'El correo no existe';
                            }
                            else if(json.list.length>1)
                            {
                                throw 'Correo duplicado';
                            }
                            var data = json.list[0];
                            Ice.log('data:',data);
                            
                            ck = 'Recuperando acciones posteriores a la validaci\u00f3n';
                            Ice.request(
                            {
                                mascara: ck,
                                url      : Ice.url.bloque.mesacontrol.cargarAccionesEntidad
                                ,params  :
                                {
                                    'params.cdtipflu'   : cdtipflu
                                    ,'params.cdflujomc' : cdflujomc
                                    ,'params.tipoent'   : tipodest
                                    ,'params.cdentidad' : clavedest
                                    ,'params.webid'     : webiddest
                                }
                                ,success : function(jsonAcc)
                                {
                                    var ck = 'Decodificando respuesta al recuperar acciones posteriores a la validaci\u00f3n';
                                    try
                                    {
                                        Ice.log('### acciones:',jsonAcc);
                                        var numSalidas = jsonAcc.list.length
                                            ,acciones  = jsonAcc.list;
                                        if(jsonAcc.list.length < 2){
                                            ck = 'Enviando correo';
                                            Ice.request({
                                                mascara: ck,
                                                url      : _GLOBAL_URL_ENVIAR_CORREO_FLUJO
                                                ,params  :
                                                {
                                                    'flujo.cdtipflu'     : cdtipflu
                                                    ,'flujo.cdflujomc'   : cdflujomc
                                                    ,'flujo.tipoent'     : tipodest
                                                    ,'flujo.claveent'    : clavedest
                                                    ,'flujo.webid'       : webiddest
                                                    ,'flujo.ntramite'    : ntramite
                                                    ,'flujo.status'      : status
                                                    ,'flujo.cdunieco'    : cdunieco
                                                    ,'flujo.cdramo'      : cdramo
                                                    ,'flujo.estado'      : estado
                                                    ,'flujo.nmpoliza'    : nmpoliza
                                                    ,'flujo.nmsituac'    : nmsituac
                                                    ,'flujo.nmsuplem'    : nmsuplem
                                                    ,'flujo.aux'         : aux
                                                    ,'params.dsdestino'  : data.DSDESTINO
                                                    ,'params.dsasunto'   : data.DSASUNTO
                                                    ,'params.dsmensaje'  : data.DSMENSAJE
                                                    ,'params.vardestino' : data.VARDESTINO
                                                    ,'params.varmensaje' : data.VARMENSAJE
                                                    ,'params.varasunto'  : data.VARASUNTO
                                                }
                                                ,success : function(json)
                                                {
                                                    var ck = 'decod Enviando correo';
                                                    try
                                                    {
                                                        Ice.log('### validacion:',json);
                                                        if(numSalidas == 0){
                                                            mensajeCorrecto('Correo enviado','Correo enviado');
                                                        }else{
                                                            Ice.procesaAccion
                                                            (
                                                                    cdtipflu
                                                                    ,cdflujomc
                                                                    ,acciones[0].TIPODEST
                                                                    ,acciones[0].CLAVEDEST
                                                                    ,acciones[0].WEBIDDEST
                                                                    ,acciones[0].AUX
                                                                    ,ntramite
                                                                    ,status
                                                                    ,cdunieco
                                                                    ,cdramo
                                                                    ,estado
                                                                    ,nmpoliza
                                                                    ,nmsituac
                                                                    ,nmsuplem
                                                                    ,cdusuari
                                                                    ,cdsisrol
                                                                    ,callback
                                                            );
                                                        }
                                                    }
                                                    catch(e)
                                                    {
                                                        Ice.manejaExcepcion(e,ck);
                                                    }
                                                }
                                            });
                                        }else{
                                            throw 'Hay demasiadas acciones relacionadas al correo';
                                        }
                                    }
                                    catch(e)
                                    {
                                        Ice.manejaExcepcion(e,ck);
                                    }
                                }
                            });
                        } catch (e) {
                            Ice.manejaExcepcion(e,ck);
                        }
                    }
                });
            */
            else {
                throw 'Entidad inv\u00e1lida';
            }
        } catch(e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});