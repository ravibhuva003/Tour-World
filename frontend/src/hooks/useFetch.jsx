import {useState,useEffect} from 'react';
 
const useFetch = (url) => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoadnig] = useState(false);

    useEffect(() =>{
        const fetchData = async() => {
            setLoadnig(true);
            try {
                const res = await fetch(url);
                if(!res.ok){
                    setError('failed to fetch');
                }
                const result = await res.json();  
                setData(result.data);
                setLoadnig(false);
            } catch (err) {
                setError(err.message);
                setLoadnig(false);
            }
        };
        fetchData();
    },[url])

   return{
        data,
        error,
        loading
   }
 };

 export default useFetch;