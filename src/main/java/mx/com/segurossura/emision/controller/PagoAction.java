package mx.com.segurossura.emision.controller;

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

import mx.com.royalsun.alea.commons.bean.Banco;
import mx.com.royalsun.alea.commons.bean.RequestWs;
import mx.com.royalsun.alea.commons.bean.Tarjeta;
import mx.com.segurossura.emision.service.PagoManager;

@Controller
@Scope("prototype")
@ParentPackage(value="default")
@Namespace("/emision")
public class PagoAction extends PrincipalCoreAction {

	private static final Logger logger = LoggerFactory.getLogger(PagoAction.class);
	
	private boolean success;
	private String message;
	private Map<String, String> params;
	
	@Autowired
	private PagoManager pagoManager;
	
	@Action(
            value = "pago/realizaPago", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )
	public String realizaPago(){

		logger.debug(Utils.log("### cargar params: ", params));

		try{

			Banco banco = new Banco();
		    banco.setClaveBanco("052");
		    banco.setDescBanco("IXE");
		    banco.setLstGestores(null);
		    
		    Tarjeta tarjeta = new Tarjeta("4259818000071113");
		    tarjeta.setCodigoSeguridad("123");
		    tarjeta.setTipo("C");
		    tarjeta.setDescTipo("CREDITO");
		    tarjeta.setCodigo("425981");
		    tarjeta.setFechaVencimiento("12/15");
		    tarjeta.setTarjetahabiente("Elias Mendoza Orozco");
		    tarjeta.setBanco(banco);
		    
		    RequestWs request = new RequestWs();
		    request.setCdunieco(72);
		    request.setCdramo(601);
		    request.setNmpoliza(12088);
		    request.setNmrecibo(1004458);
		    request.setImporte(18.32);
		    
		    request.setEmail("elias.mendoza@mx.rsagroup.com");
		    request.setUsuario("OPS$FEADM");
		    
		    request.setTarjeta(tarjeta);
			
			pagoManager.realizaPago(request);

			success = true;

		}catch(Exception ex){
			message = Utils.manejaExcepcion(ex);
		}

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


	public Map<String, String> getParams() {
		return params;
	}


	public void setParams(Map<String, String> params) {
		this.params = params;
	}

}