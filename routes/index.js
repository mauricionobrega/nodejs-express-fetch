module.exports = () => [
  {
    'path': '/',
    'method': 'GET',
    'headers': [
      { 'name': 'Cache-Control', 'value': 'public, max-age=0' }
    ],
    'middlewares': {
      'before': (request, response, next) => {
        console.log('before get path /');
        next();
      },
      'final': (request, response, next) => {
        response.send(`
          <!DOCTYPE html>
          <html>
          <head><meta charset="UTF-8"><title>Form</title></head>
          <body></body>
          <script async src="/js/fetch.js"></script>
          <script async src="/js/page.js"></script>
          </html>
        `);
      }
    }
  },
  {
    'path': '/',
    'method': 'POST',
    'fetchers': {
      'register': {
        'url': 'https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo'
      },
      'imagery': {
        'url': 'https://api.nasa.gov/planetary/earth/imagery/?lon=100.75&lat=1.5&date=2014-02-01&cloud_score=True&api_key=DEMO_KEY'
      }
    },
    'middlewares': {
      'final': (request, response, next) => {
        response.send(request.body ? request.fetched : { 'NO-VALUES': true });
      }
    }
  },
  {
    'path': '/signup-me',
    'method': 'POST',
    'fetchers': {
      'register': {
        'url': 'https://one-lr38azr3p5m9.runkit.sh/',
        'options': (request, response) => {
          return {
            method: 'POST',
            body: JSON.stringify(request.body)
          }
        }
        // 'options': {
        //   method: 'POST',
        //   body: 'nadaahver@gmail.com'
        // }
      }
    },
    'middlewares': {
      'final': (request, response, next) => {
        response.send(request.body ? request.fetched : { 'NO-VALUES': true });
      }
    }
  },
  {
    'path': '/produto2',
    'method': 'GET',
    'template': {
      'path': 'produto2.html'
    }
  },
  {
    'path': '/proxied',
    'proxy': {
      'host': 'https://www.google.com.br',
      'userOptions': undefined
    }
  }
];
