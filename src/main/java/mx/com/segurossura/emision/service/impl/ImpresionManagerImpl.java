package mx.com.segurossura.emision.service.impl;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.exception.ApplicationException;

import mx.com.royalsun.alea.commons.api.IDocumentoFactoryAPI;
import mx.com.royalsun.alea.commons.bean.Documento;
import mx.com.royalsun.alea.commons.bean.LlavePoliza;
import mx.com.royalsun.alea.commons.bean.RequestImpresion;
import mx.com.royalsun.alea.commons.exception.ResponseException;
import mx.com.segurossura.emision.dao.EmisionDAO;
import mx.com.segurossura.emision.service.ImpresionManager;

@Service
public class ImpresionManagerImpl implements ImpresionManager{

	private final static Logger logger = LoggerFactory.getLogger(ImpresionManagerImpl.class);
	
	@Autowired
	IDocumentoFactoryAPI documentoFactoryClient;
	
	@Value("${printer.internal}")
	private boolean printerInternal;
	
	@Autowired
	private EmisionDAO emisionDAO;
	
	@Override
	public List<Documento> getDocumentos(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsuplem) throws Exception {
		
		logger.debug("Obteniendo nsublogi parametros {}, {}, {}, {}, {}", cdunieco, cdramo, estado, nmpoliza, nmsuplem);
		List<Map<String, String>> listaNsublogi = emisionDAO.obtenerNsublogi(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
		String nsuplogi = null;
		
		if(listaNsublogi != null && !listaNsublogi.isEmpty()) {
			
			nsuplogi = listaNsublogi.get(0).get("nsuplogi");
			logger.debug("El valor obtenido nsublogi "+ nsuplogi);
			
		} else {
			throw new ApplicationException("No se encontro nmsublogi para la poliza: " + cdunieco +" "+ cdramo +" "+ estado +" "+ nmpoliza +" "+ nmsuplem);
		}
		
		LlavePoliza pol = new LlavePoliza();
		pol.setEstado(estado);
		pol.setOficina(Integer.parseInt(cdunieco));
		pol.setPoliza(Long.parseLong(nmpoliza));
		pol.setRamo(Integer.parseInt(cdramo));
		pol.setSuplemento(Integer.parseInt(nsuplogi));
		
		RequestImpresion ri = new RequestImpresion(pol);
		ri.setPrinterInternal(printerInternal);
		
		List<Documento> documentos = null;
		
		try {
			logger.debug("Invocando a servicio documentoClient con los parametros: {}", pol.toMap());
			documentos = documentoFactoryClient.postAll(ri);
			int numDocs = 0;
			if(documentos != null) {
				numDocs = documentos.size();
			}
			logger.debug("Documentos obtenidos: {}", numDocs);
			if(documentos != null && documentos.size() > 0) {
				StringBuilder sb = new StringBuilder("Docs obtenidos para poliza ")
						.append(cdunieco).append(" ").append(cdramo).append(" ")
						.append(estado).append(" ").append(nmpoliza).append(":\n");
				for (Documento doc : documentos) {
					sb.append(doc.getUrl()).append("\n");
				}
				logger.info(sb.toString());
			}
		}catch(ResponseException e){
			logger.error("Error al invocar servicio de obtencion de documentos: ", e);
			throw e;
		}
		logger.debug("Fin servicio documentoClient");
		return documentos;
	}

}
