package mx.com.segurossura.general.catalogos.dao;

import java.util.List;
import java.util.Map;

public interface CatalogosDAO {

    public List<Map<String, String>> obtenerSucursales () throws Exception;
    
    public List<Map<String, String>> obtenerCatalogoTatripol (String cdramo, String cdatribu) throws Exception;
    
}