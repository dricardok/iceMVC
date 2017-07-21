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
        change: function (item, value) {
            Ice.log('Ice.eventManager.change item:', item, 'value:', value);
            var paso = 'Administrando comportamiento din\u00e1mico';
            try {
                var form = item.up('[getValues]') || {},
                    name = item.getName(),
                    iceEvents = form.iceEvents;
                Ice.log('Ice.eventManager.change form:', form, 'name:', name, 'iceEvents:', iceEvents);
                if (!iceEvents) {
                    return;
                }
                if (Ext.isEmpty(value)) {
                    value = 'VACIO';
                }
                if (!(
                    // existe un changeValueProfile para name.value
                    iceEvents.changeValueProfile
                    && iceEvents.changeValueProfile[name]
                    && iceEvents.changeValueProfile[name][value]
                    // existe un changeEvents para name.[changeValueProfile]
                    && iceEvents.changeEvents
                    && iceEvents.changeEvents[name]
                    && iceEvents.changeEvents[name][iceEvents.changeValueProfile[name][value]]
                    )) {
                    return;
                }
                var formItemsMapByName;
                var crearMapaItemsPorName = function () {
                    if (!formItemsMapByName) {
                        formItemsMapByName = {};
                        var items = Ice.query('[name]', form);
                        for (var i = 0; i < (items || []).length; i++) {
                            formItemsMapByName[items[i].getName()] = items[i];
                        }
                    }
                };
                var valueProfile = iceEvents.changeValueProfile[name][value];
                if (iceEvents.changeEvents[name][valueProfile].visible) {
                    crearMapaItemsPorName();
                    Ext.suspendLayouts();
                    for (var targetName in iceEvents.changeEvents[name][valueProfile].visible) {
                        if (formItemsMapByName[targetName]) {
                            formItemsMapByName[targetName][iceEvents.changeEvents[name][valueProfile].visible[targetName]
                                ? 'show'
                                : 'hide']();
                        }
                    }
                    Ext.resumeLayouts();
                }
            } catch (e) {
                Ice.manejaExcepcion(e, paso);
            }
        }
    }
});