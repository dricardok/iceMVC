/**
 * Created by DEORTIZT on 5/5/2017.
 */
Ext.define('Ice.view.ErickController', {
    extend: 'Ext.app.ViewController',
    alias:  'controller.erickCntlr',
    
    imprimeNombre: function(objeto){
//        Ext.Msg.alert('Nombre','Erick');
        alert('callback ejecutado');
        if(!Ext.isEmpty(objeto)){
            if(!Ext.isEmpty(objeto['callback'])){
                if((typeof objeto['callback'])  === 'function'){
                    objeto['callback']();                    
                }
            }
        }
    }
});