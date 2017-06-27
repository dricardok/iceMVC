package mx.com.segurossura.emision.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface DocumentosPolizaDAO {
	
	List<Map<String, String>> obtenerDocumentosPoliza(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;
	
	void realizarMovimientoDocsPoliza(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsolici, String nmsuplem,
			String ntramite, Date feinici, String cddocume, String dsdocume, String tipmov, String swvisible, String cdtiptra,
			String codidocu, Date fefecha, String cdorddoc, String cdmoddoc, String nmcertif, String nmsituac, String accion)
	throws Exception;
}
