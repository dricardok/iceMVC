package mx.com.segurossura.general.documentos.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface DocumentosDAO {
    /**
     * Se obtienen lista documentos de poliza
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @param ntramite
     * @param cdsisrol
     * @param dsdocume
     * @param cdtipdoc
     * @param start
     * @param limit
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> obtenerDocumentos(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, 
            String ntramite, String cdsisrol, String dsdocume, String cdtipdoc, long start, long limit) throws Exception;
    
    public void movimientoTdocupol() throws Exception;
    
    public Map<String, String> obtenerDocumento() throws Exception;
    
    /**
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsolici
     * @param nmsuplem
     * @param ntramite
     * @param feinici
     * @param cddocume
     * @param dsdocume
     * @param tipmov
     * @param swvisible
     * @param cdtiptra
     * @param codidocu
     * @param fefecha
     * @param cdorddoc
     * @param cdmoddoc
     * @param nmcertif
     * @param nmsituac
     * @param url
     * @param accion
     * @throws Exception
     */
    public void realizarMovimientoDocsPoliza(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsolici, String nmsuplem,
            String ntramite, Date fefecha, String cddocume, String dsdocume, String cdtipsup, String swvisible, String cdtiptra,
            String codidocu, String cdorddoc, String cdmoddoc, String nmcertif, String nmsituac, String url, String ruta, String cdtipodoc, String accion) 
    throws Exception;
    
    /**
     * Recupera el campo dsdocume de tdocupol
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @param cddocume
     * @return
     * @throws Exception
     */
    public String ObtenerDescripcionDocumento(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, String cddocume) throws Exception;
}