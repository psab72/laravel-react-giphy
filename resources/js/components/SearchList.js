import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class SearchList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            q: '',
            searchList: [],
            subscriptions: [],
            topsList: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubscribe = this.handleSubscribe.bind(this);
        this.handleUnsubscribe = this.handleUnsubscribe.bind(this);
    }
    componentDidMount() {
        this.getSubscriptions();
    }

    getSubscriptions() {
        axios.get('/api/subscriptions').then(response => {
            this.setState({subscriptions: response.data})
        })
    }

    getSearchList() {
        let apiKey = 'LJ1XLqdZQxKONDT6xXEoel1rOd1Ii81L'

        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${this.state.q}&limit=10`).then(response => {
            this.setState({
                searchList: response.data.data
            });
        });
    }

    getTopsList() {
        let subscription = this.state.subscription.length > 0 ? this.state.subscriptions[0] : '';

        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=@${subscription}&limit=10`).then(response => {
            this.setState({
                topsList: response.data.data
            });
        });
    }

    subscribe(event) {
        axios.post('api/subscriptions', {username: event.target.value}).then(response => {
            alert('Subscribed!')
            this.getSearchList()
        }).catch(error => {
            // alert(error.response.data.errors.username[0])
        });
    }

    unsubscribe(event) {
        axios.delete(`api/subscriptions/${event.target.value}`).then(response => {
            alert('Unsubscribed!')
        }).catch(error => {
            // alert(error.response.data.errors.username[0])
        });
    }

    handleChange(event) {
        this.setState({q: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.getSearchList();
    }

    handleSubscribe(event) {
        this.subscribe(event);
    }

    handleUnsubscribe(event) {
        this.unsubscribe(event);
    }

    render() {
        let items = this.state.searchList.map((item) =>
            <tr key={item.id}>
                <td>
                    <div className="card">
                        <img src={item.images.original.url} className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{typeof item.user !== 'undefined' ? item.user.display_name : ''}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{typeof item.user !== 'undefined' ? `@${item.user.username}` : ''}</h6>
                            {
                                typeof item.user !== 'undefined'
                                ?
                                    <button className="btn btn-outline-primary" value={item.user.username} onClick={this.state.subscriptions.indexOf(item.user.username) > -1 ? this.handleUnsubscribe : this.handleSubscribe} className="card-link">{this.state.subscriptions.indexOf(item.user.username) > -1 ? 'Unsubscribe' : 'Subscribe'}</button>
                                :
                                    ''
                            }
                        </div>
                    </div>
                </td>
            </tr>
        )

        return <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card text-center">
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Search</label>
                                    <input className="form-control" value={this.state.q} onChange={this.handleChange} />
                                </div>
                                <input type="submit" className="btn btn-primary" onClick={this.handleSubmit} />
                            </form>
                        </div>
                    </div>

                    <hr />

                    <div className="card text-center">
                        <div className="card-body">
                            <table className="table">
                                <tbody>
                                    {items}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

ReactDOM.render(<SearchList />, document.getElementById('root'));
