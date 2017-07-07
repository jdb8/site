gemini.suite('site', function(suite) {
    suite.setUrl('/')
        .setCaptureElements('body')
        .capture('whole-site');
});
