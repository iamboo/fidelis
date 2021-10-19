import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService, Filter } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService],
})
export class AppComponent implements OnInit, OnDestroy {
  dataKeys: string[] = [];
  filters: Filter[] = [];
  dataCount: number = this.dataService.alerts.length;

  constructor(private dataService: DataService) {
    this.dataService.filterEmitter.subscribe((filters) => {
      this.filters = filters;
    });
    this.dataService.dataCountEmitter.subscribe((count) => {
      this.dataCount = count;
    });
  }

  ngOnInit() {
    this.dataKeys = this.dataService.dataKeys;
  }

  removeFilter(filter: Filter) {
    this.dataService.removeFilter(filter);
  }

  clearAllFilters(event: Event) {
    if (event) {
      event.preventDefault();
    }
    this.dataService.removeFilter(null);
  }

  ngOnDestroy() {
    this.dataService.filterEmitter.unsubscribe();
    this.dataService.dataCountEmitter.unsubscribe();
    this.dataService.destroyService();
  }
}
