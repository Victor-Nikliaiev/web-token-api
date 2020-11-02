## WebToken API
This API can generate a secure web-token that might be used for any of your purposes. And also it verifies if current token is valid.

>How to use this API?

 1. First, you must have a given secret key
 2. To check your token just make a GET request to following address: https://arhis-webtoken-api.herokuapp.com/verify?token=YOUR_TOKEN
3. To create a new token just request to arhis-webtoken-api.herokuapp.com/create?token=SECRET_KEY&exp=DAYS where SECRET_KEY is your secret key and DAYS is how long days your key will be valid.