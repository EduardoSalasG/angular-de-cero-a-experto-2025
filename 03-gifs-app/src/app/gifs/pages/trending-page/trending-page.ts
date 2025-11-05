import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifService } from '../../services/gifs.service';
import { CommonModule } from '@angular/common';
import { ScrollStateService } from 'src/app/shared/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  imports: [GifList, CommonModule],
  templateUrl: './trending-page.html',
  styleUrl: './trending-page.css',
})
export default class TrendingPage implements AfterViewInit {

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }

}
