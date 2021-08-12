import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UploadFileComponent} from './components/upload-file/upload-file.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // @ts-ignore
  @ViewChild('filesUploader', {static: false}) filesUploader: UploadFileComponent;
  title = 'shaped-audio';
  value: number = 50;
  audio = new Audio();
  duration: number = 10000;

  constructor() {
    //this.initialAudio();
  }

  ngOnInit(): void {

  }

  initialAudio(): void {
    //this.audio.src = '../assets/mp3/Lemon-Tree.mp3';
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

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }

  changePosition() {
    this.audio.currentTime = this.value / 1000;
  }

  play(): void {
    if(this.audio.src.length){
      this.audio.play();
    } else {
      this.audio.src =  URL.createObjectURL(this.filesUploader.files[0]);
      this.initialAudio();
    }
  }

  stop(): void {
    this.audio.pause();
  }
}
