/**
 * Created by DCACORDE on 5/5/2017.
 */
Ext.define('Ice.view.cesar.Cesar', {
	
	extend:'Ext.Panel'
	,xtype :'cesarCmp'
	,requires: [
		'Ext.form.Panel',
		'Ext.field.*',
		'Ext.Toolbar'
	]
	,controller:'cesarController'
	,cls:'cs-md'
	,items:[
		{
		    title: 'Buscar',
		    xtype:'formpanel',
		    //fullscreen: true,
		    bodyPadding: 5,
		    width: 350,

		    // The form will submit an AJAX request to this URL when submitted
		    url: 'save-form.php',

		    // Fields will be arranged vertically, stretched to full width
//		    layout: 'anchor',
//		    defaults: {
//		        anchor: '100%'
//		    },

		    // The fields
		    defaultType: 'textfield',
		    items: [{
		        label: 'Nombre',
		        name: 'first',
		        allowBlank: false
		    },{
		        label: 'Apellido',
		        name: 'last',
		        allowBlank: false 
		    }
		    ,
		    {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [ {
                    xtype: 'button',
                    text: 'Cancel'
                }, {
                    xtype: 'button',
                    text: 'Login',
                    handler: 'buscar'
                }]
            }
//		    },
//		    {
//		        xtype: 'datefield',
//		        anchor: '100%',
//		        fieldLabel: 'Desde',
//		        name: 'from_date',
//		        maxValue: new Date()  // limited to the current date or prior
//		    }, {
//		        xtype: 'datefield',
//		        anchor: '100%',
//		        fieldLabel: 'Hasta',
//		        name: 'to_date',
//		        value: new Date()  // defaults to today
//		    }
		    
		    ],

		    dockedItems: [],   
		    // Reset and Submit buttons
		   
	}
//		, {
//			
//			xtype:'grid',
//		    title: 'Simpsons',
//		    store: Ext.data.StoreManager.lookup('simpsonsStore'),
//		    columns: [
//		        { text: 'Nombre', dataIndex: 'name' },
//		        { text: 'Email', dataIndex: 'email', flex: 1 },
//		        { text: 'Fecha Nacimiento', dataIndex: 'fecha' }
//		    ],
//		    height: 200,
//		    width: 400
//		}
		
	]
});