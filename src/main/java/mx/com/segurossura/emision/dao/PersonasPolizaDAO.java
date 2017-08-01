package mx.com.segurossura.emision.dao;

import java.util.List;
import java.util.Map;

public interface PersonasPolizaDAO {
	
	List<Map<String, String>> obtenerMpoliper(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i, String pv_nmpoliza_i, 
											  String pv_nmsituac_i, String pv_nmsuplem_i) throws Exception;
	
	void movimientoMpoliper(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, 
            String cdrol, String cdperson, String cdrolNew, String cdpersonNew, String nmsuplem_sesion, String nmsuplem_bloque, 
            String nmorddom, String swfallec, String accion) throws Exception;
	
	List<Map<String, String>> obtenerPersonasCriterio(String cdunieco, String cdramo, String estado, String nmpoliza, String cdatribu, String otvalor) throws Exception;
	
	public void clonarTomadorParaAseguradoYAgrupador (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
}
