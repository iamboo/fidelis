import { EventEmitter, Injectable, Output } from '@angular/core';
import data from '../assets/data/alerts.json';

export interface DisplayAlertDataInterface {
  Severity: string;
  ClientIP: string;
  Protocol: string;
  ClientCountry: string;
}

export interface AlertDataInterface extends DisplayAlertDataInterface {
  AlertId: number;
  AlertTime: string;
  ServerIP: string;
}

export interface Filter {
  property: keyof AlertDataInterface;
  value: string;
}

export interface PropertyData {
  label: string;
  count: number;
}

@Injectable()
export class DataService {
  dataKeys = ['Severity', 'ClientIP', 'Protocol', 'ClientCountry']; // Todo: figure out how to pull these from DisplayAlertDataInterface and eliminate static and duplicated text
  alerts: AlertDataInterface[] = data;
  filters: Filter[] = [];

  @Output() public filterEmitter: EventEmitter<Filter[]> = new EventEmitter();
  @Output() public dataCountEmitter: EventEmitter<number> = new EventEmitter();
  @Output() public dataEmitter: EventEmitter<AlertDataInterface[]> =
    new EventEmitter();

  destroyService() {
    this.filterEmitter.complete();
    this.dataCountEmitter.complete();
    this.dataEmitter.complete();
  }

  getPropertyData(
    property: string,
    data: AlertDataInterface[]
  ): PropertyData[] {
    const key = property as keyof AlertDataInterface;
    const filtered = data.map((d) => d[key]);
    const countResult: PropertyData[] = [];
    filtered.forEach((f) => {
      const found = countResult.find((data) => data.label === f);
      if (found) {
        found.count++;
      } else {
        countResult.push({ label: f as string, count: 1 });
      }
    });
    return countResult;
  }

  filterData() {
    if (this.filters) {
      this.alerts = data.filter((d) => {
        let match = true;
        this.filters.forEach((filter: Filter) => {
          match = match && d[filter.property] === filter.value;
        });
        return match;
      });
    } else {
      this.alerts = data;
    }
    this.filterEmitter.emit(this.filters);
    this.dataCountEmitter.emit(this.alerts.length);
    this.dataEmitter.emit(this.alerts);
  }

  addFilter(filter: Filter) {
    const foundFilter = this.filters.find(
      (f) => f.property === filter.property
    );
    if (foundFilter) {
      foundFilter.value = filter.value;
    } else {
      this.filters.push(filter);
    }
    this.filterData();
  }

  removeFilter(filter: Filter | null) {
    const foundIndex = filter
      ? this.filters.findIndex((f) => f.property === filter.property)
      : -1;
    if (foundIndex > -1) {
      this.filters.splice(foundIndex, 1);
    }
    if (!filter) {
      this.filters = [];
    }
    this.filterData();
  }
}
