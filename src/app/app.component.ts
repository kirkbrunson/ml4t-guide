import { Component, OnInit } from '@angular/core';


import * as questions from '../assets/ml_questions.json';
import * as finance_questions from '../assets/finance_questions.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentQuestion: any;
  questionIndex: number = 0;
  questionSet: number = 0;

  displayAnswer: boolean = false;
  answerStatus: string = 'Show';

  ml_questions: any = JSON.parse(JSON.stringify(questions));
  finance_questions: any = JSON.parse(JSON.stringify(finance_questions));
  questions: Array<any> = [this.ml_questions.concat(this.finance_questions), finance_questions, questions, []]
  submittedAnswer: string | null;

  ngOnInit() {
    this.currentQuestion = this.questions[0][0];
  }

  nextQuestion() {
  	let next = this.questionIndex + 1;
    this.questionIndex = next < this.questions[this.questionSet].length ? next : 0;
  	this.getQuestion(this.questionIndex);
  }

  getRandomQuestion() {
    this.questionIndex = Math.floor(Math.random() * Math.floor(this.questions[this.questionSet].length));
    this.getQuestion(this.questionIndex);
  }

  getQuestion(index: number) {
	  // TODO: display errmsg if out of bounds
    if (index < 0 || index >= this.questions[this.questionSet].length) {
      this.questionIndex = 0;
    }

  	this.questionIndex = index;
  	this.currentQuestion = this.questions[this.questionSet][index]
  	this.displayAnswer = false;
    this.answerStatus = this.displayAnswer ? 'Hide' : 'Show';
    this.submittedAnswer = null;
  }

  submitAnswer(answer: string) {
    this.submittedAnswer = answer;
  	this.displayAnswer = !this.displayAnswer;
  	this.answerStatus = this.displayAnswer ? 'Hide' : 'Show';
  	if (this.displayAnswer === false) {
  	  this.submittedAnswer = null;
    }
    if (this.submittedAnswer !== this.currentQuestion.answer && this.questions[3].indexOf(this.currentQuestion) === -1) {
  	  this.questions[3].push(this.currentQuestion);
    }

  }

  toggleQuestions(id: number) {
    this.submittedAnswer = null;
    this.questionSet = id;
    this.getQuestion(0);
  }

  clearReviewQuestions() {
    this.questions[3] = [];
    this.questionSet = 0;
    this.getQuestion(0);
  }

  shuffleQuestions(questionSet: number) {
    const a: Array<any> = this.questions[questionSet];

    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    this.currentQuestion = a[0];
  }
}
