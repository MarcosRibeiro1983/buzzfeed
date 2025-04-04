import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import quizz_questions from './../../../../public/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {


  title: string = '';
  questions: any[] = [];
  questionSelected: any;
  anwswers:string[] = [];
  answerSelected:string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  ngOnInit(): void {
    if(quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  onChoice(value: string) {
    this.anwswers.push(value);
    this.nextStep();
  }

  async nextStep() {

    this.questionIndex += 1;
    if( this.questionMaxIndex > this.questionIndex ) {
      this.questionSelected = this.questions[this.questionIndex];

    } else {
      const finalAnswer: any = await this.checkResult(this.anwswers);
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results ];
      console.log(this.answerSelected);
    }
  }

  async checkResult(answers: string[]) {

    const result = answers.reduce((previous, current, i, arr) => {
      if( 
        arr.filter( i => i === previous).length > 
        arr.filter( i => i === current).length 
      ) {
        return previous;
      } else {
        return current;
      }
    })

    return result;
  }
      
}
