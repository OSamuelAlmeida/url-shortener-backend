getNextShortCode = function (lastCode) {
  if (!lastCode) {
    return 'a'
  } else if (lastCode.slice(-1) != '9') {
    let newCode = lastCode.slice(0, -1)
    const lastChar = lastCode.slice(-1)
    let nextChar = null

    if (lastChar === 'z') {
      nextChar = '0'
    } else if (lastChar === 'Z') {
      nextChar = 'a'
    } else {
      nextChar = String.fromCharCode(lastChar.charCodeAt() + 1)
    }

    newCode += nextChar

    return newCode
  } else {
    return newCode = lastCode + 'A'
  }
}

module.exports = getNextShortCode