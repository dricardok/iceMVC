package mx.com.segurossura.mesacontrol.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
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

import mx.com.segurossura.mesacontrol.service.MesaControlManager;

@Controller("mesaControlActionNew")
@Scope("prototype")
@ParentPackage(value="json-default")
@Namespace("/mesacontrol")
public class MesaControlAction extends PrincipalCoreAction {
	
	private static final long serialVersionUID = -3534829722619719307L;
	
	private static final Logger logger = LoggerFactory.getLogger(MesaControlAction.class);
	
	private boolean success;
	
	private String message;
	
	private Map<String, String> params;
	
	private List<Map<String, String>> list;
	
	private static SimpleDateFormat renderFechas = new SimpleDateFormat("dd/MM/yyyy");
	
	@Autowired
    private MesaControlManager mesaControlManager;
	
	
	@Action(
			value = "obtenerTramites",
			results = {
					@Result(name = "success", type = "json")
			}
	)
	public String obtenerTramites() {
		
		logger.debug(StringUtils.join(
                "\n################################",
                "\n###### obtenerMesaControl ######",
                "\n###### params ", params
               ));
		try{
			Utils.validate(params, "No se recibieron parametros");			
			String cdunieco = params.get("cdunieco");
            String cdramo = params.get("cdramo");
            String estado = params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            String cdagente = params.get("cdagente");
            String ntramite = params.get("ntramite");
            String estatus = params.get("estatus");
            Date desde = null, hasta = null;
            if(params.get("desde") != null)
             desde = renderFechas.parse(params.get("desde"));
            if(params.get("hasta") != null) 
             hasta = renderFechas.parse(params.get("hasta"));
            String nombre = params.get("nombre");
            String nmsolici = params.get("nmsolici");           
            
            list = mesaControlManager.obtenerTramites(cdunieco, cdramo, estado, nmpoliza, 
            									      cdagente, ntramite, estatus, desde, hasta, nombre, nmsolici);
            
            success = true;
		}catch(Exception ex){
			success = false;
			Utils.manejaExcepcion(ex);
		}
		logger.debug(StringUtils.join(
                "\n################################",
                "\n tramites : ", list,
                "\n###### obtenerMesaControl ######"
               ));
		
		return SUCCESS;
	}
	
	
	// Getters and Setters

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
