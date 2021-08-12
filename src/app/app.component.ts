import {Component, OnInit, ViewChild} from '@angular/core';
import {UploadFileComponent} from './components/upload-file/upload-file.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // @ts-ignore
  @ViewChild('filesUploader', {static: false}) filesUploader: UploadFileComponent;
  value: number = 0;
  audio = new Audio();
  duration: number = 1;
  isFileUploaded: boolean = false;
  isPaused: boolean = true;
  selectedSpeed: string = '3';

  constructor() {
  }

  ngOnInit(): void {

  }

  initialAudio(): void {
    this.audio.load();
    this.duration = this.audio.duration;

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration;
    }, false);

    this.audio.addEventListener('timeupdate', () => {
      const currentTime = Math.floor(this.audio.currentTime);
      this.value = currentTime ;
    }, false);
  }

  formatLabel(value: number) {
    let timeFormat = value.toString();

    if (value >= 1) {
     timeFormat = new Date(value * 1000).toISOString().substr(11, 8)
    }

    return timeFormat;
  }

  changePosition() {
    this.audio.currentTime = this.value;
  }

  play(): void {
    if (this.isFileUploaded) {
      if(this.isPaused) {
        this.audio.play();
        this.isPaused = false;
      } else {
        this.audio.pause();
        this.isPaused = true;
      }
    }
  }

  stop(): void {
    if (this.isFileUploaded) {
      this.audio.pause();
      this.value =  0;
      this.audio.currentTime = this.value;
      this.isPaused = true;
    }
  }

  uploadDone(): void {
    this.isFileUploaded = true;
    this.audio.src = URL.createObjectURL(this.filesUploader.files[0]);
    this.initialAudio();
  }

  selectSpeed(event: Event): void{
    switch (this.selectedSpeed) {
      case '0':
        this.audio.playbackRate=0.5;
        break;
      case '1':
        this.audio.playbackRate = 0.7;
        break;
      case '2':
        this.audio.playbackRate = 0.9;
        break;
      case '3':
        this.audio.playbackRate = 1;
        break;
      case '4':
        this.audio.playbackRate = 1.2;
        break;
      case '5':
        this.audio.playbackRate = 1.4;
        break;
      case '6':
        this.audio.playbackRate = 1.6;
        break;
    }

  }
}
