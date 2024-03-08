import express from 'express';
import * as da from './data/dataAccess';

const router = require('express').Router();

router.get('/questionSets', async (req, res) => {
    const queryObj = req.query;
    let questionSets;
    if (queryObj.recent === '') {
      questionSets = await da.getRecentQuestionSet();
      console.log('[GET] recent questionsets request made')
  
    } else {
      questionSets = await da.getAllQuestionSets();
      console.log('[GET] all questionsets request made')
    }
  
    res.json(questionSets);
  })

router.get('/questionSets/:id', async (req, res) => {
  const id = req.params.id;
  const questionSet = await da.getQuestionSetById(id);
  console.log(`[GET] /questionsets/${id} request made`)
  res.json(questionSet);
});

router.post('/questionSets', async (req, res) => {
  const obj = req.body;
  const questionSet = await da.saveQuestionSet(obj);
  console.log(`[POST] /questionsets request made`)
  res.json(questionSet);
});

export default router;