package mx.com.segurossura.emision.service;

import java.util.List;
import java.util.Map;

public interface RegistroPersonaManager {

	List<Map<String, String>> lovCdpost(String pv_cdcodpos_i, String pv_cdprovin_i, String pv_cdmunici_i,
			String pv_cdciudad_i) throws Exception;

}
