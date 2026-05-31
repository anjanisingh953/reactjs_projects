import Mealtem from './Mealtem';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {};

const Meals = () => {
   const {data:loadedmeals, isLoading, error} = useHttp('http://localhost:8000/meals',requestConfig,[]);

    if(isLoading){
        return <p className='center'>Fetching meals...</p>
    }
    
    if(error){
        return <Error title="Failed to fetch meals" message={error} />
    }

    const handleChange = (val) => {
      setUsername(val)
    }

    return (
        <>
            <div className='card-main-section'>
                <ul id="meals">{loadedmeals.map((meal) => (
                    <Mealtem key={meal.id} meal={meal} />
                ))}</ul>
            </div>
        </>
    )
}

export default Meals