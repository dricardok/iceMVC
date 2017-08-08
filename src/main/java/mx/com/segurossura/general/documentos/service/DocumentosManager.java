package mx.com.segurossura.general.documentos.service;

import java.util.List;
import java.util.Map;

import mx.com.segurossura.general.documentos.model.Archivo;

public interface DocumentosManager {
    
    /**
     * Obtiene lista de documentos de poliza
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @param ntramite
     * @param cdsisrol
     * @param dsdocume
     * @param start
     * @param limit
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> obtenerDocumentos(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, 
            String ntramite, String cdsisrol, String dsdocume, String cdtipdoc, long start, long limit) throws Exception;
    
    public void movimientoTdocupol() throws Exception;
    
    /**
     * Obtiene el documento de la liga
     * 
     * @param url
     * @param contentType
     * @param filename
     * @return
     * @throws Exception
     */
    public Archivo obtenerDocumento(String url, String filename) throws Exception;

    /**
     * Se recupera el archivo de ruta del servidor
     * 
     * @param url
     * @param ruta
     * @param contentType
     * @param filename
     * @return
     * @throws Exception
     */
    public Archivo obtenerDocumento(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem,
            String url, String ruta, String filename, String cddocume) throws Exception;
}
