```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="../dist/css/quicktab.css">
</head>

<body>
    <div class="container text-center">
        <div class="row">
            <div class="col-md-6">
                <div id="qtab5"></div>
            </div>
            <div class="col-md-6">
                <div id="qtab6"></div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
    <script src="../dist/js/quicktab.js"></script>
    <script>
        new Quicktab('qtab5', {
            defaultTabs: [
                { url: 'welcome.html', title: 'TAB1' },
                { url: 'welcome.html?page=1', title: 'TAB2' },
            ]
        })
        new Quicktab('qtab6', {
            defaultTabs: [
                { url: 'welcome.html', title: 'TAB3' },
                { url: 'welcome.html?page=1', title: 'TAB4' },
            ]
        })
    </script>
</body>

</html>
```

<ShowCase text="Run"  src="Quicktab/demo/work-in-grid-system-of-bootstrap.html"/>