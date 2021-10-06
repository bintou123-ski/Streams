import React from "react";
import {connect} from "react-redux";
import {signIn,signOut} from "../actions"

class GoogleAuth extends React.Component {
    componentDidMount(){
    window.gapi.load('client:auth2', ()=>{
        window.gapi.client
          .init({
            clientId:'1037365966196-edj45sqh9nue0h6ssg4ad1lh59egmcte.apps.googleusercontent.com',
            scope:'email'
        }).then(()=>{
            this.auth = window.gapi.auth2.getAuthInstance();
            {/*this.setState({isSignedIn:this.auth.isSignedIn.get()});*/}
            this.onAuthChange(this.auth.isSignedIn.get())
            this.auth.isSignedIn.listen(this.onAuthChange)
        })
    })
    };

    onAuthChange =isSignedIn=>{
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        }else{
            this.props.signOut()
        }
    }
    onSignInClick =()=>{
       this.auth.signIn()
   }
    onSignOutClick =()=>{
       this.auth.signOut()
   }
    renderAuthComponent(){
        if(this.props.isSignedIn === null){
           return null;
        }else if(this.props.isSignedIn){
            return<div>
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            </div>
        }
        else{
           return <div>
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>
                    sign Out
                </button>
           </div>
        }
    }
    render() { 
        return ( 
            <div>{this.renderAuthComponent()}</div>
         );
    }
}

const mapStateToProps = (state)=>{
    return{isSignedIn:state.auth.isSignedIn}
}
 
export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);