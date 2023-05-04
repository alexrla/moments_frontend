import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment/moment.service';
import { IMoment } from 'src/app/interfaces/Moment';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: IMoment;
  baseApiUrl = environment.baseApiUrl;

  constructor ( 
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    const id  = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService.getMoment(id).subscribe(response => this.moment = response.data);
  }

  async removeMoment(id: number) {
    this.momentService.deleteMoment(id).subscribe({
      next: () => {
        this.messagesService.add("Momento excluído com sucesso!");
        this.router.navigate(["/"]);
      }
    })
  }
}
