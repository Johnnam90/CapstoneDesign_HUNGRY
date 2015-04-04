$(function() {
	
	var session = {
		id : window.sessionStorage.getItem('id'),
		name : window.sessionStorage.getItem('name')
	};
	
	var thumb = window.sessionStorage.getItem('thumb');
	var pass = window.sessionStorage.getItem('pass');
	
	
	if(!session.id){

	}else{
		$('.logon').show();
		$('.logoff').hide();
		
		$('.thumb').css("background-image", 'url('+'"/img/common/'+thumb+'.jpg"'+')');
		$('.info').text(session.id + '('+session.name+')');
		$('#user_edit_id').val(session.id);
		$('#user_edit_name').val(session.name);
		$('#user_edit_pass').val(pass);
	}
	
	
	
});