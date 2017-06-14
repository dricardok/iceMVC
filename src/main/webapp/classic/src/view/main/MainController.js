Ext.define('Ice.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen : {
        controller : {
            '#' : {
                unmatchedroute: 'onRouteChange'
            }
        }
    },

    routes: {
        //':node': 'onRouteChange' jtezva: vacio para poner cadena get completa
    },

    lastView: null,

    setCurrentView: function (hashTag) {
        Ice.log('Ice.view.main.MainController.setCurrentView args:', arguments);
        var paso = 'Agregando nuevo componente al contenedor';
        try {
        
            //hashTag = (hashTag || '').toLowerCase();
    
            var me = this,
                refs = me.getReferences(),
                mainCard = refs.mainCardPanel,
                mainLayout = mainCard.getLayout(),
                navigationList = refs.navigationTreeList,
                store = navigationList.getStore(),
                node = store.findNode('url', hashTag),
                url = (node && node.get('url')) || hashTag, // 'page404',
                lastView = me.lastView,
                // existingItem = mainCard.child('component[routeId=' + hashTag + ']'), <<< jtezva: para siempre crear uno
                existingItem = false,
                newView;
            
            // para login y roltree no aplica 404
            if (hashTag === 'login.action' || hashTag === 'roltree.action' || hashTag === 'mesacontrol.action') {
                url = hashTag;
            }
    
            // Kill any previously routed window
            if (lastView && lastView.isWindow) {
                lastView.destroy();
            }
    
            lastView = mainLayout.getActiveItem();
            
            if (!existingItem) {
                var splitPuntoAction = url.indexOf('.action') !== -1 && url.split('.action'),
                    splitNombreAction = splitPuntoAction && splitPuntoAction.length > 0 && splitPuntoAction[0].split('/'),
                    nombreComp = (splitNombreAction && splitNombreAction.length > 0 && splitNombreAction[splitNombreAction.length - 1])
                        || 'page404',
                    params = (splitPuntoAction && splitPuntoAction.length > 1 && splitPuntoAction[1]
                        && splitPuntoAction[1].indexOf('?') !== -1 && splitPuntoAction[1].split('?')[1]
                        && Ext.urlDecode(splitPuntoAction[1].split('?')[1])
                        ) || {};
                Ice.log('Ice.view.main.MainController.setCurrentView nombreComp:', nombreComp, 'params:', params);
                
                var config = Object.assign({
                    xtype: nombreComp,
                    //routeId: hashTag,  // for existingItem search later (jtezva: comentado)
                    hideMode: 'offsets'
                }, params);
                
                Ice.log('Ice.view.main.MainController.setCurrentView config:', config);
                
                newView = Ext.create(config);
            }
            
            if (!newView || !newView.isWindow) {
                // !newView means we have an existing view, but if the newView isWindow
                // we don't add it to the card layout.
                if (existingItem) {
                    // We don't have a newView, so activate the existing view.
                    if (existingItem !== lastView) {
                        mainLayout.setActiveItem(existingItem);
                    }
                    newView = existingItem;
                }
                else {
                    // newView is set (did not exist already), so add it and make it the
                    // activeItem.
                    Ext.suspendLayouts();
                    mainLayout.setActiveItem(mainCard.add(newView));
                    Ext.resumeLayouts(true);
                }
            }
    
            navigationList.setSelection(node);
    
            if (newView.isFocusable(true)) {
                newView.focus();
            }
    
            me.lastView = newView;
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && node.get('url');

        if (to) {
            this.redirectTo(to);
        }
    },

    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
            }
            navigationList.canMeasure = false;

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({isRoot: true});
            navigationList.el.addCls('nav-tree-animating');

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                        navigationList.canMeasure = true;
                    },
                    single: true
                });
            }
        }
    },

    onMainViewRender: function() {
        if (!window.location.hash) {
            //jtezva: para que no
            //this.redirectTo("mesacontrol");
        }
        
        var paso = 'Invocando carga de sesi\u00f3n';
        try {
            this.cargarDatosSesion();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    onRouteChange: function (id) {
        this.setCurrentView(id);
    },

    onSwitchToModern: function () {
        Ext.Msg.confirm('Switch to Modern', 'Are you sure you want to switch toolkits?',
                        this.onSwitchToModernConfirmed, this);
    },

    onSwitchToModernConfirmed: function (choice) {
        if (choice === 'yes') {
            var s = window.location.search;

            // Strip "?classic" or "&classic" with optionally more "&foo" tokens
            // following and ensure we don't start with "?".
            s = s.replace(/(^\?|&)classic($|&)/, '').replace(/^\?/, '');

            // Add "?modern&" before the remaining tokens and strip & if there are
            // none.
            window.location.search = ('?modern&' + s).replace(/&$/, '');
        }
    },
    
    onLogoutClic: function () {
        Ice.logout();
    },
    
    cargarDatosSesion: function () {
        Ice.log('Ice.view.main.MainController.cargarDatosSesion');
        var me = this,
            view = me.getView(),
            paso = 'Recuperando usuario y rol activo';
        try {
            Ice.request({
                mascara: paso,
                url: Ice.url.core.recuperarDatosSesion,
                success: function (action) {
                    var paso2 = 'Ligando datos de sesi\u00f3n';
                    try {
                        view.viewModel.set('cdusuari', action.user && action.user.cdusuari || '');
                        view.viewModel.set('dsusuari', action.user && action.user.dsusuari || '');
                        view.viewModel.set('cdsisrol', action.user && action.user.rolActivo && action.user.rolActivo.cdsisrol || '');
                        view.viewModel.set('dssisrol', action.user && action.user.rolActivo && action.user.rolActivo.dssisrol || '');
                        view.viewModel.data.roles.removeAll();
                        view.viewModel.data.roles.reload();
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onComboRolesSesionSelect: function (combo, record) {
        Ice.log('Ice.view.main.MainController.onComboRolesSesionSelect args:', arguments);
        var paso = 'Seleccionando rol';
        try {
            Ice.request({
                mascara: paso,
                url: Ice.url.core.seleccionaRol,
                params: {
                    'params.cdsisrol': record.get('cdsisrol')
                },
                success: function (action) {
                    var paso2 = 'Redireccionando...';
                    try {
                        Ice.query('#mainView').getController().onToggleUserMenuSize();
                        Ice.query('#mainView').getController().redirectTo('roltree.action', true);
                    } catch(e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    onToggleUserMenuSize: function () {
        Ice.log('Ice.view.main.MainController.onToggleUserMenuSize');
        var me = this,
            refs = me.getReferences(),
            userMenu = refs.userMenu,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !userMenu.getMicro(),
            new_width = collapsing ? 0 : 250;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            userMenu.setWidth(new_width);
            userMenu.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                userMenu.setMicro(false);
            }
            userMenu.canMeasure = false;

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            userMenu.width = new_width;
            wrapContainer.updateLayout({isRoot: true});
            userMenu.el.addCls('nav-tree-animating');

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                userMenu.on({
                    afterlayoutanimation: function () {
                        userMenu.setMicro(true);
                        userMenu.el.removeCls('nav-tree-animating');
                        userMenu.canMeasure = true;
                    },
                    single: true
                });
            }
        }
    }
});
