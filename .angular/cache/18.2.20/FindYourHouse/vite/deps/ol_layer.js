import {
  BaseVector_default,
  BooleanType,
  BuilderGroup_default,
  CallExpression,
  ColorType,
  DECLUTTER,
  ExecutorGroup_default,
  Graticule_default,
  Group_default,
  HIT_DETECT_RESOLUTION,
  NumberArrayType,
  NumberType,
  Ops,
  SizeType,
  StringType,
  VectorLayer_default,
  Vector_default,
  buildExpression,
  computeGeometryType,
  createHitDetectionImageData,
  getSquaredTolerance,
  hitDetect,
  newEvaluationContext,
  newParsingContext,
  parse,
  renderFeature,
  typeName
} from "./chunk-JPCIVJDY.js";
import "./chunk-XGFWOALX.js";
import {
  BaseTile_default,
  DataTile_default,
  ImageLayer_default,
  Image_default,
  LRUCache_default,
  TileLayer_default,
  TileProperty_default,
  Tile_default,
  Tile_default2,
  asArrayLike,
  asImageLike,
  create as create2,
  createOrUpdate,
  fromResolutionLike,
  fromTransform,
  getKey
} from "./chunk-WJTL4NSK.js";
import {
  EventType_default as EventType_default2,
  Event_default,
  Feature_default2 as Feature_default,
  ImageCanvas_default,
  ImageTile_default,
  Layer_default,
  Layer_default3 as Layer_default2,
  Property_default,
  RBush,
  TileRange_default,
  TileState_default,
  VectorEventType_default,
  ViewHint_default,
  ZIndexContext_default
} from "./chunk-V7YDAVNZ.js";
import {
  ImageState_default,
  SAFARI_BUG_237906,
  asArray,
  createCanvasContext2D,
  toSize
} from "./chunk-XOFNBNO4.js";
import {
  apply,
  compose,
  create,
  inflateEnds,
  makeInverse,
  multiply,
  reset,
  rotate,
  scale,
  setFromArray,
  transform2D,
  translate
} from "./chunk-KCQC7TLX.js";
import {
  Disposable_default,
  EventType_default,
  Target_default,
  abstract,
  ascending,
  assert,
  descending,
  equals as equals2,
  getUid,
  listen,
  unlistenByKey
} from "./chunk-EEDHQZUN.js";
import {
  boundingExtent,
  buffer,
  containsCoordinate,
  containsExtent,
  createEmpty,
  equals,
  fromUserCoordinate,
  fromUserExtent,
  getHeight,
  getIntersection,
  getRotatedViewport,
  getTopLeft,
  getTransformFromProjections,
  getUserProjection,
  getWidth,
  intersects,
  isEmpty,
  scaleFromCenter,
  toUserExtent,
  toUserResolution,
  wrapX2 as wrapX
} from "./chunk-EZV53CNN.js";
import {
  clamp,
  clear
} from "./chunk-ASEIJJKF.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-4HK4SLYA.js";

// node_modules/ol/webgl.js
var ARRAY_BUFFER = 34962;
var ELEMENT_ARRAY_BUFFER = 34963;
var STREAM_DRAW = 35040;
var STATIC_DRAW = 35044;
var DYNAMIC_DRAW = 35048;
var UNSIGNED_BYTE = 5121;
var UNSIGNED_SHORT = 5123;
var UNSIGNED_INT = 5125;
var FLOAT = 5126;
var CONTEXT_IDS = ["experimental-webgl", "webgl", "webkit-3d", "moz-webgl"];
function getContext(canvas, attributes) {
  attributes = Object.assign({
    preserveDrawingBuffer: true,
    antialias: SAFARI_BUG_237906 ? false : true
    // https://bugs.webkit.org/show_bug.cgi?id=237906
  }, attributes);
  const ii = CONTEXT_IDS.length;
  for (let i = 0; i < ii; ++i) {
    try {
      const context = canvas.getContext(CONTEXT_IDS[i], attributes);
      if (context) {
        return (
          /** @type {!WebGLRenderingContext} */
          context
        );
      }
    } catch (e) {
    }
  }
  return null;
}

// node_modules/ol/webgl/Buffer.js
var BufferUsage = {
  STATIC_DRAW,
  STREAM_DRAW,
  DYNAMIC_DRAW
};
var WebGLArrayBuffer = class {
  /**
   * @param {number} type Buffer type, either ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER.
   * @param {number} [usage] Intended usage, either `STATIC_DRAW`, `STREAM_DRAW` or `DYNAMIC_DRAW`.
   * Default is `STATIC_DRAW`.
   */
  constructor(type, usage) {
    this.array_ = null;
    this.type_ = type;
    assert(type === ARRAY_BUFFER || type === ELEMENT_ARRAY_BUFFER, "A `WebGLArrayBuffer` must either be of type `ELEMENT_ARRAY_BUFFER` or `ARRAY_BUFFER`");
    this.usage_ = usage !== void 0 ? usage : BufferUsage.STATIC_DRAW;
  }
  /**
   * Populates the buffer with an array of the given size (all values will be zeroes).
   * @param {number} size Array size
   * @return {WebGLArrayBuffer} This
   */
  ofSize(size) {
    this.array_ = new (getArrayClassForType(this.type_))(size);
    return this;
  }
  /**
   * Populates the buffer with an array of the given size.
   * @param {Array<number>} array Numerical array
   * @return {WebGLArrayBuffer} This
   */
  fromArray(array) {
    this.array_ = getArrayClassForType(this.type_).from(array);
    return this;
  }
  /**
   * Populates the buffer with a raw binary array buffer.
   * @param {ArrayBuffer} buffer Raw binary buffer to populate the array with. Note that this buffer must have been
   * initialized for the same typed array class.
   * @return {WebGLArrayBuffer} This
   */
  fromArrayBuffer(buffer2) {
    this.array_ = new (getArrayClassForType(this.type_))(buffer2);
    return this;
  }
  /**
   * @return {number} Buffer type.
   */
  getType() {
    return this.type_;
  }
  /**
   * Will return null if the buffer was not initialized
   * @return {Float32Array|Uint32Array|null} Array.
   */
  getArray() {
    return this.array_;
  }
  /**
   * @param {Float32Array|Uint32Array} array Array.
   */
  setArray(array) {
    const ArrayType = getArrayClassForType(this.type_);
    if (!(array instanceof ArrayType)) {
      throw new Error("Expected ".concat(ArrayType));
    }
    this.array_ = array;
  }
  /**
   * @return {number} Usage.
   */
  getUsage() {
    return this.usage_;
  }
  /**
   * Will return 0 if the buffer is not initialized
   * @return {number} Array size
   */
  getSize() {
    return this.array_ ? this.array_.length : 0;
  }
};
function getArrayClassForType(type) {
  switch (type) {
    case ARRAY_BUFFER:
      return Float32Array;
    case ELEMENT_ARRAY_BUFFER:
      return Uint32Array;
    default:
      return Float32Array;
  }
}
var Buffer_default = WebGLArrayBuffer;

// node_modules/ol/webgl/ContextEventType.js
var ContextEventType_default = {
  LOST: "webglcontextlost",
  RESTORED: "webglcontextrestored"
};

// node_modules/ol/webgl/PostProcessingPass.js
var DEFAULT_VERTEX_SHADER = "\n  precision mediump float;\n\n  attribute vec2 a_position;\n  varying vec2 v_texCoord;\n  varying vec2 v_screenCoord;\n\n  uniform vec2 u_screenSize;\n\n  void main() {\n    v_texCoord = a_position * 0.5 + 0.5;\n    v_screenCoord = v_texCoord * u_screenSize;\n    gl_Position = vec4(a_position, 0.0, 1.0);\n  }\n";
var DEFAULT_FRAGMENT_SHADER = "\n  precision mediump float;\n\n  uniform sampler2D u_image;\n  uniform float u_opacity;\n\n  varying vec2 v_texCoord;\n\n  void main() {\n    gl_FragColor = texture2D(u_image, v_texCoord) * u_opacity;\n  }\n";
var WebGLPostProcessingPass = class {
  /**
   * @param {Options} options Options.
   */
  constructor(options) {
    this.gl_ = options.webGlContext;
    const gl = this.gl_;
    this.scaleRatio_ = options.scaleRatio || 1;
    this.renderTargetTexture_ = gl.createTexture();
    this.renderTargetTextureSize_ = null;
    this.frameBuffer_ = gl.createFramebuffer();
    this.depthBuffer_ = gl.createRenderbuffer();
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, options.vertexShader || DEFAULT_VERTEX_SHADER);
    gl.compileShader(vertexShader);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, options.fragmentShader || DEFAULT_FRAGMENT_SHADER);
    gl.compileShader(fragmentShader);
    this.renderTargetProgram_ = gl.createProgram();
    gl.attachShader(this.renderTargetProgram_, vertexShader);
    gl.attachShader(this.renderTargetProgram_, fragmentShader);
    gl.linkProgram(this.renderTargetProgram_);
    this.renderTargetVerticesBuffer_ = gl.createBuffer();
    const verticesArray = [-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1];
    gl.bindBuffer(gl.ARRAY_BUFFER, this.renderTargetVerticesBuffer_);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesArray), gl.STATIC_DRAW);
    this.renderTargetAttribLocation_ = gl.getAttribLocation(this.renderTargetProgram_, "a_position");
    this.renderTargetUniformLocation_ = gl.getUniformLocation(this.renderTargetProgram_, "u_screenSize");
    this.renderTargetOpacityLocation_ = gl.getUniformLocation(this.renderTargetProgram_, "u_opacity");
    this.renderTargetTextureLocation_ = gl.getUniformLocation(this.renderTargetProgram_, "u_image");
    this.uniforms_ = [];
    options.uniforms && Object.keys(options.uniforms).forEach((name) => {
      this.uniforms_.push({
        value: options.uniforms[name],
        location: gl.getUniformLocation(this.renderTargetProgram_, name)
      });
    });
  }
  getRenderTargetTexture() {
    return this.renderTargetTexture_;
  }
  /**
   * Get the WebGL rendering context
   * @return {WebGLRenderingContext} The rendering context.
   */
  getGL() {
    return this.gl_;
  }
  /**
   * Initialize the render target texture of the post process, make sure it is at the
   * right size and bind it as a render target for the next draw calls.
   * The last step to be initialized will be the one where the primitives are rendered.
   * @param {import("../Map.js").FrameState} frameState current frame state
   */
  init(frameState) {
    const gl = this.getGL();
    const textureSize = [gl.drawingBufferWidth * this.scaleRatio_, gl.drawingBufferHeight * this.scaleRatio_];
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.getFrameBuffer());
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.getDepthBuffer());
    gl.viewport(0, 0, textureSize[0], textureSize[1]);
    if (!this.renderTargetTextureSize_ || this.renderTargetTextureSize_[0] !== textureSize[0] || this.renderTargetTextureSize_[1] !== textureSize[1]) {
      this.renderTargetTextureSize_ = textureSize;
      const level = 0;
      const internalFormat = gl.RGBA;
      const border = 0;
      const format = gl.RGBA;
      const type = gl.UNSIGNED_BYTE;
      const data = null;
      gl.bindTexture(gl.TEXTURE_2D, this.renderTargetTexture_);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, textureSize[0], textureSize[1], border, format, type, data);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.renderTargetTexture_, 0);
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, textureSize[0], textureSize[1]);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer_);
    }
  }
  /**
   * Render to the next postprocessing pass (or to the canvas if final pass).
   * @param {import("../Map.js").FrameState} frameState current frame state
   * @param {WebGLPostProcessingPass} [nextPass] Next pass, optional
   * @param {function(WebGLRenderingContext, import("../Map.js").FrameState):void} [preCompose] Called before composing.
   * @param {function(WebGLRenderingContext, import("../Map.js").FrameState):void} [postCompose] Called before composing.
   */
  apply(frameState, nextPass, preCompose, postCompose) {
    const gl = this.getGL();
    const size = frameState.size;
    gl.bindFramebuffer(gl.FRAMEBUFFER, nextPass ? nextPass.getFrameBuffer() : null);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.renderTargetTexture_);
    if (!nextPass) {
      const canvasId = getUid(gl.canvas);
      if (!frameState.renderTargets[canvasId]) {
        const attributes = gl.getContextAttributes();
        if (attributes && attributes.preserveDrawingBuffer) {
          gl.clearColor(0, 0, 0, 0);
          gl.clearDepth(1);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
        frameState.renderTargets[canvasId] = true;
      }
    }
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.renderTargetVerticesBuffer_);
    gl.useProgram(this.renderTargetProgram_);
    gl.enableVertexAttribArray(this.renderTargetAttribLocation_);
    gl.vertexAttribPointer(this.renderTargetAttribLocation_, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(this.renderTargetUniformLocation_, size[0], size[1]);
    gl.uniform1i(this.renderTargetTextureLocation_, 0);
    const opacity = frameState.layerStatesArray[frameState.layerIndex].opacity;
    gl.uniform1f(this.renderTargetOpacityLocation_, opacity);
    this.applyUniforms(frameState);
    if (preCompose) {
      preCompose(gl, frameState);
    }
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    if (postCompose) {
      postCompose(gl, frameState);
    }
  }
  /**
   * @return {WebGLFramebuffer} Frame buffer
   */
  getFrameBuffer() {
    return this.frameBuffer_;
  }
  /**
   * @return {WebGLRenderbuffer} Depth buffer
   */
  getDepthBuffer() {
    return this.depthBuffer_;
  }
  /**
   * Sets the custom uniforms based on what was given in the constructor.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @private
   */
  applyUniforms(frameState) {
    const gl = this.getGL();
    let value;
    let textureSlot = 1;
    this.uniforms_.forEach(function(uniform) {
      value = typeof uniform.value === "function" ? uniform.value(frameState) : uniform.value;
      if (value instanceof HTMLCanvasElement || value instanceof ImageData) {
        if (!uniform.texture) {
          uniform.texture = gl.createTexture();
        }
        gl.activeTexture(gl["TEXTURE".concat(textureSlot)]);
        gl.bindTexture(gl.TEXTURE_2D, uniform.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        if (value instanceof ImageData) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, value.width, value.height, 0, gl.UNSIGNED_BYTE, new Uint8Array(value.data));
        } else {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, value);
        }
        gl.uniform1i(uniform.location, textureSlot++);
      } else if (Array.isArray(value)) {
        switch (value.length) {
          case 2:
            gl.uniform2f(uniform.location, value[0], value[1]);
            return;
          case 3:
            gl.uniform3f(uniform.location, value[0], value[1], value[2]);
            return;
          case 4:
            gl.uniform4f(uniform.location, value[0], value[1], value[2], value[3]);
            return;
          default:
            return;
        }
      } else if (typeof value === "number") {
        gl.uniform1f(uniform.location, value);
      }
    });
  }
};
var PostProcessingPass_default = WebGLPostProcessingPass;

// node_modules/ol/webgl/Helper.js
var DefaultUniform = {
  PROJECTION_MATRIX: "u_projectionMatrix",
  SCREEN_TO_WORLD_MATRIX: "u_screenToWorldMatrix",
  TIME: "u_time",
  ZOOM: "u_zoom",
  RESOLUTION: "u_resolution",
  ROTATION: "u_rotation",
  VIEWPORT_SIZE_PX: "u_viewportSizePx",
  PIXEL_RATIO: "u_pixelRatio",
  HIT_DETECTION: "u_hitDetection"
};
var AttributeType = {
  UNSIGNED_BYTE,
  UNSIGNED_SHORT,
  UNSIGNED_INT,
  FLOAT
};
var canvasCache = {};
function getSharedCanvasCacheKey(key) {
  return "shared/" + key;
}
var uniqueCanvasCacheKeyCount = 0;
function getUniqueCanvasCacheKey() {
  const key = "unique/" + uniqueCanvasCacheKeyCount;
  uniqueCanvasCacheKeyCount += 1;
  return key;
}
function getOrCreateContext(key) {
  let cacheItem = canvasCache[key];
  if (!cacheItem) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    canvas.style.position = "absolute";
    canvas.style.left = "0";
    const context = getContext(canvas);
    cacheItem = {
      users: 0,
      context
    };
    canvasCache[key] = cacheItem;
  }
  cacheItem.users += 1;
  return cacheItem.context;
}
function releaseCanvas(key) {
  const cacheItem = canvasCache[key];
  if (!cacheItem) {
    return;
  }
  cacheItem.users -= 1;
  if (cacheItem.users > 0) {
    return;
  }
  const gl = cacheItem.context;
  const extension = gl.getExtension("WEBGL_lose_context");
  if (extension) {
    extension.loseContext();
  }
  const canvas = gl.canvas;
  canvas.width = 1;
  canvas.height = 1;
  delete canvasCache[key];
}
var WebGLHelper = class extends Disposable_default {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    super();
    options = options || {};
    this.boundHandleWebGLContextLost_ = this.handleWebGLContextLost.bind(this);
    this.boundHandleWebGLContextRestored_ = this.handleWebGLContextRestored.bind(this);
    this.canvasCacheKey_ = options.canvasCacheKey ? getSharedCanvasCacheKey(options.canvasCacheKey) : getUniqueCanvasCacheKey();
    this.gl_ = getOrCreateContext(this.canvasCacheKey_);
    this.bufferCache_ = {};
    this.extensionCache_ = {};
    this.currentProgram_ = null;
    this.needsToBeRecreated_ = false;
    const canvas = this.gl_.canvas;
    canvas.addEventListener(ContextEventType_default.LOST, this.boundHandleWebGLContextLost_);
    canvas.addEventListener(ContextEventType_default.RESTORED, this.boundHandleWebGLContextRestored_);
    this.offsetRotateMatrix_ = create();
    this.offsetScaleMatrix_ = create();
    this.tmpMat4_ = create2();
    this.uniformLocationsByProgram_ = {};
    this.attribLocationsByProgram_ = {};
    this.uniforms_ = [];
    if (options.uniforms) {
      this.setUniforms(options.uniforms);
    }
    this.postProcessPasses_ = options.postProcesses ? options.postProcesses.map((options2) => new PostProcessingPass_default({
      webGlContext: this.gl_,
      scaleRatio: options2.scaleRatio,
      vertexShader: options2.vertexShader,
      fragmentShader: options2.fragmentShader,
      uniforms: options2.uniforms
    })) : [new PostProcessingPass_default({
      webGlContext: this.gl_
    })];
    this.shaderCompileErrors_ = null;
    this.startTime_ = Date.now();
    this.maxAttributeCount_ = this.gl_.getParameter(this.gl_.MAX_VERTEX_ATTRIBS);
  }
  /**
   * @param {Object<string, UniformValue>} uniforms Uniform definitions.
   */
  setUniforms(uniforms) {
    this.uniforms_ = [];
    this.addUniforms(uniforms);
  }
  /**
   * @param {Object<string, UniformValue>} uniforms Uniform definitions.
   */
  addUniforms(uniforms) {
    for (const name in uniforms) {
      this.uniforms_.push({
        name,
        value: uniforms[name]
      });
    }
  }
  /**
   * @param {string} canvasCacheKey The canvas cache key.
   * @return {boolean} The provided key matches the one this helper was constructed with.
   */
  canvasCacheKeyMatches(canvasCacheKey) {
    return this.canvasCacheKey_ === getSharedCanvasCacheKey(canvasCacheKey);
  }
  /**
   * Get a WebGL extension.  If the extension is not supported, null is returned.
   * Extensions are cached after they are enabled for the first time.
   * @param {string} name The extension name.
   * @return {Object|null} The extension or null if not supported.
   */
  getExtension(name) {
    if (name in this.extensionCache_) {
      return this.extensionCache_[name];
    }
    const extension = this.gl_.getExtension(name);
    this.extensionCache_[name] = extension;
    return extension;
  }
  /**
   * Just bind the buffer if it's in the cache. Otherwise create
   * the WebGL buffer, bind it, populate it, and add an entry to
   * the cache.
   * @param {import("./Buffer").default} buffer Buffer.
   */
  bindBuffer(buffer2) {
    const gl = this.gl_;
    const bufferKey = getUid(buffer2);
    let bufferCache = this.bufferCache_[bufferKey];
    if (!bufferCache) {
      const webGlBuffer = gl.createBuffer();
      bufferCache = {
        buffer: buffer2,
        webGlBuffer
      };
      this.bufferCache_[bufferKey] = bufferCache;
    }
    gl.bindBuffer(buffer2.getType(), bufferCache.webGlBuffer);
  }
  /**
   * Update the data contained in the buffer array; this is required for the
   * new data to be rendered
   * @param {import("./Buffer").default} buffer Buffer.
   */
  flushBufferData(buffer2) {
    const gl = this.gl_;
    this.bindBuffer(buffer2);
    gl.bufferData(buffer2.getType(), buffer2.getArray(), buffer2.getUsage());
  }
  /**
   * @param {import("./Buffer.js").default} buf Buffer.
   */
  deleteBuffer(buf) {
    const bufferKey = getUid(buf);
    delete this.bufferCache_[bufferKey];
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    const canvas = this.gl_.canvas;
    canvas.removeEventListener(ContextEventType_default.LOST, this.boundHandleWebGLContextLost_);
    canvas.removeEventListener(ContextEventType_default.RESTORED, this.boundHandleWebGLContextRestored_);
    releaseCanvas(this.canvasCacheKey_);
    delete this.gl_;
  }
  /**
   * Clear the buffer & set the viewport to draw.
   * Post process passes will be initialized here, the first one being bound as a render target for
   * subsequent draw calls.
   * @param {import("../Map.js").FrameState} frameState current frame state
   * @param {boolean} [disableAlphaBlend] If true, no alpha blending will happen.
   * @param {boolean} [enableDepth] If true, enables depth testing.
   */
  prepareDraw(frameState, disableAlphaBlend, enableDepth) {
    const gl = this.gl_;
    const canvas = this.getCanvas();
    const size = frameState.size;
    const pixelRatio = frameState.pixelRatio;
    if (canvas.width !== size[0] * pixelRatio || canvas.height !== size[1] * pixelRatio) {
      canvas.width = size[0] * pixelRatio;
      canvas.height = size[1] * pixelRatio;
      canvas.style.width = size[0] + "px";
      canvas.style.height = size[1] + "px";
    }
    for (let i = this.postProcessPasses_.length - 1; i >= 0; i--) {
      this.postProcessPasses_[i].init(frameState);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.clearColor(0, 0, 0, 0);
    gl.depthRange(0, 1);
    gl.clearDepth(1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, disableAlphaBlend ? gl.ZERO : gl.ONE_MINUS_SRC_ALPHA);
    if (enableDepth) {
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
    } else {
      gl.disable(gl.DEPTH_TEST);
    }
  }
  /**
   * @param {WebGLFramebuffer|null} frameBuffer The frame buffer.
   * @param {WebGLTexture} [texture] The texture.
   */
  bindFrameBuffer(frameBuffer, texture) {
    const gl = this.getGL();
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    if (texture) {
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    }
  }
  /**
   * Bind the frame buffer from the initial render.
   */
  bindInitialFrameBuffer() {
    const gl = this.getGL();
    const frameBuffer = this.postProcessPasses_[0].getFrameBuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    const texture = this.postProcessPasses_[0].getRenderTargetTexture();
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  }
  /**
   * Prepare a program to use a texture.
   * @param {WebGLTexture} texture The texture.
   * @param {number} slot The texture slot.
   * @param {string} uniformName The corresponding uniform name.
   */
  bindTexture(texture, slot, uniformName) {
    const gl = this.gl_;
    gl.activeTexture(gl.TEXTURE0 + slot);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(this.getUniformLocation(uniformName), slot);
  }
  /**
   * Set up an attribute array buffer for use in the vertex shader.
   * @param {import("./Buffer").default} buffer The buffer.
   * @param {string} attributeName The attribute name.
   * @param {number} size The number of components per attribute vertex.
   */
  bindAttribute(buffer2, attributeName, size) {
    const gl = this.getGL();
    this.bindBuffer(buffer2);
    const index = this.getAttributeLocation(attributeName);
    gl.enableVertexAttribArray(index);
    gl.vertexAttribPointer(index, size, gl.FLOAT, false, 0, 0);
  }
  /**
   * Clear the render target & bind it for future draw operations.
   * This is similar to `prepareDraw`, only post processes will not be applied.
   * Note: the whole viewport will be drawn to the render target, regardless of its size.
   * @param {import("../Map.js").FrameState} frameState current frame state
   * @param {import("./RenderTarget.js").default} renderTarget Render target to draw to
   * @param {boolean} [disableAlphaBlend] If true, no alpha blending will happen.
   * @param {boolean} [enableDepth] If true, enables depth testing.
   */
  prepareDrawToRenderTarget(frameState, renderTarget, disableAlphaBlend, enableDepth) {
    const gl = this.gl_;
    const size = renderTarget.getSize();
    gl.bindFramebuffer(gl.FRAMEBUFFER, renderTarget.getFramebuffer());
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderTarget.getDepthbuffer());
    gl.viewport(0, 0, size[0], size[1]);
    gl.bindTexture(gl.TEXTURE_2D, renderTarget.getTexture());
    gl.clearColor(0, 0, 0, 0);
    gl.depthRange(0, 1);
    gl.clearDepth(1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, disableAlphaBlend ? gl.ZERO : gl.ONE_MINUS_SRC_ALPHA);
    if (enableDepth) {
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
    } else {
      gl.disable(gl.DEPTH_TEST);
    }
  }
  /**
   * Execute a draw call based on the currently bound program, texture, buffers, attributes.
   * @param {number} start Start index.
   * @param {number} end End index.
   */
  drawElements(start, end) {
    const gl = this.gl_;
    this.getExtension("OES_element_index_uint");
    const elementType = gl.UNSIGNED_INT;
    const elementSize = 4;
    const numItems = end - start;
    const offsetInBytes = start * elementSize;
    gl.drawElements(gl.TRIANGLES, numItems, elementType, offsetInBytes);
  }
  /**
   * Apply the successive post process passes which will eventually render to the actual canvas.
   * @param {import("../Map.js").FrameState} frameState current frame state
   * @param {function(WebGLRenderingContext, import("../Map.js").FrameState):void} [preCompose] Called before composing.
   * @param {function(WebGLRenderingContext, import("../Map.js").FrameState):void} [postCompose] Called before composing.
   */
  finalizeDraw(frameState, preCompose, postCompose) {
    for (let i = 0, ii = this.postProcessPasses_.length; i < ii; i++) {
      if (i === ii - 1) {
        this.postProcessPasses_[i].apply(frameState, null, preCompose, postCompose);
      } else {
        this.postProcessPasses_[i].apply(frameState, this.postProcessPasses_[i + 1]);
      }
    }
  }
  /**
   * @return {HTMLCanvasElement} Canvas.
   */
  getCanvas() {
    return (
      /** @type {HTMLCanvasElement} */
      this.gl_.canvas
    );
  }
  /**
   * Get the WebGL rendering context
   * @return {WebGLRenderingContext} The rendering context.
   */
  getGL() {
    return this.gl_;
  }
  /**
   * Sets the default matrix uniforms for a given frame state. This is called internally in `prepareDraw`.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */
  applyFrameState(frameState) {
    const size = frameState.size;
    const rotation = frameState.viewState.rotation;
    const pixelRatio = frameState.pixelRatio;
    this.setUniformFloatValue(DefaultUniform.TIME, (Date.now() - this.startTime_) * 1e-3);
    this.setUniformFloatValue(DefaultUniform.ZOOM, frameState.viewState.zoom);
    this.setUniformFloatValue(DefaultUniform.RESOLUTION, frameState.viewState.resolution);
    this.setUniformFloatValue(DefaultUniform.PIXEL_RATIO, pixelRatio);
    this.setUniformFloatVec2(DefaultUniform.VIEWPORT_SIZE_PX, [size[0], size[1]]);
    this.setUniformFloatValue(DefaultUniform.ROTATION, rotation);
  }
  /**
   * Sets the `u_hitDetection` uniform.
   * @param {boolean} enabled Whether to enable the hit detection code path
   */
  applyHitDetectionUniform(enabled) {
    const loc = this.getUniformLocation(DefaultUniform.HIT_DETECTION);
    this.getGL().uniform1i(loc, enabled ? 1 : 0);
    if (enabled) {
      this.setUniformFloatValue(DefaultUniform.PIXEL_RATIO, 0.5);
    }
  }
  /**
   * Sets the custom uniforms based on what was given in the constructor. This is called internally in `prepareDraw`.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */
  applyUniforms(frameState) {
    const gl = this.gl_;
    let value;
    let textureSlot = 0;
    this.uniforms_.forEach((uniform) => {
      value = typeof uniform.value === "function" ? uniform.value(frameState) : uniform.value;
      if (value instanceof HTMLCanvasElement || value instanceof HTMLImageElement || value instanceof ImageData || value instanceof WebGLTexture) {
        if (value instanceof WebGLTexture && !uniform.texture) {
          uniform.prevValue = void 0;
          uniform.texture = value;
        } else if (!uniform.texture) {
          uniform.prevValue = void 0;
          uniform.texture = gl.createTexture();
        }
        this.bindTexture(uniform.texture, textureSlot, uniform.name);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        const imageReady = !(value instanceof HTMLImageElement) || /** @type {HTMLImageElement} */
        value.complete;
        if (!(value instanceof WebGLTexture) && imageReady && uniform.prevValue !== value) {
          uniform.prevValue = value;
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, value);
        }
        textureSlot++;
      } else if (Array.isArray(value) && value.length === 6) {
        this.setUniformMatrixValue(uniform.name, fromTransform(this.tmpMat4_, value));
      } else if (Array.isArray(value) && value.length <= 4) {
        switch (value.length) {
          case 2:
            gl.uniform2f(this.getUniformLocation(uniform.name), value[0], value[1]);
            return;
          case 3:
            gl.uniform3f(this.getUniformLocation(uniform.name), value[0], value[1], value[2]);
            return;
          case 4:
            gl.uniform4f(this.getUniformLocation(uniform.name), value[0], value[1], value[2], value[3]);
            return;
          default:
            return;
        }
      } else if (typeof value === "number") {
        gl.uniform1f(this.getUniformLocation(uniform.name), value);
      }
    });
  }
  /**
   * Set up a program for use. The program will be set as the current one. Then, the uniforms used
   * in the program will be set based on the current frame state and the helper configuration.
   * @param {WebGLProgram} program Program.
   * @param {import("../Map.js").FrameState} [frameState] Frame state.
   */
  useProgram(program, frameState) {
    this.disableAllAttributes_();
    const gl = this.gl_;
    gl.useProgram(program);
    this.currentProgram_ = program;
    if (frameState) {
      this.applyFrameState(frameState);
      this.applyUniforms(frameState);
    }
  }
  /**
   * Will attempt to compile a vertex or fragment shader based on source
   * On error, the shader will be returned but
   * `gl.getShaderParameter(shader, gl.COMPILE_STATUS)` will return `true`
   * Use `gl.getShaderInfoLog(shader)` to have details
   * @param {string} source Shader source
   * @param {ShaderType} type VERTEX_SHADER or FRAGMENT_SHADER
   * @return {WebGLShader} Shader object
   */
  compileShader(source, type) {
    const gl = this.gl_;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }
  /**
   * Create a program for a vertex and fragment shader.  Throws if shader compilation fails.
   * @param {string} fragmentShaderSource Fragment shader source.
   * @param {string} vertexShaderSource Vertex shader source.
   * @return {WebGLProgram} Program
   */
  getProgram(fragmentShaderSource, vertexShaderSource) {
    const gl = this.gl_;
    const fragmentShader = this.compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    const vertexShader = this.compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, fragmentShader);
    gl.attachShader(program, vertexShader);
    gl.linkProgram(program);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      const message = "Fragment shader compilation failed: ".concat(gl.getShaderInfoLog(fragmentShader));
      throw new Error(message);
    }
    gl.deleteShader(fragmentShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      const message = "Vertex shader compilation failed: ".concat(gl.getShaderInfoLog(vertexShader));
      throw new Error(message);
    }
    gl.deleteShader(vertexShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const message = "GL program linking failed: ".concat(gl.getProgramInfoLog(program));
      throw new Error(message);
    }
    return program;
  }
  /**
   * Will get the location from the shader or the cache
   * @param {string} name Uniform name
   * @return {WebGLUniformLocation} uniformLocation
   */
  getUniformLocation(name) {
    const programUid = getUid(this.currentProgram_);
    if (this.uniformLocationsByProgram_[programUid] === void 0) {
      this.uniformLocationsByProgram_[programUid] = {};
    }
    if (this.uniformLocationsByProgram_[programUid][name] === void 0) {
      this.uniformLocationsByProgram_[programUid][name] = this.gl_.getUniformLocation(this.currentProgram_, name);
    }
    return this.uniformLocationsByProgram_[programUid][name];
  }
  /**
   * Will get the location from the shader or the cache
   * @param {string} name Attribute name
   * @return {number} attribLocation
   */
  getAttributeLocation(name) {
    const programUid = getUid(this.currentProgram_);
    if (this.attribLocationsByProgram_[programUid] === void 0) {
      this.attribLocationsByProgram_[programUid] = {};
    }
    if (this.attribLocationsByProgram_[programUid][name] === void 0) {
      this.attribLocationsByProgram_[programUid][name] = this.gl_.getAttribLocation(this.currentProgram_, name);
    }
    return this.attribLocationsByProgram_[programUid][name];
  }
  /**
   * Sets the given transform to apply the rotation/translation/scaling of the given frame state.
   * The resulting transform can be used to convert world space coordinates to view coordinates in the [-1, 1] range.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {import("../transform").Transform} transform Transform to update.
   * @return {import("../transform").Transform} The updated transform object.
   */
  makeProjectionTransform(frameState, transform) {
    const size = frameState.size;
    const rotation = frameState.viewState.rotation;
    const resolution = frameState.viewState.resolution;
    const center = frameState.viewState.center;
    compose(transform, 0, 0, 2 / (resolution * size[0]), 2 / (resolution * size[1]), -rotation, -center[0], -center[1]);
    return transform;
  }
  /**
   * Give a value for a standard float uniform
   * @param {string} uniform Uniform name
   * @param {number} value Value
   */
  setUniformFloatValue(uniform, value) {
    this.gl_.uniform1f(this.getUniformLocation(uniform), value);
  }
  /**
   * Give a value for a vec2 uniform
   * @param {string} uniform Uniform name
   * @param {Array<number>} value Array of length 4.
   */
  setUniformFloatVec2(uniform, value) {
    this.gl_.uniform2fv(this.getUniformLocation(uniform), value);
  }
  /**
   * Give a value for a vec4 uniform
   * @param {string} uniform Uniform name
   * @param {Array<number>} value Array of length 4.
   */
  setUniformFloatVec4(uniform, value) {
    this.gl_.uniform4fv(this.getUniformLocation(uniform), value);
  }
  /**
   * Give a value for a standard matrix4 uniform
   * @param {string} uniform Uniform name
   * @param {Array<number>} value Matrix value
   */
  setUniformMatrixValue(uniform, value) {
    this.gl_.uniformMatrix4fv(this.getUniformLocation(uniform), false, value);
  }
  /**
   * Disable all vertex attributes.
   * @private
   */
  disableAllAttributes_() {
    for (let i = 0; i < this.maxAttributeCount_; i++) {
      this.gl_.disableVertexAttribArray(i);
    }
  }
  /**
   * Will set the currently bound buffer to an attribute of the shader program. Used by `#enableAttributes`
   * internally.
   * @param {string} attribName Attribute name
   * @param {number} size Number of components per attributes
   * @param {number} type UNSIGNED_INT, UNSIGNED_BYTE, UNSIGNED_SHORT or FLOAT
   * @param {number} stride Stride in bytes (0 means attribs are packed)
   * @param {number} offset Offset in bytes
   * @private
   */
  enableAttributeArray_(attribName, size, type, stride, offset) {
    const location = this.getAttributeLocation(attribName);
    if (location < 0) {
      return;
    }
    this.gl_.enableVertexAttribArray(location);
    this.gl_.vertexAttribPointer(location, size, type, false, stride, offset);
  }
  /**
   * Will enable the following attributes to be read from the currently bound buffer,
   * i.e. tell the GPU where to read the different attributes in the buffer. An error in the
   * size/type/order of attributes will most likely break the rendering and throw a WebGL exception.
   * @param {Array<AttributeDescription>} attributes Ordered list of attributes to read from the buffer
   */
  enableAttributes(attributes) {
    const stride = computeAttributesStride(attributes);
    let offset = 0;
    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes[i];
      this.enableAttributeArray_(attr.name, attr.size, attr.type || FLOAT, stride, offset);
      offset += attr.size * getByteSizeFromType(attr.type);
    }
  }
  /**
   * WebGL context was lost
   * @param {WebGLContextEvent} event The context loss event.
   * @private
   */
  handleWebGLContextLost(event) {
    clear(this.bufferCache_);
    this.currentProgram_ = null;
    event.preventDefault();
  }
  /**
   * WebGL context was restored
   * @private
   */
  handleWebGLContextRestored() {
    this.needsToBeRecreated_ = true;
  }
  /**
   * Returns whether this helper needs to be recreated, as the context was lost and then restored.
   * @return {boolean} Whether this helper needs to be recreated.
   */
  needsToBeRecreated() {
    return this.needsToBeRecreated_;
  }
  /**
   * Will create or reuse a given webgl texture and apply the given size. If no image data
   * specified, the texture will be empty, otherwise image data will be used and the `size`
   * parameter will be ignored.  If a Uint8Array is provided for data, a size must also be provided.
   * Note: wrap parameters are set to clamp to edge, min filter is set to linear.
   * @param {Array<number>} size Expected size of the texture
   * @param {ImageData|HTMLImageElement|HTMLCanvasElement|Uint8Array|null} data Image data/object to bind to the texture
   * @param {WebGLTexture} [texture] Existing texture to reuse
   * @param {boolean} [nearest] Use gl.NEAREST for min/mag filter.
   * @return {WebGLTexture} The generated texture
   */
  createTexture(size, data, texture, nearest) {
    const gl = this.gl_;
    texture = texture || gl.createTexture();
    const filter = nearest ? gl.NEAREST : gl.LINEAR;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;
    if (data instanceof Uint8Array) {
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, size[0], size[1], border, format, type, data);
    } else if (data) {
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, format, type, data);
    } else {
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, size[0], size[1], border, format, type, null);
    }
    return texture;
  }
};
function computeAttributesStride(attributes) {
  let stride = 0;
  for (let i = 0; i < attributes.length; i++) {
    const attr = attributes[i];
    stride += attr.size * getByteSizeFromType(attr.type);
  }
  return stride;
}
function getByteSizeFromType(type) {
  switch (type) {
    case AttributeType.UNSIGNED_BYTE:
      return Uint8Array.BYTES_PER_ELEMENT;
    case AttributeType.UNSIGNED_SHORT:
      return Uint16Array.BYTES_PER_ELEMENT;
    case AttributeType.UNSIGNED_INT:
      return Uint32Array.BYTES_PER_ELEMENT;
    case AttributeType.FLOAT:
    default:
      return Float32Array.BYTES_PER_ELEMENT;
  }
}
var Helper_default = WebGLHelper;

// node_modules/ol/webgl/BaseTileRepresentation.js
var BaseTileRepresentation = class extends Target_default {
  /**
   * @param {TileRepresentationOptions<TileType>} options The tile representation options.
   */
  constructor(options) {
    super();
    this.tile;
    this.handleTileChange_ = this.handleTileChange_.bind(this);
    this.gutter = options.gutter || 0;
    this.helper = options.helper;
    this.loaded = false;
    this.ready = false;
  }
  /**
   * @param {TileType} tile Tile.
   */
  setTile(tile) {
    if (tile !== this.tile) {
      if (this.tile) {
        this.tile.removeEventListener(EventType_default.CHANGE, this.handleTileChange_);
      }
      this.tile = tile;
      this.loaded = tile.getState() === TileState_default.LOADED;
      if (this.loaded) {
        this.uploadTile();
      } else {
        if (tile instanceof ImageTile_default) {
          const image = tile.getImage();
          if (image instanceof Image && !image.crossOrigin) {
            image.crossOrigin = "anonymous";
          }
        }
        tile.addEventListener(EventType_default.CHANGE, this.handleTileChange_);
      }
    }
  }
  /**
   * @abstract
   * @protected
   */
  uploadTile() {
    abstract();
  }
  setReady() {
    this.ready = true;
    this.dispatchEvent(EventType_default.CHANGE);
  }
  handleTileChange_() {
    if (this.tile.getState() === TileState_default.LOADED) {
      this.loaded = true;
      this.uploadTile();
    }
  }
  /**
   * @param {import("./Helper.js").default} helper The WebGL helper.
   */
  setHelper(helper) {
    this.helper = helper;
    if (this.helper && this.loaded) {
      this.uploadTile();
    }
  }
  /**
   * @override
   */
  disposeInternal() {
    this.setHelper(null);
    this.tile.removeEventListener(EventType_default.CHANGE, this.handleTileChange_);
  }
};
var BaseTileRepresentation_default = BaseTileRepresentation;

// node_modules/ol/webgl/TileTexture.js
function bindAndConfigure(gl, texture, interpolate) {
  const resampleFilter = interpolate ? gl.LINEAR : gl.NEAREST;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, resampleFilter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, resampleFilter);
}
function uploadImageTexture(gl, texture, image, interpolate) {
  bindAndConfigure(gl, texture, interpolate);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
}
function uploadDataTexture(helper, texture, data, size, bandCount, interpolate) {
  const gl = helper.getGL();
  let textureType;
  let canInterpolate;
  if (data instanceof Float32Array) {
    textureType = gl.FLOAT;
    helper.getExtension("OES_texture_float");
    const extension = helper.getExtension("OES_texture_float_linear");
    canInterpolate = extension !== null;
  } else {
    textureType = gl.UNSIGNED_BYTE;
    canInterpolate = true;
  }
  bindAndConfigure(gl, texture, interpolate && canInterpolate);
  const bytesPerRow = data.byteLength / size[1];
  let unpackAlignment = 1;
  if (bytesPerRow % 8 === 0) {
    unpackAlignment = 8;
  } else if (bytesPerRow % 4 === 0) {
    unpackAlignment = 4;
  } else if (bytesPerRow % 2 === 0) {
    unpackAlignment = 2;
  }
  let format;
  switch (bandCount) {
    case 1: {
      format = gl.LUMINANCE;
      break;
    }
    case 2: {
      format = gl.LUMINANCE_ALPHA;
      break;
    }
    case 3: {
      format = gl.RGB;
      break;
    }
    case 4: {
      format = gl.RGBA;
      break;
    }
    default: {
      throw new Error("Unsupported number of bands: ".concat(bandCount));
    }
  }
  const oldUnpackAlignment = gl.getParameter(gl.UNPACK_ALIGNMENT);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, unpackAlignment);
  gl.texImage2D(gl.TEXTURE_2D, 0, format, size[0], size[1], 0, format, textureType, data);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, oldUnpackAlignment);
}
var pixelContext = null;
function createPixelContext() {
  pixelContext = createCanvasContext2D(1, 1, void 0, {
    willReadFrequently: true
  });
}
var TileTexture = class extends BaseTileRepresentation_default {
  /**
   * @param {import("./BaseTileRepresentation.js").TileRepresentationOptions<TileType>} options The tile texture options.
   */
  constructor(options) {
    super(options);
    this.textures = [];
    this.renderSize_ = toSize(options.grid.getTileSize(options.tile.tileCoord[0]));
    this.bandCount = NaN;
    const coords = new Buffer_default(ARRAY_BUFFER, STATIC_DRAW);
    coords.fromArray([
      0,
      // P0
      1,
      1,
      // P1
      1,
      1,
      // P2
      0,
      0,
      // P3
      0
    ]);
    this.helper.flushBufferData(coords);
    this.coords = coords;
    this.setTile(options.tile);
  }
  /**
   * @override
   * @param {import("./Helper.js").default} helper The WebGL helper.
   */
  setHelper(helper) {
    var _a;
    const gl = (_a = this.helper) == null ? void 0 : _a.getGL();
    if (gl) {
      this.helper.deleteBuffer(this.coords);
      for (let i = 0; i < this.textures.length; ++i) {
        gl.deleteTexture(this.textures[i]);
      }
    }
    super.setHelper(helper);
    if (helper) {
      helper.flushBufferData(this.coords);
    }
  }
  /**
   * @override
   */
  uploadTile() {
    const helper = this.helper;
    const gl = helper.getGL();
    const tile = this.tile;
    this.textures.length = 0;
    let data;
    if (tile instanceof ImageTile_default || tile instanceof Tile_default) {
      data = tile.getImage();
    } else {
      data = tile.getData();
    }
    const image = asImageLike(data);
    if (image) {
      const texture = gl.createTexture();
      this.textures.push(texture);
      this.bandCount = 4;
      uploadImageTexture(gl, texture, image, tile.interpolate);
      this.setReady();
      return;
    }
    data = asArrayLike(data);
    const sourceTileSize = (
      /** @type {DataTile} */
      tile.getSize()
    );
    const pixelSize = [sourceTileSize[0] + 2 * this.gutter, sourceTileSize[1] + 2 * this.gutter];
    const isFloat = data instanceof Float32Array;
    const pixelCount = pixelSize[0] * pixelSize[1];
    const DataType = isFloat ? Float32Array : Uint8Array;
    const bytesPerElement = DataType.BYTES_PER_ELEMENT;
    const bytesPerRow = data.byteLength / pixelSize[1];
    this.bandCount = Math.floor(bytesPerRow / bytesPerElement / pixelSize[0]);
    const textureCount = Math.ceil(this.bandCount / 4);
    if (textureCount === 1) {
      const texture = gl.createTexture();
      this.textures.push(texture);
      uploadDataTexture(helper, texture, data, pixelSize, this.bandCount, tile.interpolate);
      this.setReady();
      return;
    }
    const textureDataArrays = new Array(textureCount);
    for (let textureIndex = 0; textureIndex < textureCount; ++textureIndex) {
      const texture = gl.createTexture();
      this.textures.push(texture);
      const bandCount = textureIndex < textureCount - 1 ? 4 : (this.bandCount - 1) % 4 + 1;
      textureDataArrays[textureIndex] = new DataType(pixelCount * bandCount);
    }
    let dataIndex = 0;
    let rowOffset = 0;
    const colCount = pixelSize[0] * this.bandCount;
    for (let rowIndex = 0; rowIndex < pixelSize[1]; ++rowIndex) {
      for (let colIndex = 0; colIndex < colCount; ++colIndex) {
        const dataValue = data[rowOffset + colIndex];
        const pixelIndex = Math.floor(dataIndex / this.bandCount);
        const bandIndex = colIndex % this.bandCount;
        const textureIndex = Math.floor(bandIndex / 4);
        const textureData = textureDataArrays[textureIndex];
        const bandCount = textureData.length / pixelCount;
        const textureBandIndex = bandIndex % 4;
        textureData[pixelIndex * bandCount + textureBandIndex] = dataValue;
        ++dataIndex;
      }
      rowOffset += bytesPerRow / bytesPerElement;
    }
    for (let textureIndex = 0; textureIndex < textureCount; ++textureIndex) {
      const texture = this.textures[textureIndex];
      const textureData = textureDataArrays[textureIndex];
      const bandCount = textureData.length / pixelCount;
      uploadDataTexture(helper, texture, textureData, pixelSize, bandCount, tile.interpolate);
    }
    this.setReady();
  }
  /**
   * @param {import("../DataTile.js").ImageLike} image The image.
   * @param {number} renderCol The column index (in rendered tile space).
   * @param {number} renderRow The row index (in rendered tile space).
   * @return {Uint8ClampedArray|null} The data.
   * @private
   */
  getImagePixelData_(image, renderCol, renderRow) {
    const gutter = this.gutter;
    const renderWidth = this.renderSize_[0];
    const renderHeight = this.renderSize_[1];
    if (!pixelContext) {
      createPixelContext();
    }
    pixelContext.clearRect(0, 0, 1, 1);
    const sourceWidth = image.width;
    const sourceHeight = image.height;
    const sourceWidthWithoutGutter = sourceWidth - 2 * gutter;
    const sourceHeightWithoutGutter = sourceHeight - 2 * gutter;
    const sourceCol = gutter + Math.floor(sourceWidthWithoutGutter * (renderCol / renderWidth));
    const sourceRow = gutter + Math.floor(sourceHeightWithoutGutter * (renderRow / renderHeight));
    let data;
    try {
      pixelContext.drawImage(image, sourceCol, sourceRow, 1, 1, 0, 0, 1, 1);
      data = pixelContext.getImageData(0, 0, 1, 1).data;
    } catch (e) {
      pixelContext = null;
      return null;
    }
    return data;
  }
  /**
   * @param {import("../DataTile.js").ArrayLike} data The data.
   * @param {import("../size.js").Size} sourceSize The size.
   * @param {number} renderCol The column index (in rendered tile space).
   * @param {number} renderRow The row index (in rendered tile space).
   * @return {import("../DataTile.js").ArrayLike|null} The data.
   * @private
   */
  getArrayPixelData_(data, sourceSize, renderCol, renderRow) {
    const gutter = this.gutter;
    const renderWidth = this.renderSize_[0];
    const renderHeight = this.renderSize_[1];
    const sourceWidthWithoutGutter = sourceSize[0];
    const sourceHeightWithoutGutter = sourceSize[1];
    const sourceWidth = sourceWidthWithoutGutter + 2 * gutter;
    const sourceHeight = sourceHeightWithoutGutter + 2 * gutter;
    const sourceCol = gutter + Math.floor(sourceWidthWithoutGutter * (renderCol / renderWidth));
    const sourceRow = gutter + Math.floor(sourceHeightWithoutGutter * (renderRow / renderHeight));
    if (data instanceof DataView) {
      const bytesPerPixel = data.byteLength / (sourceWidth * sourceHeight);
      const offset2 = bytesPerPixel * (sourceRow * sourceWidth + sourceCol);
      const buffer2 = data.buffer.slice(offset2, offset2 + bytesPerPixel);
      return new DataView(buffer2);
    }
    const offset = this.bandCount * (sourceRow * sourceWidth + sourceCol);
    return data.slice(offset, offset + this.bandCount);
  }
  /**
   * Get data for a pixel.  If the tile is not loaded, null is returned.
   * @param {number} renderCol The column index (in rendered tile space).
   * @param {number} renderRow The row index (in rendered tile space).
   * @return {import("../DataTile.js").ArrayLike|null} The data.
   */
  getPixelData(renderCol, renderRow) {
    if (!this.loaded) {
      return null;
    }
    if (this.tile instanceof DataTile_default) {
      const data = this.tile.getData();
      const arrayData = asArrayLike(data);
      if (arrayData) {
        const sourceSize = this.tile.getSize();
        return this.getArrayPixelData_(arrayData, sourceSize, renderCol, renderRow);
      }
      return this.getImagePixelData_(asImageLike(data), renderCol, renderRow);
    }
    return this.getImagePixelData_(this.tile.getImage(), renderCol, renderRow);
  }
};
var TileTexture_default = TileTexture;

// node_modules/ol/renderer/webgl/Layer.js
var WebGLLayerRenderer = class _WebGLLayerRenderer extends Layer_default {
  /**
   * @param {LayerType} layer Layer.
   * @param {Options} [options] Options.
   */
  constructor(layer, options) {
    super(layer);
    options = options || {};
    this.inversePixelTransform_ = create();
    this.postProcesses_ = options.postProcesses;
    this.uniforms_ = options.uniforms;
    this.helper;
    this.onMapChanged_ = () => {
      this.clearCache();
      this.removeHelper();
    };
    layer.addChangeListener(Property_default.MAP, this.onMapChanged_);
    this.dispatchPreComposeEvent = this.dispatchPreComposeEvent.bind(this);
    this.dispatchPostComposeEvent = this.dispatchPostComposeEvent.bind(this);
  }
  /**
   * @param {WebGLRenderingContext} context The WebGL rendering context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */
  dispatchPreComposeEvent(context, frameState) {
    const layer = this.getLayer();
    if (layer.hasListener(EventType_default2.PRECOMPOSE)) {
      const event = new Event_default(EventType_default2.PRECOMPOSE, void 0, frameState, context);
      layer.dispatchEvent(event);
    }
  }
  /**
   * @param {WebGLRenderingContext} context The WebGL rendering context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */
  dispatchPostComposeEvent(context, frameState) {
    const layer = this.getLayer();
    if (layer.hasListener(EventType_default2.POSTCOMPOSE)) {
      const event = new Event_default(EventType_default2.POSTCOMPOSE, void 0, frameState, context);
      layer.dispatchEvent(event);
    }
  }
  /**
   * Reset options (only handles uniforms).
   * @param {Options} options Options.
   */
  reset(options) {
    this.uniforms_ = options.uniforms;
    if (this.helper) {
      this.helper.setUniforms(this.uniforms_);
    }
  }
  /**
   * @protected
   */
  removeHelper() {
    if (this.helper) {
      this.helper.dispose();
      delete this.helper;
    }
  }
  /**
   * Determine whether renderFrame should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   * @override
   */
  prepareFrame(frameState) {
    if (this.getLayer().getRenderSource()) {
      let incrementGroup = true;
      let groupNumber = -1;
      let className;
      for (let i = 0, ii = frameState.layerStatesArray.length; i < ii; i++) {
        const layer = frameState.layerStatesArray[i].layer;
        const renderer = layer.getRenderer();
        if (!(renderer instanceof _WebGLLayerRenderer)) {
          incrementGroup = true;
          continue;
        }
        const layerClassName = layer.getClassName();
        if (incrementGroup || layerClassName !== className) {
          groupNumber += 1;
          incrementGroup = false;
        }
        className = layerClassName;
        if (renderer === this) {
          break;
        }
      }
      const canvasCacheKey = "map/" + frameState.mapId + "/group/" + groupNumber;
      if (!this.helper || !this.helper.canvasCacheKeyMatches(canvasCacheKey) || this.helper.needsToBeRecreated()) {
        this.removeHelper();
        this.helper = new Helper_default({
          postProcesses: this.postProcesses_,
          uniforms: this.uniforms_,
          canvasCacheKey
        });
        if (className) {
          this.helper.getCanvas().className = className;
        }
        this.afterHelperCreated();
      }
    }
    return this.prepareFrameInternal(frameState);
  }
  /**
   * @protected
   */
  afterHelperCreated() {
  }
  /**
   * Determine whether renderFrame should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   * @protected
   */
  prepareFrameInternal(frameState) {
    return true;
  }
  /**
   * @protected
   */
  clearCache() {
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    var _a;
    this.clearCache();
    this.removeHelper();
    (_a = this.getLayer()) == null ? void 0 : _a.removeChangeListener(Property_default.MAP, this.onMapChanged_);
    super.disposeInternal();
  }
  /**
   * @param {import("../../render/EventType.js").default} type Event type.
   * @param {WebGLRenderingContext} context The rendering context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @private
   */
  dispatchRenderEvent_(type, context, frameState) {
    const layer = this.getLayer();
    if (layer.hasListener(type)) {
      compose(this.inversePixelTransform_, 0, 0, frameState.pixelRatio, -frameState.pixelRatio, 0, 0, -frameState.size[1]);
      const event = new Event_default(type, this.inversePixelTransform_, frameState, context);
      layer.dispatchEvent(event);
    }
  }
  /**
   * @param {WebGLRenderingContext} context The rendering context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */
  preRender(context, frameState) {
    this.dispatchRenderEvent_(EventType_default2.PRERENDER, context, frameState);
  }
  /**
   * @param {WebGLRenderingContext} context The rendering context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */
  postRender(context, frameState) {
    this.dispatchRenderEvent_(EventType_default2.POSTRENDER, context, frameState);
  }
};
var Layer_default3 = WebGLLayerRenderer;

// node_modules/ol/renderer/webgl/TileLayerBase.js
var Uniforms = {
  TILE_TRANSFORM: "u_tileTransform",
  TRANSITION_ALPHA: "u_transitionAlpha",
  DEPTH: "u_depth",
  RENDER_EXTENT: "u_renderExtent",
  // intersection of layer, source, and view extent
  PATTERN_ORIGIN: "u_patternOrigin",
  RESOLUTION: "u_resolution",
  ZOOM: "u_zoom",
  GLOBAL_ALPHA: "u_globalAlpha",
  PROJECTION_MATRIX: "u_projectionMatrix",
  SCREEN_TO_WORLD_MATRIX: "u_screenToWorldMatrix"
};
function depthForZ(z) {
  return 1 / (z + 2);
}
function newTileRepresentationLookup() {
  return {
    tileIds: /* @__PURE__ */ new Set(),
    representationsByZ: {}
  };
}
function lookupHasTile(tileRepresentationLookup, tile) {
  return tileRepresentationLookup.tileIds.has(getUid(tile));
}
function addTileRepresentationToLookup(tileRepresentationLookup, tileRepresentation, z) {
  const representationsByZ = tileRepresentationLookup.representationsByZ;
  if (!(z in representationsByZ)) {
    representationsByZ[z] = /* @__PURE__ */ new Set();
  }
  representationsByZ[z].add(tileRepresentation);
  tileRepresentationLookup.tileIds.add(getUid(tileRepresentation.tile));
}
function getRenderExtent(frameState, extent) {
  const layerState = frameState.layerStatesArray[frameState.layerIndex];
  if (layerState.extent) {
    extent = getIntersection(extent, fromUserExtent(layerState.extent, frameState.viewState.projection));
  }
  const source = (
    /** @type {import("../../source/Tile.js").default} */
    layerState.layer.getRenderSource()
  );
  if (!source.getWrapX()) {
    const gridExtent = source.getTileGridForProjection(frameState.viewState.projection).getExtent();
    if (gridExtent) {
      extent = getIntersection(extent, gridExtent);
    }
  }
  return extent;
}
function getCacheKey(source, tileCoord) {
  return "".concat(getUid(source), ",").concat(source.getKey(), ",").concat(source.getRevision(), ",").concat(getKey(tileCoord));
}
var WebGLBaseTileLayerRenderer = class extends Layer_default3 {
  /**
   * @param {LayerType} tileLayer Tile layer.
   * @param {Options} options Options.
   */
  constructor(tileLayer, options) {
    super(tileLayer, {
      uniforms: options.uniforms,
      postProcesses: options.postProcesses
    });
    this.renderComplete = false;
    this.tileTransform_ = create();
    this.tempMat4 = create2();
    this.tempTileRange_ = new TileRange_default(0, 0, 0, 0);
    this.tempTileCoord_ = createOrUpdate(0, 0, 0);
    this.tempSize_ = [0, 0];
    const cacheSize = options.cacheSize !== void 0 ? options.cacheSize : 512;
    this.tileRepresentationCache = new LRUCache_default(cacheSize);
    this.frameState = null;
    this.renderedProjection_ = void 0;
  }
  /**
   * @param {Options} options Options.
   * @override
   */
  reset(options) {
    super.reset({
      uniforms: options.uniforms
    });
  }
  /**
   * Determine whether renderFrame should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   * @override
   */
  prepareFrameInternal(frameState) {
    if (!this.renderedProjection_) {
      this.renderedProjection_ = frameState.viewState.projection;
    } else if (frameState.viewState.projection !== this.renderedProjection_) {
      this.clearCache();
      this.renderedProjection_ = frameState.viewState.projection;
    }
    const layer = this.getLayer();
    const source = layer.getRenderSource();
    if (!source) {
      return false;
    }
    if (isEmpty(getRenderExtent(frameState, frameState.extent))) {
      return false;
    }
    return source.getState() === "ready";
  }
  /**
   * @abstract
   * @param {import("../../webgl/BaseTileRepresentation.js").TileRepresentationOptions<TileType>} options tile representation options
   * @return {TileRepresentation} A new tile representation
   * @protected
   */
  createTileRepresentation(options) {
    return abstract();
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../extent.js").Extent} extent The extent to be rendered.
   * @param {number} initialZ The zoom level.
   * @param {TileRepresentationLookup} tileRepresentationLookup The zoom level.
   * @param {number} preload Number of additional levels to load.
   */
  enqueueTiles(frameState, extent, initialZ, tileRepresentationLookup, preload) {
    const viewState = frameState.viewState;
    const tileLayer = this.getLayer();
    const tileSource = tileLayer.getRenderSource();
    const tileGrid = tileSource.getTileGridForProjection(viewState.projection);
    const gutter = tileSource.getGutterForProjection(viewState.projection);
    const tileSourceKey = getUid(tileSource);
    if (!(tileSourceKey in frameState.wantedTiles)) {
      frameState.wantedTiles[tileSourceKey] = {};
    }
    const wantedTiles = frameState.wantedTiles[tileSourceKey];
    const tileRepresentationCache = this.tileRepresentationCache;
    const map = tileLayer.getMapInternal();
    const minZ = Math.max(initialZ - preload, tileGrid.getMinZoom(), tileGrid.getZForResolution(Math.min(tileLayer.getMaxResolution(), map ? map.getView().getResolutionForZoom(Math.max(tileLayer.getMinZoom(), 0)) : tileGrid.getResolution(0)), tileSource.zDirection));
    const rotation = viewState.rotation;
    const viewport = rotation ? getRotatedViewport(viewState.center, viewState.resolution, rotation, frameState.size) : void 0;
    for (let z = initialZ; z >= minZ; --z) {
      const tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z, this.tempTileRange_);
      const tileResolution = tileGrid.getResolution(z);
      for (let x = tileRange.minX; x <= tileRange.maxX; ++x) {
        for (let y = tileRange.minY; y <= tileRange.maxY; ++y) {
          if (rotation && !tileGrid.tileCoordIntersectsViewport([z, x, y], viewport)) {
            continue;
          }
          const tileCoord = createOrUpdate(z, x, y, this.tempTileCoord_);
          const cacheKey = getCacheKey(tileSource, tileCoord);
          let tileRepresentation;
          let tile;
          if (tileRepresentationCache.containsKey(cacheKey)) {
            tileRepresentation = tileRepresentationCache.get(cacheKey);
            tile = tileRepresentation.tile;
          }
          if (!tileRepresentation || tileRepresentation.tile.key !== tileSource.getKey()) {
            tile = tileSource.getTile(z, x, y, frameState.pixelRatio, viewState.projection);
            if (!tile) {
              continue;
            }
          }
          if (lookupHasTile(tileRepresentationLookup, tile)) {
            continue;
          }
          if (!tileRepresentation) {
            tileRepresentation = this.createTileRepresentation({
              tile,
              grid: tileGrid,
              helper: this.helper,
              gutter
            });
            tileRepresentationCache.set(cacheKey, tileRepresentation);
          } else {
            tileRepresentation.setTile(tile);
          }
          addTileRepresentationToLookup(tileRepresentationLookup, tileRepresentation, z);
          const tileQueueKey = tile.getKey();
          wantedTiles[tileQueueKey] = true;
          if (tile.getState() === TileState_default.IDLE) {
            if (!frameState.tileQueue.isKeyQueued(tileQueueKey)) {
              frameState.tileQueue.enqueue([tile, tileSourceKey, tileGrid.getTileCoordCenter(tileCoord), tileResolution]);
            }
          }
        }
      }
    }
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {boolean} tilesWithAlpha True if at least one of the rendered tiles has alpha
   * @protected
   */
  beforeTilesRender(frameState, tilesWithAlpha) {
    this.helper.prepareDraw(this.frameState, !tilesWithAlpha, true);
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} If returns false, tile mask rendering will be skipped
   * @protected
   */
  beforeTilesMaskRender(frameState) {
    return false;
  }
  /**
   * @param {TileRepresentation} tileRepresentation Tile representation
   * @param {import("../../transform.js").Transform} tileTransform Tile transform
   * @param {import("../../Map.js").FrameState} frameState Frame state
   * @param {import("../../extent.js").Extent} renderExtent Render extent
   * @param {number} tileResolution Tile resolution
   * @param {import("../../size.js").Size} tileSize Tile size
   * @param {import("../../coordinate.js").Coordinate} tileOrigin Tile origin
   * @param {import("../../extent.js").Extent} tileExtent tile Extent
   * @param {number} depth Depth
   * @param {number} gutter Gutter
   * @param {number} alpha Alpha
   * @protected
   */
  renderTile(tileRepresentation, tileTransform, frameState, renderExtent, tileResolution, tileSize, tileOrigin, tileExtent, depth, gutter, alpha) {
  }
  /**
   * @param {TileRepresentation} tileRepresentation Tile representation
   * @param {number} tileZ Tile Z
   * @param {import("../../extent.js").Extent} extent Render extent
   * @param {number} depth Depth
   * @protected
   */
  renderTileMask(tileRepresentation, tileZ, extent, depth) {
  }
  drawTile_(frameState, tileRepresentation, tileZ, gutter, extent, alphaLookup, tileGrid) {
    if (!tileRepresentation.ready) {
      return;
    }
    const tile = tileRepresentation.tile;
    const tileCoord = tile.tileCoord;
    const tileCoordKey = getKey(tileCoord);
    const alpha = tileCoordKey in alphaLookup ? alphaLookup[tileCoordKey] : 1;
    const tileResolution = tileGrid.getResolution(tileZ);
    const tileSize = toSize(tileGrid.getTileSize(tileZ), this.tempSize_);
    const tileOrigin = tileGrid.getOrigin(tileZ);
    const tileExtent = tileGrid.getTileCoordExtent(tileCoord);
    const depth = alpha < 1 ? -1 : depthForZ(tileZ);
    if (alpha < 1) {
      frameState.animate = true;
    }
    const viewState = frameState.viewState;
    const centerX = viewState.center[0];
    const centerY = viewState.center[1];
    const tileWidthWithGutter = tileSize[0] + 2 * gutter;
    const tileHeightWithGutter = tileSize[1] + 2 * gutter;
    const aspectRatio = tileWidthWithGutter / tileHeightWithGutter;
    const centerI = (centerX - tileOrigin[0]) / (tileSize[0] * tileResolution);
    const centerJ = (tileOrigin[1] - centerY) / (tileSize[1] * tileResolution);
    const tileScale = viewState.resolution / tileResolution;
    const tileCenterI = tileCoord[1];
    const tileCenterJ = tileCoord[2];
    reset(this.tileTransform_);
    scale(this.tileTransform_, 2 / (frameState.size[0] * tileScale / tileWidthWithGutter), -2 / (frameState.size[1] * tileScale / tileWidthWithGutter));
    rotate(this.tileTransform_, viewState.rotation);
    scale(this.tileTransform_, 1, 1 / aspectRatio);
    translate(this.tileTransform_, (tileSize[0] * (tileCenterI - centerI) - gutter) / tileWidthWithGutter, (tileSize[1] * (tileCenterJ - centerJ) - gutter) / tileHeightWithGutter);
    this.renderTile(
      /** @type {TileRepresentation} */
      tileRepresentation,
      this.tileTransform_,
      frameState,
      extent,
      tileResolution,
      tileSize,
      tileOrigin,
      tileExtent,
      depth,
      gutter,
      alpha
    );
  }
  /**
   * Render the layer.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {HTMLElement} The rendered element.
   * @override
   */
  renderFrame(frameState) {
    this.frameState = frameState;
    this.renderComplete = true;
    const gl = this.helper.getGL();
    this.preRender(gl, frameState);
    const viewState = frameState.viewState;
    const tileLayer = this.getLayer();
    const tileSource = tileLayer.getRenderSource();
    const tileGrid = tileSource.getTileGridForProjection(viewState.projection);
    const gutter = tileSource.getGutterForProjection(viewState.projection);
    const extent = getRenderExtent(frameState, frameState.extent);
    const z = tileGrid.getZForResolution(viewState.resolution, tileSource.zDirection);
    const tileRepresentationLookup = newTileRepresentationLookup();
    const preload = tileLayer.getPreload();
    if (frameState.nextExtent) {
      const targetZ = tileGrid.getZForResolution(viewState.nextResolution, tileSource.zDirection);
      const nextExtent = getRenderExtent(frameState, frameState.nextExtent);
      this.enqueueTiles(frameState, nextExtent, targetZ, tileRepresentationLookup, preload);
    }
    this.enqueueTiles(frameState, extent, z, tileRepresentationLookup, 0);
    if (preload > 0) {
      setTimeout(() => {
        this.enqueueTiles(frameState, extent, z - 1, tileRepresentationLookup, preload - 1);
      }, 0);
    }
    const alphaLookup = {};
    let blend = false;
    const representationsByZ = tileRepresentationLookup.representationsByZ;
    if (z in representationsByZ) {
      const uid = getUid(this);
      const time = frameState.time;
      for (const tileRepresentation of representationsByZ[z]) {
        const tile = tileRepresentation.tile;
        if (tile.getState() === TileState_default.EMPTY) {
          continue;
        }
        const tileCoord = tile.tileCoord;
        if (tileRepresentation.ready) {
          const alpha = tile.getAlpha(uid, time);
          if (alpha === 1) {
            tile.endTransition(uid);
            continue;
          }
          blend = true;
          const tileCoordKey = getKey(tileCoord);
          alphaLookup[tileCoordKey] = alpha;
        }
        this.renderComplete = false;
        const coveredByChildren = this.findAltTiles_(tileGrid, tileCoord, z + 1, tileRepresentationLookup);
        if (coveredByChildren) {
          continue;
        }
        const minZoom = tileGrid.getMinZoom();
        for (let parentZ = z - 1; parentZ >= minZoom; --parentZ) {
          const coveredByParent = this.findAltTiles_(tileGrid, tileCoord, parentZ, tileRepresentationLookup);
          if (coveredByParent) {
            break;
          }
        }
      }
    }
    const zs = Object.keys(representationsByZ).map(Number).sort(descending);
    const renderTileMask = this.beforeTilesMaskRender(frameState);
    if (renderTileMask) {
      for (let j = 0, jj = zs.length; j < jj; ++j) {
        const tileZ = zs[j];
        for (const tileRepresentation of representationsByZ[tileZ]) {
          const tileCoord = tileRepresentation.tile.tileCoord;
          const tileCoordKey = getKey(tileCoord);
          if (tileCoordKey in alphaLookup) {
            continue;
          }
          const tileExtent = tileGrid.getTileCoordExtent(tileCoord);
          this.renderTileMask(
            /** @type {TileRepresentation} */
            tileRepresentation,
            tileZ,
            tileExtent,
            depthForZ(tileZ)
          );
        }
      }
    }
    this.beforeTilesRender(frameState, blend);
    for (let j = 0, jj = zs.length; j < jj; ++j) {
      const tileZ = zs[j];
      for (const tileRepresentation of representationsByZ[tileZ]) {
        const tileCoord = tileRepresentation.tile.tileCoord;
        const tileCoordKey = getKey(tileCoord);
        if (tileCoordKey in alphaLookup) {
          continue;
        }
        this.drawTile_(frameState, tileRepresentation, tileZ, gutter, extent, alphaLookup, tileGrid);
      }
    }
    if (z in representationsByZ) {
      for (const tileRepresentation of representationsByZ[z]) {
        const tileCoord = tileRepresentation.tile.tileCoord;
        const tileCoordKey = getKey(tileCoord);
        if (tileCoordKey in alphaLookup) {
          this.drawTile_(frameState, tileRepresentation, z, gutter, extent, alphaLookup, tileGrid);
        }
      }
    }
    this.beforeFinalize(frameState);
    this.helper.finalizeDraw(frameState, this.dispatchPreComposeEvent, this.dispatchPostComposeEvent);
    const canvas = this.helper.getCanvas();
    const tileRepresentationCache = this.tileRepresentationCache;
    while (tileRepresentationCache.canExpireCache()) {
      const tileRepresentation = tileRepresentationCache.pop();
      tileRepresentation.dispose();
    }
    this.postRender(gl, frameState);
    return canvas;
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */
  beforeFinalize(frameState) {
    return;
  }
  /**
   * Look for tiles covering the provided tile coordinate at an alternate
   * zoom level.  Loaded tiles will be added to the provided tile representation lookup.
   * @param {import("../../tilegrid/TileGrid.js").default} tileGrid The tile grid.
   * @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
   * @param {number} altZ The alternate zoom level.
   * @param {TileRepresentationLookup} tileRepresentationLookup Lookup of
   * tile representations by zoom level.
   * @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
   * @private
   */
  findAltTiles_(tileGrid, tileCoord, altZ, tileRepresentationLookup) {
    const tileRange = tileGrid.getTileRangeForTileCoordAndZ(tileCoord, altZ, this.tempTileRange_);
    if (!tileRange) {
      return false;
    }
    let covered = true;
    const tileRepresentationCache = this.tileRepresentationCache;
    const source = this.getLayer().getRenderSource();
    for (let x = tileRange.minX; x <= tileRange.maxX; ++x) {
      for (let y = tileRange.minY; y <= tileRange.maxY; ++y) {
        const cacheKey = getCacheKey(source, [altZ, x, y]);
        let loaded = false;
        if (tileRepresentationCache.containsKey(cacheKey)) {
          const tileRepresentation = tileRepresentationCache.get(cacheKey);
          if (tileRepresentation.ready && !lookupHasTile(tileRepresentationLookup, tileRepresentation.tile)) {
            addTileRepresentationToLookup(tileRepresentationLookup, tileRepresentation, altZ);
            loaded = true;
          }
        }
        if (!loaded) {
          covered = false;
        }
      }
    }
    return covered;
  }
  /**
   * @override
   */
  clearCache() {
    super.clearCache();
    const tileRepresentationCache = this.tileRepresentationCache;
    tileRepresentationCache.forEach((tileRepresentation) => tileRepresentation.dispose());
    tileRepresentationCache.clear();
  }
  /**
   * @override
   */
  afterHelperCreated() {
    super.afterHelperCreated();
    this.tileRepresentationCache.forEach((tileRepresentation) => tileRepresentation.setHelper(this.helper));
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    super.disposeInternal();
    delete this.frameState;
  }
};
var TileLayerBase_default = WebGLBaseTileLayerRenderer;

// node_modules/ol/renderer/webgl/TileLayer.js
var Uniforms2 = __spreadProps(__spreadValues({}, Uniforms), {
  TILE_TEXTURE_ARRAY: "u_tileTextures",
  TEXTURE_PIXEL_WIDTH: "u_texturePixelWidth",
  TEXTURE_PIXEL_HEIGHT: "u_texturePixelHeight",
  TEXTURE_RESOLUTION: "u_textureResolution",
  // map units per texture pixel
  TEXTURE_ORIGIN_X: "u_textureOriginX",
  // map x coordinate of left edge of texture
  TEXTURE_ORIGIN_Y: "u_textureOriginY"
  // map y coordinate of top edge of texture
});
var Attributes = {
  TEXTURE_COORD: "a_textureCoord"
};
var attributeDescriptions = [{
  name: Attributes.TEXTURE_COORD,
  size: 2,
  type: AttributeType.FLOAT
}];
var WebGLTileLayerRenderer = class extends TileLayerBase_default {
  /**
   * @param {LayerType} tileLayer Tile layer.
   * @param {Options} options Options.
   */
  constructor(tileLayer, options) {
    super(tileLayer, options);
    this.program_;
    this.vertexShader_ = options.vertexShader;
    this.fragmentShader_ = options.fragmentShader;
    this.indices_ = new Buffer_default(ELEMENT_ARRAY_BUFFER, STATIC_DRAW);
    this.indices_.fromArray([0, 1, 3, 1, 2, 3]);
    this.paletteTextures_ = options.paletteTextures || [];
  }
  /**
   * @param {Options} options Options.
   * @override
   */
  reset(options) {
    super.reset(options);
    if (this.helper) {
      const gl = this.helper.getGL();
      for (const paletteTexture of this.paletteTextures_) {
        paletteTexture.delete(gl);
      }
    }
    this.vertexShader_ = options.vertexShader;
    this.fragmentShader_ = options.fragmentShader;
    this.paletteTextures_ = options.paletteTextures || [];
    if (this.helper) {
      this.program_ = this.helper.getProgram(this.fragmentShader_, this.vertexShader_);
      const gl = this.helper.getGL();
      for (const paletteTexture of this.paletteTextures_) {
        paletteTexture.getTexture(gl);
      }
    }
  }
  /**
   * @override
   */
  afterHelperCreated() {
    super.afterHelperCreated();
    const gl = this.helper.getGL();
    for (const paletteTexture of this.paletteTextures_) {
      paletteTexture.getTexture(gl);
    }
    this.program_ = this.helper.getProgram(this.fragmentShader_, this.vertexShader_);
    this.helper.flushBufferData(this.indices_);
  }
  /**
   * @override
   */
  removeHelper() {
    if (this.helper) {
      const gl = this.helper.getGL();
      for (const paletteTexture of this.paletteTextures_) {
        paletteTexture.delete(gl);
      }
    }
    super.removeHelper();
  }
  /**
   * @override
   */
  createTileRepresentation(options) {
    return new TileTexture_default(options);
  }
  /**
   * @override
   */
  beforeTilesRender(frameState, tilesWithAlpha) {
    super.beforeTilesRender(frameState, tilesWithAlpha);
    this.helper.useProgram(this.program_, frameState);
  }
  /**
   * @override
   */
  renderTile(tileTexture, tileTransform, frameState, renderExtent, tileResolution, tileSize, tileOrigin, tileExtent, depth, gutter, alpha) {
    const gl = this.helper.getGL();
    this.helper.bindBuffer(tileTexture.coords);
    this.helper.bindBuffer(this.indices_);
    this.helper.enableAttributes(attributeDescriptions);
    let textureSlot = 0;
    while (textureSlot < tileTexture.textures.length) {
      const uniformName = "".concat(Uniforms2.TILE_TEXTURE_ARRAY, "[").concat(textureSlot, "]");
      this.helper.bindTexture(tileTexture.textures[textureSlot], textureSlot, uniformName);
      ++textureSlot;
    }
    for (let paletteIndex = 0; paletteIndex < this.paletteTextures_.length; ++paletteIndex) {
      const paletteTexture = this.paletteTextures_[paletteIndex];
      const texture = paletteTexture.getTexture(gl);
      this.helper.bindTexture(texture, textureSlot, paletteTexture.name);
      ++textureSlot;
    }
    const viewState = frameState.viewState;
    const tileWidthWithGutter = tileSize[0] + 2 * gutter;
    const tileHeightWithGutter = tileSize[1] + 2 * gutter;
    const tile = tileTexture.tile;
    const tileCoord = tile.tileCoord;
    const tileCenterI = tileCoord[1];
    const tileCenterJ = tileCoord[2];
    this.helper.setUniformMatrixValue(Uniforms2.TILE_TRANSFORM, fromTransform(this.tempMat4, tileTransform));
    this.helper.setUniformFloatValue(Uniforms2.TRANSITION_ALPHA, alpha);
    this.helper.setUniformFloatValue(Uniforms2.DEPTH, depth);
    let gutterExtent = renderExtent;
    if (gutter > 0) {
      gutterExtent = tileExtent;
      getIntersection(gutterExtent, renderExtent, gutterExtent);
    }
    this.helper.setUniformFloatVec4(Uniforms2.RENDER_EXTENT, gutterExtent);
    this.helper.setUniformFloatValue(Uniforms2.RESOLUTION, viewState.resolution);
    this.helper.setUniformFloatValue(Uniforms2.ZOOM, viewState.zoom);
    this.helper.setUniformFloatValue(Uniforms2.TEXTURE_PIXEL_WIDTH, tileWidthWithGutter);
    this.helper.setUniformFloatValue(Uniforms2.TEXTURE_PIXEL_HEIGHT, tileHeightWithGutter);
    this.helper.setUniformFloatValue(Uniforms2.TEXTURE_RESOLUTION, tileResolution);
    this.helper.setUniformFloatValue(Uniforms2.TEXTURE_ORIGIN_X, tileOrigin[0] + tileCenterI * tileSize[0] * tileResolution - gutter * tileResolution);
    this.helper.setUniformFloatValue(Uniforms2.TEXTURE_ORIGIN_Y, tileOrigin[1] - tileCenterJ * tileSize[1] * tileResolution + gutter * tileResolution);
    this.helper.drawElements(0, this.indices_.getSize());
  }
  /**
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView} Data at the pixel location.
   * @override
   */
  getData(pixel) {
    const gl = this.helper.getGL();
    if (!gl) {
      return null;
    }
    const frameState = this.frameState;
    if (!frameState) {
      return null;
    }
    const layer = this.getLayer();
    const coordinate = apply(frameState.pixelToCoordinateTransform, pixel.slice());
    const viewState = frameState.viewState;
    const layerExtent = layer.getExtent();
    if (layerExtent) {
      if (!containsCoordinate(fromUserExtent(layerExtent, viewState.projection), coordinate)) {
        return null;
      }
    }
    const sources = layer.getSources(boundingExtent([coordinate]), viewState.resolution);
    let i, source, tileGrid;
    for (i = sources.length - 1; i >= 0; --i) {
      source = sources[i];
      if (source.getState() === "ready") {
        tileGrid = source.getTileGridForProjection(viewState.projection);
        if (source.getWrapX()) {
          break;
        }
        const gridExtent = tileGrid.getExtent();
        if (!gridExtent || containsCoordinate(gridExtent, coordinate)) {
          break;
        }
      }
    }
    if (i < 0) {
      return null;
    }
    const tileTextureCache = this.tileRepresentationCache;
    for (let z = tileGrid.getZForResolution(viewState.resolution); z >= tileGrid.getMinZoom(); --z) {
      const tileCoord = tileGrid.getTileCoordForCoordAndZ(coordinate, z);
      const cacheKey = getCacheKey(source, tileCoord);
      if (!tileTextureCache.containsKey(cacheKey)) {
        continue;
      }
      const tileTexture = tileTextureCache.get(cacheKey);
      const tile = tileTexture.tile;
      if (tile.getState() === TileState_default.EMPTY) {
        return null;
      }
      if (!tileTexture.loaded) {
        continue;
      }
      const tileOrigin = tileGrid.getOrigin(z);
      const tileSize = toSize(tileGrid.getTileSize(z));
      const tileResolution = tileGrid.getResolution(z);
      const col = (coordinate[0] - tileOrigin[0]) / tileResolution - tileCoord[1] * tileSize[0];
      const row = (tileOrigin[1] - coordinate[1]) / tileResolution - tileCoord[2] * tileSize[1];
      return tileTexture.getPixelData(col, row);
    }
    return null;
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    const helper = this.helper;
    if (helper) {
      const gl = helper.getGL();
      for (const paletteTexture of this.paletteTextures_) {
        paletteTexture.delete(gl);
      }
      this.paletteTextures_.length = 0;
      gl.deleteProgram(this.program_);
      delete this.program_;
      helper.deleteBuffer(this.indices_);
    }
    super.disposeInternal();
    delete this.indices_;
  }
};
var TileLayer_default2 = WebGLTileLayerRenderer;

// node_modules/ol/webgl/PaletteTexture.js
var PaletteTexture = class {
  /**
   * @param {string} name The name of the texture.
   * @param {Uint8Array} data The texture data.
   */
  constructor(name, data) {
    this.name = name;
    this.data = data;
    this.texture_ = null;
  }
  /**
   * @param {WebGLRenderingContext} gl Rendering context.
   * @return {WebGLTexture} The texture.
   */
  getTexture(gl) {
    if (!this.texture_) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.data.length / 4, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.data);
      this.texture_ = texture;
    }
    return this.texture_;
  }
  /**
   * @param {WebGLRenderingContext} gl Rendering context.
   */
  delete(gl) {
    if (this.texture_) {
      gl.deleteTexture(this.texture_);
    }
    this.texture_ = null;
  }
};
var PaletteTexture_default = PaletteTexture;

// node_modules/ol/expr/gpu.js
function computeOperatorFunctionName(operator, context) {
  return "operator_".concat(operator, "_").concat(Object.keys(context.functions).length);
}
function numberToGlsl(v) {
  const s = v.toString();
  return s.includes(".") ? s : s + ".0";
}
function arrayToGlsl(array) {
  if (array.length < 2 || array.length > 4) {
    throw new Error("`formatArray` can only output `vec2`, `vec3` or `vec4` arrays.");
  }
  return "vec".concat(array.length, "(").concat(array.map(numberToGlsl).join(", "), ")");
}
function colorToGlsl(color) {
  const array = asArray(color);
  const alpha = array.length > 3 ? array[3] : 1;
  return arrayToGlsl([array[0] / 255, array[1] / 255, array[2] / 255, alpha]);
}
function sizeToGlsl(size) {
  const array = toSize(size);
  return arrayToGlsl(array);
}
var stringToFloatMap = {};
var stringToFloatCounter = 0;
function getStringNumberEquivalent(string) {
  if (!(string in stringToFloatMap)) {
    stringToFloatMap[string] = stringToFloatCounter++;
  }
  return stringToFloatMap[string];
}
function stringToGlsl(string) {
  return numberToGlsl(getStringNumberEquivalent(string));
}
function uniformNameForVariable(variableName) {
  return "u_var_" + variableName;
}
function newCompilationContext() {
  return {
    variables: {},
    properties: {},
    functions: {},
    bandCount: 0,
    featureId: false,
    geometryType: false
  };
}
var GET_BAND_VALUE_FUNC = "getBandValue";
var PALETTE_TEXTURE_ARRAY = "u_paletteTextures";
var FEATURE_ID_PROPERTY_NAME = "featureId";
var GEOMETRY_TYPE_PROPERTY_NAME = "geometryType";
var UNDEFINED_PROP_VALUE = -9999999;
function buildExpression2(encoded, type, parsingContext, compilationContext) {
  const expression = parse(encoded, type, parsingContext);
  return compile(expression, type, compilationContext);
}
function createCompiler(output) {
  return (context, expression, type) => {
    const length = expression.args.length;
    const args = new Array(length);
    for (let i = 0; i < length; ++i) {
      args[i] = compile(expression.args[i], type, context);
    }
    return output(args, context);
  };
}
var compilers = {
  [Ops.Get]: (context, expression) => {
    const firstArg = (
      /** @type {LiteralExpression} */
      expression.args[0]
    );
    const propName = (
      /** @type {string} */
      firstArg.value
    );
    const isExisting = propName in context.properties;
    if (!isExisting) {
      context.properties[propName] = {
        name: propName,
        type: expression.type
      };
    }
    return "a_prop_" + propName;
  },
  [Ops.Id]: (context) => {
    context.featureId = true;
    return "a_" + FEATURE_ID_PROPERTY_NAME;
  },
  [Ops.GeometryType]: (context) => {
    context.geometryType = true;
    return "a_" + GEOMETRY_TYPE_PROPERTY_NAME;
  },
  [Ops.LineMetric]: () => "currentLineMetric",
  // this variable is assumed to always be present in shaders, default is 0.
  [Ops.Var]: (context, expression) => {
    const firstArg = (
      /** @type {LiteralExpression} */
      expression.args[0]
    );
    const varName = (
      /** @type {string} */
      firstArg.value
    );
    const isExisting = varName in context.variables;
    if (!isExisting) {
      context.variables[varName] = {
        name: varName,
        type: expression.type
      };
    }
    return uniformNameForVariable(varName);
  },
  [Ops.Has]: (context, expression) => {
    const firstArg = (
      /** @type {LiteralExpression} */
      expression.args[0]
    );
    const propName = (
      /** @type {string} */
      firstArg.value
    );
    const isExisting = propName in context.properties;
    if (!isExisting) {
      context.properties[propName] = {
        name: propName,
        type: expression.type
      };
    }
    return "(a_prop_".concat(propName, " != ").concat(numberToGlsl(UNDEFINED_PROP_VALUE), ")");
  },
  [Ops.Resolution]: () => "u_resolution",
  [Ops.Zoom]: () => "u_zoom",
  [Ops.Time]: () => "u_time",
  [Ops.Any]: createCompiler((compiledArgs) => "(".concat(compiledArgs.join(" || "), ")")),
  [Ops.All]: createCompiler((compiledArgs) => "(".concat(compiledArgs.join(" && "), ")")),
  [Ops.Not]: createCompiler(([value]) => "(!".concat(value, ")")),
  [Ops.Equal]: createCompiler(([firstValue, secondValue]) => "(".concat(firstValue, " == ").concat(secondValue, ")")),
  [Ops.NotEqual]: createCompiler(([firstValue, secondValue]) => "(".concat(firstValue, " != ").concat(secondValue, ")")),
  [Ops.GreaterThan]: createCompiler(([firstValue, secondValue]) => "(".concat(firstValue, " > ").concat(secondValue, ")")),
  [Ops.GreaterThanOrEqualTo]: createCompiler(([firstValue, secondValue]) => "(".concat(firstValue, " >= ").concat(secondValue, ")")),
  [Ops.LessThan]: createCompiler(([firstValue, secondValue]) => "(".concat(firstValue, " < ").concat(secondValue, ")")),
  [Ops.LessThanOrEqualTo]: createCompiler(([firstValue, secondValue]) => "(".concat(firstValue, " <= ").concat(secondValue, ")")),
  [Ops.Multiply]: createCompiler((compiledArgs) => "(".concat(compiledArgs.join(" * "), ")")),
  [Ops.Divide]: createCompiler(([firstValue, secondValue]) => "(".concat(firstValue, " / ").concat(secondValue, ")")),
  [Ops.Add]: createCompiler((compiledArgs) => "(".concat(compiledArgs.join(" + "), ")")),
  [Ops.Subtract]: createCompiler(([firstValue, secondValue]) => "(".concat(firstValue, " - ").concat(secondValue, ")")),
  [Ops.Clamp]: createCompiler(([value, min, max]) => "clamp(".concat(value, ", ").concat(min, ", ").concat(max, ")")),
  [Ops.Mod]: createCompiler(([value, modulo]) => "mod(".concat(value, ", ").concat(modulo, ")")),
  [Ops.Pow]: createCompiler(([value, power]) => "pow(".concat(value, ", ").concat(power, ")")),
  [Ops.Abs]: createCompiler(([value]) => "abs(".concat(value, ")")),
  [Ops.Floor]: createCompiler(([value]) => "floor(".concat(value, ")")),
  [Ops.Ceil]: createCompiler(([value]) => "ceil(".concat(value, ")")),
  [Ops.Round]: createCompiler(([value]) => "floor(".concat(value, " + 0.5)")),
  [Ops.Sin]: createCompiler(([value]) => "sin(".concat(value, ")")),
  [Ops.Cos]: createCompiler(([value]) => "cos(".concat(value, ")")),
  [Ops.Atan]: createCompiler(([firstValue, secondValue]) => {
    return secondValue !== void 0 ? "atan(".concat(firstValue, ", ").concat(secondValue, ")") : "atan(".concat(firstValue, ")");
  }),
  [Ops.Sqrt]: createCompiler(([value]) => "sqrt(".concat(value, ")")),
  [Ops.Match]: createCompiler((compiledArgs) => {
    const input = compiledArgs[0];
    const fallback = compiledArgs[compiledArgs.length - 1];
    let result = null;
    for (let i = compiledArgs.length - 3; i >= 1; i -= 2) {
      const match = compiledArgs[i];
      const output = compiledArgs[i + 1];
      result = "(".concat(input, " == ").concat(match, " ? ").concat(output, " : ").concat(result || fallback, ")");
    }
    return result;
  }),
  [Ops.Between]: createCompiler(([value, min, max]) => "(".concat(value, " >= ").concat(min, " && ").concat(value, " <= ").concat(max, ")")),
  [Ops.Interpolate]: createCompiler(([exponent, input, ...compiledArgs]) => {
    let result = "";
    for (let i = 0; i < compiledArgs.length - 2; i += 2) {
      const stop1 = compiledArgs[i];
      const output1 = result || compiledArgs[i + 1];
      const stop2 = compiledArgs[i + 2];
      const output2 = compiledArgs[i + 3];
      let ratio;
      if (exponent === numberToGlsl(1)) {
        ratio = "(".concat(input, " - ").concat(stop1, ") / (").concat(stop2, " - ").concat(stop1, ")");
      } else {
        ratio = "(pow(".concat(exponent, ", (").concat(input, " - ").concat(stop1, ")) - 1.0) / (pow(").concat(exponent, ", (").concat(stop2, " - ").concat(stop1, ")) - 1.0)");
      }
      result = "mix(".concat(output1, ", ").concat(output2, ", clamp(").concat(ratio, ", 0.0, 1.0))");
    }
    return result;
  }),
  [Ops.Case]: createCompiler((compiledArgs) => {
    const fallback = compiledArgs[compiledArgs.length - 1];
    let result = null;
    for (let i = compiledArgs.length - 3; i >= 0; i -= 2) {
      const condition = compiledArgs[i];
      const output = compiledArgs[i + 1];
      result = "(".concat(condition, " ? ").concat(output, " : ").concat(result || fallback, ")");
    }
    return result;
  }),
  [Ops.In]: createCompiler(([needle, ...haystack], context) => {
    const funcName = computeOperatorFunctionName("in", context);
    const tests = [];
    for (let i = 0; i < haystack.length; i += 1) {
      tests.push("  if (inputValue == ".concat(haystack[i], ") { return true; }"));
    }
    context.functions[funcName] = "bool ".concat(funcName, "(float inputValue) {\n").concat(tests.join("\n"), "\n  return false;\n}");
    return "".concat(funcName, "(").concat(needle, ")");
  }),
  [Ops.Array]: createCompiler((args) => "vec".concat(args.length, "(").concat(args.join(", "), ")")),
  [Ops.Color]: createCompiler((compiledArgs) => {
    if (compiledArgs.length === 1) {
      return "vec4(vec3(".concat(compiledArgs[0], " / 255.0), 1.0)");
    }
    if (compiledArgs.length === 2) {
      return "vec4(vec3(".concat(compiledArgs[0], " / 255.0), ").concat(compiledArgs[1], ")");
    }
    const rgb = compiledArgs.slice(0, 3).map((color) => "".concat(color, " / 255.0"));
    if (compiledArgs.length === 3) {
      return "vec4(".concat(rgb.join(", "), ", 1.0)");
    }
    const alpha = compiledArgs[3];
    return "vec4(".concat(rgb.join(", "), ", ").concat(alpha, ")");
  }),
  [Ops.Band]: createCompiler(([band, xOffset, yOffset], context) => {
    if (!(GET_BAND_VALUE_FUNC in context.functions)) {
      let ifBlocks = "";
      const bandCount = context.bandCount || 1;
      for (let i = 0; i < bandCount; i++) {
        const colorIndex = Math.floor(i / 4);
        let bandIndex = i % 4;
        if (i === bandCount - 1 && bandIndex === 1) {
          bandIndex = 3;
        }
        const textureName = "".concat(Uniforms2.TILE_TEXTURE_ARRAY, "[").concat(colorIndex, "]");
        ifBlocks += "  if (band == ".concat(i + 1, ".0) {\n    return texture2D(").concat(textureName, ", v_textureCoord + vec2(dx, dy))[").concat(bandIndex, "];\n  }\n");
      }
      context.functions[GET_BAND_VALUE_FUNC] = "float getBandValue(float band, float xOffset, float yOffset) {\n  float dx = xOffset / ".concat(Uniforms2.TEXTURE_PIXEL_WIDTH, ";\n  float dy = yOffset / ").concat(Uniforms2.TEXTURE_PIXEL_HEIGHT, ";\n").concat(ifBlocks, "\n}");
    }
    return "".concat(GET_BAND_VALUE_FUNC, "(").concat(band, ", ").concat(xOffset != null ? xOffset : "0.0", ", ").concat(yOffset != null ? yOffset : "0.0", ")");
  }),
  [Ops.Palette]: (context, expression) => {
    const [index, ...colors] = expression.args;
    const numColors = colors.length;
    const palette = new Uint8Array(numColors * 4);
    for (let i = 0; i < colors.length; i++) {
      const parsedValue = (
        /** @type {string | Array<number>} */
        /** @type {LiteralExpression} */
        colors[i].value
      );
      const color = asArray(parsedValue);
      const offset = i * 4;
      palette[offset] = color[0];
      palette[offset + 1] = color[1];
      palette[offset + 2] = color[2];
      palette[offset + 3] = color[3] * 255;
    }
    if (!context.paletteTextures) {
      context.paletteTextures = [];
    }
    const paletteName = "".concat(PALETTE_TEXTURE_ARRAY, "[").concat(context.paletteTextures.length, "]");
    const paletteTexture = new PaletteTexture_default(paletteName, palette);
    context.paletteTextures.push(paletteTexture);
    const compiledIndex = compile(index, NumberType, context);
    return "texture2D(".concat(paletteName, ", vec2((").concat(compiledIndex, " + 0.5) / ").concat(numColors, ".0, 0.5))");
  }
  // TODO: unimplemented
  // Ops.Number
  // Ops.String
  // Ops.Coalesce
  // Ops.Concat
  // Ops.ToString
};
function compile(expression, returnType, context) {
  if (expression instanceof CallExpression) {
    const compiler = compilers[expression.operator];
    if (compiler === void 0) {
      throw new Error("No compiler defined for this operator: ".concat(JSON.stringify(expression.operator)));
    }
    return compiler(context, expression, returnType);
  }
  if ((expression.type & NumberType) > 0) {
    return numberToGlsl(
      /** @type {number} */
      expression.value
    );
  }
  if ((expression.type & BooleanType) > 0) {
    return expression.value.toString();
  }
  if ((expression.type & StringType) > 0) {
    return stringToGlsl(expression.value.toString());
  }
  if ((expression.type & ColorType) > 0) {
    return colorToGlsl(
      /** @type {Array<number> | string} */
      expression.value
    );
  }
  if ((expression.type & NumberArrayType) > 0) {
    return arrayToGlsl(
      /** @type {Array<number>} */
      expression.value
    );
  }
  if ((expression.type & SizeType) > 0) {
    return sizeToGlsl(
      /** @type {number|import('../size.js').Size} */
      expression.value
    );
  }
  throw new Error("Unexpected expression ".concat(expression.value, " (expected type ").concat(typeName(returnType), ")"));
}

// node_modules/ol/style/flat.js
function createDefaultStyle() {
  return {
    "fill-color": "rgba(255,255,255,0.4)",
    "stroke-color": "#3399CC",
    "stroke-width": 1.25,
    "circle-radius": 5,
    "circle-fill-color": "rgba(255,255,255,0.4)",
    "circle-stroke-width": 1.25,
    "circle-stroke-color": "#3399CC"
  };
}

// node_modules/ol/render/webgl/bufferUtil.js
var LINESTRING_ANGLE_COSINE_CUTOFF = 0.985;

// node_modules/ol/render/webgl/ShaderBuilder.js
var COMMON_HEADER = "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_screenToWorldMatrix;\nuniform vec2 u_viewportSizePx;\nuniform float u_pixelRatio;\nuniform float u_globalAlpha;\nuniform float u_time;\nuniform float u_zoom;\nuniform float u_resolution;\nuniform float u_rotation;\nuniform vec4 u_renderExtent;\nuniform vec2 u_patternOrigin;\nuniform float u_depth;\nuniform mediump int u_hitDetection;\n\nconst float PI = 3.141592653589793238;\nconst float TWO_PI = 2.0 * PI;\nfloat currentLineMetric = 0.; // an actual value will be used in the stroke shaders\n";
var DEFAULT_STYLE = createDefaultStyle();
var ShaderBuilder = class {
  constructor() {
    this.uniforms_ = [];
    this.attributes_ = [];
    this.hasSymbol_ = false;
    this.symbolSizeExpression_ = "vec2(".concat(numberToGlsl(DEFAULT_STYLE["circle-radius"]), " + ").concat(numberToGlsl(DEFAULT_STYLE["circle-stroke-width"] * 0.5), ")");
    this.symbolRotationExpression_ = "0.0";
    this.symbolOffsetExpression_ = "vec2(0.0)";
    this.symbolColorExpression_ = colorToGlsl(
      /** @type {string} */
      DEFAULT_STYLE["circle-fill-color"]
    );
    this.texCoordExpression_ = "vec4(0.0, 0.0, 1.0, 1.0)";
    this.discardExpression_ = "false";
    this.symbolRotateWithView_ = false;
    this.hasStroke_ = false;
    this.strokeWidthExpression_ = numberToGlsl(DEFAULT_STYLE["stroke-width"]);
    this.strokeColorExpression_ = colorToGlsl(
      /** @type {string} */
      DEFAULT_STYLE["stroke-color"]
    );
    this.strokeOffsetExpression_ = "0.";
    this.strokeCapExpression_ = stringToGlsl("round");
    this.strokeJoinExpression_ = stringToGlsl("round");
    this.strokeMiterLimitExpression_ = "10.";
    this.strokeDistanceFieldExpression_ = "-1000.";
    this.hasFill_ = false;
    this.fillColorExpression_ = colorToGlsl(
      /** @type {string} */
      DEFAULT_STYLE["fill-color"]
    );
    this.vertexShaderFunctions_ = [];
    this.fragmentShaderFunctions_ = [];
  }
  /**
   * Adds a uniform accessible in both fragment and vertex shaders.
   * The given name should include a type, such as `sampler2D u_texture`.
   * @param {string} name Uniform name, including the `u_` prefix
   * @param {'float'|'vec2'|'vec3'|'vec4'|'sampler2D'} type GLSL type
   * @return {ShaderBuilder} the builder object
   */
  addUniform(name, type) {
    this.uniforms_.push({
      name,
      type
    });
    return this;
  }
  /**
   * Adds an attribute accessible in the vertex shader, read from the geometry buffer.
   * The given name should include a type, such as `vec2 a_position`.
   * Attributes will also be made available under the same name in fragment shaders.
   * @param {string} name Attribute name, including the `a_` prefix
   * @param {'float'|'vec2'|'vec3'|'vec4'} type GLSL type
   * @param {string} [varyingExpression] Expression which will be assigned to the varying in the vertex shader, and
   * passed on to the fragment shader.
   * @param {'float'|'vec2'|'vec3'|'vec4'} [varyingType] Type of the attribute after transformation;
   * e.g. `vec4` after unpacking color components
   * @return {ShaderBuilder} the builder object
   */
  addAttribute(name, type, varyingExpression, varyingType) {
    this.attributes_.push({
      name,
      type,
      varyingName: name.replace(/^a_/, "v_"),
      varyingType: varyingType != null ? varyingType : type,
      varyingExpression: varyingExpression != null ? varyingExpression : name
    });
    return this;
  }
  /**
   * Sets an expression to compute the size of the shape.
   * This expression can use all the uniforms and attributes available
   * in the vertex shader, and should evaluate to a `vec2` value.
   * @param {string} expression Size expression
   * @return {ShaderBuilder} the builder object
   */
  setSymbolSizeExpression(expression) {
    this.hasSymbol_ = true;
    this.symbolSizeExpression_ = expression;
    return this;
  }
  /**
   * @return {string} The current symbol size expression
   */
  getSymbolSizeExpression() {
    return this.symbolSizeExpression_;
  }
  /**
   * Sets an expression to compute the rotation of the shape.
   * This expression can use all the uniforms and attributes available
   * in the vertex shader, and should evaluate to a `float` value in radians.
   * @param {string} expression Size expression
   * @return {ShaderBuilder} the builder object
   */
  setSymbolRotationExpression(expression) {
    this.symbolRotationExpression_ = expression;
    return this;
  }
  /**
   * Sets an expression to compute the offset of the symbol from the point center.
   * This expression can use all the uniforms and attributes available
   * in the vertex shader, and should evaluate to a `vec2` value.
   * @param {string} expression Offset expression
   * @return {ShaderBuilder} the builder object
   */
  setSymbolOffsetExpression(expression) {
    this.symbolOffsetExpression_ = expression;
    return this;
  }
  /**
   * @return {string} The current symbol offset expression
   */
  getSymbolOffsetExpression() {
    return this.symbolOffsetExpression_;
  }
  /**
   * Sets an expression to compute the color of the shape.
   * This expression can use all the uniforms, varyings and attributes available
   * in the fragment shader, and should evaluate to a `vec4` value.
   * @param {string} expression Color expression
   * @return {ShaderBuilder} the builder object
   */
  setSymbolColorExpression(expression) {
    this.hasSymbol_ = true;
    this.symbolColorExpression_ = expression;
    return this;
  }
  /**
   * @return {string} The current symbol color expression
   */
  getSymbolColorExpression() {
    return this.symbolColorExpression_;
  }
  /**
   * Sets an expression to compute the texture coordinates of the vertices.
   * This expression can use all the uniforms and attributes available
   * in the vertex shader, and should evaluate to a `vec4` value.
   * @param {string} expression Texture coordinate expression
   * @return {ShaderBuilder} the builder object
   */
  setTextureCoordinateExpression(expression) {
    this.texCoordExpression_ = expression;
    return this;
  }
  /**
   * Sets an expression to determine whether a fragment (pixel) should be discarded,
   * i.e. not drawn at all.
   * This expression can use all the uniforms, varyings and attributes available
   * in the fragment shader, and should evaluate to a `bool` value (it will be
   * used in an `if` statement)
   * @param {string} expression Fragment discard expression
   * @return {ShaderBuilder} the builder object
   */
  setFragmentDiscardExpression(expression) {
    this.discardExpression_ = expression;
    return this;
  }
  /**
   * @return {string} The current fragment discard expression
   */
  getFragmentDiscardExpression() {
    return this.discardExpression_;
  }
  /**
   * Sets whether the symbols should rotate with the view or stay aligned with the map.
   * Note: will only be used for point geometry shaders.
   * @param {boolean} rotateWithView Rotate with view
   * @return {ShaderBuilder} the builder object
   */
  setSymbolRotateWithView(rotateWithView) {
    this.symbolRotateWithView_ = rotateWithView;
    return this;
  }
  /**
   * @param {string} expression Stroke width expression, returning value in pixels
   * @return {ShaderBuilder} the builder object
   */
  setStrokeWidthExpression(expression) {
    this.hasStroke_ = true;
    this.strokeWidthExpression_ = expression;
    return this;
  }
  /**
   * @param {string} expression Stroke color expression, evaluate to `vec4`: can rely on currentLengthPx and currentRadiusPx
   * @return {ShaderBuilder} the builder object
   */
  setStrokeColorExpression(expression) {
    this.hasStroke_ = true;
    this.strokeColorExpression_ = expression;
    return this;
  }
  /**
   * @return {string} The current stroke color expression
   */
  getStrokeColorExpression() {
    return this.strokeColorExpression_;
  }
  /**
   * @param {string} expression Stroke color expression, evaluate to `float`
   * @return {ShaderBuilder} the builder object
   */
  setStrokeOffsetExpression(expression) {
    this.strokeOffsetExpression_ = expression;
    return this;
  }
  /**
   * @param {string} expression Stroke line cap expression, evaluate to `float`
   * @return {ShaderBuilder} the builder object
   */
  setStrokeCapExpression(expression) {
    this.strokeCapExpression_ = expression;
    return this;
  }
  /**
   * @param {string} expression Stroke line join expression, evaluate to `float`
   * @return {ShaderBuilder} the builder object
   */
  setStrokeJoinExpression(expression) {
    this.strokeJoinExpression_ = expression;
    return this;
  }
  /**
   * @param {string} expression Stroke miter limit expression, evaluate to `float`
   * @return {ShaderBuilder} the builder object
   */
  setStrokeMiterLimitExpression(expression) {
    this.strokeMiterLimitExpression_ = expression;
    return this;
  }
  /**
   * @param {string} expression Stroke distance field expression, evaluate to `float`
   * This can override the default distance field; can rely on currentLengthPx and currentRadiusPx
   * @return {ShaderBuilder} the builder object
   */
  setStrokeDistanceFieldExpression(expression) {
    this.strokeDistanceFieldExpression_ = expression;
    return this;
  }
  /**
   * @param {string} expression Fill color expression, evaluate to `vec4`
   * @return {ShaderBuilder} the builder object
   */
  setFillColorExpression(expression) {
    this.hasFill_ = true;
    this.fillColorExpression_ = expression;
    return this;
  }
  /**
   * @return {string} The current fill color expression
   */
  getFillColorExpression() {
    return this.fillColorExpression_;
  }
  addVertexShaderFunction(code) {
    if (this.vertexShaderFunctions_.includes(code)) {
      return this;
    }
    this.vertexShaderFunctions_.push(code);
    return this;
  }
  addFragmentShaderFunction(code) {
    if (this.fragmentShaderFunctions_.includes(code)) {
      return this;
    }
    this.fragmentShaderFunctions_.push(code);
    return this;
  }
  /**
   * Generates a symbol vertex shader from the builder parameters
   * @return {string|null} The full shader as a string; null if no size or color specified
   */
  getSymbolVertexShader() {
    if (!this.hasSymbol_) {
      return null;
    }
    return "".concat(COMMON_HEADER, "\n").concat(this.uniforms_.map((uniform) => "uniform ".concat(uniform.type, " ").concat(uniform.name, ";")).join("\n"), "\nattribute vec2 a_position;\nattribute float a_index;\nattribute vec4 a_hitColor;\n\nvarying vec2 v_texCoord;\nvarying vec2 v_quadCoord;\nvarying vec4 v_hitColor;\nvarying vec2 v_centerPx;\nvarying float v_angle;\nvarying vec2 v_quadSizePx;\n\n").concat(this.attributes_.map((attribute) => "attribute ".concat(attribute.type, " ").concat(attribute.name, ";\nvarying ").concat(attribute.varyingType, " ").concat(attribute.varyingName, ";")).join("\n"), "\n").concat(this.vertexShaderFunctions_.join("\n"), "\nvec2 pxToScreen(vec2 coordPx) {\n  vec2 scaled = coordPx / u_viewportSizePx / 0.5;\n  return scaled;\n}\n\nvec2 screenToPx(vec2 coordScreen) {\n  return (coordScreen * 0.5 + 0.5) * u_viewportSizePx;\n}\n\nvoid main(void) {\n  v_quadSizePx = ").concat(this.symbolSizeExpression_, ";\n  vec2 halfSizePx = v_quadSizePx * 0.5;\n  vec2 centerOffsetPx = ").concat(this.symbolOffsetExpression_, ";\n  vec2 offsetPx = centerOffsetPx;\n  if (a_index == 0.0) {\n    offsetPx -= halfSizePx;\n  } else if (a_index == 1.0) {\n    offsetPx += halfSizePx * vec2(1., -1.);\n  } else if (a_index == 2.0) {\n    offsetPx += halfSizePx;\n  } else {\n    offsetPx += halfSizePx * vec2(-1., 1.);\n  }\n  float angle = ").concat(this.symbolRotationExpression_).concat(this.symbolRotateWithView_ ? " + u_rotation" : "", ";\n  float c = cos(-angle);\n  float s = sin(-angle);\n  offsetPx = vec2(c * offsetPx.x - s * offsetPx.y, s * offsetPx.x + c * offsetPx.y);\n  vec4 center = u_projectionMatrix * vec4(a_position, 0.0, 1.0);\n  gl_Position = center + vec4(pxToScreen(offsetPx), u_depth, 0.);\n  vec4 texCoord = ").concat(this.texCoordExpression_, ";\n  float u = a_index == 0.0 || a_index == 3.0 ? texCoord.s : texCoord.p;\n  float v = a_index == 2.0 || a_index == 3.0 ? texCoord.t : texCoord.q;\n  v_texCoord = vec2(u, v);\n  v_hitColor = a_hitColor;\n  v_angle = angle;\n  c = cos(-v_angle);\n  s = sin(-v_angle);\n  centerOffsetPx = vec2(c * centerOffsetPx.x - s * centerOffsetPx.y, s * centerOffsetPx.x + c * centerOffsetPx.y);\n  v_centerPx = screenToPx(center.xy) + centerOffsetPx;\n").concat(this.attributes_.map((attribute) => "  ".concat(attribute.varyingName, " = ").concat(attribute.varyingExpression, ";")).join("\n"), "\n}");
  }
  /**
   * Generates a symbol fragment shader from the builder parameters
   * @return {string|null} The full shader as a string; null if no size or color specified
   */
  getSymbolFragmentShader() {
    if (!this.hasSymbol_) {
      return null;
    }
    return "".concat(COMMON_HEADER, "\n").concat(this.uniforms_.map((uniform) => "uniform ".concat(uniform.type, " ").concat(uniform.name, ";")).join("\n"), "\nvarying vec2 v_texCoord;\nvarying vec4 v_hitColor;\nvarying vec2 v_centerPx;\nvarying float v_angle;\nvarying vec2 v_quadSizePx;\n").concat(this.attributes_.map((attribute) => "varying ".concat(attribute.varyingType, " ").concat(attribute.varyingName, ";")).join("\n"), "\n").concat(this.fragmentShaderFunctions_.join("\n"), "\n\nvoid main(void) {\n").concat(this.attributes_.map((attribute) => "  ".concat(attribute.varyingType, " ").concat(attribute.name, " = ").concat(attribute.varyingName, "; // assign to original attribute name")).join("\n"), "\n  if (").concat(this.discardExpression_, ") { discard; }\n  vec2 coordsPx = gl_FragCoord.xy / u_pixelRatio - v_centerPx; // relative to center\n  float c = cos(v_angle);\n  float s = sin(v_angle);\n  coordsPx = vec2(c * coordsPx.x - s * coordsPx.y, s * coordsPx.x + c * coordsPx.y);\n  gl_FragColor = ").concat(this.symbolColorExpression_, ";\n  gl_FragColor.rgb *= gl_FragColor.a;\n  if (u_hitDetection > 0) {\n    if (gl_FragColor.a < 0.05) { discard; };\n    gl_FragColor = v_hitColor;\n  }\n}");
  }
  /**
   * Generates a stroke vertex shader from the builder parameters
   * @return {string|null} The full shader as a string; null if no size or color specified
   */
  getStrokeVertexShader() {
    if (!this.hasStroke_) {
      return null;
    }
    return "".concat(COMMON_HEADER, "\n").concat(this.uniforms_.map((uniform) => "uniform ".concat(uniform.type, " ").concat(uniform.name, ";")).join("\n"), "\nattribute vec2 a_segmentStart;\nattribute vec2 a_segmentEnd;\nattribute float a_measureStart;\nattribute float a_measureEnd;\nattribute float a_parameters;\nattribute float a_distance;\nattribute vec2 a_joinAngles;\nattribute vec4 a_hitColor;\n\nvarying vec2 v_segmentStart;\nvarying vec2 v_segmentEnd;\nvarying float v_angleStart;\nvarying float v_angleEnd;\nvarying float v_width;\nvarying vec4 v_hitColor;\nvarying float v_distanceOffsetPx;\nvarying float v_measureStart;\nvarying float v_measureEnd;\n\n").concat(this.attributes_.map((attribute) => "attribute ".concat(attribute.type, " ").concat(attribute.name, ";\nvarying ").concat(attribute.varyingType, " ").concat(attribute.varyingName, ";")).join("\n"), "\n").concat(this.vertexShaderFunctions_.join("\n"), '\nvec2 worldToPx(vec2 worldPos) {\n  vec4 screenPos = u_projectionMatrix * vec4(worldPos, 0.0, 1.0);\n  return (0.5 * screenPos.xy + 0.5) * u_viewportSizePx;\n}\n\nvec4 pxToScreen(vec2 pxPos) {\n  vec2 screenPos = 2.0 * pxPos / u_viewportSizePx - 1.0;\n  return vec4(screenPos, u_depth, 1.0);\n}\n\nbool isCap(float joinAngle) {\n  return joinAngle < -0.1;\n}\n\nvec2 getJoinOffsetDirection(vec2 normalPx, float joinAngle) {\n  float halfAngle = joinAngle / 2.0;\n  float c = cos(halfAngle);\n  float s = sin(halfAngle);\n  vec2 angleBisectorNormal = vec2(s * normalPx.x + c * normalPx.y, -c * normalPx.x + s * normalPx.y);\n  float length = 1.0 / s;\n  return angleBisectorNormal * length;\n}\n\nvec2 getOffsetPoint(vec2 point, vec2 normal, float joinAngle, float offsetPx) {\n  // if on a cap or the join angle is too high, offset the line along the segment normal\n  if (cos(joinAngle) > 0.998 || isCap(joinAngle)) {\n    return point - normal * offsetPx;\n  }\n  // offset is applied along the inverted normal (positive offset goes "right" relative to line direction)\n  return point - getJoinOffsetDirection(normal, joinAngle) * offsetPx;\n}\n\nvoid main(void) {\n  v_angleStart = a_joinAngles.x;\n  v_angleEnd = a_joinAngles.y;\n  float vertexNumber = floor(abs(a_parameters) / 10000. + 0.5);\n  currentLineMetric = vertexNumber < 1.5 ? a_measureStart : a_measureEnd;\n  // we\'re reading the fractional part while keeping the sign (so -4.12 gives -0.12, 3.45 gives 0.45)\n  float angleTangentSum = fract(abs(a_parameters) / 10000.) * 10000. * sign(a_parameters);\n\n  float lineWidth = ').concat(this.strokeWidthExpression_, ";\n  float lineOffsetPx = ").concat(this.strokeOffsetExpression_, ";\n\n  // compute segment start/end in px with offset\n  vec2 segmentStartPx = worldToPx(a_segmentStart);\n  vec2 segmentEndPx = worldToPx(a_segmentEnd);\n  vec2 tangentPx = normalize(segmentEndPx - segmentStartPx);\n  vec2 normalPx = vec2(-tangentPx.y, tangentPx.x);\n  segmentStartPx = getOffsetPoint(segmentStartPx, normalPx, v_angleStart, lineOffsetPx),\n  segmentEndPx = getOffsetPoint(segmentEndPx, normalPx, v_angleEnd, lineOffsetPx);\n\n  // compute current vertex position\n  float normalDir = vertexNumber < 0.5 || (vertexNumber > 1.5 && vertexNumber < 2.5) ? 1.0 : -1.0;\n  float tangentDir = vertexNumber < 1.5 ? 1.0 : -1.0;\n  float angle = vertexNumber < 1.5 ? v_angleStart : v_angleEnd;\n  vec2 joinDirection;\n  vec2 positionPx = vertexNumber < 1.5 ? segmentStartPx : segmentEndPx;\n  // if angle is too high, do not make a proper join\n  if (cos(angle) > ").concat(LINESTRING_ANGLE_COSINE_CUTOFF, " || isCap(angle)) {\n    joinDirection = normalPx * normalDir - tangentPx * tangentDir;\n  } else {\n    joinDirection = getJoinOffsetDirection(normalPx * normalDir, angle);\n  }\n  positionPx = positionPx + joinDirection * (lineWidth * 0.5 + 1.); // adding 1 pixel for antialiasing\n  gl_Position = pxToScreen(positionPx);\n\n  v_segmentStart = segmentStartPx;\n  v_segmentEnd = segmentEndPx;\n  v_width = lineWidth;\n  v_hitColor = a_hitColor;\n  v_distanceOffsetPx = a_distance / u_resolution - (lineOffsetPx * angleTangentSum);\n  v_measureStart = a_measureStart;\n  v_measureEnd = a_measureEnd;\n").concat(this.attributes_.map((attribute) => "  ".concat(attribute.varyingName, " = ").concat(attribute.varyingExpression, ";")).join("\n"), "\n}");
  }
  /**
   * Generates a stroke fragment shader from the builder parameters
   *
   * @return {string|null} The full shader as a string; null if no size or color specified
   */
  getStrokeFragmentShader() {
    if (!this.hasStroke_) {
      return null;
    }
    return "".concat(COMMON_HEADER, "\n").concat(this.uniforms_.map((uniform) => "uniform ".concat(uniform.type, " ").concat(uniform.name, ";")).join("\n"), "\nvarying vec2 v_segmentStart;\nvarying vec2 v_segmentEnd;\nvarying float v_angleStart;\nvarying float v_angleEnd;\nvarying float v_width;\nvarying vec4 v_hitColor;\nvarying float v_distanceOffsetPx;\nvarying float v_measureStart;\nvarying float v_measureEnd;\n").concat(this.attributes_.map((attribute) => "varying ".concat(attribute.varyingType, " ").concat(attribute.varyingName, ";")).join("\n"), "\n").concat(this.fragmentShaderFunctions_.join("\n"), "\n\nvec2 pxToWorld(vec2 pxPos) {\n  vec2 screenPos = 2.0 * pxPos / u_viewportSizePx - 1.0;\n  return (u_screenToWorldMatrix * vec4(screenPos, 0.0, 1.0)).xy;\n}\n\nbool isCap(float joinAngle) {\n  return joinAngle < -0.1;\n}\n\nfloat segmentDistanceField(vec2 point, vec2 start, vec2 end, float width) {\n  vec2 tangent = normalize(end - start);\n  vec2 normal = vec2(-tangent.y, tangent.x);\n  vec2 startToPoint = point - start;\n  return abs(dot(startToPoint, normal)) - width * 0.5;\n}\n\nfloat buttCapDistanceField(vec2 point, vec2 start, vec2 end) {\n  vec2 startToPoint = point - start;\n  vec2 tangent = normalize(end - start);\n  return dot(startToPoint, -tangent);\n}\n\nfloat squareCapDistanceField(vec2 point, vec2 start, vec2 end, float width) {\n  return buttCapDistanceField(point, start, end) - width * 0.5;\n}\n\nfloat roundCapDistanceField(vec2 point, vec2 start, vec2 end, float width) {\n  float onSegment = max(0., 1000. * dot(point - start, end - start)); // this is very high when inside the segment\n  return length(point - start) - width * 0.5 - onSegment;\n}\n\nfloat roundJoinDistanceField(vec2 point, vec2 start, vec2 end, float width) {\n  return roundCapDistanceField(point, start, end, width);\n}\n\nfloat bevelJoinField(vec2 point, vec2 start, vec2 end, float width, float joinAngle) {\n  vec2 startToPoint = point - start;\n  vec2 tangent = normalize(end - start);\n  float c = cos(joinAngle * 0.5);\n  float s = sin(joinAngle * 0.5);\n  float direction = -sign(sin(joinAngle));\n  vec2 bisector = vec2(c * tangent.x - s * tangent.y, s * tangent.x + c * tangent.y);\n  float radius = width * 0.5 * s;\n  return dot(startToPoint, bisector * direction) - radius;\n}\n\nfloat miterJoinDistanceField(vec2 point, vec2 start, vec2 end, float width, float joinAngle) {\n  if (cos(joinAngle) > ").concat(LINESTRING_ANGLE_COSINE_CUTOFF, ") { // avoid risking a division by zero\n    return bevelJoinField(point, start, end, width, joinAngle);\n  }\n  float miterLength = 1. / sin(joinAngle * 0.5);\n  float miterLimit = ").concat(this.strokeMiterLimitExpression_, ";\n  if (miterLength > miterLimit) {\n    return bevelJoinField(point, start, end, width, joinAngle);\n  }\n  return -1000.;\n}\n\nfloat capDistanceField(vec2 point, vec2 start, vec2 end, float width, float capType) {\n   if (capType == ").concat(stringToGlsl("butt"), ") {\n    return buttCapDistanceField(point, start, end);\n  } else if (capType == ").concat(stringToGlsl("square"), ") {\n    return squareCapDistanceField(point, start, end, width);\n  }\n  return roundCapDistanceField(point, start, end, width);\n}\n\nfloat joinDistanceField(vec2 point, vec2 start, vec2 end, float width, float joinAngle, float joinType) {\n  if (joinType == ").concat(stringToGlsl("bevel"), ") {\n    return bevelJoinField(point, start, end, width, joinAngle);\n  } else if (joinType == ").concat(stringToGlsl("miter"), ") {\n    return miterJoinDistanceField(point, start, end, width, joinAngle);\n  }\n  return roundJoinDistanceField(point, start, end, width);\n}\n\nfloat computeSegmentPointDistance(vec2 point, vec2 start, vec2 end, float width, float joinAngle, float capType, float joinType) {\n  if (isCap(joinAngle)) {\n    return capDistanceField(point, start, end, width, capType);\n  }\n  return joinDistanceField(point, start, end, width, joinAngle, joinType);\n}\n\nfloat distanceFromSegment(vec2 point, vec2 start, vec2 end) {\n  vec2 tangent = end - start;\n  vec2 startToPoint = point - start;\n  // inspire by capsule fn in https://iquilezles.org/articles/distfunctions/\n  float h = clamp(dot(startToPoint, tangent) / dot(tangent, tangent), 0.0, 1.0);\n  return length(startToPoint - tangent * h);\n}\n\nvoid main(void) {\n").concat(this.attributes_.map((attribute) => "  ".concat(attribute.varyingType, " ").concat(attribute.name, " = ").concat(attribute.varyingName, "; // assign to original attribute name")).join("\n"), "\n\n  vec2 currentPoint = gl_FragCoord.xy / u_pixelRatio;\n  #ifdef GL_FRAGMENT_PRECISION_HIGH\n  vec2 worldPos = pxToWorld(currentPoint);\n  if (\n    abs(u_renderExtent[0] - u_renderExtent[2]) > 0.0 && (\n      worldPos[0] < u_renderExtent[0] ||\n      worldPos[1] < u_renderExtent[1] ||\n      worldPos[0] > u_renderExtent[2] ||\n      worldPos[1] > u_renderExtent[3]\n    )\n  ) {\n    discard;\n  }\n  #endif\n\n  float segmentLength = length(v_segmentEnd - v_segmentStart);\n  vec2 segmentTangent = (v_segmentEnd - v_segmentStart) / segmentLength;\n  vec2 segmentNormal = vec2(-segmentTangent.y, segmentTangent.x);\n  vec2 startToPoint = currentPoint - v_segmentStart;\n  float lengthToPoint = max(0., min(dot(segmentTangent, startToPoint), segmentLength));\n  float currentLengthPx = lengthToPoint + v_distanceOffsetPx;\n  float currentRadiusPx = distanceFromSegment(currentPoint, v_segmentStart, v_segmentEnd);\n  float currentRadiusRatio = dot(segmentNormal, startToPoint) * 2. / v_width;\n  currentLineMetric = mix(\n    v_measureStart,\n    v_measureEnd,\n    lengthToPoint / max(segmentLength, 1.17549429e-38)\n  );\n\n  if (").concat(this.discardExpression_, ") { discard; }\n\n  float capType = ").concat(this.strokeCapExpression_, ";\n  float joinType = ").concat(this.strokeJoinExpression_, ";\n  float segmentStartDistance = computeSegmentPointDistance(currentPoint, v_segmentStart, v_segmentEnd, v_width, v_angleStart, capType, joinType);\n  float segmentEndDistance = computeSegmentPointDistance(currentPoint, v_segmentEnd, v_segmentStart, v_width, v_angleEnd, capType, joinType);\n  float distanceField = max(\n    segmentDistanceField(currentPoint, v_segmentStart, v_segmentEnd, v_width),\n    max(segmentStartDistance, segmentEndDistance)\n  );\n  distanceField = max(distanceField, ").concat(this.strokeDistanceFieldExpression_, ");\n\n  vec4 color = ").concat(this.strokeColorExpression_, ";\n  color.a *= smoothstep(0.5, -0.5, distanceField);\n  gl_FragColor = color;\n  gl_FragColor.a *= u_globalAlpha;\n  gl_FragColor.rgb *= gl_FragColor.a;\n  if (u_hitDetection > 0) {\n    if (gl_FragColor.a < 0.1) { discard; };\n    gl_FragColor = v_hitColor;\n  }\n}");
  }
  /**
   * Generates a fill vertex shader from the builder parameters
   *
   * @return {string|null} The full shader as a string; null if no color specified
   */
  getFillVertexShader() {
    if (!this.hasFill_) {
      return null;
    }
    return "".concat(COMMON_HEADER, "\n").concat(this.uniforms_.map((uniform) => "uniform ".concat(uniform.type, " ").concat(uniform.name, ";")).join("\n"), "\nattribute vec2 a_position;\nattribute vec4 a_hitColor;\n\nvarying vec4 v_hitColor;\n\n").concat(this.attributes_.map((attribute) => "attribute ".concat(attribute.type, " ").concat(attribute.name, ";\nvarying ").concat(attribute.varyingType, " ").concat(attribute.varyingName, ";")).join("\n"), "\n").concat(this.vertexShaderFunctions_.join("\n"), "\nvoid main(void) {\n  gl_Position = u_projectionMatrix * vec4(a_position, u_depth, 1.0);\n  v_hitColor = a_hitColor;\n").concat(this.attributes_.map((attribute) => "  ".concat(attribute.varyingName, " = ").concat(attribute.varyingExpression, ";")).join("\n"), "\n}");
  }
  /**
   * Generates a fill fragment shader from the builder parameters
   * @return {string|null} The full shader as a string; null if no color specified
   */
  getFillFragmentShader() {
    if (!this.hasFill_) {
      return null;
    }
    return "".concat(COMMON_HEADER, "\n").concat(this.uniforms_.map((uniform) => "uniform ".concat(uniform.type, " ").concat(uniform.name, ";")).join("\n"), "\nvarying vec4 v_hitColor;\n").concat(this.attributes_.map((attribute) => "varying ".concat(attribute.varyingType, " ").concat(attribute.varyingName, ";")).join("\n"), "\n").concat(this.fragmentShaderFunctions_.join("\n"), "\nvec2 pxToWorld(vec2 pxPos) {\n  vec2 screenPos = 2.0 * pxPos / u_viewportSizePx - 1.0;\n  return (u_screenToWorldMatrix * vec4(screenPos, 0.0, 1.0)).xy;\n}\n\nvec2 worldToPx(vec2 worldPos) {\n  vec4 screenPos = u_projectionMatrix * vec4(worldPos, 0.0, 1.0);\n  return (0.5 * screenPos.xy + 0.5) * u_viewportSizePx;\n}\n\nvoid main(void) {\n").concat(this.attributes_.map((attribute) => "  ".concat(attribute.varyingType, " ").concat(attribute.name, " = ").concat(attribute.varyingName, "; // assign to original attribute name")).join("\n"), "\n  vec2 pxPos = gl_FragCoord.xy / u_pixelRatio;\n  vec2 pxOrigin = worldToPx(u_patternOrigin);\n  #ifdef GL_FRAGMENT_PRECISION_HIGH\n  vec2 worldPos = pxToWorld(pxPos);\n  if (\n    abs(u_renderExtent[0] - u_renderExtent[2]) > 0.0 && (\n      worldPos[0] < u_renderExtent[0] ||\n      worldPos[1] < u_renderExtent[1] ||\n      worldPos[0] > u_renderExtent[2] ||\n      worldPos[1] > u_renderExtent[3]\n    )\n  ) {\n    discard;\n  }\n  #endif\n  if (").concat(this.discardExpression_, ") { discard; }\n  gl_FragColor = ").concat(this.fillColorExpression_, ";\n  gl_FragColor.a *= u_globalAlpha;\n  gl_FragColor.rgb *= gl_FragColor.a;\n  if (u_hitDetection > 0) {\n    if (gl_FragColor.a < 0.1) { discard; };\n    gl_FragColor = v_hitColor;\n  }\n}");
  }
};

// node_modules/ol/render/webgl/compileUtil.js
function expressionToGlsl(compilationContext, value, expectedType) {
  const parsingContext = newParsingContext();
  return buildExpression2(value, expectedType, parsingContext, compilationContext);
}
function packColor(color) {
  const array = asArray(color);
  const r = array[0] * 256;
  const g = array[1];
  const b = array[2] * 256;
  const a = Math.round(array[3] * 255);
  return [r + g, b + a];
}
var UNPACK_COLOR_FN = "vec4 unpackColor(vec2 packedColor) {\n  return vec4(\n    fract(floor(packedColor[0] / 256.0) / 256.0),\n    fract(packedColor[0] / 256.0),\n    fract(floor(packedColor[1] / 256.0) / 256.0),\n    fract(packedColor[1] / 256.0)\n  );\n}";
function getGlslSizeFromType(type) {
  if (type === ColorType || type === SizeType) {
    return 2;
  }
  if (type === NumberArrayType) {
    return 4;
  }
  return 1;
}
function getGlslTypeFromType(type) {
  const size = getGlslSizeFromType(type);
  if (size > 1) {
    return (
      /** @type {'vec2'|'vec3'|'vec4'} */
      "vec".concat(size)
    );
  }
  return "float";
}
function applyContextToBuilder(builder, context) {
  for (const varName in context.variables) {
    const variable = context.variables[varName];
    const uniformName = uniformNameForVariable(variable.name);
    let glslType = getGlslTypeFromType(variable.type);
    if (variable.type === ColorType) {
      glslType = "vec4";
    }
    builder.addUniform(uniformName, glslType);
  }
  for (const propName in context.properties) {
    const property = context.properties[propName];
    const glslType = getGlslTypeFromType(property.type);
    const attributeName = "a_prop_".concat(property.name);
    if (property.type === ColorType) {
      builder.addAttribute(attributeName, glslType, "unpackColor(".concat(attributeName, ")"), "vec4");
      builder.addVertexShaderFunction(UNPACK_COLOR_FN);
    } else {
      builder.addAttribute(attributeName, glslType);
    }
  }
  for (const functionName in context.functions) {
    builder.addVertexShaderFunction(context.functions[functionName]);
    builder.addFragmentShaderFunction(context.functions[functionName]);
  }
}
function generateUniformsFromContext(context, variables) {
  const uniforms = {};
  for (const varName in context.variables) {
    const variable = context.variables[varName];
    const uniformName = uniformNameForVariable(variable.name);
    uniforms[uniformName] = () => {
      var _a;
      const value = variables[variable.name];
      if (typeof value === "number") {
        return value;
      }
      if (typeof value === "boolean") {
        return value ? 1 : 0;
      }
      if (variable.type === ColorType) {
        const color = [...asArray(value || "#eee")];
        color[0] /= 255;
        color[1] /= 255;
        color[2] /= 255;
        (_a = color[3]) != null ? _a : color[3] = 1;
        return color;
      }
      if (typeof value === "string") {
        return getStringNumberEquivalent(value);
      }
      return value;
    };
  }
  return uniforms;
}
function generateAttributesFromContext(context) {
  const attributes = {};
  for (const propName in context.properties) {
    const property = context.properties[propName];
    const callback = (feature) => {
      const value = feature.get(property.name);
      if (property.type === ColorType) {
        return packColor([...asArray(value || "#eee")]);
      }
      if (typeof value === "string") {
        return getStringNumberEquivalent(value);
      }
      if (typeof value === "boolean") {
        return value ? 1 : 0;
      }
      return value;
    };
    attributes["prop_".concat(property.name)] = {
      size: getGlslSizeFromType(property.type),
      callback
    };
  }
  return attributes;
}

// node_modules/ol/render/webgl/MixedGeometryBatch.js
var MixedGeometryBatch = class _MixedGeometryBatch {
  constructor() {
    this.globalCounter_ = 0;
    this.refToFeature_ = /* @__PURE__ */ new Map();
    this.uidToRef_ = /* @__PURE__ */ new Map();
    this.freeGlobalRef_ = [];
    this.polygonBatch = {
      entries: {},
      geometriesCount: 0,
      verticesCount: 0,
      ringsCount: 0
    };
    this.pointBatch = {
      entries: {},
      geometriesCount: 0
    };
    this.lineStringBatch = {
      entries: {},
      geometriesCount: 0,
      verticesCount: 0
    };
  }
  /**
   * @param {Array<Feature|RenderFeature>} features Array of features to add to the batch
   * @param {import("../../proj.js").TransformFunction} [projectionTransform] Projection transform.
   */
  addFeatures(features, projectionTransform) {
    for (let i = 0; i < features.length; i++) {
      this.addFeature(features[i], projectionTransform);
    }
  }
  /**
   * @param {Feature|RenderFeature} feature Feature to add to the batch
   * @param {import("../../proj.js").TransformFunction} [projectionTransform] Projection transform.
   */
  addFeature(feature, projectionTransform) {
    let geometry = feature.getGeometry();
    if (!geometry) {
      return;
    }
    if (projectionTransform) {
      geometry = geometry.clone();
      geometry.applyTransform(projectionTransform);
    }
    this.addGeometry_(geometry, feature);
  }
  /**
   * @param {Feature|RenderFeature} feature Feature
   * @return {GeometryBatchItem|void} the cleared entry
   * @private
   */
  clearFeatureEntryInPointBatch_(feature) {
    const featureUid = getUid(feature);
    const entry = this.pointBatch.entries[featureUid];
    if (!entry) {
      return;
    }
    this.pointBatch.geometriesCount -= entry.flatCoordss.length;
    delete this.pointBatch.entries[featureUid];
    return entry;
  }
  /**
   * @param {Feature|RenderFeature} feature Feature
   * @return {GeometryBatchItem|void} the cleared entry
   * @private
   */
  clearFeatureEntryInLineStringBatch_(feature) {
    const featureUid = getUid(feature);
    const entry = this.lineStringBatch.entries[featureUid];
    if (!entry) {
      return;
    }
    this.lineStringBatch.verticesCount -= entry.verticesCount;
    this.lineStringBatch.geometriesCount -= entry.flatCoordss.length;
    delete this.lineStringBatch.entries[featureUid];
    return entry;
  }
  /**
   * @param {Feature|RenderFeature} feature Feature
   * @return {GeometryBatchItem|void} the cleared entry
   * @private
   */
  clearFeatureEntryInPolygonBatch_(feature) {
    const featureUid = getUid(feature);
    const entry = this.polygonBatch.entries[featureUid];
    if (!entry) {
      return;
    }
    this.polygonBatch.verticesCount -= entry.verticesCount;
    this.polygonBatch.ringsCount -= entry.ringsCount;
    this.polygonBatch.geometriesCount -= entry.flatCoordss.length;
    delete this.polygonBatch.entries[featureUid];
    return entry;
  }
  /**
   * @param {import("../../geom.js").Geometry|RenderFeature} geometry Geometry
   * @param {Feature|RenderFeature} feature Feature
   * @private
   */
  addGeometry_(geometry, feature) {
    var _a;
    const type = geometry.getType();
    switch (type) {
      case "GeometryCollection": {
        const geometries = (
          /** @type {import("../../geom.js").GeometryCollection} */
          geometry.getGeometriesArray()
        );
        for (const geometry2 of geometries) {
          this.addGeometry_(geometry2, feature);
        }
        break;
      }
      case "MultiPolygon": {
        const multiPolygonGeom = (
          /** @type {import("../../geom.js").MultiPolygon} */
          geometry
        );
        this.addCoordinates_(type, multiPolygonGeom.getFlatCoordinates(), multiPolygonGeom.getEndss(), feature, getUid(feature), multiPolygonGeom.getStride());
        break;
      }
      case "MultiLineString": {
        const multiLineGeom = (
          /** @type {import("../../geom.js").MultiLineString|RenderFeature} */
          geometry
        );
        this.addCoordinates_(type, multiLineGeom.getFlatCoordinates(), multiLineGeom.getEnds(), feature, getUid(feature), multiLineGeom.getStride());
        break;
      }
      case "MultiPoint": {
        const multiPointGeom = (
          /** @type {import("../../geom.js").MultiPoint|RenderFeature} */
          geometry
        );
        this.addCoordinates_(type, multiPointGeom.getFlatCoordinates(), null, feature, getUid(feature), multiPointGeom.getStride());
        break;
      }
      case "Polygon": {
        const polygonGeom = (
          /** @type {import("../../geom.js").Polygon|RenderFeature} */
          geometry
        );
        this.addCoordinates_(type, polygonGeom.getFlatCoordinates(), polygonGeom.getEnds(), feature, getUid(feature), polygonGeom.getStride());
        break;
      }
      case "Point": {
        const pointGeom = (
          /** @type {import("../../geom.js").Point} */
          geometry
        );
        this.addCoordinates_(type, pointGeom.getFlatCoordinates(), null, feature, getUid(feature), pointGeom.getStride());
        break;
      }
      case "LineString":
      case "LinearRing": {
        const lineGeom = (
          /** @type {import("../../geom.js").LineString} */
          geometry
        );
        const stride = lineGeom.getStride();
        this.addCoordinates_(type, lineGeom.getFlatCoordinates(), null, feature, getUid(feature), stride, (_a = lineGeom.getLayout) == null ? void 0 : _a.call(lineGeom));
        break;
      }
      default:
    }
  }
  /**
   * @param {GeometryType} type Geometry type
   * @param {Array<number>} flatCoords Flat coordinates
   * @param {Array<number> | Array<Array<number>> | null} ends Coordinate ends
   * @param {Feature|RenderFeature} feature Feature
   * @param {string} featureUid Feature uid
   * @param {number} stride Stride
   * @param {import('../../geom/Geometry.js').GeometryLayout} [layout] Layout
   * @private
   */
  addCoordinates_(type, flatCoords, ends, feature, featureUid, stride, layout) {
    let verticesCount;
    switch (type) {
      case "MultiPolygon": {
        const multiPolygonEndss = (
          /** @type {Array<Array<number>>} */
          ends
        );
        for (let i = 0, ii = multiPolygonEndss.length; i < ii; i++) {
          let polygonEnds = multiPolygonEndss[i];
          const prevPolygonEnds = i > 0 ? multiPolygonEndss[i - 1] : null;
          const startIndex = prevPolygonEnds ? prevPolygonEnds[prevPolygonEnds.length - 1] : 0;
          const endIndex = polygonEnds[polygonEnds.length - 1];
          polygonEnds = startIndex > 0 ? polygonEnds.map((end) => end - startIndex) : polygonEnds;
          this.addCoordinates_("Polygon", flatCoords.slice(startIndex, endIndex), polygonEnds, feature, featureUid, stride, layout);
        }
        break;
      }
      case "MultiLineString": {
        const multiLineEnds = (
          /** @type {Array<number>} */
          ends
        );
        for (let i = 0, ii = multiLineEnds.length; i < ii; i++) {
          const startIndex = i > 0 ? multiLineEnds[i - 1] : 0;
          this.addCoordinates_("LineString", flatCoords.slice(startIndex, multiLineEnds[i]), null, feature, featureUid, stride, layout);
        }
        break;
      }
      case "MultiPoint":
        for (let i = 0, ii = flatCoords.length; i < ii; i += stride) {
          this.addCoordinates_("Point", flatCoords.slice(i, i + 2), null, feature, featureUid, null, null);
        }
        break;
      case "Polygon": {
        const polygonEnds = (
          /** @type {Array<number>} */
          ends
        );
        if (feature instanceof Feature_default) {
          const multiPolygonEnds = inflateEnds(flatCoords, polygonEnds);
          if (multiPolygonEnds.length > 1) {
            this.addCoordinates_("MultiPolygon", flatCoords, multiPolygonEnds, feature, featureUid, stride, layout);
            return;
          }
        }
        if (!this.polygonBatch.entries[featureUid]) {
          this.polygonBatch.entries[featureUid] = this.addRefToEntry_(featureUid, {
            feature,
            flatCoordss: [],
            verticesCount: 0,
            ringsCount: 0,
            ringsVerticesCounts: []
          });
        }
        verticesCount = flatCoords.length / stride;
        const ringsCount = ends.length;
        const ringsVerticesCount = ends.map((end, ind, arr) => ind > 0 ? (end - arr[ind - 1]) / stride : end / stride);
        this.polygonBatch.verticesCount += verticesCount;
        this.polygonBatch.ringsCount += ringsCount;
        this.polygonBatch.geometriesCount++;
        this.polygonBatch.entries[featureUid].flatCoordss.push(getFlatCoordinatesXY(flatCoords, stride));
        this.polygonBatch.entries[featureUid].ringsVerticesCounts.push(ringsVerticesCount);
        this.polygonBatch.entries[featureUid].verticesCount += verticesCount;
        this.polygonBatch.entries[featureUid].ringsCount += ringsCount;
        for (let i = 0, ii = polygonEnds.length; i < ii; i++) {
          const startIndex = i > 0 ? polygonEnds[i - 1] : 0;
          this.addCoordinates_("LinearRing", flatCoords.slice(startIndex, polygonEnds[i]), null, feature, featureUid, stride, layout);
        }
        break;
      }
      case "Point":
        if (!this.pointBatch.entries[featureUid]) {
          this.pointBatch.entries[featureUid] = this.addRefToEntry_(featureUid, {
            feature,
            flatCoordss: []
          });
        }
        this.pointBatch.geometriesCount++;
        this.pointBatch.entries[featureUid].flatCoordss.push(flatCoords);
        break;
      case "LineString":
      case "LinearRing":
        if (!this.lineStringBatch.entries[featureUid]) {
          this.lineStringBatch.entries[featureUid] = this.addRefToEntry_(featureUid, {
            feature,
            flatCoordss: [],
            verticesCount: 0
          });
        }
        verticesCount = flatCoords.length / stride;
        this.lineStringBatch.verticesCount += verticesCount;
        this.lineStringBatch.geometriesCount++;
        this.lineStringBatch.entries[featureUid].flatCoordss.push(getFlatCoordinatesXYM(flatCoords, stride, layout));
        this.lineStringBatch.entries[featureUid].verticesCount += verticesCount;
        break;
      default:
    }
  }
  /**
   * @param {string} featureUid Feature uid
   * @param {GeometryBatchItem} entry The entry to add
   * @return {GeometryBatchItem} the added entry
   * @private
   */
  addRefToEntry_(featureUid, entry) {
    const currentRef = this.uidToRef_.get(featureUid);
    const ref = currentRef || this.freeGlobalRef_.pop() || ++this.globalCounter_;
    entry.ref = ref;
    if (!currentRef) {
      this.refToFeature_.set(ref, entry.feature);
      this.uidToRef_.set(featureUid, ref);
    }
    return entry;
  }
  /**
   * Return a ref to the pool of available refs.
   * @param {number} ref the ref to return
   * @param {string} featureUid the feature uid
   * @private
   */
  removeRef_(ref, featureUid) {
    if (!ref) {
      throw new Error("This feature has no ref: " + featureUid);
    }
    this.refToFeature_.delete(ref);
    this.uidToRef_.delete(featureUid);
    this.freeGlobalRef_.push(ref);
  }
  /**
   * @param {Feature|RenderFeature} feature Feature
   * @param {import("../../proj.js").TransformFunction} [projectionTransform] Projection transform.
   */
  changeFeature(feature, projectionTransform) {
    if (!this.uidToRef_.get(getUid(feature))) {
      return;
    }
    this.removeFeature(feature);
    let geometry = feature.getGeometry();
    if (!geometry) {
      return;
    }
    if (projectionTransform) {
      geometry = geometry.clone();
      geometry.applyTransform(projectionTransform);
    }
    this.addGeometry_(geometry, feature);
  }
  /**
   * @param {Feature|RenderFeature} feature Feature
   */
  removeFeature(feature) {
    let entry = this.clearFeatureEntryInPointBatch_(feature);
    entry = this.clearFeatureEntryInPolygonBatch_(feature) || entry;
    entry = this.clearFeatureEntryInLineStringBatch_(feature) || entry;
    if (entry) {
      this.removeRef_(entry.ref, getUid(entry.feature));
    }
  }
  clear() {
    this.polygonBatch.entries = {};
    this.polygonBatch.geometriesCount = 0;
    this.polygonBatch.verticesCount = 0;
    this.polygonBatch.ringsCount = 0;
    this.lineStringBatch.entries = {};
    this.lineStringBatch.geometriesCount = 0;
    this.lineStringBatch.verticesCount = 0;
    this.pointBatch.entries = {};
    this.pointBatch.geometriesCount = 0;
    this.globalCounter_ = 0;
    this.freeGlobalRef_ = [];
    this.refToFeature_.clear();
    this.uidToRef_.clear();
  }
  /**
   * Resolve the feature associated to a ref.
   * @param {number} ref Hit detected ref
   * @return {Feature|RenderFeature} feature
   */
  getFeatureFromRef(ref) {
    return this.refToFeature_.get(ref);
  }
  isEmpty() {
    return this.globalCounter_ === 0;
  }
  /**
   * Will return a new instance of this class that only contains the features
   * for which the provided callback returned true
   * @param {function((Feature|RenderFeature)): boolean} featureFilter Feature filter callback
   * @return {MixedGeometryBatch} Filtered geometry batch
   */
  filter(featureFilter) {
    const filtered = new _MixedGeometryBatch();
    filtered.globalCounter_ = this.globalCounter_;
    filtered.uidToRef_ = this.uidToRef_;
    filtered.refToFeature_ = this.refToFeature_;
    let empty = true;
    for (const feature of this.refToFeature_.values()) {
      if (featureFilter(feature)) {
        filtered.addFeature(feature);
        empty = false;
      }
    }
    if (empty) {
      return new _MixedGeometryBatch();
    }
    return filtered;
  }
};
function getFlatCoordinatesXY(flatCoords, stride) {
  if (stride === 2) {
    return flatCoords;
  }
  return flatCoords.filter((v, i) => i % stride < 2);
}
function getFlatCoordinatesXYM(flatCoords, stride, layout) {
  if (stride === 3 && layout === "XYM") {
    return flatCoords;
  }
  if (stride === 4) {
    return flatCoords.filter((v, i) => i % stride !== 2);
  }
  if (stride === 3) {
    return flatCoords.map((v, i) => i % stride !== 2 ? v : 0);
  }
  return new Array(flatCoords.length * 1.5).fill(0).map((v, i) => i % 3 === 2 ? 0 : flatCoords[Math.round(i / 1.5)]);
}
var MixedGeometryBatch_default = MixedGeometryBatch;

// node_modules/ol/worker/webgl.js
function create3() {
  const source = 'function t(t,n,x=2){const o=n&&n.length,i=o?n[0]*x:t.length;let u=e(t,0,i,x,!0);const l=[];if(!u||u.next===u.prev)return l;let c,h,y;if(o&&(u=function(t,n,r,x){const o=[];for(let r=0,i=n.length;r<i;r++){const u=e(t,n[r]*x,r<i-1?n[r+1]*x:t.length,x,!1);u===u.next&&(u.steiner=!0),o.push(a(u))}o.sort(f);for(let t=0;t<o.length;t++)r=s(o[t],r);return r}(t,n,u,x)),t.length>80*x){c=1/0,h=1/0;let e=-1/0,n=-1/0;for(let r=x;r<i;r+=x){const x=t[r],o=t[r+1];x<c&&(c=x),o<h&&(h=o),x>e&&(e=x),o>n&&(n=o)}y=Math.max(e-c,n-h),y=0!==y?32767/y:0}return r(u,l,x,c,h,y,0),l}function e(t,e,n,r,x){let o;if(x===function(t,e,n,r){let x=0;for(let o=e,i=n-r;o<n;o+=r)x+=(t[i]-t[o])*(t[o+1]+t[i+1]),i=o;return x}(t,e,n,r)>0)for(let x=e;x<n;x+=r)o=w(x/r|0,t[x],t[x+1],o);else for(let x=n-r;x>=e;x-=r)o=w(x/r|0,t[x],t[x+1],o);return o&&g(o,o.next)&&(A(o),o=o.next),o}function n(t,e){if(!t)return t;e||(e=t);let n,r=t;do{if(n=!1,r.steiner||!g(r,r.next)&&0!==v(r.prev,r,r.next))r=r.next;else{if(A(r),r=e=r.prev,r===r.next)break;n=!0}}while(n||r!==e);return e}function r(t,e,f,s,l,a,h){if(!t)return;!h&&a&&function(t,e,n,r){let x=t;do{0===x.z&&(x.z=c(x.x,x.y,e,n,r)),x.prevZ=x.prev,x.nextZ=x.next,x=x.next}while(x!==t);x.prevZ.nextZ=null,x.prevZ=null,function(t){let e,n=1;do{let r,x=t;t=null;let o=null;for(e=0;x;){e++;let i=x,u=0;for(let t=0;t<n&&(u++,i=i.nextZ,i);t++);let f=n;for(;u>0||f>0&&i;)0!==u&&(0===f||!i||x.z<=i.z)?(r=x,x=x.nextZ,u--):(r=i,i=i.nextZ,f--),o?o.nextZ=r:t=r,r.prevZ=o,o=r;x=i}o.nextZ=null,n*=2}while(e>1)}(x)}(t,s,l,a);let y=t;for(;t.prev!==t.next;){const c=t.prev,p=t.next;if(a?o(t,s,l,a):x(t))e.push(c.i,t.i,p.i),A(t),t=p.next,y=p.next;else if((t=p)===y){h?1===h?r(t=i(n(t),e),e,f,s,l,a,2):2===h&&u(t,e,f,s,l,a):r(n(t),e,f,s,l,a,1);break}}}function x(t){const e=t.prev,n=t,r=t.next;if(v(e,n,r)>=0)return!1;const x=e.x,o=n.x,i=r.x,u=e.y,f=n.y,s=r.y,l=Math.min(x,o,i),c=Math.min(u,f,s),a=Math.max(x,o,i),h=Math.max(u,f,s);let p=r.next;for(;p!==e;){if(p.x>=l&&p.x<=a&&p.y>=c&&p.y<=h&&y(x,u,o,f,i,s,p.x,p.y)&&v(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function o(t,e,n,r){const x=t.prev,o=t,i=t.next;if(v(x,o,i)>=0)return!1;const u=x.x,f=o.x,s=i.x,l=x.y,a=o.y,h=i.y,p=Math.min(u,f,s),g=Math.min(l,a,h),b=Math.max(u,f,s),M=Math.max(l,a,h),m=c(p,g,e,n,r),Z=c(b,M,e,n,r);let d=t.prevZ,w=t.nextZ;for(;d&&d.z>=m&&w&&w.z<=Z;){if(d.x>=p&&d.x<=b&&d.y>=g&&d.y<=M&&d!==x&&d!==i&&y(u,l,f,a,s,h,d.x,d.y)&&v(d.prev,d,d.next)>=0)return!1;if(d=d.prevZ,w.x>=p&&w.x<=b&&w.y>=g&&w.y<=M&&w!==x&&w!==i&&y(u,l,f,a,s,h,w.x,w.y)&&v(w.prev,w,w.next)>=0)return!1;w=w.nextZ}for(;d&&d.z>=m;){if(d.x>=p&&d.x<=b&&d.y>=g&&d.y<=M&&d!==x&&d!==i&&y(u,l,f,a,s,h,d.x,d.y)&&v(d.prev,d,d.next)>=0)return!1;d=d.prevZ}for(;w&&w.z<=Z;){if(w.x>=p&&w.x<=b&&w.y>=g&&w.y<=M&&w!==x&&w!==i&&y(u,l,f,a,s,h,w.x,w.y)&&v(w.prev,w,w.next)>=0)return!1;w=w.nextZ}return!0}function i(t,e){let r=t;do{const n=r.prev,x=r.next.next;!g(n,x)&&b(n,r,r.next,x)&&Z(n,x)&&Z(x,n)&&(e.push(n.i,r.i,x.i),A(r),A(r.next),r=t=x),r=r.next}while(r!==t);return n(r)}function u(t,e,x,o,i,u){let f=t;do{let t=f.next.next;for(;t!==f.prev;){if(f.i!==t.i&&p(f,t)){let s=d(f,t);return f=n(f,f.next),s=n(s,s.next),r(f,e,x,o,i,u,0),void r(s,e,x,o,i,u,0)}t=t.next}f=f.next}while(f!==t)}function f(t,e){let n=t.x-e.x;if(0===n&&(n=t.y-e.y,0===n)){n=(t.next.y-t.y)/(t.next.x-t.x)-(e.next.y-e.y)/(e.next.x-e.x)}return n}function s(t,e){const r=function(t,e){let n=e;const r=t.x,x=t.y;let o,i=-1/0;if(g(t,n))return n;do{if(g(t,n.next))return n.next;if(x<=n.y&&x>=n.next.y&&n.next.y!==n.y){const t=n.x+(x-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(t<=r&&t>i&&(i=t,o=n.x<n.next.x?n:n.next,t===r))return o}n=n.next}while(n!==e);if(!o)return null;const u=o,f=o.x,s=o.y;let c=1/0;n=o;do{if(r>=n.x&&n.x>=f&&r!==n.x&&h(x<s?r:i,x,f,s,x<s?i:r,x,n.x,n.y)){const e=Math.abs(x-n.y)/(r-n.x);Z(n,t)&&(e<c||e===c&&(n.x>o.x||n.x===o.x&&l(o,n)))&&(o=n,c=e)}n=n.next}while(n!==u);return o}(t,e);if(!r)return e;const x=d(r,t);return n(x,x.next),n(r,r.next)}function l(t,e){return v(t.prev,t,e.prev)<0&&v(e.next,t,t.next)<0}function c(t,e,n,r,x){return(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=(t-n)*x|0)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-r)*x|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function a(t){let e=t,n=t;do{(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next}while(e!==t);return n}function h(t,e,n,r,x,o,i,u){return(x-i)*(e-u)>=(t-i)*(o-u)&&(t-i)*(r-u)>=(n-i)*(e-u)&&(n-i)*(o-u)>=(x-i)*(r-u)}function y(t,e,n,r,x,o,i,u){return!(t===i&&e===u)&&h(t,e,n,r,x,o,i,u)}function p(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!function(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&b(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}(t,e)&&(Z(t,e)&&Z(e,t)&&function(t,e){let n=t,r=!1;const x=(t.x+e.x)/2,o=(t.y+e.y)/2;do{n.y>o!=n.next.y>o&&n.next.y!==n.y&&x<(n.next.x-n.x)*(o-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next}while(n!==t);return r}(t,e)&&(v(t.prev,t,e.prev)||v(t,e.prev,e))||g(t,e)&&v(t.prev,t,t.next)>0&&v(e.prev,e,e.next)>0)}function v(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function g(t,e){return t.x===e.x&&t.y===e.y}function b(t,e,n,r){const x=m(v(t,e,n)),o=m(v(t,e,r)),i=m(v(n,r,t)),u=m(v(n,r,e));return x!==o&&i!==u||(!(0!==x||!M(t,n,e))||(!(0!==o||!M(t,r,e))||(!(0!==i||!M(n,t,r))||!(0!==u||!M(n,e,r)))))}function M(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function m(t){return t>0?1:t<0?-1:0}function Z(t,e){return v(t.prev,t,t.next)<0?v(t,e,t.next)>=0&&v(t,t.prev,e)>=0:v(t,e,t.prev)<0||v(t,t.next,e)<0}function d(t,e){const n=E(t.i,t.x,t.y),r=E(e.i,e.x,e.y),x=t.next,o=e.prev;return t.next=e,e.prev=t,n.next=x,x.prev=n,r.next=n,n.prev=r,o.next=r,r.prev=o,r}function w(t,e,n,r){const x=E(t,e,n);return r?(x.next=r.next,x.prev=r,r.next.prev=x,r.next=x):(x.prev=x,x.next=x),x}function A(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function E(t,e,n){return{i:t,x:e,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function I(t,e){const n=e[0],r=e[1];return e[0]=t[0]*n+t[2]*r+t[4],e[1]=t[1]*n+t[3]*r+t[5],e}function z(t,e){const n=(r=e)[0]*r[3]-r[1]*r[2];var r;!function(t,e){if(!t)throw new Error(e)}(0!==n,"Transformation matrix cannot be inverted");const x=e[0],o=e[1],i=e[2],u=e[3],f=e[4],s=e[5];return t[0]=u/n,t[1]=-o/n,t[2]=-i/n,t[3]=x/n,t[4]=(i*s-u*f)/n,t[5]=-(x*s-o*f)/n,t}new Array(6);const F=[],P={vertexPosition:0,indexPosition:0};function B(t,e,n,r,x){t[e+0]=n,t[e+1]=r,t[e+2]=x}function N(t,e,n,r,x,o){const i=3+x,u=t[e+0],f=t[e+1],s=F;s.length=x;for(let n=0;n<s.length;n++)s[n]=t[e+2+n];let l=o?o.vertexPosition:0,c=o?o.indexPosition:0;const a=l/i;return B(n,l,u,f,0),s.length&&n.set(s,l+3),l+=i,B(n,l,u,f,1),s.length&&n.set(s,l+3),l+=i,B(n,l,u,f,2),s.length&&n.set(s,l+3),l+=i,B(n,l,u,f,3),s.length&&n.set(s,l+3),l+=i,r[c++]=a,r[c++]=a+1,r[c++]=a+3,r[c++]=a+1,r[c++]=a+2,r[c++]=a+3,P.vertexPosition=l,P.indexPosition=c,P}function R(t,e,n,r,x,o,i,u,f,s,l){const c=10+u.length,a=o.length/c,h=[t[e+0],t[e+1]],y=[t[n],t[n+1]],p=t[e+2],v=t[n+2],g=I(f,[...h]),b=I(f,[...y]);function M(t,e,n){const r=Math.sqrt((e[0]-t[0])*(e[0]-t[0])+(e[1]-t[1])*(e[1]-t[1])),x=[(e[0]-t[0])/r,(e[1]-t[1])/r],o=[-x[1],x[0]],i=Math.sqrt((n[0]-t[0])*(n[0]-t[0])+(n[1]-t[1])*(n[1]-t[1])),u=[(n[0]-t[0])/i,(n[1]-t[1])/i],f=0===r||0===i?0:Math.acos((s=u[0]*x[0]+u[1]*x[1],l=-1,c=1,Math.min(Math.max(s,l),c)));var s,l,c;return u[0]*o[0]+u[1]*o[1]>0?f:2*Math.PI-f}let m=-1,Z=-1,d=l;const w=null!==x;if(null!==r){m=M(g,b,I(f,[...[t[r],t[r+1]]])),Math.cos(m)<=.985&&(d+=Math.tan((m-Math.PI)/2))}if(w){Z=M(b,g,I(f,[...[t[x],t[x+1]]])),Math.cos(Z)<=.985&&(d+=Math.tan((Math.PI-Z)/2))}function A(t,e){return 0===e?1e4*t:Math.sign(e)*(1e4*t+Math.abs(e))}return o.push(h[0],h[1],p,y[0],y[1],v,m,Z,s,A(0,l)),o.push(...u),o.push(h[0],h[1],p,y[0],y[1],v,m,Z,s,A(1,l)),o.push(...u),o.push(h[0],h[1],p,y[0],y[1],v,m,Z,s,A(2,l)),o.push(...u),o.push(h[0],h[1],p,y[0],y[1],v,m,Z,s,A(3,l)),o.push(...u),i.push(a,a+1,a+2,a+1,a+3,a+2),{length:s+Math.sqrt((b[0]-g[0])*(b[0]-g[0])+(b[1]-g[1])*(b[1]-g[1])),angle:d}}function S(e,n,r,x,o){const i=2+o;let u=n;const f=e.slice(u,u+o);u+=o;const s=e[u++];let l=0;const c=new Array(s-1);for(let t=0;t<s;t++)l+=e[u++],t<s-1&&(c[t]=l);const a=e.slice(u,u+2*l),h=t(a,c,2);for(let t=0;t<h.length;t++)x.push(h[t]+r.length/i);for(let t=0;t<a.length;t+=2)r.push(a[t],a[t+1],...f);return u+2*l}const T="GENERATE_POLYGON_BUFFERS",_="GENERATE_POINT_BUFFERS",O="GENERATE_LINE_STRING_BUFFERS",U=self;U.onmessage=t=>{const e=t.data;switch(e.type){case _:{const t=3,n=2,r=e.customAttributesSize,x=n+r,o=new Float32Array(e.renderInstructions),i=o.length/x,u=4*i*(r+t),f=new Uint32Array(6*i),s=new Float32Array(u);let l;for(let t=0;t<o.length;t+=x)l=N(o,t,s,f,r,l);const c=Object.assign({vertexBuffer:s.buffer,indexBuffer:f.buffer,renderInstructions:o.buffer},e);U.postMessage(c,[s.buffer,f.buffer,o.buffer]);break}case O:{const t=[],n=[],r=e.customAttributesSize,x=3,o=new Float32Array(e.renderInstructions);let i=0;const u=[1,0,0,1,0,0];let f,s;for(z(u,e.renderInstructionsTransform);i<o.length;){s=Array.from(o.slice(i,i+r)),i+=r,f=o[i++];const e=i,l=i+(f-1)*x,c=o[e]===o[l]&&o[e+1]===o[l+1];let a=0,h=0;for(let r=0;r<f-1;r++){let y=null;r>0?y=i+(r-1)*x:c&&(y=l-x);let p=null;r<f-2?p=i+(r+2)*x:c&&(p=e+x);const v=R(o,i+r*x,i+(r+1)*x,y,p,t,n,s,u,a,h);a=v.length,h=v.angle}i+=f*x}const l=Uint32Array.from(n),c=Float32Array.from(t),a=Object.assign({vertexBuffer:c.buffer,indexBuffer:l.buffer,renderInstructions:o.buffer},e);U.postMessage(a,[c.buffer,l.buffer,o.buffer]);break}case T:{const t=[],n=[],r=e.customAttributesSize,x=new Float32Array(e.renderInstructions);let o=0;for(;o<x.length;)o=S(x,o,t,n,r);const i=Uint32Array.from(n),u=Float32Array.from(t),f=Object.assign({vertexBuffer:u.buffer,indexBuffer:i.buffer,renderInstructions:x.buffer},e);U.postMessage(f,[u.buffer,i.buffer,x.buffer]);break}}};';
  return new Worker(typeof Blob === "undefined" ? "data:application/javascript;base64," + Buffer.from(source, "binary").toString("base64") : URL.createObjectURL(new Blob([source], {
    type: "application/javascript"
  })));
}

// node_modules/ol/render/webgl/constants.js
var WebGLWorkerMessageType = {
  GENERATE_POLYGON_BUFFERS: "GENERATE_POLYGON_BUFFERS",
  GENERATE_POINT_BUFFERS: "GENERATE_POINT_BUFFERS",
  GENERATE_LINE_STRING_BUFFERS: "GENERATE_LINE_STRING_BUFFERS"
};

// node_modules/ol/render/webgl/encodeUtil.js
function colorEncodeId(id, array) {
  array = array || [];
  const radix = 256;
  const divide = radix - 1;
  array[0] = Math.floor(id / radix / radix / radix) / divide;
  array[1] = Math.floor(id / radix / radix) % radix / divide;
  array[2] = Math.floor(id / radix) % radix / divide;
  array[3] = id % radix / divide;
  return array;
}
function colorDecodeId(color) {
  let id = 0;
  const radix = 256;
  const mult = radix - 1;
  id += Math.round(color[0] * radix * radix * radix * mult);
  id += Math.round(color[1] * radix * radix * mult);
  id += Math.round(color[2] * radix * mult);
  id += Math.round(color[3] * mult);
  return id;
}

// node_modules/ol/render/webgl/renderinstructions.js
function pushCustomAttributesInRenderInstructions(renderInstructions, customAttributes, batchEntry, currentIndex) {
  var _a;
  let shift = 0;
  for (const key in customAttributes) {
    const attr = customAttributes[key];
    const value = attr.callback.call(batchEntry, batchEntry.feature);
    let first = (_a = value == null ? void 0 : value[0]) != null ? _a : value;
    if (first === UNDEFINED_PROP_VALUE) {
      console.warn('The "has" operator might return false positives.');
    }
    if (first === void 0) {
      first = UNDEFINED_PROP_VALUE;
    } else if (first === null) {
      first = 0;
    }
    renderInstructions[currentIndex + shift++] = first;
    if (!attr.size || attr.size === 1) {
      continue;
    }
    renderInstructions[currentIndex + shift++] = value[1];
    if (attr.size < 3) {
      continue;
    }
    renderInstructions[currentIndex + shift++] = value[2];
    if (attr.size < 4) {
      continue;
    }
    renderInstructions[currentIndex + shift++] = value[3];
  }
  return shift;
}
function getCustomAttributesSize(customAttributes) {
  return Object.keys(customAttributes).reduce((prev, curr) => prev + (customAttributes[curr].size || 1), 0);
}
function generatePointRenderInstructions(batch, renderInstructions, customAttributes, transform) {
  const totalInstructionsCount = (2 + getCustomAttributesSize(customAttributes)) * batch.geometriesCount;
  if (!renderInstructions || renderInstructions.length !== totalInstructionsCount) {
    renderInstructions = new Float32Array(totalInstructionsCount);
  }
  const tmpCoords = [];
  let renderIndex = 0;
  for (const featureUid in batch.entries) {
    const batchEntry = batch.entries[featureUid];
    for (let i = 0, ii = batchEntry.flatCoordss.length; i < ii; i++) {
      tmpCoords[0] = batchEntry.flatCoordss[i][0];
      tmpCoords[1] = batchEntry.flatCoordss[i][1];
      apply(transform, tmpCoords);
      renderInstructions[renderIndex++] = tmpCoords[0];
      renderInstructions[renderIndex++] = tmpCoords[1];
      renderIndex += pushCustomAttributesInRenderInstructions(renderInstructions, customAttributes, batchEntry, renderIndex);
    }
  }
  return renderInstructions;
}
function generateLineStringRenderInstructions(batch, renderInstructions, customAttributes, transform) {
  const totalInstructionsCount = 3 * batch.verticesCount + (1 + getCustomAttributesSize(customAttributes)) * batch.geometriesCount;
  if (!renderInstructions || renderInstructions.length !== totalInstructionsCount) {
    renderInstructions = new Float32Array(totalInstructionsCount);
  }
  const flatCoords = [];
  let renderIndex = 0;
  for (const featureUid in batch.entries) {
    const batchEntry = batch.entries[featureUid];
    for (let i = 0, ii = batchEntry.flatCoordss.length; i < ii; i++) {
      flatCoords.length = batchEntry.flatCoordss[i].length;
      transform2D(batchEntry.flatCoordss[i], 0, flatCoords.length, 3, transform, flatCoords, 3);
      renderIndex += pushCustomAttributesInRenderInstructions(renderInstructions, customAttributes, batchEntry, renderIndex);
      renderInstructions[renderIndex++] = flatCoords.length / 3;
      for (let j = 0, jj = flatCoords.length; j < jj; j += 3) {
        renderInstructions[renderIndex++] = flatCoords[j];
        renderInstructions[renderIndex++] = flatCoords[j + 1];
        renderInstructions[renderIndex++] = flatCoords[j + 2];
      }
    }
  }
  return renderInstructions;
}
function generatePolygonRenderInstructions(batch, renderInstructions, customAttributes, transform) {
  const totalInstructionsCount = 2 * batch.verticesCount + (1 + getCustomAttributesSize(customAttributes)) * batch.geometriesCount + batch.ringsCount;
  if (!renderInstructions || renderInstructions.length !== totalInstructionsCount) {
    renderInstructions = new Float32Array(totalInstructionsCount);
  }
  const flatCoords = [];
  let renderIndex = 0;
  for (const featureUid in batch.entries) {
    const batchEntry = batch.entries[featureUid];
    for (let i = 0, ii = batchEntry.flatCoordss.length; i < ii; i++) {
      flatCoords.length = batchEntry.flatCoordss[i].length;
      transform2D(batchEntry.flatCoordss[i], 0, flatCoords.length, 2, transform, flatCoords);
      renderIndex += pushCustomAttributesInRenderInstructions(renderInstructions, customAttributes, batchEntry, renderIndex);
      renderInstructions[renderIndex++] = batchEntry.ringsVerticesCounts[i].length;
      for (let j = 0, jj = batchEntry.ringsVerticesCounts[i].length; j < jj; j++) {
        renderInstructions[renderIndex++] = batchEntry.ringsVerticesCounts[i][j];
      }
      for (let j = 0, jj = flatCoords.length; j < jj; j += 2) {
        renderInstructions[renderIndex++] = flatCoords[j];
        renderInstructions[renderIndex++] = flatCoords[j + 1];
      }
    }
  }
  return renderInstructions;
}

// node_modules/ol/render/webgl/style.js
function computeHash(input) {
  const hash = JSON.stringify(input).split("").reduce((prev, curr) => (prev << 5) - prev + curr.charCodeAt(0), 0);
  return (hash >>> 0).toString();
}
function parseCommonSymbolProperties(style, builder, vertContext, prefix) {
  if ("".concat(prefix, "radius") in style && prefix !== "icon-") {
    let radius = expressionToGlsl(vertContext, style["".concat(prefix, "radius")], NumberType);
    if ("".concat(prefix, "radius2") in style) {
      const radius2 = expressionToGlsl(vertContext, style["".concat(prefix, "radius2")], NumberType);
      radius = "max(".concat(radius, ", ").concat(radius2, ")");
    }
    if ("".concat(prefix, "stroke-width") in style) {
      radius = "(".concat(radius, " + ").concat(expressionToGlsl(vertContext, style["".concat(prefix, "stroke-width")], NumberType), " * 0.5)");
    }
    builder.setSymbolSizeExpression("vec2(".concat(radius, " * 2. + 0.5)"));
  }
  if ("".concat(prefix, "scale") in style) {
    const scale2 = expressionToGlsl(vertContext, style["".concat(prefix, "scale")], SizeType);
    builder.setSymbolSizeExpression("".concat(builder.getSymbolSizeExpression(), " * ").concat(scale2));
  }
  if ("".concat(prefix, "displacement") in style) {
    builder.setSymbolOffsetExpression(expressionToGlsl(vertContext, style["".concat(prefix, "displacement")], NumberArrayType));
  }
  if ("".concat(prefix, "rotation") in style) {
    builder.setSymbolRotationExpression(expressionToGlsl(vertContext, style["".concat(prefix, "rotation")], NumberType));
  }
  if ("".concat(prefix, "rotate-with-view") in style) {
    builder.setSymbolRotateWithView(!!style["".concat(prefix, "rotate-with-view")]);
  }
}
function getColorFromDistanceField(distanceField, fillColor, strokeColor, strokeWidth, opacity) {
  let color = "vec4(0.)";
  if (fillColor !== null) {
    color = fillColor;
  }
  if (strokeColor !== null && strokeWidth !== null) {
    const strokeFillRatio = "smoothstep(-".concat(strokeWidth, " + 0.63, -").concat(strokeWidth, " - 0.58, ").concat(distanceField, ")");
    color = "mix(".concat(strokeColor, ", ").concat(color, ", ").concat(strokeFillRatio, ")");
  }
  const shapeOpacity = "(1.0 - smoothstep(-0.63, 0.58, ".concat(distanceField, "))");
  let result = "".concat(color, " * vec4(1.0, 1.0, 1.0, ").concat(shapeOpacity, ")");
  if (opacity !== null) {
    result = "".concat(result, " * vec4(1.0, 1.0, 1.0, ").concat(opacity, ")");
  }
  return result;
}
function parseImageProperties(style, builder, uniforms, prefix, textureId) {
  const image = new Image();
  image.crossOrigin = style["".concat(prefix, "cross-origin")] === void 0 ? "anonymous" : style["".concat(prefix, "cross-origin")];
  assert(typeof style["".concat(prefix, "src")] === "string", "WebGL layers do not support expressions for the ".concat(prefix, "src style property"));
  image.src = /** @type {string} */
  style["".concat(prefix, "src")];
  uniforms["u_texture".concat(textureId, "_size")] = () => {
    return image.complete ? [image.width, image.height] : [0, 0];
  };
  builder.addUniform("u_texture".concat(textureId, "_size"), "vec2");
  const size = "u_texture".concat(textureId, "_size");
  uniforms["u_texture".concat(textureId)] = image;
  builder.addUniform("u_texture".concat(textureId), "sampler2D");
  return size;
}
function parseImageOffsetProperties(style, prefix, context, imageSize, sampleSize) {
  let offsetExpression = expressionToGlsl(context, style["".concat(prefix, "offset")], SizeType);
  if ("".concat(prefix, "offset-origin") in style) {
    switch (style["".concat(prefix, "offset-origin")]) {
      case "top-right":
        offsetExpression = "vec2(".concat(imageSize, ".x, 0.) + ").concat(sampleSize, " * vec2(-1., 0.) + ").concat(offsetExpression, " * vec2(-1., 1.)");
        break;
      case "bottom-left":
        offsetExpression = "vec2(0., ".concat(imageSize, ".y) + ").concat(sampleSize, " * vec2(0., -1.) + ").concat(offsetExpression, " * vec2(1., -1.)");
        break;
      case "bottom-right":
        offsetExpression = "".concat(imageSize, " - ").concat(sampleSize, " - ").concat(offsetExpression);
        break;
      default:
    }
  }
  return offsetExpression;
}
function parseCircleProperties(style, builder, uniforms, context) {
  context.functions["circleDistanceField"] = "float circleDistanceField(vec2 point, float radius) {\n  return length(point) - radius;\n}";
  parseCommonSymbolProperties(style, builder, context, "circle-");
  let opacity = null;
  if ("circle-opacity" in style) {
    opacity = expressionToGlsl(context, style["circle-opacity"], NumberType);
  }
  let currentPoint = "coordsPx";
  if ("circle-scale" in style) {
    const scale2 = expressionToGlsl(context, style["circle-scale"], SizeType);
    currentPoint = "coordsPx / ".concat(scale2);
  }
  let fillColor = null;
  if ("circle-fill-color" in style) {
    fillColor = expressionToGlsl(context, style["circle-fill-color"], ColorType);
  }
  let strokeColor = null;
  if ("circle-stroke-color" in style) {
    strokeColor = expressionToGlsl(context, style["circle-stroke-color"], ColorType);
  }
  let radius = expressionToGlsl(context, style["circle-radius"], NumberType);
  let strokeWidth = null;
  if ("circle-stroke-width" in style) {
    strokeWidth = expressionToGlsl(context, style["circle-stroke-width"], NumberType);
    radius = "(".concat(radius, " + ").concat(strokeWidth, " * 0.5)");
  }
  const distanceField = "circleDistanceField(".concat(currentPoint, ", ").concat(radius, ")");
  const colorExpression = getColorFromDistanceField(distanceField, fillColor, strokeColor, strokeWidth, opacity);
  builder.setSymbolColorExpression(colorExpression);
}
function parseShapeProperties(style, builder, uniforms, context) {
  context.functions["round"] = "float round(float v) {\n  return sign(v) * floor(abs(v) + 0.5);\n}";
  context.functions["starDistanceField"] = "float starDistanceField(vec2 point, float numPoints, float radius, float radius2, float angle) {\n  float startAngle = -PI * 0.5 + angle; // tip starts upwards and rotates clockwise with angle\n  float c = cos(startAngle);\n  float s = sin(startAngle);\n  vec2 pointRotated = vec2(c * point.x - s * point.y, s * point.x + c * point.y);\n  float alpha = TWO_PI / numPoints; // the angle of one sector\n  float beta = atan(pointRotated.y, pointRotated.x);\n  float gamma = round(beta / alpha) * alpha; // angle in sector\n  c = cos(-gamma);\n  s = sin(-gamma);\n  vec2 inSector = vec2(c * pointRotated.x - s * pointRotated.y, abs(s * pointRotated.x + c * pointRotated.y));\n  vec2 tipToPoint = inSector + vec2(-radius, 0.);\n  vec2 edgeNormal = vec2(radius2 * sin(alpha * 0.5), -radius2 * cos(alpha * 0.5) + radius);\n  return dot(normalize(edgeNormal), tipToPoint);\n}";
  context.functions["regularDistanceField"] = "float regularDistanceField(vec2 point, float numPoints, float radius, float angle) {\n  float startAngle = -PI * 0.5 + angle; // tip starts upwards and rotates clockwise with angle\n  float c = cos(startAngle);\n  float s = sin(startAngle);\n  vec2 pointRotated = vec2(c * point.x - s * point.y, s * point.x + c * point.y);\n  float alpha = TWO_PI / numPoints; // the angle of one sector\n  float radiusIn = radius * cos(PI / numPoints);\n  float beta = atan(pointRotated.y, pointRotated.x);\n  float gamma = round((beta - alpha * 0.5) / alpha) * alpha + alpha * 0.5; // angle in sector from mid\n  c = cos(-gamma);\n  s = sin(-gamma);\n  vec2 inSector = vec2(c * pointRotated.x - s * pointRotated.y, abs(s * pointRotated.x + c * pointRotated.y));\n  return inSector.x - radiusIn;\n}";
  parseCommonSymbolProperties(style, builder, context, "shape-");
  let opacity = null;
  if ("shape-opacity" in style) {
    opacity = expressionToGlsl(context, style["shape-opacity"], NumberType);
  }
  let currentPoint = "coordsPx";
  if ("shape-scale" in style) {
    const scale2 = expressionToGlsl(context, style["shape-scale"], SizeType);
    currentPoint = "coordsPx / ".concat(scale2);
  }
  let fillColor = null;
  if ("shape-fill-color" in style) {
    fillColor = expressionToGlsl(context, style["shape-fill-color"], ColorType);
  }
  let strokeColor = null;
  if ("shape-stroke-color" in style) {
    strokeColor = expressionToGlsl(context, style["shape-stroke-color"], ColorType);
  }
  let strokeWidth = null;
  if ("shape-stroke-width" in style) {
    strokeWidth = expressionToGlsl(context, style["shape-stroke-width"], NumberType);
  }
  const numPoints = expressionToGlsl(context, style["shape-points"], NumberType);
  let angle = "0.";
  if ("shape-angle" in style) {
    angle = expressionToGlsl(context, style["shape-angle"], NumberType);
  }
  let shapeField;
  let radius = expressionToGlsl(context, style["shape-radius"], NumberType);
  if (strokeWidth !== null) {
    radius = "".concat(radius, " + ").concat(strokeWidth, " * 0.5");
  }
  if ("shape-radius2" in style) {
    let radius2 = expressionToGlsl(context, style["shape-radius2"], NumberType);
    if (strokeWidth !== null) {
      radius2 = "".concat(radius2, " + ").concat(strokeWidth, " * 0.5");
    }
    shapeField = "starDistanceField(".concat(currentPoint, ", ").concat(numPoints, ", ").concat(radius, ", ").concat(radius2, ", ").concat(angle, ")");
  } else {
    shapeField = "regularDistanceField(".concat(currentPoint, ", ").concat(numPoints, ", ").concat(radius, ", ").concat(angle, ")");
  }
  const colorExpression = getColorFromDistanceField(shapeField, fillColor, strokeColor, strokeWidth, opacity);
  builder.setSymbolColorExpression(colorExpression);
}
function parseIconProperties(style, builder, uniforms, context) {
  let color = "vec4(1.0)";
  if ("icon-color" in style) {
    color = expressionToGlsl(context, style["icon-color"], ColorType);
  }
  if ("icon-opacity" in style) {
    color = "".concat(color, " * vec4(1.0, 1.0, 1.0, ").concat(expressionToGlsl(context, style["icon-opacity"], NumberType), ")");
  }
  const textureId = computeHash(style["icon-src"]);
  const sizeExpression = parseImageProperties(style, builder, uniforms, "icon-", textureId);
  builder.setSymbolColorExpression("".concat(color, " * texture2D(u_texture").concat(textureId, ", v_texCoord)")).setSymbolSizeExpression(sizeExpression);
  if ("icon-width" in style && "icon-height" in style) {
    builder.setSymbolSizeExpression("vec2(".concat(expressionToGlsl(context, style["icon-width"], NumberType), ", ").concat(expressionToGlsl(context, style["icon-height"], NumberType), ")"));
  }
  if ("icon-offset" in style && "icon-size" in style) {
    const sampleSize = expressionToGlsl(context, style["icon-size"], NumberArrayType);
    const fullsize = builder.getSymbolSizeExpression();
    builder.setSymbolSizeExpression(sampleSize);
    const offset = parseImageOffsetProperties(style, "icon-", context, "v_quadSizePx", sampleSize);
    builder.setTextureCoordinateExpression("(vec4((".concat(offset, ").xyxy) + vec4(0., 0., ").concat(sampleSize, ")) / (").concat(fullsize, ").xyxy"));
  }
  parseCommonSymbolProperties(style, builder, context, "icon-");
  if ("icon-anchor" in style) {
    const anchor = expressionToGlsl(context, style["icon-anchor"], NumberArrayType);
    let scale2 = "1.0";
    if ("icon-scale" in style) {
      scale2 = expressionToGlsl(context, style["icon-scale"], SizeType);
    }
    let shiftPx;
    if (style["icon-anchor-x-units"] === "pixels" && style["icon-anchor-y-units"] === "pixels") {
      shiftPx = "".concat(anchor, " * ").concat(scale2);
    } else if (style["icon-anchor-x-units"] === "pixels") {
      shiftPx = "".concat(anchor, " * vec2(vec2(").concat(scale2, ").x, v_quadSizePx.y)");
    } else if (style["icon-anchor-y-units"] === "pixels") {
      shiftPx = "".concat(anchor, " * vec2(v_quadSizePx.x, vec2(").concat(scale2, ").x)");
    } else {
      shiftPx = "".concat(anchor, " * v_quadSizePx");
    }
    let offsetPx = "v_quadSizePx * vec2(0.5, -0.5) + ".concat(shiftPx, " * vec2(-1., 1.)");
    if ("icon-anchor-origin" in style) {
      switch (style["icon-anchor-origin"]) {
        case "top-right":
          offsetPx = "v_quadSizePx * -0.5 + ".concat(shiftPx);
          break;
        case "bottom-left":
          offsetPx = "v_quadSizePx * 0.5 - ".concat(shiftPx);
          break;
        case "bottom-right":
          offsetPx = "v_quadSizePx * vec2(-0.5, 0.5) + ".concat(shiftPx, " * vec2(1., -1.)");
          break;
        default:
      }
    }
    builder.setSymbolOffsetExpression("".concat(builder.getSymbolOffsetExpression(), " + ").concat(offsetPx));
  }
}
function parseStrokeProperties(style, builder, uniforms, context) {
  if ("stroke-color" in style) {
    builder.setStrokeColorExpression(expressionToGlsl(context, style["stroke-color"], ColorType));
  }
  if ("stroke-pattern-src" in style) {
    const textureId = computeHash(style["stroke-pattern-src"]);
    const sizeExpression = parseImageProperties(style, builder, uniforms, "stroke-pattern-", textureId);
    let sampleSizeExpression = sizeExpression;
    let offsetExpression = "vec2(0.)";
    if ("stroke-pattern-offset" in style && "stroke-pattern-size" in style) {
      sampleSizeExpression = expressionToGlsl(context, style["stroke-pattern-size"], NumberArrayType);
      offsetExpression = parseImageOffsetProperties(style, "stroke-pattern-", context, sizeExpression, sampleSizeExpression);
    }
    let spacingExpression = "0.";
    if ("stroke-pattern-spacing" in style) {
      spacingExpression = expressionToGlsl(context, style["stroke-pattern-spacing"], NumberType);
    }
    context.functions["sampleStrokePattern"] = "vec4 sampleStrokePattern(sampler2D texture, vec2 textureSize, vec2 textureOffset, vec2 sampleSize, float spacingPx, float currentLengthPx, float currentRadiusRatio, float lineWidth) {\n  float currentLengthScaled = currentLengthPx * sampleSize.y / lineWidth;\n  float spacingScaled = spacingPx * sampleSize.y / lineWidth;\n  float uCoordPx = mod(currentLengthScaled, (sampleSize.x + spacingScaled));\n  // make sure that we're not sampling too close to the borders to avoid interpolation with outside pixels\n  uCoordPx = clamp(uCoordPx, 0.5, sampleSize.x - 0.5);\n  float vCoordPx = (-currentRadiusRatio * 0.5 + 0.5) * sampleSize.y;\n  vec2 texCoord = (vec2(uCoordPx, vCoordPx) + textureOffset) / textureSize;\n  return texture2D(texture, texCoord);\n}";
    const textureName = "u_texture".concat(textureId);
    let tintExpression = "1.";
    if ("stroke-color" in style) {
      tintExpression = builder.getStrokeColorExpression();
    }
    builder.setStrokeColorExpression("".concat(tintExpression, " * sampleStrokePattern(").concat(textureName, ", ").concat(sizeExpression, ", ").concat(offsetExpression, ", ").concat(sampleSizeExpression, ", ").concat(spacingExpression, ", currentLengthPx, currentRadiusRatio, v_width)"));
  }
  if ("stroke-width" in style) {
    builder.setStrokeWidthExpression(expressionToGlsl(context, style["stroke-width"], NumberType));
  }
  if ("stroke-offset" in style) {
    builder.setStrokeOffsetExpression(expressionToGlsl(context, style["stroke-offset"], NumberType));
  }
  if ("stroke-line-cap" in style) {
    builder.setStrokeCapExpression(expressionToGlsl(context, style["stroke-line-cap"], StringType));
  }
  if ("stroke-line-join" in style) {
    builder.setStrokeJoinExpression(expressionToGlsl(context, style["stroke-line-join"], StringType));
  }
  if ("stroke-miter-limit" in style) {
    builder.setStrokeMiterLimitExpression(expressionToGlsl(context, style["stroke-miter-limit"], NumberType));
  }
  if ("stroke-line-dash" in style) {
    context.functions["getSingleDashDistance"] = "float getSingleDashDistance(float distance, float radius, float dashOffset, float dashLength, float dashLengthTotal, float capType, float lineWidth) {\n  float localDistance = mod(distance, dashLengthTotal);\n  float distanceSegment = abs(localDistance - dashOffset - dashLength * 0.5) - dashLength * 0.5;\n  distanceSegment = min(distanceSegment, dashLengthTotal - localDistance);\n  if (capType == ".concat(stringToGlsl("square"), ") {\n    distanceSegment -= lineWidth * 0.5;\n  } else if (capType == ").concat(stringToGlsl("round"), ") {\n    distanceSegment = min(distanceSegment, sqrt(distanceSegment * distanceSegment + radius * radius) - lineWidth * 0.5);\n  }\n  return distanceSegment;\n}");
    let dashPattern = style["stroke-line-dash"].map((v) => expressionToGlsl(context, v, NumberType));
    if (dashPattern.length % 2 === 1) {
      dashPattern = [...dashPattern, ...dashPattern];
    }
    let offsetExpression = "0.";
    if ("stroke-line-dash-offset" in style) {
      offsetExpression = expressionToGlsl(context, style["stroke-line-dash-offset"], NumberType);
    }
    const uniqueDashKey = computeHash(style["stroke-line-dash"]);
    const dashFunctionName = "dashDistanceField_".concat(uniqueDashKey);
    const dashLengthsParamsDef = dashPattern.map((v, i) => "float dashLength".concat(i)).join(", ");
    const totalLengthDef = dashPattern.map((v, i) => "dashLength".concat(i)).join(" + ");
    let currentDashOffset = "0.";
    let distanceExpression = "getSingleDashDistance(distance, radius, ".concat(currentDashOffset, ", dashLength0, totalDashLength, capType, lineWidth)");
    for (let i = 2; i < dashPattern.length; i += 2) {
      currentDashOffset = "".concat(currentDashOffset, " + dashLength").concat(i - 2, " + dashLength").concat(i - 1);
      distanceExpression = "min(".concat(distanceExpression, ", getSingleDashDistance(distance, radius, ").concat(currentDashOffset, ", dashLength").concat(i, ", totalDashLength, capType, lineWidth))");
    }
    context.functions[dashFunctionName] = "float ".concat(dashFunctionName, "(float distance, float radius, float capType, float lineWidth, ").concat(dashLengthsParamsDef, ") {\n  float totalDashLength = ").concat(totalLengthDef, ";\n  return ").concat(distanceExpression, ";\n}");
    const dashLengthsCalls = dashPattern.map((v, i) => "".concat(v)).join(", ");
    builder.setStrokeDistanceFieldExpression("".concat(dashFunctionName, "(currentLengthPx + ").concat(offsetExpression, ", currentRadiusPx, capType, v_width, ").concat(dashLengthsCalls, ")"));
  }
}
function parseFillProperties(style, builder, uniforms, context) {
  if ("fill-color" in style) {
    builder.setFillColorExpression(expressionToGlsl(context, style["fill-color"], ColorType));
  }
  if ("fill-pattern-src" in style) {
    const textureId = computeHash(style["fill-pattern-src"]);
    const sizeExpression = parseImageProperties(style, builder, uniforms, "fill-pattern-", textureId);
    let sampleSizeExpression = sizeExpression;
    let offsetExpression = "vec2(0.)";
    if ("fill-pattern-offset" in style && "fill-pattern-size" in style) {
      sampleSizeExpression = expressionToGlsl(context, style["fill-pattern-size"], NumberArrayType);
      offsetExpression = parseImageOffsetProperties(style, "fill-pattern-", context, sizeExpression, sampleSizeExpression);
    }
    context.functions["sampleFillPattern"] = "vec4 sampleFillPattern(sampler2D texture, vec2 textureSize, vec2 textureOffset, vec2 sampleSize, vec2 pxOrigin, vec2 pxPosition) {\n  float scaleRatio = pow(2., mod(u_zoom + 0.5, 1.) - 0.5);\n  vec2 pxRelativePos = pxPosition - pxOrigin;\n  // rotate the relative position from origin by the current view rotation\n  pxRelativePos = vec2(pxRelativePos.x * cos(u_rotation) - pxRelativePos.y * sin(u_rotation), pxRelativePos.x * sin(u_rotation) + pxRelativePos.y * cos(u_rotation));\n  // sample position is computed according to the sample offset & size\n  vec2 samplePos = mod(pxRelativePos / scaleRatio, sampleSize);\n  // also make sure that we're not sampling too close to the borders to avoid interpolation with outside pixels\n  samplePos = clamp(samplePos, vec2(0.5), sampleSize - vec2(0.5));\n  samplePos.y = sampleSize.y - samplePos.y; // invert y axis so that images appear upright\n  return texture2D(texture, (samplePos + textureOffset) / textureSize);\n}";
    const textureName = "u_texture".concat(textureId);
    let tintExpression = "1.";
    if ("fill-color" in style) {
      tintExpression = builder.getFillColorExpression();
    }
    builder.setFillColorExpression("".concat(tintExpression, " * sampleFillPattern(").concat(textureName, ", ").concat(sizeExpression, ", ").concat(offsetExpression, ", ").concat(sampleSizeExpression, ", pxOrigin, pxPos)"));
  }
}
function parseLiteralStyle(style, variables, filter) {
  const context = newCompilationContext();
  const builder = new ShaderBuilder();
  const uniforms = {};
  if ("icon-src" in style) {
    parseIconProperties(style, builder, uniforms, context);
  } else if ("shape-points" in style) {
    parseShapeProperties(style, builder, uniforms, context);
  } else if ("circle-radius" in style) {
    parseCircleProperties(style, builder, uniforms, context);
  }
  parseStrokeProperties(style, builder, uniforms, context);
  parseFillProperties(style, builder, uniforms, context);
  if (filter) {
    const parsedFilter = expressionToGlsl(context, filter, BooleanType);
    builder.setFragmentDiscardExpression("!".concat(parsedFilter));
  }
  const attributes = {};
  function defineSpecialInput(contextPropName, glslPropName, type, callback) {
    if (!context[contextPropName]) {
      return;
    }
    const glslType = getGlslTypeFromType(type);
    const attrSize = getGlslSizeFromType(type);
    builder.addAttribute("a_".concat(glslPropName), glslType);
    attributes[glslPropName] = {
      size: attrSize,
      callback
    };
  }
  defineSpecialInput("geometryType", GEOMETRY_TYPE_PROPERTY_NAME, StringType, (feature) => getStringNumberEquivalent(computeGeometryType(feature.getGeometry())));
  defineSpecialInput("featureId", FEATURE_ID_PROPERTY_NAME, StringType | NumberType, (feature) => {
    var _a;
    const id = (_a = feature.getId()) != null ? _a : null;
    return typeof id === "string" ? getStringNumberEquivalent(id) : id;
  });
  applyContextToBuilder(builder, context);
  return {
    builder,
    attributes: __spreadValues(__spreadValues({}, attributes), generateAttributesFromContext(context)),
    uniforms: __spreadValues(__spreadValues({}, uniforms), generateUniformsFromContext(context, variables))
  };
}
function breakDownFlatStyle(style) {
  const asArray2 = Array.isArray(style) ? style : [style];
  if ("style" in asArray2[0]) {
    const styles = [];
    const rules = (
      /** @type {Array<import('../../style/flat.js').Rule>} */
      asArray2
    );
    const previousFilters = [];
    for (const rule of rules) {
      const ruleStyles = Array.isArray(rule.style) ? rule.style : [rule.style];
      let currentFilter = rule.filter;
      if (rule.else && previousFilters.length) {
        currentFilter = ["all", ...previousFilters.map((filter) => ["!", filter])];
        if (rule.filter) {
          currentFilter.push(rule.filter);
        }
        if (currentFilter.length < 3) {
          currentFilter = currentFilter[1];
        }
      }
      if (rule.filter) {
        previousFilters.push(rule.filter);
      }
      const stylesWithFilters = ruleStyles.map((style2) => __spreadValues({
        style: style2
      }, currentFilter && {
        filter: currentFilter
      }));
      styles.push(...stylesWithFilters);
    }
    return styles;
  }
  if ("builder" in asArray2[0]) {
    return (
      /** @type {Array<StyleAsShaders>} */
      asArray2
    );
  }
  return asArray2.map((style2) => (
    /** @type {StyleAsRule} */
    {
      style: style2
    }
  ));
}

// node_modules/ol/render/webgl/VectorStyleRenderer.js
var tmpColor = [];
var WEBGL_WORKER;
function getWebGLWorker() {
  if (!WEBGL_WORKER) {
    WEBGL_WORKER = create3();
  }
  return WEBGL_WORKER;
}
var workerMessageCounter = 0;
var Attributes2 = {
  POSITION: "a_position",
  INDEX: "a_index",
  SEGMENT_START: "a_segmentStart",
  SEGMENT_END: "a_segmentEnd",
  MEASURE_START: "a_measureStart",
  MEASURE_END: "a_measureEnd",
  PARAMETERS: "a_parameters",
  JOIN_ANGLES: "a_joinAngles",
  DISTANCE: "a_distance"
};
var VectorStyleRenderer = class {
  /**
   * @param {VectorStyle} styleOrShaders Literal style or custom shaders
   * @param {import('../../style/flat.js').StyleVariables} variables Style variables
   * @param {import('../../webgl/Helper.js').default} helper Helper
   * @param {boolean} [enableHitDetection] Whether to enable the hit detection (needs compatible shader)
   * @param {import("../../expr/expression.js").ExpressionValue} [filter] Optional filter expression
   */
  constructor(styleOrShaders, variables, helper, enableHitDetection, filter) {
    this.helper_;
    this.hitDetectionEnabled_ = !!enableHitDetection;
    let asShaders = (
      /** @type {AsShaders} */
      styleOrShaders
    );
    const isShaders = "builder" in styleOrShaders;
    if (!isShaders) {
      const asRule = (
        /** @type {AsRule} */
        styleOrShaders
      );
      const parseResult = parseLiteralStyle(asRule.style, variables, asRule.filter);
      asShaders = {
        builder: parseResult.builder,
        attributes: parseResult.attributes,
        uniforms: parseResult.uniforms
      };
    }
    this.fillProgram_;
    this.strokeProgram_;
    this.symbolProgram_;
    this.hasFill_ = !!asShaders.builder.getFillVertexShader();
    if (this.hasFill_) {
      this.fillVertexShader_ = asShaders.builder.getFillVertexShader();
      this.fillFragmentShader_ = asShaders.builder.getFillFragmentShader();
    }
    this.hasStroke_ = !!asShaders.builder.getStrokeVertexShader();
    if (this.hasStroke_) {
      this.strokeVertexShader_ = asShaders.builder.getStrokeVertexShader();
      this.strokeFragmentShader_ = asShaders.builder.getStrokeFragmentShader();
    }
    this.hasSymbol_ = !!asShaders.builder.getSymbolVertexShader();
    if (this.hasSymbol_) {
      this.symbolVertexShader_ = asShaders.builder.getSymbolVertexShader();
      this.symbolFragmentShader_ = asShaders.builder.getSymbolFragmentShader();
    }
    this.featureFilter_ = null;
    if (filter) {
      this.featureFilter_ = this.computeFeatureFilter(filter);
    }
    const hitDetectionAttributes = this.hitDetectionEnabled_ ? {
      hitColor: {
        callback() {
          return colorEncodeId(this.ref, tmpColor);
        },
        size: 4
      }
    } : {};
    this.customAttributes_ = Object.assign({}, hitDetectionAttributes, asShaders.attributes);
    this.uniforms_ = asShaders.uniforms;
    const customAttributesDesc = Object.entries(this.customAttributes_).map(([name, value]) => ({
      name: "a_".concat(name),
      size: value.size || 1,
      type: AttributeType.FLOAT
    }));
    this.polygonAttributesDesc_ = [{
      name: Attributes2.POSITION,
      size: 2,
      type: AttributeType.FLOAT
    }, ...customAttributesDesc];
    this.lineStringAttributesDesc_ = [{
      name: Attributes2.SEGMENT_START,
      size: 2,
      type: AttributeType.FLOAT
    }, {
      name: Attributes2.MEASURE_START,
      size: 1,
      type: AttributeType.FLOAT
    }, {
      name: Attributes2.SEGMENT_END,
      size: 2,
      type: AttributeType.FLOAT
    }, {
      name: Attributes2.MEASURE_END,
      size: 1,
      type: AttributeType.FLOAT
    }, {
      name: Attributes2.JOIN_ANGLES,
      size: 2,
      type: AttributeType.FLOAT
    }, {
      name: Attributes2.DISTANCE,
      size: 1,
      type: AttributeType.FLOAT
    }, {
      name: Attributes2.PARAMETERS,
      size: 1,
      type: AttributeType.FLOAT
    }, ...customAttributesDesc];
    this.pointAttributesDesc_ = [{
      name: Attributes2.POSITION,
      size: 2,
      type: AttributeType.FLOAT
    }, {
      name: Attributes2.INDEX,
      size: 1,
      type: AttributeType.FLOAT
    }, ...customAttributesDesc];
    this.setHelper(helper);
  }
  /**
   * Will apply the style filter when generating geometry batches (if it can be evaluated outside a map context)
   * @param {import("../../expr/expression.js").ExpressionValue} filter Style filter
   * @return {function(import('../../Feature.js').FeatureLike): boolean} Feature filter
   * @private
   */
  computeFeatureFilter(filter) {
    const parsingContext = newParsingContext();
    let compiled;
    try {
      compiled = buildExpression(filter, BooleanType, parsingContext);
    } catch (e) {
      return null;
    }
    if (parsingContext.mapState || parsingContext.variables.size > 0) {
      return null;
    }
    const evalContext = newEvaluationContext();
    return (feature) => {
      evalContext.properties = feature.getPropertiesInternal();
      if (parsingContext.featureId) {
        const id = feature.getId();
        if (id !== void 0) {
          evalContext.featureId = id;
        } else {
          evalContext.featureId = null;
        }
      }
      evalContext.geometryType = computeGeometryType(feature.getGeometry());
      return (
        /** @type {boolean} */
        compiled(evalContext)
      );
    };
  }
  /**
   * @param {import('./MixedGeometryBatch.js').default} geometryBatch Geometry batch
   * @param {import("../../transform.js").Transform} transform Transform to apply to coordinates
   * @return {Promise<WebGLBuffers|null>} A promise resolving to WebGL buffers; returns null if buffers are empty
   */
  generateBuffers(geometryBatch, transform) {
    return __async(this, null, function* () {
      let filteredBatch = geometryBatch;
      if (this.featureFilter_) {
        filteredBatch = filteredBatch.filter(this.featureFilter_);
        if (filteredBatch.isEmpty()) {
          return null;
        }
      }
      const renderInstructions = this.generateRenderInstructions_(filteredBatch, transform);
      const [polygonBuffers, lineStringBuffers, pointBuffers] = yield Promise.all([this.generateBuffersForType_(renderInstructions.polygonInstructions, "Polygon", transform), this.generateBuffersForType_(renderInstructions.lineStringInstructions, "LineString", transform), this.generateBuffersForType_(renderInstructions.pointInstructions, "Point", transform)]);
      const invertVerticesTransform = makeInverse(create(), transform);
      return {
        polygonBuffers,
        lineStringBuffers,
        pointBuffers,
        invertVerticesTransform
      };
    });
  }
  /**
   * @param {import('./MixedGeometryBatch.js').default} geometryBatch Geometry batch
   * @param {import("../../transform.js").Transform} transform Transform to apply to coordinates
   * @return {RenderInstructions} Render instructions
   * @private
   */
  generateRenderInstructions_(geometryBatch, transform) {
    const polygonInstructions = this.hasFill_ ? generatePolygonRenderInstructions(geometryBatch.polygonBatch, new Float32Array(0), this.customAttributes_, transform) : null;
    const lineStringInstructions = this.hasStroke_ ? generateLineStringRenderInstructions(geometryBatch.lineStringBatch, new Float32Array(0), this.customAttributes_, transform) : null;
    const pointInstructions = this.hasSymbol_ ? generatePointRenderInstructions(geometryBatch.pointBatch, new Float32Array(0), this.customAttributes_, transform) : null;
    return {
      polygonInstructions,
      lineStringInstructions,
      pointInstructions
    };
  }
  /**
   * @param {Float32Array|null} renderInstructions Render instructions
   * @param {import("../../geom/Geometry.js").Type} geometryType Geometry type
   * @param {import("../../transform.js").Transform} transform Transform to apply to coordinates
   * @return {Promise<Array<WebGLArrayBuffer>>|null} Indices buffer and vertices buffer; null if nothing to render
   * @private
   */
  generateBuffersForType_(renderInstructions, geometryType, transform) {
    if (renderInstructions === null) {
      return null;
    }
    const messageId = workerMessageCounter++;
    let messageType;
    switch (geometryType) {
      case "Polygon":
        messageType = WebGLWorkerMessageType.GENERATE_POLYGON_BUFFERS;
        break;
      case "LineString":
        messageType = WebGLWorkerMessageType.GENERATE_LINE_STRING_BUFFERS;
        break;
      case "Point":
        messageType = WebGLWorkerMessageType.GENERATE_POINT_BUFFERS;
        break;
      default:
    }
    const message = {
      id: messageId,
      type: messageType,
      renderInstructions: renderInstructions.buffer,
      renderInstructionsTransform: transform,
      customAttributesSize: getCustomAttributesSize(this.customAttributes_)
    };
    const WEBGL_WORKER2 = getWebGLWorker();
    WEBGL_WORKER2.postMessage(message, [renderInstructions.buffer]);
    renderInstructions = null;
    return new Promise((resolve) => {
      const handleMessage = (event) => {
        const received = event.data;
        if (received.id !== messageId) {
          return;
        }
        WEBGL_WORKER2.removeEventListener("message", handleMessage);
        if (!this.helper_.getGL()) {
          return;
        }
        const verticesBuffer = new Buffer_default(ARRAY_BUFFER, DYNAMIC_DRAW).fromArrayBuffer(received.vertexBuffer);
        const indicesBuffer = new Buffer_default(ELEMENT_ARRAY_BUFFER, DYNAMIC_DRAW).fromArrayBuffer(received.indexBuffer);
        this.helper_.flushBufferData(verticesBuffer);
        this.helper_.flushBufferData(indicesBuffer);
        resolve([indicesBuffer, verticesBuffer]);
      };
      WEBGL_WORKER2.addEventListener("message", handleMessage);
    });
  }
  /**
   * Render the geometries in the given buffers.
   * @param {WebGLBuffers} buffers WebGL Buffers to draw
   * @param {import("../../Map.js").FrameState} frameState Frame state
   * @param {function(): void} preRenderCallback This callback will be called right before drawing, and can be used to set uniforms
   */
  render(buffers, frameState, preRenderCallback) {
    this.hasFill_ && this.renderInternal_(buffers.polygonBuffers[0], buffers.polygonBuffers[1], this.fillProgram_, this.polygonAttributesDesc_, frameState, preRenderCallback);
    this.hasStroke_ && this.renderInternal_(buffers.lineStringBuffers[0], buffers.lineStringBuffers[1], this.strokeProgram_, this.lineStringAttributesDesc_, frameState, preRenderCallback);
    this.hasSymbol_ && this.renderInternal_(buffers.pointBuffers[0], buffers.pointBuffers[1], this.symbolProgram_, this.pointAttributesDesc_, frameState, preRenderCallback);
  }
  /**
   * @param {WebGLArrayBuffer} indicesBuffer Indices buffer
   * @param {WebGLArrayBuffer} verticesBuffer Vertices buffer
   * @param {WebGLProgram} program Program
   * @param {Array<import('../../webgl/Helper.js').AttributeDescription>} attributes Attribute descriptions
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {function(): void} preRenderCallback This callback will be called right before drawing, and can be used to set uniforms
   * @private
   */
  renderInternal_(indicesBuffer, verticesBuffer, program, attributes, frameState, preRenderCallback) {
    const renderCount = indicesBuffer.getSize();
    if (renderCount === 0) {
      return;
    }
    this.helper_.useProgram(program, frameState);
    this.helper_.bindBuffer(verticesBuffer);
    this.helper_.bindBuffer(indicesBuffer);
    this.helper_.enableAttributes(attributes);
    preRenderCallback();
    this.helper_.drawElements(0, renderCount);
  }
  /**
   * @param {import('../../webgl/Helper.js').default} helper Helper
   * @param {WebGLBuffers} buffers WebGL Buffers to reload if any
   */
  setHelper(helper, buffers = null) {
    this.helper_ = helper;
    if (this.hasFill_) {
      this.fillProgram_ = this.helper_.getProgram(this.fillFragmentShader_, this.fillVertexShader_);
    }
    if (this.hasStroke_) {
      this.strokeProgram_ = this.helper_.getProgram(this.strokeFragmentShader_, this.strokeVertexShader_);
    }
    if (this.hasSymbol_) {
      this.symbolProgram_ = this.helper_.getProgram(this.symbolFragmentShader_, this.symbolVertexShader_);
    }
    this.helper_.addUniforms(this.uniforms_);
    if (buffers) {
      if (buffers.polygonBuffers) {
        this.helper_.flushBufferData(buffers.polygonBuffers[0]);
        this.helper_.flushBufferData(buffers.polygonBuffers[1]);
      }
      if (buffers.lineStringBuffers) {
        this.helper_.flushBufferData(buffers.lineStringBuffers[0]);
        this.helper_.flushBufferData(buffers.lineStringBuffers[1]);
      }
      if (buffers.pointBuffers) {
        this.helper_.flushBufferData(buffers.pointBuffers[0]);
        this.helper_.flushBufferData(buffers.pointBuffers[1]);
      }
    }
  }
};
var VectorStyleRenderer_default = VectorStyleRenderer;

// node_modules/ol/webgl/RenderTarget.js
var tmpArray4 = new Uint8Array(4);
var WebGLRenderTarget = class {
  /**
   * @param {import("./Helper.js").default} helper WebGL helper; mandatory.
   * @param {Array<number>} [size] Expected size of the render target texture; note: this can be changed later on.
   */
  constructor(helper, size) {
    this.helper_ = helper;
    const gl = helper.getGL();
    this.texture_ = gl.createTexture();
    this.framebuffer_ = gl.createFramebuffer();
    this.depthbuffer_ = gl.createRenderbuffer();
    this.size_ = size || [1, 1];
    this.data_ = new Uint8Array(0);
    this.dataCacheDirty_ = true;
    this.updateSize_();
  }
  /**
   * Changes the size of the render target texture. Note: will do nothing if the size
   * is already the same.
   * @param {Array<number>} size Expected size of the render target texture
   */
  setSize(size) {
    if (equals2(size, this.size_)) {
      return;
    }
    this.size_[0] = size[0];
    this.size_[1] = size[1];
    this.updateSize_();
  }
  /**
   * Returns the size of the render target texture
   * @return {Array<number>} Size of the render target texture
   */
  getSize() {
    return this.size_;
  }
  /**
   * This will cause following calls to `#readAll` or `#readPixel` to download the content of the
   * render target into memory, which is an expensive operation.
   * This content will be kept in cache but should be cleared after each new render.
   */
  clearCachedData() {
    this.dataCacheDirty_ = true;
  }
  /**
   * Returns the full content of the frame buffer as a series of r, g, b, a components
   * in the 0-255 range (unsigned byte).
   * @return {Uint8Array} Integer array of color values
   */
  readAll() {
    if (this.dataCacheDirty_) {
      const size = this.size_;
      const gl = this.helper_.getGL();
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer_);
      gl.readPixels(0, 0, size[0], size[1], gl.RGBA, gl.UNSIGNED_BYTE, this.data_);
      this.dataCacheDirty_ = false;
    }
    return this.data_;
  }
  /**
   * Reads one pixel of the frame buffer as an array of r, g, b, a components
   * in the 0-255 range (unsigned byte).
   * If x and/or y are outside of existing data, an array filled with 0 is returned.
   * @param {number} x Pixel coordinate
   * @param {number} y Pixel coordinate
   * @return {Uint8Array} Integer array with one color value (4 components)
   */
  readPixel(x, y) {
    if (x < 0 || y < 0 || x > this.size_[0] || y >= this.size_[1]) {
      tmpArray4[0] = 0;
      tmpArray4[1] = 0;
      tmpArray4[2] = 0;
      tmpArray4[3] = 0;
      return tmpArray4;
    }
    this.readAll();
    const index = Math.floor(x) + (this.size_[1] - Math.floor(y) - 1) * this.size_[0];
    tmpArray4[0] = this.data_[index * 4];
    tmpArray4[1] = this.data_[index * 4 + 1];
    tmpArray4[2] = this.data_[index * 4 + 2];
    tmpArray4[3] = this.data_[index * 4 + 3];
    return tmpArray4;
  }
  /**
   * @return {WebGLTexture} Texture to render to
   */
  getTexture() {
    return this.texture_;
  }
  /**
   * @return {WebGLFramebuffer} Frame buffer of the render target
   */
  getFramebuffer() {
    return this.framebuffer_;
  }
  /**
   * @return {WebGLRenderbuffer} Depth buffer of the render target
   */
  getDepthbuffer() {
    return this.depthbuffer_;
  }
  /**
   * @private
   */
  updateSize_() {
    const size = this.size_;
    const gl = this.helper_.getGL();
    this.texture_ = this.helper_.createTexture(size, null, this.texture_);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer_);
    gl.viewport(0, 0, size[0], size[1]);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture_, 0);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthbuffer_);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, size[0], size[1]);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthbuffer_);
    this.data_ = new Uint8Array(size[0] * size[1] * 4);
  }
};
var RenderTarget_default = WebGLRenderTarget;

// node_modules/ol/renderer/webgl/worldUtil.js
function getWorldParameters(frameState, layer) {
  const projection = frameState.viewState.projection;
  const vectorSource = layer.getSource();
  const multiWorld = vectorSource.getWrapX() && projection.canWrapX();
  const projectionExtent = projection.getExtent();
  const extent = frameState.extent;
  const worldWidth = multiWorld ? getWidth(projectionExtent) : null;
  const endWorld = multiWorld ? Math.ceil((extent[2] - projectionExtent[2]) / worldWidth) + 1 : 1;
  const startWorld = multiWorld ? Math.floor((extent[0] - projectionExtent[0]) / worldWidth) : 0;
  return [startWorld, endWorld, worldWidth];
}

// node_modules/ol/renderer/webgl/VectorLayer.js
var Uniforms3 = __spreadProps(__spreadValues({}, DefaultUniform), {
  RENDER_EXTENT: "u_renderExtent",
  // intersection of layer, source, and view extent
  PATTERN_ORIGIN: "u_patternOrigin",
  GLOBAL_ALPHA: "u_globalAlpha"
});
var WebGLVectorLayerRenderer = class extends Layer_default3 {
  /**
   * @param {import("../../layer/Layer.js").default} layer Layer.
   * @param {Options} options Options.
   */
  constructor(layer, options) {
    const uniforms = {
      [Uniforms3.RENDER_EXTENT]: [0, 0, 0, 0],
      [Uniforms3.PATTERN_ORIGIN]: [0, 0],
      [Uniforms3.GLOBAL_ALPHA]: 1
    };
    super(layer, {
      uniforms,
      postProcesses: options.postProcesses
    });
    this.hitDetectionEnabled_ = !options.disableHitDetection;
    this.hitRenderTarget_;
    this.sourceRevision_ = -1;
    this.previousExtent_ = createEmpty();
    this.currentTransform_ = create();
    this.tmpCoords_ = [0, 0];
    this.tmpTransform_ = create();
    this.tmpMat4_ = create2();
    this.currentFrameStateTransform_ = create();
    this.styleVariables_ = {};
    this.styles_ = [];
    this.styleRenderers_ = [];
    this.buffers_ = [];
    this.applyOptions_(options);
    this.batch_ = new MixedGeometryBatch_default();
    this.initialFeaturesAdded_ = false;
    this.sourceListenKeys_ = null;
  }
  /**
   * @private
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   */
  addInitialFeatures_(frameState) {
    const source = this.getLayer().getSource();
    const userProjection = getUserProjection();
    let projectionTransform;
    if (userProjection) {
      projectionTransform = getTransformFromProjections(userProjection, frameState.viewState.projection);
    }
    this.batch_.addFeatures(source.getFeatures(), projectionTransform);
    this.sourceListenKeys_ = [listen(source, VectorEventType_default.ADDFEATURE, this.handleSourceFeatureAdded_.bind(this, projectionTransform)), listen(source, VectorEventType_default.CHANGEFEATURE, this.handleSourceFeatureChanged_.bind(this, projectionTransform), this), listen(source, VectorEventType_default.REMOVEFEATURE, this.handleSourceFeatureDelete_, this), listen(source, VectorEventType_default.CLEAR, this.handleSourceFeatureClear_, this)];
  }
  /**
   * @param {Options} options Options.
   * @private
   */
  applyOptions_(options) {
    this.styleVariables_ = options.variables;
    this.styles_ = breakDownFlatStyle(options.style);
  }
  /**
   * @private
   */
  createRenderers_() {
    this.buffers_ = [];
    this.styleRenderers_ = this.styles_.map((style) => new VectorStyleRenderer_default(style, this.styleVariables_, this.helper, this.hitDetectionEnabled_, "filter" in style ? style.filter : null));
  }
  /**
   * @override
   */
  reset(options) {
    this.applyOptions_(options);
    if (this.helper) {
      this.createRenderers_();
    }
    super.reset(options);
  }
  /**
   * @override
   */
  afterHelperCreated() {
    if (this.styleRenderers_.length) {
      this.styleRenderers_.forEach((renderer, i) => renderer.setHelper(this.helper, this.buffers_[i]));
    } else {
      this.createRenderers_();
    }
    if (this.hitDetectionEnabled_) {
      this.hitRenderTarget_ = new RenderTarget_default(this.helper);
    }
  }
  /**
   * @param {import("../../proj.js").TransformFunction} projectionTransform Transform function.
   * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
   * @private
   */
  handleSourceFeatureAdded_(projectionTransform, event) {
    const feature = event.feature;
    this.batch_.addFeature(feature, projectionTransform);
  }
  /**
   * @param {import("../../proj.js").TransformFunction} projectionTransform Transform function.
   * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
   * @private
   */
  handleSourceFeatureChanged_(projectionTransform, event) {
    const feature = event.feature;
    this.batch_.changeFeature(feature, projectionTransform);
  }
  /**
   * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
   * @private
   */
  handleSourceFeatureDelete_(event) {
    const feature = event.feature;
    this.batch_.removeFeature(feature);
  }
  /**
   * @private
   */
  handleSourceFeatureClear_() {
    this.batch_.clear();
  }
  /**
   * @param {import("../../transform.js").Transform} batchInvertTransform Inverse of the transformation in which geometries are expressed
   * @private
   */
  applyUniforms_(batchInvertTransform) {
    setFromArray(this.tmpTransform_, this.currentFrameStateTransform_);
    multiply(this.tmpTransform_, batchInvertTransform);
    this.helper.setUniformMatrixValue(Uniforms3.PROJECTION_MATRIX, fromTransform(this.tmpMat4_, this.tmpTransform_));
    makeInverse(this.tmpTransform_, this.tmpTransform_);
    this.helper.setUniformMatrixValue(Uniforms3.SCREEN_TO_WORLD_MATRIX, fromTransform(this.tmpMat4_, this.tmpTransform_));
    this.tmpCoords_[0] = 0;
    this.tmpCoords_[1] = 0;
    makeInverse(this.tmpTransform_, batchInvertTransform);
    apply(this.tmpTransform_, this.tmpCoords_);
    this.helper.setUniformFloatVec2(Uniforms3.PATTERN_ORIGIN, this.tmpCoords_);
  }
  /**
   * Render the layer.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {HTMLElement} The rendered element.
   * @override
   */
  renderFrame(frameState) {
    const gl = this.helper.getGL();
    this.preRender(gl, frameState);
    const [startWorld, endWorld, worldWidth] = getWorldParameters(frameState, this.getLayer());
    this.helper.prepareDraw(frameState);
    this.renderWorlds(frameState, false, startWorld, endWorld, worldWidth);
    this.helper.finalizeDraw(frameState, this.dispatchPreComposeEvent, this.dispatchPostComposeEvent);
    const canvas = this.helper.getCanvas();
    if (this.hitDetectionEnabled_) {
      this.renderWorlds(frameState, true, startWorld, endWorld, worldWidth);
      this.hitRenderTarget_.clearCachedData();
    }
    this.postRender(gl, frameState);
    return canvas;
  }
  /**
   * Determine whether renderFrame should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   * @override
   */
  prepareFrameInternal(frameState) {
    if (!this.initialFeaturesAdded_) {
      this.addInitialFeatures_(frameState);
      this.initialFeaturesAdded_ = true;
    }
    const layer = this.getLayer();
    const vectorSource = layer.getSource();
    const viewState = frameState.viewState;
    const viewNotMoving = !frameState.viewHints[ViewHint_default.ANIMATING] && !frameState.viewHints[ViewHint_default.INTERACTING];
    const extentChanged = !equals(this.previousExtent_, frameState.extent);
    const sourceChanged = this.sourceRevision_ < vectorSource.getRevision();
    if (sourceChanged) {
      this.sourceRevision_ = vectorSource.getRevision();
    }
    if (viewNotMoving && (extentChanged || sourceChanged)) {
      const projection = viewState.projection;
      const resolution = viewState.resolution;
      const renderBuffer = layer instanceof BaseVector_default ? layer.getRenderBuffer() : 0;
      const extent = buffer(frameState.extent, renderBuffer * resolution);
      const userProjection = getUserProjection();
      if (userProjection) {
        vectorSource.loadFeatures(toUserExtent(extent, userProjection), toUserResolution(resolution, projection), userProjection);
      } else {
        vectorSource.loadFeatures(extent, resolution, projection);
      }
      this.ready = false;
      const transform = this.helper.makeProjectionTransform(frameState, create());
      const generatePromises = this.styleRenderers_.map((renderer, i) => renderer.generateBuffers(this.batch_, transform).then((buffers) => {
        if (this.buffers_[i]) {
          this.disposeBuffers(this.buffers_[i]);
        }
        this.buffers_[i] = buffers;
      }));
      Promise.all(generatePromises).then(() => {
        this.ready = true;
        this.getLayer().changed();
      });
      this.previousExtent_ = frameState.extent.slice();
    }
    return true;
  }
  /**
   * Render the world, either to the main framebuffer or to the hit framebuffer
   * @param {import("../../Map.js").FrameState} frameState current frame state
   * @param {boolean} forHitDetection whether the rendering is for hit detection
   * @param {number} startWorld the world to render in the first iteration
   * @param {number} endWorld the last world to render
   * @param {number} worldWidth the width of the worlds being rendered
   */
  renderWorlds(frameState, forHitDetection, startWorld, endWorld, worldWidth) {
    let world = startWorld;
    if (forHitDetection) {
      this.hitRenderTarget_.setSize([Math.floor(frameState.size[0] / 2), Math.floor(frameState.size[1] / 2)]);
      this.helper.prepareDrawToRenderTarget(frameState, this.hitRenderTarget_, true);
    }
    do {
      this.helper.makeProjectionTransform(frameState, this.currentFrameStateTransform_);
      translate(this.currentFrameStateTransform_, world * worldWidth, 0);
      for (let i = 0, ii = this.styleRenderers_.length; i < ii; i++) {
        const renderer = this.styleRenderers_[i];
        const buffers = this.buffers_[i];
        if (!buffers) {
          continue;
        }
        renderer.render(buffers, frameState, () => {
          this.applyUniforms_(buffers.invertVerticesTransform);
          this.helper.applyHitDetectionUniform(forHitDetection);
        });
      }
    } while (++world < endWorld);
  }
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("../vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("../Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   * @override
   */
  forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, callback, matches) {
    assert(this.hitDetectionEnabled_, "`forEachFeatureAtCoordinate` cannot be used on a WebGL layer if the hit detection logic has been disabled using the `disableHitDetection: true` option.");
    if (!this.styleRenderers_.length || !this.hitDetectionEnabled_) {
      return void 0;
    }
    const pixel = apply(frameState.coordinateToPixelTransform, coordinate.slice());
    const data = this.hitRenderTarget_.readPixel(pixel[0] / 2, pixel[1] / 2);
    const color = [data[0] / 255, data[1] / 255, data[2] / 255, data[3] / 255];
    const ref = colorDecodeId(color);
    const feature = this.batch_.getFeatureFromRef(ref);
    if (feature) {
      return callback(feature, this.getLayer(), null);
    }
    return void 0;
  }
  /**
   * Will release a set of Webgl buffers
   * @param {import('../../render/webgl/VectorStyleRenderer.js').WebGLBuffers} buffers Buffers
   */
  disposeBuffers(buffers) {
    const disposeBuffersOfType = (typeBuffers) => {
      for (const buffer2 of typeBuffers) {
        if (buffer2) {
          this.helper.deleteBuffer(buffer2);
        }
      }
    };
    if (buffers.pointBuffers) {
      disposeBuffersOfType(buffers.pointBuffers);
    }
    if (buffers.lineStringBuffers) {
      disposeBuffersOfType(buffers.lineStringBuffers);
    }
    if (buffers.polygonBuffers) {
      disposeBuffersOfType(buffers.polygonBuffers);
    }
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.buffers_.forEach((buffers) => {
      if (buffers) {
        this.disposeBuffers(buffers);
      }
    });
    if (this.sourceListenKeys_) {
      this.sourceListenKeys_.forEach(function(key) {
        unlistenByKey(key);
      });
      this.sourceListenKeys_ = null;
    }
    super.disposeInternal();
  }
  renderDeclutter() {
  }
};
var VectorLayer_default2 = WebGLVectorLayerRenderer;

// node_modules/ol/layer/Heatmap.js
var Property = {
  BLUR: "blur",
  GRADIENT: "gradient",
  RADIUS: "radius"
};
var DEFAULT_GRADIENT = ["#00f", "#0ff", "#0f0", "#ff0", "#f00"];
var Heatmap = class extends BaseVector_default {
  /**
   * @param {Options<FeatureType, VectorSourceType>} [options] Options.
   */
  constructor(options) {
    var _a;
    options = options ? options : {};
    const baseOptions = Object.assign({}, options);
    delete baseOptions.gradient;
    delete baseOptions.radius;
    delete baseOptions.blur;
    delete baseOptions.weight;
    super(baseOptions);
    this.filter_ = (_a = options.filter) != null ? _a : true;
    this.styleVariables_ = options.variables || {};
    this.gradient_ = null;
    this.addChangeListener(Property.GRADIENT, this.handleGradientChanged_);
    this.setGradient(options.gradient ? options.gradient : DEFAULT_GRADIENT);
    this.setBlur(options.blur !== void 0 ? options.blur : 15);
    this.setRadius(options.radius !== void 0 ? options.radius : 8);
    const weight = options.weight ? options.weight : "weight";
    this.weight_ = weight;
    this.setRenderOrder(null);
  }
  /**
   * Return the blur size in pixels.
   * @return {import("../style/flat.js").NumberExpression} Blur size in pixels.
   * @api
   * @observable
   */
  getBlur() {
    return (
      /** @type {import("../style/flat.js").NumberExpression} */
      this.get(Property.BLUR)
    );
  }
  /**
   * Return the gradient colors as array of strings.
   * @return {Array<string>} Colors.
   * @api
   * @observable
   */
  getGradient() {
    return (
      /** @type {Array<string>} */
      this.get(Property.GRADIENT)
    );
  }
  /**
   * Return the size of the radius in pixels.
   * @return {import("../style/flat.js").NumberExpression} Radius size in pixel.
   * @api
   * @observable
   */
  getRadius() {
    return (
      /** @type {import("../style/flat.js").NumberExpression} */
      this.get(Property.RADIUS)
    );
  }
  /**
   * @private
   */
  handleGradientChanged_() {
    this.gradient_ = createGradient(this.getGradient());
  }
  /**
   * Set the blur size in pixels.
   * @param {import("../style/flat.js").NumberExpression} blur Blur size in pixels (supports expressions).
   * @api
   * @observable
   */
  setBlur(blur) {
    const previousValue = this.get(Property.BLUR);
    this.set(Property.BLUR, blur);
    if (typeof blur === "number" && typeof previousValue === "number") {
      this.changed();
      return;
    }
    this.clearRenderer();
  }
  /**
   * Set the gradient colors as array of strings.
   * @param {Array<string>} colors Gradient.
   * @api
   * @observable
   */
  setGradient(colors) {
    this.set(Property.GRADIENT, colors);
  }
  /**
   * Set the size of the radius in pixels.
   * @param {import("../style/flat.js").NumberExpression} radius Radius size in pixel (supports expressions).
   * @api
   * @observable
   */
  setRadius(radius) {
    const previousValue = this.get(Property.RADIUS);
    this.set(Property.RADIUS, radius);
    if (typeof radius === "number" && typeof previousValue === "number") {
      this.changed();
      return;
    }
    this.clearRenderer();
  }
  /**
   * Set the filter expression
   * @param {import("../style/flat.js").BooleanExpression} filter Filter expression
   * @api
   */
  setFilter(filter) {
    this.filter_ = filter;
    this.changed();
    this.clearRenderer();
  }
  /**
   * Set the weight expression
   * @param {WeightExpression} weight Weight expression
   * @api
   */
  setWeight(weight) {
    this.weight_ = weight;
    this.changed();
    this.clearRenderer();
  }
  /**
   * @override
   */
  createRenderer() {
    const builder = new ShaderBuilder();
    const context = newCompilationContext();
    const filterCompiled = expressionToGlsl(context, this.filter_, BooleanType);
    let radiusCompiled = expressionToGlsl(context, this.getRadius(), NumberType);
    let blurCompiled = expressionToGlsl(context, this.getBlur(), NumberType);
    const blurRadiusUniforms = {};
    if (typeof this.getBlur() === "number") {
      blurCompiled = "a_blur";
      blurRadiusUniforms["a_blur"] = () => this.getBlur();
      builder.addUniform("a_blur", "float");
    }
    if (typeof this.getRadius() === "number") {
      radiusCompiled = "a_radius";
      blurRadiusUniforms["a_radius"] = () => this.getRadius();
      builder.addUniform("a_radius", "float");
    }
    const weightAttribute = {};
    let weightExpression = null;
    if (typeof this.weight_ === "string" || typeof this.weight_ === "function") {
      const weightFunction = typeof this.weight_ === "string" ? (feature) => feature.get(this.weight_) : this.weight_;
      weightAttribute["prop_weight"] = {
        size: 1,
        callback: (feature) => {
          const weightValue = weightFunction(feature);
          return weightValue !== void 0 ? clamp(weightValue, 0, 1) : 1;
        }
      };
      weightExpression = "a_prop_weight";
      builder.addAttribute("a_prop_weight", "float");
    } else {
      const clampedWeight = ["clamp", this.weight_, 0, 1];
      weightExpression = expressionToGlsl(context, clampedWeight, NumberType);
    }
    builder.addFragmentShaderFunction("float getBlurSlope() {\n  float blur = max(1., ".concat(blurCompiled, ");\n  float radius = ").concat(radiusCompiled, ";\n  return radius / blur;\n}")).setSymbolSizeExpression("vec2(".concat(radiusCompiled, " + ").concat(blurCompiled, ") * 2.")).setSymbolColorExpression("vec4(smoothstep(0., 1., (1. - length(coordsPx * 2. / v_quadSizePx)) * getBlurSlope()) * ".concat(weightExpression, ")")).setStrokeColorExpression("vec4(smoothstep(0., 1., (1. - length(currentRadiusPx * 2. / v_width)) * getBlurSlope()) * ".concat(weightExpression, ")")).setStrokeWidthExpression("(".concat(radiusCompiled, " + ").concat(blurCompiled, ") * 2.")).setFillColorExpression("vec4(".concat(weightExpression, ")")).setFragmentDiscardExpression("!".concat(filterCompiled));
    applyContextToBuilder(builder, context);
    const attributes = generateAttributesFromContext(context);
    const uniforms = generateUniformsFromContext(context, this.styleVariables_);
    return new VectorLayer_default2(this, {
      className: this.getClassName(),
      variables: this.styleVariables_,
      style: {
        builder,
        attributes: __spreadValues(__spreadValues({}, attributes), weightAttribute),
        uniforms: __spreadValues(__spreadValues({}, uniforms), blurRadiusUniforms)
      },
      disableHitDetection: false,
      postProcesses: [{
        fragmentShader: "\n            precision mediump float;\n\n            uniform sampler2D u_image;\n            uniform sampler2D u_gradientTexture;\n            uniform float u_opacity;\n\n            varying vec2 v_texCoord;\n\n            void main() {\n              vec4 color = texture2D(u_image, v_texCoord);\n              gl_FragColor.a = color.a * u_opacity;\n              gl_FragColor.rgb = texture2D(u_gradientTexture, vec2(0.5, color.a)).rgb;\n              gl_FragColor.rgb *= gl_FragColor.a;\n            }",
        uniforms: {
          u_gradientTexture: () => this.gradient_,
          u_opacity: () => this.getOpacity()
        }
      }]
    });
  }
  /**
   * Update any variables used by the layer style and trigger a re-render.
   * @param {import('../style/flat.js').StyleVariables} variables Variables to update.
   */
  updateStyleVariables(variables) {
    Object.assign(this.styleVariables_, variables);
    this.changed();
  }
  /**
   * @override
   */
  renderDeclutter() {
  }
};
function createGradient(colors) {
  const width = 1;
  const height = 256;
  const context = createCanvasContext2D(width, height);
  const gradient = context.createLinearGradient(0, 0, width, height);
  const step = 1 / (colors.length - 1);
  for (let i = 0, ii = colors.length; i < ii; ++i) {
    gradient.addColorStop(i * step, colors[i]);
  }
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
  return context.canvas;
}
var Heatmap_default = Heatmap;

// node_modules/ol/renderer/canvas/VectorImageLayer.js
var CanvasVectorImageLayerRenderer = class extends ImageLayer_default {
  /**
   * @param {import("../../layer/VectorImage.js").default} layer Vector image layer.
   */
  constructor(layer) {
    super(layer);
    this.vectorRenderer_ = new VectorLayer_default(layer);
    this.layerImageRatio_ = layer.getImageRatio();
    this.coordinateToVectorPixelTransform_ = create();
    this.renderedPixelToCoordinateTransform_ = null;
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.vectorRenderer_.dispose();
    super.disposeInternal();
  }
  /**
   * Asynchronous layer level hit detection.
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../../Feature").default>>} Promise that resolves with an array of features.
   * @override
   */
  getFeatures(pixel) {
    if (!this.vectorRenderer_) {
      return Promise.resolve([]);
    }
    const vectorPixel = apply(this.coordinateToVectorPixelTransform_, apply(this.renderedPixelToCoordinateTransform_, pixel.slice()));
    return this.vectorRenderer_.getFeatures(vectorPixel);
  }
  /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   * @override
   */
  handleFontsChanged() {
    this.vectorRenderer_.handleFontsChanged();
  }
  /**
   * Determine whether render should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   * @override
   */
  prepareFrame(frameState) {
    var _a;
    const pixelRatio = frameState.pixelRatio;
    const viewState = frameState.viewState;
    const viewResolution = viewState.resolution;
    const hints = frameState.viewHints;
    const vectorRenderer = this.vectorRenderer_;
    let renderedExtent = frameState.extent;
    if (this.layerImageRatio_ !== 1) {
      renderedExtent = renderedExtent.slice(0);
      scaleFromCenter(renderedExtent, this.layerImageRatio_);
    }
    const width = getWidth(renderedExtent) / viewResolution;
    const height = getHeight(renderedExtent) / viewResolution;
    if (!hints[ViewHint_default.ANIMATING] && !hints[ViewHint_default.INTERACTING] && !isEmpty(renderedExtent)) {
      vectorRenderer.useContainer(null, null);
      const context = vectorRenderer.context;
      const layerState = frameState.layerStatesArray[frameState.layerIndex];
      const imageLayerState = Object.assign({}, layerState, {
        opacity: 1
      });
      const imageFrameState = (
        /** @type {import("../../Map.js").FrameState} */
        Object.assign({}, frameState, {
          extent: renderedExtent,
          size: [width, height],
          viewState: (
            /** @type {import("../../View.js").State} */
            Object.assign({}, frameState.viewState, {
              rotation: 0
            })
          ),
          layerStatesArray: [imageLayerState],
          layerIndex: 0,
          declutter: null
        })
      );
      const declutter = this.getLayer().getDeclutter();
      if (declutter) {
        imageFrameState.declutter = {
          [declutter]: new RBush(9)
        };
      }
      const image = new ImageCanvas_default(renderedExtent, viewResolution, pixelRatio, context.canvas, function(callback) {
        if (vectorRenderer.prepareFrame(imageFrameState) && vectorRenderer.replayGroupChanged) {
          vectorRenderer.clipping = false;
          vectorRenderer.renderFrame(imageFrameState, null);
          vectorRenderer.renderDeclutter(imageFrameState);
          vectorRenderer.renderDeferred(imageFrameState);
          callback();
        }
      });
      image.addEventListener(EventType_default.CHANGE, () => {
        if (image.getState() !== ImageState_default.LOADED) {
          return;
        }
        this.image = image;
        const imagePixelRatio = image.getPixelRatio();
        const renderedResolution = fromResolutionLike(image.getResolution()) * pixelRatio / imagePixelRatio;
        this.renderedResolution = renderedResolution;
        this.coordinateToVectorPixelTransform_ = compose(this.coordinateToVectorPixelTransform_, width / 2, height / 2, 1 / renderedResolution, -1 / renderedResolution, 0, -viewState.center[0], -viewState.center[1]);
      });
      image.load();
    }
    if (this.image) {
      this.renderedPixelToCoordinateTransform_ = frameState.pixelToCoordinateTransform.slice();
    }
    return !((_a = this.getLayer().getSource()) == null ? void 0 : _a.loading) && !!this.image;
  }
  /**
   * @override
   */
  preRender() {
  }
  /**
   * @override
   */
  postRender() {
  }
  /**
   */
  renderDeclutter() {
  }
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("../vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("../Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   * @override
   */
  forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, callback, matches) {
    if (this.vectorRenderer_) {
      return this.vectorRenderer_.forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, callback, matches);
    }
    return super.forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, callback, matches);
  }
};
var VectorImageLayer_default = CanvasVectorImageLayerRenderer;

// node_modules/ol/layer/VectorImage.js
var VectorImageLayer = class extends BaseVector_default {
  /**
   * @param {Options<VectorSourceType, FeatureType>} [options] Options.
   */
  constructor(options) {
    options = options ? options : {};
    const baseOptions = Object.assign({}, options);
    delete baseOptions.imageRatio;
    super(baseOptions);
    this.imageRatio_ = options.imageRatio !== void 0 ? options.imageRatio : 1;
  }
  /**
   * @return {number} Ratio between rendered extent size and viewport extent size.
   */
  getImageRatio() {
    return this.imageRatio_;
  }
  /**
   * @override
   */
  createRenderer() {
    return new VectorImageLayer_default(this);
  }
};
var VectorImage_default = VectorImageLayer;

// node_modules/ol/renderer/canvas/VectorTileLayer.js
var IMAGE_REPLAYS = {
  "image": ["Polygon", "Circle", "LineString", "Image", "Text"],
  "hybrid": ["Polygon", "LineString"],
  "vector": []
};
var VECTOR_REPLAYS = {
  "hybrid": ["Image", "Text", "Default"],
  "vector": ["Polygon", "Circle", "LineString", "Image", "Text", "Default"]
};
var CanvasVectorTileLayerRenderer = class extends TileLayer_default {
  /**
   * @param {import("../../layer/VectorTile.js").default} layer VectorTile layer.
   * @param {import("./TileLayer.js").Options} options Options.
   */
  constructor(layer, options) {
    super(layer, options);
    this.boundHandleStyleImageChange_ = this.handleStyleImageChange_.bind(this);
    this.renderedLayerRevision_;
    this.renderedPixelToCoordinateTransform_ = null;
    this.renderedRotation_;
    this.renderedOpacity_ = 1;
    this.tmpTransform_ = create();
    this.tileClipContexts_ = null;
  }
  /**
   * @param {import("../../VectorRenderTile.js").default} tile Tile.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} x Left of the tile.
   * @param {number} y Top of the tile.
   * @param {number} w Width of the tile.
   * @param {number} h Height of the tile.
   * @param {number} gutter Tile gutter.
   * @param {boolean} transition Apply an alpha transition.
   * @override
   */
  drawTile(tile, frameState, x, y, w, h, gutter, transition) {
    this.updateExecutorGroup_(tile, frameState.pixelRatio, frameState.viewState.projection);
    if (this.tileImageNeedsRender_(tile)) {
      this.renderTileImage_(tile, frameState);
    }
    super.drawTile(tile, frameState, x, y, w, h, gutter, transition);
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {import("../../Tile.js").default|null} Tile (or null if outside source extent).
   * @override
   */
  getTile(z, x, y, frameState) {
    const tile = (
      /** @type {import("../../VectorRenderTile.js").default} */
      this.getOrCreateTile(z, x, y, frameState)
    );
    if (!tile) {
      return null;
    }
    const viewState = frameState.viewState;
    const resolution = viewState.resolution;
    const viewHints = frameState.viewHints;
    const hifi = !(viewHints[ViewHint_default.ANIMATING] || viewHints[ViewHint_default.INTERACTING]);
    if (hifi || !tile.wantedResolution) {
      tile.wantedResolution = resolution;
    }
    return tile;
  }
  /**
   * Determine whether render should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   * @override
   */
  prepareFrame(frameState) {
    const layerRevision = this.getLayer().getRevision();
    if (this.renderedLayerRevision_ !== layerRevision) {
      this.renderedLayerRevision_ = layerRevision;
      this.renderedTiles.length = 0;
    }
    return super.prepareFrame(frameState);
  }
  /**
   * @param {import("../../VectorRenderTile.js").default} tile Tile.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../proj/Projection.js").default} projection Projection.
   * @private
   */
  updateExecutorGroup_(tile, pixelRatio, projection) {
    const layer = (
      /** @type {import("../../layer/VectorTile.js").default} */
      this.getLayer()
    );
    const revision = layer.getRevision();
    const renderOrder = layer.getRenderOrder() || null;
    const resolution = tile.wantedResolution;
    const builderState = tile.getReplayState(layer);
    if (!builderState.dirty && builderState.renderedResolution === resolution && builderState.renderedRevision == revision && builderState.renderedRenderOrder == renderOrder) {
      return;
    }
    const source = layer.getSource();
    const declutter = !!layer.getDeclutter();
    const sourceTileGrid = source.getTileGrid();
    const tileGrid = source.getTileGridForProjection(projection);
    const tileExtent = tileGrid.getTileCoordExtent(tile.wrappedTileCoord);
    const sourceTiles = source.getSourceTiles(pixelRatio, projection, tile);
    const layerUid = getUid(layer);
    delete tile.hitDetectionImageData[layerUid];
    tile.executorGroups[layerUid] = [];
    builderState.dirty = false;
    for (let t = 0, tt = sourceTiles.length; t < tt; ++t) {
      const sourceTile = sourceTiles[t];
      if (sourceTile.getState() != TileState_default.LOADED) {
        continue;
      }
      const sourceTileCoord = sourceTile.tileCoord;
      const sourceTileExtent = sourceTileGrid.getTileCoordExtent(sourceTileCoord);
      const sharedExtent = getIntersection(tileExtent, sourceTileExtent);
      const builderExtent = buffer(sharedExtent, layer.getRenderBuffer() * resolution, this.tempExtent);
      const bufferedExtent = equals(sourceTileExtent, sharedExtent) ? null : builderExtent;
      const builderGroup = new BuilderGroup_default(0, sharedExtent, resolution, pixelRatio);
      const squaredTolerance = getSquaredTolerance(resolution, pixelRatio);
      const render = function(feature, index) {
        let styles;
        const styleFunction = feature.getStyleFunction() || layer.getStyleFunction();
        if (styleFunction) {
          styles = styleFunction(feature, resolution);
        }
        if (styles) {
          const dirty = this.renderFeature(feature, squaredTolerance, styles, builderGroup, declutter, index);
          builderState.dirty = builderState.dirty || dirty;
        }
      };
      const features = sourceTile.getFeatures();
      if (renderOrder && renderOrder !== builderState.renderedRenderOrder) {
        features.sort(renderOrder);
      }
      for (let i = 0, ii = features.length; i < ii; ++i) {
        const feature = features[i];
        if (!bufferedExtent || intersects(bufferedExtent, feature.getGeometry().getExtent())) {
          render.call(this, feature, i);
        }
      }
      const executorGroupInstructions = builderGroup.finish();
      const replayExtent = layer.getRenderMode() !== "vector" && declutter && sourceTiles.length === 1 ? null : sharedExtent;
      const renderingReplayGroup = new ExecutorGroup_default(replayExtent, resolution, pixelRatio, source.getOverlaps(), executorGroupInstructions, layer.getRenderBuffer(), true);
      tile.executorGroups[layerUid].push(renderingReplayGroup);
    }
    builderState.renderedRevision = revision;
    builderState.renderedRenderOrder = renderOrder;
    builderState.renderedResolution = resolution;
  }
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("../vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("../Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   * @override
   */
  forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, callback, matches) {
    var _a, _b;
    const resolution = frameState.viewState.resolution;
    const rotation = frameState.viewState.rotation;
    hitTolerance = hitTolerance == void 0 ? 0 : hitTolerance;
    const layer = this.getLayer();
    const source = layer.getSource();
    const tileGrid = source.getTileGridForProjection(frameState.viewState.projection);
    const hitExtent = boundingExtent([coordinate]);
    buffer(hitExtent, resolution * hitTolerance, hitExtent);
    const features = {};
    const featureCallback = function(feature, geometry, distanceSq) {
      let key = feature.getId();
      if (key === void 0) {
        key = getUid(feature);
      }
      const match = features[key];
      if (!match) {
        if (distanceSq === 0) {
          features[key] = true;
          return callback(feature, layer, geometry);
        }
        matches.push(features[key] = {
          feature,
          layer,
          geometry,
          distanceSq,
          callback
        });
      } else if (match !== true && distanceSq < match.distanceSq) {
        if (distanceSq === 0) {
          features[key] = true;
          matches.splice(matches.lastIndexOf(match), 1);
          return callback(feature, layer, geometry);
        }
        match.geometry = geometry;
        match.distanceSq = distanceSq;
      }
      return void 0;
    };
    const renderedTiles = (
      /** @type {Array<import("../../VectorRenderTile.js").default>} */
      this.renderedTiles
    );
    const layerUid = getUid(layer);
    const declutter = layer.getDeclutter();
    const declutteredFeatures = declutter ? (_b = (_a = frameState.declutter) == null ? void 0 : _a[declutter]) == null ? void 0 : _b.all().map((item) => item.value) : null;
    let found;
    foundFeature: for (let i = 0, ii = renderedTiles.length; i < ii; ++i) {
      const tile = renderedTiles[i];
      const tileExtent = tileGrid.getTileCoordExtent(tile.wrappedTileCoord);
      if (!intersects(tileExtent, hitExtent)) {
        continue;
      }
      const executorGroups = tile.executorGroups[layerUid];
      for (let t = 0, tt = executorGroups.length; t < tt; ++t) {
        found = executorGroups[t].forEachFeatureAtCoordinate(coordinate, resolution, rotation, hitTolerance, featureCallback, declutteredFeatures);
        if (found) {
          break foundFeature;
        }
      }
    }
    return found;
  }
  /**
   * Asynchronous layer level hit detection.
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../../Feature.js").FeatureLike>>} Promise that resolves with an array of features.
   * @override
   */
  getFeatures(pixel) {
    if (this.renderedTiles.length === 0) {
      return Promise.resolve([]);
    }
    return new Promise((resolve, reject) => {
      const layer = this.getLayer();
      const source = layer.getSource();
      const projection = this.renderedProjection;
      const projectionExtent = projection.getExtent();
      const resolution = this.renderedResolution;
      const tileGrid = source.getTileGridForProjection(projection);
      const coordinate = apply(this.renderedPixelToCoordinateTransform_, pixel.slice());
      const tileCoordString = tileGrid.getTileCoordForCoordAndResolution(coordinate, resolution).toString();
      const tile = (
        /** @type {Array<import("../../VectorRenderTile.js").default>} */
        this.renderedTiles.find((tile2) => tile2.tileCoord.toString() === tileCoordString && tile2.getState() === TileState_default.LOADED)
      );
      if (!tile || tile.loadingSourceTiles > 0) {
        resolve([]);
        return;
      }
      if (source.getWrapX() && projection.canWrapX() && !containsExtent(projectionExtent, tileGrid.getTileCoordExtent(tile.tileCoord))) {
        wrapX(coordinate, projection);
      }
      const layerUid = getUid(layer);
      const extent = tileGrid.getTileCoordExtent(tile.wrappedTileCoord);
      const corner = getTopLeft(extent);
      const tilePixel = [(coordinate[0] - corner[0]) / resolution, (corner[1] - coordinate[1]) / resolution];
      const features = tile.getSourceTiles().reduce(
        (accumulator, sourceTile) => accumulator.concat(sourceTile.getFeatures()),
        /** @type {Array<import("../../Feature.js").FeatureLike>} */
        []
      );
      let hitDetectionImageData = tile.hitDetectionImageData[layerUid];
      if (!hitDetectionImageData) {
        const tileSize = toSize(tileGrid.getTileSize(tileGrid.getZForResolution(resolution, source.zDirection)));
        const rotation = this.renderedRotation_;
        const transforms = [this.getRenderTransform(tileGrid.getTileCoordCenter(tile.wrappedTileCoord), resolution, 0, HIT_DETECT_RESOLUTION, tileSize[0] * HIT_DETECT_RESOLUTION, tileSize[1] * HIT_DETECT_RESOLUTION, 0)];
        hitDetectionImageData = createHitDetectionImageData(tileSize, transforms, features, layer.getStyleFunction(), tileGrid.getTileCoordExtent(tile.wrappedTileCoord), tile.getReplayState(layer).renderedResolution, rotation);
        tile.hitDetectionImageData[layerUid] = hitDetectionImageData;
      }
      resolve(hitDetect(tilePixel, features, hitDetectionImageData));
    });
  }
  /**
   * @param {import("../../extent.js").Extent} extent Extent.
   * @return {Array<import('../../Feature.js').FeatureLike>} Features.
   */
  getFeaturesInExtent(extent) {
    const features = [];
    const tileCache = this.getTileCache();
    if (tileCache.getCount() === 0) {
      return features;
    }
    const source = this.getLayer().getSource();
    const tileGrid = source.getTileGridForProjection(this.frameState.viewState.projection);
    const z = tileGrid.getZForResolution(this.renderedResolution);
    const visitedSourceTiles = {};
    tileCache.forEach((tile) => {
      if (tile.tileCoord[0] !== z || tile.getState() !== TileState_default.LOADED) {
        return;
      }
      const sourceTiles = tile.getSourceTiles();
      for (let i = 0, ii = sourceTiles.length; i < ii; ++i) {
        const sourceTile = sourceTiles[i];
        const key = sourceTile.getKey();
        if (key in visitedSourceTiles) {
          continue;
        }
        visitedSourceTiles[key] = true;
        const tileCoord = sourceTile.tileCoord;
        if (intersects(extent, tileGrid.getTileCoordExtent(tileCoord))) {
          const tileFeatures = sourceTile.getFeatures();
          if (tileFeatures) {
            for (let j = 0, jj = tileFeatures.length; j < jj; ++j) {
              const candidate = tileFeatures[j];
              const geometry = candidate.getGeometry();
              if (intersects(extent, geometry.getExtent())) {
                features.push(candidate);
              }
            }
          }
        }
      }
    });
    return features;
  }
  /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   * @override
   */
  handleFontsChanged() {
    const layer = this.getLayer();
    if (layer.getVisible() && this.renderedLayerRevision_ !== void 0) {
      layer.changed();
    }
  }
  /**
   * Handle changes in image style state.
   * @param {import("../../events/Event.js").default} event Image style change event.
   * @private
   */
  handleStyleImageChange_(event) {
    this.renderIfReadyAndVisible();
  }
  /**
   * Render declutter items for this layer
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../layer/Layer.js").State} layerState Layer state.
   */
  renderDeclutter(frameState, layerState) {
    var _a;
    const context = this.context;
    const alpha = context.globalAlpha;
    context.globalAlpha = layerState.opacity;
    const viewHints = frameState.viewHints;
    const hifi = !(viewHints[ViewHint_default.ANIMATING] || viewHints[ViewHint_default.INTERACTING]);
    const scaledCanvasSize = [this.context.canvas.width, this.context.canvas.height];
    const declutter = this.getLayer().getDeclutter();
    const declutterTree = declutter ? (_a = frameState.declutter) == null ? void 0 : _a[declutter] : void 0;
    const layerUid = getUid(this.getLayer());
    const tiles = (
      /** @type {Array<import("../../VectorRenderTile.js").default>} */
      this.renderedTiles
    );
    for (let i = 0, ii = tiles.length; i < ii; ++i) {
      const tile = tiles[i];
      const executorGroups = tile.executorGroups[layerUid];
      if (executorGroups) {
        for (let j = executorGroups.length - 1; j >= 0; --j) {
          executorGroups[j].execute(this.context, scaledCanvasSize, this.getTileRenderTransform(tile, frameState), frameState.viewState.rotation, hifi, DECLUTTER, declutterTree);
        }
      }
    }
    context.globalAlpha = alpha;
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @override
   */
  renderDeferredInternal(frameState) {
    const tiles = (
      /** @type {Array<import("../../VectorRenderTile.js").default>} */
      this.renderedTiles
    );
    const layerUid = getUid(this.getLayer());
    const executorGroups = tiles.reduce(
      (acc, tile, index) => {
        tile.executorGroups[layerUid].forEach((executorGroup) => acc.push({
          executorGroup,
          index
        }));
        return acc;
      },
      /** @type {Array<{executorGroup: CanvasExecutorGroup, index: number}>} */
      []
    );
    const executorGroupZIndexContexts = executorGroups.map(({
      executorGroup
    }) => executorGroup.getDeferredZIndexContexts());
    const usedZIndices = {};
    for (let i = 0, ii = executorGroups.length; i < ii; ++i) {
      const executorGroupZindexContext = executorGroups[i].executorGroup.getDeferredZIndexContexts();
      for (const key in executorGroupZindexContext) {
        usedZIndices[key] = true;
      }
    }
    const zIndexKeys = Object.keys(usedZIndices).map(Number).sort(ascending);
    zIndexKeys.forEach((zIndex) => {
      executorGroupZIndexContexts.forEach((zIndexContexts, i) => {
        if (!zIndexContexts[zIndex]) {
          return;
        }
        zIndexContexts[zIndex].forEach((zIndexContext) => {
          const {
            executorGroup,
            index
          } = executorGroups[i];
          const context = executorGroup.getRenderedContext();
          const alpha = context.globalAlpha;
          context.globalAlpha = this.renderedOpacity_;
          const tileClipContext = this.tileClipContexts_[index];
          if (tileClipContext) {
            tileClipContext.draw(context);
          }
          zIndexContext.draw(context);
          if (tileClipContext) {
            context.restore();
          }
          context.globalAlpha = alpha;
          zIndexContext.clear();
        });
        zIndexContexts[zIndex].length = 0;
      });
    });
  }
  /**
   * @param {import("../../VectorRenderTile.js").default} tile The tile
   * @param {import('../../Map.js').FrameState} frameState Current frame state
   * @return {import('../../transform.js').Transform} Transform to use to render this tile
   */
  getTileRenderTransform(tile, frameState) {
    const pixelRatio = frameState.pixelRatio;
    const viewState = frameState.viewState;
    const center = viewState.center;
    const resolution = viewState.resolution;
    const rotation = viewState.rotation;
    const size = frameState.size;
    const width = Math.round(size[0] * pixelRatio);
    const height = Math.round(size[1] * pixelRatio);
    const source = this.getLayer().getSource();
    const tileGrid = source.getTileGridForProjection(frameState.viewState.projection);
    const tileCoord = tile.tileCoord;
    const tileExtent = tileGrid.getTileCoordExtent(tile.wrappedTileCoord);
    const worldOffset = tileGrid.getTileCoordExtent(tileCoord, this.tempExtent)[0] - tileExtent[0];
    const transform = multiply(scale(this.inversePixelTransform.slice(), 1 / pixelRatio, 1 / pixelRatio), this.getRenderTransform(center, resolution, rotation, pixelRatio, width, height, worldOffset));
    return transform;
  }
  /**
   * Render the vectors for this layer.
   * @param {CanvasRenderingContext2D} context Target context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @override
   */
  postRender(context, frameState) {
    var _a;
    const viewHints = frameState.viewHints;
    const hifi = !(viewHints[ViewHint_default.ANIMATING] || viewHints[ViewHint_default.INTERACTING]);
    this.renderedPixelToCoordinateTransform_ = frameState.pixelToCoordinateTransform.slice();
    this.renderedRotation_ = frameState.viewState.rotation;
    this.renderedOpacity_ = frameState.layerStatesArray[frameState.layerIndex].opacity;
    const layer = (
      /** @type {import("../../layer/VectorTile.js").default} */
      this.getLayer()
    );
    const renderMode = layer.getRenderMode();
    const alpha = context.globalAlpha;
    context.globalAlpha = this.renderedOpacity_;
    const declutter = layer.getDeclutter();
    const replayTypes = declutter ? VECTOR_REPLAYS[renderMode].filter((type) => !DECLUTTER.includes(type)) : VECTOR_REPLAYS[renderMode];
    const viewState = frameState.viewState;
    const rotation = viewState.rotation;
    const tileSource = layer.getSource();
    const tileGrid = tileSource.getTileGridForProjection(viewState.projection);
    const z = tileGrid.getZForResolution(viewState.resolution, tileSource.zDirection);
    const tiles = (
      /** @type {Array<import("../../VectorRenderTile.js").default>} */
      this.renderedTiles
    );
    const clips = [];
    const clipZs = [];
    const tileClipContexts = [];
    const layerUid = getUid(layer);
    let ready = true;
    for (let i = tiles.length - 1; i >= 0; --i) {
      const tile = tiles[i];
      ready = ready && !tile.getReplayState(layer).dirty;
      const executorGroups = tile.executorGroups[layerUid].filter((group) => group.hasExecutors(replayTypes));
      if (executorGroups.length === 0) {
        continue;
      }
      const transform = this.getTileRenderTransform(tile, frameState);
      const currentZ = tile.tileCoord[0];
      let contextSaved = false;
      const currentClip = executorGroups[0].getClipCoords(transform);
      let clipContext = context;
      let tileClipContext;
      if (currentClip) {
        tileClipContext = new ZIndexContext_default();
        clipContext = tileClipContext.getContext();
        for (let j = 0, jj = clips.length; j < jj; ++j) {
          if (z !== currentZ && currentZ < clipZs[j]) {
            const clip = clips[j];
            if (intersects([currentClip[0], currentClip[3], currentClip[4], currentClip[7]], [clip[0], clip[3], clip[4], clip[7]])) {
              if (!contextSaved) {
                clipContext.save();
                contextSaved = true;
              }
              clipContext.beginPath();
              clipContext.moveTo(currentClip[0], currentClip[1]);
              clipContext.lineTo(currentClip[2], currentClip[3]);
              clipContext.lineTo(currentClip[4], currentClip[5]);
              clipContext.lineTo(currentClip[6], currentClip[7]);
              clipContext.moveTo(clip[6], clip[7]);
              clipContext.lineTo(clip[4], clip[5]);
              clipContext.lineTo(clip[2], clip[3]);
              clipContext.lineTo(clip[0], clip[1]);
              clipContext.clip();
            }
          }
        }
        clips.push(currentClip);
        clipZs.push(currentZ);
      }
      for (let t = 0, tt = executorGroups.length; t < tt; ++t) {
        const executorGroup = executorGroups[t];
        executorGroup.execute(context, [context.canvas.width, context.canvas.height], transform, rotation, hifi, replayTypes, (_a = frameState.declutter) == null ? void 0 : _a[declutter]);
      }
      if (contextSaved) {
        if (clipContext === context) {
          clipContext.restore();
        } else {
          tileClipContexts[i] = tileClipContext;
        }
      }
    }
    context.globalAlpha = alpha;
    this.ready = ready;
    this.tileClipContexts_ = tileClipContexts;
    if (!frameState.declutter) {
      this.renderDeferredInternal(frameState);
    }
    super.postRender(context, frameState);
  }
  /**
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
   * @param {import("../../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
   * @param {boolean} [declutter] Enable decluttering.
   * @param {number} [index] Render order index.
   * @return {boolean} `true` if an image is loading.
   */
  renderFeature(feature, squaredTolerance, styles, builderGroup, declutter, index) {
    if (!styles) {
      return false;
    }
    let loading = false;
    if (Array.isArray(styles)) {
      for (let i = 0, ii = styles.length; i < ii; ++i) {
        loading = renderFeature(builderGroup, feature, styles[i], squaredTolerance, this.boundHandleStyleImageChange_, void 0, declutter, index) || loading;
      }
    } else {
      loading = renderFeature(builderGroup, feature, styles, squaredTolerance, this.boundHandleStyleImageChange_, void 0, declutter, index);
    }
    return loading;
  }
  /**
   * @param {import("../../VectorRenderTile.js").default} tile Tile.
   * @return {boolean} A new tile image was rendered.
   * @private
   */
  tileImageNeedsRender_(tile) {
    const layer = (
      /** @type {import("../../layer/VectorTile.js").default} */
      this.getLayer()
    );
    if (layer.getRenderMode() === "vector") {
      return false;
    }
    const replayState = tile.getReplayState(layer);
    const revision = layer.getRevision();
    const resolution = tile.wantedResolution;
    return replayState.renderedTileResolution !== resolution || replayState.renderedTileRevision !== revision;
  }
  /**
   * @param {import("../../VectorRenderTile.js").default} tile Tile.
   * @param {import("../../Map").FrameState} frameState Frame state.
   * @private
   */
  renderTileImage_(tile, frameState) {
    const layer = (
      /** @type {import("../../layer/VectorTile.js").default} */
      this.getLayer()
    );
    const replayState = tile.getReplayState(layer);
    const revision = layer.getRevision();
    const executorGroups = tile.executorGroups[getUid(layer)];
    replayState.renderedTileRevision = revision;
    const tileCoord = tile.wrappedTileCoord;
    const z = tileCoord[0];
    const source = layer.getSource();
    let pixelRatio = frameState.pixelRatio;
    const viewState = frameState.viewState;
    const projection = viewState.projection;
    const tileGrid = source.getTileGridForProjection(projection);
    const tileResolution = tileGrid.getResolution(tile.tileCoord[0]);
    const renderPixelRatio = frameState.pixelRatio / tile.wantedResolution * tileResolution;
    const resolution = tileGrid.getResolution(z);
    const context = tile.getContext();
    pixelRatio = Math.round(Math.max(pixelRatio, renderPixelRatio / pixelRatio));
    const size = source.getTilePixelSize(z, pixelRatio, projection);
    context.canvas.width = size[0];
    context.canvas.height = size[1];
    const renderScale = pixelRatio / renderPixelRatio;
    if (renderScale !== 1) {
      const canvasTransform = reset(this.tmpTransform_);
      scale(canvasTransform, renderScale, renderScale);
      context.setTransform.apply(context, canvasTransform);
    }
    const tileExtent = tileGrid.getTileCoordExtent(tileCoord, this.tempExtent);
    const pixelScale = renderPixelRatio / resolution;
    const transform = reset(this.tmpTransform_);
    scale(transform, pixelScale, -pixelScale);
    translate(transform, -tileExtent[0], -tileExtent[3]);
    for (let i = 0, ii = executorGroups.length; i < ii; ++i) {
      const executorGroup = executorGroups[i];
      executorGroup.execute(context, [context.canvas.width * renderScale, context.canvas.height * renderScale], transform, 0, true, IMAGE_REPLAYS[layer.getRenderMode()], null);
    }
    replayState.renderedTileResolution = tile.wantedResolution;
  }
};
var VectorTileLayer_default = CanvasVectorTileLayerRenderer;

// node_modules/ol/layer/VectorTile.js
var VectorTileLayer = class extends BaseVector_default {
  /**
   * @param {Options<VectorTileSourceType, FeatureType>} [options] Options.
   */
  constructor(options) {
    options = options ? options : {};
    const baseOptions = Object.assign({}, options);
    delete baseOptions.preload;
    const cacheSize = options.cacheSize === void 0 ? 0 : options.cacheSize;
    delete options.cacheSize;
    delete baseOptions.useInterimTilesOnError;
    super(baseOptions);
    this.on;
    this.once;
    this.un;
    this.cacheSize_ = cacheSize;
    const renderMode = options.renderMode || "hybrid";
    assert(renderMode == "hybrid" || renderMode == "vector", "`renderMode` must be `'hybrid'` or `'vector'`");
    this.renderMode_ = renderMode;
    this.setPreload(options.preload ? options.preload : 0);
    this.setUseInterimTilesOnError(options.useInterimTilesOnError !== void 0 ? options.useInterimTilesOnError : true);
    this.getBackground;
    this.setBackground;
  }
  /**
   * @override
   */
  createRenderer() {
    return new VectorTileLayer_default(this, {
      cacheSize: this.cacheSize_
    });
  }
  /**
   * Get the topmost feature that intersects the given pixel on the viewport. Returns a promise
   * that resolves with an array of features. The array will either contain the topmost feature
   * when a hit was detected, or it will be empty.
   *
   * The hit detection algorithm used for this method is optimized for performance, but is less
   * accurate than the one used in [map.getFeaturesAtPixel()]{@link import("../Map.js").default#getFeaturesAtPixel}.
   * Text is not considered, and icons are only represented by their bounding box instead of the exact
   * image.
   *
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with an array of features.
   * @api
   * @override
   */
  getFeatures(pixel) {
    return super.getFeatures(pixel);
  }
  /**
   * Get features whose bounding box intersects the provided extent. Only features for cached
   * tiles for the last rendered zoom level are available in the source. So this method is only
   * suitable for requesting tiles for extents that are currently rendered.
   *
   * Features are returned in random tile order and as they are included in the tiles. This means
   * they can be clipped, duplicated across tiles, and simplified to the render resolution.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {Array<FeatureType>} Features.
   * @api
   */
  getFeaturesInExtent(extent) {
    return (
      /** @type {Array<FeatureType>} */
      /** @type {*} */
      this.getRenderer().getFeaturesInExtent(extent)
    );
  }
  /**
   * @return {VectorTileRenderType} The render mode.
   */
  getRenderMode() {
    return this.renderMode_;
  }
  /**
   * Return the level as number to which we will preload tiles up to.
   * @return {number} The level to preload tiles up to.
   * @observable
   * @api
   */
  getPreload() {
    return (
      /** @type {number} */
      this.get(TileProperty_default.PRELOAD)
    );
  }
  /**
   * Deprecated.  Whether we use interim tiles on error.
   * @return {boolean} Use interim tiles on error.
   * @observable
   * @api
   */
  getUseInterimTilesOnError() {
    return (
      /** @type {boolean} */
      this.get(TileProperty_default.USE_INTERIM_TILES_ON_ERROR)
    );
  }
  /**
   * Set the level as number to which we will preload tiles up to.
   * @param {number} preload The level to preload tiles up to.
   * @observable
   * @api
   */
  setPreload(preload) {
    this.set(TileProperty_default.PRELOAD, preload);
  }
  /**
   * Deprecated.  Set whether we use interim tiles on error.
   * @param {boolean} useInterimTilesOnError Use interim tiles on error.
   * @observable
   * @api
   */
  setUseInterimTilesOnError(useInterimTilesOnError) {
    this.set(TileProperty_default.USE_INTERIM_TILES_ON_ERROR, useInterimTilesOnError);
  }
};
var VectorTile_default = VectorTileLayer;

// node_modules/ol/renderer/webgl/PointsLayer.js
var WebGLPointsLayerRenderer = class extends Layer_default3 {
  /**
   * @param {import("../../layer/Layer.js").default} layer Layer.
   * @param {Options} options Options.
   */
  constructor(layer, options) {
    var _a;
    const uniforms = options.uniforms || {};
    const projectionMatrixTransform = create();
    uniforms[DefaultUniform.PROJECTION_MATRIX] = projectionMatrixTransform;
    super(layer, {
      uniforms,
      postProcesses: options.postProcesses
    });
    this.sourceRevision_ = -1;
    this.verticesBuffer_ = new Buffer_default(ARRAY_BUFFER, DYNAMIC_DRAW);
    this.indicesBuffer_ = new Buffer_default(ELEMENT_ARRAY_BUFFER, DYNAMIC_DRAW);
    this.vertexShader_ = options.vertexShader;
    this.fragmentShader_ = options.fragmentShader;
    this.program_;
    this.hitDetectionEnabled_ = (_a = options.hitDetectionEnabled) != null ? _a : true;
    const customAttributes = options.attributes ? options.attributes.map(function(attribute) {
      return {
        name: "a_" + attribute.name,
        size: 1,
        type: AttributeType.FLOAT
      };
    }) : [];
    this.attributes = [{
      name: "a_position",
      size: 2,
      type: AttributeType.FLOAT
    }, {
      name: "a_index",
      size: 1,
      type: AttributeType.FLOAT
    }];
    if (this.hitDetectionEnabled_) {
      this.attributes.push({
        name: "a_hitColor",
        size: 4,
        type: AttributeType.FLOAT
      });
      this.attributes.push({
        name: "a_featureUid",
        size: 1,
        type: AttributeType.FLOAT
      });
    }
    this.attributes.push(...customAttributes);
    this.customAttributes = options.attributes ? options.attributes : [];
    this.previousExtent_ = createEmpty();
    this.currentTransform_ = projectionMatrixTransform;
    this.renderTransform_ = create();
    this.invertRenderTransform_ = create();
    this.renderInstructions_ = new Float32Array(0);
    this.hitRenderTarget_;
    this.lastSentId = 0;
    this.worker_ = create3();
    this.worker_.addEventListener(
      "message",
      /**
       * @param {*} event Event.
       */
      (event) => {
        const received = event.data;
        if (received.type === WebGLWorkerMessageType.GENERATE_POINT_BUFFERS) {
          const projectionTransform = received.projectionTransform;
          this.verticesBuffer_.fromArrayBuffer(received.vertexBuffer);
          this.helper.flushBufferData(this.verticesBuffer_);
          this.indicesBuffer_.fromArrayBuffer(received.indexBuffer);
          this.helper.flushBufferData(this.indicesBuffer_);
          this.renderTransform_ = projectionTransform;
          makeInverse(this.invertRenderTransform_, this.renderTransform_);
          this.renderInstructions_ = new Float32Array(event.data.renderInstructions);
          if (received.id === this.lastSentId) {
            this.ready = true;
          }
          this.getLayer().changed();
        }
      }
    );
    this.featureCache_ = {};
    this.featureCount_ = 0;
    const source = (
      /** @type {import("../../source/Vector.js").default} */
      this.getLayer().getSource()
    );
    this.sourceListenKeys_ = [listen(source, VectorEventType_default.ADDFEATURE, this.handleSourceFeatureAdded_, this), listen(source, VectorEventType_default.CHANGEFEATURE, this.handleSourceFeatureChanged_, this), listen(source, VectorEventType_default.REMOVEFEATURE, this.handleSourceFeatureDelete_, this), listen(source, VectorEventType_default.CLEAR, this.handleSourceFeatureClear_, this)];
    source.forEachFeature((feature) => {
      const geometry = feature.getGeometry();
      if (geometry && geometry.getType() === "Point") {
        this.featureCache_[getUid(feature)] = {
          feature: (
            /** @type {PointFeature} */
            feature
          ),
          properties: feature.getProperties(),
          flatCoordinates: (
            /** @type {Point} */
            geometry.getFlatCoordinates()
          )
        };
        this.featureCount_++;
      }
    });
  }
  /**
   * @override
   */
  afterHelperCreated() {
    this.program_ = this.helper.getProgram(this.fragmentShader_, this.vertexShader_);
    if (this.hitDetectionEnabled_) {
      this.hitRenderTarget_ = new RenderTarget_default(this.helper);
    }
    if (this.verticesBuffer_.getArray()) {
      this.helper.flushBufferData(this.verticesBuffer_);
    }
    if (this.indicesBuffer_.getArray()) {
      this.helper.flushBufferData(this.indicesBuffer_);
    }
  }
  /**
   * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
   * @private
   */
  handleSourceFeatureAdded_(event) {
    const feature = event.feature;
    const geometry = feature.getGeometry();
    if (geometry && geometry.getType() === "Point") {
      this.featureCache_[getUid(feature)] = {
        feature: (
          /** @type {PointFeature} */
          feature
        ),
        properties: feature.getProperties(),
        flatCoordinates: (
          /** @type {Point} */
          geometry.getFlatCoordinates()
        )
      };
      this.featureCount_++;
    }
  }
  /**
   * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
   * @private
   */
  handleSourceFeatureChanged_(event) {
    const feature = event.feature;
    const featureUid = getUid(feature);
    const item = this.featureCache_[featureUid];
    const geometry = feature.getGeometry();
    if (item) {
      if (geometry && geometry.getType() === "Point") {
        item.properties = feature.getProperties();
        item.flatCoordinates = /** @type {Point} */
        geometry.getFlatCoordinates();
      } else {
        delete this.featureCache_[featureUid];
        this.featureCount_--;
      }
    } else {
      if (geometry && geometry.getType() === "Point") {
        this.featureCache_[featureUid] = {
          feature: (
            /** @type {PointFeature} */
            feature
          ),
          properties: feature.getProperties(),
          flatCoordinates: (
            /** @type {Point} */
            geometry.getFlatCoordinates()
          )
        };
        this.featureCount_++;
      }
    }
  }
  /**
   * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
   * @private
   */
  handleSourceFeatureDelete_(event) {
    const feature = event.feature;
    const featureUid = getUid(feature);
    if (featureUid in this.featureCache_) {
      delete this.featureCache_[featureUid];
      this.featureCount_--;
    }
  }
  /**
   * @private
   */
  handleSourceFeatureClear_() {
    this.featureCache_ = {};
    this.featureCount_ = 0;
  }
  /**
   * Render the layer.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {HTMLElement} The rendered element.
   * @override
   */
  renderFrame(frameState) {
    const gl = this.helper.getGL();
    this.preRender(gl, frameState);
    const [startWorld, endWorld, worldWidth] = getWorldParameters(frameState, this.getLayer());
    this.renderWorlds(frameState, false, startWorld, endWorld, worldWidth);
    this.helper.finalizeDraw(frameState, this.dispatchPreComposeEvent, this.dispatchPostComposeEvent);
    if (this.hitDetectionEnabled_) {
      this.renderWorlds(frameState, true, startWorld, endWorld, worldWidth);
      this.hitRenderTarget_.clearCachedData();
    }
    this.postRender(gl, frameState);
    const canvas = this.helper.getCanvas();
    return canvas;
  }
  /**
   * Determine whether renderFrame should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   * @override
   */
  prepareFrameInternal(frameState) {
    const layer = this.getLayer();
    const vectorSource = layer.getSource();
    const viewState = frameState.viewState;
    const viewNotMoving = !frameState.viewHints[ViewHint_default.ANIMATING] && !frameState.viewHints[ViewHint_default.INTERACTING];
    const extentChanged = !equals(this.previousExtent_, frameState.extent);
    const sourceChanged = this.sourceRevision_ < vectorSource.getRevision();
    if (sourceChanged) {
      this.sourceRevision_ = vectorSource.getRevision();
    }
    if (viewNotMoving && (extentChanged || sourceChanged)) {
      const projection = viewState.projection;
      const resolution = viewState.resolution;
      const renderBuffer = layer instanceof BaseVector_default ? layer.getRenderBuffer() : 0;
      const extent = buffer(frameState.extent, renderBuffer * resolution);
      vectorSource.loadFeatures(extent, resolution, projection);
      this.rebuildBuffers_(frameState);
      this.previousExtent_ = frameState.extent.slice();
    }
    this.helper.useProgram(this.program_, frameState);
    this.helper.prepareDraw(frameState);
    this.helper.bindBuffer(this.verticesBuffer_);
    this.helper.bindBuffer(this.indicesBuffer_);
    this.helper.enableAttributes(this.attributes);
    return true;
  }
  /**
   * Rebuild internal webgl buffers based on current view extent; costly, should not be called too much
   * @param {import("../../Map").FrameState} frameState Frame state.
   * @private
   */
  rebuildBuffers_(frameState) {
    const projectionTransform = create();
    this.helper.makeProjectionTransform(frameState, projectionTransform);
    const userProjection = getUserProjection();
    const baseInstructionLength = this.hitDetectionEnabled_ ? 7 : 2;
    const singleInstructionLength = baseInstructionLength + this.customAttributes.length;
    const totalSize = singleInstructionLength * this.featureCount_;
    const renderInstructions = this.renderInstructions_ && this.renderInstructions_.length === totalSize ? this.renderInstructions_ : new Float32Array(totalSize);
    this.renderInstructions_ = null;
    let tmpCoords = [];
    const tmpColor2 = [];
    let idx = -1;
    const projection = frameState.viewState.projection;
    for (const featureUid in this.featureCache_) {
      const featureCache = this.featureCache_[featureUid];
      if (userProjection) {
        tmpCoords = fromUserCoordinate(featureCache.flatCoordinates, projection);
      } else {
        tmpCoords[0] = featureCache.flatCoordinates[0];
        tmpCoords[1] = featureCache.flatCoordinates[1];
      }
      apply(projectionTransform, tmpCoords);
      renderInstructions[++idx] = tmpCoords[0];
      renderInstructions[++idx] = tmpCoords[1];
      if (this.hitDetectionEnabled_) {
        const hitColor = colorEncodeId(idx + 5, tmpColor2);
        renderInstructions[++idx] = hitColor[0];
        renderInstructions[++idx] = hitColor[1];
        renderInstructions[++idx] = hitColor[2];
        renderInstructions[++idx] = hitColor[3];
        renderInstructions[++idx] = Number(featureUid);
      }
      for (let j = 0; j < this.customAttributes.length; j++) {
        const value = this.customAttributes[j].callback(featureCache.feature, featureCache.properties);
        renderInstructions[++idx] = value;
      }
    }
    const message = {
      id: ++this.lastSentId,
      type: WebGLWorkerMessageType.GENERATE_POINT_BUFFERS,
      renderInstructions: renderInstructions.buffer,
      customAttributesSize: singleInstructionLength - 2
    };
    message["projectionTransform"] = projectionTransform;
    this.ready = false;
    this.worker_.postMessage(message, [renderInstructions.buffer]);
  }
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("../vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("../Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   * @override
   */
  forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, callback, matches) {
    assert(this.hitDetectionEnabled_, "`forEachFeatureAtCoordinate` cannot be used on a WebGL layer if the hit detection logic has been disabled using the `disableHitDetection: true` option.");
    if (!this.renderInstructions_ || !this.hitDetectionEnabled_) {
      return void 0;
    }
    const pixel = apply(frameState.coordinateToPixelTransform, coordinate.slice());
    const data = this.hitRenderTarget_.readPixel(pixel[0] / 2, pixel[1] / 2);
    const color = [data[0] / 255, data[1] / 255, data[2] / 255, data[3] / 255];
    const index = colorDecodeId(color);
    const opacity = this.renderInstructions_[index];
    const uid = Math.floor(opacity).toString();
    const source = this.getLayer().getSource();
    const feature = source.getFeatureByUid(uid);
    if (feature) {
      return callback(feature, this.getLayer(), null);
    }
    return void 0;
  }
  /**
   * Render the world, either to the main framebuffer or to the hit framebuffer
   * @param {import("../../Map.js").FrameState} frameState current frame state
   * @param {boolean} forHitDetection whether the rendering is for hit detection
   * @param {number} startWorld the world to render in the first iteration
   * @param {number} endWorld the last world to render
   * @param {number} worldWidth the width of the worlds being rendered
   */
  renderWorlds(frameState, forHitDetection, startWorld, endWorld, worldWidth) {
    let world = startWorld;
    this.helper.useProgram(this.program_, frameState);
    if (forHitDetection) {
      this.hitRenderTarget_.setSize([Math.floor(frameState.size[0] / 2), Math.floor(frameState.size[1] / 2)]);
      this.helper.prepareDrawToRenderTarget(frameState, this.hitRenderTarget_, true);
    }
    this.helper.bindBuffer(this.verticesBuffer_);
    this.helper.bindBuffer(this.indicesBuffer_);
    this.helper.enableAttributes(this.attributes);
    do {
      this.helper.makeProjectionTransform(frameState, this.currentTransform_);
      translate(this.currentTransform_, world * worldWidth, 0);
      multiply(this.currentTransform_, this.invertRenderTransform_);
      this.helper.applyUniforms(frameState);
      this.helper.applyHitDetectionUniform(forHitDetection);
      const renderCount = this.indicesBuffer_.getSize();
      this.helper.drawElements(0, renderCount);
    } while (++world < endWorld);
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.worker_.terminate();
    this.sourceListenKeys_.forEach(function(key) {
      unlistenByKey(key);
    });
    this.sourceListenKeys_ = null;
    super.disposeInternal();
  }
  renderDeclutter() {
  }
};
var PointsLayer_default = WebGLPointsLayerRenderer;

// node_modules/ol/layer/WebGLPoints.js
var WebGLPointsLayer = class extends Layer_default2 {
  /**
   * @param {Options<VectorSourceType>} options Options.
   */
  constructor(options) {
    const baseOptions = Object.assign({}, options);
    super(baseOptions);
    this.styleVariables_ = options.variables || {};
    this.parseResult_ = parseLiteralStyle(options.style, this.styleVariables_, options.filter);
    this.hitDetectionDisabled_ = !!options.disableHitDetection;
  }
  /**
   * @override
   */
  createRenderer() {
    const attributes = Object.keys(this.parseResult_.attributes).map((name) => __spreadValues({
      name
    }, this.parseResult_.attributes[name]));
    return new PointsLayer_default(this, {
      vertexShader: this.parseResult_.builder.getSymbolVertexShader(),
      fragmentShader: this.parseResult_.builder.getSymbolFragmentShader(),
      hitDetectionEnabled: !this.hitDetectionDisabled_,
      uniforms: this.parseResult_.uniforms,
      attributes: (
        /** @type {Array<import('../renderer/webgl/PointsLayer.js').CustomAttribute>} */
        attributes
      )
    });
  }
  /**
   * Update any variables used by the layer style and trigger a re-render.
   * @param {Object<string, number>} variables Variables to update.
   */
  updateStyleVariables(variables) {
    Object.assign(this.styleVariables_, variables);
    this.changed();
  }
};
var WebGLPoints_default = WebGLPointsLayer;

// node_modules/ol/layer/WebGLTile.js
function parseStyle(style, bandCount) {
  const vertexShader = "\n    attribute vec2 ".concat(Attributes.TEXTURE_COORD, ";\n    uniform mat4 ").concat(Uniforms2.TILE_TRANSFORM, ";\n    uniform float ").concat(Uniforms2.TEXTURE_PIXEL_WIDTH, ";\n    uniform float ").concat(Uniforms2.TEXTURE_PIXEL_HEIGHT, ";\n    uniform float ").concat(Uniforms2.TEXTURE_RESOLUTION, ";\n    uniform float ").concat(Uniforms2.TEXTURE_ORIGIN_X, ";\n    uniform float ").concat(Uniforms2.TEXTURE_ORIGIN_Y, ";\n    uniform float ").concat(Uniforms2.DEPTH, ";\n\n    varying vec2 v_textureCoord;\n    varying vec2 v_mapCoord;\n\n    void main() {\n      v_textureCoord = ").concat(Attributes.TEXTURE_COORD, ";\n      v_mapCoord = vec2(\n        ").concat(Uniforms2.TEXTURE_ORIGIN_X, " + ").concat(Uniforms2.TEXTURE_RESOLUTION, " * ").concat(Uniforms2.TEXTURE_PIXEL_WIDTH, " * v_textureCoord[0],\n        ").concat(Uniforms2.TEXTURE_ORIGIN_Y, " - ").concat(Uniforms2.TEXTURE_RESOLUTION, " * ").concat(Uniforms2.TEXTURE_PIXEL_HEIGHT, " * v_textureCoord[1]\n      );\n      gl_Position = ").concat(Uniforms2.TILE_TRANSFORM, " * vec4(").concat(Attributes.TEXTURE_COORD, ", ").concat(Uniforms2.DEPTH, ", 1.0);\n    }\n  ");
  const context = __spreadProps(__spreadValues({}, newCompilationContext()), {
    bandCount
  });
  const pipeline = [];
  if (style.color !== void 0) {
    const color = expressionToGlsl(context, style.color, ColorType);
    pipeline.push("color = ".concat(color, ";"));
  }
  if (style.contrast !== void 0) {
    const contrast = expressionToGlsl(context, style.contrast, NumberType);
    pipeline.push("color.rgb = clamp((".concat(contrast, " + 1.0) * color.rgb - (").concat(contrast, " / 2.0), vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));"));
  }
  if (style.exposure !== void 0) {
    const exposure = expressionToGlsl(context, style.exposure, NumberType);
    pipeline.push("color.rgb = clamp((".concat(exposure, " + 1.0) * color.rgb, vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));"));
  }
  if (style.saturation !== void 0) {
    const saturation = expressionToGlsl(context, style.saturation, NumberType);
    pipeline.push("\n      float saturation = ".concat(saturation, " + 1.0;\n      float sr = (1.0 - saturation) * 0.2126;\n      float sg = (1.0 - saturation) * 0.7152;\n      float sb = (1.0 - saturation) * 0.0722;\n      mat3 saturationMatrix = mat3(\n        sr + saturation, sr, sr,\n        sg, sg + saturation, sg,\n        sb, sb, sb + saturation\n      );\n      color.rgb = clamp(saturationMatrix * color.rgb, vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));\n    "));
  }
  if (style.gamma !== void 0) {
    const gamma = expressionToGlsl(context, style.gamma, NumberType);
    pipeline.push("color.rgb = pow(color.rgb, vec3(1.0 / ".concat(gamma, "));"));
  }
  if (style.brightness !== void 0) {
    const brightness = expressionToGlsl(context, style.brightness, NumberType);
    pipeline.push("color.rgb = clamp(color.rgb + ".concat(brightness, ", vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0));"));
  }
  const uniforms = {};
  const numVariables = Object.keys(context.variables).length;
  if (numVariables > 1 && !style.variables) {
    throw new Error("Missing variables in style (expected ".concat(context.variables, ")"));
  }
  for (let i = 0; i < numVariables; ++i) {
    const variable = context.variables[Object.keys(context.variables)[i]];
    if (!(variable.name in style.variables)) {
      throw new Error("Missing '".concat(variable.name, "' in style variables"));
    }
    const uniformName = uniformNameForVariable(variable.name);
    uniforms[uniformName] = function() {
      let value = style.variables[variable.name];
      if (typeof value === "string") {
        value = getStringNumberEquivalent(value);
      }
      return value !== void 0 ? value : -9999999;
    };
  }
  const uniformDeclarations = Object.keys(uniforms).map(function(name) {
    return "uniform float ".concat(name, ";");
  });
  const textureCount = Math.ceil(bandCount / 4);
  uniformDeclarations.push("uniform sampler2D ".concat(Uniforms2.TILE_TEXTURE_ARRAY, "[").concat(textureCount, "];"));
  if (context.paletteTextures) {
    uniformDeclarations.push("uniform sampler2D ".concat(PALETTE_TEXTURE_ARRAY, "[").concat(context.paletteTextures.length, "];"));
  }
  const functionDefintions = Object.keys(context.functions).map(function(name) {
    return context.functions[name];
  });
  const fragmentShader = "\n    #ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    #else\n    precision mediump float;\n    #endif\n\n    varying vec2 v_textureCoord;\n    varying vec2 v_mapCoord;\n    uniform vec4 ".concat(Uniforms2.RENDER_EXTENT, ";\n    uniform float ").concat(Uniforms2.TRANSITION_ALPHA, ";\n    uniform float ").concat(Uniforms2.TEXTURE_PIXEL_WIDTH, ";\n    uniform float ").concat(Uniforms2.TEXTURE_PIXEL_HEIGHT, ";\n    uniform float ").concat(Uniforms2.RESOLUTION, ";\n    uniform float ").concat(Uniforms2.ZOOM, ";\n\n    ").concat(uniformDeclarations.join("\n"), "\n\n    ").concat(functionDefintions.join("\n"), "\n\n    void main() {\n      if (\n        v_mapCoord[0] < ").concat(Uniforms2.RENDER_EXTENT, "[0] ||\n        v_mapCoord[1] < ").concat(Uniforms2.RENDER_EXTENT, "[1] ||\n        v_mapCoord[0] > ").concat(Uniforms2.RENDER_EXTENT, "[2] ||\n        v_mapCoord[1] > ").concat(Uniforms2.RENDER_EXTENT, "[3]\n      ) {\n        discard;\n      }\n\n      vec4 color = texture2D(").concat(Uniforms2.TILE_TEXTURE_ARRAY, "[0],  v_textureCoord);\n\n      ").concat(pipeline.join("\n"), "\n\n      gl_FragColor = color;\n      gl_FragColor.rgb *= gl_FragColor.a;\n      gl_FragColor *= ").concat(Uniforms2.TRANSITION_ALPHA, ";\n    }");
  return {
    vertexShader,
    fragmentShader,
    uniforms,
    paletteTextures: context.paletteTextures
  };
}
var WebGLTileLayer = class extends BaseTile_default {
  /**
   * @param {Options} [options] Tile layer options.
   */
  constructor(options) {
    options = options ? Object.assign({}, options) : {};
    const style = options.style || {};
    delete options.style;
    super(options);
    this.sources_ = options.sources;
    this.renderedSource_ = null;
    this.renderedResolution_ = NaN;
    this.style_ = style;
    this.styleVariables_ = this.style_.variables || {};
    this.handleSourceUpdate_();
    this.addChangeListener(Property_default.SOURCE, this.handleSourceUpdate_);
  }
  /**
   * Gets the sources for this layer, for a given extent and resolution.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @return {Array<SourceType>} Sources.
   */
  getSources(extent, resolution) {
    const source = this.getSource();
    return this.sources_ ? typeof this.sources_ === "function" ? this.sources_(extent, resolution) : this.sources_ : source ? [source] : [];
  }
  /**
   * @return {SourceType} The source being rendered.
   * @override
   */
  getRenderSource() {
    return this.renderedSource_ || this.getSource();
  }
  /**
   * @return {import("../source/Source.js").State} Source state.
   * @override
   */
  getSourceState() {
    const source = this.getRenderSource();
    return source ? source.getState() : "undefined";
  }
  /**
   * @private
   */
  handleSourceUpdate_() {
    if (this.hasRenderer()) {
      this.getRenderer().clearCache();
    }
    const source = this.getSource();
    if (source) {
      if (source.getState() === "loading") {
        const onChange = () => {
          if (source.getState() === "ready") {
            source.removeEventListener("change", onChange);
            this.setStyle(this.style_);
          }
        };
        source.addEventListener("change", onChange);
      } else {
        this.setStyle(this.style_);
      }
    }
  }
  /**
   * @private
   * @return {number} The number of source bands.
   */
  getSourceBandCount_() {
    const max = Number.MAX_SAFE_INTEGER;
    const sources = this.getSources([-max, -max, max, max], max);
    return sources && sources.length && "bandCount" in sources[0] ? sources[0].bandCount : 4;
  }
  /**
   * @override
   */
  createRenderer() {
    const parsedStyle = parseStyle(this.style_, this.getSourceBandCount_());
    return new TileLayer_default2(this, {
      vertexShader: parsedStyle.vertexShader,
      fragmentShader: parsedStyle.fragmentShader,
      uniforms: parsedStyle.uniforms,
      cacheSize: this.getCacheSize(),
      paletteTextures: parsedStyle.paletteTextures
    });
  }
  /**
   * @param {import("../Map").FrameState} frameState Frame state.
   * @param {Array<SourceType>} sources Sources.
   * @return {HTMLElement} Canvas.
   */
  renderSources(frameState, sources) {
    const layerRenderer = this.getRenderer();
    let canvas;
    for (let i = 0, ii = sources.length; i < ii; ++i) {
      this.renderedSource_ = sources[i];
      if (layerRenderer.prepareFrame(frameState)) {
        canvas = layerRenderer.renderFrame(frameState);
      }
    }
    return canvas;
  }
  /**
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target which the renderer may (but need not) use
   * for rendering its content.
   * @return {HTMLElement} The rendered element.
   * @override
   */
  render(frameState, target) {
    this.rendered = true;
    const viewState = frameState.viewState;
    const sources = this.getSources(frameState.extent, viewState.resolution);
    let ready = true;
    for (let i = 0, ii = sources.length; i < ii; ++i) {
      const source = sources[i];
      const sourceState = source.getState();
      if (sourceState == "loading") {
        const onChange = () => {
          if (source.getState() == "ready") {
            source.removeEventListener("change", onChange);
            this.changed();
          }
        };
        source.addEventListener("change", onChange);
      }
      ready = ready && sourceState == "ready";
    }
    const canvas = this.renderSources(frameState, sources);
    if (this.getRenderer().renderComplete && ready) {
      this.renderedResolution_ = viewState.resolution;
      return canvas;
    }
    if (this.renderedResolution_ > 0.5 * viewState.resolution) {
      const altSources = this.getSources(frameState.extent, this.renderedResolution_).filter((source) => !sources.includes(source));
      if (altSources.length > 0) {
        return this.renderSources(frameState, altSources);
      }
    }
    return canvas;
  }
  /**
   * Update the layer style.  The `updateStyleVariables` function is a more efficient
   * way to update layer rendering.  In cases where the whole style needs to be updated,
   * this method may be called instead.  Note that calling this method will also replace
   * any previously set variables, so the new style also needs to include new variables,
   * if needed.
   * @param {Style} style The new style.
   */
  setStyle(style) {
    this.styleVariables_ = style.variables || {};
    this.style_ = style;
    if (this.hasRenderer()) {
      const parsedStyle = parseStyle(this.style_, this.getSourceBandCount_());
      const renderer = this.getRenderer();
      renderer.reset({
        vertexShader: parsedStyle.vertexShader,
        fragmentShader: parsedStyle.fragmentShader,
        uniforms: parsedStyle.uniforms,
        paletteTextures: parsedStyle.paletteTextures
      });
      this.changed();
    }
  }
  /**
   * Update any variables used by the layer style and trigger a re-render.
   * @param {Object<string, number>} variables Variables to update.
   * @api
   */
  updateStyleVariables(variables) {
    Object.assign(this.styleVariables_, variables);
    this.changed();
  }
};
WebGLTileLayer.prototype.dispose;
var WebGLTile_default = WebGLTileLayer;

// node_modules/ol/layer/WebGLVector.js
var WebGLVectorLayer = class extends Layer_default2 {
  /**
   * @param {Options<VectorSourceType, FeatureType>} [options] Options.
   */
  constructor(options) {
    const baseOptions = Object.assign({}, options);
    super(baseOptions);
    this.styleVariables_ = options.variables || {};
    this.style_ = options.style;
    this.hitDetectionDisabled_ = !!options.disableHitDetection;
  }
  /**
   * @override
   */
  createRenderer() {
    return new VectorLayer_default2(this, {
      style: this.style_,
      variables: this.styleVariables_,
      disableHitDetection: this.hitDetectionDisabled_
    });
  }
  /**
   * Update any variables used by the layer style and trigger a re-render.
   * @param {import('../style/flat.js').StyleVariables} variables Variables to update.
   */
  updateStyleVariables(variables) {
    Object.assign(this.styleVariables_, variables);
    this.changed();
  }
  /**
   * Set the layer style.
   * @param {import('../style/flat.js').FlatStyleLike} style Layer style.
   */
  setStyle(style) {
    this.style_ = style;
    this.clearRenderer();
    this.changed();
  }
};
var WebGLVector_default = WebGLVectorLayer;
export {
  Graticule_default as Graticule,
  Group_default as Group,
  Heatmap_default as Heatmap,
  Image_default as Image,
  Layer_default2 as Layer,
  Tile_default2 as Tile,
  Vector_default as Vector,
  VectorImage_default as VectorImage,
  VectorTile_default as VectorTile,
  WebGLPoints_default as WebGLPoints,
  WebGLTile_default as WebGLTile,
  WebGLVector_default as WebGLVector
};
//# sourceMappingURL=ol_layer.js.map
