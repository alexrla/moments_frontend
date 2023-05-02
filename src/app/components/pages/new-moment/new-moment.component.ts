import { Component } from '@angular/core';
import { MomentService } from 'src/app/services/moment/moment.service';
import { IMoment } from 'src/app/interfaces/Moment';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  text: string = "Compartilhar";

  constructor ( private momentService: MomentService, ) {}

  async createHandler(moment: IMoment) {
    const formData = new FormData();

    formData.append("title", moment.title);
    formData.append("description", moment.description);

    if(moment.image) {
      formData.append("image", moment.image);
    }

    await this.momentService.createMoment(formData).subscribe();
  }
}
