import React, { Component, Fragment } from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import { Link  } from 'react-router-dom'
import messages from '../messages'

class Sightings extends Component {
  constructor () {
    super()

    this.state = {
      sightings: [],
      edit: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/sightings`)
      .then(res => {
        this.setState({ sightings: res.data.sightings })
        this.props.alert(messages.sightingsLoadSuccess, 'success')
      })
      .catch(() => this.props.alert(messages.sightingsLoadFailure, 'danger'))

  }

 handleDelete = (id) => {
    axios({
      url: `${apiUrl}/sightings/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => {
        axios(`${apiUrl}/sightings`)
          .then(res => {
            this.setState({ sightings: res.data.sightings })
            this.props.alert(messages.deleteSuccess, 'success')
          })
          .catch(() => this.props.alert(messages.deleteFailure, 'danger'))
  })
}

  render () {
    const { user } = this.props
    const { sightings } = this.state
    
    return (
      <Fragment>
        <div className="d-flex fullWidth justify-content-between align-items-center py-3">
          <h3 className="m-0 sightingsTextHeader">All recent sightings</h3>
          {!user && <p className="m-0 sightingsTextHeader">Sign in to edit your sightings</p>}
          {user && <Button className="rounded-0" variant="success" href="#create-sighting">Add A Sighting</Button>}
        </div>
        <ListGroup>
          { user && sightings.map(sighting => (
            <div className="listingHolder" key={sighting._id}>
            <ListGroup.Item key={sighting._id}>
              <span className="h5 d-block">{sighting.title}</span>
              <span className="d-block">{sighting.text}</span>
              <span className="d-block">{sighting.when}</span>
              <span className="d-block">{sighting.location}</span>

              { user && sighting.owner._id === user._id &&
              <Link to={'/sightings/'+ sighting._id + '/edit'}>
              <Button variant="success" className="updateButton btn-space rounded-0"> Update Sighting </Button>
              </Link>}
              { user && sighting.owner._id === user._id &&
              <Button variant="danger" className="deleteButton btn-space rounded-0" onClick={() => this.handleDelete(sighting._id)}>Delete Sighting</Button>}

            </ListGroup.Item>
            </div>
          ))}
          { !user && sightings.map(sighting => (
              <div className="listingHolder" key={sighting._id}>
            <ListGroup.Item key={sighting._id}>
              <span className="h5 d-block">{sighting.title}</span>
              <span>{sighting.location}</span>
            </ListGroup.Item>
            </div>
          ))}
        </ListGroup>
      </Fragment>
    )
  }
}



export default Sightings
