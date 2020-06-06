import React,{Component} from 'react';
import * as constants from '../../constants';

// ({onRouteChange}) =>
class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',            
            password:'',     
            name:'',
        }
    }

    onEmailChange =(event)=>{
        this.setState({
            email:event.target.value
        })
    }

    onPasswordChange =(event)=>{
        this.setState({
            password:event.target.value
        })
    }

    onNameChange =(event)=>{
        this.setState({
            name:event.target.value
        })
    }

    onSubmitRegister = () =>{
        const {email,password,name} = this.state;
        // console.log(constants.BACKEND_SERVER_URL);
        fetch(constants.BACKEND_SERVER_URL+'/register',{
            method:'post',
            headers: {'Content-type':'application/json'},
            body:JSON.stringify({email,password,name})
        })
        .then(resp=>resp.json())
        .then(data=>{
            const {status,message} = data;
            if (status === 'success'){
                this.props.onRouteChange('signin');
            }else{
                console.log("Error: ",message);
            }
        })
    }

    render()
    {        
        return(
        //ref from https://tachyons.io/components/cards/product-card/index.html
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        {/* ref from https://tachyons.io/components/forms/sign-up/index.html */}
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" 
                        name="name"  
                        id="name"
                        onChange={this.onNameChange}
                    />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address"                        
                        onChange={this.onEmailChange}    
                    />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"
                        onChange={this.onPasswordChange}
                    />
                </div>
                </fieldset>
                <div className="">
                <input 
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Register"
                    onClick= {this.onSubmitRegister}
                />
                </div>
            </div>
            </main>
        </article>
        
        )
    }
}

export default Register;