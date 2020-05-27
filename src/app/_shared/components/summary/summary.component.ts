import { Component, OnInit, Input } from '@angular/core';
import { Summary } from 'app/home/models/world-summary.model';
import { SectorGraphDataset } from '@generali/mobilehub-ui-core/dist/types/components/interfaces';


export class ChartViewModel {
  public colors = ['red', 'orange', 'green'];
  public dataSet: SectorGraphDataset[] = [];
  public legends: { label: string; color: string; percent: string }[] = [];
}

@Component({
  selector: 'world-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {

  @Input()
  public summary?: Summary;
  @Input()
  public date!: Date;

  public chartData: ChartViewModel = new ChartViewModel();
  public dataSetGraphUrban?: SectorGraphDataset[];
  public colorsGraphUrban = ['orange', 'red', 'green'];
  public totalCases = 0;

  constructor() {}

  public ngOnInit() {
    if (this.summary) {
      this.totalCases = this.summary.TotalConfirmed + this.summary.TotalDeaths + this.summary.TotalRecovered;
      this.updateChart(this.summary);
    }
  }

  public getDate(date: string) {
    if (date) {
      const diff = new Date().getTime() - new Date(date).getTime();
      const days = Math.floor(diff / (60 * 60 * 24 * 1000));
      const hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
      const minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
      const seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
      return { day: days, hour: hours, minute: minutes, second: seconds };
    }
  }

  public displayUpdates(n: number) {
    return '+' + n;
  }

  public updateChart(summary: Summary) {
    console.log(this.totalCases);
    this.chartData = new ChartViewModel();
    this.chartData.dataSet = [
      { value: summary?.TotalDeaths },
      { value: summary?.TotalConfirmed },
      { value: summary?.TotalRecovered },
    ] as SectorGraphDataset[];

    this.chartData.legends = [
      {
        label: 'Décès',
        color: this.chartData.colors[0],
        percent: (summary?.TotalDeaths * 100 / summary?.TotalConfirmed).toFixed(0).toString() + '%'
      },
      {
        label: 'Malades',
        color: this.chartData.colors[1],
        percent: (summary?.TotalConfirmed * 100 / this.totalCases).toFixed(0).toString() + '%'
      },
      {
        label: 'Guérisons',
        color: this.chartData.colors[2],
        percent: (summary?.TotalRecovered * 100 / summary?.TotalConfirmed).toFixed(0).toString() + '%'
      },
    ];
  }

}
