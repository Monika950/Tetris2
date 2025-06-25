terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

##########################
# Docker Network
##########################
resource "docker_network" "app_network" {
  name = "app_network"
}

##########################
# MongoDB Container
##########################
resource "docker_image" "mongo_image" {
  name = "mongo:6"
  keep_locally = true
}

resource "docker_container" "mongo" {
  name  = "mongodbM"
  image = docker_image.mongo_image.name

  ports {
    internal = 27017
    external = 27017
  }

  networks_advanced {
    name = docker_network.app_network.name
  }

  volumes {
    container_path = "/data/db"
    host_path      = abspath("${path.module}/../data/mongo")
  }
}

##########################
# Backend Image & Container
##########################
resource "docker_image" "backend_image" {
  name = "my-backend:latest"
  build {
    context    = "${path.module}/../backend"
    dockerfile = "Dockerfile"
  }
}

resource "docker_container" "backend" {
  name  = "backend"
  image = docker_image.backend_image.name

  ports {
    internal = 3000
    external = 3000
  }

  env = [
    "MONGO_URI=mongodb://mongodb:27017/gameLogs"
  ]

  networks_advanced {
    name = docker_network.app_network.name
  }

  # Optional: remove volume if no shared data is needed
  # volumes {
  #   host_path      = abspath("${path.module}/../data")
  #   container_path = "/usr/src/app"
  # }
}

##########################
# Frontend Image & Container
##########################
resource "docker_image" "frontend_image" {
  name = "my-frontend:latest"
  build {
    context    = "${path.module}/../my-app"
    dockerfile = "Dockerfile"
  }
}

resource "docker_container" "frontend" {
  name  = "frontend"
  image = docker_image.frontend_image.name

  ports {
    internal = 5173
    external = 5173
  }

  networks_advanced {
    name = docker_network.app_network.name
  }
}