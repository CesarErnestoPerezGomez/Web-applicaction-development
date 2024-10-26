Native modules

Create a new Node.js project 

Create a new file (file1.txt) at the same level of your index.js file

Put some text in it and save it.

Using the copyFileSync method of the file system module, create a copy (file2.txt)


Before looking at the answer, please give it a try on your own.

Solution
index.js

const fs = require("fs");

fs.copyFileSync("file1.txt", "file2.txt");


file1.txt

	This is file1.txt


Execute the file from command line

>  node index.js

Create a new Node.js project 

Create a new file (file1.txt) at the same level of your index.js file

Put some text in it and save it.

Using the readFile method open the file and display its content in the command line


Before looking at the answer, please give it a try on your own.

Solution
index.js

const fs = require("fs");

fs.readFile("file1.txt", (err, data) => {

    if (!err) {

        console.log('data: ' + data);

    } else {

        console.log(err);

    }

});


file1.txt

	This is file1.txt


Execute the file from command line

>  node index.js

Create a new Node.js project 

Using the writeFile method create the file 'helloworld.txt' and write 'Hello world!'

Display the content of the file to the console at the end.


Before looking at the answer, please give it a try on your own.

Solution
index.js

const fs = require('fs');

fs.writeFile('helloworld.txt', 'Hello World!', (err) => {

  if (err) return console.log(err);

  console.log('Hello World > helloworld.txt');

});


Execute the file from command line

>  node index.js

External modules

Create a new Node.js project 

Initialize npm

Search for the superheroes package in npm repo

Install the superheroes package

Print the name of any random superheroe to the console


Before looking at the answer, please give it a try on your own.

Solution
Execute the file from command line

> npm init

> npm install superheroes


index.js

var sh = require("superheroes");

var mySHname = sh.random();

console.log("Fear not! Here is " + mySHname);


Execute the file from command line

>  node index.js

Starting from the previous exercise 

Install the supervillains package

Advertise the battle of the century between a random super heroe and his nemesis


Before looking at the answer, please give it a try on your own.

Solution
Execute the file from command line

> npm install supervillains


index.js

var sh = require("superheroes");

var sv = require("supervillains");

var mySHname = sh.random();

var mySVname = sv.random();

console.log("- Look it is " + mySVname + " ready to do its evil deeds!\n- Who could save us!\n- Fear not! Here is " + mySHname + " to the rescue!");


Execute the file from command line

>  node index.js
