package mx.com.segurossura.emision.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface BloqueCoberturasManager {

	List<Map<String, String>> obtieneMpoligar(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_cdgarant_i, String pv_nmsuplem_i, String pv_cdtipsit_i, String perfil) throws Exception;

	void movimientoMpoligar(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_Nmsituac, String Gn_Nmsuplem_Session, String Gv_Cdgarant, String Gn_Cdcapita, Date Gd_Fevencim,
			String Gv_Accion) throws Exception;

	List<Map<String, String>> obtieneTatrigar(String pv_cdramo_i, String pv_cdtipsit_i, String pv_cdgarant_i,
			String pv_cdatribu_i) throws Exception;

	List<Map<String, String>> obtieneTvalogar(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_cdtipsit_i, String pv_nmsuplem_i) throws Exception;

	List<Map<String, String>> obtieneMpolicap(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_cdcapita_i, String pv_nmsuplem_i) throws Exception;

	List<Map<String, String>> guardarCobertura(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i, String pv_nmpoliza_i,
			String pv_nmsituac_i, String pv_cdtipsit_i, String pv_nmsuplem_i, String pv_cdgarant_i,
			String pv_cdcapita_i, List<Map<String, String>> valores, String cdusuari, String cdsisrol) throws Exception;

	void agregaCobertura(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac,
			String nmsuplem,  List<Map<String, String>> lista, String cdusuari, String cdsisrol)throws Exception;

	List<Map<String, String>> obtieneTatrigarTconfscr(String pantalla, String seccion, String modulo, String estatus,String cdsisrol,
			String pv_cdramo_i, String pv_cdtipsit_i, String pv_cdgarant_i, String pv_cdatribu_i) throws Exception;

}
