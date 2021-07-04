import React, { Component } from 'react'
import ArticleService from '../../services/ArticleService';

class ViewArtical extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            artikli: {}
        }
        
}

componentDidMount(){
    ArticleService.getArticleById(this.state.id).then(res => {
        this.setState({artikli: res.data});
    });
}
    

cancel(){
    this.props.history.push('/articles');
}

    render(){
        return(
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center">{this.state.artikli.name}</h2>
                    <div className="card-body">
                    <td> <img alt="" src={`http://localhost:8096/api/articles/getImage/${this.state.artikli.image_src}`} width="70px" height="70px"/></td>
                        <div className="row">
                            <label style={{color:"blue"}}>Vrsta : {this.state.artikli.name}</label>
                        </div><br></br>
                        <div className="row">
                            <label style={{color:"blue"}}>Opis : {this.state.artikli.description}</label>
                        </div><br></br>
                        <div className="row">
                            <label style={{color:"blue"}}>Cena : {this.state.artikli.price}</label>
                        </div><br></br>
                       
                    </div>
                </div>
            </div>
        )
    }

}

export default ViewArtical