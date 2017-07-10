package mx.com.segurossura.emision.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;

import mx.com.segurossura.emision.dao.EmisionDAO;
import mx.com.segurossura.emision.service.BloqueCoberturasManager;
import mx.com.segurossura.general.catalogos.model.Bloque;
import mx.com.segurossura.general.cmp.dao.ComponentesDAO;
@Service	
public class BloqueCoberturasManagerImpl implements BloqueCoberturasManager {

private final static Logger logger = LoggerFactory.getLogger(EmisionManagerImpl.class);
	
	@Autowired
	private EmisionDAO emisionDAO;
	@Autowired
    private ComponentesDAO componentesDAO;
	

	@Override
	public List<Map<String, String>> obtieneMpoligar(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_cdgarant_i, String pv_nmsuplem_i) throws Exception {
		// TODO Auto-generated method stub
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneMpoligar"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=emisionDAO.obtieneMpoligar(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdgarant_i, pv_nmsuplem_i);
					

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneMpoligar"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}
	

	@Override
	public void movimientoMpoligar(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_Nmsituac, String Gn_Nmsuplem_Session, String Gv_Cdgarant, String Gn_Cdcapita, Date Gd_Fevencim,
			String Gv_Accion) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ movimientoMpoligar"
				
				));
		String paso="";
		
		try{
			
			paso="Consultando datos";
			emisionDAO.movimientoMpoligar(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Nmsituac, Gn_Nmsuplem_Session, Gv_Cdgarant, Gn_Cdcapita, Gd_Fevencim, Gv_Accion);
			

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ movimientoMpoligar"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		
	}
	

	@Override
	public List<Map<String,String>> obtieneTatrigar(String pv_cdramo_i  ,
			String pv_cdtipsit_i  ,
			String pv_cdgarant_i  ,
			String pv_cdatribu_i) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneTatrigar"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=emisionDAO.obtieneTatrigar(pv_cdramo_i, pv_cdtipsit_i, pv_cdgarant_i, pv_cdatribu_i);

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneTatrigar"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}
	
	@Override
	public List<Map<String,String>> obtieneTatrigarTconfscr(String pantalla,
															String seccion,
															String modulo,
															String estatus,
															String cdsisrol,
															String pv_cdramo_i  ,
															String pv_cdtipsit_i  ,
															String pv_cdgarant_i  ,
															String pv_cdatribu_i) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneTatrigarTconfscr"
				));
		String paso="";
		List<Map<String, String>> datos=null;
		List<Map<String, String>> tconfscr=null;
		List<Map<String, String>> resultado=new ArrayList<>();
		try{
			
			paso="Consultando datos";
			tconfscr=componentesDAO.obtenerListaComponentesSP(pantalla, seccion, modulo, estatus, pv_cdramo_i, pv_cdtipsit_i, cdsisrol, pv_cdgarant_i);
			datos=emisionDAO.obtieneTatrigar(pv_cdramo_i, pv_cdtipsit_i, pv_cdgarant_i, pv_cdatribu_i);
			//resultado=datos;
			logger.debug("oo--->"+tconfscr);
			for(Map<String, String> m: tconfscr){
				Optional<Map<String, String>> res = datos.stream().filter(
															d-> d.get("cdatribu").equals(m.get("name_cdatribu"))
													).findFirst();
				if(res.isPresent()){
					m.putAll(res.get());
					logger.debug("fuss"+m.toString());
					resultado.add(m);
				}
				
				
			}

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneTatrigarTconfscr"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return resultado;
	}
	

	@Override
	public List<Map<String,String>> guardarCobertura(
			String pv_cdunieco_i, 
			String pv_cdramo_i,
			String pv_estado_i, 
			String pv_nmpoliza_i, 
			String pv_nmsituac_i, 
			String pv_cdtipsit_i, 
			String pv_nmsuplem_i,
			String pv_cdgarant_i,
			String pv_cdcapita_i,
			List<Map<String,String>> valores) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneTatrigar"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Guardando datos";
			List<Map<String, String>> lista=new ArrayList<>();
			for(Map<String,String> m: valores){
				logger.debug("@@@@@ "+m);
				if(m.get("valor")!= null && !m.get("valor").equals(m.get("valorOriginal"))){
					if(m.get("tabla")==null || "null".equals(m.get("tabla"))){
						emisionDAO.movimientoTvalogar(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, m.get("name").substring("otvalor".length()), pv_nmsuplem_i, pv_nmsituac_i, pv_cdgarant_i, m.get("valor"), "U");
					}else{//mpolicap
						emisionDAO.movimientoMpolicap(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_nmsuplem_i, null, pv_cdcapita_i, m.get("valor"), pv_nmsuplem_i, "U");
					}
				}
			}
			paso="Validando";
			lista.addAll(
					emisionDAO.ejecutarValidaciones(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_nmsuplem_i, Bloque.CAPITALES.getCdbloque())
						);
			
			lista.addAll(
					emisionDAO.ejecutarValidaciones(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_nmsuplem_i, Bloque.GARANTIAS.getCdbloque())
						);
			lista.addAll(
					emisionDAO.ejecutarValidaciones(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_nmsuplem_i, Bloque.ATRIBUTOS_GARANTIAS.getCdbloque())
						);
			

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneTatrigar"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return null;
		
	}
	

	@Override
	public List<Map<String, String>> obtieneTvalogar(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_cdtipsit_i, String pv_nmsuplem_i) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneTvalogar"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=emisionDAO.obtieneTvalogar(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdtipsit_i, pv_nmsuplem_i)  ;

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneTvalogar"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}
	
	

	@Override
	public List<Map<String, String>> obtieneMpolicap(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_cdcapita_i, String pv_nmsuplem_i) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneMpolicap"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=emisionDAO.obtieneMpolicap(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdcapita_i, pv_nmsuplem_i)  ;

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneMpolicap"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}

	@Override
	public void agregaCobertura(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String nmsuplem
            ,List<Map<String,String>> lista) throws Exception {
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ agregaCobertura"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			for(Map<String,String> m: lista){
				
				emisionDAO.movimientoMpoligar(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, m.get("cdgarant"), m.get("cdcapita"), null, "I");
				emisionDAO.ejecutarValoresDefecto(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, Bloque.CAPITALES.getCdbloque(),m.get("cdgarant"));

			}

				
		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ agregaCobertura"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		
	} 



}
