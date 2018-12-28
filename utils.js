/**
 * Global Utilities
 */

var Util = (function() {

  return {


    /**
     * Is doc ready?
     * A simple check for doc ready.
     * Obvs not fool proof.
     */
    isReady: function() {
      var state = document.readyState;
      if ( state === 'interactive' || state === 'complete') {
        return true;
      }
    },


    /**
     * ForEach Utility
     * Ensure we can loop over a object or nodelist
     * @see https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
     */
    forEach: function (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
      }
    },

    /**
     * A render utility
     * @param {mixed} - A template
     * @param {Node/Selector} - Where we render our template to
     * @example Util.render(someTemplate, renderToEl)
     */
    render: function (template, node) {
      if (!node) return;
      node.innerHTML = (typeof template === 'function' ? template() : template);
      var event = new CustomEvent('elementRenders', {
          bubbles: true
      });
      node.dispatchEvent(event);
      return node;
    },


    /**
     * Throttle Util
     * Stoopid simple throttle util to control scroll events and so on.
     *
     * @param  {Function}  Function call to throttle.
     * @param  {int}       milliseconds to throttle  method
     * @return {Function}  Returns a throttled function
     */
     throttle: function(fn, wait) {
       var time = Date.now();
       return function() {
         if ((time + wait - Date.now()) < 0) {
           fn();
           time = Date.now();
         }
       }
     },


    /**
     * Has Class
     * @param {html element} el to check against
     * @param {string} className - class name to check
     */
    hasClass: function(el, className) {
      if (el.classList.contains(className)){
        return true;
      }
    },


    /**
     * toggle/add/remove
     * @param {html element} el - the element
     */
    classList: function(el) {
      var list = el.classList;

      return {
          toggle: function(c) { list.toggle(c); return this; },
          add:    function(c) { list.add   (c); return this; },
          remove: function(c) { list.remove(c); return this; }
      };
    },

    /**
     * Get an Elements Width
     * @param {html element} el - the element
     */
    getWidth: function(el) {
      return el.innerWidth || el.clientWidth;
    },

    /**
     * Set an Elements Width
     * @param {html element} el - the element
     * @param {Integar} width - desired width
     */
    setWidth: function(el, width) {
      el.style.width = width + 'px';
    },


    /**
     * Animation detection util
     */
    whichAnimationEvent: function(){
      var t,
          el = document.createElement("fakeelement");

      var animations = {
        "animation"      : "animationend",
        "OAnimation"     : "oAnimationEnd",
        "MozAnimation"   : "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
      }

      for (t in animations){
        if (el.style[t] !== undefined){
          return animations[t];
        }
      }
    },

    /**
     * Get the value of a query string
     * @param  {String} field The field to get the value of
     * @param  {String} url   The URL to get the value from (optional)
     * @return {String}       The field value
     */
    getQueryString: function ( field, url ) {
    	var href = url ? url : window.location.href;
    	var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    	var string = reg.exec(href);
    	return string ? string[1] : null;
    },


    /**
     * JSONP Helper to load external data
     * @param {String} url
     * @param {function} callback
     * @param {Object} Invoked context in callback
     */
     loadJSONP: function(url, callback, context){

       var unique = 0;
       var name = "_jsonp_" + unique++;
       if (url.match(/\?/)) url += "&callback="+name;
       else url += "?callback="+name;

       // Create script
       var script = document.createElement('script');
       script.type = 'text/javascript';
       script.src = url;

       window[name] = function(data){
         callback.call((context || window), data);
         document.getElementsByTagName('head')[0].removeChild(script);
         script = null;
         delete window[name];
       };

       // Load JSON
       document.getElementsByTagName('head')[0].appendChild(script);

     },
   };
 })();
