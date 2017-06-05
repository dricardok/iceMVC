package mx.com.segurossura.test.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
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
import com.biosnettcs.portal.controller.PrincipalCoreAction;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;


@Controller
@Scope("prototype")
@ParentPackage(value="json-default")
@Namespace("/emision")
@RequestMapping("/emision")
public class TestMergeSpringMVCStruts2 extends PrincipalCoreAction {
	
    private static final long serialVersionUID = 6180860150435586031L;
    
    private static final Logger logger = LoggerFactory.getLogger(TestMergeSpringMVCStruts2.class);
    
    private Map<String,String> params;
    private boolean            success;
    private String             message;

    private List<Map<String, String>> list;

    
    /**
     * Metodo http con Struts2, invoca un servicio REST usando java net y convierte respuesta a JSON usando gson 
     * @return Cadena con result de struts
     */
    @Action(        
        value = "invocaRESTStrutsSimple", 
        results = {@Result(name = "success", type = "json")}
    )
    public String invocaRESTStrutsSimple() {
        
        try {
            
            Utils.validate(params, "No hay parametros para el REST service");
            //http://localhost:8080/iceServices/rest/emision/mpoligarTestREST/5/902/M/50000016/205/245379912000000000
            String URI = "http://localhost:8080/iceServices/rest/emision/mpoligarTestREST/";
            
            StringBuilder sbURL = new StringBuilder()
                .append(URI).append(params.get("cdunieco")).append("/").append(params.get("cdramo")).append("/")
                .append(params.get("estado")).append("/").append(params.get("nmpoliza")).append("/")
                .append(params.get("nmsituac")).append("/").append(params.get("nmsuplem"));
                
            URL url = new URL(sbURL.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("PUT");
            conn.setRequestProperty("Accept", "application/json");
    
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
            }
    
            BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
    
            String output;
            logger.debug("Output from Server...");
            while ((output = br.readLine()) != null) {
                logger.debug("output: {}", output);
                JsonArray jArray = (JsonArray) new JsonParser().parse(output);
                Gson gson = new Gson();
                list = gson.fromJson(jArray.toString(), ArrayList.class);
            }
            
            conn.disconnect();
        } catch (Exception e) {
            message = Utils.manejaExcepcion(e);
        }
        return SUCCESS;
    }
    
    
    /**
     * Metodo http con Struts2, invoca un servicio REST usando RESTTemplate de Spring y convierte respuesta a JSON usando jackson-spring 
     * @return Cadena con result de struts
     */
    @Action(        
        value = "invocaRESTStrutsSpring", 
        results = {@Result(name = "success", type = "json")}
    )
    public String invocaRESTStrutsSpring() {
        
        logger.info("Iniciando Service Emision :: invocaRESTStrutsOpc2:::");
        
        RestTemplate restTemplate = new RestTemplate();
        /*
        List<Map<String, String>> respList = new ArrayList<Map<String, String>>();
        Map<String, String> map = new HashMap<String, String>();
        map.put("cdunieco", params.get("cdunieco"));
        map.put("cdramo",   params.get("cdramo"));
        map.put("estado",   params.get("estado"));
        map.put("nmpoliza", params.get("nmpoliza"));
        map.put("nmsituac", params.get("nmsituac"));
        map.put("nmsuplem", params.get("nmsuplem"));
        map.put("cdgarant", params.get("cdgarant") != null ? params.get("cdgarant") : null);
        */
        
        try {
            
            Utils.validate(params, "No hay parametros para el REST service");
            
            // Prepare header
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            //headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
            //HttpEntity<Map<String, String>> entity = new HttpEntity<Map<String, String>>(params, headers);
            HttpEntity<Map<String, String>> entity = new HttpEntity<Map<String, String>>(headers);
            
            String URI = "http://localhost:8080/iceServices/rest/emision/mpoligarTestREST/";
            
            StringBuilder sbURL = new StringBuilder()
                .append(URI).append(params.get("cdunieco")).append("/").append(params.get("cdramo")).append("/")
                .append(params.get("estado")).append("/").append(params.get("nmpoliza")).append("/")
                .append(params.get("nmsituac")).append("/").append(params.get("nmsuplem"));
            /*
            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(URI)
                    .queryParam("cdunieco", params.get("cdunieco"))
                    .queryParam("cdramo",   params.get("cdramo"))
                    .queryParam("estado",   params.get("estado"))
                    .queryParam("nmpoliza", params.get("nmpoliza"))
                    .queryParam("nmsituac", params.get("nmsituac"))
                    .queryParam("nmsuplem", params.get("nmsuplem"));
            logger.debug("Uri Components Builder: {}", builder.build().encode().toUri());
            */
            logger.debug("URL: {}", sbURL.toString());
            
            // Send the request as GET
            HttpEntity<Object> respService = restTemplate.exchange(sbURL.toString(), HttpMethod.PUT, entity, Object.class); // OK
            //HttpEntity<Object> respService = restTemplate.exchange(sbURL.toString(), HttpMethod.PUT, null, Object.class); // OK
            //HttpEntity<Object> respService = restTemplate.exchange(sbURL.toString(), HttpMethod.PUT, entity, Object.class, params);
            if (respService != null) {
                logger.debug("respService body={}", respService.getBody());
                list = (List<Map<String, String>>)respService.getBody();
                logger.info("respuesta :: " + list);
            }
            success = true;
        } catch (Exception e) {
            Utils.manejaExcepcion(e);
            restTemplate = null;
            logger.error("Error al llamar los servicios para obtener mpoligar: " + e.getMessage() + "\n" + e.getCause() + "\n" + e.getLocalizedMessage());
        }
        
        return SUCCESS;
    }
    
    
    /**
     * Metodo Spring que consume un servicio REST y lo vuelve a exponer como REST
     * Nota: Spring no necesita atributos de la clase para almacenar los datos (como Struts2)
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsituac
     * @param nmsuplem
     * @param cdgarant
     * @return lista de coberturas
     * @throws Exception
     */
    @RequestMapping(value = {
                "/mpoligarREST/{cdunieco}/{cdramo}/{estado}/{nmpoliza}/{nmsituac}/{nmsuplem}/{cdgarant}",
                "/mpoligarREST/{cdunieco}/{cdramo}/{estado}/{nmpoliza}/{nmsituac}/{nmsuplem}"
            },
            method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody List<Map<String, String>> invocaRESTSpring(@PathVariable String cdunieco,
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
                list = (List<Map<String, String>>)respService.getBody();
                logger.info("respuesta :: " + list);
            }
        } catch (Exception e) {
            Utils.manejaExcepcion(e);
            restTemplate = null;
            logger.error("Error al llamar los servicios para obtener mpoligar: " + e.getMessage() + "\n" + e.getCause() + "\n" + e.getLocalizedMessage());
        }
        return respList;
    }

    
    // Getters and setters:

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

    public List<Map<String, String>> getList() {
        return list;
    }

    public void setList(List<Map<String, String>> list) {
        this.list = list;
    }

}