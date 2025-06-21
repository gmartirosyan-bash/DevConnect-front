function handleApiError(err, fallbackMessage = 'Something went wrong') {
  console.error('API Error:', err)

  if (!err?.response)
    return 'No response from server. Please check your internet connection.'

  const { status, data } = err.response
  const message = data?.error || fallbackMessage

  if (status === 400) {
    return message
  }
  else if (status === 401) {
    return message
  }
  else if (status === 500) {
    return 'Server error. Please try again later.'
  }
  else {
    return fallbackMessage
  }
}

export default handleApiError
