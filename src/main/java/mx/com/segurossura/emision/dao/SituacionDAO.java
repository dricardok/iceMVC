package mx.com.segurossura.emision.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface SituacionDAO {
    
    public void movimientoMpolisit(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsituac, String nmsuplem_sesion, String nmsuplem_bean, String status,
			String cdtipsit, String swreduci, String cdagrupa, String cdestado, Date fefecsit,
			Date fecharef, String indparbe, Date feinipbs, String porparbe, String intfinan,
			String cdmotanu, Date feinisus, Date fefinsus, String accion) throws Exception;

	public void movimientoTvalosit(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac,
            String cdtipsit, String status, String nmsuplem, Map<String, String> otvalores, String accion) throws Exception;

	public List<Map<String, String>> obtieneTvalosit(String cdunieco, String cdramo, String estado,
			String nmpoliza, String nmsituac, String cdtipsit, String nmsuplem) throws Exception;

	public List<Map<String, String>> obtieneMpolisit(String cdunieco, String cdramo, String estado,
			String nmpoliza, String nmsituac, String nmsuplem) throws Exception;
	
	public String obtieneNmsituac(String cdunieco, String cdramo, String estado, String nmpoliza) throws Exception;
	    
	public void borraEstructuraSituacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac) throws Exception;
	
	public List<Map<String, String>> obtenerListaSituaciones(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem) throws Exception;
	
	public void copiaSituacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem, String nmcopias) throws Exception;
}