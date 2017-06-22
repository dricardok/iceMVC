package mx.com.segurossura.authentication;

import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;

import mx.com.royalsun.services.interfaces.ServiceMapBase;
import mx.com.royalsun.services.interfaces.authentication.ViewfinderItemVO;
import mx.com.segurossura.authentication.model.BeanSignOn;

public class DelegSignOn {

	@SuppressWarnings("unused")
    private final static Logger logger = LoggerFactory.getLogger(DelegSignOn.class);
	
	private static BeanSignOn sigOn;
	
	private static String urlDataBase;
	
	private static String driverDataBase;
	
	
	
	private DelegSignOn(
	  String urlDataBase,
	  String driverDataBase, 
	  String urlAuth) throws Exception{
		HttpInvokerProxyFactoryBean client = new HttpInvokerProxyFactoryBean();
		client.setServiceUrl(urlAuth);
		client.setServiceInterface(ServiceMapBase.class);
		client.afterPropertiesSet();
		
		ServiceMapBase map = (ServiceMapBase) client.getObject();
		sigOn = new BeanSignOn();
		sigOn.setSignon(map);
		
		
		
		DelegSignOn.urlDataBase = urlDataBase;
		DelegSignOn.driverDataBase = driverDataBase;
	}
	
	@SuppressWarnings("unchecked")
	private static HashMap<String, Object> validaCuenta(String userDB, String userPass)
			throws Exception {
//		if(sigOn == null){
//			new DelegSignOn();
//		}

		HashMap<String, Object> envio = new HashMap<String, Object>();
		envio.put("usuario", userDB);
		envio.put("password", userPass);
		envio.put("url", urlDataBase);
		envio.put("driver", driverDataBase);
		envio.put("operacion", "validaCuenta");
		return sigOn.getSignon().dispatch(envio);
	}
	
	@SuppressWarnings("unchecked")
	private static HashMap<String, Object> identUsuario(String cdusuari, Integer aplicacion)
			throws Exception {
//		if(sigOn == null){
//			new DelegSignOn();
//		}
		
		HashMap<String, Object> envio = new HashMap<String, Object>();
		envio.put("cdusuari", cdusuari);
		envio.put("appid", aplicacion);
		envio.put("operacion", "identUsuario");
		return sigOn.getSignon().dispatch(envio);

	}
	
	public static boolean isValid(String usr,String pass,String urlDataBase,
			  String driverDataBase, 
			  String urlAuth) throws Exception{
		if(sigOn == null){
			new DelegSignOn(urlDataBase,driverDataBase,urlAuth);
		}		
		
		Object dat = validaCuenta(usr, pass).get("finder");
		if(dat==null)
			return false;
		return !((ViewfinderItemVO) dat).isFail();
	}
	
	
}
