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
	
	/**
	 * Devuelve la lista de agentes que pertenezcan al grupo de la poliza y que coincidan con la clave de agente solicitada
	 * 
	 * @param cdagente Clave de agente solicitada
	 * @param cdunieco Sucursal de la poliza
	 * @param cdramo   Ramo de al poliza
	 * @param estado   Estado de la poliza
	 * @param nmpoliza Numero de poliza
	 * @param nmsuplem Suplemento fisico de la poliza
	 * @return Lista de agentes pertenecientes al grupo de la poliza y que coinciden con la clave de agente dada
	 * @throws Exception
	 */
	public List<Map<String, String>> buscarAgentesEnGrupo(String cdagente, String cdunieco, String cdramo, String estado,
			String nmpoliza, String nmsuplem) throws Exception;

	public boolean validaAgente(String cdagente, String cdramo, String cdproceso) throws Exception;
	
}