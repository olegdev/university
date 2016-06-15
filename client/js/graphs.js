var Graphs = {
	factory: function(type, user, connections) {
		var users = [user].concat(connections);
		var nodesData = [], nodes = [];

		users.forEach(function(user, index) {
			nodesData.push({
				id: index + 1,
				title: user.firstName + ' ' + user.lastName,
				photo: user.profiles[type] && user.profiles[type].photo ? user.profiles[type].photo : '/img/avatar-'+ user.avatar +'.jpg',
				publicName: user.publicName,
				descr: (function(companies) {
					var html = '<ul>';
					companies.forEach(function(company) {
						if (company.name) {
							html += '<li>' + company.name + (company.position ? ', ' + company.position : '') +'</li>';
						}
					});
					html += '</ul>';
					return html;
				}(user.profiles['professional'] ? user.profiles['professional'].companies : [] ))
			});
		});

		nodesData.forEach(function(data) {
			nodes.push({
				id: data.id,
				shape: 'circularImage',
				image: data.photo,
				title: [
					'<div class="graph-popup">',
						'<div class="title">'+ data.title +'</div>',
						'<p>'+ data.descr +'</p>',
					'</div>'
				].join('')
			});
		});

	  // create an array with edges
	  var edges = [];
	  for(var i = 1; i < nodesData.length; i++) {
	  	edges.push({
	  		from: 1,
	  		to: nodesData[i].id,
	  	})
	  }
	 
	  // create a network
	  var container = document.getElementById('mynetwork');
	  var data = {
	    nodes: nodes,
	    edges: new vis.DataSet(edges)
	  };
	  var options = {
	    nodes: {
	      borderWidth:4,
	      size:40,
	      color: {
	        border: '#222222',
	        background: '#666666'
	      },
	      font:{color:'#eeeeee'}
	    },
	    edges: {
	      color: 'lightgray',
			width: 3
	    },
	    interaction:{
			hover:true,
			hoverConnectedEdges: false,
		},
		  "physics": {
			  "barnesHut": {
				  "gravitationalConstant": -12000,
				  //"centralGravity": 0
			  }
		  }
	  };

		var network = new vis.Network(container, data, options);
		network.on("click", function (params) {
	        if (params.nodes && params.nodes.length) {
	        	var nodeData;
	        	nodesData.forEach(function(item) {
	        		if (item.id == params.nodes[0]) {
	        			nodeData = item;
	        		}
	        	});
	        	if (nodeData && nodeData.publicName) {
	        		window.open('/public/' + nodeData.publicName, "_blank");
	        	}
	        }
	    });
	}
}