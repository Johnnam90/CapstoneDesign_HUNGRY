(function($){
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
					console.log("ajax_renderPosting_after");
					renderSectionElem();
				}
			}
		})
	}
})(jQuery);