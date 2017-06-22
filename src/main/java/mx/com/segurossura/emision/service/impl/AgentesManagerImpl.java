package mx.com.segurossura.emision.service.impl;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;

import mx.com.segurossura.emision.dao.AgentesDAO;
import mx.com.segurossura.emision.dao.EmisionDAO;
import mx.com.segurossura.emision.service.AgentesManager;


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
        String paso = null;
		
        try{
		
        	paso = "Recuperando p\u00f3liza";
	        Map<String, String> mpolizas = emisionDAO.obtieneMpolizas(cdunieco, cdramo, estado, nmpoliza, nmsuplem).get(0);
	        if (mpolizas == null) {
	            throw new ApplicationException("No se encuentra la p\u00f3liza");
	        }
	        for (Entry<String, String> en : mpolizas.entrySet()) {
                datos.put(en.getKey(), en.getValue());
            }        
	        
        }catch(Exception e){
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
		Map<String, String> datos = new LinkedHashMap<String, String>();
		
		try{
			
			paso = "Recuperando p\u00f3liza";
	        Map<String, String> mpolizas = emisionDAO.obtieneMpolizas(cdunieco, cdramo, estado, nmpoliza, nmsuplem).get(0);
	        if (mpolizas == null) {
	            throw new ApplicationException("No se encuentra la p\u00f3liza");
	        }
	        for (Entry<String, String> en : mpolizas.entrySet()) {
                datos.put(en.getKey(), en.getValue());
            }
	        
	        paso = "Guardando p\u00f3liza";
	        
	        emisionDAO.movimientoMpolizas(cdunieco, 
	        							  cdramo, 
	        							  estado, 
	        							  nmpoliza, 
	        							  nmsuplem, 
	        							  nmsuplem, 
	        							  datos.get("status"), 
	        							  datos.get("swestado"), 
      									  datos.get("nmsolici"),
      									  Utils.parse(datos.get("feautori")),
										  datos.get("cdmotanu"),
										  Utils.parse(datos.get("feanulac")),
										  datos.get("swautori"),
										  datos.get("cdmoneda"),
										  Utils.parse(datos.get("feinisus")),
										  Utils.parse(datos.get("fefinsus")),
										  datos.get("ottempot"),
										  Utils.parse(datos.get("feefecto")),
										  datos.get("hhefecto"),
										  Utils.parse(datos.get("feproren")),
										  Utils.parse(datos.get("fevencim")),
										  datos.get("nmrenova"),
										  Utils.parse(datos.get("ferecibo")),
										  Utils.parse(datos.get("feultsin")),
										  datos.get("nmnumsin"),
										  datos.get("cdtipcoa"),
										  datos.get("swtarifi"),
										  datos.get("swabrido"),
										  Utils.parse(datos.get("feemisio")),
										  datos.get("cdperpag"),
										  datos.get("nmpoliex"),
	        							  nmcuadro,
	        							  porredau,
	        							  datos.get("swconsol"),
	        							  datos.get("nmpolcoi"),
	        							  datos.get("adparben"),
	        							  datos.get("nmcercoi"),
	        							  datos.get("cdtipren"),
	        							  "U");
	        
	        paso = "Guardando agentes";
	        
	        for(int current=0; current<agentes.size(); current++){
	        	Map<String, String> tmp = (Map<String, String>) agentes.get(current);
	        	agentesDAO.movimientoMpoliage(cdunieco, 
	        								  cdramo, 
	        								  estado, 
	        								  nmpoliza, 
	        								  tmp.get("cdagente"), 
	        								  nmsuplem, 
	        								  nmsuplem, 
	        								  tmp.get("cdtipoag"),
	        								  tmp.get("porredau"),
	        								  "I");
	        }
	        
		}catch(Exception e){
			Utils.generaExcepcion(e, paso);
		}
		return null;
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
	
	
}
