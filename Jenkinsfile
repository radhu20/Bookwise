pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_PATH = 'docker-compose.yml'
        NOTEBOOK_PATH = 'book-recommender-system.ipynb'
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials'
        SSH_CREDENTIALS_ID = 'wsl-ssh-credentials'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], 
                          userRemoteConfigs: [[url: 'https://github.com/your-username/your-repo.git', credentialsId: 'your-github-credentials-id']]])
            }
        }

        stage('Run Jupyter Notebook') {
            steps {
                sh "jupyter nbconvert --to notebook --execute ${env.NOTEBOOK_PATH} --output ${env.NOTEBOOK_PATH}"
            }
        }

        stage('Run Tests') {
            steps {
                sh "python -m pytest tests/test_bookwise.py" // assuming pytest for testing
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

