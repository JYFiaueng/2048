//在指定位置显示指定数字的动画
function showNumberWithAnimation(i, j, randNum){
	var numberCell = $(`#number-cell-${i}-${j}`);
	numberCell.css({
		'background-color':getNumberBackgroundColor(randNum),
		'color':getNumberColor(randNum)
	}).html(individuation(randNum));
	numberCell.animate({
		width: cellSideLength,
		height: cellSideLength,
		top: getPosTop(i, j)+'px',
		left: getPosLeft(i, j)+'px',
	}, 50);
}
//将格子从一个位置移动到另一个位置
function showMoveAnimation(fromx, fromy, tox, toy){
	let numberCell = $(`#number-cell-${fromx}-${fromy}`);
	numberCell.animate({
		top:getPosTop(tox, toy)+'px',
		left:getPosLeft(tox, toy)+'px',
	}, 200);
}
//刷新屏幕分数
function updateScore(score){
	$('#score').text(score);
}