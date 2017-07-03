package mx.com.segurossura.workflow.mesacontrol.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import mx.com.segurossura.workflow.confcomp.model.Item;

public interface MesaControlManager
{
    public String cargarCdagentePorCdusuari(String cdusuari)throws Exception;
    
    public void guardarRegistroContrarecibo(String ntramite,String cdusuari)throws Exception;
    
    public void actualizarNombreDocumento(String ntramite,String cddocume,String nuevo)throws Exception;
    
    public void borrarDocumento(String ntramite,String cddocume)throws Exception;

    @Deprecated
    public void borraDomicilioAsegSiCodposCambia(
			String cdunieco
			,String cdramo
			,String estado
			,String nmpoliza
			,String nmsuplem
			,String cdpos)throws Exception;
    
   /**
    * GUARDA UN REGISTRO DE TDMESACONTROL.
    * @param cerrado ¿EL REGISTRO NUEVO YA INSERTA FECHA, USUARIO y ROL FIN?
    */
    public void movimientoDetalleTramite(
			String ntramite
			,Date feinicio
			,String cdclausu
			,String comments
			,String cdusuari
			,String cdmotivo
			,String cdsisrol
			,String swagente
			,String status
			,boolean cerrado
			)throws Exception;
    
    public void validarAntesDeTurnar(
    		String ntramite
    		,String status
    		,String cdusuari
    		,String cdsisrol
    		)throws Exception;
    
    @Deprecated
	public String movimientoTramite (
			String cdunieco
			,String cdramo
			,String estado
			,String nmpoliza
			,String nmsuplem
			,String cdsucadm
			,String cdsucdoc
			,String cdtiptra
			,Date ferecepc
			,String cdagente
			,String referencia
			,String nombre
			,Date festatus
			,String status
			,String comments
			,String nmsolici
			,String cdtipsit
			,String cdusuari
			,String cdsisrol
			,String swimpres
			,String cdtipflu
			,String cdflujomc
			,Map<String,String>valores, String cdtipsup, String renuniext, String renramo, String renpoliex
			)throws Exception;
    
    public void marcarTramiteVistaPrevia(String ntramite) throws Exception;
    
    public void movimientoExclusionUsuario(String usuario, String accion) throws Exception;
    
    public Map<String, Item> pantallaExclusionTurnados(String cdsisrol) throws Exception;
    
    /**
     * Regenera un reporte erroneo
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @param cddocume
     * @param nmsituac
     * @param nmcertif
     * @param cdmoddoc
     * @return
     * @throws Exception
     */
    public boolean regeneraReporte(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, String cddocume, String nmsituac, String nmcertif, String cdmoddoc) throws Exception;

    /**
     * Regenera Documentos a nivrl endoso
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @return
     * @throws Exception
     */
    public boolean regeneraDocumentosEndoso(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
    
    /**
	 * Se pone un status al tramite y se retorna el actual, no se registra en los historicos
	 * @param ntramite
	 * @param statusTemporal
	 * @return
	 * @throws Exception
	 */
	public String marcarTramiteComoStatusTemporal(String ntramite, String statusTemporal) throws Exception;

	@Deprecated
	public void actualizarNmsuplemTramite(String ntramite, String nmsuplem) throws Exception;
	
	public void regeneraReverso(String ntramite, String cdsisrol, String cdusuari) throws Exception;
	
	public void borrarNmsoliciTramite(String ntramite) throws Exception;
	
	@Deprecated
	public void concatenarAlInicioDelUltimoDetalle(String ntramite, String comentario, String cdmodulo, String cdevento) throws Exception;
	
	/**
	 * Se agrega proceso para obtener datos de la mesa de control
	 * con la nueva arquitectura
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, String>> loadMesaControl(Map<String,String> params) throws Exception;
	
	/**
	 * Si ya existe un tramite cdtiptra 1 o 21 con esa cdunieco, cdramo, estado, nmsolici arroja excepcion
	 */
	@Deprecated
	public void validaDuplicidadTramiteEmisionPorNmsolici (String cdunieco, String cdramo, String estado, String nmsolici) throws Exception;
	
	/**
     * Graba evento en bitacora
     * @param sb
     * @param cdmodulo
     * @param cdevento
     * @param fecha
     * @param cdusuari
     * @param cdsisrol
     * @param ntramite
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsolici
     * @param cdagente
     * @param cdusuariDes
     * @param cdsisrolDes
     * @param status
     * @throws Exception
     */
    public void grabarEvento(StringBuilder sb, String cdmodulo, String cdevento, Date fecha, String cdusuari,
            String cdsisrol, String ntramite, String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsolici, String cdagente, String cdusuariDes, String cdsisrolDes, String status) throws Exception;
	
    /**
     * 
     * @param ntramite
     * @param nuevoStatus
     * @param comments
     * @param cdusuariSesion
     * @param cdsisrolSesion
     * @param cdusuariDestino
     * @param cdsisrolDestino
     * @param cdmotivo
     * @param cdclausu
     * @param swagente
     * @param stamp
     * @param enviarCorreos
     * @return
     * @throws Exception
     */
    public Map<String, Object> moverTramite(String ntramite, String nuevoStatus, String comments, String cdusuariSesion,
            String cdsisrolSesion, String cdusuariDestino, String cdsisrolDestino, String cdmotivo, String cdclausu,
            String swagente, Long stamp, boolean enviarCorreos) throws Exception;
    
    /**
     * 
     * @param smap1
     * @return
     * @throws Exception
     */
    public List<Map<String, String>> obtenerDetalleMC(Map<String, String> smap1) throws Exception;

    public void actualizaOTValorMesaControl(HashMap<String, Object> temp) throws Exception;
    
}