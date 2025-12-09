import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { AvailableLocale, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [CommonModule],
  templateUrl: './basic-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicPage {

  localeService = inject(LocaleService);
  currentLocale = signal(inject(LOCALE_ID));

  nameLower = signal('fernando');
  nameUpper = signal('FERNANDO');
  fullName = signal('fErNaNdO HeRReRa');

  customDate = signal(new Date());

  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date());
      console.log('tick');
    }, 1000);

    onCleanup(() => {
      clearInterval(interval)
    })

  })

  changeLocale(locale: AvailableLocale) {
    console.log(locale);
    this.localeService.changeLocal(locale);
  }

}
