import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MomentService } from 'src/app/services/moment/moment.service';
import { IMoment } from 'src/app/interfaces/Moment';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  text: string = "Compartilhar";

  constructor ( 
    private momentService: MomentService, 
    private messagesService: MessagesService,
    private router: Router,
  ) {}

  async createHandler(moment: IMoment) {
    const formData = new FormData();

    formData.append("title", moment.title);
    formData.append("description", moment.description);

    if(moment.image) {
      formData.append("image", moment.image);
    }

    this.momentService.createMoment(formData).subscribe({
      next: () => {
        this.messagesService.add("Momento adicionado com sucesso!");
        this.router.navigate(["/"]);
      }
    });
  }
}
