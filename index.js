const express = require('express');
const proxy = require('express-http-proxy');
const async = require('async');
const fetch = require('node-fetch');
const app = express();
const routes = require('./routes')();
const processBody = require('./middlewares/proccess-body.js');
const next = (request, response, next) => next();
const setHeaders = (headers) => (request, response, next) => {
  let index = headers.length;
  let header = undefined;
  while (index--) {
    header = headers[index];
    response.setHeader(header.name, header.value.trim());
  }
  next();
}
const renderTemplate = (templatePath) => (request, response) => {
  response.send(`response.render ${templatePath}`);
};
const fetcherAll = (fetchers) => (request, reponse, next) => {
  const data = {};
  if (fetchers) {
    const formulas = {};
    if (Object.keys(fetchers).length > 0){
      for (let name in fetchers) {
        formulas[name] = (callback) => {
          const fetcher = fetchers[name];
          fetch(fetcher.url).then(response => response.json()).then(json => {
            callback(null, json);
          });
        }
      }
    }

    async.parallel(formulas, (error, results) => {
      request.fetched = results;
      next();
    });
  } else {
    next()
  }
};
const register = (route) => {
  const headers = route.headers || [];
  const middlewares = route.middlewares && Object.keys(route.middlewares).length ? route.middlewares : null;
  const before = middlewares && middlewares.before ? middlewares.before : next;
  const final = middlewares && middlewares.final ? middlewares.final : next;
  const templatePath = route.template && route.template.path ? route.template.path : undefined;

  if (templatePath) {
    app[route.method.toLowerCase()](route.path, setHeaders(headers), before, fetcherAll(route.fetchers), renderTemplate(templatePath));
  } else {
    app[route.method.toLowerCase()](route.path, setHeaders(headers), before, fetcherAll(route.fetchers), final);
  }
};

// ROUTES
app.use(processBody);
app.use(express.static('public'));

let i = routes.length, route;
while (i--) {
  route = routes[i];
  if (route.proxy) {
    app.use(route.path, proxy(route.proxy.host, route.proxy.userOptions));
  } else {
    register(route);
  }
};

app.listen(3000, () => console.log('Listening on port 3000!'));
