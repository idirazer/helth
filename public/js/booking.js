 $(document).ready(function () {
  var s = $("#stickert");
  var pos = s.position();
  $(window).scroll(function () {
   var windowpos = $(window).scrollTop();
   console.log(windowpos);
   if (windowpos <= 870) {
    s.addClass("stick");
   } else {
    s.removeClass("stick");
   }
  });
 });