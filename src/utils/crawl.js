const axios = require('axios');
const { JSDOM } = require('jsdom');

// Function to fetch and parse links from HTML
async function discoverLinks(url) {
  const links = [];

  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // Collect various link types (anchors, images, CSS, JS files)
    links.push(...Array.from(document.querySelectorAll('a')).map((a) => a.href));
    links.push(...Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((link) => link.href));
    links.push(...Array.from(document.querySelectorAll('script[src]')).map((script) => script.src));
    links.push(...Array.from(document.querySelectorAll('img')).map((img) => img.src));
  } catch (error) {
    console.error(`Error discovering links from ${url}:`, error);
  }

  return links.filter((link) => link.startsWith('http'));
}

module.exports = { discoverLinks };
