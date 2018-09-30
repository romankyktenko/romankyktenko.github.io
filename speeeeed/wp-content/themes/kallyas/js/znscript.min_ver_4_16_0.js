! function(e) {
    function t(e) {
        try {
            JSON.parse(e)
        } catch (e) {
            return !1
        }
        return !0
    }

    function a(e) {
        return void 0 === e || null === e || "" === e || "undefined" === e
    }
    e.ZnThemeJs = function() {
        this.scope = e(document), this.isHeaderStick = !1, this.zinit()
    }, e.ZnThemeJs.prototype = {
        zinit: function() {
            var t = this;
            t.addactions(), t.initHelpers(), t.refresh_events(e(document)), t.enable_responsive_menu(), t.enable_follow_menu(), t.sticky_header(), this.videoBackArr = [], this.videoAutoplay = []
        },
        refresh_events: function(e) {
            var t = this;
            t.enable_fitvids(e), t.enable_logoinmenu(e), t.fixed_header_relative(e), t.enable_menu_offset(), t.enable_magnificpopup(e), t.enable_isotope(e), t.enable_lazyload(e), t.enable_header_sparkles(e), t.enable_slick_carousel(e), t.enable_contact_forms(e), t.enable_circular_carousel(e), t.enable_flickr_feed(e), t.enable_icarousel(e), t.enable_latest_posts_accordion(e), t.enable_portfolio_sortable(e), t.enable_gridphotogallery(e), t.enable_nivo_slider(e), t.enable_wow_slider(e), t.enable_static_weather(e), t.enable_iconbox(e), t.enable_searchbox(e), t.enable_toggle_class(e), t.enable_diagram(e), t.enable_services(e), t.enable_scrollspy(e), t.enable_tooltips(e), t.enable_customMenuDropdown(e), t.customMenuElm_toggleSubmenus(e), t.enable_portfolio_readmore(e), t.general_wc_stuff(e), t.init_skill_bars(e), t.general_stuff(e)
        },
        RefreshOnWidthChange: function(e) {},
        addactions: function() {
            var t = this;
            t.scope.on("ZnWidthChanged", function(a) {
                t.RefreshOnWidthChange(a.content), e(window).trigger("resize")
            }), t.scope.on("ZnNewContent", function(e) {
                t.refresh_events(e.content)
            });
            var a = localStorage.getItem("znkl_lastTab");
            a && e('[href="' + a + '"]').tab("show").addClass("active")
        },
        unbind_events: function(e) {},
        initHelpers: function() {
            this.helpers = {}, this.helpers.isInViewport = function(e) {
                var t = e.getBoundingClientRect(),
                    a = document.documentElement,
                    i = .75 * t.height;
                return t.top >= -i && t.bottom <= (window.innerHeight || a.clientHeight) + i
            }, this.helpers.debounce = function(e, t, a) {
                var i;
                return function() {
                    var n = this,
                        o = arguments,
                        s = function() {
                            i = null, a || e.apply(n, o)
                        },
                        r = a && !i;
                    clearTimeout(i), i = setTimeout(s, t), r && e.apply(n, o)
                }
            }
        },
        enable_logoinmenu: function(t) {
            var a = e(t).find(".site-header.kl-center-menu");
            if (a.length > 0) {
                var i = a.find(".main-menu-wrapper").prev(".logo-container"),
                    n = e(".main-nav > ul > li"),
                    o = n.length;
                if (0 !== o) {
                    var s;
                    if (o > 1) {
                        var r = o / 2;
                        s = a.hasClass("center-logo-ceil") ? Math.ceil(r) : Math.floor(r)
                    } else s = 1;
                    if (i.length) {
                        var l = i.clone().insertAfter(n.eq(s - 1));
                        l.removeClass("zn-original-logo").wrap('<li class="logo-menu-wrapper"></li>'), setTimeout(function() {
                            l.parent().addClass("is-loaded")
                        }, 400)
                    }
                }
            }
        },
        fixed_header_relative: function(t) {
            var a = e(t).find("#header.site-header--relative.header--fixed");
            if (a.length > 0 || window.matchMedia("(min-width: 768px)").matches) {
                a.after('<div id="site-header-FixedRelativeFix" />');
                var i = e("#site-header-FixedRelativeFix"),
                    n = function() {
                        var e = a.outerHeight();
                        void 0 !== e && i.css("height", e)
                    };
                n(), e(window).on("debouncedresize", function() {
                    n()
                })
            }
        },
        enable_lazyload: function() {
            echo.init({
                offset: 50,
                throttle: 250,
                unload: !1,
                callback: function(e, t) {
                    "load" === t ? e.classList.add("is-loaded") : e.classList.remove("is-loaded")
                }
            }), e(window).on("zn_tabs_refresh", function() {
                echo.render()
            })
        },
        enable_portfolio_readmore: function(t) {
            var a = t.find(".znprt_load_more_button");
            if (0 !== a.length) {
                var i = this;
                a.on("click", function(t) {
                    t.preventDefault();
                    var a = e(this),
                        n = a.data("page"),
                        o = a.data("ppp"),
                        s = a.parent().find(".ptf-stb-thumbs"),
                        r = a.data("categories");
                    if (a.hasClass("zn_loadmore_disabled")) return !1;
                    a.addClass("kl-ptfsortable-loadmore--loading"), e.post(ZnThemeAjax.ajaxurl, {
                        action: "zn_loadmore",
                        offset: n + 1,
                        ppp: o,
                        categories: r,
                        show_item_title: a.data("show_item_title"),
                        show_item_desc: a.data("show_item_desc"),
                        zn_link_portfolio: a.data("portfolio_links"),
                        ptf_sortby_type: a.data("ptf_sortby_type"),
                        ptf_sort_dir: a.data("ptf_sort_dir")
                    }).success(function(t) {
                        a.removeClass("kl-ptfsortable-loadmore--loading"), a.data("page", n + 1);
                        var o = e(t.postsHtml).css("opacity", 0).appendTo(s);
                        s.imagesLoaded(function() {
                            i.refresh_events(o), s.isotope("updateSortData", o).isotope("appended", o)
                        }), t.isLastPage && a.addClass("zn_loadmore_disabled")
                    })
                })
            }
        },
        enable_menu_offset: function() {
            e("#main-menu").find("ul li").on({
                "mouseenter.zn": function() {
                    var t = e(this).children(".sub-menu").first();
                    if (t.length > 0) {
                        var a, i = t.offset().left,
                            n = t.width();
                        a = e("body").has(".boxed") ? e("#page_wrapper").width() : e(window).width(), i + n > a && t.addClass("zn_menu_on_left")
                    }
                },
                "mouseleave.zn": function() {
                    e(this).children("ul").first().removeClass("zn_menu_on_left")
                }
            })
        },
        enable_fitvids: function(e) {
            var t = e.find(".zn_iframe_wrap, .zn_pb_wrapper, .fitvids-resize-wrapper");
            0 !== t.length && t.fitVids({
                ignore: ".no-adjust, .kl-blog-post-body,.no-fitvids"
            })
        },
        enable_contact_forms: function(t) {
            var a = this;
            (t ? t.find(".zn_contact_form_container > form") : e(".zn_contact_form_container > form")).each(function(t, i) {
                var n = e(i),
                    o = n.find(".zn_fr_time_picker"),
                    s = n.find(".zn_fr_date_picker"),
                    r = s.is("[data-datepickerlang]") ? s.attr("data-datepickerlang") : "",
                    l = s.is("[data-dateformat]") ? s.attr("data-dateformat") : "yy-mm-dd",
                    d = o.is("[data-timeformat]") ? o.attr("data-timeformat") : "h:i A";
                o.length > 0 && o.timepicker({
                    timeFormat: d,
                    className: "cf-elm-tp"
                }), s.length > 0 && (s.datepicker({
                    dateFormat: l,
                    showOtherMonths: !0
                }).datepicker("widget").wrap('<div class="ll-skin-melon"/>'), "" !== r && e.datepicker.setDefaults(e.datepicker.regional[r])), e(".kl-material-form.zn_cf_text .zn_form_input, .kl-material-form.zn_cf_textarea .zn_form_input, .kl-material-form.zn_cf_datepicker .zn-field-datepicker").on("change focus blur", function(t) {
                    "" != e(this).val() ? e(this).addClass("input-has-content") : e(this).removeClass("input-has-content")
                }), n.on("submit1", function(t) {
                    if (t.preventDefault(), !0 === a.form_submit1ting) return !1;
                    a.form_submit1ting = !0;
                    var i = e(this),
                        n = i.find(".zn_contact_ajax_response:eq(0)"),
                        o = !1,
                        s = {
                            fields: i.find('textarea, select, input[type="text"], input[type="checkbox"], input[type="hidden"]')
                        },
                        r = n.attr("id"),
                        l = i.find(".zn_contact_submit1");
                    if ((f || u || p) && i.is('[action="#"]') && i.attr("action", ""), l.addClass("zn_form_loading"), s.fields.each(function() {
                            var t = e(this),
                                a = t.parent();
                            t.is(":checkbox") && (t.is(":checked") ? t.val(!0) : t.val("")), a.removeClass("zn_field_not_valid"), t.hasClass("zn_validate_not_empty") ? t.is(":checkbox") ? t.is(":checked") || (a.addClass("zn_field_not_valid"), o = !0) : "" === t.val() && (a.addClass("zn_field_not_valid"), o = !0) : t.hasClass("zn_validate_is_email") ? t.val().match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) || (a.addClass("zn_field_not_valid"), o = !0) : t.hasClass("zn_validate_is_letters_ws") ? t.val().match(/[^A-Za-z\s]/i) && (a.addClass("zn_field_not_valid"), o = !0) : t.hasClass("zn_validate_is_numeric") && isNaN(t.val()) && (a.addClass("zn_field_not_valid"), o = !0)
                        }), o) return l.removeClass("zn_form_loading"), a.form_submit1ting = !1, !1;
                    var d = i.serialize();
                    return e.post(i.attr("action"), d).success(function(t) {
                        a.form_submit1ting = !1, l.removeClass("zn_form_loading");
                        var n = e(t).find("#" + r + " > .zn_cf_response"),
                            o = e("#" + r),
                            d = i.data("redirect");
                        o.html(n), n.hasClass("alert-success") && (s.fields.val(""), d && window.location.replace(d))
                    }).error(function() {
                        console.log("Error loading page")
                    }), !1
                })
            })
        },
        enable_toggle_class: function(t) {
            t.find(".js-toggle-class").each(function(t, a) {
                var i = e(a);
                i.on("click", function(t) {
                    if (t.preventDefault(), i.toggleClass("is-toggled"), i.is("[data-multiple-targets]")) {
                        var a = i.is("[data-targets]") ? i.attr("data-targets") : "",
                            n = i.is("[data-target-classes]") ? i.attr("data-target-classes") : "";
                        if (a && a.length && n && n.length) {
                            var o = a.split(","),
                                s = n.split(",");
                            o.length > 0 && e(o).each(function(t, a) {
                                e(a).toggleClass(s[t])
                            })
                        }
                    } else {
                        var r = i.is("[data-target]") ? i.attr("data-target") : i,
                            l = i.is("[data-target-class]") ? i.attr("data-target-class") : "";
                        r && r.length && l && l.length && (e(r).toggleClass(l), window.didScroll = !1)
                    }
                    e(window).trigger("resize")
                })
            })
        },
        enable_isotope: function(a) {
            a.find(".js-isotope, .zn_blog_columns:not(.kl-cols-1)").each(function(a, i) {
                var n = e(i),
                    o = t(n.attr("data-kl-isotope")) ? JSON.parse(n.attr("data-kl-isotope")) : {},
                    s = {
                        itemSelector: ".blog-isotope-item",
                        animationOptions: {
                            duration: 250,
                            easing: "easeOutExpo",
                            queue: !1
                        },
                        sortAscending: !0,
                        sortBy: "",
                        isInitLayout: !1
                    };
                e.isEmptyObject(o) || e.extend(s, o), n.imagesLoaded(function() {
                    void 0 !== e.fn.isotope && (n.isotope(s), n.isotope("on", "arrangeComplete", function() {
                        n.addClass("isotope-initialized")
                    }), n.isotope())
                })
            })
        },
        enable_follow_menu: function() {
            var t, i = e("header#header"),
                n = e("#main-menu > ul");
            if (i.hasClass("header--follow") && !window.matchMedia("(max-width: 1024px)").matches && n && n.length > 0) {
                if (n.clone().appendTo(document.body).wrap('<div class="chaser" id="site-chaser"><div class="container"><div class="row"><div class="col-md-12"></div></div></div></div>').addClass("chaser-main-menu"), t = e("#site-chaser")[0], a(g)) return;
                var o = new ScrollMagic.Scene({
                    offset: 120,
                    reverse: !0
                });
                o.setClassToggle(t, "visible"), o.addTo(g)
            }
        },
        sticky_header: function() {
            var t = e("#header.header--sticky"),
                i = this;
            if (0 !== t.length) {
                var n = t.find(".site-header-top-wrapper, .site-header-main-wrapper, .site-header-bottom-wrapper");
                if (!a(g)) {
                    var o = new ScrollMagic.Scene({
                            offset: 1
                        }),
                        s = function(e) {
                            if (t.is("[data-custom-sticky-textscheme]")) {
                                var a = t.attr("data-original-sticky-textscheme"),
                                    i = t.attr("data-custom-sticky-textscheme");
                                n.removeClass("sh--dark sh--light sh--gray"), "leave" == e ? n.addClass(a) : "enter" == e && n.addClass(i)
                            }
                        };
                    o.on("enter", function(e) {
                        t.removeClass("header--not-sticked").addClass("header--is-sticked"), t.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                            i.isHeaderStick = !0
                        }), s("enter")
                    }), o.on("leave", function(e) {
                        t.removeClass("header--is-sticked").addClass("header--not-sticked"), t.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                            i.isHeaderStick = !1
                        }), s("leave")
                    }), o.addTo(g)
                }
            }
        },
        enable_responsive_menu: function() {
            var t = e("#main-menu.mainnav--sidepanel > ul");
            if (t.length > 0) {
                var a = this,
                    i = e("#page_wrapper"),
                    n = e("#zn-res-trigger"),
                    o = !1,
                    s = ZnThemeAjax.zn_color_theme,
                    r = t.clone().attr({
                        id: "zn-res-menu",
                        class: "zn-res-menu-nav znResMenu-" + s
                    });
                r.find(".zn-megaMenuSmartArea [id]").attr("id", function(e, t) {
                    return t + "_cloned"
                }), r.find(".zn-megaMenuSmartArea [data-toggle]").attr("href", function(e, t) {
                    return t + "_cloned"
                });
                var l = function(e) {
                        return "<" + e + ' class="zn_res_menu_go_back"><span class="zn_res_back_icon glyphicon glyphicon-chevron-left"></span><a href="#" class="zn_res_menu_go_back_link">' + ZnThemeAjax.zn_back_text + "</a></" + e + ">"
                    },
                    d = function() {
                        r.removeClass("zn-menu-visible"), n.removeClass("is-active"), c()
                    },
                    c = function() {
                        i.css({
                            height: "auto"
                        })
                    },
                    f = function() {
                        r.addClass("zn-menu-visible"), n.addClass("is-active"), u()
                    },
                    u = function() {
                        var t = e(".zn-menu-visible").last(),
                            a = t.css({
                                height: "auto"
                            }).outerHeight(!0),
                            n = e(window).height(),
                            o = 0,
                            s = e("#wpadminbar");
                        a < n && (a = n, s.length > 0 && (o = s.outerHeight(!0), a -= o)), t.attr("style", ""), i.css({
                            height: a
                        })
                    },
                    p = function() {
                        var t = r.prependTo(i);
                        t.find("li:has(> ul.sub-menu), li:has(> div.zn_mega_container)").addClass("zn_res_has_submenu").prepend('<span class="zn_res_submenu_trigger glyphicon glyphicon-chevron-right"></span>'), t.prepend(l("li")), t.find(".zn_res_has_submenu > ul.sub-menu").prepend(l("li")), t.find(".zn_res_has_submenu > div.zn_mega_container").prepend(l("div")), t.find('a:not([rel*="mfp-"]):not(.zn_res_menu_go_back_link)').on("click", function(e) {
                            d()
                        }), r.find(".zn_res_back_icon, .zn_res_menu_go_back_link").on("click", function(t) {
                            t.preventDefault();
                            var a = e(this).closest(".zn-menu-visible");
                            a.is("#zn-res-menu") ? d() : (a.removeClass("zn-menu-visible"), u())
                        }), r.find(".zn_res_submenu_trigger").on("click", function(t) {
                            t.preventDefault(), e(this).siblings("ul, .zn_mega_container").addClass("zn-menu-visible"), u()
                        }), n.on("click", function(t) {
                            t.preventDefault(), e(this).hasClass("is-active") ? d() : f()
                        })
                    };
                e(window).on("debouncedresize", function() {
                    e(window).width() <= ZnThemeAjax.res_menu_trigger ? (o || (p(), o = !0, a.refresh_events(r)), i.addClass("zn_res_menu_visible")) : (d(), i.css({
                        height: "auto"
                    }).removeClass("zn_res_menu_visible"))
                }).trigger("debouncedresize")
            }
        },
        enable_header_sparkles: function(t) {
            var a = t.find(".th-sparkles:visible");
            if (0 === a.length) return !1;
            a.each(function() {
                var t = 0;
                for (t; t < 40; t++) new v(e(this))
            })
        },
        enable_magnificpopup: function(t) {
            function a(e, t, a) {
                var i = new Date;
                i.setTime(i.getTime() + a);
                var n = "expires=" + i.toUTCString();
                document.cookie = e + "=" + t + ";" + n + ";path=/"
            }

            function i(e) {
                for (var t = e + "=", a = document.cookie.split(";"), i = 0; i < a.length; i++) {
                    for (var n = a[i];
                        " " == n.charAt(0);) n = n.substring(1);
                    if (0 == n.indexOf(t)) return n.substring(t.length, n.length)
                }
                return ""
            }
            var n = this;
            if (void 0 !== e.fn.magnificPopup) {
                e("a.kl-login-box, .zn-loginModalBtn>a").magnificPopup({
                    type: "inline",
                    closeBtnInside: !0,
                    showCloseBtn: !0,
                    mainClass: "mfp-fade mfp-bg-lighter",
                    callbacks: {
                        close: function() {
                            var e = this.content;
                            e.find(".zn_form_login-result").html(""), e.find("input.form-control").val("")
                        }
                    }
                });
                var o = {
                    delegate: 'a[data-type="image"]',
                    type: "image",
                    gallery: {
                        enabled: !0
                    },
                    tLoading: "",
                    mainClass: "mfp-fade"
                };
                e('a[data-lightbox="image"]:not([data-type="video"]), .mfp-image').each(function(t, a) {
                    var i = e(a);
                    0 === i.parents(".gallery").length ? i.magnificPopup({
                        type: "image",
                        tLoading: "",
                        mainClass: "mfp-fade"
                    }) : i.parents(".gallery").magnificPopup(o)
                }), e(".zn-modal-img-gallery").each(function(t, a) {
                    e(a).magnificPopup(o)
                }), e(".mfp-gallery.mfp-gallery--images").each(function(t, a) {
                    e(a).magnificPopup({
                        delegate: "a",
                        type: "image",
                        gallery: {
                            enabled: !0
                        },
                        tLoading: "",
                        mainClass: "mfp-fade"
                    })
                }), e(".mfp-gallery.mfp-gallery--misc").each(function(t, a) {
                    e(a).magnificPopup({
                        mainClass: "mfp-fade",
                        delegate: 'a[data-lightbox="mfp"]',
                        type: "image",
                        gallery: {
                            enabled: !0
                        },
                        tLoading: "",
                        callbacks: {
                            elementParse: function(t) {
                                t.type = e(t.el).attr("data-mfp")
                            }
                        }
                    })
                });
                var s = {
                    delegate: 'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"]',
                    type: "image",
                    gallery: {
                        enabled: !0
                    },
                    tLoading: "",
                    mainClass: "mfp-fade"
                };
                e('.kl-blog-content-full .kl-blog-item-content a[href$=".jpg"], .kl-blog-content-full .kl-blog-item-content a[href$=".jpeg"], .kl-blog-content-full .kl-blog-item-content a[href$=".png"]').each(function(t, a) {
                    e(a).parents(".kl-blog-item-content").magnificPopup(s)
                }), e('.kl-blog-link-images .kl-blog-post-body a[href$=".jpg"], .kl-blog-link-images .kl-blog-post-body a[href$=".jpeg"], .kl-blog-link-images .kl-blog-post-body a[href$=".png"]').each(function(t, a) {
                    e(a).parents(".kl-blog-post-body").magnificPopup(s)
                }), e('a[data-lightbox="iframe"], a[rel="mfp-iframe"], .mfp-iframe').magnificPopup({
                    type: "iframe",
                    mainClass: "mfp-fade",
                    tLoading: ""
                }), e('a[data-lightbox="inline"], a[rel="mfp-inline"]').magnificPopup({
                    type: "inline",
                    mainClass: "mfp-fade",
                    tLoading: ""
                }), e('a[data-lightbox="ajax"], a[rel="mfp-ajax"]').magnificPopup({
                    type: "ajax",
                    mainClass: "mfp-fade",
                    tLoading: ""
                }), e('a[data-lightbox="youtube"], a[data-lightbox="vimeo"], a[data-lightbox="gmaps"], a[data-type="video"], a[rel="mfp-media"]').magnificPopup({
                    disableOn: 700,
                    type: "iframe",
                    removalDelay: 160,
                    preloader: !0,
                    fixedContentPos: !1,
                    mainClass: "mfp-fade",
                    tLoading: ""
                });
                e('a[data-lightbox="inline-dyn"]').each(function(t, a) {
                    e(a).magnificPopup({
                        type: "inline",
                        mainClass: "mfp-fade",
                        callbacks: {
                            open: function() {
                                var t = e.magnificPopup.instance,
                                    i = e(t.content).find("form"),
                                    n = e(a).attr("title");
                                if (e(i).length > 0 && "" !== n) {
                                    var o = i.first().find(".zn-field-dynamic");
                                    e(o).length > 0 && e(o).first().val(n).attr("readonly", "readonly")
                                }
                            }
                        }
                    })
                });
                var r = function(e) {
                    return "halfhour" == e ? 18e5 : "hour" == e ? 36e5 : "day" == e ? 864e5 : "week" == e ? 6048e5 : "2week" == e ? 12096e5 : "month" == e ? 2592e6 : void 0
                };
                e("body:not(.zn_pb_editor_enabled) .zn_section--auto-immediately").each(function(t, n) {
                    var o = e(n),
                        s = o.attr("id"),
                        l = "automodal" + s;
                    void 0 !== i(l) && "true" == i(l) || e.magnificPopup.open({
                        items: {
                            src: o,
                            type: "inline"
                        },
                        mainClass: "mfp-fade",
                        callbacks: {
                            open: function() {
                                o.is("[data-autoprevent]") && a(l, "true", r(o.attr("data-autoprevent")))
                            }
                        }
                    })
                }), e("body:not(.zn_pb_editor_enabled) .zn_section--auto-scroll").each(function(t, o) {
                    var s = e(o),
                        l = s.attr("id"),
                        d = "automodal" + l,
                        c = !1;
                    void 0 !== i(d) && "true" == i(d) || e(window).on("scroll", n.helpers.debounce(function() {
                        e(window).scrollTop() > e(document).outerHeight() / 2 && !1 === c && (e.magnificPopup.open({
                            items: {
                                src: s,
                                type: "inline"
                            },
                            mainClass: "mfp-fade",
                            callbacks: {
                                open: function() {
                                    s.is("[data-autoprevent]") && a(d, "true", r(s.attr("data-autoprevent")))
                                }
                            }
                        }), c = !0)
                    }, 300))
                }), e("body:not(.zn_pb_editor_enabled) .zn_section--auto-delay").each(function(t, n) {
                    var o = e(n),
                        s = o.attr("id"),
                        l = "automodal" + s,
                        d = !1,
                        c = o.is("[data-auto-delay]") ? parseInt(o.attr("data-auto-delay")) : 5;
                    void 0 !== i(l) && "true" == i(l) || setTimeout(function() {
                        e.magnificPopup.open({
                            items: {
                                src: o,
                                type: "inline"
                            },
                            mainClass: "mfp-fade",
                            callbacks: {
                                open: function() {
                                    o.is("[data-autoprevent]") && a(l, "true", r(o.attr("data-autoprevent")))
                                }
                            }
                        }), d = !0
                    }, 1e3 * c)
                })
            }
        },
        checkVideosVolume: function(a) {
            e(a.slider).find(".slick-cloned[data-video-slide]").each(function() {
                var a = e(this),
                    i = a.find(".zn-videoBg"),
                    n = a.find("iframe"),
                    o = i.hasClass("video-loaded"),
                    s = i.is("[data-video-setup]") && t(i.attr("data-video-setup")) ? JSON.parse(i.attr("data-video-setup")) : {};
                n.remove(), !o && i.length && ("undefined" == typeof video_background || e.isEmptyObject(s) || (new video_background(i, s), i.addClass("video-loaded")))
            })
        },
        checkSlickVideos: function(a) {
            var i = this,
                n = e(a.sliderObject),
                o = a.currentSlideNumber,
                s = e(n[o]),
                r = a.previousSlideNumber;
            if (e(n[r]).is("[data-video-slide]") && i.videoBackArr[r] && i.videoBackArr[r].isPlaying() && (i.videoBackArr[r].pause(), i.videoAutoplay[r] = !0), s.is("[data-video-slide]")) {
                var l = s.find(".zn-videoBg"),
                    d = l.hasClass("video-loaded"),
                    c = l.is("[data-video-setup]") && t(l.attr("data-video-setup")) ? JSON.parse(l.attr("data-video-setup")) : {};
                if (!d && l.length && ("undefined" == typeof video_background || e.isEmptyObject(c) || (i.videoBackArr[o] = new video_background(l, c), l.addClass("video-loaded")), i.videoAutoplay[o] = !0 === c.autoplay), i.videoBackArr[o]) {
                    if (!i.videoAutoplay[o]) return;
                    i.videoBackArr[o].play()
                }
            }
        },
        enable_slick_carousel: function(a) {
            var i = this,
                n = a.find(".js-slick, .js-ios-slick");
            n.length && void 0 !== e.fn.slick && n.each(function(a, n) {
                function o(t, a, i) {
                    var n = e(a.$slider).closest(".kl-slideshow"),
                        o = e(a.$slides[i]).attr("data-color");
                    void 0 !== c.appendFancy && "" !== c.appendFancy && (n = e(c.appendFancy)), n.css({
                        backgroundColor: o
                    })
                }

                function s(t) {
                    e(c.activeIndex).attr("data-active-slide", t)
                }

                function r(e, t) {
                    var a = {
                        sliderObject: e.$slides,
                        currentSlideNumber: t,
                        previousSlideNumber: p
                    };
                    p = t, i.checkSlickVideos(a)
                }

                function l(t) {
                    e(t.$slider).addClass("slickSlider--activated"), setTimeout(function() {
                        e(t.$slider).removeClass("slickSlider--activated")
                    }, 2 * parseInt(t.defaults.autoplaySpeed) - 500)
                }
                var d = e(n),
                    c = t(d.attr("data-slick")) ? JSON.parse(d.attr("data-slick")) : {};
                d.imagesLoaded(function() {
                    d.slick({
                        prevArrow: '<span class="znSlickNav-arr znSlickNav-prev"><svg viewBox="0 0 256 256"><polyline fill="none" stroke="black" stroke-width="16" stroke-linejoin="round" stroke-linecap="round" points="184,16 72,128 184,240"></polyline></svg></span>',
                        nextArrow: '<span class="znSlickNav-arr znSlickNav-next"><svg viewBox="0 0 256 256"><polyline fill="none" stroke="black" stroke-width="16" stroke-linejoin="round" stroke-linecap="round" points="72,16 184,128 72,240"></polyline></svg></span>',
                        customPaging: function(t, a) {
                            return e('<button type="button" class="slickBtn" data-role="none" role="button" tabindex="0" />').text(a + 1)
                        },
                        rtl: !(!e("html").is("[dir]") || "rtl" != e("html").attr("dir"))
                    })
                }), void 0 !== c.loadingContainer && d.on("init", function(e, t) {
                    d.closest(c.loadingContainer).addClass("is-initialised")
                }), void 0 !== c.thumbs && c.thumbs && d.on("init", function(t, a) {
                    e(c.appendDots).find("li").each(function(t, i) {
                        var n = a.$slides[t],
                            o = e(n).attr("data-thumb");
                        e(i).children("button").attr("style", "background-image:url(" + o + ")")
                    })
                });
                var f = void 0 !== c.fancy && c.fancy,
                    u = void 0 !== c.activeIndex && "" !== c.activeIndex,
                    p = 0;
                d.on("init", function(t, a) {
                    l(a), e(a.$slides[0]).addClass("slick-item--activated"), f && o(t, a, 0), u && s(0), r(a, 0), i.checkVideosVolume({
                        slider: a.$slider
                    })
                }).on("beforeChange", function(t, a, i, n) {
                    a.$slides.removeClass("slick-item--activated"), f && o(t, a, n), u && s(n), r(a, n), d.hasClass("spp-list") && e(a.$slides[n]).nextAll(".slick-slide").find("img[data-echo]").length && echo.render()
                }).on("afterChange", function(t, a, n, o) {
                    l(a);
                    var s = i[c.afterChangeCallback];
                    "function" == typeof s && s(t, a, n, o), e(a.$slides[n]).addClass("slick-item--activated")
                })
            })
        },
        laptopSliderChangeCallback: function(t, a, i, n) {
            var o = e(t.currentTarget),
                s = o.closest(".ls__container"),
                r = s.find(".ls_slide_item-details");
            r.removeClass("znlp-is-active"), r.eq(i).addClass("znlp-is-active")
        },
        enable_circular_carousel: function(t) {
            var a = t.find(".ca-container"),
                i = a.children(".ca-wrapper");
            i && i.length > 0 && e.each(i, function(t, a) {
                var i = e(a),
                    n = !1;
                i.find(".js-ca-more, .js-ca-close").on("click", function(t) {
                    t.preventDefault();
                    var a = e(this).hasClass("ca-item") ? e(this) : e(this).closest(".ca-item"),
                        o = e(this).hasClass("js-ca-close");
                    if (n) n && o && (i.slick("slickPlay"), i.closest(".ca-container").removeClass("ca--is-rolling"), a.removeClass("ca--opened"), a.css({
                        "-webkit-transform": "translateX(0)",
                        "-ms-transform": "translateX(0)",
                        transform: "translateX(0)"
                    }), n = !1, t.stopPropagation());
                    else {
                        i.slick("slickPause"), i.closest(".ca-container").addClass("ca--is-rolling"), a.addClass("ca--opened");
                        var s = i.find(".ca-item.slick-active"),
                            r = s.index(a),
                            l = i.width() / s.length * r;
                        a.css({
                            "-webkit-transform": "translateX(-" + l + "px)",
                            "-ms-transform": "translateX(-" + l + "px)",
                            transform: "translateX(-" + l + "px)"
                        }), n = !0
                    }
                }), i.find(".ca-content-wrapper a").on("click", function(t) {
                    return t.stopPropagation(), /\/\/+/.test(e(this).attr("href"))
                })
            })
        },
        enable_flickr_feed: function(t) {
            var a = t.find(".flickr_feeds");
            a && a.length && e.each(a, function(t, a) {
                var i = e(a),
                    n = i.attr("data-limit") ? i.attr("data-limit") : 6,
                    o = i.attr("data-fid");
                void 0 !== e.fn.jflickrfeed && i.jflickrfeed({
                    limit: n,
                    qstrings: {
                        id: o
                    },
                    itemTemplate: '<li class="flickrfeed-item"><a href="{{image_b}}" class="flickrfeed-link hoverBorder" data-lightbox="image"><img src="{{image_s}}" alt="{{title}}" class="flickrfeed-img" /></a></li>'
                }, function(e) {
                    i.find(" a[data-lightbox='image']").magnificPopup({
                        type: "image",
                        tLoading: ""
                    }), i.parent().removeClass("loading")
                })
            })
        },
        enable_icarousel: function(t) {
            var a = t.find(".th-icarousel");
            a && a.length && e.each(a, function(t, a) {
                var i = e(a),
                    n = {
                        easing: "easeInOutQuint",
                        pauseOnHover: !0,
                        timerPadding: 0,
                        timerStroke: 4,
                        timerBarStroke: 0,
                        animationSpeed: 700,
                        nextLabel: "",
                        previousLabel: "",
                        autoPlay: !i.is("[data-autoplay]") || i.data("autoplay"),
                        slides: i.is("[data-slides]") ? i.data("slides") : 7,
                        pauseTime: i.is("[data-timeout]") ? i.data("timeout") : 5e3,
                        perspective: i.is("[data-perspective]") ? i.data("perspective") : 75,
                        slidesSpace: i.is("[data-slidespaces]") ? i.data("slidespaces") : 300,
                        direction: i.is("[data-direction]") ? i.data("direction") : "ltr",
                        timer: i.is("[data-timer]") ? i.data("timer") : "Bar",
                        timerOpacity: i.is("[data-timeropc]") ? i.data("timeropc") : .4,
                        timerDiameter: i.is("[data-timerdim]") ? i.data("timerdim") : 220,
                        keyboardNav: !i.is("[data-keyboard]") || i.data("keyboard"),
                        mouseWheel: !i.is("[data-mousewheel]") || i.data("mousewheel"),
                        timerColor: i.is("[data-timercolor]") ? i.data("timercolor") : "#FFF",
                        timerPosition: i.is("[data-timerpos]") ? i.data("timerpos") : "bottom-center",
                        timerX: i.is("[data-timeroffx]") ? i.data("timeroffx") : 0,
                        timerY: i.is("[data-timeroffy]") ? i.data("timeroffy") : -20
                    };
                void 0 !== e.fn.iCarousel && i.imagesLoaded(function() {
                    i.iCarousel(n)
                })
            })
        },
        enable_iconbox: function(t) {
            var a = t.find(".kl-iconbox[data-stageid]");
            a && a.length && e.each(a, function(t, a) {
                var i = e(a),
                    n = i.attr("data-stageid"),
                    o = i[0].getAttribute("data-pointtitle"),
                    s = i.is("[data-point-number]") ? 'data-nr="' + i.attr("data-point-number") + '"' : "",
                    r = i.attr("data-pointx"),
                    l = i.attr("data-pointy"),
                    d = e(".stage-ibx--src-ibx." + n),
                    c = i.attr("data-unit") || "px";
                if (n && r && l) {
                    var f = e('<span style="top:' + l + c + "; left: " + r + c + ';" class="stage-ibx__point" ' + s + "></span>");
                    o && f[0].setAttribute("data-title", o), d.find(".stage-ibx__stage").append(f), setTimeout(function() {
                        f.css("opacity", 1)
                    }, 300 * t), i.on("mouseover", f, function() {
                        f.addClass("is-hover")
                    }), i.on("mouseout", f, function() {
                        f.removeClass("is-hover")
                    })
                }
            })
        },
        enable_searchbox: function(t) {
            var a = t.find(".elm-searchbox--eff-typing");
            a && a.length && e.each(a, function(t, a) {
                e(a).find(".elm-searchbox__input").on("focus", function(t) {
                    e(this).addClass("is-focused")
                }).on("keyup", function(t) {
                    "" !== e(this).val() && e(this).addClass("is-focused")
                }).on("blur", function(t) {
                    "" === e(this).val() && e(this).removeClass("is-focused")
                })
            })
        },
        enable_latest_posts_accordion: function(t) {
            var a = t.find(".css3accordion");
            a && a.length > 0 && a.each(function(t, i) {
                var n = e(i),
                    o = function(e) {
                        e.find(".inner-acc").css("width", e.width() / 2)
                    };
                o(n), e(window).on("debouncedresize", function(e) {
                    o(n)
                });
                var s = a.closest(".tabbable");
                s.length && s.on("shown.bs.tab", function(t) {
                    o(e(t.target).attr("href"))
                })
            })
        },
        enable_portfolio_sortable: function(t) {
            function a() {
                var e = location.hash;
                return !!e && decodeURIComponent(e)
            }
            var i = e(t).find(".ptf-stb-thumbs");
            0 !== i.length && e(i).each(function(t, i) {
                var n, o = e(i),
                    s = o.closest(".kl-ptfsortable"),
                    r = s.find(".ptf-stb-sortby"),
                    l = s.is("[data-sortby]") ? s.attr("data-sortby") : "date",
                    d = s.find(".ptf-stb-direction"),
                    c = !(!s.is("[data-sortdir]") || "asc" != s.attr("data-sortdir")),
                    f = o.is("[data-layout-mode]") ? o.attr("data-layout-mode") : "masonry",
                    u = s.find(".ptf-stb-ptfnav"),
                    p = a();
                if (p) {
                    var m = u.find('a[href="' + p + '"]');
                    n = m.attr("data-filter"), m.parent().siblings("li").removeClass("current"), m.parent().addClass("current")
                } else n = u.find("li.current a").attr("data-filter");
                o.imagesLoaded(function() {
                    o.isotope({
                        itemSelector: ".item",
                        animationOptions: {
                            duration: 250,
                            easing: "easeOutExpo",
                            queue: !1
                        },
                        layoutMode: f,
                        filter: n,
                        sortBy: l,
                        sortAscending: c,
                        getSortData: {
                            name: ".name",
                            date: "[data-date] parseInt"
                        },
                        isInitLayout: !1
                    }), o.isotope("on", "arrangeComplete", function() {
                        o.addClass("isotope-initialized")
                    }), o.isotope()
                }), u.on("click", ".kl-ptfsortable-nav-link", function(t) {
                    var a = e(this);
                    "#" === a.attr("href") && t.preventDefault(), u.children("li").removeClass("current"), a.parent().addClass("current"), o.isotope({
                        filter: a.data("filter")
                    }), o.isotope("updateSortData").isotope()
                });
                var h = r.find("li a");
                h && h.length > 0 && (h.removeClass("selected"), e.each(h, function(t, a) {
                    var i = e(a);
                    i.data("optionValue") == l && i.addClass("selected")
                }), h.on("click", function(t) {
                    t.preventDefault(), h.removeClass("selected"), e(this).addClass("selected"), l = e(this).data("optionValue"), o.isotope({
                        sortBy: e(this).data("optionValue")
                    }), o.isotope("updateSortData").isotope()
                }));
                var g = d.find("li a");
                g && g.length > 0 && (g.removeClass("selected"), e.each(g, function(t, a) {
                    var i = e(a);
                    i.data("option-value") == c && i.addClass("selected")
                }), g.on("click", function(t) {
                    t.preventDefault(), g.removeClass("selected"), e(this).addClass("selected"), o.isotope({
                        sortAscending: e(this).data("option-value"),
                        sortBy: l
                    }), o.isotope("updateSortData").isotope()
                }))
            })
        },
        enable_gridphotogallery: function(t) {
            var a = t.find(".gridPhotoGallery:not(.stop-isotope)");
            void 0 !== e.fn.isotope && a.each(function(t, a) {
                var i = e(a),
                    n = (Math.floor(e(a).width() / i.attr("data-cols")), i.is("[data-layout]") ? i.attr("data-layout") : "masonry");
                e("body").hasClass("zn_pb_editor_enabled") && "packery" == n && (n = "masonry"), i.imagesLoaded(function() {
                    i.isotope({
                        layoutMode: n,
                        itemSelector: ".gridPhotoGallery__item",
                        layoutType: {
                            columnWidth: ".gridPhotoGallery__item--sizer",
                            gutter: 0
                        },
                        isInitLayout: !1
                    }), i.isotope("on", "arrangeComplete", function() {
                        i.addClass("isotope-initialized")
                    }), i.isotope()
                })
            })
        },
        enable_nivo_slider: function(t) {
            var a = e(".nivoslider .nivoSlider");
            a && a.length && e.each(a, function(t, a) {
                var i = e(a),
                    n = i.attr("data-transition"),
                    o = "1" != i.attr("data-autoslide"),
                    s = i.attr("data-pausetime");
                void 0 !== e.fn.nivoSlider && i.nivoSlider({
                    effect: n,
                    boxCols: 8,
                    boxRows: 4,
                    slices: 15,
                    animSpeed: 500,
                    pauseTime: s,
                    startSlide: 0,
                    directionNav: 1,
                    controlNav: 1,
                    controlNavThumbs: 0,
                    pauseOnHover: 1,
                    manualAdvance: o,
                    afterLoad: function() {
                        setTimeout(function() {
                            i.find(".nivo-caption").animate({
                                left: 20,
                                opacity: 1
                            }, 500, "easeOutQuint")
                        }, 1e3)
                    },
                    beforeChange: function() {
                        i.find(".nivo-caption").animate({
                            left: 120,
                            opacity: 0
                        }, 500, "easeOutQuint")
                    },
                    afterChange: function() {
                        i.find(".nivo-caption").animate({
                            left: 20,
                            opacity: 1
                        }, 500, "easeOutQuint")
                    }
                })
            })
        },
        enable_wow_slider: function(t) {
            var a = t.find(".th-wowslider");
            a && a.length && e.each(a, function(t, a) {
                var i = e(a);
                void 0 !== e.fn.wowSlider && i.wowSlider({
                    effect: i.attr("data-transition"),
                    duration: 900,
                    delay: i.is("[data-timeout]") ? i.attr("data-timeout") : 3e3,
                    width: 1170,
                    height: 470,
                    cols: 6,
                    autoPlay: i.attr("data-autoplay"),
                    stopOnHover: !0,
                    loop: !0,
                    bullets: !0,
                    caption: !0,
                    controls: !0,
                    captionEffect: "slide",
                    logo: "image/loading_light.gif",
                    images: 0,
                    onStep: function() {
                        i.addClass("transitioning"), setTimeout(function() {
                            i.removeClass("transitioning")
                        }, 1400)
                    }
                })
            })
        },
        enable_static_weather: function(t) {
            var a = t.find(".sc__weather");
            a && a.length && e.each(a, function(t, a) {
                var i = e(a),
                    n = i.attr("data-location") ? i.attr("data-location") : "";
                void 0 !== e.simpleWeather && e.simpleWeather({
                    woeid: i.attr("data-woeid"),
                    location: n,
                    unit: i.attr("data-unit"),
                    success: function(e) {
                        html = '<ul class="scw_list clearfix">';
                        var t = e.forecast.length > 5 ? 5 : e.forecast.length;
                        console.log(e);
                        for (var a = 0; a < t; a++) html += '<li><i class="wt-icon wt-icon-' + e.forecast[a].code + '"></i>', html += '<div class="scw__degs">', html += '<span class="scw__high">' + e.forecast[a].high + '&deg;<span class="uppercase">' + e.units.temp + "</span></span>", html += '<span class="scw__low">' + e.forecast[a].low + "</span>", html += "</div>", html += '<span class="scw__day">' + znLocalizeDay(e.forecast[a].day) + "</span>", html += "</li>";
                        html += "</ul>", jQuery(i).html(html)
                    },
                    error: function(e) {
                        jQuery(i).html("<p>" + e + "</p>"), console.warn("Some problems: " + e)
                    }
                })
            })
        },
        enable_diagram: function(e) {
            var t = e.find(".kl-skills-diagram");
            t && t.length && t.each(function(e, t) {
                "undefined" != typeof diagramElement && diagramElement.init(t)
            })
        },
        enable_services: function(t) {
            var a = t.find(".services_box--boxed");
            a && a.length && a.each(function(t, i) {
                var n = e(i),
                    o = function(e) {
                        e.find(".services_box__list").css("padding-top", e.height() + 30)
                    };
                o(n), e(window).on("debouncedresize", function(e) {
                    o(n)
                });
                var s = a.closest(".tabbable");
                s.length && s.on("shown.bs.tab", function(t) {
                    o(e(t.target).attr("href"))
                })
            })
        },
        enable_scrollspy: function(t) {
            var a = this,
                n = location.href.replace(/#.*/, ""),
                o = e("#main-menu, #site-chaser, .elm-custommenu, #zn-res-menu"),
                s = o.find(".main-menu-item > a"),
                r = s.map(function() {
                    var t = (e(this).is("[href]") && e(this).attr("href").replace(n, ""), e(e(this.hash.replace(/([ ;?%&,.+*~\':"!^$[\]()=>|\/@])/g, "\\$1"))));
                    if (t.length) return t
                });
            r.length && e(window).on("scroll", a.helpers.debounce(function() {
                var t = window.pageYOffset || window.scrollTop || 0,
                    a = !1,
                    n = i() - 1,
                    s = 0,
                    l = 0;
                r.each(function(a, i) {
                    var o = Math.max(0, e(i).offset().top + n);
                    o <= t && o >= l && (s = this, l = o)
                });
                var d = s && e(s).length ? s[0].id : "zn_invalid_id";
                if (a !== d && (a = d, o.find('a[href*="#' + d + '"]').length > 0 && "zn_invalid_id" != d)) {
                    var c = e("#main-menu, #site-chaser, .elm-custommenu, #zn-res-menu");
                    e("li.active", c).removeClass("current_page_item current-menu-item active"), e('a[href*="#' + d + '"]', c).parent().addClass("current_page_item current-menu-item active")
                }
            }, 50)).trigger("scroll")
        },
        enable_tooltips: function(e) {
            var t = e.find('[data-toggle="tooltip"], [data-rel="tooltip"]');
            t && t.length > 0 && t.tooltip()
        },
        enable_customMenuDropdown: function(t) {
            var a = t.find(".elm-custommenu--dd");
            a.length && a.each(function() {
                var t = e(this);
                t.find(".elm-custommenu-pick").on("click", function(e) {
                    t.toggleClass("is-opened")
                }), e(document).on("click", function(e) {
                    t.hasClass("is-opened") && t.removeClass("is-opened")
                }), t.on("click", function(e) {
                    e.stopPropagation()
                })
            })
        },
        customMenuElm_toggleSubmenus: function(t) {
            var a = t.find(".elm-custommenu-toggleSubmenus .elm-cmlist");
            a.length && a.find(".menu-item-has-children > a").on("click", function(t) {
                t.preventDefault();
                var a = e(this),
                    i = a.parent(".menu-item-has-children");
                if ($submenu = a.next("ul.sub-menu"), $submenu.is(":visible")) {
                    if ($submenu.is(":animated")) return;
                    $submenu.slideUp({
                        start: function() {
                            i.removeClass("is-active")
                        }
                    })
                } else {
                    if ($submenu.is(":animated")) return;
                    $submenu.slideDown({
                        start: function() {
                            i.addClass("is-active")
                        }
                    })
                }
            })
        },
        general_wc_stuff: function(t) {
            t.find(".prodpage-style2 #reviews .comment-respond .comment-reply-title, .prodpage-style3 #reviews .comment-respond .comment-reply-title").each(function(t, a) {
                e(a).on("click", function() {
                    e(a).toggleClass("opened-form"), e(a).next(".comment-form").toggleClass("show-form")
                })
            })
        },
        init_skill_bars: function(t) {
            var a = this,
                i = e(t).find(".skills_wgt"),
                n = e("li", i);
            if (n && n.length > 0) {
                e.each(i, function(t, i) {
                    var n = e(i),
                        o = !1,
                        s = function() {
                            var t = .2,
                                a = e(".skill-bar", n);
                            e.each(a, function(a, i) {
                                var o = e(i),
                                    s = o.data("loaded"),
                                    r = e(".skill-bar-inner", o);
                                e(n).addClass("started"), t += .1, r.css("-webkit-transition-delay", t + "s"), r.css(" transition-delay: " + t + "s"), r.css("width", s + "%")
                            })
                        };
                    o || (a.helpers.isInViewport(n[0]) && (s(), o = !0), e(window).on("scroll", a.helpers.debounce(function() {
                        a.helpers.isInViewport(n[0]) && (s(), o = !0)
                    }, 500)))
                })
            }
        },
        general_stuff: function(n) {
            "object" == typeof Modernizr && (Modernizr.objectfit || e.each(["cover", "contain"], function(t, a) {
                e("." + a + "-fit-img").each(function() {
                    var t = e(this),
                        i = t.prop("src"),
                        n = t.prop("class");
                    i && t.replaceWith('<div class="' + n + " " + a + '-fit-img-fallback" style="background-image:url(' + i + ');"></div>')
                })
            }));
            var o = n.find(".site-logo-img");
            if (o.length > 0 && o.is("[data-mobile-logo]")) {
                var s = o.attr("src");
                e(window).on("debouncedresize", function() {
                    window.matchMedia("(max-width: 767px)").matches ? o.attr("src", o.attr("data-mobile-logo")) : o.attr("src", s)
                }).trigger("debouncedresize")
            }
            if (n.find(".show-top-hidden-panel > .main-menu-link").on("click", function(t) {
                    t.preventDefault(), e("#sliding_panel").addClass("is-opened")
                }), window.matchMedia("(min-width: 992px)").matches) {
                var r = n.find(".znColumnElement-stickyCol[data-sticky-col]");
                r.length && r.each(function(n, o) {
                    if (!a(g)) {
                        var s = e(o),
                            r = t(s.attr("data-sticky-col")) ? JSON.parse(s.attr("data-sticky-col")) : {},
                            l = a(r.distance) || "" === r.distance ? 100 : r.distance,
                            d = a(r.offset) || "" === r.offset ? 0 : r.offset;
                        d = i(d);
                        var c = new ScrollMagic.Scene({
                            triggerElement: s[0],
                            triggerHook: "onLeave",
                            duration: l,
                            offset: d
                        });
                        c.setPin(s[0]), c.addTo(g), e(window).on("debouncedresize", function() {
                            window.matchMedia("(max-width: 991px)").matches ? c.removePin(!0).enabled(!1) : c.enabled() || c.setPin(s[0]).enabled(!0)
                        })
                    }
                })
            }
        }
    };
    var i = function(t) {
            var a = t || 0;
            return e(".chaser").length > 0 && (a -= e(".chaser").outerHeight()), e("#header.header--sticky").length > 0 && (a -= e("#header.header--is-sticked").outerHeight()), e("#header.header--fixed").length > 0 && (a -= e("#header.header--fixed").outerHeight()), void 0 !== ZnThemeAjax.top_offset_tolerance && "" != ZnThemeAjax.top_offset_tolerance && (a = parseFloat(ZnThemeAjax.top_offset_tolerance)), e("#wpadminbar").length > 0 && (a -= e("#wpadminbar").outerHeight()), a
        },
        n = (Date.now, e(window), e("body")),
        o = "object" == typeof Modernizr && Modernizr.touchevents || !1,
        s = o && window.matchMedia("(max-width: 1024px)").matches,
        r = navigator.userAgent,
        l = (/^Mac/.test(navigator.platform), -1 !== r.indexOf("IEMobile")),
        d = -1 !== r.indexOf("Firefox"),
        c = /^((?!chrome|android).)*safari/i.test(r),
        f = (!r.match(/Trident/) || r.match(/MSIE/), !(!r.match(/Trident/) || !r.match(/rv[ :]11/))),
        u = navigator.userAgent.match("MSIE 10"),
        p = navigator.userAgent.match("MSIE 9"),
        m = /Edge\/12./i.test(r),
        h = !a(e.ZnPbFactory);
    m && n.addClass("is-edge"), f && n.addClass("is-ie11"), c && n.addClass("is-safari");
    var g = "undefined" != typeof ScrollMagic ? new ScrollMagic.Controller : void 0;
    e(window).on("load", function() {
        var t = e("#page-loading");
        if (t.length > 0 && setTimeout(function() {
                t.fadeOut("slow", function() {
                    t.remove()
                })
            }, void 0 !== window.preloaderDelay ? window.preloaderDelay : 0), d && window.location.hash.length > 0) {
            var a = e(window.location.hash).offset();
            void 0 !== a && e("body,html").animate({
                scrollTop: i(a.top)
            }, 600, "easeOutCubic")
        }
    }), e(document).ready(function() {
        function t(e) {
            return e.offset().top + i()
        }

        function n(a) {
            var i = t(a),
                o = e.themejs.isHeaderStick;
            Math.round(jQuery("html,body").scrollTop()) !== Math.round(i) && e("html,body").stop().animate({
                scrollTop: i
            }, {
                duration: 1e3,
                easing: "easeOutCubic",
                step: function() {
                    o != e.themejs.isHeaderStick && (o = e.themejs.isHeaderStick, n(a))
                }
            })
        }
        e.themejs = new e.ZnThemeJs, s && e('a[href="#"]').on("click", function(e) {
                e.preventDefault()
            }), e("body").bind("added_to_cart", function(t, i) {
                if (!a(i.zn_added_to_cart) && i.zn_added_to_cart.length > 0) {
                    var n = e(i.zn_added_to_cart);
                    e("body").append(n), setTimeout(function() {
                        e(n).fadeOut("fast", "easeInOutExpo", function() {
                            e(this).remove()
                        })
                    }, 3e3), e(n).fadeIn("slow", "easeInOutExpo", function() {
                        n.find(".kl-addedtocart-close").click(function(t) {
                            t.preventDefault(), e(n).fadeOut("fast", "easeInOutExpo", function() {
                                e(this).remove()
                            })
                        })
                    })
                }
            }), window.didScroll = !1, e(window).on("scroll", function() {
                if (!window.didScroll) {
                    var t = e(".kl-sticky-header #sliding_panel");
                    t.hasClass("is-opened") && (t.removeClass("is-opened"), e("#open_sliding_panel").removeClass("is-toggled")), window.didScroll = !0
                }
            }), e(".zn_form_login").each(function(t, a) {
                e(a).on("submit1", function(t) {
                    t.preventDefault();
                    var a = e(this),
                        i = !1,
                        n = e(".zn_sub_button", this),
                        o = a.serialize(),
                        s = a.hasClass("znhg-ajax-login-form");
                    if (n.addClass("zn_blocked"), e("input", a).each(function(t, a) {
                            var n = e(a);
                            n.val() ? n.parent(".form-group").removeClass("fg-input-invalid") : (i = !0, n.parent(".form-group").addClass("fg-input-invalid"))
                        }), i) return n.removeClass("zn_blocked"), !1;
                    e.post(zn_do_login.ajaxurl, o, function(t) {
                        n.removeClass("zn_blocked");
                        var i = e(".zn_form_login-result", a);
                        t.success ? (e('input[type="text"], input[type="password"]', a).val(""), t.data.message && i.html('<div class="zn-notification zn-notification--success">' + t.data.message + "</div>"), i.find(".kl-login-box").length && i.find(".kl-login-box").magnificPopup({
                            type: "inline",
                            closeBtnInside: !0,
                            showCloseBtn: !0,
                            mainClass: "mfp-fade mfp-bg-lighter"
                        }), s && (e.magnificPopup.close(), t.data.redirect_url.length ? window.location = t.data.redirect_url : window.location.reload())) : i.html('<div class="zn-notification zn-notification--error">' + t.data.message + "</div>")
                    })
                })
            }), e(".zn-logoutBtn>a").on("click", function(e) {
                e.preventDefault(), a(ZnThemeAjax.logout_url) || (window.location = ZnThemeAjax.logout_url)
            }), e(".zn_form_lost_pass").on("submit1", function() {
                event.preventDefault();
                var t = e(this),
                    a = !1,
                    i = e(".zn_sub_button", this),
                    n = t.serialize() + "&ajax_login=true";
                if (i.addClass("zn_blocked"), e("input", t).each(function(t, i) {
                        var n = e(i);
                        n.val() ? n.parent(".form-group").removeClass("fg-input-invalid") : (a = !0, n.parent(".form-group").addClass("fg-input-invalid"))
                    }), a) return i.removeClass("zn_blocked"), !1;
                e.ajax({
                    url: t.attr("action"),
                    data: n,
                    type: "POST",
                    cache: !1,
                    success: function(a) {
                        var n, o = e(document.createElement("div")).html(a);
                        if (e("#login_error", o).length) {
                            var s = e("#login_error", o);
                            e(".zn_form_login-result", t).html(s)
                        } else e(".message", o).length ? (n = e(".message", o), e(".zn_form_login-result", t).html(n)) : e(".woocommerce-message", o).length ? (n = e(".woocommerce-message", o), e(".zn_form_login-result", t).html(n)) : e(".woocommerce-error", o).length ? (n = e(".woocommerce-error", o), e(".zn_form_login-result", t).html(n)) : (jQuery.magnificPopup.close(), window.location = e(".zn_login_redirect", t).val());
                        i.removeClass("zn_blocked")
                    },
                    error: function(a, i, n) {
                        e(".zn_form_login-result", t).html(n)
                    }
                })
            }),
            function() {
                if (e.isFunction(e.fn.wc_product_gallery) && "undefined" != typeof wc_single_product_params) {
                    var t = e(".zn-wooGalleryThumbs-summary"),
                        a = t.find(".woocommerce-product-gallery__image"),
                        i = e(".zn-wooSlickGallery--productStyle3").data("flexslider");
                    if (!e.isFunction(e.fn.flexslider) || !wc_single_product_params.flexslider_enabled) {
                        var n = {
                            flexslider_enabled: !1,
                            zoom_enabled: !1,
                            photoswipe_enabled: "undefined" != typeof PhotoSwipe && wc_single_product_params.photoswipe_enabled
                        };
                        t.wc_product_gallery(n)
                    }
                    a.length > 0 && a.on("click", function(t) {
                        if (void 0 !== i) {
                            t.preventDefault(), t.stopPropagation(), a.removeClass("slick-active"), e(this).addClass("slick-active");
                            var n = e(this).index();
                            i.flexAnimate(n + 1)
                        }
                    })
                }
            }();
        var o = e("#search .searchBtn"),
            r = o.next(),
            d = o.parent();
        o && o.length > 0 && (o.on("click", function(t) {
            t.preventDefault();
            var a = e(this),
                i = e("span:first-child", a);
            a.hasClass("active") ? (a.removeClass("active"), i.toggleClass("glyphicon-remove"), r.removeClass("panel-opened")) : (a.addClass("active"), i.toggleClass("glyphicon-remove"), r.addClass("panel-opened"))
        }), d.hasClass("headsearch--def") && e(document).click(function(t) {
            var a = e("#search .searchBtn");
            a.removeClass("active"), a.next().removeClass("panel-opened"), e("span:first-child", a).removeClass("glyphicon-remove").addClass("glyphicon-search")
        }), d.click(function(e) {
            e.stopPropagation()
        }));
        var c = e("#totop");
        c && c.length > 0 && c.on("click", function(t) {
                t.preventDefault(), e("body,html").animate({
                    scrollTop: 0
                }, 600, "easeOutCubic")
            }), e(".js-tonext-btn").on("click", function(t) {
                if (!s) {
                    t.preventDefault();
                    var a = !!e(this).attr("data-endof") && e(this).attr("data-endof"),
                        n = 0;
                    a && (n = e(a).height() + e(a).offset().top), e("html,body").animate({
                        scrollTop: i(n)
                    }, 1e3, "easeOutCubic")
                }
            }), e("body").on("click", "a[data-target='smoothscroll'][href*='#']:not([href='#']), .main-menu a.main-menu-link[href*='#']:not([href='#']), .nav-with-smooth-scroll a[href*='#']:not([href='#']) ", function(t) {
                var a = e(this).attr("href"),
                    i = a.substring(a.indexOf("#"));
                void 0 !== i && -1 != i.indexOf("#") && e(i).length > 0 ? (t.preventDefault(), e(i).length && (n(e(i)), window.history && window.history.pushState && history.pushState("", document.title, i))) : console.log("Not a valid link")
            }),
            function() {
                if ("undefined" != typeof ZnSmoothScroll && !s && !l && !h) {
                    var e = ZnSmoothScroll.type || "no",
                        t = {};
                    switch (t.touchpadSupport = "no" == ZnSmoothScroll.touchpadSupport, e) {
                        case "0.1":
                            t.animationTime = 150, t.stepSize = 70;
                            break;
                        case "0.25":
                            t.animationTime = 300, t.stepSize = 70;
                            break;
                        case "yes":
                            t.animationTime = 500, t.stepSize = 70;
                            break;
                        case "0.75":
                            t.animationTime = 700, t.stepSize = 70;
                            break;
                        case "1":
                            t.animationTime = 1e3, t.stepSize = 50, t.accelerationMax = 1;
                            break;
                        case "1.6":
                            t.animationTime = 2e3, t.stepSize = 68, t.accelerationMax = 1
                    }
                    SmoothScroll(t)
                }
            }(), e(".js-scroll-event").each(function(t, i) {
                var n = e(i),
                    o = n.is("[data-target]") ? n.attr("data-target") : n,
                    s = n.is("[data-visibleclass]") ? n.attr("data-visibleclass") : "is--visible",
                    r = n.is("[data-hiddenclass]") ? n.attr("data-hiddenclass") : "",
                    l = function() {
                        var t = 1,
                            a = n.is("[data-forch]") ? n.attr("data-forch") : "";
                        if (void 0 !== a && "" !== a)
                            if (!isNaN(parseFloat(a)) && isFinite(a)) t = parseInt(a);
                            else {
                                var i = e(a).first();
                                i && i.length > 0 && (t = i.offset().top)
                            }
                        return t
                    };
                if (!a(g)) {
                    new ScrollMagic.Scene({
                        offset: l()
                    }).setClassToggle(e(o)[0], s).addTo(g);
                    if (r) {
                        e(o).addClass(r);
                        new ScrollMagic.Scene({
                            offset: 0,
                            duration: l()
                        }).setClassToggle(e(o)[0], r).addTo(g)
                    }
                }
            }), e.each(e(".portfolio-item-desc-inner-compacted"), function(t, a) {
                var i = e(a),
                    n = i.is("[data-collapse-at]") && i.attr("data-collapse-at") ? i.attr("data-collapse-at") : 150;
                i.outerHeight() < parseInt(n) && i.parent(".portfolio-item-desc").addClass("no-toggle")
            }), window.matchMedia("(min-width: 992px)").matches && e.each(e(".portfolio-item-content.affixcontent"), function(t, n) {
                var o = e(n),
                    s = o.closest(".hg-portfolio-item");
                s.imagesLoaded(function() {
                    if (!a(g)) {
                        var t = s.outerHeight() - o.outerHeight(),
                            n = new ScrollMagic.Scene({
                                triggerElement: s[0],
                                triggerHook: "onLeave",
                                duration: t,
                                offset: i("-30")
                            });
                        n.setPin(o[0]), n.addTo(g), e(window).on("debouncedresize", function() {
                            window.matchMedia("(max-width: 991px)").matches ? n.removePin(!0).enabled(!1) : n.enabled() || n.setPin(o[0]).enabled(!0)
                        })
                    }
                })
            })
    }), e('a[data-toggle="tab"]').on("shown.bs.tab", function(t) {
        localStorage.setItem("znkl_lastTab", e(this).attr("href"));
        var a = e(e(t.target).attr("href"));
        void 0 !== a && (e(window).trigger("zn_tabs_refresh"), a.find(".slick-slider").length && a.find(".slick-slider").slick("setPosition"), a.find(".isotope-initialized").length && a.find(".isotope-initialized").isotope("layout"))
    }), e(document).on("shown.bs.collapse hidden.bs.collapse", ".collapse", function(t) {
        if (t.stopPropagation(), "shown" == t.type) {
            var a = e(e(t.target));
            void 0 !== a && (a.find(".slick-slider").length && a.find(".slick-slider").slick("setPosition"), a.find(".isotope-initialized").length && a.find(".isotope-initialized").isotope("layout"), e(window).trigger("zn_tabs_refresh"))
        }
    });
    var v = function(t) {
        this.sparkles_container = e(t), this.s = ["shiny-spark1", "shiny-spark2", "shiny-spark3", "shiny-spark4", "shiny-spark5", "shiny-spark6"], this.i = this.s[this.random(this.s.length)], this.n = document.createElement("span"), this.newSpeed().newPoint().display().newPoint().fly()
    };
    v.prototype.display = function() {
        return e(this.n).attr("class", this.i).css("z-index", this.random(3)).css("top", this.pointY).css("left", this.pointX), this.sparkles_container.append(this.n), this
    }, v.prototype.fly = function() {
        var t = this;
        e(this.n).animate({
            top: this.pointY,
            left: this.pointX
        }, this.speed, "linear", function() {
            t.newSpeed().newPoint().fly()
        })
    }, v.prototype.newSpeed = function() {
        return this.speed = 1100 * (this.random(10) + 5), this
    }, v.prototype.newPoint = function() {
        var e = this.sparkles_container,
            t = e.closest(".kl-slideshow"),
            a = e.closest(".page-subheader");
        return t.length > 0 ? e = t : a.length > 0 && (e = a), this.pointX = this.random(e.width()), this.pointY = this.random(e.height()), this
    }, v.prototype.random = function(e) {
        return Math.ceil(Math.random() * e) - 1
    }
}(jQuery);
var klRecaptchaLoaded = !1,
    kallyasOnloadCallback = function() {
        klRecaptchaLoaded || (klRecaptchaLoaded = !0, jQuery(".kl-recaptcha").each(function() {
            grecaptcha.render(jQuery(this).attr("id"), {
                sitekey: jQuery(this).data("sitekey"),
                theme: jQuery(this).data("colorscheme")
            })
        }))
    };
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")), document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
}