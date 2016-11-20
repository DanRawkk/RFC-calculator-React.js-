var React = require('react');
var NumberImput = React.createClass({

	getInitialState: function () {
		return {//Iniciamos estados
			date: "",//aqui se guardara el valor ingresado
			valid: true,//Si es correcto el valor ingresado sera true, si esta mal False
			error: ""//mensaje personalisado de error para cada componente
		};
	},
	/****************************************************************************/

	/* Esta funcion verificara que lo que se ingrese no sean letras, que este
	dentro de los valores establecidos, y que llene la cantidad de numeros
	necesarios por casilla. */
	onChangeVal: function (event) {//se pasa el evento
		if((event.target.value).match(this.props.type)) {
			//Se compara el valor del campo con el algoritmo /^[0-9]*[0-9]$/g
			if(event.target.value > this.props.inicio && event.target.value < this.props.fin ) {
				//Se verifica que este dentro del parametro dado
				if((event.target.value).length == this.props.maxLength){
					//Se verifica que tenga el largo nesesario
					this.setState({valid: true ,date: event.target.value});
					//Si pasa todos los filtros se valida true
				}else{
					this.setState({//mensajes de error
						valid: false,
						date: event.target.value,
						error: "La fecha deve contener " + this.props.maxLength + " numeros."
					});
				}
			}else{
				this.setState({//mensajes de error
					valid: false,
					date: event.target.value,
					error: this.props.error
				});
			}
		}else{
			this.setState({//mensajes de error
				valid: false,
				date: event.target.value,
				error: "Solo deve contener numeros"
			});
			console.log("dentro del else")
		}
	},

  /****************************************************************************/
	/* maxLength: el tamño maximo y requerido de la casilla
	 	 onChange: lansa la funcion de verificacion del valor

	la <p> aparesera en caso de aver algun error en caso de que 'valid' sea false
	y muestra los mensajes de error posibles.
 */
	render: function () {
		return(
			<div className="form-group">
				<label>{this.props.label}</label><br/>
				<input type="text"
					className="form-control"
					maxLength={this.props.maxLength}
					onChange={this.onChangeVal}
					value={this.state.date}
				/>
				<p id="error"
					className={this.state.valid ? "hidden" : "show bg-danger"}
					>{this.state.error}</p>
				{/*<p>{this.state.date}</p>*/}
			</div>
		);
	}
});

module.exports = NumberImput;
