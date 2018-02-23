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
  questions: Array<any> = [this.ml_questions.concat(this.finance_questions), finance_questions, questions]

  ngOnInit() {
    this.currentQuestion = this.questions[0][0];
  }

  nextQuestion() {
  	this.questionIndex += 1;
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
  }

  toggleAnswer() {
  	this.displayAnswer = !this.displayAnswer;
  	this.answerStatus = this.displayAnswer ? 'Hide' : 'Show';
  }

  toggleQuestions(id: number) {
    this.questionSet = id;
    this.getQuestion(0);
  }

}
