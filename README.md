
# Microservice Application avec Docker et Kubernetes avec deploiement automatiser via Pipeline CI/CD Gitlab

Bienvenue dans l'application microservice basée sur Docker et Kubernetes, un projet fil rouge construit avec Node.js et React.

## Projet fil rouge

### Introduction

Ce projet est une application microservices construite avec Node.js et React. Il est conçu pour être déployé sur Kubernetes.

### Table des matières

- [Introduction](#introduction)
- [Table des matières](#table-des-matières)
- [Architecture](#architecture)
- [Chemins d'Ingress](#chemins-dingress)
- [Noms de Services Kubernetes](#noms-de-services-kubernetes)
- [Ports des Services](#ports-des-services)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Déploiement](#déploiement)
- [CI/CD avec Kubernetes et Docker](#cicd-avec-kubernetes-et-docker)

## Architecture

L'application est composée des services suivants :

- **Client** : Interface utilisateur construite avec React.
- **Posts** : Service pour la gestion des posts.
- **Comments** : Service pour la gestion des commentaires.
- **Query** : Service pour la gestion des requêtes.
- **Moderation** : Service pour la modération des commentaires.
- **Event Bus** : Service pour la gestion des événements entre les services.

### Chemins d'Ingress

- `/posts/create` : Dirigé vers le service `posts-clusterip-srv` sur le port 4000.
	- Utilisé pour créer de nouveaux posts.

- `/posts` : Dirigé vers le service `query-srv` sur le port 4002.
	- Utilisé pour récupérer la liste des posts existants.

- `/posts/?(.*)/comments` : Dirigé vers le service `comments-srv` sur le port 4001.
	- Utilisé pour créer ou récupérer les commentaires associés à un post spécifique.

- `/?(.*)` : Dirigé vers le service `client-srv` sur le port 3000.
	- Utilisé pour accéder à l'interface utilisateur.

### Noms de Services Kubernetes

Assurez-vous que les noms de services dans vos fichiers de déploiement Kubernetes correspondent aux noms de services utilisés dans le code de l'application. Voici les noms de services attendus :

- **client-srv**: Service pour l'interface utilisateur.
- **posts-clusterip-srv**: Service pour la gestion des posts.
- **query-srv**: Service pour la gestion des requêtes.
- **comments-srv**: Service pour la gestion des commentaires.
- **moderation-srv**: Service pour la modération des commentaires.
- **event-bus-srv**: Service pour la gestion des événements entre les services.

Si vous modifiez ces noms, assurez-vous également de mettre à jour les références correspondantes dans le code de l'application.

### Ports des Services

Chaque service écoute sur un port spécifique. Assurez-vous que ces ports sont correctement configurés dans vos fichiers de déploiement Kubernetes et dans tout autre outil de gestion des conteneurs que vous pourriez utiliser. Voici les ports attendus pour chaque service :

- **client-srv**: Écoute sur le port 3000.
- **posts-clusterip-srv**: Écoute sur le port 4000.
- **query-srv**: Écoute sur le port 4002.
- **comments-srv**: Écoute sur le port 4001.
- **moderation-srv**: Écoute sur le port 4003.
- **event-bus-srv**: Écoute sur le port 4005.

Si vous modifiez ces ports, assurez-vous également de mettre à jour les références correspondantes dans le code de l'application et les fichiers de configuration Kubernetes.

## Prérequis

- Node.js
- Docker
- Kubernetes

## Installation

1. Clonez ce dépôt :
    ```bash
    git clone https://github.com/Mossbaddi/Pojet_fil_rouge.git
    ```

2. Installez les dépendances pour chaque service :
    ```bash
    cd client && npm install
    cd ../posts && npm install
    # Répétez pour tous les services
    ```

## Déploiement

1. Construisez les images Docker pour chaque service :
    ```bash
    docker build -t client ./client
    docker build -t posts ./posts
    # Répétez pour tous les services
    ```
   Le projet est basé sur l'image **node:alpine**

2. Déployez les services sur Kubernetes :
    ```bash
    kubectl apply -f k8s/
    ```
#  BOSS de niveau 2 
## CI/CD avec Kubernetes et Docker

Pour intégrer le CI/CD avec Kubernetes et Docker, suivez les étapes ci-dessous:

1. Consultez les [Prérequis au CI/CD avec Kubernetes et Docker](https://docs.gitlab.com/ee/user/clusters/agent/ci_cd_workflow.html).

2. Installez l'agent GitLab en suivant les instructions d'[Installation de l'agent](https://docs.gitlab.com/ee/user/clusters/agent/install/index.html#create-an-agent-configuration-file).

3. Pour utiliser le Container Registry, référez-vous à la documentation sur [Build and Push Images](https://docs.gitlab.com/ee/user/packages/container_registry/build_and_push_images.html).

4. Avant de lancer Docker et Kubernetes, assurez-vous que le service Docker Daemon est démarré. Vous pouvez le démarrer avec les commandes suivantes (pour Windows) :
    ```powershell
    Get-Service -Name "com.docker.service"
    Start-Service -Name "com.docker.service"
    ```

5. Lancez le runner GitLab avec la commande suivante (assurez-vous d'être dans le bon répertoire) :
    ```bash
    cd ../../../../..
    cd .\GitLab-Runner\
    .\gitlab-runner.exe run
    ```

6. Vérifiez l'état du connecteur k8s-connection.

7. Exécutez la pipeline GitLab.

8. Pour nettoyer l'environnement, vous pouvez exécuter les commandes suivantes :
    ```bash
    kubectl delete service moderation-srv
    kubectl delete service query-srv
    kubectl delete service client-srv
    kubectl delete service comments-srv
    kubectl delete service posts-clusterip-srv
    kubectl delete service moderation-srv
    kubectl delete deployment client-srv
    kubectl delete deployment event-bus-srv
    kubectl delete deployment posts-clusterip-srv
    kubectl delete deployment moderation-srv
    kubectl delete deployment query-srv
    kubectl delete deployment comments-srv
    kubectl delete ingress my-ingress-v

2

```

---

N'oublie pas d'ajuster ces instructions en fonction de ton environnement spécifique. Bonne utilisation du CI/CD avec Kubernetes et Docker !
