import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents, deleteCampus } from '../store'
import CampusesModal from './CampusesModal'
import { Button } from 'react-bootstrap'
import styled from 'styled-components';

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;
class Campuses extends Component {
    constructor(){
        super()
        this.state = {
            
        }
        this.remove = this.remove.bind(this)
    }
    remove(campus){
        this.props.removeCampus(campus)
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
    const { students, campuses } = this.props 
    const { remove } = this
    return (
        // Set the overflow-x:hidden; and overflow-y:auto

      <div >
       <GridWrapper>
            <div>
                <div>
                    <p> Here are the campuses and their amount of enrollments </p>
                     <CampusesModal />
                        {campuses.map(campus => {
                            return (
                            <div key={campus.id}>
                              <h5>    <Link to={`/campuses/${campus.id}`}> {campus.name} </Link> has  amount {campus.students ? campus.students.length : '0'} of students </h5>
                                     <div>
                                        <ul>
                                            {campus.students ? campus.students.map(
                                                student => {
                                                    return (
                                                        <li key={student.id}>
                                                            {student.firstName ? student.firstName: 'loading'} {student.lastName}
                                                        </li>
                                                    )
                                                }
                                            ) : '' }
                                        </ul>
                                    </div> 
                                    <div>
                                        Information on the school
                                    </div>
                                    <ul>
                                        <li>
                                            Address: {campus.address}
                                        </li>
                                        <li>
                                            School description: {campus.description}
                                        </li>
                                    </ul>
                                    <Button variant="danger" onClick={()=> remove(campus.id)}>Delete School</Button>{' '}                            </div>
                            )
                        })}
                </div>
            </div>
            </GridWrapper>
      </div>
    )
  }
}

const mapState = (state) => {
    return {
        students: state.students,
        campuses: state.campuses.sort((a,b) => a.id - b.id)
    }
}
const mapDispatch = (dispatch) => {
    return {
        load: () => {
            dispatch(fetchCampuses())
            dispatch(fetchStudents())
        },
        removeCampus: (campus) => dispatch(deleteCampus(campus))
    }
}
export default connect(mapState, mapDispatch)(Campuses)