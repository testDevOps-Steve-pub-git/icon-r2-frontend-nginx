# Localization Dictionary JSON Assets

- "dictionary_EN.json" contains English text translations
- "dictionary_FR.json" contains French text translations


### Editing JSON translation files:

**NEVER** edit key names, only the values.
Example:
```
"KEY": "Translated value",
```

Accented French characters are OK, but encoding *must* be UTF-8.

Some special characters may cause errors when trying to import a JSON translation dictionary.

Forbidden:

* backslash (\)
* single quote (' keyboard default)
* double quote (" keyboard default)
* line breaks (the enter key)
* HTML tags for formatting

Alternatives:

* apostrophe (’)
* single left quote (‘)
* single right quote (’)
* double left quote (“)
* double right quote (”)


### Chrome web-browser based JSON editor:

* [Chrome JSON Editor](https://chrome.google.com/webstore/detail/json-editor/lhkmoheomjbkfloacpgllgjcamhihfaj)
