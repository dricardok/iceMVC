package mx.com.segurossura.emision.service;

import java.util.List;
import java.util.Map;

public interface DatosGeneralesManager {
    
    /**
     * Paso 1. Recupero estado, nmpoliza y valores mpolizas para pantalla (no se inserta nada en BD)
     */
    public Map<String, String> valoresDefectoFijos (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem,
            String status, String swcolind, String nmpolcoi, String cdusuari, String cdsisrol, String cdptovta, String cdgrupo,
            String cdsubgpo, String cdperfil) throws Exception;
    
    /**
     * Paso 2. Inserto mpolizas, ejecuto valores (que deben insertar tvalopol) y retorno esos valores tvalopol
     */
    public Map<String, String> valoresDefectoVariables (String cdusuari, String cdsisrol,
            String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsuplembloque, String nmsuplemsesion, String status, Map<String, String> datosMpolizasPantalla,
            String cdptovta, String cdgrupo, String cdsubgpo, String cdperfil) throws Exception;
    
    public Map<String, String> cargar (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem,
            String swcolind, String nmpolcoi) throws Exception;
    
    public List<Map<String, String>> guardar (String cdusuari, String cdsisrol, String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsuplem, Map<String, String> datosPantalla) throws Exception;
    
    /**
     * Obtiene informacion de coaseguro cedido
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> obtenerCoaseguroCedido(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
    
    /**
     * Obtiene modelo de coaseguro
     * 
     * @param cdmodelo
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> obtenerModeloCoaseguro(String cdmodelo) throws Exception;
    
    /**
     * Movimiento coaseguro Cedido y Cedido parcial
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem_bloque
     * @param nmsuplem_session
     * @param cdtipcoa
     * @param status
     * @param swabrido
     * @param cdmodelo
     * @param swpagcom
     * @param cias
     * @param accion
     * @throws Exception
     */
    public void movimientoMpolicoa(String cdunieco, String cdramo, String estado, String nmpoliza, 
            String nmsuplem_bloque, String nmsuplem_session, String cdtipcoa, String status, 
            String cdmodelo, String swpagcom, List<Map<String, String>> cias, String accion) throws Exception;
    
    /**
     * Movimiento de tabla de coaseguro aceptado
     * 
     * @param cdcialider
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmpolizal
     * @param nmsuplem_bloque
     * @param nmsuplem_session
     * @param tipodocu
     * @param ndoclider
     * @param status
     * @param accion
     * @throws Exception
     */
    public void movimientoMsupcoa(String cdcialider, String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmpolizal, String nmsuplem_bloque, String nmsuplem_session, String tipodocu, String ndoclider, 
            String status, String accion) throws Exception;
    
    /**
     * Obtiene coaseguro aceptado
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> obtenerCoaseguroAceptado(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
    
    /**
     * Elimina tablas de coaseguro
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @throws Exception
     */
    public void eliminaCoaseguro(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
    
    /**
     * Actualiza switch de coaseguro cedido
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @param cdesqcoa
     * @throws Exception
     */
    public void actualizaSwitchCoaseguroCedido(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, Map<String, String> cdesqcoa) throws Exception;
    
    /**
     * Obtiene situaciones excluidas de coaseguro cedido parcial
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsituac
     * @param nmsuplem
     * @throws Exception
     */
    public List<Map<String, String>> obtenerExclusionesSituacCoaCedParc(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem) throws Exception;
    
    public List<Map<String, String>> obtenerExclusionesCoberCoaCedParc(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String cdgarant, String nmsuplem) throws Exception;
    
    public String obtenerCoaseguroPoliza(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
    
    public void movimientoExclusionesSituacCoaCedParc(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem, String accion) throws Exception;
    
    public void movimientoExclusionesCoberCoaCedParc(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String cdgarant, String nmsuplem, String accion) throws Exception;
}