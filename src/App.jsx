import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Main from './components/Main';
import SideBar from './components/SideBar';
function App() {
const [data, setData] = useState(null)
const [loading, setLoading] = useState(false)
const[showModal, setShowModal] = useState(false)
function handleToggleModal()
{
  setShowModal(!showModal)
}

useEffect(()=>{
  async function fetchAPIData() {
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
    const today = (new Date()).toDateString()
    const localkey = `NASA-${today}`
    if(localStorage.getItem(localkey)){
      const apiData = JSON.parse(localStorage.getItem(localkey))
      setData(apiData)
      console.log("fetch from data today")
      return
    }
    localStorage.clear()
    try{
      const response = await fetch(url)
      const apiData = await response.json()
      localStorage.setItem(localkey, JSON.stringify(apiData))
      setData(apiData)
      console.log("fetch from api today")
      
    }
    catch(error){
      console.error(error)
    }
  }
  fetchAPIData()
},[])


  return (
    <>
    { data? (<Main data ={data} />):(
      <div className="loadingState">
        <i className="fa-solid fa-gear"></i>
        <h2>loading....</h2>
      </div>
    )}
    { showModal &&(
      <SideBar data = {data} handleToggleModal={handleToggleModal}/>)}
      {data &&(<Footer data = {data} handleToggleModal={handleToggleModal} />)}
    
    </>
  )
}
//....

export default App
