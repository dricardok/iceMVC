package mx.com.segurossura.emision.service;

import java.util.List;
import java.util.Map;

public interface AgentesManager {

	public Map<String, String> cargar (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
	
	public List<Map<String, String>> cargarAgentes(String cdunieco, String cdramo, String estado, String nmpoliza, String cdagente, String nmsuplem)
			throws Exception;
	
	public List<Map<String, String>> guardarAgentes(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem,
			String nmcuadro, String porredau, List<Map<String, String>> agentes, String cdusuari, String cdsisrol)
			throws Exception;
	
	public List<Map<String, String>> buscarAgentes(String clave, String atributo) throws Exception;	
	
	public boolean validaAgente(String cdagente, String cdramo, String cdproceso) throws Exception;
}