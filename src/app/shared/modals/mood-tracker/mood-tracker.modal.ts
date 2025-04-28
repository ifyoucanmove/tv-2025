import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonIcon,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { happy, sad, heart, close } from 'ionicons/icons';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-mood-tracker',
  templateUrl: './mood-tracker.modal.html',
  styleUrls: ['./mood-tracker.modal.scss'],
  standalone: true,
  imports: [
    SharedModule
  ]
})
export class MoodTrackerModal {

  workoutForm: FormGroup;
  energyLevels = Array.from({ length: 5 }, (_, i) => i + 1);
  moods = [
    { emoji: '😊', label: 'Happy', value: 'Happy' },
    { emoji: '😢', label: 'Sad', value: 'Sad' },
    { emoji: '😔', label: 'Defeated', value: 'Defeated' },
    { emoji: '😰', label: 'Anxious', value: 'Anxious' },
    { emoji: '😎', label: 'Confident', value: 'Confident' },
    { emoji: '😩', label: 'Overwhelmed', value: 'Overwhelmed' },
    { emoji: '🤗', label: 'Excited', value: 'Excited' },
  ];
@Input() data:any;
  constructor(
    private fb: FormBuilder,
   private modalCtrl: ModalController
  ) {
    addIcons({ happy, sad, heart, close });
    this.workoutForm = this.fb.group({
      beforeEnergy: ['', Validators.required],
      beforeMood: ['', Validators.required],
      afterEnergy: ['', Validators.required],
      afterMood: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.data, 'fat');
    if (this.data) {
      this.workoutForm.patchValue(this.data.energyData);
    }
  }


  close() {
    this.modalCtrl.dismiss();
  }


  selectEnergyLevel(field: string, level: number): void {
    this.workoutForm.get(field)?.setValue(level);
  }

  selectMood(field: string, mood: string): void {
    this.workoutForm.get(field)?.setValue(mood);
  }

  onSubmit(): void {
  
  }
  update() {
 
  }
  continueWithoutSaving() {
    this.close()
  }
} 