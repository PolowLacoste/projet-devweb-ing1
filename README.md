# Projet ING 1 Dev web

Ce projet est un site web basé sur le sujet attaché dans /doc.

# Dépendances

- Java 21 (Merci de bien mettre en place ``$JAVA_HOME``)

# Compilation et lancement

Ce projet est un projet Maven composé de deux modules, le frontend et l'application.
Il est donc important de correctement compiler dans le bon ordre. Le frontend est une
dépendance de l'application.

```sh
# Tout compiler:
./mvnw package

# Compiler et installer localement le frontend seul:
cd frontend && ../mvnw install

# Compiler l'application seule:
cd application && ../mvnw package

# Créer une image docker de l'application. Attention, le frontend
# doit avoir été installé localement!
cd application && ../mvnw spring-boot:create-image

# Lancer l'application après l'avoir compilée
java -jar application/target/application-VERSION.jar

# Lancer le frontend seul en mode développement
# ATTENTION, l'application entière doit être lancée sur le port 8080 pour
# que le serveur de test frontend fonctionne! Il sera hébergé sur le port 3000
cd frontend && npm run dev
```
