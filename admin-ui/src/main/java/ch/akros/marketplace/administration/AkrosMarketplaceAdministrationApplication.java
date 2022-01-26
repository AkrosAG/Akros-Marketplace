
package ch.akros.marketplace.administration;

import javax.sql.DataSource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.vaadin.artur.helpers.LaunchUtil;

import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * The entry point of the Spring Boot application.
 */
@SpringBootApplication
@NpmPackage(value = "lumo-css-framework", version = "^4.0.10")
@NpmPackage(value = "line-awesome", version = "1.3.0")
public class AkrosMarketplaceAdministrationApplication extends SpringBootServletInitializer {
  private static final String POSTGRES_DB_HOST_ENV = "POSTGRES_DB_HOST";

  public static void main(String[] args) {
    LaunchUtil.launchBrowserInDevelopmentMode(SpringApplication.run(AkrosMarketplaceAdministrationApplication.class,
                                                                    args));
  }

  @Bean
  public DataSource getPostgresDataSource() {
    DriverManagerDataSource dataSource = new DriverManagerDataSource();
    dataSource.setDriverClassName("org.postgresql.Driver");

    if (System.getenv(POSTGRES_DB_HOST_ENV) != null && System.getenv(POSTGRES_DB_HOST_ENV).length() > 0) {
      // using container orchestration
      dataSource.setUrl(String.format("jdbc:postgresql://%s:5432/am", System.getenv(POSTGRES_DB_HOST_ENV)));
    }
    else {
      // localhost for local development
      dataSource.setUrl("jdbc:postgresql://localhost:5432/am");
    }

    dataSource.setUsername("am");
    dataSource.setPassword("am");
    return dataSource;
  }
}
