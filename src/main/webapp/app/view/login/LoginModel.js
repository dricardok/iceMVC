/**
 * Created by jtezva on 5/15/2017.
 */
Ext.define('Ice.view.login.LoginModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'cdusuari', type: 'string'},
        {name: 'password', type: 'string'}
    ],
    validators: [
        {field: 'cdusuari', type: 'presence'},
        {field: 'password', type: 'presence'}
    ]
});