# md-slides

A fun experiment to program a markdown to slides web application built with ChatGPT 4.

Up to prompt 8 (see [ChatGPT prompts.md]), I have strictly followed ChatGPT's answers, and only manually copied my prompts and answers, and filled this readme.

## Implemented features

- Content of `content.md` is parsed, and rendered as presentation slides:
    - heading 1 maps to the presentation title with a random creative commons background
    - heading 2 maps to a section title with a random creative commons background
    - heading 3 maps to a page title, and content within that heading 3 is shown on the page
- Navigation with the arrow keys

## How to run using Node.js

Install `http-server` globally:

```
npm install -g http-server
```

Navigate to the folder containing your `index.html` file:

```
cd /path/to/your/project
```

Start the local web server by running:

```
http-server
```
Open your browser and navigate to http://localhost:8080.