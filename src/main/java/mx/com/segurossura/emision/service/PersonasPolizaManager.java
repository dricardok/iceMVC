package mx.com.segurossura.emision.service;

import java.util.List;
import java.util.Map;

public interface PersonasPolizaManager {
	
    /** obtenerMpoliper
	 * Obtiene informacion de tabla mpoliper
	 * el campo nmsituac es opcional
	 * @param cdunieco
	 * @param cdramo
	 * @param estado
	 * @param nmpoliza
	 * @param nmsituac
	 * @param nmsuplem
	 * @return
	 * @throws Exception
	 */
	List<Map<String, String>> obtieneMpoliper(String cdunieco, String cdramo, String estado, String nmpoliza, 
			  								  String nmsituac, String nmsuplem) throws Exception;
	/**movimientoMpoliper
	 * Recibe estructura completa de tabla Mpoliper
	 * Acciones Insertar(I), Borrar(D), Actualizar(U)
	 * @param cdunieco
	 * @param cdramo
	 * @param estado
	 * @param nmpoliza
	 * @param nmsituac
	 * @param cdrol
	 * @param cdperson
	 * @param cdrolNew
	 * @param cdpersonNew
	 * @param nmsuplem_sesion
	 * @param nmsuplem_bloque
	 * @param nmorddom
	 * @param swfallec
	 * @param accion
	 * @throws Exception
	 */
	void movimientoMpoliper(String cdunieco, String cdramo, String estado, String nmpoliza,
               String nmsituac, String cdrol, String cdperson, String cdrolNew, String cdpersonNew, 
               String nmsuplem_sesion, String nmsuplem_bloque, String nmorddom, String swfallec, String accion) throws Exception;
	
	/**obtenerPersonasCriterio
     * Recupera datos de personas por criterio
	 * @param cdunieco
	 * @param cdramo
	 * @param estado
	 * @param nmpoliza
	 * @param cdatribu
	 * @param otvalor
	 * @return
	 * @throws Exception
	 */
	List<Map<String, String>> obtenerPersonasCriterio(String cdunieco, String cdramo, String estado, String nmpoliza, String cdatribu, String otvalor) throws Exception;
}
