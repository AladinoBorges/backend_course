const express = require('express');

const teamsDataValidator = require('../middlewares/validateTeamsDataMiddleware.js');
const { createNewTeam, getAllTeams } = require('../services/contentHandlers.js');

const teamsRouter = express.Router();

teamsRouter
  .route('/')
  .get(async (_request, response) => {
    const teams = await getAllTeams();

    response.status(200).json({ teams });
  })
  .post(teamsDataValidator, async (request, response) => {
    const { name, initials, country, league } = request.body;

    const newTeam = {
      name,
      initials: initials.toUpperCase(),
      country,
      league,
    };

    await createNewTeam(newTeam);

    return response.status(200).json(newTeam);
  });

module.exports = teamsRouter;
