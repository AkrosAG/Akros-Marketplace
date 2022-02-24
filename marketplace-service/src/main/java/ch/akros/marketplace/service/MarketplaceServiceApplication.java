
package ch.akros.marketplace.service;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@SpringBootApplication
public class MarketplaceServiceApplication {
  private static final String POSTGRES_DB_URL_ENV = "POSTGRES_AM_DB_URL";

  @Value("${connectionString:}")
  private String connectionString;

  public static void main(String[] args) {
    SpringApplication application = new SpringApplication(MarketplaceServiceApplication.class);

    application.run(args);
  }

  @Bean
  public DataSource getPostgresDataSource() {
    DriverManagerDataSource dataSource = new DriverManagerDataSource();
    dataSource.setDriverClassName("org.postgresql.Driver");

    if (System.getenv(POSTGRES_DB_URL_ENV) != null && System.getenv(POSTGRES_DB_URL_ENV).length() > 0) {
      // using container orchestration
      dataSource.setUrl(System.getenv(POSTGRES_DB_URL_ENV));
      dataSource.setUsername("am");
      dataSource.setPassword("am");
    }
    else if(!connectionString.isEmpty()){
      dataSource.setUrl(connectionString);
    } else {
      dataSource.setUrl("jdbc:postgresql://localhost:5432/am");
      dataSource.setUsername("am");
      dataSource.setPassword("am");
    }

    return dataSource;
  }
}
