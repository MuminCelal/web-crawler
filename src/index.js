const chalk = require('chalk');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const data = require('./data.json');

console.log(chalk.yellow('web-crawler started'));

// TODO: Get input file from command line
// TODO: Get output folder name from command line
// TODO: Set different options to craw it (table, span, div etc.)
// TODO: Create output folder is not exist or delete it on every crawling process
// TODO: Get name for the output file
// TODO: Get more than one dom element setting to find and craw (.codes > tbody > tr OR .none > tbody > tr)
// TODO: Set data selection option, get all if not set (code, display, system => code, display)
// TODO: Support more than one file type support for output (.json, .csv, .docx, .pdf, .html)
// TODO: Add config file

data.forEach(async (item) => {
  try {
    const response = await axios.get(item.url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
    }

  } catch (error) {
    console.log('error');
  }
});


// urls.forEach((url) => {
//     axios(url)
//         .then((response) => {
//             if (response.status === 200) {
//                 const html = response.data;
//                 const $ = cheerio.load(html);
//                 const scrapedData = [];
//                 const tableHeaders = [];
//                 const valueSetTable = $('.codes > tbody > tr');
//                 const title = $('title').text();

//                 valueSetTable.each((index, element) => {
//                     if (index === 0) {
//                         const headers = $(element).find('td');

//                         $(headers).each((index, header) => {
//                             tableHeaders.push($(header).text().toLocaleLowerCase().trim());
//                         });

//                         return true;
//                     } else {
//                         const body = $(element).find('td');
//                         const tableRow = {};

//                         $(body).each((index, item) => {
//                             tableRow[tableHeaders[index]] = $(item).text().trim();
//                         });

//                         scrapedData.push(tableRow);
//                     }

//                     fs.writeFileSync(`./data/${title}.json`, JSON.stringify(scrapedData));
//                 });
//             } else {
//                 throw new Error();
//             }
//         })
//         .catch((error) => console.log(error));
// });
