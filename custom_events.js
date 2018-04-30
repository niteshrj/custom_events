var events = require('events');

var Foo = function(initial_no) { this.count = initial_no; };

Foo.prototype = new events.EventEmitter;

Foo.prototype.increment = function() {
	var self = this;
	setInterval(function() {
    debugger;
		if(self.count % 2 === 0) self.emit('even');
		self.count++;
	}, 300);
};

var lol = new Foo(1);

lol.on('even', function() {
	console.log('Number is even! :: ' + this.count);
}).increment();
