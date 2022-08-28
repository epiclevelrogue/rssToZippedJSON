let Parser = require('rss-parser');
let parser = new Parser();
const JSZip = require('jszip');
const fs = require('fs');
const zip = new JSZip();
/* 2 npm items are required rss-parser and jszip
 * run in the terminal
 * npm install --save rss-parser  https://www.npmjs.com/package/rss-parser
 * npm install jszip https://stuk.github.io/jszip/
 * */

(async () => {

//this link is pointing to an RSS aggregate feed. It can be admined from the RSS.app site and expanded. Currently the feed will just push everything but we need a way to approve posts for quality. IDK the best method for accomplishing this. 
	let feed= await parser.parseURL('https://rss.app/feeds/tTBC1i5We7PRpIjh.xml');
	feed.items.forEach((item) => { //loop over the feed
//write the JSON
			let {url:u, length:l, type:t} = item.enclosure; 
			let str = '{"type": "intel"';
			str+=',"title":"';
			str+=item.title;
			str+='","link":"';
			str+=item.link;
			str+='","imagelink":"';
			str+=u;
			str+='","uid":"';
			str+=item.guid;
			str+='","hero_image":"';
			str+=u;
			str+='","author:"';
			str+=item['dc:creator'];
			str+='","content":"';
			str+=item.content;
			str+='","source":"';
			str+=item.creator;
			str+='"}';


			const zip = new JSZip(); //JSZip library 
			var filename = item.guid.toString();//  set the name of the zip to the GUID
			filename+='.json'; //set the name to include the file type

			zip.file(filename,str); //create the file as an object
			zip.generateNodeStream({type: 'nodebuffer', streamFiles: true })
				.pipe(fs.createWriteStream(item.title)); //write the file

	});

	})();

/*Still to do, we need to true up the JSON we write to the actual import JSON and tie the JSON to that. 

*/
