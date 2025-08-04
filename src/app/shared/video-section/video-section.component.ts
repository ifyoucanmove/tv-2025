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
import { ConfirmPopupComponent } from '../modals/confirm-popup/confirm-popup.component';
import { ModalController } from '@ionic/angular/standalone';
import { SubscribeDialogComponent } from '../modals/subscribe-dialog/subscribe-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

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
  isDetailPage = input<boolean>(false);
  status= input<string>('');
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


  constructor(public authService:AuthService,    private modalCtrl: ModalController) {}
  ngOnInit() {
const customerValue = this.authService.customer();
   
    setTimeout(() => {
       this.videoContainer = document.getElementById(
        this.title()
      ) as HTMLElement;
    //  this.setFocus()
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videos'] && changes['videos'].currentValue) {
   if(this.isDetailPage() == false){ 
     this.setFocus()
     } 
      
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
       if(this.status() == 'active'){
         this.viewAllClick.emit();
      
    }
    else{ 
    this.openSubscribeDialog()
    } 
 
  }

  async onVideoClick(video: any) {
     console.log(this.status(),"this.status()")
    if(this.status() == 'active'){
        this.videoClick.emit(video);
       
    }
    else{
   this.openSubscribeDialog()
    }
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

   async openSubscribeDialog() {
      const modal = await this.modalCtrl.create({
        component: SubscribeDialogComponent,
        componentProps: {
          title: 'Confirm',
          message: 'You must be subscribed to access this content. Scan to activate your subscription.',
          type:'plan-select'
        },
        cssClass: 'confirm-modal',
      });
  
      await modal.present();
  
      const { data } = await modal.onWillDismiss();
      if (data) {
      
      }
    }
}
