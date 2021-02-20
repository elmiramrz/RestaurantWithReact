import { Card } from 'react-bootstrap';
export default function About() {
    return (
<Card style={{ width: '60rem' }}>
  <Card.Body>
    <Card.Title>About</Card.Title>

    <Card.Text>
     First Name: Elmira 
     </Card.Text>
      <Card.Text>
     Last Name: Mirza
    </Card.Text>
    <Card.Text >
    <h2> You can click on search to show the data</h2>
    </Card.Text>
  </Card.Body>
</Card>
        
       
    )
}