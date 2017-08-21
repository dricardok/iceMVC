package mx.com.segurossura.mesacontrol.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.biosnettcs.core.Utils;
import com.biosnettcs.portal.controller.PrincipalCoreAction;
import com.biosnettcs.portal.model.UsuarioVO;

import mx.com.segurossura.mesacontrol.service.MesaControlManager;

@Controller("mesaControlActionNew")
@Scope("prototype")
@ParentPackage(value="json-default")
@Namespace("/mesacontrol")
public class MesaControlAction extends PrincipalCoreAction {
	
	private static final long serialVersionUID = -3534829722619719307L;
	
	private static final Logger logger = LoggerFactory.getLogger(MesaControlAction.class);
	
	private boolean success;
	
	private String message;
	
	private Map<String, String> params;
	
	private List<Map<String, String>> list;
	
	private String ntramite;
	
	private static SimpleDateFormat renderFechas = new SimpleDateFormat("dd/MM/yyyy");
	
    private long start;
    private long limit;
    private long totalCount;
	
	@Autowired
    private MesaControlManager mesaControlManager;
	
	
	@Action(
			value = "obtenerTramites",
			results = {
					@Result(name = "success", type = "json")
			}
	)
	public String obtenerTramites() {
		
		logger.debug(StringUtils.join(
                "\n################################",
                "\n###### obtenerMesaControl ######",
                "\n###### params ", params,
                "\n###### start ", start,
                "\n###### limit ", limit
               ));
		try{
			UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
			Utils.validate(params, "No se recibieron parametros");			
			String cdunieco = params.get("cdunieco") != null ? ("".equals(params.get("cdunieco")) ? null : params.get("cdunieco")) : null;
            String cdramo = params.get("cdramo")  != null ? ("".equals(params.get("cdramo")) ? null : params.get("cdramo")) : null;;
            String estado = params.get("estado")  != null ? ("".equals(params.get("estado")) ? null : params.get("estado")) : null;;
            String nmpoliza = params.get("nmpoliza")  != null ? ("".equals(params.get("nmpoliza")) ? null : params.get("nmpoliza")) : null;;
            String cdagente = params.get("cdagente")  != null ? ("".equals(params.get("cdagente")) ? null : params.get("cdagente")) : null;;
            String ntramite = params.get("ntramite")  != null ? ("".equals(params.get("ntramite")) ? null : params.get("ntramite")) : null;;
            String estatus = params.get("estatus")  != null ? ("".equals(params.get("estatus")) ? null : params.get("estatus")) : null;;
            Date desde = null, hasta = null;
            if(params.get("fstatusi") != null && !params.get("fstatusi").equals("")) {
             desde = renderFechas.parse(params.get("fstatusi"));
            }
            if(params.get("fstatusf") != null && !params.get("fstatusf").equals("")) {
             hasta = renderFechas.parse(params.get("fstatusf"));
            }
            String nombre = params.get("nombre")  != null ? ("".equals(params.get("nombre")) ? null : params.get("nombre")) : null;;
            String nmsolici = params.get("nmsolici")  != null ? ("".equals(params.get("nmsolici")) ? null : params.get("nmsolici")) : null;;
            
            list = mesaControlManager.obtenerTramites(cdunieco, cdramo, estado, nmpoliza, cdagente, ntramite, estatus, desde, hasta, nombre, nmsolici, usuario.getCdusuari(), usuario.getRolActivo().getCdsisrol(), start, limit);
            if(list!=null && !list.isEmpty()) {
                totalCount = Integer.parseInt(list.get(0).get("total"));
            }
            else {
            	totalCount = 0;
            }
            success = true;
		}catch(Exception ex){
			success = false;
			Utils.manejaExcepcion(ex);
		}
		logger.debug(StringUtils.join(
                "\n################################",
                "\n tramites : ", list,
                "\n###### obtenerMesaControl ######"
               ));
		
		return SUCCESS;
	}
	
	@Action(
			value = "movimientoMesacontrol",
			results = {
					@Result(name = "success", type = "json")
			}
	)
	public String movimientoMesacontrol() {
		
		logger.debug(StringUtils.join(
                "\n################################",
                "\n###### movimientoMesacontrol ######",
                "\n###### params ", params
               ));
		try{
			Utils.validate(params, "No se recibieron parametros");			
			String ntramite	= params.get("ntramite");
			String cdunieco	= params.get("cdunieco");
			String cdramo	= params.get("cdramo");
			String estado	= params.get("estado");
			String nmpoliza	= params.get("nmpoliza");
			String nmsuplem	= params.get("nmsuplem");
			String nmsolici	= params.get("nmsolici");
			String cdsucadm	= params.get("cdsucadm");
			String cdsucdoc	= params.get("cdsucdoc");
			String cdtiptra	= params.get("cdtiptra");
			String cdagente	= params.get("cdagente");
			String referencia	= params.get("referencia");
			String nombre	= params.get("nombre");
			String estatus	= params.get("estatus");
			String comments	= params.get("comments");
			String cdtipsit	= params.get("cdtipsit");
			String otvalor01	= params.get("otvalor01");
			String otvalor02	= params.get("otvalor02");
			String otvalor03	= params.get("otvalor03");
			String otvalor04	= params.get("otvalor04");
			String otvalor05	= params.get("otvalor05");
			String otvalor06	= params.get("otvalor06");
			String otvalor07	= params.get("otvalor07");
			String otvalor08	= params.get("otvalor08");
			String otvalor09	= params.get("otvalor09");
			String otvalor10	= params.get("otvalor10");
			String otvalor11	= params.get("otvalor11");
			String otvalor12	= params.get("otvalor12");
			String otvalor13	= params.get("otvalor13");
			String otvalor14	= params.get("otvalor14");
			String otvalor15	= params.get("otvalor15");
			String otvalor16	= params.get("otvalor16");
			String otvalor17	= params.get("otvalor17");
			String otvalor18	= params.get("otvalor18");
			String otvalor19	= params.get("otvalor19");
			String otvalor20	= params.get("otvalor20");
			String otvalor21	= params.get("otvalor21");
			String otvalor22	= params.get("otvalor22");
			String otvalor23	= params.get("otvalor23");
			String otvalor24	= params.get("otvalor24");
			String otvalor25	= params.get("otvalor25");
			String otvalor26	= params.get("otvalor26");
			String otvalor27	= params.get("otvalor27");
			String otvalor28	= params.get("otvalor28");
			String otvalor29	= params.get("otvalor29");
			String otvalor30	= params.get("otvalor30");
			String otvalor31	= params.get("otvalor31");
			String otvalor32	= params.get("otvalor32");
			String otvalor33	= params.get("otvalor33");
			String otvalor34	= params.get("otvalor34");
			String otvalor35	= params.get("otvalor35");
			String otvalor36	= params.get("otvalor36");
			String otvalor37	= params.get("otvalor37");
			String otvalor38	= params.get("otvalor38");
			String otvalor39	= params.get("otvalor39");
			String otvalor40	= params.get("otvalor40");
			String otvalor41	= params.get("otvalor41");
			String otvalor42	= params.get("otvalor42");
			String otvalor43	= params.get("otvalor43");
			String otvalor44	= params.get("otvalor44");
			String otvalor45	= params.get("otvalor45");
			String otvalor46	= params.get("otvalor46");
			String otvalor47	= params.get("otvalor47");
			String otvalor48	= params.get("otvalor48");
			String otvalor49	= params.get("otvalor49");
			String otvalor50	= params.get("otvalor50");
			String swimpres	= params.get("swimpres");
			String cdtipflu	= params.get("cdtipflu");
			String cdflujomc	= params.get("cdflujomc");
			String cdusuari	= params.get("cdusuari");
			String cdtipsup	= params.get("cdtipsup");
			String swvispre	= params.get("swvispre");
			String cdpercli	= params.get("cdpercli");
			String renuniext	= params.get("renuniext");
			String renramo	= params.get("renramo");
			String renpoliex	= params.get("renpoliex");
			String sworigenmesa	= params.get("sworigenmesa");
			String cdrazrecha	= params.get("cdrazrecha");
			String cdunidspch	= params.get("cdunidspch");
			String ntrasust	= params.get("ntrasust");
			String cdsisrol	= params.get("cdsisrol");
			String accion	= params.get("accion");          
            
			
			Date ferecepc = null, fecstatu = null;
            if(params.get("ferecepc") != null || "null".equals(params.get("ferecepc")))
            	ferecepc = renderFechas.parse(params.get("ferecepc"));
            else
            	ferecepc = new Date();
            if(params.get("fecstatu") != null) 
            	fecstatu = renderFechas.parse(params.get("fecstatu"));
            UsuarioVO usuario = (UsuarioVO)Utils.validateSession(session);
            	
            this.ntramite = mesaControlManager. movimientoTmesacontrol(ntramite, cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmsolici, cdsucadm, cdsucdoc, cdtiptra, ferecepc, cdagente, referencia, nombre, fecstatu, estatus, comments, cdtipsit, otvalor01, otvalor02, otvalor03, otvalor04, otvalor05, otvalor06, otvalor07, otvalor08, otvalor09, otvalor10, otvalor11, otvalor12, otvalor13, otvalor14, otvalor15, otvalor16, otvalor17, otvalor18, otvalor19, otvalor20, otvalor21, otvalor22, otvalor23, otvalor24, otvalor25, otvalor26, otvalor27, otvalor28, otvalor29, otvalor30, otvalor31, otvalor32, otvalor33, otvalor34, otvalor35, otvalor36, otvalor37, otvalor38, otvalor39, otvalor40, otvalor41, otvalor42, otvalor43, otvalor44, otvalor45, otvalor46, otvalor47, otvalor48, otvalor49, otvalor50, swimpres, cdtipflu, cdflujomc, cdusuari, cdtipsup, swvispre, cdpercli, renuniext, renramo, renpoliex, sworigenmesa, cdrazrecha, cdunidspch, ntrasust, cdsisrol, accion, usuario);
            success = true;
		}catch(Exception ex){
			success = false;
			Utils.manejaExcepcion(ex);
		}
		logger.debug(StringUtils.join(
                
                "\n###### movimientoMesacontrol ######",
                "\n###################################"
               ));
		
		return SUCCESS;
	}
	
	
	// Getters and Setters

	public long getStart() {
		return start;
	}


	public void setStart(long start) {
		this.start = start;
	}


	public long getLimit() {
		return limit;
	}


	public void setLimit(long limit) {
		this.limit = limit;
	}


	public long getTotalCount() {
		return totalCount;
	}


	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
	}


	public boolean isSuccess() {
		return success;
	}


	public void setSuccess(boolean success) {
		this.success = success;
	}


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public Map<String, String> getParams() {
		return params;
	}


	public void setParams(Map<String, String> params) {
		this.params = params;
	}


	public List<Map<String, String>> getList() {
		return list;
	}


	public void setList(List<Map<String, String>> list) {
		this.list = list;
	}

	public String getNtramite() {
		return ntramite;
	}

	public void setNtramite(String ntramite) {
		this.ntramite = ntramite;
	}
	
	
}
