package mx.com.segurossura.emision.service;

import java.util.List;
import java.util.Map;

public interface DocumentosPoliza {
	
	List<Map<String, String>> obtenerDocumentosPoliza(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
	
	void realizarMovimientoDocsPoliza(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsolici, String nmsuplem,
			Map<String, String> params, String accion) throws Exception;
}
