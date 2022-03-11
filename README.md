## Rafael task project Readme

Deployment and run operations

1 - Install nodejs + npm

2 - Install mongodb server

3 - (Optional) Install Mongodb Compass

4 - Create "rafael-task-db" mongo database

5 - Create "students" collection

6 - Create "universities" collection

7 - Install VSCode community addition

8 - Add environment variables

	8.1 - DB server path variable, VariableName = "TempDBServerPath", VariableValue="mongodb://127.0.0.1:27017/"
    
    	8.2 - Logging path variable, VariableName = "TempLogPath", VariableValue="C:\logs"

9 - To view the code open project in VSCode IDE 

10 - Run command line tool as Administrator

11 - Open project root directory with cd {Project_Dir} command

12 - Run "npm install" command to install all packages

13 - Run "npm run start:dev" command in order to run application

14 - (Optional) Install fiddler



## You can use following HTTP request examples to test the application


## Create university request

POST http://localhost:3000/university HTTP/1.1
Content-type: application/json
Host: localhost:3000
Content-Length: 108

{
	"university" : 
	{ 
		"name" : "My small uni",
		"maxNumberOfStudents" : 100,
		"minGPA" : 65
	}
}


## Create student request

POST http://localhost:3000/student HTTP/1.1
Content-type: application/json
Host: localhost:3000
Content-Length: 162

{
	"student" : { "name" :"studenttest" },
	"grades" :[
	{ "courseName" : "descrete math", "grade" : 90},
	{ "courseName" : "alogorithms", "grade" : 88}
	]
}


## Get students by university ID

GET http://localhost:3000/students/6e171bc9-6944-447d-a0db-5ee423135e89 HTTP/1.1
Host: localhost:3000
Content-Length: 0


## Get university by ID

GET http://localhost:3000/university/6e171bc9-6944-447d-a0db-5ee423135e89 HTTP/1.1
Host: localhost:3000
Content-Length: 0


## Enroll student

POST http://localhost:3000/enroll/983318ec-d608-457b-a4ca-3f3845cc8fd3/6e171bc9-6944-447d-a0db-5ee423135e89 HTTP/1.1
Content-type: application/json
Host: localhost:3000
Content-Length: 0
