pipeline {
    agent any

    environment {
        // Define environment variables
        BRANCH_NAME = "${env.GIT_BRANCH}"
        TOMCAT_SERVER = "http://192.168.0.113:8080"
        TOMCAT_USER = "admin"
        TOMCAT_PASSWORD = "Moh123\$\$" // Use Jenkins credentials for sensitive info
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
                    echo "Installing Dependencies"
                    // Install npm dependencies
                    if (isUnix()) {
                        sh 'npm install'  // For Unix-based systems (Linux/macOS)
                    } else {
                        bat 'npm install'  // For Windows systems
                    }
                    echo "Installing Dependencies Finished"
                }
            }
        }
        
        stage('Test') {
            steps {
                echo "Running tests for ${BRANCH_NAME}..."
                if (isUnix()) {
                    sh 'npm test'  // For Unix-based systems (Linux/macOS)
                } else {
                    bat 'npm test'  // For Windows systems
                }
                echo "Unit Tests Successful"
            }
        }

        stage('Build React App') {
            steps {
                 script {
                    // Deploy the React build directory to the Tomcat server
                    // Assuming your React build directory is in './build/'
                    // Use SCP, FTP, or direct copy for Windows to Tomcat
                    bat """
                        rem Copy the build directory to the Tomcat server's webapps folder
                        xcopy /E /I /H /Y .\\build\\* ${TOMCAT_DEPLOY_PATH}
                    """
                }
            }
        }
    }
     post {
        success {
            echo 'Deployment successful!'
        }
        
        failure {
            echo 'Deployment failed.'
        }
    }
}  // Closing brace for 'pipeline'
