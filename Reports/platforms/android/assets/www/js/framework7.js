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
        
          �abst          �     ��                asrt              )   Fafrt      �                 p   )     ��  d                    KskipserverIp=23.65.124.12 now=0000000000.0000 duration=0000000005.9900  �mdat  2�    � V�     �2�    �!
��  TY�lt(�B�3z	P�kB�)����f���I�,ϰ��8�ѻל�D�'[�ƫ-aN�BHM�1 ��^���Q�p��#K*�t�>�;�{_K�b�k^ |h����������Cܹи�Ԡa��]���z�+�wj�Ab�J5-�Y�YO���SF�M��`%����y�*U���Ukn�(���DS�>@Ђԭ즵A��\��	es��t�%R����ú�p(>y���Lc��>�WR�sBb�R��?��H=6c��F�����?5�����b��f7�"Lp�[���
���+=@�"��ͧ5i��\����嫮c0�+YM��`I�����YTn��q�~iY5
j1ʚ��`N)�{̵"�������E{�E�0#���X��֎�.p  � �2�    �!��`  U[0&`7�	�56��Q�t��^��6�j��R�s�w-BY��RAuX�XK�;�ڳ��l����z�^���=�u�l[x\�3mrC'��:���!���ajiM*��
q _~�}�����_���GK�	1B�p��D�h]¹��6���ȳ��F��mE-�ם�Mii���^���&�U��\t�v�$�eo�����s0�.&s��J�rҠU�^��H�T�(I�l;��|��\x����_��\�WW�.?f���ښ��Œ8�Ӳ�����( 媰^��sj#�I��w#x%�0<��gB�������<��br��&켟kz-�Q�`�h�y�o�ڸ-��QDS����%�KdBo�}!}��IJ�)B5�  � �2�    �!
��0 �Rڠ�� ��<y2"��'@�>�S���?�L�8ն4Se���A�cL����avhcJ;bq����b�G����w�����E�[�x����+��w��l��wJ�[ߨو� �i�����s�����Z�l�F��rY��V��}ո����e&��vu�*H$dO!$�Lxd����u�⥟J 6\6�Xc+ڑ M:�BŮ��k��YfAV�DE�A3VW�p��y���'dњu����;=�B��L�,�Q��,ƾ��vF~�HX��or����LZ���M�+���j��#Z��{
3`O��T�{��M�f���I����n�bͺ}u�c�~O�=����BT���g����z�PՌFy|��Ц����ujWfjO�  � �2�    �!+���V� l�@�wР
�*��:-��Q$vH$��������`��H���	xF�y5�h�(v�KD4����$�=z��u���}�f��e�Vo�g����9��u����j�e��=At���x|�|ꎳ��K\(P��d8m:����v:.�T�����65n8��j�9T(qbD�"�Ό�(�D����9�ɇ9]~C��)b�U;B�x���8�aEk����1a��T�IQ�)kB'���u��X�>��[���,�����D���h'?�Kx��C���t� +yK�e[�i�I���D��~�Jd�w6�����K���"CA��dkFw�_3�0��ugz�ٞ��>Jb��LϽ�3^����ˀ#J��4��$.X�r��C�t��(F���׏���du�N  � $2�    �!M�OZh�HmȪ������� )ޛթPۮZwfw��d��U|��X��@U�4m#ký�i��#����(�������˯��W^FC_�e^��J���C�o���ӧl���Z�J/�a`� ?���nv�؅�md�	��I�CЀ���(��)�I���7�2$^�O�a����Zd��У�6��(�����4[���	�2G�w~d�vP��j���{aP.x�H�C�s�J�FY��U��+�@�KKX,��nQ������Eލyu\%e�a����=��hy��"v"!��B�#h)�`4b���	�&qB��oP-�wE��Sq��T�snaQf�{s���zJ
�/��j���te��y�Ŏ7m� g�<� Ņ�*���w�Y�c��}���#�:��"��p�f홤7���6���V-Om��M��Q}7)д4���&-P�W��9�W��:Yα�<T*��J9+���8����J�0i��s�ST��,|v��',�-2�d����י		��y�tI�V���{|�����lp  / 2�    �!M�SY�"i�`6�3V�Tc.%I,�[5�oJ�<ymj��� �r׀�}���ª�N��Z���!n� ��[-��Nޜdz��R~953J��2�ۊ��M��hS%&ҷ���ߵ���:�c���}Ӫ2,�ϡt��eGX��*Q��������"�g��f����ZNڨϝ�U��\qƱ-��<Ŕ'0�����U=H���8�Y�I%DhEc˙r+n�4�3A2��\�r���*�j��*�-|I�[<�����(�eC��	���3�L�+��^�u(�Ȝd^�Q��-2��{
�В��1@c"(�Q�\VM�� ��+��P@#"{3��K��%��j����־9׍�K�i��UW)	�%X�b�7TW�j���t���E��Z�ۏU���Ī��z�<����5@��)W-}�㵣@f$/��LU~,���a%�t�?�YoOE{�Кξ�%�d��S�ĭ+)Kb�4�C������|�s�+;�ʀc���4qU8�	�!���f]m�	�X\��g��K�_�Mu����R�8  $ �3    �!{�  � UZ���(��i�t�fu�+�I,�@��y'�2��ɉ�*�Asg~����^H�=l�&�^�MmBM����Uu/58a.c�Ě�ky��w=WS�IGq�MD��u�ms'��W	ڈ��Y�Dw���~�q�E9��4j�����+eGΡl���8�|-z�t�}�1��%�^��3�^�h@v�K/j���U��I��ԩ4�
[l�#A����
�J(�-x���D�[����o���JIc	��ck���-�ۛ�>���.Y�d�uN��.Ѡ�h����M��/,YX�yw��h���޶�K���G�wJ�3�:	�QQ�L�
"V��H��g~Ps-6&sIa{���d����� �*���8`��$�W�Gtgeg+ϲ������/�  � �3,    �!  �U[Yhr ���m/���o�L��� u�8�R��FNxk�V��m��N`ؽ�����2��9d���O��GjR�X�a4�q��#O߬�ƴ¼_u5b�h�z���z0�	��N��d�f��6�/�_f���k^��L��t�v��xHJ�W�gD��YD	�����3j8���#�ƣ�H"��4����hܩYA��D�W�^LH�����ָ,Ȃ�٩\�UU����P�j`f�2�Ӈ����Q��'6nMSdo�О���~e�iO�3h��{�6�S�p;g�f��w��j����yQs�$�Hϑb���^�GT�e��������[(�����R+h��ˣ����-e�z�����MU�i ���j�U�Q5H�CX��९+ڨ  � �3C    �!   Tۙ�ArhUt�0+A��h��A`�</���ֽtR���&�_a��9�r�qX�ʴg7E�,+�&*C*m�E�^S��J�|�L<Ô�j�� c�o$�Q0<;�Ɣ���Ҙ��C+�\�"���%3�/��NC������+q�ax1���XQ�����)�"���Цk��#��ֈ�y�%$Qǀ���{�׍�Z�l��7�K�W�@1J���C��wƪ�)a����:	��T���n�����ͷ]h8�Wf$_�4`b������궯	�Q�o�S�8��v�J:҆V�ȥ[L�i��p�l
�(���dzw�����T��׾h�xZ7�B򠄮 ß����I���tW�ֶ\9�;U�����p܍�^jFÀ  � f3[    �!   S[��B�=�-;6�	[%���'��V�,�
T�����7���s���1�%����I��o$�Q�e�M���w��>Ƈ��͋<.��]H�d���FO˷![I Y9�iO�(L�*��A�7�d!�[zUϒLQ�+JƆxr�ʯ��&�:[��8Zr��E˄n��W�A"�xL�$Ze�	J�(l�{���W.8s� �� ^�m}�X�N�����'O���㶖�tz��ښ��xE۱�����(7R�� � �t5�|,�*���,�O����r3��#�H��L�c�{T���E<��R�ey^�࢑-8]q;Z��
��nDcrJD��ͤ��V{���\i��4J�T��  q p3r    �!+5���B�˖�v�fR�&�.`T��E%�Y�ƕ��Z�v����zw|��*6ߑ�Y�6��-���z4�zMZ�
����g�d{�a��i �c6�{�l���̱)�C��
Uٳ��'��D�Rof!�,m�]5Z��_K;��WF��"�U�}+X�U�z�-���R��y��^P�%��2)b2P�cj�UMmd�F'\�%��0X�@p�\se�|�1��[���P%�9z#��?䵤1W@��֜���t$~^Бi�[�l+�����x0K��x)�\[�M@<�t�s�G�0���=���D��ֆ䮉���r��%0(C�d.�W�B�iÒs�.�����u��6���u�9�e�yslK����p  { 3�    �!M�M٩	��mȪ����ؘT+m�]�L�bk���YGC�/LI��R���dL��;��vr˼�d$Q�ʮt�N���c8�2F2�V]�� ��s����X����Ѐ�S�Z��u�����ԧg���_y�� B �{�v{{�� v����>���90d螧��ʥ�S8�sW���2	J����d԰	�a� �:�8�a;^Ա�C(��y*'V�V�Ac�.�z�Ԗ��3�E�H`�t�%���;�3J�W�v�->Kb��nKj�^�!?�3"� �6PY���]Fi��ؘ��U�(�<�L^��-��Aj*��*�2�.<]N;/�x'���&U�;= �fۂ`�NZ�	D��8�PH�>}�<�75aG �a�yAD ,z%�$�ҖOĐ���[�����c,}w� �+y�i�@:�����O�
������(�U#�GlS0Vx�CxqԠ+&G�<ǅ5��)����qN�^��|��L�K�HV�b)l�L�m�W�e	K��B�6�9��  # �3�    �!{�@�P VX���@��)2{V69�|�/"��k���ɧ���u���V��t���O�qy��0�Lּ�-�+�NGKw��&���k@�u�Ţ����y��ƺ􊱄�|��,7��k"�a7�ER��oQ��E�E�g��6�gsnt�Z"��0L[�a>��Fڤ��90J��%-_qmE�T��Q����@O, �ɡe��YR�v�3%!@��qJԨx��模B�Z�Z;x�{��x0e�nUIp؇D&��{{�5�= �٤UVz%����+ =Yp0���:٭��������bVi����i�$j�Zk�q�C���	�w���d��Qv�ʴh�c.�M{�?g�O�mW�d��^�H�YL*`�#!�!:���T���\�F��:�D�K�  � �3�    �!�!�7�V[ � ZG���x�*���ʪU6Z�^`�~Gִ!p���c[�<KU����
;f�����z���x4�҅hģ|*��iN�L$H���al�B��)G)��L��4�r ��}�a�y�v��^-�wb���* ��@��@4^��
��̔X� ���L�	ы)�k�nICƚ��Eur" ���� )���RaVS��q����S���(�
&%���n�eXS\j�_�NӅ+�&?���C�����By��ke�g���{�z���ΥH�\�XWp��w[�a[j-��~NP�a� KE`%���N�X��٢�����W�n@T�3�Z_c�gi��O\ B� �v�'~�l�%���^�~������V3����jJ�V�"iN䗤x  � �3�    �!� �=�T�h�X#��8����D�%����˼:�~���DoQq�1�7��.��o�meF��0iT=1�ӳ0�"���x]��Z�$��T��^��8	�=��#��R� >n��.V��]��$K�_��×|�{Zٺ�ظɜc�aT�<��|�Mrʅ:��o�r��yZ���NlY�W ����C�)"�(�&�E}�p�Mq�L��D�h�!J�1�!b�L�#@�QeH�a[�Q� �{ã�p$V�3w��٫v}j�������M۞ޱ>JhT�'�Y�p�=%�:�&���f�E�Tu��N�t(�CI3�Ÿ':�Θ���;����r�ܦ$}�p�읞~��*����V7\��\F�Q$v��������K[��ʼ� �Y��pՈ�7�b����  � �3�    �!� ��Vۘ�&2D,N�2�n�M�u�Ц*����c|A���Ѽ�;H�/p�@��(Vٺ_)W��+m$x�M*���9Je~��2���r]A:���Er=�S�]����)�x5Ћ������K&���B�y�@ /��B�L��9�@g��j��.)�����Pk*�[����z��W��T��'2�i�I6�R�ǡ=p��UK�Ed�+t-qR����!Wg�1\L"��B�P"�����L�EJgԕa�Ne֟N���^��h�k��c3�ye�~�An�Xfh���y(⶯_�^��W�W�3��~k-��qp�[ή~��A��Z^[�?;js��W��E(9 �~� /k���R7ݶ.�����}��"���u�_$�AS1h'CJ	 �(9j�=� T0�lI%'��  � �3�    �!���y�TY��w!!@�E�}̽x��kڲ1FR�Op��T�\�Xlrw�{Ly)(�6 >����Αh�9���p'K���{}�R�&�c78-���'��_��jF6��SU����ᮊ�_����k���s ,x�a�$#�����^*�3��X��bԨE�UD@X.��hD�Peg�f:��1%��7kJڬj,��-����2�J��>��ѣ�)�p,���H�Fـ*k4L ��"SY�G��e�PI�`Y�1���V9�������Qo�@�1�;��,���^�\Rx���>��xA#����"\t����T��O^�*�ݍ��\�(�-q�@(39u��vPS��/ �Ăɯ��$eR+Uu@4|�菇{��	tŌ�ݫ%9%AE� t�ee�ӊ��  � �4    �!�	�p6�Y�������N�y���TeL�� K�4�Z��8iʽ���>u���v����>GT��
Si��b�M"��S�t�)��L�/=�/n 0'�VEPʨ������˱H��EɈV� �t!7*UP���G�;���st�F -�}�@��U+��՘���>�û&/۲V��&	��\Y�ÒVNV��T"ݓ�Lz��^C����� ���J�E�0f�bL�7�veU�Qz4X@�S��kH�Ry��g͆�{�>����V�|e����=�ޡ��NZj��>���U%��M^H@���j�Cd&���DŻ螬���v1�k�#J&Gylt�Jל�n��T��D�Hа��䳧�ۆ�`������B�X�Z��e	�A�����k�t�H�Mn  � �4,    �!�  `0UZ���(��w�ӛ�X�����t�N �zsG��{nv��|�m�m-*���_ue�e��}x?'�I6͇� *�a^�2���3,%��`� ���V��9}��o\��	��H�DA8a0�i���=^����=,9PM�S��t�����r�h�$�l4�Xդ�����j)d-u����8�"��U���&$�,W&eE���B1FK�q��v�qL��@zJަR%cUK ����
i]n��[�=��vg���W�U����M|*`��^lM;�i���M�\<��s����`�#,�Vn�����̃X���	KL��;%.�qWV�IZX�(�N�o�y&:XU{ܜ���7)"�r����+q,�P���5�5�P�~	��A�  � �4C    �!�0�RZ�t �h�9�/u0hi��>]�Ə>s�α���Dh�Ɲ������Ov��5K�ޯ�`�v33)�Z�Kh[�� cYD�g���@V��k��g�ݖ?����R�c�
ֱ��KSnNX]��U���
���*�|;�?Νc��W=n���K����;<�iiX�s3^�i��Ҷ�"� x�Mz��[Br#M���D
 BS��w&�q%�k.�V�2}�C!ON,��~���o�뼣<��:�ä�6��c������%j����D��jK��8��)$:��Jt_݈���#���^У���7[u���%�֛�ih��� �O�>��t�"�Z9�/��h�Hq�5��L�K^���JN�R�&�� by8  � �4Z    �!  pPڨ̲8���92��P*�f��r�"'����_O�_n���8�a��厩�����% �]�4�O�0�W�:�32��%�F`�[tԾ̸��V{4��侮�bщl�V�8+�V��˰�+���E�ib��{�w>WA�g��)ä�2Դ���,e�v	/�"[��rk»B7U����Jd脕���IT /?�$��R�(��F���E�fh��B.��	��g%���|�&�♉��qFT��Z�%�u4x�όǯz7�	�K0f�2G]�Mש�1q��v5�]O��>:����,�����w[ay>�<4��Kǧ]w���u��Gq��b��=}T�q��!W �W;o�X�5-���	.|��^���� y�d�?��Jx͕�` �Ip���"֤j�  � �4q    �!  pP�il���2��k�)� ��ɾ�M�/����]�r��K^G�@p�6��C�s}�C���\���1	^�G*c.��_�>r۔�d�2�kn����L|�s�t���E��X{;:�>3-5�������
�� �a�"G_.s��(c��3��N���׆%i��.�r���׍ڶ;]kM�Uo`��jœ����Z� -$���NDQ)
;M��	@BQ��UԆL�E�/T�2����\Xl���n �5}�M�����d�J�]9�Ө�V�s��$E�N��ݷ(����98g�b3��H�l���o���%�~����K%�,�0f�� (Q�Y��&
�X�	���Ī���1R�j��M�AQ����S�W���&��X 8  � �4�    �!�p� SZ����Am�e)��(��� tk8��(�+��:��`Ӻ�-$��q�[��nd�+\��� �9��:��Mv�e�ڳ/m��ß�mH�p@��î��;*,�����$�5)��pjd�Y[}��w#�X�c���r��\�s�eYm���bvK����j�*P `���v�)��:�]YX/���������![R����@`�x�-��:���e B2VqwR�T�V�0�UG �����r�?�_.���G��Zh�5F���Sb�"��e��cY$KD.~][���n�xh� ���&�*������0��G�&�P��2��ծH�u��\@Rggl-�U>�d�4���-���(/$�5!b��yL�	���O�߷�� S��h   � �4�    �!��   WۙHRV�[�
�fP����*�94K4��ε�{.+6H�k2�op�����U:��}V�#J�,�`�j�����|�vi���G!~P�-�L��).n�@��}SҲ�%�x�|�Q��-B�x�	�8�=�M��'����>���2�c	UE���f��Pgw^P��b,���1�����,���IS�g_|��Fr�X�/3GS���Qh�YH�Y�6W6��(�Ʉ��҈	)���m1U��Ug<H�)7rc{]e:2�]���L��5������]�h��$��W�vuܴݔ�Ut�]i[��U7�J��MEK��-���lW)����i��M	�@�p1����Up���'Sj�|�����gӫ=�|n&�,#/+��F�l��I�H�t5����L&���d���8  � �4�    �!}���A��.jV��-K�P���w=iP}��Z
����3פ�����ƏI���y���2���������o>�[��,[a˳1�;S~8E�W�k�)�u��ң�ۺ�Z�7�C`�N-7@EMS�~�ކ��O񠎂�n#ǮDʌ���B�c���q\{'�-�~M$�Ți�eJ��l��r*��f�`� kX���ޯ��X�S��Ӈ#"���
�a���?��L��A⚃8��-�d�?a��4p��>�y,xW�=l��!�+��i��d��.�,lK-�tD�z�
39m��9��M�k��W �;�c���z�������/`r�x;Н�5R�N��^*jSR����[0�ഢ���� U�/j��rI6cb\X�;��A."���`�p  � �4�    �!U�� �e���;(�U�P�$ZE���o(�"�����[�`}u���q�5�F�_�qn�����~~%�v��@T_Q�=������qݻ�#���Z�7�S'���E�O�ss��u/zBW�j|�C�$y[%6�]ɇ%G3!ڝ�*�N�W�������R$�x�(�:���$��0����Ju�8!�֨�4k��%W��2��QXHyj���R��oȝP�ن�r ���Z��[i{��0rĄ���?�X�'��ŝA�
�;�+�k�)�Eμڐ8�~	�%�{X�n�m8��\w
���?�^
�ȷe�P�:3yd�c�<XF�v��[X0��I��1�R��Ś��)o7CgI]E���4��hc��<���p�w��	Pt�S�  � |4�    �!U��B<���եP]���Ȫ�����+R�ߌ���?sS>��c�f_�����f�o�0���rW(�%J��7�d���i��ۉ�!G(��Z���I������47��m��Mv�9���Kֺ��t�qڳi¹���:�����xp%�0�B�H�Ձ��]�5*�-�,i��%i�p����T��l4�X�"���ˢ�&���jS����|�X:�W#���/:�Uzo��Z_���2�a#R��Sd���GT�M&��Q�WCO-r��(�o�n�1�oY^�!+Qn�I�"�1�(;T��N�+ϻvȉ�鑦յ-I��kOG%5F,�a��&���;���z0č6`� B����D�s(�r����LŸ  � �4�    �!� 
  TYi,��-�[ҀVX��h��a�-�|��.�*�{������/U�u'�}���-=���D�V��`c��w�.s 2�̐�MǑM�^����I)~*��Q�H׸��a�@`?PLԋ�U�ΛW`5�B�^d�m��T��x�y8[��2A ��)[]5Jp��G8.]t��-41A4p�.�5�� Nj�BT��+���V(�Yr)�B��K�@?AsEllkQa�*)J�J�m�%�eALt���R��E��`�A�,wt)J��	f���e�V4Ə;>u�_e�[9��@��B�,'~�PBU�����V�� ��i�j�|���V�_e�&Hk�kMt9"�,���q�C���%:��ڧ>�cUg�Y�ڮr*Z�;�8  � 5    �!�   U�茘ɣ��¹�Ũb�B.�@��> J�V:8�U������5�1묥�Wb�.8	>%9ԍ�Bk0]�Q��틫���.h�i��&��,�VhHa�ڋ�ň�(�S��ѣ�#X��`����i7j��,�r���;���,��ɟ	����H�N���-�D���f3L�J������:D��\_2Vv�ԺRP�Mu`K`���)��c$��W	�O/����r��3B�ʧzL<c�KP��5�XѬ&��\��_J�9��3�s�]iSYա"�ڲ��=�%]W��`&�H]��mF�M�6^+x�+�����M�v�ʌ"�9�<+2>z�Tѵ��/� �m�u�B1�����8�43Ls��"7�  � �5+    �!� " S�Y�$�j��A��u*�/@�y}{�V̤�Z�x�s��%��xf���c1t����Sr�h쭥������j�����%���HLk�Ŕ{d�M5;���!_^U�����#��=��?e��*���M����tnђ�97:����@W�R�Q|�>ԳKmEkج�����U,�ւJ�j}����R��+,��;M�q��M�r�5n��6�I�\_�y$�� *�.��H5D}�`�]NQ�u5��˔�}5���q��n�9��w��}��?WF5�8�����[m�f��j~pٱzｴ�t�6�q��p/u��Z�]N�(v���
�j��RW7ߎ 	Kz,$�-�v�㜡 ������ЃT���F��G��  � �5B    �!�  VY)LXD.��[r���*��󪠢�P�������al�-��������.�c�w�6��?����>��I��#�_�%[M�B������v�eT�r,�ac%���Y,�����PpG}���܊��ֵ`�#v��HK�.�a�vQ����
�H���It�ˏZ��^�NV�h����9���ʥ!�+�Y����%Z���C�fi.9�"���(08 0sX)�<|�����'�ߜ�k�(Y�Z����@c9��/�\�i
J6�����>�����=�+�x�NS���$-�D��I�������Pε\�,�Y�+W�8֍�@��)G7sQ|��Њ�/[�������֍zV���
�@�Q��#&�Q��w�����L<�F��.F�\�  � �5Y    �!�   R�iL�(�	ί6�QP�w�*�&�;�]�T�Y��%�(׾��c�z��b}�x�l��V��z>;���8��il��g����q�Q\'���N;���8��9��V�"�Rp=?�??�����h�0 ��͒�'M�H?����v�I��L��SV�S�R0&�W�ܓ�^�D��AZ���'��ԛIrժ�S<qN�����\
D�0�B��ER���	Å��\��r�T�P}8��p
A�
ҿ9$�e*V8sve51��:ހ�p�p �v�S�[�k�5-�Z����Ebxc�5���n8��fݗ2#��4���&��e�������&��g�ѷ��v��VTVW8Xh�FP�*Y嘑VBt�����\ %�B���  � �5q    �!�   VY)l�\�w�\�����Ja�!� � �yA����J.pS0��G��]m'�����r�S�1u�������6����lư71�H�W�y����bP��e�����V�zߋ�+��-!d�t��5�)5�,�>0^uʸa̟�Qj�ћ���j�$t��:=�A�vVT��s3���K.1BDչM�ǂƵ"�5�ZV�3U����,j�G8�[�.��ΕE.H�6��[=Vժ����������x���͛�� Y$�St�	���ы�8S��\o�����%�
/��x���<O?��n���8�+��7S<s�������U��ܲ�5n[�A�V2�6zR��K�;r�L���V*���56"���@u�h�9N�*�ӴLB�T��N  � �5�    �!� $  UY)ptƃ	q��4P|���.e˰�Q�/�$�B�ږT��SP�Ů����Ǿ7�[s��Z����(����נ�c������=&z Jk1���U�Xx*a�����YMj��v��� Qe%�A|��X�縼�[W/���3�dE��k�F�U�ca{=�׆(N��`ZPD٢�ʕa���������.�Ǡ�B*sjPFjj�j�M+/�H�r����3�����g�q5��VI�1�"�\���b<�kh�Ay7�d}���[���;�����+H@� �}r�$���cb&o�2���V\^O�<�Zn+슓�(�Nd�v��3��+E�d�R�d3cn'y&�"��at��2Ӻhx��HB�  � �5�    �!�. XY)�W
ƃ`��q52��u�8�~7���.J�(�dsAk����u[;�+ 蔨4�f�Tjkl��DԳ�MR,� �'�jp�08���+�DC)k�h�WB��"�a�<8VL�z�K&A�d(cR3G=��\~F�ʊn�6~���5n���T�87�WYX)��:�mJ���ڴ]��w$MI
�o~�� ��Ic""�/y�SU��%0`�4@d�U����6�LQ;ַeU�\qo�\C���[�ѡRQ�D�9d����� ��y�Z��XƯzM��n��% 8C����t�_F����Ez����Hc�d�`�A�<��W}�D�R��8��:i����i�I���7|B7�\e%���D%!�޵mt�� ��Sq*�p  � �5�    �!�,�S[ l�ƃ1
�U�Q���8�J��J/[��s3L?������o8ّ��`k�k�]��Ӻ[�Z�/�zt|y�:ƭ�.&�!Pzl(;��H?�c�	N0����\���'�U�cIT�a�x[D�s�-+�j��O���!�dm!W�gO�I�#����{ʯ*٩%n��1��U�Hwr�X�Q��AW�_oG�؀���A�PB$�)t�+y�U�tr�[���8�����z_�Mk�4��4|��h❗�7u��z>°z�*�dJf��$N��W�"k,�W@Gg��t�HS>Xf������uCX�"F��4�"&Y�y�/'e;ɶ��� xy<���ץ��k�eE�R-h����x���6��rW;���;x�̽�]*����I� �  � �5�    �!�� UY)L�H�7�[�̫*u��U�cM	�ۺ�" >钨�i����$��;GwR�ZQ�~���JO�n��q�c�����}[p�z�*�yז:��\k7amwX�'�té�H���%��mu�����L>�y?G���� 2=f ��=՘�c<F�ZS�9	���������	T���,R{!R�ֹ	�e+���E�p�D�̲�Vb*�tOR/S�R�D3���*��VC^4`�	4��0�k�n�n��
���,�ߓh����;i���&T����7�EZL
�����2S�;�2��*����}�A<��� <�#+ U����cNalI��u\�T�"D�ff!R������h�ė�RӐ��o��(ی?ק}m� �Zw�yL��Z0!l��A��H�T����x�b)�Ϥ�8  � �5�    �!�� S[ ��Z ��*��.�9]���avr��9��H��9a��T���ԹO�l+۫���b�R�YRTi�̀Gu�P�@���2�R�Kbi8_�0=o�Q���+V�C;���EXѲ�$hG��X)w�J����Q/W}:JꃱGЈ�/B�T(�yY���IU���I;��	��0[�`)�.s�F���	R��c�2"�sř�{gB�|B�.�jƎ�w5󼹟����𱸨Wݾ͑��(�jy�$�Ld�e&���u]��I&��QTu٧9i����<��OۅNkŔ8�D���Z��}�]ϝ�Nm8b�+�U��L���~��x>uʤpw�����;��$��5�x�L��U�O&�#I����㰼�N�N  � �5�    �!��7�U[�hV	RH8&�+��)T�sK=�)��dQ ��B�/�@y)���.�C���;���������Kp�`�veϏ99(k'@\UC)�����=0�q'�	#@g�yJ���x�TnE5ȕ5�֌�/q�]X���b�>�y붃?�������r����դ�$� �#C+d��@���h��G\�d���Ru=cޔ�kТ�]G*«Y%��tB
�-��B��" �$]��@mV60^��eT�&��+�I�%�TdX�?�ZQ޶�j����HB�WN����e�cҠFE��&&$�&��5�n�ВU�`�	�gKEN�Txw@��V�!��}��H�ݺZ�=
� �O����Mnu��������r�yKD��N5��/|U��BS�u  � �6    �!��8=�Rۡld� �	)��UX�<�:�����L*�3����<�N\����C� ����5�5��.������ի�R���h�ʩ��jW�kv�0�L�b�F�M�|�d��f��B���z�����<���b��K&c"���&V�m�d=s(	�X��)����)ns ;�;5o..Ў� @:��#X��V�^0�a���KԎ|~��f� yq^Ӎ`N��:7��R�($)MJ�BYBB����)M�E�
�'��kk
���ek[��8[��~K��ʎ��^!}��'�S�u�j���*�J���K��I͐]�y��= X$4 �D� ׂ�� M��W�)�3f�c77rz����"��4��r��5V��5˔��+�M �S���kM��(�Oڄ^������  � �6*    �!+گx?�U�`�D��U�}\P/*b�U�F�- ��cL��t�hu:�:�ȈE�6A�ҢvUN7����ـ���jlNy��Z�1R�:��Y�F����a��3HT�t�z�_��BB;(���y;���He�VfIl��ZgSj���
Pj�^�� �1$��j��5}��Jv�M��Eq�-ۛ�S�>��:F�m�����V�j; ���]iޟ�#vp����q�8*�v�\	#	S���)qRVPi���H����u{5֞�ZM?�u]<a�Aݱ���fyjڰ�,��Ƅ Bbo��h���.P�����
�@:]"J�?_Wa2���!i�:@\��Pe?*�d�Nr�M+���Z�sS�t�#"�JΫZ�7\�!hM��  � #6B    �!M�O[��!W�����	���Sh�Q{V�vQ��J�7\s���3[�+1{Vi��Y'zd��!ǉ����H��ߏ�hbff��b ?³8Q�(�鲱��҉&(Y����vOy}Ɂ
N�y&4������,�&I�>FTy2�������9鹘gK������4]$��m����֎����1�*������V�ؠ�L�
�� p�ƈ�M�ƞw��S����VX�e��I'�Og���aԼw����l���{L_'oc����v�=w��_�tFƜtǰ|e�Z� ���bMUJ�VeM����ڽ���e st�
I0��AEL*d�� +)�%�\P%��"�uZL��6b��E�tGB����6����o?Cv�Kt�	��9<���i���|�yu5Š�Fk��[S<��:��g�y�6��FO�$�~�e���J,~��_"S�3׭	29bU�m�3�ہu'/������~�������TU�S�#��J���YO��B��/����4g��  . 6Y    �!M/SSn	�� Q�!V��$�p���"�T%7����	�-Y����֗��{��)��Κ�4�R䦁rT ���3��
Wo}�FG�-���u�3�gr~��?OX����9߮��E��Hu�h���b�gZ��ޕb��%&F�i���pz�V\��d��Y�@R�u�;ǘ�Ei�����l<ln2�W{�����-nhd�J^��7󚰻DU����k�W;«F��I���Yx^QdfV
y�Ɗ��Ŋ����xaQ��ٜ��m�����O�-4��ZR&�P(��H�U&���f��@S�oJ�\�X8Wit�=��ƶ������f�l7�_��Y Cc�;[�U�H�n�;�&r�,����,��=i�߮g�7����R��+�Bԏ(V�2���� d���T��,v-PӅ��cZ�` +C$�����T����z�����,���C�E�銠r4kq��i�ƹ�>p:��c��r�P���*�"[�&�-?������B�>�T���C�oJ�2�   �6p    �!{�    S� �t0���9n`K��QvA�B�D�=�%R�j�WM�֛JBw��7�M�ҳ��z�o쏻K	$#�k��FRM�J�z�� t���&��^}�'T�]�Wl;���J�(��f�X)!�4ݼ��~*d�K�Z8��/�m���Z��bd-��
MH(�QAsc5X3"�q�1��O�}��UU1�o$��*2,�v�bV��q	Nv�SS/�8Đ#�Y��0w��mŚ�V�>۵�t��D�|r�5p����"�ė-ޟweo�q��||�wd_����f��ɦ�o7~T����q&X ��Jh���ꆒ14�_%�h��T���L�FwAW��P���ۈAEUDq#���ɻ�z��C3t	���$�/ V���"�]H���G�xR+�,BH\�  � �6�    �!M���Ac�U��d,�)�5M�;� 3�K{��'��L&���i3�<b1=�)��,�t��5�{nǱ�}cu��ҽ�@���5�c5>�`ud�@Y֝��$�&���/�
ȵm�%2s��A�T1��ƅ����*^�V���|(�-i�;�K�,[���&�s8�4,r��VZ��d��ҷLL�c��ڔYD�")@�P����C�<0��C%��P� ��$�'u}O���{�^��D��z��f�2r������R�D��9�G�j�2!��(��^��e�V*n�9�Ṁ ښ��y�Kq�[0LOW�R?'�4~�ň��S�KZ�;�!-�٣��\��N�'����DkJqx�ܭ�B����]��P���BN��v Q�  � t6�    �!����A�!9���u��d\�T�MP
\M�\�7�^&�`}ӧ+�lLZ�5��t���;��B��O!P��<�SN����-KF�@������������W8�R+ĕ��/h��eq�W����k�%JR>��� eL�t��ɇ#H��]�X����5���lX��2
�B��Nw9w���TȠj,n�qG�h�� �X&�����N�f׹��O�9K��(�OL�jTHM9)Sڏ�9�T�Zh�5�,�(��jM3<��ê���2:nU{1_"�tӮL�C|=�Ҥ�r�+��N����u�ZG_�d&/�8h����h�wޒ�с���$; B�gak�8�SKS�$X��(�����l�<w�   i6�    �!]��a������*�c6U�uUTj�UP�{��b*��}9����K�ҡ�r,u��7Õ����}\s�$������du9��!I,��xj�Rt��p#H7����A��L�y���L=1�Aj.��B��{�_=g�TJ�vJ+u���B{�FK�Xȃ�yBq �6�h��6$fQQ����J	��.�{�/i��oԤ?-� no�z�_��3S�n��ө�b�.�>S��n�x�c+:���c�^ɒ��\����+�Q����T`"RBV�_�T�6Ϧ*�a�ůȾ�Qb��$!+Yy�6����2X�Ft�5@�)#B��lr�@`�#bf+�r�  t �6�    �!+�  8P����X:��9U	V�e���R�oh�XU}`��urVSÁ��Q��6��S�/W_���q����?8��X=?�������)q��|�@��B!��d�KZi��C�foh�So8�-"��XM�>�J^�f��[��޴݄`��D��!<�*���u���Q���SQ�ǟ����h%�g|m�A���"�ݠN�픤����6��r�3վ����h�F��Ed�E�!	nm�!�B`��X�f�ن�\�Z����~?�z��ؑ�G�?����RZ�NB�K��yG.��.ƈ�A�Z�D ��Q��20! Gt�iLs-�$�g��=0��E�}+[ �д� K��~���'�VK,QPZe�~�){u��)7ΰ��`��
ײ�"�����Q>y�cj��  � -6�    �!M�M�k�!6�TF�rȈ1�1�!B���UJ�9�C~>�B�a����MY]�m����5��P��+�i�m�.w`hD�ܳ�����͗����ŉzY�soe�^�J�B0: �+�Y������8�Z6'��+��P���v(�m��Wd�b�ܟ��-JN��R��Aƭ���=�>-����_y/�;�'���
>�1G�v�ęV�.��7N�J�gd�LMC�s�B��q��K&�%� ��lqm�\d�E���2�)��R��P(�`�F>S�5�m�4{�zi��(0�Oh����
����B���a�I:Q��0[�5Z�آ���l�-U��t�݀6v���5�_��,�̋ib�~���{���D� ���:��60./F)5�(-�pt�gì�t�C�R��Ơ8t~1g1������q�<UDpYL�-쨡x�J$P�D]&�4`"<J[�d$d����ܢ��;�E>~��fI/�mU��D���K�We�LL=�(
�G�Z�Wr�d1���i�'�9��ֳ#"���jź�  8 �6�    �!{ ,� WZ���8������`��-k���C:�g6�牸齣OUumUUp�D��ܼ����tm-��⋏@[��d\�<<���bW�6铕��L��'��-ߒ�.ë�)XJ�!V��]Vr����O$gU<��ȴ'����v���}��t.����Y:�*5K�`�uU&Ml���^�F��݈R�q$T����;lj B0V,q��F��F��l ��A0������U�\b�����r����t�1�ʌ��m6x�S�+Q_0J��X8&	l���{�z�L�Ì�G�Y4n@�J	fF���A @v
8�7��m�9i�}�ԕ�j_r�CJN5l���+U�+�Ҧ�gU�ҊR 3�9�A���Ñ�����  �����\1�HH�}�!%��!�4Ω#(� BB�  � �7    �!�
,s�WZh�f:X����y�X��n��ȫ���﵎��S�fg�o�[I��- ���z�5��+��`��"�U%��.pZYT�|FQ64,�j-�(�l��9����Һ�R�Pu����ڱ�� ��sT�B�gΕ�ndt-���
� 6�we �_�m�i`�·��M��ʙ�q�//l*��^�pw�2��Y[���]&�H��^�R3���E��da�P�A`3���x0����M�'��Ru�'��(ެD�렶:�?~�|����"��J:mÆ80�0GR4.+�B@"��7:�Ƨ�)D�|�8kr*��Jj�&S��?���R�N�Rz>_�HP"�r��x.^�D�b$Ӗ��r����S�� 2&)D�A����K2�TF��sY(!3����xV��  � �7*    �!�+��Tڨ��X��
Jkk���^��H�����ޣ����\6�K\�1�u��Q��4�ܞp�g�Ԑ�$��|�xm�JBˮv���K<�3��J}7Ċ�2Jh��k�r�� M}^��q1����+�wί�[HOkLێ2�G�ٖ�[\���_�/* �M�
��A�_Y�`�а�y3
`�^[D�JYt�K>��"��*,T�0\H����x90-��>���|?>��v�l�0�FMdQ7����P�!Af�� !�wt��9"doV�?S�Y���C�(�����N1&��gS��� -�b0�?/|�U��h���~R;]g�(ٓ;#�L��ĩh��  3(PwÞXd�{-�ܵB�t���pH�%̳�  � �7A    �!�
4{U�)�d0�����*����ϚmR�/z��4��7�Ӕyq�����^٭qm�y�K@(��yz�lz�ǳ��"wR\��3]ATG�J�	J�*D��lx� t�=�NOo2���M|��4P�06�Aj��%�Q��A  ��c���`ÛP����� ����j�����}:����bIΑ��-+�_���DP�����(��V�S&�"R��:�{"�q9rn�w�(�44x�K�gU��2��!ea�mھ���l�&~hª��6�`!ǵ�[U8�\�@(�$�9�dp��[l���� e�����$�n�m�t�,��_2Ű�u�"���Ʀ�"�+T�(A�4F`������ o�0�HH���i�n���p���v��R�	��  � �7X    �!	�p  T�(̤ �^��3/��&i�Sj-W�˹��+��S��s��g�_u6�(ePP��k�#~���]E�7��w�����Da���^@v8��F��bu�����EnT4�)�y�9L���m=�%��Z��kW�EД|S��g�t�6`��Ń/�ܝ�TrB6�L����/QF]Jk���UH�Y���6����"D�
Ӓi{2�=�B�ֺ#NE���i�<���Q�����i��}N�L'��P�|g�O�9����a_��Y�6:´@ll���
���Yh��O���9�b��".�fw��6qw���ON�j�}H�8^f�Oݜ�.=��:�k���줐Y�S�1�S�\F��H�Y-��V��*���0�~kΣa)��LHL�0(��~  � n7p    �!    R�i,t)^CL.�����@�,��{$Wm�pՔ�yX��ͺ��?v���Za�?e��徆ܭ�|�ۣI���NV�o�6g�@�B�L�ǯ���G��5=ޒB�hڕ5���`��/��@{�|z�����F��	,Є�~�R�I$ ��b�%�} 7/q�,�]����"e��B��Fd��oM�;�˦�h��2	Mq5	q�;���m���!3ｇy߱�N�sm�4U�7�N�|�UM)�Y�s�Os�4�j{�gZl:�ZW�����qU���X%8�$h�D@�
�kEL�ߢ��y;
�0^�D�1V �B(�/���C$aTL2+Rr*���d��fr�L���#��p  y �7�    �!	    T��,� ��.C�(��ܥ���@d�(�Ou��7������$^��״=P,N�󽩉P`>h�dԈ��$؈�$�ID�%�+���q���-nVW]��%����������,�0�sj����v��AT��`�P.���ؕ�Uj!Y��X��×��y��i���152̈́�Rځ�u��:�r��	`rFf5���2�F	��5���[ng�(�UxM�$�0(��@���{�G只J#�;4�/v|���.,�Qzgp�j�N�ȮU�+T_��Y�/�^w쳪D>S�
u�1U�i�y��(�Z��sbz�e��R*SZJ�z�%d N ��HH����݋l�/Jҝ��TS[�$���+��c���D@o��4VI-{�V��HN��,wᯞ���F�]%  � i7�    �!5����Ն�Ĩ�.��\w����,�{����f����xG]]"��'�g5�����ɱ�)nlQm4��؀:�^���|�h�ݗ����a��5PW]�Z�+ӫ��=�����O]��ܯM
��MT�!U�%P�⻌�ό��'�4I�1�M�Iv�P���Y7� ��ޠ�aj���dA{Z��^=����P-tZ�8�?�������4*�uv��Ο�>������we�
�ه���hʺ���!���̎�[q�(	m��"�_�*��HG�u�F�}��r����]ΰ�Ȱ2�a ���w�bM��٧�}��.�>�<�	!Nk^���B&\bWZ�%C�  t r7�    �!��9/�*��U���F
��*t��(仅����!�Q�����O\]�[��c�~�����R'Ύ��W���o|?����c�x�4Uy�pS�D�
/Q�1,�#:Zq��kg8�M(gh����	�LӴ�4㻽�Bs�Ra,���ްb�b&���-JOhV7`�ae����� \*m�Gb���m�YA��j��{!�d�ǰ,tY+%�r�F+�ẁ�V`~��?�単Rp�#X�ܩ���Niw\�4�I�l49�����V�R1r���]o�8!�O�׭V':#o�4���-�� H��#>̞'6xF3��U|�*&S*��Ե��UiGJ�,��ߊ�9�҅x �  } �7�    �!��� ;���E�(��d
��N(u(�m7�ܚWv��Zn[���E̒T�����| ( ���6��U���Q̙�q��\�U=���L��!��0=Z�\���_š}�7?˧̾%���m�s���<)���|8���wR���m;yR-r��Q�\B?����0[�U#^҈^1MK��.���x��S��̔H���m�Um�H��J,��-�.��fn�v�0�x�����甥��@Ȭ�־�L���� 
-��a{a����Ck`q�]�.�r��������L޶5{<\2k���$s�X��2[]�`(٧u��|��k��N�nĎ �vi('V�R��1�<wL'�;'4�]����(�`��ըN����@�  � q7�    �!+M���A�SM�$Y$�0XZU�)��}����rO�MOɪ���+�d=�~���jj���nVӔ�d��)����TϪؙ,���������!. �=�g��T�2�!��K�ׅݗ�tڳJ9y�Qa�<h��4e4����;s&�QJ�J7������>�i�B��D)��)�96)�P��D�Zc1F1
���*�f+�%��& ��#j�k����g}�ٛlo��NbZn�_���$���s����	�[a	�����᝖>Mi�:s�&�7�*���� ɂE���y�pM�5�JF�U���Ic(?�[�D����T�b�?�eB���������u������TQ~��n	���ى���� EL�[i48  | $7�    �!M2��������@�H2�HL��\4J33B�*��U���0#&!6�X���լD��x�Ē`2� �PĝH�޲`4*�Z� 4%.ݐ��Y��O�78Ǜ,)��;o9#�e���N�τMG!��\�o%3ֿ��U��K�J��"A�vM�o�P��䧭d�Bl�����m[i�PCWe��q�
 �<y>�'�3���^b�9��|�� ~b����
�>\9 tV-���,p������9����_`�]=�FM�T��jяFm-d�|�M]�Hl�%6^w�k.}�=���4��`om�WA*= �����(�1�I��T5(k�Y��4��`_\�R�*�)3y���ȁ�^�tU}W�;�^��w���眽���p��ec�J;�Y���o��/ĳ�z��/{������]vK4o����P���=�=¬�FQ��rK��G  tݺ��\ߚ�a�B�9\�������*̚@��a����sG��[�S�5ޝsg纛鏍!���M��U|ߛ���w���@���F��#�{x|�ӯ6�  / �8    �!{U���D
��u6T�FΒ�!��U8�P��5�v��|�+
���Oo܅��Hc?;�e�M���NV_&U��e�I�V(]�����@�Ҳ�z����:���G
b p���£24�!��In�Bċ�?���r��&�`Q�����"K!S@�BO��6Z����
,1��)\��,��#�`[$/%,SK�9i�x��q� *-��P�*��<qE�d�0O�@��,�`i�%�J���q�h�m��u��X�����Sk��~%�����W ��a�WRo�߼�_�!����[S[a���<M$t"��V#B�@鴥tw5Q�sG�WUN(����+TV�e�t�+�rk�Y�lh3��gj詨��a. 	.�їQob��IC��£�[)��$T�̰`  � �8)    �!ӅP  UX錔8�=�\�����%j��/
8\������--��jb�HӼ��_����2̳h�g=m�v��Fˣ�A=�x�Um��n��4LQyY�8�bH�J�*yV��z�R'�'�z����-���"�ѾHafx_*�)&�5bl+�[r�P�K�`��~^�4��
&Ze�0;̉@�+��-b�mZ��"Ps��/[����WZ��tH����%�*��PR�8Z. 21Ya����>�����4�k7�I)u�+֍��Y��d`�E�(�$`�����.��$�RV�(�7�N-�wgf,��/�i���,��}�J���h�����24b��%�@��n�2Q�G5iU����e���I�_ѕ�f���8 �<	�P�
��g�!�P�  � z8A    �!  T�aZ:�R��ؠ�@M�o���׮���;^؞��J���޺�{&=�OB���IJ�6;h����.����h�^�5���R��;D{�9�C�KҤ�t�M�|6�9۹Yn]�D9�k"�e����X��5�J��24ڤ����_�IN���C{�S+>9�pdK�&RtĂQ�:S��Pt���-��8�����U:ؙE�I���u�P~����I�Z�_��dL&���t@]���!��ǅQ��M�/��l�������IH-�+��5
��\Cniyf���Cנ�p~�
ߘ�)f��)%��Qt�����v�n��Z�#N���������1Ƴ��V�Vp�y�{QDD�!�f�ʪ�I�"�  � p8X    �!M�
�A��2�i��e��Ԋ�P:I?�\QM�I�|�m7���g���@2˝�
o~�{�F�'.BRNy�����d�[�:n)��R&p��Ti���ߨ���-˔� �}<�{��-]����^kC$Б�}	~��"Y&9���ߔ��Y)9�	�/)	���:Ad�!{-�X��;��(S	(+mTV:d~�&6ږ��I,��%�3$��h�(FP7���s����`�<�j��u�]㚽«~Xn{��&���L�d��T�k��RZk�H����(�������V�l��Wێ:�i�kJݳ�P,�BYi���A�Y�%��m�Z�{J�-xi!9��G{�m��
�W��P�C��v���  { g8o    �!   R��A��z� ��غ���v̀7	 ��RP �zÄ�JH��(|`�\�=gQ[��*������gOg^i�׊)�o2_C ��Sq��R�o���C#A����\���:��HV*������hR�(\�鼊t<z�q�ZG����D���Yo��N�/�$���^u7ƶR 9�Eh��c�x\׽kk�K�U`�I��T g�m;[t�ߓ��k�P�����KCa���M��;���( 7�eL?$�ݫy"��#��!:�FC���}ELԣ�<�M7=�P�^���#�p��a�>p�aP�zKBPJ�ع՞�WY*e�c��P dSLW��]�/�8+ �  r 8�    �!M���B����*IJ�"�A��"��/V	;OC+����G~ꅝcz�O>�����u��j&��ʇD	��4��������u���H2�/�d[�J�G��
`��b{2҇=p��z%��U����T�ݡzR6�ӓkwr�F�#��|]W$�hK�袤����,���.>QmD4I��_ >�x�U(Ұ(�ԖB�)���)A��b-ZH�Y5�3Lڋ���7��U��f5�����^1�����<�"�A�1�Q&Em����5��\��0Z��e�UKa\Ge����O�����,�~*cͪ�w���- ���)�#ρ�<kp���{�O�e�:A.� p��d�5-���sA���)�Q{�
��\�[C<bP�h�jw� p  � �8�    �! M@R�Y(&
�,k�9�x�����^H�PScV�a&�\� ���{~��c�� Y�'�nW?5�T�@�2�sE.\U��3���Q��U�X���s�a��S��ʗuFږ�so�9�[d-��j�L^P���b��߮��e�cg'C��Wps�9xD��HV��j��DM��j�����;����ۂ3��iu(I&�S�r�˓�3�3g��i�`fEAf�1`�q	R�N���X�)*��H����:�'���|?�4Ǵ}Fq�[����������n���E�|Z�lh֯@��i�o��,�%2�bs�Qcb'î�V�i�Ж�*b�7�rθ�}���a�L�F�ȵ0�]z��$H�F�t੟���`Vn��p"X��R�Sq�9$�$ ��\�x@� )�X��Y�\�!�I��  � �8�    �!�F@UY���2�Rk���}�0�����ƭa�/���<��=�L��$�ڰ�J-����H,Oׄq��2� Pi����b�H9�;���2GW�&����S�����@(�J��ɭ:���D�����:,A4"�]V#.*���-@�$<^��|j����'ψ���U|���k��k���1 B��η��,���1	���Ǆ�l��En�ȱ�zi2U	�����������+��<�����M=Y��Nkӕ� �u,���/�,�����D3�qB�js�oO��N��@"��X��#�>xJ-q�L�@3��?���2#C�ՠ�&#��g[W�t�ꙿ,3�yaiܺU�Ҫ?�l%r�e�� ��XN��7.bdK�"R_\�B*�Ԛ3�.ET�����  � �8�    �!�#PWڨlG#AJ�Ȩ�[��˽������%U�4�g�q�z���tKv�6��U	vڧ���R�׻Z�]?�$&�âzￕN=ׇ0h�Q��:�R=�{(u&��јo�#��:�z��Ư�c�2zN���V���%P�3H�Ź���vmtm+Z��KաT��+mZo�R�CE[,t0ƱB�������a{��3�A@XHR(�J�5�*�UE�.h⃔���-��zf\�t&��h�\*:U6s�ѳk��df���g]̂���MkC����%�e4C��?YƧ�ѡ�������.�F��Y���1Hr�Y�8(C������,.i���sk�;�n����Mp/b*#"�T�`��4��I��&c��NE��  � {8�    �!�p  T��Ж^��i�u@-�P�T��{�&��E���q�F<ɨ����D�T��]TP��s��a�J�:�-���p������M\3�ʗx�8�@B�ӭ$��}D�<w�K�
R��?�:�E�?�����M�2�֩F�a����	�cG����q���%֬ +eW+J�k�V��`��Z��v��HB���A��b����'2��W��]6�.���T��SO��Gx�tR߂����cs�ir��B�*���<�`h��R��E������V�uw���*\��UJo��	���"�/�0�!�J#�in7K�W��u�=��
��|!{��U��� �DTR8��
-is8OVbda0�lh�(  � }8�    �!R   Q�),� �j��}��xB�r)��`Wi���ȵ���t��ʝr�w^a��7��z9���L����3��0ra���������D]��]�#��`t�Xʔ�9�4�t% ��ɐO��t\1��/G� z 8qϓ��P�C�,b���^|N{�2F+_�s�u�ȯa䦲�.S�e\�6��Y���Yu/2X""$	�S�hAp#�Y\�e�U�P�R�pM1�Y0�?�ޜ����k�YO�����*�����}J�dh0��l���V!I��g��t��4��x�A�)G#D�9���88���a�mw�<����v�[�y�z�wx�Q�QR\�-��u��⅌��mlD��t�Ĵ���i&)6� �Fĩ����8  � q9    �!E���D�mqz������TS:��Pҵd������0�b���#�5ɜ�6���4�y�sl��;T��uv+���T�#W�G���K��N�p�	"�z��C�N��R?���?����é�ҭq����U
�����v�z5�^J �P��-��,."(�[�5	f��CD�1JA����Z[%D�!��ݩ�
cJ��]ٚq�9er&�8'�'��%���E`�x;e�5-�P�g���'�D�iG,p6*�UcĨ��@��0@{�Ut���_[nCES�InXs��]�qN����T��ٟ������"I�^�J��h�w�����Hc);����'>�%�����Kd�zh@�
E5uD�  | �9)    �!X� TZ�lD0�t�.�QF�)J���r��� �4�?��/ ��;��>����l�l����=Rl�i��N�&��\�jB�LTe��Afc�*28M0��n��v����E�Ȧ�d�eƧwe:^��r�]t#���`8M�TZD���W�'
 ��}*Pj�U���H�LB�?OG����c��t!XS�l��6mGc+
&�Y{d�,^���K\� -j
Y	N�-���C	�B@�T�ʉ�)�}9.V4� �j��mIP/�*�	��Z��@������b��n��������O��FSL��	�~��s��.��P��Voj�Ĩ=W�S���FIo�]�T�Xy��3ɧj����EQ�)�H�D��B.�G��:O�����%��X-Ϗ���O*��4ع2��NV��� Y�?hh���^  � �9@    �!@ `VY�І"�+*x���nՒ��L�!k��	�[5�%Ɯ��Jj�3g�j���x,Q��ƒ�Y$����۔&,0OR�4�#@�������.S�$�L���#� :�j�R���n�� n�UHO�r��%g����_���ľ��(��}i}*������s_��h�����}�����ʸ�m�1�N;�R�S��=��2̩����1r����U��عD��� H�Y��P��>1(���
G��C�FF7���q�9��.��ۊ~�Y׭�ʉv��wTB>�՟/	�,��E�)R-Y�i.�����ѪƟ�G�.y[�a�"0�,
LT[��z��U"wu��9QZ�I嘽�\�t�RܔOÃr�� �<��
v�Kd���&�qˈ��  � �9W    �!� �1�Uڨ�ic;����o����U�o��.M._��D�V=�ue1A������A}�C˺��$�g�4�\=���'��	����of:\o_���j�~ᶫ:���(�.�fA;���Q��!M�	�p`~t�H�I=���4z(�;$��=�ϯ�	���9_e�2����v��,�*����%�dE�3�Z��%��Q�+
���A��"�zoR�=��XMf��b��'�7�3ÙH��F����IV���(�I�m)���Ҥ�j˙j�Pa��b5 ��0Tc5?[3����ȶY���TS���4��Y��O,�����T4��������4C
�����Z��1V��S�_^��k��\�U*TH'az\`s�'!�5^ǀ�P��  � �9n    �!D��T� �8"X&[�&󛘛ۥ�Te,��9�r<�q���I�g���4�r1�K��u$�2�x$�'��"�+��ATj�S�46��0�@�}�^Wt�sQ��&V�KI�Մ�9`�IƀB�"K�$�:�T�7ǲ����	:�D;%����}B�I7A�R�e5Ŭ����+#��o����A½gKO1{� �Jq޻�K�2���9��̸H�U�vr�>R�ˬ	N���0�����t��?0O4L����X�n�rzÖ
���GE�9���M`�d����`ɇ}��('�g�p\�Ȓ�6V��BI��0�s���&���K��i��i'�B�%E�+�b�G[��X���n)޽s�5�h@3������ �)�ӹ�@�7�D��  � �9�    �!D`?HS� �F!H+C4s�J�����ܘ/E݄}�S�Lq��<֭�Ŗs�QD\�T."52�x�V=�e1���7�6#M
���Yy�>0���;8��۾�����U�;_\����MxAWc �+.�"�(g�_�B� 즗x�����=,����,\�(X��/Y���_�K>�a�Ȕ�5v� N����$��Y5k�Z�ge�;�QImd��H3x"9�f��)r��`��/���ڠ�d|�����dTY�U����8ޙ��J�h�9��h��a_L�h<�w���c�%�;�|�k�膀����dЮ�@t+V\��N��;􈡘������L�#[=ͬ�q z"<QfF�� @� �	�u��9� 
"
^�ViFIN4JԳ^t��q�  � �9�    �!+� vV�謤��,^�V+��ͻy�U	a4��q�#Łޤ����w��$���Q#�[��z������������lB��R����u����%�p
�X�n��$����ˈ�,��^r`��%���g���V��i!�E�A���	-��PߍRՆ? ���,47��CG&� ��<~�^��ሴ�B��i�C�(���#�6�p�S���@MU�h��f���`�� !XH��2/0���O|Ѝ��^}{Q�[J`y,%!/҇�^i����_��!�XY�>Q4���8���S�-8�[7�y�ڇE��c��� �ΛnRh�pm�����؅b0ϜM� ��A�S>.2A�v81��WU
^�d�Z6�C��b])�  &����Ȳj��  � $9�    �!M�NيI��5Y�԰UZ
�\2B$sZ�P��ʬ���oA��݇�X�`fPE{P�ݶ�VR;�{�'"A3�m��f��`hv�ąqz��ZA�֩��X=)�c��=co1�n��>�	n�!��>�9c=CC��#}Y��ރ���oT�E=��A?�(�Ö�I3�U�J�}Z���]�擤؞��+#�cå��/Y�y��um��e�7X�q7��ѹ�4���G*_$ݬ5t�X2
��S"��ʯ۷�,�!s)%�Au l�[uO&ӂ>f5�`��d��=뼿�'�BD՘ L�dPXeF�hLd2�)Ffi�|+�%߽�f�B���t
_q��2�����HtԖE6	?�&z�Z:`����7�]��|�������Lҡ%�xja��PM[�ׄ�L9��p�ŏLw�s�����뒲	�@�w�x8��k�����c`?��&�&IN!���#��#
�#V������H�l�e|�]���r~����gg�Cv_�~�R��B;��&��pr���a�\����  / �9�    �!{U���BEduUʮ�2���Q%����ᨲ�*�K���.��|k���eL�/�=e�e��Mje���R�0f�u��5g$�l��Z�6�V{.y��PiK稞Z�ʲ�%(���M�#��Y0M�a�&����bUO»�eq��4�,��=hS!7��V5!(�%/"�-t��hR֔5���ؤ�e�
����k��	U\�ce�3��}t�ѭ�.��k�w��U���VUy�S(]y��/�{��w}�m,2�������L�|̕<q���%�gSc^��Xx����vtHJ4�\�vsgqK���8�B��gC��1@{F���g��
�M��!٠���9�.+3v-q�-����w�[Fy	b�J��%*�ʸm�
�Z�*����^�E���bہ�(�V  � �9�    �!  ���Zh��9RG
�C*�n�t�k�#�ueFV��3�;^Ҩq���Tg�X����Cdb�����������ڽ�R�{���D�)�A��ۂշmԞ�U#=�c�m7"I4�~B�����z>��5�q���v����f9��ӕkƙ���G_������m����wS�~�,�y�/�G����l�ϙ2�d�`!��**F���H��q|���H)�$�E&���M�/S)SP,�6]\�	�"�0�+�WGJ��B���I�N�!η4��2�4�ը��՟d|���N:6�_=�ơo<�i	�ih*�׮�z��I���*ʳΘ2��n��X�B�+^�������J�+��f�G�Ф�m� >S)��Ӷu����+� li�E�LVҁ�P]y_u�tnV�#YIi5��  � �9�    �!P  � U���dYV�dOg�9�J6�R��].�ǃ.�|����8��.N�Yy*���N�`��=���6[`4t����:m�&�vB���;�Wa_{}'KU�Q�u��oB��(���XG��B$�".Fdh�&�@�U���Q2U�CL�G;�mv��Z2	�nX@����T-7��kZ�3a�L!t���C��Q��U%ωq;h�
�E����ŧ�ou��{�{��Z��&Q��RI��ޕ�|]��!������Ax���F7��OVv��n�k�C����������);�U��u���s�/M�F7��K8K"dr>��)�����I��̤���1 �'
��z<Ņ������:���M)��)[��(�D�D.֮�h�K�e�וn�'�K  � v:    �! D XS�(asW~���,T�#T�=Ǘ���|#�PV��a�P�>��8rӮ#^!��i��4XF��@�'���*���-3�m]g���$�˜LեZ�aܴrk�qZ����U^K�y
��ec�3���g��"���N9E\��\UY���f�vUך��+{Ō�؂��t�"��Q�(^��������4��i��<ԨJ)J!�D �Km��]���<�޼R����x�f��p�[���_N��"���Ӣ
̢�����Vi�ø��l�����%f��ţ8W��5�VXq<do���ܭ�!ȓ�,���g��#�yVJy@e]]pGQl[z)>tZuO�jްx�L�{BT-օ"��c�I]��.  � n:(    �!=�
�BŨpf��ZܥPD��.��D֬	tr���x�`,�7J��+j�߲���o5��wW����&!��]�c.@�v*U1�Όjt�@�#:��z�h��#)Z�zY�0e��O�g��9�I*�D�Ĳ�O��!>���[�"z���o�����(ܮ���1-(F2�mdw��IѬ��D7��T�:b��ӗ5Ζ��.%����xlW��O�,IT�����sy��'���Y�JW`�$�	���fJ`��J��2q��+�KZ�`#�I<�غ^��/�����!����]�V������df�!��ʽx,�1�HN	R%&w�d�F�<}�o��)��|ȓ��$-Kt'+  y �:?    �!+?�Qۡ,D����j���%�J�)E��<���*���a�.2_����9�$�Kl�����Ht8���:�N���b��*��Z�I-�3�[� ���FB�f	��mq7Q&�`�S#���]W��Tސ==���T�D��E2���)�-Hob3ڧvacogf�H�e#*w�:�A�v� ���� )�J 7S��i��U�����m�?)�B����m��MF���U!��VV-�&y(���A	���%�T˘�)0��I`����%,)O������M��� Wm�b�!��e�� J��BS4[D~��Z4}a�2A�y'/�篤s�?����s� �xf��C��V�Jd�"`(W�Lp��ë�Ã���,a�^�@���+�e�m*p  � #:W    �!MR�l�Mp�U�h�Y��U��сu`P�V��T-QY!���r�������Ӧ�e�	"3��r��DTɵS�����F�;��_�Z'	�2��TdG��c<<U~y�~:;K�4W���ܞ��زPgq%�DK�y��P�*����*Aḣ����������)���%�� :����T�[<'Q$�zR�E�+6%��_�&}5�Jz��|V-ZY/��\�<��X%4P�O����ox�c&�&���tB+Y%Y�6Ɵ�]���{)�Ae��FI8�{4#�e|���׼ ����T�s�l]����7(Xɀ�JR8*�T$�� 0e�ˠ5�$*�ʰ&��X��G'�F��O����=�` �J���=*���1;���2��V���=<R�y����m�Զ4 ��Q���L��Y)���j��_�10&����y
<��3�L�IH)���T7��Te��j�fI�9��tw.�s��p�8�DƯ?n-<�4��Rf!"@�����d�������K�z,�f^������կh�*�  . �:n    �!{d5V�!Ld���|���kzk[�UE$�K��=o')��+{��6O�֢ M��JϪ�?n�V�Z�/;c�H[�c�rD��e�2S��4�(\�f"�1�
T@c�J��YYy��)�X��g�_]�^"a���$@�Q���x`%!�MC��j�.�N����ʺ��j�;�A��ƺM�1i�e�kym{�ː�J%�6K�xi<"��l�%�8�E2�AH" �j��J�ݰ�(4�7<��*��j�Ji�P=�,e��e���.��V����g�=G>�2��i4����h@R�	�T��� �A��p��,�ם�S�'�͢H1��A��ܕ�Cĵ�33�h�QyN��xӕ��Vuf�M���Tr���14��l�At���m^
D��fc�꼀0���  � �:�    �!��7�W[ �X����_+�퉝P
��6]���ɪ"sKD�sj��9�&�z�7�o��԰DY*vyԝ.�/�lZ�*����؂2ږYlN�f�Rx�e�<�tQO��)3���`H�X'�� 9 w��
Ά��+?*��Rw��bbB��P���/s+��}I	�� �m�#DO�A⩳�C��/E��/B��NMJ�	�u��V�P�̗�IF��Ѫ,�P����pVD	c�ݍs��M�UM2��S����:WjǢE��LkGY�B�{	�x������<�T�o3�O>�Ib��	T�������(]Zs\���I�#�]^��̄��%�3-���:�g�5�yM�kI~��8#Nzm�M�>�w�z���6m(��
qd�����b�%q%^  � �:�    �!���?�U�)0&��	_��RٝVw乙9�a8�j��A�eri�x���y=!A,e~�Tj�# v�!����p�@�:�+�=�8�KE�;�\DX�w'VS���^����H\TgBX��Ф�J�o]���}p�a����[�[�KO$��-��uv�ZD6 A�mw`��W ;���="���k7�Ȭu`Rf�
�`���V�Z��m�	ԥ�Z* ��Z���5S�T 6�����Q N�ߵ��,T�CAz	/~��F=�2�]LVn�{>i��+=�"�o|4�x��HF,$"B'bm|�X2�	�"�=�-F�Q�u(x�����֯ڡm��r�t��22���,`>P�ޓ��5��n񙤔Q4�2����gv0R<�w���'k ���  � �:�    �!�t;�S[\TG�E����n�����UU]��A_�y?��'��l�,�Tz�.u\���x���JIQᙋ=�M��D���������(��j���&�q���m�����$B@Q�RK/�fC���l����Q�Sr��:D�?	7������u���h���H�>t����xY1�(�Y�h�uC��Xi�O*Ta�\���2ls��E$��a�H�2��К˙�,p�D����"���'\n���
�E�C]���{��k�ƃq�����.�A��������$[��2I����EՃ6��12�5�$��NF�c-(���i���A%�L�ʃVtPI}���u�j����-�֛1��"	@��}�` V� ��4�&W) �g����[��)
�Me�  � �:�    �!���=�T[(�t*�X�F�h�9<�UTX������=C{p��t7?��,�Q��x��X��e�v����#��T�Y��?�y�jK6ګ�����cO�VU���|-ꢐ༠�Y
B�1g�i4��p)�R��to��_�^bbr���6B:b���^���[�W�;�]F�fl���nTJ_��EԘ1@��t��i�1��x�4�����{�y�W-�5����Kf� F0��­}�-�P`4�e��f�3�P���g�yG23��c����3�$���2����{�m�>
�	� <���H��s4�@�� ��ƴG�L���\�$t�����U��G�������M+I
�o:����Z�^ b����ǡ)�p�^x�����K�*j�����]"]�F���  � �:�    �!��p  S�!L$H�v�_h����v.�;u�u��#{h|��dK�u{���/9�y�t��vv2E�{��AS�B����i߰#xYK��M!J4R���E
L�8�.-BP�$���D7���2c���������������>UؿLzi��2b���cQ�?5�O�/!8N�Nc�]����zv�t��8h�"�F0Mvf��-z\�>�T�h��0��Wr�vsϰQWJ�hXxw}�(}��D4�H�>�c�������d���&�wf�΅*�]u�f�i��龨��&�V�"&7���ō�,�+ɦ�h�(�ϣ�S��/���`��j�E�P�����+��UlxUt�7?�ѡa:��Au�Cx�x6J ��s��C����R$�d��  � �:�    �!�P, UX�l�@��ݹ������(�ti��	K{�ke�*^.��OR�����uì�[Ht��Pw_�y,�4���F�t�ჲ��Q1�[ׁ����Vf�f�)F.��b�Y��	S�� zx:�z>#~e�b�s�.����/#ȐGW���J�/Q?5]|�kR��lc�z�	���f�
�![RS7Nz`�H�d��*�-tֈCj�:��0f�!Gi��bVm΄��
b�F+�OŚ��#GcOtH2<E��H����T�Yrme�k��+L��4W"�R>��t ��U����X"�Jt�%�Q���9�s]�O4��(������Tm�/J�G��f%��0O��jX�t�-���j�J}�ƿ���W4e3�id����v�+����(�  � �;    �!  RZ�TA�Z� <+Sf���je�;����syۃ��sB��bR,��,�s|���V<���x��_��;L���cg�¯d�G<\�\�-��fAu��L�_�;�����o���=о�$�_�獦j/�����:�a��v�*��p���E�glo��&=z�@�bx�	^6�r��W�T�<$S,M˝��JT��+�(Ѣm�)SMe!�Da�6�%�©liJP*�]���>��9�F�;SQ�|�n�$t;T��]J���ve�ݢ�~~wds��*���B�4l9�31(i'�Pc��E���v��Bk���������n~�@MO�#�eaX��
��|��%��} -�H�-�S��e�4��3�V���Aj�K!(�  � m;(    �!=��BHՊ�۳,��"�݁�@��Q+oӊ��d�/)���x�S0�>0�\C����W�$<�[������0��	����Q+�0�TӍ��K�Q�O��`�4!���ϥU����l��*f�w�m��	ʲ�M��Fwa�b��-i�:�dc������@'�NV4B�3¡T�2w/Ke�3�(E2��a2�T��h4/b�@�������Fp�;?����wxG�2���{���}le���l�eϕ��l�z�wV��jW�ۥ����A�}DN�ܷ��:��2��"S2FSea:� ���g)C�tI$��)J��fl�&�)0���>��9\E�1L����rF4\�}�AH��&H� C�  x �;?    �!`   �RZiLD1�R�[����(!J.���}C@�Gɚۚ3��KB��i���E���~��?"{���a<&N�|,�!S$���ĥ8�C��+�vX��2Z�{���ʌ��~�����C�G�z9|y�x���%�V��H�,q_LHцx\C�/E��\5S-;yyjc��p�����:�Rs�Z�K����	/n���Qk��TC�Ă��*�)FF�� �(�D��4۵b��m7�tl_XD{��l�C�FU/*}C�͂�6���V������5��w{іt30�9]Z����{�9�q���!�@fT�M���7+Fj�^[�8��è�騤��mW�����ϸ�b^�Ǯ0�	u����C�{G)2s�ۤFLe�K�⥌��  � ~;V    �!+� �W��Ж ɩwN�S��l�E(q,
:��޵S�9+b�+���uK�ti�L���*̽ C�v�a�Bi^����0�P\��,.FJ̔�G_�a����b@z�+�ƽZ�gz)����P�BVe���l~
¦y��sRM1�gd>�V�Ke���
ӬM�h��Ŝ!���\|��S���q+)N�*ZҾ0
;51�!a�+�x�(�l��.�:馶T%M3]�7ҴW���+�{��7�{]�8��̱uU�6���Hyp.E\�Ю&UA9S�[�~Yj���kz�]L~���I��1ԇ��er�2��-�Y
��`N͠iH�^I]L�e�J2����?�\�����d�G��%�A{���6�*V���  � ;m    �!M�PY��H-K�`�]���H x�/4`*��%���sSB��A�������:˜���J��r�$H�(�:at{�� _>�Q�\���>:�L�"_��'��.����1I�p��6�0<�YH5��o��}��-U��'b����:�EM�y�Ԡ�}?/����<�ko������-٧T!�:l
,��Z����ڟ�����L���F�Άؠ���ʤ��I��xT�1��D�������a0�(`}�7�S;�U�1��Z�� s�>�U}Gc��55
�+J^@���d�G�� ��	Y��Å��v�@�@�<S�c6Y�1)A¶�7Ȱxߒ�U���e�C(���|�V$�w�O�sy�z���Xo)	�,�e q��S�qؼY`�{x|�Z� I!Ў7Op �*�b},S������q��߀ ����IČ��[Y$ZY_�K�hI�g\�1���},�����=k�eU�C����5f#96V��ԥ�"�=��z�b�l�Ӟx���l� ����/�4W��I�f�c�. 8  ( �;�    �!{]����z��7\��K�{�B�E���~;�{&k$y�M�4�,��$�s4��d�X	d�c��+�C_����Y�#������1��{o�:ʵk��2H,}]����:^�:ޏ.3�!ou��r*���\/�%M�jF�,�I�>-}ӎH�8�Yg�e��Q���͕�]J[�}2O%#k'?2AJL�B�+�9W�{�R��p ��2��AZ���[*�B�)@�]����������mJ��m꧶�E;���GE%���jo��b�`����I��~����.��ø��x
mk*��u�0i�k��Fv;�T�;%���q�c� �3�����3P���Z�ڕ�a�ҕnZ�dK��<��Z�U��4xΔ�UYd�4�!t1�W�׀�'�"`A�F��I�0���8  � �;�    �!e���a�Xh�X�_�s�ũut�%$���#�[�I������gk��kM����Wk�
�����?w�p��V�z�+��܅�_��-�3�m3$�QM�M?�VXta�X���N�������J����\����L��*�Cg�n%h�v�k"yZ��(��Ŗl�eRx6)���?<�{"RҼv>�TxH����wE%��`�a�ާ���Wk���,4@�<��[�7͸Ĩ���H�,_|�De�v��pI\t��Ѯ$,l�*�����/�wZfJ�� k���ڼV��[��N��ɈH�ٍ��m9e�|��#P��r��WX	���3�Np�j�4QV�5\҂\��d�i�W��]�V{�-?��^1 &ݕ�5T$�PV��i\��܅�KǼ��#]���)�Xĵ�YK���>xD.�1,��  � �;�    �!�4VۡB"XӞ��������w��Ik��ƊJ��%+
�~t�2��o�9���~*4�S=6�46B�#��ʜ��H2�9n��&�%hJ�>`�B��!���*H�Yƈc��_D�
��P,�	�~����G�/c�����Ӹ�`+��P��,�4�-ֿ���&�⸪I�֛X����`�31#?���2�+ �n��ҙ(e��ә��%ei��wu(�˵.H���:"r�7IPȾ7�L-��ʣp_�#Hl7�ܠȨal�+������kK�vs�� NMj��4��f ��Z�����g���#��6&�)�Mb2)���e-���N6N
2 �u�)������I(DI�{��tN���:
�z���d"��m�\x���SQ_H�  � �;�    �!<�WX�Pu$��K��������\�J�Z���	}	x/ߍJ�KH>� [�?7�̛�����Cn��ZMMd���Y�
��3�5�ë.�?��wWxw��D#,���-r����[QM6�B�l�ф�
�)�԰� �%8�B����>ͮU��DV~MFu2!}zJ]џ����)���H&���|\t� =��5��t�ʤ��S�PD8��&	�=�5nYeV�*��R�/���D�b�ߟ~m�}�語����ͽ���q�{�S��~f�Z�P)W pIA���Q4�`�';1��B�d���%��Y�6���M>f�0� ����Q�*ڵV.g<4"�m�
�MAp���0p��]�0#C ����7�`|�XS�T�#U���8  � �;�    �!<�SZ�v(���J��s	���X(�%4�B!�vh��u���%Ҭ�uK�,�?A�S���o���媘���R0�C�J�vrA\Ei�=�a '�0��K؆�1r ?8Ы�0���@p �����o�D9Ⱥ2�<�!'s������Ӥ�a�2��R@�L��R�a���$V�]>�4*�� >���8)�|V���k�����y�p ���rW��� *��F:�"�bA���9jD���K��.�_�E���?��9��17�jk_���p]�l��/���\u���1���q�O�5KQd�������S7��Td*`���r�
���]��|�^�l�8��W�ь*��_7"i��
��N\�`m �\��J� �9e����y6s_`�  � �;�    �!�=�UZh�Y#�(Ɩ3u�=j��ʬ���j�-�	\o�s����7H��NX�1�~s�aҤ}ͪX5��2J�h�*�� �����̵�T�.;�Q{E[�cQ��.#U����ϣ�ʉ��l�����y�B�TQ�FD(	�:�1A9�&�*#
��DD+��FM�����1s�n>�"t9[O����f
��d��[�&��jgZ�� DF9\@k�V�W��
����b���A@����ɓ23�ͮ�n�o(���gK(�?7��x5�Q��D��~8ʠ�/F�����El�Kt����n K_�`�"]w��P�ނ<)��%�A �� Y�٤>�]G�Oݗ�v�/7�n��+��ҿ��=�(팄�3����ᬡ�u� ]',�� �5  � �<    �!��V[(������+$�Ю���o8��YZ�z�p1� -PLop��˝ ;�*�n����s7�������x�."�h�J���ԊcȨ�4��-ʰ.e
T��zgw.�y~JP���.1�\��d^�|1%��8Գy����/�1wu5"�s�6�f�հ��	S]<$�us*���n���@�p#�QEc��B��v]J��SĜ�wH��� c���ZS!.Y�c\�*��|�UX���P2~ւo:4��$����[nt�P��Ʊ�u�'����̺l�zĘ��ԄM���Y+{Z�d����D������匱�F�x]��x�d�X(���7 ��Kr��m(+��sx��Ǩ;�UW�d���A�	�{bb��3Js�IRf�2��k( Q�$��*�}c�R  � �<'    �!@� U[!.&D+H�t��:�N��2��X$�-񩜏���,6<� w�ߪ�0���^s�x�mͼU�;2J�[�%�kЍ>�#$� ��Jp�u�|A�L�K�����"�?�U�g�"@Gg���7��A�M ��C9@7 k�Í���er���3<al~��s>�����q�<�l�-�f���߾@HK\䰎�0�RՂ�hU쥙R���Bʮ��r�m���b!�F�����o�DS�	i 0ΛY��0_�s���UQ�>��w�[d�FX��u~^|�kD�H�0��أf��O�e��#	�8��%p�fa<�z�Y?qcU���s�0��Li��1C�|��y�f�$W��V>���1���Q��J���_FD�®�*T���q���I�]TT�%�����s�Z��l����  � �<>    �!D�W[�nf��68N4�hn��U��ul�����C����ڮ)eʼ��Z��a"c9��{{��f�[������im��K�^���'ռ�J��u�MۻI�(E��
�p�>�A��#s�kU$�{�
�.��^�$~���M;�����ؙ��Vj�I����G�=�Wffj�8M,Ke� Ӿ^:�"Aly����ʕ�  �
Ƣ�a��f�����RB
R�E�P/��A{��W�9�Ia#S�e��v�2~���ؤ�"�b�Jf�V���!����pΡ9MA�)�_�~�܀��wYet��gyr�����C�^ߺ}s� Z���x5����x���H�vrG
�u��.��wf+{�� l ��Oe�МE�gI�����g��g]pN ѡ�{Aڨ��  � �<U    �!�<VZ��&���a�Eo%K��[�u�֊UV|Q�ґ\ۛb-�4�y��9�q�� �
�-�b��靽�6�����������g�H�P�}��c>قN���	*��r�Ϸ���A��L�|m���?�@�@#�5M#x�����p> 2v̡�N��^Pn"�� $��A�+�(J�ք�	}ފ��
Hv��1}lAQY�U�������(	��'�/Wb�Xh�8h#���ҩJ�h kYv:����)��X��,LZiX�:��S����Z6T5KO�F��e0���MMC|���fwv��n��L��X�-s�`$�-���d��ò�9�/�����c ��J�wyPv�ʄ�u��d=��E?)����� H���ttZ��藙dMi��D���  � �<m    �!�Sڨ�'
H�5��J̑*/��^�}b��.J��6��8;��rN��U9-A��e���#B����zT�����E-_OX��ed�6w�,��ډE��Ƃ����T�-�7��+����`DW;�ۏ;>+�U��N�"�W�@S%V��e�ZoUǷ�Lx"osV��c�	�ƾ4��'TW�B�J�"���R��ؑL�,�Z����gz� B2H4��ZS��B͡ҹS�tEk�,UUuT�
��r>fٳ�'!�x�7	�#�,J)Z�K�\���i0Lsmy-Ft��B�x�7��-�hEj5ń"���n�h��r��-D��QJ$��C��J�y���`��eJ���Vi�Õ9��t�:`�T�@� �M� �D�t��n�^e���  R��  � �<�    �!�	<S[ �9#�Q� B�ޙ�ܩr�\��S���\	w\�y���c��L1rF*.�#"m�n��U�#/�)P��\n �s�����YE�|2TM?4�0�r����E�]vP]s���k�%�I��D��i󳙐����O�]f9W����A�>���gt����B�x��
���m6�<�I�$�M.��M���%m�yኘ����J�A0�@1 Dܸ�Z�R�X�WrE�6\6o' �*����D�j��,�
��F��?��������N�F��l?���X�����~��(-i�6��!yj�.,��ac#�S-{�1��Ra-�J�����mL��dTSP\��:��h���ι�k.��T@�4�7��<)l�Z
�᨝�f�,�+  � �<�    �!�8($T[!.4:�V7��u(���L�����֮�����٥����ߩ}�v�����i�$���e�۶�IKl͚�Ҧ��x�P(ޥ��H��e7xd�ݙ^��+\0�Bk�n�ޕ1I���Rr4@�hN�X
C��LP�X�S��tsd�J�� �G�X�N�˦"Q�v�	RU�6W���r�IL
>)�S)��$��)��.����_����Fd)�AZUf��7�[���/P�1mS���
���d�j��!Eܛ-�͝�a|������m^2;���'�����%�c�y�-MP���"z׎*�IF�,�	�H�x��(�p_	��i�?�m��ʡ��-z#R-d'rH��yN=�+�S�r���I�o�*�F�/wH|��7U�0��.�)oB����9./��'z�H�  � �<�    �!T�8DW[!.&+^�JW���&_&&*�MY2;dG��͹�+C7�ׇ ���W��3]�.���1�	���>$��\2�%Ϝ�VI���B�er/��i>멌Vq=�1��# �m�� 63�5��
�[5��+�{��\W�۩
���c��tm��*��G�C��Jr�c;�y�Wc�S�e1��å�J��uʥ94�"���J�51��R	m*��x�J-�ꪨMH�h:�a�)E�VV;g�I-�z͋@���J�Ϝ�2�ʕw	^z����=e�i,�r�_��tE�0�u:9����B-3��M��7А�OHz�PNm+õ+�WE�je�%g!i���u���4*�W]^+��$(� V���;J����b$ɕ,�V	��Վ��V1�&����|�  � �<�    �!<&�T[!	�5�B^F�wZ�UT8#V?��rL�����{�,H��kr�	d�ܐ��z����ӣ�����K*�:��x�0bT^XB㋕�2�0_�� ��w�y������n�p����	�xd��N�#|�L��?��H�;�C@L�S��Ԝ�2����;��9��V�����1�����L����:l%���6���K �x��Z-M�Q������]�A(�`!D��B����W)���� ^a����yIa��n��l�l�:qȽ'Ca��<���hY@����q��u$P�t�1UO1����Lz���p�R-�@RȨY��K���2�����t��M#sX�l^�`��a�5r���ţ,U��1�����6�o��� ���Ǵ��x,/<^81�6�  � �<�    �!��>�S�h�y�q��H^⡳��^U�U6�MPF*�eٷ�&Lr�:Gs���F��[����\��x�x�T��i��,��x���bVR�މ��CW���_C��.�*@����6��#��*��c9#�g)k?�@b\�)(U Z�3_wqea�?h� �fWEa*,�8�pQ�u�1I����)��d�m�nk��/�$�g�#��d�g�,��pc �}��D�	{�Y� ��QXp60�F��D0�P��o%��ެ"��=6���.�,*0���{��jk�K�(mB�����k��!򕏪0 �N�'zޚ�-*R�Tr����˕�i�7�5� KF��jo �g*�����D�����=��V�IS]���S1߉!���5A-WV��u ��t��Z��>  � �<�    �!+���?�V�j$Fkh|'�R+��>��ݱ��hfK%̶&�OFڢ�r
�nh1]�nd7�Zbp��K�/7���Bf���, -vu��h�et e�9�#JC���?�� �I�t3e�h��� ��"^Hb �k��ٺ��jJ����/Y[p^�����[I�:�42��FF3nԓ;�?v�m盛�r��i}ږ���L.:CM� �.����	����'�KڧZ�TdLl�]*53�)�X*�A�Vq�SFf�,�C��>�J[J�te�9ʪۍ�Who/k�����-3xȄa;8��� ��c�GҚ�(�7o	`;wt�p����8�s l@'��7�����s��n�uV ����ЫZa�  � =    �!M�N^U	 7��T�3@l�J�(l��b�����X*��.�YR�,����4X�}�B�tH�H�8��:�<�o`�_�}P�a��e�������r&'�*��Uܹ+W�z����ؿ��,a��>�5:P��R0`���d�킢220fl��Zwh�vO�������ev�D�jT���p�i�ل�T��P2ME!��=��7�PdG/��~��`ڱ�(����O�1�>����cݟ��'`Az�Ѳ�\���e��`��%��!4��~�Ҹʊ�k¬�L�"�cW_;o"5@IM�"��eIo��B�),jj��I�8��H�B6B,FĀ�j�J*�C�>$�@HoT�O��k�j��M�� �k�|�K(�֥�g��!ʗ���v�֫�<�pX�����ۖa-�,�4����H�Dy�*�b;pzS$�/�Iɬ��?����|*x*�F,ْQ���2�X��:���S
�+:>7{t�-Y?��wm"�_�IX/�M�&�u�r�Z�zg��&l5  $ �=&    �!{Y�8  Wۘ�& V�/�A���^�n�2U�jł8W�f ������DN����w7�i�V�q+\QWn�������MU�h�}������Tџ]��g��4nn����g3u���J;�C}/a��K�j�t�`Ǭ��Q�QVV��|ѳ7q��w�mGu赍��XB���'EwӳZfk眛?b���L��oF7���Z5 �;!+	���C���oI�\�4�(�%��ظÜ��ˡ�����m��LQn*0�5+�^��Jj�8�V�6�������az㇆�*�6��}�ӷ�n�9B��+�j<�h����ނ���^gZ�d�*�3Xj�}#�Pe\����|ŕ�rd��K�����:����$��J��	� �`2�9����Nt(�A�X��  � �=>    �!��8U� �h���RPc{�WuCJ�.�k�փj~�^\�B�$��v(�s��U�������{Z���6��l�z��B҉� �Yjf�<A���	c�d��ϗ��R��́ Wd�8�N�!�ar�T�V�z�+����ν�&TW�hm��6ܧβn����^6[�	��A{XXB7ٖj�
�����H�%XFL�*�g\�yy�$2��M��*����q�hY��9�lU7��⃕ŝP"@�v���m������EҤ���W{���I�&^{d�]@��������Y� ��$��6!���&�[B>w����yf[:���o8��C[�p�N.N�u�|��;�r���ՈY�Hՠ���,�7�I�J=�߉=@�K��f-L�%:�,��d�Y���φWb�,  � �=U    �!��< Xۡ V��2z��5X���8�, 
���B��qr�X
�N?��9�x7�F �e=�?����QhM� w4u����ܒ�=�;XQŖ\�����-j���#=ޡ@]v����jyh�aJQ5�%*��[
dd�e��a�������b�5��K���tc�V{/U��p��F�%���s<L|��(�Q�D��j|�W��Q�b2Fb�LK%%��`����e\��Q��mn�Lp�]�۳x��PkFM+���%�rǺ���ݠ�Gi�w�k)T�C.� ��Ce���R�6�S�WՂ�8I֖���I�k#�!�I�����lab¶��Dgi��=ybvE��b���+<�*�B�#dBlJ�Ij����9�첯)�j�!hT��)G`i�Ή�s?  � �=l    �!�<�U�!2D*��М�U����j�ݰ�jZ��OE���f͡\�
p�~���9�y(r�"�	���d�v�3�	�|�EB��;�1F��PSeHvޣx&p�z�"���#43��eL���씗-�T�K�L��=�I2^I����蘤��0ٹ�!:o�$�Ȓ�ٽ� ��Ҵ�� Hc�a�����*�J
�B�Z#z4��zl��7-�?�5�sv"ʦR���8�e�'_�A[��{_�q1<>��A����oD��Խ=��j� @f�薪G$$dsg*I٘�%�ܐ\��D7��8��6h̷�pp���9��,�U#%u�V���P1l��f�ZĖ�O0�]-��׽z���MjO]x� Z�'H_o_`�3R��
ȵPٖ�h��X��J��X����5k+1Z�ca�  � �=�    �!�<�Uۨ�8	L+k[����'�E�V�wC]MX�O�Q�ҋq���L�+�0V��(j��f3t\�ycf����&�<S���Q�_�zLN��j#~����Pؔem�a����r�펾yAF2��6ww�CP)��b�x��S_T�Y��9��_�j���_����<zf!W�6Z�i*u�'�ךU�����X��vH ��J#AN0�椎��� ��2��0#���<�EH�U`ӊJ��M�/���}*��<�J����@Zj���ج"*�Lĵ��Z��=�{eH]1ƅ���w�V8�S��/xY~�7�w�/*�!^ੳ��##�~��nu�3,_���x��)����@y���<z��/-"Z	��� �  � �=�    �!��?�Sۘv�#	Bl�	�/�Ų��%�Q���B-��!��H:
��t��_{3[�4����|b�d.����Qq/FPm�t��˞��U�:�H��0ƌ����v�^P�X�I�T\����6�Q_�2��91��l\ͧ���`S��B�ﴅ�[�� *�6s9��Y�9�	=:����B�%/��u��Eu��y8�F����)��J[m�I�K� RY��#���B�{x�eЭ��Ɓ���N�ts;]����}��m�,��g�Cr}wo�T!����+��C�T�.��G
�S0��hEgv�yz��;]�~b�u����Wrň���_��w*ڲX
�X����TTvvp�#M��  � �=�    �!�#�! S[��6B�6������j�B��h�D�e(C.Xϟ��O^��ZH��čV���~��f�RԜ'�nwc�9D�W��N��$P�����1��/q�nns�_�s�Z}�9�k_�+3R���a����t8�z��~�_��I.c���T�}�#�T>#����j�9yi�Zv��rq�����O�H2a��D�jAj�}�B�Sf�̏b��h�p`�zk4��A��B�l(�;d%iR�c*��#@$=ȶ���%A��v��E���� �yQ~��.��>j۪>��!�*(2�d��P�ϣm��� �:��~j����G��TY��d^L��A1d���?���=\ D4��|y�-��P��,�G�z^��� �W�}�͡;�m�L�gL� ,�~�� �i>\/׷V�hp  � �=�    �!��@V[!D2�+ywkK�譑�����.�Zư��L�A!�]�!m��/h�\�#��bso���S���c@\o��DU0�K!�:�a9���kk�kϔ�Z��5ӡ�b�/͡%��ғ�|z��<{��8�%e�o���g�4�Mt�{���RA����7���>�)���l��Dg��K¯�=�Dc�YJ�R��C\��{E���	'FL�/���ԇ�K�Qh��P���wEgWM�o��
�9R��L�X�P Zqʠ�)񌪆*Y��'׈�~�Cd� �
�KE]�դ&�v���'��b	+ys�Qb�GJnw��$���jM���Xq:E���o�$�4�����M�����,�b��n�_��8Lu�T��݈��P��^H���d�
�^M��ab�%�N�f������U��  � �=�    �!( W�h�wJ,>�h1U����:1ILq$��ӷ�|�+ r5!�y��>�-@�#n����7���w�)'I�pa�V��S���O�������q ��R�Ύ�I/��*�[J��/4�&�����O'03��5F�9\&�w:�fQ�"�	����{�Q7w���|�B;!�6�k���,d���-�%��N	i�*a���Z���J��66�C��squ��U�oL�\K�%
"Á��K�X��:*5�ᗮ'�>e�3�������,Iҽi8��{�)�?��i�/0��c�v�,��6:�����$���Y	T��ީ�l|վca	���sN�̟�Gn�O��k��_O���H.6�[(��&%ن`�-q�Dn�1�#�����8  � �=�    �!�	@S�aF�&_�ګcg�֛1
qtp���,�@��$^:O�]1W1g��-��m$��U�q%ϸ��S��k�Wվe9
�b0<D�τ������� O_�cPg�a-5f�l����G�3o������Y�wqh�����槇W6Or���V�u�!��X��	+B�BPFl��)�m��b"�eqf"�=��b �HC8�����(f�LS����;��'H�a?���4����!9���6����իH�DHp�3B�� ��@�F �u��|H|5u�rBR����d�#Gh� �9�FG�n�fz�ֻ=����n��j�����q|=5�ӄ�2��P�/��H� ��R�#��B�ɬ���J3!��uR"Q�l�8  � �>    �!���-�R�).&�V6����OG����`�n��)�It��Y��>*��a������R(He-�_[E2�l�Jx�<$f;�b�ąй"�
anZ)%,0F͖� G!�����{������( m�a帮�� 
j�w��ʢ�Ei��p�M�*����kI:�X��f�z���/�ᄵ�4\@:���H��`��uT�����d9LHV$�S�in6"��`��FՕ+/��+�(���%!UǗV�m`D���o��VZ~��(a	t�T>�ƝR'��2!���x���.'�5^�+N�Z�|��Ft�y���9=m����W$Mb����ps�^)�!z_��i
����צ��b�@�phV�A@�\Q�fBv��[ �qE=)��3-N  � �>&    �!�+�9�U�aG��sU��z���3��@�ݱ�i����o�1��g�{2�wN�'���j�
v�N9�LٕQ���{�jb��74xEd���U�����Ě_�� ��^W�M��ϖ�|���eW�U�������;
���!��	yp"�=7h�������W�\ѐ�h�5`���9�6�#1Tc��Z��l�~��H���C�՗��Gmc�Xh6�'
	H�dp0V��x�� ��B�&��<I��*-���L�zAi�2�_	��	�.>���:�Y��ʰ4z3$#v�)H",dj��X�#Y	�\�/����<x]��z̆�05cA�x��ŝC�R7#Kpwd�;j����2�W�<��EC�k׺0y�A@��jDp  � �>=    �!�<@R�h�y"H$	AWI�a�_^�l(5�2���=���G�� 1��H&��d;d�	�ly߿/V<���"y�̃�-fQq�omK���Ɏ��'�ǉD%����mŧw�դ��>"�}a�3|���x>�H "���|�!��[����_��zo�qvt"�<��B+u�
�ݷ�ͫ�d�,k����Q�%Oo��'[j����EB��Ȓ��2 �3yi&�b��g�4Ul���0���VV�~��X+���U���;�t���~GM�V>�4�Q<I*s��e�ר�,�	2��lPB�[cM��B�S�)�0�
u1h���.��FJ���O�z��jۦ�����=a�2+Z&�X% ��.kT�O��@ƍIַ�� �>�eF�$j _%8  � �>T    �!��  U[ �7 X�d%��5��e\����3.i��|�O��Of�΂�J��}1IL��2�`������y��j��KJ![�$�:��"@<�4�8��;�举'��J�{����\���eZw�zͲsz����ٚ{mk��M`�r,_�ٜƱ!^�g��ѝTz�U8^>������RW!j��Ii����<f�!�"�S2H�	\��p���]Ql��X��Y��q��]�z�mnW.�$�V8������\��;ɝ�ˑ����?F�^SM��3�]@�7SE&g�E������iFt�0,~rg0�]!�����˥��FH���W����9-�h�I�/&S�%L��@id�,��w�˅��QXȯ�.�<Ó(4�˫���P-�jL\˫v��^�Wt�Љ8׬R�HO��q�e�Ѽ҅�  � �>k    �!��5@Sۡ&	H,)*�YNm�����Uwy�,<K#�$R��y����6?�����)!��ϼÕZGr���.�,|dK�N��?��,*5u�,@��Á\����e%u��p^Yzܚ�u��m׫ "���Ơ0?�2�8�l��(���99�=ҙ.���~�����bj�#.�1�c�̀�\q\��"j�X���)��2�V�p��%�:L�QR�1�����ʅ}�J��G2��g���������$�޾2��]r�k�=Qh�� �9��Ɉ=C܊9ar�d����� �\���b����g��P*0m�(P�i5p��!�6w@��E$iEP��HI]B�o@:�BSJ\��=Я�_0/X�h�˱��M�k@6x��j  � �>�    �!���4FT۔v(���q�@I|��w��8��qfP���Ӓ4�o7�G�IJ-�*h�pPN��F<�Pb�P�b�̡���������rI'ED��(O�������67�V2�ޙӦ+�Nf���/F��@)���.�u] &y�N���	�I�逸0>�Ec�r�u�S��y\/-DN�F�U)�q�Č.P�]���TĽ�-5r��L� �]�DdhE�{�wS[!L(���庮o}���S��)�l�ؔ��9s�,QL���J/��^���6����~I���3
�P���cˢ������4�V�q�m�fle�	�%#	�T�͉�$uQ`C2U$��T"�##�;�� ��JVů6�$��g�xs�p��I\B����2���RyeB�c ��  � �>�    �!	��=�T�ih#��S���ՙ��n�/�oeU1x4��V�uvmO���h�s��;�~�H�;T����y$L�;ߗI\��s�v�(0�O-0̓�ˇ0�C�N���Y���e-_����_����)d������O��ȉ��uV�|�l}��u黎}�ؒ��/�_��N9��"�����]��^7wö�x�7A[j �Y�w@#HKY�E�`�(�R�)a���. C-`)-4V4�� � AD�OJ�V���T��lgA��uZ�?� L��MEn"#Xٷz+%̑$��y��S�' ���m�( }H4U$��>�ϵ�0Jo�h��T� MieCq�Ua��Hd<T��{&�+�f��Ns�ж�r�?\vg9���"$7�<�"x�%h�����S�H��2�  � �>�    �!L��}�Q](V6��A��` ��U*��F@��^1}�;Y�N���'3l�*f�R�8��2�B��@"�6$��Jwf��zh�}�vHx[���!q�+r�n��yʂ͔�D��H'-�0��SAҝ�ފ:�JC�ݙ@ ��z��y��	�ؠ��.<�4���!o(p��,bTyt'�w��Q}�Z�]���n�K<*��ƫ;'b�a��}a���Y���=�n�涬:fΜf$���σB�-���`��@�U�fiZx�(��M!�t��gπ�6v���������
s>��gd�l�����(cw+Q(���W��C�PTP )�-�8+� �î� ����я>�Z� 0��3��u�M=�TT z�[��$� m[K �  � �>�    �!݌�@�Uکf���\��w��ʪ�l�MX/���HG�|e��<�:�[O�1H�j����0�!��`cB��3�s�hl�G.�ދE�+CU���~eas^�.p��j��^k��x@I�(�\�<�.�[3�M��b��;��B/�)��W�s:f����� XAF8�ϭ�����=�p�����rHX�Լ��^_���p��L W��" #t����
�RV�*
��a����pZ���=��ej�`�J�?�(E.-��oӓgO�ي�כx �b�����c��@�ɖ_E�|4p���w�]65���WV�ԫ�����ßt��h�&�Fu�1:�T`n�,�����Y����� 1H�����쟪��v� <��Z�|t�L}2Yu+�f���� �T���Ã�p6�9�mʡqYO�9�[~՗  � �>�    �!�  Xڠ�V�c�5������W����D��#a�|��]�<�v�8l�\e�T0�=��'���X߸�����n�xQ�X��M�4���<R�e�s>§%���&s`v�2b�(	��O4������K@4-x@�Z�9�VSN�����5��X�����g|J�R�m0H�L� /w���"�'�^:}�k�\xEذ�1Y;���aY���Ql���(�X0�˕U���P�]SWJ��<$]�x���t��a���xN��v>"�����4���c���G�����q����5�"�3	IdNR��?@���)�(����MYs�w�_��tE����I����uР�/�R�AQRLQ`0�45��.5�м�� ����`��1
� ���BJ��UVC�@�����
�����  � z>�    �!
� 8  U[ �7	
.7좻�\b^A3W�.t��m�nZ�9�x)�aN�|I@��S�\������d�Ƹ�%�e2��J/W	 7H�E(r[�' �__�h0�(��Y%k�� dB�f+��� �q5�iqCGt���읫���d�<M�3l�uT���]5�L�F�b���ӏa(:	�a�Y�+-�
����������X�N��a��(!�0�zfT䒦�w[*��s�<���) ��7a�ҷN&��FR��!�-w4U�D�_\�a��R�bG�9[�e�p���d�f Pu��8��
E�
����x�mN�\rw��5��,j"�+��Fs13R�eTW�6N��2��%�C%i	H����t���-0q� A��p  � �?    �! ��U�!.6	��n<�����y�)G����.(q�EErUS0��7�P~M����9�����_���U7'��I����&I�c?��XL�I��QUw�ř_�bZ{z�e�ˢ�Y��<�3�%Ȫ�d��y&o�7I�-�~@O�f��{,�nyv�ҟ[��#]ORb[�bM7��H�4��N��:�CX_WFQNv���%��c��B�g(V�Nu��(�
j.���^��O
>`���׃��87P;9`zg�B����������62�R7lQeъ	@��ˀ¡md�c���i�c�mҵ:�_(�)�^�p6a��훪��+� �,���P zKoXʊ�t��ͯ��K:�ʧt3�`���jƞ4���*DԈ��6��o�H���J��,씆���  � �?%    �!\��=OV�(�G�5�uw�+//~���UC�]���Bҝ�kBUz��Z�ev���r�:l� P%�#UA|E�y@ş5pM��4�e��1c����1|���y���-����1�}��j-�5R�}tr��cb� ��s��4j���hԸۅ�8��auL��9����޼���`�q�WD��G0��jjF4���!�I��EihJ����]�Ā�PlHBN6��\��lF��-{`��Y�Đ
;���)����/���5-7m�Q%+��A�
px�_��đf.Ԍ��%��^�f�U!�H��{�bD����m�睇�w��L���9~��ܶ���e�1e� qN�T���� '@)PK�  � �?<    �!H��=�Q�VJ��a)@sZ`���L9��q�����|9����<����PL�oN����O��l��,i@,�|L�����;B�c�����4P{�P�D� ʵJ�&��?A���&�Fy~�@^����`&[vů��ͅ�uC��X^����0`�;j!r?â<�ђ;�>��]�Ʒ+_��ʑЂ�Y�Z��7�7T������ؖ���9{�+�	B	a�q�%���[�h�)�*,��4�"AE���.��墌�(1��f�n�[���U�
�ԪI����Ex��w����&\>'��I�3|c`s0�2��`L��ө4�9B8_�l��9ݨ�1��i�	J4�"�K�1��P~{g vpV)��P���<-���#���  � �?T    �!���?�R\��F��(���29�?'��P�z��N���f��lֺ侰�"�q�2+��9��֯6��Ʋ�b�k:1�����	���$���-q��ma�A���)%"��#� e�% @f��9��z!��̈)t�4���矢�j�vn�+kc�!}ݘ����0n"@FK��e�L���g8n�1���Y�3�浢,�x�0)r�ܭ��R��Փ�z�P5����GM�Z%#'�����)��JC�a��f#D���� G���9����EXq�a��:��Vh6B9d25I�K�r	��K�6�3U4J��=nd���VI��1���es�,�'~�W<�)��1,#1ܬOW�qR�Q_�$h�Z�rrp6e�P��P p  � �?k    �!���@R[`rvH*EP�3p����&�$��
R��3h�sS��B�g�EƷ�?r���
�(��)�L���L�֧l�y/����.�=9wi�N���z��Fs��gxs���k|e�T�2�$�B�K������`�/�E��|i[�ǁ7���2�P���2hn�w�� 5s"�:�p��m�wX��9+M�X�0K��?g8����JF���T���Gj�����f��;����w���U�Y
�S�W��0���Mi���彺���n�Z�6���'c�FC�h6U=�p�hཌ��PQ��>]Zׄ���M�� `g)&��y�i�W��2<�s!PIs#m����� �WO($ �=��[��Uy.�(K���C�nD�ז�h�^\��`��,�&���%T�/� ��  � �?�    �!@�8 T[`�������&Y��ׄ�ޫ`jֱ�u�&͝�Yڠ�0�́(�֮b��<NT6�_��dD"s&�H�0�R~۳n�È�:�� �5�����aS8ލ�7̈$}P�W&Z`]��C�H�|86&�����8��ΐG��i�@Q��F�g��z|�e�m1�_��F����̈́�d�I�/ �EТz���'r�t˿m��%���a�X(�Q)\�R�����)��E�ԁ�ծ]<2������0��p�ޢ��3t��%Gv�W(ve&��T��,�
݇��Ѱߠ^i�wM�����C_��S��6�W����{L^��:+�]-������W�w���BW��s�p}��e9�-�.Lh���qj[������ ���-�T���m�="��e�g8�b�R՜V!���"�$  � �?�    �!X(8 S�i�7+	D�8/{�e�<5�>W��.Qk�%1��Ѳ���๝��>��V.��o>��빟شMX���՞/���
јr�$�;<|��-\�]���+��f�V~�q:z�y�$�3}����Ůf��K�4�~�{���!z�/H���{�ƹi_�4�y�B6�X�i8��%��y�V��Y@JS�ePk�%L-q���.�A�Al4V�3���&��91�{�X�ɔ��*�i�:9���rZ�Q�̽S -v��7��-���?� ��g��c�}=u�0n�ptO6v��������� n�FIT3�E3����%Ċ�̠�f�Mo|.�5��"�}���xo� $	��ch+�W��XIlR_"*�����y�H����+�Б\QD�  � �?�    �!�8@Q�(����V�Tb�y�u���NnQ�S};�bT���K�I�]WrV�L��Q�oًE�����Ϭڤy��&Y*e79r� �p��_���oXb��3�,�~�����.�2�>R2�f%Z��$�>�� ��-�7`��yN�;�Ř��D���~,�C�.�����Kb��ۢ�z�0��ncEMh)� OU5��A<�T�(!ۜ�P���� �XH`
V�W�R�F/6���-�$��3P��P����F�ݒO��w.J��5�Y?��i�K�6� ��RW`b�N��K֌���� #�2tl�|�ф@
K��'f�ewH�tKOb$�ww-_ʹf��ȵ�V��v����#����Y<�V��`�����}h=��!� 0�����z�Q
ێI9�$��  � �?�    �!���-�Q�(�J	���20�|{�&��F�,'s�q4,nI����CI�FUw+�K{?5�c��%
8K3�mݗ3eH�S�lY9n����EF�����_��[1_�K=/<��?��A�p{��� 3{}��-�Z1m�������y��JU)U�?���-��,�_o~�{ӏ���A3�gz������@���
F�*�w�|	�Wr"�s�C(���U3q�O0Cf�2,E!�&R��4�.��+�A��:<<���r��W��/l�a��$���OL�ƒ�a�t��y=r�J~m:���<	�������7���	�4�2pU���[H�`hDZR�
�d��Sx��R���v�1q֚�
�⠇II���N{i� o8c-9Ť<X�[�4��(�}��  � �?�    �!O�1�T\68��mKU�7��y�8��2����,4��t����-�2K�#47pSx8�x��2=�Р��A�Jk�M?�DD{��c�`/2��,
�˶훓A+M&p����cas�z�:���m6]o�b,�j��JR�(��I-}fB�,33��@6B1:!mD$8�{�!���d����_s=�f����V������� 	�F%	5�Y�EJ���Kd �X-���0�j@�"�ꊁt�1Ta} ,�.	2�3ڲ�F�[\F��٧�䫛c�)yH��qBT�=�� <�������>q��%�@Mi��!��-8@I�P�=I".�+��N~�x8��6o��代��zӺ�?��k+@��ZF�����Ҏ��0����g����Q��t�2�H�8  � �?�    �!уx �TY�lH
,!��ɓ�9�.��-����0�C����M�W���H�\�!T�������1����.��p�%�R�	)�	9��" O�V��+�j�k��;Yk�PF�Z��jBY��@y�X�H���XR���lk�i�`��[���K� ���$B��ޔ��6۾]yF���U��� �W�AAN��¹����I�D,�kp�@�Z#J˺i�Mj�1" �t����If��a���LdG=�]V�'�6R������"��j�@��1�`��.MC��z:�h�N�;���L��Xl�j�)(����w�j�����azg�|o���? ?Q����!/=zéx�� ��^�p�p�,G�gv)��a!""�K�o�'�T�R���-D)�g�TRhV�(����%�+F��8  � �@    �!U��DR]�tUU�)�˪FSVD�����c-c�7$�\�͊�zҿ������:K���Q�E�+�j�Lb��z�J �[G�0]�Y&Q�[�$�[�{9��מ��(�7^䌿 xֺٓL��_i2G�g|����bz�U`�b���.�JǶd��*�>�A�ȳ�$Tk�:�$F�.��H����*�_���
�f��fu��;��A��j�*M��u��I����М1^u���j�nG�'��62���+g�73����A���'U_�Fc��4��5�u��J� &?k'}�%�#�!�}�2+��<�S�D8 �9ִ7����
Xт��5ci�k��!�7��E"13~ݫ*T�X�%��*r��H:W6��lJěw��� ��J�e��ĺ�K�b��j�  � �@%    �!
���@W[!R
B-{G��i�F�6h(�$���}KH����{G�\�xn��J�N7}2?6���Q�����-)�ߖ�����)Fs��X`�iBb�j$O_���A@�Bj
/SHlP��ڷd��h�U�O�[l�y*C�!dؐ�/���Fٟ���ǔy8�ҹ� ȣ�J-������Ί�m�"�[;�h�_�����4vB\��dts��fӧw��F����N'�oO�r�;�n�b���w}[}&��q`z�/�RH4�i�Z.t�iZ+HW(>ݖy%C��剞��,I�j0��O�nL�
6iƉ9Z�n���7{^jε��|�N�����O1p;)�>�}���Y�=���=�N��/�t�Ev�������W� �v�jڅL��c �  � �@<    �! �� BUR�0�ē�kIXٯG����*����%��{��e�ScC�q苩�>��~�~ܜ?S�*1����u�L�ʩf�x�i��_����c��	�ux��E��:�tN֥�j'(���C�\�k�TK{>C %CK�8��oB��r��F��-U�ѿ	Is+&_S�!�C8��G0�%%���Nz)�FJ�T��wU`�Cu�\��2���:�gz�Z��R��} ǁ�Q���B�n���;ڻ�ږ�Oќ;
I�K������H&:�')�cEb��obۯ�7��dq�_�V�P�A^�Hp;�E�p�U K�W����W)�:Ɔ���CZO�(���gp�ɲʟq��j!Z@�3�)q�(������H[Ҟ�rR�!  � �@S    �! ��;�S�(��"�X��x�@�|{���Tf�]��#��v���n��P��G�={���?��s�� ��%S�x٨�F�8]��I}	����E7����3תj���]��=��L0g��6s�w�|.�gr}i����s��G��G �7^S�<��!�t)�%�!b9c}�zz��/�1V���r�JQ͟�ԅ3 �&8����$����m��MGt���b�X(30� �GiҌ�bC�e(%�E���n�Z�=­�����޴�(��ܜ҆xBO3D�˥ǯn�%N1 �TӉXة����)�Un]��>�tީ|�� �ba�I�qe8���wJ��Z1ל�A�,=څ-\�6��6�*�N0���o�F���p���i���7��r  � {@j    �!+
�?�SYj06
�k	�W���')Ǻ���+r��}12�jF�L�ϟ}`�Bk|���k���&�`�N�m�&�Y+O�_��
R,%�x@�_�� �M���L6�  �y:2��N�����R�$R�g7�0�ڬB��8�����L%�4_
*sV�`����"�3�=��hNU�}���a��`�`�"9#J1s�{CeY\u�c1~����C$�)r���BF�� ��ҝlb��u+�.e��������>f������^=�����&�y=z׌��=(o����s�(��RS(��!�kV���*� ���,�'�+�P�Dg˙m?A=��铡��S���-=�O�)�1H<UQZi��X�  � %@�    �!M9QVL�h*�Fh�����E4ʪ�`��CU�z̼V]94�F |-�(��w��	��Z�H����r�Q���0S���?����v
�䯒
Z���d4G]@a9ۃ�Č����0��,G[�-�n��W��k*���ʘF����öU��/q�����VϮ�8��Vi�����%r;���o E@�"##�.���X�W���?<�V���|4�+F��1�%+ˍ����O��X ��Ux�WS�]vˬ4t#�$bk{��S䰔w0�ѕ���g7���,ݝmy:K����;���CR5�����("#�\D��3B�X�	�� ��
 QZ��;��w��@X�G�PCa*>�,�) !��GxR��j���Ȇ�A�������a�ƍ��h����[TJ)w�h�8�c*O�J�����N	���4�Du:\"A���a���_�ou�ZT��=};�����o�ÁHSZ�*�S7QZ�M���WU��RJ�
\p8]�K���5�=Y�bh-$��֭ڕ��/�W׸@�ڍ߀  0 �@�    �!{u��E
���Ǎ�/�tQ(���Y\r7�Z��4���k�ݒ�MqS���td@�W���ۆ��G�9 Ql��IS�	�AQ�h���=�W��PֱY��SHV���!»�/�>��~sj������Ʈ#r���v�]�EI�^R�
��s<1L�J�	�FxH�F!mȩ�$�(�K���ǈT]��<,�'D X[�HR �vӬf�9ڷƹK�0�K�a�'���]t~%yA��{�2�wk{�3Q�S��l��X��cuwBW�&��|���wy oz����Yc,MF9zUE~���}d����ӝ��2@6��j�]f�����k�D}��
��n�
%S��Bkn�+�_�6/!�V�%�
�.�}Mpc&�ⲫ�F6��B1����  � �@�    �!�8U@U۠�6XI�Z������z�F�)�&��9�Fc���F��vˆ)�Y�m|º?8���V���������`t"�Ԩǀ͑?Z2�a{�Y &�.�g���!���%*�S�/{s�qTf@t.7j��.6�n��~�n$.����y��k�MQfh�3�F�m�U����^Q��6���J�@f�Uͱ��|c"����G�ucJص״�Y#%*��A��Ab��oG��Sĺ���GV1o�!F�Aڟ��n�d��qO^���:�xw9��ڌUy<Sæ
�+|�����sdE"#ua$i��*����\����V��,��� �Q�	�1�/,��U�ME�(�ouVU,���
����D���F�o�'�� �J�q�+�$n��Br�����e~���k�  � �@�    �!N8 @Uۘn&JV��s�2�su��x�+|lL:�*eFQvñ�U��BLGq���?[5�'0��!���Y����]k�VU\�����Z�a���P�au�O�L���)�_�@QN���fۑ1L�!���D�7hW0��z�ψ�%5'��O�Rw�p���/�}m�a|sg��-�e.;"�U�_m��2�u�BB"X/ᧇL�Qzm�jw�-�`t�d��=%�Ac!�i�_�fI]�鶍��)}�[8X2r�)����~l�+qRe�(�H�`������u���0��raؑ�&`XP�Y��l*�"s+�z�b��Ҥut���	��]g
F�M2;�3�	S'��z	�K"��QT�.a�`�;�N�
d��4�n}��=hm�+������
�k����"�� ��cK�Z��D��  � �@�    �!�)�T���(*��P�Em6ֱp���V�a�U�BJ*��6���u�A�f�̚h������s�7%��>Fɋ|�s!c�OV��{���o|��z6��J��[и�~�P7�&Q�A�3��9"�U��yYM�Mw�q�M����vh����;u��w�j�E��f
��%��̣W[��J�#��Ťk�'�f[�1�	��:^�bv��%-v�ü�d�u�D�1�b��� *���i��2�>R�XP���vN$�V�V��ʜR�S�	o����͌�A���SU�?�`��{���Js�,*��+PX���
�p�i6Lp���"Xa!���, #_k�;��͠��U�����k5|�\eR��y�_�_��������2�{��~\��rA3�ȘO����p8  � v@�    �!���U�iPG�6���{�f3�Ϭ���&�j�#EV�i��zf�c�[������@�𰛅�fe�g���Da�6���@\��`z����h2�.s�|�@���{U��9]���ǛE�#ޮ����K(y%)�)�bX;�C�qd���Q����ް2�`��1����-���W����q%�D�EU�ნ6y�΂��4��` �g_�0EJYCh�J��
���ŧU�\�Ab�U)z$ �^�ǲJ7�LO�G��Z�5eO�f���p 8i�!��0�O���'�P�i�F-����&=m
:y��5�¸I���Gq˄��0h2�dQKYj��I�Β�U� 9T
�"��+@	|e�"�����  � �A    �!���9�W�a6
H+=���U_g_-{U)F�YaG�UiՋf��1����v���CS�\�!�b�h+�icN�/.;.HԪF0zh�'Q�`9� ]�����>�l�����/�z��<�����md�����h���	S������N�{�Jg����":|D�}rA����W�*�zgG�-|�D1̿�K�0q�&A����SO���Br8�B�t���Gb�XHA�&�|�T���2�P�����!�)�D�l�;��;D��I��>��MrMҨ�l�",�:C�x�f�BY�Bx2��:}f������&m,c�˼�UW��ʿ��Uq������!� og��=�8�� j���Ӝ@4�p��Ej*Z�kq�~�����  � �A$    �!�8  U�i��2X.B�S/t/f��L�hI��oeR��\'�*]�'���rNo�N�v��:�B�q�rqƷJi�fIx΀(n�F�%���I���@��R!�[9������YC�ռ�FC�DA�R�����iH��\�b� �����c	x�R��d�/Sߘr;����z���Qi�Ԡ3�m��ek=ċ|s!�5H�	h5�� M�X����L(�p�J�v�|�k�d��VƷa����lz���a�pZUo�h7�"�+��tŕ��B���O*,Yh@mMU�f��D>a���A�b�f��s�%������ EeRJj/�-YmV�IR6DS�ǿ����m+p c�áKؘ�_PAv��R�v?A�h�!���f̝�Z��1_Qv�E�_1r֢�މč!@��h,�  � �A;    �!�0 �UX�F�,$�^�*m9$�pf�
r����@z�7y�qd���X���^5��q��7S�~6������ �`�P��v�4�q9yp�)����6$3�nf�'VW3|��?����+JNL~fr���2)��_��~%��7�������}��L]�C�_�'K�Q-�3�q1	J:�4Ö!'}VUh�E.���U<5g)MR�Ok�A�h�`3\1Ev�����|e�XpG�FG��7B�Ja��-�l��mF~��M��9����by�C�����-�����ޕ9�!@���
*#�3�d>���IB���M��! �B�ҩV��++oج�2��Y�:|lI�s���W��E�"O�o[1,�jYI�oF�������j%A�q�@��=�ti G}�Ȭ��� *�JP�  � �AS    �!��0 �S[ �fB�!��S�m�*�g֕��0KbA��H��ü��-j��]�%��s6�u�k�x�o��PƈM�"�g/��O�L���{����<��i�9�gW�]���f2��q�GOcMg��tvU�:�?�_�O��y��Ю�"��������-Ò��\� �p��2V�I_d��p�;�X/
���u���E�WP"+QK��jch��gM�)�<�zViL�]� ?:��K�IO�����	g����,�{�*e��q�R�&֞AP��m!/FP@�q�ϩ�yg��UwT�a� h5�Auy�/��p���$�=�ٖ5}�{ ��\�����#�1=�7ܕ������E�u2m"���?ꔰ �f[X����[�ʄw��؄b2�  � �Aj    �!�K��TY)��F,�K햭�e��[2S0�"�8�_@���c�(�\~g�(�awo$Yُh���$�R*c������i�Q�MM?c/�����S��p�}��8�*<:��%f�nZz���/�L��3mc�0"���]iZ.�q/��7e}r�λ �	��p�IP��D��JA$�ik�5r���>��jn��6�聦#�Yl����@Nh�ߴz�kw�~[*��4Xyᵨs��^�X̪���i��6�4;8}<��[R�~��nN��܋��|]n3�pU
��b�i�"w��'X�����\C3�MCS���.��eDR3�
�.cc|Z��+ny���P+̗ t���ʿ!�h��IpJ�S
V�ϼ+K��<��Lvi�ɒ��h��  � �A�    �!����S�`�&�
�6"�;�:�/�y�S0%�$K���b�Ԫ�>�I��lٌ����7�F��z�y\���r�s���V��-�͗�s�w��ߣU3���W��~��y^��88g8��	4��$d�	��;A��H
tq�fkZ�����k�F/��c�zU_�T����YqD,,7��r5�L��{�#u �k�DU]�"_b�Z�j�Z謲�� ����� � A1�٘���f5f�X�rI9�Ma�0�Z���@`�L=eN�`��j��;�jf�e���s�p��Pp��3t�~/BFtR��v�������S��5_P�DF(��*�MkLj9.�N���� E�!��\wh&R󌖓�����&�#�B /@�"�I�x���D�#�  � �A�    �!T���S[!26�X�%A�nOo��̓(tΐRĄ���j��h�z���#�.M3.���ғe9�k�f�O"�ΟmY8N��zL���,�0)N׹�J���J~T�����,d�7�ͫ�`�-������*����N-(_|���n�zۚ.�/|w�3�D��"�)4=���%��m{�^���P���Y�0 ����ՊR�"3�F�`�-�^��O�� ,T�&#����3B�Ta,�P#��5�ԙ�^��l���_4����:J��8yzzdd�%�:�|��B*5��=�7-���4H����z@ˌ��N��R�>uY�.I�)�Z*����Y	�L��#W�<"a��Ѿ'�L�;�E,��4Mw�S|�G�g+���Z(��Һv�Ab���p  � �A�    �!F0  U[(�'
B�B
ĢԵ�kf���b��膲�*��7)\�AH?��.lw1<��/���S:���\��Z�s�U�B���܏�ғ!�|g�S���-Z�g
	�`�kqD�"��-
�0�I��  ��H�mTYn�#3	��^	�F�ō\i�=N����D3�l-x	�NW�d��w���g�	��i
\Ґ�GS�]Bx��XUl�3����8a�4�S�n����״�E���m/�,ɉ�t9a�&��U<�j���ӎ���xE*������gDP�Ў�;lsj.�(��ג׀`��D�	蟉����Jl�QY4�,�/��� 3�mR3��*��.Suo����2,.:��92
��L��μc��� ��'KQ6� s"~��  � �A�    �!8 @U[�rf�'.T����7����	~��qh�!�����l��ħ���Y�`X��N���_>���}M_G�HS{ߥZ3@�4�^�"I��A���7��f����p�U~���@L5+��Y��ߕ�%��8�����a���?h�ӷ�B��N
�:X������Ѷ5]Yͦ/����}	���f�R4�e8d���)��M;O�
���R��q��)�wn9�U|�����nJ�[�se��-(}B�q5@9��5"�Vk0�t=1~b->2J��ڹ)��,�����4k&r���N�1��B��mBq�H�>#2X*D"́� ���"��� d�̄��ڪ7�*��TJ���<�*!�)�-���r�\Ux��$7��K�� ��W: Zg��D�`���  � �A�    �!�8 @SZh�X������2����]�H�S�� u�g�8����?�uNE�տ�勼6M���?0�Yz��J�W�l4ǠwY��~3�̧7��4�M9�13��g$a�2ʕq� �]`B[���S3�Ԡ��k������o���<v5�Z[��h��٠��'L����7��g�v|����6��ly�E.~4!/Y�U+s������p�)���2���4�S�Pދ�9�v��o4@�D��&~}7�H~_"���.?8��JaMt�&E�5"V��Xf9��.'�3�xTVNԢ'�O�<8�"�B6��5.2�5��{$5�nJ����B�{@ ����n9q�{@��H�ۋ[V{�Q!��qٮ�� +�+ب��ZS�� aW]����eY3��O���N  � �A�    �!D���T[�'�#w�L�m]�Kv����h��3"�̇���v��Y���_99�{rz��b�1�/>_V5�eD�]�f�>�������N��F���O�ZD���0��[�����z���l���.s���q�d%��1����0ƩU�qx���/��W�ظMp���5�K7"�t��b���ݖC �ҡ+��N�ewʕ;��;�(��%P,izYt��w\v�U�&.���}�y�*���磛И4�$n�ƹ���87��������Z�i�I�@U7~]NHb!e:*}z*�� ��R6����P
�B��3����AL�oX�V9��tXTF����ث�f��!3�͌k�8�	��G�� v�é GJ^���a��g0J��7^qp  � �B    �!+@��=�U]�L$DlC�T�v���LVPy����D;��e̪������Ds�Tn�N=����.��s��N�g [��2&C;��/,�,P+]�( +@�D*�ޅ���j2�8F���(S��-Db����R�mӍ�O`y0  n����O�Ru멆���"����:���C�"���i|`�TϺ%a�$%��3��K���䖨 	��RE�X��V���dѪ�Ѡ�C0NG=I�o^����aX��q5x(e�����ўl7�.up�8�xAv� N�O��.��M�G�e��өK<a&��pB'�P-�8��|c��X ��)��R���QY�������'��ܡ�m3�w�+рC2�7 �D�"L�k� �7����	��"{���  � #B#    �!M�O^\�4��T����Ʉ��AW��S!�r�UU����L��A)�>�n\�ã{R�#7%7�خ����ܞ�Q�8�u3�{�vI�t㥍_oN>�p��5����s��R�[�%Ԓ�.����F�$_M��>E���q�b��q_B"�7V��#Z�l�C��!� @����ۚMI�n�nP��ەf����+9�&��;2zt���s�Y��iΫ� ��O��-f��1
|{���0"�H@}������Ɠ���?�)��O�d�FlO�2�������,t��
�U�qF��t�$6����vE�����m^��,#g��(!����� ��n�����\N�dx$eRh�X����P�f2�U5I��<� Lb��e鷊�Ս�T�5��,yٕ�A6l�9��m���,���p����ܬ��_��4��|^�]�}�kO_I��O;�y��t����r�<�#�N����q�c���ϱ�6ɏt�5�`}u~P��մ�����UW��,�I�gϬ�$��zpܗO���a�_�e�� :�D�����mUZYu��Oqx�7�  . �B;    �!{U��Dj�3���8�$V0qb������K���>e=	��jG����9�ѥ 7 �_nJ���_��������gF�=PvU��� w��	d�W�'��}5�����;`$��rt�y5���3	��6&�Ni�<c4/W�|���xL�itÒ>�
v��.X��_L�#��x��z� Q-`�� U<5��]�Kl( ÎsSH��d!b���U«�׮����J�ص5�����?C�7��g�'S����;{��m;$�KBn�@c�KƐ��� %�Bn$�L�f�K�M�a��&
��r��ow9��9��F\U�0�����2A`��vbŏ#����鉂p9m�Q�k��*kfND�}<Vʩ��]XJ	�lL#�h����cV�wF��	A�  � �BR    �!e���B�Ebi�#������b�PԂ6�Ou
n�DŶ֕�����W�O~�(�s���Zb�7_�.V�R���\R���6_�SjۺA���ԗ́k�/��(�3^�����,��K�p�>���>H��4Yp��CQ+�	��7����W�	B{gd��u�8��䐭i%~q�L)���6�v}�)9H}��`M�/c@�i.�Y)\�u��DQ/�-�0����Y���/�9�������Ͳگ��I���z���,J��S=Y?1ZqQ̪�r$	�7��2�f����A$�:Ju��&�Y�N�*��N �?�8, �T"����Ev��$a%�-��t���OE��C���C�̺��;{����P��άx�3��NH�Q^2w��})z�d��ǩq�2���  � �Bi    �!h	  TZh�V2$T=�{�;�X��E(.�<�7�1��Y��f�w�6؀�A�!4�[6K	���#+��w�0��1Kt��&$!'ݙ�Y��g�oT�>��G�~�D
�������d�D�VV����)��ŭ����v�-߿�$^��B�j���;:��f����f��]|��_�u�O��-R���e��P�6F�a#�[쭢Lƒؚ/Ȍ�m���B(VO�lb��53(�׃I4P@l�x��ze��2������I���п*d�=$K�ro�X&��*	���Y=J���Y=�<�Bc���s��[��jk�1��?���0�\	�Y�m�~�8�Whmu��ڳ�fWL���w��C���i�Lc�"�(����O ~�Դ��ڔʤ��lb�.�ԴN  � �B�    �!�� @U[��8�mhge7L�X4�����	�}&�~b������*5T/����#e��+Py�L�w7+�G���$�i��kދ�	�9��L/��$s]���?1�O������&��8��F����n�����!
��k��4U��uW;b���_�nzΥ��uW���oMW/c���������N:滳k�Z�@��]�z!);P�K_�QN!Se�B��!ZG �`�3�������t��|�ݿ1L��&?ҹ�HU�٨Z�9��U�礈X+5rx�_
�myL+S��Ɠ�i�G�p@Y�#��K����ķ4�MGA�x�}� ��~�k�4��)�uH�۾̕W�e��\n]�(�b�PĐ2�"�ݜ�'��.V_ǒ$QO�m ���%Ѓ���mcL�0��R�J��8  � �B�    �!�� �U�i�F�,p�t��U�l�V��WC�XM���6�a���{n��^��终����柴�@�Dq�?���U!��iE,Co���6J*�f[��
^�X��[��|�*����M������m�o��}�$� ��(�3��"��6&!;뭛�[����V!�� ��y2]DT����������}�� �	�Bz�J*œ%*PII��D% �β�U֠w�mT��ՃB�4���P�[p*'-���NM�ݺ�����k���q+�����us�}�cF�R�|�͗��l��P�ք�3�N%��;�	ڗ��_��j]����A^h���G�*��m"=���s�Y��7=\w2�B����;���ݺ�Bq1��"�|���c��mw����n  � �B�    �!�'�=�S�i��6�M�Q�_����J�V	L� |7��b>'�,�6x��f���\J�L�o�$~��rwTyd�ޑ�қ��P� �6\xr?|����0?�*p�qy�ga���?kbr�P�k�pb�3����w"r��q���n ��%:��ʟolPΝ��e����;���	��B �Q��a�����
{j|�.X#S�EdkzuC�* �BR�4�HY7% M��a�!�B (���7�ua��	�4�dzi�M{#�oqu����-��߽�܉)�c��c��� (�c����p��B�d��!
<,����C9�4eD��*�O�	!���L��M�ⲉbp��{�&�S��u����u��!ƈ�e)&�zS.���:�B�gNܥ؛6�����u�  � �B�    �!���0@V۠�VDm\��+�5��y�U@��8�
0X���9�ɝ�~���B��d��|y��n�AFH�>�Xg�j]�A㌢���t�W)�����Ok�!�Nz��a�_&��"�*��=���:�*)� ��z�y���ڃ�I����������?�b�m�P��^�aB����1RbV[��Q��M�j���é�:�  n0��Be�	��@�n SYiE$� ��!)uJ�z�2uJ��rj�`ɲSқ�L��+T����6����y�1�������^BAJ Oe�61>���'���Y������xx���8us���3�k	}:B�� �?|G�����=�"0���;xowzz�z���4?�l�	HD2���'cL	Q��m-�m��@���O�t��`�փ� �  � �B�    �!(  X[(�7	B�`��o6lǑF����z�[C7iyi�ܽc7��������l�yE�ƭ0���z�.R�_]�L�8��ju.-0|� >n��pC	�g\��+���n����\�O�D�`�hJ�<�g�2$U��IZ����nX�apg��0�}� ©k��c�Q6Wp���W��u��hxxV�v!iI�C� ��.��,љ�E�����]��y H���JJ��ed�(3Y�׏�ʠ�����LNl�
.�Ǿ� �Kɬ��r'q�UPXT��d-4@�h��r�]����&�G���Iq�釶��Ju:�!Z�o����i�l�MOk�B�N/Rf�bӻ�����(��n38�$?-���bI���I�u}~~��n�"���S�S��i
����a��M�oa.�rU����Ӫ��D�; ~:� X��  � �B�    �!��  S�).6V�fX�k��S-YE�:�_��C�-���t���]�n�-S7<m�\��e�Ə�2�O�s�B�RryG���y�E�Q�*�'��L-)�ĬK�.�Gi�	�Y��*�gA"�� u�>�k/[���̱{B��JYr_�rl�awg�w�s��=NA4��������rEʅI���5d6P�YJ�c{�γSބч0ŠX'Ii�0�,5�iOS&U�@���ۺ��⁑���UԊ�p��'�����$>-�1�#��UUo$Ԉc-�`�*�N�ly^9�HQ���[t��/L�+t�n�M��5Og�>k^)A����Lv��8D��{~:Z�XW������gSMOe�1nζJ�`=�S|�_��j��6�7}	�5�1Nێw��2>�� Q8���Q9� 8  � �C    �!�  U�,�g:X��<�bݫ�q�W-P\��~&&:3�4O>��(�����&�q��������[����ᯙ�c���@��06�1��֗�ߖ7�"wu�ס��m֯i�j���7Wwl����N����~�iO��硐bX/�ėk��W�e���/kE��ypih������p������Fu��o뚎����{�Y��
)zzӒP�)ybn0�Z)h
B�0��ˑmET�qX�#��,h����o�Y�7��J��PȎ��`�l����S��#��O_�e�gK�(�Aه����;
!���փX�hH3t�1�q�Y�/s���?�5=��h��_G��M���'57�ć�h�1"�&�~�E%_��%_�1����L�0��O.8�"!f'Z	s'I/0����p  � ~C#    �!� T�!D"�XE�Ԋ�%���LV#Xj�5�2����h���;��
��jW�y�+xl��CFf�5����2iG�Z6cp#c�s��r�1��La���%DV�隬���љ�t;��9a�5ꝝ���uG�I+�S�u,Ge���:&V��ơu,XN��w��!K*��r%�s^)/ЋIv�^9P�[}Nt���N��Ok���&qq/9�[8/3c	�U/BX1�T|���h�±���>;�N�V�U�8�����]}�5l���I(�G�S�r*5�,�8D��7�����5�v�u3��B�Z��'���U6�mt9;3��8�"�PO��� ��wc�#B���@�H��6�ƨ+�fp�Kc�`�6�.-�PS�.p  � �C:    �!+�  S���(�P,�w �N�կjaD���f���y����J����6�d}J��&�7��A���J�v$��2c9q����$��3��^L~۞e���衠�`��q�;?4e���Ε3����\V����E��:�uܯI���G�z�dUE�w��`�iv��d�D^��W�d���� ��$�p��E�:K{)��V.(Y�ʺ)k�(��
��r��d	ڽ��nV���{�4��Q�w1�(��S�<�1�/�ivy�	�CZ���,���^u����C�F@+A��Yi�Tu�Ux���Z��]�9j�K�D�jx�ʗ>ÛǷ�J��lW~�7
��V��ѹN���O��Ҋ��
�j�F�� 	dF�TlJ��+bX��p  � �CQ    �!+�  TZi8���6v�o��\�����n�G}1:��	�;�o�U��)v�m@��H�D�#L��w������ǖ�b�I B�l)�c���F� y0�̟I�IlW]�/��S7��Ǐ�0�����<pgR��mh��2���g|
�t�t��UN�R�L1�/5�g}�D+�7�[5��n���O�%l��u��gQx��zЄ�]��CD۸�x�$J;d�!B����|�����̥a�����0R������K�����L��Ϙ]x����O�y����n[Ԛ���m88{���p���`EaH� <�� s@��Q1ݘg�uA����ٴ��f^*��]�IE�mߜLM��tm�_�ss���8�=r֠��1���.�[�^�3�6 }� xq[@Z�6���Q�h*�  � �Ci    �!b�  V[h�fPd{L��*	�K���N,a��I��3�����H�J ���'��0($-d?+�����$�x��8�#R�ֺ��"��(�: ���3���.(W�.��3���$_ ��q9�\#@1�@���CTEb���y=�/�h4O|��z��%x��O6[T��ܴ����hx:N��[[�4Y���n��K_���Al��iå$��L !Y\�ɚ�!RlL�+U�㨫R���}=>2�{'!vX#��OY�r���U���5�K��>T"��� T[k���	�����E�C���#^/m8�w�=�:�դ,�FΔ�]B�̶c��W{���vB0�=����lp�6���(�pڞQf%�=!ktM�%���Ǵ�Rvl�za��b/"J�R����2M�>�R@Հ�;�`���H�E�^l��  � �C�    �!�� UZiv"��WKVx��3J�n6�RN�W�\�TY��O�]���Px�dW��)�K`8�,'�0�G�@��"�>P�k����J��[���
[��Ó{6���������7�}��5<�+,��a �E���w;9r����݁H,�xw�SR���i<{�R�Xׂ�����v��E@���]  �vƳs"��:�J!�i�0KC�ڝ�
�E�c4U�
!a���������u��ۍ�/��3V�-�v&GXapi�$y��0���1G]�;�B���H�dp6��%'T��n��#dh�N������K?O��ɝ� ��ԭ֗�z�w�+]|>�8[|�E�3&�ݚ���P�и�G�Ő�R��M'QQ��yx�
+���$H��mF����PZ^q ��pJ���  � �C�    �!��  U[(�v�X5h�z8�}:�Yj仃�5g�z�VW�z�v������w/76�^�l�i��j��8��p0.`�G!Wǚ���!_��e���/����Fӫ�'���~�B��*Mn�Ƥk/-C�]@�R�P@��)�w�������S Z%y�Rz{�����!ic�u{��%�q�k��
�����.��F��5�"6g��0=�#΢�Š��*"�!.ӝ��;uݦѲ.c��J��svY��o��_�!H��犣gB�JT9�p��s��1���w���$&�.+�u�9�:�b+�E/��f� �h|�H�����=�`�72Eu��#�@�(]^����^�	..?��.�;g���@�U�wT�ʣG��(�n*�b :���^�d����T�!�qҘ �_� qb��6G  � �C�    �!L��@S]�L"
�Z�A`vy�ΩTi�qO`k���seA��ڱojү�#�`�U�˸o�"N�h�����F�O�`������v��8�Zv�zB[2��v���I��y�"WV�r�0�����@zɜ����b��s"s�j�X�@����ڀ�=tf��*Sǿ�W-<����4�?���yEIkG!+	�Nr*7P m��/Pe�Wm��Hg�E�ٷ�_~O]_h�b8SR�T��]��_��ͣQsg�j�mr<bM������B�qw�D3��T4s �77��B�� ���� �p я������ZӈC���vl<X��K�lr:&��?Q=Pj�⣝��7"D����B7 ��˴ ���T�T�NZ+R�%Tak�  � �C�    �!+g����U�(�3	�6,o�0����1��-��a��o�%�~8˱#��U��j�G>p�C(pI��Lf׃p)݄hC:�(�����k
)H}�z@���⃈ ��5�r&�u��0 ��z'�c�����;Wz����P�T�H`�/|��w���]ּW�q���'�۬I_��ɾ�����YfE�f2KqR9
K��nv�X�z0���MC�� ������Ց*��M��w!YGl�2D��(%nʫѵ�,�c��"�Z���h���2;s�R�`VT]�g��lj^
�v��g���֑ǧS�e1�%>��m�MJ�m؄�A�T66�n �����TT�����) �1��G<n�� k���a�,�p�:_\)!°�F�p  � C�    �!M9O�H.�Avj�r�I�5�B mWę΢�  JV�u�VT�bұum��Iy8LdT���$ 2��/ߤ^Bi뚘 ���lQݡc��8c:Q��q�*!����Ip����z�y��g�a{�z�����m�Amز�*���ݺC{��Vv����5,�>[�8/�v�5�=��8AA�K�^|"q��g<�m�ꒄ�ɱ��8z{�#҇��RR�ł/WSE�,k����ۨ�e�:�ǋn�m�d̍y�3C�+p�������������S5z��\�;���Z��&������5��[�Ec�|��}�0j+ ���h&�������nī+@ g���ƫ.z�s���3�{{��M!c���E܆\(�H�����g����cx��AK�(iŧgm�b93�H1+�����w��;C:�7�,%s���2�N�"�R#u�zd�[gY�0߲��@ Ů��.�8�zl�&�g<[,*]9_\���О��r�6�ZWM
�Ɵ[��!\�uS�$MHIZ
�   �C�    �!{�8  UZ��9�E�k�H��U.�5b�$l�{&j.e�-�-6�����읦��B���C���>&wM����x�0�%R�>�hvÐZ��h������/���4�l����_��E��v�fk�!sPmB��׀�bA�&e8�A{��}5���RjC�$LWrz��*+��`-�d*���ySn�E� H��՗ٗ���*'��FtI4 �:��* �8��*�--��!\x�k�Yw�Z��f����[.� ��ؖ��Oᴸ;�X�W|Q8�����_1%%���®g�c*��'�}v��A�D��J�a^����+Gt%�|�mX�މ�@����H�r��0n*)��W]s�Wr)�P�T��nL�=��aM�Ƃje���o����tګ T�@��xv )���/I ��Vו�ؕ�	ep  � �D    �!e��a�B��$9�v�m�8jJ��������j�<�v���Ӣo��g�-(˘x��4K��jk4��xPu��z%��!�O�ZPZ���|�`�f��͌�2�0KS蠩�ú SS ���x᧣%���ȍ�ps��'u�0�5V�F_]X��!npaA,h;��UsvЍ�D����s��`/ޟ���̤����`�H�k-[�7+/��P�1��}>� 8?��p�h�g���y�Z�|�E��^3��n�F`����[	�)�K��ݕ�jr�UTl�t�q0	|���,�j��iY�\!��3��J��gĥ^/���X�:����+;w��]��
ଫ@���X;����,4ƥ�DF�H[B߆LjQG��#Bu_$ ���y~� �  � �D"    �!��  SZ��G$,#1=\�-�X�U������92DU4p�*u��q0��{�o�P�o��C��l�ɸ�$dn%t9�d��WA�ч�b�a˧2�����0O�7B4 ����Nru��r!qbn (3��J�&lq������Y�ǽ MX_���������O.L}��������J�Z2!�� 4Ա.H���$��J�ոS��Ȳ(9�j�k9+&{H�g%��S��MP?_)Q����o��_x�N�����w<b��z��E�{���]۾�rp3��n�Q��[îI(�BX��s�ua�T�7�R�$pbP;xL�	�A�j��$��މ�ҫ�3i
��S�s����eM)ؓ���ہ��U0Y�
o��+�>x.+�% MJP0ȡ =rń��  � �D:    �!|�  S[X�V!B.Bx�,k��t����@�b	_m��Tb��g?_�؍z�j�N�#���yD��x��f�q�p��2�s|#6|�%����?�c)c?�R��Ǵ�����,����`�+:������k��lc�o�,G۬Zb�E%��� ���^d��_�q˓!PBa�����}`(��(�B��Q�0F:����Fյ^���¯�a..��#Ѧ��-5���̴����O��~�"T���dd\�C����L�+�ZUz�Z�����KB]�����]j�}�����h@�Բԟ��lW&��9]�n��K��sM�z�۞�Ӥ��Da&�d��A�XkV�d5)I��6��
��5V䫪�!RX���LmP�  � xDQ    �!��8
UYHVVDQQӽ��:��G�(����k�R�i��\�x$Տ��x{b�"Z ��N�m��wX�&�
��
��e@�:�8$b ��#g�1�쫎3�y{RV妛_,W,c�3�6\��w�z5G~��%�Tac:4�������#Z׾�c�{��9����t���vX��S<�����#�e���5��2��E�1��0|n��+$��
;9��H���=�SK��7�졛ЌӦd���P�BP5n���� Ͳ�/�!+률Y��8R#���:M-��(�F�nuW��_7�`
��l((6���k��'#6�V��N&ueQw�F�l<�a&��̛"q^J��H�J��1�p	
��dx: �I��  � �Dh    �!+��|p�TZ��t#-t)Hxu���(��\	�PM���a��-<��G_g����� �H��k!|_��a��a�DR�ƻ�ȗ짔�"b�y��&�A0] �?]	$R�Ft������܋�f�!T���,��58�UwM�% �w(������c� Cճ�d�U�Q�&�9���=_��@�U���xk�U-B�N�/ʡXm,Aru�,s1�|WCvjǫ�x�Z�D�u��=*ǀ�`!*��]
�Q�`�IB��^�"@��Ӑ�AI���W��I����hbk�&�.�^�,��Bm��u�8��������U�F���<�@%�F[��=.��`@T�؁Ͱ����
����2@��Լ�ZGL��d0��@��t���2�����  � #D    �!M�QVH(d�k3Ff21�b5&���7�P
�)/�������H����/�2i#�r�%��-���xp�M	n���oJ���j�<��k�ңUv������Ux��ӊ�kӛl}�i)G�wFb��B���r�k�Z����-�	��z������o�Y[q�F���1�G�
E-m}����{k�2��Y"\j�9miZ��-���3��}�p��oOqe�G�i�<��Cp!%ǩ��U��6\�
_G���(�X_��0}� :>���Nm���kN���e�p��(7}-�rĀ�[	�7j#4fb'�5F�G<e���{3 `M{��T+ɲ�VH��dI�4.s@'J��ۗ��"$��l�RߌrL�<��4�O(���)�i ���@����iO� ���Ϛ򒞈�n��'hZ�E���F'O\"�=�a�a(�/�]dI�IJ��L�N[�u=_E�=O�YZ��+���s6�Sn�$��L]�P��
5[Z�r������b��}b�l�m�eq�]�z
�5r�3�B{�yθ��ڱ���  . �D�    �!{�0  X���uT��ǰ+����7R�7�E���◄Q��G��F��D��֭ߢ���'�mq�v骜өOB)�I2��[��",�Gn���?=]ĵ�Ш�c��+����>��XȬ�]��;眶g9��	���1�̜�Y3D�4�ڣT��Ihd�J����21ʩ���b�G�-3�ų4��^��|� ��N�J�2-I�,2q�k�+�T�++p�׵��`\��_"��j,�D�*&�d���B�V�}jw;���O�߃��osK�˗�RͲ��#
�e� $�ִT5���	ҫݶ�10	�����L�_��B�����|�z�X�x�3�mv	�v���=il�؝�,�J���I49-��f{
T)�~�����$�&�  �� �젲��"j�J�gENO݃9�  � �D�    �!�
$  U[��&چ�z��Y�;�WX��\�&0}����M�yk�\�q��b��n�;�s��l��2�Y���SP3˜�Y�~�I��wu�}��b#\�]�Eb�΋o�}�X/�FP.�>hd}�p�A�0���>�{�c��`^��i\���3����^`�x/��?�X�4�t��v������� ��[�� � 1��[�n�T�.�8��YƠ����"X�n�7�����.�wJ�WL\�`Ҽb���-t�Ӝg[ŏ�r�c���"d~�I���_�(�V�\�E#�N��(�� ��RK���y^�h�!O���p��^�Z<*ђ4�h �t���LPD+:;�og�'Z�:��R���^J����+J�qus��Ӻ���)Vf�,�S�*r� χ��� ��ĩ��"U�r9����  � �D�    �!��  U[X�F*bt��z�2��{owX���R�"��٘8��t���sQ��&�J�fw3�����u�Gq�@+�pxY�<���I�g;w��y�pDƃ��UK�c ��,k��ѨR�?7���_36}r2���b'��j@B�Yd�y8]�Г_��NS��D���\L��2���b��� F�g8��[(�v��k�4b�a!���_���R��2��ۭJl_��g1EΡ��k���xB)��Bb���6�c*�@RA��� ^�Y�c��T �z��7�� 5d�@��(_��9R4!�ȊX+�j�A�v#��n�"���P�^��}�k9���JK�}E���L2D����щv[Qa��R��F��*�  � {D�    �!�l  WZ����r�9�b���Qy^i��Z���X�������Fˆ`�Y����>J\h���{���Z�%wޥ�A�*�p��>�WlG����ֱ�����u40L���0�˯�ٞL�*އh��_��f�
�gmC|�/��7�).������r��P���'D2�X.�i�a�i��[U���B0LB�Z�:&7\6�$���ՆOo��۱2��V1德!L��l��6O���=}7;��X&�����N�%���7�T��p4e���P�yB���f�5]M|i-
��%��3���-"АD}�_�])�Ŀ��ʌ<s����CL����� ���^0j�J$s�p�bt/d!�!�k�%{��s�  � �D�    �!���  T�`�d0��oHo2�x���m�]Вj�3^h��^3o��_�.~CV�Fs�6D7�\�H�H�"���>���[E�kt�
t(o�g��Ji������]�:f�|E�91<'��[��	#G�H�"d��AA�0�~�/˒�.�����o�.L0M�,����<+@�v���T#%.�"�f���	%.�[<R���S���`(($��WP>@k	��Y�������D��+.�xo�1�?`� 7⎍�L��#:e���+^�Ax5�n���CoD�9�g���	��2��ϝ��|Qd#P�u���Y��q��9�1�L�Ѿ��:e	v���F)��}�9��z1�T�-�Q	���e��FI��VB��Z�tV��(	Bg  � �E    �!]��C_�*�x��c�e�PQ���7u6������W��5��m�'�}3
G��a�ia<3����W<G*VE��#$+>��ROJ�=��u�l�#<���]���kw��� ���|���i�
"�Fݗ B�Y���������{b3j�>y��c������vPX22��vnő��Rпǜ3ӁD����6��Fscm�,Rʻ*��C�5�Ui��iRm�(*�Z��~����,�m��b/���|��n_�s��=e��T,���o����[}��B�˦gK�$s'�X��W��&����]F���r@�Ö�m��b`��2騝l-pw�I΍E��e��{?���o�JkR� �+cXG	���ze`�Fn�1<�-��  ho�c���Kh�b�	�Z�[D  � �E"    �!M���
�zV��ڲ��~ث���IV������km�������SZ����vHr�3uU�/aR�O:�D�a\�;����ŎW�N���9�,����@�D�w��6�� 2�(HO������˖9'�o�6�\zgU�B*�T���y(��8�Ws��
��<޷�Ğ��
0b���,��|���Q�6�J��+��/�'�,m�6B��5��J�]w��q��
U셈��"���b��ϑ��޵w��sf���!�/�U��������t�*=��"�cf���pB�}[���D�_
)��@efa#/�U�i���m$@GD��i��Յ��i��� ��S���J7b(�-����w��1�\�����||�S�;4�������Vo ��Q|<!$���	�,A�  � �E9    �!m��c��&Ė�Y�x���9�<WN�e�@�o�m�s��|U�=�����7�)Q޼�vYo���0��<(�L�Myi�V�¯�|�� �:=���{ʯ�Yz�${_k�����l�M�o�闪���������iۨ�&�[���ߪ���p]Q����Y��y��5P�e�s�� �댓��AT�
80�`g��vngU���;�7>�
�u
5ۊR��B%��k�� �߿����6�{���C���q�<�Z�rO'��!h"4D��?��� Ig>�n�S���`&��)�˦P4�`O���]��G�na�f
�������*������
�2M��¤dǔ������9rT�֖  ^��� &ʹ�a-��   � �EP    �! (  T�!LU(�3��Y�s�5��w{��.\�3����^0<�n9�I�7�����gT�}a	JqaR��TjR�U�	븒Q�-϶�V����MbB�>�B�N�jU)o�!J��"__���J(�`F��٪B�2�t�i���-�0F�ٮ�WS��ަJ�� �c1H�g�æQD>��חa�@��~������)����p�c��h$ ��1Ԩ1X]�ئמ?~�*������X��gգt<x��S��#P��ë(f��P;�(�\�띏�_���y:ʂ򞚊I�ZҬ�'y� g)v�ս���ׯU���<�57�1j�H��N�[��iWQL�x�C;���/J^����~c5c��mm[NG�Rn�e%q��`�N � �zA��^�r ��NЬÀ  � Eg    �!�L V���@�~�l��4��;��:���U`�w,T%�R�cx�ll���k�+�(������VA���m���c��ݲ9_�_R�F�Ϯ�(6�=/�N�Њ��ݍ��?��s�z�>�58�^ ĆX�b�H���3"�:�rP�W�^5��h��*�P2B]�� !�!D)3��X�l^�R�A�ʋE%�Ā���㆔sW�ʻ��CJ��P������vx�C��2.��=�k�3��|*c��K8���PO�м����+�JxqA���里��ɯ�(�����J*�W���Wb,Rp
�Fc��h���Vg��6������nO`U�y�Yv�
ڙ@��=�@�h�;!��j��"�#6%C���  � yE    �!+��?UY�Z*��nh^2|�6�bM)5�a��*���6���}�W6o��E�x\��sgז���kH���Ҏ��:EB���D��rp�t�f�,y<��1DSM\�q >U�����NE�-���D1�D]^�`�	���Gl�.�Y��=�9�Y��iy��]��7�m�f�i��?�48���5��RJF�aA{�̳�Reh�2�Od'`a*mpB��!(����.Ջxn�U�il�Z��(}�����E�l-��[�=(�9�F�?��O�OY)��GϽ�4�֐Е�� Q?�Eu?��@.�U�V�rJ%�|^� {�P�m�*���� E���I��L�� U=V|b �i!�]����  �  E�    �!M���X�������D2����n�l�(���J2��.��]e��j���6J;�"�a"�~!�/Vzi��	 �):����/R:%!|�j^b]H�WX]��-k���r��3��~�r����p�yp>���w�A�û0-x ȺEhjݨ�]�����ߊg�+ ��=�}��WW�m9��)$���7d5��@�9���T�O�r����=�Z�Y�'�)�, �5k�?��'�t[���2m�;x�]�c�\��mE)�U��\��A���RP)f,�g�}��"8r+��fGы��7I�#jM���6�UF��Z��P�:���0U��>�w@�;���+U�z�����
��������c���3��\������_��R^�=O�� ��Ztڅ�%�����-hi�}F\>��&���֕��H�'�)�>��	 �n�����"��-�񕴭TJ�hS�����&��~9МR�`L��X[\���~���F�C\\�x�u��q���WC�2w5_Ky�L)$@'���]��LksD�8  + �E�    �!{u�����I�I\��/�akU�4 �/�}��X����{�$l	�g��puM>*��&���bP�Y�X�6;�e���dc3�TӞ9awRߦ�c���x�^�њX&	5�1=���.N��ΘҁVϙ@L�b}«�-@S@Q�(�D�P]�%{p��`JN���2ٝg	�T�eUb
���m��C~����[�\�����7F��&a�K�@
�-!��AEg3+w槾�����Z��e�ˁ�Txo�j�S��hC��,��ꞿ/e�4�܆n��c[3��W!�K^�|'i=�����l��� ��>0�H|�c��Ht���-_WGd
��$��EW�/vl��`��ε��7�����u��/�aa"�h��J?@Z�0#�^}�7�@�hǛ�f%֫Ʋ��  � �E�    �!=��c!Eat�S{�]�
P�Z	 �cL�>�A�'&��j�{`(���ߣ-bB�����~7��&X(@%)�/=P����6�A�&�IBs�i��ܵ��5��J{r�AV�	/b	��Zcjq���z��l��O�wjY��ax�����*�(�˹�j�e��,h9�D�#l�'[�61����wz6 pտ,���Q�Ԍ�tZ!_j�2���&��{�+�z�i���B4w�;̠���ä�k����T��{w{�0�<���Oa�~	Ҡ��2���C�T�|9[]�V�9���w��v��ľ�P^IX�_X�!�d\ܘ�
��6�C���U���<,�S���v�:r��Lu���0å���'V܇�D���hxT��B�{:��|p�ׯ�� 2~�%n�  � �E�    �!   X��ltA���7�=sLƩ*�����IN �!��5:,��v�����l<rB��4=M��d�1b�vaLNf�#��R��������ޚ��G[ܥt��� ��@�?-����43�8��>NLkH� ���E2voj����Z�p��s��>��,o�$�������]����.��9�.P��x0-	%��ù�Pd�«X��5>�P�THAY���<(��\㊡T��($Γ�:�oդW��L	�k<��lɬ^of�)x#��DS��0�K��7P0�n�=:L�)���i�dq��d�(��S?�xR��R0X��E1f�U�\/W]~��u[ޭ%F�n;auX�&y���nV�ײ��v�ǖ��Y���ڱ�s!{���  ��� /��x  � �E�    �!� QZ�H
����S�j�Mv�'�k�5H?hG_X������r<�}1_0`)��A�'c�#�"�Ԃ\2U�&Y�a�S��эޘu#�)r=��#҂�PE�@��������>���.�7�z���K�A!PϏ�ԝp���#�e�2'��n�(�Z�br��[�)��cFZ���)d�	�2�1�_a����XRT���S�$9��g7{��O�/X0e"��
�sc	xn�4|���Y�8~5%��Wy�٩�q
H�|j/���n����C�{i���3o�vU����ڽO��N�fd��$UW�z�Ѧ�n�3t1�^���ڷĳ8C�b�uі� �v���5A���D�� ��.A���/(�� E=� p  � �F
    �!��>T�`�����UkOF�c&�YT�I��`����y��4��~Q>��5��U�Αi����ڒ�g�ÍdS�\��JI!V߫�IIan��`�
��<��g"�v�ʲ�r���������#�v�ᅈ�>�X���Hf���a��JLu-���췗~�݄�<�,zXF�1�u�Z���
�2H���[�XQku�+�;S����`�\H�@���ЬRB��X�W��"�jQJuV@EW lY��'c�0物�M�A�!�.�V�a0Xs�ì�hM�[�e�ĲT�3ݥ�+�J���
�/���&SsCs�`��I �y�L�@����Z�v�lCG����VE����HQ:F��h��^IT	N(a�j@R���  � �F!    �!�7�. PXh�J=�¡0Pl�e��6kf��L�Tc��lv
�E�|ef\E� ��P������*��7���	Rq��]0�]�����(Q�P�V8�:
r�u߄���J�-�(pc���E<_E6��z��	�zDԟ��TkT�wC����R��*���uo���`��t^|�������/qt^C��
�J��J������3��|�d�
��!���J���J$ ���Y�d�0��
�7�&ԕj�TU"\�[������w���5ࠕ���:f34�\��bo0�i��R���ʁ4�>�D�q.�A��s;��6ό���|i��q�uҞ����==��~4���� �q ���F�~낍 $���Sf�4��j^�p  � �F8    �!L  Rڨ�F#���R
�*���k�P��	<�T	�*Bu~k�L��[VTX��������_N���	q�G_$�����A�G�A�߷;�>:�=�t���`�1��]b�����8��	�v]'����_[�V��	p-�g:~��$	轵r�6Ҽ�y�:�*�o�R�|.j麪�j���'L�3����*��ف@�h�+T q����Q�0F:��:9�]s3��ûe)E�fc��b�[ �u�8з$g�������k�����Ι�U�I��B�^�B��ls�V�=ek:Z�9�LvG}��muG�n�e�B�ri�$ ������
��@~���)���6�欦���>�_�aS\�K����:~�.�3���Z*2\�>�vJM5�_B���>�&,�4��@�[P�s�  � �FP    �!
�  Sڠ�6*���aҷ���h��x��q�溬����Q�S7I@��DGE<��+�2����o�-T�ԛ�)}|����גkY�δ�?���4��� 0o���|��/$�J�����a���J S驉��Q��
KL�BP kxc@d�P�b�`�c���
���Ͷ�FJ��hld��t��:�}n�$'0+���3g����v" �l �t�Z4
k=!�A��XhF
�d\:��Q�ws�'�5X��,�����~�e|�����;Ga���T��������1���2��EG/�~�M�`*��N9ʅe��� 7��|�~Y;&�n�V�Rd�U�}?���O�n�xE\ز��1�6�2b��?�)5��MP
|��`NÊP��6W.x9��3� � آ�^�@ 
k���2�  � �Fg    �!� �  S��H"��B��qVs���Ͼ�;�zp��S&�l�T"���xT�D��(A�����G��O�5���9�����\@S�_�� ��0N�)���
�䖆�c�N�9��j�������W���v��k��C���� �/�,�
�Ie�&��HŹ�T���a!���`Q��hY���"Q���Y��G4ʩ�k����� 4����p�Ђ�uv$��x_��K���R�/.�"8���\���^^����'�lj�pI}?�)�3]~���E<|B�e��8a��b�;��q�8�[���S���{�2 pcԀBx������d @u�ʆ�F�1VDL�@ ��@I��E� }%P/�]`�/{9�j�U�P
��<߃�	�)���%Rk�@R�NW��?�@�Dƺ���  � �F~    �!�f RZ��(��A
�ps�W\����wd�rE�S= �pL2V- |��2�Yi̰.��5*z�$�x��Y��}Vdz_/���^����D�C������j���
�O79ʴ}�y��]�m��"�9�D����N�.���R�$cM�w,����'Le��]u�w��*$B+)y��҂�Iy�FP� y/�1),t�����(�������8��i��\�&�]�@=+�4`�	:�߳f'��Vq�ʹg��=s��:jQhJ2���P��n��dM=������D�;��u� ��A�?�	����L%K98�c�S��e_+�xC" J8"�>���������5����L[B�ı!0K�P�B@ �  � �F�    �!�\: Rڨ�$�J,2޼��{��e�4`��w<y�j�4Q��7�����^��j��(񿷧ӓ���r �j���C&�e
z��-��tG���p�0�Z��Z��=�����^��C[�]n�j�rvL��Mk�X�@��L*i:���2��v�d�_���`o�e:�=1%ndN&�J�B�T�����V�8�R	���\"3��&�R!M�*���w��FP�ꮮ( g-�,��-/�˽tK�����}".q,.@ƤA�[�Ž.���`GP]�:��b�E�;��z���}���F������3� �t=�̋�\x&�d�@X~S� ������4� A��{��?U*Lwpԙ��u���$������Rad%������%x	�p  � �F�    �!�� Rڨ�JXn�jxk�u��/w �U���q���B�o��co��_���cp��ɑj.���4L`�y�)1��nP�� ��p����U<��r�.�';�؅B\���Yp�CG	*>�1�6�M�^
�R��ɑWASP�d���sX�ڜ���v�&!ٽӵ�f��3�����7�yTH2��2
8^��b���e��h#�/Ml� �hcr�瞺B�
_���Z�Ձ�������[���ƘP�V7�;�4}�2�[ew�+��#`��xV\��Zа��Lk�MG��?,�E��bD1S��h[֬���X�᭩�Ʊs�;���r1�S�H���Oԭ7�PP��֬�w^��𐖈*��TJ"p�(��;RK�40԰��3!q��T�  � �F�    �!bL  UZ�̤1��M��=ʺk9�3U�塳�G0s<M�؝����8�L�1���[p�K��c���'�g��,.<���7��?�F�ױ�ۙ&��y����G�W�L��#�� -�T sc�UtZ����fW�Tx�=P��}��)i���������'������ӓ%g����R�Ӆ'��bP���'� 9��k hR&Q;��TY)l�
,.�;�jO�{w·�*�IXQ b9��>O��>|\%�+���AQ��c��:�&��Kta��D�5����Ke=2Oe�K-��꺈�fz��g;�j�	�	�5B�?�����	k
F2�	���.
�#L&j`���' T�|D�b�U��O.4~�>�W����9��0Ru�<�K^�r�Q�N�b��l؂�l*8  � �F�    �!]��C��NtC�)�U/:�&�X${�c�p�k�d��7�u<h�oQ��ɸ��[���s�:�.w�1�XĿE^���+k�o 읈޹M#��@t��ZѦa!@/� ��F��������k�K^��7�p����+�&-x��k[�tdw�T���$뚖m�; 
(V�hWs)vh�����Z tZr3SZ���)1+2�9m�+��|e$�"������&"W[.殳�S��/w�%rh��͹�����N
���M�{ו����}�xL4h��}\���=9H��]T�c��r�K�gn�W+�^ ��gLÀ83�Lֺ��� GK%���:	�Q��2b�j|���ɅJwR�q�P�1%l�)����MP��̓��e���q����   � �F�    �!]��S0�f�Q�No]1�%����=6N�0�2�R�O�ܚ�"�o<��s��/�yV�c���f�q�4���\E�_$�D"����q�7J�A�q�$�+  cEO�z�+d}̢/��w"�}��o?_g��U��c3s�΁���̢���(�s���c���K)���U��,Rz�_$��	�#q�p �ɛh����Ppe\�� ��]{T-N�5�ZB�^6%J���"�.�4�tnl�:eߌme�M1�B�7�����\�N���e������U�J�B��s6����pIx?BBF]��St
0\�Qf��L�����ڳ����7��qQ[�����:��֢���r!��˕���y��?��~�Y��>5�՚�]<�:�e�yW�z( ���� Q��[V�\ @���	�p  � �G	    �!�L  ZZ��*�`����溒)�Ձ�o��]\�Um� o�g3���:Wa���C�k�0�ag1�ob{|J��5lES�m�Vb���n��!m�V���\a����8�:M8|W5ч�کv�1�����.�n����];d��l�GZ�?�tϮ�&;Ꙑ�Y��N�Ϊl��}�ے�c�d��2��V�+L,a��PTnx������lPV:$VDӝ�X���9[�-UA	�C��Xl�E��/��SJ�Z]Px�vy��7�P9v8x����\���R���(pF��~�o�T ��{�u�]�� ��[u�Eم�Df�ë}4۩ػe�ԫ�:aol_���>6[;򋋥��0��ȬZ�i���kJ��X �]!T��u�"�O���Ȋ���� �  � �G!    �!
�� S[�V�g,W}pW3�L���@V
�a�]縛;ݯ��W|3zr^x��2i;��b�����x���כ��� T��pA

4k  M֏B#��+����4�myV��E�o��^[��mվ�@�[:��Q����}��Q'�KC��|��_~������m�iފ���vt:���K@Y*d�N��ם�#;�Y��k��ǣj� ��ou]Z�d��a!��^F�J6����AB�|,��P�N?7��^!�$��U�J�j��M�|��uV7��?��E�����Y6�L���da��r�[o(˨�( _��@\hpvNѹ �*��m����2�\��QЁ!��G����o�8�U�<{}%�ihRӨ���bb�V1F5����DR��y��	Mm#�k�  � �G8    �!
SM|8 RY��,>k�kn�,�q�QWue]�� ��>y��n �rVƖA�P���D>���T�G��*o[����PV�"�� �xr!TW�t�!%�Mnǲ @^_
����4?I�� Z�y ^�(�c1R�UVrz�E��?�\��$��Uq�dx99�|�K77��x��)H�K"_/;9��]j��W:|�I��B��K���F-�MEl���jD(� 2�΅��L*�Z�d�&9��	h3�t��ߟ92,���)	8��{<!@%-�PT�竳	�C�B��r
x{C.��p\p�����y��0�Ļ��>l��9�<K�������ԟAB�/9�c� �fW��vZ�	�C�B�	�cT\�;vvMT�.�.��̛Vy��p  � �GO    �!�TN� Uڨ�(�S����-{�굘V]5�.R�pJ}#�M�����j�5]�?��C!�ܺӄ�R�]o`���	�ج�`g7(�)�ɥRZ�$�罶\�[��0/�°����#�IU(�P�a, k�\B�$�@��D�Z�8��77**���8�j����L�ը�u���t��#q�2�̴��2���z^S,������Y
�X^�p:�dU����:���J1%QNe!Lb�^,��kn��[�w�+�E!0� ����G����~��������>���'�1�T�Fڮ��-83GIa�{<p�T�+�s[x�g2;*L$VFT���Ա����eA��Y ٝd�ޣ����4Wb����1�S�|��j�.�÷���xʂ��4X��A�|+�rEH�]������[	N�G�,�  � �Gf    �!m���B���/;q��[nYT���*�`x�n�8)�Թ�~%f��ÜL+2N�Μ7V��^��������:���.QJ��8gB�D(텡�2^)ZU�]���4/��Z�����&�r��p ·�[M}��q2���fy����8ۅY��r[�\Y'�~:A�+�0iKň�+ .x�h�U@�6��������.�dAg��j
�-�� �i�Ew��9�n\W3I��&�������:�y/�O�,�nöa�m>a��׸�
:�y�U�͇9�w�;_wn�A~��$�6�AN��uۘ�b��˗鞪̍�͓�<xV}l��E�%��_"vt�u��x�{���ƵU�v�WEr�[AW�U2p�p��:\����Q'T��U��'�JW$�88  � �G}    �!]���`��HY++�Yٙts
^��(#�`,�'
h�c*�y�;xoA�5�ŝ�ѥ"wޔ����/�9ꑎ�R?���l��W,m�\�,u.\u�MN��J�����! ,���4GbJ�2�_�F%�lBI��V�$;�]�OZ������.�(�k�5�Ƚx�b�u�_���M�^�<X�t�T�/%ԴS3��J2���X
�1��!�M�M�\޸��.�1t؛Ɏ�M����SC�R�kM�^�{�M��
�*��-�ΤLO;5�:���c,��. cҘF�0��20`�����Nťk.Ѓ0^�F!�3,�Rs��u�y���8N�6���g�X�H�T�J0��a�L ���e��`R��V�gX�0� f�%��  � �G�    �!^ RکdH��ؑKw�nͬ���0�c��u¾���=����ڜZ��$_��Ď�#@���M�AU��ه.� YJ��B��p$"$��_��a*ver��F�Ce�L�=�m�;(|��a���m�<�ƜN���tt����Z�c�,F?,c9���zy)�Vs�X�P/�H�0��X�AV�n*	��T���e�%k��%� ������Z�!A
 B٨�Õp��x���^-�^�2�`��\-��3�:�ޝ�g �'��)��Z������m�eR�Dvv������A2MJ$��2j@�pk8�k�.�ulD�ge���Q��R�5U��j���STV7��`J�G�L���HM�αb��ֽ.��w�~��b@�j^�j��g��Q7`X��)�z1J�x  � �G�    �!� H Sڠ�h�nYT�ws�1R�\e���=c�Ǎ4�޹�է�j�ɈK`��1��]�X��o���ˌ�eQ�:	�U�f�J[#�I����́a~����AE-6:��7�@��<�ε��qA�lժ�^ִ^sA@��SI���Z'�*�Kͣ-tԋ+.MJ�
��i@cWV�lM;��:��@Ş� &R4�c4d���x�{��i���t.D ]E'B?��H8jb��J�n�(']�Ŀ���[i�.���$R�U�2m�J��	��w�v U*S�p5�.��̅ۨ��@ D8@�1�-�`�j^���:��[�Z|$bj�i�W��/\�M��PMV892�Ҷ�`Rp�v�����\ȻN���V�@  � �G�    �!�l T[��7
Z[i�tr��U%��]?$Rd�Ҟ��jJ5*�K`u��T:h�C ����e�l3Xxa�K<i�I���&�W���p�a�A�-T�N��A~S��>��ԧzzP���1�gZRm����]ýu���lf,��_;�S�O������;8�ú�u��v<��#�N>UL��7 �!��{�_c1:�6h�eiX��x���ǐ�U��/�Q[��&������U@.��c�E���0�WU�
6�k���v�s�)��ᚄ���o^v_�	&�b���@���VK.!<w�!f2X��O��J�n��)3.���af����h��U��н�D�1�!�x�����Ԩ�� 3�����9�>���^� '|�S@�(/)�Y!Tn�L��QW~Z伥\�  � �G�    �!�,  TY��@��
��ݾt�#�P�������,��q[�!/�~`fJ�N׿ 1�e�>q$G��{�?(�����<�\2�CC����w|r
|�x��	N��M׊릊���sTc]w�! �T2l�|��=ް;{-�u��W�P{�?����^]�0 Y?�*9G����_��ˋ�KXF��������G�N�r������f4����=Օ��R��wK�M�X��L���Ca��5@m��̝y_�?���������A�*!�? �e"�8u �1`Tz�WO	u���=���z��W@M{��R|�#���PVR�!O8KV	p�f��-�=�3,��6����7�%u7I@�Y��h��sc�M�K��#X@Vm��m����  � �G�    �!
���  YQ���X��}���b��iF�WK8�7�V=~���
���'�(�Uޟ��nn���4�M�ʧ1�g��5����e�>2���Q���������d�OK��9���r덯2^pL�&��ޣJ�=�<𸈏?b���s�(�_2�7"���%o8s�����-��,���R���ݵ�����f�	Y�Y���KH�Q���i����Z@�M�bcX(SX]�Z�++8���\�Y�+���?��Q��W���Ol�%:��������L���tD_�W���WE[,�2M�%��΍|����˲��h��(�^n�(*��XF���l,�`#D�E����� �T񅇲|c��G|�^��R�aW,��A{��ܱ*CU��K��QJM���+YP�F@8ST�C��ғQ>  � �H	    �!��`  T�h��*��mJ�;�r��4������%�.p�s��M-=�w�ܛ�{�k��7���y��|��'_���Ʋ��߯&���\�4�4�S�KN	�/�䤩���>j�������+M>��h�$#=�]H]}]xʥL��z���;X�lBd7�ɩ�{�O4ԣ���%k]KȊ��b͛�VPJT�h�XFGB���U�B�H�5h
�ҫSX�̅!��qN�׉|v�)G�z@�����]ɕДV}~Yc�
�{�����RlR��Z1g\$p�`.\���PU^��w��y�4^�7�m#���Z�僚�Y��'s�ڋ'�T]�D�|9x��j���Ʒ(���I�?�q^�Ⅎ�b1��B��U���ɡ� NCE&����'9�3��U�'  ��  � �H     �!��  Uةl�X-ԯ��f����q�3|
��E��>�h�"����=����_+�r��:�s�[�<��3��v�6v`�����������f��٥0Z�;�a|hJ��!��� j-�����N�k�Pc	����������H{�,T�1�����GR�����w�t).O�����-2Ӏ8l�}ݢ		T|ߢB���'�8-)���v:S��CP��qu(7���W��oT��[[@w�~ǋג�S<0�!���hKq�5X8׌�ҝ�[���������7�H���'B���Z
o"�j>_�7N�_8:�%���#}�D��$%����)��j#O�O�GF�S������ܭ��`��	]��6ퟯ�J�/sn=n��Uf��כ6	�`E,V�  � �H7    �!�$  T�錤8�8f�4s�q�Me��PD%XijS* ���5��7������w�#u���^�?<�PC!Q�	�[k���͓���좻$)�ii�����Y JjDT~��\)L��AG�^O�ȳ�b�|���F�m5�e����nD�K����]Т���%�rn[���ظd��g7�K��a�b`_�Z�u�+&�n7�Vs��ѽP���icʸ��n��~c���E񖖩��$�I�k�8��߯X�ڗ� 8d��n����q��p�K= �ht������ג��crM�2j�5������0%5$�j7R�z��_��Z�Q v�V��d�2�\Q9놼Eu'�)lQ�D�(F�2��l��^� ֱ�  � �HN    �!� U[��Yq�w��oq�z&U� r	����7������]X��W�X|���%�}�`p��e4��H����?��P��;�$�U����1�˾8�W^��>]���?��mb�H�-C0��4��<���x�sK�R�	�a���b,��k�Ŷ�p�G΅m/j��)8�3 s�P���pq��R�eV��6�"���6�9V��]������Eo"{ْW��-GN8F���[��s|>��$N��������@ުs�.�������k���=�;�&� o���Υ?����>�q�k���j���n���9z�D�z���Ai���#K(̒6�r/���C��!
.��ɱ�ʠ|7�<��^  � �Hf    �!�� � UX��d@�5ӗ[��p���VıԦ�P��]���kZ_�j��+:��v�E���"�>"*'��\�� �Lk�V At�[u���N�yS0^+f��9Y�^���e�a�߈ǫ��o�aŲ�f��zz�]���c�"�����g	.0�l��qd����Jf��'S4oC��	�)�<jR�J�I���׃MC
6I�]tnVWZ���wY���c{$W[ l��Z륄��f�V��I%\��OU֮�T�o{\*�V�S��p�F����l���4�N�l��J������ݖnUK3Qi�Q�x�[�YS�mF 
��fH���.���(���kv�ҲI�p��~��_^�*�g�����'x���䍥��c�1+Td�N�����D����=ի2!�}�~18  � �H}    �!  Uڨ�f:VV�]�t�Y�;�'k��(1ɣ��<iU��%b� �ﾌ���g_G���Y���/��m/�vf���SX;̌!T:��L� �tNQ��'t?;6P@F�K�z]I\��HLw�U:0
�Y��X@U[ &��T����OLN����ѹ�S��k��a��/[t��fy`�e`\���� ��pf9��
a���=���B(P�P���w��W�\��֨���l���K�zOm?�v[dnGY���e� 1s��RR'��fl�ò5��k�:T�p��A�J{��܄৺��?�P���a�0��o	�j���u�ÇyαRV{��sm����{�����B���G� U�����B�|mi����*f��J���	��q����X���#���L�� ��  � �H�    �!����Q!n7��םܖ�U�߿�f���5���T*&�\َ3DH���/b�@����8�+�����WC�B���g�K�iB:�gP� 
W�<i�ĉ���y���amuQ<[[� 8���.*L��,�T=}q�oj�I�-����Cϋv�:����a�$��'���T��Y�q���͍p �=���� ����P�q�B�q�V[ ��@HK�2�wX���wl�u��M��W�T���5�����8��\V���Xv��mR�21�7sZ7B��2rN� �>���$J.����K��}�t^�C�7��ڊ���p��m-/UVޱ��=�d�61
*��q�W��D DP�����B���%�/��"R�%��$�8ԟ]�Y�S8�b����(�+%��,�  � �H�    �!M���q0Ц�1���L��k�]��Q�N/*2�Cn����ʵ�8�Ji�n>k��m��,��C2W��·���*��|R~����u��SS�� �^BD ������#�����.6�5FA�DOp+�@ ��$b�cy/�����U)x�7�ѫ���L��L��F���}�k���|ނ� ��>gSn� ��0h�dBU���N(Ɣ��
kMCBdX"!�$B���rV��n܄�A̼�̕[z�(�x9��Un�߾WQ����SU�7iixra�է%g�wt�,��j��4k�v�
���^ݙ���� ټ���$J)�
΂'T6���'��2�4H-$������h|42ݻ�x�*�@jޏ�N�w�@��U�s�h�nP ^�CSO�5B�*��2�.�p  � �H�    �!m��a"i֦���lj�M.gr�0�h��i�}';��/+��dn�z�6�~��#��B���K}l�u���l;�$�$J��^� �L�oP�@�/�V�I�#r�`zn����L�q�-/w�����W��e&�nUI�N5V9옙X>N���s�Q�v�'��u�N��$�x�D�>`����E� ���FB�:]��b��Ic �(C ��m^|S����qݛJ��[ۼ�`j���\=`�G����*L`o��t*/ێB�Y	���D�@�8Zd�˂A��h?H�*���מ& �q�awkF��
�uW���D��Jȃ=�I�0pA�zi.��+!6U�;�/U��Y{k�����G$U��a���O���п�R�x��.d�r�  � {H�    �!=���B�Y5�d��9�-�Tj��'<����c�������I;�nK� �k�Ԟ�=��m�=�"�3��Q�x�ݔPĊ+� ��G��ʂ�[Y��uL2��a�A��Q��!$�`����z�W#��q�9���Qi�Frʔ+N Ϊa�Aږ
����n(����^�))����Բ��Qب&!Vʵ3|��U�BU.%��j}9?}"��w��.S���Fn���u쮡G㸘Vs&��/&���ԕ�iUw��)�&4������Ad��)�{x����i�Ygʪ��#d+��!o���]}�i���������kì�%hEK��h��/Z�p�hw�c��&țz��B!򬝔��  � �H�    �!+M���A��b����-x�V^�ʡ�r����' �H�a�{���?�}�W�5`�Ic�[�.>g�E�zO2�)u#6��U��f���ϝ��:���-���T �[�a��,�	��L��$�'�t���:cL�y]�	7V�:�>��E�wbF�E��O~؂  !tK�wZ�Zb�d-
�$ �(ߵ������J�JU��ʃ)D/W%�*FX1UT��V�w�wJ��c;�9�M'�=�-��S��>L�0�7u&<��E�]�p;���Q��_o�6^8'9%[_]�צ=
��5��	U�j�d�P� ��x`	���(`�z������jaf2`u����sHZ�=��c	,LV+�Q��|��+�:W\ �$Q��
�N����=�-Ӏ  � 4I    �!M�P�f�PMЫ4�"q� 4ْdH�P��U �L2�Py�6�����K؝K��cد��JV�:ww 頰�80��yX�@��
;��R��Mj��>XMj�3I`�E���f��,l}&Lr��[u����)�)�}���ӫ�/vZJ�Qe�1c����~O@?3��c��NG��LId�C��O��n�j{�i/g�"�������.kK_�VƢX�P�8�Uʬ�)�ų�vs2�"[�@��na��4���{0r��-�q5{�4�P�j���~�Ԟd:Y1u=��&�D��M�05Z�I�F�aC�6�qT�Q/������7~l��)�ײ ����G��ڽ�?f6�㮻�XU�x���#
֘3�=UL��+	֐��	+iO��j� �4civ�_�S+�N���}�8�$u�j�ܭ#���q��Q_�8 Z;@'���4�l{x�	$A��ʿ4#�2���hҼO?Z���>ܛV��aF��
�]d��(sw\-�@����z��t�A`X�M̜�n��:��+�}7l��.Z�Q8����h��G���-��֑6Ǹ  ? �I    �!{=���C��`��Os�Jڢ��@i�������9iG��:��;� F=��&��j��(�ׅ�ҷ�(�� Go$G]ɦ��:�{ݖ�r��م�r�mpd�ݶ�:̽)Ǹ�hw噡�����(H�-[���Sa��p��OcA=mv�g3�١������|WBǞa�t���a�AR��o&�ĚUƭWN	�b$�<f�^i�� Y� �DF5:����3�w��1!� ���)�GWՅ���޶�BR����c�vW��O6D��"�K�ST��yE}�T�wH�a��|^8�$���B�VD�u�f�7�r�U���n�q�Z���`���|r~��cfݯ����Ɯ�S,6�7��zNaw��t��u#�19t�]��T�;�>�JF��.]B��'�S  � �I7    �!m9��!���]fp�Ɣ-�M���boJ��9m��v#y+����z(�^�Es�lw1��������Ӈ%��,�_-K}���_MKl� MZ[L�$I{�~ܩ��ҽ�m������ PC�zL-����ƫ�Ʒ�iQ�6#�k]�{J��F�a �� ���=�B6�%�R�N҂�SMȷT`���	c�%�����DM�\��N�X��*ʤ�b�`;޽�l]7߽)F�7D���j��s�6��ƻ�e�/S\�`�s�ذfQ��J9�d$ʡy:C�*�X����Er)��cV!n��|��f�A ���
̥m���fN�6�7!��k5X��U�bҔ�'%_�F6�ɛ����
Z������_�4"�Q�*)f3σ	jv�r���IkP�  � �IN    �!]���#�!R��]f���F ���W0p�.5���|�����<}��K'��݊	/�;J�2{R�;S���T���{%�;���FG*�����a�T
ڒ�z�A�+�%2�.ꕖ���9�g�E�P��C޳.)�5K;Qs'G>Όq��R=�YH�~�̨�(NJ���s�J���j��D�QX��zU�5M�8�U��B�Ec�N؏~!��ݨ ��]�C����@'�L���sz�H_b�}[]�Wq�H�����|r`���6?6��W�I4�xa��	���^�
��酨�)���I�[����Ǯ�H����)�ܖ�X�_���A0]����������Y�_rM���y3#s<��j[���^��ͶI�Wa�P��ޕӓmd¢�ШF��%�  � �Ie    �!5���C��P��@(e	���JS0!o~5����co��9�o�/���}]u����r�<O��#0�F�! H�)��f�UFx�ȳv�Q�:׳=�N�*_1�,6�Ia1��+���^a���:�U�x�Y|el�����o�(���v8d�X�Y����ڡ2b�)�s$V�V	U\V⹭k5~�tEGk-)��[�����q�֔�K���Q`l�(��i��z�4�I�E̠9��j��ʾ��^n8k�o�Y�hd�����6��㯢8R�KJ�+9 ,(\"�C;���j*&�CB�0�3�T-a�׼��Q�C�Ă@F�@?R���x*Y)�Qs��ŭt����'��mHV���f��1yV�k��'���#�l�L��3EX��H����Dv�T��  � �I|    �!U���A��°�fWz�v�������$hw�H�d�N�=�Z�z�k�0����1��;��9��-���;s�����(�tj���wV��$j�Ùl��S�?6�-�@c�?yM��r^k�d�"{��b��,�t��P�|�@�r7���oZ��Vc��P��Z�z�'�л����5#s��RJr������õ'8��{Iy��"p"�tu�ej�2H�ǵ���T3Y������͙*�v�F����������|�6�&�Q�_�������NgC�즅=� '29�PN�/<p���I';t\7�t�^��e�c���T��Ik \)u^lh�J�WS�--	|���.��B���O�B����o�48�n��F�R7�F-��!zN�T�S1�ř����2g�(�B�*���pQN  � �I�    �!5���C�	�nY�Wb�iJ�B�����ځm�s��(p���%v]L��\#;�������,NaҬ���*����8���}X�W��DJ5/2JAR|R]�]v͈�wZ��k�c���2Z�}*تO5A�<R���dŠa՛���b����qnF[w��݌)�(���6�FW����0IH�K�s����]a��VZ��*!
-i�kM�jJ�C
 �q��롪�l�Ϸ$��i3���R�e�mj6I
}�B!�,f� �6F�#V�}��fl�y����y5�w�2�� �Ek�%a���듰���OPV�$�P���&�P�J�]����I	`�,��avI��iS�*��'CRQ��I�d�T�d��	�+ #����F�� �2FC�  � �I�    �!E���A��b���k�P[$��J��Qv �}�\���7a�_P����Z�3-%ƯĨ)��� �*��)&����p�Q陮�z� U���k�>�	��R�t�E!j���U�rݯ�kR�*�y�H99���/[�e*k ���.�>
L=�Y�\����#��.R{c��!'��k�0]^�����r����%b,d� ��F��,Zа��Q`�d(�d���͂�bQD�x�5m��.`6_Z�BR�|Z������IF���k���ә���4S��.H�6s����<RƕZ�-�Lv#�T�c��>�ń $���]�&}˴C�6���F��ʑ�c� k#�d�\�Xo4�M��?-9�����Xe�W�3[�V3�k�r�7݊�US���ﾈ{�<,鮋�  � �I�    �!�9�#A�q���"��z��te ���N37��u�����<I[s�[������.O��������ʢJ�	ؖ�ɏ���5/�0֓P&=�N��U�a�,# +i-@�L̀��kJ��v��#ӟ���B+;�d�#�+D=2��#x�x7�|�D��J���R��|'���x��jVJ	ލ�[�Ȣ�D��y�kAQj���,T8�Z��Nu�D��.|SϾ���mښJ�rY_Vz�I?�����[p�Ov���#��%��/4U��t}ؗ)�`LY�T�Б�Ktzf�!����@)&"6 �O�$h�ߧf�N�B���_��"5\�7��m���0k�9wO��YfݲZצ��8��К�K��⪠�J�vE��Q&|ח��I�V��Ɛ p  � �I�    �!]=��A0E����M�0s^eP�R�g�)�a=�ˮY����̹�W~��l=�$�,��:���+���5�WP��!\�al�|ٙ�r��-F��ߕ�4�τ��:�h�*����	��7�j���X���ǌ�Ʊ��Da0UĂ&�u�,�Kck�οb�K��}�f��;^4g�C���eU)ʕ���9�iҊ�{�һ����Ψ�Mדjª�Fd�Ŏs"�L����a"������9<=eS�QW��C��wI2��
8��n�W��%����Q0�b�p�
� � �mt�.h�uHO9%5��w A#�V���N�:�Q�����ޡ�d�L�a֬��j�
P�K(������k͗�W������R�@�RG��R��cei�j���6�h��z�Wj'P  �               
ff�Q���$=J�D%H�d++�oY�������l>�8ʹt���<���.�7Gn�sI�&����FLg$�uj5�8��3aE�a6��E���|y�V�e�j����ԅ��ۨ�/k1@��������j� |�ۈafuqe��qE|{��X�9^ـ��ɥ��Sp��Ϻn �f��p�ћr�i�/sYz�Hi#u��pN��R���G����|�o����n`�a��R)�	.-��E��6P�h� =`f��j�����݆�"F�L}Bɗ����g��t?�#*��5�Yw�+��W�D���e8$f�g<tj�
豚l.#�_	�_��˂мY��gMzRފ�^� 7�i9bH�t�m�Ɇ�gtrGb}�����FG�0/�L�N���1Zgؗכ�ᴅ�Ql�{���&�c�v�����d��8��2��i��<D.T�0�U������UF~��i��ӎ��3K(l�Dy��;��������q2#E�hC�)~���u"Ә�   �abst          �     ��                asrt              )   Fafrt      �                 p   )     ��  d                    KskipserverIp=23.65.124.12 now=0000000000.0000 duration=0000000006.0140  ��mdat  I�    � V�     �I�    �!5��b"�K��*��vf�r� �Aؼ@�:�-�ۭw�I�ÚsW�uDG��wa��>��OdۖA�0q�'L�"G�0���P��e����Pˀ�9O �Q$�p�ִ'�3r`��Ʀ�a�L���@����4��+���)�GhmG��R��C޵�U����#wćC�{B׺���56������-hD��Y"�v��.�xw���5���B�ҷŊʅ^Y[�����Xܛ�>F;.�T����N�ٝ?�u���ܕ�G�:S�cto9jY���u��u�19G��r���
Y�f�CRm5��"ӏ��@��=
߾g_*�^h�
������k�a���F{Ɲ��Y�XD��%9�fr�H:~3�'+�'!x�+/\޸��O���a^  � �J    �!�   Sڨ̄1V��(Q�JIʨ�]�Ix��-�W�c6�7� C-�b8O����ѿH(�~�6ڌc5�tY��%A1�VE-8Q��mwf�g4g���"��P�(#w+beQу��Z0ϕ/�ΐ�
��9�UKm(r���q7���:�B��HCMW�'>��{I�i'��)%,HouY��`vؐ��鎅lv���QzN�b���Ā� (&�n^(j��B�B�tY����۩R��vP��V8��B����5[Y�6�.5B
�Nߞ�4_ߖ����%��J�B0���<�0@����r�������3��0y���VExQ�������@"k46���ne��N��0��bƝ�:��XI0K�i�_mZ�H,^�+z�F�Q0�& �  � �J    �!@�  Sڨ̄X7���� ��`Y��c�~����%+�9��݁��+�;�d�h��jϰRg�;�1eD���5�s�cpg��V�� �(��:V�Ұg��\`]y��	1�w��:X�dPw��d��^	XI�ig����EKЊv+F�%!z��I+m^*U�MR��L!KCR�wo��G��%��Sl��Q���L�*�	U@�%[��:>�����|�<4z����NK`��O@g�Y6�|�C�ヅ�1�i=�ж�n1���哄�P���FCm=��^���0�r�.9���N�/ ��$U{�;I��2��j9C�<�z֏�{%�� ��3v�4$gg�Ln��V�F��
����ԑ)͓M��M�t
�<����j�L�Q�>  � �J6    �!��@ T[`�D*�,m��$n����+
�f^�G�.��C>�񋍁���UW��*��ĉ�}��7�䈺�d/�K&�fp���p!!Q<r��Z%Ll�R$�dIWe?���;h������$�/��K��,�¥�������w���k7��]����0��2��4���*	�v�5+K���8ܘ�����IK�d���OR��KZ�t��rK���7S�ଢ�r�����WUM�`ԥ���k������RnW�?�}f��ＬC�d����6���j�5l�0$����VQ%�ϴ��y�KvNP'9���4��R�	i
+8"g*ͩY�J[�t�b"F�$��XI`{3=&<e�w�l�HTf!J	n'/�RC�8���Ͱ�2�d,���5�*  � �JM    �!
K�� T�(�x��4
�ؤ%js!�UՄE�A��[{X���L��<�ߐs�:|�[���z2LIs���>;��M&�r������"�BH�z�\I[,�Y$.dq�Q��W�ސ��)O�Ƭ��/u־�:O����|�����Ə׻1������5���v��N�y�$鼕خ�a���L��J�-�jE*�y��=����R�a�0��&�(πw �-i����a,d�M�2�<E@�W���ijp
bB�k�ˢ�G�:�TgJ�׶΋心�q�/���;+e][=�o8O�HLP[OiNI'�\a?_�����:_��EI��K %B-^OT4�!�_ň���YG�=(,�!D�!0 ��Q���+·'xQKK~KV�Irtߓ7�	��UH�U5��`ITa���q��{   � �Je    �!�� RY)LH2 XT�a����o�f�����;x��Y{�s2��~�n+��`����jY:��'m��Dy,��Q�"���n1��7f�u*���(��XbY]�K�
��K��Oz�-��[���U�A�~�����5E�v+b� �YAi�6�M��+�'6=��{}}v�bHI�#�<HNESYୗ�ʻ;�h@$ț��M����A�Hsg5��EL�(�T�]�B�J�)�Sؤ�W�����:�U����;W�ޑ�;�/ۣ��4�W�\Ic9�� v�H��e#��,�G��"�*���IEV�����ڹ����@VJn�*(����JDr����눡o�4t¶w�D�˖�1ҳɣ�|S�(I�N��|�t�n�}�S<mE�?�J�  � �J|    �!5��� T�h�R!,�;������8�ҷWGIy�X2H�n(�����f��n��X�R���9���,*(�m̢���訪�&��߶�2����=�1����ɩ�S���%�V� `� ad�ܔj	T��H ��v�����=���<��Gm?|�&�yܷ�*3X�j����sz��!Z��Rb�	^��xV!#L��W^��ȉ�4�v���Gg���*�޵K�*�"������,@T����(XBX@$�ynGz���vs)��8�_�|�7(��(�����Ao`cEv�-JmG�(@��DD $�%4�=����O�N�KB�

���<\�"�o����%�v�fS���9	8����xkc��ю ��JD� cF0���  � �J�    �!
�� ��S�Y�X�_	��;!��3��U,������r7f�>-��!��y4�`L���6��I��!T�ܷ���I���#"��VJ1PoꞼ\u�Rj���P. �R�M�un�H�!�����5�Ro���s�� p����z�0�~�!(�&�Yu�z���������Uγ���C��[x�~���）	]tE��>�$�K�ԘYE�-��U���d ��t溝�X�0�v��5�H���"�(�fr��&��QW�o���Cy��Ϟ
������4��yz�e�"�Q�L����/����onl�i F������L;HX>����t&@?�����	C_�E�8�NP �%+�7Q}]-�� 2J|r2^\J݉+[/�  � �J�    �!�����SۡH5(��z�&B����~�	D�r?4q�����˙X���|Mn�	.���w�ow�)����(��1�fQ� t��0�JP�t� M���`��b}PoV����D�<dT�FE�d�<�T����+[�;��?(���p�1���t��N{9�C)G}�Dճ����B����)K�ie�"�����T	BnQ��	N�����h���k��&�-P\P�`�dż��Z�R�2�(D���{��'�fn�}f�u��#M��@���T�Y�a0�bN���		��9r_y�S� @x�, �(�q����X��F��@bZ_�f_�"�"�/Iһ,�$�! ����^MTݘC��ĺ�E
B"��ot����u�@S��
C 	t��U_9�  � �J�    �!�� �R���GD�U
�IM���]�`4���f��	)�t�\��T����Y���"�!�]{�JЦH����������l2K��Xq�0D:��hp7��P�]�D�i3�m�ʱ��Q��z�Xڬ�2��(@�2ܐC
�h/��{0\t��跔-��qO��.
�� 1��i�vV����|8$C��'^KF[������Й��fVGF������J�0܈��Vj��[-UI�, �+��:��:�`3e�߰~+�NY��|��S��}rPEv�eQ!F9G�4eBs������d<�r��$�2�E!���|��(��l�qy���7R�5���1��3�>J��K\Jƞ����������+jޱ�	�^ݺr&�<V؁�F�p ���&�в��9B�  � �J�    �!��\�S[��U�le����$r�r����w��}n>�X=Wbrw��N@�5�� �C)E:	3D�<Fr�
w�֭#!C��zč����+ 4+,(H�D�}P ��O	�P
)�m����0�	�G:RGJ��M��YAr�,F����#jur�5ڃ���!�_��I.��E[�Po�$�(����@ �C7�\�UZ-��# �]��Ya~�q��9� +����FD�(�p�	N&���R�=w4����7M5� j/����+���x��*5�]�(��w���T��;I�v��(b�'�|����S��-������ht�Ps|�	�ȶ���9��������W!�����GGl޿�}\�q��S}�Z�"��
C �B E̐���jMA琞����ۚ\m0  � �J�    �!���R��7	��TTdo��픘E��0q�?@w�0h2�@N���?(�LPw�'=��4�e�d�j��%b��c��:�[�Ǌ�������E�hr�� �D�?;�#upcW!����T�<g+ky�3+�>)����M�/���8`m�턋Ő�Oo���]�GҪ�;��*�@�h��	�
)�R�~���V�������
S,: "�A@X� ��$;�1���BK9�-��@�uT��%�s���-:�y~Ϸ�@@q(��
#�<_�[�NE�\���B�+|ҟob��:��Ɂb`$,�H.�%S$_����ߓ�F[�d'G�
�k��i�K�g�w�iӖ\hs�t�'h���&���Zw�Ӽ>^3�MxزY�K�I��W�  ��Y5a��F  � �K    �!ҡ \�SRl�H
�R���w�U�4�UY3���]ۀB� �B�����^>��6�20��%X
���}�xx������,/�T�����]f�)]���\�Z���G�X���V��-�z��I��iD��̯�uC��� �h}܂��,oY���(���+�:d_ Pzt@Rp���B�&L�����i;���(���+�~��I�P�$9�Μ(��6PO���{^���6B�
$N������	���d�w�y�y�
�݌)I@q6�ǻ,���
���(�9�3%၇#�v2����dUx�5�c�jF��Q;��Ѩ&��}���Yo:7`�mc�C��D�� �jw	Z �y�r	$�O�t$�  � �K    �!���\jS\ �e�[��ըUW�W5��g��,����B>�5�˄]O;�W�W7��b� %�C�*7�/~6 .G�mp�����F�NQT3e�-nV;w� ����Br��w��Q�PC�[G=R��ha`�@��&�'d /��@�0������3�XJ�x'=_�W?z�ڿ��q|n��b(�Kݬe���Xb��&�Az�.9z6�d'�T'�* O�iLe(�d<y6*��W�s�6�%:,3���[��Y���h��? ����ڒ{�<��=�ņ�:G�70�`9h������Z��FnX�J�@3 
_�:�#��T���4JĀcm_��~�$k�=�Ήn�{z���Pn̄7w\ﾅWWJu\WH����7���5'�<��޽���Q�� ��  � �K5    �!���[hT� �H$P��*m�0���9֌Sn�5N.�����1{UrJ67<��<!.*Z_+2eҷԘ�X.�Th`�D�v!+���k8f
�	��C;�a�M�<�J� ��^H�`JdPJ��ܩ���?\��Ԉ��^�{�PQA�{� �1\��Z[�SJ�LE��� v��Wׄ~�d�@)reI`K� �3����R ����/[R�(nLG�%@�AQIH��V����@����n����&����g�`���,ʐx�YP���j〈�(��Xo8�R�D��Z�@CH�HB�D��S�������n��=Q7*Gcq&��a�w=ޣ� "z�����ʟ�U���UwX��?�o~��, ��?(��K2h�V� BC�  � uKM    �!��[�T��P6�޵�j�R���i3%cu���1�#�6�����9�]w`�C��(�M'6-�J�}��f�yc��S�?l��g�7q�d���Ή5���Ѝ�O���>UEc��o�ݧ��¢�*��r�}ƾW��V�A�W�4^�WW�5���#3إ��_�E��*�8�ĜA���Mh�n@�T �ꈊ�f2pb�����b��ۈ��45Ҋf��z�4�:�IJ��L��RR�8�z9k��7N��I:���5Q�td�����	E9���Rb�0�n�7�~x��sc1�j[v�[��׏S���!�E���h��2\���KE�$�[(3�b�8F�Ϣl� �0�����Q��B?d   � �Kd    �!��_�R�ؔ�����W����UUeR���	��4���Ł�`F�t���sI�$)�o��[��㣜8��8��������sYaG�m�D������Q
%C�����+�Ԗ��|>+�t3����Ua�SW�½LٴL0��,��l��Y�~&�0RGݦ�ãhX�%yHL�P��
P@�\�fI�Qfa
۬�  Rڨ��a�P" �eDC�b�h�xsuE����^9� ���s~����4~�$��׆I&�<u�<��5�mť��k�Ax9�~���p)��6��E|��I�����L��ctd��u@R�o�Z����n`x�����(�N\cY(�ǈ�S[t��4�9.����x �$P �8  � �K{    �!��Z|T� �H"�TqU�kUj�-;�m��.�5jlg�eL#�O����g��)��5�����;Lrn4��8g�%iҾ��O�LOn"ޘ�LEb��ajI��Hg3��F��d(�X\�d���2��V}��]j3��9��J���<��� }p�S�V.==3�յUw~���a{�0���FQ�]:R&�^�P��U�|R���(˼˅%���
U!�a P&`� �n��WJ�V"�C��a��-�������7T���ԆS��g9�vSY��4%�� �kN�op���8����ՌWY�,0�lؗ-��0�U!A���j'�hK�
kT�3
q�c��	ٗ�+�#� �VhJa�QF!���x	MH'�G^�i��� ^]a:�P�g�  � iK�    �!��[�R���H�旫+�-eET�JDj4k^KHj悕���a�8�����-\�/!�!C<R�����,B��20��wDXO�:+@��b�BM�)Vk�Pk=_��Y������t飡��w�~&1�I�݃,��:m�����D�Ԗ
���҂���,'=���E��i�AP z�i "o���)�S�x�4�+�� ���#+�5��l�D�3tRڠ@��e���l-�g`�ŋ~{�N��g���8��F�S}qy�LQ��
���a
z������Y�d���5E�P)#�13pt��]O��w[5�FK��sf���$3֦@l��b�����{ �FD. ��=`�T ���  t �K�    �!��W�P��C�R��6��@��mC( ��v�n6�w�̛�ȣQ�
���3�-q6��j-u�i�ec:`NGN����RI���"�s��LAHD)`ZgQ̴7�1�O �X.��� WAM?b�!�Ϭ&�������n�'�ɀ���2RЫ�Z�[��U��hSǝ�E$�\_ʠ����<�M�%�HfR�����u�N(���&���a-O^  iv��LA��Np
!	��خDA�J��7�����λw�8_��iZ��ւ��S9~m�!��h���l�ϱ��h��S�M
^*���D�&��_�7~����ZY��^3�Sj�綿Ǯ�f��������b����	�� ����u�i��Y�w�VM&p �@�  � }K�    �!���XR[���Ȧ �E<_�1T��L�Vd)KLte��i�����Tg���f�T�ԄxuөJ�/֣T�|��W :Mv��Unç�QJQ�N��P����A2P�b_eP���FW$��+R�5�x�a�N�e�9o��Y��)�j	����S=��u����&Wwf�[1J}�r�����V�]�$��fI� p(u��ҌCQ��G���?m�� v�+`��f�ܵ'�Y�R�aMY
�e�NR:��牫!x^�g����;�Q"�n�B#��%��X�\�+H�Q*� �m�d��;;�-�,S��3"�n�%G�2ro��#���5�F�d�h�:���:,# iEҸ��vm�T��!`�l������@ �q ɰ���  � sK�    �!����Qۨ̃�7�K�4��玕���@����)�"�}�K���~��V,�8�{s�A{�G��<���-Q��DN!RU`N73G_�^���yi�f	���RI+�W���� �΂���-u��R�J M=G]7y*YA1` �T��@�7O�7::�	-Я��a���E�Ua�r�$���"����� L�LgM���d@B@�%��,R��S� ���ԗ�7:�/��\���/�%��$�؋2?1C,O��d�Aw"��8*o�G49�Pq�Ÿy�Bz�¢nO��$O���)�Q	⊌�l�)g8�����p�7��ˆ.�S$�S�ˀ/� �W$�D��� �  ~ `K�    �!    Sڨpf8F,<_�V뿄`�5��[՗�қ��6�dX-��>ʞ�đ���1}�5�DwV�]<�(&20��tK0��ئ�=�v$EQ�Yw9��8�^ 
,�b,�C����yT9҂`^9D��]H-��1����fnFeN3�TVßۖN��R�����
�z�,�V5���f�f���]7ZbVP.Mñ-����y����Rg|�����<CT��nc_���?�vr�i�r|��{����W4w��gB���~7M�Nt$� ���.P-��.,*@N�2ۧ���	w��G-K�&V� ��K��2n�Dx  k xL    �!��r0Pb�ѹ!�۱'v���\Z �fֹ�T�yW��} 朢>��G��w�^�9�(�c�x�uN\fJB¤/���QJ\����D#u�`PU"L.y2Y7��{�pL+Q�IPj����� !jz��@$(?A�y���ȩ�y߂n�5W{t�2N�)�`����U�19�~-�W�D�*5<��E��;�hD� SZ��eP�W:�ʦ[��mu��	vԫx�X��]z�ۥ�0�h�);��"��_!�\i��������@%V�fI+���{���VӅ��K�L�]�u��S)��_��h��n�E]�+�dHO>��.�B�*��ƒ&=:�S��^�ܞ�t���@^%2�|p%y������N��=ط�  � �L    �!  PY�f,�L-���\𨪹}�
#B,[�&b������	��&M')�!9O�#�Ͷ���1���iU���`�@-�B��\�㓥�I�d����zA��B0�����5�}�S:ܼ����$���g��f��u϶r�k0�p�`WW_��j�����տ����2�8�P�\!L��/�C~)��J)DeG�h�nP^�%2�� )-TV�������pP�ۆsi݈.��+����M���R�}x6��{��CjI�Ԯ�<���=��2f8�E��(5�ώRߗ���#|��c��-����S��=�pK=���쀆�ݾ�qƼ�8@b�V���w8Y�	�Up�����@�`��-� �Z�'K��8�*�R8�d*�j�U�eE�8  � |L5    �!�Á*E`�L2�)΄��R�����5�uj����/#������N�]k�	��6�D�Ћ�&�Te���"�Jp�����k�����ko��8JJ�����N׻rFo�vNb#��s�r�1^Ɂlk�kv�܁���}s�M	�JJ�Eޣ �9�������	��R���-aŪ���B*���q�`Pڨ�:��-	[�M_<���"�%��Y��.칽�Y���q��T�#��r5�ݼI���U�O�3�I�ȴU�V�!C��Z<�����4&v}�E�㣫�Z��7q�}I�@/B��ө
��q��
c��\K��/+�4��>9�鯷օ>x.{�9
Ne5�N7���FV�EԬ�ڗ�@�� �  � �LL    �!  ��[ah�(��KǍU�l��䔣*��~NV�����4�,wH�hz����ɋ�zM����١�q}S�nښ���o1Y�8�
�I��i }��Fy�~-S�)I9�H�s �3��Y=�)�������W@��sz3G[ �B���ҫ-����)�Ϗ�f������Ux%*@ !���?3QH�-l�o�;�~��>|��sCH�HԵ3�/��x�Z��:	��A�H ��V��*�!�ֳ�Y<٢f臯��?��w���zls� �y�*�?�F��73�ǡ(�f{�d+\W�W��/��,0��ݝ2��.�y}DB�ܟ�� �Ң�b�L�k�g�AI��@� ,vj�J.˲�8�P���BJ������W��R)O  � �Lc    �!	���k���iLG	D�N�L����޳)TL /=�F3��	f6[{��q���ܚ��8�=Ynș�����!�W�#�F"�c$F"�ӝ�T��~��0=o+f�  HXd�:f�dǧP�ߕ�?A;�,��r�`�4�ӨT5sj��]��Nú��.�<Nj�\JG&��f�/\\��P4k"n�Ye�d&��;2|�KB�O��*�<9]�@��2�T-b�'k�o�T_  �|��N��X���y�)�-�Ġ�\,1(-���a����J� ����;��;��%鹢�/6�)vu\�m��U͝��";T�R 8G�
��L`yb�eV=[��)����D�㖠}<=��J�ت}�"�}�"�P��9�;g��eݓr뱾�-G���� $�<��  � �L{    �!
�� @�Q�(lt0�2�{0�Q@�e����z�h���!�S��Eu�x�H��1E٠�7�B8�Cr��m�S�"kmh`�ۃ_�B�z$�^���z�g`����}��zy%`�iL,�]�@`Ze��j���+��t5Q|�ܵ�Avb�:ul�W�l��s��z&�J�ʱD=PTȶ(q˅M�@�i�c�� ,�i��J��g	MtzU����jS8]��*'a�C,nt�,��1�Cno��s�c\M:���ˆ�����1Z�9�i$�0��c�=K ��G˄���0���`��!Jz'��(H��>�� ��/�[O$��s5���������p@���_R�ҟ�E��Pu^t]N�B 1 )  � vL�    �!� R�Q�!H8���ґ�
������Meq�"ۈ�uDN�ǎ�Z�� �p�G[�m��h��� {Cv�T�Sn'�h"��*���u �������䐚��L�
� u�����j�6Ŵ$���P��W`�2�[�'N�(���~�F3��ڥo��K����k]@�s�	
�}�15P�d]��t  ������YKh
��!72�ML����q	]8�q�u=N%U�6P�@s�C���QԻA�7�bOTq�Z5��{�7d�(M!Px�Nڙ��&�)��D4#@L 6��Sa&R4>�B�6��!��+�p����J����c��2�z�N?�T��}=m�h5�:y���t�'��eF��jʿC�  � �L�    �!�� V$R��T��R��7*�n�R��ۢh��a:$��<ֹ���.����9���X�qw�^/�Z�׊D}�
D�`�$����0��$�f4��N���At�Aa@⍨�@wVUB���--*����I��[�Uq�;Om��%|�&"��^z���T�@noR0("�e� ��<Glp��ר\�Ik�(�G�0�P!	�$� F4˵7~]�)e��(�� �xQw1��k���_:o՘�S�$^{������n����ʮ��=��|c8�%�pU�	w7����!?:_6��:I
ɺ�ۦ�¡
�OZ �U˔��hS�s��඘�Zߧ��)�h�-l� S柒)�D@  � �L�    �!��"�$U\�n(Jj<���J�|@T�J��L��]�"0�Q��2�p��r�%'a9т�k;>��X㽸�g����Q���;4�Mu�d����L�g��R�C�񴃣B#��$�b���g��R�?>I���{��_�U@�)Uܿ�:���Z����w�����r�yT��O�}S�� t�?�=V� a��3��a�+}���rV�-��J�5�	a�� f`��]��2��4X(�M��h� �g?�A�mnbD�v]�oN����-�����Yg�nL�k�,�j4F���4zK�� L	q�8��Y���3LNFc� �g	�I��
1,T��P].���¦Z6a}�ĸ������	�o�� |�D�N
���ȉ�  � �L�    �!� 2U[dp7Fm_��uPR��+��B��E�� .sS������+� 1�	�S���Ǎd��jUZ�ߢw)0�oA`�\�}٫��1Z��� �X]m_}T*���	��s�F��ny��>�	�t��	nUDw	�.�4�V�M+n��P��Y��bzFɮr�7 �ș((k�7�ے{v	u�NF�đ��V�D�+��b��آ��q2��|W4^-*��� B:��/�U�-v=��n��r�0��E�E����y���)�?��'��c�|����אN8HG%�{�$���}_N�/��ZB��X �n��H�ԔL7�� s�|N-�2��~�43�(�`q����gJo�T� �![/in����5�jN Up�  � zL�    �!��@^pR[�4G�pИs�U�U��Uw9���̠|�+��m�1��kPf�,�-��q�Xv#�� ���f�:��ߒ����h��=l�����:g6��W��%]^��^�
�EL�>^�K�O��H@#*�����
va������Y-�T0?�|�6��4�[�8U/�'� P�H 2�$	�
��� X*��SoPi(P ���\lH���j�Ұ�j lǲ����FIk�4���^.3�b�
����Zd1��(G����_ǃk������ i<�n0�k���oKϻ��� �'���8F����?�&&y|?q�iMpH����mD��b�c�����HKe�.^j�Z%,�#@�  � �M    �!�  FpS[�L5��*�8�9uRL^�b-C���FiK�rUyv	��Z�8"���څ��d��IӺ�7n�-$S����ːR��n
��$8=���1�EМe8!����!|(��QEh��Ѷ�"p!�Z�.��^��3�i9��B0� p��*�B��T��!��>��G%�l����]W�"٨��$D)��a�jR1���6Z�`J�΂�h #�Q��C��m&�Q���h ټ|w������q謧�~���uN��]b����Q�6������d�M�em(�p��}��+	g�b��D~� �d/��0 !�ٹ����ꆵ���5�V�[����s�@ث����u���`�{����4g�{��� )���:���]s��P���  � �M    �!� B0Rڈ4=��`�D�!�t�\7�8��ڍe>���SK�,K�VBt��Mb��f���S��}�����_d0:N��l5[r|�K��GA��"���l�Zo���y}ף�#?K�َ:��q��,jGb�Qs��Z���N�^����}E�t{*T�w��P��:�`#Q �`���߮jh��@�����!�2,RPA�.���$fR�ܬ8	ƃ��'T�лS1j`�+�w�V��hՊ��ɐM��1TJ��Q�"Y��`#V�I��V����鸘���1>'u�߲7��)_ SU�Z�Ԓ3�˟li�G� c�L�L'�Y]H�:���U[F���
X�|H*z�=y�jT^N�u����p��W��b����v�5� �  � �M4    �!�D�B0SکPF#�J%@NxuD޳Be.�֌ީ0G�_��/;��8	[N��Rp��RD��y`�5Car8c��Lp���+�� �g��z	rȀ8�py`a�2y��*�
.B!�����L�:]L���.A��\P-�˪�������D ��B}}hPY����uoE	�V�ڱI�p���ޗ�"�~Y���
-X�H ��ƴD�Ah?���CbH�JQ B��r�7ӕ( ��SK#��4Q�^�7���&��0G���΍&�����rP�U-�-c�3���	[�F�C��*�D�&�0�i�_6����R�����ӭ��غ?Y�8�4Ưm�dJ���b .����Z���.�ș�����HD�١H�{���fg�����&��������  � �ML    �!��BpTZ��X+���� 'l��#$����]k�V���W�$����$E�oUź�cԋ4S纔�S��O�(D��|���u�x���,-x��h�/ ʌ���[��A)�A1 6#�F�g$�s����$w)���|�Mz��l�˴�Z���;^EU�M�����CS"|�����R�.�iݶ^��2�twN��k���ċ�JD�g*b�'��B��&��L���@\l"F���v}�����RP<�Z��c��:�+-*ِbtP✁�����'r\7����&#��������	��ſ���r�[dVg:nH����G�<pY��G�L*�4�J�����9���)�Ҕ�T��7hp��5�??
q�U�RBjo���D�����_eZ@
�
�_f+��  � �Mc    �!	�&�B0RZ�(+	�%@Hŧ~f�^5��ٙ�V:�w�t�1�W&y���~Oz�r�.{���&�����b,B�Y� w{A'i�2LqC7N�sP�Ǿ�Ӓ\�'�8 LΤ�zs��0�2��#�p�H�q�(� #p�78�JUѱ�	��^�G��^�������]p��cz8ި���R�T��ĵ�2�DۢVU�b `XR`�F� R�`nX��� $�(�]d*��r�f��d�8��J��l%�����z���J�nUޏ�D��j0ɣ�V�FE�jū�u�U��� ` (��n�=���R;_�x�pJu��yQ��A4�/��	@?<;a-�Mw`*E��^�_w��������{+�݉/]�gx�{ Kb��uo �G��a�  � zMz    �!���R8R[)7	��A����e�B����!�Sm�0�M7�벒M��4Um���z"����:j����Ϥ��Px��W��(�Җ{$����)���9ǚۂg?����N�{)*����1�|/���%�c��7Z��Ph���1��8���c��Ss���	���i j���y#���K��ԕ.���{�%#�h����x�&�pK2���~�tEk���,8
�H'�|���[i�,�kH��I5B�Ѵ9��>����W K��cpvb��QJ!��m0Qr�_���{���3_Q<�fu ��C:F�Q��y��=�s#��k��5�F�i~<�s��9P	(��}�T/�� ���c�Y��Jݠ�Ƣ�i���  � }M�    �!����8P] ��Fj�^���#L��u�Tͼ�`�#���+�����0�z�2ځ���JIMBv �-��(tp�3���)�e"�� ĝ����EM^��)��:�8ci4��=<�S ��{Z����m��������,0Y�yB�/8V`��௏U7�:J�	�ۺ���n��>o��h���vg)�%��[� P�Sڨ�X	����b  ��[�JY�,��8�>�h@�%Œ�(����������5���dj�ebv���#q�'2=Hx�o03���	�����v���H�V�L�������3�PR�W��"3��r��֪J� -���W�=s� O-k�M^�uJ���D��_�>  � �M�    �!	���xPڐ4�$D�Q��"���#�sM=|��T��}q7�M�Y��1�cM>v��Q��s����Haff�8���a� ��\ ��o�"+���������8e�g�5�=��MuX�N�=|��t)�J���Ҷ����fF�.{h!����KX�y����cq������2Q������{j�A���W���0K� (0�U0%#�pc {9_d� ��G�5�K���D ���V�����Lʡ�� njUp5*1��I�p�L�5k�;�$�q�xӃ2l3\p��?7�w����b�]룧����KV<5|Hn"hQj����ċr]��Ua�/G5��#��>�4n�p���y
�jj�d₀ ����y�G��>�������vQ���a�  � �M�    �!��"VxT] �(	(%�z%̂ժ�l]9p#�4x�$ך�OtX^�y>��^*r�pH��VƁ6Q�E�Pɰ��R��
��ˊWV;�5,Tjp&<��|-��~M �ΆI����Kܥ(�E�����0~���$D�%�N��(JR&�5��q@.EP�2"Ð_�(YW���:V�s�a������_�2i�C���~U�$�ă_�[|�j ��s֨�!�1 (0�A%\�8s�C���ʠ��z)��o��L0vR�v1@-�̸�҈ގd-�����/^�-K��}�e	̚u\�޸:d�l$�t��q!���0!,
@�%w�30���V�ay�.���K�~d�·�����Ro�j����4ZQ�c�p��'�  � �M�    �!��"VpSڡ̓H	p�Kw/Ƴmv�ɋ�� +�Ndl��z���2�ڑ����W>v�#�9�����i�~7������N��. ��ևb�0��0�FC	q�P��'�`a;�F� dl!�m��m�{f�j�Q,q���KsJ�H�� *��`x�D30*Ou�J-����]��օ�tȢ��:���% �-�c���QA�N2X ͛TV�"
!� P& �#
�!�L�:�LɄ�� a�`��]y�F�Q�Վt��H��d$QE�f��7��$H�ݹ҄�������0�=��\�7�&X�v :y����  P�Y� �-NY�r"�kt$8c@!�#�"�E�Ne��X�쵦����3o�da�����/�� Ջ���  � �M�    �!���FxT�)l*�@�RC����ڜv����݀��;�v<��T-�txW�E�+�:�9@��VU�Ä�;,�������� 3�a;	�_[���q�!�9wgIo���2/(�,�r`8
5W]  l�o9��������)��M������$�c�D�uTF����C�_F��J�����Z�R;���(5�j*�!*?S�#ﵡ��_n*��	�X ��vj����� 
"	x�| =]��h�X��n�N듈;��n; �zP�U��(o0kb݃�,�����!]�����	�?گ\��Ed&��v<u�a�$@V���(3�HU�X&%�O�v�Ť��0B jTi�P2(iYW�N�H=��\��w�<٨�����*�@�ڮ�  � |N    �!���v�U�i6V:DC@�Y&_��0�qh���́`?��U��Db�Y�}��x<�Ȣ��	Xc���Ť8�<����I�����N��@㜽�ĸ��m��R�O/O~|�L�_&A4Ns�
�*/�lB)���֚�A�o<�e�c�0��մ|�M0Gb�'\��/]�c8�J�Q�_�а��	�
om"�h-�?�^�%����{�i�������H
�k�,Q'� 9�2���i6��!`�B"�PJ������q����,�F8y���Ԉd��Te�*��z�|3l�4l�;����ܸ��ͩ(�r�hB��5��S����K"2Xy	.`�Y�\�;'���<<��|�*�  � �N    �!�'���SY��f8�	/:Ux��]n��3%)u�V�*�!3\�@�yx��T���=_�8��FT�-�WY�^�h����)u�k};���O��2v5r�����r��eW��2�@�kg�B��@N���d�q@�L�,$�л%� �n�����e�?-���򓳠�,f3�H�����W�����V&�*��cP\�B�a b���&O�����!h���"y�ȉJ�@��Fjr�9�M\$@!y�� R=��-����	@b8�4��NꁢW*.����e�� 6�2��Z;D�[٣�)�pԁ%t�q1If�� �i"0`
����~�n���~��<9'�,�DM�Ξ^�d����A��;c�!�0�n,�5LM�$&+���� R=�  � �N4    �!��o�R٩h#��e1C���1Ψ+c�2��S�mŃF�N�y'�m�F��!''i���X"Œ��Q0���X�@�i� ��+���%U������/�yz�{lj����~.8�fP��s�%��C�C���
)O欫Y��z��%�]����Ғ��׏h_{��+���$��ua#QӖ��E&+-��%��.>��q�
}#�
ʵ� v\�7/�5���-b��O&��Y-z�!�w� x'�2�M��d����B]L�yG��q����P�6>�!�h�Qr���l%��w�Bv�@��ℕ��D�к�Gh|`���O���f����r[ju/����Տ`zdɻ�K�e�����O�0�l��}�2@��J9Z��6��kBQ�@�h.z�=L�"�� ��  � �NK    �!��k�R��T���5 �&���5J�����[&�-jS�2y�[7�l�e����|#7��m&��,a���t-5hѥZ�"8���- ��n�h\�����+Q��/H���9�~h���M9��`����,j+e��4S����K'v�s'�F�)����B��6�$�jCOaAY�
��N%�R����q�fu�׍��n�=Dxe��VH W�=9B�+"�a��FPXJ�UjM7{��M��z&B�Io��{�a�WΧ�#7�K^g<*�l1��Uao}�cx樑B����=Ζ��\�f��'u��f" h[����!���yJ��2W��i��Pb�Ί�p��u�K��=~�����TV@K�R���� ͫ��5	y�����  � �Nb    �!� o�R��,8�(moN����77{5��O�:��ei�Ff��HZJ��e��e�^"4�d�U��,�=�ɑ�4<t���K���A��x�T�p:�C��K�,�J�nҬz�v��f����C�7|[!򟢹���y;da�:G�2�(�9/kl�rjxw�ͅUZ/9�C�����@o����� �Z��L�ㆳ^���`�Qul1��e�aI�����Ӣ�g���&m���L�|�Ƞ�*�T�Fk��<�N����G�������o()?%� X� ��琈���P=A�;��/Q  1y��Z2�z"�Ö�z�t�,<�%!q ���5�XY%�J���*��E����WC�W�%�u��0W�  � �Ny    �!�Pj�V[$V*#
Eq�I_xUd�%U����U���υƥ!=Pg���ݏ�- 
>��n�A_x�ܬ���L�� �1���>#%��B�y� UF�̆X��R��/�hDc���s�g������V]�Z<b��(�Y�%@j�aZ��JfN����DAG��.�қN��B�7�>���"Sה%���XOXP�ZAX�D�����_���R��e ֫WTS1h�K2���3�Ji�[�PP�(=v\v�Q�<�$0#U��O-��k)��%��dVz����Bc(�6LZS;����|�
 /]�8�ZЙ:��ya ����!������T0t��,@�}�7{� F۷}.�`\'V/r]x��je�ĸ��}\;i� ��v�p  � xN�    �!�@{�R��t'�a��@ h-����rw��F��v���&�&�9G,����%����-b�� �bc-�r�S�2zl�'�e��~F�!\�Ԏ4k��X+�����U�>���6L�~�.J}9�\2����[��!�6>By@o� tO�Q���F7��!������`�)�`V���/}R��&
Q�ǃpX��:?<�(�Z�
9���J���1 �`ag�E׉��@V٢�Բ�)$b�\�� R��&|�1����ac%�,�uZ��5	�1q�&2��E���j�E
,�3t����a���Mx�����ZCW������,�?�Mg�w�>OX��;=��WK�<��4��&��bA�$#\G  � {N�    �!�~�V\(�'�j#��e0Y�v�ٚaDՀ���<`�&:^~1�}v�p@�2�z�!@F(E�K�9#�d1�g�q�j_�7<�W��%�V���FB}~"`�/���<�*f//����3r�("߹���!�El�O\�%�pH_��)�¡�s*�}�<�5�/%xBu��E�d7l%<��7=�%@$�3�������p�cBp*�	�{
�Â�B F�昵՗��P�N�e�DR$Y�Q	N��
�"|�m�*�S�'��qͣt�9/�2'�+�c��g4s��R�X�@aFcR���Hq�oow��e.���µs�5H9@��'�`��fPp֌�3�I�t�H�u��?>��NP��v  � �N�    �!��~�W�P4(+�Nu_�R�I�sŦ�V]PF�ǧ2�:T��E���X�Df�)Cl/�p�� f���1�C)Z�X(��ؘ����ק�s9%�R�O�Np��8|�s梎~}3� ^yae�K�� H#^��2���z�.��ZkVx��`|N*��G�N�3o��'��𪖾7%�dG4��9�Q2G��.���X ��V�P]��\�A+���kMrbA���9ῂ��dJiUSy4��n@�D�4S2�ui#|�bZYxot�5P���`0�0�p='VS7����S�J��z�S�j��.�z.�@ ��x2���N����ZoG����c��Ì�̥x�.�ڪ1Brq�:+W���0�gf,��n�����  � �N�    �!����S]`R(�h"�5�A�M�J.�� ����s�F���>¢�&wN���r矲�3QE�2�h�Z%a�+�L-��Qh�L��f]���>�t���Z��0�B�J5�3PoGy�F�9E��7|���RN!
�ψ������$ߣ��c��;�Mh��=U���4��6����q�V�n��O�DK,��H<^Ǥ��(� �4��:iE�D�p�� &�����2E3 � Q����f�kVM�QK�#��.˥"CL\)��[�Ĵ�û"� p1�3��u���1W"���Q ��������(
�|�;���p�K��K�ݬK[&��go���%����Z�Yy3�Hg�l|�o������m��B��^������  � tN�    �!�7���R[�V	�$A�"0 ���H!Y
�jˣP ��)C�����2�+���0O1@�����\X\xc��zlyg�=~)�>d�Ʈ'I�+�d���g�%)�\j�x�L�(���F�����B Ӂ@ F�J$c�X��W�W7��(?�)�a-o��x�!˲���%U���]� ȃ-�^���J�T^,�oj�WN��l!KDx�qp��&Hh5%Z��d)[k�d@�Ak�+���<`E�Ҫ� ���bP��B�k�K��kc�$�z��#mc,oɍ�e�:6퉄Lg���x�&��e�FO���f�##`�������u�v�+VI�;q�o�wI��C���y�6�l�w��eg   qO    �!��W��R[(�$Re�e��<\�oU7|�Ʌ'�lrP��u1��xCF�5Bl��!bGK�t�����Zs��HW���t�oj%�'�?�h%0\~��"�������Q�t����n^.���<���.��"f���9᭲�Qdv҅�S7W�;�l���g�c�<}�����C�w8�ZU�\\�,g����uokDbn�X�R��N.��!�}_g���y�u%�С�A�v�fob�w�ayI�@�Am�@ ��V��[0*,KfB�U�<��Do�Q���2�V9��õ?��Ri��p����}����b(�XZ"�ta�k-���=o��9�X���p�锔"�X��zpd9���r�w�~  | zO    �!�']��Qڠ�h���!ԛ�!��U�Y=�҅O�iK2��P�8���#��	g^}���Kk�5�U;�B�j����d���F�@����c<�����#�Z[d�Ksa.D���C8��R����[���n	�z�l 5Ά-�  BĤ����a�j2Zl�� �_��5��(�Ku�l�;��0�V��sr���N;xZ| X���L�g
�3p0�A2��� �L��#O��o��Yժ�A� w�C3:[��OȗZ�ǀ�E�"T�=����[�6=�����wh�^	r1����!U�߳���&�tY୆?,1F�R�����	�H,ON��Ro0-�#%�o�W���� 1��  � kO3    �!����SZ��8-�@�P� )��(���M�e =��r�VwF�-���4=����HHN�W�C��*\��Xc9A�LO�8 ���l�L�$1�B��n����oh��a,�e�!E&� s�?��,b��k�t�TRj׈(��GM��[��դ7_<z��it  �U_pc�^�k��뤺��ϩ:R΂�2J��f}i�,D$�%�E|);4�NjOf��ֶ�!te{U��*f�xC抧*��z�55���D����{�i|�;TA1��T1�譇����fv$XĲ)����W�wrl��E>& g�T�H�9����9z��A�":b���B�K���ȤJk�F���MDx  v �OJ    �!�����RY*U	�� ��
�g�U�	G��=�i`��ŗs�/�رRs���l���z��`��G98Гܯ_�6e�����v����_�r���)$��B^��sAYI�-L��	8�UϷ�ל�� U.�������}R�e�K���>�<p0A�`KcCL�17��5�M�ƣ�Az2t���vu�U�w�á��Ɖ;XE�;�����X������i0\��}$���K�)$��%��lz
��� ��`Q� 
f�VFS	�_��WZ!��>;%�94(��J<Q��G{(D��_l��P��|��4%6��|�<���!c�pg����4as��U�d]w�$f>>��0Q��)��Y�dǲ�L��l��#iŃ�  � �Ob    �!��$�UY)��	
i3�5�:s͊ߙ=\�T�Z�
�7�?z��Åc&���"��c�#�zīh�:�&	���4,�R'��B�םE~�@���Rie�sυF����'o�����Tm4�R���IP�$x�D5�|����f�tjP�+�{�E�6j����T���w�#M&

���#.��/Hua�� K-ͨB02���u�F�~�G��Pp1	J� !$�nۢ��~�Un��?;�R�~"��as��iW*�~��9 p�����-�jo�Cاq�*���)n4qk��K��{k��� �э%}��kT���!1����æ�}����:^�0&zYŕ�ڳ�3W�V�@	��]l�z�1V�Z~>r  � �Oy    �!�84FR���U#)�T�.��u���@���#�h�q�L��d
�N�*�5I*wf c$[�NƀXO�Xq���H˭:uI���JT���R�b��6x���+��0_�P�[�����z��U�d�4�u�Ge���~�L
�ԅ�j%H�)��$�kS�V��T��w�uurK|�O�N~ %x�؆��M|��z*PV�3���S[�"�ڣ���(5B�qP+�����]ZW�x�7�O�UV��Z\}�I�+ p�a[�����Q�5����΀zь`�f��2̼T3@#�</���,e���ۣof�Q�����!�����w���Z��s�.0'���Hj4u���b����a,� �o��-��1_�C�  � �O�    �!
�P�Q�)pF�R+)Q�!V�,��8 m���1>i����5�aˣثa���'��K��f`�	���̰�2��/4�7qj�R��R3A¾^��L����B�o�sL�k�ws��Ȫ�q��������W�3�$�R�lή��fn:�T=�Q��bk��0.����$�����P��6���K\ �Á�Ԃ0�"4s�j-��k�d�:q�%�M)<k��t�_�Ѯp�љ�~5=#���	Z�]9y��Hߨ�M1!��,�������օמ������N���N0�w(g�Q�`8-9V��P��k!��[���B�Tv�!X�[�뗢�� ��H�b�S��������P��\D p  � �O�    �!B@\�S�)!ā(�*QH\�.IN�
�oTm͜�
�ǒ�ݷu�A��䙾+K�a�.�w��׹P��q��1�V:�(%�}�q��\�SZ�� &3���� ����S���n��MV`V�^�6#x���N{߶����L&�����
�NU ��p�-���Q��� ����g�HfVU-^�6�Z�Ӗ@�oO��B��vXIKh���� 
X���cֵ������Tt�%�vt3��ʮ⍥�?�B�?S��`݌h���@���y�z�߳�-��g$���FF�Za����*���zh6c�C ]�ռ�)�>d�PR�:1b���<��e�B�q� � �	@R����P�������[�%l�  � �O�    �!
 ^�RZ茇	Hj�����*��֫9ps1)&��m�d�(��Y+/�F��'���A�!2����n�+C)mx5W�Y�G�9퓻�3�;�AQ�,��DL�{������q�ɩ��Fq>�F��Da�� -���f���T^Ο��6�����05���?�o}}:�%�}�9���m�qq���>�,�,І�U(�!}�r^ࣷ��b� �\B��,
�FX�TU	z`�X�b��#~��՗t���t͠=��qi,����I�m�����u�J�Ya2�9q��9)d�Ī�-V�ZEP�\�T�j�;�wb$�d����W=�  ��+uH�,{��m�D*�;�/��kF �����j <��GMx  � �O�    �!]���E��Ċye{�N�m�ee�x�X5�x���Ԍ]�M�t���rAJ�M�ʹe��w.hX�r����%���7	����k:���As\�7R��oPt��Vm�#��O�579�?F l�nm^��>_=���@��Ch��ǵ�G{���kyT����|2��8hJS�1�V�ѱNw��)|5�B�x�րiD+mr+s|W���йU���2�)Iz��ӳ���yLl��#�c����2�O�c��O���CD�y�,9��\��j�{�z�,�s�LS+�P&�)z��Qтm��/�o=;������?���t`K��%"�=�� @�����~�Km=��P,%U�H��cm�i��5T�#5KF1�\\�D���Ci�6mI���:kh&X��p  � �O�    �!e���B��"�{'��3]
ܪR)�iv�"��3��k����@Œ�j��G6�=�o�����) T8<0�f�>�1�oWf��ߎ5�j��������!~�'uT�2_mD5�4�:�h��kХ�绅�V�QQ2�6��]T~-nX!3��-z������i2�������M��n��̿���P��e�����J���eY4iiBU��#C��f��\��2Mʡ9^چ��@7f��jTTG�N��k�V�[D�$-��Lm�g�<��=W7��I�,hUj�ͿxVQJ�f(Rq�D��Ya(�O.�\Icy�Y烍A�n��?eS4&j{�70��cۡ��\L��*�6������9�hq������U��X��%H�R!���Iȁ����1k��&���Kޗ�  � wP    �!]���B���ۢ��4U�$��Ȋ{�c^��2�n:���2�[��6{M9�i:����;�ߴd�`H�<M���j��t������؛n�&	ʓ���}� �K� �Y�"A갹�|�cg�_e��˜�[:S��N��I�J�(m�r*�D�����0Y�t�'�R(���u"�-| ���"�N-�x�I��R���˰W��/f�9M�bQm\�d��ª�zWRW�=����Ge׍Og������b8^m̰��9#��DX-\��D�?����׮ b�^Z�����yuB�v� ��������K�����<�+�V�t�$&��t��Pφ<H"l�t�X� 1�  � �P    �!��   R��6
 X q��U��)*�-��L�$�Zm��w/���Օr�׉��P�6~��+�TSG;�cD8xH�E�mC��?�|�A�^�R�}�h��6��
ouo�ۭo�}z��?#�����ԀR�we�p���t/-F�e���Y�w'k��Q�9g=j#_:;gl6�|[ (��+O8����Oys-�I�dLɤ;�-���D��s���r����wkQ�{�g��*-�q�,D*��~���>�>3���^�e�{]���Q�S4nꞙ��32FT�8BS}}��ӭN�w]жY��0�DU�M��܊;��g�C��ft����c��X�cC��%�yº/F��w�>:W�.2��rӬ��iզ��0U`�:�n�Ā#0[�  � �P3    �!r���T[`ld`�&�p~���[Q%�4��J֣wSy��q��O!I�-%
�U�畣m	��m�r�9x�=�c��r��@����@�������נ�!�T׮l_���4L"����$,ZQY�Y�Ó%�ۗk���~B��I�$F~��e ]�QY?�h����^�n��P�����Y+5$��S�%^�}Dk}�����^������Id��H`\���z.������+?\9M���0�s�_?�����ש>�����Р�7漰�������p����9S9�J�E��@�� �wKg����g!4��/�(Wl9PD���c0��ier���b�"�jh����i����[dn�db�f��ם��'�y�TZ�o!r�Ie�b~�Ë2�4@.��P"8  � �PJ    �!6  C�UZ�̔A���<�F骴ɺ��t��n���M� ����7$��Oj��Y��v�����g�r����;��v��Q�fn ��������ȴ4�/;B�)z�J8k98�G�bcdrZ>�:ߍߚ�m"���@��7Ъ�~%1��R��Z��t �_�h�Z-��g.vx&���u�!pL��Z�!2b,���q��!,T(Z����R��	�$��ء4!������3���<Ym�֐�G�HWA�	1m����: /E�Q5��<+�"Nl4��GOf@$�ap��n.�T�(BFB���xH�ߌMB#�'&hK��h�I�Y������/��ŇC2�` ��"ln��󡘸r�ݕXb�R=2A*7��ѽ=Ǻ�	�x^�^���I�U��  � �Pa    �!p  ^�Uڨ̵!�J�d���^MM��IΑ�]��w�d�����d��A<x�5v�Ʈ�S�ab�_���
!]^�.%�yZ���
���s%ZZƭ��FSns�Hfk;��v	 In0�,�B��ցZ�^��Qу=L�風]�U74A�ŝ�DL�o,T��zG(���ޥ����v�
f3"� 2�,�� 
���h	�^J��V��wA'�C�	�df���7�:cTҺ��l�����0:�t>��U]�_kh�둛Ѯ�q-5'DY��B#~2粣�i��Y��EZm���M� ��_���`��Ʌ'\	��L20�4���[�ʶx��q���P�lP	��N5�d�)�OT�Lz?�em(Q��A2��  � �Px    �!
$  �TY�L��X���ׂ�%�7AK���T煞�w��GC}����C7��vӇ�1�ou�	s�]n2�!aOa�io�L�y��@�;�H����R2�1"�mI)�Ե!|�.��\,KN�J .�ǖ��oچ��|�L�e"����FԔ�v�IR�dS�K�&��Q�OZʟ�n��S�+ı�^WR��@�i�����P V[�fAq���4v�8�95�r��vX�O4U���^-�������fP�91ޅN��j��Y�d N��Q@0 �[�Ht��E	9����RS6�@\9n��Dr�YN��wHl�Xx�F�'���(��,ie�tD'�[����rID|0نJ�K�U�}ъ��nO�'�� �B���]�i/�J@ �  � }P�    �!$  U�ତ �ˉ�+�Ka�K�4�1j�+�y̋�3��i�3�9�ή?�Q���2�#�h��~;\{���k:�2qC�s�~�m�%4T-�ŧ�ae�L�䆓V�vm�Z�� E��$�ʲbM�cn��G�%���tU<��i
iO�-kaH��),�|�,WU�f����ADW�X�����<��-(t-�Q�smN0�J[4Z �s]��dI�U��@�k����&E���&����_z�<�M}s��]Z���TpD	M]8`�/���K�ך������+��)�IʊdZ]����S�H0,ӅIdB4�uKh#n������(նP4@~�)�w�8)x����+O�r�Mjb�T�[Ux[t묏"��
�
J1�ݠD8  � �P�    �!	�  DS��,� �s���BE����S�x�N��ء�J����y�g�?,�ԓt��
@�@���AXP�Qj�>�������m�_m���ERc�b`�w�M4����(cfal~mՂ��%e��W�����#���z���)�� uM����!����~����b���`W��g�)���dEKEd�o6�]�,�Q��ɟx��`
{[�b@X�AP�W��bWh�J[���B����p$�F����,�v����{��Pi��v�^���	�w괷
�(�I%@�֦@��s����HrL��tW��[|[d�J����c9��D���nC5��~]�,��!�M�d��Ƽ~���Ę���|3+�pV�yߎUj�V(�~�,r B� � �SO(�p  � �P�    �!
�  DV�Y�1r�ɥ.Wy�"���E���N`�|�Fs�Z�/COu+�+O�����;L����k���M��q�ﳊ���kڭK p������5ݶ���e��(��*��l%:�Ц�,354�A���t���E�����R�����vц5�H*�I��iI���}ĮҨ�<��
7[�#��F���� ��b��B�|RK�zWe�Y��V���4/퉮�_��>`��/�Gaf�{6���4ր{g�S�Gi��ₒ�ԉ�L81R9 )C!��$�.|u����f#g2�)��>�(����I"����hJ��Z�M�R~r0�� #.��ªY�Ֆ�/�NY�� �5p��;Z�^�X�Ȯ�f�19`�$tD+`�
B���  � �P�    �!��  @T�a	��(@BTo]�+P䴩W�@ �Y�'$�i���&R�s��ݣ%m%�s���?���Kn�%��D;�xj�.jU�
i�_]��|�s2u1K���<�Xׂ�P�3��J���Ni#��cI�y�fY	�'"H׺�ѥ����D����'�5U�j�ԇ��Y=�勉��h�Bi�,�cN����F��;��+>���9�^�� *�@�#Դ[�+��&aO0�p`q�h����iZ�!П>TY�ޡ������X�F���]���ܾ[Rr��I�ĝ(����^�$[X�h�ך-��&6K8��+��/��`��L�����@KS����a<`���y��ø�'��N�r��W��lg��?$?<$�0�l�J�RQXj�:s�zπ  � �P�    �!��TZ��x-	D%^��A�¼�n�{j��n���o��SI��>ظ�������c��c7K��r�v�!7�3)�'oIOWM+g�׭���	ƫ +�;�ٰ����>m7���M�COu���|�:�.���* �l����k�M8z����p�֙���H�V�,d�8[��Ȕc������v�K��d�(�l�R�
Q�[k�3L$!F-z�%+��P�+?8�y�.�D�e� �T`_�L1ׁ�;6ǰg]V;M�rq��/��ߡ<96��Ѕ��@H9���/���˩��;���,�]�=V�R�':�/ރ����==&y��ate�E:�C�Đ�c�:�Z�1��,�#��J�M�ԄZq@��W���>��  � �Q    �!y��A|R�`�#(�:�K�4���*����_˔��un^�q���ϗ2�rqK�i���r$H�s��Aĺ��~%���*��D� _r[���Y�sab����Y�,�W�5��J��Ox��έM8gO4	��7�HT�	��%ȩi�Ġ�K,m�2��T��|0��O���z�d��ɒn�8�̝%<}#��V'Qz����^?���oi��<��\��Al4fb�A6�m��R���<�K��J̰B���4�ݣb�%)DD�m�	Y'��L���j�=Z�4��(rEvF$Rw=��.̫�
i?a���M��U����Ї_�g�\f h�f4Ӆ),��-D����Qg o��(�p2��G�q�\���;�1)
k���@r  A��N
r.  � ~Q    �!9��R�`̡h#c:�N�k�w�F�9���F�v3�fۥ2�H,�pތ�uޝY{�K������)_k@B-xtIS��B���� �]�!(pu�֣F't��|;3<�׊dZ����0�b��"�6���B���+�l���s�~���P��hb�$K,�0����Ky�d��	b�gt�ޓC]�i����O*�A-���f@0A�X^jf3P������O�?rj�)�1�{C��,t6A+�籬;�p+K�'��V[!Bcp�݅U�D�B�^k-3K\�����j�0��!UU��{I�b�LI�݉^*KĴzۮU��8�ǲ��C���U�V▇;�1�!)�6{gm� G��UC�  � �Q2    �!I� �lU�h�w0��"�ߘ*&.Ҳ���&�М�D����.�*�E3 ����O�j�e;�v�̇" C�u�㝻O2�#˞E���������n

S�9�`Q�×��K@��o��"43
������\t�?��I��`��G�c�	�y.p�\9�cZ6V����R
""���,Zw�,R$sꟀHQ ����#p_��'aEj�(�L(��"�nN��[��mBw��Lo�[|� ����o�S���}Binh���E*R���!Qx�[�����eAY�����]�H�F�\h�d�����1M������>��B@�d*!0L%�(
1a�Lz秞���p��*.�G#�%x�gg;�	*�H܎�$��o��'#���)� �  � �QI    �!� �|U[�ERW]��C$��'\겻�J+i@��@�B�}���]�a�H3�Ncd��I)3F~���C�(5� >�85��Lזێw9Z�0�0��̸zS�I���刹�3�N�iꪋ�������<Lb���)q����D޿d�����}���
�]��N�ԠV.f�Rv?o}B�Uf�h�Uyz��d� ^j�j��,%�S���h!$�ᄖ��S)��qu8���2��J�)cB!F3O�O�e� ��!)�(�*:)Y��E"�8���hҰ��:+E%|֡~���n��ޏt�P�ڙd�O�� l�N��u�����N	b��G�Id��9e�/#�(O�u��j�z���'Z+�  � �Q`    �!	A�|Q�aLe�oHƚb���ҭ+jA �?��UE��d�5,�{�Y*�|����q���1R"L���)�Y%����-ί\N�U�aS���#L�¿hc^�r��~!m�S�)�+�{�땻�7��9��2����y���"�� n�)`�u�@.�7��bD&����	cT�z�Gs8S�׎V(�P�kVVJ�¼T�XD�0jk����QQGj@� �H	P	
�I�UHU�Z�fD8����㊺�~�д,��7+I�%N��Ѕ�0�e������0�B�Xmg�����u��:�>��ʌ���m �{֤/j��:(����v��@����E�$qꨓ���H�&Q�Ҙ�:E]�;��\����R���"�N&�c	�f��8  � xQx    �!9@�|Q\ �&"��w����]�./*��J?��w"؇�)$��y2e�؁�S��ڢH�u��ER�Â�Z�ql��2(%�g�Ca�r�R;�%����DB߂j<�A�� �����Hv)y:����o$��̂N���5�8 .��C�!��v��?�dA{�X�i��V�Lwd�.�
k�+��Z�S��h��f��y���*t!�$@�A�)���Z�͖�BvO�M-{@��_�$��ӆ��T�����������h�rmLj�J�}`&䬎��[jK��Z��#�Ue<Aa�Í�I4��%��{T	G2X �Vy�O�; Z�A}}�����r��^�ڕ���o.D��R�m�'�/h�  � �Q�    �!@ �|R��0�1���}_=@�U�����-��L�����,)1��Wke���V���r���M!L~#A9�S�W\Q�L��j!�f���M;�G�Sd�q���	ܰ�Za��ۘ�a�S��ȡ<�Ob=�0�]�
�L���^���\q��%>_�+�O�ߘ���(��������5_^rNUr(Q\�ޚ���D�YQ4�^�Fs��j�5�xо��:���B�4&!�#5��UEu��B��j�\�J��xb�j�v(٠n�*<kh����?%��~_�~�����H�jr�e�"X��l��C	%�ۧd�N�F�� �(.Ow��j��Ν��P�����R:���\�Љj��>%zgg��y~C��jhD�۪�3��ڮ� ��m��IQ  � �Q�    �!@ �tS�!7!�U�z�*���7R��]e ��EgǣY��k�ĝ�~uD�7�M)Q8,�rp���9�D�;�jT�)E���������c��y���5z,��%����L8I�2E��d�	ȶc�G��h����P4�u�/y˳y5m�Z����9e��g�-��O߲ҝ(H�6�S��6�R\S�pS�h�F��8�`Z`��E��tU:����)
K+CE�1M 1yx���CR������vr)�ծxW�w�=ob��U:��6��zP�q �8��GvB�n�=FknI�f]f��Lx��D��0���,�E��βw D�&�~�kJx�6E�B8�B�\'����ƟjH�xJ��~��(�Fҷ���G:�%�8��ZaE���  � ~Q�    �!	  �8R[��*�'(��\�:�
���A3�\z+����O��Vkl9�`�Da[=�O��*�m��儕���
$�t(fi��B�O-p���hG9 �E�5�� H�oi(�7OE����"��O�*���,�<�
+k��tdV}�����D�g���Y.S����{���[RQ4Ն�g93k��D�J��W�p1��2(�D4B�4��Ι�ΉUjՔ�$�S/v~+d,�8���E���G�t��xz>h�� |���|W"1kK��p%�d/F�nQ��{�� ��Bw�yg�ױ����}�x?�MS���o͠#_8E`=*�ݺ�-�K F����}�)�_�š��]�7�-��a�]0b%U�ET㉩���  � �Q�    �!  @(Q�`�)�� �Ż��Jɛ��e���m�����3�����͗5���B��Rx��>�ܖ�l���,�S���L8�8�e�����,�C�=?��NM~�4�&!�8��=*���74fF*���Y���U)��X0�2��;y^j�E�ۀ�_�C	�h�.�]�0Ö�S �IL�ZD��ï\�:T����KUx�AOh�X��6!��4{�u�˳wU�X��e�r�H����nK�1u'I_�X�ц9c�M�8'��3R�����9�1r8��xQ%g��'AN*�,�c�;�;�(�nR՝����]m�y0m��T� ��f���A�A�\��A��	o�A��zBn�X�����d����cj��hSUي;4B;w� ��\�r�'�h\�  � �Q�    �!   @ V\�*1P/��Z������*JKU�G����9�>��M	�vͪX(���RG�*G�H<��ыC9�g���
ϊh�)�B�`���[�%��1�U����@�׀  *]��%O�H!� ����T�k�����_o��f>�O��&3�R��~QK��B?�$m����eP�`�;b�;�KX�����P&Bj(mK���<����o����0�����o�?OC"s R��3��d��Kb"�_g�<����t%�.���[ ��~�3�Hȸ�A%9��o�	j`����J�+���1 n�A!o��o��-������䮌���k�ԙ�`)�q���\*J�%h��\C[
RӁ
�H����  � oR    �!�` @ QZ��(
���R�1�MjmH.,% Gktǀ����k�ځ�}r��v3P�r�j��u�Q#,�g�ޜK��x1{��	�c�D 0��b��I1�y=K9�͂��x_϶�������.q�~ڬ���/��V˟ߺ�	�9�ba�{J�6��<%����� g��	�8�5��襑���[��qh@�1"R�UR�Ur㞠���w��}���]��Ŷ���w��H��<R���} 9��>�����n�x?��3��Y�ew*MV�d7)2�^RA��������KYuֈ ��H� 5pVE@
qF zX@"�ˑ�@�K�@C9%�,�$w�J0Ĝ�`� D���좉@8  z �R    �!� "@<S\��WT�FwN���SH���+���9 �Z@�IM�D��<Hq��p� �PX}��nLc��#a0Յ�`�o���Z�~:`9pnST�^2=�B1���LР�o�Ǟ5��"�eV�C�!�~�f(YP�)6��\���O�>P`��"s������.a��@���� �`n�2H�o��
�:��8x:�
~mxo�a1�nb�Foη�G��A�ݛn`�-��hA@X�$�P�.��.���g���_�=G��x��6�vqM_۝&���cs>`��T�(�
������
�YBQ���Ea���m�X�%��m��׮�{h�i��`�LNK��fˁ����d+--�#O)�)���^+<ꂺ��J�*W�`��PZ��֢�6]����_�  � �R1    �!�D0�|S�PJ�����1<����{�Kk%R��[c�����]U��_P�n9"�S<#�Fq����a�d{n�,�0�s5�8f�H��#�ǣHdj�o)���|�N2e,
R9�v�U�5�<	�t���撔�xd	���fJY,��FyDa�=\d����V�C�9�n�d����F�	Mk���&z�YP^,��C	�Rl�n8�Af�����%o���R��,KE�[��VzL�1�D����V����B�������r���0G�\S�(PC��u�Z��u���jwߡ��<�s�Bll��p�k
�jd��ft$ �"���>n�C:ڗ{A�ߢ{����%b���p (+�;��'��J�^���i2NN?������|���P��"�:~UOG  � |RI    �!�D�|S[`l8
�r�@gzBWV�^�F���?7�3��3�vU>f��[���"�D����I��l���ɧs��M��S�Ev�G+�'_mIXvx��f+���F'�S@֕��� �,�M"hBp��}��5��޴�"1�*���p	����ak���3����l�U��l��hJwd(�0O�Tt�{_�2���~�/&�{e�?p ��fF
H� M�۝Z@@�:�' �I�}cqDi��Dqu|!J�������I�S�+\b1�*�K��A�&F˯�D%����U񡏎Y8fln<[���'�i8���U?�qH�(��XqSC.�nS'��n���o&��L��H���`&���	��O ��#`W��ޅ8ǀ  � �R`    �!)i��xSZV��`���DDS41��"�x�43�GJn'�nl�,nժ��T�M���{������R���l�
ɖd�bҊi�a&�����ʁ�R%{z\�k �N�,w�W���P�}O&F�o����Y[e��!L`'d��p����ya�i�OI��pα�|[��'Nl�zp)*n�q�7f(�� �c.M�[[��E�UǷ�8��k�LC�#:��}4N��`�ʔv�C�Q�`&P@"7HK*�A`ƮH��ό�������Ƨn�n�5BB�C8��2���}��Sbx 6!]��. �i�(�&q�	�CDe#�Q��:��IarQ����k��j�3:ԗ�H�$�4Xݗ=nS���H�T��~3��ԦMfn-6r��˩�:*b�  � �Rw    �!)���xS���&�h@��I���8PEWnS ����$����C^�z����]B�LR�V��}��:4�]���Y�R�̺�T��	�^5f���+�Q�v�xA�)�-�F2]d��IDӘ_��#Z���i"��ˢc,�?�)A�%��b����ⳈQ�� t��uNgA��LM���	aG��S�*l-����[�xhj/�[H@���C�ٓ37o�۪mTVH�20D���.g����ZUU��nX�{Ц�(6+L&P�e��NX��Є��t�Gz�jʗ�i~��Fc�SֆPn� 7��U	suF]�bHS/�Ns����J	�t+�w��ū�J��,��GS5D^�i���D�P)�����0�7��'��~C1�  � wR�    �!	����Q��VfJ&��J�iZe���eu-�k� �YL����e;��h�w���.�^i�%qyd�U�z�ٕԄC��s�9���L��*�N�rd[�#��/,�$tᥴi��j�Tu�ݔV!b���0��"�#i|��'�:��'��:�!\�>an2T�5��N�^��f��~���}�2���ė����'���L���8k���� �j}|W�����xB����Ed@���C� �U���1c�	���f��Q�9+�n�[av�"���G&@���A#|�*1䲚;J��EU@t��E�� D�
� ��$\(`)��Lr���ш!�T':n��V��1W?�6��Mw� M�����J\  � yR�    �!;���R\ v#Hj���U�:�������X{^(����&����x$!��0�����,�M�#�(�\��4Q�&��!�U��pT|�n-�O�'s� K�x9Lx�B�D�˶RL�$Q"� 줱`z*���a�s\�oj���~A�������~ĥz�w�c]5:�_�ӿn!�D]�8� Բ~���(h@�m[}��:�~�D�%�]�)-�x	��q��)���R�.����(9nK�~!@������JWmuһ#��KRD
ofي����v�8�Ż�#
�j�>�o8�f��xJ{|J#���t2��5C\��m'Kz������������W%�ݎ�{�8��7u� 6a%��?�R�8  � �R�    �!S����R�`�&D��"��hNQh�]UsZI���<�?��$'�j�@�øs��Qެ0�rt;6�Jj#!�t¡	4�pRMYF��Y�x�ڽ�4���`�8a 8�򛓍���������f�RYl��CV����jW9:�uѝǇi\�%1ʪ	h&w�b;S'wgB#�L����;�*L��g��sO��ߒ��J��d:$��c�%�M��8z��|z��Z�VjS
��q�XR6���`��`�;��6hR��H}�Ɣ�'=Բ#��Kr�����֯���ִ58�o6$-��\�JMB���S 9z˷�rJ-z�`�D���8h�:�\��ʌ��.~�Nt����!�z1򏳍�w�c�1������i(�����Wc� ����cϫ�  � �R�    �!
�@_�V[X�,��`���6k���.a�w����� �!-M�4v*X�[����
9�Za�OD^X�A?-��"L&�iA��T0k��7�-5	��%Rk������bv"7��}���B��		�`Z�l�ʊ������M|��NS�IgKNyg�و�=*h��c
u��sv�~���m���>�l����R�Q���w����j-��m�'�M���ũԷ�䒖�F�(�h��"@a�8����Mx�9Y��%�����3�9͘���Z��"�uR�ěfH�m��Zzы�G�DU	 �/������zf4�諟}���Q����� "[�X���1�_qs�f�T�K���7��TDR��9bl6�V����e`��;W ���  � �R�    �!2 B��VY�(B
� ڝ$�����h�V�.��f�1��{������(F�C�m��M�=iC9����N3hr-�|f����"���mlH�)�7�)
��PK�x�����I��mTJ�r��������;��	P�\�QoeT���4ȴ�(�À��E��L)1������(��xȬu��Ösp-�ú���;��z�Wp��R�dkx]}Gh�� ��2F/���IG�Bt%0(�D�A�Z�p�S5Z�2��ܿ�� d�hQ�[6Lu:#:r�c�q�z���]@����U� �|��q��_l�z�V7 ����8�p�
�������g�W��9 ��:���φ�S�^b�#J�΢A�����+�  � �S    �!
  ��VYh�;��A1�B`���}|čau�g)t�h���SNI�$ y-���!2����s[5�y~�6��[~�ͯ٢b���9$�.L�6��+ %r��֏R�Z1a|��X�R_?��ʶ��ۖ��t�E�J�.�:n�x�16�n�{������,Y��%����������IGa������R;%�)�,�\:�V����V*�Z�����;Ye�rP�~�mg���s�7Y}s�HkJ���$�'��Ԥ���h��:J7��Rʪ�H��#�>�D�Y�#�u�U���\x#��4V���3��eܪھ�ze�/��v�J���'_�����(܄".�D��%����Q7:|��P��J�BMc��c���Gv~���nd�5>���B�|C�  � �S    �!
 � �RZ��2	�(��<3��NU[��O����t��vx������
������4�.��,.k�_����9�ǿ���|����$��Z�?z�Z�9)��;oN(R��V�p�*XU&��L� O`e�r�e&W�"���]�ly��{��i�ޗ��)`�Ν���3�,��7�Gu��\Y(��=5*	!�5�K�y�q�._�'���y`R1�A%עv��]�D���Z�V\hPV �?p��~Se�I[.�<�oYƱϧ�Yw�7-�|?=X]�֛�.1dD�2�2Gxm�XbxH�^������H��18@� �![�H+=���.���Ƞ0l���Ќc��ʊ�$��C}�6O]���޹�-~Ig�u���n^j�]�t=3�]2y
׀  � |S1    �!
   ��V[(�T#P=�J�/{���,�2�vՈ�i�m=T��X�̳�����uf��{w#�1{(�矎ځpj�CV�@��� a�}�K���T0�m��1�q(��,"�2��������ɨ�t�`�
�N=�¯V�IM�����J�p����R�k����Ip�S��-yv�Z�k5�q���+�悅�u1�m0+fQm_d�))؁9!FR�N�Β���Cy8]�R�e��L�#K���Yv�����
�ܑ��V,m nfp��(̀�l�
��rYWl��B�=�>���&�'�gՄE��+���\��j��Dy�rsm���,be.�.ne�q��4�"m�Z�{l�"M7ȫy���L�^ڐ���  � wSH    �!
X  � TYh�;$�+��z[M��)uX����+���Xο�������pm�]�{�G�
�#y���S�70�f� MqC?��.U�z��d�)�+x�M���t0A�xTXaH'���G a�b�7UN��_����&%R��Y�]�Su�f
IFK�Sh�.�^�!_�i#�����+���rN~#��T�J
���ah�цӵZN�b��	a	@�P#�ҩj��ڎ!L�o77��&��֊�r0�S]Y�*��H���p������M�߯0�HTBgh���y�hG��"4u�5��qc�8��p���:rU�窕F��(A=5a�T� ϒ��_�pM9cȠ1&;q`�	V�s]ƨ�L����l�rZN  � �S_    �!
9@��R[�TFBT �n��ś�V]U�|�/�s�����_��=�ؤ� +�̠�ojXa�#��]����o�xM�5t���*�
|��"�øR�*s�10�r��*[�����?��q��Zl��q�V�u~j��e�L�񆳋��9w
�{�;SL��3�չz$�ho��kbN+���-2�Z}7�O�G��zg	B�h!u��
#;Iic��/�h���%�0��`�C7�R�M')�z�܌s]풘%մn��\{H"���O!Y"<����z,�	�D=q[x
Tb������pn�g�M��I��
�i�5��V����t�������0&�n�h%��v�ޢ�1/���*Ց]�2�� ��V?��  � �Sw    �!	a���R�h�V#�T'=Fف�%\(��U���A��ǆ㈾�.�ٰ�Q��B��l�o�MOvUX��-$oiv��r?���e�g���VC0/��4B�D���C$�����H]!��+GE�X�!��v�_�oUbO�o<0]Rm����x?J�s�֙Djz{P��R����fx��w�QY���B�B5��o��gQΔ�a� ��\�:hmT�	�i��b���c�|'|K�ʼj�=���o�:��ـ�R�/6\�ӫ���;z֗"
O����p3L.F�_ ��K��l}/B ]I`����H���HMCr���7�x�����@n�����knĢ`%�R^oJ��^h��4�V��~�k;<�hV���%(��f�bSQ�a�g��BG  � �S�    �!
	0��hP\d�G ��1��k���E��8\�<�C� �f�敂��.�u�OA$.�֛�|	,�5Kmͯ i��fAY��<��)�����Y1<���wO!^��z�:�O���bX��Ggr�-�]f�=� q�I[��³� F>�R��vZ��/�F�O&�	ՔL�3Buo������͌VQɣ)E���r �:��@��U�λBd�եh�J+l�c@�@B@V��ahB�BU���\�4/*�����bJX���[Pξ�-L�O���Z�~�(@�.�J�>��kh�&2�<��hC� 0@P �8Q��nP0[o�=@��>�-� �ڊI�[��x�*�e���XI�.�A��ӊ]Uʛ�P�ڕ�Ϛ��4����	2�\����R�f�  � �S�    �!
	1��xP\�5V��]2��n��0�v*�TR����G�������z� �f�{��f}"Ȭ9P���TAԒ�b����cX#Vs��WY�j�|O���̽j��0�z�}���R�5�&��B��d��5�d&�G9�~������Q�����+z��"2���^�e��<�0uf-�*mV1�"[���Z[�v��E$�!j���U �J�gj9�%��
;S
���H�j0J��W+�C8�YS�J�	GP&������X�KA�^XJ��1�������ZAa��B�H��W�����&EƐr�rۄ�b&���G�z�g2�WT�@���G2��50��m��E��79D�&@5*�(�c%�H��SX��&I��f�kSn��y�Wo����v�6�  � �S�    �!	���|Q]$lX��{钅�Z��R���(���r����zI� ���4�l�mk;
�Dj1���UJ�N5ϥ㗹�.,R��T�,�0n�Ō|�RF�;������p���u\O#�!'`�=�����CA�A&#�����W��D 	y� ������"5�0�a�J"��#����e]_�8{N|� 8�y�� ��Y8�˲t������� N�Zk�J���]5��M��c� `2(� �" 3�S 2�0
XӦ��]I��w/�1���Uz��U�7݋���ȇ�Z�c-n��P�J!��,��$+;��S�I�k1ZZ���0����?��-cDO�uD�L	��dRc+>S8���w\hEG� �k�"D*D�.i饹��k�(C�$&T
 �TS�  � �S�    �!	p �8Q� �	�(�O}�{�u�J�-R�'�H�w �Q��t�9f1MߐbW�ܞ&L1~��AW�X�"��Y�yxP)B�u�s������HWR8[��#Q�� 
;p��JD�8}��ȗ�$��c$�քv�_N�����|��?�m�]� �N�P�6+�f:y�.�^$�UV*�D�nn׽�@�=�ME�:o� �[ii��b�Qd�A\lE(�bRa� ň�O`c�P��Ye����T�V���ïʏ4A�fLN9�<�(R*g��Pd�0�	�w���Q��7"��V3~^ˆ���}�+dK.(��Q��%|�eQ���%�K�2���B� I+�q<"k�
�1DQR�,���J��I��BL��<a5�F/������M���  � �S�    �!	���xS[��(L)$�V���8%����EӁ�4@>[�/�Oag�[�\�]��2��K��q����ޖ`e>�A ~Z&\=�xˆ�j����lɍj��	��S�������k|�{���&{��0)k��o����*��?ON2?)�/�V(�_m�:>8\uU�Z��@[(���䫘���Y�ɕL����)��۸�xi,]a{��$'Ag����	�b�m�\�p"ws�����t�*�L�B}�$���޼�BK#Ǭ5��@���M{�z/���	j�z-�H��#��ÌN�f�m��*ACz� "�,=�H@{o�7��a��]Ĩ�s��vf@l��ek��
�0���]�5F �Z.>���u���=�H��p�TԠ;�#  � �T    �!p��hT[�H!��i� c��T�^�uz$�-�G�Lnk�ׯ��Lt0.N�$!L��0 ,I02����]�BqK��ЕcrZ�3)�g���Mi�UEn	cK�M3 
ϼ�?�0c82m��b��ԋ�s���d��gs�)Z���@���*�ar�O0�9��#��R�7,3[�<��:-��8�Hh�}%�����6ua9�PF�ӧ�� ���L�dhsx�I+%MA��q�M`!��Wދfe۾3tX:`#Ȫu�i����Í~��q�����_�je^u�}$TA�1���ҡ�;���0zo��DZ����XɌDo���B�G]a=%vH���Z&�ݣ�����_����NN��E$O��DDq v�/:�bt�����*�>���  � �T    �!
t��`T[�rf��&�*��^�F����{������-���,-a�{�;����@�'Z�m6���"9�`��R���ԩ�s��l1�Z֝4��4�q7���f�wq�[��z/Z�(W���Lϛ���k0�D|�&+���������ع������Tg*�S	&T�ی�����c>EPp���B�ޫ�,�b�l8��!��H�Ek���,#p�aǊ���0@�Д�X�'��ek(�����v����8 �����-�,��sL������z�'����Ղt8�����|�����Ö�9tt����|-�P�걀 h7*�֡~/��4�0��=n5�{�/�Ux2R�d� LJm�_61����5U9\  � �T0    �!���pT��t(#ƣ��ǵ38U�q�����5`�{�P����R��<�Q0�>˛�8�kr���+�fH���1-��ƕ�m A��ǆ(p�F�kx+����G�M0�ӽ�N*�n��34S:=N@$�r O��1�z�-��p^_L+y�\�|�(��y�W��w��Qu}T`�0�b���=w��X�pH[�af�2�S�;��S�
u �!
�����d)� �j{>Ա�5}�`�j�%߷�����,"����|֊>�gY�{ +��*S�<�K���w�\���:��}��+��"M���W�>����oN��
�m�ƾ��6�vċ�7D�8cYT(	��*�vp1:�!v��i/U������S�m@	�u�����  � }TG    �!����@R[��#	ʂ�D�"B����Nv�.�sBS妛�&̺K�t�p�&�qr�m8)
Zt����8�$+��H�,JNp�������$�$D����n�L�\�\��r6�n���QA�w����rTV��}��fx`M<�MF\�<��ϫ*.�\��8y�X8ՔگAv�"`Q�3�d���w����������!�v8�=X��scd^�Jʘ�o'q��9H��Sl��$Lq:���c*�*8�i]�H��U�3�\5e�:9Z��d:�����K�⛻�r�������,�ئbBp_��E,e��}7i����<���$  k��� r�E�B��� �[�p��%Xq�t���m�S�˃Y)�H�Fu��  � �T_    �!	s�� P��PJ	�n͆ɭe4Ugm�>��,�k�תYq6��i)���<�
t�=�����064�i�r��I�LGXJ[�����9�uHlx�K��+����Y�Kq�f�|]��no`���&���S�f�q���@�ym(p���^�d!G�)?���KV]d]��+�"����C�I$��O�� p�RU�جg Z 4�)�$Q
�I2�~<�~{���+aWY�]ւ*'����	�^�����\�M����53+����.�����b�Bhr��0��� �t�0�&��'e��S�P֪���)z8qK�f^��O�ۈԸ�Sh�9L��ANѠ�+�%iтN�7^6҃kE%���z�i���  � �Tv    �!	;��@S���++,�w�|ӻ�Ug+I���V`��N ��'#���> Y���a����&f���5��&6ˣY`�.$+p�C4� �"{��uz�K�:��ZI���$H�C����P�j��D����|P�"�P#��;��b`�,j�X�4pܩv* �|����j��$ΰ�j��]%��i���#�YM2�*��Y�A�V+��>� 
�z��$A
�M���U6KK�A	���vB�:slKm�:N���G	��y'�����yjb��#����R�bZ�]k���m����+{����f`��8-.��o���`B�C 	»u�r���8��@x@���M�/�](�����>�*T���:@�2)QLw�s��j�  � �T�    �!h�� T�T(3,]VJ��Y�V��p$�ף$��D�F ݈v'��wjTί��J�d�.^LjS��R��W �^��h���1 X�7���`�^��r��rMB.G�ʈ������q�8_ )K�xgt+Q�p&6A[�t��_�$�v�� �+��&^`K<C[uvR�Dd`xNˉ��鶪_��POn�(I�|��Mu5n�h��c�$ц[/�}�,�n��V:c"�2 �@"�f�9:��[�D��tB-�~�]�.��=>����o�{�?��	�Hz�\e��tz�� ���9�[���< P�. �EB�\�CV
����y`�&����<Pqk���3��`	։>���ZӋ{����hHؾCAh�nj����. �*�-���^-�  � �T�    �!���@Sۙ���Yyj(V�Э�X��K�����p2`I�-�3�m1��,tCV�����r��_Sz�\�n��� ��@��G��/�w��ܩ@JP�of���o9ފ��#��o�]ح	�K��?Q%�mmC�k���)18QO>,0�|�g���R�$�
�K�^b�$�:��6���}�9T�Ԭ�:K=��:A-Io!2�$ފU%wF�Ȱ讃����]���(�W��ſ�Im��P���2����}qt~.�[�։��{��g���m�=5�������4��g�����+yk2H�f4`'wRs�(�[X]y�.b	h�v�W-��V�2�3��&+���Z�� ���Ën���F�����+�K��  � �T�    �!��� SZ��$!	,���i�ZSxQiKM��nhސ�3Nj���0�j���'\�9��S����q����Be܈�>D�#�����Zm�j���	@�%,�7TJe�����yS*�lE�D^:7�^�/%�6cBa�y��%��l�˩�N���֣�
$���P�̻3��#W(B(�qHÉ;BT���ȝ�JZ�F�Ѩ�
e��AX�!�Z߲��uU`�����, b�9�1ԧ���{�k)6D��Il���a1�)�>_��AA��S6S� �41(K��,�+���ḊY!�!u�:\��@5 �(N�+��X���d����oB�q�lãfܘ��1l?��L)[Z�:4ƶ`��D«p�%�M�|a �!
TX�  � �T�    �!$ � SZ�hqX���hʎn�2���Wa��b��/����]%;��I�ճ6T��l��{F)�|ƄC�����8�0��MM:$�Q	'[j�m��dN�I�8��Zy<��AMT�v���Ls���:<�Xī�W�����9�o���4mH\�rөz�䥪X�e3��X��Zr����|[efT�u���m�k0�w��œxaQj�1PL"8��jNbS�����P.��\ 	zS�g{�<a~
�{�+rV(Hf�m�u;|&�n}<@"����ʵ癈e����Oߗv��w-G���:�Yj�w�N�5�3�����lC�ʑ� =?���<�D�����X�]" �6��BM��R7��������%}N��U	}H��Ee�:UN���{D`���  � �T�    �!���7����-Jɕ�KQdi�d���Γ}�63vt{�{�t�t_�o�ϠnL��O1�n���o��R���L�#��H����E��i�R)�,T̫h���;es{�Z���@S�����嘲���c�Y-�^ˡצ�5+��6Z�t8��$?Qe~WYCs��O���\���חB�R� �4�м�j����D,��������@���8�(UZ�iuUn7�{P��ݏ�1�׷i���?���6�GOc�5-Q�����g���E:o�R[),�w��E��kT�6%���݁]��
ܯ���csM7u��za��9	���*��g~�Ӯk�m��Z���f�'����7 :Ɣ!�J:�:��KElp  � �U    �!E��E"qx+���*0� ^4�?�^8�*?dպGi��?1{c�AD��G^gt5 y�cxr�gj��x����Kaj�
�L��D�דZI���W�A>�d(y�oS���V�1AH�l��N�+N����JJE���#��t2�\���LVA=[��I�1E�j�Gt/f����m2��O=q��[r�0l�E���A���Y2�����]RVY m�r0�~��V�:C���ѽ��x�ɯ|��T~�cCѩ'4k.{���K��[�I���L��i��ZhRp	d�K�d9����h]�R�9�$�T-���Ҁ�8��?��}��k��8�2���k�B�0[W��)������]�S4�*�J픃J�$�u!L�cn��rC|niq��  � �U    �!-��c��B����#ÌI+� ����)���e�d ��F�r9�$ #jq����e�J�{���O"?�W E��bu��;q�c$�C	E ������N�� ��ts7~��k�_8�����c�xn��^��t$�dk�B:d������T�*Ay��lRK)K�e�\��I'�w��{��9o+₦��9�H9���Me0Sة���Y���j䈹ݥ)J��%ؒ�ך��,�=�9+?�b����z���]У��il.5m��=j9��@n�"-h
F�GyX�c)�DԪR��d� �+>�@ϐ�[�7q���%�(�	�YLD{��DG1���\�Gx��~���z�e�vR<,�I�FN
����YLR���YkR�ˆ�k�kEGc�  � �U0    �!=���A��B���v�
�aEP����q@9��>������;o ����6����d�z�]	�(�o�Yt*��^]��W7^=��U=����i9n3 �B&�޴A�';E����c��7�
�L������ͱ�e�����\
��3.�.y��V����$�J
T��,����Wi!yN�VfFuU�:n�̘��r�CP���G�1P��j�UUӺ�DM���Y`����W%�����h���Կ���C�f�2�3XklOJ=M}H�M�KTB�@v	P�q��K��F��N��Q�3� R�qh����x<�`�����̓l�6.��f0]���U�������Wu�
�E��Q&[|.�S�m�(��s�k9��-�G���HU�
�6�`Jk.  � �UG    �!E�	!c��µ�Ҩ{�M%��R��$A$M�iU鮇�5?�=��4�au�u\����},�v=�D�D��3�z0�B1
8����������'�V����k��7xJAhW^�V'Պ��������s�b"�����CtQ����rH�,j�r�&���k��l���)�)�%B�5$��!@��;�+�(F�q���<�ב&��F��a4Ԁ�L�M=��B��"�_Q�Yw�w#�5u�VŵK�Y�]�CW��m�b�V������H�Hx�4�@���L"4E��k�^���OO��o߉yh�m]5-3���(�YC�H�Lm�4�Jp����-(���
�q]��6��+mj|,�$������+�yl9��[�;�w��)�늭����Eɮw���~��JZ$�Yzo��7B�  � �U^    �!-���Q!�#��-ڂ�X@����}��G�34�M\�I�������*�� ����h�3$�3��~4TS.`�E=��v���4��"0s���K���E@��Ƌ ��>��Aat=R��
f����a�Qsni�k���D[2��R��}��>%�X�^R\K25V�_�҅��/��H8qЅ����F��h����5�
Ay�p���H�����u1�L��RК
Y/���nj������߮ȃR�\_S0,=��}q�/�g��9��\���LM���L���e�2�C\#c�.�[��" �G�Q(:k�Y  �0$q=N#l�mn�`�/�5��m�s��';��X�. �H�k��u�X�p~�Q��^
A�C�iV[m<��E"�ƁB2�\  � �Uu    �!=�D�Q����+�KR�Q��ŝ�HHR�*����=Ct�C��(��/H-�����qi�NhUcN�m��f:���e }=L TgJO�b�Ԟ�j�v�nI!��5���F'�k�k�����ۏ-���P�{+�V������qA\Gh3���#mԏf�eiV���F$cZ�ߝ�Y/�
���$�G���+�3;���ץEj���DAhC{��EV�bl�)4.=�����~�����������'Bko������?kbK������n��n�l��W�w4�Hi��./���)�?��p^p�ҍ���w�%����gXK`7��X]X��B��l���hS�MvN+Bk#�a�V�d�!y#+����t�,nࢲ^B���w5��  � �U�    �!5��B�B������e-kU)Ew�����gګ1�̃?���0ƙ��D���ٕ�h&|_���VX6ןLh�+� 	�
@H�	��4Ya��-'TM׶�N�P��~q���^a�#�����<��	+�N zfh�T��ќk�����K^�p�v[;��o෢9�jVW,Ô�%"�XK�&� �\h/��ٓ����%HW(�vƔv�#)-PNtSa��F@�9ᚮ,|, d��~������/���%��1<r�L��#�=�g1uU�uT5�tPrDIf�Ş�|�7�؎r�,�*��I`�
IuWʉΓu����;��~wղj'�A��,�"n�A�M�$�G!��c���<R��$f#����Eh]1D�w%إ~�4j��ª[�  � �U�    �!-��cc���پ��9�S�E(�Xh7?�D�/�x�������s�՘�����xT��P��][>L���qK�(v�Lo����3[�K�
�yq��K�ﵭ��9KR��
Nx��3c�I�<ȁ�no��$"���B(wp��4h��{�������7�ɾNV�-e8��z)TZTk�2iJM5�I;v��<���^��	O ���lu����B�R�Tey�s�^Dld����2Z�~\��θ�M^ل�;ͩ�ܜ�#��*��!_�ѠܪuH����
���)�WT$
�8�)�}�3O��8���}��������B���F��;M���֬���R��&�)�7��T�.��p�G��,dKJ�TC0T���}�e]�!B\��Q�w�7���!V��b�  � �U�    �!����E�y�c���w	�qE-b-�u��k�fE�k��r��^!�|�h�M��޾}��}�ȶ|�`@�����o��j�?=Bt r�ǎ��a�B�dx+���U_�j,@q����+�Ŏ�ݧ��x�V9��/Vy 8{����q��F�6�ǂ�� )�p��v�⺶ʒ*�($���-YW�1�¼%���TW{��b�f�^H$��QY�ipݡ1eR邩J2�9��}Qx�
w-��@��!�����L ���<̎��T��m�t��@>�i|����ZB+�@��8[�ya�2��]*�Н�j��9p��h����T[1`�]�1�6	�$�5���-�%�.�.셭LI���F��ڵ�eIr���h�ڂ��,��s@�r�$�����%�/   � �U�    �!=���D�EDn	�D,a���#���{L�j�auR'������m2L�;�mT���l�q�#�Nf�ym�V���F͓�@P_�mID���ĺ��TI\�P|��"�ӷ�s�(���&�6�#$��?���Sև
��W�����,}�r.����4��hQ�e.��GOAZ-z��$A�zɎ��Hʔ`"����Ee!�@'9}Mz�C�Zݪ�R�PR���W�]/�>!���)��6�I$�~w\`��Ƚ��]&
Sd��+&$����jJ(~}gRQR"r	�4���ID���� ��NC��Y�M�=6|]����\�"@R�]�Dt��rG#lq��s'���W	�x�ťyn�X�<]"H��<]fw��Z�$fv�V���D}��p  � �U�    �!U���D#�+$%J�.�0��盽
���(U���_R?�� �{���)J�ۍ�ņ��e����IDVGJ��@xkf�����^��'+{�:�|��Q6�v�?NO��s��:!G����d��0*��י�\i� ��*&b|�a/G��d�En@H�Rm=�R�������EJN����u�L����l]zءOj��Q�k�Ҵ�0��D�����⼵�٘2�����ԧ1�ni�����h���;�eϡIDR\�8�������`Pm�F��pdM,�L%Z�a��n�WVۭ���~�@�r�'�ɀ��$�=��S���� �8�!|j����8�gM[�7Yq�U��4��Q�|�(�����F:)�C7�.0Fk�t)�"Ϡ�p  � �V    �!U���C�	U梌TAR�*�WBDKV�����
���d�l�f	�~��7l�J3\_����I��i\Ӊ%J��tiC�4���3�����Q\��}��ezNK���"�0H�`,tQ�яhJ`�ͪ,�TSK{}�ޭv�7�-���&�u͹������>ϰW��?J��
I�JR��$V��	V9��+�fPʟE��/l7G�q���d�Zܣ(Y�R�QA!4:W����֔���=�juԃ���3A�I�U�d(>�[�m������F�c�os�\v��%ˉ�2�1�`�(�s�U}�P���A�]�q|Ń��Q�Z�4�jS���v`(Q�Q�ϰ�}�(��#�]�9U�b���5�T��ʎݓ�a$�J�«��cB�g��7���P�7�-�D  � �V    �!5���C�B�+��-��UA��icnC�k=��\D�_�74UG�a��fڒL��l�VH��C��=�`n�Sr~x `�@͹T����K���tmȒ#M�?<�+�G��*tN����Q��!"��D�w����JRY�V0�$�~��"��Z���\|���b�+�E��̧Q2�ҥ) M����F�V�:B͵^�iGzY="�F9%2��De�`H��U((	pc�ºIm���{iN��=$S7���l�8BT�*�c���g��_�I"<�I�橗[��b�OR����^g�J���������"Ajn�rr�`�e�uXu!��Ҫ��&3�~^�Q o�[����W�LމzcX��D���$��^�%�B�!(Y��GBL��!Q)x�C2p�tR��I�>�R�Kb�ՍTRׄqX�  � �V/    �!}�
�D��F]���E���d���<��ɡ������{ر��S(Nn�g}l����Y���f	����@L��ҙ���3��uy���$1�,��U�d�h�֗7}� �h�u�.*���4���$�-��pί@�)~����5�)�f�VqZ�Tv����F�n즫!O�x�nM�q����I�KŲ���4Q#�7tg"��Tb���qUotU����
-�~A�g.)��Z�n-L�4˞7����,<���r?��buyQ+����e��4N��}�F����P�D�m�4,#b�H�&sH����#?��z���C�������4;�|ߔ��h��P��a҃H�]���p35�W����^%U��T';g�*�r�WmV�@�Y�CZЖz�Sr� p  � �VF    �!M��ƀ���Z�|�7�PܛJ$�	�ːs���������+���ؤ���x<%.�f�m�i����җ���:%���h�����j�K�ձ!D��47!;6
�������e��b`�uH�K{y���'�bh��L~~Z�,���=��:��������\?m���ТEa[�6p�C��?��X���Ϙ�પ�Ee!����E(m.��E
SA>�E�[�[.v;��!�>l|Wp<���E���A7FI���޿��GߵpN�FG�ڡ-TZ��
I�l�Ij�<�!I8\i�A
R�i���ea)�/)�N7F�.�/Axh2G��+63y�^��R�5>�Yf�\�:N����������l%��޲�����Rr�XZ�E(Í�����  � �V^    �!=���!����i�_~��V�L�6Lh��9[=^;����k�^�%�6�-�<�1�܏�?�|K_��Ʋy}���Dv��P�T>xH5B��v�,(���i	"���@ F>�> ��RZu�4���[;f#�`k�cZ/�corn�B������eu��JF٫:F���8c
G�j�&���Z=Ǟ)��X��ꗪ���)mTVR�*7esW.��UQ@R�v=�Z����>��2�3�g���,�k��p`�oN�4.��Q��Θ2m�XYhr��4�(�e�j�$�j�s�&�4Q)���J��PQ��UgSK�:w� E�Mڑ��)ۭ��u޻�����C�X�]x�OB~�݂W_IN���&1�RX�iJP���&��d��i��{��!"�rߤS�T�������  � �Vu    �!5���B��2�{�f��SD�at���΀�F�瘲[Ԗ�nSX̗�{BjO���Y\��Е�uU�)�T�bQ�5ӊU_a�4xNy� aqSd�D#����p�ɗG��u�4F] z�'�S����p��4���ð��g��a����_o����Q�U�����&�=�am3�d��[%�i���Z�F�B,.���!Wd���d4��D��QT-N �8�y�B�!���e�)^�]���On�:��Ayu+ͧ]I�A?�M,s��D�HX��(QDe���!��7�{M�|���E�C���*@C��j��Pb��C�'f��Bm�1��MQa�?m
~~�{#"�P�a�ߠ#,��fY0*��gIi�����w����,U%c��
C�1Z�A��2�r7F)��  � �V�    �!e���"�E#��/�\�ʶ.�UT�,��6���|^�O��6j���T��<_5��ԃ�c�
���R���#ƨ�J
�3��G�Zjo��eJW�M>hN� ���`.�%s�A���<�Rk�2!�M4bIK��;�c����v0�B�"Z[~��/C����jBY�a߶Rzˢ�߼IA.]K�U�E�a )�mhV5{B6G=+Uj�2P�AhuM-�PE`�P��vNmj;�4.{��,��[��{ws�u-����7J�H�?~H��q�2�ϿH�4E�(���씮�Qew��K�HNRQ$����K"�
�9�)rZ�Q�Df�-�ʮW����nsI�Q�cW���������igCE��^iK4�㘈�,J6-D\,$��SV4�,�v8�l	�#��#�  � �V�    �!u���E
�j�5S&�u�
r]�O��?��-a�xd�m������al\�r笘{����|�n놗|�Y7g�IFS�;;�����,'b�|ð�I���__�5�Y mC�_������Fq㫘N�R����s�F�%��L�|�E-b~bl�
�KX��UC���#0���H���N� �)lX2D�|���J+����!V&����o\&R�Tt�	��$g�;*#�t>K�JtI_Q������vF4��8�z�s^D�u@�����-�s%Ճ�Dc-�JҌ�>���b�v��%�5I��Ab�bj��P� ,�`����d���������O�͐�Zz��]Zy�f�6��L��nMjCZ;t� �!{�F�%I���ԚV����]�b9�	�9�  � �V�    �!���D��.��s�&]!4O������(Ž�V�|t>G��F��Q���?^����I������'J�}kui����nv�0CM6�	$*ML�12:�,	WŅ -j 3�y>��y�XK=ۗ'��7/!���*���BA�k���O��!ÙZ���c�(I���$�~aMؾT�F����F��y�`��	�*�]�� �dt�J�iU�e�ڈP%��-�/��{s�?����]������zVڀ*�6ı���X���D���m�f/g�B	��xE!-`i��x�$X^�J<�Fw�m��X�T�,�>����N���rf2J˜mTSȬ�����N�~*�M������_��;�ba^変����V�2hN3!qx� %C�	��  � �V�    �!5��A�b�e�����0�BP�X�BSD���^xt���\Y�Tc���o�)�<��II�=�^֚����.d�4���z�J@�����=!)��g�%Ha��)�R�:��
k�"$�ׅ�����BM�>�%��6DU��bt�/��ݲ�>���.шO*e!z��$ӒS��+��H[T�q<0��Z`��H��w�M��A�����_)�҈D\ذWp��"~��T=(�th�oIRُq��s_�9��?��P���ׅ�??��A�+���;�霤�3VYM�����e�����}rWr�#��fJ`@��[O����|����L�m�Wn�������b8���m�
iU,A�/�����u���MV����#%mf*,�S:E�*uW�  � �V�    �!5���d ���������^]!�*�H�~|������-�'|g(�����i\��&�.D޷�,��K��̈́��<��N����6a��3�Ө�#���u��	�wJ��4�Z	 =
��3B	�al���,(՘>O3
#گY|?P��^%�Z���ٖ��GYЪ�[I��K��UiH�fOa)��g�f'���pT¢u�+%
,L�)�/�JPUI@q}6���)��]�N7Z�j3�:yjP����^4;iv#ь���g�{��6�ZL��B��#	�bnq���W4Z��a�EuO!� �L�� ���tTb05���ZMU��y�	3Fk����z�Ub讌En�nxX��#d�J�wGJ7��N��Yg�9P��BƦ�ʋ�Pp  � �W     �!M���C
�WQX]*�P�����#�_�Gs�G���w+��Z֤>�۾n�����14r��7]���vP�� ��Jk�Zϻp�|�e��Q�=��j��r�@���W"� �Dē&�� ��y0H�Qho0�n��z�,b+�d�~�	{5�B�a4P�������ґ���%Oi�@ZrfF��d�Ԥ����E��m?�KH��QXT,+.Y����hJe/
��X&��/�G�5Ҫ�>H膾0>c�b�~�$���Z'�o�����g�CF��V�F �L�GS�]��A�C� )���T�@2�x����8�:gw���(5���Z4
r+���cj���x:��m�ۆ�q����A�
'��(��e��.#|{�|�L^lY�"�p  � �W    �!]���E
�3���(� �49����|s#�]|��z�F��o�7���s�������t��E=�_5�R��)�	/+BkN��F����)��d�U���В"��G� |K�0����
�m����O��r�,����+)l��؅�-��*:��rkR��+�Z��a�Ք�G��7k�`�cI�ض���S*�>t�ej楶��"�2��<oګ��w�J/ @���|hY<�ω�M�*$�Zt��O���R)��F�ipC
�W�;� ����D���a=WYL��ٕwr�B����	|�	��S.�zS�U�Y��޾����1 /�ӹ���;����P���ڧ�Ug�!���bТ���ݵD�a��IZ�7pIZ��B��0]�&�>/��3����3�ލ  � �W/    �!5��E@�7�i��S"���<��F:���57����~-5�'��q�)y�`Zn+�H�J��P�F2�DQ�	���.ǌW.�p�hA~r$u��I�XF�y��ϔ� �)a,&�S4���k��� ��#�����C�ِO�t��d�P�����+G���G	V)���*������"+����ĝ���S[(���m�,͔�fL^P��D{���p�~��]��aP��r[H;,�\��/+���)��>��U؂�*�*��ҢR*G �i��J^��!��9�v����Ȋ��S��@	��'�R,R9�`����{t��ܠg��4$	/�	�v��^F����%��f-8�Y�#d�i��0A2�Jt�\�b�e�6�x�MZ(�m=?�v�[��M���  � �WF    �!M���DH{י[*�(�ǚH�qs�D�������S��7����#�n����&�f1_�Hx�kNr�	�ihL�Z��{�j<�5�0�]U��T-�d?�&��46�ɩ�g����o�>���)${.֮�[X��.�Yvv �	�����d�WQ房H;e��)66���<��+5A����ԕmQ"�Br�(Vڨ��X��q��(,S1
BX�c�3dŖ��le<M�[�Y�Y�\��)TJM��~q�?azTm���?aJ9�V�����pG�f��͠�/�(��֔4�V[��&B#�8b�h2��3�8� FH��:��
��*���kĮ�.��t�	����W}������M:J+_x0��to�?�6e�K���!�jV����r�Iƶ�!@��(��  � �W]    �!5��D1��](]J�H.OI>����fN��@���������]5p���k���~�|�y7�\Qa�R�U	���H!\b2Q� 7��R}Ac�6���)�!�����<��Nyt�m�o��K����M�=ژ�f
����-���ͻԉt��V��%TEij��B�FW�V$S��#�6
h@�h����F��]l�� (6
�{!�Z�UUP`9��o>�g�}�=dT���"Nh����w�q��w�Y���~�}��D��],
�/m	F���g�]�^�g�mc#�1 ��zw0� ��:=>���+k��*�T�����z���Lbfs��&���W��{��%S&����vJڶv��-!���1K+5i��)�T�`%�N,v���(Pp  � �Wt    �!M���A0����U�C��T��,<�{g�|;�i]��j�4#��q����z�#�t�9ߘ�G1���6I_kr⎺�����A�������%f����uYb<� f��Q���P�������╸�B�		%�YC1��r0vn}���kv�)�u��e�ByP�a�d�����R](v�S�nPaޯ�l�<a�R�l�[k1,A�p9���.�T���ht*�������ziq��j���eQ��חK�-������Z#oY}V��d��܅�fAu)(������d�r��bv[a���w��'r����Ol�gAC�-�3�+y{�� O^�"�y+b�r,)R�J�a�է̯��Fb5����]��S}��>�,�h-*�k��VRx��y����1�t, �  � �W�    �!e���B�"����T]�� E���d!ݴz���$��6��o��}Q"�*b�=v��*��e� T8�)��-A0�
W�Jδz��Ȧؖ�	���8b��@V�7�F�oq/-��o*�>��v��3�߸�	X`j��W)���ֶ��uò�b޹{|(5$�
� �	�������uء�̉74%��NӛV�)mtFZ�\*�ڪ�mu�����n��#鬍���l|n���lӷ��K��z>$�A~����0�'�����o�(L�_\�����
A.����7�a���J  ��v��X.�����J�N�h1랊��3|"��7��L1׏f��fNs����@���]�`�[ݬ)9�����k�M6��Z�"��ß�p�|�z�Ұ  � �W�    �!-��B0����!ȼ�k��HA��g,�φ�{)Ҫ���6��K�|K(Z��\)Ҷ�Kii�hpJf��eM�֮,B[Z1�d�޶��L�p�()O	����L��N
�ww4�v��\��T��J���O1+Ք����JU�3�����W���)Eg���:p��{-����쁲.�Ԟ�+Sme��FG���V��]-h�� p!<b������,����\�]� Z�<
�nD5:E���C�ȣD���kp�g����C�����ƪ�o�h@cW(��Ru��U�7ٍW��c6�Iyv/�r=�Mw$yd���Oζ���M҇j$���{�&Mn��Q���;�"Ϩ��~���k�7�=���d�
��  � �W�    �!5���C�.�cJTݦ1AbR�n�&%�n}}�/�Kh�s`�-�ɻ�L�'�{�%.��q��-�P��Q�L`X n9�{����EU���5���bȼ�ɓ�.n��@3�?�Ɇi�a����0\+:�'K�g�l�+�m�Y��v����en<h�W�E�0l�)]j\���h��銕*�1�	��`�!^����IH�Z6��QY(qi�8��nC4JV)T�R��ut��NH�2��\W����Ô�;���`c]����i)�%��.s��+�a��6�۬�w�b�n���ۉ�J��4=���iB#���m��gT�I�UwyԢ[�$iJA�,�5Jگ�֔�n�)�~̷{�UPt�{�ls�bx�|�P�'ҞXd�詈N� �  � �W�    �!��@ R�`l�!�ZȬP��UhʪX8�<��q�@�s���p�_��n���Q�������o��oMlG��D[H���N�*�%���{>��7M�����-�&}3)�U ;3�ܼ�
oP���&��=���5�����Y�R��lm��|NW�Xg��̚7V�]��8�"O��x�����i5M�fݲ�M��#j��R-��6��T�B��A��l��[�P�Pi�����]�?�/�dck�K���_=��m��ڲ�Uh��q��[#�.�Xm�&�-PK���d�-ٟIx( ��}�Bʵ���,�� )�F�z����0���������S¢�Д�T��F��� d�Rô������X-]wYR��4.t�N  � �W�    �!L��� ��(��	
,T;�K�R��m9�TU���L6u���Z�zܰ�զN&=gѴ�3Zf�$ ~D���X��=��c�<>
a��@6��d�	БKض؛VxV�0,(�A8)I��&�V׏��o�nᛢHŠ� AW�wk�W����.	)��њ��P3��56��\k��D��@���*3��G�G$�X�<�(��½�-G"�B���{^���5J�vU�@LrMʔ���d!��κ���h�C[$�h�@qK }h��Xc��*z� �`��Wb����z�$T:�FQ�9���W�ӖkPD8Y��ZL�%#��@$;�����a�r�Uʾߤ�Э>J�����W�p�1(��>��9�\��BY�31���(�,c�Ý�ğ)yӅa���dx  � �X     �!@��� R[خ��������{�U�&T J�/����M��z �B�+�#�1d��y��9�Е�(�H�`D�8Ť5w47��X.�x1�]���)��_��E��w)Q�v�^�}�┭DA�!`"�
��@��1׻w��lE��G�0��s�Gd<Ks�K;��2��:t�}��LU�tW�$�LV#\R��na�c6���j�&x���0+�7 +m�D8�$A��i�U�V�(���zN",V�aWZ����@���R]�$���b�~�@<��l��֣ϵS�낪�_�D��&�b�?j1��]}T���mn��J�ɚ !$�	ɩ��=4@�o�]��R�\�r}8MQ�:����2�&������'U�ThQ(�X�uudXп  � �X    �!
F��� UZ�����,V�H��.����9��QR�]�S���7�B�7��K��7�H-���OI��{9��+'�8~��
#�I!9�L��� �A��)Hy���[_-�EO��&vv[�6PD&|�X��J&L���)I�=���Vɽ�kjf{>��y��*ʤ�BQ��%dCW�mha+�j��|}5�QL�Wj�Q�tU9I�[Q��F�(�8:�������@X�{ڢ��B0�@�%[�J���UhX�,V|n�`_S��;�9b�I��:��w[��5V����LwF�p2E芁���#3�q�af#u�dP�Yj�@���V���P�@���6?���Iж+�7�\��w�cv��<��T+]�Ԣڑ�*�5,����S����%F���9A�  � �X.    �!m�Y�S[X�V"V��Nk��	��v��-T� ?����_?/؞�3L��z��5i`��:@���h��R,�y+���m� ޚ�+~�$ R;��0E�v-)魲�jCh0
�$�M��Y��_�29�7��ND�5dMV�GwVr9���`��o^�"�u纜���O���߬Q���j_�W��y�G�-.�aĤQ(�0%jr��Md�2,"XZ��F���p.�j�-f��.��d� 9�:5
��y�|b�A^%���	�%�N>�Up9�h�-�b����nNB7w)�ʃ9����!�庒���}T럽P2֟?d8��"0��3Wb}�؊e:�@�6-0���Ԣ�nGd��T]
<����z%1ȥ�YVpc�~  � �XE    �!
�x��T��ж"V���K߷x��e5�һҪU�5pN�y�&���˯�I���k��8�Z0����^��9�T�dX�E%8�f�gN�_�!8e��T�II��)�o�J�-R�b	u���H�@`�E/����$�zaP�����o�$�{���.���Ƭ��wP�Vtޔ#�o�h���~�)8葀[�M�����3��ڥ����R� NP&�ʠ.�(��T6BF��F�J]��/		 Z�-�Ǎ��4r:����3���Հ>�	�-n�:��t)�R��N1�)3SC���`K!��I/ c��t��C�%�4�1�
�|�pZ*0/�W�Y�1� �#�5ɪ��[D� �0�&߾��b�8
5��M1e��Q(��+aڗ��#Q�.���  � �X\    �!
�`��S\ lHB��� ����V�tC@n����:f�w{C��F_�٘��@�^�^,Yl�;ڄ�i	�p"�b[g��k����xcoDҞa�z�T�x�z�
�t ��}h���Y�u<�z�3Q'��6�!̊{�`>�2#O�A�)M$]���8�u?6]}s�y��I��X�B%�fV+R�ӐG���2��Ke��)�ҕ�\�C5��;�Z����P�#JϚ�*��4�`�j��Y���,�<3��+�����J�����SD�
�h;�y}���XQ����dm��7J�����]�i����DO}��$6�RL�w��3��
�W�E�S���o�E����[(�p!�%��V�=��5������d�+-8ٽ�f�E���  � �Xt    �!��x�SZ)l�(�T�h��_���5`>�؟���h4a� 6s�	���S��/��⠟���_k5nʄV�Y�02+:MA�l�3}v����H��^� W����w`/s�:��G1v4 ;i�G\�)���i�=�R���k[c�7�	�90�]�����,3�
UZ�;㸙I��/}�q�*S�$�Wn������D�	�eP�e���A�HsOkvER���.4��-U�U8�J����ԫ	�U�19|t
�a���ެ�vg�a�1+��E�S����xH�zr��ֳ�x׈s�SO���7��J���섽��
"�v��K7ݐ��*�J�C�����N�ά| 1ҽ`.�,��n)4��L�Pb�hId ������-���  � �X�    �!� �LS[�E@�L��j��Ӌ���J<��č���~-�r�l+|�ŧ��q㴎��0��%s���PbY<���������O���n�7p*%�)�������9ʡW4��%�/�ݺ��sU:G��o�8�~2��#9u{/�rLڣW�ʯ�8���$�Ⲯ�Ͽl<Xf;�V;�k�j����R�K�R�Uߝ+W�� 3�)�Mo���(p^f��E.
m(��|���M�[����Q��-�2����ax^عﾋTt9�:Q���I�9�)��c;��S
��w5N��� 8�ڜwV.	+	�OYRϿE�Ob1��N]�*��K㸄�l�7x[#�#�}D���`�8ف; ^fw{�1mM��y���FDu���L�@U
«	f�  � �X�    �!���Rڨ�g`s�R�S�WU��mL�ն���M�m�2 �۬m�*`4Ԩ݉E��#ǭ�b���Z,0yb��(7ygmaH��p�jY�[��1�����9�>�Z3�.����p��G����?���o���YE�<�^��/���B��~�/w �ւ�2�)0�z�R+!T˖��i9��Jv�\JGTT�XU�����S��E��vJ����d\t��kD��C{q�������S��v��N�}�F��	q�-Qr��Tf0�j� ^�(s�#[���#,#ܲ_J�9����X�x�.@m�m\�F��M���8�ߔ�G��S����ҍS#�ϲ�ۈ�ڍ��Զa��&��U�	&�3R���>��uڒ���s�;B�l%�����  � �X�    �!� � Q���FTUYtC-��˅U�l���q�6q�d�ㆺ�F���Uf��s����6 ;�TNVJ|����-s��$�x�3�	!s�����M�3p#b]|�ʭ�kޯ��O�82O�轻!�0�C$#�A& �~esg�>B�*��«^��iD{�z��
�7�U��W_u0�U�sFhM{zhDVZ�F�¶ծ�ײ���(T��� ,D(�!�������P]���A��+��V�+�3�1��U�t�/�q���Y.zqYG�\jh����Ƹ6�D9}���>�ځ�$�e���ǱW���8�����-X��p��t�Gf/��H��U�baucϤ�̸{�
�hV�����\�g�4i�G���x�X�FlD��1�Y۠-��R�2϶��/�  � �X�    �!� <R[�7Vo�қߓt�;�z��U�3.�ͮ�ۙ�eH�-M\yу/�A��Н��Ӝ���ˍa����&0thW��̵���wDݠWK�ڶ�`D�4��И�e/���9��� �e�33���k��gK^߆�G�
M�)�u4���l+~SR�H1���7&9I��w�Uz�狩�`�a$m�N@�=}�m�.�#��3Jі�.�]"��K��`���!�J��*�"F7 �ƅ-�N���D��!2O2OS��?��Ys�*�u�lki��zN��ki��mM  ��tA=OQ�@܊���\q��̸`[&d�c"Q�&�͟"mU���G:���ݮ��}K����b�4�]�컙��;؂� 0$@+M�T�牪ۖ�W�⩕�����k  � �X�    �!6� ~S[d�',V5���ZM�ȥe/K:�ۙ���X-Z��m�F3#~EMΧ�m�����7q�l���Z�=W6;W}���)�����}XGb�-K�q�oK�S&4qb��.�@2K�N6f��j���} �\�f�Yp����P�?"W��}��ה���?ϝ�Jm5�P�)io�앂����R�H���Ue�ˆ\fQ�Q%ZV�c �C�  U CB&��W����
�̚>2x8��ꝟ�6�\����j:M�5�wa�۞�t�a��Q ��r���.܆ �z$�0��U���S �:'�ɀ��{�\�к�b�Q>�*)bl1�@;�H��;ݚ���j@�-i9��z���8(s�W3��*�K&�-�Z~��JmTJ䨄�0���I�  � �X�    �!v�� |S�)(��u�$ m(� ��.��Y��B�0�,ҰbMh>�/:$���/%Mnۻ�e�d� �O���S@�hi"���x �FXH��}���R��C.Flc�gOu�
�r�Uƪ�򦣃Z\%�fD������U%hr�t����%!W	��z;���jV�U5�jY5O�|⁎7��ud�*�r9d���K�H�4iZ��BF	��^���Qk�A�6L*]�W�l�n��� ��u�����WyH�269ߛ:�V�V�;K�>��q�gq�D{�F�5HS��)d�hN�>�F#j�T�o)U�.M):����Y�vY�S�Jp��7�a �;�t���I�����:8Y���$`&z���/��3�r�v*U��l��
-_hQXܢw��u H�u�^�Z��  � �Y    �!�G�U� �("	��5��gW%T����R����	�dw����(c׵x��ً��6�,�81���+��o���Ft�l�E$GJ4�e�<C�����-�:Qe��r'}GW�P$~�!�FYN���?�bW��>b-�g���ǫ�Wh[BPge�MyB�_3�f�})���U�*�9���g7���<1�a5�Ҋj�����=�]�vk!c&�;��TZ2Bz�۪w� 4�шIme��J$�"���7UZ��T�҂O1Ŝ>�ָb��#�y���i>�5���Yp�e{��7k�G�O$��0*���I��%ɴ��u����7_�� �V�ǈԛ}����q��� W�ڵw$�(��0�C��SYcT	�*H�t}Y/��v�{�Ђb�p  � �Y-    �!���C|R[))(����cW�U �	;��jҔ:V�x�,�v\�m�@U�"�P���1��Iv���6����&��0 �͓��UrO ${��Y漺�`��SN|����5�_A��Mi[���LejAX�T��ܚ�Y6ð=�� ,_& 5��&��#�`M?��4���gD
-������^��[����n�'XA�W
<���]�$�brIK��17������`�x�A��
�"�QP�W=Q� �ϥ��r�SD J�����7!�Q�Kh��st�V � ��|ٔ#T��e���M��\YS\M�S%��2X@�ԻƸ��QtRg! ��n����ez1�sجo.W����u� �T� ���������iY��Թ���>XSo�^mz�� �0�����ei�  � �YE    �!���W�S� �����̌��#�����UT <�Eh��'�	5*Bkw���yF�R��@��r
��WL�QHE��i�)9�����n�O@0�.��`9�ݪ�-A�.��@Y::��7@xfh'U4H�C�/4Q�b���ZM�̵��䚒3?sl�NȖ;��ir��A�"��+;�����huw���h��is7��Y�g��4��Zexm��JJ�W�Hn�=RP��N��JK\!�#a X&P8���+`A� �v��A{[G(��iw�c���M&�)�	�Q%�r-&�£X�ٽ	
�^�H��~�U��p�kQ�>��v�z�\�uw�Sb���盩�DivjB����v@[x'��(�� �<T��Ɓ������_{��b� 	ܮ��,�  � �Y\    �!��u��S[��+
+jĺ�j0���ʨ�:L�KwQ�m�c<G �Wb�IGEҎ�sY�����k��!(%M^T8�5@��q�np ��OI�C�7��Dt�S�%վ��Q��׃j����S$�2\8!9Ϩ�*H- �������XB$\�I(Z�I���rn�C�Ҫv��vm�Y��O�j�.v�c�BWֽ��v<��ܵem�Gy�R�C\��C�/�#(���{u�>��
�Uک		�!`��("{)Ê���*��� )9��Ѭ5��ק������k���I�!9���ה��/Y'��r&���r0��^���'�8�^��r��5w���m�K�ES��&�ã1�O�6��.h��"�W���VXw�ȑP
�{F��-��  �  � �Ys    �!���O�S��v(B�+L[��2��<\�R�UD��<�@�i����H�2l����m|�Ϝ8�U�ȨS�2/���3l(^�������}�G��Q�P��v�-�Z:��(�H�\��YOX�},��x�$�(�`2o�"˼4��
-�ƞ͐#	�=0�P3��������V�XY����V!DlFW�N��� IY0z÷��Ґ��j^ئN�����<�:�$�r��G*79^��@Uq`� ��Q��2�� ���%F�%�"���~�ީ�;M�Ф����Q�,��̵�wD���PǄ��a�~.�gOI���nQBa��"�N�1�m�ؽ��_8��>7t8� 1���k����9٦; �ܶ��4�5�뺒cr�5��tB,)%�r�	��p  � �Y�    �!��Sڨ��(����4�ʭ(�6r9�vA2�<�`�1�e
��=檫��P��lъ����Y(�0��l�٩I/[��[�ֳSi<<��{zz�v�*�Ccv�
��(�!%���IB�E@���c2�P,;f�?�4L�qs�42�Y=Oо��Z�zgzjV&�)Z�|���V���h�+����^����;:f*������eѦ���s���ڨ�F���b���t��驝�T�*�qK;����a�U��:�@��GW��לE��8��E/g������V�^�@`�n�c�ꖻ�l@��7�//L����F|7��I�ߣ�X�Ā�Ex�*�`Ti�%3 (K]BȀ�k�����L�<9{\y�2M�vd�����  � �Y�    �! �Oڠ�&JR,�u�UZ)j˪��� P��xǈ�೑걤����7�6��Qأ��u8V���<��3Q'��I/&��;L1g���C$�w+���{�u�6^��U�sƳ��2����W$(�iq2��27���h#��h����/�DUi�}�u����fx��=�1\���j^s������m)��l���ϒ^�@Y�)p�nMAo���@@'�n���J�UD��4�ڎ@m�VG��pO3H�]�7P@l�{pB�f!b��q�6�p֤���t�ƣ����W��[
�S[0Mlfq�7P�)�--�P�0e�'Tp�/�q��v:]���P'��	��0������:�:}S�8F�-S�WSm1dd9�& �p  � �Y�    �!  |Sک,8
(�Vp�|�mk�{0a��?�7��#�u�|�1�?)��j��=�w\k�CZ6����Ar��8���{��#DX����`���텀R��B��`XꙄ�4<�L7�1e�p�J�Նg�w������L]����J�K�%�ӟ�#��6DS�X�IL��ӛ����&����[p�{u�%�<|�+Ru+���Fq@?	������QXt2	B�A ��8�F�gzV@�G�'sP���~�Ϥ��D�9,���++��3_�ARn��������S��o����pa��#�3�dC}��	G}G�9H-{]֨X_����
:��.����zY�Ů?�1	��7&"�2U��o,-��ȵ���+��{���u����Ew��k�)�-�wR\  � �Y�    �!   �Q�i�V*�N81x�a��w3)TL@ٖ�z(]��~��z���ٲ�?��~C�/����Bj�2��N ٗ�|��ؚ2Q,g�R�8e�<�~BFǅ0�u�6* �S`��Up� ��?���C���S*)WV7�.��S
���&$���["�RT��q9�o���׬ӽx�ؽɾG�S�b�3�j�FӕUNԏ�hl̹^О����	�H(Hn��Mj���d
j�q"�H�(�B'~HV�SEM�!�'�q����ѕԸ�.���i4��Lh�=f5� KMQN�_C�
$EF�_����-g���l�;�\q��]i��s6$�%'��Xk���Y�+�s���܃y�#P�؉Tkˇ5�m"�
Dirc�  � �Y�    �!+  �Q��T�C �)�L�!��M�A/���% �`��S{\�|�gJ�����Z�3Jڹ3D������jʨ "T�F�N�AhC�xJǥO� ��3�W�ʡ�Eǟ����S� /���.�W�k�t����\@pA#WY
'�P$�"���-4�JBs���9���F���L��S<�o��ƥ#J$��Iw_��J��ĭ;�7�V�ֲ��u)-TX#D�A����/]�lV[ �����>�l�]R�RzӲ�q��c��~�<��9�L|�J'f�_kiSĬ"�
�˅V-\Iئ���jƩ��_�Y b&:�w��<[���]4�3�ެTR����]�fn����E�\�sSM��.�|�B���%��B�i̻oN�  � 'Y�    �!M�L�f�J! m�l�3w�R�f�@R�Z��,T6��&%V�3��
�2��2"B�\��\V.���a��"�2TJ�Ң� b��2Zϵ_Hk0s�����o��n�Xp3!�����U�y��7i&pF+Mԃ��α�&C�m���Ȝ`r�S��긞�{��͎���]B�z+%�x�.�1$�m�#��hj� �mlI��i�2��!oN.�#~��E�;�0ޘfcb6�B3WU�:�/<���=���+F�M�XI�w`Ց�6-C������
�Q�"G�,�U9��҈S�l)J"^�$d��*Qu�06k�H�����AW  ڳ��km�!Q`ߛ�/%}y�v��k<\�G:tϔIpl�d�L�~{��AX��6Ցm3��Ğj_�����.	�Ϝ
~������g���֬S]����Ok.4r��FZ�pW�Xq��8����*����Rw�'W|ټ瘔Y,@v_��;�]c{��v:M�4_������t��S��z�\<��a�������(���`j�٦����(��x���p  2 �Z    �!{}��ae"k�jE7�{�Xک*���p��������p�~v����-�:�c��ŭԇ<�[O8��Z^���DhkVK���W�d�ya�(�E�]�J�^���9٭;���M{Z�	��͍i��j򧤈��y�DRo9&�T�@�	��1鸬�XiFYd�K��؀�kJ�ѩu��/��racCeh2�eb� ���H�X��}��[�LD���/tHu���6_�3�Σ��ļ=ch�X�ͦ��0/ѻne��~� K Ѿ�wp�z]>�*�����u�*�u�T�O)4ԈL�S��u�11���:.���SMrLOjks�D���kr�u��H�Ȗ���	�+���?e T��PեMWR59F��
�@Bvp6�X"BR�2UYSe�)��v+[�aȥ�  � �Z-    �!%��� ��oޥ�� D�]�\s[�����<���eMy�n�����G�y�~��l��b�Y%���o��0���Ɔ��80�=@c�];�7�-U�͆7�I��*�̟:��V��Ց٧�ޙ1Љ<��C6�ٵ�Y����uM���`��R�J�|�җ�Gi��$�Ӱ��`�p����' {���Vu*B0�R�X��]��"�چ��U�9���U(!-�K������(a2��j1m{\��0ᘝ�����������d��:�E�n$�v���ir�^��5���K<��ζi��εߞ־���6@	���C}t
�O��W_�y�$�
�'���T�(@���Bw��z�Í�%in1QEɒH-k�z����'��X�g��Q��  � �ZD    �!E���C������g-��2�P�F��R�N%�����떝E1���M���^�s.�Ĥw�7y�8nI9�=�?���띨u�Z�t�x��X�]�5�b���1Pؽ�C������8>�ϡ%*q����7����*��"rf_jMk#���T����R�;��Ty�fE�{�J<p��������rSr�1so
kl���|��Lk� �Y8dB2��8vFXS�t�W.��Yӭ����h��_	�r���Aօ�դ�\���gLml�?A�Cq�Im��2�@�K�B&pN�h|�3���ţ�ǖ���0vbX]�MF��\��QGYpݻw���
'�Qw(%�d�e`�! q�4iͧ,ہ��f��.,#�  � �Z[    �!=��C
�@��5J���b����X�N���,��1 (�`%�{�YM���|�I�g,�Ng�K5'������f2���/%Oڵ�a-�S�q��)x7D���\�{�H��\�+I�h��0pXE�G��N����J�>l=M4-��0�V �2�l����R��Ce������Uk0�-J�ڑl�$u�gF��z[*5JJ7I(U
��\�Zy\��D�Ί��PMK-��?S�ٿx�d�n����!�W+�EP+��3d�AL�9)ɽ�j[/jv8�
ͫ�I�%�+o&tt��A�٣�|��JO�|�Y[������B4�4����` �eo`���q(�[m�W�%Nt��D�A�j
��gbU�ё(ai�*,\  � �Zr    �!
�   SY��#!, �V]����"����"���yp��YH"�/J
����o�^V�ٙ�Q!L�n+����r9������;�e�l-1�K�/E7���ʓ��PC*(S�b8Ó.�0F��jZ�H�9���{�(�y�5?�"��+a�QJ���x>���؂K�\����P����Tib,}��6d�>2�E'�H�U��D
�CK�����+UuM�].-aNw+<��U��wL�)�����-�rʽ<_�ҦH��n�E��L����&�r��$H�fH�7�Y�mk�В���-�1���[Y,��r>K�U������p6���7*�3�v�p<�z�[D }u(�<غ-�!N�%�2�:#u��Z0�H�c.� ^e��  � �Z�    �!� � S��haPpC��T�g�)D�����;[H��+�-.
��b�Ρ_��kڼ'H%�08�#��S�uP�a&8�����=��	�����%�1�UM>��V0���V��+s���:%�}ڒklA��T�voǮ����Ǆ�َ�m\n�.+�W�(�D�9܊򚴊��,�oa!�Z��^V�-8ykpS�(�(��u���R�]n�"�5@n�������
���Jyaa�������_���A�';�m,������� ��K8<�$vD�A
%��5V�z/^M��,���W�_ґ@�<��\�p6SVĖg�+���$[��\�h�a�:�"�e�L���U�7��z*���)Y;='�%	R�H�baB�[�  � �Z�    �!��  ~R� �8� �)el�H��$��	�U�ͩ��e�^\Q��z��v˯��ح�~���J%�F"�l��zw�#ZY�s���U&T:Q���$B�hI��d^A���1�3T��A��h��ү���E�Ve�8$�!]�ǔ`�C&7�K�����e�^�G[�erW�5��m�����OvF��U�5w�G�Q#V�Y���t/��[���ە��*-tHK%�u5Ul�V&�8�j����F'Y��/�� ؊嚈1L��.���>R���������Ȍ���D㈮��i϶T����\��:�bA1�J�����S1N�U]��y�0�����P@�5;�Tj/K�q�½;OXMFj�+�Xj�u�p)��?�-�Ѧ���r���ƨY�  � �Z�    �!�� �VZ�v+!
)�{�l�ƯX���� DtT?�:u0�#S�uöO'�Uopv�p�f��6rx�#������,RoϞ�L�]�"����A�f̼�gj�Wò��!���Q[�����q�fY��|�M.� �/@ja>�FQ��P,�%y"��Fk���Ѥ<����u����m
����de�м�V����D�4w�N�"+��AEl����10G9fT�iͰX)b�gW�M��7�>1��n��y��b�D* ZB��[;H�s���qk{�p	S�s��{-�M�r���@29囟m}�M�E}�kӈ��a-�h����CK	f�ŀ�;����r)]���z��λqk�5C4c.�Y�1Q+�\E��p  � �Z�    �!	�  �Vڨ��"R3�Kl�)�����)Gln���Y�AX�+��/��3M]Q�I��h�9G�Y��@I��%��I��O<fY��RZ�j"Q0��r��l�s�x���uS�k���S�\�<�3,sNHƌUa{#\gl�KX��#�q:�;�_j3��M&��?��B[�X��*���9rSt^Q��<cx �;�fRL�۫��,���n(X���d0F*Hx��JaE�w�(^�6&p���#7^���bLM����i�ſ���8����Z�tڋ��-8EH�?̞Ԟ��v8qi}��G�b�R5��/KM�L>��W���%��x!�1���Aʏ,�t�z�B��үc-����k�4����cr�v�-�mvC`��8���������T�  � �Z�    �!�� �TZ�0V*R$L�Z=�\���*��?yծ��4MH�L1eC�m�+�u>X&����@�E������&R�\D���m٥)_�FKs��s��g�Q��B[��$�W�A҈TB͓@���^.R/5唛J�W�Ur5��n����s*��0a��j���e>��7�������O��q%oV#��t�݄��S�E��,��D�-5�ĲJmC
�RZ�a0j)�f����P9��k'��������"�^�˿�;H��{�{��Y<�ۯ��>M�n܀����x��Eë�p�+�D�DP$��rӌ��C/nL��l�<�%��ꐋ��NaT����L�_nؐ�T
��jf{t����$�1�ҐH-b��  � �Z�    �!��_�T[��(#F*�4J���Ғ���(��	#����et4���]9����aj�h)a�+�{M���i�$��#V\��&�[�H�a�Y��:�*�.� xLc)�L$$�t�(���-���	z�lK)�a���|D�:.\0�0�.�oW��H�ہ�8�G ��j�u�z�8T��h�w��G�Z�	ߟ��I'^m�G�{/����[������򂶍���J�ů����A��&"��Vо�.�L�r-�Z�v`��c��e��l��f�y���ʁ&��;��~��ە�.R��{^�Q���nRp�>�30�(9[���k�$����R�-�N������]���Y�m�uHUK-:�0)�i�L$�U-��
j�	p�q���*5��`	�p  � �[    �!	�A��S[�l$T2������Rn�b� ?�����Ҁ2��mpUi����*�u�j;K-U��Mh�E��-�yB"t30�h���*�bap{��[0��LL�ka�b!d7��)0��zd@a
�2&A�
�6H�fl��
�oJF�$M���}�^��G�&N�����9�b:�b�_�R櫑6bgd(�N�I��/%�v��;N*��*�'��MX ����*[$d�B���Ԗ*M��ŀ�P"h��8�kh`���� ����p���˩X�I�P�:N޷�����U���8�D���0 ��o
����t;�@b�%�W,�IS�w �v�`�g�1T�bW@[�a ����X����d��� ���G�������Ӕ&4]�p  � �[,    �!���G�R[)g	*R�n�1Ev����Q\�2k���������{���h�����`�9ͻÚ`����ǥ&S���@�Ξ�Qן	�hk�+��p��b#���d��7��d��vr0b,���O-�Ƴ�Q,۾��	_lQ���t}����71��H�<�o�UW9�X�g#���%����&?*� �\Ρ�,9����z�uC�,暞�
���â��м�hS C�zm#��sC-�|�a�1�:����xNf���C�!�'o�2f���f\�A"E��b����@��'҆���M�<�my�mx���՟_̲!'��s�h�z}\-%c
M7x�f���ȗ�l1Ν�]t�a�,XE=}-��jD���  � �[C    �!����VZ�,83�<|MT�(&Uq|�)E("����,ӧ9'=n��6b�E9yi��ɳw�ƢU�W����I@�ɑ$�N��f���]@���8}�Ba�M��0���r�(�*A0T������n�o4g ��@I��;]wFl����X5� �拓�
漙�30���ˍ���O�+	B�E֤��G��^v��=6��]Ѣ��gS ~bN�  ��C�B4�"�w��bܵ���D� �80Ra^:�3h�2�h���rӓ���+<Q������({��Z���Ű�u�{��ɂ'�2n}����-�o1=֋2ov�@�� �S�D�@4 ����J���ˤ��5_JBS��㋙ӧ��``�h9;����n 8  � �[[    �!����Tڨ��*%�U �����n���6
�o�i)�؉U[�;�|�O�^`�y���Ho��)���>59u�P�� "�vL�sfb:~�u<�6ք�C��Di�A�r�eK8_���B��^��%7�Ȏ��!�=��	��8&U֍ʆ[+x#���w��Ϯ����U���=9N���Ф�Q�%I��n=[����M�R�z��
�+rUth'*��9,�,�E��E��T�"P����UT�c�d�
���s�=����;�:�m��= �&�z7%`)0�E��Ӣ�t� �r���
3:��,��2p}8���d6��$$&6�%�?�5hӾ3(h&Ps$I�y�C���_.�}�اW�p��w�Xqd��گL���x�-Q�  � �[r    �!���SY)�(!�@�Ŋ��޳ED2۩J  [0j��S.	x����,�I��� ��i�xM�[j��!Q��(�m��S �E�(�o�����("7*W眣�`� h�،�tMwZ�+*N�=)���1O�^;�1��z'�㒖�p�F���g
� ?'h0%�VC��tKS4�֫� Q�ǁM(hZ�!{_l��^޹�eW�{���@Y)Jg�&��u(� (-ThQ� P܆��YTZ��Y@[���w���o��Ѳzu���`�@��X۝�e����&Z7�_��r��..gg+QO %<]qb p�P�3�̱���A�!�^!0���LR��D�����T4������_� ����:<�)�.L�J�  � �[�    �!	�  G�Q��D(���`mJ��� 2V㡏����ږF̚g�'����F��ֹvB�����=�<������3�꠩�C�tN��N�AA��w�l>�B�(����U]����i�9��TW����p?~��t�4���2�j��l�b��&��f��{�>.�J��M�14n��b殫�lģ<��KQ���̆*��eN��i�֢�9D��N�Q:;U�
a @(0`8o�c�'M�t��|��;e��l�nL>/
~<bL��ix풱�!)7�=S�����;�A��5S.*����f��4`}NY7�M����]p�h�����L�0�����I.���`c�w� �t�ඛy�a�6�.Z��Q�v�[����K[À  � r[�    �!	 �VZ����\y���F���P�)��c�{3$���3L7�e`kq�Va᡾��m�9M�W���2\)s�*��L*�u��./�Ǚ����M8��@��Z���8�\�����0�L4�}��4и�w�y}����IC�*�ï��4�R�w��ʷ��B�|�^���Cߙ�9���V*¼���(	�Da�����H���D#(D�ԛ���U�� ��è`�T��-c��5�mRa�#�{'b�;|�a�����.X�lV�/>p�BPb��ZM�Z�-�*X+7WYed��ѳ�ئ���I�k���
�*z@���G��[Yp�.=���WWU�]#����8�NK���0ihCS~��  } �[�    �! � �T[����Z�:^2��@�]�C���X�����/;d0�ԭ�i��	��9n8<B��Җ��3�LB��N����� #wt�x��%>���B�� h�Y�K����ro��z�v+��5&`%�qR�!{�@�
���p9dbA�k�hKv�k�ם�V���N�K�RX4h�y2 M[�Lk�#i���e�� ��m���v�u��֪<� �"�ӻ39��o�dT�8&Xx��)����~Ÿ��\���Ƙ�>�z�-/׳|�֦ ��M��N^��e��g�R����5�p�K����5=��c�`� ]��a+Z�!��)5Ej\��9�D�hW �����mJt:p���U��Uv��U��Y1J� 6TM�^b�3�����  � �[�    �!	�  S٩v6EC
��o��4�2d�9�;�2�[���Q�k����|�ޱi�*�5��-�d۔���܆橶�r�~�����*��2X�Пy��M@^,����.���Ґ&e ��?e�]�u|Me�\��BLi-�t�3T��90��w�`�s�ۧL��$�ف�l(4��q�v*K���[�ʗ�6�Y�#<dd'��ŉR^hqJ���\!`
;�d!�`D�9�iymV�2�@i��,�[����ݨ����^Õ-�.ρ_��ߣw�x�����p0�c��	�TIw�"���y�&� S����m�9�d����U����=�c#8U	g�MK�*�l`޽W�m�C ,�*����Zy�q_�^ʦ/�z*��X���d�����=%�H\  � �[�    �!�  �T[`̔ ���VwH�2�Q)it-|w�7��j���imx՘�=��l�q@�!Z`���aiÔ���W����@:u��W%�_B�cx�D���,�Q5�Y�	�ۢh���}�Dv���CtN�i�MЮR�prŵl�� j�mrx����t�O��&�:ς+�y����Z�\t�J������"+RD^��0��!:�k�ӫF�tP Q�,p�:�$��S��|.SKlTP8�a�]�Zt�#
Zگk����Scp�?�����'%�5��
�$�n��K0�R���J����Bȶ!2��Yt��e�]B"_���JW�CS��>Y�jI��������I[b���qӗ�%�.��?�r�GZֺ��c����8�QbU�tD�g����.3�n �  � �[�    �!�P�T[�TfD+R�q�k����T-�LM��Jm�$6���ǜ1�����2����ހrA�t�Fˈ� $`� �0�QBt�i#!���A�e�N:9��k�vţ��l�@�DL��h�2\���bk΋'y����ҨB���o��^ >�F��+�g�[�!�e�2j���a�E���F ��"*Ke�.O�$o8N��߼�)$�*�x�}Q�PJ72ĭan��4B�3 � At�gp�j�ԭ��1����2=4��#7����#�6_*��^�~�ג�n��@���᫰��-�8���  ���VWu��6���i�˸�X
Z�o�YWmrА��^��:3����% F!3=�B �.�>���.�Ą����Ӫ��>N����q�ԡR�;'�
u��ɸ  � �\    �!�p\|V[\p�"X������0��mJV��]8�
� N����
W�c����K7���d�S�ĸ�����ߋ�2���Q #������Lgi�@΃L�`��۔tv�9c%�P�:y�#���n(>ڔ�q���>tLv�3��,m�a�0���E�ߤ�ڜ����^���Y���
/5mV�Y��EgHb�H�KǪ��(kK,%cd>��B���Y�KU�C1�L@! F�(#3cT9�-V� �!ӕj�<߶8J���g;��A�ͅ����ݩ�3L��S���w�7����w��Q�kA���fqJ�;��7o�ր@~;+;��U�S*��@$�ij�%��0I[ !�����k��<k�4\���O#�'M���l�IԾ�)r�n  � �\,    �!	��~R�\h�,��l����*�2�$�������9�	jcl�N��Њ���)�mҺ顑��U�O��	��e!��� �ASD��,v|� ����:R��M�3�~��ߧ&{��Gq��A�x�[�Qj��>jZ��RV�xv��f-RY-�e���C�0���Q�R����D )`əxZ(D�+Ҏ���a[��S�ʷ�jX�(��
;�QP\� �"Ҕ�Uw�S�e�p���+<��DY9�_e��P{v�� rN���֭v%�S�Ҳ�63���+��R�K���c\e#D�<k"���f)u5'�2��ˈ �ze�9ux��c\{ɏ{��W$���ۡLBff�a�%p�6�Ǔh�F�K ��:3�Jh�7Z��  � �\C    �!	����TZ(�W�R
��S/�����(�Apq�>>��U���w�<�y��E`��L_�B�a���A�h���0Q��h����@q��CK�l������� C� ^�������n腚M�P���9�����V�c�
��J�z�:5��fKYy�U�_*�=]#��Ĝ}^�H�t�*<�I�n�{�s�G ���]}�Š�:+pN��i[�M�ARe��Z;WMZBz�@ SӬ0T,�!�J���'�E�H��_Oٓ���Z�l�^�j�H7r��:�	&��C
	������o�֝PO�u�$�x5�p�,X�ƃ� �)9~b>�1���O��jmL�Fν9N]Ow�l��l7ajT����GP�,k��j��  � �\Z    �!�x�UYh�:+�����I1e+����P��Z�6��1;I�� -��y�hX�	%A�����k�t%����i�!��0�(7P�� `��ĈD�5E3���MN���Yw�3�+��a&�Tp�v�;�#u���}u��� �Mnk��$��\�Dz��%��ۏl���*�^��J��!�݉2
V�2�!.�����jE&K�E��9©���
���� �8�L�5넵`;�jِp���!�/�~��i1	�.�oҒV(}���4�m�+�-W���d�]���~��i��`s)t�wY^�d��@�������
��]8F��g��3*8}n,��ש�,ѧ�a@
���AH w��r)]A�=y�Q~  � �\q    �!	�x��U�\P'J,uYԊ��_g��=�Ϊ�������;�2��:�*�IJ�i�e�3�oI���{u���1g:�d ���"ᆜ�(A�sD���� ZR^ WK�X��Y�r���?&f���[����
���g�i��B�1*rΔRG�hW���;���5��
��db~s�_Ǻ����^`387պ�OF<��e>��bs������<0`�8�{�L�9	ΫP���%���SitR��b�q	�"������d���?xx��l�n�M�[@���0�5ϕ�f��敵��5��êT����e�9N(��A��!�EhQã����xK#� ~�du��&�����!���H��`ǲ�T����,j�2� �8&_�%i�� �  � �\�    �!�x��SZ�0:
�@���CҼ8�)wUE1e����(,nHFӟ�	_ޙd,9�V��m`70��|篷:�����	@��bዉ(����=L�G"��z!Ȱ�]~����hu�Y�:�M�V�'O�1�
کo,j :�֛�p%A�@���Ԉ�E��S����E���Q*߀ 	�0����S��lq �RA ���A~O�����&�9�!Ht�B�/�ϬU��F6Y�Z'��E$�ަ�tW?H��h�>���a(Ā�6��ڝ�A+a���Z��y�W0�c��Y�aN,��¹���_�r���k�_�*���?�pa���� k
��\���q>�5�=f.�{�#F�AU�#u\]�f�NR����ENdWŀM��yg*"���  � }\�    �!����TY�FA�C?)���&%*�! ��~�	��X.�ٓ;V61���W���ϭe\�m�V��m!�����P-Q�gD?s�K��L'�ǜ��T���X���ͳ������`7O��}����;@��@��$��,+-
F_^3e�~%I@��r�(���|�n&sY|"v�H.�(7J�:�f�窴�z"�^��y�ei��`MQ������5p�Klƕ
��iu֌ (�6,�eD,�nּQ� �a��X%�;�KyMSQQ#��Q|dG"�C��b��l^�Hا�Q�O."m��)gtĞo�-S_�`'j12�Y2�
ي��u=Q ��; ��$ ��5�:'H �F U�-p���G  � �\�    �!�����T� �:�Q�Dƹ�,���9:UZ��T*� ~]s?�=��V��pRtb���j��@���d��=����o�͹���{�1�9�*.g�SF��{��Q(a)D<h���t  ��: �|d�T��Vx�x��3�mB�`��c�@��S���K���xl�!-j c��*�͵8�=��]~�n;7K�r���H��Bc�,L���X{�6�	P'x-�'w!��S�8G�I�����a�VS ��!� 
Hu$oS�6S2%�V( �@&񵏢��S�p�����S﷼����h�S�������p�3Vׄ���T�8���*r���������B����r��GȞ'q�l��@<x3��0b�¸��@p  � r\�    �!����S��v+*�Yx��_ޣ��VUM��BԬ����ލ�Y�!-���R����F�uoǱ��S%֙"�%0!��R����q�#�z3��f��s�qA\��*s:Z�2U�1�=�Z��(c�REAu! �*l�4x(R��C��8��!���׵�{�S눺J86���F�Ѓ:ͽ/��c&��9S�Y�XN6��Fn5s�a8���Y	�%��B�V�)�L%��Ij���`��X7M�� o.�\��.6�F���P�����=�;�ꥶtS=���ߠ`-�xyq��р���SφrK����u�?�����	*��hD�Q�2)�ʒ� *kN�ԍ,���fJ�O����q7 ]M�+�)���  } �\�    �!��O��Z��*�������0e)�h�O���]�LخM�3�xĭ X�b7��]��6�}R�Z$�^2HD�����y�v�t�����쏍s�L̫TJ�7�oJ4��J;)м؝a&���(��S9�#���tJ�F��k�,ڃ:��U5G����Jf���t���;���"&���	#�%lq�����}b�-�Vm}�R�jJ��􂕛�ڐFV�Q(�J�p��oL�{|�o������Ij���H(��AA+�=G͍^)@!���8�zCX\)}!
:k�Tg��|��Z�]�T�r�U��G!tP(�G'F+��nF���B��[+��z6E���1�j�Un*����
SC���^��U�JU��3d \����,�>��Y�����  � �\�    �!�F���ڡ�sa\AV�Q�vݷ(�aX�_S�n���)��)��Q~�zXg`��}�P����Ӭ�q��6�:͖��C���zMrn��[n�c:�������0p�������zJ &fF�A�^I_�H��]�h4�~;'�����tc�o�$;r��R�����L(������gil�-��#�
�� �!�$�����0�����g�+a)�J+�LԯJ[fB��5��Yx#���Y�^�D�ga,\,V[(�8��$:�Kҹ�5��|���5[���
�T��'��p�ô}2�u���c�@�(oO�*��j6hy4� *f'�`�̦�c���ƌ�u��m����fz��Ȇ�=m<�)E7���%�"p�
�߶6á��� �����;�  � �]    �!��W��Z��D��?O�M�S)|dL��J����ԫ"Xa#*D..����{�gqw���om�eT�;��S��w~i�HN��Q�������r�}�(�ϸ�hK�H��!!��_K_�Q��ZW��
	�\V�H�x�U�|��-i��	��~p��9�Y����V����vm#�&�>�~ARZ2OQ^S��^�k�1_-,N��w�x1���z��$�)+�j������ި���qVk�Q���8
�� �hpVạ\
�8<��1N��չ��R3�|֊���/�.��F/Zs�O~�W���a%n��C���i߀�c��_O��p�"I�52 ��I)o�I��$!n�^�-9�Q 2�DB�]��Jf)�r��b/��`[ [n19�9�*�(�  � �]+    �!�����h�v�	����U� ��Lc�_�9�X�BB�/��6�8�2oO�VC�A3C���9�m��(�� �@���P�>���!8A1��>RžD�΂,��0
fpT@0��Y������̵&�5��a��jd&�bu���%1����tݒ{��X�/�>�X�[��r��)�O��nҎ�zr�Uj/c�	S2�~�yg\QT���B;�%��¢0�&&��w5T2ʅmRP�Ӓ�1�@���KnB��_��)��6����cfq�^"��(�!jW���5��$�z��`֪N�DN~K��@�b��+(ڛ�0Ģ]�siΥ�>X�P(�)G;�n��/b�(�Bh3� 	�gw>�;���wۍE"���:�� ìBոd&�  � �]B    �!� ҿ�Y)�HC�]�R��������m�B�L��o�T�S�n"q	z�����;:�f�T+#���IS�`&"Y�1�,�6�hΗ_�������(7�;+*�Z#��$Q��a�I��ǔ������Yƛ\�J�U�̀O5��횕��n��j���߽����gʹ�:�y����kF�^8a"]b��)J!t�%��/J�\��3{����)�Tj�z�S�!�T$�<ŷzݻ6P *��yZ�3�����9%u9H+7��N$^t�e2�%w��"�_�e�][�E���U�r�ًJ
�G��]��w���F=Bd�$!�鉶#$�jo'C��K�V�����52 ���b�t�RX�ݧ�MO�ծ!>���J� ��4��&�  � �]Y    �!+��TZ��р�h�g4*�b2�!tD�.b�h���K�|��ĝ�{��rr�hN�y[ྙ?=�$s�����i��>X���2Z���+� ���Y�!�y/�<
�����P�r3�\R��ŕ	ɴ�
մ�������& $��#�{���)�0��$�ȩFΊĔc-4%}�P�e$!��Z�ؔ�)N,c�oȄ��<��kT!�"B����s���Ҕ�!�wt't`��#���p>;�%��q�2X�8�0����A��Z����
D�2���ݼ�J���4�4�J"�$�F`9���S�X�Ą=�܈�ȶ��LS#>B�՜\�#GW���~\������HŜ�?��N���k(1�7J��_���q.��tW�t�ױ�Y��1���  � :]q    �!M8�����<��4J*ⴠl҆�6�9j*AEe�����K��
����d���]�҇������G��I��찗�`]���Z�T=�I߷�!��=�'�pW|~���3�t,�6{NK�H�[���5�y��ӋxH#$���� ��y�\�I�q��լ��nR���tc*��7�n�5�ld�8��� �ȿf	?h_Z���uy���ޞv.-+�v�0@`��-�O�p��� TPC;}�ۆ�y��gp�Gh�Uh,�(z�M��є�sv��$��j�U�m���
��Z��(��ޮ��G&L���u*�yL�����l��<���3.i�ɷO5#3#��̀��w�e�Yz�[-�F%���l�uzN�9��i��ʫ��o�����[Kv�O$T���6+N��,A�ح��N>y���r��N��0�{Ez��Kn���)�u���좃�g�P%�L}B��k��x����ۗh��������Շ=>��>_i���;�I�{֗u�I�REC��F�,ˮW[n]�}�����A��#`p  E �]�    �!{-���D
@L���+N���W0R���\��ܙ������{�{���{' 3�B�r�����l��n�`�`�$C�C��I��TԩڕZ�Q2a�7*�ɍ�4�Fl���ZR ��Rj'Zeu��j1���qB8��>͏(��_��<��U0�{�qܯ�V*�zЧ�s���5r��!�K5Y��y�F�P�й-�"�����L ���G�\��l���bV�|o��
��jm���)h�+����]�Ug�|�O���@�c����+��6����[%�u�ፖ�=>����8�.����,���$�� �t�2���@o�B�'5`3���Rٜ5�Hhc
�s��R;D�kX����`tm�XTyF��F�d��͂�2���#Lz�{���5��:��^v�ҒI,���dG���  � �]�    �!]���B�EK�8y��X�f�B����E�p��+�m�`��r|,�HhvK�O{����Aa���$����H�Xl���c4��՛� �@�� +ڰXN�;]f�qh3�)W��1���m������q#�D����O^,���(�_��H�=#=���T����Ⱥ�{�T��UZR��;�'Rn�٣��"|�D�L�%��D �rh_s�����m�/�O�ɣ�I�����Rs0'�Ե�k]� J���K=^R1��O����f�߾
l�A�+Tcm΀��_*1&��$��)�j�����]��Tt��rj]L�h�Z������
���,�D�@nj��D>҇ZP!�2=,%�J����ҡ��L��9��%��=��)&�G5�	��E�����P�D�8  � �]�    �!=�
�A��Ej<��_>S���Z�t�A^b����ҟi�b^v»äR�C7ꭁ���BQ����rԛ��3X$��a=���:q��yl���ܢ_��M��PNs{%�S��+91 ��Lv����3�|]u�U��?K�yb�םDPU�z�6#;n�wVXj���%�u�%K]��ak���-D���k�  �#D��*r��*���؈ap]���$���L�-^Ó����i�+]:v��~M�Sni�,q�O��zG�?r�C`:�0���T��L� �c�d�VԚ��]�"��(P~�iu���&��BL���"Kܞ��fN��T`�ԞӤ��k�=�p��SʁvUX'��!�и�9^����^5Fߍi��.Rj��ry���$/S����  � �]�    �! ����F:B�:�<[8�lD����y�d��}��������vr @n�3�FvǫՋϖL�x	��0�y\�h�3��i̩y�q�XycHT^_���j�ʪUN�J��Kv��練>��4������zC���鉈tLa�Qo#y+8YA�y�H�4V5��E���q�h�S6�\�g���M��:�����c<�mf����,d	(���qs9S1�J� ��|
.��fA��q�<.�	��<���r?i�(iǞ�q��Q�&�׵{����]Q]I���Д�'z���F_��I�(�'f�� �Z,�����CA|�hG���ΓФK�$��uqHK3�d����%ӎȾ�;��؊��I6DJPN�N���V+��L͆u+����/�  � �]�    �!1 7V[�0$(�VԹ׽̮��+R��˕p#w[�Ǻwn�uO�S'�ч�6���{�'4F�C���@���R�����y� ��\8M��*{���*lq���J���֬Ŵg
@�<.bi��|1`T��R�X��w;�X���Ɇ-	!UƜ���q�-�q�E����$�f-(_h�T�b~9�L�R��k+���k.fd#���Sj�0�LT0�!b�<����v�� ��� >�>Ox�B��	մk�,���%�O�FoZ��qk�;��Ԁ��J�)��S8/�^�n.%������]�8�q�<xЀt(��u��2�z�]�t��}�?� ���s0ka�X'p3X���h���C��.���� �XnM�T���j��$���i�-\  � �]�    �!� S\ �*X��G{w�W��f����hIv���;�;��)��Y�*yx��oR���2��4S~�d��SA�3(�413 
\bڕx�e�ơ�x� ������4I�.��P&�[a��Ԟz,�q� gVr���R]�\	"��Ǒ���D@�$�u���L�@4�>K��9`Y��ZL=ԪS�A�h�c=��e<�F;����,+�(U�������i@:KQZ��Hh�Y�M��5��Qe����׈J���a�L�P7U6CaIF�)���ƶ�ٖ��q6�� h�T}�P�n&� �����9G�RX������D��H������(�æ�� [{8�Ɓ4��d�k88��02b9�2L��f�X�����5җ�sc��P���5A�[Z�Be�(�E��n  � �^    �! ����0�9V랎8rW<J�f��uKe�Ƙ�k�8�
�Դɮ%A�	N�����!&�p�pƃjloA褩��w	�F�T{5��gyP(�j�<Z8Ndq�3Y��=8�^���������؛ҜO#���+�	c��'�0]�8�Q�Rh� ���-��j�DZV)W�p�j��%�������AK��)0ܧ�� �43We�^�
)��x2
�A	@�˪�����+5T�W���,���eo?Sޤ�x�u8 ��}:��<8u?����}������߂�=NLp� i<e�8��
�S<HpW}��{f7�ξ�J��z<��[b�\sߝ0���Kd�nU��͉�n�mPK �0"�Vh��l\Q̳�f7fM�-���iLJ��v[!1�  � �^*    �!0���!40��U&n�Y�7��WC���\?����K�M��M���ӗ�;��g��F��T�ɃgW��'ς��`t��e=��C0�x� ,�*4ưq��I5gy$��1 ��^�E���X�ٞGV��d
���S*�5��ol!Z�='+����1�u3��7<ES�E�쎐�5ƐJ�l���U�xpZ,���iMG�V^�Ieu3�5�
�B����D�M慭������kRSݹ�����&��x���W�e�����%�1��o.�%̣`Ǆ! �(�ttj�����2����u�e��U�B����nmδ��QI=߸X'w2�Oa��*3q��?5��Ȃ�v8�%�׻�����w��k�6����O_j� w���e�x  � �^B    �! ���Zh���R7�/�9m���d��E��~d����CN(?���[����3;S�;~u�4� »���6pzuP�l�m�T�l�������(
�e�����H�� ���J]�8qr�K�(�:�
b�8$�=h@e�݀�8o����୦�֍��Mв���	��)TtT�Z�Q���f��TV���)z��3
��Gd!L���n���9����1*�U������3��V$��ŕe6�Ȑh] Ml���]?�7���|�^h��E������KA�*��Mn�q���m���q�.�k��p�@�N�M*�J]�n��<����9�����ȶ|=��,!c����ǞUHjV6g�ΊR)PL3�<��+�M4(8  � �^Y    �!	  � ���alD��WjڴZs��� =mܭ�|�5gO����-���ٯ
�r`>A���Zڰ��Wp���b��>��L���
��H{F@�c�P�Q�X��!���� �Z�d6�z4x�0�o���:��׽�-��^ �!��~�y�����<	�b-�T���R�!�S�aQ��Y���d>q�R�kc���ؘ��D��7��E%��Bc����uJ����&/B��Z�X�Q�&��J��Q��OlKml�{M<��a����>�b�:�L0�1�=��T���g	�|Z�l�h����L�)�z@�},f���0�����3J�e�����mL5o-�����s��IB�����0|��ُI$c�J>sC�i��-��y�ź  � �^p    �!� ���Z�0F!Z:h73�5�Nn��@��e�����9����!�����tv��>��f��AJ�(sK�_�`9J 0I�	:�pC�m+�7wc�yE>b2�y��h��<qN��M�*����-$�B�OI$�P��b�]����d�Z��q>���}{��d�F���_���Э+bNJI{�,ԕ�pOTRL��gj�iB5�PC��K�E;'zZ|%������zxbJΘ��A��n��UP���ޢ��;�����U�}��:�=��W�-�[UOe�Z��*�ٜ��QF�����S����'o~=JS0;��D8����&NWƕ�ͦ���m��+C%���X�^Ѹ_�Rĩ	&yK�E�U	�
��+�|Mp��w/C݊3j�  � �^�    �!����Z)v*X�z�����U)@�C�/�ٞS j���0�{G/��P�)��Uz��3VچҬ9�[�����F`�"j��;�Pl	*����y����NY.�h�H��T�z��gT��^��i�(T�+M�v��)'x���"��쑰��9�p�X��j�c�n����X��
aB���c]�h6G5���^�IKK!m�|hB%�8���e�t��KT!d����<�5{�� ���{���0���&H�)�5>�m��V�Ƚ���>�"֟ߎ���r�	Qr��"o�"����ס_��＆I����;��������w���y41�3ٺ����p
���::�O@��!HR���w"�8  � �^�    �!��	��[(��V˔IŹ��.#/u2Q@���v���Dį��)@?�� <��m��Î\rEB��	�.Y�i͉kK�K.:H{�1	w<o�����IT-���Y/\<�ۊ�E��þH^"��mrX�����7�ST�?�2�GT�[dp^��4��j�t'I�뀲&�j)*�NW�x�4��g8�Uؔ����#� �U�J=O�n��pݰ�W���0�PWdfu��@��� �$D	n�G�)ة�{�Ml���F絍�҆T��Ҝ7$��o=���nc���WӤ�+�U'@����\b��;��Ë������m�0_u�B
-@��s�4�V�5e ��� ���"�՟?�8����ٰ�����2�aYK�v��5�R|U�m\A<  � �^�    �!��	��Y�Pv"V��W�W��k(a@��2���T����&$��$�5����9K��ϵ��#�8���O#�.Jp$F�l�i �������i�6A=↻8֧
Ȱ�lp�h��6��lS#ѕ�=�����Z@�xH_��[[���joZ�י柝�,�^��+�|����wR��3�Wq��t���!zL�j�k�x��l����R�k���M�^�ҜiW!��<���D��A �Z��r��ש�����i�(?`g��$U��_���{7՘���'U��x"�wTҭ�SnR�Ѿ-�K�|����"-s���T�<�ɏJ�tϹ,.U�@ q@��,q:}to�с}3F��T�?�_r��.�<����ht�n��wt���1Z�uk���Գ��J�  � �^�    �!��	��[!�$-Kc	�T����)"�)驺��-^Yi�Y�����4rد5�2�y[�ϊ~~ՙ�N9``ԥ���r�y���&M��ܢ���j#�2(	Xҕ,앏����\"G�j��NJݹ�^����j�%��ɿd�²R3x�aC�;�m����F�aTj�#"MѺH��w�"���W�]ԧ���O�$ҽa	�����h��UX�%��P� ��B�J#�%�Vk)klu23�y����g��m/�P��,����n��.�'ln��թZ�4����c�^����~���C��&P(px��8k�y��Y	"*�T�m�v�S��>J�ݥ�O� ���x5%��2w?l��f*n�X�d)��UU�?Iq�k	�  � �^�    �!Z����)6*Vs�"N)Xh<W�J�b��iy�ا)�v���uD���:���OR�9#�*D����1P��xDl�n�Ǚvd�ut�TIV���bOjmq��
6��F Fc9vb�h-�~�0*k]+�`���{��kJ�f�>v��l�yz9_�k��d��MS��#R����|ۺS��I��UZWdB�����rĎ���Ò;�U�4��MTN��]V%s�soj_��p��� �D(�̅Σ䩜v��=s*�V��؜�{�g?1��hiV���{���;���vջ��fȫh���#k=	T��޾BOx��:xϜ����V9�Apƣ;O9޶@���bIk����=��Ν����y�����Q�Ua]=�O����X��i�I��
Z�  � �^�    �!��Y/���!�ZU�T ��Tla/fFtw=1e`S�n%D_�Ւ�J>��� q�Qh�i�u�xm��;+kco�>�,�����Б8T�NX�}��azQ\M�A�u��a]7AM?ce�"&u�0�'Jp���_�ƪG{)(�eH�3��s����\:l�\j�Յ��B+X�?<.�^���-�n�$� �JN�u�'ԅ�;���8&/em�Zw�d*T�=(UJ� ������iLd(���#
���7b7������'��r��J���v�.��Qo��e�R��&�	 ق��D�U�$|����eZX�]D��z��5�a��`V* ���:lt�i�Ugr�-,��^�����'�S���-��䜈M�w�.Lu1� ���  � �_    �!�����!�D ����5Yqi��2�(B�"1�����x���Y+d$�����֦ɔ���}
	�i`&]7ߏaB�*�`#��Tv�	�AJ�:D ĺ�0�s�G Iuu����3�a:)_o��e(��
C\ŶFS�Ya�K9�!ו�@�hӽ*�@0y�UJa<��J����B;Rqu-j�d��Ǝ�$n%KΩ�Q��$%�F�V6�bn�j:T1���
���:��y*��'@'��B�Y����EVԐҘ�>s�|*#�ɲ�x�5ٜ��T���-v�-�F]1�Ȥ�$�"� bX��*J��Ɇ$ 	�N#"��(9��O$��x c�#0��U(�D���埐 �V�w��|��{lPT��\P�jB�ŝ��%���v�B��  � �_*    �!�@X�T�@T�C,]v�i0�Z
S��a
�h�=����J��� Eu�<��A�s�s�0�nV����Dk�L�e2g-pR��=H�%$H�qV1g��X�\x���Q�t�],�ީ������\n�/��� +ch�>�C0��+��r����Z�_�V�5�j��B��QN�R7$�"�X\���[��<kq�5�
�]Z\�����d䕛P�u3� �K��)9��ꪀ�)xG4��3vY�#�8�P5����= fG�ϯ��m@O0�)�6��b�+I�����֐�&mg$��7ѓ4�2 G�~-k���,Lu<���6�xRhX��������'�� ��7~��������t9�U�V��v� ??f�^5�(���ȕ�dp  � �_A    �!� ~U�(�(C
,q��@*�S��Po�[{�\^���]��B�X�+�~�O�!��A�!Bz'*4A��a�}�Ql��R~�����i�Jg2Ĵ$9((M� oVv�A��ir=�W��̖pprI8�6E�e5��y-���;J��ֳ����+�m5~�jO��n�y�B�W"�~�
Y��Ⓕ蝫-��w�Ns�U��3�S���L)�T�Zk)�DI8;�*�QST�}� ֨��_cmc&�̋Du��g��~��}A��C9��d��;�~���tc�+I%�L�u|����'�y�始��..�M���
1�@ ���^�@��x�V�OD��K$�f2�
޻P 3�)C��-��}x&�*�������煲�жwb�B�;� �dq0�R�  � �_X    �!� >U�)P�"X�is-\��V�W�q����pl�l�OZ	ۂ���R�/�pl�F��ڠ+���h<�b�P�J�����D�Qpr�}�
X�����4�k��h���ԧP�3�UG-4,-ePGl$��E�'J�
-Z�fP�4���H�b�+%��>A=��CVаK�9������T��'�ԉ)�X҂����l�^i��!Ĵm9)y/	]S�R�l�X;��DJ��Xx�]^�c�Hn}'�^��?�Y�6Ҵ�8�ԏ���mo�)GfH��>^AD�q\�<� �0�F��J ZV�-x \";q)�rS�d�W?h�P`_"���9�o�YW������������q�F���(v8����J��^th2�iY=)��a�B2!�0�wp  � �_p    �!� PXR\���������DK�8�SIK��vP��N����L���-\�ߏ��L��������p��SԢ��Q��r�,�i�qR��b=Ьq���o?��U�._s�'S(1l�+?IR�%�٩
��m�L ��t�]��_i���Uydu�Ikŭ&EkXtr��wb�	ˆ�@]�"rT�[�7���F���6�tȧz<V���D)ѽ(����7�U�	a��X� �"V~/Y����@���+U���b�V����<ɊսP��su|�[3���	���;�z�48��(�@\e�����hC�M.����MCU�݌Q��9)�&f8���n	d(F�s���7H�@�f�T���P�5�m�_�h��r�J�U��q+��	�ҳJ�%h���%  � �_�    �!� XX[T���� ��}�)�5W�}�Ea`i�gv���5�p�$>l�:����u�,`�k��h���p��cQ�D/!5]W���Ȋ�7=:��&#$�Z��b �lS�㻳T�HU����;���D�q$J`�2Dm,����8�B�*�o���E.=�Gb.���5� |�b�<��ƒx���,�ǪF��G��� �k�*�x��դcXm��8J�)Ih�2@"B!5Μ�ije
�PSqDƧu���Z8mJǲ��p^��^��	�P]��` �:���@�ԛ�FRK"r@� �58���3$��4E�2���	]1$���� �]�D9�둠�L�B{J���U�����D� 6�E�I�sH,i!U�& ��5%��D�	�����  � �_�    �!�@XTY(ֈ;	�{BT��+Kf��
YD��d�;ᾣR�d�'|)<3l��j��q�-p^Y����$�@R�\+.�^��Q� yU�P�!�9b��H
��fR�mNrr�X��؜� ��zS?� 1/���/��/��*��P�6z���`�3@���S�&b@�3��I:(��'�`� �o�(��*����!`���4�|��ʍ��qnk9RߕGk��`�a
$�A�v���j�����#Y��A�K#jծ��ϱX��[��յ�P�gyde�q��ٜS=�Z/�c����ď�p�Z�t]�R0����GD fU4�d�{SK=z���H�&�m?��
��ڕ m�p3w�d2��aR��o/�������4謱t�\�G߭�F�B�N  � �_�    �!ɀ��)�F	��7:^�«�kT.�XNk���$�݄e���w�4I�#Q'�)�����w�L�� x!��F��.��$`�B�LLBq��IK<���FG��@`���J�����-����� ;kbX���BԢ�q�\K9��W���z���-�5sB���w����3�r��ԒQ�=���R:6�Xէ�-� �ZUN�������;�@nRy������	��P�A�#%sޮ�n�U0@.?�~9��**9s]'��#VK4�M��)�����ܪ���\���A=�tn�u���AC���;s���(f$�"�w�Ao�#���+���a@�tӖ��X	�RD��.�Y��݅��wq����X��<t��q�o�M s�lZ���h
?�=z���  � �_�    �!݀�\!D���Z�WI���t<S��!*�=3���z2�Zۛ�����S�n�m�܇��Eـ�Y�
@D�A���Σ�WVQ����3PD�c��)D0y�#E��8�Q�}l��V�_�L�d��	vV@8qE*rf�΂㲪*Y�(n�r���Oȣ�^��"�ܢ����[���"�V���֡�}�Q^���
��v�J���IBͤ�o�XOs��=ͺm�:Z�Veq�[B�-2�d�Ġ�^_�3v�WQ���g�+���:W/���K��*���@�k?���1��Y`��,uo�/�(��]qd�_vSHHczM�Үu	�x|�A�'��Vlq��89v�b��':^쾺��c�C�̷��Ґ�Ww`�,��hǊ�I���)c�&+�[ف�  � �_�    �!
�RZ]�ۨ�J	���c�4��Xl��4nj{tR��q�/�� �y^5!Q1�5yh�E5��I�Ox��t���I���ZE�C�+�����jo�Jt��TP(�߹��H�uO�68%��SQj����X �Mrm`Q�����)y,X�y����_�-�(�%$U�/:�����O���Mg�,2��k��է{u^����	3%,-0U��AK!K�Ͷ\j��Ҫ��*#zKT(� ����*�ۨ
V�R�R��&v6�jeM.��9�of���a� �!)������	L�_ǡ2����H	! ���J��D++�6�-�����A6q�C�1ОY� ��������_�kO��B������O����^�BZ&��$kx�
`������  � �_�    �!	s�_���h�&4�a=y��zE���d�/�{Q��u�+�ԁ5��f8����qL�0ˠ5Q����� R&N�C\u��¯W" p��r=Ѣ~�($ux2��@ ��\,eý��m �i��W��h����%��l�L���,��b2;��t���E��9�Rd�h���B6(�jY�4�X+�}���C0F�`��z@��g��������>tN2rڝy?iAe���#�QVbt�i;&R]�:��P��%(m�T,��[���J�w�j�oG�8���C��4_$�J�qs�5�'m}��jUiC?N�K�y��M9���>$O��)����������dj��M�DbE�i�����T�%�9Ќ�~��<�XXo����_Π�P�M'�O9/F`���Wz�@Y�  � �`    �!�o/��\ �&*��*��;qESz�x�Q�K��>�J��T)Ѫd��H�S��ʪ"eC[��o���t��F�5���F�x����P���,R��P�ƌaY���q�������fq#��7�Z���y�� Tf�hHC���qረ"L
�+��?d�ɸ�6���=ڕ�W����I��wy��`]āטf�	}���u2\��0�djre'U�MY,��^ư�X��J�6�+*��A�rI��ꦽbɻ�TPBi����j��Hg=)I;�Kw�q3�is�jp0�84]���\���9 R5z�;�/n�Y�L�^��_��\�R˖�4c�-�t�A�GDR���4��z�V�2|寨��Mj�j�,�x7,+��-���Bi6���x  � �`)    �!	�c����[�tH3�À��n����x��1Ih#��^.
�aO����}_$c-���,U\W��)!a-u#���!J`<��ME��e�=P�H+�B���9+�4	x��Qn�;[�Q[��b����)08����(�HS%�.d�k�͒kB���P_ud��<��"�� c� �!�2{jX�>v1��������2zy�ܘ��]����:��1��c"�
�;"�p0hAh�բhjE�H�%(�u%A�a��`қ�ݸr*�����sl4�_$Xo\{Uf�U�o�m{�'#�mH�D�����&��w��O!��]Oa]����H~(�!imP?�:��"�p�3�$���Å��O6N��Y��lQ �pJ��  � �`A    �!�b������2	+hou����9�SQ��r�7�\��]ϗn�2'oN��9/@�'5�!/��N)⏊��رÙLu�P�k
D��;�������T��~:6�:��<��Ԓ%���1:�I�����H f���Q'EǷd��b�T '�V�af d\2�����eFѥQ��7���f�a�_���m��/����Cc��,�Q���BN���u�i��(��Q�",�++��hp�(��"�,���������N��Mf��I�N�T�E�&Q�v��*[��TщS��
 �{c١�&�h ��I	J3����(aZ[�n�f��<A��ˤ��mO�{qV*�	r��=�51`�ɧ����O�,	�V��<u$ ;K���&`ͫ�  � �`X    �!�0@���۠�8+!���:�H�\���S2��L@������;7}ͮ&��s~�~O
/�H[��lW�p	�Ŕ3��J(�hW1�BC5�P�}�N�\�B*^Y��gC��y(E4d�[l.�uSoA�qK���ځD��Z(�.�T͢��pJFN�SLN�A�rq������I�Q	��j%����v=-bDFF�u?(�xڼ��v�ї�Q5tĩ[B@��]Z�W]�pQ�HPQ����u�Uu���M��z���nx���F;���o~Ũܨ,�F�\��M>�`KQ�ڂK�Xp3]Wz2еM��ן	�8kp�__��{�0�|d�h�����ͯg�E����(�pV��mw���>�������:ۀQ]�w`�)*mc)�p  � �`o    �!	B  ����p�"X�_��Yg���qTV(��a,��yF(�^���1�����:�}6	w�Ow�:�ݷMZ"{k���fCL�����T�Y�]O��qЩP�##M��[O�CX�@2$99[|Zg*�Un�.��3��3���.9��b�CZ�o^$����~�#���O9�qz�qol����K��i���hTS)�Z��#14I�.�'9��"� �y(��2:1�{�K#+59���Ϊpjw�=q$� �3�`�?��OH��6=#��	GM�<�Ԫb�C�V��7q)a��_�A�?���ʕk.�-�_q���! q�3�5��n5LR>�z�jk���=�v R���W���D�
�Q����������,���J�֫�xj���  � �`�    �!	&  ��[ � ��(q��(Cz�1L��~n���:I,\�.#��J)�?�N��e��t�����}p���t�!N�H5=��f�d=-��d�]V,�o�ك�W�>d�r��!��^o���B�\�Y�BDΩ�]H,���������.��'�Ч�G�/�@h�K:Zw����|�(o�L��AWc,�#���*��2��! �"��
�\�b�;\5���멭J�낯&J�A$�̽���R��Y����N]k�aK�E_f04zR�-�z|Б��ǹ�w�3{k�Y[�\b���Yxp��E�5 	�oA8�J��S^`�!S� úl�\�P��eWQ:c��6ڗ��.�h![ �dR��"2U�j�cr��oY��3�H���:Ø�  � �`�    �!`  ��ڨp�Vt��Է���I��G;��@#����9���J9f�ܨ��[?���d �Z��x`�o��g��&�h����L�4��YM�H��t�i�Q+ʨ0�~.2J%m�Gӊf��Ɇ��c���Z��L�d��1��/�j�I�����Gm�*Z�b ��ј��1t�F/���6dn�K�ZX��R����BUnB�Ě
�N�IԠ����]�A0��Va�lbPsg��P{g����	�����#X�Hƺ^R.��)HZ�&8M�E�9�ڿ��q"�jt���H�3�q�I�&#����y����x����{���|�w�kLg%��7��L�+�vF�)+c7�6�n�_��I�ݒ�g�'s"
\�!B���U��C  � �`�    �!+  @��Y)P�"X���Z�QKn�UR�L	|
��5Q��r����?n���1�ѿ���w���'�{t��ݰt\�5�zp΁J2Sp]��.�l�u1�I�K"ϖq,�cU,�U2�^�"�
m�Z�kD��@k�[Jk�7>�d��t�CGP�v��+l�ta�3����L�:�R�x���W�5���Y7/Qi��p,aEYN�H�c\  �H�I�|Ґ��C�1,�u�\����ES1�����uӚ���04�^N�"�����1��\�ʶ����^&�1��E=�
���S���Aʕsܾ��z�2�a��G�n�5�G�fV�:0�\�Ʃ�0�K�P��ߺ�K�w�]\�͕O���m)3-�5�{G~|=�&(�/�':;��`�/�xm(��  � `�    �!M9N[h�M��l�(����M��¨�Td"��ܝ��"�fWU@A�m�L��ٹ~Ӓr��?�q��|Y�=��#�P��[�B�X�O�N�
S{�#���'�S�V��s�=a��9���3��W�O��TLI�{����V���h��Iq���AU<"��T�A��ŷXr�����g#�J)B�8���|jXdo��X��@�o�&�}�f�נ�$�5B�G�t�W��*n�~5�/{�G�c�(�9��_���-ͦ|[q��ZL�	J�X���lXd*��M\���i=6��^O�>�wn�P�R���.M��]d����h��+��>uw(�9K��k��B�P_����+Id�g~��5�O͞�+k�"g*����Ƙ���_G��n2�L�����C�h���E�fZ|��B�u{�.pN�1�/YB`�L�_�X�u9��:e���(;��]��1�ya���;��:�=���#�����5��x1�:4�&�~	>�ʍ8ߡgAp�������PZ4G�\�ИI�Et��4c�@���8  ' �`�    �!{=��B��T��jۡ�B���e�Tcߝ���$-���iʠӛE+A�;��8q4+��Ԫ�i�ۚ=,��+�P@���H;$.2K�FP�*ñ͘�'.!X��7:����m����d�Ωg��C2������Q�P���7K��^rPs X-K
�. ۾�\"ބ�4�BMEKa9������c\,���.~�w�Jǩī�Up��e�� 6�$!����f�2���T��IH��=g���>n�݋{�j� F�W�9w����K�	Y$@�YʖA�>C,&��v��D�DO�l~�	��JQ�eI�K$��V�%{�~�B;�K*����J##W��%3+_:.��V��hb06R�8xS~�}5H�7竏t��E4��� ;˿ih��#Tk)�+�����J�� & 8  � �`�    �!@  VX�V6Z����1O],_5(��tgnx�g2�����j��(|ˡ�K}g�W9����d��@iW���͌bu�����3���S�h��q�б���Ĉ�% ��Xv2��Maw�{�v6�bin��w�r�EeU�_�7�L|�w�5��b�T�J[���̶��Jp��YG�KK�?ȥ�Wy��E�e��d��(�;�Uj�����v�����Rg�( �����O����9���J��])"��<��c�"�Ŝ��f�8Z�Z�w�;�u�'�i�g����jU�F8�h̓��)l.Z�v��t�,	�Pσ�Ͻw�ȚJs�b�st"ėl�]8������=���BpL,��{�)-�������6K
's�p�����FIs�	�~�v�q�o	�b���  � �a    �!=������:V��ei��,�A�����PE�yk�r��5����*r[&��Z���Ү8���7s[�����B`��NД�T�/��:�B^ˉY�	���O]��B�Y�ҋ3�I���"g��<����DA�ot�c#��|k �n�����F�+�&��'J�Ela�>N3L�-NSb���F�Ь�_oca�kr��*�䒪���,$�ȻK�*rK�B-,%����v�*��Z��-2��δ@�@����#)��Xxҍ)�������A�<��-�Z+%��W�$�� �`��8���3`��rS\��Z�x�HJ��Y� ��#,h[W����o��.�t�R3Y�fXY=���f�FM򞘁��+�iK�5�*C�N�F�&Qf��
��  � �a)    �!	� �[`�6�,GH�O��{��R�,�^h�G�ZK,t|�Ii��Co��$���#����g@�ѱ�����y9�-g�1HIfҜ R�Q �T�F*��i�.&���n������[h�-��m{����GW*��$ӈ�"�8����@9���Gu��@$ �R��uYi!9�,�#���h͉d�ym#Fb��g�:^�8E��v�g)��	&�h초3)	�Z>J�5�*J�89��^��2 .p�MO��7̪�س��W�F���z�'�=��6ƍ��
�n��J0Tp3�I�$c�4J���uI���_�E�D� ����)�И��wP�p=���Zf,�a����p��  % !�VH$-N���N)�с�-�+L.[��"���mXI�8Z��)(8  � �a@    �!� .�� �&"X������K�Sn��QAt´�$�6�sqa����T0����d{ٜ����m�n ��z�w� \%�p�D�Pdb�d�����aT� I�*�*0q�:�8TƯ�ш=�a�VȰ����]������jҥJadzR#��OA�D�.�����{:�V�C+|�0�Z���B�#MPGAٿ4R+��4�1]{-�n�#	o�5s�PS��%�-��0�A �V>�-ޢ՛�JE����%�������Z�d�ƥb�v�^�&=Ջ�UT`}�Tee4������i����nx���Fr�`�7��F���Z�a���Ɩ�a��^��<	ȍaOX`UTk��� ��$��K����m
�ō�,�c�� �㲐�z��Eϒ�q�J	_������I���r�  � �aW    �!P� ?�\p9	
m=��+��ľ������Ri���P�sNܩ�Z*"�9L��$��C�+[�/�Ú\�������H�3��Wmc���vζ��%�C�[p!N�2�}gdL0��*��}�xW��ؔ:��Y���^���?���,���C���&����r�2������ڔ4�UuS�+�	@B3f3,��ml�?u9��ev���6�!--���ؓ-��RY)PFZJ� �M���U��)UB��s�зD�7�'q��M��E�"��L��46N1��O�����~�m��x�ED��B��-���ɳboPr�>�D�a�&���C0�+]����+��:d�^I!P�\&SԥTLC��H,��g��`�i��D1s�InOjO� �r�t��1�4Dn1��i��t��8  �                                                                                                                                                                                                                                                                                                                                                            I��}xi.{�eJ�r/I�/rEj��j5��r��Ͱ6(�2s�s'H�UkGmb�X�"(�.Mʩ�����Rز�
n4�g�b�x�}dd펖�ف�d���4�vhC7��X4��M딄���Ӯ�&�w>�'~�JQ�7T�V:Pie*^�l�3�#��9-���:PґC��K$���>@���`ꬽ7\�d�^�_zp�c*����*�"� �.a8�6kּ
5*������  �                                                                                                                                                                                                                                                                                       ���7cppݠu�J�HG�gv=�낪�U�S/�U��*��ǋ�w�jF�dL�^s�	�7-y79�	����Bhe��C�
$��(���I��
}��7�J�,	���aN�Z$�,�2��3V����k=�C�]�#�G~-O�tչ������=a@�m
ue!�����ƈ�^�S�5RJ�	���z#L������i���d�f����h�Z��D���<;H�LT��I�G��aO��d�$�t�9��)JB�FZ��z�v�[�01|@�Y+w��5f̺*��A]+l�W�=�S���/��|OZN��k��ȣc�p��hn���1'܆�A��|�*ϲ�������XA=�����ϼ��B���� �r}�%0c8�B�]�]}�*�:�	��R�à������BodH_Ws�m������? �N��@P��C���q�'E�.
;Ф�����Aw)n�{R�>H��r�S��K.�*�K���i��%K�j@��^��z�k��?�Y�m	cc�������eyv^�:?q��q4�_C�׋ità��ԍ]lDkS`k�]v�kI��l,k;��}����8�2l�[�J�}r�F�f�Gk{�j��>��g��j�zZ�U1�g1nݍӸPF���CF��l�]ը���[oч�ŗvWF��;��P��6��3`�z�9��l������g7�xhI}.�ggh�g!�=���� 2d1:� !6��(6z׃��������+[A���ŽOƖ�l����I�sىRR����؝
6��S�8��UYAt<z�טV�Ռu��L�Z�r7gN�_�Ɖ{w2s/JE�(�U�ʪ�e��b�ERy\�Ly����y�A1O����i�Q��>�A���qX��}�ĆG��2�H��u��@�cm��8��
p��?-t3�[�b�u�/��g  ؄zg�
��Tݵţp0BgY���X�%��gs�#��v�<(̵(��U"�y�l$K�V��c���?�1�#i��!#[r�g��Ұ�o:�;s<$��ќs˾�l��Q��w�k~��\�GJiGJ�rA��
�k�<,�Q!�0��[��E�VtK�v	���CO!�d�k��B��Q�6�`	"JZr�P	���\PUS��-��F[:�<�S�CD�n�#d��cM61�,��V׶*|L��.��P퉒�k����i%�SV�.�_θ�a7F�� K��p]N��	z���vDȕBn��q<.T�hv�KS	�ܖM�X�5��ZQEy��ڶw��#�y4.��=Q�r���.)�C�2�	)�W�o*�8Nu�LMb���$k�9K�T��T7cW�0Hr�Fr����mH單723�ZE���5�+��I�ТE���]�VhD�����Pī�4N7B�g�[ i.��N�3�W'�8~����".9
K{v4"w�PO�E²/�/הi��2ᑓ�k����\��#mj/ �H�|z#S�xr��bU��3ǁ�,_�߬&$�3�Pm��\ޤ��>K�{�ӊ/e�S|��v/�L��R�����k�-Vʻ;�^Kӈ~��<���`�;I$D.2�^\�u��$��)�Ȇ��	�1WuV��H����u�S� ����ɾ�d�6-�m
��(��� ����%׃���7�\1�,��S�F�C#�v^ɭ#N�Mm`D쨉(u�ATJd��Rݹ��ξC�,p��̑&n�6�$�0$@Ԟn��~k�n�/'�_�~�#1�m��]n�f��/���*}�����P$��PB���RuY����gܗ��L���@l���]__�N'z�JeڦO�56��/�4M�����z��e�����a��YЏ�?�9CEuIHe�$��Z �|���j!��8j��M����e�5+�| /\�EK���i��<���v��I��N4����y�Z��j��3�T}�L[a�L+���~x��1�|�#i�Jxǹ��W�S�T��N��� �(P׬�G1�7��q3�E�m��ZͰ��.��a�I���h5�zy�c�,O�C(M�-��jH�Μ���%�d<���-��^�����ŋ�/�՟��/�_���vՏ��t��xs�9�j���������<;��)����3/����g�쟕 @�R��RB]���Oǯ�������4���>sc�OCJ�s;��2�[��ﯩVz�L�o�V�b��Zөp�D5�����"�8��p�2�S��Z�VkT~��߇�j�E3m��0�$�V�a)�u���1���M�f��]{�7�ck�l�@t$Q0u�.K���R�W�`�p����õ��sъ�������/4cQL���~�@���b�3�IIpe��~r	�mS��ó���z����R�Jn�vfdLs�y)��z(=��NUN���ٖRN���?�y�\^[�&"rwww8��㳀߶�y�������MJ��P�3D�<�s� �H�������{��?�����u��8jۻ�@u�v&ξ�+j�+��T">��z�u�o>ʈUDQnsP��m��L�r#e cache
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
                    // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
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
