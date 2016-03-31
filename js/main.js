// Download Mixtape Popup

$('#downloadPopUp').hide();

$('#downloadMixtape').click(function(){
	$('#downloadPopUp').show();
});

$('#nevermind').click(function(){
	$('#downloadPopUp').hide();
});

$('#subscribe').click(function(){
	$('#downloadPopUp').hide();
});

var audio;

//hide pause button

$('#pause').hide();
$('#duration').hide();

//Initialize
initAudio($('#playlist li:first-child'));

//Initializer Function
function initAudio(element){
	var song=element.attr('song')
	var title=element.text();
	var cover=element.attr('cover');
	var artist=element.attr('artist');


	//Create AUDIO OBJECT
	audio = new Audio('http://localhost/beats/wp-content/themes/AG_1/html_5_audio_player/media/' + song);

	if(!audio.currentTime) {
		$('#duration').html('0.00');
	}

	$('#audio-player .title').text(title);

	$('#audio-player .artist').text(artist);

	//Insert Cover

	$('img.cover').attr('src', 'http://localhost/beats/wp-content/themes/AG_1/html_5_audio_player/img/covers/'+ cover);

	$('#playlist li').removeClass('active');
	element.addClass('active');

}
//Click Song Title to Play That Song



    $('#playlist li').click(function(){
	
	audio.pause();
	if(typeof audio !== "undefined" ) audio.src='http://localhost/beats/wp-content/themes/AG_1/html_5_audio_player/media/' +
	     $(this).attr('song'); 

	audio.play();

	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	showDuration();
	$('#playlist li').removeClass('active');
	$(this).addClass("active");

});

//Play button

$('#play').click(function(){
	audio.play();

	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	showDuration();
});

//Pause button

$('#pause').click(function(){
	audio.pause();

	$('#pause').hide();
	$('#play').show();
});

//Audio Stop Function

$('#stop').click(function(){
	audio.pause();
	audio.currentTime = 0;
	$('#pause').hide();
	$('#play').show();
	$('#duration').fadeOut(400);
});

//NEXT Buttomn 

$('#next').click(function(){
	audio.pause();
	var next = $('#playlist li.active').next();
	if(next.length == 0){
		next = $('#playlist li:first-child');
	}
	initAudio(next);
	audio.play();
	showDuration();
	$('#duration').fadeIn(400);
	if ($('#play').show = true){
		$('#play').hide();
		$('#pause').show();
	}
});

//PREV Buttomn 

$('#prev').click(function(){
	audio.pause();
	var prev = $('#playlist li.active').prev();
	if(prev.length == 0){
		prev = $('#playlist li:last-child');
	}
	initAudio(prev);
	audio.play();
	showDuration();
	$('#duration').fadeIn(400);
	if ($('#play').show = true){
		$('#play').hide();
		$('#pause').show();
	}
});

//Volume Control
$('#volume').change(function(){
	audio.volume = parseFloat(this.value / 10);
});
	


//Time duration

function showDuration(){
	$(audio).bind('timeupdate', function(){
		//Get Hours & Minutes
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime)/ 60) % 60;
		//Add 0 if less than 10
		if(s < 10){
			s = '0'+ s;
		}
		$('#duration').html(m + '.' + s);
		var value = 0;
		if(audio.currentTime > 0){
			value = Math.floor((100 / audio.duration)* audio.currentTime);
		}
		$('#progress').css('width', value+'%')
	});
}


