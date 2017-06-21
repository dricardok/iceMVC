package mx.com.segurossura.emision.dao;

import java.util.List;
import java.util.Map;

public interface RegistoPersonaDAO {

	List<Map<String, String>> lovCdpost(String pv_cdcodpos_i, String pv_cdprovin_i, String pv_cdmunici_i, String pv_cdciudad_i)
			throws Exception;

}
