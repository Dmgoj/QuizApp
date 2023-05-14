var QuestionsModel = require('../models/questionsModel.js');
const db = require('../config/db');
var _ = require('lodash');


/**
 * questionsController.js
 *
 * @description :: Server-side logic for managing questionss.
 */
module.exports = {

  
    /**
     * questionsController.show()
     */
    show: async (req, res) =>{
        try {
        // Gets 10 random questions from db
        const randomQuestion = await QuestionsModel.aggregate([ { $sample: { size: 10 } } ])
        req.session.randomQuestion = randomQuestion
        req.session.answeredQuestions = []
        // Maps through those 10 questions and shuffle correct and incorrect answers
        const questionsToSend = await randomQuestion.map((question) => ({ Question: question.question, Answers: _.shuffle(_.concat([question.correct_answer], question.incorrect_answers))  }))
        req.session.question = questionsToSend
        
        req.session.startTime = (new Date().getTime())/1000 // First question start time
        res.json(questionsToSend[0])
        
      
        } catch (Error) {
            res.status(500).json(Error.message)
        }
    },

   
    
    answer: async(req,res)=>{
        
        //const randomQuestion = req.session.randomQuestion
        //console.log("rand quest in answer: " ,randomQuestion)
        const questionsToSend = req.session.question
        const userAnswer = req.body.answer
        let currentIndex = req.session.currentIndex || 0;
        
      
        
        
        
       try{
        
        if(userAnswer) {
            const grade = userAnswer === questionsToSend[currentIndex].correct_answer ? 1 : 0
            const answeringTime = (new Date().getTime() - req.session.startTime)/1000 // answering time in seconds
            
            req.session.answeredQuestions.push({question: questionsToSend[currentIndex].Question, grade: grade, time: answeringTime, })

            // if (currentIndex < questionsToSend.length - 1) {
            //     const nextQuestion = questionsToSend[currentIndex + 1];
            //     res.json(nextQuestion);
            //     console.log(nextQuestion)
            // }

            let nextQuestion = questionsToSend[currentIndex];
            req.session.currentIndex = currentIndex+1
            req.session.startTime = new Date().getTime()
            res.json(nextQuestion);
            //res.json(req.session.answeredQuestions)
            } 
        } catch (Error) {
            res.json(Error.message );
          }
          
    },
    

        
       
        


  
    

    
    /**
     * questionsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        QuestionsModel.findOne({_id: id}, function (err, questions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting questions',
                    error: err
                });
            }

            if (!questions) {
                return res.status(404).json({
                    message: 'No such questions'
                });
            }

            questions.category = req.body.category ? req.body.category : questions.category;
			questions.type = req.body.type ? req.body.type : questions.type;
			questions.difficulty = req.body.difficulty ? req.body.difficulty : questions.difficulty;
			questions.question = req.body.question ? req.body.question : questions.question;
			questions.correct_answer = req.body.correct_answer ? req.body.correct_answer : questions.correct_answer;
			questions.incorrect_answers = req.body.incorrect_answers ? req.body.incorrect_answers : questions.incorrect_answers;
			
            questions.save(function (err, questions) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating questions.',
                        error: err
                    });
                }

                return res.json(questions);
            });
        });
    },

    /**
     * questionsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        QuestionsModel.findByIdAndRemove(id, function (err, questions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the questions.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
