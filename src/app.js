import $ from 'jquery';
import Rx from 'rxjs/Rx';

const btn = $("#btn");
const input = $("#input");


// Reactive programming works with asynchronous data streams. 
// It is a programming paradigm for handling events. 
// A stream is a sequence of events. You can get the data, an error, and a completed signal from a stream. 

// These streams can be many things: 
// UI events 
// HTTP requests 
// File Systems 
// Array-like Objects 
// Memory/Cache 

// An observable can be thought of as an array that is built over time, they emit functions 
// when a value, error, or completed signal is returned. 
// You can loop over this array in the dimension of time by subscribing to it with an observer. 
// Constantly watch streams and update accordingly. 

// RXJS provides a long list of operators that allow for filtering, selecting, transforming, combining, and composing observables. 


// SUBSCRIBING TO OBSERVABLES LISTENING TO DOM ELEMENTS.

// an observable for the stream.
const btnStream$ = Rx.Observable.fromEvent(btn, 'click');

// subscribe to the observable to get data
btnStream$.subscribe(
    //log event
    (e) => {
        console.log(e)
    },
    //log error
    (err) => {
        console.log(err)
    },
    //log completion
    () => {
        console.log('Completed');
    }
);

// an observable for the stream.
const inputStream$ = Rx.Observable.fromEvent(input, 'keyup');

// subscribe to the observable to get data, gives a constant stream
inputStream$.subscribe(
    //log event
    (e) => {
        console.log(e)
    },
    //log error
    (err) => {
        console.log(err)
    },
    //log completion
    () => {
        console.log('Completed');
    }
);

// an observable for the stream.
const moveStream$ = Rx.Observable.fromEvent(document, 'mousemove');

// subscribe to the observable to get data, gives a constant stream
moveStream$.subscribe(
    //log event
    (e) => {
        console.log(e); 
    },
    //log error
    (err) => {
        console.log(err)
    },
    //log completion
    () => {
        console.log('Completed');
    }
);

// CREATE OBSERVABLES FROM ARRAY LIKE OBJECTS.

const numbers = [33,44,55,66,77]

// An observable sequence from the numbers array.
const numbers$ = Rx.Observable.from(numbers);

numbers$.subscribe(
    v => {
        // outputs an observable sequence
        console.log(v);
    },
    err => {
        console.log(err);
    },
    complete => {
        // since it is a static array, when it gets to the end it will ouput completed,
        // unlike an event.
        console.log("completed")
    }
);

const posts = [
    {title: 'Post One', body: "Body"},
    {title: 'Post Two', body: "Body"},
    {title: 'Post Three', body: "Body"}
]

const posts$ = Rx.Observable.from(numbers);

posts$.subscribe(
    v => {
        // outputs an observable sequence
        console.log(v);
    },
    err => {
        console.log(err);
    },
    complete => {
        console.log("completed")
    }
);

// OBSERVABLES FROM SCRATCH

const source$ = new Rx.Observable(
    observer => {
        console.log('Creating observable');

        // emit values from a stream that is constantly open
        observer.next('Hello World');
        observer.next('Another Value')

        observer.error(new Error("Error"));

        setTimeout(() => {
            observer.next('Yet another value')
            // close the stream
            observer.complete();
        }, 3000);
    }
);

source$
.catch(err => Rx.Observable.of(err))
.subscribe(
    x => {
        console.log(x)
    },
    err => {
        console.log(err)
    },
    complete => {
        console.log('completed');
    }
)

// OBSERVABLES FROM A PROMISE

const myPromise = new Promise((resolve, reject) => {
    console.log('Creating promise');
    setTimeout(() => {
        resolve('Promise value received');
    }, 3000);
});

// const promise$ = Rx.Observable.fromPromise(myPromise);

// promise$.subscribe(x => console.log(x));

function getUser(username) {
    return $.ajax({
        url: 'https://api.github.com/users/'+username,
        dataType: 'jsonp'
    }).promise();
}

Rx.Observable.fromPromise(getUser('shanetorres'))
    .subscribe(x => {
        console.log(x);
    });