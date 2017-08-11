package mx.com.segurossura.emision.service.impl;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mx.com.royalsun.alea.commons.api.IMultipagosAPI;
import mx.com.royalsun.alea.commons.bean.RequestWs;
import mx.com.royalsun.alea.commons.bean.TransactionResponse;
import mx.com.segurossura.emision.service.PagoManager;

@Service
public class PagoManagerImpl implements PagoManager {
	private final static Logger logger = LoggerFactory.getLogger(PagoManagerImpl.class);
		
	@Autowired
	private IMultipagosAPI multipagosClientSR;
	
	@Autowired
	private IMultipagosAPI multipagosClientAP;

	@Override
	public TransactionResponse realizaPago(RequestWs request) throws Exception {
		TransactionResponse response = null;
		
		try{
			response = multipagosClientSR.realizarPago(request);
			logger.info("end realizaPago: "+response.getCcReturnMsg());
		}catch(IOException  e){
			logger.error("Error al invocar servicio de pago: ", e);
			throw e;
		}
		
		return response;
	}
	
	
	@Override
	public void aplicaPago(RequestWs request) throws Exception {
		try{
			multipagosClientAP.aplicaPago(request);
			logger.info("end aplicaPago...");
		}catch(IOException e){
			logger.error("Error al invocar servicio de aplicacion de pago: ", e);
			throw e;
		}
	}

}