
var timer_id;
var break_length = 5;
var session_length = 25;
var state = "fresh";
var stage = "SESSION";

function populate_form_values()
{
	document.getElementById("session_length_label").value = session_length;
	document.getElementById("break_length_label").value = break_length;
	document.getElementById("stage_label").innerHTML = stage;
	document.getElementById("timer").innerHTML = String((stage === "SESSION") ? session_length : break_length) + ":00"
}

//TODO: Add Object.onclick for +/- buttons

function decrease_break_time()
{

	break_length = parseInt(document.clock.break_length_label.value);
	if (break_length > 1)
	{
		break_length -= 1;
	}

	document.clock.break_length_label.value = break_length;
}

function increase_break_time()
{
	break_length = parseInt(document.clock.break_length_label.value) + 1;
	document.clock.break_length_label.value = break_length;
}

function decrease_session_time()
{
	console.log(session_length);
	session_length = parseInt(document.clock.session_length_label.value);
	if (session_length > 1)
	{
		session_length -= 1;
	}
	document.clock.session_length_label.value = session_length;
	document.getElementById('timer').innerHTML =  String(session_length) + ':00';	
	console.log(session_length);
}

function increase_session_time()
{
	console.log(session_length);
	session_length = parseInt(document.clock.session_length_label.value) + 1;
	document.clock.session_length_label.value = session_length;
	document.getElementById('timer').innerHTML =  String(session_length) + ':00';	
	console.log(session_length);
}

function start_pause_resume_timer()
{
	var seconds = get_seconds_for_countdown();
	document.getElementById('increase_session_button').disabled = true;
	document.getElementById('decrease_session_button').disabled = true;
	document.getElementById('increase_break_button').disabled = true;
	document.getElementById('decrease_break_button').disabled = true;
	document.getElementById('reset_button').disabled = false;

	if (state === "fresh" || state === "paused")
	{
		document.getElementById('start_pause_resume_button').value = "Pause";
		state = "active";

		document.getElementById('timer').innerHTML = 
			convert_seconds_remaining_to_countdown_display(seconds);


		timer_id = setInterval(
			function()
			{
				seconds -= 1;

				if (seconds > 0)
				{
					document.getElementById('timer').innerHTML = 
						convert_seconds_remaining_to_countdown_display(seconds);
				}
				else
				{
					clearInterval(timer_id);
					if (stage === "BREAK")
					{
						stage = "SESSION";
					}
					else
					{
						stage = "BREAK";
					}
				populate_form_values();
				state = "fresh";
				start_pause_resume_timer();
				}
			}, 1000);

	}

	else if (state === "active")
	{
		document.getElementById('start_pause_resume_button').value = "Resume";
		state = "paused";
		document.getElementById('timer').innerHTML = 
			convert_seconds_remaining_to_countdown_display(seconds);
		clearInterval(timer_id);
	}
}

function reset_timer()
{
	clearInterval(timer_id);
	state = "fresh";
	stage = "SESSION";
	break_length = document.getElementById('break_length_label').value;
	document.getElementById('start_pause_resume_button').value = "Start";
	document.getElementById('increase_session_button').disabled = false;
	document.getElementById('decrease_session_button').disabled = false;
	document.getElementById('increase_break_button').disabled = false;
	document.getElementById('decrease_break_button').disabled = false;
	document.getElementById('reset_button').disabled = true;
	populate_form_values();
}

function convert_seconds_remaining_to_countdown_display(seconds)
{
	var minutes_display = parseInt(seconds/60);
	var seconds_display = seconds % 60;
	return String(minutes_display) + ':' + ('0' + String(seconds_display)).slice(-2);
}

function get_seconds_for_countdown()
{
	var minutes = parseInt(document.getElementById('timer').innerHTML);
	var seconds = parseInt(document.getElementById('timer').innerHTML.slice(-2));
	return minutes * 60 + seconds;
}

populate_form_values();

document.getElementById('increase_session_button').onclick = increase_session_time;
document.getElementById('decrease_session_button').onclick = decrease_session_time;
document.getElementById('increase_break_button').onclick = increase_break_time;
document.getElementById('decrease_break_button').onclick = decrease_break_time;
document.getElementById('start_pause_resume_button').onclick = start_pause_resume_timer;
document.getElementById('reset_button').onclick = reset_timer;