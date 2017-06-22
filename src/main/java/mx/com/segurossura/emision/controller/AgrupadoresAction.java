package mx.com.segurossura.emision.controller;

import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.biosnettcs.portal.controller.PrincipalCoreAction;

import mx.com.segurossura.emision.service.AgrupadoresManager;


@Controller
@Scope("prototype")
@ParentPackage(value="json-default")
@Namespace("/emision")
public class AgrupadoresAction extends PrincipalCoreAction {

    private static final long serialVersionUID = -7749154966703079520L;

    private static final Logger logger = LoggerFactory.getLogger(AgrupadoresAction.class);

	private boolean success;
	
	private String message;
	
	private Map<String, String> params;
	
	private List<Map<String, String>> list;

	@Autowired
    private AgrupadoresManager agrupadoresManager;
	
	
	// Methods:
	
	


	// Getters and setters:
	
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

    public List<Map<String, String>> getList() {
        return list;
    }

    public void setList(List<Map<String, String>> list) {
        this.list = list;
    }
    
}