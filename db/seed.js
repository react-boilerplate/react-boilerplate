const request = require('request');
const _ = require('lodash');

const Book = require('./book');
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

const removeSymbols = (string) => string.replace(/(<br>)|(<\/?i>)|(&mdash;)|(<\/?b>)|(&#160;)|(&rsquo;)|(&hellip)|(&quot;)|(&#[0-9]+);/g, '');

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

/* eslint-disable arrow-body-style */

promisifiedRequest(`https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors/${process.env.AUTHOR_ID}/titles?rows=0&api_key=${process.env.PRH_API_KEY}`)
  .then((res) => JSON.parse(res).data)
  .then((data) => {
    const titlesForDb = data.titles.map(({ title, subtitle, _links, isbn, publisher, seoFriendlyUrl }) => {
      return {
        title,
        subtitle,
        imgSrc: _links[1].href,
        isbn,
        publisher: publisher.description,
        publisherUrl: `https://www.penguinrandomhouse.com${seoFriendlyUrl}`,
      };
    });
    return Book.create(titlesForDb);
    // return titlesForDb;
  })
  .then((createdTitles) => {
    const viewURLs = createdTitles.map((title) => `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/titles/${title.isbn}/views/product-display?suppressLinks=true&api_key=${process.env.PRH_API_KEY}`);
    const viewPromises = viewURLs.map((url) => promisifiedRequest(url));
    return Promise.all(viewPromises);
  })
  .then((viewsArray) => {
    return viewsArray.map((view) => {
      const parsedView = JSON.parse(view);
      const praise = parsePraises(extractPraises(parsedView.data.praises));
      const description = removeSymbols(parsedView.data.frontlistiestTitle.aboutTheBook);
      const { isbn } = parsedView.data.frontlistiestTitle;
      return Book.update({ isbn }, { praise, description });
    });
  })
  .catch(console.error);

  // next steps are to actually hook this up to the db
  // data should be in the correct format
