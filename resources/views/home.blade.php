<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel React test</title>

    </head>
    <body >
        <div id="home"></div>
        
        <script src="{{ url(mix('js/app.js')) }}"> </script>
        
    </body>
</html>
