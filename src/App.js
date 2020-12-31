import React, { useState} from 'react';
import './App.css';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Navigation from './components/Navigation/Navigation'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
function App() {

const app = new Clarifai.App({
    apiKey: '2dbf3b62820549418772c647dc90d3c6'
});

const [input, setInput] = useState("");
const [imageUrl, setImageUrl] = useState("");
const [faceNumber, setFaceNumber] = useState(null);
const [box, setBox] = useState([]);
const [route, setRoute] = useState("signin")
const [isSignedIn, setIsSignedIn]=useState(false)
const [user, setUser] = useState(
  {
  id: '',
  name: '',
  email: '',
  entries: 0,
  joined: ''
  }
)
const onInputChange = (event)=>{
   setInput(event.target.value)
}
const displayFaceBox = (box) => {
  setBox(box)
} 
const calculateFaceLocation =(data) => {
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  const clarifaiFaceNumber  = data.outputs[0].data.regions.length 
  setFaceNumber(clarifaiFaceNumber)
  const returnResult = []
  for(let i = 0;i<clarifaiFaceNumber;i++){
    const clarifaiFace =  data.outputs[0].data.regions[i].region_info.bounding_box;
    returnResult.push({
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    })
  }
  return returnResult
}
const onButtonSubmit = ()=>{

  setImageUrl(input); 
  
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        input)
      .then(response => {
        displayFaceBox(calculateFaceLocation(response))
      })
      .catch(err => console.log(err));  
}
  
const particlesOptions = {
    particles: {
      number: {
        value: 200,
        density: {
          enable: false,
          value_area: 800
        }
      }
    }
  }

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }
  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false)
    } else if (route === 'home') {
      setIsSignedIn(true)
    }
    setRoute(route)
  }
  
  return (
    <div className="App">
      <Particles  className="particles"
              params= {particlesOptions}  />
      <Navigation isSignedIn = {isSignedIn} onRouteChange = {onRouteChange}/>
      {route === "home"?
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange = {onInputChange} onButtonSubmit={onButtonSubmit} faceNumber={faceNumber}/>
          <FaceRecognition imageUrl={imageUrl} box={box}/>
        </div>
         : route === 'signin' ? 
            <Signin onRouteChange = {onRouteChange}/> 
            :
            <Register onRouteChange = {onRouteChange} />
        }
    </div>
  );
}

export default App;
