pipeline {
    agent any

    environment {
        // Define environment variables
        BRANCH_NAME = "${env.GIT_BRANCH}"
        TOMCAT_SERVER = "http://192.168.0.113:8080"
        TOMCAT_USER = "admin"
        TOMCAT_PASSWORD = "Moh123$$" // Use Jenkins credentials for sensitive info
        TOMCAT_DEPLOY_PATH = "/opt/tomcat/webapps/ROOT/"
    }

    tools {
        // Specify the Node.js tool you have configured in Jenkins
        nodejs 'node'  // 'node' is the name of the Node.js installation in Jenkins
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
                    if (isUnix()) {
                        sh 'npm install'  // For Unix-based systems (Linux/macOS)
                    } else {
                        bat 'npm install'  // For Windows systems
                    }
                }
            }
        }

        stage('Build React App') {
            steps {
                script {
                    // Run the React build process
                    if (isUnix()) {
                        sh 'npm run build'  // For Unix-based systems
                    } else {
                        bat 'npm run build'  // For Windows systems
                    }
                }
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

        stage('Deploy') {
            steps {
                echo "Deploying to Tomcat server ${TOMCAT_SERVER}..."
                // Add deployment logic, e.g., using SSH to copy build to Tomcat
            }
        }
    }
}  // Closing brace for 'pipeline'
