import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  input,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-video-section',
  templateUrl: './video-section.component.html',
  styleUrls: ['./video-section.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class VideoSectionComponent implements OnInit {
  // Input signals
  videos = input<any>([]);
  title = input<string>('Videos');
  tabindex = input<number>(0);
  showViewAll = input<boolean>(true);
  // Output signals
  viewAllClick = output<void>();
  videoClick = output<any>();

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
  constructor() {}
  ngOnInit() {
   
    setTimeout(() => {
       this.videoContainer = document.getElementById(
        this.title()
      ) as HTMLElement;
    //  this.setFocus()
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videos'] && changes['videos'].currentValue) {
      // Trigger your function when videos (challenges) are loaded
      this.setFocus()
    }
  }

  setFocus() {
    setTimeout(() => {
      let element = `videocardTop Challenges0`;
      let ele = document.getElementById(element);
     //  console.log(ele,"ele")
      if (ele) {
        ele.focus();
      }
    }, 4000);
  }

  checkEnterFocus(): void {
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

  async onVideoClick(video: any) {
    console.log('video click');
    this.videoClick.emit(video);
  }

  slideNext(): void {
    if (
      this.videoContainer &&
      this.currentVideoIndex < this.videos.length - 1
    ) {
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
      const videoCard = this.videoContainer.children[
        this.currentVideoIndex
      ] as HTMLElement;
      if (videoCard) {
        const scrollAmount = this.currentVideoIndex * videoCard.offsetWidth;
        this.videoContainer.scrollTo({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  }
}
