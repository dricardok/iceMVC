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
            String nmsituac, String nmsuplem, String cdbloque, String cdgarant, String cdptovta, String cdgrupo, String cdsubgpo,
            String cdperfil, String cdusuari, String cdsisrol) throws Exception;

	public String obtenerCuadroComisionesDefault (String cdramo) throws Exception;
	
	/**
	 * Ejecuta las validaciones de una poliza para el bloque indicado
	 * @param cdunieco Sucursal de la poliza
	 * @param cdramo   Ramo de la poliza
	 * @param estado   Estado de la poliza
	 * @param nmpoliza Numero de poliza
	 * @param nmsituac Situacion de la poliza
	 * @param nmsuplem Suplemento de la poliza
	 * @param cdperson Codigo de la persona a validar o null si no se validara
	 * @param cdbloque Codigo del bloque de datos a validar
	 * @return Lista de errores de validacion del bloque
	 * @throws Exception
	 */
	public List<Map<String, String>> ejecutarValidaciones (String cdunieco, String cdramo, String estado, String nmpoliza,
	        String nmsituac, String nmsuplem, String cdperson, String cdbloque) throws Exception;
	
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
	
	public List<Map<String, String>> obtenerDetalleTarificacion(String cdunieco, String cdramo, String estado, String nmpoliza) throws Exception;
	
	
	/**
	 * Distribuye los agrupadores de la poliza
	 * @param cdunieco
	 * @param cdramo
	 * @param estado
	 * @param nmpoliza
	 * @param nmsuplem
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> distribuirAgrupadores(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
	
	/**
	 *  Actualiza Poliza de Working a Master
	 * @param cdunieco
	 * @param cdramo
	 * @param estado
	 * @param nmpoliza
	 * @param nmsuplem
	 * @param newestad
	 * @param newpoliza
	 * @param pnmrecibo
	 * @return
	 * @throws Exception
	 */
	public String confirmarPoliza(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem,
	        String pnmrecibo) throws Exception;
	
	/**
	 * Borra ZWORKCT2_COT y ZWORKCT1_COT
	 * @param cdunieco
	 * @param cdramo
	 * @param estado
	 * @param nmpoliza
	 * @param nmsuplem
	 * @throws Exception
	 */
	public void movimientoZworkcts(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
	
	/**
	 * Copia cotizacion base a nuevas tablas
	 * @param cdunieco
	 * @param cdramo
	 * @param estado
	 * @param nmpoliza
	 * @param nmsuplem
	 * @throws Exception
	 */
	public void movimientoZworkctsCopiado(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
	
	/**
	 * Obtiene lista de formas de pago
	 * @param cdunieco
	 * @param cdramo
	 * @param estado
	 * @param nmpoliza
	 * @param nmsuplem
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, String>> obtenerFormasPago(String cdunieco, String  cdramo, String estado, String  nmpoliza, String nmsuplem) throws Exception;
	
	/**
	 * Obtiene tarifas multiples temporales
	 * @param cdunieco
	 * @param cdramo
	 * @param estado
	 * @param nmpoliza
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, String>> obtenerTarifaMultipleTemp(String cdunieco, String cdramo, String estado, String nmpoliza) throws Exception;
	
	/**
	 * Obtiene detalle de la tarifa generada
	 * @param cdunieco
	 * @param cdramo
	 * @param estado
	 * @param nmpoliza
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, String>> obtenerDetalleTarifaTemp(String cdunieco, String cdramo, String estado, String nmpoliza,
	        String cdperpag) throws Exception;
    
    public List<Map<String, String>> obtenerTvaloaux (String cdunieco, String cdramo, String estado, String nmpoliza,
            String cdbloque, String nmsituac, String cdgarant, String nmsuplem, String status) throws Exception;
    
    public void ejecutarMovimientoTvaloaux (String cdunieco, String cdramo, String estado, String nmpoliza,
            String cdbloque, String nmsituac, String cdgarant, String nmsuplem, String status, String otvalor01, String otvalor02,
            String otvalor03, String otvalor04, String otvalor05, String otvalor06, String otvalor07, String otvalor08,
            String otvalor09, String otvalor10, String otvalor11, String otvalor12, String otvalor13, String otvalor14,
            String otvalor15, String accion) throws Exception;
    
   
    public List<Map<String, String>> obtenerDatosPago(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
    
    /**
     * Obtiene porcentaje de participacion por poliza
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> obtenerPorcPartCoa (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
    
    /**
     * Obtiene datos de coaseguro por modelo
     * 
     * @param cdmodelo
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> obtenerModeloCoaseguro(String cdmodelo) throws Exception;
    
    /**
     * Movimiento de tabla de coaseguro cedido y cedido parcial
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem_bloque
     * @param nmsuplem_session
     * @param cdcia
     * @param cdtipcoa
     * @param status
     * @param swabrido
     * @param porcpart
     * @param cdmodelo
     * @param swpagcom
     * @param accion
     * @throws Exception
     */
    public void movimientoMpolicoa(String cdunieco, String cdramo, String estado, String nmpoliza, 
            String nmsuplem_bloque, String nmsuplem_session, String cdcia, String cdtipcoa, 
            String status, String swabrido, String porcpart, String cdmodelo, String swpagcom, 
            String accion) throws Exception;
    
    /**
     * Movimiento de tabla de coaseguro aceptado
     * 
     * @param cdcialider
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmpolizal
     * @param nmsuplem_bloque
     * @param nmsuplem_session
     * @param tipodocu
     * @param ndoclider
     * @param status
     * @param accion
     * @throws Exception
     */
    public void movimientoMsupcoa(String cdcialider, String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmpolizal, String nmsuplem_bloque, String nmsuplem_session, String tipodocu, String ndoclider, 
            String status, String accion) throws Exception;
    
    /**
     * Obtiene codigo de compañia de SURa
     * 
     * @return
     * @throws Exception
     */
    public String obtieneCdciaSURA() throws Exception;
    
    /**
     * Obtiene datos de coaseguro aceptado
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> obtenerCoaseguroAceptado(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;

    
    public List<Map<String, String>> recuperarCotizadoresDisponibles (String cdusuari) throws Exception;
    
    public List<Map<String, String>> obtenerDatosConfirmacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
    
    public void insertarAgenteDeSesion (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem,
            String cdusuari) throws Exception;
    
    public Map<String, String> validarCargaCotizacion (String cdunieco, String cdramo, String nmpoliza, String cdusuari,
            String cdsisrol) throws Exception;
    
    /**
     * Valida si la poliza tiene coaseguro
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @return
     * @throws Exception
     */
    public boolean tieneCoaseguro (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
    
    /**
     * Elimina tablas de coaseguro para cotizacion
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @throws Exception
     */
    public void eliminaCoaseguro (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
    
    /**
     * Actualiza swabrido y swpagcom para mpolicoa segun coaseguro cedido
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @param cdesqcoa
     * @throws Exception
     */
    public void actualizaSwitchCoaseguroCedido (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, String cdesqcoa) throws Exception;
    public Map<String, String> obtenerPerfilamientoPoliza (String cdunieco, String  cdramo, String estado, String  nmpoliza,
            String nmsuplem) throws Exception;

	public void actualizaGestorCobro(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem)
			throws Exception;
}