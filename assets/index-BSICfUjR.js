function lC(e, i) {
  for (var a = 0; a < i.length; a++) {
    const s = i[a];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const l in s)
        if (l !== "default" && !(l in e)) {
          const u = Object.getOwnPropertyDescriptor(s, l);
          u &&
            Object.defineProperty(
              e,
              l,
              u.get ? u : { enumerable: !0, get: () => s[l] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const i = document.createElement("link").relList;
  if (i && i.supports && i.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) s(l);
  new MutationObserver((l) => {
    for (const u of l)
      if (u.type === "childList")
        for (const f of u.addedNodes)
          f.tagName === "LINK" && f.rel === "modulepreload" && s(f);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(l) {
    const u = {};
    return (
      l.integrity && (u.integrity = l.integrity),
      l.referrerPolicy && (u.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (u.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (u.credentials = "omit")
          : (u.credentials = "same-origin"),
      u
    );
  }
  function s(l) {
    if (l.ep) return;
    l.ep = !0;
    const u = a(l);
    fetch(l.href, u);
  }
})();
function ox(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Hf = { exports: {} },
  gs = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jv;
function uC() {
  if (jv) return gs;
  jv = 1;
  var e = Symbol.for("react.transitional.element"),
    i = Symbol.for("react.fragment");
  function a(s, l, u) {
    var f = null;
    if (
      (u !== void 0 && (f = "" + u),
      l.key !== void 0 && (f = "" + l.key),
      "key" in l)
    ) {
      u = {};
      for (var h in l) h !== "key" && (u[h] = l[h]);
    } else u = l;
    return (
      (l = u.ref),
      { $$typeof: e, type: s, key: f, ref: l !== void 0 ? l : null, props: u }
    );
  }
  return ((gs.Fragment = i), (gs.jsx = a), (gs.jsxs = a), gs);
}
var _v;
function cC() {
  return (_v || ((_v = 1), (Hf.exports = uC())), Hf.exports);
}
var x = cC(),
  qf = { exports: {} },
  ys = {},
  Ff = { exports: {} },
  Gf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Lv;
function fC() {
  return (
    Lv ||
      ((Lv = 1),
      (function (e) {
        function i(z, G) {
          var U = z.length;
          z.push(G);
          e: for (; 0 < U; ) {
            var ae = (U - 1) >>> 1,
              ce = z[ae];
            if (0 < l(ce, G)) ((z[ae] = G), (z[U] = ce), (U = ae));
            else break e;
          }
        }
        function a(z) {
          return z.length === 0 ? null : z[0];
        }
        function s(z) {
          if (z.length === 0) return null;
          var G = z[0],
            U = z.pop();
          if (U !== G) {
            z[0] = U;
            e: for (var ae = 0, ce = z.length, N = ce >>> 1; ae < N; ) {
              var I = 2 * (ae + 1) - 1,
                Z = z[I],
                W = I + 1,
                fe = z[W];
              if (0 > l(Z, U))
                W < ce && 0 > l(fe, Z)
                  ? ((z[ae] = fe), (z[W] = U), (ae = W))
                  : ((z[ae] = Z), (z[I] = U), (ae = I));
              else if (W < ce && 0 > l(fe, U))
                ((z[ae] = fe), (z[W] = U), (ae = W));
              else break e;
            }
          }
          return G;
        }
        function l(z, G) {
          var U = z.sortIndex - G.sortIndex;
          return U !== 0 ? U : z.id - G.id;
        }
        if (
          ((e.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var u = performance;
          e.unstable_now = function () {
            return u.now();
          };
        } else {
          var f = Date,
            h = f.now();
          e.unstable_now = function () {
            return f.now() - h;
          };
        }
        var m = [],
          p = [],
          g = 1,
          y = null,
          S = 3,
          T = !1,
          C = !1,
          E = !1,
          A = !1,
          R = typeof setTimeout == "function" ? setTimeout : null,
          M = typeof clearTimeout == "function" ? clearTimeout : null,
          O = typeof setImmediate < "u" ? setImmediate : null;
        function V(z) {
          for (var G = a(p); G !== null; ) {
            if (G.callback === null) s(p);
            else if (G.startTime <= z)
              (s(p), (G.sortIndex = G.expirationTime), i(m, G));
            else break;
            G = a(p);
          }
        }
        function L(z) {
          if (((E = !1), V(z), !C))
            if (a(m) !== null) ((C = !0), $ || (($ = !0), ge()));
            else {
              var G = a(p);
              G !== null && he(L, G.startTime - z);
            }
        }
        var $ = !1,
          H = -1,
          F = 5,
          J = -1;
        function se() {
          return A ? !0 : !(e.unstable_now() - J < F);
        }
        function me() {
          if (((A = !1), $)) {
            var z = e.unstable_now();
            J = z;
            var G = !0;
            try {
              e: {
                ((C = !1), E && ((E = !1), M(H), (H = -1)), (T = !0));
                var U = S;
                try {
                  t: {
                    for (
                      V(z), y = a(m);
                      y !== null && !(y.expirationTime > z && se());
                    ) {
                      var ae = y.callback;
                      if (typeof ae == "function") {
                        ((y.callback = null), (S = y.priorityLevel));
                        var ce = ae(y.expirationTime <= z);
                        if (((z = e.unstable_now()), typeof ce == "function")) {
                          ((y.callback = ce), V(z), (G = !0));
                          break t;
                        }
                        (y === a(m) && s(m), V(z));
                      } else s(m);
                      y = a(m);
                    }
                    if (y !== null) G = !0;
                    else {
                      var N = a(p);
                      (N !== null && he(L, N.startTime - z), (G = !1));
                    }
                  }
                  break e;
                } finally {
                  ((y = null), (S = U), (T = !1));
                }
                G = void 0;
              }
            } finally {
              G ? ge() : ($ = !1);
            }
          }
        }
        var ge;
        if (typeof O == "function")
          ge = function () {
            O(me);
          };
        else if (typeof MessageChannel < "u") {
          var Ae = new MessageChannel(),
            ee = Ae.port2;
          ((Ae.port1.onmessage = me),
            (ge = function () {
              ee.postMessage(null);
            }));
        } else
          ge = function () {
            R(me, 0);
          };
        function he(z, G) {
          H = R(function () {
            z(e.unstable_now());
          }, G);
        }
        ((e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (z) {
            z.callback = null;
          }),
          (e.unstable_forceFrameRate = function (z) {
            0 > z || 125 < z
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (F = 0 < z ? Math.floor(1e3 / z) : 5);
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return S;
          }),
          (e.unstable_next = function (z) {
            switch (S) {
              case 1:
              case 2:
              case 3:
                var G = 3;
                break;
              default:
                G = S;
            }
            var U = S;
            S = G;
            try {
              return z();
            } finally {
              S = U;
            }
          }),
          (e.unstable_requestPaint = function () {
            A = !0;
          }),
          (e.unstable_runWithPriority = function (z, G) {
            switch (z) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                z = 3;
            }
            var U = S;
            S = z;
            try {
              return G();
            } finally {
              S = U;
            }
          }),
          (e.unstable_scheduleCallback = function (z, G, U) {
            var ae = e.unstable_now();
            switch (
              (typeof U == "object" && U !== null
                ? ((U = U.delay),
                  (U = typeof U == "number" && 0 < U ? ae + U : ae))
                : (U = ae),
              z)
            ) {
              case 1:
                var ce = -1;
                break;
              case 2:
                ce = 250;
                break;
              case 5:
                ce = 1073741823;
                break;
              case 4:
                ce = 1e4;
                break;
              default:
                ce = 5e3;
            }
            return (
              (ce = U + ce),
              (z = {
                id: g++,
                callback: G,
                priorityLevel: z,
                startTime: U,
                expirationTime: ce,
                sortIndex: -1,
              }),
              U > ae
                ? ((z.sortIndex = U),
                  i(p, z),
                  a(m) === null &&
                    z === a(p) &&
                    (E ? (M(H), (H = -1)) : (E = !0), he(L, U - ae)))
                : ((z.sortIndex = ce),
                  i(m, z),
                  C || T || ((C = !0), $ || (($ = !0), ge()))),
              z
            );
          }),
          (e.unstable_shouldYield = se),
          (e.unstable_wrapCallback = function (z) {
            var G = S;
            return function () {
              var U = S;
              S = G;
              try {
                return z.apply(this, arguments);
              } finally {
                S = U;
              }
            };
          }));
      })(Gf)),
    Gf
  );
}
var zv;
function dC() {
  return (zv || ((zv = 1), (Ff.exports = fC())), Ff.exports);
}
var Yf = { exports: {} },
  pe = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Pv;
function hC() {
  if (Pv) return pe;
  Pv = 1;
  var e = Symbol.for("react.transitional.element"),
    i = Symbol.for("react.portal"),
    a = Symbol.for("react.fragment"),
    s = Symbol.for("react.strict_mode"),
    l = Symbol.for("react.profiler"),
    u = Symbol.for("react.consumer"),
    f = Symbol.for("react.context"),
    h = Symbol.for("react.forward_ref"),
    m = Symbol.for("react.suspense"),
    p = Symbol.for("react.memo"),
    g = Symbol.for("react.lazy"),
    y = Symbol.for("react.activity"),
    S = Symbol.iterator;
  function T(N) {
    return N === null || typeof N != "object"
      ? null
      : ((N = (S && N[S]) || N["@@iterator"]),
        typeof N == "function" ? N : null);
  }
  var C = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    E = Object.assign,
    A = {};
  function R(N, I, Z) {
    ((this.props = N),
      (this.context = I),
      (this.refs = A),
      (this.updater = Z || C));
  }
  ((R.prototype.isReactComponent = {}),
    (R.prototype.setState = function (N, I) {
      if (typeof N != "object" && typeof N != "function" && N != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, N, I, "setState");
    }),
    (R.prototype.forceUpdate = function (N) {
      this.updater.enqueueForceUpdate(this, N, "forceUpdate");
    }));
  function M() {}
  M.prototype = R.prototype;
  function O(N, I, Z) {
    ((this.props = N),
      (this.context = I),
      (this.refs = A),
      (this.updater = Z || C));
  }
  var V = (O.prototype = new M());
  ((V.constructor = O), E(V, R.prototype), (V.isPureReactComponent = !0));
  var L = Array.isArray;
  function $() {}
  var H = { H: null, A: null, T: null, S: null },
    F = Object.prototype.hasOwnProperty;
  function J(N, I, Z) {
    var W = Z.ref;
    return {
      $$typeof: e,
      type: N,
      key: I,
      ref: W !== void 0 ? W : null,
      props: Z,
    };
  }
  function se(N, I) {
    return J(N.type, I, N.props);
  }
  function me(N) {
    return typeof N == "object" && N !== null && N.$$typeof === e;
  }
  function ge(N) {
    var I = { "=": "=0", ":": "=2" };
    return (
      "$" +
      N.replace(/[=:]/g, function (Z) {
        return I[Z];
      })
    );
  }
  var Ae = /\/+/g;
  function ee(N, I) {
    return typeof N == "object" && N !== null && N.key != null
      ? ge("" + N.key)
      : I.toString(36);
  }
  function he(N) {
    switch (N.status) {
      case "fulfilled":
        return N.value;
      case "rejected":
        throw N.reason;
      default:
        switch (
          (typeof N.status == "string"
            ? N.then($, $)
            : ((N.status = "pending"),
              N.then(
                function (I) {
                  N.status === "pending" &&
                    ((N.status = "fulfilled"), (N.value = I));
                },
                function (I) {
                  N.status === "pending" &&
                    ((N.status = "rejected"), (N.reason = I));
                },
              )),
          N.status)
        ) {
          case "fulfilled":
            return N.value;
          case "rejected":
            throw N.reason;
        }
    }
    throw N;
  }
  function z(N, I, Z, W, fe) {
    var ye = typeof N;
    (ye === "undefined" || ye === "boolean") && (N = null);
    var oe = !1;
    if (N === null) oe = !0;
    else
      switch (ye) {
        case "bigint":
        case "string":
        case "number":
          oe = !0;
          break;
        case "object":
          switch (N.$$typeof) {
            case e:
            case i:
              oe = !0;
              break;
            case g:
              return ((oe = N._init), z(oe(N._payload), I, Z, W, fe));
          }
      }
    if (oe)
      return (
        (fe = fe(N)),
        (oe = W === "" ? "." + ee(N, 0) : W),
        L(fe)
          ? ((Z = ""),
            oe != null && (Z = oe.replace(Ae, "$&/") + "/"),
            z(fe, I, Z, "", function (Ft) {
              return Ft;
            }))
          : fe != null &&
            (me(fe) &&
              (fe = se(
                fe,
                Z +
                  (fe.key == null || (N && N.key === fe.key)
                    ? ""
                    : ("" + fe.key).replace(Ae, "$&/") + "/") +
                  oe,
              )),
            I.push(fe)),
        1
      );
    oe = 0;
    var Ie = W === "" ? "." : W + ":";
    if (L(N))
      for (var je = 0; je < N.length; je++)
        ((W = N[je]), (ye = Ie + ee(W, je)), (oe += z(W, I, Z, ye, fe)));
    else if (((je = T(N)), typeof je == "function"))
      for (N = je.call(N), je = 0; !(W = N.next()).done; )
        ((W = W.value), (ye = Ie + ee(W, je++)), (oe += z(W, I, Z, ye, fe)));
    else if (ye === "object") {
      if (typeof N.then == "function") return z(he(N), I, Z, W, fe);
      throw (
        (I = String(N)),
        Error(
          "Objects are not valid as a React child (found: " +
            (I === "[object Object]"
              ? "object with keys {" + Object.keys(N).join(", ") + "}"
              : I) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return oe;
  }
  function G(N, I, Z) {
    if (N == null) return N;
    var W = [],
      fe = 0;
    return (
      z(N, W, "", "", function (ye) {
        return I.call(Z, ye, fe++);
      }),
      W
    );
  }
  function U(N) {
    if (N._status === -1) {
      var I = N._result;
      ((I = I()),
        I.then(
          function (Z) {
            (N._status === 0 || N._status === -1) &&
              ((N._status = 1), (N._result = Z));
          },
          function (Z) {
            (N._status === 0 || N._status === -1) &&
              ((N._status = 2), (N._result = Z));
          },
        ),
        N._status === -1 && ((N._status = 0), (N._result = I)));
    }
    if (N._status === 1) return N._result.default;
    throw N._result;
  }
  var ae =
      typeof reportError == "function"
        ? reportError
        : function (N) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var I = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof N == "object" &&
                  N !== null &&
                  typeof N.message == "string"
                    ? String(N.message)
                    : String(N),
                error: N,
              });
              if (!window.dispatchEvent(I)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", N);
              return;
            }
            console.error(N);
          },
    ce = {
      map: G,
      forEach: function (N, I, Z) {
        G(
          N,
          function () {
            I.apply(this, arguments);
          },
          Z,
        );
      },
      count: function (N) {
        var I = 0;
        return (
          G(N, function () {
            I++;
          }),
          I
        );
      },
      toArray: function (N) {
        return (
          G(N, function (I) {
            return I;
          }) || []
        );
      },
      only: function (N) {
        if (!me(N))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return N;
      },
    };
  return (
    (pe.Activity = y),
    (pe.Children = ce),
    (pe.Component = R),
    (pe.Fragment = a),
    (pe.Profiler = l),
    (pe.PureComponent = O),
    (pe.StrictMode = s),
    (pe.Suspense = m),
    (pe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = H),
    (pe.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (N) {
        return H.H.useMemoCache(N);
      },
    }),
    (pe.cache = function (N) {
      return function () {
        return N.apply(null, arguments);
      };
    }),
    (pe.cacheSignal = function () {
      return null;
    }),
    (pe.cloneElement = function (N, I, Z) {
      if (N == null)
        throw Error(
          "The argument must be a React element, but you passed " + N + ".",
        );
      var W = E({}, N.props),
        fe = N.key;
      if (I != null)
        for (ye in (I.key !== void 0 && (fe = "" + I.key), I))
          !F.call(I, ye) ||
            ye === "key" ||
            ye === "__self" ||
            ye === "__source" ||
            (ye === "ref" && I.ref === void 0) ||
            (W[ye] = I[ye]);
      var ye = arguments.length - 2;
      if (ye === 1) W.children = Z;
      else if (1 < ye) {
        for (var oe = Array(ye), Ie = 0; Ie < ye; Ie++)
          oe[Ie] = arguments[Ie + 2];
        W.children = oe;
      }
      return J(N.type, fe, W);
    }),
    (pe.createContext = function (N) {
      return (
        (N = {
          $$typeof: f,
          _currentValue: N,
          _currentValue2: N,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (N.Provider = N),
        (N.Consumer = { $$typeof: u, _context: N }),
        N
      );
    }),
    (pe.createElement = function (N, I, Z) {
      var W,
        fe = {},
        ye = null;
      if (I != null)
        for (W in (I.key !== void 0 && (ye = "" + I.key), I))
          F.call(I, W) &&
            W !== "key" &&
            W !== "__self" &&
            W !== "__source" &&
            (fe[W] = I[W]);
      var oe = arguments.length - 2;
      if (oe === 1) fe.children = Z;
      else if (1 < oe) {
        for (var Ie = Array(oe), je = 0; je < oe; je++)
          Ie[je] = arguments[je + 2];
        fe.children = Ie;
      }
      if (N && N.defaultProps)
        for (W in ((oe = N.defaultProps), oe))
          fe[W] === void 0 && (fe[W] = oe[W]);
      return J(N, ye, fe);
    }),
    (pe.createRef = function () {
      return { current: null };
    }),
    (pe.forwardRef = function (N) {
      return { $$typeof: h, render: N };
    }),
    (pe.isValidElement = me),
    (pe.lazy = function (N) {
      return { $$typeof: g, _payload: { _status: -1, _result: N }, _init: U };
    }),
    (pe.memo = function (N, I) {
      return { $$typeof: p, type: N, compare: I === void 0 ? null : I };
    }),
    (pe.startTransition = function (N) {
      var I = H.T,
        Z = {};
      H.T = Z;
      try {
        var W = N(),
          fe = H.S;
        (fe !== null && fe(Z, W),
          typeof W == "object" &&
            W !== null &&
            typeof W.then == "function" &&
            W.then($, ae));
      } catch (ye) {
        ae(ye);
      } finally {
        (I !== null && Z.types !== null && (I.types = Z.types), (H.T = I));
      }
    }),
    (pe.unstable_useCacheRefresh = function () {
      return H.H.useCacheRefresh();
    }),
    (pe.use = function (N) {
      return H.H.use(N);
    }),
    (pe.useActionState = function (N, I, Z) {
      return H.H.useActionState(N, I, Z);
    }),
    (pe.useCallback = function (N, I) {
      return H.H.useCallback(N, I);
    }),
    (pe.useContext = function (N) {
      return H.H.useContext(N);
    }),
    (pe.useDebugValue = function () {}),
    (pe.useDeferredValue = function (N, I) {
      return H.H.useDeferredValue(N, I);
    }),
    (pe.useEffect = function (N, I) {
      return H.H.useEffect(N, I);
    }),
    (pe.useEffectEvent = function (N) {
      return H.H.useEffectEvent(N);
    }),
    (pe.useId = function () {
      return H.H.useId();
    }),
    (pe.useImperativeHandle = function (N, I, Z) {
      return H.H.useImperativeHandle(N, I, Z);
    }),
    (pe.useInsertionEffect = function (N, I) {
      return H.H.useInsertionEffect(N, I);
    }),
    (pe.useLayoutEffect = function (N, I) {
      return H.H.useLayoutEffect(N, I);
    }),
    (pe.useMemo = function (N, I) {
      return H.H.useMemo(N, I);
    }),
    (pe.useOptimistic = function (N, I) {
      return H.H.useOptimistic(N, I);
    }),
    (pe.useReducer = function (N, I, Z) {
      return H.H.useReducer(N, I, Z);
    }),
    (pe.useRef = function (N) {
      return H.H.useRef(N);
    }),
    (pe.useState = function (N) {
      return H.H.useState(N);
    }),
    (pe.useSyncExternalStore = function (N, I, Z) {
      return H.H.useSyncExternalStore(N, I, Z);
    }),
    (pe.useTransition = function () {
      return H.H.useTransition();
    }),
    (pe.version = "19.2.0"),
    pe
  );
}
var Vv;
function ru() {
  return (Vv || ((Vv = 1), (Yf.exports = hC())), Yf.exports);
}
var If = { exports: {} },
  mt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var kv;
function mC() {
  if (kv) return mt;
  kv = 1;
  var e = ru();
  function i(m) {
    var p = "https://react.dev/errors/" + m;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        p += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return (
      "Minified React error #" +
      m +
      "; visit " +
      p +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function a() {}
  var s = {
      d: {
        f: a,
        r: function () {
          throw Error(i(522));
        },
        D: a,
        C: a,
        L: a,
        m: a,
        X: a,
        S: a,
        M: a,
      },
      p: 0,
      findDOMNode: null,
    },
    l = Symbol.for("react.portal");
  function u(m, p, g) {
    var y =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: l,
      key: y == null ? null : "" + y,
      children: m,
      containerInfo: p,
      implementation: g,
    };
  }
  var f = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(m, p) {
    if (m === "font") return "";
    if (typeof p == "string") return p === "use-credentials" ? p : "";
  }
  return (
    (mt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (mt.createPortal = function (m, p) {
      var g =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!p || (p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11))
        throw Error(i(299));
      return u(m, p, null, g);
    }),
    (mt.flushSync = function (m) {
      var p = f.T,
        g = s.p;
      try {
        if (((f.T = null), (s.p = 2), m)) return m();
      } finally {
        ((f.T = p), (s.p = g), s.d.f());
      }
    }),
    (mt.preconnect = function (m, p) {
      typeof m == "string" &&
        (p
          ? ((p = p.crossOrigin),
            (p =
              typeof p == "string"
                ? p === "use-credentials"
                  ? p
                  : ""
                : void 0))
          : (p = null),
        s.d.C(m, p));
    }),
    (mt.prefetchDNS = function (m) {
      typeof m == "string" && s.d.D(m);
    }),
    (mt.preinit = function (m, p) {
      if (typeof m == "string" && p && typeof p.as == "string") {
        var g = p.as,
          y = h(g, p.crossOrigin),
          S = typeof p.integrity == "string" ? p.integrity : void 0,
          T = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
        g === "style"
          ? s.d.S(m, typeof p.precedence == "string" ? p.precedence : void 0, {
              crossOrigin: y,
              integrity: S,
              fetchPriority: T,
            })
          : g === "script" &&
            s.d.X(m, {
              crossOrigin: y,
              integrity: S,
              fetchPriority: T,
              nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            });
      }
    }),
    (mt.preinitModule = function (m, p) {
      if (typeof m == "string")
        if (typeof p == "object" && p !== null) {
          if (p.as == null || p.as === "script") {
            var g = h(p.as, p.crossOrigin);
            s.d.M(m, {
              crossOrigin: g,
              integrity: typeof p.integrity == "string" ? p.integrity : void 0,
              nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            });
          }
        } else p == null && s.d.M(m);
    }),
    (mt.preload = function (m, p) {
      if (
        typeof m == "string" &&
        typeof p == "object" &&
        p !== null &&
        typeof p.as == "string"
      ) {
        var g = p.as,
          y = h(g, p.crossOrigin);
        s.d.L(m, g, {
          crossOrigin: y,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          nonce: typeof p.nonce == "string" ? p.nonce : void 0,
          type: typeof p.type == "string" ? p.type : void 0,
          fetchPriority:
            typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
          referrerPolicy:
            typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
          imageSrcSet:
            typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
          imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
          media: typeof p.media == "string" ? p.media : void 0,
        });
      }
    }),
    (mt.preloadModule = function (m, p) {
      if (typeof m == "string")
        if (p) {
          var g = h(p.as, p.crossOrigin);
          s.d.m(m, {
            as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
            crossOrigin: g,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          });
        } else s.d.m(m);
    }),
    (mt.requestFormReset = function (m) {
      s.d.r(m);
    }),
    (mt.unstable_batchedUpdates = function (m, p) {
      return m(p);
    }),
    (mt.useFormState = function (m, p, g) {
      return f.H.useFormState(m, p, g);
    }),
    (mt.useFormStatus = function () {
      return f.H.useHostTransitionStatus();
    }),
    (mt.version = "19.2.0"),
    mt
  );
}
var Bv;
function lx() {
  if (Bv) return If.exports;
  Bv = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (i) {
        console.error(i);
      }
  }
  return (e(), (If.exports = mC()), If.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Uv;
function pC() {
  if (Uv) return ys;
  Uv = 1;
  var e = dC(),
    i = ru(),
    a = lx();
  function s(t) {
    var n = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var r = 2; r < arguments.length; r++)
        n += "&args[]=" + encodeURIComponent(arguments[r]);
    }
    return (
      "Minified React error #" +
      t +
      "; visit " +
      n +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function l(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function u(t) {
    var n = t,
      r = t;
    if (t.alternate) for (; n.return; ) n = n.return;
    else {
      t = n;
      do ((n = t), (n.flags & 4098) !== 0 && (r = n.return), (t = n.return));
      while (t);
    }
    return n.tag === 3 ? r : null;
  }
  function f(t) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        (n === null && ((t = t.alternate), t !== null && (n = t.memoizedState)),
        n !== null)
      )
        return n.dehydrated;
    }
    return null;
  }
  function h(t) {
    if (t.tag === 31) {
      var n = t.memoizedState;
      if (
        (n === null && ((t = t.alternate), t !== null && (n = t.memoizedState)),
        n !== null)
      )
        return n.dehydrated;
    }
    return null;
  }
  function m(t) {
    if (u(t) !== t) throw Error(s(188));
  }
  function p(t) {
    var n = t.alternate;
    if (!n) {
      if (((n = u(t)), n === null)) throw Error(s(188));
      return n !== t ? null : t;
    }
    for (var r = t, o = n; ; ) {
      var c = r.return;
      if (c === null) break;
      var d = c.alternate;
      if (d === null) {
        if (((o = c.return), o !== null)) {
          r = o;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === r) return (m(c), t);
          if (d === o) return (m(c), n);
          d = d.sibling;
        }
        throw Error(s(188));
      }
      if (r.return !== o.return) ((r = c), (o = d));
      else {
        for (var v = !1, w = c.child; w; ) {
          if (w === r) {
            ((v = !0), (r = c), (o = d));
            break;
          }
          if (w === o) {
            ((v = !0), (o = c), (r = d));
            break;
          }
          w = w.sibling;
        }
        if (!v) {
          for (w = d.child; w; ) {
            if (w === r) {
              ((v = !0), (r = d), (o = c));
              break;
            }
            if (w === o) {
              ((v = !0), (o = d), (r = c));
              break;
            }
            w = w.sibling;
          }
          if (!v) throw Error(s(189));
        }
      }
      if (r.alternate !== o) throw Error(s(190));
    }
    if (r.tag !== 3) throw Error(s(188));
    return r.stateNode.current === r ? t : n;
  }
  function g(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((n = g(t)), n !== null)) return n;
      t = t.sibling;
    }
    return null;
  }
  var y = Object.assign,
    S = Symbol.for("react.element"),
    T = Symbol.for("react.transitional.element"),
    C = Symbol.for("react.portal"),
    E = Symbol.for("react.fragment"),
    A = Symbol.for("react.strict_mode"),
    R = Symbol.for("react.profiler"),
    M = Symbol.for("react.consumer"),
    O = Symbol.for("react.context"),
    V = Symbol.for("react.forward_ref"),
    L = Symbol.for("react.suspense"),
    $ = Symbol.for("react.suspense_list"),
    H = Symbol.for("react.memo"),
    F = Symbol.for("react.lazy"),
    J = Symbol.for("react.activity"),
    se = Symbol.for("react.memo_cache_sentinel"),
    me = Symbol.iterator;
  function ge(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (me && t[me]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var Ae = Symbol.for("react.client.reference");
  function ee(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Ae ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case E:
        return "Fragment";
      case R:
        return "Profiler";
      case A:
        return "StrictMode";
      case L:
        return "Suspense";
      case $:
        return "SuspenseList";
      case J:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case C:
          return "Portal";
        case O:
          return t.displayName || "Context";
        case M:
          return (t._context.displayName || "Context") + ".Consumer";
        case V:
          var n = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = n.displayName || n.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case H:
          return (
            (n = t.displayName || null),
            n !== null ? n : ee(t.type) || "Memo"
          );
        case F:
          ((n = t._payload), (t = t._init));
          try {
            return ee(t(n));
          } catch {}
      }
    return null;
  }
  var he = Array.isArray,
    z = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    G = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    U = { pending: !1, data: null, method: null, action: null },
    ae = [],
    ce = -1;
  function N(t) {
    return { current: t };
  }
  function I(t) {
    0 > ce || ((t.current = ae[ce]), (ae[ce] = null), ce--);
  }
  function Z(t, n) {
    (ce++, (ae[ce] = t.current), (t.current = n));
  }
  var W = N(null),
    fe = N(null),
    ye = N(null),
    oe = N(null);
  function Ie(t, n) {
    switch ((Z(ye, n), Z(fe, t), Z(W, null), n.nodeType)) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? tv(t) : 0;
        break;
      default:
        if (((t = n.tagName), (n = n.namespaceURI)))
          ((n = tv(n)), (t = nv(n, t)));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    (I(W), Z(W, t));
  }
  function je() {
    (I(W), I(fe), I(ye));
  }
  function Ft(t) {
    t.memoizedState !== null && Z(oe, t);
    var n = W.current,
      r = nv(n, t.type);
    n !== r && (Z(fe, t), Z(W, r));
  }
  function pn(t) {
    (fe.current === t && (I(W), I(fe)),
      oe.current === t && (I(oe), (ds._currentValue = U)));
  }
  var gn, Pi;
  function Vi(t) {
    if (gn === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        ((gn = (n && n[1]) || ""),
          (Pi =
            -1 <
            r.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < r.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      gn +
      t +
      Pi
    );
  }
  var Eu = !1;
  function Tu(t, n) {
    if (!t || Eu) return "";
    Eu = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var o = {
        DetermineComponentFrameRoot: function () {
          try {
            if (n) {
              var K = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(K.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(K, []);
                } catch (q) {
                  var B = q;
                }
                Reflect.construct(t, [], K);
              } else {
                try {
                  K.call();
                } catch (q) {
                  B = q;
                }
                t.call(K.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (q) {
                B = q;
              }
              (K = t()) &&
                typeof K.catch == "function" &&
                K.catch(function () {});
            }
          } catch (q) {
            if (q && B && typeof q.stack == "string") return [q.stack, B.stack];
          }
          return [null, null];
        },
      };
      o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var c = Object.getOwnPropertyDescriptor(
        o.DetermineComponentFrameRoot,
        "name",
      );
      c &&
        c.configurable &&
        Object.defineProperty(o.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var d = o.DetermineComponentFrameRoot(),
        v = d[0],
        w = d[1];
      if (v && w) {
        var D = v.split(`
`),
          k = w.split(`
`);
        for (
          c = o = 0;
          o < D.length && !D[o].includes("DetermineComponentFrameRoot");
        )
          o++;
        for (; c < k.length && !k[c].includes("DetermineComponentFrameRoot"); )
          c++;
        if (o === D.length || c === k.length)
          for (
            o = D.length - 1, c = k.length - 1;
            1 <= o && 0 <= c && D[o] !== k[c];
          )
            c--;
        for (; 1 <= o && 0 <= c; o--, c--)
          if (D[o] !== k[c]) {
            if (o !== 1 || c !== 1)
              do
                if ((o--, c--, 0 > c || D[o] !== k[c])) {
                  var Y =
                    `
` + D[o].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      Y.includes("<anonymous>") &&
                      (Y = Y.replace("<anonymous>", t.displayName)),
                    Y
                  );
                }
              while (1 <= o && 0 <= c);
            break;
          }
      }
    } finally {
      ((Eu = !1), (Error.prepareStackTrace = r));
    }
    return (r = t ? t.displayName || t.name : "") ? Vi(r) : "";
  }
  function BE(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Vi(t.type);
      case 16:
        return Vi("Lazy");
      case 13:
        return t.child !== n && n !== null
          ? Vi("Suspense Fallback")
          : Vi("Suspense");
      case 19:
        return Vi("SuspenseList");
      case 0:
      case 15:
        return Tu(t.type, !1);
      case 11:
        return Tu(t.type.render, !1);
      case 1:
        return Tu(t.type, !0);
      case 31:
        return Vi("Activity");
      default:
        return "";
    }
  }
  function jm(t) {
    try {
      var n = "",
        r = null;
      do ((n += BE(t, r)), (r = t), (t = t.return));
      while (t);
      return n;
    } catch (o) {
      return (
        `
Error generating stack: ` +
        o.message +
        `
` +
        o.stack
      );
    }
  }
  var Au = Object.prototype.hasOwnProperty,
    Cu = e.unstable_scheduleCallback,
    Ru = e.unstable_cancelCallback,
    UE = e.unstable_shouldYield,
    HE = e.unstable_requestPaint,
    Ot = e.unstable_now,
    qE = e.unstable_getCurrentPriorityLevel,
    _m = e.unstable_ImmediatePriority,
    Lm = e.unstable_UserBlockingPriority,
    Ws = e.unstable_NormalPriority,
    FE = e.unstable_LowPriority,
    zm = e.unstable_IdlePriority,
    GE = e.log,
    YE = e.unstable_setDisableYieldValue,
    Tr = null,
    Nt = null;
  function ii(t) {
    if (
      (typeof GE == "function" && YE(t),
      Nt && typeof Nt.setStrictMode == "function")
    )
      try {
        Nt.setStrictMode(Tr, t);
      } catch {}
  }
  var jt = Math.clz32 ? Math.clz32 : KE,
    IE = Math.log,
    XE = Math.LN2;
  function KE(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((IE(t) / XE) | 0)) | 0);
  }
  var Js = 256,
    eo = 262144,
    to = 4194304;
  function ki(t) {
    var n = t & 42;
    if (n !== 0) return n;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function no(t, n, r) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var c = 0,
      d = t.suspendedLanes,
      v = t.pingedLanes;
    t = t.warmLanes;
    var w = o & 134217727;
    return (
      w !== 0
        ? ((o = w & ~d),
          o !== 0
            ? (c = ki(o))
            : ((v &= w),
              v !== 0
                ? (c = ki(v))
                : r || ((r = w & ~t), r !== 0 && (c = ki(r)))))
        : ((w = o & ~d),
          w !== 0
            ? (c = ki(w))
            : v !== 0
              ? (c = ki(v))
              : r || ((r = o & ~t), r !== 0 && (c = ki(r)))),
      c === 0
        ? 0
        : n !== 0 &&
            n !== c &&
            (n & d) === 0 &&
            ((d = c & -c),
            (r = n & -n),
            d >= r || (d === 32 && (r & 4194048) !== 0))
          ? n
          : c
    );
  }
  function Ar(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function $E(t, n) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Pm() {
    var t = to;
    return ((to <<= 1), (to & 62914560) === 0 && (to = 4194304), t);
  }
  function Du(t) {
    for (var n = [], r = 0; 31 > r; r++) n.push(t);
    return n;
  }
  function Cr(t, n) {
    ((t.pendingLanes |= n),
      n !== 268435456 &&
        ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function QE(t, n, r, o, c, d) {
    var v = t.pendingLanes;
    ((t.pendingLanes = r),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= r),
      (t.entangledLanes &= r),
      (t.errorRecoveryDisabledLanes &= r),
      (t.shellSuspendCounter = 0));
    var w = t.entanglements,
      D = t.expirationTimes,
      k = t.hiddenUpdates;
    for (r = v & ~r; 0 < r; ) {
      var Y = 31 - jt(r),
        K = 1 << Y;
      ((w[Y] = 0), (D[Y] = -1));
      var B = k[Y];
      if (B !== null)
        for (k[Y] = null, Y = 0; Y < B.length; Y++) {
          var q = B[Y];
          q !== null && (q.lane &= -536870913);
        }
      r &= ~K;
    }
    (o !== 0 && Vm(t, o, 0),
      d !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(v & ~n)));
  }
  function Vm(t, n, r) {
    ((t.pendingLanes |= n), (t.suspendedLanes &= ~n));
    var o = 31 - jt(n);
    ((t.entangledLanes |= n),
      (t.entanglements[o] = t.entanglements[o] | 1073741824 | (r & 261930)));
  }
  function km(t, n) {
    var r = (t.entangledLanes |= n);
    for (t = t.entanglements; r; ) {
      var o = 31 - jt(r),
        c = 1 << o;
      ((c & n) | (t[o] & n) && (t[o] |= n), (r &= ~c));
    }
  }
  function Bm(t, n) {
    var r = n & -n;
    return (
      (r = (r & 42) !== 0 ? 1 : Mu(r)),
      (r & (t.suspendedLanes | n)) !== 0 ? 0 : r
    );
  }
  function Mu(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Ou(t) {
    return (
      (t &= -t),
      2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Um() {
    var t = G.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : Av(t.type));
  }
  function Hm(t, n) {
    var r = G.p;
    try {
      return ((G.p = t), n());
    } finally {
      G.p = r;
    }
  }
  var ai = Math.random().toString(36).slice(2),
    lt = "__reactFiber$" + ai,
    bt = "__reactProps$" + ai,
    ha = "__reactContainer$" + ai,
    Nu = "__reactEvents$" + ai,
    ZE = "__reactListeners$" + ai,
    WE = "__reactHandles$" + ai,
    qm = "__reactResources$" + ai,
    Rr = "__reactMarker$" + ai;
  function ju(t) {
    (delete t[lt], delete t[bt], delete t[Nu], delete t[ZE], delete t[WE]);
  }
  function ma(t) {
    var n = t[lt];
    if (n) return n;
    for (var r = t.parentNode; r; ) {
      if ((n = r[ha] || r[lt])) {
        if (
          ((r = n.alternate),
          n.child !== null || (r !== null && r.child !== null))
        )
          for (t = uv(t); t !== null; ) {
            if ((r = t[lt])) return r;
            t = uv(t);
          }
        return n;
      }
      ((t = r), (r = t.parentNode));
    }
    return null;
  }
  function pa(t) {
    if ((t = t[lt] || t[ha])) {
      var n = t.tag;
      if (
        n === 5 ||
        n === 6 ||
        n === 13 ||
        n === 31 ||
        n === 26 ||
        n === 27 ||
        n === 3
      )
        return t;
    }
    return null;
  }
  function Dr(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(s(33));
  }
  function ga(t) {
    var n = t[qm];
    return (
      n ||
        (n = t[qm] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      n
    );
  }
  function at(t) {
    t[Rr] = !0;
  }
  var Fm = new Set(),
    Gm = {};
  function Bi(t, n) {
    (ya(t, n), ya(t + "Capture", n));
  }
  function ya(t, n) {
    for (Gm[t] = n, t = 0; t < n.length; t++) Fm.add(n[t]);
  }
  var JE = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    Ym = {},
    Im = {};
  function eT(t) {
    return Au.call(Im, t)
      ? !0
      : Au.call(Ym, t)
        ? !1
        : JE.test(t)
          ? (Im[t] = !0)
          : ((Ym[t] = !0), !1);
  }
  function io(t, n, r) {
    if (eT(n))
      if (r === null) t.removeAttribute(n);
      else {
        switch (typeof r) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(n);
            return;
          case "boolean":
            var o = n.toLowerCase().slice(0, 5);
            if (o !== "data-" && o !== "aria-") {
              t.removeAttribute(n);
              return;
            }
        }
        t.setAttribute(n, "" + r);
      }
  }
  function ao(t, n, r) {
    if (r === null) t.removeAttribute(n);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttribute(n, "" + r);
    }
  }
  function jn(t, n, r, o) {
    if (o === null) t.removeAttribute(r);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(r);
          return;
      }
      t.setAttributeNS(n, r, "" + o);
    }
  }
  function Gt(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Xm(t) {
    var n = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === "input" &&
      (n === "checkbox" || n === "radio")
    );
  }
  function tT(t, n, r) {
    var o = Object.getOwnPropertyDescriptor(t.constructor.prototype, n);
    if (
      !t.hasOwnProperty(n) &&
      typeof o < "u" &&
      typeof o.get == "function" &&
      typeof o.set == "function"
    ) {
      var c = o.get,
        d = o.set;
      return (
        Object.defineProperty(t, n, {
          configurable: !0,
          get: function () {
            return c.call(this);
          },
          set: function (v) {
            ((r = "" + v), d.call(this, v));
          },
        }),
        Object.defineProperty(t, n, { enumerable: o.enumerable }),
        {
          getValue: function () {
            return r;
          },
          setValue: function (v) {
            r = "" + v;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[n]);
          },
        }
      );
    }
  }
  function _u(t) {
    if (!t._valueTracker) {
      var n = Xm(t) ? "checked" : "value";
      t._valueTracker = tT(t, n, "" + t[n]);
    }
  }
  function Km(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var r = n.getValue(),
      o = "";
    return (
      t && (o = Xm(t) ? (t.checked ? "true" : "false") : t.value),
      (t = o),
      t !== r ? (n.setValue(t), !0) : !1
    );
  }
  function ro(t) {
    if (
      ((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")
    )
      return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var nT = /[\n"\\]/g;
  function Yt(t) {
    return t.replace(nT, function (n) {
      return "\\" + n.charCodeAt(0).toString(16) + " ";
    });
  }
  function Lu(t, n, r, o, c, d, v, w) {
    ((t.name = ""),
      v != null &&
      typeof v != "function" &&
      typeof v != "symbol" &&
      typeof v != "boolean"
        ? (t.type = v)
        : t.removeAttribute("type"),
      n != null
        ? v === "number"
          ? ((n === 0 && t.value === "") || t.value != n) &&
            (t.value = "" + Gt(n))
          : t.value !== "" + Gt(n) && (t.value = "" + Gt(n))
        : (v !== "submit" && v !== "reset") || t.removeAttribute("value"),
      n != null
        ? zu(t, v, Gt(n))
        : r != null
          ? zu(t, v, Gt(r))
          : o != null && t.removeAttribute("value"),
      c == null && d != null && (t.defaultChecked = !!d),
      c != null &&
        (t.checked = c && typeof c != "function" && typeof c != "symbol"),
      w != null &&
      typeof w != "function" &&
      typeof w != "symbol" &&
      typeof w != "boolean"
        ? (t.name = "" + Gt(w))
        : t.removeAttribute("name"));
  }
  function $m(t, n, r, o, c, d, v, w) {
    if (
      (d != null &&
        typeof d != "function" &&
        typeof d != "symbol" &&
        typeof d != "boolean" &&
        (t.type = d),
      n != null || r != null)
    ) {
      if (!((d !== "submit" && d !== "reset") || n != null)) {
        _u(t);
        return;
      }
      ((r = r != null ? "" + Gt(r) : ""),
        (n = n != null ? "" + Gt(n) : r),
        w || n === t.value || (t.value = n),
        (t.defaultValue = n));
    }
    ((o = o ?? c),
      (o = typeof o != "function" && typeof o != "symbol" && !!o),
      (t.checked = w ? t.checked : !!o),
      (t.defaultChecked = !!o),
      v != null &&
        typeof v != "function" &&
        typeof v != "symbol" &&
        typeof v != "boolean" &&
        (t.name = v),
      _u(t));
  }
  function zu(t, n, r) {
    (n === "number" && ro(t.ownerDocument) === t) ||
      t.defaultValue === "" + r ||
      (t.defaultValue = "" + r);
  }
  function va(t, n, r, o) {
    if (((t = t.options), n)) {
      n = {};
      for (var c = 0; c < r.length; c++) n["$" + r[c]] = !0;
      for (r = 0; r < t.length; r++)
        ((c = n.hasOwnProperty("$" + t[r].value)),
          t[r].selected !== c && (t[r].selected = c),
          c && o && (t[r].defaultSelected = !0));
    } else {
      for (r = "" + Gt(r), n = null, c = 0; c < t.length; c++) {
        if (t[c].value === r) {
          ((t[c].selected = !0), o && (t[c].defaultSelected = !0));
          return;
        }
        n !== null || t[c].disabled || (n = t[c]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Qm(t, n, r) {
    if (
      n != null &&
      ((n = "" + Gt(n)), n !== t.value && (t.value = n), r == null)
    ) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = r != null ? "" + Gt(r) : "";
  }
  function Zm(t, n, r, o) {
    if (n == null) {
      if (o != null) {
        if (r != null) throw Error(s(92));
        if (he(o)) {
          if (1 < o.length) throw Error(s(93));
          o = o[0];
        }
        r = o;
      }
      (r == null && (r = ""), (n = r));
    }
    ((r = Gt(n)),
      (t.defaultValue = r),
      (o = t.textContent),
      o === r && o !== "" && o !== null && (t.value = o),
      _u(t));
  }
  function ba(t, n) {
    if (n) {
      var r = t.firstChild;
      if (r && r === t.lastChild && r.nodeType === 3) {
        r.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var iT = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function Wm(t, n, r) {
    var o = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === ""
      ? o
        ? t.setProperty(n, "")
        : n === "float"
          ? (t.cssFloat = "")
          : (t[n] = "")
      : o
        ? t.setProperty(n, r)
        : typeof r != "number" || r === 0 || iT.has(n)
          ? n === "float"
            ? (t.cssFloat = r)
            : (t[n] = ("" + r).trim())
          : (t[n] = r + "px");
  }
  function Jm(t, n, r) {
    if (n != null && typeof n != "object") throw Error(s(62));
    if (((t = t.style), r != null)) {
      for (var o in r)
        !r.hasOwnProperty(o) ||
          (n != null && n.hasOwnProperty(o)) ||
          (o.indexOf("--") === 0
            ? t.setProperty(o, "")
            : o === "float"
              ? (t.cssFloat = "")
              : (t[o] = ""));
      for (var c in n)
        ((o = n[c]), n.hasOwnProperty(c) && r[c] !== o && Wm(t, c, o));
    } else for (var d in n) n.hasOwnProperty(d) && Wm(t, d, n[d]);
  }
  function Pu(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var aT = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    rT =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function so(t) {
    return rT.test("" + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function _n() {}
  var Vu = null;
  function ku(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var xa = null,
    Sa = null;
  function ep(t) {
    var n = pa(t);
    if (n && (t = n.stateNode)) {
      var r = t[bt] || null;
      e: switch (((t = n.stateNode), n.type)) {
        case "input":
          if (
            (Lu(
              t,
              r.value,
              r.defaultValue,
              r.defaultValue,
              r.checked,
              r.defaultChecked,
              r.type,
              r.name,
            ),
            (n = r.name),
            r.type === "radio" && n != null)
          ) {
            for (r = t; r.parentNode; ) r = r.parentNode;
            for (
              r = r.querySelectorAll(
                'input[name="' + Yt("" + n) + '"][type="radio"]',
              ),
                n = 0;
              n < r.length;
              n++
            ) {
              var o = r[n];
              if (o !== t && o.form === t.form) {
                var c = o[bt] || null;
                if (!c) throw Error(s(90));
                Lu(
                  o,
                  c.value,
                  c.defaultValue,
                  c.defaultValue,
                  c.checked,
                  c.defaultChecked,
                  c.type,
                  c.name,
                );
              }
            }
            for (n = 0; n < r.length; n++)
              ((o = r[n]), o.form === t.form && Km(o));
          }
          break e;
        case "textarea":
          Qm(t, r.value, r.defaultValue);
          break e;
        case "select":
          ((n = r.value), n != null && va(t, !!r.multiple, n, !1));
      }
    }
  }
  var Bu = !1;
  function tp(t, n, r) {
    if (Bu) return t(n, r);
    Bu = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (
        ((Bu = !1),
        (xa !== null || Sa !== null) &&
          (Ko(), xa && ((n = xa), (t = Sa), (Sa = xa = null), ep(n), t)))
      )
        for (n = 0; n < t.length; n++) ep(t[n]);
    }
  }
  function Mr(t, n) {
    var r = t.stateNode;
    if (r === null) return null;
    var o = r[bt] || null;
    if (o === null) return null;
    r = o[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((o = !o.disabled) ||
          ((t = t.type),
          (o = !(
            t === "button" ||
            t === "input" ||
            t === "select" ||
            t === "textarea"
          ))),
          (t = !o));
        break e;
      default:
        t = !1;
    }
    if (t) return null;
    if (r && typeof r != "function") throw Error(s(231, n, typeof r));
    return r;
  }
  var Ln = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Uu = !1;
  if (Ln)
    try {
      var Or = {};
      (Object.defineProperty(Or, "passive", {
        get: function () {
          Uu = !0;
        },
      }),
        window.addEventListener("test", Or, Or),
        window.removeEventListener("test", Or, Or));
    } catch {
      Uu = !1;
    }
  var ri = null,
    Hu = null,
    oo = null;
  function np() {
    if (oo) return oo;
    var t,
      n = Hu,
      r = n.length,
      o,
      c = "value" in ri ? ri.value : ri.textContent,
      d = c.length;
    for (t = 0; t < r && n[t] === c[t]; t++);
    var v = r - t;
    for (o = 1; o <= v && n[r - o] === c[d - o]; o++);
    return (oo = c.slice(t, 1 < o ? 1 - o : void 0));
  }
  function lo(t) {
    var n = t.keyCode;
    return (
      "charCode" in t
        ? ((t = t.charCode), t === 0 && n === 13 && (t = 13))
        : (t = n),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function uo() {
    return !0;
  }
  function ip() {
    return !1;
  }
  function xt(t) {
    function n(r, o, c, d, v) {
      ((this._reactName = r),
        (this._targetInst = c),
        (this.type = o),
        (this.nativeEvent = d),
        (this.target = v),
        (this.currentTarget = null));
      for (var w in t)
        t.hasOwnProperty(w) && ((r = t[w]), (this[w] = r ? r(d) : d[w]));
      return (
        (this.isDefaultPrevented = (
          d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1
        )
          ? uo
          : ip),
        (this.isPropagationStopped = ip),
        this
      );
    }
    return (
      y(n.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var r = this.nativeEvent;
          r &&
            (r.preventDefault
              ? r.preventDefault()
              : typeof r.returnValue != "unknown" && (r.returnValue = !1),
            (this.isDefaultPrevented = uo));
        },
        stopPropagation: function () {
          var r = this.nativeEvent;
          r &&
            (r.stopPropagation
              ? r.stopPropagation()
              : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0),
            (this.isPropagationStopped = uo));
        },
        persist: function () {},
        isPersistent: uo,
      }),
      n
    );
  }
  var Ui = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    co = xt(Ui),
    Nr = y({}, Ui, { view: 0, detail: 0 }),
    sT = xt(Nr),
    qu,
    Fu,
    jr,
    fo = y({}, Nr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Yu,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== jr &&
              (jr && t.type === "mousemove"
                ? ((qu = t.screenX - jr.screenX), (Fu = t.screenY - jr.screenY))
                : (Fu = qu = 0),
              (jr = t)),
            qu);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : Fu;
      },
    }),
    ap = xt(fo),
    oT = y({}, fo, { dataTransfer: 0 }),
    lT = xt(oT),
    uT = y({}, Nr, { relatedTarget: 0 }),
    Gu = xt(uT),
    cT = y({}, Ui, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    fT = xt(cT),
    dT = y({}, Ui, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    hT = xt(dT),
    mT = y({}, Ui, { data: 0 }),
    rp = xt(mT),
    pT = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    gT = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    yT = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function vT(t) {
    var n = this.nativeEvent;
    return n.getModifierState
      ? n.getModifierState(t)
      : (t = yT[t])
        ? !!n[t]
        : !1;
  }
  function Yu() {
    return vT;
  }
  var bT = y({}, Nr, {
      key: function (t) {
        if (t.key) {
          var n = pT[t.key] || t.key;
          if (n !== "Unidentified") return n;
        }
        return t.type === "keypress"
          ? ((t = lo(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
            ? gT[t.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Yu,
      charCode: function (t) {
        return t.type === "keypress" ? lo(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? lo(t)
          : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
      },
    }),
    xT = xt(bT),
    ST = y({}, fo, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    sp = xt(ST),
    wT = y({}, Nr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Yu,
    }),
    ET = xt(wT),
    TT = y({}, Ui, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    AT = xt(TT),
    CT = y({}, fo, {
      deltaX: function (t) {
        return "deltaX" in t
          ? t.deltaX
          : "wheelDeltaX" in t
            ? -t.wheelDeltaX
            : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
            ? -t.wheelDeltaY
            : "wheelDelta" in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    RT = xt(CT),
    DT = y({}, Ui, { newState: 0, oldState: 0 }),
    MT = xt(DT),
    OT = [9, 13, 27, 32],
    Iu = Ln && "CompositionEvent" in window,
    _r = null;
  Ln && "documentMode" in document && (_r = document.documentMode);
  var NT = Ln && "TextEvent" in window && !_r,
    op = Ln && (!Iu || (_r && 8 < _r && 11 >= _r)),
    lp = " ",
    up = !1;
  function cp(t, n) {
    switch (t) {
      case "keyup":
        return OT.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function fp(t) {
    return (
      (t = t.detail),
      typeof t == "object" && "data" in t ? t.data : null
    );
  }
  var wa = !1;
  function jT(t, n) {
    switch (t) {
      case "compositionend":
        return fp(n);
      case "keypress":
        return n.which !== 32 ? null : ((up = !0), lp);
      case "textInput":
        return ((t = n.data), t === lp && up ? null : t);
      default:
        return null;
    }
  }
  function _T(t, n) {
    if (wa)
      return t === "compositionend" || (!Iu && cp(t, n))
        ? ((t = np()), (oo = Hu = ri = null), (wa = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || (n.ctrlKey && n.altKey)) {
          if (n.char && 1 < n.char.length) return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return op && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var LT = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function dp(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!LT[t.type] : n === "textarea";
  }
  function hp(t, n, r, o) {
    (xa ? (Sa ? Sa.push(o) : (Sa = [o])) : (xa = o),
      (n = tl(n, "onChange")),
      0 < n.length &&
        ((r = new co("onChange", "change", null, r, o)),
        t.push({ event: r, listeners: n })));
  }
  var Lr = null,
    zr = null;
  function zT(t) {
    $y(t, 0);
  }
  function ho(t) {
    var n = Dr(t);
    if (Km(n)) return t;
  }
  function mp(t, n) {
    if (t === "change") return n;
  }
  var pp = !1;
  if (Ln) {
    var Xu;
    if (Ln) {
      var Ku = "oninput" in document;
      if (!Ku) {
        var gp = document.createElement("div");
        (gp.setAttribute("oninput", "return;"),
          (Ku = typeof gp.oninput == "function"));
      }
      Xu = Ku;
    } else Xu = !1;
    pp = Xu && (!document.documentMode || 9 < document.documentMode);
  }
  function yp() {
    Lr && (Lr.detachEvent("onpropertychange", vp), (zr = Lr = null));
  }
  function vp(t) {
    if (t.propertyName === "value" && ho(zr)) {
      var n = [];
      (hp(n, zr, t, ku(t)), tp(zT, n));
    }
  }
  function PT(t, n, r) {
    t === "focusin"
      ? (yp(), (Lr = n), (zr = r), Lr.attachEvent("onpropertychange", vp))
      : t === "focusout" && yp();
  }
  function VT(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return ho(zr);
  }
  function kT(t, n) {
    if (t === "click") return ho(n);
  }
  function BT(t, n) {
    if (t === "input" || t === "change") return ho(n);
  }
  function UT(t, n) {
    return (t === n && (t !== 0 || 1 / t === 1 / n)) || (t !== t && n !== n);
  }
  var _t = typeof Object.is == "function" ? Object.is : UT;
  function Pr(t, n) {
    if (_t(t, n)) return !0;
    if (
      typeof t != "object" ||
      t === null ||
      typeof n != "object" ||
      n === null
    )
      return !1;
    var r = Object.keys(t),
      o = Object.keys(n);
    if (r.length !== o.length) return !1;
    for (o = 0; o < r.length; o++) {
      var c = r[o];
      if (!Au.call(n, c) || !_t(t[c], n[c])) return !1;
    }
    return !0;
  }
  function bp(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function xp(t, n) {
    var r = bp(t);
    t = 0;
    for (var o; r; ) {
      if (r.nodeType === 3) {
        if (((o = t + r.textContent.length), t <= n && o >= n))
          return { node: r, offset: n - t };
        t = o;
      }
      e: {
        for (; r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = bp(r);
    }
  }
  function Sp(t, n) {
    return t && n
      ? t === n
        ? !0
        : t && t.nodeType === 3
          ? !1
          : n && n.nodeType === 3
            ? Sp(t, n.parentNode)
            : "contains" in t
              ? t.contains(n)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(n) & 16)
                : !1
      : !1;
  }
  function wp(t) {
    t =
      t != null &&
      t.ownerDocument != null &&
      t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var n = ro(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var r = typeof n.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) t = n.contentWindow;
      else break;
      n = ro(t.document);
    }
    return n;
  }
  function $u(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      n &&
      ((n === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        n === "textarea" ||
        t.contentEditable === "true")
    );
  }
  var HT = Ln && "documentMode" in document && 11 >= document.documentMode,
    Ea = null,
    Qu = null,
    Vr = null,
    Zu = !1;
  function Ep(t, n, r) {
    var o =
      r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    Zu ||
      Ea == null ||
      Ea !== ro(o) ||
      ((o = Ea),
      "selectionStart" in o && $u(o)
        ? (o = { start: o.selectionStart, end: o.selectionEnd })
        : ((o = (
            (o.ownerDocument && o.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (o = {
            anchorNode: o.anchorNode,
            anchorOffset: o.anchorOffset,
            focusNode: o.focusNode,
            focusOffset: o.focusOffset,
          })),
      (Vr && Pr(Vr, o)) ||
        ((Vr = o),
        (o = tl(Qu, "onSelect")),
        0 < o.length &&
          ((n = new co("onSelect", "select", null, n, r)),
          t.push({ event: n, listeners: o }),
          (n.target = Ea))));
  }
  function Hi(t, n) {
    var r = {};
    return (
      (r[t.toLowerCase()] = n.toLowerCase()),
      (r["Webkit" + t] = "webkit" + n),
      (r["Moz" + t] = "moz" + n),
      r
    );
  }
  var Ta = {
      animationend: Hi("Animation", "AnimationEnd"),
      animationiteration: Hi("Animation", "AnimationIteration"),
      animationstart: Hi("Animation", "AnimationStart"),
      transitionrun: Hi("Transition", "TransitionRun"),
      transitionstart: Hi("Transition", "TransitionStart"),
      transitioncancel: Hi("Transition", "TransitionCancel"),
      transitionend: Hi("Transition", "TransitionEnd"),
    },
    Wu = {},
    Tp = {};
  Ln &&
    ((Tp = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Ta.animationend.animation,
      delete Ta.animationiteration.animation,
      delete Ta.animationstart.animation),
    "TransitionEvent" in window || delete Ta.transitionend.transition);
  function qi(t) {
    if (Wu[t]) return Wu[t];
    if (!Ta[t]) return t;
    var n = Ta[t],
      r;
    for (r in n) if (n.hasOwnProperty(r) && r in Tp) return (Wu[t] = n[r]);
    return t;
  }
  var Ap = qi("animationend"),
    Cp = qi("animationiteration"),
    Rp = qi("animationstart"),
    qT = qi("transitionrun"),
    FT = qi("transitionstart"),
    GT = qi("transitioncancel"),
    Dp = qi("transitionend"),
    Mp = new Map(),
    Ju =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  Ju.push("scrollEnd");
  function on(t, n) {
    (Mp.set(t, n), Bi(n, [t]));
  }
  var mo =
      typeof reportError == "function"
        ? reportError
        : function (t) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var n = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == "object" &&
                  t !== null &&
                  typeof t.message == "string"
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(n)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", t);
              return;
            }
            console.error(t);
          },
    It = [],
    Aa = 0,
    ec = 0;
  function po() {
    for (var t = Aa, n = (ec = Aa = 0); n < t; ) {
      var r = It[n];
      It[n++] = null;
      var o = It[n];
      It[n++] = null;
      var c = It[n];
      It[n++] = null;
      var d = It[n];
      if (((It[n++] = null), o !== null && c !== null)) {
        var v = o.pending;
        (v === null ? (c.next = c) : ((c.next = v.next), (v.next = c)),
          (o.pending = c));
      }
      d !== 0 && Op(r, c, d);
    }
  }
  function go(t, n, r, o) {
    ((It[Aa++] = t),
      (It[Aa++] = n),
      (It[Aa++] = r),
      (It[Aa++] = o),
      (ec |= o),
      (t.lanes |= o),
      (t = t.alternate),
      t !== null && (t.lanes |= o));
  }
  function tc(t, n, r, o) {
    return (go(t, n, r, o), yo(t));
  }
  function Fi(t, n) {
    return (go(t, null, null, n), yo(t));
  }
  function Op(t, n, r) {
    t.lanes |= r;
    var o = t.alternate;
    o !== null && (o.lanes |= r);
    for (var c = !1, d = t.return; d !== null; )
      ((d.childLanes |= r),
        (o = d.alternate),
        o !== null && (o.childLanes |= r),
        d.tag === 22 &&
          ((t = d.stateNode), t === null || t._visibility & 1 || (c = !0)),
        (t = d),
        (d = d.return));
    return t.tag === 3
      ? ((d = t.stateNode),
        c &&
          n !== null &&
          ((c = 31 - jt(r)),
          (t = d.hiddenUpdates),
          (o = t[c]),
          o === null ? (t[c] = [n]) : o.push(n),
          (n.lane = r | 536870912)),
        d)
      : null;
  }
  function yo(t) {
    if (50 < rs) throw ((rs = 0), (ff = null), Error(s(185)));
    for (var n = t.return; n !== null; ) ((t = n), (n = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ca = {};
  function YT(t, n, r, o) {
    ((this.tag = t),
      (this.key = r),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = n),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = o),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Lt(t, n, r, o) {
    return new YT(t, n, r, o);
  }
  function nc(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function zn(t, n) {
    var r = t.alternate;
    return (
      r === null
        ? ((r = Lt(t.tag, n, t.key, t.mode)),
          (r.elementType = t.elementType),
          (r.type = t.type),
          (r.stateNode = t.stateNode),
          (r.alternate = t),
          (t.alternate = r))
        : ((r.pendingProps = n),
          (r.type = t.type),
          (r.flags = 0),
          (r.subtreeFlags = 0),
          (r.deletions = null)),
      (r.flags = t.flags & 65011712),
      (r.childLanes = t.childLanes),
      (r.lanes = t.lanes),
      (r.child = t.child),
      (r.memoizedProps = t.memoizedProps),
      (r.memoizedState = t.memoizedState),
      (r.updateQueue = t.updateQueue),
      (n = t.dependencies),
      (r.dependencies =
        n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }),
      (r.sibling = t.sibling),
      (r.index = t.index),
      (r.ref = t.ref),
      (r.refCleanup = t.refCleanup),
      r
    );
  }
  function Np(t, n) {
    t.flags &= 65011714;
    var r = t.alternate;
    return (
      r === null
        ? ((t.childLanes = 0),
          (t.lanes = n),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = r.childLanes),
          (t.lanes = r.lanes),
          (t.child = r.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = r.memoizedProps),
          (t.memoizedState = r.memoizedState),
          (t.updateQueue = r.updateQueue),
          (t.type = r.type),
          (n = r.dependencies),
          (t.dependencies =
            n === null
              ? null
              : { lanes: n.lanes, firstContext: n.firstContext })),
      t
    );
  }
  function vo(t, n, r, o, c, d) {
    var v = 0;
    if (((o = t), typeof t == "function")) nc(t) && (v = 1);
    else if (typeof t == "string")
      v = QA(t, r, W.current)
        ? 26
        : t === "html" || t === "head" || t === "body"
          ? 27
          : 5;
    else
      e: switch (t) {
        case J:
          return ((t = Lt(31, r, n, c)), (t.elementType = J), (t.lanes = d), t);
        case E:
          return Gi(r.children, c, d, n);
        case A:
          ((v = 8), (c |= 24));
          break;
        case R:
          return (
            (t = Lt(12, r, n, c | 2)),
            (t.elementType = R),
            (t.lanes = d),
            t
          );
        case L:
          return ((t = Lt(13, r, n, c)), (t.elementType = L), (t.lanes = d), t);
        case $:
          return ((t = Lt(19, r, n, c)), (t.elementType = $), (t.lanes = d), t);
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case O:
                v = 10;
                break e;
              case M:
                v = 9;
                break e;
              case V:
                v = 11;
                break e;
              case H:
                v = 14;
                break e;
              case F:
                ((v = 16), (o = null));
                break e;
            }
          ((v = 29),
            (r = Error(s(130, t === null ? "null" : typeof t, ""))),
            (o = null));
      }
    return (
      (n = Lt(v, r, n, c)),
      (n.elementType = t),
      (n.type = o),
      (n.lanes = d),
      n
    );
  }
  function Gi(t, n, r, o) {
    return ((t = Lt(7, t, o, n)), (t.lanes = r), t);
  }
  function ic(t, n, r) {
    return ((t = Lt(6, t, null, n)), (t.lanes = r), t);
  }
  function jp(t) {
    var n = Lt(18, null, null, 0);
    return ((n.stateNode = t), n);
  }
  function ac(t, n, r) {
    return (
      (n = Lt(4, t.children !== null ? t.children : [], t.key, n)),
      (n.lanes = r),
      (n.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      n
    );
  }
  var _p = new WeakMap();
  function Xt(t, n) {
    if (typeof t == "object" && t !== null) {
      var r = _p.get(t);
      return r !== void 0
        ? r
        : ((n = { value: t, source: n, stack: jm(n) }), _p.set(t, n), n);
    }
    return { value: t, source: n, stack: jm(n) };
  }
  var Ra = [],
    Da = 0,
    bo = null,
    kr = 0,
    Kt = [],
    $t = 0,
    si = null,
    yn = 1,
    vn = "";
  function Pn(t, n) {
    ((Ra[Da++] = kr), (Ra[Da++] = bo), (bo = t), (kr = n));
  }
  function Lp(t, n, r) {
    ((Kt[$t++] = yn), (Kt[$t++] = vn), (Kt[$t++] = si), (si = t));
    var o = yn;
    t = vn;
    var c = 32 - jt(o) - 1;
    ((o &= ~(1 << c)), (r += 1));
    var d = 32 - jt(n) + c;
    if (30 < d) {
      var v = c - (c % 5);
      ((d = (o & ((1 << v) - 1)).toString(32)),
        (o >>= v),
        (c -= v),
        (yn = (1 << (32 - jt(n) + c)) | (r << c) | o),
        (vn = d + t));
    } else ((yn = (1 << d) | (r << c) | o), (vn = t));
  }
  function rc(t) {
    t.return !== null && (Pn(t, 1), Lp(t, 1, 0));
  }
  function sc(t) {
    for (; t === bo; )
      ((bo = Ra[--Da]), (Ra[Da] = null), (kr = Ra[--Da]), (Ra[Da] = null));
    for (; t === si; )
      ((si = Kt[--$t]),
        (Kt[$t] = null),
        (vn = Kt[--$t]),
        (Kt[$t] = null),
        (yn = Kt[--$t]),
        (Kt[$t] = null));
  }
  function zp(t, n) {
    ((Kt[$t++] = yn),
      (Kt[$t++] = vn),
      (Kt[$t++] = si),
      (yn = n.id),
      (vn = n.overflow),
      (si = t));
  }
  var ut = null,
    ke = null,
    Ce = !1,
    oi = null,
    Qt = !1,
    oc = Error(s(519));
  function li(t) {
    var n = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        "",
      ),
    );
    throw (Br(Xt(n, t)), oc);
  }
  function Pp(t) {
    var n = t.stateNode,
      r = t.type,
      o = t.memoizedProps;
    switch (((n[lt] = t), (n[bt] = o), r)) {
      case "dialog":
        (we("cancel", n), we("close", n));
        break;
      case "iframe":
      case "object":
      case "embed":
        we("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < os.length; r++) we(os[r], n);
        break;
      case "source":
        we("error", n);
        break;
      case "img":
      case "image":
      case "link":
        (we("error", n), we("load", n));
        break;
      case "details":
        we("toggle", n);
        break;
      case "input":
        (we("invalid", n),
          $m(
            n,
            o.value,
            o.defaultValue,
            o.checked,
            o.defaultChecked,
            o.type,
            o.name,
            !0,
          ));
        break;
      case "select":
        we("invalid", n);
        break;
      case "textarea":
        (we("invalid", n), Zm(n, o.value, o.defaultValue, o.children));
    }
    ((r = o.children),
      (typeof r != "string" && typeof r != "number" && typeof r != "bigint") ||
      n.textContent === "" + r ||
      o.suppressHydrationWarning === !0 ||
      Jy(n.textContent, r)
        ? (o.popover != null && (we("beforetoggle", n), we("toggle", n)),
          o.onScroll != null && we("scroll", n),
          o.onScrollEnd != null && we("scrollend", n),
          o.onClick != null && (n.onclick = _n),
          (n = !0))
        : (n = !1),
      n || li(t, !0));
  }
  function Vp(t) {
    for (ut = t.return; ut; )
      switch (ut.tag) {
        case 5:
        case 31:
        case 13:
          Qt = !1;
          return;
        case 27:
        case 3:
          Qt = !0;
          return;
        default:
          ut = ut.return;
      }
  }
  function Ma(t) {
    if (t !== ut) return !1;
    if (!Ce) return (Vp(t), (Ce = !0), !1);
    var n = t.tag,
      r;
    if (
      ((r = n !== 3 && n !== 27) &&
        ((r = n === 5) &&
          ((r = t.type),
          (r =
            !(r !== "form" && r !== "button") || Cf(t.type, t.memoizedProps))),
        (r = !r)),
      r && ke && li(t),
      Vp(t),
      n === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(s(317));
      ke = lv(t);
    } else if (n === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(s(317));
      ke = lv(t);
    } else
      n === 27
        ? ((n = ke), wi(t.type) ? ((t = Nf), (Nf = null), (ke = t)) : (ke = n))
        : (ke = ut ? Wt(t.stateNode.nextSibling) : null);
    return !0;
  }
  function Yi() {
    ((ke = ut = null), (Ce = !1));
  }
  function lc() {
    var t = oi;
    return (
      t !== null &&
        (Tt === null ? (Tt = t) : Tt.push.apply(Tt, t), (oi = null)),
      t
    );
  }
  function Br(t) {
    oi === null ? (oi = [t]) : oi.push(t);
  }
  var uc = N(null),
    Ii = null,
    Vn = null;
  function ui(t, n, r) {
    (Z(uc, n._currentValue), (n._currentValue = r));
  }
  function kn(t) {
    ((t._currentValue = uc.current), I(uc));
  }
  function cc(t, n, r) {
    for (; t !== null; ) {
      var o = t.alternate;
      if (
        ((t.childLanes & n) !== n
          ? ((t.childLanes |= n), o !== null && (o.childLanes |= n))
          : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n),
        t === r)
      )
        break;
      t = t.return;
    }
  }
  function fc(t, n, r, o) {
    var c = t.child;
    for (c !== null && (c.return = t); c !== null; ) {
      var d = c.dependencies;
      if (d !== null) {
        var v = c.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var w = d;
          d = c;
          for (var D = 0; D < n.length; D++)
            if (w.context === n[D]) {
              ((d.lanes |= r),
                (w = d.alternate),
                w !== null && (w.lanes |= r),
                cc(d.return, r, t),
                o || (v = null));
              break e;
            }
          d = w.next;
        }
      } else if (c.tag === 18) {
        if (((v = c.return), v === null)) throw Error(s(341));
        ((v.lanes |= r),
          (d = v.alternate),
          d !== null && (d.lanes |= r),
          cc(v, r, t),
          (v = null));
      } else v = c.child;
      if (v !== null) v.return = c;
      else
        for (v = c; v !== null; ) {
          if (v === t) {
            v = null;
            break;
          }
          if (((c = v.sibling), c !== null)) {
            ((c.return = v.return), (v = c));
            break;
          }
          v = v.return;
        }
      c = v;
    }
  }
  function Oa(t, n, r, o) {
    t = null;
    for (var c = n, d = !1; c !== null; ) {
      if (!d) {
        if ((c.flags & 524288) !== 0) d = !0;
        else if ((c.flags & 262144) !== 0) break;
      }
      if (c.tag === 10) {
        var v = c.alternate;
        if (v === null) throw Error(s(387));
        if (((v = v.memoizedProps), v !== null)) {
          var w = c.type;
          _t(c.pendingProps.value, v.value) ||
            (t !== null ? t.push(w) : (t = [w]));
        }
      } else if (c === oe.current) {
        if (((v = c.alternate), v === null)) throw Error(s(387));
        v.memoizedState.memoizedState !== c.memoizedState.memoizedState &&
          (t !== null ? t.push(ds) : (t = [ds]));
      }
      c = c.return;
    }
    (t !== null && fc(n, t, r, o), (n.flags |= 262144));
  }
  function xo(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!_t(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Xi(t) {
    ((Ii = t),
      (Vn = null),
      (t = t.dependencies),
      t !== null && (t.firstContext = null));
  }
  function ct(t) {
    return kp(Ii, t);
  }
  function So(t, n) {
    return (Ii === null && Xi(t), kp(t, n));
  }
  function kp(t, n) {
    var r = n._currentValue;
    if (((n = { context: n, memoizedValue: r, next: null }), Vn === null)) {
      if (t === null) throw Error(s(308));
      ((Vn = n),
        (t.dependencies = { lanes: 0, firstContext: n }),
        (t.flags |= 524288));
    } else Vn = Vn.next = n;
    return r;
  }
  var IT =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var t = [],
              n = (this.signal = {
                aborted: !1,
                addEventListener: function (r, o) {
                  t.push(o);
                },
              });
            this.abort = function () {
              ((n.aborted = !0),
                t.forEach(function (r) {
                  return r();
                }));
            };
          },
    XT = e.unstable_scheduleCallback,
    KT = e.unstable_NormalPriority,
    Qe = {
      $$typeof: O,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function dc() {
    return { controller: new IT(), data: new Map(), refCount: 0 };
  }
  function Ur(t) {
    (t.refCount--,
      t.refCount === 0 &&
        XT(KT, function () {
          t.controller.abort();
        }));
  }
  var Hr = null,
    hc = 0,
    Na = 0,
    ja = null;
  function $T(t, n) {
    if (Hr === null) {
      var r = (Hr = []);
      ((hc = 0),
        (Na = yf()),
        (ja = {
          status: "pending",
          value: void 0,
          then: function (o) {
            r.push(o);
          },
        }));
    }
    return (hc++, n.then(Bp, Bp), n);
  }
  function Bp() {
    if (--hc === 0 && Hr !== null) {
      ja !== null && (ja.status = "fulfilled");
      var t = Hr;
      ((Hr = null), (Na = 0), (ja = null));
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function QT(t, n) {
    var r = [],
      o = {
        status: "pending",
        value: null,
        reason: null,
        then: function (c) {
          r.push(c);
        },
      };
    return (
      t.then(
        function () {
          ((o.status = "fulfilled"), (o.value = n));
          for (var c = 0; c < r.length; c++) (0, r[c])(n);
        },
        function (c) {
          for (o.status = "rejected", o.reason = c, c = 0; c < r.length; c++)
            (0, r[c])(void 0);
        },
      ),
      o
    );
  }
  var Up = z.S;
  z.S = function (t, n) {
    ((Ey = Ot()),
      typeof n == "object" &&
        n !== null &&
        typeof n.then == "function" &&
        $T(t, n),
      Up !== null && Up(t, n));
  };
  var Ki = N(null);
  function mc() {
    var t = Ki.current;
    return t !== null ? t : Ve.pooledCache;
  }
  function wo(t, n) {
    n === null ? Z(Ki, Ki.current) : Z(Ki, n.pool);
  }
  function Hp() {
    var t = mc();
    return t === null ? null : { parent: Qe._currentValue, pool: t };
  }
  var _a = Error(s(460)),
    pc = Error(s(474)),
    Eo = Error(s(542)),
    To = { then: function () {} };
  function qp(t) {
    return ((t = t.status), t === "fulfilled" || t === "rejected");
  }
  function Fp(t, n, r) {
    switch (
      ((r = t[r]),
      r === void 0 ? t.push(n) : r !== n && (n.then(_n, _n), (n = r)),
      n.status)
    ) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw ((t = n.reason), Yp(t), t);
      default:
        if (typeof n.status == "string") n.then(_n, _n);
        else {
          if (((t = Ve), t !== null && 100 < t.shellSuspendCounter))
            throw Error(s(482));
          ((t = n),
            (t.status = "pending"),
            t.then(
              function (o) {
                if (n.status === "pending") {
                  var c = n;
                  ((c.status = "fulfilled"), (c.value = o));
                }
              },
              function (o) {
                if (n.status === "pending") {
                  var c = n;
                  ((c.status = "rejected"), (c.reason = o));
                }
              },
            ));
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw ((t = n.reason), Yp(t), t);
        }
        throw ((Qi = n), _a);
    }
  }
  function $i(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function"
        ? ((Qi = r), _a)
        : r;
    }
  }
  var Qi = null;
  function Gp() {
    if (Qi === null) throw Error(s(459));
    var t = Qi;
    return ((Qi = null), t);
  }
  function Yp(t) {
    if (t === _a || t === Eo) throw Error(s(483));
  }
  var La = null,
    qr = 0;
  function Ao(t) {
    var n = qr;
    return ((qr += 1), La === null && (La = []), Fp(La, t, n));
  }
  function Fr(t, n) {
    ((n = n.props.ref), (t.ref = n !== void 0 ? n : null));
  }
  function Co(t, n) {
    throw n.$$typeof === S
      ? Error(s(525))
      : ((t = Object.prototype.toString.call(n)),
        Error(
          s(
            31,
            t === "[object Object]"
              ? "object with keys {" + Object.keys(n).join(", ") + "}"
              : t,
          ),
        ));
  }
  function Ip(t) {
    function n(_, j) {
      if (t) {
        var P = _.deletions;
        P === null ? ((_.deletions = [j]), (_.flags |= 16)) : P.push(j);
      }
    }
    function r(_, j) {
      if (!t) return null;
      for (; j !== null; ) (n(_, j), (j = j.sibling));
      return null;
    }
    function o(_) {
      for (var j = new Map(); _ !== null; )
        (_.key !== null ? j.set(_.key, _) : j.set(_.index, _), (_ = _.sibling));
      return j;
    }
    function c(_, j) {
      return ((_ = zn(_, j)), (_.index = 0), (_.sibling = null), _);
    }
    function d(_, j, P) {
      return (
        (_.index = P),
        t
          ? ((P = _.alternate),
            P !== null
              ? ((P = P.index), P < j ? ((_.flags |= 67108866), j) : P)
              : ((_.flags |= 67108866), j))
          : ((_.flags |= 1048576), j)
      );
    }
    function v(_) {
      return (t && _.alternate === null && (_.flags |= 67108866), _);
    }
    function w(_, j, P, X) {
      return j === null || j.tag !== 6
        ? ((j = ic(P, _.mode, X)), (j.return = _), j)
        : ((j = c(j, P)), (j.return = _), j);
    }
    function D(_, j, P, X) {
      var le = P.type;
      return le === E
        ? Y(_, j, P.props.children, X, P.key)
        : j !== null &&
            (j.elementType === le ||
              (typeof le == "object" &&
                le !== null &&
                le.$$typeof === F &&
                $i(le) === j.type))
          ? ((j = c(j, P.props)), Fr(j, P), (j.return = _), j)
          : ((j = vo(P.type, P.key, P.props, null, _.mode, X)),
            Fr(j, P),
            (j.return = _),
            j);
    }
    function k(_, j, P, X) {
      return j === null ||
        j.tag !== 4 ||
        j.stateNode.containerInfo !== P.containerInfo ||
        j.stateNode.implementation !== P.implementation
        ? ((j = ac(P, _.mode, X)), (j.return = _), j)
        : ((j = c(j, P.children || [])), (j.return = _), j);
    }
    function Y(_, j, P, X, le) {
      return j === null || j.tag !== 7
        ? ((j = Gi(P, _.mode, X, le)), (j.return = _), j)
        : ((j = c(j, P)), (j.return = _), j);
    }
    function K(_, j, P) {
      if (
        (typeof j == "string" && j !== "") ||
        typeof j == "number" ||
        typeof j == "bigint"
      )
        return ((j = ic("" + j, _.mode, P)), (j.return = _), j);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case T:
            return (
              (P = vo(j.type, j.key, j.props, null, _.mode, P)),
              Fr(P, j),
              (P.return = _),
              P
            );
          case C:
            return ((j = ac(j, _.mode, P)), (j.return = _), j);
          case F:
            return ((j = $i(j)), K(_, j, P));
        }
        if (he(j) || ge(j))
          return ((j = Gi(j, _.mode, P, null)), (j.return = _), j);
        if (typeof j.then == "function") return K(_, Ao(j), P);
        if (j.$$typeof === O) return K(_, So(_, j), P);
        Co(_, j);
      }
      return null;
    }
    function B(_, j, P, X) {
      var le = j !== null ? j.key : null;
      if (
        (typeof P == "string" && P !== "") ||
        typeof P == "number" ||
        typeof P == "bigint"
      )
        return le !== null ? null : w(_, j, "" + P, X);
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case T:
            return P.key === le ? D(_, j, P, X) : null;
          case C:
            return P.key === le ? k(_, j, P, X) : null;
          case F:
            return ((P = $i(P)), B(_, j, P, X));
        }
        if (he(P) || ge(P)) return le !== null ? null : Y(_, j, P, X, null);
        if (typeof P.then == "function") return B(_, j, Ao(P), X);
        if (P.$$typeof === O) return B(_, j, So(_, P), X);
        Co(_, P);
      }
      return null;
    }
    function q(_, j, P, X, le) {
      if (
        (typeof X == "string" && X !== "") ||
        typeof X == "number" ||
        typeof X == "bigint"
      )
        return ((_ = _.get(P) || null), w(j, _, "" + X, le));
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case T:
            return (
              (_ = _.get(X.key === null ? P : X.key) || null),
              D(j, _, X, le)
            );
          case C:
            return (
              (_ = _.get(X.key === null ? P : X.key) || null),
              k(j, _, X, le)
            );
          case F:
            return ((X = $i(X)), q(_, j, P, X, le));
        }
        if (he(X) || ge(X))
          return ((_ = _.get(P) || null), Y(j, _, X, le, null));
        if (typeof X.then == "function") return q(_, j, P, Ao(X), le);
        if (X.$$typeof === O) return q(_, j, P, So(j, X), le);
        Co(j, X);
      }
      return null;
    }
    function te(_, j, P, X) {
      for (
        var le = null, Re = null, re = j, be = (j = 0), Te = null;
        re !== null && be < P.length;
        be++
      ) {
        re.index > be ? ((Te = re), (re = null)) : (Te = re.sibling);
        var De = B(_, re, P[be], X);
        if (De === null) {
          re === null && (re = Te);
          break;
        }
        (t && re && De.alternate === null && n(_, re),
          (j = d(De, j, be)),
          Re === null ? (le = De) : (Re.sibling = De),
          (Re = De),
          (re = Te));
      }
      if (be === P.length) return (r(_, re), Ce && Pn(_, be), le);
      if (re === null) {
        for (; be < P.length; be++)
          ((re = K(_, P[be], X)),
            re !== null &&
              ((j = d(re, j, be)),
              Re === null ? (le = re) : (Re.sibling = re),
              (Re = re)));
        return (Ce && Pn(_, be), le);
      }
      for (re = o(re); be < P.length; be++)
        ((Te = q(re, _, be, P[be], X)),
          Te !== null &&
            (t &&
              Te.alternate !== null &&
              re.delete(Te.key === null ? be : Te.key),
            (j = d(Te, j, be)),
            Re === null ? (le = Te) : (Re.sibling = Te),
            (Re = Te)));
      return (
        t &&
          re.forEach(function (Ri) {
            return n(_, Ri);
          }),
        Ce && Pn(_, be),
        le
      );
    }
    function ue(_, j, P, X) {
      if (P == null) throw Error(s(151));
      for (
        var le = null,
          Re = null,
          re = j,
          be = (j = 0),
          Te = null,
          De = P.next();
        re !== null && !De.done;
        be++, De = P.next()
      ) {
        re.index > be ? ((Te = re), (re = null)) : (Te = re.sibling);
        var Ri = B(_, re, De.value, X);
        if (Ri === null) {
          re === null && (re = Te);
          break;
        }
        (t && re && Ri.alternate === null && n(_, re),
          (j = d(Ri, j, be)),
          Re === null ? (le = Ri) : (Re.sibling = Ri),
          (Re = Ri),
          (re = Te));
      }
      if (De.done) return (r(_, re), Ce && Pn(_, be), le);
      if (re === null) {
        for (; !De.done; be++, De = P.next())
          ((De = K(_, De.value, X)),
            De !== null &&
              ((j = d(De, j, be)),
              Re === null ? (le = De) : (Re.sibling = De),
              (Re = De)));
        return (Ce && Pn(_, be), le);
      }
      for (re = o(re); !De.done; be++, De = P.next())
        ((De = q(re, _, be, De.value, X)),
          De !== null &&
            (t &&
              De.alternate !== null &&
              re.delete(De.key === null ? be : De.key),
            (j = d(De, j, be)),
            Re === null ? (le = De) : (Re.sibling = De),
            (Re = De)));
      return (
        t &&
          re.forEach(function (oC) {
            return n(_, oC);
          }),
        Ce && Pn(_, be),
        le
      );
    }
    function ze(_, j, P, X) {
      if (
        (typeof P == "object" &&
          P !== null &&
          P.type === E &&
          P.key === null &&
          (P = P.props.children),
        typeof P == "object" && P !== null)
      ) {
        switch (P.$$typeof) {
          case T:
            e: {
              for (var le = P.key; j !== null; ) {
                if (j.key === le) {
                  if (((le = P.type), le === E)) {
                    if (j.tag === 7) {
                      (r(_, j.sibling),
                        (X = c(j, P.props.children)),
                        (X.return = _),
                        (_ = X));
                      break e;
                    }
                  } else if (
                    j.elementType === le ||
                    (typeof le == "object" &&
                      le !== null &&
                      le.$$typeof === F &&
                      $i(le) === j.type)
                  ) {
                    (r(_, j.sibling),
                      (X = c(j, P.props)),
                      Fr(X, P),
                      (X.return = _),
                      (_ = X));
                    break e;
                  }
                  r(_, j);
                  break;
                } else n(_, j);
                j = j.sibling;
              }
              P.type === E
                ? ((X = Gi(P.props.children, _.mode, X, P.key)),
                  (X.return = _),
                  (_ = X))
                : ((X = vo(P.type, P.key, P.props, null, _.mode, X)),
                  Fr(X, P),
                  (X.return = _),
                  (_ = X));
            }
            return v(_);
          case C:
            e: {
              for (le = P.key; j !== null; ) {
                if (j.key === le)
                  if (
                    j.tag === 4 &&
                    j.stateNode.containerInfo === P.containerInfo &&
                    j.stateNode.implementation === P.implementation
                  ) {
                    (r(_, j.sibling),
                      (X = c(j, P.children || [])),
                      (X.return = _),
                      (_ = X));
                    break e;
                  } else {
                    r(_, j);
                    break;
                  }
                else n(_, j);
                j = j.sibling;
              }
              ((X = ac(P, _.mode, X)), (X.return = _), (_ = X));
            }
            return v(_);
          case F:
            return ((P = $i(P)), ze(_, j, P, X));
        }
        if (he(P)) return te(_, j, P, X);
        if (ge(P)) {
          if (((le = ge(P)), typeof le != "function")) throw Error(s(150));
          return ((P = le.call(P)), ue(_, j, P, X));
        }
        if (typeof P.then == "function") return ze(_, j, Ao(P), X);
        if (P.$$typeof === O) return ze(_, j, So(_, P), X);
        Co(_, P);
      }
      return (typeof P == "string" && P !== "") ||
        typeof P == "number" ||
        typeof P == "bigint"
        ? ((P = "" + P),
          j !== null && j.tag === 6
            ? (r(_, j.sibling), (X = c(j, P)), (X.return = _), (_ = X))
            : (r(_, j), (X = ic(P, _.mode, X)), (X.return = _), (_ = X)),
          v(_))
        : r(_, j);
    }
    return function (_, j, P, X) {
      try {
        qr = 0;
        var le = ze(_, j, P, X);
        return ((La = null), le);
      } catch (re) {
        if (re === _a || re === Eo) throw re;
        var Re = Lt(29, re, null, _.mode);
        return ((Re.lanes = X), (Re.return = _), Re);
      } finally {
      }
    };
  }
  var Zi = Ip(!0),
    Xp = Ip(!1),
    ci = !1;
  function gc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function yc(t, n) {
    ((t = t.updateQueue),
      n.updateQueue === t &&
        (n.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        }));
  }
  function fi(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function di(t, n, r) {
    var o = t.updateQueue;
    if (o === null) return null;
    if (((o = o.shared), (Me & 2) !== 0)) {
      var c = o.pending;
      return (
        c === null ? (n.next = n) : ((n.next = c.next), (c.next = n)),
        (o.pending = n),
        (n = yo(t)),
        Op(t, null, r),
        n
      );
    }
    return (go(t, o, n, r), yo(t));
  }
  function Gr(t, n, r) {
    if (
      ((n = n.updateQueue), n !== null && ((n = n.shared), (r & 4194048) !== 0))
    ) {
      var o = n.lanes;
      ((o &= t.pendingLanes), (r |= o), (n.lanes = r), km(t, r));
    }
  }
  function vc(t, n) {
    var r = t.updateQueue,
      o = t.alternate;
    if (o !== null && ((o = o.updateQueue), r === o)) {
      var c = null,
        d = null;
      if (((r = r.firstBaseUpdate), r !== null)) {
        do {
          var v = {
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null,
          };
          (d === null ? (c = d = v) : (d = d.next = v), (r = r.next));
        } while (r !== null);
        d === null ? (c = d = n) : (d = d.next = n);
      } else c = d = n;
      ((r = {
        baseState: o.baseState,
        firstBaseUpdate: c,
        lastBaseUpdate: d,
        shared: o.shared,
        callbacks: o.callbacks,
      }),
        (t.updateQueue = r));
      return;
    }
    ((t = r.lastBaseUpdate),
      t === null ? (r.firstBaseUpdate = n) : (t.next = n),
      (r.lastBaseUpdate = n));
  }
  var bc = !1;
  function Yr() {
    if (bc) {
      var t = ja;
      if (t !== null) throw t;
    }
  }
  function Ir(t, n, r, o) {
    bc = !1;
    var c = t.updateQueue;
    ci = !1;
    var d = c.firstBaseUpdate,
      v = c.lastBaseUpdate,
      w = c.shared.pending;
    if (w !== null) {
      c.shared.pending = null;
      var D = w,
        k = D.next;
      ((D.next = null), v === null ? (d = k) : (v.next = k), (v = D));
      var Y = t.alternate;
      Y !== null &&
        ((Y = Y.updateQueue),
        (w = Y.lastBaseUpdate),
        w !== v &&
          (w === null ? (Y.firstBaseUpdate = k) : (w.next = k),
          (Y.lastBaseUpdate = D)));
    }
    if (d !== null) {
      var K = c.baseState;
      ((v = 0), (Y = k = D = null), (w = d));
      do {
        var B = w.lane & -536870913,
          q = B !== w.lane;
        if (q ? (Ee & B) === B : (o & B) === B) {
          (B !== 0 && B === Na && (bc = !0),
            Y !== null &&
              (Y = Y.next =
                {
                  lane: 0,
                  tag: w.tag,
                  payload: w.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var te = t,
              ue = w;
            B = n;
            var ze = r;
            switch (ue.tag) {
              case 1:
                if (((te = ue.payload), typeof te == "function")) {
                  K = te.call(ze, K, B);
                  break e;
                }
                K = te;
                break e;
              case 3:
                te.flags = (te.flags & -65537) | 128;
              case 0:
                if (
                  ((te = ue.payload),
                  (B = typeof te == "function" ? te.call(ze, K, B) : te),
                  B == null)
                )
                  break e;
                K = y({}, K, B);
                break e;
              case 2:
                ci = !0;
            }
          }
          ((B = w.callback),
            B !== null &&
              ((t.flags |= 64),
              q && (t.flags |= 8192),
              (q = c.callbacks),
              q === null ? (c.callbacks = [B]) : q.push(B)));
        } else
          ((q = {
            lane: B,
            tag: w.tag,
            payload: w.payload,
            callback: w.callback,
            next: null,
          }),
            Y === null ? ((k = Y = q), (D = K)) : (Y = Y.next = q),
            (v |= B));
        if (((w = w.next), w === null)) {
          if (((w = c.shared.pending), w === null)) break;
          ((q = w),
            (w = q.next),
            (q.next = null),
            (c.lastBaseUpdate = q),
            (c.shared.pending = null));
        }
      } while (!0);
      (Y === null && (D = K),
        (c.baseState = D),
        (c.firstBaseUpdate = k),
        (c.lastBaseUpdate = Y),
        d === null && (c.shared.lanes = 0),
        (yi |= v),
        (t.lanes = v),
        (t.memoizedState = K));
    }
  }
  function Kp(t, n) {
    if (typeof t != "function") throw Error(s(191, t));
    t.call(n);
  }
  function $p(t, n) {
    var r = t.callbacks;
    if (r !== null)
      for (t.callbacks = null, t = 0; t < r.length; t++) Kp(r[t], n);
  }
  var za = N(null),
    Ro = N(0);
  function Qp(t, n) {
    ((t = Xn), Z(Ro, t), Z(za, n), (Xn = t | n.baseLanes));
  }
  function xc() {
    (Z(Ro, Xn), Z(za, za.current));
  }
  function Sc() {
    ((Xn = Ro.current), I(za), I(Ro));
  }
  var zt = N(null),
    Zt = null;
  function hi(t) {
    var n = t.alternate;
    (Z(Xe, Xe.current & 1),
      Z(zt, t),
      Zt === null &&
        (n === null || za.current !== null || n.memoizedState !== null) &&
        (Zt = t));
  }
  function wc(t) {
    (Z(Xe, Xe.current), Z(zt, t), Zt === null && (Zt = t));
  }
  function Zp(t) {
    t.tag === 22
      ? (Z(Xe, Xe.current), Z(zt, t), Zt === null && (Zt = t))
      : mi();
  }
  function mi() {
    (Z(Xe, Xe.current), Z(zt, zt.current));
  }
  function Pt(t) {
    (I(zt), Zt === t && (Zt = null), I(Xe));
  }
  var Xe = N(0);
  function Do(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && ((r = r.dehydrated), r === null || Mf(r) || Of(r)))
          return n;
      } else if (
        n.tag === 19 &&
        (n.memoizedProps.revealOrder === "forwards" ||
          n.memoizedProps.revealOrder === "backwards" ||
          n.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          n.memoizedProps.revealOrder === "together")
      ) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        ((n.child.return = n), (n = n.child));
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return null;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
    return null;
  }
  var Bn = 0,
    ve = null,
    _e = null,
    Ze = null,
    Mo = !1,
    Pa = !1,
    Wi = !1,
    Oo = 0,
    Xr = 0,
    Va = null,
    ZT = 0;
  function Fe() {
    throw Error(s(321));
  }
  function Ec(t, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < t.length; r++)
      if (!_t(t[r], n[r])) return !1;
    return !0;
  }
  function Tc(t, n, r, o, c, d) {
    return (
      (Bn = d),
      (ve = n),
      (n.memoizedState = null),
      (n.updateQueue = null),
      (n.lanes = 0),
      (z.H = t === null || t.memoizedState === null ? Lg : Bc),
      (Wi = !1),
      (d = r(o, c)),
      (Wi = !1),
      Pa && (d = Jp(n, r, o, c)),
      Wp(t),
      d
    );
  }
  function Wp(t) {
    z.H = Qr;
    var n = _e !== null && _e.next !== null;
    if (((Bn = 0), (Ze = _e = ve = null), (Mo = !1), (Xr = 0), (Va = null), n))
      throw Error(s(300));
    t === null ||
      We ||
      ((t = t.dependencies), t !== null && xo(t) && (We = !0));
  }
  function Jp(t, n, r, o) {
    ve = t;
    var c = 0;
    do {
      if ((Pa && (Va = null), (Xr = 0), (Pa = !1), 25 <= c))
        throw Error(s(301));
      if (((c += 1), (Ze = _e = null), t.updateQueue != null)) {
        var d = t.updateQueue;
        ((d.lastEffect = null),
          (d.events = null),
          (d.stores = null),
          d.memoCache != null && (d.memoCache.index = 0));
      }
      ((z.H = zg), (d = n(r, o)));
    } while (Pa);
    return d;
  }
  function WT() {
    var t = z.H,
      n = t.useState()[0];
    return (
      (n = typeof n.then == "function" ? Kr(n) : n),
      (t = t.useState()[0]),
      (_e !== null ? _e.memoizedState : null) !== t && (ve.flags |= 1024),
      n
    );
  }
  function Ac() {
    var t = Oo !== 0;
    return ((Oo = 0), t);
  }
  function Cc(t, n, r) {
    ((n.updateQueue = t.updateQueue), (n.flags &= -2053), (t.lanes &= ~r));
  }
  function Rc(t) {
    if (Mo) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        (n !== null && (n.pending = null), (t = t.next));
      }
      Mo = !1;
    }
    ((Bn = 0), (Ze = _e = ve = null), (Pa = !1), (Xr = Oo = 0), (Va = null));
  }
  function gt() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Ze === null ? (ve.memoizedState = Ze = t) : (Ze = Ze.next = t), Ze);
  }
  function Ke() {
    if (_e === null) {
      var t = ve.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = _e.next;
    var n = Ze === null ? ve.memoizedState : Ze.next;
    if (n !== null) ((Ze = n), (_e = t));
    else {
      if (t === null)
        throw ve.alternate === null ? Error(s(467)) : Error(s(310));
      ((_e = t),
        (t = {
          memoizedState: _e.memoizedState,
          baseState: _e.baseState,
          baseQueue: _e.baseQueue,
          queue: _e.queue,
          next: null,
        }),
        Ze === null ? (ve.memoizedState = Ze = t) : (Ze = Ze.next = t));
    }
    return Ze;
  }
  function No() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Kr(t) {
    var n = Xr;
    return (
      (Xr += 1),
      Va === null && (Va = []),
      (t = Fp(Va, t, n)),
      (n = ve),
      (Ze === null ? n.memoizedState : Ze.next) === null &&
        ((n = n.alternate),
        (z.H = n === null || n.memoizedState === null ? Lg : Bc)),
      t
    );
  }
  function jo(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Kr(t);
      if (t.$$typeof === O) return ct(t);
    }
    throw Error(s(438, String(t)));
  }
  function Dc(t) {
    var n = null,
      r = ve.updateQueue;
    if ((r !== null && (n = r.memoCache), n == null)) {
      var o = ve.alternate;
      o !== null &&
        ((o = o.updateQueue),
        o !== null &&
          ((o = o.memoCache),
          o != null &&
            (n = {
              data: o.data.map(function (c) {
                return c.slice();
              }),
              index: 0,
            })));
    }
    if (
      (n == null && (n = { data: [], index: 0 }),
      r === null && ((r = No()), (ve.updateQueue = r)),
      (r.memoCache = n),
      (r = n.data[n.index]),
      r === void 0)
    )
      for (r = n.data[n.index] = Array(t), o = 0; o < t; o++) r[o] = se;
    return (n.index++, r);
  }
  function Un(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function _o(t) {
    var n = Ke();
    return Mc(n, _e, t);
  }
  function Mc(t, n, r) {
    var o = t.queue;
    if (o === null) throw Error(s(311));
    o.lastRenderedReducer = r;
    var c = t.baseQueue,
      d = o.pending;
    if (d !== null) {
      if (c !== null) {
        var v = c.next;
        ((c.next = d.next), (d.next = v));
      }
      ((n.baseQueue = c = d), (o.pending = null));
    }
    if (((d = t.baseState), c === null)) t.memoizedState = d;
    else {
      n = c.next;
      var w = (v = null),
        D = null,
        k = n,
        Y = !1;
      do {
        var K = k.lane & -536870913;
        if (K !== k.lane ? (Ee & K) === K : (Bn & K) === K) {
          var B = k.revertLane;
          if (B === 0)
            (D !== null &&
              (D = D.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: k.action,
                  hasEagerState: k.hasEagerState,
                  eagerState: k.eagerState,
                  next: null,
                }),
              K === Na && (Y = !0));
          else if ((Bn & B) === B) {
            ((k = k.next), B === Na && (Y = !0));
            continue;
          } else
            ((K = {
              lane: 0,
              revertLane: k.revertLane,
              gesture: null,
              action: k.action,
              hasEagerState: k.hasEagerState,
              eagerState: k.eagerState,
              next: null,
            }),
              D === null ? ((w = D = K), (v = d)) : (D = D.next = K),
              (ve.lanes |= B),
              (yi |= B));
          ((K = k.action),
            Wi && r(d, K),
            (d = k.hasEagerState ? k.eagerState : r(d, K)));
        } else
          ((B = {
            lane: K,
            revertLane: k.revertLane,
            gesture: k.gesture,
            action: k.action,
            hasEagerState: k.hasEagerState,
            eagerState: k.eagerState,
            next: null,
          }),
            D === null ? ((w = D = B), (v = d)) : (D = D.next = B),
            (ve.lanes |= K),
            (yi |= K));
        k = k.next;
      } while (k !== null && k !== n);
      if (
        (D === null ? (v = d) : (D.next = w),
        !_t(d, t.memoizedState) && ((We = !0), Y && ((r = ja), r !== null)))
      )
        throw r;
      ((t.memoizedState = d),
        (t.baseState = v),
        (t.baseQueue = D),
        (o.lastRenderedState = d));
    }
    return (c === null && (o.lanes = 0), [t.memoizedState, o.dispatch]);
  }
  function Oc(t) {
    var n = Ke(),
      r = n.queue;
    if (r === null) throw Error(s(311));
    r.lastRenderedReducer = t;
    var o = r.dispatch,
      c = r.pending,
      d = n.memoizedState;
    if (c !== null) {
      r.pending = null;
      var v = (c = c.next);
      do ((d = t(d, v.action)), (v = v.next));
      while (v !== c);
      (_t(d, n.memoizedState) || (We = !0),
        (n.memoizedState = d),
        n.baseQueue === null && (n.baseState = d),
        (r.lastRenderedState = d));
    }
    return [d, o];
  }
  function eg(t, n, r) {
    var o = ve,
      c = Ke(),
      d = Ce;
    if (d) {
      if (r === void 0) throw Error(s(407));
      r = r();
    } else r = n();
    var v = !_t((_e || c).memoizedState, r);
    if (
      (v && ((c.memoizedState = r), (We = !0)),
      (c = c.queue),
      _c(ig.bind(null, o, c, t), [t]),
      c.getSnapshot !== n || v || (Ze !== null && Ze.memoizedState.tag & 1))
    ) {
      if (
        ((o.flags |= 2048),
        ka(9, { destroy: void 0 }, ng.bind(null, o, c, r, n), null),
        Ve === null)
      )
        throw Error(s(349));
      d || (Bn & 127) !== 0 || tg(o, n, r);
    }
    return r;
  }
  function tg(t, n, r) {
    ((t.flags |= 16384),
      (t = { getSnapshot: n, value: r }),
      (n = ve.updateQueue),
      n === null
        ? ((n = No()), (ve.updateQueue = n), (n.stores = [t]))
        : ((r = n.stores), r === null ? (n.stores = [t]) : r.push(t)));
  }
  function ng(t, n, r, o) {
    ((n.value = r), (n.getSnapshot = o), ag(n) && rg(t));
  }
  function ig(t, n, r) {
    return r(function () {
      ag(n) && rg(t);
    });
  }
  function ag(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var r = n();
      return !_t(t, r);
    } catch {
      return !0;
    }
  }
  function rg(t) {
    var n = Fi(t, 2);
    n !== null && At(n, t, 2);
  }
  function Nc(t) {
    var n = gt();
    if (typeof t == "function") {
      var r = t;
      if (((t = r()), Wi)) {
        ii(!0);
        try {
          r();
        } finally {
          ii(!1);
        }
      }
    }
    return (
      (n.memoizedState = n.baseState = t),
      (n.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Un,
        lastRenderedState: t,
      }),
      n
    );
  }
  function sg(t, n, r, o) {
    return ((t.baseState = r), Mc(t, _e, typeof o == "function" ? o : Un));
  }
  function JT(t, n, r, o, c) {
    if (Po(t)) throw Error(s(485));
    if (((t = n.action), t !== null)) {
      var d = {
        payload: c,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (v) {
          d.listeners.push(v);
        },
      };
      (z.T !== null ? r(!0) : (d.isTransition = !1),
        o(d),
        (r = n.pending),
        r === null
          ? ((d.next = n.pending = d), og(n, d))
          : ((d.next = r.next), (n.pending = r.next = d)));
    }
  }
  function og(t, n) {
    var r = n.action,
      o = n.payload,
      c = t.state;
    if (n.isTransition) {
      var d = z.T,
        v = {};
      z.T = v;
      try {
        var w = r(c, o),
          D = z.S;
        (D !== null && D(v, w), lg(t, n, w));
      } catch (k) {
        jc(t, n, k);
      } finally {
        (d !== null && v.types !== null && (d.types = v.types), (z.T = d));
      }
    } else
      try {
        ((d = r(c, o)), lg(t, n, d));
      } catch (k) {
        jc(t, n, k);
      }
  }
  function lg(t, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function"
      ? r.then(
          function (o) {
            ug(t, n, o);
          },
          function (o) {
            return jc(t, n, o);
          },
        )
      : ug(t, n, r);
  }
  function ug(t, n, r) {
    ((n.status = "fulfilled"),
      (n.value = r),
      cg(n),
      (t.state = r),
      (n = t.pending),
      n !== null &&
        ((r = n.next),
        r === n ? (t.pending = null) : ((r = r.next), (n.next = r), og(t, r))));
  }
  function jc(t, n, r) {
    var o = t.pending;
    if (((t.pending = null), o !== null)) {
      o = o.next;
      do ((n.status = "rejected"), (n.reason = r), cg(n), (n = n.next));
      while (n !== o);
    }
    t.action = null;
  }
  function cg(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function fg(t, n) {
    return n;
  }
  function dg(t, n) {
    if (Ce) {
      var r = Ve.formState;
      if (r !== null) {
        e: {
          var o = ve;
          if (Ce) {
            if (ke) {
              t: {
                for (var c = ke, d = Qt; c.nodeType !== 8; ) {
                  if (!d) {
                    c = null;
                    break t;
                  }
                  if (((c = Wt(c.nextSibling)), c === null)) {
                    c = null;
                    break t;
                  }
                }
                ((d = c.data), (c = d === "F!" || d === "F" ? c : null));
              }
              if (c) {
                ((ke = Wt(c.nextSibling)), (o = c.data === "F!"));
                break e;
              }
            }
            li(o);
          }
          o = !1;
        }
        o && (n = r[0]);
      }
    }
    return (
      (r = gt()),
      (r.memoizedState = r.baseState = n),
      (o = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: fg,
        lastRenderedState: n,
      }),
      (r.queue = o),
      (r = Ng.bind(null, ve, o)),
      (o.dispatch = r),
      (o = Nc(!1)),
      (d = kc.bind(null, ve, !1, o.queue)),
      (o = gt()),
      (c = { state: n, dispatch: null, action: t, pending: null }),
      (o.queue = c),
      (r = JT.bind(null, ve, c, d, r)),
      (c.dispatch = r),
      (o.memoizedState = t),
      [n, r, !1]
    );
  }
  function hg(t) {
    var n = Ke();
    return mg(n, _e, t);
  }
  function mg(t, n, r) {
    if (
      ((n = Mc(t, n, fg)[0]),
      (t = _o(Un)[0]),
      typeof n == "object" && n !== null && typeof n.then == "function")
    )
      try {
        var o = Kr(n);
      } catch (v) {
        throw v === _a ? Eo : v;
      }
    else o = n;
    n = Ke();
    var c = n.queue,
      d = c.dispatch;
    return (
      r !== n.memoizedState &&
        ((ve.flags |= 2048),
        ka(9, { destroy: void 0 }, eA.bind(null, c, r), null)),
      [o, d, t]
    );
  }
  function eA(t, n) {
    t.action = n;
  }
  function pg(t) {
    var n = Ke(),
      r = _e;
    if (r !== null) return mg(n, r, t);
    (Ke(), (n = n.memoizedState), (r = Ke()));
    var o = r.queue.dispatch;
    return ((r.memoizedState = t), [n, o, !1]);
  }
  function ka(t, n, r, o) {
    return (
      (t = { tag: t, create: r, deps: o, inst: n, next: null }),
      (n = ve.updateQueue),
      n === null && ((n = No()), (ve.updateQueue = n)),
      (r = n.lastEffect),
      r === null
        ? (n.lastEffect = t.next = t)
        : ((o = r.next), (r.next = t), (t.next = o), (n.lastEffect = t)),
      t
    );
  }
  function gg() {
    return Ke().memoizedState;
  }
  function Lo(t, n, r, o) {
    var c = gt();
    ((ve.flags |= t),
      (c.memoizedState = ka(
        1 | n,
        { destroy: void 0 },
        r,
        o === void 0 ? null : o,
      )));
  }
  function zo(t, n, r, o) {
    var c = Ke();
    o = o === void 0 ? null : o;
    var d = c.memoizedState.inst;
    _e !== null && o !== null && Ec(o, _e.memoizedState.deps)
      ? (c.memoizedState = ka(n, d, r, o))
      : ((ve.flags |= t), (c.memoizedState = ka(1 | n, d, r, o)));
  }
  function yg(t, n) {
    Lo(8390656, 8, t, n);
  }
  function _c(t, n) {
    zo(2048, 8, t, n);
  }
  function tA(t) {
    ve.flags |= 4;
    var n = ve.updateQueue;
    if (n === null) ((n = No()), (ve.updateQueue = n), (n.events = [t]));
    else {
      var r = n.events;
      r === null ? (n.events = [t]) : r.push(t);
    }
  }
  function vg(t) {
    var n = Ke().memoizedState;
    return (
      tA({ ref: n, nextImpl: t }),
      function () {
        if ((Me & 2) !== 0) throw Error(s(440));
        return n.impl.apply(void 0, arguments);
      }
    );
  }
  function bg(t, n) {
    return zo(4, 2, t, n);
  }
  function xg(t, n) {
    return zo(4, 4, t, n);
  }
  function Sg(t, n) {
    if (typeof n == "function") {
      t = t();
      var r = n(t);
      return function () {
        typeof r == "function" ? r() : n(null);
      };
    }
    if (n != null)
      return (
        (t = t()),
        (n.current = t),
        function () {
          n.current = null;
        }
      );
  }
  function wg(t, n, r) {
    ((r = r != null ? r.concat([t]) : null), zo(4, 4, Sg.bind(null, n, t), r));
  }
  function Lc() {}
  function Eg(t, n) {
    var r = Ke();
    n = n === void 0 ? null : n;
    var o = r.memoizedState;
    return n !== null && Ec(n, o[1]) ? o[0] : ((r.memoizedState = [t, n]), t);
  }
  function Tg(t, n) {
    var r = Ke();
    n = n === void 0 ? null : n;
    var o = r.memoizedState;
    if (n !== null && Ec(n, o[1])) return o[0];
    if (((o = t()), Wi)) {
      ii(!0);
      try {
        t();
      } finally {
        ii(!1);
      }
    }
    return ((r.memoizedState = [o, n]), o);
  }
  function zc(t, n, r) {
    return r === void 0 || ((Bn & 1073741824) !== 0 && (Ee & 261930) === 0)
      ? (t.memoizedState = n)
      : ((t.memoizedState = r), (t = Ay()), (ve.lanes |= t), (yi |= t), r);
  }
  function Ag(t, n, r, o) {
    return _t(r, n)
      ? r
      : za.current !== null
        ? ((t = zc(t, r, o)), _t(t, n) || (We = !0), t)
        : (Bn & 42) === 0 || ((Bn & 1073741824) !== 0 && (Ee & 261930) === 0)
          ? ((We = !0), (t.memoizedState = r))
          : ((t = Ay()), (ve.lanes |= t), (yi |= t), n);
  }
  function Cg(t, n, r, o, c) {
    var d = G.p;
    G.p = d !== 0 && 8 > d ? d : 8;
    var v = z.T,
      w = {};
    ((z.T = w), kc(t, !1, n, r));
    try {
      var D = c(),
        k = z.S;
      if (
        (k !== null && k(w, D),
        D !== null && typeof D == "object" && typeof D.then == "function")
      ) {
        var Y = QT(D, o);
        $r(t, n, Y, Bt(t));
      } else $r(t, n, o, Bt(t));
    } catch (K) {
      $r(t, n, { then: function () {}, status: "rejected", reason: K }, Bt());
    } finally {
      ((G.p = d),
        v !== null && w.types !== null && (v.types = w.types),
        (z.T = v));
    }
  }
  function nA() {}
  function Pc(t, n, r, o) {
    if (t.tag !== 5) throw Error(s(476));
    var c = Rg(t).queue;
    Cg(
      t,
      c,
      n,
      U,
      r === null
        ? nA
        : function () {
            return (Dg(t), r(o));
          },
    );
  }
  function Rg(t) {
    var n = t.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: U,
      baseState: U,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Un,
        lastRenderedState: U,
      },
      next: null,
    };
    var r = {};
    return (
      (n.next = {
        memoizedState: r,
        baseState: r,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Un,
          lastRenderedState: r,
        },
        next: null,
      }),
      (t.memoizedState = n),
      (t = t.alternate),
      t !== null && (t.memoizedState = n),
      n
    );
  }
  function Dg(t) {
    var n = Rg(t);
    (n.next === null && (n = t.alternate.memoizedState),
      $r(t, n.next.queue, {}, Bt()));
  }
  function Vc() {
    return ct(ds);
  }
  function Mg() {
    return Ke().memoizedState;
  }
  function Og() {
    return Ke().memoizedState;
  }
  function iA(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = Bt();
          t = fi(r);
          var o = di(n, t, r);
          (o !== null && (At(o, n, r), Gr(o, n, r)),
            (n = { cache: dc() }),
            (t.payload = n));
          return;
      }
      n = n.return;
    }
  }
  function aA(t, n, r) {
    var o = Bt();
    ((r = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Po(t)
        ? jg(n, r)
        : ((r = tc(t, n, r, o)), r !== null && (At(r, t, o), _g(r, n, o))));
  }
  function Ng(t, n, r) {
    var o = Bt();
    $r(t, n, r, o);
  }
  function $r(t, n, r, o) {
    var c = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Po(t)) jg(n, c);
    else {
      var d = t.alternate;
      if (
        t.lanes === 0 &&
        (d === null || d.lanes === 0) &&
        ((d = n.lastRenderedReducer), d !== null)
      )
        try {
          var v = n.lastRenderedState,
            w = d(v, r);
          if (((c.hasEagerState = !0), (c.eagerState = w), _t(w, v)))
            return (go(t, n, c, 0), Ve === null && po(), !1);
        } catch {
        } finally {
        }
      if (((r = tc(t, n, c, o)), r !== null))
        return (At(r, t, o), _g(r, n, o), !0);
    }
    return !1;
  }
  function kc(t, n, r, o) {
    if (
      ((o = {
        lane: 2,
        revertLane: yf(),
        gesture: null,
        action: o,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Po(t))
    ) {
      if (n) throw Error(s(479));
    } else ((n = tc(t, r, o, 2)), n !== null && At(n, t, 2));
  }
  function Po(t) {
    var n = t.alternate;
    return t === ve || (n !== null && n === ve);
  }
  function jg(t, n) {
    Pa = Mo = !0;
    var r = t.pending;
    (r === null ? (n.next = n) : ((n.next = r.next), (r.next = n)),
      (t.pending = n));
  }
  function _g(t, n, r) {
    if ((r & 4194048) !== 0) {
      var o = n.lanes;
      ((o &= t.pendingLanes), (r |= o), (n.lanes = r), km(t, r));
    }
  }
  var Qr = {
    readContext: ct,
    use: jo,
    useCallback: Fe,
    useContext: Fe,
    useEffect: Fe,
    useImperativeHandle: Fe,
    useLayoutEffect: Fe,
    useInsertionEffect: Fe,
    useMemo: Fe,
    useReducer: Fe,
    useRef: Fe,
    useState: Fe,
    useDebugValue: Fe,
    useDeferredValue: Fe,
    useTransition: Fe,
    useSyncExternalStore: Fe,
    useId: Fe,
    useHostTransitionStatus: Fe,
    useFormState: Fe,
    useActionState: Fe,
    useOptimistic: Fe,
    useMemoCache: Fe,
    useCacheRefresh: Fe,
  };
  Qr.useEffectEvent = Fe;
  var Lg = {
      readContext: ct,
      use: jo,
      useCallback: function (t, n) {
        return ((gt().memoizedState = [t, n === void 0 ? null : n]), t);
      },
      useContext: ct,
      useEffect: yg,
      useImperativeHandle: function (t, n, r) {
        ((r = r != null ? r.concat([t]) : null),
          Lo(4194308, 4, Sg.bind(null, n, t), r));
      },
      useLayoutEffect: function (t, n) {
        return Lo(4194308, 4, t, n);
      },
      useInsertionEffect: function (t, n) {
        Lo(4, 2, t, n);
      },
      useMemo: function (t, n) {
        var r = gt();
        n = n === void 0 ? null : n;
        var o = t();
        if (Wi) {
          ii(!0);
          try {
            t();
          } finally {
            ii(!1);
          }
        }
        return ((r.memoizedState = [o, n]), o);
      },
      useReducer: function (t, n, r) {
        var o = gt();
        if (r !== void 0) {
          var c = r(n);
          if (Wi) {
            ii(!0);
            try {
              r(n);
            } finally {
              ii(!1);
            }
          }
        } else c = n;
        return (
          (o.memoizedState = o.baseState = c),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: c,
          }),
          (o.queue = t),
          (t = t.dispatch = aA.bind(null, ve, t)),
          [o.memoizedState, t]
        );
      },
      useRef: function (t) {
        var n = gt();
        return ((t = { current: t }), (n.memoizedState = t));
      },
      useState: function (t) {
        t = Nc(t);
        var n = t.queue,
          r = Ng.bind(null, ve, n);
        return ((n.dispatch = r), [t.memoizedState, r]);
      },
      useDebugValue: Lc,
      useDeferredValue: function (t, n) {
        var r = gt();
        return zc(r, t, n);
      },
      useTransition: function () {
        var t = Nc(!1);
        return (
          (t = Cg.bind(null, ve, t.queue, !0, !1)),
          (gt().memoizedState = t),
          [!1, t]
        );
      },
      useSyncExternalStore: function (t, n, r) {
        var o = ve,
          c = gt();
        if (Ce) {
          if (r === void 0) throw Error(s(407));
          r = r();
        } else {
          if (((r = n()), Ve === null)) throw Error(s(349));
          (Ee & 127) !== 0 || tg(o, n, r);
        }
        c.memoizedState = r;
        var d = { value: r, getSnapshot: n };
        return (
          (c.queue = d),
          yg(ig.bind(null, o, d, t), [t]),
          (o.flags |= 2048),
          ka(9, { destroy: void 0 }, ng.bind(null, o, d, r, n), null),
          r
        );
      },
      useId: function () {
        var t = gt(),
          n = Ve.identifierPrefix;
        if (Ce) {
          var r = vn,
            o = yn;
          ((r = (o & ~(1 << (32 - jt(o) - 1))).toString(32) + r),
            (n = "_" + n + "R_" + r),
            (r = Oo++),
            0 < r && (n += "H" + r.toString(32)),
            (n += "_"));
        } else ((r = ZT++), (n = "_" + n + "r_" + r.toString(32) + "_"));
        return (t.memoizedState = n);
      },
      useHostTransitionStatus: Vc,
      useFormState: dg,
      useActionState: dg,
      useOptimistic: function (t) {
        var n = gt();
        n.memoizedState = n.baseState = t;
        var r = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (n.queue = r),
          (n = kc.bind(null, ve, !0, r)),
          (r.dispatch = n),
          [t, n]
        );
      },
      useMemoCache: Dc,
      useCacheRefresh: function () {
        return (gt().memoizedState = iA.bind(null, ve));
      },
      useEffectEvent: function (t) {
        var n = gt(),
          r = { impl: t };
        return (
          (n.memoizedState = r),
          function () {
            if ((Me & 2) !== 0) throw Error(s(440));
            return r.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Bc = {
      readContext: ct,
      use: jo,
      useCallback: Eg,
      useContext: ct,
      useEffect: _c,
      useImperativeHandle: wg,
      useInsertionEffect: bg,
      useLayoutEffect: xg,
      useMemo: Tg,
      useReducer: _o,
      useRef: gg,
      useState: function () {
        return _o(Un);
      },
      useDebugValue: Lc,
      useDeferredValue: function (t, n) {
        var r = Ke();
        return Ag(r, _e.memoizedState, t, n);
      },
      useTransition: function () {
        var t = _o(Un)[0],
          n = Ke().memoizedState;
        return [typeof t == "boolean" ? t : Kr(t), n];
      },
      useSyncExternalStore: eg,
      useId: Mg,
      useHostTransitionStatus: Vc,
      useFormState: hg,
      useActionState: hg,
      useOptimistic: function (t, n) {
        var r = Ke();
        return sg(r, _e, t, n);
      },
      useMemoCache: Dc,
      useCacheRefresh: Og,
    };
  Bc.useEffectEvent = vg;
  var zg = {
    readContext: ct,
    use: jo,
    useCallback: Eg,
    useContext: ct,
    useEffect: _c,
    useImperativeHandle: wg,
    useInsertionEffect: bg,
    useLayoutEffect: xg,
    useMemo: Tg,
    useReducer: Oc,
    useRef: gg,
    useState: function () {
      return Oc(Un);
    },
    useDebugValue: Lc,
    useDeferredValue: function (t, n) {
      var r = Ke();
      return _e === null ? zc(r, t, n) : Ag(r, _e.memoizedState, t, n);
    },
    useTransition: function () {
      var t = Oc(Un)[0],
        n = Ke().memoizedState;
      return [typeof t == "boolean" ? t : Kr(t), n];
    },
    useSyncExternalStore: eg,
    useId: Mg,
    useHostTransitionStatus: Vc,
    useFormState: pg,
    useActionState: pg,
    useOptimistic: function (t, n) {
      var r = Ke();
      return _e !== null
        ? sg(r, _e, t, n)
        : ((r.baseState = t), [t, r.queue.dispatch]);
    },
    useMemoCache: Dc,
    useCacheRefresh: Og,
  };
  zg.useEffectEvent = vg;
  function Uc(t, n, r, o) {
    ((n = t.memoizedState),
      (r = r(o, n)),
      (r = r == null ? n : y({}, n, r)),
      (t.memoizedState = r),
      t.lanes === 0 && (t.updateQueue.baseState = r));
  }
  var Hc = {
    enqueueSetState: function (t, n, r) {
      t = t._reactInternals;
      var o = Bt(),
        c = fi(o);
      ((c.payload = n),
        r != null && (c.callback = r),
        (n = di(t, c, o)),
        n !== null && (At(n, t, o), Gr(n, t, o)));
    },
    enqueueReplaceState: function (t, n, r) {
      t = t._reactInternals;
      var o = Bt(),
        c = fi(o);
      ((c.tag = 1),
        (c.payload = n),
        r != null && (c.callback = r),
        (n = di(t, c, o)),
        n !== null && (At(n, t, o), Gr(n, t, o)));
    },
    enqueueForceUpdate: function (t, n) {
      t = t._reactInternals;
      var r = Bt(),
        o = fi(r);
      ((o.tag = 2),
        n != null && (o.callback = n),
        (n = di(t, o, r)),
        n !== null && (At(n, t, r), Gr(n, t, r)));
    },
  };
  function Pg(t, n, r, o, c, d, v) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(o, d, v)
        : n.prototype && n.prototype.isPureReactComponent
          ? !Pr(r, o) || !Pr(c, d)
          : !0
    );
  }
  function Vg(t, n, r, o) {
    ((t = n.state),
      typeof n.componentWillReceiveProps == "function" &&
        n.componentWillReceiveProps(r, o),
      typeof n.UNSAFE_componentWillReceiveProps == "function" &&
        n.UNSAFE_componentWillReceiveProps(r, o),
      n.state !== t && Hc.enqueueReplaceState(n, n.state, null));
  }
  function Ji(t, n) {
    var r = n;
    if ("ref" in n) {
      r = {};
      for (var o in n) o !== "ref" && (r[o] = n[o]);
    }
    if ((t = t.defaultProps)) {
      r === n && (r = y({}, r));
      for (var c in t) r[c] === void 0 && (r[c] = t[c]);
    }
    return r;
  }
  function kg(t) {
    mo(t);
  }
  function Bg(t) {
    console.error(t);
  }
  function Ug(t) {
    mo(t);
  }
  function Vo(t, n) {
    try {
      var r = t.onUncaughtError;
      r(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function () {
        throw o;
      });
    }
  }
  function Hg(t, n, r) {
    try {
      var o = t.onCaughtError;
      o(r.value, {
        componentStack: r.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null,
      });
    } catch (c) {
      setTimeout(function () {
        throw c;
      });
    }
  }
  function qc(t, n, r) {
    return (
      (r = fi(r)),
      (r.tag = 3),
      (r.payload = { element: null }),
      (r.callback = function () {
        Vo(t, n);
      }),
      r
    );
  }
  function qg(t) {
    return ((t = fi(t)), (t.tag = 3), t);
  }
  function Fg(t, n, r, o) {
    var c = r.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var d = o.value;
      ((t.payload = function () {
        return c(d);
      }),
        (t.callback = function () {
          Hg(n, r, o);
        }));
    }
    var v = r.stateNode;
    v !== null &&
      typeof v.componentDidCatch == "function" &&
      (t.callback = function () {
        (Hg(n, r, o),
          typeof c != "function" &&
            (vi === null ? (vi = new Set([this])) : vi.add(this)));
        var w = o.stack;
        this.componentDidCatch(o.value, {
          componentStack: w !== null ? w : "",
        });
      });
  }
  function rA(t, n, r, o, c) {
    if (
      ((r.flags |= 32768),
      o !== null && typeof o == "object" && typeof o.then == "function")
    ) {
      if (
        ((n = r.alternate),
        n !== null && Oa(n, r, c, !0),
        (r = zt.current),
        r !== null)
      ) {
        switch (r.tag) {
          case 31:
          case 13:
            return (
              Zt === null ? $o() : r.alternate === null && Ge === 0 && (Ge = 3),
              (r.flags &= -257),
              (r.flags |= 65536),
              (r.lanes = c),
              o === To
                ? (r.flags |= 16384)
                : ((n = r.updateQueue),
                  n === null ? (r.updateQueue = new Set([o])) : n.add(o),
                  mf(t, o, c)),
              !1
            );
          case 22:
            return (
              (r.flags |= 65536),
              o === To
                ? (r.flags |= 16384)
                : ((n = r.updateQueue),
                  n === null
                    ? ((n = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([o]),
                      }),
                      (r.updateQueue = n))
                    : ((r = n.retryQueue),
                      r === null ? (n.retryQueue = new Set([o])) : r.add(o)),
                  mf(t, o, c)),
              !1
            );
        }
        throw Error(s(435, r.tag));
      }
      return (mf(t, o, c), $o(), !1);
    }
    if (Ce)
      return (
        (n = zt.current),
        n !== null
          ? ((n.flags & 65536) === 0 && (n.flags |= 256),
            (n.flags |= 65536),
            (n.lanes = c),
            o !== oc && ((t = Error(s(422), { cause: o })), Br(Xt(t, r))))
          : (o !== oc && ((n = Error(s(423), { cause: o })), Br(Xt(n, r))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (c &= -c),
            (t.lanes |= c),
            (o = Xt(o, r)),
            (c = qc(t.stateNode, o, c)),
            vc(t, c),
            Ge !== 4 && (Ge = 2)),
        !1
      );
    var d = Error(s(520), { cause: o });
    if (
      ((d = Xt(d, r)),
      as === null ? (as = [d]) : as.push(d),
      Ge !== 4 && (Ge = 2),
      n === null)
    )
      return !0;
    ((o = Xt(o, r)), (r = n));
    do {
      switch (r.tag) {
        case 3:
          return (
            (r.flags |= 65536),
            (t = c & -c),
            (r.lanes |= t),
            (t = qc(r.stateNode, o, t)),
            vc(r, t),
            !1
          );
        case 1:
          if (
            ((n = r.type),
            (d = r.stateNode),
            (r.flags & 128) === 0 &&
              (typeof n.getDerivedStateFromError == "function" ||
                (d !== null &&
                  typeof d.componentDidCatch == "function" &&
                  (vi === null || !vi.has(d)))))
          )
            return (
              (r.flags |= 65536),
              (c &= -c),
              (r.lanes |= c),
              (c = qg(c)),
              Fg(c, t, r, o),
              vc(r, c),
              !1
            );
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var Fc = Error(s(461)),
    We = !1;
  function ft(t, n, r, o) {
    n.child = t === null ? Xp(n, null, r, o) : Zi(n, t.child, r, o);
  }
  function Gg(t, n, r, o, c) {
    r = r.render;
    var d = n.ref;
    if ("ref" in o) {
      var v = {};
      for (var w in o) w !== "ref" && (v[w] = o[w]);
    } else v = o;
    return (
      Xi(n),
      (o = Tc(t, n, r, v, d, c)),
      (w = Ac()),
      t !== null && !We
        ? (Cc(t, n, c), Hn(t, n, c))
        : (Ce && w && rc(n), (n.flags |= 1), ft(t, n, o, c), n.child)
    );
  }
  function Yg(t, n, r, o, c) {
    if (t === null) {
      var d = r.type;
      return typeof d == "function" &&
        !nc(d) &&
        d.defaultProps === void 0 &&
        r.compare === null
        ? ((n.tag = 15), (n.type = d), Ig(t, n, d, o, c))
        : ((t = vo(r.type, null, o, n, n.mode, c)),
          (t.ref = n.ref),
          (t.return = n),
          (n.child = t));
    }
    if (((d = t.child), !Zc(t, c))) {
      var v = d.memoizedProps;
      if (
        ((r = r.compare), (r = r !== null ? r : Pr), r(v, o) && t.ref === n.ref)
      )
        return Hn(t, n, c);
    }
    return (
      (n.flags |= 1),
      (t = zn(d, o)),
      (t.ref = n.ref),
      (t.return = n),
      (n.child = t)
    );
  }
  function Ig(t, n, r, o, c) {
    if (t !== null) {
      var d = t.memoizedProps;
      if (Pr(d, o) && t.ref === n.ref)
        if (((We = !1), (n.pendingProps = o = d), Zc(t, c)))
          (t.flags & 131072) !== 0 && (We = !0);
        else return ((n.lanes = t.lanes), Hn(t, n, c));
    }
    return Gc(t, n, r, o, c);
  }
  function Xg(t, n, r, o) {
    var c = o.children,
      d = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        n.stateNode === null &&
        (n.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      o.mode === "hidden")
    ) {
      if ((n.flags & 128) !== 0) {
        if (((d = d !== null ? d.baseLanes | r : r), t !== null)) {
          for (o = n.child = t.child, c = 0; o !== null; )
            ((c = c | o.lanes | o.childLanes), (o = o.sibling));
          o = c & ~d;
        } else ((o = 0), (n.child = null));
        return Kg(t, n, d, r, o);
      }
      if ((r & 536870912) !== 0)
        ((n.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && wo(n, d !== null ? d.cachePool : null),
          d !== null ? Qp(n, d) : xc(),
          Zp(n));
      else
        return (
          (o = n.lanes = 536870912),
          Kg(t, n, d !== null ? d.baseLanes | r : r, r, o)
        );
    } else
      d !== null
        ? (wo(n, d.cachePool), Qp(n, d), mi(), (n.memoizedState = null))
        : (t !== null && wo(n, null), xc(), mi());
    return (ft(t, n, c, r), n.child);
  }
  function Zr(t, n) {
    return (
      (t !== null && t.tag === 22) ||
        n.stateNode !== null ||
        (n.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      n.sibling
    );
  }
  function Kg(t, n, r, o, c) {
    var d = mc();
    return (
      (d = d === null ? null : { parent: Qe._currentValue, pool: d }),
      (n.memoizedState = { baseLanes: r, cachePool: d }),
      t !== null && wo(n, null),
      xc(),
      Zp(n),
      t !== null && Oa(t, n, o, !0),
      (n.childLanes = c),
      null
    );
  }
  function ko(t, n) {
    return (
      (n = Uo({ mode: n.mode, children: n.children }, t.mode)),
      (n.ref = t.ref),
      (t.child = n),
      (n.return = t),
      n
    );
  }
  function $g(t, n, r) {
    return (
      Zi(n, t.child, null, r),
      (t = ko(n, n.pendingProps)),
      (t.flags |= 2),
      Pt(n),
      (n.memoizedState = null),
      t
    );
  }
  function sA(t, n, r) {
    var o = n.pendingProps,
      c = (n.flags & 128) !== 0;
    if (((n.flags &= -129), t === null)) {
      if (Ce) {
        if (o.mode === "hidden")
          return ((t = ko(n, o)), (n.lanes = 536870912), Zr(null, t));
        if (
          (wc(n),
          (t = ke)
            ? ((t = ov(t, Qt)),
              (t = t !== null && t.data === "&" ? t : null),
              t !== null &&
                ((n.memoizedState = {
                  dehydrated: t,
                  treeContext: si !== null ? { id: yn, overflow: vn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (r = jp(t)),
                (r.return = n),
                (n.child = r),
                (ut = n),
                (ke = null)))
            : (t = null),
          t === null)
        )
          throw li(n);
        return ((n.lanes = 536870912), null);
      }
      return ko(n, o);
    }
    var d = t.memoizedState;
    if (d !== null) {
      var v = d.dehydrated;
      if ((wc(n), c))
        if (n.flags & 256) ((n.flags &= -257), (n = $g(t, n, r)));
        else if (n.memoizedState !== null)
          ((n.child = t.child), (n.flags |= 128), (n = null));
        else throw Error(s(558));
      else if (
        (We || Oa(t, n, r, !1), (c = (r & t.childLanes) !== 0), We || c)
      ) {
        if (
          ((o = Ve),
          o !== null && ((v = Bm(o, r)), v !== 0 && v !== d.retryLane))
        )
          throw ((d.retryLane = v), Fi(t, v), At(o, t, v), Fc);
        ($o(), (n = $g(t, n, r)));
      } else
        ((t = d.treeContext),
          (ke = Wt(v.nextSibling)),
          (ut = n),
          (Ce = !0),
          (oi = null),
          (Qt = !1),
          t !== null && zp(n, t),
          (n = ko(n, o)),
          (n.flags |= 4096));
      return n;
    }
    return (
      (t = zn(t.child, { mode: o.mode, children: o.children })),
      (t.ref = n.ref),
      (n.child = t),
      (t.return = n),
      t
    );
  }
  function Bo(t, n) {
    var r = n.ref;
    if (r === null) t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object") throw Error(s(284));
      (t === null || t.ref !== r) && (n.flags |= 4194816);
    }
  }
  function Gc(t, n, r, o, c) {
    return (
      Xi(n),
      (r = Tc(t, n, r, o, void 0, c)),
      (o = Ac()),
      t !== null && !We
        ? (Cc(t, n, c), Hn(t, n, c))
        : (Ce && o && rc(n), (n.flags |= 1), ft(t, n, r, c), n.child)
    );
  }
  function Qg(t, n, r, o, c, d) {
    return (
      Xi(n),
      (n.updateQueue = null),
      (r = Jp(n, o, r, c)),
      Wp(t),
      (o = Ac()),
      t !== null && !We
        ? (Cc(t, n, d), Hn(t, n, d))
        : (Ce && o && rc(n), (n.flags |= 1), ft(t, n, r, d), n.child)
    );
  }
  function Zg(t, n, r, o, c) {
    if ((Xi(n), n.stateNode === null)) {
      var d = Ca,
        v = r.contextType;
      (typeof v == "object" && v !== null && (d = ct(v)),
        (d = new r(o, d)),
        (n.memoizedState =
          d.state !== null && d.state !== void 0 ? d.state : null),
        (d.updater = Hc),
        (n.stateNode = d),
        (d._reactInternals = n),
        (d = n.stateNode),
        (d.props = o),
        (d.state = n.memoizedState),
        (d.refs = {}),
        gc(n),
        (v = r.contextType),
        (d.context = typeof v == "object" && v !== null ? ct(v) : Ca),
        (d.state = n.memoizedState),
        (v = r.getDerivedStateFromProps),
        typeof v == "function" && (Uc(n, r, v, o), (d.state = n.memoizedState)),
        typeof r.getDerivedStateFromProps == "function" ||
          typeof d.getSnapshotBeforeUpdate == "function" ||
          (typeof d.UNSAFE_componentWillMount != "function" &&
            typeof d.componentWillMount != "function") ||
          ((v = d.state),
          typeof d.componentWillMount == "function" && d.componentWillMount(),
          typeof d.UNSAFE_componentWillMount == "function" &&
            d.UNSAFE_componentWillMount(),
          v !== d.state && Hc.enqueueReplaceState(d, d.state, null),
          Ir(n, o, d, c),
          Yr(),
          (d.state = n.memoizedState)),
        typeof d.componentDidMount == "function" && (n.flags |= 4194308),
        (o = !0));
    } else if (t === null) {
      d = n.stateNode;
      var w = n.memoizedProps,
        D = Ji(r, w);
      d.props = D;
      var k = d.context,
        Y = r.contextType;
      ((v = Ca), typeof Y == "object" && Y !== null && (v = ct(Y)));
      var K = r.getDerivedStateFromProps;
      ((Y =
        typeof K == "function" ||
        typeof d.getSnapshotBeforeUpdate == "function"),
        (w = n.pendingProps !== w),
        Y ||
          (typeof d.UNSAFE_componentWillReceiveProps != "function" &&
            typeof d.componentWillReceiveProps != "function") ||
          ((w || k !== v) && Vg(n, d, o, v)),
        (ci = !1));
      var B = n.memoizedState;
      ((d.state = B),
        Ir(n, o, d, c),
        Yr(),
        (k = n.memoizedState),
        w || B !== k || ci
          ? (typeof K == "function" && (Uc(n, r, K, o), (k = n.memoizedState)),
            (D = ci || Pg(n, r, D, o, B, k, v))
              ? (Y ||
                  (typeof d.UNSAFE_componentWillMount != "function" &&
                    typeof d.componentWillMount != "function") ||
                  (typeof d.componentWillMount == "function" &&
                    d.componentWillMount(),
                  typeof d.UNSAFE_componentWillMount == "function" &&
                    d.UNSAFE_componentWillMount()),
                typeof d.componentDidMount == "function" &&
                  (n.flags |= 4194308))
              : (typeof d.componentDidMount == "function" &&
                  (n.flags |= 4194308),
                (n.memoizedProps = o),
                (n.memoizedState = k)),
            (d.props = o),
            (d.state = k),
            (d.context = v),
            (o = D))
          : (typeof d.componentDidMount == "function" && (n.flags |= 4194308),
            (o = !1)));
    } else {
      ((d = n.stateNode),
        yc(t, n),
        (v = n.memoizedProps),
        (Y = Ji(r, v)),
        (d.props = Y),
        (K = n.pendingProps),
        (B = d.context),
        (k = r.contextType),
        (D = Ca),
        typeof k == "object" && k !== null && (D = ct(k)),
        (w = r.getDerivedStateFromProps),
        (k =
          typeof w == "function" ||
          typeof d.getSnapshotBeforeUpdate == "function") ||
          (typeof d.UNSAFE_componentWillReceiveProps != "function" &&
            typeof d.componentWillReceiveProps != "function") ||
          ((v !== K || B !== D) && Vg(n, d, o, D)),
        (ci = !1),
        (B = n.memoizedState),
        (d.state = B),
        Ir(n, o, d, c),
        Yr());
      var q = n.memoizedState;
      v !== K ||
      B !== q ||
      ci ||
      (t !== null && t.dependencies !== null && xo(t.dependencies))
        ? (typeof w == "function" && (Uc(n, r, w, o), (q = n.memoizedState)),
          (Y =
            ci ||
            Pg(n, r, Y, o, B, q, D) ||
            (t !== null && t.dependencies !== null && xo(t.dependencies)))
            ? (k ||
                (typeof d.UNSAFE_componentWillUpdate != "function" &&
                  typeof d.componentWillUpdate != "function") ||
                (typeof d.componentWillUpdate == "function" &&
                  d.componentWillUpdate(o, q, D),
                typeof d.UNSAFE_componentWillUpdate == "function" &&
                  d.UNSAFE_componentWillUpdate(o, q, D)),
              typeof d.componentDidUpdate == "function" && (n.flags |= 4),
              typeof d.getSnapshotBeforeUpdate == "function" &&
                (n.flags |= 1024))
            : (typeof d.componentDidUpdate != "function" ||
                (v === t.memoizedProps && B === t.memoizedState) ||
                (n.flags |= 4),
              typeof d.getSnapshotBeforeUpdate != "function" ||
                (v === t.memoizedProps && B === t.memoizedState) ||
                (n.flags |= 1024),
              (n.memoizedProps = o),
              (n.memoizedState = q)),
          (d.props = o),
          (d.state = q),
          (d.context = D),
          (o = Y))
        : (typeof d.componentDidUpdate != "function" ||
            (v === t.memoizedProps && B === t.memoizedState) ||
            (n.flags |= 4),
          typeof d.getSnapshotBeforeUpdate != "function" ||
            (v === t.memoizedProps && B === t.memoizedState) ||
            (n.flags |= 1024),
          (o = !1));
    }
    return (
      (d = o),
      Bo(t, n),
      (o = (n.flags & 128) !== 0),
      d || o
        ? ((d = n.stateNode),
          (r =
            o && typeof r.getDerivedStateFromError != "function"
              ? null
              : d.render()),
          (n.flags |= 1),
          t !== null && o
            ? ((n.child = Zi(n, t.child, null, c)),
              (n.child = Zi(n, null, r, c)))
            : ft(t, n, r, c),
          (n.memoizedState = d.state),
          (t = n.child))
        : (t = Hn(t, n, c)),
      t
    );
  }
  function Wg(t, n, r, o) {
    return (Yi(), (n.flags |= 256), ft(t, n, r, o), n.child);
  }
  var Yc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Ic(t) {
    return { baseLanes: t, cachePool: Hp() };
  }
  function Xc(t, n, r) {
    return ((t = t !== null ? t.childLanes & ~r : 0), n && (t |= kt), t);
  }
  function Jg(t, n, r) {
    var o = n.pendingProps,
      c = !1,
      d = (n.flags & 128) !== 0,
      v;
    if (
      ((v = d) ||
        (v =
          t !== null && t.memoizedState === null ? !1 : (Xe.current & 2) !== 0),
      v && ((c = !0), (n.flags &= -129)),
      (v = (n.flags & 32) !== 0),
      (n.flags &= -33),
      t === null)
    ) {
      if (Ce) {
        if (
          (c ? hi(n) : mi(),
          (t = ke)
            ? ((t = ov(t, Qt)),
              (t = t !== null && t.data !== "&" ? t : null),
              t !== null &&
                ((n.memoizedState = {
                  dehydrated: t,
                  treeContext: si !== null ? { id: yn, overflow: vn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (r = jp(t)),
                (r.return = n),
                (n.child = r),
                (ut = n),
                (ke = null)))
            : (t = null),
          t === null)
        )
          throw li(n);
        return (Of(t) ? (n.lanes = 32) : (n.lanes = 536870912), null);
      }
      var w = o.children;
      return (
        (o = o.fallback),
        c
          ? (mi(),
            (c = n.mode),
            (w = Uo({ mode: "hidden", children: w }, c)),
            (o = Gi(o, c, r, null)),
            (w.return = n),
            (o.return = n),
            (w.sibling = o),
            (n.child = w),
            (o = n.child),
            (o.memoizedState = Ic(r)),
            (o.childLanes = Xc(t, v, r)),
            (n.memoizedState = Yc),
            Zr(null, o))
          : (hi(n), Kc(n, w))
      );
    }
    var D = t.memoizedState;
    if (D !== null && ((w = D.dehydrated), w !== null)) {
      if (d)
        n.flags & 256
          ? (hi(n), (n.flags &= -257), (n = $c(t, n, r)))
          : n.memoizedState !== null
            ? (mi(), (n.child = t.child), (n.flags |= 128), (n = null))
            : (mi(),
              (w = o.fallback),
              (c = n.mode),
              (o = Uo({ mode: "visible", children: o.children }, c)),
              (w = Gi(w, c, r, null)),
              (w.flags |= 2),
              (o.return = n),
              (w.return = n),
              (o.sibling = w),
              (n.child = o),
              Zi(n, t.child, null, r),
              (o = n.child),
              (o.memoizedState = Ic(r)),
              (o.childLanes = Xc(t, v, r)),
              (n.memoizedState = Yc),
              (n = Zr(null, o)));
      else if ((hi(n), Of(w))) {
        if (((v = w.nextSibling && w.nextSibling.dataset), v)) var k = v.dgst;
        ((v = k),
          (o = Error(s(419))),
          (o.stack = ""),
          (o.digest = v),
          Br({ value: o, source: null, stack: null }),
          (n = $c(t, n, r)));
      } else if (
        (We || Oa(t, n, r, !1), (v = (r & t.childLanes) !== 0), We || v)
      ) {
        if (
          ((v = Ve),
          v !== null && ((o = Bm(v, r)), o !== 0 && o !== D.retryLane))
        )
          throw ((D.retryLane = o), Fi(t, o), At(v, t, o), Fc);
        (Mf(w) || $o(), (n = $c(t, n, r)));
      } else
        Mf(w)
          ? ((n.flags |= 192), (n.child = t.child), (n = null))
          : ((t = D.treeContext),
            (ke = Wt(w.nextSibling)),
            (ut = n),
            (Ce = !0),
            (oi = null),
            (Qt = !1),
            t !== null && zp(n, t),
            (n = Kc(n, o.children)),
            (n.flags |= 4096));
      return n;
    }
    return c
      ? (mi(),
        (w = o.fallback),
        (c = n.mode),
        (D = t.child),
        (k = D.sibling),
        (o = zn(D, { mode: "hidden", children: o.children })),
        (o.subtreeFlags = D.subtreeFlags & 65011712),
        k !== null ? (w = zn(k, w)) : ((w = Gi(w, c, r, null)), (w.flags |= 2)),
        (w.return = n),
        (o.return = n),
        (o.sibling = w),
        (n.child = o),
        Zr(null, o),
        (o = n.child),
        (w = t.child.memoizedState),
        w === null
          ? (w = Ic(r))
          : ((c = w.cachePool),
            c !== null
              ? ((D = Qe._currentValue),
                (c = c.parent !== D ? { parent: D, pool: D } : c))
              : (c = Hp()),
            (w = { baseLanes: w.baseLanes | r, cachePool: c })),
        (o.memoizedState = w),
        (o.childLanes = Xc(t, v, r)),
        (n.memoizedState = Yc),
        Zr(t.child, o))
      : (hi(n),
        (r = t.child),
        (t = r.sibling),
        (r = zn(r, { mode: "visible", children: o.children })),
        (r.return = n),
        (r.sibling = null),
        t !== null &&
          ((v = n.deletions),
          v === null ? ((n.deletions = [t]), (n.flags |= 16)) : v.push(t)),
        (n.child = r),
        (n.memoizedState = null),
        r);
  }
  function Kc(t, n) {
    return (
      (n = Uo({ mode: "visible", children: n }, t.mode)),
      (n.return = t),
      (t.child = n)
    );
  }
  function Uo(t, n) {
    return ((t = Lt(22, t, null, n)), (t.lanes = 0), t);
  }
  function $c(t, n, r) {
    return (
      Zi(n, t.child, null, r),
      (t = Kc(n, n.pendingProps.children)),
      (t.flags |= 2),
      (n.memoizedState = null),
      t
    );
  }
  function ey(t, n, r) {
    t.lanes |= n;
    var o = t.alternate;
    (o !== null && (o.lanes |= n), cc(t.return, n, r));
  }
  function Qc(t, n, r, o, c, d) {
    var v = t.memoizedState;
    v === null
      ? (t.memoizedState = {
          isBackwards: n,
          rendering: null,
          renderingStartTime: 0,
          last: o,
          tail: r,
          tailMode: c,
          treeForkCount: d,
        })
      : ((v.isBackwards = n),
        (v.rendering = null),
        (v.renderingStartTime = 0),
        (v.last = o),
        (v.tail = r),
        (v.tailMode = c),
        (v.treeForkCount = d));
  }
  function ty(t, n, r) {
    var o = n.pendingProps,
      c = o.revealOrder,
      d = o.tail;
    o = o.children;
    var v = Xe.current,
      w = (v & 2) !== 0;
    if (
      (w ? ((v = (v & 1) | 2), (n.flags |= 128)) : (v &= 1),
      Z(Xe, v),
      ft(t, n, o, r),
      (o = Ce ? kr : 0),
      !w && t !== null && (t.flags & 128) !== 0)
    )
      e: for (t = n.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && ey(t, r, n);
        else if (t.tag === 19) ey(t, r, n);
        else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === n) break e;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === n) break e;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    switch (c) {
      case "forwards":
        for (r = n.child, c = null; r !== null; )
          ((t = r.alternate),
            t !== null && Do(t) === null && (c = r),
            (r = r.sibling));
        ((r = c),
          r === null
            ? ((c = n.child), (n.child = null))
            : ((c = r.sibling), (r.sibling = null)),
          Qc(n, !1, c, r, d, o));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (r = null, c = n.child, n.child = null; c !== null; ) {
          if (((t = c.alternate), t !== null && Do(t) === null)) {
            n.child = c;
            break;
          }
          ((t = c.sibling), (c.sibling = r), (r = c), (c = t));
        }
        Qc(n, !0, r, null, d, o);
        break;
      case "together":
        Qc(n, !1, null, null, void 0, o);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Hn(t, n, r) {
    if (
      (t !== null && (n.dependencies = t.dependencies),
      (yi |= n.lanes),
      (r & n.childLanes) === 0)
    )
      if (t !== null) {
        if ((Oa(t, n, r, !1), (r & n.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && n.child !== t.child) throw Error(s(153));
    if (n.child !== null) {
      for (
        t = n.child, r = zn(t, t.pendingProps), n.child = r, r.return = n;
        t.sibling !== null;
      )
        ((t = t.sibling),
          (r = r.sibling = zn(t, t.pendingProps)),
          (r.return = n));
      r.sibling = null;
    }
    return n.child;
  }
  function Zc(t, n) {
    return (t.lanes & n) !== 0
      ? !0
      : ((t = t.dependencies), !!(t !== null && xo(t)));
  }
  function oA(t, n, r) {
    switch (n.tag) {
      case 3:
        (Ie(n, n.stateNode.containerInfo),
          ui(n, Qe, t.memoizedState.cache),
          Yi());
        break;
      case 27:
      case 5:
        Ft(n);
        break;
      case 4:
        Ie(n, n.stateNode.containerInfo);
        break;
      case 10:
        ui(n, n.type, n.memoizedProps.value);
        break;
      case 31:
        if (n.memoizedState !== null) return ((n.flags |= 128), wc(n), null);
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null
            ? (hi(n), (n.flags |= 128), null)
            : (r & n.child.childLanes) !== 0
              ? Jg(t, n, r)
              : (hi(n), (t = Hn(t, n, r)), t !== null ? t.sibling : null);
        hi(n);
        break;
      case 19:
        var c = (t.flags & 128) !== 0;
        if (
          ((o = (r & n.childLanes) !== 0),
          o || (Oa(t, n, r, !1), (o = (r & n.childLanes) !== 0)),
          c)
        ) {
          if (o) return ty(t, n, r);
          n.flags |= 128;
        }
        if (
          ((c = n.memoizedState),
          c !== null &&
            ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
          Z(Xe, Xe.current),
          o)
        )
          break;
        return null;
      case 22:
        return ((n.lanes = 0), Xg(t, n, r, n.pendingProps));
      case 24:
        ui(n, Qe, t.memoizedState.cache);
    }
    return Hn(t, n, r);
  }
  function ny(t, n, r) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps) We = !0;
      else {
        if (!Zc(t, r) && (n.flags & 128) === 0) return ((We = !1), oA(t, n, r));
        We = (t.flags & 131072) !== 0;
      }
    else ((We = !1), Ce && (n.flags & 1048576) !== 0 && Lp(n, kr, n.index));
    switch (((n.lanes = 0), n.tag)) {
      case 16:
        e: {
          var o = n.pendingProps;
          if (((t = $i(n.elementType)), (n.type = t), typeof t == "function"))
            nc(t)
              ? ((o = Ji(t, o)), (n.tag = 1), (n = Zg(null, n, t, o, r)))
              : ((n.tag = 0), (n = Gc(null, n, t, o, r)));
          else {
            if (t != null) {
              var c = t.$$typeof;
              if (c === V) {
                ((n.tag = 11), (n = Gg(null, n, t, o, r)));
                break e;
              } else if (c === H) {
                ((n.tag = 14), (n = Yg(null, n, t, o, r)));
                break e;
              }
            }
            throw ((n = ee(t) || t), Error(s(306, n, "")));
          }
        }
        return n;
      case 0:
        return Gc(t, n, n.type, n.pendingProps, r);
      case 1:
        return ((o = n.type), (c = Ji(o, n.pendingProps)), Zg(t, n, o, c, r));
      case 3:
        e: {
          if ((Ie(n, n.stateNode.containerInfo), t === null))
            throw Error(s(387));
          o = n.pendingProps;
          var d = n.memoizedState;
          ((c = d.element), yc(t, n), Ir(n, o, null, r));
          var v = n.memoizedState;
          if (
            ((o = v.cache),
            ui(n, Qe, o),
            o !== d.cache && fc(n, [Qe], r, !0),
            Yr(),
            (o = v.element),
            d.isDehydrated)
          )
            if (
              ((d = { element: o, isDehydrated: !1, cache: v.cache }),
              (n.updateQueue.baseState = d),
              (n.memoizedState = d),
              n.flags & 256)
            ) {
              n = Wg(t, n, o, r);
              break e;
            } else if (o !== c) {
              ((c = Xt(Error(s(424)), n)), Br(c), (n = Wg(t, n, o, r)));
              break e;
            } else {
              switch (((t = n.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (
                ke = Wt(t.firstChild),
                  ut = n,
                  Ce = !0,
                  oi = null,
                  Qt = !0,
                  r = Xp(n, null, o, r),
                  n.child = r;
                r;
              )
                ((r.flags = (r.flags & -3) | 4096), (r = r.sibling));
            }
          else {
            if ((Yi(), o === c)) {
              n = Hn(t, n, r);
              break e;
            }
            ft(t, n, o, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return (
          Bo(t, n),
          t === null
            ? (r = hv(n.type, null, n.pendingProps, null))
              ? (n.memoizedState = r)
              : Ce ||
                ((r = n.type),
                (t = n.pendingProps),
                (o = nl(ye.current).createElement(r)),
                (o[lt] = n),
                (o[bt] = t),
                dt(o, r, t),
                at(o),
                (n.stateNode = o))
            : (n.memoizedState = hv(
                n.type,
                t.memoizedProps,
                n.pendingProps,
                t.memoizedState,
              )),
          null
        );
      case 27:
        return (
          Ft(n),
          t === null &&
            Ce &&
            ((o = n.stateNode = cv(n.type, n.pendingProps, ye.current)),
            (ut = n),
            (Qt = !0),
            (c = ke),
            wi(n.type) ? ((Nf = c), (ke = Wt(o.firstChild))) : (ke = c)),
          ft(t, n, n.pendingProps.children, r),
          Bo(t, n),
          t === null && (n.flags |= 4194304),
          n.child
        );
      case 5:
        return (
          t === null &&
            Ce &&
            ((c = o = ke) &&
              ((o = VA(o, n.type, n.pendingProps, Qt)),
              o !== null
                ? ((n.stateNode = o),
                  (ut = n),
                  (ke = Wt(o.firstChild)),
                  (Qt = !1),
                  (c = !0))
                : (c = !1)),
            c || li(n)),
          Ft(n),
          (c = n.type),
          (d = n.pendingProps),
          (v = t !== null ? t.memoizedProps : null),
          (o = d.children),
          Cf(c, d) ? (o = null) : v !== null && Cf(c, v) && (n.flags |= 32),
          n.memoizedState !== null &&
            ((c = Tc(t, n, WT, null, null, r)), (ds._currentValue = c)),
          Bo(t, n),
          ft(t, n, o, r),
          n.child
        );
      case 6:
        return (
          t === null &&
            Ce &&
            ((t = r = ke) &&
              ((r = kA(r, n.pendingProps, Qt)),
              r !== null
                ? ((n.stateNode = r), (ut = n), (ke = null), (t = !0))
                : (t = !1)),
            t || li(n)),
          null
        );
      case 13:
        return Jg(t, n, r);
      case 4:
        return (
          Ie(n, n.stateNode.containerInfo),
          (o = n.pendingProps),
          t === null ? (n.child = Zi(n, null, o, r)) : ft(t, n, o, r),
          n.child
        );
      case 11:
        return Gg(t, n, n.type, n.pendingProps, r);
      case 7:
        return (ft(t, n, n.pendingProps, r), n.child);
      case 8:
        return (ft(t, n, n.pendingProps.children, r), n.child);
      case 12:
        return (ft(t, n, n.pendingProps.children, r), n.child);
      case 10:
        return (
          (o = n.pendingProps),
          ui(n, n.type, o.value),
          ft(t, n, o.children, r),
          n.child
        );
      case 9:
        return (
          (c = n.type._context),
          (o = n.pendingProps.children),
          Xi(n),
          (c = ct(c)),
          (o = o(c)),
          (n.flags |= 1),
          ft(t, n, o, r),
          n.child
        );
      case 14:
        return Yg(t, n, n.type, n.pendingProps, r);
      case 15:
        return Ig(t, n, n.type, n.pendingProps, r);
      case 19:
        return ty(t, n, r);
      case 31:
        return sA(t, n, r);
      case 22:
        return Xg(t, n, r, n.pendingProps);
      case 24:
        return (
          Xi(n),
          (o = ct(Qe)),
          t === null
            ? ((c = mc()),
              c === null &&
                ((c = Ve),
                (d = dc()),
                (c.pooledCache = d),
                d.refCount++,
                d !== null && (c.pooledCacheLanes |= r),
                (c = d)),
              (n.memoizedState = { parent: o, cache: c }),
              gc(n),
              ui(n, Qe, c))
            : ((t.lanes & r) !== 0 && (yc(t, n), Ir(n, null, null, r), Yr()),
              (c = t.memoizedState),
              (d = n.memoizedState),
              c.parent !== o
                ? ((c = { parent: o, cache: o }),
                  (n.memoizedState = c),
                  n.lanes === 0 &&
                    (n.memoizedState = n.updateQueue.baseState = c),
                  ui(n, Qe, o))
                : ((o = d.cache),
                  ui(n, Qe, o),
                  o !== c.cache && fc(n, [Qe], r, !0))),
          ft(t, n, n.pendingProps.children, r),
          n.child
        );
      case 29:
        throw n.pendingProps;
    }
    throw Error(s(156, n.tag));
  }
  function qn(t) {
    t.flags |= 4;
  }
  function Wc(t, n, r, o, c) {
    if (((n = (t.mode & 32) !== 0) && (n = !1), n)) {
      if (((t.flags |= 16777216), (c & 335544128) === c))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (My()) t.flags |= 8192;
        else throw ((Qi = To), pc);
    } else t.flags &= -16777217;
  }
  function iy(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (((t.flags |= 16777216), !vv(n)))
      if (My()) t.flags |= 8192;
      else throw ((Qi = To), pc);
  }
  function Ho(t, n) {
    (n !== null && (t.flags |= 4),
      t.flags & 16384 &&
        ((n = t.tag !== 22 ? Pm() : 536870912), (t.lanes |= n), (qa |= n)));
  }
  function Wr(t, n) {
    if (!Ce)
      switch (t.tailMode) {
        case "hidden":
          n = t.tail;
          for (var r = null; n !== null; )
            (n.alternate !== null && (r = n), (n = n.sibling));
          r === null ? (t.tail = null) : (r.sibling = null);
          break;
        case "collapsed":
          r = t.tail;
          for (var o = null; r !== null; )
            (r.alternate !== null && (o = r), (r = r.sibling));
          o === null
            ? n || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (o.sibling = null);
      }
  }
  function Be(t) {
    var n = t.alternate !== null && t.alternate.child === t.child,
      r = 0,
      o = 0;
    if (n)
      for (var c = t.child; c !== null; )
        ((r |= c.lanes | c.childLanes),
          (o |= c.subtreeFlags & 65011712),
          (o |= c.flags & 65011712),
          (c.return = t),
          (c = c.sibling));
    else
      for (c = t.child; c !== null; )
        ((r |= c.lanes | c.childLanes),
          (o |= c.subtreeFlags),
          (o |= c.flags),
          (c.return = t),
          (c = c.sibling));
    return ((t.subtreeFlags |= o), (t.childLanes = r), n);
  }
  function lA(t, n, r) {
    var o = n.pendingProps;
    switch ((sc(n), n.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Be(n), null);
      case 1:
        return (Be(n), null);
      case 3:
        return (
          (r = n.stateNode),
          (o = null),
          t !== null && (o = t.memoizedState.cache),
          n.memoizedState.cache !== o && (n.flags |= 2048),
          kn(Qe),
          je(),
          r.pendingContext &&
            ((r.context = r.pendingContext), (r.pendingContext = null)),
          (t === null || t.child === null) &&
            (Ma(n)
              ? qn(n)
              : t === null ||
                (t.memoizedState.isDehydrated && (n.flags & 256) === 0) ||
                ((n.flags |= 1024), lc())),
          Be(n),
          null
        );
      case 26:
        var c = n.type,
          d = n.memoizedState;
        return (
          t === null
            ? (qn(n),
              d !== null ? (Be(n), iy(n, d)) : (Be(n), Wc(n, c, null, o, r)))
            : d
              ? d !== t.memoizedState
                ? (qn(n), Be(n), iy(n, d))
                : (Be(n), (n.flags &= -16777217))
              : ((t = t.memoizedProps),
                t !== o && qn(n),
                Be(n),
                Wc(n, c, t, o, r)),
          null
        );
      case 27:
        if (
          (pn(n),
          (r = ye.current),
          (c = n.type),
          t !== null && n.stateNode != null)
        )
          t.memoizedProps !== o && qn(n);
        else {
          if (!o) {
            if (n.stateNode === null) throw Error(s(166));
            return (Be(n), null);
          }
          ((t = W.current),
            Ma(n) ? Pp(n) : ((t = cv(c, o, r)), (n.stateNode = t), qn(n)));
        }
        return (Be(n), null);
      case 5:
        if ((pn(n), (c = n.type), t !== null && n.stateNode != null))
          t.memoizedProps !== o && qn(n);
        else {
          if (!o) {
            if (n.stateNode === null) throw Error(s(166));
            return (Be(n), null);
          }
          if (((d = W.current), Ma(n))) Pp(n);
          else {
            var v = nl(ye.current);
            switch (d) {
              case 1:
                d = v.createElementNS("http://www.w3.org/2000/svg", c);
                break;
              case 2:
                d = v.createElementNS("http://www.w3.org/1998/Math/MathML", c);
                break;
              default:
                switch (c) {
                  case "svg":
                    d = v.createElementNS("http://www.w3.org/2000/svg", c);
                    break;
                  case "math":
                    d = v.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      c,
                    );
                    break;
                  case "script":
                    ((d = v.createElement("div")),
                      (d.innerHTML = "<script><\/script>"),
                      (d = d.removeChild(d.firstChild)));
                    break;
                  case "select":
                    ((d =
                      typeof o.is == "string"
                        ? v.createElement("select", { is: o.is })
                        : v.createElement("select")),
                      o.multiple
                        ? (d.multiple = !0)
                        : o.size && (d.size = o.size));
                    break;
                  default:
                    d =
                      typeof o.is == "string"
                        ? v.createElement(c, { is: o.is })
                        : v.createElement(c);
                }
            }
            ((d[lt] = n), (d[bt] = o));
            e: for (v = n.child; v !== null; ) {
              if (v.tag === 5 || v.tag === 6) d.appendChild(v.stateNode);
              else if (v.tag !== 4 && v.tag !== 27 && v.child !== null) {
                ((v.child.return = v), (v = v.child));
                continue;
              }
              if (v === n) break e;
              for (; v.sibling === null; ) {
                if (v.return === null || v.return === n) break e;
                v = v.return;
              }
              ((v.sibling.return = v.return), (v = v.sibling));
            }
            n.stateNode = d;
            e: switch ((dt(d, c, o), c)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                o = !!o.autoFocus;
                break e;
              case "img":
                o = !0;
                break e;
              default:
                o = !1;
            }
            o && qn(n);
          }
        }
        return (
          Be(n),
          Wc(n, n.type, t === null ? null : t.memoizedProps, n.pendingProps, r),
          null
        );
      case 6:
        if (t && n.stateNode != null) t.memoizedProps !== o && qn(n);
        else {
          if (typeof o != "string" && n.stateNode === null) throw Error(s(166));
          if (((t = ye.current), Ma(n))) {
            if (
              ((t = n.stateNode),
              (r = n.memoizedProps),
              (o = null),
              (c = ut),
              c !== null)
            )
              switch (c.tag) {
                case 27:
                case 5:
                  o = c.memoizedProps;
              }
            ((t[lt] = n),
              (t = !!(
                t.nodeValue === r ||
                (o !== null && o.suppressHydrationWarning === !0) ||
                Jy(t.nodeValue, r)
              )),
              t || li(n, !0));
          } else
            ((t = nl(t).createTextNode(o)), (t[lt] = n), (n.stateNode = t));
        }
        return (Be(n), null);
      case 31:
        if (((r = n.memoizedState), t === null || t.memoizedState !== null)) {
          if (((o = Ma(n)), r !== null)) {
            if (t === null) {
              if (!o) throw Error(s(318));
              if (
                ((t = n.memoizedState),
                (t = t !== null ? t.dehydrated : null),
                !t)
              )
                throw Error(s(557));
              t[lt] = n;
            } else
              (Yi(),
                (n.flags & 128) === 0 && (n.memoizedState = null),
                (n.flags |= 4));
            (Be(n), (t = !1));
          } else
            ((r = lc()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = r),
              (t = !0));
          if (!t) return n.flags & 256 ? (Pt(n), n) : (Pt(n), null);
          if ((n.flags & 128) !== 0) throw Error(s(558));
        }
        return (Be(n), null);
      case 13:
        if (
          ((o = n.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((c = Ma(n)), o !== null && o.dehydrated !== null)) {
            if (t === null) {
              if (!c) throw Error(s(318));
              if (
                ((c = n.memoizedState),
                (c = c !== null ? c.dehydrated : null),
                !c)
              )
                throw Error(s(317));
              c[lt] = n;
            } else
              (Yi(),
                (n.flags & 128) === 0 && (n.memoizedState = null),
                (n.flags |= 4));
            (Be(n), (c = !1));
          } else
            ((c = lc()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = c),
              (c = !0));
          if (!c) return n.flags & 256 ? (Pt(n), n) : (Pt(n), null);
        }
        return (
          Pt(n),
          (n.flags & 128) !== 0
            ? ((n.lanes = r), n)
            : ((r = o !== null),
              (t = t !== null && t.memoizedState !== null),
              r &&
                ((o = n.child),
                (c = null),
                o.alternate !== null &&
                  o.alternate.memoizedState !== null &&
                  o.alternate.memoizedState.cachePool !== null &&
                  (c = o.alternate.memoizedState.cachePool.pool),
                (d = null),
                o.memoizedState !== null &&
                  o.memoizedState.cachePool !== null &&
                  (d = o.memoizedState.cachePool.pool),
                d !== c && (o.flags |= 2048)),
              r !== t && r && (n.child.flags |= 8192),
              Ho(n, n.updateQueue),
              Be(n),
              null)
        );
      case 4:
        return (je(), t === null && Sf(n.stateNode.containerInfo), Be(n), null);
      case 10:
        return (kn(n.type), Be(n), null);
      case 19:
        if ((I(Xe), (o = n.memoizedState), o === null)) return (Be(n), null);
        if (((c = (n.flags & 128) !== 0), (d = o.rendering), d === null))
          if (c) Wr(o, !1);
          else {
            if (Ge !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = n.child; t !== null; ) {
                if (((d = Do(t)), d !== null)) {
                  for (
                    n.flags |= 128,
                      Wr(o, !1),
                      t = d.updateQueue,
                      n.updateQueue = t,
                      Ho(n, t),
                      n.subtreeFlags = 0,
                      t = r,
                      r = n.child;
                    r !== null;
                  )
                    (Np(r, t), (r = r.sibling));
                  return (
                    Z(Xe, (Xe.current & 1) | 2),
                    Ce && Pn(n, o.treeForkCount),
                    n.child
                  );
                }
                t = t.sibling;
              }
            o.tail !== null &&
              Ot() > Io &&
              ((n.flags |= 128), (c = !0), Wr(o, !1), (n.lanes = 4194304));
          }
        else {
          if (!c)
            if (((t = Do(d)), t !== null)) {
              if (
                ((n.flags |= 128),
                (c = !0),
                (t = t.updateQueue),
                (n.updateQueue = t),
                Ho(n, t),
                Wr(o, !0),
                o.tail === null &&
                  o.tailMode === "hidden" &&
                  !d.alternate &&
                  !Ce)
              )
                return (Be(n), null);
            } else
              2 * Ot() - o.renderingStartTime > Io &&
                r !== 536870912 &&
                ((n.flags |= 128), (c = !0), Wr(o, !1), (n.lanes = 4194304));
          o.isBackwards
            ? ((d.sibling = n.child), (n.child = d))
            : ((t = o.last),
              t !== null ? (t.sibling = d) : (n.child = d),
              (o.last = d));
        }
        return o.tail !== null
          ? ((t = o.tail),
            (o.rendering = t),
            (o.tail = t.sibling),
            (o.renderingStartTime = Ot()),
            (t.sibling = null),
            (r = Xe.current),
            Z(Xe, c ? (r & 1) | 2 : r & 1),
            Ce && Pn(n, o.treeForkCount),
            t)
          : (Be(n), null);
      case 22:
      case 23:
        return (
          Pt(n),
          Sc(),
          (o = n.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== o && (n.flags |= 8192)
            : o && (n.flags |= 8192),
          o
            ? (r & 536870912) !== 0 &&
              (n.flags & 128) === 0 &&
              (Be(n), n.subtreeFlags & 6 && (n.flags |= 8192))
            : Be(n),
          (r = n.updateQueue),
          r !== null && Ho(n, r.retryQueue),
          (r = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (r = t.memoizedState.cachePool.pool),
          (o = null),
          n.memoizedState !== null &&
            n.memoizedState.cachePool !== null &&
            (o = n.memoizedState.cachePool.pool),
          o !== r && (n.flags |= 2048),
          t !== null && I(Ki),
          null
        );
      case 24:
        return (
          (r = null),
          t !== null && (r = t.memoizedState.cache),
          n.memoizedState.cache !== r && (n.flags |= 2048),
          kn(Qe),
          Be(n),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, n.tag));
  }
  function uA(t, n) {
    switch ((sc(n), n.tag)) {
      case 1:
        return (
          (t = n.flags),
          t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 3:
        return (
          kn(Qe),
          je(),
          (t = n.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((n.flags = (t & -65537) | 128), n)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (pn(n), null);
      case 31:
        if (n.memoizedState !== null) {
          if ((Pt(n), n.alternate === null)) throw Error(s(340));
          Yi();
        }
        return (
          (t = n.flags),
          t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 13:
        if (
          (Pt(n), (t = n.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (n.alternate === null) throw Error(s(340));
          Yi();
        }
        return (
          (t = n.flags),
          t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 19:
        return (I(Xe), null);
      case 4:
        return (je(), null);
      case 10:
        return (kn(n.type), null);
      case 22:
      case 23:
        return (
          Pt(n),
          Sc(),
          t !== null && I(Ki),
          (t = n.flags),
          t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 24:
        return (kn(Qe), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ay(t, n) {
    switch ((sc(n), n.tag)) {
      case 3:
        (kn(Qe), je());
        break;
      case 26:
      case 27:
      case 5:
        pn(n);
        break;
      case 4:
        je();
        break;
      case 31:
        n.memoizedState !== null && Pt(n);
        break;
      case 13:
        Pt(n);
        break;
      case 19:
        I(Xe);
        break;
      case 10:
        kn(n.type);
        break;
      case 22:
      case 23:
        (Pt(n), Sc(), t !== null && I(Ki));
        break;
      case 24:
        kn(Qe);
    }
  }
  function Jr(t, n) {
    try {
      var r = n.updateQueue,
        o = r !== null ? r.lastEffect : null;
      if (o !== null) {
        var c = o.next;
        r = c;
        do {
          if ((r.tag & t) === t) {
            o = void 0;
            var d = r.create,
              v = r.inst;
            ((o = d()), (v.destroy = o));
          }
          r = r.next;
        } while (r !== c);
      }
    } catch (w) {
      Ne(n, n.return, w);
    }
  }
  function pi(t, n, r) {
    try {
      var o = n.updateQueue,
        c = o !== null ? o.lastEffect : null;
      if (c !== null) {
        var d = c.next;
        o = d;
        do {
          if ((o.tag & t) === t) {
            var v = o.inst,
              w = v.destroy;
            if (w !== void 0) {
              ((v.destroy = void 0), (c = n));
              var D = r,
                k = w;
              try {
                k();
              } catch (Y) {
                Ne(c, D, Y);
              }
            }
          }
          o = o.next;
        } while (o !== d);
      }
    } catch (Y) {
      Ne(n, n.return, Y);
    }
  }
  function ry(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var r = t.stateNode;
      try {
        $p(n, r);
      } catch (o) {
        Ne(t, t.return, o);
      }
    }
  }
  function sy(t, n, r) {
    ((r.props = Ji(t.type, t.memoizedProps)), (r.state = t.memoizedState));
    try {
      r.componentWillUnmount();
    } catch (o) {
      Ne(t, n, o);
    }
  }
  function es(t, n) {
    try {
      var r = t.ref;
      if (r !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var o = t.stateNode;
            break;
          case 30:
            o = t.stateNode;
            break;
          default:
            o = t.stateNode;
        }
        typeof r == "function" ? (t.refCleanup = r(o)) : (r.current = o);
      }
    } catch (c) {
      Ne(t, n, c);
    }
  }
  function bn(t, n) {
    var r = t.ref,
      o = t.refCleanup;
    if (r !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (c) {
          Ne(t, n, c);
        } finally {
          ((t.refCleanup = null),
            (t = t.alternate),
            t != null && (t.refCleanup = null));
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (c) {
          Ne(t, n, c);
        }
      else r.current = null;
  }
  function oy(t) {
    var n = t.type,
      r = t.memoizedProps,
      o = t.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          r.autoFocus && o.focus();
          break e;
        case "img":
          r.src ? (o.src = r.src) : r.srcSet && (o.srcset = r.srcSet);
      }
    } catch (c) {
      Ne(t, t.return, c);
    }
  }
  function Jc(t, n, r) {
    try {
      var o = t.stateNode;
      (NA(o, t.type, r, n), (o[bt] = n));
    } catch (c) {
      Ne(t, t.return, c);
    }
  }
  function ly(t) {
    return (
      t.tag === 5 ||
      t.tag === 3 ||
      t.tag === 26 ||
      (t.tag === 27 && wi(t.type)) ||
      t.tag === 4
    );
  }
  function ef(t) {
    e: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || ly(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if (
          (t.tag === 27 && wi(t.type)) ||
          t.flags & 2 ||
          t.child === null ||
          t.tag === 4
        )
          continue e;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function tf(t, n, r) {
    var o = t.tag;
    if (o === 5 || o === 6)
      ((t = t.stateNode),
        n
          ? (r.nodeType === 9
              ? r.body
              : r.nodeName === "HTML"
                ? r.ownerDocument.body
                : r
            ).insertBefore(t, n)
          : ((n =
              r.nodeType === 9
                ? r.body
                : r.nodeName === "HTML"
                  ? r.ownerDocument.body
                  : r),
            n.appendChild(t),
            (r = r._reactRootContainer),
            r != null || n.onclick !== null || (n.onclick = _n)));
    else if (
      o !== 4 &&
      (o === 27 && wi(t.type) && ((r = t.stateNode), (n = null)),
      (t = t.child),
      t !== null)
    )
      for (tf(t, n, r), t = t.sibling; t !== null; )
        (tf(t, n, r), (t = t.sibling));
  }
  function qo(t, n, r) {
    var o = t.tag;
    if (o === 5 || o === 6)
      ((t = t.stateNode), n ? r.insertBefore(t, n) : r.appendChild(t));
    else if (
      o !== 4 &&
      (o === 27 && wi(t.type) && (r = t.stateNode), (t = t.child), t !== null)
    )
      for (qo(t, n, r), t = t.sibling; t !== null; )
        (qo(t, n, r), (t = t.sibling));
  }
  function uy(t) {
    var n = t.stateNode,
      r = t.memoizedProps;
    try {
      for (var o = t.type, c = n.attributes; c.length; )
        n.removeAttributeNode(c[0]);
      (dt(n, o, r), (n[lt] = t), (n[bt] = r));
    } catch (d) {
      Ne(t, t.return, d);
    }
  }
  var Fn = !1,
    Je = !1,
    nf = !1,
    cy = typeof WeakSet == "function" ? WeakSet : Set,
    rt = null;
  function cA(t, n) {
    if (((t = t.containerInfo), (Tf = ul), (t = wp(t)), $u(t))) {
      if ("selectionStart" in t)
        var r = { start: t.selectionStart, end: t.selectionEnd };
      else
        e: {
          r = ((r = t.ownerDocument) && r.defaultView) || window;
          var o = r.getSelection && r.getSelection();
          if (o && o.rangeCount !== 0) {
            r = o.anchorNode;
            var c = o.anchorOffset,
              d = o.focusNode;
            o = o.focusOffset;
            try {
              (r.nodeType, d.nodeType);
            } catch {
              r = null;
              break e;
            }
            var v = 0,
              w = -1,
              D = -1,
              k = 0,
              Y = 0,
              K = t,
              B = null;
            t: for (;;) {
              for (
                var q;
                K !== r || (c !== 0 && K.nodeType !== 3) || (w = v + c),
                  K !== d || (o !== 0 && K.nodeType !== 3) || (D = v + o),
                  K.nodeType === 3 && (v += K.nodeValue.length),
                  (q = K.firstChild) !== null;
              )
                ((B = K), (K = q));
              for (;;) {
                if (K === t) break t;
                if (
                  (B === r && ++k === c && (w = v),
                  B === d && ++Y === o && (D = v),
                  (q = K.nextSibling) !== null)
                )
                  break;
                ((K = B), (B = K.parentNode));
              }
              K = q;
            }
            r = w === -1 || D === -1 ? null : { start: w, end: D };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (
      Af = { focusedElem: t, selectionRange: r }, ul = !1, rt = n;
      rt !== null;
    )
      if (
        ((n = rt), (t = n.child), (n.subtreeFlags & 1028) !== 0 && t !== null)
      )
        ((t.return = n), (rt = t));
      else
        for (; rt !== null; ) {
          switch (((n = rt), (d = n.alternate), (t = n.flags), n.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = n.updateQueue),
                (t = t !== null ? t.events : null),
                t !== null)
              )
                for (r = 0; r < t.length; r++)
                  ((c = t[r]), (c.ref.impl = c.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && d !== null) {
                ((t = void 0),
                  (r = n),
                  (c = d.memoizedProps),
                  (d = d.memoizedState),
                  (o = r.stateNode));
                try {
                  var te = Ji(r.type, c);
                  ((t = o.getSnapshotBeforeUpdate(te, d)),
                    (o.__reactInternalSnapshotBeforeUpdate = t));
                } catch (ue) {
                  Ne(r, r.return, ue);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (
                  ((t = n.stateNode.containerInfo), (r = t.nodeType), r === 9)
                )
                  Df(t);
                else if (r === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Df(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(s(163));
          }
          if (((t = n.sibling), t !== null)) {
            ((t.return = n.return), (rt = t));
            break;
          }
          rt = n.return;
        }
  }
  function fy(t, n, r) {
    var o = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        (Yn(t, r), o & 4 && Jr(5, r));
        break;
      case 1:
        if ((Yn(t, r), o & 4))
          if (((t = r.stateNode), n === null))
            try {
              t.componentDidMount();
            } catch (v) {
              Ne(r, r.return, v);
            }
          else {
            var c = Ji(r.type, n.memoizedProps);
            n = n.memoizedState;
            try {
              t.componentDidUpdate(c, n, t.__reactInternalSnapshotBeforeUpdate);
            } catch (v) {
              Ne(r, r.return, v);
            }
          }
        (o & 64 && ry(r), o & 512 && es(r, r.return));
        break;
      case 3:
        if ((Yn(t, r), o & 64 && ((t = r.updateQueue), t !== null))) {
          if (((n = null), r.child !== null))
            switch (r.child.tag) {
              case 27:
              case 5:
                n = r.child.stateNode;
                break;
              case 1:
                n = r.child.stateNode;
            }
          try {
            $p(t, n);
          } catch (v) {
            Ne(r, r.return, v);
          }
        }
        break;
      case 27:
        n === null && o & 4 && uy(r);
      case 26:
      case 5:
        (Yn(t, r), n === null && o & 4 && oy(r), o & 512 && es(r, r.return));
        break;
      case 12:
        Yn(t, r);
        break;
      case 31:
        (Yn(t, r), o & 4 && my(t, r));
        break;
      case 13:
        (Yn(t, r),
          o & 4 && py(t, r),
          o & 64 &&
            ((t = r.memoizedState),
            t !== null &&
              ((t = t.dehydrated),
              t !== null && ((r = bA.bind(null, r)), BA(t, r)))));
        break;
      case 22:
        if (((o = r.memoizedState !== null || Fn), !o)) {
          ((n = (n !== null && n.memoizedState !== null) || Je), (c = Fn));
          var d = Je;
          ((Fn = o),
            (Je = n) && !d ? In(t, r, (r.subtreeFlags & 8772) !== 0) : Yn(t, r),
            (Fn = c),
            (Je = d));
        }
        break;
      case 30:
        break;
      default:
        Yn(t, r);
    }
  }
  function dy(t) {
    var n = t.alternate;
    (n !== null && ((t.alternate = null), dy(n)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((n = t.stateNode), n !== null && ju(n)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var Ue = null,
    St = !1;
  function Gn(t, n, r) {
    for (r = r.child; r !== null; ) (hy(t, n, r), (r = r.sibling));
  }
  function hy(t, n, r) {
    if (Nt && typeof Nt.onCommitFiberUnmount == "function")
      try {
        Nt.onCommitFiberUnmount(Tr, r);
      } catch {}
    switch (r.tag) {
      case 26:
        (Je || bn(r, n),
          Gn(t, n, r),
          r.memoizedState
            ? r.memoizedState.count--
            : r.stateNode && ((r = r.stateNode), r.parentNode.removeChild(r)));
        break;
      case 27:
        Je || bn(r, n);
        var o = Ue,
          c = St;
        (wi(r.type) && ((Ue = r.stateNode), (St = !1)),
          Gn(t, n, r),
          us(r.stateNode),
          (Ue = o),
          (St = c));
        break;
      case 5:
        Je || bn(r, n);
      case 6:
        if (
          ((o = Ue),
          (c = St),
          (Ue = null),
          Gn(t, n, r),
          (Ue = o),
          (St = c),
          Ue !== null)
        )
          if (St)
            try {
              (Ue.nodeType === 9
                ? Ue.body
                : Ue.nodeName === "HTML"
                  ? Ue.ownerDocument.body
                  : Ue
              ).removeChild(r.stateNode);
            } catch (d) {
              Ne(r, n, d);
            }
          else
            try {
              Ue.removeChild(r.stateNode);
            } catch (d) {
              Ne(r, n, d);
            }
        break;
      case 18:
        Ue !== null &&
          (St
            ? ((t = Ue),
              rv(
                t.nodeType === 9
                  ? t.body
                  : t.nodeName === "HTML"
                    ? t.ownerDocument.body
                    : t,
                r.stateNode,
              ),
              Qa(t))
            : rv(Ue, r.stateNode));
        break;
      case 4:
        ((o = Ue),
          (c = St),
          (Ue = r.stateNode.containerInfo),
          (St = !0),
          Gn(t, n, r),
          (Ue = o),
          (St = c));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (pi(2, r, n), Je || pi(4, r, n), Gn(t, n, r));
        break;
      case 1:
        (Je ||
          (bn(r, n),
          (o = r.stateNode),
          typeof o.componentWillUnmount == "function" && sy(r, n, o)),
          Gn(t, n, r));
        break;
      case 21:
        Gn(t, n, r);
        break;
      case 22:
        ((Je = (o = Je) || r.memoizedState !== null), Gn(t, n, r), (Je = o));
        break;
      default:
        Gn(t, n, r);
    }
  }
  function my(t, n) {
    if (
      n.memoizedState === null &&
      ((t = n.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        Qa(t);
      } catch (r) {
        Ne(n, n.return, r);
      }
    }
  }
  function py(t, n) {
    if (
      n.memoizedState === null &&
      ((t = n.alternate),
      t !== null &&
        ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        Qa(t);
      } catch (r) {
        Ne(n, n.return, r);
      }
  }
  function fA(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return (n === null && (n = t.stateNode = new cy()), n);
      case 22:
        return (
          (t = t.stateNode),
          (n = t._retryCache),
          n === null && (n = t._retryCache = new cy()),
          n
        );
      default:
        throw Error(s(435, t.tag));
    }
  }
  function Fo(t, n) {
    var r = fA(t);
    n.forEach(function (o) {
      if (!r.has(o)) {
        r.add(o);
        var c = xA.bind(null, t, o);
        o.then(c, c);
      }
    });
  }
  function wt(t, n) {
    var r = n.deletions;
    if (r !== null)
      for (var o = 0; o < r.length; o++) {
        var c = r[o],
          d = t,
          v = n,
          w = v;
        e: for (; w !== null; ) {
          switch (w.tag) {
            case 27:
              if (wi(w.type)) {
                ((Ue = w.stateNode), (St = !1));
                break e;
              }
              break;
            case 5:
              ((Ue = w.stateNode), (St = !1));
              break e;
            case 3:
            case 4:
              ((Ue = w.stateNode.containerInfo), (St = !0));
              break e;
          }
          w = w.return;
        }
        if (Ue === null) throw Error(s(160));
        (hy(d, v, c),
          (Ue = null),
          (St = !1),
          (d = c.alternate),
          d !== null && (d.return = null),
          (c.return = null));
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; ) (gy(n, t), (n = n.sibling));
  }
  var ln = null;
  function gy(t, n) {
    var r = t.alternate,
      o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (wt(n, t),
          Et(t),
          o & 4 && (pi(3, t, t.return), Jr(3, t), pi(5, t, t.return)));
        break;
      case 1:
        (wt(n, t),
          Et(t),
          o & 512 && (Je || r === null || bn(r, r.return)),
          o & 64 &&
            Fn &&
            ((t = t.updateQueue),
            t !== null &&
              ((o = t.callbacks),
              o !== null &&
                ((r = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = r === null ? o : r.concat(o))))));
        break;
      case 26:
        var c = ln;
        if (
          (wt(n, t),
          Et(t),
          o & 512 && (Je || r === null || bn(r, r.return)),
          o & 4)
        ) {
          var d = r !== null ? r.memoizedState : null;
          if (((o = t.memoizedState), r === null))
            if (o === null)
              if (t.stateNode === null) {
                e: {
                  ((o = t.type),
                    (r = t.memoizedProps),
                    (c = c.ownerDocument || c));
                  t: switch (o) {
                    case "title":
                      ((d = c.getElementsByTagName("title")[0]),
                        (!d ||
                          d[Rr] ||
                          d[lt] ||
                          d.namespaceURI === "http://www.w3.org/2000/svg" ||
                          d.hasAttribute("itemprop")) &&
                          ((d = c.createElement(o)),
                          c.head.insertBefore(
                            d,
                            c.querySelector("head > title"),
                          )),
                        dt(d, o, r),
                        (d[lt] = t),
                        at(d),
                        (o = d));
                      break e;
                    case "link":
                      var v = gv("link", "href", c).get(o + (r.href || ""));
                      if (v) {
                        for (var w = 0; w < v.length; w++)
                          if (
                            ((d = v[w]),
                            d.getAttribute("href") ===
                              (r.href == null || r.href === ""
                                ? null
                                : r.href) &&
                              d.getAttribute("rel") ===
                                (r.rel == null ? null : r.rel) &&
                              d.getAttribute("title") ===
                                (r.title == null ? null : r.title) &&
                              d.getAttribute("crossorigin") ===
                                (r.crossOrigin == null ? null : r.crossOrigin))
                          ) {
                            v.splice(w, 1);
                            break t;
                          }
                      }
                      ((d = c.createElement(o)),
                        dt(d, o, r),
                        c.head.appendChild(d));
                      break;
                    case "meta":
                      if (
                        (v = gv("meta", "content", c).get(
                          o + (r.content || ""),
                        ))
                      ) {
                        for (w = 0; w < v.length; w++)
                          if (
                            ((d = v[w]),
                            d.getAttribute("content") ===
                              (r.content == null ? null : "" + r.content) &&
                              d.getAttribute("name") ===
                                (r.name == null ? null : r.name) &&
                              d.getAttribute("property") ===
                                (r.property == null ? null : r.property) &&
                              d.getAttribute("http-equiv") ===
                                (r.httpEquiv == null ? null : r.httpEquiv) &&
                              d.getAttribute("charset") ===
                                (r.charSet == null ? null : r.charSet))
                          ) {
                            v.splice(w, 1);
                            break t;
                          }
                      }
                      ((d = c.createElement(o)),
                        dt(d, o, r),
                        c.head.appendChild(d));
                      break;
                    default:
                      throw Error(s(468, o));
                  }
                  ((d[lt] = t), at(d), (o = d));
                }
                t.stateNode = o;
              } else yv(c, t.type, t.stateNode);
            else t.stateNode = pv(c, o, t.memoizedProps);
          else
            d !== o
              ? (d === null
                  ? r.stateNode !== null &&
                    ((r = r.stateNode), r.parentNode.removeChild(r))
                  : d.count--,
                o === null
                  ? yv(c, t.type, t.stateNode)
                  : pv(c, o, t.memoizedProps))
              : o === null &&
                t.stateNode !== null &&
                Jc(t, t.memoizedProps, r.memoizedProps);
        }
        break;
      case 27:
        (wt(n, t),
          Et(t),
          o & 512 && (Je || r === null || bn(r, r.return)),
          r !== null && o & 4 && Jc(t, t.memoizedProps, r.memoizedProps));
        break;
      case 5:
        if (
          (wt(n, t),
          Et(t),
          o & 512 && (Je || r === null || bn(r, r.return)),
          t.flags & 32)
        ) {
          c = t.stateNode;
          try {
            ba(c, "");
          } catch (te) {
            Ne(t, t.return, te);
          }
        }
        (o & 4 &&
          t.stateNode != null &&
          ((c = t.memoizedProps), Jc(t, c, r !== null ? r.memoizedProps : c)),
          o & 1024 && (nf = !0));
        break;
      case 6:
        if ((wt(n, t), Et(t), o & 4)) {
          if (t.stateNode === null) throw Error(s(162));
          ((o = t.memoizedProps), (r = t.stateNode));
          try {
            r.nodeValue = o;
          } catch (te) {
            Ne(t, t.return, te);
          }
        }
        break;
      case 3:
        if (
          ((rl = null),
          (c = ln),
          (ln = il(n.containerInfo)),
          wt(n, t),
          (ln = c),
          Et(t),
          o & 4 && r !== null && r.memoizedState.isDehydrated)
        )
          try {
            Qa(n.containerInfo);
          } catch (te) {
            Ne(t, t.return, te);
          }
        nf && ((nf = !1), yy(t));
        break;
      case 4:
        ((o = ln),
          (ln = il(t.stateNode.containerInfo)),
          wt(n, t),
          Et(t),
          (ln = o));
        break;
      case 12:
        (wt(n, t), Et(t));
        break;
      case 31:
        (wt(n, t),
          Et(t),
          o & 4 &&
            ((o = t.updateQueue),
            o !== null && ((t.updateQueue = null), Fo(t, o))));
        break;
      case 13:
        (wt(n, t),
          Et(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) !=
              (r !== null && r.memoizedState !== null) &&
            (Yo = Ot()),
          o & 4 &&
            ((o = t.updateQueue),
            o !== null && ((t.updateQueue = null), Fo(t, o))));
        break;
      case 22:
        c = t.memoizedState !== null;
        var D = r !== null && r.memoizedState !== null,
          k = Fn,
          Y = Je;
        if (
          ((Fn = k || c),
          (Je = Y || D),
          wt(n, t),
          (Je = Y),
          (Fn = k),
          Et(t),
          o & 8192)
        )
          e: for (
            n = t.stateNode,
              n._visibility = c ? n._visibility & -2 : n._visibility | 1,
              c && (r === null || D || Fn || Je || ea(t)),
              r = null,
              n = t;
            ;
          ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                D = r = n;
                try {
                  if (((d = D.stateNode), c))
                    ((v = d.style),
                      typeof v.setProperty == "function"
                        ? v.setProperty("display", "none", "important")
                        : (v.display = "none"));
                  else {
                    w = D.stateNode;
                    var K = D.memoizedProps.style,
                      B =
                        K != null && K.hasOwnProperty("display")
                          ? K.display
                          : null;
                    w.style.display =
                      B == null || typeof B == "boolean" ? "" : ("" + B).trim();
                  }
                } catch (te) {
                  Ne(D, D.return, te);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                D = n;
                try {
                  D.stateNode.nodeValue = c ? "" : D.memoizedProps;
                } catch (te) {
                  Ne(D, D.return, te);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                D = n;
                try {
                  var q = D.stateNode;
                  c ? sv(q, !0) : sv(D.stateNode, !1);
                } catch (te) {
                  Ne(D, D.return, te);
                }
              }
            } else if (
              ((n.tag !== 22 && n.tag !== 23) ||
                n.memoizedState === null ||
                n === t) &&
              n.child !== null
            ) {
              ((n.child.return = n), (n = n.child));
              continue;
            }
            if (n === t) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === t) break e;
              (r === n && (r = null), (n = n.return));
            }
            (r === n && (r = null),
              (n.sibling.return = n.return),
              (n = n.sibling));
          }
        o & 4 &&
          ((o = t.updateQueue),
          o !== null &&
            ((r = o.retryQueue),
            r !== null && ((o.retryQueue = null), Fo(t, r))));
        break;
      case 19:
        (wt(n, t),
          Et(t),
          o & 4 &&
            ((o = t.updateQueue),
            o !== null && ((t.updateQueue = null), Fo(t, o))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (wt(n, t), Et(t));
    }
  }
  function Et(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var r, o = t.return; o !== null; ) {
          if (ly(o)) {
            r = o;
            break;
          }
          o = o.return;
        }
        if (r == null) throw Error(s(160));
        switch (r.tag) {
          case 27:
            var c = r.stateNode,
              d = ef(t);
            qo(t, d, c);
            break;
          case 5:
            var v = r.stateNode;
            r.flags & 32 && (ba(v, ""), (r.flags &= -33));
            var w = ef(t);
            qo(t, w, v);
            break;
          case 3:
          case 4:
            var D = r.stateNode.containerInfo,
              k = ef(t);
            tf(t, k, D);
            break;
          default:
            throw Error(s(161));
        }
      } catch (Y) {
        Ne(t, t.return, Y);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function yy(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        (yy(n),
          n.tag === 5 && n.flags & 1024 && n.stateNode.reset(),
          (t = t.sibling));
      }
  }
  function Yn(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; ) (fy(t, n.alternate, n), (n = n.sibling));
  }
  function ea(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (pi(4, n, n.return), ea(n));
          break;
        case 1:
          bn(n, n.return);
          var r = n.stateNode;
          (typeof r.componentWillUnmount == "function" && sy(n, n.return, r),
            ea(n));
          break;
        case 27:
          us(n.stateNode);
        case 26:
        case 5:
          (bn(n, n.return), ea(n));
          break;
        case 22:
          n.memoizedState === null && ea(n);
          break;
        case 30:
          ea(n);
          break;
        default:
          ea(n);
      }
      t = t.sibling;
    }
  }
  function In(t, n, r) {
    for (r = r && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate,
        c = t,
        d = n,
        v = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          (In(c, d, r), Jr(4, d));
          break;
        case 1:
          if (
            (In(c, d, r),
            (o = d),
            (c = o.stateNode),
            typeof c.componentDidMount == "function")
          )
            try {
              c.componentDidMount();
            } catch (k) {
              Ne(o, o.return, k);
            }
          if (((o = d), (c = o.updateQueue), c !== null)) {
            var w = o.stateNode;
            try {
              var D = c.shared.hiddenCallbacks;
              if (D !== null)
                for (c.shared.hiddenCallbacks = null, c = 0; c < D.length; c++)
                  Kp(D[c], w);
            } catch (k) {
              Ne(o, o.return, k);
            }
          }
          (r && v & 64 && ry(d), es(d, d.return));
          break;
        case 27:
          uy(d);
        case 26:
        case 5:
          (In(c, d, r), r && o === null && v & 4 && oy(d), es(d, d.return));
          break;
        case 12:
          In(c, d, r);
          break;
        case 31:
          (In(c, d, r), r && v & 4 && my(c, d));
          break;
        case 13:
          (In(c, d, r), r && v & 4 && py(c, d));
          break;
        case 22:
          (d.memoizedState === null && In(c, d, r), es(d, d.return));
          break;
        case 30:
          break;
        default:
          In(c, d, r);
      }
      n = n.sibling;
    }
  }
  function af(t, n) {
    var r = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (r = t.memoizedState.cachePool.pool),
      (t = null),
      n.memoizedState !== null &&
        n.memoizedState.cachePool !== null &&
        (t = n.memoizedState.cachePool.pool),
      t !== r && (t != null && t.refCount++, r != null && Ur(r)));
  }
  function rf(t, n) {
    ((t = null),
      n.alternate !== null && (t = n.alternate.memoizedState.cache),
      (n = n.memoizedState.cache),
      n !== t && (n.refCount++, t != null && Ur(t)));
  }
  function un(t, n, r, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) (vy(t, n, r, o), (n = n.sibling));
  }
  function vy(t, n, r, o) {
    var c = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        (un(t, n, r, o), c & 2048 && Jr(9, n));
        break;
      case 1:
        un(t, n, r, o);
        break;
      case 3:
        (un(t, n, r, o),
          c & 2048 &&
            ((t = null),
            n.alternate !== null && (t = n.alternate.memoizedState.cache),
            (n = n.memoizedState.cache),
            n !== t && (n.refCount++, t != null && Ur(t))));
        break;
      case 12:
        if (c & 2048) {
          (un(t, n, r, o), (t = n.stateNode));
          try {
            var d = n.memoizedProps,
              v = d.id,
              w = d.onPostCommit;
            typeof w == "function" &&
              w(
                v,
                n.alternate === null ? "mount" : "update",
                t.passiveEffectDuration,
                -0,
              );
          } catch (D) {
            Ne(n, n.return, D);
          }
        } else un(t, n, r, o);
        break;
      case 31:
        un(t, n, r, o);
        break;
      case 13:
        un(t, n, r, o);
        break;
      case 23:
        break;
      case 22:
        ((d = n.stateNode),
          (v = n.alternate),
          n.memoizedState !== null
            ? d._visibility & 2
              ? un(t, n, r, o)
              : ts(t, n)
            : d._visibility & 2
              ? un(t, n, r, o)
              : ((d._visibility |= 2),
                Ba(t, n, r, o, (n.subtreeFlags & 10256) !== 0 || !1)),
          c & 2048 && af(v, n));
        break;
      case 24:
        (un(t, n, r, o), c & 2048 && rf(n.alternate, n));
        break;
      default:
        un(t, n, r, o);
    }
  }
  function Ba(t, n, r, o, c) {
    for (
      c = c && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child;
      n !== null;
    ) {
      var d = t,
        v = n,
        w = r,
        D = o,
        k = v.flags;
      switch (v.tag) {
        case 0:
        case 11:
        case 15:
          (Ba(d, v, w, D, c), Jr(8, v));
          break;
        case 23:
          break;
        case 22:
          var Y = v.stateNode;
          (v.memoizedState !== null
            ? Y._visibility & 2
              ? Ba(d, v, w, D, c)
              : ts(d, v)
            : ((Y._visibility |= 2), Ba(d, v, w, D, c)),
            c && k & 2048 && af(v.alternate, v));
          break;
        case 24:
          (Ba(d, v, w, D, c), c && k & 2048 && rf(v.alternate, v));
          break;
        default:
          Ba(d, v, w, D, c);
      }
      n = n.sibling;
    }
  }
  function ts(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = t,
          o = n,
          c = o.flags;
        switch (o.tag) {
          case 22:
            (ts(r, o), c & 2048 && af(o.alternate, o));
            break;
          case 24:
            (ts(r, o), c & 2048 && rf(o.alternate, o));
            break;
          default:
            ts(r, o);
        }
        n = n.sibling;
      }
  }
  var ns = 8192;
  function Ua(t, n, r) {
    if (t.subtreeFlags & ns)
      for (t = t.child; t !== null; ) (by(t, n, r), (t = t.sibling));
  }
  function by(t, n, r) {
    switch (t.tag) {
      case 26:
        (Ua(t, n, r),
          t.flags & ns &&
            t.memoizedState !== null &&
            ZA(r, ln, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        Ua(t, n, r);
        break;
      case 3:
      case 4:
        var o = ln;
        ((ln = il(t.stateNode.containerInfo)), Ua(t, n, r), (ln = o));
        break;
      case 22:
        t.memoizedState === null &&
          ((o = t.alternate),
          o !== null && o.memoizedState !== null
            ? ((o = ns), (ns = 16777216), Ua(t, n, r), (ns = o))
            : Ua(t, n, r));
        break;
      default:
        Ua(t, n, r);
    }
  }
  function xy(t) {
    var n = t.alternate;
    if (n !== null && ((t = n.child), t !== null)) {
      n.child = null;
      do ((n = t.sibling), (t.sibling = null), (t = n));
      while (t !== null);
    }
  }
  function is(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var o = n[r];
          ((rt = o), wy(o, t));
        }
      xy(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (Sy(t), (t = t.sibling));
  }
  function Sy(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (is(t), t.flags & 2048 && pi(9, t, t.return));
        break;
      case 3:
        is(t);
        break;
      case 12:
        is(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null &&
        n._visibility & 2 &&
        (t.return === null || t.return.tag !== 13)
          ? ((n._visibility &= -3), Go(t))
          : is(t);
        break;
      default:
        is(t);
    }
  }
  function Go(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var o = n[r];
          ((rt = o), wy(o, t));
        }
      xy(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((n = t), n.tag)) {
        case 0:
        case 11:
        case 15:
          (pi(8, n, n.return), Go(n));
          break;
        case 22:
          ((r = n.stateNode),
            r._visibility & 2 && ((r._visibility &= -3), Go(n)));
          break;
        default:
          Go(n);
      }
      t = t.sibling;
    }
  }
  function wy(t, n) {
    for (; rt !== null; ) {
      var r = rt;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          pi(8, r, n);
          break;
        case 23:
        case 22:
          if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
            var o = r.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Ur(r.memoizedState.cache);
      }
      if (((o = r.child), o !== null)) ((o.return = r), (rt = o));
      else
        e: for (r = t; rt !== null; ) {
          o = rt;
          var c = o.sibling,
            d = o.return;
          if ((dy(o), o === r)) {
            rt = null;
            break e;
          }
          if (c !== null) {
            ((c.return = d), (rt = c));
            break e;
          }
          rt = d;
        }
    }
  }
  var dA = {
      getCacheForType: function (t) {
        var n = ct(Qe),
          r = n.data.get(t);
        return (r === void 0 && ((r = t()), n.data.set(t, r)), r);
      },
      cacheSignal: function () {
        return ct(Qe).controller.signal;
      },
    },
    hA = typeof WeakMap == "function" ? WeakMap : Map,
    Me = 0,
    Ve = null,
    Se = null,
    Ee = 0,
    Oe = 0,
    Vt = null,
    gi = !1,
    Ha = !1,
    sf = !1,
    Xn = 0,
    Ge = 0,
    yi = 0,
    ta = 0,
    of = 0,
    kt = 0,
    qa = 0,
    as = null,
    Tt = null,
    lf = !1,
    Yo = 0,
    Ey = 0,
    Io = 1 / 0,
    Xo = null,
    vi = null,
    nt = 0,
    bi = null,
    Fa = null,
    Kn = 0,
    uf = 0,
    cf = null,
    Ty = null,
    rs = 0,
    ff = null;
  function Bt() {
    return (Me & 2) !== 0 && Ee !== 0 ? Ee & -Ee : z.T !== null ? yf() : Um();
  }
  function Ay() {
    if (kt === 0)
      if ((Ee & 536870912) === 0 || Ce) {
        var t = eo;
        ((eo <<= 1), (eo & 3932160) === 0 && (eo = 262144), (kt = t));
      } else kt = 536870912;
    return ((t = zt.current), t !== null && (t.flags |= 32), kt);
  }
  function At(t, n, r) {
    (((t === Ve && (Oe === 2 || Oe === 9)) || t.cancelPendingCommit !== null) &&
      (Ga(t, 0), xi(t, Ee, kt, !1)),
      Cr(t, r),
      ((Me & 2) === 0 || t !== Ve) &&
        (t === Ve &&
          ((Me & 2) === 0 && (ta |= r), Ge === 4 && xi(t, Ee, kt, !1)),
        xn(t)));
  }
  function Cy(t, n, r) {
    if ((Me & 6) !== 0) throw Error(s(327));
    var o = (!r && (n & 127) === 0 && (n & t.expiredLanes) === 0) || Ar(t, n),
      c = o ? gA(t, n) : hf(t, n, !0),
      d = o;
    do {
      if (c === 0) {
        Ha && !o && xi(t, n, 0, !1);
        break;
      } else {
        if (((r = t.current.alternate), d && !mA(r))) {
          ((c = hf(t, n, !1)), (d = !1));
          continue;
        }
        if (c === 2) {
          if (((d = n), t.errorRecoveryDisabledLanes & d)) var v = 0;
          else
            ((v = t.pendingLanes & -536870913),
              (v = v !== 0 ? v : v & 536870912 ? 536870912 : 0));
          if (v !== 0) {
            n = v;
            e: {
              var w = t;
              c = as;
              var D = w.current.memoizedState.isDehydrated;
              if ((D && (Ga(w, v).flags |= 256), (v = hf(w, v, !1)), v !== 2)) {
                if (sf && !D) {
                  ((w.errorRecoveryDisabledLanes |= d), (ta |= d), (c = 4));
                  break e;
                }
                ((d = Tt),
                  (Tt = c),
                  d !== null &&
                    (Tt === null ? (Tt = d) : Tt.push.apply(Tt, d)));
              }
              c = v;
            }
            if (((d = !1), c !== 2)) continue;
          }
        }
        if (c === 1) {
          (Ga(t, 0), xi(t, n, 0, !0));
          break;
        }
        e: {
          switch (((o = t), (d = c), d)) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              xi(o, n, kt, !gi);
              break e;
            case 2:
              Tt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((n & 62914560) === n && ((c = Yo + 300 - Ot()), 10 < c)) {
            if ((xi(o, n, kt, !gi), no(o, 0, !0) !== 0)) break e;
            ((Kn = n),
              (o.timeoutHandle = iv(
                Ry.bind(
                  null,
                  o,
                  r,
                  Tt,
                  Xo,
                  lf,
                  n,
                  kt,
                  ta,
                  qa,
                  gi,
                  d,
                  "Throttled",
                  -0,
                  0,
                ),
                c,
              )));
            break e;
          }
          Ry(o, r, Tt, Xo, lf, n, kt, ta, qa, gi, d, null, -0, 0);
        }
      }
      break;
    } while (!0);
    xn(t);
  }
  function Ry(t, n, r, o, c, d, v, w, D, k, Y, K, B, q) {
    if (
      ((t.timeoutHandle = -1),
      (K = n.subtreeFlags),
      K & 8192 || (K & 16785408) === 16785408)
    ) {
      ((K = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: _n,
      }),
        by(n, d, K));
      var te =
        (d & 62914560) === d ? Yo - Ot() : (d & 4194048) === d ? Ey - Ot() : 0;
      if (((te = WA(K, te)), te !== null)) {
        ((Kn = d),
          (t.cancelPendingCommit = te(
            zy.bind(null, t, n, d, r, o, c, v, w, D, Y, K, null, B, q),
          )),
          xi(t, d, v, !k));
        return;
      }
    }
    zy(t, n, d, r, o, c, v, w, D);
  }
  function mA(t) {
    for (var n = t; ; ) {
      var r = n.tag;
      if (
        (r === 0 || r === 11 || r === 15) &&
        n.flags & 16384 &&
        ((r = n.updateQueue), r !== null && ((r = r.stores), r !== null))
      )
        for (var o = 0; o < r.length; o++) {
          var c = r[o],
            d = c.getSnapshot;
          c = c.value;
          try {
            if (!_t(d(), c)) return !1;
          } catch {
            return !1;
          }
        }
      if (((r = n.child), n.subtreeFlags & 16384 && r !== null))
        ((r.return = n), (n = r));
      else {
        if (n === t) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === t) return !0;
          n = n.return;
        }
        ((n.sibling.return = n.return), (n = n.sibling));
      }
    }
    return !0;
  }
  function xi(t, n, r, o) {
    ((n &= ~of),
      (n &= ~ta),
      (t.suspendedLanes |= n),
      (t.pingedLanes &= ~n),
      o && (t.warmLanes |= n),
      (o = t.expirationTimes));
    for (var c = n; 0 < c; ) {
      var d = 31 - jt(c),
        v = 1 << d;
      ((o[d] = -1), (c &= ~v));
    }
    r !== 0 && Vm(t, r, n);
  }
  function Ko() {
    return (Me & 6) === 0 ? (ss(0), !1) : !0;
  }
  function df() {
    if (Se !== null) {
      if (Oe === 0) var t = Se.return;
      else ((t = Se), (Vn = Ii = null), Rc(t), (La = null), (qr = 0), (t = Se));
      for (; t !== null; ) (ay(t.alternate, t), (t = t.return));
      Se = null;
    }
  }
  function Ga(t, n) {
    var r = t.timeoutHandle;
    (r !== -1 && ((t.timeoutHandle = -1), LA(r)),
      (r = t.cancelPendingCommit),
      r !== null && ((t.cancelPendingCommit = null), r()),
      (Kn = 0),
      df(),
      (Ve = t),
      (Se = r = zn(t.current, null)),
      (Ee = n),
      (Oe = 0),
      (Vt = null),
      (gi = !1),
      (Ha = Ar(t, n)),
      (sf = !1),
      (qa = kt = of = ta = yi = Ge = 0),
      (Tt = as = null),
      (lf = !1),
      (n & 8) !== 0 && (n |= n & 32));
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var c = 31 - jt(o),
          d = 1 << c;
        ((n |= t[c]), (o &= ~d));
      }
    return ((Xn = n), po(), r);
  }
  function Dy(t, n) {
    ((ve = null),
      (z.H = Qr),
      n === _a || n === Eo
        ? ((n = Gp()), (Oe = 3))
        : n === pc
          ? ((n = Gp()), (Oe = 4))
          : (Oe =
              n === Fc
                ? 8
                : n !== null &&
                    typeof n == "object" &&
                    typeof n.then == "function"
                  ? 6
                  : 1),
      (Vt = n),
      Se === null && ((Ge = 1), Vo(t, Xt(n, t.current))));
  }
  function My() {
    var t = zt.current;
    return t === null
      ? !0
      : (Ee & 4194048) === Ee
        ? Zt === null
        : (Ee & 62914560) === Ee || (Ee & 536870912) !== 0
          ? t === Zt
          : !1;
  }
  function Oy() {
    var t = z.H;
    return ((z.H = Qr), t === null ? Qr : t);
  }
  function Ny() {
    var t = z.A;
    return ((z.A = dA), t);
  }
  function $o() {
    ((Ge = 4),
      gi || ((Ee & 4194048) !== Ee && zt.current !== null) || (Ha = !0),
      ((yi & 134217727) === 0 && (ta & 134217727) === 0) ||
        Ve === null ||
        xi(Ve, Ee, kt, !1));
  }
  function hf(t, n, r) {
    var o = Me;
    Me |= 2;
    var c = Oy(),
      d = Ny();
    ((Ve !== t || Ee !== n) && ((Xo = null), Ga(t, n)), (n = !1));
    var v = Ge;
    e: do
      try {
        if (Oe !== 0 && Se !== null) {
          var w = Se,
            D = Vt;
          switch (Oe) {
            case 8:
              (df(), (v = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              zt.current === null && (n = !0);
              var k = Oe;
              if (((Oe = 0), (Vt = null), Ya(t, w, D, k), r && Ha)) {
                v = 0;
                break e;
              }
              break;
            default:
              ((k = Oe), (Oe = 0), (Vt = null), Ya(t, w, D, k));
          }
        }
        (pA(), (v = Ge));
        break;
      } catch (Y) {
        Dy(t, Y);
      }
    while (!0);
    return (
      n && t.shellSuspendCounter++,
      (Vn = Ii = null),
      (Me = o),
      (z.H = c),
      (z.A = d),
      Se === null && ((Ve = null), (Ee = 0), po()),
      v
    );
  }
  function pA() {
    for (; Se !== null; ) jy(Se);
  }
  function gA(t, n) {
    var r = Me;
    Me |= 2;
    var o = Oy(),
      c = Ny();
    Ve !== t || Ee !== n
      ? ((Xo = null), (Io = Ot() + 500), Ga(t, n))
      : (Ha = Ar(t, n));
    e: do
      try {
        if (Oe !== 0 && Se !== null) {
          n = Se;
          var d = Vt;
          t: switch (Oe) {
            case 1:
              ((Oe = 0), (Vt = null), Ya(t, n, d, 1));
              break;
            case 2:
            case 9:
              if (qp(d)) {
                ((Oe = 0), (Vt = null), _y(n));
                break;
              }
              ((n = function () {
                ((Oe !== 2 && Oe !== 9) || Ve !== t || (Oe = 7), xn(t));
              }),
                d.then(n, n));
              break e;
            case 3:
              Oe = 7;
              break e;
            case 4:
              Oe = 5;
              break e;
            case 7:
              qp(d)
                ? ((Oe = 0), (Vt = null), _y(n))
                : ((Oe = 0), (Vt = null), Ya(t, n, d, 7));
              break;
            case 5:
              var v = null;
              switch (Se.tag) {
                case 26:
                  v = Se.memoizedState;
                case 5:
                case 27:
                  var w = Se;
                  if (v ? vv(v) : w.stateNode.complete) {
                    ((Oe = 0), (Vt = null));
                    var D = w.sibling;
                    if (D !== null) Se = D;
                    else {
                      var k = w.return;
                      k !== null ? ((Se = k), Qo(k)) : (Se = null);
                    }
                    break t;
                  }
              }
              ((Oe = 0), (Vt = null), Ya(t, n, d, 5));
              break;
            case 6:
              ((Oe = 0), (Vt = null), Ya(t, n, d, 6));
              break;
            case 8:
              (df(), (Ge = 6));
              break e;
            default:
              throw Error(s(462));
          }
        }
        yA();
        break;
      } catch (Y) {
        Dy(t, Y);
      }
    while (!0);
    return (
      (Vn = Ii = null),
      (z.H = o),
      (z.A = c),
      (Me = r),
      Se !== null ? 0 : ((Ve = null), (Ee = 0), po(), Ge)
    );
  }
  function yA() {
    for (; Se !== null && !UE(); ) jy(Se);
  }
  function jy(t) {
    var n = ny(t.alternate, t, Xn);
    ((t.memoizedProps = t.pendingProps), n === null ? Qo(t) : (Se = n));
  }
  function _y(t) {
    var n = t,
      r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Qg(r, n, n.pendingProps, n.type, void 0, Ee);
        break;
      case 11:
        n = Qg(r, n, n.pendingProps, n.type.render, n.ref, Ee);
        break;
      case 5:
        Rc(n);
      default:
        (ay(r, n), (n = Se = Np(n, Xn)), (n = ny(r, n, Xn)));
    }
    ((t.memoizedProps = t.pendingProps), n === null ? Qo(t) : (Se = n));
  }
  function Ya(t, n, r, o) {
    ((Vn = Ii = null), Rc(n), (La = null), (qr = 0));
    var c = n.return;
    try {
      if (rA(t, c, n, r, Ee)) {
        ((Ge = 1), Vo(t, Xt(r, t.current)), (Se = null));
        return;
      }
    } catch (d) {
      if (c !== null) throw ((Se = c), d);
      ((Ge = 1), Vo(t, Xt(r, t.current)), (Se = null));
      return;
    }
    n.flags & 32768
      ? (Ce || o === 1
          ? (t = !0)
          : Ha || (Ee & 536870912) !== 0
            ? (t = !1)
            : ((gi = t = !0),
              (o === 2 || o === 9 || o === 3 || o === 6) &&
                ((o = zt.current),
                o !== null && o.tag === 13 && (o.flags |= 16384))),
        Ly(n, t))
      : Qo(n);
  }
  function Qo(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        Ly(n, gi);
        return;
      }
      t = n.return;
      var r = lA(n.alternate, n, Xn);
      if (r !== null) {
        Se = r;
        return;
      }
      if (((n = n.sibling), n !== null)) {
        Se = n;
        return;
      }
      Se = n = t;
    } while (n !== null);
    Ge === 0 && (Ge = 5);
  }
  function Ly(t, n) {
    do {
      var r = uA(t.alternate, t);
      if (r !== null) {
        ((r.flags &= 32767), (Se = r));
        return;
      }
      if (
        ((r = t.return),
        r !== null &&
          ((r.flags |= 32768), (r.subtreeFlags = 0), (r.deletions = null)),
        !n && ((t = t.sibling), t !== null))
      ) {
        Se = t;
        return;
      }
      Se = t = r;
    } while (t !== null);
    ((Ge = 6), (Se = null));
  }
  function zy(t, n, r, o, c, d, v, w, D) {
    t.cancelPendingCommit = null;
    do Zo();
    while (nt !== 0);
    if ((Me & 6) !== 0) throw Error(s(327));
    if (n !== null) {
      if (n === t.current) throw Error(s(177));
      if (
        ((d = n.lanes | n.childLanes),
        (d |= ec),
        QE(t, r, d, v, w, D),
        t === Ve && ((Se = Ve = null), (Ee = 0)),
        (Fa = n),
        (bi = t),
        (Kn = r),
        (uf = d),
        (cf = c),
        (Ty = o),
        (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            SA(Ws, function () {
              return (Uy(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (o = (n.flags & 13878) !== 0),
        (n.subtreeFlags & 13878) !== 0 || o)
      ) {
        ((o = z.T), (z.T = null), (c = G.p), (G.p = 2), (v = Me), (Me |= 4));
        try {
          cA(t, n, r);
        } finally {
          ((Me = v), (G.p = c), (z.T = o));
        }
      }
      ((nt = 1), Py(), Vy(), ky());
    }
  }
  function Py() {
    if (nt === 1) {
      nt = 0;
      var t = bi,
        n = Fa,
        r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        ((r = z.T), (z.T = null));
        var o = G.p;
        G.p = 2;
        var c = Me;
        Me |= 4;
        try {
          gy(n, t);
          var d = Af,
            v = wp(t.containerInfo),
            w = d.focusedElem,
            D = d.selectionRange;
          if (
            v !== w &&
            w &&
            w.ownerDocument &&
            Sp(w.ownerDocument.documentElement, w)
          ) {
            if (D !== null && $u(w)) {
              var k = D.start,
                Y = D.end;
              if ((Y === void 0 && (Y = k), "selectionStart" in w))
                ((w.selectionStart = k),
                  (w.selectionEnd = Math.min(Y, w.value.length)));
              else {
                var K = w.ownerDocument || document,
                  B = (K && K.defaultView) || window;
                if (B.getSelection) {
                  var q = B.getSelection(),
                    te = w.textContent.length,
                    ue = Math.min(D.start, te),
                    ze = D.end === void 0 ? ue : Math.min(D.end, te);
                  !q.extend && ue > ze && ((v = ze), (ze = ue), (ue = v));
                  var _ = xp(w, ue),
                    j = xp(w, ze);
                  if (
                    _ &&
                    j &&
                    (q.rangeCount !== 1 ||
                      q.anchorNode !== _.node ||
                      q.anchorOffset !== _.offset ||
                      q.focusNode !== j.node ||
                      q.focusOffset !== j.offset)
                  ) {
                    var P = K.createRange();
                    (P.setStart(_.node, _.offset),
                      q.removeAllRanges(),
                      ue > ze
                        ? (q.addRange(P), q.extend(j.node, j.offset))
                        : (P.setEnd(j.node, j.offset), q.addRange(P)));
                  }
                }
              }
            }
            for (K = [], q = w; (q = q.parentNode); )
              q.nodeType === 1 &&
                K.push({ element: q, left: q.scrollLeft, top: q.scrollTop });
            for (
              typeof w.focus == "function" && w.focus(), w = 0;
              w < K.length;
              w++
            ) {
              var X = K[w];
              ((X.element.scrollLeft = X.left), (X.element.scrollTop = X.top));
            }
          }
          ((ul = !!Tf), (Af = Tf = null));
        } finally {
          ((Me = c), (G.p = o), (z.T = r));
        }
      }
      ((t.current = n), (nt = 2));
    }
  }
  function Vy() {
    if (nt === 2) {
      nt = 0;
      var t = bi,
        n = Fa,
        r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        ((r = z.T), (z.T = null));
        var o = G.p;
        G.p = 2;
        var c = Me;
        Me |= 4;
        try {
          fy(t, n.alternate, n);
        } finally {
          ((Me = c), (G.p = o), (z.T = r));
        }
      }
      nt = 3;
    }
  }
  function ky() {
    if (nt === 4 || nt === 3) {
      ((nt = 0), HE());
      var t = bi,
        n = Fa,
        r = Kn,
        o = Ty;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
        ? (nt = 5)
        : ((nt = 0), (Fa = bi = null), By(t, t.pendingLanes));
      var c = t.pendingLanes;
      if (
        (c === 0 && (vi = null),
        Ou(r),
        (n = n.stateNode),
        Nt && typeof Nt.onCommitFiberRoot == "function")
      )
        try {
          Nt.onCommitFiberRoot(Tr, n, void 0, (n.current.flags & 128) === 128);
        } catch {}
      if (o !== null) {
        ((n = z.T), (c = G.p), (G.p = 2), (z.T = null));
        try {
          for (var d = t.onRecoverableError, v = 0; v < o.length; v++) {
            var w = o[v];
            d(w.value, { componentStack: w.stack });
          }
        } finally {
          ((z.T = n), (G.p = c));
        }
      }
      ((Kn & 3) !== 0 && Zo(),
        xn(t),
        (c = t.pendingLanes),
        (r & 261930) !== 0 && (c & 42) !== 0
          ? t === ff
            ? rs++
            : ((rs = 0), (ff = t))
          : (rs = 0),
        ss(0));
    }
  }
  function By(t, n) {
    (t.pooledCacheLanes &= n) === 0 &&
      ((n = t.pooledCache), n != null && ((t.pooledCache = null), Ur(n)));
  }
  function Zo() {
    return (Py(), Vy(), ky(), Uy());
  }
  function Uy() {
    if (nt !== 5) return !1;
    var t = bi,
      n = uf;
    uf = 0;
    var r = Ou(Kn),
      o = z.T,
      c = G.p;
    try {
      ((G.p = 32 > r ? 32 : r), (z.T = null), (r = cf), (cf = null));
      var d = bi,
        v = Kn;
      if (((nt = 0), (Fa = bi = null), (Kn = 0), (Me & 6) !== 0))
        throw Error(s(331));
      var w = Me;
      if (
        ((Me |= 4),
        Sy(d.current),
        vy(d, d.current, v, r),
        (Me = w),
        ss(0, !1),
        Nt && typeof Nt.onPostCommitFiberRoot == "function")
      )
        try {
          Nt.onPostCommitFiberRoot(Tr, d);
        } catch {}
      return !0;
    } finally {
      ((G.p = c), (z.T = o), By(t, n));
    }
  }
  function Hy(t, n, r) {
    ((n = Xt(r, n)),
      (n = qc(t.stateNode, n, 2)),
      (t = di(t, n, 2)),
      t !== null && (Cr(t, 2), xn(t)));
  }
  function Ne(t, n, r) {
    if (t.tag === 3) Hy(t, t, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Hy(n, t, r);
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (
            typeof n.type.getDerivedStateFromError == "function" ||
            (typeof o.componentDidCatch == "function" &&
              (vi === null || !vi.has(o)))
          ) {
            ((t = Xt(r, t)),
              (r = qg(2)),
              (o = di(n, r, 2)),
              o !== null && (Fg(r, o, n, t), Cr(o, 2), xn(o)));
            break;
          }
        }
        n = n.return;
      }
  }
  function mf(t, n, r) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new hA();
      var c = new Set();
      o.set(n, c);
    } else ((c = o.get(n)), c === void 0 && ((c = new Set()), o.set(n, c)));
    c.has(r) ||
      ((sf = !0), c.add(r), (t = vA.bind(null, t, n, r)), n.then(t, t));
  }
  function vA(t, n, r) {
    var o = t.pingCache;
    (o !== null && o.delete(n),
      (t.pingedLanes |= t.suspendedLanes & r),
      (t.warmLanes &= ~r),
      Ve === t &&
        (Ee & r) === r &&
        (Ge === 4 || (Ge === 3 && (Ee & 62914560) === Ee && 300 > Ot() - Yo)
          ? (Me & 2) === 0 && Ga(t, 0)
          : (of |= r),
        qa === Ee && (qa = 0)),
      xn(t));
  }
  function qy(t, n) {
    (n === 0 && (n = Pm()), (t = Fi(t, n)), t !== null && (Cr(t, n), xn(t)));
  }
  function bA(t) {
    var n = t.memoizedState,
      r = 0;
    (n !== null && (r = n.retryLane), qy(t, r));
  }
  function xA(t, n) {
    var r = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var o = t.stateNode,
          c = t.memoizedState;
        c !== null && (r = c.retryLane);
        break;
      case 19:
        o = t.stateNode;
        break;
      case 22:
        o = t.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    (o !== null && o.delete(n), qy(t, r));
  }
  function SA(t, n) {
    return Cu(t, n);
  }
  var Wo = null,
    Ia = null,
    pf = !1,
    Jo = !1,
    gf = !1,
    Si = 0;
  function xn(t) {
    (t !== Ia &&
      t.next === null &&
      (Ia === null ? (Wo = Ia = t) : (Ia = Ia.next = t)),
      (Jo = !0),
      pf || ((pf = !0), EA()));
  }
  function ss(t, n) {
    if (!gf && Jo) {
      gf = !0;
      do
        for (var r = !1, o = Wo; o !== null; ) {
          if (t !== 0) {
            var c = o.pendingLanes;
            if (c === 0) var d = 0;
            else {
              var v = o.suspendedLanes,
                w = o.pingedLanes;
              ((d = (1 << (31 - jt(42 | t) + 1)) - 1),
                (d &= c & ~(v & ~w)),
                (d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
            }
            d !== 0 && ((r = !0), Iy(o, d));
          } else
            ((d = Ee),
              (d = no(
                o,
                o === Ve ? d : 0,
                o.cancelPendingCommit !== null || o.timeoutHandle !== -1,
              )),
              (d & 3) === 0 || Ar(o, d) || ((r = !0), Iy(o, d)));
          o = o.next;
        }
      while (r);
      gf = !1;
    }
  }
  function wA() {
    Fy();
  }
  function Fy() {
    Jo = pf = !1;
    var t = 0;
    Si !== 0 && _A() && (t = Si);
    for (var n = Ot(), r = null, o = Wo; o !== null; ) {
      var c = o.next,
        d = Gy(o, n);
      (d === 0
        ? ((o.next = null),
          r === null ? (Wo = c) : (r.next = c),
          c === null && (Ia = r))
        : ((r = o), (t !== 0 || (d & 3) !== 0) && (Jo = !0)),
        (o = c));
    }
    ((nt !== 0 && nt !== 5) || ss(t), Si !== 0 && (Si = 0));
  }
  function Gy(t, n) {
    for (
      var r = t.suspendedLanes,
        o = t.pingedLanes,
        c = t.expirationTimes,
        d = t.pendingLanes & -62914561;
      0 < d;
    ) {
      var v = 31 - jt(d),
        w = 1 << v,
        D = c[v];
      (D === -1
        ? ((w & r) === 0 || (w & o) !== 0) && (c[v] = $E(w, n))
        : D <= n && (t.expiredLanes |= w),
        (d &= ~w));
    }
    if (
      ((n = Ve),
      (r = Ee),
      (r = no(
        t,
        t === n ? r : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      (o = t.callbackNode),
      r === 0 ||
        (t === n && (Oe === 2 || Oe === 9)) ||
        t.cancelPendingCommit !== null)
    )
      return (
        o !== null && o !== null && Ru(o),
        (t.callbackNode = null),
        (t.callbackPriority = 0)
      );
    if ((r & 3) === 0 || Ar(t, r)) {
      if (((n = r & -r), n === t.callbackPriority)) return n;
      switch ((o !== null && Ru(o), Ou(r))) {
        case 2:
        case 8:
          r = Lm;
          break;
        case 32:
          r = Ws;
          break;
        case 268435456:
          r = zm;
          break;
        default:
          r = Ws;
      }
      return (
        (o = Yy.bind(null, t)),
        (r = Cu(r, o)),
        (t.callbackPriority = n),
        (t.callbackNode = r),
        n
      );
    }
    return (
      o !== null && o !== null && Ru(o),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function Yy(t, n) {
    if (nt !== 0 && nt !== 5)
      return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var r = t.callbackNode;
    if (Zo() && t.callbackNode !== r) return null;
    var o = Ee;
    return (
      (o = no(
        t,
        t === Ve ? o : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      o === 0
        ? null
        : (Cy(t, o, n),
          Gy(t, Ot()),
          t.callbackNode != null && t.callbackNode === r
            ? Yy.bind(null, t)
            : null)
    );
  }
  function Iy(t, n) {
    if (Zo()) return null;
    Cy(t, n, !0);
  }
  function EA() {
    zA(function () {
      (Me & 6) !== 0 ? Cu(_m, wA) : Fy();
    });
  }
  function yf() {
    if (Si === 0) {
      var t = Na;
      (t === 0 && ((t = Js), (Js <<= 1), (Js & 261888) === 0 && (Js = 256)),
        (Si = t));
    }
    return Si;
  }
  function Xy(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
        ? t
        : so("" + t);
  }
  function Ky(t, n) {
    var r = n.ownerDocument.createElement("input");
    return (
      (r.name = n.name),
      (r.value = n.value),
      t.id && r.setAttribute("form", t.id),
      n.parentNode.insertBefore(r, n),
      (t = new FormData(t)),
      r.parentNode.removeChild(r),
      t
    );
  }
  function TA(t, n, r, o, c) {
    if (n === "submit" && r && r.stateNode === c) {
      var d = Xy((c[bt] || null).action),
        v = o.submitter;
      v &&
        ((n = (n = v[bt] || null)
          ? Xy(n.formAction)
          : v.getAttribute("formAction")),
        n !== null && ((d = n), (v = null)));
      var w = new co("action", "action", null, o, c);
      t.push({
        event: w,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (o.defaultPrevented) {
                if (Si !== 0) {
                  var D = v ? Ky(c, v) : new FormData(c);
                  Pc(
                    r,
                    { pending: !0, data: D, method: c.method, action: d },
                    null,
                    D,
                  );
                }
              } else
                typeof d == "function" &&
                  (w.preventDefault(),
                  (D = v ? Ky(c, v) : new FormData(c)),
                  Pc(
                    r,
                    { pending: !0, data: D, method: c.method, action: d },
                    d,
                    D,
                  ));
            },
            currentTarget: c,
          },
        ],
      });
    }
  }
  for (var vf = 0; vf < Ju.length; vf++) {
    var bf = Ju[vf],
      AA = bf.toLowerCase(),
      CA = bf[0].toUpperCase() + bf.slice(1);
    on(AA, "on" + CA);
  }
  (on(Ap, "onAnimationEnd"),
    on(Cp, "onAnimationIteration"),
    on(Rp, "onAnimationStart"),
    on("dblclick", "onDoubleClick"),
    on("focusin", "onFocus"),
    on("focusout", "onBlur"),
    on(qT, "onTransitionRun"),
    on(FT, "onTransitionStart"),
    on(GT, "onTransitionCancel"),
    on(Dp, "onTransitionEnd"),
    ya("onMouseEnter", ["mouseout", "mouseover"]),
    ya("onMouseLeave", ["mouseout", "mouseover"]),
    ya("onPointerEnter", ["pointerout", "pointerover"]),
    ya("onPointerLeave", ["pointerout", "pointerover"]),
    Bi(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    Bi(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Bi("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Bi(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    Bi(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Bi(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var os =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    RA = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(os),
    );
  function $y(t, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < t.length; r++) {
      var o = t[r],
        c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (n)
          for (var v = o.length - 1; 0 <= v; v--) {
            var w = o[v],
              D = w.instance,
              k = w.currentTarget;
            if (((w = w.listener), D !== d && c.isPropagationStopped()))
              break e;
            ((d = w), (c.currentTarget = k));
            try {
              d(c);
            } catch (Y) {
              mo(Y);
            }
            ((c.currentTarget = null), (d = D));
          }
        else
          for (v = 0; v < o.length; v++) {
            if (
              ((w = o[v]),
              (D = w.instance),
              (k = w.currentTarget),
              (w = w.listener),
              D !== d && c.isPropagationStopped())
            )
              break e;
            ((d = w), (c.currentTarget = k));
            try {
              d(c);
            } catch (Y) {
              mo(Y);
            }
            ((c.currentTarget = null), (d = D));
          }
      }
    }
  }
  function we(t, n) {
    var r = n[Nu];
    r === void 0 && (r = n[Nu] = new Set());
    var o = t + "__bubble";
    r.has(o) || (Qy(n, t, 2, !1), r.add(o));
  }
  function xf(t, n, r) {
    var o = 0;
    (n && (o |= 4), Qy(r, t, o, n));
  }
  var el = "_reactListening" + Math.random().toString(36).slice(2);
  function Sf(t) {
    if (!t[el]) {
      ((t[el] = !0),
        Fm.forEach(function (r) {
          r !== "selectionchange" && (RA.has(r) || xf(r, !1, t), xf(r, !0, t));
        }));
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[el] || ((n[el] = !0), xf("selectionchange", !1, n));
    }
  }
  function Qy(t, n, r, o) {
    switch (Av(n)) {
      case 2:
        var c = tC;
        break;
      case 8:
        c = nC;
        break;
      default:
        c = Pf;
    }
    ((r = c.bind(null, n, r, t)),
      (c = void 0),
      !Uu ||
        (n !== "touchstart" && n !== "touchmove" && n !== "wheel") ||
        (c = !0),
      o
        ? c !== void 0
          ? t.addEventListener(n, r, { capture: !0, passive: c })
          : t.addEventListener(n, r, !0)
        : c !== void 0
          ? t.addEventListener(n, r, { passive: c })
          : t.addEventListener(n, r, !1));
  }
  function wf(t, n, r, o, c) {
    var d = o;
    if ((n & 1) === 0 && (n & 2) === 0 && o !== null)
      e: for (;;) {
        if (o === null) return;
        var v = o.tag;
        if (v === 3 || v === 4) {
          var w = o.stateNode.containerInfo;
          if (w === c) break;
          if (v === 4)
            for (v = o.return; v !== null; ) {
              var D = v.tag;
              if ((D === 3 || D === 4) && v.stateNode.containerInfo === c)
                return;
              v = v.return;
            }
          for (; w !== null; ) {
            if (((v = ma(w)), v === null)) return;
            if (((D = v.tag), D === 5 || D === 6 || D === 26 || D === 27)) {
              o = d = v;
              continue e;
            }
            w = w.parentNode;
          }
        }
        o = o.return;
      }
    tp(function () {
      var k = d,
        Y = ku(r),
        K = [];
      e: {
        var B = Mp.get(t);
        if (B !== void 0) {
          var q = co,
            te = t;
          switch (t) {
            case "keypress":
              if (lo(r) === 0) break e;
            case "keydown":
            case "keyup":
              q = xT;
              break;
            case "focusin":
              ((te = "focus"), (q = Gu));
              break;
            case "focusout":
              ((te = "blur"), (q = Gu));
              break;
            case "beforeblur":
            case "afterblur":
              q = Gu;
              break;
            case "click":
              if (r.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              q = ap;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              q = lT;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              q = ET;
              break;
            case Ap:
            case Cp:
            case Rp:
              q = fT;
              break;
            case Dp:
              q = AT;
              break;
            case "scroll":
            case "scrollend":
              q = sT;
              break;
            case "wheel":
              q = RT;
              break;
            case "copy":
            case "cut":
            case "paste":
              q = hT;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              q = sp;
              break;
            case "toggle":
            case "beforetoggle":
              q = MT;
          }
          var ue = (n & 4) !== 0,
            ze = !ue && (t === "scroll" || t === "scrollend"),
            _ = ue ? (B !== null ? B + "Capture" : null) : B;
          ue = [];
          for (var j = k, P; j !== null; ) {
            var X = j;
            if (
              ((P = X.stateNode),
              (X = X.tag),
              (X !== 5 && X !== 26 && X !== 27) ||
                P === null ||
                _ === null ||
                ((X = Mr(j, _)), X != null && ue.push(ls(j, X, P))),
              ze)
            )
              break;
            j = j.return;
          }
          0 < ue.length &&
            ((B = new q(B, te, null, r, Y)),
            K.push({ event: B, listeners: ue }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (
            ((B = t === "mouseover" || t === "pointerover"),
            (q = t === "mouseout" || t === "pointerout"),
            B &&
              r !== Vu &&
              (te = r.relatedTarget || r.fromElement) &&
              (ma(te) || te[ha]))
          )
            break e;
          if (
            (q || B) &&
            ((B =
              Y.window === Y
                ? Y
                : (B = Y.ownerDocument)
                  ? B.defaultView || B.parentWindow
                  : window),
            q
              ? ((te = r.relatedTarget || r.toElement),
                (q = k),
                (te = te ? ma(te) : null),
                te !== null &&
                  ((ze = u(te)),
                  (ue = te.tag),
                  te !== ze || (ue !== 5 && ue !== 27 && ue !== 6)) &&
                  (te = null))
              : ((q = null), (te = k)),
            q !== te)
          ) {
            if (
              ((ue = ap),
              (X = "onMouseLeave"),
              (_ = "onMouseEnter"),
              (j = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((ue = sp),
                (X = "onPointerLeave"),
                (_ = "onPointerEnter"),
                (j = "pointer")),
              (ze = q == null ? B : Dr(q)),
              (P = te == null ? B : Dr(te)),
              (B = new ue(X, j + "leave", q, r, Y)),
              (B.target = ze),
              (B.relatedTarget = P),
              (X = null),
              ma(Y) === k &&
                ((ue = new ue(_, j + "enter", te, r, Y)),
                (ue.target = P),
                (ue.relatedTarget = ze),
                (X = ue)),
              (ze = X),
              q && te)
            )
              t: {
                for (ue = DA, _ = q, j = te, P = 0, X = _; X; X = ue(X)) P++;
                X = 0;
                for (var le = j; le; le = ue(le)) X++;
                for (; 0 < P - X; ) ((_ = ue(_)), P--);
                for (; 0 < X - P; ) ((j = ue(j)), X--);
                for (; P--; ) {
                  if (_ === j || (j !== null && _ === j.alternate)) {
                    ue = _;
                    break t;
                  }
                  ((_ = ue(_)), (j = ue(j)));
                }
                ue = null;
              }
            else ue = null;
            (q !== null && Zy(K, B, q, ue, !1),
              te !== null && ze !== null && Zy(K, ze, te, ue, !0));
          }
        }
        e: {
          if (
            ((B = k ? Dr(k) : window),
            (q = B.nodeName && B.nodeName.toLowerCase()),
            q === "select" || (q === "input" && B.type === "file"))
          )
            var Re = mp;
          else if (dp(B))
            if (pp) Re = BT;
            else {
              Re = VT;
              var re = PT;
            }
          else
            ((q = B.nodeName),
              !q ||
              q.toLowerCase() !== "input" ||
              (B.type !== "checkbox" && B.type !== "radio")
                ? k && Pu(k.elementType) && (Re = mp)
                : (Re = kT));
          if (Re && (Re = Re(t, k))) {
            hp(K, Re, r, Y);
            break e;
          }
          (re && re(t, B, k),
            t === "focusout" &&
              k &&
              B.type === "number" &&
              k.memoizedProps.value != null &&
              zu(B, "number", B.value));
        }
        switch (((re = k ? Dr(k) : window), t)) {
          case "focusin":
            (dp(re) || re.contentEditable === "true") &&
              ((Ea = re), (Qu = k), (Vr = null));
            break;
          case "focusout":
            Vr = Qu = Ea = null;
            break;
          case "mousedown":
            Zu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Zu = !1), Ep(K, r, Y));
            break;
          case "selectionchange":
            if (HT) break;
          case "keydown":
          case "keyup":
            Ep(K, r, Y);
        }
        var be;
        if (Iu)
          e: {
            switch (t) {
              case "compositionstart":
                var Te = "onCompositionStart";
                break e;
              case "compositionend":
                Te = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Te = "onCompositionUpdate";
                break e;
            }
            Te = void 0;
          }
        else
          wa
            ? cp(t, r) && (Te = "onCompositionEnd")
            : t === "keydown" &&
              r.keyCode === 229 &&
              (Te = "onCompositionStart");
        (Te &&
          (op &&
            r.locale !== "ko" &&
            (wa || Te !== "onCompositionStart"
              ? Te === "onCompositionEnd" && wa && (be = np())
              : ((ri = Y),
                (Hu = "value" in ri ? ri.value : ri.textContent),
                (wa = !0))),
          (re = tl(k, Te)),
          0 < re.length &&
            ((Te = new rp(Te, t, null, r, Y)),
            K.push({ event: Te, listeners: re }),
            be
              ? (Te.data = be)
              : ((be = fp(r)), be !== null && (Te.data = be)))),
          (be = NT ? jT(t, r) : _T(t, r)) &&
            ((Te = tl(k, "onBeforeInput")),
            0 < Te.length &&
              ((re = new rp("onBeforeInput", "beforeinput", null, r, Y)),
              K.push({ event: re, listeners: Te }),
              (re.data = be))),
          TA(K, t, k, r, Y));
      }
      $y(K, n);
    });
  }
  function ls(t, n, r) {
    return { instance: t, listener: n, currentTarget: r };
  }
  function tl(t, n) {
    for (var r = n + "Capture", o = []; t !== null; ) {
      var c = t,
        d = c.stateNode;
      if (
        ((c = c.tag),
        (c !== 5 && c !== 26 && c !== 27) ||
          d === null ||
          ((c = Mr(t, r)),
          c != null && o.unshift(ls(t, c, d)),
          (c = Mr(t, n)),
          c != null && o.push(ls(t, c, d))),
        t.tag === 3)
      )
        return o;
      t = t.return;
    }
    return [];
  }
  function DA(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Zy(t, n, r, o, c) {
    for (var d = n._reactName, v = []; r !== null && r !== o; ) {
      var w = r,
        D = w.alternate,
        k = w.stateNode;
      if (((w = w.tag), D !== null && D === o)) break;
      ((w !== 5 && w !== 26 && w !== 27) ||
        k === null ||
        ((D = k),
        c
          ? ((k = Mr(r, d)), k != null && v.unshift(ls(r, k, D)))
          : c || ((k = Mr(r, d)), k != null && v.push(ls(r, k, D)))),
        (r = r.return));
    }
    v.length !== 0 && t.push({ event: n, listeners: v });
  }
  var MA = /\r\n?/g,
    OA = /\u0000|\uFFFD/g;
  function Wy(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        MA,
        `
`,
      )
      .replace(OA, "");
  }
  function Jy(t, n) {
    return ((n = Wy(n)), Wy(t) === n);
  }
  function Le(t, n, r, o, c, d) {
    switch (r) {
      case "children":
        typeof o == "string"
          ? n === "body" || (n === "textarea" && o === "") || ba(t, o)
          : (typeof o == "number" || typeof o == "bigint") &&
            n !== "body" &&
            ba(t, "" + o);
        break;
      case "className":
        ao(t, "class", o);
        break;
      case "tabIndex":
        ao(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ao(t, r, o);
        break;
      case "style":
        Jm(t, o, d);
        break;
      case "data":
        if (n !== "object") {
          ao(t, "data", o);
          break;
        }
      case "src":
      case "href":
        if (o === "" && (n !== "a" || r !== "href")) {
          t.removeAttribute(r);
          break;
        }
        if (
          o == null ||
          typeof o == "function" ||
          typeof o == "symbol" ||
          typeof o == "boolean"
        ) {
          t.removeAttribute(r);
          break;
        }
        ((o = so("" + o)), t.setAttribute(r, o));
        break;
      case "action":
      case "formAction":
        if (typeof o == "function") {
          t.setAttribute(
            r,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof d == "function" &&
            (r === "formAction"
              ? (n !== "input" && Le(t, n, "name", c.name, c, null),
                Le(t, n, "formEncType", c.formEncType, c, null),
                Le(t, n, "formMethod", c.formMethod, c, null),
                Le(t, n, "formTarget", c.formTarget, c, null))
              : (Le(t, n, "encType", c.encType, c, null),
                Le(t, n, "method", c.method, c, null),
                Le(t, n, "target", c.target, c, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(r);
          break;
        }
        ((o = so("" + o)), t.setAttribute(r, o));
        break;
      case "onClick":
        o != null && (t.onclick = _n);
        break;
      case "onScroll":
        o != null && we("scroll", t);
        break;
      case "onScrollEnd":
        o != null && we("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o)) throw Error(s(61));
          if (((r = o.__html), r != null)) {
            if (c.children != null) throw Error(s(60));
            t.innerHTML = r;
          }
        }
        break;
      case "multiple":
        t.multiple = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "muted":
        t.muted = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          o == null ||
          typeof o == "function" ||
          typeof o == "boolean" ||
          typeof o == "symbol"
        ) {
          t.removeAttribute("xlink:href");
          break;
        }
        ((r = so("" + o)),
          t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", r));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        o != null && typeof o != "function" && typeof o != "symbol"
          ? t.setAttribute(r, "" + o)
          : t.removeAttribute(r);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        o && typeof o != "function" && typeof o != "symbol"
          ? t.setAttribute(r, "")
          : t.removeAttribute(r);
        break;
      case "capture":
      case "download":
        o === !0
          ? t.setAttribute(r, "")
          : o !== !1 &&
              o != null &&
              typeof o != "function" &&
              typeof o != "symbol"
            ? t.setAttribute(r, o)
            : t.removeAttribute(r);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        o != null &&
        typeof o != "function" &&
        typeof o != "symbol" &&
        !isNaN(o) &&
        1 <= o
          ? t.setAttribute(r, o)
          : t.removeAttribute(r);
        break;
      case "rowSpan":
      case "start":
        o == null || typeof o == "function" || typeof o == "symbol" || isNaN(o)
          ? t.removeAttribute(r)
          : t.setAttribute(r, o);
        break;
      case "popover":
        (we("beforetoggle", t), we("toggle", t), io(t, "popover", o));
        break;
      case "xlinkActuate":
        jn(t, "http://www.w3.org/1999/xlink", "xlink:actuate", o);
        break;
      case "xlinkArcrole":
        jn(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", o);
        break;
      case "xlinkRole":
        jn(t, "http://www.w3.org/1999/xlink", "xlink:role", o);
        break;
      case "xlinkShow":
        jn(t, "http://www.w3.org/1999/xlink", "xlink:show", o);
        break;
      case "xlinkTitle":
        jn(t, "http://www.w3.org/1999/xlink", "xlink:title", o);
        break;
      case "xlinkType":
        jn(t, "http://www.w3.org/1999/xlink", "xlink:type", o);
        break;
      case "xmlBase":
        jn(t, "http://www.w3.org/XML/1998/namespace", "xml:base", o);
        break;
      case "xmlLang":
        jn(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", o);
        break;
      case "xmlSpace":
        jn(t, "http://www.w3.org/XML/1998/namespace", "xml:space", o);
        break;
      case "is":
        io(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) ||
          (r[0] !== "o" && r[0] !== "O") ||
          (r[1] !== "n" && r[1] !== "N")) &&
          ((r = aT.get(r) || r), io(t, r, o));
    }
  }
  function Ef(t, n, r, o, c, d) {
    switch (r) {
      case "style":
        Jm(t, o, d);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o)) throw Error(s(61));
          if (((r = o.__html), r != null)) {
            if (c.children != null) throw Error(s(60));
            t.innerHTML = r;
          }
        }
        break;
      case "children":
        typeof o == "string"
          ? ba(t, o)
          : (typeof o == "number" || typeof o == "bigint") && ba(t, "" + o);
        break;
      case "onScroll":
        o != null && we("scroll", t);
        break;
      case "onScrollEnd":
        o != null && we("scrollend", t);
        break;
      case "onClick":
        o != null && (t.onclick = _n);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Gm.hasOwnProperty(r))
          e: {
            if (
              r[0] === "o" &&
              r[1] === "n" &&
              ((c = r.endsWith("Capture")),
              (n = r.slice(2, c ? r.length - 7 : void 0)),
              (d = t[bt] || null),
              (d = d != null ? d[r] : null),
              typeof d == "function" && t.removeEventListener(n, d, c),
              typeof o == "function")
            ) {
              (typeof d != "function" &&
                d !== null &&
                (r in t
                  ? (t[r] = null)
                  : t.hasAttribute(r) && t.removeAttribute(r)),
                t.addEventListener(n, o, c));
              break e;
            }
            r in t
              ? (t[r] = o)
              : o === !0
                ? t.setAttribute(r, "")
                : io(t, r, o);
          }
    }
  }
  function dt(t, n, r) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (we("error", t), we("load", t));
        var o = !1,
          c = !1,
          d;
        for (d in r)
          if (r.hasOwnProperty(d)) {
            var v = r[d];
            if (v != null)
              switch (d) {
                case "src":
                  o = !0;
                  break;
                case "srcSet":
                  c = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, n));
                default:
                  Le(t, n, d, v, r, null);
              }
          }
        (c && Le(t, n, "srcSet", r.srcSet, r, null),
          o && Le(t, n, "src", r.src, r, null));
        return;
      case "input":
        we("invalid", t);
        var w = (d = v = c = null),
          D = null,
          k = null;
        for (o in r)
          if (r.hasOwnProperty(o)) {
            var Y = r[o];
            if (Y != null)
              switch (o) {
                case "name":
                  c = Y;
                  break;
                case "type":
                  v = Y;
                  break;
                case "checked":
                  D = Y;
                  break;
                case "defaultChecked":
                  k = Y;
                  break;
                case "value":
                  d = Y;
                  break;
                case "defaultValue":
                  w = Y;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Y != null) throw Error(s(137, n));
                  break;
                default:
                  Le(t, n, o, Y, r, null);
              }
          }
        $m(t, d, w, D, k, v, c, !1);
        return;
      case "select":
        (we("invalid", t), (o = v = d = null));
        for (c in r)
          if (r.hasOwnProperty(c) && ((w = r[c]), w != null))
            switch (c) {
              case "value":
                d = w;
                break;
              case "defaultValue":
                v = w;
                break;
              case "multiple":
                o = w;
              default:
                Le(t, n, c, w, r, null);
            }
        ((n = d),
          (r = v),
          (t.multiple = !!o),
          n != null ? va(t, !!o, n, !1) : r != null && va(t, !!o, r, !0));
        return;
      case "textarea":
        (we("invalid", t), (d = c = o = null));
        for (v in r)
          if (r.hasOwnProperty(v) && ((w = r[v]), w != null))
            switch (v) {
              case "value":
                o = w;
                break;
              case "defaultValue":
                c = w;
                break;
              case "children":
                d = w;
                break;
              case "dangerouslySetInnerHTML":
                if (w != null) throw Error(s(91));
                break;
              default:
                Le(t, n, v, w, r, null);
            }
        Zm(t, o, c, d);
        return;
      case "option":
        for (D in r)
          if (r.hasOwnProperty(D) && ((o = r[D]), o != null))
            switch (D) {
              case "selected":
                t.selected =
                  o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                Le(t, n, D, o, r, null);
            }
        return;
      case "dialog":
        (we("beforetoggle", t),
          we("toggle", t),
          we("cancel", t),
          we("close", t));
        break;
      case "iframe":
      case "object":
        we("load", t);
        break;
      case "video":
      case "audio":
        for (o = 0; o < os.length; o++) we(os[o], t);
        break;
      case "image":
        (we("error", t), we("load", t));
        break;
      case "details":
        we("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        (we("error", t), we("load", t));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (k in r)
          if (r.hasOwnProperty(k) && ((o = r[k]), o != null))
            switch (k) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, n));
              default:
                Le(t, n, k, o, r, null);
            }
        return;
      default:
        if (Pu(n)) {
          for (Y in r)
            r.hasOwnProperty(Y) &&
              ((o = r[Y]), o !== void 0 && Ef(t, n, Y, o, r, void 0));
          return;
        }
    }
    for (w in r)
      r.hasOwnProperty(w) && ((o = r[w]), o != null && Le(t, n, w, o, r, null));
  }
  function NA(t, n, r, o) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var c = null,
          d = null,
          v = null,
          w = null,
          D = null,
          k = null,
          Y = null;
        for (q in r) {
          var K = r[q];
          if (r.hasOwnProperty(q) && K != null)
            switch (q) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                D = K;
              default:
                o.hasOwnProperty(q) || Le(t, n, q, null, o, K);
            }
        }
        for (var B in o) {
          var q = o[B];
          if (((K = r[B]), o.hasOwnProperty(B) && (q != null || K != null)))
            switch (B) {
              case "type":
                d = q;
                break;
              case "name":
                c = q;
                break;
              case "checked":
                k = q;
                break;
              case "defaultChecked":
                Y = q;
                break;
              case "value":
                v = q;
                break;
              case "defaultValue":
                w = q;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (q != null) throw Error(s(137, n));
                break;
              default:
                q !== K && Le(t, n, B, q, o, K);
            }
        }
        Lu(t, v, w, D, k, Y, d, c);
        return;
      case "select":
        q = v = w = B = null;
        for (d in r)
          if (((D = r[d]), r.hasOwnProperty(d) && D != null))
            switch (d) {
              case "value":
                break;
              case "multiple":
                q = D;
              default:
                o.hasOwnProperty(d) || Le(t, n, d, null, o, D);
            }
        for (c in o)
          if (
            ((d = o[c]),
            (D = r[c]),
            o.hasOwnProperty(c) && (d != null || D != null))
          )
            switch (c) {
              case "value":
                B = d;
                break;
              case "defaultValue":
                w = d;
                break;
              case "multiple":
                v = d;
              default:
                d !== D && Le(t, n, c, d, o, D);
            }
        ((n = w),
          (r = v),
          (o = q),
          B != null
            ? va(t, !!r, B, !1)
            : !!o != !!r &&
              (n != null ? va(t, !!r, n, !0) : va(t, !!r, r ? [] : "", !1)));
        return;
      case "textarea":
        q = B = null;
        for (w in r)
          if (
            ((c = r[w]),
            r.hasOwnProperty(w) && c != null && !o.hasOwnProperty(w))
          )
            switch (w) {
              case "value":
                break;
              case "children":
                break;
              default:
                Le(t, n, w, null, o, c);
            }
        for (v in o)
          if (
            ((c = o[v]),
            (d = r[v]),
            o.hasOwnProperty(v) && (c != null || d != null))
          )
            switch (v) {
              case "value":
                B = c;
                break;
              case "defaultValue":
                q = c;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(s(91));
                break;
              default:
                c !== d && Le(t, n, v, c, o, d);
            }
        Qm(t, B, q);
        return;
      case "option":
        for (var te in r)
          if (
            ((B = r[te]),
            r.hasOwnProperty(te) && B != null && !o.hasOwnProperty(te))
          )
            switch (te) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Le(t, n, te, null, o, B);
            }
        for (D in o)
          if (
            ((B = o[D]),
            (q = r[D]),
            o.hasOwnProperty(D) && B !== q && (B != null || q != null))
          )
            switch (D) {
              case "selected":
                t.selected =
                  B && typeof B != "function" && typeof B != "symbol";
                break;
              default:
                Le(t, n, D, B, o, q);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ue in r)
          ((B = r[ue]),
            r.hasOwnProperty(ue) &&
              B != null &&
              !o.hasOwnProperty(ue) &&
              Le(t, n, ue, null, o, B));
        for (k in o)
          if (
            ((B = o[k]),
            (q = r[k]),
            o.hasOwnProperty(k) && B !== q && (B != null || q != null))
          )
            switch (k) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (B != null) throw Error(s(137, n));
                break;
              default:
                Le(t, n, k, B, o, q);
            }
        return;
      default:
        if (Pu(n)) {
          for (var ze in r)
            ((B = r[ze]),
              r.hasOwnProperty(ze) &&
                B !== void 0 &&
                !o.hasOwnProperty(ze) &&
                Ef(t, n, ze, void 0, o, B));
          for (Y in o)
            ((B = o[Y]),
              (q = r[Y]),
              !o.hasOwnProperty(Y) ||
                B === q ||
                (B === void 0 && q === void 0) ||
                Ef(t, n, Y, B, o, q));
          return;
        }
    }
    for (var _ in r)
      ((B = r[_]),
        r.hasOwnProperty(_) &&
          B != null &&
          !o.hasOwnProperty(_) &&
          Le(t, n, _, null, o, B));
    for (K in o)
      ((B = o[K]),
        (q = r[K]),
        !o.hasOwnProperty(K) ||
          B === q ||
          (B == null && q == null) ||
          Le(t, n, K, B, o, q));
  }
  function ev(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function jA() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var t = 0, n = 0, r = performance.getEntriesByType("resource"), o = 0;
        o < r.length;
        o++
      ) {
        var c = r[o],
          d = c.transferSize,
          v = c.initiatorType,
          w = c.duration;
        if (d && w && ev(v)) {
          for (v = 0, w = c.responseEnd, o += 1; o < r.length; o++) {
            var D = r[o],
              k = D.startTime;
            if (k > w) break;
            var Y = D.transferSize,
              K = D.initiatorType;
            Y &&
              ev(K) &&
              ((D = D.responseEnd), (v += Y * (D < w ? 1 : (w - k) / (D - k))));
          }
          if ((--o, (n += (8 * (d + v)) / (c.duration / 1e3)), t++, 10 < t))
            break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection &&
      ((t = navigator.connection.downlink), typeof t == "number")
      ? t
      : 5;
  }
  var Tf = null,
    Af = null;
  function nl(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function tv(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function nv(t, n) {
    if (t === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && n === "foreignObject" ? 0 : t;
  }
  function Cf(t, n) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof n.children == "string" ||
      typeof n.children == "number" ||
      typeof n.children == "bigint" ||
      (typeof n.dangerouslySetInnerHTML == "object" &&
        n.dangerouslySetInnerHTML !== null &&
        n.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Rf = null;
  function _A() {
    var t = window.event;
    return t && t.type === "popstate"
      ? t === Rf
        ? !1
        : ((Rf = t), !0)
      : ((Rf = null), !1);
  }
  var iv = typeof setTimeout == "function" ? setTimeout : void 0,
    LA = typeof clearTimeout == "function" ? clearTimeout : void 0,
    av = typeof Promise == "function" ? Promise : void 0,
    zA =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof av < "u"
          ? function (t) {
              return av.resolve(null).then(t).catch(PA);
            }
          : iv;
  function PA(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function wi(t) {
    return t === "head";
  }
  function rv(t, n) {
    var r = n,
      o = 0;
    do {
      var c = r.nextSibling;
      if ((t.removeChild(r), c && c.nodeType === 8))
        if (((r = c.data), r === "/$" || r === "/&")) {
          if (o === 0) {
            (t.removeChild(c), Qa(n));
            return;
          }
          o--;
        } else if (
          r === "$" ||
          r === "$?" ||
          r === "$~" ||
          r === "$!" ||
          r === "&"
        )
          o++;
        else if (r === "html") us(t.ownerDocument.documentElement);
        else if (r === "head") {
          ((r = t.ownerDocument.head), us(r));
          for (var d = r.firstChild; d; ) {
            var v = d.nextSibling,
              w = d.nodeName;
            (d[Rr] ||
              w === "SCRIPT" ||
              w === "STYLE" ||
              (w === "LINK" && d.rel.toLowerCase() === "stylesheet") ||
              r.removeChild(d),
              (d = v));
          }
        } else r === "body" && us(t.ownerDocument.body);
      r = c;
    } while (r);
    Qa(n);
  }
  function sv(t, n) {
    var r = t;
    t = 0;
    do {
      var o = r.nextSibling;
      if (
        (r.nodeType === 1
          ? n
            ? ((r._stashedDisplay = r.style.display),
              (r.style.display = "none"))
            : ((r.style.display = r._stashedDisplay || ""),
              r.getAttribute("style") === "" && r.removeAttribute("style"))
          : r.nodeType === 3 &&
            (n
              ? ((r._stashedText = r.nodeValue), (r.nodeValue = ""))
              : (r.nodeValue = r._stashedText || "")),
        o && o.nodeType === 8)
      )
        if (((r = o.data), r === "/$")) {
          if (t === 0) break;
          t--;
        } else (r !== "$" && r !== "$?" && r !== "$~" && r !== "$!") || t++;
      r = o;
    } while (r);
  }
  function Df(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (((n = n.nextSibling), r.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (Df(r), ju(r));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (r.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(r);
    }
  }
  function VA(t, n, r, o) {
    for (; t.nodeType === 1; ) {
      var c = r;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (o) {
        if (!t[Rr])
          switch (n) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (
                ((d = t.getAttribute("rel")),
                d === "stylesheet" && t.hasAttribute("data-precedence"))
              )
                break;
              if (
                d !== c.rel ||
                t.getAttribute("href") !==
                  (c.href == null || c.href === "" ? null : c.href) ||
                t.getAttribute("crossorigin") !==
                  (c.crossOrigin == null ? null : c.crossOrigin) ||
                t.getAttribute("title") !== (c.title == null ? null : c.title)
              )
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (
                ((d = t.getAttribute("src")),
                (d !== (c.src == null ? null : c.src) ||
                  t.getAttribute("type") !== (c.type == null ? null : c.type) ||
                  t.getAttribute("crossorigin") !==
                    (c.crossOrigin == null ? null : c.crossOrigin)) &&
                  d &&
                  t.hasAttribute("async") &&
                  !t.hasAttribute("itemprop"))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (n === "input" && t.type === "hidden") {
        var d = c.name == null ? null : "" + c.name;
        if (c.type === "hidden" && t.getAttribute("name") === d) return t;
      } else return t;
      if (((t = Wt(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function kA(t, n, r) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !r) ||
        ((t = Wt(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function ov(t, n) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !n) ||
        ((t = Wt(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Mf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Of(t) {
    return (
      t.data === "$!" ||
      (t.data === "$?" && t.ownerDocument.readyState !== "loading")
    );
  }
  function BA(t, n) {
    var r = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = n;
    else if (t.data !== "$?" || r.readyState !== "loading") n();
    else {
      var o = function () {
        (n(), r.removeEventListener("DOMContentLoaded", o));
      };
      (r.addEventListener("DOMContentLoaded", o), (t._reactRetry = o));
    }
  }
  function Wt(t) {
    for (; t != null; t = t.nextSibling) {
      var n = t.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (
          ((n = t.data),
          n === "$" ||
            n === "$!" ||
            n === "$?" ||
            n === "$~" ||
            n === "&" ||
            n === "F!" ||
            n === "F")
        )
          break;
        if (n === "/$" || n === "/&") return null;
      }
    }
    return t;
  }
  var Nf = null;
  function lv(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var r = t.data;
        if (r === "/$" || r === "/&") {
          if (n === 0) return Wt(t.nextSibling);
          n--;
        } else
          (r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&") ||
            n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function uv(t) {
    t = t.previousSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var r = t.data;
        if (r === "$" || r === "$!" || r === "$?" || r === "$~" || r === "&") {
          if (n === 0) return t;
          n--;
        } else (r !== "/$" && r !== "/&") || n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function cv(t, n, r) {
    switch (((n = nl(r)), t)) {
      case "html":
        if (((t = n.documentElement), !t)) throw Error(s(452));
        return t;
      case "head":
        if (((t = n.head), !t)) throw Error(s(453));
        return t;
      case "body":
        if (((t = n.body), !t)) throw Error(s(454));
        return t;
      default:
        throw Error(s(451));
    }
  }
  function us(t) {
    for (var n = t.attributes; n.length; ) t.removeAttributeNode(n[0]);
    ju(t);
  }
  var Jt = new Map(),
    fv = new Set();
  function il(t) {
    return typeof t.getRootNode == "function"
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var $n = G.d;
  G.d = { f: UA, r: HA, D: qA, C: FA, L: GA, m: YA, X: XA, S: IA, M: KA };
  function UA() {
    var t = $n.f(),
      n = Ko();
    return t || n;
  }
  function HA(t) {
    var n = pa(t);
    n !== null && n.tag === 5 && n.type === "form" ? Dg(n) : $n.r(t);
  }
  var Xa = typeof document > "u" ? null : document;
  function dv(t, n, r) {
    var o = Xa;
    if (o && typeof n == "string" && n) {
      var c = Yt(n);
      ((c = 'link[rel="' + t + '"][href="' + c + '"]'),
        typeof r == "string" && (c += '[crossorigin="' + r + '"]'),
        fv.has(c) ||
          (fv.add(c),
          (t = { rel: t, crossOrigin: r, href: n }),
          o.querySelector(c) === null &&
            ((n = o.createElement("link")),
            dt(n, "link", t),
            at(n),
            o.head.appendChild(n))));
    }
  }
  function qA(t) {
    ($n.D(t), dv("dns-prefetch", t, null));
  }
  function FA(t, n) {
    ($n.C(t, n), dv("preconnect", t, n));
  }
  function GA(t, n, r) {
    $n.L(t, n, r);
    var o = Xa;
    if (o && t && n) {
      var c = 'link[rel="preload"][as="' + Yt(n) + '"]';
      n === "image" && r && r.imageSrcSet
        ? ((c += '[imagesrcset="' + Yt(r.imageSrcSet) + '"]'),
          typeof r.imageSizes == "string" &&
            (c += '[imagesizes="' + Yt(r.imageSizes) + '"]'))
        : (c += '[href="' + Yt(t) + '"]');
      var d = c;
      switch (n) {
        case "style":
          d = Ka(t);
          break;
        case "script":
          d = $a(t);
      }
      Jt.has(d) ||
        ((t = y(
          {
            rel: "preload",
            href: n === "image" && r && r.imageSrcSet ? void 0 : t,
            as: n,
          },
          r,
        )),
        Jt.set(d, t),
        o.querySelector(c) !== null ||
          (n === "style" && o.querySelector(cs(d))) ||
          (n === "script" && o.querySelector(fs(d))) ||
          ((n = o.createElement("link")),
          dt(n, "link", t),
          at(n),
          o.head.appendChild(n)));
    }
  }
  function YA(t, n) {
    $n.m(t, n);
    var r = Xa;
    if (r && t) {
      var o = n && typeof n.as == "string" ? n.as : "script",
        c =
          'link[rel="modulepreload"][as="' + Yt(o) + '"][href="' + Yt(t) + '"]',
        d = c;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = $a(t);
      }
      if (
        !Jt.has(d) &&
        ((t = y({ rel: "modulepreload", href: t }, n)),
        Jt.set(d, t),
        r.querySelector(c) === null)
      ) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(fs(d))) return;
        }
        ((o = r.createElement("link")),
          dt(o, "link", t),
          at(o),
          r.head.appendChild(o));
      }
    }
  }
  function IA(t, n, r) {
    $n.S(t, n, r);
    var o = Xa;
    if (o && t) {
      var c = ga(o).hoistableStyles,
        d = Ka(t);
      n = n || "default";
      var v = c.get(d);
      if (!v) {
        var w = { loading: 0, preload: null };
        if ((v = o.querySelector(cs(d)))) w.loading = 5;
        else {
          ((t = y({ rel: "stylesheet", href: t, "data-precedence": n }, r)),
            (r = Jt.get(d)) && jf(t, r));
          var D = (v = o.createElement("link"));
          (at(D),
            dt(D, "link", t),
            (D._p = new Promise(function (k, Y) {
              ((D.onload = k), (D.onerror = Y));
            })),
            D.addEventListener("load", function () {
              w.loading |= 1;
            }),
            D.addEventListener("error", function () {
              w.loading |= 2;
            }),
            (w.loading |= 4),
            al(v, n, o));
        }
        ((v = { type: "stylesheet", instance: v, count: 1, state: w }),
          c.set(d, v));
      }
    }
  }
  function XA(t, n) {
    $n.X(t, n);
    var r = Xa;
    if (r && t) {
      var o = ga(r).hoistableScripts,
        c = $a(t),
        d = o.get(c);
      d ||
        ((d = r.querySelector(fs(c))),
        d ||
          ((t = y({ src: t, async: !0 }, n)),
          (n = Jt.get(c)) && _f(t, n),
          (d = r.createElement("script")),
          at(d),
          dt(d, "link", t),
          r.head.appendChild(d)),
        (d = { type: "script", instance: d, count: 1, state: null }),
        o.set(c, d));
    }
  }
  function KA(t, n) {
    $n.M(t, n);
    var r = Xa;
    if (r && t) {
      var o = ga(r).hoistableScripts,
        c = $a(t),
        d = o.get(c);
      d ||
        ((d = r.querySelector(fs(c))),
        d ||
          ((t = y({ src: t, async: !0, type: "module" }, n)),
          (n = Jt.get(c)) && _f(t, n),
          (d = r.createElement("script")),
          at(d),
          dt(d, "link", t),
          r.head.appendChild(d)),
        (d = { type: "script", instance: d, count: 1, state: null }),
        o.set(c, d));
    }
  }
  function hv(t, n, r, o) {
    var c = (c = ye.current) ? il(c) : null;
    if (!c) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string"
          ? ((n = Ka(r.href)),
            (r = ga(c).hoistableStyles),
            (o = r.get(n)),
            o ||
              ((o = { type: "style", instance: null, count: 0, state: null }),
              r.set(n, o)),
            o)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          r.rel === "stylesheet" &&
          typeof r.href == "string" &&
          typeof r.precedence == "string"
        ) {
          t = Ka(r.href);
          var d = ga(c).hoistableStyles,
            v = d.get(t);
          if (
            (v ||
              ((c = c.ownerDocument || c),
              (v = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              d.set(t, v),
              (d = c.querySelector(cs(t))) &&
                !d._p &&
                ((v.instance = d), (v.state.loading = 5)),
              Jt.has(t) ||
                ((r = {
                  rel: "preload",
                  as: "style",
                  href: r.href,
                  crossOrigin: r.crossOrigin,
                  integrity: r.integrity,
                  media: r.media,
                  hrefLang: r.hrefLang,
                  referrerPolicy: r.referrerPolicy,
                }),
                Jt.set(t, r),
                d || $A(c, t, r, v.state))),
            n && o === null)
          )
            throw Error(s(528, ""));
          return v;
        }
        if (n && o !== null) throw Error(s(529, ""));
        return null;
      case "script":
        return (
          (n = r.async),
          (r = r.src),
          typeof r == "string" &&
          n &&
          typeof n != "function" &&
          typeof n != "symbol"
            ? ((n = $a(r)),
              (r = ga(c).hoistableScripts),
              (o = r.get(n)),
              o ||
                ((o = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                r.set(n, o)),
              o)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(s(444, t));
    }
  }
  function Ka(t) {
    return 'href="' + Yt(t) + '"';
  }
  function cs(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function mv(t) {
    return y({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function $A(t, n, r, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]")
      ? (o.loading = 1)
      : ((n = t.createElement("link")),
        (o.preload = n),
        n.addEventListener("load", function () {
          return (o.loading |= 1);
        }),
        n.addEventListener("error", function () {
          return (o.loading |= 2);
        }),
        dt(n, "link", r),
        at(n),
        t.head.appendChild(n));
  }
  function $a(t) {
    return '[src="' + Yt(t) + '"]';
  }
  function fs(t) {
    return "script[async]" + t;
  }
  function pv(t, n, r) {
    if ((n.count++, n.instance === null))
      switch (n.type) {
        case "style":
          var o = t.querySelector('style[data-href~="' + Yt(r.href) + '"]');
          if (o) return ((n.instance = o), at(o), o);
          var c = y({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null,
          });
          return (
            (o = (t.ownerDocument || t).createElement("style")),
            at(o),
            dt(o, "style", c),
            al(o, r.precedence, t),
            (n.instance = o)
          );
        case "stylesheet":
          c = Ka(r.href);
          var d = t.querySelector(cs(c));
          if (d) return ((n.state.loading |= 4), (n.instance = d), at(d), d);
          ((o = mv(r)),
            (c = Jt.get(c)) && jf(o, c),
            (d = (t.ownerDocument || t).createElement("link")),
            at(d));
          var v = d;
          return (
            (v._p = new Promise(function (w, D) {
              ((v.onload = w), (v.onerror = D));
            })),
            dt(d, "link", o),
            (n.state.loading |= 4),
            al(d, r.precedence, t),
            (n.instance = d)
          );
        case "script":
          return (
            (d = $a(r.src)),
            (c = t.querySelector(fs(d)))
              ? ((n.instance = c), at(c), c)
              : ((o = r),
                (c = Jt.get(d)) && ((o = y({}, r)), _f(o, c)),
                (t = t.ownerDocument || t),
                (c = t.createElement("script")),
                at(c),
                dt(c, "link", o),
                t.head.appendChild(c),
                (n.instance = c))
          );
        case "void":
          return null;
        default:
          throw Error(s(443, n.type));
      }
    else
      n.type === "stylesheet" &&
        (n.state.loading & 4) === 0 &&
        ((o = n.instance), (n.state.loading |= 4), al(o, r.precedence, t));
    return n.instance;
  }
  function al(t, n, r) {
    for (
      var o = r.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        c = o.length ? o[o.length - 1] : null,
        d = c,
        v = 0;
      v < o.length;
      v++
    ) {
      var w = o[v];
      if (w.dataset.precedence === n) d = w;
      else if (d !== c) break;
    }
    d
      ? d.parentNode.insertBefore(t, d.nextSibling)
      : ((n = r.nodeType === 9 ? r.head : r), n.insertBefore(t, n.firstChild));
  }
  function jf(t, n) {
    (t.crossOrigin == null && (t.crossOrigin = n.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy),
      t.title == null && (t.title = n.title));
  }
  function _f(t, n) {
    (t.crossOrigin == null && (t.crossOrigin = n.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy),
      t.integrity == null && (t.integrity = n.integrity));
  }
  var rl = null;
  function gv(t, n, r) {
    if (rl === null) {
      var o = new Map(),
        c = (rl = new Map());
      c.set(r, o);
    } else ((c = rl), (o = c.get(r)), o || ((o = new Map()), c.set(r, o)));
    if (o.has(t)) return o;
    for (
      o.set(t, null), r = r.getElementsByTagName(t), c = 0;
      c < r.length;
      c++
    ) {
      var d = r[c];
      if (
        !(
          d[Rr] ||
          d[lt] ||
          (t === "link" && d.getAttribute("rel") === "stylesheet")
        ) &&
        d.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var v = d.getAttribute(n) || "";
        v = t + v;
        var w = o.get(v);
        w ? w.push(d) : o.set(v, [d]);
      }
    }
    return o;
  }
  function yv(t, n, r) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(
        r,
        n === "title" ? t.querySelector("head > title") : null,
      ));
  }
  function QA(t, n, r) {
    if (r === 1 || n.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof n.precedence != "string" ||
          typeof n.href != "string" ||
          n.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof n.rel != "string" ||
          typeof n.href != "string" ||
          n.href === "" ||
          n.onLoad ||
          n.onError
        )
          break;
        switch (n.rel) {
          case "stylesheet":
            return (
              (t = n.disabled),
              typeof n.precedence == "string" && t == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          n.async &&
          typeof n.async != "function" &&
          typeof n.async != "symbol" &&
          !n.onLoad &&
          !n.onError &&
          n.src &&
          typeof n.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function vv(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function ZA(t, n, r, o) {
    if (
      r.type === "stylesheet" &&
      (typeof o.media != "string" || matchMedia(o.media).matches !== !1) &&
      (r.state.loading & 4) === 0
    ) {
      if (r.instance === null) {
        var c = Ka(o.href),
          d = n.querySelector(cs(c));
        if (d) {
          ((n = d._p),
            n !== null &&
              typeof n == "object" &&
              typeof n.then == "function" &&
              (t.count++, (t = sl.bind(t)), n.then(t, t)),
            (r.state.loading |= 4),
            (r.instance = d),
            at(d));
          return;
        }
        ((d = n.ownerDocument || n),
          (o = mv(o)),
          (c = Jt.get(c)) && jf(o, c),
          (d = d.createElement("link")),
          at(d));
        var v = d;
        ((v._p = new Promise(function (w, D) {
          ((v.onload = w), (v.onerror = D));
        })),
          dt(d, "link", o),
          (r.instance = d));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(r, n),
        (n = r.state.preload) &&
          (r.state.loading & 3) === 0 &&
          (t.count++,
          (r = sl.bind(t)),
          n.addEventListener("load", r),
          n.addEventListener("error", r)));
    }
  }
  var Lf = 0;
  function WA(t, n) {
    return (
      t.stylesheets && t.count === 0 && ll(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (r) {
            var o = setTimeout(function () {
              if ((t.stylesheets && ll(t, t.stylesheets), t.unsuspend)) {
                var d = t.unsuspend;
                ((t.unsuspend = null), d());
              }
            }, 6e4 + n);
            0 < t.imgBytes && Lf === 0 && (Lf = 62500 * jA());
            var c = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 &&
                    (t.stylesheets && ll(t, t.stylesheets), t.unsuspend))
                ) {
                  var d = t.unsuspend;
                  ((t.unsuspend = null), d());
                }
              },
              (t.imgBytes > Lf ? 50 : 800) + n,
            );
            return (
              (t.unsuspend = r),
              function () {
                ((t.unsuspend = null), clearTimeout(o), clearTimeout(c));
              }
            );
          }
        : null
    );
  }
  function sl() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) ll(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var ol = null;
  function ll(t, n) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++,
        (ol = new Map()),
        n.forEach(JA, t),
        (ol = null),
        sl.call(t)));
  }
  function JA(t, n) {
    if (!(n.state.loading & 4)) {
      var r = ol.get(t);
      if (r) var o = r.get(null);
      else {
        ((r = new Map()), ol.set(t, r));
        for (
          var c = t.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            d = 0;
          d < c.length;
          d++
        ) {
          var v = c[d];
          (v.nodeName === "LINK" || v.getAttribute("media") !== "not all") &&
            (r.set(v.dataset.precedence, v), (o = v));
        }
        o && r.set(null, o);
      }
      ((c = n.instance),
        (v = c.getAttribute("data-precedence")),
        (d = r.get(v) || o),
        d === o && r.set(null, c),
        r.set(v, c),
        this.count++,
        (o = sl.bind(this)),
        c.addEventListener("load", o),
        c.addEventListener("error", o),
        d
          ? d.parentNode.insertBefore(c, d.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t),
            t.insertBefore(c, t.firstChild)),
        (n.state.loading |= 4));
    }
  }
  var ds = {
    $$typeof: O,
    Provider: null,
    Consumer: null,
    _currentValue: U,
    _currentValue2: U,
    _threadCount: 0,
  };
  function eC(t, n, r, o, c, d, v, w, D) {
    ((this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Du(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Du(0)),
      (this.hiddenUpdates = Du(null)),
      (this.identifierPrefix = o),
      (this.onUncaughtError = c),
      (this.onCaughtError = d),
      (this.onRecoverableError = v),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = D),
      (this.incompleteTransitions = new Map()));
  }
  function bv(t, n, r, o, c, d, v, w, D, k, Y, K) {
    return (
      (t = new eC(t, n, r, v, D, k, Y, K, w)),
      (n = 1),
      d === !0 && (n |= 24),
      (d = Lt(3, null, null, n)),
      (t.current = d),
      (d.stateNode = t),
      (n = dc()),
      n.refCount++,
      (t.pooledCache = n),
      n.refCount++,
      (d.memoizedState = { element: o, isDehydrated: r, cache: n }),
      gc(d),
      t
    );
  }
  function xv(t) {
    return t ? ((t = Ca), t) : Ca;
  }
  function Sv(t, n, r, o, c, d) {
    ((c = xv(c)),
      o.context === null ? (o.context = c) : (o.pendingContext = c),
      (o = fi(n)),
      (o.payload = { element: r }),
      (d = d === void 0 ? null : d),
      d !== null && (o.callback = d),
      (r = di(t, o, n)),
      r !== null && (At(r, t, n), Gr(r, t, n)));
  }
  function wv(t, n) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var r = t.retryLane;
      t.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function zf(t, n) {
    (wv(t, n), (t = t.alternate) && wv(t, n));
  }
  function Ev(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Fi(t, 67108864);
      (n !== null && At(n, t, 67108864), zf(t, 67108864));
    }
  }
  function Tv(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Bt();
      n = Mu(n);
      var r = Fi(t, n);
      (r !== null && At(r, t, n), zf(t, n));
    }
  }
  var ul = !0;
  function tC(t, n, r, o) {
    var c = z.T;
    z.T = null;
    var d = G.p;
    try {
      ((G.p = 2), Pf(t, n, r, o));
    } finally {
      ((G.p = d), (z.T = c));
    }
  }
  function nC(t, n, r, o) {
    var c = z.T;
    z.T = null;
    var d = G.p;
    try {
      ((G.p = 8), Pf(t, n, r, o));
    } finally {
      ((G.p = d), (z.T = c));
    }
  }
  function Pf(t, n, r, o) {
    if (ul) {
      var c = Vf(o);
      if (c === null) (wf(t, n, o, cl, r), Cv(t, o));
      else if (aC(c, t, n, r, o)) o.stopPropagation();
      else if ((Cv(t, o), n & 4 && -1 < iC.indexOf(t))) {
        for (; c !== null; ) {
          var d = pa(c);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
                  var v = ki(d.pendingLanes);
                  if (v !== 0) {
                    var w = d;
                    for (w.pendingLanes |= 2, w.entangledLanes |= 2; v; ) {
                      var D = 1 << (31 - jt(v));
                      ((w.entanglements[1] |= D), (v &= ~D));
                    }
                    (xn(d), (Me & 6) === 0 && ((Io = Ot() + 500), ss(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((w = Fi(d, 2)), w !== null && At(w, d, 2), Ko(), zf(d, 2));
            }
          if (((d = Vf(o)), d === null && wf(t, n, o, cl, r), d === c)) break;
          c = d;
        }
        c !== null && o.stopPropagation();
      } else wf(t, n, o, null, r);
    }
  }
  function Vf(t) {
    return ((t = ku(t)), kf(t));
  }
  var cl = null;
  function kf(t) {
    if (((cl = null), (t = ma(t)), t !== null)) {
      var n = u(t);
      if (n === null) t = null;
      else {
        var r = n.tag;
        if (r === 13) {
          if (((t = f(n)), t !== null)) return t;
          t = null;
        } else if (r === 31) {
          if (((t = h(n)), t !== null)) return t;
          t = null;
        } else if (r === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          t = null;
        } else n !== t && (t = null);
      }
    }
    return ((cl = t), null);
  }
  function Av(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (qE()) {
          case _m:
            return 2;
          case Lm:
            return 8;
          case Ws:
          case FE:
            return 32;
          case zm:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Bf = !1,
    Ei = null,
    Ti = null,
    Ai = null,
    hs = new Map(),
    ms = new Map(),
    Ci = [],
    iC =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function Cv(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        Ei = null;
        break;
      case "dragenter":
      case "dragleave":
        Ti = null;
        break;
      case "mouseover":
      case "mouseout":
        Ai = null;
        break;
      case "pointerover":
      case "pointerout":
        hs.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ms.delete(n.pointerId);
    }
  }
  function ps(t, n, r, o, c, d) {
    return t === null || t.nativeEvent !== d
      ? ((t = {
          blockedOn: n,
          domEventName: r,
          eventSystemFlags: o,
          nativeEvent: d,
          targetContainers: [c],
        }),
        n !== null && ((n = pa(n)), n !== null && Ev(n)),
        t)
      : ((t.eventSystemFlags |= o),
        (n = t.targetContainers),
        c !== null && n.indexOf(c) === -1 && n.push(c),
        t);
  }
  function aC(t, n, r, o, c) {
    switch (n) {
      case "focusin":
        return ((Ei = ps(Ei, t, n, r, o, c)), !0);
      case "dragenter":
        return ((Ti = ps(Ti, t, n, r, o, c)), !0);
      case "mouseover":
        return ((Ai = ps(Ai, t, n, r, o, c)), !0);
      case "pointerover":
        var d = c.pointerId;
        return (hs.set(d, ps(hs.get(d) || null, t, n, r, o, c)), !0);
      case "gotpointercapture":
        return (
          (d = c.pointerId),
          ms.set(d, ps(ms.get(d) || null, t, n, r, o, c)),
          !0
        );
    }
    return !1;
  }
  function Rv(t) {
    var n = ma(t.target);
    if (n !== null) {
      var r = u(n);
      if (r !== null) {
        if (((n = r.tag), n === 13)) {
          if (((n = f(r)), n !== null)) {
            ((t.blockedOn = n),
              Hm(t.priority, function () {
                Tv(r);
              }));
            return;
          }
        } else if (n === 31) {
          if (((n = h(r)), n !== null)) {
            ((t.blockedOn = n),
              Hm(t.priority, function () {
                Tv(r);
              }));
            return;
          }
        } else if (n === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function fl(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var r = Vf(t.nativeEvent);
      if (r === null) {
        r = t.nativeEvent;
        var o = new r.constructor(r.type, r);
        ((Vu = o), r.target.dispatchEvent(o), (Vu = null));
      } else return ((n = pa(r)), n !== null && Ev(n), (t.blockedOn = r), !1);
      n.shift();
    }
    return !0;
  }
  function Dv(t, n, r) {
    fl(t) && r.delete(n);
  }
  function rC() {
    ((Bf = !1),
      Ei !== null && fl(Ei) && (Ei = null),
      Ti !== null && fl(Ti) && (Ti = null),
      Ai !== null && fl(Ai) && (Ai = null),
      hs.forEach(Dv),
      ms.forEach(Dv));
  }
  function dl(t, n) {
    t.blockedOn === n &&
      ((t.blockedOn = null),
      Bf ||
        ((Bf = !0),
        e.unstable_scheduleCallback(e.unstable_NormalPriority, rC)));
  }
  var hl = null;
  function Mv(t) {
    hl !== t &&
      ((hl = t),
      e.unstable_scheduleCallback(e.unstable_NormalPriority, function () {
        hl === t && (hl = null);
        for (var n = 0; n < t.length; n += 3) {
          var r = t[n],
            o = t[n + 1],
            c = t[n + 2];
          if (typeof o != "function") {
            if (kf(o || r) === null) continue;
            break;
          }
          var d = pa(r);
          d !== null &&
            (t.splice(n, 3),
            (n -= 3),
            Pc(d, { pending: !0, data: c, method: r.method, action: o }, o, c));
        }
      }));
  }
  function Qa(t) {
    function n(D) {
      return dl(D, t);
    }
    (Ei !== null && dl(Ei, t),
      Ti !== null && dl(Ti, t),
      Ai !== null && dl(Ai, t),
      hs.forEach(n),
      ms.forEach(n));
    for (var r = 0; r < Ci.length; r++) {
      var o = Ci[r];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < Ci.length && ((r = Ci[0]), r.blockedOn === null); )
      (Rv(r), r.blockedOn === null && Ci.shift());
    if (((r = (t.ownerDocument || t).$$reactFormReplay), r != null))
      for (o = 0; o < r.length; o += 3) {
        var c = r[o],
          d = r[o + 1],
          v = c[bt] || null;
        if (typeof d == "function") v || Mv(r);
        else if (v) {
          var w = null;
          if (d && d.hasAttribute("formAction")) {
            if (((c = d), (v = d[bt] || null))) w = v.formAction;
            else if (kf(c) !== null) continue;
          } else w = v.action;
          (typeof w == "function" ? (r[o + 1] = w) : (r.splice(o, 3), (o -= 3)),
            Mv(r));
        }
      }
  }
  function Ov() {
    function t(d) {
      d.canIntercept &&
        d.info === "react-transition" &&
        d.intercept({
          handler: function () {
            return new Promise(function (v) {
              return (c = v);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function n() {
      (c !== null && (c(), (c = null)), o || setTimeout(r, 20));
    }
    function r() {
      if (!o && !navigation.transition) {
        var d = navigation.currentEntry;
        d &&
          d.url != null &&
          navigation.navigate(d.url, {
            state: d.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var o = !1,
        c = null;
      return (
        navigation.addEventListener("navigate", t),
        navigation.addEventListener("navigatesuccess", n),
        navigation.addEventListener("navigateerror", n),
        setTimeout(r, 100),
        function () {
          ((o = !0),
            navigation.removeEventListener("navigate", t),
            navigation.removeEventListener("navigatesuccess", n),
            navigation.removeEventListener("navigateerror", n),
            c !== null && (c(), (c = null)));
        }
      );
    }
  }
  function Uf(t) {
    this._internalRoot = t;
  }
  ((ml.prototype.render = Uf.prototype.render =
    function (t) {
      var n = this._internalRoot;
      if (n === null) throw Error(s(409));
      var r = n.current,
        o = Bt();
      Sv(r, o, t, n, null, null);
    }),
    (ml.prototype.unmount = Uf.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var n = t.containerInfo;
          (Sv(t.current, 2, null, t, null, null), Ko(), (n[ha] = null));
        }
      }));
  function ml(t) {
    this._internalRoot = t;
  }
  ml.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var n = Um();
      t = { blockedOn: null, target: t, priority: n };
      for (var r = 0; r < Ci.length && n !== 0 && n < Ci[r].priority; r++);
      (Ci.splice(r, 0, t), r === 0 && Rv(t));
    }
  };
  var Nv = i.version;
  if (Nv !== "19.2.0") throw Error(s(527, Nv, "19.2.0"));
  G.findDOMNode = function (t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function"
        ? Error(s(188))
        : ((t = Object.keys(t).join(",")), Error(s(268, t)));
    return (
      (t = p(n)),
      (t = t !== null ? g(t) : null),
      (t = t === null ? null : t.stateNode),
      t
    );
  };
  var sC = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: z,
    reconcilerVersion: "19.2.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var pl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!pl.isDisabled && pl.supportsFiber)
      try {
        ((Tr = pl.inject(sC)), (Nt = pl));
      } catch {}
  }
  return (
    (ys.createRoot = function (t, n) {
      if (!l(t)) throw Error(s(299));
      var r = !1,
        o = "",
        c = kg,
        d = Bg,
        v = Ug;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (r = !0),
          n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (c = n.onUncaughtError),
          n.onCaughtError !== void 0 && (d = n.onCaughtError),
          n.onRecoverableError !== void 0 && (v = n.onRecoverableError)),
        (n = bv(t, 1, !1, null, null, r, o, null, c, d, v, Ov)),
        (t[ha] = n.current),
        Sf(t),
        new Uf(n)
      );
    }),
    (ys.hydrateRoot = function (t, n, r) {
      if (!l(t)) throw Error(s(299));
      var o = !1,
        c = "",
        d = kg,
        v = Bg,
        w = Ug,
        D = null;
      return (
        r != null &&
          (r.unstable_strictMode === !0 && (o = !0),
          r.identifierPrefix !== void 0 && (c = r.identifierPrefix),
          r.onUncaughtError !== void 0 && (d = r.onUncaughtError),
          r.onCaughtError !== void 0 && (v = r.onCaughtError),
          r.onRecoverableError !== void 0 && (w = r.onRecoverableError),
          r.formState !== void 0 && (D = r.formState)),
        (n = bv(t, 1, !0, n, r ?? null, o, c, D, d, v, w, Ov)),
        (n.context = xv(null)),
        (r = n.current),
        (o = Bt()),
        (o = Mu(o)),
        (c = fi(o)),
        (c.callback = null),
        di(r, c, o),
        (r = o),
        (n.current.lanes = r),
        Cr(n, r),
        xn(n),
        (t[ha] = n.current),
        Sf(t),
        new ml(n)
      );
    }),
    (ys.version = "19.2.0"),
    ys
  );
}
var Hv;
function gC() {
  if (Hv) return qf.exports;
  Hv = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (i) {
        console.error(i);
      }
  }
  return (e(), (qf.exports = pC()), qf.exports);
}
var yC = gC(),
  b = ru();
const Mi = ox(b),
  bh = lC({ __proto__: null, default: Mi }, [b]);
/**
 * react-router v7.11.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var qv = "popstate";
function vC(e = {}) {
  function i(l, u) {
    let {
      pathname: f = "/",
      search: h = "",
      hash: m = "",
    } = fa(l.location.hash.substring(1));
    return (
      !f.startsWith("/") && !f.startsWith(".") && (f = "/" + f),
      Ld(
        "",
        { pathname: f, search: h, hash: m },
        (u.state && u.state.usr) || null,
        (u.state && u.state.key) || "default",
      )
    );
  }
  function a(l, u) {
    let f = l.document.querySelector("base"),
      h = "";
    if (f && f.getAttribute("href")) {
      let m = l.location.href,
        p = m.indexOf("#");
      h = p === -1 ? m : m.slice(0, p);
    }
    return h + "#" + (typeof u == "string" ? u : Os(u));
  }
  function s(l, u) {
    an(
      l.pathname.charAt(0) === "/",
      `relative pathnames are not supported in hash history.push(${JSON.stringify(u)})`,
    );
  }
  return xC(i, a, s, e);
}
function qe(e, i) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(i);
}
function an(e, i) {
  if (!e) {
    typeof console < "u" && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function bC() {
  return Math.random().toString(36).substring(2, 10);
}
function Fv(e, i) {
  return { usr: e.state, key: e.key, idx: i };
}
function Ld(e, i, a = null, s) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...(typeof i == "string" ? fa(i) : i),
    state: a,
    key: (i && i.key) || s || bC(),
  };
}
function Os({ pathname: e = "/", search: i = "", hash: a = "" }) {
  return (
    i && i !== "?" && (e += i.charAt(0) === "?" ? i : "?" + i),
    a && a !== "#" && (e += a.charAt(0) === "#" ? a : "#" + a),
    e
  );
}
function fa(e) {
  let i = {};
  if (e) {
    let a = e.indexOf("#");
    a >= 0 && ((i.hash = e.substring(a)), (e = e.substring(0, a)));
    let s = e.indexOf("?");
    (s >= 0 && ((i.search = e.substring(s)), (e = e.substring(0, s))),
      e && (i.pathname = e));
  }
  return i;
}
function xC(e, i, a, s = {}) {
  let { window: l = document.defaultView, v5Compat: u = !1 } = s,
    f = l.history,
    h = "POP",
    m = null,
    p = g();
  p == null && ((p = 0), f.replaceState({ ...f.state, idx: p }, ""));
  function g() {
    return (f.state || { idx: null }).idx;
  }
  function y() {
    h = "POP";
    let A = g(),
      R = A == null ? null : A - p;
    ((p = A), m && m({ action: h, location: E.location, delta: R }));
  }
  function S(A, R) {
    h = "PUSH";
    let M = Ld(E.location, A, R);
    (a && a(M, A), (p = g() + 1));
    let O = Fv(M, p),
      V = E.createHref(M);
    try {
      f.pushState(O, "", V);
    } catch (L) {
      if (L instanceof DOMException && L.name === "DataCloneError") throw L;
      l.location.assign(V);
    }
    u && m && m({ action: h, location: E.location, delta: 1 });
  }
  function T(A, R) {
    h = "REPLACE";
    let M = Ld(E.location, A, R);
    (a && a(M, A), (p = g()));
    let O = Fv(M, p),
      V = E.createHref(M);
    (f.replaceState(O, "", V),
      u && m && m({ action: h, location: E.location, delta: 0 }));
  }
  function C(A) {
    return SC(A);
  }
  let E = {
    get action() {
      return h;
    },
    get location() {
      return e(l, f);
    },
    listen(A) {
      if (m) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(qv, y),
        (m = A),
        () => {
          (l.removeEventListener(qv, y), (m = null));
        }
      );
    },
    createHref(A) {
      return i(l, A);
    },
    createURL: C,
    encodeLocation(A) {
      let R = C(A);
      return { pathname: R.pathname, search: R.search, hash: R.hash };
    },
    push: S,
    replace: T,
    go(A) {
      return f.go(A);
    },
  };
  return E;
}
function SC(e, i = !1) {
  let a = "http://localhost";
  (typeof window < "u" &&
    (a =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    qe(a, "No window.location.(origin|href) available to create URL"));
  let s = typeof e == "string" ? e : Os(e);
  return (
    (s = s.replace(/ $/, "%20")),
    !i && s.startsWith("//") && (s = a + s),
    new URL(s, a)
  );
}
function ux(e, i, a = "/") {
  return wC(e, i, a, !1);
}
function wC(e, i, a, s) {
  let l = typeof i == "string" ? fa(i) : i,
    u = Wn(l.pathname || "/", a);
  if (u == null) return null;
  let f = cx(e);
  EC(f);
  let h = null;
  for (let m = 0; h == null && m < f.length; ++m) {
    let p = LC(u);
    h = jC(f[m], p, s);
  }
  return h;
}
function cx(e, i = [], a = [], s = "", l = !1) {
  let u = (f, h, m = l, p) => {
    let g = {
      relativePath: p === void 0 ? f.path || "" : p,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: h,
      route: f,
    };
    if (g.relativePath.startsWith("/")) {
      if (!g.relativePath.startsWith(s) && m) return;
      (qe(
        g.relativePath.startsWith(s),
        `Absolute route path "${g.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (g.relativePath = g.relativePath.slice(s.length)));
    }
    let y = Zn([s, g.relativePath]),
      S = a.concat(g);
    (f.children &&
      f.children.length > 0 &&
      (qe(
        f.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${y}".`,
      ),
      cx(f.children, i, S, y, m)),
      !(f.path == null && !f.index) &&
        i.push({ path: y, score: OC(y, f.index), routesMeta: S }));
  };
  return (
    e.forEach((f, h) => {
      if (f.path === "" || !f.path?.includes("?")) u(f, h);
      else for (let m of fx(f.path)) u(f, h, !0, m);
    }),
    i
  );
}
function fx(e) {
  let i = e.split("/");
  if (i.length === 0) return [];
  let [a, ...s] = i,
    l = a.endsWith("?"),
    u = a.replace(/\?$/, "");
  if (s.length === 0) return l ? [u, ""] : [u];
  let f = fx(s.join("/")),
    h = [];
  return (
    h.push(...f.map((m) => (m === "" ? u : [u, m].join("/")))),
    l && h.push(...f),
    h.map((m) => (e.startsWith("/") && m === "" ? "/" : m))
  );
}
function EC(e) {
  e.sort((i, a) =>
    i.score !== a.score
      ? a.score - i.score
      : NC(
          i.routesMeta.map((s) => s.childrenIndex),
          a.routesMeta.map((s) => s.childrenIndex),
        ),
  );
}
var TC = /^:[\w-]+$/,
  AC = 3,
  CC = 2,
  RC = 1,
  DC = 10,
  MC = -2,
  Gv = (e) => e === "*";
function OC(e, i) {
  let a = e.split("/"),
    s = a.length;
  return (
    a.some(Gv) && (s += MC),
    i && (s += CC),
    a
      .filter((l) => !Gv(l))
      .reduce((l, u) => l + (TC.test(u) ? AC : u === "" ? RC : DC), s)
  );
}
function NC(e, i) {
  return e.length === i.length && e.slice(0, -1).every((s, l) => s === i[l])
    ? e[e.length - 1] - i[i.length - 1]
    : 0;
}
function jC(e, i, a = !1) {
  let { routesMeta: s } = e,
    l = {},
    u = "/",
    f = [];
  for (let h = 0; h < s.length; ++h) {
    let m = s[h],
      p = h === s.length - 1,
      g = u === "/" ? i : i.slice(u.length) || "/",
      y = Xl(
        { path: m.relativePath, caseSensitive: m.caseSensitive, end: p },
        g,
      ),
      S = m.route;
    if (
      (!y &&
        p &&
        a &&
        !s[s.length - 1].route.index &&
        (y = Xl(
          { path: m.relativePath, caseSensitive: m.caseSensitive, end: !1 },
          g,
        )),
      !y)
    )
      return null;
    (Object.assign(l, y.params),
      f.push({
        params: l,
        pathname: Zn([u, y.pathname]),
        pathnameBase: kC(Zn([u, y.pathnameBase])),
        route: S,
      }),
      y.pathnameBase !== "/" && (u = Zn([u, y.pathnameBase])));
  }
  return f;
}
function Xl(e, i) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [a, s] = _C(e.path, e.caseSensitive, e.end),
    l = i.match(a);
  if (!l) return null;
  let u = l[0],
    f = u.replace(/(.)\/+$/, "$1"),
    h = l.slice(1);
  return {
    params: s.reduce((p, { paramName: g, isOptional: y }, S) => {
      if (g === "*") {
        let C = h[S] || "";
        f = u.slice(0, u.length - C.length).replace(/(.)\/+$/, "$1");
      }
      const T = h[S];
      return (
        y && !T ? (p[g] = void 0) : (p[g] = (T || "").replace(/%2F/g, "/")),
        p
      );
    }, {}),
    pathname: u,
    pathnameBase: f,
    pattern: e,
  };
}
function _C(e, i = !1, a = !0) {
  an(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`,
  );
  let s = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (f, h, m) => (
            s.push({ paramName: h, isOptional: m != null }),
            m ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        )
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    e.endsWith("*")
      ? (s.push({ paramName: "*" }),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : a
        ? (l += "\\/*$")
        : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, i ? void 0 : "i"), s]
  );
}
function LC(e) {
  try {
    return e
      .split("/")
      .map((i) => decodeURIComponent(i).replace(/\//g, "%2F"))
      .join("/");
  } catch (i) {
    return (
      an(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`,
      ),
      e
    );
  }
}
function Wn(e, i) {
  if (i === "/") return e;
  if (!e.toLowerCase().startsWith(i.toLowerCase())) return null;
  let a = i.endsWith("/") ? i.length - 1 : i.length,
    s = e.charAt(a);
  return s && s !== "/" ? null : e.slice(a) || "/";
}
var dx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  zC = (e) => dx.test(e);
function PC(e, i = "/") {
  let {
      pathname: a,
      search: s = "",
      hash: l = "",
    } = typeof e == "string" ? fa(e) : e,
    u;
  if (a)
    if (zC(a)) u = a;
    else {
      if (a.includes("//")) {
        let f = a;
        ((a = a.replace(/\/\/+/g, "/")),
          an(
            !1,
            `Pathnames cannot have embedded double slashes - normalizing ${f} -> ${a}`,
          ));
      }
      a.startsWith("/") ? (u = Yv(a.substring(1), "/")) : (u = Yv(a, i));
    }
  else u = i;
  return { pathname: u, search: BC(s), hash: UC(l) };
}
function Yv(e, i) {
  let a = i.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? a.length > 1 && a.pop() : l !== "." && a.push(l);
    }),
    a.length > 1 ? a.join("/") : "/"
  );
}
function Xf(e, i, a, s) {
  return `Cannot include a '${e}' character in a manually specified \`to.${i}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${a}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function VC(e) {
  return e.filter(
    (i, a) => a === 0 || (i.route.path && i.route.path.length > 0),
  );
}
function hx(e) {
  let i = VC(e);
  return i.map((a, s) => (s === i.length - 1 ? a.pathname : a.pathnameBase));
}
function mx(e, i, a, s = !1) {
  let l;
  typeof e == "string"
    ? (l = fa(e))
    : ((l = { ...e }),
      qe(
        !l.pathname || !l.pathname.includes("?"),
        Xf("?", "pathname", "search", l),
      ),
      qe(
        !l.pathname || !l.pathname.includes("#"),
        Xf("#", "pathname", "hash", l),
      ),
      qe(!l.search || !l.search.includes("#"), Xf("#", "search", "hash", l)));
  let u = e === "" || l.pathname === "",
    f = u ? "/" : l.pathname,
    h;
  if (f == null) h = a;
  else {
    let y = i.length - 1;
    if (!s && f.startsWith("..")) {
      let S = f.split("/");
      for (; S[0] === ".."; ) (S.shift(), (y -= 1));
      l.pathname = S.join("/");
    }
    h = y >= 0 ? i[y] : "/";
  }
  let m = PC(l, h),
    p = f && f !== "/" && f.endsWith("/"),
    g = (u || f === ".") && a.endsWith("/");
  return (!m.pathname.endsWith("/") && (p || g) && (m.pathname += "/"), m);
}
var Zn = (e) => e.join("/").replace(/\/\/+/g, "/"),
  kC = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  BC = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  UC = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e),
  HC = class {
    constructor(e, i, a, s = !1) {
      ((this.status = e),
        (this.statusText = i || ""),
        (this.internal = s),
        a instanceof Error
          ? ((this.data = a.toString()), (this.error = a))
          : (this.data = a));
    }
  };
function qC(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
function FC(e) {
  return (
    e
      .map((i) => i.route.path)
      .filter(Boolean)
      .join("/")
      .replace(/\/\/*/g, "/") || "/"
  );
}
var px =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function gx(e, i) {
  let a = e;
  if (typeof a != "string" || !dx.test(a))
    return { absoluteURL: void 0, isExternal: !1, to: a };
  let s = a,
    l = !1;
  if (px)
    try {
      let u = new URL(window.location.href),
        f = a.startsWith("//") ? new URL(u.protocol + a) : new URL(a),
        h = Wn(f.pathname, i);
      f.origin === u.origin && h != null
        ? (a = h + f.search + f.hash)
        : (l = !0);
    } catch {
      an(
        !1,
        `<Link to="${a}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  return { absoluteURL: s, isExternal: l, to: a };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var yx = ["POST", "PUT", "PATCH", "DELETE"];
new Set(yx);
var GC = ["GET", ...yx];
new Set(GC);
var pr = b.createContext(null);
pr.displayName = "DataRouter";
var su = b.createContext(null);
su.displayName = "DataRouterState";
var YC = b.createContext(!1),
  vx = b.createContext({ isTransitioning: !1 });
vx.displayName = "ViewTransition";
var IC = b.createContext(new Map());
IC.displayName = "Fetchers";
var XC = b.createContext(null);
XC.displayName = "Await";
var sn = b.createContext(null);
sn.displayName = "Navigation";
var Hs = b.createContext(null);
Hs.displayName = "Location";
var ni = b.createContext({ outlet: null, matches: [], isDataRoute: !1 });
ni.displayName = "Route";
var xh = b.createContext(null);
xh.displayName = "RouteError";
var bx = "REACT_ROUTER_ERROR",
  KC = "REDIRECT",
  $C = "ROUTE_ERROR_RESPONSE";
function QC(e) {
  if (e.startsWith(`${bx}:${KC}:{`))
    try {
      let i = JSON.parse(e.slice(28));
      if (
        typeof i == "object" &&
        i &&
        typeof i.status == "number" &&
        typeof i.statusText == "string" &&
        typeof i.location == "string" &&
        typeof i.reloadDocument == "boolean" &&
        typeof i.replace == "boolean"
      )
        return i;
    } catch {}
}
function ZC(e) {
  if (e.startsWith(`${bx}:${$C}:{`))
    try {
      let i = JSON.parse(e.slice(40));
      if (
        typeof i == "object" &&
        i &&
        typeof i.status == "number" &&
        typeof i.statusText == "string"
      )
        return new HC(i.status, i.statusText, i.data);
    } catch {}
}
function WC(e, { relative: i } = {}) {
  qe(
    qs(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: a, navigator: s } = b.useContext(sn),
    { hash: l, pathname: u, search: f } = Fs(e, { relative: i }),
    h = u;
  return (
    a !== "/" && (h = u === "/" ? a : Zn([a, u])),
    s.createHref({ pathname: h, search: f, hash: l })
  );
}
function qs() {
  return b.useContext(Hs) != null;
}
function da() {
  return (
    qe(
      qs(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    b.useContext(Hs).location
  );
}
var xx =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Sx(e) {
  b.useContext(sn).static || b.useLayoutEffect(e);
}
function JC() {
  let { isDataRoute: e } = b.useContext(ni);
  return e ? d2() : e2();
}
function e2() {
  qe(
    qs(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let e = b.useContext(pr),
    { basename: i, navigator: a } = b.useContext(sn),
    { matches: s } = b.useContext(ni),
    { pathname: l } = da(),
    u = JSON.stringify(hx(s)),
    f = b.useRef(!1);
  return (
    Sx(() => {
      f.current = !0;
    }),
    b.useCallback(
      (m, p = {}) => {
        if ((an(f.current, xx), !f.current)) return;
        if (typeof m == "number") {
          a.go(m);
          return;
        }
        let g = mx(m, JSON.parse(u), l, p.relative === "path");
        (e == null &&
          i !== "/" &&
          (g.pathname = g.pathname === "/" ? i : Zn([i, g.pathname])),
          (p.replace ? a.replace : a.push)(g, p.state, p));
      },
      [i, a, u, l, e],
    )
  );
}
b.createContext(null);
function Fs(e, { relative: i } = {}) {
  let { matches: a } = b.useContext(ni),
    { pathname: s } = da(),
    l = JSON.stringify(hx(a));
  return b.useMemo(() => mx(e, JSON.parse(l), s, i === "path"), [e, l, s, i]);
}
function t2(e, i) {
  return wx(e, i);
}
function wx(e, i, a, s, l) {
  qe(
    qs(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: u } = b.useContext(sn),
    { matches: f } = b.useContext(ni),
    h = f[f.length - 1],
    m = h ? h.params : {},
    p = h ? h.pathname : "/",
    g = h ? h.pathnameBase : "/",
    y = h && h.route;
  {
    let M = (y && y.path) || "";
    Tx(
      p,
      !y || M.endsWith("*") || M.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${M}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${M}"> to <Route path="${M === "/" ? "*" : `${M}/*`}">.`,
    );
  }
  let S = da(),
    T;
  if (i) {
    let M = typeof i == "string" ? fa(i) : i;
    (qe(
      g === "/" || M.pathname?.startsWith(g),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${g}" but pathname "${M.pathname}" was given in the \`location\` prop.`,
    ),
      (T = M));
  } else T = S;
  let C = T.pathname || "/",
    E = C;
  if (g !== "/") {
    let M = g.replace(/^\//, "").split("/");
    E = "/" + C.replace(/^\//, "").split("/").slice(M.length).join("/");
  }
  let A = ux(e, { pathname: E });
  (an(
    y || A != null,
    `No routes matched location "${T.pathname}${T.search}${T.hash}" `,
  ),
    an(
      A == null ||
        A[A.length - 1].route.element !== void 0 ||
        A[A.length - 1].route.Component !== void 0 ||
        A[A.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${T.pathname}${T.search}${T.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ));
  let R = s2(
    A &&
      A.map((M) =>
        Object.assign({}, M, {
          params: Object.assign({}, m, M.params),
          pathname: Zn([
            g,
            u.encodeLocation
              ? u.encodeLocation(
                  M.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23"),
                ).pathname
              : M.pathname,
          ]),
          pathnameBase:
            M.pathnameBase === "/"
              ? g
              : Zn([
                  g,
                  u.encodeLocation
                    ? u.encodeLocation(
                        M.pathnameBase
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23"),
                      ).pathname
                    : M.pathnameBase,
                ]),
        }),
      ),
    f,
    a,
    s,
    l,
  );
  return i && R
    ? b.createElement(
        Hs.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...T,
            },
            navigationType: "POP",
          },
        },
        R,
      )
    : R;
}
function n2() {
  let e = f2(),
    i = qC(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    a = e instanceof Error ? e.stack : null,
    s = "rgba(200,200,200, 0.5)",
    l = { padding: "0.5rem", backgroundColor: s },
    u = { padding: "2px 4px", backgroundColor: s },
    f = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", e),
    (f = b.createElement(
      b.Fragment,
      null,
      b.createElement("p", null, "💿 Hey developer 👋"),
      b.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        b.createElement("code", { style: u }, "ErrorBoundary"),
        " or",
        " ",
        b.createElement("code", { style: u }, "errorElement"),
        " prop on your route.",
      ),
    )),
    b.createElement(
      b.Fragment,
      null,
      b.createElement("h2", null, "Unexpected Application Error!"),
      b.createElement("h3", { style: { fontStyle: "italic" } }, i),
      a ? b.createElement("pre", { style: l }, a) : null,
      f,
    )
  );
}
var i2 = b.createElement(n2, null),
  Ex = class extends b.Component {
    constructor(e) {
      (super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        }));
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, i) {
      return i.location !== e.location ||
        (i.revalidation !== "idle" && e.revalidation === "idle")
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error !== void 0 ? e.error : i.error,
            location: i.location,
            revalidation: e.revalidation || i.revalidation,
          };
    }
    componentDidCatch(e, i) {
      this.props.onError
        ? this.props.onError(e, i)
        : console.error(
            "React Router caught the following error during render",
            e,
          );
    }
    render() {
      let e = this.state.error;
      if (
        this.context &&
        typeof e == "object" &&
        e &&
        "digest" in e &&
        typeof e.digest == "string"
      ) {
        const a = ZC(e.digest);
        a && (e = a);
      }
      let i =
        e !== void 0
          ? b.createElement(
              ni.Provider,
              { value: this.props.routeContext },
              b.createElement(xh.Provider, {
                value: e,
                children: this.props.component,
              }),
            )
          : this.props.children;
      return this.context ? b.createElement(a2, { error: e }, i) : i;
    }
  };
Ex.contextType = YC;
var Kf = new WeakMap();
function a2({ children: e, error: i }) {
  let { basename: a } = b.useContext(sn);
  if (
    typeof i == "object" &&
    i &&
    "digest" in i &&
    typeof i.digest == "string"
  ) {
    let s = QC(i.digest);
    if (s) {
      let l = Kf.get(i);
      if (l) throw l;
      let u = gx(s.location, a);
      if (px && !Kf.get(i))
        if (u.isExternal || s.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const f = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(u.to, {
              replace: s.replace,
            }),
          );
          throw (Kf.set(i, f), f);
        }
      return b.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${u.absoluteURL || u.to}`,
      });
    }
  }
  return e;
}
function r2({ routeContext: e, match: i, children: a }) {
  let s = b.useContext(pr);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = i.route.id),
    b.createElement(ni.Provider, { value: e }, a)
  );
}
function s2(e, i = [], a = null, s = null, l = null) {
  if (e == null) {
    if (!a) return null;
    if (a.errors) e = a.matches;
    else if (i.length === 0 && !a.initialized && a.matches.length > 0)
      e = a.matches;
    else return null;
  }
  let u = e,
    f = a?.errors;
  if (f != null) {
    let g = u.findIndex((y) => y.route.id && f?.[y.route.id] !== void 0);
    (qe(
      g >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(f).join(",")}`,
    ),
      (u = u.slice(0, Math.min(u.length, g + 1))));
  }
  let h = !1,
    m = -1;
  if (a)
    for (let g = 0; g < u.length; g++) {
      let y = u[g];
      if (
        ((y.route.HydrateFallback || y.route.hydrateFallbackElement) && (m = g),
        y.route.id)
      ) {
        let { loaderData: S, errors: T } = a,
          C =
            y.route.loader &&
            !S.hasOwnProperty(y.route.id) &&
            (!T || T[y.route.id] === void 0);
        if (y.route.lazy || C) {
          ((h = !0), m >= 0 ? (u = u.slice(0, m + 1)) : (u = [u[0]]));
          break;
        }
      }
    }
  let p =
    a && s
      ? (g, y) => {
          s(g, {
            location: a.location,
            params: a.matches?.[0]?.params ?? {},
            unstable_pattern: FC(a.matches),
            errorInfo: y,
          });
        }
      : void 0;
  return u.reduceRight((g, y, S) => {
    let T,
      C = !1,
      E = null,
      A = null;
    a &&
      ((T = f && y.route.id ? f[y.route.id] : void 0),
      (E = y.route.errorElement || i2),
      h &&
        (m < 0 && S === 0
          ? (Tx(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (C = !0),
            (A = null))
          : m === S &&
            ((C = !0), (A = y.route.hydrateFallbackElement || null))));
    let R = i.concat(u.slice(0, S + 1)),
      M = () => {
        let O;
        return (
          T
            ? (O = E)
            : C
              ? (O = A)
              : y.route.Component
                ? (O = b.createElement(y.route.Component, null))
                : y.route.element
                  ? (O = y.route.element)
                  : (O = g),
          b.createElement(r2, {
            match: y,
            routeContext: { outlet: g, matches: R, isDataRoute: a != null },
            children: O,
          })
        );
      };
    return a && (y.route.ErrorBoundary || y.route.errorElement || S === 0)
      ? b.createElement(Ex, {
          location: a.location,
          revalidation: a.revalidation,
          component: E,
          error: T,
          children: M(),
          routeContext: { outlet: null, matches: R, isDataRoute: !0 },
          onError: p,
        })
      : M();
  }, null);
}
function Sh(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function o2(e) {
  let i = b.useContext(pr);
  return (qe(i, Sh(e)), i);
}
function l2(e) {
  let i = b.useContext(su);
  return (qe(i, Sh(e)), i);
}
function u2(e) {
  let i = b.useContext(ni);
  return (qe(i, Sh(e)), i);
}
function wh(e) {
  let i = u2(e),
    a = i.matches[i.matches.length - 1];
  return (
    qe(
      a.route.id,
      `${e} can only be used on routes that contain a unique "id"`,
    ),
    a.route.id
  );
}
function c2() {
  return wh("useRouteId");
}
function f2() {
  let e = b.useContext(xh),
    i = l2("useRouteError"),
    a = wh("useRouteError");
  return e !== void 0 ? e : i.errors?.[a];
}
function d2() {
  let { router: e } = o2("useNavigate"),
    i = wh("useNavigate"),
    a = b.useRef(!1);
  return (
    Sx(() => {
      a.current = !0;
    }),
    b.useCallback(
      async (l, u = {}) => {
        (an(a.current, xx),
          a.current &&
            (typeof l == "number"
              ? await e.navigate(l)
              : await e.navigate(l, { fromRouteId: i, ...u })));
      },
      [e, i],
    )
  );
}
var Iv = {};
function Tx(e, i, a) {
  !i && !Iv[e] && ((Iv[e] = !0), an(!1, a));
}
b.memo(h2);
function h2({ routes: e, future: i, state: a, onError: s }) {
  return wx(e, void 0, a, s, i);
}
function jl(e) {
  qe(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function m2({
  basename: e = "/",
  children: i = null,
  location: a,
  navigationType: s = "POP",
  navigator: l,
  static: u = !1,
  unstable_useTransitions: f,
}) {
  qe(
    !qs(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let h = e.replace(/^\/*/, "/"),
    m = b.useMemo(
      () => ({
        basename: h,
        navigator: l,
        static: u,
        unstable_useTransitions: f,
        future: {},
      }),
      [h, l, u, f],
    );
  typeof a == "string" && (a = fa(a));
  let {
      pathname: p = "/",
      search: g = "",
      hash: y = "",
      state: S = null,
      key: T = "default",
    } = a,
    C = b.useMemo(() => {
      let E = Wn(p, h);
      return E == null
        ? null
        : {
            location: { pathname: E, search: g, hash: y, state: S, key: T },
            navigationType: s,
          };
    }, [h, p, g, y, S, T, s]);
  return (
    an(
      C != null,
      `<Router basename="${h}"> is not able to match the URL "${p}${g}${y}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    C == null
      ? null
      : b.createElement(
          sn.Provider,
          { value: m },
          b.createElement(Hs.Provider, { children: i, value: C }),
        )
  );
}
function p2({ children: e, location: i }) {
  return t2(zd(e), i);
}
function zd(e, i = []) {
  let a = [];
  return (
    b.Children.forEach(e, (s, l) => {
      if (!b.isValidElement(s)) return;
      let u = [...i, l];
      if (s.type === b.Fragment) {
        a.push.apply(a, zd(s.props.children, u));
        return;
      }
      (qe(
        s.type === jl,
        `[${typeof s.type == "string" ? s.type : s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        qe(
          !s.props.index || !s.props.children,
          "An index route cannot have child routes.",
        ));
      let f = {
        id: s.props.id || u.join("-"),
        caseSensitive: s.props.caseSensitive,
        element: s.props.element,
        Component: s.props.Component,
        index: s.props.index,
        path: s.props.path,
        middleware: s.props.middleware,
        loader: s.props.loader,
        action: s.props.action,
        hydrateFallbackElement: s.props.hydrateFallbackElement,
        HydrateFallback: s.props.HydrateFallback,
        errorElement: s.props.errorElement,
        ErrorBoundary: s.props.ErrorBoundary,
        hasErrorBoundary:
          s.props.hasErrorBoundary === !0 ||
          s.props.ErrorBoundary != null ||
          s.props.errorElement != null,
        shouldRevalidate: s.props.shouldRevalidate,
        handle: s.props.handle,
        lazy: s.props.lazy,
      };
      (s.props.children && (f.children = zd(s.props.children, u)), a.push(f));
    }),
    a
  );
}
var _l = "get",
  Ll = "application/x-www-form-urlencoded";
function ou(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function g2(e) {
  return ou(e) && e.tagName.toLowerCase() === "button";
}
function y2(e) {
  return ou(e) && e.tagName.toLowerCase() === "form";
}
function v2(e) {
  return ou(e) && e.tagName.toLowerCase() === "input";
}
function b2(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function x2(e, i) {
  return e.button === 0 && (!i || i === "_self") && !b2(e);
}
var gl = null;
function S2() {
  if (gl === null)
    try {
      (new FormData(document.createElement("form"), 0), (gl = !1));
    } catch {
      gl = !0;
    }
  return gl;
}
var w2 = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function $f(e) {
  return e != null && !w2.has(e)
    ? (an(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ll}"`,
      ),
      null)
    : e;
}
function E2(e, i) {
  let a, s, l, u, f;
  if (y2(e)) {
    let h = e.getAttribute("action");
    ((s = h ? Wn(h, i) : null),
      (a = e.getAttribute("method") || _l),
      (l = $f(e.getAttribute("enctype")) || Ll),
      (u = new FormData(e)));
  } else if (g2(e) || (v2(e) && (e.type === "submit" || e.type === "image"))) {
    let h = e.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let m = e.getAttribute("formaction") || h.getAttribute("action");
    if (
      ((s = m ? Wn(m, i) : null),
      (a = e.getAttribute("formmethod") || h.getAttribute("method") || _l),
      (l =
        $f(e.getAttribute("formenctype")) ||
        $f(h.getAttribute("enctype")) ||
        Ll),
      (u = new FormData(h, e)),
      !S2())
    ) {
      let { name: p, type: g, value: y } = e;
      if (g === "image") {
        let S = p ? `${p}.` : "";
        (u.append(`${S}x`, "0"), u.append(`${S}y`, "0"));
      } else p && u.append(p, y);
    }
  } else {
    if (ou(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    ((a = _l), (s = null), (l = Ll), (f = e));
  }
  return (
    u && l === "text/plain" && ((f = u), (u = void 0)),
    { action: s, method: a.toLowerCase(), encType: l, formData: u, body: f }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Eh(e, i) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(i);
}
function T2(e, i, a) {
  let s =
    typeof e == "string"
      ? new URL(
          e,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : e;
  return (
    s.pathname === "/"
      ? (s.pathname = `_root.${a}`)
      : i && Wn(s.pathname, i) === "/"
        ? (s.pathname = `${i.replace(/\/$/, "")}/_root.${a}`)
        : (s.pathname = `${s.pathname.replace(/\/$/, "")}.${a}`),
    s
  );
}
async function A2(e, i) {
  if (e.id in i) return i[e.id];
  try {
    let a = await import(e.module);
    return ((i[e.id] = a), a);
  } catch (a) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`,
      ),
      console.error(a),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function C2(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === "preload" &&
        typeof e.imageSrcSet == "string" &&
        typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
}
async function R2(e, i, a) {
  let s = await Promise.all(
    e.map(async (l) => {
      let u = i.routes[l.route.id];
      if (u) {
        let f = await A2(u, a);
        return f.links ? f.links() : [];
      }
      return [];
    }),
  );
  return N2(
    s
      .flat(1)
      .filter(C2)
      .filter((l) => l.rel === "stylesheet" || l.rel === "preload")
      .map((l) =>
        l.rel === "stylesheet"
          ? { ...l, rel: "prefetch", as: "style" }
          : { ...l, rel: "prefetch" },
      ),
  );
}
function Xv(e, i, a, s, l, u) {
  let f = (m, p) => (a[p] ? m.route.id !== a[p].route.id : !0),
    h = (m, p) =>
      a[p].pathname !== m.pathname ||
      (a[p].route.path?.endsWith("*") && a[p].params["*"] !== m.params["*"]);
  return u === "assets"
    ? i.filter((m, p) => f(m, p) || h(m, p))
    : u === "data"
      ? i.filter((m, p) => {
          let g = s.routes[m.route.id];
          if (!g || !g.hasLoader) return !1;
          if (f(m, p) || h(m, p)) return !0;
          if (m.route.shouldRevalidate) {
            let y = m.route.shouldRevalidate({
              currentUrl: new URL(
                l.pathname + l.search + l.hash,
                window.origin,
              ),
              currentParams: a[0]?.params || {},
              nextUrl: new URL(e, window.origin),
              nextParams: m.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof y == "boolean") return y;
          }
          return !0;
        })
      : [];
}
function D2(e, i, { includeHydrateFallback: a } = {}) {
  return M2(
    e
      .map((s) => {
        let l = i.routes[s.route.id];
        if (!l) return [];
        let u = [l.module];
        return (
          l.clientActionModule && (u = u.concat(l.clientActionModule)),
          l.clientLoaderModule && (u = u.concat(l.clientLoaderModule)),
          a &&
            l.hydrateFallbackModule &&
            (u = u.concat(l.hydrateFallbackModule)),
          l.imports && (u = u.concat(l.imports)),
          u
        );
      })
      .flat(1),
  );
}
function M2(e) {
  return [...new Set(e)];
}
function O2(e) {
  let i = {},
    a = Object.keys(e).sort();
  for (let s of a) i[s] = e[s];
  return i;
}
function N2(e, i) {
  let a = new Set();
  return (
    new Set(i),
    e.reduce((s, l) => {
      let u = JSON.stringify(O2(l));
      return (a.has(u) || (a.add(u), s.push({ key: u, link: l })), s);
    }, [])
  );
}
function Ax() {
  let e = b.useContext(pr);
  return (
    Eh(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    e
  );
}
function j2() {
  let e = b.useContext(su);
  return (
    Eh(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    e
  );
}
var Th = b.createContext(void 0);
Th.displayName = "FrameworkContext";
function Cx() {
  let e = b.useContext(Th);
  return (
    Eh(e, "You must render this element inside a <HydratedRouter> element"),
    e
  );
}
function _2(e, i) {
  let a = b.useContext(Th),
    [s, l] = b.useState(!1),
    [u, f] = b.useState(!1),
    {
      onFocus: h,
      onBlur: m,
      onMouseEnter: p,
      onMouseLeave: g,
      onTouchStart: y,
    } = i,
    S = b.useRef(null);
  (b.useEffect(() => {
    if ((e === "render" && f(!0), e === "viewport")) {
      let E = (R) => {
          R.forEach((M) => {
            f(M.isIntersecting);
          });
        },
        A = new IntersectionObserver(E, { threshold: 0.5 });
      return (
        S.current && A.observe(S.current),
        () => {
          A.disconnect();
        }
      );
    }
  }, [e]),
    b.useEffect(() => {
      if (s) {
        let E = setTimeout(() => {
          f(!0);
        }, 100);
        return () => {
          clearTimeout(E);
        };
      }
    }, [s]));
  let T = () => {
      l(!0);
    },
    C = () => {
      (l(!1), f(!1));
    };
  return a
    ? e !== "intent"
      ? [u, S, {}]
      : [
          u,
          S,
          {
            onFocus: vs(h, T),
            onBlur: vs(m, C),
            onMouseEnter: vs(p, T),
            onMouseLeave: vs(g, C),
            onTouchStart: vs(y, T),
          },
        ]
    : [!1, S, {}];
}
function vs(e, i) {
  return (a) => {
    (e && e(a), a.defaultPrevented || i(a));
  };
}
function L2({ page: e, ...i }) {
  let { router: a } = Ax(),
    s = b.useMemo(() => ux(a.routes, e, a.basename), [a.routes, e, a.basename]);
  return s ? b.createElement(P2, { page: e, matches: s, ...i }) : null;
}
function z2(e) {
  let { manifest: i, routeModules: a } = Cx(),
    [s, l] = b.useState([]);
  return (
    b.useEffect(() => {
      let u = !1;
      return (
        R2(e, i, a).then((f) => {
          u || l(f);
        }),
        () => {
          u = !0;
        }
      );
    }, [e, i, a]),
    s
  );
}
function P2({ page: e, matches: i, ...a }) {
  let s = da(),
    { manifest: l, routeModules: u } = Cx(),
    { basename: f } = Ax(),
    { loaderData: h, matches: m } = j2(),
    p = b.useMemo(() => Xv(e, i, m, l, s, "data"), [e, i, m, l, s]),
    g = b.useMemo(() => Xv(e, i, m, l, s, "assets"), [e, i, m, l, s]),
    y = b.useMemo(() => {
      if (e === s.pathname + s.search + s.hash) return [];
      let C = new Set(),
        E = !1;
      if (
        (i.forEach((R) => {
          let M = l.routes[R.route.id];
          !M ||
            !M.hasLoader ||
            ((!p.some((O) => O.route.id === R.route.id) &&
              R.route.id in h &&
              u[R.route.id]?.shouldRevalidate) ||
            M.hasClientLoader
              ? (E = !0)
              : C.add(R.route.id));
        }),
        C.size === 0)
      )
        return [];
      let A = T2(e, f, "data");
      return (
        E &&
          C.size > 0 &&
          A.searchParams.set(
            "_routes",
            i
              .filter((R) => C.has(R.route.id))
              .map((R) => R.route.id)
              .join(","),
          ),
        [A.pathname + A.search]
      );
    }, [f, h, s, l, p, i, e, u]),
    S = b.useMemo(() => D2(g, l), [g, l]),
    T = z2(g);
  return b.createElement(
    b.Fragment,
    null,
    y.map((C) =>
      b.createElement("link", {
        key: C,
        rel: "prefetch",
        as: "fetch",
        href: C,
        ...a,
      }),
    ),
    S.map((C) =>
      b.createElement("link", { key: C, rel: "modulepreload", href: C, ...a }),
    ),
    T.map(({ key: C, link: E }) =>
      b.createElement("link", { key: C, nonce: a.nonce, ...E }),
    ),
  );
}
function V2(...e) {
  return (i) => {
    e.forEach((a) => {
      typeof a == "function" ? a(i) : a != null && (a.current = i);
    });
  };
}
var k2 =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  k2 && (window.__reactRouterVersion = "7.11.0");
} catch {}
function B2({
  basename: e,
  children: i,
  unstable_useTransitions: a,
  window: s,
}) {
  let l = b.useRef();
  l.current == null && (l.current = vC({ window: s, v5Compat: !0 }));
  let u = l.current,
    [f, h] = b.useState({ action: u.action, location: u.location }),
    m = b.useCallback(
      (p) => {
        a === !1 ? h(p) : b.startTransition(() => h(p));
      },
      [a],
    );
  return (
    b.useLayoutEffect(() => u.listen(m), [u, m]),
    b.createElement(m2, {
      basename: e,
      children: i,
      location: f.location,
      navigationType: f.action,
      navigator: u,
      unstable_useTransitions: a,
    })
  );
}
var Rx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Ah = b.forwardRef(function (
    {
      onClick: i,
      discover: a = "render",
      prefetch: s = "none",
      relative: l,
      reloadDocument: u,
      replace: f,
      state: h,
      target: m,
      to: p,
      preventScrollReset: g,
      viewTransition: y,
      unstable_defaultShouldRevalidate: S,
      ...T
    },
    C,
  ) {
    let { basename: E, unstable_useTransitions: A } = b.useContext(sn),
      R = typeof p == "string" && Rx.test(p),
      M = gx(p, E);
    p = M.to;
    let O = WC(p, { relative: l }),
      [V, L, $] = _2(s, T),
      H = F2(p, {
        replace: f,
        state: h,
        target: m,
        preventScrollReset: g,
        relative: l,
        viewTransition: y,
        unstable_defaultShouldRevalidate: S,
        unstable_useTransitions: A,
      });
    function F(se) {
      (i && i(se), se.defaultPrevented || H(se));
    }
    let J = b.createElement("a", {
      ...T,
      ...$,
      href: M.absoluteURL || O,
      onClick: M.isExternal || u ? i : F,
      ref: V2(C, L),
      target: m,
      "data-discover": !R && a === "render" ? "true" : void 0,
    });
    return V && !R
      ? b.createElement(b.Fragment, null, J, b.createElement(L2, { page: O }))
      : J;
  });
Ah.displayName = "Link";
var U2 = b.forwardRef(function (
  {
    "aria-current": i = "page",
    caseSensitive: a = !1,
    className: s = "",
    end: l = !1,
    style: u,
    to: f,
    viewTransition: h,
    children: m,
    ...p
  },
  g,
) {
  let y = Fs(f, { relative: p.relative }),
    S = da(),
    T = b.useContext(su),
    { navigator: C, basename: E } = b.useContext(sn),
    A = T != null && K2(y) && h === !0,
    R = C.encodeLocation ? C.encodeLocation(y).pathname : y.pathname,
    M = S.pathname,
    O =
      T && T.navigation && T.navigation.location
        ? T.navigation.location.pathname
        : null;
  (a ||
    ((M = M.toLowerCase()),
    (O = O ? O.toLowerCase() : null),
    (R = R.toLowerCase())),
    O && E && (O = Wn(O, E) || O));
  const V = R !== "/" && R.endsWith("/") ? R.length - 1 : R.length;
  let L = M === R || (!l && M.startsWith(R) && M.charAt(V) === "/"),
    $ =
      O != null &&
      (O === R || (!l && O.startsWith(R) && O.charAt(R.length) === "/")),
    H = { isActive: L, isPending: $, isTransitioning: A },
    F = L ? i : void 0,
    J;
  typeof s == "function"
    ? (J = s(H))
    : (J = [
        s,
        L ? "active" : null,
        $ ? "pending" : null,
        A ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let se = typeof u == "function" ? u(H) : u;
  return b.createElement(
    Ah,
    {
      ...p,
      "aria-current": F,
      className: J,
      ref: g,
      style: se,
      to: f,
      viewTransition: h,
    },
    typeof m == "function" ? m(H) : m,
  );
});
U2.displayName = "NavLink";
var H2 = b.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: i,
      navigate: a,
      reloadDocument: s,
      replace: l,
      state: u,
      method: f = _l,
      action: h,
      onSubmit: m,
      relative: p,
      preventScrollReset: g,
      viewTransition: y,
      unstable_defaultShouldRevalidate: S,
      ...T
    },
    C,
  ) => {
    let { unstable_useTransitions: E } = b.useContext(sn),
      A = I2(),
      R = X2(h, { relative: p }),
      M = f.toLowerCase() === "get" ? "get" : "post",
      O = typeof h == "string" && Rx.test(h),
      V = (L) => {
        if ((m && m(L), L.defaultPrevented)) return;
        L.preventDefault();
        let $ = L.nativeEvent.submitter,
          H = $?.getAttribute("formmethod") || f,
          F = () =>
            A($ || L.currentTarget, {
              fetcherKey: i,
              method: H,
              navigate: a,
              replace: l,
              state: u,
              relative: p,
              preventScrollReset: g,
              viewTransition: y,
              unstable_defaultShouldRevalidate: S,
            });
        E && a !== !1 ? b.startTransition(() => F()) : F();
      };
    return b.createElement("form", {
      ref: C,
      method: M,
      action: R,
      onSubmit: s ? m : V,
      ...T,
      "data-discover": !O && e === "render" ? "true" : void 0,
    });
  },
);
H2.displayName = "Form";
function q2(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Dx(e) {
  let i = b.useContext(pr);
  return (qe(i, q2(e)), i);
}
function F2(
  e,
  {
    target: i,
    replace: a,
    state: s,
    preventScrollReset: l,
    relative: u,
    viewTransition: f,
    unstable_defaultShouldRevalidate: h,
    unstable_useTransitions: m,
  } = {},
) {
  let p = JC(),
    g = da(),
    y = Fs(e, { relative: u });
  return b.useCallback(
    (S) => {
      if (x2(S, i)) {
        S.preventDefault();
        let T = a !== void 0 ? a : Os(g) === Os(y),
          C = () =>
            p(e, {
              replace: T,
              state: s,
              preventScrollReset: l,
              relative: u,
              viewTransition: f,
              unstable_defaultShouldRevalidate: h,
            });
        m ? b.startTransition(() => C()) : C();
      }
    },
    [g, p, y, a, s, i, e, l, u, f, h, m],
  );
}
var G2 = 0,
  Y2 = () => `__${String(++G2)}__`;
function I2() {
  let { router: e } = Dx("useSubmit"),
    { basename: i } = b.useContext(sn),
    a = c2(),
    s = e.fetch,
    l = e.navigate;
  return b.useCallback(
    async (u, f = {}) => {
      let { action: h, method: m, encType: p, formData: g, body: y } = E2(u, i);
      if (f.navigate === !1) {
        let S = f.fetcherKey || Y2();
        await s(S, a, f.action || h, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: g,
          body: y,
          formMethod: f.method || m,
          formEncType: f.encType || p,
          flushSync: f.flushSync,
        });
      } else
        await l(f.action || h, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: g,
          body: y,
          formMethod: f.method || m,
          formEncType: f.encType || p,
          replace: f.replace,
          state: f.state,
          fromRouteId: a,
          flushSync: f.flushSync,
          viewTransition: f.viewTransition,
        });
    },
    [s, l, i, a],
  );
}
function X2(e, { relative: i } = {}) {
  let { basename: a } = b.useContext(sn),
    s = b.useContext(ni);
  qe(s, "useFormAction must be used inside a RouteContext");
  let [l] = s.matches.slice(-1),
    u = { ...Fs(e || ".", { relative: i }) },
    f = da();
  if (e == null) {
    u.search = f.search;
    let h = new URLSearchParams(u.search),
      m = h.getAll("index");
    if (m.some((g) => g === "")) {
      (h.delete("index"),
        m.filter((y) => y).forEach((y) => h.append("index", y)));
      let g = h.toString();
      u.search = g ? `?${g}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      l.route.index &&
      (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"),
    a !== "/" && (u.pathname = u.pathname === "/" ? a : Zn([a, u.pathname])),
    Os(u)
  );
}
function K2(e, { relative: i } = {}) {
  let a = b.useContext(vx);
  qe(
    a != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: s } = Dx("useViewTransitionState"),
    l = Fs(e, { relative: i });
  if (!a.isTransitioning) return !1;
  let u = Wn(a.currentLocation.pathname, s) || a.currentLocation.pathname,
    f = Wn(a.nextLocation.pathname, s) || a.nextLocation.pathname;
  return Xl(l.pathname, f) != null || Xl(l.pathname, u) != null;
}
var Gs = lx();
const Mx = ox(Gs);
var lu = class {
    constructor() {
      ((this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this)));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          (this.listeners.delete(e), this.onUnsubscribe());
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  uu = typeof window > "u" || "Deno" in globalThis;
function fn() {}
function $2(e, i) {
  return typeof e == "function" ? e(i) : e;
}
function Q2(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function Z2(e, i) {
  return Math.max(e + (i || 0) - Date.now(), 0);
}
function Kv(e, i) {
  return typeof e == "function" ? e(i) : e;
}
function W2(e, i) {
  return typeof e == "function" ? e(i) : e;
}
function $v(e, i) {
  const {
    type: a = "all",
    exact: s,
    fetchStatus: l,
    predicate: u,
    queryKey: f,
    stale: h,
  } = e;
  if (f) {
    if (s) {
      if (i.queryHash !== Ch(f, i.options)) return !1;
    } else if (!js(i.queryKey, f)) return !1;
  }
  if (a !== "all") {
    const m = i.isActive();
    if ((a === "active" && !m) || (a === "inactive" && m)) return !1;
  }
  return !(
    (typeof h == "boolean" && i.isStale() !== h) ||
    (l && l !== i.state.fetchStatus) ||
    (u && !u(i))
  );
}
function Qv(e, i) {
  const { exact: a, status: s, predicate: l, mutationKey: u } = e;
  if (u) {
    if (!i.options.mutationKey) return !1;
    if (a) {
      if (Ns(i.options.mutationKey) !== Ns(u)) return !1;
    } else if (!js(i.options.mutationKey, u)) return !1;
  }
  return !((s && i.state.status !== s) || (l && !l(i)));
}
function Ch(e, i) {
  return (i?.queryKeyHashFn || Ns)(e);
}
function Ns(e) {
  return JSON.stringify(e, (i, a) =>
    Pd(a)
      ? Object.keys(a)
          .sort()
          .reduce((s, l) => ((s[l] = a[l]), s), {})
      : a,
  );
}
function js(e, i) {
  return e === i
    ? !0
    : typeof e != typeof i
      ? !1
      : e && i && typeof e == "object" && typeof i == "object"
        ? !Object.keys(i).some((a) => !js(e[a], i[a]))
        : !1;
}
function Ox(e, i) {
  if (e === i) return e;
  const a = Zv(e) && Zv(i);
  if (a || (Pd(e) && Pd(i))) {
    const s = a ? e : Object.keys(e),
      l = s.length,
      u = a ? i : Object.keys(i),
      f = u.length,
      h = a ? [] : {};
    let m = 0;
    for (let p = 0; p < f; p++) {
      const g = a ? p : u[p];
      ((!a && s.includes(g)) || a) && e[g] === void 0 && i[g] === void 0
        ? ((h[g] = void 0), m++)
        : ((h[g] = Ox(e[g], i[g])), h[g] === e[g] && e[g] !== void 0 && m++);
    }
    return l === f && m === l ? e : h;
  }
  return i;
}
function Zv(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Pd(e) {
  if (!Wv(e)) return !1;
  const i = e.constructor;
  if (i === void 0) return !0;
  const a = i.prototype;
  return !(
    !Wv(a) ||
    !a.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(e) !== Object.prototype
  );
}
function Wv(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function J2(e) {
  return new Promise((i) => {
    setTimeout(i, e);
  });
}
function eR(e, i, a) {
  return typeof a.structuralSharing == "function"
    ? a.structuralSharing(e, i)
    : a.structuralSharing !== !1
      ? Ox(e, i)
      : i;
}
function tR(e, i, a = 0) {
  const s = [...e, i];
  return a && s.length > a ? s.slice(1) : s;
}
function nR(e, i, a = 0) {
  const s = [i, ...e];
  return a && s.length > a ? s.slice(0, -1) : s;
}
var Rh = Symbol();
function Nx(e, i) {
  return !e.queryFn && i?.initialPromise
    ? () => i.initialPromise
    : !e.queryFn || e.queryFn === Rh
      ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
      : e.queryFn;
}
var iR = class extends lu {
    #e;
    #t;
    #n;
    constructor() {
      (super(),
        (this.#n = (e) => {
          if (!uu && window.addEventListener) {
            const i = () => e();
            return (
              window.addEventListener("visibilitychange", i, !1),
              () => {
                window.removeEventListener("visibilitychange", i);
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(e) {
      ((this.#n = e),
        this.#t?.(),
        (this.#t = e((i) => {
          typeof i == "boolean" ? this.setFocused(i) : this.onFocus();
        })));
    }
    setFocused(e) {
      this.#e !== e && ((this.#e = e), this.onFocus());
    }
    onFocus() {
      const e = this.isFocused();
      this.listeners.forEach((i) => {
        i(e);
      });
    }
    isFocused() {
      return typeof this.#e == "boolean"
        ? this.#e
        : globalThis.document?.visibilityState !== "hidden";
    }
  },
  jx = new iR(),
  aR = class extends lu {
    #e = !0;
    #t;
    #n;
    constructor() {
      (super(),
        (this.#n = (e) => {
          if (!uu && window.addEventListener) {
            const i = () => e(!0),
              a = () => e(!1);
            return (
              window.addEventListener("online", i, !1),
              window.addEventListener("offline", a, !1),
              () => {
                (window.removeEventListener("online", i),
                  window.removeEventListener("offline", a));
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(e) {
      ((this.#n = e), this.#t?.(), (this.#t = e(this.setOnline.bind(this))));
    }
    setOnline(e) {
      this.#e !== e &&
        ((this.#e = e),
        this.listeners.forEach((a) => {
          a(e);
        }));
    }
    isOnline() {
      return this.#e;
    }
  },
  Kl = new aR();
function rR() {
  let e, i;
  const a = new Promise((l, u) => {
    ((e = l), (i = u));
  });
  ((a.status = "pending"), a.catch(() => {}));
  function s(l) {
    (Object.assign(a, l), delete a.resolve, delete a.reject);
  }
  return (
    (a.resolve = (l) => {
      (s({ status: "fulfilled", value: l }), e(l));
    }),
    (a.reject = (l) => {
      (s({ status: "rejected", reason: l }), i(l));
    }),
    a
  );
}
function sR(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function _x(e) {
  return (e ?? "online") === "online" ? Kl.isOnline() : !0;
}
var Lx = class extends Error {
  constructor(e) {
    (super("CancelledError"),
      (this.revert = e?.revert),
      (this.silent = e?.silent));
  }
};
function Qf(e) {
  return e instanceof Lx;
}
function zx(e) {
  let i = !1,
    a = 0,
    s = !1,
    l;
  const u = rR(),
    f = (E) => {
      s || (S(new Lx(E)), e.abort?.());
    },
    h = () => {
      i = !0;
    },
    m = () => {
      i = !1;
    },
    p = () =>
      jx.isFocused() &&
      (e.networkMode === "always" || Kl.isOnline()) &&
      e.canRun(),
    g = () => _x(e.networkMode) && e.canRun(),
    y = (E) => {
      s || ((s = !0), e.onSuccess?.(E), l?.(), u.resolve(E));
    },
    S = (E) => {
      s || ((s = !0), e.onError?.(E), l?.(), u.reject(E));
    },
    T = () =>
      new Promise((E) => {
        ((l = (A) => {
          (s || p()) && E(A);
        }),
          e.onPause?.());
      }).then(() => {
        ((l = void 0), s || e.onContinue?.());
      }),
    C = () => {
      if (s) return;
      let E;
      const A = a === 0 ? e.initialPromise : void 0;
      try {
        E = A ?? e.fn();
      } catch (R) {
        E = Promise.reject(R);
      }
      Promise.resolve(E)
        .then(y)
        .catch((R) => {
          if (s) return;
          const M = e.retry ?? (uu ? 0 : 3),
            O = e.retryDelay ?? sR,
            V = typeof O == "function" ? O(a, R) : O,
            L =
              M === !0 ||
              (typeof M == "number" && a < M) ||
              (typeof M == "function" && M(a, R));
          if (i || !L) {
            S(R);
            return;
          }
          (a++,
            e.onFail?.(a, R),
            J2(V)
              .then(() => (p() ? void 0 : T()))
              .then(() => {
                i ? S(R) : C();
              }));
        });
    };
  return {
    promise: u,
    cancel: f,
    continue: () => (l?.(), u),
    cancelRetry: h,
    continueRetry: m,
    canStart: g,
    start: () => (g() ? C() : T().then(C), u),
  };
}
function oR() {
  let e = [],
    i = 0,
    a = (h) => {
      h();
    },
    s = (h) => {
      h();
    },
    l = (h) => setTimeout(h, 0);
  const u = (h) => {
      i
        ? e.push(h)
        : l(() => {
            a(h);
          });
    },
    f = () => {
      const h = e;
      ((e = []),
        h.length &&
          l(() => {
            s(() => {
              h.forEach((m) => {
                a(m);
              });
            });
          }));
    };
  return {
    batch: (h) => {
      let m;
      i++;
      try {
        m = h();
      } finally {
        (i--, i || f());
      }
      return m;
    },
    batchCalls:
      (h) =>
      (...m) => {
        u(() => {
          h(...m);
        });
      },
    schedule: u,
    setNotifyFunction: (h) => {
      a = h;
    },
    setBatchNotifyFunction: (h) => {
      s = h;
    },
    setScheduler: (h) => {
      l = h;
    },
  };
}
var yt = oR(),
  Px = class {
    #e;
    destroy() {
      this.clearGcTimeout();
    }
    scheduleGc() {
      (this.clearGcTimeout(),
        Q2(this.gcTime) &&
          (this.#e = setTimeout(() => {
            this.optionalRemove();
          }, this.gcTime)));
    }
    updateGcTime(e) {
      this.gcTime = Math.max(this.gcTime || 0, e ?? (uu ? 1 / 0 : 300 * 1e3));
    }
    clearGcTimeout() {
      this.#e && (clearTimeout(this.#e), (this.#e = void 0));
    }
  },
  lR = class extends Px {
    #e;
    #t;
    #n;
    #i;
    #s;
    #r;
    constructor(e) {
      (super(),
        (this.#r = !1),
        (this.#s = e.defaultOptions),
        this.setOptions(e.options),
        (this.observers = []),
        (this.#n = e.cache),
        (this.queryKey = e.queryKey),
        (this.queryHash = e.queryHash),
        (this.#e = cR(this.options)),
        (this.state = e.state ?? this.#e),
        this.scheduleGc());
    }
    get meta() {
      return this.options.meta;
    }
    get promise() {
      return this.#i?.promise;
    }
    setOptions(e) {
      ((this.options = { ...this.#s, ...e }),
        this.updateGcTime(this.options.gcTime));
    }
    optionalRemove() {
      !this.observers.length &&
        this.state.fetchStatus === "idle" &&
        this.#n.remove(this);
    }
    setData(e, i) {
      const a = eR(this.state.data, e, this.options);
      return (
        this.#a({
          data: a,
          type: "success",
          dataUpdatedAt: i?.updatedAt,
          manual: i?.manual,
        }),
        a
      );
    }
    setState(e, i) {
      this.#a({ type: "setState", state: e, setStateOptions: i });
    }
    cancel(e) {
      const i = this.#i?.promise;
      return (this.#i?.cancel(e), i ? i.then(fn).catch(fn) : Promise.resolve());
    }
    destroy() {
      (super.destroy(), this.cancel({ silent: !0 }));
    }
    reset() {
      (this.destroy(), this.setState(this.#e));
    }
    isActive() {
      return this.observers.some((e) => W2(e.options.enabled, this) !== !1);
    }
    isDisabled() {
      return this.getObserversCount() > 0
        ? !this.isActive()
        : this.options.queryFn === Rh ||
            this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
    }
    isStale() {
      return this.state.isInvalidated
        ? !0
        : this.getObserversCount() > 0
          ? this.observers.some((e) => e.getCurrentResult().isStale)
          : this.state.data === void 0;
    }
    isStaleByTime(e = 0) {
      return (
        this.state.isInvalidated ||
        this.state.data === void 0 ||
        !Z2(this.state.dataUpdatedAt, e)
      );
    }
    onFocus() {
      (this.observers
        .find((i) => i.shouldFetchOnWindowFocus())
        ?.refetch({ cancelRefetch: !1 }),
        this.#i?.continue());
    }
    onOnline() {
      (this.observers
        .find((i) => i.shouldFetchOnReconnect())
        ?.refetch({ cancelRefetch: !1 }),
        this.#i?.continue());
    }
    addObserver(e) {
      this.observers.includes(e) ||
        (this.observers.push(e),
        this.clearGcTimeout(),
        this.#n.notify({ type: "observerAdded", query: this, observer: e }));
    }
    removeObserver(e) {
      this.observers.includes(e) &&
        ((this.observers = this.observers.filter((i) => i !== e)),
        this.observers.length ||
          (this.#i &&
            (this.#r ? this.#i.cancel({ revert: !0 }) : this.#i.cancelRetry()),
          this.scheduleGc()),
        this.#n.notify({ type: "observerRemoved", query: this, observer: e }));
    }
    getObserversCount() {
      return this.observers.length;
    }
    invalidate() {
      this.state.isInvalidated || this.#a({ type: "invalidate" });
    }
    fetch(e, i) {
      if (this.state.fetchStatus !== "idle") {
        if (this.state.data !== void 0 && i?.cancelRefetch)
          this.cancel({ silent: !0 });
        else if (this.#i) return (this.#i.continueRetry(), this.#i.promise);
      }
      if ((e && this.setOptions(e), !this.options.queryFn)) {
        const h = this.observers.find((m) => m.options.queryFn);
        h && this.setOptions(h.options);
      }
      const a = new AbortController(),
        s = (h) => {
          Object.defineProperty(h, "signal", {
            enumerable: !0,
            get: () => ((this.#r = !0), a.signal),
          });
        },
        l = () => {
          const h = Nx(this.options, i),
            m = { queryKey: this.queryKey, meta: this.meta };
          return (
            s(m),
            (this.#r = !1),
            this.options.persister ? this.options.persister(h, m, this) : h(m)
          );
        },
        u = {
          fetchOptions: i,
          options: this.options,
          queryKey: this.queryKey,
          state: this.state,
          fetchFn: l,
        };
      (s(u),
        this.options.behavior?.onFetch(u, this),
        (this.#t = this.state),
        (this.state.fetchStatus === "idle" ||
          this.state.fetchMeta !== u.fetchOptions?.meta) &&
          this.#a({ type: "fetch", meta: u.fetchOptions?.meta }));
      const f = (h) => {
        ((Qf(h) && h.silent) || this.#a({ type: "error", error: h }),
          Qf(h) ||
            (this.#n.config.onError?.(h, this),
            this.#n.config.onSettled?.(this.state.data, h, this)),
          this.scheduleGc());
      };
      return (
        (this.#i = zx({
          initialPromise: i?.initialPromise,
          fn: u.fetchFn,
          abort: a.abort.bind(a),
          onSuccess: (h) => {
            if (h === void 0) {
              f(new Error(`${this.queryHash} data is undefined`));
              return;
            }
            try {
              this.setData(h);
            } catch (m) {
              f(m);
              return;
            }
            (this.#n.config.onSuccess?.(h, this),
              this.#n.config.onSettled?.(h, this.state.error, this),
              this.scheduleGc());
          },
          onError: f,
          onFail: (h, m) => {
            this.#a({ type: "failed", failureCount: h, error: m });
          },
          onPause: () => {
            this.#a({ type: "pause" });
          },
          onContinue: () => {
            this.#a({ type: "continue" });
          },
          retry: u.options.retry,
          retryDelay: u.options.retryDelay,
          networkMode: u.options.networkMode,
          canRun: () => !0,
        })),
        this.#i.start()
      );
    }
    #a(e) {
      const i = (a) => {
        switch (e.type) {
          case "failed":
            return {
              ...a,
              fetchFailureCount: e.failureCount,
              fetchFailureReason: e.error,
            };
          case "pause":
            return { ...a, fetchStatus: "paused" };
          case "continue":
            return { ...a, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...a,
              ...uR(a.data, this.options),
              fetchMeta: e.meta ?? null,
            };
          case "success":
            return {
              ...a,
              data: e.data,
              dataUpdateCount: a.dataUpdateCount + 1,
              dataUpdatedAt: e.dataUpdatedAt ?? Date.now(),
              error: null,
              isInvalidated: !1,
              status: "success",
              ...(!e.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
          case "error":
            const s = e.error;
            return Qf(s) && s.revert && this.#t
              ? { ...this.#t, fetchStatus: "idle" }
              : {
                  ...a,
                  error: s,
                  errorUpdateCount: a.errorUpdateCount + 1,
                  errorUpdatedAt: Date.now(),
                  fetchFailureCount: a.fetchFailureCount + 1,
                  fetchFailureReason: s,
                  fetchStatus: "idle",
                  status: "error",
                };
          case "invalidate":
            return { ...a, isInvalidated: !0 };
          case "setState":
            return { ...a, ...e.state };
        }
      };
      ((this.state = i(this.state)),
        yt.batch(() => {
          (this.observers.forEach((a) => {
            a.onQueryUpdate();
          }),
            this.#n.notify({ query: this, type: "updated", action: e }));
        }));
    }
  };
function uR(e, i) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: _x(i.networkMode) ? "fetching" : "paused",
    ...(e === void 0 && { error: null, status: "pending" }),
  };
}
function cR(e) {
  const i =
      typeof e.initialData == "function" ? e.initialData() : e.initialData,
    a = i !== void 0,
    s = a
      ? typeof e.initialDataUpdatedAt == "function"
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: i,
    dataUpdateCount: 0,
    dataUpdatedAt: a ? (s ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: a ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var fR = class extends lu {
    constructor(e = {}) {
      (super(), (this.config = e), (this.#e = new Map()));
    }
    #e;
    build(e, i, a) {
      const s = i.queryKey,
        l = i.queryHash ?? Ch(s, i);
      let u = this.get(l);
      return (
        u ||
          ((u = new lR({
            cache: this,
            queryKey: s,
            queryHash: l,
            options: e.defaultQueryOptions(i),
            state: a,
            defaultOptions: e.getQueryDefaults(s),
          })),
          this.add(u)),
        u
      );
    }
    add(e) {
      this.#e.has(e.queryHash) ||
        (this.#e.set(e.queryHash, e), this.notify({ type: "added", query: e }));
    }
    remove(e) {
      const i = this.#e.get(e.queryHash);
      i &&
        (e.destroy(),
        i === e && this.#e.delete(e.queryHash),
        this.notify({ type: "removed", query: e }));
    }
    clear() {
      yt.batch(() => {
        this.getAll().forEach((e) => {
          this.remove(e);
        });
      });
    }
    get(e) {
      return this.#e.get(e);
    }
    getAll() {
      return [...this.#e.values()];
    }
    find(e) {
      const i = { exact: !0, ...e };
      return this.getAll().find((a) => $v(i, a));
    }
    findAll(e = {}) {
      const i = this.getAll();
      return Object.keys(e).length > 0 ? i.filter((a) => $v(e, a)) : i;
    }
    notify(e) {
      yt.batch(() => {
        this.listeners.forEach((i) => {
          i(e);
        });
      });
    }
    onFocus() {
      yt.batch(() => {
        this.getAll().forEach((e) => {
          e.onFocus();
        });
      });
    }
    onOnline() {
      yt.batch(() => {
        this.getAll().forEach((e) => {
          e.onOnline();
        });
      });
    }
  },
  dR = class extends Px {
    #e;
    #t;
    #n;
    constructor(e) {
      (super(),
        (this.mutationId = e.mutationId),
        (this.#t = e.mutationCache),
        (this.#e = []),
        (this.state = e.state || hR()),
        this.setOptions(e.options),
        this.scheduleGc());
    }
    setOptions(e) {
      ((this.options = e), this.updateGcTime(this.options.gcTime));
    }
    get meta() {
      return this.options.meta;
    }
    addObserver(e) {
      this.#e.includes(e) ||
        (this.#e.push(e),
        this.clearGcTimeout(),
        this.#t.notify({ type: "observerAdded", mutation: this, observer: e }));
    }
    removeObserver(e) {
      ((this.#e = this.#e.filter((i) => i !== e)),
        this.scheduleGc(),
        this.#t.notify({
          type: "observerRemoved",
          mutation: this,
          observer: e,
        }));
    }
    optionalRemove() {
      this.#e.length ||
        (this.state.status === "pending"
          ? this.scheduleGc()
          : this.#t.remove(this));
    }
    continue() {
      return this.#n?.continue() ?? this.execute(this.state.variables);
    }
    async execute(e) {
      this.#n = zx({
        fn: () =>
          this.options.mutationFn
            ? this.options.mutationFn(e)
            : Promise.reject(new Error("No mutationFn found")),
        onFail: (s, l) => {
          this.#i({ type: "failed", failureCount: s, error: l });
        },
        onPause: () => {
          this.#i({ type: "pause" });
        },
        onContinue: () => {
          this.#i({ type: "continue" });
        },
        retry: this.options.retry ?? 0,
        retryDelay: this.options.retryDelay,
        networkMode: this.options.networkMode,
        canRun: () => this.#t.canRun(this),
      });
      const i = this.state.status === "pending",
        a = !this.#n.canStart();
      try {
        if (!i) {
          (this.#i({ type: "pending", variables: e, isPaused: a }),
            await this.#t.config.onMutate?.(e, this));
          const l = await this.options.onMutate?.(e);
          l !== this.state.context &&
            this.#i({ type: "pending", context: l, variables: e, isPaused: a });
        }
        const s = await this.#n.start();
        return (
          await this.#t.config.onSuccess?.(s, e, this.state.context, this),
          await this.options.onSuccess?.(s, e, this.state.context),
          await this.#t.config.onSettled?.(
            s,
            null,
            this.state.variables,
            this.state.context,
            this,
          ),
          await this.options.onSettled?.(s, null, e, this.state.context),
          this.#i({ type: "success", data: s }),
          s
        );
      } catch (s) {
        try {
          throw (
            await this.#t.config.onError?.(s, e, this.state.context, this),
            await this.options.onError?.(s, e, this.state.context),
            await this.#t.config.onSettled?.(
              void 0,
              s,
              this.state.variables,
              this.state.context,
              this,
            ),
            await this.options.onSettled?.(void 0, s, e, this.state.context),
            s
          );
        } finally {
          this.#i({ type: "error", error: s });
        }
      } finally {
        this.#t.runNext(this);
      }
    }
    #i(e) {
      const i = (a) => {
        switch (e.type) {
          case "failed":
            return {
              ...a,
              failureCount: e.failureCount,
              failureReason: e.error,
            };
          case "pause":
            return { ...a, isPaused: !0 };
          case "continue":
            return { ...a, isPaused: !1 };
          case "pending":
            return {
              ...a,
              context: e.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: e.isPaused,
              status: "pending",
              variables: e.variables,
              submittedAt: Date.now(),
            };
          case "success":
            return {
              ...a,
              data: e.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: !1,
            };
          case "error":
            return {
              ...a,
              data: void 0,
              error: e.error,
              failureCount: a.failureCount + 1,
              failureReason: e.error,
              isPaused: !1,
              status: "error",
            };
        }
      };
      ((this.state = i(this.state)),
        yt.batch(() => {
          (this.#e.forEach((a) => {
            a.onMutationUpdate(e);
          }),
            this.#t.notify({ mutation: this, type: "updated", action: e }));
        }));
    }
  };
function hR() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var mR = class extends lu {
  constructor(e = {}) {
    (super(), (this.config = e), (this.#e = new Map()), (this.#t = Date.now()));
  }
  #e;
  #t;
  build(e, i, a) {
    const s = new dR({
      mutationCache: this,
      mutationId: ++this.#t,
      options: e.defaultMutationOptions(i),
      state: a,
    });
    return (this.add(s), s);
  }
  add(e) {
    const i = yl(e),
      a = this.#e.get(i) ?? [];
    (a.push(e), this.#e.set(i, a), this.notify({ type: "added", mutation: e }));
  }
  remove(e) {
    const i = yl(e);
    if (this.#e.has(i)) {
      const a = this.#e.get(i)?.filter((s) => s !== e);
      a && (a.length === 0 ? this.#e.delete(i) : this.#e.set(i, a));
    }
    this.notify({ type: "removed", mutation: e });
  }
  canRun(e) {
    const i = this.#e.get(yl(e))?.find((a) => a.state.status === "pending");
    return !i || i === e;
  }
  runNext(e) {
    return (
      this.#e
        .get(yl(e))
        ?.find((a) => a !== e && a.state.isPaused)
        ?.continue() ?? Promise.resolve()
    );
  }
  clear() {
    yt.batch(() => {
      this.getAll().forEach((e) => {
        this.remove(e);
      });
    });
  }
  getAll() {
    return [...this.#e.values()].flat();
  }
  find(e) {
    const i = { exact: !0, ...e };
    return this.getAll().find((a) => Qv(i, a));
  }
  findAll(e = {}) {
    return this.getAll().filter((i) => Qv(e, i));
  }
  notify(e) {
    yt.batch(() => {
      this.listeners.forEach((i) => {
        i(e);
      });
    });
  }
  resumePausedMutations() {
    const e = this.getAll().filter((i) => i.state.isPaused);
    return yt.batch(() => Promise.all(e.map((i) => i.continue().catch(fn))));
  }
};
function yl(e) {
  return e.options.scope?.id ?? String(e.mutationId);
}
function Jv(e) {
  return {
    onFetch: (i, a) => {
      const s = i.options,
        l = i.fetchOptions?.meta?.fetchMore?.direction,
        u = i.state.data?.pages || [],
        f = i.state.data?.pageParams || [];
      let h = { pages: [], pageParams: [] },
        m = 0;
      const p = async () => {
        let g = !1;
        const y = (C) => {
            Object.defineProperty(C, "signal", {
              enumerable: !0,
              get: () => (
                i.signal.aborted
                  ? (g = !0)
                  : i.signal.addEventListener("abort", () => {
                      g = !0;
                    }),
                i.signal
              ),
            });
          },
          S = Nx(i.options, i.fetchOptions),
          T = async (C, E, A) => {
            if (g) return Promise.reject();
            if (E == null && C.pages.length) return Promise.resolve(C);
            const R = {
              queryKey: i.queryKey,
              pageParam: E,
              direction: A ? "backward" : "forward",
              meta: i.options.meta,
            };
            y(R);
            const M = await S(R),
              { maxPages: O } = i.options,
              V = A ? nR : tR;
            return {
              pages: V(C.pages, M, O),
              pageParams: V(C.pageParams, E, O),
            };
          };
        if (l && u.length) {
          const C = l === "backward",
            E = C ? pR : e0,
            A = { pages: u, pageParams: f },
            R = E(s, A);
          h = await T(A, R, C);
        } else {
          const C = e ?? u.length;
          do {
            const E = m === 0 ? (f[0] ?? s.initialPageParam) : e0(s, h);
            if (m > 0 && E == null) break;
            ((h = await T(h, E)), m++);
          } while (m < C);
        }
        return h;
      };
      i.options.persister
        ? (i.fetchFn = () =>
            i.options.persister?.(
              p,
              { queryKey: i.queryKey, meta: i.options.meta, signal: i.signal },
              a,
            ))
        : (i.fetchFn = p);
    },
  };
}
function e0(e, { pages: i, pageParams: a }) {
  const s = i.length - 1;
  return i.length > 0 ? e.getNextPageParam(i[s], i, a[s], a) : void 0;
}
function pR(e, { pages: i, pageParams: a }) {
  return i.length > 0 ? e.getPreviousPageParam?.(i[0], i, a[0], a) : void 0;
}
var gR = class {
    #e;
    #t;
    #n;
    #i;
    #s;
    #r;
    #a;
    #o;
    constructor(e = {}) {
      ((this.#e = e.queryCache || new fR()),
        (this.#t = e.mutationCache || new mR()),
        (this.#n = e.defaultOptions || {}),
        (this.#i = new Map()),
        (this.#s = new Map()),
        (this.#r = 0));
    }
    mount() {
      (this.#r++,
        this.#r === 1 &&
          ((this.#a = jx.subscribe(async (e) => {
            e && (await this.resumePausedMutations(), this.#e.onFocus());
          })),
          (this.#o = Kl.subscribe(async (e) => {
            e && (await this.resumePausedMutations(), this.#e.onOnline());
          }))));
    }
    unmount() {
      (this.#r--,
        this.#r === 0 &&
          (this.#a?.(), (this.#a = void 0), this.#o?.(), (this.#o = void 0)));
    }
    isFetching(e) {
      return this.#e.findAll({ ...e, fetchStatus: "fetching" }).length;
    }
    isMutating(e) {
      return this.#t.findAll({ ...e, status: "pending" }).length;
    }
    getQueryData(e) {
      const i = this.defaultQueryOptions({ queryKey: e });
      return this.#e.get(i.queryHash)?.state.data;
    }
    ensureQueryData(e) {
      const i = this.getQueryData(e.queryKey);
      if (i === void 0) return this.fetchQuery(e);
      {
        const a = this.defaultQueryOptions(e),
          s = this.#e.build(this, a);
        return (
          e.revalidateIfStale &&
            s.isStaleByTime(Kv(a.staleTime, s)) &&
            this.prefetchQuery(a),
          Promise.resolve(i)
        );
      }
    }
    getQueriesData(e) {
      return this.#e.findAll(e).map(({ queryKey: i, state: a }) => {
        const s = a.data;
        return [i, s];
      });
    }
    setQueryData(e, i, a) {
      const s = this.defaultQueryOptions({ queryKey: e }),
        u = this.#e.get(s.queryHash)?.state.data,
        f = $2(i, u);
      if (f !== void 0)
        return this.#e.build(this, s).setData(f, { ...a, manual: !0 });
    }
    setQueriesData(e, i, a) {
      return yt.batch(() =>
        this.#e
          .findAll(e)
          .map(({ queryKey: s }) => [s, this.setQueryData(s, i, a)]),
      );
    }
    getQueryState(e) {
      const i = this.defaultQueryOptions({ queryKey: e });
      return this.#e.get(i.queryHash)?.state;
    }
    removeQueries(e) {
      const i = this.#e;
      yt.batch(() => {
        i.findAll(e).forEach((a) => {
          i.remove(a);
        });
      });
    }
    resetQueries(e, i) {
      const a = this.#e,
        s = { type: "active", ...e };
      return yt.batch(
        () => (
          a.findAll(e).forEach((l) => {
            l.reset();
          }),
          this.refetchQueries(s, i)
        ),
      );
    }
    cancelQueries(e = {}, i = {}) {
      const a = { revert: !0, ...i },
        s = yt.batch(() => this.#e.findAll(e).map((l) => l.cancel(a)));
      return Promise.all(s).then(fn).catch(fn);
    }
    invalidateQueries(e = {}, i = {}) {
      return yt.batch(() => {
        if (
          (this.#e.findAll(e).forEach((s) => {
            s.invalidate();
          }),
          e.refetchType === "none")
        )
          return Promise.resolve();
        const a = { ...e, type: e.refetchType ?? e.type ?? "active" };
        return this.refetchQueries(a, i);
      });
    }
    refetchQueries(e = {}, i) {
      const a = { ...i, cancelRefetch: i?.cancelRefetch ?? !0 },
        s = yt.batch(() =>
          this.#e
            .findAll(e)
            .filter((l) => !l.isDisabled())
            .map((l) => {
              let u = l.fetch(void 0, a);
              return (
                a.throwOnError || (u = u.catch(fn)),
                l.state.fetchStatus === "paused" ? Promise.resolve() : u
              );
            }),
        );
      return Promise.all(s).then(fn);
    }
    fetchQuery(e) {
      const i = this.defaultQueryOptions(e);
      i.retry === void 0 && (i.retry = !1);
      const a = this.#e.build(this, i);
      return a.isStaleByTime(Kv(i.staleTime, a))
        ? a.fetch(i)
        : Promise.resolve(a.state.data);
    }
    prefetchQuery(e) {
      return this.fetchQuery(e).then(fn).catch(fn);
    }
    fetchInfiniteQuery(e) {
      return ((e.behavior = Jv(e.pages)), this.fetchQuery(e));
    }
    prefetchInfiniteQuery(e) {
      return this.fetchInfiniteQuery(e).then(fn).catch(fn);
    }
    ensureInfiniteQueryData(e) {
      return ((e.behavior = Jv(e.pages)), this.ensureQueryData(e));
    }
    resumePausedMutations() {
      return Kl.isOnline()
        ? this.#t.resumePausedMutations()
        : Promise.resolve();
    }
    getQueryCache() {
      return this.#e;
    }
    getMutationCache() {
      return this.#t;
    }
    getDefaultOptions() {
      return this.#n;
    }
    setDefaultOptions(e) {
      this.#n = e;
    }
    setQueryDefaults(e, i) {
      this.#i.set(Ns(e), { queryKey: e, defaultOptions: i });
    }
    getQueryDefaults(e) {
      const i = [...this.#i.values()];
      let a = {};
      return (
        i.forEach((s) => {
          js(e, s.queryKey) && (a = { ...a, ...s.defaultOptions });
        }),
        a
      );
    }
    setMutationDefaults(e, i) {
      this.#s.set(Ns(e), { mutationKey: e, defaultOptions: i });
    }
    getMutationDefaults(e) {
      const i = [...this.#s.values()];
      let a = {};
      return (
        i.forEach((s) => {
          js(e, s.mutationKey) && (a = { ...a, ...s.defaultOptions });
        }),
        a
      );
    }
    defaultQueryOptions(e) {
      if (e._defaulted) return e;
      const i = {
        ...this.#n.queries,
        ...this.getQueryDefaults(e.queryKey),
        ...e,
        _defaulted: !0,
      };
      return (
        i.queryHash || (i.queryHash = Ch(i.queryKey, i)),
        i.refetchOnReconnect === void 0 &&
          (i.refetchOnReconnect = i.networkMode !== "always"),
        i.throwOnError === void 0 && (i.throwOnError = !!i.suspense),
        !i.networkMode && i.persister && (i.networkMode = "offlineFirst"),
        i.enabled !== !0 && i.queryFn === Rh && (i.enabled = !1),
        i
      );
    }
    defaultMutationOptions(e) {
      return e?._defaulted
        ? e
        : {
            ...this.#n.mutations,
            ...(e?.mutationKey && this.getMutationDefaults(e.mutationKey)),
            ...e,
            _defaulted: !0,
          };
    }
    clear() {
      (this.#e.clear(), this.#t.clear());
    }
  },
  yR = b.createContext(void 0),
  vR = ({ client: e, children: i }) => (
    b.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e],
    ),
    x.jsx(yR.Provider, { value: e, children: i })
  );
async function bR(e) {
  if (!e.ok) {
    const i = (await e.text()) || e.statusText;
    throw new Error(`${e.status}: ${i}`);
  }
}
const xR =
    ({ on401: e }) =>
    async ({ queryKey: i }) => {
      const a = await fetch(i.join("/"), { credentials: "include" });
      return (await bR(a), await a.json());
    },
  SR = new gR({
    defaultOptions: {
      queries: {
        queryFn: xR({ on401: "throw" }),
        refetchInterval: !1,
        refetchOnWindowFocus: !1,
        staleTime: 1 / 0,
        retry: !1,
      },
      mutations: { retry: !1 },
    },
  }),
  wR = 1,
  ER = 1e6;
let Zf = 0;
function TR() {
  return ((Zf = (Zf + 1) % Number.MAX_SAFE_INTEGER), Zf.toString());
}
const Wf = new Map(),
  t0 = (e) => {
    if (Wf.has(e)) return;
    const i = setTimeout(() => {
      (Wf.delete(e), Es({ type: "REMOVE_TOAST", toastId: e }));
    }, ER);
    Wf.set(e, i);
  },
  AR = (e, i) => {
    switch (i.type) {
      case "ADD_TOAST":
        return { ...e, toasts: [i.toast, ...e.toasts].slice(0, wR) };
      case "UPDATE_TOAST":
        return {
          ...e,
          toasts: e.toasts.map((a) =>
            a.id === i.toast.id ? { ...a, ...i.toast } : a,
          ),
        };
      case "DISMISS_TOAST": {
        const { toastId: a } = i;
        return (
          a
            ? t0(a)
            : e.toasts.forEach((s) => {
                t0(s.id);
              }),
          {
            ...e,
            toasts: e.toasts.map((s) =>
              s.id === a || a === void 0 ? { ...s, open: !1 } : s,
            ),
          }
        );
      }
      case "REMOVE_TOAST":
        return i.toastId === void 0
          ? { ...e, toasts: [] }
          : { ...e, toasts: e.toasts.filter((a) => a.id !== i.toastId) };
    }
  },
  zl = [];
let Pl = { toasts: [] };
function Es(e) {
  ((Pl = AR(Pl, e)),
    zl.forEach((i) => {
      i(Pl);
    }));
}
function CR({ ...e }) {
  const i = TR(),
    a = (l) => Es({ type: "UPDATE_TOAST", toast: { ...l, id: i } }),
    s = () => Es({ type: "DISMISS_TOAST", toastId: i });
  return (
    Es({
      type: "ADD_TOAST",
      toast: {
        ...e,
        id: i,
        open: !0,
        onOpenChange: (l) => {
          l || s();
        },
      },
    }),
    { id: i, dismiss: s, update: a }
  );
}
function RR() {
  const [e, i] = b.useState(Pl);
  return (
    b.useEffect(
      () => (
        zl.push(i),
        () => {
          const a = zl.indexOf(i);
          a > -1 && zl.splice(a, 1);
        }
      ),
      [e],
    ),
    {
      ...e,
      toast: CR,
      dismiss: (a) => Es({ type: "DISMISS_TOAST", toastId: a }),
    }
  );
}
function Ht(e, i, { checkForDefaultPrevented: a = !0 } = {}) {
  return function (l) {
    if ((e?.(l), a === !1 || !l.defaultPrevented)) return i?.(l);
  };
}
function n0(e, i) {
  if (typeof e == "function") return e(i);
  e != null && (e.current = i);
}
function cu(...e) {
  return (i) => {
    let a = !1;
    const s = e.map((l) => {
      const u = n0(l, i);
      return (!a && typeof u == "function" && (a = !0), u);
    });
    if (a)
      return () => {
        for (let l = 0; l < s.length; l++) {
          const u = s[l];
          typeof u == "function" ? u() : n0(e[l], null);
        }
      };
  };
}
function ot(...e) {
  return b.useCallback(cu(...e), e);
}
function DR(e, i) {
  const a = b.createContext(i),
    s = (u) => {
      const { children: f, ...h } = u,
        m = b.useMemo(() => h, Object.values(h));
      return x.jsx(a.Provider, { value: m, children: f });
    };
  s.displayName = e + "Provider";
  function l(u) {
    const f = b.useContext(a);
    if (f) return f;
    if (i !== void 0) return i;
    throw new Error(`\`${u}\` must be used within \`${e}\``);
  }
  return [s, l];
}
function Ys(e, i = []) {
  let a = [];
  function s(u, f) {
    const h = b.createContext(f),
      m = a.length;
    a = [...a, f];
    const p = (y) => {
      const { scope: S, children: T, ...C } = y,
        E = S?.[e]?.[m] || h,
        A = b.useMemo(() => C, Object.values(C));
      return x.jsx(E.Provider, { value: A, children: T });
    };
    p.displayName = u + "Provider";
    function g(y, S) {
      const T = S?.[e]?.[m] || h,
        C = b.useContext(T);
      if (C) return C;
      if (f !== void 0) return f;
      throw new Error(`\`${y}\` must be used within \`${u}\``);
    }
    return [p, g];
  }
  const l = () => {
    const u = a.map((f) => b.createContext(f));
    return function (h) {
      const m = h?.[e] || u;
      return b.useMemo(() => ({ [`__scope${e}`]: { ...h, [e]: m } }), [h, m]);
    };
  };
  return ((l.scopeName = e), [s, MR(l, ...i)]);
}
function MR(...e) {
  const i = e[0];
  if (e.length === 1) return i;
  const a = () => {
    const s = e.map((l) => ({ useScope: l(), scopeName: l.scopeName }));
    return function (u) {
      const f = s.reduce((h, { useScope: m, scopeName: p }) => {
        const y = m(u)[`__scope${p}`];
        return { ...h, ...y };
      }, {});
      return b.useMemo(() => ({ [`__scope${i.scopeName}`]: f }), [f]);
    };
  };
  return ((a.scopeName = i.scopeName), a);
}
function Vd(e) {
  const i = OR(e),
    a = b.forwardRef((s, l) => {
      const { children: u, ...f } = s,
        h = b.Children.toArray(u),
        m = h.find(jR);
      if (m) {
        const p = m.props.children,
          g = h.map((y) =>
            y === m
              ? b.Children.count(p) > 1
                ? b.Children.only(null)
                : b.isValidElement(p)
                  ? p.props.children
                  : null
              : y,
          );
        return x.jsx(i, {
          ...f,
          ref: l,
          children: b.isValidElement(p) ? b.cloneElement(p, void 0, g) : null,
        });
      }
      return x.jsx(i, { ...f, ref: l, children: u });
    });
  return ((a.displayName = `${e}.Slot`), a);
}
function OR(e) {
  const i = b.forwardRef((a, s) => {
    const { children: l, ...u } = a;
    if (b.isValidElement(l)) {
      const f = LR(l),
        h = _R(u, l.props);
      return (
        l.type !== b.Fragment && (h.ref = s ? cu(s, f) : f),
        b.cloneElement(l, h)
      );
    }
    return b.Children.count(l) > 1 ? b.Children.only(null) : null;
  });
  return ((i.displayName = `${e}.SlotClone`), i);
}
var NR = Symbol("radix.slottable");
function jR(e) {
  return (
    b.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === NR
  );
}
function _R(e, i) {
  const a = { ...i };
  for (const s in i) {
    const l = e[s],
      u = i[s];
    /^on[A-Z]/.test(s)
      ? l && u
        ? (a[s] = (...h) => {
            (u(...h), l(...h));
          })
        : l && (a[s] = l)
      : s === "style"
        ? (a[s] = { ...l, ...u })
        : s === "className" && (a[s] = [l, u].filter(Boolean).join(" "));
  }
  return { ...e, ...a };
}
function LR(e) {
  let i = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    a = i && "isReactWarning" in i && i.isReactWarning;
  return a
    ? e.ref
    : ((i = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (a = i && "isReactWarning" in i && i.isReactWarning),
      a ? e.props.ref : e.props.ref || e.ref);
}
function zR(e) {
  const i = e + "CollectionProvider",
    [a, s] = Ys(i),
    [l, u] = a(i, { collectionRef: { current: null }, itemMap: new Map() }),
    f = (E) => {
      const { scope: A, children: R } = E,
        M = Mi.useRef(null),
        O = Mi.useRef(new Map()).current;
      return x.jsx(l, { scope: A, itemMap: O, collectionRef: M, children: R });
    };
  f.displayName = i;
  const h = e + "CollectionSlot",
    m = Vd(h),
    p = Mi.forwardRef((E, A) => {
      const { scope: R, children: M } = E,
        O = u(h, R),
        V = ot(A, O.collectionRef);
      return x.jsx(m, { ref: V, children: M });
    });
  p.displayName = h;
  const g = e + "CollectionItemSlot",
    y = "data-radix-collection-item",
    S = Vd(g),
    T = Mi.forwardRef((E, A) => {
      const { scope: R, children: M, ...O } = E,
        V = Mi.useRef(null),
        L = ot(A, V),
        $ = u(g, R);
      return (
        Mi.useEffect(
          () => (
            $.itemMap.set(V, { ref: V, ...O }),
            () => void $.itemMap.delete(V)
          ),
        ),
        x.jsx(S, { [y]: "", ref: L, children: M })
      );
    });
  T.displayName = g;
  function C(E) {
    const A = u(e + "CollectionConsumer", E);
    return Mi.useCallback(() => {
      const M = A.collectionRef.current;
      if (!M) return [];
      const O = Array.from(M.querySelectorAll(`[${y}]`));
      return Array.from(A.itemMap.values()).sort(
        ($, H) => O.indexOf($.ref.current) - O.indexOf(H.ref.current),
      );
    }, [A.collectionRef, A.itemMap]);
  }
  return [{ Provider: f, Slot: p, ItemSlot: T }, C, s];
}
var PR = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "span",
    "svg",
    "ul",
  ],
  On = PR.reduce((e, i) => {
    const a = Vd(`Primitive.${i}`),
      s = b.forwardRef((l, u) => {
        const { asChild: f, ...h } = l,
          m = f ? a : i;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          x.jsx(m, { ...h, ref: u })
        );
      });
    return ((s.displayName = `Primitive.${i}`), { ...e, [i]: s });
  }, {});
function Vx(e, i) {
  e && Gs.flushSync(() => e.dispatchEvent(i));
}
function Dt(e) {
  const i = b.useRef(e);
  return (
    b.useEffect(() => {
      i.current = e;
    }),
    b.useMemo(
      () =>
        (...a) =>
          i.current?.(...a),
      [],
    )
  );
}
function kx(e, i = globalThis?.document) {
  const a = Dt(e);
  b.useEffect(() => {
    const s = (l) => {
      l.key === "Escape" && a(l);
    };
    return (
      i.addEventListener("keydown", s, { capture: !0 }),
      () => i.removeEventListener("keydown", s, { capture: !0 })
    );
  }, [a, i]);
}
var VR = "DismissableLayer",
  kd = "dismissableLayer.update",
  kR = "dismissableLayer.pointerDownOutside",
  BR = "dismissableLayer.focusOutside",
  i0,
  Bx = b.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  Ux = b.forwardRef((e, i) => {
    const {
        disableOutsidePointerEvents: a = !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: l,
        onFocusOutside: u,
        onInteractOutside: f,
        onDismiss: h,
        ...m
      } = e,
      p = b.useContext(Bx),
      [g, y] = b.useState(null),
      S = g?.ownerDocument ?? globalThis?.document,
      [, T] = b.useState({}),
      C = ot(i, (H) => y(H)),
      E = Array.from(p.layers),
      [A] = [...p.layersWithOutsidePointerEventsDisabled].slice(-1),
      R = E.indexOf(A),
      M = g ? E.indexOf(g) : -1,
      O = p.layersWithOutsidePointerEventsDisabled.size > 0,
      V = M >= R,
      L = HR((H) => {
        const F = H.target,
          J = [...p.branches].some((se) => se.contains(F));
        !V || J || (l?.(H), f?.(H), H.defaultPrevented || h?.());
      }, S),
      $ = qR((H) => {
        const F = H.target;
        [...p.branches].some((se) => se.contains(F)) ||
          (u?.(H), f?.(H), H.defaultPrevented || h?.());
      }, S);
    return (
      kx((H) => {
        M === p.layers.size - 1 &&
          (s?.(H), !H.defaultPrevented && h && (H.preventDefault(), h()));
      }, S),
      b.useEffect(() => {
        if (g)
          return (
            a &&
              (p.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((i0 = S.body.style.pointerEvents),
                (S.body.style.pointerEvents = "none")),
              p.layersWithOutsidePointerEventsDisabled.add(g)),
            p.layers.add(g),
            a0(),
            () => {
              a &&
                p.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (S.body.style.pointerEvents = i0);
            }
          );
      }, [g, S, a, p]),
      b.useEffect(
        () => () => {
          g &&
            (p.layers.delete(g),
            p.layersWithOutsidePointerEventsDisabled.delete(g),
            a0());
        },
        [g, p],
      ),
      b.useEffect(() => {
        const H = () => T({});
        return (
          document.addEventListener(kd, H),
          () => document.removeEventListener(kd, H)
        );
      }, []),
      x.jsx(On.div, {
        ...m,
        ref: C,
        style: {
          pointerEvents: O ? (V ? "auto" : "none") : void 0,
          ...e.style,
        },
        onFocusCapture: Ht(e.onFocusCapture, $.onFocusCapture),
        onBlurCapture: Ht(e.onBlurCapture, $.onBlurCapture),
        onPointerDownCapture: Ht(
          e.onPointerDownCapture,
          L.onPointerDownCapture,
        ),
      })
    );
  });
Ux.displayName = VR;
var UR = "DismissableLayerBranch",
  Hx = b.forwardRef((e, i) => {
    const a = b.useContext(Bx),
      s = b.useRef(null),
      l = ot(i, s);
    return (
      b.useEffect(() => {
        const u = s.current;
        if (u)
          return (
            a.branches.add(u),
            () => {
              a.branches.delete(u);
            }
          );
      }, [a.branches]),
      x.jsx(On.div, { ...e, ref: l })
    );
  });
Hx.displayName = UR;
function HR(e, i = globalThis?.document) {
  const a = Dt(e),
    s = b.useRef(!1),
    l = b.useRef(() => {});
  return (
    b.useEffect(() => {
      const u = (h) => {
          if (h.target && !s.current) {
            let m = function () {
              qx(kR, a, p, { discrete: !0 });
            };
            const p = { originalEvent: h };
            h.pointerType === "touch"
              ? (i.removeEventListener("click", l.current),
                (l.current = m),
                i.addEventListener("click", l.current, { once: !0 }))
              : m();
          } else i.removeEventListener("click", l.current);
          s.current = !1;
        },
        f = window.setTimeout(() => {
          i.addEventListener("pointerdown", u);
        }, 0);
      return () => {
        (window.clearTimeout(f),
          i.removeEventListener("pointerdown", u),
          i.removeEventListener("click", l.current));
      };
    }, [i, a]),
    { onPointerDownCapture: () => (s.current = !0) }
  );
}
function qR(e, i = globalThis?.document) {
  const a = Dt(e),
    s = b.useRef(!1);
  return (
    b.useEffect(() => {
      const l = (u) => {
        u.target &&
          !s.current &&
          qx(BR, a, { originalEvent: u }, { discrete: !1 });
      };
      return (
        i.addEventListener("focusin", l),
        () => i.removeEventListener("focusin", l)
      );
    }, [i, a]),
    {
      onFocusCapture: () => (s.current = !0),
      onBlurCapture: () => (s.current = !1),
    }
  );
}
function a0() {
  const e = new CustomEvent(kd);
  document.dispatchEvent(e);
}
function qx(e, i, a, { discrete: s }) {
  const l = a.originalEvent.target,
    u = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: a });
  (i && l.addEventListener(e, i, { once: !0 }),
    s ? Vx(l, u) : l.dispatchEvent(u));
}
var FR = Ux,
  GR = Hx,
  rn = globalThis?.document ? b.useLayoutEffect : () => {},
  YR = "Portal",
  Fx = b.forwardRef((e, i) => {
    const { container: a, ...s } = e,
      [l, u] = b.useState(!1);
    rn(() => u(!0), []);
    const f = a || (l && globalThis?.document?.body);
    return f ? Mx.createPortal(x.jsx(On.div, { ...s, ref: i }), f) : null;
  });
Fx.displayName = YR;
function IR(e, i) {
  return b.useReducer((a, s) => i[a][s] ?? a, e);
}
var Gx = (e) => {
  const { present: i, children: a } = e,
    s = XR(i),
    l =
      typeof a == "function" ? a({ present: s.isPresent }) : b.Children.only(a),
    u = ot(s.ref, KR(l));
  return typeof a == "function" || s.isPresent
    ? b.cloneElement(l, { ref: u })
    : null;
};
Gx.displayName = "Presence";
function XR(e) {
  const [i, a] = b.useState(),
    s = b.useRef({}),
    l = b.useRef(e),
    u = b.useRef("none"),
    f = e ? "mounted" : "unmounted",
    [h, m] = IR(f, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    b.useEffect(() => {
      const p = vl(s.current);
      u.current = h === "mounted" ? p : "none";
    }, [h]),
    rn(() => {
      const p = s.current,
        g = l.current;
      if (g !== e) {
        const S = u.current,
          T = vl(p);
        (e
          ? m("MOUNT")
          : T === "none" || p?.display === "none"
            ? m("UNMOUNT")
            : m(g && S !== T ? "ANIMATION_OUT" : "UNMOUNT"),
          (l.current = e));
      }
    }, [e, m]),
    rn(() => {
      if (i) {
        let p;
        const g = i.ownerDocument.defaultView ?? window,
          y = (T) => {
            const E = vl(s.current).includes(T.animationName);
            if (T.target === i && E && (m("ANIMATION_END"), !l.current)) {
              const A = i.style.animationFillMode;
              ((i.style.animationFillMode = "forwards"),
                (p = g.setTimeout(() => {
                  i.style.animationFillMode === "forwards" &&
                    (i.style.animationFillMode = A);
                })));
            }
          },
          S = (T) => {
            T.target === i && (u.current = vl(s.current));
          };
        return (
          i.addEventListener("animationstart", S),
          i.addEventListener("animationcancel", y),
          i.addEventListener("animationend", y),
          () => {
            (g.clearTimeout(p),
              i.removeEventListener("animationstart", S),
              i.removeEventListener("animationcancel", y),
              i.removeEventListener("animationend", y));
          }
        );
      } else m("ANIMATION_END");
    }, [i, m]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(h),
      ref: b.useCallback((p) => {
        (p && (s.current = getComputedStyle(p)), a(p));
      }, []),
    }
  );
}
function vl(e) {
  return e?.animationName || "none";
}
function KR(e) {
  let i = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    a = i && "isReactWarning" in i && i.isReactWarning;
  return a
    ? e.ref
    : ((i = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (a = i && "isReactWarning" in i && i.isReactWarning),
      a ? e.props.ref : e.props.ref || e.ref);
}
function $R({ prop: e, defaultProp: i, onChange: a = () => {} }) {
  const [s, l] = QR({ defaultProp: i, onChange: a }),
    u = e !== void 0,
    f = u ? e : s,
    h = Dt(a),
    m = b.useCallback(
      (p) => {
        if (u) {
          const y = typeof p == "function" ? p(e) : p;
          y !== e && h(y);
        } else l(p);
      },
      [u, e, l, h],
    );
  return [f, m];
}
function QR({ defaultProp: e, onChange: i }) {
  const a = b.useState(e),
    [s] = a,
    l = b.useRef(s),
    u = Dt(i);
  return (
    b.useEffect(() => {
      l.current !== s && (u(s), (l.current = s));
    }, [s, l, u]),
    a
  );
}
var ZR = "VisuallyHidden",
  Dh = b.forwardRef((e, i) =>
    x.jsx(On.span, {
      ...e,
      ref: i,
      style: {
        position: "absolute",
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal",
        ...e.style,
      },
    }),
  );
Dh.displayName = ZR;
var Mh = "ToastProvider",
  [Oh, WR, JR] = zR("Toast"),
  [Yx] = Ys("Toast", [JR]),
  [eD, fu] = Yx(Mh),
  Ix = (e) => {
    const {
        __scopeToast: i,
        label: a = "Notification",
        duration: s = 5e3,
        swipeDirection: l = "right",
        swipeThreshold: u = 50,
        children: f,
      } = e,
      [h, m] = b.useState(null),
      [p, g] = b.useState(0),
      y = b.useRef(!1),
      S = b.useRef(!1);
    return (
      a.trim() ||
        console.error(
          `Invalid prop \`label\` supplied to \`${Mh}\`. Expected non-empty \`string\`.`,
        ),
      x.jsx(Oh.Provider, {
        scope: i,
        children: x.jsx(eD, {
          scope: i,
          label: a,
          duration: s,
          swipeDirection: l,
          swipeThreshold: u,
          toastCount: p,
          viewport: h,
          onViewportChange: m,
          onToastAdd: b.useCallback(() => g((T) => T + 1), []),
          onToastRemove: b.useCallback(() => g((T) => T - 1), []),
          isFocusedToastEscapeKeyDownRef: y,
          isClosePausedRef: S,
          children: f,
        }),
      })
    );
  };
Ix.displayName = Mh;
var Xx = "ToastViewport",
  tD = ["F8"],
  Bd = "toast.viewportPause",
  Ud = "toast.viewportResume",
  Kx = b.forwardRef((e, i) => {
    const {
        __scopeToast: a,
        hotkey: s = tD,
        label: l = "Notifications ({hotkey})",
        ...u
      } = e,
      f = fu(Xx, a),
      h = WR(a),
      m = b.useRef(null),
      p = b.useRef(null),
      g = b.useRef(null),
      y = b.useRef(null),
      S = ot(i, y, f.onViewportChange),
      T = s.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
      C = f.toastCount > 0;
    (b.useEffect(() => {
      const A = (R) => {
        s.length !== 0 &&
          s.every((O) => R[O] || R.code === O) &&
          y.current?.focus();
      };
      return (
        document.addEventListener("keydown", A),
        () => document.removeEventListener("keydown", A)
      );
    }, [s]),
      b.useEffect(() => {
        const A = m.current,
          R = y.current;
        if (C && A && R) {
          const M = () => {
              if (!f.isClosePausedRef.current) {
                const $ = new CustomEvent(Bd);
                (R.dispatchEvent($), (f.isClosePausedRef.current = !0));
              }
            },
            O = () => {
              if (f.isClosePausedRef.current) {
                const $ = new CustomEvent(Ud);
                (R.dispatchEvent($), (f.isClosePausedRef.current = !1));
              }
            },
            V = ($) => {
              !A.contains($.relatedTarget) && O();
            },
            L = () => {
              A.contains(document.activeElement) || O();
            };
          return (
            A.addEventListener("focusin", M),
            A.addEventListener("focusout", V),
            A.addEventListener("pointermove", M),
            A.addEventListener("pointerleave", L),
            window.addEventListener("blur", M),
            window.addEventListener("focus", O),
            () => {
              (A.removeEventListener("focusin", M),
                A.removeEventListener("focusout", V),
                A.removeEventListener("pointermove", M),
                A.removeEventListener("pointerleave", L),
                window.removeEventListener("blur", M),
                window.removeEventListener("focus", O));
            }
          );
        }
      }, [C, f.isClosePausedRef]));
    const E = b.useCallback(
      ({ tabbingDirection: A }) => {
        const M = h().map((O) => {
          const V = O.ref.current,
            L = [V, ...mD(V)];
          return A === "forwards" ? L : L.reverse();
        });
        return (A === "forwards" ? M.reverse() : M).flat();
      },
      [h],
    );
    return (
      b.useEffect(() => {
        const A = y.current;
        if (A) {
          const R = (M) => {
            const O = M.altKey || M.ctrlKey || M.metaKey;
            if (M.key === "Tab" && !O) {
              const L = document.activeElement,
                $ = M.shiftKey;
              if (M.target === A && $) {
                p.current?.focus();
                return;
              }
              const J = E({ tabbingDirection: $ ? "backwards" : "forwards" }),
                se = J.findIndex((me) => me === L);
              Jf(J.slice(se + 1))
                ? M.preventDefault()
                : $
                  ? p.current?.focus()
                  : g.current?.focus();
            }
          };
          return (
            A.addEventListener("keydown", R),
            () => A.removeEventListener("keydown", R)
          );
        }
      }, [h, E]),
      x.jsxs(GR, {
        ref: m,
        role: "region",
        "aria-label": l.replace("{hotkey}", T),
        tabIndex: -1,
        style: { pointerEvents: C ? void 0 : "none" },
        children: [
          C &&
            x.jsx(Hd, {
              ref: p,
              onFocusFromOutsideViewport: () => {
                const A = E({ tabbingDirection: "forwards" });
                Jf(A);
              },
            }),
          x.jsx(Oh.Slot, {
            scope: a,
            children: x.jsx(On.ol, { tabIndex: -1, ...u, ref: S }),
          }),
          C &&
            x.jsx(Hd, {
              ref: g,
              onFocusFromOutsideViewport: () => {
                const A = E({ tabbingDirection: "backwards" });
                Jf(A);
              },
            }),
        ],
      })
    );
  });
Kx.displayName = Xx;
var $x = "ToastFocusProxy",
  Hd = b.forwardRef((e, i) => {
    const { __scopeToast: a, onFocusFromOutsideViewport: s, ...l } = e,
      u = fu($x, a);
    return x.jsx(Dh, {
      "aria-hidden": !0,
      tabIndex: 0,
      ...l,
      ref: i,
      style: { position: "fixed" },
      onFocus: (f) => {
        const h = f.relatedTarget;
        !u.viewport?.contains(h) && s();
      },
    });
  });
Hd.displayName = $x;
var du = "Toast",
  nD = "toast.swipeStart",
  iD = "toast.swipeMove",
  aD = "toast.swipeCancel",
  rD = "toast.swipeEnd",
  Qx = b.forwardRef((e, i) => {
    const { forceMount: a, open: s, defaultOpen: l, onOpenChange: u, ...f } = e,
      [h = !0, m] = $R({ prop: s, defaultProp: l, onChange: u });
    return x.jsx(Gx, {
      present: a || h,
      children: x.jsx(lD, {
        open: h,
        ...f,
        ref: i,
        onClose: () => m(!1),
        onPause: Dt(e.onPause),
        onResume: Dt(e.onResume),
        onSwipeStart: Ht(e.onSwipeStart, (p) => {
          p.currentTarget.setAttribute("data-swipe", "start");
        }),
        onSwipeMove: Ht(e.onSwipeMove, (p) => {
          const { x: g, y } = p.detail.delta;
          (p.currentTarget.setAttribute("data-swipe", "move"),
            p.currentTarget.style.setProperty(
              "--radix-toast-swipe-move-x",
              `${g}px`,
            ),
            p.currentTarget.style.setProperty(
              "--radix-toast-swipe-move-y",
              `${y}px`,
            ));
        }),
        onSwipeCancel: Ht(e.onSwipeCancel, (p) => {
          (p.currentTarget.setAttribute("data-swipe", "cancel"),
            p.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
            p.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
            p.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),
            p.currentTarget.style.removeProperty("--radix-toast-swipe-end-y"));
        }),
        onSwipeEnd: Ht(e.onSwipeEnd, (p) => {
          const { x: g, y } = p.detail.delta;
          (p.currentTarget.setAttribute("data-swipe", "end"),
            p.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
            p.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
            p.currentTarget.style.setProperty(
              "--radix-toast-swipe-end-x",
              `${g}px`,
            ),
            p.currentTarget.style.setProperty(
              "--radix-toast-swipe-end-y",
              `${y}px`,
            ),
            m(!1));
        }),
      }),
    });
  });
Qx.displayName = du;
var [sD, oD] = Yx(du, { onClose() {} }),
  lD = b.forwardRef((e, i) => {
    const {
        __scopeToast: a,
        type: s = "foreground",
        duration: l,
        open: u,
        onClose: f,
        onEscapeKeyDown: h,
        onPause: m,
        onResume: p,
        onSwipeStart: g,
        onSwipeMove: y,
        onSwipeCancel: S,
        onSwipeEnd: T,
        ...C
      } = e,
      E = fu(du, a),
      [A, R] = b.useState(null),
      M = ot(i, (ee) => R(ee)),
      O = b.useRef(null),
      V = b.useRef(null),
      L = l || E.duration,
      $ = b.useRef(0),
      H = b.useRef(L),
      F = b.useRef(0),
      { onToastAdd: J, onToastRemove: se } = E,
      me = Dt(() => {
        (A?.contains(document.activeElement) && E.viewport?.focus(), f());
      }),
      ge = b.useCallback(
        (ee) => {
          !ee ||
            ee === 1 / 0 ||
            (window.clearTimeout(F.current),
            ($.current = new Date().getTime()),
            (F.current = window.setTimeout(me, ee)));
        },
        [me],
      );
    (b.useEffect(() => {
      const ee = E.viewport;
      if (ee) {
        const he = () => {
            (ge(H.current), p?.());
          },
          z = () => {
            const G = new Date().getTime() - $.current;
            ((H.current = H.current - G),
              window.clearTimeout(F.current),
              m?.());
          };
        return (
          ee.addEventListener(Bd, z),
          ee.addEventListener(Ud, he),
          () => {
            (ee.removeEventListener(Bd, z), ee.removeEventListener(Ud, he));
          }
        );
      }
    }, [E.viewport, L, m, p, ge]),
      b.useEffect(() => {
        u && !E.isClosePausedRef.current && ge(L);
      }, [u, L, E.isClosePausedRef, ge]),
      b.useEffect(() => (J(), () => se()), [J, se]));
    const Ae = b.useMemo(() => (A ? i1(A) : null), [A]);
    return E.viewport
      ? x.jsxs(x.Fragment, {
          children: [
            Ae &&
              x.jsx(uD, {
                __scopeToast: a,
                role: "status",
                "aria-live": s === "foreground" ? "assertive" : "polite",
                "aria-atomic": !0,
                children: Ae,
              }),
            x.jsx(sD, {
              scope: a,
              onClose: me,
              children: Gs.createPortal(
                x.jsx(Oh.ItemSlot, {
                  scope: a,
                  children: x.jsx(FR, {
                    asChild: !0,
                    onEscapeKeyDown: Ht(h, () => {
                      (E.isFocusedToastEscapeKeyDownRef.current || me(),
                        (E.isFocusedToastEscapeKeyDownRef.current = !1));
                    }),
                    children: x.jsx(On.li, {
                      role: "status",
                      "aria-live": "off",
                      "aria-atomic": !0,
                      tabIndex: 0,
                      "data-state": u ? "open" : "closed",
                      "data-swipe-direction": E.swipeDirection,
                      ...C,
                      ref: M,
                      style: {
                        userSelect: "none",
                        touchAction: "none",
                        ...e.style,
                      },
                      onKeyDown: Ht(e.onKeyDown, (ee) => {
                        ee.key === "Escape" &&
                          (h?.(ee.nativeEvent),
                          ee.nativeEvent.defaultPrevented ||
                            ((E.isFocusedToastEscapeKeyDownRef.current = !0),
                            me()));
                      }),
                      onPointerDown: Ht(e.onPointerDown, (ee) => {
                        ee.button === 0 &&
                          (O.current = { x: ee.clientX, y: ee.clientY });
                      }),
                      onPointerMove: Ht(e.onPointerMove, (ee) => {
                        if (!O.current) return;
                        const he = ee.clientX - O.current.x,
                          z = ee.clientY - O.current.y,
                          G = !!V.current,
                          U = ["left", "right"].includes(E.swipeDirection),
                          ae = ["left", "up"].includes(E.swipeDirection)
                            ? Math.min
                            : Math.max,
                          ce = U ? ae(0, he) : 0,
                          N = U ? 0 : ae(0, z),
                          I = ee.pointerType === "touch" ? 10 : 2,
                          Z = { x: ce, y: N },
                          W = { originalEvent: ee, delta: Z };
                        G
                          ? ((V.current = Z), bl(iD, y, W, { discrete: !1 }))
                          : r0(Z, E.swipeDirection, I)
                            ? ((V.current = Z),
                              bl(nD, g, W, { discrete: !1 }),
                              ee.target.setPointerCapture(ee.pointerId))
                            : (Math.abs(he) > I || Math.abs(z) > I) &&
                              (O.current = null);
                      }),
                      onPointerUp: Ht(e.onPointerUp, (ee) => {
                        const he = V.current,
                          z = ee.target;
                        if (
                          (z.hasPointerCapture(ee.pointerId) &&
                            z.releasePointerCapture(ee.pointerId),
                          (V.current = null),
                          (O.current = null),
                          he)
                        ) {
                          const G = ee.currentTarget,
                            U = { originalEvent: ee, delta: he };
                          (r0(he, E.swipeDirection, E.swipeThreshold)
                            ? bl(rD, T, U, { discrete: !0 })
                            : bl(aD, S, U, { discrete: !0 }),
                            G.addEventListener(
                              "click",
                              (ae) => ae.preventDefault(),
                              { once: !0 },
                            ));
                        }
                      }),
                    }),
                  }),
                }),
                E.viewport,
              ),
            }),
          ],
        })
      : null;
  }),
  uD = (e) => {
    const { __scopeToast: i, children: a, ...s } = e,
      l = fu(du, i),
      [u, f] = b.useState(!1),
      [h, m] = b.useState(!1);
    return (
      dD(() => f(!0)),
      b.useEffect(() => {
        const p = window.setTimeout(() => m(!0), 1e3);
        return () => window.clearTimeout(p);
      }, []),
      h
        ? null
        : x.jsx(Fx, {
            asChild: !0,
            children: x.jsx(Dh, {
              ...s,
              children:
                u && x.jsxs(x.Fragment, { children: [l.label, " ", a] }),
            }),
          })
    );
  },
  cD = "ToastTitle",
  Zx = b.forwardRef((e, i) => {
    const { __scopeToast: a, ...s } = e;
    return x.jsx(On.div, { ...s, ref: i });
  });
Zx.displayName = cD;
var fD = "ToastDescription",
  Wx = b.forwardRef((e, i) => {
    const { __scopeToast: a, ...s } = e;
    return x.jsx(On.div, { ...s, ref: i });
  });
Wx.displayName = fD;
var Jx = "ToastAction",
  e1 = b.forwardRef((e, i) => {
    const { altText: a, ...s } = e;
    return a.trim()
      ? x.jsx(n1, {
          altText: a,
          asChild: !0,
          children: x.jsx(Nh, { ...s, ref: i }),
        })
      : (console.error(
          `Invalid prop \`altText\` supplied to \`${Jx}\`. Expected non-empty \`string\`.`,
        ),
        null);
  });
e1.displayName = Jx;
var t1 = "ToastClose",
  Nh = b.forwardRef((e, i) => {
    const { __scopeToast: a, ...s } = e,
      l = oD(t1, a);
    return x.jsx(n1, {
      asChild: !0,
      children: x.jsx(On.button, {
        type: "button",
        ...s,
        ref: i,
        onClick: Ht(e.onClick, l.onClose),
      }),
    });
  });
Nh.displayName = t1;
var n1 = b.forwardRef((e, i) => {
  const { __scopeToast: a, altText: s, ...l } = e;
  return x.jsx(On.div, {
    "data-radix-toast-announce-exclude": "",
    "data-radix-toast-announce-alt": s || void 0,
    ...l,
    ref: i,
  });
});
function i1(e) {
  const i = [];
  return (
    Array.from(e.childNodes).forEach((s) => {
      if (
        (s.nodeType === s.TEXT_NODE && s.textContent && i.push(s.textContent),
        hD(s))
      ) {
        const l = s.ariaHidden || s.hidden || s.style.display === "none",
          u = s.dataset.radixToastAnnounceExclude === "";
        if (!l)
          if (u) {
            const f = s.dataset.radixToastAnnounceAlt;
            f && i.push(f);
          } else i.push(...i1(s));
      }
    }),
    i
  );
}
function bl(e, i, a, { discrete: s }) {
  const l = a.originalEvent.currentTarget,
    u = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: a });
  (i && l.addEventListener(e, i, { once: !0 }),
    s ? Vx(l, u) : l.dispatchEvent(u));
}
var r0 = (e, i, a = 0) => {
  const s = Math.abs(e.x),
    l = Math.abs(e.y),
    u = s > l;
  return i === "left" || i === "right" ? u && s > a : !u && l > a;
};
function dD(e = () => {}) {
  const i = Dt(e);
  rn(() => {
    let a = 0,
      s = 0;
    return (
      (a = window.requestAnimationFrame(
        () => (s = window.requestAnimationFrame(i)),
      )),
      () => {
        (window.cancelAnimationFrame(a), window.cancelAnimationFrame(s));
      }
    );
  }, [i]);
}
function hD(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function mD(e) {
  const i = [],
    a = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (s) => {
        const l = s.tagName === "INPUT" && s.type === "hidden";
        return s.disabled || s.hidden || l
          ? NodeFilter.FILTER_SKIP
          : s.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; a.nextNode(); ) i.push(a.currentNode);
  return i;
}
function Jf(e) {
  const i = document.activeElement;
  return e.some((a) =>
    a === i ? !0 : (a.focus(), document.activeElement !== i),
  );
}
var pD = Ix,
  a1 = Kx,
  r1 = Qx,
  s1 = Zx,
  o1 = Wx,
  l1 = e1,
  u1 = Nh;
function c1(e) {
  var i,
    a,
    s = "";
  if (typeof e == "string" || typeof e == "number") s += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var l = e.length;
      for (i = 0; i < l; i++)
        e[i] && (a = c1(e[i])) && (s && (s += " "), (s += a));
    } else for (a in e) e[a] && (s && (s += " "), (s += a));
  return s;
}
function f1() {
  for (var e, i, a = 0, s = "", l = arguments.length; a < l; a++)
    (e = arguments[a]) && (i = c1(e)) && (s && (s += " "), (s += i));
  return s;
}
const s0 = (e) => (typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e),
  o0 = f1,
  gD = (e, i) => (a) => {
    var s;
    if (i?.variants == null) return o0(e, a?.class, a?.className);
    const { variants: l, defaultVariants: u } = i,
      f = Object.keys(l).map((p) => {
        const g = a?.[p],
          y = u?.[p];
        if (g === null) return null;
        const S = s0(g) || s0(y);
        return l[p][S];
      }),
      h =
        a &&
        Object.entries(a).reduce((p, g) => {
          let [y, S] = g;
          return (S === void 0 || (p[y] = S), p);
        }, {}),
      m =
        i == null || (s = i.compoundVariants) === null || s === void 0
          ? void 0
          : s.reduce((p, g) => {
              let { class: y, className: S, ...T } = g;
              return Object.entries(T).every((C) => {
                let [E, A] = C;
                return Array.isArray(A)
                  ? A.includes({ ...u, ...h }[E])
                  : { ...u, ...h }[E] === A;
              })
                ? [...p, y, S]
                : p;
            }, []);
    return o0(e, f, m, a?.class, a?.className);
  };
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const yD = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  vD = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (i, a, s) =>
      s ? s.toUpperCase() : a.toLowerCase(),
    ),
  l0 = (e) => {
    const i = vD(e);
    return i.charAt(0).toUpperCase() + i.slice(1);
  },
  d1 = (...e) =>
    e
      .filter((i, a, s) => !!i && i.trim() !== "" && s.indexOf(i) === a)
      .join(" ")
      .trim(),
  bD = (e) => {
    for (const i in e)
      if (i.startsWith("aria-") || i === "role" || i === "title") return !0;
  };
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var xD = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const SD = b.forwardRef(
  (
    {
      color: e = "currentColor",
      size: i = 24,
      strokeWidth: a = 2,
      absoluteStrokeWidth: s,
      className: l = "",
      children: u,
      iconNode: f,
      ...h
    },
    m,
  ) =>
    b.createElement(
      "svg",
      {
        ref: m,
        ...xD,
        width: i,
        height: i,
        stroke: e,
        strokeWidth: s ? (Number(a) * 24) / Number(i) : a,
        className: d1("lucide", l),
        ...(!u && !bD(h) && { "aria-hidden": "true" }),
        ...h,
      },
      [
        ...f.map(([p, g]) => b.createElement(p, g)),
        ...(Array.isArray(u) ? u : [u]),
      ],
    ),
);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const tt = (e, i) => {
  const a = b.forwardRef(({ className: s, ...l }, u) =>
    b.createElement(SD, {
      ref: u,
      iconNode: i,
      className: d1(`lucide-${yD(l0(e))}`, `lucide-${e}`, s),
      ...l,
    }),
  );
  return ((a.displayName = l0(e)), a);
};
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const wD = [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }],
  ],
  ED = tt("arrow-left", wD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const TD = [
    ["path", { d: "M7 7h10v10", key: "1tivn9" }],
    ["path", { d: "M7 17 17 7", key: "1vkiza" }],
  ],
  AD = tt("arrow-up-right", TD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const CD = [
    [
      "path",
      {
        d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
        key: "1yiouv",
      },
    ],
    ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }],
  ],
  u0 = tt("award", CD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const RD = [
    ["path", { d: "M12 7v14", key: "1akyts" }],
    [
      "path",
      {
        d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
        key: "ruj8y",
      },
    ],
  ],
  DD = tt("book-open", RD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const MD = [
    ["path", { d: "M12 18V5", key: "adv99a" }],
    [
      "path",
      { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" },
    ],
    [
      "path",
      { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" },
    ],
    ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
    ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
    [
      "path",
      {
        d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517",
        key: "1gq6am",
      },
    ],
    ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
    ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }],
  ],
  h1 = tt("brain", MD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const OD = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
  ],
  ND = tt("circle-alert", OD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const jD = [
    [
      "path",
      {
        d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
        key: "p7xjir",
      },
    ],
  ],
  _D = tt("cloud", jD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const LD = [
    ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
    ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
    ["path", { d: "m14.5 4-5 16", key: "e7oirm" }],
  ],
  jh = tt("code-xml", LD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const zD = [
    ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
    ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
    ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }],
  ],
  PD = tt("database", zD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const VD = [
    [
      "path",
      {
        d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
        key: "j76jl0",
      },
    ],
    ["path", { d: "M22 10v6", key: "1lu8f3" }],
    ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }],
  ],
  kD = tt("graduation-cap", VD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const BD = [
    [
      "path",
      {
        d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
        key: "zw3jo",
      },
    ],
    [
      "path",
      {
        d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
        key: "1wduqc",
      },
    ],
    [
      "path",
      {
        d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
        key: "kqbvx6",
      },
    ],
  ],
  UD = tt("layers", BD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const HD = [
    [
      "path",
      {
        d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
        key: "c2jq9f",
      },
    ],
    ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
    ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }],
  ],
  qD = tt("linkedin", HD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const FD = [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
    [
      "rect",
      { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" },
    ],
  ],
  GD = tt("mail", FD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const YD = [
    [
      "path",
      {
        d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
        key: "kfwtm",
      },
    ],
  ],
  ID = tt("moon", YD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const XD = [
    [
      "path",
      {
        d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
        key: "1a0edw",
      },
    ],
    ["path", { d: "M12 22V12", key: "d0xqtd" }],
    ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
    ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ],
  KD = tt("package", XD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $D = [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s",
      },
    ],
  ],
  QD = tt("star", $D);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ZD = [
    ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
    ["path", { d: "M12 2v2", key: "tus03m" }],
    ["path", { d: "M12 20v2", key: "1lh1kg" }],
    ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
    ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
    ["path", { d: "M2 12h2", key: "1t8f8n" }],
    ["path", { d: "M20 12h2", key: "1q8mjw" }],
    ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
    ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }],
  ],
  WD = tt("sun", ZD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const JD = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
    ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ],
  eM = tt("target", JD);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const tM = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  m1 = tt("x", tM);
/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const nM = [
    [
      "path",
      {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
        key: "1xq2db",
      },
    ],
  ],
  p1 = tt("zap", nM),
  _h = "-",
  iM = (e) => {
    const i = rM(e),
      { conflictingClassGroups: a, conflictingClassGroupModifiers: s } = e;
    return {
      getClassGroupId: (f) => {
        const h = f.split(_h);
        return (h[0] === "" && h.length !== 1 && h.shift(), g1(h, i) || aM(f));
      },
      getConflictingClassGroupIds: (f, h) => {
        const m = a[f] || [];
        return h && s[f] ? [...m, ...s[f]] : m;
      },
    };
  },
  g1 = (e, i) => {
    if (e.length === 0) return i.classGroupId;
    const a = e[0],
      s = i.nextPart.get(a),
      l = s ? g1(e.slice(1), s) : void 0;
    if (l) return l;
    if (i.validators.length === 0) return;
    const u = e.join(_h);
    return i.validators.find(({ validator: f }) => f(u))?.classGroupId;
  },
  c0 = /^\[(.+)\]$/,
  aM = (e) => {
    if (c0.test(e)) {
      const i = c0.exec(e)[1],
        a = i?.substring(0, i.indexOf(":"));
      if (a) return "arbitrary.." + a;
    }
  },
  rM = (e) => {
    const { theme: i, classGroups: a } = e,
      s = { nextPart: new Map(), validators: [] };
    for (const l in a) qd(a[l], s, l, i);
    return s;
  },
  qd = (e, i, a, s) => {
    e.forEach((l) => {
      if (typeof l == "string") {
        const u = l === "" ? i : f0(i, l);
        u.classGroupId = a;
        return;
      }
      if (typeof l == "function") {
        if (sM(l)) {
          qd(l(s), i, a, s);
          return;
        }
        i.validators.push({ validator: l, classGroupId: a });
        return;
      }
      Object.entries(l).forEach(([u, f]) => {
        qd(f, f0(i, u), a, s);
      });
    });
  },
  f0 = (e, i) => {
    let a = e;
    return (
      i.split(_h).forEach((s) => {
        (a.nextPart.has(s) ||
          a.nextPart.set(s, { nextPart: new Map(), validators: [] }),
          (a = a.nextPart.get(s)));
      }),
      a
    );
  },
  sM = (e) => e.isThemeGetter,
  oM = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let i = 0,
      a = new Map(),
      s = new Map();
    const l = (u, f) => {
      (a.set(u, f), i++, i > e && ((i = 0), (s = a), (a = new Map())));
    };
    return {
      get(u) {
        let f = a.get(u);
        if (f !== void 0) return f;
        if ((f = s.get(u)) !== void 0) return (l(u, f), f);
      },
      set(u, f) {
        a.has(u) ? a.set(u, f) : l(u, f);
      },
    };
  },
  Fd = "!",
  Gd = ":",
  lM = Gd.length,
  uM = (e) => {
    const { prefix: i, experimentalParseClassName: a } = e;
    let s = (l) => {
      const u = [];
      let f = 0,
        h = 0,
        m = 0,
        p;
      for (let C = 0; C < l.length; C++) {
        let E = l[C];
        if (f === 0 && h === 0) {
          if (E === Gd) {
            (u.push(l.slice(m, C)), (m = C + lM));
            continue;
          }
          if (E === "/") {
            p = C;
            continue;
          }
        }
        E === "[" ? f++ : E === "]" ? f-- : E === "(" ? h++ : E === ")" && h--;
      }
      const g = u.length === 0 ? l : l.substring(m),
        y = cM(g),
        S = y !== g,
        T = p && p > m ? p - m : void 0;
      return {
        modifiers: u,
        hasImportantModifier: S,
        baseClassName: y,
        maybePostfixModifierPosition: T,
      };
    };
    if (i) {
      const l = i + Gd,
        u = s;
      s = (f) =>
        f.startsWith(l)
          ? u(f.substring(l.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: f,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (a) {
      const l = s;
      s = (u) => a({ className: u, parseClassName: l });
    }
    return s;
  },
  cM = (e) =>
    e.endsWith(Fd)
      ? e.substring(0, e.length - 1)
      : e.startsWith(Fd)
        ? e.substring(1)
        : e,
  fM = (e) => {
    const i = Object.fromEntries(e.orderSensitiveModifiers.map((s) => [s, !0]));
    return (s) => {
      if (s.length <= 1) return s;
      const l = [];
      let u = [];
      return (
        s.forEach((f) => {
          f[0] === "[" || i[f] ? (l.push(...u.sort(), f), (u = [])) : u.push(f);
        }),
        l.push(...u.sort()),
        l
      );
    };
  },
  dM = (e) => ({
    cache: oM(e.cacheSize),
    parseClassName: uM(e),
    sortModifiers: fM(e),
    ...iM(e),
  }),
  hM = /\s+/,
  mM = (e, i) => {
    const {
        parseClassName: a,
        getClassGroupId: s,
        getConflictingClassGroupIds: l,
        sortModifiers: u,
      } = i,
      f = [],
      h = e.trim().split(hM);
    let m = "";
    for (let p = h.length - 1; p >= 0; p -= 1) {
      const g = h[p],
        {
          isExternal: y,
          modifiers: S,
          hasImportantModifier: T,
          baseClassName: C,
          maybePostfixModifierPosition: E,
        } = a(g);
      if (y) {
        m = g + (m.length > 0 ? " " + m : m);
        continue;
      }
      let A = !!E,
        R = s(A ? C.substring(0, E) : C);
      if (!R) {
        if (!A) {
          m = g + (m.length > 0 ? " " + m : m);
          continue;
        }
        if (((R = s(C)), !R)) {
          m = g + (m.length > 0 ? " " + m : m);
          continue;
        }
        A = !1;
      }
      const M = u(S).join(":"),
        O = T ? M + Fd : M,
        V = O + R;
      if (f.includes(V)) continue;
      f.push(V);
      const L = l(R, A);
      for (let $ = 0; $ < L.length; ++$) {
        const H = L[$];
        f.push(O + H);
      }
      m = g + (m.length > 0 ? " " + m : m);
    }
    return m;
  };
function pM() {
  let e = 0,
    i,
    a,
    s = "";
  for (; e < arguments.length; )
    (i = arguments[e++]) && (a = y1(i)) && (s && (s += " "), (s += a));
  return s;
}
const y1 = (e) => {
  if (typeof e == "string") return e;
  let i,
    a = "";
  for (let s = 0; s < e.length; s++)
    e[s] && (i = y1(e[s])) && (a && (a += " "), (a += i));
  return a;
};
function gM(e, ...i) {
  let a,
    s,
    l,
    u = f;
  function f(m) {
    const p = i.reduce((g, y) => y(g), e());
    return ((a = dM(p)), (s = a.cache.get), (l = a.cache.set), (u = h), h(m));
  }
  function h(m) {
    const p = s(m);
    if (p) return p;
    const g = mM(m, a);
    return (l(m, g), g);
  }
  return function () {
    return u(pM.apply(null, arguments));
  };
}
const it = (e) => {
    const i = (a) => a[e] || [];
    return ((i.isThemeGetter = !0), i);
  },
  v1 = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  b1 = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  yM = /^\d+\/\d+$/,
  vM = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  bM =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  xM = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  SM = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  wM =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Za = (e) => yM.test(e),
  xe = (e) => !!e && !Number.isNaN(Number(e)),
  Di = (e) => !!e && Number.isInteger(Number(e)),
  ed = (e) => e.endsWith("%") && xe(e.slice(0, -1)),
  Qn = (e) => vM.test(e),
  EM = () => !0,
  TM = (e) => bM.test(e) && !xM.test(e),
  x1 = () => !1,
  AM = (e) => SM.test(e),
  CM = (e) => wM.test(e),
  RM = (e) => !ne(e) && !ie(e),
  DM = (e) => gr(e, E1, x1),
  ne = (e) => v1.test(e),
  na = (e) => gr(e, T1, TM),
  td = (e) => gr(e, _M, xe),
  d0 = (e) => gr(e, S1, x1),
  MM = (e) => gr(e, w1, CM),
  xl = (e) => gr(e, A1, AM),
  ie = (e) => b1.test(e),
  bs = (e) => yr(e, T1),
  OM = (e) => yr(e, LM),
  h0 = (e) => yr(e, S1),
  NM = (e) => yr(e, E1),
  jM = (e) => yr(e, w1),
  Sl = (e) => yr(e, A1, !0),
  gr = (e, i, a) => {
    const s = v1.exec(e);
    return s ? (s[1] ? i(s[1]) : a(s[2])) : !1;
  },
  yr = (e, i, a = !1) => {
    const s = b1.exec(e);
    return s ? (s[1] ? i(s[1]) : a) : !1;
  },
  S1 = (e) => e === "position" || e === "percentage",
  w1 = (e) => e === "image" || e === "url",
  E1 = (e) => e === "length" || e === "size" || e === "bg-size",
  T1 = (e) => e === "length",
  _M = (e) => e === "number",
  LM = (e) => e === "family-name",
  A1 = (e) => e === "shadow",
  zM = () => {
    const e = it("color"),
      i = it("font"),
      a = it("text"),
      s = it("font-weight"),
      l = it("tracking"),
      u = it("leading"),
      f = it("breakpoint"),
      h = it("container"),
      m = it("spacing"),
      p = it("radius"),
      g = it("shadow"),
      y = it("inset-shadow"),
      S = it("text-shadow"),
      T = it("drop-shadow"),
      C = it("blur"),
      E = it("perspective"),
      A = it("aspect"),
      R = it("ease"),
      M = it("animate"),
      O = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      V = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      L = () => [...V(), ie, ne],
      $ = () => ["auto", "hidden", "clip", "visible", "scroll"],
      H = () => ["auto", "contain", "none"],
      F = () => [ie, ne, m],
      J = () => [Za, "full", "auto", ...F()],
      se = () => [Di, "none", "subgrid", ie, ne],
      me = () => ["auto", { span: ["full", Di, ie, ne] }, Di, ie, ne],
      ge = () => [Di, "auto", ie, ne],
      Ae = () => ["auto", "min", "max", "fr", ie, ne],
      ee = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      he = () => [
        "start",
        "end",
        "center",
        "stretch",
        "center-safe",
        "end-safe",
      ],
      z = () => ["auto", ...F()],
      G = () => [
        Za,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...F(),
      ],
      U = () => [e, ie, ne],
      ae = () => [...V(), h0, d0, { position: [ie, ne] }],
      ce = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      N = () => ["auto", "cover", "contain", NM, DM, { size: [ie, ne] }],
      I = () => [ed, bs, na],
      Z = () => ["", "none", "full", p, ie, ne],
      W = () => ["", xe, bs, na],
      fe = () => ["solid", "dashed", "dotted", "double"],
      ye = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      oe = () => [xe, ed, h0, d0],
      Ie = () => ["", "none", C, ie, ne],
      je = () => ["none", xe, ie, ne],
      Ft = () => ["none", xe, ie, ne],
      pn = () => [xe, ie, ne],
      gn = () => [Za, "full", ...F()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [Qn],
        breakpoint: [Qn],
        color: [EM],
        container: [Qn],
        "drop-shadow": [Qn],
        ease: ["in", "out", "in-out"],
        font: [RM],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [Qn],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [Qn],
        shadow: [Qn],
        spacing: ["px", xe],
        text: [Qn],
        "text-shadow": [Qn],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", Za, ne, ie, A] }],
        container: ["container"],
        columns: [{ columns: [xe, ne, ie, h] }],
        "break-after": [{ "break-after": O() }],
        "break-before": [{ "break-before": O() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: L() }],
        overflow: [{ overflow: $() }],
        "overflow-x": [{ "overflow-x": $() }],
        "overflow-y": [{ "overflow-y": $() }],
        overscroll: [{ overscroll: H() }],
        "overscroll-x": [{ "overscroll-x": H() }],
        "overscroll-y": [{ "overscroll-y": H() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: J() }],
        "inset-x": [{ "inset-x": J() }],
        "inset-y": [{ "inset-y": J() }],
        start: [{ start: J() }],
        end: [{ end: J() }],
        top: [{ top: J() }],
        right: [{ right: J() }],
        bottom: [{ bottom: J() }],
        left: [{ left: J() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [Di, "auto", ie, ne] }],
        basis: [{ basis: [Za, "full", "auto", h, ...F()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [xe, Za, "auto", "initial", "none", ne] }],
        grow: [{ grow: ["", xe, ie, ne] }],
        shrink: [{ shrink: ["", xe, ie, ne] }],
        order: [{ order: [Di, "first", "last", "none", ie, ne] }],
        "grid-cols": [{ "grid-cols": se() }],
        "col-start-end": [{ col: me() }],
        "col-start": [{ "col-start": ge() }],
        "col-end": [{ "col-end": ge() }],
        "grid-rows": [{ "grid-rows": se() }],
        "row-start-end": [{ row: me() }],
        "row-start": [{ "row-start": ge() }],
        "row-end": [{ "row-end": ge() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": Ae() }],
        "auto-rows": [{ "auto-rows": Ae() }],
        gap: [{ gap: F() }],
        "gap-x": [{ "gap-x": F() }],
        "gap-y": [{ "gap-y": F() }],
        "justify-content": [{ justify: [...ee(), "normal"] }],
        "justify-items": [{ "justify-items": [...he(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...he()] }],
        "align-content": [{ content: ["normal", ...ee()] }],
        "align-items": [{ items: [...he(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...he(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": ee() }],
        "place-items": [{ "place-items": [...he(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...he()] }],
        p: [{ p: F() }],
        px: [{ px: F() }],
        py: [{ py: F() }],
        ps: [{ ps: F() }],
        pe: [{ pe: F() }],
        pt: [{ pt: F() }],
        pr: [{ pr: F() }],
        pb: [{ pb: F() }],
        pl: [{ pl: F() }],
        m: [{ m: z() }],
        mx: [{ mx: z() }],
        my: [{ my: z() }],
        ms: [{ ms: z() }],
        me: [{ me: z() }],
        mt: [{ mt: z() }],
        mr: [{ mr: z() }],
        mb: [{ mb: z() }],
        ml: [{ ml: z() }],
        "space-x": [{ "space-x": F() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": F() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: G() }],
        w: [{ w: [h, "screen", ...G()] }],
        "min-w": [{ "min-w": [h, "screen", "none", ...G()] }],
        "max-w": [
          { "max-w": [h, "screen", "none", "prose", { screen: [f] }, ...G()] },
        ],
        h: [{ h: ["screen", "lh", ...G()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...G()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...G()] }],
        "font-size": [{ text: ["base", a, bs, na] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [s, ie, td] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              ed,
              ne,
            ],
          },
        ],
        "font-family": [{ font: [OM, ne, i] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [l, ie, ne] }],
        "line-clamp": [{ "line-clamp": [xe, "none", ie, td] }],
        leading: [{ leading: [u, ...F()] }],
        "list-image": [{ "list-image": ["none", ie, ne] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", ie, ne] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: U() }],
        "text-color": [{ text: U() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...fe(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: [xe, "from-font", "auto", ie, na] },
        ],
        "text-decoration-color": [{ decoration: U() }],
        "underline-offset": [{ "underline-offset": [xe, "auto", ie, ne] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: F() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              ie,
              ne,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", ie, ne] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: ae() }],
        "bg-repeat": [{ bg: ce() }],
        "bg-size": [{ bg: N() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  Di,
                  ie,
                  ne,
                ],
                radial: ["", ie, ne],
                conic: [Di, ie, ne],
              },
              jM,
              MM,
            ],
          },
        ],
        "bg-color": [{ bg: U() }],
        "gradient-from-pos": [{ from: I() }],
        "gradient-via-pos": [{ via: I() }],
        "gradient-to-pos": [{ to: I() }],
        "gradient-from": [{ from: U() }],
        "gradient-via": [{ via: U() }],
        "gradient-to": [{ to: U() }],
        rounded: [{ rounded: Z() }],
        "rounded-s": [{ "rounded-s": Z() }],
        "rounded-e": [{ "rounded-e": Z() }],
        "rounded-t": [{ "rounded-t": Z() }],
        "rounded-r": [{ "rounded-r": Z() }],
        "rounded-b": [{ "rounded-b": Z() }],
        "rounded-l": [{ "rounded-l": Z() }],
        "rounded-ss": [{ "rounded-ss": Z() }],
        "rounded-se": [{ "rounded-se": Z() }],
        "rounded-ee": [{ "rounded-ee": Z() }],
        "rounded-es": [{ "rounded-es": Z() }],
        "rounded-tl": [{ "rounded-tl": Z() }],
        "rounded-tr": [{ "rounded-tr": Z() }],
        "rounded-br": [{ "rounded-br": Z() }],
        "rounded-bl": [{ "rounded-bl": Z() }],
        "border-w": [{ border: W() }],
        "border-w-x": [{ "border-x": W() }],
        "border-w-y": [{ "border-y": W() }],
        "border-w-s": [{ "border-s": W() }],
        "border-w-e": [{ "border-e": W() }],
        "border-w-t": [{ "border-t": W() }],
        "border-w-r": [{ "border-r": W() }],
        "border-w-b": [{ "border-b": W() }],
        "border-w-l": [{ "border-l": W() }],
        "divide-x": [{ "divide-x": W() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": W() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...fe(), "hidden", "none"] }],
        "divide-style": [{ divide: [...fe(), "hidden", "none"] }],
        "border-color": [{ border: U() }],
        "border-color-x": [{ "border-x": U() }],
        "border-color-y": [{ "border-y": U() }],
        "border-color-s": [{ "border-s": U() }],
        "border-color-e": [{ "border-e": U() }],
        "border-color-t": [{ "border-t": U() }],
        "border-color-r": [{ "border-r": U() }],
        "border-color-b": [{ "border-b": U() }],
        "border-color-l": [{ "border-l": U() }],
        "divide-color": [{ divide: U() }],
        "outline-style": [{ outline: [...fe(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [xe, ie, ne] }],
        "outline-w": [{ outline: ["", xe, bs, na] }],
        "outline-color": [{ outline: U() }],
        shadow: [{ shadow: ["", "none", g, Sl, xl] }],
        "shadow-color": [{ shadow: U() }],
        "inset-shadow": [{ "inset-shadow": ["none", y, Sl, xl] }],
        "inset-shadow-color": [{ "inset-shadow": U() }],
        "ring-w": [{ ring: W() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: U() }],
        "ring-offset-w": [{ "ring-offset": [xe, na] }],
        "ring-offset-color": [{ "ring-offset": U() }],
        "inset-ring-w": [{ "inset-ring": W() }],
        "inset-ring-color": [{ "inset-ring": U() }],
        "text-shadow": [{ "text-shadow": ["none", S, Sl, xl] }],
        "text-shadow-color": [{ "text-shadow": U() }],
        opacity: [{ opacity: [xe, ie, ne] }],
        "mix-blend": [
          { "mix-blend": [...ye(), "plus-darker", "plus-lighter"] },
        ],
        "bg-blend": [{ "bg-blend": ye() }],
        "mask-clip": [
          {
            "mask-clip": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
          "mask-no-clip",
        ],
        "mask-composite": [
          { mask: ["add", "subtract", "intersect", "exclude"] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [xe] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": oe() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": oe() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": U() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": U() }],
        "mask-image-t-from-pos": [{ "mask-t-from": oe() }],
        "mask-image-t-to-pos": [{ "mask-t-to": oe() }],
        "mask-image-t-from-color": [{ "mask-t-from": U() }],
        "mask-image-t-to-color": [{ "mask-t-to": U() }],
        "mask-image-r-from-pos": [{ "mask-r-from": oe() }],
        "mask-image-r-to-pos": [{ "mask-r-to": oe() }],
        "mask-image-r-from-color": [{ "mask-r-from": U() }],
        "mask-image-r-to-color": [{ "mask-r-to": U() }],
        "mask-image-b-from-pos": [{ "mask-b-from": oe() }],
        "mask-image-b-to-pos": [{ "mask-b-to": oe() }],
        "mask-image-b-from-color": [{ "mask-b-from": U() }],
        "mask-image-b-to-color": [{ "mask-b-to": U() }],
        "mask-image-l-from-pos": [{ "mask-l-from": oe() }],
        "mask-image-l-to-pos": [{ "mask-l-to": oe() }],
        "mask-image-l-from-color": [{ "mask-l-from": U() }],
        "mask-image-l-to-color": [{ "mask-l-to": U() }],
        "mask-image-x-from-pos": [{ "mask-x-from": oe() }],
        "mask-image-x-to-pos": [{ "mask-x-to": oe() }],
        "mask-image-x-from-color": [{ "mask-x-from": U() }],
        "mask-image-x-to-color": [{ "mask-x-to": U() }],
        "mask-image-y-from-pos": [{ "mask-y-from": oe() }],
        "mask-image-y-to-pos": [{ "mask-y-to": oe() }],
        "mask-image-y-from-color": [{ "mask-y-from": U() }],
        "mask-image-y-to-color": [{ "mask-y-to": U() }],
        "mask-image-radial": [{ "mask-radial": [ie, ne] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": oe() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": oe() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": U() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": U() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: ["side", "corner"], farthest: ["side", "corner"] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": V() }],
        "mask-image-conic-pos": [{ "mask-conic": [xe] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": oe() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": oe() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": U() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": U() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          {
            "mask-origin": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
        ],
        "mask-position": [{ mask: ae() }],
        "mask-repeat": [{ mask: ce() }],
        "mask-size": [{ mask: N() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", ie, ne] }],
        filter: [{ filter: ["", "none", ie, ne] }],
        blur: [{ blur: Ie() }],
        brightness: [{ brightness: [xe, ie, ne] }],
        contrast: [{ contrast: [xe, ie, ne] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", T, Sl, xl] }],
        "drop-shadow-color": [{ "drop-shadow": U() }],
        grayscale: [{ grayscale: ["", xe, ie, ne] }],
        "hue-rotate": [{ "hue-rotate": [xe, ie, ne] }],
        invert: [{ invert: ["", xe, ie, ne] }],
        saturate: [{ saturate: [xe, ie, ne] }],
        sepia: [{ sepia: ["", xe, ie, ne] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", ie, ne] }],
        "backdrop-blur": [{ "backdrop-blur": Ie() }],
        "backdrop-brightness": [{ "backdrop-brightness": [xe, ie, ne] }],
        "backdrop-contrast": [{ "backdrop-contrast": [xe, ie, ne] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", xe, ie, ne] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [xe, ie, ne] }],
        "backdrop-invert": [{ "backdrop-invert": ["", xe, ie, ne] }],
        "backdrop-opacity": [{ "backdrop-opacity": [xe, ie, ne] }],
        "backdrop-saturate": [{ "backdrop-saturate": [xe, ie, ne] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", xe, ie, ne] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": F() }],
        "border-spacing-x": [{ "border-spacing-x": F() }],
        "border-spacing-y": [{ "border-spacing-y": F() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "",
              "all",
              "colors",
              "opacity",
              "shadow",
              "transform",
              "none",
              ie,
              ne,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [xe, "initial", ie, ne] }],
        ease: [{ ease: ["linear", "initial", R, ie, ne] }],
        delay: [{ delay: [xe, ie, ne] }],
        animate: [{ animate: ["none", M, ie, ne] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [E, ie, ne] }],
        "perspective-origin": [{ "perspective-origin": L() }],
        rotate: [{ rotate: je() }],
        "rotate-x": [{ "rotate-x": je() }],
        "rotate-y": [{ "rotate-y": je() }],
        "rotate-z": [{ "rotate-z": je() }],
        scale: [{ scale: Ft() }],
        "scale-x": [{ "scale-x": Ft() }],
        "scale-y": [{ "scale-y": Ft() }],
        "scale-z": [{ "scale-z": Ft() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: pn() }],
        "skew-x": [{ "skew-x": pn() }],
        "skew-y": [{ "skew-y": pn() }],
        transform: [{ transform: [ie, ne, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: L() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: gn() }],
        "translate-x": [{ "translate-x": gn() }],
        "translate-y": [{ "translate-y": gn() }],
        "translate-z": [{ "translate-z": gn() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: U() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: U() }],
        "color-scheme": [
          {
            scheme: [
              "normal",
              "dark",
              "light",
              "light-dark",
              "only-dark",
              "only-light",
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              ie,
              ne,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": F() }],
        "scroll-mx": [{ "scroll-mx": F() }],
        "scroll-my": [{ "scroll-my": F() }],
        "scroll-ms": [{ "scroll-ms": F() }],
        "scroll-me": [{ "scroll-me": F() }],
        "scroll-mt": [{ "scroll-mt": F() }],
        "scroll-mr": [{ "scroll-mr": F() }],
        "scroll-mb": [{ "scroll-mb": F() }],
        "scroll-ml": [{ "scroll-ml": F() }],
        "scroll-p": [{ "scroll-p": F() }],
        "scroll-px": [{ "scroll-px": F() }],
        "scroll-py": [{ "scroll-py": F() }],
        "scroll-ps": [{ "scroll-ps": F() }],
        "scroll-pe": [{ "scroll-pe": F() }],
        "scroll-pt": [{ "scroll-pt": F() }],
        "scroll-pr": [{ "scroll-pr": F() }],
        "scroll-pb": [{ "scroll-pb": F() }],
        "scroll-pl": [{ "scroll-pl": F() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          {
            "will-change": ["auto", "scroll", "contents", "transform", ie, ne],
          },
        ],
        fill: [{ fill: ["none", ...U()] }],
        "stroke-w": [{ stroke: [xe, bs, na, td] }],
        stroke: [{ stroke: ["none", ...U()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": [
          "translate",
          "translate-x",
          "translate-y",
          "translate-z",
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  PM = gM(zM);
function ht(...e) {
  return PM(f1(e));
}
const VM = pD,
  C1 = b.forwardRef(({ className: e, ...i }, a) =>
    x.jsx(a1, {
      ref: a,
      className: ht(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        e,
      ),
      ...i,
    }),
  );
C1.displayName = a1.displayName;
const kM = gD(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
      variants: {
        variant: {
          default: "border bg-background text-foreground",
          destructive:
            "destructive group border-destructive bg-destructive text-destructive-foreground",
        },
      },
      defaultVariants: { variant: "default" },
    },
  ),
  R1 = b.forwardRef(({ className: e, variant: i, ...a }, s) =>
    x.jsx(r1, { ref: s, className: ht(kM({ variant: i }), e), ...a }),
  );
R1.displayName = r1.displayName;
const BM = b.forwardRef(({ className: e, ...i }, a) =>
  x.jsx(l1, {
    ref: a,
    className: ht(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      e,
    ),
    ...i,
  }),
);
BM.displayName = l1.displayName;
const D1 = b.forwardRef(({ className: e, ...i }, a) =>
  x.jsx(u1, {
    ref: a,
    className: ht(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      e,
    ),
    "toast-close": "",
    ...i,
    children: x.jsx(m1, { className: "h-4 w-4" }),
  }),
);
D1.displayName = u1.displayName;
const M1 = b.forwardRef(({ className: e, ...i }, a) =>
  x.jsx(s1, { ref: a, className: ht("text-sm font-semibold", e), ...i }),
);
M1.displayName = s1.displayName;
const O1 = b.forwardRef(({ className: e, ...i }, a) =>
  x.jsx(o1, { ref: a, className: ht("text-sm opacity-90", e), ...i }),
);
O1.displayName = o1.displayName;
function UM() {
  const { toasts: e } = RR();
  return x.jsxs(VM, {
    children: [
      e.map(function ({ id: i, title: a, description: s, action: l, ...u }) {
        return x.jsxs(
          R1,
          {
            ...u,
            children: [
              x.jsxs("div", {
                className: "grid gap-1",
                children: [
                  a && x.jsx(M1, { children: a }),
                  s && x.jsx(O1, { children: s }),
                ],
              }),
              l,
              x.jsx(D1, {}),
            ],
          },
          i,
        );
      }),
      x.jsx(C1, {}),
    ],
  });
}
function Wa(e, i, { checkForDefaultPrevented: a = !0 } = {}) {
  return function (l) {
    if ((e?.(l), a === !1 || !l.defaultPrevented)) return i?.(l);
  };
}
function nd(e, i, { checkForDefaultPrevented: a = !0 } = {}) {
  return function (l) {
    if ((e?.(l), a === !1 || !l.defaultPrevented)) return i?.(l);
  };
}
function HM(e) {
  const i = qM(e),
    a = b.forwardRef((s, l) => {
      const { children: u, ...f } = s,
        h = b.Children.toArray(u),
        m = h.find(GM);
      if (m) {
        const p = m.props.children,
          g = h.map((y) =>
            y === m
              ? b.Children.count(p) > 1
                ? b.Children.only(null)
                : b.isValidElement(p)
                  ? p.props.children
                  : null
              : y,
          );
        return x.jsx(i, {
          ...f,
          ref: l,
          children: b.isValidElement(p) ? b.cloneElement(p, void 0, g) : null,
        });
      }
      return x.jsx(i, { ...f, ref: l, children: u });
    });
  return ((a.displayName = `${e}.Slot`), a);
}
function qM(e) {
  const i = b.forwardRef((a, s) => {
    const { children: l, ...u } = a;
    if (b.isValidElement(l)) {
      const f = IM(l),
        h = YM(u, l.props);
      return (
        l.type !== b.Fragment && (h.ref = s ? cu(s, f) : f),
        b.cloneElement(l, h)
      );
    }
    return b.Children.count(l) > 1 ? b.Children.only(null) : null;
  });
  return ((i.displayName = `${e}.SlotClone`), i);
}
var FM = Symbol("radix.slottable");
function GM(e) {
  return (
    b.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === FM
  );
}
function YM(e, i) {
  const a = { ...i };
  for (const s in i) {
    const l = e[s],
      u = i[s];
    /^on[A-Z]/.test(s)
      ? l && u
        ? (a[s] = (...h) => {
            const m = u(...h);
            return (l(...h), m);
          })
        : l && (a[s] = l)
      : s === "style"
        ? (a[s] = { ...l, ...u })
        : s === "className" && (a[s] = [l, u].filter(Boolean).join(" "));
  }
  return { ...e, ...a };
}
function IM(e) {
  let i = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    a = i && "isReactWarning" in i && i.isReactWarning;
  return a
    ? e.ref
    : ((i = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (a = i && "isReactWarning" in i && i.isReactWarning),
      a ? e.props.ref : e.props.ref || e.ref);
}
var XM = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  Mt = XM.reduce((e, i) => {
    const a = HM(`Primitive.${i}`),
      s = b.forwardRef((l, u) => {
        const { asChild: f, ...h } = l,
          m = f ? a : i;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          x.jsx(m, { ...h, ref: u })
        );
      });
    return ((s.displayName = `Primitive.${i}`), { ...e, [i]: s });
  }, {});
function KM(e, i) {
  e && Gs.flushSync(() => e.dispatchEvent(i));
}
var $M = "DismissableLayer",
  Yd = "dismissableLayer.update",
  QM = "dismissableLayer.pointerDownOutside",
  ZM = "dismissableLayer.focusOutside",
  m0,
  N1 = b.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  Lh = b.forwardRef((e, i) => {
    const {
        disableOutsidePointerEvents: a = !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: l,
        onFocusOutside: u,
        onInteractOutside: f,
        onDismiss: h,
        ...m
      } = e,
      p = b.useContext(N1),
      [g, y] = b.useState(null),
      S = g?.ownerDocument ?? globalThis?.document,
      [, T] = b.useState({}),
      C = ot(i, (H) => y(H)),
      E = Array.from(p.layers),
      [A] = [...p.layersWithOutsidePointerEventsDisabled].slice(-1),
      R = E.indexOf(A),
      M = g ? E.indexOf(g) : -1,
      O = p.layersWithOutsidePointerEventsDisabled.size > 0,
      V = M >= R,
      L = eO((H) => {
        const F = H.target,
          J = [...p.branches].some((se) => se.contains(F));
        !V || J || (l?.(H), f?.(H), H.defaultPrevented || h?.());
      }, S),
      $ = tO((H) => {
        const F = H.target;
        [...p.branches].some((se) => se.contains(F)) ||
          (u?.(H), f?.(H), H.defaultPrevented || h?.());
      }, S);
    return (
      kx((H) => {
        M === p.layers.size - 1 &&
          (s?.(H), !H.defaultPrevented && h && (H.preventDefault(), h()));
      }, S),
      b.useEffect(() => {
        if (g)
          return (
            a &&
              (p.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((m0 = S.body.style.pointerEvents),
                (S.body.style.pointerEvents = "none")),
              p.layersWithOutsidePointerEventsDisabled.add(g)),
            p.layers.add(g),
            p0(),
            () => {
              a &&
                p.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (S.body.style.pointerEvents = m0);
            }
          );
      }, [g, S, a, p]),
      b.useEffect(
        () => () => {
          g &&
            (p.layers.delete(g),
            p.layersWithOutsidePointerEventsDisabled.delete(g),
            p0());
        },
        [g, p],
      ),
      b.useEffect(() => {
        const H = () => T({});
        return (
          document.addEventListener(Yd, H),
          () => document.removeEventListener(Yd, H)
        );
      }, []),
      x.jsx(Mt.div, {
        ...m,
        ref: C,
        style: {
          pointerEvents: O ? (V ? "auto" : "none") : void 0,
          ...e.style,
        },
        onFocusCapture: nd(e.onFocusCapture, $.onFocusCapture),
        onBlurCapture: nd(e.onBlurCapture, $.onBlurCapture),
        onPointerDownCapture: nd(
          e.onPointerDownCapture,
          L.onPointerDownCapture,
        ),
      })
    );
  });
Lh.displayName = $M;
var WM = "DismissableLayerBranch",
  JM = b.forwardRef((e, i) => {
    const a = b.useContext(N1),
      s = b.useRef(null),
      l = ot(i, s);
    return (
      b.useEffect(() => {
        const u = s.current;
        if (u)
          return (
            a.branches.add(u),
            () => {
              a.branches.delete(u);
            }
          );
      }, [a.branches]),
      x.jsx(Mt.div, { ...e, ref: l })
    );
  });
JM.displayName = WM;
function eO(e, i = globalThis?.document) {
  const a = Dt(e),
    s = b.useRef(!1),
    l = b.useRef(() => {});
  return (
    b.useEffect(() => {
      const u = (h) => {
          if (h.target && !s.current) {
            let m = function () {
              j1(QM, a, p, { discrete: !0 });
            };
            const p = { originalEvent: h };
            h.pointerType === "touch"
              ? (i.removeEventListener("click", l.current),
                (l.current = m),
                i.addEventListener("click", l.current, { once: !0 }))
              : m();
          } else i.removeEventListener("click", l.current);
          s.current = !1;
        },
        f = window.setTimeout(() => {
          i.addEventListener("pointerdown", u);
        }, 0);
      return () => {
        (window.clearTimeout(f),
          i.removeEventListener("pointerdown", u),
          i.removeEventListener("click", l.current));
      };
    }, [i, a]),
    { onPointerDownCapture: () => (s.current = !0) }
  );
}
function tO(e, i = globalThis?.document) {
  const a = Dt(e),
    s = b.useRef(!1);
  return (
    b.useEffect(() => {
      const l = (u) => {
        u.target &&
          !s.current &&
          j1(ZM, a, { originalEvent: u }, { discrete: !1 });
      };
      return (
        i.addEventListener("focusin", l),
        () => i.removeEventListener("focusin", l)
      );
    }, [i, a]),
    {
      onFocusCapture: () => (s.current = !0),
      onBlurCapture: () => (s.current = !1),
    }
  );
}
function p0() {
  const e = new CustomEvent(Yd);
  document.dispatchEvent(e);
}
function j1(e, i, a, { discrete: s }) {
  const l = a.originalEvent.target,
    u = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: a });
  (i && l.addEventListener(e, i, { once: !0 }),
    s ? KM(l, u) : l.dispatchEvent(u));
}
var nO = bh[" useId ".trim().toString()] || (() => {}),
  iO = 0;
function id(e) {
  const [i, a] = b.useState(nO());
  return (
    rn(() => {
      a((s) => s ?? String(iO++));
    }, [e]),
    e || (i ? `radix-${i}` : "")
  );
}
const aO = ["top", "right", "bottom", "left"],
  ji = Math.min,
  Ut = Math.max,
  $l = Math.round,
  wl = Math.floor,
  Tn = (e) => ({ x: e, y: e }),
  rO = { left: "right", right: "left", bottom: "top", top: "bottom" },
  sO = { start: "end", end: "start" };
function Id(e, i, a) {
  return Ut(e, ji(i, a));
}
function Jn(e, i) {
  return typeof e == "function" ? e(i) : e;
}
function ei(e) {
  return e.split("-")[0];
}
function vr(e) {
  return e.split("-")[1];
}
function zh(e) {
  return e === "x" ? "y" : "x";
}
function Ph(e) {
  return e === "y" ? "height" : "width";
}
const oO = new Set(["top", "bottom"]);
function wn(e) {
  return oO.has(ei(e)) ? "y" : "x";
}
function Vh(e) {
  return zh(wn(e));
}
function lO(e, i, a) {
  a === void 0 && (a = !1);
  const s = vr(e),
    l = Vh(e),
    u = Ph(l);
  let f =
    l === "x"
      ? s === (a ? "end" : "start")
        ? "right"
        : "left"
      : s === "start"
        ? "bottom"
        : "top";
  return (i.reference[u] > i.floating[u] && (f = Ql(f)), [f, Ql(f)]);
}
function uO(e) {
  const i = Ql(e);
  return [Xd(e), i, Xd(i)];
}
function Xd(e) {
  return e.replace(/start|end/g, (i) => sO[i]);
}
const g0 = ["left", "right"],
  y0 = ["right", "left"],
  cO = ["top", "bottom"],
  fO = ["bottom", "top"];
function dO(e, i, a) {
  switch (e) {
    case "top":
    case "bottom":
      return a ? (i ? y0 : g0) : i ? g0 : y0;
    case "left":
    case "right":
      return i ? cO : fO;
    default:
      return [];
  }
}
function hO(e, i, a, s) {
  const l = vr(e);
  let u = dO(ei(e), a === "start", s);
  return (
    l && ((u = u.map((f) => f + "-" + l)), i && (u = u.concat(u.map(Xd)))),
    u
  );
}
function Ql(e) {
  return e.replace(/left|right|bottom|top/g, (i) => rO[i]);
}
function mO(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function _1(e) {
  return typeof e != "number"
    ? mO(e)
    : { top: e, right: e, bottom: e, left: e };
}
function Zl(e) {
  const { x: i, y: a, width: s, height: l } = e;
  return {
    width: s,
    height: l,
    top: a,
    left: i,
    right: i + s,
    bottom: a + l,
    x: i,
    y: a,
  };
}
function v0(e, i, a) {
  let { reference: s, floating: l } = e;
  const u = wn(i),
    f = Vh(i),
    h = Ph(f),
    m = ei(i),
    p = u === "y",
    g = s.x + s.width / 2 - l.width / 2,
    y = s.y + s.height / 2 - l.height / 2,
    S = s[h] / 2 - l[h] / 2;
  let T;
  switch (m) {
    case "top":
      T = { x: g, y: s.y - l.height };
      break;
    case "bottom":
      T = { x: g, y: s.y + s.height };
      break;
    case "right":
      T = { x: s.x + s.width, y };
      break;
    case "left":
      T = { x: s.x - l.width, y };
      break;
    default:
      T = { x: s.x, y: s.y };
  }
  switch (vr(i)) {
    case "start":
      T[f] -= S * (a && p ? -1 : 1);
      break;
    case "end":
      T[f] += S * (a && p ? -1 : 1);
      break;
  }
  return T;
}
const pO = async (e, i, a) => {
  const {
      placement: s = "bottom",
      strategy: l = "absolute",
      middleware: u = [],
      platform: f,
    } = a,
    h = u.filter(Boolean),
    m = await (f.isRTL == null ? void 0 : f.isRTL(i));
  let p = await f.getElementRects({ reference: e, floating: i, strategy: l }),
    { x: g, y } = v0(p, s, m),
    S = s,
    T = {},
    C = 0;
  for (let E = 0; E < h.length; E++) {
    const { name: A, fn: R } = h[E],
      {
        x: M,
        y: O,
        data: V,
        reset: L,
      } = await R({
        x: g,
        y,
        initialPlacement: s,
        placement: S,
        strategy: l,
        middlewareData: T,
        rects: p,
        platform: f,
        elements: { reference: e, floating: i },
      });
    ((g = M ?? g),
      (y = O ?? y),
      (T = { ...T, [A]: { ...T[A], ...V } }),
      L &&
        C <= 50 &&
        (C++,
        typeof L == "object" &&
          (L.placement && (S = L.placement),
          L.rects &&
            (p =
              L.rects === !0
                ? await f.getElementRects({
                    reference: e,
                    floating: i,
                    strategy: l,
                  })
                : L.rects),
          ({ x: g, y } = v0(p, S, m))),
        (E = -1)));
  }
  return { x: g, y, placement: S, strategy: l, middlewareData: T };
};
async function _s(e, i) {
  var a;
  i === void 0 && (i = {});
  const { x: s, y: l, platform: u, rects: f, elements: h, strategy: m } = e,
    {
      boundary: p = "clippingAncestors",
      rootBoundary: g = "viewport",
      elementContext: y = "floating",
      altBoundary: S = !1,
      padding: T = 0,
    } = Jn(i, e),
    C = _1(T),
    A = h[S ? (y === "floating" ? "reference" : "floating") : y],
    R = Zl(
      await u.getClippingRect({
        element:
          (a = await (u.isElement == null ? void 0 : u.isElement(A))) == null ||
          a
            ? A
            : A.contextElement ||
              (await (u.getDocumentElement == null
                ? void 0
                : u.getDocumentElement(h.floating))),
        boundary: p,
        rootBoundary: g,
        strategy: m,
      }),
    ),
    M =
      y === "floating"
        ? { x: s, y: l, width: f.floating.width, height: f.floating.height }
        : f.reference,
    O = await (u.getOffsetParent == null
      ? void 0
      : u.getOffsetParent(h.floating)),
    V = (await (u.isElement == null ? void 0 : u.isElement(O)))
      ? (await (u.getScale == null ? void 0 : u.getScale(O))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    L = Zl(
      u.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await u.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: h,
            rect: M,
            offsetParent: O,
            strategy: m,
          })
        : M,
    );
  return {
    top: (R.top - L.top + C.top) / V.y,
    bottom: (L.bottom - R.bottom + C.bottom) / V.y,
    left: (R.left - L.left + C.left) / V.x,
    right: (L.right - R.right + C.right) / V.x,
  };
}
const gO = (e) => ({
    name: "arrow",
    options: e,
    async fn(i) {
      const {
          x: a,
          y: s,
          placement: l,
          rects: u,
          platform: f,
          elements: h,
          middlewareData: m,
        } = i,
        { element: p, padding: g = 0 } = Jn(e, i) || {};
      if (p == null) return {};
      const y = _1(g),
        S = { x: a, y: s },
        T = Vh(l),
        C = Ph(T),
        E = await f.getDimensions(p),
        A = T === "y",
        R = A ? "top" : "left",
        M = A ? "bottom" : "right",
        O = A ? "clientHeight" : "clientWidth",
        V = u.reference[C] + u.reference[T] - S[T] - u.floating[C],
        L = S[T] - u.reference[T],
        $ = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(p));
      let H = $ ? $[O] : 0;
      (!H || !(await (f.isElement == null ? void 0 : f.isElement($)))) &&
        (H = h.floating[O] || u.floating[C]);
      const F = V / 2 - L / 2,
        J = H / 2 - E[C] / 2 - 1,
        se = ji(y[R], J),
        me = ji(y[M], J),
        ge = se,
        Ae = H - E[C] - me,
        ee = H / 2 - E[C] / 2 + F,
        he = Id(ge, ee, Ae),
        z =
          !m.arrow &&
          vr(l) != null &&
          ee !== he &&
          u.reference[C] / 2 - (ee < ge ? se : me) - E[C] / 2 < 0,
        G = z ? (ee < ge ? ee - ge : ee - Ae) : 0;
      return {
        [T]: S[T] + G,
        data: {
          [T]: he,
          centerOffset: ee - he - G,
          ...(z && { alignmentOffset: G }),
        },
        reset: z,
      };
    },
  }),
  yO = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(i) {
          var a, s;
          const {
              placement: l,
              middlewareData: u,
              rects: f,
              initialPlacement: h,
              platform: m,
              elements: p,
            } = i,
            {
              mainAxis: g = !0,
              crossAxis: y = !0,
              fallbackPlacements: S,
              fallbackStrategy: T = "bestFit",
              fallbackAxisSideDirection: C = "none",
              flipAlignment: E = !0,
              ...A
            } = Jn(e, i);
          if ((a = u.arrow) != null && a.alignmentOffset) return {};
          const R = ei(l),
            M = wn(h),
            O = ei(h) === h,
            V = await (m.isRTL == null ? void 0 : m.isRTL(p.floating)),
            L = S || (O || !E ? [Ql(h)] : uO(h)),
            $ = C !== "none";
          !S && $ && L.push(...hO(h, E, C, V));
          const H = [h, ...L],
            F = await _s(i, A),
            J = [];
          let se = ((s = u.flip) == null ? void 0 : s.overflows) || [];
          if ((g && J.push(F[R]), y)) {
            const ee = lO(l, f, V);
            J.push(F[ee[0]], F[ee[1]]);
          }
          if (
            ((se = [...se, { placement: l, overflows: J }]),
            !J.every((ee) => ee <= 0))
          ) {
            var me, ge;
            const ee = (((me = u.flip) == null ? void 0 : me.index) || 0) + 1,
              he = H[ee];
            if (
              he &&
              (!(y === "alignment" ? M !== wn(he) : !1) ||
                se.every((U) =>
                  wn(U.placement) === M ? U.overflows[0] > 0 : !0,
                ))
            )
              return {
                data: { index: ee, overflows: se },
                reset: { placement: he },
              };
            let z =
              (ge = se
                .filter((G) => G.overflows[0] <= 0)
                .sort((G, U) => G.overflows[1] - U.overflows[1])[0]) == null
                ? void 0
                : ge.placement;
            if (!z)
              switch (T) {
                case "bestFit": {
                  var Ae;
                  const G =
                    (Ae = se
                      .filter((U) => {
                        if ($) {
                          const ae = wn(U.placement);
                          return ae === M || ae === "y";
                        }
                        return !0;
                      })
                      .map((U) => [
                        U.placement,
                        U.overflows
                          .filter((ae) => ae > 0)
                          .reduce((ae, ce) => ae + ce, 0),
                      ])
                      .sort((U, ae) => U[1] - ae[1])[0]) == null
                      ? void 0
                      : Ae[0];
                  G && (z = G);
                  break;
                }
                case "initialPlacement":
                  z = h;
                  break;
              }
            if (l !== z) return { reset: { placement: z } };
          }
          return {};
        },
      }
    );
  };
function b0(e, i) {
  return {
    top: e.top - i.height,
    right: e.right - i.width,
    bottom: e.bottom - i.height,
    left: e.left - i.width,
  };
}
function x0(e) {
  return aO.some((i) => e[i] >= 0);
}
const vO = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "hide",
        options: e,
        async fn(i) {
          const { rects: a } = i,
            { strategy: s = "referenceHidden", ...l } = Jn(e, i);
          switch (s) {
            case "referenceHidden": {
              const u = await _s(i, { ...l, elementContext: "reference" }),
                f = b0(u, a.reference);
              return {
                data: { referenceHiddenOffsets: f, referenceHidden: x0(f) },
              };
            }
            case "escaped": {
              const u = await _s(i, { ...l, altBoundary: !0 }),
                f = b0(u, a.floating);
              return { data: { escapedOffsets: f, escaped: x0(f) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  L1 = new Set(["left", "top"]);
async function bO(e, i) {
  const { placement: a, platform: s, elements: l } = e,
    u = await (s.isRTL == null ? void 0 : s.isRTL(l.floating)),
    f = ei(a),
    h = vr(a),
    m = wn(a) === "y",
    p = L1.has(f) ? -1 : 1,
    g = u && m ? -1 : 1,
    y = Jn(i, e);
  let {
    mainAxis: S,
    crossAxis: T,
    alignmentAxis: C,
  } = typeof y == "number"
    ? { mainAxis: y, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: y.mainAxis || 0,
        crossAxis: y.crossAxis || 0,
        alignmentAxis: y.alignmentAxis,
      };
  return (
    h && typeof C == "number" && (T = h === "end" ? C * -1 : C),
    m ? { x: T * g, y: S * p } : { x: S * p, y: T * g }
  );
}
const xO = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(i) {
          var a, s;
          const { x: l, y: u, placement: f, middlewareData: h } = i,
            m = await bO(i, e);
          return f === ((a = h.offset) == null ? void 0 : a.placement) &&
            (s = h.arrow) != null &&
            s.alignmentOffset
            ? {}
            : { x: l + m.x, y: u + m.y, data: { ...m, placement: f } };
        },
      }
    );
  },
  SO = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(i) {
          const { x: a, y: s, placement: l } = i,
            {
              mainAxis: u = !0,
              crossAxis: f = !1,
              limiter: h = {
                fn: (A) => {
                  let { x: R, y: M } = A;
                  return { x: R, y: M };
                },
              },
              ...m
            } = Jn(e, i),
            p = { x: a, y: s },
            g = await _s(i, m),
            y = wn(ei(l)),
            S = zh(y);
          let T = p[S],
            C = p[y];
          if (u) {
            const A = S === "y" ? "top" : "left",
              R = S === "y" ? "bottom" : "right",
              M = T + g[A],
              O = T - g[R];
            T = Id(M, T, O);
          }
          if (f) {
            const A = y === "y" ? "top" : "left",
              R = y === "y" ? "bottom" : "right",
              M = C + g[A],
              O = C - g[R];
            C = Id(M, C, O);
          }
          const E = h.fn({ ...i, [S]: T, [y]: C });
          return {
            ...E,
            data: { x: E.x - a, y: E.y - s, enabled: { [S]: u, [y]: f } },
          };
        },
      }
    );
  },
  wO = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(i) {
          const { x: a, y: s, placement: l, rects: u, middlewareData: f } = i,
            { offset: h = 0, mainAxis: m = !0, crossAxis: p = !0 } = Jn(e, i),
            g = { x: a, y: s },
            y = wn(l),
            S = zh(y);
          let T = g[S],
            C = g[y];
          const E = Jn(h, i),
            A =
              typeof E == "number"
                ? { mainAxis: E, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...E };
          if (m) {
            const O = S === "y" ? "height" : "width",
              V = u.reference[S] - u.floating[O] + A.mainAxis,
              L = u.reference[S] + u.reference[O] - A.mainAxis;
            T < V ? (T = V) : T > L && (T = L);
          }
          if (p) {
            var R, M;
            const O = S === "y" ? "width" : "height",
              V = L1.has(ei(l)),
              L =
                u.reference[y] -
                u.floating[O] +
                ((V && ((R = f.offset) == null ? void 0 : R[y])) || 0) +
                (V ? 0 : A.crossAxis),
              $ =
                u.reference[y] +
                u.reference[O] +
                (V ? 0 : ((M = f.offset) == null ? void 0 : M[y]) || 0) -
                (V ? A.crossAxis : 0);
            C < L ? (C = L) : C > $ && (C = $);
          }
          return { [S]: T, [y]: C };
        },
      }
    );
  },
  EO = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(i) {
          var a, s;
          const { placement: l, rects: u, platform: f, elements: h } = i,
            { apply: m = () => {}, ...p } = Jn(e, i),
            g = await _s(i, p),
            y = ei(l),
            S = vr(l),
            T = wn(l) === "y",
            { width: C, height: E } = u.floating;
          let A, R;
          y === "top" || y === "bottom"
            ? ((A = y),
              (R =
                S ===
                ((await (f.isRTL == null ? void 0 : f.isRTL(h.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((R = y), (A = S === "end" ? "top" : "bottom"));
          const M = E - g.top - g.bottom,
            O = C - g.left - g.right,
            V = ji(E - g[A], M),
            L = ji(C - g[R], O),
            $ = !i.middlewareData.shift;
          let H = V,
            F = L;
          if (
            ((a = i.middlewareData.shift) != null && a.enabled.x && (F = O),
            (s = i.middlewareData.shift) != null && s.enabled.y && (H = M),
            $ && !S)
          ) {
            const se = Ut(g.left, 0),
              me = Ut(g.right, 0),
              ge = Ut(g.top, 0),
              Ae = Ut(g.bottom, 0);
            T
              ? (F =
                  C -
                  2 * (se !== 0 || me !== 0 ? se + me : Ut(g.left, g.right)))
              : (H =
                  E -
                  2 * (ge !== 0 || Ae !== 0 ? ge + Ae : Ut(g.top, g.bottom)));
          }
          await m({ ...i, availableWidth: F, availableHeight: H });
          const J = await f.getDimensions(h.floating);
          return C !== J.width || E !== J.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function hu() {
  return typeof window < "u";
}
function br(e) {
  return z1(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function qt(e) {
  var i;
  return (
    (e == null || (i = e.ownerDocument) == null ? void 0 : i.defaultView) ||
    window
  );
}
function Nn(e) {
  var i;
  return (i = (z1(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : i.documentElement;
}
function z1(e) {
  return hu() ? e instanceof Node || e instanceof qt(e).Node : !1;
}
function dn(e) {
  return hu() ? e instanceof Element || e instanceof qt(e).Element : !1;
}
function Rn(e) {
  return hu() ? e instanceof HTMLElement || e instanceof qt(e).HTMLElement : !1;
}
function S0(e) {
  return !hu() || typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof qt(e).ShadowRoot;
}
const TO = new Set(["inline", "contents"]);
function Is(e) {
  const { overflow: i, overflowX: a, overflowY: s, display: l } = hn(e);
  return /auto|scroll|overlay|hidden|clip/.test(i + s + a) && !TO.has(l);
}
const AO = new Set(["table", "td", "th"]);
function CO(e) {
  return AO.has(br(e));
}
const RO = [":popover-open", ":modal"];
function mu(e) {
  return RO.some((i) => {
    try {
      return e.matches(i);
    } catch {
      return !1;
    }
  });
}
const DO = ["transform", "translate", "scale", "rotate", "perspective"],
  MO = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  OO = ["paint", "layout", "strict", "content"];
function kh(e) {
  const i = Bh(),
    a = dn(e) ? hn(e) : e;
  return (
    DO.some((s) => (a[s] ? a[s] !== "none" : !1)) ||
    (a.containerType ? a.containerType !== "normal" : !1) ||
    (!i && (a.backdropFilter ? a.backdropFilter !== "none" : !1)) ||
    (!i && (a.filter ? a.filter !== "none" : !1)) ||
    MO.some((s) => (a.willChange || "").includes(s)) ||
    OO.some((s) => (a.contain || "").includes(s))
  );
}
function NO(e) {
  let i = _i(e);
  for (; Rn(i) && !fr(i); ) {
    if (kh(i)) return i;
    if (mu(i)) return null;
    i = _i(i);
  }
  return null;
}
function Bh() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
const jO = new Set(["html", "body", "#document"]);
function fr(e) {
  return jO.has(br(e));
}
function hn(e) {
  return qt(e).getComputedStyle(e);
}
function pu(e) {
  return dn(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function _i(e) {
  if (br(e) === "html") return e;
  const i = e.assignedSlot || e.parentNode || (S0(e) && e.host) || Nn(e);
  return S0(i) ? i.host : i;
}
function P1(e) {
  const i = _i(e);
  return fr(i)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : Rn(i) && Is(i)
      ? i
      : P1(i);
}
function Ls(e, i, a) {
  var s;
  (i === void 0 && (i = []), a === void 0 && (a = !0));
  const l = P1(e),
    u = l === ((s = e.ownerDocument) == null ? void 0 : s.body),
    f = qt(l);
  if (u) {
    const h = Kd(f);
    return i.concat(
      f,
      f.visualViewport || [],
      Is(l) ? l : [],
      h && a ? Ls(h) : [],
    );
  }
  return i.concat(l, Ls(l, [], a));
}
function Kd(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function V1(e) {
  const i = hn(e);
  let a = parseFloat(i.width) || 0,
    s = parseFloat(i.height) || 0;
  const l = Rn(e),
    u = l ? e.offsetWidth : a,
    f = l ? e.offsetHeight : s,
    h = $l(a) !== u || $l(s) !== f;
  return (h && ((a = u), (s = f)), { width: a, height: s, $: h });
}
function Uh(e) {
  return dn(e) ? e : e.contextElement;
}
function lr(e) {
  const i = Uh(e);
  if (!Rn(i)) return Tn(1);
  const a = i.getBoundingClientRect(),
    { width: s, height: l, $: u } = V1(i);
  let f = (u ? $l(a.width) : a.width) / s,
    h = (u ? $l(a.height) : a.height) / l;
  return (
    (!f || !Number.isFinite(f)) && (f = 1),
    (!h || !Number.isFinite(h)) && (h = 1),
    { x: f, y: h }
  );
}
const _O = Tn(0);
function k1(e) {
  const i = qt(e);
  return !Bh() || !i.visualViewport
    ? _O
    : { x: i.visualViewport.offsetLeft, y: i.visualViewport.offsetTop };
}
function LO(e, i, a) {
  return (i === void 0 && (i = !1), !a || (i && a !== qt(e)) ? !1 : i);
}
function ua(e, i, a, s) {
  (i === void 0 && (i = !1), a === void 0 && (a = !1));
  const l = e.getBoundingClientRect(),
    u = Uh(e);
  let f = Tn(1);
  i && (s ? dn(s) && (f = lr(s)) : (f = lr(e)));
  const h = LO(u, a, s) ? k1(u) : Tn(0);
  let m = (l.left + h.x) / f.x,
    p = (l.top + h.y) / f.y,
    g = l.width / f.x,
    y = l.height / f.y;
  if (u) {
    const S = qt(u),
      T = s && dn(s) ? qt(s) : s;
    let C = S,
      E = Kd(C);
    for (; E && s && T !== C; ) {
      const A = lr(E),
        R = E.getBoundingClientRect(),
        M = hn(E),
        O = R.left + (E.clientLeft + parseFloat(M.paddingLeft)) * A.x,
        V = R.top + (E.clientTop + parseFloat(M.paddingTop)) * A.y;
      ((m *= A.x),
        (p *= A.y),
        (g *= A.x),
        (y *= A.y),
        (m += O),
        (p += V),
        (C = qt(E)),
        (E = Kd(C)));
    }
  }
  return Zl({ width: g, height: y, x: m, y: p });
}
function gu(e, i) {
  const a = pu(e).scrollLeft;
  return i ? i.left + a : ua(Nn(e)).left + a;
}
function B1(e, i) {
  const a = e.getBoundingClientRect(),
    s = a.left + i.scrollLeft - gu(e, a),
    l = a.top + i.scrollTop;
  return { x: s, y: l };
}
function zO(e) {
  let { elements: i, rect: a, offsetParent: s, strategy: l } = e;
  const u = l === "fixed",
    f = Nn(s),
    h = i ? mu(i.floating) : !1;
  if (s === f || (h && u)) return a;
  let m = { scrollLeft: 0, scrollTop: 0 },
    p = Tn(1);
  const g = Tn(0),
    y = Rn(s);
  if (
    (y || (!y && !u)) &&
    ((br(s) !== "body" || Is(f)) && (m = pu(s)), Rn(s))
  ) {
    const T = ua(s);
    ((p = lr(s)), (g.x = T.x + s.clientLeft), (g.y = T.y + s.clientTop));
  }
  const S = f && !y && !u ? B1(f, m) : Tn(0);
  return {
    width: a.width * p.x,
    height: a.height * p.y,
    x: a.x * p.x - m.scrollLeft * p.x + g.x + S.x,
    y: a.y * p.y - m.scrollTop * p.y + g.y + S.y,
  };
}
function PO(e) {
  return Array.from(e.getClientRects());
}
function VO(e) {
  const i = Nn(e),
    a = pu(e),
    s = e.ownerDocument.body,
    l = Ut(i.scrollWidth, i.clientWidth, s.scrollWidth, s.clientWidth),
    u = Ut(i.scrollHeight, i.clientHeight, s.scrollHeight, s.clientHeight);
  let f = -a.scrollLeft + gu(e);
  const h = -a.scrollTop;
  return (
    hn(s).direction === "rtl" && (f += Ut(i.clientWidth, s.clientWidth) - l),
    { width: l, height: u, x: f, y: h }
  );
}
const w0 = 25;
function kO(e, i) {
  const a = qt(e),
    s = Nn(e),
    l = a.visualViewport;
  let u = s.clientWidth,
    f = s.clientHeight,
    h = 0,
    m = 0;
  if (l) {
    ((u = l.width), (f = l.height));
    const g = Bh();
    (!g || (g && i === "fixed")) && ((h = l.offsetLeft), (m = l.offsetTop));
  }
  const p = gu(s);
  if (p <= 0) {
    const g = s.ownerDocument,
      y = g.body,
      S = getComputedStyle(y),
      T =
        (g.compatMode === "CSS1Compat" &&
          parseFloat(S.marginLeft) + parseFloat(S.marginRight)) ||
        0,
      C = Math.abs(s.clientWidth - y.clientWidth - T);
    C <= w0 && (u -= C);
  } else p <= w0 && (u += p);
  return { width: u, height: f, x: h, y: m };
}
const BO = new Set(["absolute", "fixed"]);
function UO(e, i) {
  const a = ua(e, !0, i === "fixed"),
    s = a.top + e.clientTop,
    l = a.left + e.clientLeft,
    u = Rn(e) ? lr(e) : Tn(1),
    f = e.clientWidth * u.x,
    h = e.clientHeight * u.y,
    m = l * u.x,
    p = s * u.y;
  return { width: f, height: h, x: m, y: p };
}
function E0(e, i, a) {
  let s;
  if (i === "viewport") s = kO(e, a);
  else if (i === "document") s = VO(Nn(e));
  else if (dn(i)) s = UO(i, a);
  else {
    const l = k1(e);
    s = { x: i.x - l.x, y: i.y - l.y, width: i.width, height: i.height };
  }
  return Zl(s);
}
function U1(e, i) {
  const a = _i(e);
  return a === i || !dn(a) || fr(a)
    ? !1
    : hn(a).position === "fixed" || U1(a, i);
}
function HO(e, i) {
  const a = i.get(e);
  if (a) return a;
  let s = Ls(e, [], !1).filter((h) => dn(h) && br(h) !== "body"),
    l = null;
  const u = hn(e).position === "fixed";
  let f = u ? _i(e) : e;
  for (; dn(f) && !fr(f); ) {
    const h = hn(f),
      m = kh(f);
    (!m && h.position === "fixed" && (l = null),
      (
        u
          ? !m && !l
          : (!m && h.position === "static" && !!l && BO.has(l.position)) ||
            (Is(f) && !m && U1(e, f))
      )
        ? (s = s.filter((g) => g !== f))
        : (l = h),
      (f = _i(f)));
  }
  return (i.set(e, s), s);
}
function qO(e) {
  let { element: i, boundary: a, rootBoundary: s, strategy: l } = e;
  const f = [
      ...(a === "clippingAncestors"
        ? mu(i)
          ? []
          : HO(i, this._c)
        : [].concat(a)),
      s,
    ],
    h = f[0],
    m = f.reduce(
      (p, g) => {
        const y = E0(i, g, l);
        return (
          (p.top = Ut(y.top, p.top)),
          (p.right = ji(y.right, p.right)),
          (p.bottom = ji(y.bottom, p.bottom)),
          (p.left = Ut(y.left, p.left)),
          p
        );
      },
      E0(i, h, l),
    );
  return {
    width: m.right - m.left,
    height: m.bottom - m.top,
    x: m.left,
    y: m.top,
  };
}
function FO(e) {
  const { width: i, height: a } = V1(e);
  return { width: i, height: a };
}
function GO(e, i, a) {
  const s = Rn(i),
    l = Nn(i),
    u = a === "fixed",
    f = ua(e, !0, u, i);
  let h = { scrollLeft: 0, scrollTop: 0 };
  const m = Tn(0);
  function p() {
    m.x = gu(l);
  }
  if (s || (!s && !u))
    if (((br(i) !== "body" || Is(l)) && (h = pu(i)), s)) {
      const T = ua(i, !0, u, i);
      ((m.x = T.x + i.clientLeft), (m.y = T.y + i.clientTop));
    } else l && p();
  u && !s && l && p();
  const g = l && !s && !u ? B1(l, h) : Tn(0),
    y = f.left + h.scrollLeft - m.x - g.x,
    S = f.top + h.scrollTop - m.y - g.y;
  return { x: y, y: S, width: f.width, height: f.height };
}
function ad(e) {
  return hn(e).position === "static";
}
function T0(e, i) {
  if (!Rn(e) || hn(e).position === "fixed") return null;
  if (i) return i(e);
  let a = e.offsetParent;
  return (Nn(e) === a && (a = a.ownerDocument.body), a);
}
function H1(e, i) {
  const a = qt(e);
  if (mu(e)) return a;
  if (!Rn(e)) {
    let l = _i(e);
    for (; l && !fr(l); ) {
      if (dn(l) && !ad(l)) return l;
      l = _i(l);
    }
    return a;
  }
  let s = T0(e, i);
  for (; s && CO(s) && ad(s); ) s = T0(s, i);
  return s && fr(s) && ad(s) && !kh(s) ? a : s || NO(e) || a;
}
const YO = async function (e) {
  const i = this.getOffsetParent || H1,
    a = this.getDimensions,
    s = await a(e.floating);
  return {
    reference: GO(e.reference, await i(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: s.width, height: s.height },
  };
};
function IO(e) {
  return hn(e).direction === "rtl";
}
const XO = {
  convertOffsetParentRelativeRectToViewportRelativeRect: zO,
  getDocumentElement: Nn,
  getClippingRect: qO,
  getOffsetParent: H1,
  getElementRects: YO,
  getClientRects: PO,
  getDimensions: FO,
  getScale: lr,
  isElement: dn,
  isRTL: IO,
};
function q1(e, i) {
  return (
    e.x === i.x && e.y === i.y && e.width === i.width && e.height === i.height
  );
}
function KO(e, i) {
  let a = null,
    s;
  const l = Nn(e);
  function u() {
    var h;
    (clearTimeout(s), (h = a) == null || h.disconnect(), (a = null));
  }
  function f(h, m) {
    (h === void 0 && (h = !1), m === void 0 && (m = 1), u());
    const p = e.getBoundingClientRect(),
      { left: g, top: y, width: S, height: T } = p;
    if ((h || i(), !S || !T)) return;
    const C = wl(y),
      E = wl(l.clientWidth - (g + S)),
      A = wl(l.clientHeight - (y + T)),
      R = wl(g),
      O = {
        rootMargin: -C + "px " + -E + "px " + -A + "px " + -R + "px",
        threshold: Ut(0, ji(1, m)) || 1,
      };
    let V = !0;
    function L($) {
      const H = $[0].intersectionRatio;
      if (H !== m) {
        if (!V) return f();
        H
          ? f(!1, H)
          : (s = setTimeout(() => {
              f(!1, 1e-7);
            }, 1e3));
      }
      (H === 1 && !q1(p, e.getBoundingClientRect()) && f(), (V = !1));
    }
    try {
      a = new IntersectionObserver(L, { ...O, root: l.ownerDocument });
    } catch {
      a = new IntersectionObserver(L, O);
    }
    a.observe(e);
  }
  return (f(!0), u);
}
function $O(e, i, a, s) {
  s === void 0 && (s = {});
  const {
      ancestorScroll: l = !0,
      ancestorResize: u = !0,
      elementResize: f = typeof ResizeObserver == "function",
      layoutShift: h = typeof IntersectionObserver == "function",
      animationFrame: m = !1,
    } = s,
    p = Uh(e),
    g = l || u ? [...(p ? Ls(p) : []), ...Ls(i)] : [];
  g.forEach((R) => {
    (l && R.addEventListener("scroll", a, { passive: !0 }),
      u && R.addEventListener("resize", a));
  });
  const y = p && h ? KO(p, a) : null;
  let S = -1,
    T = null;
  f &&
    ((T = new ResizeObserver((R) => {
      let [M] = R;
      (M &&
        M.target === p &&
        T &&
        (T.unobserve(i),
        cancelAnimationFrame(S),
        (S = requestAnimationFrame(() => {
          var O;
          (O = T) == null || O.observe(i);
        }))),
        a());
    })),
    p && !m && T.observe(p),
    T.observe(i));
  let C,
    E = m ? ua(e) : null;
  m && A();
  function A() {
    const R = ua(e);
    (E && !q1(E, R) && a(), (E = R), (C = requestAnimationFrame(A)));
  }
  return (
    a(),
    () => {
      var R;
      (g.forEach((M) => {
        (l && M.removeEventListener("scroll", a),
          u && M.removeEventListener("resize", a));
      }),
        y?.(),
        (R = T) == null || R.disconnect(),
        (T = null),
        m && cancelAnimationFrame(C));
    }
  );
}
const QO = xO,
  ZO = SO,
  WO = yO,
  JO = EO,
  eN = vO,
  A0 = gO,
  tN = wO,
  nN = (e, i, a) => {
    const s = new Map(),
      l = { platform: XO, ...a },
      u = { ...l.platform, _c: s };
    return pO(e, i, { ...l, platform: u });
  };
var iN = typeof document < "u",
  aN = function () {},
  Vl = iN ? b.useLayoutEffect : aN;
function Wl(e, i) {
  if (e === i) return !0;
  if (typeof e != typeof i) return !1;
  if (typeof e == "function" && e.toString() === i.toString()) return !0;
  let a, s, l;
  if (e && i && typeof e == "object") {
    if (Array.isArray(e)) {
      if (((a = e.length), a !== i.length)) return !1;
      for (s = a; s-- !== 0; ) if (!Wl(e[s], i[s])) return !1;
      return !0;
    }
    if (((l = Object.keys(e)), (a = l.length), a !== Object.keys(i).length))
      return !1;
    for (s = a; s-- !== 0; ) if (!{}.hasOwnProperty.call(i, l[s])) return !1;
    for (s = a; s-- !== 0; ) {
      const u = l[s];
      if (!(u === "_owner" && e.$$typeof) && !Wl(e[u], i[u])) return !1;
    }
    return !0;
  }
  return e !== e && i !== i;
}
function F1(e) {
  return typeof window > "u"
    ? 1
    : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function C0(e, i) {
  const a = F1(e);
  return Math.round(i * a) / a;
}
function rd(e) {
  const i = b.useRef(e);
  return (
    Vl(() => {
      i.current = e;
    }),
    i
  );
}
function rN(e) {
  e === void 0 && (e = {});
  const {
      placement: i = "bottom",
      strategy: a = "absolute",
      middleware: s = [],
      platform: l,
      elements: { reference: u, floating: f } = {},
      transform: h = !0,
      whileElementsMounted: m,
      open: p,
    } = e,
    [g, y] = b.useState({
      x: 0,
      y: 0,
      strategy: a,
      placement: i,
      middlewareData: {},
      isPositioned: !1,
    }),
    [S, T] = b.useState(s);
  Wl(S, s) || T(s);
  const [C, E] = b.useState(null),
    [A, R] = b.useState(null),
    M = b.useCallback((U) => {
      U !== $.current && (($.current = U), E(U));
    }, []),
    O = b.useCallback((U) => {
      U !== H.current && ((H.current = U), R(U));
    }, []),
    V = u || C,
    L = f || A,
    $ = b.useRef(null),
    H = b.useRef(null),
    F = b.useRef(g),
    J = m != null,
    se = rd(m),
    me = rd(l),
    ge = rd(p),
    Ae = b.useCallback(() => {
      if (!$.current || !H.current) return;
      const U = { placement: i, strategy: a, middleware: S };
      (me.current && (U.platform = me.current),
        nN($.current, H.current, U).then((ae) => {
          const ce = { ...ae, isPositioned: ge.current !== !1 };
          ee.current &&
            !Wl(F.current, ce) &&
            ((F.current = ce),
            Gs.flushSync(() => {
              y(ce);
            }));
        }));
    }, [S, i, a, me, ge]);
  Vl(() => {
    p === !1 &&
      F.current.isPositioned &&
      ((F.current.isPositioned = !1), y((U) => ({ ...U, isPositioned: !1 })));
  }, [p]);
  const ee = b.useRef(!1);
  (Vl(
    () => (
      (ee.current = !0),
      () => {
        ee.current = !1;
      }
    ),
    [],
  ),
    Vl(() => {
      if ((V && ($.current = V), L && (H.current = L), V && L)) {
        if (se.current) return se.current(V, L, Ae);
        Ae();
      }
    }, [V, L, Ae, se, J]));
  const he = b.useMemo(
      () => ({ reference: $, floating: H, setReference: M, setFloating: O }),
      [M, O],
    ),
    z = b.useMemo(() => ({ reference: V, floating: L }), [V, L]),
    G = b.useMemo(() => {
      const U = { position: a, left: 0, top: 0 };
      if (!z.floating) return U;
      const ae = C0(z.floating, g.x),
        ce = C0(z.floating, g.y);
      return h
        ? {
            ...U,
            transform: "translate(" + ae + "px, " + ce + "px)",
            ...(F1(z.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: a, left: ae, top: ce };
    }, [a, h, z.floating, g.x, g.y]);
  return b.useMemo(
    () => ({ ...g, update: Ae, refs: he, elements: z, floatingStyles: G }),
    [g, Ae, he, z, G],
  );
}
const sN = (e) => {
    function i(a) {
      return {}.hasOwnProperty.call(a, "current");
    }
    return {
      name: "arrow",
      options: e,
      fn(a) {
        const { element: s, padding: l } = typeof e == "function" ? e(a) : e;
        return s && i(s)
          ? s.current != null
            ? A0({ element: s.current, padding: l }).fn(a)
            : {}
          : s
            ? A0({ element: s, padding: l }).fn(a)
            : {};
      },
    };
  },
  oN = (e, i) => ({ ...QO(e), options: [e, i] }),
  lN = (e, i) => ({ ...ZO(e), options: [e, i] }),
  uN = (e, i) => ({ ...tN(e), options: [e, i] }),
  cN = (e, i) => ({ ...WO(e), options: [e, i] }),
  fN = (e, i) => ({ ...JO(e), options: [e, i] }),
  dN = (e, i) => ({ ...eN(e), options: [e, i] }),
  hN = (e, i) => ({ ...sN(e), options: [e, i] });
var mN = "Arrow",
  G1 = b.forwardRef((e, i) => {
    const { children: a, width: s = 10, height: l = 5, ...u } = e;
    return x.jsx(Mt.svg, {
      ...u,
      ref: i,
      width: s,
      height: l,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? a : x.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
G1.displayName = mN;
var pN = G1;
function gN(e) {
  const [i, a] = b.useState(void 0);
  return (
    rn(() => {
      if (e) {
        a({ width: e.offsetWidth, height: e.offsetHeight });
        const s = new ResizeObserver((l) => {
          if (!Array.isArray(l) || !l.length) return;
          const u = l[0];
          let f, h;
          if ("borderBoxSize" in u) {
            const m = u.borderBoxSize,
              p = Array.isArray(m) ? m[0] : m;
            ((f = p.inlineSize), (h = p.blockSize));
          } else ((f = e.offsetWidth), (h = e.offsetHeight));
          a({ width: f, height: h });
        });
        return (s.observe(e, { box: "border-box" }), () => s.unobserve(e));
      } else a(void 0);
    }, [e]),
    i
  );
}
var Y1 = "Popper",
  [I1, X1] = Ys(Y1),
  [R6, K1] = I1(Y1),
  $1 = "PopperAnchor",
  Q1 = b.forwardRef((e, i) => {
    const { __scopePopper: a, virtualRef: s, ...l } = e,
      u = K1($1, a),
      f = b.useRef(null),
      h = ot(i, f),
      m = b.useRef(null);
    return (
      b.useEffect(() => {
        const p = m.current;
        ((m.current = s?.current || f.current),
          p !== m.current && u.onAnchorChange(m.current));
      }),
      s ? null : x.jsx(Mt.div, { ...l, ref: h })
    );
  });
Q1.displayName = $1;
var Hh = "PopperContent",
  [yN, vN] = I1(Hh),
  Z1 = b.forwardRef((e, i) => {
    const {
        __scopePopper: a,
        side: s = "bottom",
        sideOffset: l = 0,
        align: u = "center",
        alignOffset: f = 0,
        arrowPadding: h = 0,
        avoidCollisions: m = !0,
        collisionBoundary: p = [],
        collisionPadding: g = 0,
        sticky: y = "partial",
        hideWhenDetached: S = !1,
        updatePositionStrategy: T = "optimized",
        onPlaced: C,
        ...E
      } = e,
      A = K1(Hh, a),
      [R, M] = b.useState(null),
      O = ot(i, (oe) => M(oe)),
      [V, L] = b.useState(null),
      $ = gN(V),
      H = $?.width ?? 0,
      F = $?.height ?? 0,
      J = s + (u !== "center" ? "-" + u : ""),
      se =
        typeof g == "number"
          ? g
          : { top: 0, right: 0, bottom: 0, left: 0, ...g },
      me = Array.isArray(p) ? p : [p],
      ge = me.length > 0,
      Ae = { padding: se, boundary: me.filter(xN), altBoundary: ge },
      {
        refs: ee,
        floatingStyles: he,
        placement: z,
        isPositioned: G,
        middlewareData: U,
      } = rN({
        strategy: "fixed",
        placement: J,
        whileElementsMounted: (...oe) =>
          $O(...oe, { animationFrame: T === "always" }),
        elements: { reference: A.anchor },
        middleware: [
          oN({ mainAxis: l + F, alignmentAxis: f }),
          m &&
            lN({
              mainAxis: !0,
              crossAxis: !1,
              limiter: y === "partial" ? uN() : void 0,
              ...Ae,
            }),
          m && cN({ ...Ae }),
          fN({
            ...Ae,
            apply: ({
              elements: oe,
              rects: Ie,
              availableWidth: je,
              availableHeight: Ft,
            }) => {
              const { width: pn, height: gn } = Ie.reference,
                Pi = oe.floating.style;
              (Pi.setProperty("--radix-popper-available-width", `${je}px`),
                Pi.setProperty("--radix-popper-available-height", `${Ft}px`),
                Pi.setProperty("--radix-popper-anchor-width", `${pn}px`),
                Pi.setProperty("--radix-popper-anchor-height", `${gn}px`));
            },
          }),
          V && hN({ element: V, padding: h }),
          SN({ arrowWidth: H, arrowHeight: F }),
          S && dN({ strategy: "referenceHidden", ...Ae }),
        ],
      }),
      [ae, ce] = eS(z),
      N = Dt(C);
    rn(() => {
      G && N?.();
    }, [G, N]);
    const I = U.arrow?.x,
      Z = U.arrow?.y,
      W = U.arrow?.centerOffset !== 0,
      [fe, ye] = b.useState();
    return (
      rn(() => {
        R && ye(window.getComputedStyle(R).zIndex);
      }, [R]),
      x.jsx("div", {
        ref: ee.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...he,
          transform: G ? he.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: fe,
          "--radix-popper-transform-origin": [
            U.transformOrigin?.x,
            U.transformOrigin?.y,
          ].join(" "),
          ...(U.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none",
          }),
        },
        dir: e.dir,
        children: x.jsx(yN, {
          scope: a,
          placedSide: ae,
          onArrowChange: L,
          arrowX: I,
          arrowY: Z,
          shouldHideArrow: W,
          children: x.jsx(Mt.div, {
            "data-side": ae,
            "data-align": ce,
            ...E,
            ref: O,
            style: { ...E.style, animation: G ? void 0 : "none" },
          }),
        }),
      })
    );
  });
Z1.displayName = Hh;
var W1 = "PopperArrow",
  bN = { top: "bottom", right: "left", bottom: "top", left: "right" },
  J1 = b.forwardRef(function (i, a) {
    const { __scopePopper: s, ...l } = i,
      u = vN(W1, s),
      f = bN[u.placedSide];
    return x.jsx("span", {
      ref: u.onArrowChange,
      style: {
        position: "absolute",
        left: u.arrowX,
        top: u.arrowY,
        [f]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[u.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[u.placedSide],
        visibility: u.shouldHideArrow ? "hidden" : void 0,
      },
      children: x.jsx(pN, {
        ...l,
        ref: a,
        style: { ...l.style, display: "block" },
      }),
    });
  });
J1.displayName = W1;
function xN(e) {
  return e !== null;
}
var SN = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(i) {
    const { placement: a, rects: s, middlewareData: l } = i,
      f = l.arrow?.centerOffset !== 0,
      h = f ? 0 : e.arrowWidth,
      m = f ? 0 : e.arrowHeight,
      [p, g] = eS(a),
      y = { start: "0%", center: "50%", end: "100%" }[g],
      S = (l.arrow?.x ?? 0) + h / 2,
      T = (l.arrow?.y ?? 0) + m / 2;
    let C = "",
      E = "";
    return (
      p === "bottom"
        ? ((C = f ? y : `${S}px`), (E = `${-m}px`))
        : p === "top"
          ? ((C = f ? y : `${S}px`), (E = `${s.floating.height + m}px`))
          : p === "right"
            ? ((C = `${-m}px`), (E = f ? y : `${T}px`))
            : p === "left" &&
              ((C = `${s.floating.width + m}px`), (E = f ? y : `${T}px`)),
      { data: { x: C, y: E } }
    );
  },
});
function eS(e) {
  const [i, a = "center"] = e.split("-");
  return [i, a];
}
var wN = Q1,
  EN = Z1,
  TN = J1,
  AN = "Portal",
  qh = b.forwardRef((e, i) => {
    const { container: a, ...s } = e,
      [l, u] = b.useState(!1);
    rn(() => u(!0), []);
    const f = a || (l && globalThis?.document?.body);
    return f ? Mx.createPortal(x.jsx(Mt.div, { ...s, ref: i }), f) : null;
  });
qh.displayName = AN;
function CN(e, i) {
  return b.useReducer((a, s) => i[a][s] ?? a, e);
}
var xr = (e) => {
  const { present: i, children: a } = e,
    s = RN(i),
    l =
      typeof a == "function" ? a({ present: s.isPresent }) : b.Children.only(a),
    u = ot(s.ref, DN(l));
  return typeof a == "function" || s.isPresent
    ? b.cloneElement(l, { ref: u })
    : null;
};
xr.displayName = "Presence";
function RN(e) {
  const [i, a] = b.useState(),
    s = b.useRef(null),
    l = b.useRef(e),
    u = b.useRef("none"),
    f = e ? "mounted" : "unmounted",
    [h, m] = CN(f, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    b.useEffect(() => {
      const p = El(s.current);
      u.current = h === "mounted" ? p : "none";
    }, [h]),
    rn(() => {
      const p = s.current,
        g = l.current;
      if (g !== e) {
        const S = u.current,
          T = El(p);
        (e
          ? m("MOUNT")
          : T === "none" || p?.display === "none"
            ? m("UNMOUNT")
            : m(g && S !== T ? "ANIMATION_OUT" : "UNMOUNT"),
          (l.current = e));
      }
    }, [e, m]),
    rn(() => {
      if (i) {
        let p;
        const g = i.ownerDocument.defaultView ?? window,
          y = (T) => {
            const E = El(s.current).includes(CSS.escape(T.animationName));
            if (T.target === i && E && (m("ANIMATION_END"), !l.current)) {
              const A = i.style.animationFillMode;
              ((i.style.animationFillMode = "forwards"),
                (p = g.setTimeout(() => {
                  i.style.animationFillMode === "forwards" &&
                    (i.style.animationFillMode = A);
                })));
            }
          },
          S = (T) => {
            T.target === i && (u.current = El(s.current));
          };
        return (
          i.addEventListener("animationstart", S),
          i.addEventListener("animationcancel", y),
          i.addEventListener("animationend", y),
          () => {
            (g.clearTimeout(p),
              i.removeEventListener("animationstart", S),
              i.removeEventListener("animationcancel", y),
              i.removeEventListener("animationend", y));
          }
        );
      } else m("ANIMATION_END");
    }, [i, m]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(h),
      ref: b.useCallback((p) => {
        ((s.current = p ? getComputedStyle(p) : null), a(p));
      }, []),
    }
  );
}
function El(e) {
  return e?.animationName || "none";
}
function DN(e) {
  let i = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    a = i && "isReactWarning" in i && i.isReactWarning;
  return a
    ? e.ref
    : ((i = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (a = i && "isReactWarning" in i && i.isReactWarning),
      a ? e.props.ref : e.props.ref || e.ref);
}
var MN = Symbol("radix.slottable");
function ON(e) {
  const i = ({ children: a }) => x.jsx(x.Fragment, { children: a });
  return ((i.displayName = `${e}.Slottable`), (i.__radixId = MN), i);
}
var NN = Object.freeze({
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
  }),
  jN = "VisuallyHidden",
  tS = b.forwardRef((e, i) =>
    x.jsx(Mt.span, { ...e, ref: i, style: { ...NN, ...e.style } }),
  );
tS.displayName = jN;
var _N = tS,
  [yu] = Ys("Tooltip", [X1]),
  Fh = X1(),
  nS = "TooltipProvider",
  LN = 700,
  R0 = "tooltip.open",
  [zN, iS] = yu(nS),
  aS = (e) => {
    const {
        __scopeTooltip: i,
        delayDuration: a = LN,
        skipDelayDuration: s = 300,
        disableHoverableContent: l = !1,
        children: u,
      } = e,
      f = b.useRef(!0),
      h = b.useRef(!1),
      m = b.useRef(0);
    return (
      b.useEffect(() => {
        const p = m.current;
        return () => window.clearTimeout(p);
      }, []),
      x.jsx(zN, {
        scope: i,
        isOpenDelayedRef: f,
        delayDuration: a,
        onOpen: b.useCallback(() => {
          (window.clearTimeout(m.current), (f.current = !1));
        }, []),
        onClose: b.useCallback(() => {
          (window.clearTimeout(m.current),
            (m.current = window.setTimeout(() => (f.current = !0), s)));
        }, [s]),
        isPointerInTransitRef: h,
        onPointerInTransitChange: b.useCallback((p) => {
          h.current = p;
        }, []),
        disableHoverableContent: l,
        children: u,
      })
    );
  };
aS.displayName = nS;
var rS = "Tooltip",
  [D6, Xs] = yu(rS),
  $d = "TooltipTrigger",
  PN = b.forwardRef((e, i) => {
    const { __scopeTooltip: a, ...s } = e,
      l = Xs($d, a),
      u = iS($d, a),
      f = Fh(a),
      h = b.useRef(null),
      m = ot(i, h, l.onTriggerChange),
      p = b.useRef(!1),
      g = b.useRef(!1),
      y = b.useCallback(() => (p.current = !1), []);
    return (
      b.useEffect(
        () => () => document.removeEventListener("pointerup", y),
        [y],
      ),
      x.jsx(wN, {
        asChild: !0,
        ...f,
        children: x.jsx(Mt.button, {
          "aria-describedby": l.open ? l.contentId : void 0,
          "data-state": l.stateAttribute,
          ...s,
          ref: m,
          onPointerMove: Wa(e.onPointerMove, (S) => {
            S.pointerType !== "touch" &&
              !g.current &&
              !u.isPointerInTransitRef.current &&
              (l.onTriggerEnter(), (g.current = !0));
          }),
          onPointerLeave: Wa(e.onPointerLeave, () => {
            (l.onTriggerLeave(), (g.current = !1));
          }),
          onPointerDown: Wa(e.onPointerDown, () => {
            (l.open && l.onClose(),
              (p.current = !0),
              document.addEventListener("pointerup", y, { once: !0 }));
          }),
          onFocus: Wa(e.onFocus, () => {
            p.current || l.onOpen();
          }),
          onBlur: Wa(e.onBlur, l.onClose),
          onClick: Wa(e.onClick, l.onClose),
        }),
      })
    );
  });
PN.displayName = $d;
var Gh = "TooltipPortal",
  [VN, kN] = yu(Gh, { forceMount: void 0 }),
  sS = (e) => {
    const { __scopeTooltip: i, forceMount: a, children: s, container: l } = e,
      u = Xs(Gh, i);
    return x.jsx(VN, {
      scope: i,
      forceMount: a,
      children: x.jsx(xr, {
        present: a || u.open,
        children: x.jsx(qh, { asChild: !0, container: l, children: s }),
      }),
    });
  };
sS.displayName = Gh;
var dr = "TooltipContent",
  oS = b.forwardRef((e, i) => {
    const a = kN(dr, e.__scopeTooltip),
      { forceMount: s = a.forceMount, side: l = "top", ...u } = e,
      f = Xs(dr, e.__scopeTooltip);
    return x.jsx(xr, {
      present: s || f.open,
      children: f.disableHoverableContent
        ? x.jsx(lS, { side: l, ...u, ref: i })
        : x.jsx(BN, { side: l, ...u, ref: i }),
    });
  }),
  BN = b.forwardRef((e, i) => {
    const a = Xs(dr, e.__scopeTooltip),
      s = iS(dr, e.__scopeTooltip),
      l = b.useRef(null),
      u = ot(i, l),
      [f, h] = b.useState(null),
      { trigger: m, onClose: p } = a,
      g = l.current,
      { onPointerInTransitChange: y } = s,
      S = b.useCallback(() => {
        (h(null), y(!1));
      }, [y]),
      T = b.useCallback(
        (C, E) => {
          const A = C.currentTarget,
            R = { x: C.clientX, y: C.clientY },
            M = GN(R, A.getBoundingClientRect()),
            O = YN(R, M),
            V = IN(E.getBoundingClientRect()),
            L = KN([...O, ...V]);
          (h(L), y(!0));
        },
        [y],
      );
    return (
      b.useEffect(() => () => S(), [S]),
      b.useEffect(() => {
        if (m && g) {
          const C = (A) => T(A, g),
            E = (A) => T(A, m);
          return (
            m.addEventListener("pointerleave", C),
            g.addEventListener("pointerleave", E),
            () => {
              (m.removeEventListener("pointerleave", C),
                g.removeEventListener("pointerleave", E));
            }
          );
        }
      }, [m, g, T, S]),
      b.useEffect(() => {
        if (f) {
          const C = (E) => {
            const A = E.target,
              R = { x: E.clientX, y: E.clientY },
              M = m?.contains(A) || g?.contains(A),
              O = !XN(R, f);
            M ? S() : O && (S(), p());
          };
          return (
            document.addEventListener("pointermove", C),
            () => document.removeEventListener("pointermove", C)
          );
        }
      }, [m, g, f, p, S]),
      x.jsx(lS, { ...e, ref: u })
    );
  }),
  [UN, HN] = yu(rS, { isInside: !1 }),
  qN = ON("TooltipContent"),
  lS = b.forwardRef((e, i) => {
    const {
        __scopeTooltip: a,
        children: s,
        "aria-label": l,
        onEscapeKeyDown: u,
        onPointerDownOutside: f,
        ...h
      } = e,
      m = Xs(dr, a),
      p = Fh(a),
      { onClose: g } = m;
    return (
      b.useEffect(
        () => (
          document.addEventListener(R0, g),
          () => document.removeEventListener(R0, g)
        ),
        [g],
      ),
      b.useEffect(() => {
        if (m.trigger) {
          const y = (S) => {
            S.target?.contains(m.trigger) && g();
          };
          return (
            window.addEventListener("scroll", y, { capture: !0 }),
            () => window.removeEventListener("scroll", y, { capture: !0 })
          );
        }
      }, [m.trigger, g]),
      x.jsx(Lh, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: u,
        onPointerDownOutside: f,
        onFocusOutside: (y) => y.preventDefault(),
        onDismiss: g,
        children: x.jsxs(EN, {
          "data-state": m.stateAttribute,
          ...p,
          ...h,
          ref: i,
          style: {
            ...h.style,
            "--radix-tooltip-content-transform-origin":
              "var(--radix-popper-transform-origin)",
            "--radix-tooltip-content-available-width":
              "var(--radix-popper-available-width)",
            "--radix-tooltip-content-available-height":
              "var(--radix-popper-available-height)",
            "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-tooltip-trigger-height":
              "var(--radix-popper-anchor-height)",
          },
          children: [
            x.jsx(qN, { children: s }),
            x.jsx(UN, {
              scope: a,
              isInside: !0,
              children: x.jsx(_N, {
                id: m.contentId,
                role: "tooltip",
                children: l || s,
              }),
            }),
          ],
        }),
      })
    );
  });
oS.displayName = dr;
var uS = "TooltipArrow",
  FN = b.forwardRef((e, i) => {
    const { __scopeTooltip: a, ...s } = e,
      l = Fh(a);
    return HN(uS, a).isInside ? null : x.jsx(TN, { ...l, ...s, ref: i });
  });
FN.displayName = uS;
function GN(e, i) {
  const a = Math.abs(i.top - e.y),
    s = Math.abs(i.bottom - e.y),
    l = Math.abs(i.right - e.x),
    u = Math.abs(i.left - e.x);
  switch (Math.min(a, s, l, u)) {
    case u:
      return "left";
    case l:
      return "right";
    case a:
      return "top";
    case s:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function YN(e, i, a = 5) {
  const s = [];
  switch (i) {
    case "top":
      s.push({ x: e.x - a, y: e.y + a }, { x: e.x + a, y: e.y + a });
      break;
    case "bottom":
      s.push({ x: e.x - a, y: e.y - a }, { x: e.x + a, y: e.y - a });
      break;
    case "left":
      s.push({ x: e.x + a, y: e.y - a }, { x: e.x + a, y: e.y + a });
      break;
    case "right":
      s.push({ x: e.x - a, y: e.y - a }, { x: e.x - a, y: e.y + a });
      break;
  }
  return s;
}
function IN(e) {
  const { top: i, right: a, bottom: s, left: l } = e;
  return [
    { x: l, y: i },
    { x: a, y: i },
    { x: a, y: s },
    { x: l, y: s },
  ];
}
function XN(e, i) {
  const { x: a, y: s } = e;
  let l = !1;
  for (let u = 0, f = i.length - 1; u < i.length; f = u++) {
    const h = i[u],
      m = i[f],
      p = h.x,
      g = h.y,
      y = m.x,
      S = m.y;
    g > s != S > s && a < ((y - p) * (s - g)) / (S - g) + p && (l = !l);
  }
  return l;
}
function KN(e) {
  const i = e.slice();
  return (
    i.sort((a, s) =>
      a.x < s.x ? -1 : a.x > s.x ? 1 : a.y < s.y ? -1 : a.y > s.y ? 1 : 0,
    ),
    $N(i)
  );
}
function $N(e) {
  if (e.length <= 1) return e.slice();
  const i = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    for (; i.length >= 2; ) {
      const u = i[i.length - 1],
        f = i[i.length - 2];
      if ((u.x - f.x) * (l.y - f.y) >= (u.y - f.y) * (l.x - f.x)) i.pop();
      else break;
    }
    i.push(l);
  }
  i.pop();
  const a = [];
  for (let s = e.length - 1; s >= 0; s--) {
    const l = e[s];
    for (; a.length >= 2; ) {
      const u = a[a.length - 1],
        f = a[a.length - 2];
      if ((u.x - f.x) * (l.y - f.y) >= (u.y - f.y) * (l.x - f.x)) a.pop();
      else break;
    }
    a.push(l);
  }
  return (
    a.pop(),
    i.length === 1 && a.length === 1 && i[0].x === a[0].x && i[0].y === a[0].y
      ? i
      : i.concat(a)
  );
}
var QN = aS,
  ZN = sS,
  cS = oS;
const WN = QN,
  JN = b.forwardRef(({ className: e, sideOffset: i = 4, ...a }, s) =>
    x.jsx(ZN, {
      children: x.jsx(cS, {
        ref: s,
        sideOffset: i,
        className: ht(
          "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
          e,
        ),
        ...a,
      }),
    }),
  );
JN.displayName = cS.displayName;
const Yh = b.forwardRef(({ className: e, ...i }, a) =>
  x.jsx("div", {
    ref: a,
    className: ht("rounded-xl border bg-card text-card-foreground shadow", e),
    ...i,
  }),
);
Yh.displayName = "Card";
const ej = b.forwardRef(({ className: e, ...i }, a) =>
  x.jsx("div", {
    ref: a,
    className: ht("flex flex-col space-y-1.5 p-6", e),
    ...i,
  }),
);
ej.displayName = "CardHeader";
const tj = b.forwardRef(({ className: e, ...i }, a) =>
  x.jsx("div", {
    ref: a,
    className: ht("font-semibold leading-none tracking-tight", e),
    ...i,
  }),
);
tj.displayName = "CardTitle";
const nj = b.forwardRef(({ className: e, ...i }, a) =>
  x.jsx("div", {
    ref: a,
    className: ht("text-sm text-muted-foreground", e),
    ...i,
  }),
);
nj.displayName = "CardDescription";
const Ih = b.forwardRef(({ className: e, ...i }, a) =>
  x.jsx("div", { ref: a, className: ht("p-6 pt-0", e), ...i }),
);
Ih.displayName = "CardContent";
const ij = b.forwardRef(({ className: e, ...i }, a) =>
  x.jsx("div", {
    ref: a,
    className: ht("flex items-center p-6 pt-0", e),
    ...i,
  }),
);
ij.displayName = "CardFooter";
function aj() {
  return x.jsx("div", {
    className:
      "min-h-screen w-full flex items-center justify-center bg-gray-50",
    children: x.jsx(Yh, {
      className: "w-full max-w-md mx-4",
      children: x.jsxs(Ih, {
        className: "pt-6",
        children: [
          x.jsxs("div", {
            className: "flex mb-4 gap-2",
            children: [
              x.jsx(ND, { className: "h-8 w-8 text-red-500" }),
              x.jsx("h1", {
                className: "text-2xl font-bold text-gray-900",
                children: "404 Page Not Found",
              }),
            ],
          }),
          x.jsx("p", {
            className: "mt-4 text-sm text-gray-600",
            children: "Did you forget to add the page to the router?",
          }),
        ],
      }),
    }),
  });
}
const fS = b.createContext({});
function dS(e) {
  const i = b.useRef(null);
  return (i.current === null && (i.current = e()), i.current);
}
const Xh = typeof window < "u",
  hS = Xh ? b.useLayoutEffect : b.useEffect,
  Kh = b.createContext(null);
function $h(e, i) {
  e.indexOf(i) === -1 && e.push(i);
}
function Qh(e, i) {
  const a = e.indexOf(i);
  a > -1 && e.splice(a, 1);
}
const Dn = (e, i, a) => (a > i ? i : a < e ? e : a);
let zs = () => {};
const ti = {},
  mS = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function pS(e) {
  return typeof e == "object" && e !== null;
}
const gS = (e) => /^0[^.\s]+$/u.test(e);
function Zh(e) {
  let i;
  return () => (i === void 0 && (i = e()), i);
}
const Rt = (e) => e,
  rj = (e, i) => (a) => i(e(a)),
  Ks = (...e) => e.reduce(rj),
  hr = (e, i, a) => {
    const s = i - e;
    return s === 0 ? 1 : (a - e) / s;
  };
class Wh {
  constructor() {
    this.subscriptions = [];
  }
  add(i) {
    return ($h(this.subscriptions, i), () => Qh(this.subscriptions, i));
  }
  notify(i, a, s) {
    const l = this.subscriptions.length;
    if (l)
      if (l === 1) this.subscriptions[0](i, a, s);
      else
        for (let u = 0; u < l; u++) {
          const f = this.subscriptions[u];
          f && f(i, a, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const An = (e) => e * 1e3,
  nn = (e) => e / 1e3;
function Jh(e, i) {
  return i ? e * (1e3 / i) : 0;
}
const yS = (e, i, a) =>
    (((1 - 3 * a + 3 * i) * e + (3 * a - 6 * i)) * e + 3 * i) * e,
  sj = 1e-7,
  oj = 12;
function lj(e, i, a, s, l) {
  let u,
    f,
    h = 0;
  do ((f = i + (a - i) / 2), (u = yS(f, s, l) - e), u > 0 ? (a = f) : (i = f));
  while (Math.abs(u) > sj && ++h < oj);
  return f;
}
function $s(e, i, a, s) {
  if (e === i && a === s) return Rt;
  const l = (u) => lj(u, 0, 1, e, a);
  return (u) => (u === 0 || u === 1 ? u : yS(l(u), i, s));
}
const vS = (e) => (i) => (i <= 0.5 ? e(2 * i) / 2 : (2 - e(2 * (1 - i))) / 2),
  bS = (e) => (i) => 1 - e(1 - i),
  xS = $s(0.33, 1.53, 0.69, 0.99),
  em = bS(xS),
  SS = vS(em),
  wS = (e) =>
    (e *= 2) < 1 ? 0.5 * em(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
  tm = (e) => 1 - Math.sin(Math.acos(e)),
  ES = bS(tm),
  TS = vS(tm),
  uj = $s(0.42, 0, 1, 1),
  cj = $s(0, 0, 0.58, 1),
  AS = $s(0.42, 0, 0.58, 1),
  fj = (e) => Array.isArray(e) && typeof e[0] != "number",
  CS = (e) => Array.isArray(e) && typeof e[0] == "number",
  dj = {
    linear: Rt,
    easeIn: uj,
    easeInOut: AS,
    easeOut: cj,
    circIn: tm,
    circInOut: TS,
    circOut: ES,
    backIn: em,
    backInOut: SS,
    backOut: xS,
    anticipate: wS,
  },
  hj = (e) => typeof e == "string",
  D0 = (e) => {
    if (CS(e)) {
      zs(e.length === 4);
      const [i, a, s, l] = e;
      return $s(i, a, s, l);
    } else if (hj(e)) return dj[e];
    return e;
  },
  Tl = [
    "setup",
    "read",
    "resolveKeyframes",
    "preUpdate",
    "update",
    "preRender",
    "render",
    "postRender",
  ];
function mj(e, i) {
  let a = new Set(),
    s = new Set(),
    l = !1,
    u = !1;
  const f = new WeakSet();
  let h = { delta: 0, timestamp: 0, isProcessing: !1 };
  function m(g) {
    (f.has(g) && (p.schedule(g), e()), g(h));
  }
  const p = {
    schedule: (g, y = !1, S = !1) => {
      const C = S && l ? a : s;
      return (y && f.add(g), C.has(g) || C.add(g), g);
    },
    cancel: (g) => {
      (s.delete(g), f.delete(g));
    },
    process: (g) => {
      if (((h = g), l)) {
        u = !0;
        return;
      }
      ((l = !0),
        ([a, s] = [s, a]),
        a.forEach(m),
        a.clear(),
        (l = !1),
        u && ((u = !1), p.process(g)));
    },
  };
  return p;
}
const pj = 40;
function RS(e, i) {
  let a = !1,
    s = !0;
  const l = { delta: 0, timestamp: 0, isProcessing: !1 },
    u = () => (a = !0),
    f = Tl.reduce((O, V) => ((O[V] = mj(u)), O), {}),
    {
      setup: h,
      read: m,
      resolveKeyframes: p,
      preUpdate: g,
      update: y,
      preRender: S,
      render: T,
      postRender: C,
    } = f,
    E = () => {
      const O = ti.useManualTiming ? l.timestamp : performance.now();
      ((a = !1),
        ti.useManualTiming ||
          (l.delta = s ? 1e3 / 60 : Math.max(Math.min(O - l.timestamp, pj), 1)),
        (l.timestamp = O),
        (l.isProcessing = !0),
        h.process(l),
        m.process(l),
        p.process(l),
        g.process(l),
        y.process(l),
        S.process(l),
        T.process(l),
        C.process(l),
        (l.isProcessing = !1),
        a && i && ((s = !1), e(E)));
    },
    A = () => {
      ((a = !0), (s = !0), l.isProcessing || e(E));
    };
  return {
    schedule: Tl.reduce((O, V) => {
      const L = f[V];
      return (
        (O[V] = ($, H = !1, F = !1) => (a || A(), L.schedule($, H, F))),
        O
      );
    }, {}),
    cancel: (O) => {
      for (let V = 0; V < Tl.length; V++) f[Tl[V]].cancel(O);
    },
    state: l,
    steps: f,
  };
}
const {
  schedule: Pe,
  cancel: Mn,
  state: st,
  steps: sd,
} = RS(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Rt, !0);
let kl;
function gj() {
  kl = void 0;
}
const Ct = {
    now: () => (
      kl === void 0 &&
        Ct.set(
          st.isProcessing || ti.useManualTiming
            ? st.timestamp
            : performance.now(),
        ),
      kl
    ),
    set: (e) => {
      ((kl = e), queueMicrotask(gj));
    },
  },
  DS = (e) => (i) => typeof i == "string" && i.startsWith(e),
  nm = DS("--"),
  yj = DS("var(--"),
  im = (e) => (yj(e) ? vj.test(e.split("/*")[0].trim()) : !1),
  vj =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  Sr = {
    test: (e) => typeof e == "number",
    parse: parseFloat,
    transform: (e) => e,
  },
  Ps = { ...Sr, transform: (e) => Dn(0, 1, e) },
  Al = { ...Sr, default: 1 },
  Ts = (e) => Math.round(e * 1e5) / 1e5,
  am = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function bj(e) {
  return e == null;
}
const xj =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  rm = (e, i) => (a) =>
    !!(
      (typeof a == "string" && xj.test(a) && a.startsWith(e)) ||
      (i && !bj(a) && Object.prototype.hasOwnProperty.call(a, i))
    ),
  MS = (e, i, a) => (s) => {
    if (typeof s != "string") return s;
    const [l, u, f, h] = s.match(am);
    return {
      [e]: parseFloat(l),
      [i]: parseFloat(u),
      [a]: parseFloat(f),
      alpha: h !== void 0 ? parseFloat(h) : 1,
    };
  },
  Sj = (e) => Dn(0, 255, e),
  od = { ...Sr, transform: (e) => Math.round(Sj(e)) },
  ra = {
    test: rm("rgb", "red"),
    parse: MS("red", "green", "blue"),
    transform: ({ red: e, green: i, blue: a, alpha: s = 1 }) =>
      "rgba(" +
      od.transform(e) +
      ", " +
      od.transform(i) +
      ", " +
      od.transform(a) +
      ", " +
      Ts(Ps.transform(s)) +
      ")",
  };
function wj(e) {
  let i = "",
    a = "",
    s = "",
    l = "";
  return (
    e.length > 5
      ? ((i = e.substring(1, 3)),
        (a = e.substring(3, 5)),
        (s = e.substring(5, 7)),
        (l = e.substring(7, 9)))
      : ((i = e.substring(1, 2)),
        (a = e.substring(2, 3)),
        (s = e.substring(3, 4)),
        (l = e.substring(4, 5)),
        (i += i),
        (a += a),
        (s += s),
        (l += l)),
    {
      red: parseInt(i, 16),
      green: parseInt(a, 16),
      blue: parseInt(s, 16),
      alpha: l ? parseInt(l, 16) / 255 : 1,
    }
  );
}
const Qd = { test: rm("#"), parse: wj, transform: ra.transform },
  Qs = (e) => ({
    test: (i) =>
      typeof i == "string" && i.endsWith(e) && i.split(" ").length === 1,
    parse: parseFloat,
    transform: (i) => `${i}${e}`,
  }),
  Oi = Qs("deg"),
  Cn = Qs("%"),
  de = Qs("px"),
  Ej = Qs("vh"),
  Tj = Qs("vw"),
  M0 = {
    ...Cn,
    parse: (e) => Cn.parse(e) / 100,
    transform: (e) => Cn.transform(e * 100),
  },
  nr = {
    test: rm("hsl", "hue"),
    parse: MS("hue", "saturation", "lightness"),
    transform: ({ hue: e, saturation: i, lightness: a, alpha: s = 1 }) =>
      "hsla(" +
      Math.round(e) +
      ", " +
      Cn.transform(Ts(i)) +
      ", " +
      Cn.transform(Ts(a)) +
      ", " +
      Ts(Ps.transform(s)) +
      ")",
  },
  et = {
    test: (e) => ra.test(e) || Qd.test(e) || nr.test(e),
    parse: (e) =>
      ra.test(e) ? ra.parse(e) : nr.test(e) ? nr.parse(e) : Qd.parse(e),
    transform: (e) =>
      typeof e == "string"
        ? e
        : e.hasOwnProperty("red")
          ? ra.transform(e)
          : nr.transform(e),
    getAnimatableNone: (e) => {
      const i = et.parse(e);
      return ((i.alpha = 0), et.transform(i));
    },
  },
  Aj =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Cj(e) {
  return (
    isNaN(e) &&
    typeof e == "string" &&
    (e.match(am)?.length || 0) + (e.match(Aj)?.length || 0) > 0
  );
}
const OS = "number",
  NS = "color",
  Rj = "var",
  Dj = "var(",
  O0 = "${}",
  Mj =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Vs(e) {
  const i = e.toString(),
    a = [],
    s = { color: [], number: [], var: [] },
    l = [];
  let u = 0;
  const h = i
    .replace(
      Mj,
      (m) => (
        et.test(m)
          ? (s.color.push(u), l.push(NS), a.push(et.parse(m)))
          : m.startsWith(Dj)
            ? (s.var.push(u), l.push(Rj), a.push(m))
            : (s.number.push(u), l.push(OS), a.push(parseFloat(m))),
        ++u,
        O0
      ),
    )
    .split(O0);
  return { values: a, split: h, indexes: s, types: l };
}
function jS(e) {
  return Vs(e).values;
}
function _S(e) {
  const { split: i, types: a } = Vs(e),
    s = i.length;
  return (l) => {
    let u = "";
    for (let f = 0; f < s; f++)
      if (((u += i[f]), l[f] !== void 0)) {
        const h = a[f];
        h === OS
          ? (u += Ts(l[f]))
          : h === NS
            ? (u += et.transform(l[f]))
            : (u += l[f]);
      }
    return u;
  };
}
const Oj = (e) =>
  typeof e == "number" ? 0 : et.test(e) ? et.getAnimatableNone(e) : e;
function Nj(e) {
  const i = jS(e);
  return _S(e)(i.map(Oj));
}
const Li = {
  test: Cj,
  parse: jS,
  createTransformer: _S,
  getAnimatableNone: Nj,
};
function ld(e, i, a) {
  return (
    a < 0 && (a += 1),
    a > 1 && (a -= 1),
    a < 1 / 6
      ? e + (i - e) * 6 * a
      : a < 1 / 2
        ? i
        : a < 2 / 3
          ? e + (i - e) * (2 / 3 - a) * 6
          : e
  );
}
function jj({ hue: e, saturation: i, lightness: a, alpha: s }) {
  ((e /= 360), (i /= 100), (a /= 100));
  let l = 0,
    u = 0,
    f = 0;
  if (!i) l = u = f = a;
  else {
    const h = a < 0.5 ? a * (1 + i) : a + i - a * i,
      m = 2 * a - h;
    ((l = ld(m, h, e + 1 / 3)), (u = ld(m, h, e)), (f = ld(m, h, e - 1 / 3)));
  }
  return {
    red: Math.round(l * 255),
    green: Math.round(u * 255),
    blue: Math.round(f * 255),
    alpha: s,
  };
}
function Jl(e, i) {
  return (a) => (a > 0 ? i : e);
}
const He = (e, i, a) => e + (i - e) * a,
  ud = (e, i, a) => {
    const s = e * e,
      l = a * (i * i - s) + s;
    return l < 0 ? 0 : Math.sqrt(l);
  },
  _j = [Qd, ra, nr],
  Lj = (e) => _j.find((i) => i.test(e));
function N0(e) {
  const i = Lj(e);
  if (!i) return !1;
  let a = i.parse(e);
  return (i === nr && (a = jj(a)), a);
}
const j0 = (e, i) => {
    const a = N0(e),
      s = N0(i);
    if (!a || !s) return Jl(e, i);
    const l = { ...a };
    return (u) => (
      (l.red = ud(a.red, s.red, u)),
      (l.green = ud(a.green, s.green, u)),
      (l.blue = ud(a.blue, s.blue, u)),
      (l.alpha = He(a.alpha, s.alpha, u)),
      ra.transform(l)
    );
  },
  Zd = new Set(["none", "hidden"]);
function zj(e, i) {
  return Zd.has(e) ? (a) => (a <= 0 ? e : i) : (a) => (a >= 1 ? i : e);
}
function Pj(e, i) {
  return (a) => He(e, i, a);
}
function sm(e) {
  return typeof e == "number"
    ? Pj
    : typeof e == "string"
      ? im(e)
        ? Jl
        : et.test(e)
          ? j0
          : Bj
      : Array.isArray(e)
        ? LS
        : typeof e == "object"
          ? et.test(e)
            ? j0
            : Vj
          : Jl;
}
function LS(e, i) {
  const a = [...e],
    s = a.length,
    l = e.map((u, f) => sm(u)(u, i[f]));
  return (u) => {
    for (let f = 0; f < s; f++) a[f] = l[f](u);
    return a;
  };
}
function Vj(e, i) {
  const a = { ...e, ...i },
    s = {};
  for (const l in a)
    e[l] !== void 0 && i[l] !== void 0 && (s[l] = sm(e[l])(e[l], i[l]));
  return (l) => {
    for (const u in s) a[u] = s[u](l);
    return a;
  };
}
function kj(e, i) {
  const a = [],
    s = { color: 0, var: 0, number: 0 };
  for (let l = 0; l < i.values.length; l++) {
    const u = i.types[l],
      f = e.indexes[u][s[u]],
      h = e.values[f] ?? 0;
    ((a[l] = h), s[u]++);
  }
  return a;
}
const Bj = (e, i) => {
  const a = Li.createTransformer(i),
    s = Vs(e),
    l = Vs(i);
  return s.indexes.var.length === l.indexes.var.length &&
    s.indexes.color.length === l.indexes.color.length &&
    s.indexes.number.length >= l.indexes.number.length
    ? (Zd.has(e) && !l.values.length) || (Zd.has(i) && !s.values.length)
      ? zj(e, i)
      : Ks(LS(kj(s, l), l.values), a)
    : Jl(e, i);
};
function zS(e, i, a) {
  return typeof e == "number" && typeof i == "number" && typeof a == "number"
    ? He(e, i, a)
    : sm(e)(e, i);
}
const Uj = (e) => {
    const i = ({ timestamp: a }) => e(a);
    return {
      start: (a = !0) => Pe.update(i, a),
      stop: () => Mn(i),
      now: () => (st.isProcessing ? st.timestamp : Ct.now()),
    };
  },
  PS = (e, i, a = 10) => {
    let s = "";
    const l = Math.max(Math.round(i / a), 2);
    for (let u = 0; u < l; u++)
      s += Math.round(e(u / (l - 1)) * 1e4) / 1e4 + ", ";
    return `linear(${s.substring(0, s.length - 2)})`;
  },
  eu = 2e4;
function om(e) {
  let i = 0;
  const a = 50;
  let s = e.next(i);
  for (; !s.done && i < eu; ) ((i += a), (s = e.next(i)));
  return i >= eu ? 1 / 0 : i;
}
function Hj(e, i = 100, a) {
  const s = a({ ...e, keyframes: [0, i] }),
    l = Math.min(om(s), eu);
  return {
    type: "keyframes",
    ease: (u) => s.next(l * u).value / i,
    duration: nn(l),
  };
}
const qj = 5;
function VS(e, i, a) {
  const s = Math.max(i - qj, 0);
  return Jh(a - e(s), i - s);
}
const Ye = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  cd = 0.001;
function Fj({
  duration: e = Ye.duration,
  bounce: i = Ye.bounce,
  velocity: a = Ye.velocity,
  mass: s = Ye.mass,
}) {
  let l,
    u,
    f = 1 - i;
  ((f = Dn(Ye.minDamping, Ye.maxDamping, f)),
    (e = Dn(Ye.minDuration, Ye.maxDuration, nn(e))),
    f < 1
      ? ((l = (p) => {
          const g = p * f,
            y = g * e,
            S = g - a,
            T = Wd(p, f),
            C = Math.exp(-y);
          return cd - (S / T) * C;
        }),
        (u = (p) => {
          const y = p * f * e,
            S = y * a + a,
            T = Math.pow(f, 2) * Math.pow(p, 2) * e,
            C = Math.exp(-y),
            E = Wd(Math.pow(p, 2), f);
          return ((-l(p) + cd > 0 ? -1 : 1) * ((S - T) * C)) / E;
        }))
      : ((l = (p) => {
          const g = Math.exp(-p * e),
            y = (p - a) * e + 1;
          return -cd + g * y;
        }),
        (u = (p) => {
          const g = Math.exp(-p * e),
            y = (a - p) * (e * e);
          return g * y;
        })));
  const h = 5 / e,
    m = Yj(l, u, h);
  if (((e = An(e)), isNaN(m)))
    return { stiffness: Ye.stiffness, damping: Ye.damping, duration: e };
  {
    const p = Math.pow(m, 2) * s;
    return { stiffness: p, damping: f * 2 * Math.sqrt(s * p), duration: e };
  }
}
const Gj = 12;
function Yj(e, i, a) {
  let s = a;
  for (let l = 1; l < Gj; l++) s = s - e(s) / i(s);
  return s;
}
function Wd(e, i) {
  return e * Math.sqrt(1 - i * i);
}
const Ij = ["duration", "bounce"],
  Xj = ["stiffness", "damping", "mass"];
function _0(e, i) {
  return i.some((a) => e[a] !== void 0);
}
function Kj(e) {
  let i = {
    velocity: Ye.velocity,
    stiffness: Ye.stiffness,
    damping: Ye.damping,
    mass: Ye.mass,
    isResolvedFromDuration: !1,
    ...e,
  };
  if (!_0(e, Xj) && _0(e, Ij))
    if (e.visualDuration) {
      const a = e.visualDuration,
        s = (2 * Math.PI) / (a * 1.2),
        l = s * s,
        u = 2 * Dn(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(l);
      i = { ...i, mass: Ye.mass, stiffness: l, damping: u };
    } else {
      const a = Fj(e);
      ((i = { ...i, ...a, mass: Ye.mass }), (i.isResolvedFromDuration = !0));
    }
  return i;
}
function tu(e = Ye.visualDuration, i = Ye.bounce) {
  const a =
    typeof e != "object"
      ? { visualDuration: e, keyframes: [0, 1], bounce: i }
      : e;
  let { restSpeed: s, restDelta: l } = a;
  const u = a.keyframes[0],
    f = a.keyframes[a.keyframes.length - 1],
    h = { done: !1, value: u },
    {
      stiffness: m,
      damping: p,
      mass: g,
      duration: y,
      velocity: S,
      isResolvedFromDuration: T,
    } = Kj({ ...a, velocity: -nn(a.velocity || 0) }),
    C = S || 0,
    E = p / (2 * Math.sqrt(m * g)),
    A = f - u,
    R = nn(Math.sqrt(m / g)),
    M = Math.abs(A) < 5;
  (s || (s = M ? Ye.restSpeed.granular : Ye.restSpeed.default),
    l || (l = M ? Ye.restDelta.granular : Ye.restDelta.default));
  let O;
  if (E < 1) {
    const L = Wd(R, E);
    O = ($) => {
      const H = Math.exp(-E * R * $);
      return (
        f - H * (((C + E * R * A) / L) * Math.sin(L * $) + A * Math.cos(L * $))
      );
    };
  } else if (E === 1) O = (L) => f - Math.exp(-R * L) * (A + (C + R * A) * L);
  else {
    const L = R * Math.sqrt(E * E - 1);
    O = ($) => {
      const H = Math.exp(-E * R * $),
        F = Math.min(L * $, 300);
      return (
        f - (H * ((C + E * R * A) * Math.sinh(F) + L * A * Math.cosh(F))) / L
      );
    };
  }
  const V = {
    calculatedDuration: (T && y) || null,
    next: (L) => {
      const $ = O(L);
      if (T) h.done = L >= y;
      else {
        let H = L === 0 ? C : 0;
        E < 1 && (H = L === 0 ? An(C) : VS(O, L, $));
        const F = Math.abs(H) <= s,
          J = Math.abs(f - $) <= l;
        h.done = F && J;
      }
      return ((h.value = h.done ? f : $), h);
    },
    toString: () => {
      const L = Math.min(om(V), eu),
        $ = PS((H) => V.next(L * H).value, L, 30);
      return L + "ms " + $;
    },
    toTransition: () => {},
  };
  return V;
}
tu.applyToOptions = (e) => {
  const i = Hj(e, 100, tu);
  return (
    (e.ease = i.ease),
    (e.duration = An(i.duration)),
    (e.type = "keyframes"),
    e
  );
};
function Jd({
  keyframes: e,
  velocity: i = 0,
  power: a = 0.8,
  timeConstant: s = 325,
  bounceDamping: l = 10,
  bounceStiffness: u = 500,
  modifyTarget: f,
  min: h,
  max: m,
  restDelta: p = 0.5,
  restSpeed: g,
}) {
  const y = e[0],
    S = { done: !1, value: y },
    T = (F) => (h !== void 0 && F < h) || (m !== void 0 && F > m),
    C = (F) =>
      h === void 0
        ? m
        : m === void 0 || Math.abs(h - F) < Math.abs(m - F)
          ? h
          : m;
  let E = a * i;
  const A = y + E,
    R = f === void 0 ? A : f(A);
  R !== A && (E = R - y);
  const M = (F) => -E * Math.exp(-F / s),
    O = (F) => R + M(F),
    V = (F) => {
      const J = M(F),
        se = O(F);
      ((S.done = Math.abs(J) <= p), (S.value = S.done ? R : se));
    };
  let L, $;
  const H = (F) => {
    T(S.value) &&
      ((L = F),
      ($ = tu({
        keyframes: [S.value, C(S.value)],
        velocity: VS(O, F, S.value),
        damping: l,
        stiffness: u,
        restDelta: p,
        restSpeed: g,
      })));
  };
  return (
    H(0),
    {
      calculatedDuration: null,
      next: (F) => {
        let J = !1;
        return (
          !$ && L === void 0 && ((J = !0), V(F), H(F)),
          L !== void 0 && F >= L ? $.next(F - L) : (!J && V(F), S)
        );
      },
    }
  );
}
function $j(e, i, a) {
  const s = [],
    l = a || ti.mix || zS,
    u = e.length - 1;
  for (let f = 0; f < u; f++) {
    let h = l(e[f], e[f + 1]);
    if (i) {
      const m = Array.isArray(i) ? i[f] || Rt : i;
      h = Ks(m, h);
    }
    s.push(h);
  }
  return s;
}
function kS(e, i, { clamp: a = !0, ease: s, mixer: l } = {}) {
  const u = e.length;
  if ((zs(u === i.length), u === 1)) return () => i[0];
  if (u === 2 && i[0] === i[1]) return () => i[1];
  const f = e[0] === e[1];
  e[0] > e[u - 1] && ((e = [...e].reverse()), (i = [...i].reverse()));
  const h = $j(i, s, l),
    m = h.length,
    p = (g) => {
      if (f && g < e[0]) return i[0];
      let y = 0;
      if (m > 1) for (; y < e.length - 2 && !(g < e[y + 1]); y++);
      const S = hr(e[y], e[y + 1], g);
      return h[y](S);
    };
  return a ? (g) => p(Dn(e[0], e[u - 1], g)) : p;
}
function Qj(e, i) {
  const a = e[e.length - 1];
  for (let s = 1; s <= i; s++) {
    const l = hr(0, i, s);
    e.push(He(a, 1, l));
  }
}
function BS(e) {
  const i = [0];
  return (Qj(i, e.length - 1), i);
}
function Zj(e, i) {
  return e.map((a) => a * i);
}
function Wj(e, i) {
  return e.map(() => i || AS).splice(0, e.length - 1);
}
function As({
  duration: e = 300,
  keyframes: i,
  times: a,
  ease: s = "easeInOut",
}) {
  const l = fj(s) ? s.map(D0) : D0(s),
    u = { done: !1, value: i[0] },
    f = Zj(a && a.length === i.length ? a : BS(i), e),
    h = kS(f, i, { ease: Array.isArray(l) ? l : Wj(i, l) });
  return {
    calculatedDuration: e,
    next: (m) => ((u.value = h(m)), (u.done = m >= e), u),
  };
}
const Jj = (e) => e !== null;
function lm(e, { repeat: i, repeatType: a = "loop" }, s, l = 1) {
  const u = e.filter(Jj),
    h = l < 0 || (i && a !== "loop" && i % 2 === 1) ? 0 : u.length - 1;
  return !h || s === void 0 ? u[h] : s;
}
const e3 = { decay: Jd, inertia: Jd, tween: As, keyframes: As, spring: tu };
function US(e) {
  typeof e.type == "string" && (e.type = e3[e.type]);
}
class um {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((i) => {
      this.resolve = i;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  then(i, a) {
    return this.finished.then(i, a);
  }
}
const t3 = (e) => e / 100;
class cm extends um {
  constructor(i) {
    (super(),
      (this.state = "idle"),
      (this.startTime = null),
      (this.isStopped = !1),
      (this.currentTime = 0),
      (this.holdTime = null),
      (this.playbackSpeed = 1),
      (this.stop = () => {
        const { motionValue: a } = this.options;
        (a && a.updatedAt !== Ct.now() && this.tick(Ct.now()),
          (this.isStopped = !0),
          this.state !== "idle" && (this.teardown(), this.options.onStop?.()));
      }),
      (this.options = i),
      this.initAnimation(),
      this.play(),
      i.autoplay === !1 && this.pause());
  }
  initAnimation() {
    const { options: i } = this;
    US(i);
    const {
      type: a = As,
      repeat: s = 0,
      repeatDelay: l = 0,
      repeatType: u,
      velocity: f = 0,
    } = i;
    let { keyframes: h } = i;
    const m = a || As;
    m !== As &&
      typeof h[0] != "number" &&
      ((this.mixKeyframes = Ks(t3, zS(h[0], h[1]))), (h = [0, 100]));
    const p = m({ ...i, keyframes: h });
    (u === "mirror" &&
      (this.mirroredGenerator = m({
        ...i,
        keyframes: [...h].reverse(),
        velocity: -f,
      })),
      p.calculatedDuration === null && (p.calculatedDuration = om(p)));
    const { calculatedDuration: g } = p;
    ((this.calculatedDuration = g),
      (this.resolvedDuration = g + l),
      (this.totalDuration = this.resolvedDuration * (s + 1) - l),
      (this.generator = p));
  }
  updateTime(i) {
    const a = Math.round(i - this.startTime) * this.playbackSpeed;
    this.holdTime !== null
      ? (this.currentTime = this.holdTime)
      : (this.currentTime = a);
  }
  tick(i, a = !1) {
    const {
      generator: s,
      totalDuration: l,
      mixKeyframes: u,
      mirroredGenerator: f,
      resolvedDuration: h,
      calculatedDuration: m,
    } = this;
    if (this.startTime === null) return s.next(0);
    const {
      delay: p = 0,
      keyframes: g,
      repeat: y,
      repeatType: S,
      repeatDelay: T,
      type: C,
      onUpdate: E,
      finalKeyframe: A,
    } = this.options;
    (this.speed > 0
      ? (this.startTime = Math.min(this.startTime, i))
      : this.speed < 0 &&
        (this.startTime = Math.min(i - l / this.speed, this.startTime)),
      a ? (this.currentTime = i) : this.updateTime(i));
    const R = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1),
      M = this.playbackSpeed >= 0 ? R < 0 : R > l;
    ((this.currentTime = Math.max(R, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = l));
    let O = this.currentTime,
      V = s;
    if (y) {
      const F = Math.min(this.currentTime, l) / h;
      let J = Math.floor(F),
        se = F % 1;
      (!se && F >= 1 && (se = 1),
        se === 1 && J--,
        (J = Math.min(J, y + 1)),
        !!(J % 2) &&
          (S === "reverse"
            ? ((se = 1 - se), T && (se -= T / h))
            : S === "mirror" && (V = f)),
        (O = Dn(0, 1, se) * h));
    }
    const L = M ? { done: !1, value: g[0] } : V.next(O);
    u && (L.value = u(L.value));
    let { done: $ } = L;
    !M &&
      m !== null &&
      ($ =
        this.playbackSpeed >= 0
          ? this.currentTime >= l
          : this.currentTime <= 0);
    const H =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && $));
    return (
      H && C !== Jd && (L.value = lm(g, this.options, A, this.speed)),
      E && E(L.value),
      H && this.finish(),
      L
    );
  }
  then(i, a) {
    return this.finished.then(i, a);
  }
  get duration() {
    return nn(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: i = 0 } = this.options || {};
    return this.duration + nn(i);
  }
  get time() {
    return nn(this.currentTime);
  }
  set time(i) {
    ((i = An(i)),
      (this.currentTime = i),
      this.startTime === null ||
      this.holdTime !== null ||
      this.playbackSpeed === 0
        ? (this.holdTime = i)
        : this.driver &&
          (this.startTime = this.driver.now() - i / this.playbackSpeed),
      this.driver?.start(!1));
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(i) {
    this.updateTime(Ct.now());
    const a = this.playbackSpeed !== i;
    ((this.playbackSpeed = i), a && (this.time = nn(this.currentTime)));
  }
  play() {
    if (this.isStopped) return;
    const { driver: i = Uj, startTime: a } = this.options;
    (this.driver || (this.driver = i((l) => this.tick(l))),
      this.options.onPlay?.());
    const s = this.driver.now();
    (this.state === "finished"
      ? (this.updateFinished(), (this.startTime = s))
      : this.holdTime !== null
        ? (this.startTime = s - this.holdTime)
        : this.startTime || (this.startTime = a ?? s),
      this.state === "finished" &&
        this.speed < 0 &&
        (this.startTime += this.calculatedDuration),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start());
  }
  pause() {
    ((this.state = "paused"),
      this.updateTime(Ct.now()),
      (this.holdTime = this.currentTime));
  }
  complete() {
    (this.state !== "running" && this.play(),
      (this.state = "finished"),
      (this.holdTime = null));
  }
  finish() {
    (this.notifyFinished(),
      this.teardown(),
      (this.state = "finished"),
      this.options.onComplete?.());
  }
  cancel() {
    ((this.holdTime = null),
      (this.startTime = 0),
      this.tick(0),
      this.teardown(),
      this.options.onCancel?.());
  }
  teardown() {
    ((this.state = "idle"),
      this.stopDriver(),
      (this.startTime = this.holdTime = null));
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(i) {
    return ((this.startTime = 0), this.tick(i, !0));
  }
  attachTimeline(i) {
    return (
      this.options.allowFlatten &&
        ((this.options.type = "keyframes"),
        (this.options.ease = "linear"),
        this.initAnimation()),
      this.driver?.stop(),
      i.observe(this)
    );
  }
}
function n3(e) {
  for (let i = 1; i < e.length; i++) e[i] ?? (e[i] = e[i - 1]);
}
const sa = (e) => (e * 180) / Math.PI,
  eh = (e) => {
    const i = sa(Math.atan2(e[1], e[0]));
    return th(i);
  },
  i3 = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
    rotate: eh,
    rotateZ: eh,
    skewX: (e) => sa(Math.atan(e[1])),
    skewY: (e) => sa(Math.atan(e[2])),
    skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2,
  },
  th = (e) => ((e = e % 360), e < 0 && (e += 360), e),
  L0 = eh,
  z0 = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]),
  P0 = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]),
  a3 = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: z0,
    scaleY: P0,
    scale: (e) => (z0(e) + P0(e)) / 2,
    rotateX: (e) => th(sa(Math.atan2(e[6], e[5]))),
    rotateY: (e) => th(sa(Math.atan2(-e[2], e[0]))),
    rotateZ: L0,
    rotate: L0,
    skewX: (e) => sa(Math.atan(e[4])),
    skewY: (e) => sa(Math.atan(e[1])),
    skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2,
  };
function nh(e) {
  return e.includes("scale") ? 1 : 0;
}
function ih(e, i) {
  if (!e || e === "none") return nh(i);
  const a = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, l;
  if (a) ((s = a3), (l = a));
  else {
    const h = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    ((s = i3), (l = h));
  }
  if (!l) return nh(i);
  const u = s[i],
    f = l[1].split(",").map(s3);
  return typeof u == "function" ? u(f) : f[u];
}
const r3 = (e, i) => {
  const { transform: a = "none" } = getComputedStyle(e);
  return ih(a, i);
};
function s3(e) {
  return parseFloat(e.trim());
}
const wr = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  Er = new Set(wr),
  V0 = (e) => e === Sr || e === de,
  o3 = new Set(["x", "y", "z"]),
  l3 = wr.filter((e) => !o3.has(e));
function u3(e) {
  const i = [];
  return (
    l3.forEach((a) => {
      const s = e.getValue(a);
      s !== void 0 &&
        (i.push([a, s.get()]), s.set(a.startsWith("scale") ? 1 : 0));
    }),
    i
  );
}
const oa = {
  width: ({ x: e }, { paddingLeft: i = "0", paddingRight: a = "0" }) =>
    e.max - e.min - parseFloat(i) - parseFloat(a),
  height: ({ y: e }, { paddingTop: i = "0", paddingBottom: a = "0" }) =>
    e.max - e.min - parseFloat(i) - parseFloat(a),
  top: (e, { top: i }) => parseFloat(i),
  left: (e, { left: i }) => parseFloat(i),
  bottom: ({ y: e }, { top: i }) => parseFloat(i) + (e.max - e.min),
  right: ({ x: e }, { left: i }) => parseFloat(i) + (e.max - e.min),
  x: (e, { transform: i }) => ih(i, "x"),
  y: (e, { transform: i }) => ih(i, "y"),
};
oa.translateX = oa.x;
oa.translateY = oa.y;
const la = new Set();
let ah = !1,
  rh = !1,
  sh = !1;
function HS() {
  if (rh) {
    const e = Array.from(la).filter((s) => s.needsMeasurement),
      i = new Set(e.map((s) => s.element)),
      a = new Map();
    (i.forEach((s) => {
      const l = u3(s);
      l.length && (a.set(s, l), s.render());
    }),
      e.forEach((s) => s.measureInitialState()),
      i.forEach((s) => {
        s.render();
        const l = a.get(s);
        l &&
          l.forEach(([u, f]) => {
            s.getValue(u)?.set(f);
          });
      }),
      e.forEach((s) => s.measureEndState()),
      e.forEach((s) => {
        s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
      }));
  }
  ((rh = !1), (ah = !1), la.forEach((e) => e.complete(sh)), la.clear());
}
function qS() {
  la.forEach((e) => {
    (e.readKeyframes(), e.needsMeasurement && (rh = !0));
  });
}
function c3() {
  ((sh = !0), qS(), HS(), (sh = !1));
}
class fm {
  constructor(i, a, s, l, u, f = !1) {
    ((this.state = "pending"),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.unresolvedKeyframes = [...i]),
      (this.onComplete = a),
      (this.name = s),
      (this.motionValue = l),
      (this.element = u),
      (this.isAsync = f));
  }
  scheduleResolve() {
    ((this.state = "scheduled"),
      this.isAsync
        ? (la.add(this),
          ah || ((ah = !0), Pe.read(qS), Pe.resolveKeyframes(HS)))
        : (this.readKeyframes(), this.complete()));
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: i,
      name: a,
      element: s,
      motionValue: l,
    } = this;
    if (i[0] === null) {
      const u = l?.get(),
        f = i[i.length - 1];
      if (u !== void 0) i[0] = u;
      else if (s && a) {
        const h = s.readValue(a, f);
        h != null && (i[0] = h);
      }
      (i[0] === void 0 && (i[0] = f), l && u === void 0 && l.set(i[0]));
    }
    n3(i);
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete(i = !1) {
    ((this.state = "complete"),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, i),
      la.delete(this));
  }
  cancel() {
    this.state === "scheduled" && (la.delete(this), (this.state = "pending"));
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const f3 = (e) => e.startsWith("--");
function d3(e, i, a) {
  f3(i) ? e.style.setProperty(i, a) : (e.style[i] = a);
}
const FS = Zh(() => window.ScrollTimeline !== void 0),
  h3 = {};
function m3(e, i) {
  const a = Zh(e);
  return () => h3[i] ?? a();
}
const GS = m3(() => {
    try {
      document
        .createElement("div")
        .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  ws = ([e, i, a, s]) => `cubic-bezier(${e}, ${i}, ${a}, ${s})`,
  k0 = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: ws([0, 0.65, 0.55, 1]),
    circOut: ws([0.55, 0, 1, 0.45]),
    backIn: ws([0.31, 0.01, 0.66, -0.59]),
    backOut: ws([0.33, 1.53, 0.69, 0.99]),
  };
function YS(e, i) {
  if (e)
    return typeof e == "function"
      ? GS()
        ? PS(e, i)
        : "ease-out"
      : CS(e)
        ? ws(e)
        : Array.isArray(e)
          ? e.map((a) => YS(a, i) || k0.easeOut)
          : k0[e];
}
function p3(
  e,
  i,
  a,
  {
    delay: s = 0,
    duration: l = 300,
    repeat: u = 0,
    repeatType: f = "loop",
    ease: h = "easeOut",
    times: m,
  } = {},
  p = void 0,
) {
  const g = { [i]: a };
  m && (g.offset = m);
  const y = YS(h, l);
  Array.isArray(y) && (g.easing = y);
  const S = {
    delay: s,
    duration: l,
    easing: Array.isArray(y) ? "linear" : y,
    fill: "both",
    iterations: u + 1,
    direction: f === "reverse" ? "alternate" : "normal",
  };
  return (p && (S.pseudoElement = p), e.animate(g, S));
}
function IS(e) {
  return typeof e == "function" && "applyToOptions" in e;
}
function g3({ type: e, ...i }) {
  return IS(e) && GS()
    ? e.applyToOptions(i)
    : (i.duration ?? (i.duration = 300), i.ease ?? (i.ease = "easeOut"), i);
}
class y3 extends um {
  constructor(i) {
    if ((super(), (this.finishedTime = null), (this.isStopped = !1), !i))
      return;
    const {
      element: a,
      name: s,
      keyframes: l,
      pseudoElement: u,
      allowFlatten: f = !1,
      finalKeyframe: h,
      onComplete: m,
    } = i;
    ((this.isPseudoElement = !!u),
      (this.allowFlatten = f),
      (this.options = i),
      zs(typeof i.type != "string"));
    const p = g3(i);
    ((this.animation = p3(a, s, l, p, u)),
      p.autoplay === !1 && this.animation.pause(),
      (this.animation.onfinish = () => {
        if (((this.finishedTime = this.time), !u)) {
          const g = lm(l, this.options, h, this.speed);
          (this.updateMotionValue ? this.updateMotionValue(g) : d3(a, s, g),
            this.animation.cancel());
        }
        (m?.(), this.notifyFinished());
      }));
  }
  play() {
    this.isStopped ||
      (this.animation.play(),
      this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {}
  }
  stop() {
    if (this.isStopped) return;
    this.isStopped = !0;
    const { state: i } = this;
    i === "idle" ||
      i === "finished" ||
      (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
      this.isPseudoElement || this.cancel());
  }
  commitStyles() {
    this.isPseudoElement || this.animation.commitStyles?.();
  }
  get duration() {
    const i = this.animation.effect?.getComputedTiming?.().duration || 0;
    return nn(Number(i));
  }
  get iterationDuration() {
    const { delay: i = 0 } = this.options || {};
    return this.duration + nn(i);
  }
  get time() {
    return nn(Number(this.animation.currentTime) || 0);
  }
  set time(i) {
    ((this.finishedTime = null), (this.animation.currentTime = An(i)));
  }
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(i) {
    (i < 0 && (this.finishedTime = null), (this.animation.playbackRate = i));
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(i) {
    this.animation.startTime = i;
  }
  attachTimeline({ timeline: i, observe: a }) {
    return (
      this.allowFlatten &&
        this.animation.effect?.updateTiming({ easing: "linear" }),
      (this.animation.onfinish = null),
      i && FS() ? ((this.animation.timeline = i), Rt) : a(this)
    );
  }
}
const XS = { anticipate: wS, backInOut: SS, circInOut: TS };
function v3(e) {
  return e in XS;
}
function b3(e) {
  typeof e.ease == "string" && v3(e.ease) && (e.ease = XS[e.ease]);
}
const B0 = 10;
class x3 extends y3 {
  constructor(i) {
    (b3(i),
      US(i),
      super(i),
      i.startTime && (this.startTime = i.startTime),
      (this.options = i));
  }
  updateMotionValue(i) {
    const {
      motionValue: a,
      onUpdate: s,
      onComplete: l,
      element: u,
      ...f
    } = this.options;
    if (!a) return;
    if (i !== void 0) {
      a.set(i);
      return;
    }
    const h = new cm({ ...f, autoplay: !1 }),
      m = An(this.finishedTime ?? this.time);
    (a.setWithVelocity(h.sample(m - B0).value, h.sample(m).value, B0),
      h.stop());
  }
}
const U0 = (e, i) =>
  i === "zIndex"
    ? !1
    : !!(
        typeof e == "number" ||
        Array.isArray(e) ||
        (typeof e == "string" &&
          (Li.test(e) || e === "0") &&
          !e.startsWith("url("))
      );
function S3(e) {
  const i = e[0];
  if (e.length === 1) return !0;
  for (let a = 0; a < e.length; a++) if (e[a] !== i) return !0;
}
function w3(e, i, a, s) {
  const l = e[0];
  if (l === null) return !1;
  if (i === "display" || i === "visibility") return !0;
  const u = e[e.length - 1],
    f = U0(l, i),
    h = U0(u, i);
  return !f || !h ? !1 : S3(e) || ((a === "spring" || IS(a)) && s);
}
function oh(e) {
  ((e.duration = 0), (e.type = "keyframes"));
}
const E3 = new Set(["opacity", "clipPath", "filter", "transform"]),
  T3 = Zh(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function A3(e) {
  const {
    motionValue: i,
    name: a,
    repeatDelay: s,
    repeatType: l,
    damping: u,
    type: f,
  } = e;
  if (!(i?.owner?.current instanceof HTMLElement)) return !1;
  const { onUpdate: m, transformTemplate: p } = i.owner.getProps();
  return (
    T3() &&
    a &&
    E3.has(a) &&
    (a !== "transform" || !p) &&
    !m &&
    !s &&
    l !== "mirror" &&
    u !== 0 &&
    f !== "inertia"
  );
}
const C3 = 40;
class R3 extends um {
  constructor({
    autoplay: i = !0,
    delay: a = 0,
    type: s = "keyframes",
    repeat: l = 0,
    repeatDelay: u = 0,
    repeatType: f = "loop",
    keyframes: h,
    name: m,
    motionValue: p,
    element: g,
    ...y
  }) {
    (super(),
      (this.stop = () => {
        (this._animation && (this._animation.stop(), this.stopTimeline?.()),
          this.keyframeResolver?.cancel());
      }),
      (this.createdAt = Ct.now()));
    const S = {
        autoplay: i,
        delay: a,
        type: s,
        repeat: l,
        repeatDelay: u,
        repeatType: f,
        name: m,
        motionValue: p,
        element: g,
        ...y,
      },
      T = g?.KeyframeResolver || fm;
    ((this.keyframeResolver = new T(
      h,
      (C, E, A) => this.onKeyframesResolved(C, E, S, !A),
      m,
      p,
      g,
    )),
      this.keyframeResolver?.scheduleResolve());
  }
  onKeyframesResolved(i, a, s, l) {
    this.keyframeResolver = void 0;
    const {
      name: u,
      type: f,
      velocity: h,
      delay: m,
      isHandoff: p,
      onUpdate: g,
    } = s;
    ((this.resolvedAt = Ct.now()),
      w3(i, u, f, h) ||
        ((ti.instantAnimations || !m) && g?.(lm(i, s, a)),
        (i[0] = i[i.length - 1]),
        oh(s),
        (s.repeat = 0)));
    const S = {
        startTime: l
          ? this.resolvedAt
            ? this.resolvedAt - this.createdAt > C3
              ? this.resolvedAt
              : this.createdAt
            : this.createdAt
          : void 0,
        finalKeyframe: a,
        ...s,
        keyframes: i,
      },
      T =
        !p && A3(S)
          ? new x3({ ...S, element: S.motionValue.owner.current })
          : new cm(S);
    (T.finished.then(() => this.notifyFinished()).catch(Rt),
      this.pendingTimeline &&
        ((this.stopTimeline = T.attachTimeline(this.pendingTimeline)),
        (this.pendingTimeline = void 0)),
      (this._animation = T));
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(i, a) {
    return this.finished.finally(i).then(() => {});
  }
  get animation() {
    return (
      this._animation || (this.keyframeResolver?.resume(), c3()),
      this._animation
    );
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(i) {
    this.animation.time = i;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(i) {
    this.animation.speed = i;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(i) {
    return (
      this._animation
        ? (this.stopTimeline = this.animation.attachTimeline(i))
        : (this.pendingTimeline = i),
      () => this.stop()
    );
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    (this._animation && this.animation.cancel(),
      this.keyframeResolver?.cancel());
  }
}
const D3 = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function M3(e) {
  const i = D3.exec(e);
  if (!i) return [,];
  const [, a, s, l] = i;
  return [`--${a ?? s}`, l];
}
function KS(e, i, a = 1) {
  const [s, l] = M3(e);
  if (!s) return;
  const u = window.getComputedStyle(i).getPropertyValue(s);
  if (u) {
    const f = u.trim();
    return mS(f) ? parseFloat(f) : f;
  }
  return im(l) ? KS(l, i, a + 1) : l;
}
function dm(e, i) {
  return e?.[i] ?? e?.default ?? e;
}
const $S = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...wr,
  ]),
  O3 = { test: (e) => e === "auto", parse: (e) => e },
  QS = (e) => (i) => i.test(e),
  ZS = [Sr, de, Cn, Oi, Tj, Ej, O3],
  H0 = (e) => ZS.find(QS(e));
function N3(e) {
  return typeof e == "number"
    ? e === 0
    : e !== null
      ? e === "none" || e === "0" || gS(e)
      : !0;
}
const j3 = new Set(["brightness", "contrast", "saturate", "opacity"]);
function _3(e) {
  const [i, a] = e.slice(0, -1).split("(");
  if (i === "drop-shadow") return e;
  const [s] = a.match(am) || [];
  if (!s) return e;
  const l = a.replace(s, "");
  let u = j3.has(i) ? 1 : 0;
  return (s !== a && (u *= 100), i + "(" + u + l + ")");
}
const L3 = /\b([a-z-]*)\(.*?\)/gu,
  lh = {
    ...Li,
    getAnimatableNone: (e) => {
      const i = e.match(L3);
      return i ? i.map(_3).join(" ") : e;
    },
  },
  q0 = { ...Sr, transform: Math.round },
  z3 = {
    rotate: Oi,
    rotateX: Oi,
    rotateY: Oi,
    rotateZ: Oi,
    scale: Al,
    scaleX: Al,
    scaleY: Al,
    scaleZ: Al,
    skew: Oi,
    skewX: Oi,
    skewY: Oi,
    distance: de,
    translateX: de,
    translateY: de,
    translateZ: de,
    x: de,
    y: de,
    z: de,
    perspective: de,
    transformPerspective: de,
    opacity: Ps,
    originX: M0,
    originY: M0,
    originZ: de,
  },
  hm = {
    borderWidth: de,
    borderTopWidth: de,
    borderRightWidth: de,
    borderBottomWidth: de,
    borderLeftWidth: de,
    borderRadius: de,
    radius: de,
    borderTopLeftRadius: de,
    borderTopRightRadius: de,
    borderBottomRightRadius: de,
    borderBottomLeftRadius: de,
    width: de,
    maxWidth: de,
    height: de,
    maxHeight: de,
    top: de,
    right: de,
    bottom: de,
    left: de,
    padding: de,
    paddingTop: de,
    paddingRight: de,
    paddingBottom: de,
    paddingLeft: de,
    margin: de,
    marginTop: de,
    marginRight: de,
    marginBottom: de,
    marginLeft: de,
    backgroundPositionX: de,
    backgroundPositionY: de,
    ...z3,
    zIndex: q0,
    fillOpacity: Ps,
    strokeOpacity: Ps,
    numOctaves: q0,
  },
  P3 = {
    ...hm,
    color: et,
    backgroundColor: et,
    outlineColor: et,
    fill: et,
    stroke: et,
    borderColor: et,
    borderTopColor: et,
    borderRightColor: et,
    borderBottomColor: et,
    borderLeftColor: et,
    filter: lh,
    WebkitFilter: lh,
  },
  WS = (e) => P3[e];
function JS(e, i) {
  let a = WS(e);
  return (
    a !== lh && (a = Li),
    a.getAnimatableNone ? a.getAnimatableNone(i) : void 0
  );
}
const V3 = new Set(["auto", "none", "0"]);
function k3(e, i, a) {
  let s = 0,
    l;
  for (; s < e.length && !l; ) {
    const u = e[s];
    (typeof u == "string" && !V3.has(u) && Vs(u).values.length && (l = e[s]),
      s++);
  }
  if (l && a) for (const u of i) e[u] = JS(a, l);
}
class B3 extends fm {
  constructor(i, a, s, l, u) {
    super(i, a, s, l, u, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: i, element: a, name: s } = this;
    if (!a || !a.current) return;
    super.readKeyframes();
    for (let m = 0; m < i.length; m++) {
      let p = i[m];
      if (typeof p == "string" && ((p = p.trim()), im(p))) {
        const g = KS(p, a.current);
        (g !== void 0 && (i[m] = g),
          m === i.length - 1 && (this.finalKeyframe = p));
      }
    }
    if ((this.resolveNoneKeyframes(), !$S.has(s) || i.length !== 2)) return;
    const [l, u] = i,
      f = H0(l),
      h = H0(u);
    if (f !== h)
      if (V0(f) && V0(h))
        for (let m = 0; m < i.length; m++) {
          const p = i[m];
          typeof p == "string" && (i[m] = parseFloat(p));
        }
      else oa[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: i, name: a } = this,
      s = [];
    for (let l = 0; l < i.length; l++) (i[l] === null || N3(i[l])) && s.push(l);
    s.length && k3(i, s, a);
  }
  measureInitialState() {
    const { element: i, unresolvedKeyframes: a, name: s } = this;
    if (!i || !i.current) return;
    (s === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = oa[s](
        i.measureViewportBox(),
        window.getComputedStyle(i.current),
      )),
      (a[0] = this.measuredOrigin));
    const l = a[a.length - 1];
    l !== void 0 && i.getValue(s, l).jump(l, !1);
  }
  measureEndState() {
    const { element: i, name: a, unresolvedKeyframes: s } = this;
    if (!i || !i.current) return;
    const l = i.getValue(a);
    l && l.jump(this.measuredOrigin, !1);
    const u = s.length - 1,
      f = s[u];
    ((s[u] = oa[a](i.measureViewportBox(), window.getComputedStyle(i.current))),
      f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f),
      this.removedTransforms?.length &&
        this.removedTransforms.forEach(([h, m]) => {
          i.getValue(h).set(m);
        }),
      this.resolveNoneKeyframes());
  }
}
function ew(e, i, a) {
  if (e instanceof EventTarget) return [e];
  if (typeof e == "string") {
    const l = document.querySelectorAll(e);
    return l ? Array.from(l) : [];
  }
  return Array.from(e);
}
const tw = (e, i) => (i && typeof e == "number" ? i.transform(e) : e);
function nw(e) {
  return pS(e) && "offsetHeight" in e;
}
const F0 = 30,
  U3 = (e) => !isNaN(parseFloat(e));
class H3 {
  constructor(i, a = {}) {
    ((this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (s) => {
        const l = Ct.now();
        if (
          (this.updatedAt !== l && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(s),
          this.current !== this.prev &&
            (this.events.change?.notify(this.current), this.dependents))
        )
          for (const u of this.dependents) u.dirty();
      }),
      (this.hasAnimated = !1),
      this.setCurrent(i),
      (this.owner = a.owner));
  }
  setCurrent(i) {
    ((this.current = i),
      (this.updatedAt = Ct.now()),
      this.canTrackVelocity === null &&
        i !== void 0 &&
        (this.canTrackVelocity = U3(this.current)));
  }
  setPrevFrameValue(i = this.current) {
    ((this.prevFrameValue = i), (this.prevUpdatedAt = this.updatedAt));
  }
  onChange(i) {
    return this.on("change", i);
  }
  on(i, a) {
    this.events[i] || (this.events[i] = new Wh());
    const s = this.events[i].add(a);
    return i === "change"
      ? () => {
          (s(),
            Pe.read(() => {
              this.events.change.getSize() || this.stop();
            }));
        }
      : s;
  }
  clearListeners() {
    for (const i in this.events) this.events[i].clear();
  }
  attach(i, a) {
    ((this.passiveEffect = i), (this.stopPassiveEffect = a));
  }
  set(i) {
    this.passiveEffect
      ? this.passiveEffect(i, this.updateAndNotify)
      : this.updateAndNotify(i);
  }
  setWithVelocity(i, a, s) {
    (this.set(a),
      (this.prev = void 0),
      (this.prevFrameValue = i),
      (this.prevUpdatedAt = this.updatedAt - s));
  }
  jump(i, a = !0) {
    (this.updateAndNotify(i),
      (this.prev = i),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      a && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(i) {
    (this.dependents || (this.dependents = new Set()), this.dependents.add(i));
  }
  removeDependent(i) {
    this.dependents && this.dependents.delete(i);
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const i = Ct.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      i - this.updatedAt > F0
    )
      return 0;
    const a = Math.min(this.updatedAt - this.prevUpdatedAt, F0);
    return Jh(parseFloat(this.current) - parseFloat(this.prevFrameValue), a);
  }
  start(i) {
    return (
      this.stop(),
      new Promise((a) => {
        ((this.hasAnimated = !0),
          (this.animation = i(a)),
          this.events.animationStart && this.events.animationStart.notify());
      }).then(() => {
        (this.events.animationComplete &&
          this.events.animationComplete.notify(),
          this.clearAnimation());
      })
    );
  }
  stop() {
    (this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation());
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    (this.dependents?.clear(),
      this.events.destroy?.notify(),
      this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
}
function En(e, i) {
  return new H3(e, i);
}
const { schedule: mm } = RS(queueMicrotask, !1),
  cn = { x: !1, y: !1 };
function iw() {
  return cn.x || cn.y;
}
function q3(e) {
  return e === "x" || e === "y"
    ? cn[e]
      ? null
      : ((cn[e] = !0),
        () => {
          cn[e] = !1;
        })
    : cn.x || cn.y
      ? null
      : ((cn.x = cn.y = !0),
        () => {
          cn.x = cn.y = !1;
        });
}
function aw(e, i) {
  const a = ew(e),
    s = new AbortController(),
    l = { passive: !0, ...i, signal: s.signal };
  return [a, l, () => s.abort()];
}
function G0(e) {
  return !(e.pointerType === "touch" || iw());
}
function F3(e, i, a = {}) {
  const [s, l, u] = aw(e, a),
    f = (h) => {
      if (!G0(h)) return;
      const { target: m } = h,
        p = i(m, h);
      if (typeof p != "function" || !m) return;
      const g = (y) => {
        G0(y) && (p(y), m.removeEventListener("pointerleave", g));
      };
      m.addEventListener("pointerleave", g, l);
    };
  return (
    s.forEach((h) => {
      h.addEventListener("pointerenter", f, l);
    }),
    u
  );
}
const rw = (e, i) => (i ? (e === i ? !0 : rw(e, i.parentElement)) : !1),
  pm = (e) =>
    e.pointerType === "mouse"
      ? typeof e.button != "number" || e.button <= 0
      : e.isPrimary !== !1,
  G3 = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function Y3(e) {
  return G3.has(e.tagName) || e.tabIndex !== -1;
}
const Bl = new WeakSet();
function Y0(e) {
  return (i) => {
    i.key === "Enter" && e(i);
  };
}
function fd(e, i) {
  e.dispatchEvent(
    new PointerEvent("pointer" + i, { isPrimary: !0, bubbles: !0 }),
  );
}
const I3 = (e, i) => {
  const a = e.currentTarget;
  if (!a) return;
  const s = Y0(() => {
    if (Bl.has(a)) return;
    fd(a, "down");
    const l = Y0(() => {
        fd(a, "up");
      }),
      u = () => fd(a, "cancel");
    (a.addEventListener("keyup", l, i), a.addEventListener("blur", u, i));
  });
  (a.addEventListener("keydown", s, i),
    a.addEventListener("blur", () => a.removeEventListener("keydown", s), i));
};
function I0(e) {
  return pm(e) && !iw();
}
function X3(e, i, a = {}) {
  const [s, l, u] = aw(e, a),
    f = (h) => {
      const m = h.currentTarget;
      if (!I0(h)) return;
      Bl.add(m);
      const p = i(m, h),
        g = (T, C) => {
          (window.removeEventListener("pointerup", y),
            window.removeEventListener("pointercancel", S),
            Bl.has(m) && Bl.delete(m),
            I0(T) && typeof p == "function" && p(T, { success: C }));
        },
        y = (T) => {
          g(
            T,
            m === window ||
              m === document ||
              a.useGlobalTarget ||
              rw(m, T.target),
          );
        },
        S = (T) => {
          g(T, !1);
        };
      (window.addEventListener("pointerup", y, l),
        window.addEventListener("pointercancel", S, l));
    };
  return (
    s.forEach((h) => {
      ((a.useGlobalTarget ? window : h).addEventListener("pointerdown", f, l),
        nw(h) &&
          (h.addEventListener("focus", (p) => I3(p, l)),
          !Y3(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0)));
    }),
    u
  );
}
function gm(e) {
  return pS(e) && "ownerSVGElement" in e;
}
const Ul = new WeakMap();
let Hl;
const sw = (e, i, a) => (s, l) =>
    l && l[0]
      ? l[0][e + "Size"]
      : gm(s) && "getBBox" in s
        ? s.getBBox()[i]
        : s[a],
  K3 = sw("inline", "width", "offsetWidth"),
  $3 = sw("block", "height", "offsetHeight");
function Q3({ target: e, borderBoxSize: i }) {
  Ul.get(e)?.forEach((a) => {
    a(e, {
      get width() {
        return K3(e, i);
      },
      get height() {
        return $3(e, i);
      },
    });
  });
}
function Z3(e) {
  e.forEach(Q3);
}
function W3() {
  typeof ResizeObserver > "u" || (Hl = new ResizeObserver(Z3));
}
function J3(e, i) {
  Hl || W3();
  const a = ew(e);
  return (
    a.forEach((s) => {
      let l = Ul.get(s);
      (l || ((l = new Set()), Ul.set(s, l)), l.add(i), Hl?.observe(s));
    }),
    () => {
      a.forEach((s) => {
        const l = Ul.get(s);
        (l?.delete(i), l?.size || Hl?.unobserve(s));
      });
    }
  );
}
const ql = new Set();
let ir;
function e5() {
  ((ir = () => {
    const e = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      },
    };
    ql.forEach((i) => i(e));
  }),
    window.addEventListener("resize", ir));
}
function t5(e) {
  return (
    ql.add(e),
    ir || e5(),
    () => {
      (ql.delete(e),
        !ql.size &&
          typeof ir == "function" &&
          (window.removeEventListener("resize", ir), (ir = void 0)));
    }
  );
}
function n5(e, i) {
  return typeof e == "function" ? t5(e) : J3(e, i);
}
function ow(e, i) {
  let a;
  const s = () => {
    const { currentTime: l } = i,
      f = (l === null ? 0 : l.value) / 100;
    (a !== f && e(f), (a = f));
  };
  return (Pe.preUpdate(s, !0), () => Mn(s));
}
function i5(e) {
  return gm(e) && e.tagName === "svg";
}
const pt = (e) => !!(e && e.getVelocity),
  a5 = [...ZS, et, Li],
  r5 = (e) => a5.find(QS(e)),
  lw = b.createContext({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  });
function s5(e = !0) {
  const i = b.useContext(Kh);
  if (i === null) return [!0, null];
  const { isPresent: a, onExitComplete: s, register: l } = i,
    u = b.useId();
  b.useEffect(() => {
    if (e) return l(u);
  }, [e]);
  const f = b.useCallback(() => e && s && s(u), [u, s, e]);
  return !a && s ? [!1, f] : [!0];
}
const uw = b.createContext({ strict: !1 }),
  X0 = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  mr = {};
for (const e in X0) mr[e] = { isEnabled: (i) => X0[e].some((a) => !!i[a]) };
function o5(e) {
  for (const i in e) mr[i] = { ...mr[i], ...e[i] };
}
const l5 = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function nu(e) {
  return (
    e.startsWith("while") ||
    (e.startsWith("drag") && e !== "draggable") ||
    e.startsWith("layout") ||
    e.startsWith("onTap") ||
    e.startsWith("onPan") ||
    e.startsWith("onLayout") ||
    l5.has(e)
  );
}
let cw = (e) => !nu(e);
function u5(e) {
  typeof e == "function" && (cw = (i) => (i.startsWith("on") ? !nu(i) : e(i)));
}
try {
  u5(require("@emotion/is-prop-valid").default);
} catch {}
function c5(e, i, a) {
  const s = {};
  for (const l in e)
    (l === "values" && typeof e.values == "object") ||
      ((cw(l) ||
        (a === !0 && nu(l)) ||
        (!i && !nu(l)) ||
        (e.draggable && l.startsWith("onDrag"))) &&
        (s[l] = e[l]));
  return s;
}
const vu = b.createContext({});
function bu(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
function ks(e) {
  return typeof e == "string" || Array.isArray(e);
}
const ym = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  vm = ["initial", ...ym];
function xu(e) {
  return bu(e.animate) || vm.some((i) => ks(e[i]));
}
function fw(e) {
  return !!(xu(e) || e.variants);
}
function f5(e, i) {
  if (xu(e)) {
    const { initial: a, animate: s } = e;
    return {
      initial: a === !1 || ks(a) ? a : void 0,
      animate: ks(s) ? s : void 0,
    };
  }
  return e.inherit !== !1 ? i : {};
}
function d5(e) {
  const { initial: i, animate: a } = f5(e, b.useContext(vu));
  return b.useMemo(() => ({ initial: i, animate: a }), [K0(i), K0(a)]);
}
function K0(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const Bs = {};
function h5(e) {
  for (const i in e) ((Bs[i] = e[i]), nm(i) && (Bs[i].isCSSVariable = !0));
}
function dw(e, { layout: i, layoutId: a }) {
  return (
    Er.has(e) ||
    e.startsWith("origin") ||
    ((i || a !== void 0) && (!!Bs[e] || e === "opacity"))
  );
}
const m5 = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  p5 = wr.length;
function g5(e, i, a) {
  let s = "",
    l = !0;
  for (let u = 0; u < p5; u++) {
    const f = wr[u],
      h = e[f];
    if (h === void 0) continue;
    let m = !0;
    if (
      (typeof h == "number"
        ? (m = h === (f.startsWith("scale") ? 1 : 0))
        : (m = parseFloat(h) === 0),
      !m || a)
    ) {
      const p = tw(h, hm[f]);
      if (!m) {
        l = !1;
        const g = m5[f] || f;
        s += `${g}(${p}) `;
      }
      a && (i[f] = p);
    }
  }
  return ((s = s.trim()), a ? (s = a(i, l ? "" : s)) : l && (s = "none"), s);
}
function bm(e, i, a) {
  const { style: s, vars: l, transformOrigin: u } = e;
  let f = !1,
    h = !1;
  for (const m in i) {
    const p = i[m];
    if (Er.has(m)) {
      f = !0;
      continue;
    } else if (nm(m)) {
      l[m] = p;
      continue;
    } else {
      const g = tw(p, hm[m]);
      m.startsWith("origin") ? ((h = !0), (u[m] = g)) : (s[m] = g);
    }
  }
  if (
    (i.transform ||
      (f || a
        ? (s.transform = g5(i, e.transform, a))
        : s.transform && (s.transform = "none")),
    h)
  ) {
    const { originX: m = "50%", originY: p = "50%", originZ: g = 0 } = u;
    s.transformOrigin = `${m} ${p} ${g}`;
  }
}
const xm = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function hw(e, i, a) {
  for (const s in i) !pt(i[s]) && !dw(s, a) && (e[s] = i[s]);
}
function y5({ transformTemplate: e }, i) {
  return b.useMemo(() => {
    const a = xm();
    return (bm(a, i, e), Object.assign({}, a.vars, a.style));
  }, [i]);
}
function v5(e, i) {
  const a = e.style || {},
    s = {};
  return (hw(s, a, e), Object.assign(s, y5(e, i)), s);
}
function b5(e, i) {
  const a = {},
    s = v5(e, i);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((a.draggable = !1),
      (s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none"),
      (s.touchAction =
        e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`)),
    e.tabIndex === void 0 &&
      (e.onTap || e.onTapStart || e.whileTap) &&
      (a.tabIndex = 0),
    (a.style = s),
    a
  );
}
const x5 = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  S5 = { offset: "strokeDashoffset", array: "strokeDasharray" };
function w5(e, i, a = 1, s = 0, l = !0) {
  e.pathLength = 1;
  const u = l ? x5 : S5;
  e[u.offset] = de.transform(-s);
  const f = de.transform(i),
    h = de.transform(a);
  e[u.array] = `${f} ${h}`;
}
function mw(
  e,
  {
    attrX: i,
    attrY: a,
    attrScale: s,
    pathLength: l,
    pathSpacing: u = 1,
    pathOffset: f = 0,
    ...h
  },
  m,
  p,
  g,
) {
  if ((bm(e, h, p), m)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  ((e.attrs = e.style), (e.style = {}));
  const { attrs: y, style: S } = e;
  (y.transform && ((S.transform = y.transform), delete y.transform),
    (S.transform || y.transformOrigin) &&
      ((S.transformOrigin = y.transformOrigin ?? "50% 50%"),
      delete y.transformOrigin),
    S.transform &&
      ((S.transformBox = g?.transformBox ?? "fill-box"), delete y.transformBox),
    i !== void 0 && (y.x = i),
    a !== void 0 && (y.y = a),
    s !== void 0 && (y.scale = s),
    l !== void 0 && w5(y, l, u, f, !1));
}
const pw = () => ({ ...xm(), attrs: {} }),
  gw = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function E5(e, i, a, s) {
  const l = b.useMemo(() => {
    const u = pw();
    return (
      mw(u, i, gw(s), e.transformTemplate, e.style),
      { ...u.attrs, style: { ...u.style } }
    );
  }, [i]);
  if (e.style) {
    const u = {};
    (hw(u, e.style, e), (l.style = { ...u, ...l.style }));
  }
  return l;
}
const T5 = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function Sm(e) {
  return typeof e != "string" || e.includes("-")
    ? !1
    : !!(T5.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
function A5(e, i, a, { latestValues: s }, l, u = !1) {
  const h = (Sm(e) ? E5 : b5)(i, s, l, e),
    m = c5(i, typeof e == "string", u),
    p = e !== b.Fragment ? { ...m, ...h, ref: a } : {},
    { children: g } = i,
    y = b.useMemo(() => (pt(g) ? g.get() : g), [g]);
  return b.createElement(e, { ...p, children: y });
}
function $0(e) {
  const i = [{}, {}];
  return (
    e?.values.forEach((a, s) => {
      ((i[0][s] = a.get()), (i[1][s] = a.getVelocity()));
    }),
    i
  );
}
function wm(e, i, a, s) {
  if (typeof i == "function") {
    const [l, u] = $0(s);
    i = i(a !== void 0 ? a : e.custom, l, u);
  }
  if (
    (typeof i == "string" && (i = e.variants && e.variants[i]),
    typeof i == "function")
  ) {
    const [l, u] = $0(s);
    i = i(a !== void 0 ? a : e.custom, l, u);
  }
  return i;
}
function Fl(e) {
  return pt(e) ? e.get() : e;
}
function C5({ scrapeMotionValuesFromProps: e, createRenderState: i }, a, s, l) {
  return { latestValues: R5(a, s, l, e), renderState: i() };
}
function R5(e, i, a, s) {
  const l = {},
    u = s(e, {});
  for (const S in u) l[S] = Fl(u[S]);
  let { initial: f, animate: h } = e;
  const m = xu(e),
    p = fw(e);
  i &&
    p &&
    !m &&
    e.inherit !== !1 &&
    (f === void 0 && (f = i.initial), h === void 0 && (h = i.animate));
  let g = a ? a.initial === !1 : !1;
  g = g || f === !1;
  const y = g ? h : f;
  if (y && typeof y != "boolean" && !bu(y)) {
    const S = Array.isArray(y) ? y : [y];
    for (let T = 0; T < S.length; T++) {
      const C = wm(e, S[T]);
      if (C) {
        const { transitionEnd: E, transition: A, ...R } = C;
        for (const M in R) {
          let O = R[M];
          if (Array.isArray(O)) {
            const V = g ? O.length - 1 : 0;
            O = O[V];
          }
          O !== null && (l[M] = O);
        }
        for (const M in E) l[M] = E[M];
      }
    }
  }
  return l;
}
const yw = (e) => (i, a) => {
  const s = b.useContext(vu),
    l = b.useContext(Kh),
    u = () => C5(e, i, s, l);
  return a ? u() : dS(u);
};
function Em(e, i, a) {
  const { style: s } = e,
    l = {};
  for (const u in s)
    (pt(s[u]) ||
      (i.style && pt(i.style[u])) ||
      dw(u, e) ||
      a?.getValue(u)?.liveStyle !== void 0) &&
      (l[u] = s[u]);
  return l;
}
const D5 = yw({ scrapeMotionValuesFromProps: Em, createRenderState: xm });
function vw(e, i, a) {
  const s = Em(e, i, a);
  for (const l in e)
    if (pt(e[l]) || pt(i[l])) {
      const u =
        wr.indexOf(l) !== -1
          ? "attr" + l.charAt(0).toUpperCase() + l.substring(1)
          : l;
      s[u] = e[l];
    }
  return s;
}
const M5 = yw({ scrapeMotionValuesFromProps: vw, createRenderState: pw }),
  O5 = Symbol.for("motionComponentSymbol");
function ar(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.hasOwnProperty.call(e, "current")
  );
}
function N5(e, i, a) {
  return b.useCallback(
    (s) => {
      (s && e.onMount && e.onMount(s),
        i && (s ? i.mount(s) : i.unmount()),
        a && (typeof a == "function" ? a(s) : ar(a) && (a.current = s)));
    },
    [i],
  );
}
const Tm = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  j5 = "framerAppearId",
  bw = "data-" + Tm(j5),
  xw = b.createContext({});
function _5(e, i, a, s, l) {
  const { visualElement: u } = b.useContext(vu),
    f = b.useContext(uw),
    h = b.useContext(Kh),
    m = b.useContext(lw).reducedMotion,
    p = b.useRef(null);
  ((s = s || f.renderer),
    !p.current &&
      s &&
      (p.current = s(e, {
        visualState: i,
        parent: u,
        props: a,
        presenceContext: h,
        blockInitialAnimation: h ? h.initial === !1 : !1,
        reducedMotionConfig: m,
      })));
  const g = p.current,
    y = b.useContext(xw);
  g &&
    !g.projection &&
    l &&
    (g.type === "html" || g.type === "svg") &&
    L5(p.current, a, l, y);
  const S = b.useRef(!1);
  b.useInsertionEffect(() => {
    g && S.current && g.update(a, h);
  });
  const T = a[bw],
    C = b.useRef(
      !!T &&
        !window.MotionHandoffIsComplete?.(T) &&
        window.MotionHasOptimisedAnimation?.(T),
    );
  return (
    hS(() => {
      g &&
        ((S.current = !0),
        (window.MotionIsMounted = !0),
        g.updateFeatures(),
        g.scheduleRenderMicrotask(),
        C.current && g.animationState && g.animationState.animateChanges());
    }),
    b.useEffect(() => {
      g &&
        (!C.current && g.animationState && g.animationState.animateChanges(),
        C.current &&
          (queueMicrotask(() => {
            window.MotionHandoffMarkAsComplete?.(T);
          }),
          (C.current = !1)),
        (g.enteringChildren = void 0));
    }),
    g
  );
}
function L5(e, i, a, s) {
  const {
    layoutId: l,
    layout: u,
    drag: f,
    dragConstraints: h,
    layoutScroll: m,
    layoutRoot: p,
    layoutCrossfade: g,
  } = i;
  ((e.projection = new a(
    e.latestValues,
    i["data-framer-portal-id"] ? void 0 : Sw(e.parent),
  )),
    e.projection.setOptions({
      layoutId: l,
      layout: u,
      alwaysMeasureLayout: !!f || (h && ar(h)),
      visualElement: e,
      animationType: typeof u == "string" ? u : "both",
      initialPromotionConfig: s,
      crossfade: g,
      layoutScroll: m,
      layoutRoot: p,
    }));
}
function Sw(e) {
  if (e) return e.options.allowProjection !== !1 ? e.projection : Sw(e.parent);
}
function dd(e, { forwardMotionProps: i = !1 } = {}, a, s) {
  a && o5(a);
  const l = Sm(e) ? M5 : D5;
  function u(h, m) {
    let p;
    const g = { ...b.useContext(lw), ...h, layoutId: z5(h) },
      { isStatic: y } = g,
      S = d5(h),
      T = l(h, y);
    if (!y && Xh) {
      P5();
      const C = V5(g);
      ((p = C.MeasureLayout),
        (S.visualElement = _5(e, T, g, s, C.ProjectionNode)));
    }
    return x.jsxs(vu.Provider, {
      value: S,
      children: [
        p && S.visualElement
          ? x.jsx(p, { visualElement: S.visualElement, ...g })
          : null,
        A5(e, h, N5(T, S.visualElement, m), T, y, i),
      ],
    });
  }
  u.displayName = `motion.${typeof e == "string" ? e : `create(${e.displayName ?? e.name ?? ""})`}`;
  const f = b.forwardRef(u);
  return ((f[O5] = e), f);
}
function z5({ layoutId: e }) {
  const i = b.useContext(fS).id;
  return i && e !== void 0 ? i + "-" + e : e;
}
function P5(e, i) {
  b.useContext(uw).strict;
}
function V5(e) {
  const { drag: i, layout: a } = mr;
  if (!i && !a) return {};
  const s = { ...i, ...a };
  return {
    MeasureLayout:
      i?.isEnabled(e) || a?.isEnabled(e) ? s.MeasureLayout : void 0,
    ProjectionNode: s.ProjectionNode,
  };
}
function k5(e, i) {
  if (typeof Proxy > "u") return dd;
  const a = new Map(),
    s = (u, f) => dd(u, f, e, i),
    l = (u, f) => s(u, f);
  return new Proxy(l, {
    get: (u, f) =>
      f === "create"
        ? s
        : (a.has(f) || a.set(f, dd(f, void 0, e, i)), a.get(f)),
  });
}
function ww({ top: e, left: i, right: a, bottom: s }) {
  return { x: { min: i, max: a }, y: { min: e, max: s } };
}
function B5({ x: e, y: i }) {
  return { top: i.min, right: e.max, bottom: i.max, left: e.min };
}
function U5(e, i) {
  if (!i) return e;
  const a = i({ x: e.left, y: e.top }),
    s = i({ x: e.right, y: e.bottom });
  return { top: a.y, left: a.x, bottom: s.y, right: s.x };
}
function hd(e) {
  return e === void 0 || e === 1;
}
function uh({ scale: e, scaleX: i, scaleY: a }) {
  return !hd(e) || !hd(i) || !hd(a);
}
function aa(e) {
  return (
    uh(e) ||
    Ew(e) ||
    e.z ||
    e.rotate ||
    e.rotateX ||
    e.rotateY ||
    e.skewX ||
    e.skewY
  );
}
function Ew(e) {
  return Q0(e.x) || Q0(e.y);
}
function Q0(e) {
  return e && e !== "0%";
}
function iu(e, i, a) {
  const s = e - a,
    l = i * s;
  return a + l;
}
function Z0(e, i, a, s, l) {
  return (l !== void 0 && (e = iu(e, l, s)), iu(e, a, s) + i);
}
function ch(e, i = 0, a = 1, s, l) {
  ((e.min = Z0(e.min, i, a, s, l)), (e.max = Z0(e.max, i, a, s, l)));
}
function Tw(e, { x: i, y: a }) {
  (ch(e.x, i.translate, i.scale, i.originPoint),
    ch(e.y, a.translate, a.scale, a.originPoint));
}
const W0 = 0.999999999999,
  J0 = 1.0000000000001;
function H5(e, i, a, s = !1) {
  const l = a.length;
  if (!l) return;
  i.x = i.y = 1;
  let u, f;
  for (let h = 0; h < l; h++) {
    ((u = a[h]), (f = u.projectionDelta));
    const { visualElement: m } = u.options;
    (m && m.props.style && m.props.style.display === "contents") ||
      (s &&
        u.options.layoutScroll &&
        u.scroll &&
        u !== u.root &&
        sr(e, { x: -u.scroll.offset.x, y: -u.scroll.offset.y }),
      f && ((i.x *= f.x.scale), (i.y *= f.y.scale), Tw(e, f)),
      s && aa(u.latestValues) && sr(e, u.latestValues));
  }
  (i.x < J0 && i.x > W0 && (i.x = 1), i.y < J0 && i.y > W0 && (i.y = 1));
}
function rr(e, i) {
  ((e.min = e.min + i), (e.max = e.max + i));
}
function eb(e, i, a, s, l = 0.5) {
  const u = He(e.min, e.max, l);
  ch(e, i, a, u, s);
}
function sr(e, i) {
  (eb(e.x, i.x, i.scaleX, i.scale, i.originX),
    eb(e.y, i.y, i.scaleY, i.scale, i.originY));
}
function Aw(e, i) {
  return ww(U5(e.getBoundingClientRect(), i));
}
function q5(e, i, a) {
  const s = Aw(e, a),
    { scroll: l } = i;
  return (l && (rr(s.x, l.offset.x), rr(s.y, l.offset.y)), s);
}
const tb = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  or = () => ({ x: tb(), y: tb() }),
  nb = () => ({ min: 0, max: 0 }),
  $e = () => ({ x: nb(), y: nb() }),
  fh = { current: null },
  Cw = { current: !1 };
function F5() {
  if (((Cw.current = !0), !!Xh))
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"),
        i = () => (fh.current = e.matches);
      (e.addEventListener("change", i), i());
    } else fh.current = !1;
}
const G5 = new WeakMap();
function Y5(e, i, a) {
  for (const s in i) {
    const l = i[s],
      u = a[s];
    if (pt(l)) e.addValue(s, l);
    else if (pt(u)) e.addValue(s, En(l, { owner: e }));
    else if (u !== l)
      if (e.hasValue(s)) {
        const f = e.getValue(s);
        f.liveStyle === !0 ? f.jump(l) : f.hasAnimated || f.set(l);
      } else {
        const f = e.getStaticValue(s);
        e.addValue(s, En(f !== void 0 ? f : l, { owner: e }));
      }
  }
  for (const s in a) i[s] === void 0 && e.removeValue(s);
  return i;
}
const ib = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
class I5 {
  scrapeMotionValuesFromProps(i, a, s) {
    return {};
  }
  constructor(
    {
      parent: i,
      props: a,
      presenceContext: s,
      reducedMotionConfig: l,
      blockInitialAnimation: u,
      visualState: f,
    },
    h = {},
  ) {
    ((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = fm),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection,
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const S = Ct.now();
        this.renderScheduledAt < S &&
          ((this.renderScheduledAt = S), Pe.render(this.render, !1, !0));
      }));
    const { latestValues: m, renderState: p } = f;
    ((this.latestValues = m),
      (this.baseTarget = { ...m }),
      (this.initialValues = a.initial ? { ...m } : {}),
      (this.renderState = p),
      (this.parent = i),
      (this.props = a),
      (this.presenceContext = s),
      (this.depth = i ? i.depth + 1 : 0),
      (this.reducedMotionConfig = l),
      (this.options = h),
      (this.blockInitialAnimation = !!u),
      (this.isControllingVariants = xu(a)),
      (this.isVariantNode = fw(a)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(i && i.current)));
    const { willChange: g, ...y } = this.scrapeMotionValuesFromProps(
      a,
      {},
      this,
    );
    for (const S in y) {
      const T = y[S];
      m[S] !== void 0 && pt(T) && T.set(m[S]);
    }
  }
  mount(i) {
    ((this.current = i),
      G5.set(i, this),
      this.projection && !this.projection.instance && this.projection.mount(i),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((a, s) => this.bindToMotionValue(s, a)),
      Cw.current || F5(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
            ? !0
            : fh.current),
      this.parent?.addChild(this),
      this.update(this.props, this.presenceContext));
  }
  unmount() {
    (this.projection && this.projection.unmount(),
      Mn(this.notifyUpdate),
      Mn(this.render),
      this.valueSubscriptions.forEach((i) => i()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent?.removeChild(this));
    for (const i in this.events) this.events[i].clear();
    for (const i in this.features) {
      const a = this.features[i];
      a && (a.unmount(), (a.isMounted = !1));
    }
    this.current = null;
  }
  addChild(i) {
    (this.children.add(i),
      this.enteringChildren ?? (this.enteringChildren = new Set()),
      this.enteringChildren.add(i));
  }
  removeChild(i) {
    (this.children.delete(i),
      this.enteringChildren && this.enteringChildren.delete(i));
  }
  bindToMotionValue(i, a) {
    this.valueSubscriptions.has(i) && this.valueSubscriptions.get(i)();
    const s = Er.has(i);
    s && this.onBindTransform && this.onBindTransform();
    const l = a.on("change", (f) => {
      ((this.latestValues[i] = f),
        this.props.onUpdate && Pe.preRender(this.notifyUpdate),
        s && this.projection && (this.projection.isTransformDirty = !0),
        this.scheduleRender());
    });
    let u;
    (window.MotionCheckAppearSync &&
      (u = window.MotionCheckAppearSync(this, i, a)),
      this.valueSubscriptions.set(i, () => {
        (l(), u && u(), a.owner && a.stop());
      }));
  }
  sortNodePosition(i) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== i.type
      ? 0
      : this.sortInstanceNodePosition(this.current, i.current);
  }
  updateFeatures() {
    let i = "animation";
    for (i in mr) {
      const a = mr[i];
      if (!a) continue;
      const { isEnabled: s, Feature: l } = a;
      if (
        (!this.features[i] &&
          l &&
          s(this.props) &&
          (this.features[i] = new l(this)),
        this.features[i])
      ) {
        const u = this.features[i];
        u.isMounted ? u.update() : (u.mount(), (u.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : $e();
  }
  getStaticValue(i) {
    return this.latestValues[i];
  }
  setStaticValue(i, a) {
    this.latestValues[i] = a;
  }
  update(i, a) {
    ((i.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = i),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = a));
    for (let s = 0; s < ib.length; s++) {
      const l = ib[s];
      this.propEventSubscriptions[l] &&
        (this.propEventSubscriptions[l](),
        delete this.propEventSubscriptions[l]);
      const u = "on" + l,
        f = i[u];
      f && (this.propEventSubscriptions[l] = this.on(l, f));
    }
    ((this.prevMotionValues = Y5(
      this,
      this.scrapeMotionValuesFromProps(i, this.prevProps, this),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue());
  }
  getProps() {
    return this.props;
  }
  getVariant(i) {
    return this.props.variants ? this.props.variants[i] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
        ? this.parent.getClosestVariantNode()
        : void 0;
  }
  addVariantChild(i) {
    const a = this.getClosestVariantNode();
    if (a)
      return (
        a.variantChildren && a.variantChildren.add(i),
        () => a.variantChildren.delete(i)
      );
  }
  addValue(i, a) {
    const s = this.values.get(i);
    a !== s &&
      (s && this.removeValue(i),
      this.bindToMotionValue(i, a),
      this.values.set(i, a),
      (this.latestValues[i] = a.get()));
  }
  removeValue(i) {
    this.values.delete(i);
    const a = this.valueSubscriptions.get(i);
    (a && (a(), this.valueSubscriptions.delete(i)),
      delete this.latestValues[i],
      this.removeValueFromRenderState(i, this.renderState));
  }
  hasValue(i) {
    return this.values.has(i);
  }
  getValue(i, a) {
    if (this.props.values && this.props.values[i]) return this.props.values[i];
    let s = this.values.get(i);
    return (
      s === void 0 &&
        a !== void 0 &&
        ((s = En(a === null ? void 0 : a, { owner: this })),
        this.addValue(i, s)),
      s
    );
  }
  readValue(i, a) {
    let s =
      this.latestValues[i] !== void 0 || !this.current
        ? this.latestValues[i]
        : (this.getBaseTargetFromProps(this.props, i) ??
          this.readValueFromInstance(this.current, i, this.options));
    return (
      s != null &&
        (typeof s == "string" && (mS(s) || gS(s))
          ? (s = parseFloat(s))
          : !r5(s) && Li.test(a) && (s = JS(i, a)),
        this.setBaseTarget(i, pt(s) ? s.get() : s)),
      pt(s) ? s.get() : s
    );
  }
  setBaseTarget(i, a) {
    this.baseTarget[i] = a;
  }
  getBaseTarget(i) {
    const { initial: a } = this.props;
    let s;
    if (typeof a == "string" || typeof a == "object") {
      const u = wm(this.props, a, this.presenceContext?.custom);
      u && (s = u[i]);
    }
    if (a && s !== void 0) return s;
    const l = this.getBaseTargetFromProps(this.props, i);
    return l !== void 0 && !pt(l)
      ? l
      : this.initialValues[i] !== void 0 && s === void 0
        ? void 0
        : this.baseTarget[i];
  }
  on(i, a) {
    return (
      this.events[i] || (this.events[i] = new Wh()),
      this.events[i].add(a)
    );
  }
  notify(i, ...a) {
    this.events[i] && this.events[i].notify(...a);
  }
  scheduleRenderMicrotask() {
    mm.render(this.render);
  }
}
class Rw extends I5 {
  constructor() {
    (super(...arguments), (this.KeyframeResolver = B3));
  }
  sortInstanceNodePosition(i, a) {
    return i.compareDocumentPosition(a) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(i, a) {
    return i.style ? i.style[a] : void 0;
  }
  removeValueFromRenderState(i, { vars: a, style: s }) {
    (delete a[i], delete s[i]);
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: i } = this.props;
    pt(i) &&
      (this.childSubscription = i.on("change", (a) => {
        this.current && (this.current.textContent = `${a}`);
      }));
  }
}
function Dw(e, { style: i, vars: a }, s, l) {
  const u = e.style;
  let f;
  for (f in i) u[f] = i[f];
  l?.applyProjectionStyles(u, s);
  for (f in a) u.setProperty(f, a[f]);
}
function X5(e) {
  return window.getComputedStyle(e);
}
class K5 extends Rw {
  constructor() {
    (super(...arguments), (this.type = "html"), (this.renderInstance = Dw));
  }
  readValueFromInstance(i, a) {
    if (Er.has(a)) return this.projection?.isProjecting ? nh(a) : r3(i, a);
    {
      const s = X5(i),
        l = (nm(a) ? s.getPropertyValue(a) : s[a]) || 0;
      return typeof l == "string" ? l.trim() : l;
    }
  }
  measureInstanceViewportBox(i, { transformPagePoint: a }) {
    return Aw(i, a);
  }
  build(i, a, s) {
    bm(i, a, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(i, a, s) {
    return Em(i, a, s);
  }
}
const Mw = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function $5(e, i, a, s) {
  Dw(e, i, void 0, s);
  for (const l in i.attrs) e.setAttribute(Mw.has(l) ? l : Tm(l), i.attrs[l]);
}
class Q5 extends Rw {
  constructor() {
    (super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = $e));
  }
  getBaseTargetFromProps(i, a) {
    return i[a];
  }
  readValueFromInstance(i, a) {
    if (Er.has(a)) {
      const s = WS(a);
      return (s && s.default) || 0;
    }
    return ((a = Mw.has(a) ? a : Tm(a)), i.getAttribute(a));
  }
  scrapeMotionValuesFromProps(i, a, s) {
    return vw(i, a, s);
  }
  build(i, a, s) {
    mw(i, a, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(i, a, s, l) {
    $5(i, a, s, l);
  }
  mount(i) {
    ((this.isSVGTag = gw(i.tagName)), super.mount(i));
  }
}
const Z5 = (e, i) =>
  Sm(e) ? new Q5(i) : new K5(i, { allowProjection: e !== b.Fragment });
function ur(e, i, a) {
  const s = e.getProps();
  return wm(s, i, a !== void 0 ? a : s.custom, e);
}
const dh = (e) => Array.isArray(e);
function W5(e, i, a) {
  e.hasValue(i) ? e.getValue(i).set(a) : e.addValue(i, En(a));
}
function J5(e) {
  return dh(e) ? e[e.length - 1] || 0 : e;
}
function e_(e, i) {
  const a = ur(e, i);
  let { transitionEnd: s = {}, transition: l = {}, ...u } = a || {};
  u = { ...u, ...s };
  for (const f in u) {
    const h = J5(u[f]);
    W5(e, f, h);
  }
}
function t_(e) {
  return !!(pt(e) && e.add);
}
function hh(e, i) {
  const a = e.getValue("willChange");
  if (t_(a)) return a.add(i);
  if (!a && ti.WillChange) {
    const s = new ti.WillChange("auto");
    (e.addValue("willChange", s), s.add(i));
  }
}
function Ow(e) {
  return e.props[bw];
}
const n_ = (e) => e !== null;
function i_(e, { repeat: i, repeatType: a = "loop" }, s) {
  const l = e.filter(n_),
    u = i && a !== "loop" && i % 2 === 1 ? 0 : l.length - 1;
  return l[u];
}
const a_ = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  r_ = (e) => ({
    type: "spring",
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  s_ = { type: "keyframes", duration: 0.8 },
  o_ = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  l_ = (e, { keyframes: i }) =>
    i.length > 2
      ? s_
      : Er.has(e)
        ? e.startsWith("scale")
          ? r_(i[1])
          : a_
        : o_;
function u_({
  when: e,
  delay: i,
  delayChildren: a,
  staggerChildren: s,
  staggerDirection: l,
  repeat: u,
  repeatType: f,
  repeatDelay: h,
  from: m,
  elapsed: p,
  ...g
}) {
  return !!Object.keys(g).length;
}
const Am =
  (e, i, a, s = {}, l, u) =>
  (f) => {
    const h = dm(s, e) || {},
      m = h.delay || s.delay || 0;
    let { elapsed: p = 0 } = s;
    p = p - An(m);
    const g = {
      keyframes: Array.isArray(a) ? a : [null, a],
      ease: "easeOut",
      velocity: i.getVelocity(),
      ...h,
      delay: -p,
      onUpdate: (S) => {
        (i.set(S), h.onUpdate && h.onUpdate(S));
      },
      onComplete: () => {
        (f(), h.onComplete && h.onComplete());
      },
      name: e,
      motionValue: i,
      element: u ? void 0 : l,
    };
    (u_(h) || Object.assign(g, l_(e, g)),
      g.duration && (g.duration = An(g.duration)),
      g.repeatDelay && (g.repeatDelay = An(g.repeatDelay)),
      g.from !== void 0 && (g.keyframes[0] = g.from));
    let y = !1;
    if (
      ((g.type === !1 || (g.duration === 0 && !g.repeatDelay)) &&
        (oh(g), g.delay === 0 && (y = !0)),
      (ti.instantAnimations || ti.skipAnimations) &&
        ((y = !0), oh(g), (g.delay = 0)),
      (g.allowFlatten = !h.type && !h.ease),
      y && !u && i.get() !== void 0)
    ) {
      const S = i_(g.keyframes, h);
      if (S !== void 0) {
        Pe.update(() => {
          (g.onUpdate(S), g.onComplete());
        });
        return;
      }
    }
    return h.isSync ? new cm(g) : new R3(g);
  };
function c_({ protectedKeys: e, needsAnimating: i }, a) {
  const s = e.hasOwnProperty(a) && i[a] !== !0;
  return ((i[a] = !1), s);
}
function Nw(e, i, { delay: a = 0, transitionOverride: s, type: l } = {}) {
  let { transition: u = e.getDefaultTransition(), transitionEnd: f, ...h } = i;
  s && (u = s);
  const m = [],
    p = l && e.animationState && e.animationState.getState()[l];
  for (const g in h) {
    const y = e.getValue(g, e.latestValues[g] ?? null),
      S = h[g];
    if (S === void 0 || (p && c_(p, g))) continue;
    const T = { delay: a, ...dm(u || {}, g) },
      C = y.get();
    if (
      C !== void 0 &&
      !y.isAnimating &&
      !Array.isArray(S) &&
      S === C &&
      !T.velocity
    )
      continue;
    let E = !1;
    if (window.MotionHandoffAnimation) {
      const R = Ow(e);
      if (R) {
        const M = window.MotionHandoffAnimation(R, g, Pe);
        M !== null && ((T.startTime = M), (E = !0));
      }
    }
    (hh(e, g),
      y.start(
        Am(g, y, S, e.shouldReduceMotion && $S.has(g) ? { type: !1 } : T, e, E),
      ));
    const A = y.animation;
    A && m.push(A);
  }
  return (
    f &&
      Promise.all(m).then(() => {
        Pe.update(() => {
          f && e_(e, f);
        });
      }),
    m
  );
}
function jw(e, i, a, s = 0, l = 1) {
  const u = Array.from(e)
      .sort((p, g) => p.sortNodePosition(g))
      .indexOf(i),
    f = e.size,
    h = (f - 1) * s;
  return typeof a == "function" ? a(u, f) : l === 1 ? u * s : h - u * s;
}
function mh(e, i, a = {}) {
  const s = ur(e, i, a.type === "exit" ? e.presenceContext?.custom : void 0);
  let { transition: l = e.getDefaultTransition() || {} } = s || {};
  a.transitionOverride && (l = a.transitionOverride);
  const u = s ? () => Promise.all(Nw(e, s, a)) : () => Promise.resolve(),
    f =
      e.variantChildren && e.variantChildren.size
        ? (m = 0) => {
            const {
              delayChildren: p = 0,
              staggerChildren: g,
              staggerDirection: y,
            } = l;
            return f_(e, i, m, p, g, y, a);
          }
        : () => Promise.resolve(),
    { when: h } = l;
  if (h) {
    const [m, p] = h === "beforeChildren" ? [u, f] : [f, u];
    return m().then(() => p());
  } else return Promise.all([u(), f(a.delay)]);
}
function f_(e, i, a = 0, s = 0, l = 0, u = 1, f) {
  const h = [];
  for (const m of e.variantChildren)
    (m.notify("AnimationStart", i),
      h.push(
        mh(m, i, {
          ...f,
          delay:
            a +
            (typeof s == "function" ? 0 : s) +
            jw(e.variantChildren, m, s, l, u),
        }).then(() => m.notify("AnimationComplete", i)),
      ));
  return Promise.all(h);
}
function d_(e, i, a = {}) {
  e.notify("AnimationStart", i);
  let s;
  if (Array.isArray(i)) {
    const l = i.map((u) => mh(e, u, a));
    s = Promise.all(l);
  } else if (typeof i == "string") s = mh(e, i, a);
  else {
    const l = typeof i == "function" ? ur(e, i, a.custom) : i;
    s = Promise.all(Nw(e, l, a));
  }
  return s.then(() => {
    e.notify("AnimationComplete", i);
  });
}
function _w(e, i) {
  if (!Array.isArray(i)) return !1;
  const a = i.length;
  if (a !== e.length) return !1;
  for (let s = 0; s < a; s++) if (i[s] !== e[s]) return !1;
  return !0;
}
const h_ = vm.length;
function Lw(e) {
  if (!e) return;
  if (!e.isControllingVariants) {
    const a = e.parent ? Lw(e.parent) || {} : {};
    return (e.props.initial !== void 0 && (a.initial = e.props.initial), a);
  }
  const i = {};
  for (let a = 0; a < h_; a++) {
    const s = vm[a],
      l = e.props[s];
    (ks(l) || l === !1) && (i[s] = l);
  }
  return i;
}
const m_ = [...ym].reverse(),
  p_ = ym.length;
function g_(e) {
  return (i) =>
    Promise.all(i.map(({ animation: a, options: s }) => d_(e, a, s)));
}
function y_(e) {
  let i = g_(e),
    a = ab(),
    s = !0;
  const l = (m) => (p, g) => {
    const y = ur(e, g, m === "exit" ? e.presenceContext?.custom : void 0);
    if (y) {
      const { transition: S, transitionEnd: T, ...C } = y;
      p = { ...p, ...C, ...T };
    }
    return p;
  };
  function u(m) {
    i = m(e);
  }
  function f(m) {
    const { props: p } = e,
      g = Lw(e.parent) || {},
      y = [],
      S = new Set();
    let T = {},
      C = 1 / 0;
    for (let A = 0; A < p_; A++) {
      const R = m_[A],
        M = a[R],
        O = p[R] !== void 0 ? p[R] : g[R],
        V = ks(O),
        L = R === m ? M.isActive : null;
      L === !1 && (C = A);
      let $ = O === g[R] && O !== p[R] && V;
      if (
        ($ && s && e.manuallyAnimateOnMount && ($ = !1),
        (M.protectedKeys = { ...T }),
        (!M.isActive && L === null) ||
          (!O && !M.prevProp) ||
          bu(O) ||
          typeof O == "boolean")
      )
        continue;
      const H = v_(M.prevProp, O);
      let F = H || (R === m && M.isActive && !$ && V) || (A > C && V),
        J = !1;
      const se = Array.isArray(O) ? O : [O];
      let me = se.reduce(l(R), {});
      L === !1 && (me = {});
      const { prevResolvedValues: ge = {} } = M,
        Ae = { ...ge, ...me },
        ee = (G) => {
          ((F = !0),
            S.has(G) && ((J = !0), S.delete(G)),
            (M.needsAnimating[G] = !0));
          const U = e.getValue(G);
          U && (U.liveStyle = !1);
        };
      for (const G in Ae) {
        const U = me[G],
          ae = ge[G];
        if (T.hasOwnProperty(G)) continue;
        let ce = !1;
        (dh(U) && dh(ae) ? (ce = !_w(U, ae)) : (ce = U !== ae),
          ce
            ? U != null
              ? ee(G)
              : S.add(G)
            : U !== void 0 && S.has(G)
              ? ee(G)
              : (M.protectedKeys[G] = !0));
      }
      ((M.prevProp = O),
        (M.prevResolvedValues = me),
        M.isActive && (T = { ...T, ...me }),
        s && e.blockInitialAnimation && (F = !1));
      const he = $ && H;
      F &&
        (!he || J) &&
        y.push(
          ...se.map((G) => {
            const U = { type: R };
            if (
              typeof G == "string" &&
              s &&
              !he &&
              e.manuallyAnimateOnMount &&
              e.parent
            ) {
              const { parent: ae } = e,
                ce = ur(ae, G);
              if (ae.enteringChildren && ce) {
                const { delayChildren: N } = ce.transition || {};
                U.delay = jw(ae.enteringChildren, e, N);
              }
            }
            return { animation: G, options: U };
          }),
        );
    }
    if (S.size) {
      const A = {};
      if (typeof p.initial != "boolean") {
        const R = ur(e, Array.isArray(p.initial) ? p.initial[0] : p.initial);
        R && R.transition && (A.transition = R.transition);
      }
      (S.forEach((R) => {
        const M = e.getBaseTarget(R),
          O = e.getValue(R);
        (O && (O.liveStyle = !0), (A[R] = M ?? null));
      }),
        y.push({ animation: A }));
    }
    let E = !!y.length;
    return (
      s &&
        (p.initial === !1 || p.initial === p.animate) &&
        !e.manuallyAnimateOnMount &&
        (E = !1),
      (s = !1),
      E ? i(y) : Promise.resolve()
    );
  }
  function h(m, p) {
    if (a[m].isActive === p) return Promise.resolve();
    (e.variantChildren?.forEach((y) => y.animationState?.setActive(m, p)),
      (a[m].isActive = p));
    const g = f(m);
    for (const y in a) a[y].protectedKeys = {};
    return g;
  }
  return {
    animateChanges: f,
    setActive: h,
    setAnimateFunction: u,
    getState: () => a,
    reset: () => {
      a = ab();
    },
  };
}
function v_(e, i) {
  return typeof i == "string" ? i !== e : Array.isArray(i) ? !_w(i, e) : !1;
}
function ia(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function ab() {
  return {
    animate: ia(!0),
    whileInView: ia(),
    whileHover: ia(),
    whileTap: ia(),
    whileDrag: ia(),
    whileFocus: ia(),
    exit: ia(),
  };
}
class zi {
  constructor(i) {
    ((this.isMounted = !1), (this.node = i));
  }
  update() {}
}
class b_ extends zi {
  constructor(i) {
    (super(i), i.animationState || (i.animationState = y_(i)));
  }
  updateAnimationControlsSubscription() {
    const { animate: i } = this.node.getProps();
    bu(i) && (this.unmountControls = i.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: i } = this.node.getProps(),
      { animate: a } = this.node.prevProps || {};
    i !== a && this.updateAnimationControlsSubscription();
  }
  unmount() {
    (this.node.animationState.reset(), this.unmountControls?.());
  }
}
let x_ = 0;
class S_ extends zi {
  constructor() {
    (super(...arguments), (this.id = x_++));
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: i, onExitComplete: a } = this.node.presenceContext,
      { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || i === s) return;
    const l = this.node.animationState.setActive("exit", !i);
    a &&
      !i &&
      l.then(() => {
        a(this.id);
      });
  }
  mount() {
    const { register: i, onExitComplete: a } = this.node.presenceContext || {};
    (a && a(this.id), i && (this.unmount = i(this.id)));
  }
  unmount() {}
}
const w_ = { animation: { Feature: b_ }, exit: { Feature: S_ } };
function Us(e, i, a, s = { passive: !0 }) {
  return (e.addEventListener(i, a, s), () => e.removeEventListener(i, a));
}
function Zs(e) {
  return { point: { x: e.pageX, y: e.pageY } };
}
const E_ = (e) => (i) => pm(i) && e(i, Zs(i));
function Cs(e, i, a, s) {
  return Us(e, i, E_(a), s);
}
const zw = 1e-4,
  T_ = 1 - zw,
  A_ = 1 + zw,
  Pw = 0.01,
  C_ = 0 - Pw,
  R_ = 0 + Pw;
function vt(e) {
  return e.max - e.min;
}
function D_(e, i, a) {
  return Math.abs(e - i) <= a;
}
function rb(e, i, a, s = 0.5) {
  ((e.origin = s),
    (e.originPoint = He(i.min, i.max, e.origin)),
    (e.scale = vt(a) / vt(i)),
    (e.translate = He(a.min, a.max, e.origin) - e.originPoint),
    ((e.scale >= T_ && e.scale <= A_) || isNaN(e.scale)) && (e.scale = 1),
    ((e.translate >= C_ && e.translate <= R_) || isNaN(e.translate)) &&
      (e.translate = 0));
}
function Rs(e, i, a, s) {
  (rb(e.x, i.x, a.x, s ? s.originX : void 0),
    rb(e.y, i.y, a.y, s ? s.originY : void 0));
}
function sb(e, i, a) {
  ((e.min = a.min + i.min), (e.max = e.min + vt(i)));
}
function M_(e, i, a) {
  (sb(e.x, i.x, a.x), sb(e.y, i.y, a.y));
}
function ob(e, i, a) {
  ((e.min = i.min - a.min), (e.max = e.min + vt(i)));
}
function Ds(e, i, a) {
  (ob(e.x, i.x, a.x), ob(e.y, i.y, a.y));
}
function tn(e) {
  return [e("x"), e("y")];
}
const Vw = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  lb = (e, i) => Math.abs(e - i);
function O_(e, i) {
  const a = lb(e.x, i.x),
    s = lb(e.y, i.y);
  return Math.sqrt(a ** 2 + s ** 2);
}
class kw {
  constructor(
    i,
    a,
    {
      transformPagePoint: s,
      contextWindow: l = window,
      dragSnapToOrigin: u = !1,
      distanceThreshold: f = 3,
    } = {},
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const S = pd(this.lastMoveEventInfo, this.history),
          T = this.startEvent !== null,
          C = O_(S.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
        if (!T && !C) return;
        const { point: E } = S,
          { timestamp: A } = st;
        this.history.push({ ...E, timestamp: A });
        const { onStart: R, onMove: M } = this.handlers;
        (T ||
          (R && R(this.lastMoveEvent, S),
          (this.startEvent = this.lastMoveEvent)),
          M && M(this.lastMoveEvent, S));
      }),
      (this.handlePointerMove = (S, T) => {
        ((this.lastMoveEvent = S),
          (this.lastMoveEventInfo = md(T, this.transformPagePoint)),
          Pe.update(this.updatePoint, !0));
      }),
      (this.handlePointerUp = (S, T) => {
        this.end();
        const { onEnd: C, onSessionEnd: E, resumeAnimation: A } = this.handlers;
        if (
          (this.dragSnapToOrigin && A && A(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const R = pd(
          S.type === "pointercancel"
            ? this.lastMoveEventInfo
            : md(T, this.transformPagePoint),
          this.history,
        );
        (this.startEvent && C && C(S, R), E && E(S, R));
      }),
      !pm(i))
    )
      return;
    ((this.dragSnapToOrigin = u),
      (this.handlers = a),
      (this.transformPagePoint = s),
      (this.distanceThreshold = f),
      (this.contextWindow = l || window));
    const h = Zs(i),
      m = md(h, this.transformPagePoint),
      { point: p } = m,
      { timestamp: g } = st;
    this.history = [{ ...p, timestamp: g }];
    const { onSessionStart: y } = a;
    (y && y(i, pd(m, this.history)),
      (this.removeListeners = Ks(
        Cs(this.contextWindow, "pointermove", this.handlePointerMove),
        Cs(this.contextWindow, "pointerup", this.handlePointerUp),
        Cs(this.contextWindow, "pointercancel", this.handlePointerUp),
      )));
  }
  updateHandlers(i) {
    this.handlers = i;
  }
  end() {
    (this.removeListeners && this.removeListeners(), Mn(this.updatePoint));
  }
}
function md(e, i) {
  return i ? { point: i(e.point) } : e;
}
function ub(e, i) {
  return { x: e.x - i.x, y: e.y - i.y };
}
function pd({ point: e }, i) {
  return {
    point: e,
    delta: ub(e, Bw(i)),
    offset: ub(e, N_(i)),
    velocity: j_(i, 0.1),
  };
}
function N_(e) {
  return e[0];
}
function Bw(e) {
  return e[e.length - 1];
}
function j_(e, i) {
  if (e.length < 2) return { x: 0, y: 0 };
  let a = e.length - 1,
    s = null;
  const l = Bw(e);
  for (; a >= 0 && ((s = e[a]), !(l.timestamp - s.timestamp > An(i))); ) a--;
  if (!s) return { x: 0, y: 0 };
  const u = nn(l.timestamp - s.timestamp);
  if (u === 0) return { x: 0, y: 0 };
  const f = { x: (l.x - s.x) / u, y: (l.y - s.y) / u };
  return (f.x === 1 / 0 && (f.x = 0), f.y === 1 / 0 && (f.y = 0), f);
}
function __(e, { min: i, max: a }, s) {
  return (
    i !== void 0 && e < i
      ? (e = s ? He(i, e, s.min) : Math.max(e, i))
      : a !== void 0 && e > a && (e = s ? He(a, e, s.max) : Math.min(e, a)),
    e
  );
}
function cb(e, i, a) {
  return {
    min: i !== void 0 ? e.min + i : void 0,
    max: a !== void 0 ? e.max + a - (e.max - e.min) : void 0,
  };
}
function L_(e, { top: i, left: a, bottom: s, right: l }) {
  return { x: cb(e.x, a, l), y: cb(e.y, i, s) };
}
function fb(e, i) {
  let a = i.min - e.min,
    s = i.max - e.max;
  return (
    i.max - i.min < e.max - e.min && ([a, s] = [s, a]),
    { min: a, max: s }
  );
}
function z_(e, i) {
  return { x: fb(e.x, i.x), y: fb(e.y, i.y) };
}
function P_(e, i) {
  let a = 0.5;
  const s = vt(e),
    l = vt(i);
  return (
    l > s
      ? (a = hr(i.min, i.max - s, e.min))
      : s > l && (a = hr(e.min, e.max - l, i.min)),
    Dn(0, 1, a)
  );
}
function V_(e, i) {
  const a = {};
  return (
    i.min !== void 0 && (a.min = i.min - e.min),
    i.max !== void 0 && (a.max = i.max - e.min),
    a
  );
}
const ph = 0.35;
function k_(e = ph) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = ph),
    { x: db(e, "left", "right"), y: db(e, "top", "bottom") }
  );
}
function db(e, i, a) {
  return { min: hb(e, i), max: hb(e, a) };
}
function hb(e, i) {
  return typeof e == "number" ? e : e[i] || 0;
}
const B_ = new WeakMap();
class U_ {
  constructor(i) {
    ((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = $e()),
      (this.latestPointerEvent = null),
      (this.latestPanInfo = null),
      (this.visualElement = i));
  }
  start(i, { snapToCursor: a = !1, distanceThreshold: s } = {}) {
    const { presenceContext: l } = this.visualElement;
    if (l && l.isPresent === !1) return;
    const u = (y) => {
        const { dragSnapToOrigin: S } = this.getProps();
        (S ? this.pauseAnimation() : this.stopAnimation(),
          a && this.snapToCursor(Zs(y).point));
      },
      f = (y, S) => {
        const { drag: T, dragPropagation: C, onDragStart: E } = this.getProps();
        if (
          T &&
          !C &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = q3(T)),
          !this.openDragLock)
        )
          return;
        ((this.latestPointerEvent = y),
          (this.latestPanInfo = S),
          (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          tn((R) => {
            let M = this.getAxisMotionValue(R).get() || 0;
            if (Cn.test(M)) {
              const { projection: O } = this.visualElement;
              if (O && O.layout) {
                const V = O.layout.layoutBox[R];
                V && (M = vt(V) * (parseFloat(M) / 100));
              }
            }
            this.originPoint[R] = M;
          }),
          E && Pe.postRender(() => E(y, S)),
          hh(this.visualElement, "transform"));
        const { animationState: A } = this.visualElement;
        A && A.setActive("whileDrag", !0);
      },
      h = (y, S) => {
        ((this.latestPointerEvent = y), (this.latestPanInfo = S));
        const {
          dragPropagation: T,
          dragDirectionLock: C,
          onDirectionLock: E,
          onDrag: A,
        } = this.getProps();
        if (!T && !this.openDragLock) return;
        const { offset: R } = S;
        if (C && this.currentDirection === null) {
          ((this.currentDirection = H_(R)),
            this.currentDirection !== null && E && E(this.currentDirection));
          return;
        }
        (this.updateAxis("x", S.point, R),
          this.updateAxis("y", S.point, R),
          this.visualElement.render(),
          A && A(y, S));
      },
      m = (y, S) => {
        ((this.latestPointerEvent = y),
          (this.latestPanInfo = S),
          this.stop(y, S),
          (this.latestPointerEvent = null),
          (this.latestPanInfo = null));
      },
      p = () =>
        tn(
          (y) =>
            this.getAnimationState(y) === "paused" &&
            this.getAxisMotionValue(y).animation?.play(),
        ),
      { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new kw(
      i,
      {
        onSessionStart: u,
        onStart: f,
        onMove: h,
        onSessionEnd: m,
        resumeAnimation: p,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: g,
        distanceThreshold: s,
        contextWindow: Vw(this.visualElement),
      },
    );
  }
  stop(i, a) {
    const s = i || this.latestPointerEvent,
      l = a || this.latestPanInfo,
      u = this.isDragging;
    if ((this.cancel(), !u || !l || !s)) return;
    const { velocity: f } = l;
    this.startAnimation(f);
    const { onDragEnd: h } = this.getProps();
    h && Pe.postRender(() => h(s, l));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: i, animationState: a } = this.visualElement;
    (i && (i.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0));
    const { dragPropagation: s } = this.getProps();
    (!s &&
      this.openDragLock &&
      (this.openDragLock(), (this.openDragLock = null)),
      a && a.setActive("whileDrag", !1));
  }
  updateAxis(i, a, s) {
    const { drag: l } = this.getProps();
    if (!s || !Cl(i, l, this.currentDirection)) return;
    const u = this.getAxisMotionValue(i);
    let f = this.originPoint[i] + s[i];
    (this.constraints &&
      this.constraints[i] &&
      (f = __(f, this.constraints[i], this.elastic[i])),
      u.set(f));
  }
  resolveConstraints() {
    const { dragConstraints: i, dragElastic: a } = this.getProps(),
      s =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : this.visualElement.projection?.layout,
      l = this.constraints;
    (i && ar(i)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : i && s
        ? (this.constraints = L_(s.layoutBox, i))
        : (this.constraints = !1),
      (this.elastic = k_(a)),
      l !== this.constraints &&
        s &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        tn((u) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(u) &&
            (this.constraints[u] = V_(s.layoutBox[u], this.constraints[u]));
        }));
  }
  resolveRefConstraints() {
    const { dragConstraints: i, onMeasureDragConstraints: a } = this.getProps();
    if (!i || !ar(i)) return !1;
    const s = i.current,
      { projection: l } = this.visualElement;
    if (!l || !l.layout) return !1;
    const u = q5(s, l.root, this.visualElement.getTransformPagePoint());
    let f = z_(l.layout.layoutBox, u);
    if (a) {
      const h = a(B5(f));
      ((this.hasMutatedConstraints = !!h), h && (f = ww(h)));
    }
    return f;
  }
  startAnimation(i) {
    const {
        drag: a,
        dragMomentum: s,
        dragElastic: l,
        dragTransition: u,
        dragSnapToOrigin: f,
        onDragTransitionEnd: h,
      } = this.getProps(),
      m = this.constraints || {},
      p = tn((g) => {
        if (!Cl(g, a, this.currentDirection)) return;
        let y = (m && m[g]) || {};
        f && (y = { min: 0, max: 0 });
        const S = l ? 200 : 1e6,
          T = l ? 40 : 1e7,
          C = {
            type: "inertia",
            velocity: s ? i[g] : 0,
            bounceStiffness: S,
            bounceDamping: T,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...u,
            ...y,
          };
        return this.startAxisValueAnimation(g, C);
      });
    return Promise.all(p).then(h);
  }
  startAxisValueAnimation(i, a) {
    const s = this.getAxisMotionValue(i);
    return (
      hh(this.visualElement, i),
      s.start(Am(i, s, 0, a, this.visualElement, !1))
    );
  }
  stopAnimation() {
    tn((i) => this.getAxisMotionValue(i).stop());
  }
  pauseAnimation() {
    tn((i) => this.getAxisMotionValue(i).animation?.pause());
  }
  getAnimationState(i) {
    return this.getAxisMotionValue(i).animation?.state;
  }
  getAxisMotionValue(i) {
    const a = `_drag${i.toUpperCase()}`,
      s = this.visualElement.getProps(),
      l = s[a];
    return (
      l ||
      this.visualElement.getValue(i, (s.initial ? s.initial[i] : void 0) || 0)
    );
  }
  snapToCursor(i) {
    tn((a) => {
      const { drag: s } = this.getProps();
      if (!Cl(a, s, this.currentDirection)) return;
      const { projection: l } = this.visualElement,
        u = this.getAxisMotionValue(a);
      if (l && l.layout) {
        const { min: f, max: h } = l.layout.layoutBox[a];
        u.set(i[a] - He(f, h, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: i, dragConstraints: a } = this.getProps(),
      { projection: s } = this.visualElement;
    if (!ar(a) || !s || !this.constraints) return;
    this.stopAnimation();
    const l = { x: 0, y: 0 };
    tn((f) => {
      const h = this.getAxisMotionValue(f);
      if (h && this.constraints !== !1) {
        const m = h.get();
        l[f] = P_({ min: m, max: m }, this.constraints[f]);
      }
    });
    const { transformTemplate: u } = this.visualElement.getProps();
    ((this.visualElement.current.style.transform = u ? u({}, "") : "none"),
      s.root && s.root.updateScroll(),
      s.updateLayout(),
      this.resolveConstraints(),
      tn((f) => {
        if (!Cl(f, i, null)) return;
        const h = this.getAxisMotionValue(f),
          { min: m, max: p } = this.constraints[f];
        h.set(He(m, p, l[f]));
      }));
  }
  addListeners() {
    if (!this.visualElement.current) return;
    B_.set(this.visualElement, this);
    const i = this.visualElement.current,
      a = Cs(i, "pointerdown", (m) => {
        const { drag: p, dragListener: g = !0 } = this.getProps();
        p && g && this.start(m);
      }),
      s = () => {
        const { dragConstraints: m } = this.getProps();
        ar(m) && m.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: l } = this.visualElement,
      u = l.addEventListener("measure", s);
    (l && !l.layout && (l.root && l.root.updateScroll(), l.updateLayout()),
      Pe.read(s));
    const f = Us(window, "resize", () => this.scalePositionWithinConstraints()),
      h = l.addEventListener(
        "didUpdate",
        ({ delta: m, hasLayoutChanged: p }) => {
          this.isDragging &&
            p &&
            (tn((g) => {
              const y = this.getAxisMotionValue(g);
              y &&
                ((this.originPoint[g] += m[g].translate),
                y.set(y.get() + m[g].translate));
            }),
            this.visualElement.render());
        },
      );
    return () => {
      (f(), a(), u(), h && h());
    };
  }
  getProps() {
    const i = this.visualElement.getProps(),
      {
        drag: a = !1,
        dragDirectionLock: s = !1,
        dragPropagation: l = !1,
        dragConstraints: u = !1,
        dragElastic: f = ph,
        dragMomentum: h = !0,
      } = i;
    return {
      ...i,
      drag: a,
      dragDirectionLock: s,
      dragPropagation: l,
      dragConstraints: u,
      dragElastic: f,
      dragMomentum: h,
    };
  }
}
function Cl(e, i, a) {
  return (i === !0 || i === e) && (a === null || a === e);
}
function H_(e, i = 10) {
  let a = null;
  return (Math.abs(e.y) > i ? (a = "y") : Math.abs(e.x) > i && (a = "x"), a);
}
class q_ extends zi {
  constructor(i) {
    (super(i),
      (this.removeGroupControls = Rt),
      (this.removeListeners = Rt),
      (this.controls = new U_(i)));
  }
  mount() {
    const { dragControls: i } = this.node.getProps();
    (i && (this.removeGroupControls = i.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || Rt));
  }
  unmount() {
    (this.removeGroupControls(), this.removeListeners());
  }
}
const mb = (e) => (i, a) => {
  e && Pe.postRender(() => e(i, a));
};
class F_ extends zi {
  constructor() {
    (super(...arguments), (this.removePointerDownListener = Rt));
  }
  onPointerDown(i) {
    this.session = new kw(i, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Vw(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: i,
      onPanStart: a,
      onPan: s,
      onPanEnd: l,
    } = this.node.getProps();
    return {
      onSessionStart: mb(i),
      onStart: mb(a),
      onMove: s,
      onEnd: (u, f) => {
        (delete this.session, l && Pe.postRender(() => l(u, f)));
      },
    };
  }
  mount() {
    this.removePointerDownListener = Cs(this.node.current, "pointerdown", (i) =>
      this.onPointerDown(i),
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    (this.removePointerDownListener(), this.session && this.session.end());
  }
}
const Gl = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function pb(e, i) {
  return i.max === i.min ? 0 : (e / (i.max - i.min)) * 100;
}
const xs = {
    correct: (e, i) => {
      if (!i.target) return e;
      if (typeof e == "string")
        if (de.test(e)) e = parseFloat(e);
        else return e;
      const a = pb(e, i.target.x),
        s = pb(e, i.target.y);
      return `${a}% ${s}%`;
    },
  },
  G_ = {
    correct: (e, { treeScale: i, projectionDelta: a }) => {
      const s = e,
        l = Li.parse(e);
      if (l.length > 5) return s;
      const u = Li.createTransformer(e),
        f = typeof l[0] != "number" ? 1 : 0,
        h = a.x.scale * i.x,
        m = a.y.scale * i.y;
      ((l[0 + f] /= h), (l[1 + f] /= m));
      const p = He(h, m, 0.5);
      return (
        typeof l[2 + f] == "number" && (l[2 + f] /= p),
        typeof l[3 + f] == "number" && (l[3 + f] /= p),
        u(l)
      );
    },
  };
let gd = !1;
class Y_ extends b.Component {
  componentDidMount() {
    const {
        visualElement: i,
        layoutGroup: a,
        switchLayoutGroup: s,
        layoutId: l,
      } = this.props,
      { projection: u } = i;
    (h5(I_),
      u &&
        (a.group && a.group.add(u),
        s && s.register && l && s.register(u),
        gd && u.root.didUpdate(),
        u.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        u.setOptions({
          ...u.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (Gl.hasEverUpdated = !0));
  }
  getSnapshotBeforeUpdate(i) {
    const {
        layoutDependency: a,
        visualElement: s,
        drag: l,
        isPresent: u,
      } = this.props,
      { projection: f } = s;
    return (
      f &&
        ((f.isPresent = u),
        (gd = !0),
        l || i.layoutDependency !== a || a === void 0 || i.isPresent !== u
          ? f.willUpdate()
          : this.safeToRemove(),
        i.isPresent !== u &&
          (u
            ? f.promote()
            : f.relegate() ||
              Pe.postRender(() => {
                const h = f.getStack();
                (!h || !h.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: i } = this.props.visualElement;
    i &&
      (i.root.didUpdate(),
      mm.postRender(() => {
        !i.currentAnimation && i.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: i,
        layoutGroup: a,
        switchLayoutGroup: s,
      } = this.props,
      { projection: l } = i;
    ((gd = !0),
      l &&
        (l.scheduleCheckAfterUnmount(),
        a && a.group && a.group.remove(l),
        s && s.deregister && s.deregister(l)));
  }
  safeToRemove() {
    const { safeToRemove: i } = this.props;
    i && i();
  }
  render() {
    return null;
  }
}
function Uw(e) {
  const [i, a] = s5(),
    s = b.useContext(fS);
  return x.jsx(Y_, {
    ...e,
    layoutGroup: s,
    switchLayoutGroup: b.useContext(xw),
    isPresent: i,
    safeToRemove: a,
  });
}
const I_ = {
  borderRadius: {
    ...xs,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
    ],
  },
  borderTopLeftRadius: xs,
  borderTopRightRadius: xs,
  borderBottomLeftRadius: xs,
  borderBottomRightRadius: xs,
  boxShadow: G_,
};
function X_(e, i, a) {
  const s = pt(e) ? e : En(e);
  return (s.start(Am("", s, i, a)), s.animation);
}
const K_ = (e, i) => e.depth - i.depth;
class $_ {
  constructor() {
    ((this.children = []), (this.isDirty = !1));
  }
  add(i) {
    ($h(this.children, i), (this.isDirty = !0));
  }
  remove(i) {
    (Qh(this.children, i), (this.isDirty = !0));
  }
  forEach(i) {
    (this.isDirty && this.children.sort(K_),
      (this.isDirty = !1),
      this.children.forEach(i));
  }
}
function Q_(e, i) {
  const a = Ct.now(),
    s = ({ timestamp: l }) => {
      const u = l - a;
      u >= i && (Mn(s), e(u - i));
    };
  return (Pe.setup(s, !0), () => Mn(s));
}
const Hw = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  Z_ = Hw.length,
  gb = (e) => (typeof e == "string" ? parseFloat(e) : e),
  yb = (e) => typeof e == "number" || de.test(e);
function W_(e, i, a, s, l, u) {
  l
    ? ((e.opacity = He(0, a.opacity ?? 1, J_(s))),
      (e.opacityExit = He(i.opacity ?? 1, 0, e4(s))))
    : u && (e.opacity = He(i.opacity ?? 1, a.opacity ?? 1, s));
  for (let f = 0; f < Z_; f++) {
    const h = `border${Hw[f]}Radius`;
    let m = vb(i, h),
      p = vb(a, h);
    if (m === void 0 && p === void 0) continue;
    (m || (m = 0),
      p || (p = 0),
      m === 0 || p === 0 || yb(m) === yb(p)
        ? ((e[h] = Math.max(He(gb(m), gb(p), s), 0)),
          (Cn.test(p) || Cn.test(m)) && (e[h] += "%"))
        : (e[h] = p));
  }
  (i.rotate || a.rotate) && (e.rotate = He(i.rotate || 0, a.rotate || 0, s));
}
function vb(e, i) {
  return e[i] !== void 0 ? e[i] : e.borderRadius;
}
const J_ = qw(0, 0.5, ES),
  e4 = qw(0.5, 0.95, Rt);
function qw(e, i, a) {
  return (s) => (s < e ? 0 : s > i ? 1 : a(hr(e, i, s)));
}
function bb(e, i) {
  ((e.min = i.min), (e.max = i.max));
}
function en(e, i) {
  (bb(e.x, i.x), bb(e.y, i.y));
}
function xb(e, i) {
  ((e.translate = i.translate),
    (e.scale = i.scale),
    (e.originPoint = i.originPoint),
    (e.origin = i.origin));
}
function Sb(e, i, a, s, l) {
  return (
    (e -= i),
    (e = iu(e, 1 / a, s)),
    l !== void 0 && (e = iu(e, 1 / l, s)),
    e
  );
}
function t4(e, i = 0, a = 1, s = 0.5, l, u = e, f = e) {
  if (
    (Cn.test(i) &&
      ((i = parseFloat(i)), (i = He(f.min, f.max, i / 100) - f.min)),
    typeof i != "number")
  )
    return;
  let h = He(u.min, u.max, s);
  (e === u && (h -= i),
    (e.min = Sb(e.min, i, a, h, l)),
    (e.max = Sb(e.max, i, a, h, l)));
}
function wb(e, i, [a, s, l], u, f) {
  t4(e, i[a], i[s], i[l], i.scale, u, f);
}
const n4 = ["x", "scaleX", "originX"],
  i4 = ["y", "scaleY", "originY"];
function Eb(e, i, a, s) {
  (wb(e.x, i, n4, a ? a.x : void 0, s ? s.x : void 0),
    wb(e.y, i, i4, a ? a.y : void 0, s ? s.y : void 0));
}
function Tb(e) {
  return e.translate === 0 && e.scale === 1;
}
function Fw(e) {
  return Tb(e.x) && Tb(e.y);
}
function Ab(e, i) {
  return e.min === i.min && e.max === i.max;
}
function a4(e, i) {
  return Ab(e.x, i.x) && Ab(e.y, i.y);
}
function Cb(e, i) {
  return (
    Math.round(e.min) === Math.round(i.min) &&
    Math.round(e.max) === Math.round(i.max)
  );
}
function Gw(e, i) {
  return Cb(e.x, i.x) && Cb(e.y, i.y);
}
function Rb(e) {
  return vt(e.x) / vt(e.y);
}
function Db(e, i) {
  return (
    e.translate === i.translate &&
    e.scale === i.scale &&
    e.originPoint === i.originPoint
  );
}
class r4 {
  constructor() {
    this.members = [];
  }
  add(i) {
    ($h(this.members, i), i.scheduleRender());
  }
  remove(i) {
    if (
      (Qh(this.members, i),
      i === this.prevLead && (this.prevLead = void 0),
      i === this.lead)
    ) {
      const a = this.members[this.members.length - 1];
      a && this.promote(a);
    }
  }
  relegate(i) {
    const a = this.members.findIndex((l) => i === l);
    if (a === 0) return !1;
    let s;
    for (let l = a; l >= 0; l--) {
      const u = this.members[l];
      if (u.isPresent !== !1) {
        s = u;
        break;
      }
    }
    return s ? (this.promote(s), !0) : !1;
  }
  promote(i, a) {
    const s = this.lead;
    if (i !== s && ((this.prevLead = s), (this.lead = i), i.show(), s)) {
      (s.instance && s.scheduleRender(),
        i.scheduleRender(),
        (i.resumeFrom = s),
        a && (i.resumeFrom.preserveOpacity = !0),
        s.snapshot &&
          ((i.snapshot = s.snapshot),
          (i.snapshot.latestValues = s.animationValues || s.latestValues)),
        i.root && i.root.isUpdating && (i.isLayoutDirty = !0));
      const { crossfade: l } = i.options;
      l === !1 && s.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((i) => {
      const { options: a, resumingFrom: s } = i;
      (a.onExitComplete && a.onExitComplete(),
        s && s.options.onExitComplete && s.options.onExitComplete());
    });
  }
  scheduleRender() {
    this.members.forEach((i) => {
      i.instance && i.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function s4(e, i, a) {
  let s = "";
  const l = e.x.translate / i.x,
    u = e.y.translate / i.y,
    f = a?.z || 0;
  if (
    ((l || u || f) && (s = `translate3d(${l}px, ${u}px, ${f}px) `),
    (i.x !== 1 || i.y !== 1) && (s += `scale(${1 / i.x}, ${1 / i.y}) `),
    a)
  ) {
    const {
      transformPerspective: p,
      rotate: g,
      rotateX: y,
      rotateY: S,
      skewX: T,
      skewY: C,
    } = a;
    (p && (s = `perspective(${p}px) ${s}`),
      g && (s += `rotate(${g}deg) `),
      y && (s += `rotateX(${y}deg) `),
      S && (s += `rotateY(${S}deg) `),
      T && (s += `skewX(${T}deg) `),
      C && (s += `skewY(${C}deg) `));
  }
  const h = e.x.scale * i.x,
    m = e.y.scale * i.y;
  return ((h !== 1 || m !== 1) && (s += `scale(${h}, ${m})`), s || "none");
}
const yd = ["", "X", "Y", "Z"],
  o4 = 1e3;
let l4 = 0;
function vd(e, i, a, s) {
  const { latestValues: l } = i;
  l[e] && ((a[e] = l[e]), i.setStaticValue(e, 0), s && (s[e] = 0));
}
function Yw(e) {
  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
  const { visualElement: i } = e.options;
  if (!i) return;
  const a = Ow(i);
  if (window.MotionHasOptimisedAnimation(a, "transform")) {
    const { layout: l, layoutId: u } = e.options;
    window.MotionCancelOptimisedAnimation(a, "transform", Pe, !(l || u));
  }
  const { parent: s } = e;
  s && !s.hasCheckedOptimisedAppear && Yw(s);
}
function Iw({
  attachResizeListener: e,
  defaultParent: i,
  measureScroll: a,
  checkIsScrollRoot: s,
  resetTransform: l,
}) {
  return class {
    constructor(f = {}, h = i?.()) {
      ((this.id = l4++),
        (this.animationId = 0),
        (this.animationCommitId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          ((this.projectionUpdateScheduled = !1),
            this.nodes.forEach(f4),
            this.nodes.forEach(p4),
            this.nodes.forEach(g4),
            this.nodes.forEach(d4));
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = f),
        (this.root = h ? h.root || h : this),
        (this.path = h ? [...h.path, h] : []),
        (this.parent = h),
        (this.depth = h ? h.depth + 1 : 0));
      for (let m = 0; m < this.path.length; m++)
        this.path[m].shouldResetTransform = !0;
      this.root === this && (this.nodes = new $_());
    }
    addEventListener(f, h) {
      return (
        this.eventHandlers.has(f) || this.eventHandlers.set(f, new Wh()),
        this.eventHandlers.get(f).add(h)
      );
    }
    notifyListeners(f, ...h) {
      const m = this.eventHandlers.get(f);
      m && m.notify(...h);
    }
    hasListeners(f) {
      return this.eventHandlers.has(f);
    }
    mount(f) {
      if (this.instance) return;
      ((this.isSVG = gm(f) && !i5(f)), (this.instance = f));
      const { layoutId: h, layout: m, visualElement: p } = this.options;
      if (
        (p && !p.current && p.mount(f),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        this.root.hasTreeAnimated && (m || h) && (this.isLayoutDirty = !0),
        e)
      ) {
        let g,
          y = 0;
        const S = () => (this.root.updateBlockedByResize = !1);
        (Pe.read(() => {
          y = window.innerWidth;
        }),
          e(f, () => {
            const T = window.innerWidth;
            T !== y &&
              ((y = T),
              (this.root.updateBlockedByResize = !0),
              g && g(),
              (g = Q_(S, 250)),
              Gl.hasAnimatedSinceResize &&
                ((Gl.hasAnimatedSinceResize = !1), this.nodes.forEach(Nb)));
          }));
      }
      (h && this.root.registerSharedNode(h, this),
        this.options.animate !== !1 &&
          p &&
          (h || m) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: g,
              hasLayoutChanged: y,
              hasRelativeLayoutChanged: S,
              layout: T,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                ((this.target = void 0), (this.relativeTarget = void 0));
                return;
              }
              const C =
                  this.options.transition || p.getDefaultTransition() || S4,
                { onLayoutAnimationStart: E, onLayoutAnimationComplete: A } =
                  p.getProps(),
                R = !this.targetLayout || !Gw(this.targetLayout, T),
                M = !y && S;
              if (
                this.options.layoutRoot ||
                this.resumeFrom ||
                M ||
                (y && (R || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0));
                const O = { ...dm(C, "layout"), onPlay: E, onComplete: A };
                ((p.shouldReduceMotion || this.options.layoutRoot) &&
                  ((O.delay = 0), (O.type = !1)),
                  this.startAnimation(O),
                  this.setAnimationOrigin(g, M));
              } else
                (y || Nb(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete());
              this.targetLayout = T;
            },
          ));
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(),
        this.root.nodes.remove(this));
      const f = this.getStack();
      (f && f.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        this.eventHandlers.clear(),
        Mn(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(y4),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: f } = this.options;
      return f && f.getProps().transformTemplate;
    }
    willUpdate(f = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          Yw(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let g = 0; g < this.path.length; g++) {
        const y = this.path[g];
        ((y.shouldResetTransform = !0),
          y.updateScroll("snapshot"),
          y.options.layoutRoot && y.willUpdate(!1));
      }
      const { layoutId: h, layout: m } = this.options;
      if (h === void 0 && !m) return;
      const p = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = p
        ? p(this.latestValues, "")
        : void 0),
        this.updateSnapshot(),
        f && this.notifyListeners("willUpdate"));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        (this.unblockUpdate(),
          this.clearAllSnapshots(),
          this.nodes.forEach(Mb));
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Ob);
        return;
      }
      ((this.animationCommitId = this.animationId),
        this.isUpdating
          ? ((this.isUpdating = !1),
            this.nodes.forEach(m4),
            this.nodes.forEach(u4),
            this.nodes.forEach(c4))
          : this.nodes.forEach(Ob),
        this.clearAllSnapshots());
      const h = Ct.now();
      ((st.delta = Dn(0, 1e3 / 60, h - st.timestamp)),
        (st.timestamp = h),
        (st.isProcessing = !0),
        sd.update.process(st),
        sd.preRender.process(st),
        sd.render.process(st),
        (st.isProcessing = !1));
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), mm.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(h4), this.sharedNodes.forEach(v4));
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        Pe.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Pe.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot ||
        !this.instance ||
        ((this.snapshot = this.measure()),
        this.snapshot &&
          !vt(this.snapshot.measuredBox.x) &&
          !vt(this.snapshot.measuredBox.y) &&
          (this.snapshot = void 0));
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let m = 0; m < this.path.length; m++) this.path[m].updateScroll();
      const f = this.layout;
      ((this.layout = this.measure(!1)),
        (this.layoutCorrected = $e()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox));
      const { visualElement: h } = this.options;
      h &&
        h.notify(
          "LayoutMeasure",
          this.layout.layoutBox,
          f ? f.layoutBox : void 0,
        );
    }
    updateScroll(f = "measure") {
      let h = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === f &&
          (h = !1),
        h && this.instance)
      ) {
        const m = s(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: f,
          isRoot: m,
          offset: a(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : m,
        };
      }
    }
    resetTransform() {
      if (!l) return;
      const f =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        h = this.projectionDelta && !Fw(this.projectionDelta),
        m = this.getTransformTemplate(),
        p = m ? m(this.latestValues, "") : void 0,
        g = p !== this.prevTransformTemplateValue;
      f &&
        this.instance &&
        (h || aa(this.latestValues) || g) &&
        (l(this.instance, p),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(f = !0) {
      const h = this.measurePageBox();
      let m = this.removeElementScroll(h);
      return (
        f && (m = this.removeTransform(m)),
        w4(m),
        {
          animationId: this.root.animationId,
          measuredBox: h,
          layoutBox: m,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      const { visualElement: f } = this.options;
      if (!f) return $e();
      const h = f.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(E4))) {
        const { scroll: p } = this.root;
        p && (rr(h.x, p.offset.x), rr(h.y, p.offset.y));
      }
      return h;
    }
    removeElementScroll(f) {
      const h = $e();
      if ((en(h, f), this.scroll?.wasRoot)) return h;
      for (let m = 0; m < this.path.length; m++) {
        const p = this.path[m],
          { scroll: g, options: y } = p;
        p !== this.root &&
          g &&
          y.layoutScroll &&
          (g.wasRoot && en(h, f), rr(h.x, g.offset.x), rr(h.y, g.offset.y));
      }
      return h;
    }
    applyTransform(f, h = !1) {
      const m = $e();
      en(m, f);
      for (let p = 0; p < this.path.length; p++) {
        const g = this.path[p];
        (!h &&
          g.options.layoutScroll &&
          g.scroll &&
          g !== g.root &&
          sr(m, { x: -g.scroll.offset.x, y: -g.scroll.offset.y }),
          aa(g.latestValues) && sr(m, g.latestValues));
      }
      return (aa(this.latestValues) && sr(m, this.latestValues), m);
    }
    removeTransform(f) {
      const h = $e();
      en(h, f);
      for (let m = 0; m < this.path.length; m++) {
        const p = this.path[m];
        if (!p.instance || !aa(p.latestValues)) continue;
        uh(p.latestValues) && p.updateSnapshot();
        const g = $e(),
          y = p.measurePageBox();
        (en(g, y),
          Eb(h, p.latestValues, p.snapshot ? p.snapshot.layoutBox : void 0, g));
      }
      return (aa(this.latestValues) && Eb(h, this.latestValues), h);
    }
    setTargetDelta(f) {
      ((this.targetDelta = f),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0));
    }
    setOptions(f) {
      this.options = {
        ...this.options,
        ...f,
        crossfade: f.crossfade !== void 0 ? f.crossfade : !0,
      };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== st.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(f = !1) {
      const h = this.getLead();
      (this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = h.isSharedProjectionDirty));
      const m = !!this.resumingFrom || this !== h;
      if (
        !(
          f ||
          (m && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          this.parent?.isProjectionDirty ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: g, layoutId: y } = this.options;
      if (!(!this.layout || !(g || y))) {
        if (
          ((this.resolvedRelativeTargetAt = st.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const S = this.getClosestProjectingParent();
          S && S.layout && this.animationProgress !== 1
            ? ((this.relativeParent = S),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = $e()),
              (this.relativeTargetOrigin = $e()),
              Ds(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                S.layout.layoutBox,
              ),
              en(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (
          !(!this.relativeTarget && !this.targetDelta) &&
          (this.target ||
            ((this.target = $e()), (this.targetWithTransforms = $e())),
          this.relativeTarget &&
          this.relativeTargetOrigin &&
          this.relativeParent &&
          this.relativeParent.target
            ? (this.forceRelativeParentToResolveTarget(),
              M_(this.target, this.relativeTarget, this.relativeParent.target))
            : this.targetDelta
              ? (this.resumingFrom
                  ? (this.target = this.applyTransform(this.layout.layoutBox))
                  : en(this.target, this.layout.layoutBox),
                Tw(this.target, this.targetDelta))
              : en(this.target, this.layout.layoutBox),
          this.attemptToResolveRelativeTarget)
        ) {
          this.attemptToResolveRelativeTarget = !1;
          const S = this.getClosestProjectingParent();
          S &&
          !!S.resumingFrom == !!this.resumingFrom &&
          !S.options.layoutScroll &&
          S.target &&
          this.animationProgress !== 1
            ? ((this.relativeParent = S),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = $e()),
              (this.relativeTargetOrigin = $e()),
              Ds(this.relativeTargetOrigin, this.target, S.target),
              en(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          uh(this.parent.latestValues) ||
          Ew(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      const f = this.getLead(),
        h = !!this.resumingFrom || this !== f;
      let m = !0;
      if (
        ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (m = !1),
        h &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (m = !1),
        this.resolvedRelativeTargetAt === st.timestamp && (m = !1),
        m)
      )
        return;
      const { layout: p, layoutId: g } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(p || g))
      )
        return;
      en(this.layoutCorrected, this.layout.layoutBox);
      const y = this.treeScale.x,
        S = this.treeScale.y;
      (H5(this.layoutCorrected, this.treeScale, this.path, h),
        f.layout &&
          !f.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((f.target = f.layout.layoutBox), (f.targetWithTransforms = $e())));
      const { target: T } = f;
      if (!T) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      (!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (xb(this.prevProjectionDelta.x, this.projectionDelta.x),
          xb(this.prevProjectionDelta.y, this.projectionDelta.y)),
        Rs(this.projectionDelta, this.layoutCorrected, T, this.latestValues),
        (this.treeScale.x !== y ||
          this.treeScale.y !== S ||
          !Db(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !Db(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", T)));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(f = !0) {
      if ((this.options.visualElement?.scheduleRender(), f)) {
        const h = this.getStack();
        h && h.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      ((this.prevProjectionDelta = or()),
        (this.projectionDelta = or()),
        (this.projectionDeltaWithTransform = or()));
    }
    setAnimationOrigin(f, h = !1) {
      const m = this.snapshot,
        p = m ? m.latestValues : {},
        g = { ...this.latestValues },
        y = or();
      ((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !h));
      const S = $e(),
        T = m ? m.source : void 0,
        C = this.layout ? this.layout.source : void 0,
        E = T !== C,
        A = this.getStack(),
        R = !A || A.members.length <= 1,
        M = !!(E && !R && this.options.crossfade === !0 && !this.path.some(x4));
      this.animationProgress = 0;
      let O;
      ((this.mixTargetDelta = (V) => {
        const L = V / 1e3;
        (jb(y.x, f.x, L),
          jb(y.y, f.y, L),
          this.setTargetDelta(y),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (Ds(S, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            b4(this.relativeTarget, this.relativeTargetOrigin, S, L),
            O && a4(this.relativeTarget, O) && (this.isProjectionDirty = !1),
            O || (O = $e()),
            en(O, this.relativeTarget)),
          E &&
            ((this.animationValues = g), W_(g, p, this.latestValues, L, M, R)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = L));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
    }
    startAnimation(f) {
      (this.notifyListeners("animationStart"),
        this.currentAnimation?.stop(),
        this.resumingFrom?.currentAnimation?.stop(),
        this.pendingAnimation &&
          (Mn(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = Pe.update(() => {
          ((Gl.hasAnimatedSinceResize = !0),
            this.motionValue || (this.motionValue = En(0)),
            (this.currentAnimation = X_(this.motionValue, [0, 1e3], {
              ...f,
              velocity: 0,
              isSync: !0,
              onUpdate: (h) => {
                (this.mixTargetDelta(h), f.onUpdate && f.onUpdate(h));
              },
              onStop: () => {},
              onComplete: () => {
                (f.onComplete && f.onComplete(), this.completeAnimation());
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0));
        })));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const f = this.getStack();
      (f && f.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete"));
    }
    finishAnimation() {
      (this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(o4),
        this.currentAnimation.stop()),
        this.completeAnimation());
    }
    applyTransformsToTarget() {
      const f = this.getLead();
      let {
        targetWithTransforms: h,
        target: m,
        layout: p,
        latestValues: g,
      } = f;
      if (!(!h || !m || !p)) {
        if (
          this !== f &&
          this.layout &&
          p &&
          Xw(this.options.animationType, this.layout.layoutBox, p.layoutBox)
        ) {
          m = this.target || $e();
          const y = vt(this.layout.layoutBox.x);
          ((m.x.min = f.target.x.min), (m.x.max = m.x.min + y));
          const S = vt(this.layout.layoutBox.y);
          ((m.y.min = f.target.y.min), (m.y.max = m.y.min + S));
        }
        (en(h, m),
          sr(h, g),
          Rs(this.projectionDeltaWithTransform, this.layoutCorrected, h, g));
      }
    }
    registerSharedNode(f, h) {
      (this.sharedNodes.has(f) || this.sharedNodes.set(f, new r4()),
        this.sharedNodes.get(f).add(h));
      const p = h.options.initialPromotionConfig;
      h.promote({
        transition: p ? p.transition : void 0,
        preserveFollowOpacity:
          p && p.shouldPreserveFollowOpacity
            ? p.shouldPreserveFollowOpacity(h)
            : void 0,
      });
    }
    isLead() {
      const f = this.getStack();
      return f ? f.lead === this : !0;
    }
    getLead() {
      const { layoutId: f } = this.options;
      return f ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: f } = this.options;
      return f ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: f } = this.options;
      if (f) return this.root.sharedNodes.get(f);
    }
    promote({ needsReset: f, transition: h, preserveFollowOpacity: m } = {}) {
      const p = this.getStack();
      (p && p.promote(this, m),
        f && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        h && this.setOptions({ transition: h }));
    }
    relegate() {
      const f = this.getStack();
      return f ? f.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: f } = this.options;
      if (!f) return;
      let h = !1;
      const { latestValues: m } = f;
      if (
        ((m.z ||
          m.rotate ||
          m.rotateX ||
          m.rotateY ||
          m.rotateZ ||
          m.skewX ||
          m.skewY) &&
          (h = !0),
        !h)
      )
        return;
      const p = {};
      m.z && vd("z", f, p, this.animationValues);
      for (let g = 0; g < yd.length; g++)
        (vd(`rotate${yd[g]}`, f, p, this.animationValues),
          vd(`skew${yd[g]}`, f, p, this.animationValues));
      f.render();
      for (const g in p)
        (f.setStaticValue(g, p[g]),
          this.animationValues && (this.animationValues[g] = p[g]));
      f.scheduleRender();
    }
    applyProjectionStyles(f, h) {
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) {
        f.visibility = "hidden";
        return;
      }
      const m = this.getTransformTemplate();
      if (this.needsReset) {
        ((this.needsReset = !1),
          (f.visibility = ""),
          (f.opacity = ""),
          (f.pointerEvents = Fl(h?.pointerEvents) || ""),
          (f.transform = m ? m(this.latestValues, "") : "none"));
        return;
      }
      const p = this.getLead();
      if (!this.projectionDelta || !this.layout || !p.target) {
        (this.options.layoutId &&
          ((f.opacity =
            this.latestValues.opacity !== void 0
              ? this.latestValues.opacity
              : 1),
          (f.pointerEvents = Fl(h?.pointerEvents) || "")),
          this.hasProjected &&
            !aa(this.latestValues) &&
            ((f.transform = m ? m({}, "") : "none"), (this.hasProjected = !1)));
        return;
      }
      f.visibility = "";
      const g = p.animationValues || p.latestValues;
      this.applyTransformsToTarget();
      let y = s4(this.projectionDeltaWithTransform, this.treeScale, g);
      (m && (y = m(g, y)), (f.transform = y));
      const { x: S, y: T } = this.projectionDelta;
      ((f.transformOrigin = `${S.origin * 100}% ${T.origin * 100}% 0`),
        p.animationValues
          ? (f.opacity =
              p === this
                ? (g.opacity ?? this.latestValues.opacity ?? 1)
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : g.opacityExit)
          : (f.opacity =
              p === this
                ? g.opacity !== void 0
                  ? g.opacity
                  : ""
                : g.opacityExit !== void 0
                  ? g.opacityExit
                  : 0));
      for (const C in Bs) {
        if (g[C] === void 0) continue;
        const { correct: E, applyTo: A, isCSSVariable: R } = Bs[C],
          M = y === "none" ? g[C] : E(g[C], p);
        if (A) {
          const O = A.length;
          for (let V = 0; V < O; V++) f[A[V]] = M;
        } else
          R ? (this.options.visualElement.renderState.vars[C] = M) : (f[C] = M);
      }
      this.options.layoutId &&
        (f.pointerEvents = p === this ? Fl(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach((f) => f.currentAnimation?.stop()),
        this.root.nodes.forEach(Mb),
        this.root.sharedNodes.clear());
    }
  };
}
function u4(e) {
  e.updateLayout();
}
function c4(e) {
  const i = e.resumeFrom?.snapshot || e.snapshot;
  if (e.isLead() && e.layout && i && e.hasListeners("didUpdate")) {
    const { layoutBox: a, measuredBox: s } = e.layout,
      { animationType: l } = e.options,
      u = i.source !== e.layout.source;
    l === "size"
      ? tn((g) => {
          const y = u ? i.measuredBox[g] : i.layoutBox[g],
            S = vt(y);
          ((y.min = a[g].min), (y.max = y.min + S));
        })
      : Xw(l, i.layoutBox, a) &&
        tn((g) => {
          const y = u ? i.measuredBox[g] : i.layoutBox[g],
            S = vt(a[g]);
          ((y.max = y.min + S),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0),
              (e.relativeTarget[g].max = e.relativeTarget[g].min + S)));
        });
    const f = or();
    Rs(f, a, i.layoutBox);
    const h = or();
    u ? Rs(h, e.applyTransform(s, !0), i.measuredBox) : Rs(h, a, i.layoutBox);
    const m = !Fw(f);
    let p = !1;
    if (!e.resumeFrom) {
      const g = e.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: y, layout: S } = g;
        if (y && S) {
          const T = $e();
          Ds(T, i.layoutBox, y.layoutBox);
          const C = $e();
          (Ds(C, a, S.layoutBox),
            Gw(T, C) || (p = !0),
            g.options.layoutRoot &&
              ((e.relativeTarget = C),
              (e.relativeTargetOrigin = T),
              (e.relativeParent = g)));
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: a,
      snapshot: i,
      delta: h,
      layoutDelta: f,
      hasLayoutChanged: m,
      hasRelativeLayoutChanged: p,
    });
  } else if (e.isLead()) {
    const { onExitComplete: a } = e.options;
    a && a();
  }
  e.options.transition = void 0;
}
function f4(e) {
  e.parent &&
    (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
    e.isSharedProjectionDirty ||
      (e.isSharedProjectionDirty = !!(
        e.isProjectionDirty ||
        e.parent.isProjectionDirty ||
        e.parent.isSharedProjectionDirty
      )),
    e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function d4(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function h4(e) {
  e.clearSnapshot();
}
function Mb(e) {
  e.clearMeasurements();
}
function Ob(e) {
  e.isLayoutDirty = !1;
}
function m4(e) {
  const { visualElement: i } = e.options;
  (i && i.getProps().onBeforeLayoutMeasure && i.notify("BeforeLayoutMeasure"),
    e.resetTransform());
}
function Nb(e) {
  (e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0));
}
function p4(e) {
  e.resolveTargetDelta();
}
function g4(e) {
  e.calcProjection();
}
function y4(e) {
  e.resetSkewAndRotation();
}
function v4(e) {
  e.removeLeadSnapshot();
}
function jb(e, i, a) {
  ((e.translate = He(i.translate, 0, a)),
    (e.scale = He(i.scale, 1, a)),
    (e.origin = i.origin),
    (e.originPoint = i.originPoint));
}
function _b(e, i, a, s) {
  ((e.min = He(i.min, a.min, s)), (e.max = He(i.max, a.max, s)));
}
function b4(e, i, a, s) {
  (_b(e.x, i.x, a.x, s), _b(e.y, i.y, a.y, s));
}
function x4(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const S4 = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  Lb = (e) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(e),
  zb = Lb("applewebkit/") && !Lb("chrome/") ? Math.round : Rt;
function Pb(e) {
  ((e.min = zb(e.min)), (e.max = zb(e.max)));
}
function w4(e) {
  (Pb(e.x), Pb(e.y));
}
function Xw(e, i, a) {
  return (
    e === "position" || (e === "preserve-aspect" && !D_(Rb(i), Rb(a), 0.2))
  );
}
function E4(e) {
  return e !== e.root && e.scroll?.wasRoot;
}
const T4 = Iw({
    attachResizeListener: (e, i) => Us(e, "resize", i),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  bd = { current: void 0 },
  Kw = Iw({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!bd.current) {
        const e = new T4({});
        (e.mount(window), e.setOptions({ layoutScroll: !0 }), (bd.current = e));
      }
      return bd.current;
    },
    resetTransform: (e, i) => {
      e.style.transform = i !== void 0 ? i : "none";
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed",
  }),
  A4 = {
    pan: { Feature: F_ },
    drag: { Feature: q_, ProjectionNode: Kw, MeasureLayout: Uw },
  };
function Vb(e, i, a) {
  const { props: s } = e;
  e.animationState &&
    s.whileHover &&
    e.animationState.setActive("whileHover", a === "Start");
  const l = "onHover" + a,
    u = s[l];
  u && Pe.postRender(() => u(i, Zs(i)));
}
class C4 extends zi {
  mount() {
    const { current: i } = this.node;
    i &&
      (this.unmount = F3(
        i,
        (a, s) => (Vb(this.node, s, "Start"), (l) => Vb(this.node, l, "End")),
      ));
  }
  unmount() {}
}
class R4 extends zi {
  constructor() {
    (super(...arguments), (this.isActive = !1));
  }
  onFocus() {
    let i = !1;
    try {
      i = this.node.current.matches(":focus-visible");
    } catch {
      i = !0;
    }
    !i ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = Ks(
      Us(this.node.current, "focus", () => this.onFocus()),
      Us(this.node.current, "blur", () => this.onBlur()),
    );
  }
  unmount() {}
}
function kb(e, i, a) {
  const { props: s } = e;
  if (e.current instanceof HTMLButtonElement && e.current.disabled) return;
  e.animationState &&
    s.whileTap &&
    e.animationState.setActive("whileTap", a === "Start");
  const l = "onTap" + (a === "End" ? "" : a),
    u = s[l];
  u && Pe.postRender(() => u(i, Zs(i)));
}
class D4 extends zi {
  mount() {
    const { current: i } = this.node;
    i &&
      (this.unmount = X3(
        i,
        (a, s) => (
          kb(this.node, s, "Start"),
          (l, { success: u }) => kb(this.node, l, u ? "End" : "Cancel")
        ),
        { useGlobalTarget: this.node.props.globalTapTarget },
      ));
  }
  unmount() {}
}
const gh = new WeakMap(),
  xd = new WeakMap(),
  M4 = (e) => {
    const i = gh.get(e.target);
    i && i(e);
  },
  O4 = (e) => {
    e.forEach(M4);
  };
function N4({ root: e, ...i }) {
  const a = e || document;
  xd.has(a) || xd.set(a, {});
  const s = xd.get(a),
    l = JSON.stringify(i);
  return (
    s[l] || (s[l] = new IntersectionObserver(O4, { root: e, ...i })),
    s[l]
  );
}
function j4(e, i, a) {
  const s = N4(i);
  return (
    gh.set(e, a),
    s.observe(e),
    () => {
      (gh.delete(e), s.unobserve(e));
    }
  );
}
const _4 = { some: 0, all: 1 };
class L4 extends zi {
  constructor() {
    (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
  }
  startObserver() {
    this.unmount();
    const { viewport: i = {} } = this.node.getProps(),
      { root: a, margin: s, amount: l = "some", once: u } = i,
      f = {
        root: a ? a.current : void 0,
        rootMargin: s,
        threshold: typeof l == "number" ? l : _4[l],
      },
      h = (m) => {
        const { isIntersecting: p } = m;
        if (
          this.isInView === p ||
          ((this.isInView = p), u && !p && this.hasEnteredView)
        )
          return;
        (p && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive("whileInView", p));
        const { onViewportEnter: g, onViewportLeave: y } = this.node.getProps(),
          S = p ? g : y;
        S && S(m);
      };
    return j4(this.node.current, f, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: i, prevProps: a } = this.node;
    ["amount", "margin", "root"].some(z4(i, a)) && this.startObserver();
  }
  unmount() {}
}
function z4({ viewport: e = {} }, { viewport: i = {} } = {}) {
  return (a) => e[a] !== i[a];
}
const P4 = {
    inView: { Feature: L4 },
    tap: { Feature: D4 },
    focus: { Feature: R4 },
    hover: { Feature: C4 },
  },
  V4 = { layout: { ProjectionNode: Kw, MeasureLayout: Uw } },
  k4 = { ...w_, ...P4, ...A4, ...V4 },
  Q = k5(k4, Z5),
  B4 = 50,
  Bb = () => ({
    current: 0,
    offset: [],
    progress: 0,
    scrollLength: 0,
    targetOffset: 0,
    targetLength: 0,
    containerLength: 0,
    velocity: 0,
  }),
  U4 = () => ({ time: 0, x: Bb(), y: Bb() }),
  H4 = {
    x: { length: "Width", position: "Left" },
    y: { length: "Height", position: "Top" },
  };
function Ub(e, i, a, s) {
  const l = a[i],
    { length: u, position: f } = H4[i],
    h = l.current,
    m = a.time;
  ((l.current = e[`scroll${f}`]),
    (l.scrollLength = e[`scroll${u}`] - e[`client${u}`]),
    (l.offset.length = 0),
    (l.offset[0] = 0),
    (l.offset[1] = l.scrollLength),
    (l.progress = hr(0, l.scrollLength, l.current)));
  const p = s - m;
  l.velocity = p > B4 ? 0 : Jh(l.current - h, p);
}
function q4(e, i, a) {
  (Ub(e, "x", i, a), Ub(e, "y", i, a), (i.time = a));
}
function F4(e, i) {
  const a = { x: 0, y: 0 };
  let s = e;
  for (; s && s !== i; )
    if (nw(s))
      ((a.x += s.offsetLeft), (a.y += s.offsetTop), (s = s.offsetParent));
    else if (s.tagName === "svg") {
      const l = s.getBoundingClientRect();
      s = s.parentElement;
      const u = s.getBoundingClientRect();
      ((a.x += l.left - u.left), (a.y += l.top - u.top));
    } else if (s instanceof SVGGraphicsElement) {
      const { x: l, y: u } = s.getBBox();
      ((a.x += l), (a.y += u));
      let f = null,
        h = s.parentNode;
      for (; !f; ) (h.tagName === "svg" && (f = h), (h = s.parentNode));
      s = f;
    } else break;
  return a;
}
const yh = { start: 0, center: 0.5, end: 1 };
function Hb(e, i, a = 0) {
  let s = 0;
  if ((e in yh && (e = yh[e]), typeof e == "string")) {
    const l = parseFloat(e);
    e.endsWith("px")
      ? (s = l)
      : e.endsWith("%")
        ? (e = l / 100)
        : e.endsWith("vw")
          ? (s = (l / 100) * document.documentElement.clientWidth)
          : e.endsWith("vh")
            ? (s = (l / 100) * document.documentElement.clientHeight)
            : (e = l);
  }
  return (typeof e == "number" && (s = i * e), a + s);
}
const G4 = [0, 0];
function Y4(e, i, a, s) {
  let l = Array.isArray(e) ? e : G4,
    u = 0,
    f = 0;
  return (
    typeof e == "number"
      ? (l = [e, e])
      : typeof e == "string" &&
        ((e = e.trim()),
        e.includes(" ") ? (l = e.split(" ")) : (l = [e, yh[e] ? e : "0"])),
    (u = Hb(l[0], a, s)),
    (f = Hb(l[1], i)),
    u - f
  );
}
const I4 = {
    All: [
      [0, 0],
      [1, 1],
    ],
  },
  X4 = { x: 0, y: 0 };
function K4(e) {
  return "getBBox" in e && e.tagName !== "svg"
    ? e.getBBox()
    : { width: e.clientWidth, height: e.clientHeight };
}
function $4(e, i, a) {
  const { offset: s = I4.All } = a,
    { target: l = e, axis: u = "y" } = a,
    f = u === "y" ? "height" : "width",
    h = l !== e ? F4(l, e) : X4,
    m = l === e ? { width: e.scrollWidth, height: e.scrollHeight } : K4(l),
    p = { width: e.clientWidth, height: e.clientHeight };
  i[u].offset.length = 0;
  let g = !i[u].interpolate;
  const y = s.length;
  for (let S = 0; S < y; S++) {
    const T = Y4(s[S], p[f], m[f], h[u]);
    (!g && T !== i[u].interpolatorOffsets[S] && (g = !0), (i[u].offset[S] = T));
  }
  (g &&
    ((i[u].interpolate = kS(i[u].offset, BS(s), { clamp: !1 })),
    (i[u].interpolatorOffsets = [...i[u].offset])),
    (i[u].progress = Dn(0, 1, i[u].interpolate(i[u].current))));
}
function Q4(e, i = e, a) {
  if (((a.x.targetOffset = 0), (a.y.targetOffset = 0), i !== e)) {
    let s = i;
    for (; s && s !== e; )
      ((a.x.targetOffset += s.offsetLeft),
        (a.y.targetOffset += s.offsetTop),
        (s = s.offsetParent));
  }
  ((a.x.targetLength = i === e ? i.scrollWidth : i.clientWidth),
    (a.y.targetLength = i === e ? i.scrollHeight : i.clientHeight),
    (a.x.containerLength = e.clientWidth),
    (a.y.containerLength = e.clientHeight));
}
function Z4(e, i, a, s = {}) {
  return {
    measure: (l) => {
      (Q4(e, s.target, a), q4(e, a, l), (s.offset || s.target) && $4(e, a, s));
    },
    notify: () => i(a),
  };
}
const Ss = new WeakMap(),
  qb = new WeakMap(),
  Sd = new WeakMap(),
  Fb = (e) => (e === document.scrollingElement ? window : e);
function $w(e, { container: i = document.scrollingElement, ...a } = {}) {
  if (!i) return Rt;
  let s = Sd.get(i);
  s || ((s = new Set()), Sd.set(i, s));
  const l = U4(),
    u = Z4(i, e, l, a);
  if ((s.add(u), !Ss.has(i))) {
    const h = () => {
        for (const y of s) y.measure(st.timestamp);
        Pe.preUpdate(m);
      },
      m = () => {
        for (const y of s) y.notify();
      },
      p = () => Pe.read(h);
    Ss.set(i, p);
    const g = Fb(i);
    (window.addEventListener("resize", p, { passive: !0 }),
      i !== document.documentElement && qb.set(i, n5(i, p)),
      g.addEventListener("scroll", p, { passive: !0 }),
      p());
  }
  const f = Ss.get(i);
  return (
    Pe.read(f, !1, !0),
    () => {
      Mn(f);
      const h = Sd.get(i);
      if (!h || (h.delete(u), h.size)) return;
      const m = Ss.get(i);
      (Ss.delete(i),
        m &&
          (Fb(i).removeEventListener("scroll", m),
          qb.get(i)?.(),
          window.removeEventListener("resize", m)));
    }
  );
}
const Gb = new Map();
function W4(e) {
  const i = { value: 0 },
    a = $w((s) => {
      i.value = s[e.axis].progress * 100;
    }, e);
  return { currentTime: i, cancel: a };
}
function Qw({ source: e, container: i, ...a }) {
  const { axis: s } = a;
  e && (i = e);
  const l = Gb.get(i) ?? new Map();
  Gb.set(i, l);
  const u = a.target ?? "self",
    f = l.get(u) ?? {},
    h = s + (a.offset ?? []).join(",");
  return (
    f[h] ||
      (f[h] =
        !a.target && FS()
          ? new ScrollTimeline({ source: i, axis: s })
          : W4({ container: i, ...a })),
    f[h]
  );
}
function J4(e, i) {
  const a = Qw(i);
  return e.attachTimeline({
    timeline: i.target ? void 0 : a,
    observe: (s) => (
      s.pause(),
      ow((l) => {
        s.time = s.iterationDuration * l;
      }, a)
    ),
  });
}
function eL(e) {
  return e.length === 2;
}
function tL(e, i) {
  return eL(e)
    ? $w((a) => {
        e(a[i.axis].progress, a);
      }, i)
    : ow(e, Qw(i));
}
function nL(
  e,
  { axis: i = "y", container: a = document.scrollingElement, ...s } = {},
) {
  if (!a) return Rt;
  const l = { axis: i, container: a, ...s };
  return typeof e == "function" ? tL(e, l) : J4(e, l);
}
const iL = () => ({
    scrollX: En(0),
    scrollY: En(0),
    scrollXProgress: En(0),
    scrollYProgress: En(0),
  }),
  Rl = (e) => (e ? !e.current : !1);
function aL({ container: e, target: i, ...a } = {}) {
  const s = dS(iL),
    l = b.useRef(null),
    u = b.useRef(!1),
    f = b.useCallback(
      () => (
        (l.current = nL(
          (h, { x: m, y: p }) => {
            (s.scrollX.set(m.current),
              s.scrollXProgress.set(m.progress),
              s.scrollY.set(p.current),
              s.scrollYProgress.set(p.progress));
          },
          {
            ...a,
            container: e?.current || void 0,
            target: i?.current || void 0,
          },
        )),
        () => {
          l.current?.();
        }
      ),
      [e, i, JSON.stringify(a.offset)],
    );
  return (
    hS(() => {
      if (((u.current = !1), Rl(e) || Rl(i))) {
        u.current = !0;
        return;
      } else return f();
    }, [f]),
    b.useEffect(() => {
      if (u.current) return (zs(!Rl(e)), zs(!Rl(i)), f());
    }, [f]),
    s
  );
}
function Zw() {
  const e = [
      { name: "Portfolio", href: "#projects" },
      { name: "About", href: "#about" },
      { name: "Contact", href: "#contact" },
    ],
    [i, a] = b.useState(null);
  return x.jsxs(Q.nav, {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
    className:
      "sticky top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 bg-background/80 backdrop-blur-md border-b border-border/30",
    children: [
      x.jsx(Ah, {
        to: "/",
        children: x.jsx(Q.div, {
          className:
            "text-lg font-bold tracking-wider bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer",
          "data-testid": "link-home",
          whileHover: { scale: 1.05 },
          children: "AK",
        }),
      }),
      x.jsx("div", {
        className: "hidden md:flex gap-8",
        children: e.map((s) =>
          x.jsxs(
            Q.a,
            {
              href: s.href,
              onClick: (l) => {
                if (s.href.startsWith("#")) {
                  l.preventDefault();
                  const u = s.href.replace("#", ""),
                    f = document.getElementById(u);
                  f && f.scrollIntoView({ behavior: "smooth" });
                }
              },
              className:
                "text-sm text-muted-foreground hover:text-primary transition-colors relative group",
              "data-testid": `link-nav-${s.name.toLowerCase()}`,
              onMouseEnter: () => a(s.name),
              onMouseLeave: () => a(null),
              children: [
                s.name,
                x.jsx(Q.span, {
                  className: "absolute bottom-0 left-0 h-0.5 bg-primary",
                  initial: { width: 0 },
                  animate: { width: i === s.name ? "100%" : 0 },
                  transition: { duration: 0.3 },
                }),
              ],
            },
            s.name,
          ),
        ),
      }),
    ],
  });
}
const rL = "assets/professional_portrait_of_developer-B6TeUKlD.png";
function sL() {
  const [e, i] = b.useState(""),
    a = "Ashish Kumar";
  return (
    b.useEffect(() => {
      let s = 0;
      const l = setInterval(() => {
        s < a.length ? (i(a.slice(0, s + 1)), s++) : clearInterval(l);
      }, 100);
      return () => clearInterval(l);
    }, []),
    x.jsxs("span", {
      className: "relative",
      children: [
        e,
        e.length < a.length &&
          x.jsx("span", { className: "animate-pulse", children: "|" }),
      ],
    })
  );
}
const oL = [
  { name: "React.js", icon: jh, color: "text-blue-400" },
  { name: "Next.js", icon: p1, color: "text-gray-400" },
  { name: "Tailwind CSS", icon: UD, color: "text-cyan-400" },
  { name: "Material UI", icon: KD, color: "text-purple-400" },
  { name: "AWS", icon: _D, color: "text-orange-400" },
  { name: "Docker", icon: PD, color: "text-blue-500" },
];
function lL() {
  return x.jsx("div", {
    className: "grid grid-cols-3 gap-4",
    children: oL.map((e, i) => {
      const a = e.icon;
      return x.jsxs(
        Q.div,
        {
          className: "flex flex-col items-center gap-2",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.1 },
          children: [
            x.jsx(Q.div, {
              className: `p-3 rounded-lg bg-background/40 backdrop-blur-sm border border-white/10 ${e.color}`,
              whileHover: { scale: 1.1, rotate: 5 },
              whileTap: { scale: 0.95 },
              animate: { y: [0, -8, 0] },
              transition: {
                duration: 2,
                repeat: 1 / 0,
                delay: i * 0.15,
                ease: "easeInOut",
              },
              children: x.jsx(a, { className: "w-6 h-6" }),
            }),
            x.jsx("span", {
              className:
                "text-xs text-muted-foreground text-center font-medium",
              children: e.name.split(" ")[0],
            }),
          ],
        },
        e.name,
      );
    }),
  });
}
function uL() {
  return x.jsxs("div", {
    className: "absolute inset-0 overflow-hidden z-0",
    children: [
      x.jsx(Q.div, {
        className:
          "absolute w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl",
        animate: { x: [0, 100, -50, 0], y: [0, -50, 100, 0] },
        transition: { duration: 20, repeat: 1 / 0, ease: "easeInOut" },
        style: { top: "-50px", left: "-100px" },
      }),
      x.jsx(Q.div, {
        className:
          "absolute w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl",
        animate: { x: [0, -100, 50, 0], y: [0, 100, -50, 0] },
        transition: { duration: 25, repeat: 1 / 0, ease: "easeInOut" },
        style: { bottom: "-50px", right: "-100px" },
      }),
      x.jsx(Q.div, {
        className:
          "absolute w-72 h-72 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-full blur-3xl",
        animate: { x: [0, 50, -100, 0], y: [0, -100, 50, 0] },
        transition: { duration: 30, repeat: 1 / 0, ease: "easeInOut" },
        style: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
      }),
    ],
  });
}
function cL() {
  const [e, i] = b.useState("dark"),
    [a, s] = b.useState(!1);
  b.useEffect(() => {
    s(!0);
    const u = localStorage.getItem("theme") || "dark";
    (i(u), document.documentElement.classList.toggle("dark", u === "dark"));
  }, []);
  const l = () => {
    const u = e === "light" ? "dark" : "light";
    (i(u),
      localStorage.setItem("theme", u),
      document.documentElement.classList.toggle("dark", u === "dark"));
  };
  return a
    ? x.jsx(Q.button, {
        onClick: l,
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.95 },
        className:
          "p-3 rounded-lg bg-background/40 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-colors",
        "data-testid": "button-theme-toggle",
        "aria-label": "Toggle theme",
        children: x.jsx(
          Q.div,
          {
            initial: { rotate: 0, opacity: 0 },
            animate: { rotate: 360, opacity: 1 },
            transition: { duration: 0.5 },
            children:
              e === "light"
                ? x.jsx(ID, { className: "w-5 h-5 text-foreground" })
                : x.jsx(WD, { className: "w-5 h-5 text-yellow-400" }),
          },
          e,
        ),
      })
    : null;
}
function fL({
  children: e,
  onClick: i,
  className: a = "",
  href: s,
  variant: l = "primary",
}) {
  const u =
      l === "primary"
        ? "bg-gradient-to-r from-primary to-purple-500 text-white"
        : "border-2 border-primary text-primary hover:bg-primary/10",
    f = s ? "a" : "button";
  return x.jsx(Q.div, {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    className: "inline-block",
    children: x.jsxs(f, {
      href: s,
      onClick: i,
      className: `relative px-8 py-3 font-bold text-lg rounded-full overflow-hidden transition-all ${u} ${a}`,
      children: [
        x.jsx(Q.span, {
          className: "relative z-10 flex items-center gap-2",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          children: e,
        }),
        x.jsx(Q.div, {
          className:
            "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
          animate: { x: ["-100%", "100%"] },
          transition: { duration: 3, repeat: 1 / 0, repeatDelay: 2 },
        }),
      ],
    }),
  });
}
function dL() {
  const [e, i] = b.useState({ x: 0, y: 0 }),
    [a, s] = b.useState(!1);
  return (
    b.useEffect(() => {
      const l = (u) => {
        i({ x: u.clientX, y: u.clientY });
      };
      return (
        window.addEventListener("mousemove", l),
        () => window.removeEventListener("mousemove", l)
      );
    }, []),
    x.jsxs(x.Fragment, {
      children: [
        a &&
          x.jsx(Q.div, {
            className:
              "fixed w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full pointer-events-none mix-blend-screen z-50 shadow-lg",
            animate: { x: e.x - 16, y: e.y - 16 },
            transition: { type: "spring", stiffness: 500, damping: 28 },
          }),
        x.jsxs("section", {
          className:
            "relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden",
          children: [
            x.jsx(uL, {}),
            x.jsx("div", {
              className: "absolute top-8 right-8 z-40",
              children: x.jsx(cL, {}),
            }),
            x.jsx("div", {
              className: "container mx-auto max-w-6xl relative z-10",
              children: x.jsxs("div", {
                className: "grid md:grid-cols-2 gap-16 items-center",
                children: [
                  x.jsx(Q.div, {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.8 },
                    onMouseEnter: () => s(!0),
                    onMouseLeave: () => s(!1),
                    children: x.jsxs("div", {
                      className: "space-y-6",
                      children: [
                        x.jsxs("div", {
                          children: [
                            x.jsx(Q.div, {
                              initial: { opacity: 0, x: -20 },
                              animate: { opacity: 1, x: 0 },
                              transition: { delay: 0.2 },
                              children: x.jsx(Q.p, {
                                className:
                                  "text-xl text-primary font-bold tracking-wide mb-4 inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20",
                                animate: {
                                  boxShadow: [
                                    "0 0 10px rgba(59, 130, 246, 0.3)",
                                    "0 0 20px rgba(59, 130, 246, 0.6)",
                                    "0 0 10px rgba(59, 130, 246, 0.3)",
                                  ],
                                },
                                transition: { duration: 2, repeat: 1 / 0 },
                                children: "Front End Developer",
                              }),
                            }),
                            x.jsx(Q.div, {
                              initial: { opacity: 0, y: 20 },
                              animate: { opacity: 1, y: 0 },
                              transition: { delay: 0.4, duration: 0.8 },
                              children: x.jsx(Q.h1, {
                                className:
                                  "text-6xl md:text-8xl font-bold leading-tight text-foreground",
                                animate: {
                                  backgroundPosition: [
                                    "0% 50%",
                                    "100% 50%",
                                    "0% 50%",
                                  ],
                                },
                                transition: { duration: 8, repeat: 1 / 0 },
                                children: x.jsx(sL, {}),
                              }),
                            }),
                          ],
                        }),
                        x.jsx(Q.p, {
                          initial: { opacity: 0, y: 10 },
                          animate: { opacity: 1, y: 0 },
                          transition: { delay: 1 },
                          className:
                            "text-lg text-muted-foreground leading-relaxed max-w-md",
                          children:
                            "Building responsive, high-performance web applications with modern frameworks and best practices.",
                        }),
                        x.jsxs(Q.div, {
                          initial: { opacity: 0 },
                          animate: { opacity: 1 },
                          transition: { delay: 1 },
                          className: "pt-4 flex gap-6 flex-wrap",
                          children: [
                            x.jsx("a", {
                              href: "#projects",
                              onClick: (l) => {
                                l.preventDefault();
                                const u = document.getElementById("projects");
                                u && u.scrollIntoView({ behavior: "smooth" });
                              },
                              children: x.jsx(fL, {
                                variant: "primary",
                                children: "View Portfolio →",
                              }),
                            }),
                            x.jsx(Q.a, {
                              href: "#contact",
                              onClick: (l) => {
                                l.preventDefault();
                                const u = document.getElementById("contact");
                                u && u.scrollIntoView({ behavior: "smooth" });
                              },
                              whileHover: { scale: 1.05 },
                              whileTap: { scale: 0.95 },
                              className:
                                "text-muted-foreground hover:text-foreground transition-colors px-6 py-3 border border-border rounded-full cursor-pointer",
                              "data-testid": "link-contact-hero",
                              children: "Contact",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  x.jsxs(Q.div, {
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { duration: 0.8, delay: 0.2 },
                    className:
                      "hidden md:flex flex-col justify-center items-center gap-8",
                    onMouseEnter: () => s(!0),
                    onMouseLeave: () => s(!1),
                    children: [
                      x.jsx(Q.div, {
                        initial: { opacity: 0, y: -20 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 1 },
                        className: "w-full",
                        children: x.jsx(lL, {}),
                      }),
                      x.jsx(Q.div, {
                        className:
                          "w-full max-w-sm rounded-xl overflow-hidden relative",
                        whileHover: { scale: 1.02 },
                        transition: { duration: 0.3 },
                        children: x.jsxs("div", {
                          className: "relative",
                          children: [
                            x.jsx(Q.div, {
                              className:
                                "absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl",
                              animate: { opacity: [0.3, 0.6, 0.3] },
                              transition: {
                                duration: 3,
                                repeat: 1 / 0,
                                ease: "easeInOut",
                              },
                            }),
                            x.jsx(Q.div, {
                              className:
                                "absolute inset-0 rounded-xl border-2 border-gradient-to-r from-primary via-purple-400 to-cyan-400",
                              animate: {
                                boxShadow: [
                                  "0 0 20px rgba(59, 130, 246, 0.3)",
                                  "0 0 40px rgba(168, 85, 247, 0.5)",
                                  "0 0 20px rgba(59, 130, 246, 0.3)",
                                ],
                              },
                              transition: { duration: 3, repeat: 1 / 0 },
                            }),
                            x.jsx("img", {
                              src: rL,
                              alt: "Ashish Kumar",
                              className:
                                "w-full h-auto object-cover relative z-10 rounded-xl",
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    })
  );
}
function hL() {
  const { scrollYProgress: e } = aL();
  return x.jsx(Q.div, {
    className:
      "fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-400 to-cyan-400 origin-left z-50",
    style: { scaleX: e },
  });
}
function mL() {
  return x.jsxs("div", {
    className: "fixed inset-0 z-0 pointer-events-none overflow-hidden",
    children: [
      x.jsx(Q.div, {
        className:
          "absolute w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl",
        animate: { y: [0, 100, 0], x: [0, 50, 0], rotate: [0, 360] },
        transition: { duration: 15, repeat: 1 / 0, ease: "easeInOut" },
        style: { top: "10%", left: "5%" },
      }),
      x.jsx(Q.div, {
        className:
          "absolute w-48 h-48 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl",
        animate: { y: [0, -80, 0], x: [0, -60, 0], rotate: [0, -360] },
        transition: {
          duration: 20,
          repeat: 1 / 0,
          ease: "easeInOut",
          delay: 2,
        },
        style: { bottom: "15%", right: "8%" },
      }),
      x.jsx(Q.div, {
        className:
          "absolute w-40 h-40 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-2xl",
        animate: { y: [0, 60, 0], x: [0, 80, 0] },
        transition: {
          duration: 18,
          repeat: 1 / 0,
          ease: "easeInOut",
          delay: 4,
        },
        style: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
      }),
      x.jsx(Q.div, {
        className:
          "absolute w-72 h-72 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl",
        animate: { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] },
        transition: { duration: 12, repeat: 1 / 0, ease: "easeInOut" },
        style: { top: "25%", right: "20%" },
      }),
    ],
  });
}
const wd = [
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Material UI",
  "AWS",
  "Docker",
];
function pL() {
  return x.jsx("div", {
    className:
      "py-8 overflow-hidden bg-gradient-to-r from-background via-secondary/30 to-background",
    children: x.jsx(Q.div, {
      className: "flex gap-8 whitespace-nowrap",
      animate: { x: [0, -1e3] },
      transition: { duration: 20, repeat: 1 / 0, ease: "linear" },
      children: [...wd, ...wd, ...wd].map((e, i) =>
        x.jsx(
          Q.span,
          {
            className: "text-lg font-medium text-primary",
            whileHover: { scale: 1.1 },
            transition: { duration: 0.2 },
            children: e,
          },
          `${e}-${i}`,
        ),
      ),
    }),
  });
}
function Ms(e, i, { checkForDefaultPrevented: a = !0 } = {}) {
  return function (l) {
    if ((e?.(l), a === !1 || !l.defaultPrevented)) return i?.(l);
  };
}
var gL = bh[" useInsertionEffect ".trim().toString()] || rn;
function yL({ prop: e, defaultProp: i, onChange: a = () => {}, caller: s }) {
  const [l, u, f] = vL({ defaultProp: i, onChange: a }),
    h = e !== void 0,
    m = h ? e : l;
  {
    const g = b.useRef(e !== void 0);
    b.useEffect(() => {
      const y = g.current;
      (y !== h &&
        console.warn(
          `${s} is changing from ${y ? "controlled" : "uncontrolled"} to ${h ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (g.current = h));
    }, [h, s]);
  }
  const p = b.useCallback(
    (g) => {
      if (h) {
        const y = bL(g) ? g(e) : g;
        y !== e && f.current?.(y);
      } else u(g);
    },
    [h, e, u, f],
  );
  return [m, p];
}
function vL({ defaultProp: e, onChange: i }) {
  const [a, s] = b.useState(e),
    l = b.useRef(a),
    u = b.useRef(i);
  return (
    gL(() => {
      u.current = i;
    }, [i]),
    b.useEffect(() => {
      l.current !== a && (u.current?.(a), (l.current = a));
    }, [a, l]),
    [a, s, u]
  );
}
function bL(e) {
  return typeof e == "function";
}
var Ed = "focusScope.autoFocusOnMount",
  Td = "focusScope.autoFocusOnUnmount",
  Yb = { bubbles: !1, cancelable: !0 },
  xL = "FocusScope",
  Ww = b.forwardRef((e, i) => {
    const {
        loop: a = !1,
        trapped: s = !1,
        onMountAutoFocus: l,
        onUnmountAutoFocus: u,
        ...f
      } = e,
      [h, m] = b.useState(null),
      p = Dt(l),
      g = Dt(u),
      y = b.useRef(null),
      S = ot(i, (E) => m(E)),
      T = b.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (b.useEffect(() => {
      if (s) {
        let E = function (O) {
            if (T.paused || !h) return;
            const V = O.target;
            h.contains(V) ? (y.current = V) : Ni(y.current, { select: !0 });
          },
          A = function (O) {
            if (T.paused || !h) return;
            const V = O.relatedTarget;
            V !== null && (h.contains(V) || Ni(y.current, { select: !0 }));
          },
          R = function (O) {
            if (document.activeElement === document.body)
              for (const L of O) L.removedNodes.length > 0 && Ni(h);
          };
        (document.addEventListener("focusin", E),
          document.addEventListener("focusout", A));
        const M = new MutationObserver(R);
        return (
          h && M.observe(h, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener("focusin", E),
              document.removeEventListener("focusout", A),
              M.disconnect());
          }
        );
      }
    }, [s, h, T.paused]),
      b.useEffect(() => {
        if (h) {
          Xb.add(T);
          const E = document.activeElement;
          if (!h.contains(E)) {
            const R = new CustomEvent(Ed, Yb);
            (h.addEventListener(Ed, p),
              h.dispatchEvent(R),
              R.defaultPrevented ||
                (SL(CL(Jw(h)), { select: !0 }),
                document.activeElement === E && Ni(h)));
          }
          return () => {
            (h.removeEventListener(Ed, p),
              setTimeout(() => {
                const R = new CustomEvent(Td, Yb);
                (h.addEventListener(Td, g),
                  h.dispatchEvent(R),
                  R.defaultPrevented || Ni(E ?? document.body, { select: !0 }),
                  h.removeEventListener(Td, g),
                  Xb.remove(T));
              }, 0));
          };
        }
      }, [h, p, g, T]));
    const C = b.useCallback(
      (E) => {
        if ((!a && !s) || T.paused) return;
        const A = E.key === "Tab" && !E.altKey && !E.ctrlKey && !E.metaKey,
          R = document.activeElement;
        if (A && R) {
          const M = E.currentTarget,
            [O, V] = wL(M);
          O && V
            ? !E.shiftKey && R === V
              ? (E.preventDefault(), a && Ni(O, { select: !0 }))
              : E.shiftKey &&
                R === O &&
                (E.preventDefault(), a && Ni(V, { select: !0 }))
            : R === M && E.preventDefault();
        }
      },
      [a, s, T.paused],
    );
    return x.jsx(Mt.div, { tabIndex: -1, ...f, ref: S, onKeyDown: C });
  });
Ww.displayName = xL;
function SL(e, { select: i = !1 } = {}) {
  const a = document.activeElement;
  for (const s of e)
    if ((Ni(s, { select: i }), document.activeElement !== a)) return;
}
function wL(e) {
  const i = Jw(e),
    a = Ib(i, e),
    s = Ib(i.reverse(), e);
  return [a, s];
}
function Jw(e) {
  const i = [],
    a = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (s) => {
        const l = s.tagName === "INPUT" && s.type === "hidden";
        return s.disabled || s.hidden || l
          ? NodeFilter.FILTER_SKIP
          : s.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; a.nextNode(); ) i.push(a.currentNode);
  return i;
}
function Ib(e, i) {
  for (const a of e) if (!EL(a, { upTo: i })) return a;
}
function EL(e, { upTo: i }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (i !== void 0 && e === i) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function TL(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Ni(e, { select: i = !1 } = {}) {
  if (e && e.focus) {
    const a = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== a && TL(e) && i && e.select());
  }
}
var Xb = AL();
function AL() {
  let e = [];
  return {
    add(i) {
      const a = e[0];
      (i !== a && a?.pause(), (e = Kb(e, i)), e.unshift(i));
    },
    remove(i) {
      ((e = Kb(e, i)), e[0]?.resume());
    },
  };
}
function Kb(e, i) {
  const a = [...e],
    s = a.indexOf(i);
  return (s !== -1 && a.splice(s, 1), a);
}
function CL(e) {
  return e.filter((i) => i.tagName !== "A");
}
var Ad = 0;
function RL() {
  b.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement("afterbegin", e[0] ?? $b()),
      document.body.insertAdjacentElement("beforeend", e[1] ?? $b()),
      Ad++,
      () => {
        (Ad === 1 &&
          document
            .querySelectorAll("[data-radix-focus-guard]")
            .forEach((i) => i.remove()),
          Ad--);
      }
    );
  }, []);
}
function $b() {
  const e = document.createElement("span");
  return (
    e.setAttribute("data-radix-focus-guard", ""),
    (e.tabIndex = 0),
    (e.style.outline = "none"),
    (e.style.opacity = "0"),
    (e.style.position = "fixed"),
    (e.style.pointerEvents = "none"),
    e
  );
}
var Sn = function () {
  return (
    (Sn =
      Object.assign ||
      function (i) {
        for (var a, s = 1, l = arguments.length; s < l; s++) {
          a = arguments[s];
          for (var u in a)
            Object.prototype.hasOwnProperty.call(a, u) && (i[u] = a[u]);
        }
        return i;
      }),
    Sn.apply(this, arguments)
  );
};
function eE(e, i) {
  var a = {};
  for (var s in e)
    Object.prototype.hasOwnProperty.call(e, s) &&
      i.indexOf(s) < 0 &&
      (a[s] = e[s]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var l = 0, s = Object.getOwnPropertySymbols(e); l < s.length; l++)
      i.indexOf(s[l]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, s[l]) &&
        (a[s[l]] = e[s[l]]);
  return a;
}
function DL(e, i, a) {
  if (a || arguments.length === 2)
    for (var s = 0, l = i.length, u; s < l; s++)
      (u || !(s in i)) &&
        (u || (u = Array.prototype.slice.call(i, 0, s)), (u[s] = i[s]));
  return e.concat(u || Array.prototype.slice.call(i));
}
var Yl = "right-scroll-bar-position",
  Il = "width-before-scroll-bar",
  ML = "with-scroll-bars-hidden",
  OL = "--removed-body-scroll-bar-size";
function Cd(e, i) {
  return (typeof e == "function" ? e(i) : e && (e.current = i), e);
}
function NL(e, i) {
  var a = b.useState(function () {
    return {
      value: e,
      callback: i,
      facade: {
        get current() {
          return a.value;
        },
        set current(s) {
          var l = a.value;
          l !== s && ((a.value = s), a.callback(s, l));
        },
      },
    };
  })[0];
  return ((a.callback = i), a.facade);
}
var jL = typeof window < "u" ? b.useLayoutEffect : b.useEffect,
  Qb = new WeakMap();
function _L(e, i) {
  var a = NL(null, function (s) {
    return e.forEach(function (l) {
      return Cd(l, s);
    });
  });
  return (
    jL(
      function () {
        var s = Qb.get(a);
        if (s) {
          var l = new Set(s),
            u = new Set(e),
            f = a.current;
          (l.forEach(function (h) {
            u.has(h) || Cd(h, null);
          }),
            u.forEach(function (h) {
              l.has(h) || Cd(h, f);
            }));
        }
        Qb.set(a, e);
      },
      [e],
    ),
    a
  );
}
function LL(e) {
  return e;
}
function zL(e, i) {
  i === void 0 && (i = LL);
  var a = [],
    s = !1,
    l = {
      read: function () {
        if (s)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
          );
        return a.length ? a[a.length - 1] : e;
      },
      useMedium: function (u) {
        var f = i(u, s);
        return (
          a.push(f),
          function () {
            a = a.filter(function (h) {
              return h !== f;
            });
          }
        );
      },
      assignSyncMedium: function (u) {
        for (s = !0; a.length; ) {
          var f = a;
          ((a = []), f.forEach(u));
        }
        a = {
          push: function (h) {
            return u(h);
          },
          filter: function () {
            return a;
          },
        };
      },
      assignMedium: function (u) {
        s = !0;
        var f = [];
        if (a.length) {
          var h = a;
          ((a = []), h.forEach(u), (f = a));
        }
        var m = function () {
            var g = f;
            ((f = []), g.forEach(u));
          },
          p = function () {
            return Promise.resolve().then(m);
          };
        (p(),
          (a = {
            push: function (g) {
              (f.push(g), p());
            },
            filter: function (g) {
              return ((f = f.filter(g)), a);
            },
          }));
      },
    };
  return l;
}
function PL(e) {
  e === void 0 && (e = {});
  var i = zL(null);
  return ((i.options = Sn({ async: !0, ssr: !1 }, e)), i);
}
var tE = function (e) {
  var i = e.sideCar,
    a = eE(e, ["sideCar"]);
  if (!i)
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car",
    );
  var s = i.read();
  if (!s) throw new Error("Sidecar medium not found");
  return b.createElement(s, Sn({}, a));
};
tE.isSideCarExport = !0;
function VL(e, i) {
  return (e.useMedium(i), tE);
}
var nE = PL(),
  Rd = function () {},
  Su = b.forwardRef(function (e, i) {
    var a = b.useRef(null),
      s = b.useState({
        onScrollCapture: Rd,
        onWheelCapture: Rd,
        onTouchMoveCapture: Rd,
      }),
      l = s[0],
      u = s[1],
      f = e.forwardProps,
      h = e.children,
      m = e.className,
      p = e.removeScrollBar,
      g = e.enabled,
      y = e.shards,
      S = e.sideCar,
      T = e.noIsolation,
      C = e.inert,
      E = e.allowPinchZoom,
      A = e.as,
      R = A === void 0 ? "div" : A,
      M = e.gapMode,
      O = eE(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      V = S,
      L = _L([a, i]),
      $ = Sn(Sn({}, O), l);
    return b.createElement(
      b.Fragment,
      null,
      g &&
        b.createElement(V, {
          sideCar: nE,
          removeScrollBar: p,
          shards: y,
          noIsolation: T,
          inert: C,
          setCallbacks: u,
          allowPinchZoom: !!E,
          lockRef: a,
          gapMode: M,
        }),
      f
        ? b.cloneElement(b.Children.only(h), Sn(Sn({}, $), { ref: L }))
        : b.createElement(R, Sn({}, $, { className: m, ref: L }), h),
    );
  });
Su.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
Su.classNames = { fullWidth: Il, zeroRight: Yl };
var kL = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function BL() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var i = kL();
  return (i && e.setAttribute("nonce", i), e);
}
function UL(e, i) {
  e.styleSheet
    ? (e.styleSheet.cssText = i)
    : e.appendChild(document.createTextNode(i));
}
function HL(e) {
  var i = document.head || document.getElementsByTagName("head")[0];
  i.appendChild(e);
}
var qL = function () {
    var e = 0,
      i = null;
    return {
      add: function (a) {
        (e == 0 && (i = BL()) && (UL(i, a), HL(i)), e++);
      },
      remove: function () {
        (e--,
          !e && i && (i.parentNode && i.parentNode.removeChild(i), (i = null)));
      },
    };
  },
  FL = function () {
    var e = qL();
    return function (i, a) {
      b.useEffect(
        function () {
          return (
            e.add(i),
            function () {
              e.remove();
            }
          );
        },
        [i && a],
      );
    };
  },
  iE = function () {
    var e = FL(),
      i = function (a) {
        var s = a.styles,
          l = a.dynamic;
        return (e(s, l), null);
      };
    return i;
  },
  GL = { left: 0, top: 0, right: 0, gap: 0 },
  Dd = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  YL = function (e) {
    var i = window.getComputedStyle(document.body),
      a = i[e === "padding" ? "paddingLeft" : "marginLeft"],
      s = i[e === "padding" ? "paddingTop" : "marginTop"],
      l = i[e === "padding" ? "paddingRight" : "marginRight"];
    return [Dd(a), Dd(s), Dd(l)];
  },
  IL = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return GL;
    var i = YL(e),
      a = document.documentElement.clientWidth,
      s = window.innerWidth;
    return {
      left: i[0],
      top: i[1],
      right: i[2],
      gap: Math.max(0, s - a + i[2] - i[0]),
    };
  },
  XL = iE(),
  cr = "data-scroll-locked",
  KL = function (e, i, a, s) {
    var l = e.left,
      u = e.top,
      f = e.right,
      h = e.gap;
    return (
      a === void 0 && (a = "margin"),
      `
  .`
        .concat(
          ML,
          ` {
   overflow: hidden `,
        )
        .concat(
          s,
          `;
   padding-right: `,
        )
        .concat(h, "px ")
        .concat(
          s,
          `;
  }
  body[`,
        )
        .concat(
          cr,
          `] {
    overflow: hidden `,
        )
        .concat(
          s,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            i && "position: relative ".concat(s, ";"),
            a === "margin" &&
              `
    padding-left: `
                .concat(
                  l,
                  `px;
    padding-top: `,
                )
                .concat(
                  u,
                  `px;
    padding-right: `,
                )
                .concat(
                  f,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(h, "px ")
                .concat(
                  s,
                  `;
    `,
                ),
            a === "padding" &&
              "padding-right: ".concat(h, "px ").concat(s, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`,
        )
        .concat(
          Yl,
          ` {
    right: `,
        )
        .concat(h, "px ")
        .concat(
          s,
          `;
  }
  
  .`,
        )
        .concat(
          Il,
          ` {
    margin-right: `,
        )
        .concat(h, "px ")
        .concat(
          s,
          `;
  }
  
  .`,
        )
        .concat(Yl, " .")
        .concat(
          Yl,
          ` {
    right: 0 `,
        )
        .concat(
          s,
          `;
  }
  
  .`,
        )
        .concat(Il, " .")
        .concat(
          Il,
          ` {
    margin-right: 0 `,
        )
        .concat(
          s,
          `;
  }
  
  body[`,
        )
        .concat(
          cr,
          `] {
    `,
        )
        .concat(OL, ": ")
        .concat(
          h,
          `px;
  }
`,
        )
    );
  },
  Zb = function () {
    var e = parseInt(document.body.getAttribute(cr) || "0", 10);
    return isFinite(e) ? e : 0;
  },
  $L = function () {
    b.useEffect(function () {
      return (
        document.body.setAttribute(cr, (Zb() + 1).toString()),
        function () {
          var e = Zb() - 1;
          e <= 0
            ? document.body.removeAttribute(cr)
            : document.body.setAttribute(cr, e.toString());
        }
      );
    }, []);
  },
  QL = function (e) {
    var i = e.noRelative,
      a = e.noImportant,
      s = e.gapMode,
      l = s === void 0 ? "margin" : s;
    $L();
    var u = b.useMemo(
      function () {
        return IL(l);
      },
      [l],
    );
    return b.createElement(XL, { styles: KL(u, !i, l, a ? "" : "!important") });
  },
  vh = !1;
if (typeof window < "u")
  try {
    var Dl = Object.defineProperty({}, "passive", {
      get: function () {
        return ((vh = !0), !0);
      },
    });
    (window.addEventListener("test", Dl, Dl),
      window.removeEventListener("test", Dl, Dl));
  } catch {
    vh = !1;
  }
var Ja = vh ? { passive: !1 } : !1,
  ZL = function (e) {
    return e.tagName === "TEXTAREA";
  },
  aE = function (e, i) {
    if (!(e instanceof Element)) return !1;
    var a = window.getComputedStyle(e);
    return (
      a[i] !== "hidden" &&
      !(a.overflowY === a.overflowX && !ZL(e) && a[i] === "visible")
    );
  },
  WL = function (e) {
    return aE(e, "overflowY");
  },
  JL = function (e) {
    return aE(e, "overflowX");
  },
  Wb = function (e, i) {
    var a = i.ownerDocument,
      s = i;
    do {
      typeof ShadowRoot < "u" && s instanceof ShadowRoot && (s = s.host);
      var l = rE(e, s);
      if (l) {
        var u = sE(e, s),
          f = u[1],
          h = u[2];
        if (f > h) return !0;
      }
      s = s.parentNode;
    } while (s && s !== a.body);
    return !1;
  },
  ez = function (e) {
    var i = e.scrollTop,
      a = e.scrollHeight,
      s = e.clientHeight;
    return [i, a, s];
  },
  tz = function (e) {
    var i = e.scrollLeft,
      a = e.scrollWidth,
      s = e.clientWidth;
    return [i, a, s];
  },
  rE = function (e, i) {
    return e === "v" ? WL(i) : JL(i);
  },
  sE = function (e, i) {
    return e === "v" ? ez(i) : tz(i);
  },
  nz = function (e, i) {
    return e === "h" && i === "rtl" ? -1 : 1;
  },
  iz = function (e, i, a, s, l) {
    var u = nz(e, window.getComputedStyle(i).direction),
      f = u * s,
      h = a.target,
      m = i.contains(h),
      p = !1,
      g = f > 0,
      y = 0,
      S = 0;
    do {
      var T = sE(e, h),
        C = T[0],
        E = T[1],
        A = T[2],
        R = E - A - u * C;
      ((C || R) && rE(e, h) && ((y += R), (S += C)),
        h instanceof ShadowRoot ? (h = h.host) : (h = h.parentNode));
    } while ((!m && h !== document.body) || (m && (i.contains(h) || i === h)));
    return (((g && Math.abs(y) < 1) || (!g && Math.abs(S) < 1)) && (p = !0), p);
  },
  Ml = function (e) {
    return "changedTouches" in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  Jb = function (e) {
    return [e.deltaX, e.deltaY];
  },
  ex = function (e) {
    return e && "current" in e ? e.current : e;
  },
  az = function (e, i) {
    return e[0] === i[0] && e[1] === i[1];
  },
  rz = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        e,
        ` {pointer-events: all;}
`,
      );
  },
  sz = 0,
  er = [];
function oz(e) {
  var i = b.useRef([]),
    a = b.useRef([0, 0]),
    s = b.useRef(),
    l = b.useState(sz++)[0],
    u = b.useState(iE)[0],
    f = b.useRef(e);
  (b.useEffect(
    function () {
      f.current = e;
    },
    [e],
  ),
    b.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(l));
          var E = DL([e.lockRef.current], (e.shards || []).map(ex), !0).filter(
            Boolean,
          );
          return (
            E.forEach(function (A) {
              return A.classList.add("allow-interactivity-".concat(l));
            }),
            function () {
              (document.body.classList.remove("block-interactivity-".concat(l)),
                E.forEach(function (A) {
                  return A.classList.remove("allow-interactivity-".concat(l));
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var h = b.useCallback(function (E, A) {
      if (
        ("touches" in E && E.touches.length === 2) ||
        (E.type === "wheel" && E.ctrlKey)
      )
        return !f.current.allowPinchZoom;
      var R = Ml(E),
        M = a.current,
        O = "deltaX" in E ? E.deltaX : M[0] - R[0],
        V = "deltaY" in E ? E.deltaY : M[1] - R[1],
        L,
        $ = E.target,
        H = Math.abs(O) > Math.abs(V) ? "h" : "v";
      if ("touches" in E && H === "h" && $.type === "range") return !1;
      var F = Wb(H, $);
      if (!F) return !0;
      if ((F ? (L = H) : ((L = H === "v" ? "h" : "v"), (F = Wb(H, $))), !F))
        return !1;
      if (
        (!s.current && "changedTouches" in E && (O || V) && (s.current = L), !L)
      )
        return !0;
      var J = s.current || L;
      return iz(J, A, E, J === "h" ? O : V);
    }, []),
    m = b.useCallback(function (E) {
      var A = E;
      if (!(!er.length || er[er.length - 1] !== u)) {
        var R = "deltaY" in A ? Jb(A) : Ml(A),
          M = i.current.filter(function (L) {
            return (
              L.name === A.type &&
              (L.target === A.target || A.target === L.shadowParent) &&
              az(L.delta, R)
            );
          })[0];
        if (M && M.should) {
          A.cancelable && A.preventDefault();
          return;
        }
        if (!M) {
          var O = (f.current.shards || [])
              .map(ex)
              .filter(Boolean)
              .filter(function (L) {
                return L.contains(A.target);
              }),
            V = O.length > 0 ? h(A, O[0]) : !f.current.noIsolation;
          V && A.cancelable && A.preventDefault();
        }
      }
    }, []),
    p = b.useCallback(function (E, A, R, M) {
      var O = { name: E, delta: A, target: R, should: M, shadowParent: lz(R) };
      (i.current.push(O),
        setTimeout(function () {
          i.current = i.current.filter(function (V) {
            return V !== O;
          });
        }, 1));
    }, []),
    g = b.useCallback(function (E) {
      ((a.current = Ml(E)), (s.current = void 0));
    }, []),
    y = b.useCallback(function (E) {
      p(E.type, Jb(E), E.target, h(E, e.lockRef.current));
    }, []),
    S = b.useCallback(function (E) {
      p(E.type, Ml(E), E.target, h(E, e.lockRef.current));
    }, []);
  b.useEffect(function () {
    return (
      er.push(u),
      e.setCallbacks({
        onScrollCapture: y,
        onWheelCapture: y,
        onTouchMoveCapture: S,
      }),
      document.addEventListener("wheel", m, Ja),
      document.addEventListener("touchmove", m, Ja),
      document.addEventListener("touchstart", g, Ja),
      function () {
        ((er = er.filter(function (E) {
          return E !== u;
        })),
          document.removeEventListener("wheel", m, Ja),
          document.removeEventListener("touchmove", m, Ja),
          document.removeEventListener("touchstart", g, Ja));
      }
    );
  }, []);
  var T = e.removeScrollBar,
    C = e.inert;
  return b.createElement(
    b.Fragment,
    null,
    C ? b.createElement(u, { styles: rz(l) }) : null,
    T ? b.createElement(QL, { gapMode: e.gapMode }) : null,
  );
}
function lz(e) {
  for (var i = null; e !== null; )
    (e instanceof ShadowRoot && ((i = e.host), (e = e.host)),
      (e = e.parentNode));
  return i;
}
const uz = VL(nE, oz);
var oE = b.forwardRef(function (e, i) {
  return b.createElement(Su, Sn({}, e, { ref: i, sideCar: uz }));
});
oE.classNames = Su.classNames;
var cz = function (e) {
    if (typeof document > "u") return null;
    var i = Array.isArray(e) ? e[0] : e;
    return i.ownerDocument.body;
  },
  tr = new WeakMap(),
  Ol = new WeakMap(),
  Nl = {},
  Md = 0,
  lE = function (e) {
    return e && (e.host || lE(e.parentNode));
  },
  fz = function (e, i) {
    return i
      .map(function (a) {
        if (e.contains(a)) return a;
        var s = lE(a);
        return s && e.contains(s)
          ? s
          : (console.error(
              "aria-hidden",
              a,
              "in not contained inside",
              e,
              ". Doing nothing",
            ),
            null);
      })
      .filter(function (a) {
        return !!a;
      });
  },
  dz = function (e, i, a, s) {
    var l = fz(i, Array.isArray(e) ? e : [e]);
    Nl[a] || (Nl[a] = new WeakMap());
    var u = Nl[a],
      f = [],
      h = new Set(),
      m = new Set(l),
      p = function (y) {
        !y || h.has(y) || (h.add(y), p(y.parentNode));
      };
    l.forEach(p);
    var g = function (y) {
      !y ||
        m.has(y) ||
        Array.prototype.forEach.call(y.children, function (S) {
          if (h.has(S)) g(S);
          else
            try {
              var T = S.getAttribute(s),
                C = T !== null && T !== "false",
                E = (tr.get(S) || 0) + 1,
                A = (u.get(S) || 0) + 1;
              (tr.set(S, E),
                u.set(S, A),
                f.push(S),
                E === 1 && C && Ol.set(S, !0),
                A === 1 && S.setAttribute(a, "true"),
                C || S.setAttribute(s, "true"));
            } catch (R) {
              console.error("aria-hidden: cannot operate on ", S, R);
            }
        });
    };
    return (
      g(i),
      h.clear(),
      Md++,
      function () {
        (f.forEach(function (y) {
          var S = tr.get(y) - 1,
            T = u.get(y) - 1;
          (tr.set(y, S),
            u.set(y, T),
            S || (Ol.has(y) || y.removeAttribute(s), Ol.delete(y)),
            T || y.removeAttribute(a));
        }),
          Md--,
          Md ||
            ((tr = new WeakMap()),
            (tr = new WeakMap()),
            (Ol = new WeakMap()),
            (Nl = {})));
      }
    );
  },
  hz = function (e, i, a) {
    a === void 0 && (a = "data-aria-hidden");
    var s = Array.from(Array.isArray(e) ? e : [e]),
      l = cz(e);
    return l
      ? (s.push.apply(s, Array.from(l.querySelectorAll("[aria-live]"))),
        dz(s, l, a, "aria-hidden"))
      : function () {
          return null;
        };
  };
function mz(e) {
  const i = pz(e),
    a = b.forwardRef((s, l) => {
      const { children: u, ...f } = s,
        h = b.Children.toArray(u),
        m = h.find(yz);
      if (m) {
        const p = m.props.children,
          g = h.map((y) =>
            y === m
              ? b.Children.count(p) > 1
                ? b.Children.only(null)
                : b.isValidElement(p)
                  ? p.props.children
                  : null
              : y,
          );
        return x.jsx(i, {
          ...f,
          ref: l,
          children: b.isValidElement(p) ? b.cloneElement(p, void 0, g) : null,
        });
      }
      return x.jsx(i, { ...f, ref: l, children: u });
    });
  return ((a.displayName = `${e}.Slot`), a);
}
function pz(e) {
  const i = b.forwardRef((a, s) => {
    const { children: l, ...u } = a;
    if (b.isValidElement(l)) {
      const f = bz(l),
        h = vz(u, l.props);
      return (
        l.type !== b.Fragment && (h.ref = s ? cu(s, f) : f),
        b.cloneElement(l, h)
      );
    }
    return b.Children.count(l) > 1 ? b.Children.only(null) : null;
  });
  return ((i.displayName = `${e}.SlotClone`), i);
}
var gz = Symbol("radix.slottable");
function yz(e) {
  return (
    b.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === gz
  );
}
function vz(e, i) {
  const a = { ...i };
  for (const s in i) {
    const l = e[s],
      u = i[s];
    /^on[A-Z]/.test(s)
      ? l && u
        ? (a[s] = (...h) => {
            const m = u(...h);
            return (l(...h), m);
          })
        : l && (a[s] = l)
      : s === "style"
        ? (a[s] = { ...l, ...u })
        : s === "className" && (a[s] = [l, u].filter(Boolean).join(" "));
  }
  return { ...e, ...a };
}
function bz(e) {
  let i = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    a = i && "isReactWarning" in i && i.isReactWarning;
  return a
    ? e.ref
    : ((i = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (a = i && "isReactWarning" in i && i.isReactWarning),
      a ? e.props.ref : e.props.ref || e.ref);
}
var wu = "Dialog",
  [uE] = Ys(wu),
  [xz, mn] = uE(wu),
  cE = (e) => {
    const {
        __scopeDialog: i,
        children: a,
        open: s,
        defaultOpen: l,
        onOpenChange: u,
        modal: f = !0,
      } = e,
      h = b.useRef(null),
      m = b.useRef(null),
      [p, g] = yL({ prop: s, defaultProp: l ?? !1, onChange: u, caller: wu });
    return x.jsx(xz, {
      scope: i,
      triggerRef: h,
      contentRef: m,
      contentId: id(),
      titleId: id(),
      descriptionId: id(),
      open: p,
      onOpenChange: g,
      onOpenToggle: b.useCallback(() => g((y) => !y), [g]),
      modal: f,
      children: a,
    });
  };
cE.displayName = wu;
var fE = "DialogTrigger",
  dE = b.forwardRef((e, i) => {
    const { __scopeDialog: a, ...s } = e,
      l = mn(fE, a),
      u = ot(i, l.triggerRef);
    return x.jsx(Mt.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": l.open,
      "aria-controls": l.contentId,
      "data-state": Dm(l.open),
      ...s,
      ref: u,
      onClick: Ms(e.onClick, l.onOpenToggle),
    });
  });
dE.displayName = fE;
var Cm = "DialogPortal",
  [Sz, hE] = uE(Cm, { forceMount: void 0 }),
  mE = (e) => {
    const { __scopeDialog: i, forceMount: a, children: s, container: l } = e,
      u = mn(Cm, i);
    return x.jsx(Sz, {
      scope: i,
      forceMount: a,
      children: b.Children.map(s, (f) =>
        x.jsx(xr, {
          present: a || u.open,
          children: x.jsx(qh, { asChild: !0, container: l, children: f }),
        }),
      ),
    });
  };
mE.displayName = Cm;
var au = "DialogOverlay",
  pE = b.forwardRef((e, i) => {
    const a = hE(au, e.__scopeDialog),
      { forceMount: s = a.forceMount, ...l } = e,
      u = mn(au, e.__scopeDialog);
    return u.modal
      ? x.jsx(xr, {
          present: s || u.open,
          children: x.jsx(Ez, { ...l, ref: i }),
        })
      : null;
  });
pE.displayName = au;
var wz = mz("DialogOverlay.RemoveScroll"),
  Ez = b.forwardRef((e, i) => {
    const { __scopeDialog: a, ...s } = e,
      l = mn(au, a);
    return x.jsx(oE, {
      as: wz,
      allowPinchZoom: !0,
      shards: [l.contentRef],
      children: x.jsx(Mt.div, {
        "data-state": Dm(l.open),
        ...s,
        ref: i,
        style: { pointerEvents: "auto", ...s.style },
      }),
    });
  }),
  ca = "DialogContent",
  gE = b.forwardRef((e, i) => {
    const a = hE(ca, e.__scopeDialog),
      { forceMount: s = a.forceMount, ...l } = e,
      u = mn(ca, e.__scopeDialog);
    return x.jsx(xr, {
      present: s || u.open,
      children: u.modal
        ? x.jsx(Tz, { ...l, ref: i })
        : x.jsx(Az, { ...l, ref: i }),
    });
  });
gE.displayName = ca;
var Tz = b.forwardRef((e, i) => {
    const a = mn(ca, e.__scopeDialog),
      s = b.useRef(null),
      l = ot(i, a.contentRef, s);
    return (
      b.useEffect(() => {
        const u = s.current;
        if (u) return hz(u);
      }, []),
      x.jsx(yE, {
        ...e,
        ref: l,
        trapFocus: a.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: Ms(e.onCloseAutoFocus, (u) => {
          (u.preventDefault(), a.triggerRef.current?.focus());
        }),
        onPointerDownOutside: Ms(e.onPointerDownOutside, (u) => {
          const f = u.detail.originalEvent,
            h = f.button === 0 && f.ctrlKey === !0;
          (f.button === 2 || h) && u.preventDefault();
        }),
        onFocusOutside: Ms(e.onFocusOutside, (u) => u.preventDefault()),
      })
    );
  }),
  Az = b.forwardRef((e, i) => {
    const a = mn(ca, e.__scopeDialog),
      s = b.useRef(!1),
      l = b.useRef(!1);
    return x.jsx(yE, {
      ...e,
      ref: i,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (u) => {
        (e.onCloseAutoFocus?.(u),
          u.defaultPrevented ||
            (s.current || a.triggerRef.current?.focus(), u.preventDefault()),
          (s.current = !1),
          (l.current = !1));
      },
      onInteractOutside: (u) => {
        (e.onInteractOutside?.(u),
          u.defaultPrevented ||
            ((s.current = !0),
            u.detail.originalEvent.type === "pointerdown" && (l.current = !0)));
        const f = u.target;
        (a.triggerRef.current?.contains(f) && u.preventDefault(),
          u.detail.originalEvent.type === "focusin" &&
            l.current &&
            u.preventDefault());
      },
    });
  }),
  yE = b.forwardRef((e, i) => {
    const {
        __scopeDialog: a,
        trapFocus: s,
        onOpenAutoFocus: l,
        onCloseAutoFocus: u,
        ...f
      } = e,
      h = mn(ca, a),
      m = b.useRef(null),
      p = ot(i, m);
    return (
      RL(),
      x.jsxs(x.Fragment, {
        children: [
          x.jsx(Ww, {
            asChild: !0,
            loop: !0,
            trapped: s,
            onMountAutoFocus: l,
            onUnmountAutoFocus: u,
            children: x.jsx(Lh, {
              role: "dialog",
              id: h.contentId,
              "aria-describedby": h.descriptionId,
              "aria-labelledby": h.titleId,
              "data-state": Dm(h.open),
              ...f,
              ref: p,
              onDismiss: () => h.onOpenChange(!1),
            }),
          }),
          x.jsxs(x.Fragment, {
            children: [
              x.jsx(Cz, { titleId: h.titleId }),
              x.jsx(Dz, { contentRef: m, descriptionId: h.descriptionId }),
            ],
          }),
        ],
      })
    );
  }),
  Rm = "DialogTitle",
  vE = b.forwardRef((e, i) => {
    const { __scopeDialog: a, ...s } = e,
      l = mn(Rm, a);
    return x.jsx(Mt.h2, { id: l.titleId, ...s, ref: i });
  });
vE.displayName = Rm;
var bE = "DialogDescription",
  xE = b.forwardRef((e, i) => {
    const { __scopeDialog: a, ...s } = e,
      l = mn(bE, a);
    return x.jsx(Mt.p, { id: l.descriptionId, ...s, ref: i });
  });
xE.displayName = bE;
var SE = "DialogClose",
  wE = b.forwardRef((e, i) => {
    const { __scopeDialog: a, ...s } = e,
      l = mn(SE, a);
    return x.jsx(Mt.button, {
      type: "button",
      ...s,
      ref: i,
      onClick: Ms(e.onClick, () => l.onOpenChange(!1)),
    });
  });
wE.displayName = SE;
function Dm(e) {
  return e ? "open" : "closed";
}
var EE = "DialogTitleWarning",
  [O6, TE] = DR(EE, { contentName: ca, titleName: Rm, docsSlug: "dialog" }),
  Cz = ({ titleId: e }) => {
    const i = TE(EE),
      a = `\`${i.contentName}\` requires a \`${i.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${i.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${i.docsSlug}`;
    return (
      b.useEffect(() => {
        e && (document.getElementById(e) || console.error(a));
      }, [a, e]),
      null
    );
  },
  Rz = "DialogDescriptionWarning",
  Dz = ({ contentRef: e, descriptionId: i }) => {
    const s = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${TE(Rz).contentName}}.`;
    return (
      b.useEffect(() => {
        const l = e.current?.getAttribute("aria-describedby");
        i && l && (document.getElementById(i) || console.warn(s));
      }, [s, e, i]),
      null
    );
  },
  Mz = cE,
  Oz = dE,
  Nz = mE,
  AE = pE,
  CE = gE,
  RE = vE,
  DE = xE,
  jz = wE;
const _z = Mz,
  Lz = Oz,
  zz = Nz,
  ME = b.forwardRef(({ className: e, ...i }, a) =>
    x.jsx(AE, {
      ref: a,
      className: ht(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        e,
      ),
      ...i,
    }),
  );
ME.displayName = AE.displayName;
const OE = b.forwardRef(({ className: e, children: i, ...a }, s) =>
  x.jsxs(zz, {
    children: [
      x.jsx(ME, {}),
      x.jsxs(CE, {
        ref: s,
        className: ht(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          e,
        ),
        ...a,
        children: [
          i,
          x.jsxs(jz, {
            className:
              "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
            children: [
              x.jsx(m1, { className: "h-4 w-4" }),
              x.jsx("span", { className: "sr-only", children: "Close" }),
            ],
          }),
        ],
      }),
    ],
  }),
);
OE.displayName = CE.displayName;
const NE = b.forwardRef(({ className: e, ...i }, a) =>
  x.jsx(RE, {
    ref: a,
    className: ht("text-lg font-semibold leading-none tracking-tight", e),
    ...i,
  }),
);
NE.displayName = RE.displayName;
const jE = b.forwardRef(({ className: e, ...i }, a) =>
  x.jsx(DE, {
    ref: a,
    className: ht("text-sm text-muted-foreground", e),
    ...i,
  }),
);
jE.displayName = DE.displayName;
function Pz(e, i) {
  if (e instanceof RegExp) return { keys: !1, pattern: e };
  var a,
    s,
    l,
    u,
    f = [],
    h = "",
    m = e.split("/");
  for (m[0] || m.shift(); (l = m.shift()); )
    ((a = l[0]),
      a === "*"
        ? (f.push(a), (h += l[1] === "?" ? "(?:/(.*))?" : "/(.*)"))
        : a === ":"
          ? ((s = l.indexOf("?", 1)),
            (u = l.indexOf(".", 1)),
            f.push(l.substring(1, ~s ? s : ~u ? u : l.length)),
            (h += ~s && !~u ? "(?:/([^/]+?))?" : "/([^/]+?)"),
            ~u && (h += (~s ? "?" : "") + "\\" + l.substring(u)))
          : (h += "/" + l));
  return {
    keys: f,
    pattern: new RegExp("^" + h + (i ? "(?=$|/)" : "/?$"), "i"),
  };
}
var Od = { exports: {} },
  Nd = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var tx;
function Vz() {
  if (tx) return Nd;
  tx = 1;
  var e = ru();
  function i(y, S) {
    return (y === S && (y !== 0 || 1 / y === 1 / S)) || (y !== y && S !== S);
  }
  var a = typeof Object.is == "function" ? Object.is : i,
    s = e.useState,
    l = e.useEffect,
    u = e.useLayoutEffect,
    f = e.useDebugValue;
  function h(y, S) {
    var T = S(),
      C = s({ inst: { value: T, getSnapshot: S } }),
      E = C[0].inst,
      A = C[1];
    return (
      u(
        function () {
          ((E.value = T), (E.getSnapshot = S), m(E) && A({ inst: E }));
        },
        [y, T, S],
      ),
      l(
        function () {
          return (
            m(E) && A({ inst: E }),
            y(function () {
              m(E) && A({ inst: E });
            })
          );
        },
        [y],
      ),
      f(T),
      T
    );
  }
  function m(y) {
    var S = y.getSnapshot;
    y = y.value;
    try {
      var T = S();
      return !a(y, T);
    } catch {
      return !0;
    }
  }
  function p(y, S) {
    return S();
  }
  var g =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? p
      : h;
  return (
    (Nd.useSyncExternalStore =
      e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : g),
    Nd
  );
}
var nx;
function kz() {
  return (nx || ((nx = 1), (Od.exports = Vz())), Od.exports);
}
var Bz = kz();
const Uz = bh.useInsertionEffect,
  Hz =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  qz = Hz ? b.useLayoutEffect : b.useEffect,
  Fz = Uz || qz,
  _E = (e) => {
    const i = b.useRef([e, (...a) => i[0](...a)]).current;
    return (
      Fz(() => {
        i[0] = e;
      }),
      i[1]
    );
  },
  Gz = "popstate",
  Mm = "pushState",
  Om = "replaceState",
  Yz = "hashchange",
  ix = [Gz, Mm, Om, Yz],
  Iz = (e) => {
    for (const i of ix) addEventListener(i, e);
    return () => {
      for (const i of ix) removeEventListener(i, e);
    };
  },
  LE = (e, i) => Bz.useSyncExternalStore(Iz, e, i),
  Xz = () => location.search,
  Kz = ({ ssrSearch: e = "" } = {}) => LE(Xz, () => e),
  ax = () => location.pathname,
  $z = ({ ssrPath: e } = {}) => LE(ax, e ? () => e : ax),
  Qz = (e, { replace: i = !1, state: a = null } = {}) =>
    history[i ? Om : Mm](a, "", e),
  Zz = (e = {}) => [$z(e), Qz],
  rx = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[rx] > "u") {
  for (const e of [Mm, Om]) {
    const i = history[e];
    history[e] = function () {
      const a = i.apply(this, arguments),
        s = new Event(e);
      return ((s.arguments = arguments), dispatchEvent(s), a);
    };
  }
  Object.defineProperty(window, rx, { value: !0 });
}
const Wz = (e, i) =>
    i.toLowerCase().indexOf(e.toLowerCase())
      ? "~" + i
      : i.slice(e.length) || "/",
  zE = (e = "") => (e === "/" ? "" : e),
  Jz = (e, i) => (e[0] === "~" ? e.slice(1) : zE(i) + e),
  e6 = (e = "", i) => Wz(sx(zE(e)), sx(i)),
  sx = (e) => {
    try {
      return decodeURI(e);
    } catch {
      return e;
    }
  },
  t6 = {
    hook: Zz,
    searchHook: Kz,
    parser: Pz,
    base: "",
    ssrPath: void 0,
    ssrSearch: void 0,
    hrefs: (e) => e,
  },
  n6 = b.createContext(t6),
  Nm = () => b.useContext(n6),
  i6 = {};
b.createContext(i6);
const PE = (e) => {
    const [i, a] = e.hook(e);
    return [e6(e.base, i), _E((s, l) => a(Jz(s, e.base), l))];
  },
  VE = () => PE(Nm()),
  a6 = (e, i, a, s) => {
    const { pattern: l, keys: u } =
        i instanceof RegExp ? { keys: !1, pattern: i } : e(i, s),
      f = l.exec(a) || [],
      [h, ...m] = f;
    return h !== void 0
      ? [
          !0,
          (() => {
            const p =
              u !== !1
                ? Object.fromEntries(u.map((y, S) => [y, m[S]]))
                : f.groups;
            let g = { ...m };
            return (p && Object.assign(g, p), g);
          })(),
        ]
      : [!1, null];
  },
  r6 = (e) => a6(Nm().parser, e, VE()[0]);
b.forwardRef((e, i) => {
  const a = Nm(),
    [s, l] = PE(a),
    {
      to: u = "",
      href: f = u,
      onClick: h,
      asChild: m,
      children: p,
      className: g,
      replace: y,
      state: S,
      ...T
    } = e,
    C = _E((A) => {
      A.ctrlKey ||
        A.metaKey ||
        A.altKey ||
        A.shiftKey ||
        A.button !== 0 ||
        (h?.(A), A.defaultPrevented || (A.preventDefault(), l(f, e)));
    }),
    E = a.hrefs(f[0] === "~" ? f.slice(1) : a.base + f, a);
  return m && b.isValidElement(p)
    ? b.cloneElement(p, { onClick: C, href: E })
    : b.createElement("a", {
        ...T,
        onClick: C,
        href: E,
        className: g?.call ? g(s === f) : g,
        children: p,
        ref: i,
      });
});
const kE = {
  "probeme-ai": {
    title: "Probe Me AI",
    category: "AI Driven Survey Analytics Platform",
    year: "2023 - 2024",
    description:
      "An AI-driven survey analytics platform featuring predictive analytics, real-time data probing, trend detection, and sentiment analysis from survey responses.",
    overview:
      "Probe Me AI is an advanced AI-driven survey analytics platform. It leverages predictive analytics and real-time data probing to detect trends and analyze sentiment from survey responses, providing actionable insights through intuitive dashboards.",
    keyFeatures: [
      "Real-time data probing and predictive analytics engine",
      "Dynamic dashboards with charts, heatmaps, and smart alerts",
      "Live data streams for continuous updating of AI model outputs",
      "GPT-4o-mini integration for automated insights and follow-up recommendations",
      "Responsive and intuitive data visualization layouts",
    ],
    technologies: [
      "React.js",
      "TypeScript",
      "Node.js",
      "OpenAI (GPT-4o-mini)",
      "ChatGPT API",
      "REST APIs",
      "Data Visualization Libraries",
      "Tailwind CSS",
    ],
    highlights: [
      "Integrated Probe Me AI predictive analytics engine into the frontend",
      "Built dynamic and reusable UI components to visualize AI outputs",
      "Implemented real-time data streams for seamless user interaction",
      "Integrated GPT-4o-mini via ChatGPT APIs to support AI-driven probing logic",
      "Improved usability by designing layouts aligned with UX best practices",
    ],
  },
  dimensight: {
    title: "Dimensight",
    category: "Project Management",
    year: "2023 - 2024",
    description:
      "Developed frontend modules using React.js and TypeScript for project management, user management, group management, and reporting dashboards.",
    overview:
      "Dimensight is a project management platform with dynamic data tables, automated export features, and role-based access control (RBAC). It includes a robust reporting scheduling system enabling users to configure automated exports with email delivery.",
    keyFeatures: [
      "Dynamic data tables with search, filters, and export functionality",
      "Scheduled export feature for automated report generation",
      "Role-based access control (RBAC) for Admin, Managers, and Users",
      "Hierarchy management features including department structure",
      "Report scheduling system (CSV/Excel/SPSS) with email delivery",
      "Background job processing for automated report generation",
    ],
    technologies: [
      "React.js",
      "TypeScript",
      "Node.js",
      "OpenAI (GPT-4o-mini)",
      "ChatGPT API",
      "REST APIs",
      "Tailwind CSS",
    ],
    highlights: [
      "Implemented dynamic data tables to improve project tracking efficiency",
      "Collaborated with backend services to enable background job processing",
      "Designed and implemented role-based access control (RBAC)",
      "Reduced manual reporting effort through automated exports scheduling",
    ],
  },
  "research-gearbox": {
    title: "Research Gearbox - Video Analyzer",
    category: "Data Analysis Tool",
    year: "2022 - 2023",
    description:
      "A fully customized video analysis tool featuring complex mathematical computations for data capture and real-time dashboard analytics, secured with role-based admin/user access and JWT authentication.",
    overview:
      "Built a fully customized video analysis tool that captures and processes complex data through advanced mathematical computations, delivering real-time insights via interactive dashboards with secure role-based access",
    keyFeatures: [
      "Multi-platform video data capture",
      "Complex mathematical computations and analysis",
      "Real-time dashboard analytics",
      "Admin and user role-based access",
      "Secured API endpoints with token authentication",
      "Multiple survey platform integration",
    ],
    technologies: [
      "React.js",
      "Video JS",
      "NestJS",
      "MongoDB",
      "JWT Security",
      "WebSockets",
    ],
    highlights: [
      "Complete management and development of the dashboard",
      "Implemented secure authentication with access and refresh tokens",
      "Built real-time data visualization features",
      "Trained junior developers on live project implementation",
      "Deployed to production with full DevOps support",
    ],
  },
  "raven-dashboard": {
    title: "Raven Dashboard",
    category: "Data Visualization SaaS",
    year: "2021 - 2023",
    description:
      "Enterprise data visualization platform processing survey data from Confirmit and Decipher, delivering real-time insights through interactive charts, PPT, and Excel exports.",
    overview:
      "Raven is a powerful SaaS platform designed for enterprises seeking advanced data monitoring and analysis capabilities. It integrates with popular survey tools to provide real-time insights, customizable reports, and robust data integration for informed decision-making.",
    keyFeatures: [
      "Live Data Updates: Continuously updated data feeds",
      "Custom Alerts: Event-based notifications and thresholds",
      "Dynamic Charts and Graphs: Multiple visualization options",
      "Customizable Dashboards: Personalized user experiences",
      "API Connectivity: Seamless data source integration",
      "Multi-format Exports: Charts, PPT, and Excel sheets",
    ],
    technologies: [
      "React.js",
      "Highcharts",
      "NestJS",
      "NestJS",
      "MongoDB",
      "JWT Security",
      "PPT.js",
      "Excel.js",
      "PDF.js",
    ],
    highlights: [
      "Developed interactive data visualization components",
      "Optimized performance for handling large datasets",
      "Implemented customizable dashboard builder",
      "Created multi-format export functionality",
      "Integrated with Confirmit, Decipher, and other survey platforms",
      "Achieved 99.9% uptime in production",
    ],
  },
  "hfs-dashboard": {
    title: "HFS Dashboard",
    category: "Performance Analytics",
    year: "2022 - 2024",
    description:
      "High-Frequency Statistics Dashboard for advanced data visualization and performance tracking. Features live data streams, interactive charts, and predictive analytics.",
    overview:
      "HFS Dashboard is a sophisticated analytics tool designed for organizations requiring real-time performance monitoring and predictive insights. It provides comprehensive views of key metrics enabling users to monitor, analyze, and optimize their operations.",
    keyFeatures: [
      "Live Data Streams: Real-time updates for accuracy",
      "Interactive Charts: Line charts, bar graphs, scatter plots, heatmaps",
      "Predictive Analytics: Historical data forecasting",
      "Data Aggregation: Multi-source data consolidation",
      "Sales Performance: Campaign effectiveness analysis",
      "Customer Metrics: Acquisition and retention monitoring",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Highcharts",
      "MongoDB",
      "SSL/TLS",
      "Encryption",
    ],
    highlights: [
      "Built responsive interface for multi-device access",
      "Implemented predictive analytics engine",
      "Optimized performance using lazy loading and code splitting",
      "Created comprehensive data aggregation system",
      "Implemented encryption for sensitive data",
      "Designed intuitive dashboard for executive insights",
    ],
  },
  "rbi-dashboard": {
    title: "Restaurant Brands International Dashboard",
    category: "Analytics Platform",
    year: "Jan 2024 - June 2024",
    description:
      "Comprehensive analytics and management tool for one of the world's largest quick-service restaurant companies. Centralized control for Burger King, Tim Hortons, and Popeyes operations.",
    overview:
      "A comprehensive enterprise analytics platform designed for Restaurant Brands International, overseeing operations for major QSR brands including Burger King, Tim Hortons, and Popeyes. The dashboard provides centralized control and real-time insights across all operational aspects.",
    keyFeatures: [
      "Sales and Marketing Analytics: Performance tracking across brands",
      "Real-time Monitoring: Live operational metrics",
      "Supply Chain Management: Inventory and logistics tracking",
      "Customer Satisfaction: Feedback and satisfaction metrics",
      "Financial Reporting: Revenue and cost analysis",
      "Multi-brand Support: Unified interface for multiple brands",
    ],
    technologies: [
      "React.js",
      "TypeScript",
      "MongoDB",
      "Real-time Data",
      "Express.js",
      "WebSockets",
    ],
    highlights: [
      "Designed multi-brand dashboard architecture",
      "Implemented real-time data synchronization",
      "Created comprehensive reporting system",
      "Optimized performance for handling global operations",
      "Delivered on-time with zero production issues",
      "Received positive feedback from executive stakeholders",
    ],
  },
  "ccadmin-dashboard": {
    title: "CCAdmin Dashboard",
    category: "Survey Management",
    year: "April 2020 - Nov 2021",
    description:
      "User-centric survey admin dashboard with detailed reporting on cloud resource usage, performance, and costs. Implemented UX and business requirements into production solutions.",
    overview:
      "CCAdmin Dashboard is a comprehensive survey administration platform that combines user-centric design with powerful analytics capabilities. It provides detailed insights into cloud resource usage, performance metrics, and cost management.",
    keyFeatures: [
      "Survey Management: Creation and distribution tools",
      "Admin Dashboard: Comprehensive control panel",
      "Resource Usage Reporting: Cloud cost analysis",
      "Performance Metrics: Real-time performance tracking",
      "User Management: Role-based access control",
      "Detailed Analytics: In-depth survey data analysis",
    ],
    technologies: [
      "React.js",
      "Cloud APIs",
      "Express.js",
      "Reporting",
      "Analytics",
    ],
    highlights: [
      "Led UX and business requirements translation to code",
      "Designed user-centric survey management interface",
      "Implemented comprehensive reporting system",
      "Optimized cloud resource utilization",
      "Collaborated with stakeholders on feature prioritization",
      "Delivered project on schedule with high user satisfaction",
    ],
  },
};
function s6() {
  const [e, i] = r6("/project/:id"),
    [, a] = VE();
  if (!e) return null;
  const s = i?.id,
    l = kE[s];
  return l
    ? x.jsxs("main", {
        className: "bg-background text-foreground",
        children: [
          x.jsx(Zw, {}),
          x.jsx("section", {
            className: "py-32 px-6",
            children: x.jsxs("div", {
              className: "container mx-auto max-w-4xl",
              children: [
                x.jsxs(Q.button, {
                  onClick: () => a("/"),
                  whileHover: { x: -4 },
                  className:
                    "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12",
                  "data-testid": "button-back",
                  children: [
                    x.jsx(ED, { className: "w-5 h-5" }),
                    "Back to Portfolio",
                  ],
                }),
                x.jsxs(Q.div, {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 },
                  children: [
                    x.jsxs("div", {
                      className: "mb-12",
                      children: [
                        x.jsx("span", {
                          className:
                            "text-sm text-primary font-medium uppercase tracking-wider",
                          children: l.category,
                        }),
                        x.jsx("h1", {
                          className:
                            "text-5xl md:text-6xl font-light tracking-tight mt-4 mb-4",
                          children: l.title,
                        }),
                        x.jsx("p", {
                          className: "text-lg text-muted-foreground",
                          children: l.year,
                        }),
                      ],
                    }),
                    x.jsxs("div", {
                      className: "prose prose-invert max-w-none",
                      children: [
                        x.jsx("p", {
                          className:
                            "text-xl text-muted-foreground leading-relaxed mb-12",
                          children: l.overview,
                        }),
                        x.jsxs("div", {
                          className: "grid md:grid-cols-2 gap-12 mb-12",
                          children: [
                            x.jsxs("div", {
                              children: [
                                x.jsx("h2", {
                                  className: "text-2xl font-light mb-6",
                                  children: "Key Features",
                                }),
                                x.jsx("ul", {
                                  className: "space-y-3",
                                  children: l.keyFeatures.map((u) =>
                                    x.jsxs(
                                      "li",
                                      {
                                        className:
                                          "flex gap-3 text-muted-foreground",
                                        children: [
                                          x.jsx("span", {
                                            className: "text-primary mt-1",
                                            children: "•",
                                          }),
                                          u,
                                        ],
                                      },
                                      u,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                            x.jsxs("div", {
                              children: [
                                x.jsx("h2", {
                                  className: "text-2xl font-light mb-6",
                                  children: "Highlights",
                                }),
                                x.jsx("ul", {
                                  className: "space-y-3",
                                  children: l.highlights.map((u) =>
                                    x.jsxs(
                                      "li",
                                      {
                                        className:
                                          "flex gap-3 text-muted-foreground",
                                        children: [
                                          x.jsx("span", {
                                            className: "text-primary mt-1",
                                            children: "•",
                                          }),
                                          u,
                                        ],
                                      },
                                      u,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                          ],
                        }),
                        x.jsxs("div", {
                          className: "border-t border-border pt-12",
                          children: [
                            x.jsx("h2", {
                              className: "text-2xl font-light mb-6",
                              children: "Technologies Used",
                            }),
                            x.jsx("div", {
                              className: "flex flex-wrap gap-3",
                              children: l.technologies.map((u) =>
                                x.jsx(
                                  "span",
                                  {
                                    className:
                                      "px-4 py-2 bg-secondary/50 rounded-full text-sm text-foreground border border-border",
                                    "data-testid": `tech-${u.toLowerCase().replace(/[\s.]/g, "-")}`,
                                    children: u,
                                  },
                                  u,
                                ),
                              ),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      })
    : x.jsx("div", {
        className: "min-h-screen flex items-center justify-center",
        children: x.jsxs("div", {
          className: "text-center",
          children: [
            x.jsx("h1", {
              className: "text-4xl font-bold mb-4",
              children: "Project not found",
            }),
            x.jsx("button", {
              onClick: () => a("/"),
              className: "text-primary hover:text-primary/70",
              children: "Back to Portfolio",
            }),
          ],
        }),
      });
}
function o6({
  id: e,
  title: i,
  category: a,
  description: s,
  image: l,
  tags: u,
  year: f,
  featured: h = !1,
}) {
  const m = kE[e];
  return x.jsxs(_z, {
    children: [
      x.jsx(Lz, {
        asChild: !0,
        children: x.jsx(Q.div, {
          className: "cursor-pointer group",
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          transition: { type: "spring", stiffness: 100, damping: 15 },
          "data-testid": `card-project-${e}`,
          children: x.jsxs(Yh, {
            className:
              "border-0 shadow-none bg-transparent hover:bg-gradient-to-br hover:from-secondary/50 hover:to-background transition-all duration-500 rounded-3xl p-8 overflow-hidden relative",
            children: [
              x.jsx(Q.div, {
                className:
                  "absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-purple-500/20 to-cyan-500/20 opacity-100 transition-opacity duration-500",
                whileHover: {
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  transition: { duration: 3, repeat: 1 / 0 },
                },
              }),
              x.jsxs(Ih, {
                className:
                  "p-0 grid md:grid-cols-2 gap-12 items-center relative z-10",
                children: [
                  x.jsxs(Q.div, {
                    whileHover: { scale: 1.06, rotateY: 5 },
                    transition: { duration: 0.4 },
                    className: "overflow-hidden rounded-2xl relative h-80",
                    children: [
                      x.jsx(Q.div, {
                        className:
                          "absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-purple-500/20 rounded-2xl",
                        initial: { opacity: 0 },
                        whileHover: { opacity: 1 },
                        transition: { duration: 0.3 },
                      }),
                      h &&
                        x.jsxs(Q.div, {
                          className:
                            "absolute top-4 right-4 z-20 flex items-center gap-1 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-bold",
                          initial: { scale: 0 },
                          whileInView: { scale: 1 },
                          transition: { type: "spring", delay: 0.5 },
                          children: [
                            x.jsx(QD, { className: "w-4 h-4" }),
                            "Featured",
                          ],
                        }),
                      x.jsx("img", {
                        src: l,
                        alt: i,
                        className: "w-full h-full object-cover",
                      }),
                    ],
                  }),
                  x.jsxs("div", {
                    className: "space-y-6",
                    children: [
                      x.jsxs("div", {
                        children: [
                          x.jsxs("div", {
                            className: "flex items-center gap-3 mb-4",
                            children: [
                              x.jsx(Q.span, {
                                className:
                                  "text-sm text-primary font-bold uppercase tracking-widest inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/40",
                                "data-testid": `badge-category-${e}`,
                                whileHover: {
                                  scale: 1.1,
                                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                                },
                                children: a,
                              }),
                              f &&
                                x.jsx(Q.span, {
                                  className:
                                    "text-sm text-muted-foreground font-semibold",
                                  whileHover: { color: "var(--foreground)" },
                                  children: f,
                                }),
                            ],
                          }),
                          x.jsx(Q.h3, {
                            className:
                              "text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-purple-400 transition-all duration-300",
                            "data-testid": `heading-project-${e}`,
                            whileHover: { scale: 1.02 },
                            children: i,
                          }),
                          x.jsx(Q.p, {
                            className:
                              "text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300",
                            "data-testid": `description-project-${e}`,
                            children: s,
                          }),
                        ],
                      }),
                      x.jsxs("div", {
                        className: "flex flex-col gap-4 pt-4",
                        children: [
                          x.jsx("div", {
                            className: "flex gap-2 flex-wrap",
                            children: u.map((p, g) =>
                              x.jsx(
                                Q.span,
                                {
                                  className:
                                    "text-sm text-muted-foreground border border-border rounded-full px-4 py-2 bg-background/50 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all",
                                  "data-testid": `tag-${p.toLowerCase().replace(/[\s.]/g, "-")}`,
                                  initial: { opacity: 0, scale: 0.8 },
                                  whileInView: { opacity: 1, scale: 1 },
                                  transition: { delay: g * 0.05 },
                                  whileHover: { scale: 1.15, y: -4 },
                                  children: p,
                                },
                                p,
                              ),
                            ),
                          }),
                          x.jsxs("div", {
                            className: "flex items-center justify-between pt-2",
                            children: [
                              x.jsx(Q.div, {
                                className:
                                  "text-primary font-bold uppercase text-sm tracking-widest transition-opacity",
                                whileHover: { x: 4 },
                                children: "View Details",
                              }),
                              x.jsx(Q.div, {
                                whileHover: {
                                  x: 8,
                                  y: -8,
                                  rotate: 45,
                                  scale: 1.2,
                                },
                                className:
                                  "text-primary bg-primary/10 rounded-full p-3",
                                children: x.jsx(AD, { className: "w-6 h-6" }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      m &&
        x.jsxs(OE, {
          className:
            "max-w-4xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-lg border-primary/20",
          children: [
            x.jsxs(NE, {
              className: "sr-only",
              children: [m.title, " Details"],
            }),
            x.jsxs(jE, {
              className: "sr-only",
              children: ["Detailed view of ", m.title],
            }),
            x.jsxs("div", {
              className: "py-6",
              children: [
                x.jsxs("div", {
                  className: "mb-8",
                  children: [
                    x.jsx("span", {
                      className:
                        "text-sm text-primary font-medium uppercase tracking-wider",
                      children: m.category,
                    }),
                    x.jsx("h2", {
                      className:
                        "text-4xl md:text-5xl font-light tracking-tight mt-2 mb-2",
                      children: m.title,
                    }),
                    x.jsx("p", {
                      className: "text-muted-foreground",
                      children: m.year,
                    }),
                  ],
                }),
                x.jsxs("div", {
                  className: "prose prose-invert max-w-none",
                  children: [
                    x.jsx("p", {
                      className:
                        "text-lg text-muted-foreground leading-relaxed mb-8",
                      children: m.overview,
                    }),
                    x.jsxs("div", {
                      className: "grid md:grid-cols-2 gap-8 mb-8",
                      children: [
                        x.jsxs("div", {
                          children: [
                            x.jsx("h3", {
                              className: "text-xl font-light mb-4",
                              children: "Key Features",
                            }),
                            x.jsx("ul", {
                              className: "space-y-2",
                              children: m.keyFeatures?.map((p) =>
                                x.jsxs(
                                  "li",
                                  {
                                    className:
                                      "flex gap-2 text-muted-foreground text-sm",
                                    children: [
                                      x.jsx("span", {
                                        className: "text-primary mt-1",
                                        children: "•",
                                      }),
                                      p,
                                    ],
                                  },
                                  p,
                                ),
                              ),
                            }),
                          ],
                        }),
                        x.jsxs("div", {
                          children: [
                            x.jsx("h3", {
                              className: "text-xl font-light mb-4",
                              children: "Highlights",
                            }),
                            x.jsx("ul", {
                              className: "space-y-2",
                              children: m.highlights?.map((p) =>
                                x.jsxs(
                                  "li",
                                  {
                                    className:
                                      "flex gap-2 text-muted-foreground text-sm",
                                    children: [
                                      x.jsx("span", {
                                        className: "text-primary mt-1",
                                        children: "•",
                                      }),
                                      p,
                                    ],
                                  },
                                  p,
                                ),
                              ),
                            }),
                          ],
                        }),
                      ],
                    }),
                    x.jsxs("div", {
                      className: "border-t border-border pt-8",
                      children: [
                        x.jsx("h3", {
                          className: "text-xl font-light mb-4",
                          children: "Technologies Used",
                        }),
                        x.jsx("div", {
                          className: "flex flex-wrap gap-2",
                          children: m.technologies?.map((p) =>
                            x.jsx(
                              "span",
                              {
                                className:
                                  "px-3 py-1 bg-secondary/50 rounded-full text-xs text-foreground border border-border",
                                children: p,
                              },
                              p,
                            ),
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
const l6 = "assets/react_application_interface-CO8SVDCB.png",
  u6 = "assets/react_application_interface_1-0DSS-kl9.png",
  c6 = "assets/react_application_interface_2-CxDg1Eyp.png",
  f6 = "assets/react_application_interface_3-CVZO9BLW.png",
  d6 = "assets/react_application_interface_4-CEPpnF04.png",
  h6 = "assets/react_application_interface_5-REh3E0GH.png",
  m6 = [
    {
      id: "probeme-ai",
      title: "Probe Me AI",
      category: "AI Analytics Platform",
      description:
        "An AI-driven survey analytics platform featuring predictive analytics, real-time data probing, trend detection, and sentiment analysis.",
      image: u6,
      tags: ["React.js", "TypeScript", "ChatGPT API"],
      year: "2023 - 2024",
      featured: !0,
    },
    {
      id: "dimensight",
      title: "Dimensight",
      category: "Project Management",
      description:
        "Developed frontend modules using React.js and TypeScript for project management, user management, group management, and reporting dashboards.",
      image: l6,
      tags: ["React.js", "TypeScript", "Tailwind CSS"],
      featured: !0,
    },
    {
      id: "research-gearbox",
      title: "Research Gearbox - Video Analyzer",
      category: "Data Analysis Tool",
      description:
        "A fully customized video analysis tool featuring complex mathematical computations for data capture and real-time dashboard analytics, secured with role-based admin/user access and JWT authentication.",
      image: c6,
      tags: ["React.js", "Video Processing", "Express.js"],
      year: "2022 - 2023",
      featured: !0,
    },
    {
      id: "raven-dashboard",
      title: "Raven Dashboard",
      category: "Data Visualization SaaS",
      description:
        "Enterprise data visualization platform processing survey data from Confirmit and Decipher, delivering real-time insights through interactive charts.",
      image: f6,
      tags: ["React.js", "Highcharts", "NestJS"],
      featured: !0,
    },
    {
      id: "rbi-dashboard",
      title: "Restaurant Brands International Dashboard",
      category: "Analytics Platform",
      description:
        "Comprehensive analytics tool for managing sales, marketing, and supply chain operations across Burger King, Tim Hortons, and Popeyes.",
      image: d6,
      tags: ["React.js", "TypeScript", "Real-time Data"],
      year: "Jan 2024 - June 2024",
      featured: !0,
    },
    {
      id: "hfs-dashboard",
      title: "HFS Dashboard",
      category: "Performance Analytics",
      description:
        "High-Frequency Statistics dashboard with predictive analytics, live data streams, and advanced performance tracking for enterprise operations.",
      image: h6,
      tags: ["React.js", "Node.js", "Highcharts"],
    },
  ];
function p6() {
  return x.jsxs("section", {
    id: "projects",
    className: "py-32 px-6 bg-background relative overflow-hidden",
    children: [
      x.jsx(Q.div, {
        className:
          "absolute -top-40 right-0 w-80 h-80 bg-gradient-to-br from-primary/15 to-purple-500/15 rounded-full blur-3xl",
        animate: { y: [0, 40, 0], x: [0, 20, 0] },
        transition: { duration: 10, repeat: 1 / 0 },
      }),
      x.jsx(Q.div, {
        className:
          "absolute -bottom-32 left-1/2 w-96 h-96 bg-gradient-to-tr from-cyan-500/10 to-primary/10 rounded-full blur-3xl",
        animate: { y: [0, -40, 0], x: [0, -20, 0] },
        transition: { duration: 12, repeat: 1 / 0, delay: 2 },
      }),
      x.jsxs("div", {
        className: "container mx-auto max-w-6xl relative z-10",
        children: [
          x.jsxs(Q.div, {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            transition: { duration: 0.6 },
            className: "mb-24 text-center md:text-left",
            children: [
              x.jsx(Q.div, {
                className: "inline-block mb-6",
                whileHover: { scale: 1.05 },
                children: x.jsx("span", {
                  className:
                    "text-sm text-primary font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-primary/10 border border-primary/20",
                  children: "✨ Featured Work",
                }),
              }),
              x.jsxs(Q.h2, {
                className: "text-6xl md:text-7xl font-bold mb-6 leading-tight",
                initial: { opacity: 0 },
                whileInView: { opacity: 1 },
                viewport: { once: !0 },
                children: [
                  x.jsx("span", {
                    className:
                      "bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent",
                    children: "Some of my",
                  }),
                  x.jsx("br", {}),
                  x.jsx("span", {
                    className: "text-foreground",
                    children: "latest work",
                  }),
                ],
              }),
              x.jsx(Q.p, {
                className: "text-xl text-muted-foreground max-w-2xl mt-6",
                initial: { opacity: 0 },
                whileInView: { opacity: 1 },
                viewport: { once: !0 },
                transition: { delay: 0.1 },
                children:
                  "A selection of projects where I’ve designed and built scalable, high-performance web applications with rich, data-driven visualizations.",
              }),
            ],
          }),
          x.jsx(Q.div, {
            className: "grid gap-16",
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: !0 },
            children: m6.map((e) => x.jsx(o6, { ...e }, e.id)),
          }),
        ],
      }),
    ],
  });
}
function g6() {
  const e = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return x.jsxs("section", {
    className: "py-32 px-6 bg-background relative overflow-hidden",
    children: [
      x.jsx(Q.div, {
        className:
          "absolute top-40 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-primary/10 rounded-full blur-3xl",
        animate: { x: [0, 40, 0] },
        transition: { duration: 10, repeat: 1 / 0 },
      }),
      x.jsx("div", {
        className: "container mx-auto max-w-6xl relative z-10",
        children: x.jsxs(Q.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0 },
          transition: { duration: 0.6 },
          children: [
            x.jsx("h2", {
              className: "text-5xl md:text-6xl font-light tracking-tight mb-16",
              children: "Work Experience",
            }),
            x.jsx("div", {
              className: "space-y-12",
              children: x.jsxs(Q.div, {
                variants: e,
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: !0 },
                className:
                  "border-l-2 border-gradient-to-b from-primary to-transparent pl-8 py-4 hover:pl-12 transition-all duration-300 relative",
                children: [
                  x.jsx(Q.div, {
                    className:
                      "absolute -left-3 top-6 w-4 h-4 bg-primary rounded-full",
                    whileHover: { scale: 1.3 },
                  }),
                  x.jsxs("div", {
                    className:
                      "flex flex-col md:flex-row md:justify-between md:items-start mb-4",
                    children: [
                      x.jsxs("div", {
                        children: [
                          x.jsx(Q.h3, {
                            className:
                              "text-2xl font-light text-foreground mb-2",
                            whileHover: { x: 5 },
                            children: "UI Developer",
                          }),
                          x.jsx(Q.p, {
                            className: "text-lg text-primary font-medium",
                            whileHover: { color: "#7c3aed" },
                            children: "E2E Research Pvt Ltd | New Delhi, India",
                          }),
                        ],
                      }),
                      x.jsx("span", {
                        className: "text-muted-foreground mt-2 md:mt-0",
                        children: "Jan 2020 – Present",
                      }),
                    ],
                  }),
                  x.jsx("div", {
                    className: "space-y-3 mb-6",
                    children: [
                      "Led frontend and backend development for multiple SaaS projects using Agile methodology.",
                      "Built real-time data dashboards with secure API integrations and dynamic UI features.",
                      "Mentored junior developers on live projects and best coding practices.",
                      "Integrated AI/ML models into the frontend to display predictive analytics, sentiment analysis, and real-time insights.",
                      "Achievements: 4 performance awards within 2 year.",
                      "Worked with the COO to identify use cases and build AI-integrated solutions that achieved clear results.",
                    ].map((i, a) =>
                      x.jsxs(
                        Q.p,
                        {
                          className:
                            "text-muted-foreground flex gap-3 hover:text-foreground transition-colors",
                          initial: { opacity: 0, x: -10 },
                          whileInView: { opacity: 1, x: 0 },
                          transition: { delay: a * 0.1 },
                          children: [
                            x.jsx("span", {
                              className: "text-primary mt-1 ",
                              children: "→",
                            }),
                            i,
                          ],
                        },
                        a,
                      ),
                    ),
                  }),
                  x.jsx("div", {
                    className: "flex flex-wrap gap-3",
                    children: [
                      "ReactJS",
                      "NextJS",
                      "NodeJS",
                      "ExpressJS",
                      "MongoDB",
                      "NestJS",
                      "Docker",
                      "Nginx",
                      "WordPress",
                    ].map((i, a) =>
                      x.jsx(
                        Q.span,
                        {
                          className:
                            "text-sm text-muted-foreground border border-border rounded-full px-4 py-1 hover:border-primary hover:text-primary transition-colors",
                          "data-testid": `skill-work-${i.toLowerCase()}`,
                          initial: { opacity: 0, scale: 0.8 },
                          whileInView: { opacity: 1, scale: 1 },
                          transition: { delay: a * 0.05 },
                          whileHover: { scale: 1.1 },
                          children: i,
                        },
                        i,
                      ),
                    ),
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
const y6 = [
    {
      icon: kD,
      degree: "Master of Computer Applications",
      institution: "Rakshpal Bahadur Management Institute",
      university: "Mahatma Jyotiba Phule Rohilkhand University",
      year: "Oct 2016",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: DD,
      degree: "Bachelor of Computer Applications",
      institution: "Rakshpal Bahadur Management Institute",
      university: "Dr. A.P.J. Abdul Kalam Technical University",
      year: "Sep 2014",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: u0,
      degree: "12th - Higher Secondary School Certificate",
      institution: "Uttar Pradesh Madhyamik Shiksha Parishad",
      year: "July 2012",
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      icon: u0,
      degree: "10th - Higher Secondary School Certificate",
      institution: "Uttar Pradesh Madhyamik Shiksha Parishad",
      year: "July 2009",
      color: "from-green-500/20 to-emerald-500/20",
    },
  ],
  v6 = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  },
  b6 = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, type: "spring" },
    },
  };
function x6() {
  return x.jsxs("section", {
    className: "py-32 px-6 bg-secondary/30 relative overflow-hidden",
    children: [
      x.jsx(Q.div, {
        className:
          "absolute top-40 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-3xl",
        animate: { y: [0, 50, 0], x: [0, 30, 0] },
        transition: { duration: 12, repeat: 1 / 0 },
      }),
      x.jsx("div", {
        className: "container mx-auto max-w-6xl relative z-10",
        children: x.jsxs(Q.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0 },
          transition: { duration: 0.6 },
          children: [
            x.jsxs("div", {
              className: "mb-16",
              children: [
                x.jsx(Q.div, {
                  className: "inline-block mb-6",
                  whileHover: { scale: 1.05 },
                  children: x.jsx("span", {
                    className:
                      "text-sm text-primary font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-primary/10 border border-primary/20",
                    children: "📚 Education",
                  }),
                }),
                x.jsx("h2", {
                  className: "text-5xl md:text-6xl font-light tracking-tight",
                  children: "My Educational Journey",
                }),
              ],
            }),
            x.jsx(Q.div, {
              className: "grid gap-6",
              variants: v6,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: !0 },
              children: y6.map((e, i) => {
                const a = e.icon;
                return x.jsx(
                  Q.div,
                  {
                    variants: b6,
                    whileHover: { x: 8 },
                    className: "group",
                    children: x.jsx("div", {
                      className: `bg-gradient-to-br ${e.color} border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300`,
                      children: x.jsxs("div", {
                        className: "flex gap-6",
                        children: [
                          x.jsx(Q.div, {
                            className: "flex-shrink-0",
                            whileHover: { scale: 1.1, rotate: 10 },
                            children: x.jsx("div", {
                              className:
                                "p-4 rounded-lg bg-background/50 border border-white/10",
                              children: x.jsx(a, {
                                className: "w-8 h-8 text-primary",
                              }),
                            }),
                          }),
                          x.jsxs("div", {
                            className: "flex-1",
                            children: [
                              x.jsx(Q.h3, {
                                className:
                                  "text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors",
                                whileHover: { x: 4 },
                                children: e.degree,
                              }),
                              x.jsx("p", {
                                className: "text-muted-foreground mb-1",
                                children: e.institution,
                              }),
                              e.university &&
                                x.jsx("p", {
                                  className:
                                    "text-sm text-muted-foreground/70 mb-3",
                                  children: e.university,
                                }),
                              x.jsx(Q.span, {
                                className:
                                  "inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-semibold",
                                whileHover: { scale: 1.05 },
                                children: e.year,
                              }),
                            ],
                          }),
                          x.jsx(Q.div, {
                            className:
                              "flex-shrink-0 text-primary/30 group-hover:text-primary transition-colors",
                            whileHover: { x: 4, y: -4 },
                            children: x.jsx("svg", {
                              className: "w-6 h-6",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              children: x.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M7 16l-4-4m0 0l4-4m-4 4h18",
                              }),
                            }),
                          }),
                        ],
                      }),
                    }),
                  },
                  i,
                );
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
const S6 = [
    {
      name: "Frontend",
      icon: jh,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      skills: [
        "React.js",
        "Next.js",
        "Nest.js",
        "Node.js",
        "React Native",
        "TypeScript",
        "Vue.js",
        "Wordpress",
      ],
    },
    {
      name: "Styling",
      icon: p1,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      skills: ["Tailwind CSS", "Material UI", "Bootstrap", "Sass/SCSS", "CSS3"],
    },
    {
      name: "State & Tools",
      icon: h1,
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      skills: ["Redux", "Context API", "REST APIs", "GraphQL", "Git"],
    },
    {
      name: "Deployment",
      icon: eM,
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      skills: ["Docker", "Nginx", "AWS", "Azure", "CI/CD"],
    },
  ],
  jd = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  },
  w6 = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 100 },
    },
  },
  _d = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, type: "spring" },
    },
  };
function E6() {
  return x.jsxs("section", {
    id: "about",
    className: "py-32 px-6 bg-background relative overflow-hidden",
    children: [
      x.jsx(Q.div, {
        className:
          "absolute -top-40 right-0 w-80 h-80 bg-gradient-to-bl from-primary/15 to-purple-500/15 rounded-full blur-3xl",
        animate: { y: [0, 40, 0], x: [0, 30, 0] },
        transition: { duration: 12, repeat: 1 / 0 },
      }),
      x.jsx(Q.div, {
        className:
          "absolute -bottom-40 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-500/10 to-primary/10 rounded-full blur-3xl",
        animate: { y: [0, -40, 0], x: [0, -30, 0] },
        transition: { duration: 14, repeat: 1 / 0, delay: 2 },
      }),
      x.jsx("div", {
        className: "container mx-auto max-w-6xl relative z-10",
        children: x.jsxs(Q.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0 },
          transition: { duration: 0.6 },
          children: [
            x.jsxs("div", {
              className: "mb-20 text-center md:text-left",
              children: [
                x.jsx(Q.div, {
                  className: "inline-block mb-6",
                  whileHover: { scale: 1.05 },
                  children: x.jsx("span", {
                    className:
                      "text-sm text-primary font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-primary/10 border border-primary/20",
                    children: "👋 About Me",
                  }),
                }),
                x.jsx(Q.h2, {
                  className:
                    "text-6xl md:text-7xl font-bold mb-6 leading-tight",
                  initial: { opacity: 0 },
                  whileInView: { opacity: 1 },
                  viewport: { once: !0 },
                  children: x.jsx("span", {
                    className:
                      "bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent",
                    children: "Who I Am",
                  }),
                }),
              ],
            }),
            x.jsxs(Q.div, {
              className: "grid md:grid-cols-2 gap-8 mb-24",
              variants: jd,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: !0 },
              children: [
                x.jsx(Q.div, {
                  variants: _d,
                  whileHover: { y: -8 },
                  className: "group",
                  children: x.jsxs("div", {
                    className:
                      "relative h-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-300",
                    children: [
                      x.jsx(Q.div, {
                        className:
                          "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 transition-opacity duration-300",
                      }),
                      x.jsxs("div", {
                        className: "relative z-10",
                        children: [
                          x.jsx(Q.div, {
                            className:
                              "inline-block p-4 rounded-lg bg-background/50 border border-blue-500/20 mb-6",
                            whileHover: { scale: 1.1, rotate: 10 },
                            children: x.jsx(jh, {
                              className: "w-8 h-8 text-blue-400",
                            }),
                          }),
                          x.jsx("h3", {
                            className:
                              "text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors",
                            children: "Background",
                          }),
                          x.jsx("p", {
                            className:
                              "text-lg text-muted-foreground leading-relaxed",
                            children:
                              "Front-End Developer with 6 years of experience building responsive, high-performance web applications using React, Vue, and modern JavaScript frameworks. Currently at E2E Research Pvt Ltd, I've led end-to-end development on multiple projects, earning two awards within 6 months for consistent performance.",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                x.jsx(Q.div, {
                  variants: _d,
                  whileHover: { y: -8 },
                  className: "group",
                  children: x.jsxs("div", {
                    className:
                      "relative h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-300",
                    children: [
                      x.jsx(Q.div, {
                        className:
                          "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-purple-500/5 to-pink-500/5 transition-opacity duration-300",
                      }),
                      x.jsxs("div", {
                        className: "relative z-10",
                        children: [
                          x.jsx(Q.div, {
                            className:
                              "inline-block p-4 rounded-lg bg-background/50 border border-purple-500/20 mb-6",
                            whileHover: { scale: 1.1, rotate: 10 },
                            children: x.jsx(h1, {
                              className: "w-8 h-8 text-purple-400",
                            }),
                          }),
                          x.jsx("h3", {
                            className:
                              "text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors",
                            children: "Philosophy",
                          }),
                          x.jsx("p", {
                            className:
                              "text-lg text-muted-foreground leading-relaxed",
                            children:
                              "Passionate about creating intuitive user interfaces, optimizing web performance, and delivering seamless digital experiences. I believe in writing clean, efficient code and collaborating closely with stakeholders to solve real problems.",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
            x.jsxs("div", {
              className: "mb-8",
              children: [
                x.jsx(Q.h3, {
                  className:
                    "text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent",
                  initial: { opacity: 0 },
                  whileInView: { opacity: 1 },
                  viewport: { once: !0 },
                  children: "Technical Skills",
                }),
                x.jsx(Q.div, {
                  className:
                    "h-1 w-20 bg-gradient-to-r from-primary to-purple-500 rounded-full",
                  initial: { width: 0 },
                  whileInView: { width: 80 },
                  viewport: { once: !0 },
                  transition: { duration: 0.8 },
                }),
              ],
            }),
            x.jsx(Q.div, {
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
              variants: jd,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: !0 },
              children: S6.map((e) => {
                const i = e.icon;
                return x.jsx(
                  Q.div,
                  {
                    variants: _d,
                    whileHover: { y: -12, scale: 1.02 },
                    className: "group cursor-pointer",
                    children: x.jsxs("div", {
                      className: `relative h-full bg-gradient-to-br ${e.color} border ${e.borderColor} rounded-2xl p-6 hover:border-primary/60 transition-all duration-300`,
                      children: [
                        x.jsx(Q.div, {
                          className:
                            "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-transparent to-transparent transition-opacity duration-300",
                        }),
                        x.jsxs("div", {
                          className: "relative z-10",
                          children: [
                            x.jsx(Q.div, {
                              className:
                                "inline-block p-3 rounded-lg bg-background/50 border border-white/10 mb-4",
                              whileHover: { scale: 1.15, rotate: 15 },
                              animate: { y: [0, -8, 0] },
                              transition: {
                                duration: 3,
                                repeat: 1 / 0,
                                ease: "easeInOut",
                              },
                              children: x.jsx(Q.div, {
                                animate: {
                                  rotate: [0, 360],
                                  textShadow: [
                                    "0 0 10px rgba(59, 130, 246, 0.3)",
                                    "0 0 20px rgba(59, 130, 246, 0.6)",
                                    "0 0 10px rgba(59, 130, 246, 0.3)",
                                  ],
                                },
                                transition: {
                                  rotate: { duration: 8, repeat: 1 / 0 },
                                  textShadow: { duration: 2, repeat: 1 / 0 },
                                },
                                children: x.jsx(i, {
                                  className: "w-6 h-6 text-primary",
                                }),
                              }),
                            }),
                            x.jsx("h4", {
                              className:
                                "text-lg font-bold text-foreground mb-5 group-hover:text-primary transition-colors",
                              children: e.name,
                            }),
                            x.jsx("ul", {
                              className: "space-y-2",
                              children: e.skills.map((a, s) =>
                                x.jsxs(
                                  Q.li,
                                  {
                                    className:
                                      "text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2",
                                    "data-testid": `skill-${a.toLowerCase().replace(/[\s+.]/g, "-")}`,
                                    initial: { opacity: 0.6, x: -10 },
                                    whileInView: { opacity: 1, x: 0 },
                                    transition: { delay: s * 0.05 },
                                    whileHover: {
                                      x: 4,
                                      color: "var(--primary)",
                                    },
                                    children: [
                                      x.jsx(Q.span, {
                                        className:
                                          "w-1.5 h-1.5 rounded-full bg-primary",
                                        whileHover: { scale: 1.5 },
                                      }),
                                      a,
                                    ],
                                  },
                                  a,
                                ),
                              ),
                            }),
                          ],
                        }),
                      ],
                    }),
                  },
                  e.name,
                );
              }),
            }),
            x.jsx(Q.div, {
              className: "grid grid-cols-2 md:grid-cols-3 gap-6 mt-24",
              variants: jd,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: !0 },
              children: [
                { label: "Years Experience", value: "6+" },
                { label: "Projects Completed", value: "5+" },
                { label: "Technologies Used", value: "5+" },
              ].map((e, i) =>
                x.jsxs(
                  Q.div,
                  {
                    variants: w6,
                    whileHover: { scale: 1.05 },
                    className:
                      "bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-300",
                    children: [
                      x.jsx(Q.div, {
                        className:
                          "text-4xl md:text-5xl font-bold text-primary mb-2",
                        initial: { opacity: 0, scale: 0.5 },
                        whileInView: { opacity: 1, scale: 1 },
                        viewport: { once: !0 },
                        transition: { delay: i * 0.1 },
                        children: e.value,
                      }),
                      x.jsx("p", {
                        className: "text-muted-foreground font-semibold",
                        children: e.label,
                      }),
                    ],
                  },
                  i,
                ),
              ),
            }),
          ],
        }),
      }),
    ],
  });
}
function T6() {
  const e = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
      },
    },
    i = {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    };
  return x.jsxs("section", {
    id: "contact",
    className:
      "py-32 px-6 bg-background border-t border-border relative overflow-hidden",
    children: [
      x.jsx(Q.div, {
        className:
          "absolute -top-40 left-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-primary/10 to-transparent rounded-full blur-3xl -translate-x-1/2",
        animate: { y: [0, 40, 0] },
        transition: { duration: 12, repeat: 1 / 0 },
      }),
      x.jsx("div", {
        className: "container mx-auto max-w-6xl relative z-10",
        children: x.jsxs(Q.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0 },
          transition: { duration: 0.6 },
          children: [
            x.jsx(Q.h2, {
              className: "text-5xl md:text-6xl font-light tracking-tight mb-12",
              variants: i,
              children: "Let's work together",
            }),
            x.jsxs("div", {
              className: "grid md:grid-cols-2 gap-16 mb-20",
              children: [
                x.jsx(Q.div, {
                  variants: i,
                  children: x.jsx("p", {
                    className: "text-lg text-muted-foreground leading-relaxed",
                    children:
                      "I’m available for freelance work and open to new opportunities. If you need a frontend developer to build scalable, high-quality experiences—or want to collaborate on something impactful—I’d love to talk.",
                  }),
                }),
                x.jsxs(Q.div, {
                  className: "space-y-6",
                  variants: e,
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: !0 },
                  children: [
                    x.jsxs(Q.a, {
                      href: "mailto:ak915066@gmail.com",
                      variants: i,
                      whileHover: { x: 12 },
                      className: "flex items-center gap-4 group",
                      "data-testid": "link-email-contact",
                      children: [
                        x.jsx(Q.div, {
                          className:
                            "p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors",
                          whileHover: { scale: 1.1, rotate: 10 },
                          children: x.jsx(GD, {
                            className: "w-6 h-6 text-primary",
                          }),
                        }),
                        x.jsx("span", {
                          className:
                            "text-lg text-foreground group-hover:text-primary transition-colors",
                          children: "ak915066@gmail.com",
                        }),
                      ],
                    }),
                    x.jsxs(Q.a, {
                      href: "https://www.linkedin.com/in/ashish-gangwar-23ab51b0/",
                      variants: i,
                      whileHover: { x: 12 },
                      className: "flex items-center gap-4 group",
                      "data-testid": "link-linkedin-contact",
                      children: [
                        x.jsx(Q.div, {
                          className:
                            "p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors",
                          whileHover: { scale: 1.1, rotate: 10 },
                          children: x.jsx(qD, {
                            className:
                              "w-6 h-6 text-blue-500 group-hover:text-primary transition-colors",
                          }),
                        }),
                        x.jsx("span", {
                          className:
                            "text-lg text-foreground group-hover:text-primary transition-colors",
                          children: "LinkedIn",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            x.jsx(Q.div, {
              className:
                "border-t border-border pt-8 text-center text-sm text-muted-foreground",
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: !0 },
              children:
                "© 2026 Ashish Kumar. Designed and developed with care.",
            }),
          ],
        }),
      }),
    ],
  });
}
function A6() {
  return x.jsxs("main", {
    className:
      "bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-clip",
    children: [
      x.jsx(hL, {}),
      x.jsx(mL, {}),
      x.jsx(Zw, {}),
      x.jsx(dL, {}),
      x.jsx(pL, {}),
      x.jsx(p6, {}),
      x.jsx(g6, {}),
      x.jsx(x6, {}),
      x.jsx(E6, {}),
      x.jsx(T6, {}),
    ],
  });
}
function C6() {
  const [e, i] = b.useState(!1);
  return (
    b.useEffect(() => {
      i(!0);
      const a = localStorage.getItem("theme") || "dark";
      document.documentElement.classList.toggle("dark", a === "dark");
    }, []),
    e
      ? x.jsx(vR, {
          client: SR,
          children: x.jsxs(WN, {
            children: [
              x.jsx(UM, {}),
              x.jsx(B2, {
                children: x.jsxs(p2, {
                  children: [
                    x.jsx(jl, { path: "/", element: x.jsx(A6, {}) }),
                    x.jsx(jl, { path: "/project/:id", element: x.jsx(s6, {}) }),
                    x.jsx(jl, { path: "*", element: x.jsx(aj, {}) }),
                  ],
                }),
              }),
            ],
          }),
        })
      : null
  );
}
yC.createRoot(document.getElementById("root")).render(x.jsx(C6, {}));
