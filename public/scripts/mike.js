/**
 * @jsx React.DOM
 */

var MagicMike = React.createClass({
	getInitialState: function(){
		return {
			speech: null
			,speakCount: 0
		};
	}
	,onMouseEnter: function(){
		var z = this
			,nextSpeakCount = this.state.speakCount+1
		;
		if (nextSpeakCount%2) {
			setState('n0.');
		} else {
			$.ajax({
				url: '/api/smile'
				,dataType: 'json'
				,cache: false
				,success: function(data){
					console.log('GET', arguments);
					setState(data);
				}
			});
		}
		function setState(speech){
			z.setState({
				speech: speech
				,speakCount: nextSpeakCount
			},function(){
				//console.log('SET STATE',arguments,this);
			});
		}
	}
	,onMouseLeave: function(){
		this.setState({
			speech: null
		},function(){
			//console.log('SET STATE',arguments,this);
		});
	}
	,render: function(){
		return (
			<div className="magic-mike">
				<SpeechBubble speech={this.state.speech} />
				<img className="mike" src="img/mike.jpg" alt="" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} />
			</div>
		);
	}
});

var SpeechBubble = React.createClass({
	render: function(){
		var classes = ['bubble'];
		if (!this.props.speech)
			classes.push('ng-hide');
		return (
			<div className={classes.join(' ')}>
				<div className="bubble-inner">
					<div className="bubble-text">{this.props.speech}</div>
				</div>
			</div>
		);
	}
});


React.renderComponent(
	<MagicMike />
	,document.getElementById('content')
);