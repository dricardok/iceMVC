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

    logActivo: true,
    
//    procesaAccion: function(
//            cdtipflu,
//            cdflujomc,
//            tipodest,
//            clavedest,
//            webiddest,
//            aux,
//            ntramite,
//            status,
//            cdunieco,
//            cdramo,
//            estado,
//            nmpoliza,
//            nmsituac,
//            nmsuplem,
//            cdusuari,
//            cdsisrol,
//            callback){
//        Ice.log('_procesaAccion cdtipflu:'  , cdtipflu  , '.');
//        Ice.log('_procesaAccion cdflujomc:' , cdflujomc , '.');
//        Ice.log('_procesaAccion tipodest:'  , tipodest  , '.');
//        Ice.log('_procesaAccion clavedest:' , clavedest , '.');
//        Ice.log('_procesaAccion webiddest:' , webiddest , '.');
//        Ice.log('_procesaAccion aux:'       , aux       , '.');
//        Ice.log('_procesaAccion ntramite:'  , ntramite  , '.');
//        Ice.log('_procesaAccion status:'    , status    , '.');
//        Ice.log('_procesaAccion cdunieco:'  , cdunieco  , '.');
//        Ice.log('_procesaAccion cdramo:'    , cdramo    , '.');
//        Ice.log('_procesaAccion estado:'    , estado    , '.');
//        Ice.log('_procesaAccion nmpoliza:'  , nmpoliza  , '.');
//        Ice.log('_procesaAccion nmsituac:'  , nmsituac  , '.');
//        Ice.log('_procesaAccion nmsuplem:'  , nmsuplem  , '.');
//        Ice.log('_procesaAccion cdusuari:'  , cdusuari  , '.');
//        Ice.log('_procesaAccion cdsisrol:'  , cdsisrol  , '.');
//        Ice.log('_procesaAccion callback?:' , !Ext.isEmpty(callback) , '.');
//        var ck = 'Procesando acci\u00f3n';
//        try{
//            if(tipodest=='E'){
//                ck = 'Recuperando valores de status';
//                Ice.mask(ck);
//                Ext.Ajax.request({
//                    url: Ice.url.core.recuperacionSimple,
//                    params: {
//                        'params.consulta': 'RECUPERAR_TFLUEST',
//                        'params.cdtipflu': cdtipflu,
//                        'params.cdflujomc': cdflujomc
//                        //,'params.cdestadomc' : clavedest
//                    },
//                    success : function(response){
//                        _unmask();
//                        var ck = 'Decodificando respuesta al recuperar valores de status';
//                        try{
//                            var json = Ext.decode(response.responseText);
//                            Ice.log('### tfluest:',json);
//                            if(json.success == true){
//                                var estadoOld, estadoNew;
//                                for(var i=0; i < json.list.length; i++){
//                                    var estadoIte = json.list[i];
//                                    if(Number(estadoIte.CDESTADOMC)==Number(status)){
//                                        estadoOld = {
//                                            CDTIPASIG : ''+estadoIte.CDTIPASIG
//                                        };
//                                    }
//                                    if(Number(estadoIte.CDESTADOMC)==Number(clavedest)){
//                                        estadoNew = {
//                                            CDTIPASIG : ''+estadoIte.CDTIPASIG
//                                        };
//                                    }
//                                }
//                                
//                                if(Ext.isEmpty(estadoOld)||Ext.isEmpty(estadoNew)){
//                                    throw 'No se encuentran los status de turnado';
//                                }
//                                
//                                ck = 'Turnando tr\u00e1mite';
//                                Ice.mask(ck);
//                                Ext.Ajax.request({
//                                    url: Ice.url.bloque.mesacontrol.turnar,
//                                    params: {
//                                        'params.ntramite': ntramite,
//                                        'params.statusOld': status
//                                        'params.cdtipasigOld': estadoOld.CDTIPASIG
//                                        'params.statusNew': clavedest
//                                        'params.cdtipasigNew': estadoNew.CDTIPASIG
//                                    },
//                                    success : function(response){
//                                        _unmask();
//                                        var ck = 'Decodificando respuesta al turnar tr\u00e1mite';
//                                        try{
//                                            var json = Ext.decode(response.responseText);
//                                            Ice.log('### turnar:',json);
//                                            if(json.success == true){
//                                                mensajeCorrecto('Tr\u00e1mite turnado',json.message,callback);
//                                            } else {
//                                                mensajeError(json.message);
//                                            }
//                                        } catch(e) {
//                                            manejaException(e,ck);
//                                        }
//                                    },
//                                    failure : function(){
//                                        _unmask();
//                                        errorComunicacion(null,'Error al turnar tr\u00e1mite');
//                                    }
//                                });
//                            } else {
//                                mensajeError(json.message);
//                            }
//                        } catch(e) {
//                            manejaException(e,ck);
//                        }
//                    },
//                    failure : function() {
//                        _unmask();
//                        errorComunicacion(null,'Error al recuperar valores de status');
//                    }
//                });
//            } else if(tipodest=='P') {
//                ck = 'Recuperando valores de pantalla';
//                Ice.mask(ck);
//                Ext.Ajax.request({
//                    url: Ice.url.core.recuperacionSimple,
//                    params: {
//                        'params.consulta': 'RECUPERAR_TPANTMC',
//                        'params.CDPANTMC': clavedest
//                    },
//                    success: function(response){
//                        _unmask();
//                        var ck = 'Decodificando respuesta al recuperar valores de pantalla';
//                        try{
//                            var json = Ext.decode(response.responseText);
//                            Ice.log('### tpantmc:',json);
//                            if(json.success == true){
//                                if(json.list.length == 0){
//                                    throw 'La pantalla no existe';
//                                } else if(json.list.length > 1) {
//                                    throw 'Pantalla duplicada';
//                                }
//                                var pantalla = json.list[0];
//                                Ice.log('pantalla:',pantalla);
//                                ck = 'Enviando petici\u00f3n';
//                                Ice.mask('Redireccionando');
//                                Ext.create('Ext.form.Panel').submit({
//                                    url: Ice.nvl(pantalla.SWEXTERNA,'N')=='N' ?
//                                        _GLOBAL_CONTEXTO + pantalla.URLPANTMC :
//                                        Ice.url.bloque.mesacontrol.pantallaExterna,
//                                    standardSubmit: true,
//                                    //,target         : '_top'
//                                    params: {
//                                        'flujo.cdtipflu': cdtipflu,
//                                        'flujo.cdflujomc': cdflujomc,
//                                        'flujo.tipoent': tipodest,
//                                        'flujo.claveent': clavedest,
//                                        'flujo.webid': webiddest,
//                                        'flujo.ntramite': ntramite,
//                                        'flujo.status': status,
//                                        'flujo.cdunieco': cdunieco,
//                                        'flujo.cdramo': cdramo,
//                                        'flujo.estado': estado,
//                                        'flujo.nmpoliza': nmpoliza,
//                                        'flujo.nmsituac': nmsituac,
//                                        'flujo.nmsuplem': nmsuplem,
//                                        'flujo.aux': aux,
//                                        'params.url': Ice.nvl(pantalla.SWEXTERNA,'N') == 'N' ? '':pantalla.URLPANTMC
//                                    }
//                                });
//                            } else {
//                                mensajeError(json.message);
//                            }
//                        } catch(e) {
//                            manejaException(e,ck);
//                        }
//                    },
//                    failure: function() {
//                        _unmask();
//                        errorComunicacion(null,'Error al recuperar valores de pantalla');
//                    }
//                });
//            } else if(tipodest=='C') {
//                ck = 'Recuperando valores de componente';
//                Ice.mask(ck);
//                Ext.Ajax.request({
//                    url: Ice.url.core.recuperacionSimple,
//                    params: {
//                        'params.consulta'  : 'RECUPERAR_TCOMPMC',
//                        'params.CDCOMPMC' : clavedest
//                    },
//                    success : function(response){
//                        _unmask();
//                        var ck = 'Decodificando respuesta al recuperar valores de componente';
//                        try{
//                            var json = Ext.decode(response.responseText);
//                            Ice.log('### tcompmc:',json);
//                            if(json.success == true) {
//                                if(json.list.length == 0) {
//                                    throw 'El componente no existe';
//                                } else if(json.list.length > 1) {
//                                    throw 'Componente duplicado';
//                                }
//                                var compData = json.list[0];
//                                Ice.log('compData:',compData);
//                                
//                                ck = 'Creando componente';
//                                Ext.syncRequire(_GLOBAL_DIRECTORIO_DEFINES+compData.NOMCOMP);
//                                new window[compData.NOMCOMP]({
//                                    cdtipflu: cdtipflu,
//                                    cdflujomc: cdflujomc,
//                                    tipoent: tipodest,
//                                    claveent: clavedest,
//                                    webid: webiddest,
//                                    aux: aux,
//                                    ntramite: ntramite,
//                                    status: status,
//                                    cdunieco: cdunieco,
//                                    cdramo: cdramo,
//                                    estado: estado,
//                                    nmpoliza: nmpoliza,
//                                    nmsituac: nmsituac,
//                                    nmsuplem: nmsuplem,
//                                    cdusuari: cdusuari,
//                                    cdsisrol: cdsisrol
//                                }).mostrar();
//                            } else {
//                                mensajeError(json.message);
//                            }
//                        } catch(e) {
//                            manejaException(e,ck);
//                        }
//                    },
//                    failure : function() {
//                        _unmask();
//                        errorComunicacion(null,'Error al recuperar valores de componente');
//                    }
//                });
//            } else if(tipodest=='O') {
//                ck = 'Recuperando valores de proceso';
//                Ice.mask(ck);
//                Ext.Ajax.request({
//                    url: Ice.url.core.recuperacionSimple,
//                    params:{
//                        'params.consulta'  : 'RECUPERAR_TPROCMC',
//                        'params.CDPROCMC' : clavedest
//                    },
//                    success : function(response){
//                        _unmask();
//                        var ck = 'Decodificando respuesta al recuperar valores de proceso';
//                        try{
//                            var json = Ext.decode(response.responseText);
//                            Ice.log('### tprocmc:',json);
//                            if(json.success==true){
//                                if(json.list.length==0){
//                                    throw 'El proceso no existe';
//                                } else if(json.list.length>1) {
//                                    throw 'Proceso duplicado';
//                                }
//                                var data = json.list[0];
//                                Ice.log('data:',data);
//                                
//                                ck = 'Recuperando acciones posteriores al proceso';
//                                Ice.mask(ck);
//                                Ext.Ajax.request({
//                                    url: Ice.url.bloque.mesacontrol.cargarAccionesEntidad,
//                                    params: {
//                                        'params.cdtipflu': cdtipflu,
//                                        'params.cdflujomc': cdflujomc,
//                                        'params.tipoent': tipodest,
//                                        'params.cdentidad': clavedest,
//                                        'params.webid': webiddest
//                                    },
//                                    success : function(response){
//                                        _unmask();
//                                        var ck = 'Decodificando respuesta al recuperar acciones posteriores al proceso';
//                                        try {
//                                            var json = Ext.decode(response.responseText);
//                                            Ice.log('### acciones:',json);
//                                            var numSalidas = 0,
//                                                accion1   = '',
//                                                accion2   = '',
//                                                accExito  = '',
//                                                accError  = '';
//                                            if(json.success == true){
//                                                /*
//                                                CDACCION: "138"
//                                                CDCOMPMC: null
//                                                CDESTADOMC: null
//                                                CDFLUJOMC: "12"
//                                                CDICONO: null
//                                                CDPANTMC: null
//                                                CDPROCMC: null
//                                                CDREVISI: null
//                                                CDTIPFLU: "1"
//                                                CDVALIDA: "20"
//                                                CDVALOR: null
//                                                CLAVEDEST: "20"
//                                                DSACCION: "next"
//                                                IDDESTIN: "1450139785755_1072"
//                                                IDORIGEN: "1450121226109_9387"
//                                                TIPODEST: "V"
//                                                WEBIDCOMP: null
//                                                WEBIDDEST: "1450139785755_1072"
//                                                WEBIDESTADO: null
//                                                WEBIDPANT: null
//                                                WEBIDPROC: null
//                                                WEBIDREVISI: null
//                                                WEBIDVALIDA: "1450139785755_1072"
//                                                */
//                                                if(json.list.length == 1){
//                                                    numSalidas = 1;
//                                                    accion1    = json.list[0];
//                                                } else if(json.list.length==2) {
//                                                    numSalidas = 2;
//                                                    accion1    = json.list[0];
//                                                    accion2    = json.list[1];
//                                                    
//                                                    if(Ice.nvl(accion1.CDVALOR,'') == 'EXITO') {
//                                                        accExito = accion1;
//                                                    } else if(Ice.nvl(accion2.CDVALOR,'') == 'EXITO') {
//                                                        accExito = accion2;
//                                                    }
//                                                    if(Ice.nvl(accion1.CDVALOR,'')=='ERROR'){
//                                                        accError = accion1;
//                                                    } else if(Ice.nvl(accion2.CDVALOR,'') == 'ERROR'){
//                                                        accError = accion2;
//                                                    }
//                                                    
//                                                    if(Ext.isEmpty(accExito)||Ext.isEmpty(accError)){
//                                                        throw 'Las acciones relacionadas al proceso no tienen el valor EXITO/ERROR adecuado';
//                                                    }
//                                                } else if(json.list.length > 2) {
//                                                    throw 'El proceso tiene demasiadas acciones relacionadas';
//                                                }
//                                                
//                                                ck = 'Ejecutando proceso';
//                                                Ice.mask(ck);
//                                                Ext.Ajax.request({
//                                                    url      : _GLOBAL_CONTEXTO+data.URLPROCMC,
//                                                    params: {
//                                                        'flujo.cdtipflu': cdtipflu,
//                                                        'flujo.cdflujomc': cdflujomc,
//                                                        'flujo.tipoent': tipodest,
//                                                        'flujo.claveent': clavedest,
//                                                        'flujo.webid': webiddest,
//                                                        'flujo.ntramite': ntramite,
//                                                        'flujo.status': status,
//                                                        'flujo.cdunieco': cdunieco,
//                                                        'flujo.cdramo': cdramo,
//                                                        'flujo.estado': estado,
//                                                        'flujo.nmpoliza': nmpoliza,
//                                                        'flujo.nmsituac': nmsituac,
//                                                        'flujo.nmsuplem': nmsuplem,
//                                                        'flujo.aux': aux
//                                                    },
//                                                    success : function(response){
//                                                        _unmask();
//                                                        var ck = 'Decodificando respuesta al ejecutar proceso';
//                                                        try{
//                                                            var json = Ext.decode(response.responseText);
//                                                            Ice.log('### proceso:',json);
//                                                            if(json.success == true){
//                                                                if(numSalidas == 0){
//                                                                    mensajeCorrecto('AVISO',json.message,callback);
//                                                                } else if(numSalidas == 1){
//                                                                    /* JTEZVA 2016 08 30 YA NO QUIERO AVISOS, QUE CONTINUE
//                                                                    mensajeCorrecto
//                                                                    (
//                                                                        'AVISO'
//                                                                        ,json.message
//                                                                        ,function()
//                                                                        {*/
//                                                                            Ice.procesaAccion(
//                                                                                cdtipflu
//                                                                                ,cdflujomc
//                                                                                ,accion1.TIPODEST
//                                                                                ,accion1.CLAVEDEST
//                                                                                ,accion1.WEBIDDEST
//                                                                                ,aux
//                                                                                ,ntramite
//                                                                                ,status
//                                                                                ,cdunieco
//                                                                                ,cdramo
//                                                                                ,estado
//                                                                                ,nmpoliza
//                                                                                ,nmsituac
//                                                                                ,nmsuplem
//                                                                                ,cdusuari
//                                                                                ,cdsisrol
//                                                                                ,callback
//                                                                            );/*
//                                                                        }
//                                                                    );*/
//                                                                } else if(numSalidas == 2) {
//                                                                    /* JTEZVA 2016 08 30 YA NO QUIERO AVISOS, QUE CONTINUE
//                                                                    mensajeCorrecto
//                                                                    (
//                                                                        'AVISO'
//                                                                        ,json.message
//                                                                        ,function()
//                                                                        {*/
//                                                                            _procesaAccion
//                                                                            (
//                                                                                cdtipflu
//                                                                                ,cdflujomc
//                                                                                ,accExito.TIPODEST
//                                                                                ,accExito.CLAVEDEST
//                                                                                ,accExito.WEBIDDEST
//                                                                                ,aux
//                                                                                ,ntramite
//                                                                                ,status
//                                                                                ,cdunieco
//                                                                                ,cdramo
//                                                                                ,estado
//                                                                                ,nmpoliza
//                                                                                ,nmsituac
//                                                                                ,nmsuplem
//                                                                                ,cdusuari
//                                                                                ,cdsisrol
//                                                                                ,callback
//                                                                            );/*
//                                                                        }
//                                                                    );*/
//                                                                }
//                                                            }
//                                                            else
//                                                            {
//                                                                if(numSalidas<2)
//                                                                {
//                                                                    mensajeError(json.message);
//                                                                }
//                                                                else
//                                                                {
//                                                                    mensajeError
//                                                                    (
//                                                                        json.message
//                                                                        ,function()
//                                                                        {
//                                                                            _procesaAccion
//                                                                            (
//                                                                                cdtipflu
//                                                                                ,cdflujomc
//                                                                                ,accError.TIPODEST
//                                                                                ,accError.CLAVEDEST
//                                                                                ,accError.WEBIDDEST
//                                                                                ,aux
//                                                                                ,ntramite
//                                                                                ,status
//                                                                                ,cdunieco
//                                                                                ,cdramo
//                                                                                ,estado
//                                                                                ,nmpoliza
//                                                                                ,nmsituac
//                                                                                ,nmsuplem
//                                                                                ,cdusuari
//                                                                                ,cdsisrol
//                                                                                ,callback
//                                                                            );
//                                                                        }
//                                                                    );
//                                                                }
//                                                            }
//                                                        }
//                                                        catch(e)
//                                                        {
//                                                            if(numSalidas<2)
//                                                            {
//                                                                manejaException(e,ck);
//                                                            }
//                                                            else
//                                                            {
//                                                                debugError(e);
//                                                                mensajeError
//                                                                (
//                                                                    'Error al manejar respuesta de proceso'
//                                                                    ,function()
//                                                                    {
//                                                                        _procesaAccion
//                                                                        (
//                                                                            cdtipflu
//                                                                            ,cdflujomc
//                                                                            ,accError.TIPODEST
//                                                                            ,accError.CLAVEDEST
//                                                                            ,accError.WEBIDDEST
//                                                                            ,aux
//                                                                            ,ntramite
//                                                                            ,status
//                                                                            ,cdunieco
//                                                                            ,cdramo
//                                                                            ,estado
//                                                                            ,nmpoliza
//                                                                            ,nmsituac
//                                                                            ,nmsuplem
//                                                                            ,cdusuari
//                                                                            ,cdsisrol
//                                                                            ,callback
//                                                                        );
//                                                                    }
//                                                                );
//                                                            }
//                                                        }
//                                                    }
//                                                    ,failure : function(response)
//                                                    {
//                                                        _unmask();
//                                                        if(numSalidas<2)
//                                                        {
//                                                            errorComunicacion(null,'Error al ejecutar proceso');
//                                                        }
//                                                        else
//                                                        {
//                                                            mensajeError(
//                                                                'Error de comunicaci\u00f3n al ejecutar proceso'
//                                                                ,function()
//                                                                {
//                                                                    _procesaAccion
//                                                                    (
//                                                                        cdtipflu
//                                                                        ,cdflujomc
//                                                                        ,accError.TIPODEST
//                                                                        ,accError.CLAVEDEST
//                                                                        ,accError.WEBIDDEST
//                                                                        ,aux
//                                                                        ,ntramite
//                                                                        ,status
//                                                                        ,cdunieco
//                                                                        ,cdramo
//                                                                        ,estado
//                                                                        ,nmpoliza
//                                                                        ,nmsituac
//                                                                        ,nmsuplem
//                                                                        ,cdusuari
//                                                                        ,cdsisrol
//                                                                        ,callback
//                                                                    );
//                                                                }
//                                                            );
//                                                        }
//                                                    }
//                                                });
//                                            }
//                                            else
//                                            {
//                                                mensajeError(json.message);
//                                            }
//                                        }
//                                        catch(e)
//                                        {
//                                            manejaException(e,ck);
//                                        }
//                                    }
//                                    ,failure : function()
//                                    {
//                                        _unmask();
//                                        errorComunicacion(null,'Error al recuperar acciones posteriores al proceso');
//                                    }
//                                });
//                            }
//                            else
//                            {
//                                mensajeError(json.message);
//                            }
//                        }
//                        catch(e)
//                        {
//                            manejaException(e,ck);
//                        }
//                    }
//                    ,failure : function()
//                    {
//                        _unmask();
//                        errorComunicacion(null,'Error al recuperar valores de proceso');
//                    }
//                });
//            }
//            else if(tipodest=='V')
//            {
//                ck = 'Recuperando valores de validaci\u00f3n';
//                Ice.mask(ck);
//                Ext.Ajax.request(
//                {
//                    url      : Ice.url.core.recuperacionSimple
//                    ,params  :
//                    {
//                        'params.consulta'   : 'RECUPERAR_TFLUVAL'
//                        ,'params.cdtipflu'  : cdtipflu
//                        ,'params.cdflujomc' : cdflujomc
//                        ,'params.cdvalida'  : clavedest
//                    }
//                    ,success : function(response)
//                    {
//                        _unmask();
//                        var ck = 'Decodificando respuesta al recuperar valores de validaci\u00f3n';
//                        try
//                        {
//                            var json = Ext.decode(response.responseText);
//                            Ice.log('### tfluval:',json);
//                            if(json.success==true)
//                            {
//                                if(json.list.length==0)
//                                {
//                                    throw 'La validaci\u00f3n no existe';
//                                }
//                                else if(json.list.length>1)
//                                {
//                                    throw 'Validaci\u00f3n duplicada';
//                                }
//                                var data = json.list[0];
//                                Ice.log('data:',data);
//                                
//                                var cliente = false;
//                                if('x'+data.CDVALIDAFK=='x-1')
//                                {
//                                    if(Ext.isEmpty(data.JSVALIDA))
//                                    {
//                                        throw 'La validaci\u00f3n no cuenta con una clave ni validaci\u00f3n cliente';
//                                    }
//                                    else
//                                    {
//                                        cliente = true;
//                                    }
//                                }
//                                
//                                ck = 'Recuperando acciones posteriores a la validaci\u00f3n';
//                                Ice.mask(ck);
//                                Ext.Ajax.request(
//                                {
//                                    url      : Ice.url.bloque.mesacontrol.cargarAccionesEntidad
//                                    ,params  :
//                                    {
//                                        'params.cdtipflu'   : cdtipflu
//                                        ,'params.cdflujomc' : cdflujomc
//                                        ,'params.tipoent'   : tipodest
//                                        ,'params.cdentidad' : clavedest
//                                        ,'params.webid'     : webiddest
//                                    }
//                                    ,success : function(response)
//                                    {
//                                        _unmask();
//                                        var ck = 'Decodificando respuesta al recuperar acciones posteriores a la validaci\u00f3n';
//                                        try
//                                        {
//                                            var json = Ext.decode(response.responseText);
//                                            Ice.log('### acciones:',json);
//                                            var numSalidas = json.list.length
//                                                ,acciones  = json.list;
//                                            if(json.success==true)
//                                            {
//                                                /*
//                                                CDACCION: "138"
//                                                CDCOMPMC: null
//                                                CDESTADOMC: null
//                                                CDFLUJOMC: "12"
//                                                CDICONO: null
//                                                CDPANTMC: null
//                                                CDPROCMC: null
//                                                CDREVISI: null
//                                                CDTIPFLU: "1"
//                                                CDVALIDA: "20"
//                                                CDVALOR: null
//                                                CLAVEDEST: "20"
//                                                DSACCION: "next"
//                                                IDDESTIN: "1450139785755_1072"
//                                                IDORIGEN: "1450121226109_9387"
//                                                TIPODEST: "V"
//                                                WEBIDCOMP: null
//                                                WEBIDDEST: "1450139785755_1072"
//                                                WEBIDESTADO: null
//                                                WEBIDPANT: null
//                                                WEBIDPROC: null
//                                                WEBIDREVISI: null
//                                                WEBIDVALIDA: "1450139785755_1072"
//                                                */
//                                                if(json.list.length==0)
//                                                {
//                                                    throw 'No hay acciones relacionadas a la validaci\u00f3n';
//                                                }
//                                                for(var i=0 ; i<numSalidas ; i++)
//                                                {
//                                                    if(Ext.isEmpty(acciones[i].CDVALOR))
//                                                    {
//                                                        throw 'Las acciones relacionadas a la validaci\u00f3n no tienen valor';
//                                                    }
//                                                }
//                                                
//                                                if(!cliente)
//                                                {
//                                                    ck = 'Ejecutando validaci\u00f3n';
//                                                    Ice.mask(ck);
//                                                    Ext.Ajax.request(
//                                                    {
//                                                        url      : _GLOBAL_URL_VALIDACION
//                                                        ,params  :
//                                                        {
//                                                            'flujo.cdtipflu'     : cdtipflu
//                                                            ,'flujo.cdflujomc'   : cdflujomc
//                                                            ,'flujo.tipoent'     : tipodest
//                                                            ,'flujo.claveent'    : clavedest
//                                                            ,'flujo.webid'       : webiddest
//                                                            ,'flujo.ntramite'    : ntramite
//                                                            ,'flujo.status'      : status
//                                                            ,'flujo.cdunieco'    : cdunieco
//                                                            ,'flujo.cdramo'      : cdramo
//                                                            ,'flujo.estado'      : estado
//                                                            ,'flujo.nmpoliza'    : nmpoliza
//                                                            ,'flujo.nmsituac'    : nmsituac
//                                                            ,'flujo.nmsuplem'    : nmsuplem
//                                                            ,'params.cdvalidafk' : data.CDVALIDAFK
//                                                        }
//                                                        ,success : function(response)
//                                                        {
//                                                            _unmask();
//                                                            var ck = 'Decodificando respuesta al ejecutar validaci\u00f3n';
//                                                            try
//                                                            {
//                                                                var json = Ext.decode(response.responseText);
//                                                                Ice.log('### validacion:',json);
//                                                                if(json.success==true)
//                                                                {
//                                                                    var valorRespValid = json.params.salida
//                                                                        ,salida        = '';
//                                                                    Ice.log('Resultado validacion java: ', valorRespValid);
//                                                                    for(var i=0 ; i<numSalidas ; i++)
//                                                                    {
//                                                                        if ( 'x' + acciones[i].CDVALOR === 'x' + valorRespValid) {
//                                                                            salida = acciones[i];
//                                                                            break;
//                                                                        }
//                                                                        /*
//                                                                        CUANDO LA RESPUESTA DE LA VALIDACION JAVA INICIA CON '*' (EJ: *JTEZVA|PROGRAMADOR)
//                                                                        BUSCAMOS UNA ACCION CUYO VALOR SEA '*', EJECUTAMOS ESA ACCION
//                                                                        Y LE MANDAMOS COMO AUXILIAR LA RESPUESTA JAVA SIN EL '*' (EJ: JTEZVA|PROGRAMADOR)
//                                                                        */
//                                                                        else if (acciones[i].CDVALOR === '*'
//                                                                            && !Ext.isEmpty(valorRespValid)
//                                                                            && valorRespValid.indexOf('*') === 0
//                                                                        ) {
//                                                                            salida = acciones[i];
//                                                                            salida.AUX = valorRespValid.substr(1);
//                                                                            break;
//                                                                        }
//                                                                    }
//                                                                    if(Ext.isEmpty(salida))
//                                                                    {
//                                                                        throw 'La validaci\u00f3n regres\u00f3 un valor que no tiene acci\u00f3n relacionada';
//                                                                    }
//                                                                    _procesaAccion
//                                                                    (
//                                                                        cdtipflu
//                                                                        ,cdflujomc
//                                                                        ,salida.TIPODEST
//                                                                        ,salida.CLAVEDEST
//                                                                        ,salida.WEBIDDEST
//                                                                        ,salida.AUX
//                                                                        ,ntramite
//                                                                        ,status
//                                                                        ,cdunieco
//                                                                        ,cdramo
//                                                                        ,estado
//                                                                        ,nmpoliza
//                                                                        ,nmsituac
//                                                                        ,nmsuplem
//                                                                        ,cdusuari
//                                                                        ,cdsisrol
//                                                                        ,callback
//                                                                    );
//                                                                }
//                                                                else
//                                                                {
//                                                                    mensajeError(json.message);
//                                                                }
//                                                            }
//                                                            catch(e)
//                                                            {
//                                                                manejaException(e,ck);
//                                                            }
//                                                        }
//                                                        ,failure : function(response)
//                                                        {
//                                                            _unmask();
//                                                            errorComunicacion(null,'Error al ejecutar validaci\u00f3n');
//                                                        }
//                                                    });
//                                                }
//                                                else//evaluacion cliente
//                                                {
//                                                    ck = 'Recuperando datos para validaci\u00f3n cliente';
//                                                    Ice.mask(ck);
//                                                    Ext.Ajax.request(
//                                                    {
//                                                        url      : _GLOBAL_URL_VALIDACION_MONTAR_DATOS
//                                                        ,params  :
//                                                        {
//                                                            'flujo.cdtipflu'   : cdtipflu
//                                                            ,'flujo.cdflujomc' : cdflujomc
//                                                            ,'flujo.tipoent'   : tipodest
//                                                            ,'flujo.claveent'  : clavedest
//                                                            ,'flujo.webid'     : webiddest
//                                                            ,'flujo.ntramite'  : ntramite
//                                                            ,'flujo.status'    : status
//                                                            ,'flujo.cdunieco'  : cdunieco
//                                                            ,'flujo.cdramo'    : cdramo
//                                                            ,'flujo.estado'    : estado
//                                                            ,'flujo.nmpoliza'  : nmpoliza
//                                                            ,'flujo.nmsituac'  : nmsituac
//                                                            ,'flujo.nmsuplem'  : nmsuplem
//                                                        }
//                                                        ,success : function(response)
//                                                        {
//                                                            _unmask();
//                                                            var ck = 'Decodificando respuesta al recuperar datos para validaci\u00f3n cliente';
//                                                            try
//                                                            {
//                                                                var json = Ext.decode(response.responseText);
//                                                                Ice.log('### datos memoria validacion javascript:',json);
//                                                                if(json.success==true)
//                                                                {
//                                                                    ck = 'Construyendo validaci\u00f3n cliente';
//                                                                    eval('var validacionCliente=function(DATOS){debug("DATOS:",DATOS);'+data.JSVALIDA+'};');
//                                                                    Ice.log('validacionCliente:',validacionCliente);
//                                                                    
//                                                                    ck = 'Invocando validaci\u00f3n cliente';
//                                                                    var valorRespValid = validacionCliente(json.datosTramite)
//                                                                        ,salida        = '';
//                                                                    Ice.log('Resultado validacion cliente: ', valorRespValid);
//                                                                    for(var i=0 ; i<numSalidas ; i++)
//                                                                    {
//                                                                        if('x'+acciones[i].CDVALOR=='x'+valorRespValid)
//                                                                        {
//                                                                            salida = acciones[i];
//                                                                            break;
//                                                                        }
//                                                                        /*
//                                                                        CUANDO LA RESPUESTA DE LA VALIDACION CLIENTE INICIA CON '*' (EJ: *JTEZVA|PROGRAMADOR)
//                                                                        BUSCAMOS UNA ACCION CUYO VALOR SEA '*', EJECUTAMOS ESA ACCION
//                                                                        Y LE MANDAMOS COMO AUXILIAR LA RESPUESTA JAVA SIN EL '*' (EJ: JTEZVA|PROGRAMADOR)
//                                                                        */
//                                                                        else if (acciones[i].CDVALOR === '*'
//                                                                            && !Ext.isEmpty(valorRespValid)
//                                                                            && valorRespValid.indexOf('*') === 0
//                                                                        ) {
//                                                                            salida = acciones[i];
//                                                                            salida.AUX = valorRespValid.substr(1);
//                                                                            break;
//                                                                        }
//                                                                    }
//                                                                    if(Ext.isEmpty(salida))
//                                                                    {
//                                                                        throw 'La validaci\u00f3n cliente regres\u00f3 un valor que no tiene acci\u00f3n relacionada';
//                                                                    }
//                                                                    _procesaAccion
//                                                                    (
//                                                                        cdtipflu
//                                                                        ,cdflujomc
//                                                                        ,salida.TIPODEST
//                                                                        ,salida.CLAVEDEST
//                                                                        ,salida.WEBIDDEST
//                                                                        ,salida.AUX
//                                                                        ,ntramite
//                                                                        ,status
//                                                                        ,cdunieco
//                                                                        ,cdramo
//                                                                        ,estado
//                                                                        ,nmpoliza
//                                                                        ,nmsituac
//                                                                        ,nmsuplem
//                                                                        ,cdusuari
//                                                                        ,cdsisrol
//                                                                        ,callback
//                                                                    );
//                                                                }
//                                                                else
//                                                                {
//                                                                    mensajeError(json.message);
//                                                                }
//                                                            }
//                                                            catch(e)
//                                                            {
//                                                                manejaException(e,ck);
//                                                            }
//                                                        }
//                                                        ,failure : function()
//                                                        {
//                                                            _unmask();
//                                                            errorComunicacion(null,'Error al ejecutar validaci\u00f3n cliente');
//                                                        }
//                                                    });
//                                                }
//                                            }
//                                            else
//                                            {
//                                                mensajeError(json.message);
//                                            }
//                                        }
//                                        catch(e)
//                                        {
//                                            manejaException(e,ck);
//                                        }
//                                    }
//                                    ,failure : function()
//                                    {
//                                        _unmask();
//                                        errorComunicacion(null,'Error al recuperar acciones posteriores a la validaci\u00f3n');
//                                    }
//                                });
//                            }
//                            else
//                            {
//                                mensajeError(json.message);
//                            }
//                        }
//                        catch(e)
//                        {
//                            manejaException(e,ck);
//                        }
//                    }
//                    ,failure : function()
//                    {
//                        _unmask();
//                        errorComunicacion(null,'Error al recuperar valores de validaci\u00f3n');
//                    }
//                });
//            }
//            else if(tipodest=='R')
//            {
//                ck = 'Recuperando acciones posteriores a la revisi\u00f3n';
//                Ice.mask(ck);
//                Ext.Ajax.request(
//                {
//                    url      : Ice.url.bloque.mesacontrol.cargarAccionesEntidad
//                    ,params  :
//                    {
//                        'params.cdtipflu'   : cdtipflu
//                        ,'params.cdflujomc' : cdflujomc
//                        ,'params.tipoent'   : tipodest
//                        ,'params.cdentidad' : clavedest
//                        ,'params.webid'     : webiddest
//                    }
//                    ,success : function(response)
//                    {
//                        _unmask();
//                        var ck = 'Decodificando respuesta al recuperar acciones posteriores a la revisi\u00f3n';
//                        try
//                        {
//                            var json = Ext.decode(response.responseText);
//                            Ice.log('### acciones:',json);
//                            var numSalidas = 0
//                                ,accion1   = ''
//                                ,accion2   = ''
//                                ,accExito  = ''
//                                ,accError  = '';
//                            if(json.success==true)
//                            {
//                                /*
//                                CDACCION: "138"
//                                CDCOMPMC: null
//                                CDESTADOMC: null
//                                CDFLUJOMC: "12"
//                                CDICONO: null
//                                CDPANTMC: null
//                                CDPROCMC: null
//                                CDREVISI: null
//                                CDTIPFLU: "1"
//                                CDVALIDA: "20"
//                                CDVALOR: null
//                                CLAVEDEST: "20"
//                                DSACCION: "next"
//                                IDDESTIN: "1450139785755_1072"
//                                IDORIGEN: "1450121226109_9387"
//                                TIPODEST: "V"
//                                WEBIDCOMP: null
//                                WEBIDDEST: "1450139785755_1072"
//                                WEBIDESTADO: null
//                                WEBIDPANT: null
//                                WEBIDPROC: null
//                                WEBIDREVISI: null
//                                WEBIDVALIDA: "1450139785755_1072"
//                                */
//                                if(json.list.length==0)
//                                {
//                                    /* jtezva 16 agosto 2016
//                                     * se comenta porque ya no es requerida una accion posterior
//                                    if (aux !== 'INICIAL') { // Solo avienta exception si no es INICIAL
//                                        throw 'No hay acciones relacionadas a la revisi\u00f3n';
//                                    }
//                                     */
//                                }
//                                else if(json.list.length==1)
//                                {
//                                    numSalidas = 1;
//                                    accion1    = json.list[0];
//                                }
//                                /*
//                                 * jtezva 16 agosto 2016 ya no permite doble accion
//                                else if(json.list.length==2)
//                                {
//                                    numSalidas = 2;
//                                    accion1    = json.list[0];
//                                    accion2    = json.list[1];
//                                    
//                                    if(Ice.nvl(accion1.CDVALOR,'')=='EXITO')
//                                    {
//                                        accExito = accion1;
//                                    }
//                                    else if(Ice.nvl(accion2.CDVALOR,'')=='EXITO')
//                                    {
//                                        accExito = accion2;
//                                    }
//                                    if(Ice.nvl(accion1.CDVALOR,'')=='ERROR')
//                                    {
//                                        accError = accion1;
//                                    }
//                                    else if(Ice.nvl(accion2.CDVALOR,'')=='ERROR')
//                                    {
//                                        accError = accion2;
//                                    }
//                                    
//                                    if(Ext.isEmpty(accExito)||Ext.isEmpty(accError))
//                                    {
//                                        throw 'Las acciones relacionadas a la revisi\u00f3n no tienen el valor EXITO/ERROR adecuado';
//                                    }
//                                }*/
//                                else
//                                {
//                                    /*
//                                     * jtezva 16 agosto 2016
//                                     * si tiene mas de dos entonces es error
//                                    if (aux !== 'INICIAL') { // Solo avienta exception si no es INICIAL
//                                     */
//                                        throw 'La revisi\u00f3n tiene demasiadas acciones relacionadas';
//                                    /*
//                                    }
//                                     */
//                                }
//                                
//                                ck = 'Ejecutando revisi\u00f3n';
//                                Ice.mask(ck);
//                                Ext.Ajax.request(
//                                {
//                                    url      : _GLOBAL_URL_REVISION
//                                    ,params  :
//                                    {
//                                        'flujo.cdtipflu'   : cdtipflu
//                                        ,'flujo.cdflujomc' : cdflujomc
//                                        ,'flujo.tipoent'   : tipodest
//                                        ,'flujo.claveent'  : clavedest
//                                        ,'flujo.webid'     : webiddest
//                                        ,'flujo.ntramite'  : ntramite
//                                        ,'flujo.status'    : status
//                                        ,'flujo.cdunieco'  : cdunieco
//                                        ,'flujo.cdramo'    : cdramo
//                                        ,'flujo.estado'    : estado
//                                        ,'flujo.nmpoliza'  : nmpoliza
//                                        ,'flujo.nmsituac'  : nmsituac
//                                        ,'flujo.nmsuplem'  : nmsuplem
//                                    }
//                                    ,success : function(response)
//                                    {
//                                        _unmask();
//                                        var ck = 'Decodificando respuesta al ejecutar revisi\u00f3n';
//                                        try
//                                        {
//                                            var json = Ext.decode(response.responseText);
//                                            Ice.log('### revision:',json);
//                                            if(json.success==true)
//                                            {
//                                                var faltanDocs = false;
//                                                
//                                                for (var i = 0; i < json.list.length; i++) {
//                                                    if (json.list[i].SWOBLIGA === 'S' && json.list[i].SWACTIVO !== 'S') {
//                                                        faltanDocs = true;
//                                                        break;
//                                                    }
//                                                }
//                                                
//                                                /* jtezva 16 agosto 2016
//                                                if (aux === 'INICIAL') {
//                                                    faltanDocs = true;
//                                                }
//                                                */
//                                                
//                                                if (!faltanDocs && false) { // jtezva 16 agosto 2016 no se va a ir solo
//                                                    if(numSalidas==1)
//                                                    {
//                                                        _procesaAccion
//                                                        (
//                                                            cdtipflu
//                                                            ,cdflujomc
//                                                            ,accion1.TIPODEST
//                                                            ,accion1.CLAVEDEST
//                                                            ,accion1.WEBIDDEST
//                                                            ,accion1.AUX
//                                                            ,ntramite
//                                                            ,status
//                                                            ,cdunieco
//                                                            ,cdramo
//                                                            ,estado
//                                                            ,nmpoliza
//                                                            ,nmsituac
//                                                            ,nmsuplem
//                                                            ,cdusuari
//                                                            ,cdsisrol
//                                                            ,callback
//                                                        );
//                                                    }
//                                                    else if(numSalidas==2)
//                                                    {
//                                                        _procesaAccion
//                                                        (
//                                                            cdtipflu
//                                                            ,cdflujomc
//                                                            ,accExito.TIPODEST
//                                                            ,accExito.CLAVEDEST
//                                                            ,accExito.WEBIDDEST
//                                                            ,accExito.AUX
//                                                            ,ntramite
//                                                            ,status
//                                                            ,cdunieco
//                                                            ,cdramo
//                                                            ,estado
//                                                            ,nmpoliza
//                                                            ,nmsituac
//                                                            ,nmsuplem
//                                                            ,cdusuari
//                                                            ,cdsisrol
//                                                            ,callback
//                                                        );
//                                                    }
//                                                }
//                                                else
//                                                {
//                                                    var listaDocs = [],
//                                                        listaReqs = [];
//                                                    
//                                                    for (var i = 0; i < json.list.length ; i++) {
//                                                        if (json.list[i].TIPO === 'DOC') {
//                                                            listaDocs.push(json.list[i]);
//                                                        } else if (json.list[i].TIPO === 'REQ') {
//                                                            json.list[i].CHECK = json.list[i].SWACTIVO === 'S';
//                                                            listaReqs.push(json.list[i]);
//                                                        } else {
//                                                            mensajeError('Tipo de doc/req inv\u00e1lido');
//                                                        }
//                                                    }
//                                                    
//                                                    Ice.log('listaDocs:', listaDocs, '.');
//                                                    Ice.log('listaReqs;', listaReqs, '.');
//                                                    
//                                                    centrarVentanaInterna(Ext.create('Ext.window.Window', {
//                                                        title    : 'REVISI\u00D3N DE REQUISITOS Y DOCUMENTOS'
//                                                                   + (aux === 'LECTURA'
//                                                                       ? ' (SOLO LECTURA)'
//                                                                       : ''),
//                                                        itemId   : 'WINDOW_REVISION_DOCUMENTOS',
//                                                        flujo    : {
//                                                            cdtipflu  : cdtipflu,
//                                                            cdflujomc : cdflujomc,
//                                                            tipodest  : tipodest,
//                                                            clavedest : clavedest,
//                                                            webiddest : webiddest,
//                                                            aux       : aux,
//                                                            ntramite  : ntramite,
//                                                            status    : status,
//                                                            cdunieco  : cdunieco,
//                                                            cdramo    : cdramo,
//                                                            estado    : estado,
//                                                            nmpoliza  : nmpoliza,
//                                                            nmsituac  : nmsituac,
//                                                            nmsuplem  : nmsuplem,
//                                                            cdusuari  : cdusuari,
//                                                            cdsisrol  : cdsisrol,
//                                                            callback  : callback
//                                                        },
//                                                        modal    : true,
//                                                        //closable : false,
//                                                        border   : 0,
//                                                        defaults : {
//                                                            style : 'margin : 5px;'
//                                                        },
//                                                        items    : [
//                                                            {
//                                                                xtype : 'displayfield',
//                                                                value : 'Favor de revisar los requisitos y documentos obligatorios:'
//                                                            }, {
//                                                                xtype      : 'grid',
//                                                                width      : 900,
//                                                                height     : 200,
//                                                                autoScroll : true,
//                                                                tipo       : 'REQ',
//                                                                border     : 0,
//                                                                selType    : 'cellmodel',
//                                                                plugins    : [
//                                                                    Ext.create('Ext.grid.plugin.CellEditing', {
//                                                                        clicksToEdit : 1,
//                                                                        listeners : {
//                                                                            beforeedit : function (me, event) {
//                                                                                Ice.log('DSDATO.editor.beforeedit! args:', arguments);
//                                                                                if ('S' !== event.record.get('SWPIDEDATO') || json.params.swconfirm === 'S') {
//                                                                                    return false;
//                                                                                }
//                                                                            },
//                                                                            edit : function(me, event) {
//                                                                                var checked = !Ext.isEmpty(event.value) && !Ext.isEmpty(event.value.trim());
//                                                                                marcarRequisitoDesdeRevision(event.rowIdx, checked, event.value.trim(),
//                                                                                    _fieldById('WINDOW_REVISION_DOCUMENTOS').down('[activable]'));
//                                                                            }
//                                                                        }
//                                                                    })
//                                                                ],
//                                                                columns    : [
//                                                                    {
//                                                                        text      : 'REQUISITO',
//                                                                        dataIndex : 'DESCRIP',
//                                                                        flex      : 1
//                                                                    }, {
//                                                                        text      : 'OBLIGATORIO',
//                                                                        dataIndex : 'SWOBLIGA',
//                                                                        width     : 100,
//                                                                        renderer  : function (v)
//                                                                        {
//                                                                            var r = '';
//                                                                            if (v === 'S') {
//                                                                                r = '<img src="'+_GLOBAL_DIRECTORIO_ICONOS+'lock.png" />';
//                                                                            }
//                                                                            return r;
//                                                                        }
//                                                                    }, {
//                                                                        text      : 'ESTADO',
//                                                                        xtype     : 'checkcolumn',
//                                                                        dataIndex : 'CHECK',
//                                                                        disabled  : json.params.swconfirm === 'S',
//                                                                        width     : 60,
//                                                                        listeners : {
//                                                                            beforecheckchange : function (me, row, checked, eOpts) {
//                                                                                var win = _fieldById('WINDOW_REVISION_DOCUMENTOS'),
//                                                                                    rec = win.down('grid[tipo=REQ]').getStore().getAt(row);
//                                                                                if ('S' === rec.get('SWPIDEDATO')) {
//                                                                                    if (true === checked) {
//                                                                                        mensajeWarning('Para activar esta casilla por favor capture el valor en la columna VALOR');
//                                                                                    } else {
//                                                                                        mensajeWarning('Para desactivar esta casilla por favor borre el valor en la columna VALOR');
//                                                                                    }
//                                                                                    return false;
//                                                                                }
//                                                                            },
//                                                                            checkchange : function (me, row, checked) {
//                                                                                marcarRequisitoDesdeRevision(row, checked, '',
//                                                                                    _fieldById('WINDOW_REVISION_DOCUMENTOS').down('[activable]'));
//                                                                            }
//                                                                        }
//                                                                    }, {
//                                                                        text      : 'SWPIDEDATO',
//                                                                        dataIndex : 'SWPIDEDATO',
//                                                                        width     : 100,
//                                                                        hidden    : true
//                                                                    }, {
//                                                                        text      : 'VALOR',
//                                                                        dataIndex : 'DSDATO',
//                                                                        width     : 370,
//                                                                        renderer  : function (v, md, rec) {
//                                                                            if ('S' !== rec.get('SWPIDEDATO')) {
//                                                                                return '<span style="font-style : italic;">(N/A)</span>';
//                                                                            } else if (Ext.isEmpty(v) || Ext.isEmpty(v.trim())) {
//                                                                                return '<span style="font-style : italic;">HAGA CLIC PARA CAPTURAR...</span>';
//                                                                            }
//                                                                            return v;
//                                                                        },
//                                                                        editor    : {
//                                                                            xtype      : 'textfield',
//                                                                            itemId     : 'editorRevisiDsdato',
//                                                                            minLength  : 1,
//                                                                            maxLength  : 100
//                                                                        }
//                                                                    }
//                                                                ], store : Ext.create('Ext.data.Store', {
//                                                                    fields : [
//                                                                        'CLAVE', 'DESCRIP', 'SWOBLIGA', 'SWACTIVO', 'CHECK', 'SWPIDEDATO', 'DSDATO'
//                                                                    ],
//                                                                    data   : listaReqs
//                                                                })
//                                                            }, {
//                                                                xtype      : 'grid',
//                                                                width      : 900,
//                                                                height     : 200,
//                                                                autoScroll : true,
//                                                                tipo       : 'DOC',
//                                                                border     : 0,
//                                                                columns    : [
//                                                                    {
//                                                                        text      : 'DOCUMENTO',
//                                                                        dataIndex : 'DESCRIP',
//                                                                        flex      : 70
//                                                                    }, {
//                                                                        text      : 'OBLIGATORIO',
//                                                                        dataIndex : 'SWOBLIGA',
//                                                                        flex      : 13,
//                                                                        renderer  : function (v)
//                                                                        {
//                                                                            var r = '';
//                                                                            if (v === 'S') {
//                                                                                r = '<img src="'+_GLOBAL_DIRECTORIO_ICONOS+'lock.png" />';
//                                                                            }
//                                                                            return r;
//                                                                        }
//                                                                    }, {
//                                                                        text      : 'CARGADO',
//                                                                        dataIndex : 'SWACTIVO',
//                                                                        flex      : 10,
//                                                                        renderer  : function (v, md, rec)
//                                                                        {
//                                                                            var r = '';
//                                                                            if (v === 'S') {
//                                                                                r = '<img src="'+_GLOBAL_DIRECTORIO_ICONOS+'accept.png" />';
//                                                                            }
//                                                                            else if (rec.get('SWOBLIGA')  === 'S') {
//                                                                                r = '<img src="'+_GLOBAL_DIRECTORIO_ICONOS+'cancel.png" />';
//                                                                            }
//                                                                            return r;
//                                                                        }
//                                                                    }, {
//                                                                        flex      : 7,
//                                                                        dataIndex : 'SWACTIVO',
//                                                                        renderer  : function (v, md, rec, row)
//                                                                        {
//                                                                            var r = '';
//                                                                            //if (v !== 'S' || true) {
//                                                                            if (json.params.swconfirm !== 'S') {
//                                                                                r = '<a href="#" onclick="subirArchivoDesdeRevision(' + row + '); return false;">' +
//                                                                                        '<img src="' + _GLOBAL_DIRECTORIO_ICONOS + 'page_add.png" ' +
//                                                                                        'data-qtip="Subir archivo" /></a>';
//                                                                            }
//                                                                            return r;
//                                                                        }
//                                                                    }
//                                                                ], store : Ext.create('Ext.data.Store', {
//                                                                    fields : [
//                                                                        'CLAVE', 'DESCRIP', 'SWOBLIGA', 'SWACTIVO'
//                                                                    ],
//                                                                    data   : listaDocs
//                                                                })
//                                                            }
//                                                        ],
//                                                        buttonAlign : 'center',
//                                                        buttons     : [
//                                                            /* jtezva 16 agosto 2016 ya no se usa
//                                                            {
//                                                                text    : 'Aceptar',
//                                                                handler : function (me) {
//                                                                   me.up('window').destroy();
//                                                                   
//                                                                   if (numSalidas === 2 && aux != 'INICIAL') { // Cuando sean 2 salidas y no sea inicial ejecuta error
//                                                                        Ice.procesaAccion(
//                                                                            cdtipflu
//                                                                            ,cdflujomc
//                                                                            ,accError.TIPODEST
//                                                                            ,accError.CLAVEDEST
//                                                                            ,accError.WEBIDDEST
//                                                                            ,accError.AUX
//                                                                            ,ntramite
//                                                                            ,status
//                                                                            ,cdunieco
//                                                                            ,cdramo
//                                                                            ,estado
//                                                                            ,nmpoliza
//                                                                            ,nmsituac
//                                                                            ,nmsuplem
//                                                                            ,cdusuari
//                                                                            ,cdsisrol
//                                                                            ,callback
//                                                                        );
//                                                                    }
//                                                                }
//                                                            }*/
//                                                            {
//                                                                text      : 'CONFIRMAR Y CONTINUAR',
//                                                                icon      : _GLOBAL_DIRECTORIO_ICONOS + 'control_fastforward_blue.png',
//                                                                disabled  : numSalidas === 0 || faltanDocs === true || aux === 'LECTURA' || aux === 'INICIAL',
//                                                                activable : numSalidas > 0 && 'LECTURA' !== aux && 'INICIAL' !== aux,
//                                                                handler   : function (me) {
//                                                                    centrarVentanaInterna(Ext.MessageBox.confirm(
//                                                                        'Confirmar',
//                                                                        'La revisi\u00f3n de requisitos no se podr\u00e1 modificar posteriormente\u0020\u00BFDesea continuar?',
//                                                                        function(btn)
//                                                                        {
//                                                                            if(btn === 'yes')
//                                                                            {
//                                                                                var mask, ck = 'Confirmando revisi\u00f3n';
//                                                                                try {
//                                                                                    mask = _maskLocal(ck);
//                                                                                    Ext.Ajax.request({
//                                                                                        url     : _GLOBAL_URL_CONFIRMAR_REVISION,
//                                                                                        params  : {
//                                                                                            'params.cdtipflu'  : cdtipflu,
//                                                                                            'params.cdflujomc' : cdflujomc,
//                                                                                            'params.ntramite'  : ntramite,
//                                                                                            'params.cdrevisi'  : clavedest,
//                                                                                            'params.swconfirm' : 'S'
//                                                                                        },
//                                                                                        success : function (response) {
//                                                                                            mask.close();
//                                                                                            var ck = 'Decodificando respuesta al confirmar revisi\u00f3n';
//                                                                                            try {
//                                                                                                var json = Ext.decode(response.responseText);
//                                                                                                Ice.log('### confirmar revision:', json);
//                                                                                                if (json.success === true) {
//                                                                                                    var win = me.up('window');
//                                                                                                    _procesaAccion
//                                                                                                    (
//                                                                                                        cdtipflu
//                                                                                                        ,cdflujomc
//                                                                                                        ,accion1.TIPODEST
//                                                                                                        ,accion1.CLAVEDEST
//                                                                                                        ,accion1.WEBIDDEST
//                                                                                                        ,accion1.AUX
//                                                                                                        ,ntramite
//                                                                                                        ,status
//                                                                                                        ,cdunieco
//                                                                                                        ,cdramo
//                                                                                                        ,estado
//                                                                                                        ,nmpoliza
//                                                                                                        ,nmsituac
//                                                                                                        ,nmsuplem
//                                                                                                        ,cdusuari
//                                                                                                        ,cdsisrol
//                                                                                                        ,callback
//                                                                                                    );
//                                                                                                    win.destroy();
//                                                                                                } else {
//                                                                                                    mensajeError(json.message);
//                                                                                                }
//                                                                                            } catch (e) {
//                                                                                                manejaException(e, ck);
//                                                                                            }
//                                                                                        },
//                                                                                        failure : function () {
//                                                                                            mask.close();
//                                                                                            errorComunicacion(null, 'Error al confirmar revisi\u00f3n');
//                                                                                        }
//                                                                                    });
//                                                                                } catch (e) {
//                                                                                    manejaException(e, ck, mask);
//                                                                                }
//                                                                            }
//                                                                        }
//                                                                    ));
//                                                                }
//                                                            }, {
//                                                                text    : 'DOCUMENTOS',
//                                                                icon    : _GLOBAL_DIRECTORIO_ICONOS + 'printer.png',
//                                                                handler : function (me) {
//                                                                    var win = me.up('window');
//                                                                    Ext.syncRequire(_GLOBAL_DIRECTORIO_DEFINES+'VentanaDocumentos');
//                                                                    var winDoc = new window['VentanaDocumentos']({
//                                                                        cdtipflu   : cdtipflu
//                                                                        ,cdflujomc : cdflujomc
//                                                                        ,tipoent   : tipodest
//                                                                        ,claveent  : clavedest
//                                                                        ,webid     : webiddest
//                                                                        ,aux       : ''/*'INICIAL' === flujo.aux || 'LECTURA' === flujo.aux 
//                                                                                                 ? ''
//                                                                                                 : flujo.aux*/
//                                                                        ,ntramite  : ntramite
//                                                                        ,status    : status
//                                                                        ,cdunieco  : cdunieco
//                                                                        ,cdramo    : cdramo
//                                                                        ,estado    : estado
//                                                                        ,nmpoliza  : nmpoliza
//                                                                        ,nmsituac  : nmsituac
//                                                                        ,nmsuplem  : nmsuplem
//                                                                        ,cdusuari  : cdusuari
//                                                                        ,cdsisrol  : cdsisrol
//                                                                   }).mostrar();
//                                                                   winDoc.on({
//                                                                       destroy : function() {
//                                                                           win.recargar();
//                                                                       }
//                                                                   });
//                                                                }
//                                                            }, {
//                                                                text    : 'CONTINUAR',
//                                                                icon    : _GLOBAL_DIRECTORIO_ICONOS + 'accept.png',
//                                                                hidden  : !(numSalidas === 0 || faltanDocs === true || aux === 'LECTURA' || aux === 'INICIAL'),
//                                                                handler : function (me) {
//                                                                    me.up('window').close();
//                                                                }
//                                                            }
//                                                            /* jtezva 16 dic 2016 se quita
//                                                            , {
//                                                                text    : 'RECARGAR',
//                                                                icon    : _GLOBAL_DIRECTORIO_ICONOS + 'control_repeat_blue.png',
//                                                                handler : function (me) {
//                                                                    me.up('window').recargar();
//                                                                }
//                                                            }
//                                                            */
//                                                        ],
//                                                        recargar : function () {
//                                                            Ice.log('>WINDOW_REVISION_DOCUMENTOS recargar');
//                                                            var me = this;
//                                                            
//                                                            Ice.procesaAccion(
//                                                                me.flujo.cdtipflu
//                                                                ,me.flujo.cdflujomc
//                                                                ,me.flujo.tipodest
//                                                                ,me.flujo.clavedest
//                                                                ,me.flujo.webiddest
//                                                                ,me.flujo.aux
//                                                                ,me.flujo.ntramite
//                                                                ,me.flujo.status
//                                                                ,me.flujo.cdunieco
//                                                                ,me.flujo.cdramo
//                                                                ,me.flujo.estado
//                                                                ,me.flujo.nmpoliza
//                                                                ,me.flujo.nmsituac
//                                                                ,me.flujo.nmsuplem
//                                                                ,me.flujo.cdusuari
//                                                                ,me.flujo.cdsisrol
//                                                                ,me.flujo.callback
//                                                            );
//                                                            
//                                                            me.destroy();
//                                                        }
//                                                    }).show());
//                                                }
//                                            }
//                                            else
//                                            {
//                                                if(numSalidas<2)
//                                                {
//                                                    mensajeError(json.message);
//                                                }
//                                                else
//                                                {
//                                                    mensajeError
//                                                    (
//                                                        json.message
//                                                        ,function()
//                                                        {
//                                                            _procesaAccion
//                                                            (
//                                                                cdtipflu
//                                                                ,cdflujomc
//                                                                ,accError.TIPODEST
//                                                                ,accError.CLAVEDEST
//                                                                ,accError.WEBIDDEST
//                                                                ,accError.AUX
//                                                                ,ntramite
//                                                                ,status
//                                                                ,cdunieco
//                                                                ,cdramo
//                                                                ,estado
//                                                                ,nmpoliza
//                                                                ,nmsituac
//                                                                ,nmsuplem
//                                                                ,cdusuari
//                                                                ,cdsisrol
//                                                                ,callback
//                                                            );
//                                                        }
//                                                    );
//                                                }
//                                            }
//                                        }
//                                        catch(e)
//                                        {
//                                            if(numSalidas<2)
//                                            {
//                                                manejaException(e,ck);
//                                            }
//                                            else
//                                            {
//                                                debugError(e);
//                                                mensajeError
//                                                (
//                                                    'Error al manejar respuesta de proceso'
//                                                    ,function()
//                                                    {
//                                                        _procesaAccion
//                                                        (
//                                                            cdtipflu
//                                                            ,cdflujomc
//                                                            ,accError.TIPODEST
//                                                            ,accError.CLAVEDEST
//                                                            ,accError.WEBIDDEST
//                                                            ,accError.AUX
//                                                            ,ntramite
//                                                            ,status
//                                                            ,cdunieco
//                                                            ,cdramo
//                                                            ,estado
//                                                            ,nmpoliza
//                                                            ,nmsituac
//                                                            ,nmsuplem
//                                                            ,cdusuari
//                                                            ,cdsisrol
//                                                            ,callback
//                                                        );
//                                                    }
//                                                );
//                                            }
//                                        }
//                                    }
//                                    ,failure : function(response)
//                                    {
//                                        _unmask();
//                                        if(numSalidas<2)
//                                        {
//                                            errorComunicacion(null,'Error al ejecutar revisi\u00f3n');
//                                        }
//                                        else
//                                        {
//                                            mensajeError(
//                                                'Error de comunicaci\u00f3n al ejecutar revisi\u00f3n'
//                                                ,function()
//                                                {
//                                                    _procesaAccion
//                                                    (
//                                                        cdtipflu
//                                                        ,cdflujomc
//                                                        ,accError.TIPODEST
//                                                        ,accError.CLAVEDEST
//                                                        ,accError.WEBIDDEST
//                                                        ,accError.AUX
//                                                        ,ntramite
//                                                        ,status
//                                                        ,cdunieco
//                                                        ,cdramo
//                                                        ,estado
//                                                        ,nmpoliza
//                                                        ,nmsituac
//                                                        ,nmsuplem
//                                                        ,cdusuari
//                                                        ,cdsisrol
//                                                        ,callback
//                                                    );
//                                                }
//                                            );
//                                        }
//                                    }
//                                });
//                            }
//                            else
//                            {
//                                mensajeError(json.message);
//                            }
//                        }
//                        catch(e)
//                        {
//                            manejaException(e,ck);
//                        }
//                    }
//                    ,failure : function()
//                    {
//                        _unmask();
//                        errorComunicacion(null,'Error al recuperar acciones posteriores a la revisi\u00f3n');
//                    }
//                });
//            }
//            else if(tipodest=='M')
//            {
//                ck = 'Recuperando valores de correo';
//                Ice.mask(ck);
//                Ext.Ajax.request(
//                {
//                    url      : Ice.url.core.recuperacionSimple
//                    ,params  :
//                    {
//                        'params.consulta'   : 'RECUPERAR_TFLUMAIL'
//                        ,'params.cdtipflu'  : cdtipflu
//                        ,'params.cdflujomc' : cdflujomc
//                        ,'params.cdmail'    : clavedest
//                    }
//                    ,success : function(response)
//                    {
//                        _unmask();
//                        var ck = 'Decodificando respuesta al recuperar valores de correo';
//                        try
//                        {
//                            var json = Ext.decode(response.responseText);
//                            Ice.log('### tflumail:',json);
//                            if(json.success==true)
//                            {
//                                if(json.list.length==0)
//                                {
//                                    throw 'El correo no existe';
//                                }
//                                else if(json.list.length>1)
//                                {
//                                    throw 'Correo duplicado';
//                                }
//                                var data = json.list[0];
//                                Ice.log('data:',data);
//                                
//                                ck = 'Recuperando acciones posteriores a la validaci\u00f3n';
//                                Ice.mask(ck);
//                                Ext.Ajax.request(
//                                {
//                                    url      : Ice.url.bloque.mesacontrol.cargarAccionesEntidad
//                                    ,params  :
//                                    {
//                                        'params.cdtipflu'   : cdtipflu
//                                        ,'params.cdflujomc' : cdflujomc
//                                        ,'params.tipoent'   : tipodest
//                                        ,'params.cdentidad' : clavedest
//                                        ,'params.webid'     : webiddest
//                                    }
//                                    ,success : function(response)
//                                    {
//                                        _unmask();
//                                        var ck = 'Decodificando respuesta al recuperar acciones posteriores a la validaci\u00f3n';
//                                        try
//                                        {
//                                            var jsonAcc = Ext.decode(response.responseText);
//                                            Ice.log('### acciones:',jsonAcc);
//                                            var numSalidas = jsonAcc.list.length
//                                                ,acciones  = jsonAcc.list;
//                                            if(jsonAcc.success==true)
//                                            {
//                                                if(jsonAcc.list.length < 2){
//                                                    ck = 'Enviando correo';
//                                                    Ice.mask(ck);
//                                                    Ext.Ajax.request(
//                                                    {
//                                                        url      : _GLOBAL_URL_ENVIAR_CORREO_FLUJO
//                                                        ,params  :
//                                                        {
//                                                            'flujo.cdtipflu'     : cdtipflu
//                                                            ,'flujo.cdflujomc'   : cdflujomc
//                                                            ,'flujo.tipoent'     : tipodest
//                                                            ,'flujo.claveent'    : clavedest
//                                                            ,'flujo.webid'       : webiddest
//                                                            ,'flujo.ntramite'    : ntramite
//                                                            ,'flujo.status'      : status
//                                                            ,'flujo.cdunieco'    : cdunieco
//                                                            ,'flujo.cdramo'      : cdramo
//                                                            ,'flujo.estado'      : estado
//                                                            ,'flujo.nmpoliza'    : nmpoliza
//                                                            ,'flujo.nmsituac'    : nmsituac
//                                                            ,'flujo.nmsuplem'    : nmsuplem
//                                                            ,'flujo.aux'         : aux
//                                                            ,'params.dsdestino'  : data.DSDESTINO
//                                                            ,'params.dsasunto'   : data.DSASUNTO
//                                                            ,'params.dsmensaje'  : data.DSMENSAJE
//                                                            ,'params.vardestino' : data.VARDESTINO
//                                                            ,'params.varmensaje' : data.VARMENSAJE
//                                                            ,'params.varasunto'  : data.VARASUNTO
//                                                        }
//                                                        ,success : function(response)
//                                                        {
//                                                            _unmask();
//                                                            var ck = 'decod Enviando correo';
//                                                             try
//                                                             {
//                                                                 var json = Ext.decode(response.responseText);
//                                                                 Ice.log('### validacion:',json);
//                                                                 if(json.success==true)
//                                                                 {
//                                                                    if(numSalidas == 0){
//                                                                        mensajeCorrecto('Correo enviado','Correo enviado');
//                                                                    }else{
//                                                                        _procesaAccion
//                                                                        (
//                                                                                cdtipflu
//                                                                                ,cdflujomc
//                                                                                ,acciones[0].TIPODEST
//                                                                                ,acciones[0].CLAVEDEST
//                                                                                ,acciones[0].WEBIDDEST
//                                                                                ,acciones[0].AUX
//                                                                                ,ntramite
//                                                                                ,status
//                                                                                ,cdunieco
//                                                                                ,cdramo
//                                                                                ,estado
//                                                                                ,nmpoliza
//                                                                                ,nmsituac
//                                                                                ,nmsuplem
//                                                                                ,cdusuari
//                                                                                ,cdsisrol
//                                                                                ,callback
//                                                                        );
//                                                                    }                                                               
//                                                                 }
//                                                                 else
//                                                                 {
//                                                                     mensajeError(json.message);
//                                                                 }
//                                                             }
//                                                             catch(e)
//                                                             {
//                                                                 manejaException(e,ck);
//                                                             }
//                                                        }
//                                                        ,failure : function(response)
//                                                        {
//                                                            _unmask();
//                                                            errorComunicacion(null,'Error al enviar correo');
//                                                        }
//                                                    });
//                                                }else{
//                                                    throw 'Hay demasiadas acciones relacionadas al correo';
//                                                }
//                                            }
//                                            else
//                                            {
//                                                mensajeError(json.message);
//                                            }
//                                        }
//                                        catch(e)
//                                        {
//                                            manejaException(e,ck);
//                                        }
//                                    }
//                                    ,failure : function()
//                                    {
//                                        _unmask();
//                                        errorComunicacion(null,'Error al recuperar acciones posteriores al correo');
//                                    }
//                                });
//                            }
//                            else
//                            {
//                                mensajeError(json.message);
//                            }
//                        }
//                        catch(e)
//                        {
//                            manejaException(e,ck);
//                        }
//                    }
//                    ,failure : function()
//                    {
//                        _unmask();
//                        errorComunicacion(null,'Error al recuperar valores de correo');
//                    }
//                });
//            }
//            else
//            {
//                throw 'Entidad inv\u00e1lida';
//            }
//        } catch(e) {
//            manejaException(e,ck);
//        }
//    }
}