import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { timer, take } from 'rxjs';
import { PromptComponentComponent } from '../components/prompt-component/prompt-component.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private promptEvent: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private platform: Platform
  ) {}

  public initPwaPrompt() {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.IOS) {
      const isInStandaloneMode =
        'standalone' in window.navigator && window.navigator['standalone'];
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    // timer(3000)
    //   .pipe(take(1))
    //   .subscribe(() =>
    //     this.bottomSheet.open(PromptComponentComponent, {
    //       data: { mobileType, promptEvent: this.promptEvent },
    //     })
    //   );
  }
}
