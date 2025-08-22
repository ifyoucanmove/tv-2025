import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  input,
  OnInit,
  output,
  SimpleChanges,
  ViewChild,
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
  focusArray = [
    'videocardTop Challengesindex0',
    'videocard30 Days Programsindex0',
    'videocardWorkouts Seriesindex0',
    'videocardWorkoutsindex0',
    'videocardRecipeindex0',
    'videocardPre Made Comboindex0',
    'videocardUser Made Comboindex0',
  ];
  @HostListener('window:keydown', ['$event'])
  
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.focusedCardIndex === null ) return;

    if (event.key === 'ArrowRight') {
      this.slideNext();
    } else if (event.key === 'ArrowLeft') {
      this.slidePrevious();
    }
   /*   else if (event.key === 'ArrowDown') {
      
      this.handleBottomButton();
    } 
    else if (event.key === 'ArrowUp') {
      this.handleTopButton();
    } */
  
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
                   handleTopButton(){
        // Find currently focused element
        const currentElement = document.activeElement as HTMLElement;
        const currentElementId = currentElement?.id;
        
        console.log("Currently focused element ID:", currentElementId);
        
        // Find current element index in focusArray
      //  const currentIndex = this.focusArray.indexOf(currentElementId);
  
      const currentIndex = this.focusArray.findIndex(element => element.split('index')[0] === currentElementId.split('index')[0]);
        

        console.log("Current element index in array:", currentIndex);
        
        if(currentIndex == 0){
          // Scroll to top of the page when at first element
          const ele = document.getElementById(this.focusArray[0]);
          console.log("ele", ele);
          ele?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
          console.log("Scrolled to top of page");
          return;
        }
        // If current element not found in array, start from the last element
        let previousIndex;
        if (currentIndex === -1) {
          previousIndex = this.focusArray.length - 1;
          console.log("Current element not in array, starting from last element");
        } else {
          // Calculate previous index
          previousIndex = currentIndex - 1;
          if (previousIndex < 0) {
            previousIndex = this.focusArray.length - 1; // Wrap to last element
          }
        }
        
        console.log("Previous index:", previousIndex);
        
        // Get the previous element ID
        const previousElementId = this.focusArray[previousIndex];
        console.log("Focusing previous element ID:", previousElementId);
        
        // Find and focus the previous element
        const previousElement = document.getElementById(previousElementId);
        console.log("Found previous element:", previousElement);
        
        if (previousElement) {
          previousElement.focus();
          console.log("Previous element focused successfully");
          
          previousElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          console.log("Previous element scrolled into view");
        } else {
          console.log("Previous element not found, trying next...");
          // If element not found, try the next one
          setTimeout(() => {
            this.handleTopButton();
          }, 100);
        }
      }
               async handleBottomButton() {
       // Find currently focused element
       const currentElement = document.activeElement as HTMLElement;
       const currentElementId = currentElement?.id;
       
       console.log("Currently focused element ID:", currentElementId);
       
               // Find current element index in focusArray
       const currentIndex = this.focusArray.findIndex(element => element.split('index')[0] === currentElementId.split('index')[0]);

        console.log("Current element index in array:", currentIndex);
        
        // If current element not found in array, start from the first element
        let nextIndex;
        if (currentIndex === -1) {
          nextIndex = 0;
          console.log("Current element not in array, starting from first element");
        } else {
          // Calculate next index
          nextIndex = currentIndex + 1;
          if (nextIndex >= this.focusArray.length) {
            nextIndex = 0; // Wrap to first element
          }
        }
       
       console.log("Next index:", nextIndex);
       
       // Get the next element ID
       const nextElementId = this.focusArray[nextIndex];
       console.log("Focusing next element ID:", nextElementId);
       
       // Find and focus the next element
       const nextElement = document.getElementById(nextElementId);
       console.log("Found next element:", nextElement);
       
       if (nextElement) {
         nextElement.focus();
         console.log("Next element focused successfully");
         
         nextElement.scrollIntoView({
           behavior: 'smooth',
           block: 'center',
         });
         console.log("Next element scrolled into view");
       } else {
         console.log("Next element not found, trying next...");
         // If element not found, try the next one
         setTimeout(() => {
           this.handleBottomButton();
         }, 100);
       }
     }
     onKeyDown(event: KeyboardEvent, type: string) {
     console.log("Key pressed:", event.key);
     
     if (event.key === 'ArrowDown') {
       event.preventDefault();
       event.stopPropagation();
       this.handleBottomButton();
     } else if (event.key === 'ArrowUp') {
       event.preventDefault();
       event.stopPropagation();
       this.handleTopButton();
     }
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
      // Focus the first element in the focusArray
      let element = this.focusArray[0];
      let ele = document.getElementById(element);
      
      if (ele) {
        ele.focus();
        console.log("Initial element focused successfully");
       /*  ele.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        }); */
      } else {
        // Try again after a short delay
      /*   setTimeout(() => {
          this.setFocus();
        }, 500); */
      }
    }, 200);
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
