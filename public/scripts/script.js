$(document).ready(function(){
    $('input[name=video]').on('change', function(){
    var n = $(this).val();
    switch(n)
    {
            case '1':
                  $('#show').html("https://www.w3schools.com/html/mov_bbb.mp4");
                  $("<video id='video_player' width='320' height='240' controls>" +
                    "<source src='https://www.w3schools.com/html/mov_bbb.mp4' type='video/mp4' />" +
                    "</video>").replaceAll("#video_player");
                  break;
            case '2':
                  $('#show').html("https://player.vimeo.com/external/335910489.sd.mp4?s=55cc464f255f2e3a8efe11f4fb1eef7f7c210a76&profile_id=165&oauth2_token_id=57447761");
                  $("<video id='video_player' width='320' height='240' controls>" +
                    "<source src='https://player.vimeo.com/external/335910489.sd.mp4?s=55cc464f255f2e3a8efe11f4fb1eef7f7c210a76&profile_id=165&oauth2_token_id=57447761' type='video/mp4' />" +
                    "</video>").replaceAll("#video_player");
                  break;
            case '3':
                  $('#show').html("https://player.vimeo.com/external/482606791.sd.mp4?s=05882096a09338ae4a170324bcb8e27d9eabee62&profile_id=165&oauth2_token_id=57447761");
                  $("<video id='video_player' width='320' height='240' controls>" +
                    "<source src='https://player.vimeo.com/external/482606791.sd.mp4?s=05882096a09338ae4a170324bcb8e27d9eabee62&profile_id=165&oauth2_token_id=57447761' type='video/mp4' />" +
                    "</video>").replaceAll("#video_player");
                  break;
            case '4':
                  $('#show').html("https://player.vimeo.com/external/428101466.sd.mp4?s=04c0ad71a05eef6b151c0a860388b00eba33b536&profile_id=165&oauth2_token_id=57447761");
                  $("<video id='video_player' width='320' height='240' controls>" +
                    "<source src='https://player.vimeo.com/external/428101466.sd.mp4?s=04c0ad71a05eef6b151c0a860388b00eba33b536&profile_id=165&oauth2_token_id=57447761' type='video/mp4' />" +
                    "</video>").replaceAll("#video_player");
                  break;
            case '5':
                  $('#show').html("https://player.vimeo.com/external/289258217.sd.mp4?s=50b11b521df767740fa56e4743159474f540afa2&profile_id=164&oauth2_token_id=57447761");
                  $("<video id='video_player' width='320' height='240' controls>" +
                    "<source src='https://player.vimeo.com/external/289258217.sd.mp4?s=50b11b521df767740fa56e4743159474f540afa2&profile_id=164&oauth2_token_id=57447761' type='video/mp4' />" +
                    "</video>").replaceAll("#video_player");
                  break;
        }
    });
});