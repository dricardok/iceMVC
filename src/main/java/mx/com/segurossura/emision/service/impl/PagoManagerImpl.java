package mx.com.segurossura.emision.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mx.com.royalsun.alea.commons.api.IMultipagosAPI;
import mx.com.royalsun.alea.commons.bean.RequestWs;
import mx.com.royalsun.alea.commons.bean.TransactionResponse;
import mx.com.royalsun.alea.commons.exception.ResponseException;
import mx.com.segurossura.emision.service.PagoManager;

@Service
public class PagoManagerImpl implements PagoManager {
		
	@Autowired
	private IMultipagosAPI multipagosClientSR;
	
	@Autowired
	private IMultipagosAPI multipagosClientAP;

	@Override
	public TransactionResponse realizaPago(RequestWs request) throws Exception {
		
		TransactionResponse response = null;
		
//		try{
//			
//			response = multipagosClientSR.realizarPago(request);
//			System.out.println(response);
//		
//		}catch(ResponseException  e){
//			e.printStackTrace();
//		}
		
		return response;
	}
	
	
	@Override
	public void aplicaPago(RequestWs request) throws Exception {
		
//		try{
//			
//			multipagosClientAP.aplicaPago(request);
//			System.out.println("aplicaPago");
//			
//		}catch(ResponseException e){
//			e.printStackTrace();
//		}
	}

}