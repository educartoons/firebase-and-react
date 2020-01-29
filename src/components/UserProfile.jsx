import React, {Component} from 'react';
import { auth, firestore } from '../firebase';

class UserProfile extends Component{
  state = {
    displayName: ''
  }
  imageInput = null;
  get uid(){
    return auth.currentUser.uid;
  }
  get userRef(){
    return firestore.doc(`/users/${this.uid}`);
  }
  handleChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }
  handleSubmit = event => {
    event.preventDefault();
    const {displayName} = this.state;
    if(displayName){
      this.userRef.update({displayName});
    }
  }
  render(){
    const {displayName} = this.state;
    return (
      <section className="UserProfile">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="displayName" value={displayName} placeholder="Display Name" onChange={this.handleChange}/>
          <input type="file" ref={ref=>this.imageInput = ref}/>
          <input className="update" type="submit"/>
        </form>
      </section>
    )
  }
}

export default UserProfile;