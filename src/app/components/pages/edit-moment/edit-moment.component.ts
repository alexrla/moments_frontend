import { Component, OnInit } from '@angular/core';
import { IMoment } from 'src/app/interfaces/Moment';
import { MomentService } from 'src/app/services/moment/moment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {
  moment!: IMoment;
  text: string = "Editar";

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService.getMoment(id).subscribe(response => this.moment = response.data);
  }

  editHandler(newMoment: IMoment) {
    const id = this.moment.id;

    const formData = new FormData();

    formData.append("title", newMoment.title);
    formData.append("description", newMoment.description);
    
    if(newMoment.image) {
      formData.append("image", newMoment.image);
    }

    this.momentService.updateMoment(id!, formData).subscribe({
      next: () => {
        this.messagesService.add(`Momento atualizado com sucesso!`);
      
        this.router.navigate(["/"]);
      }
    });
  }
}
