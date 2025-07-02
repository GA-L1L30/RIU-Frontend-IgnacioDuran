import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
  standalone: true,
  imports: [MatProgressSpinnerModule]
})
export class Loading {

}
