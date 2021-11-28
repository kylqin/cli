# todo.js

A Command-line tool to create Folder/File Templates and generate folders or files from these templates.

## Usage

New/delete Template.

```sh
todo.js new <name> -tf    # new file template named <name>
todo.js new <name>        # new folder template named <name>
todo.js delete <name>     # delete folder template named <name>
```

Generate folders or files.

```sh
# generate file or folder in current directory ($PWD)
todo.js generate <todo.js-name> <name>

# generate file or folder named <name> from template named <todo.js-name> in <path>
todo.js g <todo.js-name> <name> <path>
```

List templates.

```sh
todo.js ls               # list all templates
todo.js ls <pattern>     # list templates filtered by pattern
todo.js ls -tf <pattern> # list file templates filtered by pattern
todo.js ls -td <pattern> # list folder templates filtered by pattern
```
