(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3-random', ['exports'], factory) :
  factory((global.d3_random = {}));
}(this, function (exports) { 'use strict';

  function uniform(min, max) {
    var n = arguments.length;
    if (!n) min = 0, max = 1;
    else if (n === 1) max = +min, min = 0;
    else min = +min, max = +max - min;
    return function() {
      return Math.random() * max + min;
    };
  };

  function normal(mu, sigma) {
    var n = arguments.length;
    if (!n) mu = 0, sigma = 1;
    else if (n === 1) mu = +mu, sigma = 1;
    else mu = +mu, sigma = +sigma;
    return function() {
      var x, y, r;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);
      return mu + sigma * x * Math.sqrt(-2 * Math.log(r) / r);
    };
  };

  function logNormal() {
    var randomNormal = normal.apply(this, arguments);
    return function() {
      return Math.exp(randomNormal());
    };
  };

  function irwinHall(n) {
    return function() {
      for (var sum = 0, i = 0; i < n; ++i) sum += Math.random();
      return sum;
    };
  };

  function bates(n) {
    var randomIrwinHall = irwinHall(n);
    return function() {
      return randomIrwinHall() / n;
    };
  };

  var version = "0.0.4";

  exports.version = version;
  exports.uniform = uniform;
  exports.normal = normal;
  exports.logNormal = logNormal;
  exports.bates = bates;
  exports.irwinHall = irwinHall;

}));