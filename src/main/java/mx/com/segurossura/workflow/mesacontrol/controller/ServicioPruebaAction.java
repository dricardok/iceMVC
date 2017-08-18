package mx.com.segurossura.workflow.mesacontrol.controller;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;
import com.biosnettcs.portal.controller.PrincipalCoreAction;

import mx.com.segurossura.workflow.mesacontrol.model.FlujoVO;

@Controller
@Scope("prototype")
@ParentPackage(value="default")
@Namespace("/mesacontrol")
@SuppressWarnings("serial")
public class ServicioPruebaAction extends PrincipalCoreAction {
    
    private Logger logger = LoggerFactory.getLogger(ServicioPruebaAction.class);
    
    private boolean success;
    private String message;
    private FlujoVO flujo;
    
    @Action(value   = "servicioTest",
            results = {
                @Result(name="success", type="json")
            }
    )
    public String servicioTest () {
        logger.debug(Utils.log("\n##########################",
                               "\n###### servicioTest ######",
                               "\n###### flujo = ", flujo));
        try {
            if (Math.random() > 0.5d) {
                throw new ApplicationException("Error aleatorio");
            }
            success = true;
        } catch (Exception e) {
            message = Utils.manejaExcepcion(e);
        }
        logger.debug(Utils.log("\n###### success = ", success,
                               "\n###### message = ", message,
                               "\n###### servicioTest ######",
                               "\n##########################"));
        return SUCCESS;
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

    public FlujoVO getFlujo() {
        return flujo;
    }

    public void setFlujo(FlujoVO flujo) {
        this.flujo = flujo;
    }
}