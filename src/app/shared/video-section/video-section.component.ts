import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-video-section',
  templateUrl: './video-section.component.html',
  styleUrls: ['./video-section.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class VideoSectionComponent {
  @Input() title: string = 'Top Videos';
  @Input() videos: any[] = [];
  @Output() viewAllClick = new EventEmitter<void>();
  @Output() videoClick = new EventEmitter<any>();

  currentVideoIndex = 0;
  videoContainer: HTMLElement | null = null;
  focusedCardIndex: number | null = null;
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.focusedCardIndex === null) return;
    
    if (event.key === 'ArrowRight') {
      this.slideNext();
    } else if (event.key === 'ArrowLeft') {
      this.slidePrevious();
    }
  } 
  ngOnInit() {
    setTimeout(() => {
    //  this.videoContainer = document.querySelector('.video-grid');
    this.videoContainer = document.getElementById(this.title) as HTMLElement;
    }, 0);
  }
  checkEnterFocus(): void {
    console.log("checkEnterFocus");
  
    const videoCard = this.videoContainer?.children[0] as HTMLElement;
    if (videoCard) {
      videoCard.focus();
      this.onCardFocus(0);
    }
  }
  onCardFocus(index: number): void {
    this.focusedCardIndex = index;
    this.currentVideoIndex = index;
    this.scrollToVideo();
  }

  onCardBlur(): void {
    this.focusedCardIndex = null;
  }

  onViewAllClick(): void {
    this.viewAllClick.emit();
  }

  onVideoClick(video: any): void {
    this.videoClick.emit(video);
  }

  slideNext(): void {
    if (this.videoContainer && this.currentVideoIndex < this.videos.length - 1) {
      this.currentVideoIndex++;
      this.scrollToVideo();
    }
  }

  slidePrevious(): void {
    if (this.videoContainer && this.currentVideoIndex > 0) {
      this.currentVideoIndex--;
      this.scrollToVideo();
    }
  }

  private scrollToVideo(): void {
    if (this.videoContainer) {
      const videoCard = this.videoContainer.children[this.currentVideoIndex] as HTMLElement;
      if (videoCard) {
        console.log(videoCard,"videoCard",this.currentVideoIndex,videoCard.offsetWidth);
        const scrollAmount = this.currentVideoIndex * videoCard.offsetWidth;
        this.videoContainer.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  }
} 