pipeline {
    agent any

    environment {
        // Define environment variables
        BRANCH_NAME = "${env.GIT_BRANCH}"
        TOMCAT_SERVER = "your-tomcat-server.com"
        TOMCAT_USER = "your-ssh-username"
        TOMCAT_PASSWORD = "your-ssh-password" // Or use credentials in Jenkins
        TOMCAT_DEPLOY_PATH = "/opt/tomcat/webapps/ROOT/"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

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
}
