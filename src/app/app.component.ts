import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
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
  isPaused: boolean = true;
  selectedSpeed: string = '6';
  currentTime: string = '00:00:00';
  currentFile: any;
  shouldPlayBackward: boolean = true;

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
      this.value = currentTime;
      this.currentTime = new Date(this.value * 1000).toISOString().substr(11, 8)
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
    if (!!this.currentFile) {
      if (this.isPaused) {
        if (this.audio.currentTime > 5 && this.shouldPlayBackward) {
          this.audio.currentTime = this.audio.currentTime - 5;
        }

        this.shouldPlayBackward = true;
        this.audio.play();
        this.isPaused = false;
      } else {
        this.audio.pause();
        this.isPaused = true;
      }
    }
  }

  stop(): void {
    if (this.currentFile) {
      this.audio.pause();
      this.value = 0;
      this.audio.currentTime = this.value;
      this.isPaused = true;
    }
  }

  uploadDone(): void {
    if (!!this.currentFile) {
      this.audio.src = URL.createObjectURL(this.filesUploader.files[0]);
      this.initialAudio();
    }
  }

  selectSpeed(event: Event): void {
    switch (this.selectedSpeed) {
      case '0':
        this.audio.playbackRate = 0.4;
        break;
      case '1':
        this.audio.playbackRate = 0.5;
        break;
      case '2':
        this.audio.playbackRate = 0.6;
        break;
      case '3':
        this.audio.playbackRate = 0.7;
        break;
      case '4':
        this.audio.playbackRate = 0.8;
        break;
      case '5':
        this.audio.playbackRate = 0.9;
        break;
      case '6':
        this.audio.playbackRate = 1;
        break;
      case '7':
        this.audio.playbackRate = 1.1;
        break;
      case '8':
        this.audio.playbackRate = 1.2;
        break;
      case '9':
        this.audio.playbackRate = 1.3;
        break;
      case '10':
        this.audio.playbackRate = 1.4;
        break;
      case '11':
        this.audio.playbackRate = 1.5;
        break;
      case '12':
        this.audio.playbackRate = 1.6;
        break;
      case '13':
        this.audio.playbackRate = 1.7;
        break;
      case '14':
        this.audio.playbackRate = 1.8;
        break;
      case '15':
        this.audio.playbackRate = 1.9;
        break;
      case '16':
        this.audio.playbackRate = 2;
        break;
    }
  }

  selectedFile(event: any) {
    this.currentFile = event;
    this.audio.src = URL.createObjectURL(this.currentFile);
    this.initialAudio();
    this.isPaused = true;
  }

  @HostListener('document:keydown.f2', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.play();
  }

  @HostListener('document:keydown.ArrowLeft', ['$event'])
  handleLeftKeyboardEvent(event: KeyboardEvent) {
    this.audio.currentTime = this.audio.currentTime - 5;
  }

  @HostListener('document:keydown.ArrowRight', ['$event'])
  handleRightKeyboardEvent(event: KeyboardEvent) {
    this.audio.currentTime = this.audio.currentTime + 5;
  }

  forward(): void {
    this.audio.currentTime = this.audio.currentTime + 5;
  }

  backward(): void {
    this.audio.currentTime = this.audio.currentTime - 5;
  }

  timeChanged() {
    this.shouldPlayBackward = false;
    this.audio.pause();
    this.isPaused = true;
    const hms = this.currentTime;
    const splitTime = hms.split(':');
    this.audio.currentTime = (+splitTime[0]) * 60 * 60 + (+splitTime[1]) * 60 + (+splitTime[2]);
  }
}
