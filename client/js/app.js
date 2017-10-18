import * as globals from "./globals";
import ".././css/main.scss";
import $ from "jquery";
import 'jquery-inview';
import 'jquery-match-height';
import * as skrollr from 'skrollr';

$(function(){

	$('.match').matchHeight();

	let callFunctionOnWidth = (callback, width) => {
		if(window.innerWidth < width) {
			callback();
		}
		window.onresize = () => {
			if(window.innerWidth < width) {
				callback();
			}
		}
	}
	// let fixMatchHeight = () => {
	// 	$('.match').matchHeight({byRow:false});
	// }
	// callFunctionOnWidth(fixMatchHeight, 768);

	
	if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

		var s = skrollr.init({
			forceHeight : false
		});
		$('#video').get(0).removeAttribute('controls');
		$('#video').hover(function toggleControls() {
			if (this.hasAttribute("controls")) {
				this.removeAttribute("controls")
			} else {
				this.setAttribute("controls", "controls")
			}
		});


		$('*[data-animation]').each(function(){
			$(this).css('opacity', 0);
			$(this).on('inview', function(event, isInView) {
				if (isInView) {
					$(this).delay($(this).attr('data-animation-delay')).queue(function(next){
						$(this).addClass('animated ' + $(this).attr('data-animation'));
						next();
					});
				}
			});
		});
	}


	$('.nav li').click(function() {
		let id = $(this).prop('id');
		$('html,body').animate({
			scrollTop: $(`.container-fluid#${id}`).offset().top
		}, 500);
	});


	$('.about-all-west .expand').click(function(e){
		e.preventDefault();

		if($('.about-all-west .collapse').hasClass('hidden')) {
		//Show
		$(this).find('span').html('Less');
		$('.about-all-west .collapse').removeClass('hidden');
		$('.about-all-west').addClass('expanded');
		$('.about-all-west .down').hide();
		$('.about-all-west .up').show();

	}
	else {
		//Hide
		$(this).find('span').html('More');
		$('.about-all-west').removeClass('expanded');
		$('.about-all-west .collapse').addClass('hidden');
		$('.about-all-west .up').hide();
		$('.about-all-west .down').show();
	}


});

	$('.contact .cta').click(function(e){
		e.preventDefault();
		$('.pop-out').fadeIn(500);
		$('.pop-out .map').fadeIn(500);
	});

	$('.workers .cta').click(function(e){
		e.preventDefault();
		$('.pop-out').fadeIn(500);
		$('.pop-out .video').fadeIn(500);
	});

	$('.pop-out .overlay').click(function(){
		$('.pop-out').fadeOut(500);
		$('.pop-out .video').fadeOut(500);
		$('.pop-out .map').fadeOut(500);


	});

	let video = $('#video').get(0)
	$('#playVid').click(function(){
		video.play();

	});

	video.addEventListener('playing', function(){
		$('#playVid').hide();
		$('#playVid').siblings('h2,h3, .btn').hide();
	});
	video.addEventListener('pause', function(){
		$('#playVid').fadeIn()
		$('#playVid').siblings('h2,h3, .btn').fadeIn();
	});




	//Form validation

	$('form .submit').click(function(e){
		e.preventDefault();
		let inputs = $('form').find('input, textarea').not('.submit');
		inputs.removeClass('error');

		//Make sure fields are not empty
		inputs.each(function(){
			if(!$(this).val()) $(this).addClass('error');
		});

		//Check email
		let exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let regex = new RegExp(exp);
		if(!regex.test($('form').find('input[type="email"]').val())) $('form').find('input[type="email"]').addClass('error');

		if($('form').find('.error').length > 1) return false;

		//Check recaptcha
		var response = grecaptcha.getResponse();
		if(response.length == 0) return false;

		//Deliver Payload
		let data = $('form').serialize();
		$.ajax({
			type: 'POST',
			url: $("form").attr("action"),
			data: data, 
			success: function(response) {
				$('form').hide();
				$('.message .success').fadeIn();
			},
			error: function(response) {
				$('form').hide();
				$('.message .oops').fadeIn();
			}

		});


	});

	$('form input, form textarea').change(function(){
		$(this).removeClass('error');
	});

});

