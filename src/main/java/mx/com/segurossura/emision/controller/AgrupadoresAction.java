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
import com.biosnettcs.core.model.BaseVO;
import com.biosnettcs.portal.controller.PrincipalCoreAction;

import mx.com.segurossura.emision.service.AgrupadoresManager;


@Controller
@Scope("prototype")
@ParentPackage(value="json-default")
@Namespace("/emision")
public class AgrupadoresAction extends PrincipalCoreAction {

    private static final long serialVersionUID = -7749154966703079520L;

    private static final Logger logger = LoggerFactory.getLogger(AgrupadoresAction.class);

	private boolean success;
	
	private String message;
	
	private Map<String, String> params;
	
	private List<Map<String, String>> list;
	
	private List<BaseVO> agrupadores;

	@Autowired
    private AgrupadoresManager agrupadoresManager;
	
	
	@Action(
			value = "obtenerAgrupadores",
			results = {
					@Result(name = "success", type = "json")
			}
	)
    public String obtenerAgrupadores() {
	    
		logger.debug(StringUtils.join(
                "\n################################",
                "\n###### obtenerAgrupadores ######",
                "\n###### params ", params
               ));
		try{
			Utils.validate(params, "No se recibieron parametros");			
			String cdunieco = params.get("cdunieco");
            String cdramo = params.get("cdramo");
            String estado = params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            String nmsuplem = params.get("nmsuplem");
            
            Utils.validate(cdunieco, "No se recibio la oficina");
            Utils.validate(cdramo, "No se recibio el ramo");
            Utils.validate(estado, "No se recibo el estado de la póliza");
            Utils.validate(nmpoliza, "No se recibio el número de póliza");
            Utils.validate(nmsuplem, "No se recibio el suplemento de la póliza");
            
            agrupadores = agrupadoresManager.obtenerAgrupadoresEnteros(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
            
            success = true;
		}catch(Exception ex){
			success = false;
			Utils.manejaExcepcion(ex);
		}
		logger.debug(StringUtils.join(
                "\n################################",
                "\n agrupadores : ", agrupadores,
                "\n###### obtenerPersonasPoliza ######"
               ));
		
		return SUCCESS;
	}
	
	
    @Action(
            value = "obtenerMpoliagr",
            results = {
                    @Result(name = "success", type = "json")
            }
    )
    public String obtenerMpoliagr() {
        logger.debug(StringUtils.join("###### obtenerMpoliagr params ", params));
        try {
            Utils.validate(params, "No se recibieron parametros");          
            String cdunieco = params.get("cdunieco");
            String cdramo   = params.get("cdramo");
            String estado   = params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            String cdagrupa = params.get("cdagrupa");
            String nmsuplem = params.get("nmsuplem");
            
            Utils.validate(cdunieco, "Falta cdunieco",
                           cdramo,   "Falta cdramo",
                           estado,   "Falta estado",
                           nmpoliza, "Falta nmpoliza",
                           cdagrupa, "Falta cdagrupa",
                           nmsuplem, "Falta nmsuplem");
            List<Map<String, String>> lista = agrupadoresManager.obtenerMpoliagr(cdunieco, cdramo, estado, nmpoliza, nmsuplem, cdagrupa);
            if (lista != null && lista.size() > 0) {
                params = lista.get(0);
            }
            success = true;
        } catch (Exception ex) {
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    
    @Action(
            value = "realizarMovimientoMpoliagr",
            results = {
                    @Result(name = "success", type = "json")
            }
    )
    public String realizarMovimientoMpoliagr() {
        
        logger.debug(StringUtils.join(
                "\n################################",
                "\n###### realizarMovimientoMpoliagr ######",
                "\n###### params ", params
               ));
        try{
            Utils.validate(params, "No se recibieron parametros");          
            String cdunieco    = params.get("cdunieco"),
                   cdramo      = params.get("cdramo"),
                   estado      = params.get("estado"),
                   nmpoliza    = params.get("nmpoliza"),
                   cdagrupa    = params.get("cdagrupa"),
                   nmsuplem    = params.get("nmsuplem"),
                   status      = params.get("status"),
                   nmsuplemEnd = params.get("nmsuplemEnd"),
                   accion      = params.get("accion");
            
            nmsuplem = Utils.NVL(nmsuplem, "0");
            status = Utils.NVL(status, "V");
            nmsuplemEnd = Utils.NVL(nmsuplemEnd, "0");
            
            Utils.validate(cdunieco,    "No se recibi\u00f3 la oficina",
                           cdramo,      "No se recibi\u00f3 el ramo",
                           estado,      "No se recibi\u00f3 el estado de la p\u00f3liza",
                           nmpoliza,    "No se recibi\u00f3 el n\u00famero de p\u00f3liza",
                           cdagrupa,    "Falta subagrupador",
                           nmsuplem,    "Falta nmsuplem",
                           status,      "Falta status",
                           nmsuplemEnd, "Falta nmsuplem sesi\u00f3n",
                           accion,      "Falta acci\u00f3n");
            
            agrupadoresManager.realizarMovimientoMpoliagr(cdunieco, cdramo, estado, nmpoliza, cdagrupa, nmsuplemEnd, nmsuplem, 
            		params, 
            		accion);
            
            success = true;
            
        } catch (Exception ex) {
            message = Utils.manejaExcepcion(ex);
        }
        logger.debug(StringUtils.join(
                "\n################################",
                "\n###### realizarMovimientoMpoliagr ######"
               ));
        
        return SUCCESS;
    }

	// Getters and setters:
	
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
	public List<BaseVO> getAgrupadores() {
		return agrupadores;
	}
	public void setAgrupadores(List<BaseVO> agrupadores) {
		this.agrupadores = agrupadores;
	}
    
}