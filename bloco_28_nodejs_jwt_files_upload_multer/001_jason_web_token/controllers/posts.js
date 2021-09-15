const mockPosts = [
  {
    title: "título fake",
    content: "conteúdo conteúdo conteúdo conteúdo conteúdo",
  },
  {
    title: "título fake",
    content: "conteúdo conteúdo conteúdo conteúdo conteúdo",
  },
  {
    title: "título fake",
    content: "conteúdo conteúdo conteúdo conteúdo conteúdo",
  },
  {
    title: "título fake",
    content: "conteúdo conteúdo conteúdo conteúdo conteúdo",
  },
];

module.exports = (_request, response, _next) => {
  response.status(200).json({ mockPosts });
};
