package mx.com.segurossura.general.documentos.controller;

import java.io.File;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.biosnettcs.core.Constantes;
import com.biosnettcs.core.Utils;
import com.biosnettcs.portal.controller.PrincipalCoreAction;

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
    
    @Value("${content.path}")
    private String contentPath;
    
    private File file;
    
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
//            Utils.validate(cdunieco, "No se recibio oficina");
//            Utils.validate(cdramo, "No se recibio el producto");
//            Utils.validate(estado, "No se recibio el estado");
//            Utils.validate(nmpoliza, "No se recibio el numero de póliza");
//            Utils.validate(nmsuplem, "No se recibio el numero de suplemento");
            String ntramite = params.get("ntramite");
            String cdsisrol = params.get("cdsisrol");
            String dsdocume = params.get("dsdocume");
            String cdtipdoc = /*params.get("cdtipdoc")*/StringUtils.isNotBlank( params.get("cdtipdoc") ) ? params.get("cdtipdoc"): null;
            datos = documentosManager.obtenerDocumentos(cdunieco, cdramo, estado, nmpoliza, nmsuplem, ntramite, cdsisrol, dsdocume, cdtipdoc, start, limit);
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
            String ruta = params.get("ruta");
            String nombre = params.get("dsdocume");
            String cddocume = params.get("cddocume");
            String cdunieco = params.get("cdunieco");
            String cdramo = params.get("cdramo");
            String estado = params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            String nmsuplem = params.get("nmsuplem");
            // Utils.validate(url, "No se recibio la url");
            Archivo archivo = documentosManager.obtenerDocumento(cdunieco, cdramo, estado, nmpoliza, nmsuplem, url, ruta, nombre, cddocume);
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
            String ruta = params.get("ruta");
            // Utils.validate(url, "No se recibio la url");
            String nombre = params.get("dsdocume");
            String cddocume = params.get("cddocume");
            String cdunieco = params.get("cdunieco");
            String cdramo = params.get("cdramo");
            String estado = params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            String nmsuplem = params.get("nmsuplem");
            Archivo archivo = documentosManager.obtenerDocumento(cdunieco, cdramo, estado, nmpoliza, nmsuplem, url, ruta, nombre, cddocume);
            fileInputStream = archivo.getFileInputStream();
            filename = archivo.getFilename();
            contentType = archivo.getContentType();
            success = true;
        } catch(Exception ex){
            success = false;
            mensaje = Utils.manejaExcepcion(ex);
        }
        logger.debug(StringUtils.join(
                "\n###### fileInputStream", fileInputStream
               ,"\n###### filename", filename
               ,"\n###### contentType", contentType
               ,"\n###### descargarArchivo ######"
               ));
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
            String cddocume = params.get("cddocume");
            String cdunieco = params.get("cdunieco");
            String cdramo = params.get("cdramo");
            String estado = params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            String nmsuplem = params.get("nmsuplem");
            contentType = TipoArchivo.PDF.getContentType();
            Archivo archivo = documentosManager.obtenerDocumento(cdunieco, cdramo, estado, nmpoliza, nmsuplem, url, contentType, name, cddocume);
            fileInputStream = archivo.getFileInputStream();
            filename = archivo.getFilename();
        } catch(Exception ex){
            Utils.manejaExcepcion(ex);
        }
        return SUCCESS;
    }
    
    
    @Action(
            value = "subirArchivo", 
            results = {
                @Result(name = "success", type = "json") 
            }
    )
	public String subirArchivo() {
    	
		logger.debug(Utils.log(
				"\n##########################", 
				"\n###### subirArchivo ######", 
				"\n###### file   = ", file, 
				"\n###### params = ", params));

		try {
			Utils.validate(params, "No se recibio informacion del archivo");
			Utils.validate(file, "No se recibio el archivo");
			String ruta   = StringUtils.isNotBlank(params.get("ruta")) ? params.get("ruta")+Constantes.SEPARADOR_ARCHIVO : "";
			String nombre = params.get("nombre");
			String ntramite = params.get("ntramite");
//			nombre = nombre + TipoArchivo.RTF.getExtension();
			documentosManager.subirArchivo(file, ruta, nombre, ntramite);
			success = true;
		} catch (Exception e) {
			logger.error("error al guardar el archivo", e);
		}
		logger.debug(Utils.log("\n###### subirArchivo ######", "\n##########################"));
		return SUCCESS;
	}
    

    public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
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
