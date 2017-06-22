package mx.com.segurossura.authentication.model;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class ChildNode {
	@XmlAttribute
	private String atrWork;
	@XmlAttribute
	private String atrMenu;
	@XmlAttribute
	private boolean atrFinish;
	@XmlAttribute
	private String atrCdfunci;
	@XmlAttribute
	private String atrTarget;
	
	
	@XmlElement(name="childNode")
	private List<ChildNode> nodes;

	public String getAtrWork() {
		return atrWork;
	}

	public void setAtrWork(String atrWork) {
		this.atrWork = atrWork;
	}

	public String getAtrCdfunci() {
		return atrCdfunci;
	}

	public void setAtrCdfunci(String atrCdfunci) {
		this.atrCdfunci = atrCdfunci;
	}

	public boolean getAtrFinish() {
		return atrFinish;
	}

	public void setAtrFinish(boolean atrFinish) {
		this.atrFinish = atrFinish;
	}
	
	public String getAtrMenu() {
		return atrMenu;
	}

	public void setAtrMenu(String atrMenu) {
		this.atrMenu = atrMenu;
	}

	
	public String getAtrTarget() {
		return atrTarget;
	}

	public void setAtrTarget(String atrTarget) {
		this.atrTarget = atrTarget;
	}
	
	public List<ChildNode> getNodes() {
		if(nodes == null)
			nodes = new ArrayList<ChildNode>();
		
		return nodes;
	}

	public void setNodes(List<ChildNode> nodes) {
		this.nodes = nodes;
	}

}
