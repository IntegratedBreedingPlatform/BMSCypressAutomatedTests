Please, run to install the necessaries package:

~~~
npm install
~~~

To run Cypress using a headless browser (please, replace using the right properties): 

~~~
./node_modules/.bin/cypress run --config baseUrl=SERVE_URL --env username=USERNAME,password=PASSWORD,cropName=CROP
~~~

To run Cypress using the test runner, (please, replace using the right properties):

~~~
./node_modules/.bin/cypress open --config baseUrl=SERVE_URL --env username=USERNAME,password=PASSWORD,cropName=CROP
~~~ 
