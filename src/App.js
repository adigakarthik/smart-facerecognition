import React,{Component} from 'react';
import Navigation from './components/navigation/navigation'
import Logo from './components/logo/logo'
import ImageLinkForm from './components/imageLinkForm/imageLinkForm'
import Rank from './components/rank/rank'
import FaceRecognition from './components/faceRecognition/faceRecognition'
import SignIn from './components/signIn/signIn'
import Register from './components/Register/register'
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import * as constants from './constants';


// const CLARIFAI_API_KEY = 'a63056eda9544a82af4f48d565a340b7'

//todo: move this to server-side, as it is baked in at buildtime

// const CLARIFAI_API_KEY = process.env.REACT_APP_CLARIFAI_API_KEY;
// console.log('CLARIFAI_API_KEY',CLARIFAI_API_KEY);


let app = null ;

const ParticlesOptions=
{
  "particles": {
      "number": {
          "value": 100
      },
      density: {
        enable:true,
        value_area: 800,
      }
      // "size": {
      //     "value": 3
      // }
  },
  // "interactivity": {
  //     "events": {
  //         "onhover": {
  //             "enable": true,
  //             "mode": "repulse"
  //         }
  //     }
  // }
};

const initialState = {
  input:'',
  imageUrl:'',
  boxes: {},
  route: 'signin',
  client_id:'',
  user:{        
    email:'',
    id:'',
    name:'',
    entries:0,
    joined:'',
  },
}

class App extends Component{
  constructor(){
    super();
    this.state = initialState
  }

  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //   .then(res => res.json())
  //   .then(console.log)
  //   .catch(console.log)
  // }

  calculateFaceLocation = (resp) =>{
    const inpImg = document.getElementById('inputImage');
    // console.log('calculateFaceLocation',inpImg);
    const width = Number(inpImg.width);
    const height = Number(inpImg.height);
    // console.log(`Image width x height: ${width} x ${height}`);
    // console.log('calculateFaceLocation arr',data.outputs[0].data.regions);
    console.log('calculateFaceLocation arr',resp);
    try{
      const outputData = resp.outputs[0].data.regions;
      //Todo: need to handle this gracefully.
      if (outputData.length >0){
        console.log('valid response')
      }else{        
        console.log('No faces available response')
      }
      const clarifaiFaceArray = outputData.map(face=>{
        return {
          id:face.id,
          left_col: face.region_info.bounding_box.left_col * width,
          top_row: face.region_info.bounding_box.top_row * height,
          right_col: width -(face.region_info.bounding_box.right_col * width),
          bottom_row: height - (face.region_info.bounding_box.bottom_row * height)
        }
      });
      // console.log('calculateFaceLocation arr2',clarifaiFaceArray);
      return clarifaiFaceArray 

    }catch (ex){
      console.log('calculateFaceLocation error',ex);
      return 0;
    } 
  }

  displayFaceBox =(boxes)=>{
    this.setState({boxes:boxes});
  }

  onInputChange = (event) =>{
    // console.log(event.target.value);
    this.setState({
      input:event.target.value
    })
  }

  onDetectSubmit = () =>{
    debugger;
    this.setState({
      imageUrl:this.state.input
    })

    // console.log('onDetectSubmit input',this.state.input);
    // Clarifai.FACE_DETECT_MODEL=a403429f2ddf4b49b307e318f00e528b
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(
        response =>{
          console.log(response.status.description);
          //If Status is Ok
          if (response.status.description === 'Ok'){
            this.displayFaceBox(this.calculateFaceLocation(response));
              fetch(constants.BACKEND_SERVER_URL+'/image-entries',{
                  method:'put',
                  headers: {'Content-type':'application/json'},
                  body:JSON.stringify({id:this.state.user.id})
              })
              .then(resp=>resp.json())
              .then(data=>{
                  const {status,user,message} = data;
                  if (status === 'success'){
                      // update the specific key in a nested object
                      // https://medium.com/javascript-in-plain-english/react-updating-a-value-in-state-array-7bae7c7eaef9
                      // or Object.assign() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
                      //get user info from state;
                      let userCopy = {...this.state.user};
                      // update the value in user
                      userCopy.entries = user.entries;
                      this.setState({user:userCopy});
                  }else{
                      console.log("Error: ",message);
                  }
              }) 
          }
        }
      )
    .catch(err => console.log('clarifai err',err));
  }

  onRouteChange = (routeName) =>{
    if(routeName === 'signin'){
      this.setState(initialState);
    } else{
      this.setState({route:routeName});
    }
  }

  onSignInComplete =(signInData)=>{
    debugger;
      const {user,CLARIFAI_API_KEY} = signInData;
      app = new Clarifai.App({
        apiKey: CLARIFAI_API_KEY
       });
      
      this.setState(
        {
          user:user,
        }
        );
  }

  // maintain a render group if route is complex than simple if statement
  // https://stackoverflow.com/questions/49784166/using-switch-statement-for-react-rendering
  renderGroup = (routeName) =>{
    const {imageUrl,boxes,user} = this.state;
    switch (routeName){
      case 'signin':
        return <SignIn onRouteChange={this.onRouteChange} onSignInComplete={this.onSignInComplete} />
      case 'home':
        return (<div>
        <Navigation onRouteChange={this.onRouteChange}/>
        <Logo />
        <Rank user={user}/>
        <ImageLinkForm onInputChange={this.onInputChange} onDetectSubmit={this.onDetectSubmit} />      
        <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
      </div>)
      case 'register':
        return <Register onRouteChange={this.onRouteChange} />
      default:            
        return <SignIn onRouteChange={this.onRouteChange} />

    }
  }

  render()
  {
    const {route} = this.state;
      return (
      <div className="App">
      <Particles className='particles' params={ParticlesOptions} />
      {this.renderGroup(route)}
      </div>
    );
  }
}

export default App;
