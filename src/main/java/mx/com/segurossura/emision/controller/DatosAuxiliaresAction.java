package mx.com.segurossura.emision.controller;

import java.util.Map;

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

import mx.com.segurossura.emision.service.DatosAuxiliaresManager;

@Controller
@Scope("prototype")
@ParentPackage(value="default")
@Namespace("/emision")
public class DatosAuxiliaresAction extends PrincipalCoreAction {
private static final Logger logger = LoggerFactory.getLogger(DatosGeneralesAction.class);
    
    private boolean success;
    private String message;
    private Map<String, String> params;
    
    @Autowired
    private DatosAuxiliaresManager datosAuxiliaresManager;
    
    @Action(
            value = "datosAuxiliares/guardarDatosAuxiliares", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String guardarDatosAuxiliares () {
        logger.debug(Utils.log("###### guardarDatosAuxiliares params = ", params));
        try {
            Utils.validateSession(session);
            Utils.validate(params, "No hay par\u00e1metros para guardar datos auxiliares");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   cdbloque = params.get("cdbloque"),
                   nmsituac = params.get("nmsituac"),
                   cdgarant = params.get("cdgarant"),
                   nmsuplem = params.get("nmsuplem"),
                   status   = params.get("status");
            Utils.validate(cdunieco , "Falta cdunieco",
                           cdramo   , "Falta cdramo",
                           estado   , "Falta estado",
                           nmpoliza , "Falta nmpoliza",
                           cdbloque , "Falta cdbloque",
                           nmsituac , "Falta nmsituac",
                           cdgarant , "Falta cdgarant",
                           nmsuplem , "Falta nmsuplem",
                           status   , "Falta status");
            datosAuxiliaresManager.guardarDatosAuxiliares(cdunieco, cdramo, estado, nmpoliza, cdbloque, nmsituac, cdgarant,
                    nmsuplem, status, params);
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
}