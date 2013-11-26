var urlCount = 0;

function searchBtnEvent(){
	var keyword = $('#keyword').val().split('\n');
	if (keyword.length==1 && keyword[0]=='') return;
	var selectViewerCount = parseInt($('#viewerCount').val());
	var selectPages = parseInt($('#pages').val());
	if (isNaN(selectViewerCount)/* || isNaN(selectPages)*/) return;
	var count = 0;
	for (var i=0; i<keyword.length; ++i){
		if (keyword[i]!='')
		$.ajax({
		  url: "./ajax.php",
		  method: 'GET',
		  dataType: 'JSON',  //use jsonp data type in order to perform cross domain ajax
		  //crossDomain: true,
		  //async: false,
		  data: {
		  	"q":keyword[i],
			"p":selectPages
		  },
		  success: function(resp){
		  	console.log(resp);
		  	var posts = resp;
		  	//var str = '<table border="1"><tbody><tr><th>標題</th><th>點閱數</th><th>連結</th></tr>';
			var str = '';
			//
		  	for (var i=0; i<posts.length; ++i){
		  		console.log(posts[i]);
		  		try{
		  			if (posts[i].number_of_plays>selectViewerCount){
		  				//str+='<tr><td>'+posts[i].title.$t+'</td><td>'+posts[i].yt$statistics.viewCount+'</td><td><a target="_blank" href="https://www.youtube.com/watch?v='+posts[i].media$group.yt$videoid.$t+'">點此另開</a></td></tr>';
		  				++count;
		  				++urlCount;
		  				str += posts[i].urls.url[0]._content+'\n';
		  			}
		  			
		  		} catch(e){
		  			console.log(e);
		  		}
		  	}
		  	$('#resultURL').val(str+=$('#resultURL').val());//'符合條件的有：'+count+' 筆<br />'+str+'</tbody></table>'
		  	$('#result').html('本次搜尋結果數： '+count+' 筆，累計結果數：'+urlCount+' 筆');
		  },
		  error: function(err){
		  	console.log(err);
		  }
		});	
	}
}

function pagesOptionEvent(){
	$("#search").trigger("click");
}

function eventBinding(){
	$('#search').click(searchBtnEvent);
	$('#pages').change(pagesOptionEvent);
	$(".auto_select").mouseover(function(){ $(this).select();});
}

function main(){
	eventBinding();
}

$(document).ready(main);