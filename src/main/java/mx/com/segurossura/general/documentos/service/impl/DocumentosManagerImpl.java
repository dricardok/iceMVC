package mx.com.segurossura.general.documentos.service.impl;

import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.HttpUtil;
import com.biosnettcs.core.Utils;

import mx.com.segurossura.general.documentos.dao.DocumentosDAO;
import mx.com.segurossura.general.documentos.model.Archivo;
import mx.com.segurossura.general.documentos.model.TipoArchivo;
import mx.com.segurossura.general.documentos.service.DocumentosManager;

@Service
public class DocumentosManagerImpl implements DocumentosManager {
    
    @Autowired
    DocumentosDAO documentosDAO;
    
    private static final Logger logger = LoggerFactory.getLogger(DocumentosManagerImpl.class);

    @Override
    public List<Map<String, String>> obtenerDocumentos(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, 
            String ntramite, String cdsisrol, String dsdocume, String cdtipdoc, long start, long limit) throws Exception {
        String paso = "";
        List<Map<String, String>> lista = new ArrayList<Map<String, String>>();
        try{
            paso = "Obteniendo lista documentos";
            lista = documentosDAO.obtenerDocumentos(cdunieco, cdramo, estado, nmpoliza, nmsuplem, ntramite, cdsisrol, dsdocume, cdtipdoc, start, limit);
        } catch(Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        return lista;
    }

    @Override
    public void movimientoTdocupol() throws Exception {
        String paso = "";
        try{
            paso = "Movimiento en tdocupol";
        } catch(Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
    }

    @Override
    public Archivo obtenerDocumento(String url, String contentType, String filename) throws Exception {
        logger.debug(StringUtils.join(
                "\n@@@@@@@@@@@@@@@@@@@@@@@@"
               ,"\n@@@@@@ obtenerDocumento @@@@@@"
               ,"\n@@@@@@ url", url
               ,"\n@@@@@@ contentType", contentType
               ,"\n@@@@@@ filename", filename
               ));
        Archivo archivo = new Archivo();
        String paso = "";
        try{
            paso = "Obteniendo documento";
            archivo.setContentType(contentType);
            if(StringUtils.isNotBlank(url) && StringUtils.isNotBlank(contentType)) {
                archivo.setFileInputStream(getFileInputStream(url, null, filename));
            } else {
                // Se asigna el fileInputStream:
                archivo.setFileInputStream(getFileInputStream(url, null, filename));
                
                // Se asigna el contentType:
                if(contentType == null){
                    archivo.setContentType(obtieneContentType(filename));
                }
            }
            
            if(StringUtils.isNotBlank(filename)){
                archivo.setFilename(filename);
            }
        } catch(Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        return archivo;
    }
    
    @Override
    public Archivo obtenerDocumento(String url, String ruta, String contentType, String filename) throws Exception {
        logger.debug(StringUtils.join(
                "\n@@@@@@@@@@@@@@@@@@@@@@@@"
               ,"\n@@@@@@ obtenerDocumento @@@@@@"
               ,"\n@@@@@@ url", url
               ,"\n@@@@@@ ruta", ruta
               ,"\n@@@@@@ contentType", contentType
               ,"\n@@@@@@ filename", filename
               ));
        Archivo archivo = new Archivo();
        String paso = "";
        try{
            paso = "Obteniendo documento";
            archivo.setContentType(contentType);
            if(StringUtils.isNotBlank(url) && StringUtils.isNotBlank(contentType)) {
                archivo.setFileInputStream(getFileInputStream(url, ruta, filename));
            } else {
                // Se asigna el fileInputStream:
                archivo.setFileInputStream(getFileInputStream(url, ruta, filename));
                
                // Se asigna el contentType:
                if(contentType == null){
                    archivo.setContentType(obtieneContentType(filename));
                }
            }
            
            if(StringUtils.isNotBlank(filename)){
                archivo.setFilename(filename);
            }
        } catch(Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        return archivo;
    }
    
    /**
     * Obtiene el contentType a partir del nombre de un archivo
     * @param filename Nombre del archivo
     * @return contentType del archivo, o uno contentType por default
     */
    private String obtieneContentType(String filename) {

        String contentType = null;
        String fileType = filename.substring(filename.lastIndexOf(".") + 1, filename.length());
        fileType = fileType.trim();
        
        // Se asigna el contentType asociado al tipo de archivo, si no existe le asignamos uno por default:
        for (TipoArchivo tipoArch : TipoArchivo.values()) {
            if(tipoArch.toString().equalsIgnoreCase(fileType)) {
                contentType = tipoArch.getContentType();
                break;
            }
        }
        if(contentType == null) {
            contentType = TipoArchivo.DEFAULT.getContentType();
        }
        return contentType;
    }

    /**
     * Obtiene inputStream de la ubicacion local o liga del archivo
     * @param url
     * @param filename
     * @return
     * @throws Exception
     */
    private InputStream getFileInputStream(String url, String ruta, String filename) throws Exception{
        InputStream fileInputStream = null;
        try{
            if(StringUtils.isBlank(ruta)){
                fileInputStream = HttpUtil.obtenInputStream(url);                
            } else {
                fileInputStream = FileUtils.openInputStream(new File(Utils.join(ruta, filename)));                
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage()+" No se pudo recuperar el archivo");
        }
        return fileInputStream;
    }
}
