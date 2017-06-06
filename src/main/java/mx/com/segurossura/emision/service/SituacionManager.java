package mx.com.segurossura.emision.service;

import java.util.List;
import java.util.Map;

public interface SituacionManager {
    
    Map<String, String> obtenerSituacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String cdtipsit, String nmsuplem) throws Exception;
    
    Map<String, String> valoresDefectoFijos (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
    
    Map<String, String> valoresDefectoVariables (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, 
            String nmsuplem, String status, String cdtipsit, String swreduci, String cdagrupa, String cdestado, String fefecsit, 
            String fecharef, String indparbe, String feinipbs, String porparbe, String intfinan, String cdmotanu, String feinisus, 
            String fefinsus) throws Exception;
    
    void valoresDefectoCoberturas (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem) throws Exception;
    
	void movimientoMpolisit(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsituac, String nmsuplem_Sesion, String nmsuplem_Bean, String status,
			String cdtipsit, String swreduci, String cdagrupa, String cdestado, String fefecsit,
			String fecharef, String indparbe, String feinipbs, String porparbe, String intfinan,
			String cdmotanu, String feinisus, String fefinsus, String accion) throws Exception;

	void movimientoTvalosit(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsituac, String cdtipsit, String status, String nmsuplem, Map<String,String> situacion,
			String accion) throws Exception;

	List<Map<String, String>> obtieneTvalosit(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_cdtipsit_i, String pv_nmsuplem_i) throws Exception;

	List<Map<String, String>> obtieneMpolisit(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_nmsuplem_i) throws Exception;

	String obtieneNmsituac(String cdunieco, String cdramo, String estado, String nmpoliza) throws Exception;
	
	void borraEstructuraSituacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac) throws Exception;
	
	List<Map<String, String>> obtenerListaSituaciones(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem) throws Exception;
	
	List<Map<String, String>> actualizaSituacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, 
            String nmsuplem, String status, String cdtipsit, String swreduci, String cdagrupa, String cdestado, String fefecsit, 
            String fecharef, String indparbe, String feinipbs, String porparbe, String intfinan, String cdmotanu, String feinisus, 
            String fefinsus, Map<String, String> valores) throws Exception;
	
	List<Map<String, String>> validaBloqueSituacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
}