package mx.com.segurossura.workflow.mail.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.mail.internet.MimeMessage;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import mx.com.segurossura.workflow.mail.service.MailService;

@Component
public class MailServiceImpl implements MailService {
	
	static final Logger logger = LoggerFactory.getLogger(MailServiceImpl.class);
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Value("${mail.from}")
	private String from;
	
	@Value("${mail.from.alias}")
	private String fromAlias;
	
	@Override
	public boolean enviaCorreo(String[] to, String[] cc, String[] bcc, String asunto, String mensaje, String[] rutasAdjuntos, boolean contentTypeHTML) {
		
		// Se genera una lista de objetos File a partir del arreglo rutasAdjuntos:
		List<File> archivos = new ArrayList<File>();
		for(String ruta : ArrayUtils.nullToEmpty(rutasAdjuntos)) {
			if( StringUtils.isNotBlank(ruta) ) {
				archivos.add(new File(ruta));
			}
		}
		// Se invoca el envio de correo:
		return enviaCorreo(to, cc, bcc, asunto, mensaje, archivos, contentTypeHTML);
	}

	
	@Override
	public boolean enviaCorreo(String[] to, String[] cc, String[] bcc, String asunto, String mensaje, List<File> adjuntos, boolean contentTypeHTML) {
		
		boolean exito = false;
		MimeMessage message = mailSender.createMimeMessage();
		
		try {
			
			MimeMessageHelper helper = new MimeMessageHelper(message, true);//TODO: set multipart by parameter
			// Se asigna el remitente:
			helper.setFrom(from, fromAlias);
			// Se asignan los destinatarios:
			if(to != null && to.length > 0) {
				helper.setTo(to);				
			}
			if(cc != null && cc.length > 0) {
				helper.setCc(cc);
			}
			if(bcc != null && bcc.length > 0) {
				helper.setBcc(bcc);
			}
			helper.setSubject(asunto);
			// Se asigna el mensaje:
			helper.setText(mensaje, contentTypeHTML);
			// Se asignan los adjuntos:
			for(File file : adjuntos) {
				if(file != null && file.exists()) {
					helper.addAttachment(file.getName(), file);
					logger.info( "Se adjunto el archivo {}", file.getAbsolutePath() );
				} else {
					String fileName = (file != null) ? file.getName() : null;
					logger.warn( "El archivo {} no existe, no se adjuntara", fileName);
				}
			}
			// Se envia el correo:
			mailSender.send(message);
			exito = true;
			logger.info("Email enviado");
		}catch(Exception e){
			logger.error("Error al enviar correo", e);
		}
		return exito;
	}
	
	/**
	 * 
	 * @param from
	 */
	public void setFrom(String from) {
		this.from = from;
	}

	/**
	 * 
	 * @param fromAlias
	 */
	public void setFromAlias(String fromAlias) {
		this.fromAlias = fromAlias;
	}
	
}
