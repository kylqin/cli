# todo

A Command-line tool to create Folder/File Templates and generate folders or files from these templates.

## Usage

New/delete Template.

```sh
todo new <name> -tf    # new file template named <name>
todo new <name>        # new folder template named <name>
todo delete <name>     # delete folder template named <name>
```

Generate folders or files.

```sh
# generate file or folder in current directory ($PWD)
todo generate <todo-name> <name>

# generate file or folder named <name> from template named <todo-name> in <path>
todo g <todo-name> <name> <path>
```

List templates.

```sh
todo ls               # list all templates
todo ls <pattern>     # list templates filtered by pattern
todo ls -tf <pattern> # list file templates filtered by pattern
todo ls -td <pattern> # list folder templates filtered by pattern
```
