package mx.com.segurossura.emision.service.impl;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;

import mx.com.segurossura.emision.dao.AgentesDAO;
import mx.com.segurossura.emision.dao.EmisionDAO;
import mx.com.segurossura.emision.service.AgentesManager;
import mx.com.segurossura.general.catalogos.model.Bloque;


@Service
public class AgentesManagerImpl implements AgentesManager {
	
	private static final Logger logger = LoggerFactory.getLogger(AgentesManagerImpl.class);

	@Autowired
	private EmisionDAO emisionDAO;
	
	@Autowired
	private AgentesDAO agentesDAO;
	 
	@Override
	public Map<String, String> cargar(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem)
			throws Exception {
		Map<String, String> datos = new LinkedHashMap<String, String>();
        String paso = "Recuperando p\u00f3liza";
        try {
            datos = emisionDAO.obtieneMpolizas(cdunieco, cdramo, estado, nmpoliza, nmsuplem).get(0);
        } catch (Exception e) {
        	 Utils.generaExcepcion(e, paso);
        }
		return datos;
	}
	
	@Override
	public List<Map<String, String>> cargarAgentes(String cdunieco, String cdramo, String estado, String nmpoliza, String cdagente, String nmsuplem)
			throws Exception {
		
		String paso = null;
		List<Map<String, String>> mpoliage = new ArrayList<Map<String,String>>();
		
        try{
		
        	paso = "Recuperando agentes asociados a la p\u00f3liza";
	        mpoliage = agentesDAO.obtieneMpoliage(cdunieco, cdramo, estado, nmpoliza, cdagente, nmsuplem);
	        
        }catch(Exception e){
        	e.printStackTrace();
        	Utils.generaExcepcion(e, paso);
        }
		
		return mpoliage;
	}

	@Override
	public List<Map<String, String>> guardarAgentes(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsuplem, String nmcuadro, String porredau, List<Map<String, String>> agentes) throws Exception {
		String paso = null;
		List<Map<String, String>> validaciones = null;
		try {
		    paso = "Recuperando p\u00f3liza";
	        Map<String, String> mpolizas = emisionDAO.obtieneMpolizas(cdunieco, cdramo, estado, nmpoliza, nmsuplem).get(0);
	        
	        paso = "Guardando p\u00f3liza";
	        emisionDAO.movimientoMpolizas(cdunieco, 
	        							  cdramo, 
	        							  estado, 
	        							  nmpoliza, 
	        							  nmsuplem, 
	        							  nmsuplem, 
	        							  mpolizas.get("status"), 
	        							  mpolizas.get("swestado"), 
      									  mpolizas.get("nmsolici"),
      									  Utils.parse(mpolizas.get("feautori")),
										  mpolizas.get("cdmotanu"),
										  Utils.parse(mpolizas.get("feanulac")),
										  mpolizas.get("swautori"),
										  mpolizas.get("cdmoneda"),
										  Utils.parse(mpolizas.get("feinisus")),
										  Utils.parse(mpolizas.get("fefinsus")),
										  mpolizas.get("ottempot"),
										  Utils.parse(mpolizas.get("feefecto")),
										  mpolizas.get("hhefecto"),
										  Utils.parse(mpolizas.get("feproren")),
										  Utils.parse(mpolizas.get("fevencim")),
										  mpolizas.get("nmrenova"),
										  Utils.parse(mpolizas.get("ferecibo")),
										  Utils.parse(mpolizas.get("feultsin")),
										  mpolizas.get("nmnumsin"),
										  mpolizas.get("cdtipcoa"),
										  mpolizas.get("swtarifi"),
										  mpolizas.get("swabrido"),
										  Utils.parse(mpolizas.get("feemisio")),
										  mpolizas.get("cdperpag"),
										  mpolizas.get("nmpoliex"),
	        							  nmcuadro,
	        							  porredau,
	        							  mpolizas.get("swconsol"),
	        							  mpolizas.get("nmpolcoi"),
	        							  mpolizas.get("adparben"),
	        							  mpolizas.get("nmcercoi"),
	        							  mpolizas.get("cdtipren"),
	        							  "U");
	        
	        paso = "Borrando agentes";
	        agentesDAO.movimientoMpoliage(cdunieco, 
					  cdramo, 
					  estado, 
					  nmpoliza, 
					  null, 
					  nmsuplem, 
					  nmsuplem, 
					  null,
					  null,
					  "D");
	        
	        for (int current = 0; current < agentes.size(); current++) {
	            Map<String, String> tmp = (Map<String, String>) agentes.get(current);
	        	agentesDAO.movimientoMpoliage(cdunieco, cdramo, estado, nmpoliza, tmp.get("cdagente"), nmsuplem,
	        	        nmsuplem, tmp.get("cdtipoag"), tmp.get("porredau"), "I");
        	}
	        
	        paso = "Validando bloque de agentes";
	        validaciones = emisionDAO.ejecutarValidaciones(cdunieco, cdramo, estado, nmpoliza, "0", nmsuplem, null,
	                Bloque.AGENTES.getCdbloque());
		} catch (Exception e) {
			Utils.generaExcepcion(e, paso);
		}
		return validaciones;
	}

	@Override
	public List<Map<String, String>> buscarAgentes(String clave, String atributo) throws Exception {
		
		String paso = null;
		List<Map<String, String>> agentes = new ArrayList<Map<String,String>>();
		
        try{
		
        	paso = "Recuperando agentes del catalogo";
        	agentes = agentesDAO.buscarAgentes(clave, atributo);
	        
        }catch(Exception e){
        	e.printStackTrace();
        	Utils.generaExcepcion(e, paso);
        }
		
		return agentes;	
	}

	@Override
	public boolean validaAgente(String cdagente, String cdramo, String cdproceso) throws Exception {
		String paso = null;
		boolean val =false;
		
        try{
		
        	paso = "Recuperando valida agente";
        	val = agentesDAO.validaAgente(cdagente, cdramo, cdproceso);
	        
        }catch(Exception e){
        	e.printStackTrace();
        	Utils.generaExcepcion(e, paso);
        }
		return val;
	}
	
	
}
