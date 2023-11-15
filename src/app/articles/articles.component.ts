import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from "../services/article.service";
import {ArticleModel} from "../models/Article.model.js";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements  OnInit{
   @Input() arti! : ArticleModel[];
   errorMessage!:string;
   SearchFormGroup! : FormGroup;
   currentPage=0;
   size=5;
   totalPages!:number;
   currentAction="all"
  constructor(private articleservice:ArticleService, private fb:FormBuilder,public loginservice:LoginService) {
     this.errorMessage="error d'exécution veuillez ressayer"

  }
  ngOnInit(): void {

    this.SearchFormGroup=this.fb.group({
      keyword : this.fb.control(null)
    })
    this.handleGetPageArticle();

  }

  /*handleDelete(a:ArticleModel){
    const index = this.arti.indexOf(a)
    this.arti.splice(index,1)

  }*/
  handleGetPageArticle(){
    this.articleservice.getPageArticle(this.currentPage,this.size).subscribe({
      next :(data)=>{
        this.arti=data.arti;
        this.totalPages=data.totalPage

      },
      error :(err)=>{
        this.errorMessage=err;
      }
    })
  }

  handleGetAllArticle(){
    this.articleservice.getAllArticle().subscribe({
      next :(data)=>{
        this.arti=data;
      },
      error :(err)=>{
        this.errorMessage=err;
      }
    })
  }

  handleDelete(a:ArticleModel){
    let conf=confirm("Are you sur to delete this article?")
    if (conf==false) return;
    this.articleservice.DeleteArticle(a.id).subscribe({
      next : (data) =>{
        const index = this.arti.indexOf(a)
        this.arti.splice(index,1)

    }
    })

  }


  handlePromotion(a: ArticleModel) {
      let promo = a.promotion
    this.articleservice.Setpromotion(a.id).subscribe({
      next: (data)=>{
        a.promotion=!promo;
      },
      error :(err) => {
        this.errorMessage=err;
      }
    })

  }

  handleSearch() {
    this.currentPage=0
    this.currentAction="search"
    let keyword = this.SearchFormGroup.value.keyword
    this.articleservice.SearchArticle(keyword,this.currentPage,this.size).subscribe({
      next:(data)=>{
        this.arti=data.arti;
        this.totalPages=data.totalPage

    },
    error : (err)=>{
        this.errorMessage="error"

    }
    })
  }

  gotPage(i:number) {
    this.currentPage=i;
    if (this.currentAction=="all") {
      this.handleGetPageArticle()

    }else {
      this.handleSearch()
    }


  }
}
