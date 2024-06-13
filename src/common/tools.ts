const ZERO_ASCII = 48
const LOWER_A_ASCII = 97
const charLib = String.fromCharCode(
  ...new Array(10)
    .fill(ZERO_ASCII)
    .map((item, index) => item + index)
    .concat(
      new Array(26).fill(LOWER_A_ASCII).map((item, index) => item + index),
    ),
)

export const createRandomString = (length = 8) => {
  const libLength = charLib.length
  return new Array(length).fill('').reduce(str => {
    const randomIndex = Math.floor(Math.random() * libLength)
    return str + charLib.substring(randomIndex, randomIndex + 1)
  }, '')
}

export const parseJSONSafely = (str: any): Record<string, any> | void => {
  try {
    return JSON.parse(str)
  } catch (error) {
    console.error('An error occurred while parsing the JSON string')
  }
}

export const stringifyObjSafely = (
  obj: Record<string, any>,
  tabSpaces?: number,
): string => {
  try {
    if (typeof obj === 'string') {
      return obj
    }
    return JSON.stringify(obj, null, tabSpaces)
  } catch (error) {
    console.error(error)
    return 'stringify error'
  }
}
