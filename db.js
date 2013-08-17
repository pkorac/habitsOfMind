// Temp db

var users = [
		{ id: "321d", name: "peter", type: "student", password: "$2a$12$BMFas1cz.aRExdu6LxITregmcQ4IPWr061JMqloMTcVwAR0AfdAtC", content: "I like carrots" },
		{ id: "593kdsa", name: "ali", type: "teacher", password: "$2a$12$fk1sXnbqK5Oi88mESXEji.RG0gZJb4N84jBW6jydsVl330dvp81Nq", content: "I like banoffy pie" }];



function uandp(){
	return users;
}

exports.uandp = uandp; // only user and password