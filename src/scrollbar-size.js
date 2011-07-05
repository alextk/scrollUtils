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
