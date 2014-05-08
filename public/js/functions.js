function login(data){
  read_data(data);
  localStorage.setItem('myToken', JSON.stringify(data));
  $("#articles").css("display","block");
  $("#logout").css("display","block");
  $("form#login").css("display","none");
  $(".infobox").css("display","block").addClass('ok').html('You are logged in, select an option.');
  $(".logued-in").css("display","block");
}
function fail(){
  localStorage.removeItem('myToken');
  $(".infobox").css("display","block");
}
function logout(){
  localStorage.removeItem('myToken');
  $(".logued-in").css("display","none");
  window.location = "http://localhost:3000/";
}