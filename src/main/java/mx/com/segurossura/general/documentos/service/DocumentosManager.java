package mx.com.segurossura.general.documentos.service;

import java.util.List;
import java.util.Map;

import mx.com.segurossura.general.documentos.model.Archivo;

public interface DocumentosManager {
    public List<Map<String, String>> obtenerDocumentos(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, 
            String ntramite, String cdsisrol, String dsdocume, long start, long limit) throws Exception;
    
    public void movimientoTdocupol() throws Exception;
    
    public Archivo obtenerDocumento(String url, String contentType, String filename) throws Exception;
}
