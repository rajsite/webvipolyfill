(function () {
    'use strict';

    // Pattern from roll-up https://github.com/rollup/rollup-plugin-commonjs/blob/v8.3.0/src/helpers.js#L4
    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    // Returns a constructor functon named Blob intended to hack around the lack of a Blob API in node.js
    var Blob = function (config) {
        if (Array.isArray(config) === false || config[0] instanceof Uint8Array === false) {
            throw new Error('BlobHackPassthrough should only be used to intercept simple TypedArray Blob requests');
        }
        return config[0];
    };

    beforeAll(function () {
        if (typeof commonjsGlobal.XMLHttpRequest === 'undefined') {
            // The node.js environment
            commonjsGlobal.XMLHttpRequest = require('xhr2');
            commonjsGlobal.Blob = Blob;
            commonjsGlobal.TextEncoder = require('util').TextEncoder;
            commonjsGlobal.TextDecoder = require('util').TextDecoder;
            require('../../dist/webvipolyfill.concat.js');
            require('../../webvipolyfills/webvipolyfill_writetosystemlog.js');
            commonjsGlobal.Vireo = require('vireo');
            commonjsGlobal.rebootAndLoadVia = require('../support/rebootAndLoadVia.js');
        } else {
            // webvipolyflll should ready be loaded to window.webvipolyfill
            commonjsGlobal.Vireo = window.NationalInstruments.Vireo.Vireo;
            // rebootAndLoadVia should already be loaded to window.rebootAndLoadVia
        }

    });
}());
