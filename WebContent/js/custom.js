$(function() {
	/* Logout Btn Handler */

	var postingDatas; // Posting
	var commentDatas; // Comment
	/* 추후 comment 변수 변경 필요 -> 전역변수 설정 후 각 JS 파일에서 이용 가능하도록. */
	var count = 0;
	// scrollOk를 위한

	function renderPostingList() {
		$('.posts .post').remove();
		count = 0;
		$.ajax({
			url : 'http://localhost:8080/getPosting',
			method : 'get',
			dataType : 'json',
			async : false,
			success : function(res) {
				postingDatas = res.result;
				for (var i = 0; i < postingDatas.length; i++) {
					renderSectionElem();
				}
			}
		})
	}

	/**
	 * 
	 */
	function renderSectionElem() {
		if (window.sessionStorage.getItem('id') == postingDatas[count].writer) {
			$('.posts').append(getSectionItem(postingDatas[count], false));
		} else {
			$('.posts').append(getSectionItem(postingDatas[count], true));
		}
		count++;
	}

	$(document).on('click', '.post-delete', function() {

		var seq = $(this).closest('section').attr('id');
		seq = seq.substring(11);
		var check = confirm('Are you sure to delete this post?');
		if (check) {
			$.ajax({
				url : 'http://localhost:8080/deletePosting?seq=' + seq,
				method : 'DELETE',
				dataType : 'json',
				success : function(res) {
					renderPostingList();
				}
			});
		} else {
			return false;
		}
	});

//	function getCommentData() {
//		$.ajax({
//			url : 'http://localhost:8080/getComment',
//			method : 'get',
//			dataType : 'json',
//			success : function(res) {
//				commentDatas = res.result;
//
//				renderPostingList();
//			}
//		});
//	}
//	getCommentData();

	$('#log_out').click(function() {
		window.sessionStorage.setItem('id', '');
		window.sessionStorage.setItem('name', '');
		window.sessionStorage.setItem('thumb', '');
		window.sessionStorage.setItem('pass', '');

		$('.logon').hide();
		$('.logoff').show();

		renderPostingList();
	});

	/**
	 * postingDatas - seq, thumb, writer, regdate, content isHide - boolean
	 * 
	 * @desc- render comment elem
	 */
	function getSectionItem(postingDatas, isHide) {

		var display = isHide ? 'none' : 'block';

		var countstr = leadingZeros(count, 3);

		var sectionElem = '<section class="post" id="'
				+ countstr
				+ 'postseq_'
				+ postingDatas.seq
				+ '">'
				+ '<div class="post-header post-top">'
				+ '<span class="post-meta bacpost-meta">'
				+ '<p>'
				+ '<span class="post-writer"><a class="post-author" href="#">'
				+ postingDatas.writer
				+ '</a></span>'
				+ '<span class="posting-buttons" style="display:'
				+ display
				+ '">'
				+ '<a href="#post_edit" rel="modal:open"><button class="post-edit"><i class="fa fa-pencil-square-o"></i></button></a>'
				+ '<button class="post-delete"><i class="fa fa-times"></i></button>'
				+ '</span>' + '</p>' + '<p>' + '<span class="post-regdate">'
				+ postingDatas.regdate + '</span>' + '</p>' + '</span>'
				+ '</div>' + '<div class="post-description bac-content">'
				+ '<p>' + postingDatas.content + '</p>' + '</div>'
				+ '</section>';

		// alert(JSON.stringify(commentDatas));
//		var currentCommentDatas = _.filter(commentDatas, function(value) {
//			// console.log(JSON.stringify(value) + ' // '+ postingDatas.seq);
//			return value.posting_seq == postingDatas.seq;
//		});
//		var sectionObject = $(sectionElem);

//		$.each(currentCommentDatas, function(idx, item) {
//			var liElem = '<li>' + '<span class="raty-view" data-score="'
//					+ item.point + '"></span>' + '<span class="user">'
//					+ item.writer + '</span>' + '<span class="regdate view">'
//					+ item.regdate.substr(0, 10) + '</span>'
//					+ '<span class="comment view">' + item.content + '</span>'
//					+ '</li>';
//
//			sectionObject.find('.comment-list').append(liElem);
//
//			console.log(idx);
//
//		});
//		return sectionObject.get(0).outerHTML;
	}
//1
	function leadings(n, digits) {
		var zero = '';
		n = n.toString();

		if (n.length < digits) {
			for (var i = 0; i < digits - n.length; i++)
				zero += '0';
		}
		return zero + n;
	}

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
						url : 'http://localhost:8080/postUser?type=2&id=' + id
								+ '&pass=' + pass + '&name=' + name,
						method : 'POST',
						dataType : 'json',
						success : function(res) {
							window.sessionStorage.setItem('name', name);
							window.sessionStorage.setItem('pass', pass);
							$('#user_edit_name').val(name);
							$('#user_edit_pass').val(pass);
							$('#user_edit_passconf').val('');

							alert('edit success');
							$.modal.close();
							$('.info').text(id + '(' + name + ')');
						}
					});
				} else {
					alert('please check your password confirm again');
				}
			});

	$('#user-delete-submit')
			.click(
					function() {
						var id = $('#user_edit_id').val();
						var pass = $('#user_edit_pass').val();
						var passconf = $('#user_edit_passconf').val();

						if (!passconf) {
							alert("please fill out password confirm blank");
						} else if (passconf == pass) {
							var check = confirm('Are you sure to delete your id? All your postings will be deleted');
							if (check) {
								$
										.ajax({
											url : 'http://localhost:8080/deleteUser?&id='
													+ id,
											method : 'DELETE',
											dataType : 'json',
											success : function(res) {

												$('#user_edit_id').val('');
												$('#user_edit_name').val('');
												$('#user_edit_pass').val('');
												$('#user_edit_passconf')
														.val('');

												$.modal.close();

												window.sessionStorage.setItem(
														'id', '');
												window.sessionStorage.setItem(
														'name', '');
												window.sessionStorage.setItem(
														'thumb', '');
												window.sessionStorage.setItem(
														'pass', '');

												$('.logoff').show();
												$('.logon').hide();

												renderPostingList();
											}
										});
							} else {
								return false;
							}
						} else {
							alert('please check your password confirm again');
						}
					});
	/**
	 * Login Btn Handler
	 */
	$('#login-submit').click(
			function() {
				var id = $('#user_id').val();
				var pass = $('#user_pass').val();

				if (id == '' || pass == '') {
					alert('please write your id or pass');
					return false;
				}

				$.ajax({ // Request Login API
					url : 'http://localhost:8080/getUser?type=2&id=' + id
							+ '&pass=' + pass,
					method : 'get',
					dataType : 'json',
					success : function(res) {
						if (res.result.id) {
							$('#user_id').val('');
							$('#user_pass').val('');
							$.modal.close();
							window.sessionStorage.setItem('id', res.result.id);
							window.sessionStorage.setItem('name',
									res.result.name);
							window.sessionStorage.setItem('thumb',
									res.result.thumb);
							window.sessionStorage.setItem('pass',
									res.result.pass);

							$('.logon').show();
							$('.logoff').hide();

							renderPostingList();

							var name = res.result.name;
							var id = res.result.id;
							var pass = res.result.pass;
							var thumb = res.result.thumb;

							$('.thumb').css(
									"background-image",
									'url(' + '"/img/common/' + thumb + '.jpg"'
											+ ')');
							$('.info').text(id + '(' + name + ')');

							$('#user_edit_id').val(id);
							$('#user_edit_name').val(name);
							$('#user_edit_pass').val(pass);
							// $('.thumb').css('background-image : ',
							// 'url('+_+')') 썸네일 처리
						} else {
							alert('log in Fail')
						}
					},
					error : function() {

					}

				});
			});

	$('#signin-submit')
			.click(
					function() {
						var id = $('#user_signin_id').val();
						var name = $('#user_signin_name').val();
						var pass = $('#user_signin_pass').val();
						var passconf = $('#user_signin_passconf').val();

						if (id == '' || pass == '' || name == ''
								|| passconf == '') {
							alert('please fill out the all blanks');
							return false;
						} else if (pass != passconf) {
							alert('password confirm failed');
							return false;
						}
						$
								.ajax({ // ID 중복 체크
									url : 'http://localhost:8080/getUser?type=3&id='
											+ id,
									method : 'get',
									dataType : 'json',
									success : function(res) {
										if (res.result == 1) {
											alert('Sorry. Id is already exist');
											$('#user_signin_id').val('');
											$('#user_signin_id').focus();
											return false;
										} else {
											$
													.ajax({ // Request Signin
															// API
														url : 'http://localhost:8080/postUser?type=1&id='
																+ id
																+ '&pass='
																+ pass
																+ '&name='
																+ name,
														method : 'post',
														dataType : 'json',
														success : function(res) {
															alert('sign in success!')
															$('#user_signin_id')
																	.val('');
															$(
																	'#user_signin_name')
																	.val('');
															$(
																	'#user_signin_pass')
																	.val('');
															$(
																	'#user_signin_passconf')
																	.val('');
															$.modal.close();
														},
														error : function() {

														}

													});
										}
									},
									error : function() {

									}

								});
					});

	$('#write_post_btn').click(function() {
		if (!window.sessionStorage.getItem('id')) {
			alert('login first!');
			return false;
		}

		var content = $('#write').val();

		if (content == '') {
			alert('please write something');
			$('#write').focus();
			return false;
		}

		$.ajax({
			url : 'http://localhost:8080/postPosting?type=1',
			method : 'post',
			dataType : 'json',
			data : {
				content : content,
				writer : window.sessionStorage.getItem('id')
			},
			success : function(res) {
				if (res.result == 'success') {
					$('#write').val('');

					// renew posting list
					renderPostingList();

				} else {
					alert('post fail!');
				}
			},
			error : function() {
			}
		});
	});

	$(document).on('click', '.post-edit', function() {
		var seq = $(this).closest('section').attr('id');
		seq = seq.substring(11); //2
		$(document).on('click', '#post-edit-submit', function() {
			var content = $('#post_edit_area').val();
			$.ajax({
				url : 'http://localhost:8080/postPosting?type=2',
				method : 'post',
				dataType : 'json',
				data : {
					seq : seq,
					content : content
				},
				success : function(res) {
					$('#post_edit_area').val('');
					$.modal.close();
					renderPostingList();
				}
			});
		});
	});

	function handleRaty() {
		$('span.raty').raty({
			score : function() {
				return $(this).attr('data-score');
			}
		});

		// List
		$('span.raty-view').raty({
			score : function() {
				return $(this).attr('data-score');
			},
			readOnly : true,
		});
	}

	function getNowDate() {
		// GET CURRENT DATE
		var date = new Date();

		// GET YYYY, MM AND DD FROM THE DATE OBJECT
		var yyyy = date.getFullYear().toString();
		var mm = (date.getMonth() + 1).toString();
		var dd = date.getDate().toString();

		// CONVERT mm AND dd INTO chars
		var mmChars = mm.split('');
		var ddChars = dd.split('');

		// CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
		var datestring = yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0])
				+ '-' + (ddChars[1] ? dd : "0" + ddChars[0]);

		return datestring;
	}

});