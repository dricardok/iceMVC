
package com.biosnettcs.portal.model;

import java.io.Serializable;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.apache.log4j.Logger;

/**
 * Usuario del sistema
 */
public class UsuarioVO implements Serializable {
    
    private static final long serialVersionUID = -9172892843785928698L;

    private Logger logger = Logger.getLogger(UsuarioVO.class);

    /**
     * Codigo del usuario
     */
    private String cdusuario;
    
    /**
     * Descripcion del usuario
     */
    private String dsusuario;
    
    /**
     * Codigo de persona del usuario
     */
    private String cdperson;
    
    /**
     * Sucursal del usuario
     */
    private String cdunieco;
    
    private String nombre;
    
    private String nombre2;
    
    private String paterno;
    
    private String materno;
    
    private List<RolVO> roles;
    
    private RolVO rolActivo;
    
    private List<MenuPrincipalVO> menus;
    
   
    // Getters & setters:
    
    public Logger getLogger() {
        return logger;
    }

    public void setLogger(Logger logger) {
        this.logger = logger;
    }

    public String getCdusuario() {
        return cdusuario;
    }

    public void setCdusuario(String cdusuario) {
        this.cdusuario = cdusuario;
    }

    public String getDsusuario() {
        return dsusuario;
    }

    public void setDsusuario(String dsusuario) {
        this.dsusuario = dsusuario;
    }

    public String getCdperson() {
        return cdperson;
    }

    public void setCdperson(String cdperson) {
        this.cdperson = cdperson;
    }

    public String getCdunieco() {
        return cdunieco;
    }

    public void setCdunieco(String cdunieco) {
        this.cdunieco = cdunieco;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombre2() {
        return nombre2;
    }

    public void setNombre2(String nombre2) {
        this.nombre2 = nombre2;
    }

    public String getPaterno() {
        return paterno;
    }

    public void setPaterno(String paterno) {
        this.paterno = paterno;
    }

    public String getMaterno() {
        return materno;
    }

    public void setMaterno(String materno) {
        this.materno = materno;
    }

    public List<RolVO> getRoles() {
        return roles;
    }

    public void setRoles(List<RolVO> roles) {
        this.roles = roles;
    }

    public RolVO getRolActivo() {
        return rolActivo;
    }

    public void setRolActivo(RolVO rolActivo) {
        this.rolActivo = rolActivo;
    }

    public List<MenuPrincipalVO> getMenus() {
        return menus;
    }

    public void setMenus(List<MenuPrincipalVO> menus) {
        this.menus = menus;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }

}