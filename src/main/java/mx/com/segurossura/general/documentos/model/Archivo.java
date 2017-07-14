package mx.com.segurossura.general.documentos.model;

import java.io.InputStream;

public class Archivo {
    private InputStream fileInputStream;
    private String filename;
    private String contentType;
    
    public Archivo(){
    }
    
    public Archivo(InputStream fileInputStream, String filename, String contentType) {
        super();
        this.fileInputStream = fileInputStream;
        this.filename = filename;
        this.contentType = contentType;
    }
    public InputStream getFileInputStream() {
        return fileInputStream;
    }
    public void setFileInputStream(InputStream fileInputStream) {
        this.fileInputStream = fileInputStream;
    }
    public String getFilename() {
        return filename;
    }
    public void setFilename(String filename) {
        this.filename = filename;
    }
    public String getContentType() {
        return contentType;
    }
    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
}
