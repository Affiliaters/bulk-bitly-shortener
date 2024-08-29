
# Bulk Bitly Shortener

**Note:** This is an unofficial package and is not affiliated with Bitly Inc.

A Node.js package to shorten multiple links using multiple Bitly tokens concurrently.

## Installation

To install the package, use npm:

```bash
npm install bulk-bitly-shortener
```

## Usage


### Importing the Package

First, import the package into your Node.js application:

```javascript
const { bulkBitlyShortener } = require('bulk-bitly-shortener');
```

### Shortening Links

Here is a complete example showing how to use the package:

```javascript
const { bulkBitlyShortener } = require('bulk-bitly-shortener');

// Replace with your Bitly tokens
const tokens = [
  'YOUR_BITLY_TOKEN_1', 
  'YOUR_BITLY_TOKEN_2'
];

// Replace with the long URLs you want to shorten
const links = [
  'https://example.com',
  'https://another-example.com'
];

(async () => {
  try {
    const results = await bulkBitlyShortener(tokens, links);

    // Filter out results with errors
    const successful = results.filter(result => !result.error);
    const failedTokens = results
      .filter(result => result.error)
      .map(result => result.token);

    console.log('Shortened links:', successful);
    console.log('Failed tokens:', [...new Set(failedTokens)]);
  } catch (error) {
    console.error('Error:', error);
  }
})();
```

## Function Details

### `bulkBitlyShortener(tokens, links)`

#### Parameters:
- **tokens** (Array of Strings): An array of Bitly API tokens. Ensure tokens are valid and have permissions to shorten URLs.
- **links** (Array of Strings): An array of long URLs that you want to shorten.

#### Returns:
A promise that resolves with an array of results. Each result object includes:
- **token**: The Bitly token used.
- **link**: The original long URL.
- **short_url**: The shortened URL if successful.
- **error**: An error message if there was a failure.

#### Error Handling
The package will return results with errors if:
- A Bitly token is invalid or exceeds its rate limit.
- There are issues with the Bitly API request.

The example above demonstrates how to filter results and identify tokens that failed.

## Contributing

If you find any issues or have suggestions for improvements, feel free to contribute by creating an issue or submitting a pull request on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
