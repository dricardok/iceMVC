package mx.com.segurossura.emision.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mx.com.royalsun.alea.commons.api.IDocumentoAPI;
import mx.com.royalsun.alea.commons.bean.Documento;
import mx.com.royalsun.alea.commons.bean.LlavePoliza;
import mx.com.royalsun.alea.commons.exception.ResponseException;
import mx.com.segurossura.emision.service.ImpresionManager;

@Service
public class ImpresionManagerImpl implements ImpresionManager{

	private final static Logger logger = LoggerFactory.getLogger(ImpresionManagerImpl.class);
	
	@Autowired
	IDocumentoAPI documentoClient;

	@Override
	public List<Documento> getDocumentos(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsuplem) throws Exception {
				
		LlavePoliza llave = new LlavePoliza();
		llave.setEstado(estado);
		llave.setOficina(Integer.parseInt(cdunieco));
		llave.setPoliza(Long.parseLong(nmpoliza));
		llave.setRamo(Integer.parseInt(cdramo));
		llave.setSuplemento(Integer.parseInt(nmsuplem));
		
		List<Documento> documentos = null;
		
		try {
			logger.debug("Invocando a servicio documentoClient con los parametros: {}", llave);
			documentos = documentoClient.postAll(llave);
			int numDocs = 0;
			if(documentos != null) {
				numDocs = documentos.size();
			}
			logger.debug("Documentos obtenidos {}: {}", numDocs, documentos);
		}catch(ResponseException e){
			logger.error("Error al invocar servicio de obtencion de documentos: ", e);
		}
		logger.debug("Fin servicio documentoClient");
		return documentos;
	}

}
