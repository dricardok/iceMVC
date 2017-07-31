package mx.com.segurossura.emision.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.biosnettcs.core.Utils;
import com.biosnettcs.portal.controller.PrincipalCoreAction;
import com.biosnettcs.portal.model.UsuarioVO;
import com.opensymphony.xwork2.ActionContext;

import mx.com.segurossura.emision.service.DatosAuxiliaresManager;
import mx.com.segurossura.emision.service.DatosGeneralesManager;

@Controller
@Scope("prototype")
@ParentPackage(value="default")
@Namespace("/emision")
public class DatosGeneralesAction extends PrincipalCoreAction {
    
    private static final Logger logger = LoggerFactory.getLogger(DatosGeneralesAction.class);
    
    private boolean success;
    private String message;
    private Map<String, String> params;
    private List<Map<String, String>> list;
    
    @Autowired
    private DatosGeneralesManager datosGeneralesManager;
    
    @Autowired
    private DatosAuxiliaresManager datosAuxiliaresManager;
    
    /**
     * Lo primero que se ejecuta en bloque de datos generales.
     * No inserta nada, pero si regresa estado y nmpoliza a utilizar
     * @param params llave de poliza (cdunieco y cdramo) y datos para generar siguiente nmpoliza
     * @return valores para poblar pantalla
     */
    @Action(
            value = "datosGenerales/valoresDefectoFijos", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String valoresDefectoFijos () {
        logger.debug(Utils.log("###### valoresDefectoFijos params: ", params));
        try {
            UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
            Utils.validate(params, "No hay datos");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsuplem = params.get("nmsuplem"),
                   status   = params.get("status"),
                   cdptovta = params.get("cdptovta"),
                   cdgrupo  = params.get("cdgrupo"),
                   cdsubgpo = params.get("cdsubgpo"),
                   cdperfil = params.get("cdperfil");
            
            Utils.validate(cdunieco, "Falta cdunieco",
                           cdramo,   "Falta cdramo",
                           estado,   "Falta estado",
                           nmsuplem, "Falta nmsuplem",
                           status,   "Falta status");
            
            params = datosGeneralesManager.valoresDefectoFijos(cdunieco, cdramo, estado, nmpoliza, nmsuplem, status,
                    params.get("swcolind"), params.get("nmpolcoi"), usuario.getCdusuari(), usuario.getRolActivo().getCdsisrol(),
                    cdptovta, cdgrupo, cdsubgpo, cdperfil);
            
            success = true;
        } catch (Exception ex) {
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    /**
     * Segunda ejecucion.
     * Recibe la llave de poliza (generada en paso 1), inserta mpolizas, dispara valores (que deben insertar tvalopol), recupera tvalopol
     * para poblar pantalla
     * @param params datos para generar mpolizas y disparar valores defecto tvalopol
     * @return datos de tvalopol (ya insertados en BD)
     */
    @Action(
            value = "datosGenerales/valoresDefectoVariables", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String valoresDefectoVariables () {
        logger.debug(Utils.log("###### valoresDefectoVariables params: ", params));
        try {
            UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
            
            Utils.validate(params, "No hay datos para valores por defecto variables para bloque de datos generales");
            
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsuplem = params.get("nmsuplem"),
                   status   = params.get("status"),
                   cdptovta = params.get("cdptovta"),
                   cdgrupo  = params.get("cdgrupo"),
                   cdsubgpo = params.get("cdsubgpo"),
                   cdperfil = params.get("cdperfil");
            
            Utils.validate(cdunieco , "Falta cdunieco",
                           cdramo   , "Falta cdramo",
                           estado   , "Falta estado",
                           nmpoliza , "Falta nmpoliza",
                           nmsuplem , "Falta nmsuplem",
                           status   , "Falta status");
            
            Map<String, String> datosMpolizasPantalla = new LinkedHashMap<String, String>();
            for (Entry<String, String> en : params.entrySet()) {
                if (en.getKey().substring(0, 3).equals("b1_")) {
                    datosMpolizasPantalla.put(en.getKey().substring(3), en.getValue());
                }
            }
            
            params = datosGeneralesManager.valoresDefectoVariables (
                    usuario.getCdusuari(), usuario.getRolActivo().getCdsisrol(),
                    cdunieco,
                    cdramo,
                    estado,
                    nmpoliza,
                    nmsuplem,
                    nmsuplem,
                    status,
                    datosMpolizasPantalla,
                    cdptovta, cdgrupo, cdsubgpo, cdperfil
                    );
            
            success = true;
        } catch (Exception ex) {
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    @Action(
            value = "datosGenerales/cargar", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String cargar () {
        logger.debug(Utils.log("### cargar params: ", params));
        try {
            Utils.validateSession(session);
            Utils.validate(params, "No se recibieron datos para cargar cotizaci\u00f3n");
            String cdunieco = params.get("cdunieco"),
                   cdramo = params.get("cdramo"),
                   estado = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsuplem = params.get("nmsuplem"),
                   swcolind = params.get("swcolind"),
                   nmpolcoi = params.get("nmpolcoi");
            Utils.validate(cdunieco, "Falta la sucursal",
                    cdramo, "Falta el ramo",
                    swcolind, "Falta indicador de colectivo/individual"
                    );
            if (StringUtils.isBlank(nmsuplem)) {
                nmsuplem = "0";
            }
            
            params = datosGeneralesManager.cargar(cdunieco, cdramo, estado, nmpoliza, nmsuplem, swcolind, nmpolcoi);
            success = true;
        } catch (Exception ex) {
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    @Action(
            value = "datosGenerales/guardar", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String guardar () {
        logger.debug(Utils.log("###### guardar params = ", params));
        try {
            UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
            Utils.validate(params, "No se recibieron datos generales");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsuplem = params.get("nmsuplem"),
                   status   = params.get("status");
            Utils.validate(cdunieco , "Falta cdunieco",
                           cdramo   , "Falta cdramo",
                           estado   , "Falta estado",
                           nmpoliza , "Falta nmpoliza");
            nmsuplem = Utils.NVL(nmsuplem, "0");
            list = datosGeneralesManager.guardar(usuario.getCdusuari(),
                    usuario.getRolActivo().getCdsisrol(), cdunieco, cdramo, estado, nmpoliza, nmsuplem, params);
            success = true;
        } catch (Exception ex) {
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }

    @Action(
            value = "datosGenerales/obtenerCoaseguroCedido", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String obtenerCoaseguroCedido () {
        logger.debug(Utils.log("###### obtenerCoaseguroCedido params: ", params));
        try {
            Utils.validateSession(session);
            Utils.validate(params, "No hay datos");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsuplem = params.get("nmsuplem");
            
            Utils.validate(cdunieco, "Falta cdunieco",
                           cdramo,   "Falta cdramo",
                           estado,   "Falta estado",
                           nmpoliza, "Falta poliza",
                           nmsuplem, "Falta nmsuplem");
            list = datosGeneralesManager.obtenerCoaseguroCedido(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
            if(list.size() > 0){
                params.put("cdmodelo", list.get(0).get("cdmodelo"));
                params.put("swpagcom", list.get(0).get("swpagcom"));
                params.put("status", list.get(0).get("status"));
                params.put("otvalor07", list.get(0).get("otvalor07"));
            }
            success = true;
        } catch (Exception ex) {
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    @Action(
            value = "datosGenerales/obtenerCoaseguroAceptado", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String obtenerCoaseguroAceptado() {
        logger.debug(Utils.log("###### obtenerCoaseguroCedido params: ", params));
        try {
            Utils.validateSession(session);
            Utils.validate(params, "No hay datos");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsuplem = params.get("nmsuplem");
            
            Utils.validate(cdunieco, "Falta cdunieco",
                           cdramo,   "Falta cdramo",
                           estado,   "Falta estado",
                           nmpoliza, "falta poliza",
                           nmsuplem, "Falta nmsuplem");
            list = datosGeneralesManager.obtenerCoaseguroAceptado(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
            if(list.size() > 0){
                for(Map<String, String> map: list){
                    for(String key: map.keySet()){
                        params.put(key, map.get(key));
                    }
                }
            }
            success = true;
        } catch (Exception ex) {
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    @Action(
            value = "datosGenerales/obtenerModeloCoaseguro", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String obtenerModeloCoaseguro () {
        logger.debug(Utils.log("###### obtenerModeloCoaseguro params: ", params));
        try {
            Utils.validateSession(session);
            Utils.validate(params, "No hay datos");
            String cdmodelo = params.get("cdmodelo");            
            Utils.validate(cdmodelo, "Falta modelo de coaseguro");
            list = datosGeneralesManager.obtenerModeloCoaseguro(cdmodelo);
            success = true;
        } catch (Exception ex) {
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    @Action(
            value = "datosGenerales/movimientoCoaseguroCedido", 
            results = { 
                @Result(name = "success", type = "json") 
            }, 
            interceptorRefs = {
                    @InterceptorRef(value = "json", 
                            params = {"enableSMD", "true", "ignoreSMDMethodInterfaces", "false" }
                    )
            }
        )
    public String movimientoCoaseguroCedido() {
        logger.debug(Utils.log("###### movimientoCoaseguroCedido params: ", params,"list:", list));
        try {
        	// Recuperamos la referencia a la sesion, que se pierde al usar SMD:
        	this.session = ActionContext.getContext().getSession();
        	
            Utils.validateSession(session);
            Utils.validate(params, "No hay parametros");
            Utils.validate(list, "No hay datos");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsuplem = params.get("nmsuplem"),
                   cdtipcoa = params.get("cdtipcoa"),
                   swabrido = params.get("swabrido"),
                   cdmodelo = params.get("cdmodelo"),
                   swpagcom = params.get("swpagcom"),
                   status = params.get("status"),
                   accion = params.get("accion");
             Utils.validate(cdunieco, "No se recibio sucursal",
                            cdramo,   "No se recibio producto",
                            estado,   "No se recibio estado de la poliza",
                            nmpoliza, "No se recibio numero de poliza",
                            nmsuplem, "No se recibio suplemento de poliza",
                            cdtipcoa, "No se recibio tipo de coaseguro",
                            status,   "No se recibio el status");           
            datosGeneralesManager.movimientoMpolicoa(cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmsuplem, cdtipcoa, status, cdmodelo, swpagcom, list, accion);
            datosAuxiliaresManager.guardarDatosAuxiliares(cdunieco, cdramo, estado, nmpoliza, "B1", "-1", "*", nmsuplem, status, params);
            datosGeneralesManager.actualizaSwitchCoaseguroCedido(cdunieco, cdramo, estado, nmpoliza, nmsuplem, params);
            success = true;
        } catch (Exception ex) {
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    @Action(
            value = "datosGenerales/movimientoMsupcoa", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String movimientoMsupcoa() {
        logger.debug(Utils.log("###### movimientoMpolicoa params: ", params));
        try {
            Utils.validateSession(session);
            Utils.validate(params, "No hay datos");
            String cdcialider = params.get("cdcialider"),
                   cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmpolizal = params.get("nmpolizal"),
                   nmsuplem = params.get("nmsuplem"),
                   tipodocu = params.get("tipodocu"),
                   ndoclider = params.get("ndoclider"),
                   status = params.get("status"),
                   accion = params.get("accion");
             Utils.validate(cdcialider, "No se recibio compañia lider",
                            cdunieco, "No se recibio sucursal",
                            cdramo,   "No se recibio producto",
                            estado,   "No se recibio estado de la poliza",
                            nmpoliza, "No se recibio numero de poliza",
                            nmpolizal, "No se recibio numero de poliza largo",
                            nmsuplem, "No se recibio suplemento de poliza");
            datosGeneralesManager.movimientoMsupcoa(cdcialider, cdunieco, cdramo, estado, nmpoliza, nmpolizal, nmsuplem, nmsuplem, tipodocu, ndoclider, status, accion);
            success = true;
        } catch (Exception ex) {
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    @Action(
            value = "datosGenerales/eliminaCoaseguro", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String eliminaCoaseguro() {
        logger.debug(Utils.log("###### eliminaCoaseguro params: ", params));
        try {
            Utils.validateSession(session);
            Utils.validate(params, "No hay datos");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsuplem = params.get("nmsuplem");
             Utils.validate(cdunieco, "No se recibio sucursal",
                            cdramo,   "No se recibio producto",
                            estado,   "No se recibio estado de la poliza",
                            nmpoliza, "No se recibio numero de poliza",
                            nmsuplem, "No se recibio suplemento de poliza");
            datosGeneralesManager.eliminaCoaseguro(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
            success = true;
        } catch (Exception ex) {
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    @Action(
            value = "datosGenerales/obtenerExclusionesSituacCoaCedParc", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String obtenerExclusionesSituacCoaCedParc() {
        logger.debug(Utils.log("###### obtenerExclusionesSituacCoaCedParc params: ", params));
        try {
            Utils.validateSession(session);
            Utils.validate(params, "No hay datos");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsituac = params.get("nmsituac"),
                   nmsuplem = params.get("nmsuplem");
             Utils.validate(cdunieco, "No se recibio sucursal",
                            cdramo,   "No se recibio producto",
                            estado,   "No se recibio estado de la poliza",
                            nmpoliza, "No se recibio numero de poliza",
                            nmsuplem, "No se recibio suplemento de poliza");
            list = datosGeneralesManager.obtenerExclusionesSituacCoaCedParc(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem);
            success = true;
        } catch (Exception ex) {
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    @Action(
            value = "datosGenerales/obtenerExclusionesCoberCoaCedParc", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String obtenerExclusionesCoberCoaCedParc() {
        logger.debug(Utils.log("###### obtenerExclusionesCoberCoaCedParc params: ", params));
        try {
            Utils.validateSession(session);
            Utils.validate(params, "No hay datos");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsituac = params.get("nmsituac"),
                   cdgarant = params.get("cdgarant"),
                   nmsuplem = params.get("nmsuplem");
             Utils.validate(cdunieco, "No se recibio sucursal",
                            cdramo,   "No se recibio producto",
                            estado,   "No se recibio estado de la poliza",
                            nmpoliza, "No se recibio numero de poliza",
                            nmsuplem, "No se recibio suplemento de poliza");
            list = datosGeneralesManager.obtenerExclusionesCoberCoaCedParc(cdunieco, cdramo, estado, nmpoliza, nmsituac, cdgarant, nmsuplem);
            success = true;
        } catch (Exception ex) {
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    @Action(
            value = "datosGenerales/obtenerCoaseguroPoliza", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String obtenerCoaseguroPoliza() {
        logger.debug(Utils.log("###### obtenerCoaseguroPoliza params: ", params));
        try {
            Utils.validateSession(session);
            Utils.validate(params, "No hay datos");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsuplem = params.get("nmsuplem");
             Utils.validate(cdunieco, "No se recibio sucursal",
                            cdramo,   "No se recibio producto",
                            estado,   "No se recibio estado de la poliza",
                            nmpoliza, "No se recibio numero de poliza",
                            nmsuplem, "No se recibio suplemento de poliza");
            String cdtipcoa = datosGeneralesManager.obtenerCoaseguroPoliza(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
            params.put("cdtipcoa", cdtipcoa);
            success = true;
        } catch (Exception ex) {
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    @Action(
            value = "datosGenerales/movimientoExclusionesSituacCoaCedParc", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String movimientoExclusionesSituacCoaCedParc() {
        logger.debug(Utils.log("###### movimientoExclusionesSituacCoaCedParc params: ", params));
        try {
            Utils.validateSession(session);
            Utils.validate(params, "No hay datos");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsituac = params.get("nmsituac"),
                   nmsuplem = params.get("nmsuplem"),
                   accion   = params.get("accion");
             Utils.validate(cdunieco, "No se recibio sucursal",
                            cdramo,   "No se recibio producto",
                            estado,   "No se recibio estado de la poliza",
                            nmpoliza, "No se recibio numero de poliza",
                            nmsuplem, "No se recibio suplemento de poliza",
                            accion,   "No se recibio la accion");
            datosGeneralesManager.movimientoExclusionesSituacCoaCedParc(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, accion);
            success = true;
        } catch (Exception ex) {
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    @Action(
            value = "datosGenerales/movimientoExclusionesCoberCoaCedParc", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String movimientoExclusionesCoberCoaCedParc() {
        logger.debug(Utils.log("###### movimientoExclusionesCoberCoaCedParc params: ", params));
        try {
            Utils.validateSession(session);
            Utils.validate(params, "No hay datos");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsituac = params.get("nmsituac"),
                   cdcapita = params.get("cdcapita"),
                   nmsuplem = params.get("nmsuplem"),
                   accion   = params.get("accion");
             Utils.validate(cdunieco, "No se recibio sucursal",
                            cdramo,   "No se recibio producto",
                            estado,   "No se recibio estado de la poliza",
                            nmpoliza, "No se recibio numero de poliza",
                            nmsituac, "No se recibio la situacion de riesgo",
                            cdcapita, "No se recibio la cobertura",
                            nmsuplem, "No se recibio suplemento de poliza",
                            accion,   "No se recibio la accion");
            datosGeneralesManager.movimientoExclusionesCoberCoaCedParc(cdunieco, cdramo, estado, nmpoliza, nmsituac, cdcapita, nmsuplem, accion);
            success = true;
        } catch (Exception ex) {
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getParams() {
        return params;
    }

    public void setParams(Map<String, String> params) {
        this.params = params;
    }

    public List<Map<String, String>> getList() {
        return list;
    }

    public void setList(List<Map<String, String>> list) {
        this.list = list;
    }
    
}