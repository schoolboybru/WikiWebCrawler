let searchUrl= 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';

let userInput;

let counter  = 0;

function setup(){
    noCanvas();
    userInput = select('#userinput');
    userInput.changed(startSearch);
    //goWiki(userInput.value());

    function startSearch(){
        counter = 0;
        goWiki(userInput.value());
    }

    function goWiki(term){
        //let term = userInput.value();
        counter = counter + 1;
        if (counter < 10) {
            let url = searchUrl + term;
            loadJSON(url, gotSearch, 'jsonp');
        }
    }

    function gotSearch(data){
        console.log(data);
        let len = data[1].length;
        let index = floor(random(len));
        var title = data[1][index];
        createDiv(title);
        title = title.replace(/\s+/g,'_');


        let url = contentUrl + title;
        loadJSON(url, gotContent, 'jsonp' )
        
    }
    
    function gotContent(data) {
        let page = data.query.pages;
        let pageId = Object.keys(data.query.pages)[0];
        console.log(pageId);
        let content = page[pageId].revisions[0]['*'];
        console.log(content);
        let wordRegex = /\b\w{4,}\b/g;
        var words = content.match(wordRegex);
        var word = random(words);
        goWiki(word);
        console.log(word);
    }
}