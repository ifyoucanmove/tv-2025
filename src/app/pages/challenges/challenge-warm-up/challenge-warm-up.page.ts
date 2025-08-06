import { Component, input, OnInit } from '@angular/core';
import { IonSkeletonText } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-challenge-warm-up',
  templateUrl: './challenge-warm-up.page.html',
  styleUrls: ['./challenge-warm-up.page.scss'],
  standalone: true,
  imports: [SharedModule,IonSkeletonText]
})
export class ChallengeWarmUpPage implements OnInit {
    imageLoaded: boolean = true;
list:any =[
  {
    title:'Warm-up 1',
    value:4,
     image:'assets/images/live/challenge-tips/warmup1.png',
     isVisible:true,
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Bands/DNB+-+WARM+UP.mp4'
  },
  {
    title:'Warm-up 2',
    value:3,
      isVisible:true,
     image:'assets/images/live/challenge-tips/warmup1.png',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Bands/STEP+-+WARM+UP.mp4'
  },
  {
    title:'Summer Ready Warm-up 1',
    value:6,
      isVisible:false,
    image:'assets/images/live/challenge-tips/SR_Warmup1.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Summer_Ready/Videos/SR_Warm_Up_1.mp4'
  },
  {
    title:'Summer Ready Warm-up 2',
    value:6,
      isVisible:false,
    image:'assets/images/live/challenge-tips/SR_Warmup2.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Summer_Ready/Videos/SR_Warm_Up_2.mp4'
  },
  {
    title:'Summer Ready Warm-up 3',
    value:5,
      isVisible:false,
       image:'assets/images/live/challenge-tips/SR_Warmup3.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Summer_Ready/Videos/SR_Warm_Up_3.mp4'
  },
   {
    title:'Warm-up Dance Flow',
    value:4,
      isVisible:true,
       image:'assets/images/live/challenge-tips/Warmup_DanceFlow.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Materials/warmup_dance_flow.mp4'
  },
   {
    title:'Cardio Blast Warm-Up',
    value:4,  
    isVisible:true,
       image:'assets/images/live/challenge-tips/Warmup_CardioBlast.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Materials/cardio_blast_warmup.mp4'
  },
  {
    title:'Regular Warm-Up',
    value:4,
      isVisible:true,
       image:'assets/images/live/challenge-tips/RegularWarmup.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Materials/Regular_warmup.mp4'
  },
  {
    title:'Mobility Warm-Up',
    value:4,
      isVisible:true,
       image:'assets/images/live/challenge-tips/WarmUp_Mobility.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Materials/Warmup+_mobility.mp4'
  },
  {
    title:'Dance Warm-Up',
    value:4,
      isVisible:true,
       image:'assets/images/live/challenge-tips/Warmup_Dance.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Materials/Warmup_Dance.mp4'
  },
  {
    title:'Challenge Moves Tips',
    value:1,
      isVisible:true,
       image:'assets/images/live/challenge-tips/challengetips.png',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/TRAP+N+TONE+Challenge/Trap+N+Tone+tricks/Challenge+Moves+tips.mp4'
  },
];
challengeId = input<string>('');
challengeName = input<string>('');
  isSummerReady = false;
  constructor(public apiService:ApiService,  private navCtrl: NavController,
    public authService:AuthService) { }

  ngOnInit() {
    console.log(this.challengeId(),"challengeId")
     if (this.challengeId() == "summer-ready-may2022") {
      this.isSummerReady = true;
      this.list[2].isVisible = true;
          this.list[3].isVisible = true;
              this.list[4].isVisible = true;
    } 
  }
onNavigate(item:any){
   let category = 'challenge-warm-up';
    this.navCtrl.navigateForward(`/challenge-page-detail/${category}`, {
      state: {
        data: item,
        challengeId: this.challengeId(),
        category: 'challenge-warm-up',
        challengeName: this.challengeName()
      },
    });
  
}
}
