package mx.com.segurossura.general.cmp.service;

import java.util.List;
import java.util.Map;

public interface ComponentesManager {
    public Map<String, List<Map<String, String>>> obtenerComponentes(List<Map<String, String>> componentes) throws Exception;
    
    public void movimientoComponentes(String pantalla, String seccion, String modulo,
            String estatus, String cdramo, String cdtipsit, String cdsisrol, String auxkey, List<Map<String, String>> lista) throws Exception;
}
