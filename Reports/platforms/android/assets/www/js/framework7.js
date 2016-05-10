/**
 * Framework7 1.4.0
 * Full Featured Mobile HTML Framework For Building iOS & Android Apps
 * 
 * http://www.idangero.us/framework7
 * 
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: December 7, 2015
 */
(function () {

    'use strict';
    /*===========================
    Framework 7
    ===========================*/
    window.Framework7 = function (params) {
        // App
        var app = this;
    
        // Version
        app.version = '1.4.0';
    
        // Default Parameters
        app.params = {
            cache: true,
            cacheIgnore: [],
            cacheIgnoreGetParameters: false,
            cacheDuration: 1000 * 60 * 10, // Ten minutes
            preloadPreviousPage: true,
            uniqueHistory: false,
            uniqueHistoryIgnoreGetParameters: false,
            dynamicPageUrl: 'content-{{index}}',
            allowDuplicateUrls: false,
            router: true,
            // Push State
            pushState: false,
            pushStateRoot: undefined,
            pushStateNoAnimation: false,
            pushStateSeparator: '#!/',
            pushStatePreventOnLoad: true,
            // Fast clicks
            fastClicks: true,
            fastClicksDistanceThreshold: 10,
            fastClicksDelayBetweenClicks: 50,
            // Tap Hold
            tapHold: false,
            tapHoldDelay: 750,
            tapHoldPreventClicks: true,
            // Active State
            activeState: true,
            activeStateElements: 'a, button, label, span',
            // Animate Nav Back Icon
            animateNavBackIcon: false,
            // Swipe Back
            swipeBackPage: true,
            swipeBackPageThreshold: 0,
            swipeBackPageActiveArea: 30,
            swipeBackPageAnimateShadow: true,
            swipeBackPageAnimateOpacity: true,
            // Ajax
            ajaxLinks: undefined, // or CSS selector
            // External Links
            externalLinks: '.external', // CSS selector
            // Sortable
            sortable: true,
            // Scroll toolbars
            hideNavbarOnPageScroll: false,
            hideToolbarOnPageScroll: false,
            hideTabbarOnPageScroll: false,
            showBarsOnPageScrollEnd: true,
            showBarsOnPageScrollTop: true,
            // Swipeout
            swipeout: true,
            swipeoutActionsNoFold: false,
            swipeoutNoFollow: false,
            // Smart Select Back link template
            smartSelectOpenIn: 'page', // or 'popup' or 'picker'
            smartSelectBackText: 'Back',
            smartSelectPopupCloseText: 'Close',
            smartSelectPickerCloseText: 'Done',
            smartSelectSearchbar: false,
            smartSelectBackOnSelect: false,
            // Tap Navbar or Statusbar to scroll to top
            scrollTopOnNavbarClick: false,
            scrollTopOnStatusbarClick: false,
            // Panels
            swipePanel: false, // or 'left' or 'right'
            swipePanelActiveArea: 0,
            swipePanelCloseOpposite: true,
            swipePanelOnlyClose: false,
            swipePanelNoFollow: false,
            swipePanelThreshold: 0,
            panelsCloseByOutside: true,
            // Modals
            modalButtonOk: 'OK',
            modalButtonCancel: 'Cancel',
            modalUsernamePlaceholder: 'Username',
            modalPasswordPlaceholder: 'Password',
            modalTitle: 'Framework7',
            modalCloseByOutside: false,
            actionsCloseByOutside: true,
            popupCloseByOutside: true,
            modalPreloaderTitle: 'Loading... ',
            modalStack: true,
            // Lazy Load
            imagesLazyLoadThreshold: 0,
            imagesLazyLoadSequential: true,
            // Name space
            viewClass: 'view',
            viewMainClass: 'view-main',
            viewsClass: 'views',
            // Notifications defaults
            notificationCloseOnClick: false,
            notificationCloseIcon: true,
            notificationCloseButtonText: 'Close',
            // Animate Pages
            animatePages: true,
            // Template7
            templates: {},
            template7Data: {},
            template7Pages: false,
            precompileTemplates: false,
            // Material
            material: false,
            materialPageLoadDelay: 0,
            materialPreloaderSvg: '<svg xmlns="http://www.w3.org/2000/svg" height="75" width="75" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg>',
            materialPreloaderHtml:
                '<span class="preloader-inner">' +
                    '<span class="preloader-inner-gap"></span>' +
                    '<span class="preloader-inner-left">' +
                        '<span class="preloader-inner-half-circle"></span>' +
                    '</span>' +
                    '<span class="preloader-inner-right">' +
                        '<span class="preloader-inner-half-circle"></span>' +
                    '</span>' +
                '</span>',
            materialRipple: true,
            materialRippleElements: '.ripple, a.link, a.item-link, .button, .modal-button, .tab-link, .label-radio, .label-checkbox, .actions-modal-button, a.searchbar-clear, a.floating-button, .floating-button > a, .speed-dial-buttons a',
            // Auto init
            init: true,
        };
    
        // Extend defaults with parameters
        for (var param in params) {
            app.params[param] = params[param];
        }
    
        // DOM lib
        var $ = Dom7;
    
        // Template7 lib
        var t7 = Template7;
        app._compiledTemplates = {};
    
        // Touch events
        app.touchEvents = {
            start: app.support.touch ? 'touchstart' : 'mousedown',
            move: app.support.touch ? 'touchmove' : 'mousemove',
            end: app.support.touch ? 'touchend' : 'mouseup'
        };
    
        // Link to local storage
        app.ls = window.localStorage;
    
        // RTL
        app.rtl = $('body').css('direction') === 'rtl';
        if (app.rtl) $('html').attr('dir', 'rtl');
    
        // Overwrite statusbar overlay
        if (typeof app.params.statusbarOverlay !== 'undefined') {
            if (app.params.statusbarOverlay) $('html').addClass('with-statusbar-overlay');
            else $('html').removeClass('with-statusbar-overlay');
        }
    
        
    

        /*======================================================
        ************   Views   ************
        ======================================================*/
        app.views = [];
        var View = function (selector, params) {
            var defaults = {
                dynamicNavbar: false,
                domCache: false,
                linksView: undefined,
                reloadPages: false,
                uniqueHistory: app.params.uniqueHistory,
                uniqueHistoryIgnoreGetParameters: app.params.uniqueHistoryIgnoreGetParameters,
                allowDuplicateUrls: app.params.allowDuplicateUrls,
                swipeBackPage: app.params.swipeBackPage,
                swipeBackPageAnimateShadow: app.params.swipeBackPageAnimateShadow,
                swipeBackPageAnimateOpacity: app.params.swipeBackPageAnimateOpacity,
                swipeBackPageActiveArea: app.params.swipeBackPageActiveArea,
                swipeBackPageThreshold: app.params.swipeBackPageThreshold,
                animatePages: app.params.animatePages,
                preloadPreviousPage: app.params.preloadPreviousPage
            };
            var i;
        
            // Params
            params = params || {};
        
            // Disable dynamic navbar for material theme
            if (params.dynamicNavbar && app.params.material) params.dynamicNavbar = false;
        
            // Extend params with defaults
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            // View
            var view = this;
            view.params = params;
        
            // Selector
            view.selector = selector;
        
            // Container
            var container = $(selector);
            view.container = container[0];
        
            // Fix Selector
        
            if (typeof selector !== 'string') {
                // Supposed to be HTMLElement or Dom7
                selector = (container.attr('id') ? '#' + container.attr('id') : '') + (container.attr('class') ? '.' + container.attr('class').replace(/ /g, '.').replace('.active', '') : '');
                view.selector = selector;
            }
        
            // Is main
            view.main = container.hasClass(app.params.viewMainClass);
        
            // Content cache
            view.contentCache = {};
        
            // Pages cache
            view.pagesCache = {};
        
            // Store View in element for easy access
            container[0].f7View = view;
        
            // Pages
            view.pagesContainer = container.find('.pages')[0];
            view.initialPages = [];
            view.initialPagesUrl = [];
            view.initialNavbars = [];
            if (view.params.domCache) {
                var initialPages = container.find('.page');
                for (i = 0; i < initialPages.length; i++) {
                    view.initialPages.push(initialPages[i]);
                    view.initialPagesUrl.push('#' + initialPages.eq(i).attr('data-page'));
                }
                if (view.params.dynamicNavbar) {
                    var initialNavbars = container.find('.navbar-inner');
                    for (i = 0; i < initialNavbars.length; i++) {
                        view.initialNavbars.push(initialNavbars[i]);
                    }
                }
        
            }
        
            view.allowPageChange = true;
        
            // Location
            var docLocation = document.location.href;
        
            // History
            view.history = [];
            var viewURL = docLocation;
            var pushStateSeparator = app.params.pushStateSeparator;
            var pushStateRoot = app.params.pushStateRoot;
            if (app.params.pushState && view.main) {
                if (pushStateRoot) {
                    viewURL = pushStateRoot;
                }
                else {
                    if (viewURL.indexOf(pushStateSeparator) >= 0 && viewURL.indexOf(pushStateSeparator + '#') < 0) viewURL = viewURL.split(pushStateSeparator)[0];
                }
        
            }
        
            // Active Page
            var currentPage, currentPageData;
            if (!view.activePage) {
                currentPage = $(view.pagesContainer).find('.page-on-center');
                if (currentPage.length === 0) {
                    currentPage = $(view.pagesContainer).find('.page:not(.cached)');
                    currentPage = currentPage.eq(currentPage.length - 1);
                }
                if (currentPage.length > 0) {
                    currentPageData = currentPage[0].f7PageData;
                }
            }
        
            // View startup URL
            if (view.params.domCache && currentPage) {
                view.url = container.attr('data-url') || view.params.url || '#' + currentPage.attr('data-page');   
                view.pagesCache[view.url] = currentPage.attr('data-page');
            }
            else view.url = container.attr('data-url') || view.params.url || viewURL;
        
            // Update current page Data
            if (currentPageData) {
                currentPageData.view = view;
                currentPageData.url = view.url;
                if (view.params.domCache && view.params.dynamicNavbar && !currentPageData.navbarInnerContainer) {
                    currentPageData.navbarInnerContainer = view.initialNavbars[view.initialPages.indexOf(currentPageData.container)];
                }
                view.activePage = currentPageData;
                currentPage[0].f7PageData = currentPageData;
            }
        
            // Store to history main view's url
            if (view.url) {
                view.history.push(view.url);
            }
        
            // Touch events
            var isTouched = false,
                isMoved = false,
                touchesStart = {},
                isScrolling,
                activePage = [],
                previousPage = [],
                viewContainerWidth,
                touchesDiff,
                allowViewTouchMove = true,
                touchStartTime,
                activeNavbar = [],
                previousNavbar = [],
                activeNavElements,
                previousNavElements,
                activeNavBackIcon,
                previousNavBackIcon,
                dynamicNavbar,
                pageShadow,
                el;
        
            view.handleTouchStart = function (e) {
                if (!allowViewTouchMove || !view.params.swipeBackPage || isTouched || app.swipeoutOpenedEl || !view.allowPageChange) return;
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();
                dynamicNavbar = view.params.dynamicNavbar && container.find('.navbar-inner').length > 1;
            };
        
            view.handleTouchMove = function (e) {
                if (!isTouched) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (isScrolling || e.f7PreventSwipeBack || app.preventSwipeBack) {
                    isTouched = false;
                    return;
                }
                if (!isMoved) {
                    var cancel = false;
                    // Calc values during first move fired
                    viewContainerWidth = container.width();
                    var target = $(e.target);
                    var swipeout = target.hasClass('swipeout') ? target : target.parents('.swipeout');
                    if (swipeout.length > 0) {
                        if (!app.rtl && swipeout.find('.swipeout-actions-left').length > 0) cancel = true;
                        if (app.rtl && swipeout.find('.swipeout-actions-right').length > 0) cancel = true;
                    }
                    activePage = target.is('.page') ? target : target.parents('.page');
                    if (activePage.hasClass('no-swipeback')) cancel = true;
                    previousPage = container.find('.page-on-left:not(.cached)');
                    var notFromBorder = touchesStart.x - container.offset().left > view.params.swipeBackPageActiveArea;
                    if (app.rtl) {
                        notFromBorder = touchesStart.x < container.offset().left - container[0].scrollLeft + viewContainerWidth - view.params.swipeBackPageActiveArea;
                    }
                    else {
                        notFromBorder = touchesStart.x - container.offset().left > view.params.swipeBackPageActiveArea;
                    }
                    if (notFromBorder) cancel = true;
                    if (previousPage.length === 0 || activePage.length === 0) cancel = true;
                    if (cancel) {
                        isTouched = false;
                        return;
                    }
        
                    if (view.params.swipeBackPageAnimateShadow && !app.device.android) {
                        pageShadow = activePage.find('.swipeback-page-shadow');
                        if (pageShadow.length === 0) {
                            pageShadow = $('<div class="swipeback-page-shadow"></div>');
                            activePage.append(pageShadow);
                        }
                    }
        
                    if (dynamicNavbar) {
                        activeNavbar = container.find('.navbar-on-center:not(.cached)');
                        previousNavbar = container.find('.navbar-on-left:not(.cached)');
                        activeNavElements = activeNavbar.find('.left, .center, .right, .subnavbar, .fading');
                        previousNavElements = previousNavbar.find('.left, .center, .right, .subnavbar, .fading');
                        if (app.params.animateNavBackIcon) {
                            activeNavBackIcon = activeNavbar.find('.left.sliding .back .icon');
                            previousNavBackIcon = previousNavbar.find('.left.sliding .back .icon');
                        }
                    }
        
                    // Close/Hide Any Picker
                    if ($('.picker-modal.modal-in').length > 0) {
                        app.closeModal($('.picker-modal.modal-in'));
                    }
                }
                e.f7PreventPanelSwipe = true;
                isMoved = true;
                e.preventDefault();
        
                // RTL inverter
                var inverter = app.rtl ? -1 : 1;
        
                // Touches diff
                touchesDiff = (pageX - touchesStart.x - view.params.swipeBackPageThreshold) * inverter;
                if (touchesDiff < 0) touchesDiff = 0;
                var percentage = touchesDiff / viewContainerWidth;
        
                // Swipe Back Callback
                var callbackData = {
                    percentage: percentage,
                    activePage: activePage[0],
                    previousPage: previousPage[0],
                    activeNavbar: activeNavbar[0],
                    previousNavbar: previousNavbar[0]
                };
                if (view.params.onSwipeBackMove) {
                    view.params.onSwipeBackMove(callbackData);
                }
                container.trigger('swipeBackMove', callbackData);
        
                // Transform pages
                var activePageTranslate = touchesDiff * inverter;
                var previousPageTranslate = (touchesDiff / 5 - viewContainerWidth / 5) * inverter;
                if (app.device.pixelRatio === 1) {
                    activePageTranslate = Math.round(activePageTranslate);
                    previousPageTranslate = Math.round(previousPageTranslate);
                }
        
                activePage.transform('translate3d(' + activePageTranslate + 'px,0,0)');
                if (view.params.swipeBackPageAnimateShadow && !app.device.android) pageShadow[0].style.opacity = 1 - 1 * percentage;
        
                previousPage.transform('translate3d(' + previousPageTranslate + 'px,0,0)');
                if (view.params.swipeBackPageAnimateOpacity) previousPage[0].style.opacity = 0.9 + 0.1 * percentage;
        
                // Dynamic Navbars Animation
                if (dynamicNavbar) {
                    var i;
                    for (i = 0; i < activeNavElements.length; i++) {
                        el = $(activeNavElements[i]);
                        if (!el.is('.subnavbar.sliding')) el[0].style.opacity = (1 - percentage * 1.3);
                        if (el[0].className.indexOf('sliding') >= 0) {
                            var activeNavTranslate = percentage * el[0].f7NavbarRightOffset;
                            if (app.device.pixelRatio === 1) activeNavTranslate = Math.round(activeNavTranslate);
                            el.transform('translate3d(' + activeNavTranslate + 'px,0,0)');
                            if (app.params.animateNavBackIcon) {
                                if (el[0].className.indexOf('left') >= 0 && activeNavBackIcon.length > 0) {
                                    activeNavBackIcon.transform('translate3d(' + -activeNavTranslate + 'px,0,0)');
                                }
                            }
                        }
                    }
                    for (i = 0; i < previousNavElements.length; i++) {
                        el = $(previousNavElements[i]);
                        if (!el.is('.subnavbar.sliding')) el[0].style.opacity = percentage * 1.3 - 0.3;
                        if (el[0].className.indexOf('sliding') >= 0) {
                            var previousNavTranslate = el[0].f7NavbarLeftOffset * (1 - percentage);
                            if (app.device.pixelRatio === 1) previousNavTranslate = Math.round(previousNavTranslate);
                            el.transform('translate3d(' + previousNavTranslate + 'px,0,0)');
                            if (app.params.animateNavBackIcon) {
                                if (el[0].className.indexOf('left') >= 0 && previousNavBackIcon.length > 0) {
                                    previousNavBackIcon.transform('translate3d(' + -previousNavTranslate + 'px,0,0)');
                                }
                            }
                        }
                    }
                }
            };
        
            view.handleTouchEnd = function (e) {
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                isTouched = false;
                isMoved = false;
                if (touchesDiff === 0) {
                    $([activePage[0], previousPage[0]]).transform('').css({opacity: '', boxShadow: ''});
                    if (dynamicNavbar) {
                        activeNavElements.transform('').css({opacity: ''});
                        previousNavElements.transform('').css({opacity: ''});
                        if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.transform('');
                        if (previousNavBackIcon && activeNavBackIcon.length > 0) previousNavBackIcon.transform('');
                    }
                    return;
                }
                var timeDiff = (new Date()).getTime() - touchStartTime;
                var pageChanged = false;
                // Swipe back to previous page
                if (
                        timeDiff < 300 && touchesDiff > 10 ||
                        timeDiff >= 300 && touchesDiff > viewContainerWidth / 2
                    ) {
                    activePage.removeClass('page-on-center').addClass('page-on-right');
                    previousPage.removeClass('page-on-left').addClass('page-on-center');
                    if (dynamicNavbar) {
                        activeNavbar.removeClass('navbar-on-center').addClass('navbar-on-right');
                        previousNavbar.removeClass('navbar-on-left').addClass('navbar-on-center');
                    }
                    pageChanged = true;
                }
                // Reset custom styles
                // Add transitioning class for transition-duration
                $([activePage[0], previousPage[0]]).transform('').css({opacity: '', boxShadow: ''}).addClass('page-transitioning');
                if (dynamicNavbar) {
                    activeNavElements.css({opacity: ''})
                    .each(function () {
                        var translate = pageChanged ? this.f7NavbarRightOffset : 0;
                        var sliding = $(this);
                        sliding.transform('translate3d(' + translate + 'px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && activeNavBackIcon.length > 0) {
                                activeNavBackIcon.addClass('page-transitioning').transform('translate3d(' + -translate + 'px,0,0)');
                            }
                        }
        
                    }).addClass('page-transitioning');
        
                    previousNavElements.transform('').css({opacity: ''}).each(function () {
                        var translate = pageChanged ? 0 : this.f7NavbarLeftOffset;
                        var sliding = $(this);
                        sliding.transform('translate3d(' + translate + 'px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && previousNavBackIcon.length > 0) {
                                previousNavBackIcon.addClass('page-transitioning').transform('translate3d(' + -translate + 'px,0,0)');
                            }
                        }
                    }).addClass('page-transitioning');
                }
                allowViewTouchMove = false;
                view.allowPageChange = false;
                // Swipe Back Callback
                var callbackData = {
                    activePage: activePage[0],
                    previousPage: previousPage[0],
                    activeNavbar: activeNavbar[0],
                    previousNavbar: previousNavbar[0]
                };
                if (pageChanged) {
                    // Update View's URL
                    var url = view.history[view.history.length - 2];
                    view.url = url;
        
                    // Page before animation callback
                    app.pageBackCallback('before', view, {pageContainer: activePage[0], url: url, position: 'center', newPage: previousPage, oldPage: activePage, swipeBack: true});
                    app.pageAnimCallback('before', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage, swipeBack: true});
        
                    if (view.params.onSwipeBackBeforeChange) {
                        view.params.onSwipeBackBeforeChange(callbackData);
                    }
                    container.trigger('swipeBackBeforeChange', callbackData);
                }
                else {
                    if (view.params.onSwipeBackBeforeReset) {
                        view.params.onSwipeBackBeforeReset(callbackData);
                    }
                    container.trigger('swipeBackBeforeReset', callbackData);
                }
        
                activePage.transitionEnd(function () {
                    $([activePage[0], previousPage[0]]).removeClass('page-transitioning');
                    if (dynamicNavbar) {
                        activeNavElements.removeClass('page-transitioning').css({opacity: ''});
                        previousNavElements.removeClass('page-transitioning').css({opacity: ''});
                        if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.removeClass('page-transitioning');
                        if (previousNavBackIcon && previousNavBackIcon.length > 0) previousNavBackIcon.removeClass('page-transitioning');
                    }
                    allowViewTouchMove = true;
                    view.allowPageChange = true;
                    if (pageChanged) {
                        if (app.params.pushState && view.main) history.back();
                        // Page after animation callback
                        app.pageBackCallback('after', view, {pageContainer: activePage[0], url: url, position: 'center', newPage: previousPage, oldPage: activePage, swipeBack: true});
                        app.pageAnimCallback('after', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage, swipeBack: true});
                        app.router.afterBack(view, activePage, previousPage);
        
                        if (view.params.onSwipeBackAfterChange) {
                            view.params.onSwipeBackAfterChange(callbackData);
                        }
                        container.trigger('swipeBackAfterChange', callbackData);
                    }
                    else {
                        if (view.params.onSwipeBackAfterReset) {
                            view.params.onSwipeBackAfterReset(callbackData);
                        }
                        container.trigger('swipeBackAfterReset', callbackData);
                    }
                    if (pageShadow && pageShadow.length > 0) pageShadow.remove();
                });
            };
            view.attachEvents = function (detach) {
                var action = detach ? 'off' : 'on';
                container[action](app.touchEvents.start, view.handleTouchStart);
                container[action](app.touchEvents.move, view.handleTouchMove);
                container[action](app.touchEvents.end, view.handleTouchEnd);
            };
            view.detachEvents = function () {
                view.attachEvents(true);
            };
        
            // Init
            if (view.params.swipeBackPage && !app.params.material) {
                view.attachEvents();
            }
        
            // Add view to app
            app.views.push(view);
            if (view.main) app.mainView = view;
        
            // Router 
            view.router = {
                load: function (options) {
                    return app.router.load(view, options);
                },
                back: function (options) {
                    return app.router.back(view, options);  
                },
                // Shortcuts
                loadPage: function (options) {
                    options = options || {};
                    if (typeof options === 'string') {
                        var url = options;
                        options = {};
                        if (url && url.indexOf('#') === 0 && view.params.domCache) {
                            options.pageName = url.split('#')[1];
                        }
                        else options.url = url;
                    }
                    return app.router.load(view, options);
                },
                loadContent: function (content) {
                    return app.router.load(view, {content: content});
                },
                reloadPage: function (url) {
                    return app.router.load(view, {url: url, reload: true});
                },
                reloadContent: function (content) {
                    return app.router.load(view, {content: content, reload: true});
                },
                reloadPreviousPage: function (url) {
                    return app.router.load(view, {url: url, reloadPrevious: true, reload: true});
                },
                reloadPreviousContent: function (content) {
                    return app.router.load(view, {content: content, reloadPrevious: true, reload: true});
                },
                refreshPage: function () {
                    var options = {
                        url: view.url,
                        reload: true,
                        ignoreCache: true
                    };
                    if (options.url && options.url.indexOf('#') === 0) {
                        if (view.params.domCache && view.pagesCache[options.url]) {
                            options.pageName = view.pagesCache[options.url];
                            options.url = undefined;
                            delete options.url;
                        }
                        else if (view.contentCache[options.url]) {
                            options.content = view.contentCache[options.url];
                            options.url = undefined;
                            delete options.url;
                        }
                    }
                    return app.router.load(view, options);
                },
                refreshPreviousPage: function () {
                    var options = {
                        url: view.history[view.history.length - 2],
                        reload: true,
                        reloadPrevious: true,
                        ignoreCache: true
                    };
                    if (options.url && options.url.indexOf('#') === 0 && view.params.domCache && view.pagesCache[options.url]) {
                        options.pageName = view.pagesCache[options.url];
                        options.url = undefined;
                        delete options.url;
                    }
                    return app.router.load(view, options);
                }
            };
        
            // Aliases for temporary backward compatibility
            view.loadPage = view.router.loadPage;
            view.loadContent = view.router.loadContent;
            view.reloadPage = view.router.reloadPage;
            view.reloadContent = view.router.reloadContent;
            view.reloadPreviousPage = view.router.reloadPreviousPage;
            view.reloadPreviousContent = view.router.reloadPreviousContent;
            view.refreshPage = view.router.refreshPage;
            view.refreshPreviousPage = view.router.refreshPreviousPage;
            view.back = view.router.back;
        
            // Bars methods
            view.hideNavbar = function () {
                return app.hideNavbar(container.find('.navbar'));
            };
            view.showNavbar = function () {
                return app.showNavbar(container.find('.navbar'));
            };
            view.hideToolbar = function () {
                return app.hideToolbar(container.find('.toolbar'));
            };
            view.showToolbar = function () {
                return app.showToolbar(container.find('.toolbar'));
            };
        
            // Push State on load
            if (app.params.pushState && view.main) {
                var pushStateUrl;
                var pushStateUrlSplit = docLocation.split(pushStateSeparator)[1];
                if (pushStateRoot) {
                    pushStateUrl = docLocation.split(app.params.pushStateRoot + pushStateSeparator)[1];
                }
                else if (pushStateSeparator && docLocation.indexOf(pushStateSeparator) >= 0 && docLocation.indexOf(pushStateSeparator + '#') < 0) {
                    pushStateUrl = pushStateUrlSplit;
                }
                var pushStateAnimatePages = app.params.pushStateNoAnimation ? false : undefined;
                var historyState = history.state;
        
                if (pushStateUrl) {
                    if (pushStateUrl.indexOf('#') >= 0 && view.params.domCache && historyState && historyState.pageName && 'viewIndex' in historyState) {
                        app.router.load(view, {pageName: historyState.pageName, animatePages: pushStateAnimatePages, pushState: false});
                    }
                    else if (pushStateUrl.indexOf('#') >= 0 && view.params.domCache && view.initialPagesUrl.indexOf(pushStateUrl) >= 0) {
                        app.router.load(view, {pageName: pushStateUrl.replace('#',''), animatePages: pushStateAnimatePages, pushState: false});   
                    }
                    else app.router.load(view, {url: pushStateUrl, animatePages: pushStateAnimatePages, pushState: false});
                }
                else if (view.params.domCache && docLocation.indexOf(pushStateSeparator + '#') >= 0) {
                    if (historyState && historyState.pageName && 'viewIndex' in historyState) {
                        app.router.load(view, {pageName: historyState.pageName, animatePages: pushStateAnimatePages, pushState: false});
                    }
                    else if (pushStateSeparator && pushStateUrlSplit.indexOf('#') === 0) {
                        if (view.initialPagesUrl.indexOf(pushStateUrlSplit)) {
                            app.router.load(view, {pageName: pushStateUrlSplit.replace('#', ''), animatePages: pushStateAnimatePages, pushState: false});
                        }
                    }
                }
            }
        
            // Destroy
            view.destroy = function () {
                view.detachEvents();
                view = undefined;
            };
        
            // Plugin hook
            app.pluginHook('addView', view);
        
            // Return view
            return view;
        };
        
        app.addView = function (selector, params) {
            return new View(selector, params);
        };
        
        app.getCurrentView = function (index) {
            var popoverView = $('.popover.modal-in .view');
            var popupView = $('.popup.modal-in .view');
            var panelView = $('.panel.active .view');
            var appViews = $('.views');
            // Find active view as tab
            var appView = appViews.children('.view');
            // Propably in tabs or split view
            if (appView.length > 1) {
                if (appView.hasClass('tab')) {
                    // Tabs
                    appView = appViews.children('.view.active');
                }
                else {
                    // Split View, leave appView intact
                }
            }
            if (popoverView.length > 0 && popoverView[0].f7View) return popoverView[0].f7View;
            if (popupView.length > 0 && popupView[0].f7View) return popupView[0].f7View;
            if (panelView.length > 0 && panelView[0].f7View) return panelView[0].f7View;
            if (appView.length > 0) {
                if (appView.length === 1 && appView[0].f7View) return appView[0].f7View;
                if (appView.length > 1) {
                    var currentViews = [];
                    for (var i = 0; i < appView.length; i++) {
                        if (appView[i].f7View) currentViews.push(appView[i].f7View);
                    }
                    if (currentViews.length > 0 && typeof index !== 'undefined') return currentViews[index];
                    if (currentViews.length > 1) return currentViews;
                    if (currentViews.length === 1) return currentViews[0];
                    return undefined;
                }
            }
            return undefined;
        };
        

        /*======================================================
        ************   Navbars && Toolbars   ************
        ======================================================*/
        // On Navbar Init Callback
        app.navbarInitCallback = function (view, pageContainer, navbarContainer, navbarInnerContainer) {
            if (!navbarContainer && navbarInnerContainer) navbarContainer = $(navbarInnerContainer).parent('.navbar')[0];
            if (navbarInnerContainer.f7NavbarInitialized && view && !view.params.domCache) return;
            var navbarData = {
                container: navbarContainer,
                innerContainer: navbarInnerContainer
            };
            var pageData = pageContainer && pageContainer.f7PageData;
        
            var eventData = {
                page: pageData,
                navbar: navbarData
            };
        
            if (navbarInnerContainer.f7NavbarInitialized && ((view && view.params.domCache) || (!view && $(navbarContainer).parents('.popup, .popover, .login-screen, .modal, .actions-modal, .picker-modal').length > 0))) {
                // Reinit Navbar
                app.reinitNavbar(navbarContainer, navbarInnerContainer);
        
                // Plugin hook
                app.pluginHook('navbarReinit', eventData);
        
                // Event
                $(navbarInnerContainer).trigger('navbarReinit', eventData);
                return;
            }
            navbarInnerContainer.f7NavbarInitialized = true;
            // Before Init
            app.pluginHook('navbarBeforeInit', navbarData, pageData);
            $(navbarInnerContainer).trigger('navbarBeforeInit', eventData);
        
            // Initialize Navbar
            app.initNavbar(navbarContainer, navbarInnerContainer);
        
            // On init
            app.pluginHook('navbarInit', navbarData, pageData);
            $(navbarInnerContainer).trigger('navbarInit', eventData);
        };
        // Navbar Remove Callback
        app.navbarRemoveCallback = function (view, pageContainer, navbarContainer, navbarInnerContainer) {
            if (!navbarContainer && navbarInnerContainer) navbarContainer = $(navbarInnerContainer).parent('.navbar')[0];
            var navbarData = {
                container: navbarContainer,
                innerContainer: navbarInnerContainer
            };
            var pageData = pageContainer.f7PageData;
        
            var eventData = {
                page: pageData,
                navbar: navbarData
            };
            app.pluginHook('navbarBeforeRemove', navbarData, pageData);
            $(navbarInnerContainer).trigger('navbarBeforeRemove', eventData);
        };
        app.initNavbar = function (navbarContainer, navbarInnerContainer) {
            // Init Subnavbar Searchbar
            if (app.initSearchbar) app.initSearchbar(navbarInnerContainer);
        };
        app.reinitNavbar = function (navbarContainer, navbarInnerContainer) {
            // Re init navbar methods
        };
        app.initNavbarWithCallback = function (navbarContainer) {
            navbarContainer = $(navbarContainer);
            var viewContainer = navbarContainer.parents('.' + app.params.viewClass);
            var view;
            if (viewContainer.length === 0) return;
            if (navbarContainer.parents('.navbar-through').length === 0 && viewContainer.find('.navbar-through').length === 0) return;
            view = viewContainer[0].f7View || undefined;
        
            navbarContainer.find('.navbar-inner').each(function () {
                var navbarInnerContainer = this;
                var pageContainer;
                if ($(navbarInnerContainer).attr('data-page')) {
                    // For dom cache
                    pageContainer = viewContainer.find('.page[data-page="' + $(navbarInnerContainer).attr('data-page') + '"]')[0];
                }
                if (!pageContainer) {
                    var pages = viewContainer.find('.page');
                    if (pages.length === 1) {
                        pageContainer = pages[0];
                    }
                    else {
                        viewContainer.find('.page').each(function () {
                            if (this.f7PageData && this.f7PageData.navbarInnerContainer === navbarInnerContainer) {
                                pageContainer = this;
                            }
                        });
                    }
                }
                app.navbarInitCallback(view, pageContainer, navbarContainer[0], navbarInnerContainer);
            });
        };
        
        // Size Navbars
        app.sizeNavbars = function (viewContainer) {
            if (app.params.material) return;
            var navbarInner = viewContainer ? $(viewContainer).find('.navbar .navbar-inner:not(.cached)') : $('.navbar .navbar-inner:not(.cached)');
            navbarInner.each(function () {
                var n = $(this);
                if (n.hasClass('cached')) return;
                var left = app.rtl ? n.find('.right') : n.find('.left'),
                    right = app.rtl ? n.find('.left') : n.find('.right'),
                    center = n.find('.center'),
                    subnavbar = n.find('.subnavbar'),
                    noLeft = left.length === 0,
                    noRight = right.length === 0,
                    leftWidth = noLeft ? 0 : left.outerWidth(true),
                    rightWidth = noRight ? 0 : right.outerWidth(true),
                    centerWidth = center.outerWidth(true),
                    navbarStyles = n.styles(),
                    navbarWidth = n[0].offsetWidth - parseInt(navbarStyles.paddingLeft, 10) - parseInt(navbarStyles.paddingRight, 10),
                    onLeft = n.hasClass('navbar-on-left'),
                    currLeft, diff;
        
                if (noRight) {
                    currLeft = navbarWidth - centerWidth;
                }
                if (noLeft) {
                    currLeft = 0;
                }
                if (!noLeft && !noRight) {
                    currLeft = (navbarWidth - rightWidth - centerWidth + leftWidth) / 2;
                }
                var requiredLeft = (navbarWidth - centerWidth) / 2;
                if (navbarWidth - leftWidth - rightWidth > centerWidth) {
                    if (requiredLeft < leftWidth) {
                        requiredLeft = leftWidth;
                    }
                    if (requiredLeft + centerWidth > navbarWidth - rightWidth) {
                        requiredLeft = navbarWidth - rightWidth - centerWidth;
                    }
                    diff = requiredLeft - currLeft;
                }
                else {
                    diff = 0;
                }
                // RTL inverter
                var inverter = app.rtl ? -1 : 1;
        
                if (center.hasClass('sliding')) {
                    center[0].f7NavbarLeftOffset = -(currLeft + diff) * inverter;
                    center[0].f7NavbarRightOffset = (navbarWidth - currLeft - diff - centerWidth) * inverter;
                    if (onLeft) center.transform('translate3d(' + center[0].f7NavbarLeftOffset + 'px, 0, 0)');
                }
                if (!noLeft && left.hasClass('sliding')) {
                    if (app.rtl) {
                        left[0].f7NavbarLeftOffset = -(navbarWidth - left[0].offsetWidth) / 2 * inverter;
                        left[0].f7NavbarRightOffset = leftWidth * inverter;
                    }
                    else {
                        left[0].f7NavbarLeftOffset = -leftWidth;
                        left[0].f7NavbarRightOffset = (navbarWidth - left[0].offsetWidth) / 2;
                    }
                    if (onLeft) left.transform('translate3d(' + left[0].f7NavbarLeftOffset + 'px, 0, 0)');
                }
                if (!noRight && right.hasClass('sliding')) {
                    if (app.rtl) {
                        right[0].f7NavbarLeftOffset = -rightWidth * inverter;
                        right[0].f7NavbarRightOffset = (navbarWidth - right[0].offsetWidth) / 2 * inverter;
                    }
                    else {
                        right[0].f7NavbarLeftOffset = -(navbarWidth - right[0].offsetWidth) / 2;
                        right[0].f7NavbarRightOffset = rightWidth;
                    }
                    if (onLeft) right.transform('translate3d(' + right[0].f7NavbarLeftOffset + 'px, 0, 0)');
                }
                if (subnavbar.length && subnavbar.hasClass('sliding')) {
                    subnavbar[0].f7NavbarLeftOffset = app.rtl ? subnavbar[0].offsetWidth : -subnavbar[0].offsetWidth;
                    subnavbar[0].f7NavbarRightOffset = -subnavbar[0].f7NavbarLeftOffset;
                }
        
                // Center left
                var centerLeft = diff;
                if (app.rtl && noLeft && noRight && center.length > 0) centerLeft = -centerLeft;
                center.css({left: centerLeft + 'px'});
                
            });
        };
        
        // Hide/Show Navbars/Toolbars
        app.hideNavbar = function (navbarContainer) {
            $(navbarContainer).addClass('navbar-hidden');
            return true;
        };
        app.showNavbar = function (navbarContainer) {
            var navbar = $(navbarContainer);
            navbar.addClass('navbar-hiding').removeClass('navbar-hidden').transitionEnd(function () {
                navbar.removeClass('navbar-hiding');
            });
            return true;
        };
        app.hideToolbar = function (toolbarContainer) {
            $(toolbarContainer).addClass('toolbar-hidden');
            return true;
        };
        app.showToolbar = function (toolbarContainer) {
            var toolbar = $(toolbarContainer);
            toolbar.addClass('toolbar-hiding').removeClass('toolbar-hidden').transitionEnd(function () {
                toolbar.removeClass('toolbar-hiding');
            });
        };
        

        /*======================================================
        ************   Searchbar   ************
        ======================================================*/
        var Searchbar = function (container, params) {
            var defaults = {
                input: null,
                clearButton: null,
                cancelButton: null,
                searchList: null,
                searchIn: '.item-title',
                searchBy: '',
                found: null,
                notFound: null,
                overlay: null,
                ignore: '.searchbar-ignore',
                customSearch: false,
                removeDiacritics: false,
                hideDividers: true,
                hideGroups: true,
                /* Callbacks
                onSearch
                onEnable
                onDisable
                onClear
                */
        
            };
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined' || params[def] === null) {
                    params[def] = defaults[def];
                }
            }
            
            // Instance
            var s = this;
        
            // Material
            s.material = app.params.material;
        
            // Params
            s.params = params;
        
            // Container
            container = $(container);
            s.container = container;
        
            // Active
            s.active = false;
        
            // Input
            s.input = s.params.input ? $(s.params.input) : s.container.find('input[type="search"]');
            s.clearButton = s.params.clearButton ? $(s.params.clearButton) : s.container.find('.searchbar-clear');
            s.cancelButton = s.params.cancelButton ? $(s.params.cancelButton) : s.container.find('.searchbar-cancel');
        
            // Search List
            s.searchList = $(s.params.searchList);
        
            // Is Virtual List
            s.isVirtualList = s.searchList.hasClass('virtual-list');
        
            // Is In Page
            s.pageContainer = s.container.parents('.page').eq(0);
        
            // Overlay
            if (!s.params.overlay) {
                s.overlay = s.pageContainer.length > 0 ? s.pageContainer.find('.searchbar-overlay') : $('.searchbar-overlay');
            }
            else {
                s.overlay = $(s.params.overlay);
            }
            // Found and not found
            if (!s.params.found) {
                s.found = s.pageContainer.length > 0 ? s.pageContainer.find('.searchbar-found') : $('.searchbar-found');
            }
            else {
                s.found = $(s.params.found);
            }
            if (!s.params.notFound) {
                s.notFound = s.pageContainer.length > 0 ? s.pageContainer.find('.searchbar-not-found') : $('.searchbar-not-found');
            }
            else {
                s.notFound = $(s.params.notFound);
            }
        
            
        
            // Diacritics
            var defaultDiacriticsRemovalap = [
                {base:'A', letters:'\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'},
                {base:'AA',letters:'\uA732'},
                {base:'AE',letters:'\u00C6\u01FC\u01E2'},
                {base:'AO',letters:'\uA734'},
                {base:'AU',letters:'\uA736'},
                {base:'AV',letters:'\uA738\uA73A'},
                {base:'AY',letters:'\uA73C'},
                {base:'B', letters:'\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181'},
                {base:'C', letters:'\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E'},
                {base:'D', letters:'\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779'},
                {base:'DZ',letters:'\u01F1\u01C4'},
                {base:'Dz',letters:'\u01F2\u01C5'},
                {base:'E', letters:'\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E'},
                {base:'F', letters:'\u0046\u24BB\uFF26\u1E1E\u0191\uA77B'},
                {base:'G', letters:'\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E'},
                {base:'H', letters:'\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'},
                {base:'I', letters:'\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'},
                {base:'J', letters:'\u004A\u24BF\uFF2A\u0134\u0248'},
                {base:'K', letters:'\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'},
                {base:'L', letters:'\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'},
                {base:'LJ',letters:'\u01C7'},
                {base:'Lj',letters:'\u01C8'},
                {base:'M', letters:'\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C'},
                {base:'N', letters:'\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4'},
                {base:'NJ',letters:'\u01CA'},
                {base:'Nj',letters:'\u01CB'},
                {base:'O', letters:'\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C'},
                {base:'OI',letters:'\u01A2'},
                {base:'OO',letters:'\uA74E'},
                {base:'OU',letters:'\u0222'},
                {base:'OE',letters:'\u008C\u0152'},
                {base:'oe',letters:'\u009C\u0153'},
                {base:'P', letters:'\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'},
                {base:'Q', letters:'\u0051\u24C6\uFF31\uA756\uA758\u024A'},
                {base:'R', letters:'\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'},
                {base:'S', letters:'\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'},
                {base:'T', letters:'\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'},
                {base:'TZ',letters:'\uA728'},
                {base:'U', letters:'\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'},
                {base:'V', letters:'\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'},
                {base:'VY',letters:'\uA760'},
                {base:'W', letters:'\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'},
                {base:'X', letters:'\u0058\u24CD\uFF38\u1E8A\u1E8C'},
                {base:'Y', letters:'\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'},
                {base:'Z', letters:'\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'},
                {base:'a', letters:'\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250'},
                {base:'aa',letters:'\uA733'},
                {base:'ae',letters:'\u00E6\u01FD\u01E3'},
                {base:'ao',letters:'\uA735'},
                {base:'au',letters:'\uA737'},
                {base:'av',letters:'\uA739\uA73B'},
                {base:'ay',letters:'\uA73D'},
                {base:'b', letters:'\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253'},
                {base:'c', letters:'\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184'},
                {base:'d', letters:'\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A'},
                {base:'dz',letters:'\u01F3\u01C6'},
                {base:'e', letters:'\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD'},
                {base:'f', letters:'\u0066\u24D5\uFF46\u1E1F\u0192\uA77C'},
                {base:'g', letters:'\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F'},
                {base:'h', letters:'\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'},
                {base:'hv',letters:'\u0195'},
                {base:'i', letters:'\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'},
                {base:'j', letters:'\u006A\u24D9\uFF4A\u0135\u01F0\u0249'},
                {base:'k', letters:'\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'},
                {base:'l', letters:'\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747'},
                {base:'lj',letters:'\u01C9'},
                {base:'m', letters:'\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'},
                {base:'n', letters:'\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5'},
                {base:'nj',letters:'\u01CC'},
                {base:'o', letters:'\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275'},
                {base:'oi',letters:'\u01A3'},
                {base:'ou',letters:'\u0223'},
                {base:'oo',letters:'\uA74F'},
                {base:'p',letters:'\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755'},
                {base:'q',letters:'\u0071\u24E0\uFF51\u024B\uA757\uA759'},
                {base:'r',letters:'\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'},
                {base:'s',letters:'\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B'},
                {base:'t',letters:'\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'},
                {base:'tz',letters:'\uA729'},
                {base:'u',letters: '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'},
                {base:'v',letters:'\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'},
                {base:'vy',letters:'\uA761'},
                {base:'w',letters:'\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'},
                {base:'x',letters:'\u0078\u24E7\uFF58\u1E8B\u1E8D'},
                {base:'y',letters:'\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF'},
                {base:'z',letters:'\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'}
            ];
        
            var diacriticsMap = {};
            for (var i=0; i < defaultDiacriticsRemovalap.length; i++){
                var letters = defaultDiacriticsRemovalap[i].letters;
                for (var j=0; j < letters.length ; j++){
                    diacriticsMap[letters[j]] = defaultDiacriticsRemovalap[i].base;
                }
            }
        
            function removeDiacritics (str) {
                return str.replace(/[^\u0000-\u007E]/g, function(a){ 
                   return diacriticsMap[a] || a; 
                });
            }
        
            // Set Cancel button
            var cancelMarginProp = app.rtl ? 'margin-left' : 'margin-right';
            var cancelButtonHasMargin = false;
            s.setCancelButtonMargin = function () {
                s.cancelButton.transition(0).show();
                s.cancelButton.css(cancelMarginProp, -s.cancelButton[0].offsetWidth + 'px');
                var clientLeft = s.cancelButton[0].clientLeft;
                s.cancelButton.transition('');
                cancelButtonHasMargin = true;
            };
        
            // Trigger
            s.triggerEvent = function (eventName, callbackName, eventData) {
                s.container.trigger(eventName, eventData);
                if (s.searchList.length > 0) s.searchList.trigger(eventName, eventData);
                if (callbackName && s.params[callbackName]) s.params[callbackName](s, eventData);
            };
        
            // Enable/disalbe
            s.enable = function () {
                function _enable() {
                    if ((s.searchList.length || s.params.customSearch) && !s.container.hasClass('searchbar-active')) s.overlay.addClass('searchbar-overlay-active');
                    s.container.addClass('searchbar-active');
                    if (s.cancelButton.length > 0 && !s.material) {
                        if (!cancelButtonHasMargin) {
                            s.setCancelButtonMargin();
                        }
                        s.cancelButton.css(cancelMarginProp, '0px');
                    }
                    s.triggerEvent('enableSearch', 'onEnable');
                    s.active = true;
                }
                if (app.device.ios && !app.params.material) {
                    setTimeout(function () {
                        _enable();
                    }, 400);
                }
                else {
                    _enable();
                }
            };
        
            s.disable = function () {
                s.input.val('').trigger('change');
                s.container.removeClass('searchbar-active searchbar-not-empty');
                if (s.cancelButton.length > 0 && !s.material) s.cancelButton.css(cancelMarginProp, -s.cancelButton[0].offsetWidth + 'px');
                
                if (s.searchList.length || s.params.customSearch) s.overlay.removeClass('searchbar-overlay-active');
                function _disable() {
                    s.input.blur();
                    s.triggerEvent('disableSearch', 'onDisable');
                    s.active = false;
                }
                if (app.device.ios) {
                    setTimeout(function () {
                        _disable();
                    }, 400);
                }
                else {
                    _disable();
                }
            };
        
            // Clear
            s.clear = function (e) {
                if (!s.query && e && $(e.target).hasClass('searchbar-clear')) {
                    s.disable();
                    return;
                }
                s.input.val('').trigger('change').focus();
                s.triggerEvent('clearSearch', 'onClear');
            };
        
            // Search
            s.handleInput = function () {
                setTimeout(function () {
                    var value = s.input.val().trim();
                    if ((s.searchList.length > 0 || s.params.customSearch) && (s.params.searchIn || s.isVirtualList)) s.search(value, true);
                }, 0);
            };
        
            var previousQuery = '';
            var virtualList;
            s.search = function (query, internal) {
                if (query.trim() === previousQuery) return;
                previousQuery = query.trim();
        
                if (!internal) {
                    if (!s.active) {
                        s.enable();
                    }
                    if (!internal) {
                        s.input.val(query);
                    }
                }
                s.query = s.value = query;
                // Add active/inactive classes on overlay
                if (query.length === 0) {
                    s.container.removeClass('searchbar-not-empty');
                    if (s.searchList.length && s.container.hasClass('searchbar-active')) s.overlay.addClass('searchbar-overlay-active');
                }
                else {
                    s.container.addClass('searchbar-not-empty');
                    if (s.searchList.length && s.container.hasClass('searchbar-active')) s.overlay.removeClass('searchbar-overlay-active');
                }
        
          ‹abst          è     Æä                asrt              )   Fafrt      è                 p   )     ©€  d                    KskipserverIp=23.65.124.12 now=0000000000.0000 duration=0000000005.9900  ­mdat  2Š    ¯ Vå     ‰2Š    ¯!
“À  TYélt(¹B´3z	P¬kBÄ)¢‰‹·fÛ´”Iã,Ï°±Ì8•Ñ»×œD˜'[²Æ«-aN•BHMŞ1 †á^ ÅQ¦pÅç“#K*ÎtŸ>ü;¯{_K‹b¬k^ |h¢¹¤¾™š Œ¡CÜ¹Ğ¸Ô aÕ÷]ÄÒæzˆ+šwjÈAb÷J5-úYæYOÓÉÆSFªM–ó`%ŒÖ´yƒ*U¶êñUknş(¦ÄèDS‰>@Ğ‚Ô­ì¦µA˜¤\©	esŠ™tÖ%R”îéÆÃºæp(>yÆÅLcü>ŒWR‘sBbÍR·ï?ÍùH=6c´„FæÇ‘Íı?5œ¡‡Şıbúæf7å"LpÓ[ü¾´
¹´Ş+=@ù"íúÍ§5iİ¹\–‡š©å«®c0í+YMû£`IåÌşÕYTnÒüqÒ~iY5
j1Êš£µ`N)Ş{Ìµ"°¼ŠÀƒ”éE{ÀEÒ0#÷¦‡X‰€Ö´.p  ” …2¡    ¯!’€`  U[0&`7®	§56Î²Qt‹º^¾µ6»jÍ©RÆs–w-BY‘RAuXéXK¶;ÜÚ³—ølßö™šzö^†”¹=áuÔl[x\æ3mrC'óÄ:†–¼!¤óÌajiM*îÁ
q _~§}èòòá¨Š_‹ºò—ˆGKÅ	1B²pÛ×D§h]Â¹œ·6–ÔÙÈ³”®F¸mE-º×³Mii©ã÷^“œö&ŠU–È\tºvä¬$©eo™„¡ºŠs0ˆ.&sÄÓJ®rÒ Uâ€^òHÑT»(IÊl;ÜÔ|¹¦\x°Ôñ_´\ÆWWª.?fÈ´õÚš·‹Å’8ŞÓ²€‘¢˜î( åª°^”¥sj#†IÖw#x%š0<•ûgB‘ÒÂßÿ<¾›br¬Î&ì¼Ÿkz-–Q«`ŒhªyÛoÂÚ¸-”ıQDSç¶ëÅ%ÖKdBoÒ}!}ÚêIJ«)B5Ÿ   2¸    ¯!
²€0 ‚RÚ ¬Ä ´<y2"–”Â†'@>¹S·Šã?©Lê8Õ¶4SeŒÈùA”cL†ô¿ÌavhcJ;bq€œ“Ób™G‹ŒÙw¶ò¤ÊEä[µxú¯é+¬ùwü÷l€ÇwJÆ[ß¨Ùˆß ”i¶ø¶©òs€–æùZÍl£Fò¡´ÏrYıˆV´Ş}Õ¸çŠ¿›Óe&âøvuµ*H$dO!$äLxd–Ù÷Éu˜â¥ŸJ 6\6¥Xc+Ú‘ M:£BÅ®Œ¼k›ÌYfAVÙDEšA3VWºp÷yÎûÅ'dÑšuñö‡ä;=ÁB£ˆL€,Q¬š,Æ¾ÂÀvF~„HXòé­or–›ÒæLZ¹õ¢MÄ+§ğê¤j¾#ZíĞ{
3`O•ÚT¿{Á—MÚfÈIĞÏÖn¸bÍº}ußcÁ~Oà=µ ·ÕBTÚ£Ìg¦İîız´PÕŒFy|•ÕĞ¦¢â¢°´ujWfjO€  ˜ ‘2Ï    ¯!+²„àVÛ l¤@­wĞ 
„*¨Œ:-÷ßQ$vH$§–ıãşı“`ÔÆHäÆó´¤	xFœy5Éh†(v·KD4ÂĞæÎ$Õ=zôáuù³ì}ùf³ÍeŸVoç†g§ü»9Øíu¹¯«®j¶e¶·=At´§Öx|û|ê³±ÿK\(Pƒ¾d8m:ïıÔÀv:.ŠTÁ¸š–65n8»Õj—9T(qbDÙ"°ÎŒìµ(à¬Døˆ´¿9ÆÉ‡9]~C‚ú)bˆU;B¬xŸ 8¥aEk‚±ĞÄ1a–…TªIQµ)kB'½¤úu­¶X˜>‹É[¡Á•,¹•Œ¤ëD®’åh'?óKx“İC¶ˆÙté +yKe[İiĞI®ŒÂDí¯±~˜Jd²w6áçÁÖÃKÍö¾"CAçÍdkFw›_3ì…0°§ugzËÙôÑ>Jb¢LÏ½å²3^§§şË€#Jú·4ä$.X‰r«ÇC¶tÕÊ(F¨™›×şôšdu„N  œ $2ç    ¯!M‡OZh”HmÈª±ˆ·™¢ )Ş›Õ©PÛ®ZwfwôÄd¤£U|ËİXŸ@Uä4m#kÃ½äi‚§#ŞèÀ«(¼Š¯ÖÃÎË¯»óW^FC_¾e^ğ¼JÇûCµoŒ“ˆÓ§l‚«ªZÖJ/‘a`Æ ?—ñ°ânvøØ…md›	òôIŠCĞ€«´(™”)ÄI¹€7é2$^¤OğaÔ»°ZdÉêĞ£6«’(Íø’ı‚4[÷€Ú	ğ2GÜw~dŞvP·¾jšó÷{aP.xÚH£C±sØJ´FYñÂU¸¹+ã@µKKX,£ßnQÔÊõ‹œ’EŞyu\%e™aüî=‡ºhyé¯"v"!€à§BÚ#h)²`4b¡„Å	&qB°®oP-ïwEÕäSqÃ¸T­snaQfÿ{sÿ³—zJ
€/¶ñjÚøòte¿†y„Å7m¼ gÑ<ş Å…€*¤¡¢w€Y¢cü×}ÇÍã¯#¾:–ê"¹æpÂfí™¤7ôóı6›¡¯V-Om•‡M¬ÂQ}7)Ğ´4íï&-P©Wäè9W­æ:YÎ±Ñ<T*ûœJ9+íî™å8ÕèÑÑJÓ0iŸ¬s¸STğ†,|vŒ¡',ë-2†déñÁË×™		ËÛyÔtIÀV›ƒ†{|ÅâñúÈlp  / 2ş    ¯!MÉSY"i¢`6¢3VËTc.%I,Ê[5ë oJŠ<ymj…²æ r×€Ø}ÙÙÁÂªN†¿Z”­ı!nª ’Ù[-–ŸNŞœdz‹ñ’R~953J´2…ÛŠµ¢MŒøhS%&Ò·–¯æßµøËÕ:ëc’º«}Óª2,´Ï¡t¹®eGX¬Ç*Qºü§ø¢şâ"âgƒ¸f·ŸÀ„ZNÚ¨ÏœU±È\qÆ±-³Å<Å”'0÷õÀ‹›U=HÍÚó¶8ÄY¦I%DhEcË™r+n4Š3A2§­\¹rš¯*Âj˜°*Û-|I[<ûóºè¦ú(“eCÉÎ	¨úñ3ìL¨+•á^üu(Èœd^ĞQõ¿-2·é{
ÌĞ’”‰1@c"(’QÆ\VM®¬ ‰¹+½¼P@#"{3•KõÒ%Âëj•óùÛÖ¾9×ÌKÅi¡UW)	ğ%XóbÔ7TWšj”š£t¯³²E‰á¸ZÉÛU€œËÄª¬¹zÎ<Áñ¸˜5@î)W-}éãµ£@f$/¸ˆLU~,›ïÆa%­tö?ÓYoOE{´ĞšÎ¾ƒ%Õd¾†Så„Ä­+)Kb–4öC¿÷ºúÖÍ|Ásù+;–Ê€c·öõ4qU8ö	Ë!œåÙf]m½	¬X\ëãg¿‘KÁ_íMuåë­ÖíRÀ8  $ “3    ¯!{¢  å UZ¨ŒÄ(´ái•t¬fu½+…I,å@ïÿy' 2ù‚É‰ü*Asg~±µõ³^H”=lğœ•&Î^ğMmBMÓÂêóUu/58a.cÄšÊkyõw=WSŒIGqÊMD·óu›ms'œÊW	Úˆ²ÖY°DwÜßÜ~ßqãE9¡º4j‰šÔÜç+eGÎ¡l¨Õë”8©|-zótš}§1—Á%Ù^”ç3‘^÷h@v˜K/jÂÄì„U¤ò˜I‰¾Ô©4¯
[l#A²²ôÏ
©J(…-x›¹ÍD‹[½¿ÒoöõÒJIc	çckª¯¬-³Û›õ>»‡Ã.YdÁuN¾Ë.Ñ îh¸ÛÍMÅİ/,YXÜyw ïhğäÕŞ¶ÊK áçG¼wJá¿3·:	ó¬QQ„L¢
"V‚’H¥è¨g~Ps-6&sIa{¶âûd”¯¾¨· Ë*Êíè8`¤à$ÈWšGtgeg+Ï²³ó‹œÁ›/À   3,    ¯!  ÈU[Yhr ¤Õ÷m/¬®öo‚Lºˆ— u’8¦R³×FNxk³V»Ğm”•N`Ø½„£Šêí2ìÅ9d…‡ÚOæóGjRÔXÙa4°qğÍ#Oß¬òÆ´Â¼_u5bñhÑz›İÕz0£	˜ÎNÍïd˜fİÅ6Ì/ı_f«Ç‰k^«áL†ßtşvğÒxHJïWÃgD…YD	 Ñôøï3j8¡š #ŒÆ£ºH"­Ş4¨åïãhÜ©YA¤©DW™^LHÁ½Úâ”Ö¸,È‚…Ù©\ó—UU¬®”¢PÒj`fÍ2¡Ó‡©óÔÇQÀæ'6nMSdoÏĞêî÷~eÄiO×3hıÜ{›6öSÚp;g¿f™€wë¹å´j¥ ÂîyQsÈ$–HÏ‘bµÜ’^ÎGTÜeÑÓı•¤‰¢™[(¿­»”R+h¼÷Ë£¯¯Œ“-e¥zš¨ıŒ‘MUùi ¿šäjáU Q5HCX·„à¥¯+Ú¨  › 3C    ¯!   TÛ™ˆArhUtá0+A˜”h¹òA`ü</‹ŸĞÖ½tR»°½&è_a„Ø9§rÆqXÃÊ´g7Eá«,+œ&*C*mšEš^SÒè‚J‰|ôL<Ã”Òjœ“ cÄo$‚Q0<;•Æ”°‚©Ò˜¥C+Ø\”"²¯ª%3Ú/¾¼NC¹÷Á¨¢ƒ+q¬ax1ÎğçXQˆ†ëêÀ)á¿"ş…ÄĞ¦kÙÓ#¦Öˆ‚yè%$QÇ€ª‹ğ{»×ÆZ»lŠ†7§K§Wº@1J‹‹¤CÜÆwÆªš)aÈéõİ:	£ªTº¡nÏÚÏèœÍ·]h8ïWf$_Ñ4`b”ÛÌÍ†éê¶¯	–Qğoó«Só8Çèv…J:Ò†V´È¥[L´i¤£p·l
“(¹´dzwÆÔ‚ƒáTŸ¾×¾hÚxZ7ËBò „® ÃŸ®º–×Iº¨‰tW…Ö¶\9;U³Í¥…îpÜÑ^jFÃ€  Œ f3[    ¯!   S[˜èBÀ=•-;6Ä	[%¬’è'ÄşV×,÷
T˜¹¯´7€®÷sıÛê1¾%¹©ÑI¯‰o$êQŠe†M³µûw¼¶>Æ‡üÈÍ‹<.…Û]Hëd…§áFOË·![I Y9…iOè(Lò…*œôAû7Êd!Ş[zUÏ’LQç+JÆ†xr•Ê¯’‰&Û:[²ó¡8Zrª®EË„n¾«W´A"ì½xLš$Ze©	JÖ(l”{Œƒ‚W.8s³ ¼¦ ^¢m}ŸXäNÀ±Ãşş'Oßş±ã¶–Étz—üÚš±ÉxEÛ±ûœ¡–“(7RÙÃ ² ¸t5ï|,Ë*‰¶,ÙOŠ­üÍr3âô#¾HÓÉLûcé{T¼¡¢E<ŸğR«ey^ëà¢‘-8]q;ZÕâ
…‘nDcrJDåÊÍ¤—¶V{§®ä\išì4JÄT˜à  q p3r    ¯!+5Š˜ÊB‹Ë–ÓvfR¨&–.`T±ÛE%×YŸÆ•úŸZç–v•áÁÇzw|ÉÆ*6ß‘“YÁ6²Æ-“öz4ËzMZí
©µŠëg™d{ÖaÔÁi ²c6 {l¸ÒĞÌ±)C¬ı
UÙ³‘ñ'å€éD÷Rof!´,mŒ]5ZèÂ_K; ÆWFÍí"ñUÓ}+XÃU­zœ-—›òRĞõyúÀ^Pº%¶ß2)b2P•cjÈUMmd¡F'\ƒ%åÕ0XÒ@pô\seÕ|Ñ1õç[µ±¤P%¦9z#Áó?äµ¤1W@ÖÖœ°Òé›t$~^Ğ‘iß[æl+‰ªàÍÂx0K¯óx)˜\[ñM@<ˆtúsŞG0¼ƒ= ïĞD´Ö†ä®‰‹¤˜rıã%0(C¹d.î’WƒBñiÃ’s«.ıºŞú‘u…·6´ ¢u¾9øe—yslK¨Š„£p  { 3‰    ¯!MåMÙ©	™»mÈª­ˆ¶Ø˜T+mõ]ğLöbk¶¶±YGCı/LIïÿRÜğ„dL´Ê;ÅÌvrË¼Àd$QÆÊ®t†N™åc8ß2F2ÃV]®í ¥©sË¼ÈáXûÛîÂĞ€¸SZ¾¹uš‰‰Š‹Ô§g¤¢ì_y¨€ B İ{Âv{{ü¦ v„ÿ û>ô¢â90dè§‹ÄÊ¥§S8£sWø„°2	J±¥°ïdÔ°	ÅaË ö:ü8a;^Ô±ŒC(ùçy*'VVùAc±.ÊzÒÔ–ûè3ÃEÎH`æt×%ä”Ó;œ3Já‘W…vË->KbƒÉnKjº^¢!?Ü3"® Õ6PYœŠ”]Fi¦Ø˜³U£(¤<â•L^şŸ-¤ÈAj*Òæ*Ô2€.<]N;/ƒx'¶–Í&U ;= ÂfÛ‚`‰NZã	D¿™8ÔPHÏ>}Û<Ø75aG ´aæyAD ,z%’$öÒ–OÄäÏÿ[‡ô˜·c,}w½ ë+y»iî@:ÑÊßùO
«¥ùş…¤(÷U#›GlS0VxÎCxqÔ +&G <Ç…5Â’çË)òˆÊüÔqN½^ş§|ƒ³L–K¶HV·b)l˜Lm‘Wå„e	KÆğBâ6ç9ªŒ  # 3     ¯!{‚@ÀP VX©¬”@°—)2{V69å|«/"‘°kîÀÇÉ§íŸä×u¢ıãVÖë²tšÃöOÏqy¼‡0ÿLÖ¼ş-µ+íNGKwÿ©&—‹Ëk@êuÅ¢é¯Ííyª¾ÆºôŠ±„–|ä‹ñ,7¯¼k"‰a7ñER·¼oQ¦£EæE¡g…–6ó‹¯gsntûZ"ïí›0L[ªa>ô¡FÚ¤Äú90J£%-_qmEãT ¢Qº¿@O, ­É¡e¥ˆYRõvš3%!@‹qJÔ¨xª—æ¨¡BôZ¥Z;xØ{±x0eÇnUIpØ‡D&¤Ë{{¡5î= ŒÙ¤UVz%İÅÕ+ =Yp0Ÿ¶‹:Ù­‚¤¬¦„’øµbVi™ÚøÍi¬$jíZk’q’Cû·	ÄwàñdÚì’QvéÊ´hñc.¢M{Í?g¬O“mWdÇÈ^ñ–H®YL*`«#!—!:Àš±TôÕ\’FÎÉ:§DæK€  › •3¸    ¯!ˆ!°7ĞV[ ö ZG˜ŠÕx•*ÔñæÊªU6Zø^`Ş~GÖ´!pô™ëµc[×<KU©Á °
;fÏƒñğÀzáˆÁ‰x4çÒ…hÄ£|*’ØiNÀL$HõŠ¤alÏB»Ÿ)G)¾øLã¨é4§r â·}´aœyÅv´„^-wbŒ³›* £†@—°@4^•‰
òÁÌ”Xá ĞêÀL—	Ñ‹)«kÏnICÆšñ˜ÂEur" ×÷‚ğ )‘·ÔRaVSºq»¶›ÅS©µÁ(
&%Âë‹İn™eXS\j‚_ë¸NÓ…+»&?â·ÏÇC«¶²ÔõByïèke½g§×Û{¯z…„ÈÎ¥Hø\ªXWpğïw[©a[j-¸×~NPåaÈ KE`%¤±ªN¶X‰éÙ¢Œ‚õàêW¶n@Tš3ÙZ_cÔgiÅÀO\ BÜ vÓ'~Èl×%†¯Â^½~¯¯‚¤‹ÁV3•¬ÕÖjJ¸VÃ"iNä—¤x    3Ï    ¯! ä=€TÚhŒX#¥š8›–İøDª%˜Å‹ÕË¼:”~Š÷DoQq‘1¸7êİ.Ÿ²o¾meFŒÂ0iT=1“Ó³0‘"›¤÷x]¢«Z‘$®°T£^ÏÒ8	ö=Á‚#šãR‰ >n„å.VŒ]²ø$Kû_ÈÿÃ—|˜{ZÙºËØ¸ÉœcÁaT<â½|¦MrÊ…: oÎr©áyZ§šNlYÀW ‰ˆ­ÌC„)"ñ(š&ÁE}ê‘p±MqÕLèéD…h!J»1‡!b¡L #@ãQeHÛa[à¥Q¹  {Ã£ôp$Vı3w¤ÿÙ«v}jŒÌ÷­‘ï×MÛŞ±>JhTõ'ÅY‡pÊ=%Ë:&¾ßf…EÖTuŠÀN„t(ÀCI3œÅ¸':¤Î˜€ßü;°¾Är›Ü¦$}¨pÂì~íÿ*óüºV7\‰Î\FòQ$vÙÁ³³ä´şèãK[ÀÊ¼í ®Y¬ºpÕˆˆ7ãbêó¡œ  ™ •3æ    ¯!© ôÀVÛ˜&2D,N’2¾nªM÷uÕĞ¦*©ÅÀc|A–ªÏÑ¼¦;H/p­@û(VÙº_)W¾´+m$xÈM*ğ½áô9Je~Œï2¡©ër]A:ïÕòEr=®Sˆ]ßşöÂ)©x5Ğ‹Óÿ™„¢¾K&ÀÔãBŠyû@ /ƒ€B·LîÓ9Ì@g€Âj›–.)àúşèPk*¯[˜ñÚİzûƒWß©Tº­'2¶i¤I6çœR°Ç¡=pœ¦UK¢Ed®+t-qR“ª¤Ë!Wg£1\L"‚ÁB€P" ø¾ÁL™EJgÔ•a’NeÖŸN‚Ø¿^Œhúk‰¥c3ãye~ÀAnÑXfh‘·y(â¶¯_«^¥ÀWìW–3§ü~k-¾ûqpÆ[Î®~´ëAÚüZ^[û?;js®¨Wö¤E(9 »~« /k½ R7İ¶.Æı€Çâ}²•"‹Â×uĞ_$ÉAS1h'CJ	 œ(9j£=ö T0ÊlI%'”æ    š3ı    ¯!ğyœTYèĞw!!@ŠE¼}Ì½xõºkÚ²1FRîOpÍøTƒ\‚Xlrwø{Ly)(ğ6 >”äÉÉÎ‘h²9ˆäúp'KˆÒß{}ÔR«&ˆc78-¡¤Ş'”“_ÆájF6çÁSUÕ÷ğËá®ŠÛ_®¥²‹k‹šós ,xÊa¹$#¾´©¡¥^*€3¤X¥£bÔ¨E¥UD@X.¸ähD˜PegŒf:‹Ë1%¾7kJÚ¬j,Öï-‚®·¾2§J¢´>ìÑ£÷)»p,ùö…H¥FÙ€*k4L „"SYœG…ŒeÕPIÁ`YÕ1¼¦òV9šóûÑ·ÏèQoú@„1˜;¼ñ‰,Ğ¬Ë^Ö\RxÌèß>¾ƒxA#Çõ€"\t×¤µàTººO^©*›İÒõ\Ã(ù-q¸@(39uŞÆvPS¡ç/ ÀÄ‚É¯ËÂ$eR+Uu@4|‰è‡{ü¿	tÅŒİ«%9%AEî t‹eeÓŠ‚Î  ¥ ‹4    ¯!˜	°p6ÕYèìÔ¹ù’îµN÷yªìãTeLªÔ KÔ4İZõ±8iÊ½®™ö>u¢…âv‡Ô>GTÂç
SiØĞbò¼…M"µ¬Sçt‰)”ÔL³/=/n 0'¾VEPÊ¨¦Ó¯°±šË±HîÆEÉˆV· ¿t!7*UPÖÛêG‡;¨®¼stÆF -¾}Ë@¥‡U+ÊÿÕ˜şŸä>”Ã»&/Û²V«Ë&	ÿ…\YéÃ’VNVîå­T"İ“½Lz‰³^CµÛà‡æ „¢…J«Eš0fbLÊ7ÓveUåQz4X@”S®ŸkHğRyşgÍ†ƒ{ï>³óò§­Vó|e™öèÛ=ÛŞ¡¦NZj®Ï>­¢ U% „M^H@•äÊj‚Cd&Ÿ¨DÅ»è¬­ÀÚv1‘k‡#J&Gylt®J×œànœ±TûÁDÄHĞ°ç³íä³§ÚÛ†»`áÒéÒüÕBéX¡Z¯¨e	ŠA¦Çù²§k‚t½H€Mn  – „4,    ¯!Ä  `0UZ¨¬¤(¸´wğÓ›ÙXÂåÖæátŠN ÿzsG»ã{nvœË|èmûm-*®ìâ_ueœe¶Ô}x?'•I6Í‡ *™a^Ñ2ˆé3,%Çä` ÜåV˜­9}´Ìo\´Á	¬ÕH•DA8a0íi„µô=^÷¼ûØ=,9PM‡St¬¦¯…£r˜hÉ$·l4ãXÕ¤æÁà×Ùj)d-uˆ‘µ¤8‡"ø‹U—©–&$ë,W&ÂeEªŠÄB1FK‰q”v­qLÀĞ@zJŞ¦R%cUK Òı»ÿ
i]n’ú[ú=ƒ÷vg’¿‹WÁU…ÆàØM|*`£^lM;¦i••øMä°\<Á‰s€ëú`»#,×Vn¨®‰äÌƒX’Üî	KL¨Ö;%.¡qWV–IZXÌ(÷NØoy&:XU{ÜœŒŒ7)"˜rÉÅøö+q,ÃP¯‹É5ò‚5‚P¿~	‡ñA€   Š4C    ¯!Œ0°RZ©t ¼hÛ9ˆ/u0hiÀè>]îÆ>sğÎ± ÈòDhšÆéåİù²¼OvŒØ5KŞ¯ƒ`õv33)‡ZèKh[›° cYDóg¯•±@Vöék¬»g¦İ–?ËºÊŞRçc’
Ö±İ×KSnNX]›°U¬Ãá
×Áô*ô|;ü?ÎcéØW=nø“–K¶„çšÚ;<úiiX¥sî²–3^øi™°Ò¶Ù"½ xŠMzó¦»Å[Br#MÆD
 BSŒÑw&«q% k.µV°2}•C!ON,»µ~ÚÜÙo‹ë¼£<÷®:ÒÃ¤‰6³ñc¦‘÷ãÊÛ%j‹µ€¹DªójKÕß8ª·)$:äÑJt_İˆ«ËÀ#·Ÿó^Ğ£¤á“ş7[uÿ¢µ%äÖ›êihèèã¸ ²O>ù¯t”"†Z9/€éhˆHq‚5Í–LµK^¼Åğ£JN¨RŠ&ª€ by8  • ‘4Z    ¯!  pPÚ¨Ì²8¨‡92êÔP*f€ä¥rÜ"'ğáÓÉ_OŞ_n–¿8’a´å©¦ıÆøö% õ]¸4ôOÕ0ÉW¤:ß32ºğ%ÈF`İ[tÔ¾Ì¸×ßV{4ù©ï¨°ì bÑ‰lˆV›8+í‡V®ëË°¬+©…¨Eibİ{Šw>WAŠg‡ë)Ã¤ò2Ô´÷õÏ,eÀv	/£"[ùırkÂ»B7U½”¢õJdè„•µ€²IT /?Â$İêRÛ(Œ”F€ÄE´fhœ©B.¹Œ	è¿g%¾àØ|&—â™‰·¬qFT êZ³%î¸u4xâÏŒÇ¯z7Ÿ	ÃK0fã2G]úM×©÷1qóÖv5Ñ]O²“>:³ûÖâ,™‹ÿİÕw[ay>¢<4„•KÇ§]w“Øİu½ÍGqÕõb´Ó=}T¹q€¯!W ×W;oÊX5-–	.|˜Æ^ô²ş yÁd¡?Œ¹JxÍ•¡` ¹Ip¼—Ç"Ö¤jà  œ Š4q    ¯!  pPÙil´¸§2Š™k¬)‚ Òà«É¾¶MÎ/ƒ Á¤]ûr¾÷K^GÉ@p6ëİCès}C¢€Â\»ã¹1	^ÌGÂ‹*c.«‹_ß>rÛ”Ùd2äknö–úçL|¼sÚtËÏËE€–X{;:¥>3-5Èİó°““¶
ƒª Ÿaª"G_.sÈë¾(c¾‡3çğN¹ù×†%iâé.¢r¶¦®×Ú¶;]kMUo`ãéjÅ“¶úÙîZ’ -$Âœ ¥¨NDQ)
;M˜ƒ	@BQ­œUÔ†LëEå/T°2ª«õ£\XlÇóän ¹5}ë£Mÿ¾ˆ‹«dJª]9êÓ¨±VsãÅ$EÅN¶Ñİ·(·¿¾98g“b3ÓæHé™l›±Áo—²¹%’~£ñèK%ò,’0f¤ó (Q†Y®–&
ÓX‰	ó¡õ¬Äª…ã‘1R«j‘³M«AQøöùÉS…W°¤Ó&¦ÚX 8  • 4ˆ    ¯!¬pô SZ©´°ôAme)´¥(‹œÎ tk8Æï(ì+º–:¢¾`Óºî™-$¿ôqÄ[Ììndğµ+\ääã Ô9Ñå:¼ÆMvöeµÚ³/mõçÃŸ‡mH÷p@·ÃÃ®œû;*,§êÀ¬Í$Õ5)ÉÚpjdıY[}¨¯w#•XÈcÁ¤ºrìš\Õs”eYm™üŸbvKşÃÁ‹jã*P `£–vç)ÁĞ:]YX/Ç×õä÷ñ´¨![R¶•—ı@`‘xµ-€ş:‚šÙe B2VqwR¼TïV¥0UG ›ª˜ïr¨?â‰_.Û÷Gõ«Zh÷5Fà€ÍSbè"§Îe¸ˆcY$KD.~][ï«ËÌnõxh‘ ï®õ&­*õ„‚†‡Ã0İG¡&ÄP¯¶2©Õ®HßuÒé\@Rggl-šU>ËdÛ4‚±œ-şÏÚ(/$Ã5!bõıyLÿ	€ˆ·Oäß·‚ª S…¨h   ›  4     ¯!çğ   WÛ™HRV×[Î
ËfP–ñÕå*¡94K4¶©Îµç{.+6H­k2óop÷Ÿæ©åÏU:ãò}V–#J·,‘`Òj¹ªäÂá|µvi°®±G!~P¶-ÑL³â).nî@óĞ}SÒ²Ë%öxı|çQğĞ-Bªx€	ö8ø=…M€–'ÓåÂ>¯…«2ôc	UE€øâ£fÃËPgw^PŸób,¡˜ë1Á †¨‘,«‘ÛIS¦g_|…¢FrâX»/3GS²ÏÁQhƒYHYÁ6W6­Á(”É„œÒÒˆ	)Îım1UùÁUg<H)7rc{]e:2¨]­ ¡Lº5–”œ½¾]ôhÍã$ùËWûvuÜ´İ”öUt×]i[ßÜU7ÙJµò…MEKšİ-õØÄlW)´õêi–ÍM	¹@¦p1†·À‹Up­¼æ'SjÃ|º‘äÚgÓ«=ê|n&,#/+¢êF¶Â•l¥çIHt5­ºáÖL&£ˆd¼ê8  « ‰4·    ¯!}ŒÌA‘.jVÈÜ-KÀP‹¦‹w=iP}ÍØZ
ƒ¹Íú3×¤»¯ğÿ£ÆIš—¼y¦ÍÑ2©«™µº·ôºéšo>°[¿’,[aË³1Æ;S~8E·W‡k)çu˜¡Ò£ÈÛº»Zÿ7ùC`§N-7@EMS’~‹Ş†ÛçOñ ‚Ôn#Ç®DÊŒÒêBéc¤Âq\{'Ó-–~M$–ÈšiÉeJÆÔlÙr*­åfá`û kX”ãƒŞ¯³ÒXèS‚šÓ‡#"²¥ª
ªa¥¢ı?ÅÕLŒAâšƒ8“ø-‡dó¬?aô–4pö>Åy,xWÚ=lÉá¶!Å+¨Ši¦Ñdï.ê,lK-–tD–zÚ
39m™§9İÛMıkœÄW œ;†c«ôızú–Ôãş¾ô/`rÚx;Ğä5RÙN­×^*jSR¥ÕãÄ[0Ğà´¢„ê¦ôµ U´/jŒárI6cb\X‡;âA."ª„ø`Úp  ” ˆ4Î    ¯!U® ÅeŞô¶;(¨UÒP†$ZE‹îëo(ö"¿èş„ğ[õ`}u˜üãªqİ5ƒFó_¶qnÂØèÜÕ~~%¿v¹ï@T_Qş=ù­ôä¯ëìqİ»Ş#©ß¼Z§7ãS'¬‰¢E«OŞss’²u/zBW‡j|ŠCø$y[%6Î]É‡%G3!ÚÚ*²NÑWÁ±’¨‚ôõR$¶xü(Ô:ÙîĞ$§˜0ÑßµĞJu8!¿Ö¨œ4k€§%W¨·2„QXHyj”©‚RìĞoÈPÙ†–rÂ •°·Z“÷[i{­­0rÄ„ÿâ«Ê?ŒX¹'—‚ÅA¢
È;¬+ìkæ¼)¤EÎ¼Ú8†~	Ğ%¯{X•nám8µÄ\w
€²ı?‹^
ÿÈ·eÇPû:3yd†c‹<XFÍvÍÑ[X0 èIĞı1’RéÂÅšìÄ)o7CgI]E’‘4¬øhcùÏ<’ÁÖpÅw°×	Pt€S€  “ |4å    ¯!U²ÉB<ÕŞİÕ¥P]©ÄÄÈª½éí·´ÏÒ+RŠßŒÃóÍ?sS>ä‹c‚f_†Æó°ú÷f´oå0•örW(‘%JñÂ7çdõî´òi­¾Û‰‹!G(½Z¼‚‘IğˆŠ¾öú47¦m«­Mv«9ïÎÔKÖº“üt qÚ³iÂ¹¾ìÆ:ø¡»’ëxp%‹0¯BñHÌÕ´Â]º5*È-…,i„ô%i”p –ª·T«l4æXÉ"ÚÓ”Ë¢ª&„¸jS˜®íç|ØX:íW#äÿ˜/:áUzoæZ_º›Ö2îa#R¹ÜSdÚÖÜGTõM&„–Q÷WCO-r®À(©oÖnÉ1ßoY^÷!+Qn´I•"È1²(;Tı¶N«+Ï»vÈ‰óé‘¦Õµ-IËÑkOG%5F,êa¢ù&²Øù;“Œ®z0Ä6`´ B¶…î§ÀDès(¼r¤š´´LÅ¸  ‡ …4ı    ¯!Ä 
  TYi,ˆŠ-ß[Ò€VX” h’›a-·|ÀÁ.ü*ú{‚÷‹ó–û/Uöu'¬}£ Ô-=¦ÖÂDVûª`céĞwÈ.s 2ÑÌ¢MÇ‘MË^¾¦Üä¸I)~*ñ•ÛQÄH×¸„Íağ@`?PLÔ‹ƒU®Î›W`5˜B£^d÷m„ÇT˜’x¨y8[áô2A ¥í)[]5JpµéG8.]t¦…-41A4pĞ.ù5òó NjÊBT–º+‚¦‚V(¡Yr)—Bˆ»KË@?AsEllkQa·*)JşJåmù%ä¯eALtŒ‹µR®­E–­`™Aê,wt)JÁÎ	fœüÍe’V4Æ;>uÕ_e»[9ØÉ@”ÍBã,'~ìPBU¼µ›«ÒV™® ™ƒi®jä|ÿÿ±V_e†&HkåkMt9"½,Š©ÈqÉCıÎó%:¢Ú§>¥cUg¡Y‹Ú®r*Zù;À8   5    ¯!Ä   UÚèŒ˜É£¿¥Â¹æÅ¨béB.Ã@ÌÂƒ> JìV:8¥U‚¡ä¬õ›5—1ë¬¥ûWbá.8	>%9ÔÙBk0]ÆQí‹«¤’.hêiÍí&¤Â,ôVhHaˆÚ‹ÏÅˆ±(áSÑ£¦#Xµó`¦Ûåİi7j­ï£,âr¼Âñ;·Â÷,œÍÉŸ	²›ÆHN¢Å×-ÖDŒïÅf3L¶JŠ¡Êà´ö:D…•\_2VvµÔºRP Mu`K`’ñà)«Æc$«ÛW	‡O/»ÑÎ×rŠ3B“Ê§zL<câKP‚Ÿ5³XÑ¬&¾Ã\¾¼_Jã³9¢¸3–só]iSYÕ¡ÂŠ"§Ú²º»=Ò%]WŠí`&—H]ÅmF†Mç6^+xå+½óÁ¸§MİvéÊŒ"ü9Ê<+2>zÏTÑµ¼™/Î ‰mñu¾B1—¼¬—”8Æ43Ls‰ì"7  Š 5+    ¯!€ " SÛY†$¸j¨ÆA³Åu*ğ/@ºy}{£VÌ¤ÀZ’xés»¸%³Õxf“¼úc1t®ª¥ÿSrÇhì­¥‹®˜ííøj›¦ú€ô%Ô×ÄHLkìÅ”{d¶M5;±Š!_^U•—ÉñÕ#Ê¾=ªÉ?e·ø*´èïMş‹àtnÑ’Â97:š‚ãÍ@W R«Q|ó>Ô³KmEkØ¬§î¥“Ÿ‘šò¢U,ïÖ‚J¿j}şø®ÈRÃÛ+,Ôõ;MĞqœ¤MºrÉ5n´Õ6ÖI \_Ëy$ğÍ *€.š¤H5D}ç`å½]NQ•u5ä˜Ë” }5ÅÔÔqµÜn•9áùwÆŸ}óÛ?WF5õ8˜”÷¢›[mÅfêâˆj~pÙ±zï½´ôtù6‚q‚Ìp/uôòZ—Â]N€(vóş®
·jÁÓRW7ß 	Kz,$¶-àvœãœ¡ –éÊÿ‘¸ĞƒT«÷ŞFÃæG¡À  Œ 5B    ¯!   VY)LXD.¥ê[r©µİ*ö÷óª ¢åPàù¡ÈÄğí“alÓ-òş¹ÿïòç¾.°cüw½6©ï?ÇÀÒª>‹ÊIÒÙ#“_–%[M B‡¨¹‘ºvÕeTér,˜ac%®°öY,ú˜‰ÇÍPpG}€³ä‹ÜŠÚÔÖµ`ë#vÁËHKˆ.¿aïvQàìÀ
ÎHéº°¤ItåËZ‚È^’NVhŠ–ø©9¯–©Ê¥!Ñ+¡Y‹Îô¥%Z– ÈCÅfi.9‡"ÆôÅ(08 0sX)ó¾<|şšÏí'êßœ´k¿(YØZœÛ@c9³¼/\Åi
J6éƒ¾ºö>Ïÿ×å=å+üxÑNSŞùÜ$-ÙDÕ÷I­ğµì¾æ÷óPÎµ\ø,ãY—+Wê8Ö¯@»Ò)G7sQ|ò«çĞŠª/[˜¦¤‘½šµÖzV³¤Ë
ì@šQ±Ø#&òQ«Éw•À’—L<ÕF«Õ.FÉ\  ¨ „5Y    ¯!€   RÙiL²(´	Î¯6£QPçwª*‘&;‚]…T¦YçÒ%î(×¾¾¾cêz»µb}»xËlËV›õz>;ôã‚8•©ilòÀg™¤šñq±Q\' ıÙN;óéà8¤Í9©¹Vü"€Rp=?º??¯ßàÍÙh£0 ¾ÎÍ’è'MƒH?š–³ìvÃIïµÀLÁ„SVÑSâR0&úW¸Ü“”^õD™ÏAZ‡š‘'”Ô›IrÕªò’S<qN¨ÔËÒ\
D¸0ÊB’©ER†ˆœ	Ã…ŠË\—€rTÕP}8½í„p
Aİ
Ò¿9$°e*V8sve51ßç§:Ş€ùp£p ÎvõSõ[ùk5-¦ZòçŠú Ebxc™5€Ún8¼Èfİ—2#£4¥èÉ&Ø e¢–›ƒ‚ â&«g¯Ñ·šğv‹èŒVTVW8XhÀFP‰*Yå˜‘VBtª¼“\ %B”ˆà   5q    ¯!€   VY)l—\ÓwÆ\À ˆÎïJa¡!© ı øyAË¨›µJ.pS0İÔGéß]m'™ùô÷årÛSÛ1u­’±½½¤Ì6š’İĞlÆ°71ßHËW¼y­ğì§bPÊe˜È‹¨Vç¤zß‹+Ôê´-!d€tÛÍ5ñ)5ö,Ü>0^uÊ¸aÌŸ®QjôÑ›•Ğçjú$t™ì:=ÖAÒvVT¾s3”œëK.1BDÕ¹M’Ç‚Æµ"²5óˆZV³3U©¬„,jİG8å[é.·ÁÎ•E.H½6Ïí[=VÕªú–ªúÕüÓÏÕx ŒÚÍ›Öº Y$€St¸	ùÔÇÑ‹8Sª‹\oò÷Üùı%ğ
/ÿœx‰‘Ø<O?Üån²ŞÆ8§+±á7S<sÿ®¥ÏÖÔñU…å³Ü²®5n[ÆAØV2à6zRóÚK…;r›Là©ÎV*ŠşÕ56"´Œª@uhÄ9Nó*½Ó´LB”TµN  › 5ˆ    ¯!À $  UY)ptÆƒ	q» 4P|ôº¥.eË°ÎQƒ/û$„BÁÚ–Tª˜SPªÅ®ßú§¶Ç¾7Õ[s‡êZöÇĞ(Á®Ö…× †c¼ö©©‚ã=&z Jk1–¥ÁU¯Xx*a‡€œ¢‰YMjÊ¾vÉˆ‚ Qe%šA|ÌæXÛç¸¼[W/›ÏÒ3ğ—dÂœEĞ¥k“FÆUÜca{=Ä×†(NŠ¢`ZPDÙ¢‹Ê•a¢êÁÁ”±–…®.äÇ µB*sjPFjjšjëM+/¸H“rÏ¿Åÿ3ğşªôgáq5ÅáVI¥1˜"ô\…Ğè®b<êkhğAy7Úd}‘Ú[‘“¢;“òÁ©£+H@Ó —}rØ$¨€€cb&o¤2™¼ïV\^Oº<ÒZn+ìŠ“ (ÑNdv·†3÷¼+EËd€R¤d3cn'y&’"ôatÔÙ2ÓºhxŠÄHB°  Œ …5Ÿ    ¯!€. XY)W
Æƒ`‹q52¯Öu“8µ~7æèÄ.JÕ(–dsAk²ËÆşu[;É+ è”¨4ËfãTjkl¨‰DÔ³ĞMR,Ë Î'”jp08‡æ+’DC)kÓh÷WBœñ"‹aé<8VLÚz¯K&Ašd(cR3G=Ú‡\~F‚ÊŠn“6~ŸÖÁ5n¥¨üTş87™WYX)¼Ù:ÈmJÅîº×Ú´]ÅÎw$MI
¤o~µá †ÍIc""à/yÍSU¡’%0`´4@d¼U¨–üú6ä‰LQ;Ö·eUû\qoï•\Cï•íø[Ñ¡RQ×D–9d²‘Öüò «ºyĞZÜÑXÆ¯zMÏÖn¯Ÿ% 8CùŸŸôtáº_FÜëÂ‰½ÜEz·ŸÏÃHc¢dø`ÒAÆ<ÓÇW}¤D‡RÌÉ8½ü:iÿ¤¤iÓI¥ˆ‚7|B7ª\e%ÂÿÖD%!¨ŞµmtÖÁ ÿúSq*€p   ‘5¶    ¯!€,S[ l‡Æƒ1
ÑUñQºªÚ8İJ­J/[Ñs3L?îé¬ş¯ño8Ù‘¬ó`këk ]œ‡Óº[ñZù/Ïzt|yà:Æ­™.&İ!Pzl(;ÅíH?Îc	N0ˆ¯ä€Ì\ÜÌÄ'áUcITÄaöx[Dëºs‹-+¥j‡®O«İë!„dm!W©gO¥I‰#±ø†‚{Ê¯*Ù©%n§Ï1òåU¸HwrïXÒQ–âAW¨_oGïØ€ªÜÇA°PB$)t¸+y­UítÂ‰r‡[« ‹8ï¤şÉÆz_ïMk—4‹‚4|ıÓhâ—¯7uËÍz>Â°zó¥*œdJf°¡$Nú¤W†"k,•W@Gg«Ût¥HS>XfÆóù¿ê¡uCXÑ"F¼Ò4Ù"&YÈy/'e;É¶¼î» xy<ÎòÔ×¥¨ïkõeEÄR-h‚Ğê¾x—¨6îÕrW;Öã´ê;x Ì½Š]*ÉÎòŒ ÛI  à  œ 5Î    ¯!š€ UY)L¤H­7©[âÌ«*u¶ªU—cM	ÅÛºÛ" >é’¨Ôiüş¨õ$÷à;GwR­ZQÜ~ Á¢JOÜnëµqûc»¿ªååŸ}[pŸzïƒ*Öy×–:±Â\k7amwX£'™tÃ©ÏH¡ÛÜ%ò©mu’åÚéîL>†y?Gãíøœ 2=f øæ=Õ˜¥c<F°ZS‘9	¦¦µ Š¿–—§	T¾,RÂƒ{!RšÖ¹	æe+©¬ÕEÏpõD‚Ì²•Vb*ƒtOR/S±RÙD3©ª§*°ÍVC^4`Å	4›‘0†kèn­nüŸ
«´™,øß“h÷‡Àÿ;i¿§¦&T­şå7‘EZL
”ÑİÒÈ2S•;Å2ªŠ*áğ¸íá}ÀA<ÚğÖ <ç°#+ UÕîæácNalIªu\ĞTÊ"D°ff!R¦ª‡÷¦hõÄ—½RÓ©éo®£(ÛŒ?×§}mª µZwéyLößZ0!lÛåAˆÌHèT„‹€ÇxÔb)•Ï¤î8  © ‹5å    ¯!šÄ S[ Œ²Z õç*Ó¶.¢9]ÖíÃavrÇ9£ŸH™9a†¶T±İ‰Ô¹Oõl+Û«ÊĞÿbÉR—YRTi™Ì€GuõPĞ@œÄ2ßRÕKbi8_ê0=o¼Q¸¥³+V¦C;ÈàÎEXÑ²$hGº×X)wÁJ•ïçQ/W}:Jêƒ±GĞˆİ/Bô‰T(ÃyY»´èIU”’ÕI;Ó˜	Úí0[ß`)è.s½F‹Şğ	R‰c¤2"ÄsÅ™£{gB‡|Bòš’.ƒjÆËw5ó¼¹Ÿ»÷ƒÍğ±¸¨Wİ¾Í‘¿ã(İjy$©Lde&¨ı»u]ÚÓI&¥ÃQTuÙ§9iğ¬ñÑ<‹ÎOÛ…NÂƒkÅ”8ÏDÑÊãZû¿}Õ]ÏµNm8b¨+­U±L³µì~Ëğx>uÊ¤pw¦êĞæí;ó¿Ò$Úá5©x„LíÑUğO& #I„ïû ã°¼’N¥N  – •5ü    ¯!’¤7°U[¡hV	RH8&¨+ºà)TÁsK=ê)ıdQ Š°Bç/Û@y)×º.îCšœƒ;´‰ÀÂœ”–âÔKpÉ`ƒveÏ99(k'@\UC)Œ˜©‚º=0„q'Î	#@g—yJ¥ÚÅxÀTnE5È•5”ÖŒÖ/qú]X†Ùİbåš>Îyë¶ƒ?ëÓóÿ—ºÂr“è½©Õ¤Š$À #C+dˆß@©¡hÓèG\ÿd“¹Ru=cŞ””kĞ¢Ğ]G*Â«Y%ËÆtB
¶-¢ÅBˆˆ" „$]ãÊ@mV60^©ÔeTÓ&õ¼+ØIº%ÿTdXÈ?âZQŞ¶êj¶õãÔHB³WN®„’ecÒ FE’Ù&&$Ï&˜Õ5§nŞĞ’Uø`œ	ægKEN‹Txw@ÛşVÎ!¢ò}–‚HÖİºZ·=
î “Oñëú§Mnu­š‹‚“ù£rÿyKD°ÊN5‹/|U†ÉBSé™u    —6    ¯!Òå8=°RÛ¡ld¬ „	)‰—UXª<:ˆ€ÔÑL*ë3»šöİ<şN\¸€”C ± ¸Õ5‘5ÁÒ.¨ı÷šëÕ«–R¬ÔÅh©Ê©ğÄjW×kvÍ0³L‚b•FïM´|ˆd–ÌfõÛBÁõz³Äøä×<ûãó¨bŒÙK&c"†¨Ô&VÈmâ±d=s(	ÛX™Ã)»à—Ü)ns ;©;5o..Ğƒ @:ùÛ#XéôV­^0•a¦îØKÔ|~òüf° yq^Ó`NÀŒ:7©§Rƒ($)MJ±BYBB»°Ø¡)M‡Eˆ
Ê'°ùkk
Œáek[­Ü8[°š~K®ôÊ™Ä^!}¼Ô'ˆS‹u¸jù…ì*ÙJ¾şKˆIÍ]é‚y¥³= X$4 ŠD ×‚À€ Mş†WÕ)³3f—c77rz”õË"–…4¯Ür¤5VÖõ5Ë”¹€+¨M §SãÓõkM«ë(ÇOÚ„^òÀ¯ªœ  ¢ ˆ6*    ¯!+Ú¯x?øUÜ`ìDµœU¼}\P/*b×U•FÕ- şÀcLÇ÷thu:ã:²ÈˆEš6A‘Ò¢vUN7ÁôöäÙ€ÄÙíjlNy®€Zè1Ró:†³YÂFì¯­†øa·–3HTëtÎz¿_ÔÄBB;(éŠàíy;´×ÍHe•VfIl¶ÛZgSj†Ï
Pj‹^§ 1$­ójĞó5}ÙãJváM­ëEqê-Û›ûSïƒ>¦íŸ:FÏmü÷”ÉÂV×j; ¶ÿ]iŞŸ#vp¹ì°Ø‚q¤8*Ğv¦\	#	S¢ÉÈ)qRVPi‘¯«Hòº”Ûïu{5ÖĞZM?u]<aãAİ±ÆìáfyjÚ°ö,úÆ„ Bbo„øhÅÈÁ.P©‚µÈ
·@:]"J?_Wa2 ¸Ê!iá:@\óÒPe?*‚dšNrÕM+İşãZÉsS£t #"‹JÎ«Zµ7\Œ!hMõÛ  “ #6B    ¯!MáO[¦Ê!W“¦Ù¬Ò	·¨‹Sh¶Q{V·vQêïJ·7\sÃ³î¿3[°+1{Viµ‹Y'zdãÔ!Ç‰Á‡êûHêößÀhbffééb ?Â³8QÁ(şé²±éãÒ‰&(Y°£µÆvOy}É
N¥y&4“¾¿º³—,¦&IÍ>FTy2ãŒáë¬µÁ¯9é¹˜gKåÎúú´â4]$ÀÙm™ˆ‡²Ö¸¥¡¶1*ÒŠÚÂÿİVØ øLŠ
¿ pç€ÆˆÖMÒÆwàÿSÙÛëÌVX÷eìªùI'†OgÒò’˜ÇaÔ¼w²³”Ìl”{L_'ocÿ‰ååv“=wøì_øtFÆœtÇ°|e¶Zæ« ó¨Œñ”èbMUJÎVeMßåêÚ½ù„‚e stÓ
I0ÖÅAEL*d‚ +)ì%í\P%š"®uZL‚6búšE†tGBº¥îŸÑ6Ã³ğo?CvšKtª	Øğ©9<³êşiŒ÷¯|“yu5Å ÏFk¨é[S<™ç:Îúgñy„6å³ôFOİ$æ~¾e¬£‚J,~ìı_"S 3×­	29bUºm³3øÛu'/­ç«À‡¡‰~³¯û®§ÉTUä¿S“#€¶J´ã›İYO¯Bıú/»ùÃ4gÀ  . 6Y    ¯!M/SSn	¶Õ QÂ!V¡µ$‘pÂ×Í"¥T%7”’©’	Ì-Yíş¨âÖ—·ë{š’)¤„Îšä4îRä¦rT Äãæ3¯§
Wo}æFG¡- üuà3êgr~—Ğ?OX¥š‘9ß®¹E‹ÊHu‰hŒˆÜbñgZ„—Ş•b¨Ï%&FÉi›¤‡pzÛV\ßŞd®çYÀ@RuË;Ç˜´Eiê§ş¤½ìl<ln2µW{µ³˜-nhdĞJ^‘í©¬7óš°»DU†ÌåÚk©W;Â«F‹©IÌ÷¸Yx^QdfV
yéÆŠÚÂÅŠ¨„‰ñxaQÁ¡ÙœËÿmµ‚îOçº-4ôíZR&†P(…ÃHĞU&¨ÅÓf‰Š@S¾oJó\äX8Wit¡=·´Æ¶íüùÄê×fél7­_õĞY Cc•;[ÅUHänô;¤&r”,¦Ûˆ¯,Ùñ=iúß®g7´óû½Rœ×+ãBÔ(Vö2õ¢—ş dö×ûT¤ú,v-PÓ…¤ócZ•` +C$ˆ¨ü±ãTËÛßızÔ»”âß,Úñ®ğCêEÊéŠ r4kq©iÏÆ¹³>p:­õcõœrïP×ßÈ*É"[Ä&Õ-?æõ¢¨¸Bù>—Tÿ¡±C´oJê‰2Ç   ™6p    ¯!{ñ    SÛ ìt0¤·Ñ9n`K¡¦QvAËBë—D–=¶%RÕjWM‡Ö›JBw©Ù7‰MãÒ³Êízùoì»K	$#œkà™FRMÎJñzşˆ tÂ™¼”ó&¿¾^}­'Tµ]ÇWl;ŠÚşJÆ(üÊfŒX)!¬4İ¼“Ş~*dÇK¡Z8‹/ˆm‡•öZ³ğbd-‰«
MH(åQAsc5X3"‘qş1‡šOÒ}ÕØUU1˜o$Ê*2,Ğv¶bVòóq	NvˆSS/Î8Ä#äY»Œ0wñímÅšVè>ÛµœtàÈDä|r«5pçõ˜×"ÅÄ—-ŞŸweo³qÿ•||İwd_½ôÆfã÷É¦ğo7~T¯…ıÖq&X ¯ºJh¦ó®Êê†’14_%…hÂğ­TßÆLÒFwAWşôPÒÈÛˆAEUDq#“µ·É»Öz·ÚC3t	Á’²$•/ V³òÈ"ë]H²”¨G¿xR+Õ,BH\€  ¤ ƒ6‡    ¯!M–ÌAcÓUæœÖd,µ)…5M¸;³ 3õK{Œœ'ñL&–ö¨i3ë<b1=‹)İö,Ût¨¼5×{nÇ±¢}cuıîÒ½Ş@™¶Í5¶c5>õ`udÙ@YÖáÙ$É&ÅïÁ/¦
Èµm˜%2s°¥A¬T1’ÚÆ…Ñõ…Ñ*^™VÖğÇ|(Ê-iÂ;éˆK”,[µ„ä&s8©4,r…ÒVZ²Äd«áÒ·LLò¬c„«Ú”YD")@ÍP­ª’ÃCÄ<0¨C%–PÁ ‰$Ù'u}Oú¥´{±^¨ûDÆòz·á¾fç2r³ÃÁ«›RƒDÎ9’Gáj¢2!˜²(±ˆ^óëeV*n¨9ßMÌ‡ ÚšÔõyçKqÛ[0LOWÉR?'¿4~åÅˆàëSéKZ;¿!-ŸÙ£èæ\ÕÉN¯'»Šõ„DkJqxìÜ­ĞB–óÉ]óÔP£­„BN¿•v QÀ   t6Ÿ    ¯!•–ÈAà!9üœğ•u½Ûd\¥T¥MP
\MÖ\ş7óª^&”`}Ó§+¨lLZë5ÿ°tÁâ™ı;©•BàO!P÷Œ<¢SN”‚˜Ö-KF¶@¬”·ğÉ×ìÓñ¶ïã½W8–R+Ä•¬É/hºeqÂWëÚÑákŞ%JR>äª£ eLºt·ùÉ‡#Hòœœ¡]ĞXœ¢¦È5õ¬lXŠ›2
ÅB‹Nw9w¨º‰TÈ j,n¢qGğhäğ ÓX&„¼ÉÀìN¯f×¹…õOæ9K™Ø(ÉOL¥jTHM9)SÚµ9ÉTæ’Zhæ¤5Ë,ëµ(Ÿ´jM3<¡ºÃªş±·2:nU{1_"ÔtÓ®LÉC|=ğÒ¤¯r™+ÇÊN¦²«Åu­ZG_®d&/Ã8h§¾şÄh‚wŞ’†Ñ’–®$; Bùgak•8÷SKSµ$X(ùŠÁ«¢lÈ<w¸   i6¶    ¯!]†“a²¢ñí*‰c6U—uUTjUPõ{ø£b*ÈÙ}9•½ §KÏÒ¡Çrï…‡,uöÖ7Ã•¦İÚĞ}\s¦$À”ƒºƒÍdu9ÎÇ!I,—Úxj¶RtÏ¼p#H7àù£ç¡AÎL±y¤ÃóL=1—Aj.ôµBÈÒ{Œ_=g¡TÂ—Jí‰vJ+uËË«B{FK§XÈƒŠyBq ˜6ÖhÈø6$fQQŠêê×J	üäœ.ò{¥/iæïoÔ¤?- noªzÉ_šÔ3S¶n‚¹Ó©ºb·.Í>SºØn²xÆc+:ÖûÂc^É’ñ¼é\†š™É+Q†‰ĞT`"RBV€_ÆT¶6Ï¦*òaç³Å¯È¾íQb÷Ÿ$!+YyØ6 ¬¤Ã2X¯FtŠ5@É)#B°Òlr¢@`#bf+«rÀ  t ’6Í    ¯!+€  8PÙàìÄX:‰—9U	Vºe¨‘¥RÅoh…XU}`éurVSÃßğQ¥§6³³Sû/W_ğÍùq©­¢Ê?8‹×X=?¸¹š„ªè•)q¨ß|Â@•’B!Ğd©KZiˆ×CÑfoh¤So8¸-"ÄåXM½>—J^fòü[ˆÅŞ´İ„`©ØD•â!<°*óçÙuü­×Q»Á€SQ˜ÇŸöúõh%¿g|m³Aì›á"Éİ Náí”¤†…Š¹6‰ğrÒ3Õ¾ÓÍÄÅh®F–ÕEd¡E€!	nm•!˜B`ÅìX„fşÙ†¿\ìZ³”ºí~?€zÆØ‘­GŒ?¯¬ûÚRZÙNBã´K˜ÊyG.«‹.Æˆ›AÕZÈD ÓÛQŒ‡20! Gt­iLs-å$¼gÒä=0ÊÔE”}+[ ÀĞ´¾ Køá~ªıÑ'å‚VK,QPZe³~Ú){u¿í)7Î°›Ü`¹É
×²ı"¨µ¦ŞQ>y—cj¤à   -6ä    ¯!MÉMÚk’!6ÉTFÌrÈˆ1á›1Ê!B¥î ­ÕÀUJá—9¤C~>›Béaâê–ìMY]—m˜–¦¬5ŠPˆĞ+ÓiÊm·.w`hD§Ü³õª¡é²Í—İÛ×§Å‰zYòsoe^ÏJÂB0: Š+£YÁŠ¶ÈÄè8—Z6'†í+åÃP˜¡Év(Ÿm¢àWd¡bƒÜŸ®¢-JN×üR÷òAÆ­´©¹=…>-éÍİÈ_y/Á;ğ'óçò
>¡1Gşvñ£Ä™V€.¦¦7NÒJgd€LMCßsÙBŠòq™˜K&¦%Ò ¨İlqmÎ\dÚEâÕ€2¤)”R“òP(ò`¿F>SŒ5»m³4{œziØÑ(0µOhÎòäÅ
—¢¦BĞñöa¦I:Q° 0[Ã5Z‹Ø¢²Â•ñ¶Õl§-UÁˆt¬İ€6v‰ãû5ó_±ø,éÌ‹ib~˜õ{÷Á³Dß ´„:Šô60./F)5Š(-Àpt‰gÃ¬¼tŞCÂR«¥Æ 8t~1g1å€Ùö‘õ–qÌ<UDpYLÌ-ì¨¡x¬J$PĞD]&£4`"<J[¡d$dµ¡ÀÜ¢ÑÅ;‹E>~éÛfI/…mUËÆD–ÙùK‰WeÂLL=(
åG÷Z³Wr¦d1‘¢§i»'å9ŠùÖ³#"ƒ ùjÅºã€  8 ™6û    ¯!{ ,Ì WZ¨¬¤8±ÒñÔÜŒ`”‘-k’½¢C:“g6µç‰¸é½£OUumUUpÎDáÚÜ¼§³tm-ú¶â‹@[¯Èd\¡<<›±ŸbW·6é“•úóLñğ›¨'ĞÙ-ß’ò.Ã«)XJ„!Vş’]Vrœ²±’O$gU<ÑÈ´'™¾ÉĞv×Ş}‘¯t.âÆØµY:¥*5Kó`ÎuU&Ml¬Ğï^•FÒãİˆRÛq$Tõ‹ã¦¨;lj B0V,qƒ‚FÅàFŠ»l ‚ÁA0”¢ÁÄĞûUÕ\bêŒÁƒ¦·rµ»íÖtÌ1ÊÊŒÃ÷m6xÖSğ+Q_0Jİ×X8&	lÑ{ªzËLàÃŒÅGšY4n@ÎJ	fFˆğ¢ĞA @v
8å7˜Ğm9iš}ÉÔ•‚j_rCJN5l¶©©+U…+´Ò¦¨gU˜ÒŠR 3®9A¼îÌÃ‘¹«¤ö‹  îÉÒ”Ê\1HHª}ª!%ÑÇ!ì4Î©#(ü BBÜ  ¤ ”7    ¯!Ù
,s€WZhf:XµËÚõy±X›œn¸¦È«ª«ÁïµŞòS­fgÅoÆ[I‚ò‘µ- ƒıõzÃ5”Š+é–`Ÿˆ"§U%Š—.pZYT»|FQ64,Şj-Ú(³lÙÛ9“‰ÒÒºëRÄPu›—‚ÍÚ±îÜ ‘ÜsTÖB¼gÎ•ndt-‰ÉÜ
€ 6¨we Í_—mìi`†Â·­¡MĞóÊ™‚qÜ//l*¡^£pw‚2„ÉY[» û]&»H²ó^³R3†°½EŠ“daÁP¦A`3ª¹¥x0¦†­–M·'ôRuè'•Æ(Ş¬D•ë ¶:„?~|’ı»´"ğúJ:mÃ†80Ì0GR4.+³B@"ŞÄ7:¢Æ§Ï)Dª|õ8kr*ĞÂJj°&SÌô?ÏÉùRšN¨Rz>_øHP"ñrïÉx.^ÓD¬b$Ó–§ÿr¯ô›‹S˜Ş 2&)DÂA‚Œ™½K2ÜTFúÌsY(!3ŒàÇÖxVı§  Ÿ „7*    ¯!›+ü„TÚ¨–X²å
Jkk™’”^„´HâÊİôÀŞ£ëİÁĞ\6ÚK\˜1°uôæQı›4ÓÜpıgÌÔÁ$‡®|ëxm·JBË®vãò¦¹K<Ş3„¾J}7ÄŠ…2JhÒkîˆr‘ç M}^ïŒÆq1ÕĞØè+wÎ¯“[HOkLÛ2ÅGàÙ–â[\¥œÜ_³/* ÅMà£
ËæAª_YÎ`‚Ğ°™y3
`‰^[D¹JYtƒK>Á–"¢Ø*,TÖ0\H––®Îx90-ÅØ>”­®|?>óèv•lì0ÖFMdQ7 ÛòéPË!Af¨­ !Öwt»9"doVá?S·Yª‘§C£(Ö×Ùİ²N1&›ûgSÓ¬¹ -b0æ?/|ë’Uê×h¦£ñ~R;]gŞ(Ù“;#ªLßÿÄ©hÍâ  3(PwÃXdà¥{-ûÜµBŒtòÉŞpHì%Ì³€   Œ7A    ¯!™
4{UÚ)Œd0°…Âêæ*¶ëÕéÏšmR©/z‹˜4ï½Ç7´Ó”yq²èÅ”ô^Ù­qmÅy‰K@(„üyz«lzñÇ³„Ò"wR\‚À3]ATG£J¢	J¢*D‚è£lxÌ tù=ÔNOo2–×úM|ñæ4P­06ï‘AjÚÅ%¼QÚA  ĞÛc×ô`Ã›P­Š¥¾ ²—ùjø†§è}:İäÇ¤bIÎ‘Ëº-+ï_˜DP‚´‚’(µVS&­"R‚¡:š{"Äq9rnœwì(İ44xK§gU¦‡2¹!ea¨mÚ¾£ÏÛlê&~hÂªµÔ6Ö`!Çµµ[U8­\@(µ$Ì9àdpõ’[lªäÄÁ e¼…äÙ×$‰nÁmÇt,€Õ_2Å°·uß"•­Æ¦´"–+TÓ(A„4F`…³­ğ¨ oï0¯HHœi¿n¾İpôŠÃÃvâóR	Òø  — Š7X    ¯!	p  TÚ(Ì¤ À^³«3/´çŸ&i½Sj-WªË¹°’+àúSşõs§ÎgŸ_u6Õ(ePPàÆkã#~ô©²]Eæ7ƒ“w½ÒÁøÍDaÎéğ™^@v8ûèFèùbu¬ÇùÿşEnT4×)Ãyä9L–¥Ãm=Ì%–Z›kW“EĞ”|Sƒægt„6`®òÅƒ/ùÜÿTrB6„L–åíÆ/QF]Jk¨­äUHÎY‘ÁÈ6óˆŸ´"D§
Ó’i{2ƒ=…BôÖº#NE¸À¾i<Şî™ÆQ»¢åªÍi³º}N±L'øÜPæƒ|gòO°9éÆô¼a_¹í„Y³6:Â´@llìÍÎ
¹ŒñYh£šO¯²—9¨bÜõ".Ûfw‰¾6qwÕà×ON®j½}Hì8^f£OİœÉ.=ª†:—kúµßì¤YëSš1ÜS§\Fª¬H±Y-“óVŸÁ*¹Ú×0«~kÎ£a)•§LHL¢0(Œê~  • n7p    ¯!    RÙi,t)^CL.•›¨€™@‰,»À{$WmßpÕ”çyXîèÍº¯ß?vìÛÀZaì‹?eëªûå¾†Ü­û|¯Û£IÚßĞNVµo•6gÒ@İB·LÇ¯×àĞG¡ 5=Ş’BÙhÚ•5şú¢`’¦/Á“@{î“|z´‚º²F”ú	,Ğ„”~«RœI$ îˆçbñ%Ô} 7/qÒ,‹]­º‹–"e¨¼B¦ÓFd¡oM”;¹Ë¦ÆhÒÀ2	Mq5	q»;­†m°ë–Å!3ï½‡yß±ÙN—sm·4U½7ÉN‰|ñUM)­YÿsOs4éj{šgZl:ŒZWî·†öáqU¢Á‚X%8›$h«D@Ä
ì¦kELŸß¢y;
û0^ÒD¢1V ±B(Ì/ùˆÅC$aTL2+Rr*¬ÃÂd½©frºL½¥á#¥Õp  y ’7‡    ¯!	    TÙé,¤ ¸–.Cœ(ˆ”Ü¥Òêã@d¦(ÂOušÌ7¤¼Ñ‘¥$^ÿ¿×´=P,Nóó½©‰P`>hâdÔˆ®Ã$Øˆã$·ID§%ú+š ªq¯¶«-nVW]¹ú%®ù¦ª»‘±©¢,š0ÎsjİĞœªvŠÖATÏ`áP.¥ş¤Ø•ÄUj!YÚÄX¼´Ã—®±yõîiËä»Š152Í„ÈRÚ’uÈò:rªÅ	`rFf5¥õ¹2ßF	 õ5¨´«[ngÍ(‹UxMÜ$¦0(»´@“Ìé{ŞGåªJ#¥;4Ş/v|†©ì.,ÏQzgpÅjŒNÛÈ®U¨+T_ÓêYû/²^wì³ªD>S•
uÜ1U‰iâ¥yª(œZáÁsbz‡eÕÒR*SZJ¯z¨%d N ÅHH•‘Úğİ‹lš/JÒŠËTS[£$¦—+ÑÉc²ùçD@oˆŒ4VI-{ŠVŒÛHNÛİ,wá¯ÁëÄFâ]%   i7    ¯!5¹Œ‰Õ†ëÄ¨¶.”Í\w–÷‹é,‚{¸Îû†f¢ÂÕÜxG]]"—'‹g5˜Üù¼§É±ä)nlQm4˜šØ€:Í^š©Î|‡hÃİ—‚¸a­á5PW]ÉZ¼+Ó«şò´¥=‡èêŞûO]¯ÂÜ¯M
‚MTñ!Uæ¡%P„â»ŒïÏŒ´­'…4I­1¨MIvƒPŒèÚY7¬ ­ºŞ åaj¢±ĞdA{ZÉ^=ŠÆÕ¥P-tZĞ8‹?ŸĞí¾»ÜÚ4*®uv°ÈÎŸË>õ¾’ÃÃwe¯
•Ù‡…„ªhÊºØšè!¯ğ…Ì£[q¸(	m¯Ù"Õ_Â*¸³HG«uÒF­}éîrÒÙÿ»]Î°È°2Ôa ğÎƒw†bM¾Ù§Ã}ìê–.é>Õ<	!Nk^ï•ëáB&\bWZÍ%C€  t r7µ    ¯!®Ë9/Ã*²õU˜´¸F
¼œ*t©İ(ä»…²¦Éëº!—QœÜ—»æ…O\]š[üßcñ~¯ğR'ÎËçW£á³o|?şÃêğc¯xÊ4UyµpSD†
/Q…1,Å#:ZqĞ kg8¯M(ghÎÙáï	¯LÓ´å4ã»½¢BsÂ™¡Ra,ñÅòŞ°bªb&­ïš-JOhV7`Ÿae„®½˜€ \*mGb¥åñm×YA™•j¸À{!d°Ç°,tY+%‘rõF+®áºá¼V`~ßŞ?äå˜Rp¨#X•Ü©‘”İNiw\¤4³Il49óÏ­Ÿî»V€R1räØò]o´8!ñ£Oî×­V':#o—4¯à»-Ş HÂ’ñ#>Ì'6xF3ìËU|›*&S*¾ªÔµ­ïUiGJ–,ÌÎßŠË9¤Ò…x ê  } …7Ì    ¯!½’„ ;øªì©E¯(¡Éd
¶íœN(u(ôm7ÿÜšWvÿ‹Zn[›­ÔEÌ’TªíéÓà| ( •’6ÉèU¹ÙQÌ™äq”Ï\àU=¶œÈLÆÑ!¥ö0=Z¬\åûö_Å¡}7?Ë§Ì¾%‚ê»mšs¾¾¿<)©ôá|8÷ÿÙwRæé¶úm;yR-rİêŒQ™\B?–Åò0[ÄU#^Òˆ^1MKğóÂˆ.„–xÖğ˜SÙèÌ”H´è³mÕUmëH¬¨J,°Î-—.”ƒfn»v0÷xöòÏ×ç”¥øø@È¬²Ö¾»Líú¯í 
-”³a{a•½†Ck`qµ]….¢r‘é¿ÚıÙğÙùLŞ¶5{<\2kÏÇŞ$sŠXš¬2[]ª`(Ù§uÑ÷|­“k ä«NénÄ å…vi('VüR…1ê<wL'ø;'4Â]ëí—Ñã(è`½üÕ¨N–÷§@à   q7ä    ¯!+MŠ–ËAœSMû$Y$Œ0XZU–)¿ù}‚´ä±ürOÙMOÉª û–+³d=~¥º×jj•ë·ÏnVÓ”ŒdÊæ)„ÇûTÏªØ™,¤â«¨²Ç™·³!. –=ıg®¤T§2ñ!¡¯K¯×…İ—‰tÚ³J9y„Qa†<hÔÕ4e4ö¸¸ä;s&¡QJ×J7°°–â¨‡>éiÄB¸ÆD)’’)¸96)§P¦D¡Zc1F1
ßÀä*éf+Ğ%ÕĞ& ™ƒ#jìkú¢g}œÙ›lo«´NbZnğ_”èø$—íös“çşµ	İ[a	ÓÂšÉíãÏá–>Mi¢:s½&é7Ç*Á¯ É‚E½yèpMÎ5ŒJFÖUîøõIc(?¶[ D‘àÕTÁbÿ?çeBı«‹ÙÀ’Òıu‹–µŸ×öTQ~’ä•n	–ùÚÙ‰îùıá ELĞ[i48  | $7û    ¯!M2Ïÿÿ·ùŸÿè®@İH2ÍHL š\4J33BÀ*ªÈUØİî0#&!6ãX®øÕ¬D‡x—Ä’`2£ ¶PÄH»Ş²`4*ÛZÛ 4%.İéıYö†O»78Ç›,)ô—;o9#áe¯œ¸NÚÏ„MG!Ñë\¼o%3Ö¿±õUÃİKøJ˜ï"AşvMño‹P§Œä§­d³Bl³¾·ªôm[i”PCWe…ÎqÎ
 Œ<y>î'è3Ëù†^bã9ÙÂ|‹ ~bõ€ÑÖ
Ó>\9 tV-—ÏÀ,päé¸Î¬€9õïõø_`ä]=ëFM¨T ÇjÑFm-d|İM]ÜHlõ%6^wÒk.}áŸ=¶Ñã4˜Æ`omŠWA*= ãâœì’øœ(Æ1ŠI…„T5(kªY¢ 4›„`_\€R²*”)3yìæÄÈ€^ŸtU}Wæ;ó^êµw¶¯ãçœ½Üõp²İecÕJ;šY¡İìoÄ/Ä³ŒzÆÂ/{ê÷üı‘Å]vK4o§ïéÏP™£«=¼=Â¬è‚FQ§ìrKÓßG  tİº·ˆ\ßšáaB©9\¯¡‰ö¬¹*Ìš@è¸a–ÕßŞsGøĞ[™S›5Şsgçº›é!÷ÏÑMÒÏU|ß›ïøÎw¹Ü@½óğFÙË#¡{x|–Ó¯6ß  / •8    ¯!{U–ËD
ÍÖu6T¡FÎ’À!×üU8ğPãì5Ëvû‰|í+
€ÒöOoÜ…™ºHc?;¾eÒM˜„æNV_&UÖôeäI·V(]§ú„áÛ@„Ò²Özš›³ğ:ëëğG
b p¬ÚòÂ£24Æ!€InBÄ‹Œ?ÙÑó©r±‘&ù`Q’œ©«"K!S@¹BO¦Ÿ6Z†©œ¥
,1³›)\Ëâ,¯#`[$/%,SK¾9iğx«æ„qŠ *-Œ´P¬*Áê<qE²dÕ0Oº@Ïá,à`ié%J´§æqĞh­möŸuêêX•’ÓÒñSkº¿~%ºÚÿÏØW ¯¶aõWRo²ß¼â_Å!Îı­…[S[aµ“†<M$t"„V#B¨@é´¥tw5QîsGÒWUN( ŸŠô+TVî•eó¯tÕ+‚rk§Y¢lh3ÂígÂjè©¨°òa. 	.¡Ñ—Qob¸ãICø°Â£ª[)ñ$T¥Ì°`    ‘8)    ¯!Ó…P  UXéŒ”8´=¼\‘½ŞÜë%jÔÊ/
8\´øÙÃù--åñjbÛHÓ¼Şï_òÿ—Ø2Ì³hıg=mv¦„FË£°A=ĞxÍUm‹ğnÜç4LQyYá8»bHÂJğ*yV ãzñR'ƒ'ğzÙìşå-Ÿ£±"ÊÑ¾Hafx_*ç›)&¤5bl+å[rºPŠKÑ`ü¶~^Í4«×
&Ze0;Ì‰@Ê+öÅ-bómZ—™"Psƒ’/[­„º—WZ¨°tHµ•÷¿%ß*‚êPRŠ8Z. 21YaÒ®Ÿ‡>¢µ¥¢ò4k7¯I)uè+ÖŞãY‚¾d`ÜEÒ($`ÀËäÈé.š”$›RVÊ(„7â‚N-Œwgf,ñíš/“i®¤×,÷‰}ïJ’“åh¤ó¦æ‹ÎÜ24bóÂ%ã@·n‹2QG5iU–¦Âıe“ª¹IÄ_Ñ•Ğf¦·8 ¡<	ÆPÇ
ùg¤!‰P—  œ z8A    ¯!  TÛaZ:¾R´¬Ø Ö@MËoÁù›×®š©Ø;^ØÛúJºÙöŞº¹{&=ÛOB ‘’IJÑ6;h³«ÙÕ.»‘ÛàhÕ^š5—›R¦¤;D{—9×CúKÒ¤Át‘MÔ|6ï9Û¹Yn]ÎD9«k"ÓeĞäñ´ÑXª“5ìJƒñ24Ú¤¨ˆµü_ªINÒö­C{±S+>9pdKÄ&RtÄ‚QÃ:S“ŠPt¤œ«-¬„8Àú…ƒÆU:Ø™E¤IÔæİuÙP~ÿÖôëŸIæZ¥_œ”dL&æ‘Üøt@]–…ãª!ˆÅÇ…QúöMÇ/·×l³‡û¸·ÒğIH-Ø+š¬5
˜„\Cniyf·ˆ‘C× ÷p~Ö
ß˜ÿ)f³ö)%»ŠQtõûôüëvÏnŸâZÅ#NûÂıàµåõç‹1Æ³¨ÙVÚVp©y›{QDDö!­fŠÊªğIŞ"“  … p8X    ¯!M®
ÇAŒ2Îi¼Še´”ÔŠP:I?¬\QMãIß|ém7ø”¸gø÷Ç@2ËŞ
o~ß{¬F¡'.BRNy¹¬õºd÷[:n)²©R&p³®TiŠ°ªß¨ã×Ó-Ë”› á}<{–­-]ş¨“Š^kC$Ğ‘º}	~’"Y&9µ—œß”ûøY)9ï	˜/)	øºÀ:AdÌ!{-ÈXµ§;ø(S	(+mTV:d~¥&6Ú–„ÆI,´¡%ÿ3$Óğh(FP7ğ¯Äs„‰²­`À<µjÏğu—]ãš½Â«~Xn{ÛÂ&äµÉLÑd¾ëTk¯RZkğH¨ÍÛà»(¡¢¹Ñÿú“VîlÉÜWÛ:¹i•kJİ³œP,ÁBYi‡„áAíY…%„™mâZŞ{J‚-xi!9•İG{£múŒ
ÎW¬»P°C¥ëvÃ à  { g8o    ¯!   RÛˆA¤zç ºÆØº´ÀévÍ€7	 ˜åRP §zÃ„ĞJH…ì(|`Ü\¡=gQ[ä«Ù*‚¦¼ €ögOg^iî×Š)•o2_C ÀSqÀŒRºoçøŒC#A¥ÑÈà\’—ª:€³HV*šºÁ—†hRí(\µé¼Št<zéqÅZG–ÊDÕæ¤YoÅèN±/Ç$—è^u7Æ¶R 9¦Eh¢³c€x\×½kkËKÊU`à³I€ä¹T gôm;[tõß“…‘kèŸPèô´ÛÒKCa½®¦M¡«;«®»( 7¦eL?$çİ«y"…Ê#¦’!:â–FC‰×’}ELÔ£€<çM7î¾¹=şPÍ^ô #ßp¢õa‚>pæ±aPÉzKBPJ”Ø¹ÕçWY*e²c„ÔPî•“ dSLW¾¨] /µ8+ à  r 8†    ¯!M†œÇBÅÈú*IJñ’"µA’"„ /V	;OC+ùı·¼G~ê…czğ½O>·ÿäæŞu€Ïj&ÏîÊ‡D	…è³4™¨¹óÌèîu¹şğH2Ù/d[æJ½G¡
`õÈb{2Ò‡=pÕİz%áãU¹¦©©Têİ¡zR6ÓÓ“kwrãFš#¿|]W$„hKâ…è¢¤çûÍŞ,ã÷Ü.>QmD4Iïª_ >¼x¿U(Ò°(¬Ô–B)ÎÊÛ)A”¡b-ZHÁY5Î3LÚ‹€ôü7ø…U­Ïf5²ûğö^1ö¾¨ìÒ<©"‹Aò1êQ&Em€à–Õ5ŠŒ\èñ0ZéÍe”UKa\GešÿíÌOÚğåÎí°,ü~*cÍª³wó¬’- ÅœÚ)Ô#ÏÈ<kp¸ãæ{ÓOÙeé:A.Ó p£âdÇ5-¯ØÛsA™–)ÍQ{§
ÖÅ\£[C<bP¦h‹jw p  Š ¦8    ¯! M@RÛY(&
‚,k9ÔxóÆİ÷¬^H«PScV•a&Ç\Å Åô{~’ûc–à° YÂ'ÙnW?5¿TÒ@ì2øsE.\UÈó3­¤õQ²ëUìX©¼s”aà¬ÒSÎóÊ—uFÚ–Šsoú9µ[d-ƒ°j“L^P’ğ®bîËØß®¡še™cg'Cïå«Wps•9xD±HV¡ºjëåDM·´jü¥Óï;×÷ó€ÓÛ‚3´îiu(I&„S¢r—Ë“µ3¬3gÓÁi…`fEAf¤1`¨q	RêN˜äØX¬)*…ÓH½õ´È:¯'ƒÙş|?ë4Ç´}Fq¼[í÷¿ûìı¾‡ùúnùç´Eà°|ZŞlhÖ¯@¡™i·oôÛ,¸%2ıbsôQcb'Ã®‰ViœĞ–Ã*bŒ7‚rÎ¸‰}ê‡ÃèºaÌL§F¼Èµ0°]zã×$HåFÓtà©ŸñÎó`VnŸêp"XŒÃRÌSq¹9$Ô$ ü´\…x@Š )§X‘Yã½\É!»I¾€  ± ›8µ    ¯!–F@UYèĞÄ2RkŠ®}“0”…²¨£Æ­a¹/´óŠæ<ôÅ=íLÜİ$µÚ°œJ-Åú€ôH,O×„q±ó2Œ PiÀÀº‹b–H9ê; »–2GWµ&»—¡ŒSµ‘‚µˆ@(‡J‡·É­:¥ÊÉD‘¯ª½Ï:,A4"³]V#.*¢èÜ-@é$<^£Ì|j»­ğÇ'Ïˆ¸îáU|¹ùÇk³ƒk«©°1 B£¹Î·”Î,Îª÷1	ÆèŠ®Ç„lª‹EnßÈ±Äzi2U	Œ…•ß¬¯£½ª¨¬+‰æ„<Ÿ«ĞæÆM=Y¼ç—NkÓ•« éu,âñê½/ÿ,¯şÖêò¢šD3ĞqB¯js¤oOÿ†N†@"±ÙX²#™>xJ-qÉLß@3òÿ?šƒ–2#CŞÕ Ø&#©g[Wôt±ê™¿,3ÉyaiÜºUåÒª?•l%reä€ ßÙXN»²7.bdKÊ"R_\§B*²Ôš3¶.ETı„²¦‡  ¦ ‚8Ì    ¯!#PWÚ¨lG#AJÈ¨Î[•­Ë½®ª€²Ñï%Uã¹4ïgqæz¨ˆ²tKvì6‚U	vÚ§¹´ªRÂ×»ZŠ]?ö$&´Ã¢zï¿•N=×‡0hÖQ‡ó:°R=ˆ{(u&¡ĞÑ˜o½#–è:¸z³¢Æ¯Ûcæˆ2zN÷³¤VµĞú%Põ3H˜Å¹®µêvmtm+Z‘KÕ¡TÒ+mZoæÂŸRˆCE[,t0Æ±BÚĞúù¤ª›a{¢3ÓA@XHR(°Jß5€*éUEæ.hâƒ”òíó-ÇÏzf\Ût&ıãhˆ\*:U6sœÑ³kµãªdfÄÚÍg]Ì‚éã‡ÄMkC¹ƒ–%àe4C¼Ş?YÆ§ùÑ¡şÍ÷©­¹¸.ÑFúÓY‹“ü1Hr„Y8(C¥ëÁ Æè,.i†æískÈ; nœ²²¦Mp/b*#"ÌTÉ`ÖÅ4êïI‹Ä&c¶NE­À   {8ã    ¯!Ğp  TÙèĞ–^·iûu@-…P—T¼è{å&¡ÑE÷Úêq§F<É¨–ˆ¹áD£Tõ®]TPñè›sıôa¨JĞ:‰-µ¢àp¨ı‚”¡M\3¨Ê—xÂ8ù@BŒÓ­$¡}Dí<wğKä—
R¥×? :ŒEĞ?ØŸ‡¥M«2¾Ö©F¿a¿ÚøÅ	ğcGíî¶ºêßÊq‚¤ï%Ö¬ +eW+J†k’V¬¡`ˆ•Zâìv¢áHB–ÜÆA°ĞbòªôàÛ'2‚­WŒ¦]6Ğ.ØØîTíİSO³ÊGx·tRß‚¸ûÙÄcsirš‚B *ÊÇîµ<ú`h„ÆR¬ïE³õ”Â‡VŞuw©èõ*\¬ˆUJo¨‰	ƒ·"¾/µ0€!úJ#in7KÓW¿İu÷=å
õï|!{¼U÷ÄÎ œDTR8àÄ
-is8OVbda0lhä(  † }8ú    ¯!R   QÙ),Ô ¹jÌŞ}êÛxBÙr)ŠÍ`Wiâé³Èµ¼™ĞtûôÊr˜w^aÇÒ7úõz9í¯–¾´LªÍÿ¥3§²0raŸ¶£œ½²•øD]‘¿]‹#ÃĞ`tXÊ”Ò9¦4Öt% ³¥ÉOº°t\1¤/GÉ z 8qÏ“ë•åPõCº,b¶—î^|N{Û2F+_ÍsÈu¤È¯aä¦²İ.SËe\ 6ÄÇY•½®Yu/2X""$	ÑSÙhAp#›Y\ÔeãU¥PÒR÷pM1©Y0Æ?øŞœ‡âú¾k¥YOœ§ö¡ğ´*ñÿ˜¸}Jßdh0§»l¬ÁßV!IÆ¯gğ“ˆt¤ù4€ŒxÁAŸ)G#D9©®ğ88¥€å aÄmwó<¸æƒù¿v½[ßy¼zñwx…Q¦QR\®-óäu£­â…Œ½¦mlDÀ‰tÌÄ´á‹¥i&)6† ­FÄ©„˜ 8  ˆ q9    ¯!E®ˆÆDÜmqzŞ÷¬…ÊÉTS:«ÍPÒµd€¹ù÷¾¿0Åb“¾#·5Éœ6‹—4Óy•slö¼;T±„uv+œ¶ƒTá‰#WÂGÕ÷¤K€Nûp¾	"ÓzúÀCßNã¥óR?´“Ì?µ™º°Ã©ëÒ­qü”«U
âµí¼¾¶âv±z5Á^J šP…’-§Ô,."([Ó5	f‚CDÂ1JAŠô–Z[%D¬!Şİİ©£
cJĞó]Ùšq‘9er&ª8'¬'Ûú%—ÌÿE`Üx;eò5-§PÂgõˆì'»DøiG,p6*ËUcÄ¨Æí@’—0@{åUtˆœŒ_[nCES¨InXs¥Ï]·qNß‚ºšT©¯ÙŸ¨¿®¹òè"Iƒ^ÁJÔh¬w­¿¢ÊÂ‘§Hc); ˆ–ª'>”%¸–ÙÎëKd©zh@‚
E5uDà  | ®9)    ¯!Xà TZálD0±t·.êQF•)J”Òér±§ Ş4ì?šù/ €’;ëÈ>¡Ìÿ‡lêlÉ÷ =RlˆişüNï&Çğ¬ƒ\ÑjB¦LTeÂÉAfcğ“*28M0¬ânôÔvô£šó¥E÷È¦»dŸeÆ§we:^¢Œr‚]t#»¹È`8MíTZD½µŞWÍ'
 ·•}*PjŞU¸ÕäHãLB?OG™ºæûc½ÿt!XSë¶lô£6mGc+
&¤Y{dû,^ÚİËK\ì -j
Y	Nó­-’ÊC	€B@œTŒÊ‰½)ˆ}9.V4‚ àjéîmIP/™*¿	·®Z±Ø@²­³ÔÁÎb€ÖnêùŒ‰™ÃÁÉOÌÀFSLîó	È~ï¾säÈ.êÀPÈVojÍÄ¨=WSÄÈÛFIoÅ]äTŒXyšá3É§j˜¥ÑÓEQ™)ªH€DêÍB.ØG©é:O‘çéĞç%ÇüX-Ïª‹ÍO*ŞÚ4Ø¹2°ĞNV–•½ YÛ?hhÍñÍ^  ¹ ˜9@    ¯!@ `VYèĞ†"„+*xßêšãnÕ’—½L”!k´	š[5á¼%ÆœøŸJj’3gá¿jÿ©Ûx,QùÆ’ŒY$ßÆˆİÛ”&,0ORç4Ë#@¢®­ªğ„”.S£$LİøÃ# :®jäR½øë¦n¹À nçUHOÍrà%g£ƒ¸Û_¨ö‹Ä¾¥Ä(çÂ}i}*Ïú´çÛØs_…h€Äèêş}—ª¥º«Ê¸±m€1ñ‰N;½RêSº“=ĞØ2Ì©¶²ÑÄ1rµª¯ƒUŒ´Ø¹D«—Æ HİYºİPíƒ>1(µ³©
G›ÖC¿FF7¯¾ºqñ9€±.¨îÛŠ~¶Y×­óÊ‰vĞÖwTB>şÕŸ/	®,¤§Eë)R-Yäi.²‘©Ì¾ÑªÆŸôG‡.y[aÔ"0Ğ,
LT[”«zıÊU"wuäî¬9QZƒIå˜½È\ˆtÑRÜ”OÃƒrŒÜ É<€†
vÆKdäµÒ&ÀqËˆËÀ  £ 9W    ¯!Á ò1€UÚ¨Œic;®´çïoº›¡ÅU¥o”.M._˜ëDêV=§ue1A¡¨ç•¾ô‡ñA}óCËº¤¶$Óg”4ı\=¹º‰'¸ç²	ĞÖÚÄof:\o_™¼°jú~á¶«:ø¦Ø(¡.ˆfA;ÜÈêQ£Ø!Mö	Úp`~tÓHœI=¼çÎ4z(ö;$Ãê=–Ï¯¯	‘ÆÍ9_e‡2“¹ŸÎvúà,»*Œª¯%ÌdE§3²Z²‘%ªšQ×+
²ªÈA˜Ğ"¡zoRú=õ•XMf¹­b¨›'»7¹3Ã™HôõFû¶¸šIVÀ®™(…Iım)–§ŸÒ¤¬jË™jÅPaº×b5 ëß0Tc5?[3¤°ÆâÈ¶Y„™ÂTS…Œò¬4¯áY€¯O,Œ¬¼–ŠT4£›Œ–ç×‰È4C
ÿ¡—’«Z™¾1V€S±_^«ğ³Šk›Õ\èU*TH'az\`sª'!Ä5^Ç€ßP£¿  ˜ —9n    ¯!DğÈTÛ ò8"X&[Ù&ó›˜›Û¥ä¬Te,âå€9­r<íµqÈüI¨g¦Üñ4r1‚KÔ³u$š2òx$„'øÊ"‘+§ÄATjŒSÄ46¥‡0éˆ@ì¼}Ì^Wtè•sQÎù&V¤KI´Õ„É9`ÄIÆ€B"Kà$¸:¸T7Ç²®†¬	:·D;%—“Ğò¦}BI7AÏRŞe5Å¬·üé+#í›ÏoŠ‰ó¢AÂ½gKO1{‘ ¿JqŞ»ÙKá2Í…’9¨íÌ¸H»UëƒvrÇ>R¦Ë¬	N‹”ç0¹ÍŒñœ“t÷Œ?0O4LÄüšÛX’n‘rzÃ–
³±„GE­9Îòï M`ç–d–’¦‰`É‡}‰‡('­gãp\¯È’÷6V²úBI†›0s´¾Ì&… ¸KŒ£i€ëi'÷B‡%Eà+«bèG[ÏâXš£Ón)Ş½s²5°h@3“·Ëõíóˆ Ê)Ó¹Ò@ˆ7ÖDŸ  ¢ ‹9†    ¯!D`?HSÛ ÒF!H+C4s­J©‹ÔæÔÜ˜/Eİ„}÷SõLq“<Ö­ˆÅ–s¥QD\ŒT."52•x†V=Íe1Á–›7ä6#M
˜–âYyÎ>0İô¾;8™·Û¾“ÀâèİUÜ;_\½ÅîÅMxAWc ‹+.ó"¬(gæ_ëBİ ì¦—xø„ìè½=,°©ãô,\ï(XèœÊ/Yœ¤Ğ_ÆK>áaãÈ”£5vÕ NŠ˜$ŠñY5kÅZ¬geå®;¡QImdÀ˜H3x"9øf÷½)r™–`¢à/¦ê¯óÚ ˜d|ÄİÆÔ²dTY¥U•Áñ§8Ş™ ÓJ°h®9Ã’h—·a_Líh<‹wìä­æcØ%Û;Ï|ûkÜè†€‚ø¹êdĞ®ü@t+V\úÍN«â;ôˆ¡˜¢¯ø«ãïLÔ#[=Í¬»q z"<QfF„¦ @° ü	³u ê9« 
"
^ÈViFIN4JÔ³^t¡qÀ  – †9    ¯!+Ì vVÚè¬¤‰„,^¯V+àÍ»yãU	a4°Çqå#ÅŞ¤†öİw£“$Åá÷Q#Ø[ıÙzàŒåû‰¢ö§ˆ¬•ÎlB˜ÂRˆ½†²uîßÃº%£p
›Xò¬n×‰$µ¥õöËˆ”,±¦^r`Š—%Æÿ·gª½¸V¶Ñi!·EêA×õ®	-²®PßRÕ†? ½—,47€éCG&ƒ ìö<~í^èÄáˆ´’BÈÅiä¦Cé(€Úù#Ï6ÖpŠS¶µı@MUÛh©Ğf…‚‚` Ä !XH§¹2/0ƒ¥ÀO|Ğ†ú^}{Qñ[J`y,%!/Ò‡ƒ^iïÚô¯_’Í!ˆXY‡>Q4Œ¤†8ª»ĞS‹-8µ[7˜yéÚ‡E²“c‰±ß í¾Î›nRh¿pm„³ˆåÃØ…b0ÏœM¢ ¥šAƒS>.2AÁv81ª®WU
^§dÒZ6ÅC¹Õb])€  &±üŞÙÈ²j¹œ  ‘ $9´    ¯!M‡NÙŠI‰°5Y¢Ô°UZ
µ\2B$sZÉPïàÊ¬¦‹¬oA®Øİ‡§Xª`fPE{PÜİ¶úVR;ô{Ô'"A3Ëmî–áfÅõ`hvØÄ…qz†ÔZA¼Ö©ˆá“X=)™cÑå=co1‰nÿ>¶	nÜ!¸¶>İ9c=CC²¼#}YˆĞŞƒ°ÒşoT…E=“A?Ó(‰Ã–ÉI3°UØJƒ}ZŠç×]Äæ“¤Ø§ê¥+#œcÃ¥Íë/YÓyŸöum·eÖ7XŞq7õõÑ¹·4™²ŠG*_$İ¬5t‹X2
Š¡S"‹Ê¯Û·«,„!s)%ÃAu lú[uO&Ó‚>f5ê`¾¸dÿ×=ë¼¿­'BDÕ˜ LÓdPXeFÒhLd2Á)Ffiì|+ä%ß½ìfó›BÆø£t
_qºè2¯©×ª¬HtÔ–E6	?¦&zğZ:`ºÊÇô7È]ßã|·¬§æ×ıúLÒ¡%İxjaëÙPM[Ô×„ÉL9Èép˜ÅLwãŠsî†”¡ÂÕöôë’²	ë@æwƒx8ü•k‰…îõèc`?Óü&Ë&IN!ˆûĞ#ÍÙ#
À#V‰ä°–ƒHÆl§e|«]¯şõr~®«¯«ggCv_ç~ÁR‘•B;•¦&œüprÿÚéa¯\…ÆÀ  / 9Ë    ¯!{UšÈBEduUÊ®¯2€¦ôQ%¤”ÈÒá¨²Ô*•K¼í.Æì|k”˜ØeLƒ/÷=e®eÁ­Mjeòûë·RÏ0fè›u¾Û5g$Şl½¹Z¶6ìV{.yª™PiKç¨Zï‹Ê²¨%(”áê¶Mş#øÊY0Ma‚&™’°àbUOÂ»„eq®ü4Ğ,ËÜ=hS!7¼§V5!(ì%/"È-t”ŠhRÖ”5Œ‘½Ø¤še¯
ÊäûÕk”–	U\Åce¤3ÂÕ}tÑ­¼.»ák£w‚ˆUÅĞ½VUyÕS(]yƒ§/Ô{íôw}âm,2¼Çö¿œ» Lô|Ì•<qŠ±´%ÕgSc^ç­İXx½õÖívtHJ4Õ\‹vsgqKƒ±Ü8ÌB–gC¥ıî•Š1@{FŠËÃg’‡
ÙMçá!Ù Âóä˜9è.+3v-qÛ-ÄÎõõw¶[Fy	bÃJ’¤%*©Ê¸mâ
Z’*¿±ˆ•^˜E®ò˜ëbÛÚ(ãV  › ™9â    ¯!  ±€ÓZh¬¤9RG
íC*Òn÷t­k”#‚ueFV¡È3Ê;^Ò¨qÆöâTg­Xáü¿ˆCdbÏ‹§¨·¨¼¦ìâÚÚ½×Rşî¾º{§¿ÃDõ)ÓA…×Û‚Õ·mÔ“U#=×c×m7"I4Ï~B™â¹çòÁz>Ğ5ğqûÕ¯v–ƒù£f9¼èÓ•kÆ™åÿ¥G_ı¨µŒémãÂÅówSş~ƒ,›yÔ/ÄGª¾º“lêÏ™2ŠdÆ`!–›**F™“üHëÛq|œªÛH)á$­E&ÈÌ Mé/S)SP,¦6]\Ğ	º"ç0²+ÿWGJÿÿB±îøIŸN‘!Î·4ğ‡2Ì4éÕ¨ûíÕŸd|µãİN:6«_=¿Æ¡o<¿i	¬ih*ê×®ñzªóIª¾Ù*Ê³Î˜2¥ÎnºÔX¡BÖ+^ü±âòñŒâëJ«+§ÉfÉG¶Ğ¤úmÄ >S)ö»Ó¶u±¶+Ü liÀEŒLVÒ¬P]y_u£tnV°#YIi5åˆ  ¤ ‰9ú    ¯!P   UÙèìdYVèdOg®9îJ6àR‚].ÀÇƒ.Æ|÷Í¤‡8Êê.NŠYy*ôÿûNë`ÿ¦=ƒ‹6[`4tÇúšñ:mÎ&—vBº„ƒ;±Wa_{}'KU­Q©u†ŠoBøµ(ŞıXG­ÁB$â´".Fdh&Ü@UÄÙáQ2U¤CL¤G;§mvªºZ2	ànX@½Øà•T-7¬‚kZÙ3aL!tºÁêC´©QûÑU%Ï‰q;hš
ºEŠˆÍ Å§ŞouÄÓ{¯{²êZ²&Q¨RIğÔŞ•³|]ĞÓ!„œÛıÇÂAxä¦Î•F7ÎïOVv—nákÂC¶«¹ô¶·à†‰¿);ÆUÖâuíƒØsò/MœF7ØÓK8K"dr>ºŠ)°©œ…€IÆóÌ¤©¬¶1 ”'
‘Êz<Å…”‘î¤ß:‚¤æM)Âó˜)[Œ (´DµD.Ö®„h¢KÑe£×•n¥'ÁK  ” v:    ¯! D XSÙ(asW~Øœª,T”#T—=Ç—¹¬­|# PVòÿaÂPî>¨´8rÓ®#^!’¹i£‡4XFŸÀ@­'˜¡È*šÙë-3m]gÅÄì$í¶ËœLÕ¥ZÖaÜ´rkÙqZ®…·ŞU^K†y
æec¨3¤›®g…×"·¶¤N9E\£Ã\UY‚Îåf—vU×šæ+{ÅŒ§Ø‚®£t–"µîQÉ(^“ ª¦ÚÌ †4ª½iºı<Ô¨J)J!¤D ï®Km±Ù]Õú„<ÿŞ¼R½¼Øâx«fû¥p›[ŞØı_N¦ "Í¿ùÓ¢
Ì¢¹ïêíVi©Ã¸î®¢úl‰¦¯İß%f—´Å£8WÄ5´VXq<do¤Ÿ×Ü­“!È“»,ğâäg¤˜#¶yVJy@e]]pGQl[z)>tZuOájŞ°x‘LÀ{BT-Ö…"•ïc’I]„±.   n:(    ¯!=²
ÇBÅ¨pfÌÖZÜ¥PD——.ƒëDÖ¬	trÕºùxä`,¿7J±ì+j­ß²ÁØÚo5®±wWŒ¿ºÚ&!÷Œ]éc.@Ãv*U1´ÎŒjt½@Ü#:á¬ªz†hÁÉ#)Z¶zY¸0e¤¹O‚gˆÚ9”I*òD¦Ä²‡O¢œ!>„ÿé[É"z¨„–o­¬ª…è†(Ü®®­Î1-(F2¥mdw°IÑ¬¨¶D7ª¬TÖ:b©Ó—5Î–«À.%¥şÄÈxlWíºêOíƒ,ITòÂõåò¨syê¼×'¨ˆ¼Y§JW`¦$á	Ê‘õfJ`„àJ××2qœï+ÙKZ½`#êI<“Øº^êù/Øõ”ªı!Úòö ]…Vü£ùÊöádf”!ı÷Ê½x,1‚HN	R%&wäd€FÔ<}Äoó÷)•¯|È“ºÖ$-Kt'+  y ˆ:?    ¯!+?ÿQÛ¡,DŠ‰ j·¾í%…JÊ)EÒÇ<“œñ*¬¬Õañ.2_¬ï£‹9ó$·Kl­–¶øåHt8ôØù:¯N´ÂÓbÎí*ÂÔZ¬I-°3†[Š §´·FBœf	¤Ómq7Q&ß`ˆS#é¦¿]Wï÷TŞ==ù¡ÒTİDµ©E2¼êó)÷-Hob3Ú§vacogf¢Híe#*wÒ:AØvà À®¿± )¯J 7S“ßiÕUûõ™Êñ¤mæ?)µB›îÙã˜m´‰MFû¸ëU!½ûVV-¢&y(¬´–A	†‚„%«TË˜Û)0Š¬I`æôãæ%,)O¥²õ¾£™M›ãºß WmşbÛ!Üe²ƒ J¶ÒBS4[D~ó—ÂZ4}a2Aƒy'/—ç¯¤sé?š‰ñÃsÀ ÒxfºÿC”ƒV°Jd"`(WÄLp·îÃ«¯ÃƒÀ¦,aş^­@ÀÂ+–e¹m*p  “ #:W    ¯!MRÃlŒMpĞUèh…YŒUš¬Ñu`PİV®©T-QY!¼ö•r°ƒ§€ò ˜ÕÓ¦Óe¸	"3šrï¶ßDTÉµSğÿşËãFÃ;äú_™Z'	»2÷¿TdGÏÒc<<U~y˜~:;Kâ4W¤ËäÜı·Ø²Pgq%¸DKÑyÿåPô*§ËÄ*Aá¸£™¦¼¬¨à•¥ û)¶®˜%”ê® :á…´·T´[<'Q$¹zRøE¥+6%ÎÉ_¥&}5éJzäã|V-ZY/®€\•<ÊëX%4P¶O˜öÈåoxõc&é&¤§tB+Y%Y“6ÆŸÚ]’ŞÉ{)•Ae¡úFI8Ğ{4#é†e|Ûë€×¼ ˆÚİ‡Tôs²l]öãâ×7(XÉ€ÔJR8*£T$€¦ 0e˜Ë 5‚$*èÊ°&õ‡XŸĞG'¿F¡½O¦†İä=ø` æJÀÁü=*»ıö1;æû€2†£V§í©ğ=<Ry®ªºÕmØÔ¶4 –ÖQéêáL§áY)¼İj‹µ_Õ10&ú¯œĞy
<ıı3ÈL”IH)š£ßT7¼´Te¬Áj³fI›9šÊtw.ºsßÊp±8ÌDÆ¯?n-<Õ4ŒˆRf!"@“Š¤ädÔ÷üšÀ•™KÕz,Öf^˜ôÂéİÄÕ¯h£*”  . ¡:n    ¯!{d5VÛ!Ld¬·˜|ç»kzk[‘UE$—K÷¼=o')¹+{ñ•6O Ö¢ M©JÏª¥?n·V²Z…/;c±H[†cÂrD¶eÌ2S¨Ğ4ı(\üf"ñ1Ë
T@c¡JªïYYyäí³)›X­³g¬_]Ô^"aĞ$@â¥Q¹…íx`%!¨MC×Âjé.©N¢¿ÉÊº¯¯j­;¸Ağ–êÆºMü1iÖekym{áË¥J%Í6KÜxi<"“±l¶%¬8ñ‘E2ÆAH" Äjª•J»İ°¡(4Ğ7<ßó*µıj×JiºP=å,eÀÂe¦“ò¶œ.ÏòV¤±¢â·gä=G>ó2¥Ãi4Òäáêh@RÅ	§TªğÒ ƒAÙùp¢¼,û×òS®'™Í¢H1»®A™àÜ•ÚCÄµØ33¥hêQyN€—xÓ•£÷Vuf¬MÆ×ºTrÀšš14§ÁlÒAt£¨³m^
D”²fc¸ê¼€0«»€  ¬  :…    ¯! 7ŒW[ ¶X‚‚½¬_+¾í‰P
ªÉ6]ØÔ–Éª"sKD¥sj´¢9î&àzƒ7Öo¦Ô°DY*vyÔ./„lZˆ*Óœ“–Ø‚2Ú–YlN¥fãRx‘e <ŠtQO‘Í)3ƒ„`H¥X'ƒ… 9 wÈü
Î†ƒ²+?*±İRwõªbbB¬°P²ëÂ/s+­ğ}I	µÉ †m×#DOÛAâ©³·CÑÕ/Eåã/B”ĞNMJï	Öu ÑV´PñÌ—ÉIFŠÚÑª,ûP±’¥é­pVD	cÊİsŠ°MİUM2ÁéS¿ˆ½É:WjÇ¢EõïLkGY¿Bš{	à±xûö¿éÍç<T‚o3ËO>­Ibè²Ê	T ½÷û½ı¨(]Zs\öüôI‚#]^êó‘Ì„€Æ%3-ğ‰Ú:¤gÀ5ïyMkI~¡8#NzmŒM”>Òwìz­ıéŸ6m(¯Ö
qdê¥Ò€¶”bŠ%q%^  « ‘:œ    ¯!„ªô?ÀUÛ)0&‚‚	_¿–RÙVwä¹™9Õa8”j•A¿eri¦x´Ã„y=!A,e~¿Tjæ# v˜!…†í©pò@¤:¬+º=¿8´KEĞ;–\DX¸w'VSÁ ù^¢¬õ¹H\TgBX­ÎĞ¤üJ¢o]‰ƒ }p‡aĞı£ë[®[ËKO$øÒ-¦™uv¦ZD6 Aºmw`ëºÔW ;äŠşş="ÈòÇk7¿È¬u`Rf¬
í`•ÙËV³ZÿÈmí	Ô¥¦Z* š×Z¥‹Ò5S¼T 6§¦Á˜¨Q N»ßµ©İ,T•CAz	/~«F=…2é]LVn¶{>iáÕ+=©"¿o|4Îx­ŞHF,$"B'bm|ñX2´	¼"©=¯-Fé™QÆu(xØ€…õ÷Ö¯Ú¡mŸÎrÊtŠ„22¯ñå,`>PµŞ“¤Ş5ªÿnñ™¤”Q4°2ÁÎµ…gv0R<‚w½Ùí½’'k ¬¶à  œ –:³    ¯!å»t;€S[\TGÂEü¸Öënı¨ÄÖøUU]¤ÍA_y?ÒÜ' ¤l³,åTzí.u\ìÆÁxŞÓçJIQá™‹=šM½©D°’Ééõ°‘Œ(¼j¦ğí&“q©Ïém˜çÙãô$B@QÔRK/ÂfC¨úœl ÁÖûQÈSr…Ø:D?	7ìô¢² uÙ¤§h„öÔH…>t¹°ÊüxY1™(ÏYhµuCÑ¿Xi¨O*Ta¾\¢‰§2lsäE$×áa¤H‘2©ØĞšË™ê,p¦D†‚€"´²ü'\nüĞÓ
 E‚C]ŠÀÙ{¹’käÆƒqŸ©Ïû“.ŞA‡¸©Á½ºôÇ$[ñÒ2I¬µ¡EÕƒ6ê 12Ü5¤$ÒŞNFœc-(™¬Òi›˜­A%ÏLóÊƒVtPI}ÁÍãuøjö‘ô-êÖ›1ĞÅ"	@‚¿}Õ` V¢ ÁÁ4&W) ªg…¼‚ê§[²ñ)
èMeÇ  ¡ :Ë    ¯!†¯ğ=€T[(Ğt*ˆX»FÛh¦9<áUTX¹æ¾óÔ=C{pŸt7?Çì,œQ¸âxáàX™÷eÛv¹¦àç#ªªTÚY²ä?•yªjK6Ú«„º—›¶cO“VUÄâŸÁ|-ê¢à¼ ßY
B1gÀi4€Üp)ôR–Ğto·_Ä^bbr“‹ç6B:b°şí^õ©Ó[ŠW¿;Ì]F»fl‹ÊãnTJ_ÀëEÔ˜1@—t¹æi²1Œ§xÁ4¢ªÉê‰{ÜyÓW-Š5©‚ÅKf™ F0œÂ­}Ó-—P`4öeŒ±f›3“PËößgÅyG23‰Âc¾™µ“3Ô$ ¤Ø2±ÓÏƒ{ªm±>
‚	Û <·¹ÚHâês4ˆ@‡ç ”Æ´G§LÍæß\ı$tæü±²šUîG¬«êõ—ËîM+I
éo:¯ôòØZË^ bˆ—¤ÉÇ¡)«p”^xéÑÎøÄK‡*jüû§ê¹]"]ŠF ƒ‡  › ›:â    ¯!†çp  SÛ!L$H­v©_hò²ĞÊv.Ã;u½uù#{h|³§dK—u{¦‘ê/9Œy±tˆÅvv2E‘{´ASâ™B”úº‚iß°#xYKıÕM!J4RÓäáE
LÏ8Ã.-BPà$¦’«D7œ·Æ2cÚéÎ»Ÿô©øØÄîã‘>UØ¿Lzi˜³2b¿™„cQ¨?5‰O/!8N»Nc¡]­›£zvÜtúÔ8hõ"ÎF0Mvf«…-z\»>¨TÙhìä0°øWrôvsÏ°QWJÊhXxw}Î(}º³D4–Hô>‹cö®ÎëªĞĞdû†&§wf¤Î…*Ş]uÕfiêüé¾¨ûÆ&šV„"&7„é‘…ÅÉ,¶+É¦«hè(´Ï£‘S¨/İÒÔ`Ä¶jµEPñÖÉş÷+£ŠUlxUt7?åÑ¡a:¬ÖAu¬Cx™x6J ¬s®CÛû¶öR$¬d¹À  ¦ ”:ù    ¯!ÖP, UX©lÄ@­¨İ¹Šòîò·À´(ÁtiÚà	K{ìkeØ*^.ÊòOR¤õ¯šíuÃ¬¸[Ht³¸Pw_y,Ó4ı½¥FªtÃáƒ²­ÉQ1°[×Üö¦’VfÇfµ)F.šb±Y—£	S¾ª zx:±z>#~eîbâsæ.“œŠÿ/#ÈGWÇøÎJ¦/Q?5]|•kR†˜lcz¤	Âğ‰fÜ
‰![RS7Nz`øH‹d€¾*…-tÖˆCjİ:²á¤0fí!Gi‚³bVmÎ„ïÍ
bˆF+ÙOÅšûº#GcOtH2<E¯Hâí¢“ÀŒTá±Yrme“kÁ—+L¦4W"¦R>§št ÁÑU³«ŞéX"JtÍ%ôQÅñğ9äs]´O4Á¥(›øşñá´õTm¡/J´GÿÒf%Áİ0OîîjXí–t²-”‚‚j»J}îÆ¿ç±W4e3idò„‘‰v¥+¯•¹(ğ  Ÿ ‚;    ¯!  RZèŒTAŒZú <+SfŠª¡je¬;íøøsyÛƒÃÖsBÈÿbR,İø,Õs|õå¹ÿV<ÃÌìxÙà_¨å¿;L‘±cgòÂ¯dËG<\—\‡-„øfAu¿ŒLÃ_ç;şªûöˆo©Œ¯=Ğ¾$É_ëç¦j/âõñÁî:«aõvì*èØp´ôŸE»gloû&=zà@„bxŠ	^6©rğWÄT”<$S,MËîÕJT‚¼+•(Ñ¢mè)SMe!ŒDaÅ6®%ÛÂ©liJP*é¨]×óå’>šİ9¾Fû;SQô|«n®$t;Tó™Ü]Jçíveßİ¢Ò~~wds’º*¦™›Bí4l9­31(i' PcøøE˜œ÷vÏà¿Bk©í¼‚•£ûÒËÈn~ï¹@MO€#§eaXüî
ÕÇ|Õ¸%ÈŞ} -¼H‚-S›‘e¿4‰–3”VœŠÁAjûK!(à   m;(    ¯!=®ÆBHÕŠœÛ³,ˆ¥"Úİ°@€ÚQ+oÓŠô×dÂ/)¢Øİx§S0…>0Š\CÌÇÒòWÅ$<Ì[ôâ„”¼Ûä0ÒÁ	ó¢ †Q+ê˜0TÓ“ãK¼Q¢O™è`¼4!“Ğâ°Ï¥U¡Äçl’¼*f¤w§îªµm„‘	Ê²“M–„Fwa©b²«-i¹:Şdc›¸²²®Ù@'‘NV4B³3Â¡T£2w/Ke¤3†(E2âûa2ÉTª¢h4/bü@Éú–ÈïßFpÕ;?ÛÙï†wxG¯2“ë—¶{¢Ú}le—ÉlŸeÏ•ƒÔlzÖwVµÀjW–Û¥²¬Õè¡AÉ}DNÓÜ·“ì:’÷2¦¡"S2FSea:Ù Ñ¿g)C£tI$Œ—)JÄËflº&ø)0–ªÓ>‰É9\Eå•1LÄü‰rF4\Ş}AH’™&H¨ C€  x ‡;?    ¯!`   €RZiLD1˜R‘[®ˆ­°(!J.‹—ª}C@—GÉšÛš3“ÚKBæ¨êiœôEş¦Æ~­Ù?"{ÕûÄa<&Nå´|,Á!S$¤Œ‡Ä¥8áC„Ë+¦vX¦ø2Z¸{¥«–ÊŒˆ¯~ÈßëÑ»C¤G–z9|yïx’•ï%ôV­İH¼,q_LHÑ†x\C¡/E’¶\5S-;yyjcÍp…†õ¼:åRs´Z£K¡‡’	/näÓÉQk¢²TCåÄ‚‡¤*Ù)FF¯Ğ Ş(ØDó4ÛµbËÚm7štl_XD{’¬lÜC¸FU/*}C¢Í‚¦6¹¥ñVı÷Êëİ5ÓØw{Ñ–t30Ì9]Z™¦¬â{å9ìqš“©!Ğ@fTµMˆù«7+FjÇ^[¾8‹öÃ¨°é¨¤¡ÉmW×Ò€£ÙÏ¸¹b^õÇ®0	uë’—C„{G)2s¥Û¤FLe´KÏâ¥Œğø  ’ ~;V    ¯!+Ì €WÑìĞ– É©wNS½él—E(q,
:«üŞµSá9+bå+¡¡uK“ti…L§ı½*Ì½ Cò†„vóaâBi^›¹š›0ÀP\¡¡,.FJÌ”’G_¸a¢Ã¡êb@zÃ+ˆÆ½Zå©gz)®‹€ğP®BVeôæçl~
Â¦y´ê•sRM1…gd>˜VÈKe¨´©
Ó¬M°h•¿Åœ!œ¬æ\|¦šS¢¢‘q+)Nª*ZÒ¾0
;51Š!a+™x´(»l–°.Ã:é¦¶T%M3]¼7Ò´WğÓß+ë¹{›İ7·{]§8ºÌ±uU‚6¥Å¥Hyp.E\ÁĞ®&UA9S¡[ò~Yj˜òÙkzß]L~öşèI¦ß1Ô‡…“erÇ2–µ-ç¶Y
¡®`NÍ iHæ^I]LıeJ2«‚ ?™\¬¯ŠdäG…À%ÀA{®šÈ6ã*Vó©§À  ‰ ;m    ¯!M“PYŠ”H-K»`í]ªŠH xÕ/4`*ª%œÁÀsSB¢ÁAŠ­¯±‹:ËœµŞãJÖårÆ$Hˆ(Ï:at{Şë _>³QÎ\‘ŞÎ>:ÈLí®¤"_Ì‰'¯×.§¿Œ¯1I•püÀ6Ñ0<—YH5´Ìoÿ®}½£-U‹Ì'bİÀ¡ß:ÂEMÚy’Ô ª}?/ù¬Âî<úko¢õ¯£¢ -Ù§T!Š:l
,»ŒZ¾¢äÒÚŸ®›ø™í…L‹™»F…Î†Ø £ «Ê¤‹¢I¯îxTÖ1»ßDºşùüœÂöa0ƒ(`}û7S;ÕUà1¹ÅZ¾Á s•>ÃU}GcÑí’55
ƒ+J^@º‡¡d®GÔì –ü	YæÃ…Ââvš@‚@Û<S€c6Yš1)AÂ¶¯7È°xß’«U„˜®eC(‹©é|áV$œw‰O°sy•z¤„ûXo)	ï,øe qóÿSŞqØ¼Y`Ò{x|¬Zß I!Ğ7Op ˜*®b},S×ãÓÿ°ÁqÍ÷ß€ ¡ÇİIÄŒî[Y$ZY_²Kí‘hI g\Ÿ1”§Ÿ},¨ú‡˜ğ=kÛeUùCòéúï¤5f#96V¬¾Ô¥ï"×=¦’z®b¶lçÓxµ»“lĞ ¾åºØÔ/®4W®IÛf®c¨. 8  ( ›;„    ¯!{]µ’‹zÕÔ7\ªùK©{µB‚E »²~;š{&k$yÊMĞ4Ş,ò$ãs4¼•dŠX	dÄc“Ñ+C_äûõùYß#–¶¼˜î–1º×{o£:Êµkãİ2H,}]§ÿôí:^ :Ş.3ø!ouár*Íàä¨\/%MjF,«I>-}ÓHŒ8Yg•e˜¼Q£ÎÉÍ•†]J[áº}2O%#k'?2AJL´B™+9W¡{ĞR°Â”ßp °·2¤AZÛêÖ[*¹BÓ)@”]…€ÃÏÀ‚öë¤ØâmJÒımê§¶²E;™¨ëGE%øÙÇjoÉébÿ`Çş…I¯~¿ÛËá.ˆïÃ¸‰ë–x
mk*ÑËuÖ0i÷kÇ“Fv;æ TÊ;%á½ÏÓqcü µ3Â×éÎ”3PÁºZœÚ•¶aÁÒ•nZ‹dK’×<¢êZæ‰Uìä¶4xÎ”ÉUYd¦4­!t1œW¢×€‹'˜"`A„F³êI½0Æ²€8  ¦ ;œ    ¯!e’˜¢a¸XhXø_„s™Å©ut¦%$¸«–#¿[ÀIÎèİşúĞgk¢ÍkM“«İıWkÌ
’ÀÉö?w·pĞÉVŒzƒÂ–+ÚàÜ…Ø_ºÒ-•3Õm3$¸QM®M?ªVXta¸Xö“¢Næ»Ÿªş÷ÅJ‹§Ó\íı°ãL¢Ê*ØCg¿n%h±vøk"yZö÷(‘ÒÅ–l¿eRx6)Œ¯“?<¹{"RÒ¼v>ÊTxHŸ’ÅÎwE%î²×`µaéŞ§ÒÍWk±à,4@¬<ˆ¿[­7Í¸Ä¨”ÅÒH‰,_|ÖDeÿvÕïpI\t«±Ñ®$,lê*Äåı·â/ÇwZfJı¶ k“İÛÚ¼V»ù[¯ŒN¬«ÉˆHşÙŠùm9e¾|›êœ#Pİr çWX	²Óë3¨Np‡jÑ4QV5\Ò‚\¤©d¾i„W¼—]ğV{„-?¶Û^1 &İ•›5T$ŞPV»÷i\ÌìÜ…›KÇ¼ãÄ#]Ö­Ş)ÕXÄµÖYK–ÀÅ>xD.µ1,£€  © ;³    ¯!Œ4VÛ¡B"XÓ‘°¡Öõ„ª±w£ãIk‰©ÆŠJÙë%+
ä~t½2±­oŸ9§¡³~*4S=6å46BÀ#íÀÊœàÿH2É9n—œ&Š%hJà>`¹BÑí!€»õ*HìYÆˆc§Â_DÄ
õÈP,¡	ß~°„…™G/c®üşçØÓ¸ş`+ºóPç«ì,´4„-Ö¿ø»&•â¸ªIÚÖ›Xõ…şÙ`¥31#?õÜ2×+ „n«²Ò™(e¬ÔÓ™“%eiÊøwu(¤Ëµ.H‘è•„:"r³7IPÈ¾7°L-Ş¼Ê£p_é#Hl7™Ü È¨alÕ+…§•óÿÛkK«vs†¨ NMj‰Ş4Îüf £Z³¦ØÎg€‘”#¯›6&î¤)¯Mb2)”îÕe-–°ÀN6N
2 Úu·)¹ãªÕãÉÚI(DI…{ó©ì½tN»«‹:
Õz„»ãd" ©m×\xåç¬İSQ_HÀ  › ;Ê    ¯!<°WX©Pu$¥¯K·ª¯¿…ªğ¾ç\ñJá ZìúÈ	}	x/ßJ»KH>Ì [õ?7½Ì›„æş­ÓCn«ÒZMMd«ÉãY‡
 õ3µ5ƒÃ«.Î?³ıwWxwÿØD#,•¸á-rÙöå[QM6íBl¾Ñ„¦
Ï)ÜÔ°“ ¹%8´Bê¿ç¼Ë>Í®UşDV~MFu2!}zJ]ÑŸü¹¸®)˜œ”H&”„£|\tª =½™5 ¾tÍÊ¤§±SäPD8…‚&	=§5nYeV³*š²R/ãÒğDbçßŸ~m©}Áèª¡æ¶ş…Í½‹µÕq™{àS¶¾~fòZÙP)W pIAöşQ4­`';1ˆ•B”d†ƒæŸ%¢šY6ğ¬×ãM>f¼0¬ •šª„QÄ*ÚµV.g<4"ÊmÄ
åMAp®¡0p§É]¥0#C Š¥ÀÂ7ö`|ÊXS…Tß#Uê¬À8  ™ —;á    ¯!<¶SZ©v(„ÃJßÍs	­¥•X(à%4àB!“vh² uü¬‰%Ò¬ªuK§,Ñ?A½S¬Æäoš·¸åª˜æÉçR0ÇC´JvrA\Eiç=Éa ' 0äôKØ†¤1r ?8Ğ«‡0ÁÙÂ@p ÂèÈÙÔoåD9Èº2ôˆ<‡!'sò×êõÁÓ¤¤a2€ÊR@ŸLÑÉRµaµ¯Û$V‹]>‘4*Â >€”ü8)½|V¾ùk§œ€ÃÅyÂp «°ÏrW¸Éö *­F:‚"ÀbA¿äß9jDŒ–ÀKº¸.Œ_E…ÙÒ?´¼9ÁÉ17şjk_àÅÊp]ÍlæØ/´Êã\uçáĞ1ºßĞqÊOŞ5KQdÌö”¥ÙñôS7®ÎTd*`ôëˆïrÊ
„Ñô]«‰|¼^l½8ÏÂWŸÑŒ*¯Ø_7"iº®
ÈÂN\À`m á\ØÚJ“ ò¤¥9eŠ••óy6s_`€  ¢ ™;ù    ¯!ü=·UZhğY#Ğ(Æ–3u®=j«¤Ê¬½„ºjÇ-ç	\oÇsô­«‰7HÓç«NXà1ˆ~sÜaÒ¤}ÍªX5Óğ2J€hÀ*ÃË ˜ƒı®‚ÌµT´.;æQ{E[ÌcQü‡.#UÈúşìÏ£áÊ‰×ülÏ˜ç‰ËyíBœTQ¢FD(	â:¶1A9é&Ì*#
ÔÑDD+­µFM÷„Æ1s–n>È"t9[O–‹Çœf
‹d±[Ğ&®‘jgZ‹€ DF9\@kËV÷W½â
ªÖ…öb–ˆÂA@ŒÂ€É“23ÚÍ®¯n²o(à€ÕgK(í?7ÈÑx5¸QªDëó~8Ê Â/FíÏÅâÿElKt¥–¥Àn K_Ë`¡"]wøôP“Ş‚<)æÀ%ÁA ¨¨ Y¥Ù¤>á]GşOİ—ûvëš/7än‡¶+‚”Ò¿×å=¿(íŒ„Âˆæ3ş½§­á¬¡¹uê ]',şË ç5  ¤ ‘<    ¯!Œ¼V[(¶‘‚§–é+$¬Ğ®ëëåo8¬©YZ¾z˜p1¼ -PLop‡ŒË ;¥*„nãéºÉŸs7ÜüÖğı˜âxš."á h J†ªŒÔŠcÈ¨Æ4Ââ³·-Ê°.e
T˜Ôzgw.¦y~JPšßæ.1Æ\ÿ¶d^’|1%ğñ§8Ô³yšºØà/ø1wu5"ºsË6¨f®Õ°ƒÕ	S]<$Üus*´¯‡nè¨ìÔ@¾p#ÅQEc¨ÎB‘˜v]JĞâSÄœ£wH“à c¼¤¶ZS!.Y…c\®*®­|¡UX¦âP2~Ö‚o:4Åæ$¸¾àà²[ntÂP•ÌÆ± uü'éŞÉÕÌºlÂzÄ˜©ŒÔ„M«±ÉY+{Z´d•êÓëDõŞÛĞÀœåŒ±³FÛx]ğıxÆd¥X(çÁ7 ÓãKr»m(+ÊÆsxóàÇ¨;×UWŒd™²’A¼	¢{bb…À3Js¯IRf‡2öík( Q$µ—*Ê}c‚R  œ  <'    ¯!@¼ U[!.&D+H¹tŠ›:ğN©Š2–»X$-ñ©œ¶™»,6< wÆßª¥0ÔâÊ^sĞx´mÍ¼Uó;2J§[Ù%—kĞ>á¤#$‡ £Jpöu¡|A¾LÔK²úüÜ"û?ĞU“gò"@GgåÄÕ7¸AùM »¢C9@7 kéÃ©›erİÑâ3<al~Á‰s>²ö§ÆÑq—<¢lÂ-¥fµ…ìß¾@HK\ä°Ê0ÄRÕ‚ëhUì¥™R´‘BÊ®©r­mªŒ„b!ÔF·“£±o€DSˆ	i 0Î›Yã0_–sô€ØıUQË>©™w[dêFXşãu~^|úkD“HÂ0”éØ£f¸¾O¼eäø#	Ò8ÒŠ%p¢fa<Ízå¹Y?qcU›±ªsÑ0–ìLióø1CÉ|‹çyùf«$W¹¾V>ŞùÚ1£õËQ‹®J»¨Ÿ_FD¹Â®€*T²³éq¦Ÿ¨I§]TT¥% ãíÒäsZ¬ğlì¤ïÜ  « §<>    ¯!D¼W[Ønf‚‚68N4®hn«®UçÒul•Š¡À‹CöÁ’¡Ú®)eÊ¼®ÌZ»Åa"c9µ»{{ûÏf¼[ŒáÂÍØÚim„îK†^ª€‘'Õ¼áJì±ãuœMÛ»IÏ(Eéû
âpì³>ÛAæ#sÂkU$ˆ{Œ
ˆ.ì„€^¸$~ºÑÒM;š„úÉÑØ™áÛVj¯IÀ¶ßGæ=ÌWffj”8M,KeÂ Ó¾^:›"AlyÒìĞÚÊ•ó  ©
Æ¢ßa¡”f³ÃßÊRB
R±Eí­P/ŸıA{ë«W©9şIa#S…eµ”vï2~¬æˆøØ¤÷"­b¸JfÊVƒÓëœ!œôèÆpÎ¡9MA…)¤_«~ĞÜ€ÈĞwYetã­Ôgyr·°€€èCµ^ßº}s‘ Z¢ò¥áx5õüÁ¹xå±òªñHôvrG
²uú.êõwf+{èì† l ˜™OeˆĞœE¨gI¡…¤¼‘g´´g]pN Ñ¡—{AÚ¨Ûà  ² <U    ¯!Ä<VZèÒ&†‚a¨Eo%K­À[ºuàÖŠUV|Q Ò‘\Û›b-§4¤y”Œ9q¿¥ û
é-îb®é½å6İö²–¯öİ©ƒÄØgòH†PÌ}õØc>Ù‚NƒòŸ	*×æ¢r„Ï·ø€ó›AL†|mö™š?»@©@#Š5M#x……†ßp> 2vÌ¡­NÓ¯^Pn"Š¢ $òüAŒ+è(JóÖ„à	}ŞŠª¹
Hv‘ê1}lAQYUÒ¡ö×÷ç(	Œ´'/Wb¤Xh¬8h#…¹ÅÒ©JÆh kYv:ÿô«Û)§éXö§,LZiX×:¸«Sœõ¶ËZ6T5KO±F±Øe0±ìÄMMC|†‚İfwv¹Øn•ÕL’íªXû-sÂ`$Â-†–£dƒŠÃ²´9…/˜Ìác „›JÛwyPvüÊ„‚uöÏd=®øE?)éçÏÄã H’ñÀttZ¥›è—™dMiÂÉDµ’á¿  ¨ <m    ¯!SÚ¨¬'
H¨5¥ÖJÌ‘*/œë^©}b˜¼.JªÕ6Åæ8;ùÏrNŒäU9-AÄØeØÖÚ#BÃéŞãzT”†»„ˆE-_OX¼òed²6wÛ,ÍÇÚ‰EØÇÆ‚¥âåİTÖ-ÿ7 µ+¼ãÌè`DW;ÍÛ;>+ì¹Uî×N³"íWÓ@S%V¹Ìe¸ZoUÇ·¤Lx"osVˆ‹cÛ	šÆ¾4Ëú'TWŒBî¿Jç"¶ëRÆğØ‘Lê,»Z”Å¸»gz¢ B2H4”¶ZS‰‹BÍ¡Ò¹S™tEkŸ,UUuT½
ÑÒr>fÙ³Ô'!šxÿ7	Ú# ,J)ZçK«\ëüüi0Lsmy-FtûÉBàxä7Á¹-¤hEj5Å„"¿ÌØnõh›•r¢‡-Dó¢ğQJ$‘¼C°ìJäŸy³äåµ`»eJşş¡ViÊÃ•9ƒät–:`÷TÊ@ üM  •Dít™än¦^e’ğ®   R ‘  š <„    ¯!”	<S[ Ô9#ÁQŠ B•Ş™Ü©r“\ìóS¯×ã\	w\“yªĞc¦˜L1rF*.¤#"mñnáàUì#/‘)PŠ…\n °sÑˆÁşÛYEó¦|2TM?4ğ0¬rßí½ÂòEÎ]vP]s»¨„kù%‹I±ÄD†«ió³™·ô«OĞ]f9W¨€’¬AÒ>ÿ™ÎgtÒö®¼B¡xı¡
ó¢’û»m6ä<ãIş$±M.ğƒM‘”Ê%mğ•€yáŠ˜â³Ş¶ÈJÃA0”@1 DÜ¸ÉZËR©X¨WrEš6\6o' ™*¼¼D”j»é£,Ò
ˆ¿F½ú?¶Œ½ÿ¬¼Í¾NøFÂ¾l?¶¡ÎXÆØÌ¹È~•ò(-i÷6«ø!yj‚.,Ô¨ac#”S-{ç1¶Ra-êJŸÁ§Ÿ‰mLÅÄdTSP\µª:ÅáhšÊÎ¹âµk.»†T@š4È7­ß<)lâZ
®á¨âf­,‡+  ¨ š<›    ¯!8($T[!.4:ˆV7§u(ÖğáL…œ¿ú¨Ö®Ôôî ÁÔÙ¥½ˆÁ¹ß©}ÿvÀÔü–i—$óİÏeÛ¶òIKlÍšÖÒ¦‰Êx²P(Ş¥°ÀHÔÛe7xdé»İ™^×ï+\0¨Bk¿nÊŞ•1I‹ÔÉRr4@¾hNãX
CúîLP„XõS’Ètsd¶J™İ £GºX­NõË¦"QÎvÊ	RU¬6WÅº…rÌIL
>)”S)†¶$Šç)‹‰.µ÷¬Ğ_’¢šÏFd)†AZUfşÃ7ã[š˜Û/PÅ1mSŠ­„
¹¢öd·jµÕ!EÜ›-“Íìa|šÏÿµÊm^2;íûğ'›¾ò® %ßcôy«-MP¦‚•"z×*ÓIF¦,°	çHšxğ–µÏ(Ñp_	³¹i¸?ªmÎÉÊ¡œÎ-z#R-d'rH©ÕyN=Ú+¨SÙr¹¶ÚI¬o±*ÀFá/wH|õŞ7U€0û¢.¾)oB¡¼Šñ¿9./ÆÔ'z±Hà  ¥ ›<²    ¯!T8DW[!.&+^¤JWœÍÓ&_&&*ÕMY2;dGôõÍ¹Î+C7õ×‡ ÕÇäŒWÚ¿3]Ì.êÈÈ1û	úÍå>$£\2½%ÏœòVI„«¬B”er/ i>ë©ŒVq=ê1°# î»ï¢´m³ˆ 63´5¢
å[5Ïñ¹+‚{»û\WãÛ©
£•˜cğ×tmç‚ı*¿‚GóC•Jr¼c;âyóWcîS¹e1 Ã¥çJäËuÊ¥94‰"”†ï…J‹51Š…R	m*µ™xªJ-Úêª¨MHãh:Ùa)EìVV;gâI-ÕzÍ‹@‘ÄõJ¦Ïœ”2ØÊ•w	^z‰Õêê=eõi,ˆr×_€âtEÅ0öu:9ÊÜøê¬B-3 ÂMÌä7ĞİOHzùPNm+Ãµ+ÑWEÓjeÃ%g!i©ÆëuáÎõ4*â±W]^+”çŸ$(¿ V…„Ø;JÇã÷¨b$É•,•V	ÆÄÕ¾ÄV1ã&ñ¿ÖÀ­|Ç  ¦ <Ê    ¯!Â“<&îT[!	¤5 B^FÜwZ©UT8#V?Ÿ€rLñö¦©ü{û,Hkrå	d‰ÜŠåz«ô ¤Ó£ª¥°¢ÎK*‘:Êìx‹0bT^XBã‹•¡2“0_Éé “›wåy˜—êØİÎnp§¡	¡xd›¼N‹#|ŸLÊø?´àH×;ïC@L‰SÉÓÔœæ2åâÔÌ;¹Î9üñV†ü°ÍË1‰±ö®æLÄ¥å¨:l%½úì6ÌŠK â”xí¢Z-M‘QéÇëŠË]ÅA(Ä`!DáÂB‘¼ªáW)‰ŠÂç ^a¨›´…yIaîÎnéÆlèlê:qÈ½'Ca³×<­¼÷hY@íÙå„qà†u$P”t’1UO1˜´õíLz°µ¬pášR-à@RÈ¨Y³‘K„ìÂ2«±¥Üít’øM#sXÉl^á`œÄa½5r…°„Å£,UÅÑ1İÊıİ÷6ŒoªÛá€ ´ÖÇÇ´µÅx,/<^81ß6À  © ’<á    ¯!‚¼>ïSÚh°yÁqšÄH^â¡³“^UŠU6éMPF*eÙ·Ñ&Lrè:Gs§é®F½Œ[ÛÔëË\ùÿxÉxòTíÛi“²,ÚÉxØÿ¡bVRşŞ‰„ƒCW‹‰å_Cÿº.’*@Ÿ‹û6“Ç#ã°Å*÷›c9#Şg)k?ö@b\Ã)(U Z¹3_wqea×?h¶ ùfWEa*,°8êpQÎuø1I­ú¾Û)¬×d¦mİnkˆ‡/á‹$Âgá#õ¡d¶gÅ,‚€pc ¢}¬øD—	{ˆY¤ ¨¶QXp60˜FŒ¹D0²P¬ o%†®Ş¬"ê’=6µÇÈ.ğ,*0Èô…î{¹ájk±Kª(mB€½ÍóÅk©â!ò•ª0 Në'zŞšä-*R©Tr÷¢¨¬Ë•Îi±7Ç5 KF‹îjo Âg*—–«çÄD³Û×àÔ=ŞİVÔIS]€°´S1ß‰!¡¢é5A-WVğu €êt­·Z—Á>   ‚<ø    ¯!+À«ü?ÿVÚj$Fkh|'R+»¯>‹ê˜İ±»ÖhfK%Ì¶&­OFÚ¢Šr
«nh1]¦nd7ùZbpĞåK¯/7åäŠBf×òò, -vu‡Äh¹et e€9«#JC³¿÷?ÏĞ á„Išt3e„h›ìÁ ˆç"^Hb „k¥ÄÙºéíjJü¶¬†/Y[p^õ‹Ûõœ[I…:Û42¡¸FF3nÔ“;û?v¡mïª§¾rıi}Ú–Õé÷L.:CMœ Í.‘„ºü	ìŠºô'´KÚ§ZíTdLl¹]*53„)¡X*ÃAÊVqßSFfî°,ÚCš‘>”J[Júte 9ÊªÛ—Who/k’§½®Ú-3xÈ„a;8—¬òŸ ÖŠcßGÒšÙ(Ò7o	`;wtpÀ‚òÛ8–s l@'Ğ£7ÿ™§›ås…án×uV ú¥éä‚Ğ«Zaê   =    ¯!M“N^U	 7’³T‹3@lÖJí(l„¨b‘¸«ª°X*…×.¡YRğ,ÓóõÚ4X‚}±BátHîH®8…Ü:‚<úo`_õ}PÓîˆ”a˜e›Šõõ”ºr&'Å*ãÄUÜ¹+W°zğËşÂØ¿À,aŠ´>²5:P˜óR0`¾ëïdêí‚¢220fl£´ZwhİvOåø‰¶º¯°ev©DÚjT«±¶pÄiÕÙ„´T¢’P2ME!¬¾=ó×7ÎPdG/¶£~´×`Ú±İ(øÿ˜ŸO–1ÿ>–Á§ÛcİŸ¤ı'`AzÇÑ²†\ÚĞ×e…”`ÎŞ%î÷!4†ù~ÍÒ¸ÊŠ±kÂ¬–L"‘cW_;o"5@IMÏ"‰„eIo…×Bñ),jj…ƒIæ8œ³HƒB6B,FÄ€ÅjˆJ* CÂ>$¥@HoTåO“®kÃjîßM¢Ê ¨kÑ|ˆK(“Ö¥g’”!Ê—ì×ÜvñÖ«ú<øpX îŒøî­†ªî Û–a-Ã,ú4”ÄÁìHƒDyø*Äb;pzS$µ/¨IÉ¬¨¢?µ“í¨ö|*x*˜F,Ù’Qø±Ã2›X©:êı»S
¼+:>7{t×-Y?›ówm"³_çIX/ĞMÏ&ëuğrÅZ¡zg½ç&l5  $  =&    ¯!{Yğ8  WÛ˜ê& Vò/A¿Åå^¾nç2UòjÅ‚8Wıf ÕÏÏÎşó—DNÂ‚×Ûw7¾iûVÁq+\QWnÁ±´¬öœMUîh–}ÆôşÑéŸTÑŸ]“’gåÓ4nn¢•½Âg3u¢ÂäJ;§C}/a£×KÎj‚tà`Ç¬Ÿ¡QñQVV°ê|Ñ³7q­ÕwÈmGuèµéÑXBÚï’â¯'EwÓ³Zfkçœ›?bÒËğL¥ÊoF7”îŒøZ5 ¸;!+	û¨®C£»¥oIØ\Õ4¤(ë%–ŠØ¸ÃœÏ‚Ë¡ŸÙ˜Æ¥m¤éLQn*0•5+Ï^Ğí¯Jj…8•Vğ6´¦«ÓÆóõazã‡†ª*Ó6‚’}Ó·n‹9B©Ğ+°j<•h®ğƒŞ‚ô·^gZ¾dø*Û3Xjœ}#»Pe\–õ²¼|Å•írd¯KÕÁ¹ô÷:ŠÂö“$Š’J¨’	¥ Ù`2«9¼©½Nt(–A¯X¹À  « š=>    ¯!„¨8UÛ Œh…¤RPc{ÉWuCJ¥.©k›Öƒj~¾^\òšB$áìv(ÛsèíU»áÁ÷¼–í{Z£çà6Ñl¬z¿¹BÒ‰ä ’Yjf<Aı”“	cÓd¤×Ï—¾ÚRÿ—Ì Wdğ8ÂN¥!¹ar¥TôV²zì+ø«¼ÅÎ½½&TW®hmØÂ6Ü§Î²nŠ©éï^6[²	ãÊA{XXB7Ù–j¡
Á‘ÔÃÔH¥%XFL–*g\‚yy–$2ªØMÖî*²²¦Ãq¡hYÅÉ9lU7£’âƒ•ÅP"@¡vŸÿ»m£ƒÄ×ò®«EÒ¤§÷«W{÷Œ‘I‹&^{d·]@ª½–…ÃùŠY€ Õ¤$à‚6!¶Á¨&ğ—[B>w¡¶­åyf[:¼·µo8¹ÅC[pÜN.N´uü|ü€;úrÂÛôÕˆY‚HÕ €í±,å7ëIŒJ=ƒß‰=@”K®œf-L¤%:ì,ÁÍdåY‹¯ĞÏ†Wb³,  ¥ =U    ¯!”< XÛ¡ Vòá2z­Ã5X«³ª8«, 
¼¬ÛB…õqròƒX
²N?´‡9x7˜F Ğe=³?¡€¶QhM w4u´³°ÜÜ’¯=Î;XQÅ–\ûÊÓÁ-jÛíÊ#=Ş¡@]vú¢¹jyhßaJQ5–%*ÜŞ[
dd“e•a…†œŸˆŞbÁ5Ÿë£KüËîtcÚV{/U•ßpßíF³%ù”ïs<L|»€(«QâD¤ùj|ÄW¢ëQ‘b2FbõLK%%ˆƒ`¡…«´e\áİQ¶™mn¯Lpº]…Û³x¼¹PkFM+›ê%ÚrÇº…ƒó¾İ “Gi‘w‹k)T˜C. ÜÄCeƒ´‚R‚6ˆS“WÕ‚¦8IÖ–®±³IÅk#÷!óIİ¡…ËülabÂ¶µ†Dgi«¿=ybvE½ëb¦‚+<³*ùBà#dBlJ±Ij®¢“¡9ì²¯)Şjó!hT†ê)G`i—Î‰Ís?  š =l    ¯!<†UÛ!2D*ŒÖĞœÄU£˜Õøj”İ°ò¬½jZ…ÉOEîÓıfÍ¡\³
pË~ª‰9Ôy(r×"è	¨‚ád”võ3‘	±|àEB‰£;ƒ1F‰£PSeHvŞ£x&päzî"òäñ#43ÏÉeL§¹æ¡ì”—-ŞTğKØL¨Ë=ÁI2^IöÃÑ¼è˜¤ºÆ0Ù¹ÿ!:oß$›È’¸Ù½ä ˆöÒ´º Hc±a¸™êÄÂ*®J
²B‰Z#z4”özlˆƒ7-ì?­5Ísv"Ê¦R‚ĞÔ8ğe—'_ŸA[’î¯¥ø{_¬q1<>¯¡AüçêÑoDéêÔ½=‚°jø @fæè–ªG$$dsg*IÙ˜%ÅÜ\ö¤D7ŠÁ8¤¨6hÌ·‘pp¢°9µÜ,ÅU#%u“VæÉİP1l´âf‘ZÄ–ŞO0Œ]-ò£Ù×½zˆ³´MjO]xÌ Z¶'H_o_`ãª3R¥û
ÈµPÙ–ÄhÑßXÓÆJ¤X¤¡¸ì5k+1ZÙcaÀ  ¨ …=ƒ    ¯!¼<UÛ¨²8	L+k[š¬Òñ'±E«V‚wC]MX‹OØQºÒ‹q›ÔèLš+Î0Vòò(jºõf3t\æycfƒ…ˆ&‡<Söí Q—_®zLNÇÀj#~¶…øïPØ”emÚa¬Æë€ÂrÔí¾yAF2Åï6ww¥CP)àáb¦xÖåS_T•YéÎ9«º_¿j«ò©Ñ_½ââÜ<zf!WÛ6Z­i*u¥'Œ×šU¦ƒŸõX…©vH ¤¥J#AN0´æ¤ÿ·˜ §·2‚0#‘’İ<ËEH˜U`ÓŠJ§İM°/ÊÀ}*ßÅ<ñJñæàš@Zjõ†ÕØ¬"*àLÄµ‰Zîà¨=Å{eH]1Æ…›€w±V8ÙSúÂ/xY~Š7Øwè/*Ö!^à©³Øà##ƒ~êånuç3,_¦¶Ëx§ı)Âù°@y»“å<z”²/-"Z	¯ı¿ À   „=š    ¯!»ü?ÎSÛ˜v„#	BlÓ	å€/ÁÅ²”ª%ÁQ¸ËâB-äï!¾ŠH:
›¦t¶Ì_{3[ 4´¥±Ã|b÷d.‘²ÙïºQq/FPmèt¡Ë©§U‹:ŠHç€0ÆŒ¡Š€Œvõ^Pâ”X±I¨T\¤½òò6í¿QÂ˜_æ2øÓ91Æl\Í§»Ìö`S‹êB¿ï´…€[Ãñ *ç6s9îòYÕ9ú	=:úŞóŞB«%/ÚÙuÓñEuˆ¥y8®F” Å)ëè J[mÍIÌKˆ RY©”#Ê€ÄB×{xÍeĞ­âøÆ¸·ûNÂts;]¿ô—¥}øêmÔ,´£gªCr}wo“T!ëœĞæ¨+°¢C­Tñ.À­G
½S0 ‰hEgv¡yz¡;]Ï~b¯uüÆÀWrÅˆ—µş_åİw*Ú²X
‹X¸ ¹·TTvvpˆ#Mà€   ¤=²    ¯!#¼! S[˜î6B‚6ä…òÁÙÆÍj™B‹‘h¡D¦e(C.XÏŸöâO^»ZH°ñÄV»œ±~ÓñfòRÔœ'˜nwc9DêWíñNŞ°$PÿÂ€±×1Øß/qénnsË_ûs¢Z}ö9Êk_®+3Rıª×a¼ñ­¯t8Üzâè~İ_úòI.cŞİ÷Tõ}ø#İT>#Œ¨²ºjÈ9yiòZv¾Érq‚ú–†®O€H2a¥ğD¸jAjÚ}¬BÓSfÊÌbœÅhá¦p`zk4ÂÊA°B­l(½;d%iRªc*µ°#@$=È¶à¼ÏÎ%AÈñv§EÅ¤ıÁ ¶yQ~úí§‡.ı‹>jÛª>ù!Ó*(2‰d†©PæÏ£m’ìÉ ¢:‰~jïÃîÙG›–TYØìd^L÷¬A1d·æô?ÇâÚ=\ D4®å|yí-¤¨Pƒß,ùG½z^‰Çå  W€}µÍ¡;ÃmçLäšgLó ,á~¤Á Ìi>\/×·V˜hp  ¯ ¤=É    ¯!Œ¸@V[!D2…+ywkK¾è­‘´»›¼—.®ZÆ°°»LœA!ˆ]»!mÑÄ/hó\Ñ#ËÿbsoÛ‰ÊSºíÃc@\o´›DU0ˆK!Î:üa9ßŞñkkŸkÏ”ÉZ¼ë†5Ó¡…bÆ/Í¡%‹—Ò“˜|zÖû<{“´8§%eÅo´ùŸg­4ıMtº{Êö€RA»öİÁ7’§§>ç)«×ÄlµäDg›KÂ¯‘=ç¯Dc¨YJÑR«ÄC\œä{Eù‡	'FL‘/àšïÔ‡©K§Qh£²PÂ°âwEgWMôoƒ×
˜9RêôLæXˆP ZqÊ á»)ñŒª†*Y¸õ'×ˆÜ~Cdú ™
ÙKE]™Õ¤&Ùv»ƒ½'¹Âb	+ys¨QbŒGJnwµÉ$‹ÎùjMéù‚Xq:E¶¯‰o¼$ú4ÌĞœÿM³çİÁ,òbËßnî_‰‹8LuèTëÇİˆôê P²÷^H¥§§d
€^MÍÄab’%ĞNíf¾™çÈÆæUëÀ  ¯ =à    ¯!( WÚh¬wJ,>åh1U•Œóâ:1ILq$¦ Ó·ÿ|Ò+ r5!¿y‰÷>‰-@‚#nšâúó7ìáüwå)'I´pa¿V­õSæ®ÏOûÀÀÄíüñq ëÆRºÎşI/¨£*—[J„Ï/4¡&º¬O'03Š«5F›9\&åw:í«fQ‰"Œ	³«»¸{ÕQ7w»Æ§|ÈB;!€6ËkÂÉü,d¼-ì¾%´ÖN	i¯*a™Š¨Zô§ªJ¤Ì66æC…„squì‰ìUã¯oL‹\K%
"Ã•ªKëXèä:*5Šá—®'Ù>eæ3şô›‰¡­,IÒ½i8ô¡{Ç)ğ?Êõi½/0¨ècöv…,ƒß6:¾ ¼÷$ÊÉY	Tø£Ş©×l|Õ¾ca	¥÷sN¢ÌŸÙGn€O†Ÿk·‹_O³âH.6Ò[(“Ô&%Ù†`Ê-qá©Dn›1±#‚¶¾­è8  › =÷    ¯!¸	@SÛaFÄ&_¿Ú«cg•Ö›1
qtpÉÿ—,à@ê³$^:OŸ]1W1g¥ò-¨¤m$¡U¢q%Ï¸ÈÚS’’kWÕ¾e9
å¹b0<D¥Ï„Úş¥šˆÔğ O_êcPga-5fÉl´¼ª÷G‘3oÑÔáÿ¹©Y²wqhÑú¾ÔÚæ§‡W6Or†òÈV¹u!©·XéªÄ	+BˆBPFl¹š)êmµƒb"’eqf"­=’‘b ØHC8œ¯øõ(f¨LSµÑ™‡;–ê'H¾a?±îò4½Ÿ±²!9âÓÒ6Çø§¨Õ«HÉDHpÌ3B† ì¤ğ¼@êF ºu¢Ÿ|H|5uÉrBRİûŸİd‡#GhÀ Ó9ÙFGĞnÁfzïÖ»=¼›Êën¢³j§Á•‡ÿq|=5€Ó„í2ö‰P¸/ÖÒHó ¿ŸR©#òÇB²É¬¯ßíJ3!±îuR"Q£l®8  ™ –>    ¯!Œ¸-ÅRÛ).&œV6öåÍØOG™Œ«ª`önå†Ñ)ëIt¿ëY‹¡>*ıšaÑÚøšR(He-¡_[E2›lôJx<$f;ÒbÌÄ…Ğ¹"î
anZ)%,0FÍ–© G!öş”¡•{·ûùÃ( mßaå¸®£ğ 
jğw±©Ê¢òEiœêpßM¸*Š¡’©kI:ìX­ûf©zçç˜/„á„µ…4\@:Ò±úHÜ´`¨ŞuTœÍ™ÌÓd9LHV$³SÙin6"‚¡` ”FÕ•+/«î±+¥(¦šÀ%!UÇ—VÔm`DóªÓä°o®–VZ~¾Ê(a	t‹T>êÆR'ÆÊ2!¡ºœxğŒã.'Ú5^¡+NŞZ½|Šò¦Ft yÕøª9=m¥ûêª§W$Mb™—‚±ps–^)Š!z_°©i
¿¦êÖ×¦¨Úbó@šphV½A@ç¤\Q²fBv¦[ ¤qE=)‚Â3-N  ¡ ˜>&    ¯!Œ+¼9„UÚaG¥¥sUÒëz÷©ğ3’í@Ãİ±òi™†·½o‰1©¡gÁ{2ıwNÎ'ù¡¥jü
vèN9ÓLÙ•QŒƒÜ{é°jbÌı74xEdˆõüU‰ÔÒæï–¼ëºÄš_— İÛ^WºMì¸íÏ–‡|ı¯eWšU­ºù¢ºä;
õ½¹!óË	yp"â=7h»ˆíÅÄš’W´\Ñ¥h©5`„‚œ9Ã6™#1Tc—ÎZèÙl¸~êÊH¥£ĞCÉÕ—½GmcÀXh6'
	HÌdp0V—x°Å è ÚBŒ&™×<IÁ†*-ƒ™ÛLÇzAi”2ú_	’	.>úü: Y»ŒÊ°4z3$#vè)H",dj€÷XÙ#Y	®\ì¥/ üëú<x]ÀzÌ†³05cAÜx“ëÅCĞR7#Kpwd¦;j°€ á2ŞW¡<°­ECîk×º0yØA@‹åjDp  £ ˜>=    ¯!ë¸<@RÚh°y"H$	AWI•aâ_^æ®l(5¾2”á=ìîâG¡ 1ÉİH&üÀd;dç	Îlyß¿/V<ŒÈ"y™Ìƒ-fQq¬omK†šÃÉåã'ØÇ‰D%‘ÀôÎmÅ§wˆÕ¤ÔÎ>"—}a¡3|œôåx>óH "§Îø|œ!†ç[ŒŸ¤í_’ízoÙqvt"•<ÿ¤B+uå
¦İ·‚Í«Ôd‚,kµñ«ÛŞQÆ%OoªŒ'[jºŸ¼ÃEB€ÖÈ’§¶2 È3yi&ğbÉƒg4Ul¿ş­0ÈûÎVVÖ~€ÙX+§ºUÒûÌ;üt­‰ç~GM¾V>4ìQ<I*s™e‰×¨Ä,”	2˜ lPBä[cM´†BîS“)à0ñ
u1h–›å¸.”‚FJşÒÌOøzÁÂjÛ¦şÿ«ûÏ=aÀ2+Z&ºX% ¬µ.kTÎOŒê@ÆIÖ·£ û>³eF¢$j _%8  £  >T    ¯!Á¸  U[ ì7 X´d%Õæ5àè e\’ßÃÙ3.i¿ß|OÕüOfªÎ‚”JÆç}1ILşˆ2ã`‘«×Ê×êyíÉjòKJ![Å$£:»–"@<ô48ë¥…;ä¸¾'¡ÆJ‡{ù¿Øï\¢ÒİeZwÿzÍ²szĞÚÿöÙš{mkÛËM`Îr,_àÙœÆ±!^ÁgÄÎÑTzÀU8^>úùÜ÷À¼RW!jÑÈIiğ€›<fçœ!Ÿ"S2HÊ	\¬¡p¶çâ]Ql‚ĞX¨¡Y½áq¸Å]®zÊmnW.é$²V8Éïáıè÷\’¢;É£Ë‘˜íîÇ?F^SMçÀ3ğ]@İ7SE&g‚E ºŠ˜®•iFt‚0,~rg0 ]!¹ˆ‰¸´Ë¥­şFH·ê†ôWà³¡9-hÛIÛ/&S³%Läò@id©,ÁĞwöË…œÃQXÈ¯‰.Â<Ã“(4Ë«´ì”P-™jL\Ë«v©Õ^‚Wt²Ğ‰8×¬R¼HO ¿q¼eºÑ¼Ò…‡  « >k    ¯!Œ5@SÛ¡&	H,)*¤YNm·ÛË¼©Uwy©,<K#ê¸$RòÂyşéÄñ¹š6?«®õ¡ˆ)!Õì°Ï¼Ã•ZGr»àÒ.Ô,|dK¶Nú‰?‰à,*5uã,@÷ŒÃ\âô—Àe%uıÚp^YzÜš·u´İm×« "ÀºÆ 0?â2“8Úl§á(ƒå¼ã99Í=Ò™.¦ªé~’Ä÷bjŒ#.Ô1Œc„Í€»\q\°§"jåX”Šá)‘‘2–V³p„¤%•:LÁQR‚1ÍâÑïõÊ…}ê•J²‰G2‘´góš—û¸îöåöîŸ¢¹$Ş¾2ùÎ]r’k±=QhŸ‘ à9Ñ‡Éˆ=CÜŠ9ar…dË²ÚäÈ Š\„ìb¯¤ÀÊg¿ÂP*0mò(PŠi5pˆÃ!ì6w@ÔE$iEPÙÉHI]BÕo@:ÏBSJ\‰«=Ğ¯ª_0/XÊh€Ë±â¬M…k@6xÁ‰j  › ¢>ƒ    ¯!Œ­¸4FTÛ”v(ŠqŠ@I|õ¨wÆï8·ŠqfPÀá–üÓ’4¤o7ÖGğIJ-ç*hçpPNİÏF<©Pb¸PšbäÌ¡£±ò©¯ü„ª÷¦rI'ED¨³(O˜¯ù¡ šØ67¦V2½Ş™Ó¦+óNf†îü/F±£@)•¨„.u] &yœN‘™›	ŸIÃï¨¥0>ŞEcér·uåS½şy\/-DN›F­U)Æq‘ÄŒ.PÆ]Š´òTÄ½×-5rËÅL÷ ²]ÆDdhE€{ÒwS[!L(Ø•Ñåº®o}»îÆSè’À)†l¾Ø”¨9sä,QL¹¶òJ/šõ^ş½ø6ÛŠ‘~I±ÔÖ3
áP§öcË¢“à‹š›á4ğV‰q“mëfleÚ	Œ%#	ĞT„Í‰ß$uQ`C2U$šî’T"‰##Â;¬Ã ş‰JVÅ¯6Ê$ êgõxsÀpºI\B šà2® ®RyeBÃc ‹€  ­ ˜>š    ¯!	¸=ÎTÙih#…S€„¢Õ™§Õnâ/íoeU1x4’ÁVèuvmOŠ÷½hÌs¡—;û~¨HÈ;T·ŞûÒy$L;ß—I\—Äs”v¤(0¿O-0Íƒ‹Ë‡0 CN¨¬¶YÁ»®e-_©íå_…µ’ò)d‚¤‰½ ñO¼ôÈ‰³ŞuV‚|­l}¤ßuï¦‰}ìØ’âà/ƒ_ŒÈN9ÿ˜"ñ¤ĞêÂö]ªù^7wÃ¶óx‡7A[j £YÊw@#HKY«E£`Ï(Rï)aüŠÌ. C-`)-4V4ˆ¢ ” ADOJ‘V²»ê±TâÀlgA²ŸuZÊ?¡ LùÃMEn"#XÙ·z+%Ì‘$€İyİûSæ½' ©Ûmü( }H4U$•‹>ËÏµè0Joõh’ŒT¤ MieCqâUaø¹Hd<TéÆ{&ƒ+×f®ÑNsÂĞ¶órµ?\vg9‰Ğã"$7Ä<ò"x %h§€„×øSëH–Œ2Ö  £ ‹>±    ¯!Lëü}îQ](V6†äA€ˆ` ª¿U*œÛF@Ÿ‚^1}çŠ;YƒNªŸ‚'3l—*fÇRº8»ñ2·B¾@"6$ŒÅJwfŒÍzhº}švHx[ÊÀØ!q¯+r§nå­ÅyÊ‚Í”˜DéÁH'-Œ0ˆŒSAÒ­ŞŠ:¥JCÈİ™@ Òázš³yáŞ	…Ø Á‚.<»4†××!o(p¾’,bTyt'w°ÆQ}¶ZÅ]ö±Šn£K<*çàÆ«;'bëa—¢}aÙõåYßñë=énæ¶¬:fÎœf$­»’ÏƒBÕ-­š‚`™Á@áU»fiZxë(¦ÀM!ètÿ¾gÏ€Æ6v¯¤¡åäÌÆÆî–
s> ¼gdşl¦Íáåé(cw+Q(ÆÃÍW‘ªC¢PTP )¹-Ì8+ú ÈÃ®Û ÂƒˆÑ>ÆZå­ 0„‰3úïuûM=ŠTT z¤[ı¨$’ m[K à  – ´>È    ¯!İŒ€@€UÚ©f„…‰\îò••wÙÅÊªÚl£MX/Ùú¥HG…|eÕÒ<¸:Ã[Oå1HÁj›ŸŠø0Ò!ˆŒ`cBšû3¡sÎhl´G.Ş‹Eß+CUÈÆù~eas^·.p¼ñjõË^k„x@I–(Î\ê<ß.¤[3›MÁ¥báâ;óÌB/“)”²W‹s:f°®‚Ôú XAF8ÃÏ­°êöÇÇ=„p­‡‡ØärHXÇÔ¼«^_‰ÃçpØL Wåş" #t‘ûºö
úRV¨*
„¥a˜‚·pZ¯šÖ=¸Åej¶`¹JÒ?‹(E.-ŠâoÓ“gOôÙŠóˆ×›x ¾bîã¦¥Ÿcğ§Ÿã­@óÉ–_Eà|4pæÍïwĞ]65«ßWV¿Ô«ˆı¿ºàÃŸt…šh¡&ÅFu—1: T`nœ,èäÕŞñŸYıÄùÛÒ 1H˜øÇô·ìŸª¨ìvÄ <ÃÛZù|tÔL}2Yu+ùfÙÛúæ ÏTçşôÃƒãp6Ø9ÊmÊ¡qYO’9‡[~Õ—  ¿  >à    ¯!   XÚ ì´Vc§5©âû½ŞëWÙä¬ÅÖD»À#a«|îî]Ç<ëvó8lÕ\eÒT0¿=™ş'ÒåşXß¸›«ÕÖÂnÈxQµXÈÎMé¨4‘ö»<R§eªs>Â§%Ãìı&s`vú2bÅ(	¶O4ÊÆ÷±ãáK@4-x@ÌZø9©VSNÄ¯Ü—¾5ÌÔX¼©ù³ƒg|J–Ræm0H†LÎ /w‡ôı"‘'ğ^:}ªk™\xEØ°‹1Y;–…ì‹aYŒ¿Ql±Ü(¡X0ÛË•UóÏ³PÌ]SWJêù<$]§xŠêÔt‰‰aÈôëxN¥£v>"åÉÀ›Ş4Ñô±c´šG©²€¾ŠqŠæÎÜ5Ö"³3	IdNRà›?@ü®ÿ)Ğ(ª¸§¾MYsäŸwä_ßætE¢³ºIŸ˜ˆ‡uĞ ¼/áRğAQRLQ`045œë.5ÑĞ¼ÉÍ ªŠ•Õ`«Å1
Ş èíüBJ¬¬UVCø@¸¸§ñÃ
¤ˆ—ğ°À  « z>÷    ¯!
Š 8  U[ Ì7	
.7ì¢»¬\b^A3W—.tŠİmØnZû9x)¨aNÉ|I@ãËS¶\ææËËåİdİÆ¸©%äe2µ¸J/W	 7H¹E(r[Ã' ”__îh0Ã(éôY%kğ dBÌf+ ™Í øq5iqCGt•®ì«‹·d·<M½3lŸuT¶º·]5ÀLFµb®ÒùÓa(:	úa†YÈ+-Ê
÷µÓ¢š¨¶è¹ŞXîNÙa Ø(!ˆ0®zfTä’¦«w[*–sì<¢¶†) ı7a Ò·N&€ÃFR³…!¡-w4U¡Dñ_\µaµ£R¤bG¼9[‚eüp®åèd‘f Pu«8š”
E—
×ğÒx’mNÍ\rw¹Ü5,j"…+´ùFs13RıeTWê6N€¹2äêµ%ªC%i	H Å„t‹¨-0qŒ A’·p  … •?    ¯! ¸ÀUÛ!.6	„ˆn<®¬ÂİëÒyÅ)GªÀô®.(qÚEErUS0ô¤7ÕP~M˜²ñÏ9³×Á°»_ª”·U7'•ßIÈéÆÄ&IÄc?‚ìXL±IøÁQUwŞÅ™_¬bZ{zÈe©Ë¢÷Yº<ÿ3Ê%ÈªÖdšÙy&o€7Iê-‚~@Oıf‹{,“nyv’ÒŸ[òÙ#]ORb[¢bM7§¶H€4¡¨N®¥:åCX_WFQNv¾Š€%ªcĞBÁg(VòNuÆî(¬
j.²îÃ^öêO
>`‘º®×ƒÄÏ87P;9`zg¬BúÑ’ÿı·û¦ñğ62ŒR7lQeÑŠ	@šÉË€Â¡md‚c†‚áiäc½mÒµ:ß_(·)€^Èp6a¢úí›ª•ƒ+ö ,ªË P zKoXÊŠÑt“ĞÍ¯¹÷K:ÓÊ§t3Û`›÷jÆ4“·*DÔˆµ¢6äÚoÙHºŠÿJ–”,ì”†éªÇÀ    ?%    ¯!\‹¸=OVÛ(¶Gå5uw¸+//~³®ŠUC¬]ƒŞBÒÏkBUz‘¤Z²ev¤rç£:l‘ P%°#UA|E‰y@ÅŸ5pMşÕ4áeÌü1cŠËó¯1|¹ÕÃy¿¼-¿ö¹–1æ}÷j-5Rú}tr˜Úcb° öÌsŒîº4jÖÇ•hÔ¸Û…Ö8úˆauLŠŒ9¦ò¬¢õµŞ¼¡ß`Çq¦WD‡¬G0˜ÈjjF4•‡!©IÎØEihJüı’€]®Ä€±PlHBN6¶Î\Î˜lF…Ö-{`´ÍY„Ä
;·’”)”´¢Í/îöÿ5-7mÛQ%+©°A
pxù_«Ä‘f.ÔŒä„Ç%Ë±^ºf³U!çH³¸{çbD¤¯´°m÷ç‡Ôw†ˆLğèì9~äÜ¶™™’e¡1e qNÓT‰Çí³ó¼ '@)PK€  š Œ?<    ¯!H‹ø=şQÛVJŠƒa)@sZ`ëæµíL9³¸q–ÔãÈÂ|9Èßõå‰<´òãPLùoN…éºôã§OÜélšÂ,i@,–|LéåÎÏ;B„c¦”İèÑ4P{ÛP€Dä ÊµJ²&Û÷?AãÑı&…Fy~‚@^şÒÁ¡`&[vÅ¯¬ãÍ…ùuCÊøX^ »³‹0`‚;j!r?Ã¢<ˆÑ’;½>»ˆ]ñÆ·+_îÌÊ‘Ğ‚YÒZ¯·7Ù7T¸­‹ÆéØ–úÔû9{Ù+€	B	ašqŒ%„–¯[†hÑ)‹*,ÔÆ4ˆ"AEçÌâ.ª†å¢ŒÀ(1¶fØnù[½µ¼UÌ
ûÔªI’ü¤šEx»w¢Á×ë&\>'æäÂIÓ3|c`s0“2¬Œ`LöÔÓ©4²9B8_ålÁÍ9İ¨¤1æìiå	J4„"¨Kƒ1‚P~{g vpV)“İPš£•<-š¿#§œà  — ƒ?T    ¯!‡Ïü?şR\¨êFŒÆ(ÎôÔ29?'ÀİPÙz¥¬N‹ÀáfÃælÖºä¾°Ó"¯q®2+•¶9ÄøÖ¯6·ÎÆ²Ğbôk:1å£Œë	€ÓÂ$ç³-qÂâmaA£Ìï)%"İÿ#æ§ eº% @fÂÀ9á†z!–“Ìˆ)t¥4ˆìñçŸ¢»j•vn¢+kcÂ!}İ˜™ÙÇÇ0n"@FK¾‘eL¾îÚg8nÊ1¶ãÀYÙ3‚æµ¢,ÂxÛ0)r¾Ü­ÊûR³ÙÕ“¦zâ†P5¹Š˜åGM°Z%#'ªüõ‚ë)¬ÌJC£aˆf#D¿šöµ G‹Õæ9ò´—¬EXq—a£Ê:¾œVh6B9d25IKÏr	ø£KŒ6»3U4JÁ=nd„£ÊVIŠ•1ø§eså,£'~İW<è)”ö1,#1Ü¬OWÎqRËQ_Ì$hâZ¥rrp6e€Pâ½ÍP p   ¦?k    ¯!¸@R[`rvH*EP¦3póàöÃ&à$™¤
R¼¯3h„sSç±èB°g‰EÆ·Ï?rœÒ
´(»Š)‹LÁ™²L¦Ö§lÎy/‚—“ë.ë=9wió¸Nì˜ãáz¬¶Fsã¸İgxsü¨k|eÕT´2İ$ò—BKŒŠ±âú†`/®EØğ|i[ÏÇ7Œş®2ÈP¯’Â2hnâ¢wº™ 5s"ú:Õp­m¯wXÒ9+MŸX£0Kµ×?g8ĞÂµÌJF’öT½öGj‚™¦àføÍ;×Ûêåw«ª¬UâY
ĞSÛWá0ƒ•„MiØÑàå½º›êın‹Z 6Ü´÷'cÉFCäh6U=“phà½Œ‚¢PQé®Ó>]Z×„ÎÕìMª§ `g)&Š°yiÎW°ƒ2<–s!PIs#m÷™“™Ö „WO($ Ã=³¹[¢Uy.µ(K†ı—C½nD«×–½hÛ^\ú£`¸ï,ˆ&µëË%T’/âº ø€  ± ¯?‚    ¯!@8 T[`’‰†‡´õÁ&YâªÔ×„öŞ«`jÖ±àu‘&ÍÍYÚ Œ0÷Í(êÖ®b¥‚<NT6Û_õÇdD"s&ôHš0¸R~Û³nØÃˆû:ÕÔ «5ƒ‡§‰íaS8Ş7Ìˆ$}P³W&Z`]ÙÕCˆHÏ|86&ğùö8íÑÎGëÿiõ@Q©ÃFÃgŠ®z|îeßm1è_§FúËø¨Í„”dŒIã/ ´EĞ¢zª•¤'r¶tË¿mƒ•%µ†äa X(‘Q)\´R”ùÓèÙ)ÊæE‚Ô°Õ®]<2÷Ë—õ¸µ0±¹p˜Ş¢‚¥3tšÑ%Gv…W(ve&Ÿ·T—¼,Î
İ‡Ö×Ñ°ß ^iûwM¿À§âÏC_×åSíĞ6ëW™ª÷{L^ìñ:+óŸ]-¬—¦ëÒWÎwà·ËBWØßsp}¹æe9-—.Lh¶£qj[­™÷”¼ò ›øü-ÊTœñÁmæ="Ûáe¸g8£bÊRÕœV!Òôî"í¡$  º •?™    ¯!X(8 SØiÌ7+	D8/{¹eÌ<5á®>Wç….Qk–%1ÔÀÑ²“è¯Şà¹ªº>‡ÈV.½ío>ÑŞë¹ŸØ´MXõâµÕ/Ü¥—
Ñ˜r¿$‚;<|¼-\¹]—µ‚+ßÛf–V~Õq:z²yÂ$—3}¾êÅ®fµ K‡4÷~¹{õŸÏ!z¹/Hçú…{«Æ¹i_Œ4ëy­B6í”XÏi8ˆÚ%¯±yìVÒÜY@JSàePk—%L-q°¸©.¿A­Al4VÖ3…Œ¦&Á—91Í{óX†É”š*¬ié:9ÂòêrZÊQôÌ½S -v˜¿7ê†-Çı¢?† ğægª¶c“}=u¸0n„ptO6vÌÈ­±µ€‰œ n–FIT3ÒE3©¤ÖÂ%ÄŠ­Ì éfÙMo|.å5®®"±}øêìxo $	ãıch+¥Wı¼XIlR_"*»„ªúíyˆH—éı·+ĞĞ‘\QDà    Ÿ?±    ¯!‚8@QÛ(ê‰††VTb»yğušÆõNnQ«S};ÔbTû·KîIÇ]WrVúL€åQÌoÙ‹EØÀ«ªÏ¬Ú¤yúš&Y*e79rè ƒp¿¹_¸àoXbıË3£,õ~·èÜá½.æ2¦>R2öf%Z¤÷$„>¹™ €æ¾-í7`òéyNÅ;ÎÅ˜äğD™”×~,şC—.—›—üóKbıÔÛ¢èzÀ0à‘ncEMh)¡ OU5¸İA<ÎTİ(!Ûœ±PªŠÆ ÀXH`
VÍW‹RíF/6½®ñ-¨$¹‚3PîìPŸÍòÿF¢İ’Oµ™w.J¦é5…Y?¾™i·K¦6Ğ ‹ïRW`bÔN£ÒKÖŒ¬¡À„ #Î2tlº|“Ñ„@
Kª§'fãewHÙtKOb$ßww-_Í´f£Èµ·VïÏv‡ÍêÛ#—¾ÍµY<ƒVãØ`£‹­¡è}h=ïî!© 0°‚‰™àzQ
ÛI9Æ$œ¶  ª ?È    ¯!—¼-ÄQÛ(’J	£«…20Ì|{&â•ËF¥,'sĞq4,nI»½¯CIFUw+ËK{?5¯cƒ—%
8K3æmİ—3eHÍSˆlY9nßÇøùEF¿Ğù‰µ_Ú[1_ëK=/<“Ğ?—AÄp{şøÜ 3{}¬·-ŸZ1mÂ«Ş÷•—æy§ÙJU)UÛ?‘şè©-ş,­_o~÷{Ó®÷öA3¦gz¶Áàÿ¼‰@ ”
Få*ßwº|	€Wr"´sâC(•¬¥U3q¼O0Cf¤2,E!”&R¦ö4È.©‡+ÓAíğ:<<’€ÛrØò±ŸWÔÌ/l¿a‡å$½ù·OL¶Æ’aÁtşĞy=rĞJ~m:æº½”<	‚Ó²ï–ê7‰û¿	¾4Ñ2pU’åĞ[H­`hDZR¤
õd®Sx¹¥R›†—v³1qÖš’
ôâ ‡II×ÏıN{i€ o8c-9Å¤<X§[×4ËÉ(¥}£¿  © ¥?ß    ¯!O¼1ßT\68‰mKUã7Ôªyû8ÕÕ2“¬á,4üâtû³¢Ü-ú2K†#47pSx8åx‘°2=­Ğ ğ…AÌJk­M?¸DD{­ŞcŒ`/2¾Ç,
ÜË¶í›“A+M&pœ¡‰ãcas³ï‘­z·:úıÇm6]oÀb,ªj¤ïJRŸ(™†I-}fBğ,33ŞÀ@6B1:!mD$8·{Ä!’ÌÄdŸ²ÀÓ_s=fÓş³ŸVœ€°¸²ğ¼ 	„F%	5ûY©EJ˜ï×Kd –X-Š0Ğj@Œ"æªêŠt¼1Ta} ,¯.	2’3Ú²´FÕ[\F“ÛÙ§¼ä«›cï)yH¥æqBT¯=†° <êÎó‚ÒË˜ì>qŒé%â¦@Mi÷ï!êæ-8@IîPÒ=I".Ó+Îå´N~ûx8ÖÉ6oôÍä»£ózÓº†?—ïk+@ºìZFğÂä‹Ò­æ0ÅÅâïg¯•æñQ®t‚2€H€8  ° ©?ö    ¯!Ñƒx ÀTYélH
,!ïğ¨É“9Ç.Å-¥„™¢0ŞC¢¬‹âM¥WŸ¥îHÓ\·!Tÿ¾õìşÍ1“ºƒî.¬Åpà³% RÏ	)§	9Âä" O•V’è+òjôkÙ”;YkÆPFßZ„ªjBYÄÉ@yáXÉH®ÊèXRœÈÆlk€iı`„ä[‚ô™K€ ãÇ$B§ÓŞ”°à6Û¾]yFö›÷U¾Ñü €W¯AANğ¡ÖÂ¹€®çI¥D,¹kpÙ@ÛZ#JËºi±Mj¥1" œt›¬ª©IfÚa—‰ê€LdG=]VÊ'¹6RÅïüóÁ«"¶áj´@±Á1ò«`°†.MCßz:Çh²NÙ;²ƒ·L±ÆXljÀ)(›ˆwÙj¨µ¨ÒÏazgå|o¸€Ã? ?Q–ù‡Ó!/=zÃ©xôÔ £ô^èpôƒ˜p›,G÷gv)ÃÛa!""õK²oë'şTåRÿÛö-D)¨g§TRhVÖ(›¼âĞ%Á+F¶¤8  ´ @    ¯!U²âDR]ítUUî“)«ËªFSVDŠéı…c-c¯7$Ã\¨ÍŠzÒ¿’§¥ìÙ:KõäÜQÆE½+ÿj¤Lb¬ûzÕJ ¯[GÆ0]¼Y&Qœ[„$ß[·{9»…×ä´á(¼7^äŒ¿ xÖºÙ“L™ü_iÂ€2G˜g|ôé¹ùîbzƒU`§b¨øÙ.ûJÇ¶d¬¡*Å>ÏAªÈ³$Tk›:µ$F .ØH€ªÊŞ*²_‰¡Ÿ
¸f˜£fu–È;ÄÃA¨Åj*MÔôu´—I„ØÒËĞœ1^uÿŸó£ŸjônGû'‚«62–ûÇ+gù73‡²·ã¶A•¬ı'U_©Fcâç4ˆŠ5«uïä­JÓ &?k'}‹%ô#’!ê}Ô2+·Ë<î˜SõD8 È9Ö´7¬À”„
XÑ‚ç÷5ciÎkÊå!Ã7ªE"13~İ«*T‰X¹%®Ö*rßÜH:W6ÒÔlJÄ›wÁ¸ğ ÖûJ·e„ˆÄº˜KŒb“âjà  © •@%    ¯!
 ƒ˜@W[!R
B-{Gƒ…i•FÎ6h(ª$¼»–}KHæı“è{GŒ\”xn½ªJÔN7}2?6 ¥¿Qõà¶ôáĞ-)ªß–íÁ–¾÷)FsªÉX`ÕiBbŞj$O_Ôê¯Îï‚©A@ûBj
/SHlP“çÚ·d–¬hĞUÎOÙ[lşy*C°!dØß/¾÷™FÙŸŞÒÕÇ”y8ÏÒ¹ƒ È££Â”J-ô¦úÊÎŠÑmñ"÷[;–h½_º„¨í4vB\ªÅdts”½fÓ§wÍÌFÚæ€ÛÌN'ïoOår·;£næbãù«w}[}&ƒ¢q`zæ/ÙRH4œiòZ.tÀiZ+HW(>İ–y%Cğ’å‰ª,Iïj0¥»OÄnLí
6iÆ‰9Zın”“™7{^jÎµÇñ|ñN¹İÓôøO1p;)½>¥}ø›¡Y‘=³›Ó=õNşÏ/ÃtüEv‰²¤ºÀßWŒ ÕvœjÚ…Lùc À    ‰@<    ¯! ‹¸ BURì0ÆÄ“½kIXÙ¯G·ªâå*¨œÙå%Àì{óïeí„ScC’qè‹©ê>­Š~Ê~Üœ?Sí*1Û¹ÅØuªLğÊ©fòxÆiéÙ_œ³Ëøc¨ê	•ux‘œE›ó¸:ìtNÖ¥éj'(ƒ¹šCˆ\’köTK{>C %CKí8ü÷oB’íráßF˜á¡-U¥Ñ¿	Is+&_S¹!¥C8¸ÌG0Ö%%¦º©Nz)ÂFJÊT²ãwU`šCu›\”†2€„Â:…gzÈZ ÜR°é} Ç¡QûÏBŠnúšŸ;Ú»öÚ–OÑœ;
I¬K’š’»ÿÊH&:±')æcEbğ’ÌobÛ¯Í7µÖdqÃ_°VüP’A^–Hp;ÅE‚pîU KàW“¨µóW)¤:Æ†š¦î‡CZOÖ(ÕÂÎgpíÉ²ÊŸq åj!Z@³3Ì)qú(§™Ç…ÆH[ÒˆrRĞ!  ” ‚@S    ¯! ‹¼;ÖSÛ(²„"ŒX‘Òx‘@ô|{¯‰ßTfÍ]ÕØ#´ÃvßÈùn€PïG¤={¸ÏÏ?œÂsÎåŸ à˜%SÂxÙ¨£F›8]ã«ÇI}	”³€‚E7Ñöªı3×ªjÃàú]ïˆí=ÃËL0géı6s†w|.Ëgr}i«¯³såëG„ÿG Ó7^Sáƒ<±ù!ät)Ã%ş!b9c}€zz›Š/÷1VŠ´¿rÁJQÍŸƒÔ…3 Ê&8ÈÑÔÎ$„¦m¸í¥MGtÀ’×bX(30‚ €GiÒŒãbC½e(%ØE°ÑÙnZ¯=Â­‘”¹æóŞ´(ôÙÜœÒ†xBO3D†Ë¥Ç¯nÚ%N1 TÓ‰XØ©¦ü”æµ)“Un]ã»>ÎtŞ©|ïÛ äba¢I«qe8šëó¾wJZ1×œ‰Aù,=Ú…-\æ6¸“6…*£N0«—€oñF²ú–p©‹ÁiÖÁ¹7³rÂ‡   {@j    ¯!+
Â¼?şSYj06
Èk	­W½³…')ÇºúŠÊ+rÔ}12±jFõLáÏŸ}`¹Bk|º¹¾k´‚Ê&Ë`üN¶m©&ÀY+Oı_ûå
R,%ó x@™_÷£ ŞM¸†ıL6Ì  Çy:2ÄèNÿôÃÇRİ$RŒg7ãª0¹Ú¬B­À8–†ÿ­‘L%â4_
*sVŞ`ª°ÔÍ"º3¬=öhNUÉ}´Öa²Õ`Û`Â"9#J1s¬{CeY\uÂc1~§¤­ÓC$“)r…”ÕBF€ˆ ´Òlb¨Êu+‹.eèô¼¢áÙ÷†>f¯îü‰ ^=üõ”‰&×y=z×Œ†=(oå’òäás¤(‘ÑRS(­œ!ßkVäôó*é ´ÊĞ,–'+åœPßDgË™m?A=†„é“¡òŒSÓ÷Ï-=–O²)Ğ1H<UQZi“ªXà  † %@‚    ¯!M9QVL¸h*ÕFh„­ÍE4Êªß`†åCU•zÌ¼V]94ŠF |-“(ÔãwÇß	³íZ¨Hºú¯ˆr€Q°¶»0SüÒş?Ëíğë£v
êä¯’
Z›˜ıd4G]@a9ÛƒàÄŒøÿ­·0Ïú,G[ú-ƒnğèWœäk*«¨´Ê˜FŒÔíØÃ¶Uûò/qµ¡¸¬VÏ®ë8åáVi£ÕïÕğ¶›%r;®¼»o E@À"##Ç.¸»XÕW…³ß?<ùVßêË|4Ä+Füº1º%+Ë”«­O»ÙX ¢½Ux»WSğ]vË¬4t#Ö$bk{ëâSä°”w0ÒÑ•ßÕÊg7Êöë,İmy:K‘†®ñ;¶¥‡CR5‰„é¨à("#ˆ\DÀâ3BÅXÍ	ˆÑ ª 
 QZ¢’;¸Øw•Á@X«G‚PCa*>¹,º) !¬ÛGxR³öjÚØê†È†ÔA´ø©á‚—®a¨Æíùh§Äüà[TJ)wËh£8€c*OÎJŒ…ûœÁN	»õ¢4ë‹Du:\"Aˆ±áa‚Üï_î¨ouƒZTºş=};øê‰o¾ÃHSZÂ*§S7QZêMı­™WUèĞRJÔ
\p8]°K££Ó5¡=Y¥bh-$Åã•Ö­Ú•§–/êW×¸@…Úß€  0 ˜@™    ¯!{uºÃE
ÇŞËÇÈ/‘tQ(°ĞÌY\r7âZôß4›¼¯kà¾İ’®MqSíŒğâ²td@œWèÚÛ†šæG 9 Ql¤ÈIS¥	òAQßhï¢å¼=½W·§PÖ±Yú¡SHV›¶ı!Â»ñ/…>ò~sj —®“Ç”Æ®#r¥†Ëvø]ÜEI†^Rò
Ÿås<1L³Jé	ÜFxHÎF!mÈ©Î$÷(œK §ìÇˆT]“ã<,¾'D X[™HR ­vÓ¬fø9Ú·Æ¹KÚ0ºK•a«'‰İâ]t~%yA›í{š2÷wk{´3Q…S³l„îX›ácuwBWí‚&‘»|”Ìøwy oz¡óâŒYc,MF9zUE~“àÅ}dÇÁÀïƒÓ¹Ó2@6š±jŒ]fØ§²•üké—D}Ğı
¡Ón¥
%SâÒBknğ°+Å_¿6/!¾Vå %
Ö.ı}Mpc&â²«“F6²–B1íÊâà  £ ¥@°    ¯!À8U@UÛ î6XI•ZÛäê¨äêªëz¥F)Ê&•‡9ËFcóÀúF‘ÙvË†)ÅY–m|Âº?8ÛşûV‰ÅÒÈÒ¤£†©`t"¦Ô¨Ç€Í‘?Z2…a{ÄY &›.÷g’ıİ!¿ª¶%*¤S¢/{s¯qTf@t.7j”í.6ˆn“”~ên$.³¦‚…y¼kMQfhå3­F¼mÇUş¦èë^Q™¢6ãïÒJÔ@f‡UÍ±”å|c"”‚°•GåucJØµ×´‡Y#%*¬·AØêAb¯oG®¥SÄºÛ‚è™GV1o•!F¶AÚŸ¥Ün¨d¶“qO^Õ²İ:·xw9…ÿÚŒUy<SÃ¦
¨+|åå”Ëğ‰sdE"#ua$iÂŠ°*“µ³à\­½ŒÛVÏª,€›± ¬Q€	Æ1ß/,‘àU¹ME©(·ouVU,µˆ¬
×ÆøD“°¬FØoù'ïÛ ²JíqÁ+¤$n¶¹Brø‚ÉÊÀe~Š²¤kÀ  ° ¤@Ç    ¯!N8 @UÛ˜n&JV¸ÍsÔ2ûsuÍûx+|lL:ë*eFQvÃ±§U‚¼BLGqøôÇ?[5Ø'0¹Š! ŒîYîĞòº]kVU\‡¸‚ÓZĞa¸óùP§auÙOàLŸÀ)©_¤@QNÌúfÛ‘1L‰!»»‘Dø7hW0ŞázŒÏˆ¯%5'“ùO„RwËp×ÂÌ/ò}m£a|sgô’-Îe.;"¢U¹_m¡¦2‰uÎBB"X/á§‡LûQzmÙjw³-é`tÛdŠË=%‡Ac!ÅiÅ_šfI]¶é¶Îî)}[8X2rÀ)Ÿ—Ëà~l+qRe¬(„Hı`é•ÜëŠÅÌÓu¾§ê0ŠÆraØ‘Š&`XPûYø³l*ª"s+Íz¥bÄèÒ¤utô´Õ	±ö]g
F„M2;µ3È	S'·—z	»K"»ŒQTğ.a‚`©;îNÏ
d¾¢4èn}º£=hmÊ+ÜÜàœÖä
Ük¬Ô€ı"ùÎ ¢ŒcK¬Z¤­D±œ  ¯ š@Ş    ¯!¸)ÀTÚèÒ(*ˆ‚P Em6Ö±pîšæœVôa­Uê‡BJ*õÇ6ªÑìuïA®fêÌšhßÙõÆäÔsÓ7%ùı>FÉ‹|ás!cÍOV‚ˆ{¿ãôo|Ùïz6‚‘Jõ«[Ğ¸±~ËP7º&Q€AŞ3„¡9"ÑU—„yYMùMw¿q¬M„˜Öêvh–×À†;uÚw‚j˜E—«f
‹İ%ıÌ£W[Š–J×#şŸÅ¤k„'ıf[ç1É	ÈÃ:^­bv„ù%-v¢Ã¼¬dëuÂ’ÙD‚1b…€„ *´¬Æi†ä2é>R°XP¬úİvN$åVVÁÊœR˜S–	oˆèåßÍŒ£A˜¯¿SUª?Ø`îÓ{ÅâJsŸ,*„+PX±µ
Ép¶i6Lp Ÿ†"Xa!Šµ, #_kô;°µÍ ÀÜUáÿµ÷k5|ô\eR¦«y¡_…_Ñº•æ¼Î©2î{À¿~\íÂrA3©È˜O‡“ép8  ¥ v@ö    ¯!„¸ôUÚiPGÂ6º·{¹f3½Ï¬ÀÊÊ&šjô#EVÒi³ëzf÷cÕ[‰ ø²ù@°ğ°›…–fe©g…°úDaÆ6¥“è@\éÈ`zÂà‰Œh2È.s»|Ô@¡Õş{U¨À9]ãõ¨Ç›Eœ#Ş®³†öõK(y%)—)bX;­C¨qd¹·ÅQ§­ßµŞ°2·`´¦1¹ÜÔÜ-ÒâœW“œ£Ğq%ƒDöEU¦áƒœ6y†Î‚×Õ4ÀÍ` »g_ë0EJYCh’JŠƒ
‚„Å§Uâ\ÉAb…U)z$ Õ^Ç²J7àLO³G¹ƒZ÷5eOÓfŸÈçp 8iç!”ä0ÅOë”´'²P•i®F-Ú÷¯&=m
:y¡Á5îÂ¸I±™GqË„–Ó0h2ó«¥dQKYjçàIÅÎ’šU÷ 9T
…"€Œ+@	|eÊ"œìÀ£€   ›A    ¯!…“¨9ÄWÛa6
H+=•§ÆU_g_-{U)Fğ½YaGÕUiÕ‹fù»1¸Šş®vŒ““CSÂ–î\ÿ!Ñb‡h+ãicNˆ/.;.HÔªF0zhœ'Qÿ`9Ê ]ÁÀ™ı>l¨ë÷ÜÒ/ßzƒ<øš¦ÛÌmd–è«âÀh˜¢ğ	S†´’ŠêæNê{×Jg©û³œ":|Dõ}rAéé°Ş÷W­*ºzgGš-|ÅD1Ì¿êKŒ0q€&AœÛSOì­şæBr8îB£t©¢ÕGb¸XHAˆ&ö|ĞT¥øó2¥PÅõÈ¦›!ò)ŒD¿lñ;ª;Dò§I¦¦>ØÄMrMÒ¨±lÄ",Í:CÆx²fÈBYˆBx2Ëÿ:}fô¨ş¯äã&m,cî¨Ë¼¾UW”ùÊ¿ãğUqÔÒĞ¹ÇÖ!ğ ogğÑ=é8æâ jñ«ÜïÓœ@4¹p‘ÂEj*Zêkq†~”¸±óü  ¦ ¤A$    ¯!‰8  UØi°†2X.B¥S/t/fÌL¸hIáêoeRÑû\'Î*]ó'šıœrNoˆNñv§â:ÿBıqğrqÆ·Ji€fIxÎ€(nÉFá%€ƒ„I„Éã@íR!Ø[9ÇäØèßYC‹Õ¼ÇFCŠDA­R‰•À·ØiH×ä«\Ñb’ ²…º¥c	x‘R¼ód³/Sß˜r;ø§ì÷z†‰¤Qi«Ô 3ÿmğek=Ä‹|s!ñ¢5H£	h5âÂ MâX¬§²L(­pJõvÛ|Åk¦d¨ªVÆ·aĞãÿ‡lzö‡ÿağ“pZUo°h7¯"Ï+ªtÅ•¡BÌíë½O*,Yh@mMUæ¨f†D>a¹ı½A¥b‰f’İsš%€ªÜè‚·… EeRJj/ú-YmVåIR6DSßÇ¿º·¡¥m+p c¢Ã¡KØ˜“_PAv¢Ræv?Aíh!—ÆÔfÌ«Z‚ó”1_Qv‘EÔ_1rÖ¢ÀŞ‰Ä!@š£h,à  ¯ ¢A;    ¯!‹0 €UXé®F…,$Í^ê*m9$ªpf«
ršƒşä@zĞ7yæqd‹ŸÉXÓÆ÷^5§Îq˜¹7SÅ~6“ìÀÚâ˜Ö ˆ`²P¿v¦4¯q9yp‹)™åûğ6$3nfª'VW3|ÁŠ?çïí²À+JNL~frÜóî2)¨_‹~%÷´7«Âëõ´Ìä}òÂL]éCÂ_Ş'KÎQ-—3q1	J:ëŸ4Ã–!'}VUhäE.ş«ÖU<5g)MROk¢A˜hƒ`3\1EvááÓÅÛ|eãXpGºFGÙò7BìJaÿ¬-¨l¡ımF~´ÒM‰‚9êÅæÔbyÄCçõ¿ˆ±-’çåîŞ•9º!@¼õ±
*#«3•d>úˆIB‰±ÂMö®! ¥BÄÒ©V‘Â++oØ¬€2õşY¡:|lI©séÏåW¹ëEÏ"Oo[1,­jYI½oF¾§Æ¥­£§j%Açqë@œ÷= ti G}ªÈ¬†½á *ãJPˆ  ­ “AS    ¯!€‰0 €S[ ªfB‚!ÁÆS¿mÕ*¼gÖ•ÍÊ0KbAÊó²H‡•Ã¼÷÷-j†×]ë%–Ôs6ìu×kÌx§oÀàPÆˆMã"€g/¨€O•Lôğ{ù­ûª<ÿÏiû9•gWÕ]¯ÿÀf2¸³qÃGOcMg¿ÈtvU•:º?ò—_ÿO¶ÖyÖëĞ®›"¯ƒÎÓÛÜË-Ã’ÿ\ø ëp’¤2V¥I_dÄöp¶;ŠX/
¶°€uµá‚—E„WP"+QKƒ¹jch©œgMÇ)†<ïzViL§]º ?:ìÿKŞIOúœæÑÇ	g»óõ›,×{×*eæûq¿R¿&ÖAP­m!/FP@¤qóÏ©ÙygøÚUwTœa¤ h5åŠAuyä”/¬ëpáôã$=áÙ–5}¼{ Š•\é•ÏÂşº#«1=±7Ü•ã¢Ôë•Ğğ£­E§u2m"°º»?ê”° •f[XæÊ®Ç[ŠÊ„wœØ„b2‡   ŠAj    ¯!‚K¸„TY)†F,ÕKí–­ŞeĞã[2S0¿"ì8î_@´Åşcı(óš\~gî(­awo$YÙhŠ•$¿R*c±ÉÉÙŒâiçQÛMM?c/«ô¨œ¿Söåp¼}Šîª8ÿ*<:šŠ%fnZz–ËÙ/çL¾•3mcã0"ÏÖáª]iZ.©q/ù7e}rÈÎ» ©	ÿõpşIP ”DœœJA$ÀikÕ5rÁ‚‚>ßšjn¬Â6”è¦#İYl‚±”â@Nháß´z•kw×~[*—†4Xyáµ¨sış^‡XÌª»ª¨i×Ê6ç4;8}<šõ[RÄ~€ÔnN¦¦Ü‹‹Ò|]n3®pU
­«bˆiÊ"wŒå¥'XÁÀŠ«—\C3óMCS‰òé.ªêeDR3É
š.cc|Z§¢+nyïá¬ÅP+Ì— tñ¿ŞèÊ¿!¬hîßIpJùS
V×Ï¼+K¹Ô<ÁëLviÉ’ŠÊh‰À  • „A    ¯!€ƒ¸ÄSÛ`²&‘
¢6"“;³:î/•yÈS0%´$KµŸb×Ôªş>áIÜõlÙŒ¼œó˜Ğ7 F ÁzŠy\ùáŞrÓsÒÅVĞà-¹Í—ås¬wËşß£U3èüÊW¢†~Ùêy^Šê88g8á	4ùî$d½	¡Ç;A™H
tqºfkZ³’­©k—F/¦ÅcğzU_ÃT¢²ÂÇYqD,,7Âãr5‰L…à{Î#u è k„DU]™"_båZˆjÒZè¬²„È ©°­ºÊ š A1êÙ˜šêúf5fŞXŸrI9°MaÑ0ÚZÊã@`ÊL=eNı`“êjãé;¡jf“eëşàs¥pçPp¾‡3tÏ~/BFtR²­vÊ²§’ñşòSÁ´5_PáDF(÷œ*„MkLj9.êN”´»é Eø!ÈÇ\wh&RóŒ–“ƒ¤¾¹Î&©#œB /@ä"ÙIÌx–ÈÖD¥#€   ”A˜    ¯!T‰¸ÄS[!26”X%AánOo“é”Ì“(tÎRÄ„˜öíj‹¹h¶zÿèû#ó.M3.ö¿«Ò“e9Ök¼fæO"©ÎŸmY8N–õzL–ü÷,Û0)N×¹üJ”¥õJ~T’ŠíÇ,dí7˜Í«Ğ`-‰ì—ÂíşÙ*¬üØçN-(_|¸Èƒn´zÛš.ò/|w­3ÇD­Ï"†)4=‹€è‘%ƒém{Ö^³¤ÅP½³ÆYü0âŸÏ“Š¥ÕŠRÌ"3’Fœ`à-¬^ÅO°± ,T&#Ãñ¶°3B©Ta,’P#ÄĞ5çÔ™¯^¾èl”ëÓ_4ù ¡:J˜8Â€yzzddÑ%Û:ÿ|­¼B*5”=Â7-›ç×4H¯–ûœz@ËŒøĞN¬ÎRÉ>uYÌ.Iç)éZ*ë¹à€ŒY	©L˜ï#W¸<"a¢ôÑ¾'îL÷;ĞE,Øê4MwÈS|´Gıg+¢„ãZ(À†ÒºvæAb¶¤‹p  Ÿ £A¯    ¯!F0  U[(Œ'
BÇB
Ä¢Ôµ²kf®²êŒbùøè†²ï—*ê÷7)\şAH?ú.lw1<¢ä/İãíS:Ä×Â‚ë\¿Zıs—U‡BïşüÜÔÒ“!…|g¯Sİùå“-Zg
	`ŠkqD˜"Ã-
®0ÕIà’  ŠÊHämTYnš#3	€©^	§FÁÅ\i=Nõ²›ÏD3ıl-x	ÜNWÃdµªw¼£„g”	İğ•i
\Ò»GSç•]BxÇåXUl‚3¢´Š©8aÙ4ÛSÇnê›À–÷×´ßE¨£m/½,É‰t9aû&’ U<îj³æâÓ¬‰±î•¡xE*İÙäûİgDP÷Ğß;lsj.‰(¶Ÿ×’×€`Í×D¥	èŸ‰‚‚¡Jl„QY4,÷/ëîì 3÷mR3òÃ*«û.Suo§œ‚“2,.:íß92
€­L¡ĞÎ¼cØÊÅ ”Í'KQ6• s"~áÀ  ® ŸAÇ    ¯!8 @U[ rfÊ'.T…ŒäÂ‰Å7°‰¤¤	~ØşqhÛ!ÙÁí¦ÿÒl–Ä§¤ËÏY¦`X÷NÌõ×_>úÖÛ}M_G¤HS{ß¥Z3@Š4È^¬"Iõ¯A³¨Ò7˜ûf½ÂÓÔpÊU~ºœÉ@L5+¢Y•šß•Ÿ%ï–ë8¢›¥–ša‹øí?hÏÓ·ıBãëN
Æ:Xñ‹·ƒÑ¶5]YÍ¦/³µ}	´ğĞf¢R4£e8dõ€µ)¹ØM;OÖ
›“ÄRñÆq—¦)‚wn9½U|ã‘•§nJÊ[Îse“‰-(}B‘q5@9æØ5"¼Vk0£t=1~b->2J ½Ú¹)á€û,÷×Å®”4k&rü½øN¤1ïÓB×ğ®mBq•Hƒ>#2X*D"ÌÒ ™"—²¡ dâÌ„¹¨Úª7½*›æTJûÄÓ<*!•)õ-îÿŸrˆ\Ux…—$7ğñK…× Üè¢W: ZgÅ×DÀ`¾ƒ€  ª ¢AŞ    ¯!€8 @SZhÒX‰ˆ†‚¸í2¢—¸á]ñH¥SÌŞ uĞgÚ8¦ºöº?ëuNEæÕ¿ò¿å‹¼6M™Œ?0æYz´‹JˆW‡l4Ç wY„Ö~3â˜Ì§7Áê“4è°M9ï13õ¶g$aó2Ê•qìâ€‚á]`B[ü®ğºS3¬Ô ¶¿k€º˜“¹âo¥‰ÿ<v5µZ[ÊÍh§ÃÙ ±­'L÷÷¾Ÿ7¶ıgv|›Ÿ±Ü6¢·lyìE.~4!/YíU+s‚“¬¹¤Ëp‡)ì–ÜÂ‘2”¢°4¥S™PŞ‹Æ9ãvÙ×o4@ÊD—š&~}7«H~_"¶Öä.?8ùJaMtö&E‰5"V‹ä‘Xf9÷Ë.'”3©xTVNÔ¢'€Oı<8•" B6Šš5.2Õ5Ù÷{$5ÃnJóç¿½B¿{@ ±“ÃÓn9qú{@ĞŞHãÛ‹[V{õQ!€¤qÙ®à +Î+Ø¨¬¬ZS¬€ aW]ú³ïËeY3“ÏO¨—è´N  ­ Aõ    ¯!D‹¸ÀT[ä¬'¤#w©LÕm]ñKv¾®ƒhéô3"ÅÌ‡¤¿v¹ÎY“æ_99‘{rzÅåb´1¶/>_V5…eD´]İfİ>Ÿôı‘„­ôNº™Fú¸ÎOZDÈû¯0‰Ÿ[—œå€³zŠ¾õl¦»ª.sª®àªq…d% Æ1ÏÀœ£0Æ©UÕqx“ª’/’¡WØ¸MpÅßÿ5¡K7"ÆtôÅb³¥òİ–C ¥Ò¡+ÊÊN†ewÊ•;Ôí;ù(¶È%P,izYt÷Ów\vóUŠ&.…ˆĞ}ìyÚ*‘ŞÚç£›Ğ˜4£$nêÆ¹½õ¬87¬ƒ¿£ş–¥Z”iÂI¥@U7~]NHb!e:*}z*ª° óêR6 §˜P
°Bã•û3ÙÊ·ÈAL‰oXÆV9öátXTF½ƒ¸ÄØ«‰f¥!3ÊÍŒk§8ù	Å¸GÓ€ vãÃ© GJ^„¬¦ašêg0J¤—7^qp  › ”B    ¯!+@›¼=ÃU] L$DlC£Tä¢v¹Éğ¬LVPy†ƒ®ÒD;ôÖeÌªİ•«ã‘ÿïDsÓTnÕN=¢Äû†.²‹sÜÏN„g [Áö2&C;ÒÏ/,Í,P+]Á( +@€D*çŞ…€³‚j2Æ8F˜ß×(Sœ”-Db¹ßøˆR¦mÓ„O`y0  n´ö¯OÉRuë©†åµÌÕ"ÙÀÜâ:¿÷CÍ"ÎíÒi|`³TÏº%aª$%¶¢3©ÊK÷¦áä–¨ 	ÂòREÜXÛäVµá‚dÑªµÑ èC0NG=Ièo^¾±ßÅaX¥òq5x(e¸¶«¸©Ñl7ì.upŸ8§xAv³ NûOĞÌ.¼¥MG€eÈ‹Ó©K<a&¨ÅpB'ÑP-ö8ûâ|cÔ©X ›É)–ÉR€šáQY™¾Êöèµ—'ÍÁÜ¡ëm3àwá+Ñ€C2¢7 ÙD´"Lİk€ é7‹ÃË³	‚Ô"{„Ğà  Ÿ #B#    ¯!M™O^\Ü4†íT„ÈĞíÉ„ ¦AWºç©S!r“UU“ÇúLçÎA)¤>…n\»Ã£{Rğ‘#7%7ßØ®®¥ö§ÜÿQ¬8u3å{ÎvI¼tã¥_oN>p­¸5šÖğåsñôR[³%Ô’„.–¸óF€$_MÆ>E¨Áœqúb¤İq_B"¨7V¤#Z¢lúC“º!ø @Øôõ¹ÛšMI÷nÚnPœ¾Û•föÎøˆ+9¯&„ª;2zt†äÄs‹Y¯àiÎ«Ó £ƒOï¥Û-f…²1
|{®ÑÙ0"»H@}£õäÇÛÆ“ø¿ı?)¦³OüdúFlOƒ2şŸÀ©˜ï,tˆŒ
‰Uò·qFŒètÄ$6ÔØåÕvE¼©ıùœm^À,#gÛÔ(!Úø‡ş¾ ƒĞn™©œõ¹\NÔdx$eRhŒX‰£©ÄP¡f2ÂU5IÍ×<Ø LbÃá¿eé·ŠÛÕ†Tó5³‰,yÙ•ºA6lœ9‡ñm°ôÙ,ˆ‚p¨¢ÈÜ¬ûı_¹ó4çò|^°]°}¥kO_I£¥O;²yºƒtŠ„²Ûrİ<Ë#øN‰–¿qşcö½óÏ±Œ6ÉtÂ5Á`}u~PúÕ´÷óÁ›UW°Ë,€IËgÏ¬ˆ$¼ËzpÜ—Oãˆaã_Še‚Ğ :ìD°­Š•mUZYuúOqx÷7Ô  . —B;    ¯!{U²ÉDj´3“œÉ8å$V0qbÁ¦ñìøK¶ùã>e=	†êjGÙ÷Æ9ÃÑ¥ 7 •_nJÀíÁ_¶÷‘øö“ç£gF½=PvU³ŸóÂ wéª	dĞW«'†¼}5…»½Œ±;`$’İrtØy5õÔÚ3	üå6&›Ni˜<c4/Wµ|™’ùxLËitÃ’>Û
v¡£.X¢_LÛ#­µx”ßzà Q-`˜È U<5“Å]ªKl( ÃsSHªÛd!b±ëéUÂ«¼×®¸¦»ÖJ«Øµ5–¹Âæä¬?C¹7Œ§g«'S¥ìŸÇ;{ÔÕm;$şKBn¨@c‰KÆ š× %–Bn$ˆLéfÿK¤M™a²ª&
©ÛrÔow9Œò9ŞF\UŞ0€•¨•á2A`µávbÅ#âÅ¨Åé‰‚p9mQÚkŒï‹*kfNDÂ}<VÊ©âñ]XJ	ÄlL# h¿¿ÅôŒcV€wF£â	A„  ¢ ’BR    ¯!e––ÇB‘EbiÓ#²¹™—­œbˆPÔ‚6ğ»Ou
n‡DÅ¶Ö•µæãÑıW©O~ß(äsŸ‰ŸZb·7_±.VÆR´æ´\R¤®¼6_ˆSjÛºA¢ê…Ô—Ìk©/¦ (ü3^²½†¢ş,ØòKp¡>„¡º>Hœ•4Yp¹CQ+Ò	õÑ7«•—æWÚ	B{gd©uÆ8ÓÓä­i%~q¦L)‚’”6Øv}î­)9H}§€`M½/c@½i.óY)\u²ÄDQ/…-Ë0¡¶®·Y¢š«/•9€‹»²”ˆ…Í²Ú¯ÑüIÄîĞzŠæè,Jø‡S=Y?1ZqQÌª—r$	™7¸å2ˆfşµ‰™A$½:Ju®Œ&»Y‰NÅ*İÍN €?ó­8, ÍT"¿¨•Ev•Œ$a%ö-ªÌt”°OE¡©C‘©óŒCöÌº´ë;{Šµ©P¢“Î¬xÔ3¶àNHÎQ^2w€ˆ})zÑdŒÇ©q×2ıàà   šBi    ¯!h	  TZh°V2$T=‹{ª;›X¥¨E(.Ä<ú7ç1İYãöf”w÷6Ø€­A¸!4×[6K	Ôõı#+’Öwö0í×1Ktüç˜&$!'İ™Y‘ìg¹oT†>¥ÆG~ÿD
ì†çÚî…‡ödâDõVV†ªá)ô¯Å­œ£ÑÊv†-ß¿˜$^¥óBâj–º¸;:¸õf×îÙøf”÷]|´¥_ÙuO•È-RŠÒüe˜Pú6Fò•a#[ì­¢LÆ’Øš/ÈŒ¶mç¼ÔöB(VOlbœ´53(”×ƒI4P@lÇx­Öze¤ê2©ı¤ÑÀÆI‹ÆÑĞ¿ï¡ª*d»=$K‡roìX&©ç*	ÅÊËY=JØóêY=Ö<¦Bc£’Øs°ä[çßjkö1è Å?’†²0¤\	µYám~Í8ÍWhmuû§Ú³×fWLª¬wîÎCï†ãÜißLc”"¸(„Áş¶O ~ßÔ´…ÂÚ”Ê¤Áølb .ıÔ´N  ¥ ªB€    ¯!„Š @U[ Œ8‰mhge7L£X4ª½¯–²	²}&™~bŠÊ³¦›Ì*5T/åû‚…#eÚç+Py‡Lúw7+ÅG¶éØ$Çi¿ÉkŞ‹ç	‹9ú‚L/Ê$s]± ˆ?1¶OàÏœà»&éß8„ºF¡ü§İn…¦»‡Ã!
¥–kŸñ4U‡áuW;b¾«_ÈnzÎ¥ßÆuWƒÑäoMW/c”¥¥¼ÑìÖ”ÉN:æ»³kËZ¤@µ¢]áz!);PçK_‚QN!Se¥B”È!ZG õ`Ù3Í÷‹İîæÎt°äµ|Úİ¿1LÆØ&?Ò¹HU—Ù¨Z÷9“¿Uí¡¾ç¤ˆX+5rxí_
‡myL+S”Æ“†iËG¾p@Y‹#¦äKµ”°™Ä·4ÂMGA¦xÎ}¤ çâ~ká4§¹)½uHçÛ¾Ì•We’İ\n]ß(ÎbÎPÄ2Á"¨İœ–'Ÿ.V_Ç’$QOÈm ¾¸Í%Ğƒ‹ôÉmcL„0ëŞRíJõ°8  µ “B˜    ¯!ˆ¼ âUØiîF‘,pÍtæ»ÖUÊlë³V¢•WC¥XMô÷¼6—aèëÊ{nÓê^öËç»ˆ†ˆ«úæŸ´ö@ÎDq—?½œ®U!îôiE,Coüó…ÿ6J*¾f[äÑ
^ãX©Ç[ı|é*ù”•œM›¶í°Ëm®oª¯}¿$Õ ¢(Ò3¢µ"ôô6&!;ë­›ç[¶ÖÕV!® íÈy2]DT°Œ”¼”À¢×û¥}„ö ¡	®Bzè“J*Å“%*PII³²D% °Î²¥UÖ w­mTšÍÕƒBÃ4­õîPµ[p*'-©ÛéNM¸İº”óÕ¸ÆkªÙq+Œ¢ªª¯usÉ}é‚cFıRÙ|õÍ—÷·l´ÖP Ö„î3N%Şõ;‹	Ú—Ÿƒ_Á€j]½­¦A^hÊÏGµ*˜øm"=ı¨Şs»Y„ñƒ7=\w2™B¸ÿ¨©;™Åöİº•Bq1åÀ"ï|¾ŠÁcûßmw±£’¡n   ‡B¯    ¯!„'¼=ãSÚi‘Â6‡M¤Q‡_–¼˜•JÌV	LÙ |7¡Öb>'³,œ6x’·føØô\J¿Lÿo×$~‹ÙrwTydóŞ‘ëÒ›¨İPò Ù6\xr?|¤€¢0?«*p€qyıgaÙÿ?kbrøP¢kçpb“3Æ÷¾‡w"rßq€ëãn Šá%:õ¡ÊŸolPÎˆÑe³ø;×İ‹	¿ñB ŠQØÀaøÇéşÓ
{j|Ô.X#SŒEdkzuC’* ¡BRö4ŞHY7% M²‡a„!€B (Œ–’7±ua´ª	À4¡dziËM{#î®oquäşĞî—-…²ß½ÈÜ‰)’c¼c’À‹ (ác¡–áùpáÕBÜdµá!
<,¥õ§ÀC9›4eD“*ÜO	!êöÁL‡„Mˆâ²‰bpÊÂ{²& Sõ‘u‚•©Áu¤í!Æˆ…e)&§zS.·Ç:•BšgNÜ¥Ø›6«•±ÿïu¸  ’ £BÆ    ¯!¬ƒü0@VÛ ²VDm\–Ç+¸5ïÅy˜U@´ï8Ì
0XÚèÊ9˜Éğ~û´…BİØdÛå¼|yçÌnşAFHİ>ÙXg±j]ÈAãŒ¢½îÖtÆW)å¦¿ÒäOkè½!„Nzÿâa³_&§‘"ê*ğ®Â=òçÿ:È*)Ş ©Òz„yşÚƒñI ¤èêêÓüö­±?¦b©m¯P¿Î^aBÕĞÁç1RbV[¨äQÁ¤M¡jõĞÒÃ©:Ë  n0¸äBe	ôû@Ÿn SYiE$¡ „€!)uJ©z¥2uJªËrj­`É²SÒ›­L¾+T“˜ä„°6Ôú×ë¯y®1Û×éíİ´ş^BAJ Oeé61>µÛê¨'§ÛáY†åú£¦×xxÀœ8usíÛç£3k	}:Böş Ÿ?|Gƒ¿Õı=¯"0¢‡ö;xowzz‘zÔ¤à4?¥l–	HD2ƒÓ'cL	QŸüm-´mµ×@€ºO½tÀ‘`Öƒú à  ® ²Bİ    ¯!(  X[(Ì7	B‚` Åo6lÇ‘Fòø÷—zç[C7iyi Ü½c7ƒî¶ù®¹²ÙlªyE…Æ­0¹åÀzû.R¾_]ûLÒ8ÆËju.-0|î >nƒöpC	şg\»İ+Õüˆn£µâì\İODñ`€hJ†<Êg•2$U—¿IZ‰„¿„nX‘apg¢Ã0Ş}Œ Â©k€¤cúQ6WpÎÏÒW´ÅuÚâhxxV½v!iIîC† –™.Ÿî‚,Ñ™©E—’•Œ ]Œ¼y H·á¯JJ’—ed¡(3Yó×¨Ê ¨ååïñLNlÙ
.ÄÇ¾¦ ñ˜KÉ¬çĞr'qÓUPXT¾äd-4@Ïh½rÅ]üÛî&ˆGıª Iqİé‡¶ŞãJu:ƒ!ZÙoïò–üißlòMOk»B‰N/RfíbÓ»¬õ†Èß(ıün38‘$?-õ‹ÑbI›ÁõIØu}~~Ìån©"Øè´İSşS£•i
ÁÛæèašµM”oa.ÇrUªˆ­ãÓªŒ»Då; ~:À X‰‡  ½ «Bô    ¯!€¨  SÛ).6V°fXÇkš•S-YEÚ:”_ƒùCš-îÖÎtûÚí¤]‰n‡-S7<mÏ\Õî³e…Æ‡2µOˆsƒBßRryGœñĞy¼EQª*¨'úŒL-)Ä¬Kê.îGiœ	ÏY„†*ûgA" Å u¯>©k/[Š„®Ì±{B¹JYr_¬rlŸawg¨w“s£Ï=NA4ÈÖşÏßìô¢rEÊ…IŠ‹Ù5d6P¹YJšc{üÎ³SŞ„Ñ‡0Å X'Ii¥0à,5ÖiOS&U’@ïÉâÛº½€â‘áŒó­ÍUÔŠŠp÷Î'¹»ÜçƒÎ$>-ş1ö#¡ãUUo$Ôˆc-È`*âN–ly^9HQõÆ[t¾í/L‰+tÓn‡MÒÎ5OgÃ>k^)A¤òô©Lvóá8D¥¹{~:Z§XWƒ·şÌ”ÿgSMOeˆ1nÎ¶JÀ`=„S|®_¦öj•…6ƒ7}	Â5®1NÛw¸€2>ÿ¶ Q8¹¡·Q9ß 8  ¶ ¤C    ¯!¨  UÒ,”g:XµÊ<Õbİ«Ïq¢W-P\¥¬~&&:3û4O>»˜(Áâ±øæ’Ø&®qèÖş«ÔÿŞÚ[¶‘Êè“á¯™æ±cÅÀ«@³À06¨1Á Ö—šß–7ğ"wuİ×¡ºÇmÖ¯i³jâ«Õç7Wwl®æããN±÷³í~ÚiOşç¡bX/êÄ—k¨ÈW·e›¾/kE¯¹ypihÊÍø¹´pòÛËœğÊFu˜oëš¨À ¥{ÕYÉÑ
)zzÓ’P½)ybn0ÕZ)h
B„0ŠÚË‘mET¬qX›#½ê,h‰­êoÇY¢7ÖÙJÁÜPÈŞû`°l¿ª«ãŒS´—#¦±O_ˆeâgK (ÄAÙ‡Ÿ«ïé;
!÷¤¬ÖƒXõhH3tÊ1–qY«/s¶şú?ù5=Ÿâ¹hÀ«_G¾™MÆâÍ'57×Ä‡œh–1"ö&û~é¬E%_å%_­1”ÈüÃLˆ0á€ãO.8¶"!f'Z	s'I/0ş¬«“p  ¯ ~C#    ¯!¨ TÛ!D"XE¹ÔŠŞ%ìÖÍLV#Xjö5½2­›¶ŠhËÈô;…¥
‡á¿jWÊy¶+xló–CFf­5û¶»õ2iGŸZ6cp#c§sûÎrÜ1ìëLa¨éü%DV©éš¬¢•ÈÑ™Ët;Şó9a‰5ê¿ôí¸uGI+½SÓu,Ge—”ˆ:&VûÆ¡u,XNÃÚw…ê!K*¬r%±s^)/Ğ‹Iväî¸^9PÕ[}Nt¥—°NÃÏOk¢± &qq/9Ñ[8/3c	U/BX1äT|ôÄæh•Â±³İÒ>;¹N‹VÍUé8‡»ı—]}ğ5lŞàúI(İGµSŒr*5®,ª8D‚¥7 ğÎÿ®5êvëu3¿ÁBÃZˆ§'›éÜU6ùmt9;3¥„8ëŸ"ºPO‹áß ºÙwcÂ#BÌğÍ@µî®¢H¥ô6ùÆ¨+ĞfpÉKc¸`ã6Û.-˜PS¬.p  ‰ ‹C:    ¯!+¸  SÚèÒ(P,ïw ¾N¾Õ¯jaD¡ª½f‰ÎÛyÙØğØJ§‘áíµ6¼d}Jø£&ê7¤‘AòëåJÔv$á”Ã2c9qëîâ™$Òÿ3×İ^L~Ûe‰Áàè¡ È`²î¹ˆ•q¶;?4eœÎûÎ•3±›®Ñ\V»’¢àE»á:ˆuÜ¯I¿½İGŸzïdUEàw…Û`õivØ©d×D^×ÁW·d”ŠÁÜ ª¦$Åp’¤E¡:K{)¥€V.(Y”Êº)kœ(˜î
àÏròÏd	Ú½½ÜnVëÕü{‚4éìQœw1é(ÙìSÅ<–1£/âivy¶	ˆCZäò£Ø,ëôğ^u‚ˆÆˆCíF@+AóYiàTuùUx³½èZ•ê]®9jåKœDâjxİÊ—>Ã›Ç·ŒJ‘‘lW~µ7
øÔVÒÂÑ¹N”ıËOÙÜÒŠ«¯
Òj¶FòÈ 	dFìTlJµÌ+bXp  – šCQ    ¯!+ø  TZi8„¦6vªoŠŞ\úŸéæn÷G}1:£ª	¤;†o’Uñ±Ï)väm@öºH™D±#Lõ™wîÇÿ“õŸÇ–šbI B»l)Ûc¨ƒÙFş y0‹ÌŸIÏIlW]ú/ìØS7›àÇì0Îí•ÈÑÕ<pgRÄ×mh¾ò2®îÔg|
Şt¬tïªÉUN—R¯L1¤/5‰g}ßD+‚7Ú[5¼Ínó§ÊÀO·%l‚­uìªĞgQx¡ÂzĞ„İ]“ŒCDÛ¸»xˆ$J;dŒ!B¨¢´|ğú»ÎüÌ¥aœ€£ŒŞ0RÌàÂçğÑK›ßòÄÒL„îÏ˜]x®±³‰OyÙõ½æn[Ôšœ§Óm88{¸ñùp‡Š°`EaH‡ <ú¦ s@®¡Q1İ˜gíuAüŞïåÙ´“Çf^*íØ]ÛIE¢mßœLMÜßtm‡_Ñss©®Ğ8ä–=rÖ Òì1¤­¤.¥[¯^¤3ã6 }¥ xq[@Z÷6À“‹Q¹h*à  ¥ ¯Ci    ¯!b¨  V[h°fPd{LµÆ*	ãKÄÀ¹N,aú»Iú‡3ÈĞùçªåH®J ¸¬Ç'‹à0($-d?+ñ–î•àÎ$ìxñÁ8Ë#R©Öºª¢"æÎ(€: ®ÔÂ‰Ş3¼¨‡.(W‡.µÎ3‚¢$_ âè’q9Ë\#@1Ì@âì”ÕCTEb•ñÙy=è/­h4O|˜àzâï%x»ıO6[T´ÖÜ´†üÿhx:Nìç[[“4Y’ıÿn×©K_¥ğ–§Al´ıiÃ¥$¿L !Y\„Éš­!RlL‚+Uñã¨«R·—×}=>2™{'!vX#£¤OYörçùÇU±Ñ´5šKËÛ>T"ªÃı T[k¦úÿ	ñçÇÍÒE¾C•¿İ#^/m8«wß=è:©Õ¤,äFÎ”Ñ]BÕÌ¶cÅîW{õÉûvB0¤=¡ºÉlp±6¦õÀ(ñpÚQf%º=!ktMü%ÅÜÍÇ´RvlĞzaÄÒb/"J®R±ˆ½¨2M†>ğR@Õ€Ã;İ`Œš€HÙEœ^l©ğ  º ¨C€    ¯!’à UZiv"˜ÔWKVxúß3Jñn6­RNì¡Wª\ÆTYşÓOì]ÂúÔPxÆdWŸ£)œK`8·,'ı0¢Gó¸@Èô"•>Pšk•Š»÷JÊÑ[¸½»
[³ÑÃ“{6ö«ğóÆóÊñî7}îÌ5<¬+,ï‘a „EØïÚw;9rŒˆ‰İH,Şxwï¿SR²ñÇi<{¹RX×‚‹¥®òv€ŒE@©·]  ÄvÆ³s"üâ:âJ!Ëi¥0KC·ÚÀ
ñEc4Uº
!a¸•µÉÍéóíÌuéåÛë/’ù3V¤-îv&GXapi¼$y‚÷0†¹‘1G];¦BıœÏH£dp6…½%'T¸°nÏÀ#dhöNÀ€¯—¶³K?O½ŒÉÛ ¥ïÔ­Ö—”zşw+]|>î8[|îEâ3&¡İš½¥P­Ğ¸G€ÅœR®M'QQÊèšyx¶
+¿”‹$H… mFÜ”ùPZ^q „²pJµÀ  ³ ¤C—    ¯!®è  U[(®v”X5hØz8û}:ÙYjä»ƒˆ5gÓzôVW¶z·v¾ ô»ƒ¼w/76£^»l·iºjÇí8‘”p0.`§G!WÇš·Öƒ!_ÙãeæÒë/…êéÕFÓ«Î'²­ú~÷B¾†*Mn×Æ¤k/-CÙ]@šRÓP@ö)áw­¸èçéğŞS Z%yÁRz{ú·š¹Î!ic¯u{ß%Ğqçk”Ê
ı­ÒÀ¥.‘F¶5Ò"6göï®0=á€#Î¢ÚÅ ¨à*"Ø!.Ó¬¡;uİ¦Ñ².c¬–JÅûsvYÊ”o˜ã_Ê!H§¹çŠ£gB³JT9å¼pˆé›sêâ1ñíşwŠƒî$&Ú.+éu§9å:¶b+ïE/¶ìf– ìh|ÒH£‚´‘õ=À`³72Euƒ#‹@(]^§™šĞ^¯	..?ú‘.Ë;g·¬¤@ÕUçwT‚Ê£G©ù(Én*b :Ÿßá€^ÚdèÔãÀT’!¦qÒ˜ ß_µ qb¤Ö6G  ¯ ŒC®    ¯!L¢ø@S] L"
ZÍA`vyÁÎ©Ti¬qO`k˜¤ŒseA¨úÚ±ojÒ¯¯#á½`UåË¸oÌ"Næh–í¦âóîF†O`¶’‰Æâv˜ƒ8¬ZvìzB[2…‘všô¬I“y™"WVä¾rÖ0Â‰½Ü@zÉœ…œÌéb† s"sÏj¦X™@¹’ûÚ€®=tfúø*SÇ¿¦W-<ç÷Øñ4¶?’Ê¡yEIkG!+	ÄNr*7P màÜ/PeÇWmƒ±Hg«EãÙ·‚_~O]_hÄb8SRšTšÕ]—_ªÎÍ£QsgÑj¾mr<bM†ä†âªÏñBäŸqw›D3ÀÈT4s ³77‰„B™Ş ƒ”„Ó ˆp Ñ¨¯„ZÓˆCö¤ëvl<X¶ËKàlr:&œ™?Q=PjÓâ£Úñ‰¨7"D¤™ŒğB7 ëíË´ ¥³T–T¢NZ+RÖ%Tak  — CÅ    ¯!+g¯øÿäUÛ(¶3	£6,oÚ0ííàò1¸Ê-Âàa÷¥où%ä~8Ë±#Œ¹UÎêj™G>p†C(pIÔòLf×ƒp)İ„hC:İ(õ¿şµˆk
)H}âz@êÙâƒˆ çÚ5Òr&ğ¬u‚‚0 ¯»z'c§ï‰Á;WzÆÉë­P T¡H`î/|º‹w·ƒ]Ö¼W­qã¶Òã'ÓÛ¬I_·ÙÉ¾¾¹ëğğYfEöf2KqR9
KÙÂnvÙX‰z0¨½ê„MC‚ô ºûâÎÔÛÕ‘*êàM¡w!YGlƒ2D€(%nÊ«Ñµ˜,°cÑ"ÙZ‚Úã‡h‡£2;s¤R¢`VT]ãgöòlj^
âvÔògêÜÒÖ‘Ç§S–e1ì%>¿ôm§MJ«mØ„¥AîT66Şn ‹èëŸTT¦¬ÄóÕ) œ1ª¶G<n½¹ kÀÌÀa‡,ëpÎ:_\)!Â°èFÖp  Œ Cİ    ¯!M9OÖH.óAvj±rÉI5ÃB mWÄ™Î¢¢  JV™u’VTŠbÒ±umÅà´Iy8LdTµêì–$ 2Äç/ß¤^Biëš˜ óŒŞlQİ¡c¨î8c:QŒ’qá*!€³˜¿IpÿÂ³âzyĞÜg»a{¿zøü©¥ÓmãAmØ²*ÿ¡ëİºC{•¥VvìÆİ×5,°>[½8/Ñv¨5Ù=âÆ8AA„K¯^|"qÂëg<»mïê’„ã°É±©Ø8z{ş#Ò‡€RR‘Å‚/WSE…,k‰¯·ãÛ¨‰eÌ:Ç‹n÷mŞdÌyæ3Cª+pÁ‰ëÔ„Öëİü±ÏÂÙS5z‘±\É;‡ìZ˜×&ü•ªãè€Â³5ÍÚ[¡Ec¥|¯–}ò0j+ †Œh&Á‚ˆ”ØÍÒnÄ«+@ g›«›Æ«.zšsÅ†¤3Ÿ{{ãöM!c³úöEÜ†\(‰Hû¡ã±Öèg¡ùõºcx ÔAK¦(iÅ§gmÄb93ÍH1+úâüêèw¬Ÿ;C:Ş7Ù,%s£½ù2ÈN„"ïR#uÑzd•[gYĞ0ß²±¾@ Å®ıû.•8æzlÆ&˜g<[,*]9_\úşÜĞ€ãr®6‡ZWM
ÆŸ[ê×!\±uSà$MHIZ
À   ¢Cô    ¯!{£8  UZ©„9¬EÅk¹HšæU.¹5bÁ$lŞ{&j.e¸-©-6‡ììõšì¦ø BÁ’ÄCÿ·Ö>&wM„Œô³x˜0Ê%Rá>ˆhvÃZö£h«áàÖâÑ/îò4™lû±„‹_©€E©ıvfk!sPmB¡º×€“bA©&e8œA{æÒ}5Èì¥ÁRjC‰$LWrzà*+¹ã¹`-êd*ê®§¥ySnƒEÚ H•Õ—Ù—î£Ù*'°×FtI4 Ë:µó* º8ª¦*›--‡!\xÍkÁYwÛZúf²²õà[.ï –Ø–ÒÿOá´¸;ŸXµW|Q8¿ØÛ÷¤_1%%ÿªÎÂ®g©c*”ì'‰}vŞÀA×DÕôJêa^û›·Ç+Gt%|°mX¹Ş‰£@ÿ‰ĞHğ r»ù0n*) ïW]såWr)şP¢T€‡nLŠ=‰òaMŒÆ‚jeüŸéoê¨ÛÃãtÚ« TÍ@™xv ) ËÂ/I ÊÆV×•êØ•”	ep  ­ —D    ¯!eµ“a¡B³Ú$9¾vå®m¬8Â™jJ¼¹š‚¼óßÔj¬<¸vÑıôÓ¢oîîgí-(Ë˜xƒ˜4K‰jk4¾™xPu²²z%¢Ï!ÉO¹ZPZÓúâ¥|ø`…fî¥ÍŒÙ2á0KSè ©“Ãº SS Œ¼Äxá§£%‚¤ÈïpsµÕ'u¼0í5VòF_]Xøâ!npaA,h;ŒUsvĞ­D™ƒ“sœà`/ŞŸ„…‰Ì¤¬§²Ò`ŒH„k-[¶7+/‘PÍ1ª¼}>À 8?¾ÊpÕhögŠ†‡y›Zæ|«EÏõ^3³¸n®F`µ½—–[	á)¨K§İ•£jrÔUTlÂtéq0	|÷ØÃ,új„´iY–\!3¯†JïêgÄ¥^/•ÊÇX—:Ï¿û¾+;wîğ]ÍÅ
à¬«@ûœæX;ßÕ÷¦,4Æ¥¸DFÃH[Bß†LjQGó‰#Bu_$ Š§ƒy~Ê À  ¢ “D"    ¯!Ì¸  SZ¨G$,#1=\ç-½XªUÖ‹À­ú“92DU4pŞ*u´‚q0›Ì{‹oËPóoô©C£Ìl„É¸™$dn%t9åd ÖWAáÑ‡“b÷aË§2•‡©º–0O¸7B4 ¯ÒüàNru·‘r!qbn (3àıJ¾&lqŞÛ—³¬¾Y¸Ç½ MX_ÿ®‚Ÿ‚µæÃ·O.L}½º–ø§¾õ±JâZ2!®İ 4Ô±.H¤¢ó­$¹­JÖÕ¸SÍÚÈ²(9Åjšk9+&{H¬g%ŒËSáÈMP?_)QÃ¿¾×oä_xûNÓàÁ¡ÿw<b²ïz¦E›{ ½´]Û¾ rp3¡Œnç¾Qš›[Ã®I(§BXÚ­sĞuaê‹TÒ7‰R®$pbP;xLÎ	ãAÖj ã$¾—Ş‰Ò«3i
¹‘SÕs°€õ¸eî…ªM)Ø“˜çØÛ’ÍU0YÑ
oÜ˜+Â>x.+”% MJP0È¡ =rÅ„°À   ‚D:    ¯!|¼  S[X’V!B.Bx‡,k–t¢×ùÉ@‹b	_mÒòTb¶Œg?_ÈØzÙj£NÙ#š†ùyDîùx¢Ûf²q„pĞî2s|#6|ß%†ÅŞş?©c)c?ÃRƒåÇ´À®ïÒ,ââ‹`¢+:ÿõ¡‹âåk³ğlcõoÎ,GÛ¬ZbŸE%„å¢ò¦ ”åĞ^dÔì_âqË“!PBa†Ê×}`(¸Ç(¢B£²Qì0F:Œ‚¤‹FÕµ^Í¯»Â¯›a..êÄ#Ñ¦ã-5ÏãØÌ´¬ªòÉO†˜~æ"T¡“ødd\¾C”¯øÎLì+©ZUzñZíùô¶KB]ú±Ëæ²]j¥}ÿ‰øğÍh@ÂÔ²ÔŸ»lW&ª´9]¦nîÚK°«sMâzïÛõÓ¤‰´Da&ˆd§¹A‚XkVŒd5)I€ô„6‘¥
‰¥5Vä«ªÔ!RX¶“ÄLmPà   xDQ    ¯!ü8
UYHVVDQQÓ½º‡:³±G¶( —šÍk™R“iŒ•\²x$Õ»†x{b¹"Z ¼–N›m‘®wX&­
°Â
½ã¨e@‘:ß8$b „¢#gº1³ì«3©y{RVå¦›_,W,cÄ3¶6\òÎwúz5G~³‡%èTac:4”ªÍöîíÕ#Z×¾çc³{íÜ9Á‰òÇt¤ÿvXŸ¼S<¸ø¥¹#ãe»›¯5îí2õµEâ1Å°0|n¼æ+$äÚ
;9…Hç­ĞÏ=±SKÂ”ªò7—ì¡›ĞŒÓ¦dƒŸ®P™BP5nêì‘ÃÉ Í²›/Š!+ë¥ Yêï§8R#áø—:M-À¤(ôF©nuWù_7”`
·Öl((6±–ákŠ'#6‚V£©N&ueQw”F±l<àa&§×Ì›"q^J»ƒH€Jª1‰p	
•ødx: ÙI˜€  ƒ ‚Dh    ¯!+×|pŒTZèğt#-t)Hxu²¸…(¥¬\	ĞPM˜ûaî-<ĞùG_g‡´“› H¦—k!|_°œa¢aœDRİÆ»ºÈ—ì§”Ç"bşy›È&A0] Ú?]	$RªFtËù¦–ºÜ‹ôf±!TÈÛÌ,–ƒ58÷UwM¢% Âw(÷©ÂâÎácÙ CÕ³ÿdûUQõ&ì9ÔÒÂ=_ÁÓ@«UÚğ¦Íxk¡U-B®Nœ/Ê¡Xm,AruÃ,s1¦|WCvjÇ«‰xZ«Dáu•=*Ç€‘`!*ø¦]
¹Q…`­IB¡¿^ı"@ÁÜÓÂAIÈë±æWÁ²I‰²¤£hbkâ“&Ü.Á^—,šàBm¶ºuã8å¬İÈÇ÷óÍãUıFÖÚÈ<à@%¨F[±“=.Èâ—`@T±ØÍ°ïŠİù»
’…•«2@¬“Ô¼­ZGLÀ“d0±ã@ş¼t¥ëç†2ÍÎ‰À   #D    ¯!M™QVH(dÂk3Ff21–b5&Œ¹7ªP
Ò)/º¨›œğŠåHòùığ/¤2i#ër%Î-ïÊÊxpøM	nöëÊoJôŠåèjèŸ<™ŒkùÒ£Uvşı¦ùêUx£šÓŠ¸kÓ›l}¯i)G’wFb‘ËB†ØàrÈk×ZûæÜÊ-û	åÕz…‚‡“µ²oÀY[qæFØË1°GÔ
E-m}¼¤£{kÅ2Ì²Y"\j9miZıå¢- ßŞ3«¦}õpö¶oOqeºGïiã<ÚİCp!%Ç©éÕUêë6\ò
_G ¹è(‡X_ô¢0}Å :>öîÁNmúµÉkNµ¬‹eÔp‹Á(7}-ŞrÄ€Ğ[	¹7j#4fb'¢5FÅG<e›«¨{3 `M{¥ïT+É²€VHïdIâ4.s@'JáÀÛ—ú "$¶ŞlòRßŒrLş<„ğ4üO(Ò‘Ô)ài à™Ù@­ù÷iO£ ¯·¨Ïšò’ˆ‡n†í'hZ†Eâ»ĞèF'O\"ß=äa¶a(˜/½]dIIJûî‘L€N[çu=_Eå=O‚YZ×Ï+ëËÔs6ÿSnª$¥›L]ªP¾î
5[Z¤rˆ„ÛÓğşb‚Ó}bÂlmÙeqä›]ız
İ5r¦3B{ŞyÎ¸òŞÚ±—ïø  . ¦D–    ¯!{›0  XÚàìuT®·Ç°+¼º¤·7Rñ7²Eª‚›â—„Q¸¥GÿFÍØD¨öÖ­ß¢ŒÉ'ğ­™mqñvéªœÓ©OB)§I2ûã[•½",•Gn«™­?=]Äµ÷Ğ¨ÓcïÈ+ª…ğì>–¦XÈ¬Í]–Æ;çœ¶g9î×	¢ìÂ1ìŸÌœÍY3Dñ4æ‰Ú£Tÿ„IhdöJø…ßË21Ê©‚©˜b¡G¶-3‹Å³4†^¸ª|æ —ŸN–J¥2-I“,2q¦kĞ+ìTØ++p¬×µë–Ø`\ğÕ_"û j,ûDå‚*&ßdíş‚B÷Vì}jw;ËäâO¯ßƒ¼osKÊË—£RÍ²Í#
Ìe¹ $ÎÖ´T5À×ø	Ò«İ¶ä10	È‘®³¯L‡_ıÃBÑİèÑï¾|õzÇXËxø3ımv	•v±”=iléØŠ,æJøæI49-ßÉf{
T)~û¡Û¬«$…&ñ  ¾ï˜ ì ²³§"jÙJÈgENOİƒ9À  ± ¨D®    ¯!
$  U[˜î&Ú†“z½•Y·;‡WX˜¨\ &0}šÑ¬MäykÙ\¥qĞâb¸næ;âséÛl°Â–¤2ÒYÌïÚSP3ËœıY~âIéºïwuĞ}Ÿ½b#\š]ÍEb¾Î‹oß}›X/òFP.ÿ>hd}¦pÖA–0èíÔ>¸{ÿcı¿`^·©i\Õğò3©ÅÚÁ^`ôx/˜ú?ŠX×4ót¤‹v¢éô”âãÂ ½¯[±¤ ê 1¥Ã[Ån¶T€.”8ººYÆ ±±Óğ"Xónø7çÖÄïŒ×.«wJÉWL\“`Ò¼bß‹‡-tõÓœg[ÅúrŠcˆ¸º"d~I–™•_ˆ(ËVé\ËE#áNƒ(Ö… şæRKÎğy^åh´!Oõˆ€pÉÄ^ÇZ<*Ñ’4¨h ©tØÒÑLPD+:;“og¯'Z˜:àÃRàû^JˆÂïã³+Jóqus’¾ÓºæîÍ)Vf˜,ò®S¶*rˆ Ï‡åàñ ­ŸÄ©Åí"Uír9Í†¡À  ³ €DÅ    ¯!…ô  U[XF*bt’·zñ¯2–Ø{owX´½œRÃ"ô¯Ù˜8·Ôt‚ÜÅsQ¯ë&€Jºfw3‹ˆ”¹²ušGqŒ@+pxYø<¤ëØIŠg;w„¾yÎpDÆƒüÅUKçc §,kÎÑ¨RË?7ˆª™_36}r2±¯ºb'Şj@BÏYdûy8]ëĞ“_‹‹NSò óªDÿ’€\L§’2”‰•b£• Fäg8„ñ‡[(ÙvŠ„k­4bŠa!ëáù_¹ª»Rûã2ÛªÛ­Jl_´g1EÎ¡Œ¶kğÒÔxB)™ßBbøÛè„6öc*ã@RAö×à ^âY½c›è’T ®zÄ7ä€Ô 5dÑ@æê(_×ÿ9R4!ÜÈŠX+ËjâAœv#¥Én—"“ îPÆ^÷İ}k9î¥¢ğëá…JK}E«¦L2D¼Ò€ Ñ‰v[QaºÕRÄF¿¢*Ü  ‹ {DÜ    ¯!¥l  WZàŒ¤Árø9Ïbùª¬Qy^i¬ZàÆØXê—×êü‘ FË†`ÚYôÑÅÅ>J\h¼õ{–äÿZ½%wŞ¥ÒA‡*«pùë—>ÿWlGÉà‰Ö±°¯²ıu40LŠîñ€0éË¯–ÙL*Ş‡h¨È_ôæfÛ
­gmC|Ô/ı7¢).©ª²ôàrÓP­õÊ'D2ÄX.‚i†a£i­¬[UªŠÈB0LBáZ®:&7\6µ$›µÌÕ†Ooë“õÛ±2º½V1å¾·!LâÚl‚ó6OÏÿÕ=}7;ºÇX&¡ñ‚‘äÜÙï¾Nš%°”7×TÏê†p4e¨P–yB¨ºöfû5]M|i-
ĞÈ%Çô3‘†¤-"ĞD}Û_³])ˆÄ¿õúÊŒ<sæÙºèCL«¹¤± “Ÿ´^0j¸J$s†p¨bt/d!‘!„kâ%{˜¡s€  † ‹Dó    ¯!‘¤ü  TÛ`¬d0¸áoHo2¡xãİäm–]Ğ’j¿3^hÄî^3o‘»_š.~CV€FsÚ6D7´\ºHÛHÑ"†İè>œÑÕ[E™ktÆ
t(oÍgãíªJiÿ–¼ş½í]»:fß|E‘91<'ñÓ[¦È	#G‹Hƒ"d¨âAA‰0˜~/Ë’í.„·Îù©oÁ.L0M…,•¤…á<+@½v„ÿ‘T#%.Œ"ìf¤¦Š	%.È[<RÉÆÄS¥¶`(($†WP>@k	Š Y –³éòºë¨Dµ½+.Áxo‘1?`˜ 7âä—Lùê­#:eåîæ+^Ax5ûnš„ĞCoDµ9¼g‹ş½	Õë2¬ÿÏêâ|Qd#PóuèîÁYá¯Êq©º9Û1úL‹Ñ¾”ñ­—:e	võ÷ÎF)–«}9æ­÷z1–T»-ĞQ	”—Œeˆ´FI—±VBÑÁZ£tVÀ™(	Bg  – ™E    ¯!]ºÈC_*¥x ÕceÕPQ°âà7u6¹ÅõÈî—åW‰£5ö¬m»'}3
GØõaÍia<3„–¶W<G*VE¾ #$+>ù¤ROJØ=–İuÛl©#<»“¯]¥›Êkw¹±Â…´ ĞìÊ|¤®êi§
"ëFİ— BƒY¨ù—é×üÿ¦€{b3jÍ>y¡¼c«Şäµ°îvPX22ŸôvnÅ‘ª„RĞ¿Çœ3ÓD…ó€¨6ÌóFscmÉ,RÊ»*ÄÊC›5¬Ui±ŞiRmç(*€ZÃŞ~Ù®ñå,…m¿©b/ù§—|¡Òn_¶s£Æ=eÕÉT,ÛÕğoâßÒç[}ÒB•Ë¦gK€$s'³X“ŸWü&®Ü÷ª]F¸¡­r@ÚÃ–Ëmób`İÊ2é¨l-pwÿIÎEÇeûÇ{?¨ü±o•JkR€ ñ+cXG	ûüüze`ÏFná1<Ğ-óö  ho¾c¥ªKh¥bÈ	ÊZÉ[D  ¤ ›E"    ¯!M¹”ˆ
òzV½ëÚ²ºï~Ø«­ŞËIV°İéÚókmœºÙİ™£SZ·¶óvHrÇ3uUı/aR¦O:†D©a\î;‹»û¤ÅW´Nñç©é«9¹,×ªş¶@˜DÀw¯Ã6º” 2ó(HOÿöˆ¨ƒÆË–9'­oÂ6°\zgU¦B*ÑT²èÚy(´®8âWs¶ç
¢â<Ş·çÄ•¬
0b€¶Ì,»|¹¤¾Qİ6ºJ¼Ã+ª/Ä'—,mğ6B„‚5ºêJ•]w«îqºë
Uì…ˆ…º"™àób–“Ï‘ñŞµwÔÔsfşßñŒ!Ë/±U”´øş¼¸¡Ît¤*=õÒ"¶cf”¢•pB­}[İÓúDˆ_
)„©@efa#/½U£i—ˆˆm$@GD¸¶iĞÅÕ…Áâi”‚Í û¦SŸ™ÛJ7b(Ù-¾ªÄÀwŞ1\¡¥‹°·||åS‚;4ìèÒè€´·˜Vo ¢©Q|<!$Ï	Ï,AÀ  ¦ šE9    ¯!mª‰c¡˜&Ä–Yµx–ïÏ9®<WNôeà¤@oêmüsšÛ|Uñ¹=¤€ÿ€Ã7ö)QŞ¼ÇvYoŠ €0©ş<(ˆLÈMyiƒVÂ¯÷|¼¯ ÿ:=ñœ»Üÿ{Ê¯®Yz¨${_k‰øí­‰ílÏM­o¡é—ªÿà‘ŞæìÇÏÅiÛ¨Ò&ü[ò ¹›ßªµ°ˆp]QÇû”ĞYµ™yïú5Pãe°sïÇ ²ëŒ“ùÒAT­
80ï`gœ‚vngU€¶è;Á7>
Ãu
5ÛŠR·®B%€ÛkÓø ¸ß¿ğ™ÌùÎ6Ä{ùäÚCñ©Óâqµ<Z²rO'ÆÒ!h"4D…Î?Íş Ig>³n½S¡¨â¶`&º†)ÛË¦P4`O”µ™]òÒGÎnaçf
â£ğÏ×ş…º*†ó³ÿş’Å
—2M¢ÖÂ¤dÇ”ûıì‰9rTüÖ–  ^ş¶Ò &Í´›a-‚Ü   ¥ ›EP    ¯! (  TÛ!LU(°3¥­Yâºsª5ÛÍw{¼†.\‰3½Çñ^0<¦n9„Iá½7ùèêöËgTÌ}a	JqaR¨ÌTjR¨U 	ë¸’QÚ-Ï¶‚Vº¸ÿñMbBç>’BçNÿjU)oÅ!Jßı"__—†—J(²`FÆùÙªB‚2ºtÀi­¢-¨0FñÙ®ÉWS¦±Ş¦J»Œ ½c1H¥g×Ã¦QD>—×—aø@İÀ~€¨ıªÀ¿)¿ÅõÏpêcÄÙh$ ¥¹1Ô¨1X]ŒØ¦×?~ü*“¾½´í«Xö“gÕ£t<xÒäS€Ö#PáÎÃ«(fŒçP;§(Ö\ªë_Õ´Ôy:Ê‚òšŠI±ZÒ¬—'yà g)vĞÕ½°İş×¯Uœõ·<—57õ1jåH‚·N«[ÙïiWQLŞxÜC;Šùô/J^•¸¯~c5c„–mm[NGRnÀe%q‚Ş`±N ì zAÄÏ^½r ˜ùNĞ¬Ã€  ¦ Eg    ¯!˜L VÙá…@µ~Ãlñí4äÎ;¼:Ê®³U`Çw,T%ØRˆcxçll¨Äâk‰+·( âıù‚‡VAª»ûmµÚïc˜İ²9_ø_R‚FÿÏ®å¾(6ÿ=/ĞN™ĞŠ€óİÈÎ?çášs÷zˆ>Ş58¹^ Ä†Xb¡HŒÅ©3"ã:·rPç’Wˆ^5æ½ñhÙ¦*‚P2B]Êº !Š!D)3îÒXÃl^®R¦AúÊ‹E%ÂÄ€ ”¦ã†”sW²Ê»æñCJµ€P‰­ôÍäÂvx”CŞ¸2.³Ÿ=ñkÕ3çù|*c°ØK8º°POî‹Ğ¼½° +æJxqAÀ³ ï§©’ñÉ¯ñ(€±ù­ŸJ*ªWöìÎWb,Rp
†Fc€Şh†ó›¬ëVgŠÀ6¦ÑĞÍ÷×nO`U¥yôYv¼
Ú™@ÔÍ=Ô@Œh…;!ŒÅjÑÚ"…#6%CÁÀ  Š yE    ¯!+¦Ş?UYéZ*‘‚nh^2|€6ÕbM)5€a›ö*¡’¶6›¥î}àW6oêòEÄx\—Æsg×–„éàkH€Ç–Òœ€:EBñ¨ÇD®rp„tşf,y<ïšÎ1DSM\q >Uœ¢åØÊNEÚ-û’ó‹D1´D]^Ì`Ñ	€›¹Gl®.¨YÀ€=˜9µYôğiyÆö]†–7ËmğfÂ¤iíœ•?¡48ÊÂ×5”RJF¡aA{èÌ³àRehâ³2éOd'`a*mpB†ƒ!(À¢•Ü.Õ‹xnôU”ilœZËî(}¼£¬ÉE£l-°Õ[§=(ì›9F?¿ŒOáOY)—€GÏ½±4ïÖĞ•ƒ Q?şEu?ÿ˜@.§UÇVñrJ%ø|^ö {òPmè*Î ½‘ EÓ‚î²´©Iá…ÉL‹¼ U=V|b ûi!½]®ğ£ €  „  E–    ¯!MÂÿÿXßÿÿ÷ÿçíD2ˆØÍÓnÓlŒ(á¡´J2›à.İï†]eºÛj´æİ6J;Ğ"üa"ñ~!/Vziÿé	 •):•éÖ—/R:%!|¦j^b]H—WX]‡à-kÓåêr”3Íÿ~°r®êÿ›püyp>™–™w·AºÃ»0-x ÈºEhjİ¨ç]–ÿúšßŠg¯+ Æê=}ÿ±WW¶m9«•)$¥ÆÍ7d5”ô@Ï9­TùO©rª¤ˆ»=²Z¸Y¦'ó)Ö, ˆ5kú?Ñó'Èt[ï2mê;x¥]Ÿcˆ\öªmE)ÍUŠõ\‹óA¼´RP)f,¶g‚}÷¤"8r+™ÈfGÑ‹ù‘7I‘#jM¤Øí6äUF¨…Z†ÕP·:¤¢ğ0UºÎ>Õw@ê;ñ˜¢ğ—+Uz  À¬ì–
ÉËåÑÂåïêc›ÃØ3Ãğ\¸şæ»ı_àR^ï=O±Ú é‰íZtÚ…Š%·úÉÒ‰-hiğ}F\>•ø&–öÖÖ•ç÷Hƒ'Ÿ)Ã>Àƒ	 ˜nú®„Ê"â¶ç-Îñ•´­TJ‰hS§”ŒöÔ&‹œ~9ĞœRÔ`LÇX[\ ¾Ò~Ş‘ğFC\\ÑxÉuáÆq™¬ËWC²2w5_Kyî’L)$@'­íÉ]µ˜LksD¬8  + –E­    ¯!{u¹–ˆ¯©IÏI\ìå¦/‚akU€4 ¢/ª}ûòX³‰³®{Ç$l	ågùípuM>*Âò&ŠbPä®Y´XÆ6;³eÛäédc3½TÓ9awRß¦éc¬±Øxã^îÑšX&	5ø1=¶¹‹.NèºÌÎ˜ÒVÏ™@Lb}Â«-@S@Q“(“D¿P]¶%{pê`JN¹„¾2Ùg	ãTøeUb
«Í’mçÙC~øõŠ«[­\¸©ûˆÒ7Fèı&aÈK²@
Û-!–¢AEg3+wæ§¾õ†·š¬Z‚eÕË•Txo´j¨Sª·hCÍ,í•úê¿/eÛ4ï•Ü†n§ûc[3ıöW!öK^œ|'i=Øé©«¬lÄ÷á Şğ˜>0´H|Ñc™ÖHtîƒ®-_WGd
ÍÂ$³›EW‹/vl»ö`‰Îµò®7Áè‰ï’”äÜu•…/Ìaa"¢h®J?@ZÈ0#±^}‰7¥@¤hÇ›½f%Ö«Æ²“€  ¡ ¤EÄ    ¯!=™c!Eat´S{Â]“
P„Z	 €cLÑ>ÓA‚'&Âïj{`(£ÿÏß£-bB¾ö†ÔÂ~7ğ•&X(@%)¹/=P©…¦©6áA‹&ôIBsµi¼í¨Üµ‚‰5›çJ{r²AV‡	/b	˜ZcjqšâÃz§¡lóò¹‡O¥wjY¤™ax†­÷ÃÔ*Ü(ºË¹ÎjÛe½£,h9µD•#l‰'[Ò61°öÃËwz6 pÕ¿,¡†ÀQ´ÔŒ£tZ!_jƒ2âµş&ÀÖ{§+ÓzÊi””˜B4wç;Ì ÒÚöÃ¤Êk©ï’æÍTõ¼{w{û0î•·ÿ<ÏëËOaè~	Ò º¥2¦ıàCÏT·|9[]¯Vº9£ÑÓwöĞv¨»Ä¾ÛP^IXĞ_X¼!Íd\Ü˜€
¤°6²CöµU¹Õè<,×S¬°àv³:rµñLuò©òÚ0Ã¥²˜÷'VÜ‡±D­æ˜ÆhxT…îBÌ{:ë„|p”×¯úïˆ 2~%nğ  ¯ ›EÜ    ¯!   XÙéltA¬¯ò¦7Ç=sLÆ©*—…ÑÀŸIN Î!ò–È5:,Òv¨·•²ßl<rBú‰4=Môüd›1bâvaLNfÂ#œ¢R©ğ„×ú„âŞšƒ¨G[Ü¥t‘Ÿû Úå@€?-ÆöÍò43ÿ8›µ>NLkHº ÌŞèE2vojÅóô«ZĞp¡Ïs«>¥³,oÔ$°şû“ıò”¶İ]‚™«ÂŠò.ªí9Ë.P×Ãx0-	%»ÔÃ¹âPdıÂ«X’5>ÃPTHAYãÚê<(ÅÓ\ãŠ¡T¹‚($Î“×:–oÕ¤W–¥L	k<®ölÉ¬^ofà)x#‚ÕDSÅ÷0¦K¡7P0¸n¼=:L¢)ƒÔ°i²dq–ŠdË(áí–S?ÚxRêR0Xîğ¢E1f²UÖ\/W]~‹“u[Ş­%Fíœn;auXÒ&yéõnV˜×²û¥v»Ç–—âY‹‡‘Ú±ös!{û¿´  ˜ş‘ /ã ìx  ¦ …Eó    ¯!ú QZ¡H
Œ†¤…SÕj‰MváŠ'k«5H?hG_XûöäÔ”Ğr<¦}1_0`)³A­'cŞ#ê"æÔ‚\2U€&Ya¡SßøÑŞ˜u#)r=ï¼Ğ#Ò‚ôPEÑ@˜«®ïúş>Ÿ’Ç.ˆ7Ïz éşK¥A!PÏ½Ôp­Èä#»e2'–¢nË(Z»br ï[ˆ)¦åcFZ…•–)d	™2õ1Š_a’ú˜„XRTì¦²S®$9¸ög7{¾½O¯/X0e"Áê
ìsc	xn§4|“Ô×Yë8~5%±™WyÀÙ©¥q
HÙ|j/Ã÷ï‰n’ö¡ÂCê{i¢¼êœ3oïvUàÑíÚÚ½Oº‰N›fdç¼¾$UWûz–Ñ¦¥nÈ3t1é^õÇÿÚ·Ä³8Cæ±bïuÑ–¸ ¡v¼÷Ì5AÊàÚD‹ ™µ.A‚âË/(¼ E=ˆ p   ‚F
    ¯!²Ü>TÛ`’‘„¦“UkOFİc&çYTÉIÂÄ`÷÷•y¾ı4ó û~Q>‚­5„ÌUœÎ‘i¹ùæ•ÅÚ’ÜgèÃdS\’ŒJI!Vß«ğIIanĞÜ`û
–•<ıÛg"ñvÊ²Ârõ¬ªêÿ¦ÖÔÏ#âvÁá…ˆí>ÌX…ÍÂHfµ©˜aº•JLu-÷…öì·—~Ãİ„¯<‘,zXF¸1ÆuöZãÛÛ
ª2HŠØé[ÈXQku¬+ª;SÄÅÄå`ç¸\HŠ@£¶ÀĞ¬RBšÏX×WÖ"ñjQJuV@EW lY¦ç'cª0ç‰©­M÷A€!¹.æVña0XsÇÃ¬ÊhMØ[²e³Ä²T¿3İ¥„+öJÿë¹
Ú/¬Ø&SsCs¬`Ø×I yLÈ@•ˆÑêZv‘lCGü²ÆâVEı“ŒèHQ:Fà‡h›Ø^IT	N(aÁj@RÉÑ€   ’F!    ¯!²7Î. PXh¶J=†Â¡0PlÖe•6kfŒÊL“Tc´ªlv
E·|ef\E· ¢†PÑÑæ» Œá*šÆ7õÀ°	Rq§Ù]0È]ãğç£ñ‹(QªP¤V8ò:
råuß„çäüJŸ-¡(pc‘‰ÎE<_E6ÎÄzÖå–	õzDÔŸ¿¨TkT‘wC‹üªùR´õ*ä˜Ğàuo¡ˆ»`˜²t^|«ù¥ø‘ÆÙ/qt^Cö·
ˆJâÚJ¬²óíìØ3„|„dë­
€™!Ï‚ÇJ‚°àJ$ ¼¹†Yµd€0½Ğ
¬7æ&Ô•jªTU"\É[óÍñµÛàwÿ›®5à •‚²ú:f34Ã\ö¢bo0Ái‡Rƒ›ÌÊ4…>ŠD»q.•AÂò¦s;Ê6ÏŒÊß¡|i§½q„uÒâáÔÖ==àÈ~4ƒ×æŞ ªq …æìF¤~ë‚ $µœ‚Sf£4ƒî¹j^ùp   ´F8    ¯!L  RÚ¨°F#‰‚„R
‘*¬å²ë‡k¼PØÖ	<´T	ë–*Bu~k‹LØî[VTXÁ€®¡ƒ ı_NÛª¼	qÅG_$ŸĞªœ£AÁGáA£ß·;‰>:=Ôt‚èÖ`Ğ1ó¬ï‘]b­—ÌÓÉ8ïó…”	Ÿv]'è³ùğ_[ƒV¯ğ	p-ó‚g:~¹´$	è½µrÕ6Ò¼¢yï:›*®o”R“|.jéºª¢j¦Œ´'LÈ3ğ¼Á¥¾*šÙ@ºhÓ+T q·À¨´Q¬0F:‚„:9]s3õÃ»e)EÀfc­÷b‚[ ‘u×8Ğ·$g£íµî¨­ê’k¾²´«¿Î™ãšU¢I–BÜ^ÀB€›lsí£Và=ek:Zå9ÖLvG}£•muG¤nˆe–B¶riç$ öş±­À¥
¯—@~À½ì)Ûî¾6¨æ¬¦¤Ş>±_ƒaS\·Kˆ»ÇÒ:~.Ğ3µÇÊZ*2\³>¢vJM5°_B„Á>©&,­4à¨º@½[P¡s€  ¿ ±FP    ¯!
Ü  SÚ ®6*…ŒaÒ·ª÷øh¬íxóâqóæº¬¤š”Q‚S7I@İäDGE<«Û+²2¹‹Èoú-TÀÔ›®)}|˜“ô¢×’kYßÎ´å?ŠÈ¼4ûı 0o»ƒª|¤/$ÎJ¬ÿœ²²aıœ†J Sé©‰ÜÉQ™
KLïBP kxc@dê¬P¨b¤`Ÿc¨­÷
ëã–şÍ¶ÔFJ†hld€Étç‰:Ÿ}nÄ$'0+Ÿ«Ø3g°€¼öv" Ül Ít°Z4
k=!‡AXhF
Ôd\:ä½Q‹ws»'€5XÍÕ,‹ İĞè~æe|ûïÊË×;Ga×ıTé÷®¨ó‡Â™Ğß’1£éü2ÎËEG/¯~ÆMŒ`*ÿ¿N9Ê…e–ë© 7ÕÊ|É~Y;&¾nøVšRdëUß}?²Ÿ‚O£n—xE\Ø²ÊÌ1ø6Œ2b—ó?æ)5â„ËMP
|«Á`NÃŠP”ª6W.x9©ì3ñ ¹ Ø¢ ^û@ 
kùØÊ2ã  ¼ Fg    ¯!Ú Ì  SÙéH"¡BŠ…qVsîÜïÏ¾;²zpÖÂS&Œl¨T"Í÷‹xTÈDˆ(A·©üà”G×ÚO›5Á¶¥9×÷ÍÜÓ\@S›_µ— ¶®0Ná£)ÁÒØ
òä–†ücN®9şïjÑçôá½âÉÇWğÍùvƒÂk“œC­—øÄ Ï/¯,ì
ÔIeĞ&¿€HÅ¹œT½’a!¿×`Q™êhYİİÀ"Qè¶ÚY©¸G4Ê©ëkìñÁÖà 4‚²ƒp²Ğ‚¥uv$”ôx_´ïK÷òæRü/.¬"8Ÿ¬¾\íëó^^®‡÷'“ljŒpI}?²)’3]~Ó÷‚E<|Bİeûï´8aøbê;¹q’8®[ ·ˆSĞÀ{¦2 pcÔ€Bx¨¬ÀÈšÒd @uºÊ†°FÀ1VDLÌ@ ûİ@I€ØE }%P/š]`‡/{9ÍjëU“P
˜Ş<ßƒç	Ş)œÀ%Rkì‚@R NW€€?•@¤DÆºÊÀà  © F~    ¯!Úf RZ¨¨(¥¢A
€psâW\¸î÷æwdÙrE‚S= –pL2V- |º‘2‘YiÌ°.°´5*zÙ$ñ›§xš§Y·ã}Vdz_/»ˆ°^µ™ÀãDÆC§¸ô•»ìjíâ°Ï
¾O79Ê´}¦y‘†]äm„å"ˆ9ÖDı©¶ñ¾N¤.¤›¢Rÿ$cMãw,¯¼à¢ù'Le  ]Â”uÇwÅÀ*$B+)y” Ò‚°Iy¤FPˆ y/â1),tÂ‚Â°„(„ÖğùÓê£Ş8ùèiïí\İ&î]³@=+–4`¬	:Ùß³f'ŒÕVqóÍ´gÂ=s¥”:jQhJ2˜†ÄP¹ÊnŒ…dM=€£ÊïÇÆD£;’£u¤ ¥ÉA…?œ	‡…ÀëL%K98·c°SÕøe_+ŒxC" J8"µ>úá˜ççÄÁ’Ã†5«ÊŞÀL[BÂÄ±!0K›PêB@ à  ™ …F•    ¯!˜\: RÚ¨¤$J,2Ş¼£‹{Òèeó4`¬ê©w<y¯jš4Qº„7ñëáêã^òéj…Ò(ñ¿·§Ó“ø¬µr ÷j—º°C&±e
zïÄ-¤ÂtGàâÑpî‰0çŒZ·øZÆá=ß¸ßÇô^şéC[è]njärvL˜åMk’X§@ŒÄL*i:ÏÊâ2‹¾v²dĞ_®Âú`o¿e:³=1%ndN&ìJBµTª¥ˆÂá„VÊ8ÌR	Ÿ°¨\"3…Ã&ÇR!Mæ*ùº´wÑFP’ê®®( g-å,èÙ-/„Ë½tKƒüõÌ}".q,.@Æ¤A¶[¥Å½.òœãá`GP]€:„­b€Eã;˜§zóéÿ}ªÆF™íõôí¬ı3˜ ×t=í§Ì‹ú\x&®dè@X~S÷ ½š˜­›‰4œ Aë§û{“û?U*LwpÔ™ÇÁuø•”$šº‹§ƒRad%”¥”’¨ã%x	Àp   ŠF¬    ¯!¶Ü RÚ¨ JXnõjxkšuŠ£/w ÅU¤¿±qãÔ÷Büoİûco³¯_ò˜òÈcp“ÒÉ‘j.®Ğğ™4L`‰y„)1ƒùnP¤ç ªÔp£à™±U<‡ßrİ.´';Ø…B\ŸÿôYp—CG	*>¶1Ï6¾M†^
‘R·¹É‘WASPd¢±œsXßÚœ¦üŞvõ&!Ù½Óµ¥fãÑ3å‚Á¢å7¯yTH2„¬2
8^ø¡b¨­Œe€Ëh#€/Mlƒ Øhcr‹çºB˜
_®Œ ZèÕ‚®‹ß[¹«Æ˜PŠV7¯;¦4}û2‹[ewÙ+—Ü#`ŞÅxV\û•ZĞ°’§LkÃMG™?,‹E·ìbD1S¬—h[Ö¬üºÄX‡á­©±Æ±sà;ÿÙr1ªSH«–­OÔ­7ñPPÌ×Ö¬w^òš“èğ–ˆ*ª›TJ"pª(Œá;RKŠ40Ô°İ3!q¦Tà  • ªFÄ    ¯!bL  UZ¨Ì¤1±ã¥MëÈ=Êºk9¾3U„å¡³‹G0s<M­ØæüÓø8¯L 1¶¢[pK¥Úcãê¿'”g©Ó,.<ÔßÂ7Ô€?ÉFŒ×±çÛ™&Œ¯yÂïÇ”G³WíL¹Á#¡Š -£T scôUtZ‰¤ş¸fW¯TxŠ=P¼º}ŸÜ)iºÌÒñ‡éè”òí©î'·š·ÈâØÓ“%g ¨ÚÎR´Ó…'ü¡bPÖ‰ó'Û 9Ák hR&Q;Á€TY)l”
,.ª;âjOÕ{wÂ·ç*•IXQ b9¿ß>O¸Û>|\%¿+œ¼AQŒ×cĞü:Ê&ÖóKtaƒD¸5õş§ÂKe=2OeÖK-øóêºˆ‹fz³Æg;³j§	º	Õ5B±?ëûÁÛ¡	k
F2ˆ	Ë˜î.
Ú#L&j`›š' Tø|D´bŸUòÔO.4~Ú>ÜW®ıü¾9óë0Ru…<÷K^ÁrQÉN bàùlØ‚«l*8  µ ¢FÛ    ¯!]¶ÈCš€NtC­)áU/:Ì&ÎX${‰cŠp¸k§d§Ô7×u<hşoQõ É¸øØ[…±ªsö:×.w²1ä·XÄ¿E^´á+kë³o ìˆŞ¹M#µ¥@t…ÅZÑ¦a!@/à ĞÚFÀ„’¼Ïü¦òkúK^ŠÈ7ëp±·ó¥Ò+ƒ&-x¡€k[Œtdw¸TŠª$ëš–mş; 
(VhWs)vhÌ½š¥‘Z tZr3SZ¨Œ•)1+2ã9mí•+›ã|e$äº"‚ŸÁ„©&"W[.æ®³ŠS³¨/wå%rhïÅÍ¹•³ç¶åÜN
õ¶¬Mº{×•´úßí}ŞxL4hÛÂ}\¸İá=9H­Ø]T¦c–àríKşgnÖW+â^ ²ÈgLÃ€83ßLÖº‘Ìà° GK%ƒ„Ğ:	•Q‘Õ2bƒj|ßùÉ…JwRÿqÁP1%l‰)äéüµMP«î–šÌ“¨˜eáªêƒ·qĞËãÑ   ­ ŸFò    ¯!]’•S0fQãNo]1Ş%«é×=6NË0¡2ˆRîOİÜšÁ"Îo<†÷sµ»/ÁyVÒc€“Åf®q—4À\Eé_$¢D"àê‹„qñ7J“A´qŸ$Ø+  cEO—zæ–+d}Ì¢/¤Üw"ş}“‡o?_gøUÄÛc3sÌÎ®«ùÌ¢éØà(sè¬á·cÕéêK)ûğşU„ö,RzÎ_$úé	ı#q•p ˜É›h™ÑäPpe\¶š ĞÅ]{T-N…5…ZBµ^6%J«½Û"ù.ƒ4îtnl€:eßŒmeİM1ËBö7¥‹æä‚\N²¶‡e²«íŞøµUŞJÿBÓÒs6“–àÌpIx?BBF] ¨St
0\ªQf‘LõÿûçôÚ³”‹×ò7êñ¶±qQ[Åş»š:úÿÖ¢„’Ñr!î»Ë•òûÒy×í?•Õ~‘Yù>5ë†ÕšÏ]<ë:íeô†yWÔz( ¸úœ QÃ±[V—\ @ÍÁ	€p  ª G	    ¯!–L  ZZ¨ˆ*á`¡…®¥æº’)œÕšoŒ¦]\­Um­ oèg3‰ğ´Ú:WaîÏñˆC©k’0—ag1”ob{|J®5lESşm”VbÂØÀnàš!mÌVœ„²\a‡¡äÎ8ÿ:M8|W5Ñ‡æÚ©v—1‹“‰¨š.„n³•¼Š];d¬Æl»GZ?”tÏ®Ê&;ê™¿Y’ëNÎªl–«}´Û’ªcäd¢Å2µÀV€+L,a—øPTnx¿¹”£°ÒlPV:$VDÓ¼Xâûë9[Á-UA	ÁC€ïXlïE—ü/‡ÂSJèZ]Pxèvy’Ï7ßP9v8xı\›”äRœà(pF”´~ĞoïT Ÿº{¹uı]É €Ä[uîEÙ…¶Df¹Ã«}4Û©Ø»e¸Ô«•:aol_ÊÉÛ>6[;ò‹‹¥Éë0îöÈ¬Z¾i™ÓkJ¡²X °]!TÂœ‹Úu±"O´–•ÈŠş€—ğ €  › šG!    ¯!
’Ì S[”V‰g,W}pW3½L˜ã´@V
™aË]ç¸›;İ¯ÜéW|3zr^x…¤2i;©bƒôœ¯½xäß–×›§ïé T•ıpA

4k  MÖB#Åî+†ş¸4—myV·ÄE£oÒì^[úmÕ¾×@â[:ÛQÜÊØ}ë‰Q'ÅKCœ|Ô_~àßé“ÓÉmÌiŞŠ”­©vt:Š¦±K@Y*d»N•£×û#;ˆY®ÿkª¤Ç£jĞ ¨¥ou]Z›d†ãa!…É^FøJ6¥à¬é«ABñ|,ÎàPƒN?7œŸ^!©$®ÂU£J¹j†ï„Mÿ|“”uV7»Ù?¤ûEãâ¤Ò²ÕY6ÛL„©da±œr“[o(Ë¨ù( _´Î@\hpvNÑ¹ ú*ûÊmû•¤2í¡\ÂĞQĞ!ºéG¨§“oƒ8çU <{}%›ihRÓ¨Şbb“V1F5¸‰İÊDR˜â‘y–Á	Mm#¯k€  ¥ G8    ¯!
SM|8 RYâ…,>kâknê,›q”QWue]Á“ ±ü>y’øn ò«rVÆ–A›P‰¥øD>¿ÑêT±Gõ¶*o[û¸PV¬"ƒ© ùxr!TWøt„!%½MnÇ² @^_
—ûæ4?I„È Zğy ^¸(ˆc1R¨UVrz¹EÚö?‡\·è$··Uq½dx99×|¥K77íâx—‰)HŒK"_/;9üÅ]jŞW:|±Iâ£ËBÂÇK®ŠµF-®MEl jD(¼ 2©Î…²éL*œZÁd‹&9˜±	h3tïÿßŸ92,‰­)	8€Å{<!@%-ÍPTìç«³	ÓCüB¬Àr
x{C.ØÔp\p–¸ë¼µyú0‡Ä»ù¸>l•»9ï<KµÅàò’óÁÔŸABı/9«cÈ ’fWÙï–¨¼vZ‰	”CÈBü	ÄcT\½;vvMT.í±.”«Ì›VyÔôp  ™ ©GO    ¯!¾TN¨ UÚ¨ì´(­S€¤í“-{İêµ˜V]5½.R¹pJ}#ÌMûæÈÓãjó²5]ª?µşC!‡ÜºÓ„°Rù]o`¸Œ«	·Ø¬—`g7(É)›É¥RZë$·ç½¶\«[•ò0/ßÂ°º…Æà#¾IU(Pœa, kÄ\B¤$Î@ò±ÅD±ZÂ8Îå77**¾ï©ô8¯j‹½‡ùLÔÕ¨ÒuŒÖt‰ˆ#q›2ùÌ´ÈÆ2‘¿Éz^S,‘«æı”ÔY
òX^Ép:ÇdU™Çæª‹:ë„”¸J1%QNe!LbÀ^,ç”Ükn—±[¡wå+—E!0Š ÇÌúó¢“GŒ¯èÓ~“‹­ÈñœÄç>ÂË×'ä1TáFÚ®²Î-83GIaŞ{<p§T‰+İs[xÏg2;*L$VFTšƒûÔ±ƒï€¤£ƒeA˜çY ÙdøŞ£¨åĞè4Wb‰¥‚³1ñS |¶Šj™.‘Ã·çÎŞxÊ‚×ğ4XšÂA¦|+ÁrEH‚]†ş¤¶‘‘[	NšGÚ,à  ´ Gf    ¯!mªÈB‹™í/;q½å[nYT•ˆ—*÷`xænÙ8)¥Ô¹£~%fØÚÃœL+2NÓÎœ7Vãß^¿ÄÛÀ‡Öõ‚:”‹Š.QJ•¥8gB†D(í…¡Œ2^)ZU£]‚–4/†ÛZ¡ÀİÄè&‰rÁœp Î‡¡[M}¸¯q2ù¯„fyßÀÌ8Û…Y¡÷r[İ\Y'—~:Aÿ+ÿ0iKÅˆá+ .x´h¬U@Œ6µĞŞ×ŞÕ“Î.ÓdAg®j
ë-’… ÅiÂEw®·9çn\W3Iµ§&¨µàî®öœ‚:•y/‚Oæ,¿nÃ¶aäm>a€ ×¸æ†
:çyÕU’Í‡9ñ‚wÕ;_wnµA~Æğ¤$ˆ6ÜANØuÛ˜²bçÚË—éªÌÆÍ“´<xV}l†ƒE¥%ª_"vtŠuñ½¿Ùx«{º„˜ÆµUêv®WErÚ[AWÊU2p‘pËê:\ˆ‰‚ÎQ'TÅèU‹ç'¥JW$÷88  š G}    ¯!]µ–‚` ÄHY++éYÙ™ts
^ÅÊ(#²`,¨'
hc*ÿy°;xoAì5ÅÀÑ¥"wŞ”¦·¦Í/‡9ê‘ÜR?ÍøálÕŞW,má…\é,u.\uöMN‰†JÈ‚Êä¢Õ! ,Ññ²õ4GbJ·2‡_ÚF%ªlBI“£V£$;ä]ñOZ¼»ìãüñ.–(¡k´5ÏÈ½xœbµu£_çºíÔM˜^£<Xšt½T/%Ô´S3¨¨J2ÔåÅX
»1”£! M§MÕ\Ş¸¬ç.“1tØ›ÉÊM»ÛÅÎSC³RïkMé^¶{ôM¨ª
Í*©-ªÎ¤LO;5÷:ö§«c,“Ò. cÒ˜FÛ0Á’20`¨®öÔÕNÅ¥k.Ğƒ0^ÌF!Ñ3,¬Rs“‹uïyŒëÏ8NĞ6¬ãØgàXíHÖT¨J0„ûa¢L Š±eÚÁ`RõÅV¤gX¶0í fÔ%®à  › G•    ¯!^ RÚ©dH¬ÆØ‘KwÕnÍ¬‚ƒ£0¤c‡ºuÂ¾øÌ=àÄíïÚœZ°Ø$_·şÄË#@üñM›AU¡éÙ‡.« YJ’ËBéİp$"$’¹_¹¨a*ver«½FÏCeŒLÌ=ä«mş;(|‚“a”ƒ…mã<»ÆœNÉ¢ùtt—·‚âZ®cÆ,F?,c9ûáÔzy)òVs»XÂP/ÒHÏ0¾â¥XæAVòn*	¥ôTüó®eÃ%k‚™%¨ ‹ùÇÖÈZŒ!A
 BÙ¨ƒÃ•pÚËxá…ò›^-š^ü2˜`Â†\-¸Õ3µ:ûŞÊg ê'¡é)·ãZñÇŞÂòÉméeRâDvv¢²Öô¶ÓA2MJ$Öã2j@øpk8Ğkë.ĞulD²geÖô›QåRˆ5Uj‰À’STV7¤ï`JªG¥L€˜HM®Î±b‚¨Ö½.ñÂwê·~‹Áb@šj^©jœ±gæêQ7`XßÙ)²z1J¬x  © „G¬    ¯!’ H SÚ ìh†nYTÓwsÄ1R÷\e‹²Ä=cšÇ4õŞ¹‚Õ§îj±ÉˆK`¶1¥¨]ÔXªşoÁ²êËŒÊeQ:	ÅUÔfÛJ[#„I¥•øÌa~¾¶Ÿ­AE-6:ŠÄ7ö@‚<äÎµ…ßqAÖlÕªå^Ö´^sA@¡æµSI­àÉZ'§*İKÍ£-tÔ‹+.MJÆ
ô¡i@cWVçlM;”:²ó­@Åä &R4–c4dÊğüx¿{ËišÜÁt.D ]E'B?ÂäH8jbòËJ±nÂ(']óÄ¿úşÏ[i.¿ê$RóU†2m‘J®‘	Äıw“v U*Sëp5š.¨İÌ…Û¨¯ô@ D8@°1‹-á`åj^èå½ñ:Æí³[ÔZ|$bj…i’W¯ı/\M’ŠPMV892ÀÒ¶é`RpÿvÃà¬¿’ñ\È»N‰ĞıV„@   ¡GÃ    ¯!—l T[¨ì7
Z[iÁtr®İU%®’]?$Rd†Ò›ä¨jJ5*ûK`u°ÀT:h™C «¢‘ûeâ­l3Xxa¼K<iÎIª’…&ªWÕÂpÇaÜA -TàN‹™A~S—Ã>ûøÔ§zzPöÓŞ1ÆgZRmŠşºè]Ã½uŠÁÂlf,¯·_;ÅSøO¯¦·ŠÏİ;8åÃºëu„÷v<ß#ùN>UL–š7 ´!™™{ò_c1:Ğ6hÅeiXªÍx•’°ÇãUŸŒ/ŒQ[ Ê&„™®ôåU@.˜ËcÒEàà™0ÄWU¾
6—kıÆ·v³s°)Ôåáš„áÕño^v_	&­b°‚@¶ºÙVK.!<wÂ!f2XÔİO’÷J‘n¿ª)3.è¦àafË÷âå¨hîØU•«Ğ½éD“1‡!ŸxÜûóßØÔ¨µÑ 3­¦–ôö9ÿ>ÿ‚¾^­ '|ì€S@(/)¹Y!TnŒL–ÊQW~Zä¼¥\à  ¬ ’GÚ    ¯!±,  TYé²@¨®
¸ªİ¾tÕ#—P†‚»ÿ’ €,äĞq[–!/‚~`fJ¬N×¿ 1Ûeº>q$G¡íº{ğ?(­–ñÕåœ<ı\2¬CC­’Úw|r
|—xÜáº	N§×M×Šë¦Š²®ésTc]w½! ”T2lÚ|‘¤=Ş°;{-¯u¨ê»WâP{µ?çş€“^]“0 Y?¶*9Göù€Î_ãâ•Ë‹ÌKXF“Ïòÿ¨–‡ËGÍNår…–È°f4¨Ä¶†=Õ•¢ëŒR¨¡wK”MîX“†LâèİCaá×5@m…Ìy_—?¶ ‚öïæÃóA’*!ü? ªe"å8u •1`TzôWO	uûõ=ØÅázÊôW@M{öÀR|¬#çÂÜPVR!O8KV	pßf©”-¦=ú3,ÀÜ6³–¡¹7ú%u7I@³YÌİh¤Ñsc»MöKã¡#X@Vm÷Èm§ÇÏ   ªGò    ¯!
˜‡¤  YQ¬ìÕX¶¥}Â©âİbò¸İiF×WK8Š7ÈV=~şüã
“×Â'¿(ÍUŞŸ•¶nn Âé4ÖMÊ§1›gû5çËê½üe“>2¬üó¤QûâÅ–ô óÇÙd¶OKçÓ9«²¥rë¯2^pLª&¨˜Ş£J‘=‡<ğ¸ˆ?b¨‰Ès¤(İ_2©7"„ûç%o8sŸ¤÷«-·£,¥ÖéRÒîèİµ€º×Ïõfè	Y¤Y¢§«KHÚQ£ªğiŸŸå¢Z@¨M®bcX(SX]ÖZë++8ñíß\çY½+°”Ò?öŠQÓêWƒÑçOl‹%:š‰øïÃİÿ·L‰èütD_­WœîÛWE[,™2M„%ˆÌÎ|®•¼±Ë²šî´h•(ß^n©(*¹°XFÉºÌl,`#Dí½EÁöùªóƒ ÍTñ…‡²|c™¡G|Ğ^ºıR³aW,àA{ßÜ±*CU§³K¥£QJM¼¶ø+YP²F@8STçC„Ò“Q>  µ “H	    ¯!‚`  TÚh¬„*„†mJö;İr†³4£‘ÀÆÑÿ%Ÿ.p s÷ŠM-=îwŞÜ›Ÿ{ãk£Ë7Œ“çyÈÒ|¼Î'_’©¬Æ²‹Âß¯&®İ\½4Õ4S÷KN	Ğ/Ùä¤©—•Ú>jü·ü–îà˜+M>áÜhí$#=ğ]H]}]xÊ¥LÁÂzş—è;XõlBd7©É©×{O4Ô£ Àì%k]KÈŠ’bÍ›ŸVPJT¾h¥XFGB‚âèU±BºH§5h
²Ò«SXéÌ…!¼ËqNÔ×‰|vâ±)Gïz@§ÀÓëİ]É•Ğ”V}~Yc­
º{§üš¡äRlRº›Z1g\$pî`.\›ÄêPU^ìäw’ÑyŞ4^7ìm#‹ËíŠZüï¦»ÔYÀ²'s•Ú‹'»T]µDÅ|9x€Äj¸ÄçÆ·(„ãIÓ?“q^éâ„²ßb1¡í´¯B…îU°“·É¡À NCE&§Š’'9ë3ª½Uí'  §À   ™H     ¯!Šô  UØ©lÕX-Ô¯›ÏféÍÉÚq¾3|
ÁªEÁÈ>ñh¸"™ÇËå=§¶ïÛ_+°rü­:¸së[º<åë3‰vé·6v`Ÿµ´ãæğ´ÿ¡‰Äf¡ôÙ¥0Zã;’a|hJ¨•!„­î j-æ–Şğ½œNªkªPc	«ìòÀëéåÕßÚH{©,TŠ1‹³„GRˆñ¹ÚğâwÈt).O¢Şûã-2Ó€8lü}İ¢		T|ß¢B¼€ì´'æˆ8-)¸Şõv:SÆÁCP‚Âqu(7•˜·W¼ãoT¤£[[@wğ~Ç‹×’øS<0ÿ!ŠêæhKqÔ5X8×Œî¬Òè[·™¾ÌõÀø¯7 H©çç'BÛÜĞZ
o"¨j>_æ7N¨_8:—%Öáö#}ÿDå‘$%ˆ¹®Ò)—×j#OàOƒGFÏS£¹àŠµå†Ü­†Ø`‹ß	]ú“6íŸ¯ÅJ€/sn=nñÆUf…Ä×›6	…`E,Và  ¤ H7    ¯!Š$  TØéŒ¤8°8f¹4sµqºMeæúPD%XijS* ‡¨š5Ôø7­ïşºù´wõ#u‘Ñı^Š?<ÂPC!Q’	é[k§ëÙÍ“İÅ¹ì¢»$)Šii˜àƒùªYÂ” JjDT~»Ñ\)LµòAG±^OªÈ³’bª|ŞÈğF£m5ÏeğŠÍênDõK•‹ó–«Ş]Ğ¢ºù¬%Ÿrn[úĞúØ¸d¦¤g7½Köağ½b`_•Z‚uƒ+&n7²VsõİÑ½P«˜•icÊ¸·ânŸê´~c¨úôEñ––©Á¥$ÉIôk…8µßß¯X•Ú—¡ 8d¤énîØáÀq—×pâK= Ùht¥³œ¯µï×’İ×crMµ2jİ5¦¸‘Üİó0%5$Åj7Rœz—_½–Z­Q vÕV¦ºd–2µ\Q9ë†¼Eu'ô)lQÀDµ(Fõ2à˜l—^¯ Ö±À  › …HN    ¯!® U[ˆ‘Yq¤wªİoqz&UÒ r	üÒÁ¶7§šÓñ]XáîWÏX|Øè%…}ê`p¥òe4ìó—¸H·ù·®?·‡Póª;æ$Uˆ‰¦€1ëË¾8¡W^Ÿ¿>]†ö®?°mbíH×-C0º•4²ı<Ş‘ËxósK²Ró	úa÷Ïåb,öÍkã‰Å¶’pâGÎ…m/j‚Ë)8è3 sÎPšéŞpq¸¥R‰eV±¢6¸"„‡§6í9V¶§]¸Ê‹¥¬Eo"{Ù’WĞ—-GN8FçÜØ[•õs|>ÚÍ$N¬²‰ı¾íö–@Şªs©.öû—öŠçk—¥‘=Ã;ò²&¶ oÃºèÎ¥?€“àÿ>ûq€k±ìÃj¨âÑnüøİ9zˆDÄz‚Ìïš›´AiõŠÜ#K(Ì’6Çr/‚“’CìÄ!
.‚™É±™Ê |7”<–™^   ›Hf    ¯!€Œ Ğ UXéÌd@´5Ó—[ÊØp¬™¥VÄ±Ô¦İPÛñ]µ³ükZ_Îj¾à+:»ïvçE¾ëÿ"Ì>"*' í\´„ àLkãV Atø[uÔãïNùyS0^+f³¦9Y“^ÒôÍe’a´ßˆÇ«êƒïoêaÅ²§f…Òzzæ]ŞÙæcı"¡Ôüúâg	.0êlâšâqdÀ‚íÖJf±£'S4oC‰	«)Ê<jRËJ´I’ëñ×ƒMC
6IÖ]tnVWZü«¶wYÈşc{$W[ l¤Zë¥„º¯f˜V°¡I%\¢©OUÖ®¶Táo{\*ñVìS›“pøFŠ§¹lã©Éò¢4İNŠlïJ©üáğ»­İ–nUK3QiéQ¡xŸ[¶YSÕmF 
È›fHğ·è„ï.úï«ä(ôÿ‘kvóÒ²IĞpı¦~¯_^é*œgßåóçı'xàœä¥¹Üc¹1+TdñN Ûùèœ×D½¦ƒ=Õ«2!ø}Â÷~18  ¦ ¤H}    ¯!  UÚ¨°f:VV¦]ÊtÛYÆ;µ'kÙÁ(1É£‡Ò<iU¿Ğ%bÊ Ùï¾ŒŠÉg_G½ô¦YÄÊÓ/ŠÔm/µvf€¹ÎSX;ÌŒ!T:¢éL€ tNQõù't?;6P@F©Küz]I\ÕßHLw¤U:0
¡Y©‰X@U[ &öÑTƒÁÍóOLN²”âØÑ¹ÛSÆîk§—aÙ/[tœfy`¥e`\ôğßğ  §¶pf9û
a”¾¶=–šÆB(P†P¾·wÏùW×\ÜÍÖ¨ÅòÕl­Àíî‘¢KÉzOm?âv[dnGY¶¯eÄ 1s•œRR'ô“fl¸Ã²5‡™k:TşpÎßAçJ{¿©Ü„à§ºøõ?—P½ ‡aç0ˆúo	ùj á÷uòÃ‡yÎ±RV{«¸sm¯™Â{µªššÍB“¥ÊG» UÈìôÿ³BÛ|mi¨§±*f•Jş®á	³ğq¼ªáX¯ã#í¶ÁƒL¸ã àà  ¯ ŸH”    ¯!•ªŠÌQ!n7û×Ü–ÛU­ß¿“fº¬ñ5¨’·T*&Ò\Ù3DH£—–/b@’êëó8î+¥†ĞÁµWCÖB¦²Àg†K¬iB:¸gPÌ 
W<i¬Ä‰Û¢Ñy‡»amuQ<[[¡ 8Şõ.*L”º,ÎT=}q½ojÉIì-œ¶Á—CÏ‹vĞ:®üÇäaØ$£ä¯'ÈîÛT±ØY±q½áÙÍp ¹=«»• É ºPĞqŞB—q”V[ ÌÃ@HK»2úwXÊÕówlŞuº¼Mˆã¯WÍT–‚5ÖÀ¡‚ê˜8Úæ\V­ŞXvŠmRÙ21í7sZ7B¸†2rNÙ ´>ô™ë$J.ŞÚ÷K¨Í}ıt^ÉCÍ7ò“ÚŠ¯¡¶p¥ªm-/UVŞ±€’=æŠd¦61
*”ÏqšW–„D DPÁ„Á”B¥§œ%Ã/ç¿û"Rô†%ó½§Ê$Õ8ÔŸ]¡YÖS8Åb¤©»ü(Ü+%€,‡  ª H«    ¯!MªŠÈq0Ğ¦·1ÂùåL»ÎkÛ]¯ºQÅN/*2ÖCníæö±ÊµĞ8šJi§n>kíÌm—ş,…C2Wº€Î‡–ò•ğ³*äß|R~ÚÒÌôuêåSS…³ »^BD œ­ĞÔÒÂ#§®ï.6Á5FADOp+â@ ÀÛ$bcy/¡Åàû›U)x©7®Ñ«­ÓLŠ´LñêF»²}×kğûÏ|Ş‚ƒ Á˜>gSn€ Ü0hÍdBUŠ±’N(Æ”àá
kMCBdX"!”$BìïŠ·…ürVóÍnÜ„ AÌ¼ÕÌ•[z¯(Øx9£ŸUn¯ß¾WQ¸¹Æ®SU×7iixraÈÕ§%g˜wtÊ,½j…4kËvœ
‡¡ä^İ™ô÷©‚ Ù¼ê®ëœÄ$J)ù
Î‚'T6©¡é'ò‰Å2¶4H-$Öü±š‹‰h|42İ»ˆxË*È@jŞÓNĞw¡@ŠñUœsh nP ^£CSOÅ5B™*®¹2€.Àp  © “HÃ    ¯!mºƒa"iÖ¦”±ãljıM.gré0¡hêêiŠ}';ÈÔ/+ÁdnêzÑ6ç~ú¾#©BÀ‚ÈK}líu l;Â$Ç$JÅö^ò –L´oPï@Ú/ºVÊIº#rÔ`zn’Š¯—L‡q˜-/w´Ü÷‡åW­íµe&…nUIãN5V9ì˜™X>N©µÏsÁQ¯vÙ'ºÉuè‘NÒ¥$¡xëD>`Äş²²E€ ›ªFB¦:]†Œb–ÓIc ˜(C Â´m^|Sºèïãœqİ›JœÃ[Û¼¿`j¨‚Ü\=`åGÖæÛï*L`o¾ét*/ÛB»Y	ŒÚ¸D‡@Í8ZdÓË‚A€h?Hë*»ÌØ×& ¾qúawkFÀŠ
uW‚±²DÑõJÈƒ=ÉI0pAÿzi.¹ÿ+!6U¡;Ö/U¥‹Y{kôºè­îŸG$UÍÍa½¹´O½—ƒĞ¿òµ„RÈxªÀ.d¤r   {HÚ    ¯!=ªÄBŒY5¿d˜Ë9ª-±TjĞ'<ı°Öüc•¤´äÛĞŞI;ãnK ßk·Ô¾=äÃmÒ=Å"Ë3ÔîQ¬xÊİ”PÄŠ+ó³„ ŒÆG´¡Ê‚Ã[Y˜ˆuL2şšaªA©£QÎîº™ş!$•`ø¶ßÏzËW#œÕq9“¡ÎQi¬FrÊ”+N Îªa¯AÚ–
ú«£¾n(Œë‡õ ^))Êç¨‰Ô²¦´QØ¨&!VÊµ3|¸•U‰BU.%À‡j}9?}"„êwèç.SÒÙæFn½‚¤uì®¡Gã¸˜Vs&³·/&Ë³…Ô•ÑiUw¼™)Ù&4àÑâğíÂAdºµ)¦{xßØûÊiò…YgÊª­#d+ÿ‹!o­à½]}ªièêãÅåËû‹kÃ¬ª%hEKÊåhŠ–/ZŞp²hwğcşó&È›z‚×B!ò¬”íà  † ˆHñ    ¯!+M”ÌAb³ˆ´§-x»V^øÊ¡±rÀ¹’Ï' ¿H·aĞ{üÕ?Å}“W‡5`çIc§[Â.>gËEå½zO2…)u#6äÏU…å™f½¥§Ï—Ï:ÍŞË-“ÌøT ¦[æaºÚ,	°ŒL¿ˆ$À'¥t•¸ò:cLÀy]Ò	7V„:•>ÖÌE¾wbF€E‰íO~Ø‚  !tKÒwZ’Zb d-
Õ$ Ó(ßµíª¥•¤¼ŠJ«JU’ªÊƒ)D/W%ä*FX1UT“€Vï¦w²wJ’œc;©9ıM'ç=Û-ü¯Séõ>LÁ0‡7u&<·—E‘]„p;ùäÂQÔÒ_oÆ6^8'9%[_]ı×¦=
©Õ5µÈ	UëjÏdP •x`	ˆŒì(`åzÎø´—şÍjaf2`u¾‰ºsHZ¥=±òc	,LV+ÁQµ±|…İ+Æ:W\ œ$QµÁ
ÄN²–‹«=¶-Ó€  “ 4I    ¯!MÉPÔfŒPMĞ«4Û"q± 4Ù’dHŠPÀ•U ªL2µPï¢†yÊ6°Š“ ÙKØKãcØ¯•ÖJVä:ww é °Ğ80äyXŒ@‚õ
;¥›R³—Mj³»>XMjÆ3I`íEº™¹f–¦,l}&Lrè[uşº®¨)¥)³}¡³ÆÓ«Ë/vZJıQe°1cìïù‚~O@?3ğòŸc¬¿NGŞ©LId÷Cô÷Oê÷n²j{°i/g¦"–·êìÑì×.kK_ŠVÆ¢Xé¯PË8ÒUÊ¬¬)ÿÅ³¨vs2ı"[Ò@İÍna¸4äÌÁ{0r”õ-ãq5{4èP©j•ü‹~éÔd:Y1u=¦Ö&é³DÉ›MÂ05Z’I¸F«aC¥6ÂqTªQ/ª©ÈŞîê7~lıú)Ê×² ô¡éÒG–ËÚ½‘?f6Òã®»ÎXUÅx…öé#
Ö˜3±=UL‡É+	Ö‹á‘	+iOjÀ ˜4civé_ÜS+N¦‘˜}Ç8Ä$u¤j—Ü­#ª•ºq²ÍQ_Ñ8 Z;@'«ãŞ4ûl{xÂ	$A”„Ê¿4#¼2•†ƒhÒ¼O?Z•ùÑ>Ü›VÙÀaF‡É
‹]d î(sw\-Å@ÿ…‘Özôt¸A`XÑMÌœ…n½ˆ:ÔÉ+¾}7l¬µ.ZÓQ8¤îÁ¬h­GšèÓ-ÓÊÖ‘6Ç¸  ? ”I    ¯!{=ªŠÈCÅ`°™Os£JÚ¢˜š@i‚äÏÁø•ğ9iG¢ï:ÿ;° F=òÇ&ã¿İj¤°(ø×…šÒ·ß( Go$G]É¦›°:É{İ–ÆrºãÙ……r•mpd¨İ¶»:Ì½)Ç¸Óhwå™¡öÃà£°è(Hİ-[¢½´Sa…÷p›–OcA=mvóg3ªÙ¡¼ŒÍ¥Šø|WBÇa„t½öÏaíARœ¯o&ÈÄšUÆ­WN	¡b$í<f¬^iÆ YÛ ŒDF5:»Å×ò3ŒwÀ¥1!¨ çä§)ïµGWÕ…¶Ş¶òBRÙÑÁ‡î™¾cÇvWÒûO6D­Í"ãK”STŠÊyE}ŠTŠwHöaŒ³|^8Ü$ü·´B÷VDˆuŠf€7òr‰Uÿ…²nqåZÖÀ®`±±¯|r~¢‚cfİ¯¿·™ßÆœ¾S,6 7“ÌzNaw‰‰t’°u#“19t]ñÄT¾;£>£JF¹Â.]BÓÑ'²S  Ÿ I7    ¯!m9šƒ!ŠÔò]fpÊÆ”-ŠM¬µÉboJù’9mƒáv#y+¯œÁz(ÿ^ŠEsÇlw1êÚ±œ¸£ñï¾Ó‡%úß,—_-K}£×_MKl— MZ[L·$I{£~Ü©ªËÒ½”m©æ™¡Õ¯ PCézL-Êı…­Æ«©Æ·ôiQÇ6#£k]ÿ{J•£F³a ‘® ½ø‘=”B6à©%¸RÊNÒ‚SMÈ·T`äîí	c¼%£ºº ÇDMû\õíN·X¢ë*Ê¤ bÑ`;Ş½‡l]7ß½)FÃ7DôéïjÊÿsû6şùÆ»Üe£/S\Á`îsÆØ°fQ‚ J9ÿd$Ê¡y:Cù*à¶Xµ°Œ‘Er)½ÃcV!n·ˆ|§±f±A µ“
Ì¥m‘«°fN£6¤7!–k5XŠÎUÎbÒ”´'%_¢F6çÉ›®³ƒì»
Z»œ®ü„_Ê4"¥Q*)f3Ïƒ	jv«r‰ œIkPà  ™ IN    ¯!]¹”‚#ë!R»•]f˜ºªF „º¡W0pû.5¹ïğ|¦ÍŞúÎ<}Ÿ®K'°šİŠ	/ú;J©2{R…;SÙÊıTæÀ¼{%š;…ëÙFG*•«ÎÄÁaÑT
Ú’‹z‹A¨+³%2Ú.ê•–‡®ª9¤gÓEçPşúCŞ³.)å5K;Qs'G>ÎŒq®³R=´YHŒ~ŞÌ¨Û(NJçñÖsÓJÖ—Æj•°DŒQX™ÜzU¬5MÕ8…UªÆB‘EcËNØ~!­Àİ¨ „É]¯Cêëıò@'”Lôå·ÁszûH_bÓ}[]ëWqÚH•Ùı|r`ïÌÈ6?6•¼WúI4æxa…Ó	½£Û^¤
“–é…¨Ä)­ÖI÷[¤ı—²Ç®¾H™‹ÿß)ë‹Ü–êXÙ_ÓÂÖA0]™ÿŸîø¯ìÀ¿ğYÖ_rM• Ğy3#s<Óåj[‡®ó^õã‘Í¶I¥Wa»P•ôŞ•Ó“mdÂ¢ÕĞ¨F—–%  š Ie    ¯!5®ˆÊC‹…P÷‡@(e	¢àºÌJS0!o~5ÁÉùcoê„ğ9ãoı/›¦Õ}]u‡·±rç<OË#0›F´! Hë)ùÔfÔUFx½È³vQ :×³=ÂN©*_1Ş,6ºIa1ˆ”+Šø«^a¤üã:¤U²xúY|elÀ²ŞØğo¢(š¹±v8dáXÁY˜©¢ÂÚ¡2bÃ)±s$V‹V	U\Vâ¹­k5~êtEGk-)Äõ[±óËŸ­qÊÖ”K¬²µQ`l’(±ği–¸zË4©I…EÌ 9õ¶jÂêÊ¾ù€^n8kƒo¥Yâ„hdéÇĞñÆ6Ÿ„ã¯¢8RéKJô+9 ,(\"²C;¯¹Æj*&’CB¹0¬3µT-aº×¼Ö”Q¾C®Ä‚@F˜@?R¡±ıx*Y)÷Qs¥‡Å­t°îà'ÉômHV“õ‡fàş1yV‰kì´ˆ'ûÁ#õlÔL¼ 3EXÀH’şŠŞDv‘Tˆ€  › –I|    ¯!U†œÇA°Â°fWzËv®¨¼ºÀ¢„$hwÍHÚdÇN•=™Z£zık–0ıôğ1ü‡;û9÷ -ÕúŞ;s”Å¸‡¯(„tjæûçwVëÁ$jĞÃ™l¶ê‚S½?6Ş-Ğ@cû?yM¡ºr^kîdâ"{İÅb±Ø,¹t•ÁPÜ|©@£r7À®oZ×æVc˜ëƒPñ†éZózì'„Ğ»øÊÀ5#sªêRJr‚¹ª´ÈÊÃµ'8™à{Iy‚"p"¼tuÉej¤2H¦Çµ¢¯×T3Y‚„ÂÅÁÍ™*ä¦v¶F¿¬”à¸ÏŞ†œİÚ|˜6’&éQİ_•ƒ£Ïß×ØNgCİì¦…=© '29ËPNµ/<p–‹ªI';t\7–t”^¤e–cÚ’¹T¸ˆIk \)u^lh€J¶WS€--	|«ÿ.ØïB¨îßOBÂöÒÔo‹48¶n¡·FéR7­F-´£!zNåT½S1ÊÅ™öç¦ó2gÅ(ÉBí*¢‘pQN  ¡ šI”    ¯!5ªŠÊC‹	•nY‰WbëiJ BÒª½©ÉÚm¾sœÛ(p—˜ã˜%v]Lïî\#;®–ÿèóšÓç,NaÒ¬¹±ó*ºÚê8¡»Â}X½Wºì›DJ5/2JAR|R]Ô]vÍˆîwZ«Ìk’cïÃü2Zÿ}*ØªO5AØ<R¾´dÅ aÕ›¨µ½b·´ŸÖqnF[wÓÍİŒ)á(¨­î—6ÈFWªë£Ş0IHÉK¢s’ôéÚ]aÁàVZ¨¬*!
-i½kM¡jJ¦C
 ¾q‚ôë¡ª•lÕÏ·$¤i3¸ÉĞRğeÉmj6I
}‰B!Õ,f· Ä6Fñ#V®}¨§fl¢y¦úë§ìy5w­2â†Ù ÓEkù%a®“Êë“°™¡OPVâ$öPúô–&âPÆJØ]¥”ÖáI	`õ,Œ„avIà¦¼iSé*‹•'CRQ©İI«dáT£dà	É+ #½ëş”F© ¥2FC€  ¥ ”I«    ¯!EÉA¨bÀ³Õk¦P[$¢©J’‹Qv ß}ø\§”á7a_P·ûûğZÑ3-%Æ¯Ä¨)¿“á  ²*÷•)&ú½Ÿp†Qé™®İzŸ UÀ›²kĞ>­	”çRÑt«E!jƒ©•Uírİ¯kRÍ*Åy½H99·¿/[Îe*k Š•à.Ø>
L=ğYå\—­È×#÷Á.R{c¨!'…»k‚0]^…íâ­çŠr€Ÿ–ª%b,då¥ ³‰Fµ¢,ZĞ°§µQ`¬d(´dº¬’Í‚ÔbQD¡xâ5m‹ï´.`6_ZÖBR‘|Z¿·—ìIF›©ÖkšŸéÓ™ ×ì¥4S–§.Hé6s”ñ Å×<RÆ•Z®-€Lv#³T€cˆ±>„Å„ $´À£]Ä&}Ë´C­6éŞõFˆÆÊ‘Ùc– k#µdâ\¨Xo4§M·?-9Àˆ‹µXeªWº3[õV3’kÖrä7İŠ¢US“„ï¾ˆ{×<,é®‹€  Ÿ IÂ    ¯!…9˜#A‹qš˜®"»Ézª©te º°ÍN37ıuúûû”ó<I[sÉ[şø¿Çø•.Oíùï¡æºíßæªÊ¢Jë	Ø–ÁÉİá‹Ñ5/é0Ö“P&=ÒNÆâUÎa¨,# +i-@¢LÌ€‚ kJ»Şväù#ÓŸı¤éB+;áÂdô#«+D=2­ú#xĞx7¹|°DƒåJ±·‘R¶£|'ªÑãx°«jVJ	ŞÂ[îÈ¢ØDâ¨ñy†kAQj¢ à,T8´Zè­æ NuD¢à.|SÏ¾ÏäõmÚšJërY_Vz†I?’•‹÷®[p²Ov§­Ç#¦Ú%¿à/4Uòét}Ø—)ø`LYºTÑĞ‘ÒKtzf™!¥“¨é@)&"6 ·OÛ$hÇß§fÿNËBàœ†_¼ô"5\ù7šÛm¸Íà0kô9wO×ïYfİ²Z×¦®Ô8­ŞĞšóK’Ìâª ïJ¯vEÊé¯Q&|×—¿»I©V„¡Æ p  ˜ IÙ    ¯!]=”¤A0EŠ‡­Mğ0s^eP¬Rƒgñ)Ãa=ìË®Y–ÛŞŞÌ¹¬W~§•l=ı$‹,§Ü:ãºã+±º5ò‚WP¡‹!\òalÁ|Ù™Ør‚¨-F‹òšß•”4–Ï„”Ä:ÌhÆ*–ş²œ	ŠÂ7·j¨ÕÛX¨¤åÇŒ Æ±èì«Da0UÄ‚&uì,ºKck‹Î¿báKÒÊ}Œf¦é•;^4g™CÏÑeU)Ê•‹¶±9ÖiÒŠÁ{¥Ò»š„î­•µóÎ¨êM×“jÂªÕFd¡Ås"ÛL‚ÛÖ¢a"šÁµÁù9<=eS’QWìáCÏè–wI2û
8òõn‹WœÂ%À³“Q0Ùbp¨
” ¨ Õmt­.hñuHO9%5ŸŞw A#V‰ ƒN“:Q±º’İÌŞ¡ódËLíaÖ¬Şèœj…
P¿K(‰¬ìŞÊÊkÍ—ÕW‚÷“¢”¾RÏ@­RGø­Rúïcei¤j‘·Õ6©h§çz¯Wj'P  š               
ff–Q­‚$=JãD%Hşd++ÚoY­ÒĞÍÍ¨l>8Ê¹t§«<Œˆ.¸7GnòsIÂ&Ÿ¥ö×FLg$õuj5ä8§™3aEÈa6ˆ«E¦ø|yóV‚eˆjÂø¯…Ô…§¢Û¨ş/k1@ÆüÜó·¯”íjä |ÀÛˆafuqeŸÃqE|{ÀX¼9^Ù€ÃôÉ¥ÔìSp‡‰Ïºn ØfîÆp¤Ñ›râi©/sYzÙHi#u˜špNèôRÊö†G½¬ú |áo½‡€šn`„aÙÚR)í	.-¹…E–¾6PÎh‰ =`f£åjºÂìãûİ†é¦"FáL}BÉ—º¡Á³gÈÒt?å#*Á÷5×Ywãš+ÙîWŸDÀİÔe8$fåƒg<tj«
è±šl.#Õ_	¾_êÛË‚Ğ¼YÍÉgMzRŞŠç^¬ 7Õi9bHít½mêÉ†¸gtrGb}‚ôÿ±±FGË0/ØLÃNçËù1ZgØ—×›ƒá´…•Qlå{ù§‘&†cÀvî‹ªš„dÔ×8‡ï2œ™iòŠÍ<D.TÒ0ŸUçí²¯öUF~õiûÁÓÂí3K(l¾DyÏÍ;·’à³ƒÔŒ”q2#EøhCƒ)~İÙÒu"Ó˜‡   ‹abst          è     Æä                asrt              )   Fafrt      è                 p   )     ©€  d                    KskipserverIp=23.65.124.12 now=0000000000.0000 duration=0000000006.0140  ¡Îmdat  Iğ    ¯ Vå     ŒIğ    ¯!5ª‹b"…K¨­*·•vf«rë ¢AØ¼@æ:ñ-Û­wƒIÜÃšsW¦uDG™ó²¿wa»ª>ùÓOdÛ–AÇ0q•'LŒ"GÈ0ŒšİP‹óe¢†‡é´PË€º9O •Q$×pÆÖ´'­3r`¶ŒÆ¦âa”L ¥á@©¨Õ4²Ë+¬«î)­GhmG™³R§ÇCŞµ’U’¶ºö#wÄ‡Cœ{B×ºµáŞ56§‹Â‹´˜-hDü°Y"°všõ.×xwµ·5’–ÉBªÒ·ÅŠÊ…^Y[º¦ªƒXÜ›Ï>F;.¤TÈìû¸Ná½Ù?¬u³«ğÜ•ŞGš:S»cto9jY¸¤Şu³ãu£19Gá¡ÛrØÌ
Y¨fíCRm5³“"ÓœÄ@À¼=
ß¾g_*ø^hè
øâóÎùkıaãıüF{Æ—”Y°XD…%9Ùfrğ¤H:~3”'+Ş'!xÄ+/\Ş¸ªí­O½Ÿa^  — —J    ¯!€   SÚ¨Ì„1VÑÆ(Q‹JIÊ¨„]ïIxµ-“W€c6ô…7ä C-Áb8OÛÃôÏÑ¿H(Î~÷6ÚŒc5£tY˜æ«%A1VE-8QáÌmwf„g4g½•³"ª·P”(#w+beQÑƒÅÛZ0Ï•/°Îï
Úå9ÈUKm(rŒ—™q7ÁÏ:ÊBœ‘HCMWö'>ëğ{Ii'µ…)%,HouY±®`vØˆŒé…lvÉÏìQzN¥b‚ŠÜÄ€± (&…n^(j‰ÉBˆBåtYˆ­‘ÜÛ©R«ÌvPÕÒV8óÕBƒºß5[Yö6Î.5B
˜Nß¦4_ß–‡Ä‰£%ÃâJéB0¨¶¦<å0@·®ŞòrÒñÂø•ˆç3ãö0yÉìóVExQÅë‹‰¬š˜Ä@"k46†—Ñneå¦ÎN¹³0“äbÆ:¥ÅXI0K·i´_mZœH,^ß+zÖFÚQ0Ü& à  ¢ ŠJ    ¯!@€  SÚ¨Ì„X7¬ø­Š ¬Õ`Y™ëc’~‹±Ä¹%+Š9«‰İ™Å+‹;d»hìújÏ°Rgº;œ1eDù’À5s×cpgëVÈì æ(ó:VÜÒ°g”í’\`]yº†	1ï¬wºĞ:X¼dPw×ì¿d^	XI‘igİ…ÅÓEKĞŠv+FŞ%!z¢›I+m^*U‘MR¬êL!KCRÊwo°½Gˆ¡%ĞßSlƒ±QÂùëL…*ô	U@¢%[€Í:>Éú÷ÑÎ|¹<4zÔ¦ÇNK`ú·O@gôY6‘|ÙC—ãƒ…©1Éi=¦Ğ¶ˆn1°ˆˆå“„ÁP˜½€FCm=²™^¯šï‹0Êr¢.9ÔÊñ€NÈ/ ‘¦$U{§;Ióí2“”j9C¯<ğzÖ¦{%½‰ ìÆ3vª4$gg—Lnê·äV‡F®ã
€§ôœÔ‘)Í“M¹²Mİt
£<îıåÑj LQ>  • ˜J6    ¯!ÖÁ@ T[`ìD*…,m¥Õ$n‘ª¤Î+
—f^G›.†ŒC>©ñ‹üÛüUWÇ€*‘³Ä‰î}×ş7ˆäˆºd/K&„fp¨êp!!Q<rïáZ%Ll¤R$‹dIWe?§»Õ;h¥ Ÿºà©$Í/ÚóK¦°,¬Â¥¸…ÿ‡ÖñÒw£¶k7±÷]¯†¤é0ÿŞ2’é4¦íÇ*	®v¦5+K‚Œ¨8Ü˜•¼ğ¥áÈIK¡dªØOR‘­KZít»ŠrK¼ÌÖ7SÚà¬¢ƒr‘™ªÀÉWUMÚ`Ô¥ØËÜkûÑô¸ğªÒRnWı?§}fúİï¼¬C÷dìñùù6£ïĞjª5lŒ0$åÌîöVQ%¾Ï´¨ÊyµKvNP'9±£‚4Áñ’RÎ	i
+8"g*Í©YõJ[òt©b"FÛ$ƒŒXI`{3=&<e°w·lÁHTfÂ!J	n'/à©RCĞ8À‘ÜÍ°ã¶2¯d,™—¹5ã*  £ •JM    ¯!
KÁğ TÚ(ìx‰Â4
¯Ø¤%js!ÊUÕ„EĞAÙ[{XàÜLÃâ<–ßsß:|¿[¢çz2LIsøû±>;ùôM&Êr„Äì¡Å€Ù"£BH‰z–\I[,§Y$.dq¶QˆµW¥Ş„ß)O”Æ¬™²/uÖ¾Ÿ:Oª­”Ô|±§† øÆ×»1†Ù•ÿ·5±ƒµv‰áNÔy¥$é¼•Ø®€a¨ÏğLÅJø-†jE*§y¡¬=ËÂ¬R¥a©0ºü&·(Ï€w Œ-i»‰ÑÚa,dÅMİ2İ<E@™WŠ Óijp
bB¹k–Ë¢ËG™:òTgJï×¶Î‹å¿ƒ‹q‹/¿¼Ñ;+e][=Ço8OšHLP[OiNI'Ä\a?_ßıİıÙ:_ËÉEIİØK %B-^OT4É!Ê_Åˆ®µÕYG©=(, !D„!0 ®ØQëëá+Â·'xQKK~KVè©Irtß“7‹	¥ÍUHßU5†¦`ITa³ªğ¼‹q•ã{     Je    ¯!áĞ RY)LH2 XTñ§aº¼²Šofš¢Âàœ;x÷êY{Ğs2°›~òn+şú`÷‡ŒjY:İş'm¢¬Dy,ØÆQˆ"ûª¬n1®µ7f©u*—†¡(ñŠXbY]âK®
ŠùK…øOz¼-¸‹[ş²ÛU¨AŒ~÷Îş‡¢5E½v+bÎ ñYAiİ6íMÚï+û'6=’¸{}}vªbHIä¼#˜<HNESYà­—”Ê»;Õh@$È›˜îM¾‚ÔÊA±Hsg5»¹ELÓ(±TÆ]ØBÂJæ)SØ¤»W€Îıä:—UÂÓ”…;WëŞ‘‡;‘/Û£üë4åW“\Ic9¤Ğ v®H¡¨e#Õ×,ƒG±æµ"¬*ÕíøIEV™˜€‘ÁÚ¹Şêùá@VJnä¤*(áÑÆÖJDrğš—Üëˆ¡oÇ4tÂ¶w‚DŒË–å1Ò³É£Å|Sé(IN‹¯|¢t×nù}ÉS<mEê?áJ€  ™ ‘J|    ¯!5àĞ TÚhÌR!,ş;¶ñ­ô©®ï8İÒ·WGIyªX2H¹n(Ûëõ‡©f©“n¥ì™XŠR ½­9’å«,*(ümÌ¢«ÑÛè¨ª¤&÷áß¶ˆ2Šÿ›=1·ğõÉ©¯SûóÕ%ÂV‘ `èˆ ad¤Ü”j	TŒ‘H ÉÂvŸŒœÛÂÁ=à£<ùÒGm?|Í&ˆyÜ·«*3XËj›ÁäÂœïsz˜ã°!Z³÷Rbš	^“ŸxV!#L”½W^’€È‰4åvª–ÉGgŒ•ã*ŠŞµK¾*°"ö¹»®¬,@Tº‰ÊÑ(XBX@$±ynGzı¦«vs)ò–å8£_æ|ä7(˜‘(‹ìò÷ÒAo`cEvé®-JmGí(@ÒÌDD $%4î…=ÕßáÆO›N‡KB®

í§øû<\è"¤o‚íñ¾İ%Šv’fS…èá9	8îø³¡xkcµ…Ñ ™·JD— cF0¼ÁÀ  œ ’J“    ¯!
’À à€SÛY¤X¯_	¼ö;!Åª3¶‹U,‘ “ær7f±>-Öÿ!Ÿêy4¤`LÇğä6£I€!T÷Ü·ŸÒëI¶Úå#"˜ÍVJ1Poê¼\uûRjÁ¨¾P. ÏR€M½unÕHÑ!±™›½Ñ5 Ro˜”ÌsÀë p‚·µzì¼0’~•!(¨&¤Yu‹z–¸ÜÏŸ¶ÈàUÎ³¥¿­CÙÖ[x•~ö×ëï¼‰	]tEÖÃ>°$ÏKşÔ˜YEŠ-°œUµÁd ÚÃtæº…Xµ0Âv±óº5²H¢¨·"î(õfr¬ì&˜ôQWÊoûí¤§Cy„İÏ
´¸¹”ªä4Ÿëyz÷e"ÇQÆL²œØÚ/÷ë·Ïæ–onl¼i Fº›Š‘ÂúL;HX>ÍÈÕt&@?­†ÎÜå	C_­Eé‡8·NP û%+Ã7Q}]-”€ 2J|r2^\Jİ‰+[/€   ŒJª    ¯!’ ˆğˆSÛ¡H5(°¤zö&BÚÂéŠï~Ô	D´r?4q«æÊäæË™Xäş¥|Mnô	.±šwÕow¦)«®›(Ö1á€fQÜ t™ä¸0éJP“t­ MÈà…`ÀÛb}PoV¹¸£ÍDĞ<dT€FEÿdè<İTëÃË+[Ş;»»?(º¬ùp‰1°ì÷tªšN{9ÅC)G}ÏDÕ³èÜæóB±…Úó)Kúieî"ÎåççËT	BnQš”	NµªÈı¶hõ”ÔkÎÅ&’-P\PÛ`ÌdÅ¼°’ZñR¥2…(D…½{×ÿ'šfnş}fòuå#MÆÚ@´î’ÔTŞY¾a0ÂbN¨òØ		·Ï9r_y‚S @xõ, î(ºq±“¯XÆ†F¤‚@bZ_f_äº"Û"’/IÒ»,Î$…! ù˜«š^MTİ˜C¸Äº§E
B"°¼otŠ•’—uœ@SğÙ
C 	tíU_9À  — ’JÁ    ¯!’  àRÛàŒGDƒU
ÈIMªğè]×`4ëë‡æfô¨	)—t¼\²ğT¡ü·ÖY€‹Õ"Á!…]{äJĞ¦H›²¼¶…ÅÑü×l2K€¹XqÛ0D:Àßhp7ïôPé]ìDÄi3µmë¦Ê±ËÓQ£œz»XÚ¬ 2œ©(@Ü2ÜC
ˆh/­{0\t±ßè·”-ÚûqO™Ş.
Ÿê 1‰Üî²©iÜvVªü§|8$CÂğ'^KF[û¢²ˆ¦ŞĞ™¸¼fVGF¤Šö²ŠÇJƒ0ÜˆˆÅVjç¥Ô[-UI”, æ+ñø:¹†:Ş`3eŒß°~+¬NY§ê|ªÜS£Ö}rPEvğ®eQ!F9GÚ4eBs‰£ü±ñêd<ïrÒè$À2øE!ßÖí|§Ó(ÔãlÁqy²øš7Rµ5çÇÒ1 3ó>J¤…K\JÆ¿…œş«»ßŞ+jŞ±½	Ø^İºr&Í<VØñF‘p •Íë&îĞ²åû9Bà   ˜JÙ    ¯!² \ºS[¨ğU‚le€ª‚Õ$rÓrÆÖÔàw¶§}n>¯X=Wbrw´ÅN@´5İÅ ÉC)E:	3DÙ<Fr±
wÈÖ­#!CÎùzÄ¥°›Ò+ 4+,(HšD¾}P ŠÚO	ÙP
)Øm’…«¾0ª	ÎG:RGJ¹€M‚ÜYArÌ,F‹³ãá–#jur’5Úƒıš®!‡_œ…I.õÀE[éPoğ$(‰‚¯@ ¢C7Î\ŠUZ-”Ô# •]…ÀYa~Îq´Ô9ô +¬½¹×FD€(­p”	N&ˆÆôRß=w4”«É7M5 j/ÙÈŞÃ+¾ÜÚxÔÆ*5Ò]‰(—ØwºıÓT©á;IÖvÿ¾(bÓ'â|ƒš”ÀSğæ˜-–¤¸‰‚htİPs|Ó	šÈ¶ğ³Ğã9½“ˆƒ«ìûåW!ÆşşÙÃGGlŞ¿Ö}\çqù£Â„S}ñZì‡"òñ
C –B EÌšŒjMAçš–˜¡Ûš\m0  £ šJğ    ¯!°€ RÛà¬7	¤¦TTdo¥¦í”˜EìµĞ0q?@w´0h2°@N¦Ëÿ?(ôLPwÚ'=¼ò4ıe›dĞj¥ğ%b·¢c¡Í:Š[“ÇŠàÉÛå‘ùÎEÁhr ‡ èD¶?;…#upcW!•‰çôTì<g+kyò3+à>) íä±ÒM‡/‰‘¶8`mØí„‹Å¯Oo·§»]ÿGÒª§;¡Õ*²@‹hš“	Â
)ûRæ~½¹ÑVô¹ç‚ÄÄä‰
S,: "ÏA@Xˆ ‚$;½1ëØìBK9®-±Ó@íuT‡Î%·s²®-:ày~Ï·Ò@@q(Æ„
#’<_ÿ[ÙNE¶\­§±B§+|ÒŸobĞî:àÃÉb`$,²H.á%S$_ úçß“ÙF[‚d'G‹
“k°çiöKàg¢w©iÓ–Âš\hs¯tÄ'h°ò´&·¡ƒZw›Ó¼>^3ñMxØ²YÊKÀI÷¯W±  ö¿Y5a„ÁF  ¥ ‡K    ¯!Ò¡ \ŞSRlÌH
ÄRê¤æî¥wÑUÖ4©UY3¾¥ö]Û€B› ÏBü·»´í^>‹²6Ø20Œ¸%X
®}ŞxxÅÒçıãø,/°T³ ‘˜¨]f©)]‘º²\è€Zâ»ÄGĞXœáÀV‡£-ÒzøáIùÿiDÜÊÌ¯¾uC¦èà¦ ˆh}Ü‚ş,oY¡ŒÍ(éøÍ+ş:d_ Pzt@RpÅÜB°&Lò”µ—‚€i;Şõè(ŠŸ+†~Û¢I¢P„$9©Îœ(‚™6PO€²»{^÷ÇÜ6B‹
$NÇõé«ü·â	ˆÓ´dœwªyyÎ
œİŒ)I@q6ûÇ»,‰‘¢
„¯Î(É9ˆ3%á‡#×v2İÕú†dUxÿ5ÂcÚjFîÙQ;¬ëÑ¨&Òù}öŒë©Yo:7`Ímc¸CŒŞD€Ö åjw	Z ¿yİr	$©Oåt$   ’ ”K    ¯!’€\jS\ ìeµ[’ŠÕ¨UWŠW5Â…— g†¶,—»ßB>Æ5ÃË„]O;WŞW7­’bØ %òCÓ*7÷/~6 .G’mp”¸±ñÂFÆNQT3eÊ-nV;w” àÕ©Br Õwœ¡QPC¶[G=Rââha`™@±Ô&á'd /²Ç@„0³¥ëÉµã3ßXJ§x'=_ÕW?zîÚ¿›”q|nÅªb(•Kİ¬eã’òéXb¬Ì&÷Az.9z6Èd'ÙT'Ù* OÚiLe(˜d<y6*«“W±s6Œ%:,3æÉê[„™Y÷­å‡h‘¬? «òëæ˜Ú’{İ<èé»=ñÅ†Ê:G€70†`9h„ÉıÓÁµZìÃFnXàJØ@3 
_‚:¡#‹ÚT›êÂ4JÄ€cm_—óœ~é$kı=ºÎ‰n¼{z´®…PnÌ„7w\ï¾…WWJu\WH°¢‘7‘‚—5'½<±¯Ş½ŠúÄQ´À ³€  Ÿ ‹K5    ¯!²€€[hTÜ ˆH$P‰Ü*m¿0¦ôÎ9ÖŒSnî–5N.¸Ìü›1{UrJ67<šİ<!.*Z_+2eÒ·Ô˜«X. Th`©D¸v!+Ñı´k8f
Ÿ	ıŠC;ÌaÏMÊ<JÊ ¤^Hú`JdPJûâÜ©ûÂ¡?\Œ“Ôˆàˆ^ô{á¢PQA©{Î Ÿ1\¤›Z[ıSJŸLE…ÌÅ vƒÎW×„~Àd@)reI`KÙ ¸3Ì¥óÂRÂˆ ÃöŒ®/[R‹(nLG†%@‚AQIHŞ¥V²”Øò@ŒÄn‘ø‡Š&ÛŒ¥ÿgŞ`÷´Å,ÊxĞYP¢û’jâŒ©(¹ÇXo8èRÀD¾ÌZ @CHHB™D¨†S¿™º¯°ı»n×ê=Q7*Gcq&ø€a¡w=Ş£ƒ "zú÷ì À³ÊŸ¿U’ô UwX”ı?o~¯„, ƒ?(³îK2hÍV† BC€  – uKM    ¯!²€[ TÛÔP6œŞµ·j´R¹ö›i3%cu¥öˆ1Ä#è6ãÁŠ¦´9²]w`½C©(M'6-©JÀ}€·f…yc¹ŠSİ?l›Âg€7qÂdš¿¢Î‰5±¡ĞœO¾Ãï>UEcÔúoòİ§åÚÂ¢¸*ºÂrÅ}Æ¾WŒ¡V·A›W£4^´WW°5±–Œ#3Ø¥ú™_ßE“Æ*¯8½ÄœA˜í‰è˜Mhªn@çT ÖêˆŠŞf2pbâ“¤· ¥bŒÛˆÍ§45ÒŠf®zÎ4æ:­IJº©LÄô†RRè8‹z9kÍŞ7NI:®Œê5QŠtdÒı›åì	E9éıĞRbÓ0önÆ7¿~xÅésc1”j[vß[çğ×S¥œú!™EÏÑ÷hÚç2\ı¬ò²KEç$«[(3İbë8F Ï¢lğ 0¥¼ñÆèQ°’B?d   € €Kd    ¯!° _ğRÛØ”†é˜½ÔWÅ‹¶äUUeRó«°	¤’4ÅßÅ¤`F÷t‹«àsIá$)­o¢[šÛã£œ8ç¹ú8úƒ´¦À•ÚösYaGÿm‡Dğìğ˜ÄñîQ
%CÁ¥¾¨³+ÏÔ–”¬|>+ët3¼ÙòUa¯SW»Â½LÙ´L0áãŒ,Ææ¥l—­Y~&Æ0RGİ¦¦Ã£hXí%yHLÒP €
P@Â\¨fI¬Qfa
Û¬è  RÚ¨–‡a€P" „eDC¿b³hÑxsuEîãŠ¿^9ò £äóªs~ÉÑü­4~ä$ÿ×†I&í<uÒ<®š5ÉmÅ¥ı©kàAx9~âÀÃp)‰6ıêE|æîIŒ·¸ÿ´Lâèctd„©u@R‡o“Z˜Â²°n`x˜£Ùçò( N\cY(ÑÇˆ÷S[t÷ú4ş9. ¬•³x ñ$P À8  ‹ ŒK{    ¯!’€Z|TÛ ÌH"˜TqUÎkUjÑ-;êm¬Ê.ì5jlgØeL#§O€µÀÛg„µ)õÖ5àÕÍû¤;Lrn4»´8gÜ%iÒ¾•£OŠLOn"Ş˜ë¹LEbÌè±ajIıÙHg3òç„F„®d(­X\Èd¼á2ˆ€V}ëÁ]j3–à9ñİJ»½ı<“ŸÊ }pÑSİV.==3ÏÕµUw~ÏÃa{™0ºùõFQ†]:R&»^“P­ËU²|Rû€Í(Ë¼Ë…%’Ü
U!‹a P&`„ ÓnÂóWJ¬V"CÌ×aª“-»ÔÀ¤£7T·ÚÔ†SÄúg9ævSY·ö4%ùò åkN©op¯¡ 8„Äìé™ÕŒWYó¶€,0ølØ—-®Ì0ŒU!A¦¸j'·hK‚
kTì3
qÜc’¢	Ù—ß+á#¹ €VhJaî–QF!Öèçx	MH'¤G^¿i±Ÿ– ^]a:³Pôg  — iK’    ¯!²€[ôRÛàò¡Hœæ—«+-eETåJDj4k^KHjæ‚•¨Éãağ8¡Ú”ŠôŠ-\Ñ/!Ô!C<Rİæ¹œˆÿ,Bıİ20¬ÛwDXOÓ:+@®b†BMª)Vk©Pk=_øÕYÁõŸ¢šåté£¡Œ¥w¦~&1å‰Iûİƒ,ºš:m¯Ó«ÆDéÔ–
¯¨‰Ò‚¯Ÿ,'=„ÉEŸÔi„AP zi "oŒúÀ)ìSĞxÔ4æ+…‡ ¨ÅÀ#+5»ãlçD–3tRÚ @êã–e»ïÕl-¤g`ÈÅ‹~{ŸNı‘gûŸ8õ¢FóŒS}qyîLQ‘¡
×®Ãa
z‚áÚ÷úÁYd‡ÌÀ5EìP)#‹13ptªïº]Oşôw[5€FKêısfúÿÛ$3Ö¦@l¤˜b°†èà­ú{ ÑFD. ª°=`¤T ëúÀ  t †Kª    ¯!¶æ°WşPÛè°CÂRŠŠ6«£@¼­mC( Òÿvˆn6œwÌ›·È£QÙ
„È…3›-q6ÙÆj-u°i¥ec:`NGN°×ÅÑRIôÈ"ÓsàLAHD)`ZgQÌ´71»O ¡X.ùÜÖ WAM?bÈ!—Ï¬& «íºå—ìnİ'³É€™íî2RĞ«¸Zå[ÏÎUöıhSÇëE$¼\_Ê ´ªÅá<øM˜%ìHfR¾‰‚êàu£N(ä&û€òa-O^  iv‚ÇLAÀÈNp
!	ª³Ø®DAºJ¡­7ÎİûÎ»wä8_áÚiZ¡ñÖ‚ù’S9~mš!ı½h«•ŠlçœÏ±›øhñĞSæ‡M
^*¡ÂDó&„©_ù7~ñ¯¾ñZY±á^3ºSjÕç¶¿Ç®»f–™®¢ôù·bŒº»	•© ‘”ÍŞuÂi½ÖYåw±VM&p ”@à  ‘ }KÁ    ¯!²ç˜×XR[ ¶…È¦ „E<_›1TÕïLŠVd)KLte—ûi¯¤È—ĞTg‰À›f‹TŞÔ„xuÓ©J°/Ö£TÄ|¥œW :Mvƒ•UnÃ§QJQÆNÁ’P¹Ÿ²A2Pûb_ePŠ•úFW$ŸÀ+Ró5©xñ‚a”Ní‰eö9oìºéY‰)Ÿj	ÔãèÆS=¼µu×ÂÅç&Wwf¤[1J}¿r“ßì‹ÁVß]$°ûfIÖ p(uŠÜÒŒCQ•ÌGşõ€?mÊù v¸+Âƒ`™€f”Üµ'èY‹R²aMY
Úe÷NR:õÄç‰«!x^§g½‘ªá;ƒQ"ün¦B#çñ%÷Xí£\É+H«Q* ¸m¡dØ÷;;Œ-Š,S—Ö3"©nŞ%G¾2roá¦İ#ŸÔø5ğFädåhÉ:Œ±ß:,# iEÒ¸°ŞvmÇTÉÀ!`œl‡Óû“°º@ éq É°¾èÀ  ˆ sKØ    ¯!¤â€ÖøQÛ¨Ìƒ€7ÏK”4«Åç•µºº@§¦¦ã)½"ì}öKåŠ²ı~øÅV,™8…{s½A{¢Güè<”½Ç-Q¦DN!RU`N73G_Ÿ^şÓøyi¡f	¦«÷RI+¨W·¦¹ Î‚¦Ç-u™’RƒJ M=G]7y*YA1` ùT¹µ@¹7Oâ›7::½	-Ğ¯€aŞèÂE¦Ua¢r¢$ˆ¶®"ŞìáÖÄ LÔLgM‡Ûd@B@Œ%Öé,R·ªS² ¨ö©Ô—°7:·/°–\ªªÉ/µ%§ä®$æØ‹2?1C,OŞßdöAw"Ç‚8*o±G49§PqÅÅ¸yBz¦Â¢nOæĞ$Oßåã)ÉQ	âŠŒìlÈ)g8‘«¦óúpØ7ÆÜË†.ºS$ä²SÈË€/¸ „W$àD¸’ò à  ~ `Kï    ¯!    SÚ¨pf8F,<_âVë¿„`¶5œñ[Õ—®Ò›Šå¯6dX-…Á>Ê³Ä‘ù…š1}†5üDwVà§]<—(&20ŠétK0¢ŸØ¦å=‰v$EQ¼Yw9ˆ¢8ù^ 
,üb,êC™Ğâ¸úyT9Ò‚`^9D†÷]H-ªÅ1óÅ½øfnFeN3ÌTVÃŸÛ–NªÉR›ë¦ú€
Êzé,ôV5ç€ÜfŠfü·½]7ZbVP.MÃ±-şı¿yª»¦–Rg|ÎûºÜä<CT÷nc_ÅÖÀ?¬vrÛiÜr|ˆè†{µ…óÿW4w¨ gBóé÷~7M‹Nt$• ¶µ.P-†¤.,*@N–2Û§Áÿ¸	wğ¸G-Kœ&Vñ´¯ ®ÑK—İ2nİDx  k xL    ¯!²Ãr0PbÒÑ¹!ÊÛ±'vªŠ¢\Z ©fÖ¹—T»yWşÙ} æœ¢>¼ˆG¨ÿwÜ^ú9Û(¿c×xä—uN\fJBÂ¤/´¶ŠQJ\åéä¢D#u±`PU"L.y2Y7¯Ü{ÜpL+QŒIPjÜÈÁ­³ !jz­†@$(?A„y´àÿÈ©ïyß‚nÚ5W{t¹2N²)Û`¨®«„U®19‹~-èW¡D‡*5<²œE¯¨;ÂŠ«hD SZ¨¬eP¬W:âÊ¦[•ŞmuÜÕ	vÔ«xÂXÈ]z®Û¥À0çhØ);””"ÏÛ_!¬\iú…¼•‚™‹Â@%VëfI+ÿÌ {şø‘VÓ…úK—LÍ]“u´ÃS)®ß_ıühú¹n…E]‚+ŸdHO>¿.¦BÀ*·ÕÆ’&=:ÀS‡Ø^ÆÜùt­Œ¸@^%2Ä|p%y ¼å“ÂN±¿=Ø·œ  ƒ ‘L    ¯!  PYè°f,‰L-†ûó\ğ¨ª¹}“
#B,[ù&bõªµ”¾	­ö&M')á!9OŠ#¯Í¶·«Ù1´Ë¯iUœÓÃ`Ø@-¼B³Ö\’ã“¥Iîd•²zA‡ŸB0¥òÎò”õ5ê}‚S:Ü¼©™¬ê$€•ùgÑ÷fªçuÏ¶rÊk0ıpÎ`WW_£¢j‚ô°õÌÕ¿ô™ƒô2ü8ŠPé\!Lº©/C~)ŠáJ)DeG¯h…nP^¤%2’ä )-TV…ˆê¬•ãÎpP«Û†siİˆ.îÀ+ÙàéM·¬öRœ}x6œ°{ñÕCjI±Ô®à<Âäá=©—2f8¦Eœê(5İÏRß—ÖøÄ#|ÆÍcëá-¬æÏâSÆù=pK=šÕ·ì€†ıİ¾¦qÆ¼à8@b…Vôôw8Yá–	»Up»«ÔÓÛ@`†Å-ó ÛZ¼'K¢ï8£*ÇR8Ûd*•jªU‰eE€8  œ |L5    ¯!¶Ã*E`ËL2Æ)Î„¥ÍRãÁ›’ã½5İuj‡×À /#§°ÿÉÒ´Ní]kä	”¸6ÏDñĞ‹&ÜTeŒÙÉ"’JpÙÿòòÈk¥«¨ÔìkoÉÀ8JJ†°ëà‡N×»rFo«vNb#„sÓr¹1^Élk¢kv¥ÜÎû®}s©M	ÅJJ¦EŞ£ ¾9Öì›‹ò€¾¸	í­R•Ôú-aÅª¡ù­B*”ÔàqÊ`PÚ¨°: Æ-	[ßM_<®•š"Ü%€à¢Y».ì¹½ÜYˆì“åqªæTå#”°r5Îİ¼Iıœ£UŞO“3üIƒÈ´U”VÔ!C˜¨Z<€’İöÈ4&v}ÌEÔã£«è»Zøş7q»}Iò@/BÀ©Ó©
èãqğÆ
c¿„\K¯¡/+ñ4»÷>9¿é¯·Ö…>x.{æ9
Ne5ÍN7‚üîFVˆEÔ¬ˆÚ—•@‹Ì à  ‡  LL    ¯!  ÿÑ[ah¢(•ÔKÇUæ’lªİä”£*–~NVŒŠæ½Ÿ4ë,wH±hzµ¡ÁôÉ‹zM‰ºãÑÙ¡šq}SºnÚšàªÉá™o1YÌ8’
–I¬ài }¿àFy‰~-SÅ)I9ÎH¾s ·3ÙûY=Õ)ú×µïî­âÒW@·¾sz3G[ şB£ãÿÒ«-´´öò)ıÏÙfƒ¹šíİäUx%*@ !–‘ó½?3QHô-lëoÎ;~ûğ>|ªsCHºHÔµ3â/œÆxÒZ¨°:	ÊÃA€H •¥Võ*Û!¾Ö³„Y<Ù¢fè‡¯´Í?›wäÆäzlsÉ yù*Š?¡F¥‘73ŸÇ¡(”f{´d+\WÍWõ¥/àÉ,0°Íİ2»®.´y}DBøÜŸ¥– İÒ¢”bˆLÔkñ©gğ´AI‚@‚ ,vj•J.Ë²È8ÌPı½íBJáƒİëûÙWºƒR)O  « šLc    ¯!	°€kÿÔÛiLG	D¥NÄLíæò©Ş³)TL /=·F3ùú	f6[{’½qØÆÛÜš‡Ô8¦=YnÈ™ïáØÒÀ!ìWè#ÀF"‹c$F"ÆÓ§T¡~ÕØ0=o+f¼  HXdœ:f‰dÇ§Pÿß•Ğ?A;Ò, Êr¶`¡4ˆÓ¨T5sjã–ß]ÊÖNÃº‹ğ¿.à<Njğ\JG&Àùf¢/\\ÒÕP4k"nóYeˆd&¦š;2|¤KB’O“¾*­<9]Ñ@§ï«2ÜT-bŞ'káoƒT_  æ|äãN“©Xù®Äy)Å-¾Ä  \,1(-¤™¨a¼·¤ïJÊ ¡Î;¤·;³†%é¹¢»/6å)vu\Æm÷ÈUÍ˜";TÃR 8Gí
Š…L`ybÍeV=[ü£)‰œÆDÖã– }<=³ÚJ¦Øª}²"•}û"‰PÃ±9ì;g¾¡eİ“rë±¾ -Gêôí $û<Şş  ¥ ƒL{    ¯!
˜€ @àQÜ(lt0±2{0àQ@Êe€ïşŠz«hˆ¥˜!ªSòæEuæxÖHÙ‘1EÙ ğ7›B8ç…CrŞïmšSÔ"kmh`ê¤Ûƒ_¿B€z$Ï^ú§zæg`šöô¦}¸zy%`‰iL,á]@`ZeÏ×jìæ¯è+‹ t5Q|é‰Üµ£Avb©:ulÔWÚløûs¤äz&€JĞÊ±D=PTÈ¶(qË…M…@òišc¸‹ ,¤i­ĞJ…Œg	MtzUõİö–jS8]ì€Ò*'aìªC,ntÏ,Š1·Cno¦Às¦c\M:µ­ÆË†Åš‚Éç1Z¬9i$Š0°Ìcâ=K ›ŸGË„ˆŞÛ0áèÄ`’ı!Jz'¶“(H®Œ>“Á é×/Ó[O$÷s5ªíï¥¯½´p@¬ÊÔ_Rí’ÒŸìE‹èPu^t]NéB 1 )   vL’    ¯!˜ RøQÜ!H8¨¡¼Ò‘œ
¢ªªŒ¾€Meqç"ÛˆœuDN×ÇÿZ… Ÿp¬G[õmİşhæè {CvœT¯Sn'­h"˜Ñ*–ğ¤ùu ¡Øÿ ¶‰×äš”äLá˜
ò uÀ©¨‘j±6Å´$ŠÕñ–P’‡W`Ñ2á[¨'Ní(³ë˜Ñ~õF3ÇÃÚ¥oû¸K¿í­°èåk]@­s©	
•}¶15P¼d]’÷t   ¸¢æòØYKh
¸ş!72àML„±„Àq	]8÷q™u=N%U­6PÇ@sàCóæéQÔ»Aó7ØbOTq®Z5Şé{ş7dè(M!PxãšNÚ™œ¨&£)‚äŒD4#@L 6Úñ¬Sa&R4>B­6Û!õé+¡pÏışºJˆÆòöc”Ş2ÙzßN?¿T±ı}=mœh5Ø:y¿·Øtö'‰ãeFğjÊ¿C€   L©    ¯!ú V$RÛØT†ÂR›Ã7*ânêR¹ºÛ¢hï•¶a:$×<Ö¹»•Å.ÈÛœâ9ú¨¡X‡qwÿ^/ÒZ”×ŠD}ª
Dü`Ú$—î³Á0ÓĞ$‡f4Êğ˜N·ùôAt®Aa@â¨¼@wVUB‚ú--*ØøñËI±¾[ó¦UqŞ;Omûâ%|ù&"´Š^zë¹ÀT†@noR0("Ìeî€ Ä…<Glpš€×¨\—Ikì€(ˆGµ0¤P!	ˆ$‰ F4Ëµ7~]ö)e©“(–¸îˆ‡ »xQw1è«ÉkıÅû_:oÕ˜ÚS‚$^{±ÆÎé÷Àn×üãïÊ®øû=èü|c8—%ç¬pUõ	w7Ùõ«Œ!?:_6ş¨:I
ÉºîÛ¦í¯Â¡
î—OZ UË”á†èhSºsğà¶˜ªZß§×İ)ŸhÌ-l‰ SæŸ’)ıD@  Œ ˆLÀ    ¯!ø„"Ö$U\ n(Jj<óÀ©J·|@T¶JÍİL¸ ]Í"0¬QÙÂ2©pšİrÊ%'a9Ñ‚Şk;>şXã½¸İgÁš¬£ÂQÀ¼–;4ÃMu›dÿ´¯ôL±gî¥RÃC³ñ´ƒ£B# ”$èb„ÛÃgµËRû?>I‰ùÉ{ˆ_U@¾)UÜ¿º:ô¶¦Zû·‰èw „ØßráyT–ÿOó}S¨š tö?î=V  a¥ê3œ»a”+}‹¯®rV˜-ŠÚJ±5ª	a‚¹ f`œá]š÷2š†4X(ÎMã÷hÕ èg?AŠmnbDÂv]¶oNú«¹ß-€‚—şYgînLék·,j4F’Êğ4zK¾œ L	q¸8Ô÷Yıæí3LNFcæ g	èIäü
1,T³ÛP].€ÙãÂ¦Z6a}´Ä¸‡…ç„„	ëo½• |¯D©N
€ğÁÈ‰À  “ ‰L×    ¯!à¬ 2U[dp7Fm_ÛâuPR¹Î+Š¹B˜çE’ô .sSıÙˆ„ÆÊ+¤ 1	ÏS‚äŞÇdõ­jUZºß¢w)0×oA`œ\Ù}Ù«Õç«1Z±èû ÆX]m_}T*ù¢‚	äÚs€FÌnyşà>—	öt§ï	nUDw	„.÷4ÂVÍM+núPîìYôîbzFÉ®rû7 ŠÈ™((kä­7÷Û’{v	uNF¼Ä‘ÑÛVDˆ+’Şb¡¨Ø¢•q2¸Ã|W4^-*·¬ç B:ÿĞ/èUÏ-v=’ün¼«rÑ0ˆ°EÿE‰²˜“yùãÃ)‚?‡ü'±öcï|‘áƒ–×N8HG%ä{µ$´¿µ}_N¿/á€íZBÏêŠX „nï×HùÔ”L7üª s¥|N-¼2ış~Ñ43ÿ(Ë`q‡·ÚgJoÿTª „![/in«¿õÁ5‰jN UpÀ  ” zLï    ¯!†€@^pR[À4GŠpĞ˜sÅUğU²ªUw9ªÃÌ |÷+· mó1¦·kPfô,’-ÄöqáXv#“ Ÿ›Ÿf˜:œõß’ù åæh¢ô=l·Âƒ£ğ‰:g6ÅÔW¼Ò%]^ˆã^–
šELÑ>^æKæ³O½H@#*ªèÆõğš
va€Ó·íÏûY-¾T0?Ì|ô6½Ú4å[Ã8U/±'ë PÊH 2“$	‡
Œû” X*áÓSoPi(P ·Á\lHŞj›Ò°Íj lÇ²şİõšFIkÓ4¸¸¹^.3ò¤b˜
ÖĞıôZd1òÂ(Gş ­î_Çƒk¾åã¹÷š i<–n0¬køßéoKÏ»İÎÕ Ã'ê­ÿ§8FŒ××ş?Ï&&y|?qáiMpHóşÿmD’âbñcš ˜ÉHKe.^jÍZ%,‹#@€  … M    ¯!  FpS[áL5¬’*¥8Å9uRL^èb-CØöüFiKërUyv	ƒôZŒ8"ôŒ’×Ú…¹‡d‚„IÓºª7nÃ-$SÑÎåïËRäÚn
Áµ$8=×î‹ş1EĞœe8!‘¯œã!|(ßQEhèîÑ¶€"p!Zƒ.Ÿğ^ŠÛ3†i9ùôB0Ò pôı*ªB—T›º!çÀ>ƒÀG% lõœÎú]WØ"Ù¨§$D)÷Éa„jR1˜”¬6Z–`J†Î‚¢h #ÄQ€‚C£ím&ÔQ‚Şh Ù¼|wÌı¾¾’áqè¬§Á~ˆÆØuN‚µ]b‹öùìQ³6§ÄïÚî´¿¬Êd›Mşem(¿p‚è}¨–+	g£b€ßD~ì ¶d/´æ0 !úÙ¹›Ññê†µÎÜ5¾V˜[Úõöüs”@Ø«áÕèÓu¸¼é`‘{¼€ëò4gØ{¬à€ )„¤:Õ”ˆ]sP¤ à  ˜ ’M    ¯!° B0RÚˆ4=†á`ªD !‘tÉ\7½8Ï‹Úe>˜ø£SK,K‡VBt‚”MbÙíf—úÚS„á}®ûÆåş_d0:N€Àl5[r|”KœÀGAö„"İÚl¨ZoÔàôy}×£¡#?KíÙ:øàqë,jGbşQsÊñZ®¾›N¹^»ç«ùÆ}E÷t{*TÇw×ê›P‹:ø`#Q «`¸¹Íß®jh°¬@…ËÊâ®Ò!ù2,RPA¯.«¦°$fRÛÜ¬8	Æƒ€‚'TëĞ»S1j`‡+w¢V™ïhÕŠüÅÉM­í1TJšµQ¸"YÜ`#V¶IÚÇV¶ãõûé¸˜Ÿôç1>'uƒß²7Ôà)_ SU÷Z£Ô’3»ËŸlişGâ cøLÈL'ƒY]Hñ:ø÷ùU[F¶ïÌ
X©|H*z=yûjT^NûuÜŞú§pŸ¸W÷àb´±‰•vø5Ê à   —M4    ¯!°D€B0SÚ©PF#…J%@NxuDŞ³Be.ïÖŒŞ©0GÀ_¦/;—°8	[NÓïRpêÁRDİêy`ä5Car8c—ƒLpÈÁ×+™“ ¸gÓ”z	rÈ€8çpy`aŸ2yã×*Ş
.B!Ã‡ë¢ò–âLç:]LŠ™Â.AˆŠ\P-©Ëªıõˆ˜ÏøñD À‰B}}hPYŒıÖùuoE	ÜVÁÚ±IÄpÄóêŞ—Ê"ç~Y†Îê
-XëH ş×Æ´D´Ah?ÜÆˆCbHØJQ Båôrğ7Ó•( ¾SK#”ó4QË^í7è ûš&¾°0GÿÎ&§¤»‹árPËU-ø-cæ3•££	[ÑF²CÔÎ*ôDŠ&²0äiÂ_6“®™æRéÿü©ˆÓ­ÿãØº?Y–8Ç4Æ¯mÄdJÌœäb .çãÊöZÀµ®.ıÈ™çõç™çHDÙ¡Hî¢{ûò«ßfgà§ùòèµ&¢°¨ŸÖïÆö  ¢ –ML    ¯!ÀBpTZ¨¶X+•¡€„ 'l•¨#$‚ùºÌ]k V‘‡½Wš$„¸±“$E‰oUÅº•cÔ‹4Sçº”ÀSŒ¶O(Dµ´|ºº˜ußx¥„¶,-x‡Èhô/ ÊŒåõë[àäA)·A1 6#†Fäg$ês¡°µè$w)õ Ä|¢Mz­·l‹Ë´ËZ½û;^EUéMçÈÖù³CS"|½ÓÏ“ R¸.·iİ¶^£ë2‹twNÓÙkõâáÄ‹ÉJD®g*bì„'¶ÖB’×&ÏÓL’Ù’@\l"F€Œ—v}¿­…šìRP<ƒZ©¼cªÓ:º+-*ÙbtPâœ„µ§ìø'r\7åìõ¤&#Æ×Šú‚³‰É	¸Å¿ù¿²rƒ[dVg:nH­¡èGğ¯<pYóşG…L*™4³Jñ¨ª¤ß×Ô9ôúÜ)‹Ò”ÔT€°7hpóÄ5¹??
qœU•RBjo•ºãD­ñü¦_eZ@
ñ¹Š
Ğ_f+ƒ€  ¡ •Mc    ¯!	°&ÀB0RZ©(+	Î%@HÅ§~fí’^5šæÙ™ªV:®wøt¶1ÃW&yãØì~Oz¥rª.{ôêà&•±©€Íb,B×Y² w{A'iï2LqC7NòsP¥Ç¾—Ó’\Ù'¯8 LÎ¤ñzs™í0›2œ·#õpôHÇqÌ(Ì #pÎ78‘JUÑ±¸	Áô^£G×Ö^«û šİ½Í]p†—cz8Ş¨”ŒÍR¡TĞÆÄµã2ğDÛ¢VU¤b `XR`ÇFù RÛ`nX„¥ $(¶]d*®çr¦f¨€dü8¥ûJ—­l%²ÙéçÄz¡±ËJ¡nUŞD÷Áj0É£ÑVÀFE¥jÅ«÷uæUÁˆœ ` („µn”=®½ÅR;_´xÜpJuøšyQÒA4/¦Ù	@?<;a-¼Mw`*E¶Ç^Ğ_wñùğøâùÂú{+ İ‰/]ôgxÙ{ KbÓíuo ÇGˆåaÀ    zMz    ¯!™–€R8R[)7	‚ãA™€‹…e—B´­ËÌ!ËSmƒ0÷M7¢ë²’M«â4UmîØİz"¿Úã¡:j·‚õóÏ¤‚«Px“éWÀº(ıÒ–{$÷ÇĞ‰)‰‹€9ÇšÛ‚g?™ë÷³Né{)*ëÔéÉ1|/Îç•Ä%cæß7ZÿPhŸÛÜ1²‚8ô©±cÿŸSsµÆÂ	ºª­i j³Æêy#ÕçÎKõ»Ô•.´»Ë{ß%#ºh‹Øû‹xœ&ÑpK2íšÂ~útEk‚ ¨,8
¨H'‘|‚‹î[i,ÈkH®ƒI5BˆÑ´9¸£>ªÀ›ªW K”cpvbø³QJ!ÓÁm0QrÀ_¢Á {µ¨¨3_Q<Œfu ¤C:F’QãšãyÌı=·s#áÂkòå5–F»i~<ûsü§9P	(¢ş}±T/«æ ’”c‚Y‚¹Jİ œÆ¢ĞiŠÙÀ  … }M‘    ¯!†¢Ö8P] „…Fjï^½®Ù#L½¯ußTÍ¼æ`Î#°ñÕ+¼ ³–Æ0Åz½2ÚÍËŞJIMBv ‘-ˆÁ(tpÔ3“ãˆÏÂ˜)Öe"æô Ä›œø‡EM^Ñ¤)¾Ã:€8ci4ÈÎ=<³S ‘Û{Z†ûî˜ ¥ m¨–ğ¹œ°À€ı“,0Yï¶yBı/8V`½îà¯U7Ê:Jó	ÇÛº÷»ĞnáÔ>oõÕh™À’vg)€%¦œ[° PSÚ¨¬X	€©€b  „‡[½JY”,º§8”>í¸”h@í%Å’™(ÓñÄÿ›ş¢¸¥Ã5ÆÖdjøebv¾ã†Ô#qÊ'2=HxÏo03‹öæ€	Õõ±Êßv­›ÚH©VşLê¬ÑãÜ3¦PR—WİØ"3ÕÓrÇÚÖªJ• -»•ßWŸ=s¸ O-k®M^¶uJ¤ŒáDâú_¯>  ˆ ˆM¨    ¯!	æ¢ÖxPÚ4†$DÂQ ”"€Š¦#sM=|›ÏTÇ«}q7ìMÁY„–1´cM>vô°Q£œsª‡ĞôHaffš8‰¶aÜ ‹½\ €Áoó"+´¼ù±˜€ëÕÿ8eËgØ5˜=„ñMuX–Nª=|Øãt)¡J®¼µÒ¶è¬øæÇfFÔ.{h!ïıù¥KXìy¦ ìøcq®ÍÈë°ßß2Q³ÉÑàğÒ{jÓAøª¿W¶âÕ0K (0¥U0%#Ápc {9_dÀ ßÏGî½5½KÀœ¨D €™£V¾ş»•²LÊ¡‹× njUp5*1ˆ¾I­pãL5k;•$ÜqÔxÓƒ2l3\p²Ì?7¼w¯ª´¿b´]ë£§¸Íı•KV<5|Hn"hQj®ñ²ûªÄ‹r]„ÙUa›/G5Û#­÷>‹4nÙp»áãy
Òjjádâ‚€ ¤Ÿˆéy÷G¾Ì>Û™««Ä—ÊvQ…ûÈaÀ  “ ‹MÀ    ¯! æ"VxT] ¨(	(%Ãz%Ì‚ÕªÃl]9p#È4xÓ$×š§OtX^Ÿy>ÕÅ^*r”pH“ÜVÆ6Q‹E˜PÉ°ÇêRŒò˜´
­ØËŠWV;÷5,Tjp&<ÙÅ|-™òƒ~M ©Î†IÑ×—KÜ¥(ĞEÑ‘ğ0~¬Ÿ´$D€%¼N©†(JR&”5Œêq@.EP2"Ã_‹(YW‡§û:VÔs®a¬ û¾ƒÏ_ê™2iÀCÔÔ~U’$ŠÄƒ_’[|Ğj ßîsÖ¨–!1 (0ˆA%\à8sİCŒ¶¶Ê ¾z)¢­o¥€L0vRØv1@-ªÌ¸óÒˆŞd-÷Œ§û/^¬-KÀ‘}Ÿe	Ìšu\±Ş¸:d·l$Ûtôùq!‰ëè0!,
@¨%wÂ30ƒÊÿV†ayÑ.•€¦KÇ~d¼Â·ŞĞ›©ŞRoÕj¦ìÌÇ4ZQ·cpá¯ˆ'€  – –M×    ¯!„†"VpSÚ¡Ì“H	pÇKw/Æ³mv¤É‹” +ƒNdl‹z¶Å2ìÚ‘ôˆ¯‡W>vò•#˜9±©¯ôĞi~7“à˜ëòğN³€. ÅÙÖ‡bü0¨ñ0¯FC	qï›P‹ç'Ä`a;F­ dl!ãmçêmÖ{f¢j´Q,q–‘–KsJÄHÁÁ *Àä`x¢D30*OuòJ-®€Æ€]ÀŒÖ…’tÈ¢¯¿:ßŞê% ¹-íc½­¨QAÇN2X Í›TVÊ"
!ƒ P& ˆ#
Ô!—L¬:›LÉ„è€Ö a`â¼Å]yÎF¸Q¸Õt€€HĞôd$QEĞfñ£šé7á$Hæİ¹Ò„¿—«£˜æ0Ç=½ä\†7Ò&XÇv :y‰Ëß  PøYí  -NY¤r"©kt$8c@!“#¤"çE¥NeïİX¾ìµ¦‹’Ìó¾²3o­daë´õ¨€æ´/’· Õ‹âà  ¡ “Mî    ¯!¤¯¢FxTÙ)l*Ã@›RC…×¢…Úœvª¢—…İ€çÀ;£v<¬«T-‰txWıE­+Á:Ø9@éöVUÎÃ„Ú;,€ê”šûÛü´¦ 3Åa;	ì_[§ ªqğ—!ˆ9wgIoçï¼æ2/(™,¯r`8
5W]  lßo9¾º‰º´•Æ)üãMÉıø ò”$ÔcÍD¢uTF‡„ìßC·_FÚì†Jù®¿ä÷Z¾R;àšĞ(5ûj*ù!*?S #ïµ¡‰_n*¦¦	İX ·¬vj¥·©àˆ 
"	x•| =]·€h¡XğŒnáNë“ˆ;‡ÿn; ÃzP‰U’á(o0kbİƒ¡,ÕşÓää!]¬›Üşø	?Ú¯\ÀÆEd&Âév<uÄaà$@VÔÆç(3«HU³X&%ôOÓv¿Å¤Ÿ0B jTiŸP2(iYW©NòH=ÇÏ\£™wÉ<Ù¨´÷§õç*…@­Ú®à   |N    ¯!¥¿ñvüUÚi6V:DC@‰Y&_ÂÊ0îqh¼¬ÚÍ`?´ÖU‚£DbÅYÚ}”´x<©È¢ºâ	XcéÏØÅ¤8§<ÑÑáæI‹ç¾ıüôN¯¸@ãœ½¨Ä¸Á¤m€¸RŒO/O~|ñL¤_&A4NsÇ
‡*/ğlB)ŠíìÖš¬Aßo<»e¬c³0çÆÕ´|M0Gb€'\ùò/]Äc8›J Qû_ÍĞ°¢±	¢
om"Óh-Â?Ü^œ%€Š”æ{ºiç¿òÇÕâÂŸèßH
òkË,Q'ğ 9ß2…Š©i6©†!`‰B"×PJ÷…·šÔİq°ÏæÖ,ÓF8y ôªÔˆdåªÉTe½*ò¶ñz®|3lç¶4l¾;«³è¿×Ü¸ÍßÍ©(·r÷hB€Û5Ö„S÷¹€×K"2Xy	.`§Yˆ\î;'äËè<<Ìç|Ê*à  ‡ ‚N    ¯!ä'ğÿşSY©f8´	/:Ux¼¾]nøÅ3%)u³Và*‘!3\Â@ÑyxñõTµ‘¸=_¾8«FT”-ºWY«^³hÀ ã)uÉk};ƒ¹›O˜Ø2v5r±ıŸÛÏr”ÀeW‡2à@Òkg‘B²@N†’Şd¼q@ L,$¦Ğ»%² ¿nõ´¢‹‹e?-›èÛò“³ Û,f3ÅH®ÔÊÒ÷W£ÓÕõÕVïŠ¥&»*¬ècP\ÄBa b‘­ü&OûáŞĞó!hóÙş"y«È‰Jß@¯·FjrŸ9µM\$@!y¥ª R=Ñ¶-†”†‚	@b8…4®úNê¢W*.ìşŒæeÆğ 6×2ôZ;DÒ[Ù£Û)ãpÔ%t‰q1Ifèì  i"0`
òÏğ~ nÓêµÜ~¸˜<9'Ô,©DM´Î^î•d˜ã„‘A’Û;cß!·0Ûn,°5LMÁ$&+ªô€ñ R=Ñ   ™N4    ¯!  oúRÙ©h#Ø¢e1C­ÕÇ1Î¨+cà2·¢S•mÅƒF¡NÙy'çm¹F§æ!''iô®€X"Å’ÒQ0ÜêÖX @çiŠ ±+¡¢‰%Uª™óÛÏ/yz½{lj«äÏš~.8ÖfPòÅs¨%ô•C›CŸ›‚
)Oæ¬«Yı·z«¦%ª]¸÷íéÒ’Óë×h_{Š³+ºÜË$—÷ua#QÓ–ù¦E&+-øÌ%‡›.>½Øq·
}#î
Êµ­ v\¾7/†5¤û×-bŠƒO&¦îY-zé!†wÕ x'2µM…‹d¥¨  B]L»yGŒËq‰ÌÔÌPò«6>ü!†hQrığš°l%³¢w¦Bv±@§ìâ„•µáDÅĞº®Gh|`ÀÁÀOº¾Ğfˆ ‹Ër[ju/¿¯©æÕ`zdÉ»úKËe˜–ÛÛğO•0—lµƒ}¶2@€²J9Z·—6ÜÑkBQĞ@€h.z´=L†"èæ ˆı  ¤ ‹NK    ¯!ĞkşRÙĞTµˆ‚5 €&£¶ñ5JÈñÓÁĞ[&Ù-jS³2yˆ[7ïl¾eŞò¿øè|#7‰Ûm&øº,a‡ÓÆt-5hÑ¥Z‚"8Œåû- ùÈnåh\¼ø€‹ö+QÕÄ/H¥…Â§9¡~h…ÓÁM9ë“Ì`˜ˆ¡,j+e€4Sæ®–ÏÅK'v•s'²FÁ)‰îİİB‚ì€6§$ÏjCOaAYÜ
ÕøN%î«RæÜòØqñfuÈ×‘³nÓ=DxeÆİVH W=9BŠ+"ÍaÀØFPXJ¹UjM7{ºÜMÈäz&BôIoÒÙ{µaÚWÎ§¨#7ÜK^g<* l1¸ŒUao}‹cxæ¨‘BôÜüª=Î–¶Á\âfãÏ'uÚf" h[¹«‰º!™ óyJÉà2WáôiÙËPb²ÎŠp­u×KÄä=~•™—·ÅTV@KÃRĞĞÉï´ Í«ÜÒ5	y›¾æÄí¸  – ‰Nb    ¯!‚ oşRÛá,8ˆ(moNëªø“77{5ÒÄO‘:‡Ûei±FfÊòªHZJ‰eìÿe¿^"4¯dÄU‹œ,î=ËÉ‘ 4<t±¨•K‘Ùè’Aª­x…T¦p:á¢CíáK´,§JÕnÒ¬zòvá¶ëf¦ª•C€7|[!òŸ¢¹òôÀy;daü:Gß2Ç(§9/klªrjxwÎÍ…UZ/9±C’ÿ¹é@o†ïßÖâ Z­ÅLã†³^­µ`çQul1Êõe¬aI¡†õÓ¢–gÑ°È&mğ–ŞùL›|ºÈ ¸*µT½FkÌå‚<ÍN™“ÆéGòÆÉ÷©èûo()?%  X½ ŠÑçˆçñïP=Aí£;»ù/Q  1y­ıZ2Ôz"°Ã–¼z¥tµ,<œ%!q  ­5XY%ØJôæë*ÛœE™–ËÌWC³W“%Úuı®0W€  ” ˆNy    ¯!‚PjşV[$V*#
EqÀI_xUdØ%UÍÊæÊUáÀÅÏ…Æ¥!=Pg…Ï—İÍ- 
>‘Ún¥A_xúÜ¬Á°¹Lœ¸ ë1áÁ>#%µ‡BÃyÖ UF÷Ì†X•ŞR³/®hDc·ñ‘s•g¾¡Àò¯ÊÕV]çZ<b«‹(­YÖ%@jâaZ¢ÆJfNĞÆ’ÓDAGÒë.¥Ò›N´ãBåŒ7ï>•êŸ"S×”%†×XOXPÍZAXŠD‚şâÚ×_†¶‰R‘Ÿe Ö«WTS1h²K2„Ã3‚Jiß[ÔPPæ(=v\vìQĞ<ï’$0#U¸­O-ık)ß%Û¦dVzÅÍ…ÕBc(‘6LZS;–„¦Ò|¦
 /]»8şZĞ™:ÅÍya ƒ¤úØ!†®°°ÔT0tÿï,@Ô}è7{§ FÛ·}.`\'V/r]x–ßjeÖÄ¸“ê}\;ià µàv±p  “ xN‘    ¯!¢@{üRÛÜt'Ãa¸Å@ h-ÕÎ®ÜrwÁ‘F¥†vŒÍÖ&º&´9G,ó¢§Ä%²Áƒ¸-bğı ´bc-êrÀSâ2zl¯'©e„ñ~F!\¥Ô4k¶°X+²Ğ¼±§Uæœ>ë÷6L˜~ƒ.J}9£\2—†Ñâ[³ú!6>By@oï tOÚQÚıF7‘©!ÖÄàİ`•)»`V­’ƒ/}R¢‘&
QÄÇƒpX‰:?<º(ƒZò¹
9…·ŞJÌÂ1 „`agŠE×‰¬£@VÙ¢æÔ²Ğ)$bš\şí RÒß&|œ1ƒ£¹²ac%Ÿ,±uZáÄ5	Ğ1q¦&2±–EƒªêjÆE
,™3tˆ´îóaé¸§ØMxù¡­ÁùZCW‚¼¢ú™,µ?•MgˆwÎ>OXúæ‡;=’£WKÏ<·Õ4ü‰&¾¨bA¿$#\G  ƒ {N¨    ¯!‚~øV\(Œ'Èj#êÊe0Y¤vÖÙšaDÕ€œÈâ<`ä&:^~1Š}všp@é2‹z“!@F(EôK…9#Ùd1°g½qój_Ê7<àW¸ù%ËVÈõ…FB}~"`Ù/´Ôì¿<ÿ*f//µ…Æõ3rÌ("ß¹îËğ!ÅEl¢O\ä%•pH_À‰)ÆÂ¡Ÿs*½}ß<ò5 /%xBu´óE´d7l%<¨›7=Ò%@$“3–æìµö½pÛcBp*µ	Û{
ÈÃ‚B Fºæ˜µÕ—ŒÃPâN˜eÀDR$YãQ	Nø¾
Ï"|±m‚*äSÅ'›ÍqÍ£tÅ9/2'†+ğcºÈg4s£šR†X@aFcRçèäHqÁoowŸµe.íÁÁÂµsœ5H9@¨ò'Ì`™ÜfPpÖŒî3€IÖtçH¼u¨ô?>ãøNP‚ì³v  † ˆN¿    ¯!‚È~øWİP4(+”Nu_¬R¼IÏsÅ¦ÆV]PF¬Ç§2à:TòÌE¿ç”íXä¤DfĞ)Cl/Ğp«– f³Š£1‘C)ZåX(ÂáØ˜•‘µ¥×§Ës9%üRO­Np£Æ8|±sæ¢~}3ú ^yae¢K”§ H#^ùÄ2çé’ÿzÜ.»ÃZkVxœè`|N*¡G«N 3o˜•'­ìğª–¾7%ìdG4¢œ9Q2GÀÊ.ÑĞÌX ÙV•P]Şò©\ĞA+ºœ„kMrbAŒ€ƒ9á¿‚íãdJiUSy4–”n@øDú4S2ä¶ui#|¥bZYxotç5P‚Şë`0ñ†0Äp='VS7õÈÌÅS‹Jøâz¥S˜j©œ.êz.ã@ õÈx2çë¡íšN°Œ‰ÀZoG£Â¦×Àc©İÃŒÛÌ¥x‡.ïÚª1BrqÒ:+Wù‘0“gf,àßn©à“‹€  “ ƒNÖ    ¯!‚íöøS]`R(•h"µ5á¸A£M¡J.Ò æÆ÷–s´Fğ†¡>Â¢š&wNõÑÄrçŸ²ÿ3QE–2œhÔZ%a¾+¶L-ÃÂ´QhØL²f]Ë×Ç>™t“”Zø»0ÊB¸J5â3PoGyùFô9Eš¬7|ÃĞçRN!
ÂÏˆ´Œ®Ğõª$ß£¡c©ü;—Mhœï=U–ƒù4³Ë6ùÂèßqŒVânï®ÈO„DK,ÄÁH<^Ç¤‚«(‚ ¹4¥Ü:iE¥DĞpœã &£´°¬Ğ2E3 „ Q¸ùû‹fÎkVMÅQKè#½®.Ë¥"CL\)ßÚ[²Ä´ŞÃ»"Ú p1×3ùÒuƒë1W"ìˆÓQ ÑÙ Ò¹„”(
¼|ˆ;”†€p±Kº³KÏİ¬K[&†goÏÕÄ%ÚşÙÚZ˜Yy3¬Hg×l|o–àĞêÜümÃÍB³^‚şæùû¸   tNî    ¯!²7ì÷øR[–V	…$AÔ"0 à‚•H!Y
åjË£P “ )Cø²ÿ2’+¨š’0O1@´ÙãæÄ\X\xcäÖzlyg¯=~)Ç>d–Æ®'IÖ+„d™èÉg%)â\j°xÃL½(¼¾‚FíôÀâ“ÄB Ó@ FéJ$cÓXµ§W›W7¦(?áœ)¾a-oóx»!Ë²¯©ã%UóøÎ]¹ Èƒ-ˆ^¯˜ŠJéT^,ÏojÜWNåØl!KDx×qpöè&Hh5%Zàèd)[k²d@ˆAk­+ˆòñ<`EÕÒª” „£îœbP¼…B€k‚KšÜkc°$ñzµ‰#mc,oÉÏe÷:6í‰„LgŒ¦xÛ&³•eç™FOƒŞáf¯##`¢âÒŒ½†ùuëv£+VIË;qo¡wIş‹C§èÛyë6¢l¤wûÚeg   qO    ¯!ƒŸW÷àR[(–$Re¹eŠá<\¬oU7|´É…'ŠlrPÀu1á±xCFª5Bl‹‡!bGKä°t‰—²êç–Zs‹‘HW’ùŠtäoj%”'¼?h%0\~•ô"ÈõÁ”øÀQ„t¹¶˜Šn^.„•¨<Øõ›.‹Ô"f²èÓ9á­²ñQdvÒ…ŞS7Wã;½l‹äñ¶gcê<}Øì×óßC–w8êZUÉ\\ë,gÒù—•uokDbnÓXâRêãN.çû!á}_gÑˆòŠyÙu%ŒĞ¡µA”vÄfob®w•ayI•@–AmÍ@ ÏV«ä[0*,KfBÌU¾<ı×Do€Qù¶£2ò·V9ÿÃµ?¢Ri‘«p¸æËÖ}³×Õõb(ÏXZ"Èta–k-¥¹¿=oçï9X¥…—pÖé””"ÆXÍñzpd9ç”Ûİrów¼~  | zO    ¯!‹']÷°QÚ –hÂ€¨Ìà!Ô›¶!œ•U½Y=„Ò…O±iK2ÆÛPŠ8ºúÕ#‚ö	g^}§ãˆKk¾5¬U;‡BŠjšŸµİdÀ§FÍ@âÉêúc<åûñĞ#Z[d³Ksa.Dñ÷C8ºR²ÄÊì[œµœn	êzªl 5Î†-í  BÄ¤ŞïıÄa›j2Zl·ß _óÑ5³•(ÜKuİlÖ;ÿî0•V¦±sr¬öúN;xZ| X•ä£L·g
Ã3p0§A2Úë °L¨ˆ#OºÔoš©YÕª·AÅ wC3:[ôÓOÈ—ZªÇ€©E®"T«=æû‹Î[ñ6=ô‹ÚãÆüwhƒ^	r1«¨¾ã•!Uªß³Òõôˆš&´tYà­†?,1FÍR£Íµà¶ğ	­H,ON®Ro0-´#%úoÀW‡ô 1„Î  … kO3    ¯!’ïÿğSZ¨Ö8-Ã@°P‚ )©†(ÚÉéM¢e =…r»VwFà-¬ùä³4=¡–¦¾HHN„WçC›–*\†Xc9AãLOË8 úÌûlÆL²$1ĞB çn›ª³¹ohÊÙa,°e®!EÂ…&¦ s•?»·,b´ëkÏt‰TRj×ˆ(ğ·“GM³[€…Õ¤7_<z´Êit  ›U_pc×^Èkşÿë¤ºÿîÏ©:RÎ‚­2J†Ñf}iå,D$Â%ˆE|);4ØNjOfıÖ¶İ!te{U©Ï*fçxCæŠ§*ˆÓz‰55­‘ DÀ‘£{üi|×;TA1ƒ€T1ˆè­‡úìæÒfv$XÄ²)í‰É¤ñWÁwrl¢´E>& g”TÅH¸9 ãÆ®9zŒ©Aé":bÇóBôKŞ˜µÈ¤JkğFÒŒíMDx  v …OJ    ¯!îïÿ¸RY*U	ˆƒ Òè³
½g­Uì¼	G¦®=æi`‘Å—sš/üØ±Rs×ûùl°çïz­Ø`±çG98Ğ“Ü¯_6e‡ù™ÖÃv­…Ôá_rù‘ˆ)$¼’B^ÊîsAYIÃ-L€	8¾UÏ·€×œ‰Ğ U.ŠáõŠ¾™Á}R·eÄK§Á¡>…<p0A–`KcCLà17ŸÛ5—M÷Æ£”Az2t†ÃóvuÙUÂw£Ã¡îÈÆ‰;XEŞ;ª¯ÚõšXáÃÙªÙi0\¶Í}$¬½ÂKˆ)$óÅ%§ílz
„ ¨„`Q‚ 
f×VFS	À_À¦WZ!Äµ>;%94(ƒJ<Q¦¢G{(D©Ş_lµ€Pæï|äÅ4%6¡²|ë<ıë¡Š!c pgÏìàĞ4asıµU¬d]wæ$f>>¼æ0Q ñ)ü¯Y·dÇ²¥L¯Ãlú#iÅƒ€   ‚Ob    ¯!Ùê$°UY)Œ’	
i3é5Ü:sÍŠß™=\ªT Zì
Ì7Å?zñŒ¶ÏÃ…c&—”ü"¢câ#ºzÄ«hã:Ï&	çµ4,‹R'Š¯BÂ×E~’@¸ÂÔRieÌsÏ…FÏñı¨'o“§ÛùúTm4åR‰ğ´ãIP¤$xÊD5á|»«‚ftjP®+Í{îE§6jùÉÒÁTÈÃÂwà#M&

Óò¿Ä#.—Ù/Hua¥ˆ K-Í¨B02™¯ÄuñFÂ~ÅG°ÁPp1	JÁ !$¡nÛ¢³©~ıUnëÈ?;ëRÌ~"¨ÂaséôiW*›~îã±9 p™‰ğÔå-Ñjoñ“CØ§qÆ*‘ëÚ)n4qkÈÔK–Ü{kİÀ ›Ñ%}ºÕkT‘®œ!1»ãèãÃ¦å}ùş™ÿ:^ê0&zYÅ•µÚ³³3WƒV©@	Áô]lÃzå1V•Z~>r   ‡Oy    ¯!È84FRÛàìU#)©TÅ.’ó™u”„•@÷õ»#‹hÔqL´Îd
÷N×*ğ5I*wf c$[ËNÆ€XOÎXqºÈâHË­:uI…³–JT¹¨RÌb•á™6x®±»+¶ü0_åP›[Ÿíå§ëşzôäUÔd4ÛuÎGe”µà¾~ºL
ÅÔ…ªj%HÏ)«™$ôkSªVÀ©TªwİuurK|‚O¶N~ %xÅØ†‹¢M|ô‚Úz*PV‡3ŠåúS[²"Ú£‚ˆ (5BqP+š‹æ‘†]ZW’xÜ7ØO‘UVÿ™Z\}ïI’+ pèa[²ŞÏø„Q5©û‚›Î€zÑŒ`’f©ä2Ì¼T3@#‡</âã”,eÕéöÛ£ofÎQšÿ»æñ!úŸîÖûwû»ĞZú·s°.0'ˆ¶ûHj4u§ÂÂb‰¢ña,• ıoåÖ-´•1_ê‰C€  ’ „O    ¯!
€PŞQÙ)pF‰R+)Q±!Vñ,¦Ğ8 mÔÆõ1>i†¤“½5ÕaË£Ø«a˜ƒõ'­ñK‘’f`ˆ	¯·¾Ì°‘2¥‰/4¤7qj˜RĞ–R3AÂ¾^ïØL³×ĞáB¡oĞsLÌk²wsï±ìÈªùq¤º¾éåÏÕ×W¸3Ù$¯R¡lÎ®õİfn:¤T=ÉQÕşbkÃ®0.°€±$†€‹˜ÀP¾ 6ÍŞÖKÂ˜\ ¶Ã°Ô‚0Œ"4sj-Îİk¼d¢:qÈ%ûM)<kÇÜtù_–Ñ®p¦Ñ™½~5=#§¤Ÿ	ZÔ]9y«×Hß¨ÏM1!²Ú,›’––÷øôÖ…×¨°¯½N‚™ÄN0–w(gÓQ`8-9V×ÖP …k!˜Ù[€ºŸBTvõ!X¾[‡ë—¢€Á ²ÊHÁbğSÛ¬úáà”åÓP‹‹\D p   „O§    ¯!B@\ÄSÙ)!Ä(˜*QH\ã.INñ
µoTmÍœ°
çÇ’©İ·uàAìƒôä™¾+K¢aé¿.×wÆë×¹P“ğq¥Ù1ÆV:(%Ç}˜q€ú\‹SZ“ &3¢Ûİé  ‚àÇS‘¡“n’†MV`V¼^¼6#xè¾ÅN{ß¶›ôÈîL&ôİÿØğ
¼NU Ïñ€pé-ÙÕè’Q™Øô ­Šêâ¥gHfVU-^‚6¼ZÚÓ–@½oOëùB—ŒvXIKh£Á˜ª 
Xˆ¤ªcÖµƒÕÑÀ‹×Ttİ%Ûvt3¸İÊ®â¥ ?ØBÖ?SŒØ`İŒh¡ Š@‡õÌyõzñß³˜-¯¿g$ƒ¦ÇFFÓZa¾ªäÄ*Ğëòzh6cÔC ]•Õ¼ü)Ó>d—PRˆ:1b±óß<µ‹e†BÎq½ Ğ ´	@R÷Ì‰ŞPÑ¦³¤Ø‘ [Î%là   O¾    ¯!
 ^ÌRZèŒ‡	Hj¹Áéñİ*¸½Ö«9ps1)&ªÖmødÊ(ïî¬Y+/·FÌÚ'íÂÍA³!2ã¦šônÒ+C)mx5W–YŠGı9í“»Ñ3í«µ;¿AQ‰,¾£DLæ{²‘ï™ÌÌõq‰É©ö¶Fq>÷F§šDaÈÒ -Â„›f¦Ü®T^ÎŸ£é6­ææ”€05ÕÙş?”o}}:Æ%œ}ı9´ºï¼mùqq¤”è>¬, ,Ğ†ÓU(Ç!}•r^à£·ÁØb‚ \Bœä,
İFX›TU	z`‚XÄbÈò#~˜íÕ—tØêÃtÍ =îÂqi,ŞëÓÛI†mƒÍÿ ÌuÅJıYa2•9q‡•9)d­Äª’-V¢ZEP¨\œTèj¢;°wb$¦d«º€ÍW=Ü  ’Ê+uH…,{ÇàmşD*¨;ˆ/ákF ŸßÛíôj <½ŠGMx  ˜ ›OÖ    ¯!]¢ÇEŠÙÄŠye{ÕNm•eeíx²X5¢xÕüÑÔŒ]ÁM¤tçğİrAJıMëÊ¹eõ’w.hXÇrâ¾ô¶É%×÷Ñ7	°Ç¦´k:®òĞAs\‹7Ró®œoPt•ÑVm½#ŠŒO¬579ï?F lÙnm^—Ä>_=ãİ¢@ÿìChÅĞÇµÇG{¶ÊÄkyT‘ı£Ã|2Ú8hJS1æ VÂÑ±Nw€Õ)|5ŠBÿxÖ€iD+mr+s|Wß¾Ğ¹Uªîæ2ò)Iz±Ó³ÿÒĞyLl½ª#Ûc–ŸØş2èOËc¬O…±ÉCDyÔ,9§Ò\¨ïj¢{zè,sœLS+ÄP&È)zå¤ÏQÑ‚mùú/¨o=;·‘Œø§Ú?áîôt`K§Â%"À=ìê @‚ÚáÊÂ~œKm=¿÷P,%UğHÛÙcmúi˜¬5TÖ#5KF1à\\”DêãÜCiÔ6mI¦ÉÊ:kh&X‚óp  ¦ ™Oí    ¯!e¢ÉBÔ"¶{'3]
ÜªR)¡iv™"å˜3¹ükŠ²÷½@Å’äj“ÛG6ø=áošó½”­ç) T8<0ôf€>ú1ÃoWfÎïß5‚jŸÕö ¨ßÁ¤!~Â'uTÌ2_mD5Ä4Í:ÑhŸ½kĞ¥Öç»…–VİQQ2Œ6¨Ù]T~-nX!3£¹-zııÛú‰i2Ê¬Îø©†ëMĞ­nºûÌ¿òàŒP–¢e˜›ë¹âÆJÖÃÔeY4iiBUöÈ#C§´fåë\Ï2MÊ¡9^Ú†¢ì@7f’jTTGıNµŞk­VÊ[DÅ$-ìŞLmëg€<©ç=W7ÜÆIè,hUjŒÍ¿xVQJæ¦f(RqÛD˜«Ya(²O.\IcyÈYçƒAnº‹?eS4&j{à70÷šcÛ¡­È\L˜¢*÷6°çâ³À¡÷9¬hq£æÕù…ÙUÀÊXòÍ%HäŠR!‡ÄéIÈ¼¿Í1k„&öÖâKŞ—ø  ¤ wP    ¯!]¢ÅBá©ÏæÛ¢›è§4UÉ$’àÈŠ{âc^…£2ò“n:¯áÚ2‚[ú»6{M9i:…;Çß´d¼`H°<Mõø¯jÖşt—ÛÔÎà•Ø›nË&	Ê“öô}Í ñ£KÂ ÅY"Aê°¹õ|ŒcgÛ_e±—ï–Ëœë[:S…¤NÓßIç’JÚ(m”r*•D·ªŠÅÄ0Y­t 'ÔR(ÊÃÃu"‹-| ®¶Â"âN-ùxÇIŠ¶R•ƒ‚Ë°WÎì/fã­9Mí®bQm\Ÿd•£Âª¥zWRWœ=ÿÕç¨Ge×Ogû’øÂÅ­b8^mÌ°Î9#ˆƒDX-\ä÷Dè?ë’Àºß×® b÷^Z€ÿ¢òyuBò‘v÷ Š’¡Áí÷Œ‰K¯ï×Şê<ë+¸V¢t…$&ô¬tü‚PÏ†<H"lÃtßXÀ 1ä  ‚ P    ¯!šˆ   RÜˆ6
 X q¿öUÜÛ)*- ƒLÄ$‘ZmÖÔw/íäñÕ•rÿ×‰ÊÊPƒ6~±Ş+ÓTSG;ï•cD8xH’EïmC¯?ë|íAı^˜R·}ƒh±œ6®”
ouo Û­o‘}zìø?#ñ­Ì·ÑÀÔ€Rëªwe¥p—‰¿t/-FŒeÄÜYğw'kÇï¥Qª9g=j#_:;gl6¹|[ (ş+O8¢Ğ—âOys-I²dLÉ¤;-˜ÉDŠÉs½‹Ùr²²è¹wkQ½{ÃgÖí*-Ôq•,D*âÃ~ŒÒ>÷>3¡£¬^Ãe‰{]°‚ïQÿS4nê™˜µ32FTÀ8BS}}â×Ó­N”w]Ğ¶Y›£0™DUMü¤ÜŠ;¼ˆg‚CŸftæÌc•XcC÷æ%”yÂº/F’¢wó>:Wè.2ƒ‰rÓ¬ÆiÕ¦—â0U`½:ín¬Ä€#0[€  ™ šP3    ¯!r„€´T[`ld`¨&…p~«Î[Q%É4ü‡JÖ£wSyµŒq ÙO!Iì-%
æU‹ç•£m	Ömrˆ9xà=÷c…±rİ@ªŞÿØ@›ƒºá¬éÛ× É!ÍT×®l_ˆƒø4L"ú†‰È$,ZQY¢YÒÃ“%£Û—k×ë~BïIÒ$F~á£Ôe ]åQY?Ñh½ı«”^ÜnöøP™«ğ¢“ĞÍY+5$±ûSı%^‰}Dk}Óü–Â†»^´Š€Á¨Id¤´H`\í÷z.®•™—µ¦+?\9M›–°0’sì_?ÛÅëşÙ×©>§âßàıĞ Ç7æ¼°ºŒ·ÏúçÛp•´éı9S9ÁJ•Eµ°@®Å wKg‚“†g!4ñ®Í/’(Wl9PDâ½Ø˜c0¸€ier¥ÅÕbú"ƒjh¸½Ùi§‘ôª[dn£db÷f½ø×²'«yTZñ£o!róIe¦b~×Ã‹2¡4@.•èP"8  ¥ œPJ    ¯!6  CìUZ¨Ì”A­‘æ«<™Féª´Éº¥ä›t´—n§àœMİ ¬£€¹7$¹¯OjğÏY½œv‹¸Õôgérš³”³;ŸÍvõQ fn ¾™Íùû­·ıÈ´4©/;Bê)z¬Jï«8k98²GübcdrZ>Œ:ßßš£m"üÛë@õ—7Ğªå~%1¾¹R­»Zè›Ót  _ÖhºZ-çàg.vx&˜Èuš!pL±àZ¶!2b,½šqëÀ!,T(Zµ¶™ªR–›	•$¬¥Ø¡4!Š¼êø÷ò3¶ı <Ym´ÖóG HWA 	1m—¤şÀ: /E•Q5ÒÓ<+ô"Nl4ØïGOf@$ğap©Ín.âTç(BFB‹»ªxH¥ßŒMB#Á'&hK¤‹h“IèYö—ËİÜî†/®×Å‡C2Õ` ‹Ò"lnâ¢æó¡˜¸r©İ•XbˆR=2A*7¿’Ñ½=Çºà	³x^ã^„„äIéUÒŠ  § Pa    ¯!p  ^øUÚ¨Ìµ!µJódæË^MM™‰IÎ‘«]€™wšdûÁò”Õødù‹A<xµ5vÆ®âSê½abÛ_„ÆĞ
!]^¬.%ËyZæ»
ÀøÊs%ZZÆ­…ËFSnsÁHfkÍ¾ÄÛv	 In0,è†B•ÚÖZø^é¨ÌQÑƒ=LÈé¢¨]«U74AœÅÜDL™o,TÉÊzG(Å˜’Ş¥„†ªv¥
f3" 2¥,Œ¶ 
»Œh	ƒ^JÓÒVŒ£wA'˜Cã	‡df¬Ù°7İ:cTÒºÿ¾lÂõ¿Üô‹ª0:…t>©¤U]É_khäë‘›Ñ®Êq-5'DYï“ùB#~2ç²£¬iæ²òY„÷EZmƒÈéM÷ â_¾ªœ`–î¹É…'\	ô…ùL20†4œº¸[èÊ¶xÔåqõ½ä„PÆlP	İÇN5ˆd™)ÈOTßLz?ïem(QûÖA2†Ş  › „Px    ¯!
$  €TY©L¤XÎ–ä×‚ê%•7AK«»¹Tç…ÎwäüGC}öëíòC7¸ávÓ‡å1”ou—	sÑ]n2ã!aOa˜io©L¢yº @‡;ÊH•û»R2ß1"ÏmI)”Ôµ!|Ö.º\,KNÀJ .–Ç–ùÜoÚ†¡é|ûLŸe"ç«ú¸FÔ”ãvÁIRçdSóKİ&®²QÂOZÊŸènëÈS¼+Ä±ë€^WRäæ@Ûi­ííßP V[ÙfAq’¯4vî«¬“8ª95‡rè‡vXÛO4Uª¢¸^-¥õµµúfP‹91Ş…N¥§j•ÏYûd N’çQ@0 ‰[âHtÄÇE	9»¹°RS6@\9nôÎDrÛYN„¦wHl¢Xx©F­'³Š†(ş•,ieİtD'ü[«ºÃørID|0Ù†J„KáUİ}ÑŠ±±nO‡'¬Ë ÜBõ‹]i/ãJï’@ à   }P    ¯!$  UÚà¬¤ °Ë‰ğ+œKa°K©41jÈ+èyÌ‹å3ôói3×9£Î®?„Qÿ¿2Ë#Çhñá~;\{«Á“k:×2qC£sÁ~Ém±%4T-‚Å§Šae¥LŸä†“V¸vmúZàÕ E³$óÊ²bM’cnƒîGì%öšÏtU<©±i
iO­-kaH´“),«|¿,WU¦f¥«·ËADW‚XÄø™¢š<šø-(t-³Q¡smN0¶J[4Z ës]åùdIÜUĞÔ@ëk¸ûËö&EïÓÊ&úú­_zÙ<ÖM}sµë…]Zöû…TpD	M]8`ã/ïöKï×š Ø÷ûæì+¨Í)‰IÊŠdZ]§ŒŸçSäH0,Ó…IdB4‰uKh#n˜ÑáÖêóƒ(Õ¶P4@~Ğ)íwÙ8)x’€ÇÊ+O­r²MjbŒTå[Ux[të¬"­º
À
J1¯İ D8  ˆ ŒP§    ¯!	À  DSÙé,Â ¨s«‚¾BEÚÅÇØS°x´N¦øØ¡¸J¶±êÆyëgË?,âÔ“t§È
@¬@õ‡€AXPQjš>›‡ŒŠ½Ößmÿ_mİàERcb`’w»M4¦ú¦›(cfal~mÕ‚œú%eŸºW®½õ‰¸#­âğzú®)š´ uM®öÆÜ!ˆ‹ª~”¨ó†b“±ø`W¥Úg¶)ê…àdEKEdo6£]À,İQ“ÄÉŸxñ`
{[ƒb@XˆAPÅW“¾bWhÆJ[†íäBãíÁÅp$•F‡š¨×,“v²†ƒª{£ğPi¬Àvæ^³¾ä	—wê´·
É(¸I%@ãÖ¦@ìä®sš¢—–HrLôßtW…”[|[d˜JÊÙÌác9“DªµÊnC5êİ~]«,èô!ºM´d•ï”…Æ¼~¡ìÊÄ˜ØÓÜ|3+ĞpVñyßUjÀV(Ş~µ,r B£ ÿ éSO(êp  — ‰P¾    ¯!
À  DVÛYÈ1r¼É¥.WyÃ"•€—EİåĞN`”|•FsçZï‡/COu+İ+O¥ı†ûé;LäúøïkÖô·M±ÀqÇï³Š»ÀkÚ­K p¶Ÿ“äøÅ5İ¶×Üe§Ê(óã•*òâl%:–Ğ¦ş,354ÂAÁ‰ó›t”°ùE¼„õ¡ŠR™±“ÁƒvÑ†5¦H*³IÕiI©øÔ}Ä®Ò¨¦<ï¤Î
7[®#ñ€F–ı·Ğ ª“b†±BÀ|RKëzWe²Y»®V¢ÑÂ4/í‰®ò_šç>`¹‚/İGaf{6¹á4Ö€{gõSçGi Ğâ‚’‘Ô‰âL81R9 )C!ğí$Ê.|u’¥”Éf#g2—)œ‘>ä”(¾ÚÙåI"…ºhJ³±Z‰M³R~r0‰À #.ØÂªYÇÕ–²/ùNY³Ã 5p³ï°;Z‰^åXÊÈ® f£19`‚$tD+`á
B§»€  ” ˆPÕ    ¯!€  @TÛa	‚ƒ(@BTo]ü+Pä´©W•@ ëY€'$üi¦æÎ&Rís×ßİ£%m%ás·Øã?¨îôKnè%˜«D;ï¥xj‘.jU¬
i¥_]áÇ|½s2u1Kœ¶ğ<ÀX×‚ëPÙ3‚•J¥øNi#ÍåcIÚy“fY	‘'"H×ºÿÑ¥ÙöDÀÁ©¢'à5UjøÔ‡å”ûY=³ï¨³øæ¾h¹Biˆ,³cNÈä±öFÔÈ;ˆ°+>¤’‡9—^®à *í¬´@#Ô´[¶+Š…&aO0Äp`q¶hš¦§ÇiZ§!ĞŸ>TYÌŞ¡ÕØâû©XèFÌìÅ]ÑñéÜ¾[RrÎàIëŠÄ(»Ãù®^ï$[X½hÆ×š-×æ&6K8°×+ºí¤/¾à`ÿÖLüğúâĞ@KSş›èƒõa<`¿•‘yÖËÃ¸•'ÊáNÉrÊÕWÎØlg Ş?$?<$Ê0él¹JÃRQXj‰:sİzÏ€  “ ‰Pì    ¯!€ĞTZ¨¬x-	D%^åíAîÂ¼‘n{jÇn…ùåo‰²SI•¼>Ø¸¯ö…­ÓÙcØÏc7K÷ÅrÏÂŸvÊ!7ì3)û'oIOWM+g–×­ß¹²	Æ« +¼;œÙ°¡¿¯«>m7š¹çM”COu¯Š²|º:É.š™Ú* ÒlòÂÿçkğ¶M8zóÿòÃpÓÖ™½è¼H´Vë,d¾8[÷çÈ”c“ßé÷å÷v‹Kã¢ád¥(ÏlèR§
QÕ[k‚3L$!F-zà%+‰•P+?8§yÒ.ßDüeÂ „T`_ÒL1×ı;6Ç°g]V;Mšrq®ô/»½ß¡<96•îĞ…‘ç@H9òøÏ/šÚË©¸û;¿–,ƒ]²=VÈR©':Ç/ŞƒªÙ÷ñ£==&y“°ateŸE:¯CÌÄÃcÚ:ùZÍ1³,—#©‰J›MãÔ„Zq@¨øW°›ç>Ÿ  ” “Q    ¯!y€A|RÛ`Ô#(€:İK™4•”¢*‚à¾_Ë”Ÿ³un^èqŞñåÏ—2¼rqKÅi†Äör$H¢s¥êAÄºÖÚ~%‹ïî*¤âˆDÌ _r[‚”´Ysab–•ç’‡YÊ,ìW5¼©JÕÌOx”İÎ­M8gO4	ìæ7™HT¬	ˆ…%È©i¯Ä ²K,m›2ºÚT‰Ó|0ìâO½ßÒzï•d˜ÒÉ’nñ¾8éÌ%<}#¦ŠV'Qz”óÍø^?¶„¸oiô‰<îÜ\©²Al4fbŠA6óm¥R€°œ<ËKòîJÌ°B¢°™4´İ£bö%)DDöm§	Y'•…Lä‚õ”j‰=Zº4ÖÖ(rEvF$Rw=°Ã.Ì«©
i?aïÊè¸MıÚU”«¾­Ğ‡_Âg“\f h‚f4Ó…),õß-DÄ˜ÎôQg oŒ(Îp2­İG„q€\ÀµÖ;´1)
k¥ØÄ@r  AéûN
r.   ~Q    ¯!9ë€ĞRÛ`Ì¡h#c:İN¥kïwúFÅ9—¦ëF™v3’fÛ¥2§H,¥pŞŒúuŞY{—Kı‡°àæÀ)_k@B-xtIS©¡B¢ËÑñ ¢]İ!(pu÷Ö£F't’Ã|;3<¥×ŠdZÚ«¨ï£ªğ0§b˜„"Å6±ÈÓBÈøö+ÖlªÈàsá~•¼ëPâéhbí$K,µ0ş×âKy®dÉÆ	b½gtÖŞ“C]¢i–ÚßÓO*A-©†âf@0AºX^jf3P‹ÿ»÷¯OÙ?rjÊ)˜1Ë{CŸœ,t6A+éç±¬;¸p+Kö'§¾V[!Bcp†İ…UÓD¢B²^k-3K\”ñÕïíj0üÊ!UU‘À{IÂbÙLI”İ‰^*KÄ´zÛ®UË8¤Ç²¿C”ÈéUÓVâ–‡;1ç!)”6{gmˆ GÅúUC€  ‰ Q2    ¯!IÅ lUÛhğw0 ®"œß˜*&.Ò²¶š¦&ËĞœ½D ³³±.Ğ*ÉE3 ¨ÉèíOàjí„e;ëvİÌ‡" C’u±ã»O2è#ËEáôÉÑ…³ô®á´n

SÂ9İ`QÎÃ—ÆÚK@®oùÓ"43
ˆŠ´„°\tÍ?¦šI©Ä`’ïGà±c¿	®y.p÷\9„cZ6Vœï˜ÈR
""×¼ó£,Zw‹,R$sêŸ€HQ ±´¤Î#p_¦'aEj„(àL(‚‚"‚nN»¢[–´mBwˆLoî[|Ô  ¢ŞÃo°SÉÄõ}Binh¹Æ÷E*Rùââ!QxË[ƒ¬‰¤­eAY¦ïÏÙ]ÃH›F¢\hÎd¸õúÏÏ1Mª–ÓÌğÇ>×ÃB@Ìd*!0L%‚(
1a‚Lzç§ëãôŒp§È*.êG#¥%x“gg;é 	*ÜHÜô$¨ oóï›'#„™‚)˜ ¾  ™ QI    ¯!á À|U[áERW]ùŒC$ŒÎ'\ê²»ÒJ+i@Îæ‹@B¹}·‡¶]½aÁH3ĞNcd‰I)3F~û­àC‹(5¿ >¢85¨ÚL×–Ûw9Z¡0Ô0®‚Ì¸zSI¶¢èåˆ¹“3¦NÊiêª‹ˆ¿„’û»<Lbœ¢à´)qª„®î¶DŞ¿dß÷á½ü}¬ñ•ç
¸]¿§N¥Ô V.fïRv?o}B¡Uf¿hÌUyz »d§ ^jó‹…j¼ß,%ÊS€±h!$ğá„–«†S)¡îqu8Œ·2†ˆJ³)cB!F3O„O½e¢ ®!)‹(ù*:)Yƒ§E"Æ8ÄÓÎhÒ°®¶:+E%|Ö¡~òóÉnÑëŞtPëÚ™dãO¹Ì lÚN²¦uù§¿úğN	b¦üGIdû®9e®/#²(OÚu¾—jóŠšzËÑá'Z+À  Œ Q`    ¯!	AÄ|QÛaLe¨oHÆšbÄÍîÒ­+jA â?¹ìUE»¬dš5,Ğ{åY*£|³Îù‚qîÛÄ1R"L¾·®)ÌY%Œ¤ ¯-Î¯\NúUáaS¸–“#L¸Â¿hc^†r°½~!m S÷)¿+ï{ë•»¼7êß9Šş2‡±õŞyÁß˜"ô n½)`˜uõ@.·7ˆÂbD&‘ñ¿	cTãºz¿Gs8S×V(éPŠkVVJ—Â¼TÛXDå0jkñâæºÛQQGj@Ñ ¬H	P	
•IœUHUÂ•”ZèfD8½œó–ãŠºº~âĞ´,Œ¹7+Iô%NöÔĞ…º0âe“˜‹ª‚¬0´BÚXmgˆÊ†·®u‰—:Ü>í„ıÊŒ³¼m ù{Ö¤/jèç:(“‰³ævıš@Ïõ¼”E›$qê¨“•ÌH»&QÒ˜ß:E]Î;úãŸ\ìÙ™RñÊï"ÀN&Øc	µfô«8  ™ xQx    ¯!9@Ä|Q\ ´&"ˆØw¬àÅİ]İ./*²ƒJ?ê§›w"Ø‡)$™Éy2eÄØµS­ùÚ¢H¨u¾†ERÍÃ‚íZqlôê2(%·gÀCarÂR;Ù%§‡„îDBß‚j<¶Aİ “ÅÖ÷ÚHv)y:®¥íÆo$†ÔÌ‚N‡€Õ5Ñ8 .ÙÚC×!ÏùvÌÃ?‡dA{’X›iÄÇV‚Lwdü.Ø
k€+˜Zè¢S«¤h˜¼fã¸yÄâ¶*t!„$@‰AŸ)ƒó¨ZÆÍ–ºBvOƒM-{@ºÕ_$ÂùÓ†’¿T°‚‘´Ûöêı Àh’rmLjéšJ¡}`&ä¬ø‰[jK¼ôZÊÀ#ìUe<AaŞÃ¸I4ßË%¦ú{T	G2X šVy’ï£‚O½; ZÉA}}îËÓÀµr¹^×Ú•¯ ’o.DüÛRämø'‹/hğ  ƒ Q    ¯!@ À|RÑí0µ1 ·é}_=@¨U¬ª®ôº-› Lïş½óñ,)1 ±Wkeƒ…„V¶írØÍåM!L~#A9öS’W\QåLÙñ¦j!‘f×ĞĞM;±G’Sd¦qš©Û	Ü°‡ZaÚğÛ˜¡aŒS’ßÈ¡<·Ob=¶0’]˜
…LŒ¢–^¡”³\qİã%>_Ÿ+½O¯ß˜ÜÍê›(®¾©ŞĞèÆõ5_^rNUr(Q\šŞšÈªŒDé®YQ4¬^èFsëÚj€5¨xĞ¾®Â:À¤µBĞ4&!‘#5ÅUEu´ÙBÀşjÌ\‘JÅÍxbËjäv(Ù n½*<kh¤œÌÿ?%„~_‹~©¢€ŞÇHòjre’"XÁàl¦ÆC	%óˆÛ§d€NÕF˜§ †(.Ow©ùjÙìÎı¨Pµö­¯R:ñ±…š\ŠĞ‰jÉÓ>%zgg¨óy~CƒêjhDĞÛª”3ÁşÚ®İ ”àmŒëIQ  › ‡Q¦    ¯!@ ĞtSÜ!7!¨Uğzâ¡*•«Í7R¨”]e §ìEgÇ£YæĞk€Äİ~uDü7¤M)Q8,ÀrpæÍñ9«D´;ùjTä)EÃ‰ùæõ£²ñôc£¥y’–Œ5z,ˆß%»â¡L8Iš2EšÎdã	È¶càG¡¬hÿ˜ÀºP4¥uë/yË³y5mŒZÏİåŞ9e¿ñgË-ş—Oß²Ò(HË6ÙS”æ®6R\S†pS–hÀF…¯8˜`Z`¥ÒEœ—tU:•¡ĞÛ)
K+CEƒ1M 1yxæ”øìCRû«›¡ØÏvr)ûÕ®xWÅwõ=obİæU:¾×6„ÎzPØq ­8ÖñGvB§n•=FknIŒf]f­’Lx¿¥D¤œ0‚õ¸,ŸE†£Î²w D·&¿~»kJxç6E‹B8Bâ\'áìşèÆŸjHxJ˜Ø~Ïõ(–FÒ·ÕıG:Œ%Ğ8§÷ZaEóÑÀ  ’ ~Q½    ¯!	  À8R[àÎ*‰'(ñå\æ³:§
²èæšA3°\z+ÚÖÏOÔÉVkl9é„`Da[=ãOÁË*õm·¯å„•ŸÜæ
$§t(fi…B¥O-pïë‚hG9  Eâ5ûç H£oi(7OEşÊâ"ØO˜*§‡Ô,°<
+kéÊtdV}Ÿ¹¢«öDÊg¶­ëY.S©±©î{õâï[RQ4Õ†§g93køÊD JÀ¤WÅp1¬Ü2(­D4BÄ4ÍÎ™™Î‰UjÕ”Æ$‚S/v~+d,¬8ÚóşEÜëÁGœtÛxz>h÷£ |ˆ¡ô|W"1kKÂ›p%d/F™nQÕ{¢¿ ÎøBwËyg×±šº›}òx?”MS²ÑáoÍ #_8E`îª»=*‹İº´-îK F’Éáï})ô_ÓÅ¡“‚]Ğ7ú-ˆña¹]0b%U«ETã‰©µ¼  ‰ ”QÕ    ¯!  @(QÛ`È)„¥ ÀÅ»÷æ¸JÉ›¸«ï‹ªeŠ÷£mâô¶­Õ3ºˆ·ÆÂÍ—5Œ—çB²¹Rx¥¥>œÜ–¼lšÕõ,‚Sƒ©éL8’8¶e¨â¶ı¬,ŒC¢=?ÌíNM~¨4¸&!8ë£=*ç’§74fF*ßÑÈYŒ÷ÑU)¬ëX0¬2¸¼;y^jÌE“Û€‡_ËC	Ëhª.¨]0Ã–ìS ¬ILïZD”ßÃ¯\ñ:T™·ÅÑKUx™AOh‚XàÎ6!´œ4{Òu€Ë³wU´X²–eÁrHæÏÁánK‚1u'I_ËXÑ†9c™Mî8'Œ3R€øÉÏÊ9Ä1r8¶xQ%Âg¨Ô'AN*‹,Ëc•;§;Ï(ënRÕş·½ò]mšy0mÑÑTŒ ıòfƒ“’A€Aõ\€€A®°	o±A­èzBnÂX—¨ÑùŠdÅËùcjäåhSUÙŠ;4B;wÚ ÙØ\Ür€'îh\à  Ÿ €Qì    ¯!   @ V\™*1P/¥Z½ˆ®™®å*JKU˜G—ªÇ9éš>¨ÊM	¢vÍªX(÷¯ûRG›*G×H<¤¼Ñ‹C9üg¶…å
ÏŠh…)öB±`¿Ïğ[œ%ùñ1‚UîÁÄ@Ó×€  *]»Ô%OØH!è¡ ùìT€k™òãíÁ_o»çf>ÿOÂ•&3ÕRÂú~QK¾ B?Ê$môåõ”eP¬`ö;b¨;‘KX¢§·Á˜P&Bj(mK¦­ë<Ö°æİo‡ÈîÈ0¤Ç£ªˆoè?OC"s Rû©3à’dàÈKb"ê_gá<Ì†×t%¬.‡ôì[ ‚ë~Õ3ÇHÈ¸˜A%9²†o©	j`·¿·ÏJÅ+ŒğÂ1 n¬A!oû†oú-·áÖ­òİä®Œã¦âÄkİÔ™›`)óqô§Ø\*J‘%h–€\C[
RÓ
H§†ôÍ  ‹ oR    ¯!Â` @ QZà’(
¦€€R“1šMjmH.,% GktÇ€æîü™kò¬ÚË}r›ôv3P­r›j»‚uÇQ#,ÂgæŞœKóÚx1{ËÎ	‡c´D 0¥ò°b€±I1Íy=K9ÏÍ‚¡ˆx_Ï¶·õöµ–şÈ.qïŠ‚ı~Ú¬Ã×ì‹/§ŸVËŸßº	‰9 ba™{J‚6·“<%¤®¥—ä g†¥	¯8©5çïè¥‘˜éÑ[àÌqh@1"Rì›URóUrã ®Éw‘¿}úÆã]¾òÅ¶ÿãów£HéÅ<RéÎğ} 9©Û>¸˜â¯n‘x?÷Ü3œµYÚew*MVêd7)2ƒ^RA”ö€®¼éëğKYuÖˆ ‘ùHÙ 5pVE@
qF zX@"˜Ë‘İ@¬Kø@C9%È,¯$wÒJ0Äœ¤`Ô DÂÊ÷ì¢‰@8  z ‘R    ¯!Å "@<S\ ¬WT©FwNÍÔİSH‚²Ä+ğõå9 ‹Z@¨IM­Dúå<Hq»–põ ˆPX}¡œnLc²Ï#a0Õ…„`Ûo“‚˜Z©~:`9pnST«^2=™B1ÖÆøLĞ oóÇ5˜˜"‰eV Cİ!›~ÿf(YP€)6¨˜\´˜ØOá>P`‘º"sÃÉåòôÔ.a„Ş@’Óı„ À`nñ2HÇoıÏ
Â:—¤8x:«
~mxoÍa1§nbFoÎ·µGÏúAóİ›n`•-¡‰hA@X¢$”Pæ©.••.ù˜ßg×ÕÚ_Ã=Gİx¿˜6ÿvqM_Û&ß×âcs>`ü¥TŠ(ê
ˆ½…œı•
ÃYBQ‚öƒEaîŞmÓXˆ%·Çmòá×®Ô{h÷i­ˆ`ôLNK·¶fË‘öàd+--‡#O)É)”^+<ê‚º”ŒJµ*W™`ø­PZ¯éÖ¢·6]ØŞ´è_€  œ –R1    ¯!D0Ä|SÜPJÆÁ Œà1<±à…ò{“Kk%R¶Ÿ[c—–©¿ş]U–à_Pın9"šS<#çFqßÚÕÒa£d{n§,†0ås5©8fÇH§å#ÙÇ£Hdjæo)¨àÎ|£N2e,
R9½váUµ5Ë<	Èt’ª®æ’”xd	¾³…fJY,ˆéFyDaè=\d¾§ËØVÇCñ9ñ£n¼d¹´»FË	Mk¼Ÿõ&z¨YP^,öáC	òRl‚n8İAfÜéÎÂŞ%oÛÀÕRüÃ,KE©[ÒéVzL‰1 D ‚÷ñV›Š¬ÑB²ˆÖ“ÍÀãr­šó‹0G‰\Sä(PCòñ·uˆZ‰³uŠÂ jwß¡à’<¸s„Bllµáp†k
‘jd¼ft$ ¡"£¥š>n¿C:Ú—{Aƒß¢{ÕğÉÖ%bÀŠp (+â;'¾J²^×øëi2NN?¾ìÜâÒ|»‡óPµâ":~UOG  ¡ |RI    ¯!¨DÄ|S[`l8
ÄrŠ@gzBWVª^•Fë•é€?7â3œº3·vU>f÷…[‡ğæ"ËD¤îåéI·l•©ŒÉ§s±ÓM”ÃS‚EvèG+Ğ'_mIXvx‰øf+Ç×ï…F'‡S@Ö•ÖÙÅ Ë,ê¯M"hBp†‰} €5™šŞ´Â"1ï*¦âùp	¥¤ÅakâéÜ3®‰Æàl„Uö•lñ±hJwd(¢0O‘Tt­{_î›2Şø~ì/&…{e¹?p Á˜fF
Hº M˜ÛZ@@û:µ' ºIû}cqDiöçDqu|!JÌÑçÆæòçI¢S–+\b1*ğK¸úA™&FË¯ƒD%®À›Uñ¡Y8fln<[şúÄ'¥i8¦³‹U?´qH‹(»¥XqSC.ınS'¨¶n§¥Ño&¼LàäHş¢`&²’½	®çO —ç#`W¤«Ş…8Ç€  ‡ R`    ¯!)i³äxSZV¨ã`ÄÀDDS41¥í"¦xš43—GJn'ËnlÒ,nÕª÷íTİMı´ñ{Îàóª… RŸ€³l‡
É–dÿbÒŠiÑa&œãá°ÖÛÊ¦R%{z\¸k ØNà®,wÃWÓøÇPé}O&FÓo‘¡‰æY[e !L`'dÌp‹€ÔãyaâiÊOIåêpÎ±â|[‘‡'Nlzp)*nqˆ7f(ƒ¦ Âc.M[[ÅEßUÇ·³8ı¡k¹LC½#:¸›}4Nà¯¶`—Ê”vªCÃQ€`&P@"7HK*™A`Æ®H¯İÏŒ®òÁæçı¿Æ§nÏnî5BBíC8À·2ÁÉê}†ãSbx 6!]ÂƒšÃ. İiİ(ª&q™	±CDe#½QÒ¤:ñ»ÎIarQáèªŸkŒªj—3:Ô—¾HÂ$4Xİ—=nS€­©H–Tù²~3µÔ¦Mfn-6réíË©Ç:*bà  š ‰Rw    ¯!)ù±äxSÛàÔ&„h@ªIªæå8PEWnS à—ÎÙ$Â—Â÷ĞîC^Ìz™¢¡í¸]BºLRÀVäì}Š™:4ì¢]†¬ğYÎR‚Ìº‡TôÒ	ˆ^5f¬¬¿+šQÎvÄxAß)Ğ-ØF2]då“ÅIDÓ˜_€Ì#Z‚Œºi"µ¹Ë¢c,ğ?‡)Aª%õ¬bªíàÌâ³ˆQŒä tˆ¹uNgAÍó¥LM§ò	aGƒ¶Sû*l-ƒ¼™[µxhj/ [H@Ëê«CçÙ“37oĞÛªmTVHÄ20D †õ.g£ÍòZUUÖ¯nX’{Ğ¦±(6+L&P™eôíNXÜéĞ„„«t˜GzêjÊ—‘i~˜‘Fc´SÖ†Pn’ 7ïãU	suF]°bHS/óNsÿ™¸üJ	ñt+ëw§ËÅ«ôJÎÛ,şÛGS5D^ài»ÎâDÇP)Ç¯™’Æ0·7Şû'¶É~C1ğ  ” wR    ¯!	û±÷ØQÛØVfJ&²£JÜiZeŞ¦‹eu-­k¿ ĞYL±´ÄÒe;¸ìhœw¨¥Ø.®^iñ²%qyd”UÊzïÙ•Ô„CÏßsŸ9š¸Â‹LıÊ*NÏrd[Ã#é /,ş$tá¥´iÖÇjÃTuâİ”V!b¸€š0óÈ"Š#i|Îá'µ:œ§'Ÿâ:!\»>an2T”5êàN¾^ÎÕfºú~åâî}ª2€²¹Ä—Š¸îÄ'§§İLµ¬á8k¿ÏÿÖ ¯j}|W¬À§‰ŞxB³ª’ÕEd@ÌÀÆC€ ¢Uª¨À1cÖ	ôıãfª¿Q›9+ƒn³[avû"Ëû§G&@–À A#|¦*1ä²š;J†„EU@t¨ìEŸÆ Dç
Ô ‚»$\(`)Òâ°Lr¤¢°Ñˆ!¿T':nô±Vğö1W?Ó6å¸úMwµ M›µ‚«ÀJ\  ‚ yR¦    ¯!;°×ÌR\ v#HjŒ°ÇUï:¨ªÀãú˜´X{^(ä¯û‘â&¢÷–ğx$!™À0‰›­ÏÃ,ùMìœ#¶(¢\—íº4Q‘&©„!ÇU’ÂpT|¹n-Oí's™ K®x9LxëBøDË¶RL¦$Q"— ì¤±`z*ç”îaís\Êoj¡¾¯~Aèï¢ëéÍÔÌ~Ä¥zúwˆc]5:Õ_²Ó¿n!ÁD]ÿ8Š Ô²~†‡(h@äm[}€ü:ù~€D%‰]é§)-¬x	ŠÄq€Â)İİËR°.—¹­”(9nK¡~!@à‰ÂÏæJWmuÒ»#Ğì²KRD
ofÙŠèÉÛİv³8ÀÅ»¥#
¨jâ>ğo8Şf‚å†xJ{|J#¸®t2¶´5C\µ„m'Kzÿ´¨€¹¨À“ÀÊW%–İ§{‰8ëğ7u› 6a%òì?ŒRñ8  „ †R½    ¯!SŒªÃøRÛ`´&D‚ƒ"À€hNQhÄ]UsZIºÅè<Ú?¡½$'ä…jª@şÃ¸s©¬QŞ¬0‡rt;6õJj#!tÂ¡	4‡pRMYF™ÖYÃxñÚ½È4äè–Ë`Í8a 8Şò›“£Â›‡¯ìóò‰€f€RYl­êCVœ¢’jW9:¾uÑÇ‡i\‚%1Êª	h&wÜb;S'wgB#ìL˜ÇûÙ;Ä*Lğô‰g•ÎsO°‚ß’ÌÇJñ¤d:$½àc¥%çM‘Í8zââ|z–ºZâVjS
ÂÂqĞXR6…‚¢`Á`Ÿ;éç6hR‚H}ıÆ”ú'=Ô²#ÙÌKr”€ªŠÖ¯»şØÖ´58ûo6$-ï\»JMB¥äğ¹S 9zË·¦rJ-z©`ÆDÄŞÆ8hô:³\µÊŒÌÉ.~±Nt‰¨›³!¡z1ò³†wÓcŸ1©ù·ş²i(®¼¶áÉWc… ¸»ÌÆcÏ«ü  ‘ ‰RÔ    ¯!
€@_øV[X°,Šƒ`„ 6kâÁÇ.aÒwªÌÂˆà «!-MÕ4v*X[µó¢û¬
9™Za‹OD^XïA?-ñÙ"L&‰iA¿T0kÑ€7ü-5	õ‘%Rk¤öãçş¿bv"7¥ÿ}”¡”Bù›		Ñ`Z‹l‡ÊŠÌëêíö…M|åÓNSøIgKNygïœÙˆú=*h„±c
uƒÁsv¶~Š«³m‡´ö>l¡ûàÖR²Q‹¾wòğãúj-ú’mˆ'M‰‚ùÅ©Ô·€ä’–ÓF‚(àh…‚"@aÏ8­ıÊÛMxÖ9YÀ›%Äæù¼ì3ú9Í˜¨¢ZÏë"–uR—Ä›fHÁmş®ZzÑ‹ÁGºDU	 Š/–›íÇœ zf4é†è«Ÿ}³º¶Q ½¥à "[œXğòÎ1ˆ_qs“fƒTŞK›º¬7ª›TDRùÇ9bl6§Væ¦ÓÛe`Ã;W îğ“ğ  ” ‰Rë    ¯!2 BÿøVYé(B
„ Ú$ç®·hæVó.éÙf´1‘ß{ùúÁ‡Åë(FCí¦míªŸ¹MÛ=iC9¢äúáN3hr-ë|fÈõ“ç"‘ÊmlH)ª7Ó)
¼ÄPK¡x«®˜æ‹I“ømTJ‘r—€¦¨æˆşµŸ;™°	PŞ\’QoeT¾Àïª4È´‰(œÃ€àEƒ¢L)1Šˆü©°™(’€xÈ¬uíªÒÃ–sp-ÌÃºùåÃ;Ù§zWpÏÙRádkx]}Ghö” ‰†2F/‹’‰IG²Bt%0(‚D´AºZûp¬S5ZÆ2ùëÜ¿üÖ d hQ…[6Lu:#:ròcùqôzöÿ•]@ÇÁæÂƒ¡Uç Í|´€qÙ_l£z‡V7 ·§¥Ü8ˆpë
µÎ°ƒƒåßg²W­½9 Ğì¶:ŸçÓÏ†ûS¿^bâª#JšÎ¢AŒé÷ÒÀ+€  ” ‘S    ¯!
  ÿüVYhö;‚ÁA1ˆB`ş’†}|Äauµg)tğh½ßÜSNI‚$ y-¬ˆ”!2Áüs[5Œy~Ù6æã’[~‹Í¯Ù¢b˜¼»9$µ.L§6à’+ %r¼³ÖRÔZ1a|‹ùXãR_?ËúÊ¶·ªÛ–“­tìEĞJ€.ß:nÛx¬16ç•n´{š‡úü»ğ,YÁ‡%‰çÙáİÛÓìÕä¶IGaõêµæÂ­“ëR;%—)§,¨\ï—°:ëV†‰‰ïV*âZÁªœÍ;Ye÷rPÖ~°mg¾éòºs•7Y}sµHkJ°®Õ$Æ'—±Ô¤·°èhŒÆ:J7¨ RÊªÀHÒÚ#>ûD•Y¢#¼uêU¡ÜÈ\x#–4V¿Çù3öÓeÜªÚ¾‘zeø/åêvøJ”¸'_ô«÷Ó©(Ü„".îD¦É%€»à¡Q7:|¨ÆPÓéJ¯BMc¹İc—å©èˆGv~œ„nd 5>¾¦‡B©|C€  œ ŒS    ¯!
 „ üRZàô2	Œ(„­<3¥ĞNU[æõO¸®¥tõ·vxàô’ÛÚâº
Ÿù“üØå¹4Ÿ.Ÿ,.kŸ_ƒõãÇ9ÄÇ¿¢íÍ|¹¯¤«$ºZ„?zÕZÍ9)÷Â;oN(R§›Vòpô*XU&†L¥ O`eÊròe&Wè"şöó]×ly«‘{¼ŸiöŞ—òĞ)`ßÎ¤Õİ3ã,²á7ğGuı³\Y(—Œ=5*	!‰5êKíy©qÃ._´'çæÃy`R1A%×¢vë]àDëÊ‡Z¨V\hPV ˆ?p³“~Se¼I[.š<ÏoYÆ±Ï§·Ywß7-ä|?=X]»Ö›ï.1dD‚2û2Gxm¥XbxHª^ÇÛíµ‚ÀÃóHŒÆ18@ ú![•H+=”¶Š.¬§È 0l»¬ĞŒcìÊŠ£$òŞC}–6O]ÓÎÖŞ¹İ-~Ig¦ušíËn^jä]Øt=3‹]2y
×€  — |S1    ¯!
   ÿüV[(ĞT#P=®J/{…ç,Ç2ævÕˆi‡m=TèàXñÌ³® ˜áÿufòÌ{w#¢1{(ãçŸÚpjšCV‡@°±” a„}÷KÀ€T0‰m¼’1é·q(‰±,"¶2á‘‚Á‘¡ãÿÉ¨Átø`ñ
¨N=¶Â¯VšIMïòßáêJ¡p¥›¯•RÑkù¶—™Ip™S¶¾-yvÙZ¨k5‹qï¹Ë+Ñæ‚…–u1ïm0+fQm_dá))Ø9!FRöNˆÎ’÷Ë·Cy8]ğRùeŒšLˆ#K­ù…Yvõª¦“ä
ØÜ‘¦V,m nfp¯µ(Ì€¾l
ÏÃrYWl¸²B°=„>óãÍ&‰'µgÕ„E¯¿+¶ÖÃ\÷éjúèDy‚rsmØ’,be.´.ne¼qŠˆ4ê"m±Zòº{lµ"M7È«yÊÈ³L²^Ú®ñÀ  ‡ wSH    ¯!
X  ï TYhö;$Â+´·z[MàÕ)uXç¸°Æ+ù¯ìXÎ¿µÃ§Ï×ì©pm…]œ{¿GĞ
#yŒ“ÅS†70Åf« MqC?².UĞzóÄd)û+xöMÌÏ×t0AxTXaH'ìıâG aÓbÕ7UN¶­_ˆ€õõ&%R¬«Y„]‘SuÂf
IFKÒSh–.È^ğ!_i#š–†Óí+»ÁÔrN~#ŒT™J
İ¿ahÇÑ†ÓµZN‚b¦ß	a	@‚P#ˆÒ©jØ˜Ú!LÓo77†Ê&±„ÖŠ›r0”S]YÃ*‹æ¿H²Âép÷×Úş÷MÊß¯0®HTBgh ”Œy‡hGÙå"4uº5¬ÊqcóŒ8°¥p¡¼±:rU”çª•F‡¢(A=5aÙTå Ï’¹¿_¯pM9cÈ 1&;q`Ë	VÛs]Æ¨»L”¬ülŠrZN  ‚ ‚S_    ¯!
9@áüR[ØTFBT änéÂÅ›®V]U‡|®/³s…“¢õ¨_›ñ=…Ø¤å¿ +¡Ì üojXaÓ#«Ğ]‰º”…oñxMğ5t½•¥*Š
|†Ó"ÑÃ¸Rá*sà10Ôr‰*[²½¦†±?İğqøãZl‘¨qõVu~jõÊeÀL¢ñ†³‹™‰9w
…{©;SLõÏ3³Õ¹z$…ho¦‚kbN+¨´œ-2àZ}7¶O®G“Øzg	B¬h!uş°
#;Iic†É/h”–¨%Ã0Ä` C7¦RÉM')€zûÜŒs]í’˜%Õ´nÈñ—\{H"ĞïÀO!Y"<¿õ½Çz,Æ	ï­D=q[x
TbûŠ†•úpnêgŠM±˜IòÌ
şiÂ5“Väí³€tú®´ğİô0&¿nªh%‡ëv„Ş¢ó1/÷€˜*Õ‘]ë2ê—õ ¶¿V?áÀ   ŒSw    ¯!	a€ààRÛh°V#T'=FÙÓ%\(ğÕU®ªœAµóÇ†ãˆ¾¥.üÙ°™QùƒB‘„lûo¨MOvUX¸¥-$oivÌĞr?çú²e­g‰¿ãVC0/ÀÎ4B™DÃáíC$€«©şéH]!”Æ+GEÄXğš¨!ä²vÌ_ÕoUbO—o<0]Rm «ôöx?J©sÇÖ™Djz{PàéRÑ¼¹¡fx§w‹QY‹œÓBâB5Í¢oçògQÎ”÷aÈ Š¿\‡:hmT†	ˆiˆ€b´ªªcÆ|'|KÜÊ¼jƒ=ÌËÿoÂ:ıÙ€£Rş/6\ñÓ«¼–;zÖ—"
Oê¶ìö¬p3L.Fµ_ ÇÅK‰×l}/B ]I`µ€­íH¹áõHMCr£˜Ä7ÈxĞËÒØÈ@n˜¶»€ÚknÄ¢`% R^oJìé^hÁ¡4şVŒâ~‹k;<ïhVö†È%(§f…bSQŒagïëBG  — ‹S    ¯!
	0ğàhP\dÌG ¬ª1°¬k¢±ËEÕå8\Ë<÷C‡ Ÿfóæ•‚ñšå.ÍuÑOA$.ŒÖ›ò|	,£5KmÍ¯ i®fAYó<Šı)š¥îöÎY1<üƒwO!^ñ»¬ız—:üO·ôªbX½èGgr¨-×]f€=Ì qê€I[¤ğÂ³í F>ãR³švZ‹Û/ëFËO&Ó	Õ”LÎ3Buoº÷¬øÿ¿ÍŒVQÉ£)E™Öİr É:Ïí@¼ˆU”Î»BdÌÕ¥h©J+lc@‰@B@Vø®ahB•BU¸€ó\€4/*ô®–¤bJX¬Õú[PÎ¾-L±O£€ıZ…~€(@ì.¹JĞ>«­khı&2¡<™âhCî 0@P —8Q¾ënP0[o¤=@ü©>è-Ë ÖÚŠIé—[øûx¥*e£¹»XI¾.ŠA¥ŞÓŠ]UÊ›ÔPøÚ•áÏšÿ”4‘•£ñ¾	2ª\“çÚÖR¥f·  – ‘S¥    ¯!
	1 àxP\ğ5Vœ¶]2œñ¥“nåÄ0¹v*çTR‰¤¡œG¶ª êàÔzÍ …fê{ú±f}"È¬9P­‡TAÔ’Êb‘™áÅcX#VsüàWYí·jÍ|OíÖĞÌ½jù0ızß}à÷âRá5Ù&€îB£¤d©–5”d&üG9Ö~¹›ÖøÿÏQîê¬ÿî+z‡‡"2¥^¸e‡ë<ã0uf-ª*mV1œ"[”ÛöZ[ªvšˆE$›!jÔôÏU ­Jgj9Š%¦İ
;S
ˆ£H j0J€‘W+ÕC8ïYSØJ¬	GP&ÊÍÖ÷á»×XĞKAÏ^XJá…Å1ŠˆƒÛËõşZAa …B¬Hˆ€W¢¾®–¤&EÆr©rÛ„Ãb&²œ³GÓzåg2çWT…@€ƒG2°ï“50ÑâmÈçEãã79DÈ&@5*(c%ÊH°ÉSXµ„&IÍ·fè‘kSnÆyÊWo‘ƒöŒvŠ6ğ  œ ’S¼    ¯!	± ÷|Q]$lXØ®{é’…­ZÍRò«Êï‡(°¤ğr†¿¦œzI¡ îÃ4ólómk;
ğDj1ôüîUJŠN5Ï¥ã—¹Ğ.,R„£TÇ,±0n¤ÅŒ|ÆRFÛ;¢ğå÷ÊÎpÓö¶u\O#ô!'`Î=–şß÷¯CAÎA&#ßÁšÕáWñêšD 	yı ­ùÿØÖ"5®0œa¶J"íâ#ôÀÇïe]_Ç8{N|¹ 8¹y§ı ÙÃY8àË²tµí«ÌÌÚíå N²Zk°J„¹Ö]5ªM’‘c‚ `2(‚ " 3ƒS 2â¤0
XÓ¦ú·]Ià’w/Â1Øğ¼åUzŠ®U¾7İ‹³–éÈ‡­Zìc-nş«PõJ!Ùâ,ï¿ò¯$+; ØSI¹k1ZZğÌÂ0´éÂü?êœĞ-cDOñuDÃL	Ÿ¬dRc+>S8©¥’w\hEGØ ŒkÔ"D*Dí.ié¥¹³ÖkŒ(Cå$&T
 ŞTS€   •SÓ    ¯!	p à8QÜ ˆ	Î(¤O}é{•uÆJ§-RÎ'ñHşw ‚Q‚ºtÎ9f1MßbWÃÜ&L1~•”AWšXÂ"“”YÇyxP)B§u¼s­ÃçêøÆHWR8[”Ğ#QáÒ 
;pòŞJD…8}§á”È—¦$ ‡c$ÔÖ„vù_N‚®õ¸|Şù?¸m–]¼ ¾NÖP®6+½f:y¶.³^$¥UV*æD›nn×½æ@±=áMEï:oÈ è[ii©Šb¡Qd¦A\lE(bRa” ÅˆÆO`càPé¿í£Ye™³âöT–VùÆëÃ¯Ê4AÃfLN9ğ<³(R*g¶Pd¸0Ê	w·æ„âQµò‚7"šÈV3~^Ë†Øßè}–+dK.(²ÈQ–%|èeQÏ‚Ò%èK 2˜„ Bæ I+İq<"k†
Ş1DQRÊ,ÆĞJãËI®©BL‰‚<a5òF/ÅÁ„â¹ÛMº¯¼    ‘Së    ¯!	àğĞxS[ ²(L)$½Vèîö8%ÍÁáÁEÓà4@>[¡/†Oag×[¼\±]¡´2³÷KùÈq‹Œ«×Ş–`e>ìA ~Z&\=ŠxË†‡j‘±‹¯lÉj¹¢	áŒSÆ±Ôùšƒk|§{µ¢¤&{ˆä0)k’¨oåªøû*Öı?ON2?)¨/ŒV(î_mâ:>8\uUçZ«Ê@[(‹Äóä«˜êÜèŒYûÉ•LöˆŞò)ËçÛ¸Šxi,]a{€ô$'Ag¦˜Â	˜bƒmõ\¨p"wsªƒ ®Ët *›Lğ§B}Æ$ÿ„ÄŞ¼ÚBK#Ç¬5«¢@öôM{±z/²Ñäˆ	jÇz-ÕH‚â#ÓÃŒNÄfãm‰Î*ACz ",=•H@{o•7‰Ëaé]Ä¨ÈsÁëvf@l„‡ekÁ
ß0ÃÀ†]±5F ãZ.>×™u£¤¹=¡Hµµp£TÔ ;µ#  œ ŠT    ¯!p³æhT[áH!‰‚i° c‹ÉTíª^î©uz$Ê-ñG°Lnkñ×¯›ó²Lt0.Nş$!L„š0 ,I02¸ãôã]¤BqK¦ÚĞ•crZœ3)¬g”¸ıMiÜUEn	cK—M3 
Ï¼Ğ?Ú0c82mÄüb–¤Ô‹¡sÓ¾d‰Ïgs„)ZòÌá@Ôâå™*ıarİO0ƒ9Á†#”å…RÎ7,3[Ë<:-µ8ÀHhÅ}%¼ëş®é6ua9«PFÑÓ§Éö µ“ìL£dhsx¨I+%MAÈÁq°M`!•çWŞ‹feÛ¾3tX:`#Èªu§i†áØÒÃ~¦Ìq ½óÃÛ_âje^uÇ}$TAŒ1Áå€ÈÒ¡;ü‘…0zoÚÛDZíéÔÊXÉŒDo¾‚¿BùG]a=%vH‚¡“Z&Ïİ£³ˆ˜•ä_ÊÚşNN¯E$O‹¢DDq vˆ/:ÓbtŒõí¯¯ñ*ˆ>ßÓà  • ˆT    ¯!
t²æ`T[ØrfÖ&ú*èŒíª^ÖF çŒÆİ{°ããÑúñ†-›’é,-a‰{†;ÉîêÓ@Í'Zëm6ŠÎ"9Ô`´­R´“Ô©†s­íl1İZÖ4£Ò4šq7áØÄfê½wq—[‹êz/Z§(WªºÅLÏ›‰€Ák0ÄD|”&+‡ËÇ÷ş‘¯÷Ø¹÷öÄÊï÷Tg*»S	&T€ÛŒ©¶ş•ğc>EPp”š—BªŞ«Ë,œb³l8ÕÄ!ŞõHÃEkƒ©À,#pºaÇŠÕŞã0@ĞĞ”î´Xô'Ÿÿek(ôãğÀv›¥›Ö8 »É­ó¶¶è-ã,ñèsLú‡÷¥ûzÃ'³ôó°¹ãÕ‚t8ºíìÆä|¼¿ŸÓîÃ–®9ttŒå÷¶|-òP»ê±€ h7*ÖÖ¡~/‰é40µ¯=n5Á{€/·Ux2RÚd  LJmå_61¾ï´§5U9\  “ ƒT0    ¯!ğóòpTÛØt(#Æ£€“Çµ38U–q‚è¯ËñÅ5`÷{ßP„®Æ¼R€¥<¤Q0Â>Ë›Í8¬kr ‘+ÍfH·ˆ¢1-¢”Æ•şm AÑÖÇ†(pıFíkx+²šã¸àGÊM0Ó½„N*ãnè34S:=N@$Ër O¾·1ùz±-·p^_L+y´\õ|Ñ(½ŞyÈW¡Æwƒ²Qu}T`É0¤b°´½=w¼£X‰pH[Õaf¡2ñSî;³îS³
u Œ!
‘«µ±œd)§ Üj{>Ô±½5}Ú` j¿%ß·úïŸˆ‚ğí,"ïØõš|ÖŠ>ŞgYÖ{ +§–*S®<«KƒÑëw½\‡Îü:¾}¦©+óá"M‘º£Wÿ>ÇùÒÈoN‹¤
ßm…Æ¾¾œ6ŠvÄ‹€7DÏ8cYT(	«˜*î£vp1:¯!vĞëŸi/U’©÷ª¢ÅSªm@	®u§¦ à   }TG    ¯!‰Úÿô@R[à”#	Ê‚ D "BŒøÂéNvÕ.sBSå¦›&ÌºKó¨tïp‚&¢qr…m8)
Zt¤¢™¯8$+„‘H§,JNp„ú¯·û €$ü$DæÇôŞn¨Lü\õ\Š‚r6ì‰nÿŒôQAøw‰èärTVàÙ}œâfx`M<”MF\‚<½¥Ï«*.ü\éê8yçX8Õ”Ú¯Av‡"`Q›3íd ùäw–õ…òÖµ®š˜!Âv8¨=X¤Óscd^ëJÊ˜êo'qãÉ9H¬ßSl´æ$Lq:ïÛÚc*¥*8¬i]€HÀƒUŞ3á\5eè•:9ZïĞd:êØâ°Àì®K¨â›»«r¨ÏÎ’‰¥¤,°Ø¦bBp_ôóE,eš±}7i‹„<™•ò¶$  kª„Ì räE¦BéşÚ [öp¨Ä%Xq¹t€ÕåmÉS¦ËƒY)ÆHİFu¹À  ˆ †T_    ¯!	sùä PÛĞPJ	ÈnÍ†É­e4Ugmµ>†,ík±×ªYq6°Äi)˜×İ<“
tÁ=œºğƒ¡064²i¢rïôIĞLGXJ[îüèùÎ9ÜuHlxËK›—+ıĞ˜¬YÄKq‚fã|]²¨no`‚Æë&¢º¸S¸fîq²ï‹Â@¾ym(p†ï²É^“d!GÖ)?¡ÒÅKV]d]÷á·+Á"°”°›CºI$¬ÌO¤› pğRUá®Ø¬g Z 4Æ)‚$Q
€I2õ~<ï~{ªÕÛ+aWYª]Ö‚*'‰âñõ	¦^¬öı®ü\÷Mª˜®‰53+†…º·.ìê÷ÉûbÇBhr¾ë0ºøÀ ¡t„0õ&åù'eš¨SæPÖªĞÿÓ)z8qKÿf^ò¢øOÑÛˆÔ¸âSh9L–„ANÑ ²+ï%iÑ‚NŠ7^6ÒƒkE%„ízÎi¨ğ¦ à  ‘ Tv    ¯!	;ëà@SÛà”++,ºwÇ|Ó»ÒUg+I„«—V`ã¼ıN êã'#û«ø> Yˆ¹„aú¢Ğå&fàíÖ5ÌÇ&6Ë£Y`Ë.$+p•C4Â Ã"{ÉäuzœK‚:¢åZIÍÂ§$H©CÓçó¼çPŠjÀšDš¢š›|P"ÜP#¿;öÌb`Ğ,jºXí4pÜ©v* İ|¦­ıjÔø$Î°Şj¢“]%¥Æi«¼œ#æYM2ª*ÑÁYÇAÊV+ÊŠ> 
«z¥„$A
€Mõ×ÉU6KK®A	­´àvB:slKm‘:N§ø·G	…ìy'ÜÔêûÅyjbªÔ#œª¢ÌR¦bZã]k–ÄãmÎÙÌé¥+{‰Ó®¯f`¤š8-.¨¶o·çì`B²C 	Â»uŠr±ú·8¡Ì@x@¬ã§ë±MÖ/ø](½³’õÃ>ô*T›ñé±:@ 2)QLw•s¦Ájğ  š •T    ¯!hÁà TÜT(3,]VJ¡äºY™V”ép$¬×£$¸‡DúF İˆv'¤¸wjTÎ¯œûJÊd….^LjSÂèR¼³W €^«¡hçäê€1 Xé7ƒ¯`¦^úà¡rœîrMB.GêÊˆ‘˜œèq–8_ )KÍxgt+QËp&6A[ìt ‰_Ë$ÅvÎ× ·+ëÔ&^`K<C[uvR”Dd`xNË‰äÀé¶ª_û†POn‰(I¯|•ÀMu5n¸hŸ€c$Ñ†[/ˆ}ã,´nºÀV:c"Â2 …@"Ífú9:©[¢D–ŸtB-ğ~Ç]û.ì=>‚‡ÉéoÒ{ç?´«	¼Hzÿ\eÙátz“Î ğ•“éÕ9ª[—ï²ó< P…. ğµEBï\®CV
âÎâØy`&Ûë†¼<Pqk®€¢3ÜÙ`	Ö‰>³œµZÓ‹{ÀÂû¥hHØ¾CAh¶nj¶ÿªö. Ì*å-¥Šå^-€    †T¤    ¯!­€À@SÛ™„¼ßYyj(V¨Ğ­ÖX´ÂK°ü·Åpî°‹2`IÎ-î3Ím1×î,tCV™ŒäÈğ¨r©çº_SzÏ\ën›¾Ò Çğ@¦ÂG¶ï/Ëwÿí²Ü©@JPë¦ofä¶¯o9ŞŠ¾ó#¼ÂŠÙo]Ø­	¿KÚ¾?Q%mmCÑkŞĞé)18QO>,0¤|Şgë¦–¸Rö$¯
ÂK„^b¤$«:ö«6­Ê} 9T¢Ô¬Ó:K=Âï:A-Io!2$ŞŠU%wFÂÈ°è®ƒéçù‘]·—Ú(êWğîÅ¿ÚIm¤ŠP…åÈ2“ùÎÄ}qt~.ë¶[ôÖ‰µÍ{÷èg¥©å³m«=5¶€–Ïû»4ƒågÈæàÅÅ+yk2Hêf4`'wRs©(‚[X]y­.b	hŞvÑW-”ßV¼2œ3«®&+šØÑZÄ× îêëÃ‹n€©÷F–œ¢µÛ+…KÔÀ  ‘ ˆT¼    ¯!ƒí£À SZ¡¬$!	,œéŞiZSxQiKMßÒnhŞ‡3NjÍĞÅ0Ùj¾'\9ÿáŒSÖŒ£‘qşš¤BeÜˆÇ>D¤#¾†±­°Zmëj«¥ñ	@‚%,ò‚·7TJeŠäû«¢yS*ŒlE¬D^:7û^Š/%È6cBaµyˆ%ÖÖlœË©¸N´¶Ö£ë
$Ï×ÍPõÌ»3‰ó#W(B(ì¨qHÃ‰;BT®»ÖÈ«JZ×FºÑ¨¥
e§µAXÂ!”Zß²•á©uU`Š”À°’, bö9ü1Ô§¯–Ş{åk)6D›¤Ilƒ”¬a1ƒ)â¹>_î¡‰AA‰õS6Sš ¸41(KÒİ,à+¦³ÔDÌ‡Y!Î!u¢:\ÛÖ@5 ì(N¤+’ûX¸«µdú›«ğoB”qölÃ£fÜ˜æ¼á1l?û„L)[Zû:4Æ¶`‡êDÂ«p¬%™Mï|a ™!
TXà  “ ‰TÓ    ¯!$ € SZáhqX±§½hÊnæ2‚à‰Wa¢„bÈö/»Üù½]%;óµI¸Õ³6Télûš{F)İ|Æ„C•¶ô¶ï³8ç0‚ÑMM:$–Q	'[j£m“›dN‚I‰8Zy<ÿ‹AMTüvËîLs¾ÁÆ:<ÊXÄ«—WèûÃõŒ9Üoã”ÉÃ4mH\ïrÓ©z²ä¥ªXÉe3½¸X¬òZr´—‰³|[efTÏu–ÊĞm¬k0œw®ÚÅ“xaQj£1PL"8±¥jNbS•”¶úÌP.…İ\ 	zSÌg{‹<a~
ë{’+rV(Hfm©u;|&¦n}<@"‘úúÊµç™ˆeÁì¶ñÂOß—v¢Úw-Gç·½:÷Yj¶w„NÂ5‡3¸‡¢éÎlCÛÊ‘À =?×æ<æDµ¶¶ìXé]" 6üèBMÉğR7„‘¶¹†ÖÎë%}N—¢U	}HÕEeö:UNªä¦À{D`‰²§  ” ‚Tê    ¯!µ˜ƒ7–¬æâ­-JÉ•‹KQdiódã‹õÎ“}ö63vt{Ø{Ótót_šo‹Ï nLÖìŒO1Ón¶¨áo“ÖRÛÛñL‘#¿ËH¹­õ“EüÊiŒR)‡,TÌ«hƒ‹²;es{†Z¡®@S‡êË—¤å˜²áôcáY-¼^Ë¡×¦ì5+¶ˆ6Z€t8¶¸$?Qe~WYCsàO´Èü\’«÷×—BÔRÕÂ ³4âĞ¼ºjª£µÁD,’À¢ÎñİËª@¸£ë8•(UZ‚iuUn7Ó{PÑğİ«1İ×·i¬­?ËÖÔ6œGOcˆ5-Q·š¬“g—ªÃE:o»R[),w™EğÓkT³6%×òşİ]¬
Ü¯šÉŞcsM7u¢Úzaş·9	è¤Ûí¶*ÍÄg~ŸÓ®kÃmıä¹Z®ŸÙf‘'ùéì¹Ö7 :Æ”!İJ:§:®ØKElp   ŒU    ¯!EÁ–E"qx+¶ËÇ*0¡ ^4ì?Ö^8Ş*?dÕºGiÜû?1{c¬ADñG^gt5 y¾cxrëgj×Ğx›øò–Kajø
ÏLÕİD×“ZI³ÔæW˜A>ˆd(yìoSÔäÀVî1AH¯l”«NË+N®†ÏùJJEù¼†#­Ét2ƒ\ÍıƒLVA=[´¡I¬1EåjÕGt/fâûŠm2šĞO=qœÔ[rã0lE¦ŒÌA‹ûY2»šª¢š]RVY m—r0ó~ ¤V£:C¯°ÇÑ½·¢xÏÉ¯|şT~¤cCÑ©'4k.{ë±îÒKê[ËI½ºL¬¼i²˜ZhRp	dÊKíšd9èƒÈÙh]ÖRô9‘$‰T-÷ÁˆÒ€Âù8«ñ?Æç–}”k±“8¨2¤öç£kâB›0[W…û)ô¥‹ìÄâ]¡S4ß*İJí”ƒJò$Ôu!L†cnµrC|niq’à  — ’U    ¯!-®ˆc •B—·#ÃŒI+… ˆ°Èı)…İÔeËd ¸™F£r9à$ #jqñüÂøe—Jé{‚“ÒO"?âW E¾¦buÒÂ;qÂc$¾C	E ¯€Š¸ªN‹’ Ìãts7~ù¦kº_8šª¿ŒÔc–xn…–^¢¢t$ßdk¼B:d©°šªë¨TÔ*Ay’¨lRK)K™eÁ\¨×I'÷w¬¯{Š9o+â‚¦“­9æH9ÖÉMe0SØ©¬ÔµYæóßjäˆ¹İ¥)JØá%Ø’õ×šÓĞ,õ=§9+?bêùöËzàû†]Ğ£ªil.5méÎ=j9—@n×"-h
FŞGyXİc)ÂDÔªR¦™dæ’ °+>œ@Ï¡[•7q‘“Ô%’(ï	„YLD{¹DG1µ©ç\”GxåÕ~ÉÛëz³e‡vR<,ÄI¬FN
‰á¤YLR’‘ŒYkRãË†Ğk‚kEGc€   U0    ¯!=¦ŠËAˆBÃÚÆvÇ
²aEPº„¶q@9›Û>Èÿƒî¬çÏ;o îøÚë6ˆ÷ªÏd±zã]	®(Ño”Yt*îÂ^]²†W7^=ı÷U=‘ßé¦Úi9n3 ‹B&•Ş´A²';E¯ÃÒò¢¢cšØ7û
èLı–íµÂÍ±äe¬µı¨\
êÈ3.Ë.y›íVú£éª$¢J
T´È,µ•€´Wi!yNŠVfFuU®:nÌ˜ÈÉr‹CPÉ¦ÑG‚1PÂåjÒUUÓºáDM—²†Y`†©ØÖW%ò¶‡Ùø‚µhèùÔ¿àí¯Cßfï2Ê3XklOJ=M}H¦M˜KTBø@v	PÀqšÂKäF¢ùN¸¢Q­3‚ Rßqh¿½x<Û`¡†ˆøìÌ“lÃ6.ûºf0]¶ãç½U²‹­«¦ùñWu­
òEü­Q&[|.¢S¬m¤(Ó…s…k9â-»G™ı¿HUŞ
·6˜`Jk.  › ŸUG    ¯!E¶	!c¨ÂµºÒ¨{íM%ÕÖR®”$A$M¿iUé®‡²5?É=—ë4ßauu\‘…Šï},ùv=¼DõDäí3œz0˜B1
8Ïöª¥±«…™Š'ÿV¨¹¨™k¦š7xJAhW^ÁV'ÕŠÜÀÄŒæ»”s¨b"ÔõçÉÛCtQ¼ğ‡­rHü,jŞrÀ&òÌÉkËâlû°)Õ)ï%Bì±5$ˆ·!@…­;Ú+Ö(FÂq„§Ô<×‘&ôÕF°ì¿a4Ô€ÀLM=ÈÆB"¶_QãYw·w#¿5u–VÅµK±Yëµ]·CW½Ómã½bŒVå¿ûÏÛ÷HåHx•4Á@ÇíæL"4EŞÒkç^ÛåáOO±Õoß‰yhï©m]5-3¤¾™(¹YCÁHÜLm’4ÌJp–ğ€³-(¯ş²
áq]èğ6¿Ö+mj|,$À‹èïÀ»+ªyl9Íì…[—;µwƒ¡)‹ëŠ­”ª¹EÉ®wºÎñ‘~‘ÔJZ$”Yzo‚ó´…7B¼  ª U^    ¯!-ªÈQ!„#ºæ-Ú‚€X@æ¡Á²}¢İGŞ34M\‘IáøÕ‡èÏÀ*¹Ó Š÷«¡hî3$™3İç‹~4TS.`ÅE=ñàv¼Àª4¼Ç"0sšëÎKäü½E@«ÌÆ‹ Ÿ>ğAat=Rµ
f÷åÚÄaÉQsniæk©€‹D[2ÄúRŒ¹}ëšÆ>%ŒXÜ^R\K25V_˜Ò…ëö/½£H8qĞ…²¢¾ªFÕÉhğ‹Ö„´5«
Ay§p¨·³H¢²ôÎõu1²L”¥RĞš
Y/ òßnj¯Äú³÷ß®ÈƒRŒ\_S0,=Â‰ØÀ}qÙ/Íg‚“9¹€\®€LMËÌÁL¾ËñeÅ2ŠC\#cÀ.”[Ø" ŸG“Q(:k˜Y  ©0$q=N#lëmnâ`á‘/˜5ƒïm¾sû³';¾ÓX·. £Hk÷¡u¡X©p~¤Q´ç^
A”C¯iV[m<‘´E"óÆB2º\  š ”Uu    ¯!=ÂDÇQ¡‹¦§+ÂKR€Q‚Å³HHR¨*Œåë•=Ct§C“í¼(½ƒ/H-ÖµùôÚqiÖNhUcN¼mğÕf:¾ßİe }=L TgJO¸bÍÔë‡jÔvÎnI!…ô5¸ãÍF'Øk¤kšâÏÃÀÛ-¢®ñPÎ{+àVºÌ£›ÇÀqA\Gh3Ä¯ı#mÔf«eiVåìïF$cZ¡ßáY/¦
ƒ‚È$ÒG„”ã+£3;˜¹À×¥Ej¢²DAhC{‘µEV¤bl )4.=¥Ê”Ø~“–úû˜¢¾ÇÀ·'Bkoµ·÷ùçÕ?kbK³ûÛê—½³n¤şn‘l€ìWów4ÈHiˆ«./²ÄË)Ü?öÚp^pàÒº“ˆwˆ%™ºòågXK`7ÜÙX]X’ÉBÆ›l İhS¤MvN+Bk#ıaûVÌdå!y#+¦¼°¨t»,nà¢²^BøÒÉw5Õà  Ÿ U    ¯!5ªÇBĞBÁ™ª«‘¾e-kU)EwˆîôáÓgÚ«1ÀÌƒ?¦ß…0Æ™’â DÓÒíÙ•åh&|_çäñVX6×ŸLhÀ+“ 	Ê
@Hú	ıÁ4YaŞá-'TM×¶NÅP¢æ~qìëñ^aà#¼çŞŞò<Æò	+»N zfh÷T¸†ÑœkĞÅÓöë˜K^âpúv[;âìoà·¢9¢jVW,Ã”¥%"“XKë& Ñ\h/³®Ù“›¦¡%HW(µvÆ”vº#)-PNtSaº•F@Õ9áš®,|, d°İ~¥œ¬¼üÔ/ÿÿ·%ğ¾Ÿ1<rØL¦å#Ä=•g1uUµuT5¶tPrDIfŞÅª|ê7ˆØr¿,×*¤ŒI`Ğ
IuWÊ‰Î“uÕúíê;”ê~wÕ²j'ÍA†ä,®"nŒA•Mã$ÔG!¸‘c¯Ú<R¨ª$f#˜ªÔÄEh]1D”w%Ø¥~ñ†4j¢ÂÂª[€  ™ •U¤    ¯!-šcc¡……Ù¾××9”S¤E(”Xh7?õD†/ÒxöÊûîã¶æßs²Õ˜ôÛêïŞxTåÉPæú][>LµäØqKå†(vÎLoââÙó3[âK£
yq‰êKéïµ­²ê9KRë…ê
Nxƒ²3c³I¢<ÈÛnoî¾å$"ö—ÏB(wp•4híô{ôâÀ—·ÃĞ7ˆÉ¾NV½-e8ş–z)TZTk²2iJM5ÒI;vÜå<¤üâ^‘–	O ú“™luŠ¢ËB‹R¥Tey”s¦^Dld¦ĞÑñ2Zø~\µÊÎ¸êM^Ù„ã¡;Í©ôÜœ­#Œğ*¡Í!_İÑ ÜªuH–µ¨„
‹œƒ)–WT$
ä8˜)·}÷3O©­8˜ Ã}ÖÁ´«ŒáßB»›ÔF­‡;M›Ö¬˜¤íRÊ¦&…)‰7µ˜T˜.‘ëpÕG´ã,dKJ÷TC0T…¢}èe]ö!B\ğŞQİw·7æ¶…!VùÎb¼    ”U»    ¯!ª„¢EyÄc»’«w	£qE-b-ïu‰±kè‹fEä¾kÿîr¸ß^!Ë|‹hMÿŞŞ¾}œˆ}ò“È¶|¸`@ ¾¼ÜøoæÒjÚ?=Bt r«ÇµÂaÜBšdx+œ½—U_¡j,@qéú³¹+ÉÅ«İ§‰‰x€V9×/Vy 8{ÑèÓ×q—µF­6€Ç‚£º )¦pè÷vâº¶Ê’*Ù($´¹İ-YW”1ªÂ¼%ÕÄµTW{b°f—^H$©µQYipİ¡1eRé‚©J2¹9Áã}Qxæ
w-Èİ@ø¤!½¡ÿ¦L §¹<ÌüÂTµ€mùtØ”@>½i|œº§±ZB+–@úç8[³yaóŸ2ã…Ò]*îĞjûë9p¯åhëÿø³T[1`ö]Ş1ã6	ô$¿5½…ó-â%Ã.».ì…­LI–ºÃFÎë’Úµ‡eIr¢‡¥h“Ú‚ş‘,µ€s@¥rÛ$¬°¥ç¥Õ%¥/   Ÿ UÒ    ¯!=¦ŒÈD‹EDn	ŠD,aöˆö#ƒíò{L´jÎauR'õ·¶½œÔm2LŸ;ßmTÙåæ°lÌqğ#æNf–ymğV¤ ÈFÍ“–@P_İmID´ÍîÄº ÍTI\ûP|¢º"ÿÓ·üs´(ÎÎ×&¢6’#$ïï¹?ªşä—SÖ‡
óãW¹Àòä,}¼r.°ªøç4ûÒhQŞe.´¦GOAZ-zÀØ$A¹zÉ›HÊ”`"²’¢ÕEe!Å@'9}MzÔCÓZİªØR”PRóÎÈW]/Í>!ì®èî•†)æ¤Ì6‘I$ù~w\`©¾È½¤¢]&
Sd¾Ê+&$¦±¯ÍjJ(~}gRQR"r	Á4•×ÇID¢üö„ ­ıNC±ÃYíMß=6|]û¯¾\•"@Rœ]·DtöärG#lqˆÖs'ÃÙÏW	x…Å¥ynÁX’<]"H<]fw™©Zş$fvšVœ¬§D}äÖp  ™ Ué    ¯!U¦ÈD#›+$%Jµ.±0Á‰ç›½
›Åı(Uäë_R?†Ñ ²{…¿)JøÛÅ†Ğäe‰‘ŠIDVGJª‚@xkfÀø‡¹^½œ'+{±:é|À’Q6®v?NO½»sÎë:!G¤÷¬Çd³Ñ0*‚á×™¾\ií ¢¾*&b|ˆa/GƒÚd£En@HùRm=ê¤R§ÑİÒÕÈÔEJNŒ³×u÷L†åõÌl]zØ¡Oj¢²QÁk­Ò´æœ0‰¹Dªƒ‘ç¯ÿâ¼µ÷Ù˜2Ñùòø×Ô§1áni³“è ØãªhèÂı;›eÏ¡IDR\·8„„Íû´ˆ­`PmøF˜†pdM,¯L%Z±a–×n’WVÛ­«¬Ğ~¬@ïrÉ'×É€Í“$Î=³µSØ÷šÅ 8Ü!|j–ÙØã8¹gM[­7Yq‹UéÀ4àûQÚ|ã(¢ÃóíF:)C7¯.0FkÏt)Æ"Ï Æp  › ’V    ¯!UªŠÊC‹	Uæ¢ŒTAR¥*™WBDKVº¤©™õ
»×dûlñµf	ª~½Ö7líJ3\_¶ëø‡Iµi\Ó‰%JåtiCš4”İÀ3ŞÁú¿áQ\•¥}‡­ezNKà’ı"ä0H¬`,tQÄÑhJ`³Íª,‡TSK{}ìŞ­vİ7ó-òı®&áuÍ¹ª¤¸’õ>Ï°Wµ‰?J·
IÑJRğäŒ$V¾ 	V9œ+ıfPÊŸEÕ/l7Gq±š×d¢ZÜ£(Y»R”QA!4:W¼äÂóÖ”µÃÍ=ÿjuÔƒ›°ª3AªIˆUd(>—[ŠmóßÌéó²ıFÂc†os¢\v”Ç%Ë‰ë¯2¹1Ê`˜(’s³U}æ¥P¢”îAæ]šqï…|Åƒô¨QñZŠ4šjS®ªÕv`(Q¾QŸÏ°Î}‡(æÎ#ù]¿9UÆb„©Ê5çT‰ÄÊİ“¬a$³JäÂ«Òñ…cB×gëß7é—ÿŸP‚7‘-£D   ™V    ¯!5ÈCĞB°+ÅÍ-²•UA‹ºicnC¿k=¹ÿ\D¡_‘74UGŸa‹fÚ’LŸÈlåVH‘éC‘Ë=—`n Sr~x `†@Í¹T¨ºÀÆK³ö÷tmÈ’#M€?<û+°GıÕ*tN‡¯¹†Q˜¸!"‹èDÇw„»íåJRYÆV0î¦$õ~“ô"à•Z¬Áİ\|µ³bë+ğEçŒèÌ§Q2ºÒ¥) M²¢¬ÓFV«:BÍµ^ÉiGzY="õF9%2šÕDe¢`HÚÁU((	pcÂºImÉæ•Ã{iN¿—=$S7‹—–lã8BTÌ*Écõ» gíİ_‰I"<“Iîæ©—[³ÚbÕORÊôÿ²^gŞJåÁ¬¨Ö¥ãÂÌ"AjnÜrr`ÇeÔuXu!¦´Òª×æ&3~^åQ o®[ï¡º”WLŞ‰zcXºÊD‰°$ûã^”%…Bñ!(Yá…áGBL’Ğ!Q)x²C2p‚tRõ¿Iş>ºRæKb²ÕTR×„qXà  ¤ ”V/    ¯!}®
ÈDŠİF]ÍèÊE÷¢ê”d  Ï<¼ÎÉ¡Ÿ©–á«Úó{Ø±²ÆS(Nnçg}lş÷YßĞÉf	Ç¡Áé—@LîÍÒ™üìî3éàuy¬Î˜$1‘,ûÎU dÅh×Ö—7}æ ßhšu².*°ú 4‚ĞÀ$ü-áÌpÎ¯@µ)~—ÆÂ°5¦)¾f¥VqZ«Tv¬íş‘F´nì¦«!O÷xônMÁq•ÒÜÙIÁKÅ²‘õÖ4Q#™7tg"ŠËTb¡‚ÅqUotU„¡»Ú
-~Añg.)¢¯Zµn-Lò4Ë7úŸğ¸,<ûŒır?™“buyQ+·†¡ûe¨Ï4N·«}êFøäöÏP€Dµmƒ4,#b«H‚&sHîúıˆ#?ğzÊÕâC§œ†äËÖí4;Ë|ß”Ñşh¼áŒPÕùaÒƒH°]¹±°p35½Wú™™½^%U££T';gæ*Òr”WmVĞ@‡YƒCZĞ–zSrµ p  Ÿ ˜VF    ¯!M’”Æ€°ÑÂZ•|È7ÁPÜ›J$â	¨Ës†áó­„§Éó½+õ¶ïØ¤Ìøşx<%.Êfêmôi–ù€İÒ—ÆèÅ:%‹ÎhÎÈ‡¨ÒjƒKüÕ±!Dœî47!;6
å¢ˆ£…”­eñb`îuHK{yÓàÑ'ä–bhô»L~~Z¯,¹‚•=“İ:æ°ãÚ”¨Œ²«\?mêòÿĞ¢Ea[ï6p€C›Ü?½‰Xİ­µÏ˜ƒàªªÕEe!…£ËE(m.ªñE
SA>˜E¦[Û[.v;§Ÿ!›>l|Wp<Ó‘“EÊı¢A7FI‹¬ÂŞ¿¿èŒGßµpNã¤FGÚ¡-TZ¥è
I…l˜Ijİ<‘!I8\i¬A
RµiÁæea)®/)ÄN7FÂ.¥/Axh2GÑ+63y¤^×åR†5>¯YfÛ\ù:NÇêî¾™§ÿ­l%èŠñŞ²”‰£±ŸRrÙXZĞE(Ã—¼à‰À  £ –V^    ¯!=–Ê! ˆ‚±iİ_~ÆêV¨LŠ6Lh±ö9[=^;ª×ƒÎk¯^ì§%6Ü-›<¢1ªÜğ?Í|K_¹î§Æ²y} °DvÁõPĞT>xH5BòÕvË,(«¢ùi	"»÷‘@ F>Ü> ¤êRZuÂ4ëÆô[;f#¢`kãcZ/æcorn°B–¦¡çÖç‡eu¹òJFÙ«:Fı‰Â8c
G§j•&— ‰Z=Ç)ˆ±X¿óê—ªû®Ö)mTVRˆ*7esW.ª–UQ@Rév=ZÊËÄÓ>·”2¸3ögôæšó,ïkÂp`óoN4.¥¡QŒ³Î˜2mÈXYhr¡İ4Ú(ºeÚj‰$íj†s©&²4Q)Š†ÊJ‡ÎPQ¶êUgSKÇ:w‡ EÓMÚ‘¥Î)Û­•’uŞ»š”ø¢“CûX³]xäOB~‡İ‚W_INòÑÓ&1ÌRXËiJPÙÓù&÷ÅdŠœiŠ©{èÏ!"Årß¤SÖT¤»ÍÄä§  ¡ ™Vu    ¯!5ªˆËB‹‚2Õ{Œf•ÅSD—atˆ…ÇÎ€–Fç˜²[Ô–ünSXÌ—‘{BjO“ôY\…‚Ğ•øuUú)êTïbQé˜5ÓŠU_ağ¹‰4xNyÅ aqSdËD#¸¬©à­p É—G‡Âuš4F] z¯'æS„ìëòp÷«4ô˜ËÃ°”‰g½°aŸÛÎË_o½÷ƒñªQ…UÉÿ§Ëı&¼=ìam3…d™­[%°iŸÜ…ZÊFªB,.°¤•!Wd§±d4¬òDÀî¨QT-N Ê8ñyóBÊ!äü„e–)^°]âç¬õOnü:÷¨Ayu+Í§]I A?•M,s“™D¢HX°óŠ(QDe‹§ !Úé7è{M¤|”â‰ÚE©C…À„*@Cô²j«ƒPbíÈCá’'fíŞBm™1àîMQa…?m
~~ş{#"¨PÇa»ß #, ­fY0*ÓágIiƒğÅ¯–w¬’†Ñ,U%câİ
CŠ1ZêA«€2›r7F)ÁÀ  ¤ VŒ    ¯!e½”„" E#¨ß/¹\ÒÊ¶.©UT¢,µ‡6ÑÚ|^éO¡ï¼6jı†T†º<_5øÚÔƒ›c‹
ø«çµR «#Æ¨ïJ
Û3¨èGÁZjo“ eJW÷M>hNñ Ì¢`.é%sƒA¦ÚÁ<RkŠ2!°M4bIKàŞ;•cäø˜v0ÉBÌ"Z[~ëş/C…äşîƒjBY€aß¶RzË¢°ß¼IA.]KäU‘Eµa )ÍmhV5{B6G=+Uj¢2P„AhuM-¶PE`¥P²îvNmj;ı4.{éµğ,ˆä†[¶‘{wsàu-®¿Ì7JŞH»?~Hµ·qş2‡Ï¿HÊ4EÈ(¡éì”®¤QewªK²HNRQ$…’¸ËK"Ä
œ9Ì)rZôQÅDfø-”Ê®WØö¯ÓnsIÓQÒcWÒ÷ÿ‹öˆ¥¼ÛigCE¡˜^iK4Ñã˜ˆ¡,J6-D\,$šSV4Ñ,‡v8Øl	Î#­¸#À  › ™V£    ¯!u˜ÈE
Éjë5S&Õu¥
r]œO¶°?ü¿-aÚxdšmÈĞô¯ˆ˜aÂ‡l\¿rç¬˜{‚´£¯|¶në†—|¹Y7gIFSÊ;;™ô±ØÖ,'bá|Ã°úI–ù¼__ö5ØY mC“_ş„ïéñ·Fqã«˜NÿRª’ÄÍsÒFŸ%³ŠLÕ|ÏE-b~bl•
öKX…×UC¤µ¦#0ı™àHš¨ÌNíµ ç)lX2D£|çÍˆJ+«­¬Ô!V&¼§½o\&R¨TtĞ	™³$gú;*#¡t>KõJtI_Q×ÚóöíâvF4çî8¸zªs^Dşu@…Ÿí—‚×-†s%ÕƒÛDc-êJÒŒç>½óåb½vñœ%ï5IÂ¹™AbŞbj¹P† ,Ê`‰²Õ÷d¼à–œ÷ö«´¤OçÍóZzŒ]ZyšfÂ6ŒLÓòŒnMjCZ;tæ „!{ˆFº%I­ûìÔšV†ÑóÕ]Öb9¡	À9ğ  ¤ ŒVº    ¯!²ÇDŠ.®s€&]!4OÚò²Ãé•î®›¤(Å½ˆVƒ|t>Gş–FÛÊQ¦ÿå?^æû¿ÇI‰¦Áµ´'Jº}kuiÄ›àñnvä¨0CM6É	$*ML³12:,	WÅ… -j 3½y>¨ÉyÍXK=Û—'ˆ®7/! ·ï*·šöBA”k•ÕO‰‡!Ã™Â€Z°¶ÅcÒ(Iäğß$¦~aMØ¾TŒF°ÔşàFœ¥y¡`ãç	Î*Ë]Œ‡ ÅdtÈJ¾iU¥eÔÚˆP%”²-/öÏ{sâ?¥Šª]ØîÒ¢ô¥zVÚ€*à6Ä±¸÷ËX…æêD«·ám©f/g£B	–™xE!-`iÁ†xï„$X^¶J<âFwm€¿X¬T•,™>œ´ñÙNäİørf2JËœmTSÈ¬³¼‚û­N†~*ÏM™§Îú²Ë_ÔÙ;Îba^å¤‰²‡”ÎVİ2hN3!qxà %C”	œ¸  — ˆVÒ    ¯!5®ÈA‘b°eüŠ¼»©0ÁBP´XôBSD±‘•^xtŒ¯‘\YûTc®¨è­oê)<ÄÌII=^Öš€»øş.dÆ4ğƒÖzºJ@¥ìğËÛ=!)ªágå%HaªŒ)çR®:£
kõ"$Û×…€îÖ§BM­>ü%±Å6DU¢¢bt²/–•İ²ñ>¤¬§.ÑˆO*e!zìË$Ó’S–Ò+À®H[Téq<0¶ÑZ`‚ÕH®Âw¥M®ÅAŒ‡ª¼‡_)µÒˆD\Ø°Wpñğ"~äô‹T=(ÛthªoIRÙqÿÅs_9œ°?ÑåPŸ•ª×…ğ??ÇÇA€+’´;”éœ¤É3VYM˜šôí¡óe¦—»ëÙ}rWrØ#¹°fJ`@€¬[OùÜıÜ|î¿ ´Lm×WnØõ¤’ÓãÃb8´†më­
iU,A³/‚­®Úu‡œûMV€Õéã#%mf*,ÈS:E‡*uW€  “ Vé    ¯!5®Šâd ˆ‚À¸¨ãæÄ^]!…*H°~|•áõ†ïÂ-'|g(šÉıÿÄi\Ğ&Å.DŞ·É,ü¢KõêÍ„Íî<’ÔN­ÕÓ÷6a¾Î3ÌÓ¨£#ÜÈĞuÖÅ	èwJëÙ4‹Z	 =
¶¨3B	Öaîƒ½lìµâ¹ô,(Õ˜>O3
#Ú¯Y|?P²ò^%ÄZ˜ªıÙ–›øGYĞªğ¦[IÛK§ÑUiH™fOa)œ…gÅf'‘ÌpTÂ¢u×+%
,LÍ)ú/‡JPUI@q}6Á¢ƒ)û¿]–N7Zäj3ñ:yjPŸÕ^4;iv#ÑŒó×êœg¼{¼é6ÖZLşËBèºù#	Âbnq¨Ø¹W4ZõÃaEuO!Ì ëLÀÀ ˆ£ùtTb05àŒôZMU©¨yµ	3FkĞâÔìzâUbè®ŒEnƒnxXµõ#díJşwGJ7½ËN÷ÂYgÀ9PÌÍBÆ¦åÊ‹ÊPp  ™ W     ¯!M¢ÌC
ÈWQX]*¨P„µ¬#ä_ÈGsˆGçÖØw+£ëZÖ¤>ıÛ¾n«’şÜö14r¹ò7]€¼vPÈ ²ÁJkÃZÏ»pË|ãe™ÿQÛ=ÓÓjû¬r²@Ÿ‚“W"¨ èŸDÄ“&¨ì‹ í‘Üy0HÍQho0ƒn¯zí,b+ÈdÆ~ì	{5øBa4P¿µ˜‚ğ¼ÖÒ‘‹¹Ó%OiŸ@ZrfFÇìd‰Ô¤‘œ¥èºEŠÖm?¤KH¬µQXT,+.Y–ª¸åhJe/
Œ³X&ãÅ/õGÜ5Òª¬>Hè†¾0>cºbş~›$¢ˆ®Z'ûo¥ªƒÙñ™g¶CF¡×V†F ñL‡GS­]ı•A±C )²±«T¤@2Äx½´¨ê8­:gwº§ò¾(5²ÉìZ4
r+¹ªÚcjÂËÊx:ììmåÛ†‚q²¶ªèA¡
'ÄÙ(ÿ€eŠ›.#|{‡|õL^lY¼"Àp  ˜ ”W    ¯!]’˜ÇE
Ú3¬ÈË(‹ ²49é½äÿñ|s#£]|£ÓzåF‡½oÖ7ªûßsœ¾²¨µÍòt²ÏE=·_5ÉRÿ¿)Á	/+BkNíØF­‡¨çœ)ÌÀd¡U‚ŞşĞ’"ŸŒGº |K¢0•ª
¥m‡™®O¶÷rÇ,Ø÷–â+)lºµØ…-Ù*:§“rkRº•+áZú›a‚Õ”G©–7k¤`ŒcIãØ¶­¼ÑS*–>î¯¾tejæ¥¶²‘"À2¨ã<oÚ«¬³w‰J/ @Ÿ€³|hY<Ï‰ôM‡*$ÇZtòæOúïR)Ü¤FæipC
„W÷;ğ ô¯ÜİDúÍøa=WYL–ÔÙ•wr£B²êğÓ	|š	¤ÓS.ØzSÜU—Y‘ìŞ¾Êıƒ1 /îÓ¹ØêÀ; ÖğØPÆ ¸Ú§ÁUgÃ!ë¬óébĞ¢ƒ¶üİµD€aµ¯IZù7pIZ÷¸B†§0]Â&ÿ>/õ–3™˜´•3 Ş  Ÿ —W/    ¯!5Á”E@‹7—iÂ…äÊS"‘èÙ<˜œF:åĞñ57šÇİì~-5Ã'¹ÆqĞ)yŸ`Zn+ HœJËÍP§F2’DQˆ	·ª«.ÇŒW.¥phA~r$u¨âIÄXFïyœ—Ï”¯  )a,&³S4£éÜkøôå ³˜#è’³ûéCÙÙOt¨îd×Pªòª…£+G•Çè¡G	V)À¼Ì*öŸÊŒ–Í"+—œêõÄ–S[(Œ•†mÉ,Í”•fL^P„è»D{‡ƒpô~şÒ]ïÈaPÎÅr[H;,ˆ\£³/+îØî)¦ä>ûĞUØ‚¹*Ó*ûÿÒ¢R*G ¥iöõJ^Œä!¾£9§v˜‹ˆñÈŠ“´Sµƒ@	…œ'ŒR,R9Õ`›¨˜½{t˜ªÜ gñü4$	/ 	”vãØ^F³½—Ã%¿Šf-8ñ§YÚ#dœi¤…0A2°Jtª\Ùb•e©6©xéˆMZ(“m=?ë´v¥[Á€M«Ìà  ¢ ˜WF    ¯!MÉDH{×™[*Ú(ÅÇšH’qsıDÊÇ¹Ÿ‘ÆSùÍ7ğùúì#n÷¢°õ&†f1_ØHx‹kNr¬	ihL´Z¨ˆ{Ğj<£5´0É]UšİT- d?Ğ&…»46õÉ©Óg¨âóìo˜>«£„)${.Ö®ù[Xÿ‹.ˆYvv ¦	ş¯•€×dÿWQæˆ¿H;e¹¸)66øÂè<óœé+5AŒŠ‹úÔ•mQ"˜Br½(VÚ¨¬ÅXÕÕq¶…(,S1
BXğ™cØ3dÅ–ŸÛle<MÓ[ÌYîYÈ\‚Õ)TJM¿Ÿ~qª?azTmü¤•?aJ9ÆV’ğŠàpGöfı°Í ‰/Ï(Üâ¹Ö”4èV[©Å&B#Ú8b„h2…™3¢8‘ FHŠ€:Îı
‚¢*¤’¡kÄ®ò.·†tİ	‚¡¾•W}¹©ÖíàM:J+_x0ßÇtoÒ?‚6eŞKØï÷!®jVíÏøërí€IÆ¶­!@¬å(ÅÀ  £ W]    ¯!5ªÈD1¦è](]J H.OI>ÓĞøüfNşè@âçèû£äã¡ûÛ]5pºŸ×k²íºÍ~—|¾y7ç\QaÜRºU	¿ÆËH!\b2QÃ 7ºŒR}Ac‚6ø÷ê—)Ú!èğ±§·<âÿNytªmºo°ÔK‹îÄMÊ=Ú˜Öf
ÎğÙÆ-âúÔÍ»Ô‰t•ÙVÙÂ%TEijŒÑBì”FWé™V$S®Ş#‰6
h@´hÛÈÅ‹F—‘]l² (6
Ö{!ÊZ¡UUP`9˜ùo>ígÚ}¯=dT¹ë×"Nh‡ÿıîwÉq‹ÛwìY™¦°~Ì}úËDª¾],
š/m	FŠ©ÿg§]É^ËgÇmc#óª1 ¾Æzw0‚ ¸à:=>›ı‚+k‚‘*ÍT…¬µĞzÑôLbfs£&±ÍĞWªí{àö%S&¯¯›”vJÚ¶v¶-!ÅÉ¶1K+5i¡Ç)ÎTŒ`%ÛN,v½ˆ¸(Pp  › ”Wt    ¯!MªŒÈA0‚ÅÁUC„¡T¬Á,<ğ{gì|;×i]±Ãj½4#àüqèõ¶zÇ#Ötë9ß˜ÆG1î×á6I_krâº©¢™ëåAóªÿµüïÍè%f«¸ò˜ÀuYb<¨ f‡¶Q•øÑPÑØÚş¨âÜâ•¸”B¢		%ÙYC1µšr0vn}êš§kv³)îu©¬eğByP¥aÌdêôî­´R](v¼SßnPaŞ¯­l„<aÅR‹lñŠ[k1,AÜp9˜½Ë.•T¢‚èht*œ¤Ğš»®´ziqüÈjıÿ¼eQÛÂ×—Kˆ-æ½‹ÎÔİZ#oY}Vú¨dÉÌÜ…â¾fAu)(½ŒğŒÑdr”¿bv[aòóöwàä'rşÏß×OlægAC¹-—3Ù+y{Õù O^–"³y+b¿r,)R¬J´aÕ§Ì¯šèFb5…¤€‡]ÔÎS}¤‡>Ê,Õh-*Èk¸²VRx·ıyû±’À1Êt, à  Ÿ W‹    ¯!e²†ÉBĞ"ÅêáÈT]”¢ Eƒ¼d!İ´z½èÇ$×ß6Íôo¸ï}Q"²*b¼=væáš*‚Áe• T8º)Ñİ-A0
WËJÎ´z•ÊÈ¦Ø–ï	ç‡¿8bš»@V²7F§oq/-³í—o*«>íëvš§3Õß¸§	X`jƒ¸W)¡ˆæÖ¶ÁïuÃ²¡bŞ¹{|(5$ë
ˆ §	Ìùô„ŠîôÖ´uØ¡‚Ì‰74%ÂÎNÓ›Vê»)mtFZ\*¤ÚªËmu‚ˆÅĞĞn¿Õ#é¬Ñ©¬l|nü–ølÓ·¼ÌKËÄz>$¿A~´àÄÅ0ã'…”²œoû(L”_\„ÿò
A.£…ø¹ïŒ–7Ùa˜«ÑJ  ‘Ûv›ĞX.«¨ØÎ×JĞN£h1ëŠ¼±3|"ÀÜ7›åL1×fÓfNs¢–—ê@®ßå¥]Å`ó[İ¬)9¢Œ’åİkÆM6 Z‚"ÈÈÃŸßp±|¡zšÒ°  ˜ ‚W£    ¯!-¹–B0‘Ïê!È¼ºk¥ŠHAïüg,ïÏ†í{)ÒªÂş6«µKš|K(Zâç\)Ò¶µKiiŒhpJf¯ŠeM‘Ö®,B[Z1¤d½Ş¶´¦Lp¡()O	šŠà¥ÁL¯óN
íww4·vâÔ\ÿT¢ËJäÒÚO1+Õ”ƒºŸJUú3§·Â…˜£šW¸–á)Egˆ®×:p…á{-š”§ì².¡Ô¹+Sme¡…FG‹û˜V¦ü]-hÁ… p!<bÀ¦…·ƒ·,øïÏö\î]¹ ZÄ<
“nî­·D5:E…¦ÑCñ¦‚È£D À®kpŒgş•–åC ª§³İÆª„o¢h@cW(º§RuİÉUˆ7ÙWÆãc6“Iyv/òr=°Mw$ydøßÜOÎ¶÷Ş¯MÒ‡j$½²µ{¤&MnÍáQš²·;–"Ï¨ÓÊ~«€kë7»=´€Šdû
ˆ¸   ‹Wº    ¯!5ªŠÇCœ.•cJTİ¦1AbRànó&%»n}}›/½KhÍs`æ-ÓÉ»ãLİ'à{œ%.ûÀqÈÕ-¬PÛÎQL`X n9ç{»”¸­EUµÛÛ5œ®ŒbÈ¼”É“á”.nŞÍ@3É?’É†i´aºáí×0\+:â'KàgÖl¸+Êm›Y­ÒvéøõŒen<hÿWŸEÊ0lû)]j\è±Ê¹hı®éŠ•*¥1áº	Ûí`ë!^–õÑIHòZ6¨µQY(qiœ8½ÑnC4JV)TµRà¤utşˆNH2ıêˆ\W™ÿ‰‰Ã”ã;÷`c]ğú®‹i)Ö%ëØ.sŠ¥+òa½¤6¢Û¬Îwéb®nŠªÛ‰ÓJï‘î4=®ŠiB#ğ¼mºîgTÜIÄUwyÔ¢[Á$iJAŒ,×5JÚ¯ÕÖ”ªnÉ)É~Ì·{¤UPtİ{òls¹bxí|á¿P¦'ÒXd÷è©ˆNø À  – ŒWÑ    ¯!ÁĞ@ RÛ`l„!ŒZÈ¬P˜µUhÊªX8ó<÷Ğq½@ÿsëÌÃpÛ_ÏïnÒÍQ†–´ÜÃøßoÒüoMlG‡îD[H–óàNœ*€%ª”’{>¹Ê7M«ßÿ¿ß-Š&}3)ïU ;3–Ü¼Ë
oP•æŠê&«ê=Áÿß5±†©ÛY°R®³lmöó´|NWÖXgêúÌš7V°]ª¢8ë"O¼ëxİª¸–†i5M§fİ²ÁM´„#j£î£R-èµ6‹¥TÊB¢ÕA°Ğl‚ô[ÊPÊPi€ÜÏÎø]“?İ/æˆdck­Kü—´_=ëÍmæ°ÖÚ²’Uhâóq™Ä[#¿.¬Xmò˜&Á-PKöøİd•-ÙŸIx( ¯¾}BÊµˆ…›,óá )‚FÑz€½•¼0÷°Åä¸ã‡øØÊî–SÂ¢Ğ”»T¾€FÁŠª d²RÃ´„¶²ÔóÒX-]wYRŒÉ4.t”N  — •Wè    ¯!L¯ùÂ ÓÛ(‚	
,T;é½K­R³m9ºTU®”ĞL6u“»ëZšzÜ°ÅÕ¦N&=gÑ´ë±3Zf®$ ~Dš•ÍX÷å=õãcÀ<>
a²ò@6Ç‘d¥	Ğ‘KØ¶Ø›VxVÕ0,(¤A8)I§ã&V×èÁoŸná›¢HÅ É AW²wkìW¥¦¤Ê.	)­ıÑš¸²P3ŠÇ56´ï\k½êDÎã@Òÿ–*3½éG¦G$ÓX¯<€(¦Â½Ş-G"´BÜæß{^·˜Š5JívUà@LrMÊ”öØ†d!ŠÑÎºÊİÃhÙC[$Şhà´@qK }hÖãXc‰”*zş ï`§¤Wb§Ûööz‹$T:ÛFQÁ9»—èWÆÓ–kPD8Y€¿ZLÍ%#½Ø@$;ª–ˆ°‰a…rİUÊ¾ß¤ÇĞ­>J˜úâéWêpåŒ1(÷¤>²à9“\¼ÏBY‘31»‘’(ó,c¾Ã‘ÄŸ)yÓ…a—„‰dx    X     ¯!@Õéä R[Ø®‰ˆƒ“åÕüÆ{’U±&T JĞ/Ùı¹ûMÑÍz ûBì+®#²1dÂæyõ9µĞ•Ø(âH¿`DÉ8Å¤5w47½ĞX.÷x1„]ÿ¾´) ‡_‡·E€ìw)Q´vô^Ä}¹â”­DAĞ!`"õ
çí˜@ı—1×»w¿şlE‚¶Gå0±˜s£Gd<Ks¯K;­½2”‚:t’}¹şLU™tW…$ÇLV#\R¼˜na¥c6‚µjÍ&xóŞÅ0+è²7 +mŒD8„$AÕÅiò´UÂVÊ(š€¸zN",V­aWZĞĞØÊ@£ö´R]Ñ$œ¡¥bÂ~À@<¾ÿlÔÕÖ£ÏµSşë‚ª_µD£õ&Õbº?j1¼¢]}Tù­ûmnÙÎJïÉš !$˜	É©¬Ò=4@ßoø]Ãê‘R²\År}8MQÃ:Øüğ‡2–&üâå©„'U¹ThQ(°XßuudXĞ¿  ™ ”X    ¯!
FúùŞ UZ¨°´‚,V®HªŸ.‘¬ªã9ó›çQR–] SóƒÎ7åBĞ7‰K³‰7˜H-²äOIïı{9¸­+'á8~ª 
#œI!9åL·ŠÊ ›A¸¸)Hy€´Š[_-¢EO¸&vv[ó6PD&|„XãÂJ&LÁã)I•=â¯áãVÉ½¥kjf{>öyğ¬Ê*Ê¤İBQ†¡%dCWÛmha+ÖjÚ£|}5áQLğWj×QŠtU9Iµ[Q°ûFë(÷8:‡º¶Ÿï¤³@X‡{Ú¢ÄB0È@‚%[×JÀˆŒUhXİ,V|nŸ`_Sˆ¼;ê9bÍIŸ:‚úw[5V¼áÙîLwFÀp2EèŠ†£–#3Ÿqòaf#u¨dPYjò@‚ÏV÷­ßP›@Š‚ê¹6?æè¢IĞ¶+£7í\¸êwªcvĞî<©šT+]‚Ô¢Ú‘§*¡5,ñ†æÕùS¶Øàˆ%FÒéÑ9AÀ  Ÿ ’X.    ¯!måYíS[XĞV"V´Nkª	™ÂvºË-T¹ ?œø²§_?/Ø¢3LÃæzˆÖ5i`Óîº:@ã£Õh¥ŞR,‘y+€–ãmµ Şšü+~´$ R;œà0Eİv-)é­²ˆjCh0
”$ÂM‡¾Y¢ä_29­7ËNDÙ5dMV­GwVr9½ˆ`ÌÏo^ç"ê«uçºœ¹·Oš—ß¬Q¼õ©j_„W¸•yÚGê-.½aÄ¤Q(–0%jr»ßMd¦2,"XZè®ô€Fõ…¬p.ÿj˜-f¶².Ğõdò 9ç:5
»—yå|bäA^%³–Š	¢%N>õUp9æh‘-§bˆº ç»nNB7w)ÔÊƒ9‰„ñœî!ªåº’œŠ§}TëŸ½P2ÖŸ?d8êÔ"0ºÑ3Wb}ãØŠe:@Ÿ6-0©¶ÀÔ¢ÑnGd‡‚T]
<ËËö‡z%1È¥ŸYVpc~   XE    ¯!
ÉxûTÙèĞ¶"VËé¯ãKß·xö­e5áÒ»ÒªU¨5pNéyŠ&âúùË¯şI¿­ökÚı8¿Z0Úı¤†^¤à9‹TdX‘E%8«f¬gN_„!8eçæµTÒIIóŒå)Ão‡J‰-RŞb	u¼¢ H @`‘E/¢¹‰™$zaP¸‘úo†$ê{¦è.›ÓÖÆ¬¬ÆwP®VtŞ”#ùoŸhŒ¸÷~Ä)8è‘€[´M´’…ÕÙ3É­Ú¥®ñÌÌRí NP&ãÊ .ß(©­T6BFƒ‡FªJ]¬ /		 ZÔ-˜Çú¶4r:–µü¨3†Ë÷Õ€>£	ô-n:ºüt)•RÈÕN1›)3SCŸ£÷`K!úâI/ cµãtØC% 4Ä1
Á| pZ*0/ãW…Y§1• ©#Í5Éªÿ£[Dê ¸0¬&ß¾î·bœ8
5§ËM1e•Q(”íŸ+aÚ—±©#Q´.»£€  ˜ •X\    ¯!
‹`øÎS\ lHB„Š€ œµÛÍVî™tC@n®§åÂ:f´w{CùõF_ğÙ˜¶ß@ò±­^ş^,Yl×;Ú„¼i	p"Çb[g”³küùÇñ‡xcoDÒa¹zàTİxÌz‘
ît œ}h£Ùë‰YÔu< zí3Q'ç¥¦6¹!ÌŠ{Ú`>“2#OÛA´)M$]©ƒØ8œu?6]}s¢yœİI§X¸B%›fV+R½ÓG¯Î2ğ·éKeøÌ)ŞÒ•ë\‹C5–ƒ; ZøØêíP“#JÏš’*€¨4Ì`Ğj’Y‘ó›,Ú<3‘·+¢¸İÖ¸JÁ¹½õSDö
h;’y}ãñÃXQª¯¦ùÂœdmï»7J†Œ´÷Ì]ÌiğöøáDO}®€$6ÏRL†w÷³3µÿ
ÚW”EËSÁöç›oªEò„¤É[(Íp!„%¸V¥=±é5ÿ¯¶™İşdÔ+-8Ù½ºfÓEŒØø    –Xt    ¯!‰¤xÌSZ)l”(­T€h¦¾_ƒª¥5`>çØŸì‹·…h4añœ“ 6sê	òïèS¢†/Áá²â Ÿ²†_k5nÊ„VåYá02+:MAÆlÉ3}vùİôòH§^½ W³úíów`/s:¸ñG1v4 ;i’G\˜)ƒÁiê›=•Rº‚k[cø7Â	â90·]•¶Í¸,3•
UZ¹;ã¸™IÄ/}¤q¬*S»$ÖWnšëÌ¼£©Dá	ÙeP­e¦ÄA±HsOkvER……Š.4ñ-U†U8ÊJœ°ı³Ô«	àU‰19|t
õaÊª†Ş¬Êvg„aÂ1+ÊE„S¥³ÿßxHõzr¥ŞÖ³¬x×ˆsÙSO‰Ş†7úâ—Jü·ì„½—¹
"vŒ÷K7İ…À*ÆJ’C˜¥§ÓNùÎ¬| 1Ò½`.Ş,¡øn)4îúLªPbïhId ¬ùîÓ’¨-¬¢à  ¡ ”X‹    ¯! ØLS[è°E@±LÖÖj¶Ó‹­ÅíJ<€³Ä˜ÏÅ~-rÑl+|çÅ§ÚÌqã´‰Ú0ôŞ%s¹£‚PbY<ßËÍÉÃôÉçº’OÌçnÁ7p*%)†ƒñ‰ƒÀ¨½Ó9Ê¡W4•%Ğ/™İºˆ¾sU:GÓòº¥oç8Ë~2†æ#9u{/ÔrLÚ£WªÊ¯£8²„$«â²®¹Ï¿l<Xf;®V;­k¯jœ®–«RœKªR±Uß+WŸ¸ 3Î)¨Mo²€(p^fÆE.
m(²Ô|‡¿¾M¬[ûÿ”QÈ¾-’2Ïòñáax^Ø¹ï¾‹Tt9Ï:Q—§éIå9Õ)ä’c;¯çS
ÔÊw5N ûº 8³ÚœwV.	+	¡OYRÏ¿E’Ob1ŒËN]³*±Kã¸„ÀlÌ7x[#‹#‚}D›¿à`8Ù; ^fw{1mMÚåy”¤ÊFDuÊÉÔL¾@U
Â«	fà  Ÿ X¢    ¯!’ ˜RÚ¨¬g`s«R»SŒWUáñmLêÕ¶¤º›MÍm›2 Û¬mš*`4Ô¨İ‰E†¿#Ç­ƒbã€­ÿZ,0yb¿ş(7ygmaHûäpöjY¡[ü£1¯¦²¹å­9ü>×Z3Í.ØàÜúpGÃöÚÉ?¾©ËoìğÓYE˜<—^ÿæ¯/û¼ÊB‹–~Ÿ/w µÖ‚2Á)0å”zÌR+!TË–à”i9™®Jvš\JGTT´XU´ÓÛäÌS“ƒE·vJ‘†d\t•‡kDÖÿC{qóöê„ú¶ÓÎSßÅvÔúNŞ}±F˜Ã	qó-QròÊTf0©jí ^Ÿ(sµ#[ëû‚#,#Ü²_Jò©9°¡ï™ÀX¿x.@m¿m\àF†âMÔ€¯8şß”òGôßSòßé¹ÚÒS#®Ï²à²Ûˆ—Ú‹†Ô¶a•°&„µU×	&3R°çÒ>À±uÚ’øÅsŞ;Bò´l%‚üøŠœ  › šX¹    ¯!š È QÛàÒFTUYtC-¾‘Ë…U²lêÁ¬q¯6q‡dÛã†º–FœÉä«Uføæs™„°ò6 ;£TNVJ|‹—†ì-s¸ø$ÂxÁ3ñ	!s—„€ëï˜MÜ3p#b]|ªÊ­ĞkŞ¯—üOÑ82Oµè½»!0÷C$#îA& Ÿ~esgå>Bæ*ˆÌÂ«^¢âiD{ÓzåÂ
Æ7ßUúò”´W_u0 UÈsFhM{zhDVZFÏÂ¶Õ®î×²¨˜‚(T§·² ,D(œ!Üé˜Ìêã´P]€ŞÇAÁ®+…¹V¸+®3…1ÍíUÏt¶/—q‰¹—Y.zqYG¾\jh‰’ôÆ¸6¾D9}Ø„>ŞÚ™$–e¶»ÀÇ±W€øœ8•¹ô×Ø-Xì¤pÊØt‚Gf/¬H‚™UîbaucÏ¤Ì¸{Ó
ğhVòÿÁÕ×\ég4iGú¼ˆxøXÕFlDëØ1ÎYÛ -À¼R“2Ï¶ğ“/”  ¥ ”XĞ    ¯!º <R[ä°7VoÇÒ›ß“t;òzòÄUá3.ÀÍ®ÜÛ™ëeHƒ-M\yÑƒ/“AëêŠĞ¸áÓœÓùúËa¡°ù…&0thWò¯ÒÌµ¯—üwDİ WK¥Ú¶Ÿ`DË4›å¨Ğ˜’e/·šõ9¶ü ÅeÁ33¼Ük£°gK^ß†ÑGÀ
MÃ)àu4»°¿l+~SRÌH1‡ºî7&9I¿ÁwüUzåç‹©í°`Óa$m¬N@½=}Øm©.Ò#íª3JÑ–º.¬]"šÇK°Ñ`Š„Œ!ƒJº¼*¥"F7 ©Æ…-áNãÕğDš!2O2OS·ğ?ÿÜYsÈ*ßuƒlki¦ÚzNôÂki”ØmM  ÷˜tA=OQö@ÜŠÌõö\qµŞÌ¸`[&dˆc"QÀ&šÍŸ"mUµçèG:Äö•İ®şÑ}Kïïéôbì4µ]Íì»™œÜ;Ø‚ˆ 0$@+MóT×ç‰ªÛ–…Wïâ©•‹­œ¨²k  Ÿ ™Xè    ¯!6  ~S[dì',V5ßÛZMïÈ¥e/K:öÛ™¦â¢èX-ZĞémÀF3#~EMÎ§ÏmÿÍèŸèÿ7qÀlèõ°Z¦=W6;W}Ê÷ø)Çãü”‹}XGbÍ-Kç¼q­oK¦S&4qb¦â.Û@2KÙN6fı…j‰¢¯} ç\¥fÜYp”ÓñÊPî™?"WÅø}½í×”„Ú§?Ï—Jm5³P„)io³ì•‚—¬½ÙR·HØìÉUeşË†\fQ¡Q%ZVŠc ÄC  U CB&ªÁW¤˜Ïô
„Ìš>2x8¿ÑêŸĞ6ë\Œ£j:Mº5–wa’Û¢tìa¼å²Q ƒªrñÁÌ.Ü† è‹z$ğ0•ŸU‰S †:'ˆÉ€òÒ{¾\–ĞºêbÒQ>Û*)bl1‚@;²Hò‚;İš¦£Ÿj@‡-i9Ÿêz´Ÿ„8(s¸W3¾ƒ*“K&™-…Z~¥¤JmTJä¨„‚0ºèÇI¸  ¤ ŸXÿ    ¯!v€’ |SÛ)(‚„u—$ m( âø.ÆÌY–ÂBø0¶,Ò°bMh>å¤/:$–Êè/%MnÛ»¯eïd¬ ¬OäñØS@’hi"—x ™FXH”}êŸ‰RÆêC.Flc¸gOu¢
ÜrÕUÆªãò¦£ƒZ\%÷fD›´é—ºU%hrÑtùÑı½%!W	›Øz;ÕğÙjV¹U5ç‹jY5O³|â7¥Ñud¦*Ñr9dŒ©ÔKÓHÃ4iZ¨ÉBF	ëÀ^…£”Qk¢A6L*]çW÷lën€¢‡ ‰ªu÷û¾ ˜WyH¥269ß›:™VÊV²;Kò>¹q²gqüD{âFã5HS’“)d«hNá°>¸F#j±TËo)UĞ.M):¿ŸğıY®vYµS•JpÕÁ7Üa ª;¤t¬ÀI¼ˆ€ûœ:8Y°°¦$`&zˆÉ/Ã3¨r®v*Uû™lÊé
-_hQXÜ¢w¥Êu Hºu ^‹ZÀ  ª ‘Y    ¯!ò¡GıUÛ Ô("	ˆƒ5®œgW%TÒ÷¸¼RŒ ”Ğ	—dwÅöæÍ(c×µxâê£Ù‹›†6ò,‰81›ŠÇ+áıoÅø¬Ft­l©E$GJ4Øe°<Cñœ²¤-ƒ:Qe„Àr'}GWéP$~‹!­FYN§æÎ?İbW¸™>b-„gøŠ§Ç«óWh[BPgeÆMyBÃ_3Œfë})ªôÀUû*‡9¯®g7÷“õ<1÷a5üÒŠjÔŒáíö=¿]Âvk!c&Í;ÊüTZ2BzÛªwÄ 4’ÑˆIme˜˜J$„"‚“¿7UZªŠT¶Ò‚O1Åœ>¯Ö¸b‰­#†y¬°i>µ5õ§Ypêe{ô¥7k©GåO$»—0*òöÕÂIŒå%É´óĞu»‘²¼7_®¯ ¤VªÇˆÔ›}şÓğÉqõÂĞ W¯Úµw$ö(˜€0¯CòSYcT	Ê*Hêt}Y/İ÷v£{ÍĞ‚bñp  œ —Y-    ¯!–¡’C|R[))(€¢ËäcW™U Ù	;·¹jÒ”:Véxòï™“,Áv\šm@UÄ"¿Pª¼„1›™Iv´»ù6œş¼ä&¦“0 ™Í“¿›UrO ${ÊYæ¼ºéª`‹×SN|«´¢5¼_AÅĞMi[¢°•LejAX·Tü”Üš¦Y6Ã°=“¬ ,_& 5ÆÆ&†Ã#Ô`M?¹ê4½¦ñ€gD
-¥Ôê‚ãÎÿ^Ãã—[ßÄìÃnú'XA§W
<¦åæ­]³$ãbrIK«Ø17 µœÊÔÛ`¬xÁA˜Á
²"ôQPÍW=Q” ÈÏ¥ú¾rÍSD J¹ª¬˜7!ƒQÑKh±ÑstV ´ ïâ|Ù”#T×åe’M¢ê\YS\MŠS%ıö2X@Ô»Æ¸é“QtRg! ª…n…Ìì×ez1˜sØ¬o.W­»ôuÍ ŠT¦ ÙõŠÀ•ù‰§çiY»ÂÔ¹€­ï¾>XSoñ^mz—€ ½0¿¡ÛöİeiÀ  ¢ “YE    ¯!³€’WüSÛ ô‰Œ„€ÌŒ»Î#‘Œ±ÆòUT <şEh‹æ'ì	5*Bkwê–ûyîŒ–FàRˆ©@‰Èr
¨ĞWL¯QHEõñi•)9«ŒÀ÷nÀO@0á.ëú`9ğİªå-AÆ.‰Ğ@Y::ôÆ7@xfh'U4H€C/4Q¶b¦øåZM‹Ìµ•úäš’3?slNÈ–;¹ir‘®A…"õ½+;¢À¿huw¼ôˆôŠŠh£âis7­ÁY g±º4ŒZexm­¯JJ±WÄHn‘=RP­«N‹ÚJK\!‰#a X&P8ˆñ×+î¦–`A” ‘v¿ºA{[G(ğÊiwücœšŸM&Ÿ)ò	€Q%ªr-&®Â£XçÙ½	
ƒ^ÄH„Œ~½UŒ¨pÚkQ¹>—·vÚz±\ØuwSbÙğıç›©„DivjB‰ˆ©öv@[x'»û(¨â ƒ<TáÕÆ¹ƒ·ğ«Áö_{æÅb˜ 	Ü®•ò,À   •Y\    ¯!´¡u×üS[¨Ğ+
+jÄºÔj0£ÊÊ¨Æ:LèKwQÜmËc<G ºWb¥IGEÒ–sYä“ªËİÿkš˜!(%M^T8ï5@¼’qˆnp „œOIîC¼7”ğDt®Sæ%Õ¾àòQ‡×ƒj¸š’“S$‰2\8!9Ï¨‘*H- á€à÷ÁXB$\¢I(ZéIÆïÄrnÛCİÒªv¨®vmŸY·¿O¹jé.vúcŞBWÖ½ûûv<ëš³Üµem„Gy°R§C\çíCœ/à#(ö¤©{uˆ>ÉÁ
€UÚ©		„!` €("{)ÃŠª†º*• § )9êÔÑ¬5á×§¾˜ş«Äkµ®—I¦!9¬½¶×”èÍ/Y'Îêr&™©Êr0Š^‰°Ø'é8È^¯ärÀ†5w¬Şïm‹K‰ES˜Š&ÛÃ£1¤O†6—‡.h¬Ä"»Wğ‚VXwºÈ‘P
è{Fæ©÷-†Ø  à    “Ys    ¯!°ö¢OüSÛàv(B„+L[¿‹2ªó«ª<\ºR•UD£È<Ë@üi‰Ÿ» Hœ2lìõ£ñm|ÃÏœ8ò“UÇÈ¨Sµ2/•¡Ù3l(^¯öŸÛĞñÜ}»G²QŞP»¬vï-¼Z:ÎÉ(£Hƒ\Á„YOX€},ˆŒxâ$£(Å`2o"Ë¼4ÖÑ
-™ÆÍ#	£=0úP3Êõış÷øV§XYÍòÁ€V!DlFWƒNì½óš™Ú IY0zÃ·§³Ò¦ºj^Ø¦N¼”ªœã<İ:ø$ãrÕ÷G*79^èş@Uq`€ ¤²QØğ2ÂÂ ° %Fê%„"ª€º~ğŞ©»;M…Ğ¤Ÿ“„äQğ,ıŸÌµ†wD„ˆ©PÇ„†¨aÎ~.ÆgOI¶ığ©nQBa”“"ÍN1³mêØ½††_8 Á>7t8‘ 1†”¾kø€ŸÈ9Ù¦; ŠÜ¶ü½4æ5¶ëº’cr²5à†tB,)%êrº	«’p   †YŠ    ¯!¸üSÚ¨Œ˜(´‚¬Œ4ÄÊ­(ª6r9ßvA2¸<·`Ù1çe
îï=æª«şôPª¦lÑŠ¹•’ïY(é0ÁãlÈÙ©I/[ø˜[íÖ³Si<<Ó÷{zzâvˆ*­Ccv™
¾á(¸!%°ÔIB²E@“­‚c2¢P,;fë?ô4Läqsµ42…Y=OĞ¾Ëî¯ZùzgzjV&—)ZÆ|÷ÕVşç£ hÎ+ÂËà^ÊÅÃİ;:f*«’”‹¹ÇeÑ¦•ºµs…ÉÑÚ¨°F†‚¢bƒÇtÊùé©ôTÀ*qK;ù§ËaU˜×:“@ûà¹GWãÔ×œE¶Ë8˜ÔE/g’ø‚õ”¡Vš^¬@`änÑcê–»¬l@Ê¦7ê//LÀ§¢ìF|7şŞIß£´X¹Ä€ÄExÖ*ø`TiÕ%3 (K]BÈ€ék¸™§ÁLë<9{\y÷2Mávd™ÿêÍÀ  ‘ ˆY¡    ¯! üOÚ ò&JR,Îu¸UZ)jËª¢•” P“¬xÇˆÎà³‘ê±¤‹¼µû7á–6£èQØ£Éæu8VÇ×ï<«Ğ3Q'á³ÂI/&¡«;L1gäÚC$«w+¿{ºuµ6^•ÌU÷sÆ³¶ù2£İéòW$(˜iq2‚ê27¬±İh#Œ÷h¤ÀœÔ/©DUi•}Œuø§›êfxıÕ=­1\¦“«j^s¿é®ô¥àÌm)¶©l¥®¢Ï’^ó@Yâ”)p”nMAo„±‚@@'­n®ï–§ˆºÂ—JóUD‹–4ÈÚ@mşVGğpO3HÃ]Ş7P@lñ{pBâ©f!b •qô6§pÖ¤°˜®tŠÆ£º«–ÌW“Ô[
ˆS[0Mlfq¡7P¬)¶--¥Pä0eê'TpŠ/„q¦½v:]îõìP'‡á	«É0¤ıÚÖÄ:ú:}Sƒ8Fö-SİWSm1dd9Ì& p  “ Y¹    ¯!  |SÚ©,8
(ŸVp™|šmkå{0a²à?ö7ÇÔ#ëuÌ|­1Å?)œ¢j«Î=¿w\k¿CZ6÷›ó¹»ÃAr‚¬8€ š{“È#DX÷§Ä’`ÍÎí…€RÓèB‚˜`Xê™„Ö4<¸L7±1eëpïJÈÕ†gƒw…°•€’ÒL]€ßïõJ¦K€%”ÓŸ½#‚ôŒ6DSçXÚIL©œÓ›¾¾Óİ&‰÷Œï[p£{uá%·<|¯+Ru+‹À²Fq@?	Âò•§îÀ¡µQXt2	B…A ¼æµ8íF©gzV@¶G'sPç«Şã~¡Ï¤²¢D…9,ĞŞß++¸î3_«ARnº”İğ¹ƒSŠo—•¤paÏù#Ÿ3’dC}¢‹	G}G¯9H-{]Ö¨X_£Ôó
:Öæ.´‚½¶zYéÅ®?ù1	¸ı7&"½2UÖo,-ÓÚÈµßöƒ+®{ŠÎôuÙÆ“ÑEwúkÕ)Ù-®wR\  š ŒYĞ    ¯!   üQÙi°V*˜N81xÖaïì·w3)TL@Ù–öz(]Å×~ïÚz•âåÙ²™?ñù~Cì/²¾©óBjğ2ïõN Ù—¬|€†Øš2Q,g‡RË8eÃ<Â~BFÇ…0ˆu”6* éS`ò÷Up” Ëİ?ıÿÒC€´S*)WV7™.¤ŸS
€´×&$¶ÑÛ["²RTšûq9´o·çŸá×¬Ó½xØØ½É¾G‚Sªbç3¦jˆFÓ•UNÔhlÌ¹^Ğ¬¼çÒ	«H(Hn˜ïMj¤Áœd
j÷q"­HÃ( B'~HVÎSEM¶!ú'›q½‘îèÑ•Ô¸§.š¥¿i4¤ŞLhŞ=f5± KMQNˆ_Cõ
$EFì_…£Œ—-gÀ™lé;‘\qˆ÷]iÜã™s6$¦%'²²XkóïÎYš+—s›ëÜƒyß#P°Ø‰TkË‡5¥m"ï
DircÀ  — …Yç    ¯!+  üQÙéT„C Ú)¥LÒ!ÊñM•A/ãáİ% `…šS{\¸|ÀgJá¹–×¿ZÃ3JÚ¹3D“¯¿½ÅªjÊ¨ "TÖFæNÍAhCËxJÇ¥O§ ™í3WÜÊ¡¯EÇŸ”º½¬Såˆ /±âõ.—W¹k˜t­ºòç\@pA#WY
Â”'×P$À"à†®-4ÄJBsıƒ£9ÂĞ×F÷ îL·ıS<§oü”Æ¥#J$”«Iw_…àJöÖÄ­;³7ŞV‚Ö²»¾u)-TX#D¤Aƒ†ï†/]ËlV[ ¶¶¹Øì>lñ]Rğ›‘RzÓ²q¨c÷Ä~†<Šå®9şL|™J'f_kiSÄ¬"¯
Ë…V-\IØ¦·ÍÿjÆ©”Ş_ÁY b&:ëw‚Ë<[üûñ]4Û3¢Ş¬TR¢±°Æ]±fnµôÔåEï\¥sSMĞı.å|Bü®Ä%ôèBßiÌ»oNü   'Yş    ¯!MÃLÛf‰J! m¥l£3wÄRÕf€@R©Zñ «,T6ïÍ&%V¯3›‘
‹2©İ2"Bœ\»ê\V.¹šÓaŞö"©2TJ›Ò¢… bÅÏ2ZÏµ_Hk0sôö˜ÖêoœânäXp3!ÁˆÊæ«óUÅy½¶7i&pF+MÔƒöêÎ±‚&Cê‡mù»Èœ`rşSä Õê¸ğ·¾{³ìÍ‹¿Ğ]B—z+%ŠxÑ.¸1$ím¹#ÆàhjÒ ¯mlIšüiÉ2Ûó!oN.Š#~´®E÷;Æ0Ş˜fcb6úB3WUë:¶/<“†­=Òíì+FŸM•XI’w`Õ‘¦6-CÛëÇ›—
ÎQÀ"G„,ÒU9†ŠÒˆS•l)J"^Û$dİ*QuÓ06k†H€Šªº®AW  Ú³Š˜kmÚ!Q`ß› /%}yvŠ»k<\³G:tÏ”Ipl‘d§Lõ~{±à¥AX‘òš6Õ‘m3ÃØÄj_‘‚Š•ï¬.	ÃÏœ
~÷¶›‰ŸŸg£§´Ö¬S]ª±’¡Ok.4r˜öFZ¤pW´XqÁ‰8´ÚÇá*‘íËÈRwĞ'W|Ù¼ç˜”Y,@v_ìÜ;˜]c{½»v:M¡4_‹“‡í«‘˜¤tµSº¬zŸ\<ØØaóÅô·˜¦(¯º™`j¶Ù¦“ùïó(ßÛxçñä¨p  2 ›Z    ¯!{}’•ae"k’jE7Ù{ÓXÚ©*öÒÉpÇµËÕÊß©£pÕ~v·»ı-ß:İcøèÅ­Ô‡<Ä[O8Ä²Z^†°´DhkVKëÎêW¦dÂya»(ÃE¶]ôJû^™»Ï9Ù­;Ÿ M{Zê	‚¥Íi€àjò§¤ˆõÚyÁDRo9&µT˜@Ğ	‹Ö1é¸¬óXiFYdÇKúæ˜Ø€­kJŞÑ©u«µ/™racCehÂŒ2¤eb” ©³ÒHX‘•}âë[LD–¶„/tHu¹·ä6_Ä3‘Î£ƒÄ¼=chÒX¾Í¦Áç0/Ñ»ne•~ı K Ñ¾¬wpŠz]>‘*±ş·áuƒ*ìuĞTÕO)4ÔˆL¸S™šuî11«Â×:.’¦­SMrLOjksô†D‰ªökrŒuĞÄHÈ–ÓÍÒ	Ì+ÍÆÔ?e TĞÅPÕ¥MWR59Fûê
ı@Bvp6øX"BR2UYSeâ)‚¢v+[–aÈ¥ø  ¦ Z-    ¯!%µ–ˆ ‘¼oŞ¥•† D¸]è\s[´Öğ·È<´ÒÌeMyínÌäıÃòGáyï~¬ëlèbÏY%š²—o·Â0ÀúíÆ†Åœ80µ=@c‚];7™-Uò±“Í†7òI¸•*¥ÌŸ:ßïVû™Õ‘Ù§ãŞ™1Ğ‰<­‡C6ÊÙµ˜Y¢«‚»uMŒ÷Í`¡¸R˜J§|ĞÒ—GiÁ…$ğ½Ó°°ê`Œp§–½±' {¦™„Vu*B0šR†Xªë]’„"ŠÚ†ŞŞUÛ9Üà”U(!-ªKíÎâûŸ(a2Èßj1m{\ûº0á˜±µÖûÖÒŸ£Šédµñ„:œEn$Ïv—¿üir˜^Éó“5šàK<ÎşÎ¶i´¤ÎµßÖ¾öüæ6@	“åíC}t
æO«ó²·W_®y$¥
ë'ÕÚúT¦(@éÜëBwµåzµÃ¡%in1QEÉ’H-k§z²‡’¦'’”XÏgšæQ–À  ™ …ZD    ¯!E®ˆÈC‹¯Ÿ†¥g-ØÕ2ªPšF€“RüN%ÚÛóúñë–E1å˜ú›M„ÆŞ^¥s.˜Ä¤w·7yÖ8nI9Î=ó?åø­ë¨uóˆ³ZÑtöxÊóXÍ]Ï5©bãËÃ1PØ½CöİùÙ¼8>€Ï¡%*qé”¹‚¸7ö¶¾ğ*ÀË"rf_jMk#•ªT²³îàRÑ;Î÷TyÜfEÎ{‚J<p‹‹¤ ‹¦™¯rSr´1so
klŒ…´|¢ê¡Lk¹ íºY8dB2û‘8vFXS†t®W.ÑÚYÓ­µ†”ìhæÆ_	rû…²AÖ…ÓÕ¤„\ŠÆègLmlè?A¸Cq´ImÆÜ2†@éKB&pNŠh|Ø3ÑŞÅ£àÇ– ú0vbX]ÕMF¼ê\ø²QGYpİ»wüŠ»
'öQw(%ªdˆe`‡! qÓ4iÍ§,ÛÒûfû.,#À   †Z[    ¯!=¶ÊC
€@¬¿5JïêÍb˜ÕÌÔX„NÃùÊ,šı1 (Ú`%«{ÙYM†ƒ|ÂI÷g,ŞNg¤K5'€ÃÍÔâ–f2—ıı/%OÚµ…a-öSq¿Æ)x7D§”\â{àHŠÊ\é+Iğ®h¡å0pXEøGÊéN²ƒ§éJŞ>l=M4-È¯0§V †2«l³ƒ¶şR¼ÁCe¤‘ÒÒü‹Uk0Ü-JÌÚ‘l­$u gFÈöz[*5JJ7I(U
ê×\ôZy\œÆD ÎŠËÌPMK-¢§?SÙ¿xµd¾n÷º¿£!µW+§EP+­ò‹¶3dãALÁ9)É½Üj[/jv8Ò
Í«³I“%ğ¬+o&tt˜¹A”Ù£³|ŞËJOİ|üY[€Ãú¬öòB4¥4‚…Š¡` çeo`Š™¹q(Ë[m„W%NtD AÌj
³ËgbU‚Ñ‘(ai›*,\  ‘ “Zr    ¯!
’   SYèö#!, ÂV]Œ«ƒ’"Â×ÍÚ"”ƒÖypˆî‚YH"‰/J
–©´oã^V“Ù™‘Q!LØn+Œ“·óˆr9Á„ºãìÓ;Şešl-1Kë/E7…¢­Ê“í÷PC*(Sİb8Ã“.Â0FºöjZåH¯9Ğäç¿{(òyÿ5?å"„¹+aıQJù¶ìx>›ÜêØ‚Kš\¿ÂøÒPõ¨£Tib,}ØÔ6dÍ>2”E'¥HöUŠÅD
€CK®•‡ºÙ+UuM ].-aNw+<ÅçU­ûwLÁ)ÏÿÌÿÚ-rÊ½<_ğ”Ò¦H¾Ünè±EêŸL˜¶Œ„&¦rùÁ$H‹fH«7±YÄmk–Ğ’¸µÅ-Ğ1‚…™[Y,”ñr>Kñ¢U¾âı¹ˆ§p6õûá7*ó£3®v‚p<±z•[D }u(Ö<Øº-¤!N’%Ô2­:#u™íZ0ÁHÕc.é ^eõê§   “ZŠ    ¯!‚ € SÛÙhaPpC´ÅT¾gª)D„ğ‡;[H’Ÿ+â-.
ØÊbÎ¡_ÙêkÚ¼'H%—08—#ñÚSªuP€a&8‡µÂéå=ğ¬	ŞäÔÖÍ%À1×UM>ƒªV0¯àíŠVãæ€+s˜§ó:%ô‡}Ú’klA•éTÿvoÇ®›µ—Ç„²Ùüm\n.+ÂWŠ(çDï9ÜŠòš´Š·,”oa!åZ¤à^Vµ-8ykpSÛ(ì”(”×u¥•µRå]në"ª5@nóÜíÁŞö³
€ãJyaaõö¼›çÍ_ª°‚Aá–';é’m,÷¹ÖşÉ×¼ „ãK8<€$vDáA
%××5Vz/^M™‚,Ôò¤şW²_Ò‘@<¤à\€p6SVÄ–gÛ+˜¢‰$[ª¸\Åh¡aŞ:€"ÙeLª„àUß7Ê×z*íÁ•)Y;='¨%	RH¾baBˆ[Ÿ   Z¡    ¯!€€  ~RÜ Œ8¡ ‚)el‰H”¦$¥Ê	ç«UìÍ©¡Êeš^\QŠz¶âvË¯¡şØ­°~è¯ØõJ%²F"½l³ìzw#ZYús†¢£U&T:QŸ­¬$B¼hIéÓd^Aô¹‘1ï§É3T‚ÊAª¼h’Ò¯ ¦•E£Ve¤8$ô!]ÂÇ”`¤C&7¼KÌîê•õée²^G[¡erW½5­mêòÔÌôOvF»ÕU§5wÓGïQ#V¹Y©€ƒt/»‘[É¢éÛ••Â„¦*-tHK%¡u5Ul¥V&…8¹j¬—©†F'YÃİ/© ØŠåšˆ1LÁÖ.›†Ê>R¸çú¾èÓ÷ÈÀÈŒó—íêDãˆ®Ê™iÏ¶TÅÍ‚Ù\÷Ğ:×bA1ÁJ‘€™Â“úì¹S1N®U]ßÚy˜0€¶ÿ”P@Á5;§Tj/KİqƒÂ½;OXMFjæ+ÊXjÏuÅp)æ¸Ã?§-ìÑ¦²˜Ër§ÄÆ¨YÀ  © ŠZ¸    ¯!€ şVZàv+!
)É{³l°Æ¯X «ª» DtT?ø:u0#SôuÃ¶O'—Uopv¼pªf÷Ş6rx…#ÕŞ°š§,RoÏ‘LÁ]à"ä¤Ú”ªAÇfÌ¼gjî…°WÃ²£ğ!ÙğòQ[ë®Á¶±ÛqífÂ“Y–|ŠM.÷ Ó/@ja>¢FQ½”P,È%y"ğò»Fk¢¬´Ñ¤<‹ÎËÒu¥¶­ªm
†â“ûÑde”Ğ¼V“œÓÛDõ4w‹Nõ"+áîAEl¡ÁØÈ10G9fT«iÍ°X)bŞgWòM°Á7í>1£ón•Úy´±bÄD* ZBŠ[;H¹sÀÕÏqk{¤p	S‘s„í{-ºMórÊ–‹@29å›Ÿm}•M¤E}×kÓˆ’Úa-˜h¤ ÁàCK	fïÅ€Ï;˜‰µær)]©œz—ÂÎ»qk·5C4c.ÙYë1Q+‰\Eª p  • ”ZÏ    ¯!	  şVÚ¨°–"R3âKlÚ)¢¢°€)Gln¦ÌYêAX©+ÿ«/˜Ö3M]Q¯I·óhÈ9GšYÒ¨@I¯ä–%¤åIĞ¾O<fYàíRZ¡j"Q0÷Ër€¯l²s§x‚‹¼uS¯k´ÔµS×\è±<Š3,sNHÆŒUa{#\glŸKXàø#­q:¯;¡_j3åM&çÇ?ÒúB[„XÍÜ*¥Ÿ–9rSt^QğÄ<cx Ë;–fRLĞÛ«–‰,ª–£n(Xª¶Ád0F*HxëËJaEÛw”(^‚6&p¥ãê#7^…ÇÈbLMÿ¦±øióÅ¿¤ 8šš›æZì¿tÚ‹™Ï-8EHé?ÌÔ›äv8qi}ÔÑGÜbšR5ğ€/KMøL>ªÀWôêÉ%©x!Ê1ÎõËAÊ,ötéz«B“ÛÒ¯c-…‹åÁk÷4·Äû¸crûvá-ºmvC`ú¿8¢ü®µèü¸ÎÀT¿  Ÿ …Zç    ¯!€ şTZ©0V*R$LZ=æ›\¼«¬*”Ğ?yÕ®÷Í4MHšL1eC¸mı+Âu>X&ÜŸ†ş@´EÃ–¯Ñëá&Ré\D€üşmÙ¥)_ôFKs¯¯sŒ¼g™Q€—B[êÖ$ñW°AÒˆTBÍ“@´¢ó^.R/5å”›J¾WœUr5È÷n¥ˆºìs*œÄ0aë‘Äj˜¾èe>ËÙ7›×À¿¾ª¼Oñóq%oV#Œ˜t“İ„’şSE‰›,¼àD¬-5“Ä²JmC
´RZá¬a0j)–fé’”ÜP9ë“ık'“ø½…ğÕúÆ"é…^ªË¿å;H—ê{¯{ÈÅY<êÛ¯ûÅ>MönÜ€×€ÂxÖãEÃ«œp¬+şD£DP$ğrÓŒèÊC/nL‹›lå<ò%‹öê‹¦NaTí¶Îÿ¼L®_nØ«T
ÑØjf{tˆ˜•ç$–1ÒH-b‘—   ˆZş    ¯!€ _şT[ ’(#F*“4Jœ”¤Ò’ªª¨(´ç	#¸âúì‚et4ƒ¸ä]9 ¹‚aj¹h)aé+ó{MÚùiˆ$Üé€#V\äã«&[ğHóa‚Yÿ“:Ó*ù. xLc)ßL$$¸tÌ(²Ëı-†¥©	zèlK)›aÎå‚Û|D:.\0“0§.»oW›€HÌÛ¥8¾G ÕğjéuÇz©8Tİëh«wâÌG·ZÎ	ßŸ›—I'^m´G{/‘”¢ú[¦’õ£Ğéò‚¶­˜JÙÅ¯Â˜Ÿ¶A˜&"ŒÌVĞ¾õ.²L r-ŞZÎv`æşc¸—eù‹lıæfÉyñÀòÊ& Ä;­ ~…¸Û• .RàÄ{^†QŠø¾nRpˆ>Ô30Š(9[½Úëkì…$¾°·ÙRì-ŸN†ÏÌä€«]ÙË¸Y«m§uHUK-:¤0)¹iûL$•U-µ¯
j©	pÅq­¢*5çï`	˜p  “ ƒ[    ¯!	¢AşS[ál$T2º²¶“–­Rn°b„ ?³±²ù¢Ò€2«ámpUi»¢œ¦*­u‹j;K-U³ÇMhˆEı¾-€yB"t30‹hÁ°Ç*Şbap{Ÿö[0‚ˆLLÑkaÏb!d7ùÈ)0ÈÔzd@a
ê2&Aè
É6H¶flšÒ
æoJF³$M­ÍÆ}õ^–ßG‚&N³¾µà9Îb:¤b©_ôRæ«‘6bgd(öN®IßÁ/%•vîä;N*Îı*'ñMX ¡‚µ‘*[$dàB’–Ô–*M†ŒÅ€±P"h¬¿8å½kh`Â¿İ× Á„ş—p‚Âî„Ë©XñIêPš:NŞ·ëÊîóU›¥ô8â«D½ĞÉ0 æãªo
…Üäèt;é@bğ²%éW,ÉISñ–w ’v±`Õg€1TŠbW@[êa ˆ¼‘ X§×ûÚd¼Ì Š…ˆG¸Ş©ĞÁ ›Ó”&4]‚p   ‰[,    ¯!€¡GşR[)g	*RšnÙ1Evú·¢Q\Ü2k‘çãø¬À¤¢Ü{¬˜îh¸ ¨¸ñ`í9Í»Ãš`ö×Ç¥&S§‹â@÷ÎÉQ×Ÿ	Ëhk‰+€p˜Úb#ºµüdˆÂ7Ÿ€dƒ’vr0b,¼úØO-ëÆ³îQ,Û¾µĞ	_lQ¥‰èt}ªÀçñ71¯¯HÜ<¢o†UW9ƒXÉg#Õõµ%Ê¼ö&?*Œ \Î¡¿,9ÂõÅzÚuC»,æš×
‘±€Ã¢ö®Ğ¼¥hS Cè°zm#šçsC-—|ó¤a¬1¤:»…ĞxNfÆìòC‡!í'o¬2fÿ–æf\êA"EüÏb›ë¬ê@À¼'Ò†õˆMË<ÎmymxïĞùÕŸ_Ì²!'îšésò¶h¶z}\-%c
M7xğf±ı¸È—½l1Î]t®a…,XE=}-§‰jD¸•À  ” [C    ¯!ŒÏşVZ©,83Á<|MT–(&Uq|İ)E("´©öğª,Ó§9'=nÁ°6b–E9yi’÷É³w‚Æ¢UóWÀ†ôØI@ÀÉ‘$´N‚˜f¾àş]@§Ú8}“Ba•M¹á0ş‰Ërœ(Æ*A0TéÑÔèôno4g œò@I†¨;]wFlÏøöÁX5à ¢ï¨‚
æ¼™©30•òòË¸æÓO÷+	B¿EÖ¤‚òG÷û^v«­=6Ÿ„]Ñ¢û˜gS ~bNù  ¤µC˜B4„"šw»µbÜµªÚ÷D® Ù80Ra^:»3h¤2Æh§¸ÁrÓ“¬ªİ+<Q¸´›“ìü({ÒºZÀ¸˜Å°‚uê{¶˜É‚'ˆ2n}‘ ³¸-§o1=Ö‹2ovë@µ‹ âSD‡@4 ®À¾ŸJíêË¤¶Ã5_JBS¸Ãã‹™Ó§‘¥``‰h9;¥šçë“n 8  ™ …[[    ¯!¦‰ßşTÚ¨°”*%éU ¨¨¤”«n¦¨°6
Ìoçi)ÁØ‰U[‘;›|ŸO¨^`×y˜•ÇHo™ê)´ô®>59uØP¼˜ "üvL”sfb:~¤u<Œ6Ö„¤CôÒDi×AÆr´eK8_ö‰ŒBœ^šÓ%7ÓÈĞ!š=¼À	Œú8&UÖÊ†[+x#œıÓwôôÏ®ûš£Uäš‰=9Nş¿¡Ğ¤üQ¨%I³ßn=[á×ÍòMÓR¾zßè
Å+rUth'*ŞÇ9,™,—EèÿE¨íT‚"PçíÕÑUT cÈdè
™ÜßsÍ=åğÌØ;‚:¸m¶ç= ¼&­z7%`)0E©ÖÓ¢«t ró‹á
3:êŞ,™Ç2p}8¤¢’d6™ü$$&6İ%Ù?™5hÓ¾3(h&Ps$I¯y‹C€ÿ¿_.¼}‚Ø§WpÂíwÍXqdñûÚ¯L–²ñxõ-QÀ   €[r    ¯!€ßÿSY)Ö(!Â@°ÅŠÌóªŞ³ED2Û©J  [0j¦İS.	xë–ïæ,İI²¡ú ©­iÓxMÌ[j†ƒ!Q›¾(İm¼ØS „E¢(£oÍÁºÌÔ("7*Wçœ£É`Î hÌØŒ‚tMwZÁ+*N²=)’À„1Oì§^;Á1Şız'ºã’–ŒpªF”œäg
œ ?'h0%VC±òtKS4‘Ö«™ QÇM(hZÜ!{_l„¢^Ş¹£eW†{ òõ@Y)JgÖ&±u( (-ThQ PÜ†¶•YTZ”³Y@[ö¥´wæ±Áo‰ôÑ²zuÖàá¶`Ó@ÙçXÛŒe»¡í¼û&Z7ş_¼ë¶rÒÅ..gg+QO %<]qb päPÜ3˜Ì±­‹èAª!¹^!0‘€çLRšºD¼ÙÜËT4¶°¿¬©î¬_Ñ Şç¨àâ:<Š)Á.LøJ  ‹ …[‰    ¯!	¤  GşQÚá¬D(¤¥¹`mJª²ÿ 2Vã¡€“Ç÷Ú–FÌšgº'©÷·FÿÁÖ¹vB°àû’¿=¥<ª²´˜¤£3ßê ©üCÁtN¥ÍN¶AAøŸw„l>å¤B”(äüáßU]¾‹ıi¡9±¢TW¨°ÃŞp?~„Štª4ÖÉö2‘jô¤l¢bû«&’áf’ß{±>.ëJğ‘ğM×14nøÉbæ®«İlÄ£<ÕÄKQ¢¸¢Ì†*®ÕeN“¤i¦Ö¢»9D˜¾N”Q:;UÃ
a @(0`8oŸc«'Mê«tÿÉ|…Š;e©¨lÑnL>/
~<bLˆ×ixí’±è!)7û=S«’Û°Á;ŠA³®5S.*–¸¤„fäÍ4`}NY7ãM¥§ÒÖ]pŒhÍ‘ˆ‘åL„0àÓğÂèI.åÂÓ`cûw« ÆtÀà¶›yÊa¤6Ü.ZüÙQ–v±[šà’ÔK[Ã€   r[     ¯!	 şVZ¨¬¤Á\yá·Şé’F™–ä¥P°)Øæc¯{3$Ñù‹3L7´e`kq‰Vaá¡¾ƒÖmÓ9MşW–…„2\)sö*àçL*œu»./ÅÇ™éšß½¾M8ï@ÙÂZ–‹ä8Û\•ª‚àÉ0¬L4à}äê4Ğ¸šw¥y}ìêÆÑIC†*²Ã¯“³4ËR•w…ËÊ·µ°Bˆ|^ÚíâCß™“9¸¤ôV*Â¼ˆ§‘(	ÚDa†¥À¢ÏH‚±”D#(D‹Ô›¼ë¢UÊ‹ ßÍÃ¨`ÁTòÜ-cöÛ5ßmRaÁ#ï{'bÌ;|ÂaÕÕşûÕ.XÇlVÇ/>p¢BPbœZM¦Z­-„*X+7WYed¹æÑ³ŒØ¦•úíI»k¥’Ÿ
Ö*z@·àÌG“µ[Yp.=ù‹¼WWU÷]#°¥¬¤8™NK™£è0ihCS~ğÀ  } ‹[¸    ¯! ¨ ïT[ Œ¢„Z»:^2¨Õ@õ]³C’·ªX´ñåù/;d0ÜÔ­ïi‚†	—®9n8<B¨›Ò–±3‹LB“N—€‹À #wtŞxİë%>…•’B¡ hÎYöKíÕÕro¾Ùz¦v+ó••5&`%ºqRÊ!{É@’
†Ôp9dbAÑk®hKvªkŠ×õV™·ûNÕK¾RX4hŒy2 M[ÊLkê#i¨»eåÛ ëmº­¯v°uºÔÖª<Ğ "øÓ»39™¤oÎdT¥8&Xx¥Ü)¾¼àó~Å¸—Æ\‰çµÏÆ˜ğ>¥zè-/×³|ŞÖ¦ ¬’MûÁN^º—eêÄgŞRõø¦ƒ5Êp€K‘ª›†5=ÌÇc¥`€ ]ÿïa+ZÂ!ÈĞ)5Ej\¯9 DœhW ¶‰ÒÕêmJt:pÑñèU ÁUvóŞUÓèY1Jí 6TMÖ^b˜3©ª—–Î  – [Ï    ¯!	¡  SÙ©v6EC
ÙªoÌ÷4²2d€9Å;2ã[±œêQ¯k—ãÂÎ|­Ş±iË*ğ5¬ë-àdÛ”˜„¨Ü†æ©¶ÓrÀ~ŸÕËÔÁ*œ‹2XìĞŸy‹¬M@^,ªºĞó.¢³ªÒ&e ¶´?eş]Äu|Meû\âéBLi-øt²3T¿‹90ıæw `ÉsĞÛ§L¾ğ$ï•ÙØl(4»å°qÒv*K¾—µ[áÊ—Š6ƒYÊ#<dd'ı¦Å‰R^hqJù©­\!`
;Çd!À`D»9÷iymVã2³@i¹,¨[—’Ãİ¨ˆê÷ø^Ã•-ì.Ï_£–ß£wŸxçİÆş™p0Åcª®	ğTIw‚"„âƒÍyğ&‹ Sƒ§®™m›9Ñd¾œëğUüÿ˜¼=×c#8U	gÊMKÒ*´l`Ş½W‘m¶C ,í*±‹¾ÜZy·q_Ù^Ê¦/åz*ÚÒXçí¯dÁü÷ãÿ=%¸H\  ¨ “[æ    ¯!ğ  ¾T[`Ì” ±¾˜VwH©2ˆQ)it-|w 7„¬jÀÉÄimxÕ˜ù=…Ìl¦q@£!Z`½¦çaiÃ”ÕøÌW«­×ë@Â‡:uÏÏW%Ò_B‚cxD–Øæ,ÎQ5¶YŸ	¶Û¢hÊä°û}ŞDv¥ª”CtN€iæMĞ®RàprÅµl Ø j×mrxì×ùîtÏO˜Õ&Æ:Ï‚+ó…¿yëŞêÆZ†\t„J”ıöıôğ™"+RD^õì0°í!:ÆkÒÓ«FıtP QÒ,p–:†$ˆ†S­Î|.SKlTP8°aà]¾Ztï#
ZÚ¯kï—ûûÙScpç?÷ÙëŠåæ'%ñ5²´
Ç$†n¥ K0ÃR„‚¾J„ØèÁBÈ¶!2¥ëYtóe„]B"_Ÿ§‚JWèCS¦ƒ>YÆjI¡ˆ™ÿ²ĞÉI[b«ùÈqÓ—µ%Î.½ê?árğGZÖº¸ÚcËÊèâ8äQbUâtDšgÁô“Ë.3¥n à   ›[ı    ¯!¨PşT[ØTfD+R÷qó…k‰œõ‰T-LMŸÏJmØ$6„ÃåÇœ1û¼µş“2–†´ìŞ€rA¢tïFËˆ¤ $`ã ¥0ßQBtÒi#!êñìA›eÀN:9’ä²kƒvÅ£ÚôlÎ@ÊDLƒœh2\£Ëñ„bkÎ‹'yº„¦¡Ò¨BæšïÅo§^ >ÚF‘+”gß[Á!¤e¾2jâÃçaÏE³¤F ´ï"*Keî.O«$o8Nñ¢ß¼Ã)$¡*šxˆ}QŒPJ72Ä­anöª4BÇ3 Ä AtËgp¼j¹Ô­İÀ1”Ö„Ï2=4’ÿ#7±¶áØ#Ú6_*Áç^ë~®×’°n¸@æÜæá«°ÌÀ-Ç8²Ö  •¥³VWuÕç6ı«Ši‰Ë¸X
Z¿o‰YWmrĞÂ†´§^ñ:3…°„›% F!3=•B Ç.Ö>öş.ƒÄ„ÿ±ÀÓª•·>NéóèqèÔ¡Rƒ;'Ó
uÅËÉ¸  ¦ \    ¯!‚p\|V[\p†"X®³Îü˜ï0óµÛmJV«ª]8”
° N¸şÿı
WÃcéî˜óµÂŒ·K7¹üûdäSëÄ¸¢©®Ãß‹ˆ2óş¿Q #ùøœ‚äÆLgi@ÎƒLå­`ƒ‚Û”två9c%‘Pë:y§#—³­n(>Ú”q¢Á>tLv×3 ,müaê0¥“¾E—ß¤¯Úœ‰’Ä^•íï’YàÅÔ
/5mVëYúæ‚EgHb¢H‡KÇª‚á(kK,%cd>ªÈBıôÍYŠKU…C1±L@! F‘(#3cT9ó¶-Vè ©!Ó•jà<ß¶8JŸËé©g;•ÕA†Í…à¼Ûäÿİ©À3L…¤S¡Œæ¾wê7ÒœóÑwáŠQ kAˆş«fqJ®;Ğû7oËÖ€@~;+;âáU­S*¹¥@$†ijê%šÎ0I[ !¯êóøk¹½<k­4\ÄÄèO#Ò'M‹ÍlÔIÔ¾)r›n  š \,    ¯!	Ğğ~Rİ\h‰,³¦lÂ÷ÔÅ*š2®$Üæù¡‚Ùé9ò	jcl´NÀĞŠêæ)ÂmÒºé¡‘•UÃO”‘	×øe!Ïöğ ÇASDÃÇ,v|Ø ÂåÉ–:R”ãM•3Õ~ıŠî‚¸ß§&{µøGq’ÉA¢xÔ[Qj´â¯>jZ¾£RVğxvšò¸f-RY-ŒeãÉC¨0§¥ëQáRÕÜú“D )`É™xZ(DÇ+Ò€›¥a[³òSŒÊ·ïjX½(Œ€
;ÏQP\ˆ Œ"Ò”ªUwæSÚeÉpÌö¼+<®DY9¹_eé–ÕP{v·« rN¸¦»Ö­v%ŒSÀÒ²Æ63ø·õ+ RêKâüµc\e#D<k"„¢Æf)u5'Ó2ÅÛËˆ ze­9uxŞÊc\{É{£†W$£ŞŞÛ¡LBffŸa§%p—6§Ç“h¼FÔK â”ã:3ßJhŠ7ZÙ€  ˜ ‹\C    ¯!	œøüşTZ(ÖWãR
Öç‰Â˜S/“©¶¦å(•Apq­>>”ÖU¨±ªwç—<èyàğE`’€L_à½BËaˆÏê–Aã¢h¼‰0QÅ¨hë÷ºŒ@q—¦CKélµïÓü…„» Cœ ^¸‰¾ÀÁÀnè…šMÕP·öÊ9×®êåëV÷c¡
¨­Jùz³:5ÇáfKYyöUÃ_*®=]#«ãÄœ}^®HtÒ*<óIíní½{êsœG ‚Ğé]}ê½Å Ü:+pNîÙi[›MŸARe¸Â‰·Z;WMZBzì@ SÓ¬0T,‚!ÄJêÚÜ'©EÁH›³_OÙ“µ÷Zël·^ñjšH7rŞç²:	&¤¸C
	©©´ş§†oÊÖPO‰uò$æx5˜p‚,XÿÆƒ‘ Ş)9~b>³1ı³şOë¼ßjmLÏFÎ½9N]Ow½l·œl7ajT–æıçGP€,k³†jØÀ  – „\Z    ¯!¨xÿUYhö:+‘ˆ¥ºÈI1e+´Ôíå”P—ºZåƒ6³ó1;IÎÅ -ëĞyÂhXÕ	%A®­¨Êk¢t%­¶—êiÔ!ñÇ0í(7P´ `£¾ÄˆD‘5E3šîÓMNãĞÒYwû3Â+Éìa&ªTpªvÑ;#u€‚ç}uª²â€‚”MnkƒŸ$Ãôƒ\DzÆ÷%ÂÊÛl¡¯–*í^¢ìJ¿!çİ‰2
Vœ2£!.‡—”ì€êjE&K¯E³„9Â©Ñ‰Â
—¦±Ó ¨8”L‰5ë„µ`;ájÙp¸Ã³!ù/“~üği1	Ó.oÒ’V(}§„°4ÅmŠ+’-Wú¿æd»]‰œÿ~µ‚iÕê`s)t—wY^ñd³Œ@‹çÂœ‡–”
™·]8F¾ã‚g©Õ3*8}n,…ë×©Ë,Ñ§–a@
¹›AH w‚Àr)]A‰=y¡Q~   ‡\q    ¯!	ÄxÿÿUÜ\P'J,uYÔŠç¡Û_gÒü=™Îª‚¥‚éøŒ;›2ß:Ê*“IJ„i€eö3ªoI®ÜÛ{uú·÷1g:¬d éôØ"á†œº(AÛsDš½öÚ ZR^ WK‡XŸŸYærššÿ?&f§‘¤[ ªÒ
éÈÀgåiŠšB“1*rÎ”RGÏhW–¤Î;»´Ö5íå
çÇdb~s•_Çºî±Ñíå˜^`387Õº¹OF<ô¼e>²¦bsœîßÂ§<0`ê—8¸{©LÄ9	Î«P™û¨%à•´SitR¶ŠbÂq	Á"º§‚—•d­¨û?xxˆêlŸn·M•[@µ—0É5Ï•¯f˜ÿæ•µæö5ö†ÃªT…‘½ûeı9N( ëAÉã!ÏEhQÃ£œ»ñîxK#í ~ödu¦”&›ÿÁ¸¡!¶ïåH¾§`Ç²õT¸ºÑÙ,jä2Ë ¦8&_„%i€Ê œ  ’ Š\ˆ    ¯!ÒxÿÿSZé0:
Ä@ŠÀøCÒ¼8ë)wUE1e€çÖğ(,nHFÓŸ	_Ş™d,9÷V‰°m`70îú|ç¯·:œœ´ 	@ÔÒbá‹‰(ØÒ ˆ=LÈG"‚z!È°™]~ÙõŒèhu…YŠ:ÀM¬V€'Oë1Ç
Ú©o,j :ÀÖ›í‰p%A²@ãáÙÔˆæEù£SòÔàE·ù©Q*ß€ 	Ô0ÀûÈîSı”lq ‹RA ë©­ÊA~OºîÂõÚ&¬9·!HtœBõ/İÏ¬U­‰F6YZ'±£E$ŠŞ¦ÒtW?Hµæ¤hŒ>Àô‹ƒa(Ä€Ç6êò¼Ú‘A+a€‰…Z¹y°W0ác­©YêaN,¹…Â¹í›ÿ¬_šr›Ôık _·*ş«?§pa¼çÅ× k
´\—£¥q>ç5=f.Ø{ã#F¨AUô#u\]ÜfåNR¬õü»ENdWÅ€MÃÃyg*"¦ˆ€  • }\     ¯!ÀØÿÿTYé°FAÔC?)è¡Æê&%*”! ¾š~Ş	ÇñX.ñÙ“;V61ë•ı×W€êûÏ­e\ïm´V«‚m!äÁ °P-Q“gD?såKˆL'àÇœçT²•‹X¨¾óÍ³Œ‹„´ìí`7OßÍ}À¡Àã;@‚Ş@±$À¦,+-
F_^3eû~%I@˜Èrà(¹Ëá|–n&sY|"vşH.Ğ(7Jæ :Ëfüçª´˜z"Æ^šä‹yšeiÖß`MQõäïÉ…£5pÊKlÆ•
¥ùiuÖŒ (í°6,ŠeD,ônÖ¼Q° šaãÁX%À;ÛKyMSQQ#¯ëQ|dG"÷C‚˜bØl^ä‡HØ§ğšQ»O."m€Á)gtÄoŠ-S_â`'j12øY2ê˜
ÙŠó÷u=Q ®ë; ³ü$ ¾’5Ï:'H ŸF U«-p„µG  ˆ ƒ\·    ¯!À‡üÿÿTÛ Ö:ÂQ‘DÆ¹ó,èÌå9:UZ¹¶T*ˆ ~]s?º=©×Vº”pRtbŠ‹ıjœ•@ÕÌÔd—¤=’£ÓoÌÍ¹©âË{«1Š9È*.g˜SFÜèˆ{ˆÃQ(a)D<h¹Ât  ·Õ: ¢|d†T®±Vx–xÒÁ3ÀmB€`ºÅc’@”ğSÜøğK— ”xl„!-j câ¤Û*®Íµ8Š=·¶]~¢n;7KÌrÑ¼µH‰ Bcà,LÍØæX{6³	P'x-è'w!ÛíS´8G°IÂÉÖÖ…aÕVS §¨!à 
Hu$oS6S2%¥V( æ@&ñµ¢ìşSŞp¹ÑîêSï·¼ÛĞü£hœSØ´©Å×Ùãp 3V×„ï€ûõTâ¿8ùšõ*r¤Çö¼¾·‘ò—åB°àÍr¬«GÈ'q½l½ğ@<x3´0b°Â¸ğà@p   r\Î    ¯! ¸ÿÿSÙév+*îYxÍæ¶_Ş£›¢VUMŸ‰BÔ¬ ´ÅäŞıY§!-½†¡RıÀúFÒuoÇ±èñS%Ö™"ş%0!­ŒR“œ“¿qË#Âz3…äfÛåsÊqA\«á*s:ZÄ2Uù1Ç=¿Z¸(cÆREAu! Í*l¨4x(R’èCÕ8¤å!èîÅ×µ®{ßSëˆºJ86÷»ØF–Ğƒ:Í½/Çúc&”Æ9SÓY‡XN6¤øFn5s»a8ïó’ñY	à¨%’ãBÕV®)¥L%â˜ÑIj£²„`Ñ´X7Mêª o.Ï\²Ş.6ÇF•üÕP»û›Ğò=Ô;Œê¥¶tS=ªî“Ûß `-×xyqŒ¡Ñ€¶‚ˆSÏ†rKÒ÷¢£uí?‹ÛòêØ	*›ØhDQÿ2)ËÊ’æ *kNšÔ,¢©ªfJà O€Øü¸q7 ]M´+¢) ÑÀ  } \å    ¯!´âOÿĞZ¨¬*„…€«°ÕÑ0e)h²OØÚÇ]¨LØ®M¦3ŸxÄ­ Xäˆb7±Ø]ë6µ}R¹Z$ü^2HD¶µ’°yÍv¸t§¾‚¨ìsİLÌ«TJÚ7„oJ4ô˜J;)Ğ¼Øa&šî¶ñ(ôS9# ç¾tJ•F€î«kå,Úƒ:éçU5G¹ùöæJfÊ÷õtéƒÄ;¿â·û"&€‹	#›%lqåö³ó°ú}bí-ÉVm}ÂRÙjJˆÎô‚•›òÚFVŸQ(ˆJÈp¶©oL¢{|ìoº·«èüIj¢°àH(…„AA+‡=GÍ^)@!±›Î8ĞzCX\)}!
:k¦TgÂî|²¾Z—]ÚTÙrU‘µG!tP(©G'F+°önFâéßB–Ò[+óÓz6EÎé¦Á1ÔjÚUn*•äĞ
SC„ª†^´‹UÓJUúï3d \ìğâÜ,©>ú¸YÂ„îÙÀ  ™ ˆ\ı    ¯!œFãÿÓÚ¡ìsa\AVºQÉvİ·(ªaXÑ_SÆnàš)³†)ªÛQ~•zXg`Ñá}ïP¤ûŸó£Ó¬êq”6ß:Í–›‡CÿøÚzMrn£˜[nŸc:°’ª¶ÖÛË0p½“¤ª¼zJ &fF°AŒ^I_‰H¥â]¶h4¨~;'Ÿ·¦ŒÊtcÂo$;rŠ°R¡Ó®¹L(°ÍÔê¸ÁÑgilÒ-’ü# 
¼â È!¢$¬µÿş­0±–õŞgÂ+a)ÂJ+·LÔ¯J[fBÕÆ5¥ÔYx#²«“Y ^´Dôga,\,V[(è8‰‚$:ÓKÒ¹İ5ŠÂ€Î|…ÉÜ5[™ÍÑ
ÉTáï'õâp¢Ã´}2ıuíı‹cŸ@Ğ(oO•*Õıj6hy4ç *f'`óÌ¦¯c®³­ÆŒ—u˜Üm¶—°fz©ÒÈ†­=m<€)E7ˆÜ%ÿ"p÷
ß¶6Ã¡”ôÌ ğ¼€ß;€  “ ]    ¯!ÈáWÿÕZ¡ìD±®?OMÍS)|dL¢©J¦€¹Ô«"Xa#*D..ñü«Ó{ßgqw¶ıomÛeTû;·µSœw~i¦HN–¯Qö­„š‚¡r±}•(åÏ¸îºhK©Hˆ–!!«î_K_éQ ‘ZW›ê
	Œ\VÍHxÌUÖ|»µ-iøû	±‚~p’9·Y×á”ŒVÍù¡´vm#õ&…>ë~ARZ2OQ^S†á^ÂkÊ1_-,N»°wñx1À»äzÁÎ$ã)+÷j‡¦âÎËŞ¨•üÂqVk’QÚàŒ8
†Ã ©hpVáº¡\
À8<ª•1N¼€Õ¹’óR3|ÖŠğı/¶.İå“F/Zs¨O~ÇW€Àa%næÕC¼›¨iß€Øc®Ò_O¶p…"I±52 „­I)oŸIŠÍ$!nˆ^ -9¨Q 2ØDB–]ÓÈJf)¸r›­b/×Ó`[ [n19Ê9à*€(à  ˜ ˆ]+    ¯!À¦ÿÑÛhĞvÀ	¬ÆøæU…  òLcí_²9½XBBŒ/6Æ8ê2oO€VC A3C…ÕÌ9Émˆ¥(Á§ Î@ÀŒ®Pâ>ÜÁî!8A1«¤>RÅ¾DòÎ‚,0
fpT@0²ÃY„™²¤íï„Ìµ&İ5€ìaœÀjd&»bu®œ»%1€‡ºétİ’{–áXê¼/Ç>åX«[œÛr—„)¹O´ínÒïzr”Uj/c›	S2œ~âyg\QT¦“ªB;ê%ªŠÂ¢0¨&&ºw5T2Ê…mRPšÓ’Ğ1—@®ÇKnBÄ÷_‘Á)ÖÒ6çÉÉï¿cfq^"êÃ(ä!jW‰ªã5ÆÑ$ƒz´ˆ`ÖªN‰DN~K•Ì@€bâÔ+(Ú›‡0Ä¢]©siÎ¥¶>X¡P(²)G;§n»½/b˜(ÔBh3Á 	–gw>;’¯wÛE"÷º¡:–ˆ Ã¬BÕ¸d&¸  “ ‹]B    ¯!¢ Ò¿ÓY)ìHCƒ]ê”RÊÄÄÂ€²¼âÿÃmğBè L­¥oáT¿S×n"q	zôº‹Ùú;:êfÕT+#‚ÙåIS«`&"Y¦1Ò,Ó6hÎ—_®ÜŞáòàó(7‡;+*ïZ#²à$QğÇa«IøòÇ”˜³‚¢çÎYÆ›\µJõU“Í€O5”öíš•¸n€¶jë‡ÄÊß½Öì´†gÊ¹³:y°•ääkF´^8a"]bªû)J!têŸ%ĞÈ/J±\½â­3{ôÂ÷™)ŞTjz•SÛ!†T$·<Å·zİ»6P *¼ÒyZÜ3ÅëÑŠ¤9%u9H+7¤ñN$^tÔe2%w‡µ"×_Ìeû][´EÇÈæUå²r«Ù‹J
ïG´Ï]ø¹w¤™ÉF=BdÕ$!¶é‰¶#$‰jo'C§«K²V¤¹ãşÊ52 ¹íÄbÏtáRXãİ§êMOÕ®!>ĞçøJş ËÆ4¿¿&  – ]Y    ¯!+ €TZ¨¬Ñ€Òh«g4*êb2„!tD¾.bğŸh›ˆ†KÉ|öµÄÉ{ÎçrrÏhNáy[à¾™?=¾$s³†”™i°¬>X×ÏÎ2Z´¤ä+“ ÀÄşY!¬y/—<
ø‹¡çÔPÓr3§\R²ªÅ•	É´
Õ´‰‚€®­ä€Ä& $“‡#å{®à)«0¼º$²È©FÎŠÄ”c-4%}åP™e$!üëZ§Ø”Ğ)N,cÌoÈ„åë‘<©ŠkT!"BŠÜØês¢ıÆÒ”£!ñ€wt't`Éğ#˜Îóp>;³%ôšqß2XÍ8¦0…ş§ÚA€ÁZ›åÁ
D±2²°åİ¼âJ·œòŠ4ƒ4¸J"û$ÚF`9‚Öç–SÚXÜÄ„=üÜˆñ¢È¶‹ LS#>BÕœ\ğ#GWœ¨Ö~\İìÂ‡îºœÃÑHÅœ„?ÍĞN¶¸¿k(1è7Jµæ_ƒ„Øq.ƒ”tWõt•×±¸Yéè1ş©ğ  ˜ :]q    ¯!M8ç‚êùÿ×<§­4J*â´ lÒ†Í6á³9j*AEe­”ŒºÉK—¼
“²‚Âd›Õö]ÜÒ‡¾‰Ğ÷ìãGÆöI·¼ì°—‚`]›ÒÃZ•T=ÓIß·–!­Ğ=ã€'•pW|~Š°º3Át,ß6{NKHù[ÖÑé®5ÂyÄÀÓ‹xH#$ƒøÿ¶ ’¦yò¨\ÏIêq£…Õ¬›nR £®tc*ÂÙ7†nÎ5¨ld«8òÏÍ ¦È¿f	?h_Z¦ªªuy³¦ÑŞv.-+’vÏ0@`—©-ŞO„pƒŒØ TPC;}Û†Óy¹ÒgpñGhóUh,œ(z–M–‰Ñ”ósv Æ$ÀÔjˆU˜m‘¤İ
¨ØZÕî(—ÖŞ®¤ÛG&L«®¾u*ŞyL™—‹ãºâ˜l×Ë<–¡ñµ¤3.i§É·O5#3#ü†Í€ºÇw‹e•Yz¾[-¾F%ûèâl¦uzNœ9š×i®øÊ«†Óo¯´“»ó[KvãO$T­¿6+N‚‘,AîØ­—¦N>yçÊîr­úN¾­0¬{Ez·ËKnğá)×uûíì¢ƒ„g©P%œL}BÀŞk‘íx°åûÛ—hìÔ×çÔ¦ÁÕ‡=>Ùş>_i©äšö;Iã{Ö—uœIàRECïÏF®,Ë®W[n]}†ÂŠ¥ºAŸı#`p  E ¡]ˆ    ¯!{-¢”ÇD
@L¬«—+N÷µŞW0Rö˜²\ƒ¡Ü™ş‘÷ıûË{™{ÚÌ³{' 3°BÀrøş¶«›lŠùnâ`Ô`ä¨$CØC·¦I˜ TÔ©Ú•ZôQ2aó7*¶Éê4ÓFlÌÕÖZR  ûRj'ZeuœÎj1åÿàqB8İÙ>Í(øê_€ë<“ÕU0Õ{İqÜ¯©V*‡zĞ§ôs¡¦§5r‚è!°K5YÎìyÂFÈPŠĞ¹-ô"¨£­©†L œƒçG÷\ŞÆlª­†bVë|o„¯
“Ÿjm‚®©)hŞ+ü¥ñ]½Ugæ|ñOëÿÊ@’c‹õ¢°+Øå6¼ÔøÙ[%˜uÍá–ì=>›÷ì¥8 .é¤éï“ü,èõ$‹£ ¾tÒ2®©@oÀB²'5`3­ŞÑRÙœ5Hhc
†sÂäR;D¹kX×ÀåôŠ`tmúXTyFôµF¡dçÍ‚ï§2¸â…Ö#Lz‹{ñ÷5ñù:°¬^vœÒ’I,ÒëıdGœæÀ  ¬ ™]Ÿ    ¯!]¢ŒÊB‘EKÑ8yï¹ÛX¯féB‹Ù¤•E‰pï¤ë+–mª`ºr|,ªHhvKŠO{‚´åÆAa›î†™$êô¢¿HÀXlûñc4¹ Õ›— ¢@ã +Ú°XNú;]fºqh3û)WÔâ’1¿çùmÿ¢€ù·ãq#îD£¦ü±O^,íƒóè(Ş_æûHµ=#=€ƒêT”ÀçÈº‰{ÚTšğUZRÆë;Ò'Rn’Ù£ã"|·DõL%²ÄD •rh_s •¬»´m÷/¥O¢É£ÀI¥¤‡ŠRs0'ÃÔµ³k]· J€ƒñ”K=^R1ÈèOá¾Ìúœf¤ß¾
lÂAä+TcmÎ€•_*1&˜ë$¢Š)Ğj…—¼•¤]£¶Tt‚rj]LûhòZ‹´üÀö
ôÍ,šDö@njÀ­D>Ò‡ZP!Ü2=,%J„•è–Ò¡†ŒL‹9ˆÏ%ÈÒ=¦ğ)&¥G5ı	“E¡Ùñø™P¥Dğ8  ¤ †]¶    ¯!=²
ÉA‹ÙEj<Óó_>S¸¤¥ZétÒA^bû™¶ÍÒŸi¤b^vÂ»Ã¤R¬C7ê­Ïí²BQÃóÇàrÔ›ÇÑ3X$³ªa=¾ªç:q’šyl¶—‘Ü¢_¶ŠMØPNs{%»S½Ñ+91 š‘LvˆœÂÖ3é˜|]uÏU´ø?K›ybª×DPU§zÑ6#;nüwVXj·ª¨%u¸%K]åÃakœªÆ-Dª„™kï‚  µ#D­Ü*rºò*©¶ÁØˆap]¨÷Ú$¤¾æLÕ-^Ã“—É‹i—+]:vãèŒ~MŠSniŸ,qÙOÚòzGƒ?r’C`:‡0§ÂÉTö÷LÅ ”c“d—VÔšš–]“"°È(P~…iu¹½·&–®BL¢ë"KÜ¹šfN–ºT`ãÔÓ¤ñ‚k¶=Ëp½SÊvUX'¿ô!—Ğ¸9^‰—İ·^5FßiïÑ.Rj®í‚ryÚÊ”$/S•‚¡À  ‘ ]Î    ¯! ÖÙèĞF:Bƒ:‡<[8ïlD»›À”y d­Ë}•µ²ÎÿğçÔvr @nü3êFvÇ«Õ‹Ï–Lx	û±0‚y\šh¼3†ìiÌ©yúq XycHT^_”Ìój–ÊªÂUNˆJ ³Kv»‚ï¦–>’å›4áÀœÏæªözCÎ€€é‰ˆtLaíQo#y+8YAØyÁH”4V5–ÕEŒ³‚q¡h—S6à\ñg’àMó€:°Á–çÌc<¥mfÂ–£°È,d	(³ÓÙqs9S1ÄJä ’ñ|
.¿šfA¼¡q<.	Ä×<§‚Ór?iú(iÇ™qµŒQæŸ&ì¤×µ{ˆ®™Ì]Q]IÁ„¹Ğ”Ù'zÅÙÍF_ïIµ(½'f¦¦ ÂZ,†·ìÚŞCA|ÊhGşªÎ“Ğ¤K•$áæuqHK3ád”»ÒÁ%ÓÈ¾ü;€ØŠó¼óI6DJPNÕNÉÚËV+ÊÈLÍ†u+ºÀëÌ/À  › •]å    ¯!1 7V[™0$(¹VÔ¹×½Ì®¹+RÚËË•p#w[ìÇºwn¨uO½S'…Ñ‡¸6³şí{'4FçC°ĞÀ@²±šR˜¿‹…œyÚ ‡Ã\8Mø‰*{¹×*lq»œˆJ“ù½Ö¬Å´g
@î<.biËÊ|1`TÓÂR€X‚ã”w;šXÁü¦É†-	!UÆœúôúqÕ-¶qÇE–¸Èı$æ½f-(_hÃTb~9êµLûRåík+œµ¥k.fd#“Œ«Sj£0àLT0 !bå<ªéÎÍvó¹¬Ì ´–Í >©>Ox¢Bâí¤	Õ´k³,ïî·ñ%”OFoZ÷ØqkÚ;¦ÄÔ€ÈÿJ )«öS8/…^n.%‘ƒšÜŞä§]‡8Íq¦<xĞ€t(åĞu¢ç§2‰zî]ät¬„}Ø?š °ˆ¼s0kaÎX'p3Xú±µh–«ôCš÷.¶ª¼ä åXÂnMôT…¤†jáå$ ï‡²ŠÑi£-\     ]ü    ¯!ˆ S\ ô*X àG{wÑWÆÅfª„°¼hIvÆËå;î;ÀÔ)·õYÁ*yxïìoRêÛëŠ2ÅÏ4S~²dêÓSA‚3(ö413 
\bÚ•x¤e“Æ¡¹xÎ ±Ôûˆà4I‹.ğßP&Â[a§ŞÔz,ôq× gVrÌÄúR]¼\	"áÕÇ‘‘ƒÜD@Ë$ğu“½ìLÀ@4ë>K¹‹9`YïôZL=ÔªSäA¦h¡c=•åe<éF;¸äıÌ,+å(U¨Òö±ïÂi@:KQZ¨ÌHhˆY‘M»Á5¼¢Qeèàı¬×ˆJ€–™aÕL‡P7U6CaIF‡)šö§Æ¶¤Ù–ıÊq6Œù h´T}ŠP¦n&Á ÿûÅ—™9GÆRXõ¦’ªƒD¯àH¡Óì×îµº(¥Ã¦•’ [{8àÆ4âçdìk88Ôª02b9†2L÷Äf¶X€ı´Úñ5Ò—sc¶‹Pâµúò5A¿[Z¶Beå(§E¸©n  « œ^    ¯! ÀØÙé0„9Vë8rW<Jœfí¼êuKeØÆ˜kÒ8÷
ƒÔ´É®%A¼	Nö©™·§!&Õp pÆƒjloAè¤©Á‚w	×FÒT{5÷ÖgyP(²jí<Z8Ndq¬3Yå×=8¿^õöü…‚—¬¡ÖØ›ÒœO#¼®´+®	c²ø'ƒ0]İ8ˆQ’Rhğ ¹µÅ-îùjçDZV)Wp‰j¨œ%Àµ‰ÂşÎÉAK²Ï)0Ü§à¡è„ ã43WeÃ^ù
)¬Ôx2
ÈA	@æŒËªëÚ¼çÛ+5T Wóõˆ,®š¢eo?SŞ¤ñxæu8 ù}:÷<8u?»¢›¥}òÈêÃÅß‚ë=NLpÚ i<eÑ8¶
“S<HpW}µ…{f7®Î¾ÑJÂÍz<Ğ[b›\sß0¡šKdänU…ôÍ‰…nmPK ¤0"®Vh§–l\QÌ³¯f7fM¹-¼àËiLJ…½v[!1À  § ’^*    ¯!0ˆÔÜ!40¬ÊU&nŠYÓ7ªÕWC†Ï\?ƒ–ÇKÛM¼»MşÓÂÓ—ê;¹£g‹æF§ÔTğÉƒgWæé”'Ï‚Ÿ©`t“›e=ó¤C0‹xğ ,Œ*4Æ°q¸¾I5gy$‰ë1 º^íE­ª¾Xò¶ÙGV“ôd
òŸëS*ù5¨Æol!ZÑ='+Æå°›í1—u3»ä7<ESÁEÜìâ5ÆJËl²¬³UÁxpZ,’¥©iMGˆV^ÃIeu3âµ5ª
ËB‰€àÒDõMæ…­®”³ŒŒkRSİ¹İŞÉÕã&ØÒxâÆâW©eôú‘¬ë%½1¿éo.¼%Ì£`Ç„! ®(²ttjåóÀˆå2†¦”’u‹eıäUBêõúûnmÎ´¥éQI=ß¸X'w2úOa¾€*3qüë?5÷ÿÈ‚èv8%Ğ×»®Š˜Şæw²ÿkÒ6ì—ñé²êO_jš wº‡eæx   ‡^B    ¯! €ÿÕZhÌÔ¹R7õ/9m–™ÃdÂñEˆ®~d³¤¢CN(?’÷ø[±ëû’3;SË;~uÑ4Ô Â»‰æö6pzuPöl£míT“lØşÜÖö¨(
ÌeÖõæ¤ÒH¯ £×ÛJ]8qrìK§(¨:‘
b‹8$Ï=h@eİ€‡8o»ƒĞÙà­¦ÏÖì­öMĞ²¬£	º¨)TtT€ZœQÒÈÂfœìTVõ™Å)z„ì†3
¢ÕGd!LÀÒnœî—9âÛïã1*U£íëéÚ3¦°V$¸õÅ•e6æªÈh] MlÆû«]?ò7çî‡Ò|Ó^háÆE’­ô’ÍßKA²*ÄøMnÊqğíïm½Óí£—qÔ.kÀp™@ÖN•M*³J]§nã™ï<–ñú9†ÿáñÈ¶|=³µ,!cª®äÇUHjV6gäÎŠR)PL3õ<ö·+ƒM4(8  ’ ‹^Y    ¯!	  À ÿÔÛalDµ—WjÚ´Zs¦À” =mÜ­¾|â5gO×ŞÃ÷-–éØÙ¯
Ír`>A”––ZÚ°æ¦Wp˜«·b¾á>ğ…Lµ‰À
¨H{F@¨c¶P¡QÜXàš!´Şş„ é“Z€d6ßz4xµ0Ûo‰ÌÃ:¨¢×½-„§^ ˜!Õ~îyŞÌëÙïŸ¯•<	Šb-¹T¤ï·RĞ!¤SaQÅÌY®ø«d>qšRákc¤íÎØ˜é®©Dœâª7ŒçšE%˜Bc „À€uJìã­ë&/BûşZœXŸQ&çşJĞÒQ ƒOlKmlö{M<“ï³a®Ğôï>Åb¯:¤L0È1Š=†¤T­Šg	Ä|Z÷l’h¸ÓæİL¼)Âz@¾},fëûå0‰ÿµ‹ó3JÏeæÂÀ çmL5o-õ‘ßëás¥¨IB‰Ìì®¾0|²ãÙI$cÅJ>sCŞiöø-ğûyŒÅº  – ‰^p    ¯!€ €ÿÔZé0F!Z:h73»5‹Nn™¨@Òóe¸ÓğÊ•9Õ¾µÆ!¢ôõ•Étv³Â>éõfÖÅAJ•(sKå_Ú`9J 0I™	:ÅpCÑm+7wcì·yE>b2—y‡‹h†â<qN•®Mì*‘¯†-$‹B’OI$’P¦b ]™°ƒ°d‚Z¿œq>œ¼ø}{èÉdòFŒ¼ç_‚­éĞ­+bNJI{¥,Ô•”pOTRL­ûgjöiB5”PCö×KŠE;'zZ|%†„Æøº™zxbJÎ˜ŠÁAæùn¥ÃUP °åŞ¢ŸÖ;¦•ú™ÌUà}ÿä½:Ë=‡ÀW³-’[UOeœZÜ×*ŠÙœİéQF¿ÀÊSœ˜¯×'o~=JS0;Á D8”Üó²½é&NWÆ•İÍ¦¸¦×mÒã+C%Š†ÕX^Ñ¸_–RÄ©	&yKæEÄU	Ë
öü+¦|Mp†›w/CİŠ3jà  ” ‚^‡    ¯!Ğ€ÿÕZ)v*X®zª…œÜÈU)@€C¡/³ÙS j”öË0¥{G/³äP¸)ÜÃUzĞí3VÚ†Ò¬9Ÿ[ÿ½¸¬’F`ˆ"j°Ï;ğ¨Pl	*öüæyš½”ÇNY.±h™H€âTz†ŠgT©Ë^›íi¯(T´+M›v‹š)'xÒéœ"åìì‘°Óì9“p¿X‘ãj‹cón“ù’X¬Ô
aB‰˜Øc]óh6G5¶îØ^·IKK!m³|hB%Ş8µ™âe‚tÊKT!dÁ€‰š<³5{®ª ¶Êİ{ˆõı0Öäò—&H•)°5>¨m·‹V†È½šµ«>ù"ÖŸß˜çàrŞ	Qríæ"oğ¶"Ÿˆ¦Ñ×¡_”òï¼†Iû¨Ã; ¶˜·û›¬Şwãóıy41ù3Ùºî¨Ê¢p
‚›Š::ªO@©!HR‰³w"â8   –^Ÿ    ¯!‘µ	ÿÕ[(–VË”IÅ¹¥Ç.#/u2Q@”ºŠväÆËDÄ¯ƒĞ)@?† <ïÃmËÚÃ\rEB„ı	ª.YÊiÍ‰kKÿK.:H{ò“1	w<o÷ÂäôœIT-®€ùY/\<ÃÛŠ‚E²ÇÃ¾H^"·ßmrX°ÿœ€Ô7ìST™?°2ÕGT¡[dp^†‚4¤§jt'I–ë€²&àj)*¥NWñxä4š¼g8œUØ”À¤»Ë#İ ¬U¾J=OnÈÒpİ°ÎW×ª0¼PWdfuàÎ@¥¶² ¬$D	n³GÂ)Ø©Í{Â§Mlö·ŒFçµ¨Ò†TŒÜÒœ7$Á†o=·ÚÏnc¹á»WÓ¤ü+¯U'@®€å°Ø\b‹…;ş­Ã‹Ÿì¨˜œmî0_uùB
-@¢¸sìš4¤V™5e “Ô °ÁÌ"”ÕŸ?÷8­²Ù°ûÛÿ¹õ2³aYK³vÈÍ5ËR|U­m\A<  ¡ ^¶    ¯!à	ÿÕYéPv"V¹–Wñ™W£—k(a@‚Æ2÷ğ·ÓTÇÀ£Ø&$±¹$å5òªô³9KåôÏµ£ò#»8ıìO#Ó.Jp$FèlÆi …€à‚iÔ6A=â†»8Ö§
È°îlp–h¡6ÊãlS#Ñ•‡=øŒ·¦ßZ@ÁxH_óø[[šÔğjoZ“×™æŸ–,†^Œ„+|‰•ÉÙwRîç3ïWqµít”¸!zL•j™kÚxƒñ¼lñÊÒèRêk¾½ĞMÔ^ÛÒœiW!²‹<”–¶D††A …Z·•rû»×©ª˜”ƒßi¢(?`gÚû$Uü…_¼µÌ{7Õ˜Èïâ'Uéğx"ÚwTÒ­üSnRóÑ¾-¢KÅ|æßÇı"-s¦éİTØ<„ÉJütÏ¹,.U@ q@°Ò,q:}toİÑ}3FÒÛTÊ?ù_r­ñ.ê«<ûÙíÒht¨nšåwt²—1Zİuk¨¥„Ô³¨˜JÇ  š ˆ^Í    ¯!˜À	ÿÕ[!Œ$-Kc	ÀTœç½)"¬)é©º«Í-^Yi¸Y¢úõèê4rØ¯5¨2£y[î§ÏŠ~~Õ™ìŠN9``Ô¥÷â‚ryŠŞ&MŸçÜ¢¼§j#Á2(	XÒ•,ì•—ö\"G¡jöNJİ¹ä^ªƒş—jÿ%÷ıÉ¿dºÂ²R3x«aCÕ;İmª¶…æFÆaTj—#"MÑºH©ñµw­"ÉòËWº]Ô§‚óàOŸ$Ò½a	 ½®Š”h¡¤UX×%©­PÆ …„B‚J#Í%ï†Vk)klu23y¡º‘g›´m/ĞP‰,Š‚ò‰n“à.µ'ln˜¶Õ©Z‰4¯¼‰Èc¡^»¹©ö~‰‹”CÑß&P(pxÚ¯8kyî§’¬—Y	"*ËTım€vêS—í>J»İ¥ÄO† ±ˆ™x5%çÜ2w?lªÖf*n©Xßd)âÙUU¼?Iqk	  “ “^ä    ¯!Z€ÿÓÛ)6*VsÃ"N)Xh<WœJ¢b€iy¨Ø§)ívÚ…å‚uD‹¾™:ÍÇ¶OR”9#ç*Dœ—œ†1P•”xDlån’Ç™vd…utŒTIV¹œèbOjmq˜†
6ÀF Fc9vbh-Â~É0*k]+¥`«‰­{€§kJfß>vÎÊlÙyz9_´kÈşdüMSà×#RšÄñç|ÛºS˜·IìéUZWdBô£µ‡îŸrÄğ…õÃ’;—UÃ4®¼MTN¤é]V%sÚsoj_¿©p£µÑ ìD(Ì…Î£ä©œvÕ×=s*éVîœšÂØœŸ{Ôg?1ŠåhiVéÿû{ô¸œ;§ÙÂvÕ»ÔÎfÈ«hìª˜#k=	T„çŞ¾BOxÑ‘:xÏœ˜—³£V9¥ApÆ£;O9Ş¶@²¶¿bIkù¢Í=±êÎõÍî§ÚyÑîûÿêQ¿Ua]=…O—„¬´XÇ¯i¿I¤˜
Zî   Š^û    ¯!™€Y/ÿÓÛ!ˆZUÊT …ËTla/fFtw=1e`S‹n%D_è³Õ’J>¾¡ƒ qQh¤i’uÖxm…•;+kco½>ú,‡ÖÍñ³Ğ‘8T‰NXà}³½azQ\MA—u¸¡a]7AM?ceø"&u­0È'Jp¼õ•_ƒÆªG{)(‘eH£3¹æs½ô¥«\:lµ\jºÕ…´àB+X­?<.Ÿ^¿”ñ-¡n’$Œ ¾JNÂuÇ'Ô…¥;£Æÿ8&/emZw«d*TÖ=(UJÎ ±–³§¤ØiLd(Œ‘‰#
Š¸Ú7b7Ü¢°¡™á'§ÕrÀ×Jä¥æœàv.‡£QoãÍe½RÀç&Ÿ	 Ù‚˜²DñU˜$|ˆ„ˆºeZXò]Dşüzğê5¾a·º`V* ŒÅå:ltµiõUgrÍ-,¸È^û÷õµò'¨Sà®ğ-ÛªäœˆM¶w·.Lu1• ”ìà  • ‰_    ¯!™€ÿÕÛ!ŒD ±åÍá5Yqiâá2„(BÄ"1¹©şòÕxï°ÊY+d$­²øœÖ¦É”˜©}
	ñi`&]7ßaBÂ*İ`#ş–Tvò››	†AJª:D Äº”0°sG Iuu‰¨ï×3Ğa:)_oˆÒe(€•
C\Å¶FSÍYa˜K9‰!×•ì@ÎhÓ½*‡@0yœUJa<€¾Jü‘”B;Rqu-jÔd¡ğÆ£$n%KÎ©ãQ«Ã$%İFØV6Ùbní‚j:T1Œƒ‚
ÈİÇ:Õ×y*Œ”'@'÷©BóYÒÉëìEVÔÒ˜º>s|*#ÏÉ²Ùxö5ÙœİùTÕÛÉ-vŞ-“F]1¢È¤Ò$Ö"Ğ bX¼‚*J©ÄÉ†$ 	N#"®ª(9Åï¼O$µÂx cœ#0èU(ïD»ºûåŸ ¥V†wµÇ|“Ö{lPTÚ\P®jBÚÅª½%•‚Öv¹Böà  ” ’_*    ¯!‹@XæTÙ@T˜C,]vÔi0ÜZ
S¬±a
Ùh¤=Á§òáJÿ’ Euí<ÓÂAs›sã0—nVÀ¾âĞDk«L¤e2g-pR«½=H¹%$H›qV1g¨—Xİ\x¤ÀÃQÉtİ],‹Ş©ä²Èğƒˆ\n‹/š–– +ch¯>öC0¨Ñ+¹¼r†„ÈŞZø_åVñ5Šj£¥BêÚQNµR7$"•X\êìÏ[”·<kqŞ5Œ
²]Z\«Œ¶ÍÕdä•›P’u3 „Kè¥ß)9«­êª€ê)xG4ÊÛ3vYî¡#×8ÓP5ô¸ŸŞ= fGµÏ¯¿¨m@O0­)Ä6ƒÏbÎ+I¦­•‰İÖÙ&mg$Ä7Ñ“4‘2 GÖ~-k¯¾­,Lu<·Œğ6ëxRhXº‘”š†¶†µ'¼À Ê×7~éçöä€œ“—t9ÚU“Vª v€ ??fı^5¼(®¤ĞÈ•©dp   _A    ¯!‰ ~UÚ(¶(C
,qŠë»@*ğ•SPoá[{Ã\^÷—]ÑĞBÿX´+™~ÖOê™!¢¤A„!Bz'*4A·ça°}ùQlìæR~ÈÁèçÍiôJg2Ä´$9((Mœ oVvÜAïıir=ÈW¤ÊÌ–pprI8¡6E„e5“Ğy-ÿá°;J©ıÖ³Àõ¯Œ+âm5~jOöà¬nöy¹BÖW"•~ˆ
Y¦—â’»è«-ÈëwÄNsİUá3İS­¹ŒL)ŒTöZk)DI8;¾*¼QST•}ñŠ Ö¨Ùê_cmc&şÌ‹Duùg¥â€~ÅØ}AòÎC9¸òd¢í;ù~ßáÄtc•+I%ÈL€u|š’´ß'“y”å§‹Ğã..ÁMú…À
1³@ Çì†Ú^”@ŸxªV«ODÆĞK$ºf2Å
Ş»P 3ğ)C†ø-™ÿ}x&Ï*×ù¶ºÓÏÏç…²ÉĞ¶wbñBÈ;– Šdq0§R¼  › “_X    ¯!É >UÙ)P¦"X…is-\ÒóV¾W™q¥Ò±plèl‰OZ	Û‚²şÅRå/´plûFÁüÚ +ßæİh<Âb¿PêJ‚€ÉÁˆD“Qprß}Ü
X‚À²Âı4˜kìæ–h”Ü©Ô§P¡3ìUG-4,-ePGl$¦ƒEœ'J˜
-ZäfPÂ4‘€›Hèb¡+%ïœõ>A=©€CVĞ°KÔ9œáÕá•òTª—'×Ô‰)¡XÒ‚ì™‡Ùl·^iÂº—!Ä´m9)y/	]S÷RÁl´X;‰DJ©«Xxğ]^ŠcĞHn}'ğ^¶?ÖYÿ6Ò´–8ñ•Ô“ØmoÊ)GfHÎî>^AD€q\³<ğ ¶0¨Fïœ±J ZV¥-x \";q)›rS…dËW?hçP`_"û–±9úoÇYW¾ÿ—ñ¢Ñş§§¦½À×qÅFŠâæ(v8®òÁJÛÚ^th2å¡iY=)éµŒaâB2!ù0Æwp   —_p    ¯!‘ PXR\˜•‚¾·¬åDKÆ8æ–SIK¥ÀvP¦¬Näú¢¦L°¤Š-\ãß†—LÁÃú„ìÑèÄp¸SÔ¢”ÌQÇçrË,¦iïqR«–b=Ğ¬qááÿo?¿ÔU¯._s¨'S(1l³+?IR‹%şÙ©
òïmÊL »ËtÌ]ªŠ_i¾íãUyduáIkÅ­&EkXtr‘‘wb…	Ë†¡@]İ"rTè[7š­ØFÄæªŠ6‘tÈ§z<VëÑËD)Ñ½(œ­ µ7ë•Uª	a‚Xê œ"V~/YŠëÃ@ºæç+U‡š b¿VÁ™ùó<ÉŠÕ½PÜÅsu|è‚[3à±óÿ	öü;¥zë48ñé(ğ@\eõ«„®ìhCûM.ºü¤•MCUÙİŒQ©Ä9)á›&f8úŒÈn	d(F•s™ÕĞ7HŠ@ŒfªT³ PÎ5Ëmİ_®hèê’r±JßU®‹q+áã	ÁÒ³J %hËÂ¥%  ¢ ‘_‡    ¯!Á XX[TÛàŒ” °¥}Ô)Ø5W¾}±Ea`iĞgv¸­™5™pë$>lï:­ı†ûuï,`ñªk‡hàˆŠpíõcQ®D/!5]W¦©ÈŠÔ7=:¼”&#$çZÆ°b ±lSûã»³TÍHUåËÊó;ú‘ÍD¹q$J`©2Dm,ô£ƒ‘8§Bæ*oŠ»àE.=ÉGb.úœÇ5ã |İbé<Æ’x·“â,…ÇªFíÃG‹¼ ¤k¢*‹x®ÜÕ¤cXm‰ó8Jó)Ih¦2@"B!5Îœîije
½PSqDÆ§uõÌÔZ8mJÇ²¨ğp^Ùï^…­	ÎP]ãß` Ü:³§˜@ƒÔ›‰FRK"r@¡ ‘58×î¹ê3$²Ğ4Eâ2‡ÓÖ	]1$–½û… œ]§D9Éë‘ †LÊB{J° ûUàèïÛùDŒ 6å¯EÃI¸sH,i!U”& áë5%ÌDá	õ¼ ÛÀ  œ ”_    ¯!Ä@XTY(Öˆ;	Â{BTÊÙ+Kfú¦
YD°ŞdÆ;á¾£R¦dé'|)<3lÁîj…q»-p^Yí’–Ì$š@R‡\+.ƒ^¦¶Q¡ yU”PÁ!ç9b ÊH
¾úfRmNrr÷XÆÊØœÜ ôñ‡zS?ˆ 1/ø¤Š/·„/´›*¿”P©6z¬ÅŞ`Ø3@ª¼½SÁ&b@‚3 ˜I:(µ…'„`ı áo‘(ÜÍ*¨´şô!`†öâŸ4Í|„¨ÊíÎqnk9Rß•GkØ`ìa
$ˆAçvÎòàªj³Œ•€#Yä»AâK#jÕ®ÂÏ±X»å[“îÕµÃP¥gydeöq‡ÕÙœS=Z/ÙcÆÁ§Ä¢pàZt]£R0¼ğšGD fU4Åd{SK=zæÂâH•&¾m?Á·
¨ÆÚ• m’p3wîd2”aRĞ×o/Šõ•¿öƒ4è¬±t½\ÊGß­ŸF‹B…N  Ÿ š_µ    ¯!É€ÔÙ)F	ˆ¤7:^ìªÂ«„kT.€XNkËíÏ$‹İ„e—ĞÛw»4IÙ#Q'ø)•‚ŠÁ¢wçL÷€ x!ÁòF‚í.¸·$`èBLLBq©‚IK<ÔâÑFGä@`Şÿ JÚØÄè–-±õ¢ ;kbX†™àBÔ¢Äq€\K9ÌæWÏîÙzŒÌá-î5sBëÙ×w½ñïÕ3¼r‚çÔ’Q‚=‹âÎR:6„XÕ§®-· ‡ZUNúº•´µ¨“;¥@nRy±—©­°’	†‚P‰AÚ#%sŞ®énúU0@.?†~9÷×**9s]'‹â#VK4·M¬Ó)Ğ °£ÖÜªì¹ì\¦ÜA=ÒtnØuª–øAC„™¨;s¬šÄ(f$È"ğwçºAo‚#”™Ê+åéÅa@åtÓ–¡²X	íRDŠóµ.ªYùİ…“˜wqöòöXß¥<tÄç¹qœoÑM sÑlZÔÙòh
?İ=z©‹€  ¥ —_Ì    ¯!İ€Ó\!DŒÖçZˆWIéĞÅt<S¢!*ß=3³›»z2ŞZÛ›‰¼™ÄëSşnùmòÜ‡™«EÙ€²Yù
@D¸A‘ê÷Î£ŸWVQ”¥»÷3PD´cŒÁ)D0yÅ#Eñê8‡Q¯}l²³Vá_×L d–è	vV@8qE*rf€Î‚ã²ª*Yˆ(nèr›‘ì§OÈ£¹^«¹"İÜ¢®û³ö[Ïøí"æ¥V¶»Ö¡}ÉQ^¦óâ‚
•v®J´¼æÂIBÍ¤‰o«XOsÁÛ=ÍºmÍ:Z×Veq¡[Bô…-2Ãd Ä †^_†3vµWQ€«ìgˆ+—“¨:W/°¸ÑKé¿÷*ŞáÃ@İk?†âÒ1¤ŒY`¸·,uo“/Ë(«óœ]qdÁ_vSHHczMÒ®u	¾x|ÁA—'ĞûVlqì¯Ë89vÔbäê':^ì¾º–™cåCµÌ·ãôÒ´Ww`¬,®ïhÇŠ€IÅÖ)cŒ&+Õ[ÙÀ  ¢ _ä    ¯!
‰RZ]ÑÛ¨J	ä‚‡cË4Xl¬4nj{tRÓùqñ/üÇ Ày^5!Q1”5yh“E5ğÉI»Ox¬‚tšÅáI£ÕùZE†C¾+ œ×ÎîjoêJtäçTP(ğß¹€H„uO68%¯÷SQj¼××X ñMrm`Q÷¼à®õª)y,X¦y—å¾ØÎ_Ô-(É%$Uê/:™ĞçÍ—O·§„Mg’,2š¹kä¢Õ§{u^°µæÜ	3%,-0UŞÉAK!KÍ¶\j¦ËÒªà‚*#zKT(Ã À‚Œ*ÒÛ¨
VRèRœã&v6‘jeM.¯‘9¶of·æÂa• Ï!)‡şì±ˆ	LÚ_Ç¡2‡‡éò®H	! ²Á±J™‘D++ø6›-²Ø—¢ A6qÏCå¨1ĞY× £¹†ãü“ñµ_ò©kO–”BÖ¬–§ÁÏOêù§©^ïBZ&úÓ$kxÄ
`ßößâ…ïÀ  › _û    ¯!	sØ_ÿÓÜh¶&4„a=y‹ÎzEıøÕdÃ/ƒ{Q¾u¹+Ô5úf8¹¿•qLŸ0Ë 5Qäæåáü R&N¹C\u‰ÓÂ¯W" pƒõr=Ñ¢~Ñ($ux2Ï¤@ ì”á\,eÃ½ù«m ŠiÒøW“hÈÕÈö%¼µl’L¯ ë,–ğb2;·’t¹” EÀÃ9’Rd¸h„ÖäB6(ÊjYÒ4ËX+·}ˆ…êC0Fœ`‚Éz@ˆÛg®ãü¶¹’‘±>tN2rÚy?iAe™—¥#ûQVbt½i;&R]Û:èæPÄá%(mT,†¤[Šë•JÅw…jõoGã8òŸ¬C£‹4_$•J³qsª5•'m}ÓøjUiC?NÎKêyŸ‘M9ŸŞÏ>$Oïî)ºïÛûÿØèœ©édj«ÊM„DbE±iö‡õ¯T¼%Ã9ĞŒ·~ÊÓ<†XXo¿ÌÿØ_Î ‹P¹M'O9/F`¡ªÊWzÑ@YÀ  ¨ ˜`    ¯!Ùo/ÿÒ\ Ò&*†¡* È;qESzåxèQûKû>İJ¢˜T)ÑªdÑåH¹Sºê Êª"eC[²‰o‰Št²ÀF‚5ˆåßFÏx¥ß‚PÁ ¾,RßèµP²ÆŒaYïô qŒ¯¸ôùã£öfq#ÌÅ7¦Z¬Úçy³Û TfºhHCÆµqáˆ¨"L
+÷Ë?dÿÉ¸ø6¬ˆÌ=Ú••WÏê¢€ÜI´®wy«„`]Ä×˜fŒ	}—Éu2\²ü0–djre'UªMY,š©^Æ°“X¤´J´6ª+*Ã°A®rIöøê¦½bÉ»â©TPBiºÈÔój€ÎHg=)I;’Kwüq3 isßjp0®84]ÒÂÔ\»‹Ò9 R5zØ;ò/n†YèLè^ßŞ_óá\¢RË–´4cæ-ötë®AÁGDR€‚“4¥­z•Vñ2|å¯¨¨¨Mjâj“,x7,+îì-¤ŒìBi6§¾Éx  £ †`)    ¯!	Ùc½ÿÿÒ[˜tH3†Ã€šÀn¤ÏÕxóë¹1Ih#ŸÂ^.
³aO†ûº}_$c-‘è,U\WŸ®)!a-u# ˜ò!J`<à–ME„ÂeÃ=PÎH+âB‰˜•9+ñ4	xĞôQn¡;[ĞQ[Œå¡bœ”Íı)08‡†ŠÜ(ïHS%.dkÇÍ’kBŒúÙP_ud¤ˆ<¾ô‡"¾† c˜ ˜!Œ2{jX±>v1‚•Ó€ÖÁÃ2zy´Ü˜ÔÉ]¼åÚÖ:½İ1ˆ—c"§
Ñ;"¢p0hAhòÕ¢hjE¨Hœ%(u%Aa„`Ò›òİ¸r*²•€õüsl4¢_$Xo\{UfÅUÈo‘m{–'#°mHÃDàùœ&´æwœ™O!îÌ]Oa]ù”¹ŞH~(¦!imP?Ÿ:ƒ³"Æpù3Ò$…ÉçÃ…ÏƒO6NÇûY®¨lQ ’pJ»€  ‘ ”`A    ¯!›b„ßÿÒÛá2	+hou¥¨œ—9µSQ €r¯7Ì\Œ×]Ï—n§2'oN³å9/@ '5¸!/ô¢N)âŠ‰ãØ±Ã™LušP¡k
D¿»;ÄÍ•¶Êñ•ïTŒ~:6Á:äœÁ<ˆñÔ’%ŠÚå1:¿I×äĞÎãH fµÆùQ'EÇ·dÀ¥bßT '™V“af d\2ÿı†—ÖeFÑ¥Q‘±7®†¢faó_ì÷ëm×Â/¾°ßÍCc†³,ûQ¯ÉÃBN‰Îğuãi®’(‘¬QÑ",¶++ñ¡¥Øhp†(…‚" ,…»®•‰€“ıN•Mfú•I­NØTúE…&QÚv¼²*[íßTÑ‰SÃÁ
 é{cÙ¡Á&Êh ¦ÁI	J3¶Ôñä(aZ[ÒnĞf¶¹<A…ŠË¤‚âmO{qV*„	r÷Ñ=Ù51`¡É§‰úõO›,	±V¥Û<u$ ;K¶Ú’&`Í«€  Ÿ •`X    ¯!†0@ÏÿĞÛ Ì8+!åöç:áHï\ùÎøS2”‹L@ı‹Æö”Ç;7}Í®&ªãœs~—~O
/ÎH[ólWÂp	ÕÅ”3µå­J(ãhW1¥BC5ÁPô}ÍNõ\‰B*^Yí¸gCŒ±y(E4d”[l.øuSoA‚qK·¶ëÚD™ŒZ(á.ÛTÍ¢Ç¥pJFNSLN¯A×rq‡Œÿ„ÛıIƒQ	œ¥j%¾ œåv=-bDFF¨u?(ÉxÚ¼÷§v²Ñ—âQ5tÄ©[B@’‚]Z‚W]ÚpQÛHPQÂƒêÍuÅUu¶øªMĞğ›®zœôİnx¾£äF;‚œóo~Å¨Ü¨,ûF°\¨íM>¸`KQëÚ‚K£Xp3]Wz2ĞµMåü×Ÿ	Ç8kpÑ__¯ú{òŠ0û|dıh¶™é—çãÍ¯g˜E·®²–(ÛpVÉë·mwµ¡š>ÜâŠšÜç›:Û€Q]«w`Ô)*mc)Òp    Œ`o    ¯!	B  ÿÔØép¦"Xº_ÃÇYgŠ‹¬qTV(ªİa,°§yF(¤^û¯Ñ1·ãğ½ˆù:û}6	wÑOw£:ˆİ·MZ"{kÁ…¨fCL—‚¢ÖİT¦Y‘]O¶¤Â”qĞ©Pº##Mâ¬Ë[OßCXò@2$99[|Zg*¬Uná.„–3Ô3ªÌì.9œÄbèCZ”o^$‰¦Èõ~ı#­ŒíO9«qz×qolœÿŸ†Kæ”éi¹”ŒhTS)°Z¦¸#14IÌ.™'9¢©"ñ y(íÆ2:1–{µK#+59”ü¥Îªpjw¦=q$ñ ñ3`î©¢?’OH™Â6=#Î×	GMŸ<¨ÔªbÅCÈV–Ü7q)a—è_¹A ?Ñ¶¬Ê•k.ó-·_q²¨! q´3Ñ5°¢n5LR>×zójk£«ù=ív RíÂÒWƒŠä½D®
”Q ©’¢…œìÄú®,¥JÄÖ«ãxj­„·  — ‘`†    ¯!	&  ÿÒ[ ì” °»(q™•(Cz¬1Lİà~n¹’:I,\í.#óêJ)Æ?äNŠñeÜ·tóÊÚÚ}p¶—ùtê!NŠH5=¤½f‹d=-š¦dÆ]V,¸o¶ÙƒWæ…>d÷rèé!‚®^oâËÂBÕ\ÖY„BDÎ©]H,´Úºúª¸ˆ¨.˜ø'ğĞ§¯G—/ç@h½K:Zw¯Èêò¬|¶(oÓL¦²AWc,…#ôªá*¬ç2ïÂ! ê"Š‘
Ä\¹bŠ;\5Œƒ™ë©­Jîë‚¯&J¡A$êÌ½ï˜ÉRĞÚY½¬¸ÉN]k£aK­E_f04zRî-z|Ğ‘‚Ç¹ÚwÒ3{k±Y[Ô\bÍÓÜYxp‘¸E³5 	ÃoA8éJÙöS^`ë!Sâ Ãºl®\ÜPŸä¿eWQ:cÙÚ6Ú—•½.Èh![ ĞdRš•"2UÆjÿcràÅoY”Ó3ªH€ëç:Ã˜à  œ Š`    ¯!`  ÿÕÚ¨p¶Vtº”Ô·ÛÈçI’¦G; »@#õºá9šûë•J9fÂÜ¨é[?ñ¨ÚÕd ¨Zïè¸x`˜o…†g§&´hëÅÀL‚4ô€YMÜH¦•t¢i°Q+Ê¨0”~.2J%m€GÓŠf‚­É†üäc×ı¤Z½ÑL¬dş™1®¹/¤júIø»¦ú—Gmœ*Zâb ÁÓÑ˜´É1tÎF/£ù6dn¢KØZX¬ˆR¥±ªBUnBŠÄš
”Nâ¨IÔ š‹‰ë]ÄA0€Va»lbPsgïøP{gøÔà±â	´éÿ¯Î#X¿HÆº^R.ç)HZì&8MÉEƒ9¦Ú¿œÓq"…jtö–ÚHİ3Îq›I¿&#Á·Ÿœy±ĞÁ x¤æˆíä{§ÕÂ|¦w›kLg%Ûæ7Ô²L²+¢vFä)+c7à¿6ûnÖ_¿I‰İ’‡gğ's"
\Ê!B˜»ÚU´ªC  • ‰`µ    ¯!+  @ÿÒY)P¦"X¨–¥Z™QKnÅUR·L	|
óö5Q©×rú¶÷ˆ?n½áÍ1ÌÑ¿ÍÉìwÍãóŒ'€{t•Èİ°t\ó5ëzpÎJ2Sp]’.˜l‹u1İI¾K"Ï–q,ÏcU,ÉU2–^¶"±
mÆZîkD¨Æ@k–[Jkì7>Èd“®t–CGPúvÎ°+l°ta²3†«÷ÚLÉ:ÖR”x¸¼ÂW5—ÌÛY7/QiŠp,aEYNÂHÑc\  ¤HŞI„|Ò£¶Cˆ1,Ûu™\Ú÷ª±ES1 ½§ô›uÓš‰„”04^NÇ"úßØ±†1·²\¼Ê¶úƒ¤^&1®áE=¥
°ÓS‚¬AÊ•sÜ¾Ãİz»2‚a€ÄGÈnŠ5éG›fV‚:0Æ\áÆ©º0¶KÑPœ•ßº™K³w„]\”Í•Oœğ³Çm)3-È5ú{G~|=É&(İ/…':;ÁÍ`Ê/ˆxm(¡À  ” `Ì    ¯!M9N[h”M¶§lÇ(„¦ÜM°ÄÂ¨ò¥Td"êèÜšª"’fWU@Aäm‰LßôÙ¹~Ó’r»‘?€q’º|Yß=¬ê#ÃP·†[¶B‘X¹O¿N¬
S{Ş#½˜'»SêV°é¬sĞ=aºÿ9Ìóë3¶¶WÊOÅÒTLIä{±ÄÃV“¸åh‘¶IqªàÇAU<"¤½T…A«§Å·Xrùñ¬êêÆg#àJ)B‰8œ¾Ò|jXdoŒáXÎ«@Ğo&ğ}ôŒf—× û$Œ5B†GítçWù­*n¼~5ª/{ÓGĞcÛ(Ã9ôõ_¸«Ò-Í¦|[q¯ŠZL¦	J¡Xÿ¾ëlXd*¨÷M\Ôái=6æÚ^OÏ>Çwn¡P‘Rƒ¤Î.MŒĞ]d¢—ĞhìÍ+ŠÇ>uw(9KİÅkºÏBP_Áùß+Idçg~¨Ñ5èOÍ´+kË"g*¸”’‡Æ˜¿›¬_G›ã‚n2¦L¤ËïÍèC“hÕıE”fZ|¢ÙBu{ä.pNå1¹/YB`ìLî_ïXÜu9¨æ:e‰ƒ³(;­®]ƒ‘1ya†²ğ¹;»:ˆ=óú#öùÖèü5†…x1:4¬&º~	>ßÊ8ß¡gApĞéæ‡™“ìPZ4Gä\”Ğ˜IíEt¯Ş4cÈ@‚·ˆ8  ' ª`ã    ¯!{=ÂÅBŠÁTÇ†jÛ¡Bâ›eôTcßô˜$-°ï„éiÊ Ó›E+Aì¿;¤‹8q4+¾©ÔªÌi˜Ûš=,‰ +ÁP@ª†‚H;$.2K¥FPï·*Ã±Í˜ˆ'.!X „7:¹ÈÁ¹mœÅÅÚd•Î©g´–C2„©§±ÔÙQÌPõ7Kù¹^rPs X-K
˜. Û¾Ó\"Ş„ò4‰BMEKa9¤•òÊÁä¥c\,”´î.~“w‰JÇ©Ä«ÁUp¬ëeë¶Ó 6º$!ˆ†İfí2ªºÛT ÙIH‰‰=gìê¬>n›İ‹{‹j‚ F…Wº9w‰ã§ûë”Kñ	Y$@ÇYÊ–A£>C,&ĞÅvÀŠD—DOÆl~œ	ŠÚJQÊeI”K$¿‡V–%{~ÖB;€K*¹œŠJ##Wò˜Å%3+_:.ˆ˜V¿Èhb06R²8xS~ó}5Hæ7ç«t¨óE4“… ;Ë¿ih’˜#Tk)÷+ä‚™ãÄJƒ„ & 8  µ  `ú    ¯!@  VX©V6Z†İÍ1O],_5(»ÌtgnxÎg2îõûü†j¯µ(|Ë¡ğK}gıW9¢ªÌód¦ï@iW°ØËÍŒbu®ŒîÒØ3‰ïÔSÕhëÄq¾Ğ±ÛÄˆû% ·ºXv2¤àMawË{‹v6êbinöów¤r¦EeUï_Ö7íL|ÇwŸ5Àbí¢ŠT¾J[×ÎéÌ¶òéJpÇèYGäKK²?È¥¬Wy…òEÅe ¯d¦¼(º;åUj¢²‘µ¸vòğöù‚RgÊ( º»ºÖå’OâïÑê9‡ˆŞJ“Š])"¼Ñ<ücæ"¶ÅœŞáf¹8ZáZ÷wØ;Ïu×'Æiüg’·ººjU×F8ÆhÍƒÁÆ)l.Zæv±«t‚,	ÌPÏƒêÏ½w…ÈšJsïb‡st"Ä—l”]8Š‘¹ËÙÛ=˜€çBpL,¦İ{¥)-…”¸–¬”6K
'sÂp˜Ÿè“ûFIs£	Š~é±v˜q´o	…b¦«ğ  « ‹a    ¯!=®ƒ€¡ÅÁ:VÔî©ei€Œ,»A„ÉÀ•PE¶yk¿r·5öšÈÕ*r[&µïZÒ©¡Ò®8ÿ”Ñ7s[„º¢ßB`ÌáNĞ”§TÕ/Âò:ÀB^Ë‰Yı	°“O]¥ºBåY‹Ò‹3êI¯ÀÇ"gÌõ<éíÁñ¡…DAôotÒc#ŒË|k ûn¬¥îËóFÂ+ú&ˆ”'JÚEla>N3Lİ-NSb‡¤FÌĞ¬ş_oca¬krˆ*†ä’ª·±à,$°È»KÅ*rKÙB-,%ŠúÚ×vé*æßZèØ-2ìÑÎ´@ó@§¬¾î”#)àXxÒ)Šœ£¿¤„€Aİ<êÙ-—Z+%ûµW¿$±Ñ ¤`‘ç8ÄÇç3`Ùé rS\†ÁZàx·HJô™Y ¦#,h[WÛ§ñ…o”ï.è•táR3Y¦fXY=Ğß·fÒFMò˜¿„+ëiKÄ5Å*C×NœFÚ&Qf­ï‘
¶Ü  – —a)    ¯!	 Õ[`ò6†,GHçOÏí{»­Rò…,Ö^h°GÙZK,t|ñIi¹éCoÜı$Áàî·#î¡ÆÊg@²Ñ±õ÷„¬ y9é-gÜ1HIfÒœ RÖQ ÙT¢F*•êi£.&ğ÷ônõ¡Œ´Óš[h›-šm{„€ÍõGW*‚î$Óˆœ"­8º¨”†@9ãÔŞGuöÛ@$ µR¿ìuYi!9³,Ã#¡¹ÖhÍ‰d¥ym#Fbèàg:^«8Eú“vßg) 	&´hì´ˆ3)	—Z>J²5â*J–89¤¹^÷Ã2 .pãMO…×7Ìª¥Ø³úWÆFâÚÀz£'Ğ= Í6Æ‚æ
…n„™J0Tp3²Iô$cì4J¡úuIÁ÷ø_ÉE›D¦ „ııı)ğĞ˜¶ëwP’p=å´ÊóZf,ía´¥úâ°p¤Ÿ  % !×VH$-N•‚N)ßÑÚ-Œ+L.[‹§"œµ¯mXIê8ZÊÀ)(8  ¢ £a@    ¯!˜ .ØÜ Ò&"Xâü­µ¾K£Sn¹ŠQAtÂ´œ$Õ6şsqaÛæÎT0Ôí×Éd{Ùœòõ¿•mn ˆïz¸w \%¸pÒDëPdbÓdÎ––…ƒaTÕ IÊ*Ş*0qÿ:ğ8TÆ¯‡Ñˆ=±a¶VÈ°¬„Ê©]‹° ¨jÒ¥JadzR#–ØOAÓDƒ.ƒ°õ÷ò{:ÄVØC+|°0ËZø¸ÕB·#MPGAÙ¿4R+Ÿ²4¢1]{-•nÉ#	o™5sºPS¼é%ª-ÌÄ0 A ‹V>ì-Ş¢Õ›¹JE¬€Ùµ%ƒ—³–†–ÇZ²dµÆ¥bÖvÆ^Ü&=Õ‹ŞUT`}Tee4ğŠ¶ÿ¥i§ÕÿÁnx‹¡FrÏ`½7éÅFôö ZñaËÒÀÆ–”aú^„±<	ÈaOX`UTkãÔÃ ®Ä$ÆÿK©¿óm
öÅõ,écëçŸ Õã²Ñz¨»EÏ’ŒqÿJ	_ê¡éÙÇâåI”Ì™rğ  ® aW    ¯!P¸ ?Õ\p9	
m=‘¸+ÀãÄ¾«·œ¢”Ri›’è“Pò˜”sNÜ©œZ*"9LÖŞ$µñC¥+[á/ĞÃš\—«€°Hğ3àúWmc¶ô˜ÎvÎ¶ á%CÀ[p!N¸2â}gdL0õÌ*çé}°xW¦›Ø”:…†Y¬Ì°^®ÿŞ?ûÎó,±³˜C ‡â&»†§r£2©÷¿ºÚ÷Ú”4àUuSÛ+Ñ	@B3f3,à˜ml¸?u9ÎõevğÛÈ6½!--¶À¯Ø“-ØêRY)PFZJ ¶MéÎôUÕÃ)UBÒÄsçĞ·Dİ7¸'qÿåMœ©E˜"µèLäÖ46N1™õO°®‰Ñ~¤m™Íx£EDíÌB³-¾œ‡É³boPr…>äD¦a©&ëòÌC0¯+]ûü®Ÿ+¢å:d²^I!P€\&SÔ¥TLC”ªH,×Ôg¹`ªişD1s°InOjOÚ »rä»tÊ1Ë4Dn1ÙŞi•tîŒ¸8  ¨                                                                                                                                                                                                                                                                                                                                                            I•Å}xi.{©eJÊr/IÑ/rEjœáj5–ªr”×Í°6(’2sÈs'H«UkGmb¸X¨"(´.MÊ©˜ñÅ ÊRØ²ö
n4´g¯bxÂ}ddí–ºÙƒdˆ­Ö4švhC7¹ÔX4‘ŠMë”„îÍîÓ®›&‰w>ò'~ó…JQ¿7TÕV:Pie*^ìlÍ3©#§ñ9-‡•á:PÒ‘C‰K$«‚¦>@…¬¶`ê¬½7\‰dË^_zp«c*ˆşÓÚ*»"õ ×.a8Æ6kÖ¼
5*»‚”æˆà  “                                                                                                                                                                                                                                                                                       Åöå¬7cppİ u÷JõHGÇgv=·ë‚ª³U¼S/¢Uıä*ÜÇ‹‰wËjFÛdLÊ^s›	š7-y79ô	ãèÑâ‰BheäÇCÈ
$êæ(¾‹»I¿£
}š¼7çJš,	‹‚°aNóZ$Ë,Ë2ã3Vç‹é³Äk=®Cÿ]ó#òG~-OøtÕ¹è”¾ãİôÆ=a@¹m
ue!™†±ÒÔÆˆò^¢S…5RJÆ	†ƒ¸z#L©¾ä¢Òi¥ÛÌdĞfÌÙú¿h†Z¦ÚDõ™´<;H§LTîÍIƒGş¤aO±ûd¡$¸t¶9¶„)JB³FZ‰ÿz vÜ[š01|@şY+wÔî5fÌº*äÜA]+lØW©=‰SÎËı/åÒ|OZN¹åk¢ÑÈ£cŸp¨¢hn¥¾³1'Ü†ßA°ä|µ*Ï²¨öºü¸÷óXA=ºÜæ®ù‰Ï¼÷ñBÙô§© r}œ%0c8ÓBû]½]}ó*ä…:á	œÈRïÃ î½ºÒÑëïBodH_Ws´m°ğ€²Ï¤? ºN»@Pª¯C“¸Áqˆ'Eº.
;Ğ¤½›»ª§Aw)ní¬{R™>HüŒrºS¯K.¶*îªKÏşæiÛç€%K¸j@Ï“^”Ïz‹k?èY°m	ccş‹ü¡Òùåeyv^ó¯½:?qÃíq4í_Cã×‹itÃ šÔ]lDkS`k§]v›kI¶ˆl,k;ì}¦´Áã8Ø2lÆ[ëJ©}r÷FëfÛGk{¬j¶‡>†gœËjÅzZ’U1©g1nİÓ¸PFÓë÷CFö¼l‘]Õ¨õ½ª[oÑ‡‘Å—vWFû;ãÂPÅêƒ6€Í3`•z¶9òÑlû½Áõ¼g7ĞxhI}.gghÈg!Ï=ññÃá 2d1:â !6íªè(6z×ƒëÁ²®çíĞä+[ï‡½Aı¨Å½OÆ–ùl¬ëÉçIsÙ‰RR½±ªâØ
6®ÂÖSƒ8çüUYAt<zî›×˜V‚ÕŒuÙÏL›Zér7gNô_•Æ‰{w2s/JEŸ(ÃUøÊªeÒåbŠERy\øLyˆ¼åòyâA1O¬¤—«iäQ–‡>óAï°÷üqX–ß}ÀÄ†G‡ô2ìHóÖuÛÅ@ÖcmµÔ8ô×
p—ì½?-t3›[¶bÃu¯/Ãæg  Ø„zgÄ
·‘TİµÅ£p0BgY®ˆî·š”Xâ%£«gsô‚#¯Ävæ<(Ìµ(ºŞU"ÃyÎl$KêVµc—¼Û?½1¿#iÄĞ!#[r—g×ÒÒ°şo:£;s<$ûÑœsË¾úløï¯QŞòw¡k~šñ\èGJiGJ”rA±ó
´kì<,‡Q!0¯[´EÉVtKÍv	¾ÅæCO!dšk©ıBëÚQÁ6ı`	"JZrÊP	ÇŞù\PUSõí-›åšF[:Å<¥SÃCD©n#dµ×cM61Š,ÖÔV×¶*|L½•.¡—Pí‰’Ëkªù¦ßi%ßSVÕ.ƒ_Î¸·a7Fôì Kóıp]N™ı	z™ÒõvDÈ•BnÍq<.T…hv­KS	ÑÜ–M…XØ5š«ZQEyÉÅÚ¶wî#ñy4.¡µ=QÒráÉß.)àCë2ÿ	)©Wo*Î8NuËLMbæöÊ$kğ¬9ï”´KåTÛT7cWí0Hr×Fr‹…‹mHå–®723¥ZE—›ê”5å+£ğIØĞ¢E±¼ë·]­VhDÁš¶À”PÄ«Ó4N7Bşgí [ i.ŒNÚ3ŞW'„8~Æ¿ÅÕ".9
K{v4"w¿PO¸EÂ²/±/×”iŒÎ2á‘“Ákãêû\Ÿ…#mj/ Hó|z#S«xr‹©bUœ3Çû,_¾ß¬&$µ3”Pmˆæ\Ş¤˜>K“{ùÓŠ/eøS|ñÒv/÷L¥ŸRõ…šòkìš-VÊ»;æ^KÓˆ~¶ê<£µ`â;I$D.2^\‰uõÙ$á‚Ë)ÌÈ†ˆ”	ê1WuVÙöH£š…õuµSâ ©•¢ŒÉ¾Êd€6-Ùm
›(¶µî  ’–„Ô%×ƒ•‘¶7Ù\1Ô,ù™SˆFØC#ğv^É­#N‰Mm`Dì¨‰(uÅATJd·ÎRİ¹„Î¾Cì,píùÌ‘&n6Ş$™0$@ÔnÄã~kİn…/'ê_ì~ó#1£mÛõ]n…fµŒ/µ„É*}—œ³ÔÑP$ßæPB¶›ÄRuY–ëëëgÜ—»·L˜¦É@l¢ãç]__ŸN'zJeÚ¦O×56Ë/Ú4MİÌôâúzš¦eÉÔõ¯‡aÓóYĞÍ?•9CEuIHeĞ$´ÿZ Ë|”Àj!µœ8j¥€M¥«İe¡5+ã| /\êEK­ôÂiÒŞ<Îõ¥vßôIš‹N4—„™•y¬Züåj“Ó3˜T}åL[aL+–Úº~x“æ‰1ª|²#iJxÇ¹ÀWÃS¨T‘æNƒñ›Ç Ä(P×¬G1Ş7«°q3ÃEÿm¶°ZÍ°Ôü.ÀaºIı§h5è§zyÇcĞ,OÇC(M¯-¥ã”jH©Îœƒ¥‘%şd<´„®-“^÷şıâÅ‹ù/ÿÕŸşà/®_„¤vÕÇãtºûxs£9«j®ÿÕüÿÑüÁ<;áä)ØËÓí3/¿¹¹ùgÿìŸ• @R’áRB]÷„×OÇ¯¾úòş×ÿÕ4Ïü…>scïOCJšs;¤¬2„[Ùûï¯©Vz¡L´o§V±b¢³ZÓ©p•D5ÄôÀ¿¶"½8‘ìpš2ÎSâÀZÈVkT~ÂÜß‡új¦E3m’å0µ$ÕV×a)Ôu±íı1¨«áMÿf§Æ]{å7µckØlÉ@t$Q0uÄ.K„åíRÚWè`®p¾“š…Ãµ¼îsÑŠ„šşèØê£/4cQL£¸¦~é@‹—àbç3‡IIpeÎí~r	«mS¶§Ã³…•ÃzÀ¤ÇRJnvfdLs•y)°£z(=ãõNUNÇ‘ÆÙ–RN§Ó×?ûyÖ\^[¨&"rwww8Çã³€ß¶®yıÈíííÍÍMJ©¬PÊ3D†<®s¤ ‰H½»»ûİëï¿{ÿî§?ıÙŞúŒuÙô8jÛ»‚@u¤v&Î¾Š+jœ+²äT">¬–z­uŸo>ÊˆUDQnsP³‰mÃÛL·r#e cache
                    if (vl.params.cache) {
                        var newCache = {};
                        for (var cached in vl.domCache) {
                            var cachedIndex = parseInt(cached, 10);
                            if (cachedIndex === index) {
                                delete vl.domCache[index];
                            }
                            else if (parseInt(cached, 10) > index) {
                                newCache[cachedIndex - 1] = vl.domCache[cached];
                            }
                            else {
                                newCache[cachedIndex] = vl.domCache[cached];   
                            }
                        }
                        vl.domCache = newCache;
                    }
                }
                vl.update();
            };
            vl.deleteAllItems = function () {
                vl.items = [];
                delete vl.filteredItems;
                if (vl.params.cache) vl.domCache = {};
                vl.update();
            };
            vl.deleteItem = function (index) {
                vl.deleteItems([index]);
            };
        
            // Clear cache
            vl.clearCache = function () {
                vl.domCache = {};
            };
        
            // Update Virtual List
            vl.update = function () {
                vl.setListSize();
                vl.render(true);
            };
        
            // Destroy
            vl.destroy = function () {
                vl.attachEvents(true);
                delete vl.items;
                delete vl.domCache;
            };
        
            // Init Virtual List
            vl.init();
        
            // Store vl in container
            vl.listBlock[0].f7VirtualList = vl;
            return vl;
        };
        
        // App Method
        app.virtualList = function (listBlock, params) {
            return new VirtualList(listBlock, params);
        };
        
        app.reinitVirtualList = function (pageContainer) {
            var page = $(pageContainer);
            var vlists = page.find('.virtual-list');
            if (vlists.length === 0) return;
            for (var i = 0; i < vlists.length; i++) {
                var vlistInstance = vlists[i].f7VirtualList;
                if (vlistInstance) {
                    vlistInstance.update();
                }
            }
        };

        /*======================================================
        ************   Pull To Refresh   ************
        ======================================================*/
        app.initPullToRefresh = function (pageContainer) {
            var eventsTarget = $(pageContainer);
            if (!eventsTarget.hasClass('pull-to-refresh-content')) {
                eventsTarget = eventsTarget.find('.pull-to-refresh-content');
            }
            if (!eventsTarget || eventsTarget.length === 0) return;
        
            var touchId, isTouched, isMoved, touchesStart = {}, isScrolling, touchesDiff, touchStartTime, container, refresh = false, useTranslate = false, startTranslate = 0, translate, scrollTop, wasScrolled, layer, triggerDistance, dynamicTriggerDistance, pullStarted;
            var page = eventsTarget.hasClass('page') ? eventsTarget : eventsTarget.parents('.page');
            var hasNavbar = false;
            if (page.find('.navbar').length > 0 || page.parents('.navbar-fixed, .navbar-through').length > 0 || page.hasClass('navbar-fixed') || page.hasClass('navbar-through')) hasNavbar = true;
            if (page.hasClass('no-navbar')) hasNavbar = false;
            if (!hasNavbar) eventsTarget.addClass('pull-to-refresh-no-navbar');
        
            container = eventsTarget;
        
            // Define trigger distance
            if (container.attr('data-ptr-distance')) {
                dynamicTriggerDistance = true;
            }
            else {
                triggerDistance = 44;   
            }
            
            function handleTouchStart(e) {
                if (isTouched) {
                    if (app.device.os === 'android') {
                        if ('targetTouches' in e && e.targetTouches.length > 1) return;
                    }
                    else return;
                }
                
                /*jshint validthis:true */
                container = $(this);
                if (container.hasClass('refreshing')) {
                    return;
                }
                
                isMoved = false;
                pullStarted = false;
                isTouched = true;
                isScrolling = undefined;
                wasScrolled = undefined;
                if (e.type === 'touchstart') touchId = e.targetTouches[0].identifier;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();
                
            }
            
            function handleTouchMove(e) {
                if (!isTouched) return;
                var pageX, pageY, touch;
                if (e.type === 'touchmove') {
                    if (touchId && e.touches) {
                        for (var i = 0; i < e.touches.length; i++) {
                            if (e.touches[i].identifier === touchId) {
                                touch = e.touches[i];
                            }
                        }
                    }
                    if (!touch) touch = e.targetTouches[0];
                    pageX = touch.pageX;
                    pageY = touch.pageY;
                }
                else {
                    pageX = e.pageX;
                    pageY = e.pageY;
                }
                if (!pageX || !pageY) return;
                    
        
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (!isScrolling) {
                    isTouched = false;
                    return;
                }
        
                scrollTop = container[0].scrollTop;
                if (typeof wasScrolled === 'undefined' && scrollTop !== 0) wasScrolled = true; 
        
                if (!isMoved) {
                    /*jshint validthis:true */
                    container.removeClass('transitioning');
                    if (scrollTop > container[0].offsetHeight) {
                        isTouched = false;
                        return;
                    }
                    if (dynamicTriggerDistance) {
                        triggerDistance = container.attr('data-ptr-distance');
                        if (triggerDistance.indexOf('%') >= 0) triggerDistance = container[0].offsetHeight * parseInt(triggerDistance, 10) / 100;
                    }
                    startTranslate = container.hasClass('refreshing') ? triggerDistance : 0;
                    if (container[0].scrollHeight === container[0].offsetHeight || app.device.os !== 'ios') {
                        useTranslate = true;
                    }
                    else {
                        useTranslate = false;
                    }
                }
                isMoved = true;
                touchesDiff = pageY - touchesStart.y;
                
                if (touchesDiff > 0 && scrollTop <= 0 || scrollTop < 0) {
                    // iOS 8 fix
                    if (app.device.os === 'ios' && parseInt(app.device.osVersion.split('.')[0], 10) > 7 && scrollTop === 0 && !wasScrolled) useTranslate = true;
        
                    if (useTranslate) {
                        e.preventDefault();
                        translate = (Math.pow(touchesDiff, 0.85) + startTranslate);
                        container.transform('translate3d(0,' + translate + 'px,0)');
                    }
                    if ((useTranslate && Math.pow(touchesDiff, 0.85) > triggerDistance) || (!useTranslate && touchesDiff >= triggerDistance * 2)) {
                        refresh = true;
                        container.addClass('pull-up').removeClass('pull-down');
                    }
                    else {
                        refresh = false;
                        container.removeClass('pull-up').addClass('pull-down');
                    }
                    if (!pullStarted) {
                        container.trigger('pullstart');
                        pullStarted = true;
                    }
                    container.trigger('pullmove', {
                        event: e,
                        scrollTop: scrollTop,
                        translate: translate,
                        touchesDiff: touchesDiff
                    });
                }
                else {
                    pullStarted = false;
                    container.removeClass('pull-up pull-down');
                    refresh = false;
                    return;
                }
            }
            function handleTouchEnd(e) {
                if (e.type === 'touchend' && e.changedTouches && e.changedTouches.length > 0 && touchId) {
                    if (e.changedTouches[0].identifier !== touchId) return;
                }
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                if (translate) {
                    container.addClass('transitioning');
                    translate = 0;
                }
                container.transform('');
                if (refresh) {
                    container.addClass('refreshing');
                    container.trigger('refresh', {
                        done: function () {
                            app.pullToRefreshDone(container);
                        }
                    });
                }
                else {
                    container.removeClass('pull-down');
                }
                isTouched = false;
                isMoved = false;
                if (pullStarted) container.trigger('pullend');
            }
        
            // Attach Events
            eventsTarget.on(app.touchEvents.start, handleTouchStart);
            eventsTarget.on(app.touchEvents.move, handleTouchMove);
            eventsTarget.on(app.touchEvents.end, handleTouchEnd);
        
            // Detach Events on page remove
            if (page.length === 0) return;
            function destroyPullToRefresh() {
                eventsTarget.off(app.touchEvents.start, handleTouchStart);
                eventsTarget.off(app.touchEvents.move, handleTouchMove);
                eventsTarget.off(app.touchEvents.end, handleTouchEnd);
            }
            eventsTarget[0].f7DestroyPullToRefresh = destroyPullToRefresh;
            function detachEvents() {
                destroyPullToRefresh();
                page.off('pageBeforeRemove', detachEvents);
            }
            page.on('pageBeforeRemove', detachEvents);
        
        };
        
        app.pullToRefreshDone = function (container) {
            container = $(container);
            if (container.length === 0) container = $('.pull-to-refresh-content.refreshing');
            container.removeClass('refreshing').addClass('transitioning');
            container.transitionEnd(function () {
                container.removeClass('transitioning pull-up pull-down');
                container.trigger('refreshdone');
            });
        };
        app.pullToRefreshTrigger = function (container) {
            container = $(container);
            if (container.length === 0) container = $('.pull-to-refresh-content');
            if (container.hasClass('refreshing')) return;
            container.addClass('transitioning refreshing');
            container.trigger('refresh', {
                done: function () {
                    app.pullToRefreshDone(container);
                }
            });
        };
        
        app.destroyPullToRefresh = function (pageContainer) {
            pageContainer = $(pageContainer);
            var pullToRefreshContent = pageContainer.hasClass('pull-to-refresh-content') ? pageContainer : pageContainer.find('.pull-to-refresh-content');
            if (pullToRefreshContent.length === 0) return;
            if (pullToRefreshContent[0].f7DestroyPullToRefresh) pullToRefreshContent[0].f7DestroyPullToRefresh();
        };
        

        /* ===============================================================================
        ************   Infinite Scroll   ************
        =============================================================================== */
        function handleInfiniteScroll() {
            /*jshint validthis:true */
            var inf = $(this);
            var scrollTop = inf[0].scrollTop;
            var scrollHeight = inf[0].scrollHeight;
            var height = inf[0].offsetHeight;
            var distance = inf[0].getAttribute('data-distance');
            var virtualListContainer = inf.find('.virtual-list');
            var virtualList;
            var onTop = inf.hasClass('infinite-scroll-top');
            if (!distance) distance = 50;
            if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
                distance = parseInt(distance, 10) / 100 * height;
            }
            if (distance > height) distance = height;
            if (onTop) {
                if (scrollTop < distance) {
                    inf.trigger('infinite');
                }
            }
            else {
                if (scrollTop + height >= scrollHeight - distance) {
                    if (virtualListContainer.length > 0) {
                        virtualList = virtualListContainer[0].f7VirtualList;
                        if (virtualList && !virtualList.reachEnd) return;
                    }
                    inf.trigger('infinite');
                }
            }
        
        }
        app.attachInfiniteScroll = function (infiniteContent) {
            $(infiniteContent).on('scroll', handleInfiniteScroll);
        };
        app.detachInfiniteScroll = function (infiniteContent) {
            $(infiniteContent).off('scroll', handleInfiniteScroll);
        };
        
        app.initPageInfiniteScroll = function (pageContainer) {
            pageContainer = $(pageContainer);
            var infiniteContent = pageContainer.find('.infinite-scroll');
            if (infiniteContent.length === 0) return;
            app.attachInfiniteScroll(infiniteContent);
            function detachEvents() {
                app.detachInfiniteScroll(infiniteContent);
                pageContainer.off('pageBeforeRemove', detachEvents);
            }
            pageContainer.on('pageBeforeRemove', detachEvents);
        };

        /*=============================================================
        ************   Hide/show Toolbar/Navbar on scroll   ************
        =============================================================*/
        app.initPageScrollToolbars = function (pageContainer) {
            pageContainer = $(pageContainer);
            var scrollContent = pageContainer.find('.page-content');
            if (scrollContent.length === 0) return;
            var hideNavbar = (app.params.hideNavbarOnPageScroll || scrollContent.hasClass('hide-navbar-on-scroll') || scrollContent.hasClass('hide-bars-on-scroll')) && !(scrollContent.hasClass('keep-navbar-on-scroll') || scrollContent.hasClass('keep-bars-on-scroll'));
            var hideToolbar = (app.params.hideToolbarOnPageScroll || scrollContent.hasClass('hide-toolbar-on-scroll') || scrollContent.hasClass('hide-bars-on-scroll')) && !(scrollContent.hasClass('keep-toolbar-on-scroll') || scrollContent.hasClass('keep-bars-on-scroll'));
            var hideTabbar = (app.params.hideTabbarOnPageScroll || scrollContent.hasClass('hide-tabbar-on-scroll')) && !(scrollContent.hasClass('keep-tabbar-on-scroll'));
        
            if (!(hideNavbar || hideToolbar || hideTabbar)) return;
            
            var viewContainer = scrollContent.parents('.' + app.params.viewClass);
            if (viewContainer.length === 0) return;
        
            var navbar = viewContainer.find('.navbar'), 
                toolbar = viewContainer.find('.toolbar'), 
                tabbar;
            if (hideTabbar) {
                tabbar = viewContainer.find('.tabbar');
                if (tabbar.length === 0) tabbar = viewContainer.parents('.' + app.params.viewsClass).find('.tabbar');
            }
        
            var hasNavbar = navbar.length > 0,
                hasToolbar = toolbar.length > 0,
                hasTabbar = tabbar && tabbar.length > 0;
        
            var previousScroll, currentScroll;
                previousScroll = currentScroll = scrollContent[0].scrollTop;
        
            var scrollHeight, offsetHeight, reachEnd, action, navbarHidden, toolbarHidden, tabbarHidden;
        
            var toolbarHeight = (hasToolbar && hideToolbar) ? toolbar[0].offsetHeight : 0;
            var tabbarHeight = (hasTabbar && hideTabbar) ? tabbar[0].offsetHeight : 0;
            var bottomBarHeight = tabbarHeight || toolbarHeight;
        
            function handleScroll(e) {
                if (pageContainer.hasClass('page-on-left')) return;
                currentScroll = scrollContent[0].scrollTop;
                scrollHeight = scrollContent[0].scrollHeight;
                offsetHeight = scrollContent[0].offsetHeight;
                reachEnd =  currentScroll + offsetHeight >= scrollHeight - bottomBarHeight;
                navbarHidden = navbar.hasClass('navbar-hidden');
                toolbarHidden = toolbar.hasClass('toolbar-hidden');
                tabbarHidden = tabbar && tabbar.hasClass('toolbar-hidden');
        
                if (reachEnd) {
                    if (app.params.showBarsOnPageScrollEnd) {
                        action = 'show';
                    }
                }
                else if (previousScroll > currentScroll) {
                    if (app.params.showBarsOnPageScrollTop || currentScroll <= 44) {
                        action = 'show';
                    }
                    else {
                        action = 'hide';
                    }
                }
                else {
                    if (currentScroll > 44) {
                        action = 'hide';
                    }
                    else {
                        action = 'show';
                    }
                }
        
                if (action === 'show') {
                    if (hasNavbar && hideNavbar && navbarHidden) {
                        app.showNavbar(navbar);
                        pageContainer.removeClass('no-navbar-by-scroll'); 
                        navbarHidden = false;
                    }
                    if (hasToolbar && hideToolbar && toolbarHidden) {
                        app.showToolbar(toolbar);
                        pageContainer.removeClass('no-toolbar-by-scroll'); 
                        toolbarHidden = false;
                    }
                    if (hasTabbar && hideTabbar && tabbarHidden) {
                        app.showToolbar(tabbar);
                        pageContainer.removeClass('no-tabbar-by-scroll'); 
                        tabbarHidden = false;
                    }
                }
                else {
                    if (hasNavbar && hideNavbar && !navbarHidden) {
                        app.hideNavbar(navbar);
                        pageContainer.addClass('no-navbar-by-scroll'); 
                        navbarHidden = true;
                    }
                    if (hasToolbar && hideToolbar && !toolbarHidden) {
                        app.hideToolbar(toolbar);
                        pageContainer.addClass('no-toolbar-by-scroll'); 
                        toolbarHidden = true;
                    }
                    if (hasTabbar && hideTabbar && !tabbarHidden) {
                        app.hideToolbar(tabbar);
                        pageContainer.addClass('no-tabbar-by-scroll'); 
                        tabbarHidden = true;
                    }
                }
                    
                previousScroll = currentScroll;
            }
            scrollContent.on('scroll', handleScroll);
            scrollContent[0].f7ScrollToolbarsHandler = handleScroll;
        };
        app.destroyScrollToolbars = function (pageContainer) {
            pageContainer = $(pageContainer);
            var scrollContent = pageContainer.find('.page-content');
            if (scrollContent.length === 0) return;
            var handler = scrollContent[0].f7ScrollToolbarsHandler;
            if (!handler) return;
            scrollContent.off('scroll', scrollContent[0].f7ScrollToolbarsHandler);
        };

        /*======================================================
        ************   Material Tabbar   ************
        ======================================================*/
        app.materialTabbarSetHighlight = function (tabbar, activeLink) {
            tabbar = $(tabbar);
            activeLink = activeLink || tabbar.find('.tab-link.active');
        
            var tabLinkWidth, highlightTranslate;
            if (tabbar.hasClass('tabbar-scrollable')) {
                tabLinkWidth = activeLink[0].offsetWidth + 'px';
                highlightTranslate = (app.rtl ? - activeLink[0].offsetLeft: activeLink[0].offsetLeft) + 'px';
            }
            else {
                tabLinkWidth = 1 / tabbar.find('.tab-link').length * 100 + '%';
                highlightTranslate = (app.rtl ? - activeLink.index(): activeLink.index()) * 100 + '%';
            }
        
            tabbar.find('.tab-link-highlight')
                .css({width: tabLinkWidth})
                .transform('translate3d(' + highlightTranslate + ',0,0)');
        };
        app.initPageMaterialTabbar = function (pageContainer) {
            pageContainer = $(pageContainer);
            var tabbar = $(pageContainer).find('.tabbar');
        
            function tabbarSetHighlight() {
                app.materialTabbarSetHighlight(tabbar);
            }
            if (tabbar.length > 0) {
                if (tabbar.find('.tab-link-highlight').length === 0) {
                    tabbar.find('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
                }
        
                tabbarSetHighlight();
                $(window).on('resize', tabbarSetHighlight);
                pageContainer.once('pageBeforeRemove', function () {
                    $(window).off('resize', tabbarSetHighlight);
                });
            }
        };

        /* ===============================================================================
        ************   Tabs   ************
        =============================================================================== */
        app.showTab = function (tab, tabLink, force) {
            var newTab = $(tab);
            if (arguments.length === 2) {
                if (typeof tabLink === 'boolean') {
                    force = tabLink;
                }
            }
            if (newTab.length === 0) return false;
            if (newTab.hasClass('active')) {
                if (force) newTab.trigger('show');
                return false;
            }
            var tabs = newTab.parent('.tabs');
            if (tabs.length === 0) return false;
        
            // Return swipeouts in hidden tabs
            app.allowSwipeout = true;
        
            // Animated tabs
            var isAnimatedTabs = tabs.parent().hasClass('tabs-animated-wrap');
            if (isAnimatedTabs) {
                var tabTranslate = (app.rtl ? newTab.index() : -newTab.index()) * 100;
                tabs.transform('translate3d(' + tabTranslate + '%,0,0)');
            }
        
            // Swipeable tabs
            var isSwipeableTabs = tabs.parent().hasClass('tabs-swipeable-wrap'), swiper;
            if (isSwipeableTabs) {
                swiper = tabs.parent()[0].swiper;
                if (swiper.activeIndex !== newTab.index()) swiper.slideTo(newTab.index(), undefined, false);
            }
        
            // Remove active class from old tabs
            var oldTab = tabs.children('.tab.active').removeClass('active');
            // Add active class to new tab
            newTab.addClass('active');
            // Trigger 'show' event on new tab
            newTab.trigger('show');
        
            // Update navbars in new tab
            if (!isAnimatedTabs && !isSwipeableTabs && newTab.find('.navbar').length > 0) {
                // Find tab's view
                var viewContainer;
                if (newTab.hasClass(app.params.viewClass)) viewContainer = newTab[0];
                else viewContainer = newTab.parents('.' + app.params.viewClass)[0];
                app.sizeNavbars(viewContainer);
            }
        
            // Find related link for new tab
            if (tabLink) tabLink = $(tabLink);
            else {
                // Search by id
                if (typeof tab === 'string') tabLink = $('.tab-link[href="' + tab + '"]');
                else tabLink = $('.tab-link[href="#' + newTab.attr('id') + '"]');
                // Search by data-tab
                if (!tabLink || tabLink && tabLink.length === 0) {
                    $('[data-tab]').each(function () {
                        if (newTab.is($(this).attr('data-tab'))) tabLink = $(this);
                    });
                }
            }
            if (tabLink.length === 0) return;
        
            // Find related link for old tab
            var oldTabLink;
            if (oldTab && oldTab.length > 0) {
                // Search by id
                var oldTabId = oldTab.attr('id');
                if (oldTabId) oldTabLink = $('.tab-link[href="#' + oldTabId + '"]');
                // Search by data-tab
                if (!oldTabLink || oldTabLink && oldTabLink.length === 0) {
                    $('[data-tab]').each(function () {
                        if (oldTab.is($(this).attr('data-tab'))) oldTabLink = $(this);
                    });
                }
            }
        
            // Update links' classes
            if (tabLink && tabLink.length > 0) {
                tabLink.addClass('active');
                // Material Highlight
                if (app.params.material) {
                    var tabbar = tabLink.parents('.tabbar');
                    if (tabbar.length > 0) {
                        if (tabbar.find('.tab-link-highlight').length === 0) {
                            tabbar.find('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
                        }
                        app.materialTabbarSetHighlight(tabbar, tabLink);
                    }
                }
            }
            if (oldTabLink && oldTabLink.length > 0) oldTabLink.removeClass('active');
        
            return true;
        };

        /*===============================================================================
        ************   Accordion   ************
        ===============================================================================*/
        app.accordionToggle = function (item) {
            item = $(item);
            if (item.length === 0) return;
            if (item.hasClass('accordion-item-expanded')) app.accordionClose(item);
            else app.accordionOpen(item);
        };
        app.accordionOpen = function (item) {
            item = $(item);
            var list = item.parents('.accordion-list').eq(0);
            var content = item.children('.accordion-item-content');
            if (content.length === 0) content = item.find('.accordion-item-content');
            var expandedItem = list.length > 0 && item.parent().children('.accordion-item-expanded');
            if (expandedItem.length > 0) {
                app.accordionClose(expandedItem);
            }
            content.css('height', content[0].scrollHeight + 'px').transitionEnd(function () {
                if (item.hasClass('accordion-item-expanded')) {
                    content.transition(0);
                    content.css('height', 'auto');
                    var clientLeft = content[0].clientLeft;
                    content.transition('');
                    item.trigger('opened');
                }
                else {
                    content.css('height', '');
                    item.trigger('closed');
                }
            });
            item.trigger('open');
            item.addClass('accordion-item-expanded');
        };
        app.accordionClose = function (item) {
            item = $(item);
            var content = item.children('.accordion-item-content');
            if (content.length === 0) content = item.find('.accordion-item-content');
            item.removeClass('accordion-item-expanded');
            content.transition(0);
            content.css('height', content[0].scrollHeight + 'px');
            // Relayout
            var clientLeft = content[0].clientLeft;
            // Close
            content.transition('');
            content.css('height', '').transitionEnd(function () {
                if (item.hasClass('accordion-item-expanded')) {
                    content.transition(0);
                    content.css('height', 'auto');
                    var clientLeft = content[0].clientLeft;
                    content.transition('');
                    item.trigger('opened');
                }
                else {
                    content.css('height', '');
                    item.trigger('closed');
                }
            });
            item.trigger('close');
        };

        /*===============================================================================
        ************   Fast Clicks   ************
        ************   Inspired by https://github.com/ftlabs/fastclick   ************
        ===============================================================================*/
        app.initFastClicks = function () {
            if (app.params.activeState) {
                $('html').addClass('watch-active-state');
            }
            if (app.device.ios && app.device.webView) {
                // Strange hack required for iOS 8 webview to work on inputs
                window.addEventListener('touchstart', function () {});
            }
        
            var touchStartX, touchStartY, touchStartTime, targetElement, trackClick, activeSelection, scrollParent, lastClickTime, isMoved, tapHoldFired, tapHoldTimeout;
            var activableElement, activeTimeout, needsFastClick, needsFastClickTimeOut;
            var rippleWave, rippleTarget, rippleTransform, rippleTimeout;
            function findActivableElement(el) {
                var target = $(el);
                var parents = target.parents(app.params.activeStateElements);
                var activable;
                if (target.is(app.params.activeStateElements)) {
                    activable = target;
                }
                if (parents.length > 0) {
                    activable = activable ? activable.add(parents) : parents;
                }
                return activable ? activable : target;
            }
            function isInsideScrollableView(el) {
                var pageContent = el.parents('.page-content, .panel');
        
                if (pageContent.length === 0) {
                    return false;
                }
        
                // This event handler covers the "tap to stop scrolling".
                if (pageContent.prop('scrollHandlerSet') !== 'yes') {
                    pageContent.on('scroll', function() {
                      clearTimeout(activeTimeout);
                      clearTimeout(rippleTimeout);
                    });
                    pageContent.prop('scrollHandlerSet', 'yes');
                }
        
                return true;
            }
            function addActive() {
                if (!activableElement) return;
                activableElement.addClass('active-state');
            }
            function removeActive(el) {
                if (!activableElement) return;
                activableElement.removeClass('active-state');
                activableElement = null;
            }
            function isFormElement(el) {
                var nodes = ('input select textarea label').split(' ');
                if (el.nodeName && nodes.indexOf(el.nodeName.toLowerCase()) >= 0) return true;
                return false;
            }
            function androidNeedsBlur(el) {
                var noBlur = ('button input textarea select').split(' ');
                if (document.activeElement && el !== document.activeElement && document.activeElement !== document.body) {
                    if (noBlur.indexOf(el.nodeName.toLowerCase()) >= 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return false;
                }
            }
            function targetNeedsFastClick(el) {
                var $el = $(el);
                if (el.nodeName.toLowerCase() === 'input' && el.type === 'file') return false;
                if ($el.hasClass('no-fastclick') || $el.parents('.no-fastclick').length > 0) return false;
                return true;
            }
            function targetNeedsFocus(el) {
                if (document.activeElement === el) {
                    return false;
                }
                var tag = el.nodeName.toLowerCase();
                var skipInputs = ('button checkbox file image radio submit').split(' ');
                if (el.disabled || el.readOnly) return false;
                if (tag === 'textarea') return true;
                if (tag === 'select') {
                    if (app.device.android) return false;
                    else return true;
                }
                if (tag === 'input' && skipInputs.indexOf(el.type) < 0) return true;
            }
            function targetNeedsPrevent(el) {
                el = $(el);
                var prevent = true;
                if (el.is('label') || el.parents('label').length > 0) {
                    if (app.device.android) {
                        prevent = false;
                    }
                    else if (app.device.ios && el.is('input')) {
                        prevent = true;
                    }
                    else prevent = false;
                }
                return prevent;
            }
        
            // Mouse Handlers
            function handleMouseDown (e) {
                findActivableElement(e.target).addClass('active-state');
                if ('which' in e && e.which === 3) {
                    setTimeout(function () {
                        $('.active-state').removeClass('active-state');
                    }, 0);
                }
                if (app.params.material && app.params.materialRipple) {
                    touchStartX = e.pageX;
                    touchStartY = e.pageY;
                    rippleTouchStart(e.target, e.pageX, e.pageY);
                }
            }
            function handleMouseMove (e) {
                $('.active-state').removeClass('active-state');
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchMove();
                }
            }
            function handleMouseUp (e) {
                $('.active-state').removeClass('active-state');
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchEnd();
                }
            }
        
            // Material Touch Ripple Effect
            function findRippleElement(el) {
                var needsRipple = app.params.materialRippleElements;
                var $el = $(el);
                if ($el.is(needsRipple)) {
                    if ($el.hasClass('no-ripple')) {
                        return false;
                    }
                    return $el;
                }
                else if ($el.parents(needsRipple).length > 0) {
                    var rippleParent = $el.parents(needsRipple).eq(0);
                    if (rippleParent.hasClass('no-ripple')) {
                        return false;
                    }
                    return rippleParent;
                }
                else return false;
            }
            function createRipple(x, y, el) {
                var box = el[0].getBoundingClientRect();
                var center = {
                    x: x - box.left,
                    y: y - box.top
                },
                    height = box.height,
                    width = box.width;
                var diameter = Math.max(Math.pow((Math.pow(height, 2) + Math.pow(width, 2)), 0.5), 48);
        
                rippleWave = $(
                    '<div class="ripple-wave" style="width: ' + diameter + 'px; height: '+diameter+'px; margin-top:-'+diameter/2+'px; margin-left:-'+diameter/2+'px; left:'+center.x+'px; top:'+center.y+'px;"></div>'
                );
                el.prepend(rippleWave);
                var clientLeft = rippleWave[0].clientLeft;
                rippleTransform = 'translate3d('+(-center.x + width/2)+'px, '+(-center.y + height/2)+'px, 0) scale(1)';
                rippleWave.transform(rippleTransform);
            }
        
            function removeRipple() {
                if (!rippleWave) return;
                var toRemove = rippleWave;
        
                var removeTimeout = setTimeout(function () {
                    toRemove.remove();
                }, 400);
        
                rippleWave
                    .addClass('ripple-wave-fill')
                    .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'))
                    .transitionEnd(function () {
                        clearTimeout(removeTimeout);
        
                        var rippleWave = $(this)
                            .addClass('ripple-wave-out')
                            .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'));
        
                        removeTimeout = setTimeout(function () {
                            rippleWave.remove();
                        }, 700);
        
                        setTimeout(function () {
                            rippleWave.transitionEnd(function(){
                                clearTimeout(removeTimeout);
                                $(this).remove();
                            });
                        }, 0);
                    });
        
                rippleWave = rippleTarget = undefined;
            }
        
            function rippleTouchStart (el, x, y) {
                rippleTarget = findRippleElement(el);
                if (!rippleTarget || rippleTarget.length === 0) {
                    rippleTarget = undefined;
                    return;
                }
                if (!isInsideScrollableView(rippleTarget)) {
                    createRipple(touchStartX, touchStartY, rippleTarget);
                }
                else {
                    rippleTimeout = setTimeout(function () {
                        createRipple(touchStartX, touchStartY, rippleTarget);
                    }, 80);
                }
            }
            function rippleTouchMove() {
                clearTimeout(rippleTimeout);
                removeRipple();
            }
            function rippleTouchEnd() {
                if (rippleWave) {
                    removeRipple();
                }
                else if (rippleTarget && !isMoved) {
                    clearTimeout(rippleTimeout);
                    createRipple(touchStartX, touchStartY, rippleTarget);
                    setTimeout(removeRipple, 0);
                }
                else {
                    removeRipple();
                }
            }
        
            // Send Click
            function sendClick(e) {
                var touch = e.changedTouches[0];
                var evt = document.createEvent('MouseEvents');
                var eventType = 'click';
                if (app.device.android && targetElement.nodeName.toLowerCase() === 'select') {
                    eventType = 'mousedown';
                }
                evt.initMouseEvent(eventType, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
                evt.forwardedTouchEvent = true;
                targetElement.dispatchEvent(evt);
            }
        
            // Touch Handlers
            function handleTouchStart(e) {
                isMoved = false;
                tapHoldFired = false;
                if (e.targetTouches.length > 1) {
                    if (activableElement) removeActive();
                    return true;
                }
                if (e.touches.length > 1 && activableElement) {
                    removeActive();
                }
                if (app.params.tapHold) {
                    if (tapHoldTimeout) clearTimeout(tapHoldTimeout);
                    tapHoldTimeout = setTimeout(function () {
                        tapHoldFired = true;
                        e.preventDefault();
                        $(e.target).trigger('taphold');
                    }, app.params.tapHoldDelay);
                }
                if (needsFastClickTimeOut) clearTimeout(needsFastClickTimeOut);
                needsFastClick = targetNeedsFastClick(e.target);
        
                if (!needsFastClick) {
                    trackClick = false;
                    return true;
                }
                if (app.device.ios) {
                    var selection = window.getSelection();
                    if (selection.rangeCount && selection.focusNode !== document.body && (!selection.isCollapsed || document.activeElement === selection.focusNode)) {
                        activeSelection = true;
                        return true;
                    }
                    else {
                        activeSelection = false;
                    }
                }
                if (app.device.android)  {
                    if (androidNeedsBlur(e.target)) {
                        document.activeElement.blur();
                    }
                }
        
                trackClick = true;
                targetElement = e.target;
                touchStartTime = (new Date()).getTime();
                touchStartX = e.targetTouches[0].pageX;
                touchStartY = e.targetTouches[0].pageY;
        
                // Detect scroll parent
                if (app.device.ios) {
                    scrollParent = undefined;
                    $(targetElement).parents().each(function () {
                        var parent = this;
                        if (parent.scrollHeight > parent.offsetHeight && !scrollParent) {
                            scrollParent = parent;
                            scrollParent.f7ScrollTop = scrollParent.scrollTop;
                        }
                    });
                }
                if ((e.timeStamp - lastClickTime) < app.params.fastClicksDelayBetweenClicks) {
                    e.preventDefault();
                }
        
                if (app.params.activeState) {
                    activableElement = findActivableElement(targetElement);
                    // If it's inside a scrollable view, we don't trigger active-state yet,
                    // because it can be a scroll instead. Based on the link:
                    // http://labnote.beedesk.com/click-scroll-and-pseudo-active-on-mobile-webk
                    if (!isInsideScrollableView(activableElement)) {
                        addActive();
                    } else {
                        activeTimeout = setTimeout(addActive, 80);
                    }
                }
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchStart(targetElement, touchStartX, touchStartY);
                }
            }
            function handleTouchMove(e) {
                if (!trackClick) return;
                var _isMoved = false;
                var distance = app.params.fastClicksDistanceThreshold;
                if (distance) {
                    var pageX = e.targetTouches[0].pageX;
                    var pageY = e.targetTouches[0].pageY;
                    if (Math.abs(pageX - touchStartX) > distance ||  Math.abs(pageY - touchStartY) > distance) {
                        _isMoved = true;
                    }
                }
                else {
                    _isMoved = true;
                }
                if (_isMoved) {
                    trackClick = false;
                    targetElement = null;
                    isMoved = true;
                    if (app.params.tapHold) {
                        clearTimeout(tapHoldTimeout);
                    }
        			if (app.params.activeState) {
        				clearTimeout(activeTimeout);
        				removeActive();
        			}
                    if (app.params.material && app.params.materialRipple) {
                        rippleTouchMove();
                    }
                }
            }
            function handleTouchEnd(e) {
                clearTimeout(activeTimeout);
                clearTimeout(tapHoldTimeout);
        
                if (!trackClick) {
                    if (!activeSelection && needsFastClick) {
                        if (!(app.device.android && !e.cancelable)) {
                            e.preventDefault();
                        }
                    }
                    return true;
                }
        
                if (document.activeElement === e.target) {
                    if (app.params.activeState) removeActive();
                    if (app.params.material && app.params.materialRipple) {
                        rippleTouchEnd();
                    }
                    return true;
                }
        
                if (!activeSelection) {
                    e.preventDefault();
                }
        
                if ((e.timeStamp - lastClickTime) < app.params.fastClicksDelayBetweenClicks) {
                    setTimeout(removeActive, 0);
                    return true;
                }
        
                lastClickTime = e.timeStamp;
        
                trackClick = false;
        
                if (app.device.ios && scrollParent) {
                    if (scrollParent.scrollTop !== scrollParent.f7ScrollTop) {
                        return false;
                    }
                }
        
                // Add active-state here because, in a very fast tap, the timeout didn't
                // have the chance to execute. Removing active-state in a timeout gives
                // the chance to the animation execute.
                if (app.params.activeState) {
                    addActive();
                    setTimeout(removeActive, 0);
                }
                // Remove Ripple
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchEnd();
                }
        
                // Trigger focus when required
                if (targetNeedsFocus(targetElement)) {
                    if (app.device.ios && app.device.webView) {
                        if ((event.timeStamp - touchStartTime) > 159) {
                            targetElement = null;
                            return false;
                        }
                        targetElement.focus();
                        return false;
                    }
                    else {
                        targetElement.focus();
                    }
                }
        
                // Blur active elements
                if (document.activeElement && targetElement !== document.activeElement && document.activeElement !== document.body && targetElement.nodeName.toLowerCase() !== 'label') {
                    document.activeElement.blur();
                }
        
                // Send click
                e.preventDefault();
                sendClick(e);
                return false;
            }
            function handleTouchCancel(e) {
                trackClick = false;
                targetElement = null;
        
                // Remove Active State
                clearTimeout(activeTimeout);
                clearTimeout(tapHoldTimeout);
                if (app.params.activeState) {
                    removeActive();
                }
        
                // Remove Ripple
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchEnd();
                }
            }
        
            function handleClick(e) {
                var allowClick = false;
        
                if (trackClick) {
                    targetElement = null;
                    trackClick = false;
                    return true;
                }
                if (e.target.type === 'submit' && e.detail === 0) {
                    return true;
                }
                if (!targetElement) {
                    if (!isFormElement(e.target)) {
                        allowClick =  true;
                    }
                }
                if (!needsFastClick) {
                    allowClick = true;
                }
                if (document.activeElement === targetElement) {
                    allowClick =  true;
                }
                if (e.forwardedTouchEvent) {
                    allowClick =  true;
                }
                if (!e.cancelable) {
                    allowClick =  true;
                }
                if (app.params.tapHold && app.params.tapHoldPreventClicks && tapHoldFired) {
                    allowClick = false;
                }
                if (!allowClick) {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    if (targetElement) {
                        if (targetNeedsPrevent(targetElement) || isMoved) {
                            e.preventDefault();
                        }
                    }
                    else {
                        e.preventDefault();
                    }
                    targetElement = null;
                }
                needsFastClickTimeOut = setTimeout(function () {
                    needsFastClick = false;
                }, (app.device.ios || app.device.androidChrome ? 100 : 400));
        
                if (app.params.tapHold) {
                    tapHoldTimeout = setTimeout(function () {
                        tapHoldFired = false;
                    }, (app.device.ios || app.device.androidChrome ? 100 : 400));
                }
        
                return allowClick;
            }
            if (app.support.touch) {
                document.addEventListener('click', handleClick, true);
        
                document.addEventListener('touchstart', handleTouchStart);
                document.addEventListener('touchmove', handleTouchMove);
                document.addEventListener('touchend', handleTouchEnd);
                document.addEventListener('touchcancel', handleTouchCancel);
            }
            else {
                if (app.params.activeState) {
                    document.addEventListener('mousedown', handleMouseDown);
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                }
            }
            if (app.params.material && app.params.materialRipple) {
                document.addEventListener('contextmenu', function (e) {
                    if (activableElement) removeActive();
                    rippleTouchEnd();
                });
            }
        
        };
        

        /*===============================================================================
        ************   Handle clicks and make them fast (on tap);   ************
        ===============================================================================*/
        app.initClickEvents = function () {
            function handleScrollTop(e) {
                /*jshint validthis:true */
                var clicked = $(this);
                var target = $(e.target);
                var isLink = clicked[0].nodeName.toLowerCase() === 'a' ||
                             clicked.parents('a').length > 0 ||
                             target[0].nodeName.toLowerCase() === 'a' ||
                             target.parents('a').length > 0;
        
                if (isLink) return;
                var pageContent, page;
                if (app.params.scrollTopOnNavbarClick && clicked.is('.navbar .center')) {
                    // Find active page
                    var navbar = clicked.parents('.navbar');
        
                    // Static Layout
                    pageContent = navbar.parents('.page-content');
        
                    if (pageContent.length === 0) {
                        // Fixed Layout
                        if (navbar.parents('.page').length > 0) {
                            pageContent = navbar.parents('.page').find('.page-content');
                        }
                        // Through Layout
                        if (pageContent.length === 0) {
                            if (navbar.nextAll('.pages').length > 0) {
                                pageContent = navbar.nextAll('.pages').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                            }
                        }
                    }
                }
                if (app.params.scrollTopOnStatusbarClick && clicked.is('.statusbar-overlay')) {
                    if ($('.popup.modal-in').length > 0) {
                        // Check for opened popup
                        pageContent = $('.popup.modal-in').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                    else if ($('.panel.active').length > 0) {
                        // Check for opened panel
                        pageContent = $('.panel.active').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                    else if ($('.views > .view.active').length > 0) {
                        // View in tab bar app layout
                        pageContent = $('.views > .view.active').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                    else {
                        // Usual case
                        pageContent = $('.views').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                }
        
                if (pageContent && pageContent.length > 0) {
                    // Check for tab
                    if (pageContent.hasClass('tab')) {
                        pageContent = pageContent.parent('.tabs').children('.page-content.active');
                    }
                    if (pageContent.length > 0) pageContent.scrollTop(0, 300);
                }
            }
            function handleClicks(e) {
                /*jshint validthis:true */
                var clicked = $(this);
                var url = clicked.attr('href');
                var isLink = clicked[0].nodeName.toLowerCase() === 'a';
        
                // Check if link is external
                if (isLink) {
                    if (clicked.is(app.params.externalLinks) || (url && url.indexOf('javascript:') >= 0)) {
                        if(url && clicked.attr('target') === '_system') {
                            e.preventDefault();
                            window.open(url, '_system');
                        }
                        return;
                    }
                }
        
                // Collect Clicked data- attributes
                var clickedData = clicked.dataset();
        
                // Smart Select
                if (clicked.hasClass('smart-select')) {
                    if (app.smartSelectOpen) app.smartSelectOpen(clicked);
                }
        
                // Open Panel
                if (clicked.hasClass('open-panel')) {
                    if ($('.panel').length === 1) {
                        if ($('.panel').hasClass('panel-left')) app.openPanel('left');
                        else app.openPanel('right');
                    }
                    else {
                        if (clickedData.panel === 'right') app.openPanel('right');
                        else app.openPanel('left');
                    }
                }
                // Close Panel
                if (clicked.hasClass('close-panel')) {
                    app.closePanel();
                }
        
                if (clicked.hasClass('panel-overlay') && app.params.panelsCloseByOutside) {
                    app.closePanel();
                }
                // Popover
                if (clicked.hasClass('open-popover')) {
                    var popover;
                    if (clickedData.popover) {
                        popover = clickedData.popover;
                    }
                    else popover = '.popover';
                    app.popover(popover, clicked);
                }
                if (clicked.hasClass('close-popover')) {
                    app.closeModal('.popover.modal-in');
                }
                // Popup
                var popup;
                if (clicked.hasClass('open-popup')) {
                    if (clickedData.popup) {
                        popup = clickedData.popup;
                    }
                    else popup = '.popup';
                    app.popup(popup);
                }
                if (clicked.hasClass('close-popup')) {
                    if (clickedData.popup) {
                        popup = clickedData.popup;
                    }
                    else popup = '.popup.modal-in';
                    app.closeModal(popup);
                }
                // Login Screen
                var loginScreen;
                if (clicked.hasClass('open-login-screen')) {
                    if (clickedData.loginScreen) {
                        loginScreen = clickedData.loginScreen;
                    }
                    else loginScreen = '.login-screen';
                    app.loginScreen(loginScreen);
                }
                if (clicked.hasClass('close-login-screen')) {
                    app.closeModal('.login-screen.modal-in');
                }
                // Close Modal
                if (clicked.hasClass('modal-overlay')) {
                    if ($('.modal.modal-in').length > 0 && app.params.modalCloseByOutside)
                        app.closeModal('.modal.modal-in');
                    if ($('.actions-modal.modal-in').length > 0 && app.params.actionsCloseByOutside)
                        app.closeModal('.actions-modal.modal-in');
        
                    if ($('.popover.modal-in').length > 0) app.closeModal('.popover.modal-in');
                }
                if (clicked.hasClass('popup-overlay')) {
                    if ($('.popup.modal-in').length > 0 && app.params.popupCloseByOutside)
                        app.closeModal('.popup.modal-in');
                }
                if (clicked.hasClass('picker-modal-overlay')) {
                    if ($('.picker-modal.modal-in').length > 0)
                        app.closeModal('.picker-modal.modal-in');
                }
        
                // Picker
                if (clicked.hasClass('close-picker')) {
                    var pickerToClose = $('.picker-modal.modal-in');
                    if (pickerToClose.length > 0) {
                        app.closeModal(pickerToClose);
                    }
                    else {
                        pickerToClose = $('.popover.modal-in .picker-modal');
                        if (pickerToClose.length > 0) {
                            app.closeModal(pickerToClose.parents('.popover'));
                        }
                    }
                }
                if (clicked.hasClass('open-picker')) {
                    var pickerToOpen;
                    if (clickedData.picker) {
                        pickerToOpen = clickedData.picker;
                    }
                    else pickerToOpen = '.picker-modal';
                    app.pickerModal(pickerToOpen, clicked);
                }
        
                // Tabs
                var isTabLink;
                if (clicked.hasClass('tab-link')) {
                    isTabLink = true;
                    app.showTab(clickedData.tab || clicked.attr('href'), clicked);
                }
                // Swipeout Close
                if (clicked.hasClass('swipeout-close')) {
                    app.swipeoutClose(clicked.parents('.swipeout-opened'));
                }
                // Swipeout Delete
                if (clicked.hasClass('swipeout-delete')) {
                    if (clickedData.confirm) {
                        var text = clickedData.confirm;
                        var title = clickedData.confirmTitle;
                        if (title) {
                            app.confirm(text, title, function () {
                                app.swipeoutDelete(clicked.parents('.swipeout'));
                            }, function () {
                                if (clickedData.closeOnCancel) app.swipeoutClose(clicked.parents('.swipeout'));
                            });
                        }
                        else {
                            app.confirm(text, function () {
                                app.swipeoutDelete(clicked.parents('.swipeout'));
                            }, function () {
                                if (clickedData.closeOnCancel) app.swipeoutClose(clicked.parents('.swipeout'));
                            });
                        }
                    }
                    else {
                        app.swipeoutDelete(clicked.parents('.swipeout'));
                    }
        
                }
                // Sortable
                if (clicked.hasClass('toggle-sortable')) {
                    app.sortableToggle(clickedData.sortable);
                }
                if (clicked.hasClass('open-sortable')) {
                    app.sortableOpen(clickedData.sortable);
                }
                if (clicked.hasClass('close-sortable')) {
                    app.sortableClose(clickedData.sortable);
                }
                // Accordion
                if (clicked.hasClass('accordion-item-toggle') || (clicked.hasClass('item-link') && clicked.parent().hasClass('accordion-item'))) {
                    var accordionItem = clicked.parent('.accordion-item');
                    if (accordionItem.length === 0) accordionItem = clicked.parents('.accordion-item');
                    if (accordionItem.length === 0) accordionItem = clicked.parents('li');
                    app.accordionToggle(accordionItem);
                }
        
                // Speed Dial
                if (app.params.material) {
                    if (clicked.hasClass('floating-button') && clicked.parent().hasClass('speed-dial')) {
                        clicked.parent().toggleClass('speed-dial-opened');
                    }
                    if (clicked.hasClass('close-speed-dial')) {
                        $('.speed-dial-opened').removeClass('speed-dial-opened');
                    }
                }
        
                // Load Page
                if (app.params.ajaxLinks && !clicked.is(app.params.ajaxLinks) || !isLink || !app.params.router) {
                    return;
                }
                if (isLink) {
                    e.preventDefault();
                }
        
                var validUrl = url && url.length > 0 && url !== '#' && !isTabLink;
                var template = clickedData.template;
                if (validUrl || clicked.hasClass('back') || template) {
                    var view;
                    if (clickedData.view) {
                        view = $(clickedData.view)[0].f7View;
                    }
                    else {
                        view = clicked.parents('.' + app.params.viewClass)[0] && clicked.parents('.' + app.params.viewClass)[0].f7View;
                        if (view && view.params.linksView) {
                            if (typeof view.params.linksView === 'string') view = $(view.params.linksView)[0].f7View;
                            else if (view.params.linksView instanceof View) view = view.params.linksView;
                        }
                    }
                    if (!view) {
                        if (app.mainView) view = app.mainView;
                    }
                    if (!view) return;
        
                    var pageName;
                    if (!template) {
                        if (url.indexOf('#') === 0 && url !== '#')  {
                            if (view.params.domCache) {
                                pageName = url.split('#')[1];
                                url = undefined;
                            }
                            else return;
                        }
                        if (url === '#' && !clicked.hasClass('back')) return;
                    }
                    else {
                        url = undefined;
                    }
        
                    var animatePages;
                    if (typeof clickedData.animatePages !== 'undefined') {
                        animatePages = clickedData.animatePages;
                    }
                    else {
                        if (clicked.hasClass('with-animation')) animatePages = true;
                        if (clicked.hasClass('no-animation')) animatePages = false;
                    }
        
                    var options = {
                        animatePages: animatePages,
                        ignoreCache: clickedData.ignoreCache,
                        force: clickedData.force,
                        reload: clickedData.reload,
                        reloadPrevious: clickedData.reloadPrevious,
                        pageName: pageName,
                        pushState: clickedData.pushState,
                        url: url
                    };
        
                    if (app.params.template7Pages) {
                        options.contextName = clickedData.contextName;
                        var context = clickedData.context;
                        if (context) {
                            options.context = JSON.parse(context);
                        }
                    }
                    if (template && template in t7.templates) {
                        options.template = t7.templates[template];
                    }
        
                    if (clicked.hasClass('back')) view.router.back(options);
                    else view.router.load(options);
                }
            }
            $(document).on('click', 'a, .open-panel, .close-panel, .panel-overlay, .modal-overlay, .popup-overlay, .swipeout-delete, .swipeout-close, .close-popup, .open-popup, .open-popover, .open-login-screen, .close-login-screen .smart-select, .toggle-sortable, .open-sortable, .close-sortable, .accordion-item-toggle, .close-picker, .picker-modal-overlay', handleClicks);
            if (app.params.scrollTopOnNavbarClick || app.params.scrollTopOnStatusbarClick) {
                $(document).on('click', '.statusbar-overlay, .navbar .center', handleScrollTop);
            }
        
            // Prevent scrolling on overlays
            function preventScrolling(e) {
                e.preventDefault();
            }
            if (app.support.touch && !app.device.android) {
                $(document).on((app.params.fastClicks ? 'touchstart' : 'touchmove'), '.panel-overlay, .modal-overlay, .preloader-indicator-overlay, .popup-overlay, .searchbar-overlay', preventScrolling);
            }
        };
        

        /*======================================================
        ************   App Resize Actions   ************
        ======================================================*/
        // Prevent iPad horizontal body scrolling when soft keyboard is opened
        function _fixIpadBodyScrolLeft() {
            if (app.device.ipad) {
                document.body.scrollLeft = 0;
                setTimeout(function () {
                    document.body.scrollLeft = 0;
                }, 0);
            }
        }
        app.initResize = function () {
            $(window).on('resize', app.resize);
            $(window).on('orientationchange', app.orientationchange);
        };
        app.resize = function () {
            if (app.sizeNavbars) app.sizeNavbars();
            _fixIpadBodyScrolLeft();
            
        };
        app.orientationchange = function () {
            if (app.device && app.device.minimalUi) {
                if (window.orientation === 90 || window.orientation === -90) document.body.scrollTop = 0;
            }
            _fixIpadBodyScrolLeft();
        };
        

        /*===============================================================================
        ************   Store and parse forms data   ************
        ===============================================================================*/
        app.formsData = {};
        app.formStoreData = function (formId, formJSON) {
            // Store form data in app.formsData
            app.formsData[formId] = formJSON;
        
            // Store form data in local storage also
            app.ls['f7form-' + formId] = JSON.stringify(formJSON);
        };
        app.formDeleteData = function (formId) {
            // Delete form data from app.formsData
            if (app.formsData[formId]) {
                app.formsData[formId] = '';
                delete app.formsData[formId];
            }
        
            // Delete form data from local storage also
            if (app.ls['f7form-' + formId]) {
                app.ls['f7form-' + formId] = '';
                app.ls.removeItem('f7form-' + formId);
            }
        };
        app.formGetData = function (formId) {
            // First of all check in local storage
            if (app.ls['f7form-' + formId]) {
                return JSON.parse(app.ls['f7form-' + formId]);
            }
            // Try to get it from formsData obj
            else if (app.formsData[formId]) return app.formsData[formId];
        };
        app.formToJSON = function (form) {
            form = $(form);
            if (form.length !== 1) return false;
        
            // Form data
            var formData = {};
        
            // Skip input types
            var skipTypes = ['submit', 'image', 'button', 'file'];
            var skipNames = [];
            form.find('input, select, textarea').each(function () {
                var input = $(this);
                var name = input.attr('name');
                var type = input.attr('type');
                var tag = this.nodeName.toLowerCase();
                if (skipTypes.indexOf(type) >= 0) return;
                if (skipNames.indexOf(name) >= 0 || !name) return;
                if (tag === 'select' && input.prop('multiple')) {
                    skipNames.push(name);
                    formData[name] = [];
                    form.find('select[name="' + name + '"] option').each(function () {
                        if (this.selected) formData[name].push(this.value);
                    });
                }
                else {
                    switch (type) {
                        case 'checkbox' :
                            skipNames.push(name);
                            formData[name] = [];
                            form.find('input[name="' + name + '"]').each(function () {
                                if (this.checked) formData[name].push(this.value);
                            });
                            break;
                        case 'radio' :
                            skipNames.push(name);
                            form.find('input[name="' + name + '"]').each(function () {
                                if (this.checked) formData[name] = this.value;
                            });
                            break;
                        default :
                            formData[name] = input.val();
                            break;
                    }
                }
                    
            });
            form.trigger('formToJSON', {formData: formData});
        
            return formData;
        };
        app.formFromJSON = function (form, formData) {
            form = $(form);
            if (form.length !== 1) return false;
        
            // Skip input types
            var skipTypes = ['submit', 'image', 'button', 'file'];
            var skipNames = [];
        
            form.find('input, select, textarea').each(function () {
                var input = $(this);
                var name = input.attr('name');
                var type = input.attr('type');
                var tag = this.nodeName.toLowerCase();
                if (!formData[name]) return;
                if (skipTypes.indexOf(type) >= 0) return;
                if (skipNames.indexOf(name) >= 0 || !name) return;
                if (tag === 'select' && input.prop('multiple')) {
                    skipNames.push(name);
                    form.find('select[name="' + name + '"] option').each(function () {
                        if (formData[name].indexOf(this.value) >= 0) this.selected = true;
                        else this.selected = false;
                    });
                }
                else {
                    switch (type) {
                        case 'checkbox' :
                            skipNames.push(name);
                            form.find('input[name="' + name + '"]').each(function () {
                                if (formData[name].indexOf(this.value) >= 0) this.checked = true;
                                else this.checked = false;
                            });
                            break;
                        case 'radio' :
                            skipNames.push(name);
                            form.find('input[name="' + name + '"]').each(function () {
                                if (formData[name] === this.value) this.checked = true;
                                else this.checked = false;
                            });
                            break;
                        default :
                            input.val(formData[name]);
                            break;
                    }
                }
                    
            });
            form.trigger('formFromJSON', {formData: formData});
        };
        app.initFormsStorage = function (pageContainer) {
            pageContainer = $(pageContainer);
            var forms = pageContainer.find('form.store-data');
            if (forms.length === 0) return;
            
            // Parse forms data and fill form if there is such data
            forms.each(function () {
                var id = this.getAttribute('id');
                if (!id) return;
                var formData = app.formGetData(id);
                if (formData) app.formFromJSON(this, formData);
            });
            // Update forms data on inputs change
            function storeForm() {
                /*jshint validthis:true */
                var form = $(this);
                var formId = form[0].id;
                if (!formId) return;
                var formJSON = app.formToJSON(form);
                if (!formJSON) return;
                app.formStoreData(formId, formJSON);
                form.trigger('store', {data: formJSON});
            }
            forms.on('change submit', storeForm);
        
            // Detach Listeners
            function pageBeforeRemove() {
                forms.off('change submit', storeForm);
                pageContainer.off('pageBeforeRemove', pageBeforeRemove);
            }
            pageContainer.on('pageBeforeRemove', pageBeforeRemove);
        };

        /*===============================================================================
        ************   Ajax submit for forms   ************
        ===============================================================================*/
        // Ajax submit on forms
        $(document).on('submit change', 'form.ajax-submit, form.ajax-submit-onchange', function (e) {
            var form = $(this);
            if (e.type === 'change' && !form.hasClass('ajax-submit-onchange')) return;
            if (e.type === 'submit') e.preventDefault();
            
            var method = form.attr('method') || 'GET';
            var contentType = form.prop('enctype') || form.attr('enctype');
        
            var url = form.attr('action');
            if (!url) return;
        
            var data;
            if (method === 'POST') data = new FormData(form[0]);
            else data = $.serializeObject(app.formToJSON(form[0]));
        
            var xhr = $.ajax({
                method: method,
                url: url,
                contentType: contentType,
                data: data,
                beforeSend: function (xhr) {
                    form.trigger('beforeSubmit', {data:data, xhr: xhr});
                },
                error: function (xhr) {
                    form.trigger('submitError', {data:data, xhr: xhr});  
                },
                success: function (data) {
                    form.trigger('submitted', {data: data, xhr: xhr});
                }
            });
        });
        
        

        /*===============================================================================
        ************   Resizable textarea   ************
        ===============================================================================*/
        app.resizeTextarea = function (textarea) {
            textarea = $(textarea);
            if (!textarea.hasClass('resizable')) {
                return;
            }
            textarea.css({'height': ''});
            var height = textarea[0].offsetHeight;
            var diff = height - textarea[0].clientHeight;
            var scrollHeight = textarea[0].scrollHeight;
        
            if (scrollHeight + diff > height) {
                var newAreaHeight = scrollHeight + diff;
                textarea.css('height', newAreaHeight + 'px');
            }
        };
        app.resizableTextarea = function (textarea) {
            textarea = $(textarea);
            if (textarea.length === 0) return;
            var textareaTimeout;
            function handleTextarea() {
                clearTimeout(textareaTimeout);
                textareaTimeout = setTimeout(function () {
                    app.resizeTextarea(textarea);
                }, 0);
            }
            return textarea.on('change keydown keypress keyup paste cut', handleTextarea);
        };
        app.initPageResizableTextarea = function (pageContainer) {
            pageContainer = $(pageContainer);
            var textareas = pageContainer.find('textarea.resizable');
            textareas.each(function () {
                app.resizableTextarea(this);
            });
        };

        /*======================================================
        ************   Material Text Inputs   ************
        ======================================================*/
        app.initPageMaterialInputs = function (pageContainer) {
            pageContainer = $(pageContainer);
            var textareas = pageContainer.find('textarea.resizable');
            pageContainer.find('.item-input').each(function () {
                var itemInput = $(this);
                var notInputs = ['checkbox', 'button', 'submit', 'range', 'radio', 'image'];
                itemInput.find('input, select, textarea').each(function () {
                    var input = $(this);
                    if (notInputs.indexOf(input.attr('type')) < 0) {
                        itemInput.addClass('item-input-field');
                        if (input.val().trim() !== '') {
                            input.parents('.item-input, .input-field').add(input.parents('.item-inner')).addClass('not-empty-state');
                        }
                    }
                });
                if (itemInput.parents('.input-item, .inputs-list').length > 0) return;
                itemInput.parents('.list-block').eq(0).addClass('inputs-list');
            });
        };
        /*======================================================
        ************   Material Focus Inputs   ************
        ======================================================*/
        app.initMaterialWatchInputs = function () {
            var notInputs = ['checkbox', 'button', 'submit', 'range', 'radio', 'image'];
            function addFocusState(e) {
                /*jshint validthis:true*/
                var i = $(this);
                var type = i.attr('type');
                if (notInputs.indexOf(type) >= 0) return;
                var els = i.add(i.parents('.item-input, .input-field')).add(i.parents('.item-inner').eq(0));
                els.addClass('focus-state');
            }
            function removeFocusState(e) {
                /*jshint validthis:true*/
                var i = $(this), value = i.val();
                var type = i.attr('type');
                if (notInputs.indexOf(type) >= 0) return;
                var els = i.add(i.parents('.item-input, .input-field')).add(i.parents('.item-inner').eq(0));
                els.removeClass('focus-state');
                if (value && value.trim() !== '') {
                    els.addClass('not-empty-state');
                }
                else {
                    els.removeClass('not-empty-state');
                }
            }
            function watchChangeState(e) {
                /*jshint validthis:true*/
                var i = $(this), value = i.val();
                var type = i.attr('type');
                if (notInputs.indexOf(type) >= 0) return;
                var els = i.add(i.parents('.item-input, .input-field')).add(i.parents('.item-inner').eq(0));
                if (value && value.trim() !== '') {
                    els.addClass('not-empty-state');
                }
                else {
                    els.removeClass('not-empty-state');
                }
            }
            $(document).on('change', '.item-input input, .item-input select, .item-input textarea, input, textarea, select', watchChangeState, true);
            $(document).on('focus', '.item-input input, .item-input select, .item-input textarea, input, textarea, select', addFocusState, true);
            $(document).on('blur', '.item-input input, .item-input select, .item-input textarea, input, textarea, select', removeFocusState, true);
        };

        /*======================================================
        ************   Handle Browser's History   ************
        ======================================================*/
        app.pushStateQueue = [];
        app.pushStateClearQueue = function () {
            if (app.pushStateQueue.length === 0) return;
            var queue = app.pushStateQueue.pop();
            var animatePages;
            if (app.params.pushStateNoAnimation === true) animatePages = false;
            if (queue.action === 'back') {
                app.router.back(queue.view, {animatePages: animatePages});
            }
            if (queue.action === 'loadPage') {
                app.router.load(queue.view, {url: queue.stateUrl, animatePages: animatePages, pushState: false});
            }
            if (queue.action === 'loadContent') {
                app.router.load(queue.view, {content: queue.stateContent, animatePages: animatePages, pushState: false});
            }
            if (queue.action === 'loadPageName') {
                app.router.load(queue.view, {pageName: queue.statePageName, animatePages: animatePages, pushState: false});
            }
        };
        
        app.initPushState = function () {
            var blockPopstate;
            if (app.params.pushStatePreventOnLoad) {
                blockPopstate = true;
                $(window).on('load', function () {
                    setTimeout(function () {
                        blockPopstate = false;
                    }, 0);
                });
            }
        
            function handlePopState(e) {
                if (blockPopstate) return;
                var mainView = app.mainView;
                if (!mainView) return;
                var state = e.state;
                if (!state) {
                    state = {
                        viewIndex: app.views.indexOf(mainView),
                        url : mainView.history[0]
                    };
                }
                if (state.viewIndex < 0) return;
                var view = app.views[state.viewIndex];
                var stateUrl = state && state.url || undefined;
                var stateContent = state && state.content || undefined;
                var statePageName = state && state.pageName || undefined;
                var animatePages;
        
                if (app.params.pushStateNoAnimation === true) animatePages = false;
        
                if (stateUrl !== view.url) {
                    if (view.history.indexOf(stateUrl) >= 0) {
                        // Go Back
                        if (view.allowPageChange) {
                            app.router.back(view, {url:undefined, animatePages: animatePages, pushState: false, preloadOnly:false});
                        }
                        else {
                            app.pushStateQueue.push({
                                action: 'back',
                                view: view
                            });
                        }
                    }
                    else if (stateContent) {
                        // Load Page
                        if (view.allowPageChange) {
                            app.router.load(view, {content:stateContent, animatePages: animatePages, pushState: false});
                        }
                        else {
                            app.pushStateQueue.unshift({
                                action: 'loadContent',
                                stateContent: stateContent,
                                view: view
                            });
                        }
        
                    }
                    else if (statePageName) {
                        // Load Page by page name with Dom Cache
                        if (view.allowPageChange) {
                            app.router.load(view, {pageName:statePageName, animatePages: animatePages, pushState: false});
                        }
                        else {
                            app.pushStateQueue.unshift({
                                action: 'loadPageName',
                                statePageName: statePageName,
                                view: view
                            });
                        }
                    }
                    else  {
                        // Load Page
                        if (view.allowPageChange) {
                            app.router.load(view, {url:stateUrl, animatePages: animatePages, pushState: false});
                        }
                        else {
                            app.pushStateQueue.unshift({
                                action: 'loadPage',
                                stateUrl: stateUrl,
                                view: view
                            });
                        }
                    }
                }
            }
            $(window).on('popstate', handlePopState);
        };
        

        /*===========================
        Framework7 Swiper Additions
        ===========================*/
        app.swiper = function (container, params) {
            return new Swiper(container, params);
        };
        app.initPageSwiper = function (pageContainer) {
            pageContainer = $(pageContainer);
            var swipers = pageContainer.find('.swiper-init, .tabs-swipeable-wrap');
            if (swipers.length === 0) return;
            function destroySwiperOnRemove(slider) {
                function destroySwiper() {
                    slider.destroy();
                    pageContainer.off('pageBeforeRemove', destroySwiper);
                }
                pageContainer.on('pageBeforeRemove', destroySwiper);
            }
            swipers.each(function () {
                var swiper = $(this);
                if (swiper.hasClass('tabs-swipeable-wrap')) {
                    swiper.addClass('swiper-container').children('.tabs').addClass('swiper-wrapper').children('.tab').addClass('swiper-slide');
                }
                var params;
                if (swiper.data('swiper')) {
                    params = JSON.parse(swiper.data('swiper'));
                }
                else {
                    params = swiper.dataset();
                }
                if (swiper.hasClass('tabs-swipeable-wrap')) {
                    params.onSlideChangeStart = function (s) {
                        app.showTab(s.slides.eq(s.activeIndex));
                    };
                }
                var _slider = app.swiper(swiper[0], params);
                destroySwiperOnRemove(_slider);
            });
        };
        app.reinitPageSwiper = function (pageContainer) {
            pageContainer = $(pageContainer);
            var sliders = pageContainer.find('.swiper-init, .tabs-swipeable-wrap');
            if (sliders.length === 0) return;
            for (var i = 0; i < sliders.length; i++) {
                var sliderInstance = sliders[0].swiper;
                if (sliderInstance) {
                    sliderInstance.update(true);
                }
            }
        };
        

        /*======================================================
        ************   Photo Browser   ************
        ======================================================*/
        var PhotoBrowser = function (params) {
            var pb = this, i;
        
            var defaults = {
                photos : [],
                initialSlide: 0,
                spaceBetween: 20,
                speed: 300,
                zoom: true,
                maxZoom: 3,
                minZoom: 1,
                exposition: true,
                expositionHideCaptions: false,
                type: 'standalone',
                navbar: true,
                toolbar: true,
                theme: 'light',
                swipeToClose: true,
                backLinkText: 'Close',
                ofText: 'of',
                loop: false,
                lazyLoading: false,
                lazyLoadingInPrevNext: false,
                lazyLoadingOnTransitionStart: false,
                material: app.params.material,
                materialPreloaderSvg: app.params.materialPreloaderSvg,
                materialPreloaderHtml: app.params.materialPreloaderHtml,
                /*
                Callbacks:
                onLazyImageLoad(pb, slide, img)
                onLazyImageReady(pb, slide, img)
                onOpen(pb)
                onClose(pb)
                onTransitionStart(swiper)
                onTransitionEnd(swiper)
                onSlideChangeStart(swiper)
                onSlideChangeEnd(swiper)
                onTap(swiper, e)
                onClick(swiper, e)
                onDoubleTap(swiper, e)
                onSwipeToClose(pb)
                */
            };
            
            params = params || {};
            if (!params.backLinkText && app.params.material) defaults.backLinkText = '';
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
        
            pb.params = params;
            pb.params.iconsColorClass = pb.params.iconsColor ? 'color-' + pb.params.iconsColor : (pb.params.theme === 'dark' ? 'color-white' : '');
            pb.params.preloaderColorClass = pb.params.theme === 'dark' ? 'preloader-white' : '';
        
            // Templates
            var photoTemplate = pb.params.photoTemplate || 
                '<div class="photo-browser-slide swiper-slide">' +
                    '<span class="photo-browser-zoom-container">' +
                        '<img src="{{js "this.url || this"}}">' +
                    '</span>' +
                '</div>';
            var photoLazyTemplate = pb.params.lazyPhotoTemplate ||
                '<div class="photo-browser-slide photo-browser-slide-lazy swiper-slide">' +
                    '<div class="preloader {{@root.preloaderColorClass}}">{{#if @root.material}}{{@root.materialPreloaderHtml}}{{/if}}</div>' +
                    '<span class="photo-browser-zoom-container">' +
                        '<img data-src="{{js "this.url || this"}}" class="swiper-lazy">' +
                    '</span>' +
                '</div>';
            var objectTemplate = pb.params.objectTemplate ||
                '<div class="photo-browser-slide photo-browser-object-slide swiper-slide">{{js "this.html || this"}}</div>';
            var captionTemplate = pb.params.captionTemplate ||
                '<div class="photo-browser-caption" data-caption-index="{{@index}}">' +
                    '{{caption}}' +
                '</div>';
            var navbarTemplate = pb.params.navbarTemplate ||
                '<div class="navbar">' +
                    '<div class="navbar-inner">' +
                        '<div class="left sliding">' +
                            '<a href="#" class="link close-popup photo-browser-close-link {{#unless backLinkText}}icon-only{{/unless}} {{js "this.type === \'page\' ? \'back\' : \'\'"}}">' +
                                '<i class="icon icon-back {{iconsColorClass}}"></i>' +
                                '{{#if backLinkText}}<span>{{backLinkText}}</span>{{/if}}' +
                            '</a>' +
                        '</div>' +
                        '<div class="center sliding">' +
                            '<span class="photo-browser-current"></span> ' +
                            '<span class="photo-browser-of">{{ofText}}</span> ' +
                            '<span class="photo-browser-total"></span>' +
                        '</div>' +
                        '<div class="right"></div>' +
                    '</div>' +
                '</div>';
            var toolbarTemplate = pb.params.toolbarTemplate ||
                '<div class="toolbar tabbar">' +
                    '<div class="toolbar-inner">' +
                        '<a href="#" class="link photo-browser-prev">' +
                            '<i class="icon icon-prev {{iconsColorClass}}"></i>' +
                        '</a>' +
                        '<a href="#" class="link photo-browser-next">' +
                            '<i class="icon icon-next {{iconsColorClass}}"></i>' +
                        '</a>' +
                    '</div>' +
                '</div>';
        
            var htmlTemplate = t7.compile('<div class="photo-browser photo-browser-{{theme}}">' +
                    '<div class="view navbar-fixed toolbar-fixed">' +
                        '{{#unless material}}{{#if navbar}}' +
                        navbarTemplate +
                        '{{/if}}{{/unless}}' +
                        '<div class="page no-toolbar {{#unless navbar}}no-navbar{{/unless}} toolbar-fixed navbar-fixed" data-page="photo-browser-slides">' +
                            '{{#if material}}{{#if navbar}}' +
                            navbarTemplate +
                            '{{/if}}{{/if}}' +
                            '{{#if toolbar}}' +
                            toolbarTemplate +
                            '{{/if}}' +
                            '<div class="photo-browser-captions photo-browser-captions-{{js "this.captionsTheme || this.theme"}}">' +
                                '{{#each photos}}{{#if caption}}' +
                                captionTemplate +
                                '{{/if}}{{/each}}' +
                            '</div>' +
                            '<div class="photo-browser-swiper-container swiper-container">' +
                                '<div class="photo-browser-swiper-wrapper swiper-wrapper">' +
                                    '{{#each photos}}' +
                                    '{{#js_compare "this.html || ((typeof this === \'string\' || this instanceof String) && (this.indexOf(\'<\') >= 0 || this.indexOf(\'>\') >= 0))"}}' +
                                        objectTemplate +
                                    '{{else}}' +
                                        '{{#if @root.lazyLoading}}' +
                                        photoLazyTemplate +
                                        '{{else}}' +
                                        photoTemplate +
                                        '{{/if}}' +
                                    '{{/js_compare}}' +
                                    '{{/each}}' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>')(pb.params);
        
            pb.activeIndex = pb.params.initialSlide;
            pb.openIndex = pb.activeIndex;
            pb.opened = false;
        
            pb.open = function (index) {
                if (typeof index === 'undefined') index = pb.activeIndex;
                index = parseInt(index, 10);
                if (pb.opened && pb.swiper) {
                    pb.swiper.slideTo(index);
                    return;
                }
                pb.opened = true;
                pb.openIndex = index;
                if (pb.params.type === 'standalone') {
                    $('body').append(htmlTemplate);
                }
                if (pb.params.type === 'popup') {
                    pb.popup = app.popup('<div class="popup photo-browser-popup">' + htmlTemplate + '</div>');
                    $(pb.popup).on('closed', pb.onPopupClose);
                }
                if (pb.params.type === 'page') {
                    $(document).on('pageBeforeInit', pb.onPageBeforeInit);
                    $(document).on('pageBeforeRemove', pb.onPageBeforeRemove);
                    if (!pb.params.view) pb.params.view = app.mainView;
                    pb.params.view.loadContent(htmlTemplate);
                    return;
                }
                pb.layout(pb.openIndex);
                if (pb.params.onOpen) {
                    pb.params.onOpen(pb);
                }
        
            };
            pb.close = function () {
                pb.opened = false;
                if (!pb.swiperContainer || pb.swiperContainer.length === 0) {
                    return;
                }
                if (pb.params.onClose) {
                    pb.params.onClose(pb);
                }
                // Detach events
                pb.attachEvents(true);
                // Delete from DOM
                if (pb.params.type === 'standalone') {
                    pb.container.removeClass('photo-browser-in').addClass('photo-browser-out').animationEnd(function () {
                        pb.container.remove();
                    });
                }
                // Destroy slider
                pb.swiper.destroy();
                // Delete references
                pb.swiper = pb.swiperContainer = pb.swiperWrapper = pb.slides = gestureSlide = gestureImg = gestureImgWrap = undefined;
            };
        
            pb.onPopupClose = function (e) {
                pb.close();
                $(pb.popup).off('pageBeforeInit', pb.onPopupClose);
            };
            pb.onPageBeforeInit = function (e) {
                if (e.detail.page.name === 'photo-browser-slides') {
                    pb.layout(pb.openIndex);
                }
                $(document).off('pageBeforeInit', pb.onPageBeforeInit);
            };
            pb.onPageBeforeRemove = function (e) {
                if (e.detail.page.name === 'photo-browser-slides') {
                    pb.close();
                }
                $(document).off('pageBeforeRemove', pb.onPageBeforeRemove);
            };
        
            pb.onSliderTransitionStart = function (swiper) {
                pb.activeIndex = swiper.activeIndex;
        
                var current = swiper.activeIndex + 1;
                var total = swiper.slides.length;
                if (pb.params.loop) {
                    total = total - 2;
                    current = current - swiper.loopedSlides;
                    if (current < 1) current = total + current;
                    if (current > total) current = current - total;
                }
                pb.container.find('.photo-browser-current').text(current);
                pb.container.find('.photo-browser-total').text(total);
        
                $('.photo-browser-prev, .photo-browser-next').removeClass('photo-browser-link-inactive');
                
                if (swiper.isBeginning && !pb.params.loop) {
                    $('.photo-browser-prev').addClass('photo-browser-link-inactive');
                }
                if (swiper.isEnd && !pb.params.loop) {
                    $('.photo-browser-next').addClass('photo-browser-link-inactive');
                }
        
                // Update captions
                if (pb.captions.length > 0) {
                    pb.captionsContainer.find('.photo-browser-caption-active').removeClass('photo-browser-caption-active');
                    var captionIndex = pb.params.loop ? swiper.slides.eq(swiper.activeIndex).attr('data-swiper-slide-index') : pb.activeIndex;
                    pb.captionsContainer.find('[data-caption-index="' + captionIndex + '"]').addClass('photo-browser-caption-active');
                }
        
        
                // Stop Video
                var previousSlideVideo = swiper.slides.eq(swiper.previousIndex).find('video');
                if (previousSlideVideo.length > 0) {
                    if ('pause' in previousSlideVideo[0]) previousSlideVideo[0].pause();
                }
                // Callback
                if (pb.params.onTransitionStart) pb.params.onTransitionStart(swiper);
            };
            pb.onSliderTransitionEnd = function (swiper) {
                // Reset zoom
                if (pb.params.zoom && gestureSlide && swiper.previousIndex !== swiper.activeIndex) {
                    gestureImg.transform('translate3d(0,0,0) scale(1)');
                    gestureImgWrap.transform('translate3d(0,0,0)');
                    gestureSlide = gestureImg = gestureImgWrap = undefined;
                    scale = currentScale = 1;
                }
                if (pb.params.onTransitionEnd) pb.params.onTransitionEnd(swiper);
            };
            
            pb.layout = function (index) {
                if (pb.params.type === 'page') {
                    pb.container = $('.photo-browser-swiper-container').parents('.view');
                }
                else {
                    pb.container = $('.photo-browser');
                }
                if (pb.params.type === 'standalone') {
                    pb.container.addClass('photo-browser-in');
                    app.sizeNavbars(pb.container);
                }
                pb.swiperContainer = pb.container.find('.photo-browser-swiper-container');
                pb.swiperWrapper = pb.container.find('.photo-browser-swiper-wrapper');
                pb.slides = pb.container.find('.photo-browser-slide');
                pb.captionsContainer = pb.container.find('.photo-browser-captions');
                pb.captions = pb.container.find('.photo-browser-caption');
                
                var sliderSettings = {
                    nextButton: pb.params.nextButton || '.photo-browser-next',
                    prevButton: pb.params.prevButton || '.photo-browser-prev',
                    indexButton: pb.params.indexButton,
                    initialSlide: index,
                    spaceBetween: pb.params.spaceBetween,
                    speed: pb.params.speed,
                    loop: pb.params.loop,
                    lazyLoading: pb.params.lazyLoading,
                    lazyLoadingInPrevNext: pb.params.lazyLoadingInPrevNext,
                    lazyLoadingOnTransitionStart: pb.params.lazyLoadingOnTransitionStart,
                    preloadImages: pb.params.lazyLoading ? false : true,
                    onTap: function (swiper, e) {
                        if (pb.params.onTap) pb.params.onTap(swiper, e);
                    },
                    onClick: function (swiper, e) {
                        if (pb.params.exposition) pb.toggleExposition();
                        if (pb.params.onClick) pb.params.onClick(swiper, e);
                    },
                    onDoubleTap: function (swiper, e) {
                        pb.toggleZoom(e);
                        if (pb.params.onDoubleTap) pb.params.onDoubleTap(swiper, e);
                    },
                    onTransitionStart: function (swiper) {
                        pb.onSliderTransitionStart(swiper);
                    },
                    onTransitionEnd: function (swiper) {
                        pb.onSliderTransitionEnd(swiper);  
                    },
                    onSlideChangeStart: pb.params.onSlideChangeStart,
                    onSlideChangeEnd: pb.params.onSlideChangeEnd,
                    onLazyImageLoad: function (swiper, slide, img) {
                        if (pb.params.onLazyImageLoad) pb.params.onLazyImageLoad(pb, slide, img);
                    },
                    onLazyImageReady: function (swiper, slide, img) {
                        $(slide).removeClass('photo-browser-slide-lazy');
                        if (pb.params.onLazyImageReady) pb.params.onLazyImageReady(pb, slide, img);
                    }
                };
        
                if (pb.params.swipeToClose && pb.params.type !== 'page') {
                    sliderSettings.onTouchStart = pb.swipeCloseTouchStart;
                    sliderSettings.onTouchMoveOpposite = pb.swipeCloseTouchMove;
                    sliderSettings.onTouchEnd = pb.swipeCloseTouchEnd;
                }
        
                pb.swiper = app.swiper(pb.swiperContainer, sliderSettings);
                if (index === 0) {
                    pb.onSliderTransitionStart(pb.swiper);
                }
                pb.attachEvents();
            };
            pb.attachEvents = function (detach) {
                var action = detach ? 'off' : 'on';
                // Slide between photos
        
                if (pb.params.zoom) {
                    var target = pb.params.loop ? pb.swiper.slides : pb.slides;
                    // Scale image
                    target[action]('gesturestart', pb.onSlideGestureStart);
                    target[action]('gesturechange', pb.onSlideGestureChange);
                    target[action]('gestureend', pb.onSlideGestureEnd);
        
                    // Move image
                    target[action](app.touchEvents.start, pb.onSlideTouchStart);
                    target[action](app.touchEvents.move, pb.onSlideTouchMove);
                    target[action](app.touchEvents.end, pb.onSlideTouchEnd);
                }
                pb.container.find('.photo-browser-close-link')[action]('click', pb.close);
            };
        
            var isTouched, isMoved, touchesStart = {}, touchesCurrent = {}, touchStartTime, isScrolling, animating = false, currentTranslate;
            var allowClick = true;
        
            // Expose
            pb.exposed = false;
            pb.toggleExposition = function () {
                if (pb.container) pb.container.toggleClass('photo-browser-exposed');
                if (pb.params.expositionHideCaptions) pb.captionsContainer.toggleClass('photo-browser-captions-exposed');
                pb.exposed = !pb.exposed;
            };
            pb.enableExposition = function () {
                if (pb.container) pb.container.addClass('photo-browser-exposed');
                if (pb.params.expositionHideCaptions) pb.captionsContainer.addClass('photo-browser-captions-exposed');
                pb.exposed = true;
            };
            pb.disableExposition = function () {
                if (pb.container) pb.container.removeClass('photo-browser-exposed');
                if (pb.params.expositionHideCaptions) pb.captionsContainer.removeClass('photo-browser-captions-exposed');
                pb.exposed = false;
            };
            
            // Gestures
            var gestureSlide, gestureImg, gestureImgWrap, scale = 1, currentScale = 1, isScaling = false;
            pb.onSlideGestureStart = function (e) {
                if (!gestureSlide || !gestureSlide.length) {
                    gestureSlide = $(this);
                    if (gestureSlide.length === 0) gestureSlide = pb.swiper.slides.eq(pb.swiper.activeIndex);
                    gestureImg = gestureSlide.find('img, svg, canvas');
                    gestureImgWrap = gestureImg.parent('.photo-browser-zoom-container');
                    if (gestureImgWrap.length === 0) {
                        gestureImg = undefined;
                        return;
                    }
                }
                gestureImg.transition(0);
                isScaling = true;
            };
            pb.onSlideGestureChange = function (e) {
                if (!gestureImg || gestureImg.length === 0) return;
                scale = e.scale * currentScale;
                if (scale > pb.params.maxZoom) {
                    scale = pb.params.maxZoom - 1 + Math.pow((scale - pb.params.maxZoom + 1), 0.5);
                }
                if (scale < pb.params.minZoom) {
                    scale =  pb.params.minZoom + 1 - Math.pow((pb.params.minZoom - scale + 1), 0.5);
                }
                gestureImg.transform('translate3d(0,0,0) scale(' + scale + ')');
            };
            pb.onSlideGestureEnd = function (e) {
                if (!gestureImg || gestureImg.length === 0) return;
                scale = Math.max(Math.min(scale, pb.params.maxZoom), pb.params.minZoom);
                gestureImg.transition(pb.params.speed).transform('translate3d(0,0,0) scale(' + scale + ')');
                currentScale = scale;
                isScaling = false;
                if (scale === 1) gestureSlide = undefined;
            };
            pb.toggleZoom = function (e) {
                if (!gestureSlide) {
                    gestureSlide = pb.swiper.slides.eq(pb.swiper.activeIndex);
                    gestureImg = gestureSlide.find('img, svg, canvas');
                    gestureImgWrap = gestureImg.parent('.photo-browser-zoom-container');
                }
                if (!gestureImg || gestureImg.length === 0) return;
                
                var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight, scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY;
        
                if (typeof imageTouchesStart.x === 'undefined' && e) {
                    touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
                    touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
                }
                else {
                    touchX = imageTouchesStart.x;
                    touchY = imageTouchesStart.y;
                }
                
                if (scale && scale !== 1) {
                    // Zoom Out
                    scale = currentScale = 1;
                    gestureImgWrap.transition(300).transform('translate3d(0,0,0)');
                    gestureImg.transition(300).transform('translate3d(0,0,0) scale(1)');
                    gestureSlide = undefined;
                }
                else {
                    // Zoom In
                    scale = currentScale = pb.params.maxZoom;
                    if (e) {
                        offsetX = pb.container.offset().left;
                        offsetY = pb.container.offset().top;
                        diffX = offsetX + pb.container[0].offsetWidth/2 - touchX;
                        diffY = offsetY + pb.container[0].offsetHeight/2 - touchY;
        
                        imageWidth = gestureImg[0].offsetWidth;
                        imageHeight = gestureImg[0].offsetHeight;
                        scaledWidth = imageWidth * scale;
                        scaledHeight = imageHeight * scale;
        
                        translateMinX = Math.min((pb.swiper.width / 2 - scaledWidth / 2), 0);
                        translateMinY = Math.min((pb.swiper.height / 2 - scaledHeight / 2), 0);
                        translateMaxX = -translateMinX;
                        translateMaxY = -translateMinY;
        
                        translateX = diffX * scale;
                        translateY = diffY * scale;
                        
                        if (translateX < translateMinX) {
                            translateX =  translateMinX;
                        }
                        if (translateX > translateMaxX) {
                            translateX = translateMaxX;
                        }
                        
                        if (translateY < translateMinY) {
                            translateY =  translateMinY;
                        }
                        if (translateY > translateMaxY) {
                            translateY = translateMaxY;
                        }
                    }
                    else {
                        translateX = 0;
                        translateY = 0;
                    }
                    gestureImgWrap.transition(300).transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
                    gestureImg.transition(300).transform('translate3d(0,0,0) scale(' + scale + ')');
                }
            };
        
            var imageIsTouched, imageIsMoved, imageCurrentX, imageCurrentY, imageMinX, imageMinY, imageMaxX, imageMaxY, imageWidth, imageHeight, imageTouchesStart = {}, imageTouchesCurrent = {}, imageStartX, imageStartY, velocityPrevPositionX, velocityPrevTime, velocityX, velocityPrevPositionY, velocityY;
        
            pb.onSlideTouchStart = function (e) {
                if (!gestureImg || gestureImg.length === 0) return;
                if (imageIsTouched) return;
                if (app.device.os === 'android') e.preventDefault();
                imageIsTouched = true;
                imageTouchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                imageTouchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            };
            pb.onSlideTouchMove = function (e) {
                if (!gestureImg || gestureImg.length === 0) return;
                pb.swiper.allowClick = false;
                if (!imageIsTouched || !gestureSlide) return;
        
                if (!imageIsMoved) {
                    imageWidth = gestureImg[0].offsetWidth;
                    imageHeight = gestureImg[0].offsetHeight;
                    imageStartX = $.getTranslate(gestureImgWrap[0], 'x') || 0;
                    imageStartY = $.getTranslate(gestureImgWrap[0], 'y') || 0;
                    gestureImgWrap.transition(0);
                }
                // Define if we need image drag
                var scaledWidth = imageWidth * scale;
                var scaledHeight = imageHeight * scale;
        
                if (scaledWidth < pb.swiper.width && scaledHeight < pb.swiper.height) return;
        
                imageMinX = Math.min((pb.swiper.width / 2 - scaledWidth / 2), 0);
                imageMaxX = -imageMinX;
                imageMinY = Math.min((pb.swiper.height / 2 - scaledHeight / 2), 0);
                imageMaxY = -imageMinY;
                
                imageTouchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                imageTouchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
                if (!imageIsMoved && !isScaling) {
                    if (
                        (Math.floor(imageMinX) === Math.floor(imageStartX) && imageTouchesCurrent.x < imageTouchesStart.x) ||
                        (Math.floor(imageMaxX) === Math.floor(imageStartX) && imageTouchesCurrent.x > imageTouchesStart.x)
                        ) {
                        imageIsTouched = false;
                        return;
                    }
                }
                e.preventDefault();
                e.stopPropagation();
                imageIsMoved = true;
                imageCurrentX = imageTouchesCurrent.x - imageTouchesStart.x + imageStartX;
                imageCurrentY = imageTouchesCurrent.y - imageTouchesStart.y + imageStartY;
                
                if (imageCurrentX < imageMinX) {
                    imageCurrentX =  imageMinX + 1 - Math.pow((imageMinX - imageCurrentX + 1), 0.8);
                }
                if (imageCurrentX > imageMaxX) {
                    imageCurrentX = imageMaxX - 1 + Math.pow((imageCurrentX - imageMaxX + 1), 0.8);
                }
                
                if (imageCurrentY < imageMinY) {
                    imageCurrentY =  imageMinY + 1 - Math.pow((imageMinY - imageCurrentY + 1), 0.8);
                }
                if (imageCurrentY > imageMaxY) {
                    imageCurrentY = imageMaxY - 1 + Math.pow((imageCurrentY - imageMaxY + 1), 0.8);
                }
        
                //Velocity
                if (!velocityPrevPositionX) velocityPrevPositionX = imageTouchesCurrent.x;
                if (!velocityPrevPositionY) velocityPrevPositionY = imageTouchesCurrent.y;
                if (!velocityPrevTime) velocityPrevTime = Date.now();
                velocityX = (imageTouchesCurrent.x - velocityPrevPositionX) / (Date.now() - velocityPrevTime) / 2;
                velocityY = (imageTouchesCurrent.y - velocityPrevPositionY) / (Date.now() - velocityPrevTime) / 2;
                if (Math.abs(imageTouchesCurrent.x - velocityPrevPositionX) < 2) velocityX = 0;
                if (Math.abs(imageTouchesCurrent.y - velocityPrevPositionY) < 2) velocityY = 0;
                velocityPrevPositionX = imageTouchesCurrent.x;
                velocityPrevPositionY = imageTouchesCurrent.y;
                velocityPrevTime = Date.now();
        
                gestureImgWrap.transform('translate3d(' + imageCurrentX + 'px, ' + imageCurrentY + 'px,0)');
            };
            pb.onSlideTouchEnd = function (e) {
                if (!gestureImg || gestureImg.length === 0) return;
                if (!imageIsTouched || !imageIsMoved) {
                    imageIsTouched = false;
                    imageIsMoved = false;
                    return;
                }
                imageIsTouched = false;
                imageIsMoved = false;
                var momentumDurationX = 300;
                var momentumDurationY = 300;
                var momentumDistanceX = velocityX * momentumDurationX;
                var newPositionX = imageCurrentX + momentumDistanceX;
                var momentumDistanceY = velocityY * momentumDurationY;
                var newPositionY = imageCurrentY + momentumDistanceY;
        
                //Fix duration
                if (velocityX !== 0) momentumDurationX = Math.abs((newPositionX - imageCurrentX) / velocityX);
                if (velocityY !== 0) momentumDurationY = Math.abs((newPositionY - imageCurrentY) / velocityY);
                var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
        
                imageCurrentX = newPositionX;
                imageCurrentY = newPositionY;
        
                // Define if we need image drag
                var scaledWidth = imageWidth * scale;
                var scaledHeight = imageHeight * scale;
                imageMinX = Math.min((pb.swiper.width / 2 - scaledWidth / 2), 0);
                imageMaxX = -imageMinX;
                imageMinY = Math.min((pb.swiper.height / 2 - scaledHeight / 2), 0);
                imageMaxY = -imageMinY;
                imageCurrentX = Math.max(Math.min(imageCurrentX, imageMaxX), imageMinX);
                imageCurrentY = Math.max(Math.min(imageCurrentY, imageMaxY), imageMinY);
        
                gestureImgWrap.transition(momentumDuration).transform('translate3d(' + imageCurrentX + 'px, ' + imageCurrentY + 'px,0)');
            };
        
            // Swipe Up To Close
            var swipeToCloseIsTouched = false;
            var allowSwipeToClose = true;
            var swipeToCloseDiff, swipeToCloseStart, swipeToCloseCurrent, swipeToCloseStarted = false, swipeToCloseActiveSlide, swipeToCloseTimeStart;
            pb.swipeCloseTouchStart = function (swiper, e) {
                if (!allowSwipeToClose) return;
                swipeToCloseIsTouched = true;
            };
            pb.swipeCloseTouchMove = function (swiper, e) {
                if (!swipeToCloseIsTouched) return;
                if (!swipeToCloseStarted) {
                    swipeToCloseStarted = true;
                    swipeToCloseStart = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    swipeToCloseActiveSlide = pb.swiper.slides.eq(pb.swiper.activeIndex);
                    swipeToCloseTimeStart = (new Date()).getTime();
                }
                e.preventDefault();
                swipeToCloseCurrent = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                swipeToCloseDiff = swipeToCloseStart - swipeToCloseCurrent;
                var opacity = 1 - Math.abs(swipeToCloseDiff) / 300;
                swipeToCloseActiveSlide.transform('translate3d(0,' + (-swipeToCloseDiff) + 'px,0)');
                pb.swiper.container.css('opacity', opacity).transition(0);
            };
            pb.swipeCloseTouchEnd = function (swiper, e) {
                swipeToCloseIsTouched = false;
                if (!swipeToCloseStarted) {
                    swipeToCloseStarted = false;
                    return;
                }
                swipeToCloseStarted = false;
                allowSwipeToClose = false;
                var diff = Math.abs(swipeToCloseDiff);
                var timeDiff = (new Date()).getTime() - swipeToCloseTimeStart;
                if ((timeDiff < 300 && diff > 20) || (timeDiff >= 300 && diff > 100)) {
                    setTimeout(function () {
                        if (pb.params.type === 'standalone') {
                            pb.close();
                        }
                        if (pb.params.type === 'popup') {
                            app.closeModal(pb.popup);
                        }
                        if (pb.params.onSwipeToClose) {
                            pb.params.onSwipeToClose(pb);
                        }
                        allowSwipeToClose = true;
                    }, 0);
                    return;
                }
                if (diff !== 0) {
                    swipeToCloseActiveSlide.addClass('transitioning').transitionEnd(function () {
                        allowSwipeToClose = true;
                        swipeToCloseActiveSlide.removeClass('transitioning');
                    });
                }
                else {
                    allowSwipeToClose = true;
                }
                pb.swiper.container.css('opacity', '').transition('');
                swipeToCloseActiveSlide.transform('');
            };
        
            return pb;
        };
        
        app.photoBrowser = function (params) {
            return new PhotoBrowser(params);
        };
        

        /*===============================================================================
        ************   Autocomplete   ************
        ===============================================================================*/
        var Autocomplete = function (params) {
            var a = this;
        
            // Params
            var defaults = {
                // Standalone Options
                // opener: undefined,
                popupCloseText: 'Close',
                backText: 'Back',
                searchbarPlaceholderText: 'Search...',
                searchbarCancelText: 'Cancel',
                openIn: 'page',
                backOnSelect: false,
                notFoundText: 'Nothing found',
                // pageTitle: undefined,
        
                // Handle Data
                // source: undefined,
                // limit: undefined,
                valueProperty: 'id',
                textProperty: 'text',
        
                // Dropdown Options
                // dropdownPlaceholderText: 'Type anything...',
                updateInputValueOnSelect: true,
                expandInput: false,
        
                // Preloader
                preloaderColor: false,
                preloader: false,
        
                // Templates
                // itemTemplate: undefined,
                // naavbarTemplate: undefined,
                // pageTemplate: undefined,
                // searchbarTemplate: undefined,
                // dropD: undefined,
                // dropdownItemTemplate: undefined,
                // dropdownPlaceholderTemplate: undefined
        
                // Color themes
                // toolbarTheme: undefined,
                // navbarTheme: undefined,
                // formTheme: undefined,
        
                // Callbacks
                //onChange: function (a, value) - for not dropdown
                //onOpen: function (a)
                //onClose: function (a)
            };
        
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            a.params = params;
        
            // Opener Link & View
            if (a.params.opener) {
                a.opener = $(a.params.opener);
            }
            var view = a.params.view;
            if (!a.params.view && a.opener && a.opener.length) {
                // Find related view
                view = a.opener.parents('.' + app.params.viewClass);
                if (view.length === 0) return;
                view = view[0].f7View;
            }
        
            // Input
            if (a.params.input) {
                a.input = $(a.params.input);
                if (a.input.length === 0 && a.params.openIn === 'dropdown') return;
            }
        
            // Array with selected items
            a.value = a.params.value || [];
        
            // ID & Inputs
            a.id = (new Date()).getTime();
            a.inputType = a.params.multiple ? 'checkbox' : 'radio';
            a.inputName = a.inputType + '-' + a.id;
        
            // Is Material
            var material = app.params.material;
        
            // Back On Select
            var backOnSelect = a.params.backOnSelect;
        
            if (a.params.openIn !== 'dropdown') {
                // Item Template
                a.itemTemplate = t7.compile(a.params.itemTemplate ||
                    '<li>' +
                        '<label class="label-{{inputType}} item-content">' +
                            '<input type="{{inputType}}" name="{{inputName}}" value="{{value}}" {{#if selected}}checked{{/if}}>' +
                            '{{#if material}}' +
                                '<div class="item-media">' +
                                    '<i class="icon icon-form-{{inputType}}"></i>' +
                                '</div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title">{{text}}</div>' +
                                '</div>' +
                            '{{else}}' +
                                '{{#if checkbox}}' +
                                '<div class="item-media">' +
                                    '<i class="icon icon-form-checkbox"></i>' +
                                '</div>' +
                                '{{/if}}' +
                                '<div class="item-inner">' +
                                    '<div class="item-title">{{text}}</div>' +
                                '</div>' +
                            '{{/if}}' +
                        '</label>' +
                    '</li>'
                );
                // Page Layout
                var pageTitle = a.params.pageTitle || '';
                if (!pageTitle && a.opener && a.opener.length) {
                    pageTitle = a.opener.find('.item-title').text();
                }
                var pageName = 'autocomplete-' + a.inputName;
        
                var navbarTheme = a.params.navbarTheme,
                    formTheme = a.params.formTheme;
        
                // Navbar HTML
                var navbarHTML;
                var noNavbar = '', noToolbar = '', navbarLayout;
        
                a.navbarTemplate = t7.compile(a.params.navbarTemplate ||
                    '<div class="navbar {{#if navbarTheme}}theme-{{navbarTheme}}{{/if}}">' +
                        '<div class="navbar-inner">' +
                            '<div class="left sliding">' +
                                '{{#if material}}' +
                                '<a href="#" class="link {{#if inPopup}}close-popup{{else}}back{{/if}} icon-only"><i class="icon icon-back"></i></a>' +
                                '{{else}}' +
                                '<a href="#" class="link {{#if inPopup}}close-popup{{else}}back{{/if}}">' +
                                    '<i class="icon icon-back"></i>' +
                                    '{{#if inPopup}}' +
                                    '<span>{{popupCloseText}}</span>' +
                                    '{{else}}' +
                                    '<span>{{backText}}</span>' +
                                    '{{/if}}' +
                                '</a>' +
                                '{{/if}}' +
                            '</div>' +
                            '<div class="center sliding">{{pageTitle}}</div>' +
                            '{{#if preloader}}' +
                            '<div class="right">' +
                                '<div class="autocomplete-preloader preloader {{#if preloaderColor}}preloader-{{preloaderColor}}{{/if}}"></div>' +
                            '</div>' +
                            '{{/if}}' +
                        '</div>' +
                    '</div>'
                );
                navbarHTML = a.navbarTemplate({
                    pageTitle: pageTitle,
                    backText: a.params.backText,
                    popupCloseText: a.params.popupCloseText,
                    openIn: a.params.openIn,
                    navbarTheme: navbarTheme,
                    inPopup: a.params.openIn === 'popup',
                    inPage: a.params.openIn === 'page',
                    material: material,
                    preloader: a.params.preloader,
                    preloaderColor: a.params.preloaderColor,
                });
        
                // Determine navbar layout type - static/fixed/through
                if (a.params.openIn === 'page') {
                    navbarLayout = 'static';
                    if (a.opener) {
                        if (a.opener.parents('.navbar-through').length > 0) navbarLayout = 'through';
                        if (a.opener.parents('.navbar-fixed').length > 0) navbarLayout = 'fixed';
                        noToolbar = a.opener.parents('.page').hasClass('no-toolbar') ? 'no-toolbar' : '';
                        noNavbar  = a.opener.parents('.page').hasClass('no-navbar')  ? 'no-navbar'  : 'navbar-' + navbarLayout;
                    }
                    else if (view.container) {
                        if ($(view.container).hasClass('navbar-through') || $(view.container).find('.navbar-through').length > 0) navbarLayout = 'through';
                        if ($(view.container).hasClass('navbar-fixed') || $(view.container).find('.navbar-fixed').length > 0) navbarLayout = 'fixed';
                        noToolbar = $(view.activePage.container).hasClass('no-toolbar') ? 'no-toolbar' : '';
                        noNavbar  = $(view.activePage.container).hasClass('no-navbar')  ? 'no-navbar'  : 'navbar-' + navbarLayout;
                    }
                }
                else {
                    navbarLayout = 'fixed';
                }
                var searchbarHTML =
                    '<form class="searchbar">' +
                        '<div class="searchbar-input">' +
                            '<input type="search" placeholder="' + a.params.searchbarPlaceholderText + '">' +
                            '<a href="#" class="searchbar-clear"></a>' +
                        '</div>' +
                        (material ? '' : '<a href="#" class="searchbar-cancel">' + a.params.searchbarCancelText + '</a>') +
                    '</form>' +
                    '<div class="searchbar-overlay"></div>';
                var pageHTML =
                    (navbarLayout === 'through' ? navbarHTML : '') +
                    '<div class="pages">' +
                        '<div data-page="' + pageName + '" class="page autocomplete-page ' + noNavbar + ' ' + noToolbar + '">' +
                            (navbarLayout === 'fixed' ? navbarHTML : '') +
                            searchbarHTML +
                            '<div class="page-content">' +
                                (navbarLayout === 'static' ? navbarHTML : '') +
                                '<div class="list-block autocomplete-found autocomplete-list-' + a.id + ' ' + (formTheme ? 'theme-' + formTheme : '') + '">' +
                                    '<ul></ul>' +
                                '</div>' +
                                '<div class="list-block autocomplete-not-found">' +
                                    '<ul><li class="item-content"><div class="item-inner"><div class="item-title">' + a.params.notFoundText + '</div></div></li></ul>' +
                                '</div>' +
                                '<div class="list-block autocomplete-values">' +
                                    '<ul></ul>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
            }
            else {
                a.dropdownItemTemplate = t7.compile(a.params.dropdownItemTemplate ||
                    '<li>' +
                        '<label class="{{#unless placeholder}}label-radio{{/unless}} item-content" data-value="{{value}}">' +
                            '<div class="item-inner">' +
                                '<div class="item-title">{{text}}</div>' +
                            '</div>' +
                        '</label>' +
                    '</li>'
                );
                a.dropdownPlaceholderTemplate = t7.compile(a.params.dropdownPlaceholderTemplate ||
                    '<li class="autocomplete-dropdown-placeholder">' +
                        '<div class="item-content">' +
                            '<div class="item-inner">' +
                                '<div class="item-title">{{text}}</div>' +
                            '</div>' +
                        '</label>' +
                    '</li>'
                );
                a.dropdownTemplate = t7.compile(a.params.dropdownTemplate ||
                    '<div class="autocomplete-dropdown">' +
                        '<div class="autocomplete-dropdown-inner">' +
                            '<div class="list-block">' +
                                '<ul></ul>' +
                            '</div>' +
                        '</div>' +
                        '{{#if preloader}}' +
                        '<div class="autocomplete-preloader preloader {{#if preloaderColor}}preloader-{{preloaderColor}}{{/if}}">{{#if material}}{{materialPreloaderHtml}}{{/if}}</div>' +
                        '{{/if}}' +
                    '</div>'
                );
            }
        
            // Define popup
            a.popup = undefined;
        
            // Define Dropdown
            a.dropdown = undefined;
        
            // Handle Input Value Change
            a.handleInputValue = function (e) {
                var query = a.input.val();
                if (a.params.source) {
                    a.params.source(a, query, function (items) {
                        var itemsHTML = '';
                        var limit = a.params.limit ? Math.min(a.params.limit, items.length) : items.length;
                        a.items = items;
                        var i, j;
                        var regExp = new RegExp('('+query+')', 'i');
                        for (i = 0; i < limit; i++) {
                            var itemValue = typeof items[i] === 'object' ? items[i][a.params.valueProperty] : items[i];
                            itemsHTML += a.dropdownItemTemplate({
                                value: itemValue,
                                text: (typeof items[i] !== 'object' ? items[i] : items[i][a.params.textProperty]).replace(regExp, '<b>$1</b>')
                            });
                        }
                        if (itemsHTML === '' && query === '' && a.params.dropdownPlaceholderText) {
                            itemsHTML += a.dropdownPlaceholderTemplate({
                                text: a.params.dropdownPlaceholderText,
                            });
                        }
                        a.dropdown.find('ul').html(itemsHTML);
                    });
                }
            };
            // Handle Drop Down Click
            a.handleDropdownClick = function (e) {
                var clicked = $(this);
                var clickedItem;
                for (var i = 0; i < a.items.length; i++) {
                    var itemValue = typeof a.items[i] === 'object' ? a.items[i][a.params.valueProperty] : a.items[i];
                    var value = clicked.attr('data-value');
                    if (itemValue === value || itemValue * 1 === value * 1) {
                        clickedItem = a.items[i];
                    }
                }
                if (a.params.updateInputValueOnSelect) {
                    a.input.val(typeof clickedItem === 'object' ? clickedItem[a.params.textProperty] : clickedItem);
                    a.input.trigger('input change');
                }
        
                if (a.params.onChange) {
                    a.params.onChange(a, clickedItem);
                }
        
                a.close();
            };
            a.positionDropDown = function () {
                var listBlock = a.input.parents('.list-block'),
                    pageContent = a.input.parents('.page-content'),
                    paddingTop = parseInt(pageContent.css('padding-top'), 10),
                    paddingBottom = parseInt(pageContent.css('padding-top'), 10),
                    inputOffset = a.input.offset(),
                    listBlockOffset = listBlock.length > 0 ? listBlock.offset() : 0,
                    maxHeight = pageContent[0].scrollHeight - paddingBottom - (inputOffset.top + pageContent[0].scrollTop) - a.input[0].offsetHeight;
        
                a.dropdown.css({
                    left: (listBlock.length > 0 ? listBlockOffset.left : inputOffset.left) + 'px',
                    top: inputOffset.top + pageContent[0].scrollTop + a.input[0].offsetHeight + 'px',
                    width: (listBlock.length > 0 ? listBlock[0].offsetWidth : a.input[0].offsetWidth) + 'px'
                });
                a.dropdown.children('.autocomplete-dropdown-inner').css({
                    maxHeight: maxHeight + 'px',
                    paddingLeft: listBlock.length > 0 && !a.params.expandInput ? inputOffset.left - (material ? 16 : 15) + 'px' : ''
                });
            };
        
            // Event Listeners on new page
            a.pageInit = function (e) {
                var page = e.detail.page;
                if (page.name !== pageName) {
                    return;
                }
                var container = $(page.container);
                // Init Search Bar
                var searchBar = app.searchbar(container.find('.searchbar'), {
                    customSearch: true,
                    onSearch: function (searchbar, data) {
                        if (data.query.length === 0) {
                            searchbar.overlay.addClass('searchbar-overlay-active');
                        }
                        else {
                            searchbar.overlay.removeClass('searchbar-overlay-active');
                        }
        
                        var i, j, k;
        
                        if (a.params.source) {
                            a.params.source(a, data.query, function(items) {
                                var itemsHTML = '';
                                var limit = a.params.limit ? Math.min(a.params.limit, items.length) : items.length;
                                a.items = items;
                                for (i = 0; i < limit; i++) {
                                    var selected = false;
                                    var itemValue = typeof items[i] === 'object' ? items[i][a.params.valueProperty] : items[i];
                                    for (j = 0; j < a.value.length; j++) {
                                        var aValue = typeof a.value[j] === 'object' ? a.value[j][a.params.valueProperty] : a.value[j];
                                        if (aValue === itemValue || aValue * 1 === itemValue * 1) selected = true;
                                    }
                                    itemsHTML += a.itemTemplate({
                                        value: itemValue,
                                        text: typeof items[i] !== 'object' ? items[i] : items[i][a.params.textProperty],
                                        inputType: a.inputType,
                                        id: a.id,
                                        inputName: a.inputName,
                                        selected: selected,
                                        checkbox: a.inputType === 'checkbox',
                                        material: material
                                    });
                                }
                                container.find('.autocomplete-found ul').html(itemsHTML);
                                if (items.length === 0) {
                                    if (data.query.length !== 0) {
                                        container.find('.autocomplete-not-found').show();
                                        container.find('.autocomplete-found, .autocomplete-values').hide();
                                    }
                                    else {
                                        container.find('.autocomplete-values').show();
                                        container.find('.autocomplete-found, .autocomplete-not-found').hide();
                                    }
                                }
                                else {
                                    container.find('.autocomplete-found').show();
                                    container.find('.autocomplete-not-found, .autocomplete-values').hide();
                                }
                            });
                        }
                    }
                });
        
                function updateValues() {
                    var valuesHTML = '';
                    var i;
                    for (i = 0; i < a.value.length; i++) {
        
                        valuesHTML += a.itemTemplate({
                            value: typeof a.value[i] === 'object' ? a.value[i][a.params.valueProperty] : a.value[i],
                            text: typeof a.value[i] === 'object' ? a.value[i][a.params.textProperty]: a.value[i],
                            inputType: a.inputType,
                            id: a.id,
                            inputName: a.inputName + '-checked',
                            checkbox: a.inputType === 'checkbox',
                            material: material,
                            selected: true
                        });
                    }
                    container.find('.autocomplete-values ul').html(valuesHTML);
                }
        
                // Handle Inputs
                container.on('change', 'input[type="radio"], input[type="checkbox"]', function () {
                    var i;
                    var input = this;
                    var value = input.value;
                    var text = $(input).parents('li').find('.item-title').text();
                    var isValues = $(input).parents('.autocomplete-values').length > 0;
                    var item, itemValue, aValue;
                    if (isValues) {
                        if (a.inputType === 'checkbox' && !input.checked) {
                            for (i = 0; i < a.value.length; i++) {
                                aValue = typeof a.value[i] === 'string' ? a.value[i] : a.value[i][a.params.valueProperty];
                                if (aValue === value || aValue * 1 === value * 1) {
                                    a.value.splice(i, 1);
                                }
                            }
                            updateValues();
                            if (a.params.onChange) a.params.onChange(a, a.value);
                        }
                        return;
                    }
        
                    // Find Related Item
                    for (i = 0; i < a.items.length; i++) {
                        itemValue = typeof a.items[i] === 'string' ? a.items[i] : a.items[i][a.params.valueProperty];
                        if (itemValue === value || itemValue * 1 === value * 1) item = a.items[i];
                    }
                    // Update Selected Value
                    if (a.inputType === 'radio') {
                        a.value = [item];
                    }
                    else {
                        if (input.checked) {
                            a.value.push(item);
                        }
                        else {
                            for (i = 0; i < a.value.length; i++) {
                                aValue = typeof a.value[i] === 'string' ? a.value[i] : a.value[i][a.params.valueProperty];
                                if (aValue === value || aValue * 1 === value * 1) {
                                    a.value.splice(i, 1);
                                }
                            }
                        }
                    }
        
                    // Update Values Block
                    updateValues();
        
                    // On Select Callback
                    if ((a.inputType === 'radio' && input.checked || a.inputType === 'checkbox') && a.params.onChange ) {
                        a.params.onChange(a, a.value);
                    }
                    if (backOnSelect && a.inputType === 'radio') {
                        if (a.params.openIn === 'popup') app.closeModal(a.popup);
                        else view.router.back();
                    }
                });
        
                // Update Values On Page Init
                updateValues();
        
                if (a.params.onOpen) a.params.onOpen(a);
            };
        
            // Show Hide Preloader
            a.showPreloader = function () {
                if (a.params.openIn === 'dropdown') {
                    if (a.dropdown) a.dropdown.find('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
                }
                else $('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
            };
        
            a.hidePreloader = function () {
                if (a.params.openIn === 'dropdown') {
                    if (a.dropdown) a.dropdown.find('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
                }
                else $('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
            };
        
            // Open Autocomplete Page/Popup
            a.open = function () {
                if (a.opened) return;
                a.opened = true;
                if (a.params.openIn === 'dropdown') {
                    if (!a.dropdown) {
                        a.dropdown = $(a.dropdownTemplate({
                            preloader: a.params.preloader,
                            preloaderColor: a.params.preloaderColor,
                            material: material,
                            materialPreloaderHtml: app.params.materialPreloaderHtml
                        }));
                        a.dropdown.on('click', 'label', a.handleDropdownClick);
        
                    }
                    var listBlock = a.input.parents('.list-block');
                    if (listBlock.length && a.input.parents('.item-content').length > 0 && a.params.expandInput) {
                        a.input.parents('.item-content').addClass('item-content-dropdown-expand');
                    }
                    a.positionDropDown();
                    a.input.parents('.page-content').append(a.dropdown);
                    a.dropdown.addClass('autocomplete-dropdown-in');
                    a.input.trigger('input');
                    $(window).on('resize', a.positionDropDown);
                    if (a.params.onOpen) a.params.onOpen(a);
                }
                else {
                    $(document).once('pageInit', '.autocomplete-page', a.pageInit);
                    if (a.params.openIn === 'popup') {
                        a.popup = app.popup(
                            '<div class="popup autocomplete-popup autocomplete-popup-' + a.inputName + '">' +
                                '<div class="view navbar-fixed">' +
                                    pageHTML +
                                '</div>' +
                            '</div>'
                            );
                        a.popup = $(a.popup);
                        a.popup.once('closed', function () {
                            a.popup = undefined;
                            a.opened = false;
                            if (a.params.onClose) a.params.onClose(a);
                        });
                    }
                    else {
                        view.router.load({
                            content: pageHTML
                        });
                        $(document).once('pageBack', '.autocomplete-page', function () {
                            a.opened = false;
                            if (a.params.onClose) a.params.onClose(a);
                        });
                    }
                }
            };
            a.close = function (e) {
                if (!a.opened) return;
                if (a.params.openIn === 'dropdown') {
                    if (e && e.type === 'blur' && a.dropdown.find('label.active-state').length > 0) return;
                    a.dropdown.removeClass('autocomplete-dropdown-in').remove();
                    a.input.parents('.item-content-dropdown-expand').removeClass('item-content-dropdown-expand');
                    a.opened = false;
                    $(window).off('resize', a.positionDropDown);
                    if (a.params.onClose) a.params.onClose(a);
                }
                if (a.params.openIn === 'popup') {
                    if (a.popup) app.closeModal(a.popup);
                }
            };
        
            // Init Events
            a.initEvents = function (detach) {
                var method = detach ? 'off' : 'on';
                if (a.params.openIn !== 'dropdown' && a.opener) {
                    a.opener[method]('click', a.open);
                }
                if (a.params.openIn === 'dropdown' && a.input) {
                    a.input[method]('focus', a.open);
                    a.input[method]('input', a.handleInputValue);
                    a.input[method]('blur', a.close);
                }
                if (detach && a.dropdown) {
                    a.dropdown = null;
                }
            };
        
            // Init/Destroy Methods
            a.init = function () {
                a.initEvents();
            };
            a.destroy = function () {
                a.initEvents(true);
                a = null;
            };
        
            // Init
            a.init();
        
            return a;
        };
        app.autocomplete = function (params) {
            return new Autocomplete(params);
        };

        /*======================================================
        ************   Picker   ************
        ======================================================*/
        var Picker = function (params) {
            var p = this;
            var defaults = {
                updateValuesOnMomentum: false,
                updateValuesOnTouchmove: true,
                rotateEffect: false,
                momentumRatio: 7,
                freeMode: false,
                // Common settings
                closeByOutsideClick: true,
                scrollToInput: true,
                inputReadOnly: true,
                convertToPopover: true,
                onlyInPopover: false,
                toolbar: true,
                toolbarCloseText: 'Done',
                toolbarTemplate: 
                    '<div class="toolbar">' +
                        '<div class="toolbar-inner">' +
                            '<div class="left"></div>' +
                            '<div class="right">' +
                                '<a href="#" class="link close-picker">{{closeText}}</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
            };
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            p.params = params;
            p.cols = [];
            p.initialized = false;
            
            // Inline flag
            p.inline = p.params.container ? true : false;
        
            // 3D Transforms origin bug, only on safari
            var originBug = app.device.ios || (navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && navigator.userAgent.toLowerCase().indexOf('chrome') < 0) && !app.device.android;
        
            // Should be converted to popover
            function isPopover() {
                var toPopover = false;
                if (!p.params.convertToPopover && !p.params.onlyInPopover) return toPopover;
                if (!p.inline && p.params.input) {
                    if (p.params.onlyInPopover) toPopover = true;
                    else {
                        if (app.device.ios) {
                            toPopover = app.device.ipad ? true : false;
                        }
                        else {
                            if ($(window).width() >= 768) toPopover = true;
                        }
                    }
                } 
                return toPopover; 
            }
            function inPopover() {
                if (p.opened && p.container && p.container.length > 0 && p.container.parents('.popover').length > 0) return true;
                else return false;
            }
        
            // Value
            p.setValue = function (arrValues, transition) {
                var valueIndex = 0;
                if (p.cols.length === 0) {
                    p.value = arrValues;
                    p.updateValue(arrValues);
                    return;
                }
                for (var i = 0; i < p.cols.length; i++) {
                    if (p.cols[i] && !p.cols[i].divider) {
                        p.cols[i].setValue(arrValues[valueIndex], transition);
                        valueIndex++;
                    }
                }
            };
            p.updateValue = function (forceValues) {
                var newValue = forceValues || [];
                var newDisplayValue = [];
                for (var i = 0; i < p.cols.length; i++) {
                    if (!p.cols[i].divider) {
                        newValue.push(p.cols[i].value);
                        newDisplayValue.push(p.cols[i].displayValue);
                    }
                }
                if (newValue.indexOf(undefined) >= 0) {
                    return;
                }
                p.value = newValue;
                p.displayValue = newDisplayValue;
                if (p.params.onChange) {
                    p.params.onChange(p, p.value, p.displayValue);
                }
                if (p.input && p.input.length > 0) {
                    $(p.input).val(p.params.formatValue ? p.params.formatValue(p, p.value, p.displayValue) : p.value.join(' '));
                    $(p.input).trigger('change');
                }
            };
        
            // Columns Handlers
            p.initPickerCol = function (colElement, updateItems) {
                var colContainer = $(colElement);
                var colIndex = colContainer.index();
                var col = p.cols[colIndex];
                if (col.divider) return;
                col.container = colContainer;
                col.wrapper = col.container.find('.picker-items-col-wrapper');
                col.items = col.wrapper.find('.picker-item');
                
                var i, j;
                var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;
                col.replaceValues = function (values, displayValues) {
                    col.destroyEvents();
                    col.values = values;
                    col.displayValues = displayValues;
                    var newItemsHTML = p.columnHTML(col, true);
                    col.wrapper.html(newItemsHTML);
                    col.items = col.wrapper.find('.picker-item');
                    col.calcSize();
                    col.setValue(col.values[0], 0, true);
                    col.initEvents();
                };
                col.calcSize = function () {
                    if (p.params.rotateEffect) {
                        col.container.removeClass('picker-items-col-absolute');
                        if (!col.width) col.container.css({width:''});
                    }
                    var colWidth, colHeight;
                    colWidth = 0;
                    colHeight = col.container[0].offsetHeight;
                    wrapperHeight = col.wrapper[0].offsetHeight;
                    itemHeight = col.items[0].offsetHeight;
                    itemsHeight = itemHeight * col.items.length;
                    minTranslate = colHeight / 2 - itemsHeight + itemHeight / 2;
                    maxTranslate = colHeight / 2 - itemHeight / 2;    
                    if (col.width) {
                        colWidth = col.width;
                        if (parseInt(colWidth, 10) === colWidth) colWidth = colWidth + 'px';
                        col.container.css({width: colWidth});
                    }
                    if (p.params.rotateEffect) {
                        if (!col.width) {
                            col.items.each(function () {
                                var item = $(this);
                                item.css({width:'auto'});
                                colWidth = Math.max(colWidth, item[0].offsetWidth);
                                item.css({width:''});
                            });
                            col.container.css({width: (colWidth + 2) + 'px'});
                        }
                        col.container.addClass('picker-items-col-absolute');
                    }
                };
                col.calcSize();
                
                col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)').transition(0);
        
        
                var activeIndex = 0;
                var animationFrameId;
        
                // Set Value Function
                col.setValue = function (newValue, transition, valueCallbacks) {
                    if (typeof transition === 'undefined') transition = '';
                    var newActiveIndex = col.wrapper.find('.picker-item[data-picker-value="' + newValue + '"]').index();
                    if(typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
                        return;
                    }
                    var newTranslate = -newActiveIndex * itemHeight + maxTranslate;
                    // Update wrapper
                    col.wrapper.transition(transition);
                    col.wrapper.transform('translate3d(0,' + (newTranslate) + 'px,0)');
                        
                    // Watch items
                    if (p.params.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex ) {
                        $.cancelAnimationFrame(animationFrameId);
                        col.wrapper.transitionEnd(function(){
                            $.cancelAnimationFrame(animationFrameId);
                        });
                        updateDuringScroll();
                    }
        
                    // Update items
                    col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
                };
        
                col.updateItems = function (activeIndex, translate, transition, valueCallbacks) {
                    if (typeof translate === 'undefined') {
                        translate = $.getTranslate(col.wrapper[0], 'y');
                    }
                    if(typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - maxTranslate)/itemHeight);
                    if (activeIndex < 0) activeIndex = 0;
                    if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
                    var previousActiveIndex = col.activeIndex;
                    col.activeIndex = activeIndex;
                    col.wrapper.find('.picker-selected').removeClass('picker-selected');
        
                    col.items.transition(transition);
                    
                    var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');
                        
                    // Set 3D rotate effect
                    if (p.params.rotateEffect) {
                        var percentage = (translate - (Math.floor((translate - maxTranslate)/itemHeight) * itemHeight + maxTranslate)) / itemHeight;
                        
                        col.items.each(function () {
                            var item = $(this);
                            var itemOffsetTop = item.index() * itemHeight;
                            var translateOffset = maxTranslate - translate;
                            var itemOffset = itemOffsetTop - translateOffset;
                            var percentage = itemOffset / itemHeight;
        
                            var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;
                            
                            var angle = (-18*percentage);
                            if (angle > 180) angle = 180;
                            if (angle < -180) angle = -180;
                            // Far class
                            if (Math.abs(percentage) > itemsFit) item.addClass('picker-item-far');
                            else item.removeClass('picker-item-far');
                            // Set transform
                            item.transform('translate3d(0, ' + (-translate + maxTranslate) + 'px, ' + (originBug ? -110 : 0) + 'px) rotateX(' + angle + 'deg)');
                        });
                    }
        
                    if (valueCallbacks || typeof valueCallbacks === 'undefined') {
                        // Update values
                        col.value = selectedItem.attr('data-picker-value');
                        col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
                        // On change callback
                        if (previousActiveIndex !== activeIndex) {
                            if (col.onChange) {
                                col.onChange(p, col.value, col.displayValue);
                            }
                            p.updateValue();
                        }
                    }
                };
        
                function updateDuringScroll() {
                    animationFrameId = $.requestAnimationFrame(function () {
                        col.updateItems(undefined, undefined, 0);
                        updateDuringScroll();
                    });
                }
        
                // Update items on init
                if (updateItems) col.updateItems(0, maxTranslate, 0);
        
                var allowItemClick = true;
                var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;
                function handleTouchStart (e) {
                    if (isMoved || isTouched) return;
                    e.preventDefault();
                    isTouched = true;
                    touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = (new Date()).getTime();
                    
                    allowItemClick = true;
                    startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
                }
                function handleTouchMove (e) {
                    if (!isTouched) return;
                    e.preventDefault();
                    allowItemClick = false;
                    touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    if (!isMoved) {
                        // First move
                        $.cancelAnimationFrame(animationFrameId);
                        isMoved = true;
                        startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
                        col.wrapper.transition(0);
                    }
                    e.preventDefault();
        
                    var diff = touchCurrentY - touchStartY;
                    currentTranslate = startTranslate + diff;
                    returnTo = undefined;
        
                    // Normalize translate
                    if (currentTranslate < minTranslate) {
                        currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
                        returnTo = 'min';
                    }
                    if (currentTranslate > maxTranslate) {
                        currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
                        returnTo = 'max';
                    }
                    // Transform wrapper
                    col.wrapper.transform('translate3d(0,' + currentTranslate + 'px,0)');
        
                    // Update items
                    col.updateItems(undefined, currentTranslate, 0, p.params.updateValuesOnTouchmove);
                    
                    // Calc velocity
                    velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
                    velocityTime = (new Date()).getTime();
                    prevTranslate = currentTranslate;
                }
                function handleTouchEnd (e) {
                    if (!isTouched || !isMoved) {
                        isTouched = isMoved = false;
                        return;
                    }
                    isTouched = isMoved = false;
                    col.wrapper.transition('');
                    if (returnTo) {
                        if (returnTo === 'min') {
                            col.wrapper.transform('translate3d(0,' + minTranslate + 'px,0)');
                        }
                        else col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)');
                    }
                    touchEndTime = new Date().getTime();
                    var velocity, newTranslate;
                    if (touchEndTime - touchStartTime > 300) {
                        newTranslate = currentTranslate;
                    }
                    else {
                        velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
                        newTranslate = currentTranslate + velocityTranslate * p.params.momentumRatio;
                    }
        
                    newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);
        
                    // Active Index
                    var activeIndex = -Math.floor((newTranslate - maxTranslate)/itemHeight);
        
                    // Normalize translate
                    if (!p.params.freeMode) newTranslate = -activeIndex * itemHeight + maxTranslate;
        
                    // Transform wrapper
                    col.wrapper.transform('translate3d(0,' + (parseInt(newTranslate,10)) + 'px,0)');
        
                    // Update items
                    col.updateItems(activeIndex, newTranslate, '', true);
        
                    // Watch items
                    if (p.params.updateValuesOnMomentum) {
                        updateDuringScroll();
                        col.wrapper.transitionEnd(function(){
                            $.cancelAnimationFrame(animationFrameId);
                        });
                    }
        
                    // Allow click
                    setTimeout(function () {
                        allowItemClick = true;
                    }, 100);
                }
        
                function handleClick(e) {
                    if (!allowItemClick) return;
                    $.cancelAnimationFrame(animationFrameId);
                    /*jshint validthis:true */
                    var value = $(this).attr('data-picker-value');
                    col.setValue(value);
                }
        
                col.initEvents = function (detach) {
                    var method = detach ? 'off' : 'on';
                    col.container[method](app.touchEvents.start, handleTouchStart);
                    col.container[method](app.touchEvents.move, handleTouchMove);
                    col.container[method](app.touchEvents.end, handleTouchEnd);
                    col.items[method]('click', handleClick);
                };
                col.destroyEvents = function () {
                    col.initEvents(true);
                };
        
                col.container[0].f7DestroyPickerCol = function () {
                    col.destroyEvents();
                };
        
                col.initEvents();
        
            };
            p.destroyPickerCol = function (colContainer) {
                colContainer = $(colContainer);
                if ('f7DestroyPickerCol' in colContainer[0]) colContainer[0].f7DestroyPickerCol();
            };
            // Resize cols
            function resizeCols() {
                if (!p.opened) return;
                for (var i = 0; i < p.cols.length; i++) {
                    if (!p.cols[i].divider) {
                        p.cols[i].calcSize();
                        p.cols[i].setValue(p.cols[i].value, 0, false);
                    }
                }
            }
            $(window).on('resize', resizeCols);
        
            // HTML Layout
            p.columnHTML = function (col, onlyItems) {
                var columnItemsHTML = '';
                var columnHTML = '';
                if (col.divider) {
                    columnHTML += '<div class="picker-items-col picker-items-col-divider ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '">' + col.content + '</div>';
                }
                else {
                    for (var j = 0; j < col.values.length; j++) {
                        columnItemsHTML += '<div class="picker-item" data-picker-value="' + col.values[j] + '">' + (col.displayValues ? col.displayValues[j] : col.values[j]) + '</div>';
                    }
                    columnHTML += '<div class="picker-items-col ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '"><div class="picker-items-col-wrapper">' + columnItemsHTML + '</div></div>';
                }
                return onlyItems ? columnItemsHTML : columnHTML;
            };
            p.layout = function () {
                var pickerHTML = '';
                var pickerClass = '';
                var i;
                p.cols = [];
                var colsHTML = '';
                for (i = 0; i < p.params.cols.length; i++) {
                    var col = p.params.cols[i];
                    colsHTML += p.columnHTML(p.params.cols[i]);
                    p.cols.push(col);
                }
                pickerClass = 'picker-modal picker-columns ' + (p.params.cssClass || '') + (p.params.rotateEffect ? ' picker-3d' : '');
                pickerHTML =
                    '<div class="' + (pickerClass) + '">' +
                        (p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '') +
                        '<div class="picker-modal-inner picker-items">' +
                            colsHTML +
                            '<div class="picker-center-highlight"></div>' +
                        '</div>' +
                    '</div>';
                    
                p.pickerHTML = pickerHTML;    
            };
        
            // Input Events
            function openOnInput(e) {
                e.preventDefault();
                if (p.opened) return;
                p.open();
                if (p.params.scrollToInput && !isPopover()) {
                    var pageContent = p.input.parents('.page-content');
                    if (pageContent.length === 0) return;
        
                    var paddingTop = parseInt(pageContent.css('padding-top'), 10),
                        paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
                        pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
                        pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
                        newPaddingBottom;
                    var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
                    if (inputTop > pageHeight) {
                        var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
                        if (scrollTop + pageHeight > pageScrollHeight) {
                            newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                            if (pageHeight === pageScrollHeight) {
                                newPaddingBottom = p.container.height();
                            }
                            pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                        }
                        pageContent.scrollTop(scrollTop, 300);
                    }
                }
            }
            function closeOnHTMLClick(e) {
                if (inPopover()) return;
                if (p.input && p.input.length > 0) {
                    if (e.target !== p.input[0] && $(e.target).parents('.picker-modal').length === 0) p.close();
                }
                else {
                    if ($(e.target).parents('.picker-modal').length === 0) p.close();   
                }
            }
        
            if (p.params.input) {
                p.input = $(p.params.input);
                if (p.input.length > 0) {
                    if (p.params.inputReadOnly) p.input.prop('readOnly', true);
                    if (!p.inline) {
                        p.input.on('click', openOnInput);    
                    }
                    if (p.params.inputReadOnly) {
                        p.input.on('focus mousedown', function (e) {
                            e.preventDefault();
                        });
                    }
                }
                    
            }
            
            if (!p.inline && p.params.closeByOutsideClick) $('html').on('click', closeOnHTMLClick);
        
            // Open
            function onPickerClose() {
                p.opened = false;
                if (p.input && p.input.length > 0) {
                    p.input.parents('.page-content').css({'padding-bottom': ''});
                    if (app.params.material) p.input.trigger('blur');
                }
                if (p.params.onClose) p.params.onClose(p);
        
                // Destroy events
                p.container.find('.picker-items-col').each(function () {
                    p.destroyPickerCol(this);
                });
            }
        
            p.opened = false;
            p.open = function () {
                var toPopover = isPopover();
        
                if (!p.opened) {
        
                    // Layout
                    p.layout();
        
                    // Append
                    if (toPopover) {
                        p.pickerHTML = '<div class="popover popover-picker-columns"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
                        p.popover = app.popover(p.pickerHTML, p.params.input, true);
                        p.container = $(p.popover).find('.picker-modal');
                        $(p.popover).on('close', function () {
                            onPickerClose();
                        });
                    }
                    else if (p.inline) {
                        p.container = $(p.pickerHTML);
                        p.container.addClass('picker-modal-inline');
                        $(p.params.container).append(p.container);
                    }
                    else {
                        p.container = $(app.pickerModal(p.pickerHTML));
                        $(p.container)
                        .on('close', function () {
                            onPickerClose();
                        });
                    }
        
                    // Store picker instance
                    p.container[0].f7Picker = p;
        
                    // Init Events
                    p.container.find('.picker-items-col').each(function () {
                        var updateItems = true;
                        if ((!p.initialized && p.params.value) || (p.initialized && p.value)) updateItems = false;
                        p.initPickerCol(this, updateItems);
                    });
                    
                    // Set value
                    if (!p.initialized) {
                        if (p.value) p.setValue(p.value, 0);
                        else if (p.params.value) {
                            p.setValue(p.params.value, 0);
                        }
                    }
                    else {
                        if (p.value) p.setValue(p.value, 0);
                    }
        
                    // Material Focus
                    if (p.input && p.input.length > 0 && app.params.material) {
                        p.input.trigger('focus');
                    }
                }
        
                // Set flag
                p.opened = true;
                p.initialized = true;
        
                if (p.params.onOpen) p.params.onOpen(p);
            };
        
            // Close
            p.close = function () {
                if (!p.opened || p.inline) return;
                if (inPopover()) {
                    app.closeModal(p.popover);
                    return;
                }
                else {
                    app.closeModal(p.container);
                    return;
                }
            };
        
            // Destroy
            p.destroy = function () {
                p.close();
                if (p.params.input && p.input.length > 0) {
                    p.input.off('click focus', openOnInput);
                }
                $('html').off('click', closeOnHTMLClick);
                $(window).off('resize', resizeCols);
            };
        
            if (p.inline) {
                p.open();
            }
            else {
                if (!p.initialized && p.params.value) p.setValue(p.params.value);
            }
        
            return p;
        };
        app.picker = function (params) {
            return new Picker(params);
        };

        /*======================================================
        ************   Calendar   ************
        ======================================================*/
        var Calendar = function (params) {
            var p = this;
            var defaults = {
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                firstDay: 1, // First day of the week, Monday
                weekendDays: [0, 6], // Sunday and Saturday
                multiple: false,
                rangePicker: false,
                dateFormat: 'yyyy-mm-dd',
                direction: 'horizontal', // or 'vertical'
                minDate: null,
                maxDate: null,
                disabled: null, // dates range of disabled days
                events: null, // dates range of days with events
                rangesClasses: null, //array with custom classes date ranges
                touchMove: true,
                animate: true,
                closeOnSelect: false,
                monthPicker: true,
                monthPickerTemplate:
                    '<div class="picker-calendar-month-picker">' +
                        '<a href="#" class="link icon-only picker-calendar-prev-month"><i class="icon icon-prev"></i></a>' +
                        '<span class="current-month-value"></span>' +
                        '<a href="#" class="link icon-only picker-calendar-next-month"><i class="icon icon-next"></i></a>' +
                    '</div>',
                yearPicker: true,
                yearPickerTemplate:
                    '<div class="picker-calendar-year-picker">' +
                        '<a href="#" class="link icon-only picker-calendar-prev-year"><i class="icon icon-prev"></i></a>' +
                        '<span class="current-year-value"></span>' +
                        '<a href="#" class="link icon-only picker-calendar-next-year"><i class="icon icon-next"></i></a>' +
                    '</div>',
                weekHeader: true,
                // Common settings
                closeByOutsideClick: true,
                scrollToInput: true,
                inputReadOnly: true,
                convertToPopover: true,
                onlyInPopover: false,
                toolbar: true,
                toolbarCloseText: 'Done',
                headerPlaceholder: 'Select date',
                header: app.params.material,
                footer: app.params.material,
                toolbarTemplate:
                    '<div class="toolbar">' +
                        '<div class="toolbar-inner">' +
                            '{{monthPicker}}' +
                            '{{yearPicker}}' +
                        '</div>' +
                    '</div>',
                headerTemplate:
                    '<div class="picker-header">' +
                        '<div class="picker-calendar-selected-date">{{placeholder}}</div>' +
                    '</div>',
                footerTemplate:
                    '<div class="picker-footer">' +
                        '<a href="#" class="button close-picker">{{closeText}}</a>' +
                    '</div>',
        
                /* Callbacks
                onMonthAdd
                onChange
                onOpen
                onClose
                onDayClick
                onMonthYearChangeStart
                onMonthYearChangeEnd
                */
            };
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            p.params = params;
            p.initialized = false;
        
            // Inline flag
            p.inline = p.params.container ? true : false;
        
            // Is horizontal
            p.isH = p.params.direction === 'horizontal';
        
            // RTL inverter
            var inverter = p.isH ? (app.rtl ? -1 : 1) : 1;
        
            // Animating flag
            p.animating = false;
        
            // Should be converted to popover
            function isPopover() {
                var toPopover = false;
                if (!p.params.convertToPopover && !p.params.onlyInPopover) return toPopover;
                if (!p.inline && p.params.input) {
                    if (p.params.onlyInPopover) toPopover = true;
                    else {
                        if (app.device.ios) {
                            toPopover = app.device.ipad ? true : false;
                        }
                        else {
                            if ($(window).width() >= 768) toPopover = true;
                        }
                    }
                }
                return toPopover;
            }
            function inPopover() {
                if (p.opened && p.container && p.container.length > 0 && p.container.parents('.popover').length > 0) return true;
                else return false;
            }
        
            // Format date
            function formatDate(date) {
                date = new Date(date);
                var year = date.getFullYear();
                var month = date.getMonth();
                var month1 = month + 1;
                var day = date.getDate();
                var weekDay = date.getDay();
        
                return p.params.dateFormat
                    .replace(/yyyy/g, year)
                    .replace(/yy/g, (year + '').substring(2))
                    .replace(/mm/g, month1 < 10 ? '0' + month1 : month1)
                    .replace(/m(\W+)/g, month1 + '$1')
                    .replace(/MM/g, p.params.monthNames[month])
                    .replace(/M(\W+)/g, p.params.monthNamesShort[month] + '$1')
                    .replace(/dd/g, day < 10 ? '0' + day : day)
                    .replace(/d(\W+)/g, day + '$1')
                    .replace(/DD/g, p.params.dayNames[weekDay])
                    .replace(/D(\W+)/g, p.params.dayNamesShort[weekDay] + '$1');
            }
        
        
            // Value
            p.addValue = function (value) {
                if (p.params.multiple) {
                    if (!p.value) p.value = [];
                    var inValuesIndex;
                    for (var i = 0; i < p.value.length; i++) {
                        if (new Date(value).getTime() === new Date(p.value[i]).getTime()) {
                            inValuesIndex = i;
                        }
                    }
                    if (typeof inValuesIndex === 'undefined') {
                        p.value.push(value);
                    }
                    else {
                        p.value.splice(inValuesIndex, 1);
                    }
                    p.updateValue();
                }
                else if (p.params.rangePicker) {
                    if (!p.value) p.value = [];
                    if (p.value.length === 2 || p.value.length === 0) {
                        p.value = [];
                    }
                    if (p.value[0] !== value) p.value.push(value);
                    else p.value = [];
                    p.value.sort(function (a,b) {
                        return a - b;
                    });
                    p.updateValue();
                }
                else {
                    p.value = [value];
                    p.updateValue();
                }
            };
            p.setValue = function (arrValues) {
                p.value = arrValues;
                p.updateValue();
            };
            p.updateValue = function (onlyHeader) {
                var i, inputValue;
                if (p.container && p.container.length > 0) {
                    p.wrapper.find('.picker-calendar-day-selected').removeClass('picker-calendar-day-selected');
                    var valueDate;
                    if (p.params.rangePicker && p.value.length === 2) {
                        for (i = p.value[0]; i <= p.value[1]; i += 24*60*60*1000) {
                            valueDate = new Date(i);
                            p.wrapper.find('.picker-calendar-day[data-date="' + valueDate.getFullYear() + '-' + valueDate.getMonth() + '-' + valueDate.getDate() + '"]').addClass('picker-calendar-day-selected');
                        }
                    }
                    else {
                        for (i = 0; i < p.value.length; i++) {
                            valueDate = new Date(p.value[i]);
                            p.wrapper.find('.picker-calendar-day[data-date="' + valueDate.getFullYear() + '-' + valueDate.getMonth() + '-' + valueDate.getDate() + '"]').addClass('picker-calendar-day-selected');
                        }
                    }
                }
        
                if (p.params.onChange) {
                    p.params.onChange(p, p.value);
                }
                if ((p.input && p.input.length > 0) || (app.params.material && p.params.header)) {
                    if (p.params.formatValue) inputValue = p.params.formatValue(p, p.value);
                    else {
                        inputValue = [];
                        for (i = 0; i < p.value.length; i++) {
                            inputValue.push(formatDate(p.value[i]));
                        }
                        inputValue = inputValue.join(p.params.rangePicker ? ' - ' : ', ');
                    }
                    if (app.params.material && p.params.header && p.container && p.container.length > 0) {
                        p.container.find('.picker-calendar-selected-date').text(inputValue);
                    }
                    if (p.input && p.input.length > 0 && !onlyHeader) {
                        $(p.input).val(inputValue);
                        $(p.input).trigger('change');
                    }
        
                }
            };
        
            // Columns Handlers
            p.initCalendarEvents = function () {
                var col;
                var allowItemClick = true;
                var isTouched, isMoved, touchStartX, touchStartY, touchCurrentX, touchCurrentY, touchStartTime, touchEndTime, startTranslate, currentTranslate, wrapperWidth, wrapperHeight, percentage, touchesDiff, isScrolling;
                function handleTouchStart (e) {
                    if (isMoved || isTouched) return;
                    // e.preventDefault();
                    isTouched = true;
                    touchStartX = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                    touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = (new Date()).getTime();
                    percentage = 0;
                    allowItemClick = true;
                    isScrolling = undefined;
                    startTranslate = currentTranslate = p.monthsTranslate;
                }
                function handleTouchMove (e) {
                    if (!isTouched) return;
        
                    touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    if (typeof isScrolling === 'undefined') {
                        isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
                    }
                    if (p.isH && isScrolling) {
                        isTouched = false;
                        return;
                    }
                    e.preventDefault();
                    if (p.animating) {
                        isTouched = false;
                        return;
                    }
                    allowItemClick = false;
                    if (!isMoved) {
                        // First move
                        isMoved = true;
                        wrapperWidth = p.wrapper[0].offsetWidth;
                        wrapperHeight = p.wrapper[0].offsetHeight;
                        p.wrapper.transition(0);
                    }
                    e.preventDefault();
        
                    touchesDiff = p.isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
                    percentage = touchesDiff/(p.isH ? wrapperWidth : wrapperHeight);
                    currentTranslate = (p.monthsTranslate * inverter + percentage) * 100;
        
                    // Transform wrapper
                    p.wrapper.transform('translate3d(' + (p.isH ? currentTranslate : 0) + '%, ' + (p.isH ? 0 : currentTranslate) + '%, 0)');
        
                }
                function handleTouchEnd (e) {
                    if (!isTouched || !isMoved) {
                        isTouched = isMoved = false;
                        return;
                    }
                    isTouched = isMoved = false;
        
                    touchEndTime = new Date().getTime();
                    if (touchEndTime - touchStartTime < 300) {
                        if (Math.abs(touchesDiff) < 10) {
                            p.resetMonth();
                        }
                        else if (touchesDiff >= 10) {
                            if (app.rtl) p.nextMonth();
                            else p.prevMonth();
                        }
                        else {
                            if (app.rtl) p.prevMonth();
                            else p.nextMonth();
                        }
                    }
                    else {
                        if (percentage <= -0.5) {
                            if (app.rtl) p.prevMonth();
                            else p.nextMonth();
                        }
                        else if (percentage >= 0.5) {
                            if (app.rtl) p.nextMonth();
                            else p.prevMonth();
                        }
                        else {
                            p.resetMonth();
                        }
                    }
        
                    // Allow click
                    setTimeout(function () {
                        allowItemClick = true;
                    }, 100);
                }
        
                function handleDayClick(e) {
                    if (!allowItemClick) return;
                    var day = $(e.target).parents('.picker-calendar-day');
                    if (day.length === 0 && $(e.target).hasClass('picker-calendar-day')) {
                        day = $(e.target);
                    }
                    if (day.length === 0) return;
                    if (day.hasClass('picker-calendar-day-selected') && !(p.params.multiple || p.params.rangePicker)) return;
                    if (day.hasClass('picker-calendar-day-disabled')) return;
                    if (!p.params.rangePicker) {
                        if (day.hasClass('picker-calendar-day-next')) p.nextMonth();
                        if (day.hasClass('picker-calendar-day-prev')) p.prevMonth();
                    }
                    var dateYear = day.attr('data-year');
                    var dateMonth = day.attr('data-month');
                    var dateDay = day.attr('data-day');
                    if (p.params.onDayClick) {
                        p.params.onDayClick(p, day[0], dateYear, dateMonth, dateDay);
                    }
                    p.addValue(new Date(dateYear, dateMonth, dateDay).getTime());
                    if (p.params.closeOnSelect) {
                        if (p.params.rangePicker && p.value.length === 2 || !p.params.rangePicker) p.close();
                    }
                }
        
                p.container.find('.picker-calendar-prev-month').on('click', p.prevMonth);
                p.container.find('.picker-calendar-next-month').on('click', p.nextMonth);
                p.container.find('.picker-calendar-prev-year').on('click', p.prevYear);
                p.container.find('.picker-calendar-next-year').on('click', p.nextYear);
                p.wrapper.on('click', handleDayClick);
                if (p.params.touchMove) {
                    p.wrapper.on(app.touchEvents.start, handleTouchStart);
                    p.wrapper.on(app.touchEvents.move, handleTouchMove);
                    p.wrapper.on(app.touchEvents.end, handleTouchEnd);
                }
        
                p.container[0].f7DestroyCalendarEvents = function () {
                    p.container.find('.picker-calendar-prev-month').off('click', p.prevMonth);
                    p.container.find('.picker-calendar-next-month').off('click', p.nextMonth);
                    p.container.find('.picker-calendar-prev-year').off('click', p.prevYear);
                    p.container.find('.picker-calendar-next-year').off('click', p.nextYear);
                    p.wrapper.off('click', handleDayClick);
                    if (p.params.touchMove) {
                        p.wrapper.off(app.touchEvents.start, handleTouchStart);
                        p.wrapper.off(app.touchEvents.move, handleTouchMove);
                        p.wrapper.off(app.touchEvents.end, handleTouchEnd);
                    }
                };
        
        
            };
            p.destroyCalendarEvents = function (colContainer) {
                if ('f7DestroyCalendarEvents' in p.container[0]) p.container[0].f7DestroyCalendarEvents();
            };
        
            // Scan Dates Range
            p.dateInRange = function (dayDate, range) {
                var match = false;
                var i;
                if (!range) return false;
                if ($.isArray(range)) {
                    for (i = 0; i < range.length; i ++) {
                        if (range[i].from || range[i].to) {
                            if (range[i].from && range[i].to) {
                                if ((dayDate <= new Date(range[i].to).getTime()) && (dayDate >= new Date(range[i].from).getTime())) {
                                    match = true;
                                }
                            }
                            else if (range[i].from) {
                                if (dayDate >= new Date(range[i].from).getTime()) {
                                    match = true;
                                }
                            }
                            else if (range[i].to) {
                                if (dayDate <= new Date(range[i].to).getTime()) {
                                    match = true;
                                }
                            }
                        } else if (dayDate === new Date(range[i]).getTime()) {
                            match = true;
                        }
                    }
                }
                else if (range.from || range.to) {
                    if (range.from && range.to) {
                        if ((dayDate <= new Date(range.to).getTime()) && (dayDate >= new Date(range.from).getTime())) {
                            match = true;
                        }
                    }
                    else if (range.from) {
                        if (dayDate >= new Date(range.from).getTime()) {
                            match = true;
                        }
                    }
                    else if (range.to) {
                        if (dayDate <= new Date(range.to).getTime()) {
                            match = true;
                        }
                    }
                }
                else if (typeof range === 'function') {
                    match = range(new Date(dayDate));
                }
                return match;
            };
            // Calendar Methods
            p.daysInMonth = function (date) {
                var d = new Date(date);
                return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
            };
            p.monthHTML = function (date, offset) {
                date = new Date(date);
                var year = date.getFullYear(),
                    month = date.getMonth(),
                    day = date.getDate();
                if (offset === 'next') {
                    if (month === 11) date = new Date(year + 1, 0);
                    else date = new Date(year, month + 1, 1);
                }
                if (offset === 'prev') {
                    if (month === 0) date = new Date(year - 1, 11);
                    else date = new Date(year, month - 1, 1);
                }
                if (offset === 'next' || offset === 'prev') {
                    month = date.getMonth();
                    year = date.getFullYear();
                }
                var daysInPrevMonth = p.daysInMonth(new Date(date.getFullYear(), date.getMonth()).getTime() - 10 * 24 * 60 * 60 * 1000),
                    daysInMonth = p.daysInMonth(date),
                    firstDayOfMonthIndex = new Date(date.getFullYear(), date.getMonth()).getDay();
                if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7;
        
                var dayDate, currentValues = [], i, j, k,
                    rows = 6, cols = 7,
                    monthHTML = '',
                    dayIndex = 0 + (p.params.firstDay - 1),
                    today = new Date().setHours(0,0,0,0),
                    minDate = p.params.minDate ? new Date(p.params.minDate).getTime() : null,
                    maxDate = p.params.maxDate ? new Date(p.params.maxDate).getTime() : null,
                    disabled,
                    hasEvent;
        
                if (p.value && p.value.length) {
                    for (i = 0; i < p.value.length; i++) {
                        currentValues.push(new Date(p.value[i]).setHours(0,0,0,0));
                    }
                }
        
                for (i = 1; i <= rows; i++) {
                    var rowHTML = '';
                    var row = i;
                    for (j = 1; j <= cols; j++) {
                        var col = j;
                        dayIndex ++;
                        var dayNumber = dayIndex - firstDayOfMonthIndex;
                        var weekDayIndex = (col - 1 + p.params.firstDay > 6) ? (col - 1 - 7 + p.params.firstDay) : (col - 1 + p.params.firstDay);
                        var addClass = '';
                        if (dayNumber < 0) {
                            dayNumber = daysInPrevMonth + dayNumber + 1;
                            addClass += ' picker-calendar-day-prev';
                            dayDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime();
                        }
                        else {
                            dayNumber = dayNumber + 1;
                            if (dayNumber > daysInMonth) {
                                dayNumber = dayNumber - daysInMonth;
                                addClass += ' picker-calendar-day-next';
                                dayDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime();
                            }
                            else {
                                dayDate = new Date(year, month, dayNumber).getTime();
                            }
                        }
                        // Today
                        if (dayDate === today) addClass += ' picker-calendar-day-today';
                        // Selected
                        if (p.params.rangePicker && currentValues.length === 2) {
                            if (dayDate >= currentValues[0] && dayDate <= currentValues[1]) addClass += ' picker-calendar-day-selected';
                        }
                        else {
                            if (currentValues.indexOf(dayDate) >= 0) addClass += ' picker-calendar-day-selected';
                        }
                        // Weekend
                        if (p.params.weekendDays.indexOf(weekDayIndex) >= 0) {
                            addClass += ' picker-calendar-day-weekend';
                        }
                        // Has Events
                        hasEvent = false;
                        if (p.params.events) {
                            if (p.dateInRange(dayDate, p.params.events)) {
                                hasEvent = true;
                            }
                        }
                        if (hasEvent) {
                            addClass += ' picker-calendar-day-has-events';
                        }
                        // Custom Ranges
                        if (p.params.rangesClasses) {
                            for (k = 0; k < p.params.rangesClasses.length; k++) {
                                if (p.dateInRange(dayDate, p.params.rangesClasses[k].range)) {
                                    addClass += ' ' + p.params.rangesClasses[k].cssClass;
                                }
                            }
                        }
                        // Disabled
                        disabled = false;
                        if ((minDate && dayDate < minDate) || (maxDate && dayDate > maxDate)) {
                            disabled = true;
                        }
                        if (p.params.disabled) {
                            if (p.dateInRange(dayDate, p.params.disabled)) {
                                disabled = true;
                            }
                        }
                        if (disabled) {
                            addClass += ' picker-calendar-day-disabled';
                        }
        
        
                        dayDate = new Date(dayDate);
                        var dayYear = dayDate.getFullYear();
                        var dayMonth = dayDate.getMonth();
                        rowHTML += '<div data-year="' + dayYear + '" data-month="' + dayMonth + '" data-day="' + dayNumber + '" class="picker-calendar-day' + (addClass) + '" data-date="' + (dayYear + '-' + dayMonth + '-' + dayNumber) + '"><span>'+dayNumber+'</span></div>';
                    }
                    monthHTML += '<div class="picker-calendar-row">' + rowHTML + '</div>';
                }
                monthHTML = '<div class="picker-calendar-month" data-year="' + year + '" data-month="' + month + '">' + monthHTML + '</div>';
                return monthHTML;
            };
            p.animating = false;
            p.updateCurrentMonthYear = function (dir) {
                if (typeof dir === 'undefined') {
                    p.currentMonth = parseInt(p.months.eq(1).attr('data-month'), 10);
                    p.currentYear = parseInt(p.months.eq(1).attr('data-year'), 10);
                }
                else {
                    p.currentMonth = parseInt(p.months.eq(dir === 'next' ? (p.months.length - 1) : 0).attr('data-month'), 10);
                    p.currentYear = parseInt(p.months.eq(dir === 'next' ? (p.months.length - 1) : 0).attr('data-year'), 10);
                }
                p.container.find('.current-month-value').text(p.params.monthNames[p.currentMonth]);
                p.container.find('.current-year-value').text(p.currentYear);
        
            };
            p.onMonthChangeStart = function (dir) {
                p.updateCurrentMonthYear(dir);
                p.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
                var currentIndex = dir === 'next' ? p.months.length - 1 : 0;
        
                p.months.eq(currentIndex).addClass('picker-calendar-month-current');
                p.months.eq(dir === 'next' ? currentIndex - 1 : currentIndex + 1).addClass(dir === 'next' ? 'picker-calendar-month-prev' : 'picker-calendar-month-next');
        
                if (p.params.onMonthYearChangeStart) {
                    p.params.onMonthYearChangeStart(p, p.currentYear, p.currentMonth);
                }
            };
            p.onMonthChangeEnd = function (dir, rebuildBoth) {
                p.animating = false;
                var nextMonthHTML, prevMonthHTML, newMonthHTML;
                p.wrapper.find('.picker-calendar-month:not(.picker-calendar-month-prev):not(.picker-calendar-month-current):not(.picker-calendar-month-next)').remove();
        
                if (typeof dir === 'undefined') {
                    dir = 'next';
                    rebuildBoth = true;
                }
                if (!rebuildBoth) {
                    newMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), dir);
                }
                else {
                    p.wrapper.find('.picker-calendar-month-next, .picker-calendar-month-prev').remove();
                    prevMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'prev');
                    nextMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'next');
                }
                if (dir === 'next' || rebuildBoth) {
                    p.wrapper.append(newMonthHTML || nextMonthHTML);
                }
                if (dir === 'prev' || rebuildBoth) {
                    p.wrapper.prepend(newMonthHTML || prevMonthHTML);
                }
                p.months = p.wrapper.find('.picker-calendar-month');
                p.setMonthsTranslate(p.monthsTranslate);
                if (p.params.onMonthAdd) {
                    p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
                }
                if (p.params.onMonthYearChangeEnd) {
                    p.params.onMonthYearChangeEnd(p, p.currentYear, p.currentMonth);
                }
            };
            p.setMonthsTranslate = function (translate) {
                translate = translate || p.monthsTranslate || 0;
                if (typeof p.monthsTranslate === 'undefined') p.monthsTranslate = translate;
                p.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
                var prevMonthTranslate = -(translate + 1) * 100 * inverter;
                var currentMonthTranslate = -translate * 100 * inverter;
                var nextMonthTranslate = -(translate - 1) * 100 * inverter;
                p.months.eq(0).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
                p.months.eq(1).transform('translate3d(' + (p.isH ? currentMonthTranslate : 0) + '%, ' + (p.isH ? 0 : currentMonthTranslate) + '%, 0)').addClass('picker-calendar-month-current');
                p.months.eq(2).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
            };
            p.nextMonth = function (transition) {
                if (typeof transition === 'undefined' || typeof transition === 'object') {
                    transition = '';
                    if (!p.params.animate) transition = 0;
                }
                var nextMonth = parseInt(p.months.eq(p.months.length - 1).attr('data-month'), 10);
                var nextYear = parseInt(p.months.eq(p.months.length - 1).attr('data-year'), 10);
                var nextDate = new Date(nextYear, nextMonth);
                var nextDateTime = nextDate.getTime();
                var transitionEndCallback = p.animating ? false : true;
                if (p.params.maxDate) {
                    if (nextDateTime > new Date(p.params.maxDate).getTime()) {
                        return p.resetMonth();
                    }
                }
                p.monthsTranslate --;
                if (nextMonth === p.currentMonth) {
                    var nextMonthTranslate = -(p.monthsTranslate) * 100 * inverter;
                    var nextMonthHTML = $(p.monthHTML(nextDateTime, 'next')).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
                    p.wrapper.append(nextMonthHTML[0]);
                    p.months = p.wrapper.find('.picker-calendar-month');
                    if (p.params.onMonthAdd) {
                        p.params.onMonthAdd(p, p.months.eq(p.months.length - 1)[0]);
                    }
                }
                p.animating = true;
                p.onMonthChangeStart('next');
                var translate = (p.monthsTranslate * 100) * inverter;
        
                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
                if (transitionEndCallback) {
                    p.wrapper.transitionEnd(function () {
                        p.onMonthChangeEnd('next');
                    });
                }
                if (!p.params.animate) {
                    p.onMonthChangeEnd('next');
                }
            };
            p.prevMonth = function (transition) {
                if (typeof transition === 'undefined' || typeof transition === 'object') {
                    transition = '';
                    if (!p.params.animate) transition = 0;
                }
                var prevMonth = parseInt(p.months.eq(0).attr('data-month'), 10);
                var prevYear = parseInt(p.months.eq(0).attr('data-year'), 10);
                var prevDate = new Date(prevYear, prevMonth + 1, -1);
                var prevDateTime = prevDate.getTime();
                var transitionEndCallback = p.animating ? false : true;
                if (p.params.minDate) {
                    if (prevDateTime < new Date(p.params.minDate).getTime()) {
                        return p.resetMonth();
                    }
                }
                p.monthsTranslate ++;
                if (prevMonth === p.currentMonth) {
                    var prevMonthTranslate = -(p.monthsTranslate) * 100 * inverter;
                    var prevMonthHTML = $(p.monthHTML(prevDateTime, 'prev')).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
                    p.wrapper.prepend(prevMonthHTML[0]);
                    p.months = p.wrapper.find('.picker-calendar-month');
                    if (p.params.onMonthAdd) {
                        p.params.onMonthAdd(p, p.months.eq(0)[0]);
                    }
                }
                p.animating = true;
                p.onMonthChangeStart('prev');
                var translate = (p.monthsTranslate * 100) * inverter;
                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
                if (transitionEndCallback) {
                    p.wrapper.transitionEnd(function () {
                        p.onMonthChangeEnd('prev');
                    });
                }
                if (!p.params.animate) {
                    p.onMonthChangeEnd('prev');
                }
            };
            p.resetMonth = function (transition) {
                if (typeof transition === 'undefined') transition = '';
                var translate = (p.monthsTranslate * 100) * inverter;
                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
            };
            p.setYearMonth = function (year, month, transition) {
                if (typeof year === 'undefined') year = p.currentYear;
                if (typeof month === 'undefined') month = p.currentMonth;
                if (typeof transition === 'undefined' || typeof transition === 'object') {
                    transition = '';
                    if (!p.params.animate) transition = 0;
                }
                var targetDate;
                if (year < p.currentYear) {
                    targetDate = new Date(year, month + 1, -1).getTime();
                }
                else {
                    targetDate = new Date(year, month).getTime();
                }
                if (p.params.maxDate && targetDate > new Date(p.params.maxDate).getTime()) {
                    return false;
                }
                if (p.params.minDate && targetDate < new Date(p.params.minDate).getTime()) {
                    return false;
                }
                var currentDate = new Date(p.currentYear, p.currentMonth).getTime();
                var dir = targetDate > currentDate ? 'next' : 'prev';
                var newMonthHTML = p.monthHTML(new Date(year, month));
                p.monthsTranslate = p.monthsTranslate || 0;
                var prevTranslate = p.monthsTranslate;
                var monthTranslate, wrapperTranslate;
                var transitionEndCallback = p.animating ? false : true;
                if (targetDate > currentDate) {
                    // To next
                    p.monthsTranslate --;
                    if (!p.animating) p.months.eq(p.months.length - 1).remove();
                    p.wrapper.append(newMonthHTML);
                    p.months = p.wrapper.find('.picker-calendar-month');
                    monthTranslate = -(prevTranslate - 1) * 100 * inverter;
                    p.months.eq(p.months.length - 1).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
                }
                else {
                    // To prev
                    p.monthsTranslate ++;
                    if (!p.animating) p.months.eq(0).remove();
                    p.wrapper.prepend(newMonthHTML);
                    p.months = p.wrapper.find('.picker-calendar-month');
                    monthTranslate = -(prevTranslate + 1) * 100 * inverter;
                    p.months.eq(0).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
                }
                if (p.params.onMonthAdd) {
                    p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
                }
                p.animating = true;
                p.onMonthChangeStart(dir);
                wrapperTranslate = (p.monthsTranslate * 100) * inverter;
                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? wrapperTranslate : 0) + '%, ' + (p.isH ? 0 : wrapperTranslate) + '%, 0)');
                if (transitionEndCallback) {
                   p.wrapper.transitionEnd(function () {
                        p.onMonthChangeEnd(dir, true);
                    });
                }
                if (!p.params.animate) {
                    p.onMonthChangeEnd(dir);
                }
            };
            p.nextYear = function () {
                p.setYearMonth(p.currentYear + 1);
            };
            p.prevYear = function () {
                p.setYearMonth(p.currentYear - 1);
            };
        
        
            // HTML Layout
            p.layout = function () {
                var pickerHTML = '';
                var pickerClass = '';
                var i;
        
                var layoutDate = p.value && p.value.length ? p.value[0] : new Date().setHours(0,0,0,0);
                var prevMonthHTML = p.monthHTML(layoutDate, 'prev');
                var currentMonthHTML = p.monthHTML(layoutDate);
                var nextMonthHTML = p.monthHTML(layoutDate, 'next');
                var monthsHTML = '<div class="picker-calendar-months"><div class="picker-calendar-months-wrapper">' + (prevMonthHTML + currentMonthHTML + nextMonthHTML) + '</div></div>';
                // Week days header
                var weekHeaderHTML = '';
                if (p.params.weekHeader) {
                    for (i = 0; i < 7; i++) {
                        var weekDayIndex = (i + p.params.firstDay > 6) ? (i - 7 + p.params.firstDay) : (i + p.params.firstDay);
                        var dayName = p.params.dayNamesShort[weekDayIndex];
                        weekHeaderHTML += '<div class="picker-calendar-week-day ' + ((p.params.weekendDays.indexOf(weekDayIndex) >= 0) ? 'picker-calendar-week-day-weekend' : '') + '"> ' + dayName + '</div>';
        
                    }
                    weekHeaderHTML = '<div class="picker-calendar-week-days">' + weekHeaderHTML + '</div>';
                }
                pickerClass = 'picker-modal picker-calendar' +
                            (p.params.rangePicker ? ' picker-calendar-range' : '') +
                            (p.params.cssClass ? ' ' + p.params.cssClass : '');
                var toolbarHTML = p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '';
                if (p.params.toolbar) {
                    toolbarHTML = p.params.toolbarTemplate
                        .replace(/{{closeText}}/g, p.params.toolbarCloseText)
                        .replace(/{{monthPicker}}/g, (p.params.monthPicker ? p.params.monthPickerTemplate : ''))
                        .replace(/{{yearPicker}}/g, (p.params.yearPicker ? p.params.yearPickerTemplate : ''));
                }
                var headerHTML = p.params.header ? p.params.headerTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText).replace(/{{placeholder}}/g, p.params.headerPlaceholder) : '';
                var footerHTML = p.params.footer ? p.params.footerTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '';
        
                pickerHTML =
                    '<div class="' + (pickerClass) + '">' +
                        headerHTML +
                        footerHTML +
                        toolbarHTML +
                        '<div class="picker-modal-inner">' +
                            weekHeaderHTML +
                            monthsHTML +
                        '</div>' +
                    '</div>';
        
        
                p.pickerHTML = pickerHTML;
            };
        
            // Input Events
            function openOnInput(e) {
                e.preventDefault();
                if (p.opened) return;
                p.open();
                if (p.params.scrollToInput && !isPopover() && !app.params.material) {
                    var pageContent = p.input.parents('.page-content');
                    if (pageContent.length === 0) return;
        
                    var paddingTop = parseInt(pageContent.css('padding-top'), 10),
                        paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
                        pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
                        pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
                        newPaddingBottom;
        
                    var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
                    if (inputTop > pageHeight) {
                        var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
                        if (scrollTop + pageHeight > pageScrollHeight) {
                            newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                            if (pageHeight === pageScrollHeight) {
                                newPaddingBottom = p.container.height();
                            }
                            pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                        }
                        pageContent.scrollTop(scrollTop, 300);
                    }
                }
            }
            function closeOnHTMLClick(e) {
                if (inPopover()) return;
                if (p.input && p.input.length > 0) {
                    if (e.target !== p.input[0] && $(e.target).parents('.picker-modal').length === 0) p.close();
                }
                else {
                    if ($(e.target).parents('.picker-modal').length === 0) p.close();
                }
            }
        
            if (p.params.input) {
                p.input = $(p.params.input);
                if (p.input.length > 0) {
                    if (p.params.inputReadOnly) p.input.prop('readOnly', true);
                    if (!p.inline) {
                        p.input.on('click', openOnInput);
                    }
                    if (p.params.inputReadOnly) {
                        p.input.on('focus mousedown', function (e) {
                            e.preventDefault();
                        });
                    }
                }
        
            }
        
            if (!p.inline && p.params.closeByOutsideClick) $('html').on('click', closeOnHTMLClick);
        
            // Open
            function onPickerClose() {
                p.opened = false;
                if (p.input && p.input.length > 0) {
                    p.input.parents('.page-content').css({'padding-bottom': ''});
                    if (app.params.material) p.input.trigger('blur');
                }
                if (p.params.onClose) p.params.onClose(p);
        
                // Destroy events
                p.destroyCalendarEvents();
            }
        
            p.opened = false;
            p.open = function () {
                var toPopover = isPopover();
                var updateValue = false;
                if (!p.opened) {
                    // Set date value
                    if (!p.value) {
                        if (p.params.value) {
                            p.value = p.params.value;
                            updateValue = true;
                        }
                    }
        
                    // Layout
                    p.layout();
        
                    // Append
                    if (toPopover) {
                        p.pickerHTML = '<div class="popover popover-picker-calendar"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
                        p.popover = app.popover(p.pickerHTML, p.params.input, true);
                        p.container = $(p.popover).find('.picker-modal');
                        $(p.popover).on('close', function () {
                            onPickerClose();
                        });
                    }
                    else if (p.inline) {
                        p.container = $(p.pickerHTML);
                        p.container.addClass('picker-modal-inline');
                        $(p.params.container).append(p.container);
                    }
                    else {
                        p.container = $(app.pickerModal(p.pickerHTML));
                        $(p.container)
                        .on('close', function () {
                            onPickerClose();
                        });
                    }
        
                    // Store calendar instance
                    p.container[0].f7Calendar = p;
                    p.wrapper = p.container.find('.picker-calendar-months-wrapper');
        
                    // Months
                    p.months = p.wrapper.find('.picker-calendar-month');
        
                    // Update current month and year
                    p.updateCurrentMonthYear();
        
                    // Set initial translate
                    p.monthsTranslate = 0;
                    p.setMonthsTranslate();
        
                    // Init events
                    p.initCalendarEvents();
        
                    // Update input value
                    if (updateValue) p.updateValue();
                    else if (app.params.material && p.value) p.updateValue(true);
        
                    // Material Focus
                    if (p.input && p.input.length > 0 && app.params.material) {
                        p.input.trigger('focus');
                    }
        
                }
        
                // Set flag
                p.opened = true;
                p.initialized = true;
                if (p.params.onMonthAdd) {
                    p.months.each(function () {
                        p.params.onMonthAdd(p, this);
                    });
                }
                if (p.params.onOpen) p.params.onOpen(p);
            };
        
            // Close
            p.close = function () {
                if (!p.opened || p.inline) return;
                if (inPopover()) {
                    app.closeModal(p.popover);
                    return;
                }
                else {
                    app.closeModal(p.container);
                    return;
                }
            };
        
            // Destroy
            p.destroy = function () {
                p.close();
                if (p.params.input && p.input.length > 0) {
                    p.input.off('click focus', openOnInput);
                }
                $('html').off('click', closeOnHTMLClick);
            };
        
            if (p.inline) {
                p.open();
            }
            else {
                if (!p.initialized && p.params.value) p.setValue(p.params.value);
            }
        
            return p;
        };
        app.calendar = function (params) {
            return new Calendar(params);
        };
        

        /*======================================================
        ************   Notifications   ************
        ======================================================*/
        var _tempNotificationElement;
        app.addNotification = function (params) {
            if (!params) return;
            
            if (typeof params.media === 'undefined') params.media = app.params.notificationMedia;
            if (typeof params.title === 'undefined') params.title = app.params.notificationTitle;
            if (typeof params.subtitle === 'undefined') params.subtitle = app.params.notificationSubtitle;
            if (typeof params.closeIcon === 'undefined') params.closeIcon = app.params.notificationCloseIcon;
            if (typeof params.hold === 'undefined') params.hold = app.params.notificationHold;
            if (typeof params.closeOnClick === 'undefined') params.closeOnClick = app.params.notificationCloseOnClick;
            if (typeof params.button === 'undefined') params.button = app.params.notificationCloseButtonText && {
                text: app.params.notificationCloseButtonText,
                close: true
            };
        
            if (!_tempNotificationElement) _tempNotificationElement = document.createElement('div');
        
            params.material = app.params.material;
        
            var container = $('.notifications');
            if (container.length === 0) {
                $('body').append('<div class="notifications list-block' + (params.material ? '' : ' media-list') + '"><ul></ul></div>');
                container = $('.notifications');
            }
            var list = container.children('ul');
            
            var notificationTemplate = app.params.notificationTemplate || 
                '{{#if custom}}' +
                '<li>{{custom}}</li>' +
                '{{else}}' +
                '<li class="notification-item notification-hidden">' +
                    '<div class="item-content">' +
                        '{{#if material}}' +
                            '<div class="item-inner">' +
                                '<div class="item-title">{{js "this.message || this.title || this.subtitle"}}</div>' +
                                '{{#if ../button}}{{#button}}' +
                                '<div class="item-after">' +
                                    '<a href="#" class="button {{#if color}}color-{{color}}{{/if}} {{#js_compare "this.close !== false"}}close-notification{{/js_compare}}">{{text}}</a>' +
                                '</div>' +
                                '{{/button}}{{/if}}' +
                            '</div>' +
                        '{{else}}' +
                            '{{#if media}}' +
                            '<div class="item-media">{{media}}</div>' +
                            '{{/if}}' +
                            '<div class="item-inner">' +
                                '<div class="item-title-row">' +
                                    '{{#if title}}' +
                                    '<div class="item-title">{{title}}</div>' +
                                    '{{/if}}' +
                                    '{{#if closeIcon}}' +
                                    '<div class="item-after"><a href="#" class="close-notification"><span></span></a></div>' +
                                    '{{/if}}' +
                                '</div>' +
                                '{{#if subtitle}}' +
                                '<div class="item-subtitle">{{subtitle}}</div>' +
                                '{{/if}}' +
                                '{{#if message}}' +
                                '<div class="item-text">{{message}}</div>' +
                                '</div>' +
                            '{{/if}}' +
                        '{{/if}}' +
                    '</div>' +
                '</li>' +
                '{{/if}}';
            if (!app._compiledTemplates.notification) {
                app._compiledTemplates.notification = t7.compile(notificationTemplate);
            }
            _tempNotificationElement.innerHTML = app._compiledTemplates.notification(params);
        
            var item = $(_tempNotificationElement).children();
        
            item.on('click', function (e) {
                var close = false;
                var target = $(e.target);
                if (params.material && target.hasClass('button')) {
                    if (params.button && params.button.onClick) params.button.onClick.call(target[0], e, item[0]);
                }
                if (target.is('.close-notification') || $(e.target).parents('.close-notification').length > 0) {
                    close = true;
                }
                else {
                    if (params.onClick) params.onClick(e, item[0]);
                    if (params.closeOnClick) close = true;
                }
                if (close) app.closeNotification(item[0]);
            });
            if (params.onClose) {
                item.data('f7NotificationOnClose', function () {
                    params.onClose(item[0]);
                });
            }
            if (params.additionalClass) {
                item.addClass(params.additionalClass);
            }
            if (params.hold) {
                setTimeout(function () {
                    if (item.length > 0) app.closeNotification(item[0]);
                }, params.hold);
            }
        
            list[params.material ? 'append' : 'prepend'](item[0]);
            container.show();
        
            var itemHeight = item.outerHeight(), clientLeft;
            if (params.material) {
                container.transform('translate3d(0, '+itemHeight+'px, 0)');
                container.transition(0);
        
                clientLeft = item[0].clientLeft;
        
                container.transform('translate3d(0, 0, 0)');
                container.transition('');
            }
            else {
                item.css('marginTop', -itemHeight + 'px');
                item.transition(0);
        
                clientLeft = item[0].clientLeft;
        
                item.transition('');
                item.css('marginTop', '0px');
            }
        
            container.transform('translate3d(0, 0,0)');
            item.removeClass('notification-hidden');
        
            return item[0];
        };
        app.closeNotification = function (item) {
            item = $(item);
            if (item.length === 0) return;
            if (item.hasClass('notification-item-removing')) return;
            var container = $('.notifications');
        
            var itemHeight = item.outerHeight();
            item.css('height', itemHeight + 'px').transition(0).addClass('notification-item-removing');
            var clientLeft = item[0].clientLeft;
        
            item.css('height', '0px').transition('');
            if (item.data('f7NotificationOnClose')) item.data('f7NotificationOnClose')();
        
            if (container.find('.notification-item:not(.notification-item-removing)').length === 0) {
                container.transform('');
            }
        
            item.addClass('notification-hidden').transitionEnd(function () {
                item.remove();
                if (container.find('.notification-item').length === 0) {
                    container.hide();
                }
            });
        };

        /*===========================
        Compile Template7 Templates On App Init
        ===========================*/
        app.initTemplate7Templates = function () {
            if (!window.Template7) return;
            Template7.templates = Template7.templates || app.params.templates || {};
            Template7.data = Template7.data || app.params.template7Data || {};
            Template7.cache = Template7.cache || {};
        
            app.templates = Template7.templates;
            app.template7Data = Template7.data;
            app.template7Cache = Template7.cache;
        
            // Precompile templates on app init
            if (!app.params.precompileTemplates) return;
            $('script[type="text/template7"]').each(function () {
                var id = $(this).attr('id');
                if (!id) return;
                Template7.templates[id] = Template7.compile($(this).html());
            });
        };
        

        /*=======================================
        ************   Plugins API   ************
        =======================================*/
        var _plugins = [];
        app.initPlugins = function () {
            // Initialize plugins
            for (var plugin in app.plugins) {
                var p = app.plugins[plugin](app, app.params[plugin]);
                if (p) _plugins.push(p);
            }
        };
        // Plugin Hooks
        app.pluginHook = function (hook) {
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].hooks && hook in _plugins[i].hooks) {
                    _plugins[i].hooks[hook](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };
        // Prevented by plugin
        app.pluginPrevent = function (action) {
            var prevent = false;
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].prevents && action in _plugins[i].prevents) {
                    if (_plugins[i].prevents[action](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])) prevent = true;
                }
            }
            return prevent;
        };
        // Preprocess content by plugin
        app.pluginProcess = function (process, data) {
            var processed = data;
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].preprocess && process in _plugins[i].preprocess) {
                    processed = _plugins[i].preprocess[process](data, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                }
            }
            return processed;
        };
        
        

        /*======================================================
        ************   App Init   ************
        ======================================================*/
        app.init = function () {
            // Compile Template7 templates on app load
            if (app.initTemplate7Templates) app.initTemplate7Templates();
            
            // Init Plugins
            if (app.initPlugins) app.initPlugins();
            
            // Init Device
            if (app.getDeviceInfo) app.getDeviceInfo();
            
            // Init Click events
            if (app.initFastClicks && app.params.fastClicks) app.initFastClicks();
            if (app.initClickEvents) app.initClickEvents();
        
            // Init each page callbacks
            $('.page:not(.cached)').each(function () {
                app.initPageWithCallback(this);
            });
        
            // Init each navbar callbacks
            $('.navbar:not(.cached)').each(function () {
                app.initNavbarWithCallback(this); 
            });
            
            // Init resize events
            if (app.initResize) app.initResize();
        
            // Init push state
            if (app.initPushState && app.params.pushState) app.initPushState();
        
            // Init Live Swipeouts events
            if (app.initSwipeout && app.params.swipeout) app.initSwipeout();
        
            // Init Live Sortable events
            if (app.initSortable && app.params.sortable) app.initSortable();
        
            // Init Live Swipe Panels
            if (app.initSwipePanels && (app.params.swipePanel || app.params.swipePanelOnlyClose)) app.initSwipePanels();
            
            // Init Material Inputs
            if (app.params.material && app.initMaterialWatchInputs) app.initMaterialWatchInputs();
            
            // App Init callback
            if (app.params.onAppInit) app.params.onAppInit();
        
            // Plugin app init hook
            app.pluginHook('appInit');
        };
        if (app.params.init) app.init();
        

        //Return instance        
        return app;
    };
    

    /*===========================
    Dom7 Library
    ===========================*/
    var Dom7 = (function () {
        var Dom7 = function (arr) {
            var _this = this, i = 0;
            // Create array-like object
            for (i = 0; i < arr.length; i++) {
                _this[i] = arr[i];
            }
            _this.length = arr.length;
            // Return collection with methods
            return this;
        };
        var $ = function (selector, context) {
            var arr = [], i = 0;
            if (selector && !context) {
                if (selector instanceof Dom7) {
                    return selector;
                }
            }
            if (selector) {
                // String
                if (typeof selector === 'string') {
                    var els, tempParent, html = selector.trim();
                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                        var toCreate = 'div';
                        if (html.indexOf('<li') === 0) toCreate = 'ul';
                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
                        if (html.indexOf('<option') === 0) toCreate = 'select';
                        tempParent = document.createElement(toCreate);
                        tempParent.innerHTML = selector;
                        for (i = 0; i < tempParent.childNodes.length; i++) {
                            arr.push(tempParent.childNodes[i]);
                        }
                    }
                    else {
                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                            // Pure ID selector
                            els = [document.getElementById(selector.split('#')[1])];
                        }
                        else {
                            // Other selectors
                            els = (context || document).querySelectorAll(selector);
                        }
                        for (i = 0; i < els.length; i++) {
                            if (els[i]) arr.push(els[i]);
                        }
                    }
                }
                // Node/element
                else if (selector.nodeType || selector === window || selector === document) {
                    arr.push(selector);
                }
                //Array of elements or instance of Dom
                else if (selector.length > 0 && selector[0].nodeType) {
                    for (i = 0; i < selector.length; i++) {
                        arr.push(selector[i]);
                    }
                }
            }
            return new Dom7(arr);
        };

        Dom7.prototype = {
            // Classes and attriutes
            addClass: function (className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof this[j].classList !== 'undefined') this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof this[j].classList !== 'undefined') this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function (className) {
                if (!this[0]) return false;
                else return this[0].classList.contains(className);
            },
            toggleClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof this[j].classList !== 'undefined') this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function (attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);
                    else return undefined;
                }
                else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        }
                        else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function (attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            prop: function (props, value) {
                if (arguments.length === 1 && typeof props === 'string') {
                    // Get prop
                    if (this[0]) return this[0][props];
                    else return undefined;
                }
                else {
                    // Set props
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i][props] = value;
                        }
                        else {
                            // Object
                            for (var propName in props) {
                                this[i][propName] = props[propName];
                            }
                        }
                    }
                    return this;
                }
            },
            data: function (key, value) {
                if (typeof value === 'undefined') {
                    // Get value
                    if (this[0]) {
                        if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) {
                            return this[0].dom7ElementDataStorage[key];
                        }
                        else {
                            var dataKey = this[0].getAttribute('data-' + key);    
                            if (dataKey) {
                                return dataKey;
                            }
                            else return undefined;
                        }
                    }
                    else return undefined;
                }
                else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            removeData: function(key) {
                for (var i = 0; i < this.length; i++) {
                    var el = this[i];
                    if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
                        el.dom7ElementDataStorage[key] = null;
                        delete el.dom7ElementDataStorage[key];
                    }
                }
            },
            dataset: function () {
                var el = this[0];
                if (el) {
                    var dataset = {};
                    if (el.dataset) {
                        for (var dataKey in el.dataset) {
                            dataset[dataKey] = el.dataset[dataKey];
                        }
                    }
                    else {
                        for (var i = 0; i < el.attributes.length; i++) {
                            var attr = el.attributes[i];
                            if (attr.name.indexOf('data-') >= 0) {
                                dataset[$.toCamelCase(attr.name.split('data-')[1])] = attr.value;
                            }
                        }
                    }
                    for (var key in dataset) {
                        if (dataset[key] === 'false') dataset[key] = false;
                        else if (dataset[key] === 'true') dataset[key] = true;
                        else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] = dataset[key] * 1;
                    }
                    return dataset;
                }
                else return undefined;
            },
            val: function (value) {
                if (typeof value === 'undefined') {
                    if (this[0]) return this[0].value;
                    else return undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].value = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform : function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            },
            transition: function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function (eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);
                    else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    }
                    else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }
        
                return this;
            },
            off: function (eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        }
                        else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function (eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    listener = arguments[1];
                    capture = arguments[2];
                    targetSelector = false;
                }
                function proxy(e) {
                    listener.call(e.target, e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                return dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function (eventName, eventData) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        var evt;
                        try {
                            evt = new CustomEvent(events[i], {detail: eventData, bubbles: true, cancelable: true});
                        }
                        catch (e) {
                            evt = document.createEvent('Event');
                            evt.initEvent(events[i], true, true);
                            evt.detail = eventData;
                        }
                        this[j].dispatchEvent(evt);
                    }
                }
                return this;
            },
            transitionEnd: function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            animationEnd: function (callback) {
                var events = ['webkitAnimationEnd', 'OAnimationEnd', 'MSAnimationEnd', 'animationend'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    callback(e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function () {
                if (this[0] === window) {
                    return window.innerWidth;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerWidth: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) {
                        var styles = this.styles();
                        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));    
                    }
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            },
            height: function () {
                if (this[0] === window) {
                    return window.innerHeight;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerHeight: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) {
                        var styles = this.styles();
                        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));    
                    }
                    else
                        return this[0].offsetHeight;
                }
                else return null;
            },
            offset: function () {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = document.body;
                    var clientTop  = el.clientTop  || body.clientTop  || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop  = window.pageYOffset || el.scrollTop;
                    var scrollLeft = window.pageXOffset || el.scrollLeft;
                    return {
                        top: box.top  + scrollTop  - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                }
                else {
                    return null;
                }
            },
            hide: function () {
                for (var i = 0; i < this.length; i++) {
                    this[i].style.display = 'none';
                }
                return this;
            },
            show: function () {
                for (var i = 0; i < this.length; i++) {
                    this[i].style.display = 'block';
                }
                return this;
            },
            styles: function () {
                var i, styles;
                if (this[0]) return window.getComputedStyle(this[0], null);
                else return undefined;
            },
            css: function (props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                    }
                    else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },
        
            //Dom manipulation
            each: function (callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], i, this[i]);
                }
                return this;
            },
            filter: function (callback) {
                var matchedItems = [];
                var dom = this;
                for (var i = 0; i < dom.length; i++) {
                    if (callback.call(dom[i], i, dom[i])) matchedItems.push(dom[i]);
                }
                return new Dom7(matchedItems);
            },
            html: function (html) {
                if (typeof html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = html;
                    }
                    return this;
                }
            },
            text: function (text) {
                if (typeof text === 'undefined') {
                    if (this[0]) {
                        return this[0].textContent.trim();
                    }
                    else return null;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].textContent = text;
                    }
                }
            },
            is: function (selector) {
                if (!this[0] || typeof selector === 'undefined') return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === document) return selector === document;
                    if (el === window) return selector === window;
        
                    if (el.matches) return el.matches(selector);
                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                    else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                }
                else if (selector === document) return this[0] === document;
                else if (selector === window) return this[0] === window;
                else {
                    if (selector.nodeType || selector instanceof Dom7) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
        
            },
            indexOf: function (el) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] === el) return i;
                }
            },
            index: function () {
                if (this[0]) {
                    var child = this[0];
                    var i = 0;
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
                    return i;
                }
                else return undefined;
            },
            eq: function (index) {
                if (typeof index === 'undefined') return this;
                var length = this.length;
                var returnIndex;
                if (index > length - 1) {
                    return new Dom7([]);
                }
                if (index < 0) {
                    returnIndex = length + index;
                    if (returnIndex < 0) return new Dom7([]);
                    else return new Dom7([this[returnIndex]]);
                }
                return new Dom7([this[index]]);
            },
            append: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    }
                    else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            appendTo: function (parent) {
                $(parent).append(this);
                return this;
            },
            prepend: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                        // this[i].insertAdjacentHTML('afterbegin', newChild);
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                        }
                    }
                    else {
                        this[i].insertBefore(newChild, this[i].childNodes[0]);
                    }
                }
                return this;
            },
            prependTo: function (parent) {
                $(parent).prepend(this);
                return this;
            },
            insertBefore: function (selector) {
                var before = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (before.length === 1) {
                        before[0].parentNode.insertBefore(this[i], before[0]);
                    }
                    else if (before.length > 1) {
                        for (var j = 0; j < before.length; j++) {
                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                        }
                    }
                }
            },
            insertAfter: function (selector) {
                var after = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (after.length === 1) {
                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                    }
                    else if (after.length > 1) {
                        for (var j = 0; j < after.length; j++) {
                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                        }
                    }
                }
            },
            next: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            nextAll: function (selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector) {
                        if($(next).is(selector)) nextEls.push(next);
                    }
                    else nextEls.push(next);
                    el = next;
                }
                return new Dom7(nextEls);
            },
            prev: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            prevAll: function (selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector) {
                        if($(prev).is(selector)) prevEls.push(prev);
                    }
                    else prevEls.push(prev);
                    el = prev;
                }
                return new Dom7(prevEls);
            },
            parent: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode !== null) {
                        if (selector) {
                            if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                        }
                        else {
                           parents.push(this[i].parentNode);
                        }
                    }
                }
                return $($.unique(parents));
            },
            parents: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    var parent = this[i].parentNode;
                    while (parent) {
                        if (selector) {
                            if ($(parent).is(selector)) parents.push(parent);
                        }
                        else {
                            parents.push(parent);
                        }
                        parent = parent.parentNode;
                    }
                }
                return $($.unique(parents));
            },
            find : function (selector) {
                var foundElements = [];
                for (var i = 0; i < this.length; i++) {
                    var found = this[i].querySelectorAll(selector);
                    for (var j = 0; j < found.length; j++) {
                        foundElements.push(found[j]);
                    }
                }
                return new Dom7(foundElements);
            },
            children: function (selector) {
                var children = [];
                for (var i = 0; i < this.length; i++) {
                    var childNodes = this[i].childNodes;
        
                    for (var j = 0; j < childNodes.length; j++) {
                        if (!selector) {
                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                        }
                        else {
                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                        }
                    }
                }
                return new Dom7($.unique(children));
            },
            remove: function () {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            detach: function () {
                return this.remove();
            },
            add: function () {
                var dom = this;
                var i, j;
                for (i = 0; i < arguments.length; i++) {
                    var toAdd = $(arguments[i]);
                    for (j = 0; j < toAdd.length; j++) {
                        dom[dom.length] = toAdd[j];
                        dom.length++;
                    }
                }
                return dom;
            }
        };
        
        // Shortcuts
        (function () {
            var shortcuts = ('click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll').split(' ');
            var notTrigger = ('resize scroll').split(' ');
            function createMethod(name) {
                Dom7.prototype[name] = function (targetSelector, listener, capture) {
                    var i;
                    if (typeof targetSelector === 'undefined') {
                        for (i = 0; i < this.length; i++) {
                            if (notTrigger.indexOf(name) < 0) {
                                if (name in this[i]) this[i][name]();
                                else {
                                    $(this[i]).trigger(name);
                                }
                            }
                        }
                        return this;
                    }
                    else {
                        return this.on(name, targetSelector, listener, capture);
                    }
                };
            }
            for (var i = 0; i < shortcuts.length; i++) {
                createMethod(shortcuts[i]);
            }
        })();
        

        // Global Ajax Setup
        var globalAjaxOptions = {};
        $.ajaxSetup = function (options) {
            if (options.type) options.method = options.type;
            $.each(options, function (optionName, optionValue) {
                globalAjaxOptions[optionName]  = optionValue;
            });
        };
        
        // Ajax
        var _jsonpRequests = 0;
        $.ajax = function (options) {
            var defaults = {
                method: 'GET',
                data: false,
                async: true,
                cache: true,
                user: '',
                password: '',
                headers: {},
                xhrFields: {},
                statusCode: {},
                processData: true,
                dataType: 'text',
                contentType: 'application/x-www-form-urlencoded',
                timeout: 0
            };
            var callbacks = ['beforeSend', 'error', 'complete', 'success', 'statusCode'];
        
        
            //For jQuery guys
            if (options.type) options.method = options.type;
        
            // Merge global and defaults
            $.each(globalAjaxOptions, function (globalOptionName, globalOptionValue) {
                if (callbacks.indexOf(globalOptionName) < 0) defaults[globalOptionName] = globalOptionValue;
            });
        
            // Function to run XHR callbacks and events
            function fireAjaxCallback (eventName, eventData, callbackName) {
                var a = arguments;
                if (eventName) $(document).trigger(eventName, eventData);
                if (callbackName) {
                    // Global callback
                    if (callbackName in globalAjaxOptions) globalAjaxOptions[callbackName](a[3], a[4], a[5], a[6]);
                    // Options callback
                    if (options[callbackName]) options[callbackName](a[3], a[4], a[5], a[6]);
                }
            }
        
            // Merge options and defaults
            $.each(defaults, function (prop, defaultValue) {
                if (!(prop in options)) options[prop] = defaultValue;
            });
        
            // Default URL
            if (!options.url) {
                options.url = window.location.toString();
            }
            // Parameters Prefix
            var paramsPrefix = options.url.indexOf('?') >= 0 ? '&' : '?';
        
            // UC method
            var _method = options.method.toUpperCase();
            // Data to modify GET URL
            if ((_method === 'GET' || _method === 'HEAD' || _method === 'OPTIONS' || _method === 'DELETE') && options.data) {
                var stringData;
                if (typeof options.data === 'string') {
                    // Should be key=value string
                    if (options.data.indexOf('?') >= 0) stringData = options.data.split('?')[1];
                    else stringData = options.data;
                }
                else {
                    // Should be key=value object
                    stringData = $.serializeObject(options.data);
                }
                if (stringData.length) {
                    options.url += paramsPrefix + stringData;
                    if (paramsPrefix === '?') paramsPrefix = '&';
                }
            }
            // JSONP
            if (options.dataType === 'json' && options.url.indexOf('callback=') >= 0) {
        
                var callbackName = 'f7jsonp_' + Date.now() + (_jsonpRequests++);
                var abortTimeout;
                var callbackSplit = options.url.split('callback=');
                var requestUrl = callbackSplit[0] + 'callback=' + callbackName;
                if (callbackSplit[1].indexOf('&') >= 0) {
                    var addVars = callbackSplit[1].split('&').filter(function (el) { return el.indexOf('=') > 0; }).join('&');
                    if (addVars.length > 0) requestUrl += '&' + addVars;
                }
        
                // Create script
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.onerror = function() {
                    clearTimeout(abortTimeout);
                    fireAjaxCallback(undefined, undefined, 'error', null, 'scripterror');
                };
                script.src = requestUrl;
        
                // Handler
                window[callbackName] = function (data) {
                    clearTimeout(abortTimeout);
                    fireAjaxCallback(undefined, undefined, 'success', data);
                    script.parentNode.removeChild(script);
                    script = null;
                    delete window[callbackName];
                };
                document.querySelector('head').appendChild(script);
        
                if (options.timeout > 0) {
                    abortTimeout = setTimeout(function () {
                        script.parentNode.removeChild(script);
                        script = null;
                        fireAjaxCallback(undefined, undefined, 'error', null, 'timeout');
                    }, options.timeout);
                }
        
                return;
            }
        
            // Cache for GET/HEAD requests
            if (_method === 'GET' || _method === 'HEAD' || _method === 'OPTIONS' || _method === 'DELETE') {
                if (options.cache === false) {
                    options.url += (paramsPrefix + '_nocache=' + Date.now());
                }
            }
        
            // Create XHR
            var xhr = new XMLHttpRequest();
        
            // Save Request URL
            xhr.requestUrl = options.url;
            xhr.requestParameters = options;
        
            // Open XHR
            xhr.open(_method, options.url, options.async, options.user, options.password);
        
            // Create POST Data
            var postData = null;
        
            if ((_method === 'POST' || _method === 'PUT' || _method === 'PATCH') && options.data) {
                if (options.processData) {
                    var postDataInstances = [ArrayBuffer, Blob, Document, FormData];
                    // Post Data
                    if (postDataInstances.indexOf(options.data.constructor) >= 0) {
                        postData = options.data;
                    }
                    else {
                        // POST Headers
                        var boundary = '---------------------------' + Date.now().toString(16);
        
                        if (options.contentType === 'multipart\/form-data') {
                            xhr.setRequestHeader('Content-Type', 'multipart\/form-data; boundary=' + boundary);
                        }
                        else {
                            xhr.setRequestHeader('Content-Type', options.contentType);
                        }
                        postData = '';
                        var _data = $.serializeObject(options.data);
                        if (options.contentType === 'multipart\/form-data') {
                            boundary = '---------------------------' + Date.now().toString(16);
                            _data = _data.split('&');
                            var _newData = [];
                            for (var i = 0; i < _data.length; i++) {
                                _newData.push('Content-Disposition: form-data; name="' + _data[i].split('=')[0] + '"\r\n\r\n' + _data[i].split('=')[1] + '\r\n');
                            }
                            postData = '--' + boundary + '\r\n' + _newData.join('--' + boundary + '\r\n') + '--' + boundary + '--\r\n';
                        }
                        else {
                            postData = options.contentType === 'application/x-www-form-urlencoded' ? _data : _data.replace(/&/g, '\r\n');
                        }
                    }
                }
                else {
                    postData = options.data;
                }
        
            }
        
            // Additional headers
            if (options.headers) {
                $.each(options.headers, function (headerName, headerCallback) {
                    xhr.setRequestHeader(headerName, headerCallback);
                });
            }
        
            // Check for crossDomain
            if (typeof options.crossDomain === 'undefined') {
                options.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== window.location.host;
            }
        
            if (!options.crossDomain) {
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }
        
            if (options.xhrFields) {
                $.each(options.xhrFields, function (fieldName, fieldValue) {
                    xhr[fieldName] = fieldValue;
                });
            }
        
            var xhrTimeout;
            // Handle XHR
            xhr.onload = function (e) {
                if (xhrTimeout) clearTimeout(xhrTimeout);
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                    var responseData;
                    if (options.dataType === 'json') {
                        try {
                            responseData = JSON.parse(xhr.responseText);
                            fireAjaxCallback('ajaxSuccess', {xhr: xhr}, 'success', responseData, xhr.status, xhr);
                        }
                        catch (err) {
                            fireAjaxCallback('ajaxError', {xhr: xhr, parseerror: true}, 'error', xhr, 'parseerror');
                        }
                    }
                    else {
                        responseData = xhr.responseType === 'text' || xhr.responseType === '' ? xhr.responseText : xhr.response;
                        fireAjaxCallback('ajaxSuccess', {xhr: xhr}, 'success', responseData, xhr.status, xhr);
                    }
                }
                else {
                    fireAjaxCallback('ajaxError', {xhr: xhr}, 'error', xhr, xhr.status);
                }
                if (options.statusCode) {
                    if (globalAjaxOptions.statusCode && globalAjaxOptions.statusCode[xhr.status]) globalAjaxOptions.statusCode[xhr.status](xhr);
                    if (options.statusCode[xhr.status]) options.statusCode[xhr.status](xhr);
                }
                fireAjaxCallback('ajaxComplete', {xhr: xhr}, 'complete', xhr, xhr.status);
            };
        
            xhr.onerror = function (e) {
                if (xhrTimeout) clearTimeout(xhrTimeout);
                fireAjaxCallback('ajaxError', {xhr: xhr}, 'error', xhr, xhr.status);
            };
        
            // Ajax start callback
            fireAjaxCallback('ajaxStart', {xhr: xhr}, 'start', xhr);
            fireAjaxCallback(undefined, undefined, 'beforeSend', xhr);
        
        
            // Send XHR
            xhr.send(postData);
        
            // Timeout
            if (options.timeout > 0) {
                xhr.onabort = function () {
                    if (xhrTimeout) clearTimeout(xhrTimeout);
                };
                xhrTimeout = setTimeout(function () {
                    xhr.abort();
                    fireAjaxCallback('ajaxError', {xhr: xhr, timeout: true}, 'error', xhr, 'timeout');
                    fireAjaxCallback('ajaxComplete', {xhr: xhr, timeout: true}, 'complete', xhr, 'timeout');
                }, options.timeout);
            }
        
            // Return XHR object
            return xhr;
        };
        // Shrotcuts
        (function () {
            var methods = ('get post getJSON').split(' ');
            function createMethod(method) {
                $[method] = function (url, data, success) {
                    return $.ajax({
                        url: url,
                        method: method === 'post' ? 'POST' : 'GET',
                        data: typeof data === 'function' ? undefined : data,
                        success: typeof data === 'function' ? data : success,
                        dataType: method === 'getJSON' ? 'json' : undefined
                    });
                };
            }
            for (var i = 0; i < methods.length; i++) {
                createMethod(methods[i]);
            }
        })();
        

        // DOM Library Utilites
        $.parseUrlQuery = function (url) {
            var query = {}, i, params, param;
            if (url.indexOf('?') >= 0) url = url.split('?')[1];
            else return query;
            params = url.split('&');
            for (i = 0; i < params.length; i++) {
                param = params[i].split('=');
                query[param[0]] = param[1];
            }
            return query;
        };
        $.isArray = function (arr) {
            if (Object.prototype.toString.apply(arr) === '[object Array]') return true;
            else return false;
        };
        $.each = function (obj, callback) {
            if (typeof obj !== 'object') return;
            if (!callback) return;
            var i, prop;
            if ($.isArray(obj) || obj instanceof Dom7) {
                // Array
                for (i = 0; i < obj.length; i++) {
                    callback(i, obj[i]);
                }
            }
            else {
                // Object
                for (prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        callback(prop, obj[prop]);
                    }
                }
            }
        };
        $.unique = function (arr) {
            var unique = [];
            for (var i = 0; i < arr.length; i++) {
                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
            }
            return unique;
        };
        $.serializeObject = $.param = function (obj, parents) {
            if (typeof obj === 'string') return obj;
            var resultArray = [];
            var separator = '&';
            parents = parents || [];
            var newParents;
            function var_name(name) {
                if (parents.length > 0) {
                    var _parents = '';
                    for (var j = 0; j < parents.length; j++) {
                        if (j === 0) _parents += parents[j];
                        else _parents += '[' + encodeURIComponent(parents[j]) + ']';
                    }
                    return _parents + '[' + encodeURIComponent(name) + ']';
                }
                else {
                    return encodeURIComponent(name);
                }
            }
            function var_value(value) {
                return encodeURIComponent(value);
            }
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    var toPush;
                    if ($.isArray(obj[prop])) {
                        toPush = [];
                        for (var i = 0; i < obj[prop].length; i ++) {
                            if (!$.isArray(obj[prop][i]) && typeof obj[prop][i] === 'object') {
                                newParents = parents.slice();
                                newParents.push(prop);
                                newParents.push(i + '');
                                toPush.push($.serializeObject(obj[prop][i], newParents));
                            }
                            else {
                                toPush.push(var_name(prop) + '[]=' + var_value(obj[prop][i]));
                            }
                            
                        }
                        if (toPush.length > 0) resultArray.push(toPush.join(separator));
                    }
                    else if (typeof obj[prop] === 'object') {
                        // Object, convert to named array
                        newParents = parents.slice();
                        newParents.push(prop);
                        toPush = $.serializeObject(obj[prop], newParents);
                        if (toPush !== '') resultArray.push(toPush);
                    }
                    else if (typeof obj[prop] !== 'undefined' && obj[prop] !== '') {
                        // Should be string or plain value
                        resultArray.push(var_name(prop) + '=' + var_value(obj[prop]));
                    }
                }
            }
            return resultArray.join(separator);
        };
        $.toCamelCase = function (string) {
            return string.toLowerCase().replace(/-(.)/g, function(match, group1) {
                return group1.toUpperCase();
            });
        };
        $.dataset = function (el) {
            return $(el).dataset();
        };
        $.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;
        
            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }
        
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function(a){
                        return a.replace(',','.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
        
            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[5]);
            }
            
            return curTransform || 0;
        };
        
        $.requestAnimationFrame = function (callback) {
            if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
            else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
            else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
            else {
                return window.setTimeout(callback, 1000 / 60);
            }
        };
        $.cancelAnimationFrame = function (id) {
            if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
            else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
            else if (window.mozCancelAnimationFrame) return window.mozCancelAnimationFrame(id);
            else {
                return window.clearTimeout(id);
            }  
        };
        $.supportTouch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
        
        // Link to prototype
        $.fn = Dom7.prototype;
        
        // Plugins
        $.fn.scrollTo = function (left, top, duration, easing, callback) {
            if (arguments.length === 4 && typeof easing === 'function') {
                callback = easing;
                easing = undefined;
            }
            return this.each(function () {
                var el = this;
                var currentTop, currentLeft, maxTop, maxLeft, newTop, newLeft, scrollTop, scrollLeft;
                var animateTop = top > 0 || top === 0;
                var animateLeft = left > 0 || left === 0;
                if (typeof easing === 'undefined') {
                    easing = 'swing';
                }
                if (animateTop) {
                    currentTop = el.scrollTop;
                    if (!duration) {
                        el.scrollTop = top;
                    }
                }
                if (animateLeft) {
                    currentLeft = el.scrollLeft;
                    if (!duration) {
                        el.scrollLeft = left;
                    }
                }
                if (!duration) return;
                if (animateTop) {
                    maxTop = el.scrollHeight - el.offsetHeight;
                    newTop = Math.max(Math.min(top, maxTop), 0);
                }
                if (animateLeft) {
                    maxLeft = el.scrollWidth - el.offsetWidth;
                    newLeft = Math.max(Math.min(left, maxLeft), 0);
                }
                var startTime = null;
                if (animateTop && newTop === currentTop) animateTop = false;
                if (animateLeft && newLeft === currentLeft) animateLeft = false;
                function render(time) {
                    if (time === undefined) {
                        time = new Date().getTime();
                    }
                    if (startTime === null) {
                        startTime = time;
                    }
                    var doneLeft, doneTop, done;
                    var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
                    var easeProgress = easing === 'linear' ? progress : (0.5 - Math.cos( progress * Math.PI ) / 2);
                    if (animateTop) scrollTop = currentTop + (easeProgress * (newTop - currentTop));
                    if (animateLeft) scrollLeft = currentLeft + (easeProgress * (newLeft - currentLeft));
                    if (animateTop && newTop > currentTop && scrollTop >= newTop)  {
                        el.scrollTop = newTop;
                        done = true;
                    }
                    if (animateTop && newTop < currentTop && scrollTop <= newTop)  {
                        el.scrollTop = newTop;
                        done = true;
                    }
        
                    if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft)  {
                        el.scrollLeft = newLeft;
                        done = true;
                    }
                    if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft)  {
                        el.scrollLeft = newLeft;
                        done = true;
                    }
        
                    if (done) {
                        if (callback) callback();
                        return;
                    }
                    if (animateTop) el.scrollTop = scrollTop;
                    if (animateLeft) el.scrollLeft = scrollLeft;
                    $.requestAnimationFrame(render);
                }
                $.requestAnimationFrame(render);
            });
        };
        $.fn.scrollTop = function (top, duration, easing, callback) {
            if (arguments.length === 3 && typeof easing === 'function') {
                callback = easing;
                easing = undefined;
            }
            var dom = this;
            if (typeof top === 'undefined') {
                if (dom.length > 0) return dom[0].scrollTop;
                else return null;
            }
            return dom.scrollTo(undefined, top, duration, easing, callback);
        };
        $.fn.scrollLeft = function (left, duration, easing, callback) {
            if (arguments.length === 3 && typeof easing === 'function') {
                callback = easing;
                easing = undefined;
            }
            var dom = this;
            if (typeof left === 'undefined') {
                if (dom.length > 0) return dom[0].scrollLeft;
                else return null;
            }
            return dom.scrollTo(left, undefined, duration, easing, callback);
        };

        return $;
    })();
    
    // Export Dom7 to Framework7
    Framework7.$ = Dom7;
    
    // Export to local scope
    var $ = Dom7;
    
    // Export to Window
    window.Dom7 = Dom7;
    

    /*===========================
    Features Support Detection
    ===========================*/
    Framework7.prototype.support = (function () {
        var support = {
            touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
        };
    
        // Export object
        return support;
    })();
    

    /*===========================
    Device/OS Detection
    ===========================*/
    Framework7.prototype.device = (function () {
        var device = {};
        var ua = navigator.userAgent;
        var $ = Dom7;
    
        var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    
        device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
        
        // Android
        if (android) {
            device.os = 'android';
            device.osVersion = android[2];
            device.android = true;
            device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
        }
        if (ipad || iphone || ipod) {
            device.os = 'ios';
            device.ios = true;
        }
        // iOS
        if (iphone && !ipod) {
            device.osVersion = iphone[2].replace(/_/g, '.');
            device.iphone = true;
        }
        if (ipad) {
            device.osVersion = ipad[2].replace(/_/g, '.');
            device.ipad = true;
        }
        if (ipod) {
            device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
            device.iphone = true;
        }
        // iOS 8+ changed UA
        if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
            if (device.osVersion.split('.')[0] === '10') {
                device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
            }
        }
    
        // Webview
        device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
            
        // Minimal UI
        if (device.os && device.os === 'ios') {
            var osVersionArr = device.osVersion.split('.');
            device.minimalUi = !device.webView &&
                                (ipod || iphone) &&
                                (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
                                $('meta[name="viewport"]').length > 0 && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
        }
    
        // Check for status bar and fullscreen app mode
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        device.statusBar = false;
        if (device.webView && (windowWidth * windowHeight === screen.width * screen.height)) {
            device.statusBar = true;
        }
        else {
            device.statusBar = false;
        }
    
        // Classes
        var classNames = [];
    
        // Pixel Ratio
        device.pixelRatio = window.devicePixelRatio || 1;
        classNames.push('pixel-ratio-' + Math.floor(device.pixelRatio));
        if (device.pixelRatio >= 2) {
            classNames.push('retina');
        }
    
        // OS classes
        if (device.os) {
            classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
            if (device.os === 'ios') {
                var major = parseInt(device.osVersion.split('.')[0], 10);
                for (var i = major - 1; i >= 6; i--) {
                    classNames.push('ios-gt-' + i);
                }
            }
            
        }
        // Status bar classes
        if (device.statusBar) {
            classNames.push('with-statusbar-overlay');
        }
        else {
            $('html').removeClass('with-statusbar-overlay');
        }
    
        // Add html classes
        if (classNames.length > 0) $('html').addClass(classNames.join(' '));
    
        // Export object
        return device;
    })();
    

    /*===========================
    Plugins prototype
    ===========================*/
    Framework7.prototype.plugins = {};
    

    /*===========================
    Template7 Template engine
    ===========================*/
    window.Template7 = (function () {
        function isArray(arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        }
        function isObject(obj) {
            return obj instanceof Object;
        }
        function isFunction(func) {
            return typeof func === 'function';
        }
        var cache = {};
        function helperToSlices(string) {
            var helperParts = string.replace(/[{}#}]/g, '').split(' ');
            var slices = [];
            var shiftIndex, i, j;
            for (i = 0; i < helperParts.length; i++) {
                var part = helperParts[i];
                if (i === 0) slices.push(part);
                else {
                    if (part.indexOf('"') === 0) {
                        // Plain String
                        if (part.match(/"/g).length === 2) {
                            // One word string
                            slices.push(part);
                        }
                        else {
                            // Find closed Index
                            shiftIndex = 0;
                            for (j = i + 1; j < helperParts.length; j++) {
                                part += ' ' + helperParts[j];
                                if (helperParts[j].indexOf('"') >= 0) {
                                    shiftIndex = j;
                                    slices.push(part);
                                    break;
                                }
                            }
                            if (shiftIndex) i = shiftIndex;
                        }
                    }
                    else {
                        if (part.indexOf('=') > 0) {
                            // Hash
                            var hashParts = part.split('=');
                            var hashName = hashParts[0];
                            var hashContent = hashParts[1];
                            if (hashContent.match(/"/g).length !== 2) {
                                shiftIndex = 0;
                                for (j = i + 1; j < helperParts.length; j++) {
                                    hashContent += ' ' + helperParts[j];
                                    if (helperParts[j].indexOf('"') >= 0) {
                                        shiftIndex = j;
                                        break;
                                    }
                                }
                                if (shiftIndex) i = shiftIndex;
                            }
                            var hash = [hashName, hashContent.replace(/"/g,'')];
                            slices.push(hash);
                        }
                        else {
                            // Plain variable
                            slices.push(part);
                        }
                    }
                }
            }
            return slices;
        }
        function stringToBlocks(string) {
            var blocks = [], i, j, k;
            if (!string) return [];
            var _blocks = string.split(/({{[^{^}]*}})/);
            for (i = 0; i < _blocks.length; i++) {
                var block = _blocks[i];
                if (block === '') continue;
                if (block.indexOf('{{') < 0) {
                    blocks.push({
                        type: 'plain',
                        content: block
                    });
                }
                else {
                    if (block.indexOf('{/') >= 0) {
                        continue;
                    }
                    if (block.indexOf('{#') < 0 && block.indexOf(' ') < 0 && block.indexOf('else') < 0) {
                        // Simple variable
                        blocks.push({
                            type: 'variable',
                            contextName: block.replace(/[{}]/g, '')
                        });
                        continue;
                    }
                    // Helpers
                    var helperSlices = helperToSlices(block);
                    var helperName = helperSlices[0];
                    var isPartial = helperName === '>';
                    var helperContext = [];
                    var helperHash = {};
                    for (j = 1; j < helperSlices.length; j++) {
                        var slice = helperSlices[j];
                        if (isArray(slice)) {
                            // Hash
                            helperHash[slice[0]] = slice[1] === 'false' ? false : slice[1];
                        }
                        else {
                            helperContext.push(slice);
                        }
                    }
                    
                    if (block.indexOf('{#') >= 0) {
                        // Condition/Helper
                        var helperStartIndex = i;
                        var helperContent = '';
                        var elseContent = '';
                        var toSkip = 0;
                        var shiftIndex;
                        var foundClosed = false, foundElse = false, foundClosedElse = false, depth = 0;
                        for (j = i + 1; j < _blocks.length; j++) {
                            if (_blocks[j].indexOf('{{#') >= 0) {
                                depth ++;
                            }
                            if (_blocks[j].indexOf('{{/') >= 0) {
                                depth --;
                            }
                            if (_blocks[j].indexOf('{{#' + helperName) >= 0) {
                                helperContent += _blocks[j];
                                if (foundElse) elseContent += _blocks[j];
                                toSkip ++;
                            }
                            else if (_blocks[j].indexOf('{{/' + helperName) >= 0) {
                                if (toSkip > 0) {
                                    toSkip--;
                                    helperContent += _blocks[j];
                                    if (foundElse) elseContent += _blocks[j];
                                }
                                else {
                                    shiftIndex = j;
                                    foundClosed = true;
                                    break;
                                }
                            }
                            else if (_blocks[j].indexOf('else') >= 0 && depth === 0) {
                                foundElse = true;
                            }
                            else {
                                if (!foundElse) helperContent += _blocks[j];
                                if (foundElse) elseContent += _blocks[j];
                            }
    
                        }
                        if (foundClosed) {
                            if (shiftIndex) i = shiftIndex;
                            blocks.push({
                                type: 'helper',
                                helperName: helperName,
                                contextName: helperContext,
                                content: helperContent,
                                inverseContent: elseContent,
                                hash: helperHash
                            });
                        }
                    }
                    else if (block.indexOf(' ') > 0) {
                        if (isPartial) {
                            helperName = '_partial';
                            if (helperContext[0]) helperContext[0] = '"' + helperContext[0].replace(/"|'/g, '') + '"';
                        }
                        blocks.push({
                            type: 'helper',
                            helperName: helperName,
                            contextName: helperContext,
                            hash: helperHash
                        });
                    }
                }
            }
            return blocks;
        }
        var Template7 = function (template) {
            var t = this;
            t.template = template;
            
            function getCompileFn(block, depth) {
                if (block.content) return compile(block.content, depth);
                else return function () {return ''; };
            }
            function getCompileInverse(block, depth) {
                if (block.inverseContent) return compile(block.inverseContent, depth);
                else return function () {return ''; };
            }
            function getCompileVar(name, ctx) {
                var variable, parts, levelsUp = 0, initialCtx = ctx;
                if (name.indexOf('../') === 0) {
                    levelsUp = name.split('../').length - 1;
                    var newDepth = ctx.split('_')[1] - levelsUp;
                    ctx = 'ctx_' + (newDepth >= 1 ? newDepth : 1);
                    parts = name.split('../')[levelsUp].split('.');
                }
                else if (name.indexOf('@global') === 0) {
                    ctx = 'Template7.global';
                    parts = name.split('@global.')[1].split('.');
                }
                else if (name.indexOf('@root') === 0) {
                    ctx = 'root';
                    parts = name.split('@root.')[1].split('.');
                }
                else {
                    parts = name.split('.');
                }
                variable = ctx;
                for (var i = 0; i < parts.length; i++) {
                    var part = parts[i];
                    if (part.indexOf('@') === 0) {
                        if (i > 0) {
                            variable += '[(data && data.' + part.replace('@', '') + ')]';
                        }
                        else {
                            variable = '(data && data.' + name.replace('@', '') + ')';
                        }
                    }
                    else {
                        if (isFinite(part)) {
                            variable += '[' + part + ']';
                        }
                        else {
                            if (part.indexOf('this') === 0) {
                                variable = part.replace('this', ctx);
                            }
                            else {
                                variable += '.' + part;       
                            }
                        }
                    }
                }
    
                return variable;
            }
            function getCompiledArguments(contextArray, ctx) {
                var arr = [];
                for (var i = 0; i < contextArray.length; i++) {
                    if (contextArray[i].indexOf('"') === 0) arr.push(contextArray[i]);
                    else {
                        arr.push(getCompileVar(contextArray[i], ctx));
                    }
                }
    
                return arr.join(', ');
            }
            function compile(template, depth) {
                depth = depth || 1;
                template = template || t.template;
                if (typeof template !== 'string') {
                    throw new Error('Template7: Template must be a string');
                }
                var blocks = stringToBlocks(template);
                if (blocks.length === 0) {
                    return function () { return ''; };
                }
                var ctx = 'ctx_' + depth;
                var resultString = '';
                if (depth === 1) {
                    resultString += '(function (' + ctx + ', data, root) {\n';
                }
                else {
                    resultString += '(function (' + ctx + ', data) {\n';
                }
                if (depth === 1) {
                    resultString += 'function isArray(arr){return Object.prototype.toString.apply(arr) === \'[object Array]\';}\n';
                    resultString += 'function isFunction(func){return (typeof func === \'function\');}\n';
                    resultString += 'function c(val, ctx) {if (typeof val !== "undefined" && val !== null) {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n';
                    resultString += 'root = root || ctx_1 || {};\n';
                }
                resultString += 'var r = \'\';\n';
                var i, j, context;
                for (i = 0; i < blocks.length; i++) {
                    var block = blocks[i];
                    // Plain block
                    if (block.type === 'plain') {
                        resultString += 'r +=\'' + (block.content).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/'/g, '\\' + '\'') + '\';';
                        continue;
                    }
                    var variable, compiledArguments;
                    // Variable block
                    if (block.type === 'variable') {
                        variable = getCompileVar(block.contextName, ctx);
                        resultString += 'r += c(' + variable + ', ' + ctx + ');';
                    }
                    // Helpers block
                    if (block.type === 'helper') {
                        if (block.helperName in t.helpers) {
                            compiledArguments = getCompiledArguments(block.contextName, ctx);
                            
                            resultString += 'r += (Template7.helpers.' + block.helperName + ').call(' + ctx + ', ' + (compiledArguments && (compiledArguments + ', ')) +'{hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth + 1) + ', inverse: ' + getCompileInverse(block, depth + 1) + ', root: root});';
                            
                        }
                        else {
                            if (block.contextName.length > 0) {
                                throw new Error('Template7: Missing helper: "' + block.helperName + '"');
                            }
                            else {
                                variable = getCompileVar(block.helperName, ctx);
                                resultString += 'if (' + variable + ') {';
                                resultString += 'if (isArray(' + variable + ')) {';
                                resultString += 'r += (Template7.helpers.each).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: root});';
                                resultString += '}else {';
                                resultString += 'r += (Template7.helpers.with).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: root});';
                                resultString += '}}';
                            }
                        }
                    }
                }
                resultString += '\nreturn r;})';
                return eval.call(window, resultString);
            }
            t.compile = function (template) {
                if (!t.compiled) {
                    t.compiled = compile(template);
                }
                return t.compiled;
            };
        };
        Template7.prototype = {
            options: {},
            partials: {},
            helpers: {
                '_partial' : function (partialName, options) {
                    var p = Template7.prototype.partials[partialName];
                    if (!p || (p && !p.template)) return '';
                    if (!p.compiled) {
                        p.compiled = t7.compile(p.template);
                    }
                    var ctx = this;
                    for (var hashName in options.hash) {
                        ctx[hashName] = options.hash[hashName];
                    }
                    return p.compiled(ctx, options.data, options.root);
                },
                'escape': function (context, options) {
                    if (typeof context !== 'string') {
                        throw new Error('Template7: Passed context to "escape" helper should be a string');
                    }
                    return context
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/"/g, '&quot;');
                },
                'if': function (context, options) {
                    if (isFunction(context)) { context = context.call(this); }
                    if (context) {
                        return options.fn(this, options.data);
                    }
                    else {
                        return options.inverse(this, options.data);
                    }
                },
                'unless': function (context, options) {
                    if (isFunction(context)) { context = context.call(this); }
                    if (!context) {
                        return options.fn(this, options.data);
                    }
                    else {
                        return options.inverse(this, options.data);
                    }
                },
                'each': function (context, options) {
                    var ret = '', i = 0;
                    if (isFunction(context)) { context = context.call(this); }
                    if (isArray(context)) {
                        if (options.hash.reverse) {
                            context = context.reverse();
                        }
                        for (i = 0; i < context.length; i++) {
                            ret += options.fn(context[i], {first: i === 0, last: i === context.length - 1, index: i});
                        }
                        if (options.hash.reverse) {
                            context = context.reverse();
                        }
                    }
                    else {
                        for (var key in context) {
                            i++;
                            ret += options.fn(context[key], {key: key});
                        }
                    }
                    if (i > 0) return ret;
                    else return options.inverse(this);
                },
                'with': function (context, options) {
                    if (isFunction(context)) { context = context.call(this); }
                    return options.fn(context);
                },
                'join': function (context, options) {
                    if (isFunction(context)) { context = context.call(this); }
                    return context.join(options.hash.delimiter || options.hash.delimeter);
                },
                'js': function (expression, options) {
                    var func;
                    if (expression.indexOf('return')>=0) {
                        func = '(function(){'+expression+'})';
                    }
                    else {
                        func = '(function(){return ('+expression+')})';
                    }
                    return eval.call(this, func).call(this);
                },
                'js_compare': function (expression, options) {
                    var func;
                    if (expression.indexOf('return')>=0) {
                        func = '(function(){'+expression+'})';
                    }
                    else {
                        func = '(function(){return ('+expression+')})';
                    }
                    var condition = eval.call(this, func).call(this);
                    if (condition) {
                        return options.fn(this, options.data);
                    }
                    else {
                        return options.inverse(this, options.data);   
                    }
                }
            }
        };
        var t7 = function (template, data) {
            if (arguments.length === 2) {
                var instance = new Template7(template);
                var rendered = instance.compile()(data);
                instance = null;
                return (rendered);
            }
            else return new Template7(template);
        };
        t7.registerHelper = function (name, fn) {
            Template7.prototype.helpers[name] = fn;
        };
        t7.unregisterHelper = function (name) {
            Template7.prototype.helpers[name] = undefined;  
            delete Template7.prototype.helpers[name];
        };
        t7.registerPartial = function (name, template) {
            Template7.prototype.partials[name] = {template: template};
        };
        t7.unregisterPartial = function (name, template) {
            if (Template7.prototype.partials[name]) {
                Template7.prototype.partials[name] = undefined;
                delete Template7.prototype.partials[name];
            }
        };
        
        t7.compile = function (template, options) {
            var instance = new Template7(template, options);
            return instance.compile();
        };
        
        t7.options = Template7.prototype.options;
        t7.helpers = Template7.prototype.helpers;
        t7.partials = Template7.prototype.partials;
        return t7;
    })();

    /*===========================
    Swiper
    ===========================*/
    window.Swiper = function (container, params) {
        if (!(this instanceof Swiper)) return new Swiper(container, params);
        var defaults = {
            direction: 'horizontal',
            touchEventsTarget: 'container',
            initialSlide: 0,
            speed: 300,
            // autoplay
            autoplay: false,
            autoplayDisableOnInteraction: true,
            // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
            iOSEdgeSwipeDetection: false,
            iOSEdgeSwipeThreshold: 20,
            // Free mode
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeSticky: false,
            freeModeMinimumVelocity: 0.02,
            // Autoheight
            autoHeight: false,
            // Set wrapper width
            setWrapperSize: false,
            // Virtual Translate
            virtualTranslate: false,
            // Effects
            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow'
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : true
            },
            cube: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fade: {
                crossFade: false
            },
            // Parallax
            parallax: false,
            // Scrollbar
            scrollbar: null,
            scrollbarHide: true,
            scrollbarDraggable: false,
            scrollbarSnapOnRelease: false,
            // Keyboard Mousewheel
            keyboardControl: false,
            mousewheelControl: false,
            mousewheelReleaseOnEdges: false,
            mousewheelInvert: false,
            mousewheelForceToAxis: false,
            mousewheelSensitivity: 1,
            // Hash Navigation
            hashnav: false,
            // Breakpoints
            breakpoints: undefined,
            // Slides grid
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'column',
            slidesPerGroup: 1,
            centeredSlides: false,
            slidesOffsetBefore: 0, // in px
            slidesOffsetAfter: 0, // in px
            // Round length
            roundLengths: false,
            // Touches
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            onlyExternal: false,
            threshold: 0,
            touchMoveStopPropagation: true,
            // Pagination
            pagination: null,
            paginationElement: 'span',
            paginationClickable: false,
            paginationHide: false,
            paginationBulletRender: null,
            // Resistance
            resistance: true,
            resistanceRatio: 0.85,
            // Next/prev buttons
            nextButton: null,
            prevButton: null,
            // Progress
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            // Cursor
            grabCursor: false,
            // Clicks
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            // Lazy Loading
            lazyLoading: false,
            lazyLoadingInPrevNext: false,
            lazyLoadingOnTransitionStart: false,
            // Images
            preloadImages: true,
            updateOnImagesReady: true,
            // loop
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            // Control
            control: undefined,
            controlInverse: false,
            controlBy: 'slide', //or 'container'
            // Swiping/no swiping
            allowSwipeToPrev: true,
            allowSwipeToNext: true,
            swipeHandler: null, //'.swipe-handler',
            noSwiping: true,
            noSwipingClass: 'swiper-no-swiping',
            // NS
            slideClass: 'swiper-slide',
            slideActiveClass: 'swiper-slide-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slidePrevClass: 'swiper-slide-prev',
            wrapperClass: 'swiper-wrapper',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            buttonDisabledClass: 'swiper-button-disabled',
            paginationHiddenClass: 'swiper-pagination-hidden',
            // Observer
            observer: false,
            observeParents: false,
            // Accessibility
            a11y: false,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
            // Callbacks
            runCallbacksOnInit: true
            /*
            Callbacks:
            onInit: function (swiper)
            onDestroy: function (swiper)
            onClick: function (swiper, e)
            onTap: function (swiper, e)
            onDoubleTap: function (swiper, e)
            onSliderMove: function (swiper, e)
            onSlideChangeStart: function (swiper)
            onSlideChangeEnd: function (swiper)
            onTransitionStart: function (swiper)
            onTransitionEnd: function (swiper)
            onImagesReady: function (swiper)
            onProgress: function (swiper, progress)
            onTouchStart: function (swiper, e)
            onTouchMove: function (swiper, e)
            onTouchMoveOpposite: function (swiper, e)
            onTouchEnd: function (swiper, e)
            onReachBeginning: function (swiper)
            onReachEnd: function (swiper)
            onSetTransition: function (swiper, duration)
            onSetTranslate: function (swiper, translate)
            onAutoplayStart: function (swiper)
            onAutoplayStop: function (swiper),
            onLazyImageLoad: function (swiper, slide, image)
            onLazyImageReady: function (swiper, slide, image)
            */
        
        };
        var initialVirtualTranslate = params && params.virtualTranslate;
        
        params = params || {};
        var originalParams = {};
        for (var param in params) {
            if (typeof params[param] === 'object' && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
                originalParams[param] = {};
                for (var deepParam in params[param]) {
                    originalParams[param][deepParam] = params[param][deepParam];
                }
            }
            else {
                originalParams[param] = params[param];
            }
        }
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            }
            else if (typeof params[def] === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                }
            }
        }
        
        // Swiper
        var s = this;
        
        // Params
        s.params = params;
        s.originalParams = originalParams;
        
        // Classname
        s.classNames = [];
        /*=========================
          Dom Library and plugins
          ===========================*/
        if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined'){
            $ = Dom7;
        }
        if (typeof $ === 'undefined') {
            if (typeof Dom7 === 'undefined') {
                $ = window.Dom7 || window.Zepto || window.jQuery;
            }
            else {
                $ = Dom7;
            }
            if (!$) return;
        }
        // Export it to Swiper instance
        s.$ = $;
        
        /*=========================
          Breakpoints
          ===========================*/
        s.currentBreakpoint = undefined;
        s.getActiveBreakpoint = function () {
            //Get breakpoint for window width
            if (!s.params.breakpoints) return false;
            var breakpoint = false;
            var points = [], point;
            for ( point in s.params.breakpoints ) {
                if (s.params.breakpoints.hasOwnProperty(point)) {
                    points.push(point);
                }
            }
            points.sort(function (a, b) {
                return parseInt(a, 10) > parseInt(b, 10);
            });
            for (var i = 0; i < points.length; i++) {
                point = points[i];
                if (point >= window.innerWidth && !breakpoint) {
                    breakpoint = point;
                }
            }
            return breakpoint || 'max';
        };
        s.setBreakpoint = function () {
            //Set breakpoint for window width and update parameters
            var breakpoint = s.getActiveBreakpoint();
            if (breakpoint && s.currentBreakpoint !== breakpoint) {
                var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
                for ( var param in breakPointsParams ) {
                    s.params[param] = breakPointsParams[param];
                }
                s.currentBreakpoint = breakpoint;
            }
        };
        // Set breakpoint on load
        if (s.params.breakpoints) {
            s.setBreakpoint();
        }
        
        /*=========================
          Preparation - Define Container, Wrapper and Pagination
          ===========================*/
        s.container = $(container);
        if (s.container.length === 0) return;
        if (s.container.length > 1) {
            s.container.each(function () {
                new Swiper(this, params);
            });
            return;
        }
        
        // Save instance in container HTML Element and in data
        s.container[0].swiper = s;
        s.container.data('swiper', s);
        
        s.classNames.push('swiper-container-' + s.params.direction);
        
        if (s.params.freeMode) {
            s.classNames.push('swiper-container-free-mode');
        }
        if (!s.support.flexbox) {
            s.classNames.push('swiper-container-no-flexbox');
            s.params.slidesPerColumn = 1;
        }
        if (s.params.autoHeight) {
            s.classNames.push('swiper-container-autoheight');
        }
        // Enable slides progress when required
        if (s.params.parallax || s.params.watchSlidesVisibility) {
            s.params.watchSlidesProgress = true;
        }
        // Coverflow / 3D
        if (['cube', 'coverflow'].indexOf(s.params.effect) >= 0) {
            if (s.support.transforms3d) {
                s.params.watchSlidesProgress = true;
                s.classNames.push('swiper-container-3d');
            }
            else {
                s.params.effect = 'slide';
            }
        }
        if (s.params.effect !== 'slide') {
            s.classNames.push('swiper-container-' + s.params.effect);
        }
        if (s.params.effect === 'cube') {
            s.params.resistanceRatio = 0;
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.centeredSlides = false;
            s.params.spaceBetween = 0;
            s.params.virtualTranslate = true;
            s.params.setWrapperSize = false;
        }
        if (s.params.effect === 'fade') {
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.watchSlidesProgress = true;
            s.params.spaceBetween = 0;
            if (typeof initialVirtualTranslate === 'undefined') {
                s.params.virtualTranslate = true;
            }
        }
        
        // Grab Cursor
        if (s.params.grabCursor && s.support.touch) {
            s.params.grabCursor = false;
        }
        
        // Wrapper
        s.wrapper = s.container.children('.' + s.params.wrapperClass);
        
        // Pagination
        if (s.params.pagination) {
            s.paginationContainer = $(s.params.pagination);
            if (s.params.paginationClickable) {
                s.paginationContainer.addClass('swiper-pagination-clickable');
            }
        }
        
        // Is Horizontal
        function isH() {
            return s.params.direction === 'horizontal';
        }
        
        // RTL
        s.rtl = isH() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
        if (s.rtl) {
            s.classNames.push('swiper-container-rtl');
        }
        
        // Wrong RTL support
        if (s.rtl) {
            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
        }
        
        // Columns
        if (s.params.slidesPerColumn > 1) {
            s.classNames.push('swiper-container-multirow');
        }
        
        // Check for Android
        if (s.device.android) {
            s.classNames.push('swiper-container-android');
        }
        
        // Add classes
        s.container.addClass(s.classNames.join(' '));
        
        // Translate
        s.translate = 0;
        
        // Progress
        s.progress = 0;
        
        // Velocity
        s.velocity = 0;
        
        /*=========================
          Locks, unlocks
          ===========================*/
        s.lockSwipeToNext = function () {
            s.params.allowSwipeToNext = false;
        };
        s.lockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = false;
        };
        s.lockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
        };
        s.unlockSwipeToNext = function () {
            s.params.allowSwipeToNext = true;
        };
        s.unlockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = true;
        };
        s.unlockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
        };
        
        /*=========================
          Round helper
          ===========================*/
        function round(a) {
            return Math.floor(a);
        }
        /*=========================
          Set grab cursor
          ===========================*/
        if (s.params.grabCursor) {
            s.container[0].style.cursor = 'move';
            s.container[0].style.cursor = '-webkit-grab';
            s.container[0].style.cursor = '-moz-grab';
            s.container[0].style.cursor = 'grab';
        }
        /*=========================
          Update on Images Ready
          ===========================*/
        s.imagesToLoad = [];
        s.imagesLoaded = 0;
        
        s.loadImage = function (imgElement, src, srcset, checkForComplete, callback) {
            var image;
            function onReady () {
                if (callback) callback();
            }
            if (!imgElement.complete || !checkForComplete) {
                if (src) {
                    image = new window.Image();
                    image.onload = onReady;
                    image.onerror = onReady;
                    if (srcset) {
                        image.srcset = srcset;
                    }
                    if (src) {
                        image.src = src;
                    }
                } else {
                    onReady();
                }
        
            } else {//image already loaded...
                onReady();
            }
        };
        s.preloadImages = function () {
            s.imagesToLoad = s.container.find('img');
            function _onReady() {
                if (typeof s === 'undefined' || s === null) return;
                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
                if (s.imagesLoaded === s.imagesToLoad.length) {
                    if (s.params.updateOnImagesReady) s.update();
                    s.emit('onImagesReady', s);
                }
            }
            for (var i = 0; i < s.imagesToLoad.length; i++) {
                s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), (s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset')), true, _onReady);
            }
        };
        
        /*=========================
          Autoplay
          ===========================*/
        s.autoplayTimeoutId = undefined;
        s.autoplaying = false;
        s.autoplayPaused = false;
        function autoplay() {
            s.autoplayTimeoutId = setTimeout(function () {
                if (s.params.loop) {
                    s.fixLoop();
                    s._slideNext();
                }
                else {
                    if (!s.isEnd) {
                        s._slideNext();
                    }
                    else {
                        if (!params.autoplayStopOnLast) {
                            s._slideTo(0);
                        }
                        else {
                            s.stopAutoplay();
                        }
                    }
                }
            }, s.params.autoplay);
        }
        s.startAutoplay = function () {
            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
            if (!s.params.autoplay) return false;
            if (s.autoplaying) return false;
            s.autoplaying = true;
            s.emit('onAutoplayStart', s);
            autoplay();
        };
        s.stopAutoplay = function (internal) {
            if (!s.autoplayTimeoutId) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplaying = false;
            s.autoplayTimeoutId = undefined;
            s.emit('onAutoplayStop', s);
        };
        s.pauseAutoplay = function (speed) {
            if (s.autoplayPaused) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplayPaused = true;
            if (speed === 0) {
                s.autoplayPaused = false;
                autoplay();
            }
            else {
                s.wrapper.transitionEnd(function () {
                    if (!s) return;
                    s.autoplayPaused = false;
                    if (!s.autoplaying) {
                        s.stopAutoplay();
                    }
                    else {
                        autoplay();
                    }
                });
            }
        };
        /*=========================
          Min/Max Translate
          ===========================*/
        s.minTranslate = function () {
            return (-s.snapGrid[0]);
        };
        s.maxTranslate = function () {
            return (-s.snapGrid[s.snapGrid.length - 1]);
        };
        /*=========================
          Slider/slides sizes
          ===========================*/
        s.updateAutoHeight = function () {
            // Update Height
            var newHeight = s.slides.eq(s.activeIndex)[0].offsetHeight;
            if (newHeight) s.wrapper.css('height', s.slides.eq(s.activeIndex)[0].offsetHeight + 'px');
        };
        s.updateContainerSize = function () {
            var width, height;
            if (typeof s.params.width !== 'undefined') {
                width = s.params.width;
            }
            else {
                width = s.container[0].clientWidth;
            }
            if (typeof s.params.height !== 'undefined') {
                height = s.params.height;
            }
            else {
                height = s.container[0].clientHeight;
            }
            if (width === 0 && isH() || height === 0 && !isH()) {
                return;
            }
        
            //Subtract paddings
            width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
            height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);
        
            // Store values
            s.width = width;
            s.height = height;
            s.size = isH() ? s.width : s.height;
        };
        
        s.updateSlidesSize = function () {
            s.slides = s.wrapper.children('.' + s.params.slideClass);
            s.snapGrid = [];
            s.slidesGrid = [];
            s.slidesSizesGrid = [];
        
            var spaceBetween = s.params.spaceBetween,
                slidePosition = -s.params.slidesOffsetBefore,
                i,
                prevSlideSize = 0,
                index = 0;
            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
            }
        
            s.virtualSize = -spaceBetween;
            // reset margins
            if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
            else s.slides.css({marginRight: '', marginBottom: ''});
        
            var slidesNumberEvenToRows;
            if (s.params.slidesPerColumn > 1) {
                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                    slidesNumberEvenToRows = s.slides.length;
                }
                else {
                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
                }
                if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
                    slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
                }
            }
        
            // Calc slides
            var slideSize;
            var slidesPerColumn = s.params.slidesPerColumn;
            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
            for (i = 0; i < s.slides.length; i++) {
                slideSize = 0;
                var slide = s.slides.eq(i);
                if (s.params.slidesPerColumn > 1) {
                    // Set slides order
                    var newSlideOrderIndex;
                    var column, row;
                    if (s.params.slidesPerColumnFill === 'column') {
                        column = Math.floor(i / slidesPerColumn);
                        row = i - column * slidesPerColumn;
                        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn-1)) {
                            if (++row >= slidesPerColumn) {
                                row = 0;
                                column++;
                            }
                        }
                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                        slide
                            .css({
                                '-webkit-box-ordinal-group': newSlideOrderIndex,
                                '-moz-box-ordinal-group': newSlideOrderIndex,
                                '-ms-flex-order': newSlideOrderIndex,
                                '-webkit-order': newSlideOrderIndex,
                                'order': newSlideOrderIndex
                            });
                    }
                    else {
                        row = Math.floor(i / slidesPerRow);
                        column = i - row * slidesPerRow;
                    }
                    slide
                        .css({
                            'margin-top': (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
                        })
                        .attr('data-swiper-column', column)
                        .attr('data-swiper-row', row);
        
                }
                if (slide.css('display') === 'none') continue;
                if (s.params.slidesPerView === 'auto') {
                    slideSize = isH() ? slide.outerWidth(true) : slide.outerHeight(true);
                    if (s.params.roundLengths) slideSize = round(slideSize);
                }
                else {
                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                    if (s.params.roundLengths) slideSize = round(slideSize);
        
                    if (isH()) {
                        s.slides[i].style.width = slideSize + 'px';
                    }
                    else {
                        s.slides[i].style.height = slideSize + 'px';
                    }
                }
                s.slides[i].swiperSlideSize = slideSize;
                s.slidesSizesGrid.push(slideSize);
        
        
                if (s.params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                }
                else {
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
        
                s.virtualSize += slideSize + spaceBetween;
        
                prevSlideSize = slideSize;
        
                index ++;
            }
            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
            var newSlidesGrid;
        
            if (
                s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
            }
            if (!s.support.flexbox || s.params.setWrapperSize) {
                if (isH()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
            }
        
            if (s.params.slidesPerColumn > 1) {
                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                if (s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
                    }
                    s.snapGrid = newSlidesGrid;
                }
            }
        
            // Remove last grid elements depending on width
            if (!s.params.centeredSlides) {
                newSlidesGrid = [];
                for (i = 0; i < s.snapGrid.length; i++) {
                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
                        newSlidesGrid.push(s.snapGrid[i]);
                    }
                }
                s.snapGrid = newSlidesGrid;
                if (Math.floor(s.virtualSize - s.size) > Math.floor(s.snapGrid[s.snapGrid.length - 1])) {
                    s.snapGrid.push(s.virtualSize - s.size);
                }
            }
            if (s.snapGrid.length === 0) s.snapGrid = [0];
        
            if (s.params.spaceBetween !== 0) {
                if (isH()) {
                    if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
                    else s.slides.css({marginRight: spaceBetween + 'px'});
                }
                else s.slides.css({marginBottom: spaceBetween + 'px'});
            }
            if (s.params.watchSlidesProgress) {
                s.updateSlidesOffset();
            }
        };
        s.updateSlidesOffset = function () {
            for (var i = 0; i < s.slides.length; i++) {
                s.slides[i].swiperSlideOffset = isH() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
            }
        };
        
        /*=========================
          Slider/slides progress
          ===========================*/
        s.updateSlidesProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            if (s.slides.length === 0) return;
            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();
        
            var offsetCenter = -translate;
            if (s.rtl) offsetCenter = translate;
        
            // Visible Slides
            s.slides.removeClass(s.params.slideVisibleClass);
            for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides[i];
                var slideProgress = (offsetCenter - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                if (s.params.watchSlidesVisibility) {
                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
                    var isVisible =
                        (slideBefore >= 0 && slideBefore < s.size) ||
                        (slideAfter > 0 && slideAfter <= s.size) ||
                        (slideBefore <= 0 && slideAfter >= s.size);
                    if (isVisible) {
                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
                    }
                }
                slide.progress = s.rtl ? -slideProgress : slideProgress;
            }
        };
        s.updateProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            var wasBeginning = s.isBeginning;
            var wasEnd = s.isEnd;
            if (translatesDiff === 0) {
                s.progress = 0;
                s.isBeginning = s.isEnd = true;
            }
            else {
                s.progress = (translate - s.minTranslate()) / (translatesDiff);
                s.isBeginning = s.progress <= 0;
                s.isEnd = s.progress >= 1;
            }
            if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
            if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);
        
            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
            s.emit('onProgress', s, s.progress);
        };
        s.updateActiveIndex = function () {
            var translate = s.rtl ? s.translate : -s.translate;
            var newActiveIndex, i, snapIndex;
            for (i = 0; i < s.slidesGrid.length; i ++) {
                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                        newActiveIndex = i;
                    }
                    else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                        newActiveIndex = i + 1;
                    }
                }
                else {
                    if (translate >= s.slidesGrid[i]) {
                        newActiveIndex = i;
                    }
                }
            }
            // Normalize slideIndex
            if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
            // for (i = 0; i < s.slidesGrid.length; i++) {
                // if (- translate >= s.slidesGrid[i]) {
                    // newActiveIndex = i;
                // }
            // }
            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
        
            if (newActiveIndex === s.activeIndex) {
                return;
            }
            s.snapIndex = snapIndex;
            s.previousIndex = s.activeIndex;
            s.activeIndex = newActiveIndex;
            s.updateClasses();
        };
        
        /*=========================
          Classes
          ===========================*/
        s.updateClasses = function () {
            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass);
            var activeSlide = s.slides.eq(s.activeIndex);
            // Active classes
            activeSlide.addClass(s.params.slideActiveClass);
            activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
            activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
        
            // Pagination
            if (s.bullets && s.bullets.length > 0) {
                s.bullets.removeClass(s.params.bulletActiveClass);
                var bulletIndex;
                if (s.params.loop) {
                    bulletIndex = Math.ceil(s.activeIndex - s.loopedSlides)/s.params.slidesPerGroup;
                    if (bulletIndex > s.slides.length - 1 - s.loopedSlides * 2) {
                        bulletIndex = bulletIndex - (s.slides.length - s.loopedSlides * 2);
                    }
                    if (bulletIndex > s.bullets.length - 1) bulletIndex = bulletIndex - s.bullets.length;
                }
                else {
                    if (typeof s.snapIndex !== 'undefined') {
                        bulletIndex = s.snapIndex;
                    }
                    else {
                        bulletIndex = s.activeIndex || 0;
                    }
                }
                if (s.paginationContainer.length > 1) {
                    s.bullets.each(function () {
                        if ($(this).index() === bulletIndex) $(this).addClass(s.params.bulletActiveClass);
                    });
                }
                else {
                    s.bullets.eq(bulletIndex).addClass(s.params.bulletActiveClass);
                }
            }
        
            // Next/active buttons
            if (!s.params.loop) {
                if (s.params.prevButton) {
                    if (s.isBeginning) {
                        $(s.params.prevButton).addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable($(s.params.prevButton));
                    }
                    else {
                        $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable($(s.params.prevButton));
                    }
                }
                if (s.params.nextButton) {
                    if (s.isEnd) {
                        $(s.params.nextButton).addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable($(s.params.nextButton));
                    }
                    else {
                        $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable($(s.params.nextButton));
                    }
                }
            }
        };
        
        /*=========================
          Pagination
          ===========================*/
        s.updatePagination = function () {
            if (!s.params.pagination) return;
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var bulletsHTML = '';
                var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                for (var i = 0; i < numberOfBullets; i++) {
                    if (s.params.paginationBulletRender) {
                        bulletsHTML += s.params.paginationBulletRender(i, s.params.bulletClass);
                    }
                    else {
                        bulletsHTML += '<' + s.params.paginationElement+' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
                    }
                }
                s.paginationContainer.html(bulletsHTML);
                s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
                if (s.params.paginationClickable && s.params.a11y && s.a11y) {
                    s.a11y.initPagination();
                }
            }
        };
        /*=========================
          Common update method
          ===========================*/
        s.update = function (updateTranslate) {
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            s.updatePagination();
            s.updateClasses();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            function forceSetTranslate() {
                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            }
            if (updateTranslate) {
                var translated, newTranslate;
                if (s.controller && s.controller.spline) {
                    s.controller.spline = undefined;
                }
                if (s.params.freeMode) {
                    forceSetTranslate();
                    if (s.params.autoHeight) {
                        s.updateAutoHeight();
                    }
                }
                else {
                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
                    }
                    else {
                        translated = s.slideTo(s.activeIndex, 0, false, true);
                    }
                    if (!translated) {
                        forceSetTranslate();
                    }
                }
            }
            else if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
        };
        
        /*=========================
          Resize Handler
          ===========================*/
        s.onResize = function (forceUpdatePagination) {
            //Breakpoints
            if (s.params.breakpoints) {
                s.setBreakpoint();
            }
        
            // Disable locks on resize
            var allowSwipeToPrev = s.params.allowSwipeToPrev;
            var allowSwipeToNext = s.params.allowSwipeToNext;
            s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
        
            s.updateContainerSize();
            s.updateSlidesSize();
            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            if (s.controller && s.controller.spline) {
                s.controller.spline = undefined;
            }
            if (s.params.freeMode) {
                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
        
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
            }
            else {
                s.updateClasses();
                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                    s.slideTo(s.slides.length - 1, 0, false, true);
                }
                else {
                    s.slideTo(s.activeIndex, 0, false, true);
                }
            }
            // Return locks after resize
            s.params.allowSwipeToPrev = allowSwipeToPrev;
            s.params.allowSwipeToNext = allowSwipeToNext;
        };
        
        /*=========================
          Events
          ===========================*/
        
        //Define Touch Events
        var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
        if (window.navigator.pointerEnabled) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
        else if (window.navigator.msPointerEnabled) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
        s.touchEvents = {
            start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : desktopEvents[0],
            move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : desktopEvents[1],
            end : s.support.touch || !s.params.simulateTouch ? 'touchend' : desktopEvents[2]
        };
        
        
        // WP8 Touch Events Fix
        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
        }
        
        // Attach/detach events
        s.initEvents = function (detach) {
            var actionDom = detach ? 'off' : 'on';
            var action = detach ? 'removeEventListener' : 'addEventListener';
            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
            var target = s.support.touch ? touchEventsTarget : document;
        
            var moveCapture = s.params.nested ? true : false;
        
            //Touch Events
            if (s.browser.ie) {
                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                target[action](s.touchEvents.end, s.onTouchEnd, false);
            }
            else {
                if (s.support.touch) {
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, false);
                }
                if (params.simulateTouch && !s.device.ios && !s.device.android) {
                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
                    document[action]('mousemove', s.onTouchMove, moveCapture);
                    document[action]('mouseup', s.onTouchEnd, false);
                }
            }
            window[action]('resize', s.onResize);
        
            // Next, Prev, Index
            if (s.params.nextButton) {
                $(s.params.nextButton)[actionDom]('click', s.onClickNext);
                if (s.params.a11y && s.a11y) $(s.params.nextButton)[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.prevButton) {
                $(s.params.prevButton)[actionDom]('click', s.onClickPrev);
                if (s.params.a11y && s.a11y) $(s.params.prevButton)[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.pagination && s.params.paginationClickable) {
                $(s.paginationContainer)[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
                if (s.params.a11y && s.a11y) $(s.paginationContainer)[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
            }
        
            // Prevent Links Clicks
            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
        };
        s.attachEvents = function (detach) {
            s.initEvents();
        };
        s.detachEvents = function () {
            s.initEvents(true);
        };
        
        /*=========================
          Handle Clicks
          ===========================*/
        // Prevent Clicks
        s.allowClick = true;
        s.preventClicks = function (e) {
            if (!s.allowClick) {
                if (s.params.preventClicks) e.preventDefault();
                if (s.params.preventClicksPropagation && s.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        };
        // Clicks
        s.onClickNext = function (e) {
            e.preventDefault();
            if (s.isEnd && !s.params.loop) return;
            s.slideNext();
        };
        s.onClickPrev = function (e) {
            e.preventDefault();
            if (s.isBeginning && !s.params.loop) return;
            s.slidePrev();
        };
        s.onClickIndex = function (e) {
            e.preventDefault();
            var index = $(this).index() * s.params.slidesPerGroup;
            if (s.params.loop) index = index + s.loopedSlides;
            s.slideTo(index);
        };
        
        /*=========================
          Handle Touches
          ===========================*/
        function findElementInEvent(e, selector) {
            var el = $(e.target);
            if (!el.is(selector)) {
                if (typeof selector === 'string') {
                    el = el.parents(selector);
                }
                else if (selector.nodeType) {
                    var found;
                    el.parents().each(function (index, _el) {
                        if (_el === selector) found = selector;
                    });
                    if (!found) return undefined;
                    else return selector;
                }
            }
            if (el.length === 0) {
                return undefined;
            }
            return el[0];
        }
        s.updateClickedSlide = function (e) {
            var slide = findElementInEvent(e, '.' + s.params.slideClass);
            var slideFound = false;
            if (slide) {
                for (var i = 0; i < s.slides.length; i++) {
                    if (s.slides[i] === slide) slideFound = true;
                }
            }
        
            if (slide && slideFound) {
                s.clickedSlide = slide;
                s.clickedIndex = $(slide).index();
            }
            else {
                s.clickedSlide = undefined;
                s.clickedIndex = undefined;
                return;
            }
            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                var slideToIndex = s.clickedIndex,
                    realIndex,
                    duplicatedSlides;
                if (s.params.loop) {
                    if (s.animating) return;
                    realIndex = $(s.clickedSlide).attr('data-swiper-slide-index');
                    if (s.params.centeredSlides) {
                        if ((slideToIndex < s.loopedSlides - s.params.slidesPerView/2) || (slideToIndex > s.slides.length - s.loopedSlides + s.params.slidesPerView/2)) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.swiper-slide-duplicate)').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                    else {
                        if (slideToIndex > s.slides.length - s.params.slidesPerView) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.swiper-slide-duplicate)').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                }
                else {
                    s.slideTo(slideToIndex);
                }
            }
        };
        
        var isTouched,
            isMoved,
            allowTouchCallbacks,
            touchStartTime,
            isScrolling,
            currentTranslate,
            startTranslate,
            allowThresholdMove,
            // Form elements to match
            formElements = 'input, select, textarea, button',
            // Last click time
            lastClickTime = Date.now(), clickTimeout,
            //Velocities
            velocities = [],
            allowMomentumBounce;
        
        // Animating Flag
        s.animating = false;
        
        // Touches information
        s.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        };
        
        // Touch handlers
        var isTouchEvent, startMoving;
        s.onTouchStart = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            isTouchEvent = e.type === 'touchstart';
            if (!isTouchEvent && 'which' in e && e.which === 3) return;
            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
                s.allowClick = true;
                return;
            }
            if (s.params.swipeHandler) {
                if (!findElementInEvent(e, s.params.swipeHandler)) return;
            }
        
            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        
            // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
            if(s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
                return;
            }
        
            isTouched = true;
            isMoved = false;
            allowTouchCallbacks = true;
            isScrolling = undefined;
            startMoving = undefined;
            s.touches.startX = startX;
            s.touches.startY = startY;
            touchStartTime = Date.now();
            s.allowClick = true;
            s.updateContainerSize();
            s.swipeDirection = undefined;
            if (s.params.threshold > 0) allowThresholdMove = false;
            if (e.type !== 'touchstart') {
                var preventDefault = true;
                if ($(e.target).is(formElements)) preventDefault = false;
                if (document.activeElement && $(document.activeElement).is(formElements)) {
                    document.activeElement.blur();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
            }
            s.emit('onTouchStart', s, e);
        };
        
        s.onTouchMove = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (isTouchEvent && e.type === 'mousemove') return;
            if (e.preventedByNestedSwiper) return;
            if (s.params.onlyExternal) {
                // isMoved = true;
                s.allowClick = false;
                if (isTouched) {
                    s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = Date.now();
                }
                return;
            }
            if (isTouchEvent && document.activeElement) {
                if (e.target === document.activeElement && $(e.target).is(formElements)) {
                    isMoved = true;
                    s.allowClick = false;
                    return;
                }
            }
            if (allowTouchCallbacks) {
                s.emit('onTouchMove', s, e);
            }
            if (e.targetTouches && e.targetTouches.length > 1) return;
        
            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
            if (typeof isScrolling === 'undefined') {
                var touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                isScrolling = isH() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
            }
            if (isScrolling) {
                s.emit('onTouchMoveOpposite', s, e);
            }
            if (typeof startMoving === 'undefined' && s.browser.ieTouch) {
                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                    startMoving = true;
                }
            }
            if (!isTouched) return;
            if (isScrolling)  {
                isTouched = false;
                return;
            }
            if (!startMoving && s.browser.ieTouch) {
                return;
            }
            s.allowClick = false;
            s.emit('onSliderMove', s, e);
            e.preventDefault();
            if (s.params.touchMoveStopPropagation && !s.params.nested) {
                e.stopPropagation();
            }
        
            if (!isMoved) {
                if (params.loop) {
                    s.fixLoop();
                }
                startTranslate = s.getWrapperTranslate();
                s.setWrapperTransition(0);
                if (s.animating) {
                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
                }
                if (s.params.autoplay && s.autoplaying) {
                    if (s.params.autoplayDisableOnInteraction) {
                        s.stopAutoplay();
                    }
                    else {
                        s.pauseAutoplay();
                    }
                }
                allowMomentumBounce = false;
                //Grab Cursor
                if (s.params.grabCursor) {
                    s.container[0].style.cursor = 'move';
                    s.container[0].style.cursor = '-webkit-grabbing';
                    s.container[0].style.cursor = '-moz-grabbin';
                    s.container[0].style.cursor = 'grabbing';
                }
            }
            isMoved = true;
        
            var diff = s.touches.diff = isH() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
        
            diff = diff * s.params.touchRatio;
            if (s.rtl) diff = -diff;
        
            s.swipeDirection = diff > 0 ? 'prev' : 'next';
            currentTranslate = diff + startTranslate;
        
            var disableParentSwiper = true;
            if ((diff > 0 && currentTranslate > s.minTranslate())) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
            }
            else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
            }
        
            if (disableParentSwiper) {
                e.preventedByNestedSwiper = true;
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
                currentTranslate = startTranslate;
            }
            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
                currentTranslate = startTranslate;
            }
        
            if (!s.params.followFinger) return;
        
            // Threshold
            if (s.params.threshold > 0) {
                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                    if (!allowThresholdMove) {
                        allowThresholdMove = true;
                        s.touches.startX = s.touches.currentX;
                        s.touches.startY = s.touches.currentY;
                        currentTranslate = startTranslate;
                        s.touches.diff = isH() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                        return;
                    }
                }
                else {
                    currentTranslate = startTranslate;
                    return;
                }
            }
            // Update active index in free mode
            if (s.params.freeMode || s.params.watchSlidesProgress) {
                s.updateActiveIndex();
            }
            if (s.params.freeMode) {
                //Velocity
                if (velocities.length === 0) {
                    velocities.push({
                        position: s.touches[isH() ? 'startX' : 'startY'],
                        time: touchStartTime
                    });
                }
                velocities.push({
                    position: s.touches[isH() ? 'currentX' : 'currentY'],
                    time: (new window.Date()).getTime()
                });
            }
            // Update progress
            s.updateProgress(currentTranslate);
            // Update translate
            s.setWrapperTranslate(currentTranslate);
        };
        s.onTouchEnd = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (allowTouchCallbacks) {
                s.emit('onTouchEnd', s, e);
            }
            allowTouchCallbacks = false;
            if (!isTouched) return;
            //Return Grab Cursor
            if (s.params.grabCursor && isMoved && isTouched) {
                s.container[0].style.cursor = 'move';
                s.container[0].style.cursor = '-webkit-grab';
                s.container[0].style.cursor = '-moz-grab';
                s.container[0].style.cursor = 'grab';
            }
        
            // Time diff
            var touchEndTime = Date.now();
            var timeDiff = touchEndTime - touchStartTime;
        
            // Tap, doubleTap, Click
            if (s.allowClick) {
                s.updateClickedSlide(e);
                s.emit('onTap', s, e);
                if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(function () {
                        if (!s) return;
                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                        }
                        s.emit('onClick', s, e);
                    }, 300);
        
                }
                if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    s.emit('onDoubleTap', s, e);
                }
            }
        
            lastClickTime = Date.now();
            setTimeout(function () {
                if (s) s.allowClick = true;
            }, 0);
        
            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;
        
            var currentPos;
            if (s.params.followFinger) {
                currentPos = s.rtl ? s.translate : -s.translate;
            }
            else {
                currentPos = -currentTranslate;
            }
            if (s.params.freeMode) {
                if (currentPos < -s.minTranslate()) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                else if (currentPos > -s.maxTranslate()) {
                    if (s.slides.length < s.snapGrid.length) {
                        s.slideTo(s.snapGrid.length - 1);
                    }
                    else {
                        s.slideTo(s.slides.length - 1);
                    }
                    return;
                }
        
                if (s.params.freeModeMomentum) {
                    if (velocities.length > 1) {
                        var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();
        
                        var distance = lastMoveEvent.position - velocityEvent.position;
                        var time = lastMoveEvent.time - velocityEvent.time;
                        s.velocity = distance / time;
                        s.velocity = s.velocity / 2;
                        if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
                            s.velocity = 0;
                        }
                        // this implies that the user stopped moving a finger then released.
                        // There would be no events with distance zero, so the last event is stale.
                        if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
                            s.velocity = 0;
                        }
                    } else {
                        s.velocity = 0;
                    }
        
                    velocities.length = 0;
                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
                    var momentumDistance = s.velocity * momentumDuration;
        
                    var newPosition = s.translate + momentumDistance;
                    if (s.rtl) newPosition = - newPosition;
                    var doBounce = false;
                    var afterBouncePosition;
                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                    if (newPosition < s.maxTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition + s.maxTranslate() < -bounceAmount) {
                                newPosition = s.maxTranslate() - bounceAmount;
                            }
                            afterBouncePosition = s.maxTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.maxTranslate();
                        }
                    }
                    else if (newPosition > s.minTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition - s.minTranslate() > bounceAmount) {
                                newPosition = s.minTranslate() + bounceAmount;
                            }
                            afterBouncePosition = s.minTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.minTranslate();
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        var j = 0,
                            nextSlide;
                        for (j = 0; j < s.snapGrid.length; j += 1) {
                            if (s.snapGrid[j] > -newPosition) {
                                nextSlide = j;
                                break;
                            }
        
                        }
                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
                            newPosition = s.snapGrid[nextSlide];
                        } else {
                            newPosition = s.snapGrid[nextSlide - 1];
                        }
                        if (!s.rtl) newPosition = - newPosition;
                    }
                    //Fix duration
                    if (s.velocity !== 0) {
                        if (s.rtl) {
                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
                        }
                        else {
                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        s.slideReset();
                        return;
                    }
        
                    if (s.params.freeModeMomentumBounce && doBounce) {
                        s.updateProgress(afterBouncePosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        s.animating = true;
                        s.wrapper.transitionEnd(function () {
                            if (!s || !allowMomentumBounce) return;
                            s.emit('onMomentumBounce', s);
        
                            s.setWrapperTransition(s.params.speed);
                            s.setWrapperTranslate(afterBouncePosition);
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        });
                    } else if (s.velocity) {
                        s.updateProgress(newPosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        if (!s.animating) {
                            s.animating = true;
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        }
        
                    } else {
                        s.updateProgress(newPosition);
                    }
        
                    s.updateActiveIndex();
                }
                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                    s.updateProgress();
                    s.updateActiveIndex();
                }
                return;
            }
        
            // Find current slide
            var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
                    }
                }
                else {
                    if (currentPos >= s.slidesGrid[i]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
                    }
                }
            }
        
            // Find current slide size
            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
        
            if (timeDiff > s.params.longSwipesMs) {
                // Long touches
                if (!s.params.longSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
        
                }
                if (s.swipeDirection === 'prev') {
                    if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
                }
            }
            else {
                // Short swipes
                if (!s.params.shortSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    s.slideTo(stopIndex + s.params.slidesPerGroup);
        
                }
                if (s.swipeDirection === 'prev') {
                    s.slideTo(stopIndex);
                }
            }
        };
        /*=========================
          Transitions
          ===========================*/
        s._slideTo = function (slideIndex, speed) {
            return s.slideTo(slideIndex, speed, true, true);
        };
        s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (typeof slideIndex === 'undefined') slideIndex = 0;
            if (slideIndex < 0) slideIndex = 0;
            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
        
            var translate = - s.snapGrid[s.snapIndex];
            // Stop autoplay
            if (s.params.autoplay && s.autoplaying) {
                if (internal || !s.params.autoplayDisableOnInteraction) {
                    s.pauseAutoplay(speed);
                }
                else {
                    s.stopAutoplay();
                }
            }
            // Update progress
            s.updateProgress(translate);
        
            // Normalize slideIndex
            for (var i = 0; i < s.slidesGrid.length; i++) {
                if (- Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
                    slideIndex = i;
                }
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                if ((s.activeIndex || 0) !== slideIndex ) return false;
            }
        
            // Update Index
            if (typeof speed === 'undefined') speed = s.params.speed;
            s.previousIndex = s.activeIndex || 0;
            s.activeIndex = slideIndex;
        
            if ((s.rtl && -translate === s.translate) || (!s.rtl && translate === s.translate)) {
                // Update Height
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
                s.updateClasses();
                if (s.params.effect !== 'slide') {
                    s.setWrapperTranslate(translate);
                }
                return false;
            }
            s.updateClasses();
            s.onTransitionStart(runCallbacks);
        
            if (speed === 0) {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(0);
                s.onTransitionEnd(runCallbacks);
            }
            else {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(speed);
                if (!s.animating) {
                    s.animating = true;
                    s.wrapper.transitionEnd(function () {
                        if (!s) return;
                        s.onTransitionEnd(runCallbacks);
                    });
                }
        
            }
        
            return true;
        };
        
        s.onTransitionStart = function (runCallbacks) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
            if (s.lazy) s.lazy.onTransitionStart();
            if (runCallbacks) {
                s.emit('onTransitionStart', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeStart', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextStart', s);
                    }
                    else {
                        s.emit('onSlidePrevStart', s);
                    }
                }
        
            }
        };
        s.onTransitionEnd = function (runCallbacks) {
            s.animating = false;
            s.setWrapperTransition(0);
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.lazy) s.lazy.onTransitionEnd();
            if (runCallbacks) {
                s.emit('onTransitionEnd', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeEnd', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextEnd', s);
                    }
                    else {
                        s.emit('onSlidePrevEnd', s);
                    }
                }
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.setHash();
            }
        
        };
        s.slideNext = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
        };
        s._slideNext = function (speed) {
            return s.slideNext(true, speed, true);
        };
        s.slidePrev = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
        };
        s._slidePrev = function (speed) {
            return s.slidePrev(true, speed, true);
        };
        s.slideReset = function (runCallbacks, speed, internal) {
            return s.slideTo(s.activeIndex, speed, runCallbacks);
        };
        
        /*=========================
          Translate/transition helpers
          ===========================*/
        s.setWrapperTransition = function (duration, byController) {
            s.wrapper.transition(duration);
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTransition(duration);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTransition(duration);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTransition(duration);
            }
            if (s.params.control && s.controller) {
                s.controller.setTransition(duration, byController);
            }
            s.emit('onSetTransition', s, duration);
        };
        s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
            var x = 0, y = 0, z = 0;
            if (isH()) {
                x = s.rtl ? -translate : translate;
            }
            else {
                y = translate;
            }
        
            if (s.params.roundLengths) {
                x = round(x);
                y = round(y);
            }
        
            if (!s.params.virtualTranslate) {
                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
                else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
            }
        
            s.translate = isH() ? x : y;
        
            // Check if we need to update progress
            var progress;
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            if (translatesDiff === 0) {
                progress = 0;
            }
            else {
                progress = (translate - s.minTranslate()) / (translatesDiff);
            }
            if (progress !== s.progress) {
                s.updateProgress(translate);
            }
        
            if (updateActiveIndex) s.updateActiveIndex();
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTranslate(s.translate);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTranslate(s.translate);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTranslate(s.translate);
            }
            if (s.params.control && s.controller) {
                s.controller.setTranslate(s.translate, byController);
            }
            s.emit('onSetTranslate', s, s.translate);
        };
        
        s.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;
        
            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }
        
            if (s.params.virtualTranslate) {
                return s.rtl ? -s.translate : s.translate;
            }
        
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function(a){
                        return a.replace(',','.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
        
            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[5]);
            }
            if (s.rtl && curTransform) curTransform = -curTransform;
            return curTransform || 0;
        };
        s.getWrapperTranslate = function (axis) {
            if (typeof axis === 'undefined') {
                axis = isH() ? 'x' : 'y';
            }
            return s.getTranslate(s.wrapper[0], axis);
        };
        
        /*=========================
          Observer
          ===========================*/
        s.observers = [];
        function initObserver(target, options) {
            options = options || {};
            // create an observer instance
            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            var observer = new ObserverFunc(function (mutations) {
                mutations.forEach(function (mutation) {
                    s.onResize(true);
                    s.emit('onObserverUpdate', s, mutation);
                });
            });
        
            observer.observe(target, {
                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                childList: typeof options.childList === 'undefined' ? true : options.childList,
                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
            });
        
            s.observers.push(observer);
        }
        s.initObservers = function () {
            if (s.params.observeParents) {
                var containerParents = s.container.parents();
                for (var i = 0; i < containerParents.length; i++) {
                    initObserver(containerParents[i]);
                }
            }
        
            // Observe container
            initObserver(s.container[0], {childList: false});
        
            // Observe wrapper
            initObserver(s.wrapper[0], {attributes: false});
        };
        s.disconnectObservers = function () {
            for (var i = 0; i < s.observers.length; i++) {
                s.observers[i].disconnect();
            }
            s.observers = [];
        };
        /*=========================
          Loop
          ===========================*/
        // Create looped slides
        s.createLoop = function () {
            // Remove duplicated slides
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
        
            var slides = s.wrapper.children('.' + s.params.slideClass);
        
            if(s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;
        
            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
            if (s.loopedSlides > slides.length) {
                s.loopedSlides = slides.length;
            }
        
            var prependSlides = [], appendSlides = [], i;
            slides.each(function (index, el) {
                var slide = $(this);
                if (index < s.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
                slide.attr('data-swiper-slide-index', index);
            });
            for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
        };
        s.destroyLoop = function () {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            s.slides.removeAttr('data-swiper-slide-index');
        };
        s.fixLoop = function () {
            var newIndex;
            //Fix For Negative Oversliding
            if (s.activeIndex < s.loopedSlides) {
                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
            //Fix For Positive Oversliding
            else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
                newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
        };
        /*=========================
          Append/Prepend/Remove Slides
          ===========================*/
        s.appendSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.append(slides[i]);
                }
            }
            else {
                s.wrapper.append(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
        };
        s.prependSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            var newActiveIndex = s.activeIndex + 1;
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.prepend(slides[i]);
                }
                newActiveIndex = s.activeIndex + slides.length;
            }
            else {
                s.wrapper.prepend(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            s.slideTo(newActiveIndex, 0, false);
        };
        s.removeSlide = function (slidesIndexes) {
            if (s.params.loop) {
                s.destroyLoop();
                s.slides = s.wrapper.children('.' + s.params.slideClass);
            }
            var newActiveIndex = s.activeIndex,
                indexToRemove;
            if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
                for (var i = 0; i < slidesIndexes.length; i++) {
                    indexToRemove = slidesIndexes[i];
                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex) newActiveIndex--;
                }
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
            else {
                indexToRemove = slidesIndexes;
                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                if (indexToRemove < newActiveIndex) newActiveIndex--;
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
        
            if (s.params.loop) {
                s.createLoop();
            }
        
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            if (s.params.loop) {
                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
            }
            else {
                s.slideTo(newActiveIndex, 0, false);
            }
        
        };
        s.removeAllSlides = function () {
            var slidesIndexes = [];
            for (var i = 0; i < s.slides.length; i++) {
                slidesIndexes.push(i);
            }
            s.removeSlide(slidesIndexes);
        };
        
    
        /*=========================
          Effects
          ===========================*/
        s.effects = {
            fade: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var offset = slide[0].swiperSlideOffset;
                        var tx = -offset;
                        if (!s.params.virtualTranslate) tx = tx - s.translate;
                        var ty = 0;
                        if (!isH()) {
                            ty = tx;
                            tx = 0;
                        }
                        var slideOpacity = s.params.fade.crossFade ?
                                Math.max(1 - Math.abs(slide[0].progress), 0) :
                                1 + Math.min(Math.max(slide[0].progress, -1), 0);
                        slide
                            .css({
                                opacity: slideOpacity
                            })
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
        
                    }
        
                },
                setTransition: function (duration) {
                    s.slides.transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            cube: {
                setTranslate: function () {
                    var wrapperRotate = 0, cubeShadow;
                    if (s.params.cube.shadow) {
                        if (isH()) {
                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.wrapper.append(cubeShadow);
                            }
                            cubeShadow.css({height: s.width + 'px'});
                        }
                        else {
                            cubeShadow = s.container.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.container.append(cubeShadow);
                            }
                        }
                    }
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var slideAngle = i * 90;
                        var round = Math.floor(slideAngle / 360);
                        if (s.rtl) {
                            slideAngle = -slideAngle;
                            round = Math.floor(-slideAngle / 360);
                        }
                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        var tx = 0, ty = 0, tz = 0;
                        if (i % 4 === 0) {
                            tx = - round * 4 * s.size;
                            tz = 0;
                        }
                        else if ((i - 1) % 4 === 0) {
                            tx = 0;
                            tz = - round * 4 * s.size;
                        }
                        else if ((i - 2) % 4 === 0) {
                            tx = s.size + round * 4 * s.size;
                            tz = s.size;
                        }
                        else if ((i - 3) % 4 === 0) {
                            tx = - s.size;
                            tz = 3 * s.size + s.size * 4 * round;
                        }
                        if (s.rtl) {
                            tx = -tx;
                        }
        
                        if (!isH()) {
                            ty = tx;
                            tx = 0;
                        }
        
                        var transform = 'rotateX(' + (isH() ? 0 : -slideAngle) + 'deg) rotateY(' + (isH() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
                        if (progress <= 1 && progress > -1) {
                            wrapperRotate = i * 90 + progress * 90;
                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
                        }
                        slide.transform(transform);
                        if (s.params.cube.slideShadows) {
                            //Set shadows
                            var shadowBefore = isH() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = isH() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (isH() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (isH() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            var shadowOpacity = slide[0].progress;
                            if (shadowBefore.length) shadowBefore[0].style.opacity = -slide[0].progress;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = slide[0].progress;
                        }
                    }
                    s.wrapper.css({
                        '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
                    });
        
                    if (s.params.cube.shadow) {
                        if (isH()) {
                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
                        }
                        else {
                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                            var scale1 = s.params.cube.shadowScale,
                                scale2 = s.params.cube.shadowScale / multiplier,
                                offset = s.params.cube.shadowOffset;
                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
                        }
                    }
                    var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (isH() ? 0 : wrapperRotate) + 'deg) rotateY(' + (isH() ? -wrapperRotate : 0) + 'deg)');
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.cube.shadow && !isH()) {
                        s.container.find('.swiper-cube-shadow').transition(duration);
                    }
                }
            },
            coverflow: {
                setTranslate: function () {
                    var transform = s.translate;
                    var center = isH() ? -transform + s.width / 2 : -transform + s.height / 2;
                    var rotate = isH() ? s.params.coverflow.rotate: -s.params.coverflow.rotate;
                    var translate = s.params.coverflow.depth;
                    //Each slide offset from center
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideSize = s.slidesSizesGrid[i];
                        var slideOffset = slide[0].swiperSlideOffset;
                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
        
                        var rotateY = isH() ? rotate * offsetMultiplier : 0;
                        var rotateX = isH() ? 0 : rotate * offsetMultiplier;
                        // var rotateZ = 0
                        var translateZ = -translate * Math.abs(offsetMultiplier);
        
                        var translateY = isH() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
                        var translateX = isH() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
        
                        //Fix for ultra small values
                        if (Math.abs(translateX) < 0.001) translateX = 0;
                        if (Math.abs(translateY) < 0.001) translateY = 0;
                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
                        if (Math.abs(rotateX) < 0.001) rotateX = 0;
        
                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        
                        slide.transform(slideTransform);
                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                        if (s.params.coverflow.slideShadows) {
                            //Set shadows
                            var shadowBefore = isH() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = isH() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (isH() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (isH() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
                        }
                    }
        
                    //Set correct perspective for IE10
                    if (s.browser.ie) {
                        var ws = s.wrapper[0].style;
                        ws.perspectiveOrigin = center + 'px 50%';
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                }
            }
        };
    
        /*=========================
          Images Lazy Loading
          ===========================*/
        s.lazy = {
            initialImageLoaded: false,
            loadImageInSlide: function (index, loadInDuplicate) {
                if (typeof index === 'undefined') return;
                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
                if (s.slides.length === 0) return;
        
                var slide = s.slides.eq(index);
                var img = slide.find('.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)');
                if (slide.hasClass('swiper-lazy') && !slide.hasClass('swiper-lazy-loaded') && !slide.hasClass('swiper-lazy-loading')) {
                    img = img.add(slide[0]);
                }
                if (img.length === 0) return;
        
                img.each(function () {
                    var _img = $(this);
                    _img.addClass('swiper-lazy-loading');
                    var background = _img.attr('data-background');
                    var src = _img.attr('data-src'),
                        srcset = _img.attr('data-srcset');
                    s.loadImage(_img[0], (src || background), srcset, false, function () {
                        if (background) {
                            _img.css('background-image', 'url(' + background + ')');
                            _img.removeAttr('data-background');
                        }
                        else {
                            if (srcset) {
                                _img.attr('srcset', srcset);
                                _img.removeAttr('data-srcset');
                            }
                            if (src) {
                                _img.attr('src', src);
                                _img.removeAttr('data-src');
                            }
        
                        }
        
                        _img.addClass('swiper-lazy-loaded').removeClass('swiper-lazy-loading');
                        slide.find('.swiper-lazy-preloader, .preloader').remove();
                        if (s.params.loop && loadInDuplicate) {
                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                            if (slide.hasClass(s.params.slideDuplicateClass)) {
                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                                s.lazy.loadImageInSlide(originalSlide.index(), false);
                            }
                            else {
                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                            }
                        }
                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
                    });
        
                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
                });
        
            },
            load: function () {
                var i;
                if (s.params.watchSlidesVisibility) {
                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
                        s.lazy.loadImageInSlide($(this).index());
                    });
                }
                else {
                    if (s.params.slidesPerView > 1) {
                        for (i = s.activeIndex; i < s.activeIndex + s.params.slidesPerView ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        s.lazy.loadImageInSlide(s.activeIndex);
                    }
                }
                if (s.params.lazyLoadingInPrevNext) {
                    if (s.params.slidesPerView > 1) {
                        // Next Slides
                        for (i = s.activeIndex + s.params.slidesPerView; i < s.activeIndex + s.params.slidesPerView + s.params.slidesPerView; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                        // Prev Slides
                        for (i = s.activeIndex - s.params.slidesPerView; i < s.activeIndex ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
        
                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
                    }
                }
            },
            onTransitionStart: function () {
                if (s.params.lazyLoading) {
                    if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
                        s.lazy.load();
                    }
                }
            },
            onTransitionEnd: function () {
                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                    s.lazy.load();
                }
            }
        };
        
    
        /*=========================
          Scrollbar
          ===========================*/
        s.scrollbar = {
            isTouched: false,
            setDragPosition: function (e) {
                var sb = s.scrollbar;
                var x = 0, y = 0;
                var translate;
                var pointerPosition = isH() ?
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX) :
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY) ;
                var position = (pointerPosition) - sb.track.offset()[isH() ? 'left' : 'top'] - sb.dragSize / 2;
                var positionMin = -s.minTranslate() * sb.moveDivider;
                var positionMax = -s.maxTranslate() * sb.moveDivider;
                if (position < positionMin) {
                    position = positionMin;
                }
                else if (position > positionMax) {
                    position = positionMax;
                }
                position = -position / sb.moveDivider;
                s.updateProgress(position);
                s.setWrapperTranslate(position, true);
            },
            dragStart: function (e) {
                var sb = s.scrollbar;
                sb.isTouched = true;
                e.preventDefault();
                e.stopPropagation();
        
                sb.setDragPosition(e);
                clearTimeout(sb.dragTimeout);
        
                sb.track.transition(0);
                if (s.params.scrollbarHide) {
                    sb.track.css('opacity', 1);
                }
                s.wrapper.transition(100);
                sb.drag.transition(100);
                s.emit('onScrollbarDragStart', s);
            },
            dragMove: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                if (e.preventDefault) e.preventDefault();
                else e.returnValue = false;
                sb.setDragPosition(e);
                s.wrapper.transition(0);
                sb.track.transition(0);
                sb.drag.transition(0);
                s.emit('onScrollbarDragMove', s);
            },
            dragEnd: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                sb.isTouched = false;
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.dragTimeout);
                    sb.dragTimeout = setTimeout(function () {
                        sb.track.css('opacity', 0);
                        sb.track.transition(400);
                    }, 1000);
        
                }
                s.emit('onScrollbarDragEnd', s);
                if (s.params.scrollbarSnapOnRelease) {
                    s.slideReset();
                }
            },
            enableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).on(s.touchEvents.start, sb.dragStart);
                $(target).on(s.touchEvents.move, sb.dragMove);
                $(target).on(s.touchEvents.end, sb.dragEnd);
            },
            disableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).off(s.touchEvents.start, sb.dragStart);
                $(target).off(s.touchEvents.move, sb.dragMove);
                $(target).off(s.touchEvents.end, sb.dragEnd);
            },
            set: function () {
                if (!s.params.scrollbar) return;
                var sb = s.scrollbar;
                sb.track = $(s.params.scrollbar);
                sb.drag = sb.track.find('.swiper-scrollbar-drag');
                if (sb.drag.length === 0) {
                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                    sb.track.append(sb.drag);
                }
                sb.drag[0].style.width = '';
                sb.drag[0].style.height = '';
                sb.trackSize = isH() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
        
                sb.divider = s.size / s.virtualSize;
                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
                sb.dragSize = sb.trackSize * sb.divider;
        
                if (isH()) {
                    sb.drag[0].style.width = sb.dragSize + 'px';
                }
                else {
                    sb.drag[0].style.height = sb.dragSize + 'px';
                }
        
                if (sb.divider >= 1) {
                    sb.track[0].style.display = 'none';
                }
                else {
                    sb.track[0].style.display = '';
                }
                if (s.params.scrollbarHide) {
                    sb.track[0].style.opacity = 0;
                }
            },
            setTranslate: function () {
                if (!s.params.scrollbar) return;
                var diff;
                var sb = s.scrollbar;
                var translate = s.translate || 0;
                var newPos;
        
                var newSize = sb.dragSize;
                newPos = (sb.trackSize - sb.dragSize) * s.progress;
                if (s.rtl && isH()) {
                    newPos = -newPos;
                    if (newPos > 0) {
                        newSize = sb.dragSize - newPos;
                        newPos = 0;
                    }
                    else if (-newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize + newPos;
                    }
                }
                else {
                    if (newPos < 0) {
                        newSize = sb.dragSize + newPos;
                        newPos = 0;
                    }
                    else if (newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize - newPos;
                    }
                }
                if (isH()) {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
                    }
                    else {
                        sb.drag.transform('translateX(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.width = newSize + 'px';
                }
                else {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
                    }
                    else {
                        sb.drag.transform('translateY(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.height = newSize + 'px';
                }
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.timeout);
                    sb.track[0].style.opacity = 1;
                    sb.timeout = setTimeout(function () {
                        sb.track[0].style.opacity = 0;
                        sb.track.transition(400);
                    }, 1000);
                }
            },
            setTransition: function (duration) {
                if (!s.params.scrollbar) return;
                s.scrollbar.drag.transition(duration);
            }
        };
    
        /*=========================
          Controller
          ===========================*/
        s.controller = {
            LinearSpline: function (x, y) {
                this.x = x;
                this.y = y;
                this.lastIndex = x.length - 1;
                // Given an x value (x2), return the expected y2 value:
                // (x1,y1) is the known point before given value,
                // (x3,y3) is the known point after given value.
                var i1, i3;
                var l = this.x.length;
        
                this.interpolate = function (x2) {
                    if (!x2) return 0;
        
                    // Get the indexes of x1 and x3 (the array indexes before and after given x2):
                    i3 = binarySearch(this.x, x2);
                    i1 = i3 - 1;
        
                    // We have our indexes i1 & i3, so we can calculate already:
                    // y2 := ((x2âˆ’x1) Ã— (y3âˆ’y1)) Ã· (x3âˆ’x1) + y1
                    return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
                };
        
                var binarySearch = (function() {
                    var maxIndex, minIndex, guess;
                    return function(array, val) {
                        minIndex = -1;
                        maxIndex = array.length;
                        while (maxIndex - minIndex > 1)
                            if (array[guess = maxIndex + minIndex >> 1] <= val) {
                                minIndex = guess;
                            } else {
                                maxIndex = guess;
                            }
                        return maxIndex;
                    };
                })();
            },
            //xxx: for now i will just save one spline function to to
            getInterpolateFunction: function(c){
                if(!s.controller.spline) s.controller.spline = s.params.loop ?
                    new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) :
                    new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
            },
            setTranslate: function (translate, byController) {
               var controlled = s.params.control;
               var multiplier, controlledTranslate;
               function setControlledTranslate(c) {
                    // this will create an Interpolate function based on the snapGrids
                    // x is the Grid of the scrolled scroller and y will be the controlled scroller
                    // it makes sense to create this only once and recall it for the interpolation
                    // the function does a lot of value caching for performance
                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
                    if (s.params.controlBy === 'slide') {
                        s.controller.getInterpolateFunction(c);
                        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
                        // but it did not work out
                        controlledTranslate = -s.controller.spline.interpolate(-translate);
                    }
        
                    if(!controlledTranslate || s.params.controlBy === 'container'){
                        multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
                        controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
                    }
        
                    if (s.params.controlInverse) {
                        controlledTranslate = c.maxTranslate() - controlledTranslate;
                    }
                    c.updateProgress(controlledTranslate);
                    c.setWrapperTranslate(controlledTranslate, false, s);
                    c.updateActiveIndex();
               }
               if (s.isArray(controlled)) {
                   for (var i = 0; i < controlled.length; i++) {
                       if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                           setControlledTranslate(controlled[i]);
                       }
                   }
               }
               else if (controlled instanceof Swiper && byController !== controlled) {
        
                   setControlledTranslate(controlled);
               }
            },
            setTransition: function (duration, byController) {
                var controlled = s.params.control;
                var i;
                function setControlledTransition(c) {
                    c.setWrapperTransition(duration, s);
                    if (duration !== 0) {
                        c.onTransitionStart();
                        c.wrapper.transitionEnd(function(){
                            if (!controlled) return;
                            if (c.params.loop && s.params.controlBy === 'slide') {
                                c.fixLoop();
                            }
                            c.onTransitionEnd();
        
                        });
                    }
                }
                if (s.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTransition(controlled[i]);
                        }
                    }
                }
                else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTransition(controlled);
                }
            }
        };
    
        /*=========================
          Parallax
          ===========================*/
        function setParallaxTransform(el, progress) {
            el = $(el);
            var p, pX, pY;
            var rtlFactor = s.rtl ? -1 : 1;
        
            p = el.attr('data-swiper-parallax') || '0';
            pX = el.attr('data-swiper-parallax-x');
            pY = el.attr('data-swiper-parallax-y');
            if (pX || pY) {
                pX = pX || '0';
                pY = pY || '0';
            }
            else {
                if (isH()) {
                    pX = p;
                    pY = '0';
                }
                else {
                    pY = p;
                    pX = '0';
                }
            }
        
            if ((pX).indexOf('%') >= 0) {
                pX = parseInt(pX, 10) * progress * rtlFactor + '%';
            }
            else {
                pX = pX * progress * rtlFactor + 'px' ;
            }
            if ((pY).indexOf('%') >= 0) {
                pY = parseInt(pY, 10) * progress + '%';
            }
            else {
                pY = pY * progress + 'px' ;
            }
        
            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
        }
        s.parallax = {
            setTranslate: function () {
                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    setParallaxTransform(this, s.progress);
        
                });
                s.slides.each(function () {
                    var slide = $(this);
                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                        setParallaxTransform(this, progress);
                    });
                });
            },
            setTransition: function (duration) {
                if (typeof duration === 'undefined') duration = s.params.speed;
                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    var el = $(this);
                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
                    if (duration === 0) parallaxDuration = 0;
                    el.transition(parallaxDuration);
                });
            }
        };
        
    
        /*=========================
          Plugins API. Collect all and init all plugins
          ===========================*/
        s._plugins = [];
        for (var plugin in s.plugins) {
            var p = s.plugins[plugin](s, s.params[plugin]);
            if (p) s._plugins.push(p);
        }
        // Method to call all plugins event/method
        s.callPlugins = function (eventName) {
            for (var i = 0; i < s._plugins.length; i++) {
                if (eventName in s._plugins[i]) {
                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };
    
        /*=========================
          Events/Callbacks/Plugins Emitter
          ===========================*/
        function normalizeEventName (eventName) {
            if (eventName.indexOf('on') !== 0) {
                if (eventName[0] !== eventName[0].toUpperCase()) {
                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
                }
                else {
                    eventName = 'on' + eventName;
                }
            }
            return eventName;
        }
        s.emitterEventListeners = {
        
        };
        s.emit = function (eventName) {
            // Trigger callbacks
            if (s.params[eventName]) {
                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }
            var i;
            // Trigger events
            if (s.emitterEventListeners[eventName]) {
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
            // Trigger plugins
            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        };
        s.on = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
            s.emitterEventListeners[eventName].push(handler);
            return s;
        };
        s.off = function (eventName, handler) {
            var i;
            eventName = normalizeEventName(eventName);
            if (typeof handler === 'undefined') {
                // Remove all handlers for such event
                s.emitterEventListeners[eventName] = [];
                return s;
            }
            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                if(s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
            }
            return s;
        };
        s.once = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            var _handler = function () {
                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                s.off(eventName, _handler);
            };
            s.on(eventName, _handler);
            return s;
        };
    
        // Accessibility tools
        s.a11y = {
            makeFocusable: function ($el) {
                $el.attr('tabIndex', '0');
                return $el;
            },
            addRole: function ($el, role) {
                $el.attr('role', role);
                return $el;
            },
        
            addLabel: function ($el, label) {
                $el.attr('aria-label', label);
                return $el;
            },
        
            disable: function ($el) {
                $el.attr('aria-disabled', true);
                return $el;
            },
        
            enable: function ($el) {
                $el.attr('aria-disabled', false);
                return $el;
            },
        
            onEnterKey: function (event) {
                if (event.keyCode !== 13) return;
                if ($(event.target).is(s.params.nextButton)) {
                    s.onClickNext(event);
                    if (s.isEnd) {
                        s.a11y.notify(s.params.lastSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.nextSlideMessage);
                    }
                }
                else if ($(event.target).is(s.params.prevButton)) {
                    s.onClickPrev(event);
                    if (s.isBeginning) {
                        s.a11y.notify(s.params.firstSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.prevSlideMessage);
                    }
                }
                if ($(event.target).is('.' + s.params.bulletClass)) {
                    $(event.target)[0].click();
                }
            },
        
            liveRegion: $('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
        
            notify: function (message) {
                var notification = s.a11y.liveRegion;
                if (notification.length === 0) return;
                notification.html('');
                notification.html(message);
            },
            init: function () {
                // Setup accessibility
                if (s.params.nextButton) {
                    var nextButton = $(s.params.nextButton);
                    s.a11y.makeFocusable(nextButton);
                    s.a11y.addRole(nextButton, 'button');
                    s.a11y.addLabel(nextButton, s.params.nextSlideMessage);
                }
                if (s.params.prevButton) {
                    var prevButton = $(s.params.prevButton);
                    s.a11y.makeFocusable(prevButton);
                    s.a11y.addRole(prevButton, 'button');
                    s.a11y.addLabel(prevButton, s.params.prevSlideMessage);
                }
        
                $(s.container).append(s.a11y.liveRegion);
            },
            initPagination: function () {
                if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
                    s.bullets.each(function () {
                        var bullet = $(this);
                        s.a11y.makeFocusable(bullet);
                        s.a11y.addRole(bullet, 'button');
                        s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
                    });
                }
            },
            destroy: function () {
                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
            }
        };
        
    
        /*=========================
          Init/Destroy
          ===========================*/
        s.init = function () {
            if (s.params.loop) s.createLoop();
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.enableDraggable();
                }
            }
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                if (!s.params.loop) s.updateProgress();
                s.effects[s.params.effect].setTranslate();
            }
            if (s.params.loop) {
                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
            }
            else {
                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                if (s.params.initialSlide === 0) {
                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
                    if (s.lazy && s.params.lazyLoading) {
                        s.lazy.load();
                        s.lazy.initialImageLoaded = true;
                    }
                }
            }
            s.attachEvents();
            if (s.params.observer && s.support.observer) {
                s.initObservers();
            }
            if (s.params.preloadImages && !s.params.lazyLoading) {
                s.preloadImages();
            }
            if (s.params.autoplay) {
                s.startAutoplay();
            }
            if (s.params.keyboardControl) {
                if (s.enableKeyboardControl) s.enableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.enableMousewheelControl) s.enableMousewheelControl();
            }
            if (s.params.hashnav) {
                if (s.hashnav) s.hashnav.init();
            }
            if (s.params.a11y && s.a11y) s.a11y.init();
            s.emit('onInit', s);
        };
        
        // Cleanup dynamic styles
        s.cleanupStyles = function () {
            // Container
            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
        
            // Wrapper
            s.wrapper.removeAttr('style');
        
            // Slides
            if (s.slides && s.slides.length) {
                s.slides
                    .removeClass([
                      s.params.slideVisibleClass,
                      s.params.slideActiveClass,
                      s.params.slideNextClass,
                      s.params.slidePrevClass
                    ].join(' '))
                    .removeAttr('style')
                    .removeAttr('data-swiper-column')
                    .removeAttr('data-swiper-row');
            }
        
            // Pagination/Bullets
            if (s.paginationContainer && s.paginationContainer.length) {
                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
            }
            if (s.bullets && s.bullets.length) {
                s.bullets.removeClass(s.params.bulletActiveClass);
            }
        
            // Buttons
            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
        
            // Scrollbar
            if (s.params.scrollbar && s.scrollbar) {
                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
            }
        };
        
        // Destroy
        s.destroy = function (deleteInstance, cleanupStyles) {
            // Detach evebts
            s.detachEvents();
            // Stop autoplay
            s.stopAutoplay();
            // Disable draggable
            if (s.params.scrollbar && s.scrollbar) {
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.disableDraggable();
                }
            }
            // Destroy loop
            if (s.params.loop) {
                s.destroyLoop();
            }
            // Cleanup styles
            if (cleanupStyles) {
                s.cleanupStyles();
            }
            // Disconnect observer
            s.disconnectObservers();
            // Disable keyboard/mousewheel
            if (s.params.keyboardControl) {
                if (s.disableKeyboardControl) s.disableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.disableMousewheelControl) s.disableMousewheelControl();
            }
            // Disable a11y
            if (s.params.a11y && s.a11y) s.a11y.destroy();
            // Destroy callback
            s.emit('onDestroy');
            // Delete instance
            if (deleteInstance !== false) s = null;
        };
        
        s.init();
        
    
    
        // Return swiper instance
        return s;
    };
    
    /*==================================================
        Prototype
    ====================================================*/
    Swiper.prototype = {
        isSafari: (function () {
            var ua = navigator.userAgent.toLowerCase();
            return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
        })(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function (arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        },
        /*==================================================
        Browser
        ====================================================*/
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1)
        },
        /*==================================================
        Devices
        ====================================================*/
        device: (function () {
            var ua = navigator.userAgent;
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: ipad || iphone || ipod,
                android: android
            };
        })(),
        /*==================================================
        Feature Detection
        ====================================================*/
        support: {
            touch : (window.Modernizr && Modernizr.touch === true) || (function () {
                return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
            })(),
    
            transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
                var div = document.createElement('div').style;
                return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
            })(),
    
            flexbox: (function () {
                var div = document.createElement('div').style;
                var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
                for (var i = 0; i < styles.length; i++) {
                    if (styles[i] in div) return true;
                }
            })(),
    
            observer: (function () {
                return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
            })()
        },
        /*==================================================
        Plugins
        ====================================================*/
        plugins: {}
    };

})();

//# sourceMappingURL=framework7.js.map
