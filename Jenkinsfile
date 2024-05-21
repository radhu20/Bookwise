pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_PATH = 'docker-compose.yml'
        NOTEBOOK_PATH = 'book-recommender-system.ipynb'
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials'
        SSH_CREDENTIALS_ID = 'wsl-ssh-credentials'
    }
    stages {
       stage('Clone Repository') {
            steps {
                script {
                    // Clone the private repository using credentials
                    withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_PASS')]) {
                        sh "git clone https://${GITHUB_USER}:${GITHUB_PASS}@github.com/radhu20/BookWise-1.git"
                    }
                }
            }
        }

         stage('Install Dependencies') {
            steps {
                // Install dependencies from requirements.txt
                sh 'pip install --user -r requirements.txt'
            }
        }
        stage('Run Jupyter Notebook') {
            steps {
                // Use the full path to the jupyter executable
                sh '/var/lib/jenkins/.local/bin/jupyter nbconvert --to notebook --execute book-recommender-system.ipynb --output book-recommender-system.ipynb'
            }
        }

        stage('Run Backend Tests') {
            steps {
                sh 'python -m unittest discover'
            }
        }
        stage('Install Frontend Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Frontend Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Run End-to-End Tests') {
            steps {
                sh 'npx cypress run'
            }
        }
        stage('Docker Compose Up') {
            steps {
                sh "docker-compose -f ${env.DOCKER_COMPOSE_PATH} up --build -d"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub_credentials') {
                        sh "docker-compose -f ${env.DOCKER_COMPOSE_PATH} push"
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up'
            sh 'docker-compose -f ${env.DOCKER_COMPOSE_PATH} down'
        }
    }
}

