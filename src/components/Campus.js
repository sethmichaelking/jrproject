import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCampuses, fetchStudents, updateAddress, updateName, updateDescription, removeStudentFromCampus } from '../store'
import EasyEdit from 'react-easy-edit';
import styled from 'styled-components';
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;
class Campus extends Component {
    constructor(){
        super()
        this.state = {
            campusName: ''
        }
        this.save = this.save.bind(this)
        this.cancel = this.cancel.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
        this.saveDescription = this.saveDescription.bind(this)
        this.deleteStudent = this.deleteStudent.bind(this)
    }
    save(value){
        const filteredStudents = campus.students.filter((student) => student.id !== value)
       this.props.updateCampusName(value, this.props.id, filteredStudents)
    }
    saveAddress(value){
        this.props.updateCampusAddress(value, this.props.id)
    }
    saveDescription(value){
        this.props.updateCampusDescription(value, this.props.id)
    }
    deleteStudent(value){
        this.props.unregisterStudent(value)
    }
    cancel(){
        console.log(this.state.campusName)
    }
    componentDidMount() {
        try {
            this.props.load()
        }
        catch(err){
            console.log(err)
        }
    }
  render() {
    const { students, campuses, campus, campusStudents } = this.props
    const { save, cancel, saveAddress, saveDescription, deleteStudent } = this
    const { campusName } = this.state
    const keys = Object.keys(campusStudents)
    const bird = []
    for (let key of keys){
        let newBird = campusStudents[key]
        bird.push(newBird)
    }
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
                        <li className="nav-item active" style={{marginRight: '20px' }}>
                            <Link to='/students'>
                            <h6 className="nav-link" href="#">Students  <span className="sr-only">(current)</span></h6>
                            </Link>
                        </li>
                        <li className="nav-item" style={{ border: '2px solid red' }}>
                            <Link to='/campuses'>
                            <h6 className="nav-link" href="#">Campuses ({campus.name})</h6>
                            </Link>
                        </li>
                    </ul>
                </div>
         </nav>
         <div>
            <div>
                <div>
                    <ul>
                        <li> 
                            <EasyEdit
                                type="text"
                                onSave={save}
                                onCancel={cancel}
                                saveButtonLabel="Save Me"
                                cancelButtonLabel="Cancel Me"
                                attributes={{ name: "awesome-input", id: 1}}
                                instructions="Update Campus's name"
                                placeholder={campus.name}
                                value={`${campus.name}`}
                            />
                        </li>
                        <li> 
                            <EasyEdit
                                type="text"
                                onSave={saveAddress}
                                onCancel={cancel}
                                saveButtonLabel="Save Me"
                                cancelButtonLabel="Cancel Me"
                                attributes={{ name: "awesome-input", id: 1}}
                                instructions="Update Campus's address"
                                placeholder={campus.address}
                                value={`${campus.address}`}
                            />
                        </li>
                        <li> 
                            <EasyEdit
                                type="text"
                                onSave={saveDescription}
                                onCancel={cancel}
                                saveButtonLabel="Save Me"
                                cancelButtonLabel="Cancel Me"
                                attributes={{ name: "awesome-input", id: 1}}
                                instructions="Update Campus's description"
                                placeholder={campus.description}
                                value={`${campus.description}`}
                            />
                        </li>
                    </ul>
                </div>
            <div>
                <h5>Students enrolled in {campus.name}. <br></br>
                    There {campusStudents.length || 'loading'} students enrolled.</h5>
                    <ul>
                    {bird.length > 0 ? bird.map(theStudent => {
                        return (
                            <div key={theStudent.id}>
                                <Link to={`/students/${theStudent.id}`}>
                                {theStudent.firstName ? theStudent.firstName : 'loading'}
                                </Link>
                                <button onClick={ () => deleteStudent({studentId: theStudent.id, campusId: theStudent.campusId, students:campus.students.filter((student) => student.id !== theStudent.id)}) }> Unregister</button>
                            </div>
                        )
                    }) : 'No students enrolled'}
                    </ul>
                </div>
            </div>
         </div>
      </div>
    )
  }
}
const mapState = (state, otherProps) => {
    const id = otherProps.match.params.id * 1
    const campus = state.campuses.find(campus => campus.id === id) || {}
    const campusStudents = campus.students ? campus.students : {}
    return {
        students: state.students,
        campuses: state.campuses,
        campus,
        campusStudents,
        id
    }
}

const mapDispatch = (dispatch, { history }) => {
    return {
        load: () => {
            dispatch(fetchCampuses()),
            dispatch(fetchStudents())
        },
        updateCampusName: (value, id) => dispatch(updateName({value: value, id: id, })),
        updateCampusAddress: (value, id) => dispatch(updateAddress({ value:value, id:id })),
        updateCampusDescription: (value, id) => dispatch(updateDescription({ value: value, id: id })),
        unregisterStudent: (value) => dispatch(removeStudentFromCampus(value, history))
    }
}

export default connect(mapState, mapDispatch)(Campus)