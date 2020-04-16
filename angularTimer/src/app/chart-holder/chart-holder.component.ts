import { Component, OnInit, Input} from '@angular/core';
import {IBarChartOptions, IChartistAnimationOptions, IChartistData} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-chart-holder',
  templateUrl: './chart-holder.component.html',
  styleUrls: ['./chart-holder.component.scss',
              "../../../node_modules/chartist/dist/scss/chartist.scss"]
})

export class ChartHolderComponent implements OnInit {
  @Input('description') description=[];
  @Input('duration') duration=[];
  constructor() { }

  ngOnInit(): void {
    
    var options = {
      width: 300,
      height: 200,
      seriesBarDistance: 40,
      reverseData: false,
      horizontalBars: true,
        tooltips: {
        callbacks: {
          label: function(tooltipItem){
            return " "+Number(tooltipItem.yLabel)
          }
        }
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'description'
          },
        }], 
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'duration'
          },
        }], 
      }
    };

    new Chartist.Bar('.ct-chart', {
      labels: this.description,
      series: [
        this.duration,
      ]
    }, options);
  }

}
