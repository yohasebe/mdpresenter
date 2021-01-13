$(window).on("load", function(){

  var bodyHtml = $("body").html();
  var divs = "<div class='psections'>";
  var numPages = 0
  bodyHtml.split('<hr>').forEach(function(elem, i){
    if(elem == null || elem.trim()== ''){
      return;
    } else {
      divs = divs + '<div class="psection" id="ps' + i + '">' + elem + '<hr /></div>';
      numPages = numPages + 1;
    }
  });
  divs = divs + "</div>";
  $("body").html(divs);
  $(".psections").append('<div class="psection" id="ps' + numPages+ '"><p><i>End of Document</i></p></div>')

  $("table").each(function(){
    $(this).wrap("<p><p>");
    $(this).wrap("<div class='table'><div>");
  });

  $("img").each(function(){
    var original = $(this).attr("src");
    if($(this).parent().prop("tagName") == "FIGURE"){
      $(this).parent().wrap("<p></p>")
    } else {
      $(this).wrap("<figure></figure>");
      $(this).after("<figcaption></figcaption>");
    }
    $(this).attr("height", "200px");
    var result = original.match(/.*youtube\.com\/watch\?v=(.+)/);
    if(result){
      $(this).attr("src", "https://img.youtube.com/vi/" + result[1] + "/hqdefault.jpg");
      $(this).addClass("youtube");
      $(this).wrap("<a href='" + original + "'></a>");
      $(this).attr("height", "200px");
    }
  });

  $("p, dt, li, h1, h2, h3, h4, h5, h6, div.line-block").each(function(){
    var text = $(this).html();
  });

  $("span.quiz").on("click", function(){
    $(this).toggleClass("quiz").toggleClass("answer");
    return false;
  });

  $("span.answer").on("click", function(){
    $(this).toggleClass("quiz").toggleClass("answer");
    return false;
  });

  $("a").on("click", function(){
    window.open($(this).attr("href"), 'link window', 'width=800, height=1000');
    return false;
  });

  var orgWidth;
  var orgHeight;
  var orgPaddingTop;
  var orgPaddingBottom;
  var ifCurrent;
  var ifSelected;

  $("figure img").not(".youtube").on("click", function(){
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var targetImg = $(this)[0];

    var figure = $(this).parent();

    if(figure.attr("large") !== "true"){
      orgWidth  = targetImg.width;
      orgHeight = targetImg.height;
      targetImg.width = windowWidth * 0.75;
      targetImg.height = orgHeight * (targetImg.width / orgWidth);

      if(targetImg.height > windowHeight){
        targetImg.height = windowHeight * 0.75;
        targetImg.width = orgWidth * (targetImg.height / orgHeight);
      }

      orgPaddingTop = figure.css("padding-top");
      orgPaddingBottom = figure.css("padding-bottom");

      var padding = parseInt((windowHeight - figure.height()) / 2) + "px"

      ifCurrent = figure.parent().hasClass("current");
      figure.parent().removeClass("current").addClass("parental");
      ifSelected = figure.parent().hasClass("selected");
      figure.parent().removeClass("selected");

      figure.attr("large", "true");
      figure.css("padding-top", padding).css("padding-bottom", padding);

      $("body, html").animate({
        scrollTop: figure.position().top
      }, 0);
      return false;

    } else {
      targetImg.width = orgWidth;
      targetImg.height = orgHeight;

      figure.css("padding-top", orgPaddingTop).css("padding-bottom", orgPaddingBottom);

      if(ifCurrent){
        figure.parent().addClass("current").removeClass("parental");
        ifCurrent = false;
      }
      if(ifSelected){
        figure.parent().addClass("selected");
        ifSelected = false;
      }

      figure.attr("large", "false");
      setToMiddle(figure.parent(), 0);
    }
  });

  var allText = $("p:not(blockquote *, dl *, dd *, li *), dt, li:not(table *, :has(ul), :has(ol)), a:not(:has(img)), h1, h2, h3, h4, h5, h6, blockquote, pre, div.line-block, span.quiz");
  allText.addClass("elem");

  var topMargin = 50;
  var bottomMargin = 50;
  var duration = 0;
  var in_page_mode = true

  var last_parent = "";

  function moveCursor(current = 0, direction = "top"){
    allText.removeClass("current");
    $(".parental").removeClass("parental");
    var currentText = $(allText[current]);
    currentText.addClass("current");
    $(".selected").removeClass("selected");
    currentText.addClass("selected");

    startOfSection = false;
    var parent = currentText.closest('.psection');
    if (!last_parent){
      startOfSection = true;
      last_parent = parent.attr("id");
    } else if (parent.attr("id") !== last_parent){
      startOfSection = true;
      last_parent = parent.attr("id");
    }

    if(["SPAN", "A"].includes(currentText.prop("tagName"))){
      currentText.parent().addClass("parental")
    } else if(["DT"].includes(currentText.prop("tagName"))){
      currentText.next().children().addClass("parental")
    }

    if(!in_page_mode && startOfSection && direction === "down"){
      $(".psection").hide();
      parent.fadeIn(500);
      setToTop(currentText, duration);
    } else if(!in_page_mode && direction === "top"){
      $(".psection").hide();
      parent.show();
      setToBottom(currentText, duration);
    } else if(current >= 0) {
      if(direction === "down" && currentText.isOnScreen() == false) {
        if(["DT"].includes(currentText.prop("tagName"))){
          currentText = currentText.next();
        }
        setToBottom(currentText, duration);
      } else if(direction === "top" && currentText.isOnScreen() == false) {
        setToTop(currentText, duration);
      }
    }
  }

  $("p:not(blockquote *, dl *, dd *, li *), dt, li:not(table *), a:not(:has(img)), h1, h2, h3, h4, h5, h6, blockquote, pre, div.line-block").on("click", function(){
    $(".selected").removeClass("selected");
    currentNum = allText.index($(this));
    moveCursor(currentNum, "nothing");
  });

  function setToTop(currentText, duration){
    $("body, html").animate({
      scrollTop: currentText.position().top - topMargin
    }, duration);
  };

  function setToMiddle(currentText, duration){
    $("body, html").animate({
      scrollTop: currentText.position().top - (($(window).height() - currentText.outerHeight()) / 2) + topMargin
    }, duration);
  };

  function setToBottom(currentText, duration){
    $("body, html").animate({
      scrollTop: currentText.position().top - $(window).height() + currentText.height() + bottomMargin
    }, duration);
  };

  $.fn.isOnScreen = function(){
    var win = $(window);
    var viewport = {
      top : win.scrollTop(),
      left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    var bounds = this.offset();
    try {
      bounds.right = bounds.left + this.outerWidth();
      bounds.bottom = bounds.top + this.outerHeight();
      var height = bounds.bottom - bounds.top;
      var width = bounds.right - bounds.left;
    } catch(e) {
      return false;
    }
    return (!(viewport.right < bounds.left + width || viewport.left > bounds.right - width || viewport.bottom - bottomMargin < bounds.top + height || viewport.top > bounds.bottom - height));
  };

  var currentNum = 0;

  function toHome(){
    currentNum = 0;
    $(".current").removeClass("current");
    $(".selected").removeClass("selected");
    moveCursor(currentNum);
    $(allText[currentNum]).addClass("current").addClass("selected");
  }

  function toEnd(){
    currentNum = allText.length - 1
    $(".current").removeClass("current");
    $(".selected").removeClass("selected");
    moveCursor(currentNum);
    $(allText[currentNum]).addClass("current").addClass("selected");
  }

  function goDown(){
    currentNum = currentNum + 1;
    if(currentNum < allText.length) {
      allText.removeClass("selected");
      moveCursor(currentNum, "down");
      return false;
    } else {
      currentNum = currentNum - 1;
    }
  }

  function goUp(){
    currentNum = currentNum - 1;
    if(currentNum >= 0) {
      allText.removeClass("selected");
      moveCursor(currentNum);
      return false;
    } else {
      currentNum = currentNum + 1;
    }
  }

  function goNextPage(){
    var pageNum = 0;
    if(last_parent){
      pageNum = parseInt(last_parent.substr(2));
    }
    var nextPageNum = pageNum + 1;
    console.log(nextPageNum);
    var nextPage = $("#ps" + nextPageNum);
    if(!$(nextPage) || nextPageNum >= $(".psection").length){
      return;
    }
    // var currentText = nextPage.children().first(".elem");
    var currentText = nextPage.find('.elem:first')
    currentNum = allText.index(currentText);
    moveCursor(currentNum);
  }

  function goPrevPage(){
    var pageNum = 0;
    if(last_parent){
      pageNum = parseInt(last_parent.substr(2));
    }
    var nextPageNum = pageNum - 1;
    var nextPage = $("#ps" + nextPageNum);
    if(!nextPage || nextPageNum < 0){
      return;
    }
    // var currentText = nextPage.children().first(".elem");
    var currentText = nextPage.find('.elem:first')
    currentNum = allText.index(currentText);
    moveCursor(currentNum);
  }

  $(window).keydown(function(e){
    var kc = e.keyCode;
    // ESC
    if(kc === 27){
      var currentText = $(allText[currentNum]);
      if(in_page_mode){
        $("span.answer").toggleClass("answer").toggleClass("quiz");
        $("li, pre, blockquote, p, dt, h1, h2, h3, h4, h5, h6, div.line-block").removeClass("printing")
        in_page_mode = false;
        $(".psection").hide();
        var parent = currentText.parents('.psection').first();
        parent.show();
        $("hr").hide();
      } else {
        $("span.quiz").toggleClass("quiz").toggleClass("answer");
        $("li, pre, blockquote, p, dt, h1, h2, h3, h4, h5, h6, div.line-block").addClass("printing");
        in_page_mode = true;
        $(".psection").show();
        setToMiddle(currentText, duration);
        $("hr").show();
      }
      e.preventDefault();
      e.stopPropagation()
      return;
    // J or DOWN or RIGHT or SPACE
    } else if(kc === 74 || kc === 40 || kc ===39 || kc === 32){
      goDown();
      e.preventDefault();
      e.stopPropagation()
      return;
    // K or UP or LEFT
    } else if(kc === 75 || kc === 38 || kc == 37){
      goUp();
      e.preventDefault();
      e.stopPropagation()
      return;
    // N or PageDown
    } else if(kc === 78 || kc == 34){
      goNextPage();
      e.preventDefault();
      e.stopPropagation()
      return;
    // P or PageUp
    } else if(kc === 80 || kc == 33){
      goPrevPage();
      e.preventDefault();
      e.stopPropagation()
      return;
    // END
    } else if(kc === 35){
      toEnd();
      e.preventDefault();
      e.stopPropagation()
      return;
    // HOME
    } else if(kc === 36){
      toHome();
      e.preventDefault();
      e.stopPropagation()
      return;
    // DOT(.) or ENTER
    } else if(kc === 190 || kc === 13){
      var currentText = $(allText[currentNum]);
      var non_clickable = $(allText[currentNum]).filter(":not(:has(figure))")
                                            .filter(":not('.quiz, .answer')")
                                            .filter(":not('a')")
                                            .toggleClass("selected");
      if(non_clickable.length){
        ;
      } else {
        var clickable = currentText.filter("p, a, span.quiz, span.answer").first();
        if(clickable.prop("tagName") === "SPAN"){
          clickable.click();
        } else if(clickable.prop("tagName") === "A"){
          window.open(clickable.attr("href"), 'link window', 'width=800, height=1000');
          return false;
        }else{
          var fig = clickable.find("figure img");
          if(fig){
            clickable.find("figure img").click();
          }
        }
      }
      e.preventDefault();
      e.stopPropagation()
      return;
    }
  });

  var wheelActionLoading = false;
  $(window).on('wheel', function(e) {
    if(!in_page_mode){
      const isScrollingDown = Math.sign(e.wheelDeltaY);
      if(!wheelActionLoading){
        wheelActionLoading = true;
        var delta = e.originalEvent.deltaY;
        if (delta > 0) {
          goDown();
        } else {
          goUp();
        }
        wheelActionLoading = false;
      }
      e.preventDefault();
      e.stopPropagation()
    }
  });

  // code to enable drag scroll
  var clicked = false, clickY;
  $(document).on({
    'mousemove': function(e) {
      clicked && updateScrollPos(e);
    },
    'mousedown': function(e) {
      clicked = true;
      clickY = e.pageY;
    },
    'mouseup': function() {
      clicked = false;
      $('html').css('cursor', 'auto');
    }
  });

  var updateScrollPos = function(e) {
    $('html').css('cursor', 'move');
    $(window).scrollTop($(window).scrollTop() + (clickY - e.pageY));
  }

  toHome();
});



