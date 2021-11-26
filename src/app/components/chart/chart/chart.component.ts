import { Component, OnInit } from '@angular/core';
import {Chart} from "chart.js";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  canvas: any;
  ctx: any;

  constructor() { }

  ngOnInit(): void {
    this.canvas = document.getElementById('chart');
    this.ctx = this.canvas.getContext('2d');

    const chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [{
          label: 'Number of guest',
          data: [5, 10, 12, 6, 2, 10, 12, 16, 20, 4, 23, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }

}
