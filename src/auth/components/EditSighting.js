import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import SightingForm from '../shared/SightingForm'
import messages from '../messages'

class EditSighting extends Component {
  constructor (props) {
    super(props)

    this.state = {
      sighting: {
        title: '',
        text: '',
        when: '',
        location: ''
      },
      updated: false
    }
  }

  // async componentDidMount () {
  //   const response = await
  //   axios(`${apiUrl}/sightings/${this.props.match.params.id}`)
  //   this.setState({ sighting: response.data.sighting })
  // }

  // componentDidMount(){
  //   axios(`${apiUrl}/sightings/${this.props.match.params.id}`)
  //   .then(console.log)
  //
  // }



  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedSighting = Object.assign(this.state.sighting, updatedField)

    this.setState({ sighting: editedSighting })
  }

  handleSubmit = async event => {
    event.preventDefault()
    // .catch(() => this.props.alert(messages.updateFailure, 'danger'))

    await axios({
      url: `${apiUrl}/sightings/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        sighting: this.state.sighting
      }
    })
    .then( response => {
      this.props.history.push('/')
      this.setState({ updated: true })
      this.props.alert(messages.updateSuccess, 'success')
      })
  }


  render () {
    const { sighting, updated } = this.state
    const { handleChange, handleSubmit } = this

    if (updated) {
      this.props.alert(messages.updateSuccess, 'success')
      return <Redirect to={`/`} />
    }

    return (
        <div className="edit-wrapper">
        <SightingForm
          sighting={sighting}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/`}
        />
        </div>

    )
  }
}

export default withRouter(EditSighting)
