import keys from 'lodash/keys';

export const extractPraises = (praisesObj) => praisesObj[keys(praisesObj)[0]];

export const parsePraises = (unparsed) => {
  const split = unparsed.split('</i><br>');
  return split.map((unparsedItem) => {
    const [quoteWithBr, quoteByWithBr] = unparsedItem.split('<br> &mdash;');
    const quote = quoteWithBr ? quoteWithBr.replace(/<br>/g, '').replace(/<\/?i>/g, '') : '';
    const quoteBy = quoteByWithBr ? quoteByWithBr.replace(/<br>/g, '').replace(/<\/?i>/g, '') : '';
    return { quote, quoteBy };
  });
};
