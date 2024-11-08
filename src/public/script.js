document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('urlForm');
  const resultsList = document.getElementById('results');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous results and show loading message
    resultsList.innerHTML = 'Checking links...';
    const url = document.getElementById('url').value;

    try {
      // Fetch link status from the server
      const response = await fetch('/check-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      const results = await response.json();

      // Clear loading message
      resultsList.innerHTML = '';

      // Filter for broken links only (status codes other than 200)
      const brokenLinks = results.filter(result => result.status !== 200);

      if (brokenLinks.length === 0) {
        // Display message if no broken links are found
        resultsList.innerHTML = '<li>All links are working!</li>';
      } else {
        // Display each broken link with its status
        brokenLinks.forEach(result => {
          const listItem = document.createElement('li');
          listItem.textContent = `${result.link} - ${result.status}`;
          resultsList.appendChild(listItem);
        });
      }
    } catch (error) {
      // Display error message if something goes wrong
      resultsList.innerHTML = '<li>There was an error checking the links. Please try again.</li>';
      console.error('Error:', error);
    }
  });
});
