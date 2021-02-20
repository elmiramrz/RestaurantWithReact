import {useState, useEffect} from 'react';
import { Card,Table,Pagination } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import queryString from 'query-string';

export default function Restaurants(props){

    const [restaurants , setRestaurants ] = useState([]);
    const [page , setPage ] = useState(1);

    const history = useHistory();
    const [loading,setLoading] = useState(true);
  


    useEffect(()=>{
      setLoading(true);
       let borough=queryString.parse(props.query).borough;
      fetch(` https://salty-taiga-06312.herokuapp.com/api/restaurants?page=${page}&perPage=10&borough=${borough}`).then(
      res=>res.json()).then (
      restaurants=>{
      setRestaurants(restaurants); // ".data" is removed after testing https://salty-taiga-06312.herokuapp.com/api/restaurants?page=1&perPage=10
      setLoading(false);
     
      })
       
      }, [props.query, page]); // reload page after props.query or page is changed


 const  previousPage=()=>{
        if (page > 1) {
          setPage(page-1);
        }
    };
    
    // Next Page
   const  nextPage=()=>{
        setPage(page+1);
    }
if (!loading)
{  if (restaurants)
  {

        return (
         
            <>
            <br/>
         <Card style={{ width: '70rem' }}>
  <Card.Body>
    <Card.Title>Restaturant List</Card.Title>
    
    <Card.Text>
Fill list of restaurants. Optionally sorted by borough
    </Card.Text>

  </Card.Body>
</Card>
<br/>
<div>
<Table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cuisine</th>
            </tr>
        </thead>
        <tbody>
            {restaurants.map(restaurant => 
                <tr onClick={()=>{ history.push(`/restaurant/${restaurant._id}`)}}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.address.building+' '+restaurant.address.street}</td>
                    <td>{restaurant.borough}</td>
                    <td>{restaurant.cuisine}</td>
                </tr>
            )}
        </tbody>
    </Table>



                    <Pagination>
                        <Pagination.Prev  onClick={previousPage}   />
            <Pagination.Item>{page}</Pagination.Item>
                        <Pagination.Next  onClick={nextPage} />
                    </Pagination>
                </div>

                
            </>
        );
        
}

else{
  return (
    <>
          <p>Loading Restaurants...</p> 
   
        </> 
        );
      }
    }
     else
      {
        return (
           <>
          
        <p>No restaurants Found</p>   
       </> 
        );
      }
    }
  
  
     
