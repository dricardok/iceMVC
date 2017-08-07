package mx.com.segurossura.emision.controller;

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

import com.biosnettcs.core.Constantes;
import com.biosnettcs.core.Utils;
import com.biosnettcs.portal.controller.PrincipalCoreAction;
import com.biosnettcs.portal.model.RolSistema;
import com.biosnettcs.portal.model.UsuarioVO;
import com.opensymphony.xwork2.ActionContext;

import mx.com.segurossura.emision.service.AgentesManager;


@Controller
@Scope("prototype")
@ParentPackage(value="default")
@Namespace("/emision")
public class AgentesAction extends PrincipalCoreAction {

	private static final Logger logger = LoggerFactory.getLogger(AgentesAction.class);

	private boolean success;
	private String message;
	private Map<String, String> params;
	private List<Map<String, String>> list;
	private List<Map<String, String>> agentes;

	@Autowired
    private AgentesManager agentesManager;
	
	@Action(
            value = "agentes/cargar", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String cargar () {
		
        logger.debug(Utils.log("### cargar params: ", params));
        
        try {
        
        	Utils.validateSession(session);
            Utils.validate(params, "No se recibieron datos para cargar agente");
            String cdunieco = params.get("cdunieco"),
                   cdramo = params.get("cdramo"),
                   estado = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsuplem = params.get("nmsuplem");
            Utils.validate(cdunieco, "Falta la sucursal",
                    cdramo, "Falta el ramo",
                    estado, "Falta el estado",
                    nmpoliza, "Falta numero de poliza"                    
                    );
            if (StringUtils.isBlank(nmsuplem)) {
                nmsuplem = "0";
            }
            
            params = agentesManager.cargar(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
            
            success = true;
            
        } catch (Exception ex) {
            message = Utils.manejaExcepcion(ex);
        }
        
        return SUCCESS;
    }

	
	@Action(
            value = "agentes/cargarAgentes", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String cargarAgentes () {
		
        logger.debug(Utils.log("### cargar params: ", params));
        
        try {
        
        	Utils.validateSession(session);
            Utils.validate(params, "No se recibieron datos para cargar agentes");
            String cdunieco = params.get("cdunieco"),
                   cdramo = params.get("cdramo"),
                   estado = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   cdagente = params.get("cdagente"),
                   nmsuplem = params.get("nmsuplem");
            Utils.validate(cdunieco, "Falta la sucursal",
                    cdramo, "Falta el ramo",
                    estado, "Falta el estado",
                    nmpoliza, "Falta numero de poliza"                    
                    );
            if (StringUtils.isBlank(nmsuplem)) {
                nmsuplem = "0";
            }
            
            list = agentesManager.cargarAgentes(cdunieco, cdramo, estado, nmpoliza, cdagente, nmsuplem);
            
            success = true;
            
        } catch (Exception ex) {
            message = Utils.manejaExcepcion(ex);
        }
        
        return SUCCESS;
    }
	
	@Action(
            value = "agentes/guardarAgentes", 
            results = { 
	                @Result(name = "success", type = "json") 
	                }, 
	        interceptorRefs = {
	                @InterceptorRef(value = "json", 
	                        params = { "enableSMD", "true", "ignoreSMDMethodInterfaces", "false" }
	                )}
	)
    public String guardarAgentes () {
        logger.debug(Utils.log("### cargar params: ", params));
        logger.debug(Utils.log("### cargar listaAgentes: ", agentes));
        try {
        	this.session = ActionContext.getContext().getSession();
        	UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
            Utils.validate(params, "No se recibieron datos para guardar agentes");
            String cdunieco = params.get("cdunieco"),
                   cdramo = params.get("cdramo"),
                   estado = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsuplem = params.get("nmsuplem"),
                   nmcuadro = params.get("nmcuadro"),
                   porredau = params.get("porredau");
            Utils.validate(cdunieco, "Falta la sucursal",
                    cdramo, "Falta el ramo",
                    estado, "Falta el estado",
                    nmpoliza, "Falta numero de poliza",
                    nmcuadro, "Se debe indicar un cuadro de comision",
                    porredau, "Se debe indicar la sesion de comision"
                    );
            if (StringUtils.isBlank(nmsuplem)) {
                nmsuplem = "0";
            }
            list = agentesManager.guardarAgentes(cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmcuadro, porredau, agentes, usuario.getCdusuari(),
                    usuario.getRolActivo().getCdsisrol());
            success = true;
        } catch (Exception ex) {
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
	
	
	@Action(
            value = "agentes/buscarAgentes", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String buscarAgentes () {
		
        logger.debug(Utils.log("### cargar params: ", params));
        
        try {
        	UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
            Utils.validate(params, "No se recibieron datos para buscar agentes");
            String cdagente = params.get("cdagente");
            String cdgrupo = params.get("cdgrupo");
            String cdptovta = params.get("cdptovta");
            Utils.validate(cdagente, "Se debe indicar codigo de agente");
            
            //Si el rol es agente y tenemos el grupo y punto de venta, buscamos los agentes en dicho grupo:
			if (RolSistema.AGENTE.getCdsisrol().equals(usuario.getRolActivo().getCdsisrol())
					&& StringUtils.isNotBlank(cdgrupo) && StringUtils.isNotBlank(cdptovta)) {
        		list = agentesManager.buscarAgentesEnGrupo(cdagente, cdgrupo, cdptovta);
        	} else {
        		list = agentesManager.buscarAgentes(cdagente, "CLAVE");
        	}
            
            success = true;
            
        } catch (Exception ex) {
            message = Utils.manejaExcepcion(ex);
        }
        
        return SUCCESS;
    }
	
	@Action(
            value = "agentes/validarAgente", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String validarAgente () {
		
        logger.debug(Utils.log("### cargar params: ", params));
        
        try {
        
        	Utils.validateSession(session);
            Utils.validate(params, "No se recibieron datos para validar agente");
            String cdagente = params.get("cdagente");
            String cdramo = params.get("cdramo");
            String cdproceso = params.get("cdproceso");
            Utils.validate(cdagente, "Se debe indicar codigo de agente");
            Utils.validate(cdramo, "Se debe indicar codigo de rol");
            Utils.validate(cdproceso, "Se debe indicar codigo de proceso");
            
            params.put ("valido", agentesManager.validaAgente(cdagente, cdramo, cdproceso)?"S":"N");
            
            success = true;
            
        } catch (Exception ex) {
            message = Utils.manejaExcepcion(ex);
        }
        
        return SUCCESS;
    }
	
	
	@Action(
            value = "agentes/validarCuadroAgente", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String validarCuadroAgente() {
        
        try {
        	Utils.validateSession(session);
            Utils.validate(params, "No se recibieron datos para validar agente");
            Utils.validate(
            		 params.get("cdunieco"), "Falta la sucursal",
            		 params.get("cdramo"),   "Falta el ramo",
            		 params.get("estado"),   "Falta el estado",
            		 params.get("nmpoliza"), "Falta el numero de poliza",
            		 params.get("nmsuplem"), "Se debe indicar el suplemento de la \\u00F3",
            		 params.get("cdagente"), "Se debe indicar el agente"
                     );
            
			params.put("valido",
					agentesManager.validarCuadroComisionAgentePorPoliza(params.get("cdunieco"), params.get("cdramo"),
							params.get("estado"), params.get("nmpoliza"), params.get("nmsuplem"), params.get("cdagente"))
					? Constantes.SI : Constantes.NO);
            
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


	public List<Map<String, String>> getAgentes() {
		return agentes;
	}


	public void setAgentes(List<Map<String, String>> agentes) {
		this.agentes = agentes;
	}

}