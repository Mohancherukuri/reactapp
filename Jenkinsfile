pipeline {
    agent any

    environment {
        // Define environment variables
        BRANCH_NAME = "${env.GIT_BRANCH}"
        TOMCAT_SERVER = "http://192.168.0.113:8080"
        TOMCAT_USER = "admin"
        TOMCAT_PASSWORD = "Moh123$$" // Or use credentials in Jenkins
        TOMCAT_DEPLOY_PATH = "/opt/tomcat/webapps/ROOT/"
    }


    tools {
        // Specify the Node.js tool you have configured in Jenkins
        nodejs 'node'  // 'NodeJS' is the name of the Node.js installation in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install npm dependencies
                    bat 'npm install'
                }
            }
        }


        // stage('Build React App') {
        //     steps {
        //         script {
        //             // Run the React build process
        //             sh 'npm run build'
        //         }
        //     }
        // }
        stage('Build') {
            steps {
                echo "Building branch ${BRANCH_NAME}..."
            }
        }

        stage('Test') {
            steps {
                echo "Running tests for ${BRANCH_NAME}..."
            }
        }
    }  // Closing brace for 'stages'
}  // Closing brace for 'pipeline'
