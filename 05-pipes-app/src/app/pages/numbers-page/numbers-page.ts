import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-numbers-page',
  imports: [CommonModule],
  templateUrl: './numbers-page.html',
})
export default class NumbersPage {

  totalSells = signal(2_433_232.567);
  percent = signal(0.4856);



}
