import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents } from '../store'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import styled from 'styled-components';
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;

class Home extends Component {
  constructor(){
    super()
    this.state = {

    }
  }

  componentDidMount(){
    try {
      this.props.load()
    }
    catch(err){
      console.log(err)
    }
  }
  render() {
   
    const {campuses, students } = this.props
    return (
      <div>
        <GridWrapper style={{border: '2px solid red'}}>
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/home'>
                <h6 className="navbar-brand" style={{marginRight: '20px'}}>Acme Schools</h6>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active" style={{marginRight: '20px' }}>
                            <Link to='/students'>
                            <h6 className="nav-link" href="#">Students ({students.length}) <span className="sr-only">(current)</span></h6>
                            </Link>
                        </li>
                        <li className="nav-item active" style={{marginRight: '20px' }}>
                            <Link to='/home'>
                            <h6 className="nav-link" href="#" style={{ border: '2px solid red' }}>Home  <span className="sr-only">(current)</span></h6>
                            </Link>
                        </li>
                        <li className="nav-item" >
                            <Link to='/campuses'>
                            <h6 className="nav-link" href="#">Campuses ({campuses.length}) </h6>
                            </Link>
                        </li>
                    </ul>
                    <Form className="d-flex">
                        <Form.Control
                          type="search"
                          placeholder="Search"
                          className="me-2"
                          aria-label="Search"
                        />
                       <Button variant="outline-success">Search</Button>
                   </Form>
             </div>
         </nav> */}
           <div>
            <ul>
            {students ? students.map(student => {
              return (
                <li key={student.id}>
                  {student.firstName} {student.gpa}
                </li>
              )
            }) : 'loading students'}
            </ul>
           </div>
           </GridWrapper>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
      students: state.students.sort((a,b) => b.gpa - a.gpa),
      campuses: state.campuses.sort((a,b) => a.id - b.id)
  }
}
const mapDispatch = (dispatch) => {
  return {
      load: () => {
          dispatch(fetchCampuses())
          dispatch(fetchStudents())
      }
   }
}

export default connect(mapState, mapDispatch)(Home)