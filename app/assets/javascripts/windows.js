$(document).ready(function(){
  $("#hide-story").click(function(){
    $(".story-title").addClass("hidden");
    $(".show-story").removeClass("hidden");
  })
  $(".show-story").click(function(){
    $(".story-title").removeClass("hidden");
    $(".show-story").addClass("hidden");
  })
})


