package mx.com.segurossura.general.documentos.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface DocumentosDAO {
    public List<Map<String, String>> obtenerDocumentos(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, 
            String ntramite, String cdsisrol, String dsdocume, long start, long limit) throws Exception;
    
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
            String ntramite, Date feinici, String cddocume, String dsdocume, String tipmov, String swvisible, String cdtiptra,
            String codidocu, Date fefecha, String cdorddoc, String cdmoddoc, String nmcertif, String nmsituac, String url, String accion) 
    throws Exception;
    
}