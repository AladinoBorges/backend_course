async function saveFile(request, response, _next) {
  const data = request.body;
  const file = request.file;

  return response.status(200).json({ body: data, file });
}

module.exports = { saveFile };
