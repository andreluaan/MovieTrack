function errorHandler(err, request, response, next) {
  console.error(`[ERRO] ${err.message}`);
  response.status(500).json({ success: false, error: err.message });
}

function notFound(request, response) {
  response.status(404).json({ success: false, error: `Rota ${request.method} ${request.path} não encontrada` });
}

module.exports = { errorHandler, notFound };