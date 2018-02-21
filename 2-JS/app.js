$(function() {

function randomString() {
	let chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	let str = '';
	for (let i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}

//...................................................

function Column(name) {
	var self = this;
	this.id = randomString();
	this.name = name;
	this.$element = createColumn();

	function createColumn() {
		// Create column elements
		var $column = $('<div>').addClass('column');
		var $columnHeader = $('<div>').addClass('column__header');
		var $columnTitle = $('<h2>').addClass('title').text(self.name);
		var $columnCardList = $('<ul>').addClass('card-list');
		var $columnDelete = $('<button>').addClass('btn btn-delete').text('Delete column');
		var $columnAddCard = $('<button>').addClass('btn btn-add').text('+');
		var $columnForm = $('<div>').addClass('select-wrapper');
		var $columnSelect = $('<select>').addClass('select select__add');
		var $columnOption = $('<option>').addClass('select__option');

		// Watch column creation buttons
		$columnDelete.click(function() {
			self.removeColumn();
		});
		$columnAddCard.click(function() {
			self.addCard(new Card(prompt('Enter the name of the card')));
		});


		// Append column
		$columnSelect
			.append($columnOption.val('#FE0000').text('High priority'))
			.append($columnOption.clone().val('#FFFF01').text('Normal priority'))
			.append($columnOption.clone().val('#0100FC').text('Low priority'));
		$columnForm
			.append($columnSelect)
			.append($columnAddCard);
		$column
			.append($columnTitle)
			.append($columnDelete)
			.append($columnForm)
			.append($columnCardList);

		return $column;
	}
}

Column.prototype = {
	addCard: function(card) {
		var selectValue = this.$element.children('.select-wrapper').children('select').val();
		this.$element.children('ul').append(card.$element);
		this.$element.children('ul').children('li').children('p').last().css('background', selectValue)
	},
	removeColumn: function() {
		var self = this;
		this.$element.hide(1000, function(){ self.$element.remove(); });

		// this.$element.remove();
	}
};

//.......................................................

function Card(description) {
	var self = this;
	this.id = randomString();
	this.description = description;
	this.$element = createCard();

	function createCard(name) {
		var $card = $('<li>').addClass('card')
		var $cardDescription = $('<p>').addClass('card__description').text(self.description);
		var $cardDelete = $('<button>').addClass('btn btn-delete').text('x');

		$cardDelete.click(function() {
			self.removeCard();
		});

		$card
			.append($cardDescription)
			.append($cardDelete);
		return $card;
	}
}

Card.prototype = {
	removeCard: function() {
		let self = this;
		// this.$element.remove();
		this.$element.slideUp("slow", function() { self.$element.remove();});
		// this.$element.fadeTo(1000, 0.01, function(){ 
		//     $(this).slideUp(150, function() {
		//         $(this).remove(); 
		//     }); 
		// });

	}
};

//.......................................................

function Board(title) {
	var self = this;
	this.id = randomString();
	this.title = title;
	this.$element = createBoard();

	function createBoard() {
		var $board = $('<div>').addClass('board');
		var $boardHeader = $('<div>').addClass('board__header');
		var $boardTitle = $('<h1>').text(self.title);
		var $boardDelete = $('<button>').addClass('board__delete btn btn-delete').text('x');
		var $boardAddColumn = $('<button>').addClass('board__header__button btn btn-add create-column').text('Add a column')
		var $boardColumnContainer = $('<div>').addClass('column-container')

		$boardDelete.click(function() {
			self.removeBoard();
		});
		$boardAddColumn.click(function() {
			var name = prompt('Enter a column name:');
			var column = new Column(name);
			self.addColumn(column);
		});
		
		$boardHeader.append($boardTitle).append($boardAddColumn);
		$board
			.append($boardHeader)
			.append($boardDelete);
		$board.append($boardColumnContainer);
		return $board;
	}
}

Board.prototype = {
	removeBoard: function() {
		let self = this
		this.$element.hide(500, 'linear',function(){ self.$element.remove(); });
	},
	addColumn: function(column) {
		this.$element.children('.column-container').append(column.$element);
		initSortable();
	},
	$element: $('.column-container')
};

//.......................................................

function initSortable() {
	$('.card-list').sortable({
		connectWith: '.card-list',
		placeholder: 'card__placeholder'
	}).disableSelection();
}

$('.board-create').click(function() {
	var title = prompt('Enter board title');
	var brd = new Board(title); 
	$('body').append(brd.$element);
});
//..............................................

// Global or not global
const starter = new Board('New kanban');
const todoColumn = new Column('To do');
const doingColumn = new Column('Doing');
const doneColumn = new Column('Done');
const card1 = new Card('Fix colors')
const card2 = new Card('Fix append animations')
const card3 = new Card('Fix initSortable bug')
todoColumn.addCard(card2);
todoColumn.addCard(card1);
starter.addColumn(todoColumn);
starter.addColumn(doingColumn);
starter.addColumn(doneColumn);
$('body').append(starter.$element);


// BUG: initSortable start working only after click 'Add a column'



//................................................
//END

});