/* global CalcCoeffs, define */
/*jslint bitwise: true */
(function (window) {
  'use strict';

  var getCoeffs = new CalcCoeffs();
  var table = {
    bessel: {
      q: [
        [0.57735026919],
        [0.805538281842, 0.521934581669],
        [1.02331395383, 0.611194546878, 0.510317824749]
      ],
      f: [
        [1.27201964951],
        [1.60335751622, 1.43017155999],
        [1.9047076123, 1.68916826762, 1.60391912877]
      ]
    },
    butterworth: {
      q: [
        [0.7071067811865475],
        [0.54, 1.31],
        [0.52, 0.7071067811865475, 1.93]
      ],
      f: [
        [1],
        [1, 1],
        [1, 1, 1]
      ]
    }
  };

  var CalcCascades = function () {
    var cnt = 0;
    var self = {
      getCoefficients: function (params) {
        var filter = [];
        if (params.order > 3) {
          params.order = 3;
        }
        for (cnt = 0; cnt < params.order; cnt++) {
          filter.push(getCoeffs[params.behavior]({
            Fs: params.Fs,
            Fc: params.Fc * table[params.characteristic].f[params.order - 1][cnt],
            Q: table[params.characteristic].q[params.order - 1][cnt]
          }));
        }
        return filter;
      }
    };
    return self;
  };
  if (typeof module === 'object' && module && typeof module.exports === 'object') {
    module.exports = CalcCascades;
  } else {
    window.CalcCascades = CalcCascades;
    if (typeof define === 'function' && define.amd) {
      define(CalcCascades);
    }
  }
})(window);