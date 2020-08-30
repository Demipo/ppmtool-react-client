import React, { Component } from 'react'
import ProjectTask from './ProjectTasks/ProjectTask'
import { connect } from 'react-redux';
import { updateStatus } from '../../actions/backlogAction';
import PropTypes from 'prop-types';

class Backlog extends Component {
    constructor(props){
        super(props)

        this.state = {
                ...this.state
        }

        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    onDrop = (e, status) =>{
        const { project_tasks_prop } = this.props;
        let id = e.dataTransfer.getData("id");
        let ptIdentifier, ptObject;

        let newProjectTasks = project_tasks_prop.filter((pt) => {
            if (pt.projectSequence == id) {
                pt.status = status;
                ptIdentifier = pt.projectIdentifier;
                ptObject = pt
            }
            return pt;
        })
        this.setState({
            ...this.state,
            backlog:{
                project_tasks: newProjectTasks
            }
        })
        console.log( this.props.history);
        
        this.props.updateStatus(ptIdentifier, ptObject)
    }

    render() {

        let todos = [], inProgress = [], done = [];
        const { project_tasks_prop } = this.props;
        project_tasks_prop.map(pt =>
            pt.status === "TO_DO" ? todos.push(<ProjectTask key={pt.id} project_task={pt}/>) : (
            pt.status === "IN_PROGRESS" ? inProgress.push(<ProjectTask key={pt.id} project_task={pt}/>) : 
            done.push(<ProjectTask key={pt.id} project_task={pt}/>)))

        return (
            <div className="container">

                <div className="row">
                    <div className="col-md-4"
                    onDragOver = {(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, "TO_DO")}
                    >
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>
                        {todos}
                    </div>

                    <div className="col-md-4"
                        onDragOver={(e) => {this.onDragOver(e)}}
                        onDrop={(e) => {this.onDrop(e, "IN_PROGRESS")}}
                    >
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                        {inProgress}
                    </div>
                    <div className="col-md-4"
                        onDragOver={(e) => {this.onDragOver(e)}}
                        onDrop={(e) => {this.onDrop(e, "DONE")}}>
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                        {done}
                    </div>
                </div>
            </div>
        )
    }
}

Backlog.propTypes = {
    updateStatus: PropTypes.func.isRequired
}

export default connect(null, {updateStatus})(Backlog)
