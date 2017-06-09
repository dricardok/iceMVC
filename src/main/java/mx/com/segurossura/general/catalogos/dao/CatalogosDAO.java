package mx.com.segurossura.general.catalogos.dao;

import java.util.List;
import java.util.Map;

import com.biosnettcs.core.model.BaseVO;

public interface CatalogosDAO {

    /**
     * Obtiene las sucursales
     * 
     * @return Lista de sucursales
     * @throws Exception
     */
    public List<Map<String, String>> obtenerSucursales () throws Exception;
    
    /**
     * Obtiene el catalogo de TATRIPOL por ramo y atributo
     * 
     * @param cdramo Codigo de ramo
     * @param cdatribu Codigo de atributo
     * @return Lista de elementos del catalogo
     * @throws Exception
     */
    public List<Map<String, String>> obtenerCatalogoTatripol (String cdramo, String cdatribu) throws Exception;
    
    /**
     * Obtiene el catalogo de TATRISIT por tipo de situacion y atributo
     * 
     * @param cdtipsit Codigo de tipo de situacion
     * @param cdatribu Codigo de atributo
     * @return Lista de elementos del catalogo
     * @throws Exception
     */
    public List<Map<String, String>> obtenerCatalogoTatrisit (String cdtipsit, String cdatribu) throws Exception;

    /**
     * Obtiene el catalogo de TATRIGAR por ramo, cobertura y atributo
     * 
     * @param cdramo Codigo de ramo
     * @param cdgarant Codigo de garantia/cobertura
     * @param cdatribu Codigo de atributo
     * @return Lista de elementos del catalogo
     * @throws Exception
     */
	public List<Map<String, String>> obtenerCatalogoTatrigar(String cdramo, String cdgarant, String cdatribu) throws Exception;
    
	/**
	 * Obtiene el catalogo de tipo de situaciones por ramo
	 * 
	 * @param cdramo Codigo de ramo
	 * @return Lista de elementos del catalogo
	 * @throws Exception
	 */
    public List<Map<String, String>> obtenerTipoSituaciones (String cdramo) throws Exception;
    
    /**
     * Obtiene el catalogo por codigo de tabla
     * 
     * @param cdtabla Codigo de la tabla del catalogo
     * @return Lista de elementos del catalogo
     * @throws Exception
     */
    public List<BaseVO> obtenerCatalogoTablaApoyo(String cdtabla) throws Exception;
    
    
}