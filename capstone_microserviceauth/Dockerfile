FROM eclipse-temurin:21-jdk-alpine

ADD target/capstone_microserviceauth-0.0.1-SNAPSHOT.jar microjwt.jar

ENTRYPOINT ["java","-jar","/microjwt.jar"]