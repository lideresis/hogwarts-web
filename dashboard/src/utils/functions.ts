export const getEnv = (key:string, defaultValue?:string):string => {
  return process.env[key]?.toString() ?? (defaultValue || "")
}
