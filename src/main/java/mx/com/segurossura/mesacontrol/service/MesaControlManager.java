package mx.com.segurossura.mesacontrol.service;

import java.util.List;
import java.util.Map;
import java.util.Date;

public interface MesaControlManager {
	
	List<Map<String, String>> obtenerTramites(String cdunieco, String cdramo, String estado, String nmpoliza, 
			String cdagente, String ntramite, String estatus, Date desde, Date hasta, String nombre, String nmsolici) throws Exception;
}
