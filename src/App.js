import React, { Component } from 'react';
import logo from './logo.svg';
import fire ,{ auth, provider } from './fbase';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this);
  
  }
  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
    }
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const usr = result.user;
        
        this.setState({
          user: {"name" : usr.displayName, "photo": usr.photoURL}
        });
      });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to CTM</h1>
          <div className="wrapper">
            <h1>Clifton</h1>
            {this.state.user ?
              <button onClick={this.logout}>Logout</button>                
            :
              <button onClick={this.login}>Log In</button>              
            }
          </div>
        </header>
        <section className='guest'>
  
        {this.state.user ?
         <p className="App-intro">
         Your login name: {this.state.user.name} !
         <img src={this.state.user.photo} alt="Your face"/>
         
       </p>
      
    :
    <div className='wrapper'>
      <p>You must be logged in to see secret stuff.</p>
    </div>
  }
    </section>
  
      </div>
    );
  }
  
}

export default App;
