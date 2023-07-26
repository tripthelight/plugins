import { a as g, b as H, c as O, d, e as T, f as Re, g as y, h as E, i as C, j as S, k as v, l as c, m as _e, n as Ie, o as oe, p as Me, q as V, r as A, s as Le, t as re, u as Ae } from "./chunk-NOWMIZT4.js";
import { a as we, b as Te, e as u, f as Ee, g as f, i as w, j as I, k as _, m as se, o as Se, q as Ce, u as Pe, v as R } from "./chunk-J6R3XKLU.js";
var De = `
  precision mediump float;
  #define M_PI 3.14159265358979323846
  uniform sampler2D texture;
  uniform float time;
  uniform float timeScale;
  uniform float alpha;
  uniform float noiseScale;
  uniform vec2 mousePos;
  uniform float dispersionSeed;
  uniform float dispersionScale;
  uniform vec2 boxPosition;
  uniform vec2 boxScale;
  varying vec2 vTexCoord;
  varying vec4 vVertCoord;
  vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}
  float rand(vec2 co){return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);}
  float rand(vec2 co,float l){return rand(vec2(rand(co),l));}
  float rand(vec2 co,float l,float t){return rand(vec2(rand(co,l),t));}
  float circle(vec2 pos,float radius){return 1.0-smoothstep(0.0,1.0,length(pos)+(1.0-radius));}
  float simplex(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1;
    i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz;
    x12.xy-=i1;i=mod(i,289.0);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m;
    m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0;
    vec3 h=abs(x)-0.5;
    vec3 ox=floor(x+0.5);
    vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }
  void main(){
    vec3 position=vVertCoord.xyz;
    vec2 centerPoint=position.xy-mousePos.xy;
    vec2 texCoord=(vTexCoord-boxPosition)/boxScale;
    float radius=0.7;
    float dispersion=5.0*dispersionScale;
    float dispersionSeedScale=0.6*(1.0-dispersionSeed);
    float dispersionNoise=simplex(sin(texCoord+time*timeScale*dispersionSeedScale)+time*timeScale*dispersionSeedScale)*dispersion;float scopeNoise=simplex(texCoord+time*timeScale)*0.01;
    float noiseScope=circle(centerPoint+scopeNoise,radius);
    float randNoise=rand(texCoord+mod(time*timeScale,1.0))*noiseScope*0.009;
    float simplexNoise=simplex(texCoord+time*timeScale*0.3)*noiseScope*0.12;
    vec4 image=texture2D(texture,texCoord+randNoise+simplexNoise+dispersionNoise);
    vec4 color=vec4(image.rgb,image.a*alpha);
    color.rgb+=(rand(texCoord+mod(time*timeScale,5.0))-0.5)*noiseScope;
    gl_FragColor=color;
  }
`;
var ze = `
  precision mediump float;
  attribute vec4 vertCoord;
  attribute vec2 texCoord;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform vec2 waveScale;
  uniform vec3 scale;
  uniform float time;
  uniform float frequency;
  uniform float amplitude;
  uniform float timeScale;
  varying vec2 vTexCoord;
  varying vec4 vVertCoord;
  void main(){
    vTexCoord=texCoord;
    vVertCoord=vertCoord;
    vec4 pos=vertCoord;
    float point=(pos.x*waveScale.x+pos.y*waveScale.y);
    pos.z=sin((pos.x+pos.y)*frequency+time*timeScale)*amplitude;
    gl_Position=projectionMatrix*modelViewMatrix*pos;
  }
`;
var Y = class {
  constructor(e) {
    this.ticker = new C(1 / 0);
    this.mousePosition = { x: 0, y: 0 };
    this.cursorPosition = { x: 0, y: 0 };
    this.lastCursorPosition = { x: 0, y: 0 };
    this.source = "./_static/images/logo.svg";
    this.coverPlane = !1;
    this.cursorInteraction = !1;
    this.introDispersion = { value: 1 };
    this.scrollDispersion = { value: 0 };
    this.actionDispersion = { value: 0 };
    (this.element = y(e, { observeVisibility: !0 }).update()), (this.imageElement = y(e.querySelector("img")).update()), (this.coverPlane = !!e.dataset.logoCoverPlane), (this.cursorInteraction = !!e.dataset.logoCursor), (this.source = e.dataset.logoPortrait ? "./_static/images/logo-portrait.svg" : this.source), this.init();
  }
  init() {
    return f(this, null, function* () {
      let e = yield oe.add(this.source),
        t = yield c.router.service,
        i = I(Math.random() * (Math.random() > 0.5 ? -1 : 1), -0.4, 0.4);
      (this.webgl = yield c.webgl.service),
        (this.scroller = yield c.scroller.service),
        (this.viewport = yield c.viewport.service),
        (this.image = this.webgl.image({ source: e, segments: 20, width: Math.max(this.element.offset.width, this.viewport.offset.width), height: Math.max(this.element.offset.height, this.viewport.offset.height), fragment: De, vertex: ze }, (o) => {
          o.uniform({ alpha: 0, amplitude: 0.03, frequency: 3, timeScale: 1, noiseScale: 0, mousePos: [0, 0], waveScale: [1, 1], boxPosition: [1, 1], boxScale: [1, 1], dispersionScale: this.introDispersion.value, dispersionSeed: i });
        })),
        this.updateSize(),
        this.ticker.add((o) => this.animate(o)),
        c.preloader.service.then(() => this.show()),
        (this.unlisten = T(
          oe.events.on("progress", (o) => {
            this.image.uniforms.alpha.value = o * 0.4;
          }),
          t.on(A.NAVIGATION_START, () => {
            this.hide();
          }),
          d(window, "mousemove", (o) => this.handleMouseMove(o)),
          this.cursorInteraction
            ? d(this.element.target, "mousedown", (o) => {
                v.fromTo(this.actionDispersion, { value: 0.7 }, { duration: 4e3, easing: S.Sine.out });
              })
            : void 0,
          this.cursorInteraction
            ? d(this.element.target, ["mouseup", "mouseleave"], (o) => {
                v.fromTo(
                  this.actionDispersion,
                  { value: 0 },
                  {
                    duration: 3e3,
                    easing: (r, a, n, h, l) => {
                      l = 1.70158;
                      let p = 0,
                        m = n;
                      return r == 0 ? a : (r /= h) == 1 ? a + n : (p || (p = h * 0.3), m < Math.abs(n) ? ((m = n), (l = p / 4)) : (l = (p / (2 * Math.PI)) * Math.asin(n / m)), m * Math.pow(2, -27 * r) * Math.sin(((r * h - l) * (2 * Math.PI)) / p) + n + a);
                    },
                  }
                );
              })
            : void 0,
          this.viewport.onUpdate(() => this.updateSize()),
          this.element.onUpdate(() => this.updateSize()),
          this.scroller.dom.wrapper.onUpdate(() => {
            this.element.update(), this.imageElement.update(), this.updateSize();
          }),
          this.element.onVisibilityChanged(() => {
            this.image.disabled = !this.element.visibility;
          }),
          this.scroller.onScroll((o) => {})
        )),
        this.image.loaded.then(() => {
          setTimeout(() => {
            (this.image.disabled = !this.element.visibility), this.updateSize();
          });
        });
    });
  }
  show() {
    v.fromTo(this.image.uniforms.alpha, { value: 1 }, { duration: 1e3, easing: S.Sine.out }), v.fromTo(this.introDispersion, { value: 0 }, { duration: 1500, easing: S.Quint.out });
  }
  hide() {
    v.fromTo(this.image.uniforms.alpha, { value: 0 }, { duration: 700, easing: S.Sine.out }), v.fromTo(this.introDispersion, { value: 1 }, { duration: 3e3, easing: S.Quint.out });
  }
  updateSize() {
    let e = this.viewport.offset,
      t = Math.max(this.element.offset.width, e.width),
      i = Math.max(this.element.offset.height, e.height);
    this.image.setSize({ width: t, height: i }), this.image.translate({ x: this.coverPlane ? 0 : this.element.offset.x, y: this.coverPlane ? 0 : this.element.offset.y });
  }
  animate(e = 1) {
    if (!this.element.visibility) return;
    this.updateCursorPosition();
    let t = this.viewport.offset,
      i = this.imageElement.offset,
      o = this.element.offset,
      r = this.image.uniforms.mousePos.value,
      a = this.image.uniforms.boxPosition.value,
      n = this.image.uniforms.boxScale.value,
      h = this.image.uniforms.dispersionScale,
      l = Math.max(this.element.offset.width, t.width),
      p = Math.max(this.element.offset.height, t.height),
      m = this.lastCursorPosition;
    (h.value = this.introDispersion.value + this.scrollDispersion.value + this.actionDispersion.value), (m.x = _(m.x, this.cursorPosition.x, 0.05 * e)), (m.y = _(m.y, this.cursorPosition.y, 0.05 * e)), (r[0] = this.webgl.clipSpaceX(this.coverPlane ? m.x : m.x - o.x)), (r[1] = this.webgl.clipSpaceY(this.coverPlane ? m.y : m.y - o.y)), (n[0] = i.width / l), (n[1] = i.height / p), (a[0] = this.coverPlane ? o.x / l : (i.x - o.x) / l), (a[1] = this.coverPlane ? o.y / p : (i.y - o.y) / p);
  }
  updateCursorPosition() {
    return f(this, null, function* () {
      let e = yield c.viewport.service,
        t = e.offset.width * 0.5,
        i = e.offset.height * 0.5,
        o = this.mousePosition.x + t + this.scroller.position.output.x,
        r = this.mousePosition.y + i + this.scroller.position.output.y;
      (this.cursorPosition.x = o), (this.cursorPosition.y = r);
    });
  }
  handleMouseMove(e) {
    return f(this, null, function* () {
      (this.mousePosition.x = e.clientX), (this.mousePosition.y = e.clientY);
    });
  }
  onDestroy() {
    E(this.element), this.ticker.kill(), this.webgl.remove(this.image), this.unlisten && (this.unlisten(), delete this.unlisten);
  }
};
Y = u([g({ selector: ".logo", condition: () => R() })], Y);

var U, P, z, L, ce, me, pe;
(function (s) {
  (s[(s.ARRAY_BUFFER = 1)] = "ARRAY_BUFFER"), (s[(s.ELEMENT_ARRAY_BUFFER = 2)] = "ELEMENT_ARRAY_BUFFER");
})(U || (U = {}));
var N = class {
    constructor(e = 2, t = U.ARRAY_BUFFER) {
      (this.size = e), (this.type = t), (this.data = new Float32Array());
    }
    get len() {
      return this.data.length;
    }
    get count() {
      return this.len;
    }
    update(e = this.data) {
      this.gl && this.buffer ? (e instanceof Float32Array ? (this.data = e) : (this.data = new Float32Array(e)), this.bind(), this.gl.bufferData(this.gl.ARRAY_BUFFER, this.data, this.gl.STATIC_DRAW)) : console.warn("Can't update buffer without context");
    }
    bind() {
      this.gl && this.buffer && this.gl.bindBuffer(this.type === U.ARRAY_BUFFER ? this.gl.ARRAY_BUFFER : this.gl.ELEMENT_ARRAY_BUFFER, this.buffer);
    }
    create(e) {
      if (((this.gl = e), this.buffer)) throw new Error("Buffer already attached");
      this.buffer = e.createBuffer();
    }
    destroy(e) {
      e && this.buffer && (e.deleteBuffer(this.buffer), (this.buffer = void 0));
    }
  },
  K = class extends N {
    constructor() {
      super(2, U.ARRAY_BUFFER);
    }
    get count() {
      return 0;
    }
  },
  fe = class extends N {
    constructor(e = 3) {
      super(e, U.ARRAY_BUFFER), (this.size = e);
    }
    get count() {
      return this.len / this.size;
    }
  };
(function (s) {
  (s[(s.MAT2 = 1)] = "MAT2"), (s[(s.MAT3 = 2)] = "MAT3"), (s[(s.MAT4 = 4)] = "MAT4"), (s[(s.VEC2 = 8)] = "VEC2"), (s[(s.VEC3 = 16)] = "VEC3"), (s[(s.VEC4 = 32)] = "VEC4"), (s[(s.FLOAT = 64)] = "FLOAT"), (s[(s.INT = 128)] = "INT");
})(P || (P = {})),
  (function (s) {
    (s[(s.NUM = 192)] = "NUM"), (s[(s.VEC = 56)] = "VEC"), (s[(s.MAT = 7)] = "MAT");
  })(z || (z = {}));
var X = class {
  constructor(e, t, i) {
    (this.gl = e), (this.vertex = t), (this.fragment = i), (this.attribLocations = new Map()), (this.uniformLocations = new Map()), (this.uniformValueCache = new Map()), (this.buffers = new Set()), (this.program = this.gl.createProgram());
  }
  create() {
    if (!this.program) throw new Error("Couldn't initialize Program");
    let e = this.gl;
    if (((this.vertexShader = this.createShader(e.VERTEX_SHADER, this.vertex)), (this.fragmentShader = this.createShader(e.FRAGMENT_SHADER, this.fragment)), e.attachShader(this.program, this.vertexShader), e.attachShader(this.program, this.fragmentShader), e.linkProgram(this.program), !e.getProgramParameter(this.program, e.LINK_STATUS))) {
      let t = e.getProgramInfoLog(this.program);
      throw new Error(`Error while creating shader program: ${t}`);
    }
  }
  registerAttrib(e) {
    if (!this.program) throw new Error("Program not initialized yet");
    let t = this.gl.getAttribLocation(this.program, e);
    return this.attribLocations.set(e, t), t;
  }
  updateAttrib(e, t) {
    let i = this.attribLocations.get(e),
      o = this.gl;
    return i || (i = this.registerAttrib(e)), t.bind(), o.vertexAttribPointer(i, t.size, o.FLOAT, !1, 0, 0), o.enableVertexAttribArray(i), t.count;
  }
  registerUniform(e) {
    if (!this.program) throw new Error("Program not initialized yet");
    let t = this.gl.getUniformLocation(this.program, e);
    if (t) return this.uniformLocations.set(e, t), t;
  }
  updateUniform(e, t) {
    let i = t.value,
      o = !(z.NUM & t.type),
      r = this.uniformLocations.get(e),
      a = o ? this.uniformValueCache.get(e) : null;
    if ((r || (r = this.registerUniform(e)), !a && o)) {
      let n = 0;
      typeof i != "object" || i instanceof Array ? i.length !== void 0 && (n = i.length) : (n = Object.keys(i).length);
      let h = [];
      for (let l = 0; l < n; l++) h.push(0);
      (a = new Float32Array(h)), this.uniformValueCache.set(e, a);
    }
    if ((!a || typeof i != "object" || i instanceof Array || (typeof i.x == "number" && (a[0] = i.x), typeof i.y == "number" && (a[1] = i.y), typeof i.z == "number" && (a[2] = i.z), typeof i.w == "number" && (a[3] = i.w)), a && i.length !== void 0)) for (let n = 0, h = i.length; n < h; n++) a[n] = i[n];
    if ((o && (i = a), z.MAT & t.type)) {
      let n = `uniformMatrix${P[t.type].slice(-1)}fv`;
      this.gl[n](r, !1, i);
    } else if (z.VEC & t.type) {
      let n = `uniform${P[t.type].slice(-1)}${P.INT & t.type ? "i" : "f"}v`;
      this.gl[n](r, i);
    } else if (z.NUM & t.type) {
      let n = `uniform1${P.INT & t.type ? "i" : "f"}`;
      this.gl[n](r, i);
    }
  }
  destroy(e) {
    this.program && e.deleteProgram(this.program),
      this.vertexShader && e.deleteShader(this.vertexShader),
      this.fragmentShader && e.deleteShader(this.fragmentShader),
      this.attribLocations.forEach((t) => {
        e.disableVertexAttribArray(t);
      }),
      this.attribLocations.clear();
  }
  use() {
    if (!this.program) throw new Error("Program not ready yet");
    this.gl.useProgram(this.program);
  }
  createShader(e, t) {
    let i = this.gl.createShader(e);
    if (!i) throw new Error("Failed to create shader");
    if ((this.gl.shaderSource(i, t), this.gl.compileShader(i), !this.gl.getShaderParameter(i, this.gl.COMPILE_STATUS))) {
      let o = this.gl.getShaderInfoLog(i);
      throw (this.gl.deleteShader(i), new Error(`Shader compile failed: ${o}`));
    }
    return i;
  }
};
function xe(s, e, t = { x: 0, y: 0 }, i = L.VERTEX) {
  let o = s.x,
    r = s.y,
    a = e.width / o,
    n = e.height / r,
    h = i === L.TEXTURE ? n : -n,
    l = [];
  for (let p = 0; p < r; p++) {
    let m = t.y + (i === L.TEXTURE ? p * n : -p * n);
    for (let b = 0; b < o; b++) {
      let x = t.x + b * a;
      l.push(x, m + h, x, m, x + a, m + h, x + a, m + h, x, m, x + a, m);
    }
  }
  return l;
}
function ke() {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}
function Xe(s, e) {
  return e[0] !== void 0 && (s[12] = e[0]), e[1] !== void 0 && (s[13] = e[1]), e[2] !== void 0 && (s[15] = e[2]), s;
}
function he(s, e) {
  let t = e[0] || 0,
    i = e[1] || 0,
    o = e[2] || 0;
  return (s[12] = s[0] * t + s[4] * i + s[8] * o + s[12]), (s[13] = s[1] * t + s[5] * i + s[9] * o + s[13]), (s[14] = s[2] * t + s[6] * i + s[10] * o + s[14]), (s[15] = s[3] * t + s[7] * i + s[11] * o + s[15]), s;
}
function Fe(s) {
  return [Math.hypot(s[0], s[1], s[2]), Math.hypot(s[4], s[5], s[6]), Math.hypot(s[8], s[9], s[10])];
}
(function (s) {
  (s[(s.VERTEX = 1)] = "VERTEX"), (s[(s.TEXTURE = 2)] = "TEXTURE");
})(L || (L = {})),
  (function (s) {
    (s[(s.POINTS = 0)] = "POINTS"), (s[(s.LINES = 1)] = "LINES"), (s[(s.LINE_STRIP = 2)] = "LINE_STRIP"), (s[(s.LINE_LOOP = 3)] = "LINE_LOOP"), (s[(s.TRIANGLES = 4)] = "TRIANGLES"), (s[(s.TRIANGLE_STRIP = 5)] = "TRIANGLE_STRIP"), (s[(s.TRIANGLE_FAN = 6)] = "TRIANGLE_FAN");
  })(ce || (ce = {})),
  (function (s) {
    s.BEFORE_RECALC = "beforerecalc";
  })(me || (me = {}));
var de = class extends O {
    constructor(e, t = {}) {
      super(), (this.viewport = e), (this.config = t), (this.animating = !1), (this.disabled = !1), (this._buffers = {}), (this._uniforms = {}), (this.model = ke()), (this._uniforms.time = { type: P.FLOAT, value: 0 }), (this._uniforms.modelViewMatrix = { type: P.MAT4, value: this.model }), t.uniforms && (this._uniforms = Object.assign(this._uniforms, t.uniforms));
    }
    render(e = 0) {
      if (!this.disabled && this.animating) {
        let t = 0;
        this.program.use();
        for (let o in this._buffers)
          if (this._buffers.hasOwnProperty(o)) {
            let r = this._buffers[o];
            r instanceof N && (t += this.program.updateAttrib(o, r));
          }
        for (let o in this._uniforms)
          if (this._uniforms.hasOwnProperty(o)) {
            let r = this._uniforms[o];
            o === "time" && (r.value = e / 1e3), this.program.updateUniform(o, r);
          }
        let i = this.config.drawMode !== void 0 ? this.config.drawMode : ce.TRIANGLES;
        this.beforeDraw(), this.viewport.gl.drawArrays(i, 0, t), this.afterDraw();
      }
    }
    recalc() {
      this.emit(me.BEFORE_RECALC);
      for (let e in this._buffers) this._buffers.hasOwnProperty(e) && this._buffers[e].update();
    }
    get uniforms() {
      return this._uniforms;
    }
    get buffers() {
      return this._buffers;
    }
    create() {
      (this._uniforms.projectionMatrix = { type: P.MAT4, value: this.viewport.projection }), this.program.create();
      for (let e in this._buffers) this._buffers.hasOwnProperty(e) && this._buffers[e].create(this.viewport.gl);
      return this.recalc(), this.onCreate(), (this.animating = !0), this;
    }
    destroy(e) {
      (this.animating = !1), delete this._uniforms.projectionMatrix, this.program.destroy(e.gl);
      for (let t in this._buffers) this._buffers.hasOwnProperty(t) && this._buffers[t].destroy(e.gl);
      this.onDestroy();
    }
    uniform(e, t) {
      if (typeof e == "object") {
        for (let o in e) e.hasOwnProperty(o) && this.uniform(o, e[o]);
        return this;
      }
      let i = P.FLOAT;
      if (t instanceof Array)
        switch (t.length) {
          case 2:
            i = P.VEC2;
            break;
          case 3:
            i = P.VEC3;
            break;
          case 4:
            i = P.VEC4;
        }
      return (this._uniforms[e] = { type: i, value: t }), this;
    }
    beforeDraw() {}
    afterDraw() {}
    onCreate() {}
    onDestroy() {}
  },
  F = class extends de {
    constructor(e, t) {
      super(e, t),
        (this.viewport = e),
        (this.config = t),
        (this.buffers.vertCoord = new fe(2)),
        (this.program = new X(
          e.gl,
          t.vertex ||
            `
        attribute vec4 vertCoord;

        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;

        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vertCoord;
        }
      `,
          t.fragment ||
            `
        precision highp float;
        uniform vec3 color;

        void main() {
          gl_FragColor = vec4(
            color.r / 255.0,
            color.g / 255.0,
            color.b / 255.0,
            1.0
          );
        }
      `
        ));
    }
    onCreate() {
      super.onCreate(),
        this.config.element &&
          ((this.observable = y(this.config.element, { observeResize: !0, observeVisibility: !0 })),
          (this.unlistenElement = T(
            this.observable.onUpdate((e) => {
              this.setSize(e.offset), this.translate(e.offset);
            }),
            this.config.elementCulling !== !1 ? this.observable.onVisibilityChanged(() => this.checkVisibility()) : void 0
          )),
          setTimeout(() => this.checkVisibility()));
    }
    checkVisibility() {
      this.observable && (this.disabled = !this.observable.visibility);
    }
    onDestroy() {
      super.onDestroy(), this.unlistenElement && (this.unlistenElement(), delete this.unlistenElement), this.observable && E(this.observable);
    }
    element(e) {
      this.config.element = e;
    }
    setSize(e) {
      let t = !1;
      typeof e.width == "number" && (e.width !== this.config.width && (t = !0), (this.config.width = e.width)), typeof e.height == "number" && (e.height !== this.config.height && (t = !0), (this.config.height = e.height)), t && this.config.autoResize !== !1 && this.recalc();
    }
    get x() {
      return this.config.x || 0;
    }
    get y() {
      return this.config.y || 0;
    }
    get width() {
      return this.config.width || 0;
    }
    get height() {
      return this.config.height || 0;
    }
    get scaling() {
      let [e, t] = Fe(this.model);
      return { x: e, y: t };
    }
    get translation() {
      return { x: this.config.x, y: this.config.y };
    }
    scale(e, t) {
      let i = Fe(this.model),
        o = e / i[0],
        r = t / i[1];
      (function (a, n) {
        let h = n[0],
          l = n[1],
          p = n[2];
        (a[0] *= h), (a[1] *= h), (a[2] *= h), (a[3] *= h), (a[4] *= l), (a[5] *= l), (a[6] *= l), (a[7] *= l), (a[8] *= p), (a[9] *= p), (a[10] *= p), (a[11] *= p);
      })(this.model, [o, r, 1]);
    }
    translate(e) {
      typeof e.x == "number" && Xe(this.model, [this.viewport.getClipSpaceX((this.config.x = e.x))]), typeof e.y == "number" && Xe(this.model, [void 0, this.viewport.getClipSpaceY((this.config.y = e.y))]);
    }
    get segments() {
      return typeof this.config.segments == "number" ? { x: this.config.segments, y: this.config.segments } : this.config.segments instanceof Object ? this.config.segments : { x: 5, y: 5 };
    }
    recalc() {
      super.recalc(), this.observable ? (this.translate(this.observable.offset), this.setSize(this.observable.offset)) : this.translate({ x: this.config.x || 0, y: this.config.y || 0 }), this.buffers.vertCoord.update(xe(this.segments, this.viewport.getClipsSpaceSize(this.config.width || 0, this.config.height || 0)));
    }
  };
(function (s) {
  s.LOADEND = "loadend";
})(pe || (pe = {}));
var ue = class extends F {
    constructor(e, t) {
      super(e, t),
        (this.viewport = e),
        (this.config = t),
        (this.loadResolver = new Ce()),
        (this.imageLoading = !1),
        (this.program = new X(
          e.gl,
          t.vertex ||
            `
        attribute vec4 vertCoord;
        attribute vec2 texCoord;

        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;

        varying vec2 vTexCoord;

        void main() {
          vTexCoord = texCoord;
          gl_Position = projectionMatrix * modelViewMatrix * vertCoord;
        }
      `,
          t.fragment ||
            `
        precision mediump float;

        uniform sampler2D image;
        uniform float time;

        varying vec2 vTexCoord;

        void main() {
          gl_FragColor = texture2D(image, vTexCoord);
        }
      `
        )),
        (this.buffers.texCoord = new K()),
        (this.image = new Image()),
        (this.image.crossOrigin = "anonymous"),
        d(this.image, "load", () => this.handleLoad()),
        t.autoLoad !== !1 && this.load();
    }
    handleLoad() {
      if ((this.emit(pe.LOADEND), this.loadResolver.resolve(), this.setSize(this.imageSize), this.texture)) {
        let e = this.viewport.gl,
          t = this.image;
        e.bindTexture(e.TEXTURE_2D, this.texture), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t), e.bindTexture(e.TEXTURE_2D, null), this.recalc();
      }
    }
    get imageSize() {
      return { width: this.image.naturalWidth, height: this.image.naturalHeight };
    }
    isLoading() {
      return this.imageLoading;
    }
    get loaded() {
      return this.loadResolver.promise;
    }
    isLoaded() {
      return this.loadResolver.completed;
    }
    load() {
      return this.imageLoading || this.loadResolver.completed || ((this.imageLoading = !0), (this.image.src = this.config.source)), this.loadResolver.promise;
    }
    beforeDraw() {
      if (this.texture) {
        let e = this.viewport.gl;
        e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, this.texture);
      }
    }
    recalc() {
      if ((super.recalc(), this.texture)) {
        let e = this.viewport.gl;
        e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, this.texture), this.buffers.texCoord.update(xe(this.segments, { width: 1, height: 1 }, { x: 0, y: 0 }, L.TEXTURE));
      }
    }
    onCreate() {
      super.onCreate(), (this.texture = this.viewport.gl.createTexture());
    }
    onDestroy() {
      super.onCreate(), this.texture && this.viewport.gl.deleteTexture(this.texture);
    }
  },
  le = { fov: 45, color: [0, 0, 0], posZ: -3, alpha: !0, antialias: !0, premultipliedAlpha: !0, pixelRatio: 1, depth: !0 },
  k;
(function (s) {
  (s.RESIZE = "resize"), (s.SCROLL = "scroll");
})(k || (k = {}));
var ve = class extends O {
    constructor(e, t = le) {
      super(), (this.element = e), (this._projection = ke()), (this._scrollPosition = { x: 0, y: 0 }), (this.size = { width: 0, height: 0 }), (this.config = Object.assign(Object.assign({}, le), t));
      let i = this.element.getContext("webgl2", this.config) || this.element.getContext("webgl") || this.element.getContext("webgl-experimental");
      if (!i) throw new Error("WebGL not supported");
      this._gl = i;
    }
    get scrollPosition() {
      return this._scrollPosition;
    }
    get gl() {
      return this._gl;
    }
    get aspect() {
      return this.size.width / this.size.height;
    }
    get projection() {
      return this._projection;
    }
    get width() {
      return this.size.width;
    }
    get height() {
      return this.size.height;
    }
    render() {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    getClipSpaceX(e) {
      let t = 0.5 * this.viewSize.width;
      return w((e / this.width) * 2 - 1, -1, 1, -t, t);
    }
    getClipSpaceY(e) {
      let t = 0.5 * this.viewSize.height;
      return w((e / this.height) * -1 * 2 + 1, -1, 1, -t, t);
    }
    getClipsSpaceCoord(e, t) {
      return { x: this.getClipSpaceX(e), y: this.getClipSpaceY(t) };
    }
    getClipsSpaceSize(e, t) {
      return { width: this.getClipSpaceWidth(e), height: this.getClipSpaceHeight(t) };
    }
    getClipSpaceWidth(e) {
      return (e / this.width) * this.viewSize.width;
    }
    getClipSpaceHeight(e) {
      return (e / this.height) * this.viewSize.height;
    }
    attach() {
      this.setSize(se(this.config.width) ? this.config.width : this.element.offsetWidth, se(this.config.height) ? this.config.height : this.element.offsetHeight);
      let e = this.config.color || [0, 0, 0],
        t = this.config.alpha;
      this.gl.enable(this.gl.CULL_FACE), this.gl.cullFace(this.gl.FRONT), this.gl.enable(this.gl.BLEND), this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA), this.gl.clearColor(e[0], e[1], e[2], t ? 0 : 1), this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    get pixelRatio() {
      return this.config.pixelRatio || window.devicePixelRatio || 1;
    }
    get fov() {
      return this.config.fov || le.fov;
    }
    setSize(e, t) {
      (this.size.width = e), (this.size.height = t), (this.element.width = e * this.pixelRatio), (this.element.height = t * this.pixelRatio), (this.element.style.width = `${e}px`), (this.element.style.height = `${t}px`), this.updateProjection(), this.gl.viewport(0, 0, e, t), this.emit(k.RESIZE, Object.assign({}, this.size));
    }
    scrollTo(e) {
      typeof e.x == "number" && (he(this._projection, [this.getClipSpaceWidth(this._scrollPosition.x - e.x)]), (this._scrollPosition.x = e.x)), typeof e.y == "number" && (he(this._projection, [void 0, this.getClipSpaceHeight(e.y - this._scrollPosition.y)]), (this._scrollPosition.y = e.y)), this.emit(k.SCROLL, this._scrollPosition);
    }
    get viewSize() {
      let e = (this.config.fov * Math.PI) / 180,
        t = 2 * Math.tan(e / 2) * Math.abs(this.config.posZ);
      return { width: t * this.aspect, height: t };
    }
    updateProjection() {
      var e;
      (this._projection = (function (t, i, o, r, a) {
        let n = 1 / Math.tan(i / 2);
        (t[0] = n / o), (t[5] = n), (t[11] = -1), (t[1] = t[2] = t[3] = t[4] = t[6] = 0), (t[7] = t[8] = t[9] = t[15] = 0);
        {
          let h = -0.01001001001001001;
          (t[10] = 100.1 * h), (t[14] = 20 * h);
        }
        return t;
      })((((e = this._projection)[0] = e[5] = e[10] = e[15] = 1), (e[1] = e[2] = e[3] = 0), (e[4] = e[6] = e[7] = 0), (e[8] = e[9] = e[11] = 0), (e[12] = e[13] = e[14] = 0), e), (this.config.fov * Math.PI) / 180, this.aspect)),
        he(this._projection, [this.getClipSpaceWidth(this._scrollPosition.x), this.getClipSpaceHeight(this._scrollPosition.y), this.config.posZ]);
    }
  },
  J = class {
    constructor(e = {}) {
      (this.config = e), (this.meshes = []), (this.paused = !1), (this.lastTime = 0), (this.ticker = e.ticker || new C(1 / 0)), (this.viewport = new ve(this.initCanvas(e.canvas), e)), e.autoCreate !== !1 && this.create();
    }
    create() {
      if (this.config.fullscreen !== !1) {
        let e = this.viewport.element.style;
        (e.pointerEvents = "none"),
          (e.position = "fixed"),
          (e.left = "0px"),
          (e.top = "0px"),
          (this.unlistenResize = y(window).onUpdate((t) => {
            this.setSize(t.offset.width, t.offset.height);
          }));
      }
      this.viewport.on(k.RESIZE, () => this.recalc()),
        this.viewport.attach(),
        this.ticker.add((e, t) => {
          this.paused ? (this.lastTime = t) : this.render(t);
        });
    }
    destroy() {
      this.unlistenResize && (this.unlistenResize(), delete this.unlistenResize), this.ticker.kill();
    }
    initCanvas(e) {
      if (e instanceof HTMLCanvasElement) return e;
      if (typeof e == "string") return document.querySelector(e);
      let t = document.createElement("canvas");
      return document.body.prepend(t), t;
    }
    get vp() {
      return this.viewport;
    }
    get gl() {
      return this.viewport.gl;
    }
    setSize(e, t) {
      this.viewport.setSize(e, t);
    }
    clipSpaceX(e) {
      return this.viewport.getClipSpaceX(e);
    }
    clipSpaceY(e) {
      return this.viewport.getClipSpaceY(e);
    }
    clipSpaceW(e) {
      return this.viewport.getClipSpaceWidth(e);
    }
    clipSpaceH(e) {
      return this.viewport.getClipSpaceHeight(e);
    }
    scrollTo(e) {
      this.viewport.scrollTo(e);
    }
    recalc() {
      for (let e = 0, t = this.meshes.length; e < t; e++) this.meshes[e].recalc();
    }
    pause(e = !0) {
      this.paused = e;
    }
    add(...e) {
      return e.forEach((t) => this.meshes.push(t.create())), this;
    }
    remove(e) {
      let t = this.meshes.indexOf(e);
      return t > -1 && this.meshes.splice(t, 1).forEach((i) => i.destroy(this.viewport)), this;
    }
    render(e) {
      this.meshes = this.meshes.sort((i, o) => o.model[14] - i.model[14]);
      let t = this.meshes.filter((i) => !i.disabled);
      if (t.length > 0) {
        this.viewport.render();
        for (let i = 0, o = t.length; i < o; i++) t[i].render(e ?? this.lastTime);
      }
      this.lastTime = e ?? this.lastTime;
    }
    createMesh(e, t, i) {
      let o = new e(this.viewport, t);
      return typeof i == "function" && i(o), this.add(o), o;
    }
    plane(e, t) {
      return this.createMesh(F, e, t);
    }
    video(e, t) {
      return this.createMesh(ge, e, t);
    }
    image(e, t) {
      return this.createMesh(ue, e, t);
    }
  };
var ee = class extends Ae {
  init() {
    return f(this, null, function* () {
      yield Promise.all([Ee(ee.prototype, this, "init").call(this), this.initWebGL()]);
    });
  }
  initWebGL() {
    return f(this, null, function* () {
      if (Pe()) return;
      let e = yield c.scroller.service,
        t = yield c.router.service,
        i = new J();
      e.on(re.LERP_CONTENT_START, () => i.pause(!0)),
        e.on(re.LERP_CONTENT_END, () => i.pause(!1)),
        t.outlet &&
          t.outlet.on(V.CONTENT_AFTER_ENTER_END, () => {
            i.pause(!1);
          }),
        e.onScroll((o) => {
          i.scrollTo(o), i.render();
        }),
        c.webgl.resolve(i);
    });
  }
};
export { ee as AppExtended };
//# sourceMappingURL=app-extended-PZQQG42T.js.map
