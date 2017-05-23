package mx.com.segurossura.test.controller;

import java.util.Date;
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

import com.biosnettcs.portal.controller.PrincipalCoreAction;

import mx.com.segurossura.emision.dao.EmisionDAO;
import mx.com.segurossura.test.dao.TestServiciosDAO;
import mx.com.segurossura.test.model.AlumnoMateriaVO;
import mx.com.segurossura.test.model.AlumnoVO;
import mx.com.segurossura.test.service.TestServiciosManager;


@Controller
@Scope("prototype")
@ParentPackage(value="default")
@Namespace("/test")
//@InterceptorRef(value="secureStack")
public class TestServiciosAction extends PrincipalCoreAction {
	
	private static final long serialVersionUID = 7996363816495572103L;
	
	private static Logger logger = LoggerFactory.getLogger(TestServiciosAction.class);
	
	private Map<String,String> params;
	private boolean            success;
	private String             respuesta;
	
	@Autowired
	private TestServiciosDAO testServiciosDAO;
	
	@Autowired
	private TestServiciosManager testServiciosManager; 
	
	@Autowired
	private EmisionDAO emisionDAO;

    @Action(
        value = "testMethod", 
        results = { 
            @Result(name = "input", location = "/jsp-script/servicios/input.jsp"),
            @Result(name = "success", type = "json") 
        }
    )
	public String testMethod() throws Exception {
		
        logger.debug("Iniciando testMethod");
        
        List<Map<String, String>> submenus = testServiciosDAO.obtieneSubmenus("533", "0");
        logger.debug("Submenus encontrados: {} = {}", submenus.size(), submenus);
        
	    logger.debug("Finalizando testMethod");
	    return SUCCESS;
	}
    
    
    @Action(
        value = "testFunction", 
        results = { 
            @Result(name = "input", location = "/jsp-script/servicios/input.jsp"),
            @Result(name = "success", type = "json") 
        }
    )
    public String testFunction() throws Exception {
        
        logger.debug("Iniciando testFunction, params={}", params);

        String resultado = testServiciosDAO.ejecutaStoredFunction(params.get("entrada"));
        logger.debug("Prueba Stored Function, resultado: {}", resultado);
        
        respuesta = resultado;
        success = true;
        logger.debug("Finalizando testFunction");
        
        return SUCCESS;
    }
    
    
    @Action(
        value = "testTransactional", 
        results = { 
            @Result(name = "success", type = "json") 
        }
    )
    public String testTransactional() throws Exception {
        
        logger.debug("Inicio testTransactional...");
        
        AlumnoVO alumno = new AlumnoVO();
        alumno.setNombre("Ricardo");
        alumno.setPaterno("Bautista");
        alumno.setMaterno("Silva");
        alumno.setFechaNac(new Date());
        
        AlumnoMateriaVO alumnoMateria = new AlumnoMateriaVO();
        alumnoMateria.setCdmateria(Long.parseLong(params.get("cdmateria")));
        alumnoMateria.setFechaIni(new Date());
        
        testServiciosManager.guardarAlumnoMateria(alumno, alumnoMateria);
        
        success = true;
        logger.debug("Fin testTransactional...");
        
        return SUCCESS;
    }
    
    
    @Action(
            value = "testDAO", 
            results = { 
                @Result(name = "input", location = "/jsp-script/servicios/input.jsp"),
                @Result(name = "success", type = "json") 
            }
        )
        public String testDao() throws Exception {
            
            //logger.debug("--->"+emisionDAO.generaNmpolizaSP(null, "0", "602", "W", "N", "100"));
            
    	//logger.debug("--->"+emisionDAO.obtieneTvalopolSP("1", "201", "M", "179407", "245436412000000001"));
    	emisionDAO.movimientoMpoligarSP(null, null, null, null, null, null, null, null, null, null);;
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

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

}