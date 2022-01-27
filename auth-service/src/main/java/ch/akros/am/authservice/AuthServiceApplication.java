package ch.akros.am.authservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@SpringBootApplication(scanBasePackages = "ch.akros.am.userservice")
@EnableJpaRepositories
@EnableTransactionManagement
public class AuthServiceApplication extends SpringBootServletInitializer {

	private static final String POSTGRES_DB_HOST_ENV = "POSTGRES_DB_HOST";

	public static void main(String[] args) {
		SpringApplication.run(AuthServiceApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(AuthServiceApplication.class);
	}

	@Bean
	public DataSource getPostgresDataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName("org.postgresql.Driver");

		if (System.getenv(POSTGRES_DB_HOST_ENV) != null && System.getenv(POSTGRES_DB_HOST_ENV).length() > 0) {
			// using container orchestration
			dataSource.setUrl(String.format("jdbc:postgresql://%s:5433/userdb", System.getenv(POSTGRES_DB_HOST_ENV)));
		}
		else {
			// localhost for local development
			dataSource.setUrl("jdbc:postgresql://localhost:5433/userdb");
		}

		dataSource.setUsername("userdb");
		dataSource.setPassword("userdb");
		return dataSource;
	}
}
