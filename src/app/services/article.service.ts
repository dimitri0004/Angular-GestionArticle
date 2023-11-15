import { Injectable } from '@angular/core';
import {ArticleModel, PageArticle} from "../models/Article.model.js";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
    private arti :ArticleModel[]

  constructor() {

  this.arti=[
    {
      id: 1,
      name:"accer",
      price:1200 ,
      promotion:true


    },
      {
          id: 2,
          name:"Hp",
          price:1200 ,
          promotion:false


      },
      {
          id: 3,
          name:"accer",
          price:1200 ,
          promotion:true


      },
      {
          id: 4,
          name:"Hp",
          price:1200 ,
          promotion:false


      },
      {
          id: 5,
          name:"Dell",
          price:12000 ,
          promotion:false


      },
      {
          id: 6,
          name:"Scanneur",
          price:120 ,
          promotion:false


      },
      {
          id: 7,
          name:"accer",
          price:200 ,
          promotion:false


      },
      {
          id: 8,
          name:"wifi",
          price:1200 ,
          promotion:false


      },
      {
          id: 9,
          name:"Routeur",
          price:1200 ,
          promotion:true


      },
      {
          id: 10,
          name:"Hp",
          price:1200 ,
          promotion:false


      },
      {
          id: 11,
          name:"accer",
          price:1200 ,
          promotion:true


      },
      {
          id: 12,
          name:"Hp",
          price:1200 ,
          promotion:false


      },
      {
          id: 13,
          name:"accer",
          price:1200 ,
          promotion:true


      },
      {
          id: 14,
          name:"Hp",
          price:1200 ,
          promotion:false


      },
      {
          id: 15,
          name:"accer",
          price:1200 ,
          promotion:true


      },
      {
          id: 16,
          name:"Hp",
          price:1200 ,
          promotion:false


      },
      {
          id: 17,
          name:"Hp",
          price:1200 ,
          promotion:false


      }
  ]
  }
    public  getAllArticle(){

      return of(this.arti)
    }

    public DeleteArticle(id:number) {

        this.arti = this.arti.filter(a=>a.id=Number(!id));
        return of(true)

    }

    public Setpromotion(id:number){
        let pro=this.arti.find(a=>a.id==id);
        if (pro != undefined){
            pro.promotion=!pro.promotion
            return of(true)
        }else throw new Error("this article does not exist")


    }

    public NoSearchArticle (keyword:string):Observable<ArticleModel[]>{

        let Articles = this.arti.filter(a=>a.name.includes(keyword));
            return of(Articles)




    }
    public SearchArticle (keyword:string,page:number,size:number){
        let result = this.arti.filter(a=>a.name.includes(keyword));

        let index = page*size;
        let totalPage = ~~(result.length/size)
        if (result.length % size !=0){
            totalPage++
        }
        let EPageArticle= result.slice(index,index+size);
        return of({page:page,size:size,totalPage:totalPage,arti: EPageArticle})




    }

    public  getPageArticle(page:number,size:number){
        let index = page*size;
        let totalPage = ~~(this.arti.length/size)
        if (this.arti.length % size !=0){
            totalPage++
        }
        let EPageArticle= this.arti.slice(index,index+size);
        return of({page:page,size:size,totalPage:totalPage,arti: EPageArticle})


    }
}
