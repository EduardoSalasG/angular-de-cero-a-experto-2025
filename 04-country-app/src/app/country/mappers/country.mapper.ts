import type { Country } from "../interfaces/country.interface"
import type { RESTCountry } from "../interfaces/rest-countries.interface"

export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      capital: restCountry.capital?.length ? restCountry.capital.join(',') : 'Sin capital',
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
    }
  }

  static mapRestCountryToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.mapRestCountryToCountry)
  }

}
