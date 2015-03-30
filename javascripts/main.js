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

var preload = new createjs.LoadQueue();
preload.addEventListener("fileload", handleFileComplete);
preload.loadFile('http://darul75.github.io/site1/images/berlin-home.jpg');
preload.loadFile('http://darul75.github.io/site1/images/berlin-6.jpg');
function handleFileComplete(event) {
  $( window ).trigger( 'post-resize-anim' );
}

$(document).ready(function() {  

  $('.header_menu ul li').on( 'click', 'a', 
    function(){
      scrollToSection( $( this ).attr( 'href' ).substr( 1 ) );
  });

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
