import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteProjectTask } from '../../../actions/backlogAction';

class ProjectTask extends Component {
    constructor(){
        super()

        this.onDragStart = this.onDragStart.bind(this);
    }

    onDragStart = (e, id) => {
        e.dataTransfer.setData("id", id)
    }

    onDelete(backlog_id, pt_id){
        this.props.deleteProjectTask(backlog_id, pt_id);
    }
    
    render() 
    {
        const {project_task} = this.props;
        let priorityString, priorityClass;

        if (project_task.priority === 1){
            priorityClass = "bg-danger text-light";
            priorityString = "HIGH"
        }else if(project_task.priority ===2) {
            priorityClass = "bg-warning text-light";
            priorityString = "MEDIUM"
        }else{
            priorityClass = "bg-info text-light";
            priorityString = "LOW"
        }

        return (
            <div className="card mb-1 bg-light"> 
                <div className={`card-header text-primary ${priorityClass}`} draggable onDragStart={(e) => this.onDragStart(e, project_task.projectSequence)} >
                    ID: {project_task.projectSequence} -- Priority: {priorityString}
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{project_task.summary}</h5>
                    <p className="card-text text-truncate">{project_task.acceptanceCriteria}</p>
                    <Link to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`}  className="btn btn-primary">View / Update </Link>
                    <button className="btn btn-danger ml-4" onClick={this.onDelete.bind(this, project_task.projectIdentifier, project_task.projectSequence)}>Delete</button>
                </div>
            </div> 
        )
    }
}

ProjectTask.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired
}
export default connect(null,{deleteProjectTask})(ProjectTask)
