package mx.com.segurossura.emision.service;

import java.util.Map;

public interface AuthenticationManager {

	boolean login(String usr, String password, Map<String, String> respuesta) throws Exception;

	
}
