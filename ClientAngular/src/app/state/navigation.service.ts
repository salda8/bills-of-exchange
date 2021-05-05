import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavigationStore } from './navigation.store';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  subscription = new Subscription();

  constructor(private navigationStore: NavigationStore, private router: Router) {
    this.subscription.add(
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        this.updateLastUrl(event.url);
      })
    );
  }

  updateLastUrl(url: string) {
    this.navigationStore.update({ url });
  }
}
