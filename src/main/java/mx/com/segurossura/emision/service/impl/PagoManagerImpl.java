package mx.com.segurossura.emision.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import mx.com.royalsun.alea.commons.api.IMultipagosAPI;
import mx.com.royalsun.alea.commons.bean.RequestWs;
import mx.com.royalsun.alea.commons.bean.TransactionResponse;
import mx.com.royalsun.alea.commons.exception.ResponseException;
import mx.com.segurossura.emision.service.PagoManager;

public class PagoManagerImpl implements PagoManager {
	
	@Autowired
    private IMultipagosAPI multipagosClient;

	@Override
	public TransactionResponse realizaPago(RequestWs request) throws Exception {
		
		TransactionResponse response = null;
		
		try{
			
			response = multipagosClient.realizarPago(request);
		
		}catch(ResponseException  e){
			e.printStackTrace();
		}
		
		return response;
	}
}
