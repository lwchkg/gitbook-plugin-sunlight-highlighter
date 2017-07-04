# Sunlight highlighter in GitBook
[Sunlight](http://sunlightjs.com/) is a context-aware, client-side syntax
highlighter. It does as a good of a job as can be done highlighting code
without performing static analysis. Check out the
[sexy demo](http://sunlightjs.com/demo.html)!

![Dark theme](./docs/example.png "Sunlight highlighting JS code in GitBook")

Licensed under Apache License 2.0.

_**Note: Please check the section [breaking changes](#breaking-changes) if your old book does not build anymore.**_

## Installation

You use Sunlight highlighter by adding the following in the book configuration:
```
{
    plugins: ["-highlight", "sunlight-highlighter"]
}
```

Note that you should disable the "highlight" plugin as well as enabling the
"sunlight-highlighter" plugin. (In the GUI, an explicitly disabled plugin has a
pale orange color.)

## Configuration

You can specify the following in the book configuration:

| Option | Default | Valid values | Description |
|--|--|--|--|
| theme | "gitbook" | "gitbook", "light", "dark" | Syntax highlighting theme |
| lineNumber | false | false, true | Whether to show line numbers |

A sample configuration is shown below:

```json
"pluginsConfig": {
  "sunlight-highlighter": {
    "theme": "dark",
    "lineNumber": true
  }
}
```

## Usage

Like the default syntax highlighter in GitBook, fenced code blocks are used in
this plugin. However, you the language codes may be different from highlight.js
(see below for the list), so you may need to change the language code to get the
text highlighted properly.

### Example:

```
```vbnet
Dim x = 5
x = x ^ 2 + 1
Console.WriteLine("x = {0}", x)
``` (remove the brackets here with the text inside)
```

## Supported languages and language codes

| Language                             | Code          |
|--------------------------------------|---------------|
| 6502 assembler                       | 6502asm       |
| ActionScript                         | actionscript  |
| bash                                 | bash          |
| Brainfuck                            | brainfuck     |
| C#                                   | csharp        |
| C/C++                                | cpp           |
| CSS                                  | css           |
| Diff (unified and context)           | diff          |
| DOS / Windows batch files            | batch         |
| Erlang                               | erlang        |
| Haskell                              | haskell       |
| httpd                                | httpd         |
| Java                                 | java          |
| JavaScript                           | javascript    |
| Lisp                                 | lisp          |
| Lua                                  | lua           |
| MySQL                                | mysql         |
| nginx                                | nginx         |
| Objective-C                          | objective-c   |
| Perl                                 | perl          |
| PHP                                  | php           |
| PowerShell                           | powershell    |
| Python                               | python        |
| Ruby                                 | ruby          |
| Scala                                | scala         |
| T-SQL                                | tsql          |
| VB.NET                               | vb            |
| Visual Studio solution files (*.sln) | sln           |
| XML                                  | xml           |

In addition to the languages above, there is a default highlighter is called "plaintext". It does exactly nothing to the source.

## READ THIS you have changed the GitBook theme or CSS

The following CSS is added to Sunlight highlighter to fit into the style of GitBook:

```css
.sunlight-code-container {
  margin: -1em -1.1765em;
  padding: 1em 1.1765em;
}
.sunlight-line-number-margin {
  margin: -1em 0.5em -1em -1.1765em !important;
  padding: 1em 0.5em 1em 1.1765em !important;
}
```

This is done to offset the “0.85em 1em” padding created by GitBook. Code in GitBook is printed in 0.85em size, so we have 0.85/0.85 = 1(em) and 1/0.85 = 1.1765(em) in the offset code.

If you specify a different size for the code, or is using a non-default theme, you should override these values with your own custom CSS. (It is sad that there is no all-in-one solution, and you need to make a different override for every font size.)

Anyway, “0.5em” is completely internal to Sunlight highlighter, so do not modify unless you want to customize the look.

## To specify the background color of the highlighted code

Here is the CSS snippet of the “gitbook” theme determining the background color of the code output.
```css
.sunlight-code-container {
  border-color: #969696 !important;
  background-color: #F7F7F7 !important;
}
```
If you do not like the background color of Sunlight output, you may add some CSS to override it.

## TODO
- Make show line numbers / starting line number to be an option for each code snippet.
- Add the possibility to select a different theme for each code snippet.
- Expose other configuration options in Sunlight highlighter.

## Breaking changes
### Version 0.2.1
- "default" theme (in 0.2.0) is renamed to "light".
  If you specified "default" theme you need to update your book.json before building.

- The new default theme is "gitbook", which is essentially the "light" theme but with background color changed to #f7f7f7 (same as the color of GitBook code area).
  If you prefer the old theme in 0.2.0, you should switch to the "light" theme.

## Known issues
- Language code in highlight.js does not work. (TODO: Create a mapping of the
  language codes.)

## Report bugs / Contributions
- To report issues and request features for the GitBook plugin, post an issue in the
  [GitHub repository](https://github.com/lwchkg/gitbook-plugin-sunlight-highlighter)
- For Sunlight highlighter in general, refer to the links.

## Links
- [Sunlight: intelligent syntax highlighting](http://sunlightjs.com/)
- [GitHub repository of Sunlight](https://github.com/tmont/sunlight)
