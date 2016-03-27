var fingerprint;
$(document).ready(function(){
	fingerprint = new Fingerprint().get();
	console.log(fingerprint);
	$.ajax({
		type:			"POST",
		url:			"http://norgematos.net/aranreport/loginpage.php",
		crossDomain:	true,
		data:			{device: fingerprint},
		success:		function(answer){
			$('#container').html(answer);
		},
		error:			function(){
			console.log('Not working!');
		}
	});
	

	$('#container').on('touchend click','.btn-login',function(){
		$.post('http://norgematos.net/aranreport/loginpage.php',{
			username:$('#username').val(),
			password:$('#password').val(),
			deviceid: fingerprint
		},function(answer){
			$('#container').html(answer);
		});
	});

	$('#container').on('touchend click','.punch',function(){
		console.log($('.punch').text());
		$.post('http://norgematos.net/aranreport/setPunch.php',{
			reportpunch:$('.punch').text(),
			reportplace: $('#reportplace').val(),
			deviceid: fingerprint
		},function(answer){
			$('#container').html(answer);
		});
	});

	$('.menu span').on('touchend click',function(){
		$.get('http://norgematos.net/aranreport/'+$(this).attr('id')+'.php',{
			deviceid: fingerprint
		},function(answer){
			$('#container').html(answer);
		});
	});

	$('#container').on('touchend click','#setPlace',function(){
		$.post('http://norgematos.net/aranreport/addPlace.php',{
			place: $('#place').val(),
			deviceid: fingerprint
		},function(answer){
			$('#container').html(answer);
		});
	});

	$('#container').on('touchend click','#setShift',function(){
		$.post('http://norgematos.net/aranreport/addShift.php',{
			place: $('#place').val(),
			shift: $('#shift').val(),
			deviceid: fingerprint
		},function(answer){
			$('#container').html(answer);
		});
	});

	$('#container').on('change','input.time',function(){
		var action = $(this).attr('id').replace('_time','');
		var thevalue = $(this).val();
		$.post('http://norgematos.net/aranreport/fixPunch.php',{
			action: action,
			serviceid: $('#ServiceID').val(),
			thevalue: thevalue,
			deviceid: fingerprint
		},function(answer){
			//
		});
	});
	
});