package mx.com.segurossura.general.catalogos.service;

import java.util.List;
import java.util.Map;

import com.biosnettcs.core.model.BaseVO;

public interface CatalogosManager {
    
    public List<BaseVO> obtenerCatalogo (String catalogo, Map<String, String> params, String cdusuari, String cdsisrol) throws Exception;
    
}