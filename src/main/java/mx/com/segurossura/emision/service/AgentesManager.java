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
	
	/**
	 * Obtiene los agentes de un grupo que coincidan con el cdagente solicitado
	 * @param  cdagente Clave de agente solicitada
	 * @param  cdgrupo  Grupo donde se buscarán los agentes
	 * @param  cdptovta Punto de venta
	 * @return Lista de agentes que pertenecen al grupo y que coinciden con la clave de agente
	 * @throws Exception
	 */
	public List<Map<String, String>> buscarAgentesEnGrupo(String cdagente, String cdgrupo, String cdptovta) throws Exception;

	public boolean validaAgente(String cdagente, String cdramo, String cdproceso) throws Exception;
}