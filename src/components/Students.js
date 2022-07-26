import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents } from '../store'
import TheModal from './TheModal'
import { removetStudent } from '../store'
import styled from 'styled-components';


const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;


class Students extends Component {
    constructor(){
        super()
        this.state = {

        }
        this.save = this.save.bind(this)
    }
    save(id){
         this.props.deleteStudent(id)
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
    const { save } = this
    return (
      <div>
        <GridWrapper>
        <div style={{marginLeft: '40px'}}>
            <div>
                Here are the list of students and where they are going to school.
                <ul>
                 {students ? students.map(student => {
                    const school = campuses.find(campus => campus.id === student.campusId)
                    return (
                        <li key={student.id}>
                            <Link to={`/students/${student.id}`}> {student.firstName} </Link> goes to {school ? <Link to={`/campuses/${school.id}`}> {`${school.name}`}  </Link>: 'no school'}
                            <button onClick={()=> save(student.id)}> X </button>
                        </li>
                    )
                }) : 'there are no students'} 
                </ul>
            </div>
        </div>
            <div>
                <div className="container">
                    <div className="row">
                        {students.map(student => {
                            const campus = campuses.find((campus) => campus.id === student.campusId)
                            return (
                                <div key={student.id} className="col card" style={{marginRight: '10px', marginTop: '10px'}}>
                                    <ul>
                                        <li> First Name: {student.firstName} </li>  
                                        <li> Last Name: {student.lastName} </li>
                                        <li> Email: {student.email} </li>
                                        <li> Image Url: {student.imageUrl} </li> 
                                        <li> GPA: {student.gpa} </li>
                                        <li> Campus: {campus ? campus.name : 'Not Enrolled Anywhere'} </li>
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        <TheModal />
        </GridWrapper>
      </div>
    )
  }
}


const mapState = (state) => {
    return {
        students: state.students || {},
        campuses: state.campuses || {}
    }
}
const mapDispatch = (dispatch) => {
    return {
        load: () => {
            dispatch(fetchCampuses())
            dispatch(fetchStudents())
        },
        deleteStudent: (id) => dispatch(removetStudent(id))
    }
}
export default connect(mapState, mapDispatch)(Students, TheModal)