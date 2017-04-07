{
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    },
    "source": {
        "include": [
            "app/app.js",
            "app/index.controller.js",
            "app/directives",
            "app/screens",
            "app/services",
            "app/widgets"
        ],
        "exclude": [ "test", "app.bundle.js" ],
        "includePattern": ".+\\.js$"
    },
    "plugins": [],
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    }
}
