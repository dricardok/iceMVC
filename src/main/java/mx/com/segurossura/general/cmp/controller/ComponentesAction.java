package mx.com.segurossura.general.cmp.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import mx.com.segurossura.general.cmp.service.ComponentesManager;

import com.biosnettcs.core.Utils;
import com.biosnettcs.portal.controller.PrincipalCoreAction;
import com.biosnettcs.portal.model.RolVO;
import com.biosnettcs.portal.model.UsuarioVO;
import com.opensymphony.xwork2.ActionContext;

@Controller
@Scope
@ParentPackage("json-default")
@Namespace("/componentes")

public class ComponentesAction extends PrincipalCoreAction {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private static Logger logger = LoggerFactory.getLogger(ComponentesAction.class);
    private List<Map<String, String>> secciones;
    private Map<String, String> params;
    private boolean success;
    private Map<String, List<Map<String, String>>> componentes;
    private String message;
    private String SIN_SESION = "sinsesion";
    private String SIN_ROL = "sinrol";
    private String OK = "ok";
    private String ROL_TREE = "roltree";
    private String MESA_CONTROL = "mesacontrol";
    private String LOGIN = "login";

    @Autowired
    private ComponentesManager componentesManager;

    @Action(value = "recuperarComponentes", results = { @Result(name = "success", type = "json") }, interceptorRefs = {
            @InterceptorRef(value = "json", params = { "enableSMD", "true", "ignoreSMDMethodInterfaces", "false" }) })
    public String recuperarComponentes() throws Exception {
        logger.debug(Utils.log("\n################################", "\n###### recuperarComponentes ######",
                "\n###### secciones=", secciones));
        String pant = null;
        UsuarioVO usuario = null;
        try {
            session = ActionContext.getContext().getSession();
            if(session != null){
                usuario = (UsuarioVO) session.get("USUARIO");
            }
//            usuario = new UsuarioVO();
//            usuario.setCdusuario("DHPERNIA");
//            RolVO rol = new RolVO();
//            rol.setClave("SUSCRIPTOR");
//            rol.setActivo(true);
//            usuario.setRolActivo(rol);
            Utils.validate(secciones, "No se recibieron datos");            
            pant = secciones.get(0).get("pantalla");
            for (Map<String, String> map : secciones) {
                String pantalla = map.get("pantalla");
                String seccion = map.get("seccion");
                Utils.validate(pantalla, "No se recibio el nombre de la pantalla");
                // Utils.validate(seccion, "No se recibio la seccion");                
            }
            if(!pant.equals(LOGIN) && !pant.equals(ROL_TREE)){
                pant = "otro";
            }
            Object o = getScreenSesion(pant, usuario);
            if (null == o) {
                componentes = componentesManager.obtenerComponentes(secciones);
            } 
            else if (o instanceof String) {
                params = new HashMap<String, String>();
                params.put("redirect", o.toString());
            }
            success = true;
        } catch (Exception ex) {
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        logger.debug(Utils.log("\n################################", "\n###### recuperarComponentes ######",
                "\n###### componentes=", componentes));
        return SUCCESS;
    }

    @Action(value = "movimientoComponentes", results = { @Result(name = "success", type = "json") }, interceptorRefs = {
            @InterceptorRef(value = "json", params = { "enableSMD", "true", "ignoreSMDMethodInterfaces", "false" }) })
    public String movimientoComponentes() throws Exception {
        logger.debug(Utils.log("\n################################", "\n###### movimientoComponentes ######",
                "\n###### params=", params));
        try {
            Utils.validate(params, "No se recibieron datos");
            String pantalla = params.get("pantalla");
            String seccion = params.get("seccion");
            String modulo = params.get("modulo");
            String estatus = params.get("estatus");
            String cdramo = params.get("cdramo");
            String cdtipsit = params.get("cdtipsit");
            String cdsisrol = params.get("cdsisrol");
            String auxkey = params.get("auxkey");
            Utils.validate(pantalla, "No se recibio la pantalla");
            Utils.validate(seccion, "No se recibio la seccion");
            Utils.validate(secciones, "No se recibieron datos");
            componentesManager.movimientoComponentes(pantalla, seccion, modulo, estatus, cdramo, cdtipsit, cdsisrol,
                    auxkey, secciones);
        } catch (Exception ex) {
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        logger.debug(Utils.log("\n################################", "\n###### movimientoComponentes ######"));
        return SUCCESS;
    }

    private Object getScreenSesion(String x, UsuarioVO usuario) {
        String y = SIN_SESION;
        if (null != usuario) {
            y = OK;
            if(null != usuario.getRolActivo()){
                if(!usuario.getRolActivo().isActivo()){
                    y = SIN_ROL;
                }
            }
        }
        Map<String, Map<String, Object>> matriz = setMatriz();
        return matriz.get(x).get(y);
    }

    public List<Map<String, String>> getSecciones() {
        return secciones;
    }

    public void setSecciones(List<Map<String, String>> secciones) {
        this.secciones = secciones;
    }

    public Map<String, String> getParams() {
        return params;
    }

    public void setParams(Map<String, String> params) {
        this.params = params;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean exito) {
        this.success = exito;
    }

    public Map<String, List<Map<String, String>>> getComponentes() {
        return componentes;
    }

    public void setComponentes(Map<String, List<Map<String, String>>> resultados) {
        this.componentes = resultados;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String respuesta) {
        this.message = respuesta;
    }

    private Map<String, Map<String, Object>> setMatriz() {
        Map<String, Map<String, Object>> matriz = new HashMap<String, Map<String, Object>>();
        Map<String, Object> y = new HashMap<String, Object>();
        y.put(SIN_SESION, true);
        y.put(SIN_ROL, ROL_TREE);
        y.put(OK, MESA_CONTROL);
        matriz.put("login", y);
        y = new HashMap<String, Object>();
        y.put(SIN_SESION, LOGIN);
        y.put(SIN_ROL, true);
        y.put(OK, MESA_CONTROL);
        matriz.put("roltree", y);
        y = new HashMap<String, Object>();
        y.put(SIN_SESION, LOGIN);
        y.put(SIN_ROL, ROL_TREE);
        y.put(OK, null);
        matriz.put("otro", y);
        return matriz;
    }
}
