package mx.com.segurossura.emision.controller;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.biosnettcs.core.Utils;
import com.biosnettcs.portal.controller.PrincipalCoreAction;

import mx.com.segurossura.emision.service.impl.DocumentosPolizaManagerImpl;

public class DocumentosPolizaAction extends PrincipalCoreAction {

	private static final long serialVersionUID = -8150842831873780873L;
	
	private static final Logger logger = LoggerFactory.getLogger(DocumentosPolizaAction.class);
	
	private Map<String,String> params;
	private boolean            success;
	private String             message;
	private List<String>	   bloques;
	private List<Map<String, String>> list;
	
	private Map<String, List<Map<String, String>>> componentes;
	private static SimpleDateFormat renderFechas = new SimpleDateFormat("dd/MM/yyyy");
	
	@Autowired
	private DocumentosPolizaManagerImpl documentosPoliza;
	
	@Action(
			value = "obtenerDocumentosPolizaAction",
			results = {
					@Result(name = "success", type = "json")
			}
	)
	public String obtenerDocumentosPoliza() {
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### obtenerDocumentosPoliza ######"
				));
		
		String result = SUCCESS;
		
		try{
			
			Utils.validate(params, "No se recibieron datos");
			
			String cdunieco = params.get("cdunieco");
			String cdramo = params.get("cdramo");
			String estado = params.get("estado");
			String nmpoliza = params.get("nmpoliza");
			String nmsuplem = Utils.NVL(params.get("nmsuplem"), "0");
			
			Utils.validate(cdunieco, "Falta cdunieco");
            Utils.validate(cdramo,   "Falta cdramo");
            Utils.validate(estado,   "Falta estado");
            Utils.validate(nmpoliza, "Falta nmpoliza");
			
			list = documentosPoliza.obtenerDocumentosPoliza(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
			
			success = true;
			
			result = SUCCESS;
			
		}catch(Exception ex) {
			success = false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### obtenerDocumentosPoliza ######"
				,"\n###################"
				));
		return result;
	}
	
	@Action(        
            value = "realizarMovimientoDocspoli", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )   
    public String realizarMovimientoDocspoli() {    	
		logger.debug(StringUtils.join(
                "\n################################",
                "\n###### realizarMovimientoDocspoli ######",
                "\n###### params ", params
               ));  	
    	try{
    		Utils.validate(params, "No se recibieron datos");
    		
    		String cdunieco     = params.get("cdunieco"),
                    cdramo      = params.get("cdramo"),
                    estado      = params.get("estado"),
                    nmpoliza    = params.get("nmpoliza"),
                    nmsolici    = params.get("nmsolici"),
                    nmsuplem    = params.get("nmsuplem"),
                    accion      = params.get("accion");
    		
    		nmsuplem = Utils.NVL(nmsuplem, "0");
    		
    		Utils.validate(cdunieco,    "No se recibi\u00f3 la oficina",
                    cdramo,      "No se recibi\u00f3 el ramo",
                    estado,      "No se recibi\u00f3 el estado de la p\u00f3liza",
                    nmpoliza,    "No se recibi\u00f3 el n\u00famero de p\u00f3liza",
                    nmsuplem,    "Falta nmsuplem",
                    nmsolici,	 "Falta nmsolici",
                    accion,      "Falta acci\u00f3n");
    		
    		documentosPoliza.realizarMovimientoDocsPoliza(cdunieco, cdramo, estado, nmpoliza, nmsolici, nmsuplem, 
    				params, accion);
    		
    		
    	}catch(Exception ex){
    		success=false;
            message = Utils.manejaExcepcion(ex);
    	}
    	 logger.debug("Fin realizarMovimientoDocumentospoliza...");
    	return SUCCESS;	
    }
	
	
	// Getters and Setters
	
	public Map<String, String> getParams() {
		return params;
	}

	public void setParams(Map<String, String> params) {
		this.params = params;
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

	public List<String> getBloques() {
		return bloques;
	}

	public void setBloques(List<String> bloques) {
		this.bloques = bloques;
	}

	public List<Map<String, String>> getList() {
		return list;
	}

	public void setList(List<Map<String, String>> list) {
		this.list = list;
	}

	public Map<String, List<Map<String, String>>> getComponentes() {
		return componentes;
	}

	public void setComponentes(Map<String, List<Map<String, String>>> componentes) {
		this.componentes = componentes;
	}
}
