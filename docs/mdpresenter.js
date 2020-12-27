$(document).ready(function(){

  var bodyHtml = $("body").html();
  var divs = "<div class='psections'>";
  bodyHtml.split('<hr>').forEach(function(elem){
    divs = divs + '<div class="psection">' + elem + '</div>';
  });
  $("body").html(divs);
  $(".psection").last().append('<p><i>end of document</i></p>')

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
        targetImg.height = windowHeight * 0.85;
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

  // window.addEventListener("resize", function(){
  //   location.reload();
  // });

  var allText = $("p:not(blockquote *, dl *, dd *, li *), dt, li:not(table *, :has(ul), :has(ol)), a:not(:has(img)), h1, h2, h3, h4, h5, h6, blockquote, pre, dt, div.line-block, span.quiz");

  var topMargin = 50;
  var bottomMargin = 50;
  var duration = 0;
  var quiz_all_answered = false;

  function moveCursor(current, direction = "top"){

    allText.removeClass("current");
    $(".parental").removeClass("parental");
    var currentText = $(allText[current]);
    currentText.addClass("current");

    startOfSection = false;
    var parent = currentText.parents('.psection').first();
    if(parent.children().first().hasClass("current")){
      startOfSection = true;
    }

    if(["SPAN", "A"].includes(currentText.prop("tagName"))){
      currentText.parent().addClass("parental")
    } else if(["DT"].includes(currentText.prop("tagName"))){
      currentText.next().children().addClass("parental")
    }

    if(quiz_all_answered){
      setToMiddle(currentText, duration);
    }else{
      if(startOfSection && direction === "down"){
        $(".psection").hide();
        parent.show();
        setToTop(currentText, duration);
      } else if(direction === "top"){
        $(".psection").hide();
        parent.show();
        setToBottom(currentText, duration);
      } else if(current >= 0 && currentText.isOnScreen() == false) {
        if(direction === "down"){
          setToBottom(currentText, duration);
        } else if(direction === "top") {
          setToTop(currentText, duration);
        }
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

  toHome();

  $(window).keydown(function(e){
    var kc = e.keyCode;
    // J or DOWN or RIGHT or SPACE
    if(kc === 74 || kc === 40 || kc ===39 || kc === 32){
      goDown();
      e.preventDefault();
    // K or UP or LEFT
    } else if(kc === 75 || kc === 38 || kc == 37){
      goUp();
      e.preventDefault();
    // END
    } else if(kc === 35){
      toEnd();
      e.preventDefault();
    // HOME
    } else if(kc === 36){
      toHome();
      e.preventDefault();
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
    // ESC
    } else if(kc === 27){
      var currentText = $(allText[currentNum]);
      if(quiz_all_answered){
        $("span.answer").toggleClass("answer").toggleClass("quiz");
        $("li, pre, blockquote, p, dt, h1, h2, h3, h4, h5, h6, div.line-block").removeClass("printing")
        quiz_all_answered = false;
        $(".psection").hide();
        var parent = currentText.parents('.psection').first();
        parent.show();
      } else {
        $("span.quiz").toggleClass("quiz").toggleClass("answer");
        $("li, pre, blockquote, p, dt, h1, h2, h3, h4, h5, h6, div.line-block").addClass("printing");
        quiz_all_answered = true;
        $(".psection").show();
        setToMiddle(currentText, duration);
      }
      setToTop();
      e.preventDefault();
    }
  });

  var bottom_padding = ($(window).height() - $(allText[-1]).height()) / 2;
  $("body").css("margin-bottom", parseInt(bottom_padding) + "px");
  $(".psection").hide();
  $(".psection").first().show();
  $("hr").hide();

  var wheelActionLoading = false;
  $(window).on('wheel', function(e) {
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
  });
});
