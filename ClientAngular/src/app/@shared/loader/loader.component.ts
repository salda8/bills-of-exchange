import { Component, OnInit, Input } from '@angular/core';
import { LoaderQuery } from '@app/state/loader.query';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() isLoading = this.loaderQuery.getIsLoading;
  @Input() size = 5;

  constructor(private loaderQuery: LoaderQuery) {}

  ngOnInit() {}
}
