import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents, updateFirstName, updateLastName, updateTheEmail } from '../store'
import EasyEdit from 'react-easy-edit';

class Student extends Component {
    constructor(){
        super()
        this.state = {
            studentName: ''
        }
        this.saveLastName = this.saveLastName.bind(this)
        this.cancel = this.cancel.bind(this)
        this.saveFirstName = this.saveFirstName.bind(this)
        this.saveEmail = this.saveEmail.bind(this)
    }
    saveFirstName(value){
        this.props.firstName(value, this.props.id)
    }
    saveLastName(value){
        this.props.lastName(value, this.props.id)
    }
    saveEmail(value){
        this.props.saveTheEmail(value, this.props.id)
    }
    cancel(){

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
    const { student, campus } = this.props
    const { saveEmail, saveLastName, saveFirstName, cancel} = this
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/students'>
                <h6 className="navbar-brand" style={{marginRight: '20px'}}>Acme Schools</h6>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active" style={{marginRight: '20px', border: '2px solid red' }}>
                            <Link to='/students'>
                            <h6 className="nav-link" href="#">Students {'>'} ({student.firstName ? student.firstName : 'loading'}) <span className="sr-only">(current)</span></h6>
                            </Link>
                        </li>
                        <li className="nav-item" >
                            <Link to='/campuses'>
                            <h6 className="nav-link" href="#">Campuses</h6>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div>
                <div>
                   <h5> <Link to={`/students/${student.id}`}>{student.firstName} </Link>goes to { campus.name ? <Link to={`/campuses/${campus.id}`}> {`${campus.name}`} </Link> : 'no school found' }  </h5>
                </div>
                <div>
            <ul>
                <li> 
                    <EasyEdit
                        type="text"
                        onSave={saveFirstName}
                        onCancel={cancel}
                        saveButtonLabel="Save Me"
                        cancelButtonLabel="Cancel Me"
                        attributes={{ name: "awesome-input", id: 1}}
                        instructions="Update students's first name"
                        placeholder={student.firstName}
                    />
                </li>
                <li> 
                    <EasyEdit
                        type="text"
                        onSave={saveLastName}
                        onCancel={cancel}
                        saveButtonLabel="Save Me"
                        cancelButtonLabel="Cancel Me"
                        attributes={{ name: "awesome-input", id: 1}}
                        instructions="Update students's last name"
                        placeholder={student.lastName}
                    />
                </li>
                <li> 
                    <EasyEdit
                        type="text"
                        onSave={saveEmail}
                        onCancel={cancel}
                        saveButtonLabel="Save Me"
                        cancelButtonLabel="Cancel Me"
                        attributes={{ name: "awesome-input", id: 1}}
                        instructions="Update Students's email"
                        placeholder={student.email}
                    />
                </li>
            </ul>
         </div>
        </div>
      </div>
    )
  }
}
const mapState = (state, otherProps) => {
    const id = otherProps.match.params.id * 1
    const student = state.students.find((student) => student.id === id) || {}
    const campus = state.campuses.find(campus => campus.id === student.campusId) || {}
    return {
        students: state.students,
        campuses: state.campuses,
        student,
        campus,
        id
    }
}

const mapDispatch = (dispatch, otherProps) => {
    const id = otherProps.match.params.id * 1
    return {
        load: () => {
            dispatch(fetchStudents()),
            dispatch(fetchCampuses())
        },
        firstName: (value, id) => dispatch(updateFirstName({ value: value, id: id })),
        lastName: (value, id) => dispatch(updateLastName({ value: value, id: id })),
        saveTheEmail: (value, id) => dispatch(updateTheEmail({ value: value, id: id }))
    }
}
export default connect(mapState, mapDispatch)(Student)