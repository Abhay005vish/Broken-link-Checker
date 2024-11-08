// src/controllers/linkChecker.js
const axios = require('axios');
const cheerio = require('cheerio');

const checkLinks = async (url) => {
  try {
    // Fetch HTML from the URL
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const links = [];
    $('a').each((_, element) => {
      const link = $(element).attr('href');
      if (link) links.push(link);
    });

    // Check each link
    const results = await Promise.all(links.map(async (link) => {
      try {
        const response = await axios.get(link);
        return { link, status: response.status };
      } catch (error) {
        return { link, status: 'broken' };
      }
    }));

    return results;
  } catch (error) {
    console.error('Error checking links:', error.message);
    return [];
  }
};

module.exports = { checkLinks };
[
  { "link": "https://example.com", "status": 200 },
  { "link": "https://broken-link.com", "status": 404 }
]

