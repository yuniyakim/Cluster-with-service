# Тестовое задание

### Prerequisites 

* Docker 

* kubectl

* minikube

## Getting started

1. Launch Docker.

2. Start claster using minikube:
```
minikube start
```

3. Enable Ingress addon for external access:
```
minikube addons enable ingress
```

4. Synchronize cluster state with the desired state of helm releases:
```
helmfile apply
```

5. Apply the configuration:
```
kubectl apply -f deployment.yaml 
```

6. Add hosts to */etc/hosts* file, changing *minikube_ip* to your minikube IP (can be retrieved via *minikube ip*): 
```
minikube_ip hello-world.com
minikube_ip bye-world.com
127.0.0.1 grafana-local.com
```

7. Expose Ingress services:
```
minikube tunnel
```

## Accessing

To access hello-world and bye-world services run:
```
minikube service hello-world-service
minikube service bye-world-service
```

Grafana can be accessed at [http://grafana-local.com](http://grafana-local.com).

Web services contain custom metrics *requests_amount* to get the amount of requests to these services.

## Основное задание

Задача: Маленький кластер с сервисом.

Идея задачи в том, чтобы поднять минимальную инфраструктуру с сайтом и системой мониторинга. Время на выполнение задачи не ограничено

1. Первая часть — запуск сервиса:

* Нужно поднять kubernetes кластер. Проще всего это делать при помощи minikube.

* В kubernetes кластере нужно поднять web сервис. Это может быть любая программа, например, сервис, который при запросе http://servername/<name> возвращает страницу с текстом hello, <name>.

Для этого надо сделать такую программу, собрать докер контейнер и внутри кластера создать deployment.

* Затем необходимо сделать service для этого пода, чтобы к нему можно было обращаться внутри кластера.

* И после этого ingress, чтобы к кластеру можно было обращаться из-вне.

2. Вторая часть — метрики:

К сервису хочется добавить метрики, например считать сколько запросов он получил.
 
* Для использования метрик хочется использовать prometheus.
[https://github.com/prometheus-community/helm-charts](https://github.com/prometheus-community/helm-charts)

* И графану:
[https://github.com/grafana/helm-charts](https://github.com/grafana/helm-charts)

Сделать так, чтобы доступ к графане был доступен из-вне кластера.