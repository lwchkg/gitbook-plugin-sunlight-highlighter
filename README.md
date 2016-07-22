# Sunlight highlighter in GitBook
[Sunlight](http://sunlightjs.com/) is a context-aware, client-side syntax
highlighter. It does as a good of a job as can be done highlighting code
without performing static analysis. Check out the
[sexy demo](http://sunlightjs.com/demo.html)!

![Highlighted C# code](./docs/example.png "Sunlight in action on some C# code")

Licensed under WTFPL: http://sam.zoy.org/wtfpl/

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

## Usage

Like the default syntax highlighter in GitBook, fenced codeblocks are used in
this plugin. However, you the language codes may be different from highlight.js
(see below for the list), so you may need to change the language code to get the
text highlighted properly.

### Example:

```
``` vbnet
Dim x = 5
x = x ^ 2 + 1
Console.WriteLine("x = {0}", x)
``` 
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

In addition to the languages above, there is a default highlighter is called
"plaintext". It does exactly nothing to the source.

## Known issues
- Currently only the default theme is usable. The dark theme is not.
- Language code in highlight.js does not work. (TODO: Create a mapping of the
  language codes.)

## Report bugs / Contributions
- To report issues and request features for the GitBook plugin, post an issue in the
  [GitHub repository](https://github.com/lwchkg/gitbook-plugin-sunlight-highlighter)
- For Sunlight highlighter in general, refer to the links. 

## Links
- [Sunlight](http://sunlightjs.com/)
- [GitHub repository of Sunlight](https://github.com/tmont/sunlight)
