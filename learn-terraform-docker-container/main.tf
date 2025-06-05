terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

# Backend Image
resource "docker_image" "backend_image" {
  name = "my-backend:latest"
  build {
    context    = "${path.module}/../backend"
    dockerfile = "Dockerfile"
  }
}

# Frontend Image
resource "docker_image" "frontend_image" {
  name = "my-frontend:latest"
  build {
    context    = "${path.module}/../my-app"
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
  volumes {
    host_path = abspath("${path.module}/../data")
    container_path = "/usr/src/app"
  }
}

resource "docker_container" "frontend" {
  name  = "frontend"
  image = docker_image.frontend_image.name
  ports {
    internal = 5173
    external = 5173
  }
}
