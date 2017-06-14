/**
 * Created by jtezva on 5/5/2017.
 */
Ext.define('Ice.view.cadena.CadenaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cadena',
    
    onEncadenarClic: function () {
        var me = this,
            refs = me.getReferences();
        console.log(me, refs);
        refs.ricardo.getController().enviarDatos({
            callback: function () {
                refs.cesar.getController().buscar({
                    callback: function () {
                        refs.erick.getController().imprimeNombre({
                            callback: function () {
                                refs.alvaro.getController().guardar({
                                    callback: function () {
                                        alert('ya estan todos!');
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});