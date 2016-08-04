documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92*documentWidth;
cellSideLength = 0.18*documentWidth;
cellSpace = 0.04*documentWidth;

//取得指定方格的top值
function getPosTop(i, j){
	return cellSpace + i*(cellSpace+cellSideLength);
}
//取得指定方格的left值
function getPosLeft(i, j){
	return cellSpace + j*(cellSpace+cellSideLength);
}
//获取数字的背景色
function getNumberBackgroundColor(num){
	let color = '#fff';
	switch(num){
		case 2:color='#eee4da';break;
		case 4:color='#ede0c8';break;
		case 8:color='#f2b179';break;
		case 16:color='#f59563';break;
		case 32:color='#f67c5f';break;
		case 64:color='#f65e3b';break;
		case 128:color='#edcf72';break;
		case 256:color='#edcc61';break;
		case 562:color='#9c0';break;
		case 1024:color='#33b5e5';break;
		case 2048:color='#09c';break;
		case 4096:color='#a6c';break;
		case 8192:color='#93c';break;
	}
	return color;
}
//获取数字的颜色
function getNumberColor(num){
	if(num <= 4){
		return '#776e65';
	}
	return '#000';
}
//检查数组中是否还有空位，即0位
function nospace(board){
	for(let i = 0; i < 4; i++){
		for(let j = 0; j < 4; j++){
			if(board[i][j] === 0){
				return false;
			}
		}
	}
	return true;
}
//是否可以左移
function canMoveLeft(board){
	for(let i = 0; i < 4; i++){
		for(let j = 1; j < 4; j++){
			if(board[i][j] != 0){
				if(board[i][j-1] === 0 || board[i][j-1] === board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//是否可以上移
function canMoveUp(board){
	for(let i = 1; i < 4; i++){
		for(let j = 0; j < 4; j++){
			if(board[i][j] != 0){
				if(board[i-1][j] === 0 || board[i-1][j] === board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//是否可以右移
function canMoveRight(board){
	for(let i = 0; i < 4; i++){
		for(let j = 0; j < 3; j++){
			if(board[i][j] != 0){
				if(board[i][j+1] === 0 || board[i][j+1] === board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//是否可以下移
function canMoveDown(board){
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 4; j++){
			if(board[i][j] != 0){
				if(board[i+1][j] === 0 || board[i+1][j] === board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断x轴两个格子之间是否有障碍物
function noBlockHorizontal(row, col1, col2, board){
	for(let i = col1+1; i < col2; i++){
		if(board[row][i] != 0){
			return false;
		}
	}
	return true;
}
//判断y轴两个格子之间是否有障碍物
function noBlockVertical(col, row1, row2, board){
	for(let i = row1+1; i < row2; i++){
		if(board[i][col] != 0){
			return false;
		}
	}
	return true;
}
//判断游戏还可不可以移动
function nomove(board){
	if(canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board)){
		return false;
	}
	return true;
}
//个性化
function individuation(num){
	let str = '#fff';
	switch(num){
		case 2:str='&#xe623;';break;
		case 4:str='&#xe617;';break;
		case 8:str='&#xe66e;';break;
		case 16:str='&#xe627;';break;
		case 32:str='&#xe632;';break;
		case 64:str='&#xe61e;';break;
		case 128:str='&#xe65f;';break;
		case 256:str='&#xe66a;';break;
		case 562:str='&#xec4b;';break;
		case 1024:str='&#xe65c;';break;
		case 2048:str='&#xe698;';break;
		case 4096:str='&#xe62a;';break;
		case 8192:str='&#xe603;';break;
	}
	return str;
}