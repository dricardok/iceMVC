Ext.define("Ice.view.bloque.documentos.historial.TurnadosChartController",{
	alias		:	"controller.turnadoschart",
	extend: 'Ext.app.ViewController',
	
	onAxisLabelXRender : function(axis,label,lc,ll){
		Ice.log("####---",axis,label,lc,ll);
		

		
		var u=(1472773200000-1472768580000)/100;
		var dat=1472768580000+(u*label);
		Ice.log("Dat:",dat);
		
		return Ext.Date.format(new Date(dat),'d/m/Y H:i');//layoutContext.renderer(label)
	}
});