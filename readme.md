# Zepto as Modules

I wanted to see if there was a downside in turning Zepto into a consumable collection of modules. In this demo I used:

  * [browserify][1] to load the modules
  * [babelify][2] to transpile from ES2015
  * [browserify-shim][3] to shim Zepto *without touching the source*

## Instructions

```sh
$ npm install
$ npm start # run a server to prove that there are no bugs
$ npm run build # create a compressed build
```

## Benefits

To load a certain set of plugins, all you need to do is:

```js
import $ from 'zepto';
import 'zepto/ajax';
import 'zepto/data';

// do something with ajax and data
```

where with the original Zepto you had to have a cloned madrobby/zepto repo so you can run `MODULES="zepto ajax data" npm run dist` or something. So every time you decide to include another module, you have to rebuild the script and paste it into your project. Not to mention the ugliness of that diff.

In our case the diff would be something like this:

```diff
 import $ from 'zepto';
 import 'zepto/ajax';
 import 'zepto/data';
+import 'zepto/form';
```

How nice is that?

## File Size

The script produced by my build step is about 8 kB larger than the one produced by madrobby's. However, the gzipped version is only about 1 kB larger, so I can live with that. And you can too. Your images are probably too big anyway, so go take care of that rather than trying to squeeze out a few kBs out of your JavaScript. Seriously, when was the last time you even used a `<picture>` element? And you call that "front-end optimization"...

## Conclusion

The module format is clearly easier to use with a negligible increase in file size.

[1]: https://github.com/substack/node-browserify
[2]: https://github.com/babel/babelify
[3]: https://github.com/thlorenz/browserify-shim
[4]: https://github.com/madrobby/zepto/tree/v1.1.6/src
