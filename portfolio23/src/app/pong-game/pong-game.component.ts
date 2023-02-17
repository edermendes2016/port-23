import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-pong-game',
  template: `
    <div #pongGame></div>
  `,
  styles: []
})
export class PongGameComponent implements AfterViewInit {

  @ViewChild('pongGame')
  pongGame!: ElementRef;
  private gameWidth = 800;
  private gameHeight = 400;
  private paddleWidth = 10;
  private paddleHeight = 80;
  private ballRadius = 10;
  private ballX = this.gameWidth / 2;
  private ballY = this.gameHeight / 2;
  private ballSpeedX = 5;
  private ballSpeedY = 5;
  private ballSpeed = 5;
  private leftPaddleY = this.gameHeight / 2;
  private rightPaddleY = this.gameHeight / 2;
  private leftScore = 0;
  private rightScore = 0; 
  //private scoreSound: HTMLAudioElement;
  private wallSound: HTMLAudioElement;
  private paddleSound: HTMLAudioElement;
  private gameOver = false;

  constructor() {
    //this.scoreSound = new Audio('assets/sounds/score.mp3');
    this.wallSound = new Audio('assets/sounds/wall.mp3');
    this.paddleSound = new Audio('assets/sounds/paddle.mp3');
  }

  ngAfterViewInit() {
    const sketch = (p: any) => {

      p.setup = () => {
        const canvas = p.createCanvas(this.gameWidth, this.gameHeight);
        canvas.parent(this.pongGame.nativeElement);
      };

      p.draw = () => {
        p.background(0);
        p.noStroke();
        p.fill(255);
        p.rect(0, 0, this.gameWidth, 10);
        p.rect(0, this.gameHeight - 10, this.gameWidth, 10);
        p.rect(this.gameWidth / 2, 0, 10, this.gameHeight);

        // Move left paddle
        if (p.keyIsDown(p.UP_ARROW)) {
          this.leftPaddleY = Math.max(this.leftPaddleY - 5, this.paddleHeight / 2);
        } else if (p.keyIsDown(p.DOWN_ARROW)) {
          this.leftPaddleY = Math.min(this.leftPaddleY + 5, this.gameHeight - this.paddleHeight / 2);
        }

        // Move right paddle
        if (p.keyIsDown(87)) {
          this.rightPaddleY = Math.max(this.rightPaddleY - 5, this.paddleHeight / 2);
        } else if (p.keyIsDown(83)) {
          this.rightPaddleY = Math.min(this.rightPaddleY + 5, this.gameHeight - this.paddleHeight / 2);
        }

        // Move ball
        this.ballX += this.ballSpeedX * this.ballSpeed;
        this.ballY += this.ballSpeedY * this.ballSpeed;

        // Check for collision with left paddle
        if (this.ballX - this.ballRadius < this.paddleWidth &&
          this.ballY > this.leftPaddleY - this.paddleHeight / 2 &&
          this.ballY < this.leftPaddleY + this.paddleHeight / 2) {
          this.ballSpeedX = -this.ballSpeedX;
          this.paddleSound.play();
        }

        // Check for collision with right paddle
        if (this.ballX + this.ballRadius > this.gameWidth - this.paddleWidth &&
          this.ballY > this.rightPaddleY - this.paddleHeight / 2 &&
          this.ballY < this.rightPaddleY + this.paddleHeight / 2) {
          this.ballSpeedX = -this.ballSpeedX;
          this.paddleSound.play();
        }

        // Check for collision with top or bottom wall
        if (this.ballY - this.ballRadius < 10 || this.ballY + this.ballRadius > this.gameHeight - 10) {
          this.ballSpeedY = -this.ballSpeedY;
          this.wallSound.play();
        }

        // Check for scoring
        if (this.ballX < 0 || this.ballX > this.gameWidth) {
          if (this.ballX < 0) {
            this.rightScore++;            
          } else {
            this.leftScore++;            
          }
         //this.scoreSound.play();
          this.ballX = this.gameWidth / 2;
          this.ballY = this.gameHeight / 2;
          this.ballSpeedX = -this.ballSpeedX;
          this.ballSpeedY = Math.random() * 10 - 5;
        }

            

       
        // Draw paddles and ball
        p.fill(255);
        p.rect(0, this.leftPaddleY - this.paddleHeight / 2, this.paddleWidth, this.paddleHeight);
        p.rect(this.gameWidth - this.paddleWidth, this.rightPaddleY - this.paddleHeight / 2, this.paddleWidth, this.paddleHeight);
        p.ellipse(this.ballX, this.ballY, this.ballRadius * 2);

        // Draw scores
        p.textSize(32);
        p.textAlign(p.CENTER);
        p.text(`${this.leftScore}    ${this.rightScore}`, this.gameWidth / 2, 40);
      };
    };

    new p5(sketch);
  }

}
