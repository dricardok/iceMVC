package mx.com.segurossura.mesacontrol.controller;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

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

import mx.com.segurossura.mesacontrol.service.HistorialManager;

@Controller
@Scope("prototype")
@ParentPackage(value="json-default")
@Namespace("/mesacontrol/historial")
public class HistorialAction extends PrincipalCoreAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static final Logger logger = LoggerFactory.getLogger(HistorialAction.class);
	
	private boolean success;
	
	private String message;
	
	private Map<String, String> params;
	
	private List<Map<String, String>> list;
	
	private static SimpleDateFormat renderFechas = new SimpleDateFormat("dd/MM/yyyy HH:mm");
	
	@Autowired
	HistorialManager historialManager;
	
	@Action(
			value = "obtenerThmesacontrol",
			results = {
					@Result(name = "success", type = "json")
			}
	)
	public String obtenerThmesacontrol() {
		
		logger.debug(StringUtils.join(
                "\n################################",
                "\n###### obtenerThmesacontrol ######",
                "\n###### params ", params
               ));
		try{
			Utils.validate(params, "No se recibieron parametros");			
			String ntramite = params.get("ntramite");
            Utils.validate(ntramite,"No se recibio el tramite");
            list = historialManager.obtieneThmesacontrol(ntramite);
            
            success = true;
		}catch(Exception ex){
			success = false;
			Utils.manejaExcepcion(ex);
		}
		logger.debug(StringUtils.join(
                
                "\n###### obtenerThmesacontrol ######",
				"\n################################"
               ));
		
		return SUCCESS;
	}
	
	@Action(
			value = "obtenerTdmesacontrol",
			results = {
					@Result(name = "success", type = "json")
			}
	)
	public String obtenerTdmesacontrol() {
		
		logger.debug(StringUtils.join(
                "\n################################",
                "\n###### obtenerTdmesacontrol ######",
                "\n###### params ", params
               ));
		try{
			Utils.validate(params, "No se recibieron parametros");			
			String ntramite = params.get("ntramite");
            Utils.validate(ntramite,"No se recibio el tramite");
            list = historialManager.obtieneTdmesacontrol(ntramite);
            
            success = true;
		}catch(Exception ex){
			success = false;
			Utils.manejaExcepcion(ex);
		}
		logger.debug(StringUtils.join(
                
                "\n###### obtenerTdmesacontrol ",list,"######",
				"\n################################"
               ));
		
		return SUCCESS;
	}
	
	@Action(
			value = "movimientoTdmesacontrol",
			results = {
					@Result(name = "success", type = "json")
			}
	)
	public String movimientoTdmesacontrol() {
		
		logger.debug(StringUtils.join(
                "\n#####################################",
                "\n###### movimientoTdmesacontrol ######",
                "\n###### params =", params
               ));
		try{
			Utils.validate(params, "No se recibieron parametros");			
			String ntramite = params.get("ntramite");
			String nmordina = params.get("nmordina");
			String cdtiptra = params.get("cdtiptra");
			String cdclausu = params.get("cdclausu");
			String fecha    = params.get("fecha");
			String comments  = params.get("comments");
			String cdusuari = params.get("cdusuari");
			String cdmotivo = params.get("cdmotivo");
			String cdsisrol = params.get("cdsisrol");
			String swagente = params.get("swagente");
			String estatus  = params.get("estatus");
			String cdmodulo = params.get("cdmodulo");
			String cdevento = params.get("cdevento");
			String accion   = params.get("accion");
            Utils.validate(ntramite,"No se recibio el tramite",
            				nmordina,"No se recibio nmordina");
            historialManager.movimientoTdmesacontrol(ntramite, nmordina, cdtiptra, cdclausu,renderFechas.parse( fecha), comments, 
            		cdusuari, cdmotivo, cdsisrol, swagente, estatus, cdmodulo, cdevento, accion);;
            
            success = true;
		}catch(Exception ex){
			success = false;
			Utils.manejaExcepcion(ex);
		}
		logger.debug(StringUtils.join(
                
                "\n###### movimientoTdmesacontrol ######",
				"\n#####################################"
               ));
		
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
