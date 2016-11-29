(() => {
	let board = new Array();
	let score = 0;
	let hasConflicted = new Array();
	let startx = 0;
	let starty = 0;
	let endx = 0;
	let endy = 0;
	$(document).ready(() => {
		prepareForMobile();
		newgame();
		$('#newgamebutton').click((e) => {
			e.preventDefault();
			$('#gameover-dialog').hide(200);
			newgame();
		});
	});
	//屏幕适配
	function prepareForMobile(){
		if(documentWidth > 500){
			gridContainerWidth = 500;
			cellSideLength = 100;
			cellSpace = 20;
		}
		$('#grid-container').css({
			width:gridContainerWidth - 2*cellSpace,
			height:gridContainerWidth - 2*cellSpace,
			padding:cellSpace,
			borderRadius:0.02*gridContainerWidth,
		});
		$('.grid-cell').css({
			width:cellSideLength,
			height:cellSideLength,
			borderRadius:0.1*cellSideLength,
		});
	}
	function newgame(){
		init();
		generateOneNumber();
		generateOneNumber();
	}
	//游戏初始化
	function init(){
		score = 0;
		updateScore(score);
		for(let i = 0; i < 4; i++){
			for(let j = 0; j < 4; j++){
				let gridCell = $('#grid-cell-'+i+'-'+j);
				gridCell.css('top', getPosTop(i, j)+'px');
				gridCell.css('left', getPosLeft(i, j)+'px');
			}
		}
		for(let i = 0; i < 4; i++){
			board[i] = new Array();
			hasConflicted[i] = new Array();
			for(let j = 0; j < 4; j++){
				board[i][j] = 0;
				hasConflicted[i][j] = false;
			}
		}
		updateBoardView();
		score = 0;
	}
	//更新界面
	function updateBoardView(){
		$('.number-cell').remove();
		for(let i = 0; i < 4; i++){
			for(let j = 0 ; j < 4; j++){
				$('#grid-container').append(`<div class="number-cell iconfont" id="number-cell-${i}-${j}"></div>`);
				let theNumberCell = $(`#number-cell-${i}-${j}`);
				if(board[i][j] === 0){
					theNumberCell.css({
						width:'0px',
						height:'0px',
						top:getPosTop(i, j)+cellSideLength/2+'px',
						left:getPosLeft(i, j)+cellSideLength/2+'px',
					});
				}else{
					theNumberCell.css({
						'width':cellSideLength,
						'height':cellSideLength,
						'top':getPosTop(i, j)+'px',
						'left':getPosLeft(i, j)+'px',
						'background-color':getNumberBackgroundColor(board[i][j]),
						'color':getNumberColor(board[i][j]),
					}).html(individuation(board[i][j]));
				}
				hasConflicted[i][j] = false;
			}
		}
		$('.number-cell').css({
			lineHeight:cellSideLength+'px',
			fontSize:cellSideLength*0.6+'px',
			borderRadius:0.1*cellSideLength,
		});
	}
	//在随机的位置产生一个随机数字（2或4）
	function generateOneNumber(){
		if(nospace(board)){
			return false;
		}
		let randx = parseInt(Math.floor(Math.random() * 4));
		let randy = parseInt(Math.floor(Math.random() * 4));
		let times = 0;
		while(times < 50){
			if(board[randx][randy] === 0){
				break;
			}
			randx = parseInt(Math.floor(Math.random() * 4));
			randy = parseInt(Math.floor(Math.random() * 4));
			times++;
		}
		if(times === 50){
			for(let i = 0; i < 4; i++){
				for(let j = 0; j < 4; j++){
					if(board[i][j] === 0){
						randx = i;
						randy = j;
					}
				}
			}
		}
		let randNumber = Math.random() < 0.5 ? 2 : 4;
		board[randx][randy] = randNumber;
		showNumberWithAnimation(randx, randy, randNumber);
		return true;
	}
	//键盘事件
	$(document).keydown((event) => {
		switch(event.keyCode){
			case 37:
				event.preventDefault();
				if(moveLeft()){
					setTimeout(() => generateOneNumber(), 210);
					setTimeout(() => isgameover(), 300);
				}
				break;
			case 38:
				event.preventDefault();
				if(moveUp()){
					setTimeout(() => generateOneNumber(), 210);
					setTimeout(() => isgameover(), 300);
				}
				break;
			case 39:
				event.preventDefault();
				if(moveRight()){
					setTimeout(() => generateOneNumber(), 210);
					setTimeout(() => isgameover(), 300);
				}
				break;
			case 40:
				event.preventDefault();
				if(moveDown()){
					setTimeout(() => generateOneNumber(), 210);
					setTimeout(() => isgameover(), 300);
				}
				break;
			default:
				break;
		}
	});
	//触控事件
	document.addEventListener('touchstart', function(event){
		startx = event.touches[0].pageX;
		starty = event.touches[0].pageY;
	});
	document.addEventListener('touchend', function(event){
		endx = event.changedTouches[0].pageX;
		endy = event.changedTouches[0].pageY;
		let deltx = endx - startx;
		let delty = endy - starty;
		if(Math.abs(deltx)<0.1*documentWidth && Math.abs(delty)<0.1*documentWidth){
			return;
		}
		if(Math.abs(deltx) >= Math.abs(delty)){
			if(deltx > 0){
				if(moveRight()){
					setTimeout(() => generateOneNumber(), 210);
					setTimeout(() => isgameover(), 300);
				}
			}else{
				if(moveLeft()){
					setTimeout(() => generateOneNumber(), 210);
					setTimeout(() => isgameover(), 300);
				}
			}
		}else{
			if(delty > 0){
				if(moveDown()){
					setTimeout(() => generateOneNumber(), 210);
					setTimeout(() => isgameover(), 300);
				}
			}else{
				if(moveUp()){
					setTimeout(() => generateOneNumber(), 210);
					setTimeout(() => isgameover(), 300);
				}
			}
		}
	});
	//游戏是否结束
	function isgameover(){
		if(nospace(board) && nomove(board)){
			gameover();
		}
	}
	//游戏结束的函数
	function gameover(){
		$('#gameover-dialog').show(400);
	}
	//左移函数
	function moveLeft(){
		if(!canMoveLeft(board)){
			return false;
		}
		for(let i = 0; i < 4; i++){
			for(let j = 1; j < 4; j++){
				if(board[i][j] != 0){
					for(let k = 0; k < j; k++){
						if(board[i][k] === 0 && noBlockHorizontal(i, k, j, board)){
							showMoveAnimation(i, j, i, k);
							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]){
							showMoveAnimation(i, j, i, k);
							board[i][k] += board[i][j];
							board[i][j] = 0;
							score += board[i][k];
							updateScore(score);
							hasConflicted[i][k] = true;
							continue;
						}
					}
				}
			}
		}
		setTimeout(() => updateBoardView(), 200);
		return true;
	}
	//右移函数
	function moveRight(){
		if(!canMoveRight(board)){
			return false;
		}
		for(let i = 0; i < 4; i++){
			for(let j = 2; j >= 0; j--){
				if(board[i][j] != 0){
					for(let k = 3; k > j; k--){
						if(board[i][k] === 0 && noBlockHorizontal(i, j, k, board)){
							showMoveAnimation(i, j, i, k);
							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[i][k] === board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]){
							showMoveAnimation(i, j, i, k);
							board[i][k] += board[i][j];
							board[i][j] = 0;
							score += board[i][k];
							updateScore(score);
							hasConflicted[i][k] = true;
							continue;
						}
					}
				}
			}
		}
		setTimeout(() => updateBoardView(), 200);
		return true;
	}
	//上移函数
	function moveUp(){
		if(!canMoveUp(board)){
			return false;
		}
		for(let i = 1; i < 4; i++){
			for(let j = 0; j < 4; j++){
				if(board[i][j] != 0){
					for(let k = 0; k < i; k++){
						if(board[k][j] === 0 && noBlockVertical(j, k, i, board)){
							showMoveAnimation(i, j, k, j);
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[k][j] === board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]){
							showMoveAnimation(i, j, k, j);
							board[k][j] += board[i][j];
							board[i][j] = 0;
							score += board[k][j];
							updateScore(score);
							hasConflicted[k][j] = true;
							continue;
						}
					}
				}
			}
		}
		setTimeout(() => updateBoardView(), 200);
		return true;
	}
	//下移函数
	function moveDown(){
		if(!canMoveDown(board)){
			return false;
		}
		for(let i = 2; i >= 0; i--){
			for(let j = 0; j < 4; j++){
				if(board[i][j] != 0){
					for(let k = 3; k > i; k--){
						if(board[k][j] === 0 && noBlockVertical(j, i, k, board)){
							showMoveAnimation(i, j, k, j);
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[k][j] === board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]){
							showMoveAnimation(i, j, k, j);
							board[k][j] += board[i][j];
							board[i][j] = 0;
							score += board[k][j];
							updateScore(score);
							hasConflicted[k][j] = true;
							continue;
						}
					}
				}
			}
		}
		setTimeout(() => updateBoardView(), 200);
		return true;
	}

})();