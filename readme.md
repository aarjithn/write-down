# write-down

> A lightweight markdown editor web component. 

- No markdown library dependency - use your choice to render
- No codemirror
- Works with React, Vue, Angular, <Your favourite library> and Plain JS.

write-down is based on [Pagedown](https://github.com/StackExchange/pagedown), [Misbehave](https://github.com/orbitbot/misbehave) and [Prism.js](https://github.com/PrismJS/prism), and build using [Stencil](https://github.com/ionic-team/stencil)

## Why another markdown editor?

* Draft.js, Quill.js outputs Richtext, not markdown
* SimpleMDE, Editor.md are fullfledged editors based on Codemirror, quite large in size

## Adding to your project

### Script tag
- Add it via unpkg `<script src='https://unpkg.com/write-down/dist/write-down.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install write-down --save`
- Put a script tag similar to this `<script src='node_modules/write-down/dist/write-down.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

## Using this component

### Listening for output

    const writeDownElement = document.querySelector('write-down');
    editorElement.addEventListener('output', event => { 
      console.log(event.detail)
    });

## Custom builds

Clone the repo and run:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)