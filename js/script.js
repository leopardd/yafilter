/*================================================================ Model
 */

/**
 * Pixel
 * value of all parameters is between 0-255
 * 
 * @param {number} [r=0]
 * @param {number} [g=0]
 * @param {number} [b=0]
 * @param {number} [a=1]
 *
 * @return {Pixel}
 */
var Pixel = function(r, g, b, a) {
  if (typeof r === 'undefined') r = 0;
  if (typeof g === 'undefined') g = 0;
  if (typeof b === 'undefined') b = 0;
  if (typeof a === 'undefined') a = 1;

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
 * @param {Uint8ClampedArray} data
 * @param {number} width
 * @param {number} height
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
 * @return {Array.Array.Pixel}
 */
var PixelPanels = function(width, height) {
  return Util.create2DArrayWithDefault(width, height, new Pixel());
};

/*================================================================ Static
 */

var Util = {

  /**
   * Creature 2D array
   * 
   * @see http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
   * 
   * @param  {number} length
   * 
   * @return {Array.Array}
   */
  create2DArray: function(length) {
    var arr = new Array(length || 0),
    i = length;

    if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);

      while(i--) {
        arr[length-1 - i] = this.create2DArray.apply(this, args);
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
  create2DArrayWithDefault: function(rows, cols, defaultValue) {
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
      pixelPanels = new PixelPanels(imageData.width, imageData.height);

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
      result = new PixelPanels(width, height),
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
      result = new PixelPanels(width, height),
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
      result = new PixelPanels(width, height),
      i = 0,
      j = 0;

    for (j = 0; j < height; j++) {
      for (i = 0; i < width; i++ ) {
        result[i][j] = new Pixel(
          pixelPanels[width - i - 1][height - j - 1].red,
          pixelPanels[width - i - 1][height - j - 1].green,
          pixelPanels[width - i - 1][height - j - 1].blue,
          pixelPanels[width - i - 1][height - j - 1].alpha
        );
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
      result = new PixelPanels(width, height),
      i = 0,
      j = 0;

    pixelPanels = this.grayscale(pixelPanels);

    for (j = 0; j < height; j++) {
      for (i = 0; i < width; i++ ) {
        var value = (pixelPanels[i][j].red >= thresholdValue) ? 255 : 0;
        result[i][j] = new Pixel(value, value, value, 255);
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
      result = new PixelPanels(width, height),
      i = 0,
      j = 0;

    for (j = 0; j < height; j++) {
      for (i = 0; i < width; i++ ) {
        result[i][j] = new Pixel(
          pixelPanels[i][j].red + value,
          pixelPanels[i][j].green + value,
          pixelPanels[i][j].blue + value,
          pixelPanels[i][j].alpha
        );
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
      result = new PixelPanels(width, height),
      i = 0,
      j = 0;

    for (j = 0; j < height; j++) {
      for (i = 0; i < width; i++ ) {
        result[i][j] = new Pixel(
          pixelPanels[width - i - 1][j].red,
          pixelPanels[width - i - 1][j].green,
          pixelPanels[width - i - 1][j].blue,
          pixelPanels[width - i - 1][j].alpha
        );
      }
    }

    return result;
  },

  /**
   * Filter3x3Pixel
   * used by "this.filter3x3" only
   * TODO: optimize logic
   * 
   * @param {PixelPanels} pixelPanels
   * @param {Array.Array.number[3]} filter
   * @param {number} i index of width
   * @param {number} j index of height
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

    return (new Pixel(
      Math.round(red),
      Math.round(green),
      Math.round(blue),
      Math.round(alpha)
    ));
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
      result = new PixelPanels(width, height),
      i = 0,
      j = 0;

    for (j = 1; j < height - 1; j++) {
      for (i = 1; i < width - 1; i++ ) {
        result[i][j] = this.filter3x3Pixel(pixelPanels, filter, i, j);;
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
    arg1 = e.data.arg1 || null,
    arg2 = e.data.arg2 || null,
    filteredPixelPanels = Filter[func](pixelPanels, arg1, arg2);
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
