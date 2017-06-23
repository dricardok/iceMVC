package mx.com.segurossura.emision.dao;

import java.util.List;
import java.util.Map;

public interface AgentesDAO {
    
	public List<Map<String,String>> obtieneMpoliage(String cdunieco, String cdramo, String estado,
            String nmpoliza, String cdagente, String nmsuplem) throws Exception;
	
	void movimientoMpoliage(String cdunieco, String cdramo, String estado, String nmpoliza,
			String cdagente, String nmsuplem_session, String nmsuplem_bloque, String cdtipoag,
			String porredau, String accion) throws Exception;
	
	public List<Map<String,String>> buscarAgentes(String clave, String atributo) throws Exception;

	public boolean validaAgente(String cdagente, String cdramo, String cdproceso) throws Exception;
	
}