package mx.com.segurossura.general.catalogos.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mx.com.segurossura.general.catalogos.service.PropertiesManager;

@Service
public class PorpertiesManagerImpl implements PropertiesManager {
	
	@Autowired
	private Map mapaPropiedades;

	@Override
	public Map<String, String> obtenerPropiedades() throws Exception {
		
		return mapaPropiedades;
	}

}
