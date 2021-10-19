import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AlertDataInterface,
  DataService,
  Filter,
  PropertyData,
} from '../data.service';

@Component({
  selector: 'app-data-section',
  templateUrl: './data-section.component.html',
  styleUrls: ['./data-section.component.scss'],
})
export class DataSectionComponent implements OnInit, OnDestroy {
  @Input()
  public section: string;

  sectionTitle = '';
  sectionData: PropertyData[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadSectionData(this.dataService.alerts);
    this.dataService.dataEmitter.subscribe((data) =>
      this.loadSectionData(data)
    );
  }

  ngOnDestroy() {
    this.dataService.dataEmitter.unsubscribe();
  }

  loadSectionData(data: AlertDataInterface[]) {
    this.sectionData = this.dataService.getPropertyData(this.section, data);
  }

  applyFilter(event: Event, property: string) {
    if (event) {
      event.preventDefault();
    }
    const newFilter: Filter = {
      property: this.section as keyof AlertDataInterface,
      value: property,
    };
    this.dataService.addFilter(newFilter);
  }
}
