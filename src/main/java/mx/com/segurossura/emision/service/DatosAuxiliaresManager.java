package mx.com.segurossura.emision.service;

import java.util.Map;

public interface DatosAuxiliaresManager {
    
    public void guardarDatosAuxiliares (String cdunieco, String cdramo, String estado, String nmpoliza, String cdbloque,
            String nmsituac, String cdgarant, String nmsuplem, String status, Map<String, String> params) throws Exception;
    
    public Map<String, String> cargarDatosAuxiliares (String cdunieco, String cdramo, String estado, String nmpoliza, String cdbloque,
            String nmsituac, String cdgarant, String nmsuplem, String status) throws Exception;
}