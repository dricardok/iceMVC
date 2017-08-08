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
    public List<Map<String, String>> obtenerCatalogoTatripol (String cdramo, String cdatribu, String idPadre1, String idPadre2,
            String idPadre3, String idPadre4, String idPadre5) throws Exception;
    
    /**
     * Obtiene el catalogo de TATRISIT por tipo de situacion y atributo
     * 
     * @param cdtipsit Codigo de tipo de situacion
     * @param cdatribu Codigo de atributo
     * @return Lista de elementos del catalogo
     * @throws Exception
     */
    public List<Map<String, String>> obtenerCatalogoTatrisit (String cdtipsit, String cdatribu, String idPadre1, String idPadre2,
            String idPadre3, String idPadre4, String idPadre5) throws Exception;

    /**
     * Obtiene el catalogo de TATRIGAR por ramo, cobertura y atributo
     * 
     * @param cdramo Codigo de ramo
     * @param cdgarant Codigo de garantia/cobertura
     * @param cdatribu Codigo de atributo
     * @return Lista de elementos del catalogo
     * @throws Exception
     */
	public List<Map<String, String>> obtenerCatalogoTatrigar(String cdramo, String cdgarant, String cdatribu, String idPadre1,
	        String idPadre2, String idPadre3, String idPadre4, String idPadre5) throws Exception;
    
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
    
    /**
     * Obtiene el catalogo de roles por ramo
     * 
     * @param cdramo Codigo de ramo
     * @param cdnivel Nivel de usuario
     * @return Lista de elementos del catalogo
     * @throws Exception
     */
    public List<Map<String, String>> obtenerRolXRamo (String cdramo, String cdnivel) throws Exception;
    
    /**
     * Obtiene personas de acuerdo a criterio cdatribu
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsituac
     * @param nmsuplem
     * @param cdrol
     * @param cdperson
     * @param cdatribu
     * @param otvalor
     * @return Lista de personas
     * @throws Exception
     */
    public List<Map<String, String>> obtenerPersonas(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem, String cdrol, String cdperson, String cdatribu, String otvalor) throws Exception;
    
    public List<Map<String, String>> obtenerMunicipio(String cdprovin) throws Exception;

    public List<Map<String, String>> obtenerProvincia() throws Exception;

    public List<Map<String, String>> obtenerColonia(String cdcodpos) throws Exception;

	public List<Map<String, String>> obtenerCatalogoTatriper(String cdramo, String cdrol, String cdatribu, String idPadre1,
			String idPadre2, String idPadre3, String idPadre4, String idPadre5) throws Exception;
	
	/**
	 * Obtiene el catalogo de cuadros de comision por ramo
	 * 
	 * @param cdramo Codigo de ramo
	 * @return Lista de elementos del catalogo
	 * @throws Exception
	 */
    public List<Map<String, String>> obtenerCuadrosComision (String cdramo) throws Exception;
    
    public List<Map<String, String>> obtenerCatalogoTablaManteni (String cdtabla) throws Exception;
    
    /**
     * Obtiene el catalogo de productos
     * 
     * @param cdramo
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> obtenerProductos() throws Exception;
    
    
    public List<Map<String, String>> obtenerSucuBanc(String cdbanco) throws Exception;
    
    
    public List<Map<String, String>> obtienerGestoresCob() throws Exception;
    
    
    public List<Map<String, String>> obtenerEstatusTramite() throws Exception;
    
    /**
     * Obtiene catalogo de compañias
     * 
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> obtenerCompañias() throws Exception;
    
    public List<Map<String, String>> obtenerPuntosVentaPorUsuario (String cdusuari) throws Exception;
    
    public List<Map<String, String>> obtenerGruposPorPuntosventaRamo (String cdptovta, String cdramo) throws Exception;
    
    public List<Map<String, String>> obtenerSubgruposPorPuntoventaRamo (String cdptovta, String cdgrupo,
            String cdramo) throws Exception;
    
    public List<Map<String, String>> obtenerPerfilesPorPuntoventaSubgrupoRamo (String cdptovta, String cdsubgpo,
            String cdramo) throws Exception;
    
    public List<Map<String, String>> obtenerSucursalesDePuntoventa (String cdptovta) throws Exception;
}