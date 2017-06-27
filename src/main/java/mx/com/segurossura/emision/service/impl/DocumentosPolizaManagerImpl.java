package mx.com.segurossura.emision.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;

import mx.com.segurossura.emision.dao.DocumentosPolizaDAO;
import mx.com.segurossura.emision.service.DocumentosPoliza;
import mx.com.segurossura.general.utils.ValoresMinimosUtils;

@Service
public class DocumentosPolizaManagerImpl implements DocumentosPoliza {
	
	private final static Logger logger = LoggerFactory.getLogger(DocumentosPolizaManagerImpl.class);
	
	@Autowired
	private DocumentosPolizaDAO docsPolizaDAO;
	
	@Override
	public List<Map<String, String>> obtenerDocumentosPoliza(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtenerTdocpoli"				
				));
       String paso="";
       List<Map<String, String>> datos=null;
		try {
			paso="Consultando datos";
			
			datos = docsPolizaDAO.obtenerDocumentosPoliza(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
			
       } catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtenerTdocpoli"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}

	@Override
	public void realizarMovimientoDocsPoliza(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsolici, String nmsuplem,
			Map<String, String> datos, String accion) throws Exception {
		
		String paso = "Ejecutando movimiento de tdocupol";
		
		try{
			if ("D".equals(accion)) {
				if(StringUtils.isBlank(nmsolici)) {
					throw new ApplicationException("Falta nmsolici");
				}
				docsPolizaDAO.realizarMovimientoDocsPoliza(cdunieco, cdramo, estado, nmpoliza, nmsolici, nmsuplem,
						null, null, null, null, null, null, null, null, null, null, null, null, null, accion);
			} else if("I".equals(accion) || "U".equals(accion)) {
				
				// Recupera el registro actual
				Map<String, String> docpoli = null;
				try {
					
					docpoli = docsPolizaDAO.obtenerDocumentosPoliza(cdunieco, cdramo, estado, nmpoliza, nmsuplem).get(0);
					
				} catch (Exception ex) {
					
					logger.warn("No se encuentra docpoli");
				}
				if(docpoli == null) {
					//docpoli = ValoresMinimosUtils.obtenerValores(Bloque.)
				}
				
				// agregar los datos de pantalla al registro actual
				Map<String, String> camposLlave = new HashMap<String, String>();
				camposLlave.put("cdunieco", null);
		        camposLlave.put("cdramo", null);
		        camposLlave.put("estado", null);
		        camposLlave.put("nmpoliza", null);
		        camposLlave.put("nmsolici", null);
		        camposLlave.put("nmsuplem", null);
		        camposLlave.put("accion", null);
		        
		        
		        for (Entry<String, String> en : datos.entrySet()) {
		            String key = en.getKey();
		            if (!camposLlave.containsKey(key)) {
		            	docpoli.put(key, en.getValue());
		            }
		        }
		        
		        // invocar movimiento
		        docsPolizaDAO.realizarMovimientoDocsPoliza(
		        		// llvae
		        		cdunieco, cdramo, estado, nmpoliza, nmsolici, nmsuplem,
		        		// datos
		        		docpoli.get("ntramite"),
		        		Utils.parse(docpoli.get("feinici")),
		        		docpoli.get("cddocume"),
		        		docpoli.get("dsdocume"),
		        		docpoli.get("tipmov"),
		        		docpoli.get("swvisible"),
		        		docpoli.get("cdtiptra"),
		        		docpoli.get("codidocu"),		        		
		        		Utils.parse(docpoli.get("fefecha")),		        		
		        		docpoli.get("cdorddoc"),
		        		docpoli.get("cdmoddoc"),
		        		docpoli.get("nmcertif"),
		        		docpoli.get("nmsituac"),
		        		
		        		// accion
		        		accion);
			} else {
				throw new ApplicationException("Acc\u00f3n no v\u00e1lida");
			}
			
		}catch(Exception ex){
			
			Utils.generaExcepcion(ex, paso);
		}		
	}
}
