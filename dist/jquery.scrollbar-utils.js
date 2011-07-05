/*
* scrollUtils - jQuery mini framework for scrolling calculations
*
* Version: 0.0.1a
* Copyright 2011 Alex Tkachev
*
* Dual licensed under MIT or GPLv2 licenses
*   http://en.wikipedia.org/wiki/MIT_License
*   http://en.wikipedia.org/wiki/GNU_General_Public_License
*
* Date: Tue Jul 5 11:05:47 2011 +0300
*/

(function($) {

  $.scrollbarSize = {
    width: function() {
      var width = 0;

      return function() {
        var parent, child;
        if (width == 0) {
          parent = jQuery('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
          child = parent.children();
          width = child.innerWidth() - child.height(99).innerWidth();
          parent.remove();
        }
        return width;
      }
    }(),

    height: function() {
      var height = 0;

      return function() {
        var parent, child;
        if (height == 0) {
          parent = jQuery('<div style="width:200px;height:150px;overflow:hidden"><div style="width:100%;height:200px;"/></div>').appendTo('body');
          child = parent.children();
          var h1 = parent[0].offsetHeight;
          parent.css('overflow', 'scroll');
          var h2 = parent[0].offsetHeight;
          if (h1 == h2) h2 = parent[0].clientHeight;
          height = h1 - h2;
          parent.remove();
        }
        return height;
      }
    }()
  };

})(jQuery);
(function($) {

  var ViewportMethods = {
    hasHorizontalScrollBar: function() {
      if (!this[0]) return false;

      var scroller = this;
      if (scroller.css('overflow-x') == 'scroll') return true;
      else if (scroller.css('overflow-x') == 'hidden') return false;
      else return scroller.attr('scrollWidth') > scroller.width() - $.scrollbarSize.width();
    },

    hasVerticalScrollBar: function() {
      if (!this[0]) return false;

      var scroller = this;
      if (scroller.css('overflow-y') == 'scroll') return true;
      else if (scroller.css('overflow-y') == 'hidden') return false;
      else return scroller.attr('scrollHeight') > scroller.height() - $.scrollbarSize.height();
    },

    /**
     * Return width of this component without vertical scrollbar (if visible)
     */
    width: function() {
      var w = this.width();
      if (this.viewport('hasVerticalScrollBar')) w = w - $.scrollbarSize.width();
      return w;
    },

    /**
     * Return height of this component without horizontal scrollbar (if visible)
     */
    height: function() {
      var h = this.height();
      if (this.viewport('hasHorizontalScrollBar')) h = h - $.scrollbarSize.height();
      return h;
    },

    /**
     * Return true if given child is fully visible inside this element's viewport
     * @param child
     */
    isFullyVisible: function(child) {
      var itemTop = child.position().top;
      var itemBottom = itemTop + child.height();
      var itemLeft = child.position().left;
      var itemRight = itemLeft + child.width();
      return  itemTop >= 0 && itemBottom <= this.viewport('height') &&
              itemLeft >= 0 && itemRight <= this.viewport('width');
    },

    reveal: function(child) {
      if(!(child instanceof $)) child = $(child);

      var vp = {
        top: this.attr('scrollTop'),
        left: this.attr('scrollLeft')
      };
      vp.bottom = vp.top + this.viewport('height');
      vp.right = vp.left + this.viewport('width');

      var cp = child.position(); //position is returned relative to viewport top
      cp.top = cp.top + vp.top;
      cp.left = cp.left + vp.left;
      cp.bottom = cp.top + child.outerHeight();
      cp.right = cp.left + child.outerWidth();

      //y axis
      if (cp.top < vp.top) { //scroll up, the element is above viewport
        vp.top = vp.top - (vp.top - cp.top);
      } else if (cp.bottom > vp.bottom) { //scroll down, the element is below viewport
        vp.top = vp.top + (cp.bottom - vp.bottom);
      }

      //x axis
      if (cp.left < vp.left) { //scroll left, the element is to the left of viewport
        vp.left = vp.left - (vp.left - cp.left);
      } else if (cp.right > vp.right) { //scroll right, the element is to the right of viewport
        vp.left = vp.left + (cp.right - vp.right);
      }
      
      var maxScroll = this.viewport('maxScrollPositions');
      if (vp.left > maxScroll.left) vp.left = maxScroll.left;
      if (vp.top > maxScroll.top) vp.top = maxScroll.top;
      this.scrollTop = vp.top;
      this.scrollLeft = vp.left;
    },

    maxScrollPositions: function() {
      if (this.is('html,body')){
        var html = this[0].ownerDocument.documentElement;
        var body = this[0].ownerDocument.body;

        return {left: Math.max(html.scrollWidth, body.scrollWidth) - Math.min(html.clientWidth, body.clientWidth), top:  Math.max(html.scrollHeight, body.scrollHeight) - Math.min(html.clientHeight, body.clientHeight)};
      } else {
        return {left: this.scrollWidth - this.viewport('width'), top: this.scrollHeight - this.viewport('height')};
      }
    }
  };

  $.fn.viewport = function(method){
    // Method calling logic
    if ( ViewportMethods[method] ) {
      return ViewportMethods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if ( typeof method === 'object' || ! method ) {
      return ViewportMethods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.viewport' );
    }
  }

})(jQuery);