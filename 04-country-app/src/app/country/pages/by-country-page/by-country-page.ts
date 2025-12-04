import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearch } from '../../components/country-search/country-search';
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearch, CountryList],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPage {
  countryService = inject(CountryService);
  query = linkedSignal(() => this.queryParam ?? '');

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  countryResource = rxResource({

    params: () => ({ query: this.query() }),
    stream: ({ params }) => {

      if (!params.query) return of([]);

      this.router.navigate(['country/by-country'], {
        queryParams: {
          query: params.query,
        }
      })

      return this.countryService.searchByCountry(params.query);
    },
  })

}
