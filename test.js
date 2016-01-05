$(document).ready(function(){
    $('button#one').click(function(){
	    $.get("/send").done(function(data) {
            console.log(data);
        });
	});
	
    $('form').submit(function(event){
        event.preventDefault();
	    var name = document.getElementsByName('n1')[0].value;
		var email = document.getElementsByName('n2')[0].value;
		var pwd = document.getElementsByName('n3')[0].value;
        $.post( "/send", { name: name, time: "2pm", email: email, pwd: pwd }).done(function(data) {
            console.log(data);
        }).fail(function() {
            console.log('Request failed');
        }).always(function() {
            console.log('Always executed');
        });
        $.get( "/send", { name: name, time: "2pm", email: email, pwd: pwd }).done(function(data) {
            console.log(data);
        }).fail(function() {
            console.log('Request failed');
        }).always(function() {
            console.log('Always executed');
        });
        /*$.post( "/send", { name: name, time: "2pm", email: email, pwd: pwd }, function(data) {
            console.log(data);
        });*/
        /*$.ajax({
            type: "POST",
            url: '/send',
            data: { name: name, time: "2pm", email: email, pwd: pwd },
            success: function(data) {
                console.log(data);
                console.log("Hello");
            },
            dataType: 'json'
        });*/
	});
});