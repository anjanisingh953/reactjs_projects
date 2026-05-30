import React, { useEffect, useState } from 'react'
import Mealtem from './Mealtem';

const Meals = () => {
    const [loadedmeals, setLoadedMeals] = useState([]);

    async function fetchMeals() {
        const res = await fetch('http://localhost:8000/meals');

        if (!res.ok) {
            console.log("Error >>> Something! went wrong")
        }
        const data = await res.json()
        setLoadedMeals(data)
    }
    fetchMeals();

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