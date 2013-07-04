if (typeof define === "function" ) {
    define(function(require, exports, module) {
      module.exports = jQuery;
    });
} else {
    window.jQuto = jQuery;
}