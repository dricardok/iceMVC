package mx.com.segurossura.emision.service;

import mx.com.royalsun.alea.commons.bean.TransactionResponse;
import mx.com.royalsun.alea.commons.bean.RequestWs;

public interface PagoManager{
	
	public TransactionResponse realizaPago(RequestWs request) throws Exception;

}
