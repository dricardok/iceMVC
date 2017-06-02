package mx.com.segurossura.test.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.biosnettcs.core.Utils;

import mx.com.segurossura.general.catalogos.model.Respuesta;
import mx.com.segurossura.test.model.ResponseList;

@Controller
@RequestMapping("/emision")
public class TestRESTAPI {

    private static final transient Logger logger = LoggerFactory.getLogger(TestRESTAPI.class);
    
    @RequestMapping(value = {
                "/mpoligar/{cdunieco}/{cdramo}/{estado}/{nmpoliza}/{nmsituac}/{nmsuplem}/{cdgarant}",
                "/mpoligar/{cdunieco}/{cdramo}/{estado}/{nmpoliza}/{nmsituac}/{nmsuplem}"
            },
            method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody List<Map<String, String>> invocaRESTSpringOpc1(@PathVariable String cdunieco,
            @PathVariable String cdramo, @PathVariable String estado, @PathVariable String nmpoliza,
            @PathVariable String nmsituac, @PathVariable String nmsuplem, @PathVariable Optional<String> cdgarant)
            throws Exception {
        
        logger.info("*** Entering method Service Emision :: invocaRESTSpringOpc1 ***");
        
        RestTemplate restTemplate = new RestTemplate();
        List<Map<String, String>> respList = new ArrayList<Map<String, String>>();
        
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, String>> entity = new HttpEntity<Map<String, String>>(headers);
            
            String URI = "http://localhost:8080/iceServices/rest/emision/mpoligarTestREST/";
            StringBuilder sbURL = new StringBuilder(URI)
                .append(cdunieco).append("/").append(cdramo).append("/")
                .append(estado).append("/").append(nmpoliza).append("/")
                .append(nmsituac).append("/").append(nmsuplem);
            
            // Send the request as GET
            HttpEntity<Object> respService = restTemplate.exchange(sbURL.toString(), HttpMethod.PUT, entity, Object.class);
            if (respService != null) {
                logger.debug("respService body={}", respService.getBody());
                respList = (List<Map<String, String>>)respService.getBody();
                logger.info("respuesta :: " + respList);
            }
        } catch (Exception e) {
            Utils.manejaExcepcion(e);
            restTemplate = null;
            logger.error("Error al llamar los servicios para obtener mpoligar: " + e.getMessage() + "\n" + e.getCause() + "\n" + e.getLocalizedMessage());
        }
        return respList;
    }
    
    
    @RequestMapping(value = {
                "/mpoligarWrapper/{cdunieco}/{cdramo}/{estado}/{nmpoliza}/{nmsituac}/{nmsuplem}/{cdgarant}",
                "/mpoligarWrapper/{cdunieco}/{cdramo}/{estado}/{nmpoliza}/{nmsituac}/{nmsuplem}"
            },
            method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody ResponseList<List<Map<String,String>>> mpoligarWrapper(@PathVariable String cdunieco,
            @PathVariable String cdramo, @PathVariable String estado, @PathVariable String nmpoliza,
            @PathVariable String nmsituac, @PathVariable String nmsuplem, @PathVariable Optional<String> cdgarant)
            throws Exception {
        
        logger.info("Inicio REST mpoligarWrapper...");
        
        ResponseList<List<Map<String,String>>> res = null;
        res = new ResponseList<List<Map<String, String>>>("200", "", Calendar.getInstance().getTime());
        
        res.setResponse(invocaRESTSpringOpc1(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, cdgarant));
        logger.info("Fin REST mpoligarWrapper...");
        return res;
    }
    
    
    @RequestMapping(value = {
                "/mpoligarDef/{cdunieco}/{cdramo}/{estado}/{nmpoliza}/{nmsituac}/{nmsuplem}/{cdgarant}",
                "/mpoligarDef/{cdunieco}/{cdramo}/{estado}/{nmpoliza}/{nmsituac}/{nmsuplem}"
            },
            method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody Respuesta<Map<String,String>> mpoligarDef(@PathVariable String cdunieco,
            @PathVariable String cdramo, @PathVariable String estado, @PathVariable String nmpoliza,
            @PathVariable String nmsituac, @PathVariable String nmsuplem, @PathVariable Optional<String> cdgarant)
            throws Exception {
        
        logger.info("Inicio REST mpoligarDef...");
        Respuesta<Map<String,String>> res = new Respuesta<Map<String,String>>(404, "", Calendar.getInstance().getTime());
        res.setList(invocaRESTSpringOpc1(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, cdgarant));
        logger.info("Fin REST mpoligarDef.");
        return res;
    }
    
}