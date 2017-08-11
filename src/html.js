export default (jsSrc, styles, markup, initialState) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">

    <title>Communities</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #fafafa;
        font-family: 'Roboto', sans-serif;
      }
    </style>
    ${styles}
    <script>window.__INITIAL_STATE__ = ${initialState}</script>
    <script src="${jsSrc}" defer></script>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root">${markup}</div>
  </body>
</html>
`
