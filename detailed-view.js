var candidate = {
	"Candidate 1": {
		"Confidence": 80,
		"Code Accuracy": 79,
		"Code Coverage": 73,
		"Pop Quiz Score": 80,
		"Skills_Level": {
			"HTML": 75,
			"CSS": 80,
			"JS": 65
		}
	}
}



function getSkills() {
	labels = [];
	data = [];
	for(var key in candidate) {
		var skills = candidate[key]["Skills_Level"];
		for(skill in skills) {
			labels.push(skill);
			data.push(skills[skill]);
		}
	}
	return {labels: labels, data: data};
}

function getMetrics() {
	labels = [];
	data = [];
	for(var k1 in candidate) {
		for(var k2 in candidate[k1]) {
			if(k2 != "Skills_Level") {
				labels.push(k2);
				data.push(candidate[k1][k2]);
			}
		}
	}
	return {labels: labels, data: data};
}
