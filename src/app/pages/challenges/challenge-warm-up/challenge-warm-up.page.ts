import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-challenge-warm-up',
  templateUrl: './challenge-warm-up.page.html',
  styleUrls: ['./challenge-warm-up.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ChallengeWarmUpPage implements OnInit {
list:any =[
  {
    title:'Warm-up 1',
     image:'',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Bands/DNB+-+WARM+UP.mp4'
  },
  {
    title:'Warm-up 2',
     image:'',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Bands/STEP+-+WARM+UP.mp4'
  },
  {
    title:'Summer Ready Warm-up 1',
    image:'assets/images/live/challenge-tips/SR_Warmup1.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Summer_Ready/Videos/SR_Warm_Up_1.mp4'
  },
  {
    title:'Summer Ready Warm-up 2',
    image:'assets/images/live/challenge-tips/SR_Warmup2.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Summer_Ready/Videos/SR_Warm_Up_2.mp4'
  },
  {
    title:'Summer Ready Warm-up 3',
       image:'assets/images/live/challenge-tips/SR_Warmup3.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Summer_Ready/Videos/SR_Warm_Up_3.mp4'
  },
   {
    title:'Warm-up Dance Flow',
       image:'assets/images/live/challenge-tips/Warmup_DanceFlow.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Materials/warmup_dance_flow.mp4'
  },
   {
    title:'Cardio Blast Warm-Up',
       image:'assets/images/live/challenge-tips/Warmup_CardioBlast.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Materials/cardio_blast_warmup.mp4'
  },
  {
    title:'Regular Warm-Up',
       image:'assets/images/live/challenge-tips/RegularWarmup.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Materials/Regular_warmup.mp4'
  },
  {
    title:'Mobility Warm-Up',
       image:'assets/images/live/challenge-tips/WarmUp_Mobility.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Materials/Warmup+_mobility.mp4'
  },
  {
    title:'Dance Warm-Up',
       image:'assets/images/live/challenge-tips/Warmup_Dance.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Materials/Warmup_Dance.mp4'
  },
  {
    title:'Challenge Moves Tips',
       image:'',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/TRAP+N+TONE+Challenge/Trap+N+Tone+tricks/Challenge+Moves+tips.mp4'
  },
];
challengeId = input<string>('');
  isSummerReady = false;
  constructor(public apiService:ApiService,public authService:AuthService) { }

  ngOnInit() {
    console.log(this.challengeId(),"challengeId")
     if (this.challengeId() == "summer-ready-may2022") {
      this.isSummerReady = true;
    } 
    let data = {
      userId: this.authService.userObjData.email,
      challengeId:this.challengeId,
      category:'challenge-warm-up'
    }
    
    this.apiService.geWatchCompletedDataOfCoolDownOrWarmUp(data).subscribe(res =>{
      console.log(res,"geWatchCompletedDataOfCoolDownOrWarmUp")
    })
  }
onNavigate(item:any){

}
}
