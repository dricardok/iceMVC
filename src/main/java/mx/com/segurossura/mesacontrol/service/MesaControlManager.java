package mx.com.segurossura.mesacontrol.service;

import java.util.List;
import java.util.Map;

import com.biosnettcs.portal.model.UsuarioVO;

import java.util.Date;

public interface MesaControlManager {
	
	List<Map<String, String>> obtenerTramites(String cdunieco, String cdramo, String estado, String nmpoliza, 
			String cdagente, String ntramite, String estatus, Date desde, Date hasta, String nombre, String nmsolici) throws Exception;
	
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
			String cdsisrol, String accion, UsuarioVO usuario) throws Exception;
}
