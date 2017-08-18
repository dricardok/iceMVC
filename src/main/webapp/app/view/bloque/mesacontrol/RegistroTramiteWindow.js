Ext.define('Ice.view.bloque.RegistroTramiteWindow', {
    extend		:	'Ice.view.componente.VentanaIce',
    xtype		:	'registrotramitewindow',
    //autoShow	:	true,
    controller	:	'registrotramitewindow',
    title		:	'Registro de trámite',
    scrollable	:	true,
    modal		:	true,
    platformConfig: {
		desktop: {
			//layout		:	"hbox",
			width: 800,
			height: '70%'
		}
	},
	
	config	:	{
		cdtipflu	:	null,
		cdflujomc	:	null
	},
    constructor : function(config){
    	var me=this,paso='Construyendo Registro tramite';
    	try{
    		if(!config.cdtipflu){
    			throw 'No se recibió cdtipflu en RegistroTramiteWindow';
    		}
    		if(!config.cdflujomc){
    			throw 'No se recibió cdflujomc en RegistroTramiteWindow';
    		}
    		var items= Ice.generaComponentes({
	            pantalla: 'MESACONTROL',
	            seccion: 'FORM_REGISTRO_TRAMITE',
	            modulo: config.modulo,
	            estatus: (config.flujo && config.flujo.estatus) || '',
	            cdramo: config.cdramo,
	            cdtipsit: config.cdtipsit,
	            auxkey: config.cdtipflu + '-'+config.cdflujomc,
	            items: true,
	            fields: true,
	            validators: true
	        });
    		me.iniciarValores(items.MESACONTROL.FORM_REGISTRO_TRAMITE.items);
    		Ice.log("###->",items.MESACONTROL.FORM_REGISTRO_TRAMITE.items);
    		config.items=[
    			{
    				xtype		:	'formdoscolumnasice',
    				reference	:	'form',
    				items		:	items.MESACONTROL.FORM_REGISTRO_TRAMITE.items,
    				
    				modelValidators		:	items.MESACONTROL.FORM_REGISTRO_TRAMITE.validators,
    				modelFields			:	items.MESACONTROL.FORM_REGISTRO_TRAMITE.fields
    			}
    		];
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    	me.callParent(arguments);
    },
    buttons		:	[
		{
			text		:	'Guardar',
			iconCls		: 	'x-fa fa-save',
			handler		:	'onGuardar'
		},{
			text		:	'Cancelar',
			iconCls		: 	'x-fa fa-close',
			handler		:	'onCancelar'
		}
	],
	iniciarValores : function(items){
		var me   = this,
		paso = 'Iniciando valores';
		try{
			
			switch(Ice.sesion.cdsisrol){
				case Ice.constantes.roles.AGENTE:
					
					var estatus = items.find(function(it){
						return it.name=='estatus';
					});
					if(estatus)
						estatus.value='100';
					break;
			}
		}catch(e){
			Ice.manejaExcepcion(e,paso)
		}
	}
    
});