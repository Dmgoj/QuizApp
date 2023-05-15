const QuestionsModel = require('../models/questionsModel.js');
const db = require('../config/db');
const _ = require('lodash');


/**
 * questionsController.js
 *
 * @description :: Server-side logic for managing questionss.
 */
module.exports = {
    /**
     * GET /api/quiz/questions
     * Get 10 random questions, prepare them for view and displays first question
     */
    show: async (req, res) =>{
        try {
        // Gets 10 random questions from db
        const randomQuestion = await QuestionsModel.aggregate([ { $sample: { size: 10 } } ])
        req.session.randomQuestion = randomQuestion
        req.session.answeredQuestions = []
        // Maps through those 10 questions and shuffle correct and incorrect answers
        const questionsToSend = await randomQuestion.map((question) => ({ 
            Question: question.question, 
            Answers: _.shuffle(_.concat([question.correct_answer], question.incorrect_answers)),
            correct_answer: question.correct_answer  }))
        req.session.question = questionsToSend
        req.session.startTime = (new Date().getTime()) // First question start time
        req.session.currentIndex = 0
       
        res.json(questionsToSend[0])
        } catch (Error) {
            res.status(500).json(Error.message)
        }
    },
  
    /**
     * POST /api/quiz/answer
     * Sends answer and calculate score
     *  
     */
    answer: async(req,res)=>{
        const questionsToSend = req.session.question
        const userAnswer = req.body.answer
        let currentIndex = req.session.currentIndex || 0
        
        console.log(currentIndex)
    try{
        
        if(userAnswer) {
            const grade = userAnswer === questionsToSend[currentIndex].correct_answer ? 1 : 0
            const answeringTime = (new Date().getTime() - req.session.startTime)/1000 // answering time in seconds
            /**test radi
             *    console.log(questionsToSend[currentIndex].Question)
             *    console.log(questionsToSend[currentIndex].correct_answer)
             *  */ 
            req.session.answeredQuestions.push({question: questionsToSend[currentIndex].Question, grade: grade, time: answeringTime, })
            req.session.currentIndex = currentIndex+1

            let nextQuestion = questionsToSend[req.session.currentIndex];
            
            req.session.startTime = new Date().getTime()
            res.json(nextQuestion);
            } 
            const answeredQuestions = req.session.answeredQuestions
            const scores = []
            let finalScore
            
            const calculateScore = (grade, time) => {
            const n = 100 * grade;
            const k = 0.2;
            const e = 2.71828;
            const score = n * Math.pow(e, -k * time);
            return Number(score.toFixed(2));
            }
        
            for(const answer of answeredQuestions) {
            const score = calculateScore(answer.grade,answer.time)
            scores.push(score);
            }
            finalScore = _.sum(scores)
            req.session.finalScore = finalScore
    } catch (Error) {
        res.json(Error.message );
        }
    },
}