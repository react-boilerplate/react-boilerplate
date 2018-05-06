const request = require('request');
const _ = require('lodash');

require('./index');
const { Book } = require('./book');
// const Article = require('./article');
require('../env-secrets');

const promisifiedRequest = (url) => new Promise((resolve, reject) => {
  request(url, (err, req, res) => {
    if (err) reject(err);
    else {
      resolve(res);
    }
  });
});

const parsePraises = (unparsed) => {
  if (!unparsed) return [];
  const split = unparsed.split('&ldquo;').slice(1);
  return split.map((unparsedItem) => {
    const [quoteWithBr, quoteByWithBr] = unparsedItem.split('&rdquo;');
    const quote = quoteWithBr ? removeSymbols(quoteWithBr) : '';
    const quoteBy = quoteByWithBr ? removeSymbols(quoteByWithBr) : '';
    return { quote, quoteBy };
  });
};

const extractPraises = (praisesObj) => praisesObj[_.keys(praisesObj)[0]];

async function seedBooks(titlesUrl) {
  try {
    const titlesData = await promisifiedRequest(titlesUrl);
    const { titles } = JSON.parse(titlesData).data;
    const viewUrls = titles.map((title) => getViewUrl(title.isbn));
    const viewPromises = viewUrls.map((url) => promisifiedRequest(url));
    const viewsData = await Promise.all(viewPromises);
    const viewsParsed = viewsData.map((view) => JSON.parse(view).data);
    const praisesArray = viewsParsed.map((view) => {
      const bookPraise = extractPraises(view.praises);
      return parsePraises(bookPraise);
    });
    const descriptionsArray = viewsParsed.map((view) => removeSymbols(view.frontlistiestTitle.aboutTheBook));
    const booksHash = {};
    const booksArray = titles.map(({ isbn, title, subtitle, seoFriendlyUrl, publisher, _links }, index) => {
      const book = {
        isbn,
        title,
        subtitle,
        seoFriendlyUrl,
        publisher: publisher.description,
        imgSrc: _links[1].href,
        praise: praisesArray[index],
        description: descriptionsArray[index],
        repeat: booksHash[title],
      };
      booksHash[title] = true;
      return book;
    })
      .filter((book) => !book.repeat);
    /* eslint-disable no-param-reassign */
    booksArray.forEach((book) => { delete book.repeat; });
    Book.create(booksArray);
  } catch (err) {
    throw err;
  }
}

async function seedArticles() {
  try {
    console.log('Hi!');
  } catch (err) {
    console.error(err);
  }
}

seedBooks(`https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors/${process.env.AUTHOR_ID}/titles?rows=0&api_key=${process.env.PRH_API_KEY}`);
seedArticles();

const getViewUrl = (isbn) => `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/titles/${isbn}/views/product-display?suppressLinks=true&api_key=${process.env.PRH_API_KEY}`;

const removeSymbols = (string) => string.replace(/(<br>)|(<\/?i>)|(&mdash;)|(<\/?b>)|(&#160;)|(&rsquo;)|(&hellip)|(&quot;)|(&#[0-9]+);|"/g, '');
