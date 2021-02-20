import {useState, useEffect} from 'react';
import { Card ,CardGroup} from 'react-bootstrap';
import moment from 'moment';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
export default function Restaurant (props) {
    const [restaurant,setRestaurant] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        fetch(`https://herokuurl/restaurants/${props.id}`).then(res => res.json()).then(data => {
            setLoading(false);
            // if our data contains an _id, we have successfully retrieved a restaurant
            (data.hasOwnProperty("_id")) ? setRestaurant(data) : setRestaurant(null)
        });
    }, [props.id])
   

    if (!loading)
    {
            if (restaurant.name) {
               

            return (
                <>
                  <br/>  
                    <Card style={{ width: '65rem' }}>
                        <Card.Body>
                      
                            <Card.Title>{restaurant.name}</Card.Title>                        
                           
                            <Card.Text>
                            {restaurant.address.building+' '+restaurant.address.street}                            
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br/>
                    <MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1],restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}>
     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
     <Marker position={[restaurant.address.coord[1],restaurant.address.coord[0]]}></Marker>
</MapContainer>
<br/>
<h5>Ratings</h5>
<hr/>
<CardGroup>
{restaurant.grades.map(a => 
<Card >
    <Card.Body>

            <Card.Title className="text-muted"><small>Grade: </small>{a.grade}</Card.Title>
            </Card.Body>
          <Card.Footer>
            <Card.Text> <small>Completed: {moment(a.date).format('MM/DD/YYYY')}</small> </Card.Text>
           
            </Card.Footer>

   
  </Card>
  )}
</CardGroup>


                    
                </>
                       );
                    } 
                    else {
                        return (
                            <>
                             <Card style={{ width: '60rem' }}>
                                    <Card.Body>
                                  
                                        <Card.Title>Loading restaurant Data...</Card.Title>
                                        </Card.Body>
                                        </Card>
                                       
                       
                            </>
                        );
                    }
                }else{
                    return (
                        <>
                        <Card style={{ width: '60rem' }}>
                                    <Card.Body>
                                   
                                        <Card.Title>Unable to find Restaurant with id:  {props.id}</Card.Title>
                                        </Card.Body>
                                        </Card>
             
                       
                            </> 
                    );
                }
            
                
            
            }
               
            
   
