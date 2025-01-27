import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { Data } from '../class';
import { Location } from '@angular/common';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    initial: Data;
    final: Data;
  constructor(
    private formService: FormService,
    private location: Location) { }

  ngOnInit(): void {
    this.updateInfo();
  }
  opinion = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    comment: new FormControl(''),
    feedback: new FormControl('', Validators.required)
  });
    onSubmit(){
    this.final = {
    name: this.opinion.controls['name'].value,
    email: this.opinion.controls['email'].value,
    comment: this.opinion.controls['comment'].value,
    feedback: this.opinion.controls['feedback'].value
    }
    this.formService.postInfo(this.final);
  }

  updateInfo() {
    this.formService.getInfo()
    .subscribe((data:Data) => {
    this.initial = {
    name: data.name,
    feedback: data.feedback,
    email: data.email,
    comment: data.comment,
    };
    console.log(this.initial);
    this.opinion.setValue({
    name: this.initial.name,
    email: this.initial.email,
    comment: this.initial.comment,
    feedback: this.initial.feedback
    });this.formService.log('fetched data');},
    (err:any) => {this.formService.handleError(err);this.formService.log('error while fetching data');})
  }
}
