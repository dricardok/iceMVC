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
            String cdunieco = params.get("cdunieco");
            String cdramo   = params.get("cdramo");
            String estado   = params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            String cdagrupa = params.get("cdagrupa");
            String nmsuplem_sesion = params.get("nmsuplem_sesion");
            String nmsuplem_bloque = params.get("nmsuplem_bloque");
            String cdperson = params.get("cdperson");
            String nmorddom = params.get("nmorddom");
            String cdforpag = params.get("cdforpag");
            String cdbanco  = params.get("cdbanco");
            String cdsucurs = params.get("cdsucurs");
            String cdcuenta = params.get("cdcuenta");
            String cdrazon  = params.get("cdrazon");
            String swregula = params.get("swregula");
            String cdperreg = params.get("cdperreg");
            String feultreg = params.get("feultreg");
            String cdgestor = params.get("cdgestor");
            String cdtipred = params.get("cdtipred");
            String fevencim = params.get("fevencim");
            String cdtarcre = params.get("cdtarcre");
            String nmcuota  = params.get("nmcuota");
            String nmporcen = params.get("nmporcen");
            String accion   = params.get("accion");
            
            Utils.validate(cdunieco, "No se recibio la oficina");
            Utils.validate(cdramo, "No se recibio el ramo");
            Utils.validate(estado, "No se recibo el estado de la póliza");
            Utils.validate(nmpoliza, "No se recibio el número de póliza");
            
            Utils.validate(cdagrupa, "No se recibio cdagrupa");
            Utils.validate(nmsuplem_sesion, "No se recibio nmsuplem_sesion");
            Utils.validate(nmsuplem_bloque, "No se recibio nmsuplem_bloque");
            Utils.validate(cdperson, "No se recibio cdperson");
            Utils.validate(nmorddom, "No se recibio nmorddom");
            Utils.validate(cdforpag, "No se recibio cdforpag");
            Utils.validate(cdbanco, "No se recibio cdbanco");
            Utils.validate(cdsucurs, "No se recibio cdsucurs");
            Utils.validate(cdcuenta, "No se recibio cdcuenta");
            Utils.validate(cdrazon, "No se recibio cdrazon");
            Utils.validate(swregula, "No se recibio swregula");
            Utils.validate(cdperreg, "No se recibio cdperreg");
            Utils.validate(feultreg, "No se recibio feultreg");
            Utils.validate(cdgestor, "No se recibio cdgestor");
            Utils.validate(cdtipred, "No se recibio cdtipred");
            Utils.validate(fevencim, "No se recibio fevencim");
            Utils.validate(cdtarcre, "No se recibio cdtarcre");
            Utils.validate(nmcuota, "No se recibio nmcuota");
            Utils.validate(nmporcen, "No se recibio nmporcen");
            Utils.validate(accion, "No se recibio accion");
            
            agrupadoresManager.realizarMovimientoMpoliagr(cdunieco, cdramo, estado, nmpoliza, cdagrupa, nmsuplem_sesion, nmsuplem_bloque, 
            		
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