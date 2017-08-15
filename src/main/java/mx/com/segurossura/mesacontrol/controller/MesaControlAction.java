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
	
    private long start;
    private long limit;
    private long totalCount;
	
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
                "\n###### params ", params,
                "\n###### start ", start,
                "\n###### limit ", limit
               ));
		try{
			Utils.validate(params, "No se recibieron parametros");			
			String cdunieco = params.get("cdunieco") != null ? ("".equals(params.get("cdunieco")) ? null : params.get("cdunieco")) : null;
            String cdramo = params.get("cdramo")  != null ? ("".equals(params.get("cdramo")) ? null : params.get("cdramo")) : null;;
            String estado = params.get("estado")  != null ? ("".equals(params.get("estado")) ? null : params.get("estado")) : null;;
            String nmpoliza = params.get("nmpoliza")  != null ? ("".equals(params.get("nmpoliza")) ? null : params.get("nmpoliza")) : null;;
            String cdagente = params.get("cdagente")  != null ? ("".equals(params.get("cdagente")) ? null : params.get("cdagente")) : null;;
            String ntramite = params.get("ntramite")  != null ? ("".equals(params.get("ntramite")) ? null : params.get("ntramite")) : null;;
            String estatus = params.get("estatus")  != null ? ("".equals(params.get("estatus")) ? null : params.get("estatus")) : null;;
            Date desde = null, hasta = null;
            if(params.get("fstatusi") != null && !params.get("fstatusi").equals("")) {
             desde = renderFechas.parse(params.get("fstatusi"));
            }
            if(params.get("fstatusf") != null && !params.get("fstatusf").equals("")) {
             hasta = renderFechas.parse(params.get("fstatusf"));
            }
            String nombre = params.get("nombre")  != null ? ("".equals(params.get("nombre")) ? null : params.get("nombre")) : null;;
            String nmsolici = params.get("nmsolici")  != null ? ("".equals(params.get("nmsolici")) ? null : params.get("nmsolici")) : null;;
            
            list = mesaControlManager.obtenerTramites(cdunieco, cdramo, estado, nmpoliza, cdagente, ntramite, estatus, desde, hasta, nombre, nmsolici, start, limit);
            if(list!=null && !list.isEmpty()) {
                totalCount = Integer.parseInt(list.get(0).get("total"));
            }
            else {
            	totalCount = 0;
            }
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

	public long getStart() {
		return start;
	}


	public void setStart(long start) {
		this.start = start;
	}


	public long getLimit() {
		return limit;
	}


	public void setLimit(long limit) {
		this.limit = limit;
	}


	public long getTotalCount() {
		return totalCount;
	}


	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
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
