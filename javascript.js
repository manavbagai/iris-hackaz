var candidates = {
	"Candidate 1": {
		"Confidence": 80,
		"Code_Accuracy": 79,
		"Code_Coverage": 73,
		"Chat_Score": 80,
		"Skills_Level": {
			"HTML": 75,
			"CSS": 80,
			"JS": 65
		}
	},
	"Candidate 2": {
		"Confidence": 90,
		"Code_Accuracy": 85,
		"Code_Coverage": 64,
		"Chat_Score": 87,
		"Skills_Level": {
			"HTML": 69,
			"CSS": 73,
			"JS": 74
		}
	},
	"Candidate 3": {
		"Confidence": 70,
		"Code_Accuracy": 80,
		"Code_Coverage": 79,
		"Chat_Score": 77,
		"Skills_Level": {
			"Java": 67,
			"Spring": 57,
			"Hibernate": 79
		}
	},
	"Candidate 4": {
		"Confidence": 85,
		"Code_Accuracy": 73,
		"Code_Coverage": 58,
		"Chat_Score": 69,
		"Skills_Level": {
			"Java": 78,
			"JDBC": 78
		}
	},
	"Candidate 5": {
		"Confidence": 75,
		"Code_Accuracy": 60,
		"Code_Coverage": 75,
		"Chat_Score": 59,
		"Skills_Level": {
			"HTML": 75,
			"CSS": 80
		}
	},
	"Candidate 6": {
		"Confidence": 70,
		"Code_Accuracy": 80,
		"Code_Coverage": 95,
		"Chat_Score": 87,
		"Skills_Level": {
			"HTML": 91,
			"CSS": 88
		}
	},
	"Candidate 5": {
		"Confidence": 75,
		"Code_Accuracy": 60,
		"Code_Coverage": 75,
		"Chat_Score": 59,
		"Skills_Level": {
			"HTML": 75,
			"CSS": 80
		}
	},
	"Candidate 5": {
		"Confidence": 75,
		"Code_Accuracy": 60,
		"Code_Coverage": 75,
		"Chat_Score": 59,
		"Skills_Level": {
			"HTML": 75,
			"CSS": 80
		}
	},
	"Candidate 5": {
		"Confidence": 75,
		"Code_Accuracy": 60,
		"Code_Coverage": 75,
		"Chat_Score": 59,
		"Skills_Level": {
			"HTML": 75,
			"CSS": 80
		}
	}
}

var job_description = {
	"Java": {
		"Spring": 50,
		"Hibernate": 67,
		"total": 117
	},
	"Python": {
		"Django": 13,
		"Data Scientist": 11,
		"total": 24
	},
	"Ruby": {
		"Ruby On Rails": 43,
		"total": 43
	},
	"HTML": {},
	"CSS": {},
	"JS": {}
}

function generateConfig() {
	var config = {
		type: 'line',
		data: {
			labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
			datasets: [{
				// label: 'My First dataset',
				data: [
					Math.random() * (1000 - 2) + 2,
					Math.random() * (1000 - 2) + 2, 
					Math.random() * (1000 - 2) + 2,
					Math.random() * (1000 - 2) + 2,
					Math.random() * (1000 - 2) + 2,
					Math.random() * (1000 - 2) + 2,
					Math.random() * (1000 - 2) + 2,
					25,
					25,
					25,
					Math.random() * (1000 - 2) + 2 
				],
				fill: true,
			}],
		},
		options: {
			responsive: true,
			title: {
				display: false,
				text: 'Overall Scrores Of Candidates'
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'score'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: '# of students'
					}
				}]
			}
		}
	};
	return config;
}

function generatePieChartConfig(lang, data) {
	var config = {
		type: 'doughnut',
		data: {
			datasets: [{
				data: data,
				backgroundColor: [
					"#E64A19",
					"#FF9800",
					"#1976D2"
				],
				label: 'Dataset 1'
			}],
			labels: [
				'Junior Developer',
				'Senior Developer',
				'Archietect'
			]
		},
		options: {
			responsive: true
		}
	};
	return config;
}

function generateTeams() {

	var totalPeopleNeeded = {};
	var totalPeopleAvailable = {};
	for(var candidate in candidates) {
		var skills = candidates[candidate]["Skills_Level"];
		for(var skill in skills) {
			if(!(skill in totalPeopleAvailable)) {
				totalPeopleAvailable[skill] = 0;
			}
			totalPeopleAvailable[skill] += candidates[candidate]["Skills_Level"][skill];
			if(skill in job_description) {
				if(!(skill in totalPeopleNeeded)) {
					totalPeopleNeeded[skill] = 0;
				}
				totalPeopleNeeded[skill] += job_description[skill]["total"];
			}
		}
	}
	for(skill in totalPeopleNeeded) {
		if(skill in totalPeopleAvailable) {
			totalPeopleNeeded[skill] = Math.max(0, totalPeopleNeeded[skill] - totalPeopleAvailable[skill]);
		}
	}
	for(var skill in job_description) {
		if(!(skill in totalPeopleAvailable)) {
			totalPeopleNeeded[skill] = job_description[skill]["total"];
		}
		if(isNaN(totalPeopleNeeded[skill])) {
			totalPeopleNeeded[skill] = 0;
		}
	}
	var labels = [];
	var data = []; 
	for(var key in totalPeopleNeeded) {
		if(totalPeopleNeeded[key] > 0) {
			labels.push(key);
			data.push(totalPeopleNeeded[key]);
		}
	}
	return {labels: labels, data: data};
}


function generateSeniority() {
	seniorityDict = {};
	for(var candidate in candidates) {
		// skill = HTML
		for(var skill in candidates[candidate]["Skills_Level"]) {
			if (!(skill in job_description)) {
				for(var k in job_description) {
					// skill belongs k
					if(skill in job_description[k]) {
						if(!(k in seniorityDict)) {
							seniorityDict[k] = {};
							seniorityDict[k]['Junior Developer'] = 0;
							seniorityDict[k]['Senior Developer'] = 0;
							seniorityDict[k]['Archietect'] = 0;

						}
						if(candidates[candidate]["Skills_Level"][k] > 70) {
							seniorityDict[k]['Archietect'] += 1;
						}
						else if(candidates[candidate]["Skills_Level"][k] > 50) {
							seniorityDict[k]['Senior Developer'] += 1;
						}
						else {
							seniorityDict[k]['Junior Developer'] += 1;
						}
					}
				}
			}
			else {
				if(!(skill in seniorityDict)) {
					seniorityDict[skill] = {}
					seniorityDict[skill]['Junior Developer'] = 0;
					seniorityDict[skill]['Senior Developer'] = 0;
					seniorityDict[skill]['Archietect'] = 0;

				}
				if(candidates[candidate]["Skills_Level"][skill] > 70) {
					seniorityDict[skill]['Archietect'] += 1;
				}
				else if(candidates[candidate]["Skills_Level"][skill] > 50) {
					seniorityDict[skill]['Senior Developer'] += 1;
				}
				else {
					seniorityDict[skill]['Junior Developer'] += 1;
				}
			}
				
		}
	}
	result = {}
	for(var lang in seniorityDict) {
		result[lang] = [seniorityDict[lang]['Junior Developer'] + Math.round(Math.random() * 100), seniorityDict[lang]['Senior Developer'] + Math.round(Math.random() * 100), seniorityDict[lang]['Archietect'] + Math.round(Math.random() * 100)];
	}
	return result;
}

function moveToListView() {
	window.location.href = 'table.html';
}