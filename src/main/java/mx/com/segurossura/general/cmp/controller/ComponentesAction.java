package mx.com.segurossura.general.cmp.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.biosnettcs.core.controller.PrincipalCoreAction;
import mx.com.segurossura.general.cmp.service.ComponentesManager;

import com.biosnettcs.core.Utils;

@Controller
@Scope
@ParentPackage("json-default")
@Namespace("/general")
 
public class ComponentesAction  extends PrincipalCoreAction{
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private static Logger logger = LoggerFactory.getLogger(ComponentesAction.class);
    private List<Map<String,String>>    secciones;
    private Map<String, String>         params;
    private boolean                     success;
    private Map<String, List<Map<String,String>>>    componentes;
    private String                      message;
    
    @Autowired
    private ComponentesManager          componentesManager;

    @Action(
            value = "recuperarComponentes", 
            results = {
                @Result(name = "success", type = "json") 
            },
            interceptorRefs = {
                    @InterceptorRef(value = "json", params = {"enableSMD", "true","ignoreSMDMethodInterfaces","false"})
            })
    public String recuperarComponentes() throws Exception {
        logger.debug(Utils.log(
                "\n################################"
               ,"\n###### recuperarComponentes ######"
               ,"\n###### secciones=" , secciones
               ));
        try{
            Utils.validate(secciones, "No se recibieron datos");
            for(Map<String, String> map:secciones){
                String pantalla = map.get("pantalla");
                String seccion  = map.get("seccion");
                Utils.validate(pantalla, "No se recibio el nombre de la pantalla");
                Utils.validate(seccion,  "No se recibio la seccion");                
                success = true;
            }
            componentes = componentesManager.obtenerComponentes(secciones);
        }
        catch(Exception ex){
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        logger.debug(Utils.log(
                "\n################################"
               ,"\n###### recuperarComponentes ######"
               ,"\n###### componentes=" , componentes
               ));
        return SUCCESS;
    }
    
    @Action(
            value = "movimientoComponentes", 
            results = {
                @Result(name = "success", type = "json") 
            },
            interceptorRefs = {
                    @InterceptorRef(value = "json", params = {"enableSMD", "true","ignoreSMDMethodInterfaces","false"})
            }
        )
    public String movimientoComponentes() throws Exception {
        logger.debug(Utils.log(
                "\n################################"
               ,"\n###### movimientoComponentes ######"
               ,"\n###### params=" , params
               ));
        try{
            Utils.validate(params, "No se recibieron datos");
            String pantalla = params.get("pantalla");
            String seccion  = params.get("seccion");
            String modulo   = params.get("modulo");
            String estatus  = params.get("estatus");
            String cdramo   = params.get("cdramo");
            String cdtipsit = params.get("cdtipsit");
            String cdsisrol = params.get("cdsisrol");
            String auxkey   = params.get("auxkey");            
            Utils.validate(pantalla, "No se recibio la pantalla");
            Utils.validate(seccion, "No se recibio la seccion");
            Utils.validate(secciones, "No se recibieron datos");
            componentesManager.movimientoComponentes(pantalla, seccion, modulo, estatus, cdramo, cdtipsit, cdsisrol, auxkey, secciones);
        }
        catch(Exception ex){
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        logger.debug(Utils.log(
                "\n################################"
               ,"\n###### movimientoComponentes ######"
               ));
        return SUCCESS;
    }

    public List<Map<String, String>> getSecciones() {
        return secciones;
    }

    public void setSecciones(List<Map<String, String>> secciones) {
        this.secciones = secciones;
    }

    public Map<String, String> getParams() {
        return params;
    }

    public void setParams(Map<String, String> params) {
        this.params = params;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean exito) {
        this.success = exito;
    }

    public Map<String, List<Map<String, String>>> getComponentes() {
        return componentes;
    }

    public void setComponentes(Map<String, List<Map<String, String>>> resultados) {
        this.componentes = resultados;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String respuesta) {
        this.message = respuesta;
    }
}
