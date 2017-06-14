Ext.define('Ice.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Ice',

    stores: [
        'NavigationTree'
    ],

    defaultToken : 'mesacontrol.action',

    // The name of the initial view to create. This class will gain a "viewport" plugin
    // if it does not extend Ext.Viewport.
    //
    mainView: 'Ice.view.main.Main',

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
