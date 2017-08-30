package mx.com.segurossura.workflow.mesacontrol.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.biosnettcs.core.Constantes;
import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;
import com.biosnettcs.core.model.BaseVO;
import com.biosnettcs.portal.controller.PrincipalCoreAction;
import com.biosnettcs.portal.model.RolSistema;
import com.biosnettcs.portal.model.UsuarioVO;
import com.opensymphony.xwork2.ActionContext;

import mx.com.segurossura.workflow.confcomp.model.ComponenteVO;
import mx.com.segurossura.workflow.confcomp.model.Item;
import mx.com.segurossura.workflow.confcomp.service.PantallasManager;
import mx.com.segurossura.workflow.confcomp.util.GeneradorCampos;
import mx.com.segurossura.workflow.despachador.model.RespuestaTurnadoVO;
import mx.com.segurossura.workflow.despachador.service.DespachadorManager;
import mx.com.segurossura.workflow.mesacontrol.model.EstatusTramite;
import mx.com.segurossura.workflow.mesacontrol.service.MesaControlManager;

@Controller
@Scope("prototype")
@ParentPackage(value="default")
@Namespace("/mesacontrol")
public class MesaControlAction extends PrincipalCoreAction {
	
	private static final long serialVersionUID = -3398140781812652316L;
	
	private static Logger logger = LoggerFactory.getLogger(MesaControlAction.class);
	
	private static SimpleDateFormat        renderFechas     = new SimpleDateFormat("dd/MM/yyyy");
	private Map<String,String>             smap1;
	private Map<String,String>             smap2;
	private List<Map<String,String>>       slist1;
	private List<Map<String,String>>       slist2;
	private List<Map<String,Object>>       olist1;
	private List<BaseVO>                   lista;
	private String                         msgResult;
	private boolean                        success;
	private Map<String,Item>               imap1;
	private String                         username;
	private String                         rol;
	private String                         mensaje;
	private String                         errorMessage;
	private Map<String,Object>             params;
	private String						   tmpNtramite;
	private String                         respuesta;
	
	@Autowired
    private MesaControlManager mesaControlManager;
	
	@Autowired
	private PantallasManager pantallasManager;
	
	@Autowired
    private DespachadorManager despachadorManager;
	
	
    @Action(value   = "principal",
            results = {
                @Result(name="success" , location="/jsp/extjs4/mesacontrol/principal.jsp")
            }
    )
	public String principal() {
        
        logPrettyMessageStartMethod("mesa de control principal");
        
		if(smap1==null) {
			smap1=new HashMap<String,String>(0);
		}
		if((!smap1.containsKey("pv_status_i"))) {
			logger.debug("pv_status_i: "+smap1.get("pv_status_i"));
			smap1.put("pv_status_i","-1");//valor default
		}
		
		logPrettyMessageEndMethod("mesa de control principal");
		return SUCCESS;
	}
	
    
    @Action(value   = "loadTareas",
            results = {
                @Result(name="success", type="json")
            }
    )
	public String loadTareas() {
        
		logPrettyMessageStartMethod("mesa de control loadTareas");
		logger.debug("smap1: "+smap1);
		try {
			//obtener el rol activo
			UsuarioVO usu=(UsuarioVO) session.get("USUARIO");
			String cdrol="";
			if(usu!=null
			    &&usu.getRolActivo()!=null
			    &&usu.getRolActivo().getCdsisrol()!=null)
			{
			    cdrol=usu.getRolActivo().getCdsisrol();
			}
			logger.debug("rol activo: "+cdrol);
			//!obtener el rol activo
			
			/////////////////////////////////////////////////////////
			////// para la nueva lectura de tareas con filtros //////
			/*/////////////////////////////////////////////////////*/
			if(smap1==null)
			{
				smap1=new LinkedHashMap<String,String>(0);
			}
			smap1.put("pv_cdrol_i",cdrol);
			/*/////////////////////////////////////////////////////*/
			////// para la nueva lectura de tareas con filtros //////
			/////////////////////////////////////////////////////////
			
			//////////////////////////////////////////////
			////// para filtrar solo polizas nuevas //////
			smap1.put("pv_cdtiptra_i","1");
			////// para filtrar solo polizas nuevas //////
			//////////////////////////////////////////////
			
            slist1 = mesaControlManager.loadMesaControl(smap1);
			if(slist1!=null&&slist1.size()>0)
			{
				for(int i=0;i<slist1.size();i++)
				{
					String unieco = slist1.get(i).get("cdunieco");
					String ramo   = slist1.get(i).get("cdramo");
					String estado = slist1.get(i).get("estado");
					String poliza = slist1.get(i).get("nmpoliza");
					String solici = slist1.get(i).get("nmsolici");
					if(unieco==null||unieco.length()==0)
						unieco="x";
					if(ramo==null||ramo.length()==0)
						ramo="x";
					if(estado==null||estado.length()==0)
						estado="x";
					if(poliza==null||poliza.length()==0)
						poliza="x";
					if(solici==null||solici.length()==0)
						solici="x";
					slist1.get(i).put("merged",unieco+"#_#"+ramo+"#_#"+estado+"#_#"+poliza+"#_#"+solici);
				}
			}
			success=true;
		} catch(Exception ex) {
			success=false;
			logger.error("error al load tareas",ex);
		}
		logPrettyMessageEndMethod("mesa de control loadTareas");
		return SUCCESS;
	}
	
	////////////////////////////////
	////// loadTareasDinamico //////
	////// smap1:             //////
	//////     pv_cdunieco_i  //////
	//////     pv_ntramite_i  //////
	//////     pv_cdramo_i    //////
	//////     pv_nmpoliza_i  //////
	//////     pv_estado_i    //////
	//////     pv_cdagente_i  //////
	//////     pv_status_i    //////
	//////     pv_cdtipsit_i  //////
	//////     pv_fedesde_i   //////
	//////     pv_fehasta_i   //////
	//////     pv_cdtiptra_i  //////
	/*////////////////////////////*/
    @Action(value   = "loadTareasDinamico",
            results = {
                @Result(name="success", type="json")
            }
    )
	public String loadTareasDinamico() {
        logger.debug(Utils.log(
				"\n################################################",
				"\n################################################",
				"\n###### mesa de control loadTareasDinamico ######",
				"\n######                                    ######"
				));
		logger.debug("smap1: "+smap1);
		try
		{
			UsuarioVO usu=(UsuarioVO) session.get("USUARIO");
			String cdsisrol = usu.getRolActivo().getCdsisrol();
			String cdusuari = usu.getCdusuari();
			String filtro   = smap1.get("filtro");
			smap1.put("pv_cdrol_i",cdsisrol);
			smap1.put("pv_cdusuari_i",cdusuari);
			/*
			if(cdsisrol.equalsIgnoreCase(RolSistema.OPERADOR_SINIESTROS.getCdsisrol())
				     || cdsisrol.equalsIgnoreCase(RolSistema.MEDICO_AJUSTADOR.getCdsisrol())
				     || cdsisrol.equalsIgnoreCase(RolSistema.MESA_DE_CONTROL_SINIESTROS.getCdsisrol())
				     || cdsisrol.equalsIgnoreCase(RolSistema.SINIESTRO_INFONAVIT.getCdsisrol())
				     || cdsisrol.equalsIgnoreCase(RolSistema.COORDINADOR_MEDICO.getCdsisrol())
				     || cdsisrol.equalsIgnoreCase(RolSistema.COORDINADOR_MEDICO_MULTIREGIONAL.getCdsisrol())
				     || cdsisrol.equalsIgnoreCase(RolSistema.GERENTE_MEDICO_MULTIREGIONAL.getCdsisrol()))
			{
				slist1=kernelManager.loadMesaControlUsuario(smap1);
			}
			else
			{*/
			    slist1 = mesaControlManager.loadMesaControl(smap1);
			/*}*/
			olist1=new ArrayList<Map<String,Object>>();
			
			if(StringUtils.isNotBlank(filtro))
			{
				List<Map<String,String>> aux = new ArrayList<Map<String,String>>();
				for(Map<String,String>rec:slist1)
				{
					for(Entry<String,String>en:rec.entrySet())
					{
						String value = en.getValue();
						if(value==null)
						{
							value = "";
						}
						if(value.toUpperCase().indexOf(filtro.toUpperCase())!=-1)
						{
							aux.add(rec);
							break;
						}
					}
				}
				slist1 = aux;
			}
			
			if(slist1!=null&&slist1.size()>0)
			{
				for(Map<String,String> tramite:slist1)
				{
					Map<String,Object>aux=new HashMap<String,Object>();
					for(Entry<String,String> en:tramite.entrySet())
					{
						String key   = en.getKey();
						String value = en.getValue();
						aux.put(key,value);
					}
					olist1.add(aux);
				}
				
				for(Map<String,Object> tramite:olist1)
				{
					Map<String,String>parametros=new HashMap<String,String>();
					for(Entry<String,Object> en:tramite.entrySet())
					{
						String key   = en.getKey();
						String value = (String)en.getValue();
						if(key!=null&&key.length()>6&&key.substring(0, 7).equalsIgnoreCase("otvalor"))
						{
							parametros.put("pv_"+key,value);
						}
					}
					tramite.put("parametros",parametros);
				}
			}
			
			slist1=null;
			success=true;
		}
		catch(Exception ex)
		{
			success=false;
			logger.error("error al load tareas dinamico",ex);
		}
		logger.debug(Utils.log(
				"\n######                                    ######",
				"\n###### mesa de control loadTareasDinamico ######",
				"\n################################################",
				"\n################################################"
				));
		return SUCCESS;
	}
	/*////////////////////////////*/
	////// loadTareasDinamico //////
	////////////////////////////////
	@Action(value   = "guardarTramiteManual",
            results = {
                @Result(name="success", type="json")
            }
    )
	public String guardarTramiteManual() {
		logger.debug(Utils.log(
				"\n##################################################",
				"\n##################################################",
				"\n###### guardarTramiteManual                 ######",
				"\n######                                      ######"
				));
		try
		{
			UsuarioVO user = (UsuarioVO)session.get("USUARIO");
			
			Map<String,Object>omap=new LinkedHashMap<String,Object>(0);
			Iterator it=smap1.entrySet().iterator();
			while(it.hasNext())
			{
				Entry entry=(Entry)it.next();
				omap.put((String)entry.getKey(),entry.getValue());
			}
			omap.put("pv_ferecepc_i",new Date());
			omap.put("pv_festatus_i",new Date());
			omap.put("pv_cdunieco_i",omap.get("pv_cdsucdoc_i"));
			omap.put("cdusuari" , user.getCdusuari());
			omap.put("cdsisrol" , user.getRolActivo().getCdsisrol());
			
			//Validamos el usuario contra la sucursal:
			//kernelManager.validaUsuarioSucursal(omap.get("pv_cdsucdoc_i").toString(), null, null, user.getCdusuari());
			
			//WrapperResultados res = kernelManager.PMovMesacontrol(omap);
			String ntramiteGenerado = mesaControlManager.movimientoTramite (
					(String)omap.get("pv_cdsucdoc_i")
					,(String)omap.get("pv_cdramo_i")
					,(String)omap.get("pv_estado_i")
					,(String)omap.get("pv_nmpoliza_i")
					,(String)omap.get("pv_nmsuplem_i")
					,(String)omap.get("pv_cdsucadm_i")
					,(String)omap.get("pv_cdsucdoc_i")
					,(String)omap.get("pv_cdtiptra_i")
					,new Date()
					,(String)omap.get("pv_cdagente_i")
					,(String)omap.get("pv_referencia_i")
					,(String)omap.get("pv_nombre_i")
					,new Date()
					,(String)omap.get("pv_status_i")
					,(String)omap.get("pv_comments_i")
					,(String)omap.get("pv_nmsolici_i")
					,(String)omap.get("pv_cdtipsit_i")
					,user.getCdusuari()
					,user.getRolActivo().getCdsisrol()
					,null //swimpres
					,null //cdtipflu
					,null //cdflujomc
					,smap1, null, null, null, null
					);
			//if(res.getItemMap() == null)log.error("Sin mensaje respuesta de nmtramite!!");
			if(ntramiteGenerado==null)logger.error("Sin mensaje respuesta de nmtramite!!");
			//else msgResult = (String) res.getItemMap().get("ntramite");
			else msgResult = ntramiteGenerado;
					logger.debug("TRAMITE RESULTADO: "+msgResult);
					
			logger.debug("se inserta detalle nuevo");
        	/*Map<String,Object>parDmesCon=new LinkedHashMap<String,Object>(0);
        	parDmesCon.put("pv_ntramite_i"   , ntramiteGenerado);
        	parDmesCon.put("pv_feinicio_i"   , new Date());
        	parDmesCon.put("pv_cdclausu_i"   , null);
        	parDmesCon.put("pv_comments_i"   , "Se guard\u00f3 un nuevo tr\u00e1mite manual desde mesa de control");
        	parDmesCon.put("pv_cdusuari_i"   , user.getCdusuari());
        	parDmesCon.put("pv_cdmotivo_i"   , null);
        	parDmesCon.put("pv_cdsisrol_i"   , user.getRolActivo().getCdsisrol());
        	kernelManager.movDmesacontrol(parDmesCon);*/
			mesaControlManager.movimientoDetalleTramite(
					ntramiteGenerado
					,new Date()
					,null//lcdclausu
					,"Se guard\u00f3 un nuevo tr\u00e1mite manual desde mesa de control"
					,user.getCdusuari()
					,null//cdmotivo
					,user.getRolActivo().getCdsisrol()
					,"S"
					,EstatusTramite.PENDIENTE.getCodigo()
					,false
					);
					
			success=true;
			
		} catch(ApplicationException ae) {
			logger.error("Error al guardar tramite manual", ae);
			errorMessage = ae.getMessage();
		} catch(Exception ex) {
			logger.error("error al guardar tramite manual",ex);
		}
		logger.debug(Utils.log(
				"\n######                                      ######",
				"\n###### guardarTramiteManual                 ######",
				"\n##################################################",
				"\n##################################################"
				));
		return SUCCESS;
	}
	
	////////////////////////////////////////////////
	////// actualizar status de tramite de mc //////
	/*////////////////////////////////////////////*/
	@Action(value   = "actualizarStatusTramite",
            results = {
                @Result(name="success", type="json")
            }
    )
	public String actualizarStatusTramite() {
		logger.debug(Utils.log(
				"\n#####################################",
				"\n#####################################",
				"\n###### actualizarStatusTramite ######",
				"\n######                         ######"
				));
		logger.debug("smap1: "+smap1);
		try
		{
			//Se obtienen los datos del usuario:
			UsuarioVO usu=(UsuarioVO)session.get("USUARIO");
			
			String statusNuevo=smap1.get("status");
			String ntramite=smap1.get("ntramite");
			String comments=smap1.get("comments");
			String cdmotivo=smap1.get("cdmotivo");
			String mostrarAgente=smap1.get("swagente");
			
			String rolDestino     = smap1.get("rol_destino");
			String usuarioDestino = smap1.get("usuario_destino");
			//boolean paraUsuario = StringUtils.isNotBlank(rolDestino);
			String cdusuariSesion = StringUtils.isNotBlank(smap1.get("usuario_inicial"))?smap1.get("usuario_inicial"):usu.getCdusuari();
			String cdsisrolSesion = StringUtils.isNotBlank(smap1.get("rol_inicial"))?smap1.get("rol_inicial"):usu.getRolActivo().getCdsisrol();
			String cdclausu       = null;
			
			Map<String,Object> res = mesaControlManager.moverTramite(
					ntramite
					,statusNuevo
					,comments
						,cdusuariSesion
						,cdsisrolSesion
					,usuarioDestino
					,rolDestino
					,cdmotivo
					,cdclausu
					,mostrarAgente
					,null, false
					);
			
			Boolean escalado  = (Boolean)res.get("ESCALADO");
			String  statusEsc = (String)res.get("STATUS");
			String  async     = (String)res.get("ASYNC");
			
			if(!"S".equals(async))
			{
				async = "N";
			}
			
			smap1.put("nombreUsuarioDestino" , (String)res.get("NOMBRE"));
			smap1.put("ESCALADO"             , escalado ? "S" : "N" );
			smap1.put("ASYNC"                , async);
			/*
			if(escalado)
			{
				smap1.put("status" , statusEsc);
			} else {
				// JTEZVA 2016-09-01
				// SI APROBAMOS GUARDAMOS EL EVENTO [MESADECONTROL - APROBCOTCOL] CON NUMERO DE COTIZACION
				if (EstatusTramite.COTIZACION_APROBADA.getCodigo().equals(statusNuevo)) {
					logger.debug("Recuperando tramite");
					FlujoVO flujo = new FlujoVO();
					flujo.setNtramite(ntramite);
					Map<String,Object> datosTramite = flujoMesaControlManager.recuperarDatosTramiteValidacionCliente(flujo);
					Map<String,String> tramite = (Map<String,String>)datosTramite.get("TRAMITE");
					logger.debug(Utils.log("Tramite recuperado: ", tramite));
					String cdunieco = tramite.get("CDUNIECO"),
					       cdramo   = tramite.get("CDRAMO"),
					       estado   = tramite.get("ESTADO"),
					       nmsolici = tramite.get("NMSOLICI"),
					       cdagente = tramite.get("CDAGENTE"),
					       cdmodulo = Constantes.MODULO_MESA_CONTROL,
					       cdevento = Constantes.EVENTO_APROBACION_COT_COL;
					StringBuilder sb = new StringBuilder("\nSe confirma una cotizacion colectiva");
					mesaControlManager.grabarEvento(
						sb,
	            	    cdmodulo,
	            	    cdevento,
	            	    new Date(),
	            	    cdusuariSesion,
	            	    cdsisrolSesion,
	            	    ntramite,
	            	    cdunieco,
	            	    cdramo,
	            	    estado,
	            	    nmsolici,
	            	    nmsolici,
	            	    cdagente,
	            	    null,
	            	    null
	            	);
					logger.debug(Utils.log(sb.toString()));
					mesaControlManager.concatenarAlInicioDelUltimoDetalle(
							ntramite,
							Utils.join("Se aprob\u00f3 la cotizaci\u00f3n ",nmsolici," con las siguientes observaciones: "),
							cdmodulo,
							cdevento
							);
				}
			}
			*/
			/*
			// Se actualiza el estatus en la mesa de control:
			//kernelManager.mesaControlUpdateStatus(ntramite,statusNuevo);
			
			// Creamos un enum en base al tipo de tramite
			EstatusTramite enumEstatusTramite = null;
			for(EstatusTramite statTra : EstatusTramite.values()) {
				if(statTra.getCodigo().equals(statusNuevo)) {
					enumEstatusTramite = statTra;
					break;
				}
			}
			String comentarioPrevio = "";
	    	switch(enumEstatusTramite) {
	    		case EN_REVISION_MEDICA:
	    			comentarioPrevio = "<p>El tr\u00e1mite fue turnado a revisi\u00f3n m\u00e9dica con las siguientes observaciones:</p>";
	    			break;
	    		case RECHAZADO:
	    			comentarioPrevio = "<p>La p\u00f3liza fue rechazada con los siguientes detalles:</p>";
	    			break;
	    		case VO_BO_MEDICO:
	    		case SOLICITUD_MEDICA:
	    			comentarioPrevio = "<p>El m\u00e9dico revis\u00f3 el tr\u00e1mite con las siguientes observaciones:</p>";
	    			break;
	    		case EN_ESPERA_DE_AUTORIZACION:
	    			comentarioPrevio = "<p>El coordinador m\u00e9dico multiregional remiti\u00f3 las siguientes observaciones:</p>";
	    			break;
				default:
					break;
			}
	    	log.debug("se inserta detalle nuevo");
        	Map<String,Object>parDmesCon=new LinkedHashMap<String,Object>(0);
        	parDmesCon.put("pv_ntramite_i"   , ntramite);
        	parDmesCon.put("pv_feinicio_i"   , new Date());
        	parDmesCon.put("pv_cdclausu_i"   , null);
        	parDmesCon.put("pv_comments_i"   , new StringBuilder(comentarioPrevio).append(comments));
        	parDmesCon.put("pv_cdusuari_i"   , datUsu.getCdusuari());
        	parDmesCon.put("pv_cdmotivo_i"   , cdmotivo);
        	// Se inserta el detalle de la mesa de control:
        	//kernelManager.movDmesacontrol(parDmesCon);
        	
        	if(paraUsuario)
        	{
        		siniestrosManager.turnarTramite(ntramite, rolDestino, usuarioDestino);
        	}
			*/
			
			success=true;
			
		} catch(Exception ex) {
			success=false;
			logger.error("error al actualizar status de tramite de mesa de control",ex);
			mensaje=ex.getMessage();
		}
		logger.debug(Utils.log(
				"\n######                         ######",
				"\n###### actualizarStatusTramite ######",
				"\n#####################################",
				"\n#####################################"
				));
		return SUCCESS;
	}

	@Action(value   = "reasignarTramiteIndividual",
            results = {
                @Result(name="success", type="json")
            }
    )
	public String reasignarTramiteIndividual() {
	    logger.debug(Utils.log(
	            "\n########################################",
	            "\n########################################",
	            "\n###### reasignarTramiteIndividual ######",
	            "\n######                            ######"
	            ));
	    logger.debug("smap1: "+smap1);
	    try
	    {
	        
	        Utils.validate(smap1, "No hay datos para reasignar tramite");
	        
            UsuarioVO usuario = (UsuarioVO)Utils.validateSession(session);
            String cdusuari = usuario.getCdusuari(),
                   cdsisrol = usuario.getRolActivo().getCdsisrol();
            Date fechaHoy = new Date();
            
	        String statusNuevo=smap1.get("status");
	        String ntramite=smap1.get("ntramite");
	        String comments=smap1.get("comments");
	        String cdmotivo=smap1.get("cdmotivo");
	        String mostrarAgente=smap1.get("swagente");
	        
	        String rolDestino     = smap1.get("rol_destino");
	        String usuarioDestino = smap1.get("usuario_destino");
	        //boolean paraUsuario = StringUtils.isNotBlank(rolDestino);
	        
            
            RespuestaTurnadoVO reasignado = despachadorManager.turnarTramite(
                    cdusuari, 
                    cdsisrol, 
                    ntramite, 
                    statusNuevo, 
                    comments, 
                    cdmotivo,  // cdrazrecha 
                    usuarioDestino,  // cdusuariDes 
                    rolDestino,  // cdsisrolDes 
                    Constantes.SI.equalsIgnoreCase(mostrarAgente), // permisoAgente 
                    false, // porEscalamiento 
                    fechaHoy, 
                    false  // sinGrabarDetalle
                    );
            
            logger.debug(Utils.log("Tr\u00e1mite reasignado. ", reasignado.getMessage()));
            
            smap1.put("nombreUsuarioDestino" , reasignado.getMessage());
	        
	        success=true;
	        
	    } catch(Exception ex) {
	        success=false;
	        logger.error("error al actualizar status de tramite de mesa de control",ex);
	        mensaje=ex.getMessage();
	    }
	    logger.debug(Utils.log(
	            "\n######                            ######",
	            "\n###### reasignarTramiteIndividual ######",
	            "\n########################################",
	            "\n########################################"
	            ));
	    return SUCCESS;
	}
	
	
	////////////////////////////////////////////////
	////// actualizar status de tramite de mc //////
	/*////////////////////////////////////////////*/
	@Action(value   = "turnarAOperadorReclamacion",
            results = {
                @Result(name="success", type="json")
            }
    )
	public String turnarAOperadorReclamacion() {
		logger.debug(Utils.log(
				"\n################################################",
				"\n################################################",
				"\n###### turnar a Operador de Reclamaciones ######",
				"\n######                         		   ######"
				));
		logger.debug("smap1: "+smap1);
		try
		{
			UsuarioVO usu=(UsuarioVO)session.get("USUARIO");
			//Se obtienen los datos del usuario:
			String statusNuevo=smap1.get("status");
			String ntramite=smap1.get("ntramite");
			String comments=smap1.get("comments");
			String cdmotivo=smap1.get("cdmotivo");
			
			String rolDestino     = smap1.get("rol_destino");
			String usuarioDestino = smap1.get("usuario_destino");
			
			String cdusuariSesion = usu.getCdusuari();
			String cdsisrolSesion = "COORDINASINI";
			String cdclausu       = null;
			mesaControlManager.moverTramite(ntramite, statusNuevo, comments, cdusuariSesion, cdsisrolSesion, usuarioDestino, rolDestino, cdmotivo, cdclausu,null,null, false);
			success=true;
			
		} catch(Exception ex) {
			success=false;
			logger.error("error al actualizar status de tramite de mesa de control",ex);
			mensaje=ex.getMessage();
		}
		logger.debug(Utils.log(
				"\n######                         		   ######",
				"\n###### Turnar a operador de Reclamaciones ######",
				"\n################################################",
				"\n################################################"
				));
		return SUCCESS;
	}
	
	@Action(value   = "actualizaComentariosTramite",
            results = {
                @Result(name="success", type="json")
            }
    )
	public String actualizaComentariosTramite() {
		logger.debug(Utils.log(
				"\n#########################################",
				"\n#########################################",
				"\n###### actualizaComentariosTramite ######",
				"\n######                             ######"
				));
		logger.debug("params: "+params);
		try
		{
			HashMap<String,Object> temp =  new HashMap<String, Object>();
			temp.put("pv_ntramite_i", tmpNtramite);
			temp.put("pv_comments_i", mensaje);
			
			mesaControlManager.actualizaOTValorMesaControl(temp);
			
		} catch(Exception ex) {
			success=false;
			logger.error("error al actualizar status de tramite de mesa de control",ex);
			mensaje=ex.getMessage();
		}
		logger.debug(Utils.log(
				"\n######                             ######",
				"\n###### actualizaComentariosTramite ######",
				"\n#########################################",
				"\n#########################################"
				));
		
		success=true;
		return SUCCESS;
	}
	/*////////////////////////////////////////////*/
	////// actualizar status de tramite de mc //////
	////////////////////////////////////////////////
	
	////////////////////////////////////////////////
	////// obtener los detalles de un tramite //////
	/*////////////////////////////////////////////*/
	@Action(value   = "obtenerDetallesTramite",
            results = {
                @Result(name="success", type="json")
            }
    )
	public String obtenerDetallesTramite() {
		logger.debug(Utils.log(
				"\n####################################",
				"\n###### obtenerDetallesTramite ######",
				"\n###### smap1 = ", smap1
				));
		try {
			slist1  = mesaControlManager.obtenerDetalleMC(smap1);
			
			if (slist1 != null && slist1.size() > 0) {
				logger.debug("Voy a ver si el primer detalle tiene usuario distinto de inicio y fin para mostrar el de inicio");
				for (Map<String, String> detalle : slist1) {
					if ("1".equals(detalle.get("NMORDINA"))) {
						logger.debug("Procesamos detalle = {}", detalle);
						if (!detalle.get("DSUSUARI_INI").equals(detalle.get("DSUSUARI_FIN"))) {
							detalle.put("DSUSUARI_FIN", detalle.get("DSUSUARI_INI"));
							detalle.put("DSSISROL_FIN", detalle.get("DSSISROL_INI"));
						}
					}
					// Si no tengo usuario fin pero tengo usuario destino
					if (StringUtils.isBlank(detalle.get("CDUSUARI_FIN")) && StringUtils.isNotBlank(detalle.get("CDUSUARI_DEST"))) {
					    detalle.put("CDUSUARI_FIN", detalle.get("CDUSUARI_DEST"));
					    detalle.put("DSUSUARI_FIN", detalle.get("DSUSUARI_DEST"));
					    detalle.put("CDSISROL_FIN", detalle.get("CDSISROL_DEST"));
					    detalle.put("DSSISROL_FIN", detalle.get("DSSISROL_DEST"));
					}
				}
			}
			
			success = true;
		} catch (Exception ex) {
			logger.error("error al obtener el detalle de mesa de control",ex);
		}
		logger.debug(Utils.log(
				"\n###### success = ", success,
				"\n###### obtenerDetallesTramite ######",
				"\n####################################"
				));
		return SUCCESS;
	}
	/*////////////////////////////////////////////*/
	////// obtener los detalles de un tramite //////
	////////////////////////////////////////////////
	
	
	/////////////////////////////////////////////////
	//////      mesa de control dinamica       //////
	/*
	smap1:
		(URL)gridTitle=Endosos en espera
		(URL)cdramo=
		(URL)cdtipsit=
	smap2:
		(URL)pv_cdtiptra_i=15
		pv_fehasta_i=,
		pv_cdagente_i=,
		pv_estado_i=,
		pv_cdtipsit_i=,
		pv_status_i=-1,
		pv_cdunieco_i=,
		pv_fedesde_i=,
		pv_nmpoliza_i=,
		pv_ntramite_i=,
		pv_cdramo_i=
	*/
	/*/////////////////////////////////////////////*/
	@Action(value   = "mcdinamica",
            results = {
                @Result(name="success", location="/jsp/extjs4/mesacontrol/mcdinamica.jsp")
            }
    )
	public String mcdinamica() {
		logger.debug(Utils.log(
				"\n######################################",
				"\n######################################",
				"\n###### mesa de control dinamica ######",
				"\n######                          ######"
				));
		logger.debug("smap1: "+smap1);
		logger.debug("smap2: "+smap2);
		
		try
		{
			UsuarioVO usuario=(UsuarioVO) this.session.get("USUARIO");
			username=usuario.getCdusuari();
			smap1.put("cdsisrol" , usuario.getRolActivo().getCdsisrol());
			smap1.put("cdusuari" , usuario.getCdusuari());
			
			String cdtiptra                  = smap2.get("pv_cdtiptra_i");
			String cdramo                    = smap1.get("cdramo");
			String cdtipsit                  = smap1.get("cdtipsit");
			String pantalla                  = "TATRIMC";
			String seccionForm               = "FORMULARIO";
			String seccionGrid               = "TATRIMC";
			String seccionFiltro             = "FILTRO";
			String seccionActionColumn       = "ACTIONCOLUMN";
			String seccionActionColumnStatus = "STATUSCOLUMNS";
			String seccionGridButtons        = "GRIDBUTTONS";
			String seccionBotonesTramite     = "BOTONES_TRAMITE";
			
			rol = usuario.getRolActivo().getCdsisrol();
			
			////// obtener valores del formulario //////
			List<ComponenteVO>ltFormulario=pantallasManager.obtenerComponentes(
					cdtiptra, null, cdramo,
					cdtipsit, null, rol,
					pantalla, seccionForm, null);
			
			////// obtener valores del grid //////
			List<ComponenteVO>ltgridpanel=pantallasManager.obtenerComponentes(
					cdtiptra, null, cdramo,
					cdtipsit, null, rol,
					pantalla, seccionGrid, null);
			
			////// obtener valores del filtro //////
			List<ComponenteVO>ltfiltro=pantallasManager.obtenerComponentes(
					cdtiptra, null, cdramo,
					cdtipsit, null, rol,
					pantalla, seccionFiltro, null);
			
			////// obtener botones del action column //////
			List<ComponenteVO>ltactioncolumn=pantallasManager.obtenerComponentes(
					cdtiptra, null, cdramo,
					cdtipsit, null, rol,
					pantalla, seccionActionColumn, null);
			
			////// obtener botones del action column por status//////
			List<ComponenteVO>ltactioncolumnstatus=pantallasManager.obtenerComponentes(
					cdtiptra, null, cdramo,
					cdtipsit, null, rol,
					pantalla, seccionActionColumnStatus, null);
			
			////// obtener botones del grid //////
			List<ComponenteVO>ltgridbuttons=pantallasManager.obtenerComponentes(
					cdtiptra, null, cdramo,
					cdtipsit, null, rol,
					pantalla, seccionGridButtons, null);
			
			List<ComponenteVO>ltBotonesTramite=pantallasManager.obtenerComponentes(
					cdtiptra, null, cdramo,
					cdtipsit, null, rol,
					pantalla, seccionBotonesTramite, null);
			
			GeneradorCampos gc=new GeneradorCampos(ServletActionContext.getServletContext().getServletContextName());
			
			////// generar grid //////
			gc.generaComponentes(ltgridpanel, true, true, false, true, false, false);
			imap1=new HashMap<String,Item>(0);
			imap1.put("modelFields",gc.getFields());
			imap1.put("gridColumns",gc.getColumns());
			
			////// generar formulario //////
			gc.generaComponentes(ltFormulario, true, false, true, false, false, false);
			imap1.put("formItems",gc.getItems());
			
			////// generar filtro //////
			gc.generaComponentes(ltfiltro, true, false, true, false, false, false);
			imap1.put("itemsFiltro",gc.getItems());
			
			gc.generaComponentes(ltactioncolumn, true, false, false, false, false, true);
			imap1.put("actionColumns",gc.getButtons());
			
			gc.generaComponentes(ltactioncolumnstatus, true, false, false, true, false, false);
			imap1.put("statusColumns",gc.getColumns());
			
			gc.generaComponentes(ltgridbuttons, true, false, false, false, false, true);
			imap1.put("gridbuttons",gc.getButtons());
			
			gc.generaComponentes(ltBotonesTramite, true, false, false, false, false, true);
			imap1.put("botonesTramite",gc.getButtons());
			
			///////////////////////////////////////
			////// para poner -1 por defecto //////
			if(smap2==null)
			{
				smap2=new HashMap<String,String>(0);
			}
			if((!smap2.containsKey("pv_status_i")))
			{
				smap2.put("pv_status_i","-1");
			}
			if(rol.equals(RolSistema.AGENTE.getCdsisrol()))
			{
				smap2.put("pv_cdagente_i",mesaControlManager.cargarCdagentePorCdusuari(username));
			}
			////// para poner -1 por defecto //////
			///////////////////////////////////////	
		}
		catch(Exception ex)
		{
			logger.error("error al cargar mesa de control dinamica",ex);
		}
		
		logger.debug(Utils.log(
				"\n######                          ######",
				"\n###### mesa de control dinamica ######",
				"\n######################################",
				"\n######################################"
				));
		return SUCCESS;
		
		
	}
	/*/////////////////////////////////////////////////*/ 
	//////         mesa de control dinamica        //////
	/////////////////////////////////////////////////////
	
	/////////////////////////////////////////////
	////// guardar tramite manual dinamico //////
	/*/////////////////////////////////////////*/
	@Action(value   = "guardarTramiteDinamico",
            results = {
                @Result(name="success", type="json")
            }
    )
	public String guardarTramiteDinamico() {
		logger.debug(Utils.log(
				"\n####################################",
				"\n####################################",
				"\n###### guardarTramiteDinamico ######",
				"\n######                        ######"
				));
		try
		{
			//////////////////////////////////
			////// Se guarda el tramite //////
			Map<String,Object>omap=new LinkedHashMap<String,Object>(0);
			for(Entry<String,String> entry:smap1.entrySet())
			{
				omap.put((String)entry.getKey(),entry.getValue());//se pasa de smap1 a omap
			}
			
			omap.put("pv_cdunieco_i",smap1.get("pv_cdsucdoc_i"));//se parcha porque requiere el mismo valor
			omap.put("pv_ferecepc_i",renderFechas.parse((String)omap.get("pv_ferecepc_i")));//se convierte String a Date
			omap.put("pv_festatus_i",renderFechas.parse((String)omap.get("pv_festatus_i")));//se convierte String a Date
			
			//Validamos el usuario contra la sucursal:
			UsuarioVO user=(UsuarioVO)session.get("USUARIO");
			//WrapperResultados result = kernelManager.validaUsuarioSucursal(smap1.get("pv_cdsucdoc_i").toString(), null, null, user.getCdusuari());
			
			omap.put("cdusuari" , user.getCdusuari());
			omap.put("cdsisrol" , user.getRolActivo().getCdsisrol());
			
			//WrapperResultados res = kernelManager.PMovMesacontrol(omap);
			String ntramiteGenerado = mesaControlManager.movimientoTramite (
					(String)omap.get("pv_cdsucdoc_i")
					,(String)omap.get("pv_cdramo_i")
					,(String)omap.get("pv_estado_i")
					,(String)omap.get("pv_nmpoliza_i")
					,(String)omap.get("pv_nmsuplem_i")
					,(String)omap.get("pv_cdsucadm_i")
					,(String)omap.get("pv_cdsucdoc_i")
					,(String)omap.get("pv_cdtiptra_i")
					,(Date)omap.get("pv_ferecepc_i")
					,(String)omap.get("pv_cdagente_i")
					,(String)omap.get("pv_referencia_i")
					,(String)omap.get("pv_nombre_i")
					,(Date)omap.get("pv_festatus_i")
					,(String)omap.get("pv_status_i")
					,(String)omap.get("pv_comments_i")
					,(String)omap.get("pv_nmsolici_i")
					,(String)omap.get("pv_cdtipsit_i")
					,user.getCdusuari()
					,user.getRolActivo().getCdsisrol()
					,null //swimpres
					,null //cdtipflu
					,null //cdflujomc
					,smap1, null, null, null, null
					);
			////// Se guarda el tramite //////
			//////////////////////////////////
			
			////////////////////////////////////////////
			////// se verifica que se guarde bien //////
			//if(res.getItemMap() == null)
			if(ntramiteGenerado==null)
			{
				logger.error("Sin mensaje respuesta de nmtramite!!");
			}
			else
			{
				//msgResult = (String) res.getItemMap().get("ntramite");
				msgResult = ntramiteGenerado;
			}
			logger.debug("TRAMITE RESULTADO: "+msgResult);
			////// se verifica que se guarde bien //////
			////////////////////////////////////////////

			//////////////////////////////////
			////// se guarda el detalle //////
			UsuarioVO usu=(UsuarioVO)session.get("USUARIO");
			logger.debug("se inserta detalle nuevo");
        	/*Map<String,Object>parDmesCon=new LinkedHashMap<String,Object>(0);
        	//parDmesCon.put("pv_ntramite_i"   , res.getItemMap().get("ntramite"));
        	parDmesCon.put("pv_ntramite_i"   , ntramiteGenerado);
        	parDmesCon.put("pv_feinicio_i"   , new Date());
        	parDmesCon.put("pv_cdclausu_i"   , null);
        	parDmesCon.put("pv_comments_i"   , "Se guard\u00f3 un nuevo tr\u00e1mite manual desde mesa de control");
        	parDmesCon.put("pv_cdusuari_i"   , usu.getCdusuari());
        	parDmesCon.put("pv_cdmotivo_i"   , null);
        	parDmesCon.put("pv_cdsisrol_i"   , usu.getRolActivo().getCdsisrol());
        	kernelManager.movDmesacontrol(parDmesCon);*/
			mesaControlManager.movimientoDetalleTramite(
					ntramiteGenerado
					,new Date()
					,null
					,"Se guard\u00f3 un nuevo tr\u00e1mite manual desde mesa de control"
					,usu.getCdusuari()
					,null
					,usu.getRolActivo().getCdsisrol()
					,"S"
					,EstatusTramite.PENDIENTE.getCodigo()
					,false
					);
			////// se guarda el detalle //////
        	//////////////////////////////////
        	/*
        	try {
            	mesaControlManager.grabarEvento(new StringBuilder("\nNuevo tramite")
            	    ,Constantes.MODULO_GENERAL
            	    ,Constantes.EVENTO_NUEVO_TRAMITE
            	    ,new Date()
            	    ,((UsuarioVO)session.get("USUARIO")).getCdusuari()
            	    ,((UsuarioVO)session.get("USUARIO")).getRolActivo().getCdsisrol()
            	    ,ntramiteGenerado
            	    ,smap1.get("pv_cdsucdoc_i")
            	    ,(String)omap.get("pv_cdramo_i")
            	    ,null
            	    ,null
            	    ,null
            	    ,(String)omap.get("pv_cdagente_i")
            	    ,null
            	    ,null
            	    );
            } catch(Exception ex) {
            	logger.error("Error al grabar evento, sin impacto",ex);
            }
        	*/
			success=true;
			
		} catch(ApplicationException ae) {
			
			logger.error("Error al guardar tramite dinamico", ae);
			errorMessage = ae.getMessage();
			
	    } catch(Exception ex) {
			logger.error("error al guardar tramite dinamico",ex);
			success=false;
		}
		logger.debug(Utils.log(
				"\n######                        ######",
				"\n###### guardarTramiteDinamico ######",
				"\n####################################",
				"\n####################################"
				));
		return SUCCESS;
	}
	/*/////////////////////////////////////////*/
	////// guardar tramite manual dinamico //////
	/////////////////////////////////////////////
	@Action(value   = "regresarEmisionEnAutori",
            results = { @Result(name="success", type="json") },
            interceptorRefs = {
                @InterceptorRef(
                        value = "json", params = {"enableSMD", "true", "ignoreSMDMethodInterfaces", "false"
                })
    })
	public String regresarEmisionEnAutori() {
	    
		this.session=ActionContext.getContext().getSession();
		
		logger.debug(Utils.log(
				"\n#####################################",
				"\n###### regresarEmisionEnAutori ######",
				"\n###### smap1 = ", smap1
				));
		try {
		    Utils.validate(smap1, "No hay datos");
    		String ntramiteAuto = smap1.get("ntramiteAuto"),
    		       ntramiteEmi  = smap1.get("ntramiteEmi"),
    		       comentario   = smap1.get("comentario");
    		UsuarioVO usuario = (UsuarioVO)Utils.validateSession(session);
    		String cdusuari = usuario.getCdusuari(),
                   cdsisrol = usuario.getRolActivo().getCdsisrol();
			Date fechaHoy = new Date();
			RespuestaTurnadoVO despachoAutoriz = despachadorManager.turnarTramite(
			        cdusuari, 
			        cdsisrol, 
			        ntramiteAuto, 
			        EstatusTramite.CONFIRMADO.getCodigo(), 
			        Utils.join("El gerente regres\u00f3 el tr\u00e1mite con las siguientes observaciones: ", comentario), 
			        null,  // cdrazrecha 
			        null,  // cdusuariDes 
			        null,  // cdsisrolDes 
			        false, // permisoAgente 
			        false, // porEscalamiento 
			        fechaHoy, 
			        false  // sinGrabarDetalle
			        );
			RespuestaTurnadoVO despachoEmisi = despachadorManager.turnarTramite(
                    cdusuari, 
                    cdsisrol, 
                    ntramiteEmi, 
                    EstatusTramite.EN_SUSCRIPCION.getCodigo(), 
                    Utils.join("El gerente regres\u00f3 el tr\u00e1mite con las siguientes observaciones: ", comentario), 
                    null,  // cdrazrecha 
                    null,  // cdusuariDes 
                    null,  // cdsisrolDes 
                    false, // permisoAgente 
                    false, // porEscalamiento 
                    fechaHoy, 
                    false  // sinGrabarDetalle
                    );
        	mensaje = Utils.join("Tr\u00e1mite regresado. ", despachoEmisi.getMessage());
        	success = true;
		} catch (Exception ex) {
			mensaje = Utils.manejaExcepcion(ex);
		}
		logger.debug(Utils.log(
		        "\n###### success = " , success,
		        "\n###### mensaje = " , mensaje,
				"\n###### regresarEmisionEnAutori ######",
				"\n#####################################"
				));
		return SUCCESS;
	}
	
	
	@Action(value   = "movimientoDetalleTramite",
            results = {
                @Result(name="success", type="json")
            }
    )
	public String movimientoDetalleTramite() {
		logger.debug(Utils.join(
				"\n######################################",
				"\n###### movimientoDetalleTramite ######",
				"\n###### smap1=",smap1
				));
		
		try
		{
			UsuarioVO user = (UsuarioVO)Utils.validateSession(session);
			
			Utils.validate(smap1 , "No se recibieron datos");
			
			String ntramite  = smap1.get("ntramite")
			       ,dscoment = smap1.get("dscoment")
			       ,status   = smap1.get("status")
			       ,cerrado  = smap1.get("cerrado")
			       ,swagente = smap1.get("swagente");
			
			Utils.validate(ntramite , "No se recibio el numero de tramite");
			
			mesaControlManager.movimientoDetalleTramite(
					ntramite, new Date(), null
					,dscoment, user.getCdusuari(), null
					,user.getRolActivo().getCdsisrol(),swagente
					,status,"S".equals(cerrado)
					);
		}
		catch(Exception ex)
		{
			mensaje = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(Utils.join(
				"\n###### movimientoDetalleTramite ######",
				"\n######################################"
				));
		return SUCCESS;
	}
	
	
	@Action(value   = "validarAntesDeTurnar",
            results = {
                @Result(name="success", type="json")
            }
    )
	public String validarAntesDeTurnar() {
		logger.debug(Utils.log(
				"\n##################################",
				"\n###### validarAntesDeTurnar ######",
				"\n###### smap1=",smap1
				));
		
		try
		{
			UsuarioVO usuario = (UsuarioVO)Utils.validateSession(session);
			
			Utils.validate(smap1 , "No se recibieron datos");
			
			String ntramite = smap1.get("ntramite");
			String status   = smap1.get("status");
			
			mesaControlManager.validarAntesDeTurnar(ntramite,status,usuario.getCdusuari(),usuario.getRolActivo().getCdsisrol());
			
			success = true;
		}
		catch(Exception ex)
		{
			respuesta = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(Utils.log(
				"\n###### validarAntesDeTurnar ######",
				"\n##################################"
				));
		return SUCCESS;
	}
	
	
	@Action(value   = "reversaTramite",
            results = {
                @Result(name="success", type="json")
            }
    )
	public String regenerarReverso() {
		logger.debug(Utils.log(
				"\n####################################",
				"\n###### Validar Reversar ######",
				"\n###### smap1=",smap1
				));
		
		try
		{
			UsuarioVO usuario  = (UsuarioVO)Utils.validateSession(session);
			String  cdusuari = usuario.getCdusuari();
			String cdsisrol = usuario.getRolActivo().getCdsisrol();
			
			
			Utils.validate(smap1 , "No se recibieron datos");
			String ntramite = smap1.get("pv_ntramite");
			
			
			mesaControlManager.regeneraReverso(ntramite,cdsisrol,cdusuari);
			
			success = true;
		}
		catch(Exception ex)
		{
			String message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(Utils.log(
				"\n###### Validar Reversar ######",
				"\n####################################"
				));
		return SUCCESS;
	}
	
	
	@Action(value   = "reasignarTramitesBloque",
            results = { @Result(name="success", type="json") },
            interceptorRefs = {
                @InterceptorRef(
                        value = "json", params = {"enableSMD", "true", "ignoreSMDMethodInterfaces", "false"
                })
    })
	public String reasignarTramitesBloque() {
        logger.debug(Utils.log(
                "\n########################################",
                "\n########################################",
                "\n######   reasignarTramitesBloque  ######",
                "\n######                            ######"
                ));
        logger.debug("smap1:  "+smap1);
        logger.debug("slist1: "+slist1);
        try
        {
            this.session = ActionContext.getContext().getSession();
            UsuarioVO usuario = (UsuarioVO)Utils.validateSession(session);
            
            Utils.validate(smap1, "No hay datos para reasignar tramite");
            Utils.validate(smap1, "No hay lista de tramites para reasignar");
            
            String zonaReasig=smap1.get("ZONA_REASIG");
            Utils.validate(zonaReasig, "No hay zona para reasingar");

            String resultadosReasignacion = "";
            
            for(Map<String,String> tramite : slist1){
                String ntramite = tramite.get("NTRAMITE");
                String mensaje = despachadorManager.despacharPorZona(ntramite, zonaReasig, usuario.getCdusuari(),
                        usuario.getRolActivo().getCdsisrol());
                
                resultadosReasignacion = Utils.join(resultadosReasignacion, "<br/>* ", mensaje);
            }
            
            logger.debug(Utils.log("Resultado final de Reasignacion de tramites: ", resultadosReasignacion));
            
            smap1.put("resultadosReasignacion" , resultadosReasignacion);
            
            success=true;
            
        } catch(Exception ex) {
            success=false;
            logger.error("error al actualizar status de tramite de mesa de control",ex);
            mensaje = Utils.manejaExcepcion(ex);
        }
        logger.debug(Utils.log(
                "\n######                            ######",
                "\n######   reasignarTramitesBloque  ######",
                "\n########################################",
                "\n########################################"
                ));
        return SUCCESS;
    }
	
	
	@Action(value   = "ejecutarValidacionPorReferencia",
            results = { @Result(name="success", type="json") },
            interceptorRefs = {
                @InterceptorRef(
                        value = "json", params = {"enableSMD", "true", "ignoreSMDMethodInterfaces", "false"
                })
    })
	public String ejecutarValidacionPorReferencia() {
        logger.debug(Utils.log(
                "\n########################################",
                "\n########################################",
                "\n######   ejecutarValidacionPorReferencia  ######",
                "\n######                            ######"
                ));
        logger.debug("smap1:  "+smap1);
        logger.debug("slist1: "+slist1);
        try
        {
            this.session = ActionContext.getContext().getSession();
            UsuarioVO usuario = (UsuarioVO)Utils.validateSession(session);
            
            String ntramite   = (String) params.get("ntramite"), 
            	   referencia = (String) params.get("referencia");
            smap1 = mesaControlManager.ejecutarValidacionPorReferencia(ntramite, referencia).get(0);
            
            success=true;
            
        } catch(Exception ex) {
            success=false;
            logger.error("error al actualizar status de tramite de mesa de control",ex);
            mensaje = Utils.manejaExcepcion(ex);
        }
        logger.debug(Utils.log(
                "\n######                                    ######",
                "\n######   ejecutarValidacionPorReferencia  ######",
                "\n########################################",
                "\n########################################"
                ));
        return SUCCESS;
    }
	
	
	
	
	/**
	 * Devuelve mensaje con un formato especifico
	 * @param message
	 * @return
	 */
	private static void logPrettyMessageStartMethod(String message) {
	    logger.debug( Utils.log(
               "\n#######################################",
               "\n#######################################",
               "\n###### ", message,             " ######",
               "\n######                           ######"
        ));
	}
	
    private static void logPrettyMessageEndMethod(String message) {
        logger.debug( Utils.log(
               "\n######                           ######",
               "\n###### ", message,             " ######",
               "\n#######################################",
               "\n#######################################"
        ));
    }
	
	/////////////////////////////////
	////// getters ans setters //////
	/*/////////////////////////////*/

	public Map<String, String> getSmap1() {
		return smap1;
	}

	public void setSmap1(Map<String, String> smap1) {
		this.smap1 = smap1;
	}

	public Map<String, String> getSmap2() {
		return smap2;
	}

	public void setSmap2(Map<String, String> smap2) {
		this.smap2 = smap2;
	}

	public List<Map<String, String>> getSlist1() {
		return slist1;
	}

	public void setSlist1(List<Map<String, String>> slist1) {
		this.slist1 = slist1;
	}

	public List<Map<String, String>> getSlist2() {
		return slist2;
	}

	public void setSlist2(List<Map<String, String>> slist2) {
		this.slist2 = slist2;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMsgResult() {
		return msgResult;
	}

	public void setMsgResult(String msgResult) {
		this.msgResult = msgResult;
	}

	public List<BaseVO> getLista() {
		return lista;
	}

	public void setLista(List<BaseVO> lista) {
		this.lista = lista;
	}

	public Map<String, Item> getImap1() {
		return imap1;
	}

	public void setImap1(Map<String, Item> imap1) {
		this.imap1 = imap1;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPantallasManager(PantallasManager pantallasManager) {
		this.pantallasManager = pantallasManager;
	}

	public List<Map<String, Object>> getOlist1() {
		return olist1;
	}

	public void setOlist1(List<Map<String, Object>> olist1) {
		this.olist1 = olist1;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public Map<String, Object> getParams() {
		return params;
	}

	public void setParams(Map<String, Object> params) {
		this.params = params;
	}

	public String getTmpNtramite() {
		return tmpNtramite;
	}

	public void setTmpNtramite(String tmpNtramite) {
		this.tmpNtramite = tmpNtramite;
	}

	public void setMesaControlManager(MesaControlManager mesaControlManager) {
		this.mesaControlManager = mesaControlManager;
	}

	public String getRespuesta() {
		return respuesta;
	}

	public void setRespuesta(String respuesta) {
		this.respuesta = respuesta;
	}
	
}