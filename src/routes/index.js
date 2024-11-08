const express = require('express');
const { checkLinks } = require('../controllers/linkChecker');
const router = express.Router();

// POST route to check links
router.post('/check-links', async (req, res) => {
  const { url } = req.body;  // Get URL from the request body
  // Implement logic to extract links from the URL (could be a simple HTML parser or crawler)
  
  // For the sake of example, assume we are checking a list of links manually
  const linksToCheck = [url];  // This should ideally extract all links from the given URL
  const results = await checkLinks(linksToCheck);  // Call checkLinks to get the status of links
  res.json(results);  // Return the results to the frontend
});

module.exports = router;
