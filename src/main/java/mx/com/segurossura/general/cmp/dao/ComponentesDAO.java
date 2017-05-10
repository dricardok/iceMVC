package mx.com.segurossura.general.cmp.dao;

import java.util.List;
import java.util.Map;

public interface ComponentesDAO {
    public List<Map<String, String>> obtenerListaComponentesSP(String pantalla, String seccion, String modulo,
            String estatus, String cdramo, String cdtipsit, String cdsisrol, String auxkey) throws Exception;
    
    public void movimientoComponentesSP(String pantalla, String seccion, String modulo,
            String estatus, String cdramo, String cdtipsit, String cdsisrol, String auxkey, List<Map<String, String>> lista) throws Exception;
}
