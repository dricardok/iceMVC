package mx.com.segurossura.mesacontrol.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface MesaControlDAO {
	
	public List<Map<String, String>> obtenerTramites(String cdunieco, String cdramo, String estado, String nmpoliza, 
			String cdagente, String ntramite, String estatus, Date desde, Date hasta, String nombre, String nmsolici, long start, long limit) throws Exception;
}
