
export interface ArticleModel{
  id:number,
  name:String,
  price: number,
  promotion: boolean

}

export interface PageArticle{
  page:number;
  size:number;
  totalPage:number;
}
