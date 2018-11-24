# Currency-exchange

How to use?

run `npm i` to install node_modules

run `ng serve` and open [http://localhost:4200](http://localhost:4200).

credentials are: `user1` and `pass1`

What's in the project?

1. Simple test example: run `ng test`- this will test the currency service and a part of the Nomic API.

2. Autocomplete example on currency picker (searching sub-string of currency).

3. Error handling on edge cases.

4. LocalStorage to keep the conversion history.

5. Cookies to keep the authentication token.

6. Routing example between pages. With a url parameter.

# Notes

It is better to use localstorage db library for implementation of conversion history.

I had a problem with Angular7 pipe from HttpClient on conversion of objects to js class Objects, so I did it manually.

I didn't generate ID to each conversion on localstorage- instead i used their isoDate (just as an example).


