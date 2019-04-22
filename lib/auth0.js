import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

export default jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-msb4t7yt.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://timesheets.baavaanee.ca',
    issuer: 'https://dev-msb4t7yt.auth0.com/',
    algorithms: ['RS256']
  });