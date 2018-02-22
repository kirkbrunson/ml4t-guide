import { Component, OnInit } from '@angular/core';

import * as questions from '../assets/ml4t_questions.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentQuestion: any;
  questionIndex: number = 0;
  displayAnswer: boolean = false;
  answerStatus: string = 'Show';

  ngOnInit() {
  	this.currentQuestion = questions[this.questionIndex];
  	console.log(this.currentQuestion);
  }

  nextQuestion() {
  	this.questionIndex += 1;
  	this.getQuestion(this.questionIndex);
  }

  getRandomQuestion() {
    this.questionIndex = Math.floor(Math.random() * Math.floor(questions.length));
    this.getQuestion(this.questionIndex);
  }

  getQuestion(index: number) {
	  // TODO: display errmsg if out of bounds
    if (index < 0 || index >= questions.length) {
      this.questionIndex = 0;
    }
  	
  	this.questionIndex = index;
  	this.currentQuestion = questions[index]
  	this.displayAnswer = false;
    this.answerStatus = this.displayAnswer ? 'Hide' : 'Show';
  }

  toggleAnswer() {
  	this.displayAnswer = !this.displayAnswer;
  	this.answerStatus = this.displayAnswer ? 'Hide' : 'Show';
  }

}
