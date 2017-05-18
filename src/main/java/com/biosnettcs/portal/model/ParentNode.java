package com.biosnettcs.portal.model;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="parentNode")
@XmlAccessorType(XmlAccessType.FIELD)
public class ParentNode {
	
	@XmlElement(name="childNode")
	private List<ChildNode> lstChildNodes;

	public List<ChildNode> getLstChildNodes() {
		if(lstChildNodes == null)
			lstChildNodes = new ArrayList<ChildNode>();
		
		return lstChildNodes;
	}

	public void setLstChildNodes(List<ChildNode> lstChildNodes) {
		this.lstChildNodes = lstChildNodes;
	}
	
	
	public void actualizarTarget(){
		this.iterarChildNodes(this.getLstChildNodes(), 3);
	}
	
	
	private void iterarChildNodes(List<ChildNode> lst, int nivel){
		for (ChildNode c : lst) {
			if(!c.getAtrFinish() && c.getNodes() != null && c.getNodes().size() > 0){
				c.setAtrTarget(this.obtenerTarget(c.getAtrWork()));
				iterarChildNodes(c.getNodes(), nivel+1);
			}else{
				c.setAtrTarget(this.obtenerTarget(c.getAtrWork()));
			}	
		}
	}
	
	private String obtenerTarget(String atrWork){
		String target = "";
		Pattern pattern = Pattern.compile("target=(\\w+).*");
	    Matcher m = pattern.matcher(atrWork);
	    if(m.find()){
		    target = m.group(1);
		}
		return target;
	}
	
	
}
