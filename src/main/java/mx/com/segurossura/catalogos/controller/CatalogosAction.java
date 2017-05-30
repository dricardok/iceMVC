package mx.com.segurossura.catalogos.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.biosnettcs.core.Constantes;
import com.biosnettcs.core.Utils;
import com.biosnettcs.portal.controller.PrincipalCoreAction;
import com.biosnettcs.portal.model.UsuarioVO;

import mx.com.segurossura.catalogos.model.GenericVO;
import mx.com.segurossura.catalogos.service.CatalogosManager;


/**
 * 
 * @author Ricardo
 *
 */

@Controller
@Scope("prototype")
@ParentPackage(value="default")
@Namespace("/catalogos")
public class CatalogosAction extends PrincipalCoreAction {
	
	private static final long serialVersionUID = 384960409053296809L;

	private Logger logger = Logger.getLogger(CatalogosAction.class);
	
	@Autowired
	private CatalogosManager        catalogosManager;
	
    private boolean success;
    
    /**
     * true si queremos la propiedad "listaGenerica", 
     * false si queremos la propiedad "lista"
     */
    private boolean catalogoGenerico;
    
    /**
     * Nombre del catalogo a obtener
     */
    private String catalogo;
    
    /**
     * Lista con elementos de tipo "key","value" del cat&aacute;logo solicitado
     */
    private List<GenericVO> lista = new ArrayList<GenericVO>(0);
    
    /**
     * Lista de elementos a cargar en grid por tipo Map
     */
    private List<Map<String, String>> loadList;
    
    /**
     * Lista para guardar varios elementos
     */
    private List<Map<String, String>> saveList;

    private List<Map<String, String>> saveList2;
    
    /**
     * Lista personalizada, puede contener cualquier tipo de objeto 
     */
    private List<?> listaGenerica;
    
    /**
     * Parametros enviados a los catalogos
     */
    private Map<String, String> params;

    /**
     * Mensaje de respuesta del servicio
     */
    private String msgRespuesta;
    
    /**
     * Obtiene el catalogo solicitado en forma de una lista de VOs con llave y valor
     * @return
     * @throws Exception
     */
    @Action(
            value = "obtieneCatalogo", 
            results = {
                @Result(name = "success", type = "json") 
            }
        )
    public String obtieneCatalogo() throws Exception {
        logger.debug(Utils.log("\n################################", 
                                "\n###### obtieneCatalogo ######",
                                "\n###### params=", params));
        try {
            UsuarioVO usuario = (UsuarioVO) session.get("USUARIO");
            logger.debug(Utils.log("\n####### Usuario ",usuario));
            catalogosManager.obtieneCatalogo(usuario, catalogo, params);
        	success = true;
        }
        catch(Exception e) {
            success = false;
        	logger.error("No se pudo obtener el catalogo para " + catalogo, e);
            lista = new ArrayList<GenericVO>(0);
        }
        logger.debug(Utils.log("\n###### obtieneCatalogo ######",
                               "\n###### params=", params,
                               "\n#############################"));
        return SUCCESS;
	}
    
    // Getters and setters
	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public boolean isCatalogoGenerico() {
		return catalogoGenerico;
	}

	public void setCatalogoGenerico(boolean catalogoGenerico) {
		this.catalogoGenerico = catalogoGenerico;
	}

	public String getCatalogo() {
		return catalogo;
	}

	public void setCatalogo(String catalogo) {
		this.catalogo = catalogo;
	}

	public List<GenericVO> getLista() {
		return lista;
	}

	public void setLista(List<GenericVO> lista) {
		this.lista = lista;
	}

	public List<?> getListaGenerica() {
		return listaGenerica;
	}

	public void setListaGenerica(List<?> listaGenerica) {
		this.listaGenerica = listaGenerica;
	}

	public Map<String, String> getParams() {
		return params;
	}

	public void setParams(Map<String, String> params) {
		this.params = params;
	}

	public String getMsgRespuesta() {
		return msgRespuesta;
	}

	public void setMsgRespuesta(String msgRespuesta) {
		this.msgRespuesta = msgRespuesta;
	}

	public List<Map<String, String>> getLoadList() {
		return loadList;
	}

	public void setLoadList(List<Map<String, String>> loadList) {
		this.loadList = loadList;
	}

	public List<Map<String, String>> getSaveList() {
		return saveList;
	}

	public void setSaveList(List<Map<String, String>> saveList) {
		this.saveList = saveList;
	}

	public List<Map<String, String>> getSaveList2() {
		return saveList2;
	}

	public void setSaveList2(List<Map<String, String>> saveList2) {
		this.saveList2 = saveList2;
	}
	
}