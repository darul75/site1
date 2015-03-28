$('#submitEmail').click(function(){
    $(window.location).attr('href', 'mailto:?subject='
                             + encodeURIComponent("This is my subject")
                             + "&body=" 
                             + encodeURIComponent("This is my body")
    );
});


function scrollB(section) {
  scrollToSection(section);
}

function notHome(section) {
  console.log(section);
}

$(document).ready(function() {  
  var cssSlide = 'slideOutLeft';
  var cssSlideBack = 'slideOutLeftBack';


  $('.arrow').click(function() {
    var hideArrow = $(this).hasClass('arrow-left');
    var parent = $(this).parent().parent().parent().parent();
    var slided = parent.data("slided") || false;

    if (!slided) {
      parent.addClass(cssSlide);
      parent.removeClass(cssSlideBack);
    }
    else {
      parent.removeClass(cssSlide);
      parent.addClass(cssSlideBack);
    }
    parent.data("slided", !slided)
    $(this).hide();
    $(this).siblings(hideArrow ? '.arrow-right' : '.arrow-left').show();
  });
});
//window.sr = new scrollReveal();

/*http://codepen.io/adi52i/pen/pxLou*/

/*$(document).ready(function(){
  nav = $("#menu li");
  // Set spotlight location to default
  item = nav.eq(0);

  // Checks whether a position is saves in localStorage from previoss pages
  if(localStorage.getItem('sItem') !== null){
    item = nav.eq(localStorage.getItem('sItem'));
  }
  
  // Create and position the spotlight
  $("#menu").append("<div id='highlight'></div>");
  $("#highlight").css('width', item.outerWidth()).offset({ top: item.offset().top, left: item.offset().left });
  $("#highlight").css('height', item.outerHeight());
});

// Move spotlight according to mouse position
$("#menu li").hover(function(){
  // Animate to new mouse location
  $("#highlight").stop().animate({
    "left" : $(this).offset().left,
    "width" : $(this).outerWidth()
  });
}, function(){
  // Return to the main position
  $("#highlight").stop().animate({
    "left" : item.offset().left,
    "width" : item.outerWidth()
  });
});*/

// Save new item location
/*$("#menu li").click(function(){
  localStorage.setItem("sItem", $(this).index());
  item = nav.eq($(this).index());
});*/
