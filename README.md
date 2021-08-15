# jwt-rect-express

- Server sends the access Token in the response json, and set the refresh Token in HttpOnly cookie.
- Access Token is stored in a variable in the client side
- Refresh Token is stored in a HttpOnly cookie. and it's sent to the server while getting a new access Token.

# When user refresh or visits the page for first time?

Everytime whent the user refresh or visits the page for first time an API call is made to `auth/api/refresh` in which the refresh token which is previously set in the cookie sent in the headers, then the backend checks that the refresh token is not expired(valid), provide it will provide a new refresh token and access token.else backend won't provide new tokens thus the user has to login again.

# When the access token gets expired while the user browsing the page?

Before making every API call from the client side, the access token's expiration time is checked, if it's expired a request is made to `api/auth/refresh` to get a new access token, then the previous request is made with new access token.
