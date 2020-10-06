<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<script>
$(document).ready(function(){


  $("table").each(function(){
    $(this).wrap("<p><p>");
    $(this).wrap("<div class='table'><div>");
  });

  $("img").each(function(){
    var original = $(this).attr("src");
    var result = original.match(/.*youtube\.com\/watch\?v=(.+)/);
    if(result){
      $(this).attr("src", "https://img.youtube.com/vi/" + result[1] + "/hqdefault.jpg");
      $(this).wrap("<div class='youtube'></div>");
      $(this).wrap("<a href='" + original + "'></a>");
      $(this).attr("height", "400px");
    } else {
      $(this).wrap("<div class='pic'></div>");
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

  var orgWidth;
  var orgHeight;
  var orgPaddingTop;
  var orgPaddingBottom;
  var ifCurrent;

  $("div.pic").on("click", function(){
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var targetImg = $(this).find("img")[0];

    if($(this).attr("large") !== "true"){

      orgWidth  = targetImg.width;
      orgHeight = targetImg.height;

      targetImg.width = windowWidth * 0.75;  
      targetImg.height = orgHeight * (targetImg.width / orgWidth); 

      if(targetImg.height > windowHeight){
        targetImg.height = windowHeight * 0.85; 
        targetImg.width = orgWidth * (targetImg.height / orgHeight);
      }

      orgPaddingTop = $(this).css("padding-top");
      orgPaddingBottom = $(this).css("padding-bottom");

      var padding = parseInt((windowHeight - targetImg.height) / 2) + "px"
      orgBorderColor = $(this).parent().css("border-left-color");
      ifCurrent = $(this).parent().hasClass("current");
      $(this).parent().removeClass("current");
      $(this).css("padding-top", padding).css("padding-bottom", padding);
      $(this).attr("large", "true");

      $("body, html").animate({
        scrollTop: $(this).position().top
      }, 400);
      return false;

    } else {
      targetImg.width = orgWidth; 
      targetImg.height = orgHeight; 
      $(this).css("padding-top", orgPaddingTop).css("padding-bottom", orgPaddingBottom);
      if(ifCurrent){
        $(this).parent().addClass("current");
        ifCurrent = false;
      }
      var mid = $(this).position().top - (windowHeight - orgHeight) / 2;
      $(this).attr("large", "false");
      $("body, html").animate({
        scrollTop: mid,
      }, 400);
    }
  });

  // window.addEventListener("resize", function(){
  //   location.reload();
  // }); 

  var allText = $("p:not(li *), dt, li:not(table *), h1, h2, h3, h4, h5, h6, div.line-block, span.quiz");

  var topMargin = 50;
  var bottomMargin = 100;

  function selectText(current, direction) {
    allText.removeClass("current");
    var currentText = $(allText[current]);
    currentText.addClass("current");

    if(current >= 0 && currentText.isOnScreen() == false){
      if(direction === "down"){
        setToBottom(currentText);
      } else {
        setToTop(currentText);
      }
    }
  }

  $("p, dt, li, h1, h2, h3, h4, h5, h6, div.line-block ").on("click", function(){
    currentNum = allText.index($(this));
    selectText(currentNum);
  });

  function setToTop(currentText){
    $("body, html").animate({
      scrollTop: currentText.position().top - topMargin
    }, 400);
  };

  function setToBottom(currentText){
    $("body, html").animate({
      scrollTop: currentText.position().top - $(window).height() + currentText.height() + bottomMargin
    }, 400);
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
    if(kc === 74 || kc == 40){          // J or DOWN
      currentNum = currentNum + 1;
      if(currentNum < allText.length) {
        selectText(currentNum, "down");
        return false;
      } else {
        currentNum = currentNum - 1;
      }
    } else if(kc === 75 || kc == 38){   // K or UP
      currentNum = currentNum - 1;
      if(currentNum >= 0) {
        selectText(currentNum);
        return false;
      } else {
        currentNum = currentNum + 1;
      }
    } else if(kc === 39){              // LEFT
      currentNum = allText.length - 1
      selectText(currentNum);
    } else if(kc === 37){              // RIGHT
      currentNum = 0
      selectText(currentNum);
    } else if(kc === 190){             // .
      $.each($(allText[currentNum]).find("img, a, span.quiz, span.answer").addBack("span.quiz, span.answer"), function(idx, val){
        console.log(val);
        if(val.tagName === "A"){
          window.open($(val).attr("href"), 'link window', 'width=800, height=1000');
          return false;
        } else {
          val.click();
        }
      });
    } else if(kc === 81){              // Q
      if(quiz_all_answered){
        $("span.answer").toggleClass("answer").toggleClass("quiz");
        quiz_all_answered = false;
      } else {
        $("span.quiz").toggleClass("quiz").toggleClass("answer");
        quiz_all_answered = true;
      }
    }
  });
});

</script>
