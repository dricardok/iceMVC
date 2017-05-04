package mx.com.royalsun.guestbook.authentication;

import java.util.HashMap;

//import mx.com.royalsun.guestbook.commons.util.UtilProperties;
import mx.com.royalsun.services.interfaces.ServiceMapBase;
import mx.com.royalsun.services.interfaces.authentication.ViewfinderItemVO;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;

public class DelegSignOn {

	private static BeanSignOn sigOn;
	@Value("${DATABASE.URL}")
	private static String urlDataBase;
	@Value("${DATABASE.DRIVER}")
	private static String driverDataBase;
	
	
	private DelegSignOn() throws Exception{
		HttpInvokerProxyFactoryBean client = new HttpInvokerProxyFactoryBean();
		client.setServiceUrl("http://10.142.67.39:8080/authenticationServices/API/authentication/SignOnBO");
		client.setServiceInterface(ServiceMapBase.class);
		client.afterPropertiesSet();
		
		ServiceMapBase map = (ServiceMapBase) client.getObject();
		sigOn = new BeanSignOn();
		sigOn.setSignon(map);
		
		urlDataBase = "jdbc:oracle:thin:@10.142.74.232:1526:aleac11g";
		driverDataBase = "oracle.jdbc.OracleDriver";
	}
	
	@SuppressWarnings("unchecked")
	public static HashMap<String, Object> validaCuenta(String userDB, String userPass)
			throws Exception {
		if(sigOn == null){
			new DelegSignOn();
		}

		HashMap<String, Object> envio = new HashMap<String, Object>();
		envio.put("usuario", userDB);
		envio.put("password", userPass);
		envio.put("url", urlDataBase);
		envio.put("driver", driverDataBase);
		envio.put("operacion", "validaCuenta");
		return sigOn.getSignon().dispatch(envio);
	}
	
	@SuppressWarnings("unchecked")
	public static HashMap<String, Object> identUsuario(String cdusuari, Integer aplicacion)
			throws Exception {
		if(sigOn == null){
			new DelegSignOn();
		}
		
		HashMap<String, Object> envio = new HashMap<String, Object>();
		envio.put("cdusuari", cdusuari);
		envio.put("appid", aplicacion);
		envio.put("operacion", "identUsuario");
		return sigOn.getSignon().dispatch(envio);

	}
	
	public static boolean isValid(String usr,String pass) throws Exception{
		Object dat = validaCuenta(usr, pass).get("finder");
		if(dat==null)
			return false;
		return !((ViewfinderItemVO) dat).isFail();
	}
	
	
}
