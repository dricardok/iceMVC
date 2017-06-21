package mx.com.segurossura.emision.service;

import java.util.List;
import java.util.Map;

public interface DatosGeneralesManager {
    
    /**
     * Paso 1. Recupero estado, nmpoliza y valores mpolizas para pantalla (no se inserta nada en BD)
     */
    public Map<String, String> valoresDefectoFijos (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem,
            String swcolind, String nmpolcoi) throws Exception;
    
    /**
     * Paso 2. Inserto mpolizas, ejecuto valores (que deben insertar tvalopol) y retorno esos valores tvalopol
     */
    public Map<String, String> valoresDefectoVariables (String cdusuari, String cdsisrol,
            String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsuplembloque, String nmsuplemsesion, String status) throws Exception;
    
    public Map<String, String> cargar (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem,
            String swcolind, String nmpolcoi) throws Exception;
    
    public List<Map<String, String>> guardar (String cdusuari, String cdsisrol, String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsuplem, Map<String, String> datosPantalla) throws Exception;
}