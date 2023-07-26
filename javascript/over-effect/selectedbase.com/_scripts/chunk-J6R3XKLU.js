var v = Object.create;
var h = Object.defineProperty,
  O = Object.defineProperties,
  g = Object.getOwnPropertyDescriptor,
  x = Object.getOwnPropertyDescriptors,
  M = Object.getOwnPropertyNames,
  p = Object.getOwnPropertySymbols,
  w = Object.getPrototypeOf,
  b = Object.prototype.hasOwnProperty,
  j = Object.prototype.propertyIsEnumerable,
  _ = Reflect.get;
var m = (t, e, r) => (e in t ? h(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (t[e] = r)),
  C = (t, e) => {
    for (var r in e || (e = {})) b.call(e, r) && m(t, r, e[r]);
    if (p) for (var r of p(e)) j.call(e, r) && m(t, r, e[r]);
    return t;
  },
  $ = (t, e) => O(t, x(e));
var R = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var k = (t, e, r, n) => {
  if ((e && typeof e == "object") || typeof e == "function") for (let i of M(e)) !b.call(t, i) && i !== r && h(t, i, { get: () => e[i], enumerable: !(n = g(e, i)) || n.enumerable });
  return t;
};
var L = (t, e, r) => ((r = t != null ? v(w(t)) : {}), k(e || !t || !t.__esModule ? h(r, "default", { value: t, enumerable: !0 }) : r, t));
var P = (t, e, r, n) => {
  for (var i = n > 1 ? void 0 : n ? g(e, r) : e, a = t.length - 1, o; a >= 0; a--) (o = t[a]) && (i = (n ? o(e, r, i) : o(i)) || i);
  return n && i && h(e, r, i), i;
};
var T = (t, e, r) => _(w(t), r, e);
var U = (t, e, r) =>
  new Promise((n, i) => {
    var a = (c) => {
        try {
          f(r.next(c));
        } catch (l) {
          i(l);
        }
      },
      o = (c) => {
        try {
          f(r.throw(c));
        } catch (l) {
          i(l);
        }
      },
      f = (c) => (c.done ? n(c.value) : Promise.resolve(c.value).then(a, o));
    f((r = r.apply(t, e)).next());
  });
var u = class {
  static get uA() {
    return navigator.userAgent.toLowerCase();
  }
  static get pf() {
    return navigator.platform.toLowerCase();
  }
  static get safari() {
    return /^((?!chrome|android).)*safari/.test(this.uA);
  }
  static get safariVersion() {
    return +(this.uA.match(/version\/[\d\.]+.*safari/) || ["-1"])[0].replace(/^version\//, "").replace(/ safari$/, "");
  }
  static get firefox() {
    return this.uA.indexOf("firefox") > -1;
  }
  static get chrome() {
    return /chrome/.test(this.uA);
  }
  static get ie() {
    return /msie|trident/.test(this.uA);
  }
  static get ieMobile() {
    return /iemobile/.test(this.uA);
  }
  static get webkit() {
    return /webkit/.test(this.uA);
  }
  static get operaMini() {
    return /opera mini/.test(this.uA);
  }
  static get edge() {
    return /edge\/\d./.test(this.uA);
  }
  static get ios() {
    return /ip(hone|[ao]d)/.test(this.uA);
  }
  static get mac() {
    return this.pf.indexOf("mac") > -1;
  }
  static get windows() {
    return this.pf.indexOf("win") > -1;
  }
  static get android() {
    return /android/.test(this.uA);
  }
  static get androidMobile() {
    return /android.*mobile/.test(this.uA);
  }
  static get blackberry() {
    return /blackberry/.test(this.uA);
  }
  static get mobile() {
    return this.ieMobile || this.blackberry || this.androidMobile || this.ios || this.operaMini;
  }
  static get mouseWheelEvent() {
    return "onmousewheel" in document;
  }
  static get wheelEvent() {
    return "onwheel" in document;
  }
  static get keydownEvent() {
    return "onkeydown" in document;
  }
  static get touchDevice() {
    return "ontouchstart" in window;
  }
  static get mutationObserver() {
    return "MutationObserver" in window;
  }
  static get resizeObserver() {
    return "ResizeObserver" in window;
  }
  static get intersectionObserver() {
    return "IntersectionObserver" in window;
  }
  static get client() {
    return typeof window < "u" && window.document !== void 0;
  }
};
function B(t, e, r, n, i) {
  return n + ((i - n) / (r - e)) * (t - e);
}
function F(t, e, r) {
  return Math.min(Math.max(t, e), r);
}
function S(t, e, r) {
  return t * (1 - r) + e * r;
}
function N(t, e = 0, r) {
  let n,
    i = 0;
  return (...a) => {
    let o = (performance || Date).now();
    i && o < i + e
      ? (clearTimeout(n),
        (n = setTimeout(function () {
          (i = o), t.apply(r, a);
        }, e)))
      : ((i = o), t.apply(r, a));
  };
}
function V(t) {
  return typeof t !== void 0 && t !== void 0;
}
function W(t) {
  return typeof t == "number";
}
function D(t) {
  return Array.isArray(t);
}
function d(t) {
  let e = typeof t;
  return !D(t) && ((e === "object" && t != null) || e === "function");
}
function y(t, ...e) {
  if (!e.length) return t;
  let r = e.shift();
  if (d(t) && d(r)) for (let n in r) d(r[n]) ? (t[n] || Object.assign(t, { [n]: {} }), y(t[n], r[n])) : Object.assign(t, { [n]: r[n] });
  return y(t, ...e);
}
function I(t) {
  let e = 0,
    r = 0;
  do (e += t.offsetLeft || 0), (r += t.offsetTop || 0), (t = t.offsetParent);
  while (t);
  return { x: e, y: r };
}
var A = class {
    constructor() {
      (this._completed = !1),
        (this.promise = new Promise((e, r) => {
          (this._resolve = e), (this._reject = r);
        }));
    }
    resolve(e) {
      if (this._completed) throw new Error("Can't resolve promise. Already completed");
      return (this._completed = !0), this._resolve(e), this.promise;
    }
    reject(e) {
      if (this._completed) throw new Error("Can't reject promise. Already completed");
      return (this._completed = !0), this._reject(e), this.promise;
    }
    get completed() {
      return this._completed;
    }
  },
  s,
  q = (() => {
    class t {
      static reset() {
        this.next = 0;
      }
      static get(r = "") {
        return r + (this.next++).toString(36);
      }
    }
    return (t.next = 0), t;
  })();
function G(t, e) {
  if (typeof AbortController < "u") {
    let r = new AbortController(),
      n = fetch(t, Object.assign({ signal: r.signal }, e));
    return (n.controller = r), n;
  }
  return fetch(t, e);
}
function H(t) {
  if (!u.client) throw new Error("URL needs to be parse on the client side");
  return s || (s = document.createElement("a")), (s.href = t), { protocol: s.protocol, host: s.host, hostname: s.hostname, port: s.port, pathname: s.pathname, search: s.search, hash: s.hash };
}
function J(t) {
  return `${t.protocol}//${t.host}${t.pathname}${t.search}${t.hash}`;
}
function E() {
  return u.mobile || window.innerWidth <= 1024;
}
function X() {
  return !E();
}
export { C as a, $ as b, R as c, L as d, P as e, T as f, U as g, u as h, B as i, F as j, S as k, N as l, V as m, W as n, y as o, I as p, A as q, G as r, H as s, J as t, E as u, X as v };
//# sourceMappingURL=chunk-J6R3XKLU.js.map
