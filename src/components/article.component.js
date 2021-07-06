import React, {useContext} from 'react'
import ArticleService from '../services/ArticleService'


export default class ArticleComponent extends React.Component{


    constructor(props){
        super(props)
        this.state = {
            articles:[]
        }



        this.addArticle = this.addArticle.bind(this);
        this.viewArticle = this.viewArticle.bind(this);
        this.editArticle = this.editArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.getImages = this.getImages.bind(this);
    }

    componentDidMount(){
        ArticleService.getArticles().then((response) =>{
            this.setState({articles:response.data})
        });

    }
    viewArticle(id){
        this.props.history.push(`viewArticle/${id}`);
    }

    addArticle(){
        this.props.history.push('/addArticle');
    }

    deleteArticle(id){
        ArticleService.deleteArticle(id).then(res => {
            this.setState({artikli: this.state.articles.filter(articles => articles.id !== id)});
            this.props.history.push('/deleteArticle')
        });

    }

    getImages(image_src){
        ArticleService.getImages(image_src).then(res =>{
            this.state({image: res.data})
        })
    }

    editArticle(id){
        this.props.history.push(`/updateArticle/${id}`);
    }





    render(){
        return (
            <div>
                <h1 className="text-center"> Artikli </h1>
            
                <div className="row">
                    

                </div>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td><b>Image</b></td>
                            <td><b>Name</b></td>
                            <td><b>Description</b></td>
                            <td><b>Price</b></td>
                            <td><b>Actions</b></td>

                        </tr>
                    </thead>
                    

                    <tbody>

                        {
                            
                            this.state.articles.map(
                                article=>
                                    <tr key = {article.id}>
                                    
                                        <td> <img alt="" src={`http://localhost:8096/api/articles/getImage/${article.image_src}`} width="70px" height="70px"/></td>
                                        <td> {article.name}</td>
                                        <td>{article.description}</td>
                                        <td>{article.price}</td>
                                        <td>
                                        <button style={{marginLeft: "10px"}} onClick={ () => this.viewArticle(article.id)} className="btn btn-info">View</button>
                                        <button style={{marginLeft: "10px"}}  onClick={ () => this.editArticle(article.id)} className="btn btn-info">Update</button>
                                        <button style={{marginLeft: "10px"}} onClick={ () => this.deleteArticle(article.id)} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>

                                
                            )   

                        }
                    </tbody>

                </table>
                <button className="btn btn-success" onClick={this.addArticle}>Add</button>


 

            </div>
        )
    }

}
