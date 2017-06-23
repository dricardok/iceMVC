package mx.com.segurossura.emision.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface EmisionDAO {
	
	void movimientoMpoligar(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsituac, String nmsuplem_session, String cdgarant, String cdcapita, Date fevencim,
			String accion) throws Exception;

	void movimientoTvalogar(String cdunieco, String cdramo, String estado, String nmpoliza,
			String cdatribu, String nmsuplem, String nmsituac, String cdgarant, String otvalor,
			String accion) throws Exception;

	List<Map<String, String>> obtieneMpoligar(String cdunieco, String cdramo, String estado,
			String nmpoliza, String nmsituac, String cdgarant, String nmsuplem) throws Exception;

	List<Map<String, String>> obtieneMpolicap(String cdunieco, String cdramo, String estado,
			String nmpoliza, String nmsituac, String cdcapita, String nmsuplem) throws Exception;

	List<Map<String, String>> obtieneTvalogar(String cdunieco, String cdramo, String estado,
			String nmpoliza, String nmsituac, String cdgarant, String nmsuplem) throws Exception;

	List<Map<String, String>> obtieneMcapital(String cdramo, String cdcapita) throws Exception;

	List<Map<String, String>> obtieneTgaranti(String cdgarant) throws Exception;

	void movimientoMpolicap(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsituac, String nmsuplem_sesion, String swrevalo, String cdcapita, String ptcapita,
			String nmsuplem_bloque, String modoacceso) throws Exception;
	
	List<Map<String, String>> obtieneMpolizas(String cdunieco, String cdramo, String estado,
			String nmpoliza, String nmsuplem) throws Exception;

	Map<String, String> obtenerTvalopol(String cdunieco, String cdramo, String estado,
			String nmpoliza, String nmsuplem) throws Exception;

	void movimientoMpolizas(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsuplembloque, String nmsuplemsesion, String status, String swestado,
			String nmsolici, Date feautori, String cdmotanu, Date feanulac, String swautori,
			String cdmoneda, Date feinisus, Date fefinsus, String ottempot, Date feefecto,
			String hhefecto, Date feproren, Date fevencim, String nmrenova, Date ferecibo,
			Date feultsin, String nmnumsin, String cdtipcoa, String swtarifi, String swabrido,
			Date feemisio, String cdperpag, String nmpoliex, String nmcuadro, String porredau,
			String swconsol, String nmpolcoi, String adparben, String nmcercoi, String cdtipren,
			String accion) throws Exception;


	public void movimientoTvalopol (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplemBloque,
            String nmsuplemSesion, String status, Map<String, String> otvalores, String accion) throws Exception;

	String generaNmpoliza(String cdunieco, String cdramo, String estado,
			String swcolind, String nmpolcoi) throws Exception;
	
	List<Map<String, String>> obtieneTatrigar(String pv_cdramo_i, String pv_cdtipsit_i, String pv_cdgarant_i,
			String pv_cdatribu_i) throws Exception;	
	
	public Map<String, String> ejecutarValoresDefecto (String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String nmsuplem, String cdbloque, String cdgarant) throws Exception;

	public String obtenerCuadroComisionesDefault (String cdramo) throws Exception;
	
	public List<Map<String, String>> ejecutarValidaciones (String cdunieco, String cdramo, String estado, String nmpoliza,
	        String nmsituac, String nmsuplem, String cdbloque) throws Exception;
	
	public List<Map<String,String>> obtieneMpoligarTabla(String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsituac, String cdgarant, String nmsuplem) throws Exception;
	
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
	
}