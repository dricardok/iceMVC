package mx.com.segurossura.emision.service;

import java.util.List;
import java.util.Map;

public interface SituacionManager {
	
	void movimientoMpolisit(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_Nmsituac, String Gn_Nmsuplem_Sesion, String Gn_Nmsuplem_Bean, String Gv_Status,
			String Gv_Cdtipsit, String Gv_Swreduci, String Gn_Cdagrupa, String Gn_Cdestado, String Gf_Fefecsit,
			String Gf_Fecharef, String Gv_Indparbe, String Gf_Feinipbs, String Gn_Porparbe, String Gn_Intfinan,
			String Gn_Cdmotanu, String Gf_Feinisus, String Gf_Fefinsus, String Gv_Accion) throws Exception;

	void movimientoTvalosit(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_Nmsituac, String Gv_Cdtipsit, String Gn_Cdatribu, String Gn_Nmsuplem, String Gv_Otvalor,
			String Gv_Accion) throws Exception;

	List<Map<String, String>> obtieneTvalosit(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_cdtipsit_i, String pv_nmsuplem_i) throws Exception;

	List<Map<String, String>> obtieneMpolisit(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_nmsuplem_i) throws Exception;

	String obtieneNmsituac(String cdunieco, String cdramo, String estado, String nmpoliza) throws Exception;
	
	void borraEstructuraSituacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac) throws Exception;
}