const request = require('request');
const _ = require('lodash');
const { bgBlue, bgGreen, bgRed, bgYellow, green, yellow, black } = require('chalk');
const bcrypt = require('bcrypt');

const { Book, Article, Author, User } = require('./index');
require('../env-secrets');

const saltRounds = 10;

/* eslint-disable */

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

const getViewUrl = (isbn) => `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/titles/${isbn}/views/product-display?suppressLinks=true&api_key=${process.env.PRH_API_KEY}`;

const removeSymbols = (string) => string.replace(/(<br>)|(<\/?i>)|(&mdash;)|(<\/?b>)|(&#160;)|(&rsquo;)|(&hellip)|(&quot;)|(&#[0-9]+);|"/g, '');

const flattenAuthor = ({ spotlight, _links }) => ({
  about: removeSymbols(spotlight).replace(/&nbsp;/g, ' '),
  imgSrc: _links[0].href,
});

async function seedArticles(articlesUrl) {
  try {
    console.log(bgYellow(black('Beginning articles seeding...')));
    console.log(bgBlue('Searching for existing articles...'));
    const foundArticles = await Article.find({});
    if (foundArticles.length) {
      console.log(bgRed(`Found ${foundArticles.length} articles.  Deleting...`));
      await Article.collection.drop();
    } else {
      console.log(bgGreen(black('Found no articles - proceeding to seed...')));
    }
    const articlesData = await promisifiedRequest(articlesUrl);
    const parsedArticles = JSON.parse(articlesData).response.docs;
    const articles = parsedArticles.map((article) => ({
      title: article.headline.print_headline,
      excerpt: article.snippet,
      url: article.web_url,
      publication: article.source,
      date: article.pub_date,
    }));
    const seededArticles = await Article.create(articles);
    seededArticles.forEach(({ title }) => {
      console.log(green(`Seeded article: ${title}`));
    })
    console.log(bgGreen(black(`Seeded ${seededArticles.length} articles successfully!`)));
  } catch (err) {
    console.error(bgRed('Error seeding articles =>'));
    throw err;
  }
}

const titleMap = {
  'China 1945': 'china-1945.jpeg',
  'The East, the West, and Sex': 'the-east-the-west-and-sex.jpeg',
  'A Girl Named Faithful Plum': 'a-girl-called-faithful-plumb.jpeg',
  'Fragile Glory': 'fragile-glory.jpeg',
  'Dictatorship of Virtue': 'dictatorship-of-virtue.jpeg',
  'The Coming Conflict with China': 'the-coming-conflict-with-china.jpeg',
  'Ultimate Journey': 'ultimate-journey.jpeg',
};

async function seedBooks(titlesUrl) {
  try {
    console.log(bgYellow(black('Beginning books seeding...')));
    console.log(bgBlue('Searching for existing books...'));
    const foundBooks = await Book.find({});
    if (foundBooks.length) {
      console.log(bgRed(`Found ${foundBooks.length} books.  Deleting...`));
      await Book.collection.drop();
    } else {
      console.log(bgGreen(black('Found no books - proceeding to seed...')));
    }
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
        url: `https://www.penguinrandomhouse.com${seoFriendlyUrl}`,
        publisher: publisher.description,
        imgSrc: `https://s3.us-east-2.amazonaws.com/richard-bernstein-books/${titleMap[title]}`,
        praise: praisesArray[index],
        description: descriptionsArray[index],
        repeat: booksHash[title],
      };
      booksHash[title] = true;
      return book;
    })
      .filter((book) => !book.repeat);
    booksArray.forEach((book) => { delete book.repeat; });
    const seededBooks = await Book.create(booksArray);
    seededBooks.forEach(({ title }) => {
      console.log(green(`Seeded book: ${title}`));
    })
    console.log(bgGreen(black(`Seeded ${seededBooks.length} books successfully!`)));
  } catch (err) {
    console.error(bgRed('Error seeding books =>'));
    throw err;
  }
}

async function seedAuthor(authorUrl) {
  try {
    console.log(bgYellow(black('Beginning author seeding...')));
    console.log(bgBlue('Searching for existing author...'));
    const foundAuthor = await Author.find({});
    if (foundAuthor.length) {
      console.log(bgRed(`Found ${foundAuthor.length} author(s).  Deleting...`));
      await Author.collection.drop();
    } else {
      console.log(bgGreen(black('Found no author - proceeding to seed...')));
    }
    const authorData = await promisifiedRequest(authorUrl);
    const author = flattenAuthor(JSON.parse(authorData).data.authors[0]);
    const seededAuthor = await Author.create(author);
    console.log(bgGreen(black('Seeded author successfully!')));
  } catch (err) {
    console.error(bgRed('Error seeding author =>'));
    throw err;
  }
}

async function seedUser() {
  try {
    console.log(bgYellow(black('Beginning user seeding...')));
    console.log(bgBlue('Searching for existing user...'));
    const foundUser = await User.find({});
    if (foundUser.length) {
      console.log(bgRed(`Found ${foundUser.length} user(s).  Deleting...`));
      await User.collection.drop();
    } else {
      console.log(bgGreen(black('Found no user - proceeding to seed...')));
    }
    const password = await bcrypt.hash(process.env.PASSWORD, saltRounds);
    const seededUser = await User.create({
      username: 'richard-bernstein',
      password,
    });
    console.log(bgGreen(black('Seeded user successfully!')));
  } catch (err) {
    console.error(bgRed('Error seeding user =>'));
    throw err;
  }
}

async function seed() {
  try {
    console.log(bgYellow(black('Running database seed process...')));
    console.log(yellow('************************************************************************'));
    await seedBooks(`https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors/${process.env.AUTHOR_ID}/titles?rows=0&api_key=${process.env.PRH_API_KEY}`);
    console.log(yellow('************************************************************************'));
    await seedArticles(`https://developer.nytimes.com/proxy/https/api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.NY_TIMES_API_KEY}&fq=author%3A(%22Richard+Bernstein%22)&sort=newest`);
    console.log(yellow('************************************************************************'));
    await seedAuthor(`https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors/views/list-display?authorId=${process.env.AUTHOR_ID}&api_key=${process.env.PRH_API_KEY}`);
    console.log(yellow('************************************************************************'));
    await seedUser();
  } catch (err) {
    console.error(err)
  } finally {
    console.log(bgYellow(black('Finished seeding.  Exiting...')));
    process.exit();
  }
};

seed();
