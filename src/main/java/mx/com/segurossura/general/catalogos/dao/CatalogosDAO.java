package mx.com.segurossura.general.catalogos.dao;

import java.util.List;
import java.util.Map;

public interface CatalogosDAO {

    public List<Map<String, String>> obtenerSucursales () throws Exception;
    
    public List<Map<String, String>> obtenerCatalogoTatripol (String cdramo, String cdatribu) throws Exception;
    
    public List<Map<String, String>> obtenerCatalogoTatrisit (String cdtipsit, String cdatribu) throws Exception;
    
    public List<Map<String, String>> obtenerCatalogoTmanteni (String cdtabla) throws Exception;
    
    public List<Map<String, String>> obtenerTipoSituaciones (String cdramo) throws Exception;
    
}