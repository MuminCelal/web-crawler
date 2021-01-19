const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const urls = require('./urls');

urls.forEach((url) => {
    axios(url)
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                const scrapedData = [];
                const tableHeaders = [];
                const valueSetTable = $('.codes > tbody > tr');
                const title = $('title').text();

                valueSetTable.each((index, element) => {
                    if (index === 0) {
                        const headers = $(element).find('td');

                        $(headers).each((index, header) => {
                            tableHeaders.push($(header).text().toLocaleLowerCase().trim());
                        });

                        return true;
                    } else {
                        const body = $(element).find('td');
                        const tableRow = {};

                        $(body).each((index, item) => {
                            tableRow[tableHeaders[index]] = $(item).text().trim();
                        });

                        scrapedData.push(tableRow);
                    }

                    fs.writeFileSync(`./data/${title}.json`, JSON.stringify(scrapedData));
                });
            } else {
                throw new Error();
            }
        })
        .catch((error) => console.log(error));
});
