#Currency-exchange

How to use?

run `ng serve` and open [http://localhost:4200](http://localhost:4200).

What's in the project?

1. Simple test example: run `ng test`- this will test the currency service and a part of the Nomic API.

2. Autocomplete example on currency picker (searching sub-string of currency).

3. Error handling on edge cases.

4. LocalStorage to keep the conversion history.

5. Cookies to keep the authentication token.

6. Routing example between pages. With a url parameter.

# Notes

I could have used localstorage db library for better implementation of conversion history- yet I was short in time.

I had a problem with Angular7 pipe from HttpClient on conversion of objects to js class Objects, so I did it manually.

I didn't generate ID to each conversion on localstorage- instead i used their isoDate (I know it's ugly but it is just an example).

It could be nice to change the error "couldn't find currency" to an error from validator function (more generic). - i had a problem there

It could be nice to add sorting to data tables, but i had no time.

