import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment/moment.service';
import { IMoment } from 'src/app/interfaces/Moment';
import { IComment } from 'src/app/interfaces/Comment';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: IMoment;
  baseApiUrl = environment.baseApiUrl;

  commentForm!: FormGroup;

  constructor ( 
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    const id  = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService.getMoment(id).subscribe(response => this.moment = response.data);
  
    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get("text")!;
  }

  get username() {
    return this.commentForm.get("username")!;
  }

  removeMoment(id: number) {
    this.momentService.deleteMoment(id).subscribe({
      next: () => {
        this.messagesService.add("Momento excluído com sucesso!");
        this.router.navigate(["/"]);
      }
    });
  }

  onSubmit(formDirective: FormGroupDirective) {
    if(this.commentForm.invalid) {
      return;
    }

    const id = Number(this.moment!.id);

    const data: IComment = this.commentForm.value;

    data.momentId = id;

    this.commentService.createComment(id, data).subscribe({
      next: (response) => {
        this.moment!.comments!.push(response.data);

        this.messagesService.add("Comentário adicionado!");
      
        // Limpando o formulário
        this.commentForm.reset();

        // Limpando o modelo do formulário
        formDirective.resetForm();
      }
    });
  }
}
