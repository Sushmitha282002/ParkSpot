package org.happiest.capstone_microserviceauth;





import jakarta.persistence.GeneratedValue;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@EnableFeignClients
@SpringBootApplication
@Configuration
@ConfigurationProperties
@RefreshScope
public class CapstoneMicroserviceauthApplication {

	public static void main(String[] args) {
		SpringApplication.run(CapstoneMicroserviceauthApplication.class, args);
	}

}
