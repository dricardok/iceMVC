package mx.com.segurossura.catalogos.dao;

import java.util.List;
import java.util.Map;

import mx.com.segurossura.catalogos.model.GenericVO;

public interface CatalogosDAO {
	
	/**
	 * Obtiene los valores de ttapvat1
	 * @param cdtabla
	 * @return Lista de otvalor de ttapvat1
	 * @throws Exception
	 */
    
	public List<GenericVO> obtieneAtributosSituacionDAO(String cdatribu, String cdtipsit, String otvalor, String cdsisrol) throws Exception;
}