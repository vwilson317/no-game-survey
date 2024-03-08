import express from 'express';
import * as da from './data/dataAccess';

const router = require('express').Router();

router.post('/questionsets/:id/questions', async (req, res) => {
  const id = req.params.id;
  const question = req.body;
  const questionSet = await da.saveQuestion(id, question);
  console.log(`[POST] /questionsets/${id}/question request made`)
  res.json(questionSet);
});

export default router;