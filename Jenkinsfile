pipeline {
    agent any

    environment {
        // Define environment variables
        BRANCH_NAME = "${env.GIT_BRANCH}"
        TOMCAT_SERVER = "http://192.168.0.113:8080"
        TOMCAT_USER = "admin"
        TOMCAT_PASSWORD = "Moh123\$\$"  // Use Jenkins credentials for sensitive info
        TOMCAT_DEPLOY_PATH = "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\Testing\\${env.GIT_BRANCH}"  // Ensure the correct path format
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
                    // Install npm dependencies based on OS
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
                script {
                    echo "Running tests for ${BRANCH_NAME}..."
                    // Run tests based on OS
                    if (isUnix()) {
                        sh 'npm test'  // For Unix-based systems (Linux/macOS)
                    } else {
                        bat 'npm test'  // For Windows systems
                    }
                    echo "Unit Tests Successful"
                }
            }
        }

        stage('Build React App') {
            steps {
                script {
                    echo "Building React App..."
                    // Run build command based on OS
                    if (isUnix()) {
                        sh 'npm run build'  // For Unix-based systems (Linux/macOS)
                    } else {
                        bat 'npm run build'  // For Windows systems
                    }
                    echo "Build Completed"
                }
            }
        }

        stage('Deploy React App') {
            steps {
                script {
                    echo "Deploying to Tomcat server..."

                    // Check if build directory exists
                    def buildDir = "${WORKSPACE}\\build"
                    if (isUnix()) {
                        sh "ls -la ${buildDir}"  // List files to verify the build folder exists
                    } else {
                        bat "dir ${buildDir}"  // List files on Windows to verify the build folder exists
                    }

                    // Deploy the build directory to the Tomcat server
                    echo "Copying build files to Tomcat..."
                    bat """
                        rem Ensure Tomcat deploy path exists
                        if not exist "${TOMCAT_DEPLOY_PATH}" mkdir "${TOMCAT_DEPLOY_PATH}"
                        rem Copy the build directory to the Tomcat server's webapps folder
                        xcopy /E /I /H /Y .\\build\\* ${TOMCAT_DEPLOY_PATH}
                    """
                    echo "Deployment Completed"
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
