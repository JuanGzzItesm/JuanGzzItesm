


function fetchNew2(nuevo){
    
   //Here we use our key and the url and declare the part of data
   //DATA

    var key = 'AIzaSyByQNJH84q-YDlKLag12nr025dQAbyX9D8';
	var url = 'https://www.googleapis.com/youtube/v3/search';

  	$.ajax({
  		type: 'GET',
  		url : url,
  		data: {
      		part: "snippet",
      		q : nuevo,
      		key: "AIzaSyByQNJH84q-YDlKLag12nr025dQAbyX9D8",
      		type: "video",
      		maxResults:10,
      		pageToken: $("#botonesPaginas").val(),
      		videoEmbeddable: true,
      },

      success : function(data){
        video(data);
      },
      error : function( err ){
        console.log( "NO JALO" );
      }
    });
     
}



function video(data){

	//This functions is to show or hidde the buttons of back and next deppending on what to display

	$('.botonesV').show();
	if (typeof data.prevPageToken == "undefined"){
		$("#back").hide();
	} else{

		$("#back").show();


	}
	if (typeof data.nextPageToken == "undefined"){
		$("#next").hide();
	} else{

		$("#next").show();
		
		
	}

	$("#back").val(data.prevPageToken);
	$("#next").val(data.nextPageToken);

	let results = $( '.results' );

	var nombreVideo, imgVideo;

	//Here we add to the html all the values that we get from the DATA packet

	$.each(data.items, function(i,item){

		
		videoTitulo = item.snippet.title;
		videoImg = item.snippet.thumbnails.medium.url;
		videoId = item.id.videoId;

		imgVideo = "<li><img alt='" + videoTitulo + "' src='" + videoImg + "' width='120' height='90'</li></img>"

		nombreVideo = '<li>'+videoTitulo+'</li>';

		linkVideo = '<a href = "https://www.youtube.com/watch?v=' + videoId + '" target = "blank">'+imgVideo+'</a>';

		linkNombre = '<a href = "https://www.youtube.com/watch?v=' + videoId + '" target = "blank">'+nombreVideo+'</a>';

		

		$('.results').append(linkNombre);
		$('.results').append(linkVideo);
		
		
	});



}


function watchForm(){
  
  let nuevo = $("#int").val();
 
  fetchNew2(nuevo);
 
}



function init(){

 $('#submit').click(function(e){

		 e.preventDefault();
		 $("li").remove();
		 watchForm();
		 
		 
	});	


 $("#next").click(function(e) {

 		  $("li").remove();
          $("#botonesPaginas").val($("#next").val());
          watchForm();
      });

 $("#back").click(function(e) {

 		   $("li").remove();
          $("#botonesPaginas").val($("#back").val());
          watchForm();
      });


  
}

init();








