import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment/moment.service';
import { IMoment } from 'src/app/interfaces/Moment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allMoments: IMoment[] = [];
  moments: IMoment[] = [];
  faSearch = faSearch;
  baseApiUrl = environment.baseApiUrl;
  searchTerm: string = "";

  constructor(
    private momentService: MomentService,
  ) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((response) => {
      const data = response.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString("pt-BR");
      });

      this.allMoments = data;
      this.moments = data;
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.moments = this.allMoments.filter((moment) => {
      return moment.title?.toLowerCase().includes(value);
    });
  }
}
