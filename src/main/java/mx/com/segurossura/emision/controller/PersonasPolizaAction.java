package mx.com.segurossura.emision.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.biosnettcs.core.Utils;
import com.biosnettcs.portal.controller.PrincipalCoreAction;

@Controller
@Scope("prototype")
@ParentPackage(value="json-default")
@Namespace("/emision")
public class PersonasPolizaAction extends PrincipalCoreAction{
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private Map<String, String> params;
    private List<Map<String, String>> listas;
    private Map<String, String> lista;
    private boolean success;
    private String message;
    
    @Action(
            value = "obtenerPersonasPoliza", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String obtenerPersonasPoliza(){
        logger.debug(StringUtils.join(
                "\n################################",
                "\n###### obtenerPersonasPoliza ######",
                "\n###### params ", params
               ));
        try{
            Utils.validate(params, "No se recibieron parametros");
            String cdunieco = params.get("cdunieco");
            String cdramo = params.get("cdramo");
            String estado = params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            String nmsituac = params.get("nmsituac");
            String nmsuplem = params.get("nmsuplem");
            Utils.validate(cdunieco, "No se recibio la oficina");
            Utils.validate(cdramo, "No se recibio el ramo");
            Utils.validate(estado, "No se recibo el estado de la póliza");
            Utils.validate(nmpoliza, "No se recibio el número de póliza");
            Utils.validate(nmsituac, "No se recibio la situacion de la póliza");
            Utils.validate(nmsuplem, "No se recibio el suplemento de la póliza");
            listas = new ArrayList<Map<String, String>>();
            Map<String, String> persona = new HashMap<String, String>();
            if(Integer.parseInt(nmsituac) > 0){
                persona.put("cdrol", "AS");
            } else {
                persona.put("cdrol", "TO");
            }
            persona.put("cdunieco", cdunieco);
            persona.put("cdramo", cdramo);
            persona.put("estado", estado);
            persona.put("nmpoliza", nmpoliza);            
            persona.put("nmsituac", nmsituac);
            persona.put("cdperson", "4066");
            persona.put("nmsuplem", nmsuplem);
            persona.put("status", "V");
            persona.put("nmorddom", "1");
            persona.put("swfallec", "N");
            listas.add(persona);
            success = true;
        } catch(Exception ex){
            success = false;
            Utils.manejaExcepcion(ex);
        }
        logger.debug(StringUtils.join(
                "\n################################",
                "\n listas: ",listas,
                "\n###### obtenerPersonasPoliza ######"
               ));
        return SUCCESS;
    }

    @Action(
            value = "obtenerPersonaPoliza", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String obtenerPersonaPoliza(){
        logger.debug(StringUtils.join(
                "\n################################",
                "\n###### obtenerPersonaPoliza ######",
                "\n###### params ", params
               ));
        try{
            Utils.validate(params, "No se recibieron parametros");
            String dsatribu = params.get("dsatribu");
            String otvalor = params.get("otvalor");
            String cdunieco = params.get("cdunieco");
            String cdramo = params.get("cdramo");
            String estado = params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            String nmsituac = params.get("nmsituac");
            String cdrol = params.get("cdrol");
            String cdperson = params.get("cdperson");
            String nmsuplem = params.get("nmsuplem");
            Utils.validate(dsatribu, "No se recibio la descripcion");
            Utils.validate(otvalor, "No se recibio el valor");
            Utils.validate(cdunieco, "No se recibio la oficina");
            Utils.validate(cdramo, "No se recibio el ramo");
            Utils.validate(estado, "No se recibo el estado de la póliza");
            Utils.validate(nmpoliza, "No se recibio el número de póliza");
            Utils.validate(nmsituac, "No se recibio la situacion de la póliza");
            Utils.validate(cdrol, "No se recibio el rol");
            Utils.validate(cdperson, "No se recibio el codigo de persona");
            Utils.validate(nmsuplem, "No se recibio el suplemento de la póliza");
            lista = new HashMap<String, String>();
            lista.put("cdunieco", cdunieco);
            lista.put("cdramo", cdramo);
            lista.put("estado", estado);
            lista.put("nmpoliza", nmpoliza);
            lista.put("nmsituac", nmsituac);
            lista.put("cdrol", cdrol);
            lista.put("cdperson", cdperson);
            lista.put("nmsuplem", nmsuplem);
            lista.put("status", "V");
            lista.put("nmorddom", "1");
            lista.put("swfallec", "N");
            success = true;
        } catch(Exception ex){
            success = false;
            Utils.manejaExcepcion(ex);
        }
        logger.debug(StringUtils.join(
                "\n################################",
                "\n###### obtenerPersonaPoliza ######"
               ));
        return SUCCESS;
    }
    
    @Action(
            value = "obtenerDomicilios", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String obtenerDomicilios(){
        logger.debug(StringUtils.join(
                "\n################################",
                "\n###### obtenerDomicilios ######",
                "\n###### params ", params
               ));
        try{
            Utils.validate(params, "No se recibieron parametros");
            String cdperson = params.get("cdperson");            
            Utils.validate(cdperson, "No se recibio el codigo de persona");
            listas = new ArrayList<Map<String, String>>();
            Map<String, String> domicilio = new HashMap<String, String>();
            domicilio.put("cdperson", cdperson);
            domicilio.put("nmorddom", "1");
            domicilio.put("cdtipdom", "1");
            domicilio.put("dsdomici", "MONTES URALES");
            domicilio.put("cdsiglas", "NE");
            domicilio.put("cdidioma", "1");
            domicilio.put("nmtelex", "");
            domicilio.put("nmfax", "");
            domicilio.put("nmtelefo", "");
            domicilio.put("cdpostal", "06500");
            domicilio.put("otpoblac", "CUAUHTEMOC");
            domicilio.put("cdpais", "052");
            domicilio.put("otpiso", "");
            domicilio.put("nmnumero", "620");
            domicilio.put("cdprovin", "");
            domicilio.put("dszona", "");
            domicilio.put("cdcoloni", "09I58");
            listas.add(domicilio);
            success = true;
        } catch(Exception ex){
            success = false;
            Utils.manejaExcepcion(ex);
        }
        logger.debug(StringUtils.join(
                "\n################################",
                "\n###### obtenerDomicilios ######"
               ));
        return SUCCESS;
    }
    
    @Action(
            value = "movimientoPolizaPersona", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String movimientoPolizaPersona(){
        logger.debug(StringUtils.join(
                "\n################################",
                "\n###### movimientoPolizaPersona ######",
                "\n###### params ", params
               ));
        try{
            Utils.validate(params, "No se recibieron parametros");
            String cdunieco = params.get("cdunieco");
            String cdramo = params.get("cdramo");
            String estado = params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            String nmsituac = params.get("nmsituac");
            String cdrol = params.get("cdrol");
            String cdperson = params.get("cdperson");
            String nmsuplem = params.get("nmsuplem");
            String status = params.get("status");
            String nmorddom = params.get("nmorddom");
            String swfallec = params.get("swfallec");
            String accion = params.get("accion");
            Utils.validate(cdunieco, "No se recibio la oficina");
            Utils.validate(cdramo, "No se recibio el ramo");
            Utils.validate(estado, "No se recibo el estado de la póliza");
            Utils.validate(nmpoliza, "No se recibio el número de póliza");
            Utils.validate(nmsituac, "No se recibio la situacion de la póliza");
            Utils.validate(cdrol, "No se recibio el rol");
            Utils.validate(cdperson, "No se recibio el codigo de persona");
            Utils.validate(nmsuplem, "No se recibio el suplemento de la póliza");
            Utils.validate(status, "No se recibio status");
            Utils.validate(nmorddom, "No se recibio domicilio");
            Utils.validate(swfallec, "No se recibio switch fallecimiento");
            Utils.validate(accion, "No se recibio la accion");
            success = true;
        } catch(Exception ex){
            success = false;
            Utils.manejaExcepcion(ex);
        }
        logger.debug(StringUtils.join(
                "\n################################",
                "\n###### movimientoPolizaPersona ######"
               ));
        return SUCCESS;
    }
    
    //Getters y Setters
    
    public Map<String, String> getParams() {
        return params;
    }

    public void setParams(Map<String, String> params) {
        this.params = params;
    }

    public List<Map<String, String>> getListas() {
        return listas;
    }

    public void setListas(List<Map<String, String>> listas) {
        this.listas = listas;
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

    public Map<String, String> getLista() {
        return lista;
    }

    public void setLista(Map<String, String> lista) {
        this.lista = lista;
    }
}
