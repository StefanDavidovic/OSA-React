import React, { Component } from 'react'
import ArticleService from '../../services/ArticleService';


class EditArticle extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            description: '',
            price: '',
            image:'',
            image_src: null



        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeImageHandler = this.changeImageHandler.bind(this);



        this.updateArticle = this.updateArticle.bind(this);
}

componentDidMount(){
    ArticleService.getArticleById(this.state.id).then( (res) =>{
        let article = res.data;
        console.log(article + "BLA")
        this.setState({
            name: article.name,
            description: article.description,
            price: article.price,
            image_src: article.image_src
            
        });

    });
}

updateArticle = (e) =>{
        e.preventDefault();
        let article = {name: this.state.name, description: this.state.description, price: this.state.price, image_src: this.state.image_src}
        ArticleService.updateArticle(article, this.state.id).then(res => {
            this.props.history.push('/articles');
        });
   
}

changeNameHandler= (event) =>{
    this.setState({name: event.target.value});
}

changeDescriptionHandler= (event) =>{
    this.setState({description: event.target.value});
}

changePriceHandler= (event) =>{
    this.setState({price: event.target.value});
}




changeImageHandler= (event) =>{
    this.setState({image_src: event.target.files[0]});
    console.log(this.state.image_src)
    console.log(event.target.files[0])

}



cancel(){
    this.props.history.push('/articles');
}

    render(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Izmeni artikal</h3>
                            <div className="card-body">
                                <form encType="multipart/form-data">
                                    <div className="form-group">
                                        <label>Naziv</label>
                                        <input placeholder="Naziv" name="name" className="form-control"
                                            value={this.state.name} onChange={this.changeNameHandler}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Opis</label>
                                        <input placeholder="Opis" name="description" className="form-control"
                                            value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Cena</label>
                                        <input placeholder="Cena" name="price" className="form-control"
                                            value={this.state.price} onChange={this.changePriceHandler}/>       
                                    </div>

                                    <div className="form-group">
                                        <label>Slika</label>
                                        <input type="file"  name="image_src"  onChange={this.changeImageHandler}/>       
                                    </div>

        
                                    <button className="btn btn-success" onClick={this.updateArticle}>Edit</button>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default EditArticle