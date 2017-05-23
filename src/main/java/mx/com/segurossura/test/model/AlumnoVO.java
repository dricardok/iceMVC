package mx.com.segurossura.test.model;

import java.util.Date;

public class AlumnoVO {

    private long cdalumno;
    
    private String nombre;
    
    private String paterno;
    
    private String materno;
    
    private Date fechaNac;

    public long getCdalumno() {
        return cdalumno;
    }

    public void setCdalumno(long cdalumno) {
        this.cdalumno = cdalumno;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
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

    public Date getFechaNac() {
        return fechaNac;
    }

    public void setFechaNac(Date fechaNac) {
        this.fechaNac = fechaNac;
    }
    
}