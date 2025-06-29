import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  input,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class VideoPlayerComponent implements OnInit {
  @Input() video: any;
  // video = input<any>({});
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('progressBar') progressBar!: ElementRef;
  @ViewChild('controlsContainer') controlsContainer!: ElementRef;

  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  volume: number = 1;
  isMuted: boolean = false;
  showControls: boolean = true;
  controlsTimeout: any;
  isFullscreen: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this.initializeVideo();
    }, 3000);
  }

  ngOnDestroy() {
    this.clearControlsTimeout();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
      case 'k':
        this.togglePlay();
        break;
      case 'f':
        this.toggleFullscreen();
        break;
      case 'm':
        this.toggleMute();
        break;
      case 'ArrowRight':
        this.seekForward();
        break;
      case 'ArrowLeft':
        this.seekBackward();
        break;
      case 'ArrowUp':
        this.increaseVolume();
        break;
      case 'ArrowDown':
        this.decreaseVolume();
        break;
    }
  }

  initializeVideo() {
    console.log(this.videoElement.nativeElement, 'initializeVideo');
    const video = this.videoElement.nativeElement;
    video.addEventListener('loadedmetadata', () => {
      this.duration = video.duration;
    });

    video.addEventListener('timeupdate', () => {
      this.currentTime = video.currentTime;
      this.updateProgressBar();
    });

    video.addEventListener('ended', () => {
      this.isPlaying = false;
    });
  }

  togglePlay() {
    const video = this.videoElement.nativeElement;
    if (this.isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    this.isPlaying = !this.isPlaying;
    this.showControlsTemporarily();
  }

  toggleMute() {
    const video = this.videoElement.nativeElement;
    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
    this.showControlsTemporarily();
  }

  toggleFullscreen() {
    if (!this.isFullscreen) {
      if (this.videoElement.nativeElement.requestFullscreen) {
        this.videoElement.nativeElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    this.isFullscreen = !this.isFullscreen;
    this.showControlsTemporarily();
  }

  seekForward() {
    const video = this.videoElement.nativeElement;
    video.currentTime = Math.min(video.currentTime + 10, video.duration);
    this.showControlsTemporarily();
  }

  seekBackward() {
    const video = this.videoElement.nativeElement;
    video.currentTime = Math.max(video.currentTime - 10, 0);
    this.showControlsTemporarily();
  }

  increaseVolume() {
    this.volume = Math.min(this.volume + 0.1, 1);
    this.updateVolume();
    this.showControlsTemporarily();
  }

  decreaseVolume() {
    this.volume = Math.max(this.volume - 0.1, 0);
    this.updateVolume();
    this.showControlsTemporarily();
  }

  updateVolume() {
    const video = this.videoElement.nativeElement;
    video.volume = this.volume;
    this.isMuted = this.volume === 0;
    video.muted = this.isMuted;
  }

  onProgressBarClick(event: MouseEvent) {
    const progressBar = this.progressBar.nativeElement;
    const rect = progressBar.getBoundingClientRect();
    const pos = (event.clientX - rect.left) / rect.width;
    const video = this.videoElement.nativeElement;
    video.currentTime = pos * video.duration;
    this.showControlsTemporarily();
  }

  updateProgressBar() {
    const progressBar = this.progressBar.nativeElement;
    const progress = (this.currentTime / this.duration) * 100;
    progressBar.style.width = `${progress}%`;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  showControlsTemporarily() {
    this.showControls = true;
    this.clearControlsTimeout();
    this.controlsTimeout = setTimeout(() => {
      if (this.isPlaying) {
        this.showControls = false;
      }
    }, 3000);
  }

  clearControlsTimeout() {
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    }
  }

  onMouseMove() {
    this.showControlsTemporarily();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let ele = document.getElementById('play-btn-player');
      if (ele) {
        ele.focus();
      }
    }, 2000);
  }
}
