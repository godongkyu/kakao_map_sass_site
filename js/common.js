$(function(){
  // let currentHref = $(location).attr("href").split("/");
  // currentHref = currentHref[currentHref.length-1].split(".")//마지막 index length로 가져오는 방법
  // currentHref = currentHref[0]
  // console.log(currentHref);
  //
  // $("#lnb ul li a").each(function(){
  //   let matchHref = $(this).attr("href").split("/");
  //   matchHref = matchHref[matchHref.length-1].split(".")
  //   matchHref = matchHref[0]
  //   console.log(matchHref);
  //   console.log(currentHref == matchHref);
  //   if ( currentHref == matchHref ) {
  //     $(this).addClass("on")
  //   }
  // });

  //lnb
  // 중복 리팩토링
  function splitLocation(el){
    let href = el.attr("href").split("/");
    href = href[href.length-1].split(".");
    href = href[0];
    return href; //값을 반환
  }
  let currentHref = splitLocation($(location)); //each 중복 방지

  $("#lnb ul li a").each(function(){
    if ( splitLocation($(this)) == currentHref ) {
      console.log(splitLocation($(this)));
      console.log(splitLocation($(location)));
      $(this).addClass("on")
    }
  });

// accordion
  $(".accordion dd:not(:first)").css({
    "display":"none",
    "height":0
  });

  $(".accordion dl dt").click(function(){
    let thisElem = $(this)
    if ( $("+dd",thisElem).css("display") == "none" ) {
      $(".accordion dd").each(function(){
         if ( $(this).css("display") === "block") {
          $(this).animate({height: 0},"slow",function(){
            $(this).css("display","none")
          });
        };
        console.log($(this).css("height"));
      });
      $("+dd",this).css("display","block").animate({height: 300})
    };
  });

  $(".mainbanner").click(function(){
    if ( $("#carousel").css("overflow") == "visible" ) {
      $("#carousel").css("overflow","hidden")
    }else{
      $("#carousel").css("overflow","")
    }
  })

  const widthNum = 155;
  const caInner = $("#carousel-inner");
  let liLeng = $("ul.column li",caInner).length

  $("#carousel-inner ul.column").css( "width", widthNum*liLeng );

  function initialFunc(init){
      caInner.css("margin-left", -widthNum)
      if (init === "prev") {
        $("ul.column li:last",caInner).prependTo("#carousel-inner ul.column");
      }else{
        $("ul.column li:first",caInner).appendTo("#carousel-inner ul.column");
      }
    }
    initialFunc("prev");

  function actionBtn(el){
    el.click(function(){
      let caInMarginLeft = parseInt(caInner.css("marginLeft"));
      let isAni = caInner.is(":animated");
      if ( !isAni ) {
        if (el.attr("id") === "carousel-prev") {
          caInner.animate({marginLeft: caInMarginLeft + widthNum},function(){
            initialFunc("prev");
          })
        }else{
          caInner.animate({marginLeft: caInMarginLeft - widthNum},function(){
            initialFunc("next");
          })
        }
      }
    })
  }

    $(".btn").each(function(){
      actionBtn($(this))
    });

  let timerID = '';
  let auto = function(){
    timerID = setInterval(function(){
      $("#carousel-next").trigger("click");
    },3000);
    return timerID
  }
  auto();

  $("#carousel-prev,#carousel-next,#carousel").on({
    mouseenter: function(){
      clearInterval(timerID);
    },
    mouseleave: function(){
      timerID = setInterval(function(){
        $("#carousel-next").trigger("click");
      },3000);
    }
    })
});
