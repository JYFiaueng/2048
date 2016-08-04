$.fn.dialog = function(){
	$(this).css({
		position: 'fixed',
		left: '0',
		top: '0',
		right: '0',
		bottom: '0',
		width: '300px',
		height: '200px',
		fontFamily: 'Arial',
		fontWeight: 'bold',
		borderRadius: '10px',
		margin: 'auto',
		lineHeight: '200px',
		fontSize: '40px',
		backgroundColor: '#aa9',
		textAlign: 'center',
		display:'none',
	});
	$(this).append(`<span></span>`);
	let span = $(this).find('span');
	span.css({
		position:'absolute',
		top:'5px',
		right:'5px',
		width:'30px',
		height:'30px',
		border:'1px solid #aaa',
		borderRadius:'15px',
		backgroundColor:'#a43',
		cursor:'pointer',
		boxShadow:'0 0 0 5px #f00 inset,0 0 0 10px #0f0 inset,0 0 0 25px #00f inset',
	});
	span.hover(() => {
		span.css({
			backgroundColor:'#a63',
		})
	}, () => {
		span.css({
			backgroundColor:'#a43',
		})
	});
	span.click(() => {
		$(this).hide(200);
	});
};

$(document).ready(() => {
	$('#gameover-dialog').dialog();
});