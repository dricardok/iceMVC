package com.biosnettcs.portal.model;

import java.io.Serializable;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * Rol de sistema
 * @author Ricardo
 *
 */
public class RolVO implements Serializable {

    private static final long serialVersionUID = 5769939690034163728L;

    private String cdsisrol;
	
	private String dssisrol;
	
	private boolean activo;
	
	
	// Getters & Setters:

    public String getCdsisrol() {
        return cdsisrol;
    }

    public void setCdsisrol(String clave) {
        this.cdsisrol = clave;
    }

    public String getDssisrol() {
        return dssisrol;
    }

    public void setDssisrol(String descripcion) {
        this.dssisrol = descripcion;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }
    
    
    
    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }
	
}