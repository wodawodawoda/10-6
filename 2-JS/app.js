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
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete').text('x');
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

		// Watch column creation buttons
		$columnDelete.click(function() {
			self.removeColumn();
		});
		$columnAddCard.click(function() {
			self.addCard(new Card(prompt('Enter the name of the card')));
		});

		// Append column
		$column.append($columnTitle)
			.append($columnDelete)
			.append($columnAddCard)
			.append($columnCardList);
		return $column;
	}
}





//END
})