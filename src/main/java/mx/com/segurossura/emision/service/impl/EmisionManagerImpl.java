
package mx.com.segurossura.emision.service.impl;

import java.io.File;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Constantes;
import com.biosnettcs.core.Utils;

import mx.com.royalsun.alea.commons.bean.Banco;
import mx.com.royalsun.alea.commons.bean.Documento;
import mx.com.royalsun.alea.commons.bean.RequestWs;
import mx.com.royalsun.alea.commons.bean.Tarjeta;
import mx.com.royalsun.alea.commons.bean.TransactionResponse;
import mx.com.segurossura.emision.dao.EmisionDAO;
import mx.com.segurossura.emision.dao.SituacionDAO;
import mx.com.segurossura.emision.service.EmisionManager;
import mx.com.segurossura.emision.service.ImpresionManager;
import mx.com.segurossura.emision.service.PagoManager;
import mx.com.segurossura.general.catalogos.model.Bloque;
import mx.com.segurossura.general.documentos.dao.DocumentosDAO;
import mx.com.segurossura.general.documentos.model.TipoArchivo;
import mx.com.segurossura.general.producto.model.EstadoPoliza;

@Service
public class EmisionManagerImpl implements EmisionManager {

	private final static Logger logger = LoggerFactory.getLogger(EmisionManagerImpl.class);

	@Autowired
	private EmisionDAO emisionDAO;

	@Autowired
	private SituacionDAO situacionDAO;
	
	@Autowired
	private ImpresionManager impresionManager;
	
	@Autowired
	private DocumentosDAO documentosDAO;
	
	@Autowired
	private PagoManager pagoManager;
	
	@Value("${content.ice.path}")
	private String directorioBase;

	@Override
	public void movimientoTvalogar(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_Cdatribu, String Gn_Nmsuplem, String Gn_Nmsituac, String Gv_Cdgarant, String Gv_Otvalor,
			String Gv_Accion) throws Exception {
		logger.debug(Utils.join("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", "\n@@@@@@ movimientoTvalogar"

		));
		String paso = "";

		try {

			paso = "Consultando datos";
			emisionDAO.movimientoTvalogar(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Cdatribu, Gn_Nmsuplem,
					Gn_Nmsituac, Gv_Cdgarant, Gv_Otvalor, Gv_Accion);

		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}

		logger.debug(Utils.join("\n@@@@@@ movimientoTvalogar", "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));

	}

	@Override
	public List<Map<String, String>> obtieneMcapital(String pv_cdramo_i, String pv_cdcapita_i) throws Exception {
		logger.debug(Utils.join("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", "\n@@@@@@ obtieneMcapital"

		));
		String paso = "";
		List<Map<String, String>> datos = null;
		try {

			paso = "Consultando datos";

			datos = emisionDAO.obtieneMcapital(pv_cdramo_i, pv_cdcapita_i);

		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}

		logger.debug(Utils.join("\n@@@@@@ obtieneMcapital", "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));
		return datos;
	}

	@Override
	public List<Map<String, String>> obtieneTgaranti(String pv_cdgarant_i) throws Exception {
		logger.debug(Utils.join("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", "\n@@@@@@ obtieneTgaranti"

		));
		String paso = "";
		List<Map<String, String>> datos = null;
		try {

			paso = "Consultando datos";

			datos = emisionDAO.obtieneTgaranti(pv_cdgarant_i);

		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}

		logger.debug(Utils.join("\n@@@@@@ obtieneTgaranti", "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));
		return datos;
	}

	@Override
	public void movimientoMpolicap(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_Nmsituac, String Gn_Nmsuplem_Sesion, String Gv_Swrevalo, String Gv_Cdcapita, String Gn_Ptcapita,
			String Gn_Nmsuplem_Bloque, String Gv_ModoAcceso) throws Exception {
		logger.debug(Utils.join("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", "\n@@@@@@ movimientoMpolicap"

		));
		String paso = "";
		try {

			paso = "Consultando datos";

			emisionDAO.movimientoMpolicap(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Nmsituac,
					Gn_Nmsuplem_Sesion, Gv_Swrevalo, Gv_Cdcapita, Gn_Ptcapita, Gn_Nmsuplem_Bloque, Gv_ModoAcceso);

		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}

		logger.debug(Utils.join("\n@@@@@@ movimientoMpolicap", "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));

	}

	@Override
	public List<Map<String, String>> obtieneMpolizas(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsuplem_i) throws Exception {
		logger.debug(Utils.join("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", "\n@@@@@@ obtieneMpolizas"

		));
		String paso = "";
		List<Map<String, String>> datos = null;
		try {

			paso = "Consultando datos";

			datos = emisionDAO.obtieneMpolizas(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsuplem_i);

		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}

		logger.debug(Utils.join("\n@@@@@@ obtieneMpolizas", "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));
		return datos;
	}

	@Override
	public Map<String, String> obtenerTvalopol(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsuplem_i) throws Exception {
		logger.debug(Utils.join("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", "\n@@@@@@ obtieneTvalopol"

		));
		String paso = "";
		Map<String, String> datos = null;
		try {

			paso = "Consultando datos";

			datos = emisionDAO.obtenerTvalopol(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsuplem_i);

		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}

		logger.debug(Utils.join("\n@@@@@@ obtieneTvalopol", "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));
		return datos;
	}

	@Override
	public void movimientoMpolizas(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_NmsuplemBloque, String Gn_NmsuplemSesion, String Gv_Status, String Gv_Swestado,
			String Gn_Nmsolici, Date Gd_Feautori, String Gn_Cdmotanu, Date Gd_Feanulac, String Gv_Swautori,
			String Gv_Cdmoneda, Date Gd_Feinisus, Date Gd_Fefinsus, String Gv_Ottempot, Date Gd_Feefecto,
			String Gv_Hhefecto, Date Gd_Feproren, Date Gd_Fevencim, String Gn_Nmrenova, Date Gd_Ferecibo,
			Date Gd_Feultsin, String Gn_Nmnumsin, String Gv_Cdtipcoa, String Gv_Swtarifi, String Gv_Swabrido,
			Date Gd_Feemisio, String Gn_Cdperpag, String Gn_Nmpoliex, String Gv_Nmcuadro, String Gn_Porredau,
			String Gv_Swconsol, String Gn_Nmpolcoi, String Gv_Adparben, String Gn_Nmcercoi, String Gn_Cdtipren,
			String Gv_Accion) throws Exception {
		logger.debug(Utils.join("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", "\n@@@@@@ movimientoMpolizas"

		));
		String paso = "";

		try {

			paso = "Consultando datos";
			emisionDAO.movimientoMpolizas(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_NmsuplemBloque,
					Gn_NmsuplemSesion, Gv_Status, Gv_Swestado, Gn_Nmsolici, Gd_Feautori, Gn_Cdmotanu, Gd_Feanulac,
					Gv_Swautori, Gv_Cdmoneda, Gd_Feinisus, Gd_Fefinsus, Gv_Ottempot, Gd_Feefecto, Gv_Hhefecto,
					Gd_Feproren, Gd_Fevencim, Gn_Nmrenova, Gd_Ferecibo, Gd_Feultsin, Gn_Nmnumsin, Gv_Cdtipcoa,
					Gv_Swtarifi, Gv_Swabrido, Gd_Feemisio, Gn_Cdperpag, Gn_Nmpoliex, Gv_Nmcuadro, Gn_Porredau,
					Gv_Swconsol, Gn_Nmpolcoi, Gv_Adparben, Gn_Nmcercoi, Gn_Cdtipren, Gv_Accion);

		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}

		logger.debug(Utils.join("\n@@@@@@ movimientoMpolizas", "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));

	}

	@Override
	public String generaNmpoliza(String Gn_Nmpoliza, String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado,
			String Gv_Swcolind, String Gn_Nmpolcoi) throws Exception {
		logger.debug(Utils.join("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", "\n@@@@@@ generaNmpoliza"

		));
		String paso = "";
		String nmpoliza = null;
		try {

			paso = "Consultando datos";
			nmpoliza = emisionDAO.generaNmpoliza(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gv_Swcolind, Gn_Nmpolcoi);

		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}

		logger.debug(Utils.join("\n@@@@@@ generaNmpoliza", "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));
		return nmpoliza;
	}

	@Override
	public List<Map<String, String>> ejecutarValidaciones(String cdunieco, String cdramo, String estado,
			String nmpoliza, String nmsituac, String nmsuplem, List<String> cdbloque) throws Exception {
		logger.debug("\n@@@@@@ ejecutarValidaciones @@@@@@");
		String paso = "Ejecutando validaciones";
		List<Map<String, String>> validaciones = new ArrayList<Map<String, String>>();
		try {
			for (String bloque : cdbloque) {
			    validaciones.addAll(emisionDAO.ejecutarValidaciones(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, null,
						bloque));
			}
		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		logger.debug(Utils.join("\n@@@@@@ ejecutarValidaciones validaciones = ", validaciones));
		return validaciones;
	}

	@Override
	public Map<String, Object> generarTarificacion(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsituac) throws Exception {
		String paso = null;
		Map<String, Object> res = null;
		try {
			paso = "Tarificando situaciones";
			List<Map<String, String>> situacionesPoliza = situacionDAO.obtieneMpolisit(cdunieco, cdramo, estado,
					nmpoliza, nmsituac, "0");
			for (Map<String, String> situac : situacionesPoliza) {
				logger.debug("Inicio tarificando inciso {} de cdunieco={}, cdramo:{}, nmpoliza:{}",
						situac.get("nmsituac"), cdunieco, cdramo, nmpoliza);
				res = emisionDAO.generarTarificacion(cdunieco, cdramo, estado, nmpoliza, situac.get("nmsituac"));
				logger.debug("Fin    tarificando inciso {} de cdunieco={}, cdramo:{}, nmpoliza:{}",
						situac.get("nmsituac"), cdunieco, cdramo, nmpoliza);
			}

			paso = "Tarificando conceptos globales";
			emisionDAO.ejecutarValoresDefecto(cdunieco, cdramo, estado, nmpoliza, "0", "0",
					Bloque.TARIFICACION_POLIZA_SITU.getCdbloque(), "NULO");

			emisionDAO.distribuirAgrupadores(cdunieco, cdramo, estado, nmpoliza, "0");
		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		return res;
	}
	
	@Override
	public List<Map<String, Object>> generarTarificacionPlanes(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac) throws Exception {
		String paso = null;
		Map<String, Object> res = null;
		List<Map<String, Object>> resultados = new ArrayList<Map<String, Object>>();
		String formaPagoValor = null;
		SimpleDateFormat renderFechas = new SimpleDateFormat("dd/MM/yyyy");
		
		List<Map<String, String>> formasPago = null;
		List<Map<String, String>> mpolizas = null;
		Map<String, String> mpoliza = null;
		
		try {			
			paso = "Tarificando situaciones";
			
			// Paso 1 Borrar tablas temporales ZWORKCT1_COT Y ZWORKCT2_COT			
			emisionDAO.movimientoZworkcts(cdunieco, cdramo, estado, nmpoliza, "0");
			
			// Paso 2 Recuperar lista de formas de pago
			formasPago = emisionDAO.obtenerFormasPago(cdunieco, cdramo, estado, nmpoliza, "0");
			
			// Paso 3 Respaldar MPOLIZAS
			mpolizas = emisionDAO.obtieneMpolizas(cdunieco, cdramo, estado, nmpoliza, "0");
						
			if(mpolizas!=null && !mpolizas.isEmpty()) {
				mpoliza = mpolizas.get(0);
				formaPagoValor = mpoliza.get("cdperpag");
			}
			
			for(Map<String, String> formaPago : formasPago) {
								
				// 4 Por cada forma de pago actualizar MPOLIZAS CDPERPAGO
				logger.info("Actualizando mpolizas con forma de pago " + formaPago.get("codigo"));
				emisionDAO.movimientoMpolizas(mpoliza.get("cdunieco"), mpoliza.get("cdramo"), mpoliza.get("estado"), mpoliza.get("nmpoliza"),
						  mpoliza.get("nmsuplem"), mpoliza.get("nmsuplem"), mpoliza.get("status"), mpoliza.get("swestado"),
						  mpoliza.get("nmsolici"), 
						  mpoliza.get("feautori") != null && !mpoliza.get("feautori").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feautori")) : null, 
						  mpoliza.get("cdmotanu"), 
						  mpoliza.get("feanulac") != null && !mpoliza.get("feanulac").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feanulac")) : null, 
						  mpoliza.get("swautori"), mpoliza.get("cdmoneda"), 
						  mpoliza.get("feinisus") != null && !mpoliza.get("feinisus").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feinisus")) : null,
						  mpoliza.get("fefinsus") != null && !mpoliza.get("fefinsus").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("fefinsus")) : null,
						  mpoliza.get("ottempot"), 
						  mpoliza.get("feefecto") != null && !mpoliza.get("feefecto").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feefecto")) : null, 
						  mpoliza.get("hhefecto"),
						  mpoliza.get("feproren") != null && !mpoliza.get("feproren").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feproren")) : null, 
						  mpoliza.get("fevencim") != null && !mpoliza.get("fevencim").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("fevencim")) : null, 
						  mpoliza.get("nmrenova"), 
						  mpoliza.get("ferecibo") != null && !mpoliza.get("ferecibo").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("ferecibo")) : null,
						  mpoliza.get("feultsin") != null && !mpoliza.get("feultsin").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feultsin")) : null, 
						  mpoliza.get("nmnumsin"), mpoliza.get("cdtipcoa"), mpoliza.get("swtarifi"), mpoliza.get("swabrido"), 
						  mpoliza.get("feemisio") != null && !mpoliza.get("feemisio").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feemisio")) : null,
						  formaPago.get("codigo"), mpoliza.get("nmpoliex"), mpoliza.get("nmcuadro"), mpoliza.get("porredau"),
						  mpoliza.get("swconsol"), mpoliza.get("nmpolcoi"), mpoliza.get("adparben"), mpoliza.get("nmcercoi"), mpoliza.get("cdtipren"), 
						  "U");
				
				
				List<Map<String, String>> situacionesPoliza = situacionDAO.obtieneMpolisit(cdunieco, cdramo, estado, nmpoliza, nmsituac, "0");
				
				for (Map<String, String> situac : situacionesPoliza) {
					
					logger.debug("Inicio tarificando inciso {} de cdunieco={}, cdramo:{}, nmpoliza:{}",	situac.get("nmsituac"), cdunieco, cdramo, nmpoliza);
					
					resultados.add(res = emisionDAO.generarTarificacion(cdunieco, cdramo, estado, nmpoliza, situac.get("nmsituac")));
					
					logger.debug("Fin    tarificando inciso {} de cdunieco={}, cdramo:{}, nmpoliza:{}",
							situac.get("nmsituac"), cdunieco, cdramo, nmpoliza);
				}
				
				paso = "Tarificando conceptos globales";
				emisionDAO.ejecutarValoresDefecto(cdunieco, cdramo, estado, nmpoliza, "0", "0", Bloque.TARIFICACION_POLIZA_SITU.getCdbloque(), "NULO");
				
				
				emisionDAO.distribuirAgrupadores(cdunieco, cdramo, estado, nmpoliza, "0");
				
				emisionDAO.movimientoZworkctsCopiado(cdunieco, cdramo, estado, nmpoliza, "0");
			}			
			
			// 5 Restaurar MPOLIZAS CDPERPAGO
			logger.info("Actualizando mpolizas con el valor original" + mpoliza.get("cdperpag"));
			emisionDAO.movimientoMpolizas(mpoliza.get("cdunieco"), mpoliza.get("cdramo"), mpoliza.get("estado"), mpoliza.get("nmpoliza"),
										  mpoliza.get("nmsuplem"), mpoliza.get("nmsuplem"), mpoliza.get("status"), mpoliza.get("swestado"),
										  mpoliza.get("nmsolici"), 
										  mpoliza.get("feautori") != null && !mpoliza.get("feautori").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feautori")) : null, 
										  mpoliza.get("cdmotanu"), 
										  mpoliza.get("feanulac") != null && !mpoliza.get("feanulac").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feanulac")) : null, 
										  mpoliza.get("swautori"), mpoliza.get("cdmoneda"), 
										  mpoliza.get("feinisus") != null && !mpoliza.get("feinisus").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feinisus")) : null,
										  mpoliza.get("fefinsus") != null && !mpoliza.get("fefinsus").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("fefinsus")) : null,
										  mpoliza.get("ottempot"), 
										  mpoliza.get("feefecto") != null && !mpoliza.get("feefecto").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feefecto")) : null, 
										  mpoliza.get("hhefecto"),
										  mpoliza.get("feproren") != null && !mpoliza.get("feproren").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feproren")) : null, 
										  mpoliza.get("fevencim") != null && !mpoliza.get("fevencim").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("fevencim")) : null, 
										  mpoliza.get("nmrenova"), 
										  mpoliza.get("ferecibo") != null && !mpoliza.get("ferecibo").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("ferecibo")) : null,
										  mpoliza.get("feultsin") != null && !mpoliza.get("feultsin").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feultsin")) : null, 
										  mpoliza.get("nmnumsin"), mpoliza.get("cdtipcoa"), mpoliza.get("swtarifi"), mpoliza.get("swabrido"), 
										  mpoliza.get("feemisio") != null && !mpoliza.get("feemisio").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feemisio")) : null,
										  mpoliza.get("cdperpag"), mpoliza.get("nmpoliex"), mpoliza.get("nmcuadro"), mpoliza.get("porredau"), 
										  mpoliza.get("swconsol"), mpoliza.get("nmpolcoi"), mpoliza.get("adparben"), mpoliza.get("nmcercoi"), mpoliza.get("cdtipren"), 
										  "U");
			
		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		
		return resultados;
	}
	
	@Override
	public Map<String, Object> generarTarificacionPlan(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsituac, String cdperpag, String cdusuari, String cdsisrol) throws Exception {
		String paso = null;
		Map<String, Object> res = null;		
		List<Map<String, String>> mpolizas = null;
		Map<String, String> mpoliza = null;
		SimpleDateFormat renderFechas = new SimpleDateFormat("dd/MM/yyyy");
		String documentoRuta = "";
		String nombreExtension = "";
		StringBuilder path = new StringBuilder();
		List<Documento> documentos = null;
		boolean exito = false;
		
		logger.debug("\n@@@@@@ generarTarificacionPlan @@@@@@");
		
		try{
			
			mpolizas = emisionDAO.obtieneMpolizas(cdunieco, cdramo, estado, nmpoliza, "0");
			
			if(mpolizas!=null && !mpolizas.isEmpty() && mpolizas.get(0) != null ){
				mpoliza = mpolizas.get(0);
				
				emisionDAO.movimientoMpolizas(mpoliza.get("cdunieco"), mpoliza.get("cdramo"), mpoliza.get("estado"), mpoliza.get("nmpoliza"),
						  mpoliza.get("nmsuplem"), mpoliza.get("nmsuplem"), mpoliza.get("status"), mpoliza.get("swestado"),
						  mpoliza.get("nmsolici"), 
						  mpoliza.get("feautori") != null && !mpoliza.get("feautori").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feautori")) : null, 
						  mpoliza.get("cdmotanu"), 
						  mpoliza.get("feanulac") != null && !mpoliza.get("feanulac").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feanulac")) : null, 
						  mpoliza.get("swautori"), mpoliza.get("cdmoneda"), 
						  mpoliza.get("feinisus") != null && !mpoliza.get("feinisus").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feinisus")) : null,
						  mpoliza.get("fefinsus") != null && !mpoliza.get("fefinsus").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("fefinsus")) : null,
						  mpoliza.get("ottempot"), 
						  mpoliza.get("feefecto") != null && !mpoliza.get("feefecto").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feefecto")) : null, 
						  mpoliza.get("hhefecto"),
						  mpoliza.get("feproren") != null && !mpoliza.get("feproren").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feproren")) : null, 
						  mpoliza.get("fevencim") != null && !mpoliza.get("fevencim").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("fevencim")) : null, 
						  mpoliza.get("nmrenova"), 
						  mpoliza.get("ferecibo") != null && !mpoliza.get("ferecibo").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("ferecibo")) : null,
						  mpoliza.get("feultsin") != null && !mpoliza.get("feultsin").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feultsin")) : null, 
						  mpoliza.get("nmnumsin"), mpoliza.get("cdtipcoa"), mpoliza.get("swtarifi"), mpoliza.get("swabrido"), 
						  mpoliza.get("feemisio") != null && !mpoliza.get("feemisio").toLowerCase().equals("null") ? renderFechas.parse(mpoliza.get("feemisio")) : null,
						  cdperpag, mpoliza.get("nmpoliex"), mpoliza.get("nmcuadro"), mpoliza.get("porredau"),
						  mpoliza.get("swconsol"), mpoliza.get("nmpolcoi"), mpoliza.get("adparben"), mpoliza.get("nmcercoi"), mpoliza.get("cdtipren"), 
						  "U");
				
			}			
			
			res = generarTarificacion(cdunieco, cdramo, estado, nmpoliza, nmsituac);
			
			// marcar la cotizacion como confirmada
			Map<String, String> tvaloaux = null;
			String accionTvaloaux = "U";
			try {
			    tvaloaux = emisionDAO.obtenerTvaloaux(cdunieco, cdramo, estado, nmpoliza, Bloque.DATOS_GENERALES.getCdbloque(),
			            "-1", // nmsituac
			            "*", // cdgarant
			            "0", //nmsuplem
			            "V" //status
			            ).get(0);
			} catch (Exception e) {
			    tvaloaux = new LinkedHashMap<String, String>();
			    accionTvaloaux = "I";
			}
			
			tvaloaux.put("otvalor04", "S");
			tvaloaux.put("otvalor05", cdusuari);
			tvaloaux.put("otvalor06", cdsisrol);
			
			emisionDAO.ejecutarMovimientoTvaloaux(cdunieco, cdramo, estado, nmpoliza,
			        Bloque.DATOS_GENERALES.getCdbloque(),
			        "-1", // nmsituac
			        "*", // cdgarant
			        "0", // nmsuplem
			        "V", // status
			        tvaloaux.get("otvalor01"), tvaloaux.get("otvalor02"), tvaloaux.get("otvalor03"), tvaloaux.get("otvalor04"), tvaloaux.get("otvalor05"),
	                tvaloaux.get("otvalor06"), tvaloaux.get("otvalor07"), tvaloaux.get("otvalor08"), tvaloaux.get("otvalor09"), tvaloaux.get("otvalor10"),
                    tvaloaux.get("otvalor11"), tvaloaux.get("otvalor12"), tvaloaux.get("otvalor13"), tvaloaux.get("otvalor14"), tvaloaux.get("otvalor15"),
			        accionTvaloaux);
			
			// Borrar ZWORK
			emisionDAO.movimientoZworkcts(cdunieco, cdramo, estado, nmpoliza, "0");
			
			
			paso = new StringBuilder("Obteniendo documentos de la p\u00f3liza ").append(nmpoliza).toString();
			
			try{
				logger.debug("Obteniendo documentos de la p\u00f3liza {} {} {} {} {}", cdunieco, cdramo, estado, nmpoliza, "0");
				documentos = impresionManager.getDocumentos(cdunieco, cdramo, estado, nmpoliza, "0");
				logger.debug("Fin de obteniendo documentos de la p\u00f3liza {} {} {} {} {}", cdunieco, cdramo, estado, nmpoliza, "0");
			}catch(Exception e){
				logger.error(e.getMessage(), e);
			}			
			
			path.append(generaRutaLlave(directorioBase, cdunieco, cdramo, estado, nmpoliza, "0"));			
			
			paso = new StringBuilder("Guardando documentos de la p\u00f3liza ").append(nmpoliza).toString();			
			
			if(documentos != null) {
				
				logger.debug("Numero de documentos devueltos para la Cotizacion {} " + documentos.size());
			
				// 	Se guardan la lista de documentos:
				for (Documento documento : documentos) {
					
					String nmsolici = null; //TODO: agregar
					String ntramite = "1";  //TODO: agregar
					String cdtiptra = "1"; //TODO: agregar
					String codidocu = null; //TODO: agregar
					String cdorddoc = null; //TODO: agregar
					String cdmoddoc = null; //TODO: agregar
					String nmcertif = null; //TODO: agregar
					//String nmsituac = null; //TODO: agregar
					//String cdtipsub = datosMrecibo.get("cdtipsup");
					
					try
					{   
						logger.info(documento.getId());
						logger.info(documento.getNombre());
						logger.info(documento.getTipo());
						logger.info(documento.getUrl());
						
						
						documentoRuta = path + documento.getNombre() + (documento.getTipo()!=null ? TipoArchivo.RTF.getExtension() : TipoArchivo.PDF.getExtension());
						nombreExtension = documento.getNombre() + (documento.getTipo()!=null ? TipoArchivo.RTF.getExtension() : TipoArchivo.PDF.getExtension());
						
						//boolean exito = HttpUtil.generaArchivo(documento.getUrl(), documentoRuta);
						exito = false;
						try {
							FileUtils.copyURLToFile(new URL(documento.getUrl()), new File(documentoRuta), 10000, 10000);
							exito = true;
						}catch(Exception fe){
							logger.error(fe.getMessage(), fe);
						}
              		
						documentosDAO.realizarMovimientoDocsPoliza(cdunieco, cdramo, estado, nmpoliza, nmsolici, "0", ntramite, new Date(),
										documento.getId(), nombreExtension, "90", exito ? Constantes.SI : Constantes.NO, cdtiptra, codidocu, cdorddoc, 
										cdmoddoc, nmcertif, nmsituac, documento.getUrl(), path.toString(), documento.getTipo(), 
										Constantes.INSERT_MODE);             		
					
					}catch(Exception e) {
						logger.error(e.getMessage(), e);
						continue;
					}
				}
			} else {
				res.put("message", "Fallo al cargar documentos");
			}
			
		}catch(Exception e) {
			Utils.generaExcepcion(e, paso);
		}
		
		return res;
	}
	
	private String generaRutaLlave(String...carpetas){
		StringBuilder sb = null;
		if(carpetas != null) {
			sb = new StringBuilder();
			for(String carpeta : carpetas) {
				
				sb.append(carpeta);
				sb.append(File.separator);				
				
			}
		}
		return sb != null ?  sb.toString() : null;
	}
	
	@Override
	public List<Map<String, String>> obtenerDatosTarificacion(String cdunieco, String cdramo, String estado,
			String nmpoliza) throws Exception {
		//return emisionDAO.obtenerDatosTarificacion(cdunieco, cdramo, estado, nmpoliza);
		return  emisionDAO.obtenerDetalleTarificacion(cdunieco, cdramo, estado, nmpoliza);
	}

	@Override
	public Map<String, Object> distribuirAgrupadores(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsuplem) throws Exception {

		String paso = null;
		Map<String, Object> res = null;
		try {
			paso = "Distribuyendo agrupadores";

			try {

				res = emisionDAO.distribuirAgrupadores(cdunieco, cdramo, estado, nmpoliza, nmsuplem);

			} catch (Exception ex) {
				logger.error("Error al llamar funcion de distribucionAgrupadores");
			}

		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		return res;
	}

	@Override
	public Map<String, String> confirmarPoliza(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsuplem, String newestad, String newpoliza, String pnmrecibo) throws Exception {
		
		logger.debug("\n@@@@@@ confirmarPoliza @@@@@@");
		Map<String, String> results = new HashMap<String, String>();
		String paso = null, nmpolizaEmitida = null;
		Map<String, String> datosMrecibo = null;		
		RequestWs request = null;
		String documentoRuta = "";
		String nombreExtension = "";
		StringBuilder path = new StringBuilder();
		List<Documento> documentos = null;
		boolean exito  = false;
		try {
		    paso = "Confirmando p\u00f3liza";
			nmpolizaEmitida = emisionDAO.confirmarPoliza(cdunieco, cdramo, estado, nmpoliza, nmsuplem, pnmrecibo);
			results.put("polizaemitida", nmpolizaEmitida);
			estado = EstadoPoliza.MASTER.getClave();
			nmpoliza = nmpolizaEmitida;
			logger.info("Poliza emitida: {}", nmpoliza);	
			
			
			// Obteniendo nmrecibo para obtener el nmrecibo de la poliza emitida
			datosMrecibo = emisionDAO.obtenerDatosConfirmacion(cdunieco, cdramo, estado, nmpolizaEmitida, null).get(0);
			
			logger.info("ObtenerDatosConfirmacion ", datosMrecibo);
			
			// Construir Request para el servicio de aplicar pago
			request = new RequestWs();
			request.setCdunieco(Integer.parseInt(cdunieco));
			request.setCdramo(Integer.parseInt(cdramo));
			request.setNmpoliza(Integer.parseInt(nmpoliza));
			request.setNmrecibo(Integer.parseInt(datosMrecibo.get("nmrecibo")));
			
			paso = new StringBuilder("Aplicando recibo en ALEA de la p\u00f3liza ").append(nmpoliza).toString();			
			try{
				pagoManager.aplicaPago(request);
			}catch(Exception e){
				logger.error(e.getMessage(), e);
			}
			
			paso = new StringBuilder("Obteniendo documentos de la p\u00f3liza ").append(nmpoliza).toString();
			
			try{
			logger.debug("Obteniendo documentos de la p\u00f3liza {} {} {} {} {}", cdunieco, cdramo, estado, nmpoliza, nmsuplem);
			documentos = impresionManager.getDocumentos(cdunieco, cdramo, "M", nmpoliza, nmsuplem);
			logger.debug("Fin de obteniendo documentos de la p\u00f3liza {} {} {} {} {}", cdunieco, cdramo, estado, nmpoliza, "0");
			}catch(Exception e){
				logger.error(e.getMessage(), e);
			}
			
			
			// Especificar el path para almacenar documentos
			
			path.append(generaRutaLlave(directorioBase, cdunieco, cdramo, "M", nmpolizaEmitida, datosMrecibo.get("nmsuplem")));
			
			paso = new StringBuilder("Guardando documentos de la p\u00f3liza ").append(nmpoliza).toString();
			
			if(documentos != null) {
				
				logger.debug("Numero de documentos devueltos para la Confirmacion {} " + documentos.size());
			
				// Se guardan la lista de documentos:
				for (Documento documento : documentos) {
					
					String nmsolici = null; //TODO: agregar
					String ntramite = "1";  //TODO: agregar
					String cdtiptra = "1"; //TODO: agregar
					String codidocu = null; //TODO: agregar
					String cdorddoc = null; //TODO: agregar
					String cdmoddoc = null; //TODO: agregar
					String nmcertif = null; //TODO: agregar
					String nmsituac = null; //TODO: agregar
					String cdtipsub = datosMrecibo.get("cdtipsup");
					
					try
					{   
						logger.info(documento.getId());
						logger.info(documento.getNombre());
						logger.info(documento.getTipo());
						logger.info(documento.getUrl());
						
						
						documentoRuta = path+documento.getNombre() + (documento.getTipo()!=null ? TipoArchivo.RTF.getExtension() : TipoArchivo.PDF.getExtension());
						nombreExtension = documento.getNombre() + (documento.getTipo()!=null ? TipoArchivo.RTF.getExtension() : TipoArchivo.PDF.getExtension());
						
						//	boolean exito = HttpUtil.generaArchivo(documento.getUrl(), documentoRuta);
						exito = false;
						try {
							FileUtils.copyURLToFile(new URL(documento.getUrl()), new File(documentoRuta), 10000, 10000);
							exito = true;
						}catch(Exception fe){
							logger.error(fe.getMessage(), fe);
						}
						
						documentosDAO.realizarMovimientoDocsPoliza(cdunieco, cdramo, "M", nmpolizaEmitida, nmsolici, datosMrecibo.get("nmsuplem"), ntramite, new Date(),
										documento.getId(), nombreExtension, cdtipsub, exito ? Constantes.SI : Constantes.NO,
										cdtiptra, codidocu, cdorddoc, cdmoddoc, nmcertif, nmsituac, documento.getUrl(), path.toString(), documento.getTipo(), Constantes.INSERT_MODE);
              		              		
					
					}catch(Exception e) {
						logger.error(e.getMessage(), e);
						continue;
					}
				}
			} else {
				results.put("message", "Fallo al cargar documentos");				
			}
			
		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		} finally {
			path.setLength(0);
			path = null;
			request = null;
		}
		logger.debug("\n@@@@@@ confirmarPoliza @@@@@@");
		
		return results;
	}
	
	
	@Override
	public String realizarPagoTarjeta(String cdunieco, String cdramo, String estado, String nmpoliza, 
    		String nmsuplem, String cdbanco, String dsbanco, String nmtarjeta, 
    		String codseg, String fevencm, String fevenca, String nombre, String email, String usuario) throws Exception {
		
		logger.debug(Utils.join("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", "\n@@@@@@ realizarPago"));
		
		String paso = "";		
		String resultado = null;		
		Map<String, String> datosPago = null;
		
		Banco banco = null;
		Tarjeta tarjeta = null;
		RequestWs request = null;
		
		try{
			paso = "Consultando datos para el ralizar el pago con tarjeta";
			
			datosPago = emisionDAO.obtenerDatosPago(cdunieco, cdramo, estado, nmpoliza, nmsuplem).get(0);			
			
			paso = "Validando datos para realizar el pago";
			
			// datos del banco
			String claveBanco = cdbanco,
				   descBanco = dsbanco,				   
				   // datos de la tarjeta
				   numeroTarjeta = nmtarjeta,
				   codigoSeguridad = codseg,
				   tipo = "C",
				   descTipo = "CREDITO",
				   codigo = codseg,
				   fechaVencimiento = fevencm+"/"+fevenca,
				   tarjetahabiente = nombre,			   
				   // Datos de la solicitud				  
				   //nmrecibo = datosPago.get("nmrecibo"),
				   importe = datosPago.get("ptimport"),
				   moneda = datosPago.get("cdmoneda");		
			
			
			paso = "Generando objetos de RequestWS";			
		
            banco = new Banco();
            banco.setClaveBanco(claveBanco);
            banco.setDescBanco(descBanco);
            banco.setLstGestores(null);

            tarjeta = new Tarjeta(numeroTarjeta);
            tarjeta.setCodigoSeguridad(codseg);
            tarjeta.setTipo("C");
            tarjeta.setDescTipo("CREDITO");
            tarjeta.setCodigo(numeroTarjeta.substring(0, 4));
            tarjeta.setFechaVencimiento(fechaVencimiento);
            tarjeta.setTarjetahabiente(nombre);
            tarjeta.setBanco(banco);

            request = new RequestWs();
            request.setCdunieco(Integer.parseInt(cdunieco));
            request.setCdramo(Integer.parseInt(cdramo));
            request.setNmpoliza(Integer.parseInt(nmpoliza));
            //request.setNmrecibo(Integer.parseInt(nmrecibo));
            request.setImporte(Double.parseDouble(importe));
            request.setMoneda(moneda);

            request.setEmail(email);
            request.setUsuario(usuario);
            request.setTarjeta(tarjeta);            
            
            logger.debug("Consultando servicio de pago ", request);
            
            TransactionResponse transaccionResponse = pagoManager.realizaPago(request);
            
            logger.debug("Fin de la consulta del servicio de pago ");
            logger.debug("Valor obtenido ", transaccionResponse);
            
            if(transaccionResponse != null && transaccionResponse.getAuthCode() == "") {
            	logger.info("Codigo de autorizacion: " + transaccionResponse.getAuthCode());
                logger.info("Codigo de Error " + transaccionResponse.getCcErrCode());
                logger.info("Mensage de respuesta " + transaccionResponse.getCcReturnMsg());
                logger.info(transaccionResponse.getDcError());
                logger.info(transaccionResponse.getParamError());
                logger.info(transaccionResponse.getProcReturnCode());
                logger.info(transaccionResponse.getProcReturnMsg());
                logger.info(transaccionResponse.getProcReturnMsg());
                logger.info(transaccionResponse.getResponseCode());
                logger.info(transaccionResponse.getText());
                logger.info(transaccionResponse.getTimeOut());
                logger.info(transaccionResponse.getTotal());
            	
            	throw new Exception(transaccionResponse.getDcError());
            
            }
            
            
            resultado = transaccionResponse.getAuthCode();
						
			
		}catch(Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}		
		logger.debug(Utils.join("\n@@@@@@ obtenerTarifaMultipleTemp", "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));
		
		return resultado;
	}
		
	@Override
	public List<Map<String, String>> obtenerTarifaMultipleTemp(String cdunieco, String cdramo, String estado,
			String nmpoliza) throws Exception {
		logger.debug(Utils.join("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", "\n@@@@@@ obtenerTarifaMultipleTemp"));
		String paso = "";
		List<Map<String, String>> datos = null;
		try {
			paso = "Consultando datos";
			datos = emisionDAO.obtenerTarifaMultipleTemp(cdunieco, cdramo, estado, nmpoliza);
		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		logger.debug(Utils.join("\n@@@@@@ obtenerTarifaMultipleTemp", "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));
		return datos;
	}

	@Override
	public List<Map<String, String>> obtenerDetalleTarifaTemp(String cdunieco, String cdramo, String estado,
			String nmpoliza, String cdperpag) throws Exception {
		logger.debug(Utils.join("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", "\n@@@@@@ obtenerTarifaMultipleTemp"));
		String paso = "";
		List<Map<String, String>> datos = null;
		try {
			paso = "Consultando datos";
			datos = emisionDAO.obtenerDetalleTarifaTemp(cdunieco, cdramo, estado, nmpoliza, cdperpag);
		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		logger.debug(Utils.join("\n@@@@@@ obtenerTarifaMultipleTemp", "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));
		return datos;
	}
	
	@Override
	public Map<String, String> validarCargaCotizacion (String cdunieco, String cdramo, String nmpoliza, String cdusuari,
            String cdsisrol) throws Exception {
	    Map<String, String> cot = null;
	    String paso = "Validando cotizaci\u00f3n";
	    try {
	        cot = emisionDAO.validarCargaCotizacion(cdunieco, cdramo, nmpoliza, cdusuari, cdsisrol);
	        
	    } catch (Exception e) {
	        Utils.generaExcepcion(e, paso);
	    }
	    return cot;
	}
}
