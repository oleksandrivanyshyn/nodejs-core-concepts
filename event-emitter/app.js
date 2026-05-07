const EventEmitter = require('./events');

class Emitter extends EventEmitter {}

const myE = new Emitter();

myE.on('foo', () => console.log('event emitted 1'));
myE.on('foo', () => console.log('event emitted 2'));
myE.on('foo', (x) => {
    console.log('event emitted with data');
    console.log(x);
});
myE.once('bar', () => console.log('An event emitted bar'));

myE.emit('foo');
myE.emit('foo', 'some data');

myE.emit('bar');
myE.emit('bar');
myE.emit('bar');
myE.emit('bar');
myE.emit('bar');
myE.emit('bar');

