'use strict';

export function AnchorSmoothScroll($window, $log, $timeout) {
  'ngInject';
    var currentYPosition, elmYPosition, smoothScroll;
    currentYPosition = function() {
      if ($window.pageYOffset) {
        return $window.pageYOffset;
      }
      if ($window.document.documentElement && $window.document.documentElement.scrollTop) {
        return $window.document.documentElement.scrollTop;
      }
      if ($window.document.body.scrollTop) {
        return $window.document.body.scrollTop;
      }
      return 0;
    };
    /*
        Get the vertical position of a DOM element
        @param eID The DOM element id
        @returns The vertical position of element with id eID
    */

    elmYPosition = function(eID) {
      var elm, node, y;
      elm = document.getElementById(eID);
      if (elm) {
        y = elm.offsetTop;
        node = elm;
        while (node.offsetParent && node.offsetParent !== document.body) {
          node = node.offsetParent;
          y += node.offsetTop;
        }
        return y;
      }
      return 0;
    };
    /*
        Smooth scroll to element with a specific ID without offset
        @param eID The element id to scroll to
        @param offSet Scrolling offset
    */

    return {
      smoothScroll: function(eID) {
      var distance, i, leapY, speed, startY, step, stopY, timer, _results;
      startY = currentYPosition();
      stopY = elmYPosition(eID);
      distance = (stopY > startY ? stopY - startY : startY - stopY);
      if (distance < 100) {
        scrollTo(0, stopY);
        return;
      }
      speed = Math.round(distance / 100);
      if (speed >= 20) {
        speed = 20;
      }
      step = Math.round(distance / 25);
      leapY = (stopY > startY ? startY + step : startY - step);
      timer = 0;
      if (stopY > startY) {
        i = startY;
        while (i < stopY) {
          setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
          leapY += step;
          if (leapY > stopY) {
            leapY = stopY;
          }
          timer++;
          i += step;
        }
        return;
      }
      i = startY;
      _results = [];
      while (i > stopY) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY -= step;
        if (leapY < stopY) {
          leapY = stopY;
        }
        timer++;
        _results.push(i -= step);
      }
      return _results;
    },
  }
    
  }