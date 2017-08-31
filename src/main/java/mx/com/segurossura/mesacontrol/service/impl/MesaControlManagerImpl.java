package mx.com.segurossura.mesacontrol.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;

import mx.com.segurossura.emision.dao.AgentesDAO;
import mx.com.segurossura.general.cmp.dao.ComponentesDAO;
import mx.com.segurossura.mesacontrol.dao.MesaControlDAO;
import mx.com.segurossura.mesacontrol.service.MesaControlManager;
import mx.com.segurossura.workflow.despachador.service.DespachadorManager;
import mx.com.segurossura.workflow.mesacontrol.dao.FlujoMesaControlDAO;

@Service("mesaControlManagerImplNew")
public class MesaControlManagerImpl implements MesaControlManager {
	
	private static final Logger logger = LoggerFactory.getLogger(MesaControlManagerImpl.class);
	
	@Autowired
	private MesaControlDAO mesaControlDAO;
	
	@Autowired
	private DespachadorManager despachadorManager;
	
	@Autowired
	private FlujoMesaControlDAO flujoMesaControlDAO;
	
	@Autowired
	private ComponentesDAO componentesDAO;
	
	@Autowired
	private AgentesDAO agentesDAO;
	
	@Override
	public List<Map<String, String>> obtenerTramites(String cdunieco, String cdramo, String estado, String nmpoliza,
			String cdagente, String ntramite, String estatus, Date desde, Date hasta, String nombre, String nmsolici, String cdusuari, String cdsisrol, long start, long limit)
			throws Exception {
		
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtenerMesaControl"				
				));
		String paso = "";
        List<Map<String, String>> datos = null;
		try {
			paso="Consultando tramites de mesa de control";
			datos = mesaControlDAO.obtenerTramites(cdunieco, cdramo, estado, nmpoliza, cdagente, ntramite, estatus, desde, hasta, nombre, nmsolici, cdusuari, cdsisrol, start, limit);
			
        } catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtenerMesaControl"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}

	@Override
	public String movimientoTmesacontrol(String ntramite, String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsuplem, String nmsolici, String cdsucadm, String cdsucdoc, String cdtiptra, Date ferecepc,
			String cdagente, String referencia, String nombre, Date fecstatu, String estatus, String comments,
			String cdtipsit, String otvalor01, String otvalor02, String otvalor03, String otvalor04, String otvalor05,
			String otvalor06, String otvalor07, String otvalor08, String otvalor09, String otvalor10, String otvalor11,
			String otvalor12, String otvalor13, String otvalor14, String otvalor15, String otvalor16, String otvalor17,
			String otvalor18, String otvalor19, String otvalor20, String otvalor21, String otvalor22, String otvalor23,
			String otvalor24, String otvalor25, String otvalor26, String otvalor27, String otvalor28, String otvalor29,
			String otvalor30, String otvalor31, String otvalor32, String otvalor33, String otvalor34, String otvalor35,
			String otvalor36, String otvalor37, String otvalor38, String otvalor39, String otvalor40, String otvalor41,
			String otvalor42, String otvalor43, String otvalor44, String otvalor45, String otvalor46, String otvalor47,
			String otvalor48, String otvalor49, String otvalor50, String swimpres, String cdtipflu, String cdflujomc,
			String cdusuari, String cdtipsup, String swvispre, String cdpercli, String renuniext, String renramo,
			String renpoliex, String sworigenmesa, String cdrazrecha, String cdunidspch, String ntrasust,
			String cdsisrol, String accion) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ movimientoTmesacontrol"				
				));
		String paso = null,
		       rntramite = "";
		try {
		    Date fechaHoy = new Date();
		    ferecepc = fechaHoy; // siempre debe ser la del momento
		    fecstatu = fechaHoy; // siempre debe ser la del momento
		    
		    // recuperar cdtiptra
		    List<Map<String, String>> listaTiposFlujo = flujoMesaControlDAO.recuperaTtipflumc(null, "1");
		    cdtiptra = null;
		    for (Map<String, String> tipoFlujoIte : listaTiposFlujo) {
		        if (cdtipflu.equals(tipoFlujoIte.get("CDTIPFLU"))) {
		            cdtiptra = tipoFlujoIte.get("CDTIPTRA");
		            break;
		        }
		    }
		    if (cdtiptra == null) {
		        throw new ApplicationException("No hay tipo de tr\u00e1mite");
		    }
		    
			if((!StringUtils.isEmpty(cdunieco) && !StringUtils.isEmpty(cdramo) &&
				!StringUtils.isEmpty(estado)   && !StringUtils.isEmpty(nmpoliza))){
			    paso = "Verificando p\u00f3liza";
				String nmsuplemBD = null;
				try {
				    nmsuplemBD = mesaControlDAO.existePoliza(cdunieco, cdramo, estado, nmpoliza);
				    if (StringUtils.isBlank(nmsuplemBD)) {
				        throw new ApplicationException("no hay nmsuplem");
				    }
				    if (StringUtils.isBlank(nmsuplem)) { // si no viene nmsuplem
				        nmsuplem = nmsuplemBD;
				    } else if ("M".equals(estado) && "0".equals(nmsuplem)) { // si viene 0 pero es maestra
				        nmsuplem = nmsuplemBD;
				    }
				} catch (Exception ex) {
				    throw new ApplicationException(Utils.join("La póliza ",cdunieco,"-",cdramo,"-",estado,"-",nmpoliza," no existe."));
				}
			}
			
			// Si viene cdagente y cdramo validar su cedula
			if(!StringUtils.isEmpty(cdagente) && !StringUtils.isEmpty(cdramo)) {
				boolean cedulaValida = false;
				cedulaValida = agentesDAO.validaAgente(cdagente, cdramo, "E");
		        if(!cedulaValida){
		           throw new ApplicationException("La cedula del agente no es valida");
		        }
			}
			
			paso = "Registrando tr\u00e1mite";
			rntramite = mesaControlDAO.movimientoTmesacontrol(ntramite, cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmsolici, cdsucadm, cdsucdoc,
			        cdtiptra, ferecepc, cdagente, referencia, nombre, fecstatu, estatus, comments, cdtipsit,
			        otvalor01, otvalor02, otvalor03, otvalor04, otvalor05, otvalor06, otvalor07, otvalor08, otvalor09, otvalor10,
			        otvalor11, otvalor12, otvalor13, otvalor14, otvalor15, otvalor16, otvalor17, otvalor18, otvalor19, otvalor20,
			        otvalor21, otvalor22, otvalor23, otvalor24, otvalor25, otvalor26, otvalor27, otvalor28, otvalor29, otvalor30,
			        otvalor31, otvalor32, otvalor33, otvalor34, otvalor35, otvalor36, otvalor37, otvalor38, otvalor39, otvalor40,
			        otvalor41, otvalor42, otvalor43, otvalor44, otvalor45, otvalor46, otvalor47, otvalor48, otvalor49, otvalor50,
			        swimpres, cdtipflu, cdflujomc, cdusuari, cdtipsup, swvispre, cdpercli, renuniext, renramo, renpoliex, sworigenmesa,
			        cdrazrecha, cdunidspch, ntrasust, cdsisrol, accion);
			
			paso = "Guardando detalles de tr\u00e1mite";
			despachadorManager.turnarTramite(cdusuari, cdsisrol, rntramite, estatus,
			        Utils.join("Se registra un nuevo tr\u00e1mite desde la mesa de control: ",
			                StringUtils.isBlank(comments)
			                    ? "(sin observaciones)"
			                    : comments
			                ),
			        null, //cdrazrecha,
			        cdusuari,
			        cdsisrol,
			        true, //permisoAgente,
			        false, //porEscalamiento,
			        fechaHoy,
			        false, //sinGrabarDetalle,
			        true, //sinBuscarRegreso,
			        null, //ntrasust,
			        false, //soloCorreosRecibidos,
			        null //correosRecibidos
			        );
			
       } catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		
		logger.debug(Utils.join(
				 "\n@@@@@@ movimientoTmesacontrol"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return rntramite;
		
	}
	
	@Override
	public String registrarNuevoTramite(String ntramite, String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsuplem, String nmsolici, String cdsucadm, String cdsucdoc, String cdtiptra, Date ferecepc, String cdagente,
			String referencia, String nombre, Date fecstatu, String estatus, String comments, String cdtipsit, String otvalor01, 
			String otvalor02, String otvalor03, String otvalor04, String otvalor05, String otvalor06, String otvalor07, String otvalor08,
			String otvalor09, String otvalor10, String otvalor11, String otvalor12, String otvalor13, String otvalor14, String otvalor15,
			String otvalor16, String otvalor17, String otvalor18, String otvalor19, String otvalor20, String otvalor21, String otvalor22,
			String otvalor23, String otvalor24, String otvalor25, String otvalor26, String otvalor27, String otvalor28, String otvalor29,
			String otvalor30, String otvalor31, String otvalor32, String otvalor33, String otvalor34, String otvalor35, String otvalor36,
			String otvalor37, String otvalor38, String otvalor39, String otvalor40, String otvalor41, String otvalor42, String otvalor43,
			String otvalor44, String otvalor45, String otvalor46, String otvalor47, String otvalor48, String otvalor49, String otvalor50,
			String swimpres, String cdtipflu, String cdflujomc, String cdusuari, String cdtipsup, String swvispre, String cdpercli, 
			String renuniext, String renramo, String renpoliex, String sworigenmesa, String cdrazrecha, String cdunidspch, String ntrasust,
			String cdsisrol) throws Exception {
		
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ registrarNuevoTramite"				
				));
		
		String paso = null, rntramite = "";
			
		try {
			
			 Date fechaHoy = new Date();
			 ferecepc = fechaHoy; // siempre debe ser la del momento
			 fecstatu = fechaHoy; // siempre debe ser la del momento
			
			paso = "Registrando tr\u00e1mite";
			rntramite = mesaControlDAO.movimientoTmesacontrol(ntramite, cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmsolici, cdsucadm, cdsucdoc,
			        cdtiptra, ferecepc, cdagente, referencia, nombre, fecstatu, estatus, comments, cdtipsit,
			        otvalor01, otvalor02, otvalor03, otvalor04, otvalor05, otvalor06, otvalor07, otvalor08, otvalor09, otvalor10,
			        otvalor11, otvalor12, otvalor13, otvalor14, otvalor15, otvalor16, otvalor17, otvalor18, otvalor19, otvalor20,
			        otvalor21, otvalor22, otvalor23, otvalor24, otvalor25, otvalor26, otvalor27, otvalor28, otvalor29, otvalor30,
			        otvalor31, otvalor32, otvalor33, otvalor34, otvalor35, otvalor36, otvalor37, otvalor38, otvalor39, otvalor40,
			        otvalor41, otvalor42, otvalor43, otvalor44, otvalor45, otvalor46, otvalor47, otvalor48, otvalor49, otvalor50,
			        swimpres, cdtipflu, cdflujomc, cdusuari, cdtipsup, swvispre, cdpercli, renuniext, renramo, renpoliex, sworigenmesa,
			        cdrazrecha, cdunidspch, ntrasust, cdsisrol, "I");
			
			
			paso = "Guardando detalles de tr\u00e1mite";
			despachadorManager.turnarTramite(cdusuari, cdsisrol, rntramite, estatus,
			        Utils.join("Se registra un nuevo tr\u00e1mite desde la mesa de control: ",
			                StringUtils.isBlank(comments)
			                    ? "(sin observaciones)"
			                    : comments
			                ),
			        null, //cdrazrecha,
			        cdusuari,
			        cdsisrol,
			        true, //permisoAgente,
			        false, //porEscalamiento,
			        fechaHoy,
			        false, //sinGrabarDetalle,
			        true, //sinBuscarRegreso,
			        null, //ntrasust,
			        false, //soloCorreosRecibidos,
			        null //correosRecibidos
			        );
			
			
		}catch(Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}			
		
		logger.debug(Utils.join(
				 "\n@@@@@@ registrarNuevoTramite"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return rntramite;
	}
	
	
	public Map<String, String> ejecutarValidacionesEventoPantalla(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, 
												     			  String pantalla, String evento, String cdusuari, String cdsisrol) throws Exception {
		String paso = "";		
		List<Map<String, String>> componentes = null;
		Map<String, String> params = new HashMap<String, String>();
		String handler, nombreFuncion = null, referenciaValidacion = null, mensaje = null, estatus = null, comentarios = null, cdtipflu = null, cdflujomc = null, cdtiptra = null;
		String tokens[];
		String resultado = null;
		
		try {
			
			componentes = componentesDAO.obtenerListaComponentesSP(pantalla, evento, null, null, cdramo, null, cdsisrol, null);
				
			logger.debug("---> {}",componentes);
			for(Map<String, String> mapa : componentes) {
				
				handler = mapa.get("handler");
				
				if(handler != null) {
					
					tokens = handler.split("\\|");
					logger.debug(" tokens: {}",tokens);
					if(tokens != null && tokens.length == 5) {
						
						nombreFuncion = tokens[0];
						referenciaValidacion = tokens[1];
						mensaje = tokens[2];
						estatus =  tokens[3];
						comentarios = tokens[4];						
						cdtipflu = tokens[5];
						cdflujomc = tokens[6];
						cdtiptra = tokens[7];
					}
					
					resultado = "N";//flujoMesaControlDAO.ejecutaValidacionPantalla(nombreFuncion, cdunieco, cdramo, estado, nmpoliza, nmsuplem, pantalla, evento, cdusuari, cdsisrol);
					
					if(resultado != null && !"S".equals(resultado)) {
						
						params.put("referencia", referenciaValidacion);
						params.put("mensaje", mensaje);
						params.put("estatus", estatus);
						params.put("comments", comentarios);
						params.put("cdtipflu", cdtipflu);
						params.put("cdflujomc", cdflujomc);
						params.put("cdtiptra", cdtiptra);
						
						break;
					}
					
				}
				
			}		
			
		}catch(Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		
		return params;
	}

	public List<Map<String, String>> ejecutarValidacionPorReferencia(String ntramite, String referencia)
			throws Exception {
		String paso = "ejecutarValidacionPorReferencia";
		List<Map<String, String>> lista = new ArrayList<>();
		try{
			lista = mesaControlDAO.
					ejecutarValidacionPorReferencia(
							ntramite, 
							referencia);
			if(lista.isEmpty()){
				throw new ApplicationException("No hay registros en ejecutarValidacionPorReferencia");
			}
			lista.get(0).putAll(mesaControlDAO.
					obtenerTramiteCompleto(ntramite));
			
			logger.debug("ejecutarValidacionPorReferencia {}",lista);
			
		}catch(Exception e){
			Utils.generaExcepcion(e, paso);
		}
		return lista;
	}

	@Override
	public Map<String, String> obtenerTramiteCompleto(String ntramite) throws Exception {
		String paso = "ejecutarValidacionPorReferencia";
		Map<String, String> m = new HashMap();
		try{
			m = mesaControlDAO.
					obtenerTramiteCompleto(ntramite);
			logger.debug("obtenerTramiteCompleto {}",m);
			
		}catch(Exception e){
			Utils.generaExcepcion(e, paso);
		}
		return m;
	}
}
