

//Show/Hide Login ModalPopup
var modal = (function(){
	var modalElem = "<div id='modal'></div>"
	var a = 'a';
	
	return {
		open : function(){
			$(modalElem).show();
		},
		close : function(){
			$(modalElem).hide();
		},
		setA : function(newA){
			a = newA;
		}
	}
})();


var a = function(){}
