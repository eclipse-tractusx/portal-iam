# Custom Keycloak Helm Chart

## Overview

This repo includes a custom Helm Chart to manage the different type of Keycloak instances of
the [Catena-X IAM Portal](https://github.com/eclipse-tractusx/portal-iam) of the
[Eclipse Tractus-X](https://github.com/eclipse-tractusx) project.

The goal of this Proof of Concept is to reduce the number of Helm Charts to manage the following type of instances:

* Central - currently managed by [this Helm Chart](https://github.com/eclipse-tractusx/portal-iam/tree/main/charts/centralidp)
* Shared - currently managed by [this Helm Chart](https://github.com/eclipse-tractusx/portal-iam/tree/main/charts/sharedidp)

The approach is based on one single Helm Chart, called `portal-iam`, to centralize both type of instances from one
single piece of code, including the specific use items per type.

## Portal IAM Helm Chart

This Helm Chart uses as dependency the [Keycloak Helm Chart by Bitnami](https://artifacthub.io/packages/helm/bitnami/keycloak/)
to operate the Keycloak instances. The Portal IAM Helm Chart extends the configuration of that Helm Chart to customize
the specific objects for each type of instance, such as:

* Kubernetes Secret with the credentials of the external database
* Kubernetes Secret with the credentials of the `admin` user of Keycloak
* Kubernetes Secret with specific content defined by the type of instance
* Kubernetes Job, only for `central` instances, to seed the content of the instance

The Helm Chart requires to have declared the `instanceType` property with the right value (`central`, `shared`) to
create the right objects on the Kubernetes. It this property is not declared, the Helm Chart will not be executed, as
there is a [hook](./charts/portal-iam/templates/hooks/check-variable.yaml) created for that purpose.

The Helm Chart can be extended to add more detailed objects, but it was not part of this Proof of Concept.

The chart is implemented [here](../charts/portal-iam/README.md).

### How to use - Example of usage

This example will deploy the following instances:

* A Central instance identified as `kc-central-blue`
* A Shared intance identified as `kc-shared-blue`
* Each instance will have its own database (not managed by the Helm Chart)

This section describes step by step how to use this repository using `minikube` as Kubernetes platform.

1. To start minikube and add the `ingress` addons:

```shell
minikube start
minikube addons enable ingress
```

To visualize the dashboard of the Kubernetes, execute `minikube dashboard` command

2. Update the `portal-iam` helm chart with the latest status of the dependencies

```shell
helm dependency update ./charts/portal-iam
```

3. Deploy the Database for the Central Blue instance


```shell
kubectl apply -f ./environments/centralidp/blue/postgresql-db-central-blue-statefulset.yaml
```

4. Deploy the **Keycloak Central** instance:

```shell
helm upgrade --install kc-central-blue \
    ./charts/portal-iam \
    --history-max=2 \
    -f ./environments/centralidp/blue/kc-central-blue-values.yaml
```

This instance will use the previous database created, and initialize it with the initial values. The following
objects are created for this specific instance:

* Secrets:

```shell
on 🎩 ❯ k get secret
NAME                                    TYPE                 DATA   AGE
kc-central-blue-admin-password          Opaque               2      2m22s
kc-central-blue-postgresql-secret       Opaque               1      2m22s
kc-central-blue-secret-central          Opaque               1      2m22s
```

* Jobs:

```shell
on 🎩 ❯ k get jobs
NAME                                       COMPLETIONS   DURATION   AGE
kc-central-blue-check-variable             1/1           6s         60s
kc-central-blue-cx-central-realm-upgrade   1/1           5s         54s
```

* Stateful Sets:

```shell
on 🎩 ❯ k get sts
NAME                         READY   AGE
kc-central-blue-keycloak     1/1     85s
postgresql-db-central-blue   1/1     13m
```

To access to the Keycloak Central instance, execute the `minikube service kc-central-blue-keycloak` command.

The credentials are declared in the [values file](./environments/centralidp/blue/kc-central-blue-values.yaml).

5. Deploy the **Keycloak Shared** instance is very similar, including its own database:

```shell
kubectl apply -f ./environments/sharedidp/blue/postgresql-db-shared-blue-statefulset.yaml
```

```shell
helm upgrade --install kc-shared-blue \
    ./charts/portal-iam \
    --history-max=2 \
    -f ./environments/sharedidp/blue/kc-shared-blue-values.yaml
```

To access to the Keycloak Shared instance, execute the `minikube service kc-shared-blue-keycloak` command.

Now the objects created for this specific Keycloak instance are:

* Secrets:

```shell
on 🎩 ❯ k get secrets | grep shared
NAME                                    TYPE                 DATA   AGE
kc-shared-blue-admin-password           Opaque               2      4m40s
kc-shared-blue-secret-shared            Opaque               1      4m40s
kc-shared-bluepostgresql-secret         Opaque               1      4m40s
sh.helm.release.v1.kc-shared-blue.v1    helm.sh/release.v1   1      4m46s
```

* Stateful Sets:

```shell
on 🎩 ❯ k get sts | grep shared
NAME                         READY   AGE
kc-shared-blue-keycloak      1/1     5m49s
postgresql-db-shared-blue    1/1     7m14s
```

## Uninstalling

To uninstall and clean up your Kubernetes platform:

1. Uninstall Helm Releases:

```shell
helm uninstall kc-central-blue
helm uninstall kc-shared-blue
```

2. Deleting Databases and other resources:

```shell
kubectl delete -f ./environments/centralidp/blue/postgresql-db-central-blue-statefulset.yaml
kubectl delete -f ./environments/sharedidp/blue/postgresql-db-shared-blue-statefulset.yaml
k delete job -l job-name=kc-central-blue-check-variable
k delete job -l job-name=kc-shared-blue-check-variable
k delete job -l job-name=kc-central-blue-cx-central-realm-upgrade
```

## Helm Chart Umbrella

Once the Helm Chart operates both kind instances, the next approach should be to define as Helm Chart Umbrella
to operate the full topology of the solution. A Helm Chart Umbrella helps to manage the whole solution
as one single deployment unit instead of managing each instance independently.

It requires to adapt the templates to operate across the different instances. Please, for more details
about Helm Charts Umbrella, review the following references:

* [Chart Development Tips and Tricks](https://helm.sh/docs/howto/charts_tips_and_tricks/)
* [How to simplyfy your kubernetes Helm deployments](https://codefresh.io/blog/simplify-kubernetes-helm-deployments/)
