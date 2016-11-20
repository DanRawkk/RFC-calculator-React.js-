var React = require('react');
var TextInput = React.createClass({

	getInitialState: function () {
		return {
			name: "",//Aqui se guardara el valor del campo 'value'
			valid: true //Si el campo esta lleno correctamente es True
		};
	},
  /****************************************************************************/

	/* Esta funcion se lanza cada ves que se agrega un caractér al campo del input
	en cada entrada se compara con el algoritmo ingresado '/^[A-Z]*[A-Z]$/ig'
	para verificar que solo se esten ingresando letras. En caso de ser asi el
	estado de valides sera verdadero. En caso ingresar numeros el estado de valides
	sera falso y se activara el campo de error de no ingresar numeros */
	onChangeVal: function (event) {
		if((event.target.value).match(this.props.type)) {
			this.setState({valid: true ,name: event.target.value});
			console.log("dentro del if");
		}else{
			this.setState({valid: false ,name: event.target.value});
			console.log("dentro del else")
		}
	},

	/****************************************************************************/

	/*  En la propiedad "onChange" se agrego la funcion "onChangeVal" para que pueda
	verificar que lo que se ingresa es correto y asi actualise el valor de 'value'
	 		En la propiedad "value" se actualisa con el estado actual de
	'this.state.name'		*/
	render: function () {
		return(
			<div className="form-group">
				<label>{this.props.label}</label><br/>
				<input type="text" maxLength="20" className="form-control"
					onChange={this.onChangeVal}
					value={this.state.name}
				/>
				<p id="error"
					className={this.state.valid ? "hidden" : "show bg-danger"}
					>Solo deve contener letras</p>
				{/*<p>{this.state.name}</p>*/}
			</div>
		);
	}
});

module.exports = TextInput;
