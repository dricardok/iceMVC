package mx.com.segurossura.emision.dao;

import java.util.List;
import java.util.Map;

public interface AgentesDAO {
    
	/**
	 * Obtiene los agentes de la poliza
	 * @param cdunieco Sucursal de la poliza
	 * @param cdramo   Ramo de la poliza
	 * @param estado   Estado de la poliza
	 * @param nmpoliza Numero de poliza
	 * @param cdagente Clave de agente
	 * @param nmsuplem Numero de suplemento de la poliza
	 * @return Lista de agentes de la poliza
	 * @throws Exception
	 */
	public List<Map<String,String>> obtieneMpoliage(String cdunieco, String cdramo, String estado,
            String nmpoliza, String cdagente, String nmsuplem) throws Exception;
	
	/**
	 * Realiza un movimiento a los agentes de la poliza (agregar, actualizar, eliminar)
	 * @param cdunieco
	 * @param cdramo
	 * @param estado
	 * @param nmpoliza
	 * @param cdagente
	 * @param nmsuplem_session
	 * @param nmsuplem_bloque
	 * @param cdtipoag
	 * @param porredau
	 * @param accion
	 * @throws Exception
	 */
	void movimientoMpoliage(String cdunieco, String cdramo, String estado, String nmpoliza,
			String cdagente, String nmsuplem_session, String nmsuplem_bloque, String cdtipoag,
			String porredau, String accion) throws Exception;
	
	/**
	 * Obtiene agentes de acuerdo al criterio de busqueda enviado en la clase 
	 * @param clave Criterio de busqueda 
	 * @param atributo Cadena con la que se buscara agentes
	 * @return Lista de agentes
	 * @throws Exception
	 */
	public List<Map<String,String>> buscarAgentes(String clave, String atributo) throws Exception;
	
	/**
	 * Obtiene los agentes de un grupo que coincidan con el cdagente solicitado
	 * @param  cdagente Clave de agente solicitada
	 * @param  cdgrupo  Grupo donde se buscarán los agentes
	 * @param  cdptovta Punto de venta
	 * @return Lista de agentes que pertenecen al grupo y que coinciden con la clave de agente
	 * @throws Exception
	 */
	public List<Map<String, String>> buscarAgentesEnGrupo(String cdagente, String cdgrupo, String cdptovta) throws Exception;
	
	
	/**
	 * 
	 * @param cdagente
	 * @param cdramo
	 * @param cdproceso
	 * @return
	 * @throws Exception
	 */
	public boolean validaAgente(String cdagente, String cdramo, String cdproceso) throws Exception;
	
	/**
	 * Valida que el cuadro de comision del agente sea el mismo que el del agente principal
	 * @param cdunieco Sucursal
	 * @param cdramo   Ramo de la poliza
	 * @param estado   Estado de la poliza
	 * @param nmpoliza Numero de poliza
	 * @param nmsuplem Suplemento de la poliza
	 * @param cdagente Clave de agente
	 * @return true si el cuadro de comision del agente es el mismo que el del agente principal en la poliza, false si no lo es
	 * @throws Exception
	 */
	public boolean validarCuadroComisionAgentePorPoliza(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsuplem, String cdagente) throws Exception;
	
}