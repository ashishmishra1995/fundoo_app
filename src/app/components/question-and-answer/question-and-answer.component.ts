import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NoteService } from '@service/note-service/note-service.service';
import { LoggerService } from '@service/logger/logger.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-question-and-answer',
  templateUrl: './question-and-answer.component.html',
  styleUrls: ['./question-and-answer.component.scss']
})
export class QuestionAndAnswerComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
      private noteService: NoteService,
      private router: Router) { }

  private noteId;
  private title;
  private description;
  private question;
  private show;
  private body={
    "question":""
  }
  private owner;
  private img; 
  private firstName;
  private lastName;
  private date;
  private replyShow= false;
  private data;
  private likeCount;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.noteId = params['noteId'];
    });
    this.noteService.getNoteDetails(this.noteId).subscribe(response=>{
      LoggerService.log("noteId: ", this.noteId);
      LoggerService.log("noteDetails: ", response);
      this.title= response['data']['data'][0].title;
      this.description= response['data']['data'][0].description;
      this.show= response['data']['data'][0].questionAndAnswerNotes.length;
      if(this.show!=0){
        this.question= response['data']['data'][0].questionAndAnswerNotes[0].message;
      }
      this.owner= response['data']['data'][0].user;
      this.img= environment.apiUrl+this.owner.imageUrl;
      this.firstName= this.owner.firstName;
      this.lastName= this.owner.lastName;
      this.date=response['data']['data'][0].modifiedDate;
      this.data= response['data']['data'][0].questionAndAnswerNotes[0].id;
    })
  }
  close(){
    this.router.navigate(['/home/notes']);
  }
  addQuestion(){
    this.show=!this.show;
    let requestBody={
      "message":this.body.question,
      "notesId": this.noteId
    }
    this.noteService.addQuestionAndAnswer(requestBody).subscribe(result=>{
      LoggerService.log("QnA added: ", result);
    })
  }
  answer(){
    this.replyShow=!this.replyShow;
  }
  like(){
    let requestBody={
      "like":true
    }
    this.noteService.likeQnA(this.data,requestBody).subscribe(response=>{
      LoggerService.log("like: ", response);
      this.likeCount=response['data']['details'].count;

    })
  }
  private replyBody={
    "reply":""
  };
  reply(){
    let replyRequest={
      "message":this.replyBody.reply
    }
    this.noteService.replyQnA(this.data, replyRequest).subscribe(response=>{
      LoggerService.log("reply response: ", response);

    })
  }
  private rateBody={
    "rate":""
  }
  
  rate(){
    let reqBody={
      "rate": this.rateBody.rate
    }
    LoggerService.log("rating count: ", reqBody.rate);

    this.noteService.ratingQnA(this.data, reqBody).subscribe(result=>{
      LoggerService.log("rate: ", result);
    })
  }

}
