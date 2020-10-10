//jshint esversion:6
$(document).ready(function () {
	var sections      = $('section');
	var navbar        =	$('#nav');
	var navbarHeight  = navbar.height();

	var sectionOffset = [];

	sections.each(function() {
		var section = $(this);

        var positionn = section.offset().top - navbarHeight;
        var backgroundColor = section.attr("id");
				if(backgroundColor == nmbr1){
					backgroundColor = #009688;
				}else if (backgroundColor == nmbr2) {
					backgroundColor = #FFA000;
				}else{
					backgroundColor = #808080;
				}

        sectionOffset.push({'postion': positionn,'color': backgroundColor});

    });

	$(window).on('scroll', function(){
		var scrollPos = $(document).scrollTop();

		$.each(sectionOffset, function(index, section){
			if (scrollPos >= section.postion) {
				navbar.css("background-color", section.color);
			}
		})
	});

});
