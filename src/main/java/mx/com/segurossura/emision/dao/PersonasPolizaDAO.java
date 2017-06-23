package mx.com.segurossura.emision.dao;

import java.util.List;
import java.util.Map;

public interface PersonasPolizaDAO {
	
	List<Map<String, String>> obtenerMpoliper(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i, String pv_nmpoliza_i, 
											  String pv_nmsituac_i, String pv_nmsuplem_i) throws Exception;
	
	void movimientoMpoliper(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i, String pv_nmpoliza_i, String pv_nmsituac_i, String pv_cdrol_i, String pv_cdperson_i, String pv_nmsuplem_sesion_i, String pv_nmsuplem_bloque_i, String pv_nmorddom_i, String pv_swfallec_i, String pv_accion_i) throws Exception;
	
	List<Map<String, String>> obtenerPersonasCriterio(String cdunieco, String cdramo, String estado, String nmpoliza, String cdatribu, String otvalor) throws Exception;
}
