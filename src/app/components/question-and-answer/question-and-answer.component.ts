import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('reply') private answerReply:ElementRef;
  @ViewChild('quest') private questInput:ElementRef

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
  private questions;
  // private qNa=[];
  private qA;

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
      this.qA= response['data']['data'][0].questionAndAnswerNotes;
      LoggerService.log("qa: ", this.qA);
      if(this.show!=0){
        this.question= response['data']['data'][0].questionAndAnswerNotes[0].message;
      }
      this.questions= response['data']['data'][0].questionAndAnswerNotes[0];
      // if(this.questions['rate'].length!=0){
      //   this.rateBody.rate= this.questions.rate[0].rate;
      // }
      this.owner= response['data']['data'][0].user;
      this.img= environment.apiUrl;
      this.firstName= this.owner.firstName;
      this.lastName= this.owner.lastName;
      this.date=response['data']['data'][0].modifiedDate;
      // this.data= response['data']['data'][0].questionAndAnswerNotes[0].id;
      // for(let i=1; i<this.qA.length; i++){
      //   this.qNa.push(this.qA[i])
      // }
  
    })
  }
  close(){
    this.router.navigate(['/home/notes']);
  }
  addQuestion(){
    this.show=!this.show;
    let requestBody={
      "message":this.questInput.nativeElement.innerHTML,
      "notesId": this.noteId
    }
    this.noteService.addQuestionAndAnswer(requestBody).subscribe(result=>{
      LoggerService.log("QnA added: ", result);
    })
  }
  
  like(data){
    let requestBody={
      "like":true
    }
    this.noteService.likeQnA(data.id,requestBody).subscribe(response=>{
      LoggerService.log("like: ", response);
      this.likeCount=response['data']['details'].count;

    })
  }
  
  private rateBody={
    "rate":"" 
  }
  rating(data,event){
    LoggerService.log("in");
    let reqBody={
      "rate": event
    }
    LoggerService.log("rating count: ", reqBody.rate);

    this.noteService.ratingQnA(data.id, reqBody).subscribe(result=>{
      LoggerService.log("rate: ", result);
    })
  }

  private qID;
  answer(id){
    this.replyShow=!this.replyShow;
    this.qID=id;

  }
  private replyBody={
    "reply":""
  };
  
  replying(){
    let replyRequest={
      "message":this.answerReply.nativeElement.innerHTML
    }
    this.noteService.replyQnA(this.qID, replyRequest).subscribe(response=>{
      LoggerService.log("reply response: ", response);

    })
  }
  private rate;
  checkRating(rateArray){
    this.rate=0;
    if(rateArray.length==0){
      return true;
    }
    for(let i=0; i<rateArray.length; i++){
      if(rateArray[i].userId==localStorage.getItem('userId')){
        this.rate=rateArray[i].rate;
      }
    }
    return true;
  }
  private value;
  private avgRate;
  averageRating(rateArray){
    this.value=0;
    if(rateArray.length!=0){
      for(let i=0; i<rateArray.length; i++){
        this.value+=rateArray[i].rate
      }
      this.avgRate=this.value/rateArray.length;
      return this.avgRate.toFixed(1);
    }
  }
  private likes;
  likeCheck(likeArray){
    
    for(let i=0; i<likeArray.length; i++){
      if(likeArray[i].userId==localStorage.getItem('userId')){
        this.likes=likeArray[i].like;
        return true;
      }
    }
    return false;
  }
  private open=true;
  private down=true;
  private rID;
  private replyCount;
  replyDown(replyId){
    this.down=!this.down;
    this.rID=replyId;
  }
  viewReplies(questAns){
    this.replyCount=0;
    for(let i=0; i<this.qA.length; i++){
      if(questAns.id==this.qA[i].parentId){
        this.replyCount++
      }
    }
    return this.replyCount;
  }
}
