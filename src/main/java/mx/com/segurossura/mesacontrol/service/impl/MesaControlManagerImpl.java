package mx.com.segurossura.mesacontrol.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;
import com.biosnettcs.portal.model.UsuarioVO;

import mx.com.segurossura.mesacontrol.dao.MesaControlDAO;
import mx.com.segurossura.mesacontrol.service.MesaControlManager;
import mx.com.segurossura.workflow.despachador.service.DespachadorManager;

@Service("mesaControlManagerImplNew")
public class MesaControlManagerImpl implements MesaControlManager {
	
	private static final Logger logger = LoggerFactory.getLogger(MesaControlManagerImpl.class);
	
	@Autowired
	private MesaControlDAO mesaControlDAO;
	
	@Autowired
	private DespachadorManager despachadorManager;
	
	@Override
	public List<Map<String, String>> obtenerTramites(String cdunieco, String cdramo, String estado, String nmpoliza,
			String cdagente, String ntramite, String estatus, Date desde, Date hasta, String nombre, String nmsolici)
			throws Exception {
		
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtenerMesaControl"				
				));
		String paso = "";
        List<Map<String, String>> datos = null;
		try {
			paso="Consultando datos";
			datos = mesaControlDAO.obtenerTramites(cdunieco, cdramo, estado, nmpoliza, cdagente, ntramite, estatus, desde, hasta, nombre, nmsolici);
			
        } catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtenerMesaControl"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}

	@Override
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
			String cdsisrol, String accion, UsuarioVO usuario) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ movimientoTmesacontrol"				
				));
		String paso = "Registrando tramite";
        String rntramite = "";
		try {
			paso="Consultando datos";
			if((!StringUtils.isEmpty(cdunieco) && !StringUtils.isEmpty(cdramo) &&
				!StringUtils.isEmpty(estado)   && !StringUtils.isEmpty(nmpoliza))){
				boolean existePol=mesaControlDAO.existePoliza(cdunieco, cdramo, estado, nmpoliza);
				logger.debug("Existe la poliza: "+existePol);
				if(!existePol){
					throw new ApplicationException(Utils.join("La póliza ",cdunieco,"-",cdramo,"-",estado,"-",nmpoliza," no existe."));
				}
				
			}
			rntramite = mesaControlDAO.movimientoTmesacontrol(ntramite, cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmsolici, cdsucadm, cdsucdoc, cdtiptra, ferecepc, cdagente, referencia, nombre, fecstatu, estatus, comments, cdtipsit, otvalor01, otvalor02, otvalor03, otvalor04, otvalor05, otvalor06, otvalor07, otvalor08, otvalor09, otvalor10, otvalor11, otvalor12, otvalor13, otvalor14, otvalor15, otvalor16, otvalor17, otvalor18, otvalor19, otvalor20, otvalor21, otvalor22, otvalor23, otvalor24, otvalor25, otvalor26, otvalor27, otvalor28, otvalor29, otvalor30, otvalor31, otvalor32, otvalor33, otvalor34, otvalor35, otvalor36, otvalor37, otvalor38, otvalor39, otvalor40, otvalor41, otvalor42, otvalor43, otvalor44, otvalor45, otvalor46, otvalor47, otvalor48, otvalor49, otvalor50, swimpres, cdtipflu, cdflujomc, cdusuari, cdtipsup, swvispre, cdpercli, renuniext, renramo, renpoliex, sworigenmesa, cdrazrecha, cdunidspch, ntrasust, cdsisrol, accion);
			despachadorManager.turnarTramite(usuario.getCdusuari(), usuario.getRolActivo().getCdsisrol(),
					rntramite, estatus, comments, cdrazrecha, usuario.getCdusuari(), usuario.getRolActivo().getCdsisrol(), true, false, ferecepc, false);
       } catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		
		logger.debug(Utils.join(
				 "\n@@@@@@ movimientoTmesacontrol"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return rntramite;
		
	}

}
