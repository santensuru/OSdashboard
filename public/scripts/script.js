$(document).ready(function(){

  var array_url = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://player.vimeo.com/external/335910489.sd.mp4?s=55cc464f255f2e3a8efe11f4fb1eef7f7c210a76&profile_id=165&oauth2_token_id=57447761",
    "https://player.vimeo.com/external/482606791.sd.mp4?s=05882096a09338ae4a170324bcb8e27d9eabee62&profile_id=165&oauth2_token_id=57447761",
    "https://player.vimeo.com/external/428101466.sd.mp4?s=04c0ad71a05eef6b151c0a860388b00eba33b536&profile_id=165&oauth2_token_id=57447761",
    "https://player.vimeo.com/external/289258217.sd.mp4?s=50b11b521df767740fa56e4743159474f540afa2&profile_id=164&oauth2_token_id=57447761",
    "https://www.w3schools.com/tags/movie.mp4"
  ];

  $('#video_list li').click(function(e){
    var n = $(this).val();

    $('#show').html("<a href='" + array_url[n] + "' target='_blank'>" + array_url[n] + "</href>");
    $("<video id='video_player' width='320' height='240' controls autoplay muted>" +
      "<source src='" + array_url[n] + "' type='video/mp4' />" +
      "</video>").replaceAll("#video_player");

  });
});