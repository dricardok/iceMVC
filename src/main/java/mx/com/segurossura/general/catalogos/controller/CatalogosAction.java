package mx.com.segurossura.general.catalogos.controller;

import java.util.List;
import java.util.Map;

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
import com.biosnettcs.core.model.BaseVO;
import com.biosnettcs.portal.controller.PrincipalCoreAction;
import com.biosnettcs.portal.model.UsuarioVO;

import mx.com.segurossura.general.catalogos.service.CatalogosManager;

@Controller
@Scope("prototype")
@ParentPackage(value="default")
@Namespace("/catalogos")
public class CatalogosAction extends PrincipalCoreAction {

    private static final long serialVersionUID = 1L;
    
    private static final Logger logger = LoggerFactory.getLogger(CatalogosAction.class);
    
    private boolean success;
    private String message, catalogo;
    private Map<String, String> params;
    private List<BaseVO> list;
    
    @Autowired
    private CatalogosManager catalogosManager;
    
    @Action(
            value = "obtenerCatalogo", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
    public String obtenerCatalogo () {
        logger.debug(Utils.log("###### obtenerCatalogo catalogo: ", catalogo, ", params: ", params));
        try {
            UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
            Utils.validate(catalogo, "No se recibi\u00f3 el cat\u00e1logo");
            list = catalogosManager.obtenerCatalogo(catalogo, params, usuario.getCdusuari(), usuario.getRolActivo().getCdsisrol());
            success = true;
        } catch (Exception ex) {
            message = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    public String getCatalogo() {
        return catalogo;
    }

    public void setCatalogo(String catalogo) {
        this.catalogo = catalogo;
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
    
    public List<BaseVO> getList() {
        return list;
    }
    
    public void setList(List<BaseVO> list) {
        this.list = list;
    }
    
}