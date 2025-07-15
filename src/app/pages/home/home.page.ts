import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';
import * as _ from 'lodash';
import moment from 'moment';
import { Auth, authState } from '@angular/fire/auth';
import { first } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [SharedModule, VideoSectionComponent],
})
export class HomePage implements OnInit {
  
  programs: any[] = [];
  workoutSeries: any[] = [];
  workouts: any[] = [];
  fitness: any[] = [];
  challenges: any[] = [];
stripeCustomer:any;


  data = {
    lastWeek: {
      totalMinutes: 0,
      totalVideos: 0,
      totalDays: 0,
      weekStartDate: '',
      weekEndDate: '',
    },
    thisWeek: {
      totalMinutes: 0,
      totalVideos: 0,
      totalDays: 0,
    },
  };

   today: any[] = [];
  yesterday: any[] = [];
  older: any[] = [];

    thisweekGamifyData: any;
  lastweekGamifyData: any;

thisweekGamifyWeeks: any;
   lastweekGamifyWeeks: any;
     auth: Auth = inject(Auth);
  constructor(
    public authService: AuthService,
    public router: Router,
    public apiService: ApiService
  ) {
    effect(() => {
  const customerValue = this.authService.customer();
  if (customerValue) {
    console.log('Customer changed:', customerValue);
   this.stripeCustomer = customerValue;
  }
});
  }

 async ngOnInit() {
      const user = await authState(this.auth).pipe(first()).toPromise();
      if(user){
      this.getAllData()
      }
   
  }

  getAllData(){
 this.apiService.getProgrammList().subscribe((res: any) => {
      this.programs = res;
    });
 this.apiService.getCategoriesList().subscribe((res: any) => {
   this.workouts = res.categories['workouts'].map((ele:any) => {
                  return {
                    id:ele.id,
                    image: ele.imagePath,
                    title: ele.title
                  }
                 })
                 console.log( res," res")
    });
    this.apiService.getChallengeList().subscribe((res: any) => {
    //  this.challenges = res.challenges;
        this.challenges =          res.challenges.map((ele:any) => {
                  return {
                    id:ele.id,
                    image: ele.dashBannerUrl,
                    title: ele.dashTitle,
                    duration: '20'
                  }
                 })
                 console.log( this.challenges," this.challenges")
    });
    this.apiService.getFitnessList().subscribe((res: any) => {
      //this.fitness = res['30day'];
       this.fitness = res['30day'].map((ele:any) => {
                  return {
                     id:ele.id,
                    image: ele.image,
                    title: ele.title
                  }
                 })
    });
    this.apiService.getWorkoutList().subscribe((res: any) => {
     // this.workouts = res.workout;
       this.workoutSeries = res.workout.map((ele:any) => {
                  return {
                     id:ele.id,
                    image: ele.image,
                    title: ele.title
                  }
                 })
    });

     this.apiService
      .loadCompletedData(this.authService.userObjData.email, 3)
      .subscribe((res) => {
        console.log(res, 'res');
        this.today = [];
        this.yesterday = [];
        this.older = [];
        res.forEach((item: any) => {
          if (moment(item.date.toDate()).isSame(moment(), 'day')) {
            this.today.push(item);
            this.today.reverse();
            console.log(this.today, 'this.today');
          } else if (
            moment(item.date.toDate()).isSame(
              moment().subtract(1, 'day'),
              'day'
            )
          ) {
            this.yesterday.push(item);
            this.yesterday.reverse();
          } else {
            this.older.push(item);
            this.older.reverse();
          }
        });
      });

    this.getThisWeek();
    this.getLastweek();
  }
  getProgressStyle(completed: number, total: number): object {
    const percentage = (completed / total) * 100;
    return {
      background: `conic-gradient(
        var(--accent-primary) 0deg, 
        var(--accent-secondary) ${percentage * 3.6}deg,
        #1a1a1a ${percentage * 3.6}deg,
        #1a1a1a 360deg
      )`,
    };
  }
  recentlyCompleted(): void {
    this.router.navigate(['/fitness-dashboard-details']);
  }

  onViewAllVideo(): void {
    // Handle view all click
    console.log('View all clicked');
    this.router.navigate(['/video-list']);
  }

  async onVideoClick(video: any) {
    this.router.navigate(['/challenge-video-details/', video.id]);
  }

  onViewAllChallenges(): void {
    this.router.navigate(['/challenge-list']);
  }

  onCardChallenges(video: any): void {
    this.router.navigate(['/challenge-detail/', video.id]);
  }
  onViewAllFitness(): void {
    this.router.navigate(['/fitness-list']);
  }

  onCardFitness(video: any): void {
    return
    /*   this.router.navigate(['/fitness-detail/'], {
      queryParams: {
        id: video.id,
        day: video.days[0].day,
      },
    }); */
    this.router.navigate(['/program/', video.id]);
  }
  onViewAllWorkouts(): void {
    this.router.navigate(['/workout-list']);
  }
  onCardWorkouts(video: any): void {
    return
    this.router.navigate(['/workout-day/', video.id]);
  }

  getDate(date: string) {
    const str = date?.split('-')?.join('/');
    return new Date(str);
  }
  shortenDate(dateString: any): string {
    return (dateString = dateString.substring(0, dateString.indexOf(',')));
  }

    async getThisWeek() {
    const currentDate = moment();
    const weekStart = currentDate.clone().startOf('weeks').format('MM-DD-YYYY');
    const weekEnd = currentDate.clone().endOf('weeks').format('MM-DD-YYYY');
    try {
      this.apiService
        .getMystatsData(weekStart, weekEnd,this.authService.userObjData.email)
        .subscribe((res: any) => {
          const dataThisWeek = res;
          if (dataThisWeek && dataThisWeek.message === 'Success') {
            // Get total minutes for this week
            this.thisweekGamifyData = (dataThisWeek && dataThisWeek.data) || [];
            const total = _.sumBy(this.thisweekGamifyData, 'total');
            this.thisweekGamifyWeeks = { ...this.thisweekGamifyWeeks, total };

            // Get number of days completed
            const dayCount: any = {};
            dataThisWeek.data.forEach((x: any) => {
              dayCount[x.date] = (dayCount[x.date] || 0) + 1;
            });
            const arrayOfDates = Object.values(dayCount);
            this.data.thisWeek.totalDays = arrayOfDates.length;

            // Decrement totalDays if the only category completed is recipes
            dataThisWeek.data.forEach((element: any) => {
              if (
                Object.values(element.category).length === 1 &&
                'recipes' in element.category
              ) {
                --this.data.thisWeek.totalDays;
              }
            });

            this.data.thisWeek.totalMinutes = this.thisweekGamifyWeeks.total;
           // this.addRemoveGif();
          }
        });
    } catch (error) {
    
    }
  }

  async getLastweek() {
    const currentDate = moment();
    const weekStart = currentDate
      .clone()
      .subtract(1, 'week')
      .startOf('weeks')
      .format('MM-DD-YYYY');
    const weekEnd = currentDate
      .clone()
      .subtract(1, 'week')
      .endOf('weeks')
      .format('MM-DD-YYYY');
    this.lastweekGamifyWeeks = {
      weekStart: moment(weekStart, 'MM-DD-YYYY').format('MMM DD'),
      weekEnd: moment(weekEnd, 'MM-DD-YYYY').format('MMM DD'),
    };
    try {
      this.apiService
        .getMystatsData(weekStart, weekEnd, this.authService.userObjData.email)
        .subscribe((res: any) => {
          const myStatsdata = res;
          if (myStatsdata && myStatsdata.message === 'Success') {
            // Get total minutes for last week
            this.lastweekGamifyData = (myStatsdata && myStatsdata.data) || [];
            const total = _.sumBy(this.lastweekGamifyData, 'total');
            this.lastweekGamifyWeeks = { ...this.lastweekGamifyWeeks, total };

            // Get number of days completed
            const dayCount: any = {};
            this.lastweekGamifyData.forEach((x: any) => {
              dayCount[x.date] = (dayCount[x.date] || 0) + 1;
            });
            const arrayOfDates = Object.values(dayCount);
            this.data.lastWeek.totalDays = arrayOfDates.length;

            // Decrement totalDays if the only category completed is recipes
            this.lastweekGamifyData.forEach((element: any) => {
              if (
                Object.values(element.category).length === 1 &&
                'recipes' in element.category
              ) {
                --this.data.lastWeek.totalDays;
              }
            });

            this.data.lastWeek.totalMinutes = this.lastweekGamifyWeeks.total;
            this.data.lastWeek.weekStartDate =
              this.lastweekGamifyWeeks.weekStart;
            this.data.lastWeek.weekEndDate = this.lastweekGamifyWeeks.weekEnd;
          }
        });
    } catch (err) {
      console.log('error', err);
    
    }
  }
}
