var options = {
	offset: 300
}

var header = new Headhesive('.header', options);

$(".recommend__item").magnificPopup({
	type : 'image',
	gallery : {
		enabled : true
	}
});


$('.js-button-campaign').click(function() { 
	
	$('.js-overlay-campaign').fadeIn();
	$('.js-overlay-campaign').addClass('disabled');
});

// закрыть на крестик
$('.js-close-campaign').click(function() { 
	$('.js-overlay-campaign').fadeOut();
	
});

// закрыть по клику вне окна
$(document).mouseup(function (e) { 
	var popup = $('.js-popup-campaign');
	if (e.target!=popup[0]&&popup.has(e.target).length === 0){
		$('.js-overlay-campaign').fadeOut();
		
	}
});

$('.menu-icon').click(function () {
	$('.menu').toggleClass("active");
	$('.menu-icon').toggleClass("active-icon");
})