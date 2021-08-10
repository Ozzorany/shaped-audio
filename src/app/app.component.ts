import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'shaped-audio';
  value: number = 50;
  audio = new Audio();
  duration: number = 10000;

  constructor() {
    this.audio.src = '../assets/mp3/Lemon-Tree.mp3';
    this.audio.load();
    this.duration = this.audio.duration;

    this.audio.addEventListener('loadedmetadata',() =>{
      this.duration = this.audio.duration * 1000;
    },false);

    this.audio.addEventListener('timeupdate', () => {
      const currentTime = Math.floor(this.audio.currentTime);
      this.value = currentTime * 1000;
    }, false);
  }

  ngOnInit(): void {

  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }

  changePosition() {
    console.log('yey');
    this.audio.currentTime = this.value / 1000;
  }

  play(): void {
    this.audio.play();
  }

  stop(): void {
    this.audio.pause();
  }
}
