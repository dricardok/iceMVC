package mx.com.segurossura.general.documentos.controller;

import java.io.File;
import java.util.HashMap;
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
import com.biosnettcs.portal.controller.PrincipalCoreAction;

import mx.com.segurossura.general.documentos.service.DocumentosManager;
import mx.com.segurossura.workflow.mesacontrol.model.FlujoVO;

@Controller
@Scope("prototype")
@ParentPackage(value="default")
@Namespace("/documentos")
@SuppressWarnings("serial")
public class SubirArchivoAction extends PrincipalCoreAction {
    
    private final static Logger logger = LoggerFactory.getLogger(SubirArchivoAction.class);
    
    private Map<String, String> params;
    private boolean success;
    private String message,
                   fileFileName,
                   fileContentType;
    private File file;
    private FlujoVO flujo;
    
    @Autowired
    private DocumentosManager documentosManager;
    
    @Action(
            value = "subirArchivoRequisito", 
            results = { 
                @Result(name = "success", type = "json") 
            }
    )
    public String subirArchivoRequisito () {
        logger.debug(Utils.log("\n###################################",
                               "\n###### subirArchivoRequisito ######",
                               "\n###### file = ", file,
                               "\n###### fileFileName = ", fileFileName,
                               "\n###### fileContentType = ", fileContentType,
                               "\n###### params = ", params));
        try {
            Utils.validate(flujo, "Falta flujo");
            Utils.validate(file, "Falta archivo");
            Utils.validate(fileFileName, "Falta nombre de archivo",
                           fileContentType, "Falta tipo de archivo");
            Utils.validate(params, "Falta mapa de par\u00e1metros");
            documentosManager.subirArchivoRequisito(flujo, file, fileFileName, fileContentType, params.get("cddocume"));
            success = true;
        } catch (Exception e) {
            message = Utils.manejaExcepcion(e);
        }
        logger.debug(Utils.log("\n###### success = ", success,
                               "\n###### message = ", message,
                               "\n###### subirArchivoRequisito ######",
                               "\n###################################"));
        return SUCCESS;
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

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getFileFileName() {
        return fileFileName;
    }

    public void setFileFileName(String fileFileName) {
        this.fileFileName = fileFileName;
    }

    public String getFileContentType() {
        return fileContentType;
    }

    public void setFileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public FlujoVO getFlujo() {
        return flujo;
    }

    public void setFlujo(FlujoVO flujo) {
        this.flujo = flujo;
    }
}