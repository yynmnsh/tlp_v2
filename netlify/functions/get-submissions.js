exports.handler = async (event, context) => {
    // We'll get the token from environment variables
    const NETLIFY_ACCESS_TOKEN = process.env.NETLIFY_ACCESS_TOKEN;
    
    // Your form ID from Netlify
    const FORM_ID = '68ac15e2b0cf760008e69b89'; // You can find this in your Forms dashboard
    
    try {
        const response = await fetch(
            `https://api.netlify.com/api/v1/forms/${FORM_ID}/submissions`,
            {
                headers: {
                    'Authorization': `Bearer ${NETLIFY_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                error: 'Failed to fetch submissions',
                details: error.message 
            })
        };
    }
};
