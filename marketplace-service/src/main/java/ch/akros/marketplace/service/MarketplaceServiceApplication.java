
package ch.akros.marketplace.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@SpringBootApplication
public class MarketplaceServiceApplication {
  private static final String DRIVER_CLASS_NAME = "org.postgresql.Driver";

  @Value("${POSTGRES_AM_DB_URL:${spring.datasource.url}}")
  private String dbUrl;

  @Value("${POSTGRES_AM_DB_USERNAME:${spring.datasource.username}}")
  private String dbUsername;

  @Value("${POSTGRES_AM_DB_PASSWORD:${spring.datasource.password}}")
  private String dbPassword;

  public static void main(String[] args) {
    SpringApplication application = new SpringApplication(MarketplaceServiceApplication.class);

    application.run(args);
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
