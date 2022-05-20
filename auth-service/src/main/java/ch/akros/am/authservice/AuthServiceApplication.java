
package ch.akros.am.authservice;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication(scanBasePackages = "ch.akros.am.userservice")
@EnableJpaRepositories
@EnableTransactionManagement
public class AuthServiceApplication extends SpringBootServletInitializer {
  private static final String DRIVER_CLASS_NAME = "org.postgresql.Driver";

  @Value("${POSTGRES_USER_DB_URL:${spring.datasource.url}}")
  private String dbUrl;

  @Value("${POSTGRES_USER_DB_USERNAME:${spring.datasource.username}}")
  private String dbUsername;

  @Value("${POSTGRES_USER_DB_PASSWORD:${spring.datasource.password}}")
  private String dbPassword;

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
    dataSource.setDriverClassName(DRIVER_CLASS_NAME);
    dataSource.setUrl(dbUrl);
    dataSource.setUsername(dbUsername);
    dataSource.setPassword(dbPassword);

    return dataSource;
  }
}
