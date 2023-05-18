/*! animsition */
!(function (t) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], t)
    : "object" == typeof exports
    ? (module.exports = t(require("jquery")))
    : t(jQuery);
})(function (t) {
  "use strict";
  var n = "animsition",
    i = {
      init: function (a) {
        (a = t.extend(
          {
            inClass: "fade-in",
            outClass: "fade-out",
            inDuration: 1500,
            outDuration: 800,
            linkElement: ".animsition-link",
            loading: !0,
            loadingParentElement: "body",
            loadingClass: "animsition-loading",
            loadingInner: "",
            timeout: !1,
            timeoutCountdown: 5e3,
            onLoadEvent: !0,
            browser: ["animation-duration", "-webkit-animation-duration"],
            overlay: !1,
            overlayClass: "animsition-overlay-slide",
            overlayParentElement: "body",
            transition: function (t) {
              window.location.href = t;
            },
          },
          a
        )),
          (i.settings = {
            timer: !1,
            data: {
              inClass: "animsition-in-class",
              inDuration: "animsition-in-duration",
              outClass: "animsition-out-class",
              outDuration: "animsition-out-duration",
              overlay: "animsition-overlay",
            },
            events: {
              inStart: "animsition.inStart",
              inEnd: "animsition.inEnd",
              outStart: "animsition.outStart",
              outEnd: "animsition.outEnd",
            },
          });
        var o = i.supportCheck.call(this, a);
        return o || !(a.browser.length > 0) || (o && this.length)
          ? (i.optionCheck.call(this, a) &&
              t("." + a.overlayClass).length <= 0 &&
              i.addOverlay.call(this, a),
            a.loading &&
              t("." + a.loadingClass).length <= 0 &&
              i.addLoading.call(this, a),
            this.each(function () {
              var o = this,
                e = t(this),
                s = t(window),
                l = t(document);
              e.data(n) ||
                ((a = t.extend({}, a)),
                e.data(n, { options: a }),
                a.timeout && i.addTimer.call(o),
                a.onLoadEvent &&
                  s.on("load." + n, function () {
                    i.settings.timer && clearTimeout(i.settings.timer),
                      i.in.call(o);
                  }),
                s.on("pageshow." + n, function (t) {
                  t.originalEvent.persisted && i.in.call(o);
                }),
                s.on("unload." + n, function () {}),
                l.on("click." + n, a.linkElement, function (n) {
                  n.preventDefault();
                  var a = t(this),
                    e = a.attr("href");
                  2 === n.which ||
                  n.metaKey ||
                  n.shiftKey ||
                  (-1 !== navigator.platform.toUpperCase().indexOf("WIN") &&
                    n.ctrlKey)
                    ? window.open(e, "_blank")
                    : i.out.call(o, a, e);
                }));
            }))
          : ("console" in window ||
              ((window.console = {}),
              (window.console.log = function (t) {
                return t;
              })),
            this.length ||
              console.log("Animsition: Element does not exist on page."),
            o || console.log("Animsition: Does not support this browser."),
            i.destroy.call(this));
      },
      addOverlay: function (n) {
        t(n.overlayParentElement).prepend(
          '<div class="' + n.overlayClass + '"></div>'
        );
      },
      addLoading: function (n) {
        t(n.loadingParentElement).append(
          '<div class="' + n.loadingClass + '">' + n.loadingInner + "</div>"
        );
      },
      removeLoading: function () {
        var i = t(this).data(n).options;
        t(i.loadingParentElement)
          .children("." + i.loadingClass)
          .fadeOut()
          .remove();
      },
      addTimer: function () {
        var a = this,
          o = t(this).data(n).options;
        i.settings.timer = setTimeout(function () {
          i.in.call(a), t(window).off("load." + n);
        }, o.timeoutCountdown);
      },
      supportCheck: function (n) {
        var i = t(this),
          a = n.browser,
          o = a.length,
          e = !1;
        0 === o && (e = !0);
        for (var s = 0; s < o; s++)
          if ("string" == typeof i.css(a[s])) {
            e = !0;
            break;
          }
        return e;
      },
      optionCheck: function (n) {
        var a = t(this);
        return !(!n.overlay && !a.data(i.settings.data.overlay));
      },
      animationCheck: function (i, a, o) {
        var e = t(this).data(n).options,
          s = typeof i,
          l = !a && "number" === s,
          r = a && "string" === s && i.length > 0;
        return (
          l || r
            ? (i = i)
            : a && o
            ? (i = e.inClass)
            : !a && o
            ? (i = e.inDuration)
            : a && !o
            ? (i = e.outClass)
            : a || o || (i = e.outDuration),
          i
        );
      },
      in: function () {
        var a = this,
          o = t(this),
          e = o.data(n).options,
          s = o.data(i.settings.data.inDuration),
          l = o.data(i.settings.data.inClass),
          r = i.animationCheck.call(a, s, !1, !0),
          d = i.animationCheck.call(a, l, !0, !0),
          u = i.optionCheck.call(a, e),
          c = o.data(n).outClass;
        e.loading && i.removeLoading.call(a),
          c && o.removeClass(c),
          u ? i.inOverlay.call(a, d, r) : i.inDefault.call(a, d, r);
      },
      inDefault: function (n, a) {
        var o = t(this);
        o.css({ "animation-duration": a + "ms" })
          .addClass(n)
          .trigger(i.settings.events.inStart)
          .animateCallback(function () {
            o.removeClass(n)
              .css({ opacity: 1 })
              .trigger(i.settings.events.inEnd);
          });
      },
      inOverlay: function (a, o) {
        var e = t(this),
          s = e.data(n).options;
        e.css({ opacity: 1 }).trigger(i.settings.events.inStart),
          t(s.overlayParentElement)
            .children("." + s.overlayClass)
            .css({ "animation-duration": o + "ms" })
            .addClass(a)
            .animateCallback(function () {
              e.trigger(i.settings.events.inEnd);
            });
      },
      out: function (a, o) {
        var e = this,
          s = t(this),
          l = s.data(n).options,
          r = a.data(i.settings.data.outClass),
          d = s.data(i.settings.data.outClass),
          u = a.data(i.settings.data.outDuration),
          c = s.data(i.settings.data.outDuration),
          m = r || d,
          g = u || c,
          f = i.animationCheck.call(e, m, !0, !1),
          h = i.animationCheck.call(e, g, !1, !1),
          v = i.optionCheck.call(e, l);
        (s.data(n).outClass = f),
          v ? i.outOverlay.call(e, f, h, o) : i.outDefault.call(e, f, h, o);
      },
      outDefault: function (a, o, e) {
        var s = t(this),
          l = s.data(n).options;
        s.css({ "animation-duration": o + 1 + "ms" })
          .addClass(a)
          .trigger(i.settings.events.outStart)
          .animateCallback(function () {
            s.trigger(i.settings.events.outEnd), l.transition(e);
          });
      },
      outOverlay: function (a, o, e) {
        var s = t(this),
          l = s.data(n).options,
          r = s.data(i.settings.data.inClass),
          d = i.animationCheck.call(this, r, !0, !0);
        t(l.overlayParentElement)
          .children("." + l.overlayClass)
          .css({ "animation-duration": o + 1 + "ms" })
          .removeClass(d)
          .addClass(a)
          .trigger(i.settings.events.outStart)
          .animateCallback(function () {
            s.trigger(i.settings.events.outEnd), l.transition(e);
          });
      },
      destroy: function () {
        return this.each(function () {
          var i = t(this);
          t(window).off("." + n), i.css({ opacity: 1 }).removeData(n);
        });
      },
    };
  (t.fn.animateCallback = function (n) {
    var i = "animationend webkitAnimationEnd";
    return this.each(function () {
      var a = t(this);
      a.on(i, function () {
        return a.off(i), n.call(this);
      });
    });
  }),
    (t.fn.animsition = function (a) {
      return i[a]
        ? i[a].apply(this, Array.prototype.slice.call(arguments, 1))
        : "object" != typeof a && a
        ? void t.error("Method " + a + " does not exist on jQuery." + n)
        : i.init.apply(this, arguments);
    });
});
/*! Retina */
!(function () {
  function a() {}
  function b(a) {
    return f.retinaImageSuffix + a;
  }
  function c(a, c) {
    if (((this.path = a || ""), "undefined" != typeof c && null !== c))
      (this.at_2x_path = c), (this.perform_check = !1);
    else {
      if (void 0 !== document.createElement) {
        var d = document.createElement("a");
        (d.href = this.path),
          (d.pathname = d.pathname.replace(g, b)),
          (this.at_2x_path = d.href);
      } else {
        var e = this.path.split("?");
        (e[0] = e[0].replace(g, b)), (this.at_2x_path = e.join("?"));
      }
      this.perform_check = !0;
    }
  }
  function d(a) {
    (this.el = a),
      (this.path = new c(
        this.el.getAttribute("src"),
        this.el.getAttribute("data-at2x")
      ));
    var b = this;
    this.path.check_2x_variant(function (a) {
      a && b.swap();
    });
  }
  var e = "undefined" == typeof exports ? window : exports,
    f = {
      retinaImageSuffix: "@2x",
      check_mime_type: !0,
      force_original_dimensions: !0,
    };
  (e.Retina = a),
    (a.configure = function (a) {
      null === a && (a = {});
      for (var b in a) a.hasOwnProperty(b) && (f[b] = a[b]);
    }),
    (a.init = function (a) {
      null === a && (a = e);
      var b = a.onload || function () {};
      a.onload = function () {
        var a,
          c,
          e = document.getElementsByTagName("img"),
          f = [];
        for (a = 0; a < e.length; a += 1)
          (c = e[a]), c.getAttributeNode("data-no-retina") || f.push(new d(c));
        b();
      };
    }),
    (a.isRetina = function () {
      var a =
        "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
      return e.devicePixelRatio > 1
        ? !0
        : e.matchMedia && e.matchMedia(a).matches
        ? !0
        : !1;
    });
  var g = /\.\w+$/;
  (e.RetinaImagePath = c),
    (c.confirmed_paths = []),
    (c.prototype.is_external = function () {
      return !(
        !this.path.match(/^https?\:/i) ||
        this.path.match("//" + document.domain)
      );
    }),
    (c.prototype.check_2x_variant = function (a) {
      var b,
        d = this;
      return this.is_external()
        ? a(!1)
        : this.perform_check ||
          "undefined" == typeof this.at_2x_path ||
          null === this.at_2x_path
        ? this.at_2x_path in c.confirmed_paths
          ? a(!0)
          : ((b = new XMLHttpRequest()),
            b.open("HEAD", this.at_2x_path),
            (b.onreadystatechange = function () {
              if (4 !== b.readyState) return a(!1);
              if (b.status >= 200 && b.status <= 399) {
                if (f.check_mime_type) {
                  var e = b.getResponseHeader("Content-Type");
                  if (null === e || !e.match(/^image/i)) return a(!1);
                }
                return c.confirmed_paths.push(d.at_2x_path), a(!0);
              }
              return a(!1);
            }),
            b.send(),
            void 0)
        : a(!0);
    }),
    (e.RetinaImage = d),
    (d.prototype.swap = function (a) {
      function b() {
        c.el.complete
          ? (f.force_original_dimensions &&
              (c.el.setAttribute("width", c.el.offsetWidth),
              c.el.setAttribute("height", c.el.offsetHeight)),
            c.el.setAttribute("src", a))
          : setTimeout(b, 5);
      }
      "undefined" == typeof a && (a = this.path.at_2x_path);
      var c = this;
      b();
    }),
    a.isRetina() && a.init(e);
})(); /*! TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin */
var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  var t, e, i, s, r, n, a, o, l, h, _, u, f, c, p, d;
  _gsScope._gsDefine(
    "TweenMax",
    ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function (t, e, i) {
      var s = function (t) {
          var e,
            i = [],
            s = t.length;
          for (e = 0; e !== s; i.push(t[e++]));
          return i;
        },
        r = function (t, e, i) {
          var s,
            r,
            n = t.cycle;
          for (s in n)
            (r = n[s]),
              (t[s] = "function" == typeof r ? r(i, e[i]) : r[i % r.length]);
          delete t.cycle;
        },
        n = function (t, e, s) {
          i.call(this, t, e, s),
            (this._cycle = 0),
            (this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            this._repeat && this._uncache(!0),
            (this.render = n.prototype.render);
        },
        a = 1e-10,
        o = i._internals,
        l = o.isSelector,
        h = o.isArray,
        _ = (n.prototype = i.to({}, 0.1, {})),
        u = [];
      (n.version = "1.20.3"),
        (_.constructor = n),
        (_.kill()._gc = !1),
        (n.killTweensOf = n.killDelayedCallsTo = i.killTweensOf),
        (n.getTweensOf = i.getTweensOf),
        (n.lagSmoothing = i.lagSmoothing),
        (n.ticker = i.ticker),
        (n.render = i.render),
        (_.invalidate = function () {
          return (
            (this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            (this._yoyoEase = null),
            this._uncache(!0),
            i.prototype.invalidate.call(this)
          );
        }),
        (_.updateTo = function (t, e) {
          var s,
            r = this.ratio,
            n = this.vars.immediateRender || t.immediateRender;
          e &&
            this._startTime < this._timeline._time &&
            ((this._startTime = this._timeline._time),
            this._uncache(!1),
            this._gc
              ? this._enabled(!0, !1)
              : this._timeline.insert(this, this._startTime - this._delay));
          for (s in t) this.vars[s] = t[s];
          if (this._initted || n)
            if (e) (this._initted = !1), n && this.render(0, !0, !0);
            else if (
              (this._gc && this._enabled(!0, !1),
              this._notifyPluginsOfEnabled &&
                this._firstPT &&
                i._onPluginEvent("_onDisable", this),
              this._time / this._duration > 0.998)
            ) {
              var a = this._totalTime;
              this.render(0, !0, !1),
                (this._initted = !1),
                this.render(a, !0, !1);
            } else if (
              ((this._initted = !1), this._init(), this._time > 0 || n)
            )
              for (var o, l = 1 / (1 - r), h = this._firstPT; h; )
                (o = h.s + h.c), (h.c *= l), (h.s = o - h.c), (h = h._next);
          return this;
        }),
        (_.render = function (t, e, s) {
          this._initted ||
            (0 === this._duration && this.vars.repeat && this.invalidate());
          var r,
            n,
            l,
            h,
            _,
            u,
            f,
            c,
            p,
            d = this._dirty ? this.totalDuration() : this._totalDuration,
            m = this._time,
            g = this._totalTime,
            y = this._cycle,
            v = this._duration,
            T = this._rawPrevTime;
          if (
            (t >= d - 1e-7 && t >= 0
              ? ((this._totalTime = d),
                (this._cycle = this._repeat),
                this._yoyo && 0 != (1 & this._cycle)
                  ? ((this._time = 0),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(0)
                      : 0))
                  : ((this._time = v),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(1)
                      : 1)),
                this._reversed ||
                  ((r = !0),
                  (n = "onComplete"),
                  (s = s || this._timeline.autoRemoveChildren)),
                0 === v &&
                  (this._initted || !this.vars.lazy || s) &&
                  (this._startTime === this._timeline._duration && (t = 0),
                  (0 > T ||
                    (0 >= t && t >= -1e-7) ||
                    (T === a && "isPause" !== this.data)) &&
                    T !== t &&
                    ((s = !0), T > a && (n = "onReverseComplete")),
                  (this._rawPrevTime = c = !e || t || T === t ? t : a)))
              : 1e-7 > t
              ? ((this._totalTime = this._time = this._cycle = 0),
                (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
                (0 !== g || (0 === v && T > 0)) &&
                  ((n = "onReverseComplete"), (r = this._reversed)),
                0 > t &&
                  ((this._active = !1),
                  0 === v &&
                    (this._initted || !this.vars.lazy || s) &&
                    (T >= 0 && (s = !0),
                    (this._rawPrevTime = c = !e || t || T === t ? t : a))),
                this._initted || (s = !0))
              : ((this._totalTime = this._time = t),
                0 !== this._repeat &&
                  ((h = v + this._repeatDelay),
                  (this._cycle = (this._totalTime / h) >> 0),
                  0 !== this._cycle &&
                    this._cycle === this._totalTime / h &&
                    t >= g &&
                    this._cycle--,
                  (this._time = this._totalTime - this._cycle * h),
                  this._yoyo &&
                    0 != (1 & this._cycle) &&
                    ((this._time = v - this._time),
                    (p = this._yoyoEase || this.vars.yoyoEase) &&
                      (this._yoyoEase ||
                        (!0 !== p || this._initted
                          ? (this._yoyoEase = p =
                              !0 === p
                                ? this._ease
                                : p instanceof Ease
                                ? p
                                : Ease.map[p])
                          : ((p = this.vars.ease),
                            (this._yoyoEase = p =
                              p
                                ? p instanceof Ease
                                  ? p
                                  : "function" == typeof p
                                  ? new Ease(p, this.vars.easeParams)
                                  : Ease.map[p] || i.defaultEase
                                : i.defaultEase))),
                      (this.ratio = p
                        ? 1 - p.getRatio((v - this._time) / v)
                        : 0))),
                  this._time > v
                    ? (this._time = v)
                    : this._time < 0 && (this._time = 0)),
                this._easeType && !p
                  ? ((_ = this._time / v),
                    (u = this._easeType),
                    (f = this._easePower),
                    (1 === u || (3 === u && _ >= 0.5)) && (_ = 1 - _),
                    3 === u && (_ *= 2),
                    1 === f
                      ? (_ *= _)
                      : 2 === f
                      ? (_ *= _ * _)
                      : 3 === f
                      ? (_ *= _ * _ * _)
                      : 4 === f && (_ *= _ * _ * _ * _),
                    1 === u
                      ? (this.ratio = 1 - _)
                      : 2 === u
                      ? (this.ratio = _)
                      : this._time / v < 0.5
                      ? (this.ratio = _ / 2)
                      : (this.ratio = 1 - _ / 2))
                  : p || (this.ratio = this._ease.getRatio(this._time / v))),
            m !== this._time || s || y !== this._cycle)
          ) {
            if (!this._initted) {
              if ((this._init(), !this._initted || this._gc)) return;
              if (
                !s &&
                this._firstPT &&
                ((!1 !== this.vars.lazy && this._duration) ||
                  (this.vars.lazy && !this._duration))
              )
                return (
                  (this._time = m),
                  (this._totalTime = g),
                  (this._rawPrevTime = T),
                  (this._cycle = y),
                  o.lazyTweens.push(this),
                  void (this._lazy = [t, e])
                );
              !this._time || r || p
                ? r &&
                  this._ease._calcEnd &&
                  !p &&
                  (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                : (this.ratio = this._ease.getRatio(this._time / v));
            }
            for (
              !1 !== this._lazy && (this._lazy = !1),
                this._active ||
                  (!this._paused &&
                    this._time !== m &&
                    t >= 0 &&
                    (this._active = !0)),
                0 === g &&
                  (2 === this._initted && t > 0 && this._init(),
                  this._startAt &&
                    (t >= 0
                      ? this._startAt.render(t, !0, s)
                      : n || (n = "_dummyGS")),
                  this.vars.onStart &&
                    (0 !== this._totalTime || 0 === v) &&
                    (e || this._callback("onStart"))),
                l = this._firstPT;
              l;

            )
              l.f
                ? l.t[l.p](l.c * this.ratio + l.s)
                : (l.t[l.p] = l.c * this.ratio + l.s),
                (l = l._next);
            this._onUpdate &&
              (0 > t &&
                this._startAt &&
                this._startTime &&
                this._startAt.render(t, !0, s),
              e ||
                ((this._totalTime !== g || n) && this._callback("onUpdate"))),
              this._cycle !== y &&
                (e ||
                  this._gc ||
                  (this.vars.onRepeat && this._callback("onRepeat"))),
              n &&
                (!this._gc || s) &&
                (0 > t &&
                  this._startAt &&
                  !this._onUpdate &&
                  this._startTime &&
                  this._startAt.render(t, !0, s),
                r &&
                  (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                  (this._active = !1)),
                !e && this.vars[n] && this._callback(n),
                0 === v &&
                  this._rawPrevTime === a &&
                  c !== a &&
                  (this._rawPrevTime = 0));
          } else
            g !== this._totalTime &&
              this._onUpdate &&
              (e || this._callback("onUpdate"));
        }),
        (n.to = function (t, e, i) {
          return new n(t, e, i);
        }),
        (n.from = function (t, e, i) {
          return (
            (i.runBackwards = !0),
            (i.immediateRender = 0 != i.immediateRender),
            new n(t, e, i)
          );
        }),
        (n.fromTo = function (t, e, i, s) {
          return (
            (s.startAt = i),
            (s.immediateRender =
              0 != s.immediateRender && 0 != i.immediateRender),
            new n(t, e, s)
          );
        }),
        (n.staggerTo = n.allTo =
          function (t, e, a, o, _, f, c) {
            o = o || 0;
            var p,
              d,
              m,
              g,
              y = 0,
              v = [],
              T = function () {
                a.onComplete &&
                  a.onComplete.apply(a.onCompleteScope || this, arguments),
                  _.apply(c || a.callbackScope || this, f || u);
              },
              x = a.cycle,
              b = a.startAt && a.startAt.cycle;
            for (
              h(t) ||
                ("string" == typeof t && (t = i.selector(t) || t),
                l(t) && (t = s(t))),
                t = t || [],
                0 > o && ((t = s(t)).reverse(), (o *= -1)),
                p = t.length - 1,
                m = 0;
              p >= m;
              m++
            ) {
              d = {};
              for (g in a) d[g] = a[g];
              if (
                (x &&
                  (r(d, t, m),
                  null != d.duration && ((e = d.duration), delete d.duration)),
                b)
              ) {
                b = d.startAt = {};
                for (g in a.startAt) b[g] = a.startAt[g];
                r(d.startAt, t, m);
              }
              (d.delay = y + (d.delay || 0)),
                m === p && _ && (d.onComplete = T),
                (v[m] = new n(t[m], e, d)),
                (y += o);
            }
            return v;
          }),
        (n.staggerFrom = n.allFrom =
          function (t, e, i, s, r, a, o) {
            return (
              (i.runBackwards = !0),
              (i.immediateRender = 0 != i.immediateRender),
              n.staggerTo(t, e, i, s, r, a, o)
            );
          }),
        (n.staggerFromTo = n.allFromTo =
          function (t, e, i, s, r, a, o, l) {
            return (
              (s.startAt = i),
              (s.immediateRender =
                0 != s.immediateRender && 0 != i.immediateRender),
              n.staggerTo(t, e, s, r, a, o, l)
            );
          }),
        (n.delayedCall = function (t, e, i, s, r) {
          return new n(e, 0, {
            delay: t,
            onComplete: e,
            onCompleteParams: i,
            callbackScope: s,
            onReverseComplete: e,
            onReverseCompleteParams: i,
            immediateRender: !1,
            useFrames: r,
            overwrite: 0,
          });
        }),
        (n.set = function (t, e) {
          return new n(t, 0, e);
        }),
        (n.isTweening = function (t) {
          return i.getTweensOf(t, !0).length > 0;
        });
      var f = function (t, e) {
          for (var s = [], r = 0, n = t._first; n; )
            n instanceof i
              ? (s[r++] = n)
              : (e && (s[r++] = n), (s = s.concat(f(n, e))), (r = s.length)),
              (n = n._next);
          return s;
        },
        c = (n.getAllTweens = function (e) {
          return f(t._rootTimeline, e).concat(f(t._rootFramesTimeline, e));
        });
      (n.killAll = function (t, i, s, r) {
        null == i && (i = !0), null == s && (s = !0);
        var n,
          a,
          o,
          l = c(0 != r),
          h = l.length,
          _ = i && s && r;
        for (o = 0; h > o; o++)
          (a = l[o]),
            (_ ||
              a instanceof e ||
              ((n = a.target === a.vars.onComplete) && s) ||
              (i && !n)) &&
              (t
                ? a.totalTime(a._reversed ? 0 : a.totalDuration())
                : a._enabled(!1, !1));
      }),
        (n.killChildTweensOf = function (t, e) {
          if (null != t) {
            var r,
              a,
              _,
              u,
              f,
              c = o.tweenLookup;
            if (
              ("string" == typeof t && (t = i.selector(t) || t),
              l(t) && (t = s(t)),
              h(t))
            )
              for (u = t.length; --u > -1; ) n.killChildTweensOf(t[u], e);
            else {
              r = [];
              for (_ in c)
                for (a = c[_].target.parentNode; a; )
                  a === t && (r = r.concat(c[_].tweens)), (a = a.parentNode);
              for (f = r.length, u = 0; f > u; u++)
                e && r[u].totalTime(r[u].totalDuration()),
                  r[u]._enabled(!1, !1);
            }
          }
        });
      var p = function (t, i, s, r) {
        (i = !1 !== i), (s = !1 !== s);
        for (
          var n, a, o = c((r = !1 !== r)), l = i && s && r, h = o.length;
          --h > -1;

        )
          (a = o[h]),
            (l ||
              a instanceof e ||
              ((n = a.target === a.vars.onComplete) && s) ||
              (i && !n)) &&
              a.paused(t);
      };
      return (
        (n.pauseAll = function (t, e, i) {
          p(!0, t, e, i);
        }),
        (n.resumeAll = function (t, e, i) {
          p(!1, t, e, i);
        }),
        (n.globalTimeScale = function (e) {
          var s = t._rootTimeline,
            r = i.ticker.time;
          return arguments.length
            ? ((e = e || a),
              (s._startTime = r - ((r - s._startTime) * s._timeScale) / e),
              (s = t._rootFramesTimeline),
              (r = i.ticker.frame),
              (s._startTime = r - ((r - s._startTime) * s._timeScale) / e),
              (s._timeScale = t._rootTimeline._timeScale = e),
              e)
            : s._timeScale;
        }),
        (_.progress = function (t, e) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) +
                  this._cycle * (this._duration + this._repeatDelay),
                e
              )
            : this._time / this.duration();
        }),
        (_.totalProgress = function (t, e) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * t, e)
            : this._totalTime / this.totalDuration();
        }),
        (_.time = function (t, e) {
          return arguments.length
            ? (this._dirty && this.totalDuration(),
              t > this._duration && (t = this._duration),
              this._yoyo && 0 != (1 & this._cycle)
                ? (t =
                    this._duration -
                    t +
                    this._cycle * (this._duration + this._repeatDelay))
                : 0 !== this._repeat &&
                  (t += this._cycle * (this._duration + this._repeatDelay)),
              this.totalTime(t, e))
            : this._time;
        }),
        (_.duration = function (e) {
          return arguments.length
            ? t.prototype.duration.call(this, e)
            : this._duration;
        }),
        (_.totalDuration = function (t) {
          return arguments.length
            ? -1 === this._repeat
              ? this
              : this.duration(
                  (t - this._repeat * this._repeatDelay) / (this._repeat + 1)
                )
            : (this._dirty &&
                ((this._totalDuration =
                  -1 === this._repeat
                    ? 999999999999
                    : this._duration * (this._repeat + 1) +
                      this._repeatDelay * this._repeat),
                (this._dirty = !1)),
              this._totalDuration);
        }),
        (_.repeat = function (t) {
          return arguments.length
            ? ((this._repeat = t), this._uncache(!0))
            : this._repeat;
        }),
        (_.repeatDelay = function (t) {
          return arguments.length
            ? ((this._repeatDelay = t), this._uncache(!0))
            : this._repeatDelay;
        }),
        (_.yoyo = function (t) {
          return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
        }),
        n
      );
    },
    !0
  ),
    _gsScope._gsDefine(
      "TimelineLite",
      ["core.Animation", "core.SimpleTimeline", "TweenLite"],
      function (t, e, i) {
        var s = function (t) {
            e.call(this, t),
              (this._labels = {}),
              (this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren),
              (this.smoothChildTiming = !0 === this.vars.smoothChildTiming),
              (this._sortChildren = !0),
              (this._onUpdate = this.vars.onUpdate);
            var i,
              s,
              r = this.vars;
            for (s in r)
              (i = r[s]),
                l(i) &&
                  -1 !== i.join("").indexOf("{self}") &&
                  (r[s] = this._swapSelfInParams(i));
            l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger);
          },
          r = 1e-10,
          n = i._internals,
          a = (s._internals = {}),
          o = n.isSelector,
          l = n.isArray,
          h = n.lazyTweens,
          _ = n.lazyRender,
          u = _gsScope._gsDefine.globals,
          f = function (t) {
            var e,
              i = {};
            for (e in t) i[e] = t[e];
            return i;
          },
          c = function (t, e, i) {
            var s,
              r,
              n = t.cycle;
            for (s in n)
              (r = n[s]),
                (t[s] = "function" == typeof r ? r(i, e[i]) : r[i % r.length]);
            delete t.cycle;
          },
          p = (a.pauseCallback = function () {}),
          d = function (t) {
            var e,
              i = [],
              s = t.length;
            for (e = 0; e !== s; i.push(t[e++]));
            return i;
          },
          m = (s.prototype = new e());
        return (
          (s.version = "1.20.3"),
          (m.constructor = s),
          (m.kill()._gc = m._forcingPlayhead = m._hasPause = !1),
          (m.to = function (t, e, s, r) {
            var n = (s.repeat && u.TweenMax) || i;
            return e ? this.add(new n(t, e, s), r) : this.set(t, s, r);
          }),
          (m.from = function (t, e, s, r) {
            return this.add(((s.repeat && u.TweenMax) || i).from(t, e, s), r);
          }),
          (m.fromTo = function (t, e, s, r, n) {
            var a = (r.repeat && u.TweenMax) || i;
            return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n);
          }),
          (m.staggerTo = function (t, e, r, n, a, l, h, _) {
            var u,
              p,
              m = new s({
                onComplete: l,
                onCompleteParams: h,
                callbackScope: _,
                smoothChildTiming: this.smoothChildTiming,
              }),
              g = r.cycle;
            for (
              "string" == typeof t && (t = i.selector(t) || t),
                o((t = t || [])) && (t = d(t)),
                0 > (n = n || 0) && ((t = d(t)).reverse(), (n *= -1)),
                p = 0;
              p < t.length;
              p++
            )
              (u = f(r)),
                u.startAt &&
                  ((u.startAt = f(u.startAt)),
                  u.startAt.cycle && c(u.startAt, t, p)),
                g &&
                  (c(u, t, p),
                  null != u.duration && ((e = u.duration), delete u.duration)),
                m.to(t[p], e, u, p * n);
            return this.add(m, a);
          }),
          (m.staggerFrom = function (t, e, i, s, r, n, a, o) {
            return (
              (i.immediateRender = 0 != i.immediateRender),
              (i.runBackwards = !0),
              this.staggerTo(t, e, i, s, r, n, a, o)
            );
          }),
          (m.staggerFromTo = function (t, e, i, s, r, n, a, o, l) {
            return (
              (s.startAt = i),
              (s.immediateRender =
                0 != s.immediateRender && 0 != i.immediateRender),
              this.staggerTo(t, e, s, r, n, a, o, l)
            );
          }),
          (m.call = function (t, e, s, r) {
            return this.add(i.delayedCall(0, t, e, s), r);
          }),
          (m.set = function (t, e, s) {
            return (
              (s = this._parseTimeOrLabel(s, 0, !0)),
              null == e.immediateRender &&
                (e.immediateRender = s === this._time && !this._paused),
              this.add(new i(t, 0, e), s)
            );
          }),
          (s.exportRoot = function (t, e) {
            null == (t = t || {}).smoothChildTiming &&
              (t.smoothChildTiming = !0);
            var r,
              n,
              a,
              o,
              l = new s(t),
              h = l._timeline;
            for (
              null == e && (e = !0),
                h._remove(l, !0),
                l._startTime = 0,
                l._rawPrevTime = l._time = l._totalTime = h._time,
                a = h._first;
              a;

            )
              (o = a._next),
                (e && a instanceof i && a.target === a.vars.onComplete) ||
                  ((n = a._startTime - a._delay),
                  0 > n && (r = 1),
                  l.add(a, n)),
                (a = o);
            return h.add(l, 0), r && l.totalDuration(), l;
          }),
          (m.add = function (r, n, a, o) {
            var h, _, u, f, c, p;
            if (
              ("number" != typeof n &&
                (n = this._parseTimeOrLabel(n, 0, !0, r)),
              !(r instanceof t))
            ) {
              if (r instanceof Array || (r && r.push && l(r))) {
                for (
                  a = a || "normal", o = o || 0, h = n, _ = r.length, u = 0;
                  _ > u;
                  u++
                )
                  l((f = r[u])) && (f = new s({ tweens: f })),
                    this.add(f, h),
                    "string" != typeof f &&
                      "function" != typeof f &&
                      ("sequence" === a
                        ? (h = f._startTime + f.totalDuration() / f._timeScale)
                        : "start" === a && (f._startTime -= f.delay())),
                    (h += o);
                return this._uncache(!0);
              }
              if ("string" == typeof r) return this.addLabel(r, n);
              if ("function" != typeof r)
                throw (
                  "Cannot add " +
                  r +
                  " into the timeline; it is not a tween, timeline, function, or string."
                );
              r = i.delayedCall(0, r);
            }
            if (
              (e.prototype.add.call(this, r, n),
              r._time &&
                r.render(
                  (this.rawTime() - r._startTime) * r._timeScale,
                  !1,
                  !1
                ),
              (this._gc || this._time === this._duration) &&
                !this._paused &&
                this._duration < this.duration())
            )
              for (c = this, p = c.rawTime() > r._startTime; c._timeline; )
                p && c._timeline.smoothChildTiming
                  ? c.totalTime(c._totalTime, !0)
                  : c._gc && c._enabled(!0, !1),
                  (c = c._timeline);
            return this;
          }),
          (m.remove = function (e) {
            if (e instanceof t) {
              this._remove(e, !1);
              var i = (e._timeline = e.vars.useFrames
                ? t._rootFramesTimeline
                : t._rootTimeline);
              return (
                (e._startTime =
                  (e._paused ? e._pauseTime : i._time) -
                  (e._reversed
                    ? e.totalDuration() - e._totalTime
                    : e._totalTime) /
                    e._timeScale),
                this
              );
            }
            if (e instanceof Array || (e && e.push && l(e))) {
              for (var s = e.length; --s > -1; ) this.remove(e[s]);
              return this;
            }
            return "string" == typeof e
              ? this.removeLabel(e)
              : this.kill(null, e);
          }),
          (m._remove = function (t, i) {
            return (
              e.prototype._remove.call(this, t, i),
              this._last
                ? this._time > this.duration() &&
                  ((this._time = this._duration),
                  (this._totalTime = this._totalDuration))
                : (this._time =
                    this._totalTime =
                    this._duration =
                    this._totalDuration =
                      0),
              this
            );
          }),
          (m.append = function (t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
          }),
          (m.insert = m.insertMultiple =
            function (t, e, i, s) {
              return this.add(t, e || 0, i, s);
            }),
          (m.appendMultiple = function (t, e, i, s) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s);
          }),
          (m.addLabel = function (t, e) {
            return (this._labels[t] = this._parseTimeOrLabel(e)), this;
          }),
          (m.addPause = function (t, e, s, r) {
            var n = i.delayedCall(0, p, s, r || this);
            return (
              (n.vars.onComplete = n.vars.onReverseComplete = e),
              (n.data = "isPause"),
              (this._hasPause = !0),
              this.add(n, t)
            );
          }),
          (m.removeLabel = function (t) {
            return delete this._labels[t], this;
          }),
          (m.getLabelTime = function (t) {
            return null != this._labels[t] ? this._labels[t] : -1;
          }),
          (m._parseTimeOrLabel = function (e, i, s, r) {
            var n, a;
            if (r instanceof t && r.timeline === this) this.remove(r);
            else if (r && (r instanceof Array || (r.push && l(r))))
              for (a = r.length; --a > -1; )
                r[a] instanceof t &&
                  r[a].timeline === this &&
                  this.remove(r[a]);
            if (
              ((n =
                "number" != typeof e || i
                  ? this.duration() > 99999999999
                    ? this.recent().endTime(!1)
                    : this._duration
                  : 0),
              "string" == typeof i)
            )
              return this._parseTimeOrLabel(
                i,
                s && "number" == typeof e && null == this._labels[i]
                  ? e - n
                  : 0,
                s
              );
            if (
              ((i = i || 0),
              "string" != typeof e || (!isNaN(e) && null == this._labels[e]))
            )
              null == e && (e = n);
            else {
              if (-1 === (a = e.indexOf("=")))
                return null == this._labels[e]
                  ? s
                    ? (this._labels[e] = n + i)
                    : i
                  : this._labels[e] + i;
              (i =
                parseInt(e.charAt(a - 1) + "1", 10) * Number(e.substr(a + 1))),
                (e =
                  a > 1 ? this._parseTimeOrLabel(e.substr(0, a - 1), 0, s) : n);
            }
            return Number(e) + i;
          }),
          (m.seek = function (t, e) {
            return this.totalTime(
              "number" == typeof t ? t : this._parseTimeOrLabel(t),
              !1 !== e
            );
          }),
          (m.stop = function () {
            return this.paused(!0);
          }),
          (m.gotoAndPlay = function (t, e) {
            return this.play(t, e);
          }),
          (m.gotoAndStop = function (t, e) {
            return this.pause(t, e);
          }),
          (m.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s,
              n,
              a,
              o,
              l,
              u,
              f,
              c = this._time,
              p = this._dirty ? this.totalDuration() : this._totalDuration,
              d = this._startTime,
              m = this._timeScale,
              g = this._paused;
            if (
              (c !== this._time && (t += this._time - c),
              t >= p - 1e-7 && t >= 0)
            )
              (this._totalTime = this._time = p),
                this._reversed ||
                  this._hasPausedChild() ||
                  ((n = !0),
                  (o = "onComplete"),
                  (l = !!this._timeline.autoRemoveChildren),
                  0 === this._duration &&
                    ((0 >= t && t >= -1e-7) ||
                      this._rawPrevTime < 0 ||
                      this._rawPrevTime === r) &&
                    this._rawPrevTime !== t &&
                    this._first &&
                    ((l = !0),
                    this._rawPrevTime > r && (o = "onReverseComplete"))),
                (this._rawPrevTime =
                  this._duration || !e || t || this._rawPrevTime === t ? t : r),
                (t = p + 1e-4);
            else if (1e-7 > t)
              if (
                ((this._totalTime = this._time = 0),
                (0 !== c ||
                  (0 === this._duration &&
                    this._rawPrevTime !== r &&
                    (this._rawPrevTime > 0 ||
                      (0 > t && this._rawPrevTime >= 0)))) &&
                  ((o = "onReverseComplete"), (n = this._reversed)),
                0 > t)
              )
                (this._active = !1),
                  this._timeline.autoRemoveChildren && this._reversed
                    ? ((l = n = !0), (o = "onReverseComplete"))
                    : this._rawPrevTime >= 0 && this._first && (l = !0),
                  (this._rawPrevTime = t);
              else {
                if (
                  ((this._rawPrevTime =
                    this._duration || !e || t || this._rawPrevTime === t
                      ? t
                      : r),
                  0 === t && n)
                )
                  for (s = this._first; s && 0 === s._startTime; )
                    s._duration || (n = !1), (s = s._next);
                (t = 0), this._initted || (l = !0);
              }
            else {
              if (this._hasPause && !this._forcingPlayhead && !e) {
                if (t >= c)
                  for (s = this._first; s && s._startTime <= t && !u; )
                    s._duration ||
                      "isPause" !== s.data ||
                      s.ratio ||
                      (0 === s._startTime && 0 === this._rawPrevTime) ||
                      (u = s),
                      (s = s._next);
                else
                  for (s = this._last; s && s._startTime >= t && !u; )
                    s._duration ||
                      ("isPause" === s.data && s._rawPrevTime > 0 && (u = s)),
                      (s = s._prev);
                u &&
                  ((this._time = t = u._startTime),
                  (this._totalTime =
                    t +
                    this._cycle * (this._totalDuration + this._repeatDelay)));
              }
              this._totalTime = this._time = this._rawPrevTime = t;
            }
            if ((this._time !== c && this._first) || i || l || u) {
              if (
                (this._initted || (this._initted = !0),
                this._active ||
                  (!this._paused &&
                    this._time !== c &&
                    t > 0 &&
                    (this._active = !0)),
                0 === c &&
                  this.vars.onStart &&
                  ((0 === this._time && this._duration) ||
                    e ||
                    this._callback("onStart")),
                (f = this._time) >= c)
              )
                for (
                  s = this._first;
                  s &&
                  ((a = s._next), f === this._time && (!this._paused || g));

                )
                  (s._active || (s._startTime <= f && !s._paused && !s._gc)) &&
                    (u === s && this.pause(),
                    s._reversed
                      ? s.render(
                          (s._dirty ? s.totalDuration() : s._totalDuration) -
                            (t - s._startTime) * s._timeScale,
                          e,
                          i
                        )
                      : s.render((t - s._startTime) * s._timeScale, e, i)),
                    (s = a);
              else
                for (
                  s = this._last;
                  s &&
                  ((a = s._prev), f === this._time && (!this._paused || g));

                ) {
                  if (
                    s._active ||
                    (s._startTime <= c && !s._paused && !s._gc)
                  ) {
                    if (u === s) {
                      for (u = s._prev; u && u.endTime() > this._time; )
                        u.render(
                          u._reversed
                            ? u.totalDuration() -
                                (t - u._startTime) * u._timeScale
                            : (t - u._startTime) * u._timeScale,
                          e,
                          i
                        ),
                          (u = u._prev);
                      (u = null), this.pause();
                    }
                    s._reversed
                      ? s.render(
                          (s._dirty ? s.totalDuration() : s._totalDuration) -
                            (t - s._startTime) * s._timeScale,
                          e,
                          i
                        )
                      : s.render((t - s._startTime) * s._timeScale, e, i);
                  }
                  s = a;
                }
              this._onUpdate &&
                (e || (h.length && _(), this._callback("onUpdate"))),
                o &&
                  (this._gc ||
                    ((d === this._startTime || m !== this._timeScale) &&
                      (0 === this._time || p >= this.totalDuration()) &&
                      (n &&
                        (h.length && _(),
                        this._timeline.autoRemoveChildren &&
                          this._enabled(!1, !1),
                        (this._active = !1)),
                      !e && this.vars[o] && this._callback(o))));
            }
          }),
          (m._hasPausedChild = function () {
            for (var t = this._first; t; ) {
              if (t._paused || (t instanceof s && t._hasPausedChild()))
                return !0;
              t = t._next;
            }
            return !1;
          }),
          (m.getChildren = function (t, e, s, r) {
            r = r || -9999999999;
            for (var n = [], a = this._first, o = 0; a; )
              a._startTime < r ||
                (a instanceof i
                  ? !1 !== e && (n[o++] = a)
                  : (!1 !== s && (n[o++] = a),
                    !1 !== t &&
                      ((n = n.concat(a.getChildren(!0, e, s))),
                      (o = n.length)))),
                (a = a._next);
            return n;
          }),
          (m.getTweensOf = function (t, e) {
            var s,
              r,
              n = this._gc,
              a = [],
              o = 0;
            for (
              n && this._enabled(!0, !0), r = (s = i.getTweensOf(t)).length;
              --r > -1;

            )
              (s[r].timeline === this || (e && this._contains(s[r]))) &&
                (a[o++] = s[r]);
            return n && this._enabled(!1, !0), a;
          }),
          (m.recent = function () {
            return this._recent;
          }),
          (m._contains = function (t) {
            for (var e = t.timeline; e; ) {
              if (e === this) return !0;
              e = e.timeline;
            }
            return !1;
          }),
          (m.shiftChildren = function (t, e, i) {
            i = i || 0;
            for (var s, r = this._first, n = this._labels; r; )
              r._startTime >= i && (r._startTime += t), (r = r._next);
            if (e) for (s in n) n[s] >= i && (n[s] += t);
            return this._uncache(!0);
          }),
          (m._kill = function (t, e) {
            if (!t && !e) return this._enabled(!1, !1);
            for (
              var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1),
                s = i.length,
                r = !1;
              --s > -1;

            )
              i[s]._kill(t, e) && (r = !0);
            return r;
          }),
          (m.clear = function (t) {
            var e = this.getChildren(!1, !0, !0),
              i = e.length;
            for (this._time = this._totalTime = 0; --i > -1; )
              e[i]._enabled(!1, !1);
            return !1 !== t && (this._labels = {}), this._uncache(!0);
          }),
          (m.invalidate = function () {
            for (var e = this._first; e; ) e.invalidate(), (e = e._next);
            return t.prototype.invalidate.call(this);
          }),
          (m._enabled = function (t, i) {
            if (t === this._gc)
              for (var s = this._first; s; ) s._enabled(t, !0), (s = s._next);
            return e.prototype._enabled.call(this, t, i);
          }),
          (m.totalTime = function (e, i, s) {
            this._forcingPlayhead = !0;
            var r = t.prototype.totalTime.apply(this, arguments);
            return (this._forcingPlayhead = !1), r;
          }),
          (m.duration = function (t) {
            return arguments.length
              ? (0 !== this.duration() &&
                  0 !== t &&
                  this.timeScale(this._duration / t),
                this)
              : (this._dirty && this.totalDuration(), this._duration);
          }),
          (m.totalDuration = function (t) {
            if (!arguments.length) {
              if (this._dirty) {
                for (var e, i, s = 0, r = this._last, n = 999999999999; r; )
                  (e = r._prev),
                    r._dirty && r.totalDuration(),
                    r._startTime > n &&
                    this._sortChildren &&
                    !r._paused &&
                    !this._calculatingDuration
                      ? ((this._calculatingDuration = 1),
                        this.add(r, r._startTime - r._delay),
                        (this._calculatingDuration = 0))
                      : (n = r._startTime),
                    r._startTime < 0 &&
                      !r._paused &&
                      ((s -= r._startTime),
                      this._timeline.smoothChildTiming &&
                        ((this._startTime += r._startTime / this._timeScale),
                        (this._time -= r._startTime),
                        (this._totalTime -= r._startTime),
                        (this._rawPrevTime -= r._startTime)),
                      this.shiftChildren(-r._startTime, !1, -9999999999),
                      (n = 0)),
                    (i = r._startTime + r._totalDuration / r._timeScale),
                    i > s && (s = i),
                    (r = e);
                (this._duration = this._totalDuration = s), (this._dirty = !1);
              }
              return this._totalDuration;
            }
            return t && this.totalDuration()
              ? this.timeScale(this._totalDuration / t)
              : this;
          }),
          (m.paused = function (e) {
            if (!e)
              for (var i = this._first, s = this._time; i; )
                i._startTime === s &&
                  "isPause" === i.data &&
                  (i._rawPrevTime = 0),
                  (i = i._next);
            return t.prototype.paused.apply(this, arguments);
          }),
          (m.usesFrames = function () {
            for (var e = this._timeline; e._timeline; ) e = e._timeline;
            return e === t._rootFramesTimeline;
          }),
          (m.rawTime = function (t) {
            return t &&
              (this._paused ||
                (this._repeat && this.time() > 0 && this.totalProgress() < 1))
              ? this._totalTime % (this._duration + this._repeatDelay)
              : this._paused
              ? this._totalTime
              : (this._timeline.rawTime(t) - this._startTime) * this._timeScale;
          }),
          s
        );
      },
      !0
    ),
    _gsScope._gsDefine(
      "TimelineMax",
      ["TimelineLite", "TweenLite", "easing.Ease"],
      function (t, e, i) {
        var s = function (e) {
            t.call(this, e),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              (this._cycle = 0),
              (this._yoyo = !0 === this.vars.yoyo),
              (this._dirty = !0);
          },
          r = 1e-10,
          n = e._internals,
          a = n.lazyTweens,
          o = n.lazyRender,
          l = _gsScope._gsDefine.globals,
          h = new i(null, null, 1, 0),
          _ = (s.prototype = new t());
        return (
          (_.constructor = s),
          (_.kill()._gc = !1),
          (s.version = "1.20.3"),
          (_.invalidate = function () {
            return (
              (this._yoyo = !0 === this.vars.yoyo),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              this._uncache(!0),
              t.prototype.invalidate.call(this)
            );
          }),
          (_.addCallback = function (t, i, s, r) {
            return this.add(e.delayedCall(0, t, s, r), i);
          }),
          (_.removeCallback = function (t, e) {
            if (t)
              if (null == e) this._kill(null, t);
              else
                for (
                  var i = this.getTweensOf(t, !1),
                    s = i.length,
                    r = this._parseTimeOrLabel(e);
                  --s > -1;

                )
                  i[s]._startTime === r && i[s]._enabled(!1, !1);
            return this;
          }),
          (_.removePause = function (e) {
            return this.removeCallback(t._internals.pauseCallback, e);
          }),
          (_.tweenTo = function (t, i) {
            i = i || {};
            var s,
              r,
              n,
              a = {
                ease: h,
                useFrames: this.usesFrames(),
                immediateRender: !1,
              },
              o = (i.repeat && l.TweenMax) || e;
            for (r in i) a[r] = i[r];
            return (
              (a.time = this._parseTimeOrLabel(t)),
              (s =
                Math.abs(Number(a.time) - this._time) / this._timeScale ||
                0.001),
              (n = new o(this, s, a)),
              (a.onStart = function () {
                n.target.paused(!0),
                  n.vars.time !== n.target.time() &&
                    s === n.duration() &&
                    n.duration(
                      Math.abs(n.vars.time - n.target.time()) /
                        n.target._timeScale
                    ),
                  i.onStart &&
                    i.onStart.apply(
                      i.onStartScope || i.callbackScope || n,
                      i.onStartParams || []
                    );
              }),
              n
            );
          }),
          (_.tweenFromTo = function (t, e, i) {
            (i = i || {}),
              (t = this._parseTimeOrLabel(t)),
              (i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [t],
                callbackScope: this,
              }),
              (i.immediateRender = !1 !== i.immediateRender);
            var s = this.tweenTo(e, i);
            return s.duration(
              Math.abs(s.vars.time - t) / this._timeScale || 0.001
            );
          }),
          (_.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s,
              n,
              l,
              h,
              _,
              u,
              f,
              c,
              p = this._time,
              d = this._dirty ? this.totalDuration() : this._totalDuration,
              m = this._duration,
              g = this._totalTime,
              y = this._startTime,
              v = this._timeScale,
              T = this._rawPrevTime,
              x = this._paused,
              b = this._cycle;
            if (
              (p !== this._time && (t += this._time - p),
              t >= d - 1e-7 && t >= 0)
            )
              this._locked ||
                ((this._totalTime = d), (this._cycle = this._repeat)),
                this._reversed ||
                  this._hasPausedChild() ||
                  ((n = !0),
                  (h = "onComplete"),
                  (_ = !!this._timeline.autoRemoveChildren),
                  0 === this._duration &&
                    ((0 >= t && t >= -1e-7) || 0 > T || T === r) &&
                    T !== t &&
                    this._first &&
                    ((_ = !0), T > r && (h = "onReverseComplete"))),
                (this._rawPrevTime =
                  this._duration || !e || t || this._rawPrevTime === t ? t : r),
                this._yoyo && 0 != (1 & this._cycle)
                  ? (this._time = t = 0)
                  : ((this._time = m), (t = m + 1e-4));
            else if (1e-7 > t)
              if (
                (this._locked || (this._totalTime = this._cycle = 0),
                (this._time = 0),
                (0 !== p ||
                  (0 === m &&
                    T !== r &&
                    (T > 0 || (0 > t && T >= 0)) &&
                    !this._locked)) &&
                  ((h = "onReverseComplete"), (n = this._reversed)),
                0 > t)
              )
                (this._active = !1),
                  this._timeline.autoRemoveChildren && this._reversed
                    ? ((_ = n = !0), (h = "onReverseComplete"))
                    : T >= 0 && this._first && (_ = !0),
                  (this._rawPrevTime = t);
              else {
                if (
                  ((this._rawPrevTime =
                    m || !e || t || this._rawPrevTime === t ? t : r),
                  0 === t && n)
                )
                  for (s = this._first; s && 0 === s._startTime; )
                    s._duration || (n = !1), (s = s._next);
                (t = 0), this._initted || (_ = !0);
              }
            else if (
              (0 === m && 0 > T && (_ = !0),
              (this._time = this._rawPrevTime = t),
              this._locked ||
                ((this._totalTime = t),
                0 !== this._repeat &&
                  ((u = m + this._repeatDelay),
                  (this._cycle = (this._totalTime / u) >> 0),
                  0 !== this._cycle &&
                    this._cycle === this._totalTime / u &&
                    t >= g &&
                    this._cycle--,
                  (this._time = this._totalTime - this._cycle * u),
                  this._yoyo &&
                    0 != (1 & this._cycle) &&
                    (this._time = m - this._time),
                  this._time > m
                    ? ((this._time = m), (t = m + 1e-4))
                    : this._time < 0
                    ? (this._time = t = 0)
                    : (t = this._time))),
              this._hasPause && !this._forcingPlayhead && !e)
            ) {
              if ((t = this._time) >= p || (this._repeat && b !== this._cycle))
                for (s = this._first; s && s._startTime <= t && !f; )
                  s._duration ||
                    "isPause" !== s.data ||
                    s.ratio ||
                    (0 === s._startTime && 0 === this._rawPrevTime) ||
                    (f = s),
                    (s = s._next);
              else
                for (s = this._last; s && s._startTime >= t && !f; )
                  s._duration ||
                    ("isPause" === s.data && s._rawPrevTime > 0 && (f = s)),
                    (s = s._prev);
              f &&
                f._startTime < m &&
                ((this._time = t = f._startTime),
                (this._totalTime =
                  t + this._cycle * (this._totalDuration + this._repeatDelay)));
            }
            if (this._cycle !== b && !this._locked) {
              var w = this._yoyo && 0 != (1 & b),
                P = w === (this._yoyo && 0 != (1 & this._cycle)),
                O = this._totalTime,
                S = this._cycle,
                k = this._rawPrevTime,
                R = this._time;
              if (
                ((this._totalTime = b * m),
                this._cycle < b ? (w = !w) : (this._totalTime += m),
                (this._time = p),
                (this._rawPrevTime = 0 === m ? T - 1e-4 : T),
                (this._cycle = b),
                (this._locked = !0),
                (p = w ? 0 : m),
                this.render(p, e, 0 === m),
                e ||
                  this._gc ||
                  (this.vars.onRepeat &&
                    ((this._cycle = S),
                    (this._locked = !1),
                    this._callback("onRepeat"))),
                p !== this._time)
              )
                return;
              if (
                (P &&
                  ((this._cycle = b),
                  (this._locked = !0),
                  (p = w ? m + 1e-4 : -1e-4),
                  this.render(p, !0, !1)),
                (this._locked = !1),
                this._paused && !x)
              )
                return;
              (this._time = R),
                (this._totalTime = O),
                (this._cycle = S),
                (this._rawPrevTime = k);
            }
            if ((this._time !== p && this._first) || i || _ || f) {
              if (
                (this._initted || (this._initted = !0),
                this._active ||
                  (!this._paused &&
                    this._totalTime !== g &&
                    t > 0 &&
                    (this._active = !0)),
                0 === g &&
                  this.vars.onStart &&
                  ((0 === this._totalTime && this._totalDuration) ||
                    e ||
                    this._callback("onStart")),
                (c = this._time) >= p)
              )
                for (
                  s = this._first;
                  s &&
                  ((l = s._next), c === this._time && (!this._paused || x));

                )
                  (s._active ||
                    (s._startTime <= this._time && !s._paused && !s._gc)) &&
                    (f === s && this.pause(),
                    s._reversed
                      ? s.render(
                          (s._dirty ? s.totalDuration() : s._totalDuration) -
                            (t - s._startTime) * s._timeScale,
                          e,
                          i
                        )
                      : s.render((t - s._startTime) * s._timeScale, e, i)),
                    (s = l);
              else
                for (
                  s = this._last;
                  s &&
                  ((l = s._prev), c === this._time && (!this._paused || x));

                ) {
                  if (
                    s._active ||
                    (s._startTime <= p && !s._paused && !s._gc)
                  ) {
                    if (f === s) {
                      for (f = s._prev; f && f.endTime() > this._time; )
                        f.render(
                          f._reversed
                            ? f.totalDuration() -
                                (t - f._startTime) * f._timeScale
                            : (t - f._startTime) * f._timeScale,
                          e,
                          i
                        ),
                          (f = f._prev);
                      (f = null), this.pause();
                    }
                    s._reversed
                      ? s.render(
                          (s._dirty ? s.totalDuration() : s._totalDuration) -
                            (t - s._startTime) * s._timeScale,
                          e,
                          i
                        )
                      : s.render((t - s._startTime) * s._timeScale, e, i);
                  }
                  s = l;
                }
              this._onUpdate &&
                (e || (a.length && o(), this._callback("onUpdate"))),
                h &&
                  (this._locked ||
                    this._gc ||
                    ((y === this._startTime || v !== this._timeScale) &&
                      (0 === this._time || d >= this.totalDuration()) &&
                      (n &&
                        (a.length && o(),
                        this._timeline.autoRemoveChildren &&
                          this._enabled(!1, !1),
                        (this._active = !1)),
                      !e && this.vars[h] && this._callback(h))));
            } else
              g !== this._totalTime &&
                this._onUpdate &&
                (e || this._callback("onUpdate"));
          }),
          (_.getActive = function (t, e, i) {
            null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
            var s,
              r,
              n = [],
              a = this.getChildren(t, e, i),
              o = 0,
              l = a.length;
            for (s = 0; l > s; s++) (r = a[s]), r.isActive() && (n[o++] = r);
            return n;
          }),
          (_.getLabelAfter = function (t) {
            t || (0 !== t && (t = this._time));
            var e,
              i = this.getLabelsArray(),
              s = i.length;
            for (e = 0; s > e; e++) if (i[e].time > t) return i[e].name;
            return null;
          }),
          (_.getLabelBefore = function (t) {
            null == t && (t = this._time);
            for (var e = this.getLabelsArray(), i = e.length; --i > -1; )
              if (e[i].time < t) return e[i].name;
            return null;
          }),
          (_.getLabelsArray = function () {
            var t,
              e = [],
              i = 0;
            for (t in this._labels) e[i++] = { time: this._labels[t], name: t };
            return (
              e.sort(function (t, e) {
                return t.time - e.time;
              }),
              e
            );
          }),
          (_.invalidate = function () {
            return (this._locked = !1), t.prototype.invalidate.call(this);
          }),
          (_.progress = function (t, e) {
            return arguments.length
              ? this.totalTime(
                  this.duration() *
                    (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) +
                    this._cycle * (this._duration + this._repeatDelay),
                  e
                )
              : this._time / this.duration() || 0;
          }),
          (_.totalProgress = function (t, e) {
            return arguments.length
              ? this.totalTime(this.totalDuration() * t, e)
              : this._totalTime / this.totalDuration() || 0;
          }),
          (_.totalDuration = function (e) {
            return arguments.length
              ? -1 !== this._repeat && e
                ? this.timeScale(this.totalDuration() / e)
                : this
              : (this._dirty &&
                  (t.prototype.totalDuration.call(this),
                  (this._totalDuration =
                    -1 === this._repeat
                      ? 999999999999
                      : this._duration * (this._repeat + 1) +
                        this._repeatDelay * this._repeat)),
                this._totalDuration);
          }),
          (_.time = function (t, e) {
            return arguments.length
              ? (this._dirty && this.totalDuration(),
                t > this._duration && (t = this._duration),
                this._yoyo && 0 != (1 & this._cycle)
                  ? (t =
                      this._duration -
                      t +
                      this._cycle * (this._duration + this._repeatDelay))
                  : 0 !== this._repeat &&
                    (t += this._cycle * (this._duration + this._repeatDelay)),
                this.totalTime(t, e))
              : this._time;
          }),
          (_.repeat = function (t) {
            return arguments.length
              ? ((this._repeat = t), this._uncache(!0))
              : this._repeat;
          }),
          (_.repeatDelay = function (t) {
            return arguments.length
              ? ((this._repeatDelay = t), this._uncache(!0))
              : this._repeatDelay;
          }),
          (_.yoyo = function (t) {
            return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
          }),
          (_.currentLabel = function (t) {
            return arguments.length
              ? this.seek(t, !0)
              : this.getLabelBefore(this._time + 1e-8);
          }),
          s
        );
      },
      !0
    ),
    (i = 180 / Math.PI),
    (s = []),
    (r = []),
    (n = []),
    (a = {}),
    (o = _gsScope._gsDefine.globals),
    (l = function (t, e, i, s) {
      i === s && (i = s - (s - e) / 1e6),
        t === e && (e = t + (i - t) / 1e6),
        (this.a = t),
        (this.b = e),
        (this.c = i),
        (this.d = s),
        (this.da = s - t),
        (this.ca = i - t),
        (this.ba = e - t);
    }),
    (h = function (t, e, i, s) {
      var r = { a: t },
        n = {},
        a = {},
        o = { c: s },
        l = (t + e) / 2,
        h = (e + i) / 2,
        _ = (i + s) / 2,
        u = (l + h) / 2,
        f = (h + _) / 2,
        c = (f - u) / 8;
      return (
        (r.b = l + (t - l) / 4),
        (n.b = u + c),
        (r.c = n.a = (r.b + n.b) / 2),
        (n.c = a.a = (u + f) / 2),
        (a.b = f - c),
        (o.b = _ + (s - _) / 4),
        (a.c = o.a = (a.b + o.b) / 2),
        [r, n, a, o]
      );
    }),
    (_ = function (t, e, i, a, o) {
      var l,
        _,
        u,
        f,
        c,
        p,
        d,
        m,
        g,
        y,
        v,
        T,
        x,
        b = t.length - 1,
        w = 0,
        P = t[0].a;
      for (l = 0; b > l; l++)
        (c = t[w]),
          (_ = c.a),
          (u = c.d),
          (f = t[w + 1].d),
          o
            ? ((v = s[l]),
              (T = r[l]),
              (x = ((T + v) * e * 0.25) / (a ? 0.5 : n[l] || 0.5)),
              (p = u - (u - _) * (a ? 0.5 * e : 0 !== v ? x / v : 0)),
              (d = u + (f - u) * (a ? 0.5 * e : 0 !== T ? x / T : 0)),
              (m = u - (p + (((d - p) * ((3 * v) / (v + T) + 0.5)) / 4 || 0))))
            : ((p = u - (u - _) * e * 0.5),
              (d = u + (f - u) * e * 0.5),
              (m = u - (p + d) / 2)),
          (p += m),
          (d += m),
          (c.c = g = p),
          (c.b = 0 !== l ? P : (P = c.a + 0.6 * (c.c - c.a))),
          (c.da = u - _),
          (c.ca = g - _),
          (c.ba = P - _),
          i
            ? ((y = h(_, P, g, u)),
              t.splice(w, 1, y[0], y[1], y[2], y[3]),
              (w += 4))
            : w++,
          (P = d);
      ((c = t[w]).b = P),
        (c.c = P + 0.4 * (c.d - P)),
        (c.da = c.d - c.a),
        (c.ca = c.c - c.a),
        (c.ba = P - c.a),
        i &&
          ((y = h(c.a, P, c.c, c.d)), t.splice(w, 1, y[0], y[1], y[2], y[3]));
    }),
    (u = function (t, e, i, n) {
      var a,
        o,
        h,
        _,
        u,
        f,
        c = [];
      if (n)
        for (t = [n].concat(t), o = t.length; --o > -1; )
          "string" == typeof (f = t[o][e]) &&
            "=" === f.charAt(1) &&
            (t[o][e] = n[e] + Number(f.charAt(0) + f.substr(2)));
      if (0 > (a = t.length - 2))
        return (c[0] = new l(t[0][e], 0, 0, t[0][e])), c;
      for (o = 0; a > o; o++)
        (h = t[o][e]),
          (_ = t[o + 1][e]),
          (c[o] = new l(h, 0, 0, _)),
          i &&
            ((u = t[o + 2][e]),
            (s[o] = (s[o] || 0) + (_ - h) * (_ - h)),
            (r[o] = (r[o] || 0) + (u - _) * (u - _)));
      return (c[o] = new l(t[o][e], 0, 0, t[o + 1][e])), c;
    }),
    (f = function (t, e, i, o, l, h) {
      var f,
        c,
        p,
        d,
        m,
        g,
        y,
        v,
        T = {},
        x = [],
        b = h || t[0];
      (l =
        "string" == typeof l
          ? "," + l + ","
          : ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,"),
        null == e && (e = 1);
      for (c in t[0]) x.push(c);
      if (t.length > 1) {
        for (v = t[t.length - 1], y = !0, f = x.length; --f > -1; )
          if (((c = x[f]), Math.abs(b[c] - v[c]) > 0.05)) {
            y = !1;
            break;
          }
        y &&
          ((t = t.concat()),
          h && t.unshift(h),
          t.push(t[1]),
          (h = t[t.length - 3]));
      }
      for (s.length = r.length = n.length = 0, f = x.length; --f > -1; )
        (c = x[f]),
          (a[c] = -1 !== l.indexOf("," + c + ",")),
          (T[c] = u(t, c, a[c], h));
      for (f = s.length; --f > -1; )
        (s[f] = Math.sqrt(s[f])), (r[f] = Math.sqrt(r[f]));
      if (!o) {
        for (f = x.length; --f > -1; )
          if (a[c])
            for (p = T[x[f]], g = p.length - 1, d = 0; g > d; d++)
              (m = p[d + 1].da / r[d] + p[d].da / s[d] || 0),
                (n[d] = (n[d] || 0) + m * m);
        for (f = n.length; --f > -1; ) n[f] = Math.sqrt(n[f]);
      }
      for (f = x.length, d = i ? 4 : 1; --f > -1; )
        (c = x[f]),
          (p = T[c]),
          _(p, e, i, o, a[c]),
          y && (p.splice(0, d), p.splice(p.length - d, d));
      return T;
    }),
    (c = function (t, e, i) {
      for (
        var s, r, n, a, o, l, h, _, u, f, c, p = 1 / i, d = t.length;
        --d > -1;

      )
        for (
          f = t[d],
            n = f.a,
            a = f.d - n,
            o = f.c - n,
            l = f.b - n,
            s = r = 0,
            _ = 1;
          i >= _;
          _++
        )
          (h = p * _),
            (u = 1 - h),
            (s = r - (r = (h * h * a + 3 * u * (h * o + u * l)) * h)),
            (c = d * i + _ - 1),
            (e[c] = (e[c] || 0) + s * s);
    }),
    (p = _gsScope._gsDefine.plugin({
      propName: "bezier",
      priority: -1,
      version: "1.3.8",
      API: 2,
      global: !0,
      init: function (t, e, i) {
        (this._target = t),
          e instanceof Array && (e = { values: e }),
          (this._func = {}),
          (this._mod = {}),
          (this._props = []),
          (this._timeRes =
            null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10));
        var s,
          r,
          n,
          a,
          o,
          h = e.values || [],
          _ = {},
          u = h[0],
          p = e.autoRotate || i.vars.orientToBezier;
        this._autoRotate = p
          ? p instanceof Array
            ? p
            : [["x", "y", "rotation", !0 === p ? 0 : Number(p) || 0]]
          : null;
        for (s in u) this._props.push(s);
        for (n = this._props.length; --n > -1; )
          (s = this._props[n]),
            this._overwriteProps.push(s),
            (r = this._func[s] = "function" == typeof t[s]),
            (_[s] = r
              ? t[
                  s.indexOf("set") ||
                  "function" != typeof t["get" + s.substr(3)]
                    ? s
                    : "get" + s.substr(3)
                ]()
              : parseFloat(t[s])),
            o || (_[s] !== h[0][s] && (o = _));
        if (
          ((this._beziers =
            "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type
              ? f(
                  h,
                  isNaN(e.curviness) ? 1 : e.curviness,
                  !1,
                  "thruBasic" === e.type,
                  e.correlate,
                  o
                )
              : (function (t, e, i) {
                  var s,
                    r,
                    n,
                    a,
                    o,
                    h,
                    _,
                    u,
                    f,
                    c,
                    p,
                    d = {},
                    m = "cubic" === (e = e || "soft") ? 3 : 2,
                    g = "soft" === e,
                    y = [];
                  if (
                    (g && i && (t = [i].concat(t)),
                    null == t || t.length < m + 1)
                  )
                    throw "invalid Bezier data";
                  for (f in t[0]) y.push(f);
                  for (h = y.length; --h > -1; ) {
                    for (
                      d[(f = y[h])] = o = [], c = 0, u = t.length, _ = 0;
                      u > _;
                      _++
                    )
                      (s =
                        null == i
                          ? t[_][f]
                          : "string" == typeof (p = t[_][f]) &&
                            "=" === p.charAt(1)
                          ? i[f] + Number(p.charAt(0) + p.substr(2))
                          : Number(p)),
                        g &&
                          _ > 1 &&
                          u - 1 > _ &&
                          (o[c++] = (s + o[c - 2]) / 2),
                        (o[c++] = s);
                    for (u = c - m + 1, c = 0, _ = 0; u > _; _ += m)
                      (s = o[_]),
                        (r = o[_ + 1]),
                        (n = o[_ + 2]),
                        (a = 2 === m ? 0 : o[_ + 3]),
                        (o[c++] = p =
                          3 === m
                            ? new l(s, r, n, a)
                            : new l(s, (2 * r + s) / 3, (2 * r + n) / 3, n));
                    o.length = c;
                  }
                  return d;
                })(h, e.type, _)),
          (this._segCount = this._beziers[s].length),
          this._timeRes)
        ) {
          var d = (function (t, e) {
            var i,
              s,
              r,
              n,
              a = [],
              o = [],
              l = 0,
              h = 0,
              _ = (e = e >> 0 || 6) - 1,
              u = [],
              f = [];
            for (i in t) c(t[i], a, e);
            for (r = a.length, s = 0; r > s; s++)
              (l += Math.sqrt(a[s])),
                (n = s % e),
                (f[n] = l),
                n === _ &&
                  ((h += l),
                  (n = (s / e) >> 0),
                  (u[n] = f),
                  (o[n] = h),
                  (l = 0),
                  (f = []));
            return { length: h, lengths: o, segments: u };
          })(this._beziers, this._timeRes);
          (this._length = d.length),
            (this._lengths = d.lengths),
            (this._segments = d.segments),
            (this._l1 = this._li = this._s1 = this._si = 0),
            (this._l2 = this._lengths[0]),
            (this._curSeg = this._segments[0]),
            (this._s2 = this._curSeg[0]),
            (this._prec = 1 / this._curSeg.length);
        }
        if ((p = this._autoRotate))
          for (
            this._initialRotations = [],
              p[0] instanceof Array || (this._autoRotate = p = [p]),
              n = p.length;
            --n > -1;

          ) {
            for (a = 0; 3 > a; a++)
              (s = p[n][a]),
                (this._func[s] =
                  "function" == typeof t[s] &&
                  t[
                    s.indexOf("set") ||
                    "function" != typeof t["get" + s.substr(3)]
                      ? s
                      : "get" + s.substr(3)
                  ]);
            (s = p[n][2]),
              (this._initialRotations[n] =
                (this._func[s]
                  ? this._func[s].call(this._target)
                  : this._target[s]) || 0),
              this._overwriteProps.push(s);
          }
        return (this._startRatio = i.vars.runBackwards ? 1 : 0), !0;
      },
      set: function (t) {
        var e,
          s,
          r,
          n,
          a,
          o,
          l,
          h,
          _,
          u,
          f = this._segCount,
          c = this._func,
          p = this._target,
          d = t !== this._startRatio;
        if (this._timeRes) {
          if (
            ((_ = this._lengths),
            (u = this._curSeg),
            (t *= this._length),
            (r = this._li),
            t > this._l2 && f - 1 > r)
          ) {
            for (h = f - 1; h > r && (this._l2 = _[++r]) <= t; );
            (this._l1 = _[r - 1]),
              (this._li = r),
              (this._curSeg = u = this._segments[r]),
              (this._s2 = u[(this._s1 = this._si = 0)]);
          } else if (t < this._l1 && r > 0) {
            for (; r > 0 && (this._l1 = _[--r]) >= t; );
            0 === r && t < this._l1 ? (this._l1 = 0) : r++,
              (this._l2 = _[r]),
              (this._li = r),
              (this._curSeg = u = this._segments[r]),
              (this._s1 = u[(this._si = u.length - 1) - 1] || 0),
              (this._s2 = u[this._si]);
          }
          if (
            ((e = r),
            (t -= this._l1),
            (r = this._si),
            t > this._s2 && r < u.length - 1)
          ) {
            for (h = u.length - 1; h > r && (this._s2 = u[++r]) <= t; );
            (this._s1 = u[r - 1]), (this._si = r);
          } else if (t < this._s1 && r > 0) {
            for (; r > 0 && (this._s1 = u[--r]) >= t; );
            0 === r && t < this._s1 ? (this._s1 = 0) : r++,
              (this._s2 = u[r]),
              (this._si = r);
          }
          o = (r + (t - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
        } else
          (e = 0 > t ? 0 : t >= 1 ? f - 1 : (f * t) >> 0),
            (o = (t - e * (1 / f)) * f);
        for (s = 1 - o, r = this._props.length; --r > -1; )
          (n = this._props[r]),
            (a = this._beziers[n][e]),
            (l = (o * o * a.da + 3 * s * (o * a.ca + s * a.ba)) * o + a.a),
            this._mod[n] && (l = this._mod[n](l, p)),
            c[n] ? p[n](l) : (p[n] = l);
        if (this._autoRotate) {
          var m,
            g,
            y,
            v,
            T,
            x,
            b,
            w = this._autoRotate;
          for (r = w.length; --r > -1; )
            (n = w[r][2]),
              (x = w[r][3] || 0),
              (b = !0 === w[r][4] ? 1 : i),
              (a = this._beziers[w[r][0]]),
              (m = this._beziers[w[r][1]]),
              a &&
                m &&
                ((a = a[e]),
                (m = m[e]),
                (g = a.a + (a.b - a.a) * o),
                (v = a.b + (a.c - a.b) * o),
                (g += (v - g) * o),
                (v += (a.c + (a.d - a.c) * o - v) * o),
                (y = m.a + (m.b - m.a) * o),
                (T = m.b + (m.c - m.b) * o),
                (y += (T - y) * o),
                (T += (m.c + (m.d - m.c) * o - T) * o),
                (l = d
                  ? Math.atan2(T - y, v - g) * b + x
                  : this._initialRotations[r]),
                this._mod[n] && (l = this._mod[n](l, p)),
                c[n] ? p[n](l) : (p[n] = l));
        }
      },
    })),
    (d = p.prototype),
    (p.bezierThrough = f),
    (p.cubicToQuadratic = h),
    (p._autoCSS = !0),
    (p.quadraticToCubic = function (t, e, i) {
      return new l(t, (2 * e + t) / 3, (2 * e + i) / 3, i);
    }),
    (p._cssRegister = function () {
      var t = o.CSSPlugin;
      if (t) {
        var e = t._internals,
          i = e._parseToProxy,
          s = e._setPluginRatio,
          r = e.CSSPropTween;
        e._registerComplexSpecialProp("bezier", {
          parser: function (t, e, n, a, o, l) {
            e instanceof Array && (e = { values: e }), (l = new p());
            var h,
              _,
              u,
              f = e.values,
              c = f.length - 1,
              d = [],
              m = {};
            if (0 > c) return o;
            for (h = 0; c >= h; h++)
              (u = i(t, f[h], a, o, l, c !== h)), (d[h] = u.end);
            for (_ in e) m[_] = e[_];
            return (
              (m.values = d),
              ((o = new r(t, "bezier", 0, 0, u.pt, 2)).data = u),
              (o.plugin = l),
              (o.setRatio = s),
              0 === m.autoRotate && (m.autoRotate = !0),
              !m.autoRotate ||
                m.autoRotate instanceof Array ||
                ((h = !0 === m.autoRotate ? 0 : Number(m.autoRotate)),
                (m.autoRotate =
                  null != u.end.left
                    ? [["left", "top", "rotation", h, !1]]
                    : null != u.end.x && [["x", "y", "rotation", h, !1]])),
              m.autoRotate &&
                (a._transform || a._enableTransforms(!1),
                (u.autoRotate = a._target._gsTransform),
                (u.proxy.rotation = u.autoRotate.rotation || 0),
                a._overwriteProps.push("rotation")),
              l._onInitTween(u.proxy, m, a._tween),
              o
            );
          },
        });
      }
    }),
    (d._mod = function (t) {
      for (var e, i = this._overwriteProps, s = i.length; --s > -1; )
        (e = t[i[s]]), e && "function" == typeof e && (this._mod[i[s]] = e);
    }),
    (d._kill = function (t) {
      var e,
        i,
        s = this._props;
      for (e in this._beziers)
        if (e in t)
          for (
            delete this._beziers[e], delete this._func[e], i = s.length;
            --i > -1;

          )
            s[i] === e && s.splice(i, 1);
      if ((s = this._autoRotate))
        for (i = s.length; --i > -1; ) t[s[i][2]] && s.splice(i, 1);
      return this._super._kill.call(this, t);
    }),
    _gsScope._gsDefine(
      "plugins.CSSPlugin",
      ["plugins.TweenPlugin", "TweenLite"],
      function (t, e) {
        var i,
          s,
          r,
          n,
          a = function () {
            t.call(this, "css"),
              (this._overwriteProps.length = 0),
              (this.setRatio = a.prototype.setRatio);
          },
          o = _gsScope._gsDefine.globals,
          l = {},
          h = (a.prototype = new t("css"));
        (h.constructor = a),
          (a.version = "1.20.3"),
          (a.API = 2),
          (a.defaultTransformPerspective = 0),
          (a.defaultSkewType = "compensated"),
          (a.defaultSmoothOrigin = !0),
          (h = "px"),
          (a.suffixMap = {
            top: h,
            right: h,
            bottom: h,
            left: h,
            width: h,
            height: h,
            fontSize: h,
            padding: h,
            margin: h,
            perspective: h,
            lineHeight: "",
          });
        var _,
          u,
          f,
          c,
          p,
          d,
          m,
          g,
          y,
          v,
          T = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
          x = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
          b = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
          w = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
          P = /(?:\d|\-|\+|=|#|\.)*/g,
          O = /opacity *= *([^)]*)/i,
          S = /opacity:([^;]*)/i,
          k = /alpha\(opacity *=.+?\)/i,
          R = /^(rgb|hsl)/,
          A = /([A-Z])/g,
          C = /-([a-z])/gi,
          D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
          M = function (t, e) {
            return e.toUpperCase();
          },
          F = /(?:Left|Right|Width)/i,
          z = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
          E = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
          I = /,(?=[^\)]*(?:\(|$))/gi,
          X = /[\s,\(]/i,
          N = Math.PI / 180,
          L = 180 / Math.PI,
          B = {},
          Y = { style: {} },
          j = _gsScope.document || {
            createElement: function () {
              return Y;
            },
          },
          U = function (t, e) {
            return j.createElementNS
              ? j.createElementNS(e || "http://www.w3.org/1999/xhtml", t)
              : j.createElement(t);
          },
          V = U("div"),
          q = U("img"),
          W = (a._internals = { _specialProps: l }),
          G = (_gsScope.navigator || {}).userAgent || "",
          Z =
            ((y = G.indexOf("Android")),
            (v = U("a")),
            (f =
              -1 !== G.indexOf("Safari") &&
              -1 === G.indexOf("Chrome") &&
              (-1 === y || parseFloat(G.substr(y + 8, 2)) > 3)),
            (p = f && parseFloat(G.substr(G.indexOf("Version/") + 8, 2)) < 6),
            (c = -1 !== G.indexOf("Firefox")),
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(G) ||
              /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(G)) &&
              (d = parseFloat(RegExp.$1)),
            !!v &&
              ((v.style.cssText = "top:1px;opacity:.55;"),
              /^0.55/.test(v.style.opacity))),
          H = function (t) {
            return O.test(
              "string" == typeof t
                ? t
                : (t.currentStyle ? t.currentStyle.filter : t.style.filter) ||
                    ""
            )
              ? parseFloat(RegExp.$1) / 100
              : 1;
          },
          $ = function (t) {
            _gsScope.console && console.log(t);
          },
          Q = "",
          K = "",
          J = function (t, e) {
            var i,
              s,
              r = (e = e || V).style;
            if (void 0 !== r[t]) return t;
            for (
              t = t.charAt(0).toUpperCase() + t.substr(1),
                i = ["O", "Moz", "ms", "Ms", "Webkit"],
                s = 5;
              --s > -1 && void 0 === r[i[s] + t];

            );
            return s >= 0
              ? ((Q = "-" + (K = 3 === s ? "ms" : i[s]).toLowerCase() + "-"),
                K + t)
              : null;
          },
          tt = j.defaultView ? j.defaultView.getComputedStyle : function () {},
          et = (a.getStyle = function (t, e, i, s, r) {
            var n;
            return Z || "opacity" !== e
              ? (!s && t.style[e]
                  ? (n = t.style[e])
                  : (i = i || tt(t))
                  ? (n =
                      i[e] ||
                      i.getPropertyValue(e) ||
                      i.getPropertyValue(e.replace(A, "-$1").toLowerCase()))
                  : t.currentStyle && (n = t.currentStyle[e]),
                null == r ||
                (n && "none" !== n && "auto" !== n && "auto auto" !== n)
                  ? n
                  : r)
              : H(t);
          }),
          it = (W.convertToPixels = function (t, i, s, r, n) {
            if ("px" === r || (!r && "lineHeight" !== i)) return s;
            if ("auto" === r || !s) return 0;
            var o,
              l,
              h,
              _ = F.test(i),
              u = t,
              f = V.style,
              c = 0 > s,
              p = 1 === s;
            if ((c && (s = -s), p && (s *= 100), "lineHeight" !== i || r))
              if ("%" === r && -1 !== i.indexOf("border"))
                o = (s / 100) * (_ ? t.clientWidth : t.clientHeight);
              else {
                if (
                  ((f.cssText =
                    "border:0 solid red;position:" +
                    et(t, "position") +
                    ";line-height:0;"),
                  "%" !== r &&
                    u.appendChild &&
                    "v" !== r.charAt(0) &&
                    "rem" !== r)
                )
                  f[_ ? "borderLeftWidth" : "borderTopWidth"] = s + r;
                else {
                  if (
                    ((u = t.parentNode || j.body),
                    -1 !== et(u, "display").indexOf("flex") &&
                      (f.position = "absolute"),
                    (l = u._gsCache),
                    (h = e.ticker.frame),
                    l && _ && l.time === h)
                  )
                    return (l.width * s) / 100;
                  f[_ ? "width" : "height"] = s + r;
                }
                u.appendChild(V),
                  (o = parseFloat(V[_ ? "offsetWidth" : "offsetHeight"])),
                  u.removeChild(V),
                  _ &&
                    "%" === r &&
                    !1 !== a.cacheWidths &&
                    (((l = u._gsCache = u._gsCache || {}).time = h),
                    (l.width = (o / s) * 100)),
                  0 !== o || n || (o = it(t, i, s, r, !0));
              }
            else
              (l = tt(t).lineHeight),
                (t.style.lineHeight = s),
                (o = parseFloat(tt(t).lineHeight)),
                (t.style.lineHeight = l);
            return p && (o /= 100), c ? -o : o;
          }),
          st = (W.calculateOffset = function (t, e, i) {
            if ("absolute" !== et(t, "position", i)) return 0;
            var s = "left" === e ? "Left" : "Top",
              r = et(t, "margin" + s, i);
            return (
              t["offset" + s] - (it(t, e, parseFloat(r), r.replace(P, "")) || 0)
            );
          }),
          rt = function (t, e) {
            var i,
              s,
              r,
              n = {};
            if ((e = e || tt(t, null)))
              if ((i = e.length))
                for (; --i > -1; )
                  (r = e[i]),
                    (-1 === r.indexOf("-transform") || Et === r) &&
                      (n[r.replace(C, M)] = e.getPropertyValue(r));
              else
                for (i in e)
                  (-1 === i.indexOf("Transform") || zt === i) && (n[i] = e[i]);
            else if ((e = t.currentStyle || t.style))
              for (i in e)
                "string" == typeof i &&
                  void 0 === n[i] &&
                  (n[i.replace(C, M)] = e[i]);
            return (
              Z || (n.opacity = H(t)),
              (s = Zt(t, e, !1)),
              (n.rotation = s.rotation),
              (n.skewX = s.skewX),
              (n.scaleX = s.scaleX),
              (n.scaleY = s.scaleY),
              (n.x = s.x),
              (n.y = s.y),
              Xt &&
                ((n.z = s.z),
                (n.rotationX = s.rotationX),
                (n.rotationY = s.rotationY),
                (n.scaleZ = s.scaleZ)),
              n.filters && delete n.filters,
              n
            );
          },
          nt = function (t, e, i, s, r) {
            var n,
              a,
              o,
              l = {},
              h = t.style;
            for (a in i)
              "cssText" !== a &&
                "length" !== a &&
                isNaN(a) &&
                (e[a] !== (n = i[a]) || (r && r[a])) &&
                -1 === a.indexOf("Origin") &&
                ("number" == typeof n || "string" == typeof n) &&
                ((l[a] =
                  "auto" !== n || ("left" !== a && "top" !== a)
                    ? ("" !== n && "auto" !== n && "none" !== n) ||
                      "string" != typeof e[a] ||
                      "" === e[a].replace(w, "")
                      ? n
                      : 0
                    : st(t, a)),
                void 0 !== h[a] && (o = new Tt(h, a, h[a], o)));
            if (s) for (a in s) "className" !== a && (l[a] = s[a]);
            return { difs: l, firstMPT: o };
          },
          at = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
          ot = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
          lt = function (t, e, i) {
            if ("svg" === (t.nodeName + "").toLowerCase())
              return (i || tt(t))[e] || 0;
            if (t.getCTM && qt(t)) return t.getBBox()[e] || 0;
            var s = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
              r = at[e],
              n = r.length;
            for (i = i || tt(t, null); --n > -1; )
              (s -= parseFloat(et(t, "padding" + r[n], i, !0)) || 0),
                (s -= parseFloat(et(t, "border" + r[n] + "Width", i, !0)) || 0);
            return s;
          },
          ht = function (t, e) {
            if ("contain" === t || "auto" === t || "auto auto" === t)
              return t + " ";
            (null == t || "" === t) && (t = "0 0");
            var i,
              s = t.split(" "),
              r =
                -1 !== t.indexOf("left")
                  ? "0%"
                  : -1 !== t.indexOf("right")
                  ? "100%"
                  : s[0],
              n =
                -1 !== t.indexOf("top")
                  ? "0%"
                  : -1 !== t.indexOf("bottom")
                  ? "100%"
                  : s[1];
            if (s.length > 3 && !e) {
              for (
                s = t.split(", ").join(",").split(","), t = [], i = 0;
                i < s.length;
                i++
              )
                t.push(ht(s[i]));
              return t.join(",");
            }
            return (
              null == n
                ? (n = "center" === r ? "50%" : "0")
                : "center" === n && (n = "50%"),
              ("center" === r ||
                (isNaN(parseFloat(r)) && -1 === (r + "").indexOf("="))) &&
                (r = "50%"),
              (t = r + " " + n + (s.length > 2 ? " " + s[2] : "")),
              e &&
                ((e.oxp = -1 !== r.indexOf("%")),
                (e.oyp = -1 !== n.indexOf("%")),
                (e.oxr = "=" === r.charAt(1)),
                (e.oyr = "=" === n.charAt(1)),
                (e.ox = parseFloat(r.replace(w, ""))),
                (e.oy = parseFloat(n.replace(w, ""))),
                (e.v = t)),
              e || t
            );
          },
          _t = function (t, e) {
            return (
              "function" == typeof t && (t = t(g, m)),
              "string" == typeof t && "=" === t.charAt(1)
                ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2))
                : parseFloat(t) - parseFloat(e) || 0
            );
          },
          ut = function (t, e) {
            return (
              "function" == typeof t && (t = t(g, m)),
              null == t
                ? e
                : "string" == typeof t && "=" === t.charAt(1)
                ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e
                : parseFloat(t) || 0
            );
          },
          ft = function (t, e, i, s) {
            var r, n, a, o, l;
            return (
              "function" == typeof t && (t = t(g, m)),
              null == t
                ? (o = e)
                : "number" == typeof t
                ? (o = t)
                : ((r = 360),
                  (n = t.split("_")),
                  (a =
                    ((l = "=" === t.charAt(1))
                      ? parseInt(t.charAt(0) + "1", 10) *
                        parseFloat(n[0].substr(2))
                      : parseFloat(n[0])) *
                      (-1 === t.indexOf("rad") ? 1 : L) -
                    (l ? 0 : e)),
                  n.length &&
                    (s && (s[i] = e + a),
                    -1 !== t.indexOf("short") &&
                      (a %= r) !== a % (r / 2) &&
                      (a = 0 > a ? a + r : a - r),
                    -1 !== t.indexOf("_cw") && 0 > a
                      ? (a = ((a + 9999999999 * r) % r) - ((a / r) | 0) * r)
                      : -1 !== t.indexOf("ccw") &&
                        a > 0 &&
                        (a = ((a - 9999999999 * r) % r) - ((a / r) | 0) * r)),
                  (o = e + a)),
              1e-6 > o && o > -1e-6 && (o = 0),
              o
            );
          },
          ct = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0],
          },
          pt = function (t, e, i) {
            return (
              (255 *
                (1 > 6 * (t = 0 > t ? t + 1 : t > 1 ? t - 1 : t)
                  ? e + (i - e) * t * 6
                  : 0.5 > t
                  ? i
                  : 2 > 3 * t
                  ? e + (i - e) * (2 / 3 - t) * 6
                  : e) +
                0.5) |
              0
            );
          },
          dt = (a.parseColor = function (t, e) {
            var i, s, r, n, a, o, l, h, _, u, f;
            if (t)
              if ("number" == typeof t) i = [t >> 16, (t >> 8) & 255, 255 & t];
              else {
                if (
                  ("," === t.charAt(t.length - 1) &&
                    (t = t.substr(0, t.length - 1)),
                  ct[t])
                )
                  i = ct[t];
                else if ("#" === t.charAt(0))
                  4 === t.length &&
                    ((s = t.charAt(1)),
                    (r = t.charAt(2)),
                    (n = t.charAt(3)),
                    (t = "#" + s + s + r + r + n + n)),
                    (t = parseInt(t.substr(1), 16)),
                    (i = [t >> 16, (t >> 8) & 255, 255 & t]);
                else if ("hsl" === t.substr(0, 3))
                  if (((i = f = t.match(T)), e)) {
                    if (-1 !== t.indexOf("=")) return t.match(x);
                  } else
                    (a = (Number(i[0]) % 360) / 360),
                      (o = Number(i[1]) / 100),
                      (l = Number(i[2]) / 100),
                      (r = 0.5 >= l ? l * (o + 1) : l + o - l * o),
                      (s = 2 * l - r),
                      i.length > 3 && (i[3] = Number(i[3])),
                      (i[0] = pt(a + 1 / 3, s, r)),
                      (i[1] = pt(a, s, r)),
                      (i[2] = pt(a - 1 / 3, s, r));
                else i = t.match(T) || ct.transparent;
                (i[0] = Number(i[0])),
                  (i[1] = Number(i[1])),
                  (i[2] = Number(i[2])),
                  i.length > 3 && (i[3] = Number(i[3]));
              }
            else i = ct.black;
            return (
              e &&
                !f &&
                ((s = i[0] / 255),
                (r = i[1] / 255),
                (n = i[2] / 255),
                (l = ((h = Math.max(s, r, n)) + (_ = Math.min(s, r, n))) / 2),
                h === _
                  ? (a = o = 0)
                  : ((u = h - _),
                    (o = l > 0.5 ? u / (2 - h - _) : u / (h + _)),
                    (a =
                      h === s
                        ? (r - n) / u + (n > r ? 6 : 0)
                        : h === r
                        ? (n - s) / u + 2
                        : (s - r) / u + 4),
                    (a *= 60)),
                (i[0] = (a + 0.5) | 0),
                (i[1] = (100 * o + 0.5) | 0),
                (i[2] = (100 * l + 0.5) | 0)),
              i
            );
          }),
          mt = function (t, e) {
            var i,
              s,
              r,
              n = t.match(gt) || [],
              a = 0,
              o = "";
            if (!n.length) return t;
            for (i = 0; i < n.length; i++)
              (s = n[i]),
                (r = t.substr(a, t.indexOf(s, a) - a)),
                (a += r.length + s.length),
                (s = dt(s, e)),
                3 === s.length && s.push(1),
                (o +=
                  r +
                  (e
                    ? "hsla(" + s[0] + "," + s[1] + "%," + s[2] + "%," + s[3]
                    : "rgba(" + s.join(",")) +
                  ")");
            return o + t.substr(a);
          },
          gt =
            "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (h in ct) gt += "|" + h + "\\b";
        (gt = new RegExp(gt + ")", "gi")),
          (a.colorStringFilter = function (t) {
            var e,
              i = t[0] + " " + t[1];
            gt.test(i) &&
              ((e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla(")),
              (t[0] = mt(t[0], e)),
              (t[1] = mt(t[1], e))),
              (gt.lastIndex = 0);
          }),
          e.defaultStringFilter ||
            (e.defaultStringFilter = a.colorStringFilter);
        var yt = function (t, e, i, s) {
            if (null == t)
              return function (t) {
                return t;
              };
            var r,
              n = e ? (t.match(gt) || [""])[0] : "",
              a = t.split(n).join("").match(b) || [],
              o = t.substr(0, t.indexOf(a[0])),
              l = ")" === t.charAt(t.length - 1) ? ")" : "",
              h = -1 !== t.indexOf(" ") ? " " : ",",
              _ = a.length,
              u = _ > 0 ? a[0].replace(T, "") : "";
            return _
              ? (r = e
                  ? function (t) {
                      var e, f, c, p;
                      if ("number" == typeof t) t += u;
                      else if (s && I.test(t)) {
                        for (
                          p = t.replace(I, "|").split("|"), c = 0;
                          c < p.length;
                          c++
                        )
                          p[c] = r(p[c]);
                        return p.join(",");
                      }
                      if (
                        ((e = (t.match(gt) || [n])[0]),
                        (c = (f = t.split(e).join("").match(b) || []).length),
                        _ > c--)
                      )
                        for (; ++c < _; )
                          f[c] = i ? f[((c - 1) / 2) | 0] : a[c];
                      return (
                        o +
                        f.join(h) +
                        h +
                        e +
                        l +
                        (-1 !== t.indexOf("inset") ? " inset" : "")
                      );
                    }
                  : function (t) {
                      var e, n, f;
                      if ("number" == typeof t) t += u;
                      else if (s && I.test(t)) {
                        for (
                          n = t.replace(I, "|").split("|"), f = 0;
                          f < n.length;
                          f++
                        )
                          n[f] = r(n[f]);
                        return n.join(",");
                      }
                      if (((f = (e = t.match(b) || []).length), _ > f--))
                        for (; ++f < _; )
                          e[f] = i ? e[((f - 1) / 2) | 0] : a[f];
                      return o + e.join(h) + l;
                    })
              : function (t) {
                  return t;
                };
          },
          vt = function (t) {
            return (
              (t = t.split(",")),
              function (e, i, s, r, n, a, o) {
                var l,
                  h = (i + "").split(" ");
                for (o = {}, l = 0; 4 > l; l++)
                  o[t[l]] = h[l] = h[l] || h[((l - 1) / 2) >> 0];
                return r.parse(e, o, n, a);
              }
            );
          },
          Tt =
            ((W._setPluginRatio = function (t) {
              this.plugin.setRatio(t);
              for (
                var e, i, s, r, n, a = this.data, o = a.proxy, l = a.firstMPT;
                l;

              )
                (e = o[l.v]),
                  l.r ? (e = Math.round(e)) : 1e-6 > e && e > -1e-6 && (e = 0),
                  (l.t[l.p] = e),
                  (l = l._next);
              if (
                (a.autoRotate &&
                  (a.autoRotate.rotation = a.mod
                    ? a.mod(o.rotation, this.t)
                    : o.rotation),
                1 === t || 0 === t)
              )
                for (l = a.firstMPT, n = 1 === t ? "e" : "b"; l; ) {
                  if ((i = l.t).type) {
                    if (1 === i.type) {
                      for (r = i.xs0 + i.s + i.xs1, s = 1; s < i.l; s++)
                        r += i["xn" + s] + i["xs" + (s + 1)];
                      i[n] = r;
                    }
                  } else i[n] = i.s + i.xs0;
                  l = l._next;
                }
            }),
            function (t, e, i, s, r) {
              (this.t = t),
                (this.p = e),
                (this.v = i),
                (this.r = r),
                s && ((s._prev = this), (this._next = s));
            }),
          xt =
            ((W._parseToProxy = function (t, e, i, s, r, n) {
              var a,
                o,
                l,
                h,
                _,
                u = s,
                f = {},
                c = {},
                p = i._transform,
                d = B;
              for (
                i._transform = null,
                  B = e,
                  s = _ = i.parse(t, e, s, r),
                  B = d,
                  n &&
                    ((i._transform = p),
                    u && ((u._prev = null), u._prev && (u._prev._next = null)));
                s && s !== u;

              ) {
                if (
                  s.type <= 1 &&
                  ((c[(o = s.p)] = s.s + s.c),
                  (f[o] = s.s),
                  n || ((h = new Tt(s, "s", o, h, s.r)), (s.c = 0)),
                  1 === s.type)
                )
                  for (a = s.l; --a > 0; )
                    (l = "xn" + a),
                      (o = s.p + "_" + l),
                      (c[o] = s.data[l]),
                      (f[o] = s[l]),
                      n || (h = new Tt(s, l, o, h, s.rxp[l]));
                s = s._next;
              }
              return { proxy: f, end: c, firstMPT: h, pt: _ };
            }),
            (W.CSSPropTween = function (t, e, s, r, a, o, l, h, _, u, f) {
              (this.t = t),
                (this.p = e),
                (this.s = s),
                (this.c = r),
                (this.n = l || e),
                t instanceof xt || n.push(this.n),
                (this.r = h),
                (this.type = o || 0),
                _ && ((this.pr = _), (i = !0)),
                (this.b = void 0 === u ? s : u),
                (this.e = void 0 === f ? s + r : f),
                a && ((this._next = a), (a._prev = this));
            })),
          bt = function (t, e, i, s, r, n) {
            var a = new xt(t, e, i, s - i, r, -1, n);
            return (a.b = i), (a.e = a.xs0 = s), a;
          },
          wt = (a.parseComplex = function (t, e, i, s, r, n, o, l, h, u) {
            (i = i || n || ""),
              "function" == typeof s && (s = s(g, m)),
              (o = new xt(t, e, 0, 0, o, u ? 2 : 1, null, !1, l, i, s)),
              (s += ""),
              r &&
                gt.test(s + i) &&
                ((s = [i, s]), a.colorStringFilter(s), (i = s[0]), (s = s[1]));
            var f,
              c,
              p,
              d,
              y,
              v,
              b,
              w,
              P,
              O,
              S,
              k,
              R,
              A = i.split(", ").join(",").split(" "),
              C = s.split(", ").join(",").split(" "),
              D = A.length,
              M = !1 !== _;
            for (
              (-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) &&
                (-1 !== (s + i).indexOf("rgb") || -1 !== (s + i).indexOf("hsl")
                  ? ((A = A.join(" ").replace(I, ", ").split(" ")),
                    (C = C.join(" ").replace(I, ", ").split(" ")))
                  : ((A = A.join(" ").split(",").join(", ").split(" ")),
                    (C = C.join(" ").split(",").join(", ").split(" "))),
                (D = A.length)),
                D !== C.length && (D = (A = (n || "").split(" ")).length),
                o.plugin = h,
                o.setRatio = u,
                gt.lastIndex = 0,
                f = 0;
              D > f;
              f++
            )
              if (((d = A[f]), (y = C[f]), (w = parseFloat(d)), w || 0 === w))
                o.appendXtra(
                  "",
                  w,
                  _t(y, w),
                  y.replace(x, ""),
                  M && -1 !== y.indexOf("px"),
                  !0
                );
              else if (r && gt.test(d))
                (k = y.indexOf(")") + 1),
                  (k = ")" + (k ? y.substr(k) : "")),
                  (R = -1 !== y.indexOf("hsl") && Z),
                  (O = y),
                  (d = dt(d, R)),
                  (y = dt(y, R)),
                  (P = d.length + y.length > 6),
                  P && !Z && 0 === y[3]
                    ? ((o["xs" + o.l] += o.l ? " transparent" : "transparent"),
                      (o.e = o.e.split(C[f]).join("transparent")))
                    : (Z || (P = !1),
                      R
                        ? o
                            .appendXtra(
                              O.substr(0, O.indexOf("hsl")) +
                                (P ? "hsla(" : "hsl("),
                              d[0],
                              _t(y[0], d[0]),
                              ",",
                              !1,
                              !0
                            )
                            .appendXtra("", d[1], _t(y[1], d[1]), "%,", !1)
                            .appendXtra(
                              "",
                              d[2],
                              _t(y[2], d[2]),
                              P ? "%," : "%" + k,
                              !1
                            )
                        : o
                            .appendXtra(
                              O.substr(0, O.indexOf("rgb")) +
                                (P ? "rgba(" : "rgb("),
                              d[0],
                              y[0] - d[0],
                              ",",
                              !0,
                              !0
                            )
                            .appendXtra("", d[1], y[1] - d[1], ",", !0)
                            .appendXtra("", d[2], y[2] - d[2], P ? "," : k, !0),
                      P &&
                        ((d = d.length < 4 ? 1 : d[3]),
                        o.appendXtra(
                          "",
                          d,
                          (y.length < 4 ? 1 : y[3]) - d,
                          k,
                          !1
                        ))),
                  (gt.lastIndex = 0);
              else if ((v = d.match(T))) {
                if (!(b = y.match(x)) || b.length !== v.length) return o;
                for (p = 0, c = 0; c < v.length; c++)
                  (S = v[c]),
                    (O = d.indexOf(S, p)),
                    o.appendXtra(
                      d.substr(p, O - p),
                      Number(S),
                      _t(b[c], S),
                      "",
                      M && "px" === d.substr(O + S.length, 2),
                      0 === c
                    ),
                    (p = O + S.length);
                o["xs" + o.l] += d.substr(p);
              } else o["xs" + o.l] += o.l || o["xs" + o.l] ? " " + y : y;
            if (-1 !== s.indexOf("=") && o.data) {
              for (k = o.xs0 + o.data.s, f = 1; f < o.l; f++)
                k += o["xs" + f] + o.data["xn" + f];
              o.e = k + o["xs" + f];
            }
            return o.l || ((o.type = -1), (o.xs0 = o.e)), o.xfirst || o;
          }),
          Pt = 9;
        for ((h = xt.prototype).l = h.pr = 0; --Pt > 0; )
          (h["xn" + Pt] = 0), (h["xs" + Pt] = "");
        (h.xs0 = ""),
          (h._next =
            h._prev =
            h.xfirst =
            h.data =
            h.plugin =
            h.setRatio =
            h.rxp =
              null),
          (h.appendXtra = function (t, e, i, s, r, n) {
            var a = this,
              o = a.l;
            return (
              (a["xs" + o] += n && (o || a["xs" + o]) ? " " + t : t || ""),
              i || 0 === o || a.plugin
                ? (a.l++,
                  (a.type = a.setRatio ? 2 : 1),
                  (a["xs" + a.l] = s || ""),
                  o > 0
                    ? ((a.data["xn" + o] = e + i),
                      (a.rxp["xn" + o] = r),
                      (a["xn" + o] = e),
                      a.plugin ||
                        ((a.xfirst = new xt(
                          a,
                          "xn" + o,
                          e,
                          i,
                          a.xfirst || a,
                          0,
                          a.n,
                          r,
                          a.pr
                        )),
                        (a.xfirst.xs0 = 0)),
                      a)
                    : ((a.data = { s: e + i }),
                      (a.rxp = {}),
                      (a.s = e),
                      (a.c = i),
                      (a.r = r),
                      a))
                : ((a["xs" + o] += e + (s || "")), a)
            );
          });
        var Ot = function (t, e) {
            (e = e || {}),
              (this.p = (e.prefix && J(t)) || t),
              (l[t] = l[this.p] = this),
              (this.format =
                e.formatter ||
                yt(e.defaultValue, e.color, e.collapsible, e.multi)),
              e.parser && (this.parse = e.parser),
              (this.clrs = e.color),
              (this.multi = e.multi),
              (this.keyword = e.keyword),
              (this.dflt = e.defaultValue),
              (this.pr = e.priority || 0);
          },
          St = (W._registerComplexSpecialProp = function (t, e, i) {
            "object" != typeof e && (e = { parser: i });
            var s,
              r = t.split(","),
              n = e.defaultValue;
            for (i = i || [n], s = 0; s < r.length; s++)
              (e.prefix = 0 === s && e.prefix),
                (e.defaultValue = i[s] || n),
                new Ot(r[s], e);
          }),
          kt = (W._registerPluginProp = function (t) {
            if (!l[t]) {
              var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
              St(t, {
                parser: function (t, i, s, r, n, a, h) {
                  var _ = o.com.greensock.plugins[e];
                  return _
                    ? (_._cssRegister(), l[s].parse(t, i, s, r, n, a, h))
                    : ($("Error: " + e + " js file not loaded."), n);
                },
              });
            }
          });
        ((h = Ot.prototype).parseComplex = function (t, e, i, s, r, n) {
          var a,
            o,
            l,
            h,
            _,
            u,
            f = this.keyword;
          if (
            (this.multi &&
              (I.test(i) || I.test(e)
                ? ((o = e.replace(I, "|").split("|")),
                  (l = i.replace(I, "|").split("|")))
                : f && ((o = [e]), (l = [i]))),
            l)
          ) {
            for (
              h = l.length > o.length ? l.length : o.length, a = 0;
              h > a;
              a++
            )
              (e = o[a] = o[a] || this.dflt),
                (i = l[a] = l[a] || this.dflt),
                f &&
                  ((_ = e.indexOf(f)),
                  (u = i.indexOf(f)),
                  _ !== u &&
                    (-1 === u
                      ? (o[a] = o[a].split(f).join(""))
                      : -1 === _ && (o[a] += " " + f)));
            (e = o.join(", ")), (i = l.join(", "));
          }
          return wt(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n);
        }),
          (h.parse = function (t, e, i, s, n, a, o) {
            return this.parseComplex(
              t.style,
              this.format(et(t, this.p, r, !1, this.dflt)),
              this.format(e),
              n,
              a
            );
          }),
          (a.registerSpecialProp = function (t, e, i) {
            St(t, {
              parser: function (t, s, r, n, a, o, l) {
                var h = new xt(t, r, 0, 0, a, 2, r, !1, i);
                return (h.plugin = o), (h.setRatio = e(t, s, n._tween, r)), h;
              },
              priority: i,
            });
          }),
          (a.useSVGTransformAttr = !0);
        var Rt,
          At,
          Ct,
          Dt,
          Mt,
          Ft =
            "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(
              ","
            ),
          zt = J("transform"),
          Et = Q + "transform",
          It = J("transformOrigin"),
          Xt = null !== J("perspective"),
          Nt = (W.Transform = function () {
            (this.perspective = parseFloat(a.defaultTransformPerspective) || 0),
              (this.force3D =
                !(!1 === a.defaultForce3D || !Xt) &&
                (a.defaultForce3D || "auto"));
          }),
          Lt = _gsScope.SVGElement,
          Bt = function (t, e, i) {
            var s,
              r = j.createElementNS("http://www.w3.org/2000/svg", t),
              n = /([a-z])([A-Z])/g;
            for (s in i)
              r.setAttributeNS(null, s.replace(n, "$1-$2").toLowerCase(), i[s]);
            return e.appendChild(r), r;
          },
          Yt = j.documentElement || {},
          jt =
            ((Mt = d || (/Android/i.test(G) && !_gsScope.chrome)),
            j.createElementNS &&
              !Mt &&
              ((At = Bt("svg", Yt)),
              (Dt = (Ct = Bt("rect", At, {
                width: 100,
                height: 50,
                x: 100,
              })).getBoundingClientRect().width),
              (Ct.style[It] = "50% 50%"),
              (Ct.style[zt] = "scaleX(0.5)"),
              (Mt = Dt === Ct.getBoundingClientRect().width && !(c && Xt)),
              Yt.removeChild(At)),
            Mt),
          Ut = function (t, e, i, s, r, n) {
            var o,
              l,
              h,
              _,
              u,
              f,
              c,
              p,
              d,
              m,
              g,
              y,
              v,
              T,
              x = t._gsTransform,
              b = Gt(t, !0);
            x && ((v = x.xOrigin), (T = x.yOrigin)),
              (!s || (o = s.split(" ")).length < 2) &&
                (0 === (c = t.getBBox()).x &&
                  0 === c.y &&
                  c.width + c.height === 0 &&
                  (c = {
                    x:
                      parseFloat(
                        t.hasAttribute("x")
                          ? t.getAttribute("x")
                          : t.hasAttribute("cx")
                          ? t.getAttribute("cx")
                          : 0
                      ) || 0,
                    y:
                      parseFloat(
                        t.hasAttribute("y")
                          ? t.getAttribute("y")
                          : t.hasAttribute("cy")
                          ? t.getAttribute("cy")
                          : 0
                      ) || 0,
                    width: 0,
                    height: 0,
                  }),
                (o = [
                  (-1 !== (e = ht(e).split(" "))[0].indexOf("%")
                    ? (parseFloat(e[0]) / 100) * c.width
                    : parseFloat(e[0])) + c.x,
                  (-1 !== e[1].indexOf("%")
                    ? (parseFloat(e[1]) / 100) * c.height
                    : parseFloat(e[1])) + c.y,
                ])),
              (i.xOrigin = _ = parseFloat(o[0])),
              (i.yOrigin = u = parseFloat(o[1])),
              s &&
                b !== Wt &&
                ((f = b[0]),
                (c = b[1]),
                (p = b[2]),
                (d = b[3]),
                (m = b[4]),
                (g = b[5]),
                (y = f * d - c * p) &&
                  ((l = _ * (d / y) + u * (-p / y) + (p * g - d * m) / y),
                  (h = _ * (-c / y) + u * (f / y) - (f * g - c * m) / y),
                  (_ = i.xOrigin = o[0] = l),
                  (u = i.yOrigin = o[1] = h))),
              x &&
                (n &&
                  ((i.xOffset = x.xOffset), (i.yOffset = x.yOffset), (x = i)),
                r || (!1 !== r && !1 !== a.defaultSmoothOrigin)
                  ? ((l = _ - v),
                    (h = u - T),
                    (x.xOffset += l * b[0] + h * b[2] - l),
                    (x.yOffset += l * b[1] + h * b[3] - h))
                  : (x.xOffset = x.yOffset = 0)),
              n || t.setAttribute("data-svg-origin", o.join(" "));
          },
          Vt = function (t) {
            var e,
              i = U(
                "svg",
                (this.ownerSVGElement &&
                  this.ownerSVGElement.getAttribute("xmlns")) ||
                  "http://www.w3.org/2000/svg"
              ),
              s = this.parentNode,
              r = this.nextSibling,
              n = this.style.cssText;
            if (
              (Yt.appendChild(i),
              i.appendChild(this),
              (this.style.display = "block"),
              t)
            )
              try {
                (e = this.getBBox()),
                  (this._originalGetBBox = this.getBBox),
                  (this.getBBox = Vt);
              } catch (t) {}
            else this._originalGetBBox && (e = this._originalGetBBox());
            return (
              r ? s.insertBefore(this, r) : s.appendChild(this),
              Yt.removeChild(i),
              (this.style.cssText = n),
              e
            );
          },
          qt = function (t) {
            return !(
              !Lt ||
              !t.getCTM ||
              (t.parentNode && !t.ownerSVGElement) ||
              !(function (t) {
                try {
                  return t.getBBox();
                } catch (e) {
                  return Vt.call(t, !0);
                }
              })(t)
            );
          },
          Wt = [1, 0, 0, 1, 0, 0],
          Gt = function (t, e) {
            var i,
              s,
              r,
              n,
              a,
              o,
              l = t._gsTransform || new Nt(),
              h = t.style;
            if (
              (zt
                ? (s = et(t, Et, null, !0))
                : t.currentStyle &&
                  (s =
                    (s = t.currentStyle.filter.match(z)) && 4 === s.length
                      ? [
                          s[0].substr(4),
                          Number(s[2].substr(4)),
                          Number(s[1].substr(4)),
                          s[3].substr(4),
                          l.x || 0,
                          l.y || 0,
                        ].join(",")
                      : ""),
              (i = !s || "none" === s || "matrix(1, 0, 0, 1, 0, 0)" === s),
              !zt ||
                (!(o = !tt(t) || "none" === tt(t).display) && t.parentNode) ||
                (o && ((n = h.display), (h.display = "block")),
                t.parentNode || ((a = 1), Yt.appendChild(t)),
                (i =
                  !(s = et(t, Et, null, !0)) ||
                  "none" === s ||
                  "matrix(1, 0, 0, 1, 0, 0)" === s),
                n ? (h.display = n) : o && Kt(h, "display"),
                a && Yt.removeChild(t)),
              (l.svg || (t.getCTM && qt(t))) &&
                (i &&
                  -1 !== (h[zt] + "").indexOf("matrix") &&
                  ((s = h[zt]), (i = 0)),
                (r = t.getAttribute("transform")),
                i &&
                  r &&
                  (-1 !== r.indexOf("matrix")
                    ? ((s = r), (i = 0))
                    : -1 !== r.indexOf("translate") &&
                      ((s =
                        "matrix(1,0,0,1," +
                        r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") +
                        ")"),
                      (i = 0)))),
              i)
            )
              return Wt;
            for (r = (s || "").match(T) || [], Pt = r.length; --Pt > -1; )
              (n = Number(r[Pt])),
                (r[Pt] = (a = n - (n |= 0))
                  ? ((1e5 * a + (0 > a ? -0.5 : 0.5)) | 0) / 1e5 + n
                  : n);
            return e && r.length > 6
              ? [r[0], r[1], r[4], r[5], r[12], r[13]]
              : r;
          },
          Zt = (W.getTransform = function (t, i, s, r) {
            if (t._gsTransform && s && !r) return t._gsTransform;
            var n,
              o,
              l,
              h,
              _,
              u,
              f = (s && t._gsTransform) || new Nt(),
              c = f.scaleX < 0,
              p =
                (Xt &&
                  (parseFloat(et(t, It, i, !1, "0 0 0").split(" ")[2]) ||
                    f.zOrigin)) ||
                0,
              d = parseFloat(a.defaultTransformPerspective) || 0;
            if (
              ((f.svg = !(!t.getCTM || !qt(t))),
              f.svg &&
                (Ut(
                  t,
                  et(t, It, i, !1, "50% 50%") + "",
                  f,
                  t.getAttribute("data-svg-origin")
                ),
                (Rt = a.useSVGTransformAttr || jt)),
              (n = Gt(t)) !== Wt)
            ) {
              if (16 === n.length) {
                var m,
                  g,
                  y,
                  v,
                  T,
                  x = n[0],
                  b = n[1],
                  w = n[2],
                  P = n[3],
                  O = n[4],
                  S = n[5],
                  k = n[6],
                  R = n[7],
                  A = n[8],
                  C = n[9],
                  D = n[10],
                  M = n[12],
                  F = n[13],
                  z = n[14],
                  E = n[11],
                  I = Math.atan2(k, D);
                f.zOrigin &&
                  ((M = A * (z = -f.zOrigin) - n[12]),
                  (F = C * z - n[13]),
                  (z = D * z + f.zOrigin - n[14])),
                  (f.rotationX = I * L),
                  I &&
                    ((m = O * (v = Math.cos(-I)) + A * (T = Math.sin(-I))),
                    (g = S * v + C * T),
                    (y = k * v + D * T),
                    (A = O * -T + A * v),
                    (C = S * -T + C * v),
                    (D = k * -T + D * v),
                    (E = R * -T + E * v),
                    (O = m),
                    (S = g),
                    (k = y)),
                  (I = Math.atan2(-w, D)),
                  (f.rotationY = I * L),
                  I &&
                    ((g = b * (v = Math.cos(-I)) - C * (T = Math.sin(-I))),
                    (y = w * v - D * T),
                    (C = b * T + C * v),
                    (D = w * T + D * v),
                    (E = P * T + E * v),
                    (x = m = x * v - A * T),
                    (b = g),
                    (w = y)),
                  (I = Math.atan2(b, x)),
                  (f.rotation = I * L),
                  I &&
                    ((m = x * (v = Math.cos(I)) + b * (T = Math.sin(I))),
                    (g = O * v + S * T),
                    (y = A * v + C * T),
                    (b = b * v - x * T),
                    (S = S * v - O * T),
                    (C = C * v - A * T),
                    (x = m),
                    (O = g),
                    (A = y)),
                  f.rotationX &&
                    Math.abs(f.rotationX) + Math.abs(f.rotation) > 359.9 &&
                    ((f.rotationX = f.rotation = 0),
                    (f.rotationY = 180 - f.rotationY)),
                  (I = Math.atan2(O, S)),
                  (f.scaleX =
                    ((1e5 * Math.sqrt(x * x + b * b + w * w) + 0.5) | 0) / 1e5),
                  (f.scaleY =
                    ((1e5 * Math.sqrt(S * S + k * k) + 0.5) | 0) / 1e5),
                  (f.scaleZ =
                    ((1e5 * Math.sqrt(A * A + C * C + D * D) + 0.5) | 0) / 1e5),
                  (x /= f.scaleX),
                  (O /= f.scaleY),
                  (b /= f.scaleX),
                  (S /= f.scaleY),
                  Math.abs(I) > 2e-5
                    ? ((f.skewX = I * L),
                      (O = 0),
                      "simple" !== f.skewType && (f.scaleY *= 1 / Math.cos(I)))
                    : (f.skewX = 0),
                  (f.perspective = E ? 1 / (0 > E ? -E : E) : 0),
                  (f.x = M),
                  (f.y = F),
                  (f.z = z),
                  f.svg &&
                    ((f.x -= f.xOrigin - (f.xOrigin * x - f.yOrigin * O)),
                    (f.y -= f.yOrigin - (f.yOrigin * b - f.xOrigin * S)));
              } else if (
                !Xt ||
                r ||
                !n.length ||
                f.x !== n[4] ||
                f.y !== n[5] ||
                (!f.rotationX && !f.rotationY)
              ) {
                var X = n.length >= 6,
                  N = X ? n[0] : 1,
                  B = n[1] || 0,
                  Y = n[2] || 0,
                  j = X ? n[3] : 1;
                (f.x = n[4] || 0),
                  (f.y = n[5] || 0),
                  (l = Math.sqrt(N * N + B * B)),
                  (h = Math.sqrt(j * j + Y * Y)),
                  (_ = N || B ? Math.atan2(B, N) * L : f.rotation || 0),
                  (u = Y || j ? Math.atan2(Y, j) * L + _ : f.skewX || 0),
                  (f.scaleX = l),
                  (f.scaleY = h),
                  (f.rotation = _),
                  (f.skewX = u),
                  Xt &&
                    ((f.rotationX = f.rotationY = f.z = 0),
                    (f.perspective = d),
                    (f.scaleZ = 1)),
                  f.svg &&
                    ((f.x -= f.xOrigin - (f.xOrigin * N + f.yOrigin * Y)),
                    (f.y -= f.yOrigin - (f.xOrigin * B + f.yOrigin * j)));
              }
              Math.abs(f.skewX) > 90 &&
                Math.abs(f.skewX) < 270 &&
                (c
                  ? ((f.scaleX *= -1),
                    (f.skewX += f.rotation <= 0 ? 180 : -180),
                    (f.rotation += f.rotation <= 0 ? 180 : -180))
                  : ((f.scaleY *= -1), (f.skewX += f.skewX <= 0 ? 180 : -180))),
                (f.zOrigin = p);
              for (o in f) f[o] < 2e-5 && f[o] > -2e-5 && (f[o] = 0);
            }
            return (
              s &&
                ((t._gsTransform = f),
                f.svg &&
                  (Rt && t.style[zt]
                    ? e.delayedCall(0.001, function () {
                        Kt(t.style, zt);
                      })
                    : !Rt &&
                      t.getAttribute("transform") &&
                      e.delayedCall(0.001, function () {
                        t.removeAttribute("transform");
                      }))),
              f
            );
          }),
          Ht = function (t) {
            var e,
              i,
              s = this.data,
              r = -s.rotation * N,
              n = r + s.skewX * N,
              a = 1e5,
              o = ((Math.cos(r) * s.scaleX * a) | 0) / a,
              l = ((Math.sin(r) * s.scaleX * a) | 0) / a,
              h = ((Math.sin(n) * -s.scaleY * a) | 0) / a,
              _ = ((Math.cos(n) * s.scaleY * a) | 0) / a,
              u = this.t.style,
              f = this.t.currentStyle;
            if (f) {
              (i = l), (l = -h), (h = -i), (e = f.filter), (u.filter = "");
              var c,
                p,
                m = this.t.offsetWidth,
                g = this.t.offsetHeight,
                y = "absolute" !== f.position,
                v =
                  "progid:DXImageTransform.Microsoft.Matrix(M11=" +
                  o +
                  ", M12=" +
                  l +
                  ", M21=" +
                  h +
                  ", M22=" +
                  _,
                T = s.x + (m * s.xPercent) / 100,
                x = s.y + (g * s.yPercent) / 100;
              if (
                (null != s.ox &&
                  ((T +=
                    (c = (s.oxp ? m * s.ox * 0.01 : s.ox) - m / 2) -
                    (c * o +
                      (p = (s.oyp ? g * s.oy * 0.01 : s.oy) - g / 2) * l)),
                  (x += p - (c * h + p * _))),
                y
                  ? (v +=
                      ", Dx=" +
                      ((c = m / 2) - (c * o + (p = g / 2) * l) + T) +
                      ", Dy=" +
                      (p - (c * h + p * _) + x) +
                      ")")
                  : (v += ", sizingMethod='auto expand')"),
                -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(")
                  ? (u.filter = e.replace(E, v))
                  : (u.filter = v + " " + e),
                (0 === t || 1 === t) &&
                  1 === o &&
                  0 === l &&
                  0 === h &&
                  1 === _ &&
                  ((y && -1 === v.indexOf("Dx=0, Dy=0")) ||
                    (O.test(e) && 100 !== parseFloat(RegExp.$1)) ||
                    (-1 === e.indexOf(e.indexOf("Alpha")) &&
                      u.removeAttribute("filter"))),
                !y)
              ) {
                var b,
                  w,
                  S,
                  k = 8 > d ? 1 : -1;
                for (
                  c = s.ieOffsetX || 0,
                    p = s.ieOffsetY || 0,
                    s.ieOffsetX = Math.round(
                      (m - ((0 > o ? -o : o) * m + (0 > l ? -l : l) * g)) / 2 +
                        T
                    ),
                    s.ieOffsetY = Math.round(
                      (g - ((0 > _ ? -_ : _) * g + (0 > h ? -h : h) * m)) / 2 +
                        x
                    ),
                    Pt = 0;
                  4 > Pt;
                  Pt++
                )
                  (w = ot[Pt]),
                    (b = f[w]),
                    (i =
                      -1 !== b.indexOf("px")
                        ? parseFloat(b)
                        : it(this.t, w, parseFloat(b), b.replace(P, "")) || 0),
                    (S =
                      i !== s[w]
                        ? 2 > Pt
                          ? -s.ieOffsetX
                          : -s.ieOffsetY
                        : 2 > Pt
                        ? c - s.ieOffsetX
                        : p - s.ieOffsetY),
                    (u[w] =
                      (s[w] = Math.round(
                        i - S * (0 === Pt || 2 === Pt ? 1 : k)
                      )) + "px");
              }
            }
          },
          $t =
            (W.set3DTransformRatio =
            W.setTransformRatio =
              function (t) {
                var e,
                  i,
                  s,
                  r,
                  n,
                  a,
                  o,
                  l,
                  h,
                  _,
                  u,
                  f,
                  p,
                  d,
                  m,
                  g,
                  y,
                  v,
                  T,
                  x,
                  b,
                  w,
                  P,
                  O = this.data,
                  S = this.t.style,
                  k = O.rotation,
                  R = O.rotationX,
                  A = O.rotationY,
                  C = O.scaleX,
                  D = O.scaleY,
                  M = O.scaleZ,
                  F = O.x,
                  z = O.y,
                  E = O.z,
                  I = O.svg,
                  X = O.perspective,
                  L = O.force3D,
                  B = O.skewY,
                  Y = O.skewX;
                if (
                  (B && ((Y += B), (k += B)),
                  !(
                    (((1 !== t && 0 !== t) ||
                      "auto" !== L ||
                      (this.tween._totalTime !== this.tween._totalDuration &&
                        this.tween._totalTime)) &&
                      L) ||
                    E ||
                    X ||
                    A ||
                    R ||
                    1 !== M
                  ) ||
                    (Rt && I) ||
                    !Xt)
                )
                  k || Y || I
                    ? ((k *= N),
                      (w = Y * N),
                      (P = 1e5),
                      (i = Math.cos(k) * C),
                      (n = Math.sin(k) * C),
                      (s = Math.sin(k - w) * -D),
                      (a = Math.cos(k - w) * D),
                      w &&
                        "simple" === O.skewType &&
                        ((e = Math.tan(w - B * N)),
                        (s *= e = Math.sqrt(1 + e * e)),
                        (a *= e),
                        B &&
                          ((e = Math.tan(B * N)),
                          (i *= e = Math.sqrt(1 + e * e)),
                          (n *= e))),
                      I &&
                        ((F +=
                          O.xOrigin -
                          (O.xOrigin * i + O.yOrigin * s) +
                          O.xOffset),
                        (z +=
                          O.yOrigin -
                          (O.xOrigin * n + O.yOrigin * a) +
                          O.yOffset),
                        Rt &&
                          (O.xPercent || O.yPercent) &&
                          ((m = this.t.getBBox()),
                          (F += 0.01 * O.xPercent * m.width),
                          (z += 0.01 * O.yPercent * m.height)),
                        (m = 1e-6) > F && F > -m && (F = 0),
                        m > z && z > -m && (z = 0)),
                      (T =
                        ((i * P) | 0) / P +
                        "," +
                        ((n * P) | 0) / P +
                        "," +
                        ((s * P) | 0) / P +
                        "," +
                        ((a * P) | 0) / P +
                        "," +
                        F +
                        "," +
                        z +
                        ")"),
                      I && Rt
                        ? this.t.setAttribute("transform", "matrix(" + T)
                        : (S[zt] =
                            (O.xPercent || O.yPercent
                              ? "translate(" +
                                O.xPercent +
                                "%," +
                                O.yPercent +
                                "%) matrix("
                              : "matrix(") + T))
                    : (S[zt] =
                        (O.xPercent || O.yPercent
                          ? "translate(" +
                            O.xPercent +
                            "%," +
                            O.yPercent +
                            "%) matrix("
                          : "matrix(") +
                        C +
                        ",0,0," +
                        D +
                        "," +
                        F +
                        "," +
                        z +
                        ")");
                else {
                  if (
                    (c &&
                      ((m = 1e-4) > C && C > -m && (C = M = 2e-5),
                      m > D && D > -m && (D = M = 2e-5),
                      !X || O.z || O.rotationX || O.rotationY || (X = 0)),
                    k || Y)
                  )
                    (k *= N),
                      (g = i = Math.cos(k)),
                      (y = n = Math.sin(k)),
                      Y &&
                        ((k -= Y * N),
                        (g = Math.cos(k)),
                        (y = Math.sin(k)),
                        "simple" === O.skewType &&
                          ((e = Math.tan((Y - B) * N)),
                          (e = Math.sqrt(1 + e * e)),
                          (g *= e),
                          (y *= e),
                          O.skewY &&
                            ((e = Math.tan(B * N)),
                            (e = Math.sqrt(1 + e * e)),
                            (i *= e),
                            (n *= e)))),
                      (s = -y),
                      (a = g);
                  else {
                    if (!(A || R || 1 !== M || X || I))
                      return void (S[zt] =
                        (O.xPercent || O.yPercent
                          ? "translate(" +
                            O.xPercent +
                            "%," +
                            O.yPercent +
                            "%) translate3d("
                          : "translate3d(") +
                        F +
                        "px," +
                        z +
                        "px," +
                        E +
                        "px)" +
                        (1 !== C || 1 !== D
                          ? " scale(" + C + "," + D + ")"
                          : ""));
                    (i = a = 1), (s = n = 0);
                  }
                  (_ = 1),
                    (r = o = l = h = u = f = 0),
                    (p = X ? -1 / X : 0),
                    (d = O.zOrigin),
                    (m = 1e-6),
                    (x = ","),
                    (b = "0"),
                    (k = A * N) &&
                      ((g = Math.cos(k)),
                      (l = -(y = Math.sin(k))),
                      (u = p * -y),
                      (r = i * y),
                      (o = n * y),
                      (_ = g),
                      (p *= g),
                      (i *= g),
                      (n *= g)),
                    (k = R * N) &&
                      ((e = s * (g = Math.cos(k)) + r * (y = Math.sin(k))),
                      (v = a * g + o * y),
                      (h = _ * y),
                      (f = p * y),
                      (r = s * -y + r * g),
                      (o = a * -y + o * g),
                      (_ *= g),
                      (p *= g),
                      (s = e),
                      (a = v)),
                    1 !== M && ((r *= M), (o *= M), (_ *= M), (p *= M)),
                    1 !== D && ((s *= D), (a *= D), (h *= D), (f *= D)),
                    1 !== C && ((i *= C), (n *= C), (l *= C), (u *= C)),
                    (d || I) &&
                      (d && ((F += r * -d), (z += o * -d), (E += _ * -d + d)),
                      I &&
                        ((F +=
                          O.xOrigin -
                          (O.xOrigin * i + O.yOrigin * s) +
                          O.xOffset),
                        (z +=
                          O.yOrigin -
                          (O.xOrigin * n + O.yOrigin * a) +
                          O.yOffset)),
                      m > F && F > -m && (F = b),
                      m > z && z > -m && (z = b),
                      m > E && E > -m && (E = 0)),
                    (T =
                      O.xPercent || O.yPercent
                        ? "translate(" +
                          O.xPercent +
                          "%," +
                          O.yPercent +
                          "%) matrix3d("
                        : "matrix3d("),
                    (T +=
                      (m > i && i > -m ? b : i) +
                      x +
                      (m > n && n > -m ? b : n) +
                      x +
                      (m > l && l > -m ? b : l)),
                    (T +=
                      x +
                      (m > u && u > -m ? b : u) +
                      x +
                      (m > s && s > -m ? b : s) +
                      x +
                      (m > a && a > -m ? b : a)),
                    R || A || 1 !== M
                      ? ((T +=
                          x +
                          (m > h && h > -m ? b : h) +
                          x +
                          (m > f && f > -m ? b : f) +
                          x +
                          (m > r && r > -m ? b : r)),
                        (T +=
                          x +
                          (m > o && o > -m ? b : o) +
                          x +
                          (m > _ && _ > -m ? b : _) +
                          x +
                          (m > p && p > -m ? b : p) +
                          x))
                      : (T += ",0,0,0,0,1,0,"),
                    (T += F + x + z + x + E + x + (X ? 1 + -E / X : 1) + ")"),
                    (S[zt] = T);
                }
              });
        ((h = Nt.prototype).x =
          h.y =
          h.z =
          h.skewX =
          h.skewY =
          h.rotation =
          h.rotationX =
          h.rotationY =
          h.zOrigin =
          h.xPercent =
          h.yPercent =
          h.xOffset =
          h.yOffset =
            0),
          (h.scaleX = h.scaleY = h.scaleZ = 1),
          St(
            "transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",
            {
              parser: function (t, e, i, s, n, o, l) {
                if (s._lastParsedTransform === l) return n;
                s._lastParsedTransform = l;
                var h,
                  _ = l.scale && "function" == typeof l.scale ? l.scale : 0;
                "function" == typeof l[i] && ((h = l[i]), (l[i] = e)),
                  _ && (l.scale = _(g, t));
                var u,
                  f,
                  c,
                  p,
                  d,
                  y,
                  v,
                  T,
                  x,
                  b = t._gsTransform,
                  w = t.style,
                  P = Ft.length,
                  O = l,
                  S = {},
                  k = "transformOrigin",
                  R = Zt(t, r, !0, O.parseTransform),
                  A =
                    O.transform &&
                    ("function" == typeof O.transform
                      ? O.transform(g, m)
                      : O.transform);
                if (
                  ((R.skewType = O.skewType || R.skewType || a.defaultSkewType),
                  (s._transform = R),
                  A && "string" == typeof A && zt)
                )
                  (f = V.style),
                    (f[zt] = A),
                    (f.display = "block"),
                    (f.position = "absolute"),
                    j.body.appendChild(V),
                    (u = Zt(V, null, !1)),
                    "simple" === R.skewType &&
                      (u.scaleY *= Math.cos(u.skewX * N)),
                    R.svg &&
                      ((y = R.xOrigin),
                      (v = R.yOrigin),
                      (u.x -= R.xOffset),
                      (u.y -= R.yOffset),
                      (O.transformOrigin || O.svgOrigin) &&
                        ((A = {}),
                        Ut(
                          t,
                          ht(O.transformOrigin),
                          A,
                          O.svgOrigin,
                          O.smoothOrigin,
                          !0
                        ),
                        (y = A.xOrigin),
                        (v = A.yOrigin),
                        (u.x -= A.xOffset - R.xOffset),
                        (u.y -= A.yOffset - R.yOffset)),
                      (y || v) &&
                        ((T = Gt(V, !0)),
                        (u.x -= y - (y * T[0] + v * T[2])),
                        (u.y -= v - (y * T[1] + v * T[3])))),
                    j.body.removeChild(V),
                    u.perspective || (u.perspective = R.perspective),
                    null != O.xPercent &&
                      (u.xPercent = ut(O.xPercent, R.xPercent)),
                    null != O.yPercent &&
                      (u.yPercent = ut(O.yPercent, R.yPercent));
                else if ("object" == typeof O) {
                  if (
                    ((u = {
                      scaleX: ut(
                        null != O.scaleX ? O.scaleX : O.scale,
                        R.scaleX
                      ),
                      scaleY: ut(
                        null != O.scaleY ? O.scaleY : O.scale,
                        R.scaleY
                      ),
                      scaleZ: ut(O.scaleZ, R.scaleZ),
                      x: ut(O.x, R.x),
                      y: ut(O.y, R.y),
                      z: ut(O.z, R.z),
                      xPercent: ut(O.xPercent, R.xPercent),
                      yPercent: ut(O.yPercent, R.yPercent),
                      perspective: ut(O.transformPerspective, R.perspective),
                    }),
                    null != (d = O.directionalRotation))
                  )
                    if ("object" == typeof d) for (f in d) O[f] = d[f];
                    else O.rotation = d;
                  "string" == typeof O.x &&
                    -1 !== O.x.indexOf("%") &&
                    ((u.x = 0), (u.xPercent = ut(O.x, R.xPercent))),
                    "string" == typeof O.y &&
                      -1 !== O.y.indexOf("%") &&
                      ((u.y = 0), (u.yPercent = ut(O.y, R.yPercent))),
                    (u.rotation = ft(
                      "rotation" in O
                        ? O.rotation
                        : "shortRotation" in O
                        ? O.shortRotation + "_short"
                        : "rotationZ" in O
                        ? O.rotationZ
                        : R.rotation,
                      R.rotation,
                      "rotation",
                      S
                    )),
                    Xt &&
                      ((u.rotationX = ft(
                        "rotationX" in O
                          ? O.rotationX
                          : "shortRotationX" in O
                          ? O.shortRotationX + "_short"
                          : R.rotationX || 0,
                        R.rotationX,
                        "rotationX",
                        S
                      )),
                      (u.rotationY = ft(
                        "rotationY" in O
                          ? O.rotationY
                          : "shortRotationY" in O
                          ? O.shortRotationY + "_short"
                          : R.rotationY || 0,
                        R.rotationY,
                        "rotationY",
                        S
                      ))),
                    (u.skewX = ft(O.skewX, R.skewX)),
                    (u.skewY = ft(O.skewY, R.skewY));
                }
                for (
                  Xt &&
                    null != O.force3D &&
                    ((R.force3D = O.force3D), (p = !0)),
                    (c =
                      R.force3D ||
                      R.z ||
                      R.rotationX ||
                      R.rotationY ||
                      u.z ||
                      u.rotationX ||
                      u.rotationY ||
                      u.perspective) ||
                      null == O.scale ||
                      (u.scaleZ = 1);
                  --P > -1;

                )
                  (x = Ft[P]),
                    (A = u[x] - R[x]),
                    (A > 1e-6 || -1e-6 > A || null != O[x] || null != B[x]) &&
                      ((p = !0),
                      (n = new xt(R, x, R[x], A, n)),
                      x in S && (n.e = S[x]),
                      (n.xs0 = 0),
                      (n.plugin = o),
                      s._overwriteProps.push(n.n));
                return (
                  (A = O.transformOrigin),
                  R.svg &&
                    (A || O.svgOrigin) &&
                    ((y = R.xOffset),
                    (v = R.yOffset),
                    Ut(t, ht(A), u, O.svgOrigin, O.smoothOrigin),
                    (n = bt(
                      R,
                      "xOrigin",
                      (b ? R : u).xOrigin,
                      u.xOrigin,
                      n,
                      k
                    )),
                    (n = bt(
                      R,
                      "yOrigin",
                      (b ? R : u).yOrigin,
                      u.yOrigin,
                      n,
                      k
                    )),
                    (y !== R.xOffset || v !== R.yOffset) &&
                      ((n = bt(
                        R,
                        "xOffset",
                        b ? y : R.xOffset,
                        R.xOffset,
                        n,
                        k
                      )),
                      (n = bt(
                        R,
                        "yOffset",
                        b ? v : R.yOffset,
                        R.yOffset,
                        n,
                        k
                      ))),
                    (A = "0px 0px")),
                  (A || (Xt && c && R.zOrigin)) &&
                    (zt
                      ? ((p = !0),
                        (x = It),
                        (A = (A || et(t, x, r, !1, "50% 50%")) + ""),
                        ((n = new xt(w, x, 0, 0, n, -1, k)).b = w[x]),
                        (n.plugin = o),
                        Xt
                          ? ((f = R.zOrigin),
                            (A = A.split(" ")),
                            (R.zOrigin =
                              (A.length > 2 && (0 === f || "0px" !== A[2])
                                ? parseFloat(A[2])
                                : f) || 0),
                            (n.xs0 = n.e =
                              A[0] + " " + (A[1] || "50%") + " 0px"),
                            ((n = new xt(R, "zOrigin", 0, 0, n, -1, n.n)).b =
                              f),
                            (n.xs0 = n.e = R.zOrigin))
                          : (n.xs0 = n.e = A))
                      : ht(A + "", R)),
                  p &&
                    (s._transformType =
                      (R.svg && Rt) || (!c && 3 !== this._transformType)
                        ? 2
                        : 3),
                  h && (l[i] = h),
                  _ && (l.scale = _),
                  n
                );
              },
              prefix: !0,
            }
          ),
          St("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset",
          }),
          St("borderRadius", {
            defaultValue: "0px",
            parser: function (t, e, i, n, a, o) {
              e = this.format(e);
              var l,
                h,
                _,
                u,
                f,
                c,
                p,
                d,
                m,
                g,
                y,
                v,
                T,
                x,
                b,
                w,
                P = [
                  "borderTopLeftRadius",
                  "borderTopRightRadius",
                  "borderBottomRightRadius",
                  "borderBottomLeftRadius",
                ],
                O = t.style;
              for (
                m = parseFloat(t.offsetWidth),
                  g = parseFloat(t.offsetHeight),
                  l = e.split(" "),
                  h = 0;
                h < P.length;
                h++
              )
                this.p.indexOf("border") && (P[h] = J(P[h])),
                  (f = u = et(t, P[h], r, !1, "0px")),
                  -1 !== f.indexOf(" ") &&
                    ((u = f.split(" ")), (f = u[0]), (u = u[1])),
                  (c = _ = l[h]),
                  (p = parseFloat(f)),
                  (v = f.substr((p + "").length)),
                  (T = "=" === c.charAt(1)),
                  T
                    ? ((d = parseInt(c.charAt(0) + "1", 10)),
                      (c = c.substr(2)),
                      (d *= parseFloat(c)),
                      (y = c.substr((d + "").length - (0 > d ? 1 : 0)) || ""))
                    : ((d = parseFloat(c)), (y = c.substr((d + "").length))),
                  "" === y && (y = s[i] || v),
                  y !== v &&
                    ((x = it(t, "borderLeft", p, v)),
                    (b = it(t, "borderTop", p, v)),
                    "%" === y
                      ? ((f = (x / m) * 100 + "%"), (u = (b / g) * 100 + "%"))
                      : "em" === y
                      ? ((w = it(t, "borderLeft", 1, "em")),
                        (f = x / w + "em"),
                        (u = b / w + "em"))
                      : ((f = x + "px"), (u = b + "px")),
                    T &&
                      ((c = parseFloat(f) + d + y),
                      (_ = parseFloat(u) + d + y))),
                  (a = wt(O, P[h], f + " " + u, c + " " + _, !1, "0px", a));
              return a;
            },
            prefix: !0,
            formatter: yt("0px 0px 0px 0px", !1, !0),
          }),
          St(
            "borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",
            {
              defaultValue: "0px",
              parser: function (t, e, i, s, n, a) {
                return wt(
                  t.style,
                  i,
                  this.format(et(t, i, r, !1, "0px 0px")),
                  this.format(e),
                  !1,
                  "0px",
                  n
                );
              },
              prefix: !0,
              formatter: yt("0px 0px", !1, !0),
            }
          ),
          St("backgroundPosition", {
            defaultValue: "0 0",
            parser: function (t, e, i, s, n, a) {
              var o,
                l,
                h,
                _,
                u,
                f,
                c = "background-position",
                p = r || tt(t, null),
                m = this.format(
                  (p
                    ? d
                      ? p.getPropertyValue(c + "-x") +
                        " " +
                        p.getPropertyValue(c + "-y")
                      : p.getPropertyValue(c)
                    : t.currentStyle.backgroundPositionX +
                      " " +
                      t.currentStyle.backgroundPositionY) || "0 0"
                ),
                g = this.format(e);
              if (
                (-1 !== m.indexOf("%")) != (-1 !== g.indexOf("%")) &&
                g.split(",").length < 2 &&
                (f = et(t, "backgroundImage").replace(D, "")) &&
                "none" !== f
              ) {
                for (
                  o = m.split(" "),
                    l = g.split(" "),
                    q.setAttribute("src", f),
                    h = 2;
                  --h > -1;

                )
                  (m = o[h]),
                    (_ = -1 !== m.indexOf("%")),
                    _ !== (-1 !== l[h].indexOf("%")) &&
                      ((u =
                        0 === h
                          ? t.offsetWidth - q.width
                          : t.offsetHeight - q.height),
                      (o[h] = _
                        ? (parseFloat(m) / 100) * u + "px"
                        : (parseFloat(m) / u) * 100 + "%"));
                m = o.join(" ");
              }
              return this.parseComplex(t.style, m, g, n, a);
            },
            formatter: ht,
          }),
          St("backgroundSize", {
            defaultValue: "0 0",
            formatter: function (t) {
              return ht(-1 === (t += "").indexOf(" ") ? t + " " + t : t);
            },
          }),
          St("perspective", { defaultValue: "0px", prefix: !0 }),
          St("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }),
          St("transformStyle", { prefix: !0 }),
          St("backfaceVisibility", { prefix: !0 }),
          St("userSelect", { prefix: !0 }),
          St("margin", {
            parser: vt("marginTop,marginRight,marginBottom,marginLeft"),
          }),
          St("padding", {
            parser: vt("paddingTop,paddingRight,paddingBottom,paddingLeft"),
          }),
          St("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (t, e, i, s, n, a) {
              var o, l, h;
              return (
                9 > d
                  ? ((l = t.currentStyle),
                    (h = 8 > d ? " " : ","),
                    (o =
                      "rect(" +
                      l.clipTop +
                      h +
                      l.clipRight +
                      h +
                      l.clipBottom +
                      h +
                      l.clipLeft +
                      ")"),
                    (e = this.format(e).split(",").join(h)))
                  : ((o = this.format(et(t, this.p, r, !1, this.dflt))),
                    (e = this.format(e))),
                this.parseComplex(t.style, o, e, n, a)
              );
            },
          }),
          St("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0,
          }),
          St("autoRound,strictUnits", {
            parser: function (t, e, i, s, r) {
              return r;
            },
          }),
          St("border", {
            defaultValue: "0px solid #000",
            parser: function (t, e, i, s, n, a) {
              var o = et(t, "borderTopWidth", r, !1, "0px"),
                l = this.format(e).split(" "),
                h = l[0].replace(P, "");
              return (
                "px" !== h &&
                  (o = parseFloat(o) / it(t, "borderTopWidth", 1, h) + h),
                this.parseComplex(
                  t.style,
                  this.format(
                    o +
                      " " +
                      et(t, "borderTopStyle", r, !1, "solid") +
                      " " +
                      et(t, "borderTopColor", r, !1, "#000")
                  ),
                  l.join(" "),
                  n,
                  a
                )
              );
            },
            color: !0,
            formatter: function (t) {
              var e = t.split(" ");
              return (
                e[0] +
                " " +
                (e[1] || "solid") +
                " " +
                (t.match(gt) || ["#000"])[0]
              );
            },
          }),
          St("borderWidth", {
            parser: vt(
              "borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth"
            ),
          }),
          St("float,cssFloat,styleFloat", {
            parser: function (t, e, i, s, r, n) {
              var a = t.style,
                o = "cssFloat" in a ? "cssFloat" : "styleFloat";
              return new xt(a, o, 0, 0, r, -1, i, !1, 0, a[o], e);
            },
          });
        var Qt = function (t) {
          var e,
            i = this.t,
            s = i.filter || et(this.data, "filter") || "",
            r = (this.s + this.c * t) | 0;
          100 === r &&
            (-1 === s.indexOf("atrix(") &&
            -1 === s.indexOf("radient(") &&
            -1 === s.indexOf("oader(")
              ? (i.removeAttribute("filter"), (e = !et(this.data, "filter")))
              : ((i.filter = s.replace(k, "")), (e = !0))),
            e ||
              (this.xn1 && (i.filter = s = s || "alpha(opacity=" + r + ")"),
              -1 === s.indexOf("pacity")
                ? (0 === r && this.xn1) ||
                  (i.filter = s + " alpha(opacity=" + r + ")")
                : (i.filter = s.replace(O, "opacity=" + r)));
        };
        St("opacity,alpha,autoAlpha", {
          defaultValue: "1",
          parser: function (t, e, i, s, n, a) {
            var o = parseFloat(et(t, "opacity", r, !1, "1")),
              l = t.style,
              h = "autoAlpha" === i;
            return (
              "string" == typeof e &&
                "=" === e.charAt(1) &&
                (e =
                  ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o),
              h &&
                1 === o &&
                "hidden" === et(t, "visibility", r) &&
                0 !== e &&
                (o = 0),
              Z
                ? (n = new xt(l, "opacity", o, e - o, n))
                : (((n = new xt(l, "opacity", 100 * o, 100 * (e - o), n)).xn1 =
                    h ? 1 : 0),
                  (l.zoom = 1),
                  (n.type = 2),
                  (n.b = "alpha(opacity=" + n.s + ")"),
                  (n.e = "alpha(opacity=" + (n.s + n.c) + ")"),
                  (n.data = t),
                  (n.plugin = a),
                  (n.setRatio = Qt)),
              h &&
                (((n = new xt(
                  l,
                  "visibility",
                  0,
                  0,
                  n,
                  -1,
                  null,
                  !1,
                  0,
                  0 !== o ? "inherit" : "hidden",
                  0 === e ? "hidden" : "inherit"
                )).xs0 = "inherit"),
                s._overwriteProps.push(n.n),
                s._overwriteProps.push(i)),
              n
            );
          },
        });
        var Kt = function (t, e) {
            e &&
              (t.removeProperty
                ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) &&
                    (e = "-" + e),
                  t.removeProperty(e.replace(A, "-$1").toLowerCase()))
                : t.removeAttribute(e));
          },
          Jt = function (t) {
            if (((this.t._gsClassPT = this), 1 === t || 0 === t)) {
              this.t.setAttribute("class", 0 === t ? this.b : this.e);
              for (var e = this.data, i = this.t.style; e; )
                e.v ? (i[e.p] = e.v) : Kt(i, e.p), (e = e._next);
              1 === t &&
                this.t._gsClassPT === this &&
                (this.t._gsClassPT = null);
            } else
              this.t.getAttribute("class") !== this.e &&
                this.t.setAttribute("class", this.e);
          };
        St("className", {
          parser: function (t, e, s, n, a, o, l) {
            var h,
              _,
              u,
              f,
              c,
              p = t.getAttribute("class") || "",
              d = t.style.cssText;
            if (
              (((a = n._classNamePT = new xt(t, s, 0, 0, a, 2)).setRatio = Jt),
              (a.pr = -11),
              (i = !0),
              (a.b = p),
              (_ = rt(t, r)),
              (u = t._gsClassPT))
            ) {
              for (f = {}, c = u.data; c; ) (f[c.p] = 1), (c = c._next);
              u.setRatio(1);
            }
            return (
              (t._gsClassPT = a),
              (a.e =
                "=" !== e.charAt(1)
                  ? e
                  : p.replace(
                      new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"),
                      ""
                    ) + ("+" === e.charAt(0) ? " " + e.substr(2) : "")),
              t.setAttribute("class", a.e),
              (h = nt(t, _, rt(t), l, f)),
              t.setAttribute("class", p),
              (a.data = h.firstMPT),
              (t.style.cssText = d),
              (a.xfirst = n.parse(t, h.difs, a, o))
            );
          },
        });
        var te = function (t) {
          if (
            (1 === t || 0 === t) &&
            this.data._totalTime === this.data._totalDuration &&
            "isFromStart" !== this.data.data
          ) {
            var e,
              i,
              s,
              r,
              n,
              a = this.t.style,
              o = l.transform.parse;
            if ("all" === this.e) (a.cssText = ""), (r = !0);
            else
              for (
                e = this.e.split(" ").join("").split(","), s = e.length;
                --s > -1;

              )
                (i = e[s]),
                  l[i] &&
                    (l[i].parse === o
                      ? (r = !0)
                      : (i = "transformOrigin" === i ? It : l[i].p)),
                  Kt(a, i);
            r &&
              (Kt(a, zt),
              (n = this.t._gsTransform) &&
                (n.svg &&
                  (this.t.removeAttribute("data-svg-origin"),
                  this.t.removeAttribute("transform")),
                delete this.t._gsTransform));
          }
        };
        for (
          St("clearProps", {
            parser: function (t, e, s, r, n) {
              return (
                ((n = new xt(t, s, 0, 0, n, 2)).setRatio = te),
                (n.e = e),
                (n.pr = -10),
                (n.data = r._tween),
                (i = !0),
                n
              );
            },
          }),
            h = "bezier,throwProps,physicsProps,physics2D".split(","),
            Pt = h.length;
          Pt--;

        )
          kt(h[Pt]);
        ((h = a.prototype)._firstPT =
          h._lastParsedTransform =
          h._transform =
            null),
          (h._onInitTween = function (t, e, o, h) {
            if (!t.nodeType) return !1;
            (this._target = m = t),
              (this._tween = o),
              (this._vars = e),
              (g = h),
              (_ = e.autoRound),
              (i = !1),
              (s = e.suffixMap || a.suffixMap),
              (r = tt(t, "")),
              (n = this._overwriteProps);
            var c,
              d,
              y,
              v,
              T,
              x,
              b,
              w,
              P,
              O = t.style;
            if (
              (u &&
                "" === O.zIndex &&
                ("auto" === (c = et(t, "zIndex", r)) || "" === c) &&
                this._addLazySet(O, "zIndex", 0),
              "string" == typeof e &&
                ((v = O.cssText),
                (c = rt(t, r)),
                (O.cssText = v + ";" + e),
                (c = nt(t, c, rt(t)).difs),
                !Z && S.test(e) && (c.opacity = parseFloat(RegExp.$1)),
                (e = c),
                (O.cssText = v)),
              e.className
                ? (this._firstPT = d =
                    l.className.parse(
                      t,
                      e.className,
                      "className",
                      this,
                      null,
                      null,
                      e
                    ))
                : (this._firstPT = d = this.parse(t, e, null)),
              this._transformType)
            ) {
              for (
                P = 3 === this._transformType,
                  zt
                    ? f &&
                      ((u = !0),
                      "" === O.zIndex &&
                        ("auto" === (b = et(t, "zIndex", r)) || "" === b) &&
                        this._addLazySet(O, "zIndex", 0),
                      p &&
                        this._addLazySet(
                          O,
                          "WebkitBackfaceVisibility",
                          this._vars.WebkitBackfaceVisibility ||
                            (P ? "visible" : "hidden")
                        ))
                    : (O.zoom = 1),
                  y = d;
                y && y._next;

              )
                y = y._next;
              (w = new xt(t, "transform", 0, 0, null, 2)),
                this._linkCSSP(w, null, y),
                (w.setRatio = zt ? $t : Ht),
                (w.data = this._transform || Zt(t, r, !0)),
                (w.tween = o),
                (w.pr = -1),
                n.pop();
            }
            if (i) {
              for (; d; ) {
                for (x = d._next, y = v; y && y.pr > d.pr; ) y = y._next;
                (d._prev = y ? y._prev : T) ? (d._prev._next = d) : (v = d),
                  (d._next = y) ? (y._prev = d) : (T = d),
                  (d = x);
              }
              this._firstPT = v;
            }
            return !0;
          }),
          (h.parse = function (t, e, i, n) {
            var a,
              o,
              h,
              u,
              f,
              c,
              p,
              d,
              y,
              v,
              T = t.style;
            for (a in e) {
              if (
                ("function" == typeof (c = e[a]) && (c = c(g, m)), (o = l[a]))
              )
                i = o.parse(t, c, a, this, i, n, e);
              else {
                if ("--" === a.substr(0, 2)) {
                  this._tween._propLookup[a] = this._addTween.call(
                    this._tween,
                    t.style,
                    "setProperty",
                    tt(t).getPropertyValue(a) + "",
                    c + "",
                    a,
                    !1,
                    a
                  );
                  continue;
                }
                (f = et(t, a, r) + ""),
                  (y = "string" == typeof c),
                  "color" === a ||
                  "fill" === a ||
                  "stroke" === a ||
                  -1 !== a.indexOf("Color") ||
                  (y && R.test(c))
                    ? (y ||
                        (c =
                          ((c = dt(c)).length > 3 ? "rgba(" : "rgb(") +
                          c.join(",") +
                          ")"),
                      (i = wt(T, a, f, c, !0, "transparent", i, 0, n)))
                    : y && X.test(c)
                    ? (i = wt(T, a, f, c, !0, null, i, 0, n))
                    : ((p =
                        (h = parseFloat(f)) || 0 === h
                          ? f.substr((h + "").length)
                          : ""),
                      ("" === f || "auto" === f) &&
                        ("width" === a || "height" === a
                          ? ((h = lt(t, a, r)), (p = "px"))
                          : "left" === a || "top" === a
                          ? ((h = st(t, a, r)), (p = "px"))
                          : ((h = "opacity" !== a ? 0 : 1), (p = ""))),
                      (v = y && "=" === c.charAt(1))
                        ? ((u = parseInt(c.charAt(0) + "1", 10)),
                          (c = c.substr(2)),
                          (u *= parseFloat(c)),
                          (d = c.replace(P, "")))
                        : ((u = parseFloat(c)),
                          (d = y ? c.replace(P, "") : "")),
                      "" === d && (d = a in s ? s[a] : p),
                      (c = u || 0 === u ? (v ? u + h : u) + d : e[a]),
                      p !== d &&
                        ("" !== d || "lineHeight" === a) &&
                        (u || 0 === u) &&
                        h &&
                        ((h = it(t, a, h, p)),
                        "%" === d
                          ? ((h /= it(t, a, 100, "%") / 100),
                            !0 !== e.strictUnits && (f = h + "%"))
                          : "em" === d ||
                            "rem" === d ||
                            "vw" === d ||
                            "vh" === d
                          ? (h /= it(t, a, 1, d))
                          : "px" !== d && ((u = it(t, a, u, d)), (d = "px")),
                        v && (u || 0 === u) && (c = u + h + d)),
                      v && (u += h),
                      (!h && 0 !== h) || (!u && 0 !== u)
                        ? void 0 !== T[a] &&
                          (c || (c + "" != "NaN" && null != c))
                          ? ((i = new xt(
                              T,
                              a,
                              u || h || 0,
                              0,
                              i,
                              -1,
                              a,
                              !1,
                              0,
                              f,
                              c
                            )).xs0 =
                              "none" !== c ||
                              ("display" !== a && -1 === a.indexOf("Style"))
                                ? c
                                : f)
                          : $("invalid " + a + " tween value: " + e[a])
                        : ((i = new xt(
                            T,
                            a,
                            h,
                            u - h,
                            i,
                            0,
                            a,
                            !1 !== _ && ("px" === d || "zIndex" === a),
                            0,
                            f,
                            c
                          )).xs0 = d));
              }
              n && i && !i.plugin && (i.plugin = n);
            }
            return i;
          }),
          (h.setRatio = function (t) {
            var e,
              i,
              s,
              r = this._firstPT;
            if (
              1 !== t ||
              (this._tween._time !== this._tween._duration &&
                0 !== this._tween._time)
            )
              if (
                t ||
                (this._tween._time !== this._tween._duration &&
                  0 !== this._tween._time) ||
                -1e-6 === this._tween._rawPrevTime
              )
                for (; r; ) {
                  if (
                    ((e = r.c * t + r.s),
                    r.r
                      ? (e = Math.round(e))
                      : 1e-6 > e && e > -1e-6 && (e = 0),
                    r.type)
                  )
                    if (1 === r.type)
                      if (((s = r.l), 2 === s))
                        r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                      else if (3 === s)
                        r.t[r.p] =
                          r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                      else if (4 === s)
                        r.t[r.p] =
                          r.xs0 +
                          e +
                          r.xs1 +
                          r.xn1 +
                          r.xs2 +
                          r.xn2 +
                          r.xs3 +
                          r.xn3 +
                          r.xs4;
                      else if (5 === s)
                        r.t[r.p] =
                          r.xs0 +
                          e +
                          r.xs1 +
                          r.xn1 +
                          r.xs2 +
                          r.xn2 +
                          r.xs3 +
                          r.xn3 +
                          r.xs4 +
                          r.xn4 +
                          r.xs5;
                      else {
                        for (i = r.xs0 + e + r.xs1, s = 1; s < r.l; s++)
                          i += r["xn" + s] + r["xs" + (s + 1)];
                        r.t[r.p] = i;
                      }
                    else
                      -1 === r.type
                        ? (r.t[r.p] = r.xs0)
                        : r.setRatio && r.setRatio(t);
                  else r.t[r.p] = e + r.xs0;
                  r = r._next;
                }
              else
                for (; r; )
                  2 !== r.type ? (r.t[r.p] = r.b) : r.setRatio(t),
                    (r = r._next);
            else
              for (; r; ) {
                if (2 !== r.type)
                  if (r.r && -1 !== r.type)
                    if (((e = Math.round(r.s + r.c)), r.type)) {
                      if (1 === r.type) {
                        for (
                          s = r.l, i = r.xs0 + e + r.xs1, s = 1;
                          s < r.l;
                          s++
                        )
                          i += r["xn" + s] + r["xs" + (s + 1)];
                        r.t[r.p] = i;
                      }
                    } else r.t[r.p] = e + r.xs0;
                  else r.t[r.p] = r.e;
                else r.setRatio(t);
                r = r._next;
              }
          }),
          (h._enableTransforms = function (t) {
            (this._transform = this._transform || Zt(this._target, r, !0)),
              (this._transformType =
                (this._transform.svg && Rt) || (!t && 3 !== this._transformType)
                  ? 2
                  : 3);
          });
        var ee = function (t) {
          (this.t[this.p] = this.e),
            this.data._linkCSSP(this, this._next, null, !0);
        };
        (h._addLazySet = function (t, e, i) {
          var s = (this._firstPT = new xt(t, e, 0, 0, this._firstPT, 2));
          (s.e = i), (s.setRatio = ee), (s.data = this);
        }),
          (h._linkCSSP = function (t, e, i, s) {
            return (
              t &&
                (e && (e._prev = t),
                t._next && (t._next._prev = t._prev),
                t._prev
                  ? (t._prev._next = t._next)
                  : this._firstPT === t &&
                    ((this._firstPT = t._next), (s = !0)),
                i
                  ? (i._next = t)
                  : s || null !== this._firstPT || (this._firstPT = t),
                (t._next = e),
                (t._prev = i)),
              t
            );
          }),
          (h._mod = function (t) {
            for (var e = this._firstPT; e; )
              "function" == typeof t[e.p] && t[e.p] === Math.round && (e.r = 1),
                (e = e._next);
          }),
          (h._kill = function (e) {
            var i,
              s,
              r,
              n = e;
            if (e.autoAlpha || e.alpha) {
              n = {};
              for (s in e) n[s] = e[s];
              (n.opacity = 1), n.autoAlpha && (n.visibility = 1);
            }
            for (
              e.className &&
                (i = this._classNamePT) &&
                ((r = i.xfirst) && r._prev
                  ? this._linkCSSP(r._prev, i._next, r._prev._prev)
                  : r === this._firstPT && (this._firstPT = i._next),
                i._next && this._linkCSSP(i._next, i._next._next, r._prev),
                (this._classNamePT = null)),
                i = this._firstPT;
              i;

            )
              i.plugin &&
                i.plugin !== s &&
                i.plugin._kill &&
                (i.plugin._kill(e), (s = i.plugin)),
                (i = i._next);
            return t.prototype._kill.call(this, n);
          });
        var ie = function (t, e, i) {
          var s, r, n, a;
          if (t.slice) for (r = t.length; --r > -1; ) ie(t[r], e, i);
          else
            for (s = t.childNodes, r = s.length; --r > -1; )
              (n = s[r]),
                (a = n.type),
                n.style && (e.push(rt(n)), i && i.push(n)),
                (1 !== a && 9 !== a && 11 !== a) ||
                  !n.childNodes.length ||
                  ie(n, e, i);
        };
        return (
          (a.cascadeTo = function (t, i, s) {
            var r,
              n,
              a,
              o,
              l = e.to(t, i, s),
              h = [l],
              _ = [],
              u = [],
              f = [],
              c = e._internals.reservedProps;
            for (
              t = l._targets || l.target,
                ie(t, _, f),
                l.render(i, !0, !0),
                ie(t, u),
                l.render(0, !0, !0),
                l._enabled(!0),
                r = f.length;
              --r > -1;

            )
              if (((n = nt(f[r], _[r], u[r])), n.firstMPT)) {
                n = n.difs;
                for (a in s) c[a] && (n[a] = s[a]);
                o = {};
                for (a in n) o[a] = _[r][a];
                h.push(e.fromTo(f[r], i, o, n));
              }
            return h;
          }),
          t.activate([a]),
          a
        );
      },
      !0
    ),
    (t = function (t) {
      for (; t; ) t.f || t.blob || (t.m = Math.round), (t = t._next);
    }),
    ((e = _gsScope._gsDefine.plugin({
      propName: "roundProps",
      version: "1.6.0",
      priority: -1,
      API: 2,
      init: function (t, e, i) {
        return (this._tween = i), !0;
      },
    }).prototype)._onInitAllProps = function () {
      for (
        var e,
          i,
          s,
          r = this._tween,
          n = r.vars.roundProps.join
            ? r.vars.roundProps
            : r.vars.roundProps.split(","),
          a = n.length,
          o = {},
          l = r._propLookup.roundProps;
        --a > -1;

      )
        o[n[a]] = Math.round;
      for (a = n.length; --a > -1; )
        for (e = n[a], i = r._firstPT; i; )
          (s = i._next),
            i.pg
              ? i.t._mod(o)
              : i.n === e &&
                (2 === i.f && i.t
                  ? t(i.t._firstPT)
                  : (this._add(i.t, e, i.s, i.c),
                    s && (s._prev = i._prev),
                    i._prev
                      ? (i._prev._next = s)
                      : r._firstPT === i && (r._firstPT = s),
                    (i._next = i._prev = null),
                    (r._propLookup[e] = l))),
            (i = s);
      return !1;
    }),
    (e._add = function (t, e, i, s) {
      this._addTween(t, e, i, i + s, e, Math.round),
        this._overwriteProps.push(e);
    }),
    _gsScope._gsDefine.plugin({
      propName: "attr",
      API: 2,
      version: "0.6.1",
      init: function (t, e, i, s) {
        var r, n;
        if ("function" != typeof t.setAttribute) return !1;
        for (r in e)
          (n = e[r]),
            "function" == typeof n && (n = n(s, t)),
            this._addTween(
              t,
              "setAttribute",
              t.getAttribute(r) + "",
              n + "",
              r,
              !1,
              r
            ),
            this._overwriteProps.push(r);
        return !0;
      },
    }),
    (_gsScope._gsDefine.plugin({
      propName: "directionalRotation",
      version: "0.3.1",
      API: 2,
      init: function (t, e, i, s) {
        "object" != typeof e && (e = { rotation: e }), (this.finals = {});
        var r,
          n,
          a,
          o,
          l,
          h,
          _ = !0 === e.useRadians ? 2 * Math.PI : 360;
        for (r in e)
          "useRadians" !== r &&
            ((o = e[r]),
            "function" == typeof o && (o = o(s, t)),
            (h = (o + "").split("_")),
            (n = h[0]),
            (a = parseFloat(
              "function" != typeof t[r]
                ? t[r]
                : t[
                    r.indexOf("set") ||
                    "function" != typeof t["get" + r.substr(3)]
                      ? r
                      : "get" + r.substr(3)
                  ]()
            )),
            (o = this.finals[r] =
              "string" == typeof n && "=" === n.charAt(1)
                ? a + parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2))
                : Number(n) || 0),
            (l = o - a),
            h.length &&
              ((n = h.join("_")),
              -1 !== n.indexOf("short") &&
                ((l %= _), l !== l % (_ / 2) && (l = 0 > l ? l + _ : l - _)),
              -1 !== n.indexOf("_cw") && 0 > l
                ? (l = ((l + 9999999999 * _) % _) - ((l / _) | 0) * _)
                : -1 !== n.indexOf("ccw") &&
                  l > 0 &&
                  (l = ((l - 9999999999 * _) % _) - ((l / _) | 0) * _)),
            (l > 1e-6 || -1e-6 > l) &&
              (this._addTween(t, r, a, a + l, r),
              this._overwriteProps.push(r)));
        return !0;
      },
      set: function (t) {
        var e;
        if (1 !== t) this._super.setRatio.call(this, t);
        else
          for (e = this._firstPT; e; )
            e.f ? e.t[e.p](this.finals[e.p]) : (e.t[e.p] = this.finals[e.p]),
              (e = e._next);
      },
    })._autoCSS = !0),
    _gsScope._gsDefine(
      "easing.Back",
      ["easing.Ease"],
      function (t) {
        var e,
          i,
          s,
          r = _gsScope.GreenSockGlobals || _gsScope,
          n = r.com.greensock,
          a = 2 * Math.PI,
          o = Math.PI / 2,
          l = n._class,
          h = function (e, i) {
            var s = l("easing." + e, function () {}, !0),
              r = (s.prototype = new t());
            return (r.constructor = s), (r.getRatio = i), s;
          },
          _ = t.register || function () {},
          u = function (t, e, i, s, r) {
            var n = l(
              "easing." + t,
              { easeOut: new e(), easeIn: new i(), easeInOut: new s() },
              !0
            );
            return _(n, t), n;
          },
          f = function (t, e, i) {
            (this.t = t),
              (this.v = e),
              i &&
                ((this.next = i),
                (i.prev = this),
                (this.c = i.v - e),
                (this.gap = i.t - t));
          },
          c = function (e, i) {
            var s = l(
                "easing." + e,
                function (t) {
                  (this._p1 = t || 0 === t ? t : 1.70158),
                    (this._p2 = 1.525 * this._p1);
                },
                !0
              ),
              r = (s.prototype = new t());
            return (
              (r.constructor = s),
              (r.getRatio = i),
              (r.config = function (t) {
                return new s(t);
              }),
              s
            );
          },
          p = u(
            "Back",
            c("BackOut", function (t) {
              return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1;
            }),
            c("BackIn", function (t) {
              return t * t * ((this._p1 + 1) * t - this._p1);
            }),
            c("BackInOut", function (t) {
              return (t *= 2) < 1
                ? 0.5 * t * t * ((this._p2 + 1) * t - this._p2)
                : 0.5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2);
            })
          ),
          d = l(
            "easing.SlowMo",
            function (t, e, i) {
              (e = e || 0 === e ? e : 0.7),
                null == t ? (t = 0.7) : t > 1 && (t = 1),
                (this._p = 1 !== t ? e : 0),
                (this._p1 = (1 - t) / 2),
                (this._p2 = t),
                (this._p3 = this._p1 + this._p2),
                (this._calcEnd = !0 === i);
            },
            !0
          ),
          m = (d.prototype = new t());
        return (
          (m.constructor = d),
          (m.getRatio = function (t) {
            var e = t + (0.5 - t) * this._p;
            return t < this._p1
              ? this._calcEnd
                ? 1 - (t = 1 - t / this._p1) * t
                : e - (t = 1 - t / this._p1) * t * t * t * e
              : t > this._p3
              ? this._calcEnd
                ? 1 === t
                  ? 0
                  : 1 - (t = (t - this._p3) / this._p1) * t
                : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t
              : this._calcEnd
              ? 1
              : e;
          }),
          (d.ease = new d(0.7, 0.7)),
          (m.config = d.config =
            function (t, e, i) {
              return new d(t, e, i);
            }),
          ((m = (e = l(
            "easing.SteppedEase",
            function (t, e) {
              (t = t || 1),
                (this._p1 = 1 / t),
                (this._p2 = t + (e ? 0 : 1)),
                (this._p3 = e ? 1 : 0);
            },
            !0
          )).prototype =
            new t()).constructor = e),
          (m.getRatio = function (t) {
            return (
              0 > t ? (t = 0) : t >= 1 && (t = 0.999999999),
              (((this._p2 * t) | 0) + this._p3) * this._p1
            );
          }),
          (m.config = e.config =
            function (t, i) {
              return new e(t, i);
            }),
          ((m = (i = l(
            "easing.RoughEase",
            function (e) {
              for (
                var i,
                  s,
                  r,
                  n,
                  a,
                  o,
                  l = (e = e || {}).taper || "none",
                  h = [],
                  _ = 0,
                  u = 0 | (e.points || 20),
                  c = u,
                  p = !1 !== e.randomize,
                  d = !0 === e.clamp,
                  m = e.template instanceof t ? e.template : null,
                  g = "number" == typeof e.strength ? 0.4 * e.strength : 0.4;
                --c > -1;

              )
                (i = p ? Math.random() : (1 / u) * c),
                  (s = m ? m.getRatio(i) : i),
                  "none" === l
                    ? (r = g)
                    : "out" === l
                    ? ((n = 1 - i), (r = n * n * g))
                    : "in" === l
                    ? (r = i * i * g)
                    : 0.5 > i
                    ? ((n = 2 * i), (r = n * n * 0.5 * g))
                    : ((n = 2 * (1 - i)), (r = n * n * 0.5 * g)),
                  p
                    ? (s += Math.random() * r - 0.5 * r)
                    : c % 2
                    ? (s += 0.5 * r)
                    : (s -= 0.5 * r),
                  d && (s > 1 ? (s = 1) : 0 > s && (s = 0)),
                  (h[_++] = { x: i, y: s });
              for (
                h.sort(function (t, e) {
                  return t.x - e.x;
                }),
                  o = new f(1, 1, null),
                  c = u;
                --c > -1;

              )
                (a = h[c]), (o = new f(a.x, a.y, o));
              this._prev = new f(0, 0, 0 !== o.t ? o : o.next);
            },
            !0
          )).prototype =
            new t()).constructor = i),
          (m.getRatio = function (t) {
            var e = this._prev;
            if (t > e.t) {
              for (; e.next && t >= e.t; ) e = e.next;
              e = e.prev;
            } else for (; e.prev && t <= e.t; ) e = e.prev;
            return (this._prev = e), e.v + ((t - e.t) / e.gap) * e.c;
          }),
          (m.config = function (t) {
            return new i(t);
          }),
          (i.ease = new i()),
          u(
            "Bounce",
            h("BounceOut", function (t) {
              return 1 / 2.75 > t
                ? 7.5625 * t * t
                : 2 / 2.75 > t
                ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                : 2.5 / 2.75 > t
                ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
            }),
            h("BounceIn", function (t) {
              return (t = 1 - t) < 1 / 2.75
                ? 1 - 7.5625 * t * t
                : 2 / 2.75 > t
                ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
                : 2.5 / 2.75 > t
                ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
                : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
            }),
            h("BounceInOut", function (t) {
              var e = 0.5 > t;
              return (
                (t =
                  1 / 2.75 > (t = e ? 1 - 2 * t : 2 * t - 1)
                    ? 7.5625 * t * t
                    : 2 / 2.75 > t
                    ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                    : 2.5 / 2.75 > t
                    ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                    : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375),
                e ? 0.5 * (1 - t) : 0.5 * t + 0.5
              );
            })
          ),
          u(
            "Circ",
            h("CircOut", function (t) {
              return Math.sqrt(1 - (t -= 1) * t);
            }),
            h("CircIn", function (t) {
              return -(Math.sqrt(1 - t * t) - 1);
            }),
            h("CircInOut", function (t) {
              return (t *= 2) < 1
                ? -0.5 * (Math.sqrt(1 - t * t) - 1)
                : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
            })
          ),
          u(
            "Elastic",
            (s = function (e, i, s) {
              var r = l(
                  "easing." + e,
                  function (t, e) {
                    (this._p1 = t >= 1 ? t : 1),
                      (this._p2 = (e || s) / (1 > t ? t : 1)),
                      (this._p3 =
                        (this._p2 / a) * (Math.asin(1 / this._p1) || 0)),
                      (this._p2 = a / this._p2);
                  },
                  !0
                ),
                n = (r.prototype = new t());
              return (
                (n.constructor = r),
                (n.getRatio = i),
                (n.config = function (t, e) {
                  return new r(t, e);
                }),
                r
              );
            })(
              "ElasticOut",
              function (t) {
                return (
                  this._p1 *
                    Math.pow(2, -10 * t) *
                    Math.sin((t - this._p3) * this._p2) +
                  1
                );
              },
              0.3
            ),
            s(
              "ElasticIn",
              function (t) {
                return (
                  -this._p1 *
                  Math.pow(2, 10 * (t -= 1)) *
                  Math.sin((t - this._p3) * this._p2)
                );
              },
              0.3
            ),
            s(
              "ElasticInOut",
              function (t) {
                return (t *= 2) < 1
                  ? this._p1 *
                      Math.pow(2, 10 * (t -= 1)) *
                      Math.sin((t - this._p3) * this._p2) *
                      -0.5
                  : this._p1 *
                      Math.pow(2, -10 * (t -= 1)) *
                      Math.sin((t - this._p3) * this._p2) *
                      0.5 +
                      1;
              },
              0.45
            )
          ),
          u(
            "Expo",
            h("ExpoOut", function (t) {
              return 1 - Math.pow(2, -10 * t);
            }),
            h("ExpoIn", function (t) {
              return Math.pow(2, 10 * (t - 1)) - 0.001;
            }),
            h("ExpoInOut", function (t) {
              return (t *= 2) < 1
                ? 0.5 * Math.pow(2, 10 * (t - 1))
                : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
            })
          ),
          u(
            "Sine",
            h("SineOut", function (t) {
              return Math.sin(t * o);
            }),
            h("SineIn", function (t) {
              return 1 - Math.cos(t * o);
            }),
            h("SineInOut", function (t) {
              return -0.5 * (Math.cos(Math.PI * t) - 1);
            })
          ),
          l(
            "easing.EaseLookup",
            {
              find: function (e) {
                return t.map[e];
              },
            },
            !0
          ),
          _(r.SlowMo, "SlowMo", "ease,"),
          _(i, "RoughEase", "ease,"),
          _(e, "SteppedEase", "ease,"),
          p
        );
      },
      !0
    );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function (t, e) {
    "use strict";
    var i,
      s,
      r = {},
      n = t.document,
      a = (t.GreenSockGlobals = t.GreenSockGlobals || t);
    if (!a.TweenLite) {
      var o,
        l,
        h,
        _,
        u,
        f = function (t) {
          var e,
            i = t.split("."),
            s = a;
          for (e = 0; e < i.length; e++) s[i[e]] = s = s[i[e]] || {};
          return s;
        },
        c = f("com.greensock"),
        p = 1e-10,
        d = function (t) {
          var e,
            i = [],
            s = t.length;
          for (e = 0; e !== s; i.push(t[e++]));
          return i;
        },
        m = function () {},
        g =
          ((i = Object.prototype.toString),
          (s = i.call([])),
          function (t) {
            return (
              null != t &&
              (t instanceof Array ||
                ("object" == typeof t && !!t.push && i.call(t) === s))
            );
          }),
        y = {},
        v = function (i, s, n, o) {
          (this.sc = y[i] ? y[i].sc : []),
            (y[i] = this),
            (this.gsClass = null),
            (this.func = n);
          var l = [];
          (this.check = function (h) {
            for (var _, u, c, p, d = s.length, m = d; --d > -1; )
              (_ = y[s[d]] || new v(s[d], [])).gsClass
                ? ((l[d] = _.gsClass), m--)
                : h && _.sc.push(this);
            if (0 === m && n) {
              if (
                ((c = (u = ("com.greensock." + i).split(".")).pop()),
                (p = f(u.join("."))[c] = this.gsClass = n.apply(n, l)),
                o)
              )
                if (
                  ((a[c] = r[c] = p),
                  "undefined" != typeof module && module.exports)
                )
                  if (i === e) {
                    module.exports = r[e] = p;
                    for (d in r) p[d] = r[d];
                  } else r[e] && (r[e][c] = p);
                else
                  "function" == typeof define &&
                    define.amd &&
                    define(
                      (t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") +
                        i.split(".").pop(),
                      [],
                      function () {
                        return p;
                      }
                    );
              for (d = 0; d < this.sc.length; d++) this.sc[d].check();
            }
          }),
            this.check(!0);
        },
        T = (t._gsDefine = function (t, e, i, s) {
          return new v(t, e, i, s);
        }),
        x = (c._class = function (t, e, i) {
          return (
            (e = e || function () {}),
            T(
              t,
              [],
              function () {
                return e;
              },
              i
            ),
            e
          );
        });
      T.globals = a;
      var b = [0, 0, 1, 1],
        w = x(
          "easing.Ease",
          function (t, e, i, s) {
            (this._func = t),
              (this._type = i || 0),
              (this._power = s || 0),
              (this._params = e ? b.concat(e) : b);
          },
          !0
        ),
        P = (w.map = {}),
        O = (w.register = function (t, e, i, s) {
          for (
            var r,
              n,
              a,
              o,
              l = e.split(","),
              h = l.length,
              _ = (i || "easeIn,easeOut,easeInOut").split(",");
            --h > -1;

          )
            for (
              n = l[h],
                r = s ? x("easing." + n, null, !0) : c.easing[n] || {},
                a = _.length;
              --a > -1;

            )
              (o = _[a]),
                (P[n + "." + o] =
                  P[o + n] =
                  r[o] =
                    t.getRatio ? t : t[o] || new t());
        });
      for (
        (h = w.prototype)._calcEnd = !1,
          h.getRatio = function (t) {
            if (this._func)
              return (
                (this._params[0] = t), this._func.apply(null, this._params)
              );
            var e = this._type,
              i = this._power,
              s = 1 === e ? 1 - t : 2 === e ? t : 0.5 > t ? 2 * t : 2 * (1 - t);
            return (
              1 === i
                ? (s *= s)
                : 2 === i
                ? (s *= s * s)
                : 3 === i
                ? (s *= s * s * s)
                : 4 === i && (s *= s * s * s * s),
              1 === e ? 1 - s : 2 === e ? s : 0.5 > t ? s / 2 : 1 - s / 2
            );
          },
          l = (o = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length;
        --l > -1;

      )
        (h = o[l] + ",Power" + l),
          O(new w(null, null, 1, l), h, "easeOut", !0),
          O(
            new w(null, null, 2, l),
            h,
            "easeIn" + (0 === l ? ",easeNone" : "")
          ),
          O(new w(null, null, 3, l), h, "easeInOut");
      (P.linear = c.easing.Linear.easeIn), (P.swing = c.easing.Quad.easeInOut);
      var S = x("events.EventDispatcher", function (t) {
        (this._listeners = {}), (this._eventTarget = t || this);
      });
      ((h = S.prototype).addEventListener = function (t, e, i, s, r) {
        r = r || 0;
        var n,
          a,
          o = this._listeners[t],
          l = 0;
        for (
          this !== _ || u || _.wake(),
            null == o && (this._listeners[t] = o = []),
            a = o.length;
          --a > -1;

        )
          (n = o[a]),
            n.c === e && n.s === i
              ? o.splice(a, 1)
              : 0 === l && n.pr < r && (l = a + 1);
        o.splice(l, 0, { c: e, s: i, up: s, pr: r });
      }),
        (h.removeEventListener = function (t, e) {
          var i,
            s = this._listeners[t];
          if (s)
            for (i = s.length; --i > -1; )
              if (s[i].c === e) return void s.splice(i, 1);
        }),
        (h.dispatchEvent = function (t) {
          var e,
            i,
            s,
            r = this._listeners[t];
          if (r)
            for (
              e = r.length, e > 1 && (r = r.slice(0)), i = this._eventTarget;
              --e > -1;

            )
              (s = r[e]),
                s &&
                  (s.up
                    ? s.c.call(s.s || i, { type: t, target: i })
                    : s.c.call(s.s || i));
        });
      var k = t.requestAnimationFrame,
        R = t.cancelAnimationFrame,
        A =
          Date.now ||
          function () {
            return new Date().getTime();
          },
        C = A();
      for (l = (o = ["ms", "moz", "webkit", "o"]).length; --l > -1 && !k; )
        (k = t[o[l] + "RequestAnimationFrame"]),
          (R =
            t[o[l] + "CancelAnimationFrame"] ||
            t[o[l] + "CancelRequestAnimationFrame"]);
      x("Ticker", function (t, e) {
        var i,
          s,
          r,
          a,
          o,
          l = this,
          h = A(),
          f = !(!1 === e || !k) && "auto",
          c = 500,
          p = 33,
          d = function (t) {
            var e,
              n,
              _ = A() - C;
            _ > c && (h += _ - p),
              (C += _),
              (l.time = (C - h) / 1e3),
              (e = l.time - o),
              (!i || e > 0 || !0 === t) &&
                (l.frame++, (o += e + (e >= a ? 0.004 : a - e)), (n = !0)),
              !0 !== t && (r = s(d)),
              n && l.dispatchEvent("tick");
          };
        S.call(l),
          (l.time = l.frame = 0),
          (l.tick = function () {
            d(!0);
          }),
          (l.lagSmoothing = function (t, e) {
            return arguments.length
              ? ((c = t || 1e10), void (p = Math.min(e, c, 0)))
              : 1e10 > c;
          }),
          (l.sleep = function () {
            null != r &&
              (f && R ? R(r) : clearTimeout(r),
              (s = m),
              (r = null),
              l === _ && (u = !1));
          }),
          (l.wake = function (t) {
            null !== r
              ? l.sleep()
              : t
              ? (h += -C + (C = A()))
              : l.frame > 10 && (C = A() - c + 5),
              (s =
                0 === i
                  ? m
                  : f && k
                  ? k
                  : function (t) {
                      return setTimeout(t, (1e3 * (o - l.time) + 1) | 0);
                    }),
              l === _ && (u = !0),
              d(2);
          }),
          (l.fps = function (t) {
            return arguments.length
              ? ((a = 1 / ((i = t) || 60)), (o = this.time + a), void l.wake())
              : i;
          }),
          (l.useRAF = function (t) {
            return arguments.length ? (l.sleep(), (f = t), void l.fps(i)) : f;
          }),
          l.fps(t),
          setTimeout(function () {
            "auto" === f &&
              l.frame < 5 &&
              "hidden" !== n.visibilityState &&
              l.useRAF(!1);
          }, 1500);
      }),
        ((h = c.Ticker.prototype = new c.events.EventDispatcher()).constructor =
          c.Ticker);
      var D = x("core.Animation", function (t, e) {
        if (
          ((this.vars = e = e || {}),
          (this._duration = this._totalDuration = t || 0),
          (this._delay = Number(e.delay) || 0),
          (this._timeScale = 1),
          (this._active = !0 === e.immediateRender),
          (this.data = e.data),
          (this._reversed = !0 === e.reversed),
          $)
        ) {
          u || _.wake();
          var i = this.vars.useFrames ? H : $;
          i.add(this, i._time), this.vars.paused && this.paused(!0);
        }
      });
      (_ = D.ticker = new c.Ticker()),
        ((h = D.prototype)._dirty = h._gc = h._initted = h._paused = !1),
        (h._totalTime = h._time = 0),
        (h._rawPrevTime = -1),
        (h._next = h._last = h._onUpdate = h._timeline = h.timeline = null),
        (h._paused = !1);
      var M = function () {
        u &&
          A() - C > 2e3 &&
          ("hidden" !== n.visibilityState || !_.lagSmoothing()) &&
          _.wake();
        var t = setTimeout(M, 2e3);
        t.unref && t.unref();
      };
      M(),
        (h.play = function (t, e) {
          return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
        }),
        (h.pause = function (t, e) {
          return null != t && this.seek(t, e), this.paused(!0);
        }),
        (h.resume = function (t, e) {
          return null != t && this.seek(t, e), this.paused(!1);
        }),
        (h.seek = function (t, e) {
          return this.totalTime(Number(t), !1 !== e);
        }),
        (h.restart = function (t, e) {
          return this.reversed(!1)
            .paused(!1)
            .totalTime(t ? -this._delay : 0, !1 !== e, !0);
        }),
        (h.reverse = function (t, e) {
          return (
            null != t && this.seek(t || this.totalDuration(), e),
            this.reversed(!0).paused(!1)
          );
        }),
        (h.render = function (t, e, i) {}),
        (h.invalidate = function () {
          return (
            (this._time = this._totalTime = 0),
            (this._initted = this._gc = !1),
            (this._rawPrevTime = -1),
            (this._gc || !this.timeline) && this._enabled(!0),
            this
          );
        }),
        (h.isActive = function () {
          var t,
            e = this._timeline,
            i = this._startTime;
          return (
            !e ||
            (!this._gc &&
              !this._paused &&
              e.isActive() &&
              (t = e.rawTime(!0)) >= i &&
              t < i + this.totalDuration() / this._timeScale - 1e-7)
          );
        }),
        (h._enabled = function (t, e) {
          return (
            u || _.wake(),
            (this._gc = !t),
            (this._active = this.isActive()),
            !0 !== e &&
              (t && !this.timeline
                ? this._timeline.add(this, this._startTime - this._delay)
                : !t && this.timeline && this._timeline._remove(this, !0)),
            !1
          );
        }),
        (h._kill = function (t, e) {
          return this._enabled(!1, !1);
        }),
        (h.kill = function (t, e) {
          return this._kill(t, e), this;
        }),
        (h._uncache = function (t) {
          for (var e = t ? this : this.timeline; e; )
            (e._dirty = !0), (e = e.timeline);
          return this;
        }),
        (h._swapSelfInParams = function (t) {
          for (var e = t.length, i = t.concat(); --e > -1; )
            "{self}" === t[e] && (i[e] = this);
          return i;
        }),
        (h._callback = function (t) {
          var e = this.vars,
            i = e[t],
            s = e[t + "Params"],
            r = e[t + "Scope"] || e.callbackScope || this;
          switch (s ? s.length : 0) {
            case 0:
              i.call(r);
              break;
            case 1:
              i.call(r, s[0]);
              break;
            case 2:
              i.call(r, s[0], s[1]);
              break;
            default:
              i.apply(r, s);
          }
        }),
        (h.eventCallback = function (t, e, i, s) {
          if ("on" === (t || "").substr(0, 2)) {
            var r = this.vars;
            if (1 === arguments.length) return r[t];
            null == e
              ? delete r[t]
              : ((r[t] = e),
                (r[t + "Params"] =
                  g(i) && -1 !== i.join("").indexOf("{self}")
                    ? this._swapSelfInParams(i)
                    : i),
                (r[t + "Scope"] = s)),
              "onUpdate" === t && (this._onUpdate = e);
          }
          return this;
        }),
        (h.delay = function (t) {
          return arguments.length
            ? (this._timeline.smoothChildTiming &&
                this.startTime(this._startTime + t - this._delay),
              (this._delay = t),
              this)
            : this._delay;
        }),
        (h.duration = function (t) {
          return arguments.length
            ? ((this._duration = this._totalDuration = t),
              this._uncache(!0),
              this._timeline.smoothChildTiming &&
                this._time > 0 &&
                this._time < this._duration &&
                0 !== t &&
                this.totalTime(this._totalTime * (t / this._duration), !0),
              this)
            : ((this._dirty = !1), this._duration);
        }),
        (h.totalDuration = function (t) {
          return (
            (this._dirty = !1),
            arguments.length ? this.duration(t) : this._totalDuration
          );
        }),
        (h.time = function (t, e) {
          return arguments.length
            ? (this._dirty && this.totalDuration(),
              this.totalTime(t > this._duration ? this._duration : t, e))
            : this._time;
        }),
        (h.totalTime = function (t, e, i) {
          if ((u || _.wake(), !arguments.length)) return this._totalTime;
          if (this._timeline) {
            if (
              (0 > t && !i && (t += this.totalDuration()),
              this._timeline.smoothChildTiming)
            ) {
              this._dirty && this.totalDuration();
              var s = this._totalDuration,
                r = this._timeline;
              if (
                (t > s && !i && (t = s),
                (this._startTime =
                  (this._paused ? this._pauseTime : r._time) -
                  (this._reversed ? s - t : t) / this._timeScale),
                r._dirty || this._uncache(!1),
                r._timeline)
              )
                for (; r._timeline; )
                  r._timeline._time !==
                    (r._startTime + r._totalTime) / r._timeScale &&
                    r.totalTime(r._totalTime, !0),
                    (r = r._timeline);
            }
            this._gc && this._enabled(!0, !1),
              (this._totalTime !== t || 0 === this._duration) &&
                (I.length && K(), this.render(t, e, !1), I.length && K());
          }
          return this;
        }),
        (h.progress = h.totalProgress =
          function (t, e) {
            var i = this.duration();
            return arguments.length
              ? this.totalTime(i * t, e)
              : i
              ? this._time / i
              : this.ratio;
          }),
        (h.startTime = function (t) {
          return arguments.length
            ? (t !== this._startTime &&
                ((this._startTime = t),
                this.timeline &&
                  this.timeline._sortChildren &&
                  this.timeline.add(this, t - this._delay)),
              this)
            : this._startTime;
        }),
        (h.endTime = function (t) {
          return (
            this._startTime +
            (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
          );
        }),
        (h.timeScale = function (t) {
          if (!arguments.length) return this._timeScale;
          var e, i;
          for (
            t = t || p,
              this._timeline &&
                this._timeline.smoothChildTiming &&
                ((i =
                  (e = this._pauseTime) || 0 === e
                    ? e
                    : this._timeline.totalTime()),
                (this._startTime =
                  i - ((i - this._startTime) * this._timeScale) / t)),
              this._timeScale = t,
              i = this.timeline;
            i && i.timeline;

          )
            (i._dirty = !0), i.totalDuration(), (i = i.timeline);
          return this;
        }),
        (h.reversed = function (t) {
          return arguments.length
            ? (t != this._reversed &&
                ((this._reversed = t),
                this.totalTime(
                  this._timeline && !this._timeline.smoothChildTiming
                    ? this.totalDuration() - this._totalTime
                    : this._totalTime,
                  !0
                )),
              this)
            : this._reversed;
        }),
        (h.paused = function (t) {
          if (!arguments.length) return this._paused;
          var e,
            i,
            s = this._timeline;
          return (
            t != this._paused &&
              s &&
              (u || t || _.wake(),
              (i = (e = s.rawTime()) - this._pauseTime),
              !t &&
                s.smoothChildTiming &&
                ((this._startTime += i), this._uncache(!1)),
              (this._pauseTime = t ? e : null),
              (this._paused = t),
              (this._active = this.isActive()),
              !t &&
                0 !== i &&
                this._initted &&
                this.duration() &&
                ((e = s.smoothChildTiming
                  ? this._totalTime
                  : (e - this._startTime) / this._timeScale),
                this.render(e, e === this._totalTime, !0))),
            this._gc && !t && this._enabled(!0, !1),
            this
          );
        });
      var F = x("core.SimpleTimeline", function (t) {
        D.call(this, 0, t),
          (this.autoRemoveChildren = this.smoothChildTiming = !0);
      });
      ((h = F.prototype = new D()).constructor = F),
        (h.kill()._gc = !1),
        (h._first = h._last = h._recent = null),
        (h._sortChildren = !1),
        (h.add = h.insert =
          function (t, e, i, s) {
            var r, n;
            if (
              ((t._startTime = Number(e || 0) + t._delay),
              t._paused &&
                this !== t._timeline &&
                (t._pauseTime =
                  t._startTime +
                  (this.rawTime() - t._startTime) / t._timeScale),
              t.timeline && t.timeline._remove(t, !0),
              (t.timeline = t._timeline = this),
              t._gc && t._enabled(!0, !0),
              (r = this._last),
              this._sortChildren)
            )
              for (n = t._startTime; r && r._startTime > n; ) r = r._prev;
            return (
              r
                ? ((t._next = r._next), (r._next = t))
                : ((t._next = this._first), (this._first = t)),
              t._next ? (t._next._prev = t) : (this._last = t),
              (t._prev = r),
              (this._recent = t),
              this._timeline && this._uncache(!0),
              this
            );
          }),
        (h._remove = function (t, e) {
          return (
            t.timeline === this &&
              (e || t._enabled(!1, !0),
              t._prev
                ? (t._prev._next = t._next)
                : this._first === t && (this._first = t._next),
              t._next
                ? (t._next._prev = t._prev)
                : this._last === t && (this._last = t._prev),
              (t._next = t._prev = t.timeline = null),
              t === this._recent && (this._recent = this._last),
              this._timeline && this._uncache(!0)),
            this
          );
        }),
        (h.render = function (t, e, i) {
          var s,
            r = this._first;
          for (this._totalTime = this._time = this._rawPrevTime = t; r; )
            (s = r._next),
              (r._active || (t >= r._startTime && !r._paused && !r._gc)) &&
                (r._reversed
                  ? r.render(
                      (r._dirty ? r.totalDuration() : r._totalDuration) -
                        (t - r._startTime) * r._timeScale,
                      e,
                      i
                    )
                  : r.render((t - r._startTime) * r._timeScale, e, i)),
              (r = s);
        }),
        (h.rawTime = function () {
          return u || _.wake(), this._totalTime;
        });
      var z = x(
          "TweenLite",
          function (e, i, s) {
            if (
              (D.call(this, i, s),
              (this.render = z.prototype.render),
              null == e)
            )
              throw "Cannot tween a null target.";
            this.target = e = "string" != typeof e ? e : z.selector(e) || e;
            var r,
              n,
              a,
              o =
                e.jquery ||
                (e.length &&
                  e !== t &&
                  e[0] &&
                  (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))),
              l = this.vars.overwrite;
            if (
              ((this._overwrite = l =
                null == l
                  ? Z[z.defaultOverwrite]
                  : "number" == typeof l
                  ? l >> 0
                  : Z[l]),
              (o || e instanceof Array || (e.push && g(e))) &&
                "number" != typeof e[0])
            )
              for (
                this._targets = a = d(e),
                  this._propLookup = [],
                  this._siblings = [],
                  r = 0;
                r < a.length;
                r++
              )
                (n = a[r]),
                  n
                    ? "string" != typeof n
                      ? n.length &&
                        n !== t &&
                        n[0] &&
                        (n[0] === t ||
                          (n[0].nodeType && n[0].style && !n.nodeType))
                        ? (a.splice(r--, 1),
                          (this._targets = a = a.concat(d(n))))
                        : ((this._siblings[r] = J(n, this, !1)),
                          1 === l &&
                            this._siblings[r].length > 1 &&
                            et(n, this, null, 1, this._siblings[r]))
                      : ((n = a[r--] = z.selector(n)),
                        "string" == typeof n && a.splice(r + 1, 1))
                    : a.splice(r--, 1);
            else
              (this._propLookup = {}),
                (this._siblings = J(e, this, !1)),
                1 === l &&
                  this._siblings.length > 1 &&
                  et(e, this, null, 1, this._siblings);
            (this.vars.immediateRender ||
              (0 === i &&
                0 === this._delay &&
                !1 !== this.vars.immediateRender)) &&
              ((this._time = -p), this.render(Math.min(0, -this._delay)));
          },
          !0
        ),
        E = function (e) {
          return (
            e &&
            e.length &&
            e !== t &&
            e[0] &&
            (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))
          );
        };
      ((h = z.prototype = new D()).constructor = z),
        (h.kill()._gc = !1),
        (h.ratio = 0),
        (h._firstPT = h._targets = h._overwrittenProps = h._startAt = null),
        (h._notifyPluginsOfEnabled = h._lazy = !1),
        (z.version = "1.20.3"),
        (z.defaultEase = h._ease = new w(null, null, 1, 1)),
        (z.defaultOverwrite = "auto"),
        (z.ticker = _),
        (z.autoSleep = 120),
        (z.lagSmoothing = function (t, e) {
          _.lagSmoothing(t, e);
        }),
        (z.selector =
          t.$ ||
          t.jQuery ||
          function (e) {
            var i = t.$ || t.jQuery;
            return i
              ? ((z.selector = i), i(e))
              : void 0 === n
              ? e
              : n.querySelectorAll
              ? n.querySelectorAll(e)
              : n.getElementById("#" === e.charAt(0) ? e.substr(1) : e);
          });
      var I = [],
        X = {},
        N = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        L = /[\+-]=-?[\.\d]/,
        B = function (t) {
          for (var e, i = this._firstPT; i; )
            (e = i.blob
              ? 1 === t && null != this.end
                ? this.end
                : t
                ? this.join("")
                : this.start
              : i.c * t + i.s),
              i.m
                ? (e = i.m(e, this._target || i.t))
                : 1e-6 > e && e > -1e-6 && !i.blob && (e = 0),
              i.f ? (i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e)) : (i.t[i.p] = e),
              (i = i._next);
        },
        Y = function (t, e, i, s) {
          var r,
            n,
            a,
            o,
            l,
            h,
            _,
            u = [],
            f = 0,
            c = "",
            p = 0;
          for (
            u.start = t,
              u.end = e,
              t = u[0] = t + "",
              e = u[1] = e + "",
              i && (i(u), (t = u[0]), (e = u[1])),
              u.length = 0,
              r = t.match(N) || [],
              n = e.match(N) || [],
              s &&
                ((s._next = null), (s.blob = 1), (u._firstPT = u._applyPT = s)),
              l = n.length,
              o = 0;
            l > o;
            o++
          )
            (_ = n[o]),
              (h = e.substr(f, e.indexOf(_, f) - f)),
              (c += h || !o ? h : ","),
              (f += h.length),
              p ? (p = (p + 1) % 5) : "rgba(" === h.substr(-5) && (p = 1),
              _ === r[o] || r.length <= o
                ? (c += _)
                : (c && (u.push(c), (c = "")),
                  (a = parseFloat(r[o])),
                  u.push(a),
                  (u._firstPT = {
                    _next: u._firstPT,
                    t: u,
                    p: u.length - 1,
                    s: a,
                    c:
                      ("=" === _.charAt(1)
                        ? parseInt(_.charAt(0) + "1", 10) *
                          parseFloat(_.substr(2))
                        : parseFloat(_) - a) || 0,
                    f: 0,
                    m: p && 4 > p ? Math.round : 0,
                  })),
              (f += _.length);
          return (
            (c += e.substr(f)) && u.push(c),
            (u.setRatio = B),
            L.test(e) && (u.end = null),
            u
          );
        },
        j = function (t, e, i, s, r, n, a, o, l) {
          "function" == typeof s && (s = s(l || 0, t));
          var h = typeof t[e],
            _ =
              "function" !== h
                ? ""
                : e.indexOf("set") ||
                  "function" != typeof t["get" + e.substr(3)]
                ? e
                : "get" + e.substr(3),
            u = "get" !== i ? i : _ ? (a ? t[_](a) : t[_]()) : t[e],
            f = "string" == typeof s && "=" === s.charAt(1),
            c = {
              t: t,
              p: e,
              s: u,
              f: "function" === h,
              pg: 0,
              n: r || e,
              m: n ? ("function" == typeof n ? n : Math.round) : 0,
              pr: 0,
              c: f
                ? parseInt(s.charAt(0) + "1", 10) * parseFloat(s.substr(2))
                : parseFloat(s) - u || 0,
            };
          return (
            ("number" != typeof u || ("number" != typeof s && !f)) &&
              (a ||
              isNaN(u) ||
              (!f && isNaN(s)) ||
              "boolean" == typeof u ||
              "boolean" == typeof s
                ? ((c.fp = a),
                  (c = {
                    t: Y(
                      u,
                      f ? parseFloat(c.s) + c.c : s,
                      o || z.defaultStringFilter,
                      c
                    ),
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 2,
                    pg: 0,
                    n: r || e,
                    pr: 0,
                    m: 0,
                  }))
                : ((c.s = parseFloat(u)),
                  f || (c.c = parseFloat(s) - c.s || 0))),
            c.c
              ? ((c._next = this._firstPT) && (c._next._prev = c),
                (this._firstPT = c),
                c)
              : void 0
          );
        },
        U = (z._internals = {
          isArray: g,
          isSelector: E,
          lazyTweens: I,
          blobDif: Y,
        }),
        V = (z._plugins = {}),
        q = (U.tweenLookup = {}),
        W = 0,
        G = (U.reservedProps = {
          ease: 1,
          delay: 1,
          overwrite: 1,
          onComplete: 1,
          onCompleteParams: 1,
          onCompleteScope: 1,
          useFrames: 1,
          runBackwards: 1,
          startAt: 1,
          onUpdate: 1,
          onUpdateParams: 1,
          onUpdateScope: 1,
          onStart: 1,
          onStartParams: 1,
          onStartScope: 1,
          onReverseComplete: 1,
          onReverseCompleteParams: 1,
          onReverseCompleteScope: 1,
          onRepeat: 1,
          onRepeatParams: 1,
          onRepeatScope: 1,
          easeParams: 1,
          yoyo: 1,
          immediateRender: 1,
          repeat: 1,
          repeatDelay: 1,
          data: 1,
          paused: 1,
          reversed: 1,
          autoCSS: 1,
          lazy: 1,
          onOverwrite: 1,
          callbackScope: 1,
          stringFilter: 1,
          id: 1,
          yoyoEase: 1,
        }),
        Z = {
          none: 0,
          all: 1,
          auto: 2,
          concurrent: 3,
          allOnStart: 4,
          preexisting: 5,
          true: 1,
          false: 0,
        },
        H = (D._rootFramesTimeline = new F()),
        $ = (D._rootTimeline = new F()),
        Q = 30,
        K = (U.lazyRender = function () {
          var t,
            e = I.length;
          for (X = {}; --e > -1; )
            (t = I[e]),
              t &&
                !1 !== t._lazy &&
                (t.render(t._lazy[0], t._lazy[1], !0), (t._lazy = !1));
          I.length = 0;
        });
      ($._startTime = _.time),
        (H._startTime = _.frame),
        ($._active = H._active = !0),
        setTimeout(K, 1),
        (D._updateRoot = z.render =
          function () {
            var t, e, i;
            if (
              (I.length && K(),
              $.render((_.time - $._startTime) * $._timeScale, !1, !1),
              H.render((_.frame - H._startTime) * H._timeScale, !1, !1),
              I.length && K(),
              _.frame >= Q)
            ) {
              Q = _.frame + (parseInt(z.autoSleep, 10) || 120);
              for (i in q) {
                for (t = (e = q[i].tweens).length; --t > -1; )
                  e[t]._gc && e.splice(t, 1);
                0 === e.length && delete q[i];
              }
              if (
                (!(i = $._first) || i._paused) &&
                z.autoSleep &&
                !H._first &&
                1 === _._listeners.tick.length
              ) {
                for (; i && i._paused; ) i = i._next;
                i || _.sleep();
              }
            }
          }),
        _.addEventListener("tick", D._updateRoot);
      var J = function (t, e, i) {
          var s,
            r,
            n = t._gsTweenID;
          if (
            (q[n || (t._gsTweenID = n = "t" + W++)] ||
              (q[n] = { target: t, tweens: [] }),
            e && (((s = q[n].tweens)[(r = s.length)] = e), i))
          )
            for (; --r > -1; ) s[r] === e && s.splice(r, 1);
          return q[n].tweens;
        },
        tt = function (t, e, i, s) {
          var r,
            n,
            a = t.vars.onOverwrite;
          return (
            a && (r = a(t, e, i, s)),
            (a = z.onOverwrite) && (n = a(t, e, i, s)),
            !1 !== r && !1 !== n
          );
        },
        et = function (t, e, i, s, r) {
          var n, a, o, l;
          if (1 === s || s >= 4) {
            for (l = r.length, n = 0; l > n; n++)
              if ((o = r[n]) !== e) o._gc || (o._kill(null, t, e) && (a = !0));
              else if (5 === s) break;
            return a;
          }
          var h,
            _ = e._startTime + p,
            u = [],
            f = 0,
            c = 0 === e._duration;
          for (n = r.length; --n > -1; )
            (o = r[n]) === e ||
              o._gc ||
              o._paused ||
              (o._timeline !== e._timeline
                ? ((h = h || it(e, 0, c)), 0 === it(o, h, c) && (u[f++] = o))
                : o._startTime <= _ &&
                  o._startTime + o.totalDuration() / o._timeScale > _ &&
                  (((c || !o._initted) && _ - o._startTime <= 2e-10) ||
                    (u[f++] = o)));
          for (n = f; --n > -1; )
            if (
              ((o = u[n]),
              2 === s && o._kill(i, t, e) && (a = !0),
              2 !== s || (!o._firstPT && o._initted))
            ) {
              if (2 !== s && !tt(o, e)) continue;
              o._enabled(!1, !1) && (a = !0);
            }
          return a;
        },
        it = function (t, e, i) {
          for (
            var s = t._timeline, r = s._timeScale, n = t._startTime;
            s._timeline;

          ) {
            if (((n += s._startTime), (r *= s._timeScale), s._paused))
              return -100;
            s = s._timeline;
          }
          return (n /= r) > e
            ? n - e
            : (i && n === e) || (!t._initted && 2 * p > n - e)
            ? p
            : (n += t.totalDuration() / t._timeScale / r) > e + p
            ? 0
            : n - e - p;
        };
      (h._init = function () {
        var t,
          e,
          i,
          s,
          r,
          n,
          a = this.vars,
          o = this._overwrittenProps,
          l = this._duration,
          h = !!a.immediateRender,
          _ = a.ease;
        if (a.startAt) {
          this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()),
            (r = {});
          for (s in a.startAt) r[s] = a.startAt[s];
          if (
            ((r.data = "isStart"),
            (r.overwrite = !1),
            (r.immediateRender = !0),
            (r.lazy = h && !1 !== a.lazy),
            (r.startAt = r.delay = null),
            (r.onUpdate = a.onUpdate),
            (r.onUpdateParams = a.onUpdateParams),
            (r.onUpdateScope = a.onUpdateScope || a.callbackScope || this),
            (this._startAt = z.to(this.target, 0, r)),
            h)
          )
            if (this._time > 0) this._startAt = null;
            else if (0 !== l) return;
        } else if (a.runBackwards && 0 !== l)
          if (this._startAt)
            this._startAt.render(-1, !0),
              this._startAt.kill(),
              (this._startAt = null);
          else {
            0 !== this._time && (h = !1), (i = {});
            for (s in a) (G[s] && "autoCSS" !== s) || (i[s] = a[s]);
            if (
              ((i.overwrite = 0),
              (i.data = "isFromStart"),
              (i.lazy = h && !1 !== a.lazy),
              (i.immediateRender = h),
              (this._startAt = z.to(this.target, 0, i)),
              h)
            ) {
              if (0 === this._time) return;
            } else
              this._startAt._init(),
                this._startAt._enabled(!1),
                this.vars.immediateRender && (this._startAt = null);
          }
        if (
          ((this._ease = _ =
            _
              ? _ instanceof w
                ? _
                : "function" == typeof _
                ? new w(_, a.easeParams)
                : P[_] || z.defaultEase
              : z.defaultEase),
          a.easeParams instanceof Array &&
            _.config &&
            (this._ease = _.config.apply(_, a.easeParams)),
          (this._easeType = this._ease._type),
          (this._easePower = this._ease._power),
          (this._firstPT = null),
          this._targets)
        )
          for (n = this._targets.length, t = 0; n > t; t++)
            this._initProps(
              this._targets[t],
              (this._propLookup[t] = {}),
              this._siblings[t],
              o ? o[t] : null,
              t
            ) && (e = !0);
        else
          e = this._initProps(
            this.target,
            this._propLookup,
            this._siblings,
            o,
            0
          );
        if (
          (e && z._onPluginEvent("_onInitAllProps", this),
          o &&
            (this._firstPT ||
              ("function" != typeof this.target && this._enabled(!1, !1))),
          a.runBackwards)
        )
          for (i = this._firstPT; i; )
            (i.s += i.c), (i.c = -i.c), (i = i._next);
        (this._onUpdate = a.onUpdate), (this._initted = !0);
      }),
        (h._initProps = function (e, i, s, r, n) {
          var a, o, l, h, _, u;
          if (null == e) return !1;
          X[e._gsTweenID] && K(),
            this.vars.css ||
              (e.style &&
                e !== t &&
                e.nodeType &&
                V.css &&
                !1 !== this.vars.autoCSS &&
                (function (t, e) {
                  var i,
                    s = {};
                  for (i in t)
                    G[i] ||
                      (i in e &&
                        "transform" !== i &&
                        "x" !== i &&
                        "y" !== i &&
                        "width" !== i &&
                        "height" !== i &&
                        "className" !== i &&
                        "border" !== i) ||
                      !(!V[i] || (V[i] && V[i]._autoCSS)) ||
                      ((s[i] = t[i]), delete t[i]);
                  t.css = s;
                })(this.vars, e));
          for (a in this.vars)
            if (((u = this.vars[a]), G[a]))
              u &&
                (u instanceof Array || (u.push && g(u))) &&
                -1 !== u.join("").indexOf("{self}") &&
                (this.vars[a] = u = this._swapSelfInParams(u, this));
            else if (
              V[a] &&
              (h = new V[a]())._onInitTween(e, this.vars[a], this, n)
            ) {
              for (
                this._firstPT = _ =
                  {
                    _next: this._firstPT,
                    t: h,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 1,
                    n: a,
                    pg: 1,
                    pr: h._priority,
                    m: 0,
                  },
                  o = h._overwriteProps.length;
                --o > -1;

              )
                i[h._overwriteProps[o]] = this._firstPT;
              (h._priority || h._onInitAllProps) && (l = !0),
                (h._onDisable || h._onEnable) &&
                  (this._notifyPluginsOfEnabled = !0),
                _._next && (_._next._prev = _);
            } else
              i[a] = j.call(
                this,
                e,
                a,
                "get",
                u,
                a,
                0,
                null,
                this.vars.stringFilter,
                n
              );
          return r && this._kill(r, e)
            ? this._initProps(e, i, s, r, n)
            : this._overwrite > 1 &&
              this._firstPT &&
              s.length > 1 &&
              et(e, this, i, this._overwrite, s)
            ? (this._kill(i, e), this._initProps(e, i, s, r, n))
            : (this._firstPT &&
                ((!1 !== this.vars.lazy && this._duration) ||
                  (this.vars.lazy && !this._duration)) &&
                (X[e._gsTweenID] = !0),
              l);
        }),
        (h.render = function (t, e, i) {
          var s,
            r,
            n,
            a,
            o = this._time,
            l = this._duration,
            h = this._rawPrevTime;
          if (t >= l - 1e-7 && t >= 0)
            (this._totalTime = this._time = l),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
              this._reversed ||
                ((s = !0),
                (r = "onComplete"),
                (i = i || this._timeline.autoRemoveChildren)),
              0 === l &&
                (this._initted || !this.vars.lazy || i) &&
                (this._startTime === this._timeline._duration && (t = 0),
                (0 > h ||
                  (0 >= t && t >= -1e-7) ||
                  (h === p && "isPause" !== this.data)) &&
                  h !== t &&
                  ((i = !0), h > p && (r = "onReverseComplete")),
                (this._rawPrevTime = a = !e || t || h === t ? t : p));
          else if (1e-7 > t)
            (this._totalTime = this._time = 0),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
              (0 !== o || (0 === l && h > 0)) &&
                ((r = "onReverseComplete"), (s = this._reversed)),
              0 > t &&
                ((this._active = !1),
                0 === l &&
                  (this._initted || !this.vars.lazy || i) &&
                  (h >= 0 && (h !== p || "isPause" !== this.data) && (i = !0),
                  (this._rawPrevTime = a = !e || t || h === t ? t : p))),
              (!this._initted || (this._startAt && this._startAt.progress())) &&
                (i = !0);
          else if (((this._totalTime = this._time = t), this._easeType)) {
            var _ = t / l,
              u = this._easeType,
              f = this._easePower;
            (1 === u || (3 === u && _ >= 0.5)) && (_ = 1 - _),
              3 === u && (_ *= 2),
              1 === f
                ? (_ *= _)
                : 2 === f
                ? (_ *= _ * _)
                : 3 === f
                ? (_ *= _ * _ * _)
                : 4 === f && (_ *= _ * _ * _ * _),
              (this.ratio =
                1 === u
                  ? 1 - _
                  : 2 === u
                  ? _
                  : 0.5 > t / l
                  ? _ / 2
                  : 1 - _ / 2);
          } else this.ratio = this._ease.getRatio(t / l);
          if (this._time !== o || i) {
            if (!this._initted) {
              if ((this._init(), !this._initted || this._gc)) return;
              if (
                !i &&
                this._firstPT &&
                ((!1 !== this.vars.lazy && this._duration) ||
                  (this.vars.lazy && !this._duration))
              )
                return (
                  (this._time = this._totalTime = o),
                  (this._rawPrevTime = h),
                  I.push(this),
                  void (this._lazy = [t, e])
                );
              this._time && !s
                ? (this.ratio = this._ease.getRatio(this._time / l))
                : s &&
                  this._ease._calcEnd &&
                  (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
            }
            for (
              !1 !== this._lazy && (this._lazy = !1),
                this._active ||
                  (!this._paused &&
                    this._time !== o &&
                    t >= 0 &&
                    (this._active = !0)),
                0 === o &&
                  (this._startAt &&
                    (t >= 0
                      ? this._startAt.render(t, !0, i)
                      : r || (r = "_dummyGS")),
                  this.vars.onStart &&
                    (0 !== this._time || 0 === l) &&
                    (e || this._callback("onStart"))),
                n = this._firstPT;
              n;

            )
              n.f
                ? n.t[n.p](n.c * this.ratio + n.s)
                : (n.t[n.p] = n.c * this.ratio + n.s),
                (n = n._next);
            this._onUpdate &&
              (0 > t &&
                this._startAt &&
                -1e-4 !== t &&
                this._startAt.render(t, !0, i),
              e ||
                ((this._time !== o || s || i) && this._callback("onUpdate"))),
              r &&
                (!this._gc || i) &&
                (0 > t &&
                  this._startAt &&
                  !this._onUpdate &&
                  -1e-4 !== t &&
                  this._startAt.render(t, !0, i),
                s &&
                  (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                  (this._active = !1)),
                !e && this.vars[r] && this._callback(r),
                0 === l &&
                  this._rawPrevTime === p &&
                  a !== p &&
                  (this._rawPrevTime = 0));
          }
        }),
        (h._kill = function (t, e, i) {
          if (
            ("all" === t && (t = null),
            null == t && (null == e || e === this.target))
          )
            return (this._lazy = !1), this._enabled(!1, !1);
          e =
            "string" != typeof e
              ? e || this._targets || this.target
              : z.selector(e) || e;
          var s,
            r,
            n,
            a,
            o,
            l,
            h,
            _,
            u,
            f =
              i &&
              this._time &&
              i._startTime === this._startTime &&
              this._timeline === i._timeline;
          if ((g(e) || E(e)) && "number" != typeof e[0])
            for (s = e.length; --s > -1; ) this._kill(t, e[s], i) && (l = !0);
          else {
            if (this._targets) {
              for (s = this._targets.length; --s > -1; )
                if (e === this._targets[s]) {
                  (o = this._propLookup[s] || {}),
                    (this._overwrittenProps = this._overwrittenProps || []),
                    (r = this._overwrittenProps[s] =
                      t ? this._overwrittenProps[s] || {} : "all");
                  break;
                }
            } else {
              if (e !== this.target) return !1;
              (o = this._propLookup),
                (r = this._overwrittenProps =
                  t ? this._overwrittenProps || {} : "all");
            }
            if (o) {
              if (
                ((h = t || o),
                (_ =
                  t !== r &&
                  "all" !== r &&
                  t !== o &&
                  ("object" != typeof t || !t._tempKill)),
                i && (z.onOverwrite || this.vars.onOverwrite))
              ) {
                for (n in h) o[n] && (u || (u = []), u.push(n));
                if ((u || !t) && !tt(this, i, e, u)) return !1;
              }
              for (n in h)
                (a = o[n]) &&
                  (f && (a.f ? a.t[a.p](a.s) : (a.t[a.p] = a.s), (l = !0)),
                  a.pg && a.t._kill(h) && (l = !0),
                  (a.pg && 0 !== a.t._overwriteProps.length) ||
                    (a._prev
                      ? (a._prev._next = a._next)
                      : a === this._firstPT && (this._firstPT = a._next),
                    a._next && (a._next._prev = a._prev),
                    (a._next = a._prev = null)),
                  delete o[n]),
                  _ && (r[n] = 1);
              !this._firstPT && this._initted && this._enabled(!1, !1);
            }
          }
          return l;
        }),
        (h.invalidate = function () {
          return (
            this._notifyPluginsOfEnabled &&
              z._onPluginEvent("_onDisable", this),
            (this._firstPT =
              this._overwrittenProps =
              this._startAt =
              this._onUpdate =
                null),
            (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
            (this._propLookup = this._targets ? {} : []),
            D.prototype.invalidate.call(this),
            this.vars.immediateRender &&
              ((this._time = -p), this.render(Math.min(0, -this._delay))),
            this
          );
        }),
        (h._enabled = function (t, e) {
          if ((u || _.wake(), t && this._gc)) {
            var i,
              s = this._targets;
            if (s)
              for (i = s.length; --i > -1; )
                this._siblings[i] = J(s[i], this, !0);
            else this._siblings = J(this.target, this, !0);
          }
          return (
            D.prototype._enabled.call(this, t, e),
            !(!this._notifyPluginsOfEnabled || !this._firstPT) &&
              z._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
          );
        }),
        (z.to = function (t, e, i) {
          return new z(t, e, i);
        }),
        (z.from = function (t, e, i) {
          return (
            (i.runBackwards = !0),
            (i.immediateRender = 0 != i.immediateRender),
            new z(t, e, i)
          );
        }),
        (z.fromTo = function (t, e, i, s) {
          return (
            (s.startAt = i),
            (s.immediateRender =
              0 != s.immediateRender && 0 != i.immediateRender),
            new z(t, e, s)
          );
        }),
        (z.delayedCall = function (t, e, i, s, r) {
          return new z(e, 0, {
            delay: t,
            onComplete: e,
            onCompleteParams: i,
            callbackScope: s,
            onReverseComplete: e,
            onReverseCompleteParams: i,
            immediateRender: !1,
            lazy: !1,
            useFrames: r,
            overwrite: 0,
          });
        }),
        (z.set = function (t, e) {
          return new z(t, 0, e);
        }),
        (z.getTweensOf = function (t, e) {
          if (null == t) return [];
          var i, s, r, n;
          if (
            ((t = "string" != typeof t ? t : z.selector(t) || t),
            (g(t) || E(t)) && "number" != typeof t[0])
          ) {
            for (i = t.length, s = []; --i > -1; )
              s = s.concat(z.getTweensOf(t[i], e));
            for (i = s.length; --i > -1; )
              for (n = s[i], r = i; --r > -1; ) n === s[r] && s.splice(i, 1);
          } else if (t._gsTweenID)
            for (s = J(t).concat(), i = s.length; --i > -1; )
              (s[i]._gc || (e && !s[i].isActive())) && s.splice(i, 1);
          return s || [];
        }),
        (z.killTweensOf = z.killDelayedCallsTo =
          function (t, e, i) {
            "object" == typeof e && ((i = e), (e = !1));
            for (var s = z.getTweensOf(t, e), r = s.length; --r > -1; )
              s[r]._kill(i, t);
          });
      var st = x(
        "plugins.TweenPlugin",
        function (t, e) {
          (this._overwriteProps = (t || "").split(",")),
            (this._propName = this._overwriteProps[0]),
            (this._priority = e || 0),
            (this._super = st.prototype);
        },
        !0
      );
      if (
        ((h = st.prototype),
        (st.version = "1.19.0"),
        (st.API = 2),
        (h._firstPT = null),
        (h._addTween = j),
        (h.setRatio = B),
        (h._kill = function (t) {
          var e,
            i = this._overwriteProps,
            s = this._firstPT;
          if (null != t[this._propName]) this._overwriteProps = [];
          else for (e = i.length; --e > -1; ) null != t[i[e]] && i.splice(e, 1);
          for (; s; )
            null != t[s.n] &&
              (s._next && (s._next._prev = s._prev),
              s._prev
                ? ((s._prev._next = s._next), (s._prev = null))
                : this._firstPT === s && (this._firstPT = s._next)),
              (s = s._next);
          return !1;
        }),
        (h._mod = h._roundProps =
          function (t) {
            for (var e, i = this._firstPT; i; )
              (e =
                t[this._propName] ||
                (null != i.n && t[i.n.split(this._propName + "_").join("")])),
                e &&
                  "function" == typeof e &&
                  (2 === i.f ? (i.t._applyPT.m = e) : (i.m = e)),
                (i = i._next);
          }),
        (z._onPluginEvent = function (t, e) {
          var i,
            s,
            r,
            n,
            a,
            o = e._firstPT;
          if ("_onInitAllProps" === t) {
            for (; o; ) {
              for (a = o._next, s = r; s && s.pr > o.pr; ) s = s._next;
              (o._prev = s ? s._prev : n) ? (o._prev._next = o) : (r = o),
                (o._next = s) ? (s._prev = o) : (n = o),
                (o = a);
            }
            o = e._firstPT = r;
          }
          for (; o; )
            o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0),
              (o = o._next);
          return i;
        }),
        (st.activate = function (t) {
          for (var e = t.length; --e > -1; )
            t[e].API === st.API && (V[new t[e]()._propName] = t[e]);
          return !0;
        }),
        (T.plugin = function (t) {
          if (!(t && t.propName && t.init && t.API))
            throw "illegal plugin definition.";
          var e,
            i = t.propName,
            s = t.priority || 0,
            r = t.overwriteProps,
            n = {
              init: "_onInitTween",
              set: "setRatio",
              kill: "_kill",
              round: "_mod",
              mod: "_mod",
              initAll: "_onInitAllProps",
            },
            a = x(
              "plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin",
              function () {
                st.call(this, i, s), (this._overwriteProps = r || []);
              },
              !0 === t.global
            ),
            o = (a.prototype = new st(i));
          (o.constructor = a), (a.API = t.API);
          for (e in n) "function" == typeof t[e] && (o[n[e]] = t[e]);
          return (a.version = t.version), st.activate([a]), a;
        }),
        (o = t._gsQueue))
      ) {
        for (l = 0; l < o.length; l++) o[l]();
        for (h in y)
          y[h].func ||
            t.console.log("GSAP encountered missing dependency: " + h);
      }
      u = !1;
    }
  })(
    "undefined" != typeof module &&
      module.exports &&
      "undefined" != typeof global
      ? global
      : this || window,
    "TweenMax"
  );
/*! Swiper */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.Swiper = t());
})(this, function () {
  "use strict";
  var f =
      "undefined" == typeof document
        ? {
            body: {},
            addEventListener: function () {},
            removeEventListener: function () {},
            activeElement: { blur: function () {}, nodeName: "" },
            querySelector: function () {
              return null;
            },
            querySelectorAll: function () {
              return [];
            },
            getElementById: function () {
              return null;
            },
            createEvent: function () {
              return { initEvent: function () {} };
            },
            createElement: function () {
              return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function () {},
                getElementsByTagName: function () {
                  return [];
                },
              };
            },
            location: { hash: "" },
          }
        : document,
    Y =
      "undefined" == typeof window
        ? {
            document: f,
            navigator: { userAgent: "" },
            location: {},
            history: {},
            CustomEvent: function () {
              return this;
            },
            addEventListener: function () {},
            removeEventListener: function () {},
            getComputedStyle: function () {
              return {
                getPropertyValue: function () {
                  return "";
                },
              };
            },
            Image: function () {},
            Date: function () {},
            screen: {},
            setTimeout: function () {},
            clearTimeout: function () {},
          }
        : window,
    l = function (e) {
      for (var t = 0; t < e.length; t += 1) this[t] = e[t];
      return (this.length = e.length), this;
    };
  function L(e, t) {
    var a = [],
      i = 0;
    if (e && !t && e instanceof l) return e;
    if (e)
      if ("string" == typeof e) {
        var s,
          r,
          n = e.trim();
        if (0 <= n.indexOf("<") && 0 <= n.indexOf(">")) {
          var o = "div";
          for (
            0 === n.indexOf("<li") && (o = "ul"),
              0 === n.indexOf("<tr") && (o = "tbody"),
              (0 !== n.indexOf("<td") && 0 !== n.indexOf("<th")) || (o = "tr"),
              0 === n.indexOf("<tbody") && (o = "table"),
              0 === n.indexOf("<option") && (o = "select"),
              (r = f.createElement(o)).innerHTML = n,
              i = 0;
            i < r.childNodes.length;
            i += 1
          )
            a.push(r.childNodes[i]);
        } else
          for (
            s =
              t || "#" !== e[0] || e.match(/[ .<>:~]/)
                ? (t || f).querySelectorAll(e.trim())
                : [f.getElementById(e.trim().split("#")[1])],
              i = 0;
            i < s.length;
            i += 1
          )
            s[i] && a.push(s[i]);
      } else if (e.nodeType || e === Y || e === f) a.push(e);
      else if (0 < e.length && e[0].nodeType)
        for (i = 0; i < e.length; i += 1) a.push(e[i]);
    return new l(a);
  }
  function r(e) {
    for (var t = [], a = 0; a < e.length; a += 1)
      -1 === t.indexOf(e[a]) && t.push(e[a]);
    return t;
  }
  (L.fn = l.prototype), (L.Class = l), (L.Dom7 = l);
  var t = {
    addClass: function (e) {
      if (void 0 === e) return this;
      for (var t = e.split(" "), a = 0; a < t.length; a += 1)
        for (var i = 0; i < this.length; i += 1)
          void 0 !== this[i] &&
            void 0 !== this[i].classList &&
            this[i].classList.add(t[a]);
      return this;
    },
    removeClass: function (e) {
      for (var t = e.split(" "), a = 0; a < t.length; a += 1)
        for (var i = 0; i < this.length; i += 1)
          void 0 !== this[i] &&
            void 0 !== this[i].classList &&
            this[i].classList.remove(t[a]);
      return this;
    },
    hasClass: function (e) {
      return !!this[0] && this[0].classList.contains(e);
    },
    toggleClass: function (e) {
      for (var t = e.split(" "), a = 0; a < t.length; a += 1)
        for (var i = 0; i < this.length; i += 1)
          void 0 !== this[i] &&
            void 0 !== this[i].classList &&
            this[i].classList.toggle(t[a]);
      return this;
    },
    attr: function (e, t) {
      var a = arguments;
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (var i = 0; i < this.length; i += 1)
        if (2 === a.length) this[i].setAttribute(e, t);
        else
          for (var s in e) (this[i][s] = e[s]), this[i].setAttribute(s, e[s]);
      return this;
    },
    removeAttr: function (e) {
      for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    data: function (e, t) {
      var a;
      if (void 0 !== t) {
        for (var i = 0; i < this.length; i += 1)
          (a = this[i]).dom7ElementDataStorage ||
            (a.dom7ElementDataStorage = {}),
            (a.dom7ElementDataStorage[e] = t);
        return this;
      }
      if ((a = this[0])) {
        if (a.dom7ElementDataStorage && e in a.dom7ElementDataStorage)
          return a.dom7ElementDataStorage[e];
        var s = a.getAttribute("data-" + e);
        return s || void 0;
      }
    },
    transform: function (e) {
      for (var t = 0; t < this.length; t += 1) {
        var a = this[t].style;
        (a.webkitTransform = e), (a.transform = e);
      }
      return this;
    },
    transition: function (e) {
      "string" != typeof e && (e += "ms");
      for (var t = 0; t < this.length; t += 1) {
        var a = this[t].style;
        (a.webkitTransitionDuration = e), (a.transitionDuration = e);
      }
      return this;
    },
    on: function () {
      for (var e, t = [], a = arguments.length; a--; ) t[a] = arguments[a];
      var i = t[0],
        r = t[1],
        n = t[2],
        s = t[3];
      function o(e) {
        var t = e.target;
        if (t) {
          var a = e.target.dom7EventData || [];
          if ((a.indexOf(e) < 0 && a.unshift(e), L(t).is(r))) n.apply(t, a);
          else
            for (var i = L(t).parents(), s = 0; s < i.length; s += 1)
              L(i[s]).is(r) && n.apply(i[s], a);
        }
      }
      function l(e) {
        var t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
      }
      "function" == typeof t[1] &&
        ((i = (e = t)[0]), (n = e[1]), (s = e[2]), (r = void 0)),
        s || (s = !1);
      for (var d, p = i.split(" "), c = 0; c < this.length; c += 1) {
        var u = this[c];
        if (r)
          for (d = 0; d < p.length; d += 1) {
            var h = p[d];
            u.dom7LiveListeners || (u.dom7LiveListeners = {}),
              u.dom7LiveListeners[h] || (u.dom7LiveListeners[h] = []),
              u.dom7LiveListeners[h].push({ listener: n, proxyListener: o }),
              u.addEventListener(h, o, s);
          }
        else
          for (d = 0; d < p.length; d += 1) {
            var v = p[d];
            u.dom7Listeners || (u.dom7Listeners = {}),
              u.dom7Listeners[v] || (u.dom7Listeners[v] = []),
              u.dom7Listeners[v].push({ listener: n, proxyListener: l }),
              u.addEventListener(v, l, s);
          }
      }
      return this;
    },
    off: function () {
      for (var e, t = [], a = arguments.length; a--; ) t[a] = arguments[a];
      var i = t[0],
        s = t[1],
        r = t[2],
        n = t[3];
      "function" == typeof t[1] &&
        ((i = (e = t)[0]), (r = e[1]), (n = e[2]), (s = void 0)),
        n || (n = !1);
      for (var o = i.split(" "), l = 0; l < o.length; l += 1)
        for (var d = o[l], p = 0; p < this.length; p += 1) {
          var c = this[p],
            u = void 0;
          if (
            (!s && c.dom7Listeners
              ? (u = c.dom7Listeners[d])
              : s && c.dom7LiveListeners && (u = c.dom7LiveListeners[d]),
            u && u.length)
          )
            for (var h = u.length - 1; 0 <= h; h -= 1) {
              var v = u[h];
              r && v.listener === r
                ? (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1))
                : r ||
                  (c.removeEventListener(d, v.proxyListener, n),
                  u.splice(h, 1));
            }
        }
      return this;
    },
    trigger: function () {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      for (var a = e[0].split(" "), i = e[1], s = 0; s < a.length; s += 1)
        for (var r = a[s], n = 0; n < this.length; n += 1) {
          var o = this[n],
            l = void 0;
          try {
            l = new Y.CustomEvent(r, {
              detail: i,
              bubbles: !0,
              cancelable: !0,
            });
          } catch (e) {
            (l = f.createEvent("Event")).initEvent(r, !0, !0), (l.detail = i);
          }
          (o.dom7EventData = e.filter(function (e, t) {
            return 0 < t;
          })),
            o.dispatchEvent(l),
            (o.dom7EventData = []),
            delete o.dom7EventData;
        }
      return this;
    },
    transitionEnd: function (t) {
      var a,
        i = ["webkitTransitionEnd", "transitionend"],
        s = this;
      function r(e) {
        if (e.target === this)
          for (t.call(this, e), a = 0; a < i.length; a += 1) s.off(i[a], r);
      }
      if (t) for (a = 0; a < i.length; a += 1) s.on(i[a], r);
      return this;
    },
    outerWidth: function (e) {
      if (0 < this.length) {
        if (e) {
          var t = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(t.getPropertyValue("margin-right")) +
            parseFloat(t.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (0 < this.length) {
        if (e) {
          var t = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(t.getPropertyValue("margin-top")) +
            parseFloat(t.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    offset: function () {
      if (0 < this.length) {
        var e = this[0],
          t = e.getBoundingClientRect(),
          a = f.body,
          i = e.clientTop || a.clientTop || 0,
          s = e.clientLeft || a.clientLeft || 0,
          r = e === Y ? Y.scrollY : e.scrollTop,
          n = e === Y ? Y.scrollX : e.scrollLeft;
        return { top: t.top + r - i, left: t.left + n - s };
      }
      return null;
    },
    css: function (e, t) {
      var a;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (a = 0; a < this.length; a += 1)
            for (var i in e) this[a].style[i] = e[i];
          return this;
        }
        if (this[0])
          return Y.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      if (!e) return this;
      for (var t = 0; t < this.length; t += 1)
        if (!1 === e.call(this[t], t, this[t])) return this;
      return this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
      for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      var t,
        a,
        i = this[0];
      if (!i || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (i.matches) return i.matches(e);
        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
        if (i.msMatchesSelector) return i.msMatchesSelector(e);
        for (t = L(e), a = 0; a < t.length; a += 1) if (t[a] === i) return !0;
        return !1;
      }
      if (e === f) return i === f;
      if (e === Y) return i === Y;
      if (e.nodeType || e instanceof l) {
        for (t = e.nodeType ? [e] : e, a = 0; a < t.length; a += 1)
          if (t[a] === i) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      var e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      var t,
        a = this.length;
      return new l(
        a - 1 < e ? [] : e < 0 ? ((t = a + e) < 0 ? [] : [this[t]]) : [this[e]]
      );
    },
    append: function () {
      for (var e, t = [], a = arguments.length; a--; ) t[a] = arguments[a];
      for (var i = 0; i < t.length; i += 1) {
        e = t[i];
        for (var s = 0; s < this.length; s += 1)
          if ("string" == typeof e) {
            var r = f.createElement("div");
            for (r.innerHTML = e; r.firstChild; )
              this[s].appendChild(r.firstChild);
          } else if (e instanceof l)
            for (var n = 0; n < e.length; n += 1) this[s].appendChild(e[n]);
          else this[s].appendChild(e);
      }
      return this;
    },
    prepend: function (e) {
      var t, a;
      for (t = 0; t < this.length; t += 1)
        if ("string" == typeof e) {
          var i = f.createElement("div");
          for (i.innerHTML = e, a = i.childNodes.length - 1; 0 <= a; a -= 1)
            this[t].insertBefore(i.childNodes[a], this[t].childNodes[0]);
        } else if (e instanceof l)
          for (a = 0; a < e.length; a += 1)
            this[t].insertBefore(e[a], this[t].childNodes[0]);
        else this[t].insertBefore(e, this[t].childNodes[0]);
      return this;
    },
    next: function (e) {
      return 0 < this.length
        ? e
          ? this[0].nextElementSibling && L(this[0].nextElementSibling).is(e)
            ? new l([this[0].nextElementSibling])
            : new l([])
          : this[0].nextElementSibling
          ? new l([this[0].nextElementSibling])
          : new l([])
        : new l([]);
    },
    nextAll: function (e) {
      var t = [],
        a = this[0];
      if (!a) return new l([]);
      for (; a.nextElementSibling; ) {
        var i = a.nextElementSibling;
        e ? L(i).is(e) && t.push(i) : t.push(i), (a = i);
      }
      return new l(t);
    },
    prev: function (e) {
      if (0 < this.length) {
        var t = this[0];
        return e
          ? t.previousElementSibling && L(t.previousElementSibling).is(e)
            ? new l([t.previousElementSibling])
            : new l([])
          : t.previousElementSibling
          ? new l([t.previousElementSibling])
          : new l([]);
      }
      return new l([]);
    },
    prevAll: function (e) {
      var t = [],
        a = this[0];
      if (!a) return new l([]);
      for (; a.previousElementSibling; ) {
        var i = a.previousElementSibling;
        e ? L(i).is(e) && t.push(i) : t.push(i), (a = i);
      }
      return new l(t);
    },
    parent: function (e) {
      for (var t = [], a = 0; a < this.length; a += 1)
        null !== this[a].parentNode &&
          (e
            ? L(this[a].parentNode).is(e) && t.push(this[a].parentNode)
            : t.push(this[a].parentNode));
      return L(r(t));
    },
    parents: function (e) {
      for (var t = [], a = 0; a < this.length; a += 1)
        for (var i = this[a].parentNode; i; )
          e ? L(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
      return L(r(t));
    },
    closest: function (e) {
      var t = this;
      return void 0 === e
        ? new l([])
        : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      for (var t = [], a = 0; a < this.length; a += 1)
        for (var i = this[a].querySelectorAll(e), s = 0; s < i.length; s += 1)
          t.push(i[s]);
      return new l(t);
    },
    children: function (e) {
      for (var t = [], a = 0; a < this.length; a += 1)
        for (var i = this[a].childNodes, s = 0; s < i.length; s += 1)
          e
            ? 1 === i[s].nodeType && L(i[s]).is(e) && t.push(i[s])
            : 1 === i[s].nodeType && t.push(i[s]);
      return new l(r(t));
    },
    remove: function () {
      for (var e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
    add: function () {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      var a, i;
      for (a = 0; a < e.length; a += 1) {
        var s = L(e[a]);
        for (i = 0; i < s.length; i += 1)
          (this[this.length] = s[i]), (this.length += 1);
      }
      return this;
    },
    styles: function () {
      return this[0] ? Y.getComputedStyle(this[0], null) : {};
    },
  };
  Object.keys(t).forEach(function (e) {
    L.fn[e] = t[e];
  });
  var e,
    a,
    i,
    V = {
      deleteProps: function (e) {
        var t = e;
        Object.keys(t).forEach(function (e) {
          try {
            t[e] = null;
          } catch (e) {}
          try {
            delete t[e];
          } catch (e) {}
        });
      },
      nextTick: function (e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t);
      },
      now: function () {
        return Date.now();
      },
      getTranslate: function (e, t) {
        var a, i, s;
        void 0 === t && (t = "x");
        var r = Y.getComputedStyle(e, null);
        return (
          Y.WebKitCSSMatrix
            ? (6 < (i = r.transform || r.webkitTransform).split(",").length &&
                (i = i
                  .split(", ")
                  .map(function (e) {
                    return e.replace(",", ".");
                  })
                  .join(", ")),
              (s = new Y.WebKitCSSMatrix("none" === i ? "" : i)))
            : (a = (s =
                r.MozTransform ||
                r.OTransform ||
                r.MsTransform ||
                r.msTransform ||
                r.transform ||
                r
                  .getPropertyValue("transform")
                  .replace("translate(", "matrix(1, 0, 0, 1,"))
                .toString()
                .split(",")),
          "x" === t &&
            (i = Y.WebKitCSSMatrix
              ? s.m41
              : 16 === a.length
              ? parseFloat(a[12])
              : parseFloat(a[4])),
          "y" === t &&
            (i = Y.WebKitCSSMatrix
              ? s.m42
              : 16 === a.length
              ? parseFloat(a[13])
              : parseFloat(a[5])),
          i || 0
        );
      },
      parseUrlQuery: function (e) {
        var t,
          a,
          i,
          s,
          r = {},
          n = e || Y.location.href;
        if ("string" == typeof n && n.length)
          for (
            s = (a = (n = -1 < n.indexOf("?") ? n.replace(/\S*\?/, "") : "")
              .split("&")
              .filter(function (e) {
                return "" !== e;
              })).length,
              t = 0;
            t < s;
            t += 1
          )
            (i = a[t].replace(/#\S+/g, "").split("=")),
              (r[decodeURIComponent(i[0])] =
                void 0 === i[1] ? void 0 : decodeURIComponent(i[1]) || "");
        return r;
      },
      isObject: function (e) {
        return (
          "object" == typeof e &&
          null !== e &&
          e.constructor &&
          e.constructor === Object
        );
      },
      extend: function () {
        for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
        for (var a = Object(e[0]), i = 1; i < e.length; i += 1) {
          var s = e[i];
          if (null != s)
            for (
              var r = Object.keys(Object(s)), n = 0, o = r.length;
              n < o;
              n += 1
            ) {
              var l = r[n],
                d = Object.getOwnPropertyDescriptor(s, l);
              void 0 !== d &&
                d.enumerable &&
                (V.isObject(a[l]) && V.isObject(s[l])
                  ? V.extend(a[l], s[l])
                  : !V.isObject(a[l]) && V.isObject(s[l])
                  ? ((a[l] = {}), V.extend(a[l], s[l]))
                  : (a[l] = s[l]));
            }
        }
        return a;
      },
    },
    F =
      ((i = f.createElement("div")),
      {
        touch:
          (Y.Modernizr && !0 === Y.Modernizr.touch) ||
          !!(
            "ontouchstart" in Y ||
            (Y.DocumentTouch && f instanceof Y.DocumentTouch)
          ),
        pointerEvents: !!(
          Y.navigator.pointerEnabled ||
          Y.PointerEvent ||
          "maxTouchPoints" in Y.navigator
        ),
        prefixedPointerEvents: !!Y.navigator.msPointerEnabled,
        transition:
          ((a = i.style),
          "transition" in a || "webkitTransition" in a || "MozTransition" in a),
        transforms3d:
          (Y.Modernizr && !0 === Y.Modernizr.csstransforms3d) ||
          ((e = i.style),
          "webkitPerspective" in e ||
            "MozPerspective" in e ||
            "OPerspective" in e ||
            "MsPerspective" in e ||
            "perspective" in e),
        flexbox: (function () {
          for (
            var e = i.style,
              t =
                "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(
                  " "
                ),
              a = 0;
            a < t.length;
            a += 1
          )
            if (t[a] in e) return !0;
          return !1;
        })(),
        observer: "MutationObserver" in Y || "WebkitMutationObserver" in Y,
        passiveListener: (function () {
          var e = !1;
          try {
            var t = Object.defineProperty({}, "passive", {
              get: function () {
                e = !0;
              },
            });
            Y.addEventListener("testPassiveListener", null, t);
          } catch (e) {}
          return e;
        })(),
        gestures: "ongesturestart" in Y,
      }),
    s = function (e) {
      void 0 === e && (e = {});
      var t = this;
      (t.params = e),
        (t.eventsListeners = {}),
        t.params &&
          t.params.on &&
          Object.keys(t.params.on).forEach(function (e) {
            t.on(e, t.params.on[e]);
          });
    },
    n = { components: { configurable: !0 } };
  (s.prototype.on = function (e, t, a) {
    var i = this;
    if ("function" != typeof t) return i;
    var s = a ? "unshift" : "push";
    return (
      e.split(" ").forEach(function (e) {
        i.eventsListeners[e] || (i.eventsListeners[e] = []),
          i.eventsListeners[e][s](t);
      }),
      i
    );
  }),
    (s.prototype.once = function (i, s, e) {
      var r = this;
      if ("function" != typeof s) return r;
      return r.on(
        i,
        function e() {
          for (var t = [], a = arguments.length; a--; ) t[a] = arguments[a];
          s.apply(r, t), r.off(i, e);
        },
        e
      );
    }),
    (s.prototype.off = function (e, i) {
      var s = this;
      return (
        s.eventsListeners &&
          e.split(" ").forEach(function (a) {
            void 0 === i
              ? (s.eventsListeners[a] = [])
              : s.eventsListeners[a] &&
                s.eventsListeners[a].length &&
                s.eventsListeners[a].forEach(function (e, t) {
                  e === i && s.eventsListeners[a].splice(t, 1);
                });
          }),
        s
      );
    }),
    (s.prototype.emit = function () {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      var a,
        i,
        s,
        r = this;
      return (
        r.eventsListeners &&
          ("string" == typeof e[0] || Array.isArray(e[0])
            ? ((a = e[0]), (i = e.slice(1, e.length)), (s = r))
            : ((a = e[0].events), (i = e[0].data), (s = e[0].context || r)),
          (Array.isArray(a) ? a : a.split(" ")).forEach(function (e) {
            if (r.eventsListeners && r.eventsListeners[e]) {
              var t = [];
              r.eventsListeners[e].forEach(function (e) {
                t.push(e);
              }),
                t.forEach(function (e) {
                  e.apply(s, i);
                });
            }
          })),
        r
      );
    }),
    (s.prototype.useModulesParams = function (a) {
      var i = this;
      i.modules &&
        Object.keys(i.modules).forEach(function (e) {
          var t = i.modules[e];
          t.params && V.extend(a, t.params);
        });
    }),
    (s.prototype.useModules = function (i) {
      void 0 === i && (i = {});
      var s = this;
      s.modules &&
        Object.keys(s.modules).forEach(function (e) {
          var a = s.modules[e],
            t = i[e] || {};
          a.instance &&
            Object.keys(a.instance).forEach(function (e) {
              var t = a.instance[e];
              s[e] = "function" == typeof t ? t.bind(s) : t;
            }),
            a.on &&
              s.on &&
              Object.keys(a.on).forEach(function (e) {
                s.on(e, a.on[e]);
              }),
            a.create && a.create.bind(s)(t);
        });
    }),
    (n.components.set = function (e) {
      this.use && this.use(e);
    }),
    (s.installModule = function (t) {
      for (var e = [], a = arguments.length - 1; 0 < a--; )
        e[a] = arguments[a + 1];
      var i = this;
      i.prototype.modules || (i.prototype.modules = {});
      var s = t.name || Object.keys(i.prototype.modules).length + "_" + V.now();
      return (
        (i.prototype.modules[s] = t).proto &&
          Object.keys(t.proto).forEach(function (e) {
            i.prototype[e] = t.proto[e];
          }),
        t.static &&
          Object.keys(t.static).forEach(function (e) {
            i[e] = t.static[e];
          }),
        t.install && t.install.apply(i, e),
        i
      );
    }),
    (s.use = function (e) {
      for (var t = [], a = arguments.length - 1; 0 < a--; )
        t[a] = arguments[a + 1];
      var i = this;
      return Array.isArray(e)
        ? (e.forEach(function (e) {
            return i.installModule(e);
          }),
          i)
        : i.installModule.apply(i, [e].concat(t));
    }),
    Object.defineProperties(s, n);
  var o = {
    updateSize: function () {
      var e,
        t,
        a = this,
        i = a.$el;
      (e = void 0 !== a.params.width ? a.params.width : i[0].clientWidth),
        (t = void 0 !== a.params.height ? a.params.height : i[0].clientHeight),
        (0 === e && a.isHorizontal()) ||
          (0 === t && a.isVertical()) ||
          ((e =
            e -
            parseInt(i.css("padding-left"), 10) -
            parseInt(i.css("padding-right"), 10)),
          (t =
            t -
            parseInt(i.css("padding-top"), 10) -
            parseInt(i.css("padding-bottom"), 10)),
          V.extend(a, { width: e, height: t, size: a.isHorizontal() ? e : t }));
    },
    updateSlides: function () {
      var e = this,
        t = e.params,
        a = e.$wrapperEl,
        i = e.size,
        s = e.rtlTranslate,
        r = e.wrongRTL,
        n = e.virtual && t.virtual.enabled,
        o = n ? e.virtual.slides.length : e.slides.length,
        l = a.children("." + e.params.slideClass),
        d = n ? e.virtual.slides.length : l.length,
        p = [],
        c = [],
        u = [],
        h = t.slidesOffsetBefore;
      "function" == typeof h && (h = t.slidesOffsetBefore.call(e));
      var v = t.slidesOffsetAfter;
      "function" == typeof v && (v = t.slidesOffsetAfter.call(e));
      var f = e.snapGrid.length,
        m = e.snapGrid.length,
        g = t.spaceBetween,
        b = -h,
        w = 0,
        y = 0;
      if (void 0 !== i) {
        var x, T;
        "string" == typeof g &&
          0 <= g.indexOf("%") &&
          (g = (parseFloat(g.replace("%", "")) / 100) * i),
          (e.virtualSize = -g),
          s
            ? l.css({ marginLeft: "", marginTop: "" })
            : l.css({ marginRight: "", marginBottom: "" }),
          1 < t.slidesPerColumn &&
            ((x =
              Math.floor(d / t.slidesPerColumn) === d / e.params.slidesPerColumn
                ? d
                : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn),
            "auto" !== t.slidesPerView &&
              "row" === t.slidesPerColumnFill &&
              (x = Math.max(x, t.slidesPerView * t.slidesPerColumn)));
        for (
          var E,
            S = t.slidesPerColumn,
            C = x / S,
            M = C - (t.slidesPerColumn * C - d),
            k = 0;
          k < d;
          k += 1
        ) {
          T = 0;
          var P = l.eq(k);
          if (1 < t.slidesPerColumn) {
            var z = void 0,
              $ = void 0,
              L = void 0;
            "column" === t.slidesPerColumnFill
              ? ((L = k - ($ = Math.floor(k / S)) * S),
                (M < $ || ($ === M && L === S - 1)) &&
                  S <= (L += 1) &&
                  ((L = 0), ($ += 1)),
                (z = $ + (L * x) / S),
                P.css({
                  "-webkit-box-ordinal-group": z,
                  "-moz-box-ordinal-group": z,
                  "-ms-flex-order": z,
                  "-webkit-order": z,
                  order: z,
                }))
              : ($ = k - (L = Math.floor(k / C)) * C),
              P.css(
                "margin-" + (e.isHorizontal() ? "top" : "left"),
                0 !== L && t.spaceBetween && t.spaceBetween + "px"
              )
                .attr("data-swiper-column", $)
                .attr("data-swiper-row", L);
          }
          if ("none" !== P.css("display")) {
            if ("auto" === t.slidesPerView) {
              var I = Y.getComputedStyle(P[0], null),
                D = P[0].style.transform,
                O = P[0].style.webkitTransform;
              D && (P[0].style.transform = "none"),
                O && (P[0].style.webkitTransform = "none"),
                (T = t.roundLengths
                  ? e.isHorizontal()
                    ? P.outerWidth(!0)
                    : P.outerHeight(!0)
                  : e.isHorizontal()
                  ? parseFloat(I.getPropertyValue("width")) +
                    parseFloat(I.getPropertyValue("margin-left")) +
                    parseFloat(I.getPropertyValue("margin-right"))
                  : parseFloat(I.getPropertyValue("height")) +
                    parseFloat(I.getPropertyValue("margin-top")) +
                    parseFloat(I.getPropertyValue("margin-bottom"))),
                D && (P[0].style.transform = D),
                O && (P[0].style.webkitTransform = O),
                t.roundLengths && (T = Math.floor(T));
            } else
              (T = (i - (t.slidesPerView - 1) * g) / t.slidesPerView),
                t.roundLengths && (T = Math.floor(T)),
                l[k] &&
                  (e.isHorizontal()
                    ? (l[k].style.width = T + "px")
                    : (l[k].style.height = T + "px"));
            l[k] && (l[k].swiperSlideSize = T),
              u.push(T),
              t.centeredSlides
                ? ((b = b + T / 2 + w / 2 + g),
                  0 === w && 0 !== k && (b = b - i / 2 - g),
                  0 === k && (b = b - i / 2 - g),
                  Math.abs(b) < 0.001 && (b = 0),
                  t.roundLengths && (b = Math.floor(b)),
                  y % t.slidesPerGroup == 0 && p.push(b),
                  c.push(b))
                : (t.roundLengths && (b = Math.floor(b)),
                  y % t.slidesPerGroup == 0 && p.push(b),
                  c.push(b),
                  (b = b + T + g)),
              (e.virtualSize += T + g),
              (w = T),
              (y += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, i) + v),
          s &&
            r &&
            ("slide" === t.effect || "coverflow" === t.effect) &&
            a.css({ width: e.virtualSize + t.spaceBetween + "px" }),
          (F.flexbox && !t.setWrapperSize) ||
            (e.isHorizontal()
              ? a.css({ width: e.virtualSize + t.spaceBetween + "px" })
              : a.css({ height: e.virtualSize + t.spaceBetween + "px" })),
          1 < t.slidesPerColumn &&
            ((e.virtualSize = (T + t.spaceBetween) * x),
            (e.virtualSize =
              Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween),
            e.isHorizontal()
              ? a.css({ width: e.virtualSize + t.spaceBetween + "px" })
              : a.css({ height: e.virtualSize + t.spaceBetween + "px" }),
            t.centeredSlides))
        ) {
          E = [];
          for (var A = 0; A < p.length; A += 1) {
            var N = p[A];
            t.roundLengths && (N = Math.floor(N)),
              p[A] < e.virtualSize + p[0] && E.push(N);
          }
          p = E;
        }
        if (!t.centeredSlides) {
          E = [];
          for (var H = 0; H < p.length; H += 1) {
            var G = p[H];
            t.roundLengths && (G = Math.floor(G)),
              p[H] <= e.virtualSize - i && E.push(G);
          }
          (p = E),
            1 < Math.floor(e.virtualSize - i) - Math.floor(p[p.length - 1]) &&
              p.push(e.virtualSize - i);
        }
        if (
          (0 === p.length && (p = [0]),
          0 !== t.spaceBetween &&
            (e.isHorizontal()
              ? s
                ? l.css({ marginLeft: g + "px" })
                : l.css({ marginRight: g + "px" })
              : l.css({ marginBottom: g + "px" })),
          t.centerInsufficientSlides)
        ) {
          var B = 0;
          if (
            (u.forEach(function (e) {
              B += e + (t.spaceBetween ? t.spaceBetween : 0);
            }),
            (B -= t.spaceBetween) < i)
          ) {
            var X = (i - B) / 2;
            p.forEach(function (e, t) {
              p[t] = e - X;
            }),
              c.forEach(function (e, t) {
                c[t] = e + X;
              });
          }
        }
        V.extend(e, {
          slides: l,
          snapGrid: p,
          slidesGrid: c,
          slidesSizesGrid: u,
        }),
          d !== o && e.emit("slidesLengthChange"),
          p.length !== f &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          c.length !== m && e.emit("slidesGridLengthChange"),
          (t.watchSlidesProgress || t.watchSlidesVisibility) &&
            e.updateSlidesOffset();
      }
    },
    updateAutoHeight: function (e) {
      var t,
        a = this,
        i = [],
        s = 0;
      if (
        ("number" == typeof e
          ? a.setTransition(e)
          : !0 === e && a.setTransition(a.params.speed),
        "auto" !== a.params.slidesPerView && 1 < a.params.slidesPerView)
      )
        for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
          var r = a.activeIndex + t;
          if (r > a.slides.length) break;
          i.push(a.slides.eq(r)[0]);
        }
      else i.push(a.slides.eq(a.activeIndex)[0]);
      for (t = 0; t < i.length; t += 1)
        if (void 0 !== i[t]) {
          var n = i[t].offsetHeight;
          s = s < n ? n : s;
        }
      s && a.$wrapperEl.css("height", s + "px");
    },
    updateSlidesOffset: function () {
      for (var e = this.slides, t = 0; t < e.length; t += 1)
        e[t].swiperSlideOffset = this.isHorizontal()
          ? e[t].offsetLeft
          : e[t].offsetTop;
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      var t = this,
        a = t.params,
        i = t.slides,
        s = t.rtlTranslate;
      if (0 !== i.length) {
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
        var r = -e;
        s && (r = e),
          i.removeClass(a.slideVisibleClass),
          (t.visibleSlidesIndexes = []),
          (t.visibleSlides = []);
        for (var n = 0; n < i.length; n += 1) {
          var o = i[n],
            l =
              (r +
                (a.centeredSlides ? t.minTranslate() : 0) -
                o.swiperSlideOffset) /
              (o.swiperSlideSize + a.spaceBetween);
          if (a.watchSlidesVisibility) {
            var d = -(r - o.swiperSlideOffset),
              p = d + t.slidesSizesGrid[n];
            ((0 <= d && d < t.size) ||
              (0 < p && p <= t.size) ||
              (d <= 0 && p >= t.size)) &&
              (t.visibleSlides.push(o),
              t.visibleSlidesIndexes.push(n),
              i.eq(n).addClass(a.slideVisibleClass));
          }
          o.progress = s ? -l : l;
        }
        t.visibleSlides = L(t.visibleSlides);
      }
    },
    updateProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      var t = this,
        a = t.params,
        i = t.maxTranslate() - t.minTranslate(),
        s = t.progress,
        r = t.isBeginning,
        n = t.isEnd,
        o = r,
        l = n;
      0 === i
        ? (n = r = !(s = 0))
        : ((r = (s = (e - t.minTranslate()) / i) <= 0), (n = 1 <= s)),
        V.extend(t, { progress: s, isBeginning: r, isEnd: n }),
        (a.watchSlidesProgress || a.watchSlidesVisibility) &&
          t.updateSlidesProgress(e),
        r && !o && t.emit("reachBeginning toEdge"),
        n && !l && t.emit("reachEnd toEdge"),
        ((o && !r) || (l && !n)) && t.emit("fromEdge"),
        t.emit("progress", s);
    },
    updateSlidesClasses: function () {
      var e,
        t = this,
        a = t.slides,
        i = t.params,
        s = t.$wrapperEl,
        r = t.activeIndex,
        n = t.realIndex,
        o = t.virtual && i.virtual.enabled;
      a.removeClass(
        i.slideActiveClass +
          " " +
          i.slideNextClass +
          " " +
          i.slidePrevClass +
          " " +
          i.slideDuplicateActiveClass +
          " " +
          i.slideDuplicateNextClass +
          " " +
          i.slideDuplicatePrevClass
      ),
        (e = o
          ? t.$wrapperEl.find(
              "." + i.slideClass + '[data-swiper-slide-index="' + r + '"]'
            )
          : a.eq(r)).addClass(i.slideActiveClass),
        i.loop &&
          (e.hasClass(i.slideDuplicateClass)
            ? s
                .children(
                  "." +
                    i.slideClass +
                    ":not(." +
                    i.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    n +
                    '"]'
                )
                .addClass(i.slideDuplicateActiveClass)
            : s
                .children(
                  "." +
                    i.slideClass +
                    "." +
                    i.slideDuplicateClass +
                    '[data-swiper-slide-index="' +
                    n +
                    '"]'
                )
                .addClass(i.slideDuplicateActiveClass));
      var l = e
        .nextAll("." + i.slideClass)
        .eq(0)
        .addClass(i.slideNextClass);
      i.loop && 0 === l.length && (l = a.eq(0)).addClass(i.slideNextClass);
      var d = e
        .prevAll("." + i.slideClass)
        .eq(0)
        .addClass(i.slidePrevClass);
      i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass),
        i.loop &&
          (l.hasClass(i.slideDuplicateClass)
            ? s
                .children(
                  "." +
                    i.slideClass +
                    ":not(." +
                    i.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    l.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(i.slideDuplicateNextClass)
            : s
                .children(
                  "." +
                    i.slideClass +
                    "." +
                    i.slideDuplicateClass +
                    '[data-swiper-slide-index="' +
                    l.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(i.slideDuplicateNextClass),
          d.hasClass(i.slideDuplicateClass)
            ? s
                .children(
                  "." +
                    i.slideClass +
                    ":not(." +
                    i.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    d.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(i.slideDuplicatePrevClass)
            : s
                .children(
                  "." +
                    i.slideClass +
                    "." +
                    i.slideDuplicateClass +
                    '[data-swiper-slide-index="' +
                    d.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(i.slideDuplicatePrevClass));
    },
    updateActiveIndex: function (e) {
      var t,
        a = this,
        i = a.rtlTranslate ? a.translate : -a.translate,
        s = a.slidesGrid,
        r = a.snapGrid,
        n = a.params,
        o = a.activeIndex,
        l = a.realIndex,
        d = a.snapIndex,
        p = e;
      if (void 0 === p) {
        for (var c = 0; c < s.length; c += 1)
          void 0 !== s[c + 1]
            ? i >= s[c] && i < s[c + 1] - (s[c + 1] - s[c]) / 2
              ? (p = c)
              : i >= s[c] && i < s[c + 1] && (p = c + 1)
            : i >= s[c] && (p = c);
        n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0);
      }
      if (
        ((t =
          0 <= r.indexOf(i)
            ? r.indexOf(i)
            : Math.floor(p / n.slidesPerGroup)) >= r.length &&
          (t = r.length - 1),
        p !== o)
      ) {
        var u = parseInt(
          a.slides.eq(p).attr("data-swiper-slide-index") || p,
          10
        );
        V.extend(a, {
          snapIndex: t,
          realIndex: u,
          previousIndex: o,
          activeIndex: p,
        }),
          a.emit("activeIndexChange"),
          a.emit("snapIndexChange"),
          l !== u && a.emit("realIndexChange"),
          a.emit("slideChange");
      } else t !== d && ((a.snapIndex = t), a.emit("snapIndexChange"));
    },
    updateClickedSlide: function (e) {
      var t = this,
        a = t.params,
        i = L(e.target).closest("." + a.slideClass)[0],
        s = !1;
      if (i)
        for (var r = 0; r < t.slides.length; r += 1)
          t.slides[r] === i && (s = !0);
      if (!i || !s)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = i),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              L(i).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = L(i).index()),
        a.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  var d = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      var t = this.params,
        a = this.rtlTranslate,
        i = this.translate,
        s = this.$wrapperEl;
      if (t.virtualTranslate) return a ? -i : i;
      var r = V.getTranslate(s[0], e);
      return a && (r = -r), r || 0;
    },
    setTranslate: function (e, t) {
      var a = this,
        i = a.rtlTranslate,
        s = a.params,
        r = a.$wrapperEl,
        n = a.progress,
        o = 0,
        l = 0;
      a.isHorizontal() ? (o = i ? -e : e) : (l = e),
        s.roundLengths && ((o = Math.floor(o)), (l = Math.floor(l))),
        s.virtualTranslate ||
          (F.transforms3d
            ? r.transform("translate3d(" + o + "px, " + l + "px, 0px)")
            : r.transform("translate(" + o + "px, " + l + "px)")),
        (a.previousTranslate = a.translate),
        (a.translate = a.isHorizontal() ? o : l);
      var d = a.maxTranslate() - a.minTranslate();
      (0 === d ? 0 : (e - a.minTranslate()) / d) !== n && a.updateProgress(e),
        a.emit("setTranslate", a.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
  };
  var p = {
    setTransition: function (e, t) {
      this.$wrapperEl.transition(e), this.emit("setTransition", e, t);
    },
    transitionStart: function (e, t) {
      void 0 === e && (e = !0);
      var a = this,
        i = a.activeIndex,
        s = a.params,
        r = a.previousIndex;
      s.autoHeight && a.updateAutoHeight();
      var n = t;
      if (
        (n || (n = r < i ? "next" : i < r ? "prev" : "reset"),
        a.emit("transitionStart"),
        e && i !== r)
      ) {
        if ("reset" === n) return void a.emit("slideResetTransitionStart");
        a.emit("slideChangeTransitionStart"),
          "next" === n
            ? a.emit("slideNextTransitionStart")
            : a.emit("slidePrevTransitionStart");
      }
    },
    transitionEnd: function (e, t) {
      void 0 === e && (e = !0);
      var a = this,
        i = a.activeIndex,
        s = a.previousIndex;
      (a.animating = !1), a.setTransition(0);
      var r = t;
      if (
        (r || (r = s < i ? "next" : i < s ? "prev" : "reset"),
        a.emit("transitionEnd"),
        e && i !== s)
      ) {
        if ("reset" === r) return void a.emit("slideResetTransitionEnd");
        a.emit("slideChangeTransitionEnd"),
          "next" === r
            ? a.emit("slideNextTransitionEnd")
            : a.emit("slidePrevTransitionEnd");
      }
    },
  };
  var c = {
    slideTo: function (e, t, a, i) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === a && (a = !0);
      var s = this,
        r = e;
      r < 0 && (r = 0);
      var n = s.params,
        o = s.snapGrid,
        l = s.slidesGrid,
        d = s.previousIndex,
        p = s.activeIndex,
        c = s.rtlTranslate;
      if (s.animating && n.preventInteractionOnTransition) return !1;
      var u = Math.floor(r / n.slidesPerGroup);
      u >= o.length && (u = o.length - 1),
        (p || n.initialSlide || 0) === (d || 0) &&
          a &&
          s.emit("beforeSlideChangeStart");
      var h,
        v = -o[u];
      if ((s.updateProgress(v), n.normalizeSlideIndex))
        for (var f = 0; f < l.length; f += 1)
          -Math.floor(100 * v) >= Math.floor(100 * l[f]) && (r = f);
      if (s.initialized && r !== p) {
        if (!s.allowSlideNext && v < s.translate && v < s.minTranslate())
          return !1;
        if (
          !s.allowSlidePrev &&
          v > s.translate &&
          v > s.maxTranslate() &&
          (p || 0) !== r
        )
          return !1;
      }
      return (
        (h = p < r ? "next" : r < p ? "prev" : "reset"),
        (c && -v === s.translate) || (!c && v === s.translate)
          ? (s.updateActiveIndex(r),
            n.autoHeight && s.updateAutoHeight(),
            s.updateSlidesClasses(),
            "slide" !== n.effect && s.setTranslate(v),
            "reset" !== h && (s.transitionStart(a, h), s.transitionEnd(a, h)),
            !1)
          : (0 !== t && F.transition
              ? (s.setTransition(t),
                s.setTranslate(v),
                s.updateActiveIndex(r),
                s.updateSlidesClasses(),
                s.emit("beforeTransitionStart", t, i),
                s.transitionStart(a, h),
                s.animating ||
                  ((s.animating = !0),
                  s.onSlideToWrapperTransitionEnd ||
                    (s.onSlideToWrapperTransitionEnd = function (e) {
                      s &&
                        !s.destroyed &&
                        e.target === this &&
                        (s.$wrapperEl[0].removeEventListener(
                          "transitionend",
                          s.onSlideToWrapperTransitionEnd
                        ),
                        s.$wrapperEl[0].removeEventListener(
                          "webkitTransitionEnd",
                          s.onSlideToWrapperTransitionEnd
                        ),
                        (s.onSlideToWrapperTransitionEnd = null),
                        delete s.onSlideToWrapperTransitionEnd,
                        s.transitionEnd(a, h));
                    }),
                  s.$wrapperEl[0].addEventListener(
                    "transitionend",
                    s.onSlideToWrapperTransitionEnd
                  ),
                  s.$wrapperEl[0].addEventListener(
                    "webkitTransitionEnd",
                    s.onSlideToWrapperTransitionEnd
                  )))
              : (s.setTransition(0),
                s.setTranslate(v),
                s.updateActiveIndex(r),
                s.updateSlidesClasses(),
                s.emit("beforeTransitionStart", t, i),
                s.transitionStart(a, h),
                s.transitionEnd(a, h)),
            !0)
      );
    },
    slideToLoop: function (e, t, a, i) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === a && (a = !0);
      var s = e;
      return (
        this.params.loop && (s += this.loopedSlides), this.slideTo(s, t, a, i)
      );
    },
    slideNext: function (e, t, a) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var i = this,
        s = i.params,
        r = i.animating;
      return s.loop
        ? !r &&
            (i.loopFix(),
            (i._clientLeft = i.$wrapperEl[0].clientLeft),
            i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a))
        : i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a);
    },
    slidePrev: function (e, t, a) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var i = this,
        s = i.params,
        r = i.animating,
        n = i.snapGrid,
        o = i.slidesGrid,
        l = i.rtlTranslate;
      if (s.loop) {
        if (r) return !1;
        i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
      }
      function d(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      var p,
        c = d(l ? i.translate : -i.translate),
        u = n.map(function (e) {
          return d(e);
        }),
        h =
          (o.map(function (e) {
            return d(e);
          }),
          n[u.indexOf(c)],
          n[u.indexOf(c) - 1]);
      return (
        void 0 !== h && (p = o.indexOf(h)) < 0 && (p = i.activeIndex - 1),
        i.slideTo(p, e, t, a)
      );
    },
    slideReset: function (e, t, a) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, a)
      );
    },
    slideToClosest: function (e, t, a) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var i = this,
        s = i.activeIndex,
        r = Math.floor(s / i.params.slidesPerGroup);
      if (r < i.snapGrid.length - 1) {
        var n = i.rtlTranslate ? i.translate : -i.translate,
          o = i.snapGrid[r];
        (i.snapGrid[r + 1] - o) / 2 < n - o && (s = i.params.slidesPerGroup);
      }
      return i.slideTo(s, e, t, a);
    },
    slideToClickedSlide: function () {
      var e,
        t = this,
        a = t.params,
        i = t.$wrapperEl,
        s =
          "auto" === a.slidesPerView
            ? t.slidesPerViewDynamic()
            : a.slidesPerView,
        r = t.clickedIndex;
      if (a.loop) {
        if (t.animating) return;
        (e = parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10)),
          a.centeredSlides
            ? r < t.loopedSlides - s / 2 ||
              r > t.slides.length - t.loopedSlides + s / 2
              ? (t.loopFix(),
                (r = i
                  .children(
                    "." +
                      a.slideClass +
                      '[data-swiper-slide-index="' +
                      e +
                      '"]:not(.' +
                      a.slideDuplicateClass +
                      ")"
                  )
                  .eq(0)
                  .index()),
                V.nextTick(function () {
                  t.slideTo(r);
                }))
              : t.slideTo(r)
            : r > t.slides.length - s
            ? (t.loopFix(),
              (r = i
                .children(
                  "." +
                    a.slideClass +
                    '[data-swiper-slide-index="' +
                    e +
                    '"]:not(.' +
                    a.slideDuplicateClass +
                    ")"
                )
                .eq(0)
                .index()),
              V.nextTick(function () {
                t.slideTo(r);
              }))
            : t.slideTo(r);
      } else t.slideTo(r);
    },
  };
  var u = {
    loopCreate: function () {
      var i = this,
        e = i.params,
        t = i.$wrapperEl;
      t.children("." + e.slideClass + "." + e.slideDuplicateClass).remove();
      var s = t.children("." + e.slideClass);
      if (e.loopFillGroupWithBlank) {
        var a = e.slidesPerGroup - (s.length % e.slidesPerGroup);
        if (a !== e.slidesPerGroup) {
          for (var r = 0; r < a; r += 1) {
            var n = L(f.createElement("div")).addClass(
              e.slideClass + " " + e.slideBlankClass
            );
            t.append(n);
          }
          s = t.children("." + e.slideClass);
        }
      }
      "auto" !== e.slidesPerView ||
        e.loopedSlides ||
        (e.loopedSlides = s.length),
        (i.loopedSlides = parseInt(e.loopedSlides || e.slidesPerView, 10)),
        (i.loopedSlides += e.loopAdditionalSlides),
        i.loopedSlides > s.length && (i.loopedSlides = s.length);
      var o = [],
        l = [];
      s.each(function (e, t) {
        var a = L(t);
        e < i.loopedSlides && l.push(t),
          e < s.length && e >= s.length - i.loopedSlides && o.push(t),
          a.attr("data-swiper-slide-index", e);
      });
      for (var d = 0; d < l.length; d += 1)
        t.append(L(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass));
      for (var p = o.length - 1; 0 <= p; p -= 1)
        t.prepend(L(o[p].cloneNode(!0)).addClass(e.slideDuplicateClass));
    },
    loopFix: function () {
      var e,
        t = this,
        a = t.params,
        i = t.activeIndex,
        s = t.slides,
        r = t.loopedSlides,
        n = t.allowSlidePrev,
        o = t.allowSlideNext,
        l = t.snapGrid,
        d = t.rtlTranslate;
      (t.allowSlidePrev = !0), (t.allowSlideNext = !0);
      var p = -l[i] - t.getTranslate();
      i < r
        ? ((e = s.length - 3 * r + i),
          (e += r),
          t.slideTo(e, 0, !1, !0) &&
            0 !== p &&
            t.setTranslate((d ? -t.translate : t.translate) - p))
        : (("auto" === a.slidesPerView && 2 * r <= i) || i >= s.length - r) &&
          ((e = -s.length + i + r),
          (e += r),
          t.slideTo(e, 0, !1, !0) &&
            0 !== p &&
            t.setTranslate((d ? -t.translate : t.translate) - p));
      (t.allowSlidePrev = n), (t.allowSlideNext = o);
    },
    loopDestroy: function () {
      var e = this.$wrapperEl,
        t = this.params,
        a = this.slides;
      e.children("." + t.slideClass + "." + t.slideDuplicateClass).remove(),
        a.removeAttr("data-swiper-slide-index");
    },
  };
  var h = {
    setGrabCursor: function (e) {
      if (
        !(
          F.touch ||
          !this.params.simulateTouch ||
          (this.params.watchOverflow && this.isLocked)
        )
      ) {
        var t = this.el;
        (t.style.cursor = "move"),
          (t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
          (t.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
          (t.style.cursor = e ? "grabbing" : "grab");
      }
    },
    unsetGrabCursor: function () {
      F.touch ||
        (this.params.watchOverflow && this.isLocked) ||
        (this.el.style.cursor = "");
    },
  };
  var v = {
      appendSlide: function (e) {
        var t = this,
          a = t.$wrapperEl,
          i = t.params;
        if ((i.loop && t.loopDestroy(), "object" == typeof e && "length" in e))
          for (var s = 0; s < e.length; s += 1) e[s] && a.append(e[s]);
        else a.append(e);
        i.loop && t.loopCreate(), (i.observer && F.observer) || t.update();
      },
      prependSlide: function (e) {
        var t = this,
          a = t.params,
          i = t.$wrapperEl,
          s = t.activeIndex;
        a.loop && t.loopDestroy();
        var r = s + 1;
        if ("object" == typeof e && "length" in e) {
          for (var n = 0; n < e.length; n += 1) e[n] && i.prepend(e[n]);
          r = s + e.length;
        } else i.prepend(e);
        a.loop && t.loopCreate(),
          (a.observer && F.observer) || t.update(),
          t.slideTo(r, 0, !1);
      },
      addSlide: function (e, t) {
        var a = this,
          i = a.$wrapperEl,
          s = a.params,
          r = a.activeIndex;
        s.loop &&
          ((r -= a.loopedSlides),
          a.loopDestroy(),
          (a.slides = i.children("." + s.slideClass)));
        var n = a.slides.length;
        if (e <= 0) a.prependSlide(t);
        else if (n <= e) a.appendSlide(t);
        else {
          for (var o = e < r ? r + 1 : r, l = [], d = n - 1; e <= d; d -= 1) {
            var p = a.slides.eq(d);
            p.remove(), l.unshift(p);
          }
          if ("object" == typeof t && "length" in t) {
            for (var c = 0; c < t.length; c += 1) t[c] && i.append(t[c]);
            o = e < r ? r + t.length : r;
          } else i.append(t);
          for (var u = 0; u < l.length; u += 1) i.append(l[u]);
          s.loop && a.loopCreate(),
            (s.observer && F.observer) || a.update(),
            s.loop ? a.slideTo(o + a.loopedSlides, 0, !1) : a.slideTo(o, 0, !1);
        }
      },
      removeSlide: function (e) {
        var t = this,
          a = t.params,
          i = t.$wrapperEl,
          s = t.activeIndex;
        a.loop &&
          ((s -= t.loopedSlides),
          t.loopDestroy(),
          (t.slides = i.children("." + a.slideClass)));
        var r,
          n = s;
        if ("object" == typeof e && "length" in e) {
          for (var o = 0; o < e.length; o += 1)
            (r = e[o]),
              t.slides[r] && t.slides.eq(r).remove(),
              r < n && (n -= 1);
          n = Math.max(n, 0);
        } else
          (r = e),
            t.slides[r] && t.slides.eq(r).remove(),
            r < n && (n -= 1),
            (n = Math.max(n, 0));
        a.loop && t.loopCreate(),
          (a.observer && F.observer) || t.update(),
          a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1);
      },
      removeAllSlides: function () {
        for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
        this.removeSlide(e);
      },
    },
    m = (function () {
      var e = Y.navigator.userAgent,
        t = {
          ios: !1,
          android: !1,
          androidChrome: !1,
          desktop: !1,
          windows: !1,
          iphone: !1,
          ipod: !1,
          ipad: !1,
          cordova: Y.cordova || Y.phonegap,
          phonegap: Y.cordova || Y.phonegap,
        },
        a = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
        i = e.match(/(Android);?[\s\/]+([\d.]+)?/),
        s = e.match(/(iPad).*OS\s([\d_]+)/),
        r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
        n = !s && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      if (
        (a && ((t.os = "windows"), (t.osVersion = a[2]), (t.windows = !0)),
        i &&
          !a &&
          ((t.os = "android"),
          (t.osVersion = i[2]),
          (t.android = !0),
          (t.androidChrome = 0 <= e.toLowerCase().indexOf("chrome"))),
        (s || n || r) && ((t.os = "ios"), (t.ios = !0)),
        n && !r && ((t.osVersion = n[2].replace(/_/g, ".")), (t.iphone = !0)),
        s && ((t.osVersion = s[2].replace(/_/g, ".")), (t.ipad = !0)),
        r &&
          ((t.osVersion = r[3] ? r[3].replace(/_/g, ".") : null),
          (t.iphone = !0)),
        t.ios &&
          t.osVersion &&
          0 <= e.indexOf("Version/") &&
          "10" === t.osVersion.split(".")[0] &&
          (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]),
        (t.desktop = !(t.os || t.android || t.webView)),
        (t.webView = (n || s || r) && e.match(/.*AppleWebKit(?!.*Safari)/i)),
        t.os && "ios" === t.os)
      ) {
        var o = t.osVersion.split("."),
          l = f.querySelector('meta[name="viewport"]');
        t.minimalUi =
          !t.webView &&
          (r || n) &&
          (1 * o[0] == 7 ? 1 <= 1 * o[1] : 7 < 1 * o[0]) &&
          l &&
          0 <= l.getAttribute("content").indexOf("minimal-ui");
      }
      return (t.pixelRatio = Y.devicePixelRatio || 1), t;
    })();
  function g() {
    var e = this,
      t = e.params,
      a = e.el;
    if (!a || 0 !== a.offsetWidth) {
      t.breakpoints && e.setBreakpoint();
      var i = e.allowSlideNext,
        s = e.allowSlidePrev,
        r = e.snapGrid;
      if (
        ((e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        t.freeMode)
      ) {
        var n = Math.min(
          Math.max(e.translate, e.maxTranslate()),
          e.minTranslate()
        );
        e.setTranslate(n),
          e.updateActiveIndex(),
          e.updateSlidesClasses(),
          t.autoHeight && e.updateAutoHeight();
      } else
        e.updateSlidesClasses(),
          ("auto" === t.slidesPerView || 1 < t.slidesPerView) &&
          e.isEnd &&
          !e.params.centeredSlides
            ? e.slideTo(e.slides.length - 1, 0, !1, !0)
            : e.slideTo(e.activeIndex, 0, !1, !0);
      (e.allowSlidePrev = s),
        (e.allowSlideNext = i),
        e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
    }
  }
  var b = {
    attachEvents: function () {
      var e = this,
        t = e.params,
        a = e.touchEvents,
        i = e.el,
        s = e.wrapperEl;
      (e.onTouchStart = function (e) {
        var t = this,
          a = t.touchEventsData,
          i = t.params,
          s = t.touches;
        if (!t.animating || !i.preventInteractionOnTransition) {
          var r = e;
          if (
            (r.originalEvent && (r = r.originalEvent),
            (a.isTouchEvent = "touchstart" === r.type),
            (a.isTouchEvent || !("which" in r) || 3 !== r.which) &&
              !(
                (!a.isTouchEvent && "button" in r && 0 < r.button) ||
                (a.isTouched && a.isMoved)
              ))
          )
            if (
              i.noSwiping &&
              L(r.target).closest(
                i.noSwipingSelector
                  ? i.noSwipingSelector
                  : "." + i.noSwipingClass
              )[0]
            )
              t.allowClick = !0;
            else if (!i.swipeHandler || L(r).closest(i.swipeHandler)[0]) {
              (s.currentX =
                "touchstart" === r.type ? r.targetTouches[0].pageX : r.pageX),
                (s.currentY =
                  "touchstart" === r.type ? r.targetTouches[0].pageY : r.pageY);
              var n = s.currentX,
                o = s.currentY,
                l = i.edgeSwipeDetection || i.iOSEdgeSwipeDetection,
                d = i.edgeSwipeThreshold || i.iOSEdgeSwipeThreshold;
              if (!l || !(n <= d || n >= Y.screen.width - d)) {
                if (
                  (V.extend(a, {
                    isTouched: !0,
                    isMoved: !1,
                    allowTouchCallbacks: !0,
                    isScrolling: void 0,
                    startMoving: void 0,
                  }),
                  (s.startX = n),
                  (s.startY = o),
                  (a.touchStartTime = V.now()),
                  (t.allowClick = !0),
                  t.updateSize(),
                  (t.swipeDirection = void 0),
                  0 < i.threshold && (a.allowThresholdMove = !1),
                  "touchstart" !== r.type)
                ) {
                  var p = !0;
                  L(r.target).is(a.formElements) && (p = !1),
                    f.activeElement &&
                      L(f.activeElement).is(a.formElements) &&
                      f.activeElement !== r.target &&
                      f.activeElement.blur();
                  var c = p && t.allowTouchMove && i.touchStartPreventDefault;
                  (i.touchStartForcePreventDefault || c) && r.preventDefault();
                }
                t.emit("touchStart", r);
              }
            }
        }
      }.bind(e)),
        (e.onTouchMove = function (e) {
          var t = this,
            a = t.touchEventsData,
            i = t.params,
            s = t.touches,
            r = t.rtlTranslate,
            n = e;
          if ((n.originalEvent && (n = n.originalEvent), a.isTouched)) {
            if (!a.isTouchEvent || "mousemove" !== n.type) {
              var o =
                  "touchmove" === n.type ? n.targetTouches[0].pageX : n.pageX,
                l = "touchmove" === n.type ? n.targetTouches[0].pageY : n.pageY;
              if (n.preventedByNestedSwiper)
                return (s.startX = o), void (s.startY = l);
              if (!t.allowTouchMove)
                return (
                  (t.allowClick = !1),
                  void (
                    a.isTouched &&
                    (V.extend(s, {
                      startX: o,
                      startY: l,
                      currentX: o,
                      currentY: l,
                    }),
                    (a.touchStartTime = V.now()))
                  )
                );
              if (a.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
                if (t.isVertical()) {
                  if (
                    (l < s.startY && t.translate <= t.maxTranslate()) ||
                    (l > s.startY && t.translate >= t.minTranslate())
                  )
                    return (a.isTouched = !1), void (a.isMoved = !1);
                } else if (
                  (o < s.startX && t.translate <= t.maxTranslate()) ||
                  (o > s.startX && t.translate >= t.minTranslate())
                )
                  return;
              if (
                a.isTouchEvent &&
                f.activeElement &&
                n.target === f.activeElement &&
                L(n.target).is(a.formElements)
              )
                return (a.isMoved = !0), void (t.allowClick = !1);
              if (
                (a.allowTouchCallbacks && t.emit("touchMove", n),
                !(n.targetTouches && 1 < n.targetTouches.length))
              ) {
                (s.currentX = o), (s.currentY = l);
                var d,
                  p = s.currentX - s.startX,
                  c = s.currentY - s.startY;
                if (
                  !(
                    t.params.threshold &&
                    Math.sqrt(Math.pow(p, 2) + Math.pow(c, 2)) <
                      t.params.threshold
                  )
                )
                  if (
                    (void 0 === a.isScrolling &&
                      ((t.isHorizontal() && s.currentY === s.startY) ||
                      (t.isVertical() && s.currentX === s.startX)
                        ? (a.isScrolling = !1)
                        : 25 <= p * p + c * c &&
                          ((d =
                            (180 * Math.atan2(Math.abs(c), Math.abs(p))) /
                            Math.PI),
                          (a.isScrolling = t.isHorizontal()
                            ? d > i.touchAngle
                            : 90 - d > i.touchAngle))),
                    a.isScrolling && t.emit("touchMoveOpposite", n),
                    void 0 === a.startMoving &&
                      ((s.currentX === s.startX && s.currentY === s.startY) ||
                        (a.startMoving = !0)),
                    a.isScrolling)
                  )
                    a.isTouched = !1;
                  else if (a.startMoving) {
                    (t.allowClick = !1),
                      n.preventDefault(),
                      i.touchMoveStopPropagation &&
                        !i.nested &&
                        n.stopPropagation(),
                      a.isMoved ||
                        (i.loop && t.loopFix(),
                        (a.startTranslate = t.getTranslate()),
                        t.setTransition(0),
                        t.animating &&
                          t.$wrapperEl.trigger(
                            "webkitTransitionEnd transitionend"
                          ),
                        (a.allowMomentumBounce = !1),
                        !i.grabCursor ||
                          (!0 !== t.allowSlideNext &&
                            !0 !== t.allowSlidePrev) ||
                          t.setGrabCursor(!0),
                        t.emit("sliderFirstMove", n)),
                      t.emit("sliderMove", n),
                      (a.isMoved = !0);
                    var u = t.isHorizontal() ? p : c;
                    (s.diff = u),
                      (u *= i.touchRatio),
                      r && (u = -u),
                      (t.swipeDirection = 0 < u ? "prev" : "next"),
                      (a.currentTranslate = u + a.startTranslate);
                    var h = !0,
                      v = i.resistanceRatio;
                    if (
                      (i.touchReleaseOnEdges && (v = 0),
                      0 < u && a.currentTranslate > t.minTranslate()
                        ? ((h = !1),
                          i.resistance &&
                            (a.currentTranslate =
                              t.minTranslate() -
                              1 +
                              Math.pow(
                                -t.minTranslate() + a.startTranslate + u,
                                v
                              )))
                        : u < 0 &&
                          a.currentTranslate < t.maxTranslate() &&
                          ((h = !1),
                          i.resistance &&
                            (a.currentTranslate =
                              t.maxTranslate() +
                              1 -
                              Math.pow(
                                t.maxTranslate() - a.startTranslate - u,
                                v
                              ))),
                      h && (n.preventedByNestedSwiper = !0),
                      !t.allowSlideNext &&
                        "next" === t.swipeDirection &&
                        a.currentTranslate < a.startTranslate &&
                        (a.currentTranslate = a.startTranslate),
                      !t.allowSlidePrev &&
                        "prev" === t.swipeDirection &&
                        a.currentTranslate > a.startTranslate &&
                        (a.currentTranslate = a.startTranslate),
                      0 < i.threshold)
                    ) {
                      if (!(Math.abs(u) > i.threshold || a.allowThresholdMove))
                        return void (a.currentTranslate = a.startTranslate);
                      if (!a.allowThresholdMove)
                        return (
                          (a.allowThresholdMove = !0),
                          (s.startX = s.currentX),
                          (s.startY = s.currentY),
                          (a.currentTranslate = a.startTranslate),
                          void (s.diff = t.isHorizontal()
                            ? s.currentX - s.startX
                            : s.currentY - s.startY)
                        );
                    }
                    i.followFinger &&
                      ((i.freeMode ||
                        i.watchSlidesProgress ||
                        i.watchSlidesVisibility) &&
                        (t.updateActiveIndex(), t.updateSlidesClasses()),
                      i.freeMode &&
                        (0 === a.velocities.length &&
                          a.velocities.push({
                            position: s[t.isHorizontal() ? "startX" : "startY"],
                            time: a.touchStartTime,
                          }),
                        a.velocities.push({
                          position:
                            s[t.isHorizontal() ? "currentX" : "currentY"],
                          time: V.now(),
                        })),
                      t.updateProgress(a.currentTranslate),
                      t.setTranslate(a.currentTranslate));
                  }
              }
            }
          } else
            a.startMoving && a.isScrolling && t.emit("touchMoveOpposite", n);
        }.bind(e)),
        (e.onTouchEnd = function (e) {
          var t = this,
            a = t.touchEventsData,
            i = t.params,
            s = t.touches,
            r = t.rtlTranslate,
            n = t.$wrapperEl,
            o = t.slidesGrid,
            l = t.snapGrid,
            d = e;
          if (
            (d.originalEvent && (d = d.originalEvent),
            a.allowTouchCallbacks && t.emit("touchEnd", d),
            (a.allowTouchCallbacks = !1),
            !a.isTouched)
          )
            return (
              a.isMoved && i.grabCursor && t.setGrabCursor(!1),
              (a.isMoved = !1),
              void (a.startMoving = !1)
            );
          i.grabCursor &&
            a.isMoved &&
            a.isTouched &&
            (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
            t.setGrabCursor(!1);
          var p,
            c = V.now(),
            u = c - a.touchStartTime;
          if (
            (t.allowClick &&
              (t.updateClickedSlide(d),
              t.emit("tap", d),
              u < 300 &&
                300 < c - a.lastClickTime &&
                (a.clickTimeout && clearTimeout(a.clickTimeout),
                (a.clickTimeout = V.nextTick(function () {
                  t && !t.destroyed && t.emit("click", d);
                }, 300))),
              u < 300 &&
                c - a.lastClickTime < 300 &&
                (a.clickTimeout && clearTimeout(a.clickTimeout),
                t.emit("doubleTap", d))),
            (a.lastClickTime = V.now()),
            V.nextTick(function () {
              t.destroyed || (t.allowClick = !0);
            }),
            !a.isTouched ||
              !a.isMoved ||
              !t.swipeDirection ||
              0 === s.diff ||
              a.currentTranslate === a.startTranslate)
          )
            return (
              (a.isTouched = !1), (a.isMoved = !1), void (a.startMoving = !1)
            );
          if (
            ((a.isTouched = !1),
            (a.isMoved = !1),
            (a.startMoving = !1),
            (p = i.followFinger
              ? r
                ? t.translate
                : -t.translate
              : -a.currentTranslate),
            i.freeMode)
          ) {
            if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
            if (p > -t.maxTranslate())
              return void (t.slides.length < l.length
                ? t.slideTo(l.length - 1)
                : t.slideTo(t.slides.length - 1));
            if (i.freeModeMomentum) {
              if (1 < a.velocities.length) {
                var h = a.velocities.pop(),
                  v = a.velocities.pop(),
                  f = h.position - v.position,
                  m = h.time - v.time;
                (t.velocity = f / m),
                  (t.velocity /= 2),
                  Math.abs(t.velocity) < i.freeModeMinimumVelocity &&
                    (t.velocity = 0),
                  (150 < m || 300 < V.now() - h.time) && (t.velocity = 0);
              } else t.velocity = 0;
              (t.velocity *= i.freeModeMomentumVelocityRatio),
                (a.velocities.length = 0);
              var g = 1e3 * i.freeModeMomentumRatio,
                b = t.velocity * g,
                w = t.translate + b;
              r && (w = -w);
              var y,
                x,
                T = !1,
                E = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
              if (w < t.maxTranslate())
                i.freeModeMomentumBounce
                  ? (w + t.maxTranslate() < -E && (w = t.maxTranslate() - E),
                    (y = t.maxTranslate()),
                    (T = !0),
                    (a.allowMomentumBounce = !0))
                  : (w = t.maxTranslate()),
                  i.loop && i.centeredSlides && (x = !0);
              else if (w > t.minTranslate())
                i.freeModeMomentumBounce
                  ? (w - t.minTranslate() > E && (w = t.minTranslate() + E),
                    (y = t.minTranslate()),
                    (T = !0),
                    (a.allowMomentumBounce = !0))
                  : (w = t.minTranslate()),
                  i.loop && i.centeredSlides && (x = !0);
              else if (i.freeModeSticky) {
                for (var S, C = 0; C < l.length; C += 1)
                  if (l[C] > -w) {
                    S = C;
                    break;
                  }
                w = -(w =
                  Math.abs(l[S] - w) < Math.abs(l[S - 1] - w) ||
                  "next" === t.swipeDirection
                    ? l[S]
                    : l[S - 1]);
              }
              if (
                (x &&
                  t.once("transitionEnd", function () {
                    t.loopFix();
                  }),
                0 !== t.velocity)
              )
                g = r
                  ? Math.abs((-w - t.translate) / t.velocity)
                  : Math.abs((w - t.translate) / t.velocity);
              else if (i.freeModeSticky) return void t.slideToClosest();
              i.freeModeMomentumBounce && T
                ? (t.updateProgress(y),
                  t.setTransition(g),
                  t.setTranslate(w),
                  t.transitionStart(!0, t.swipeDirection),
                  (t.animating = !0),
                  n.transitionEnd(function () {
                    t &&
                      !t.destroyed &&
                      a.allowMomentumBounce &&
                      (t.emit("momentumBounce"),
                      t.setTransition(i.speed),
                      t.setTranslate(y),
                      n.transitionEnd(function () {
                        t && !t.destroyed && t.transitionEnd();
                      }));
                  }))
                : t.velocity
                ? (t.updateProgress(w),
                  t.setTransition(g),
                  t.setTranslate(w),
                  t.transitionStart(!0, t.swipeDirection),
                  t.animating ||
                    ((t.animating = !0),
                    n.transitionEnd(function () {
                      t && !t.destroyed && t.transitionEnd();
                    })))
                : t.updateProgress(w),
                t.updateActiveIndex(),
                t.updateSlidesClasses();
            } else if (i.freeModeSticky) return void t.slideToClosest();
            (!i.freeModeMomentum || u >= i.longSwipesMs) &&
              (t.updateProgress(),
              t.updateActiveIndex(),
              t.updateSlidesClasses());
          } else {
            for (
              var M = 0, k = t.slidesSizesGrid[0], P = 0;
              P < o.length;
              P += i.slidesPerGroup
            )
              void 0 !== o[P + i.slidesPerGroup]
                ? p >= o[P] &&
                  p < o[P + i.slidesPerGroup] &&
                  (k = o[(M = P) + i.slidesPerGroup] - o[P])
                : p >= o[P] &&
                  ((M = P), (k = o[o.length - 1] - o[o.length - 2]));
            var z = (p - o[M]) / k;
            if (u > i.longSwipesMs) {
              if (!i.longSwipes) return void t.slideTo(t.activeIndex);
              "next" === t.swipeDirection &&
                (z >= i.longSwipesRatio
                  ? t.slideTo(M + i.slidesPerGroup)
                  : t.slideTo(M)),
                "prev" === t.swipeDirection &&
                  (z > 1 - i.longSwipesRatio
                    ? t.slideTo(M + i.slidesPerGroup)
                    : t.slideTo(M));
            } else {
              if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
              "next" === t.swipeDirection && t.slideTo(M + i.slidesPerGroup),
                "prev" === t.swipeDirection && t.slideTo(M);
            }
          }
        }.bind(e)),
        (e.onClick = function (e) {
          this.allowClick ||
            (this.params.preventClicks && e.preventDefault(),
            this.params.preventClicksPropagation &&
              this.animating &&
              (e.stopPropagation(), e.stopImmediatePropagation()));
        }.bind(e));
      var r = "container" === t.touchEventsTarget ? i : s,
        n = !!t.nested;
      if (F.touch || (!F.pointerEvents && !F.prefixedPointerEvents)) {
        if (F.touch) {
          var o = !(
            "touchstart" !== a.start ||
            !F.passiveListener ||
            !t.passiveListeners
          ) && { passive: !0, capture: !1 };
          r.addEventListener(a.start, e.onTouchStart, o),
            r.addEventListener(
              a.move,
              e.onTouchMove,
              F.passiveListener ? { passive: !1, capture: n } : n
            ),
            r.addEventListener(a.end, e.onTouchEnd, o);
        }
        ((t.simulateTouch && !m.ios && !m.android) ||
          (t.simulateTouch && !F.touch && m.ios)) &&
          (r.addEventListener("mousedown", e.onTouchStart, !1),
          f.addEventListener("mousemove", e.onTouchMove, n),
          f.addEventListener("mouseup", e.onTouchEnd, !1));
      } else
        r.addEventListener(a.start, e.onTouchStart, !1),
          f.addEventListener(a.move, e.onTouchMove, n),
          f.addEventListener(a.end, e.onTouchEnd, !1);
      (t.preventClicks || t.preventClicksPropagation) &&
        r.addEventListener("click", e.onClick, !0),
        e.on(
          m.ios || m.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          g,
          !0
        );
    },
    detachEvents: function () {
      var e = this,
        t = e.params,
        a = e.touchEvents,
        i = e.el,
        s = e.wrapperEl,
        r = "container" === t.touchEventsTarget ? i : s,
        n = !!t.nested;
      if (F.touch || (!F.pointerEvents && !F.prefixedPointerEvents)) {
        if (F.touch) {
          var o = !(
            "onTouchStart" !== a.start ||
            !F.passiveListener ||
            !t.passiveListeners
          ) && { passive: !0, capture: !1 };
          r.removeEventListener(a.start, e.onTouchStart, o),
            r.removeEventListener(a.move, e.onTouchMove, n),
            r.removeEventListener(a.end, e.onTouchEnd, o);
        }
        ((t.simulateTouch && !m.ios && !m.android) ||
          (t.simulateTouch && !F.touch && m.ios)) &&
          (r.removeEventListener("mousedown", e.onTouchStart, !1),
          f.removeEventListener("mousemove", e.onTouchMove, n),
          f.removeEventListener("mouseup", e.onTouchEnd, !1));
      } else
        r.removeEventListener(a.start, e.onTouchStart, !1),
          f.removeEventListener(a.move, e.onTouchMove, n),
          f.removeEventListener(a.end, e.onTouchEnd, !1);
      (t.preventClicks || t.preventClicksPropagation) &&
        r.removeEventListener("click", e.onClick, !0),
        e.off(
          m.ios || m.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          g
        );
    },
  };
  var w,
    y = {
      setBreakpoint: function () {
        var e = this,
          t = e.activeIndex,
          a = e.initialized,
          i = e.loopedSlides;
        void 0 === i && (i = 0);
        var s = e.params,
          r = s.breakpoints;
        if (r && (!r || 0 !== Object.keys(r).length)) {
          var n = e.getBreakpoint(r);
          if (n && e.currentBreakpoint !== n) {
            var o = n in r ? r[n] : void 0;
            o &&
              ["slidesPerView", "spaceBetween", "slidesPerGroup"].forEach(
                function (e) {
                  var t = o[e];
                  void 0 !== t &&
                    (o[e] =
                      "slidesPerView" !== e || ("AUTO" !== t && "auto" !== t)
                        ? "slidesPerView" === e
                          ? parseFloat(t)
                          : parseInt(t, 10)
                        : "auto");
                }
              );
            var l = o || e.originalParams,
              d = s.loop && l.slidesPerView !== s.slidesPerView;
            V.extend(e.params, l),
              V.extend(e, {
                allowTouchMove: e.params.allowTouchMove,
                allowSlideNext: e.params.allowSlideNext,
                allowSlidePrev: e.params.allowSlidePrev,
              }),
              (e.currentBreakpoint = n),
              d &&
                a &&
                (e.loopDestroy(),
                e.loopCreate(),
                e.updateSlides(),
                e.slideTo(t - i + e.loopedSlides, 0, !1)),
              e.emit("breakpoint", l);
          }
        }
      },
      getBreakpoint: function (e) {
        if (e) {
          var t = !1,
            a = [];
          Object.keys(e).forEach(function (e) {
            a.push(e);
          }),
            a.sort(function (e, t) {
              return parseInt(e, 10) - parseInt(t, 10);
            });
          for (var i = 0; i < a.length; i += 1) {
            var s = a[i];
            this.params.breakpointsInverse
              ? s <= Y.innerWidth && (t = s)
              : s >= Y.innerWidth && !t && (t = s);
          }
          return t || "max";
        }
      },
    },
    I = {
      isIE:
        !!Y.navigator.userAgent.match(/Trident/g) ||
        !!Y.navigator.userAgent.match(/MSIE/g),
      isEdge: !!Y.navigator.userAgent.match(/Edge/g),
      isSafari:
        ((w = Y.navigator.userAgent.toLowerCase()),
        0 <= w.indexOf("safari") &&
          w.indexOf("chrome") < 0 &&
          w.indexOf("android") < 0),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
        Y.navigator.userAgent
      ),
    };
  var x = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "container",
      initialSlide: 0,
      speed: 300,
      preventInteractionOnTransition: !1,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      freeMode: !1,
      freeModeMomentum: !0,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: !0,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: !1,
      freeModeMinimumVelocity: 0.02,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsInverse: !1,
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: "column",
      slidesPerGroup: 1,
      centeredSlides: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !1,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !0,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      watchSlidesVisibility: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      containerModifierClass: "swiper-container-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0,
    },
    T = {
      update: o,
      translate: d,
      transition: p,
      slide: c,
      loop: u,
      grabCursor: h,
      manipulation: v,
      events: b,
      breakpoints: y,
      checkOverflow: {
        checkOverflow: function () {
          var e = this,
            t = e.isLocked;
          (e.isLocked = 1 === e.snapGrid.length),
            (e.allowSlideNext = !e.isLocked),
            (e.allowSlidePrev = !e.isLocked),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"),
            t && t !== e.isLocked && ((e.isEnd = !1), e.navigation.update());
        },
      },
      classes: {
        addClasses: function () {
          var t = this.classNames,
            a = this.params,
            e = this.rtl,
            i = this.$el,
            s = [];
          s.push(a.direction),
            a.freeMode && s.push("free-mode"),
            F.flexbox || s.push("no-flexbox"),
            a.autoHeight && s.push("autoheight"),
            e && s.push("rtl"),
            1 < a.slidesPerColumn && s.push("multirow"),
            m.android && s.push("android"),
            m.ios && s.push("ios"),
            (I.isIE || I.isEdge) &&
              (F.pointerEvents || F.prefixedPointerEvents) &&
              s.push("wp8-" + a.direction),
            s.forEach(function (e) {
              t.push(a.containerModifierClass + e);
            }),
            i.addClass(t.join(" "));
        },
        removeClasses: function () {
          var e = this.$el,
            t = this.classNames;
          e.removeClass(t.join(" "));
        },
      },
      images: {
        loadImage: function (e, t, a, i, s, r) {
          var n;
          function o() {
            r && r();
          }
          e.complete && s
            ? o()
            : t
            ? (((n = new Y.Image()).onload = o),
              (n.onerror = o),
              i && (n.sizes = i),
              a && (n.srcset = a),
              t && (n.src = t))
            : o();
        },
        preloadImages: function () {
          var e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (var a = 0; a < e.imagesToLoad.length; a += 1) {
            var i = e.imagesToLoad[a];
            e.loadImage(
              i,
              i.currentSrc || i.getAttribute("src"),
              i.srcset || i.getAttribute("srcset"),
              i.sizes || i.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      },
    },
    E = {},
    S = (function (u) {
      function h() {
        for (var e, t, s, a = [], i = arguments.length; i--; )
          a[i] = arguments[i];
        1 === a.length && a[0].constructor && a[0].constructor === Object
          ? (s = a[0])
          : ((t = (e = a)[0]), (s = e[1])),
          s || (s = {}),
          (s = V.extend({}, s)),
          t && !s.el && (s.el = t),
          u.call(this, s),
          Object.keys(T).forEach(function (t) {
            Object.keys(T[t]).forEach(function (e) {
              h.prototype[e] || (h.prototype[e] = T[t][e]);
            });
          });
        var r = this;
        void 0 === r.modules && (r.modules = {}),
          Object.keys(r.modules).forEach(function (e) {
            var t = r.modules[e];
            if (t.params) {
              var a = Object.keys(t.params)[0],
                i = t.params[a];
              if ("object" != typeof i || null === i) return;
              if (!(a in s && "enabled" in i)) return;
              !0 === s[a] && (s[a] = { enabled: !0 }),
                "object" != typeof s[a] ||
                  "enabled" in s[a] ||
                  (s[a].enabled = !0),
                s[a] || (s[a] = { enabled: !1 });
            }
          });
        var n = V.extend({}, x);
        r.useModulesParams(n),
          (r.params = V.extend({}, n, E, s)),
          (r.originalParams = V.extend({}, r.params)),
          (r.passedParams = V.extend({}, s));
        var o = (r.$ = L)(r.params.el);
        if ((t = o[0])) {
          if (1 < o.length) {
            var l = [];
            return (
              o.each(function (e, t) {
                var a = V.extend({}, s, { el: t });
                l.push(new h(a));
              }),
              l
            );
          }
          (t.swiper = r), o.data("swiper", r);
          var d,
            p,
            c = o.children("." + r.params.wrapperClass);
          return (
            V.extend(r, {
              $el: o,
              el: t,
              $wrapperEl: c,
              wrapperEl: c[0],
              classNames: [],
              slides: L(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: function () {
                return "horizontal" === r.params.direction;
              },
              isVertical: function () {
                return "vertical" === r.params.direction;
              },
              rtl:
                "rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction"),
              rtlTranslate:
                "horizontal" === r.params.direction &&
                ("rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction")),
              wrongRTL: "-webkit-box" === c.css("display"),
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: r.params.allowSlideNext,
              allowSlidePrev: r.params.allowSlidePrev,
              touchEvents:
                ((d = ["touchstart", "touchmove", "touchend"]),
                (p = ["mousedown", "mousemove", "mouseup"]),
                F.pointerEvents
                  ? (p = ["pointerdown", "pointermove", "pointerup"])
                  : F.prefixedPointerEvents &&
                    (p = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
                (r.touchEventsTouch = { start: d[0], move: d[1], end: d[2] }),
                (r.touchEventsDesktop = { start: p[0], move: p[1], end: p[2] }),
                F.touch || !r.params.simulateTouch
                  ? r.touchEventsTouch
                  : r.touchEventsDesktop),
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                formElements: "input, select, option, textarea, button, video",
                lastClickTime: V.now(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0,
              },
              allowClick: !0,
              allowTouchMove: r.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0,
              },
              imagesToLoad: [],
              imagesLoaded: 0,
            }),
            r.useModules(),
            r.params.init && r.init(),
            r
          );
        }
      }
      u && (h.__proto__ = u);
      var e = {
        extendedDefaults: { configurable: !0 },
        defaults: { configurable: !0 },
        Class: { configurable: !0 },
        $: { configurable: !0 },
      };
      return (
        (((h.prototype = Object.create(u && u.prototype)).constructor =
          h).prototype.slidesPerViewDynamic = function () {
          var e = this,
            t = e.params,
            a = e.slides,
            i = e.slidesGrid,
            s = e.size,
            r = e.activeIndex,
            n = 1;
          if (t.centeredSlides) {
            for (
              var o, l = a[r].swiperSlideSize, d = r + 1;
              d < a.length;
              d += 1
            )
              a[d] &&
                !o &&
                ((n += 1), s < (l += a[d].swiperSlideSize) && (o = !0));
            for (var p = r - 1; 0 <= p; p -= 1)
              a[p] &&
                !o &&
                ((n += 1), s < (l += a[p].swiperSlideSize) && (o = !0));
          } else
            for (var c = r + 1; c < a.length; c += 1)
              i[c] - i[r] < s && (n += 1);
          return n;
        }),
        (h.prototype.update = function () {
          var a = this;
          if (a && !a.destroyed) {
            var e = a.snapGrid,
              t = a.params;
            t.breakpoints && a.setBreakpoint(),
              a.updateSize(),
              a.updateSlides(),
              a.updateProgress(),
              a.updateSlidesClasses(),
              a.params.freeMode
                ? (i(), a.params.autoHeight && a.updateAutoHeight())
                : (("auto" === a.params.slidesPerView ||
                    1 < a.params.slidesPerView) &&
                  a.isEnd &&
                  !a.params.centeredSlides
                    ? a.slideTo(a.slides.length - 1, 0, !1, !0)
                    : a.slideTo(a.activeIndex, 0, !1, !0)) || i(),
              t.watchOverflow && e !== a.snapGrid && a.checkOverflow(),
              a.emit("update");
          }
          function i() {
            var e = a.rtlTranslate ? -1 * a.translate : a.translate,
              t = Math.min(Math.max(e, a.maxTranslate()), a.minTranslate());
            a.setTranslate(t), a.updateActiveIndex(), a.updateSlidesClasses();
          }
        }),
        (h.prototype.init = function () {
          var e = this;
          e.initialized ||
            (e.emit("beforeInit"),
            e.params.breakpoints && e.setBreakpoint(),
            e.addClasses(),
            e.params.loop && e.loopCreate(),
            e.updateSize(),
            e.updateSlides(),
            e.params.watchOverflow && e.checkOverflow(),
            e.params.grabCursor && e.setGrabCursor(),
            e.params.preloadImages && e.preloadImages(),
            e.params.loop
              ? e.slideTo(
                  e.params.initialSlide + e.loopedSlides,
                  0,
                  e.params.runCallbacksOnInit
                )
              : e.slideTo(
                  e.params.initialSlide,
                  0,
                  e.params.runCallbacksOnInit
                ),
            e.attachEvents(),
            (e.initialized = !0),
            e.emit("init"));
        }),
        (h.prototype.destroy = function (e, t) {
          void 0 === e && (e = !0), void 0 === t && (t = !0);
          var a = this,
            i = a.params,
            s = a.$el,
            r = a.$wrapperEl,
            n = a.slides;
          return (
            void 0 === a.params ||
              a.destroyed ||
              (a.emit("beforeDestroy"),
              (a.initialized = !1),
              a.detachEvents(),
              i.loop && a.loopDestroy(),
              t &&
                (a.removeClasses(),
                s.removeAttr("style"),
                r.removeAttr("style"),
                n &&
                  n.length &&
                  n
                    .removeClass(
                      [
                        i.slideVisibleClass,
                        i.slideActiveClass,
                        i.slideNextClass,
                        i.slidePrevClass,
                      ].join(" ")
                    )
                    .removeAttr("style")
                    .removeAttr("data-swiper-slide-index")
                    .removeAttr("data-swiper-column")
                    .removeAttr("data-swiper-row")),
              a.emit("destroy"),
              Object.keys(a.eventsListeners).forEach(function (e) {
                a.off(e);
              }),
              !1 !== e &&
                ((a.$el[0].swiper = null),
                a.$el.data("swiper", null),
                V.deleteProps(a)),
              (a.destroyed = !0)),
            null
          );
        }),
        (h.extendDefaults = function (e) {
          V.extend(E, e);
        }),
        (e.extendedDefaults.get = function () {
          return E;
        }),
        (e.defaults.get = function () {
          return x;
        }),
        (e.Class.get = function () {
          return u;
        }),
        (e.$.get = function () {
          return L;
        }),
        Object.defineProperties(h, e),
        h
      );
    })(s),
    C = { name: "device", proto: { device: m }, static: { device: m } },
    M = { name: "support", proto: { support: F }, static: { support: F } },
    k = { name: "browser", proto: { browser: I }, static: { browser: I } },
    P = {
      name: "resize",
      create: function () {
        var e = this;
        V.extend(e, {
          resize: {
            resizeHandler: function () {
              e &&
                !e.destroyed &&
                e.initialized &&
                (e.emit("beforeResize"), e.emit("resize"));
            },
            orientationChangeHandler: function () {
              e && !e.destroyed && e.initialized && e.emit("orientationchange");
            },
          },
        });
      },
      on: {
        init: function () {
          Y.addEventListener("resize", this.resize.resizeHandler),
            Y.addEventListener(
              "orientationchange",
              this.resize.orientationChangeHandler
            );
        },
        destroy: function () {
          Y.removeEventListener("resize", this.resize.resizeHandler),
            Y.removeEventListener(
              "orientationchange",
              this.resize.orientationChangeHandler
            );
        },
      },
    },
    z = {
      func: Y.MutationObserver || Y.WebkitMutationObserver,
      attach: function (e, t) {
        void 0 === t && (t = {});
        var a = this,
          i = new z.func(function (e) {
            if (1 !== e.length) {
              var t = function () {
                a.emit("observerUpdate", e[0]);
              };
              Y.requestAnimationFrame
                ? Y.requestAnimationFrame(t)
                : Y.setTimeout(t, 0);
            } else a.emit("observerUpdate", e[0]);
          });
        i.observe(e, {
          attributes: void 0 === t.attributes || t.attributes,
          childList: void 0 === t.childList || t.childList,
          characterData: void 0 === t.characterData || t.characterData,
        }),
          a.observer.observers.push(i);
      },
      init: function () {
        var e = this;
        if (F.observer && e.params.observer) {
          if (e.params.observeParents)
            for (var t = e.$el.parents(), a = 0; a < t.length; a += 1)
              e.observer.attach(t[a]);
          e.observer.attach(e.$el[0], { childList: !1 }),
            e.observer.attach(e.$wrapperEl[0], { attributes: !1 });
        }
      },
      destroy: function () {
        this.observer.observers.forEach(function (e) {
          e.disconnect();
        }),
          (this.observer.observers = []);
      },
    },
    $ = {
      name: "observer",
      params: { observer: !1, observeParents: !1 },
      create: function () {
        V.extend(this, {
          observer: {
            init: z.init.bind(this),
            attach: z.attach.bind(this),
            destroy: z.destroy.bind(this),
            observers: [],
          },
        });
      },
      on: {
        init: function () {
          this.observer.init();
        },
        destroy: function () {
          this.observer.destroy();
        },
      },
    },
    D = {
      update: function (e) {
        var t = this,
          a = t.params,
          i = a.slidesPerView,
          s = a.slidesPerGroup,
          r = a.centeredSlides,
          n = t.params.virtual,
          o = n.addSlidesBefore,
          l = n.addSlidesAfter,
          d = t.virtual,
          p = d.from,
          c = d.to,
          u = d.slides,
          h = d.slidesGrid,
          v = d.renderSlide,
          f = d.offset;
        t.updateActiveIndex();
        var m,
          g,
          b,
          w = t.activeIndex || 0;
        (m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top"),
          r
            ? ((g = Math.floor(i / 2) + s + o), (b = Math.floor(i / 2) + s + l))
            : ((g = i + (s - 1) + o), (b = s + l));
        var y = Math.max((w || 0) - b, 0),
          x = Math.min((w || 0) + g, u.length - 1),
          T = (t.slidesGrid[y] || 0) - (t.slidesGrid[0] || 0);
        function E() {
          t.updateSlides(),
            t.updateProgress(),
            t.updateSlidesClasses(),
            t.lazy && t.params.lazy.enabled && t.lazy.load();
        }
        if (
          (V.extend(t.virtual, {
            from: y,
            to: x,
            offset: T,
            slidesGrid: t.slidesGrid,
          }),
          p === y && c === x && !e)
        )
          return (
            t.slidesGrid !== h && T !== f && t.slides.css(m, T + "px"),
            void t.updateProgress()
          );
        if (t.params.virtual.renderExternal)
          return (
            t.params.virtual.renderExternal.call(t, {
              offset: T,
              from: y,
              to: x,
              slides: (function () {
                for (var e = [], t = y; t <= x; t += 1) e.push(u[t]);
                return e;
              })(),
            }),
            void E()
          );
        var S = [],
          C = [];
        if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
        else
          for (var M = p; M <= c; M += 1)
            (M < y || x < M) &&
              t.$wrapperEl
                .find(
                  "." +
                    t.params.slideClass +
                    '[data-swiper-slide-index="' +
                    M +
                    '"]'
                )
                .remove();
        for (var k = 0; k < u.length; k += 1)
          y <= k &&
            k <= x &&
            (void 0 === c || e
              ? C.push(k)
              : (c < k && C.push(k), k < p && S.push(k)));
        C.forEach(function (e) {
          t.$wrapperEl.append(v(u[e], e));
        }),
          S.sort(function (e, t) {
            return t - e;
          }).forEach(function (e) {
            t.$wrapperEl.prepend(v(u[e], e));
          }),
          t.$wrapperEl.children(".swiper-slide").css(m, T + "px"),
          E();
      },
      renderSlide: function (e, t) {
        var a = this,
          i = a.params.virtual;
        if (i.cache && a.virtual.cache[t]) return a.virtual.cache[t];
        var s = i.renderSlide
          ? L(i.renderSlide.call(a, e, t))
          : L(
              '<div class="' +
                a.params.slideClass +
                '" data-swiper-slide-index="' +
                t +
                '">' +
                e +
                "</div>"
            );
        return (
          s.attr("data-swiper-slide-index") ||
            s.attr("data-swiper-slide-index", t),
          i.cache && (a.virtual.cache[t] = s),
          s
        );
      },
      appendSlide: function (e) {
        this.virtual.slides.push(e), this.virtual.update(!0);
      },
      prependSlide: function (e) {
        var t = this;
        if ((t.virtual.slides.unshift(e), t.params.virtual.cache)) {
          var a = t.virtual.cache,
            i = {};
          Object.keys(a).forEach(function (e) {
            i[e + 1] = a[e];
          }),
            (t.virtual.cache = i);
        }
        t.virtual.update(!0), t.slideNext(0);
      },
    },
    O = {
      name: "virtual",
      params: {
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null,
          addSlidesBefore: 0,
          addSlidesAfter: 0,
        },
      },
      create: function () {
        var e = this;
        V.extend(e, {
          virtual: {
            update: D.update.bind(e),
            appendSlide: D.appendSlide.bind(e),
            prependSlide: D.prependSlide.bind(e),
            renderSlide: D.renderSlide.bind(e),
            slides: e.params.virtual.slides,
            cache: {},
          },
        });
      },
      on: {
        beforeInit: function () {
          var e = this;
          if (e.params.virtual.enabled) {
            e.classNames.push(e.params.containerModifierClass + "virtual");
            var t = { watchSlidesProgress: !0 };
            V.extend(e.params, t),
              V.extend(e.originalParams, t),
              e.params.initialSlide || e.virtual.update();
          }
        },
        setTranslate: function () {
          this.params.virtual.enabled && this.virtual.update();
        },
      },
    },
    A = {
      handle: function (e) {
        var t = this,
          a = t.rtlTranslate,
          i = e;
        i.originalEvent && (i = i.originalEvent);
        var s = i.keyCode || i.charCode;
        if (
          !t.allowSlideNext &&
          ((t.isHorizontal() && 39 === s) || (t.isVertical() && 40 === s))
        )
          return !1;
        if (
          !t.allowSlidePrev &&
          ((t.isHorizontal() && 37 === s) || (t.isVertical() && 38 === s))
        )
          return !1;
        if (
          !(
            i.shiftKey ||
            i.altKey ||
            i.ctrlKey ||
            i.metaKey ||
            (f.activeElement &&
              f.activeElement.nodeName &&
              ("input" === f.activeElement.nodeName.toLowerCase() ||
                "textarea" === f.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (
            t.params.keyboard.onlyInViewport &&
            (37 === s || 39 === s || 38 === s || 40 === s)
          ) {
            var r = !1;
            if (
              0 < t.$el.parents("." + t.params.slideClass).length &&
              0 === t.$el.parents("." + t.params.slideActiveClass).length
            )
              return;
            var n = Y.innerWidth,
              o = Y.innerHeight,
              l = t.$el.offset();
            a && (l.left -= t.$el[0].scrollLeft);
            for (
              var d = [
                  [l.left, l.top],
                  [l.left + t.width, l.top],
                  [l.left, l.top + t.height],
                  [l.left + t.width, l.top + t.height],
                ],
                p = 0;
              p < d.length;
              p += 1
            ) {
              var c = d[p];
              0 <= c[0] && c[0] <= n && 0 <= c[1] && c[1] <= o && (r = !0);
            }
            if (!r) return;
          }
          t.isHorizontal()
            ? ((37 !== s && 39 !== s) ||
                (i.preventDefault ? i.preventDefault() : (i.returnValue = !1)),
              ((39 === s && !a) || (37 === s && a)) && t.slideNext(),
              ((37 === s && !a) || (39 === s && a)) && t.slidePrev())
            : ((38 !== s && 40 !== s) ||
                (i.preventDefault ? i.preventDefault() : (i.returnValue = !1)),
              40 === s && t.slideNext(),
              38 === s && t.slidePrev()),
            t.emit("keyPress", s);
        }
      },
      enable: function () {
        this.keyboard.enabled ||
          (L(f).on("keydown", this.keyboard.handle),
          (this.keyboard.enabled = !0));
      },
      disable: function () {
        this.keyboard.enabled &&
          (L(f).off("keydown", this.keyboard.handle),
          (this.keyboard.enabled = !1));
      },
    },
    N = {
      name: "keyboard",
      params: { keyboard: { enabled: !1, onlyInViewport: !0 } },
      create: function () {
        V.extend(this, {
          keyboard: {
            enabled: !1,
            enable: A.enable.bind(this),
            disable: A.disable.bind(this),
            handle: A.handle.bind(this),
          },
        });
      },
      on: {
        init: function () {
          this.params.keyboard.enabled && this.keyboard.enable();
        },
        destroy: function () {
          this.keyboard.enabled && this.keyboard.disable();
        },
      },
    };
  var H = {
      lastScrollTime: V.now(),
      event:
        -1 < Y.navigator.userAgent.indexOf("firefox")
          ? "DOMMouseScroll"
          : (function () {
              var e = "onwheel",
                t = e in f;
              if (!t) {
                var a = f.createElement("div");
                a.setAttribute(e, "return;"), (t = "function" == typeof a[e]);
              }
              return (
                !t &&
                  f.implementation &&
                  f.implementation.hasFeature &&
                  !0 !== f.implementation.hasFeature("", "") &&
                  (t = f.implementation.hasFeature("Events.wheel", "3.0")),
                t
              );
            })()
          ? "wheel"
          : "mousewheel",
      normalize: function (e) {
        var t = 0,
          a = 0,
          i = 0,
          s = 0;
        return (
          "detail" in e && (a = e.detail),
          "wheelDelta" in e && (a = -e.wheelDelta / 120),
          "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120),
          "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
          "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = a), (a = 0)),
          (i = 10 * t),
          (s = 10 * a),
          "deltaY" in e && (s = e.deltaY),
          "deltaX" in e && (i = e.deltaX),
          (i || s) &&
            e.deltaMode &&
            (1 === e.deltaMode
              ? ((i *= 40), (s *= 40))
              : ((i *= 800), (s *= 800))),
          i && !t && (t = i < 1 ? -1 : 1),
          s && !a && (a = s < 1 ? -1 : 1),
          { spinX: t, spinY: a, pixelX: i, pixelY: s }
        );
      },
      handleMouseEnter: function () {
        this.mouseEntered = !0;
      },
      handleMouseLeave: function () {
        this.mouseEntered = !1;
      },
      handle: function (e) {
        var t = e,
          a = this,
          i = a.params.mousewheel;
        if (!a.mouseEntered && !i.releaseOnEdges) return !0;
        t.originalEvent && (t = t.originalEvent);
        var s = 0,
          r = a.rtlTranslate ? -1 : 1,
          n = H.normalize(t);
        if (i.forceToAxis)
          if (a.isHorizontal()) {
            if (!(Math.abs(n.pixelX) > Math.abs(n.pixelY))) return !0;
            s = n.pixelX * r;
          } else {
            if (!(Math.abs(n.pixelY) > Math.abs(n.pixelX))) return !0;
            s = n.pixelY;
          }
        else
          s =
            Math.abs(n.pixelX) > Math.abs(n.pixelY) ? -n.pixelX * r : -n.pixelY;
        if (0 === s) return !0;
        if ((i.invert && (s = -s), a.params.freeMode)) {
          a.params.loop && a.loopFix();
          var o = a.getTranslate() + s * i.sensitivity,
            l = a.isBeginning,
            d = a.isEnd;
          if (
            (o >= a.minTranslate() && (o = a.minTranslate()),
            o <= a.maxTranslate() && (o = a.maxTranslate()),
            a.setTransition(0),
            a.setTranslate(o),
            a.updateProgress(),
            a.updateActiveIndex(),
            a.updateSlidesClasses(),
            ((!l && a.isBeginning) || (!d && a.isEnd)) &&
              a.updateSlidesClasses(),
            a.params.freeModeSticky &&
              (clearTimeout(a.mousewheel.timeout),
              (a.mousewheel.timeout = V.nextTick(function () {
                a.slideToClosest();
              }, 300))),
            a.emit("scroll", t),
            a.params.autoplay &&
              a.params.autoplayDisableOnInteraction &&
              a.autoplay.stop(),
            o === a.minTranslate() || o === a.maxTranslate())
          )
            return !0;
        } else {
          if (60 < V.now() - a.mousewheel.lastScrollTime)
            if (s < 0)
              if ((a.isEnd && !a.params.loop) || a.animating) {
                if (i.releaseOnEdges) return !0;
              } else a.slideNext(), a.emit("scroll", t);
            else if ((a.isBeginning && !a.params.loop) || a.animating) {
              if (i.releaseOnEdges) return !0;
            } else a.slidePrev(), a.emit("scroll", t);
          a.mousewheel.lastScrollTime = new Y.Date().getTime();
        }
        return t.preventDefault ? t.preventDefault() : (t.returnValue = !1), !1;
      },
      enable: function () {
        var e = this;
        if (!H.event) return !1;
        if (e.mousewheel.enabled) return !1;
        var t = e.$el;
        return (
          "container" !== e.params.mousewheel.eventsTarged &&
            (t = L(e.params.mousewheel.eventsTarged)),
          t.on("mouseenter", e.mousewheel.handleMouseEnter),
          t.on("mouseleave", e.mousewheel.handleMouseLeave),
          t.on(H.event, e.mousewheel.handle),
          (e.mousewheel.enabled = !0)
        );
      },
      disable: function () {
        var e = this;
        if (!H.event) return !1;
        if (!e.mousewheel.enabled) return !1;
        var t = e.$el;
        return (
          "container" !== e.params.mousewheel.eventsTarged &&
            (t = L(e.params.mousewheel.eventsTarged)),
          t.off(H.event, e.mousewheel.handle),
          !(e.mousewheel.enabled = !1)
        );
      },
    },
    G = {
      update: function () {
        var e = this,
          t = e.params.navigation;
        if (!e.params.loop) {
          var a = e.navigation,
            i = a.$nextEl,
            s = a.$prevEl;
          s &&
            0 < s.length &&
            (e.isBeginning
              ? s.addClass(t.disabledClass)
              : s.removeClass(t.disabledClass),
            s[
              e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"
            ](t.lockClass)),
            i &&
              0 < i.length &&
              (e.isEnd
                ? i.addClass(t.disabledClass)
                : i.removeClass(t.disabledClass),
              i[
                e.params.watchOverflow && e.isLocked
                  ? "addClass"
                  : "removeClass"
              ](t.lockClass));
        }
      },
      onPrevClick: function (e) {
        e.preventDefault(),
          (this.isBeginning && !this.params.loop) || this.slidePrev();
      },
      onNextClick: function (e) {
        e.preventDefault(),
          (this.isEnd && !this.params.loop) || this.slideNext();
      },
      init: function () {
        var e,
          t,
          a = this,
          i = a.params.navigation;
        (i.nextEl || i.prevEl) &&
          (i.nextEl &&
            ((e = L(i.nextEl)),
            a.params.uniqueNavElements &&
              "string" == typeof i.nextEl &&
              1 < e.length &&
              1 === a.$el.find(i.nextEl).length &&
              (e = a.$el.find(i.nextEl))),
          i.prevEl &&
            ((t = L(i.prevEl)),
            a.params.uniqueNavElements &&
              "string" == typeof i.prevEl &&
              1 < t.length &&
              1 === a.$el.find(i.prevEl).length &&
              (t = a.$el.find(i.prevEl))),
          e && 0 < e.length && e.on("click", a.navigation.onNextClick),
          t && 0 < t.length && t.on("click", a.navigation.onPrevClick),
          V.extend(a.navigation, {
            $nextEl: e,
            nextEl: e && e[0],
            $prevEl: t,
            prevEl: t && t[0],
          }));
      },
      destroy: function () {
        var e = this,
          t = e.navigation,
          a = t.$nextEl,
          i = t.$prevEl;
        a &&
          a.length &&
          (a.off("click", e.navigation.onNextClick),
          a.removeClass(e.params.navigation.disabledClass)),
          i &&
            i.length &&
            (i.off("click", e.navigation.onPrevClick),
            i.removeClass(e.params.navigation.disabledClass));
      },
    },
    B = {
      update: function () {
        var e = this,
          t = e.rtl,
          s = e.params.pagination;
        if (
          s.el &&
          e.pagination.el &&
          e.pagination.$el &&
          0 !== e.pagination.$el.length
        ) {
          var r,
            a =
              e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.slides.length,
            i = e.pagination.$el,
            n = e.params.loop
              ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup)
              : e.snapGrid.length;
          if (
            (e.params.loop
              ? ((r = Math.ceil(
                  (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
                )) >
                  a - 1 - 2 * e.loopedSlides && (r -= a - 2 * e.loopedSlides),
                n - 1 < r && (r -= n),
                r < 0 && "bullets" !== e.params.paginationType && (r = n + r))
              : (r = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
            "bullets" === s.type &&
              e.pagination.bullets &&
              0 < e.pagination.bullets.length)
          ) {
            var o,
              l,
              d,
              p = e.pagination.bullets;
            if (
              (s.dynamicBullets &&
                ((e.pagination.bulletSize = p
                  .eq(0)
                  [e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                i.css(
                  e.isHorizontal() ? "width" : "height",
                  e.pagination.bulletSize * (s.dynamicMainBullets + 4) + "px"
                ),
                1 < s.dynamicMainBullets &&
                  void 0 !== e.previousIndex &&
                  ((e.pagination.dynamicBulletIndex += r - e.previousIndex),
                  e.pagination.dynamicBulletIndex > s.dynamicMainBullets - 1
                    ? (e.pagination.dynamicBulletIndex =
                        s.dynamicMainBullets - 1)
                    : e.pagination.dynamicBulletIndex < 0 &&
                      (e.pagination.dynamicBulletIndex = 0)),
                (o = r - e.pagination.dynamicBulletIndex),
                (d =
                  ((l = o + (Math.min(p.length, s.dynamicMainBullets) - 1)) +
                    o) /
                  2)),
              p.removeClass(
                s.bulletActiveClass +
                  " " +
                  s.bulletActiveClass +
                  "-next " +
                  s.bulletActiveClass +
                  "-next-next " +
                  s.bulletActiveClass +
                  "-prev " +
                  s.bulletActiveClass +
                  "-prev-prev " +
                  s.bulletActiveClass +
                  "-main"
              ),
              1 < i.length)
            )
              p.each(function (e, t) {
                var a = L(t),
                  i = a.index();
                i === r && a.addClass(s.bulletActiveClass),
                  s.dynamicBullets &&
                    (o <= i &&
                      i <= l &&
                      a.addClass(s.bulletActiveClass + "-main"),
                    i === o &&
                      a
                        .prev()
                        .addClass(s.bulletActiveClass + "-prev")
                        .prev()
                        .addClass(s.bulletActiveClass + "-prev-prev"),
                    i === l &&
                      a
                        .next()
                        .addClass(s.bulletActiveClass + "-next")
                        .next()
                        .addClass(s.bulletActiveClass + "-next-next"));
              });
            else if (
              (p.eq(r).addClass(s.bulletActiveClass), s.dynamicBullets)
            ) {
              for (var c = p.eq(o), u = p.eq(l), h = o; h <= l; h += 1)
                p.eq(h).addClass(s.bulletActiveClass + "-main");
              c
                .prev()
                .addClass(s.bulletActiveClass + "-prev")
                .prev()
                .addClass(s.bulletActiveClass + "-prev-prev"),
                u
                  .next()
                  .addClass(s.bulletActiveClass + "-next")
                  .next()
                  .addClass(s.bulletActiveClass + "-next-next");
            }
            if (s.dynamicBullets) {
              var v = Math.min(p.length, s.dynamicMainBullets + 4),
                f =
                  (e.pagination.bulletSize * v - e.pagination.bulletSize) / 2 -
                  d * e.pagination.bulletSize,
                m = t ? "right" : "left";
              p.css(e.isHorizontal() ? m : "top", f + "px");
            }
          }
          if (
            ("fraction" === s.type &&
              (i
                .find("." + s.currentClass)
                .text(s.formatFractionCurrent(r + 1)),
              i.find("." + s.totalClass).text(s.formatFractionTotal(n))),
            "progressbar" === s.type)
          ) {
            var g;
            g = s.progressbarOpposite
              ? e.isHorizontal()
                ? "vertical"
                : "horizontal"
              : e.isHorizontal()
              ? "horizontal"
              : "vertical";
            var b = (r + 1) / n,
              w = 1,
              y = 1;
            "horizontal" === g ? (w = b) : (y = b),
              i
                .find("." + s.progressbarFillClass)
                .transform(
                  "translate3d(0,0,0) scaleX(" + w + ") scaleY(" + y + ")"
                )
                .transition(e.params.speed);
          }
          "custom" === s.type && s.renderCustom
            ? (i.html(s.renderCustom(e, r + 1, n)),
              e.emit("paginationRender", e, i[0]))
            : e.emit("paginationUpdate", e, i[0]),
            i[
              e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"
            ](s.lockClass);
        }
      },
      render: function () {
        var e = this,
          t = e.params.pagination;
        if (
          t.el &&
          e.pagination.el &&
          e.pagination.$el &&
          0 !== e.pagination.$el.length
        ) {
          var a =
              e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.slides.length,
            i = e.pagination.$el,
            s = "";
          if ("bullets" === t.type) {
            for (
              var r = e.params.loop
                  ? Math.ceil(
                      (a - 2 * e.loopedSlides) / e.params.slidesPerGroup
                    )
                  : e.snapGrid.length,
                n = 0;
              n < r;
              n += 1
            )
              t.renderBullet
                ? (s += t.renderBullet.call(e, n, t.bulletClass))
                : (s +=
                    "<" +
                    t.bulletElement +
                    ' class="' +
                    t.bulletClass +
                    '"></' +
                    t.bulletElement +
                    ">");
            i.html(s), (e.pagination.bullets = i.find("." + t.bulletClass));
          }
          "fraction" === t.type &&
            ((s = t.renderFraction
              ? t.renderFraction.call(e, t.currentClass, t.totalClass)
              : '<span class="' +
                t.currentClass +
                '"></span> / <span class="' +
                t.totalClass +
                '"></span>'),
            i.html(s)),
            "progressbar" === t.type &&
              ((s = t.renderProgressbar
                ? t.renderProgressbar.call(e, t.progressbarFillClass)
                : '<span class="' + t.progressbarFillClass + '"></span>'),
              i.html(s)),
            "custom" !== t.type &&
              e.emit("paginationRender", e.pagination.$el[0]);
        }
      },
      init: function () {
        var a = this,
          e = a.params.pagination;
        if (e.el) {
          var t = L(e.el);
          0 !== t.length &&
            (a.params.uniqueNavElements &&
              "string" == typeof e.el &&
              1 < t.length &&
              1 === a.$el.find(e.el).length &&
              (t = a.$el.find(e.el)),
            "bullets" === e.type && e.clickable && t.addClass(e.clickableClass),
            t.addClass(e.modifierClass + e.type),
            "bullets" === e.type &&
              e.dynamicBullets &&
              (t.addClass("" + e.modifierClass + e.type + "-dynamic"),
              (a.pagination.dynamicBulletIndex = 0),
              e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
            "progressbar" === e.type &&
              e.progressbarOpposite &&
              t.addClass(e.progressbarOppositeClass),
            e.clickable &&
              t.on("click", "." + e.bulletClass, function (e) {
                e.preventDefault();
                var t = L(this).index() * a.params.slidesPerGroup;
                a.params.loop && (t += a.loopedSlides), a.slideTo(t);
              }),
            V.extend(a.pagination, { $el: t, el: t[0] }));
        }
      },
      destroy: function () {
        var e = this,
          t = e.params.pagination;
        if (
          t.el &&
          e.pagination.el &&
          e.pagination.$el &&
          0 !== e.pagination.$el.length
        ) {
          var a = e.pagination.$el;
          a.removeClass(t.hiddenClass),
            a.removeClass(t.modifierClass + t.type),
            e.pagination.bullets &&
              e.pagination.bullets.removeClass(t.bulletActiveClass),
            t.clickable && a.off("click", "." + t.bulletClass);
        }
      },
    },
    X = {
      setTranslate: function () {
        var e = this;
        if (e.params.scrollbar.el && e.scrollbar.el) {
          var t = e.scrollbar,
            a = e.rtlTranslate,
            i = e.progress,
            s = t.dragSize,
            r = t.trackSize,
            n = t.$dragEl,
            o = t.$el,
            l = e.params.scrollbar,
            d = s,
            p = (r - s) * i;
          a
            ? 0 < (p = -p)
              ? ((d = s - p), (p = 0))
              : r < -p + s && (d = r + p)
            : p < 0
            ? ((d = s + p), (p = 0))
            : r < p + s && (d = r - p),
            e.isHorizontal()
              ? (F.transforms3d
                  ? n.transform("translate3d(" + p + "px, 0, 0)")
                  : n.transform("translateX(" + p + "px)"),
                (n[0].style.width = d + "px"))
              : (F.transforms3d
                  ? n.transform("translate3d(0px, " + p + "px, 0)")
                  : n.transform("translateY(" + p + "px)"),
                (n[0].style.height = d + "px")),
            l.hide &&
              (clearTimeout(e.scrollbar.timeout),
              (o[0].style.opacity = 1),
              (e.scrollbar.timeout = setTimeout(function () {
                (o[0].style.opacity = 0), o.transition(400);
              }, 1e3)));
        }
      },
      setTransition: function (e) {
        this.params.scrollbar.el &&
          this.scrollbar.el &&
          this.scrollbar.$dragEl.transition(e);
      },
      updateSize: function () {
        var e = this;
        if (e.params.scrollbar.el && e.scrollbar.el) {
          var t = e.scrollbar,
            a = t.$dragEl,
            i = t.$el;
          (a[0].style.width = ""), (a[0].style.height = "");
          var s,
            r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
            n = e.size / e.virtualSize,
            o = n * (r / e.size);
          (s =
            "auto" === e.params.scrollbar.dragSize
              ? r * n
              : parseInt(e.params.scrollbar.dragSize, 10)),
            e.isHorizontal()
              ? (a[0].style.width = s + "px")
              : (a[0].style.height = s + "px"),
            (i[0].style.display = 1 <= n ? "none" : ""),
            e.params.scrollbarHide && (i[0].style.opacity = 0),
            V.extend(t, {
              trackSize: r,
              divider: n,
              moveDivider: o,
              dragSize: s,
            }),
            t.$el[
              e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"
            ](e.params.scrollbar.lockClass);
        }
      },
      setDragPosition: function (e) {
        var t,
          a = this,
          i = a.scrollbar,
          s = a.rtlTranslate,
          r = i.$el,
          n = i.dragSize,
          o = i.trackSize;
        (t =
          ((a.isHorizontal()
            ? "touchstart" === e.type || "touchmove" === e.type
              ? e.targetTouches[0].pageX
              : e.pageX || e.clientX
            : "touchstart" === e.type || "touchmove" === e.type
            ? e.targetTouches[0].pageY
            : e.pageY || e.clientY) -
            r.offset()[a.isHorizontal() ? "left" : "top"] -
            n / 2) /
          (o - n)),
          (t = Math.max(Math.min(t, 1), 0)),
          s && (t = 1 - t);
        var l = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
        a.updateProgress(l),
          a.setTranslate(l),
          a.updateActiveIndex(),
          a.updateSlidesClasses();
      },
      onDragStart: function (e) {
        var t = this,
          a = t.params.scrollbar,
          i = t.scrollbar,
          s = t.$wrapperEl,
          r = i.$el,
          n = i.$dragEl;
        (t.scrollbar.isTouched = !0),
          e.preventDefault(),
          e.stopPropagation(),
          s.transition(100),
          n.transition(100),
          i.setDragPosition(e),
          clearTimeout(t.scrollbar.dragTimeout),
          r.transition(0),
          a.hide && r.css("opacity", 1),
          t.emit("scrollbarDragStart", e);
      },
      onDragMove: function (e) {
        var t = this.scrollbar,
          a = this.$wrapperEl,
          i = t.$el,
          s = t.$dragEl;
        this.scrollbar.isTouched &&
          (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
          t.setDragPosition(e),
          a.transition(0),
          i.transition(0),
          s.transition(0),
          this.emit("scrollbarDragMove", e));
      },
      onDragEnd: function (e) {
        var t = this,
          a = t.params.scrollbar,
          i = t.scrollbar.$el;
        t.scrollbar.isTouched &&
          ((t.scrollbar.isTouched = !1),
          a.hide &&
            (clearTimeout(t.scrollbar.dragTimeout),
            (t.scrollbar.dragTimeout = V.nextTick(function () {
              i.css("opacity", 0), i.transition(400);
            }, 1e3))),
          t.emit("scrollbarDragEnd", e),
          a.snapOnRelease && t.slideToClosest());
      },
      enableDraggable: function () {
        var e = this;
        if (e.params.scrollbar.el) {
          var t = e.scrollbar,
            a = e.touchEventsTouch,
            i = e.touchEventsDesktop,
            s = e.params,
            r = t.$el[0],
            n = !(!F.passiveListener || !s.passiveListeners) && {
              passive: !1,
              capture: !1,
            },
            o = !(!F.passiveListener || !s.passiveListeners) && {
              passive: !0,
              capture: !1,
            };
          F.touch
            ? (r.addEventListener(a.start, e.scrollbar.onDragStart, n),
              r.addEventListener(a.move, e.scrollbar.onDragMove, n),
              r.addEventListener(a.end, e.scrollbar.onDragEnd, o))
            : (r.addEventListener(i.start, e.scrollbar.onDragStart, n),
              f.addEventListener(i.move, e.scrollbar.onDragMove, n),
              f.addEventListener(i.end, e.scrollbar.onDragEnd, o));
        }
      },
      disableDraggable: function () {
        var e = this;
        if (e.params.scrollbar.el) {
          var t = e.scrollbar,
            a = e.touchEventsTouch,
            i = e.touchEventsDesktop,
            s = e.params,
            r = t.$el[0],
            n = !(!F.passiveListener || !s.passiveListeners) && {
              passive: !1,
              capture: !1,
            },
            o = !(!F.passiveListener || !s.passiveListeners) && {
              passive: !0,
              capture: !1,
            };
          F.touch
            ? (r.removeEventListener(a.start, e.scrollbar.onDragStart, n),
              r.removeEventListener(a.move, e.scrollbar.onDragMove, n),
              r.removeEventListener(a.end, e.scrollbar.onDragEnd, o))
            : (r.removeEventListener(i.start, e.scrollbar.onDragStart, n),
              f.removeEventListener(i.move, e.scrollbar.onDragMove, n),
              f.removeEventListener(i.end, e.scrollbar.onDragEnd, o));
        }
      },
      init: function () {
        var e = this;
        if (e.params.scrollbar.el) {
          var t = e.scrollbar,
            a = e.$el,
            i = e.params.scrollbar,
            s = L(i.el);
          e.params.uniqueNavElements &&
            "string" == typeof i.el &&
            1 < s.length &&
            1 === a.find(i.el).length &&
            (s = a.find(i.el));
          var r = s.find("." + e.params.scrollbar.dragClass);
          0 === r.length &&
            ((r = L(
              '<div class="' + e.params.scrollbar.dragClass + '"></div>'
            )),
            s.append(r)),
            V.extend(t, { $el: s, el: s[0], $dragEl: r, dragEl: r[0] }),
            i.draggable && t.enableDraggable();
        }
      },
      destroy: function () {
        this.scrollbar.disableDraggable();
      },
    },
    R = {
      setTransform: function (e, t) {
        var a = this.rtl,
          i = L(e),
          s = a ? -1 : 1,
          r = i.attr("data-swiper-parallax") || "0",
          n = i.attr("data-swiper-parallax-x"),
          o = i.attr("data-swiper-parallax-y"),
          l = i.attr("data-swiper-parallax-scale"),
          d = i.attr("data-swiper-parallax-opacity");
        if (
          (n || o
            ? ((n = n || "0"), (o = o || "0"))
            : this.isHorizontal()
            ? ((n = r), (o = "0"))
            : ((o = r), (n = "0")),
          (n =
            0 <= n.indexOf("%")
              ? parseInt(n, 10) * t * s + "%"
              : n * t * s + "px"),
          (o = 0 <= o.indexOf("%") ? parseInt(o, 10) * t + "%" : o * t + "px"),
          null != d)
        ) {
          var p = d - (d - 1) * (1 - Math.abs(t));
          i[0].style.opacity = p;
        }
        if (null == l) i.transform("translate3d(" + n + ", " + o + ", 0px)");
        else {
          var c = l - (l - 1) * (1 - Math.abs(t));
          i.transform(
            "translate3d(" + n + ", " + o + ", 0px) scale(" + c + ")"
          );
        }
      },
      setTranslate: function () {
        var i = this,
          e = i.$el,
          t = i.slides,
          s = i.progress,
          r = i.snapGrid;
        e
          .children(
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
          )
          .each(function (e, t) {
            i.parallax.setTransform(t, s);
          }),
          t.each(function (e, t) {
            var a = t.progress;
            1 < i.params.slidesPerGroup &&
              "auto" !== i.params.slidesPerView &&
              (a += Math.ceil(e / 2) - s * (r.length - 1)),
              (a = Math.min(Math.max(a, -1), 1)),
              L(t)
                .find(
                  "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                )
                .each(function (e, t) {
                  i.parallax.setTransform(t, a);
                });
          });
      },
      setTransition: function (s) {
        void 0 === s && (s = this.params.speed);
        this.$el
          .find(
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
          )
          .each(function (e, t) {
            var a = L(t),
              i = parseInt(a.attr("data-swiper-parallax-duration"), 10) || s;
            0 === s && (i = 0), a.transition(i);
          });
      },
    },
    q = {
      getDistanceBetweenTouches: function (e) {
        if (e.targetTouches.length < 2) return 1;
        var t = e.targetTouches[0].pageX,
          a = e.targetTouches[0].pageY,
          i = e.targetTouches[1].pageX,
          s = e.targetTouches[1].pageY;
        return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2));
      },
      onGestureStart: function (e) {
        var t = this,
          a = t.params.zoom,
          i = t.zoom,
          s = i.gesture;
        if (
          ((i.fakeGestureTouched = !1), (i.fakeGestureMoved = !1), !F.gestures)
        ) {
          if (
            "touchstart" !== e.type ||
            ("touchstart" === e.type && e.targetTouches.length < 2)
          )
            return;
          (i.fakeGestureTouched = !0),
            (s.scaleStart = q.getDistanceBetweenTouches(e));
        }
        (s.$slideEl && s.$slideEl.length) ||
        ((s.$slideEl = L(e.target).closest(".swiper-slide")),
        0 === s.$slideEl.length && (s.$slideEl = t.slides.eq(t.activeIndex)),
        (s.$imageEl = s.$slideEl.find("img, svg, canvas")),
        (s.$imageWrapEl = s.$imageEl.parent("." + a.containerClass)),
        (s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio),
        0 !== s.$imageWrapEl.length)
          ? (s.$imageEl.transition(0), (t.zoom.isScaling = !0))
          : (s.$imageEl = void 0);
      },
      onGestureChange: function (e) {
        var t = this.params.zoom,
          a = this.zoom,
          i = a.gesture;
        if (!F.gestures) {
          if (
            "touchmove" !== e.type ||
            ("touchmove" === e.type && e.targetTouches.length < 2)
          )
            return;
          (a.fakeGestureMoved = !0),
            (i.scaleMove = q.getDistanceBetweenTouches(e));
        }
        i.$imageEl &&
          0 !== i.$imageEl.length &&
          (F.gestures
            ? (this.zoom.scale = e.scale * a.currentScale)
            : (a.scale = (i.scaleMove / i.scaleStart) * a.currentScale),
          a.scale > i.maxRatio &&
            (a.scale =
              i.maxRatio - 1 + Math.pow(a.scale - i.maxRatio + 1, 0.5)),
          a.scale < t.minRatio &&
            (a.scale =
              t.minRatio + 1 - Math.pow(t.minRatio - a.scale + 1, 0.5)),
          i.$imageEl.transform("translate3d(0,0,0) scale(" + a.scale + ")"));
      },
      onGestureEnd: function (e) {
        var t = this.params.zoom,
          a = this.zoom,
          i = a.gesture;
        if (!F.gestures) {
          if (!a.fakeGestureTouched || !a.fakeGestureMoved) return;
          if (
            "touchend" !== e.type ||
            ("touchend" === e.type && e.changedTouches.length < 2 && !m.android)
          )
            return;
          (a.fakeGestureTouched = !1), (a.fakeGestureMoved = !1);
        }
        i.$imageEl &&
          0 !== i.$imageEl.length &&
          ((a.scale = Math.max(Math.min(a.scale, i.maxRatio), t.minRatio)),
          i.$imageEl
            .transition(this.params.speed)
            .transform("translate3d(0,0,0) scale(" + a.scale + ")"),
          (a.currentScale = a.scale),
          (a.isScaling = !1),
          1 === a.scale && (i.$slideEl = void 0));
      },
      onTouchStart: function (e) {
        var t = this.zoom,
          a = t.gesture,
          i = t.image;
        a.$imageEl &&
          0 !== a.$imageEl.length &&
          (i.isTouched ||
            (m.android && e.preventDefault(),
            (i.isTouched = !0),
            (i.touchesStart.x =
              "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
            (i.touchesStart.y =
              "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)));
      },
      onTouchMove: function (e) {
        var t = this,
          a = t.zoom,
          i = a.gesture,
          s = a.image,
          r = a.velocity;
        if (
          i.$imageEl &&
          0 !== i.$imageEl.length &&
          ((t.allowClick = !1), s.isTouched && i.$slideEl)
        ) {
          s.isMoved ||
            ((s.width = i.$imageEl[0].offsetWidth),
            (s.height = i.$imageEl[0].offsetHeight),
            (s.startX = V.getTranslate(i.$imageWrapEl[0], "x") || 0),
            (s.startY = V.getTranslate(i.$imageWrapEl[0], "y") || 0),
            (i.slideWidth = i.$slideEl[0].offsetWidth),
            (i.slideHeight = i.$slideEl[0].offsetHeight),
            i.$imageWrapEl.transition(0),
            t.rtl && ((s.startX = -s.startX), (s.startY = -s.startY)));
          var n = s.width * a.scale,
            o = s.height * a.scale;
          if (!(n < i.slideWidth && o < i.slideHeight)) {
            if (
              ((s.minX = Math.min(i.slideWidth / 2 - n / 2, 0)),
              (s.maxX = -s.minX),
              (s.minY = Math.min(i.slideHeight / 2 - o / 2, 0)),
              (s.maxY = -s.minY),
              (s.touchesCurrent.x =
                "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
              (s.touchesCurrent.y =
                "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
              !s.isMoved && !a.isScaling)
            ) {
              if (
                t.isHorizontal() &&
                ((Math.floor(s.minX) === Math.floor(s.startX) &&
                  s.touchesCurrent.x < s.touchesStart.x) ||
                  (Math.floor(s.maxX) === Math.floor(s.startX) &&
                    s.touchesCurrent.x > s.touchesStart.x))
              )
                return void (s.isTouched = !1);
              if (
                !t.isHorizontal() &&
                ((Math.floor(s.minY) === Math.floor(s.startY) &&
                  s.touchesCurrent.y < s.touchesStart.y) ||
                  (Math.floor(s.maxY) === Math.floor(s.startY) &&
                    s.touchesCurrent.y > s.touchesStart.y))
              )
                return void (s.isTouched = !1);
            }
            e.preventDefault(),
              e.stopPropagation(),
              (s.isMoved = !0),
              (s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX),
              (s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY),
              s.currentX < s.minX &&
                (s.currentX =
                  s.minX + 1 - Math.pow(s.minX - s.currentX + 1, 0.8)),
              s.currentX > s.maxX &&
                (s.currentX =
                  s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, 0.8)),
              s.currentY < s.minY &&
                (s.currentY =
                  s.minY + 1 - Math.pow(s.minY - s.currentY + 1, 0.8)),
              s.currentY > s.maxY &&
                (s.currentY =
                  s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, 0.8)),
              r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x),
              r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y),
              r.prevTime || (r.prevTime = Date.now()),
              (r.x =
                (s.touchesCurrent.x - r.prevPositionX) /
                (Date.now() - r.prevTime) /
                2),
              (r.y =
                (s.touchesCurrent.y - r.prevPositionY) /
                (Date.now() - r.prevTime) /
                2),
              Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0),
              Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0),
              (r.prevPositionX = s.touchesCurrent.x),
              (r.prevPositionY = s.touchesCurrent.y),
              (r.prevTime = Date.now()),
              i.$imageWrapEl.transform(
                "translate3d(" + s.currentX + "px, " + s.currentY + "px,0)"
              );
          }
        }
      },
      onTouchEnd: function () {
        var e = this.zoom,
          t = e.gesture,
          a = e.image,
          i = e.velocity;
        if (t.$imageEl && 0 !== t.$imageEl.length) {
          if (!a.isTouched || !a.isMoved)
            return (a.isTouched = !1), void (a.isMoved = !1);
          (a.isTouched = !1), (a.isMoved = !1);
          var s = 300,
            r = 300,
            n = i.x * s,
            o = a.currentX + n,
            l = i.y * r,
            d = a.currentY + l;
          0 !== i.x && (s = Math.abs((o - a.currentX) / i.x)),
            0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
          var p = Math.max(s, r);
          (a.currentX = o), (a.currentY = d);
          var c = a.width * e.scale,
            u = a.height * e.scale;
          (a.minX = Math.min(t.slideWidth / 2 - c / 2, 0)),
            (a.maxX = -a.minX),
            (a.minY = Math.min(t.slideHeight / 2 - u / 2, 0)),
            (a.maxY = -a.minY),
            (a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX)),
            (a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY)),
            t.$imageWrapEl
              .transition(p)
              .transform(
                "translate3d(" + a.currentX + "px, " + a.currentY + "px,0)"
              );
        }
      },
      onTransitionEnd: function () {
        var e = this.zoom,
          t = e.gesture;
        t.$slideEl &&
          this.previousIndex !== this.activeIndex &&
          (t.$imageEl.transform("translate3d(0,0,0) scale(1)"),
          t.$imageWrapEl.transform("translate3d(0,0,0)"),
          (t.$slideEl = void 0),
          (t.$imageEl = void 0),
          (t.$imageWrapEl = void 0),
          (e.scale = 1),
          (e.currentScale = 1));
      },
      toggle: function (e) {
        var t = this.zoom;
        t.scale && 1 !== t.scale ? t.out() : t.in(e);
      },
      in: function (e) {
        var t,
          a,
          i,
          s,
          r,
          n,
          o,
          l,
          d,
          p,
          c,
          u,
          h,
          v,
          f,
          m,
          g = this,
          b = g.zoom,
          w = g.params.zoom,
          y = b.gesture,
          x = b.image;
        (y.$slideEl ||
          ((y.$slideEl = g.clickedSlide
            ? L(g.clickedSlide)
            : g.slides.eq(g.activeIndex)),
          (y.$imageEl = y.$slideEl.find("img, svg, canvas")),
          (y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass))),
        y.$imageEl && 0 !== y.$imageEl.length) &&
          (y.$slideEl.addClass("" + w.zoomedSlideClass),
          void 0 === x.touchesStart.x && e
            ? ((t =
                "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX),
              (a = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY))
            : ((t = x.touchesStart.x), (a = x.touchesStart.y)),
          (b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio),
          (b.currentScale =
            y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio),
          e
            ? ((f = y.$slideEl[0].offsetWidth),
              (m = y.$slideEl[0].offsetHeight),
              (i = y.$slideEl.offset().left + f / 2 - t),
              (s = y.$slideEl.offset().top + m / 2 - a),
              (o = y.$imageEl[0].offsetWidth),
              (l = y.$imageEl[0].offsetHeight),
              (d = o * b.scale),
              (p = l * b.scale),
              (h = -(c = Math.min(f / 2 - d / 2, 0))),
              (v = -(u = Math.min(m / 2 - p / 2, 0))),
              (r = i * b.scale) < c && (r = c),
              h < r && (r = h),
              (n = s * b.scale) < u && (n = u),
              v < n && (n = v))
            : (n = r = 0),
          y.$imageWrapEl
            .transition(300)
            .transform("translate3d(" + r + "px, " + n + "px,0)"),
          y.$imageEl
            .transition(300)
            .transform("translate3d(0,0,0) scale(" + b.scale + ")"));
      },
      out: function () {
        var e = this,
          t = e.zoom,
          a = e.params.zoom,
          i = t.gesture;
        i.$slideEl ||
          ((i.$slideEl = e.clickedSlide
            ? L(e.clickedSlide)
            : e.slides.eq(e.activeIndex)),
          (i.$imageEl = i.$slideEl.find("img, svg, canvas")),
          (i.$imageWrapEl = i.$imageEl.parent("." + a.containerClass))),
          i.$imageEl &&
            0 !== i.$imageEl.length &&
            ((t.scale = 1),
            (t.currentScale = 1),
            i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            i.$slideEl.removeClass("" + a.zoomedSlideClass),
            (i.$slideEl = void 0));
      },
      enable: function () {
        var e = this,
          t = e.zoom;
        if (!t.enabled) {
          t.enabled = !0;
          var a = !(
            "touchstart" !== e.touchEvents.start ||
            !F.passiveListener ||
            !e.params.passiveListeners
          ) && { passive: !0, capture: !1 };
          F.gestures
            ? (e.$wrapperEl.on(
                "gesturestart",
                ".swiper-slide",
                t.onGestureStart,
                a
              ),
              e.$wrapperEl.on(
                "gesturechange",
                ".swiper-slide",
                t.onGestureChange,
                a
              ),
              e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, a))
            : "touchstart" === e.touchEvents.start &&
              (e.$wrapperEl.on(
                e.touchEvents.start,
                ".swiper-slide",
                t.onGestureStart,
                a
              ),
              e.$wrapperEl.on(
                e.touchEvents.move,
                ".swiper-slide",
                t.onGestureChange,
                a
              ),
              e.$wrapperEl.on(
                e.touchEvents.end,
                ".swiper-slide",
                t.onGestureEnd,
                a
              )),
            e.$wrapperEl.on(
              e.touchEvents.move,
              "." + e.params.zoom.containerClass,
              t.onTouchMove
            );
        }
      },
      disable: function () {
        var e = this,
          t = e.zoom;
        if (t.enabled) {
          e.zoom.enabled = !1;
          var a = !(
            "touchstart" !== e.touchEvents.start ||
            !F.passiveListener ||
            !e.params.passiveListeners
          ) && { passive: !0, capture: !1 };
          F.gestures
            ? (e.$wrapperEl.off(
                "gesturestart",
                ".swiper-slide",
                t.onGestureStart,
                a
              ),
              e.$wrapperEl.off(
                "gesturechange",
                ".swiper-slide",
                t.onGestureChange,
                a
              ),
              e.$wrapperEl.off(
                "gestureend",
                ".swiper-slide",
                t.onGestureEnd,
                a
              ))
            : "touchstart" === e.touchEvents.start &&
              (e.$wrapperEl.off(
                e.touchEvents.start,
                ".swiper-slide",
                t.onGestureStart,
                a
              ),
              e.$wrapperEl.off(
                e.touchEvents.move,
                ".swiper-slide",
                t.onGestureChange,
                a
              ),
              e.$wrapperEl.off(
                e.touchEvents.end,
                ".swiper-slide",
                t.onGestureEnd,
                a
              )),
            e.$wrapperEl.off(
              e.touchEvents.move,
              "." + e.params.zoom.containerClass,
              t.onTouchMove
            );
        }
      },
    },
    W = {
      loadInSlide: function (e, l) {
        void 0 === l && (l = !0);
        var d = this,
          p = d.params.lazy;
        if (void 0 !== e && 0 !== d.slides.length) {
          var c =
              d.virtual && d.params.virtual.enabled
                ? d.$wrapperEl.children(
                    "." +
                      d.params.slideClass +
                      '[data-swiper-slide-index="' +
                      e +
                      '"]'
                  )
                : d.slides.eq(e),
            t = c.find(
              "." +
                p.elementClass +
                ":not(." +
                p.loadedClass +
                "):not(." +
                p.loadingClass +
                ")"
            );
          !c.hasClass(p.elementClass) ||
            c.hasClass(p.loadedClass) ||
            c.hasClass(p.loadingClass) ||
            (t = t.add(c[0])),
            0 !== t.length &&
              t.each(function (e, t) {
                var i = L(t);
                i.addClass(p.loadingClass);
                var s = i.attr("data-background"),
                  r = i.attr("data-src"),
                  n = i.attr("data-srcset"),
                  o = i.attr("data-sizes");
                d.loadImage(i[0], r || s, n, o, !1, function () {
                  if (null != d && d && (!d || d.params) && !d.destroyed) {
                    if (
                      (s
                        ? (i.css("background-image", 'url("' + s + '")'),
                          i.removeAttr("data-background"))
                        : (n &&
                            (i.attr("srcset", n), i.removeAttr("data-srcset")),
                          o && (i.attr("sizes", o), i.removeAttr("data-sizes")),
                          r && (i.attr("src", r), i.removeAttr("data-src"))),
                      i.addClass(p.loadedClass).removeClass(p.loadingClass),
                      c.find("." + p.preloaderClass).remove(),
                      d.params.loop && l)
                    ) {
                      var e = c.attr("data-swiper-slide-index");
                      if (c.hasClass(d.params.slideDuplicateClass)) {
                        var t = d.$wrapperEl.children(
                          '[data-swiper-slide-index="' +
                            e +
                            '"]:not(.' +
                            d.params.slideDuplicateClass +
                            ")"
                        );
                        d.lazy.loadInSlide(t.index(), !1);
                      } else {
                        var a = d.$wrapperEl.children(
                          "." +
                            d.params.slideDuplicateClass +
                            '[data-swiper-slide-index="' +
                            e +
                            '"]'
                        );
                        d.lazy.loadInSlide(a.index(), !1);
                      }
                    }
                    d.emit("lazyImageReady", c[0], i[0]);
                  }
                }),
                  d.emit("lazyImageLoad", c[0], i[0]);
              });
        }
      },
      load: function () {
        var i = this,
          t = i.$wrapperEl,
          a = i.params,
          s = i.slides,
          e = i.activeIndex,
          r = i.virtual && a.virtual.enabled,
          n = a.lazy,
          o = a.slidesPerView;
        function l(e) {
          if (r) {
            if (
              t.children(
                "." + a.slideClass + '[data-swiper-slide-index="' + e + '"]'
              ).length
            )
              return !0;
          } else if (s[e]) return !0;
          return !1;
        }
        function d(e) {
          return r ? L(e).attr("data-swiper-slide-index") : L(e).index();
        }
        if (
          ("auto" === o && (o = 0),
          i.lazy.initialImageLoaded || (i.lazy.initialImageLoaded = !0),
          i.params.watchSlidesVisibility)
        )
          t.children("." + a.slideVisibleClass).each(function (e, t) {
            var a = r ? L(t).attr("data-swiper-slide-index") : L(t).index();
            i.lazy.loadInSlide(a);
          });
        else if (1 < o)
          for (var p = e; p < e + o; p += 1) l(p) && i.lazy.loadInSlide(p);
        else i.lazy.loadInSlide(e);
        if (n.loadPrevNext)
          if (1 < o || (n.loadPrevNextAmount && 1 < n.loadPrevNextAmount)) {
            for (
              var c = n.loadPrevNextAmount,
                u = o,
                h = Math.min(e + u + Math.max(c, u), s.length),
                v = Math.max(e - Math.max(u, c), 0),
                f = e + o;
              f < h;
              f += 1
            )
              l(f) && i.lazy.loadInSlide(f);
            for (var m = v; m < e; m += 1) l(m) && i.lazy.loadInSlide(m);
          } else {
            var g = t.children("." + a.slideNextClass);
            0 < g.length && i.lazy.loadInSlide(d(g));
            var b = t.children("." + a.slidePrevClass);
            0 < b.length && i.lazy.loadInSlide(d(b));
          }
      },
    },
    j = {
      LinearSpline: function (e, t) {
        var a,
          i,
          s,
          r,
          n,
          o = function (e, t) {
            for (i = -1, a = e.length; 1 < a - i; )
              e[(s = (a + i) >> 1)] <= t ? (i = s) : (a = s);
            return a;
          };
        return (
          (this.x = e),
          (this.y = t),
          (this.lastIndex = e.length - 1),
          (this.interpolate = function (e) {
            return e
              ? ((n = o(this.x, e)),
                (r = n - 1),
                ((e - this.x[r]) * (this.y[n] - this.y[r])) /
                  (this.x[n] - this.x[r]) +
                  this.y[r])
              : 0;
          }),
          this
        );
      },
      getInterpolateFunction: function (e) {
        var t = this;
        t.controller.spline ||
          (t.controller.spline = t.params.loop
            ? new j.LinearSpline(t.slidesGrid, e.slidesGrid)
            : new j.LinearSpline(t.snapGrid, e.snapGrid));
      },
      setTranslate: function (e, t) {
        var a,
          i,
          s = this,
          r = s.controller.control;
        function n(e) {
          var t = s.rtlTranslate ? -s.translate : s.translate;
          "slide" === s.params.controller.by &&
            (s.controller.getInterpolateFunction(e),
            (i = -s.controller.spline.interpolate(-t))),
            (i && "container" !== s.params.controller.by) ||
              ((a =
                (e.maxTranslate() - e.minTranslate()) /
                (s.maxTranslate() - s.minTranslate())),
              (i = (t - s.minTranslate()) * a + e.minTranslate())),
            s.params.controller.inverse && (i = e.maxTranslate() - i),
            e.updateProgress(i),
            e.setTranslate(i, s),
            e.updateActiveIndex(),
            e.updateSlidesClasses();
        }
        if (Array.isArray(r))
          for (var o = 0; o < r.length; o += 1)
            r[o] !== t && r[o] instanceof S && n(r[o]);
        else r instanceof S && t !== r && n(r);
      },
      setTransition: function (t, e) {
        var a,
          i = this,
          s = i.controller.control;
        function r(e) {
          e.setTransition(t, i),
            0 !== t &&
              (e.transitionStart(),
              e.params.autoHeight &&
                V.nextTick(function () {
                  e.updateAutoHeight();
                }),
              e.$wrapperEl.transitionEnd(function () {
                s &&
                  (e.params.loop &&
                    "slide" === i.params.controller.by &&
                    e.loopFix(),
                  e.transitionEnd());
              }));
        }
        if (Array.isArray(s))
          for (a = 0; a < s.length; a += 1)
            s[a] !== e && s[a] instanceof S && r(s[a]);
        else s instanceof S && e !== s && r(s);
      },
    },
    U = {
      makeElFocusable: function (e) {
        return e.attr("tabIndex", "0"), e;
      },
      addElRole: function (e, t) {
        return e.attr("role", t), e;
      },
      addElLabel: function (e, t) {
        return e.attr("aria-label", t), e;
      },
      disableEl: function (e) {
        return e.attr("aria-disabled", !0), e;
      },
      enableEl: function (e) {
        return e.attr("aria-disabled", !1), e;
      },
      onEnterKey: function (e) {
        var t = this,
          a = t.params.a11y;
        if (13 === e.keyCode) {
          var i = L(e.target);
          t.navigation &&
            t.navigation.$nextEl &&
            i.is(t.navigation.$nextEl) &&
            ((t.isEnd && !t.params.loop) || t.slideNext(),
            t.isEnd
              ? t.a11y.notify(a.lastSlideMessage)
              : t.a11y.notify(a.nextSlideMessage)),
            t.navigation &&
              t.navigation.$prevEl &&
              i.is(t.navigation.$prevEl) &&
              ((t.isBeginning && !t.params.loop) || t.slidePrev(),
              t.isBeginning
                ? t.a11y.notify(a.firstSlideMessage)
                : t.a11y.notify(a.prevSlideMessage)),
            t.pagination &&
              i.is("." + t.params.pagination.bulletClass) &&
              i[0].click();
        }
      },
      notify: function (e) {
        var t = this.a11y.liveRegion;
        0 !== t.length && (t.html(""), t.html(e));
      },
      updateNavigation: function () {
        var e = this;
        if (!e.params.loop) {
          var t = e.navigation,
            a = t.$nextEl,
            i = t.$prevEl;
          i &&
            0 < i.length &&
            (e.isBeginning ? e.a11y.disableEl(i) : e.a11y.enableEl(i)),
            a &&
              0 < a.length &&
              (e.isEnd ? e.a11y.disableEl(a) : e.a11y.enableEl(a));
        }
      },
      updatePagination: function () {
        var i = this,
          s = i.params.a11y;
        i.pagination &&
          i.params.pagination.clickable &&
          i.pagination.bullets &&
          i.pagination.bullets.length &&
          i.pagination.bullets.each(function (e, t) {
            var a = L(t);
            i.a11y.makeElFocusable(a),
              i.a11y.addElRole(a, "button"),
              i.a11y.addElLabel(
                a,
                s.paginationBulletMessage.replace(/{{index}}/, a.index() + 1)
              );
          });
      },
      init: function () {
        var e = this;
        e.$el.append(e.a11y.liveRegion);
        var t,
          a,
          i = e.params.a11y;
        e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl),
          e.navigation && e.navigation.$prevEl && (a = e.navigation.$prevEl),
          t &&
            (e.a11y.makeElFocusable(t),
            e.a11y.addElRole(t, "button"),
            e.a11y.addElLabel(t, i.nextSlideMessage),
            t.on("keydown", e.a11y.onEnterKey)),
          a &&
            (e.a11y.makeElFocusable(a),
            e.a11y.addElRole(a, "button"),
            e.a11y.addElLabel(a, i.prevSlideMessage),
            a.on("keydown", e.a11y.onEnterKey)),
          e.pagination &&
            e.params.pagination.clickable &&
            e.pagination.bullets &&
            e.pagination.bullets.length &&
            e.pagination.$el.on(
              "keydown",
              "." + e.params.pagination.bulletClass,
              e.a11y.onEnterKey
            );
      },
      destroy: function () {
        var e,
          t,
          a = this;
        a.a11y.liveRegion &&
          0 < a.a11y.liveRegion.length &&
          a.a11y.liveRegion.remove(),
          a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl),
          a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl),
          e && e.off("keydown", a.a11y.onEnterKey),
          t && t.off("keydown", a.a11y.onEnterKey),
          a.pagination &&
            a.params.pagination.clickable &&
            a.pagination.bullets &&
            a.pagination.bullets.length &&
            a.pagination.$el.off(
              "keydown",
              "." + a.params.pagination.bulletClass,
              a.a11y.onEnterKey
            );
      },
    },
    K = {
      init: function () {
        var e = this;
        if (e.params.history) {
          if (!Y.history || !Y.history.pushState)
            return (
              (e.params.history.enabled = !1),
              void (e.params.hashNavigation.enabled = !0)
            );
          var t = e.history;
          (t.initialized = !0),
            (t.paths = K.getPathValues()),
            (t.paths.key || t.paths.value) &&
              (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit),
              e.params.history.replaceState ||
                Y.addEventListener("popstate", e.history.setHistoryPopState));
        }
      },
      destroy: function () {
        this.params.history.replaceState ||
          Y.removeEventListener("popstate", this.history.setHistoryPopState);
      },
      setHistoryPopState: function () {
        (this.history.paths = K.getPathValues()),
          this.history.scrollToSlide(
            this.params.speed,
            this.history.paths.value,
            !1
          );
      },
      getPathValues: function () {
        var e = Y.location.pathname
            .slice(1)
            .split("/")
            .filter(function (e) {
              return "" !== e;
            }),
          t = e.length;
        return { key: e[t - 2], value: e[t - 1] };
      },
      setHistory: function (e, t) {
        if (this.history.initialized && this.params.history.enabled) {
          var a = this.slides.eq(t),
            i = K.slugify(a.attr("data-history"));
          Y.location.pathname.includes(e) || (i = e + "/" + i);
          var s = Y.history.state;
          (s && s.value === i) ||
            (this.params.history.replaceState
              ? Y.history.replaceState({ value: i }, null, i)
              : Y.history.pushState({ value: i }, null, i));
        }
      },
      slugify: function (e) {
        return e
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
          .replace(/--+/g, "-")
          .replace(/^-+/, "")
          .replace(/-+$/, "");
      },
      scrollToSlide: function (e, t, a) {
        var i = this;
        if (t)
          for (var s = 0, r = i.slides.length; s < r; s += 1) {
            var n = i.slides.eq(s);
            if (
              K.slugify(n.attr("data-history")) === t &&
              !n.hasClass(i.params.slideDuplicateClass)
            ) {
              var o = n.index();
              i.slideTo(o, e, a);
            }
          }
        else i.slideTo(0, e, a);
      },
    },
    _ = {
      onHashCange: function () {
        var e = this,
          t = f.location.hash.replace("#", "");
        if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
          var a = e.$wrapperEl
            .children("." + e.params.slideClass + '[data-hash="' + t + '"]')
            .index();
          if (void 0 === a) return;
          e.slideTo(a);
        }
      },
      setHash: function () {
        var e = this;
        if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
          if (
            e.params.hashNavigation.replaceState &&
            Y.history &&
            Y.history.replaceState
          )
            Y.history.replaceState(
              null,
              null,
              "#" + e.slides.eq(e.activeIndex).attr("data-hash") || ""
            );
          else {
            var t = e.slides.eq(e.activeIndex),
              a = t.attr("data-hash") || t.attr("data-history");
            f.location.hash = a || "";
          }
      },
      init: function () {
        var e = this;
        if (
          !(
            !e.params.hashNavigation.enabled ||
            (e.params.history && e.params.history.enabled)
          )
        ) {
          e.hashNavigation.initialized = !0;
          var t = f.location.hash.replace("#", "");
          if (t)
            for (var a = 0, i = e.slides.length; a < i; a += 1) {
              var s = e.slides.eq(a);
              if (
                (s.attr("data-hash") || s.attr("data-history")) === t &&
                !s.hasClass(e.params.slideDuplicateClass)
              ) {
                var r = s.index();
                e.slideTo(r, 0, e.params.runCallbacksOnInit, !0);
              }
            }
          e.params.hashNavigation.watchState &&
            L(Y).on("hashchange", e.hashNavigation.onHashCange);
        }
      },
      destroy: function () {
        this.params.hashNavigation.watchState &&
          L(Y).off("hashchange", this.hashNavigation.onHashCange);
      },
    },
    Z = {
      run: function () {
        var e = this,
          t = e.slides.eq(e.activeIndex),
          a = e.params.autoplay.delay;
        t.attr("data-swiper-autoplay") &&
          (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
          (e.autoplay.timeout = V.nextTick(function () {
            e.params.autoplay.reverseDirection
              ? e.params.loop
                ? (e.loopFix(),
                  e.slidePrev(e.params.speed, !0, !0),
                  e.emit("autoplay"))
                : e.isBeginning
                ? e.params.autoplay.stopOnLastSlide
                  ? e.autoplay.stop()
                  : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
                    e.emit("autoplay"))
                : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay"))
              : e.params.loop
              ? (e.loopFix(),
                e.slideNext(e.params.speed, !0, !0),
                e.emit("autoplay"))
              : e.isEnd
              ? e.params.autoplay.stopOnLastSlide
                ? e.autoplay.stop()
                : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay"))
              : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"));
          }, a));
      },
      start: function () {
        var e = this;
        return (
          void 0 === e.autoplay.timeout &&
          !e.autoplay.running &&
          ((e.autoplay.running = !0),
          e.emit("autoplayStart"),
          e.autoplay.run(),
          !0)
        );
      },
      stop: function () {
        var e = this;
        return (
          !!e.autoplay.running &&
          void 0 !== e.autoplay.timeout &&
          (e.autoplay.timeout &&
            (clearTimeout(e.autoplay.timeout), (e.autoplay.timeout = void 0)),
          (e.autoplay.running = !1),
          e.emit("autoplayStop"),
          !0)
        );
      },
      pause: function (e) {
        var t = this;
        t.autoplay.running &&
          (t.autoplay.paused ||
            (t.autoplay.timeout && clearTimeout(t.autoplay.timeout),
            (t.autoplay.paused = !0),
            0 !== e && t.params.autoplay.waitForTransition
              ? (t.$wrapperEl[0].addEventListener(
                  "transitionend",
                  t.autoplay.onTransitionEnd
                ),
                t.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  t.autoplay.onTransitionEnd
                ))
              : ((t.autoplay.paused = !1), t.autoplay.run())));
      },
    },
    Q = {
      setTranslate: function () {
        for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
          var i = e.slides.eq(a),
            s = -i[0].swiperSlideOffset;
          e.params.virtualTranslate || (s -= e.translate);
          var r = 0;
          e.isHorizontal() || ((r = s), (s = 0));
          var n = e.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs(i[0].progress), 0)
            : 1 + Math.min(Math.max(i[0].progress, -1), 0);
          i.css({ opacity: n }).transform(
            "translate3d(" + s + "px, " + r + "px, 0px)"
          );
        }
      },
      setTransition: function (e) {
        var a = this,
          t = a.slides,
          i = a.$wrapperEl;
        if ((t.transition(e), a.params.virtualTranslate && 0 !== e)) {
          var s = !1;
          t.transitionEnd(function () {
            if (!s && a && !a.destroyed) {
              (s = !0), (a.animating = !1);
              for (
                var e = ["webkitTransitionEnd", "transitionend"], t = 0;
                t < e.length;
                t += 1
              )
                i.trigger(e[t]);
            }
          });
        }
      },
    },
    J = {
      setTranslate: function () {
        var e,
          t = this,
          a = t.$el,
          i = t.$wrapperEl,
          s = t.slides,
          r = t.width,
          n = t.height,
          o = t.rtlTranslate,
          l = t.size,
          d = t.params.cubeEffect,
          p = t.isHorizontal(),
          c = t.virtual && t.params.virtual.enabled,
          u = 0;
        d.shadow &&
          (p
            ? (0 === (e = i.find(".swiper-cube-shadow")).length &&
                ((e = L('<div class="swiper-cube-shadow"></div>')),
                i.append(e)),
              e.css({ height: r + "px" }))
            : 0 === (e = a.find(".swiper-cube-shadow")).length &&
              ((e = L('<div class="swiper-cube-shadow"></div>')), a.append(e)));
        for (var h = 0; h < s.length; h += 1) {
          var v = s.eq(h),
            f = h;
          c && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
          var m = 90 * f,
            g = Math.floor(m / 360);
          o && ((m = -m), (g = Math.floor(-m / 360)));
          var b = Math.max(Math.min(v[0].progress, 1), -1),
            w = 0,
            y = 0,
            x = 0;
          f % 4 == 0
            ? ((w = 4 * -g * l), (x = 0))
            : (f - 1) % 4 == 0
            ? ((w = 0), (x = 4 * -g * l))
            : (f - 2) % 4 == 0
            ? ((w = l + 4 * g * l), (x = l))
            : (f - 3) % 4 == 0 && ((w = -l), (x = 3 * l + 4 * l * g)),
            o && (w = -w),
            p || ((y = w), (w = 0));
          var T =
            "rotateX(" +
            (p ? 0 : -m) +
            "deg) rotateY(" +
            (p ? m : 0) +
            "deg) translate3d(" +
            w +
            "px, " +
            y +
            "px, " +
            x +
            "px)";
          if (
            (b <= 1 &&
              -1 < b &&
              ((u = 90 * f + 90 * b), o && (u = 90 * -f - 90 * b)),
            v.transform(T),
            d.slideShadows)
          ) {
            var E = p
                ? v.find(".swiper-slide-shadow-left")
                : v.find(".swiper-slide-shadow-top"),
              S = p
                ? v.find(".swiper-slide-shadow-right")
                : v.find(".swiper-slide-shadow-bottom");
            0 === E.length &&
              ((E = L(
                '<div class="swiper-slide-shadow-' +
                  (p ? "left" : "top") +
                  '"></div>'
              )),
              v.append(E)),
              0 === S.length &&
                ((S = L(
                  '<div class="swiper-slide-shadow-' +
                    (p ? "right" : "bottom") +
                    '"></div>'
                )),
                v.append(S)),
              E.length && (E[0].style.opacity = Math.max(-b, 0)),
              S.length && (S[0].style.opacity = Math.max(b, 0));
          }
        }
        if (
          (i.css({
            "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
            "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
            "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
            "transform-origin": "50% 50% -" + l / 2 + "px",
          }),
          d.shadow)
        )
          if (p)
            e.transform(
              "translate3d(0px, " +
                (r / 2 + d.shadowOffset) +
                "px, " +
                -r / 2 +
                "px) rotateX(90deg) rotateZ(0deg) scale(" +
                d.shadowScale +
                ")"
            );
          else {
            var C = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90),
              M =
                1.5 -
                (Math.sin((2 * C * Math.PI) / 360) / 2 +
                  Math.cos((2 * C * Math.PI) / 360) / 2),
              k = d.shadowScale,
              P = d.shadowScale / M,
              z = d.shadowOffset;
            e.transform(
              "scale3d(" +
                k +
                ", 1, " +
                P +
                ") translate3d(0px, " +
                (n / 2 + z) +
                "px, " +
                -n / 2 / P +
                "px) rotateX(-90deg)"
            );
          }
        var $ = I.isSafari || I.isUiWebView ? -l / 2 : 0;
        i.transform(
          "translate3d(0px,0," +
            $ +
            "px) rotateX(" +
            (t.isHorizontal() ? 0 : u) +
            "deg) rotateY(" +
            (t.isHorizontal() ? -u : 0) +
            "deg)"
        );
      },
      setTransition: function (e) {
        var t = this.$el;
        this.slides
          .transition(e)
          .find(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          )
          .transition(e),
          this.params.cubeEffect.shadow &&
            !this.isHorizontal() &&
            t.find(".swiper-cube-shadow").transition(e);
      },
    },
    ee = {
      setTranslate: function () {
        for (
          var e = this, t = e.slides, a = e.rtlTranslate, i = 0;
          i < t.length;
          i += 1
        ) {
          var s = t.eq(i),
            r = s[0].progress;
          e.params.flipEffect.limitRotation &&
            (r = Math.max(Math.min(s[0].progress, 1), -1));
          var n = -180 * r,
            o = 0,
            l = -s[0].swiperSlideOffset,
            d = 0;
          if (
            (e.isHorizontal()
              ? a && (n = -n)
              : ((d = l), (o = -n), (n = l = 0)),
            (s[0].style.zIndex = -Math.abs(Math.round(r)) + t.length),
            e.params.flipEffect.slideShadows)
          ) {
            var p = e.isHorizontal()
                ? s.find(".swiper-slide-shadow-left")
                : s.find(".swiper-slide-shadow-top"),
              c = e.isHorizontal()
                ? s.find(".swiper-slide-shadow-right")
                : s.find(".swiper-slide-shadow-bottom");
            0 === p.length &&
              ((p = L(
                '<div class="swiper-slide-shadow-' +
                  (e.isHorizontal() ? "left" : "top") +
                  '"></div>'
              )),
              s.append(p)),
              0 === c.length &&
                ((c = L(
                  '<div class="swiper-slide-shadow-' +
                    (e.isHorizontal() ? "right" : "bottom") +
                    '"></div>'
                )),
                s.append(c)),
              p.length && (p[0].style.opacity = Math.max(-r, 0)),
              c.length && (c[0].style.opacity = Math.max(r, 0));
          }
          s.transform(
            "translate3d(" +
              l +
              "px, " +
              d +
              "px, 0px) rotateX(" +
              o +
              "deg) rotateY(" +
              n +
              "deg)"
          );
        }
      },
      setTransition: function (e) {
        var a = this,
          t = a.slides,
          i = a.activeIndex,
          s = a.$wrapperEl;
        if (
          (t
            .transition(e)
            .find(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .transition(e),
          a.params.virtualTranslate && 0 !== e)
        ) {
          var r = !1;
          t.eq(i).transitionEnd(function () {
            if (!r && a && !a.destroyed) {
              (r = !0), (a.animating = !1);
              for (
                var e = ["webkitTransitionEnd", "transitionend"], t = 0;
                t < e.length;
                t += 1
              )
                s.trigger(e[t]);
            }
          });
        }
      },
    },
    te = {
      setTranslate: function () {
        for (
          var e = this,
            t = e.width,
            a = e.height,
            i = e.slides,
            s = e.$wrapperEl,
            r = e.slidesSizesGrid,
            n = e.params.coverflowEffect,
            o = e.isHorizontal(),
            l = e.translate,
            d = o ? t / 2 - l : a / 2 - l,
            p = o ? n.rotate : -n.rotate,
            c = n.depth,
            u = 0,
            h = i.length;
          u < h;
          u += 1
        ) {
          var v = i.eq(u),
            f = r[u],
            m = ((d - v[0].swiperSlideOffset - f / 2) / f) * n.modifier,
            g = o ? p * m : 0,
            b = o ? 0 : p * m,
            w = -c * Math.abs(m),
            y = o ? 0 : n.stretch * m,
            x = o ? n.stretch * m : 0;
          Math.abs(x) < 0.001 && (x = 0),
            Math.abs(y) < 0.001 && (y = 0),
            Math.abs(w) < 0.001 && (w = 0),
            Math.abs(g) < 0.001 && (g = 0),
            Math.abs(b) < 0.001 && (b = 0);
          var T =
            "translate3d(" +
            x +
            "px," +
            y +
            "px," +
            w +
            "px)  rotateX(" +
            b +
            "deg) rotateY(" +
            g +
            "deg)";
          if (
            (v.transform(T),
            (v[0].style.zIndex = 1 - Math.abs(Math.round(m))),
            n.slideShadows)
          ) {
            var E = o
                ? v.find(".swiper-slide-shadow-left")
                : v.find(".swiper-slide-shadow-top"),
              S = o
                ? v.find(".swiper-slide-shadow-right")
                : v.find(".swiper-slide-shadow-bottom");
            0 === E.length &&
              ((E = L(
                '<div class="swiper-slide-shadow-' +
                  (o ? "left" : "top") +
                  '"></div>'
              )),
              v.append(E)),
              0 === S.length &&
                ((S = L(
                  '<div class="swiper-slide-shadow-' +
                    (o ? "right" : "bottom") +
                    '"></div>'
                )),
                v.append(S)),
              E.length && (E[0].style.opacity = 0 < m ? m : 0),
              S.length && (S[0].style.opacity = 0 < -m ? -m : 0);
          }
        }
        (F.pointerEvents || F.prefixedPointerEvents) &&
          (s[0].style.perspectiveOrigin = d + "px 50%");
      },
      setTransition: function (e) {
        this.slides
          .transition(e)
          .find(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          )
          .transition(e);
      },
    },
    ae = {
      init: function () {
        var e = this,
          t = e.params.thumbs,
          a = e.constructor;
        t.swiper instanceof a
          ? ((e.thumbs.swiper = t.swiper),
            V.extend(e.thumbs.swiper.originalParams, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            V.extend(e.thumbs.swiper.params, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }))
          : V.isObject(t.swiper) &&
            ((e.thumbs.swiper = new a(
              V.extend({}, t.swiper, {
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0,
                slideToClickedSlide: !1,
              })
            )),
            (e.thumbs.swiperCreated = !0)),
          e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
          e.thumbs.swiper.on("tap", e.thumbs.onThumbClick);
      },
      onThumbClick: function () {
        var e = this,
          t = e.thumbs.swiper;
        if (t) {
          var a = t.clickedIndex,
            i = t.clickedSlide;
          if (
            !(
              (i && L(i).hasClass(e.params.thumbs.slideThumbActiveClass)) ||
              null == a
            )
          ) {
            var s;
            if (
              ((s = t.params.loop
                ? parseInt(
                    L(t.clickedSlide).attr("data-swiper-slide-index"),
                    10
                  )
                : a),
              e.params.loop)
            ) {
              var r = e.activeIndex;
              e.slides.eq(r).hasClass(e.params.slideDuplicateClass) &&
                (e.loopFix(),
                (e._clientLeft = e.$wrapperEl[0].clientLeft),
                (r = e.activeIndex));
              var n = e.slides
                  .eq(r)
                  .prevAll('[data-swiper-slide-index="' + s + '"]')
                  .eq(0)
                  .index(),
                o = e.slides
                  .eq(r)
                  .nextAll('[data-swiper-slide-index="' + s + '"]')
                  .eq(0)
                  .index();
              s = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n;
            }
            e.slideTo(s);
          }
        }
      },
      update: function (e) {
        var t = this,
          a = t.thumbs.swiper;
        if (a) {
          var i =
            "auto" === a.params.slidesPerView
              ? a.slidesPerViewDynamic()
              : a.params.slidesPerView;
          if (t.realIndex !== a.realIndex) {
            var s,
              r = a.activeIndex;
            if (a.params.loop) {
              a.slides.eq(r).hasClass(a.params.slideDuplicateClass) &&
                (a.loopFix(),
                (a._clientLeft = a.$wrapperEl[0].clientLeft),
                (r = a.activeIndex));
              var n = a.slides
                  .eq(r)
                  .prevAll('[data-swiper-slide-index="' + t.realIndex + '"]')
                  .eq(0)
                  .index(),
                o = a.slides
                  .eq(r)
                  .nextAll('[data-swiper-slide-index="' + t.realIndex + '"]')
                  .eq(0)
                  .index();
              s =
                void 0 === n
                  ? o
                  : void 0 === o
                  ? n
                  : o - r == r - n
                  ? r
                  : o - r < r - n
                  ? o
                  : n;
            } else s = t.realIndex;
            a.visibleSlidesIndexes.indexOf(s) < 0 &&
              (a.params.centeredSlides
                ? (s =
                    r < s
                      ? s - Math.floor(i / 2) + 1
                      : s + Math.floor(i / 2) - 1)
                : r < s && (s = s - i + 1),
              a.slideTo(s, e ? 0 : void 0));
          }
          var l = 1,
            d = t.params.thumbs.slideThumbActiveClass;
          if (
            (1 < t.params.slidesPerView &&
              !t.params.centeredSlides &&
              (l = t.params.slidesPerView),
            a.slides.removeClass(d),
            a.params.loop)
          )
            for (var p = 0; p < l; p += 1)
              a.$wrapperEl
                .children(
                  '[data-swiper-slide-index="' + (t.realIndex + p) + '"]'
                )
                .addClass(d);
          else
            for (var c = 0; c < l; c += 1)
              a.slides.eq(t.realIndex + c).addClass(d);
        }
      },
    },
    ie = [
      C,
      M,
      k,
      P,
      $,
      O,
      N,
      {
        name: "mousewheel",
        params: {
          mousewheel: {
            enabled: !1,
            releaseOnEdges: !1,
            invert: !1,
            forceToAxis: !1,
            sensitivity: 1,
            eventsTarged: "container",
          },
        },
        create: function () {
          var e = this;
          V.extend(e, {
            mousewheel: {
              enabled: !1,
              enable: H.enable.bind(e),
              disable: H.disable.bind(e),
              handle: H.handle.bind(e),
              handleMouseEnter: H.handleMouseEnter.bind(e),
              handleMouseLeave: H.handleMouseLeave.bind(e),
              lastScrollTime: V.now(),
            },
          });
        },
        on: {
          init: function () {
            this.params.mousewheel.enabled && this.mousewheel.enable();
          },
          destroy: function () {
            this.mousewheel.enabled && this.mousewheel.disable();
          },
        },
      },
      {
        name: "navigation",
        params: {
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
          },
        },
        create: function () {
          var e = this;
          V.extend(e, {
            navigation: {
              init: G.init.bind(e),
              update: G.update.bind(e),
              destroy: G.destroy.bind(e),
              onNextClick: G.onNextClick.bind(e),
              onPrevClick: G.onPrevClick.bind(e),
            },
          });
        },
        on: {
          init: function () {
            this.navigation.init(), this.navigation.update();
          },
          toEdge: function () {
            this.navigation.update();
          },
          fromEdge: function () {
            this.navigation.update();
          },
          destroy: function () {
            this.navigation.destroy();
          },
          click: function (e) {
            var t = this.navigation,
              a = t.$nextEl,
              i = t.$prevEl;
            !this.params.navigation.hideOnClick ||
              L(e.target).is(i) ||
              L(e.target).is(a) ||
              (a && a.toggleClass(this.params.navigation.hiddenClass),
              i && i.toggleClass(this.params.navigation.hiddenClass));
          },
        },
      },
      {
        name: "pagination",
        params: {
          pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: function (e) {
              return e;
            },
            formatFractionTotal: function (e) {
              return e;
            },
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            modifierClass: "swiper-pagination-",
            currentClass: "swiper-pagination-current",
            totalClass: "swiper-pagination-total",
            hiddenClass: "swiper-pagination-hidden",
            progressbarFillClass: "swiper-pagination-progressbar-fill",
            progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
            clickableClass: "swiper-pagination-clickable",
            lockClass: "swiper-pagination-lock",
          },
        },
        create: function () {
          var e = this;
          V.extend(e, {
            pagination: {
              init: B.init.bind(e),
              render: B.render.bind(e),
              update: B.update.bind(e),
              destroy: B.destroy.bind(e),
              dynamicBulletIndex: 0,
            },
          });
        },
        on: {
          init: function () {
            this.pagination.init(),
              this.pagination.render(),
              this.pagination.update();
          },
          activeIndexChange: function () {
            this.params.loop
              ? this.pagination.update()
              : void 0 === this.snapIndex && this.pagination.update();
          },
          snapIndexChange: function () {
            this.params.loop || this.pagination.update();
          },
          slidesLengthChange: function () {
            this.params.loop &&
              (this.pagination.render(), this.pagination.update());
          },
          snapGridLengthChange: function () {
            this.params.loop ||
              (this.pagination.render(), this.pagination.update());
          },
          destroy: function () {
            this.pagination.destroy();
          },
          click: function (e) {
            var t = this;
            t.params.pagination.el &&
              t.params.pagination.hideOnClick &&
              0 < t.pagination.$el.length &&
              !L(e.target).hasClass(t.params.pagination.bulletClass) &&
              t.pagination.$el.toggleClass(t.params.pagination.hiddenClass);
          },
        },
      },
      {
        name: "scrollbar",
        params: {
          scrollbar: {
            el: null,
            dragSize: "auto",
            hide: !1,
            draggable: !1,
            snapOnRelease: !0,
            lockClass: "swiper-scrollbar-lock",
            dragClass: "swiper-scrollbar-drag",
          },
        },
        create: function () {
          var e = this;
          V.extend(e, {
            scrollbar: {
              init: X.init.bind(e),
              destroy: X.destroy.bind(e),
              updateSize: X.updateSize.bind(e),
              setTranslate: X.setTranslate.bind(e),
              setTransition: X.setTransition.bind(e),
              enableDraggable: X.enableDraggable.bind(e),
              disableDraggable: X.disableDraggable.bind(e),
              setDragPosition: X.setDragPosition.bind(e),
              onDragStart: X.onDragStart.bind(e),
              onDragMove: X.onDragMove.bind(e),
              onDragEnd: X.onDragEnd.bind(e),
              isTouched: !1,
              timeout: null,
              dragTimeout: null,
            },
          });
        },
        on: {
          init: function () {
            this.scrollbar.init(),
              this.scrollbar.updateSize(),
              this.scrollbar.setTranslate();
          },
          update: function () {
            this.scrollbar.updateSize();
          },
          resize: function () {
            this.scrollbar.updateSize();
          },
          observerUpdate: function () {
            this.scrollbar.updateSize();
          },
          setTranslate: function () {
            this.scrollbar.setTranslate();
          },
          setTransition: function (e) {
            this.scrollbar.setTransition(e);
          },
          destroy: function () {
            this.scrollbar.destroy();
          },
        },
      },
      {
        name: "parallax",
        params: { parallax: { enabled: !1 } },
        create: function () {
          V.extend(this, {
            parallax: {
              setTransform: R.setTransform.bind(this),
              setTranslate: R.setTranslate.bind(this),
              setTransition: R.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            this.params.parallax.enabled &&
              ((this.params.watchSlidesProgress = !0),
              (this.originalParams.watchSlidesProgress = !0));
          },
          init: function () {
            this.params.parallax && this.parallax.setTranslate();
          },
          setTranslate: function () {
            this.params.parallax && this.parallax.setTranslate();
          },
          setTransition: function (e) {
            this.params.parallax && this.parallax.setTransition(e);
          },
        },
      },
      {
        name: "zoom",
        params: {
          zoom: {
            enabled: !1,
            maxRatio: 3,
            minRatio: 1,
            toggle: !0,
            containerClass: "swiper-zoom-container",
            zoomedSlideClass: "swiper-slide-zoomed",
          },
        },
        create: function () {
          var t = this,
            a = {
              enabled: !1,
              scale: 1,
              currentScale: 1,
              isScaling: !1,
              gesture: {
                $slideEl: void 0,
                slideWidth: void 0,
                slideHeight: void 0,
                $imageEl: void 0,
                $imageWrapEl: void 0,
                maxRatio: 3,
              },
              image: {
                isTouched: void 0,
                isMoved: void 0,
                currentX: void 0,
                currentY: void 0,
                minX: void 0,
                minY: void 0,
                maxX: void 0,
                maxY: void 0,
                width: void 0,
                height: void 0,
                startX: void 0,
                startY: void 0,
                touchesStart: {},
                touchesCurrent: {},
              },
              velocity: {
                x: void 0,
                y: void 0,
                prevPositionX: void 0,
                prevPositionY: void 0,
                prevTime: void 0,
              },
            };
          "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out"
            .split(" ")
            .forEach(function (e) {
              a[e] = q[e].bind(t);
            }),
            V.extend(t, { zoom: a });
        },
        on: {
          init: function () {
            this.params.zoom.enabled && this.zoom.enable();
          },
          destroy: function () {
            this.zoom.disable();
          },
          touchStart: function (e) {
            this.zoom.enabled && this.zoom.onTouchStart(e);
          },
          touchEnd: function (e) {
            this.zoom.enabled && this.zoom.onTouchEnd(e);
          },
          doubleTap: function (e) {
            this.params.zoom.enabled &&
              this.zoom.enabled &&
              this.params.zoom.toggle &&
              this.zoom.toggle(e);
          },
          transitionEnd: function () {
            this.zoom.enabled &&
              this.params.zoom.enabled &&
              this.zoom.onTransitionEnd();
          },
        },
      },
      {
        name: "lazy",
        params: {
          lazy: {
            enabled: !1,
            loadPrevNext: !1,
            loadPrevNextAmount: 1,
            loadOnTransitionStart: !1,
            elementClass: "swiper-lazy",
            loadingClass: "swiper-lazy-loading",
            loadedClass: "swiper-lazy-loaded",
            preloaderClass: "swiper-lazy-preloader",
          },
        },
        create: function () {
          V.extend(this, {
            lazy: {
              initialImageLoaded: !1,
              load: W.load.bind(this),
              loadInSlide: W.loadInSlide.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            this.params.lazy.enabled &&
              this.params.preloadImages &&
              (this.params.preloadImages = !1);
          },
          init: function () {
            this.params.lazy.enabled &&
              !this.params.loop &&
              0 === this.params.initialSlide &&
              this.lazy.load();
          },
          scroll: function () {
            this.params.freeMode &&
              !this.params.freeModeSticky &&
              this.lazy.load();
          },
          resize: function () {
            this.params.lazy.enabled && this.lazy.load();
          },
          scrollbarDragMove: function () {
            this.params.lazy.enabled && this.lazy.load();
          },
          transitionStart: function () {
            var e = this;
            e.params.lazy.enabled &&
              (e.params.lazy.loadOnTransitionStart ||
                (!e.params.lazy.loadOnTransitionStart &&
                  !e.lazy.initialImageLoaded)) &&
              e.lazy.load();
          },
          transitionEnd: function () {
            this.params.lazy.enabled &&
              !this.params.lazy.loadOnTransitionStart &&
              this.lazy.load();
          },
        },
      },
      {
        name: "controller",
        params: { controller: { control: void 0, inverse: !1, by: "slide" } },
        create: function () {
          var e = this;
          V.extend(e, {
            controller: {
              control: e.params.controller.control,
              getInterpolateFunction: j.getInterpolateFunction.bind(e),
              setTranslate: j.setTranslate.bind(e),
              setTransition: j.setTransition.bind(e),
            },
          });
        },
        on: {
          update: function () {
            this.controller.control &&
              this.controller.spline &&
              ((this.controller.spline = void 0),
              delete this.controller.spline);
          },
          resize: function () {
            this.controller.control &&
              this.controller.spline &&
              ((this.controller.spline = void 0),
              delete this.controller.spline);
          },
          observerUpdate: function () {
            this.controller.control &&
              this.controller.spline &&
              ((this.controller.spline = void 0),
              delete this.controller.spline);
          },
          setTranslate: function (e, t) {
            this.controller.control && this.controller.setTranslate(e, t);
          },
          setTransition: function (e, t) {
            this.controller.control && this.controller.setTransition(e, t);
          },
        },
      },
      {
        name: "a11y",
        params: {
          a11y: {
            enabled: !0,
            notificationClass: "swiper-notification",
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
          },
        },
        create: function () {
          var t = this;
          V.extend(t, {
            a11y: {
              liveRegion: L(
                '<span class="' +
                  t.params.a11y.notificationClass +
                  '" aria-live="assertive" aria-atomic="true"></span>'
              ),
            },
          }),
            Object.keys(U).forEach(function (e) {
              t.a11y[e] = U[e].bind(t);
            });
        },
        on: {
          init: function () {
            this.params.a11y.enabled &&
              (this.a11y.init(), this.a11y.updateNavigation());
          },
          toEdge: function () {
            this.params.a11y.enabled && this.a11y.updateNavigation();
          },
          fromEdge: function () {
            this.params.a11y.enabled && this.a11y.updateNavigation();
          },
          paginationUpdate: function () {
            this.params.a11y.enabled && this.a11y.updatePagination();
          },
          destroy: function () {
            this.params.a11y.enabled && this.a11y.destroy();
          },
        },
      },
      {
        name: "history",
        params: { history: { enabled: !1, replaceState: !1, key: "slides" } },
        create: function () {
          var e = this;
          V.extend(e, {
            history: {
              init: K.init.bind(e),
              setHistory: K.setHistory.bind(e),
              setHistoryPopState: K.setHistoryPopState.bind(e),
              scrollToSlide: K.scrollToSlide.bind(e),
              destroy: K.destroy.bind(e),
            },
          });
        },
        on: {
          init: function () {
            this.params.history.enabled && this.history.init();
          },
          destroy: function () {
            this.params.history.enabled && this.history.destroy();
          },
          transitionEnd: function () {
            this.history.initialized &&
              this.history.setHistory(
                this.params.history.key,
                this.activeIndex
              );
          },
        },
      },
      {
        name: "hash-navigation",
        params: {
          hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 },
        },
        create: function () {
          var e = this;
          V.extend(e, {
            hashNavigation: {
              initialized: !1,
              init: _.init.bind(e),
              destroy: _.destroy.bind(e),
              setHash: _.setHash.bind(e),
              onHashCange: _.onHashCange.bind(e),
            },
          });
        },
        on: {
          init: function () {
            this.params.hashNavigation.enabled && this.hashNavigation.init();
          },
          destroy: function () {
            this.params.hashNavigation.enabled && this.hashNavigation.destroy();
          },
          transitionEnd: function () {
            this.hashNavigation.initialized && this.hashNavigation.setHash();
          },
        },
      },
      {
        name: "autoplay",
        params: {
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
            reverseDirection: !1,
          },
        },
        create: function () {
          var t = this;
          V.extend(t, {
            autoplay: {
              running: !1,
              paused: !1,
              run: Z.run.bind(t),
              start: Z.start.bind(t),
              stop: Z.stop.bind(t),
              pause: Z.pause.bind(t),
              onTransitionEnd: function (e) {
                t &&
                  !t.destroyed &&
                  t.$wrapperEl &&
                  e.target === this &&
                  (t.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    t.autoplay.onTransitionEnd
                  ),
                  t.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    t.autoplay.onTransitionEnd
                  ),
                  (t.autoplay.paused = !1),
                  t.autoplay.running ? t.autoplay.run() : t.autoplay.stop());
              },
            },
          });
        },
        on: {
          init: function () {
            this.params.autoplay.enabled && this.autoplay.start();
          },
          beforeTransitionStart: function (e, t) {
            this.autoplay.running &&
              (t || !this.params.autoplay.disableOnInteraction
                ? this.autoplay.pause(e)
                : this.autoplay.stop());
          },
          sliderFirstMove: function () {
            this.autoplay.running &&
              (this.params.autoplay.disableOnInteraction
                ? this.autoplay.stop()
                : this.autoplay.pause());
          },
          destroy: function () {
            this.autoplay.running && this.autoplay.stop();
          },
        },
      },
      {
        name: "effect-fade",
        params: { fadeEffect: { crossFade: !1 } },
        create: function () {
          V.extend(this, {
            fadeEffect: {
              setTranslate: Q.setTranslate.bind(this),
              setTransition: Q.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this;
            if ("fade" === e.params.effect) {
              e.classNames.push(e.params.containerModifierClass + "fade");
              var t = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !0,
              };
              V.extend(e.params, t), V.extend(e.originalParams, t);
            }
          },
          setTranslate: function () {
            "fade" === this.params.effect && this.fadeEffect.setTranslate();
          },
          setTransition: function (e) {
            "fade" === this.params.effect && this.fadeEffect.setTransition(e);
          },
        },
      },
      {
        name: "effect-cube",
        params: {
          cubeEffect: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: 0.94,
          },
        },
        create: function () {
          V.extend(this, {
            cubeEffect: {
              setTranslate: J.setTranslate.bind(this),
              setTransition: J.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this;
            if ("cube" === e.params.effect) {
              e.classNames.push(e.params.containerModifierClass + "cube"),
                e.classNames.push(e.params.containerModifierClass + "3d");
              var t = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0,
              };
              V.extend(e.params, t), V.extend(e.originalParams, t);
            }
          },
          setTranslate: function () {
            "cube" === this.params.effect && this.cubeEffect.setTranslate();
          },
          setTransition: function (e) {
            "cube" === this.params.effect && this.cubeEffect.setTransition(e);
          },
        },
      },
      {
        name: "effect-flip",
        params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
        create: function () {
          V.extend(this, {
            flipEffect: {
              setTranslate: ee.setTranslate.bind(this),
              setTransition: ee.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this;
            if ("flip" === e.params.effect) {
              e.classNames.push(e.params.containerModifierClass + "flip"),
                e.classNames.push(e.params.containerModifierClass + "3d");
              var t = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !0,
              };
              V.extend(e.params, t), V.extend(e.originalParams, t);
            }
          },
          setTranslate: function () {
            "flip" === this.params.effect && this.flipEffect.setTranslate();
          },
          setTransition: function (e) {
            "flip" === this.params.effect && this.flipEffect.setTransition(e);
          },
        },
      },
      {
        name: "effect-coverflow",
        params: {
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: !0,
          },
        },
        create: function () {
          V.extend(this, {
            coverflowEffect: {
              setTranslate: te.setTranslate.bind(this),
              setTransition: te.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this;
            "coverflow" === e.params.effect &&
              (e.classNames.push(e.params.containerModifierClass + "coverflow"),
              e.classNames.push(e.params.containerModifierClass + "3d"),
              (e.params.watchSlidesProgress = !0),
              (e.originalParams.watchSlidesProgress = !0));
          },
          setTranslate: function () {
            "coverflow" === this.params.effect &&
              this.coverflowEffect.setTranslate();
          },
          setTransition: function (e) {
            "coverflow" === this.params.effect &&
              this.coverflowEffect.setTransition(e);
          },
        },
      },
      {
        name: "thumbs",
        params: {
          thumbs: {
            swiper: null,
            slideThumbActiveClass: "swiper-slide-thumb-active",
            thumbsContainerClass: "swiper-container-thumbs",
          },
        },
        create: function () {
          V.extend(this, {
            thumbs: {
              swiper: null,
              init: ae.init.bind(this),
              update: ae.update.bind(this),
              onThumbClick: ae.onThumbClick.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this.params.thumbs;
            e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0));
          },
          slideChange: function () {
            this.thumbs.swiper && this.thumbs.update();
          },
          update: function () {
            this.thumbs.swiper && this.thumbs.update();
          },
          resize: function () {
            this.thumbs.swiper && this.thumbs.update();
          },
          observerUpdate: function () {
            this.thumbs.swiper && this.thumbs.update();
          },
          setTransition: function (e) {
            var t = this.thumbs.swiper;
            t && t.setTransition(e);
          },
          beforeDestroy: function () {
            var e = this.thumbs.swiper;
            e && this.thumbs.swiperCreated && e && e.destroy();
          },
        },
      },
    ];
  return (
    void 0 === S.use &&
      ((S.use = S.Class.use), (S.installModule = S.Class.installModule)),
    S.use(ie),
    S
  );
});
/*! primary navigation slide-in effect & open/close primary navigation */
jQuery(document).ready(function (i) {
  if (i(window).width() > 1170) {
    var s = i(".cd-header").height();
    i(window).on("scroll", { previousTop: 0 }, function () {
      var e = i(window).scrollTop();
      e < this.previousTop
        ? e > 0 && i(".cd-header").hasClass("is-fixed")
          ? i(".cd-header").addClass("is-visible")
          : i(".cd-header").removeClass("is-visible is-fixed")
        : (i(".cd-header").removeClass("is-visible"),
          e > s &&
            !i(".cd-header").hasClass("is-fixed") &&
            i(".cd-header").addClass("is-fixed")),
        (this.previousTop = e);
    });
  }
  i(".cd-primary-nav-trigger").on("click", function () {
    i(".cd-menu-icon").toggleClass("is-clicked"),
      i(".cd-header").toggleClass("menu-is-open"),
      i(".cd-primary-nav").hasClass("is-visible")
        ? i(".cd-primary-nav")
            .removeClass("is-visible")
            .one(
              "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
              function () {
                i("body").removeClass("overflow-hidden");
              }
            )
        : i(".cd-primary-nav")
            .addClass("is-visible")
            .one(
              "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
              function () {
                i("body").addClass("overflow-hidden");
              }
            );
  });
});
/*! SubNav Open/Close */
function openNav() {
  document.getElementById("myNav").style.height = "100%";
}
function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}
/*! imagesLoaded */
!(function (e, t) {
  "function" == typeof define && define.amd
    ? define("ev-emitter/ev-emitter", t)
    : "object" == typeof module && module.exports
    ? (module.exports = t())
    : (e.EvEmitter = t());
})("undefined" != typeof window ? window : this, function () {
  function e() {}
  var t = e.prototype;
  return (
    (t.on = function (e, t) {
      if (e && t) {
        var i = (this._events = this._events || {}),
          n = (i[e] = i[e] || []);
        return n.indexOf(t) == -1 && n.push(t), this;
      }
    }),
    (t.once = function (e, t) {
      if (e && t) {
        this.on(e, t);
        var i = (this._onceEvents = this._onceEvents || {}),
          n = (i[e] = i[e] || {});
        return (n[t] = !0), this;
      }
    }),
    (t.off = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        var n = i.indexOf(t);
        return n != -1 && i.splice(n, 1), this;
      }
    }),
    (t.emitEvent = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        (i = i.slice(0)), (t = t || []);
        for (
          var n = this._onceEvents && this._onceEvents[e], o = 0;
          o < i.length;
          o++
        ) {
          var r = i[o],
            s = n && n[r];
          s && (this.off(e, r), delete n[r]), r.apply(this, t);
        }
        return this;
      }
    }),
    (t.allOff = function () {
      delete this._events, delete this._onceEvents;
    }),
    e
  );
}),
  (function (e, t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (i) {
          return t(e, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = t(e, require("ev-emitter")))
      : (e.imagesLoaded = t(e, e.EvEmitter));
  })("undefined" != typeof window ? window : this, function (e, t) {
    function i(e, t) {
      for (var i in t) e[i] = t[i];
      return e;
    }
    function n(e) {
      if (Array.isArray(e)) return e;
      var t = "object" == typeof e && "number" == typeof e.length;
      return t ? d.call(e) : [e];
    }
    function o(e, t, r) {
      if (!(this instanceof o)) return new o(e, t, r);
      var s = e;
      return (
        "string" == typeof e && (s = document.querySelectorAll(e)),
        s
          ? ((this.elements = n(s)),
            (this.options = i({}, this.options)),
            "function" == typeof t ? (r = t) : i(this.options, t),
            r && this.on("always", r),
            this.getImages(),
            h && (this.jqDeferred = new h.Deferred()),
            void setTimeout(this.check.bind(this)))
          : void a.error("Bad element for imagesLoaded " + (s || e))
      );
    }
    function r(e) {
      this.img = e;
    }
    function s(e, t) {
      (this.url = e), (this.element = t), (this.img = new Image());
    }
    var h = e.jQuery,
      a = e.console,
      d = Array.prototype.slice;
    (o.prototype = Object.create(t.prototype)),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e),
          this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && u[t]) {
          for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o);
          }
          if ("string" == typeof this.options.background) {
            var r = e.querySelectorAll(this.options.background);
            for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s);
            }
          }
        }
      });
    var u = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage);
            null !== n;

          ) {
            var o = n && n[2];
            o && this.addBackground(o, e), (n = i.exec(t.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (e) {
        var t = new r(e);
        this.images.push(t);
      }),
      (o.prototype.addBackground = function (e, t) {
        var i = new s(e, t);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function e(e, i, n) {
          setTimeout(function () {
            t.progress(e, i, n);
          });
        }
        var t = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (t) {
                t.once("progress", e), t.check();
              })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (e, t, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
          this.emitEvent("progress", [this, e, t]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, e),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log("progress: " + i, e, t);
      }),
      (o.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(e, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var t = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[t](this);
        }
      }),
      (r.prototype = Object.create(t.prototype)),
      (r.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (r.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (r.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emitEvent("progress", [this, this.img, t]);
      }),
      (r.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype = Object.create(r.prototype)),
      (s.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url);
        var e = this.getIsImageComplete();
        e &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
          this.unbindEvents());
      }),
      (s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype.confirm = function (e, t) {
        (this.isLoaded = e),
          this.emitEvent("progress", [this, this.element, t]);
      }),
      (o.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery),
          t &&
            ((h = t),
            (h.fn.imagesLoaded = function (e, t) {
              var i = new o(this, e, t);
              return i.jqDeferred.promise(h(this));
            }));
      }),
      o.makeJQueryPlugin(),
      o
    );
  });
/*! Anime */
var $jscomp = { scope: {} };
($jscomp.defineProperty =
  "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (t, e, r) {
        if (r.get || r.set)
          throw new TypeError("ES3 does not support getters and setters.");
        t != Array.prototype && t != Object.prototype && (t[e] = r.value);
      }),
  ($jscomp.getGlobal = function (t) {
    return "undefined" != typeof window && window === t
      ? t
      : "undefined" != typeof global && null != global
      ? global
      : t;
  }),
  ($jscomp.global = $jscomp.getGlobal(this)),
  ($jscomp.SYMBOL_PREFIX = "jscomp_symbol_"),
  ($jscomp.initSymbol = function () {
    ($jscomp.initSymbol = function () {}),
      $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
  }),
  ($jscomp.symbolCounter_ = 0),
  ($jscomp.Symbol = function (t) {
    return $jscomp.SYMBOL_PREFIX + (t || "") + $jscomp.symbolCounter_++;
  }),
  ($jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var t = $jscomp.global.Symbol.iterator;
    t ||
      (t = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")),
      "function" != typeof Array.prototype[t] &&
        $jscomp.defineProperty(Array.prototype, t, {
          configurable: !0,
          writable: !0,
          value: function () {
            return $jscomp.arrayIterator(this);
          },
        }),
      ($jscomp.initSymbolIterator = function () {});
  }),
  ($jscomp.arrayIterator = function (t) {
    var e = 0;
    return $jscomp.iteratorPrototype(function () {
      return e < t.length ? { done: !1, value: t[e++] } : { done: !0 };
    });
  }),
  ($jscomp.iteratorPrototype = function (t) {
    return (
      $jscomp.initSymbolIterator(),
      ((t = { next: t })[$jscomp.global.Symbol.iterator] = function () {
        return this;
      }),
      t
    );
  }),
  ($jscomp.array = $jscomp.array || {}),
  ($jscomp.iteratorFromArray = function (t, e) {
    $jscomp.initSymbolIterator(), t instanceof String && (t += "");
    var r = 0,
      n = {
        next: function () {
          if (r < t.length) {
            var o = r++;
            return { value: e(o, t[o]), done: !1 };
          }
          return (
            (n.next = function () {
              return { done: !0, value: void 0 };
            }),
            n.next()
          );
        },
      };
    return (
      (n[Symbol.iterator] = function () {
        return n;
      }),
      n
    );
  }),
  ($jscomp.polyfill = function (t, e, r, n) {
    if (e) {
      for (r = $jscomp.global, t = t.split("."), n = 0; n < t.length - 1; n++) {
        var o = t[n];
        o in r || (r[o] = {}), (r = r[o]);
      }
      (e = e((n = r[(t = t[t.length - 1])]))) != n &&
        null != e &&
        $jscomp.defineProperty(r, t, {
          configurable: !0,
          writable: !0,
          value: e,
        });
    }
  }),
  $jscomp.polyfill(
    "Array.prototype.keys",
    function (t) {
      return (
        t ||
        function () {
          return $jscomp.iteratorFromArray(this, function (t) {
            return t;
          });
        }
      );
    },
    "es6-impl",
    "es3"
  );
var $jscomp$this = this;
!(function (t, e) {
  "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof module && module.exports
    ? (module.exports = e())
    : (t.anime = e());
})(this, function () {
  function t(t) {
    if (!P.col(t))
      try {
        return document.querySelectorAll(t);
      } catch (t) {}
  }
  function e(t, e) {
    for (
      var r = t.length,
        n = 2 <= arguments.length ? arguments[1] : void 0,
        o = [],
        a = 0;
      a < r;
      a++
    )
      if (a in t) {
        var i = t[a];
        e.call(n, i, a, t) && o.push(i);
      }
    return o;
  }
  function r(t) {
    return t.reduce(function (t, e) {
      return t.concat(P.arr(e) ? r(e) : e);
    }, []);
  }
  function n(e) {
    return P.arr(e)
      ? e
      : (P.str(e) && (e = t(e) || e),
        e instanceof NodeList || e instanceof HTMLCollection
          ? [].slice.call(e)
          : [e]);
  }
  function o(t, e) {
    return t.some(function (t) {
      return t === e;
    });
  }
  function a(t) {
    var e,
      r = {};
    for (e in t) r[e] = t[e];
    return r;
  }
  function i(t, e) {
    var r,
      n = a(t);
    for (r in t) n[r] = e.hasOwnProperty(r) ? e[r] : t[r];
    return n;
  }
  function u(t, e) {
    var r,
      n = a(t);
    for (r in e) n[r] = P.und(t[r]) ? e[r] : t[r];
    return n;
  }
  function s(t) {
    if (
      (t =
        /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
          t
        ))
    )
      return t[2];
  }
  function c(t, e) {
    return P.fnc(t) ? t(e.target, e.id, e.total) : t;
  }
  function f(t, e) {
    if (e in t.style)
      return (
        getComputedStyle(t).getPropertyValue(
          e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
        ) || "0"
      );
  }
  function l(t, e) {
    return P.dom(t) && o(O, e)
      ? "transform"
      : P.dom(t) && (t.getAttribute(e) || (P.svg(t) && t[e]))
      ? "attribute"
      : P.dom(t) && "transform" !== e && f(t, e)
      ? "css"
      : null != t[e]
      ? "object"
      : void 0;
  }
  function p(t, r) {
    switch (l(t, r)) {
      case "transform":
        return (function (t, r) {
          var n,
            o =
              -1 < (n = r).indexOf("translate") || "perspective" === n
                ? "px"
                : -1 < n.indexOf("rotate") || -1 < n.indexOf("skew")
                ? "deg"
                : void 0;
          if (
            ((o = -1 < r.indexOf("scale") ? 1 : 0 + o),
            !(t = t.style.transform))
          )
            return o;
          for (
            var a = [], i = [], u = [], s = /(\w+)\((.+?)\)/g;
            (a = s.exec(t));

          )
            i.push(a[1]), u.push(a[2]);
          return (t = e(u, function (t, e) {
            return i[e] === r;
          })).length
            ? t[0]
            : o;
        })(t, r);
      case "css":
        return f(t, r);
      case "attribute":
        return t.getAttribute(r);
    }
    return t[r] || 0;
  }
  function d(t, e) {
    var r = /^(\*=|\+=|-=)/.exec(t);
    if (!r) return t;
    var n = s(t) || 0;
    switch (
      ((e = parseFloat(e)), (t = parseFloat(t.replace(r[0], ""))), r[0][0])
    ) {
      case "+":
        return e + t + n;
      case "-":
        return e - t + n;
      case "*":
        return e * t + n;
    }
  }
  function m(t, e) {
    return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
  }
  function g(t) {
    t = t.points;
    for (var e, r = 0, n = 0; n < t.numberOfItems; n++) {
      var o = t.getItem(n);
      0 < n && (r += m(e, o)), (e = o);
    }
    return r;
  }
  function y(t) {
    if (t.getTotalLength) return t.getTotalLength();
    switch (t.tagName.toLowerCase()) {
      case "circle":
        return 2 * Math.PI * t.getAttribute("r");
      case "rect":
        return 2 * t.getAttribute("width") + 2 * t.getAttribute("height");
      case "line":
        return m(
          { x: t.getAttribute("x1"), y: t.getAttribute("y1") },
          { x: t.getAttribute("x2"), y: t.getAttribute("y2") }
        );
      case "polyline":
        return g(t);
      case "polygon":
        var e = t.points;
        return g(t) + m(e.getItem(e.numberOfItems - 1), e.getItem(0));
    }
  }
  function h(t, e) {
    function r(r) {
      return (
        (r = void 0 === r ? 0 : r),
        t.el.getPointAtLength(1 <= e + r ? e + r : 0)
      );
    }
    var n = r(),
      o = r(-1),
      a = r(1);
    switch (t.property) {
      case "x":
        return n.x;
      case "y":
        return n.y;
      case "angle":
        return (180 * Math.atan2(a.y - o.y, a.x - o.x)) / Math.PI;
    }
  }
  function v(t, e) {
    var r,
      n = /-?\d*\.?\d+/g;
    if (((r = P.pth(t) ? t.totalLength : t), P.col(r)))
      if (P.rgb(r)) {
        var o = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(r);
        r = o ? "rgba(" + o[1] + ",1)" : r;
      } else
        r = P.hex(r)
          ? (function (t) {
              t = t.replace(
                /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                function (t, e, r, n) {
                  return e + e + r + r + n + n;
                }
              );
              var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
              return (
                "rgba(" +
                (t = parseInt(e[1], 16)) +
                "," +
                parseInt(e[2], 16) +
                "," +
                (e = parseInt(e[3], 16)) +
                ",1)"
              );
            })(r)
          : P.hsl(r)
          ? (function (t) {
              function e(t, e, r) {
                return (
                  0 > r && (r += 1),
                  1 < r && --r,
                  r < 1 / 6
                    ? t + 6 * (e - t) * r
                    : 0.5 > r
                    ? e
                    : r < 2 / 3
                    ? t + (e - t) * (2 / 3 - r) * 6
                    : t
                );
              }
              var r =
                /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t) ||
                /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t);
              t = parseInt(r[1]) / 360;
              var n = parseInt(r[2]) / 100,
                o = parseInt(r[3]) / 100;
              if (((r = r[4] || 1), 0 == n)) o = n = t = o;
              else {
                var a = 0.5 > o ? o * (1 + n) : o + n - o * n,
                  i = 2 * o - a;
                (o = e(i, a, t + 1 / 3)),
                  (n = e(i, a, t)),
                  (t = e(i, a, t - 1 / 3));
              }
              return (
                "rgba(" +
                255 * o +
                "," +
                255 * n +
                "," +
                255 * t +
                "," +
                r +
                ")"
              );
            })(r)
          : void 0;
    else
      (o = (o = s(r)) ? r.substr(0, r.length - o.length) : r),
        (r = e && !/\s/g.test(r) ? o + e : o);
    return {
      original: (r += ""),
      numbers: r.match(n) ? r.match(n).map(Number) : [0],
      strings: P.str(t) || e ? r.split(n) : [],
    };
  }
  function b(t) {
    return e((t = t ? r(P.arr(t) ? t.map(n) : n(t)) : []), function (t, e, r) {
      return r.indexOf(t) === e;
    });
  }
  function j(t, e) {
    var r = a(e);
    if (P.arr(t)) {
      var o = t.length;
      2 !== o || P.obj(t[0])
        ? P.fnc(e.duration) || (r.duration = e.duration / o)
        : (t = { value: t });
    }
    return n(t)
      .map(function (t, r) {
        return (
          (r = r ? 0 : e.delay),
          (t = P.obj(t) && !P.pth(t) ? t : { value: t }),
          P.und(t.delay) && (t.delay = r),
          t
        );
      })
      .map(function (t) {
        return u(t, r);
      });
  }
  function $(t, e) {
    var r;
    return t.tweens.map(function (n) {
      var o = (n = (function (t, e) {
          var r,
            n = {};
          for (r in t) {
            var o = c(t[r], e);
            P.arr(o) &&
              1 ===
                (o = o.map(function (t) {
                  return c(t, e);
                })).length &&
              (o = o[0]),
              (n[r] = o);
          }
          return (
            (n.duration = parseFloat(n.duration)),
            (n.delay = parseFloat(n.delay)),
            n
          );
        })(n, e)).value,
        a = p(e.target, t.name),
        i = r ? r.to.original : a,
        u = ((i = P.arr(o) ? o[0] : i), d(P.arr(o) ? o[1] : o, i));
      a = s(u) || s(i) || s(a);
      return (
        (n.from = v(i, a)),
        (n.to = v(u, a)),
        (n.start = r ? r.end : t.offset),
        (n.end = n.start + n.delay + n.duration),
        (n.easing = (function (t) {
          return P.arr(t) ? k.apply(this, t) : F[t];
        })(n.easing)),
        (n.elasticity = (1e3 - Math.min(Math.max(n.elasticity, 1), 999)) / 1e3),
        (n.isPath = P.pth(o)),
        (n.isColor = P.col(n.from.original)),
        n.isColor && (n.round = 1),
        (r = n)
      );
    });
  }
  function x(t, e, r, n) {
    var o = "delay" === t;
    return e.length
      ? (o ? Math.min : Math.max).apply(
          Math,
          e.map(function (e) {
            return e[t];
          })
        )
      : o
      ? n.delay
      : r.offset + n.delay + n.duration;
  }
  function w(t) {
    var n,
      o,
      a,
      s,
      c = i(M, t),
      f = i(S, t),
      p =
        ((o = t.targets),
        (a = b(o)).map(function (t, e) {
          return { target: t, id: e, total: a.length };
        })),
      d = [],
      m = u(c, f);
    for (n in t)
      m.hasOwnProperty(n) ||
        "targets" === n ||
        d.push({ name: n, offset: m.offset, tweens: j(t[n], f) });
    return (
      (s = d),
      u(c, {
        children: [],
        animatables: p,
        animations: (t = e(
          r(
            p.map(function (t) {
              return s.map(function (e) {
                var r = l(t.target, e.name);
                if (r) {
                  var n = $(e, t);
                  e = {
                    type: r,
                    property: e.name,
                    animatable: t,
                    tweens: n,
                    duration: n[n.length - 1].end,
                    delay: n[0].delay,
                  };
                } else e = void 0;
                return e;
              });
            })
          ),
          function (t) {
            return !P.und(t);
          }
        )),
        duration: x("duration", t, c, f),
        delay: x("delay", t, c, f),
      })
    );
  }
  function A(t) {
    function r() {
      return (
        window.Promise &&
        new Promise(function (t) {
          return (p = t);
        })
      );
    }
    function n(t) {
      return m.reversed ? m.duration - t : t;
    }
    function o(t) {
      for (var r = 0, n = {}, o = m.animations, a = o.length; r < a; ) {
        var i = o[r],
          u = i.animatable,
          s = (c = i.tweens)[(d = c.length - 1)];
        d &&
          (s =
            e(c, function (e) {
              return t < e.end;
            })[0] || s);
        for (
          var c =
              Math.min(Math.max(t - s.start - s.delay, 0), s.duration) /
              s.duration,
            l = isNaN(c) ? 1 : s.easing(c, s.elasticity),
            p = ((c = s.to.strings), s.round),
            d = [],
            g = void 0,
            y = ((g = s.to.numbers.length), 0);
          y < g;
          y++
        ) {
          var v = void 0,
            b = ((v = s.to.numbers[y]), s.from.numbers[y]);
          v = s.isPath ? h(s.value, l * v) : b + l * (v - b);
          p && ((s.isColor && 2 < y) || (v = Math.round(v * p) / p)), d.push(v);
        }
        if ((s = c.length))
          for (g = c[0], l = 0; l < s; l++)
            (p = c[l + 1]),
              (y = d[l]),
              isNaN(y) || (g = p ? g + (y + p) : g + (y + " "));
        else g = d[0];
        L[i.type](u.target, i.property, g, n, u.id), (i.currentValue = g), r++;
      }
      if ((r = Object.keys(n).length))
        for (o = 0; o < r; o++)
          I ||
            (I = f(document.body, "transform")
              ? "transform"
              : "-webkit-transform"),
            (m.animatables[o].target.style[I] = n[o].join(" "));
      (m.currentTime = t), (m.progress = (t / m.duration) * 100);
    }
    function a(t) {
      m[t] && m[t](m);
    }
    function i() {
      m.remaining && !0 !== m.remaining && m.remaining--;
    }
    function u(t) {
      var e = m.duration,
        u = m.offset,
        f = u + m.delay,
        g = m.currentTime,
        y = m.reversed,
        h = n(t);
      if (m.children.length) {
        var v = m.children,
          b = v.length;
        if (h >= m.currentTime) for (var j = 0; j < b; j++) v[j].seek(h);
        else for (; b--; ) v[b].seek(h);
      }
      (h >= f || !e) && (m.began || ((m.began = !0), a("begin")), a("run")),
        h > u && h < e
          ? o(h)
          : (h <= u && 0 !== g && (o(0), y && i()),
            ((h >= e && g !== e) || !e) && (o(e), y || i())),
        a("update"),
        t >= e &&
          (m.remaining
            ? ((c = s),
              "alternate" === m.direction && (m.reversed = !m.reversed))
            : (m.pause(),
              m.completed ||
                ((m.completed = !0),
                a("complete"),
                "Promise" in window && (p(), (d = r())))),
          (l = 0));
    }
    t = void 0 === t ? {} : t;
    var s,
      c,
      l = 0,
      p = null,
      d = r(),
      m = w(t);
    return (
      (m.reset = function () {
        var t = m.direction,
          e = m.loop;
        for (
          m.currentTime = 0,
            m.progress = 0,
            m.paused = !0,
            m.began = !1,
            m.completed = !1,
            m.reversed = "reverse" === t,
            m.remaining = "alternate" === t && 1 === e ? 2 : e,
            o(0),
            t = m.children.length;
          t--;

        )
          m.children[t].reset();
      }),
      (m.tick = function (t) {
        (s = t), c || (c = s), u((l + s - c) * A.speed);
      }),
      (m.seek = function (t) {
        u(n(t));
      }),
      (m.pause = function () {
        var t = C.indexOf(m);
        -1 < t && C.splice(t, 1), (m.paused = !0);
      }),
      (m.play = function () {
        m.paused &&
          ((m.paused = !1),
          (c = 0),
          (l = n(m.currentTime)),
          C.push(m),
          E || T());
      }),
      (m.reverse = function () {
        (m.reversed = !m.reversed), (c = 0), (l = n(m.currentTime));
      }),
      (m.restart = function () {
        m.pause(), m.reset(), m.play();
      }),
      (m.finished = d),
      m.reset(),
      m.autoplay && m.play(),
      m
    );
  }
  var I,
    M = {
      update: void 0,
      begin: void 0,
      run: void 0,
      complete: void 0,
      loop: 1,
      direction: "normal",
      autoplay: !0,
      offset: 0,
    },
    S = {
      duration: 1e3,
      delay: 0,
      easing: "easeOutElastic",
      elasticity: 500,
      round: 0,
    },
    O =
      "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(
        " "
      ),
    P = {
      arr: function (t) {
        return Array.isArray(t);
      },
      obj: function (t) {
        return -1 < Object.prototype.toString.call(t).indexOf("Object");
      },
      pth: function (t) {
        return P.obj(t) && t.hasOwnProperty("totalLength");
      },
      svg: function (t) {
        return t instanceof SVGElement;
      },
      dom: function (t) {
        return t.nodeType || P.svg(t);
      },
      str: function (t) {
        return "string" == typeof t;
      },
      fnc: function (t) {
        return "function" == typeof t;
      },
      und: function (t) {
        return void 0 === t;
      },
      hex: function (t) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t);
      },
      rgb: function (t) {
        return /^rgb/.test(t);
      },
      hsl: function (t) {
        return /^hsl/.test(t);
      },
      col: function (t) {
        return P.hex(t) || P.rgb(t) || P.hsl(t);
      },
    },
    k = (function () {
      function t(t, e, r) {
        return (((1 - 3 * r + 3 * e) * t + (3 * r - 6 * e)) * t + 3 * e) * t;
      }
      return function (e, r, n, o) {
        if (0 <= e && 1 >= e && 0 <= n && 1 >= n) {
          var a = new Float32Array(11);
          if (e !== r || n !== o)
            for (var i = 0; 11 > i; ++i) a[i] = t(0.1 * i, e, n);
          return function (i) {
            if (e === r && n === o) return i;
            if (0 === i) return 0;
            if (1 === i) return 1;
            for (var u = 0, s = 1; 10 !== s && a[s] <= i; ++s) u += 0.1;
            s = u + ((i - a[--s]) / (a[s + 1] - a[s])) * 0.1;
            var c =
              3 * (1 - 3 * n + 3 * e) * s * s + 2 * (3 * n - 6 * e) * s + 3 * e;
            if (0.001 <= c) {
              for (
                u = 0;
                4 > u &&
                0 !==
                  (c =
                    3 * (1 - 3 * n + 3 * e) * s * s +
                    2 * (3 * n - 6 * e) * s +
                    3 * e);
                ++u
              ) {
                var f = t(s, e, n) - i;
                s = s - f / c;
              }
              i = s;
            } else if (0 === c) i = s;
            else {
              (s = u), (u = u + 0.1);
              var l = 0;
              do {
                (f = s + (u - s) / 2),
                  (c = t(f, e, n) - i),
                  0 < c ? (u = f) : (s = f);
              } while (1e-7 < Math.abs(c) && 10 > ++l);
              i = f;
            }
            return t(i, r, o);
          };
        }
      };
    })(),
    F = (function () {
      function t(t, e) {
        return 0 === t || 1 === t
          ? t
          : -Math.pow(2, 10 * (t - 1)) *
              Math.sin(
                (2 * (t - 1 - (e / (2 * Math.PI)) * Math.asin(1)) * Math.PI) / e
              );
      }
      var e,
        r = "Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),
        n = {
          In: [
            [0.55, 0.085, 0.68, 0.53],
            [0.55, 0.055, 0.675, 0.19],
            [0.895, 0.03, 0.685, 0.22],
            [0.755, 0.05, 0.855, 0.06],
            [0.47, 0, 0.745, 0.715],
            [0.95, 0.05, 0.795, 0.035],
            [0.6, 0.04, 0.98, 0.335],
            [0.6, -0.28, 0.735, 0.045],
            t,
          ],
          Out: [
            [0.25, 0.46, 0.45, 0.94],
            [0.215, 0.61, 0.355, 1],
            [0.165, 0.84, 0.44, 1],
            [0.23, 1, 0.32, 1],
            [0.39, 0.575, 0.565, 1],
            [0.19, 1, 0.22, 1],
            [0.075, 0.82, 0.165, 1],
            [0.175, 0.885, 0.32, 1.275],
            function (e, r) {
              return 1 - t(1 - e, r);
            },
          ],
          InOut: [
            [0.455, 0.03, 0.515, 0.955],
            [0.645, 0.045, 0.355, 1],
            [0.77, 0, 0.175, 1],
            [0.86, 0, 0.07, 1],
            [0.445, 0.05, 0.55, 0.95],
            [1, 0, 0, 1],
            [0.785, 0.135, 0.15, 0.86],
            [0.68, -0.55, 0.265, 1.55],
            function (e, r) {
              return 0.5 > e ? t(2 * e, r) / 2 : 1 - t(-2 * e + 2, r) / 2;
            },
          ],
        },
        o = { linear: k(0.25, 0.25, 0.75, 0.75) },
        a = {};
      for (e in n)
        (a.type = e),
          n[a.type].forEach(
            (function (t) {
              return function (e, n) {
                o["ease" + t.type + r[n]] = P.fnc(e)
                  ? e
                  : k.apply($jscomp$this, e);
              };
            })(a)
          ),
          (a = { type: a.type });
      return o;
    })(),
    L = {
      css: function (t, e, r) {
        return (t.style[e] = r);
      },
      attribute: function (t, e, r) {
        return t.setAttribute(e, r);
      },
      object: function (t, e, r) {
        return (t[e] = r);
      },
      transform: function (t, e, r, n, o) {
        n[o] || (n[o] = []), n[o].push(e + "(" + r + ")");
      },
    },
    C = [],
    E = 0,
    T = (function () {
      function t() {
        E = requestAnimationFrame(e);
      }
      function e(e) {
        var r = C.length;
        if (r) {
          for (var n = 0; n < r; ) C[n] && C[n].tick(e), n++;
          t();
        } else cancelAnimationFrame(E), (E = 0);
      }
      return t;
    })();
  return (
    (A.version = "2.2.0"),
    (A.speed = 1),
    (A.running = C),
    (A.remove = function (t) {
      t = b(t);
      for (var e = C.length; e--; )
        for (var r = C[e], n = r.animations, a = n.length; a--; )
          o(t, n[a].animatable.target) &&
            (n.splice(a, 1), n.length || r.pause());
    }),
    (A.getValue = p),
    (A.path = function (e, r) {
      var n = P.str(e) ? t(e)[0] : e,
        o = r || 100;
      return function (t) {
        return { el: n, property: t, totalLength: y(n) * (o / 100) };
      };
    }),
    (A.setDashoffset = function (t) {
      var e = y(t);
      return t.setAttribute("stroke-dasharray", e), e;
    }),
    (A.bezier = k),
    (A.easings = F),
    (A.timeline = function (t) {
      var e = A(t);
      return (
        e.pause(),
        (e.duration = 0),
        (e.add = function (r) {
          return (
            e.children.forEach(function (t) {
              (t.began = !0), (t.completed = !0);
            }),
            n(r).forEach(function (r) {
              var n = u(r, i(S, t || {}));
              (n.targets = n.targets || t.targets), (r = e.duration);
              var o = n.offset;
              (n.autoplay = !1),
                (n.direction = e.direction),
                (n.offset = P.und(o) ? r : d(o, r)),
                (e.began = !0),
                (e.completed = !0),
                e.seek(n.offset),
                ((n = A(n)).began = !0),
                (n.completed = !0),
                n.duration > r && (e.duration = n.duration),
                e.children.push(n);
            }),
            e.seek(0),
            e.reset(),
            e.autoplay && e.restart(),
            e
          );
        }),
        e
      );
    }),
    (A.random = function (t, e) {
      return Math.floor(Math.random() * (e - t + 1)) + t;
    }),
    A
  );
});
/*! Scroll Reveal Animations */
window.scrollReveal = (function (t) {
  "use strict";
  function e(e) {
    (this.docElem = t.document.documentElement),
      (this.options = this.extend(this.defaults, e)),
      (this.styleBank = {}),
      1 == this.options.init && this.init();
  }
  var i = 1,
    o = (function () {
      return (
        t.requestAnimationFrame ||
        t.webkitRequestAnimationFrame ||
        t.mozRequestAnimationFrame ||
        function (e) {
          t.setTimeout(e, 1e3 / 60);
        }
      );
    })();
  return (
    (e.prototype = {
      defaults: {
        after: "0s",
        enter: "bottom",
        move: "24px",
        over: "0.66s",
        easing: "ease-in-out",
        opacity: 0,
        viewportFactor: 0.33,
        reset: !1,
        init: !0,
      },
      init: function () {
        this.scrolled = !1;
        var e = this;
        (this.elems = Array.prototype.slice.call(
          this.docElem.querySelectorAll("[data-scroll-reveal]")
        )),
          this.elems.forEach(function (t, o) {
            var r = t.getAttribute("data-scroll-reveal-id");
            r || ((r = i++), t.setAttribute("data-scroll-reveal-id", r)),
              e.styleBank[r] || (e.styleBank[r] = t.getAttribute("style")),
              e.update(t);
          });
        var r = function (t) {
            e.scrolled ||
              ((e.scrolled = !0),
              o(function () {
                e._scrollPage();
              }));
          },
          n = function () {
            function t() {
              e._scrollPage(), (e.resizeTimeout = null);
            }
            e.resizeTimeout && clearTimeout(e.resizeTimeout),
              (e.resizeTimeout = setTimeout(t, 200));
          };
        t.addEventListener("scroll", r, !1),
          t.addEventListener("resize", n, !1);
      },
      _scrollPage: function () {
        var t = this;
        this.elems.forEach(function (e, i) {
          t.update(e);
        }),
          (this.scrolled = !1);
      },
      parseLanguage: function (t) {
        function e(t) {
          var e = [],
            i = ["from", "the", "and", "then", "but", "with"];
          return (
            t.forEach(function (t, o) {
              i.indexOf(t) > -1 || e.push(t);
            }),
            e
          );
        }
        var i = t.getAttribute("data-scroll-reveal").split(/[, ]+/),
          o = {};
        return (
          (i = e(i)),
          i.forEach(function (t, e) {
            switch (t) {
              case "enter":
                return void (o.enter = i[e + 1]);
              case "after":
                return void (o.after = i[e + 1]);
              case "wait":
                return void (o.after = i[e + 1]);
              case "move":
                return void (o.move = i[e + 1]);
              case "ease":
                return (o.move = i[e + 1]), void (o.ease = "ease");
              case "ease-in":
                return (o.move = i[e + 1]), void (o.easing = "ease-in");
              case "ease-in-out":
                return (o.move = i[e + 1]), void (o.easing = "ease-in-out");
              case "ease-out":
                return (o.move = i[e + 1]), void (o.easing = "ease-out");
              case "over":
                return void (o.over = i[e + 1]);
              default:
                return;
            }
          }),
          o
        );
      },
      update: function (t) {
        var e = this.genCSS(t),
          i = this.styleBank[t.getAttribute("data-scroll-reveal-id")];
        return (
          null != i ? (i += ";") : (i = ""),
          t.getAttribute("data-scroll-reveal-initialized") ||
            (t.setAttribute("style", i + e.initial),
            t.setAttribute("data-scroll-reveal-initialized", !0)),
          this.isElementInViewport(t, this.options.viewportFactor)
            ? t.getAttribute("data-scroll-reveal-complete")
              ? void 0
              : this.isElementInViewport(t, this.options.viewportFactor)
              ? (t.setAttribute("style", i + e.target + e.transition),
                void (
                  this.options.reset ||
                  setTimeout(function () {
                    "" != i
                      ? t.setAttribute("style", i)
                      : t.removeAttribute("style"),
                      t.setAttribute("data-scroll-reveal-complete", !0);
                  }, e.totalDuration)
                ))
              : void 0
            : void (
                this.options.reset &&
                t.setAttribute("style", i + e.initial + e.reset)
              )
        );
      },
      genCSS: function (t) {
        var e,
          i,
          o = this.parseLanguage(t);
        o.enter
          ? (("top" == o.enter || "bottom" == o.enter) &&
              ((e = o.enter), (i = "y")),
            ("left" == o.enter || "right" == o.enter) &&
              ((e = o.enter), (i = "x")))
          : (("top" == this.options.enter || "bottom" == this.options.enter) &&
              ((e = this.options.enter), (i = "y")),
            ("left" == this.options.enter || "right" == this.options.enter) &&
              ((e = this.options.enter), (i = "x"))),
          ("top" == e || "left" == e) &&
            (o.move
              ? (o.move = "-" + o.move)
              : (o.move = "-" + this.options.move));
        var r = o.move || this.options.move,
          n = o.over || this.options.over,
          s = o.after || this.options.after,
          a = o.easing || this.options.easing,
          l = o.opacity || this.options.opacity,
          u =
            "-webkit-transition: -webkit-transform " +
            n +
            " " +
            a +
            " " +
            s +
            ",  opacity " +
            n +
            " " +
            a +
            " " +
            s +
            ";transition: transform " +
            n +
            " " +
            a +
            " " +
            s +
            ", opacity " +
            n +
            " " +
            a +
            " " +
            s +
            ";-webkit-perspective: 1000;-webkit-backface-visibility: hidden;",
          c =
            "-webkit-transition: -webkit-transform " +
            n +
            " " +
            a +
            " 0s,  opacity " +
            n +
            " " +
            a +
            " " +
            s +
            ";transition: transform " +
            n +
            " " +
            a +
            " 0s,  opacity " +
            n +
            " " +
            a +
            " " +
            s +
            ";-webkit-perspective: 1000;-webkit-backface-visibility: hidden;",
          f =
            "-webkit-transform: translate" +
            i +
            "(" +
            r +
            ");transform: translate" +
            i +
            "(" +
            r +
            ");opacity: " +
            l +
            ";",
          p =
            "-webkit-transform: translate" +
            i +
            "(0);transform: translate" +
            i +
            "(0);opacity: 1;";
        return {
          transition: u,
          initial: f,
          target: p,
          reset: c,
          totalDuration: 1e3 * (parseFloat(n) + parseFloat(s)),
        };
      },
      getViewportH: function () {
        var e = this.docElem.clientHeight,
          i = t.innerHeight;
        return i > e ? i : e;
      },
      getOffset: function (t) {
        var e = 0,
          i = 0;
        do
          isNaN(t.offsetTop) || (e += t.offsetTop),
            isNaN(t.offsetLeft) || (i += t.offsetLeft);
        while ((t = t.offsetParent));
        return { top: e, left: i };
      },
      isElementInViewport: function (e, i) {
        var o = t.pageYOffset,
          r = o + this.getViewportH(),
          n = e.offsetHeight,
          s = this.getOffset(e).top,
          a = s + n,
          i = i || 0;
        return (
          (r >= s + n * i && a >= o) ||
          "fixed" ==
            (e.currentStyle ? e.currentStyle : t.getComputedStyle(e, null))
              .position
        );
      },
      extend: function (t, e) {
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        return t;
      },
    }),
    e
  );
})(window);
/*! Masonry */
(function (e, t, n) {
  "use strict";
  var r = t.event,
    i;
  (r.special.smartresize = {
    setup: function () {
      t(this).bind("resize", r.special.smartresize.handler);
    },
    teardown: function () {
      t(this).unbind("resize", r.special.smartresize.handler);
    },
    handler: function (e, t) {
      var n = this,
        s = arguments;
      (e.type = "smartresize"),
        i && clearTimeout(i),
        (i = setTimeout(
          function () {
            r.dispatch.apply(n, s);
          },
          t === "execAsap" ? 0 : 100
        ));
    },
  }),
    (t.fn.smartresize = function (e) {
      return e
        ? this.bind("smartresize", e)
        : this.trigger("smartresize", ["execAsap"]);
    }),
    (t.Mason = function (e, n) {
      (this.element = t(n)), this._create(e), this._init();
    }),
    (t.Mason.settings = {
      isResizable: !0,
      isAnimated: !1,
      animationOptions: { queue: !1, duration: 500 },
      gutterWidth: 0,
      isRTL: !1,
      isFitWidth: !1,
      containerStyle: { position: "relative" },
    }),
    (t.Mason.prototype = {
      _filterFindBricks: function (e) {
        var t = this.options.itemSelector;
        return t ? e.filter(t).add(e.find(t)) : e;
      },
      _getBricks: function (e) {
        var t = this._filterFindBricks(e)
          .css({ position: "absolute" })
          .addClass("masonry-brick");
        return t;
      },
      _create: function (n) {
        (this.options = t.extend(!0, {}, t.Mason.settings, n)),
          (this.styleQueue = []);
        var r = this.element[0].style;
        this.originalStyle = { height: r.height || "" };
        var i = this.options.containerStyle;
        for (var s in i) this.originalStyle[s] = r[s] || "";
        this.element.css(i),
          (this.horizontalDirection = this.options.isRTL ? "right" : "left");
        var o = this.element.css("padding-" + this.horizontalDirection),
          u = this.element.css("padding-top");
        (this.offset = {
          x: o ? parseInt(o, 10) : 0,
          y: u ? parseInt(u, 10) : 0,
        }),
          (this.isFluid =
            this.options.columnWidth &&
            typeof this.options.columnWidth == "function");
        var a = this;
        setTimeout(function () {
          a.element.addClass("masonry");
        }, 0),
          this.options.isResizable &&
            t(e).bind("smartresize.masonry", function () {
              a.resize();
            }),
          this.reloadItems();
      },
      _init: function (e) {
        this._getColumns(), this._reLayout(e);
      },
      option: function (e, n) {
        t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e));
      },
      layout: function (e, t) {
        for (var n = 0, r = e.length; n < r; n++) this._placeBrick(e[n]);
        var i = {};
        i.height = Math.max.apply(Math, this.colYs);
        if (this.options.isFitWidth) {
          var s = 0;
          n = this.cols;
          while (--n) {
            if (this.colYs[n] !== 0) break;
            s++;
          }
          i.width =
            (this.cols - s) * this.columnWidth - this.options.gutterWidth;
        }
        this.styleQueue.push({ $el: this.element, style: i });
        var o = this.isLaidOut
            ? this.options.isAnimated
              ? "animate"
              : "css"
            : "css",
          u = this.options.animationOptions,
          a;
        for (n = 0, r = this.styleQueue.length; n < r; n++)
          (a = this.styleQueue[n]), a.$el[o](a.style, u);
        (this.styleQueue = []), t && t.call(e), (this.isLaidOut = !0);
      },
      _getColumns: function () {
        var e = this.options.isFitWidth ? this.element.parent() : this.element,
          t = e.width();
        (this.columnWidth = this.isFluid
          ? this.options.columnWidth(t)
          : this.options.columnWidth || this.$bricks.outerWidth(!0) || t),
          (this.columnWidth += this.options.gutterWidth),
          (this.cols = Math.floor(
            (t + this.options.gutterWidth) / this.columnWidth
          )),
          (this.cols = Math.max(this.cols, 1));
      },
      _placeBrick: function (e) {
        var n = t(e),
          r,
          i,
          s,
          o,
          u;
        (r = Math.ceil(n.outerWidth(!0) / this.columnWidth)),
          (r = Math.min(r, this.cols));
        if (r === 1) s = this.colYs;
        else {
          (i = this.cols + 1 - r), (s = []);
          for (u = 0; u < i; u++)
            (o = this.colYs.slice(u, u + r)), (s[u] = Math.max.apply(Math, o));
        }
        var a = Math.min.apply(Math, s),
          f = 0;
        for (var l = 0, c = s.length; l < c; l++)
          if (s[l] === a) {
            f = l;
            break;
          }
        var h = { top: a + this.offset.y };
        (h[this.horizontalDirection] = this.columnWidth * f + this.offset.x),
          this.styleQueue.push({ $el: n, style: h });
        var p = a + n.outerHeight(!0),
          d = this.cols + 1 - c;
        for (l = 0; l < d; l++) this.colYs[f + l] = p;
      },
      resize: function () {
        var e = this.cols;
        this._getColumns(),
          (this.isFluid || this.cols !== e) && this._reLayout();
      },
      _reLayout: function (e) {
        var t = this.cols;
        this.colYs = [];
        while (t--) this.colYs.push(0);
        this.layout(this.$bricks, e);
      },
      reloadItems: function () {
        this.$bricks = this._getBricks(this.element.children());
      },
      reload: function (e) {
        this.reloadItems(), this._init(e);
      },
      appended: function (e, t, n) {
        if (t) {
          this._filterFindBricks(e).css({ top: this.element.height() });
          var r = this;
          setTimeout(function () {
            r._appended(e, n);
          }, 1);
        } else this._appended(e, n);
      },
      _appended: function (e, t) {
        var n = this._getBricks(e);
        (this.$bricks = this.$bricks.add(n)), this.layout(n, t);
      },
      remove: function (e) {
        (this.$bricks = this.$bricks.not(e)), e.remove();
      },
      destroy: function () {
        this.$bricks.removeClass("masonry-brick").each(function () {
          (this.style.position = ""),
            (this.style.top = ""),
            (this.style.left = "");
        });
        var n = this.element[0].style;
        for (var r in this.originalStyle) n[r] = this.originalStyle[r];
        this.element
          .unbind(".masonry")
          .removeClass("masonry")
          .removeData("masonry"),
          t(e).unbind(".masonry");
      },
    }),
    (t.fn.imagesLoaded = function (e) {
      function u() {
        e.call(n, r);
      }
      function a(e) {
        var n = e.target;
        n.src !== s &&
          t.inArray(n, o) === -1 &&
          (o.push(n),
          --i <= 0 && (setTimeout(u), r.unbind(".imagesLoaded", a)));
      }
      var n = this,
        r = n.find("img").add(n.filter("img")),
        i = r.length,
        s =
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
        o = [];
      return (
        i || u(),
        r.bind("load.imagesLoaded error.imagesLoaded", a).each(function () {
          var e = this.src;
          (this.src = s), (this.src = e);
        }),
        n
      );
    });
  var s = function (t) {
    e.console && e.console.error(t);
  };
  t.fn.masonry = function (e) {
    if (typeof e == "string") {
      var n = Array.prototype.slice.call(arguments, 1);
      this.each(function () {
        var r = t.data(this, "masonry");
        if (!r) {
          s(
            "cannot call methods on masonry prior to initialization; attempted to call method '" +
              e +
              "'"
          );
          return;
        }
        if (!t.isFunction(r[e]) || e.charAt(0) === "_") {
          s("no such method '" + e + "' for masonry instance");
          return;
        }
        r[e].apply(r, n);
      });
    } else
      this.each(function () {
        var n = t.data(this, "masonry");
        n
          ? (n.option(e || {}), n._init())
          : t.data(this, "masonry", new t.Mason(e, this));
      });
    return this;
  };
})(window, jQuery);
/*! Isotope */
(function (a, b, c) {
  "use strict";
  var d = a.document,
    e = a.Modernizr,
    f = function (a) {
      return a.charAt(0).toUpperCase() + a.slice(1);
    },
    g = "Moz Webkit O Ms".split(" "),
    h = function (a) {
      var b = d.documentElement.style,
        c;
      if (typeof b[a] == "string") return a;
      a = f(a);
      for (var e = 0, h = g.length; e < h; e++) {
        c = g[e] + a;
        if (typeof b[c] == "string") return c;
      }
    },
    i = h("transform"),
    j = h("transitionProperty"),
    k = {
      csstransforms: function () {
        return !!i;
      },
      csstransforms3d: function () {
        var a = !!h("perspective");
        if (a) {
          var c = " -o- -moz- -ms- -webkit- -khtml- ".split(" "),
            d = "@media (" + c.join("transform-3d),(") + "modernizr)",
            e = b(
              "<style>" + d + "{#modernizr{height:3px}}" + "</style>"
            ).appendTo("head"),
            f = b('<div id="modernizr" />').appendTo("html");
          (a = f.height() === 3), f.remove(), e.remove();
        }
        return a;
      },
      csstransitions: function () {
        return !!j;
      },
    },
    l;
  if (e) for (l in k) e.hasOwnProperty(l) || e.addTest(l, k[l]);
  else {
    e = a.Modernizr = { _version: "1.6ish: miniModernizr for Isotope" };
    var m = " ",
      n;
    for (l in k) (n = k[l]()), (e[l] = n), (m += " " + (n ? "" : "no-") + l);
    b("html").addClass(m);
  }
  if (e.csstransforms) {
    var o = e.csstransforms3d
        ? {
            translate: function (a) {
              return "translate3d(" + a[0] + "px, " + a[1] + "px, 0) ";
            },
            scale: function (a) {
              return "scale3d(" + a + ", " + a + ", 1) ";
            },
          }
        : {
            translate: function (a) {
              return "translate(" + a[0] + "px, " + a[1] + "px) ";
            },
            scale: function (a) {
              return "scale(" + a + ") ";
            },
          },
      p = function (a, c, d) {
        var e = b.data(a, "isoTransform") || {},
          f = {},
          g,
          h = {},
          j;
        (f[c] = d), b.extend(e, f);
        for (g in e) (j = e[g]), (h[g] = o[g](j));
        var k = h.translate || "",
          l = h.scale || "",
          m = k + l;
        b.data(a, "isoTransform", e), (a.style[i] = m);
      };
    (b.cssNumber.scale = !0),
      (b.cssHooks.scale = {
        set: function (a, b) {
          p(a, "scale", b);
        },
        get: function (a, c) {
          var d = b.data(a, "isoTransform");
          return d && d.scale ? d.scale : 1;
        },
      }),
      (b.fx.step.scale = function (a) {
        b.cssHooks.scale.set(a.elem, a.now + a.unit);
      }),
      (b.cssNumber.translate = !0),
      (b.cssHooks.translate = {
        set: function (a, b) {
          p(a, "translate", b);
        },
        get: function (a, c) {
          var d = b.data(a, "isoTransform");
          return d && d.translate ? d.translate : [0, 0];
        },
      });
  }
  var q, r;
  e.csstransitions &&
    ((q = {
      WebkitTransitionProperty: "webkitTransitionEnd",
      MozTransitionProperty: "transitionend",
      OTransitionProperty: "oTransitionEnd otransitionend",
      transitionProperty: "transitionend",
    }[j]),
    (r = h("transitionDuration")));
  var s = b.event,
    t = b.event.handle ? "handle" : "dispatch",
    u;
  (s.special.smartresize = {
    setup: function () {
      b(this).bind("resize", s.special.smartresize.handler);
    },
    teardown: function () {
      b(this).unbind("resize", s.special.smartresize.handler);
    },
    handler: function (a, b) {
      var c = this,
        d = arguments;
      (a.type = "smartresize"),
        u && clearTimeout(u),
        (u = setTimeout(
          function () {
            s[t].apply(c, d);
          },
          b === "execAsap" ? 0 : 100
        ));
    },
  }),
    (b.fn.smartresize = function (a) {
      return a
        ? this.bind("smartresize", a)
        : this.trigger("smartresize", ["execAsap"]);
    }),
    (b.Isotope = function (a, c, d) {
      (this.element = b(c)), this._create(a), this._init(d);
    });
  var v = ["width", "height"],
    w = b(a);
  (b.Isotope.settings = {
    resizable: !0,
    layoutMode: "masonry",
    containerClass: "isotope",
    itemClass: "isotope-item",
    hiddenClass: "isotope-hidden",
    hiddenStyle: { opacity: 0, scale: 0.001 },
    visibleStyle: { opacity: 1, scale: 1 },
    containerStyle: { position: "relative", overflow: "hidden" },
    animationEngine: "best-available",
    animationOptions: { queue: !1, duration: 800 },
    sortBy: "original-order",
    sortAscending: !0,
    resizesContainer: !0,
    transformsEnabled: !0,
    itemPositionDataEnabled: !1,
  }),
    (b.Isotope.prototype = {
      _create: function (a) {
        (this.options = b.extend({}, b.Isotope.settings, a)),
          (this.styleQueue = []),
          (this.elemCount = 0);
        var c = this.element[0].style;
        this.originalStyle = {};
        var d = v.slice(0);
        for (var e in this.options.containerStyle) d.push(e);
        for (var f = 0, g = d.length; f < g; f++)
          (e = d[f]), (this.originalStyle[e] = c[e] || "");
        this.element.css(this.options.containerStyle),
          this._updateAnimationEngine(),
          this._updateUsingTransforms();
        var h = {
          "original-order": function (a, b) {
            return b.elemCount++, b.elemCount;
          },
          random: function () {
            return Math.random();
          },
        };
        (this.options.getSortData = b.extend(this.options.getSortData, h)),
          this.reloadItems(),
          (this.offset = {
            left: parseInt(this.element.css("padding-left") || 0, 10),
            top: parseInt(this.element.css("padding-top") || 0, 10),
          });
        var i = this;
        setTimeout(function () {
          i.element.addClass(i.options.containerClass);
        }, 0),
          this.options.resizable &&
            w.bind("smartresize.isotope", function () {
              i.resize();
            }),
          this.element.delegate(
            "." + this.options.hiddenClass,
            "click",
            function () {
              return !1;
            }
          );
      },
      _getAtoms: function (a) {
        var b = this.options.itemSelector,
          c = b ? a.filter(b).add(a.find(b)) : a,
          d = { position: "absolute" };
        return (
          (c = c.filter(function (a, b) {
            return b.nodeType === 1;
          })),
          this.usingTransforms && ((d.left = 0), (d.top = 0)),
          c.css(d).addClass(this.options.itemClass),
          this.updateSortData(c, !0),
          c
        );
      },
      _init: function (a) {
        (this.$filteredAtoms = this._filter(this.$allAtoms)),
          this._sort(),
          this.reLayout(a);
      },
      option: function (a) {
        if (b.isPlainObject(a)) {
          this.options = b.extend(!0, this.options, a);
          var c;
          for (var d in a) (c = "_update" + f(d)), this[c] && this[c]();
        }
      },
      _updateAnimationEngine: function () {
        var a = this.options.animationEngine
            .toLowerCase()
            .replace(/[ _\-]/g, ""),
          b;
        switch (a) {
          case "css":
          case "none":
            b = !1;
            break;
          case "jquery":
            b = !0;
            break;
          default:
            b = !e.csstransitions;
        }
        (this.isUsingJQueryAnimation = b), this._updateUsingTransforms();
      },
      _updateTransformsEnabled: function () {
        this._updateUsingTransforms();
      },
      _updateUsingTransforms: function () {
        var a = (this.usingTransforms =
          this.options.transformsEnabled &&
          e.csstransforms &&
          e.csstransitions &&
          !this.isUsingJQueryAnimation);
        a ||
          (delete this.options.hiddenStyle.scale,
          delete this.options.visibleStyle.scale),
          (this.getPositionStyles = a ? this._translate : this._positionAbs);
      },
      _filter: function (a) {
        var b = this.options.filter === "" ? "*" : this.options.filter;
        if (!b) return a;
        var c = this.options.hiddenClass,
          d = "." + c,
          e = a.filter(d),
          f = e;
        if (b !== "*") {
          f = e.filter(b);
          var g = a.not(d).not(b).addClass(c);
          this.styleQueue.push({ $el: g, style: this.options.hiddenStyle });
        }
        return (
          this.styleQueue.push({ $el: f, style: this.options.visibleStyle }),
          f.removeClass(c),
          a.filter(b)
        );
      },
      updateSortData: function (a, c) {
        var d = this,
          e = this.options.getSortData,
          f,
          g;
        a.each(function () {
          (f = b(this)), (g = {});
          for (var a in e)
            !c && a === "original-order"
              ? (g[a] = b.data(this, "isotope-sort-data")[a])
              : (g[a] = e[a](f, d));
          b.data(this, "isotope-sort-data", g);
        });
      },
      _sort: function () {
        var a = this.options.sortBy,
          b = this._getSorter,
          c = this.options.sortAscending ? 1 : -1,
          d = function (d, e) {
            var f = b(d, a),
              g = b(e, a);
            return (
              f === g &&
                a !== "original-order" &&
                ((f = b(d, "original-order")), (g = b(e, "original-order"))),
              (f > g ? 1 : f < g ? -1 : 0) * c
            );
          };
        this.$filteredAtoms.sort(d);
      },
      _getSorter: function (a, c) {
        return b.data(a, "isotope-sort-data")[c];
      },
      _translate: function (a, b) {
        return { translate: [a, b] };
      },
      _positionAbs: function (a, b) {
        return { left: a, top: b };
      },
      _pushPosition: function (a, b, c) {
        (b = Math.round(b + this.offset.left)),
          (c = Math.round(c + this.offset.top));
        var d = this.getPositionStyles(b, c);
        this.styleQueue.push({ $el: a, style: d }),
          this.options.itemPositionDataEnabled &&
            a.data("isotope-item-position", { x: b, y: c });
      },
      layout: function (a, b) {
        var c = this.options.layoutMode;
        this["_" + c + "Layout"](a);
        if (this.options.resizesContainer) {
          var d = this["_" + c + "GetContainerSize"]();
          this.styleQueue.push({ $el: this.element, style: d });
        }
        this._processStyleQueue(a, b), (this.isLaidOut = !0);
      },
      _processStyleQueue: function (a, c) {
        var d = this.isLaidOut
            ? this.isUsingJQueryAnimation
              ? "animate"
              : "css"
            : "css",
          f = this.options.animationOptions,
          g = this.options.onLayout,
          h,
          i,
          j,
          k;
        i = function (a, b) {
          b.$el[d](b.style, f);
        };
        if (this._isInserting && this.isUsingJQueryAnimation)
          i = function (a, b) {
            (h = b.$el.hasClass("no-transition") ? "css" : d),
              b.$el[h](b.style, f);
          };
        else if (c || g || f.complete) {
          var l = !1,
            m = [c, g, f.complete],
            n = this;
          (j = !0),
            (k = function () {
              if (l) return;
              var b;
              for (var c = 0, d = m.length; c < d; c++)
                (b = m[c]), typeof b == "function" && b.call(n.element, a, n);
              l = !0;
            });
          if (this.isUsingJQueryAnimation && d === "animate")
            (f.complete = k), (j = !1);
          else if (e.csstransitions) {
            var o = 0,
              p = this.styleQueue[0],
              s = p && p.$el,
              t;
            while (!s || !s.length) {
              t = this.styleQueue[o++];
              if (!t) return;
              s = t.$el;
            }
            var u = parseFloat(getComputedStyle(s[0])[r]);
            u > 0 &&
              ((i = function (a, b) {
                b.$el[d](b.style, f).one(q, k);
              }),
              (j = !1));
          }
        }
        b.each(this.styleQueue, i), j && k(), (this.styleQueue = []);
      },
      resize: function () {
        this["_" + this.options.layoutMode + "ResizeChanged"]() &&
          this.reLayout();
      },
      reLayout: function (a) {
        this["_" + this.options.layoutMode + "Reset"](),
          this.layout(this.$filteredAtoms, a);
      },
      addItems: function (a, b) {
        var c = this._getAtoms(a);
        (this.$allAtoms = this.$allAtoms.add(c)), b && b(c);
      },
      insert: function (a, b) {
        this.element.append(a);
        var c = this;
        this.addItems(a, function (a) {
          var d = c._filter(a);
          c._addHideAppended(d),
            c._sort(),
            c.reLayout(),
            c._revealAppended(d, b);
        });
      },
      appended: function (a, b) {
        var c = this;
        this.addItems(a, function (a) {
          c._addHideAppended(a), c.layout(a), c._revealAppended(a, b);
        });
      },
      _addHideAppended: function (a) {
        (this.$filteredAtoms = this.$filteredAtoms.add(a)),
          a.addClass("no-transition"),
          (this._isInserting = !0),
          this.styleQueue.push({ $el: a, style: this.options.hiddenStyle });
      },
      _revealAppended: function (a, b) {
        var c = this;
        setTimeout(function () {
          a.removeClass("no-transition"),
            c.styleQueue.push({ $el: a, style: c.options.visibleStyle }),
            (c._isInserting = !1),
            c._processStyleQueue(a, b);
        }, 10);
      },
      reloadItems: function () {
        this.$allAtoms = this._getAtoms(this.element.children());
      },
      remove: function (a, b) {
        (this.$allAtoms = this.$allAtoms.not(a)),
          (this.$filteredAtoms = this.$filteredAtoms.not(a));
        var c = this,
          d = function () {
            a.remove(), b && b.call(c.element);
          };
        a.filter(":not(." + this.options.hiddenClass + ")").length
          ? (this.styleQueue.push({ $el: a, style: this.options.hiddenStyle }),
            this._sort(),
            this.reLayout(d))
          : d();
      },
      shuffle: function (a) {
        this.updateSortData(this.$allAtoms),
          (this.options.sortBy = "random"),
          this._sort(),
          this.reLayout(a);
      },
      destroy: function () {
        var a = this.usingTransforms,
          b = this.options;
        this.$allAtoms
          .removeClass(b.hiddenClass + " " + b.itemClass)
          .each(function () {
            var b = this.style;
            (b.position = ""),
              (b.top = ""),
              (b.left = ""),
              (b.opacity = ""),
              a && (b[i] = "");
          });
        var c = this.element[0].style;
        for (var d in this.originalStyle) c[d] = this.originalStyle[d];
        this.element
          .unbind(".isotope")
          .undelegate("." + b.hiddenClass, "click")
          .removeClass(b.containerClass)
          .removeData("isotope"),
          w.unbind(".isotope");
      },
      _getSegments: function (a) {
        var b = this.options.layoutMode,
          c = a ? "rowHeight" : "columnWidth",
          d = a ? "height" : "width",
          e = a ? "rows" : "cols",
          g = this.element[d](),
          h,
          i =
            (this.options[b] && this.options[b][c]) ||
            this.$filteredAtoms["outer" + f(d)](!0) ||
            g;
        (h = Math.floor(g / i)),
          (h = Math.max(h, 1)),
          (this[b][e] = h),
          (this[b][c] = i);
      },
      _checkIfSegmentsChanged: function (a) {
        var b = this.options.layoutMode,
          c = a ? "rows" : "cols",
          d = this[b][c];
        return this._getSegments(a), this[b][c] !== d;
      },
      _masonryReset: function () {
        (this.masonry = {}), this._getSegments();
        var a = this.masonry.cols;
        this.masonry.colYs = [];
        while (a--) this.masonry.colYs.push(0);
      },
      _masonryLayout: function (a) {
        var c = this,
          d = c.masonry;
        a.each(function () {
          var a = b(this),
            e = Math.ceil(a.outerWidth(!0) / d.columnWidth);
          e = Math.min(e, d.cols);
          if (e === 1) c._masonryPlaceBrick(a, d.colYs);
          else {
            var f = d.cols + 1 - e,
              g = [],
              h,
              i;
            for (i = 0; i < f; i++)
              (h = d.colYs.slice(i, i + e)), (g[i] = Math.max.apply(Math, h));
            c._masonryPlaceBrick(a, g);
          }
        });
      },
      _masonryPlaceBrick: function (a, b) {
        var c = Math.min.apply(Math, b),
          d = 0;
        for (var e = 0, f = b.length; e < f; e++)
          if (b[e] === c) {
            d = e;
            break;
          }
        var g = this.masonry.columnWidth * d,
          h = c;
        this._pushPosition(a, g, h);
        var i = c + a.outerHeight(!0),
          j = this.masonry.cols + 1 - f;
        for (e = 0; e < j; e++) this.masonry.colYs[d + e] = i;
      },
      _masonryGetContainerSize: function () {
        var a = Math.max.apply(Math, this.masonry.colYs);
        return { height: a };
      },
      _masonryResizeChanged: function () {
        return this._checkIfSegmentsChanged();
      },
      _fitRowsReset: function () {
        this.fitRows = { x: 0, y: 0, height: 0 };
      },
      _fitRowsLayout: function (a) {
        var c = this,
          d = this.element.width(),
          e = this.fitRows;
        a.each(function () {
          var a = b(this),
            f = a.outerWidth(!0),
            g = a.outerHeight(!0);
          e.x !== 0 && f + e.x > d && ((e.x = 0), (e.y = e.height)),
            c._pushPosition(a, e.x, e.y),
            (e.height = Math.max(e.y + g, e.height)),
            (e.x += f);
        });
      },
      _fitRowsGetContainerSize: function () {
        return { height: this.fitRows.height };
      },
      _fitRowsResizeChanged: function () {
        return !0;
      },
      _cellsByRowReset: function () {
        (this.cellsByRow = { index: 0 }),
          this._getSegments(),
          this._getSegments(!0);
      },
      _cellsByRowLayout: function (a) {
        var c = this,
          d = this.cellsByRow;
        a.each(function () {
          var a = b(this),
            e = d.index % d.cols,
            f = Math.floor(d.index / d.cols),
            g = (e + 0.5) * d.columnWidth - a.outerWidth(!0) / 2,
            h = (f + 0.5) * d.rowHeight - a.outerHeight(!0) / 2;
          c._pushPosition(a, g, h), d.index++;
        });
      },
      _cellsByRowGetContainerSize: function () {
        return {
          height:
            Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) *
              this.cellsByRow.rowHeight +
            this.offset.top,
        };
      },
      _cellsByRowResizeChanged: function () {
        return this._checkIfSegmentsChanged();
      },
      _straightDownReset: function () {
        this.straightDown = { y: 0 };
      },
      _straightDownLayout: function (a) {
        var c = this;
        a.each(function (a) {
          var d = b(this);
          c._pushPosition(d, 0, c.straightDown.y),
            (c.straightDown.y += d.outerHeight(!0));
        });
      },
      _straightDownGetContainerSize: function () {
        return { height: this.straightDown.y };
      },
      _straightDownResizeChanged: function () {
        return !0;
      },
      _masonryHorizontalReset: function () {
        (this.masonryHorizontal = {}), this._getSegments(!0);
        var a = this.masonryHorizontal.rows;
        this.masonryHorizontal.rowXs = [];
        while (a--) this.masonryHorizontal.rowXs.push(0);
      },
      _masonryHorizontalLayout: function (a) {
        var c = this,
          d = c.masonryHorizontal;
        a.each(function () {
          var a = b(this),
            e = Math.ceil(a.outerHeight(!0) / d.rowHeight);
          e = Math.min(e, d.rows);
          if (e === 1) c._masonryHorizontalPlaceBrick(a, d.rowXs);
          else {
            var f = d.rows + 1 - e,
              g = [],
              h,
              i;
            for (i = 0; i < f; i++)
              (h = d.rowXs.slice(i, i + e)), (g[i] = Math.max.apply(Math, h));
            c._masonryHorizontalPlaceBrick(a, g);
          }
        });
      },
      _masonryHorizontalPlaceBrick: function (a, b) {
        var c = Math.min.apply(Math, b),
          d = 0;
        for (var e = 0, f = b.length; e < f; e++)
          if (b[e] === c) {
            d = e;
            break;
          }
        var g = c,
          h = this.masonryHorizontal.rowHeight * d;
        this._pushPosition(a, g, h);
        var i = c + a.outerWidth(!0),
          j = this.masonryHorizontal.rows + 1 - f;
        for (e = 0; e < j; e++) this.masonryHorizontal.rowXs[d + e] = i;
      },
      _masonryHorizontalGetContainerSize: function () {
        var a = Math.max.apply(Math, this.masonryHorizontal.rowXs);
        return { width: a };
      },
      _masonryHorizontalResizeChanged: function () {
        return this._checkIfSegmentsChanged(!0);
      },
      _fitColumnsReset: function () {
        this.fitColumns = { x: 0, y: 0, width: 0 };
      },
      _fitColumnsLayout: function (a) {
        var c = this,
          d = this.element.height(),
          e = this.fitColumns;
        a.each(function () {
          var a = b(this),
            f = a.outerWidth(!0),
            g = a.outerHeight(!0);
          e.y !== 0 && g + e.y > d && ((e.x = e.width), (e.y = 0)),
            c._pushPosition(a, e.x, e.y),
            (e.width = Math.max(e.x + f, e.width)),
            (e.y += g);
        });
      },
      _fitColumnsGetContainerSize: function () {
        return { width: this.fitColumns.width };
      },
      _fitColumnsResizeChanged: function () {
        return !0;
      },
      _cellsByColumnReset: function () {
        (this.cellsByColumn = { index: 0 }),
          this._getSegments(),
          this._getSegments(!0);
      },
      _cellsByColumnLayout: function (a) {
        var c = this,
          d = this.cellsByColumn;
        a.each(function () {
          var a = b(this),
            e = Math.floor(d.index / d.rows),
            f = d.index % d.rows,
            g = (e + 0.5) * d.columnWidth - a.outerWidth(!0) / 2,
            h = (f + 0.5) * d.rowHeight - a.outerHeight(!0) / 2;
          c._pushPosition(a, g, h), d.index++;
        });
      },
      _cellsByColumnGetContainerSize: function () {
        return {
          width:
            Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) *
            this.cellsByColumn.columnWidth,
        };
      },
      _cellsByColumnResizeChanged: function () {
        return this._checkIfSegmentsChanged(!0);
      },
      _straightAcrossReset: function () {
        this.straightAcross = { x: 0 };
      },
      _straightAcrossLayout: function (a) {
        var c = this;
        a.each(function (a) {
          var d = b(this);
          c._pushPosition(d, c.straightAcross.x, 0),
            (c.straightAcross.x += d.outerWidth(!0));
        });
      },
      _straightAcrossGetContainerSize: function () {
        return { width: this.straightAcross.x };
      },
      _straightAcrossResizeChanged: function () {
        return !0;
      },
    }),
    (b.fn.imagesLoaded = function (a) {
      function h() {
        a.call(c, d);
      }
      function i(a) {
        var c = a.target;
        c.src !== f &&
          b.inArray(c, g) === -1 &&
          (g.push(c),
          --e <= 0 && (setTimeout(h), d.unbind(".imagesLoaded", i)));
      }
      var c = this,
        d = c.find("img").add(c.filter("img")),
        e = d.length,
        f =
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
        g = [];
      return (
        e || h(),
        d.bind("load.imagesLoaded error.imagesLoaded", i).each(function () {
          var a = this.src;
          (this.src = f), (this.src = a);
        }),
        c
      );
    });
  var x = function (b) {
    a.console && a.console.error(b);
  };
  b.fn.isotope = function (a, c) {
    if (typeof a == "string") {
      var d = Array.prototype.slice.call(arguments, 1);
      this.each(function () {
        var c = b.data(this, "isotope");
        if (!c) {
          x(
            "cannot call methods on isotope prior to initialization; attempted to call method '" +
              a +
              "'"
          );
          return;
        }
        if (!b.isFunction(c[a]) || a.charAt(0) === "_") {
          x("no such method '" + a + "' for isotope instance");
          return;
        }
        c[a].apply(c, d);
      });
    } else
      this.each(function () {
        var d = b.data(this, "isotope");
        d
          ? (d.option(a), d._init(c))
          : b.data(this, "isotope", new b.Isotope(a, this, c));
      });
    return this;
  };
})(window, jQuery);
/*! FitVids */
!(function (t) {
  "use strict";
  t.fn.fitVids = function (e) {
    var i = { customSelector: null };
    if (!document.getElementById("fit-vids-style")) {
      var r = document.createElement("div"),
        a =
          document.getElementsByTagName("base")[0] ||
          document.getElementsByTagName("script")[0],
        o =
          "&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>";
      (r.className = "fit-vids-style"),
        (r.id = "fit-vids-style"),
        (r.style.display = "none"),
        (r.innerHTML = o),
        a.parentNode.insertBefore(r, a);
    }
    return (
      e && t.extend(i, e),
      this.each(function () {
        var e = [
          "iframe[src*='player.vimeo.com']",
          "iframe[src*='youtube.com']",
          "iframe[src*='youtube-nocookie.com']",
          "iframe[src*='kickstarter.com'][src*='video.html']",
          "object",
          "embed",
        ];
        i.customSelector && e.push(i.customSelector);
        var r = t(this).find(e.join(","));
        (r = r.not("object object")),
          r.each(function () {
            var e = t(this);
            if (
              !(
                ("embed" === this.tagName.toLowerCase() &&
                  e.parent("object").length) ||
                e.parent(".fluid-width-video-wrapper").length
              )
            ) {
              var i =
                  "object" === this.tagName.toLowerCase() ||
                  (e.attr("height") && !isNaN(parseInt(e.attr("height"), 10)))
                    ? parseInt(e.attr("height"), 10)
                    : e.height(),
                r = isNaN(parseInt(e.attr("width"), 10))
                  ? e.width()
                  : parseInt(e.attr("width"), 10),
                a = i / r;
              if (!e.attr("id")) {
                var o = "fitvid" + Math.floor(999999 * Math.random());
                e.attr("id", o);
              }
              e
                .wrap('<div class="fluid-width-video-wrapper"></div>')
                .parent(".fluid-width-video-wrapper")
                .css("padding-top", 100 * a + "%"),
                e.removeAttr("height").removeAttr("width");
            }
          });
      })
    );
  };
})(window.jQuery || window.Zepto);
/*! jQuery Nice Select */
!(function (e) {
  e.fn.niceSelect = function (t) {
    function s(t) {
      t.after(
        e("<div></div>")
          .addClass("nice-select")
          .addClass(t.attr("class") || "")
          .addClass(t.attr("disabled") ? "disabled" : "")
          .attr("tabindex", t.attr("disabled") ? null : "0")
          .html('<span class="current"></span><ul class="list"></ul>')
      );
      var s = t.next(),
        n = t.find("option"),
        i = t.find("option:selected");
      s.find(".current").html(i.data("display") || i.text()),
        n.each(function (t) {
          var n = e(this),
            i = n.data("display");
          s.find("ul").append(
            e("<li></li>")
              .attr("data-value", n.val())
              .attr("data-display", i || null)
              .addClass(
                "option" +
                  (n.is(":selected") ? " selected" : "") +
                  (n.is(":disabled") ? " disabled" : "")
              )
              .html(n.text())
          );
        });
    }
    if ("string" == typeof t)
      return (
        "update" == t
          ? this.each(function () {
              var t = e(this),
                n = e(this).next(".nice-select"),
                i = n.hasClass("open");
              n.length && (n.remove(), s(t), i && t.next().trigger("click"));
            })
          : "destroy" == t
          ? (this.each(function () {
              var t = e(this),
                s = e(this).next(".nice-select");
              s.length && (s.remove(), t.css("display", ""));
            }),
            0 == e(".nice-select").length && e(document).off(".nice_select"))
          : console.log('Method "' + t + '" does not exist.'),
        this
      );
    this.hide(),
      this.each(function () {
        var t = e(this);
        t.next().hasClass("nice-select") || s(t);
      }),
      e(document).off(".nice_select"),
      e(document).on("click.nice_select", ".nice-select", function (t) {
        var s = e(this);
        e(".nice-select").not(s).removeClass("open"),
          s.toggleClass("open"),
          s.hasClass("open")
            ? (s.find(".option"),
              s.find(".focus").removeClass("focus"),
              s.find(".selected").addClass("focus"))
            : s.focus();
      }),
      e(document).on("click.nice_select", function (t) {
        0 === e(t.target).closest(".nice-select").length &&
          e(".nice-select").removeClass("open").find(".option");
      }),
      e(document).on(
        "click.nice_select",
        ".nice-select .option:not(.disabled)",
        function (t) {
          var s = e(this),
            n = s.closest(".nice-select");
          n.find(".selected").removeClass("selected"), s.addClass("selected");
          var i = s.data("display") || s.text();
          n.find(".current").text(i),
            n.prev("select").val(s.data("value")).trigger("change");
        }
      ),
      e(document).on("keydown.nice_select", ".nice-select", function (t) {
        var s = e(this),
          n = e(s.find(".focus") || s.find(".list .option.selected"));
        if (32 == t.keyCode || 13 == t.keyCode)
          return (
            s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1
          );
        if (40 == t.keyCode) {
          if (s.hasClass("open")) {
            var i = n.nextAll(".option:not(.disabled)").first();
            i.length > 0 &&
              (s.find(".focus").removeClass("focus"), i.addClass("focus"));
          } else s.trigger("click");
          return !1;
        }
        if (38 == t.keyCode) {
          if (s.hasClass("open")) {
            var l = n.prevAll(".option:not(.disabled)").first();
            l.length > 0 &&
              (s.find(".focus").removeClass("focus"), l.addClass("focus"));
          } else s.trigger("click");
          return !1;
        }
        if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");
        else if (9 == t.keyCode && s.hasClass("open")) return !1;
      });
    var n = document.createElement("a").style;
    return (
      (n.cssText = "pointer-events:auto"),
      "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"),
      this
    );
  };
})(jQuery);
