package mx.com.segurossura.general.producto.model;

public enum EstadoPoliza {
    
    WORKING("W"),
    MASTER("M");
    
    private String clave;
    
    private EstadoPoliza(String clave) {
        this.clave = clave;
    }

    public String getClave() {
        return clave;
    }
	
}