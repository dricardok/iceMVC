package mx.com.segurossura.emision.controller;

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

import mx.com.segurossura.emision.service.ImpresionManager;
import mx.com.royalsun.alea.commons.bean.Documento;

@Controller
@Scope("prototype")
@ParentPackage(value="default")
@Namespace("/emision")
public class ImpresionAction extends PrincipalCoreAction {

	private static final Logger logger = LoggerFactory.getLogger(ImpresionAction.class);
	
	private boolean success;
	private String message;
	private Map<String, String> params;
	private List<Documento> lista;
	@Autowired
	private ImpresionManager impresionManager;
	
	@Action(
            value = "impresion/documentosImpresion", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
	public String getDocumentos(){

		logger.debug(Utils.log("### cargar params: ", params));

		try{

			Utils.validateSession(session);
			Utils.validate(params, "No se recibieron datos para buscar documentos");
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
			lista = impresionManager.getDocumentos(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
			success = true;

		}catch(Exception ex){
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

    public void setLista(List<Documento> lista) {
        this.lista = lista;
    }
    
    public List<Documento> getLista(){
        return lista;
    }
}