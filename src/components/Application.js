import React, { Component } from 'react';
import {firestore, auth, createUserProfileDocument} from '../firebase'

import Posts from './Posts';
import {collectIdsAndDocs} from '../utils/utilities';
import Authentication from './Authentication';

class Application extends Component {
  state = {
    user: null,
  };

  unsubscribeFromAuth = null;

  componentDidMount = async () =>{

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
      const user = await createUserProfileDocument(userAuth);
      console.log(user)
      this.setState({user})
    })

  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  }

  render() {
    const {user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user}/>
        <Posts />
      </main>
    );
  }
}

export default Application;