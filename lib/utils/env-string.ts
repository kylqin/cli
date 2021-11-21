import Dict = NodeJS.Dict;

type EnvC = Dict<string>
type EnvContext = EnvC | EnvC[];

export function envStr(str: string, env?: EnvContext): string {
  return str.replace(/(\\*)\$({)?([a-z0-9_]+)(:-[^}]+)?(})?/gi, replacer(env || process.env))
}

function replacer(env: EnvContext) {
  return Array.isArray(env) ? replaceArray : replaceEnv

  function replaceArray(input: string, escapes: string, start: number, key: string, def: string, end: number) {
    if (isEscaped(escapes)) {
      // Only cut off 1 backslash so the shell that the output will probably be sent to can resolve the remaining ones
      // (this way users don't have to triple-escape their stuff)
      return input.slice(1)
    }

    for (let i = 0; i < (env as EnvC[]).length; ++i) {
      if ((env as EnvC[])[i][key]) return (env as EnvC[])[i][key]!;
    }
    return escapes + defaultValue(start, def, end)
  }

  function replaceEnv(input: string, escapes: string, start: number, key: string, def: string, end: number) {
    // L('replaceEnv(input: string, escapes: string, start: number, key: string, def: string, end: number) -> \n', input, escapes, start, key, def, end);
    if (isEscaped(escapes)) {
      return input.slice(1)
    }

    return escapes + ((env as EnvC)[key] || defaultValue(start, def, end))
  }

  function defaultValue(start: number, def: string, end: number) {
    return (start && def && end) ? envStr(def.slice(2), env) : ''
  }
}

function isEscaped(escapes: string) {
  return escapes.length % 2 === 1
}