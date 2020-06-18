const secret = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 12);

module.exports = secret;