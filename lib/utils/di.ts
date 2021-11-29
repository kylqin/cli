let cmd = '';
let cnf = {};

export function provideCmd(command: string) {
  cmd = command;
}

export function useCmd(): string {
  return cmd;
}

export function provideCnf<T>(configuration: T) {
  cnf = configuration;
}

export function useCnf<T>() {
  return cnf as T;
}
