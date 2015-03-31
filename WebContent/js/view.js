$(function() {
	console.log("View Ready!");

	/*collection을 눌렀을 때 기본 화면을 없애고 기능화면으로 */
	$('#collection-view-in').click(function(){
		if(window.sessionStorage.length>0){
			$('#main-view').hide();
			$('#top').show();
		} else {
			alert("Login First!");
		}
		
	});
	
	/* Timeline을 눌렀을 때 메인페이지 복귀 */
	$('#timeline-view-in').click(function() {
		$('#main-view').show();
		$('#top').hide();
	});
	
})