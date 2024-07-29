const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const sessionConfig = (pgPool) => ({
    store: new pgSession({
        pool: pgPool,
        tableName: 'Sessions',
    }),
    secret: process.env.SESSION_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'lax',
    },
});

module.exports = { sessionConfig };
