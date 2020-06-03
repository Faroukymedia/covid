import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { StatusBarService } from '@shared/services/plugins/status-bar.service';
import { Observable, Subscription } from 'rxjs';
import { WorldSummary, Summary, Country } from '../models/world-summary.model';
import { CovidState } from '../store/covid.state';
import { Chart } from 'chart.js';
import { LoaderState } from '@shared/store/loader.state';
import { HeaderAgents, InformationText, CardInput, HeaderCallToActions } from '@generali/mobilehub-ui-core/dist/types/components/interfaces/hero-header-3-model';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'mwh-home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss'],
})
export class HomePageComponent implements AfterViewInit {

  @Select(LoaderState.isVisible)
  public isLoading!: Observable<boolean>;

  @Select(CovidState.worldSummary)
  public worldSummary$!: Observable<WorldSummary>;

  @ViewChild('barCanvas')
  public barCanvas!: ElementRef;

  @ViewChild('barRecovered')
  public barRecovered!: ElementRef;

  @ViewChild('barDeaths')
  public barDeaths!: ElementRef;

  @ViewChild('errorStickyBox')
  public errorStickyBox!: ElementRef;

  public barChart!: Chart;
  public showError = false;

  public currentScroll = 0;

  public worldSummary?: WorldSummary;
  public worldSummarySubscription!: Subscription;
  public totalCases?: number;

  public hero3Subtitle: InformationText[] = [
    {
      text: 'Nombre total de cas confirmés',
      isClickable: false
    }
  ];

  public hero3Icon: HeaderCallToActions[] = [
    {
      id: 1,
      icon: '../assets/img/icons/products/g66-whatsapp.svg',
      text: 'Partager'
    },
    {
      id: 2,
      icon: '../assets/img/icons/products/g53-site-www.svg',
      text: 'WHO'
    }
  ];

  constructor(private statusBarService: StatusBarService, private socialSharing: SocialSharing) {
  }

  public handleScroll(scrollOffset: number) {
    this.currentScroll = scrollOffset;
  }

  public ngAfterViewInit(): void {
    this.statusBarService.setDefaultStatusBar();

    this.worldSummarySubscription = this.worldSummary$.subscribe((data) => {
      this.worldSummary = data;
      this.updateBarChart(this.getTopConfirmed(this.worldSummary.Countries), this.barCanvas);
      this.updateHorizentalBarChart(this.getTopRecovered(this.worldSummary.Countries), this.barRecovered, 'recovered');
      this.updateHorizentalBarChart(this.getTopDeath(this.worldSummary.Countries), this.barDeaths, 'death');
    }, error => {
      this.showErrorStickyBox(error);
    });
  }

  public getTopConfirmed(countries: Country[]) {
    if (countries && countries.length) {
      return countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
    }
  }

  public getTopRecovered(countries: Country[]) {
    if (countries && countries.length) {
      return countries.sort((a, b) => b.TotalRecovered - a.TotalRecovered);
    }
  }

  public getTopDeath(countries: Country[]) {
    if (countries && countries.length) {
      return countries.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
    }
  }

  public updateBarChart(countries: Country[] | undefined, input: ElementRef) {
    console.log(input);
    if (countries && countries.length && input) {
      const topCountries = countries?.slice(0, 3);
      if (topCountries?.length) {
        const barChartData = {
          labels: [topCountries[0].CountryCode, topCountries[1].CountryCode, topCountries[2].CountryCode],
          datasets: [
            {
              label: 'Malades',
              backgroundColor: 'orange',
              stack: 'Stack 0',
              data: [
                topCountries[0].TotalConfirmed,
                topCountries[1].TotalConfirmed,
                topCountries[2].TotalConfirmed,
              ]
            }, {
              label: 'Guérisons',
              backgroundColor: 'green',
              stack: 'Stack 0',
              data: [
                topCountries[0].TotalRecovered,
                topCountries[1].TotalRecovered,
                topCountries[2].TotalRecovered,
              ]
            }, {
              label: 'Décès',
              backgroundColor: 'red',
              stack: 'Stack 1',
              data: [
                topCountries[0].TotalDeaths,
                topCountries[1].TotalDeaths,
                topCountries[2].TotalDeaths,
              ]
            }]
        };

        this.barChart = new Chart(input?.nativeElement, {
          type: 'bar',
          data: barChartData,
          options: {
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              }
            },
            title: {
              display: false,
              text: 'Chart.js Bar Chart - Stacked'
            },
            tooltips: {
              mode: 'index',
              intersect: false
            },
            responsive: true,
            scales: {
              xAxes: [{
                stacked: true,
              }],
              yAxes: [{
                stacked: true
              }]
            }
          }
        });
      }
    }
  }

  public updateHorizentalBarChart(countries: Country[] | undefined, input: ElementRef, type: string) {
    if (countries && countries.length && input) {
      const topCountries = countries?.slice(0, 3);
      if (topCountries?.length) {
        const barChartData = {
          labels: [topCountries[0].CountryCode, topCountries[1].CountryCode, topCountries[2].CountryCode],
          datasets: [
            {
              label: type === 'recovered' ? 'Guérisons' : 'Décès',
              backgroundColor: type === 'recovered' ? 'green' : 'red',
              borderColor: 'gray',
              borderWidth: 1,
              data: type === 'recovered' ? [
                topCountries[0].TotalRecovered,
                topCountries[1].TotalRecovered,
                topCountries[2].TotalRecovered,
              ] : [
                topCountries[0].TotalDeaths,
                topCountries[1].TotalDeaths,
                topCountries[2].TotalDeaths,
              ]
            }]
        };

        this.barChart = new Chart(input?.nativeElement, {
          type: 'horizontalBar',
          data: barChartData,
          options: {
            elements: {
              rectangle: {
                borderWidth: 2,
              }
            },
            responsive: true,
            legend: {
              display: false,
              position: 'right',
            },
            title: {
              display: false,
              text: 'Chart.js Horizontal Bar Chart'
            }
          }
        });
      }
    }
  }

  public showErrorStickyBox(error: string) {
    this.errorStickyBox.nativeElement.present(error);
    this.showError = true;
  }

  public iconsClick(event: any) {
    if (event.detail === 1)  {
      // Share via WTSP
      this.socialSharing.shareViaWhatsApp('Télécharger l\'Application de suivi du COVID-19').then(() => {
        // Success!
      }).catch(() => {
        this.showErrorStickyBox('Veuillez réssayer ultérieurement');
      });
    } else {
      window.open('https://www.who.int/fr');
    }
  }
}
