# Spring & Docker

## Maven
>mvn -N io.takari:maven:wrapper
>mvnw spring-boot:build-image

To skip tests (not recommended): 

	<plugin>
		<groupId>org.apache.maven.plugins</groupId>
		<artifactId>maven-surefire-plugin</artifactId>
		<version>2.22.2</version>
		<configuration>
			<skipTests>true</skipTests>
		</configuration>
	</plugin>

Tag and Push image to Docker HUB

## Gradle
>gradlew build

>docker build --build-arg JAR_FILE=build/libs/tjenterprise-0.0.1.jar -t h3ar7b3a7/tjenterprise .

or with Dockerfile:

	FROM openjdk:8-jdk-alpine
	ARG JAR_FILE=build/libs/tjenterprise-0.0.1.jar
	COPY ${JAR_FILE} app.jar
	ENTRYPOINT ["java","-jar","/app.jar"]

Tag and Push image to Docker HUB

