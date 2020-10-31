# tpl
A Command-line tool to create Folder/File Templates and generate folders or files from these templates.

## Usage

New/delete Template.

```sh
tpl new <name> -tf    # new file template named <name>
tpl new <name>        # new folder template named <name>
tpl delete <name>     # delete folder template named <name>
```

Generate folders or files.

```sh
# generate file or folder in current directory ($PWD)
tpl generate <tpl-name> <name>

# generate file or folder named <name> from template named <tpl-name> in <path>
tpl g <tpl-name> <name> <path>
```

List templates.

```sh
tpl ls               # list all templates
tpl ls <pattern>     # list templates filtered by pattern
tpl ls -tf <pattern> # list file templates filtered by pattern
tpl ls -td <pattern> # list folder templates filtered by pattern
```
