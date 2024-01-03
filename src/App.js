import './App.css';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [height, setHeight] = useState(0)
  const [isHeight, setIsHeight] = useState(true)

  const [weight, setWeight] = useState(0)
  const [isWeight, setIsWeight] = useState(true)
  
  const [bmi, setBmi] = useState(0)

  const getValdiate = (e)=>{
    const {name, value} = e.target
    if(!!value.match(/^[0-9]*.?[0-9]+$/)){
      if(name==='height')
      {
        setHeight(value)
        setIsHeight(true)
      }
      else if(name==='weight')
        {
          setWeight(value)
          setIsWeight(true)
        }
      }
    
    else
    {
      if(name==='height')
      {
      setHeight(value)
      setIsHeight(false)
      }
      else if(name==='weight')
      {
        setWeight(value)
        setIsWeight(false)
      }
    }
  }

  const handleBMI = (e)=>{
    if(!height){
      toast.warning('Please enter the height')
    }
    else if(!weight){
      toast.warning('Please enter the weight')
    }
    else{
      let bmiHeight = height/100
      setBmi((weight/(bmiHeight*bmiHeight)).toFixed(2))
    }
  }

  const handleReset = (e)=>{
    setHeight(0)
    setWeight(0)
    setBmi(0)
  }
    
  

  return (
    <>
      <div className='main container-fluid'>

        <div className="row">

          <div className="col-lg-6 col-md-8 col-sm-8">
          <h1 className='text-center fw-bolder  mt-5 text-success'>BMI CALCULATOR</h1>
          </div>

        </div>
        
        <div className="row">

          <div className="col-lg-6 col-md-8 col-sm-8 p-5">
          <h5>Body mass index (BMI) is a value calculated from a person's weight and height. It is defined as body mass divided by the square of body height, and is expressed in units of kg/m2.</h5>
          </div>

        </div>

        <div className="row">

          <div className="col-lg-6 col-md-8 col-sm-8 ">
            <h2 className='text-center'>Your <span className='text-success'>BMI</span> Matters, check now !</h2>
            <div className='w-100 d-flex justify-content-center align-items-center flex-column p-4'>

              { isHeight?
                <TextField onChange={(e)=>getValdiate(e)} name='height' value={height || ""} className='w-50' id="filled-basic" label="Enter height (in cm)" variant="outlined" />:<TextField onChange={(e)=>getValdiate(e)} name='height' value={height || ""} className='w-50' id="filled-basic" label="Invalid input" variant="outlined" color='error' />
              }
         
              { isWeight?
                <TextField name='weight' onChange={(e)=>getValdiate(e)} value={weight || ""} className='mt-4 w-50' id="filled-basic" label="Enter weight (in kg)" variant="outlined" color='success'/>:<TextField name='weight' onChange={(e)=>getValdiate(e)} value={weight || ""} className='mt-4 w-50' id="filled-basic" label="Invalid input" variant="outlined" color='error'/>
                }

              <div className='d-flex justify-content-center gap-3'>
                <Button onClick={(e)=>handleBMI(e)} className='mt-4 bg-success' disabled={isHeight && isWeight?false:true} variant="contained">Calculate BMI</Button>
  
                <Button onClick={(e)=>handleReset(e)} className='mt-4 bg-danger' variant="contained">Reset</Button>
              </div>

              { bmi>0 && bmi<18.5 &&
                <div className='w-50 mt-4 p-3 rounded shadow'>
                <h4 className='text-center'>Your BMI is {bmi || ""} and you are <span className='text-warning'>UNDERWEIGHT</span></h4>
              </div>
              } 

              { bmi>18.5 && bmi<24.9 &&
                <div className='w-50 mt-4 p-3 rounded shadow'>
                <h4>Your BMI is {bmi || ""} and you weigh <span className='text-success'>NORMAL</span></h4>
              </div>
              }

              { bmi>24.9 && bmi<29.9 &&
                <div className='w-50 mt-4 p-3 rounded shadow'>
                <h4>Your BMI is {bmi || ""} and you are <span className='text-warning'>OVERWEIGHT</span></h4>
              </div>
              }

              { bmi>29.9 &&
                <div className='w-50 mt-4 p-3 rounded shadow'>
                <h4>Your BMI is {bmi || ""} and you are <span className='text-danger'>OBESE</span></h4>
              </div>
              }

            </div>
          </div>
          
        </div>

      </div>

      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>

    </>
  );
}

export default App;
