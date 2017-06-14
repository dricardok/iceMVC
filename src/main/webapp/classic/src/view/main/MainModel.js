Ext.define('Ice.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        currentView: null,
        cdusuari: null,
        dsusuari: null,
        cdsisrol: null,
        dssisrol: null,
        rolesCount: 0
    },
    
    formulas: {
        rolOUsuario: function (get) {
            return Boolean(get('cdusuari') || get('cdsisrol'));
        }
    },
    
    stores: {
        roles: {
            storeId: 'storeComboRolesSesion',
            autoLoad: true,
            fields: [
                'cdsisrol',
                'dssisrol'
            ],
            proxy: {
                type: 'ajax',
                url: Ice.url.core.recuperarRoles,
                reader: {
                    type: 'json',
                    rootProperty: 'roles',
                    successProperty: 'success',
                    messageProperty: 'message'
                }
            },
            listeners: {
                load: function (me, records, success) {
                    Ice.query('#mainView').viewModel.set('rolesCount', records.length);
                }
            }
        }
    }
});
