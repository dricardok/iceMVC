/**
 * Created by DCACORDE on 5/5/2017.
 */
Ext.define('Ice.view.cesar.Cesar', {
	
	extend:'Ext.panel.Panel'
	,xtype :'cesarCmp'
	,requires: [
		'Ext.form.Panel',
		'Ext.form.field.*',
		'Ext.grid.Panel'
	]
	,controller:'cesarController'
	,cls:'cs-cls'
	,items:[
		{
		    title: 'Buscar',
		    xtype:'form',
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
		        fieldLabel: 'Nombre',
		        name: 'first',
		        allowBlank: false
		    },{
		        fieldLabel: 'Apellido',
		        name: 'last',
		        allowBlank: false
		    },
		    {
		        xtype: 'datefield',
		        anchor: '100%',
		        fieldLabel: 'Desde',
		        name: 'from_date',
		        maxValue: new Date()  // limited to the current date or prior
		    }, {
		        xtype: 'datefield',
		        anchor: '100%',
		        fieldLabel: 'Hasta',
		        name: 'to_date',
		        value: new Date()  // defaults to today
		    }
		    
		    ],

		    // Reset and Submit buttons
		    buttons: [{
		        text: 'Reset'
//		        handler: function() {
//		            this.up('form').getForm().reset();
//		        }
		    }, 
		    {
		        text: 'Submit',
		        formBind: true, //only enabled once the form is valid
		        disabled: true,
		        handler: 'buscar'
//		        handler: function() {
//		            var form = this.up('form').getForm();
//		            if (form.isValid()) {
//		                form.submit({
//		                    success: function(form, action) {
//		                       Ext.Msg.alert('Success', action.result.msg);
//		                    },
//		                    failure: function(form, action) {
//		                        Ext.Msg.alert('Failed', action.result.msg);
//		                    }
//		                });
//		            }
//		        }
		    }]
	}
		, {
			
			xtype:'grid',
		    title: 'Simpsons',
		    store: Ext.data.StoreManager.lookup('simpsonsStore'),
		    columns: [
		        { text: 'Nombre', dataIndex: 'name' },
		        { text: 'Email', dataIndex: 'email', flex: 1 },
		        { text: 'Fecha Nacimiento', dataIndex: 'fecha' }
		    ],
		    height: 200,
		    width: 400
		}
		
	]
});