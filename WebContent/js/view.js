$(function() {
	console.log("View Ready!");

	/* collection을 눌렀을 때 기본 화면을 없애고 기능화면으로 */
	$('#collection-view-in').click(function() {
		if (window.sessionStorage.length > 0) {
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

	function renderPostingList(){
		$('.posts .post').remove();
		count=0;
		$.ajax({
			url: 'http://localhost:8080/getPosting',
			method: 'get',
			dataType: 'json',
			async : false,
			success : function(res){
				postingDatas = res.result;
				for(var i=0; i<5; i++ ){
					console.log("ajax_renderPosting_before");
					renderSectionElem();
				}
			}
		})
	}
});
