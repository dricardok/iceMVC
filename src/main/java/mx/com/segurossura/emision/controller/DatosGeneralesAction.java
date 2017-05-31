package mx.com.segurossura.emision.controller;

import java.util.HashMap;
import java.util.Map;

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
            if (params == null) {
                params = new HashMap<String, String>();
            }
            
            params = datosGeneralesManager.valoresDefectoFijos(params.get("b1_cdunieco"), params.get("b1_cdramo"), params.get("b1_estado"),
                    params.get("b1_nmpoliza"), params.get("b1_nmsuplem"), params.get("swcolind"), params.get("nmpolcoi"));
            
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
            
            String cdunieco = params.get("b1_cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("b1_nmpoliza");
            
            Utils.validate(cdunieco , "Falta cdunieco",
                           cdramo   , "Falta cdramo",
                           estado   , "Falta estado",
                           nmpoliza , "Falta nmpoliza");
            
            params = datosGeneralesManager.valoresDefectoVariables (
                    usuario.getCdusuari(), usuario.getRolActivo().getCdsisrol(),
                    cdunieco,
                    cdramo,
                    estado,
                    nmpoliza,
                    params.get("nmsuplem"),
                    params.get("nmsuplem"),
                    params.get("status"),
                    params.get("swestado"),
                    params.get("nmpoliza"),
                    StringUtils.isBlank(params.get("feautori"))
                        ? null
                        : Utils.parse(params.get("feautori")),
                    params.get("cdmotanu"),
                    StringUtils.isBlank(params.get("feanulac"))
                        ? null
                        : Utils.parse(params.get("feanulac")),
                    params.get("swautori"),
                    params.get("cdmoneda"),
                    StringUtils.isBlank(params.get("feinisus"))
                        ? null
                        : Utils.parse(params.get("feinisus")),
                    StringUtils.isBlank(params.get("fefinsus"))
                        ? null
                        : Utils.parse(params.get("fefinsus")),
                    params.get("ottempot"),
                    StringUtils.isBlank(params.get("feefecto"))
                        ? null
                        : Utils.parse(params.get("feefecto")),
                    params.get("hhefecto"),
                    StringUtils.isBlank(params.get("feproren"))
                        ? null
                        : Utils.parse(params.get("feproren")),
                    StringUtils.isBlank(params.get("fevencim"))
                        ? null
                        : Utils.parse(params.get("fevencim")),
                    params.get("nmrenova"),
                    StringUtils.isBlank(params.get("ferecibo"))
                        ? null
                        : Utils.parse(params.get("ferecibo")),
                    StringUtils.isBlank(params.get("feultsin"))
                        ? null
                        : Utils.parse(params.get("feultsin")),
                    params.get("nmnumsin"),
                    params.get("cdtipcoa"),
                    params.get("swtarifi"),
                    params.get("swabrido"),
                    StringUtils.isBlank(params.get("feemisio"))
                        ? null
                        : Utils.parse(params.get("feemisio")),
                    params.get("cdperpag"),
                    params.get("nmpoliex"),
                    params.get("nmcuadro"),
                    params.get("porredau"),
                    params.get("swconsol"),
                    params.get("nmpolcoi"),
                    params.get("adparben"),
                    params.get("nmcercoi"),
                    params.get("cdtipren")
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
        try {
            
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
    
}