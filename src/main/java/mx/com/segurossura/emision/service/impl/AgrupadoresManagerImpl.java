package mx.com.segurossura.emision.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mx.com.segurossura.emision.dao.AgrupadoresDAO;
import mx.com.segurossura.emision.service.AgrupadoresManager;

@Service
public class AgrupadoresManagerImpl implements AgrupadoresManager {
	
    private static final Logger logger = LoggerFactory.getLogger(AgrupadoresManagerImpl.class);

	@Autowired
	private AgrupadoresDAO agrupadoresDAO;
	
	
	
	
}