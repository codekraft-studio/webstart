![webstart_banner](https://user-images.githubusercontent.com/29862596/29433078-23064c84-839e-11e7-9061-1876db0dbf1b.png)

## What is it?
A webpack based project with an __optimized configuration__ for websites development that aim to be a solid starting point for your projects.


## Installation
Download the package archive from GitHub directly with [this](https://github.com/codekraft-studio/webstart/archive/master.zip) link, extract the archive and _optionally_ change the `package.json` name and description according to your project and you are done.

## How to use it?
In order to start the website development you must run `npm run start` command. All the website development take place in the `src` folder, the entry point is `src/index.js` where you must load all the required files, both styles and scripts.

When runned with the `build` command it will __disable__ the code __source maps__ and __minify all__ the website files (html, js, scss) place them in the `dist` folder which is __production ready__.

---

## Contributing

1. Create an issue and describe your idea
2. Fork the project (https://github.com/codekraft-studio/webstart/fork)
3. Create your feature branch (`git checkout -b my-new-feature`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Publish the branch (`git push origin my-new-feature`)
6. Add some test for your new feature
7. Create a new Pull Request

---

## License

The project is under the __ISC License (ISC)__.

Copyright 2017 Codekraft Studio

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
