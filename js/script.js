/*================================================================ Model
 */

/**
 * Pixel
 * value of all parameters is between 0-255
 * 
 * @param  {number} r
 * @param  {number} g
 * @param  {number} b
 * @param  {number} a
 *
 * @return {Pixel}
 */
var Pixel = function(r, g, b, a) {
  return {
    red: r,
    green: g,
    blue: b,
    alpha: a
  }
};

/**
 * ImageDataArray
 *
 * ImageData
 * {
 *   data: Uint8ClampedArray
 *   width: number
 *   height: number
 * }
 *
 * ImageDataArray
 * {
 *   data: Array
 *   width: number
 *   height: number
 * }
 * 
 * @param  {Uint8ClampedArray} data
 * @param  {number} width
 * @param  {number} height
 *
 * @return {ImageDataArray}
 */
var ImageDataArray = function(data, width, height) {
  return {
    data: data,
    width: width,
    height: height
  };
};

/**
 * PixelPanels
 * 
 * @param  {number} width
 * @param  {number} height
 * @param  {Pixel} defaultPixel
 * 
 * @return {Array.Array.Pixel}
 */
var PixelPanels = function(width, height, defaultPixel) {
  return Factory.TwoDArrayWithDefault(width, height, defaultPixel);
};

/*================================================================ Static
 */

// used for create something common (e.g. Model)
var Factory = {

  /**
   * Creature 2D array
   * 
   * @see http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
   * 
   * @param  {number} length
   * 
   * @return {Array.Array}
   */
  TwoDArray: function(length) {
    var arr = new Array(length || 0),
    i = length;

    if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);

      while(i--) {
        arr[length-1 - i] = this.TwoDArray.apply(this, args);
      }
    }

    return arr;
  },

  /**
   * Creature 2D array with default value
   * 
   * @see http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
   * 
   * @param  {number} length
   * 
   * @return {Array.Array}
   */
  TwoDArrayWithDefault: function(rows, cols, defaultValue) {
    var arr = [],
      i = 0,
      j = 0;

    for (i = 0; i < rows; i++) {
      arr.push([]);
      arr[i].push(new Array(cols));

      for (j = 0; j < cols; j++) {
        arr[i][j] = defaultValue;
      }
    }

    return arr;
  },

  /**
   * White pixel panels
   * 
   * @param  {number} width
   * @param  {number} height
   * 
   * @return {PixelPanels}
   */
  whitePixelPanels: function(width, height) {
    pixel = this.whitePixel();

    return (new PixelPanels(width, height, pixel));
  },

  /**
   * Black pixel panels
   * 
   * @param  {number} width
   * @param  {number} height
   * 
   * @return {PixelPanels}
   */
  blackPixelPanels: function(width, height) {
    pixel = this.blackPixel();

    return (new PixelPanels(width, height, pixel));
  },

  /**
   * Transparent pixel panels
   * 
   * @param  {number} width
   * @param  {number} height
   * 
   * @return {PixelPanels}
   */
  transparentPixelPanels: function(width, height) {
    transparentPixel = this.transparentPixel();

    return (new PixelPanels(width, height, transparentPixel));
  },

  /**
   * White pixel
   * 
   * @return {Pixel}
   */
  whitePixel: function() {
    return (new Pixel(255, 255, 255, 1));
  },

  /**
   * Black pixel
   * 
   * @return {Pixel}
   */
  blackPixel: function() {
    return (new Pixel(0, 0, 0, 1));
  },

  /**
   * Transparent pixel
   * 
   * @return {Pixel}
   */
  transparentPixel: function() {
    return (new Pixel(0, 0, 0, 0));
  },
};

var Util = {

  /**
   * Check null / undefined
   *
   * @see http://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in
   * @see http://stackoverflow.com/questions/2559318/how-to-check-for-an-undefined-or-null-variable-in-javascript
   * 
   * @param  {*} a
   * @return {boolean}
   */
  isNullOrUndefined: function(a) {
    var result = (a) ? true : false;

    return (a == null);
  },

  /**
   * Check empty string
   * 
   * @param  {string} str
   * @return {boolean}
   */
  isEmptyString: function(str) {
    return (str.trim() === '');
  },

  /**
   * Clone object
   * TODO: move to util class
   *
   * @see http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
   * 
   * @param  {Object} obj
   * 
   * @return {Object}
   */
  clone: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  /*---------------------------------------------------------------- App
   */

  /**
   * Check transparent pixel
   * 
   * @param  {Pixel} pixel
   * 
   * @return {boolean}
   */
  isTransparentPixel: function(pixel) {
    return (pixel.alpha === 0);
  },

  /**
   * Check pixel is exists or not
   * unused
   * 
   * @param  {PixelPanels} pixelPanels
   * @param  {number} i width index
   * @param  {number} j height index
   * 
   * @return {boolean}
   */
  isPixelExists(pixelPanels, i, j) {
    return ((typeof pixelPanels[i] === 'undefined') ||
      (typeof pixelPanels[i][j] === 'undefined'));
  },

  /**
   * Add pixel
   * 
   * @param  {Pixel} pixel1
   * @param  {Pixel} pixel2
   * 
   * @reutnr 
   */
  addPixel: function(pixel, pixel2) {
    red = Math.round(pixel.red + pixel2.red);
    green = Math.round(pixel.green + pixel2.green);
    blue = Math.round(pixel.blue + pixel2.blue),
    alpha = Math.round(pixel.alpha + pixel2.alpha);

    return (new Pixel(red, green, blue, alpha));
  },

  /**
   * Average pixel
   * 
   * @param  {Pixel} pixel1
   * @param  {Pixel} pixel2
   * 
   * @return {Pixel}
   */
  averagePixel: function(pixel, pixel2) {
    red = Math.round((pixel.red + pixel2.red) / 2 );
    green = Math.round((pixel.green + pixel2.green) / 2 );
    blue = Math.round((pixel.blue + pixel2.blue) / 2 ),
    alpha = Math.round((pixel.alpha + pixel2.alpha) / 2 );

    return (new Pixel(red, green, blue, alpha));
  },

  /**
   * Filter3x3Pixel
   * used by "this.filter3x3" only
   * TODO: optimize logic
   * 
   * @param  {PixelPanels} pixelPanels
   * @param  {Array.Array.number[3]} filter
   * @param  {number} i index of width
   * @param  {number} j index of height
   *
   * @return {Pixel}
   */
  filter3x3Pixel: function(pixelPanels, filter, i, j) {
    var k = 0, // width
      l = 0, // height
      red = 0,
      green = 0,
      blue = 0,
      alpha = 0;

    for (l = 0; l < 3; l++) {
      for (k = 0; k < 3; k++) {
        red   += filter[k][l] * pixelPanels[i + k - 1][j + l - 1].red;
        green += filter[k][l] * pixelPanels[i + k - 1][j + l - 1].green;
        blue  += filter[k][l] * pixelPanels[i + k - 1][j + l - 1].blue;
        alpha += filter[k][l] * pixelPanels[i + k - 1][j + l - 1].alpha;
      }
    }

    // clean
    red = Math.round(red);
    green = Math.round(green);
    blue = Math.round(blue);
    alpha = Math.round(alpha);

    return (new Pixel(red, green, blue, alpha));
  },
};

var Convert = {

  /**
   * ImageData to ImageDataArray
   * 
   * @param  {ImageData} imageData
   * 
   * @return {ImageDataArray}
   */
  imageDataToImageDataArray: function(imageData) {
    return (new ImageDataArray(
      Array.from(imageData.data),
      imageData.width,
      imageData.height
    ));
  },

  /**
   * ImageDataArray to ImageData
   * 
   * @param  {ImageDataArray} imageDataArray
   * 
   * @return {ImageData}
   */
  imageDataArrayToImageData: function(imageDataArray) {
    return (new ImageData(
      (new Uint8ClampedArray(imageDataArray.data)),
      imageDataArray.width,
      imageDataArray.height
    ));
  },

  /**
   * ImageData to PixelPanels
   * 
   * @param  {ImageData} imageData
   * 
   * @return {PixelPanels}
   */
  imageDataToPixelPanels: function(imageData) {
    var i = 0,
      j = 0,
      pixelPanels = Factory.transparentPixelPanels(imageData.width, imageData.height);

    for (i = 0; i < imageData.width; i++) {
      for (j = 0; j < imageData.height; j++) {
        var startIndex = j * imageData.width * 4 + i * 4,
          pixel = new Pixel(
            imageData.data[startIndex + 0],
            imageData.data[startIndex + 1],
            imageData.data[startIndex + 2],
            imageData.data[startIndex + 3]
          );

        pixelPanels[i][j] = pixel;
      }
    }

    return pixelPanels;
  },

  /**
   * PixelPanels to ImageData
   * 
   * @param  {PixelPanels} pixelPanels
   * 
   * @return {ImageData}
   */
  pixelPanelsToImageData: function(pixelPanels) {
    var width = pixelPanels.length,
      height = pixelPanels[0].length,
      data = new Uint8ClampedArray(width * height * 4),
      i = 0,
      j = 0;

    for (j = 0; j < height; j++) {
      for (i = 0; i < width; i++) {
        var startIndex = j * width * 4 + i * 4;

        data[startIndex + 0] = pixelPanels[i][j].red;
        data[startIndex + 1] = pixelPanels[i][j].green;
        data[startIndex + 2] = pixelPanels[i][j].blue;
        data[startIndex + 3] = pixelPanels[i][j].alpha;
      }
    }

    return (new ImageData(data, width, height));
  },
};

var Filter = {

  original: function(pixelPanels) {
    return pixelPanels;
  },

  /**
   * Grayscale
   * 
   * @param  {PixelPanels} pixelPanels
   * 
   * @return {PixelPanels}
   */
  grayscale: function(pixelPanels) {
    var width = pixelPanels.length,
      height = pixelPanels[0].length,
      result = Factory.transparentPixelPanels(width, height),
      i = 0,
      j = 0;

    for (j = 0; j < height; j++) {
      for (i = 0; i < width; i++ ) {
        var value = (0.21 * pixelPanels[i][j].red) +
          (0.71 * pixelPanels[i][j].green) +
          (0.08 * pixelPanels[i][j].blue);

        result[i][j] = new Pixel(value, value, value, pixelPanels[i][j].alpha);
      }
    }

    return result;
  },

  /**
   * Invert
   * 
   * @param  {PixelPanels} pixelPanels
   * 
   * @return {PixelPanels}
   */
  invert: function(pixelPanels) {
    var width = pixelPanels.length,
      height = pixelPanels[0].length,
      result = Factory.transparentPixelPanels(width, height),
      i = 0,
      j = 0;

    for (j = 0; j < height; j++) {
      for (i = 0; i < width; i++ ) {
        result[i][j] = new Pixel(
          255 - pixelPanels[i][j].red,
          255 - pixelPanels[i][j].green,
          255 - pixelPanels[i][j].blue,
          pixelPanels[i][j].alpha
        );
      }
    }

    return result;
  },

  /**
   * Rotate 180deg
   * TODO: optimize logic
   * 
   * @param  {PixelPanels} pixelPanels
   * 
   * @return {PixelPanels}
   */
  rotate: function(pixelPanels) {
    var width = pixelPanels.length,
      height = pixelPanels[0].length,
      result = Factory.transparentPixelPanels(width, height),
      i = 0,
      j = 0;

    for (j = 0; j < height; j++) {
      for (i = 0; i < width; i++ ) {
        var widthIndex =  width - i - 1,
          heightIndex = height - j - 1;

        result[i][j] = pixelPanels[widthIndex][heightIndex];
      }
    }

    return result;
  },

  /**
   * Threshold
   * TODO: optimize logic
   * 
   * @param  {PixelPanels} pixelPanels
   * @param  {number} thresholdValue number between 0 - 255
   * 
   * @return {PixelPanels}
   */
  threshold: function(pixelPanels, thresholdValue) {
    var width = pixelPanels.length,
      height = pixelPanels[0].length,
      result = Factory.transparentPixelPanels(width, height),
      i = 0,
      j = 0;

    pixelPanels = this.grayscale(pixelPanels);

    for (j = 0; j < height; j++) {
      for (i = 0; i < width; i++ ) {
        var value = (pixelPanels[i][j].red >= thresholdValue) ? 255 : 0;

        result[i][j] = new Pixel(value, value, value, pixelPanels[i][j].alpha);
      }
    }

    return result;
  },

  /**
   * Brightness
   *
   * @param  {PixelPanels} pixelPanels
   * @param  {number} brightnessValue number between 0 - 255
   * 
   * @return {PixelPanels}
   */
  brightness: function(pixelPanels, brightnessValue) {
    return this.add(pixelPanels, brightnessValue);
  },

  /**
   * Darkness
   * 
   * @param  {PixelPanels} pixelPanels
   * @param  {number} darknessValue number between 0 - 255
   * 
   * @return {PixelPanels}
   */
  darkness: function(pixelPanels, darknessValue) {
    return this.add(pixelPanels, -darknessValue);
  },

  /**
   * Add
   * 
   * @param  {PixelPanels} pixelPanels
   * @param  {number} darknessValue number between 0 - 255
   * 
   * @return {PixelPanels}
   */
  add: function(pixelPanels, value) {
    var width = pixelPanels.length,
      height = pixelPanels[0].length,
      result = Factory.transparentPixelPanels(width, height),
      i = 0,
      j = 0;

    for (j = 0; j < height; j++) {
      for (i = 0; i < width; i++ ) {
        var tmp = new Pixel(value, value, value, pixelPanels[i][j].alpha);

        result[i][j] = Util.addPixel(pixelPanels[i][j], tmp);
      }
    }

    return result;
  },

  /**
   * Flip
   * TODO: optimize logic
   * 
   * @param  {PixelPanels} pixelPanels
   * 
   * @return {PixelPanels}
   */
  flip: function(pixelPanels) {
    var width = pixelPanels.length,
      height = pixelPanels[0].length,
      result = Factory.transparentPixelPanels(width, height),
      i = 0,
      j = 0;

    for (j = 0; j < height; j++) {
      for (i = 0; i < width; i++ ) {
        var widthIndex = width - i - 1,
          heightIndex = j;

        result[i][j] = pixelPanels[widthIndex][heightIndex];
      }
    }

    return result;
  },

  /**
   * Filter3x3
   * TODO: fix the top and left border
   * 
   * @param  {PixelPanels} pixelPanels
   * @param  {Array.Array.number[3]} filter
   * 
   * @return {PixelPanels}
   */
  filter3x3: function(pixelPanels, filter) {
    var width = pixelPanels.length,
      height = pixelPanels[0].length,
      result = Factory.transparentPixelPanels(width, height),
      i = 0,
      j = 0;

    for (j = 1; j < height - 1; j++) {
      for (i = 1; i < width - 1; i++ ) {
        result[i][j] = Util.filter3x3Pixel(pixelPanels, filter, i, j);
      }
    }

    return result;
  },
  
  /**
   * Blur
   * 
   * @param  {PixelPanels} pixelPanels
   * 
   * @return {PixelPanels}
   */
  blur: function(pixelPanels) {
    return this.boxBlur(pixelPanels);
  },

  /**
   * Box blur
   * 
   * @param  {PixelPanels} pixelPanels
   * 
   * @return {PixelPanels}
   */
  boxBlur: function(pixelPanels) {
    var filter = [
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9]
    ];

    return this.filter3x3(pixelPanels, filter);
  },

  /**
   * Gaussian blur
   * 
   * @param  {PixelPanels} pixelPanels
   * 
   * @return {PixelPanels}
   */
  gaussianBlur: function(pixelPanels) {
    var filter = [
      [1 / 16, 2 / 16, 1 / 16],
      [2 / 16, 4 / 16, 2 / 16],
      [1 / 16, 2 / 16, 1 / 16]
    ];

    return this.filter3x3(pixelPanels, filter);
  },

  /**
   * Sharpen
   * 
   * @param  {PixelPanels} pixelPanels
   * 
   * @return {PixelPanels}
   */
  sharpen: function(pixelPanels) {
    var filter = [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0]
    ];

    return this.filter3x3(pixelPanels, filter);
  },
};

self.onmessage = function(e) {
  var pixelPanels = JSON.parse(e.data.pixelPanels),
    func = e.data.func,
    arg2 = JSON.parse(e.data.arg2) || null,
    arg3 = JSON.parse(e.data.arg3) || null,
    arg4 = JSON.parse(e.data.arg4) || null,
    arg5 = JSON.parse(e.data.arg5) || null,
    filteredPixelPanels = Filter[func](pixelPanels, arg2, arg3, arg4, arg5);
    msg = {
      'pixelPanels' : JSON.stringify(filteredPixelPanels),
      'func'        : func
    };

  self.postMessage(msg);
};

// trick for testing with mocha (in module pattern)
// http://stackoverflow.com/questions/14205631/how-do-i-test-a-basic-javascript-file-with-mocha
if (typeof module !== 'undefined' && module.exports != null) {
  exports.Pixel = Pixel;
  exports.ImageDataArray = ImageDataArray;
  exports.PixelPanels = PixelPanels;
  exports.Util = Util;
  exports.Convert = Convert;
  exports.Filter = Filter;
}
