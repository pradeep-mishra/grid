# grid
simple spreadsheet looking app with next to no functionality 😆 

created just for fun 😄


```bash
vite dev
```
OR
```bash
npm run dev
```
to run local server

```bash
vite build
```
OR

```bash
npm run build
```
to build production bundle

![Grid, the simple spreadsheet lookalike](/misc/spreadsheet_1.png)


### demo site
<a href="hhttps://gridpm.netlify.app/" target="_blank">https://gridpm.netlify.app</a>


function always starts with = sign

e.g. =SUM(2,3)

##### Functions currenly supported

1. SUM(val1, val2, ..so on)
    - range functionality is currently not supported, like A0:A10

2. EVAL(1 + 1)
    - can run full js using eval function


##### Know issues
There is lot of know issue in there, some of them are

1. No circular check
2. Functions evaluation only goes from top to bottom
3. Useless piece of software 😆 



