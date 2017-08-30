// var Ice = Object.assign(Ice || {}, { // (Object.assign da error en explorer)
var Ice = (
        // funcion anonima para mezclar (reemplaza a Object.assign)
        function () {
            var resObj = {};
            for(var i = 0; i < arguments.length; i++) {
                var obj = arguments[i],
                    keys = Object.keys(obj);
                for (var j = 0; j < keys.length; j++) {
                    resObj[keys[j]] = obj[keys[j]];
                }
            }
            return resObj;
        }
    )(Ice || {}, {
    eventManager: {
        /**
         * @param item -> campo de formulario que dispara el evento
         * @param value -> valor del campo (puede ser null)
         * @param esCarga (opcional) -> cuando es la carga de un formulario (no deben hacerse setters)
         */
        change: function (item, value, esCarga) {
            Ice.log('Ice.eventManager.change item:', item, 'value:', value, 'esCarga:', esCarga);
            var paso = 'Administrando comportamiento din\u00e1mico';
            try {
                if (item.modoExt4 === true) {
                    return;
                }
                
                var me = item,
                    form = item.up('[getValues]') || {},
                    // name = item.getName(), se comenta para usar:
                    name = item.getReference(),
                    iceEvents = form.iceEvents;
                Ice.log('Ice.eventManager.change form:', form, 'name:', name, 'iceEvents:', iceEvents);
                if (!iceEvents) {
                    return;
                }
                var values = (form.getValues && form.getValues()) || {};
                if (Ext.isEmpty(value)) {
                    value = 'VACIO';
                }
                if (!(
                    // existe un changeValueProfile para name.value
                    iceEvents.changeValueProfile
                    && iceEvents.changeValueProfile[name]
                    // && iceEvents.changeValueProfile[name][value] se comenta para que se use *
                    // existe un changeEvents para name.[changeValueProfile]
                    && iceEvents.changeEvents
                    && iceEvents.changeEvents[name]
                    // && iceEvents.changeEvents[name][iceEvents.changeValueProfile[name][value]] se cambia por la linea:
                    && iceEvents.changeEvents[name][(iceEvents.changeValueProfile[name][value] || '*')]
                    )) {
                    return;
                }
                var formItemsMapByName,
                    names;
                var crearMapaItemsPorName = function () {
                    if (!formItemsMapByName) {
                        formItemsMapByName = {};
                        var items = Ice.query('[getName]' + (Ice.modern() ? '[parent]' : ''), form);
                        for (var i = 0; i < (items || []).length; i++) {
                            formItemsMapByName[items[i].getName()] = items[i];
                        }
                        names = formItemsMapByName;
                    }
                };
                var valueProfile = iceEvents.changeValueProfile[name][value] || '*';
                // para mostrar u ocultar campos
                if (iceEvents.changeEvents[name][valueProfile].visible) {
                    crearMapaItemsPorName();
                    Ext.suspendLayouts();
                    for (var targetName in iceEvents.changeEvents[name][valueProfile].visible) {
                        if (formItemsMapByName[targetName]) {
                            var target = formItemsMapByName[targetName];
                            target[iceEvents.changeEvents[name][valueProfile].visible[targetName]
                                ? 'show'
                                : 'hide']();
                        }
                    }
                    Ext.resumeLayouts();
                }
                // para setear valores
                if (iceEvents.changeEvents[name][valueProfile].valor && esCarga !== true) {
                    crearMapaItemsPorName();
                    for (var targetName in iceEvents.changeEvents[name][valueProfile].valor) {
                        if (formItemsMapByName[targetName]) {
                            var target = formItemsMapByName[targetName],
                                jsonValue = iceEvents.changeEvents[name][valueProfile].valor[targetName];
                            if(typeof jsonValue === 'function'){
                                jsonValue = jsonValue(me, value, form, values, target);
                            }
                            target.setValue(jsonValue);
                        }
                    }
                }
                // para cambiar labels
                if (iceEvents.changeEvents[name][valueProfile].label) {
                    crearMapaItemsPorName();
                    for (var targetName in iceEvents.changeEvents[name][valueProfile].label) {
                        if (formItemsMapByName[targetName]) {
                            var target = formItemsMapByName[targetName];
                            target.setLabel && target.setLabel(
                                iceEvents.changeEvents[name][valueProfile].label[targetName]
                            );
                            target.setFieldLabel && target.setFieldLabel(
                                iceEvents.changeEvents[name][valueProfile].label[targetName]
                            );
                        }
                    }
                }
            } catch (e) {
                Ice.manejaExcepcion(e, paso);
            }
        }
    }
});