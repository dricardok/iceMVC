package mx.com.segurossura.workflow.confcomp.service;

import java.util.List;
import java.util.Map;

import mx.com.segurossura.workflow.confcomp.model.ComponenteVO;
import mx.com.segurossura.workflow.confcomp.model.Item;

public interface PantallasManager {
    
    /**
     * 
     * @param cdtiptra
     * @param cdunieco
     * @param cdramo
     * @param cdtipsit
     * @param estado
     * @param cdsisrol
     * @param pantalla
     * @param seccion
     * @param orden
     * @return
     * @throws Exception
     */
    public List<ComponenteVO> obtenerComponentes(String cdtiptra, String cdunieco, String cdramo, String cdtipsit,
            String estado, String cdsisrol, String pantalla, String seccion, String orden) throws Exception;
	
    /**
     * 
     * @param cdtiptra
     * @param cdunieco
     * @param cdramo
     * @param cdtipsit
     * @param estado
     * @param cdsisrol
     * @param pantalla
     * @param seccion
     * @param orden
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> obtenerParametros(String cdtiptra, String cdunieco, String cdramo, String cdtipsit,
            String estado, String cdsisrol, String pantalla, String seccion, String orden) throws Exception;
	
    /**
     * 
     * @param cdtiptra
     * @param cdunieco
     * @param cdramo
     * @param cdtipsit
     * @param estado
     * @param cdsisrol
     * @param pantalla
     * @param seccion
     * @param orden
     * @param accion
     * @param idproceso
     * @throws Exception
     */
    public void movParametros(String cdtiptra, String cdunieco, String cdramo, String cdtipsit, String estado,
            String cdsisrol, String pantalla, String seccion, String orden, String accion, String idproceso)
            throws Exception;
	
    /**
     * 
     * @param params
     * @throws Exception
     */
	public void insertarParametros(Map<String,String> params) throws Exception;
	
	/**
	 * 
	 * @return
	 * @throws Exception
	 */
	public Item obtenerArbol() throws Exception;
	
	/**
	 * 
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String,String> obtienePantalla(Map<String,String> params) throws Exception;
	
	/**
	 * 
	 * @param proceso
	 * @return
	 */
	public List<ComponenteVO> recuperarComboDocs(String proceso);
}