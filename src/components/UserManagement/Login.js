import React, { Component } from 'react'
import { login } from '../../actions/securityActions';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import classnames from "classnames"

class Login extends Component {

    constructor(){
        super();

        this.state = {
            username: "",
            password: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newLogin = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.login(newLogin)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.security.validToken){
            this.props.history.push("/dashboard");
        }
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    //while a user is signed in, redirect to this component
    componentDidMount(){
        if(this.props.security.validToken){
            this.props.history.push("/dashboard");
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Login</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="email" 
                                    className={classnames("form-control form-control-lg", {"is-invalid": errors.username})}
                                    placeholder="Username" 
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                    />
                                    {errors.username && (
                                        <div className="invalid-feedback">{errors.username}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="password" 
                                    className={classnames("form-control form-control-lg", {"is-invalid": errors.password})} 
                                    placeholder="Password" 
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <input type="submit" class="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    security: state.security,
    errors: state.errors
})
export default connect(mapStateToProps, {login}) (Login);