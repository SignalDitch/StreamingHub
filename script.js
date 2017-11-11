$('#archive-window').hide();
$('#filedrop-window').hide();
$('#todo-window').hide();
$('#mine-window').hide();
$('#live-window').hide();

// my channel
var channelId = "UC7Wjt0slEMBg96ek9VdUZsg";
var YTAPIKey = "AIzaSyCdn1LA7d2V5o_MGY_BX8d6SISWjb4-wbg";
var liveLoaded = false;

function openSidecar(){
document.getElementsByClassName('gitter-open-chat-button')[0].click();
}

moment.tz.add('America/Denver|MST MDT MWT MPT|70 60 60 60|01010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 11B0 1qL0 WN0 mn0 Ord0 8x20 ix0 LCN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5');

setInterval(function(){
document.getElementById('mountainTime').innerHTML = moment.tz("America/Denver").format("h:mm:ss a");
}, 500);

//fill sidebar 
var sidebarFill = $(window).height() - $('.sidebar').height();
$('.sidebar-footer').css('height', sidebarFill);

//live button
 $('#live-button').click(function(e) { 
  	$('#live-window').toggle();
	});

//archive button
 $('#archive-button').click(function(e) { 
  	$('#archive-window').toggle();
	});

//projects button
 $('#projects-button').click(function(e) { 
  	$('#projects-window').toggle();
	});

//todo button
 $('#todo-button').click(function(e) { 
  	$('#todo-window').toggle();
	$.ajax({ 
	  url: 'todo_gen.php',
	  success: function(data) {
		$( "#todo-window" ).find( ".todo-view" ).html("	");
		var todo = data;
		var ctime = todo.split("$$$")[0];
		var tasks = todo.split("$$$")[1].split("<br />");
		console.log(tasks);
		$( "#todo-window" ).find( ".todo-view" ).append( "<h3>~~~To Do~~~</h3><p>Last Updated: " + ctime + "</p><br>" );
		tasks.forEach( function(t) {
			if(t.includes("[ ]")){
				$( "#todo-window" ).find( ".todo-view" ).append( "<p>" + t.replace("[ ]","") + "</p>" );	
			}else if(t.includes("[x]")){
				$( "#todo-window" ).find( ".todo-view" ).append( "<p><del>" + t.replace("[x]","") + "</del></p>" );
			}else if(t.includes("( )")){
				$( "#todo-window" ).find( ".todo-view" ).append( "<p>&nbsp;&nbsp;&nbsp;&nbsp;" + t.replace("( )","") + "</p>" );
			}else if(t.includes("(x)")){
				$( "#todo-window" ).find( ".todo-view" ).append( "<p><del>&nbsp;&nbsp;&nbsp;&nbsp;" + t.replace("(x)","") + "</del></p>" );
			}			
		});
	  }
	});	
	});

//filedrop button
 $('#filedrop-button').click(function(e) { 
  	$('#filedrop-window').toggle();
	$.ajax({ 
	  url: 'filelist.php',
	  success: function(data) {
		$( "#filedrop-window" ).find( ".directory-view" ).html("	");
		var ls = JSON.parse(data);
		ls.forEach( function(e){
			if(e != "." && e != ".."){
				var fileicon = document.createElement("div"); 
				$(fileicon).addClass("icon-group");
				var filesrc = "/filedrop/" + e;
				fileicon.innerHTML = "<a  target=\"_blank\" href=\"" + filesrc + "\"><img src=\"file-icon.png\" class=\"fileicons\"><br><p style=\"font-size: 10pt;\">" + e + "</p></a>";
				$( "#filedrop-window" ).find( ".directory-view" ).append( fileicon );
			};
		});
	  }
	});
	});

//mine button
 $('#mine-button').click(function(e) { 
  	$('#mine-window').toggle();
	});
	
$('.window-exit').click(function(e) { 
  	var target = e.target;  
  	$(target.closest(".window-element")).hide();
	});
	
function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        
    target.style.opacity = "0.4";
	$('.window-element').find('iframe').hide();

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    
	}
	
interact('.window-element')
  .draggable({
    inertia: false,
	onstart: function (event) {
		console.log("window-element focus changed");
		$(".window-element").css("z-index", 1000);
		$(event.target).css("z-index", 100000);
	},
    onmove: dragMoveListener,
    onend: function (event){
    var target = event.target;
    target.style.opacity = "1";
	$('.window-element').find('iframe').show();
    }
  });

httpGetAsync("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + channelId + "&eventType=live&type=video&key=" + YTAPIKey, updateLiveIcon);

setInterval(function() {
	httpGetAsync("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + channelId + "&eventType=live&type=video&key=" + YTAPIKey, updateLiveIcon);
}, 60000);

function httpGetAsync(theUrl, callback) {
	
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function updateLiveIcon(responseText){

	var response = JSON.parse(responseText);
	if(response.items.length > 0){
		console.log("Channel is live");
		$('#on-air').removeClass("notlive");
	    $('#on-air').addClass("live");
		$('#live-button').attr("title","I'm streaming live!");
		$('#favicon').attr("href","faviconlive.ico");
		$('#live-button').css("pointer-events","auto");
		if(!liveLoaded){loadLiveStream(response.items[0].id.videoId);};
	}
	else{
		console.log("Channel is not live");
		$('#on-air').removeClass("live");
	    $('#on-air').addClass("notlive");
		$('#live-button').attr("title","Not currently streaming");
		$('#favicon').attr("href","favicon.ico");
		$('#live-button').css("pointer-events","none");
	}
	
}

function loadLiveStream(videoId){

  console.log(videoId);
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var player;
  
  var livePlayer = document.createElement('iframe');
  $(livePlayer).attr("id", "liveplayerview");
  $(livePlayer).attr("type", "text/html");
  $(livePlayer).attr("width", "640");
  $(livePlayer).attr("height", "360");
  $(livePlayer).attr("src", "https://www.youtube.com/embed/" + videoId);
  $(livePlayer).attr("frameborder", "0");
  $("#ytliveplayer").replaceWith(livePlayer);
	
}

