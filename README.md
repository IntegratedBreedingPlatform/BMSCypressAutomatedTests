Create a cypress configuration environment file
----------

Create your own cypress.env.json file that Cypress will automatically check. Values in here will overwrite the environment variables set in cypress.json.

- Please, check for file cypress.env.json.example present in the project. 
- Copy it and rename to cypress.env.json
- Replace the properties values   


Running Cypress using npm
----------

Please, run npm to install the necessaries package:

~~~
npm install
~~~

To run Cypress using a headless browser:

~~~
node_modules/.bin/cypress run
~~~

To run Cypress using the test runner:

~~~
node_modules/.bin/cypress open
~~~ 

If you want to run Cypress passing environment variables as options from command line (please, replace the values). Take in mind 
that this values will overwrite the ones defined in cypress.env.json.

~~~
node_modules/.bin/cypress run --config baseUrl=SERVE_URL --env username=USERNAME,password=PASSWORD,cropName=CROP
~~~

If you want to run Cypress using the test runner passing environment variables as options from command line (please, replace the values). Take in mind 
that this values will overwrite the ones defined in cypress.env.json.

~~~
node_modules/.bin/cypress open --config baseUrl=SERVE_URL --env username=USERNAME,password=PASSWORD,cropName=CROP
~~~ 

Running specific tags
----------

~~~
node_modules/.bin/cypress run -e TAGS="(@sanity-test and @sidebar) and not @ignore" --spec 'cypress/integration/**/*.feature'
~~~ 

or using cucumber preprocessor script: (this one skips the tags that don't match, instead of labelling them as pending)
~~~
node_modules/.bin/cypress-tags run -e TAGS="(@sanity-test and @sidebar) and not @ignore" --spec 'cypress/integration/**/*.feature'
~~~ 
See also: https://github.com/TheBrainFamily/cypress-cucumber-preprocessor#running-tagged-tests

Running Cypress using docker
----------

~~~
docker run -it -v $PWD:/e2e -w /e2e cypress/included:8.2.0 run
~~~ 

