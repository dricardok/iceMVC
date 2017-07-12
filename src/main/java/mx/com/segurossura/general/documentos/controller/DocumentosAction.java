package mx.com.segurossura.general.documentos.controller;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.monitor.FileAlterationListener;
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

import com.biosnettcs.core.HttpUtil;
import com.biosnettcs.core.Utils;
import com.biosnettcs.portal.controller.PrincipalCoreAction;

import mx.com.royalsun.alea.client.DocumentoAPI;
import mx.com.royalsun.alea.commons.bean.DocumentoContext;
import mx.com.segurossura.emision.controller.ImpresionAction;
import mx.com.segurossura.general.documentos.model.Archivo;
import mx.com.segurossura.general.documentos.model.TipoArchivo;
import mx.com.segurossura.general.documentos.service.DocumentosManager;

@Controller
@Scope("prototype")
@ParentPackage(value="default")
@Namespace("/documentos")
public class DocumentosAction extends PrincipalCoreAction {

    private static final long serialVersionUID = 1L;
    private static final Logger logger = LoggerFactory.getLogger(DocumentosAction.class);
    
    private boolean success;
    private String mensaje;
    private Map<String, String> params;
    private Map<String, String> lista;
    private List<Map<String, String>> datos;
    private InputStream fileInputStream;
    private String filename;
    protected String contentType;
    
    private long start;
    private long limit;
    private long totalCount;
    
    @Autowired
    private DocumentosManager documentosManager;
    
    @Action(
            value = "obtenerDocumentos", 
            results = { 
                @Result(name = "success", type = "json") 
            }
    )
    public String obtenerDocumentos(){
        logger.debug(StringUtils.join(
                "\n###################"
               ,"\n###### obtenerDocumentos ######"
               ,"\n###### params", params
               ,"\n###### start", start
               ,"\n###### limit", limit
               ));
        try{
            Utils.validate(params, "No se recibieron parametros");
            String cdunieco = params.get("cdunieco");
            String cdramo = params.get("cdramo");
            String estado = params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            String nmsuplem = params.get("nmsuplem");
            Utils.validate(cdunieco, "No se recibio oficina");
            Utils.validate(cdramo, "No se recibio el producto");
            Utils.validate(estado, "No se recibio el estado");
            Utils.validate(nmpoliza, "No se recibio el numero de póliza");
            Utils.validate(nmsuplem, "No se recibio el numero de suplemento");
            String ntramite = params.get("ntramite");
            String cdsisrol = params.get("cdsisrol");
            String dsdocume = params.get("dsdocume");
            datos = documentosManager.obtenerDocumentos(cdunieco, cdramo, estado, nmpoliza, nmsuplem, ntramite, cdsisrol, dsdocume, start, limit);
            if(!datos.isEmpty()){
                totalCount = Integer.parseInt(datos.get(0).get("total"));
            }
            success = true;
        } catch(Exception ex){
            success = false;
            Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    @Action
    (
        value   = "verArchivo",
        results = 
        {
                @Result(name="success", 
                        type="stream", 
                        params = {
                            "contentType"       ,"${contentType}",
                            "inputName"         ,"fileInputStream",
                            "bufferSize"        ,"4096",
                            "contentDisposition","inline; filename=\"${filename}\""
                        }
                )
        }
    )
    public String verArchivo(){
        logger.debug(StringUtils.join(
                "\n###################"
               ,"\n###### verArchivo ######"
               ,"\n###### params", params
               ));
        try{
            Utils.validate(params, "No se recibieron parametros");
            String url = params.get("url");
            Utils.validate(url, "No se recibio la url");
            String nombre = params.get("cddocume");
            contentType = TipoArchivo.PDF.getContentType();
            Archivo archivo = documentosManager.obtenerDocumento(url, contentType, nombre);
            fileInputStream = archivo.getFileInputStream();
            filename = archivo.getFilename();
            success = true;
        } catch(Exception ex){
            success = false;
            mensaje = Utils.manejaExcepcion(ex);
        }
        logger.debug(StringUtils.join(
                "\n###################"
               ,"\n###### verArchivo ######"
               ,"\n###### filename", filename
               ,"\n###### contentType", contentType
               ));
        return SUCCESS;
    }
    
    @Action
    (
        value   = "descargarArchivo",
        results = 
        {
                @Result(name="success", 
                        type="stream", 
                        params = {
                            "contentType"       ,"${contentType}",
                            "inputName"         ,"fileInputStream",
                            "bufferSize"        ,"4096",
                            "contentDisposition","attachment; filename=\"${filename}\""
                        }
                )
        }
    )
    public String descargarArchivo(){
        logger.debug(StringUtils.join(
                "\n###################"
               ,"\n###### descargarArchivo ######"
               ,"\n###### params", params
               ));
        try{
            Utils.validate(params, "No se recibieron parametros");
            String url = params.get("url");
            Utils.validate(url, "No se recibio la url");
            String nombre = params.get("cddocume");
            contentType = TipoArchivo.PDF.getContentType();
            Archivo archivo = documentosManager.obtenerDocumento(url, contentType, nombre);
            fileInputStream = archivo.getFileInputStream();
            filename = archivo.getFilename();
            success = true;
        } catch(Exception ex){
            success = false;
            mensaje = Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    @Action(
            value = "movimientoTdocupol", 
            results = { 
                @Result(name = "success", type = "json") 
            }
    )
    public String movimientoTdocupol(){
        logger.debug(StringUtils.join(
                "\n###################"
               ,"\n###### movimientoTdocupol ######"
               ,"\n###### params", params
               ));
        try{
            documentosManager.movimientoTdocupol();
        } catch(Exception ex){
            Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    @Action(
            value = "obtenerDocumento", 
            results = { 
                @Result(name = "success", type = "json") 
            }
    )
    public String obtenerDocumento(){
        logger.debug(StringUtils.join(
                "\n###################"
               ,"\n###### obtenerDocumento ######"
               ,"\n###### params", params
               ));
        try{
            String url = params.get("url");
            String name = params.get("name");
            contentType = TipoArchivo.PDF.getContentType();
            Archivo archivo = documentosManager.obtenerDocumento(url, contentType, name);
            fileInputStream = archivo.getFileInputStream();
            filename = archivo.getFilename();
        } catch(Exception ex){
            Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public Map<String, String> getParams() {
        return params;
    }

    public void setParams(Map<String, String> params) {
        this.params = params;
    }

    public Map<String, String> getLista() {
        return lista;
    }

    public void setLista(Map<String, String> lista) {
        this.lista = lista;
    }

    public List<Map<String, String>> getDatos() {
        return datos;
    }

    public void setDatos(List<Map<String, String>> datos) {
        this.datos = datos;
    }

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

    public InputStream getFileInputStream() {
        return fileInputStream;
    }

    public void setFileInputStream(InputStream fileInputStream) {
        this.fileInputStream = fileInputStream;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }
}
