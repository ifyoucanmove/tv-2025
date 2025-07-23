import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { PlayComboService } from 'src/app/services/play-combo.service';
import { ModalController } from '@ionic/angular/standalone';
import SuperGif from 'libgif';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play-combo',
  templateUrl: './play-combo.page.html',
  styleUrls: ['./play-combo.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class PlayComboPage implements OnInit {
  combo: any;
  comboDetails: any = {
    comboWorkouts: [],
  };
  gifLoading = false;
  timeOrReps!: string;
  comboId!: string;
  comboName!: string;
  SuperGif: any | null = null;
  isComboDownloading: boolean = true;
  isImageShowing: boolean = false;
  imageUrl: any;
  isResting: boolean = false;
  isPlayingCombo: boolean = false;
  currentPlayingIndex = 0;
  restingText = 'Get Ready To Move';
  imageSrc: any;
  timeLeft: number = 0;
  interval: any;
  comboLeft: any;
  watchData: any = [];
  isCompleted = false;
  videoWatchSubscription: Subscription = new Subscription();
  isCompletedEmails!: boolean;
  watchCount: number = 0;
  @ViewChild('bellAudio') bellAudio!: ElementRef<HTMLAudioElement>;
  @ViewChild('buzzerAudio') buzzerAudio!: ElementRef<HTMLAudioElement>;
  startTime = new Date();
  isPaused: boolean = false;
  isComboCompleted: boolean = false;
  userEmail = '';
id:any;
  constructor(
    private apiService: ApiService,
    public gifService: PlayComboService,
    public modalController: ModalController,public route:ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params:any) => {
      this.id = params.params['id'];
     
      this.apiService.getComboDetails( this.id).subscribe((data:any) => {
          this.combo = data;
        this.comboDetails.comboWorkouts = data.comboWorkouts;
         this.downloadCombos();
      });
    });
    /* this.apiService.getPlayCombo().subscribe((data: any) => {
      this.combo = data;
      this.comboDetails.comboWorkouts = data;
      console.log(this.combo, 'combo');
      this.downloadCombos();
    }); */
  }

  /*  loadComboWatchData() {
    this.videoWatchSubscription = this.completedService
      .loadBYOComboData(this.userEmail, this.comboId)
      .subscribe(
        (res) => {
          if (res.length > 0) {
            this.watchData = res;
            this.isCompleted = true;
            this.watchCount = this.getWatchCount();
          } else {
            this.isCompleted = false;
            this.watchData = null;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  } */

  playComboFromScratch() {
    // this.currentRepeatCount = 0;
    this.comboDetails.repeatCount = this.comboDetails.isRepeating
      ? this.comboDetails.repeatCount
      : 1;
    this.playBYOCombo('start');
  }

  startTimer(time: number, type: string) {
    console.log('starttimer', time, type);

    if (type == 'resting') {
      this.buzzerAudio.nativeElement.play();
    }
    this.timeLeft = time;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        if (
          this.timeLeft < 5 &&
          this.timeLeft >= 2 &&
          this.isResting &&
          this.currentPlayingIndex + 1 != this.comboDetails.comboWorkouts.length
        ) {
          this.bellAudio.nativeElement.play();
        }
        this.timeLeft--;
      } else {
        this.pauseTimer();
        if (type == 'resting')
          this.currentPlayingIndex = this.currentPlayingIndex + 1;
        if (type == 'start') type = 'resting';
        this.playBYOCombo(type);
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  onImageLoad() {
    console.log('onImageLoad');
    let img: any = document.getElementById('img-gif');

    this.SuperGif = new SuperGif({
      gif: img,
      includeDataURL: true,
      on_end: () => {
        console.log('on end', this.timeLeft);
        if (!this.isPaused && this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.SuperGif?.pause();
          if (!this.isPaused) {
            this.isResting = true;
            this.startTimer(
              this.comboDetails.comboWorkouts[this.currentPlayingIndex]
                .restTime,
              'resting'
            );
          }
        }
      },
      loop_mode: true,
      progressbar_height: 2,
      progressbar_foreground_color: '#f91489',
      auto_play: false,
      show_progress_bar: true,
    });
    this.SuperGif.load(() => {
      this.SuperGif.play();
    });
  }

  async downloadCombos() {
    this.comboLeft = this.comboDetails.repeatCount - 1;
    await this.gifService.getGifs();
    // console.log("Start downloading", this.gifService.imagesData);
    this.isComboDownloading = true;
    for (let i = 0; i < this.comboDetails.comboWorkouts.length; i++) {
      const media =
        this.comboDetails.comboWorkouts[i].postDetails &&
        this.comboDetails.comboWorkouts[i].postDetails.media;
      try {
        if (media) {
          await this.gifService.saveGif(media);
        }
      } catch (e) {
        console.log(e);
      }
    }
    await this.gifService.getGifs();
    // console.log("Done downloading", this.gifService.imagesData);

    this.isComboDownloading = false;
      setTimeout(() => {
      let ele = document.getElementById('playbtn');
       console.log('ele',ele);
      if (ele) {
        ele.focus();
      }
    }, 2000);
  }

  playBYOCombo(type: string) {
    console.log(type, 'playBYOCombo', this.comboDetails.comboWorkouts);
    if (type == 'start') {
      this.startTime = new Date();
      this.currentPlayingIndex = 0;
    }
    if (this.comboDetails.comboWorkouts.length > this.currentPlayingIndex) {
      if (type == 'start') {
        this.isResting = true;
        this.restingText = 'Get Ready To Move';
        this.startTimer(5, 'start');
      } else if (type != 'playing') {
        this.restingText = 'Resting';
        this.isResting = false;
        this.isPlayingCombo = true;
        const media =
          this.comboDetails.comboWorkouts[this.currentPlayingIndex].postDetails
            .media;
        this.combo = this.comboDetails.comboWorkouts[this.currentPlayingIndex];
        this.timeOrReps =
          this.comboDetails.comboWorkouts[this.currentPlayingIndex].timeOrReps;
        this.imageSrc = this.gifService.getGif(media);
        if (
          this.comboDetails.comboWorkouts[this.currentPlayingIndex]
            .timeOrReps == 'reps'
        ) {
          this.timeLeft =
            this.comboDetails.comboWorkouts[this.currentPlayingIndex]
              .timeOrRepsCount - 1;
        } else {
          this.isImageShowing = true;
          this.startTimer(
            this.comboDetails.comboWorkouts[this.currentPlayingIndex]
              .timeOrRepsCount - 1,
            'playing'
          );
        }
      } else {
        this.isImageShowing = false;
        this.isResting = true;
        this.startTimer(
          this.comboDetails.comboWorkouts[this.currentPlayingIndex].restTime,
          'resting'
        );
      }
    } else {
      if (this.comboDetails.isRepeating && this.comboLeft != 0) {
        this.comboLeft--;
        this.isResting = true;
        this.currentPlayingIndex = 0;
        this.startTimer(this.comboDetails.restTime, 'start');
      } else {
        this.isResting = false;
        this.isPlayingCombo = false;
        this.isComboCompleted = true;
        if (this.comboDetails.type == 'user') {
          let totalTime = new Date().getTime() - this.startTime.getTime();
          this.comboDetails.durationMinutes = this.convertToMinutes(totalTime);
          this.updateCombo(this.convertToMinutes(totalTime));
        }
      }
    }
  }

  convertToMinutes(milliseconds: number): number {
    const seconds = Math.floor(milliseconds / 1000);
    const remainingSeconds = seconds % 60;
    const minutes = Math.floor(seconds / 60);

    if (remainingSeconds >= 10) {
      return minutes + 1;
    } else {
      return minutes;
    }
  }

  updateCombo(mins: number) {
    let data = {
      durationMinutes: mins,
    };
    //   this.byoService.updateByoCombo(data, this.comboId);
  }

  pauseCombo() {
    this.SuperGif && this.SuperGif.pause();
    this.isPaused = true;
    this.pauseTimer();
  }

  playCombo() {
    this.isPaused = false;
    let type = 'playing';
    if (this.isResting) type = 'resting';
    if (type == 'resting') {
      this.isResting = true;
      this.startTimer(this.timeLeft, 'resting');
    } else {
      if (
        this.comboDetails.comboWorkouts[this.currentPlayingIndex].timeOrReps !=
        'reps'
      ) {
        this.startTimer(this.timeLeft, 'playing');
      }
    }
  }

  getWatchCount() {
    const data = this.watchData
      ? this.watchData.filter((res: any) => {
          return res.comboId === String(this.comboId);
        })
      : [];
    if (data.length > 0) {
      const count = Math.max.apply(
        Math,
        data.map((watchData: any) => {
          return watchData.watchCount;
        })
      );
      if (count > 1) {
        return count;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  getMaxWatchCount(): number {
    return Math.max.apply(
      Math,
      this.watchData.map((watchData: any) => {
        return watchData.watchCount;
      })
    );
  }

  /*   async markAsComplete(energyData:any) {
    try {
      this.watchCount = this.isCompleted ? this.getMaxWatchCount() : 1;
      let completeData = {
        comboId: this.comboId,
        userId: this.userEmail,
        category: 'byo-combo',
        subCategory: this.comboDetails.type,
        title: this.comboDetails.name,
        durationMinutes: this.comboDetails.durationMinutes,
        watchCount: this.isCompleted ? this.getMaxWatchCount() + 1 : 1,
        date: new Date(),
        isCompletedEmails: this.isCompletedEmails,
        isEnergyDataAvailable: energyData ? true : false,
        energyData: energyData
      };
      if (this.isCompleted) {
        this.openDialog(completeData);
      } else {
        console.log(this.isCompleted, 'this.isCompleted 2');
        await this.completedService.addNewData(completeData).then(() => {
          this.logService.logActivity(
            'web',
            this.customerService.email,
            `play-combo`,
            `completed - ${this.comboDetails.name} (${completeData.watchCount})`,
            {
              resource: 'play-combo',
              type: 'completed',
              comboType: this.comboDetails.type,
              comboId: this.comboId,
              numberOfCompletion: completeData.watchCount,
              module: 'byo-combo',
            }
          );
        });
      }
    } catch (error) {
      console.log(error);
    
    }
  } */

  /*  async openDialog(value: any) {
    const modal = await this.modalController.create({
      component: ConfirmModalPage,
      componentProps: {
        title: 'Confirm',
        message: `Are you sure you want to mark this video as complete again?`,
        button1: 'Confirm',
      },
      cssClass: 'auto-height-modal',
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data === true) {
      await this.completedService.addNewData(value).then(() => {
        this.logService.logActivity(
          'web',
          this.customerService.email,
          `play-combo`,
          `completed - ${this.comboDetails.name} (${value.watchCount})`,
          {
            resource: 'play-combo',
            type: 'completed',
            comboType: this.comboDetails.type,
            comboId: this.comboId,
            numberOfCompletion: value.watchCount,
            module: 'byo-combo',
          }
        );
      });
    }
  } */
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  async onMarkCompleteClicked() {
    /*  const modal = await this.modalController.create({
        component: MoodCapturePage,
        cssClass: 'auto-height-modal-energy',
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      if(data == 'close'){
        return;
       }
      else{
        this.markAsComplete(data)
      } */
  }
  checkMoodIconVisible(): any {
    if (this.watchData && this.watchData.length) {
      return true;
    } else {
      return false;
    }
  }

  async openMoodList() {
    /*   let list = this.watchData.filter((ele:any) => true);
      const modal = await this.modalController.create({
        component: mood,
        componentProps:{data:list},
        cssClass: 'auto-height-modal-energy',
      });
      await modal.present();
      const { data } = await modal.onDidDismiss(); */
  }
}
