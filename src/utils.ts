export const isString = (value: unknown): value is string => typeof value === 'string'

export const isRequiredString = (value: unknown): value is string => {
  return !!value && isString(value)
}

export const isOptionalString = (value: unknown): value is (string | undefined) => {
  return !value || isRequiredString(value)
}

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object'
}
