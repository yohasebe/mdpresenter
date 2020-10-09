$(document).ready(function(){
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
    $(this).html(text.replace(/\{([^\{\}]+?)\}/g, "<span class='quiz'>$1</span>"));
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
        targetImg.height = windowHeight * 0.85; 
        targetImg.width = orgWidth * (targetImg.height / orgHeight);
      }

      orgPaddingTop = figure.css("padding-top");
      orgPaddingBottom = figure.css("padding-bottom");

      var padding = parseInt((windowHeight - figure.height()) / 2) + "px"
      ifCurrent = figure.parent().hasClass("current");
      figure.parent().removeClass("current");
      figure.attr("large", "true");
      figure.css("padding-top", padding).css("padding-bottom", padding);

      $("body, html").animate({
        scrollTop: figure.position().top
      }, 400);
      return false;

    } else {
      targetImg.width = orgWidth; 
      targetImg.height = orgHeight; 

      figure.css("padding-top", orgPaddingTop).css("padding-bottom", orgPaddingBottom);
      if(ifCurrent){
        figure.parent().addClass("current");
        ifCurrent = false;
      }
      figure.attr("large", "false");
      setToMiddle(figure.parent(), 0);
    }
  });

  // window.addEventListener("resize", function(){
  //   location.reload();
  // }); 

  var allText = $("p:not(li *), dt, li:not(table *), a:not(:has(img)), h1, h2, h3, h4, h5, h6, div.line-block, span.quiz");

  var topMargin = 40;
  var bottomMargin = 40;
  var duration = 50;

  function selectText(current, direction = "top"){

    allText.removeClass("current");
    var currentText = $(allText[current]);
    currentText.addClass("current");

    if(current >= 0 && currentText.isOnScreen() == false){
      if(direction === "down"){
        setToBottom(currentText, duration);
      } else {
        setToTop(currentText, duration);
      }
    }
  }

  $("p, dt, li, h1, h2, h3, h4, h5, h6, div.line-block ").on("click", function(){
    currentNum = allText.index($(this));
    selectText(currentNum);
  });

  function setToTop(currentText, duration){
    $("body, html").animate({
      scrollTop: currentText.position().top - topMargin
    }, duration);
  };

  function setToMiddle(currentText, duration){
    $("body, html").animate({
      scrollTop: currentText.position().top - (($(window).height() - currentText.height()) / 2)
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
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    var height = bounds.bottom - bounds.top;
    var width = bounds.right - bounds.left;
    return (!(viewport.right < bounds.left + width || viewport.left > bounds.right - width || viewport.bottom - bottomMargin < bounds.top + height || viewport.top > bounds.bottom - height));
  };

  var currentNum = 0;
  selectText(currentNum);

  var quiz_all_answered = false;
  $(window).keydown(function(e){
    var kc = e.keyCode;
    // J or DOWN 
    if(kc === 74 || kc === 40){
      currentNum = currentNum + 1;
      if(currentNum < allText.length) {
        allText.removeClass("selected");
        selectText(currentNum, "down");
        return false;
      } else {
        currentNum = currentNum - 1;
      }
      // K or UP or LEFT
    } else if(kc === 75 || kc === 38 || kc == 37){
      currentNum = currentNum - 1;
      if(currentNum >= 0) {
        allText.removeClass("selected");
        selectText(currentNum);
        return false;
      } else {
        currentNum = currentNum + 1;
      }
      // END or PAGEDOWN
    } else if(kc === 35 || kc === 34){ 
      currentNum = allText.length - 1
      selectText(currentNum);
      // HOME or PAGEUP
    } else if(kc === 36 || kc === 33){ 
      currentNum = 0
      selectText(currentNum);
      // DOT(.) or ENTER
    } else if(kc === 190 || kc === 13){
      var non_image = $(allText[currentNum]).filter(":not(:has(figure))")
                                            .filter(":not('.quiz, .answer')")
                                            .filter(":not('a')")
                                            .toggleClass("selected");
      if(non_image.length){
        setToMiddle($(allText[currentNum]), 400);
      } else {
        $.each($(allText[currentNum]).find("img, a, span.quiz, span.answer").addBack("a, span.quiz, span.answer"), function(idx, val){
          if(val.tagName === "A"){
            window.open($(val).attr("href"), 'link window', 'width=800, height=1000');
            return false;
          } else {
            val.click();
          }
        });
      }
      // Q
    } else if(kc === 81){ 
      if(quiz_all_answered){
        $("span.answer").toggleClass("answer").toggleClass("quiz");
        quiz_all_answered = false;
      } else {
        $("span.quiz").toggleClass("quiz").toggleClass("answer");
        quiz_all_answered = true;
      }
      // SPACE or RIGHT
    } else if(kc === 32 || kc == 39){ 
      $("figure[large='true'] img").click();
      currentNum = currentNum + 1;
      if(currentNum < allText.length) {
        allText.removeClass("selected");
        selectText(currentNum, "down");
        var non_image = $(allText[currentNum]).filter(":not(:has(figure))").filter(":not('.quiz, .answer')").toggleClass("selected");
        if(non_image.length){
          setToMiddle($(allText[currentNum]), 400);
        } else {
          $.each($(allText[currentNum]).find("span.quiz, span.answer").addBack("span.quiz, span.answer"), function(idx, val){
            val.click();
          });
        }
      } else {
        currentNum = currentNum - 1;
      }
      return false;
    }
  });

  var bottom_padding = ($(window).height() - $(allText[-1]).height()) / 2;
  $("body").css("margin-bottom", parseInt(bottom_padding) + "px");
});
