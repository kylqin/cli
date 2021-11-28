let cnf = {};

export function provideCnf<T>(configuration: T) {
  cnf = configuration;
}

export function useCnf<T>() {
  return cnf as T;
}