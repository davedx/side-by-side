export const getStyleForTodo = todo => {
  if (todo.done) {
    return {textDecoration: 'line-through'}
  } else {
    return {}
  }
}

export const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const pluralize = (count, string) => {
  if (count === 1) {
    return string
  }
  return `${string}s`
}
