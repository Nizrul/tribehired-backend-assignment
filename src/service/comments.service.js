const axios = require('axios')

const getAll = async () => {
    try {
        url = process.env.API_BASE_URL + '/comments';
        console.log(`Fetching comments from ${url}`);
        res = await axios.get(process.env.API_BASE_URL + '/comments');
        return res.data;
    }
    catch (ex) {
        console.log(ex.message);
        console.log(ex.stack);
        throw new Error(`Failed to retrieve all comments: ${ex.message}`);
    }
}

const queryCheck = (comment, key, value) => {
    // the following search is not perfect, as it is just assuming comparisons by rule of thumb (we're comparing exact only for id)
    // it'd be better if we can compare numbers exactly and strings partially
    // might need to define classes to make it work
    return key.toLowerCase().includes('id') ?
        // If it's an Id, check for exact matching 
        value == comment[key] :
        // Otherwise search if the text includes the substring
        comment[key].includes(value)
}

const search = async (query) => {
    try {
        url = process.env.API_BASE_URL + '/comments';
        console.log(`Fetching comments from ${url}`);
        comments = (await axios.get(process.env.API_BASE_URL + '/comments')).data;

        let { type, ...searchQueries } = query;
        // Search for comments that fit at least one of the search queries
        // Search type defaults to 'some' 
        return comments.filter(comment => Object.entries(searchQueries)[type ?? 'some'](queryEntry => 
            Array.isArray(queryEntry[1]) ? 
                // If it is an array, check if the array contains 
                queryEntry[1].some(entry => queryCheck(comment, queryEntry[0], entry)) :
                queryCheck(comment, queryEntry[0], queryEntry[1])
            )
        );
    }
    catch (ex) {
        console.log(ex.message);
        console.log(ex.stack);
        throw new Error(`Failed to search comments: ${ex.message}`);
    }
}

module.exports = {
    getAll,
    search
}