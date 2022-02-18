# Spring & Docker

## Maven
- To create the wrapper file if absent:
    >mvn -N io.takari:maven:wrapper

- To build the image:
    >./mvnw spring-boot:build-image

To skip tests (not recommended): 

	<plugin>
		<groupId>org.apache.maven.plugins</groupId>
		<artifactId>maven-surefire-plugin</artifactId>
		<version>2.22.2</version>
		<configuration>
			<skipTests>true</skipTests>
		</configuration>
	</plugin>

- Tag and Push image to Docker HUB:
    > docker tag name:0.0.1 h3ar7b3a7/name:0.0.1
    
    > docker tag name:0.0.1 h3ar7b3a7/name:latest
    
    > docker push h3ar7b3a7/name:0.0.1
    
    > docker push h3ar7b3a7/name:latest

## Gradle
- To build the wrapper
    >gradlew build

- To build the image
    >docker build --build-arg JAR_FILE=build/libs/tjenterprise-0.0.1.jar -t h3ar7b3a7/tjenterprise .

or with Dockerfile:

	FROM openjdk:8-jdk-alpine
	ARG JAR_FILE=build/libs/tjenterprise-0.0.1.jar
	COPY ${JAR_FILE} app.jar
	ENTRYPOINT ["java","-jar","/app.jar"]

- Tag and Push image to Docker HUB

  Same as above (under Maven)...