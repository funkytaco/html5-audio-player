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
	audio = new Audio('media/' + song);

	if(!audio.currentTime) {
		$('#duration').html('0.00');
	}

	$('#audio-player .title').text(title);

	$('#audio-player .artist').text(artist);

	//Insert Cover

	$('img.cover').attr('src', 'img/covers/'+ cover);

	$('#playlist li').removeClass('active');
	element.addClass('active');

}
//Click Song Title to Play That Song



    $('#playlist li').click(function playsong(){
    var title = $(this).text();
    scrolled = $(this).position(); 
    console.log(scrolled);
    $('#audio-player .title').text(title);
	audio.pause();
	if(typeof audio !== "undefined" ) audio.src='media/' +
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
//Scrolls down each time next is clicked
var offset = $('#playlist li.active').position();
var scrolled = 0;
var playlistScrollHeight = document.getElementById("playlist").scrollHeight;
//Assigns active class and play/pause audio, etc
$("#next").on('click', function(){	
	scrolled += 50
	if (scrolled > 650){
		scrolled = 0;
	};
	console.log(scrolled)
	$("#playlistContainer").animate(
		{scrollTop: scrolled}
		)


});

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
//Scrolls up on each click
$("#prev").on('click', function(){		
	scrolled -= 50
	if (scrolled < 0){
		scrolled = 650;
	};
	console.log(scrolled)
	$("#playlistContainer").animate(
		{scrollTop: scrolled}
		)
});

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

