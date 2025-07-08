import { UpperCasePipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";


@Component({
  templateUrl: './hero-page.component.html',
  imports: [UpperCasePipe]
})
export class HeroPageComponent {

  name = signal('Ironman')
  age = signal(45)

  heroDescription = computed(() => {
    const description = `${ this.name() } - ${ this.age() }`;
    return description;
  })

  capitalizedName = computed(()=> this.name().toUpperCase())

  getHeroDescription = () =>{
    return `${ this.name } - ${ this.age }`;
  }

  changeHero = () =>{
    this.name.update(()=> 'Spiderman')
    this.age.update(() => 22);
  }

  changeAge= () =>{
    this.age.update(() => 60);
  }

  resetForm = () =>{
    this.name.update(()=> 'Ironman')
    this.age.update(() => 45);
  }

}
