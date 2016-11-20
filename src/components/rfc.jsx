var React = require('react');
var TextInput = require('./textInput.jsx');
var NumberImput = require('./numberInput.jsx');

var App = React.createClass({// Se crea la funcion Main

	getInitialState: function() {
		return {
			resultado: "" //Variable donde se almacenara la suma de los valores finales
		}
	},

	/****************************************************************************/
	/* Esta funcion lo que ara es validar que si todos los campos estan llenados
	correctamente, entonces procedera a ir cortando los elemento en las partes
	necesarias para formar el RFC. En caso de que aya alguno mal mandara un
	mensaje de error.

			Se utilisa '.refs' para poder conseguir los estados internos de algun child
	en este caso sacamos los estados de valides de cada input y su valor.
			Los refs deven de intentar usarse lo menos posible intentando hubicar los
	'state' lo mas alto pocible del programa, pero hay casos como este que no es
	pocible
	src:
	https://facebook.github.io/react/docs/refs-and-the-dom.html
	*/
	onSubmit: function () {
		var validation = (this.refs.nom.state.valid == true &&
			this.refs.apPat.state.valid == true &&
			this.refs.apMat.state.valid == true &&
			this.refs.dia.state.valid == true &&
			this.refs.mes.state.valid == true &&
			this.refs.an.state.valid == true
		);
		/* Se uso '.slice()' para poder sacar la parte nesecitada de la cadena  */
		if(validation){
			var nom = (this.refs.nom.state.name).slice(0,1);
			var apPat = (this.refs.apPat.state.name).slice(0,2);
			var apMat = (this.refs.apMat.state.name).slice(0,1);
			var dia = (this.refs.dia.state.date).slice(0,2);
			var mes = (this.refs.mes.state.date).slice(0,2);
			var an = (this.refs.an.state.date).slice(2);
			this.setState({//Convertimos el estado en la suma de los chunks
				resultado: (apPat + apMat + nom + an + mes + dia).toUpperCase()
			});
		}else{
			this.setState({//En caso de error lanzamos este mensaje
				resultado: "Algun valor esta incorrecto"
			});
		}
	},

	/****************************************************************************/
	/* En los componentes se usaron algoritmos conocidos como "RegExp" para hacer
	la validacion de los inputs. Por ejemplo: '/^[A-Z]*[A-Z]$/ig' que significa
	que tiene que comensar con alguna letra entre a y z, enmedio deve de tener
	unicamente un valor entre a y z y deve de terminar con una letra entre a y z.
	En caso de que encontrara algun numero o signo, mandara error. Lo mismo con
	los numeros.
	src:
	https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/RegExp
	http://aprenderaprogramar.com/index.php?option=com_content&view=article&id=835:expresiones-regulares-javascript-regex-new-caracter-especial-numero-letra-espacio-blanco-cu01154e&catid=78:tutorial-basico-programador-web-javascript-desde-&Itemid=206
	https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/match

			Se les agrego la propiedad 'ref' para poder sacar sus estados internos y
	poder manejarlos en este nivel.
	*/
	render: function() {
		return (//Se usaron clases de bootstrap
			<div className="container">
				<div className="row">
				  <div className="col-md-4"></div>
				  <div className="col-md-4">
						<div className="header clearfix">
							<h3 className="text-muted">RFC calculator</h3>
						</div>
						<div className="jumbotron">
								<TextInput type={/^[A-Z]*[A-Z]$/ig} label="Primer nombre:" ref="nom"/>
								<TextInput type={/^[A-Z]*[A-Z]$/ig} label="Apellido Paterno:" ref="apPat"/>
								<TextInput type={/^[A-Z]*[A-Z]$/ig} label="Apellido Materno:" ref="apMat"/>

								<NumberImput type={/^[0-9]*[0-9]$/g}
								maxLength="2"
								label="Dia:"
								inicio="0"
								fin="32"
								error="El numero deve de estar entre 1 y 31 o si es un solo numero agregar un 0 antes"
								ref="dia"
								/>
								<NumberImput type={/^[0-9]*[0-9]$/g}
								maxLength="2"
								label="Mes:"
								inicio="0"
								fin="13"
								error="El numero deve de estar entre 1 y 12 o si es un solo numero agregar un 0 antes"
								ref="mes"
								/>
								<NumberImput type={/^[0-9]*[0-9]$/g}
								maxLength="4"
								label="Año:"
								inicio="1930"
								fin="2016"
								error="El numero deve de estar entre 1930 y 2016"
								ref="an"
								/>
								<button className="btn btn-primary" onClick={this.onSubmit}>Calcular</button>
								<br/>
								<h3>{this.state.resultado}</h3>
						</div>
					</div>
			  <div className="col-md-4"></div>
			</div>
			</div>
		);
	}
});

module.exports = App;
