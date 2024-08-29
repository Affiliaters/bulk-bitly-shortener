const axios = require('axios');
const async = require('async');

const shortenLink = async (token, link) => {
    try {
        const response = await axios.post(
            'https://api-ssl.bitly.com/v4/shorten',
            { long_url: link },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return { token, link, short_url: response.data.link };
    } catch (error) {
        return { token, link, error: error.response ? error.response.data : error.message };
    }
};

const bulkBitlyShortener = async (tokens, links) => {
    const results = [];
    const failedTokens = new Set();
    const processLink = async (link) => {
        let linkProcessed = false;
        let retryTokens = [...tokens];

        while (retryTokens.length > 0 && !linkProcessed) {
            const token = retryTokens.shift();
            
            if (failedTokens.has(token)) continue;
            
            const result = await shortenLink(token, link);
            
            if (result?.error?.message && result?.error?.message === "MONTHLY_ENCODE_LIMIT_REACHED") {
                failedTokens.add(token);
                continue;
            }
            if (result.error) {
                continue;
            }
            
            results.push(result);
            linkProcessed = true;
        }
    };

    await async.eachLimit(links, 1, processLink);

    return {
        results : results,
        failedTokens : Array.from(failedTokens)
    };
};

module.exports = {
    bulkBitlyShortener,
};