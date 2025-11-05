import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearch } from '../../components/country-search/country-search';

@Component({
  selector: 'app-by-region-page',
  imports: [CountrySearch, CountryList],
  templateUrl: './by-region-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPage { }
