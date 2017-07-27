package mx.com.segurossura.emision.service;

import java.util.List;
import java.util.Map;

public interface SituacionManager {
    
    public Map<String, String> obtenerSituacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String cdtipsit, String nmsuplem) throws Exception;
    
    public Map<String, String> valoresDefectoFijos (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem,
            String cdusuari, String cdsisrol) throws Exception;
    
    public Map<String, String> valoresDefectoVariables (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, 
            String nmsuplem, String status, Map<String, String> datos, String cdusuari, String cdsisrol) throws Exception;
    
    public void valoresDefectoCoberturas (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem,
            String cdusuari, String cdsisrol) throws Exception;
    
	public void movimientoMpolisit(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsituac, String nmsuplemEnd, String nmsuplem, String status, Map<String, String> datos,
			String accion) throws Exception;

	public void movimientoTvalosit(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsituac, String cdtipsit, String status, String nmsuplem, Map<String,String> situacion,
			String accion) throws Exception;

	public List<Map<String, String>> obtieneTvalosit(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_cdtipsit_i, String pv_nmsuplem_i) throws Exception;

	public List<Map<String, String>> obtieneMpolisit(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_nmsuplem_i) throws Exception;

	public String obtieneNmsituac(String cdunieco, String cdramo, String estado, String nmpoliza) throws Exception;
	
	public void borraEstructuraSituacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac) throws Exception;
	
	public List<Map<String, String>> obtenerListaSituaciones(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem) throws Exception;
	
	public List<Map<String, String>> actualizaSituacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, 
            String nmsuplem, String status, Map<String, String> datos, String cdusuari, String cdsisrol) throws Exception;
	
	public List<Map<String, String>> validaBloqueSituacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem,
	        String cdusuari, String cdsisrol) throws Exception;
	
	public void copiaSituacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem, String nmcopias) throws Exception;
}