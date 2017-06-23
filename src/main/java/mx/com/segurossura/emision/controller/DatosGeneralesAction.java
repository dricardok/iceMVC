package mx.com.segurossura.emision.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
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
            Utils.validateSession(session);
            Utils.validate(params, "No hay datos");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsuplem = params.get("nmsuplem"),
                   status   = params.get("status");
            
            Utils.validate(cdunieco, "Falta cdunieco",
                           cdramo,   "Falta cdramo",
                           estado,   "Falta estado",
                           nmsuplem, "Falta nmsuplem",
                           status,   "Falta status");
            
            params = datosGeneralesManager.valoresDefectoFijos(cdunieco, cdramo, estado, nmpoliza, nmsuplem, status, params.get("swcolind"),
                    params.get("nmpolcoi"));
            
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
                   status   = params.get("status");
            
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
                    datosMpolizasPantalla
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