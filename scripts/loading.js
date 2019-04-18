var loadingPage = document.getElementById("loading-page");
var loadingQuoteArr = [
	"Short stories, tragic endings.",
	"Nobody is going to give a Fuck.",
	"Our knowledge is a receding Mirage in an ever expanding desert of ignorance.",
	"All I am is smoke and mirrors, a mirage.",
	"The system does not control one, but one controls the system."
];

var randomQuote = loadingQuoteArr[Math.floor(Math.random() * loadingQuoteArr.length)];

var loadingPageQuote = document.getElementById("quote-generator");
loadingPageQuote.innerHTML = randomQuote;
