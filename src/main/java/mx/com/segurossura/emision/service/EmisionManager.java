
package mx.com.segurossura.emision.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface EmisionManager {
	
	void movimientoTvalogar(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_Cdatribu, String Gn_Nmsuplem, String Gn_Nmsituac, String Gv_Cdgarant, String Gv_Otvalor,
			String Gv_Accion) throws Exception;
	
	List<Map<String, String>> obtieneMcapital(String pv_cdramo_i, String pv_cdcapita_i) throws Exception;

	List<Map<String, String>> obtieneTgaranti(String pv_cdgarant_i) throws Exception;

	void movimientoMpolicap(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_Nmsituac, String Gn_Nmsuplem_Sesion, String Gv_Swrevalo, String Gv_Cdcapita, String Gn_Ptcapita,
			String Gn_Nmsuplem_Bloque, String Gv_ModoAcceso) throws Exception;

	List<Map<String, String>> obtieneMpolizas(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsuplem_i) throws Exception;

	Map<String, String> obtenerTvalopol(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsuplem_i) throws Exception;

	void movimientoMpolizas(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_NmsuplemBloque, String Gn_NmsuplemSesion, String Gv_Status, String Gv_Swestado,
			String Gn_Nmsolici, Date Gd_Feautori, String Gn_Cdmotanu, Date Gd_Feanulac, String Gv_Swautori,
			String Gv_Cdmoneda, Date Gd_Feinisus, Date Gd_Fefinsus, String Gv_Ottempot, Date Gd_Feefecto,
			String Gv_Hhefecto, Date Gd_Feproren, Date Gd_Fevencim, String Gn_Nmrenova, Date Gd_Ferecibo,
			Date Gd_Feultsin, String Gn_Nmnumsin, String Gv_Cdtipcoa, String Gv_Swtarifi, String Gv_Swabrido,
			Date Gd_Feemisio, String Gn_Cdperpag, String Gn_Nmpoliex, String Gv_Nmcuadro, String Gn_Porredau,
			String Gv_Swconsol, String Gn_Nmpolcoi, String Gv_Adparben, String Gn_Nmcercoi, String Gn_Cdtipren,
			String Gv_Accion) throws Exception;


	String generaNmpoliza(String Gn_Nmpoliza, String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado,
			String Gv_Swcolind, String Gn_Nmpolcoi) throws Exception;
	
	List<Map<String, String>> ejecutarValidaciones(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsituac, String nmsuplem, List<String> cdbloque) throws Exception;

	
    /**
     * Genera la tarificacion de una poliza
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsituac
     * @return
     * @throws Exception
     */
    public Map<String, Object> generarTarificacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac)
            throws Exception;
    
    /**
     * Genera la tarificacion de una poliza basado en planes
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsituac
     * @return
     * @throws Exception
     */
    public List<Map<String, Object>> generarTarificacionPlanes(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac) throws Exception;
    
    /**
     * Genera la tarificacion de una poliza bazado en un plan especifico
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsituac
     * @param cdperpag
     * @return
     * @throws Exception
     */
    public Map<String, Object> generarTarificacionPlan(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac,
            String cdperpag, String cdusuari, String cdsisrol) throws Exception;
    
    /**
     * Obtiene los datos de la tarificacion
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @return
     * @throws Exception
     */
    public List<Map<String,String>> obtenerDatosTarificacion(String cdunieco, String cdramo, String estado, String nmpoliza) throws Exception;
    
    
    public Map<String, Object> distribuirAgrupadores(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
    
    
    public String confirmarPoliza(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsuplem, String newestad, String newpoliza, String pnmrecibo) throws Exception;
    
    
    public String realizarPagoTarjeta(String cdunieco, String cdramo, String estado, String nmpoliza, 
    		String nmsuplem, String cdbanco, String dsbanco, String nmtarjeta, 
    		String codseg, String fevencm, String fevenca, String nombre, String email, String usuario) throws Exception;
    
    
    public List<Map<String, String>> obtenerTarifaMultipleTemp(String cdunieco, String  cdramo, String estado, String  nmpoliza) throws Exception;
    
    public List<Map<String, String>> obtenerDetalleTarifaTemp(String cdunieco, String  cdramo, String estado, String  nmpoliza, String cdperpag) throws Exception;
    
    public Map<String, String> validarCargaCotizacion (String cdunieco, String cdramo, String nmpoliza, String cdusuari,
            String cdsisrol) throws Exception;
    
}