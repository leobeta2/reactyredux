import React from 'react'
import timezones from '../../data/timezones'
import map from 'lodash/map'
import classnames from 'classnames'
//import axios from 'axios'

class SignupForm extends React.Component {
     constructor(props)  {
         super(props);
         this.state = {
             username: '',
             email: '',
             password: '',
             passwordConfirmation: '',
             timezone: '',
             errors: {},
             isLoading: false
         }

         this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
     }

     onChange(e) {
         //permite cambiar los estados, se coloco [e.target.name], para no nombrar por nombre
         this.setState({ [e.target.name]: e.target.value });
     }

     onSubmit(e) {
         this.setState({errors:{}, isLoading: true});
         e.preventDefault();
         //peticion a una api ocn axios
         //axios.post('/api/users', { user:this.state });
         this.props.userSignupRequest(this.state).then(
             () => {})
        .catch(error => {
            console.log("error.message: ", error.message);
            console.log("error.code: ", error.code);
            console.log("error.config: ", error.config);
            console.log("error.response: ", error.response);
            console.log("error.response.data: ", error.response.data);
            this.setState({errors: error.response.data})} 
            );
     }

    render() {
        const {errors} = this.state;
        const options = map(timezones, (val, key) => 
            <option key={val} value={val} >{key}</option>
        ); 
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Unete a nuestra comunidad!!</h1>
                <div className={classnames("form-group", {'has-error': errors.username})}>
                    <label className="control-label">Usuario</label>
                    <input 
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text" 
                        name="username" 
                        className="form-control" />
                        {errors.username && <span className="help-block">{errors.username}</span> }
                </div>

                <div className={classnames("form-group", {'has-error': errors.email})}>
                    <label className="control-label">Email</label>
                    <input 
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text" 
                        name="email" 
                        className="form-control" />
                </div>

                <div className={classnames("form-group", {'has-error': errors.password})}>
                    <label className="control-label">Password</label>
                    <input 
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password" 
                        name="password" 
                        className="form-control" />
                </div>

                <div className={classnames("form-group", {'has-error': errors.passwordConfirmation})}>
                    <label className="control-label">Confirmar Password</label>
                    <input 
                        value={this.state.passwordConfirmation}
                        onChange={this.onChange}
                        type="password" 
                        name="passwordConfirmation" 
                        className="form-control" />
                </div>

                <div className={classnames("form-group", {'has-error': errors.timezone})}>
                    <label className="control-label">Zona horaria</label>
                    <select
                        value={this.state.timezone}
                        onChange={this.onChange}
                        name="timezone" 
                        className="form-control" >
                        <option value="" disabled>Escoge tu zona horaria</option>
                        {options}
                        </select>
                </div>

                <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
                        Iniciar Sesion
                    </button>
                </div>
            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm