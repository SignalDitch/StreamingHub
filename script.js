// Hide all windowed elements on pageload
$('#archive-window').hide();
$('#filedrop-window').hide();
$('#todo-window').hide();
$('#mine-window').hide();
$('#live-window').hide();

// YouTube Channel Information
var channelId = "UC7Wjt0slEMBg96ek9VdUZsg";
var YTAPIKey = "AIzaSyCdn1LA7d2V5o_MGY_BX8d6SISWjb4-wbg";
var liveLoaded = false;

// I wrote this so I could keep the default Gitter
// sidecar "Open Chat" button but also have it
// auto-open on pageload
function openSidecar() {
	document.getElementsByClassName('gitter-open-chat-button')[0].click();
}

// Say hello to all the 1337 Haxx0rs in the Dev Console
console.log("   _____ _                   _ _____  _ _       _     ");
console.log("  / ____(_)                 | |  __ \\(_) |     | |    ");
console.log(" | (___  _  __ _ _ __   __ _| | |  | |_| |_ ___| |__  ");
console.log("  \\___ \\| |/ _` | '_ \\ / _` | | |  | | | __/ __| '_ \\ ");
console.log("  ____) | | (_| | | | | (_| | | |__| | | || (__| | | |");
console.log(" |_____/|_|\\__, |_| |_|\\__,_|_|_____/|_|\\__\\___|_| |_|");
console.log("            __/ |                                     ");
console.log("           |___/                                      ");
console.log("------------------------------------------------------");
console.log("Welcome to the site, please poke at the source! If you");
console.log("want to suggest a change, you can file a pull request ");
console.log("over at the Signal Ditch GitHub. Click the Projects");
console.log("button in the sidebar to jump there.");

// Add Denver time to the moment-timezones library
// This is a lightweight alternative to importing the entire timezones table
moment.tz.add('America/Denver|MST MDT MWT MPT|70 60 60 60|01010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 11B0 1qL0 WN0 mn0 Ord0 8x20 ix0 LCN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5');

// Update the "Boulder time" clock
setInterval(function () {
	document.getElementById('mountainTime').innerHTML = moment.tz("America/Denver").format("h:mm:ss a");
}, 500);

// Stretch the sidebar footer
var sidebarFill = $(window).height() - $('.sidebar').height();
$('.sidebar-footer').css('height', sidebarFill);

// "live" button click handler
$('#live-button').click(function (e) {
	$('#live-window').toggle();
});

// "archive" button click handler
$('#archive-button').click(function (e) {
	$('#archive-window').toggle();
});

// "projects" button click handler
$('#projects-button').click(function (e) {
	$('#projects-window').toggle();
});

// "todo" button click handler
$('#todo-button').click(function (e) {
	$('#todo-window').toggle();
	$.ajax({
		url: 'php/todo_gen.php',
		success: function (data) {
			$("#todo-window").find(".todo-view").html("	");
			var todo = data;
			var ctime = todo.split("$$$")[0];
			var tasks = todo.split("$$$")[1].split("<br />");
			console.log(tasks);
			$("#todo-window").find(".todo-view").append("<h3>~~~To Do~~~</h3><p>Last Updated: " + ctime + "</p><br>");
			tasks.forEach(function (t) {
				if (t.includes("[ ]")) {
					$("#todo-window").find(".todo-view").append("<p>" + t.replace("[ ]", "") + "</p>");
				} else if (t.includes("[x]")) {
					$("#todo-window").find(".todo-view").append("<p><del>" + t.replace("[x]", "") + "</del></p>");
				} else if (t.includes("( )")) {
					$("#todo-window").find(".todo-view").append("<p>&nbsp;&nbsp;&nbsp;&nbsp;" + t.replace("( )", "") + "</p>");
				} else if (t.includes("(x)")) {
					$("#todo-window").find(".todo-view").append("<p><del>&nbsp;&nbsp;&nbsp;&nbsp;" + t.replace("(x)", "") + "</del></p>");
				}
			});
		}
	});
});

// "downloads" button click handler
$('#filedrop-button').click(function (e) {
	$('#filedrop-window').toggle();
	$.ajax({
		url: 'php/filelist.php',
		success: function (data) {
			$("#filedrop-window").find(".directory-view").html("	");
			var ls = JSON.parse(data);
			ls.forEach(function (e) {
				if (e != "." && e != "..") {
					var fileicon = document.createElement("div");
					$(fileicon).addClass("icon-group");
					var filesrc = "/php/filedrop/" + e;
					fileicon.innerHTML = "<a  target=\"_blank\" href=\"" + filesrc + "\"><img src=\"img/file-icon.png\" class=\"fileicons\"><br><p style=\"font-size: 10pt;\">" + e + "</p></a>";
					$("#filedrop-window").find(".directory-view").append(fileicon);
				};
			});
		}
	});
});

// "donate cycles" button click handler
$('#mine-button').click(function (e) {
	$('#mine-window').toggle();
});

// click handler for the little "x" to hide windowed elements
$('.window-exit').click(function (e) {
	var target = e.target;
	$(target.closest(".window-element")).hide();
});

// listener function used by the interactjs lib to move windowed elements
// on drag
function dragMoveListener(event) {
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

// Attach interactjs listener
interact('.window-element')
.draggable({
	inertia: false,
	onstart: function (event) {
		console.log("window-element focus changed");
		$(".window-element").css("z-index", 1000);
		$(event.target).css("z-index", 100000);
	},
	onmove: dragMoveListener,
	onend: function (event) {
		var target = event.target;
		target.style.opacity = "1";
		$('.window-element').find('iframe').show();
	}
});

// Check to see if the YouTube channel is live on pageload
// and then once per minute after that
httpGetAsync("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + channelId + "&eventType=live&type=video&key=" + YTAPIKey, updateLiveIcon);
setInterval(function () {
	httpGetAsync("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + channelId + "&eventType=live&type=video&key=" + YTAPIKey, updateLiveIcon);
}, 60000);

// Utility function to make asynch GET calls
function httpGetAsync(theUrl, callback) {

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
	}
	xmlHttp.open("GET", theUrl, true); // true for asynchronous
	xmlHttp.send(null);
}

// Perform various functions based on whether there is a livestream running
// update the "live" indicator in the sidebar and in the favicon, also load
// the stream into the live window.
function updateLiveIcon(responseText) {

	var response = JSON.parse(responseText);
	if (response.items.length > 0) {
		console.log("Channel is live");
		$('#on-air').removeClass("notlive");
		$('#on-air').addClass("live");
		$('#live-button').attr("title", "I'm streaming live!");
		$('#favicon').attr("href", "faviconlive.ico");
		$('#live-button').css("pointer-events", "auto");
		if (!liveLoaded) {
			loadLiveStream(response.items[0].id.videoId);
		};
	} else {
		console.log("Channel is not live");
		$('#on-air').removeClass("live");
		$('#on-air').addClass("notlive");
		$('#live-button').attr("title", "Not currently streaming");
		$('#favicon').attr("href", "favicon.ico");
		$('#live-button').css("pointer-events", "none");
	}

}

// Create our YouTube iframe object and point it at the current livestream
function loadLiveStream(videoId) {

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
