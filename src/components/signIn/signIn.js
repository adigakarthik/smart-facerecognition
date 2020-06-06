import React,{Component} from 'react';
import * as constants from '../../constants';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state={
            signInEmail:'',            
            signInPassword:'',
        }
    }

    onEmailChange =(event)=>{
        this.setState({
            signInEmail:event.target.value
        })
    }

    onPasswordChange =(event)=>{
        this.setState({
            signInPassword:event.target.value
        })
    }

    onSubmitSignIn= ()=>{
        // console.log(constants.BACKEND_SERVER_URL);
        fetch(constants.BACKEND_SERVER_URL+'/signin',{
            method:'post',
            headers: {'Content-type':'application/json'},
            body:JSON.stringify({
                "email":this.state.signInEmail,
                "password":this.state.signInPassword,
            })
        })
        .then(resp=>resp.json())
        .then(data=>{
            const {status,user,CLARIFAI_API_KEY,message} = data;
            if (status === 'success'){
                this.props.onSignInComplete({user,CLARIFAI_API_KEY});
                this.props.onRouteChange('home');
            }else{
                console.log("Error: ",message);
            }
        })        
    }

    render()
    {        
    const {onRouteChange} = this.props;
        return(
            //ref from https://tachyons.io/components/cards/product-card/index.html
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            {/* ref from https://tachyons.io/components/forms/sign-up/index.html */}
                <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            onChange={this.onEmailChange} 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            onChange={this.onPasswordChange} 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"                            
                        />
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Sign in"
                        onClick= {this.onSubmitSignIn}
                    />
                    </div>
                    <div className="lh-copy mt3">
                    <p onClick= {()=>onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                    </div>
                </div>
                </main>
            </article>
            
        )

    }
}

export default SignIn;