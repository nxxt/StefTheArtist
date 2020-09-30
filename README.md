

Pre-rendered portfolio websites for StefTheArtist.

Final Build: https://steftheartist.netlify.app

## Setup / Update installed packages

With Node v12


```
npm i
```

## Development

### Run in Development Server

```
npm run dev
```

Then open `localhost:8000` in your browser.



# Directory/File structure for the content writer

## Add content

1. Create new markdown file to under `/contents/works/:locale`
  - file name is used for URL. e.g. `/contents/works/ja/amazarashi.md` -> `https://domain/works/mazarashi`
2. Add filename to `orderedWorks` Array on `/nuxt.config.js`
  - This data is used for index page's list and configured as pre-rendering target

### Markdown format


#### Sample `/contents/works/en/clientwork.md`

```md
title: Client Work
year: 2020
owner: Collection of Client Work
role: Graphic Design, Poster Design, Brand Design
related:
  - projects
colors:
  - "#DB8B8D"
  - "#9B0005"
  - "#B03C28"
  - "#FFFFFF"
  - "#C48363"
  - "#AC0005"
  - "#231917"
description: |
  This is my showcase of work that I have done for clients ranging from individual orders to brand designs such as posters and flyers.
---


```

#### Show multimedia files

1. Put the file to `/static/images/works/[work name]` as `work.png`
2. Call with `<work-media>` custom element in the markdown file for same work
  - `<work-media name="work.png">` (don't need the "work name" part)
  - If you put `mp4` format, the video will be rendered automatically
  - If you put the URL of `youtube.com`, the video will be rendered as an embeded video automatically!

## Licenses

- [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) for [SVG icons](/assets/icons) 
- Each author of [depending NPM modules](/package.json) which are published under the "MIT" or "ISC" reserve all their copyright
- Stefanie Lvovsky / Daniel Lvovsky reserves all copyright for [Markdown documents](/contents)
- Stefanie Lvovsky or the each product owners reserve copyright for [Image or Video files](/static/images) of their content
- Stefanie Lvovsky / Daniel Lvovsky reserve copyright for source codes of this project under the [MIT License](/LICENSE)
