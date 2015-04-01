$(function() {
	/*Logout Btn Handler*/
	console.log("RESTful Ready!");

	var postingDatas;	//Posting
	var commentDatas;	//Comment
	var count=0;
	
	function getCommentData(){
		$.ajax({
			url : 'http://localhost:8080/getComment',
			method : 'get',
			dataType : 'json',
			success : function(res){
				commentDatas = res.result;
				console.log("ajax_getCommentDao");
				renderPostingList();
				
			}
		});
	}
	getCommentData();

	$('#log_out').click(function(){
		window.sessionStorage.setItem('id','');
		window.sessionStorage.setItem('name','');
		window.sessionStorage.setItem('thumb','');
		window.sessionStorage.setItem('pass','');

		$('.logon').hide();
		$('.logoff').show();

		renderPostingList();
	});

	$('#profile-edit-submit').click(
			function() {
				var id = $('#user_edit_id').val();
				var name = $('#user_edit_name').val();
				var pass = $('#user_edit_pass').val();
				var passconf = $('#user_edit_passconf').val();
				if (!passconf) {
					alert("please fill out password confirm blank");
				} else if (passconf == pass) {
					$.ajax({
						url : 'http://localhost:8080/postUser?type=2&id=' + id + '&pass=' + pass + '&name=' + name,
						method : 'POST',
						dataType : 'json',
						success : function(res) {
							window.sessionStorage.setItem('name', name);
							window.sessionStorage.setItem('pass', pass);
							$('#user_edit_name').val(name);
							$('#user_edit_pass').val(pass);
							$('#user_edit_passconf').val('');
							console.log("ajax_profileEdit");
							alert('edit success');
							$.modal.close();
							$('.info').text(id + '('+name+')');
						}
					});
				} else {
					alert('please check your password confirm again');
				}
			});

	$('#user-delete-submit').click(function(){
		var id = $('#user_edit_id').val();
		var pass = $('#user_edit_pass').val();
		var passconf = $('#user_edit_passconf').val();

		if (!passconf) {
			alert("please fill out password confirm blank");
		} else if (passconf == pass) {
			var check=confirm('Are you sure to delete your id? All your postings will be deleted');
			if (check){
				$.ajax({
					url :'http://localhost:8080/deleteUser?&id=' + id,
					method :'DELETE',
					dataType :'json',
					success : function(res) {

						$('#user_edit_id').val('');
						$('#user_edit_name').val('');
						$('#user_edit_pass').val('');
						$('#user_edit_passconf').val('');

						$.modal.close();
						console.log("ajax_deleteUser");
						window.sessionStorage.setItem('id', '');
						window.sessionStorage.setItem('name','');
						window.sessionStorage.setItem('thumb','');
						window.sessionStorage.setItem('pass','');

						$('.logoff').show();
						$('.logon').hide();

						renderPostingList();
					}
				});
			}else{return false;}
		} else {
			alert('please check your password confirm again');
		}
	});
	/**
	 * Login Btn Handler
	 */
	$('#login-submit').click(function(){
		var id = $('#user_id').val();
		var pass = $('#user_pass').val();

		if(id == '' || pass == ''){
			alert('please write your id or pass');
			return false;
		}

		$.ajax({	//Request Login API
			url: 'http://localhost:8080/getUser?type=2&id='+id+'&pass='+pass,
			method : 'get',
			dataType : 'json',
			success : function(res){
				if(res.result.id){
					$('#user_id').val('');
					$('#user_pass').val('');
					$.modal.close();
					window.sessionStorage.setItem('id', res.result.id);
					window.sessionStorage.setItem('name',res.result.name);
					window.sessionStorage.setItem('thumb',res.result.thumb);
					window.sessionStorage.setItem('pass',res.result.pass);
					console.log("ajax_logIn");
					$('.logon').show();
					$('.logoff').hide();

					renderPostingList();

					var name = res.result.name;
					var id = res.result.id;
					var pass=res.result.pass;
					var thumb=res.result.thumb;

					$('.thumb').css("background-image", 'url('+'"/img/common/'+thumb+'.jpg"'+')');
					$('.info').text(id + '('+name+')');

					$('#user_edit_id').val(id);
					$('#user_edit_name').val(name);
					$('#user_edit_pass').val(pass);
					//$('.thumb').css('background-image : ', 'url('+_+')') 썸네일 처리
				}else{
					alert('log in Fail')
				}
			},
			error : function(){

			}

		});
	});
	
	$('#signin-submit').click(function(){
		var id = $('#user_signin_id').val();
		var name = $('#user_signin_name').val();
		var pass = $('#user_signin_pass').val();
		var passconf = $('#user_signin_passconf').val();

		if(id == '' || pass == '' || name =='' || passconf =='' ){
			alert('please fill out the all blanks');
			return false;
		}
		else if(pass!=passconf){
			alert('password confirm failed');
			return false;
		}
		$.ajax({	//ID 중복 체크
			url: 'http://localhost:8080/getUser?type=3&id='+id,
			method : 'get',
			dataType : 'json',
			success : function(res){
				if(res.result==1){
					alert('Sorry. Id is already exist');
					$('#user_signin_id').val('');
					$('#user_signin_id').focus();
					console.log("ajax_idCheck");
					return false;
				}
				else{
					$.ajax({	//Request Signin API
						url: 'http://localhost:8080/postUser?type=1&id='+id+'&pass='+pass+'&name='+name,
						method : 'post',
						dataType : 'json',
						success : function(res){
							alert('sign in success!')
							$('#user_signin_id').val('');
							$('#user_signin_name').val('');
							$('#user_signin_pass').val('');
							$('#user_signin_passconf').val('');
							$.modal.close();
							console.log("ajax_idCheck2");
						},
						error : function(){

						}

					});
				}
			},
			error : function(){

			}

		});
	});

	$('#write_post_btn').click(function(){
		if(!window.sessionStorage.getItem('id')){
			alert('login first!');
			return false;
		}

		var content = $('#write').val();

		if(content == ''){
			alert('please write something');
			$('#write').focus();
			return false;
		}

		$.ajax({
			url: 'http://localhost:8080/postPosting?type=1',
			method : 'post',
			dataType: 'json',
			data : {
				content : content,
				writer : window.sessionStorage.getItem('id')
			},
			success : function(res){
				if(res.result == 'success'){
					$('#write').val('');
					console.log("ajax_wirtePosting");

					//renew posting list
					renderPostingList();

				}else{
					alert('post fail!');
				}
			},
			error : function(){}
		});
	});
	
	//add comment handler
	$('.posts').on('click','.add-comment-btn', function(){
		var parentElem = $(this).parents('section');
		
		//console.log(parentElem.size());
		
		var section_id=parentElem.attr('id');
		var count_num = parentElem.attr('id').substr(0,3);
		count_num=Number(count_num);
		
		var param = {
			posting_seq : parentElem.attr('id').substring(11),
			writer : window.sessionStorage.getItem('id'),
			content : parentElem.find('input.comment').val(),
			point : parentElem.find('.raty').raty('score')
		};
		
		
		$.ajax({
			url: 'http://localhost:8080/postComment',
			method: 'post',
			dataType: 'json',
			data: param,
			success: function(res){
				if(res.result=='success'){
					//Append comment to comment list
					var commentItem = '<li>'+
						'<span class="raty-view" data-score="'+param.point+'"></span>'+
						'<span class="user">'+param.writer+'</span>'+
						'<span class="regdate view">'+getNowDate()+'</span>'+
						'<span class="comment view">'+param.content+'</span>'+
					'</li>';
					parentElem.find('ul.comment-list').append(commentItem);
					handleRaty();
					console.log("ajax_commentPost");
					
					//count avg and update posting point
					var avg = 2.5;
					var sum = 0;
					var currentCommentList = parentElem.find('ul.comment-list > li');
					
					currentCommentList.each(function(idx, item){
						//var currentCommentElem = $(this);
						var currentPoint = $(this).find('.raty-view').raty('score');
						sum = sum + currentPoint;
						
						if(idx == currentCommentList.size()-1){
							avg = (sum/currentCommentList.size());
							parentElem.find('.bac-point').text(avg);
							//console.log('avg : '+avg);
							
						}
					});
					
					
					
					
					parentElem.find('input.comment').val('');
					parentElem.find('.raty').raty('score', '2.5');
					
				}else{
					alert('comment add fail');
					parentElem.find('input').focus();
				}
			}
		})
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
					console.log("ajax_renderPosting");
					renderSectionElem();
				}
			}
		})
	}

	var timer = setInterval(function() {scrollOK = true;}, 100);
	var scrollOK = true;
	$(window).bind('scroll',function() {
		if (scrollOK) {
			scrollOK = false;
			if ($(this).scrollTop() + $(this).height() >= ($(document).height() - 100)) {
				console.log('You Hit Bottom!');
				if(postingDatas.length-count<5){
					for(var i=0; i<postingDatas.length-count; i++ ){

						renderSectionElem();
					}
				}else{
					for(var i=0; i<5; i++ ){
						renderSectionElem();
					}
				}
			}
		}
	});
	
	/**
	 * 
	 */
	function renderSectionElem(){
		if(window.sessionStorage.getItem('id')==postingDatas[count].writer){
			$('.posts').append(getSectionItem(postingDatas[count], false));
			handleRaty();
		}else{
			$('.posts').append(getSectionItem(postingDatas[count], true));
			handleRaty();
		}
		count++;
	}

	$(document).on('click', '.post-delete' , function(){
		var seq=$(this).parent().parent().parent().parent().parent().attr('id');
		seq= seq.substring(11);
		var check=confirm('Are you sure to delete this post?');
		if (check){
			$.ajax({
				url :'http://localhost:8080/deletePosting?seq=' + seq,
				method :'DELETE',
				dataType :'json',
				success : function(res) {
					renderPostingList();
					console.log("ajax_postingDelete");
				}
			});
		}else{return false;}
	});

	$(document).on('click','.post-edit', function(){
		var seq = $(this).closet('section').attr('id');
		seq= seq.substring(11);
		$(document).on('click', '#post-edit-submit' , function(){
			var content=$('#post_edit_area').val();
			$.ajax({
				url :'http://localhost:8080/postPosting?type=2',
				method :'post',
				dataType :'json',
				data:{
					seq : seq,
					content : content
				},
				success : function(res) {
					$('#post_edit_area').val('');
					$.modal.close();
					renderPostingList();
					console.log("ajax_postingEdit");
				}
			});
		});
	});
	
     $("#uploadbutton").click(function(){
         var form = $('#postingimg')[0];
         var formData = new FormData(form);
             $.ajax({
                url: '/fileupload',
                processData: false,
                    contentType: false,
                data: formData,
                type: 'POST',
                success: function(result){
                    alert("업로드 성공!!");
                    console.log("ajax_upload");
                }
            });
         });
	
	/**
	 * postingDatas - seq, thumb, writer, regdate, content
	 * isHide - boolean
	 * @desc- render comment elem
	 */
	function getSectionItem(postingDatas, isHide){
		
		var display = isHide ? 'none' : 'block';
		
		var countstr=leadingZeros(count,3);
		
		var sectionElem = 
			'<section class="post" id="'+countstr+'postseq_'+postingDatas.seq+'">'+
			'<div class="post-header post-top">'+
			'<span class="post-avatar post-img">'+
			'<img src="/img/common/'+postingDatas.thumb+'.jpg"></img>'+
			'</span>'+
			'<span class="post-meta bacpost-meta">'+
			'<p>'+
			'<span class="post-writer"><a class="post-author" href="#">'+postingDatas.writer+'</a></span>'+
			'<span class="posting-buttons" style="display:'+display+'">'+
			'<a href="#post_edit" rel="modal:open"><button class="post-edit"><i class="fa fa-pencil-square-o"></i></button></a>'+
			'<button class="post-delete"><i class="fa fa-times"></i></button>'+
			'</span>'+ 
			'</p>'+
			'<p>'+
			'<span class="bac-point">Point '+postingDatas.avg+'</span>'+
			'<span class="post-regdate">'+postingDatas.regdate+'</span>'+
			'</p>'+
			'</span>'+
			'</div>'+
			'<div class="post-description bac-content">'+
			'<p>'+postingDatas.content+
			'</p>'+
			'</div>'+
			'<div class="comment-cnt">'+
				'<div class="form">'+
					'<span class="raty" data-score="2.5"></span>'+
					'<div class="pure-button add-comment-btn">Add</div>'+
					'<input type="text" name="comment" class="comment"/>'+
				'</div>'+
				'<ul class="comment-list">'+
				'</ul>'+
			'</div>';
			'</section>';
		
		//alert(JSON.stringify(commentDatas));
		var	currentCommentDatas = _.filter(commentDatas, function(value){
			//console.log(JSON.stringify(value) + ' // '+ postingDatas.seq);
			return value.posting_seq ==  postingDatas.seq;
		});
		var sectionObject = $(sectionElem);
		
		$.each(currentCommentDatas, function(idx, item){
			var liElem = 
				'<li>'+
					'<span class="raty-view" data-score="'+item.point+'"></span>'+
					'<span class="user">'+item.writer+'</span>'+
					'<span class="regdate view">'+item.regdate.substr(0,10)+'</span>'+
					'<span class="comment view">'+item.content+'</span>'+
				'</li>';
			
			sectionObject.find('.comment-list').append(liElem);
			
			//console.log(idx);
			
		});
			return sectionObject.get(0).outerHTML;
	}
	
	
	
	function handleRaty(){
		$('span.raty').raty({
			score: function() {
				return $(this).attr('data-score');
			}
		});

		//List
		$('span.raty-view').raty({
			score: function() {
				return $(this).attr('data-score');
			},
			readOnly: true,
		});
	}
	
	function leadingZeros(n, digits) {
		  var zero = '';
		  n = n.toString();

		  if (n.length < digits) {
		    for (var i = 0; i < digits - n.length; i++)
		      zero += '0';
		  }
		  return zero + n;
	}
	
	
	
	function getNowDate(){
		// GET CURRENT DATE
		var date = new Date();
		 
		// GET YYYY, MM AND DD FROM THE DATE OBJECT
		var yyyy = date.getFullYear().toString();
		var mm = (date.getMonth()+1).toString();
		var dd  = date.getDate().toString();
		 
		// CONVERT mm AND dd INTO chars
		var mmChars = mm.split('');
		var ddChars = dd.split('');
		 
		// CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
		var datestring = yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
		
		return datestring;
	}
});