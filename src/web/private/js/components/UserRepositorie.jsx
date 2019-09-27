import React, {Component} from 'react';
import axios from 'axios';
class UserRepositorie extends Component {
    constructor(){
        super();
        this.state = {
            repos : [],
        };
        this.fetchData = this.fetchData.bind(this);
        this.getRepositories = this.getRepositories.bind(this);
    }
    fetchData(){
        axios.get(`/api/users/${this.props.username}/repos`)
            .then(res => {
            let repos = res.data.data.repositories;
            this.setState({ repos });
        })      
    }
    getRepositories(){
        this.fetchData();
    }
    render(){
        let lines =  this.state.repos.length   
            ? this.state.repos.map((el,index)=>{
                return <tr key={index}><td>{el.id}</td><td>{el.name}</td><td><a target='_blank' href={el.html_url}>{el.html_url}</a></td></tr>
            })
            : <tr><td></td><td></td><td></td></tr>
        return (
            <React.Fragment>
                <div className={'divTable'}>
                    <table border="1" className={'tableStyle'}><tbody><tr><td>ID</td><td>Name</td><td>Url</td></tr>{lines}</tbody></table>
                </div>
                <div className={'getRepositoriesButton'}>
                    <button onClick={this.getRepositories}>Get repositories</button>
                </div>
            </React.Fragment>
        )
    }
}
export default UserRepositorie;