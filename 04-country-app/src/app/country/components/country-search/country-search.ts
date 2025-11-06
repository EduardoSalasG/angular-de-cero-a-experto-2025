import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-country-search',
  imports: [],
  templateUrl: './country-search.html',
})
export class CountrySearch {

  placeholder = input<string>('Buscar');

  value = output<string>()

}
