import {
  EventType_default,
  Target_default,
  listenOnce,
  toPromise,
  unlistenByKey
} from "./chunk-EEDHQZUN.js";
import {
  clamp,
  toFixed
} from "./chunk-ASEIJJKF.js";

// node_modules/ol/ImageState.js
var ImageState_default = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};

// node_modules/ol/has.js
var ua = typeof navigator !== "undefined" && typeof navigator.userAgent !== "undefined" ? navigator.userAgent.toLowerCase() : "";
var SAFARI = ua.includes("safari") && !ua.includes("chrom");
var SAFARI_BUG_237906 = SAFARI && (ua.includes("version/15.4") || /cpu (os|iphone os) 15_4 like mac os x/.test(ua));
var WEBKIT = ua.includes("webkit") && !ua.includes("edge");
var MAC = ua.includes("macintosh");
var DEVICE_PIXEL_RATIO = typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1;
var WORKER_OFFSCREEN_CANVAS = typeof WorkerGlobalScope !== "undefined" && typeof OffscreenCanvas !== "undefined" && self instanceof WorkerGlobalScope;
var IMAGE_DECODE = typeof Image !== "undefined" && Image.prototype.decode;
var CREATE_IMAGE_BITMAP = typeof createImageBitmap === "function";
var PASSIVE_EVENT_LISTENERS = function() {
  let passive = false;
  try {
    const options = Object.defineProperty({}, "passive", {
      get: function() {
        passive = true;
      }
    });
    window.addEventListener("_", null, options);
    window.removeEventListener("_", null, options);
  } catch (e) {
  }
  return passive;
}();

// node_modules/ol/Image.js
var ImageWrapper = class extends Target_default {
  /**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number|Array<number>|undefined} resolution Resolution. If provided as array, x and y
   * resolution will be assumed.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("./ImageState.js").default|Loader} stateOrLoader State.
   */
  constructor(extent, resolution, pixelRatio, stateOrLoader) {
    super();
    this.extent = extent;
    this.pixelRatio_ = pixelRatio;
    this.resolution = resolution;
    this.state = typeof stateOrLoader === "function" ? ImageState_default.IDLE : stateOrLoader;
    this.image_ = null;
    this.loader = typeof stateOrLoader === "function" ? stateOrLoader : null;
  }
  /**
   * @protected
   */
  changed() {
    this.dispatchEvent(EventType_default.CHANGE);
  }
  /**
   * @return {import("./extent.js").Extent} Extent.
   */
  getExtent() {
    return this.extent;
  }
  /**
   * @return {import('./DataTile.js').ImageLike} Image.
   */
  getImage() {
    return this.image_;
  }
  /**
   * @return {number} PixelRatio.
   */
  getPixelRatio() {
    return this.pixelRatio_;
  }
  /**
   * @return {number|Array<number>} Resolution.
   */
  getResolution() {
    return (
      /** @type {number} */
      this.resolution
    );
  }
  /**
   * @return {import("./ImageState.js").default} State.
   */
  getState() {
    return this.state;
  }
  /**
   * Load not yet loaded URI.
   */
  load() {
    if (this.state == ImageState_default.IDLE) {
      if (this.loader) {
        this.state = ImageState_default.LOADING;
        this.changed();
        const resolution = this.getResolution();
        const requestResolution = Array.isArray(resolution) ? resolution[0] : resolution;
        toPromise(() => this.loader(this.getExtent(), requestResolution, this.getPixelRatio())).then((image) => {
          if ("image" in image) {
            this.image_ = image.image;
          }
          if ("extent" in image) {
            this.extent = image.extent;
          }
          if ("resolution" in image) {
            this.resolution = image.resolution;
          }
          if ("pixelRatio" in image) {
            this.pixelRatio_ = image.pixelRatio;
          }
          if (image instanceof HTMLImageElement || CREATE_IMAGE_BITMAP && image instanceof ImageBitmap || image instanceof HTMLCanvasElement || image instanceof HTMLVideoElement) {
            this.image_ = image;
          }
          this.state = ImageState_default.LOADED;
        }).catch((error) => {
          this.state = ImageState_default.ERROR;
          console.error(error);
        }).finally(() => this.changed());
      }
    }
  }
  /**
   * @param {import('./DataTile.js').ImageLike} image The image.
   */
  setImage(image) {
    this.image_ = image;
  }
  /**
   * @param {number|Array<number>} resolution Resolution.
   */
  setResolution(resolution) {
    this.resolution = resolution;
  }
};
function listenImage(image, loadHandler, errorHandler) {
  const img = (
    /** @type {HTMLImageElement} */
    image
  );
  let listening = true;
  let decoding = false;
  let loaded = false;
  const listenerKeys = [listenOnce(img, EventType_default.LOAD, function() {
    loaded = true;
    if (!decoding) {
      loadHandler();
    }
  })];
  if (img.src && IMAGE_DECODE) {
    decoding = true;
    img.decode().then(function() {
      if (listening) {
        loadHandler();
      }
    }).catch(function(error) {
      if (listening) {
        if (loaded) {
          loadHandler();
        } else {
          errorHandler();
        }
      }
    });
  } else {
    listenerKeys.push(listenOnce(img, EventType_default.ERROR, errorHandler));
  }
  return function unlisten() {
    listening = false;
    listenerKeys.forEach(unlistenByKey);
  };
}
function load(image, src) {
  return new Promise((resolve, reject) => {
    function handleLoad() {
      unlisten();
      resolve(image);
    }
    function handleError() {
      unlisten();
      reject(new Error("Image load error"));
    }
    function unlisten() {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    }
    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    if (src) {
      image.src = src;
    }
  });
}
function decodeFallback(image, src) {
  if (src) {
    image.src = src;
  }
  return image.src && IMAGE_DECODE ? new Promise((resolve, reject) => image.decode().then(() => resolve(image)).catch((e) => image.complete && image.width ? resolve(image) : reject(e))) : load(image);
}
function decode(image, src) {
  if (src) {
    image.src = src;
  }
  return image.src && IMAGE_DECODE && CREATE_IMAGE_BITMAP ? image.decode().then(() => createImageBitmap(image)).catch((e) => {
    if (image.complete && image.width) {
      return image;
    }
    throw e;
  }) : decodeFallback(image);
}
var Image_default = ImageWrapper;

// node_modules/ol/dom.js
function createCanvasContext2D(width, height, canvasPool, settings) {
  let canvas;
  if (canvasPool && canvasPool.length) {
    canvas = /** @type {HTMLCanvasElement} */
    canvasPool.shift();
  } else if (WORKER_OFFSCREEN_CANVAS) {
    canvas = new OffscreenCanvas(width || 300, height || 300);
  } else {
    canvas = document.createElement("canvas");
  }
  if (width) {
    canvas.width = width;
  }
  if (height) {
    canvas.height = height;
  }
  return (
    /** @type {CanvasRenderingContext2D} */
    canvas.getContext("2d", settings)
  );
}
var sharedCanvasContext;
function getSharedCanvasContext2D() {
  if (!sharedCanvasContext) {
    sharedCanvasContext = createCanvasContext2D(1, 1);
  }
  return sharedCanvasContext;
}
function releaseCanvas(context) {
  const canvas = context.canvas;
  canvas.width = 1;
  canvas.height = 1;
  context.clearRect(0, 0, 1, 1);
}
function outerWidth(element) {
  let width = element.offsetWidth;
  const style = getComputedStyle(element);
  width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
  return width;
}
function outerHeight(element) {
  let height = element.offsetHeight;
  const style = getComputedStyle(element);
  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
  return height;
}
function replaceNode(newNode, oldNode) {
  const parent = oldNode.parentNode;
  if (parent) {
    parent.replaceChild(newNode, oldNode);
  }
}
function removeChildren(node) {
  while (node.lastChild) {
    node.lastChild.remove();
  }
}
function replaceChildren(node, children) {
  const oldChildren = node.childNodes;
  for (let i = 0; true; ++i) {
    const oldChild = oldChildren[i];
    const newChild = children[i];
    if (!oldChild && !newChild) {
      break;
    }
    if (oldChild === newChild) {
      continue;
    }
    if (!oldChild) {
      node.appendChild(newChild);
      continue;
    }
    if (!newChild) {
      node.removeChild(oldChild);
      --i;
      continue;
    }
    node.insertBefore(newChild, oldChild);
  }
}

// node_modules/ol/color.js
var NO_COLOR = [NaN, NaN, NaN, 0];
var colorParseContext;
function getColorParseContext() {
  if (!colorParseContext) {
    colorParseContext = createCanvasContext2D(1, 1, void 0, {
      willReadFrequently: true,
      desynchronized: true
    });
  }
  return colorParseContext;
}
var rgbModernRegEx = /^rgba?\(\s*(\d+%?)\s+(\d+%?)\s+(\d+%?)(?:\s*\/\s*(\d+%|\d*\.\d+|[01]))?\s*\)$/i;
var rgbLegacyAbsoluteRegEx = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(\d+%|\d*\.\d+|[01]))?\s*\)$/i;
var rgbLegacyPercentageRegEx = /^rgba?\(\s*(\d+%)\s*,\s*(\d+%)\s*,\s*(\d+%)(?:\s*,\s*(\d+%|\d*\.\d+|[01]))?\s*\)$/i;
var hexRegEx = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;
function toColorComponent(s, divider) {
  return s.endsWith("%") ? Number(s.substring(0, s.length - 1)) / divider : Number(s);
}
function throwInvalidColor(color) {
  throw new Error('failed to parse "' + color + '" as color');
}
function parseRgba(color) {
  if (color.toLowerCase().startsWith("rgb")) {
    const rgb = color.match(rgbLegacyAbsoluteRegEx) || color.match(rgbModernRegEx) || color.match(rgbLegacyPercentageRegEx);
    if (rgb) {
      const alpha = rgb[4];
      const rgbDivider = 100 / 255;
      return [clamp(toColorComponent(rgb[1], rgbDivider) + 0.5 | 0, 0, 255), clamp(toColorComponent(rgb[2], rgbDivider) + 0.5 | 0, 0, 255), clamp(toColorComponent(rgb[3], rgbDivider) + 0.5 | 0, 0, 255), alpha !== void 0 ? clamp(toColorComponent(alpha, 100), 0, 1) : 1];
    }
    throwInvalidColor(color);
  }
  if (color.startsWith("#")) {
    if (hexRegEx.test(color)) {
      const hex = color.substring(1);
      const step = hex.length <= 4 ? 1 : 2;
      const colorFromHex = [0, 0, 0, 255];
      for (let i = 0, ii = hex.length; i < ii; i += step) {
        let colorComponent = parseInt(hex.substring(i, i + step), 16);
        if (step === 1) {
          colorComponent += colorComponent << 4;
        }
        colorFromHex[i / step] = colorComponent;
      }
      colorFromHex[3] = colorFromHex[3] / 255;
      return colorFromHex;
    }
    throwInvalidColor(color);
  }
  const context = getColorParseContext();
  context.fillStyle = "#abcdef";
  let invalidCheckFillStyle = context.fillStyle;
  context.fillStyle = color;
  if (context.fillStyle === invalidCheckFillStyle) {
    context.fillStyle = "#fedcba";
    invalidCheckFillStyle = context.fillStyle;
    context.fillStyle = color;
    if (context.fillStyle === invalidCheckFillStyle) {
      throwInvalidColor(color);
    }
  }
  const colorString = context.fillStyle;
  if (colorString.startsWith("#") || colorString.startsWith("rgba")) {
    return parseRgba(colorString);
  }
  context.clearRect(0, 0, 1, 1);
  context.fillRect(0, 0, 1, 1);
  const colorFromImage = Array.from(context.getImageData(0, 0, 1, 1).data);
  colorFromImage[3] = toFixed(colorFromImage[3] / 255, 3);
  return colorFromImage;
}
function asString(color) {
  if (typeof color === "string") {
    return color;
  }
  return toString(color);
}
var MAX_CACHE_SIZE = 1024;
var cache = {};
var cacheSize = 0;
function withAlpha(color) {
  if (color.length === 4) {
    return color;
  }
  const output = color.slice();
  output[3] = 1;
  return output;
}
function b1(v) {
  return v > 31308e-7 ? Math.pow(v, 1 / 2.4) * 269.025 - 14.025 : v * 3294.6;
}
function b2(v) {
  return v > 0.2068965 ? Math.pow(v, 3) : (v - 4 / 29) * (108 / 841);
}
function a1(v) {
  return v > 10.314724 ? Math.pow((v + 14.025) / 269.025, 2.4) : v / 3294.6;
}
function a2(v) {
  return v > 88564e-7 ? Math.pow(v, 1 / 3) : v / (108 / 841) + 4 / 29;
}
function rgbaToLcha(color) {
  const r = a1(color[0]);
  const g = a1(color[1]);
  const b = a1(color[2]);
  const y = a2(r * 0.222488403 + g * 0.716873169 + b * 0.06060791);
  const l = 500 * (a2(r * 0.452247074 + g * 0.399439023 + b * 0.148375274) - y);
  const q = 200 * (y - a2(r * 0.016863605 + g * 0.117638439 + b * 0.865350722));
  const h = Math.atan2(q, l) * (180 / Math.PI);
  return [116 * y - 16, Math.sqrt(l * l + q * q), h < 0 ? h + 360 : h, color[3]];
}
function lchaToRgba(color) {
  const l = (color[0] + 16) / 116;
  const c = color[1];
  const h = color[2] * Math.PI / 180;
  const y = b2(l);
  const x = b2(l + c / 500 * Math.cos(h));
  const z = b2(l - c / 200 * Math.sin(h));
  const r = b1(x * 3.021973625 - y * 1.617392459 - z * 0.404875592);
  const g = b1(x * -0.943766287 + y * 1.916279586 + z * 0.027607165);
  const b = b1(x * 0.069407491 - y * 0.22898585 + z * 1.159737864);
  return [clamp(r + 0.5 | 0, 0, 255), clamp(g + 0.5 | 0, 0, 255), clamp(b + 0.5 | 0, 0, 255), color[3]];
}
function fromString(s) {
  if (s === "none") {
    return NO_COLOR;
  }
  if (cache.hasOwnProperty(s)) {
    return cache[s];
  }
  if (cacheSize >= MAX_CACHE_SIZE) {
    let i = 0;
    for (const key in cache) {
      if ((i++ & 3) === 0) {
        delete cache[key];
        --cacheSize;
      }
    }
  }
  const color = parseRgba(s);
  if (color.length !== 4) {
    throwInvalidColor(s);
  }
  for (const c of color) {
    if (isNaN(c)) {
      throwInvalidColor(s);
    }
  }
  cache[s] = color;
  ++cacheSize;
  return color;
}
function asArray(color) {
  if (Array.isArray(color)) {
    return color;
  }
  return fromString(color);
}
function toString(color) {
  let r = color[0];
  if (r != (r | 0)) {
    r = r + 0.5 | 0;
  }
  let g = color[1];
  if (g != (g | 0)) {
    g = g + 0.5 | 0;
  }
  let b = color[2];
  if (b != (b | 0)) {
    b = b + 0.5 | 0;
  }
  const a = color[3] === void 0 ? 1 : Math.round(color[3] * 1e3) / 1e3;
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

// node_modules/ol/size.js
function hasArea(size) {
  return size[0] > 0 && size[1] > 0;
}
function scale(size, ratio, dest) {
  if (dest === void 0) {
    dest = [0, 0];
  }
  dest[0] = size[0] * ratio + 0.5 | 0;
  dest[1] = size[1] * ratio + 0.5 | 0;
  return dest;
}
function toSize(size, dest) {
  if (Array.isArray(size)) {
    return size;
  }
  if (dest === void 0) {
    dest = [size, size];
  } else {
    dest[0] = size;
    dest[1] = size;
  }
  return dest;
}

export {
  SAFARI_BUG_237906,
  WEBKIT,
  MAC,
  DEVICE_PIXEL_RATIO,
  WORKER_OFFSCREEN_CANVAS,
  PASSIVE_EVENT_LISTENERS,
  ImageState_default,
  createCanvasContext2D,
  getSharedCanvasContext2D,
  releaseCanvas,
  outerWidth,
  outerHeight,
  replaceNode,
  removeChildren,
  replaceChildren,
  NO_COLOR,
  asString,
  withAlpha,
  rgbaToLcha,
  lchaToRgba,
  fromString,
  asArray,
  toString,
  listenImage,
  decodeFallback,
  decode,
  Image_default,
  hasArea,
  scale,
  toSize
};
//# sourceMappingURL=chunk-XOFNBNO4.js.map
