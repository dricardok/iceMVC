package mx.com.segurossura.general.documentos.dao;

import java.util.List;
import java.util.Map;

public interface DocumentosDAO {
    public List<Map<String, String>> obtenerDocumentos(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, 
            String ntramite, String cdsisrol, String dsdocume, long start, long limit) throws Exception;
    
    public void movimientoTdocupol() throws Exception;
    
    public Map<String, String> obtenerDocumento() throws Exception;
}