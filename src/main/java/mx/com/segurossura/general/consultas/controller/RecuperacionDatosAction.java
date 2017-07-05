package mx.com.segurossura.general.consultas.controller;

import java.util.ArrayList;
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
import com.biosnettcs.core.exception.ApplicationException;
import com.biosnettcs.portal.controller.PrincipalCoreAction;
import com.biosnettcs.portal.model.UsuarioVO;

import mx.com.segurossura.general.consultas.model.RecuperacionSimple;
import mx.com.segurossura.general.consultas.service.RecuperacionSimpleManager;

@Controller
@Scope("prototype")
@ParentPackage(value="default")
@Namespace("/recuperacion")
public class RecuperacionDatosAction extends PrincipalCoreAction
{
    private final static Logger logger = LoggerFactory.getLogger(RecuperacionDatosAction.class);
    
    private boolean success;
    private String message;
    private Map<String,String> params;
    private List<Map<String,String>> list;
    private Long total;
    private int start, limit;
    
    /**
     * Nombre del archivo a exportar
     *
    private String fileName;
     
    /**
     * Nombre del objeto a exportar
     *
    private InputStream inputStream;
    
    /**
     * Tipo de Archivo a exportar
     *
    private String contentType;
    */
    
    @Autowired
    private RecuperacionSimpleManager recuperacionSimpleManager;

    /*
    @Value("${ruta.documentos.temporal}")
    private String rutaDocumentosTemporal;
    */
    
    @Action(value   = "recuperar",
        results = { @Result(name="success", type="json") }
    )
    public String recuperar()
    {
        logger.debug(Utils.log(
                 "\n#######################"
                ,"\n###### recuperar ######"
                ,"\n###### params=",params
                ));
        
        String returnResult =  SUCCESS;
        
        try
        {
            UsuarioVO usuario  = (UsuarioVO) Utils.validateSession(session);
            String cdusuari = usuario.getCdusuari();
            String cdsisrol = usuario.getRolActivo().getCdsisrol();
            
            Utils.validate(params , "No se recibieron datos");
            String consulta = params.get("consulta");
            Utils.validate(consulta , "No se recibi\u00F3 la consulta");
            
            RecuperacionSimple rec = null;
            try
            {
                rec = RecuperacionSimple.valueOf(consulta);
            }
            catch(Exception ex)
            {
                throw new ApplicationException("La consulta no existe");
            }
            
            if("M".equals(rec.getTipo()))
            {
                Map<String,String> mapaAuxiliar = recuperacionSimpleManager.recuperarMapa(cdusuari,cdsisrol,rec,params,usuario);
                params.putAll(mapaAuxiliar);
                
                /**
                 * Para exoportar mapa como elemento de una lista 
                 */
                if(!params.isEmpty()){
                    list =  new ArrayList<Map<String,String>>();
                    list.add(mapaAuxiliar);
                }
            }
            else if("L".equals(rec.getTipo()))
            {
                list=recuperacionSimpleManager.recuperarLista(cdusuari,cdsisrol,rec,params,usuario);
                
                if(rec.equals(RecuperacionSimple.RECUPERAR_INCISOS_POLIZA_GRUPO_FAMILIA)){
                    Map<String,String>total = list.remove(list.size()-1);
                    this.total = Long.parseLong(total.get("total"));
//                  this.total=total.get("total");
                }
            }/*
            else if("LP".equals(rec.getTipo()))
            {
                PagedMapList paged = recuperacionSimpleManager.recuperarListaPaginada(cdusuari,cdsisrol,rec,params, Integer.toString(start), Integer.toString(limit), usuario);
                if(paged != null ){
                    list=paged.getRangeList();
                    total = paged.getTotalItems();
                }
            }*/
            else
            {
                throw new ApplicationException("Tipo de consulta mal definido");
            }
            
            /*
            if(Constantes.SI.equalsIgnoreCase(params.get("exportar"))){
               if(list != null && !list.isEmpty()){
                   
                   logger.info("Exportando Excel para " + params.get("consulta"));
                   this.fileName =  rec.name()+Utils.generaTimestamp()+TipoArchivo.XLSX.getExtension();
                    String fullFileName = rutaDocumentosTemporal + Constantes.SEPARADOR_ARCHIVO + this.fileName;
                    
                    boolean exito = DocumentosUtils.generaExcel(list, fullFileName, true);
                    if(exito) {
                        inputStream = new FileInputStream(new File(fullFileName));
                        logger.debug("Exportado correctamente Excel: "+ fullFileName);
                        returnResult = "excel";
                    } else {
                        logger.error("No se Exporto correctamente Excel: "+ fullFileName);
                        returnResult = "notfound";
                    }
               }else{
                   throw new ApplicationException("Sin datos a exporar.");
               }
            }
            */
            
            success = true;
        }
        catch(Exception ex)
        {
            logger.error(Utils.join("Error en la recuperacion {",params,"}"),ex);
            message = Utils.manejaExcepcion(ex);
        }
        logger.debug(Utils.log(
                 "\n###### recuperar ######"
                ,"\n#######################"
                ));
        return returnResult;
    }

    ////////////////////////////////////////////////////////
    ////////////////// GETTERS Y SETTERS ///////////////////
    public boolean isSuccess() {                          //
        return success;                                   //
    }                                                     //
                                                          //
    public void setSuccess(boolean success) {             //
        this.success = success;                           //
    }                                                     //
                                                          //
    public String getMessage() {                          //
        return message;                                   //
    }                                                     //
                                                          //
    public void setMessage(String message) {              //
        this.message = message;                           //
    }                                                     //
                                                          //
    public Map<String, String> getParams() {              //
        return params;                                    //
    }                                                     //
                                                          //
    public void setParams(Map<String, String> params) {   //
        this.params = params;                             //
    }                                                     //
                                                          //
    public List<Map<String, String>> getList() {          //
        return list;                                      //
    }                                                     //
                                                          //
    public void setList(List<Map<String, String>> list) { //
        this.list = list;                                 //
    }                                                     //
                                                          //
    public Long getTotal() {                              //
        return total;                                     //
    }                                                     //
                                                          //
    public void setTotal(Long total) {                    //
        this.total = total;                               //
    }                                                     //
                                                          //
    public int getStart() {                               //
        return start;                                     //
    }                                                     //
                                                          //
    public void setStart(int start) {                     //
        this.start = start;                               //
    }                                                     //
                                                          //
    public int getLimit() {                               //
        return limit;                                     //
    }                                                     //
                                                          //
    public void setLimit(int limit) {                     //
        this.limit = limit;                               //
    }                                                     //
                                                          //
    ////////////////////////////////////////////////////////
    /*
    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public InputStream getInputStream() {
        return inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }
    
    public String getRutaDocumentosTemporal() {
        return rutaDocumentosTemporal;
    }
    */
}