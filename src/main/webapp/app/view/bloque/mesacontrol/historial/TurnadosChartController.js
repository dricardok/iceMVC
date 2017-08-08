Ext.define("Ice.view.bloque.documentos.historial.TurnadosChartController",{
	alias		:	"controller.turnadoschart",
	extend: 'Ext.app.ViewController',
	
	onAxisLabelXRender : function(axis,label,lc,ll){
		var me = this,
	        view = me.getView(),
	        paso = 'Dibujando eje x turnados chart';
		try{
			Ice.log("inicio fin:",view.getInicio(),view.getFin());
			var u=(view.getFin()-view.getInicio())/100;
			var dat=view.getInicio()+(u*label);
			Ice.log("Dat:",dat);
			
			return Ext.Date.format(new Date(dat),'d/m/Y H:i');//layoutContext.renderer(label)
		}catch(e){
			Ice.manejaExcepcion(e,paso)
		}
	},
	
	onSeriesTooltipRender: function (tooltip, record, item) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            it = item.series.getTitle()[fieldIndex];
        var me = this,
        view = me.getView(),
        paso = 'Dibujando tooltip';
        try{
        	
	        var tSeg = Math.floor(Number(record.get('data'+fieldIndex)) / 1000),
		        tMin = Math.floor(tSeg / 60),
		        tHor = Math.floor(tMin / 60),
		        tDia = Math.floor(tHor / 24);
	        
	        tooltip.setHtml(it + ': ' + tDia+ ' día(s), ' + tHor%24 + ' hora(s), ' + tMin%60 +
	             ' minuto(s).');
        }catch(e){
			Ice.manejaExcepcion(e,paso)
		}
    }
});