import axios from 'axios'

const ARTICLES_REST_API_URL = 'http://localhost:8096/api/articles';

class ArticleService{
    getArticles(){

        let user = localStorage.getItem("user")
        var json = JSON.parse(user);
        return axios.get(ARTICLES_REST_API_URL, {
            headers: {
                'Authorization': `Bearer ${json.accessToken}`
              }
        });
    }

    getImages(image_src){

        let user = localStorage.getItem("user")
        var json = JSON.parse(user);
        return axios.get(ARTICLES_REST_API_URL + "/getImage/" + image_src, {
            headers: {
                'Authorization': `Bearer ${json.accessToken}`
              }
        });
    }

    createArticle(article){
        let user = localStorage.getItem("user")
        let json = JSON.parse(user);
        const formdata = new FormData();
        formdata.append("name", article.name)
        formdata.append("description", article.description)
        formdata.append("price", article.price)
        formdata.append("image_src", article.image_src)
        return axios.post(ARTICLES_REST_API_URL + "/new", formdata, {headers: {
            'Authorization': `Bearer ${json.accessToken}`,
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods":"DELETE, POST, GET, OPTIONS",
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type':  'multipart/form-data'
          }});
    }

    getArticleById(articleId){
        let user = localStorage.getItem("user")
        var json = JSON.parse(user);
        return axios.get(ARTICLES_REST_API_URL + '/' + articleId, {headers: {
            'Authorization': `Bearer ${json.accessToken}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type':  'application/json'
          }})
    }

    updateArticle(article, articleId){
        let user = localStorage.getItem("user")
        var json = JSON.parse(user);
        const formdata = new FormData();
        formdata.append("name", article.name)
        formdata.append("description", article.description)
        formdata.append("price", article.price)
        formdata.append("image_src", article.image_src)
        return axios.put(ARTICLES_REST_API_URL + '/' + articleId, formdata, {headers: {
            'Authorization': `Bearer ${json.accessToken}`,
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods":"DELETE, POST, GET, OPTIONS",
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type':  'multipart/form-data'
          }});
    }

    deleteArticle(articleId){
        let user = localStorage.getItem("user")
        var json = JSON.parse(user);
        return axios.delete(ARTICLES_REST_API_URL + '/' + articleId, {headers: {
            'Authorization': `Bearer ${json.accessToken}`,
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods":"DELETE, POST, GET, OPTIONS",
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type':  'application/json'
          }});
    }
}


export default new ArticleService();