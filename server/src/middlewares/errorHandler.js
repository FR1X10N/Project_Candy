const errorHandler = (err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500

  if (process.env.NODE_ENV !== 'production') {
    console.error(err)
  }

  res.status(status).json({
    success: false,
    message: err.message || 'Erreur interne du serveur',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  })
}

export default errorHandler
