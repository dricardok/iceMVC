package mx.com.segurossura.emision.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.biosnettcs.core.Utils;
import com.biosnettcs.portal.controller.PrincipalCoreAction;

import mx.com.segurossura.emision.service.SituacionManager;

@Controller
@Scope("prototype")
@ParentPackage(value="json-default")
@Namespace("/emision")
public class SituacionAction extends PrincipalCoreAction {

	/**
     * 
     */
    private static final long serialVersionUID = 1L;
    private Map<String, String> params;
	private boolean            success;
	private String             message;
	private List<Map<String, String>> situaciones;
	private List<Map<String, String>> validaciones;
	private Map<String, String> situacion;
	private Map<String, List<Map<String, String>>> componentes;
	
	@Autowired
	private SituacionManager situacionManager;	
	
	@Action(
            value = "obteneListaSituaciones", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String obteneListaSituaciones(){
        logger.debug(StringUtils.join(
                 "\n################################",
                 "\n###### obteneListaSituaciones ######",
                 "\n###### params ", params
                ));
        try{
            Utils.validate(params, "No se recibieron parametros de entrada");
            String cdunieco = (String) params.get("cdunieco");
            String cdramo = (String) params.get("cdramo");
            String estado = (String) params.get("estado");
            String nmpoliza = (String) params.get("nmpoliza");
            String nmsituac = (String) params.get("nmsituac");
            String nmsuplem = (String) params.get("nmsuplem");
            Utils.validate(cdunieco, "No se recibio oficina");
            Utils.validate(cdramo, "No se recibio producto");
            Utils.validate(estado, "No se recibio el estado de la póliza");
            Utils.validate(nmpoliza, "No se recibio el numero de póliza");
//            Utils.validate(nmsituac, "No se recibio la situacion de riesgo");
            Utils.validate(nmsuplem, "No se recibio el suplemento");            
            situaciones = situacionManager.obtenerListaSituaciones(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem);
            success = true;
        } catch (Exception ex) {
            Utils.manejaExcepcion(ex);
        }
        logger.debug(StringUtils.join(
                "\n###### situaciones ", situaciones,
                "\n###### obteneListaSituaciones ######",
                "\n################################"                
               ));
        return SUCCESS;
    }
	
	@Action(
            value = "obtenerSituacion", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String obtenerSituacion(){
        logger.debug(StringUtils.join(
                 "\n################################",
                 "\n###### obtenerSituaciones ######",
                 "\n###### params ", params
                ));
        try{
            Utils.validate(params, "No se recibieron parametros de entrada");
            String cdunieco = (String) params.get("cdunieco");
            String cdramo = (String) params.get("cdramo");
            String estado = (String) params.get("estado");
            String nmpoliza = (String) params.get("nmpoliza");
            String nmsituac = (String) params.get("nmsituac");
            String cdtipsit = (String) params.get("cdtipsit");
            String nmsuplem = (String) params.get("nmsuplem");
            Utils.validate(cdunieco, "No se recibio oficina");
            Utils.validate(cdramo, "No se recibio producto");
            Utils.validate(estado, "No se recibio el estado de la póliza");
            Utils.validate(nmpoliza, "No se recibio el numero de póliza");
            Utils.validate(nmsituac, "No se recibio la situacion de riesgo");
            Utils.validate(cdtipsit, "No se recibio el tipo de situacion");
            Utils.validate(nmsuplem, "No se recibio el suplemento");            
            situacion = situacionManager.obtenerSituacion(cdunieco, cdramo, estado, nmpoliza, nmsituac, cdtipsit, nmsuplem);
            success = true;
        } catch (Exception ex) {
            Utils.manejaExcepcion(ex);
        }
        logger.debug(StringUtils.join(
                "\n###### situacion ", situacion,
                "\n###### obtenerSituaciones ######",
                "\n################################"                
               ));
        return SUCCESS;
	}
	
	@Action(
            value = "valoresDefectoFijos", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String valoresDefectoFijos(){
        logger.debug(Utils.log("###### valoresDefectoFijos", 
                               "###### params ", params));
        try {
            Utils.validate(params, "No se recibieron parametros");
            String cdunieco = params.get("cdunieco");
            String cdramo = params.get("cdramo");
            String estado = params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            String nmsuplem = params.get("nmsuplem");
            Utils.validate(cdunieco, "No se recibio oficina");
            Utils.validate(cdramo, "No se recibio producto");
            Utils.validate(estado, "No se recibio el estado de la póliza");
            Utils.validate(nmpoliza, "No se recibio el numero de póliza");
            Utils.validate(nmsuplem, "No se recibio el suplemento");  
            situacion = situacionManager.valoresDefectoFijos(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
            success = true;
        } catch (Exception ex) {
            message = Utils.manejaExcepcion(ex);
        }
        logger.debug(StringUtils.join(
                "\n###### situacion ", situacion,
                "\n###### valoresDefectoFijos ######",
                "\n################################"                
               ));
        return SUCCESS;
    }
	
	@Action(
	        value = "valoresDefectoVariables", 
	        results = { 
	                @Result(name = "success", type = "json") 
	                }
	        )
	public String valoresDefectoVariables(){
	    logger.debug(Utils.log("###### valoresDefectoVariables", 
	                           "###### params ", params));
	    try {
	        Utils.validate(params, "No se recibieron parametros");
	        String cdunieco = params.get("cdunieco");
	        String cdramo = params.get("cdramo");
	        String estado = params.get("estado");
	        String nmpoliza = params.get("nmpoliza");
	        String nmsituac = params.get("nmsituac");
	        String nmsuplem = params.get("nmsuplem");
	        String cdtipsit = params.get("cdtipsit");
            String status   = params.get("status");
            String swreduci = params.get("swreduci");
            String cdagrupa = params.get("cdagrupa");
            String cdestado = params.get("cdestado");
            String fefecsit = params.get("fefecsit");
            String fecharef = params.get("fecharef");
            String indparbe = params.get("indparbe");
            String feinipbs = params.get("feinipbs");
            String porparbe = params.get("porparbe");
            String intfinan = params.get("intfinan");
            String cdmotanu = params.get("cdmotanu");
            String feinisus = params.get("feinisus");
            String fefinsus = params.get("fefinsus");
	        Utils.validate(cdunieco, "No se recibio oficina");
	        Utils.validate(cdramo, "No se recibio producto");
	        Utils.validate(estado, "No se recibio el estado de la póliza");
	        Utils.validate(nmpoliza, "No se recibio el numero de póliza");
	        Utils.validate(nmsituac, "No se recibio la situacion de riesgo");
	        Utils.validate(nmsuplem, "No se recibio el suplemento");
	        Utils.validate(fefecsit, "No se recibio fecha de efecto de situacion");
	        Utils.validate(cdtipsit, "No se recibio tipo de situacion");
	        Utils.validate(cdestado, "No se recibio el codigo de estado");
	        Utils.validate(cdagrupa, "No se recibo el numero de agrupador");
	        situacion = situacionManager.valoresDefectoVariables(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, status, cdtipsit, swreduci, cdagrupa, cdestado, fefecsit, fecharef, indparbe, feinipbs, porparbe, intfinan, cdmotanu, feinisus, fefinsus);
	        success = true;
	    } catch (Exception ex) {
	        message = Utils.manejaExcepcion(ex);
	    }
	    logger.debug(StringUtils.join(
	            "\n###### situacion ", situacion,
	            "\n###### valoresDefectoVariables ######",
	            "\n################################"                
	            ));
	    return SUCCESS;
	}
	
    @Action(
            value = "eliminarSituacion", 
            results = { 
                @Result(name = "success", type = "json")
                }
            )
    public String eliminarSituacion(){
        logger.debug(Utils.log("###### eliminarSituacion", 
                "###### params ", params));
        try {
            Utils.validate(params, "No se recibieron parametros");
            String cdunieco = (String) params.get("cdunieco");
            String cdramo = (String) params.get("cdramo");
            String estado = (String) params.get("estado");
            String nmpoliza = (String) params.get("nmpoliza");
            String nmsituac = (String) params.get("nmsituac");
            String nmsuplem = (String) params.get("nmsuplem");
            Utils.validate(cdunieco, "No se recibio oficina");
            Utils.validate(cdramo, "No se recibio producto");
            Utils.validate(estado, "No se recibio el estado de la póliza");
            Utils.validate(nmpoliza, "No se recibio el numero de póliza");
            Utils.validate(nmsituac, "No se recibio la situacion de riesgo");
            Utils.validate(nmsuplem, "No se recibio el suplemento");  
            situacionManager.borraEstructuraSituacion(cdunieco, cdramo, estado, nmpoliza, nmsituac);
            success = true;
        } catch (Exception ex) {
            message = Utils.manejaExcepcion(ex);
        }
        logger.debug(StringUtils.join(
                "\n###### eliminarSituacion ######",
                "\n################################"
                ));
        return SUCCESS;
    }
	   
	@Action(
	        value = "movimientoMpolisit", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )
	public String movimientoMpolisit(){
		logger.debug(StringUtils.join(
				 "\n###################",
				 "\n###### movimientoMpolisit ######",
				 "\n###### params ", params
				));
		try{
			Utils.validate(params, "No se recibieron datos");
			String cdunieco = (String) params.get("cdunieco");
			String cdramo = (String) params.get("cdramo");
			String estado = (String) params.get("estado");
			String nmpoliza = (String) params.get("nmpoliza");
			String nmsituac = (String) params.get("nmsituac");
			String nmsuplem	= (String) params.get("nmsuplem");
			String nmsuplem_bean = (String) params.get("nmsuplem_Bean");
			String status = (String) params.get("status");
			String cdtipsit = (String) params.get("cdtipsit");
			String swreduci = (String) params.get("swreduci");
			String cdagrupa = (String) params.get("cdagrupa");
			String cdestado = (String) params.get("cdestado");
			String fefecsit = (String) params.get("fefecsit");
			String fecharef = (String) params.get("fecharef");
			String indparbe = (String) params.get("indparbe");
			String feinipbs = (String) params.get("feinipbs");
			String porparbe = (String) params.get("porparbe");
			String intfinan = (String) params.get("intfinan");
			String cdmotanu = (String) params.get("cdmotanu");
			String feinisus = (String) params.get("feinisus");
			String fefinsus = (String) params.get("fefinsus");
			String accion = (String) params.get("accion");
            Utils.validate(cdunieco, "No se recibio la oficina");
            Utils.validate(cdramo, "No se recibio el producto");
            Utils.validate(estado, "No se recibio el estado de la póliza");
            Utils.validate(nmpoliza, "No se recibio el numero de póliza");
            Utils.validate(nmsituac, "No se recibio la situacion de riesgo");
            Utils.validate(nmsuplem, "No se recibio el suplemento");
            Utils.validate(accion, "No se recibio la accion");
			situacionManager.movimientoMpolisit(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, nmsuplem_bean, status, cdtipsit, swreduci, cdagrupa, cdestado, fefecsit, fecharef, indparbe, feinipbs, porparbe, intfinan, cdmotanu, feinisus, fefinsus, accion);
			success = true;
		} catch(Exception ex) {
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### movimientoMpolisit ######",
				 "\n###################"
				));
		return SUCCESS;
	}
	
	@Action(		
	        value = "obtieneTvalosit", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String obtieneTvalosit(){
		logger.debug(StringUtils.join(
				 "\n###################",
				 "\n###### obtieneTvalosit ######",
				 "\n###### params ",params
				));
		try{
			Utils.validate(params, "No se recibieron datos");
			String cdunieco = (String) params.get("cdunieco");
			String cdramo = (String) params.get("cdramo");
			String estado = (String) params.get("estado");
			String nmpoliza = (String) params.get("nmpoliza");
			String nmsituac = (String) params.get("nmsituac");
			String cdtipsit = (String) params.get("cdtipsit");
			String nmsuplem = (String) params.get("nmsuplem");
			Utils.validate(cdunieco, "No se recibio oficina");
            Utils.validate(cdramo, "No se recibio el producto");
            Utils.validate(estado, "No se recibio el estado de la póliza");
            Utils.validate(nmpoliza, "No se recibio el numero de la póliza");
            Utils.validate(nmsituac, "No se recibio la situacion de riesgo");
            Utils.validate(nmsuplem, "No se recibio el suplemento");
            Utils.validate(cdtipsit, "No se recibio el tipo de situacion");
			situaciones = situacionManager.obtieneTvalosit(cdunieco, cdramo, estado, nmpoliza, nmsituac, cdtipsit, nmsuplem);
			success = true;
		} catch(Exception ex) {
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		logger.debug(StringUtils.join(
				 "\n###### obtieneTvalosit ######"
				,"\n###################"
				));
		return SUCCESS;
	}
				
	@Action(
	        value = "obtieneMpolisit", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String obtieneMpolisit(){
		logger.debug(StringUtils.join(
				 "\n###################",
				 "\n###### obtieneMpolisit ######",
				 "\n###### params ",params
				));		
		try{			
			Utils.validate(params, "No se recibieron datos");			
			String pv_cdunieco_i= (String) params.get("cdunieco");
			String pv_cdramo_i= (String) params.get("cdramo");
			String pv_estado_i= (String) params.get("estado");
			String pv_nmpoliza_i= (String) params.get("nmpoliza");
			String pv_nmsituac_i= (String) params.get("nmsituac");
			String pv_nmsuplem_i= (String) params.get("nmsuplem");
            Utils.validate(pv_cdunieco_i, "No se recibio oficina");
            Utils.validate(pv_cdramo_i, "No se recibio producto");
            Utils.validate(pv_estado_i, "No se recibio estado de la póliza");
            Utils.validate(pv_nmpoliza_i, "No se recibio el numero de póliza");
            Utils.validate(pv_nmsuplem_i, "No se recibio sumplemento");
			situaciones = situacionManager.obtieneMpolisit(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_nmsuplem_i);			
			success = true;
		} catch(Exception ex) {
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		logger.debug(StringUtils.join(
				 "\n###### obtieneMpolisit ######",
				 "\n###### situaciones ",situaciones,
				 "\n#############################"
				));
		return SUCCESS;
	}
	
	@Action(value = "actualizaSituacion", 
	        results = { 
	                @Result(name = "success", type = "json") 
	                }, 
	        interceptorRefs = {
	                @InterceptorRef(value = "json", 
	                        params = { "enableSMD", "true", "ignoreSMDMethodInterfaces", "false" }
	                )}
	)
    public String actualizaSituacion(){
        logger.debug(StringUtils.join(
                 "\n###################",
                 "\n###### actualizaSituacion ######",
                 "\n###### params ",params,
                 "\n###### situacion ",situacion
                ));     
        try{
            Utils.validate(params, "No se recibieron parametros");
            String cdunieco = (String) params.get("cdunieco");
            String cdramo = (String) params.get("cdramo");
            String estado = (String) params.get("estado");
            String nmpoliza = (String) params.get("nmpoliza");
            String nmsituac = (String) params.get("nmsituac");
            String nmsuplem = (String) params.get("nmsuplem");
            String cdtipsit = (String) params.get("cdtipsit");
            String status   = (String) params.get("status");
            String swreduci = (String) params.get("swreduci");
            String cdagrupa = (String) params.get("cdagrupa");
            String cdestado = (String) params.get("cdestado");
            String fefecsit = (String) params.get("fefecsit");
            String fecharef = (String) params.get("fecharef");
            String indparbe = (String) params.get("indparbe");
            String feinipbs = (String) params.get("feinipbs");
            String porparbe = (String) params.get("porparbe");
            String intfinan = (String) params.get("intfinan");
            String cdmotanu = (String) params.get("cdmotanu");
            String feinisus = (String) params.get("feinisus");
            String fefinsus = (String) params.get("fefinsus");
            Utils.validate(cdunieco, "No se recibio oficina");
            Utils.validate(cdramo, "No se recibio producto");
            Utils.validate(estado, "No se recibio el estado de la póliza");
            Utils.validate(nmpoliza, "No se recibio el numero de póliza");
//            Utils.validate(nmsituac, "No se recibio la situacion de riesgo");
            Utils.validate(nmsuplem, "No se recibio el suplemento");
            validaciones = situacionManager.actualizaSituacion(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, status, cdtipsit, swreduci, cdagrupa, cdestado, fefecsit, fecharef, indparbe, feinipbs, porparbe, intfinan, cdmotanu, feinisus, fefinsus, situacion);           
            success = true;
        } catch(Exception ex) {
            success=false;
            message = Utils.manejaExcepcion(ex);
        }
        logger.debug(StringUtils.join(
                 "\n###### actualizaSituacion ######",
                 "\n#############################"
                ));
        return SUCCESS;
    }
		
	@Action(       
            value = "obtieneNmsituac", 
            results = { 
                @Result(name = "success", type = "json") 
            }                    
        )   
    public String obtieneNmsituac(){
	    logger.debug(StringUtils.join(
                "\n#############################",
               "\n###### obtieneNmsituac ######",
               "\n###### params ",params
               ));
	    try{
	        Utils.validate(params, "No se recibieron parametros");
	        String cdunieco = (String) params.get("cdunieco");
	        String cdramo   = (String) params.get("cdramo");
	        String estado   = (String) params.get("estado");
	        String nmpoliza = (String) params.get("nmpoliza");
	        Utils.validate(cdunieco, "No se recibio oficina");
	        Utils.validate(cdramo, "No se recibio producto");
	        Utils.validate(estado, "No se recibio estado");
	        Utils.validate(nmpoliza, "No se recibio poliza");
	        situacionManager.obtieneNmsituac(cdunieco, cdramo, estado, nmpoliza);
	    } catch(Exception ex) {
	        success = false;
	        Utils.manejaExcepcion(ex);
	    }
	    logger.debug(StringUtils.join(
                "\n###### obtieneNmsituac ######"
               ,"\n#############################"
               ));
	    return SUCCESS;
	}
	
	@Action(       
            value = "validaBloqueSituacion", 
            results = { 
                @Result(name = "success", type = "json") 
            }                    
        )   
    public String validaBloqueSituacion(){
        logger.debug(StringUtils.join(
                "\n#############################",
               "\n###### validaBloqueSituacion ######",
               "\n###### params ",params
               ));
        try{
            Utils.validate(params, "No se recibieron parametros");
            String cdunieco = params.get("cdunieco");
            String cdramo   = params.get("cdramo");
            String estado   = params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            String nmsuplem = params.get("nmsuplem");
            Utils.validate(cdunieco, "No se recibio oficina");
            Utils.validate(cdramo, "No se recibio producto");
            Utils.validate(estado, "No se recibio estado");
            Utils.validate(nmpoliza, "No se recibio poliza");
            validaciones = situacionManager.validaBloqueSituacion(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
            success = true;
        } catch(Exception ex) {
            success = false;
            Utils.manejaExcepcion(ex);
        }
        logger.debug(StringUtils.join(
                "\n###### validaBloqueSituacion ######"
               ,"\n#############################"
               ));
        return SUCCESS;
    }
	
//  Getters y Setters	

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

	public List<Map<String, String>> getSituaciones() {
		return situaciones;
	}

	public void setSituaciones(List<Map<String, String>> slist1) {
		this.situaciones = slist1;
	}

	public Map<String, List<Map<String, String>>> getComponentes() {
		return componentes;
	}

	public void setComponentes(Map<String, List<Map<String, String>>> componentes) {
		this.componentes = componentes;
	}

    public Map<String, String> getSituacion() {
        return situacion;
    }

    public void setSituacion(Map<String, String> situacion) {
        this.situacion = situacion;
    }

    public List<Map<String, String>> getValidaciones() {
        return validaciones;
    }

    public void setValidaciones(List<Map<String, String>> validaciones) {
        this.validaciones = validaciones;
    }
}